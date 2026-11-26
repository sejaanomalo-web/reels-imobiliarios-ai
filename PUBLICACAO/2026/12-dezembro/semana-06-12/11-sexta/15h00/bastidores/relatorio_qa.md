# QA — ATIVO-D1211-15 · "A regra dos dois minutos" (Esteira Editorial Diária · grade 11/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-15_a_regra_dos_dois_minutos.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- David Allen, 'Getting Things Done' (2001): regra dos dois minutos — se uma ação leva menos de dois minutos, faça no momento em que ela aparece. A fala cita 'um consultor americano'; o nome e o ano aparecem só no selo da fonte.
- 'Anotar para depois custa mais do que resolver' é a justificativa da própria regra (o custo de registrar e retomar supera o de fazer); o vídeo não cita estudo de tempo nem percentual.
- Exemplos (confirmar visita, mandar localização, responder disponibilidade) são situações de rotina, ilustrativas.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-15/narration_source.wav`.
- Narração 31,3 s · 150 palavras/min · ASR 1,000 (78/78). Vídeo 33,6 s.
- **Pontos para ouvir:**
  - 'consultor americano' e 'localização'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 13.091 s (alvo 13.24 s); insight → seção a2 em 21.818 s (alvo 22.2 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.974 × mixagem 0.949 (queda 2.5 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.95 dBTP, LRA 3.20; narração -19.69 · trilha -28.58 · efeitos -38.96 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 33.64 s (timeline 33.63 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.58 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.64 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o balão CONFIRMAR A VISITA encostava no título → os três balões descem 90 px e entram mais ao centro; CABE EM 2 MIN desce junto.
- motion_check 52,2% parados (pictograma lento por design), maior trecho 1,4 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — QUANTAS FICARAM PARA DEPOIS?: a pilha de balões cinza cresce ao lado do boneco; PARA DEPOIS.
2. MENOS DE 2 MIN? FAÇA AGORA — o relógio gira; selo REGRA DOS 2 MINUTOS · DAVID ALLEN, 2001.
3. ANOTAR CUSTA MAIS — a lista (documento) fica vermelha: ANOTAR PARA DEPOIS / CUSTA MAIS.
4. TUDO CABE EM DOIS MINUTOS — três balões (CONFIRMAR A VISITA, MANDAR A LOCALIZAÇÃO, AINDA ESTÁ DISPONÍVEL?) ganham check e acendem; CABE EM 2 MIN.
5. O RESTO VAI PARA A AGENDA — MAIS DE 2 MIN; a agenda da semana recebe dois blocos 10H e 15H: COM DIA E HORA.
6. LISTA CURTA, CLIENTE RESPONDIDO — o cliente comemora com o check.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-15 --source episodes/ATIVO-D1211-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-15 && bash tools/render_episode.sh ATIVO-D1211-15
```
