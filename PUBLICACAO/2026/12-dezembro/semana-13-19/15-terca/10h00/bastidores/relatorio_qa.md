# QA — ATIVO-D1215-10 · "A criança na visita" (Esteira Editorial Diária · grade 15/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-10_a_crianca_na_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem estatística; personagens ilustrativos.
- A legenda diz que o desenho é feito com os pais por perto.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-10/narration_source.wav`.
- Narração 27,4 s · 173 palavras/min · ASR 1,000 (79/79). Vídeo 29,8 s.
- **Pontos para ouvir:**
  - 'criança' e 'lápis'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 12.65 s (alvo 12.6 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.949 × mixagem 0.949 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.93 LUFS, TP -1.97 dBTP, LRA 3.10; narração -17.63 · trilha -25.11 · efeitos -40.42 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 29.78 s (timeline 29.77 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -14.95 LUFS · True peak ≤ -1 dBTP: -1.83 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.0 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o carimbo UMA TAREFA PARA A CRIANÇA cortava nas bordas → etiqueta + carimbo curto; DESENHE O SEU QUARTO cobria a legenda → subiu para cima da folha.
- Inteligibilidade: queda de 0,0 ponto com T01.
- motion_check 12,8% parados, maior trecho 0,7 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A VISITA IA BEM…: os pais e a criança; CORRENDO!.
2. OS PAIS — o pai corre atrás do filho: CUIDANDO DO FILHO / E O IMÓVEL?.
3. NA SAÍDA — A COZINHA? / O QUARTO?.
4. A VIRADA — A CRIANÇA TAMBÉM PRECISA DE / UMA TAREFA.
5. NA PASTA — PAPEL E LÁPIS; a folha recebe o desenho do quarto (cama, janela, estrela verde): DESENHE O SEU QUARTO.
6. CRIANÇA OCUPADA, PAIS ATENTOS / O QUARTO JÁ TEM DONO — confete.
7. Fecho — CtaCartoon curto, campo SISTEMA, módulos e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-10 --source episodes/ATIVO-D1215-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-10 && bash tools/render_episode.sh ATIVO-D1215-10
```
