# Modelo de entrega editorial — contrato de arquivo

**Objetivo:** a saída precisa ser copiável, lida por um apresentador e transferível ao produtor Remotion sem reinterpretar falas. Não usar somente sinopse e conceitos abstratos.

## PARTE A — Ficha estratégica (antes do roteiro)
- Origem: modelo MP4 de `modelos/` (arquivo, status, mecanismo que será transformado) **ou** pesquisa livre.
- Se origem MP4: qual técnica foi estudada, o que NÃO será copiado e qual a contribuição original.
- Recomendações de estilo visual são sugestões opcionais; decisão e implementação com o usuário no Claude Code.
- ID/slug e título:
- Proposta da ideia em 1 frase:
- Público e situação:
- Grade do dia (Esteira Editorial Diária, `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`): data e horário do slot, **território** (agora · e-se · fora-da-bolha · corretor-real · historia · ideia), origem (modelos · radar · pesquisa · aprendizado), PUSH/PULL; se AGORA, data do fato (≤ 7 dias) e fonte primária:
- Modelo audiovisual sugerido + uma frase de justificativa narrativa (decisão final na produção):
- Função editorial (C1–C5, opcional):
- Objetivo principal:
- Hipótese de interesse:
- Por que compartilhar:
- Ganho/recompensa do público:
- Aprovação da ideia:
- Fontes e limitações de apuração:
- Recursos necessários/direitos:

## PARTE B — Roteiro de produção
**Formato:** Reels vertical 9:16.
**Duração estimada:** intervalo justificado (não promessa exata).
**Tom:** sentimento predominante; ritmo.
**Legenda de tela:** pontual, não duplicar texto integral.

### GANCHO | 0–Ns (estimativa)
FALA (somente o texto narrado, sem aspas editoriais):
...
DIREÇÃO VISUAL:
...
TEXTO NA TELA (se útil):
...
EDIÇÃO / SOM:
...
FUNÇÃO NARRATIVA:
...

### TAKE 01 | estimativa
FALA:
...
DIREÇÃO VISUAL:
...
TEXTO NA TELA:
...
EDIÇÃO / SOM:
...
O QUE MUDA PARA O ESPECTADOR:
...

(Adicionar quantos takes a história exigir, sem quotas.)

### DESFECHO | estimativa
FALA:
[Frase-síntese que recompensa a narrativa; última frase da história]
DIREÇÃO VISUAL:
[Tratamento especial, sem vender sistema.]

### CTA | estimativa
FALA:
Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado.
DIREÇÃO VISUAL:
[Logo oficial discreta, texto COMENTE SISTEMA, sem promessa de Direct automático.]

## FICHA MUSICAL (Sistema Musical ATIVO, `TRILHAS/README.md`)
A música participa da narrativa. No roteiro ainda não há segundos: as âncoras apontam para **frases**; depois da voz congelada, o `timeline.json` dá os tempos e `tools/adaptar_trilha.py` monta a faixa para eles.
```
TERRITÓRIO:
CURVA EMOCIONAL: (ex.: curiosidade → tensão → consequência → surpresa → insight)
MODELO VISUAL:
TRILHA SUGERIDA: (id do catálogo + papel; `python3 PRODUCAO/tools/trilhas.py sugerir --territorio … --modelo …`)
POR QUÊ: (uma frase: o que a curva da faixa faz pela história)
ÂNCORAS (função → frase do roteiro → cue):
  virada      "…"   → cue:
  tensao      "…"   → cue:   (opcional)
  descoberta  "…"   → cue:
  insight     "…"   → cue:   (a mais importante: o clímax/drop da faixa cai aqui)
  resolucao   "…"   → cue:   (opcional)
MICRODROP: (opcional, no máximo 1–2: antes de qual frase e por quê)
```
A ficha **sugere**; a escolha final da trilha é da produção, registrada na grade. Trilha sem licença (`referencia`) não vai ao ar.

## PARTE C — Direção audiovisual consolidada
Shotlist resumida: cena | função | mídia/asset | direção | legenda/SFX | licença/pendência.
Separar material confirmado de recursos a captar; não supor imagem real de software.

## PARTE D — Auditoria
Ideia, originalidade, gancho, narrativa, payoff, conexão, CTA, provas, viabilidade → FORTE / AJUSTAR / CRÍTICO / NÃO VERIFICADO.
Principal risco e solução efetivamente aplicada. Status final APROVAR/REVISAR/DESCARTAR.

## PARTE E — Publicação
Legenda editorial **não é transcrição**; abrir com “Comente SISTEMA ...”, seguir PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md, sem negrito e com 5 hashtags minúsculas. Não declarar automação configurada. Fonte de cada alegação verificável.

## EXIGÊNCIA DE FORMATO
- Separar claramente **FALA**, **DIREÇÃO VISUAL**, **TEXTO NA TELA**, **EDIÇÃO/SOM**.
- Nada de esconder instrução técnica no texto da locução.
- Não produzir storyboard vago tipo "mostrar imagens relacionadas".
- Roteiro deve funcionar isoladamente e ser gravável com os recursos disponíveis.
- A aprovação criativa antecede geração de voz/render, salvo pedido explícito para executar produção integral com roteiro já aprovado.
