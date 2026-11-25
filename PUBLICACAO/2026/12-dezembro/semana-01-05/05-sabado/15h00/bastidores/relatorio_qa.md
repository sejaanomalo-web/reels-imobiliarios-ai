# QA — ATIVO-D1205-15 · "Vou pensar" (Esteira Editorial Diária · grade 05/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-15_vou_pensar.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional de atendimento; sem estatística nem estudo citado (nenhum número na tela).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-15/narration_source.wav`.
- Narração 37,3 s · 155 palavras/min · ASR 0,990 (95/96). Vídeo 39,6 s.
- **Pontos para ouvir:**
  - Entonação de 'pensar em quê, exatamente?' (pergunta calma, não cobrança).

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 10.909 s (alvo 11.08 s); insight → seção a2 em 17.455 s (alvo 16.44 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.958 × mixagem 0.958 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.97 dBTP, LRA 4.60; narração -17.39 · trilha -26.21 · efeitos -40.16 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.62 s (timeline 39.60 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.77 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 21.48 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: balões desciam sobre a legenda → subiram para y=820; negativas (vou pensar, aguardo, morre, silêncio) em vermelho.
- motion_check 16,2% parados, maior trecho 0,7 s; sistema_visual_check --quadros: 1 aviso de luminância no fecho verde (padrão do cartoon), 0 erro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — NA VISITA: o cliente gostou do imóvel (selo GOSTOU DO IMÓVEL) e diz VOU PENSAR…
2. A RESPOSTA DE SEMPRE — FICO NO AGUARDO!; carimbo A CONVERSA MORRE (clima vermelho).
3. MUITAS VEZES… NÃO É SOBRE TEMPO, É UMA DÚVIDA que ele ainda não falou.
4. PERGUNTE COM CALMA — PENSAR EM QUÊ?; etiquetas VALOR · BAIRRO · ALGUÉM.
5. AGORA DÁ PARA RESOLVER — sem desculpa inventada; quem pergunta ganha uma CONVERSA, quem só aguarda corre o risco do SILÊNCIO.
6. CTA curta — campo SISTEMA, ícones, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-15 --source episodes/ATIVO-D1205-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-15 && bash tools/render_episode.sh ATIVO-D1205-15
```
