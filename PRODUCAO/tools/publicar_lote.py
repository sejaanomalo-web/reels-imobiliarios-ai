"""Monta a pasta de publicação de um episódio do lote NOV26 (vídeo + capa + legenda .docx/.txt).
Uso (a partir de PRODUCAO/): python3 tools/publicar_lote.py NOV26 <n> [<n> ...]
Destino: PUBLICACAO/<LOTE>/REELS_01_AO_10/01/ … (grupos de 10). Copia arquivos já validados; não renderiza nada.
O .docx traz um parágrafo por linha da legenda, sem negrito, para copiar e colar no Instagram mantendo as quebras."""
import os, shutil, sys
from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def docx_from_txt(txt_path, out_path):
    doc = Document()
    st = doc.styles["Normal"]
    st.font.name = "Arial"; st.font.size = Pt(12)
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Arial")
    pf = st.paragraph_format; pf.space_before = Pt(0); pf.space_after = Pt(0); pf.line_spacing = 1.15
    lines = open(txt_path, encoding="utf-8").read().rstrip("\n").split("\n")
    first = True
    for ln in lines:
        p = doc.paragraphs[0] if first and doc.paragraphs else doc.add_paragraph()
        first = False
        if ln:
            r = p.add_run(ln); r.bold = False
    doc.core_properties.title = os.path.basename(out_path)
    doc.save(out_path)

def publish(lote, n):
    oid = f"ATIVO_{lote}_{n:02d}"
    src = os.path.join(ROOT, "OUTPUT", oid)
    files = {"mp4": f"{oid}_FINAL.mp4", "capa": f"{oid}_capa.png", "txt": "legenda_instagram.txt"}
    for k, f in files.items():
        if not os.path.isfile(os.path.join(src, f)):
            raise SystemExit(f"✗ {oid}: falta {f} — entrega incompleta, nada publicado")
    lo = (n - 1) // 10 * 10 + 1
    dst = os.path.join(ROOT, "PUBLICACAO", lote, f"REELS_{lo:02d}_AO_{lo + 9:02d}", f"{n:02d}")
    os.makedirs(dst, exist_ok=True)
    shutil.copy2(os.path.join(src, files["mp4"]), os.path.join(dst, f"{oid}.mp4"))
    shutil.copy2(os.path.join(src, files["capa"]), os.path.join(dst, f"{oid}_capa.png"))
    shutil.copy2(os.path.join(src, files["txt"]), os.path.join(dst, f"{oid}_legenda.txt"))
    docx_from_txt(os.path.join(src, files["txt"]), os.path.join(dst, f"{oid}_legenda.docx"))
    print("✓", os.path.relpath(dst, ROOT), sorted(os.listdir(dst)))

if __name__ == "__main__":
    lote = sys.argv[1]
    for a in sys.argv[2:]:
        publish(lote, int(a))
