"""Checagem editorial/visual semiautomática de um episódio (guia editorial ATIVO, 13/11/2026).

Uso:  python3 tools/editorial_check.py EP-ATIVO02        (ou vários IDs; sem ID = todos com episode.json)
Saída: ERRO (bloqueia) / AVISO (revisar) por item; código de saída 1 se houver ERRO.

O que verifica:
  1. CTA e destino definidos (campo `cta` no episode.json ou chamada reconhecível na última cena).
     Reels (9:16, exceto STORY-*/AD-*): CTA obrigatória de comentário SISTEMA → Direct (14/11/2026).
     Anúncios (AD-*): CTA para o botão do anúncio (cta.type=botao_meta); texto principal acima de y=1250.
  2. Promessas não comprovadas na fala ou no texto de tela: "garantido", "triplicar", "dobrar suas vendas", "em X dias",
     "100%", depoimento.
  3. Fonte pequena para público 40+ (fontSize abaixo do mínimo do formato).
  4. Verde divergente da marca: qualquer cor esverdeada diferente de #3AF584 (derivados aceitos: #092614 e #0E3A1F),
     no código do episódio e nos componentes compartilhados (regra de 14/11/2026; episódios entregues antes ficam isentos).
  5. Interface de sistema desenhada sem o rótulo "ilustrativa" (capturas reais via STORY-ATIVO/cases são isentas).
  6. Texto posicionado fora da área segura do Instagram (9:16: top > 1570 px).
Não substitui a revisão humana; aponta onde olhar.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLAIMS = [
    (r"garantid[oa]s?", "promessa de garantia"),
    (r"tripli\w+|dobr(ar|e|a)\s+(suas?|as)\s+vendas", "promessa de multiplicar resultado"),
    (r"(vend\w*|result\w*|fatur\w*|lucr\w*)[^.]{0,40}\bem\s+\d+\s+dias|\bem\s+\d+\s+dias[^.]{0,40}(vend\w*|result\w*|fatur\w*|lucr\w*)", "prazo de resultado"),
    (r"\b100\s?%", "percentual absoluto"),
    (r"depoimento", "depoimento (precisa ser real e autorizado)"),
]
CTA_HINTS = r"comente|comenta|link da bio|agend|whatsapp|salve|conta nos coment|toque no link|direct"
OLD_GREEN = r"#35e0a1|53\s*,\s*224\s*,\s*161|#00fa44"
# Reels entregues antes da regra "CTA sempre SISTEMA" (14/11/2026) — não reprocessar
# Episódios entregues antes da regra "verde exato #3AF584" (14/11/2026) — tons derivados antigos ficam como estão
LEGACY_COLOR = {"EP001", "EP002", "EP015", "EP015V2"}
GREEN_OK = {(58, 245, 132), (9, 38, 20), (14, 58, 31)}
LEGACY_CTA = {"EP001", "EP002", "EP003", "EP015", "EP015V2", "EP-ATIVO01", "EP-ATIVO03"}
# Lote "30 Reels — novembro 2026" (ATIVO-NOV26-*): verde atualizado #02FB3F + derivados (ink #01290B, deep #063A16).
# Nesse lote o verde antigo #3AF584 é proibido nos arquivos do episódio (use ACCENT_NOV26/accentAlpha).
NOV26_PREFIX = ("ATIVO-NOV26", "ATIVO-L60", "ATIVO-GTA6", "ATIVO-PILOTO", "ATIVO-CARTOON", "ATIVO-PICTO")  # lotes com o verde atualizado #02FB3F (kit A/aa)
GREEN_OK_NOV26 = {(2, 251, 63), (1, 41, 11), (6, 58, 22)}


def check(ep_id: str) -> int:
    ep_path = os.path.join(ROOT, "episodes", ep_id, "episode.json")
    src_dir = os.path.join(ROOT, "src", "episodes", ep_id)
    ep = json.load(open(ep_path))
    vertical = ep.get("height", 1920) > ep.get("width", 1080)
    min_font = 24 if vertical else 22
    errs, warns = [], []

    segs = ep.get("segments", [])
    speech = " ".join(s.get("text", "") for s in segs)
    # 1. CTA
    last_scene = segs[-1]["scene"] if segs else ""
    last_text = " ".join(s["text"] for s in segs if s.get("scene") == last_scene).lower()
    if not ep.get("cta") and not re.search(CTA_HINTS, last_text):
        errs.append("CTA/destino não definido (sem campo `cta` e sem chamada reconhecível na última cena)")
    elif not ep.get("cta"):
        warns.append("CTA só reconhecido na fala — registrar `cta` (tipo e destino) no episode.json")
    # 1b. Reels: CTA SEMPRE comentário SISTEMA → Direct (cliente, 14/11/2026). Episódios entregues antes ficam isentos.
    # 1c. Criativos de anúncio (AD-*): CTA para o BOTÃO do anúncio (formulário/landing), não comentário; texto acima da faixa do botão
    is_ad = ep_id.startswith("AD-")
    if is_ad:
        cta = ep.get("cta") or {}
        if cta.get("type") != "botao_meta" or not re.search(r"bot[aã]o|clique|toque", last_text):
            errs.append("Anúncio sem CTA para o botão (cta.type=botao_meta e fala final com 'clique/toque no botão')")
    is_reel = vertical and not ep_id.startswith("STORY") and not is_ad
    if is_reel and ep_id not in LEGACY_CTA:
        cta = ep.get("cta") or {}
        if cta.get("type") != "comentario" or str(cta.get("keyword", "")).upper() != "SISTEMA" or not re.search(r"coment\w*\s+sistema", last_text):
            errs.append("Reel sem a CTA obrigatória de comentário SISTEMA → Direct (cta.type=comentario, keyword=SISTEMA, fala final 'Comente SISTEMA…')")

    files = sorted(glob.glob(os.path.join(src_dir, "**", "*.tsx"), recursive=True)) if os.path.isdir(src_dir) else []
    # 4b. verde exato: nenhuma cor esverdeada além de #3AF584 e dos derivados aceitos
    if ep_id not in LEGACY_COLOR:
        shared = sorted(glob.glob(os.path.join(ROOT, "src", "components", "*.tsx")))
        for f in files + [g for g in shared if g not in files] + sorted(glob.glob(os.path.join(src_dir, "**", "*.ts"), recursive=True)):
            for i, line in enumerate(open(f).read().splitlines(), 1):
                cols = [tuple(int(h[k:k + 2], 16) for k in (0, 2, 4)) for h in re.findall(r"#([0-9A-Fa-f]{6})\b", line)]
                cols += [tuple(map(int, m)) for m in re.findall(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", line)]
                nov26 = ep_id.startswith(NOV26_PREFIX)
                ok_set = GREEN_OK_NOV26 if nov26 and f in files else GREEN_OK | (GREEN_OK_NOV26 if nov26 else set())
                for r_, g_, b_ in cols:
                    if g_ > r_ + 40 and g_ > b_ + 20 and (r_, g_, b_) not in ok_set:
                        alvo = "#02FB3F (ACCENT_NOV26/accentAlpha)" if nov26 else "#3AF584 (BRAND/brandAlpha)"
                        errs.append(f"verde fora do exato {alvo} (#{r_:02X}{g_:02X}{b_:02X}) — {os.path.relpath(f, ROOT)}:{i}")
            if ep_id.startswith(NOV26_PREFIX) and f in files and re.search(r"\bBRAND\.(hex|ink|deep|rgb)\b|brandAlpha\(|C\.accent", open(f).read()):
                errs.append(f"lote NOV26 usando o verde antigo (BRAND/brandAlpha/C.accent) — use ACCENT_NOV26/accentAlpha — {os.path.relpath(f, ROOT)}")
    code = {f: open(f).read() for f in files}
    screen_text = " ".join(re.findall(r">([^<>{}]{3,})<", " ".join(code.values())))
    # 2. promessas
    for pat, why in CLAIMS:
        for where, txt in (("fala", speech), ("tela", screen_text)):
            m = re.search(pat, txt, flags=re.I)
            if m:
                errs.append(f"{why} na {where}: “…{txt[max(0, m.start() - 30): m.end() + 30].strip()}…”")
    # 3–6. código
    ui_like = False
    labeled = False
    for f, src in code.items():
        rel = os.path.relpath(f, ROOT)
        for i, line in enumerate(src.splitlines(), 1):
            for n in re.findall(r"fontSize:\s*(\d+)", line):
                if int(n) < min_font:
                    warns.append(f"fonte {n}px < {min_font}px para 40+ — {rel}:{i}")
            if re.search(OLD_GREEN, line, flags=re.I):
                errs.append(f"verde fora da marca (use BRAND/brandAlpha) — {rel}:{i}")
            if vertical:
                limit = 1250 if ep_id.startswith("AD-") else 1570  # anúncio: botão/legenda da Meta cobrem ~35% de baixo
                for n in re.findall(r"\btop:\s*(\d+)", line):
                    if int(n) > limit and ("fontSize" in line or "fontWeight" in line):
                        warns.append(f"texto em top {n}px (abaixo da área segura {limit}px) — {rel}:{i}")
        # captura REAL do sistema (STORY-ATIVO/cases + <Capture>) não é interface desenhada: não leva "ilustrativa"
        real_capture = re.search(r"<Capture\b", src) and re.search(r"STORY-ATIVO/cases", src)
        if re.search(r"AppWindow|Kanban|CRM|Painel|Dashboard|INTERFACE", src) and not real_capture:
            ui_like = True
        if re.search(r"ILUSTRATIV|Illus\b|<Illus", src, flags=re.I):
            labeled = True
    if ui_like and not labeled:
        warns.append("há interface de sistema desenhada sem rótulo 'interface ilustrativa'")

    # 9. ESTEIRA DE 5 ESTILOS (cliente, 21/11/2026): episódio com "esteira": true precisa de "estilo" 1–5 registrado em
    #    estilos/esteira.json e as cenas devem usar o kit do estilo (1–4 → src/estilos/<kit>; 5 → kit Painel NOV26 sem kits novos).
    # 9-0. ROTAÇÃO DE 4 MODELOS (cliente, 23/11/2026; substitui a esteira de 5, arquivada): episódio novo precisa de `formato` de um
    #      modelo e estar registrado na rotação (tools/esteira.py); episódio da esteira de 5 só passa se for um entregue (legado).
    _reg_rot = json.load(open(os.path.join(ROOT, "estilos", "esteira.json")))
    _legado5 = {h["episodio"] for h in _reg_rot.get("historico", [])}
    _hist_rot = {h["episodio"]: h["modelo"] for h in _reg_rot.get("rotacao", {}).get("historico", [])}
    if ep.get("rotacao"):
        _n = _hist_rot.get(ep_id)
        _fmt = {int(k): m["formato"] for k, m in _reg_rot["rotacao"]["modelos"].items()}
        if _n is None:
            errs.append("rotação: episódio marcado `rotacao` mas não registrado em estilos/esteira.json (tools/esteira.py registrar)")
        elif ep.get("formato") != _fmt.get(_n):
            errs.append(f"rotação: modelo {_n} registrado exige formato \"{_fmt.get(_n)}\" (episode.json tem \"{ep.get('formato')}\")")
    if ep.get("esteira") and ep_id not in _legado5:
        errs.append("esteira de 5 estilos ARQUIVADA (23/11/2026): episódio novo segue a rotação de 4 modelos — use novo_episodio.build(..., formato=<modelo da vez>)")
    if ep.get("esteira"):
        KITS = {1: "estilos/palitinho", 2: "estilos/lousa", 3: "estilos/planta", 4: "estilos/tipografia"}
        n = ep.get("estilo")
        reg = json.load(open(os.path.join(ROOT, "estilos", "esteira.json")))
        hist = {h["episodio"]: h["estilo"] for h in reg.get("historico", [])}
        if n not in (1, 2, 3, 4, 5):
            errs.append("esteira: episódio sem `estilo` 1–5 — rode tools/esteira.py registrar <EP>")
        elif hist.get(ep_id) != n:
            errs.append(f"esteira: estilo {n} no episode.json não confere com estilos/esteira.json ({hist.get(ep_id)})")
        else:
            scenes = [f for f in files if f.endswith("Scenes.tsx")]
            src_all = "\n".join(open(f).read() for f in scenes)
            if n in KITS and KITS[n] not in src_all:
                errs.append(f"esteira: estilo {n} exige cenas com o kit src/{KITS[n]}.tsx")
            if n == 5 and re.search(r"estilos/(palitinho|lousa|planta|tipografia)", src_all):
                errs.append("esteira: estilo 5 (Painel) não deve usar kits dos estilos 1–4")
    # 9b. TERCEIRO MODELO / ESTILO 3 — PLANTA TÉCNICA v2 (skill .claude/skills/terceiro-modelo-planta-tecnica, 23/11/2026).
    #     Fora da esteira (formato planta-tecnica / ATIVO-PLANTA): kit, fundo, mergulho e fecho CtaPlanta. Na esteira (estilo 3):
    #     kit v2 (FundoPlanta + mergulho); fecho Cta padrão ou CtaPlanta. Os episódios entregues no v1 são legado do modelo.
    _legado_planta = {"ATIVO-GTA6-02", "ATIVO-GTA6-08", "ATIVO-L60-04"}
    if ep.get("formato") == "planta-tecnica" or ep_id.startswith("ATIVO-PLANTA") or (ep.get("esteira") and ep.get("estilo") == 3 and ep_id not in _legado_planta):
        allsrc = "\n".join(open(f).read() for f in files)
        needs = [("estilos/planta", "cenas com o kit src/estilos/planta.tsx"), ("FundoPlanta", "prancha FundoPlanta (marinho, grade neutra)"), ("mergulho", "transição de folha por mergulho (sem crossfade solto)")]
        if not ep.get("esteira"):
            needs.append(("CtaPlanta", "fecho CtaPlanta (projeto SEU SISTEMA + campo SISTEMA + logo)"))
        for need, why in needs:
            if need not in allsrc:
                errs.append(f"planta técnica: falta {why}")
        if not ep.get("esteira") and ep.get("estilo"):
            errs.append("formato planta-tecnica criado fora da esteira não deve ter `estilo` (use novo_episodio.build(..., formato=\"planta-tecnica\"))")
    # 9c. QUARTO MODELO — MAQUETE 3D (skill .claude/skills/quarto-modelo-maquete-3d, 23/11/2026): kit 3D, cabeçalho com
    #     FONTES, legenda em caixa e fecho ModulosSistema + CtaMaquete. Fora da esteira.
    if ep.get("formato") == "maquete-3d" or ep_id.startswith("ATIVO-MAQUETE"):
        allsrc = "\n".join(open(f).read() for f in files)
        for need, why in (("estilos/maquete", "cenas com o kit src/estilos/maquete.tsx"), ("<Mundo", "o mundo 3D (Mundo)"), ("<Cabecalho", "cabeçalho editorial com FONTES (Cabecalho)"),
                          ("LegendaCaixa", "legenda em caixa (LegendaCaixa)"), ("ModulosSistema", "módulos do fecho (ModulosSistema)"), ("CtaMaquete", "fecho CtaMaquete (campo SISTEMA + logo)")):
            if need not in allsrc:
                errs.append(f"formato maquete: falta {why}")
        if re.search(r"fontes=\"\s*\"", allsrc):
            errs.append("formato maquete: a linha FONTES não pode ficar vazia (assinatura 7)")
        if ep.get("esteira"):
            errs.append("formato maquete-3d não entra na esteira de 5 estilos (crie com novo_episodio.build(..., formato=\"maquete-3d\"))")
    # 10. FORMATO CARTOON EXPLICATIVO (skill .claude/skills/primeiro-modelo-cartoon-explicativo): kit, legenda karaokê e fecho cartoon
    if ep.get("formato") == "pictograma-cinematografico" or ep_id.startswith("ATIVO-PICTO"):
        allsrc = "\n".join(open(f).read() for f in files)
        for need, why in (("estilos/pictograma", "cenas com o kit src/estilos/pictograma.tsx"), ("LegendaNoir", "legenda que se escreve (LegendaNoir)"), ("CtaNoir", "fecho CtaNoir (COMENTE SISTEMA + logo em partículas)"), ("FundoNoir", "fundo noir (FundoNoir)")):
            if need not in allsrc:
                errs.append(f"formato pictograma: falta {why}")
        if ep.get("esteira"):
            errs.append("formato pictograma não entra na esteira de 5 estilos (crie com novo_episodio.build(..., formato=\"pictograma-cinematografico\"))")
    elif ep.get("formato") == "cartoon-explicativo" or ep_id.startswith(("ATIVO-CARTOON", "ATIVO-PILOTO")):
        allsrc = "\n".join(open(f).read() for f in files)
        for need, why in (("estilos/cartoon", "cenas com o kit src/estilos/cartoon.tsx"), ("LegendaKaraoke", "legenda karaokê no centro"), ("CtaCartoon", "fecho CtaCartoon (COMENTE SISTEMA)"), ("Planos", "planos com corte seco (Planos/makeShots)")):
            if need not in allsrc:
                errs.append(f"formato cartoon: falta {why}")
        if ep.get("esteira"):
            errs.append("formato cartoon não entra na esteira de 5 estilos (crie com novo_episodio.build(..., formato=\"cartoon-explicativo\"))")
    # 11. SISTEMA VISUAL ATIVO (Nível 1, MARCA/sistema-visual, 22/11/2026): paleta, fontes e formato do episódio de um
    #     modelo registrado em modelos.json. Erro aqui bloqueia o render como qualquer outro.
    try:
        import sistema_visual_check as svc
        sv_errs, sv_warns = svc.checar_episodio(ep_id)
        errs += [f"sistema visual: {e}" for e in sv_errs]
        warns += [f"sistema visual: {w}" for w in sv_warns]
    except Exception as exc:  # o validador nunca pode sumir em silêncio
        errs.append(f"sistema visual: validador indisponível ({exc})")
    print(f"\n== {ep_id} ({'9:16' if vertical else '16:9'}) — {len(errs)} erro(s), {len(warns)} aviso(s)")
    for e in errs:
        print("  ERRO  ", e)
    # avisos de fonte podem ser muitos: agrupar
    font = [w for w in warns if w.startswith("fonte")]
    other = [w for w in warns if not w.startswith("fonte")]
    for w in other:
        print("  AVISO ", w)
    if font:
        print(f"  AVISO  {len(font)} ocorrência(s) de fonte pequena; primeiras:")
        for w in font[:6]:
            print("         ", w)
    return 1 if errs else 0


if __name__ == "__main__":
    ids = sys.argv[1:] or sorted(os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(ROOT, "episodes", "*", "episode.json")))
    rc = 0
    for i in ids:
        rc |= check(i)
    sys.exit(rc)
