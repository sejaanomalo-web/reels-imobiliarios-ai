# Uso (a partir da raiz): python3 PRODUCAO/tools/gerar_roteiros.py ROTEIROS/ESTEIRA/AAAA-MM-DD <roteiros.json>
"""Gera os roteiros da grade (Skill Mestre + complemento script-creator, 25/11/2026).
Cada entrada EXIGE: ganchos (3, mecanismos diferentes), escolhido + porque, beats (informação nova por take),
rubrica (10 dimensões 0–4 com evidência), riscos, confirmar. Sem esses campos, recusa (sem auditoria decorativa)."""
import os, json, sys
D = sys.argv[1]; data = json.load(open(sys.argv[2]))
CTA = "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."
L1 = '📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.'
DIMS = ["relevancia", "clareza", "curiosidade", "originalidade", "visualidade", "progressao", "payoff", "naturalidade", "cta", "executabilidade"]
for e in data:
    for k in ("ganchos", "escolhido", "porque", "beats", "rubrica", "riscos", "confirmar"):
        assert k in e, f"{e['ep']}: falta '{k}' (complemento script-creator)"
    assert len(e["ganchos"]) == 3 and len({g[0] for g in e["ganchos"]}) == 3, f"{e['ep']}: 3 ganchos de mecanismos diferentes"
    assert set(e["rubrica"]) == set(DIMS), f"{e['ep']}: rubrica incompleta"
    baixos = [d for d in DIMS if e["rubrica"][d][0] < 3]
    assert all(len(e["rubrica"][d]) == 3 for d in baixos), f"{e['ep']}: item < 3 sem justificativa de exceção: {baixos}"
    assert len(e["beats"]) == len(e["falas"]) - 1, f"{e['ep']}: um beat (informação nova) por bloco depois do gancho"
    b = "\n".join(f"### {h}\nFALA: {f}" for h, f in e["falas"]) + f"\n### CTA\nFALA: {CTA}"
    g = "\n".join(f"| {'**' + str(i+1) + ' · ESCOLHIDO**' if i == e['escolhido'] else str(i+1)} | {m} | {fa} | {q} | {p} | {r} |" for i, (m, fa, q, p, r) in enumerate(e["ganchos"]))
    bt = "\n".join(f"- **{h}** → {n}" for (h, _), n in zip(e["falas"][1:], e["beats"]))
    rb = "\n".join(f"| {d} | {e['rubrica'][d][0]} | {e['rubrica'][d][1]}{(' · EXCEÇÃO: ' + e['rubrica'][d][2]) if len(e['rubrica'][d]) == 3 else ''} |" for d in DIMS)
    txt = f"""# {e['ep']} — "{e['tit']}"
**Status:** APROVADO por delegação do cliente (ordem no chat de 24/11/2026: "produzir e programar sem aprovação, com revisão sua depois"). Revisão posterior do cliente.

## PARTE A — Ficha estratégica
- **Origem:** pesquisa da Skill Mestre. `modelos/` sem MP4 pendente.
- **Grade:** {e['grade']}.
- **Modelo audiovisual:** {e['modelo']}
- **Proposta:** {e['prop']}
- **Recompensa:** {e['rec']}
- **Fontes e limitações:** {e['fontes']}

## GANCHOS (etapa 04 + script-creator 02 — 3 mecanismos, teste dos 4 erros e contrafactuais)
| # | Mecanismo | FALA | Primeiro quadro | Pergunta implícita | Risco / teste dos 4 erros |
|---|---|---|---|---|---|
{g}

**Por que o escolhido:** {e['porque']}

## PARTE B — Roteiro de produção
{b}

### Informação nova por bloco (etapa 06 + script-creator 03)
{bt}

## FICHA MUSICAL
```
TRILHA: {e['trilha']} · âncoras: virada, insight e resolução nos cues do episódio
```

## PARTE D — Auditoria (etapa 09 + script-creator 06)
**Portas eliminatórias:** nenhuma acionada (promessa entregue antes da CTA; fatos com fonte na Parte A; CTA SISTEMA; 3 ganchos de mecanismos distintos; nada encenado como real).

| Dimensão | 0–4 | Evidência neste roteiro |
|---|---|---|
{rb}

**Riscos reais:** {e['riscos']}
**A confirmar:** {e['confirmar']}

**Status: APROVAR.**

## PARTE E — Legenda do Instagram
```
{L1}

{e['leg']}

{e['tags']}
```
"""
    open(os.path.join(D, e["fn"]), "w", encoding="utf-8").write(txt)
    o = f"OUTPUT/{e['ep'].replace('-', '_')}"; os.makedirs(o, exist_ok=True)
    open(f"{o}/legenda_instagram.txt", "w", encoding="utf-8").write(f"{L1}\n\n{e['leg']}\n\n{e['tags']}\n")
    assert len(e["tags"].split()) == 5 and "**" not in e["leg"]
print("ok", len(data))
