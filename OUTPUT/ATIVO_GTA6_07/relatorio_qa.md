# QA — ATIVO_GTA6_07 · "Jason e Lucia não estão atrás da mesma vida" (edição especial GTA VI · roteiro 07 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_07.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 2 · DESENHO À MÃO. O próximo é o 3 · Planta técnica.
**Agenda:** 26/11/2026 às 22:00 (Brasília), ajustado no Supabase depois da Action.

## Apuração (21/11/2026) — FATO OFICIAL
Conferido no material oficial da Rockstar (sinopse e perfis dos personagens):
- **Sinopse:** Jason e Lucia "sempre souberam que as cartas estão contra eles". Quando um golpe fácil (*easy score*) dá errado, eles acabam no lado mais sombrio de Leonida.
- **Jason:** quer uma vida tranquila e continua preso ao ambiente em que cresceu.
- **Lucia:** saiu da prisão e quer mudar a própria sorte.

O site da Rockstar está bloqueado neste ambiente. Por isso, o texto oficial foi conferido por fontes que o citam: [Rockstar Wiki](https://rockstargames.fandom.com/wiki/Grand_Theft_Auto_VI), [Red Bull — Lucia](https://www.redbull.com/us-en/gta-6-lucia-caminos) e [GTABoom](https://www.gtaboom.com/everything-confirmed-about-jason-and-lucia-in-gta-6-cc2c).

Não há spoilers além do material de divulgação.

## Direitos
- Sem arte e sem personagens do jogo.
- Os nomes aparecem só em texto; os desenhos a giz são originais.

## CTA
- A CTA natural do roteiro ("quem vai tomar as decisões mais perigosas: Jason ou Lucia?") virou a transição "Fora do jogo, quem quer sair do caos começa pela organização.", seguida da CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×.
- Pronúncias: "Jason" → "Djêison"; "Lucia" → "Lúcia".
- As tomadas A e B ficaram praticamente iguais. **Usei a B**: 52 s, 164 palavras/min, ASR 0,968.
- **Ponto para ouvir:** "a história deles se complica". O ASR ouviu "dele"; deve ser só elisão.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 54,3 s · −15,0 LUFS.
- `editorial_check`: 0 erros / 0 avisos.
- **Movimento:** o 1º render deu 1,20, com trecho parado de 1,9 s no gancho (o carro só começava a ser desenhado aos 1,9 s). Ajustes: o carro passou a ser desenhado desde 0 s, o drift subiu para 10 e a lousa ganhou flutuação. Ficou em **1,42**, com trecho parado máximo de 1,3 s.
- **Bug corrigido:** a corda do cabo de guerra não aparecia. Um filtro SVG aplicado numa linha perfeitamente horizontal tem caixa de altura zero e some. A corda agora é desenhada sem o filtro.
- Capa: o arco cobria o texto; foi corrigido.
- `legenda_check` ✓.

## Cenas
1. **NÃO É SÓ ROUBAR CARRO:** carro desenhado e riscado → duas cabeças → 2 PROTAGONISTAS.
2. **DUAS VIDAS, DOIS PLANOS:**
   - JASON: casa verde "vida tranquila" e uma corrente vermelha "preso ao passado".
   - LUCIA: grade que se abre, "saiu da prisão", estrelas e "mudar a sorte".
3. **UM SERVIÇO DÁ ERRADO:** setas Jason/Lucia convergem → SERVIÇO "simples" é riscado → DEU ERRADO → "quem dirige melhor?" sublinhado em vermelho → NÃO É ISSO.
4. **UMA VIDA DIFERENTE:** os dois caminham por um caminho verde enquanto setas de "tentação" saem da cidade e cortam o caminho (✕).
5. **A CIDADE PUXA DE VOLTA:** cabo de guerra entre "sair do caos" e "a cidade" → ORGANIZAÇÃO ✓.
6. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-07 --source episodes/ATIVO-GTA6-07/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-07 && bash tools/render_episode.sh ATIVO-GTA6-07
```
