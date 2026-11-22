"""Publica um episódio pronto: MOVE as entregas de OUTPUT/<saida>/ para a pasta da data/hora em que ele vai ao ar.

Uso (a partir de PRODUCAO/):
  python3 tools/publicar.py <EPISODIO-ou-saida> --quando "2026-12-01 10:00"            # monta a pasta (não commita)
  python3 tools/publicar.py ATIVO-L60-06 --quando "2026-12-01 22:00" --substituir     # troca o vídeo de uma pasta já criada

Estrutura gerada (uma pasta por vídeo; semanas de domingo a sábado, recortadas no mês):
  PUBLICACAO/2026/12-dezembro/semana-01-05/01-terca/10h00/
      ATIVO_L60_06.mp4  ·  ATIVO_L60_06_capa.jpg  ·  ATIVO_L60_06_legenda.txt
      bastidores/  (relatório de QA, validação técnica, SRT e relatórios de áudio)

A data/hora da PASTA é o horário do post: o Supabase (função ig_enfileirar_post) lê o caminho e agenda exatamente ali.
Depois: git add -A, commit e push na main → a Action "Enfileirar posts" coloca na fila. Nada é duplicado: OUTPUT/<saida>
fica só com arquivos locais ignorados (WAVs e cópias editáveis), que podem ser apagados.
"""
import argparse, datetime as dt, json, os, shutil, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
MESES = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
DIAS = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]  # índice = date.weekday()


def pasta_por_data(quando: dt.datetime) -> str:
    """PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-diadasemana/HHhMM (semana de domingo a sábado, recortada no mês)."""
    d = quando.date()
    desde_domingo = (d.weekday() + 1) % 7
    ini = max(d - dt.timedelta(days=desde_domingo), d.replace(day=1))
    prox_mes = (d.replace(day=28) + dt.timedelta(days=4)).replace(day=1)
    fim = min(d - dt.timedelta(days=desde_domingo) + dt.timedelta(days=6), prox_mes - dt.timedelta(days=1))
    return "/".join([
        "PUBLICACAO", f"{d.year}", f"{d.month:02d}-{MESES[d.month - 1]}", f"semana-{ini.day:02d}-{fim.day:02d}",
        f"{d.day:02d}-{DIAS[d.weekday()]}", f"{quando.hour:02d}h{quando.minute:02d}",
    ])


def resolver(alvo: str):
    """Aceita o ID do episódio (PRODUCAO/episodes/<ID>) ou o outputDir. Retorna (saida, nome_final, nome_capa)."""
    ep = os.path.join(ROOT, "PRODUCAO", "episodes", alvo, "episode.json")
    if os.path.exists(ep):
        d = json.load(open(ep))
        out = d.get("outputDir", alvo)
        dl = d.get("deliverables", {})
        base = os.path.basename(out)
        return out, dl.get("final", f"{base}_FINAL.mp4"), dl.get("cover", f"{base}_capa.png")
    base = os.path.basename(alvo)
    return alvo, f"{base}_FINAL.mp4", f"{base}_capa.png"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("alvo")
    ap.add_argument("--quando", required=True, help='data e hora de Brasília, "AAAA-MM-DD HH:MM"')
    ap.add_argument("--substituir", action="store_true", help="permite trocar o vídeo de uma pasta que já tem este mesmo episódio")
    a = ap.parse_args()
    quando = dt.datetime.strptime(a.quando, "%Y-%m-%d %H:%M")
    out, final, capa = resolver(a.alvo)
    src = os.path.join(ROOT, "OUTPUT", out)
    ident = os.path.basename(out)
    need = {"video": os.path.join(src, final), "capa": os.path.join(src, capa), "legenda": os.path.join(src, "legenda_instagram.txt")}
    falta = [k for k, p in need.items() if not os.path.isfile(p)]
    if falta:
        sys.exit(f"✗ {out}: falta {', '.join(falta)} em OUTPUT/{out}/ — entrega incompleta, nada foi movido")
    r = subprocess.run([sys.executable, os.path.join(ROOT, "PRODUCAO", "tools", "legenda_check.py"), out], cwd=os.path.join(ROOT, "PRODUCAO"), capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"✗ legenda reprovada:\n{r.stdout}{r.stderr}")
    destino_rel = pasta_por_data(quando)
    dst = os.path.join(ROOT, destino_rel)
    if os.path.isdir(dst):
        mp4s = [f for f in os.listdir(dst) if f.lower().endswith(".mp4")]
        if mp4s and not (a.substituir and mp4s == [f"{ident}.mp4"]):
            sys.exit(f"✗ {destino_rel} já tem {mp4s} — escolha outro horário (ou --substituir para o mesmo episódio)")
    os.makedirs(os.path.join(dst, "bastidores"), exist_ok=True)
    shutil.move(need["video"], os.path.join(dst, f"{ident}.mp4"))
    from PIL import Image  # capa em JPEG (a API do Instagram não aceita PNG; evita a Action criar uma cópia)
    img = Image.open(need["capa"])
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA"); fundo = Image.new("RGB", img.size, (0, 0, 0)); fundo.paste(img, mask=img.split()[-1]); img = fundo
    img.convert("RGB").save(os.path.join(dst, f"{ident}_capa.jpg"), "JPEG", quality=92, optimize=True)
    os.remove(need["capa"])
    shutil.move(need["legenda"], os.path.join(dst, f"{ident}_legenda.txt"))
    # bastidores: tudo o que é versionado e não é vídeo/capa/legenda
    for nome in os.listdir(src):
        p = os.path.join(src, nome)
        if nome.endswith(("_legendas.srt", ".md")) or nome == "validacao_tecnica.json":
            shutil.move(p, os.path.join(dst, "bastidores", nome))
    aud = os.path.join(src, "audio")
    if os.path.isdir(aud):
        os.makedirs(os.path.join(dst, "bastidores", "audio"), exist_ok=True)
        for nome in os.listdir(aud):
            if nome.endswith(".json"):
                shutil.move(os.path.join(aud, nome), os.path.join(dst, "bastidores", "audio", nome))
    print(f"✓ {ident} → {destino_rel}/  ({quando:%d/%m/%Y %H:%M} de Brasília)")
    print("  próximo passo: git add -A && git commit && git push (main) → a Action coloca na fila nesse horário")


if __name__ == "__main__":
    main()
