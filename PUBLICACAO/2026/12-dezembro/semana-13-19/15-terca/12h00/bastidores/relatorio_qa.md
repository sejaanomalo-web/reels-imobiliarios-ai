# QA — ATIVO-D1215-12 · "O que já vem marcado" (Esteira Editorial Diária · grade 15/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-12_o_que_ja_vem_marcado.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Johnson & Goldstein (2003), Science 302:1338–1339, e (2004) Transplantation: no experimento online, 42% consentiram à doação quando era preciso marcar (opt-in), 82% quando era preciso desmarcar (opt-out), 79% na escolha neutra.
- O vídeo cita 42% e 82%; o cadastro pré-preenchido é para o proprietário conferir e corrigir (o dado continua sendo dele).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-12/narration_source.wav`.
- Narração 32,8 s · 181 palavras/min · ASR 0,926 (88/99). Vídeo 35,2 s.
- **Pontos para ouvir:**
  - 'quarenta e dois por cento' e 'oitenta e dois por cento' (o Whisper grafa '42%'/'82%'; alinhamento 88/99 só por isso).

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 16.54 s (alvo 17.16 s); insight → seção drop em 20.54 s (alvo 19.72 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.879 × mixagem 0.879 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.21 LUFS, TP -1.95 dBTP, LRA 2.00; narração -18.79 · trilha -25.52 · efeitos -40.84 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.18 s (timeline 35.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.23 LUFS · True peak ≤ -1 dBTP: -1.54 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 18.84 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1 aprovada sem ajuste.
- Inteligibilidade: queda de 0,0 ponto com T03.
- motion_check 15,7% parados, maior trecho 2,1 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — QUASE O DOBRO DE SIM: dois formulários como cômodos (MARCAR × DESMARCAR); a caixinha da direita se marca em 'marcado'; selo JOHNSON & GOLDSTEIN · SCIENCE, 2003.
2. PRECISAVA MARCAR — a barra sobe: 42% ACEITARAM.
3. JÁ VINHA MARCADO — a barra verde sobe: 82% FICARAM.
4. O QUE VEM PRONTO — o formulário marcado acende; mergulho.
5. MANDE PREENCHIDO — o cadastro do imóvel: ENDEREÇO ✓ / METRAGEM ✓ / VAGAS ✓; PROPRIETÁRIO: CONFERIR E CORRIGIR.
6. FORMULÁRIO PRONTO VOLTA — EM BRANCO: FICA PARA DEPOIS → PRONTO: VOLTA.
7. Fecho — módulos do sistema na prancha, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-12 --source episodes/ATIVO-D1215-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-12 && bash tools/render_episode.sh ATIVO-D1215-12
```
