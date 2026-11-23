"""Gera episode.json de um Reel novo (qualquer lote), LIGA o episódio ao slot da GRADE DO DIA e REGISTRA o modelo audiovisual
(Esteira Editorial Diária, 23/11/2026 — PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md).
- `formato` é obrigatório: um dos 4 modelos ("cartoon-explicativo", "pictograma-cinematografico", "planta-tecnica", "maquete-3d"),
  escolhido por ADEQUAÇÃO (não existe mais "modelo da vez"; guardrails em tools/grade.py validar).
- `grade="AAAA-MM-DD"` e `slot="HH:MM"` são obrigatórios para episódio novo: o slot precisa estar com o roteiro aprovado
  (status `roteiro_aprovado`) e a grade sem erro. Peça fora da grade (piloto, teste, anúncio) só com
  ATIVO_FORA_DA_GRADE="<motivo aprovado pelo cliente>" (fica gravado no episode.json).
- A esteira de 5 estilos está arquivada: sem `formato`, só regera episode.json de episódio JÁ entregue nela.
Uso (a partir de PRODUCAO/): from novo_episodio import build, fx
  build(ep_id="ATIVO-D1126-08", out="ATIVO_D1126_08", lote="D1126", fonte="ROTEIROS/…", title=..., S, L, sfx, prog, cta, diag, apur, lead,
        formato="maquete-3d", grade="2026-11-26", slot="08:00")
- Sistema Musical: `trilha="T03"` (TRILHAS/trilhas.json) e `ancoras={"descoberta": "cue:b_out", "insight": "cue:c_corr"}` gravam music.trilha/ancoras;
  build_audio.py passa à mixagem v2 (trilha adaptada à história, sem esticar). Sem trilha, a trilha sintetizada de sempre.
Inclui a CTA SISTEMA (salvo cta_in_script=True), voice.shapePauses (pausas naturais) e a mesma base técnica do lote NOV26
(verde #02FB3F via kit A/aa, mix −15 LUFS)."""
import json, re, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from novo_episodio_nov26 import W, CTA, fx  # noqa: F401  (fx reexportado)
import esteira
import grade as grade_mod

def build(ep_id, out, lote, fonte, title, S, L, sfx, prog, cta, diag, apur, lead, cta_in_script=False, formato=None, grade=None, slot=None,
          trilha=None, ancoras=None):
    """formato="cartoon-explicativo" (Primeiro modelo), "pictograma-cinematografico" (Segundo), "planta-tecnica" (Terceiro) ou "maquete-3d" (Quarto),
    escolhido por adequação; grade/slot = horário da grade do dia (tools/grade.py). Cria os cues do fecho (cta_leads/cta_atend), troca os SFX da
    CTA pelos do fecho do modelo, liga o episódio ao slot e registra o modelo (tools/esteira.py). Não usa a esteira de 5 estilos (arquivada)."""
    base = json.load(open('episodes/ATIVO-NOV26-03/episode.json'))
    # Sistema Visual ATIVO (Nível 1): todo formato precisa ser um modelo REGISTRADO e ativo em
    # MARCA/sistema-visual/modelos.json (processo de MARCA/sistema-visual/NOVO_MODELO.md). Formato desconhecido não cria episódio.
    ds_dir = os.path.join('..', 'MARCA', 'sistema-visual')
    ds_ver = json.load(open(os.path.join(ds_dir, 'tokens.json')))['versao']
    modelos = {m['formato'] for m in json.load(open(os.path.join(ds_dir, 'modelos.json')))['modelos'] if m.get('formato') and m['status'] == 'ativo'}
    legado5 = {h["episodio"] for h in esteira.load().get("historico", [])}
    if not formato and ep_id not in legado5:
        raise SystemExit("formato obrigatório (Esteira Editorial Diária, 23/11/2026): escolha o modelo por adequação — "
                         "\"cartoon-explicativo\", \"pictograma-cinematografico\", \"planta-tecnica\" ou \"maquete-3d\" "
                         "(PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md §6; desempate: python3 tools/esteira.py diversidade). A esteira de 5 estilos está arquivada.")
    if formato and formato not in modelos:
        raise SystemExit(f"formato '{formato}' não está registrado como modelo ativo em MARCA/sistema-visual/modelos.json — siga MARCA/sistema-visual/NOVO_MODELO.md")
    old_ep = os.path.join('episodes', ep_id, 'episode.json')
    prev = json.load(open(old_ep)) if os.path.exists(old_ep) else {}
    fora = os.environ.get("ATIVO_FORA_DA_GRADE", "").strip() or prev.get("foraDaGrade", "")
    if formato and not (grade and slot):
        if prev.get("grade"):  # regerar episódio que já está na grade: mantém o mesmo slot
            grade, slot = prev["grade"]["data"], prev["grade"]["slot"]
        elif not fora:
            raise SystemExit("episódio novo precisa da grade do dia: build(..., grade=\"AAAA-MM-DD\", slot=\"HH:MM\") com o slot em "
                             "`roteiro_aprovado` (python3 tools/grade.py status AAAA-MM-DD). Peça fora da grade (piloto, teste, anúncio) "
                             "só com ATIVO_FORA_DA_GRADE=\"<motivo aprovado pelo cliente>\".")
    S = S + ([] if cta_in_script else CTA)
    segs = [dict(id=f"s{i+1}", scene=a, text=b, caption=c, pauseAfter=0.3) for i, (a, b, c) in enumerate(S)]
    for s in segs:
        assert re.findall(W, s['text']) == re.findall(W, s['caption'].replace('*', '').replace('|', '')), s['id']
        assert not re.search(r'[“"]\*|\*[”"]', s['caption']), f"{s['id']}: ênfase (*) colada às aspas gera asterisco visível"
    k = len(segs)
    L = L + [("cta_quer", f"s{k-1}", "Quer"), ("cta_sys", f"s{k-1}", "sistema"), ("cta_tiles", f"s{k-1}", "imóveis"), ("cta_comment", f"s{k}", "Comente"), ("cta_word", f"s{k}", "SISTEMA"), ("cta_direct", f"s{k}", "Direct")]
    if formato in modelos:  # todo modelo registrado tem o fecho-ritual com IMÓVEIS / LEADS / ATENDIMENTOS (assinatura 6)
        L = L + [("cta_leads", f"s{k-1}", "leads"), ("cta_atend", f"s{k-1}", "atendimentos")]
    C = {a: dict(seg=s, word=w, edge="start", offset=0) for a, s, w in L}; C["cta_end"] = dict(seg=f"s{k}", word="Direct", edge="end", offset=0)
    for a, v in C.items():
        seg = next(s for s in segs if s['id'] == v['seg']); assert v['word'] in re.findall(W, seg['text']), a
    if formato == "cartoon-explicativo":
        sfx = sfx + [fx("cta_quer", 0.05, "pop", -27, pitch=-2), fx("cta_tiles", -0.05, "pop", -25), fx("cta_leads", -0.05, "pop", -25, pitch=3),
                     fx("cta_atend", -0.05, "pop", -25, pitch=6), fx("cta_comment", -0.05, "pop", -25, pitch=3), fx("cta_word", 0.0, "typing", -29),
                     fx("cta_word", 0.75, "click", -24), fx("cta_word", 0.85, "whoosh_up", -28), fx("cta_direct", 0.0, "pop", -26, pitch=4),
                     fx("cta_direct", 1.2, "click", -23, pitch=5), fx("cta_direct", 1.28, "shimmer", -28)]
    elif formato == "pictograma-cinematografico":
        sfx = sfx + [fx("cta_quer", -0.1, "swish", -29), fx("cta_tiles", -0.05, "pin", -27), fx("cta_leads", -0.05, "pin", -27, pitch=3),
                     fx("cta_atend", -0.05, "pin", -27, pitch=6), fx("cta_comment", -0.15, "whoosh_fold", -28), fx("cta_word", 0.0, "typing", -29),
                     fx("cta_direct", -0.1, "whoosh_up", -28), fx("cta_direct", 1.1, "shimmer", -25), fx("cta_direct", 2.3, "chord", -27)]
    elif formato == "planta-tecnica":  # fecho CtaPlanta: ambientes que acendem, campo que digita, rota de envio, logo assinado
        sfx = sfx + [fx("cta_quer", -0.1, "swish", -29), fx("cta_tiles", -0.05, "pin", -27), fx("cta_leads", -0.05, "pin", -27, pitch=3),
                     fx("cta_atend", -0.05, "pin", -27, pitch=6), fx("cta_comment", -0.15, "whoosh_fold", -28), fx("cta_word", 0.0, "typing", -29),
                     fx("cta_word", 0.6, "click", -24), fx("cta_direct", -0.1, "whoosh_up", -28), fx("cta_direct", 0.85, "shimmer", -27)]
    elif formato == "maquete-3d":  # fecho ModulosSistema + CtaMaquete: módulos brotam, acendem, campo digita, logo
        sfx = sfx + [fx("cta_quer", 0.1, "pop", -29, pitch=-3), fx("cta_tiles", -0.05, "pin", -27), fx("cta_leads", -0.05, "pin", -27, pitch=3),
                     fx("cta_atend", -0.05, "pin", -27, pitch=6), fx("cta_comment", -0.2, "whoosh_fold", -28), fx("cta_word", 0.0, "typing", -29),
                     fx("cta_word", 0.6, "click", -24), fx("cta_direct", 0.7, "shimmer", -27)]
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
    # Sistema Musical (TRILHAS/README.md): trilha do catálogo + âncoras narrativas (função → cue do roteiro)
    if trilha:
        import trilhas as _TR
        _t = _TR.trilha(trilha)
        validas = set(_TR.catalogo()["funcoes_narrativas"])
        anc = dict(ancoras or {})
        for f, v in anc.items():
            if f not in validas:
                raise SystemExit(f"âncora {f!r} inválida (use {', '.join(sorted(validas))})")
            if not (isinstance(v, (int, float)) or (isinstance(v, str) and (v.startswith("scene:") or (v.startswith("cue:") and v[4:] in C)))):
                raise SystemExit(f"âncora {f}: {v!r} precisa ser 'cue:<nome definido em L>', 'scene:<id>' ou segundos")
        ep["music"].update(trilha=trilha, ancoras=anc, nota="mixagem v2 (build_audio.py): trilha adaptada à história por tools/adaptar_trilha.py; prog/bpm acima ficam sem uso")
        if not _TR.publicavel(_t):
            print(f"⚠ trilha {trilha} com licença `{_t['licenca']['status']}`: só teste interno — publicar.py vai recusar (TRILHAS/README.md)")
    old = old_ep
    for kk in ("estilo", "estiloNome", "esteira", "rotacao", "modelos4", "modelo", "modeloNome", "grade", "foraDaGrade"):
        if kk in prev: ep[kk] = prev[kk]
    if not trilha and (prev.get("music") or {}).get("trilha"):  # regerar sem passar trilha mantém a escolha
        for kk in ("trilha", "ancoras", "nota", "mix"):
            if kk in prev["music"]:
                ep["music"][kk] = prev["music"][kk]
        trilha = prev["music"]["trilha"]
    if formato:
        ep["formato"] = formato
    ep["sistemaVisual"] = ds_ver  # versão do Nível 1 com que o episódio foi criado (MARCA/sistema-visual/CHANGELOG.md)
    if formato and grade and slot:  # liga ao slot ANTES de gravar: grade inválida ou roteiro não aprovado = nada é escrito
        sl = grade_mod.atribuir(grade, slot, ep_id, formato, trilha=trilha)
        ep["grade"] = {k: sl.get(k, "") for k in ("territorio", "origem", "origemRef", "dataFato", "pushPull", "justificativaModelo", "justificativaHorario", "trilha", "justificativaTrilha")}
        ep["grade"].update(data=grade, slot=slot, arquivo=f"PRODUCAO/grade/{grade}.json")
        ep.pop("foraDaGrade", None)
    elif formato and fora:
        ep["foraDaGrade"] = fora
    os.makedirs(f'episodes/{ep_id}', exist_ok=True)
    json.dump(ep, open(old, 'w'), ensure_ascii=False, indent=1)
    if not formato:  # episódio entregue na esteira de 5 (arquivada): só regera o episode.json, sem registrar nada
        print(sum(len(re.findall(W, s['text'])) for s in segs), "palavras · legado da esteira de 5 estilos (arquivada)")
        return
    n = esteira.registrar(ep_id, formato, grade=grade, slot=slot)
    onde = f"grade {grade} {slot}" if grade else f"FORA DA GRADE: {fora}"
    print(sum(len(re.findall(W, s['text'])) for s in segs), "palavras · modelo", n, esteira.nome(esteira.load(), n), "· formato", formato, "·", onde)
