# QA — ATIVO_L60_03 · "A IA não vende apartamento sozinha" (lote L60 · EP041 · 21/11/2026)

**Fonte:** `ROTEIROS/EP041.md` (livro, Dia 05 / EP041). Gancho, situação, tensão e insight narrados palavra por palavra.
**Esteira:** ESTILO 2 · DESENHO À MÃO. Próximo: 3 · Planta técnica.
**Agenda:** 30/11/2026 às 8:00, no slot automático da Action. O dia 30 recebe 2 do livro (8h e 10h) e o GTA às 22h.

## Apuração
- O roteiro é atemporal: não traz estatística nem promessa.
- Ele diz só que a tecnologia ajuda em tarefas quando ferramenta e processo permitem e que não substitui o julgamento humano.
- O vídeo **não** diz que o produto tem IA ou automação.
- O robô e a tabela são ILUSTRATIVOS. Os exemplos da tabela ("lembrar retorno", "só avisa", "o corretor") são genéricos.

## CTA
- A CTA do livro já falava do sistema. Foi trocada pela CTA SISTEMA padrão, sem frase de transição.

## Voz
- Puck, 1,0×. Usei a tomada **B**: 40,1 s, 149 palavras/min, ASR 1,00 (100/100). Ela tem a entonação de pergunta certa no "Quem vai entender…?".
- A tomada A também saiu limpa.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 42,5 s · −14,96 LUFS.
- `editorial_check`: 0 erros / 0 avisos. Movimento 1,79. SFX: 20 eventos. `legenda_check` ✓.
- Correções nos quadros:
  - o X do gancho cobria o título;
  - a agenda continuava visível atrás de "não substitui";
  - "QUEM RESPONDE" estourava a célula da tabela;
  - "visita: humano" encostava na borda.

## Cenas
1. **A IA VENDE SOZINHA?** — robô a giz estende uma chave gigante. "vende sozinha!" é riscado e aparece um "?" vermelho.
2. **FAÇA UMA PERGUNTA** — QUEM VAI… entender (balão) · negociar (mãos) · responder (documento) … o comprador?
3. **AJUDA EM TAREFAS → MAS NÃO SUBSTITUI**
   - O braço do robô encaixa blocos de tarefa na agenda, enquanto a visita é conduzida por um humano.
   - Depois aparecem "julgamento comercial" e "confiança", com o robô riscado: não substitui.
4. **TAREFA · LIMITE · RESPONSÁVEL** — tabela a giz com os exemplos e uma seta para "decisão humana".
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-L60-03 --source episodes/ATIVO-L60-03/narration_source.wav && python3 tools/build_audio.py ATIVO-L60-03 && bash tools/render_episode.sh ATIVO-L60-03
```
