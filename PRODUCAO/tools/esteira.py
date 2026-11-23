"""Registro dos 4 MODELOS audiovisuais da ATIVO — escolha por ADEQUAÇÃO + guardrails (Esteira Editorial Diária, 23/11/2026).

Não existe mais "modelo da vez". O modelo de cada vídeo é escolhido pela adequação narrativa ao roteiro e ao território,
registrado na grade do dia (PRODUCAO/grade/AAAA-MM-DD.json) e conferido pelos guardrails de `tools/grade.py validar`
(≤2× por modelo no dia, consecutivo só com justificativa, ≥3 modelos com 5+ slots, ≤40% por modelo em 7 dias).
Regras: PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md §6.

Histórico preservado em estilos/esteira.json:
  - "modelos4": modelos 1–4 + histórico dos episódios (este arquivo registra);
  - "modelos4.rotacaoFixaArquivada": a rotação fixa 1→4 (23/11/2026 manhã–tarde; nenhum episódio produzido nela);
  - "estilos"/"historico": esteira de 5 estilos (21/11/2026), ARQUIVADA, só para os episódios já entregues.

Uso (a partir de PRODUCAO/):
  python3 tools/esteira.py diversidade [N]                # uso de cada modelo nos últimos N episódios (padrão 12) — desempate
  python3 tools/esteira.py registrar <EP-ID> <formato>    # registra o modelo do episódio (novo_episodio.build já chama)
  python3 tools/esteira.py status                         # histórico
Idempotente: episódio já registrado não é registrado de novo."""
import datetime
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
P = os.path.join(ROOT, "estilos", "esteira.json")


def load(): return json.load(open(P, encoding="utf-8"))
def save(d): json.dump(d, open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)


def reg(d): return d["modelos4"]
def modelo(d, n): return reg(d)["modelos"][str(n)]
def nome(d, n): return modelo(d, n)["nome"]
def numero_do_formato(d, formato):
    for k, m in reg(d)["modelos"].items():
        if m["formato"] == formato:
            return int(k)
    return None


def diversidade(d=None, ultimos=12):
    """{formato: usos} nos últimos `ultimos` episódios registrados (todos os 4 aparecem, mesmo com 0)."""
    d = d or load()
    h = reg(d)["historico"][-ultimos:]
    cont = {m["formato"]: 0 for m in reg(d)["modelos"].values()}
    for x in h:
        f = modelo(d, x["modelo"])["formato"]
        cont[f] = cont.get(f, 0) + 1
    return cont, len(h)


def registrar(ep_id, formato, grade=None, slot=None):
    """Registra o modelo do episódio no histórico e no episode.json. Devolve o número do modelo (1–4)."""
    d = load()
    r = reg(d)
    for h in r["historico"]:
        if h["episodio"] == ep_id:
            return h["modelo"]
    n = numero_do_formato(d, formato)
    if n is None:
        raise SystemExit(f"formato '{formato}' não é um dos 4 modelos ({', '.join(m['formato'] for m in r['modelos'].values())})")
    epp = os.path.join(ROOT, "episodes", ep_id, "episode.json")
    if os.path.exists(epp):
        e = json.load(open(epp, encoding="utf-8"))
        e.update(modelos4=True, modelo=n, modeloNome=nome(d, n))
        for k in ("estilo", "estiloNome", "esteira", "rotacao"):
            e.pop(k, None)
        json.dump(e, open(epp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    item = {"episodio": ep_id, "modelo": n, "nome": nome(d, n), "data": datetime.date.today().isoformat()}
    if grade:
        item.update(grade=grade, slot=slot)
    r["historico"].append(item)
    save(d)
    return n


if __name__ == "__main__":
    d = load()
    cmd = sys.argv[1] if len(sys.argv) > 1 else "diversidade"
    if cmd in ("diversidade", "proximo"):
        if cmd == "proximo":
            print("(não existe mais 'modelo da vez' — 23/11/2026: escolha por adequação + guardrails; PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md §6)")
        ult = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 12
        cont, n = diversidade(d, ult)
        print(f"uso dos 4 modelos nos últimos {n} episódio(s) registrados:")
        for k, m in reg(d)["modelos"].items():
            print(f"  {k} {m['nome']:27} formato=\"{m['formato']}\"  {cont[m['formato']]}×  · skill {m['skill']}")
        menos = min(cont.values()) if cont else 0
        print("desempate (só quando dois modelos servem igualmente ao roteiro): " + ", ".join(f for f, v in cont.items() if v == menos))
    elif cmd == "registrar":
        if len(sys.argv) < 4:
            raise SystemExit("uso: esteira.py registrar <EP-ID> <formato>")
        n = registrar(sys.argv[2], sys.argv[3])
        print(f"{sys.argv[2]} → modelo {n} ({nome(load(), n)})")
    elif cmd == "status":
        for h in reg(d)["historico"]:
            print(h["episodio"], h["modelo"], h["nome"], h["data"], f"grade {h['grade']} {h['slot']}" if h.get("grade") else "")
        if not reg(d)["historico"]:
            print("(nenhum episódio registrado nos 4 modelos ainda)")
    else:
        raise SystemExit("comandos: diversidade [N] | registrar <EP-ID> <formato> | status")
