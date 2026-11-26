# QA — ATIVO-D1206-12 · "Dezenove itens" (Esteira Editorial Diária · grade 06/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-12_dezenove_itens.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Haynes et al. (2009), New England Journal of Medicine, 'A Surgical Safety Checklist to Reduce Morbidity and Mortality in a Global Population': checklist de 19 itens da OMS em 8 hospitais de 8 cidades; mortes 1,5% → 0,8%; complicações 11% → 7%. Estudo antes × depois, não randomizado: a fala diz 'ajudou a reduzir' e 'depois da lista'; selo 'ANTES × DEPOIS' na tela.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-12/narration_source.wav`.
- Narração 41,5 s · 146 palavras/min · ASR 0,893 (88/101). Vídeo 43,9 s.
- **Pontos para ouvir:**
  - ASR 89% por causa da forma escrita dos números ('1,5%' × 'um e meio por cento'); transcrição conferida inteira, fala correta.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 20.0 s (alvo 20.2 s); insight → seção drop em 24.0 s (alvo 24.28 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.871 × mixagem 0.871 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.97 dBTP, LRA 3.60; narração -18.95 · trilha -25.98 · efeitos -40.73 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 43.88 s (timeline 43.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.80 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 25.61 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: números sobre o título dos cômodos e cota encostada na grade → números acima/abaixo do título, grade mais compacta.
- motion_check 13,9% parados, maior trecho 2,1 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA LISTA DE 19 ITENS: a grade de 19 cômodos se desenha; CHECKLIST DE CIRURGIA · OMS.
2. 2009: UM ESTUDO EM HOSPITAIS — cota 8 HOSPITAIS · 8 PAÍSES; os 19 itens acendem.
3. Mergulho no item 19 → DEPOIS DA LISTA: ANTES (MORTES 1,5% · COMPLICAÇÕES 11%) × DEPOIS (0,8% · 7%).
4. NÃO ERA SABER. ERA NÃO ESQUECER — chamada AS EQUIPES JÁ SABIAM.
5. Mergulho no DEPOIS → PROJETO: SEU FECHAMENTO — DOCUMENTOS, CERTIDÕES, MATRÍCULA, PRAZO, CHAVES acendem na fala; rota liga os cômodos.
6. EXPERIÊNCIA ESQUECE. LISTA PROTEGE — cota LISTA DO FECHAMENTO; CTA curta na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-12 --source episodes/ATIVO-D1206-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-12 && bash tools/render_episode.sh ATIVO-D1206-12
```
