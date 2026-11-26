# QA — ATIVO-D1208-10 · "O pai engenheiro" (Esteira Editorial Diária · grade 08/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-10_o_pai_engenheiro.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem dado estatístico; personagens ilustrativos.
- Nenhuma afirmação técnica sobre a rachadura: o vídeo não diz que é normal nem grave (a fala do corretor 'ISSO É NORMAL!' aparece como o erro a evitar).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-10/narration_source.wav`.
- Narração 29,9 s · 171 palavras/min · ASR 0,988 (84/85). Vídeo 32,2 s.
- **Pontos para ouvir:**
  - 'engenheiro' e 'rachadura'.

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 12.571 s (alvo 13.08 s); insight → seção c em 17.568 s (alvo 15.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.988 × mixagem 0.965 (queda 2.3 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.23 LUFS, TP -1.96 dBTP, LRA 4.10; narração -18.91 · trilha -27.45 · efeitos -39.55 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.23 s (timeline 32.23 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.25 LUFS · True peak ≤ -1 dBTP: -1.68 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.77 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- 1º render: o carimbo VEIO PROTEGER O FILHO e a etiqueta PAI ENGENHEIRO apareciam tarde demais (fora da palavra) → antecipados para a palavra; re-render.
- motion_check 15,0% parados, maior trecho 0,7 s; sistema_visual_check --quadros 0 erro, 1 aviso (quadro do fecho verde com luminância 46, limite 45 — aceito, fundo de raios do modelo cartoon).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — NA VISITA: cliente chega com o pai; etiqueta PAI ENGENHEIRO.
2. A INSPEÇÃO — parede, teto e RACHADURA aparecem na palavra.
3. SE VOCÊ DEFENDE CADA PONTO… — balões 'ISSO É NORMAL!' × 'NÃO É!'; carimbos VIRA DISPUTA e E ELE GANHA.
4. A VIRADA — NÃO VEIO ATRAPALHAR; carimbo VEIO PROTEGER O FILHO.
5. CHAME PARA PERTO — checklist PARA O ENGENHEIRO: planta, laudo, idade do prédio; balão 'O QUE O SENHOR OLHARIA PRIMEIRO?'.
6. VINHA PARA BARRAR → AJUDA A DECIDIR (o pai levanta a mão); CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-10 --source episodes/ATIVO-D1208-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-10 && bash tools/render_episode.sh ATIVO-D1208-10
```
