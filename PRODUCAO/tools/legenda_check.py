"""Confere OUTPUT/<dir>/legenda_instagram.txt contra PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md (seção 9).
Uso: python3 tools/legenda_check.py <outputDir> [...]   (a partir de PRODUCAO/)"""
import os, re, sys
CTA = '📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bad = 0
for d in sys.argv[1:]:
    p = os.path.join(ROOT, "..", "OUTPUT", d, "legenda_instagram.txt")
    err = []
    try:
        raw = open(p, "rb").read(); txt = raw.decode("utf-8")
    except Exception as e:
        print(f"✗ {d}: {e}"); bad += 1; continue
    lines = txt.rstrip("\n").split("\n")
    if lines[0] != CTA: err.append("1ª linha diferente da CTA fixa")
    if len(lines) < 2 or lines[1].strip(): err.append("falta linha em branco após a CTA")
    if re.search(r"\*\*|__|<[a-z/]|^#{1,6} ", txt, re.M): err.append("Markdown/HTML")
    tags = lines[-1].split()
    if len(tags) != 5 or any(not t.startswith("#") or t != t.lower() for t in tags): err.append(f"hashtags: {lines[-1]!r}")
    if lines[-2].strip(): err.append("falta linha em branco antes das hashtags")
    if "#" in "\n".join(lines[:-1]): err.append("hashtag fora da última linha")
    words = len(re.findall(r"\w+", "\n".join(lines[2:-1])))
    if not 90 <= words <= 220: err.append(f"corpo com {words} palavras")
    for bad_ in ["garant", "no automático", "nunca mais perca", "revolucione", "segredo do sucesso"]:
        if bad_ in txt.lower() and "não garante" not in txt.lower() and "nenhum corretor pode garantir" not in txt.lower(): err.append(f"termo a evitar: {bad_}")
    print(("✓" if not err else "✗"), d, f"({words} palavras)", "; ".join(err))
    bad += bool(err)
sys.exit(1 if bad else 0)
