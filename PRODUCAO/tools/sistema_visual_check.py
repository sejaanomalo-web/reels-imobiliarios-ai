#!/usr/bin/env python3
"""Validador do SISTEMA VISUAL ATIVO (Nível 1) — MARCA/sistema-visual/.

Uso (a partir de PRODUCAO/ ou da raiz):
  python3 tools/sistema_visual_check.py                      # sistema inteiro: tokens, theme, registro, skills, kits, docs
  python3 tools/sistema_visual_check.py --modelo pictograma-cinematografico
  python3 tools/sistema_visual_check.py --episodio ATIVO-PICTO-02   # também chamado pelo editorial_check (bloqueia o render)
  python3 tools/sistema_visual_check.py --quadros <pasta_de_jpg>    # luminância dos quadros renderizados (folha de QA)

Verifica só o que é OBJETIVO (cores, fontes, tamanhos mínimos, formato, referências obrigatórias, versão).
Direção de arte (hierarquia, coerência das ilustrações, função das animações) é REVISÃO VISUAL: o script lista o que olhar,
nunca "aprova" isso sozinho. Código de saída 1 se houver ERRO.
"""
import argparse
import colorsys
import glob
import json
import os
import re
import sys

PROD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(PROD)
DSDIR = os.path.join(REPO, "MARCA", "sistema-visual")
TOKENS = json.load(open(os.path.join(DSDIR, "tokens.json")))
REGISTRO = json.load(open(os.path.join(DSDIR, "modelos.json")))
HERANCA = "## Herança do Sistema Visual ATIVO"
REVISAO = [
    "as 7 assinaturas ATIVO presentes (README §2)",
    "um protagonista por cena; nada compete com a frase importante",
    "texto legível no celular; nada cortado, nada na coluna de botões nem na faixa da legenda",
    "verde raro e com significado; vermelho só para perda",
    "ilustrações coerentes (mesma família, traço e luz)",
    "cada animação com função narrativa; nada com cara de template",
    "reconhecível como ATIVO com o logo coberto",
]


def rel(p):
    return os.path.relpath(p, REPO)


def hex_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def cores_permitidas():
    """Todas as cores declaradas em tokens.json (hex e listas RGB), exceto as proibidas e o acento legado."""
    ok = set()

    def walk(x, path=""):
        if isinstance(x, dict):
            for k, v in x.items():
                if k in ("proibido", "acentoLegado"):
                    continue
                walk(v, f"{path}.{k}")
        elif isinstance(x, list):
            if len(x) == 3 and all(isinstance(n, int) for n in x):
                ok.add(tuple(x))
            else:
                for v in x:
                    walk(v, path)
        elif isinstance(x, str) and re.fullmatch(r"#[0-9A-Fa-f]{6}", x):
            ok.add(hex_rgb(x))

    walk(TOKENS)
    return ok


PERMITIDAS = cores_permitidas()
ACENTO = hex_rgb(TOKENS["cor"]["acento"]["hex"])
DERIVADOS = {ACENTO, hex_rgb(TOKENS["cor"]["acento"]["ink"]), hex_rgb(TOKENS["cor"]["acento"]["deep"])}
PROIBIDOS = {hex_rgb(h): h for h in TOKENS["proibido"]["valoresEmVideoNovo"]}


def cores_no_codigo(src):
    """[(linha, (r,g,b), literal)] para #RRGGBB, #RGB e rgb(a)(r,g,b,…)."""
    out = []
    for i, line in enumerate(src.splitlines(), 1):
        if line.strip().startswith(("//", "*", "/*")):
            continue  # comentário não pinta pixel
        for m in re.finditer(r"#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b", line):
            out.append((i, hex_rgb(m.group(1)), m.group(0)))
        for m in re.finditer(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", line):
            out.append((i, tuple(int(n) for n in m.groups()), m.group(0)))
    return out


def classificar(rgb, excecoes=frozenset()):
    """None se a cor é permitida; senão o motivo (proibida no Nível 1)."""
    if rgb in PROIBIDOS:
        return f"valor proibido em vídeo novo ({PROIBIDOS[rgb]})"
    if rgb in PERMITIDAS or rgb in excecoes:
        return None
    r, g, b = (c / 255 for c in rgb)
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    hue = h * 360
    if l <= 0.06 or l >= 0.97 or s < 0.12:
        return None  # neutros, quase pretos e quase brancos
    if 75 <= hue <= 165 and s >= 0.25 and l >= 0.08:
        return "verde não oficial (único verde: ACENTO #02FB3F e derivados)"
    if 170 <= hue < 245 and s >= 0.70 and 0.40 <= l <= 0.72:
        return "ciano/azul neon"
    if 245 <= hue <= 335 and s >= 0.35 and l >= 0.18:
        return "roxo/magenta saturado"
    if 38 <= hue <= 62 and s >= 0.60 and 0.30 <= l <= 0.85:
        return "amarelo/dourado vivo (só como material declarado em excecoesCor do modelo)"
    return None


def checar_fontes(src, onde, errs):
    minimo = TOKENS["tipografia"]["minimoPx"]
    for i, line in enumerate(src.splitlines(), 1):
        for m in re.finditer(r"fontFamily[=:]\s*\{?\s*[\"'`]([^\"'`]+)[\"'`]", line):
            if not re.search(r"Manrope|JetBrains Mono", m.group(1)):
                errs.append(f"fonte fora do sistema ({m.group(1)}) — use F.sans/F.mono — {onde}:{i}")
        for n in re.findall(r"fontSize[=:]\s*\{?\s*(\d+(?:\.\d+)?)\b", line):
            if float(n) < minimo:
                errs.append(f"fonte {n}px < mínimo {minimo}px — {onde}:{i}")


def checar_paleta(src, onde, excecoes, errs):
    vistos = set()
    for i, rgb, lit in cores_no_codigo(src):
        motivo = classificar(rgb, excecoes)
        if motivo and (lit, i) not in vistos:
            vistos.add((lit, i))
            errs.append(f"cor {lit} → {motivo} — {onde}:{i}")


def excecoes_do(modelo):
    return frozenset(hex_rgb(e["hex"]) for e in modelo.get("excecoesCor", []))


def checar_sistema(errs, warns):
    # tokens e versão
    for k in ("versao", "cor", "atmosfera", "tipografia", "tela", "movimento", "textura", "proibido"):
        if k not in TOKENS:
            errs.append(f"tokens.json sem a chave obrigatória `{k}`")
    if not re.fullmatch(r"\d+\.\d+\.\d+", str(TOKENS.get("versao", ""))):
        errs.append("tokens.json: `versao` precisa ser semver (x.y.z)")
    ch = os.path.join(DSDIR, "CHANGELOG.md")
    top = re.search(r"^##\s+(\d+\.\d+\.\d+)", open(ch).read(), flags=re.M) if os.path.exists(ch) else None
    if not top:
        errs.append("CHANGELOG.md ausente ou sem versão (## x.y.z)")
    elif top.group(1) != TOKENS["versao"]:
        errs.append(f"tokens.json v{TOKENS['versao']} ≠ última versão do CHANGELOG (v{top.group(1)}): mudança no Nível 1 sem registro")
    else:
        # impressão digital: qualquer edição em tokens.json sem nova entrada no CHANGELOG é detectada
        import hashlib
        atual = hashlib.sha256(open(os.path.join(DSDIR, "tokens.json"), "rb").read()).hexdigest()
        secao = open(ch).read()[top.start():]
        prox = re.search(r"^##\s+\d+\.\d+\.\d+", secao[3:], flags=re.M)
        secao = secao[: prox.start() + 3] if prox else secao
        reg = re.search(r"tokens\.json sha256:\s*`?([0-9a-f]{64})", secao)
        if not reg:
            errs.append("CHANGELOG: a versão atual não registra `tokens.json sha256: <hash>` (impressão digital do Nível 1)")
        elif reg.group(1) != atual:
            errs.append(f"tokens.json foi alterado sem registro: sha256 atual {atual[:12]}… ≠ registrado {reg.group(1)[:12]}… (siga a governança: nova versão + CHANGELOG)")
    if TOKENS["tela"]["largura"] != 1080 or TOKENS["tela"]["altura"] != 1920 or TOKENS["tela"]["fps"] != 30:
        errs.append("tela do Nível 1 deve ser 1080×1920 a 30 fps (Reels)")
    for k, v in TOKENS["atmosfera"].items():
        if isinstance(v, dict):
            br = hex_rgb(v["borda"])
            if colorsys.rgb_to_hls(*(c / 255 for c in br))[1] > 0.08:
                errs.append(f"atmosfera `{k}`: a borda deve morrer em quase preto (luminância ≤ 0,08)")
    for f in ("README.md", "NOVO_MODELO.md", "modelos.json"):
        if not os.path.exists(os.path.join(DSDIR, f)):
            errs.append(f"MARCA/sistema-visual/{f} ausente")
    # código lê os tokens (fonte única)
    theme = open(os.path.join(PROD, "src", "theme.ts")).read()
    if "MARCA/sistema-visual/tokens.json" not in theme:
        errs.append("PRODUCAO/src/theme.ts não importa MARCA/sistema-visual/tokens.json (fonte única)")
    if re.search(r"hex:\s*\"" + re.escape(TOKENS["cor"]["acento"]["hex"]) + "\"", theme, flags=re.I):
        errs.append("theme.ts escreve o acento à mão — derive de DS.cor.acento")
    # integração permanente
    claude = open(os.path.join(REPO, "CLAUDE.md")).read()
    for need in ("MARCA/sistema-visual", "ativo-sistema-visual", "sistema_visual_check.py"):
        if need not in claude:
            errs.append(f"CLAUDE.md não cita `{need}` (regra permanente para skills atuais e futuras)")
    if not os.path.exists(os.path.join(REPO, ".claude", "skills", "ativo-sistema-visual", "SKILL.md")):
        errs.append("skill .claude/skills/ativo-sistema-visual/SKILL.md ausente")
    ed = open(os.path.join(PROD, "tools", "editorial_check.py")).read()
    if "sistema_visual_check" not in ed:
        errs.append("editorial_check.py não chama o sistema_visual_check (o render não seria bloqueado)")


def checar_modelo(m, errs, warns, registro_md):
    nome = m["id"]
    if m["status"] == "reservado":
        if m.get("skill") or m.get("kits"):
            errs.append(f"modelo reservado `{nome}` não deve ter skill/kit até ser criado pelo NOVO_MODELO.md")
        return
    skill = m.get("skill")
    if skill:
        sp = os.path.join(REPO, skill)
        if not os.path.exists(sp):
            errs.append(f"[{nome}] skill {skill} não existe")
        else:
            txt = open(sp).read()
            if HERANCA not in txt or "MARCA/sistema-visual/README.md" not in txt:
                errs.append(f"[{nome}] skill sem a seção “{HERANCA}” apontando para MARCA/sistema-visual/README.md")
            for _, rgb, lit in cores_no_codigo(txt):
                motivo = classificar(rgb, excecoes_do(m))
                if motivo:
                    errs.append(f"[{nome}] skill cita cor fora do sistema {lit} ({motivo})")
            if skill not in registro_md:
                errs.append(f"[{nome}] MODELOS_DE_VIDEO.md não lista {skill}")
    elif m.get("guia") and not os.path.exists(os.path.join(REPO, m["guia"])):
        errs.append(f"[{nome}] guia {m['guia']} não existe")
    for kit in m.get("kits", []):
        kp = os.path.join(REPO, kit)
        if not os.path.exists(kp):
            errs.append(f"[{nome}] kit {kit} não existe")
            continue
        src = open(kp).read()
        if not re.search(r"from \"(\.\./)+theme\"|from \"\.\./episodes/NOV26/kit\"|from \"\./kit\"", src):
            errs.append(f"[{nome}] kit {kit} não importa os tokens (theme.ts/DS ou kit A do lote)")
        checar_paleta(src, kit, excecoes_do(m), errs)
        checar_fontes(src, kit, errs)
        for comp in m.get("componentesObrigatorios", []):
            if comp.startswith("estilos/"):
                continue
            if kit.endswith(m.get("kitPrincipal", kit)) and not re.search(r"export const " + re.escape(comp) + r"\b", src):
                errs.append(f"[{nome}] kit {kit} não exporta {comp} (componente obrigatório do modelo)")


def modelo_do_episodio(ep_id, ep):
    for m in REGISTRO["modelos"]:
        if m["status"] == "reservado":
            continue
        if ep.get("formato") and ep.get("formato") == m.get("formato"):
            return m
        if any(ep_id.startswith(p) for p in m.get("prefixos", [])):
            return m
    return None


_INTEGRIDADE = None


def integridade():
    """Erros do sistema inteiro (tokens, impressão digital, theme, CLAUDE.md, skill, registro) — calculado 1 vez."""
    global _INTEGRIDADE
    if _INTEGRIDADE is None:
        e, w = [], []
        checar_sistema(e, w)
        registro_md = open(os.path.join(REPO, "MODELOS_DE_VIDEO.md")).read()
        for m in REGISTRO["modelos"]:
            checar_modelo(m, e, w, registro_md)
        _INTEGRIDADE = e
    return _INTEGRIDADE


def checar_episodio(ep_id):
    """(erros, avisos) do Nível 1 para um episódio — usado pelo editorial_check (portanto, por todo render)."""
    errs, warns = [f"integridade do Sistema Visual: {x}" for x in integridade()], []
    ep_path = os.path.join(PROD, "episodes", ep_id, "episode.json")
    if not os.path.exists(ep_path):
        return [f"episódio {ep_id} sem episode.json"], []
    ep = json.load(open(ep_path))
    m = modelo_do_episodio(ep_id, ep)
    if not m:
        return [], []  # peça fora dos modelos registrados (AD-*, LP, STORY, legado): regras próprias
    if ep_id in m.get("legado", []):
        return [], [f"[{m['id']}] {ep_id} é legado (entregue antes do Sistema Visual v1): paleta não verificada"]
    w, h, fps = ep.get("width", 1080), ep.get("height", 1920), ep.get("fps", 30)
    if (w, h, fps) != (1080, 1920, 30):
        errs.append(f"[{m['id']}] formato {w}×{h} a {fps} fps (Nível 1: 1080×1920 a 30 fps)")
    src_dir = os.path.join(PROD, "src", "episodes", ep_id)
    for f in sorted(glob.glob(os.path.join(src_dir, "**", "*.ts*"), recursive=True)):
        src = open(f).read()
        checar_paleta(src, rel(f), excecoes_do(m), errs)
        checar_fontes(src, rel(f), errs)
    v = ep.get("sistemaVisual")
    if v and v.split(".")[0] != TOKENS["versao"].split(".")[0]:
        warns.append(f"episódio feito no Sistema Visual v{v}; versão atual v{TOKENS['versao']} (mudança maior: revisar)")
    return errs, warns


def checar_quadros(pasta):
    """Luminância dos quadros (folha de QA): média ≤ 45/255 e rodapé/bordas ≤ 16/255. Só AVISO (flash e capa podem fugir)."""
    from PIL import Image, ImageStat
    warns = []
    for f in sorted(glob.glob(os.path.join(pasta, "*.jpg")) + glob.glob(os.path.join(pasta, "*.png"))):
        im = Image.open(f).convert("L")
        media = ImageStat.Stat(im).mean[0]
        borda = ImageStat.Stat(im.crop((0, 1600, im.width, im.height))).mean[0] if im.height >= 1920 else 0
        if media > 45 or borda > 16:
            warns.append(f"{os.path.basename(f)}: luminância média {media:.0f} (≤ 45) / rodapé {borda:.0f} (≤ 16) — o quadro está claro demais para o universo ATIVO?")
    return warns


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--modelo")
    ap.add_argument("--episodio", nargs="*")
    ap.add_argument("--quadros")
    a = ap.parse_args()
    errs, warns = [], []
    if a.quadros:
        warns += checar_quadros(a.quadros)
    elif a.episodio:
        for e in a.episodio:
            er, wr = checar_episodio(e)
            errs += [f"{e}: {x}" for x in er]
            warns += [f"{e}: {x}" for x in wr]
    else:
        registro_md = open(os.path.join(REPO, "MODELOS_DE_VIDEO.md")).read()
        if not a.modelo:
            checar_sistema(errs, warns)
        alvo = [m for m in REGISTRO["modelos"] if not a.modelo or m["id"] == a.modelo]
        if a.modelo and not alvo:
            errs.append(f"modelo `{a.modelo}` não está em MARCA/sistema-visual/modelos.json")
        for m in alvo:
            checar_modelo(m, errs, warns, registro_md)
    print(f"Sistema Visual ATIVO v{TOKENS['versao']} — {len(errs)} erro(s), {len(warns)} aviso(s)")
    for e in errs:
        print("  ERRO  ", e)
    for w in warns:
        print("  AVISO ", w)
    if not a.quadros:
        print("  REVISÃO VISUAL (humana, na folha de quadros — não automatizável):")
        for r in REVISAO:
            print("   [ ]", r)
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
