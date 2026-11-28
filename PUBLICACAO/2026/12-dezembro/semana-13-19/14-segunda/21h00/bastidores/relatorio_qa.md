# QA — ATIVO-D1214-21 · "A certidão vencida" (Esteira Editorial Diária · grade 14/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-14/ATIVO-D1214-21_a_certidao_vencida.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 7.433/1985 e Decreto 93.240/1986: para lavrar a escritura, as certidões do registro de imóveis (ônus reais; ações reais e pessoais reipersecutórias) valem 30 dias (IRIB, Conjur, TJDFT).
- As demais certidões têm prazos próprios, que variam por órgão e cidade: o vídeo não lista números para elas.
- Situação de rotina; personagens ilustrativos.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1214-21/narration_source.wav`.
- Narração 31,8 s · 161 palavras/min · ASR 0,970 (82/85). Vídeo 34,1 s.
- **Pontos para ouvir:**
  - 'registro de imóveis' e 'emissão' (o Whisper ouviu 'peças de prazo' em 'peça as de prazo'; na fala está correto).

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.455 s (alvo 19.32 s); insight → seção a2 em 21.818 s (alvo 20.6 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.906 × mixagem 0.918 (queda -1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.20 LUFS, TP -1.95 dBTP, LRA 3.20; narração -19.22 · trilha -28.06 · efeitos -38.82 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.11 s (timeline 34.10 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.23 LUFS · True peak ≤ -1 dBTP: -1.73 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.28 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: a certidão de prazo curto encostava no calendário e a pílula dela cruzava ESCRITURA → posições ajustadas.
- Ressalva menor: a pílula PRAZO CURTO: POR ÚLTIMO fica ~0,8 s; o movimento do documento até a escritura carrega a ideia.
- Inteligibilidade: queda de −1,2 ponto com T04.
- motion_check 48,8% parados (noir lento), maior trecho 1,3 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — ESCRITURA MARCADA: o cartório e as três pessoas sentadas; TODO MUNDO NO CARTÓRIO.
2. E A CERTIDÃO VENCEU — o documento fica vermelho: A CERTIDÃO VENCEU ONTEM / ASSINATURA ADIADA / SEM O IMÓVEL.
3. CADA CERTIDÃO, UM PRAZO — três certidões com barras: REGISTRO: 30 DIAS / AS OUTRAS: PRAZOS DIFERENTES.
4. NÃO VENCEM JUNTAS — a linha do tempo até a ESCRITURA.
5. ANOTE A EMISSÃO — DATA DE EMISSÃO EM CADA UMA; a de prazo curto desliza para perto da escritura.
6. ESCRITURA NO DIA — tudo acende: DOCUMENTO EM DIA.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1214-21 --source episodes/ATIVO-D1214-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1214-21 && bash tools/render_episode.sh ATIVO-D1214-21
```
