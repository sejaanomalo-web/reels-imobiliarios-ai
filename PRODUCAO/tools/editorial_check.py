"""Checagem editorial/visual semiautomática de um episódio (guia editorial ATIVO, 13/11/2026).

Uso:  python3 tools/editorial_check.py EP-ATIVO02        (ou vários IDs; sem ID = todos com episode.json)
Saída: ERRO (bloqueia) / AVISO (revisar) por item; código de saída 1 se houver ERRO.

O que verifica:
  1. CTA e destino definidos (campo `cta` no episode.json ou chamada reconhecível na última cena).
     Reels (9:16, exceto STORY-*): CTA obrigatória de comentário SISTEMA → Direct (14/11/2026).
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
    is_reel = vertical and not ep_id.startswith("STORY")
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
                for r_, g_, b_ in cols:
                    if g_ > r_ + 40 and g_ > b_ + 20 and (r_, g_, b_) not in GREEN_OK:
                        errs.append(f"verde fora do exato #3AF584 (#{r_:02X}{g_:02X}{b_:02X}) — use BRAND/brandAlpha — {os.path.relpath(f, ROOT)}:{i}")
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
                for n in re.findall(r"\btop:\s*(\d+)", line):
                    if int(n) > 1570 and ("fontSize" in line or "fontWeight" in line):
                        warns.append(f"texto em top {n}px (abaixo da área segura 1570px) — {rel}:{i}")
        # captura REAL do sistema (STORY-ATIVO/cases + <Capture>) não é interface desenhada: não leva "ilustrativa"
        real_capture = re.search(r"<Capture\b", src) and re.search(r"STORY-ATIVO/cases", src)
        if re.search(r"AppWindow|Kanban|CRM|Painel|Dashboard|INTERFACE", src) and not real_capture:
            ui_like = True
        if re.search(r"ILUSTRATIV|Illus\b|<Illus", src, flags=re.I):
            labeled = True
    if ui_like and not labeled:
        warns.append("há interface de sistema desenhada sem rótulo 'interface ilustrativa'")

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
