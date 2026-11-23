"""Grade editorial diária da ATIVO — 6 vídeos/dia (PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md, 23/11/2026).

Uso (a partir de PRODUCAO/ ou da raiz):
  python3 tools/grade.py nova AAAA-MM-DD        # cria PRODUCAO/grade/AAAA-MM-DD.json com os 6 horários
  python3 tools/grade.py validar AAAA-MM-DD     # regras + guardrails (sai com código 1 se houver ERRO)
  python3 tools/grade.py status [AAAA-MM-DD]    # tabela do dia (padrão: hoje)
  python3 tools/grade.py semana AAAA-MM-DD      # 7 dias até a data: distribuição + média dos resultados por território/modelo/horário
  python3 tools/grade.py resultado AAAA-MM-DD HH:MM chave=valor …   # Fonte D: grava métricas reais do post no slot
  python3 tools/grade.py onde <EP-ID>           # em que grade/slot está o episódio

Regras: territórios, fontes, PUSH/PULL, horários e guardrails dos 4 modelos. Violação de guardrail SEM justificativa é ERRO;
com justificativa (campo `justificativas`) vira AVISO registrado. Somente Python stdlib.
"""
import datetime as dt
import json
import os
import sys

PROD = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REPO = os.path.dirname(PROD)
DIR = os.path.join(PROD, "grade")
HORARIOS = ["08:00", "10:00", "12:00", "15:00", "18:00", "21:00"]
TERRITORIOS = {
    "agora": "AGORA",
    "e-se": "E SE…?",
    "fora-da-bolha": "FORA DA BOLHA",
    "corretor-real": "CORRETOR NA VIDA REAL",
    "historia": "HISTÓRIA QUE ENSINA",
    "ideia": "IDEIA QUE MUDA O JOGO",
}
ORIGENS = ("modelos", "radar", "pesquisa", "aprendizado")
PUSH_PULL = ("push", "pull")
MODELOS = {
    "cartoon-explicativo": "Cartoon explicativo",
    "pictograma-cinematografico": "Pictograma cinematográfico",
    "planta-tecnica": "Planta técnica",
    "maquete-3d": "Maquete 3D",
}
STATUS_GRADE = ("rascunho", "pauta_aprovada", "roteiros_aprovados", "em_producao", "programada", "publicada")
STATUS_SLOT = ("ideia", "aprovada", "roteiro", "roteiro_aprovado", "producao", "pronto", "programado", "publicado", "descartado", "vazio")
EM_PRODUCAO = ("producao", "pronto", "programado", "publicado")
MAX_MODELO_DIA = 2
MIN_MODELOS_DIA = 3
MAX_MODELO_SEMANA = 0.40
MAX_TRILHA_DIA = 1
MAX_TRILHA_SEMANA = 0.25
CATALOGO_TRILHAS = os.path.join(REPO, "TRILHAS", "trilhas.json")
MAX_REF_MODELOS_DIA = 2
JANELA_AGORA_DIAS = 7


def caminho(data: str) -> str:
    return os.path.join(DIR, f"{data}.json")


def parse_data(s: str) -> dt.date:
    try:
        return dt.date.fromisoformat(s)
    except ValueError:
        raise SystemExit(f"data inválida: {s!r} (use AAAA-MM-DD)")


def carregar(data: str) -> dict:
    p = caminho(data)
    if not os.path.exists(p):
        raise SystemExit(f"grade {data} não existe — crie com: python3 PRODUCAO/tools/grade.py nova {data}")
    return json.load(open(p, encoding="utf-8"))


def salvar(g: dict) -> None:
    os.makedirs(DIR, exist_ok=True)
    with open(caminho(g["data"]), "w", encoding="utf-8") as f:
        json.dump(g, f, ensure_ascii=False, indent=2)
        f.write("\n")


def slot_vazio(h: str) -> dict:
    return {"horario": h, "territorio": "", "origem": "", "origemRef": "", "dataFato": "", "pushPull": "", "ideia": "",
            "porQueAssistir": "", "recompensa": "", "modelo": "", "justificativaModelo": "", "justificativaHorario": "", "trilha": "", "justificativaTrilha": "",
            "episodio": "", "roteiro": "", "status": "ideia", "motivo": "", "resultados": {}}


def nova(data: str) -> str:
    parse_data(data)
    if os.path.exists(caminho(data)):
        raise SystemExit(f"grade {data} já existe — não sobrescrevo ({caminho(data)})")
    salvar({"data": data, "versao": 1, "status": "rascunho",
            "justificativas": {"territorios": "", "pushPull": "", "modelos": "", "modelos_ref": "", "trilhas": ""},
            "radar": [], "slots": [slot_vazio(h) for h in HORARIOS]})
    return caminho(data)


def _controle_modelos() -> set:
    p = os.path.join(REPO, "modelos", "controle.json")
    if not os.path.exists(p):
        return set()
    return {m.get("arquivo") for m in json.load(open(p, encoding="utf-8")).get("modelos", [])}


def _grades_janela(data: str, dias: int = 7) -> list:
    fim = parse_data(data)
    out = []
    for k in range(dias):
        d = (fim - dt.timedelta(days=k)).isoformat()
        if os.path.exists(caminho(d)):
            out.append(json.load(open(caminho(d), encoding="utf-8")))
    return out


def validar(g: dict) -> tuple:
    """(erros, avisos) da grade. Erros bloqueiam editorial_check/render dos episódios dela."""
    erros, avisos = [], []
    j = g.get("justificativas", {}) or {}

    def guard(cond: bool, msg: str, chave: str):
        if cond:
            if (j.get(chave) or "").strip():
                avisos.append(f"{msg} — justificado: {j[chave].strip()}")
            else:
                erros.append(f"{msg} (sem justificativa em justificativas.{chave})")

    data = g.get("data", "")
    d0 = parse_data(data)
    if g.get("status", "rascunho") not in STATUS_GRADE:
        erros.append(f"status da grade inválido: {g.get('status')}")
    for i, r in enumerate(g.get("radar", []) or []):
        if r.get("classe") not in ("A", "B", "C"):
            erros.append(f"radar[{i}]: classe deve ser A, B ou C")
        if not (r.get("fonte") or "").startswith("http"):
            erros.append(f"radar[{i}]: falta a fonte (URL)")
        for campo in ("dataEvento", "dataPublicacao"):
            try:
                dt.date.fromisoformat(r.get(campo, ""))
            except ValueError:
                erros.append(f"radar[{i}]: `{campo}` (AAAA-MM-DD) obrigatório")
    slots = g.get("slots", [])
    hs = [s.get("horario") for s in slots]
    for h in hs:
        if h not in HORARIOS:
            erros.append(f"horário fora da grade ATIVO: {h} (válidos: {', '.join(HORARIOS)})")
    if len(set(hs)) != len(hs):
        erros.append("horário repetido na grade")
    refs = _controle_modelos()
    eps = [s.get("episodio") for s in slots if s.get("episodio")]
    if len(set(eps)) != len(eps):
        erros.append("o mesmo episódio aparece em dois horários")
    ativos = [s for s in sorted(slots, key=lambda s: s.get("horario", "")) if s.get("status") not in ("descartado", "vazio")]
    for s in slots:
        h = s.get("horario")
        st = s.get("status", "ideia")
        if st not in STATUS_SLOT:
            erros.append(f"{h}: status inválido {st}")
        if st in ("descartado", "vazio"):
            if not (s.get("motivo") or "").strip():
                erros.append(f"{h}: slot {st} precisa de `motivo`")
            continue
        t = s.get("territorio")
        if t and t not in TERRITORIOS:
            erros.append(f"{h}: território inválido {t} (use {', '.join(TERRITORIOS)})")
        o = s.get("origem")
        if o and o not in ORIGENS:
            erros.append(f"{h}: origem inválida {o} (use {', '.join(ORIGENS)})")
        if o == "modelos" and s.get("origemRef") not in refs:
            erros.append(f"{h}: origem `modelos` exige origemRef registrado em modelos/controle.json (rode modelos/verificar_pendentes.py)")
        pp = s.get("pushPull")
        if pp and pp not in PUSH_PULL:
            erros.append(f"{h}: pushPull inválido {pp}")
        m = s.get("modelo")
        if m and m not in MODELOS:
            erros.append(f"{h}: modelo inválido {m} (use {', '.join(MODELOS)})")
        if t == "agora":
            df = s.get("dataFato", "")
            try:
                idade = (d0 - dt.date.fromisoformat(df)).days
                if idade < 0 or idade > JANELA_AGORA_DIAS:
                    erros.append(f"{h}: AGORA exige fato dos últimos {JANELA_AGORA_DIAS} dias (dataFato {df} está a {idade} dias da grade)")
            except ValueError:
                erros.append(f"{h}: AGORA exige `dataFato` (AAAA-MM-DD) da data do evento/publicação")
        if st != "ideia":
            for campo in ("territorio", "origem", "pushPull", "ideia", "recompensa"):
                if not (s.get(campo) or "").strip():
                    erros.append(f"{h}: falta `{campo}` (slot já passou de ideia)")
        if st in EM_PRODUCAO:
            for campo in ("modelo", "justificativaModelo", "justificativaHorario", "episodio"):
                if not (s.get(campo) or "").strip():
                    erros.append(f"{h}: em produção sem `{campo}`")
    # cobertura de territórios e PUSH/PULL (só quando os 6 slots ativos têm território)
    terr = [s.get("territorio") for s in ativos if s.get("territorio")]
    if len(terr) == len(HORARIOS):
        faltam = [TERRITORIOS[k] for k in TERRITORIOS if k not in terr]
        guard(bool(faltam), f"territórios fora do dia: {', '.join(faltam)}", "territorios")
    pps = [s.get("pushPull") for s in ativos if s.get("pushPull")]
    if len(pps) == len(HORARIOS):
        npush = pps.count("push")
        guard(npush != 4, f"PUSH/PULL = {npush}/{len(pps) - npush} (orientação: 4/2)", "pushPull")
    nref = sum(1 for s in ativos if s.get("origem") == "modelos")
    guard(nref > MAX_REF_MODELOS_DIA, f"{nref} referências de modelos/ no dia (máximo {MAX_REF_MODELOS_DIA})", "modelos_ref")
    # guardrails dos 4 modelos
    mods = [(s.get("horario"), s.get("modelo")) for s in ativos if s.get("modelo")]
    cont = {}
    for _, m in mods:
        cont[m] = cont.get(m, 0) + 1
    for m, n in cont.items():
        guard(n > MAX_MODELO_DIA, f"{MODELOS.get(m, m)} usado {n}× no dia (máximo {MAX_MODELO_DIA})", "modelos")
    seq = [m for _, m in mods]
    for i in range(1, len(seq)):
        guard(seq[i] == seq[i - 1], f"{MODELOS.get(seq[i], seq[i])} em slots consecutivos ({mods[i - 1][0]} e {mods[i][0]})", "modelos")
    if len(mods) >= 5:
        guard(len(cont) < MIN_MODELOS_DIA, f"só {len(cont)} modelos diferentes no dia (mínimo {MIN_MODELOS_DIA}; ideal 4)", "modelos")
    semana = {}
    total = 0
    for gg in _grades_janela(data):
        for s in gg.get("slots", []):
            if s.get("modelo") and s.get("status") not in ("descartado", "vazio"):
                semana[s["modelo"]] = semana.get(s["modelo"], 0) + 1
                total += 1
    if total >= 12:
        for m, n in semana.items():
            guard(n / total > MAX_MODELO_SEMANA, f"{MODELOS.get(m, m)} = {n}/{total} ({n / total:.0%}) nos últimos 7 dias (máximo {MAX_MODELO_SEMANA:.0%})", "modelos")
    # Sistema Musical (TRILHAS/README.md): trilha por adequação + guardrails de repetição
    ids_trilha = set()
    if os.path.exists(CATALOGO_TRILHAS):
        ids_trilha = {t["id"] for t in json.load(open(CATALOGO_TRILHAS, encoding="utf-8"))["trilhas"]}
    trs = [(s.get("horario"), s.get("trilha")) for s in ativos if s.get("trilha")]
    for h, tr in trs:
        if ids_trilha and tr not in ids_trilha:
            erros.append(f"{h}: trilha {tr} não existe em TRILHAS/trilhas.json")
    for s in ativos:
        if s.get("trilha") and not (s.get("justificativaTrilha") or "").strip() and s.get("status") in EM_PRODUCAO:
            erros.append(f"{s.get('horario')}: em produção com trilha sem `justificativaTrilha`")
    ct = {}
    for _, tr in trs:
        ct[tr] = ct.get(tr, 0) + 1
    for tr, n in ct.items():
        guard(n > MAX_TRILHA_DIA, f"trilha {tr} usada {n}× no dia (máximo {MAX_TRILHA_DIA})", "trilhas")
    for i in range(1, len(trs)):
        guard(trs[i][1] == trs[i - 1][1], f"trilha {trs[i][1]} em slots seguidos ({trs[i - 1][0]} e {trs[i][0]})", "trilhas")
    sem_t, tot_t = {}, 0
    for gg in _grades_janela(data):
        for s in gg.get("slots", []):
            if s.get("trilha") and s.get("status") not in ("descartado", "vazio"):
                sem_t[s["trilha"]] = sem_t.get(s["trilha"], 0) + 1
                tot_t += 1
    if tot_t >= 12:
        for tr, n in sem_t.items():
            guard(n / tot_t > MAX_TRILHA_SEMANA, f"trilha {tr} = {n}/{tot_t} ({n / tot_t:.0%}) nos últimos 7 dias (máximo {MAX_TRILHA_SEMANA:.0%})", "trilhas")
    return erros, avisos


def slot_do_episodio(ep_id: str):
    """(data, slot) da grade que contém o episódio, ou (None, None)."""
    if not os.path.isdir(DIR):
        return None, None
    for nome in sorted(os.listdir(DIR)):
        if nome.endswith(".json") and len(nome) == 15:
            g = json.load(open(os.path.join(DIR, nome), encoding="utf-8"))
            for s in g.get("slots", []):
                if s.get("episodio") == ep_id:
                    return g["data"], s
    return None, None


def atribuir(data: str, horario: str, ep_id: str, formato: str, trilha: str = None) -> dict:
    """Liga o episódio ao slot (chamado por novo_episodio.build). Exige a pauta preenchida e o roteiro aprovado
    (status `roteiro_aprovado` = Aprovação 2 registrada). Idempotente para o mesmo episódio. Recusa se a grade
    ficar com qualquer ERRO (guardrail sem justificativa, campo faltando, horário inválido)."""
    g = carregar(data)
    s = next((x for x in g.get("slots", []) if x.get("horario") == horario), None)
    if s is None:
        raise SystemExit(f"grade {data} não tem o horário {horario} (válidos: {', '.join(HORARIOS)})")
    if s.get("status") in ("descartado", "vazio"):
        raise SystemExit(f"grade {data} {horario} está {s['status']}: {s.get('motivo', '')}")
    if s.get("episodio") and s["episodio"] != ep_id:
        raise SystemExit(f"grade {data} {horario} já pertence a {s['episodio']}")
    outro, _ = slot_do_episodio(ep_id)
    if outro and not (outro == data and s.get("episodio") == ep_id):
        raise SystemExit(f"{ep_id} já está ligado à grade {outro}; um episódio ocupa um único slot")
    if s.get("episodio") != ep_id and s.get("status") != "roteiro_aprovado":
        raise SystemExit(f"grade {data} {horario}: status `{s.get('status')}` — produção só começa com o roteiro aprovado "
                         f"(status `roteiro_aprovado`, Aprovação 2 da esteira)")
    for campo in ("territorio", "origem", "pushPull", "ideia", "recompensa", "justificativaModelo", "justificativaHorario"):
        if not (s.get(campo) or "").strip():
            raise SystemExit(f"grade {data} {horario}: preencha `{campo}` antes de criar o episódio")
    if formato not in MODELOS:
        raise SystemExit(f"formato {formato} não é um dos 4 modelos ({', '.join(MODELOS)})")
    if s.get("modelo") and s["modelo"] != formato:
        raise SystemExit(f"grade {data} {horario} escolheu o modelo {s['modelo']}, não {formato} — ajuste a grade (com justificativa) ou o formato")
    if trilha and s.get("trilha") and s["trilha"] != trilha:
        raise SystemExit(f"grade {data} {horario} escolheu a trilha {s['trilha']}, não {trilha} — ajuste a grade (com justificativa) ou a trilha")
    if trilha:
        s["trilha"] = trilha
        if not (s.get("justificativaTrilha") or "").strip():
            raise SystemExit(f"grade {data} {horario}: preencha `justificativaTrilha` (por que esta trilha serve a esta história)")
    s["modelo"] = formato
    s["episodio"] = ep_id
    if s.get("status") == "roteiro_aprovado":
        s["status"] = "producao"
    erros, _ = validar(g)
    if erros:
        raise SystemExit(f"grade {data} inválida — corrija antes de produzir (python3 PRODUCAO/tools/grade.py validar {data}):\n  - "
                         + "\n  - ".join(erros))
    salvar(g)
    return s


def resultado(data: str, horario: str, pares: list) -> dict:
    g = carregar(data)
    s = next((x for x in g.get("slots", []) if x.get("horario") == horario), None)
    if s is None:
        raise SystemExit(f"grade {data} não tem o horário {horario}")
    r = s.setdefault("resultados", {})
    for p in pares:
        k, _, v = p.partition("=")
        if not k or not v:
            raise SystemExit(f"use chave=valor (ex.: ig_alcance=1520 yt_views=300 tt_views=800 comentarios_sistema=4): {p!r}")
        try:
            r[k] = float(v) if "." in v else int(v)
        except ValueError:
            r[k] = v
    r["atualizado"] = dt.date.today().isoformat()
    if s.get("status") == "programado":
        s["status"] = "publicado"
    salvar(g)
    return r


def _tabela(g: dict) -> None:
    print(f"GRADE {g['data']} · status {g.get('status')}")
    for s in sorted(g.get("slots", []), key=lambda x: x.get("horario", "")):
        print(f"  {s.get('horario')}  {TERRITORIOS.get(s.get('territorio'), '—'):22} {s.get('pushPull') or '—':5} "
              f"{MODELOS.get(s.get('modelo'), '—'):27} {s.get('status'):16} {s.get('episodio') or ''}  {s.get('ideia', '')[:50]}")


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 0
    cmd = argv[1]
    if cmd == "nova":
        print("✓ criada:", nova(argv[2]))
        return 0
    if cmd == "validar":
        g = carregar(argv[2])
        erros, avisos = validar(g)
        for a in avisos:
            print("  AVISO ", a)
        for e in erros:
            print("  ERRO  ", e)
        print(f"grade {g['data']} — {len(erros)} erro(s), {len(avisos)} aviso(s)")
        return 1 if erros else 0
    if cmd == "status":
        data = argv[2] if len(argv) > 2 else dt.date.today().isoformat()
        _tabela(carregar(data))
        return 0
    if cmd == "semana":
        data = argv[2] if len(argv) > 2 else dt.date.today().isoformat()
        cont = {"territorio": {}, "modelo": {}, "trilha": {}, "pushPull": {}, "horario": {}}
        medias = {k: {} for k in cont}
        n = 0
        for g in _grades_janela(data):
            for s in g.get("slots", []):
                if s.get("status") in ("descartado", "vazio"):
                    continue
                n += 1
                nums = {k: v for k, v in (s.get("resultados") or {}).items() if isinstance(v, (int, float))}
                for k in cont:
                    if s.get(k):
                        cont[k][s[k]] = cont[k].get(s[k], 0) + 1
                        for mk, mv in nums.items():
                            medias[k].setdefault(s[k], {}).setdefault(mk, []).append(mv)
        print(f"7 dias até {data}: {n} slots")
        for k, v in cont.items():
            print(f"  {k}: " + ", ".join(f"{a} {b}" for a, b in sorted(v.items(), key=lambda x: -x[1])))
        for k, por in medias.items():
            for valor, mets in por.items():
                print(f"  resultados · {k}={valor}: " + ", ".join(f"{mk} média {sum(l) / len(l):.0f} (n={len(l)})" for mk, l in mets.items()))
        print("  (sinal, não lei: só mude a heurística com padrão recorrente — PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md §3D)")
        return 0
    if cmd == "resultado":
        print("✓", resultado(argv[2], argv[3], argv[4:]))
        return 0
    if cmd == "onde":
        data, s = slot_do_episodio(argv[2])
        print(f"{argv[2]} → grade {data} {s['horario']} ({s.get('status')})" if data else f"{argv[2]} não está em nenhuma grade")
        return 0 if data else 1
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv))
