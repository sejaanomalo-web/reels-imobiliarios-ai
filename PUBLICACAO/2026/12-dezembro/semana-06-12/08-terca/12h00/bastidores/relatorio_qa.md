# QA — ATIVO-D1208-12 · "O mito dos 7%" (Esteira Editorial Diária · grade 08/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-12_o_mito_dos_7.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Mehrabian & Wiener (1967) e Mehrabian & Ferris (1967): experimentos sobre a percepção de sentimentos e atitudes com mensagens incongruentes; a regra 7/38/55 vale só nessa condição.
- O próprio Mehrabian afirma que a fórmula não se aplica a comunicação em geral e é mal citada (fala: 'o próprio autor diz que o número é mal citado'; selo 'MEHRABIAN, 1967 · SENTIMENTOS E ATITUDES').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-12/narration_source.wav`.
- Narração 33,6 s · 155 palavras/min · ASR 0,953 (82/87). Vídeo 36,0 s.
- **Pontos para ouvir:**
  - 'sete por cento' e 'anos sessenta'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 14.0 s (alvo 13.56 s); insight → seção drop em 18.0 s (alvo 18.68 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.931 × mixagem 0.908 (queda 2.3 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.96 dBTP, LRA 3.40; narração -17.32 · trilha -23.92 · efeitos -40.73 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.97 s (timeline 35.97 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.52 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.46 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Folha de quadros revisada: barras e chamadas legíveis, cotas sem invadir a legenda, cômodos acendem na palavra.
- motion_check 17,0% parados, maior trecho 2,1 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — AS PALAVRAS VALEM SÓ 7%?: prancha com barras 7/38/55.
2. DE ONDE VEM O NÚMERO — chamada EXPERIMENTOS SOBRE SENTIMENTOS.
3. Condição — SÓ COM MENSAGEM CONTRADITÓRIA (chamada vermelha).
4. UM NÚMERO MAL CITADO — O AUTOR: MAL CITADO; PALAVRAS PESAM MUITO acende.
5. NA PROPOSTA, ESCREVA CLARO — mergulho na planta da proposta: VALOR, CONDIÇÕES, PRAZO, O QUE ESTÁ INCLUSO acendem; POR ESCRITO, SEM MAL-ENTENDIDO.
6. QUEM FECHA SÃO AS PALAVRAS CERTAS; CTA curta na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-12 --source episodes/ATIVO-D1208-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-12 && bash tools/render_episode.sh ATIVO-D1208-12
```
