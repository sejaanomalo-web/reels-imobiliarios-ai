# QA — ATIVO-D1212-10 · "Qual o valor?" (Esteira Editorial Diária · grade 12/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-12/ATIVO-D1212-10_qual_o_valor.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina de atendimento; sem estatística; personagens ilustrativos.
- O valor 'R$ 450 mil' no celular é ilustrativo (não é imóvel real).
- O vídeo não manda esconder o preço: diga o valor e faça uma pergunta.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1212-10/narration_source.wav`.
- Narração 28,7 s · 151 palavras/min · ASR 0,979 (70/72). Vídeo 31,0 s.
- **Pontos para ouvir:**
  - 'lead' e 'visualiza'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 10.65 s (alvo 11.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 1.0 × mixagem 0.944 (queda 5.6 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.02 LUFS, TP -1.95 dBTP, LRA 4.60; narração -17.28 · trilha -24.69 · efeitos -40.32 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 31.02 s (timeline 31.00 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.02 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.91 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Trilha: a T02 não fecha estrutura em 31 s; a T05 reprovou no portão (queda de 8,3); T01 e T03 deram 0,944 (queda 5,6). Diagnóstico segmento a segmento: a perda é de grafia do Whisper na mixagem ('lead'→'LID', 'para'→'pra' 2×, um 'o' engolido); nos 7 trechos a fala sai idêntica no resto. Portão liberado (ATIVO_IGNORAR_INTELIGIBILIDADE) com T01 e ducking −11 dB nos médios; evidência registrada aqui e na grade.
- Prévia: os carimbos SUMIU e SÓ COMPARAÇÃO encostavam na legenda → subidos.
- motion_check 18,1% parados, maior trecho 0,8 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O LEAD: 'OI! QUAL O VALOR?' no celular; SÓ ISSO.
2. SÓ O PREÇO — o corretor responde 'R$ 450 MIL.', VISUALIZADO; carimbo SUMIU.
3. O ERRO — a balança: SEU PREÇO × O MAIS BARATO DO BAIRRO; SÓ COMPARAÇÃO.
4. A VIRADA — O QUE SEGURA A CONVERSA: PREÇO + PERGUNTA.
5. E PERGUNTE — no celular, em verde: 'É PARA MORAR OU INVESTIR?' e 'QUANTOS QUARTOS VOCÊ PRECISA?'.
6. SÓ RESPONDE: ENCERRA / PERGUNTA: ATENDE — o cliente volta; confete.
7. Fecho — CtaCartoon com campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1212-10 --source episodes/ATIVO-D1212-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1212-10 && bash tools/render_episode.sh ATIVO-D1212-10
```
