"""Coloca na fila do Supabase os Reels que chegaram no repositório.

Só considera MP4 dentro de PUBLICACAO/ (o resto do repo é ignorado).
Para cada MP4 novo do push, procura na mesma pasta 1 capa (PNG ou JPG) e 1 legenda
(TXT com "legenda" no nome; se não houver, DOCX).
PNG vira JPEG (a API do Instagram não aceita PNG) e é commitado de volta.
O horário é escolhido pelo Supabase (próximo slot livre do perfil).
"""

import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from docx import Document
from PIL import Image

REPO = os.environ["GITHUB_REPOSITORY"]
SHA = os.environ["GITHUB_SHA"]
BEFORE = os.environ.get("BEFORE", "").strip()
SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
KEY = os.environ["SUPABASE_SERVICE_KEY"].strip()
PERFIL = os.environ["IG_PERFIL"].strip().lstrip("@")
BRANCH = os.environ.get("IG_BRANCH", "main")
PREFIXO = os.environ.get("IG_PREFIXO", "PUBLICACAO/")
DRY_RUN = os.environ.get("IG_DRY_RUN") == "1"  # só para teste local: não commita nem faz push


def git(*args: str) -> str:
    return subprocess.check_output(["git", *args], text=True).strip()


def commit_existe(sha: str) -> bool:
    if not sha or set(sha) == {"0"}:
        return False
    return subprocess.run(["git", "cat-file", "-e", f"{sha}^{{commit}}"], capture_output=True).returncode == 0


def ordem_natural(p: Path):
    return [int(n) for n in re.findall(r"\d+", p.with_suffix("").as_posix())] or [0]


def mp4_para_processar() -> list[Path]:
    if commit_existe(BEFORE):
        saida = git("diff", "--name-only", "--diff-filter=A", BEFORE, SHA)
    else:
        # primeiro push, execução manual ou limpeza mensal (force push):
        # lista tudo; o Supabase ignora o que já está na fila
        saida = git("ls-tree", "-r", "--name-only", SHA)
    arquivos = [
        Path(l) for l in saida.splitlines()
        if l.lower().endswith(".mp4") and l.startswith(PREFIXO)
    ]
    return sorted(arquivos, key=ordem_natural)


def url_raw(caminho: Path) -> str:
    return f"https://raw.githubusercontent.com/{REPO}/{BRANCH}/{urllib.parse.quote(caminho.as_posix())}"


def arquivos_da_pasta(pasta: Path, *extensoes: str) -> list[Path]:
    if not pasta.is_dir():
        return []
    return sorted(p for p in pasta.iterdir() if p.is_file() and p.suffix.lower() in extensoes)


def unico(pasta: Path, *extensoes: str) -> Path:
    achados = arquivos_da_pasta(pasta, *extensoes)
    if len(achados) != 1:
        raise RuntimeError(f"{pasta}/: esperado 1 arquivo {'/'.join(extensoes)}, encontrei {len(achados)}")
    return achados[0]


def preparar_capa(pasta: Path) -> tuple[Path, bool]:
    jpgs = arquivos_da_pasta(pasta, ".jpg", ".jpeg")
    if jpgs:
        return jpgs[0], False
    png = unico(pasta, ".png")
    jpg = png.with_suffix(".jpg")
    img = Image.open(png)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        fundo = Image.new("RGB", img.size, (0, 0, 0))
        fundo.paste(img, mask=img.split()[-1])
        img = fundo
    else:
        img = img.convert("RGB")
    img.save(jpg, "JPEG", quality=92, optimize=True)
    return jpg, True


def extrair_legenda(pasta: Path) -> str:
    txts = [p for p in arquivos_da_pasta(pasta, ".txt") if "legenda" in p.name.lower()]
    if len(txts) > 1:
        raise RuntimeError(f"{pasta}/: mais de 1 arquivo de legenda .txt")
    if txts:
        docx = txts[0]
        texto = docx.read_text(encoding="utf-8-sig")
    else:
        docx = unico(pasta, ".docx")
        texto = "\n".join(p.text for p in Document(docx).paragraphs)
    texto = texto.replace("\r\n", "\n")
    texto = re.sub(r"[ \t]+\n", "\n", texto)
    texto = re.sub(r"\n{3,}", "\n\n", texto).strip()
    if not texto:
        raise RuntimeError(f"{docx}: legenda vazia")
    if len(texto) > 2200:
        raise RuntimeError(f"{docx}: legenda com {len(texto)} caracteres (máximo 2200)")
    return texto


def enfileirar(payload: dict) -> dict:
    headers = {"apikey": KEY, "Content-Type": "application/json"}
    if KEY.startswith("eyJ"):  # chave service_role antiga (JWT)
        headers["Authorization"] = f"Bearer {KEY}"
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/rpc/ig_enfileirar_post",
        data=json.dumps(payload).encode(),
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"Supabase HTTP {e.code}: {e.read().decode(errors='replace')}") from None


def main() -> None:
    videos = mp4_para_processar()
    if not videos:
        print("Nenhum MP4 para processar.")
        return

    posts, capas_novas, erros = [], [], []
    for video in videos:
        pasta = video.parent
        try:
            capa, nova = preparar_capa(pasta)
            if nova:
                capas_novas.append(capa)
            posts.append({
                "video": video,
                "capa": capa,
                "legenda": extrair_legenda(pasta),
                "pack": pasta.parent.as_posix(),
                "numero": ordem_natural(Path(pasta.name))[-1],
            })
        except Exception as e:
            erros.append(f"{video}: {e}")

    if capas_novas and not DRY_RUN:
        git("config", "user.name", "github-actions[bot]")
        git("config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com")
        subprocess.check_call(["git", "add", "--sparse", "--", *[c.as_posix() for c in capas_novas]])
        git("commit", "-m", f"capas em JPEG ({len(capas_novas)}) [skip ci]")
        for tentativa in range(3):
            try:
                git("pull", "--rebase", "origin", BRANCH)
                git("push", "origin", f"HEAD:{BRANCH}")
                break
            except subprocess.CalledProcessError:
                if tentativa == 2:
                    raise

    for p in posts:
        try:
            r = enfileirar({
                "p_perfil": PERFIL,
                "p_video": url_raw(p["video"]),
                "p_capa": url_raw(p["capa"]),
                "p_legenda": p["legenda"],
                "p_pack": p["pack"],
                "p_numero": p["numero"],
                "p_caminho": p["video"].as_posix(),
            })
            print(f"OK   {p['video']} -> {r['agendado_para']} ({r['status']})")
        except Exception as e:
            erros.append(f"{p['video']}: {e}")

    if erros:
        print("\nERROS:", file=sys.stderr)
        for e in erros:
            print(f"  {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

