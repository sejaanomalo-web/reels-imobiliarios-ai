# QA — ATIVO-D1213-12 · "A cabine estéril" (Esteira Editorial Diária · grade 13/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-13/ATIVO-D1213-12_a_cabine_esteril.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- FAA, 14 CFR 121.542 ('sterile cockpit rule', publicada em 19/01/1981, 46 FR 5502): durante fases críticas — taxi, decolagem, pouso e operações abaixo de 10.000 pés, exceto cruzeiro — a tripulação não pode realizar atividades não essenciais à segurança do voo (eCFR, Cornell LII, SKYbrary).
- O vídeo diz '10 mil pés' sem converter em metros e não cita acidentes nem números de ocorrências.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1213-12/narration_source.wav`.
- Narração 31,5 s · 160 palavras/min · ASR 0,958 (80/84). Vídeo 33,8 s.
- **Pontos para ouvir:**
  - 'mil novecentos e oitenta e um' e 'dez mil pés'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 13.091 s (alvo 15.88 s); insight → seção a2 em 17.454 s (alvo 17.0 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.952 × mixagem 0.964 (queda -1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.17 LUFS, TP -1.96 dBTP, LRA 2.50; narração -19.12 · trilha -28.37 · efeitos -38.82 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 33.84 s (timeline 33.83 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.59 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.71 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: os selos SÓ O VOO, REGRA DE 1981 e DISTRAÇÃO CUSTA MAIS batiam na legenda → subidos para baixo da janela da cabine.
- Inteligibilidade: melhora de 1,2 ponto com T04 (queda negativa).
- motion_check 56,4% parados (pictograma lento por design), maior trecho 1,4 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — NA CABINE, SÓ O VOO: a cabine em linha fina com dois pilotos; os balões de conversa são cortados (X vermelho); SÓ O VOO.
2. ABAIXO DE 10 MIL PÉS, SÓ O ESSENCIAL — REGRA DE 1981 · FAA; o altímetro desce até a marca 10.000 PÉS; os pilotos acendem.
3. ONDE A DISTRAÇÃO CUSTA MAIS — o relógio; DISTRAÇÃO CUSTA MAIS.
4. A VENDA TEM FASE CRÍTICA — VISITA DECISIVA, PROPOSTA, ASSINATURA acendem em verde.
5. SÓ O ASSUNTO DO CLIENTE — CELULAR NO SILENCIOSO.
6. NOS MINUTOS QUE DECIDEM, SÓ O ESSENCIAL — corretor e cliente em verde.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1213-12 --source episodes/ATIVO-D1213-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1213-12 && bash tools/render_episode.sh ATIVO-D1213-12
```
