# QA — ATIVO_L60_05 · "Lead quente não é quem manda emoji" (lote L60 · EP012 · 21/11/2026)

**Fonte:** `ROTEIROS/EP012.md` (livro, Dia 08 / EP012). Gancho, situação, tensão e insight narrados palavra por palavra.
**Esteira:** ESTILO 5 · PAINEL. O próximo é o 1 · Palitinho.
**Agenda:** 01/12/2026 às 8:00, no slot automático. O dia 1º/12 terá 2 vídeos do livro (8h e 10h) e o GTA às 22h.

## Apuração
- O roteiro é atemporal: não tem números nem dados de mercado.
- Reações e leads são ILUSTRATIVOS.
- A chama é desenhada; não é o emoji de nenhuma plataforma.
- Não aparece interface de rede social real.

## CTA
- A CTA do livro já era sobre o sistema. Foi trocada pela CTA SISTEMA padrão, sem transição.

## Voz
- Puck, 1,0×. As duas tomadas foram feitas na **chave 2**, porque a chave 1 está sem cota.
- **Usei a tomada A:** 39 s, 166 palavras/min, ASR 0,963. A transcrição por janelas confere "Curtida, emoji e elogio" e "descartar pessoas".
- Na tomada B, "emoji e elogio" saiu sem o "e".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 41,4 s · −14,9 LUFS.
- `editorial_check` 0/0. SFX: 19 eventos. `legenda_check` ✓.
- **Movimento:** 1,20 no 1º render, abaixo do mínimo de ~1,3. Aumentei o drift para 11 e a flutuação dos cartões. No render final ficou em **1,37**, com o maior trecho parado de 1,3 s.

## Cenas
1. **LEAD QUENTE?** A chama cresce e vira um termômetro de "intenção" que sobe até QUENTE? → ✕ NÃO É COMPRA AMANHÃ.
2. **SINAIS DE INTERESSE → MAS A FICHA ESTÁ VAZIA:** ✓ CURTIDA, ✓ EMOJI e ✓ ELOGIO aparecem como "interesse no conteúdo". Enquanto isso, a FICHA DO LEAD acende PRAZO —, CONDIÇÃO — e VISITA — em vermelho.
3. **PERGUNTE ANTES:** ESTÁGIO DO CONTATO, com as 3 perguntas numeradas.
4. **ACOMPANHE, NÃO DESCARTE:** trilhas AGORA / PLANEJANDO / PESQUISANDO com leads em movimento → ✓ TODOS SÃO VALIOSOS → ✕ DESCARTAR CEDO DEMAIS.
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-L60-05 --source episodes/ATIVO-L60-05/narration_source.wav && python3 tools/build_audio.py ATIVO-L60-05 && bash tools/render_episode.sh ATIVO-L60-05
```
