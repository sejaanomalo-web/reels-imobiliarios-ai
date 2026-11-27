# QA — ATIVO-D1211-10 · "A mensagem das 23h" (Esteira Editorial Diária · grade 11/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-10_a_mensagem_das_23h.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem estatística; personagens ilustrativos.
- O vídeo não recomenda ignorar o cliente: urgência de verdade, ligação; o resto, resposta completa de manhã com aviso curto à noite.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-10/narration_source.wav`.
- Narração 31,6 s · 150 palavras/min · ASR 0,936 (73/79). Vídeo 33,9 s.
- **Pontos para ouvir:**
  - 'onze e meia' e 'online'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 13.64 s); insight → seção climax em 22.12 s (alvo 16.68 s); resolucao → seção resolucao em None s (alvo 26.04 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.924 × mixagem 0.924 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.05 LUFS, TP -1.93 dBTP, LRA 3.60; narração -17.04 · trilha -27.88 · efeitos -40.02 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 33.94 s (timeline 33.93 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.06 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.74 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Voz gerada no reset da cota (27/11), mesmo modelo e voz Puck.
- Prévia: o carimbo ≠ SEMPRE ON-LINE aparecia só 0,7 s antes da CTA → entra em 'não é o mesmo'; NA HORA afastado do celular.
- Inteligibilidade: queda de 0,0 ponto com T02.
- motion_check 22,5% parados, maior trecho 0,7 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — DE NOITE: 23:00, o cliente pergunta no celular e o corretor responde; carimbo NA HORA.
2. NO DIA SEGUINTE — novas mensagens às 23:00 e 23:30; o corretor murcha.
3. O ERRO — VOCÊ ENSINOU / QUALQUER HORÁRIO.
4. A VIRADA — DE MANHÃ, CEDO; TUDO RESOLVIDO.
5. DO JEITO CERTO — URGENTE? LIGUE; SE NÃO: 'AMANHÃ ÀS 9 TE MANDO TUDO' em verde no celular.
6. DISPONÍVEL ≠ SEMPRE ON-LINE; confete.
7. Fecho — CtaCartoon com campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-10 --source episodes/ATIVO-D1211-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-10 && bash tools/render_episode.sh ATIVO-D1211-10
```
