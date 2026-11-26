#!/usr/bin/env python3
"""Checa se uma pauta/roteiro novo repete tema de roteiros anteriores da esteira (ROTEIROS/ESTEIRA/*/*.md).

Criado em 26/11/2026 depois de 8 pares de temas repetidos entre 30/11 e 11/12 (mesma tese, mesma fonte, gancho quase igual).
Compara proposta + gancho + fontes (palavras de conteúdo) e as "entidades" das fontes (nomes, anos, artigos de lei).

Uso:
  python3 tools/pauta_repetida.py --todos                  # todos os pares suspeitos da esteira
  python3 tools/pauta_repetida.py --texto "proposta, fonte e gancho da ideia nova"
  python3 tools/pauta_repetida.py --roteiro ROTEIROS/ESTEIRA/AAAA-MM-DD/ATIVO-....md
  python3 tools/pauta_repetida.py --json /caminho/rot.json  # lote de roteiros (campos prop, fontes, falas, tit)
Sai com código 1 se algum item passar do limite (REPETIDO). Lista sempre os 5 roteiros mais próximos:
LEIA-OS antes de aprovar a pauta — a mesma tese com outras palavras e outra fonte não é pega por palavra.
"""
import argparse, glob, json, os, re, sys, unicodedata

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LIMITE_TEXTO = 0.30
STOP = set("""a o e é de da do das dos em no na nos nas um uma uns umas para pra por com sem que se mais menos muito muita
como quando onde quem qual seu sua seus suas ele ela eles elas voce você isso esse essa este esta ao aos à às ou mas nao não
ja já so só tambem também depois antes ate até sobre entre cada todo toda todos todas mesmo mesma ser foi era são sao tem ter
vai vira virou fica faz fazer pode ainda bem quanto quanta vez vezes outro outra lo la le lhe nos me te mim ti ha há dia dias
corretor corretores cliente clientes imovel imóvel imoveis imóveis casa casas venda vendas compra comprador video vídeo roteiro
fala gancho proposta fonte fontes limitacoes limitações sistema ativo nao""".split())


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(ch for ch in s if unicodedata.category(ch) != "Mn")


def palavras(s: str) -> set:
    return {w for w in re.findall(r"[a-z0-9]{3,}", norm(s)) if w not in {norm(x) for x in STOP}}


def raiz(w: str) -> str:
    return w[:6]


def entidades(fontes: str) -> set:
    """Autores/lugares citados (nomes próprios) e artigos de lei ('art:67-A'). Anos sozinhos não contam."""
    nomes = {norm(m) for m in re.findall(r"\b[A-Z][a-zà-ú]{3,}\b", fontes)}
    arts = {"art:" + m.upper() for m in re.findall(r"art\.?\s*(\d+(?:-[A-Za-z])?)", fontes)}
    comuns = {"lei", "brasil", "estados", "unidos", "europa", "estudo", "pesquisa", "dados", "artigo", "journal", "review",
              "universidade", "detalhes", "situacao", "roteiro", "fontes", "origem", "nenhum", "nenhuma", "quando", "segundo",
              "rotina", "pratica", "tese", "prefeitura", "secretaria", "psychological", "science", "consumer", "psychology"}
    return {n for n in nomes if n not in comuns} | arts


def jacc(a: set, b: set) -> float:
    return len(a & b) / len(a | b) if a and b else 0.0


def ler_md(p: str) -> dict:
    t = open(p, encoding="utf-8").read()
    tit = t.splitlines()[0] if t else ""
    prop = re.search(r"\*\*Proposta[^:]*:\*\*\s*(.+)", t)
    fon = re.search(r"\*\*Fontes[^:]*:\*\*\s*(.+)", t)
    fala = re.search(r"### GANCHO\s*\nFALA:\s*(.+)", t)
    return {"id": os.path.basename(p)[:-3], "tit": tit, "prop": prop.group(1) if prop else "", "fontes": fon.group(1) if fon else "",
            "gancho": fala.group(1) if fala else ""}


def assinatura(r: dict):
    txt = palavras(f"{r['tit']} {r['prop']} {r['gancho']}")
    return {raiz(w) for w in txt}, entidades(r.get("fontes", ""))


def comparar(novo: dict, base: list, ignorar: str = ""):
    tn, en = assinatura(novo)
    out = []
    for r in base:
        if r["id"] == ignorar or r["id"] == novo.get("id"):
            continue
        tb, eb = assinatura(r)
        st, se = jacc(tn, tb), jacc(en, eb)
        forte = st >= LIMITE_TEXTO or (st >= 0.2 and len(tn & tb) >= 5) or (len(en & eb) >= 2 and se >= 0.26) or any(e.startswith("art:") for e in en & eb)
        out.append((max(st, se), st, se, r, forte))
    return sorted(out, key=lambda x: -x[0])


def base_esteira():
    return [ler_md(p) for p in sorted(glob.glob(os.path.join(RAIZ, "ROTEIROS", "ESTEIRA", "*", "*.md")))]


def relatorio(novo: dict, achados) -> bool:
    """Sempre lista os 5 mais próximos: a tese repetida com outras palavras (ex.: 'prova convence') só se pega lendo."""
    fortes = [a for a in achados if a[4]]
    print(f"{'REPETIDO' if fortes else 'OK'}  {novo.get('id') or novo['tit'][:60]}")
    for sc, st, se, r, f in (fortes + [a for a in achados if not a[4]])[:5]:
        print(f"   {'!!' if f else '~ '} {r['id']}  (texto {st:.2f} · fontes {se:.2f})  {r['prop'][:110]}")
    return bool(fortes)


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--todos", action="store_true")
    g.add_argument("--texto")
    g.add_argument("--roteiro")
    g.add_argument("--json")
    a = ap.parse_args()
    base = base_esteira()
    ruim = False
    if a.todos:
        vistos = set()
        for i, r in enumerate(base):
            for sc, st, se, o, forte in comparar(r, base[:i]):
                if not forte:
                    continue
                par = tuple(sorted((r["id"], o["id"])))
                if par in vistos:
                    continue
                vistos.add(par)
                ruim = True
                print(f"{o['id']}  ↔  {r['id']}   (texto {st:.2f} · fontes {se:.2f})")
        print("nenhum par suspeito" if not ruim else "")
    elif a.texto:
        ruim = relatorio({"id": "", "tit": a.texto, "prop": "", "gancho": "", "fontes": a.texto}, comparar({"id": "", "tit": a.texto, "prop": "", "gancho": "", "fontes": a.texto}, base))
    elif a.roteiro:
        r = ler_md(a.roteiro)
        ruim = relatorio(r, comparar(r, base))
    else:
        for x in json.load(open(a.json, encoding="utf-8")):
            r = {"id": x.get("ep", ""), "tit": x.get("tit", ""), "prop": x.get("prop", ""), "fontes": x.get("fontes", ""),
                 "gancho": (x.get("falas") or [""])[0]}
            ruim = relatorio(r, comparar(r, base)) or ruim
    sys.exit(1 if ruim else 0)


if __name__ == "__main__":
    main()
