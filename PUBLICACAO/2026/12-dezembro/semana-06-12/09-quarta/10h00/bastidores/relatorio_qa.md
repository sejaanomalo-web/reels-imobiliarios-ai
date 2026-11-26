# QA — ATIVO-D1209-10 · "O áudio de cinco minutos" (Esteira Editorial Diária · grade 09/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-10_o_audio_de_cinco_minutos.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem dado estatístico; personagens ilustrativos.
- Nenhum aplicativo citado por nome; o celular é uma interface ilustrativa.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-10/narration_source.wav`.
- Narração 37,5 s · 152 palavras/min · ASR 0,968 (92/95). Vídeo 39,8 s.
- **Pontos para ouvir:**
  - 'cunhada' e 'tópicos'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.455 s (alvo 18.12 s); insight → seção a2 em 26.182 s (alvo 25.48 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.947 × mixagem 0.937 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.21 LUFS, TP -1.95 dBTP, LRA 3.60; narração -19.44 · trilha -28.69 · efeitos -40.49 LUFS; 21 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.81 s (timeline 39.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.23 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.65 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Trilha trocada de T05 para T04: a mixagem com T05 reprovou no portão de inteligibilidade (queda de 4,2 pontos); com T04 a queda foi de 1,0 ponto.
- Prévia: celular do gancho pequeno e encostando no selo; etiqueta NO MINUTO 4 só 0,4 s na tela → celular maior e mais baixo, plano do gancho estendido até a palavra 'quartos'.
- motion_check 17,1% parados, maior trecho 0,6 s; sistema_visual_check --quadros 0 erro, 1 aviso (quadro do fecho verde, luminância 47).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O ÁUDIO: o celular com a mensagem de 5:00; 5 MINUTOS; o trecho do minuto 4 acende (NO MINUTO 4).
2. O QUE IMPORTAVA — 3 QUARTOS, PERTO DA ESCOLA, TETO DE PREÇO (verde) perdidos entre A REFORMA DA CUNHADA e O TRÂNSITO.
3. ÁUDIO COM ÁUDIO — o corretor responde com outro áudio (3:40): SE PERDE DE NOVO.
4. A VIRADA — OUÇA INTEIRO, DEVOLVA POR ESCRITO; o checklist ENTENDI ASSIM: e o carimbo ESTÁ CERTO?
5. NA HORA — o cliente corrige ('QUASE: FALTOU A GARAGEM!'); carimbo FICHA PRONTA.
6. ÁUDIO É CONVERSA → POR ESCRITO É COMBINADO; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-10 --source episodes/ATIVO-D1209-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-10 && bash tools/render_episode.sh ATIVO-D1209-10
```
