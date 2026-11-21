"""Esteira de 5 estilos visuais (regra do cliente, 21/11/2026). Ordem circular contínua: 1 Palitinho → 2 Desenho à mão →
3 Planta técnica → 4 Tipografia cinética → 5 Painel → 1 … (entre roteiros E entre lotes).

Uso (a partir de PRODUCAO/):
  python3 tools/esteira.py proximo              # mostra o próximo estilo da fila
  python3 tools/esteira.py registrar <EP-ID>    # atribui o próximo estilo ao episódio (episode.json "estilo") e avança a fila
  python3 tools/esteira.py status               # histórico
Idempotente: se o episódio já tem estilo registrado, não avança de novo."""
import json, os, sys, datetime
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
P = os.path.join(ROOT, "estilos", "esteira.json")

def load(): return json.load(open(P))
def save(d): json.dump(d, open(P, "w"), ensure_ascii=False, indent=2)
def nome(d, n): return d["estilos"][str(n)]["nome"]

def registrar(ep_id):
    d = load()
    for h in d["historico"]:
        if h["episodio"] == ep_id:
            return h["estilo"]
    n = d["proximo"]
    epp = os.path.join(ROOT, "episodes", ep_id, "episode.json")
    if os.path.exists(epp):
        e = json.load(open(epp)); e["estilo"] = n; e["estiloNome"] = nome(d, n); e["esteira"] = True
        json.dump(e, open(epp, "w"), ensure_ascii=False, indent=1)
    d["historico"].append({"episodio": ep_id, "estilo": n, "nome": nome(d, n), "data": datetime.date.today().isoformat()})
    d["proximo"] = n % 5 + 1
    save(d)
    return n

if __name__ == "__main__":
    d = load(); cmd = sys.argv[1] if len(sys.argv) > 1 else "proximo"
    if cmd == "proximo": print(d["proximo"], nome(d, d["proximo"]))
    elif cmd == "registrar":
        n = registrar(sys.argv[2]); print(f"{sys.argv[2]} → estilo {n} ({nome(load(), n)}); próximo: {load()['proximo']}")
    elif cmd == "status":
        for h in d["historico"]: print(h["episodio"], h["estilo"], h["nome"], h["data"])
        print("próximo:", d["proximo"], nome(d, d["proximo"]))
