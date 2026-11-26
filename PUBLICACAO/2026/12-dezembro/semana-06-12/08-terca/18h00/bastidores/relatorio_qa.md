# QA — ATIVO-D1208-18 · "A torre provisória" (Esteira Editorial Diária · grade 08/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-18_a_torre_provisoria.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Site oficial da Torre Eiffel e History.com: construída para a Exposição Universal de 1889, com autorização de 20 anos (até o fim de 1909); depois poderia ser desmontada.
- Eiffel ofereceu a torre para experimentos científicos; a radiotelegrafia militar (antena) ajudou a salvá-la; concessão renovada em 1910 (selo 'SITE OFICIAL DA TORRE EIFFEL · HISTORY.COM').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-18/narration_source.wav`.
- Narração 37,5 s · 146 palavras/min · ASR 0,951 (87/91). Vídeo 39,9 s.
- **Pontos para ouvir:**
  - 'mil oitocentos e oitenta e nove' e 'mil novecentos e nove'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 15.5 s (alvo 15.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.956 × mixagem 0.967 (queda -1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.05 LUFS, TP -1.93 dBTP, LRA 2.90; narração -18.87 · trilha -26.25 · efeitos -40.74 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.87 s (timeline 39.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.06 LUFS · True peak ≤ -1 dBTP: -1.82 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 21.25 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: chamadas e a cota 1889 → 1909 reposicionadas para não encostar na legenda.
- motion_check 15,8% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — FEITA PARA DURAR 20 ANOS: a elevação da torre se desenha; cota 20 ANOS.
2. AUTORIZAÇÃO ATÉ 1909 — cota 1889 → 1909; a torre vira tracejado vermelho: PODIA SER DESMONTADA.
3. MUITA GENTE NÃO GOSTAVA — chamada FEIA E INÚTIL.
4. SALVA POR UM NOVO USO — a antena acende no topo com ondas; NOVO USO: ANTENA DE RÁDIO.
5. MOSTRE OS USOS — mergulho na planta do imóvel do cliente: QUARTO EXTRA → ESCRITÓRIO, EDÍCULA → RENDA.
6. NÃO É REFORMA. É UM NOVO USO; CTA curta na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-18 --source episodes/ATIVO-D1208-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-18 && bash tools/render_episode.sh ATIVO-D1208-18
```
