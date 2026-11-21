#!/usr/bin/env python3
"""Registra MP4 novos de modelos/ e lista a fila da Skill Mestre da ATIVO.
Somente Python stdlib. Nao le nem transmite video; nao executa comandos externos.
"""
import argparse
import datetime as dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
CONTROL = ROOT / "controle.json"
STATUS = (
    "pendente", "em_analise", "aguardando_aprovacao",
    "roteiro_aprovado", "em_producao", "concluido", "descartado",
)
RANK_ROTEIRO = {"aguardando_aprovacao": 0, "em_analise": 1, "pendente": 2}
RANK_VIDEO = {"em_producao": 0, "roteiro_aprovado": 1,
              "aguardando_aprovacao": 2, "em_analise": 3, "pendente": 4}


def read_control():
    if CONTROL.exists():
        with CONTROL.open("r", encoding="utf-8") as handle:
            obj = json.load(handle)
        if not isinstance(obj.get("modelos"), list):
            raise SystemExit("ERRO: controle.json sem lista 'modelos'")
        return obj
    return {"versao": 1, "modelos": []}


def save_control(obj):
    data = json.dumps(obj, ensure_ascii=False, indent=2) + "\n"
    temp = CONTROL.with_suffix(".json.tmp")
    temp.write_text(data, encoding="utf-8")
    temp.replace(CONTROL)


def canonical(ref):
    # Accept "modelos/a.mp4" or "a.mp4"; disallow traversal or arbitrary locations.
    p = (REPO / ref).resolve() if str(ref).startswith("modelos/") else (ROOT / ref).resolve()
    try:
        sub = p.relative_to(ROOT)
    except ValueError as exc:
        raise SystemExit("ERRO: arquivo deve estar dentro de modelos/") from exc
    return "modelos/" + sub.as_posix()


def scan(obj):
    indexed = {item["arquivo"]: item for item in obj["modelos"]}
    found = []
    for p in ROOT.rglob("*"):
        if not p.is_file() or p.suffix.lower() != ".mp4" or ".cache" in p.parts:
            continue
        rel = "modelos/" + p.relative_to(ROOT).as_posix()
        found.append(rel)
        if rel not in indexed:
            item = {
                "arquivo": rel, "status": "pendente", "prioridade": 0,
                "registrado_em": dt.date.today().isoformat(),
                "atualizado_em": dt.date.today().isoformat(),
                "roteiro": "", "video_final": "", "observacoes": "",
            }
            obj["modelos"].append(item)
            indexed[rel] = item
    return set(found)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--modo", choices=("roteiro", "video"), default="roteiro")
    parser.add_argument("--status", nargs=2, metavar=("ARQUIVO_MP4", "STATUS"))
    parser.add_argument("--prioridade", nargs=2, metavar=("ARQUIVO_MP4", "NUMERO"))
    parser.add_argument("--roteiro", help="Caminho do roteiro aprovado (com --status)")
    parser.add_argument("--video", help="Caminho do MP4 final validado (com --status concluido)")
    parser.add_argument("--observacoes", help="Observacoes curtas para o historico")
    args = parser.parse_args()
    obj = read_control()
    before = json.dumps(obj, sort_keys=True, ensure_ascii=False)
    found = scan(obj)
    indexed = {item["arquivo"]: item for item in obj["modelos"]}

    if args.status:
        path, target = args.status
        key = canonical(path)
        if key not in indexed:
            parser.error("Arquivo nao registrado ou nao encontrado em modelos/: " + key)
        if target not in STATUS:
            parser.error("Status invalido: " + target)
        item = indexed[key]
        if target == "concluido" and not (args.video or item.get("video_final")):
            parser.error("Para concluir, informe o MP4 de saida com --video.")
        item["status"] = target
        if args.roteiro:
            item["roteiro"] = args.roteiro
        if args.video:
            item["video_final"] = args.video
        if args.observacoes:
            item["observacoes"] = args.observacoes
        item["atualizado_em"] = dt.date.today().isoformat()

    if args.prioridade:
        path, n = args.prioridade
        key = canonical(path)
        if key not in indexed:
            parser.error("Arquivo nao registrado ou nao encontrado em modelos/: " + key)
        try:
            number = int(n)
        except ValueError:
            parser.error("Prioridade precisa ser numero inteiro")
        indexed[key]["prioridade"] = number
        indexed[key]["atualizado_em"] = dt.date.today().isoformat()

    if json.dumps(obj, sort_keys=True, ensure_ascii=False) != before:
        save_control(obj)
    current = RANK_ROTEIRO if args.modo == "roteiro" else RANK_VIDEO
    queue = sorted(
        (item for item in obj["modelos"] if item.get("status") in current
         and item["arquivo"] in found),
        key=lambda it: (-int(it.get("prioridade", 0)),
                        current[it["status"]], it["arquivo"].lower()),
    )
    print("MODO:", args.modo)
    if queue:
        print("FILA PRIORITARIA:")
        for i, item in enumerate(queue, 1):
            print(f"{i}. {item['arquivo']} | {item['status']} | prioridade {item.get('prioridade', 0)}")
        print("PROXIMA ACAO: trabalhar/retomar o primeiro modelo da lista antes de pesquisa livre.")
    else:
        print("SEM REFERENCIAS EDITORIAIS PENDENTES PARA ESTE MODO; aplicar pesquisa livre da Skill Mestre.")
    waiting = [item for item in obj["modelos"] if item.get("status") in
               ("roteiro_aprovado", "em_producao") and item["arquivo"] in found]
    if args.modo == "roteiro" and waiting:
        print("COM ROTEIRO APROVADO / AGUARDANDO PRODUCAO:")
        for item in waiting:
            print("-", item["arquivo"], "|", item["status"], "| roteiro:", item.get("roteiro", ""))
    missing = [item["arquivo"] for item in obj["modelos"] if item["arquivo"] not in found]
    if missing:
        print("ATENCAO: REGISTRADOS SEM MP4 LOCAL:", ", ".join(missing))


if __name__ == "__main__":
    main()
