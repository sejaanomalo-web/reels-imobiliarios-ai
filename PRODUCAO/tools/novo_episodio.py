"""Gera episode.json de um Reel novo (qualquer lote) e REGISTRA o estilo da esteira (tools/esteira.py).
Uso (a partir de PRODUCAO/): from novo_episodio import build, fx
  build(ep_id="ATIVO-L60-01", out="ATIVO_L60_01", lote="L60", fonte="ROTEIROS/EP011.md", title=..., S, L, sfx, prog, cta, diag, apur, lead)
Inclui a CTA SISTEMA (salvo cta_in_script=True), voice.shapePauses (pausas naturais) e a mesma base técnica do lote NOV26
(verde #02FB3F via kit A/aa, mix −15 LUFS)."""
import json, re, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from novo_episodio_nov26 import W, CTA, fx  # noqa: F401  (fx reexportado)
import esteira

def build(ep_id, out, lote, fonte, title, S, L, sfx, prog, cta, diag, apur, lead, cta_in_script=False, formato=None):
    """formato="cartoon-explicativo" (skill .claude/skills/ativo-cartoon-explicativo): NÃO registra estilo na esteira de 5
    estilos, cria os cues do fecho cartoon (cta_leads/cta_atend) e troca os SFX da CTA pelos do CtaCartoon."""
    base = json.load(open('episodes/ATIVO-NOV26-03/episode.json'))
    S = S + ([] if cta_in_script else CTA)
    segs = [dict(id=f"s{i+1}", scene=a, text=b, caption=c, pauseAfter=0.3) for i, (a, b, c) in enumerate(S)]
    for s in segs:
        assert re.findall(W, s['text']) == re.findall(W, s['caption'].replace('*', '').replace('|', '')), s['id']
        assert not re.search(r'[“"]\*|\*[”"]', s['caption']), f"{s['id']}: ênfase (*) colada às aspas gera asterisco visível"
    k = len(segs)
    L = L + [("cta_quer", f"s{k-1}", "Quer"), ("cta_sys", f"s{k-1}", "sistema"), ("cta_tiles", f"s{k-1}", "imóveis"), ("cta_comment", f"s{k}", "Comente"), ("cta_word", f"s{k}", "SISTEMA"), ("cta_direct", f"s{k}", "Direct")]
    if formato == "cartoon-explicativo":
        L = L + [("cta_leads", f"s{k-1}", "leads"), ("cta_atend", f"s{k-1}", "atendimentos")]
    C = {a: dict(seg=s, word=w, edge="start", offset=0) for a, s, w in L}; C["cta_end"] = dict(seg=f"s{k}", word="Direct", edge="end", offset=0)
    for a, v in C.items():
        seg = next(s for s in segs if s['id'] == v['seg']); assert v['word'] in re.findall(W, seg['text']), a
    if formato == "cartoon-explicativo":
        sfx = sfx + [fx("cta_quer", 0.05, "pop", -27, pitch=-2), fx("cta_tiles", -0.05, "pop", -25), fx("cta_leads", -0.05, "pop", -25, pitch=3),
                     fx("cta_atend", -0.05, "pop", -25, pitch=6), fx("cta_comment", -0.05, "pop", -25, pitch=3), fx("cta_word", 0.0, "typing", -29),
                     fx("cta_word", 0.75, "click", -24), fx("cta_word", 0.85, "whoosh_up", -28), fx("cta_direct", 0.0, "pop", -26, pitch=4),
                     fx("cta_direct", 1.2, "click", -23, pitch=5), fx("cta_direct", 1.28, "shimmer", -28)]
    else:
        sfx = sfx + [fx("cta_sys", 0.4, "whoosh_fold", -27), fx("cta_comment", -0.3, "pop", -25, pitch=3), fx("cta_word", 0.55, "typing", -30), fx("cta_end", 0.35, "shimmer", -28)]
    prog = prog + [{"at": "cue:cta_sys", "notes": [24, 36, 48, 52, 55, 62], "root": 36, "dens": 2, "bright": 0.6, "label": "Cadd9 — sistema"}]
    cta.update(type="comentario", keyword="SISTEMA", channel="Direct", base_text=base['cta']['base_text'], source="regra do cliente em 14/11/2026")
    ep = {x: base[x] for x in ['fps', 'width', 'height', 'leadIn', 'tail', 'accent', 'pronunciation', 'master']}
    ep.update(id=ep_id, lote=lote, title=title, outputDir=out,
              deliverables=dict(final=f"{out}_FINAL.mp4", narration=f"{out}_NARRACAO.wav", subtitles=f"{out}_legendas.srt", cover=f"{out}_capa.png"),
              fonte=fonte, apuracao=apur, diagnostico=diag, cta=cta, segments=segs,
              voice={"shapePauses": {"keepUnder": 0.22, "ratio": 0.6, "max": 0.6}, "nota": "regra do cliente 19/11/2026 (tarde): pausas de respiração e suspense, sem embolar nem arrastar; 1,0× sem time-stretch"},
              sceneLead=lead, hideCaptions=[], cues=C, series={}, sfx=sfx, music=dict(gain=-30, duck=-5.5, bpm=88, prog=prog))
    old = os.path.join('episodes', ep_id, 'episode.json')
    if os.path.exists(old):
        prev = json.load(open(old))
        for kk in ("estilo", "estiloNome", "esteira"):
            if kk in prev: ep[kk] = prev[kk]
    if formato:
        ep["formato"] = formato
    os.makedirs(f'episodes/{ep_id}', exist_ok=True)
    json.dump(ep, open(old, 'w'), ensure_ascii=False, indent=1)
    if formato:
        print(sum(len(re.findall(W, s['text'])) for s in segs), "palavras · formato", formato, "(fora da esteira de 5 estilos)")
        return
    n = esteira.registrar(ep_id)
    print(sum(len(re.findall(W, s['text'])) for s in segs), "palavras · estilo", n, esteira.nome(esteira.load(), n))
