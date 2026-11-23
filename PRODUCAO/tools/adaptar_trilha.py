"""Adapta uma trilha do catálogo (TRILHAS/trilhas.json) à HISTÓRIA de um episódio — Sistema Musical ATIVO (23/11/2026).

A duração da narrativa vem primeiro. A faixa é REORGANIZADA pela própria estrutura (seções, compassos e frases inteiras):
  SHORTEN  remove compassos/frases do miolo das seções (preserva a "cauda" que leva à próxima seção, a subida, o pré-drop e o final)
  EXTEND   repete só loops seguros medidos no catálogo
  FIT      grão fino sem esticar: paradas/respiros elásticos por tempo, aparo do início da intro, decaimento ou cauda sintética no fim
Velocidade e tom: 0% de alteração (registrado no relatório). Âncoras narrativas (virada, tensao, descoberta, insight, resolucao)
apontam para o início de uma seção; uma programação dinâmica escolhe a combinação que põe esses eventos perto das palavras e o
final natural da faixa no último quadro do vídeo. Crossfade de igual potência ANTES do tempo forte (o ataque que entra fica intacto).

Uso (a partir de PRODUCAO/):
  python3 tools/adaptar_trilha.py <EP>
      lê episodes/<EP>/episode.json → music.trilha + music.ancoras ({"insight": "cue:x_ins", ...}) e src/episodes/<EP>/timeline.json
      escreve public/<EP>/trilha.wav (NÃO versionado) e OUTPUT/<outputDir>/audio/trilha_plano.json
  python3 tools/adaptar_trilha.py teste --trilha T03 --duracao 50 [--ancoras virada=11.2,insight=43.1] --saida <pasta> [--nome x] [--simples] [--grafico]
Dependências: numpy, scipy, ffmpeg (matplotlib só para --grafico).
"""
import argparse
import json
import math
import os
import subprocess
import sys
import wave

import numpy as np
from scipy.signal import fftconvolve

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import trilhas as TR  # noqa: E402

SR = 48000
EPS = 0.012
DT = 0.02  # resolução da programação dinâmica (s)
PRIORIDADE = {"insight": 1.5, "descoberta": 1.2, "virada": 1.0, "tensao": 0.8, "resolucao": 0.8}
VERSAO = 1


# ---------------- áudio ----------------
def decodificar(path):
    if not os.path.exists(path):
        raise SystemExit(f"master ausente: {path} — reenvie o arquivo e copie para TRILHAS/masters/ (TRILHAS/README.md)")
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vn", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64).reshape(-1, 2)


def salvar_wav(path, x):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


class Perfil:
    """Energias por banda (24 bandas log 60 Hz–11 kHz) em quadros de 10 ms, para medir costuras."""
    HOP = 0.01

    def __init__(self, x):
        m = x.mean(axis=1)[::2].astype(np.float32)  # 24 kHz basta para bandas até 11 kHz
        sr = SR // 2
        hop = int(self.HOP * sr)
        win = 1024
        f = np.fft.rfftfreq(win, 1 / sr)
        edges = np.geomspace(60, 11000, 25)
        masks = [(f >= a) & (f < b) for a, b in zip(edges[:-1], edges[1:])]
        frames = max(1, (len(m) - win) // hop)
        jan = np.hanning(win).astype(np.float32)
        partes = []
        for i0 in range(0, frames, 1500):  # em blocos para não estourar memória
            k = np.arange(i0, min(frames, i0 + 1500))
            idx = np.arange(win)[None, :] + hop * k[:, None]
            F = np.abs(np.fft.rfft(m[idx] * jan[None, :], axis=1)) ** 2
            partes.append(np.stack([F[:, mk].sum(axis=1) for mk in masks], axis=1))
        self.B = np.log(np.concatenate(partes) + 1e-9)

    def janela(self, a, b):
        i, j = int(max(0, a) / self.HOP), int(max(0, b) / self.HOP)
        j = max(j, i + 1)
        return self.B[min(i, len(self.B) - 1):min(j, len(self.B))].mean(axis=0)

    def antes(self, x, w=0.3):
        return self.janela(x - w, x)

    def depois(self, x, w=0.3):
        return self.janela(x, x + w)


def _dist(a, b):
    return float(np.sqrt(((a - b) ** 2).mean()))


# ---------------- opções por seção ----------------
def _proibido(t, x):
    return any(a + EPS < x < b - EPS for a, b in t.get("proibido_cortar", []))


def opcoes_secao(t, s, perf, ref):
    us = TR.unidades(t, s)
    n = len(us) - 1
    full = us[-1] - us[0]
    valor = s.get("valor", 2)
    ops = []

    def seam(leave, enter):
        if abs(leave - enter) < EPS:
            return 0.0
        nat = max(_dist(perf.antes(enter), perf.depois(enter)), _dist(perf.antes(leave), perf.depois(leave)), ref)
        r = _dist(perf.antes(leave), perf.depois(enter)) / nat
        return 0.35 + 2.0 * max(0.0, r - 1.0)

    def add(pecas, desc, extra=0.0):
        dur = sum(b - a for a, b in pecas)
        cortes = [(pecas[k][1], pecas[k + 1][0]) for k in range(len(pecas) - 1) if abs(pecas[k][1] - pecas[k + 1][0]) > EPS]
        for leave, enter in cortes:
            if _proibido(t, leave) or _proibido(t, enter):
                return
        if pecas and (_proibido(t, pecas[0][0]) or _proibido(t, pecas[-1][1])):
            return
        removido = max(0.0, full - dur)
        custo = removido * valor * 0.12 + sum(seam(l, e) for l, e in cortes) + extra
        ops.append(dict(dur=dur, pecas=pecas, custo=custo, desc=desc, mantem=dur > 0))

    add([(us[0], us[-1])], "inteira")
    if s.get("pode_remover"):
        ops.append(dict(dur=0.0, pecas=[], custo=full * valor * 0.12 + 0.6, desc="removida", mantem=False))
    if s.get("inteira"):
        return ops
    trim = s.get("trim", "meio")
    passo = max(1, int(s.get("passo", 1)))
    cauda = int(s.get("cauda", 0)) if trim == "meio" else 0
    mn = max(int(s.get("min", 1)), cauda, 1)
    for k in range(n - 1, mn - 1, -1):
        if (n - k) % passo:
            continue
        if trim == "inicio":
            add([(us[n - k], us[n])], f"{k}/{n} (aparo do início)")
        elif trim == "fim" or cauda == 0:
            add([(us[0], us[k])], f"{k}/{n} (aparo do fim)")
        else:
            head = k - cauda
            pecas = ([(us[0], us[head])] if head > 0 else []) + [(us[n - cauda], us[n])]
            add(pecas, f"{k}/{n} (miolo removido, cauda {cauda})")
            if s["tipo"] in ("climax", "a", "b"):  # só a cabeça (perde a transição; a costura decide se vale)
                add([(us[0], us[k])], f"{k}/{n} (só a cabeça)", extra=0.5)
    if s.get("loop"):
        a, b = s["loop"]
        for r in range(1, int(s.get("loop_max", 3)) + 1):
            add([(us[0], b)] + [(a, b)] * r + [(b, us[-1])], f"inteira + loop×{r}", extra=(0.6 if s["tipo"] == "cama" else 1.2) * r)
    if s["tipo"] == "parada" and n >= 2:  # respiro elástico: alonga repetindo um tempo do meio (o último leva ao golpe)
        m = 1 if n >= 3 else 0
        for r in (1, 2):
            add([(us[0], us[m + 1])] + [(us[m], us[m + 1])] * r + [(us[m + 1], us[-1])], f"respiro +{r} tempo", extra=0.8 * r)
    return ops


def limites(t):
    """(mínima, máxima) aproximadas em segundos: seções obrigatórias no mínimo × tudo com loops no máximo, + cauda/decaimento."""
    mn = mx = 0.0
    for s in t["secoes"]:
        us = TR.unidades(t, s)
        full = us[-1] - us[0]
        if s.get("inteira"):
            mn += 0 if s.get("pode_remover") else full
        elif not s.get("pode_remover"):
            k = max(int(s.get("min", 1)), int(s.get("cauda", 0)) if s.get("trim", "meio") == "meio" else 0, 1)
            mn += min(np.diff(us)[:k].sum(), full)
        mx += full + ((s["loop"][1] - s["loop"][0]) * int(s.get("loop_max", 3)) if s.get("loop") else 0)
    fin = t["final"]
    return round(mn - 0.6 * fin.get("decaimento", 0.4), 1), round(mx + fin.get("cauda_sintetica", 1.0) + 1.0, 1)


# ---------------- plano (programação dinâmica) ----------------
def custo_ancora(err, funcao):
    a = abs(err)
    if err <= 0:  # música antes da palavra (antecipação) é mais natural
        c = 4 * a if a <= 0.35 else 4 * 0.35 + 9 * (a - 0.35)
    else:
        c = 9 * a
    if a > 1.0:
        c *= 1.5
    return c * PRIORIDADE.get(funcao, 1.0)


def planejar(t, D, ancoras, audio=None):
    """Devolve (plano, relatório-parcial). ancoras = {funcao: segundos}."""
    x = audio if audio is not None else decodificar(TR.master_path(t))
    perf = Perfil(x)
    tec = t["tecnico"]
    beat = 60.0 / tec["bpm"] if tec.get("bpm") else 1.0
    ref = np.median([_dist(perf.antes(q), perf.depois(q)) for q in np.arange(2.0, t["master"]["util"][1] - 2, beat * 4)])
    secs = t["secoes"]
    # mapeamento função → seção (em colisão vale a de maior prioridade)
    alvo = {}
    ignoradas = []
    ordem = {s["id"]: k for k, s in enumerate(secs)}
    for f, tf in sorted(ancoras.items(), key=lambda kv: -PRIORIDADE.get(kv[0], 0.5)):
        sid = t["funcoes"].get(f)
        if not sid:
            ignoradas.append(dict(funcao=f, alvo=tf, motivo="esta faixa não tem evento para essa função (use efeito/respiro)"))
        elif sid in alvo:
            ignoradas.append(dict(funcao=f, alvo=tf, motivo=f"mesma seção ({sid}) de uma âncora mais importante"))
        elif any((ordem[sid] - ordem[o]) * (tf - tt) < 0 for o, (_, tt) in alvo.items()):
            ignoradas.append(dict(funcao=f, alvo=tf, motivo=f"ordem da narrativa diferente da ordem da faixa ({sid}); a âncora mais importante foi mantida"))
        else:
            alvo[sid] = (f, tf)
    opts = [opcoes_secao(t, s, perf, ref) for s in secs]
    entradas = set(t.get("entradas") or [secs[0]["id"]])
    fin = t["final"]
    T_final = secs[-1]["fim"] - secs[-1]["ini"]
    decai = fin.get("decaimento", 0.4)
    cauda_max = fin.get("cauda_sintetica", 1.0)
    # estado: (bin de tempo, fim da última peça na fonte) → (custo, (estado anterior, opção))
    dp = {(0, -1.0): (0.0, None)}
    hist = []
    for i, (s, ops) in enumerate(zip(secs, opts)):
        nd = {}
        for (tb, last), (c0, _) in dp.items():
            t0 = tb * DT
            for oi, o in enumerate(ops):
                if last < 0 and o["mantem"] and s["id"] not in entradas:  # o vídeo só pode abrir numa entrada da faixa
                    continue
                c = c0 + o["custo"]
                if s["id"] in alvo:
                    f, tf = alvo[s["id"]]
                    c += custo_ancora(t0 - tf, f) if o["mantem"] else 40.0 * PRIORIDADE.get(f, 1)
                if o["pecas"] and last >= 0 and abs(o["pecas"][0][0] - last) > EPS:  # costura entre seções (seção removida antes)
                    l, e = last, o["pecas"][0][0]
                    nat = max(_dist(perf.antes(e), perf.depois(e)), _dist(perf.antes(l), perf.depois(l)), ref)
                    c += 0.35 + 2.0 * max(0.0, _dist(perf.antes(l), perf.depois(e)) / nat - 1.0)
                t1 = t0 + o["dur"]
                if t1 > D + decai + 0.5:
                    continue
                if i == len(secs) - 1:  # final: precisa fechar no último quadro do vídeo
                    sobra = t1 - D
                    if sobra > 0.6 * decai or -sobra > cauda_max + 1.0:  # nunca cortar o golpe final: só até 60% do decaimento
                        continue
                    c += 2.0 * sobra if sobra >= 0 else (3.0 * -sobra if -sobra <= cauda_max else 3.0 * cauda_max + 20 * (-sobra - cauda_max))
                key = (int(round(t1 / DT)), o["pecas"][-1][1] if o["pecas"] else last)
                if key not in nd or c < nd[key][0]:
                    nd[key] = (c, ((tb, last), oi))
        if not nd:
            mn, mx = limites(t)
            raise SystemExit(f"{t['id']}: não há plano possível para {D:.1f} s (esta faixa serve de ~{mn:.0f} a ~{mx:.0f} s; "
                             f"seções obrigatórias e final não fecham) — escolha outra trilha para esta duração")
        hist.append(nd)
        dp = nd
    best = min(dp.items(), key=lambda kv: kv[1][0])
    # reconstrução
    escolha = []
    key, (custo_total, back) = best
    for i in range(len(secs) - 1, -1, -1):
        prev, oi = back
        escolha.append(oi)
        if i > 0:
            back = hist[i - 1][prev][1]
    escolha.reverse()
    plano, pecas, cursor = [], [], 0.0
    anc_rep = []
    for s, ops, oi in zip(secs, opts, escolha):
        o = ops[oi]
        plano.append(dict(secao=s["id"], tipo=s["tipo"], opcao=o["desc"], fonte=[s["ini"], s["fim"]], mantido=round(o["dur"], 3),
                          removido=round((s["fim"] - s["ini"]) - o["dur"], 3) if o["dur"] <= s["fim"] - s["ini"] else 0.0,
                          saida_ini=round(cursor, 3)))
        if s["id"] in alvo:
            f, tf = alvo[s["id"]]
            anc_rep.append(dict(funcao=f, secao=s["id"], alvo=round(tf, 3), obtido=round(cursor, 3) if o["mantem"] else None,
                                erro=round(cursor - tf, 3) if o["mantem"] else None))
        for p in o["pecas"]:
            pecas.append(dict(secao=s["id"], fonte=[round(p[0], 4), round(p[1], 4)], saida=[round(cursor, 4), round(cursor + p[1] - p[0], 4)]))
            cursor += p[1] - p[0]
    util = t["master"]["util"][1] - t["master"]["util"][0]
    modo = "SHORTEN" if D < util - 1.0 else ("EXTEND" if D > util + 1.0 else "FIT")
    return dict(plano=plano, pecas=pecas, ancoras=anc_rep, ancoras_ignoradas=ignoradas, fim_musical=round(cursor, 3), custo=round(custo_total, 2),
                modo=modo, ref_costura=round(float(ref), 4)), x, perf


# ---------------- render ----------------
def renderizar(t, D, rel, x):
    N = int(round(D * SR))
    xf = float(t.get("crossfade", 0.05))
    out = np.zeros((max(N, int(rel["fim_musical"] * SR) + SR), 2))
    cortes = []
    cur = 0
    prev_end = None
    for p in rel["pecas"]:
        a, b = int(round(p["fonte"][0] * SR)), int(round(p["fonte"][1] * SR))
        seg = x[a:b]
        if prev_end is not None and abs(prev_end - a) > int(EPS * SR):
            n = int(xf * SR)
            n = min(n, a, cur)
            if n > 8:
                ang = np.linspace(0, np.pi / 2, n)[:, None]
                out[cur - n:cur] *= np.cos(ang)
                out[cur - n:cur] += x[a - n:a] * np.sin(ang)
            cortes.append(dict(saida=round(cur / SR, 3), sai_da_fonte=round(prev_end / SR, 3), entra_na_fonte=round(a / SR, 3), crossfade_s=round(n / SR, 3)))
        out[cur:cur + len(seg)] += seg
        cur += len(seg)
        prev_end = b
    fim = cur
    fin = t["final"]
    ajuste = "exato"
    if fim > N:  # sobra no decaimento: fade até o último quadro
        f = int(min(1.0, max(0.25, (fim - N) / SR + 0.35)) * SR)
        out[N - f:N] *= np.linspace(1, 0, f)[:, None] ** 1.5
        ajuste = f"decaimento aparado {(fim - N) / SR:.2f} s com fade de {f / SR:.2f} s"
    elif fim < N or fin.get("tipo") in ("seco", "cortado"):  # cauda sintética: reverberação da última meia batida
        lenc = max(N - fim, 0)
        src = out[max(0, fim - int(0.35 * SR)):fim]
        if lenc > 0 and len(src):
            rt = max(0.6, lenc / SR + 0.4)
            rng = np.random.default_rng(3)
            ir_n = int(rt * SR)
            tail = np.zeros((len(src) + ir_n - 1, 2))
            for ch in range(2):
                ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / (rt * SR / 6.9))
                ir /= np.sqrt((ir ** 2).sum())
                tail[:, ch] = fftconvolve(src[:, ch], ir)
            tail = tail[len(src):len(src) + lenc] * 0.5
            out[fim:fim + len(tail)] += tail * np.linspace(1, 0, len(tail))[:, None] ** 2
            ajuste = f"cauda sintética {lenc / SR:.2f} s (reverberação da última batida)"
        # suaviza a parada seca para não clicar
        g = int(0.03 * SR)
        if fim > g:
            out[fim - g:fim] *= np.linspace(1, 0.55, g)[:, None]
    out = out[:N]
    g0 = int(0.005 * SR)
    out[:g0] *= np.linspace(0, 1, g0)[:, None]
    if N > int(0.02 * SR):
        g = int(0.02 * SR)
        out[-g:] *= np.linspace(1, 0, g)[:, None]
    rel["final"] = dict(tipo=fin.get("tipo"), fim_musical=round(fim / SR, 3), video=round(D, 3), ajuste=ajuste)
    rel["cortes"] = cortes
    return out


def avaliar_costuras(rel, y, perf_fonte):
    """Nota de cada costura: mudança espectral no corte ÷ a maior mudança natural nos dois pontos da fonte."""
    py = Perfil(y)
    for c in rel["cortes"]:
        T = c["saida"]
        d_cut = _dist(py.antes(T), py.depois(T))
        nat = max(_dist(perf_fonte.antes(c["entra_na_fonte"]), perf_fonte.depois(c["entra_na_fonte"])),
                  _dist(perf_fonte.antes(c["sai_da_fonte"]), perf_fonte.depois(c["sai_da_fonte"])), rel["ref_costura"])
        r = d_cut / nat
        i = int(T * SR)
        w = y[max(0, i - 240):i + 240, 0]
        salto = float(np.abs(np.diff(w)).max() / (np.sqrt((w ** 2).mean()) + 1e-9)) if len(w) > 10 else 0
        c["razao"] = round(r, 2)
        c["nota"] = "natural" if r <= 1.3 else ("atenção" if r <= 2.0 else "perceptível")
        c["salto_amostra"] = round(salto, 2)
    return rel


def lufs(y):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", "loudnorm=print_format=json", "-f", "null", "-"],
                       input=y.astype(np.float32).tobytes(), capture_output=True)
    e = p.stderr.decode()
    j = json.loads(e[e.rindex("{"): e.rindex("}") + 1])
    return float(j["input_i"]), float(j["input_tp"])


def adaptar(tid, D, ancoras=None, cat=None):
    """API: (audio N×2 a 48 kHz, relatório). Usada por build_audio.py e pelos testes."""
    t = TR.trilha(tid, cat)
    ancoras = {k: float(v) for k, v in (ancoras or {}).items() if v is not None and 0 <= float(v) <= D}
    rel, x, perf = planejar(t, D, ancoras)
    y = renderizar(t, D, rel, x)
    avaliar_costuras(rel, y, perf)
    li, tp = lufs(y)
    rel.update(versao=VERSAO, trilha=tid, nome=t["nome"], licenca=t["licenca"]["status"], duracao_video=round(D, 3), amostras=len(y),
               alteracao_velocidade_pct=0.0, alteracao_tom_semitons=0, lufs=round(li, 1), true_peak=round(tp, 1),
               bpm=t["tecnico"].get("bpm"), tom=t["tecnico"].get("tom"))
    return y, rel


def resumo(rel):
    linhas = [f"{rel['trilha']} {rel['nome']} → {rel['duracao_video']:.2f} s · modo {rel['modo']} · velocidade {rel['alteracao_velocidade_pct']}% · tom {rel['alteracao_tom_semitons']} st · licença {rel['licenca']}"]
    for p in rel["plano"]:
        linhas.append(f"   {p['saida_ini']:6.2f}s  {p['secao']:10} {p['opcao']:34} mantido {p['mantido']:6.2f}s  removido {p['removido']:6.2f}s")
    for a in rel["ancoras"]:
        e = a["erro"]
        linhas.append(f"   âncora {a['funcao']:10} alvo {a['alvo']:6.2f}s → {a['secao']} em {a['obtido'] if a['obtido'] is not None else '—'}s"
                      f" (erro {'—' if e is None else f'{e:+.2f}s'})")
    for a in rel["ancoras_ignoradas"]:
        linhas.append(f"   âncora {a['funcao']:10} alvo {a['alvo']:6.2f}s → sem evento ({a['motivo']})")
    for c in rel["cortes"]:
        linhas.append(f"   costura {c['saida']:6.2f}s  fonte {c['sai_da_fonte']:.2f}→{c['entra_na_fonte']:.2f}  xf {c['crossfade_s']}s  razão {c['razao']} ({c['nota']})")
    linhas.append(f"   final: {rel['final']['ajuste']} · {rel['lufs']} LUFS · TP {rel['true_peak']} dBTP")
    return "\n".join(linhas)


def grafico(path, t, rel, y, x, D):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    def env(z):
        m = z.mean(axis=1)
        n = int(0.05 * SR)
        k = len(m) // n
        r = np.sqrt((m[:k * n].reshape(k, n) ** 2).mean(axis=1))
        return np.arange(k) * 0.05, 20 * np.log10(np.convolve(r, np.ones(5) / 5, "same") + 1e-6)

    fig, ax = plt.subplots(2, 1, figsize=(15, 6.5))
    tx, ex = env(x[:int(t["master"]["util"][1] * SR)])
    ax[0].plot(tx, ex, color="0.3", lw=0.8)
    for s in t["secoes"]:
        ax[0].axvline(s["ini"], color="0.7", lw=0.6)
        ax[0].text(s["ini"] + 0.3, -18, s["id"], fontsize=8)
    for p in rel["pecas"]:
        ax[0].axvspan(p["fonte"][0], p["fonte"][1], color="tab:green", alpha=0.18)
    ax[0].set_title(f"{t['id']} original ({t['master']['util'][1]:.0f} s) — verde = trechos usados", loc="left")
    ty, ey = env(y)
    ax[1].plot(ty, ey, color="k", lw=0.8)
    for p in rel["plano"]:
        if p["mantido"] > 0:
            ax[1].axvline(p["saida_ini"], color="0.7", lw=0.6)
            ax[1].text(p["saida_ini"] + 0.2, -18, p["secao"], fontsize=8)
    for c in rel["cortes"]:
        ax[1].axvline(c["saida"], color={"natural": "tab:green", "atenção": "tab:orange"}.get(c["nota"], "tab:red"), lw=1.2, ls="--")
    for a in rel["ancoras"]:
        ax[1].axvline(a["alvo"], color="tab:blue", lw=1.5)
        ax[1].text(a["alvo"] + 0.2, -55, a["funcao"], color="tab:blue", fontsize=9)
    ax[1].set_title(f"adaptada para {D:.1f} s — azul = âncora da narrativa; tracejado = costura (verde natural / laranja atenção / vermelho perceptível)", loc="left")
    for a_ in ax:
        a_.set_ylim(-60, -15)
        a_.set_xlim(0, max(t["master"]["util"][1], D) + 1)
    fig.tight_layout()
    fig.savefig(path, dpi=80)
    plt.close(fig)


# ---------------- CLI ----------------
def _ancoras_do_episodio(ep, tl):
    out = {}
    for f, v in (ep.get("music", {}).get("ancoras") or {}).items():
        if isinstance(v, (int, float)):
            out[f] = float(v)
        elif isinstance(v, str) and v.startswith("cue:"):
            nome = v[4:]
            if nome not in tl["cues"]:
                raise SystemExit(f"âncora {f}: cue {nome!r} não existe na timeline")
            out[f] = float(tl["cues"][nome])
        elif isinstance(v, str) and v.startswith("scene:"):
            sc = {s["id"]: s for s in tl["scenes"]}
            out[f] = float(sc[v[6:]]["start"])
    return out


def adaptar_episodio(EP):
    ep = json.load(open(os.path.join(TR.PROD, "episodes", EP, "episode.json"), encoding="utf-8"))
    tl = json.load(open(os.path.join(TR.PROD, "src", "episodes", EP, "timeline.json"), encoding="utf-8"))
    tid = (ep.get("music") or {}).get("trilha")
    if not tid:
        raise SystemExit(f"{EP}: episode.json sem music.trilha")
    D = float(tl["duration"])
    y, rel = adaptar(tid, D, _ancoras_do_episodio(ep, tl))
    rel["episodio"] = EP
    salvar_wav(os.path.join(TR.PROD, "public", EP, "trilha.wav"), y)
    outd = os.path.join(TR.REPO, "OUTPUT", ep.get("outputDir", EP), "audio")
    os.makedirs(outd, exist_ok=True)
    json.dump(rel, open(os.path.join(outd, "trilha_plano.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return y, rel


def main(argv):
    if len(argv) > 1 and argv[1] != "teste":
        _, rel = adaptar_episodio(argv[1])
        print(resumo(rel))
        return 0
    ap = argparse.ArgumentParser(prog="adaptar_trilha.py teste")
    ap.add_argument("cmd")
    ap.add_argument("--trilha", required=True)
    ap.add_argument("--duracao", type=float, required=True)
    ap.add_argument("--ancoras", default="")
    ap.add_argument("--saida", required=True)
    ap.add_argument("--nome")
    ap.add_argument("--simples", action="store_true", help="também grava o corte simples de hoje (corta no tamanho, sem estrutura)")
    ap.add_argument("--grafico", action="store_true")
    a = ap.parse_args(argv[1:])
    anc = dict(kv.split("=") for kv in a.ancoras.split(",") if kv) if a.ancoras else {}
    y, rel = adaptar(a.trilha, a.duracao, anc)
    nome = a.nome or f"{a.trilha}_{a.duracao:.0f}s"
    salvar_wav(os.path.join(a.saida, f"{nome}.wav"), y)
    json.dump(rel, open(os.path.join(a.saida, f"{nome}_plano.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    t = TR.trilha(a.trilha)
    x = decodificar(TR.master_path(t))
    if a.simples:
        N = int(round(a.duracao * SR))
        salvar_wav(os.path.join(a.saida, f"{nome}_CORTE_SIMPLES.wav"), np.pad(x[:N], ((0, max(0, N - len(x))), (0, 0))))
    if a.grafico:
        grafico(os.path.join(a.saida, f"{nome}_mapa.png"), t, rel, y, x, a.duracao)
    print(resumo(rel))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
