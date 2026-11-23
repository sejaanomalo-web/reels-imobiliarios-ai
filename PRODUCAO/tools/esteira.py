"""Rotação de produção da ATIVO — 4 MODELOS (regra do cliente, 23/11/2026). Ordem circular contínua entre roteiros
e lotes: 1 Cartoon explicativo → 2 Pictograma cinematográfico → 3 Planta técnica → 4 Maquete 3D → 1 …
Substitui a esteira de 5 estilos (21/11/2026), que fica ARQUIVADA: o histórico dela continua em estilos/esteira.json
(chaves "estilos"/"historico") só para os episódios já entregues.

Uso (a partir de PRODUCAO/):
  python3 tools/esteira.py proximo                       # modelo da vez (número, nome, formato e skill)
  python3 tools/esteira.py registrar <EP-ID> <formato>   # atribui o modelo ao episódio e avança a rotação
  python3 tools/esteira.py status                        # histórico da rotação
Idempotente: episódio já registrado não avança de novo. Fora da vez só com ATIVO_FORA_DA_VEZ="<motivo>" (fica no histórico)."""
import json, os, sys, datetime
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
P = os.path.join(ROOT, "estilos", "esteira.json")


def load(): return json.load(open(P))
def save(d): json.dump(d, open(P, "w"), ensure_ascii=False, indent=2)


def rot(d): return d["rotacao"]
def modelo(d, n): return rot(d)["modelos"][str(n)]
def nome(d, n): return modelo(d, n)["nome"]  # compatível com chamadas antigas (nome do modelo da rotação)
def proximo(d): return rot(d)["proximo"]
def numero_do_formato(d, formato):
    for k, m in rot(d)["modelos"].items():
        if m["formato"] == formato:
            return int(k)
    return None


def registrar(ep_id, formato):
    """Registra o episódio na rotação de 4 modelos. Devolve o número do modelo."""
    d = load()
    r = rot(d)
    for h in r["historico"]:
        if h["episodio"] == ep_id:
            return h["modelo"]
    n = numero_do_formato(d, formato)
    if n is None:
        raise SystemExit(f"formato '{formato}' não está na rotação de 4 modelos ({', '.join(m['formato'] for m in r['modelos'].values())})")
    vez = r["proximo"]
    motivo = os.environ.get("ATIVO_FORA_DA_VEZ", "").strip()
    if n != vez and not motivo:
        raise SystemExit(f"fora da vez: o modelo da vez é {vez} ({nome(d, vez)}, formato \"{modelo(d, vez)['formato']}\"). "
                         f"Para produzir o modelo {n} mesmo assim, rode com ATIVO_FORA_DA_VEZ=\"<motivo aprovado pelo cliente>\".")
    epp = os.path.join(ROOT, "episodes", ep_id, "episode.json")
    if os.path.exists(epp):
        e = json.load(open(epp))
        e.update(rotacao=True, modelo=n, modeloNome=nome(d, n))
        for k in ("estilo", "estiloNome", "esteira"):
            e.pop(k, None)
        json.dump(e, open(epp, "w"), ensure_ascii=False, indent=1)
    item = {"episodio": ep_id, "modelo": n, "nome": nome(d, n), "data": datetime.date.today().isoformat()}
    if n != vez:
        item["foraDaVez"] = motivo
    r["historico"].append(item)
    if n == vez:
        r["proximo"] = n % len(r["modelos"]) + 1
    save(d)
    return n


if __name__ == "__main__":
    d = load(); cmd = sys.argv[1] if len(sys.argv) > 1 else "proximo"
    if cmd == "proximo":
        n = proximo(d); m = modelo(d, n)
        print(f"{n} {m['nome']} · formato=\"{m['formato']}\" · skill {m['skill']}")
    elif cmd == "registrar":
        if len(sys.argv) < 4:
            raise SystemExit("uso: esteira.py registrar <EP-ID> <formato>")
        n = registrar(sys.argv[2], sys.argv[3]); d = load()
        print(f"{sys.argv[2]} → modelo {n} ({nome(d, n)}); próximo: {proximo(d)} ({nome(d, proximo(d))})")
    elif cmd == "status":
        for h in rot(d)["historico"]:
            print(h["episodio"], h["modelo"], h["nome"], h["data"], ("FORA DA VEZ: " + h["foraDaVez"]) if h.get("foraDaVez") else "")
        print("próximo:", proximo(d), nome(d, proximo(d)))
    else:
        raise SystemExit("comandos: proximo | registrar <EP-ID> <formato> | status")
