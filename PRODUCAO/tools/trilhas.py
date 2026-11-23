"""Catálogo do Sistema Musical ATIVO (TRILHAS/trilhas.json, 23/11/2026).

Uso (a partir de PRODUCAO/ ou da raiz):
  python3 tools/trilhas.py validar                       # catálogo coerente (+ masters presentes e sha256)
  python3 tools/trilhas.py listar                        # faixas, papel, licença, BPM, tom
  python3 tools/trilhas.py ficha T03                     # perfil legível
  python3 tools/trilhas.py sugerir --territorio e-se --modelo maquete-3d [--data AAAA-MM-DD] [--publicavel]
  python3 tools/trilhas.py uso [--dias 7] [--data AAAA-MM-DD]
  python3 tools/trilhas.py calibrar <arquivo> --id T06   # rascunho de perfil (requer librosa); revisar à mão antes de entrar no catálogo

Regras: TRILHAS/README.md. Escolha por ADEQUAÇÃO; a frequência recente só desempata. Áudio nunca entra no Git.
"""
import datetime as dt
import glob
import hashlib
import json
import os
import sys

PROD = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REPO = os.path.dirname(PROD)
CAT = os.path.join(REPO, "TRILHAS", "trilhas.json")
STATUS_PUBLICAVEL = ("licenciada", "original")
AFIN = {"muito": 3.0, "compativel": 2.0, "contextual": 1.0, "evitar": -5.0}
TERRITORIOS = ("agora", "e-se", "fora-da-bolha", "corretor-real", "historia", "ideia")
MODELOS = ("cartoon-explicativo", "pictograma-cinematografico", "planta-tecnica", "maquete-3d")
TIPOS_SECAO = ("intro", "a", "b", "cama", "parada", "subida", "quebra", "climax", "resolucao", "final")
EPS = 0.012


def _ler(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def catalogo():
    return _ler(CAT)


def trilha(tid, cat=None):
    cat = cat or catalogo()
    for t in cat["trilhas"]:
        if t["id"] == tid:
            return t
    raise SystemExit(f"trilha {tid!r} não existe em TRILHAS/trilhas.json ({', '.join(t['id'] for t in cat['trilhas'])})")


def publicavel(t):
    return t.get("licenca", {}).get("status") in STATUS_PUBLICAVEL


def master_path(t):
    return os.path.join(REPO, t["master"]["arquivo"])


def passo_tempo(t):
    return 60.0 / t["tecnico"]["bpm"]


def unidades(t, s):
    """Pontos de corte permitidos de uma seção (inclui ini e fim). A unidade é o compasso, o tempo ou o vale."""
    ini, fim = s["ini"], s["fim"]
    if s.get("inteira"):
        return [ini, fim]
    if t["grade"] == "vales":
        return [ini] + [c for c in s.get("cortes_internos", []) if ini + EPS < c < fim - EPS] + [fim]
    tec = t["tecnico"]
    beat = passo_tempo(t)
    grao = beat if (s.get("corte") == "tempo" or t["grade"] == "tempo") else beat * tec.get("tempos_por_compasso", 4)
    t0 = tec.get("primeiro_tempo", 0.0)
    k0 = int((ini - t0) // grao) + 1
    pts = [ini]
    x = t0 + k0 * grao
    while x < fim - EPS:
        if x > ini + EPS:
            pts.append(round(x, 4))
        x += grao
    pts.append(fim)
    return pts


def _na_grade(t, x, corte):
    if t["grade"] == "vales":
        return True
    tec = t["tecnico"]
    beat = passo_tempo(t)
    grao = beat if (corte == "tempo" or t["grade"] == "tempo") else beat * tec.get("tempos_por_compasso", 4)
    q = (x - tec.get("primeiro_tempo", 0.0)) / grao
    return abs(q - round(q)) * grao < 0.03


def validar(cat=None, checar_masters=True):
    cat = cat or catalogo()
    erros, avisos = [], []
    ids = set()
    for t in cat.get("trilhas", []):
        tid = t.get("id", "?")
        if tid in ids:
            erros.append(f"{tid}: id repetido")
        ids.add(tid)
        for k in ("nome", "papel", "master", "licenca", "tecnico", "grade", "secoes", "funcoes", "final", "afinidade"):
            if k not in t:
                erros.append(f"{tid}: falta `{k}`")
        if erros:
            continue
        st = t["licenca"].get("status")
        if st not in cat.get("status_licenca", {}):
            erros.append(f"{tid}: licenca.status inválido {st!r}")
        if st == "licenciada":
            if not all(t["licenca"].get(r) for r in ("instagram", "tiktok", "youtube")):
                erros.append(f"{tid}: 'licenciada' precisa cobrir instagram, tiktok e youtube")
            if not t["licenca"].get("comprovante"):
                erros.append(f"{tid}: 'licenciada' sem comprovante (TRILHAS/licencas/{tid}.md)")
        if t["grade"] not in ("compasso", "tempo", "vales"):
            erros.append(f"{tid}: grade inválida {t['grade']}")
        if t["grade"] in ("compasso", "tempo") and not t["tecnico"].get("bpm"):
            erros.append(f"{tid}: grade {t['grade']} exige tecnico.bpm")
        secs = t["secoes"]
        util = t["master"].get("util", [0, t["tecnico"]["duracao"]])
        if abs(secs[0]["ini"] - util[0]) > EPS:
            erros.append(f"{tid}: primeira seção deve começar em {util[0]}")
        if abs(secs[-1]["fim"] - util[1]) > EPS:
            erros.append(f"{tid}: última seção deve terminar no fim útil {util[1]}")
        if secs[-1]["tipo"] != "final" or not secs[-1].get("inteira"):
            erros.append(f"{tid}: a última seção precisa ser `final` e `inteira`")
        nomes = set()
        for a, b in zip(secs, secs[1:]):
            if abs(a["fim"] - b["ini"]) > EPS:
                erros.append(f"{tid}: seções {a['id']}→{b['id']} não são contíguas ({a['fim']} × {b['ini']})")
        for s in secs:
            nomes.add(s["id"])
            if s["tipo"] not in TIPOS_SECAO:
                erros.append(f"{tid}/{s['id']}: tipo inválido {s['tipo']}")
            if s["fim"] - s["ini"] <= 0.2:
                erros.append(f"{tid}/{s['id']}: seção curta demais")
            if s.get("essencial") and s.get("pode_remover"):
                erros.append(f"{tid}/{s['id']}: essencial e pode_remover ao mesmo tempo")
            for borda in (s["ini"], s["fim"]):
                if borda not in (util[0], util[1]) and not _na_grade(t, borda, s.get("corte")) and not _na_grade(t, borda, "tempo"):
                    avisos.append(f"{tid}/{s['id']}: borda {borda} fora da grade (confirmar de ouvido)")
            if s.get("loop"):
                a, b = s["loop"]
                if not (s["ini"] - EPS <= a < b <= s["fim"] + EPS):
                    erros.append(f"{tid}/{s['id']}: loop {s['loop']} fora da seção")
                us = unidades(t, s)
                if not any(abs(a - u) < 0.03 for u in us) or not any(abs(b - u) < 0.03 for u in us):
                    erros.append(f"{tid}/{s['id']}: loop {s['loop']} precisa começar e terminar em pontos de corte da seção")
            n = len(unidades(t, s)) - 1
            if not s.get("inteira") and s.get("min", 1) > n:
                erros.append(f"{tid}/{s['id']}: min {s.get('min')} > {n} unidades")
        for sid in t.get("entradas", []):
            if sid not in nomes:
                erros.append(f"{tid}: entrada {sid!r} não é uma seção")
        for f, sid in t["funcoes"].items():
            if f not in cat.get("funcoes_narrativas", []):
                erros.append(f"{tid}: função narrativa desconhecida {f!r}")
            if sid not in nomes:
                erros.append(f"{tid}: função {f} aponta para seção inexistente {sid!r}")
        for k, v in t["afinidade"].get("territorios", {}).items():
            if k not in TERRITORIOS or v not in AFIN:
                erros.append(f"{tid}: afinidade de território inválida {k}={v}")
        for k, v in t["afinidade"].get("modelos", {}).items():
            if k not in MODELOS or v not in AFIN:
                erros.append(f"{tid}: afinidade de modelo inválida {k}={v}")
        if checar_masters:
            mp = master_path(t)
            if not os.path.exists(mp):
                avisos.append(f"{tid}: master ausente ({t['master']['arquivo']}) — reenviar o arquivo nesta sessão (ver TRILHAS/README.md)")
            elif t["master"].get("sha256"):
                h = hashlib.sha256(open(mp, "rb").read()).hexdigest()
                if h != t["master"]["sha256"]:
                    erros.append(f"{tid}: master com sha256 diferente do catálogo (arquivo trocado ou alterado)")
        if not publicavel(t):
            avisos.append(f"{tid}: licença `{st}` — só teste interno; publicar.py recusa")
    return erros, avisos


def _datas(data, dias):
    d1 = dt.date.fromisoformat(data) if data else dt.date.today()
    return {(d1 - dt.timedelta(days=k)).isoformat() for k in range(dias)}


def uso(dias=7, data=None):
    """{trilha: [(data, origem)]} a partir da grade (slots com `trilha`) e dos episode.json (music.trilha)."""
    janela = _datas(data, dias)
    out = {}
    for p in glob.glob(os.path.join(PROD, "grade", "????-??-??.json")):
        g = _ler(p)
        if g.get("data") in janela:
            for s in g.get("slots", []):
                if s.get("trilha") and s.get("status") not in ("descartado", "vazio"):
                    out.setdefault(s["trilha"], []).append((g["data"], f"grade {s['horario']} {s.get('episodio', '')}".strip()))
    vistos = {e for v in out.values() for _, e in v}
    for p in glob.glob(os.path.join(PROD, "episodes", "*", "episode.json")):
        e = _ler(p)
        tr = (e.get("music") or {}).get("trilha")
        if tr and not any(e["id"] in x for x in vistos):
            d = (e.get("grade") or {}).get("data") or dt.date.fromtimestamp(os.path.getmtime(p)).isoformat()
            if d in janela:
                out.setdefault(tr, []).append((d, f"episódio {e['id']}"))
    return out


def sugerir(territorio=None, modelo=None, data=None, publicaveis=False, cat=None):
    cat = cat or catalogo()
    recentes = uso(7, data)
    ontem = uso(1, data)
    res = []
    for t in cat["trilhas"]:
        if t["licenca"]["status"] == "bloqueada" or (publicaveis and not publicavel(t)):
            continue
        a_t = t["afinidade"]["territorios"].get(territorio, "contextual") if territorio else "compativel"
        a_m = t["afinidade"]["modelos"].get(modelo, "contextual") if modelo else "compativel"
        adequ = AFIN[a_t] + 0.8 * AFIN[a_m]
        n7 = len(recentes.get(t["id"], []))
        desempate = -0.35 * n7 - (0.6 if t["id"] in ontem else 0)
        res.append(dict(id=t["id"], nome=t["nome"], papel=t["papel"], territorio=a_t, modelo=a_m, adequacao=round(adequ, 2),
                        usos_7d=n7, score=round(adequ + desempate, 2), licenca=t["licenca"]["status"]))
    res.sort(key=lambda r: (-r["adequacao"] if r["adequacao"] <= 0 else 0, -r["score"]))
    return res


def calibrar(arquivo, tid):
    """Rascunho de perfil para faixa nova: andamento (pente), tonalidade, espectro × voz, loudness. Revisar à mão."""
    import subprocess
    import numpy as np
    try:
        import librosa
    except ImportError:
        raise SystemExit("calibrar requer librosa (pip install librosa)")
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", arquivo, "-vn", "-ac", "1", "-ar", "22050", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype=np.float32).astype(float)
    SR = 22050
    dur = len(y) / SR
    o = librosa.onset.onset_strength(y=y, sr=SR, hop_length=128)
    o = (o - o.mean()) / (o.std() + 1e-9)
    ft = 128 / SR
    best = []
    for bpm in np.arange(60, 180, 0.05):
        p = 60 / bpm
        sc, ph = max((o[(np.arange(ph, dur - 0.05, p) / ft).astype(int)].mean(), ph) for ph in np.arange(0, p, 0.02))
        best.append((sc, bpm, ph))
    best.sort(reverse=True)
    sc, bpm, ph = best[0]
    MAJ = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
    MIN = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])
    N = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"]
    ch = librosa.feature.chroma_cqt(y=librosa.effects.harmonic(y), sr=SR).mean(1)
    ks = sorted([(np.corrcoef(np.roll(MAJ, k), ch)[0, 1], f"{N[k]} maior", 60 + k) for k in range(12)] +
                [(np.corrcoef(np.roll(MIN, k), ch)[0, 1], f"{N[k]} menor", 60 + k) for k in range(12)], reverse=True)
    S = np.abs(librosa.stft(y, n_fft=4096)) ** 2
    f = librosa.fft_frequencies(sr=SR, n_fft=4096)
    m = S.mean(1)
    tot = m[f > 40].sum()
    banda = lambda a, b: round(float(m[(f >= a) & (f < b)].sum() / tot), 3)
    rascunho = dict(id=tid, nome="(dar nome)", papel="(escolher em papeis.json)",
                    master=dict(arquivo=f"TRILHAS/masters/{tid}{os.path.splitext(arquivo)[1]}", sha256=hashlib.sha256(open(arquivo, 'rb').read()).hexdigest(),
                                nome_recebido=os.path.basename(arquivo), origem="(origem e licença)", util=[0.0, round(dur, 2)]),
                    licenca=dict(status="referencia", instagram=False, tiktok=False, youtube=False, comprovante=None, nota=""),
                    tecnico=dict(duracao=round(dur, 2), bpm=round(float(bpm), 2), pulso="estavel" if sc > 1.0 else "fraco/rubato (conferir)",
                                 forca_pulso=round(float(sc), 2), candidatos_bpm=[round(float(b), 2) for _, b, _ in best[:40:8]], primeiro_tempo=round(float(ph), 3),
                                 tempos_por_compasso=4, tom=ks[0][1], tom_conf="alta" if ks[0][0] - ks[1][0] > 0.15 else "baixa", tonica_midi=ks[0][2]),
                    voz=dict(ocupacao_graves_250=banda(40, 250), ocupacao_250_1k=banda(250, 1000), ocupacao_1_4k=banda(1000, 4000), duck_extra_db=0.0),
                    grade="compasso", secoes=[], funcoes={}, final={}, afinidade=dict(territorios={}, modelos={}),
                    _a_fazer="marcar seções (ini/fim na grade), eventos, loops (medir costura), final, funcoes e afinidades; ver TRILHAS/analises/ e o mapa de energia")
    return rascunho


def main(argv):
    import argparse
    ap = argparse.ArgumentParser(prog="trilhas.py")
    sub = ap.add_subparsers(dest="cmd")
    sub.add_parser("validar")
    sub.add_parser("listar")
    f = sub.add_parser("ficha"); f.add_argument("id")
    s = sub.add_parser("sugerir"); s.add_argument("--territorio"); s.add_argument("--modelo"); s.add_argument("--data"); s.add_argument("--publicavel", action="store_true")
    u = sub.add_parser("uso"); u.add_argument("--dias", type=int, default=7); u.add_argument("--data")
    c = sub.add_parser("calibrar"); c.add_argument("arquivo"); c.add_argument("--id", required=True)
    a = ap.parse_args(argv[1:])
    if a.cmd == "validar":
        e, w = validar()
        for x in w:
            print("  AVISO ", x)
        for x in e:
            print("  ERRO  ", x)
        print(f"catálogo — {len(e)} erro(s), {len(w)} aviso(s)")
        return 1 if e else 0
    if a.cmd == "listar":
        for t in catalogo()["trilhas"]:
            tec = t["tecnico"]
            print(f"{t['id']}  {t['nome']:22} {t['papel']:22} {str(tec.get('bpm') or 'rubato'):>7} BPM  {tec.get('tom', ''):24} licença={t['licenca']['status']}"
                  f"{'' if os.path.exists(master_path(t)) else '  (master ausente)'}")
        return 0
    if a.cmd == "ficha":
        t = trilha(a.id)
        print(f"{t['id']} · {t['nome']} · papel {t['papel']} · licença {t['licenca']['status']}")
        print("  " + t["personalidade"]["resumo"] + " — " + t["personalidade"]["curva"])
        print(f"  {t['tecnico'].get('bpm') or 'rubato'} BPM · {t['tecnico'].get('compasso')} · {t['tecnico'].get('tom')} · voz: {t['voz'].get('espaco')}")
        for s in t["secoes"]:
            print(f"    {s['ini']:7.2f}–{s['fim']:7.2f}  {s['id']:10} {s['tipo']:9} valor {s['valor']}"
                  f"{'  inteira' if s.get('inteira') else ''}{'  essencial' if s.get('essencial') else ''}{'  loop ' + str(s['loop']) if s.get('loop') else ''}")
        print("  funções:", t["funcoes"])
        print("  territórios:", t["afinidade"]["territorios"])
        print("  modelos:", t["afinidade"]["modelos"])
        print("  riscos:", "; ".join(t.get("riscos", [])))
        return 0
    if a.cmd == "sugerir":
        for r in sugerir(a.territorio, a.modelo, a.data, a.publicavel):
            print(f"  {r['id']} {r['nome']:22} território={r['territorio']:10} modelo={r['modelo']:10} adequação={r['adequacao']:5} usos_7d={r['usos_7d']} → {r['score']}  (licença {r['licenca']})")
        print("  (adequação manda; uso recente só desempata — TRILHAS/README.md)")
        return 0
    if a.cmd == "uso":
        u = uso(a.dias, a.data)
        if not u:
            print(f"nenhum uso de trilha nos últimos {a.dias} dias")
        for k, v in sorted(u.items()):
            print(f"  {k}: {len(v)} — " + ", ".join(f"{d} {o}" for d, o in v))
        return 0
    if a.cmd == "calibrar":
        print(json.dumps(calibrar(a.arquivo, a.id), ensure_ascii=False, indent=1))
        return 0
    ap.print_help()
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv))
