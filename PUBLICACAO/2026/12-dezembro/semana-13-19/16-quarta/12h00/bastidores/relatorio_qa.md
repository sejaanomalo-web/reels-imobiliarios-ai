# QA — ATIVO-D1216-12 · "Apontar e falar" (Esteira Editorial Diária · grade 16/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-16/ATIVO-D1216-12_apontar_e_falar.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Railway Technical Research Institute (Japão, 1994): numa tarefa simples, apontar e falar reduziu os erros de 2,38 para 0,38 por 100 ações (≈85%); só apontar ou só falar teve efeito menor (Japan Times, Nippon.com, IEEE EMBS Pulse).
- Estudo primário não localizado; a fala diz 'cerca de' e a legenda diz 'numa tarefa simples'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1216-12/narration_source.wav`.
- Narração 32,4 s · 171 palavras/min · ASR 0,956 (86/92). Vídeo 34,7 s.
- **Pontos para ouvir:**
  - 'maquinistas' e 'oitenta e cinco por cento'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 16.54 s (alvo 17.48 s); insight → seção drop em 20.54 s (alvo 19.8 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.935 × mixagem 0.935 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.19 LUFS, TP -1.94 dBTP, LRA 2.30; narração -19.23 · trilha -25.80 · efeitos -40.86 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.71 s (timeline 34.70 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.21 LUFS · True peak ≤ -1 dBTP: -1.72 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.57 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: as pilhas de erros ficavam na borda direita → movidas para o centro.
- Inteligibilidade: queda de 0,0 ponto com T03.
- motion_check 51,4% parados (plano-sequência lento), maior trecho 2,0 s; aviso de luminância em 1 quadro (plataforma clara sob o holofote).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — APONTAR E FALAR: a plataforma, o trem; o maquinista APONTA e um arco de pontos vai até o sinal, que acende: E FALA EM VOZ ALTA.
2. CERCA DE 85% MENOS ERROS — duas pilhas: SÓ OLHANDO (alta) × APONTANDO E FALANDO: −85% (um bloco).
3. A ATENÇÃO PARA EM CADA ITEM — o gesto de novo, o sinal acende.
4. EM SILÊNCIO, PASSA — clima de tensão; o sinal apaga.
5. APONTE E FALE — a câmera anda até a mesa da entrega: CHAVE / CERTIDÃO / CONTROLE acendem quando o corretor aponta.
6. NADA FICA PARA TRÁS — tudo acende.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1216-12 --source episodes/ATIVO-D1216-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1216-12 && bash tools/render_episode.sh ATIVO-D1216-12
```
