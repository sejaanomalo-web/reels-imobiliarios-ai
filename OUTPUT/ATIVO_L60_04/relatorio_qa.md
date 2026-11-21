# QA — ATIVO_L60_04 · "O anúncio funcionou. O atendimento não." (lote L60 · EP051 · 21/11/2026)

**Fonte:** `ROTEIROS/EP051.md` (livro, Dia 06 / EP051). Gancho, situação, tensão e insight narrados palavra por palavra.
**Esteira:** ESTILO 3 · PLANTA TÉCNICA. Próximo estilo: 4 · Tipografia cinética.
**Agenda:** 30/11/2026 às 10:00, slot automático.

## Apuração
- Roteiro atemporal: sem números de conversão e sem plataforma citada.
- O funil do vídeo é ILUSTRATIVO.

## CTA
- A CTA do livro já era sobre o sistema. Foi trocada pela CTA SISTEMA padrão, sem transição.

## Voz
- ⚠️ **As duas tomadas leram a instrução de direção no meio do texto e depois recomeçaram do início.** É o 2º episódio seguido com esse vazamento: as últimas gerações do dia estão degradando.
- Usei a tomada A, cortada aos 17,6 s, dentro da pausa antes do recomeço (`ffmpeg -ss`, sem mudar tom nem velocidade).
- Resultado: 33,8 s de fala, 158 palavras/min, ASR 0,989.
- **Pontos para ouvir:** o início, confirmando que não sobrou nada da instrução. Também "Comenta SISTEMA".
- **Recomendação:** antes de continuar, deixar a cota renovar (amanhã) e testar se o vazamento persiste.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 36,1 s · −15,0 LUFS.
- `editorial_check` 0/0. Movimento 1,81. SFX: 17 eventos. `legenda_check` ✓.
- Correções feitas:
  - título do gancho encurtado para uma linha, porque a chamada cobria o título;
  - o kit `planta.tsx` desenhava o fundo dos cômodos mesmo com p=0. Corrigido: o cômodo agora fica invisível até começar a ser desenhado.

## Cenas
1. **DEPOIS DO CLIQUE:** ANÚNCIO ✓ EXCELENTE → porta CLIQUE → CONVERSA "perdida depois do clique" (vermelho).
2. **O LEAD VAZA:** FORMULÁRIO → 1º RETORNO "SEM DONO" com gotas vazando pela parede → PRÓXIMO PASSO "—" sem registro.
3. **CONFIRA ANTES:** "Antes de aumentar o investimento" → as peças DONO, ROTINA e HISTÓRICO sobem e se encaixam no funil → ✓ VAZAMENTO FECHADO.
4. **MARKETING + PROCESSO:** dois cômodos ligados por uma porta → carimbo "FUNIL COMPLETO · UMA NÃO SUBSTITUI A OUTRA".
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-L60-04 --source episodes/ATIVO-L60-04/narration_source.wav && python3 tools/build_audio.py ATIVO-L60-04 && bash tools/render_episode.sh ATIVO-L60-04
```
