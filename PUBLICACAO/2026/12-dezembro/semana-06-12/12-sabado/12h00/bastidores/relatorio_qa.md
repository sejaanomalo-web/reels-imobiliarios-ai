# QA — ATIVO-D1212-12 · "O bastão" (Esteira Editorial Diária · grade 12/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-12/ATIVO-D1212-12_o_bastao.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Rio 2016, 4×100 m masculino: Japão prata em 37,60 s, atrás da Jamaica (37,27 s) — Olympics.com, World Athletics (Spikes, jan/2017), Irish Times.
- As fontes atribuem o resultado à passagem de bastão por baixo, treinada por anos, compensando velocistas individualmente mais lentos. O vídeo NÃO diz que nenhum japonês corria abaixo de 10 s (não verificado) e não cita atletas.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1212-12/narration_source.wav`.
- Narração 29,0 s · 186 palavras/min · ASR 0,983 (89/90). Vídeo 31,3 s.
- **Pontos para ouvir:**
  - 'dois mil e dezesseis' e 'revezamento'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 13.091 s (alvo 13.24 s); insight → seção a2 em 19.637 s (alvo 19.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.967 × mixagem 0.956 (queda 1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.96 dBTP, LRA 2.70; narração -19.25 · trilha -28.24 · efeitos -38.92 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 31.34 s (timeline 31.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.45 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.87 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a cena da pista saía antes de PERDE-SE NA TROCA aparecer (menos de 1 s) e O CLIENTE SE PERDE encostava na legenda → cena da pista estendida até a virada; selo no alto.
- Folha do render 1: O QUE PEDIU ficava 0,3 s → as três pílulas ficam até o fecho; re-render.
- Inteligibilidade: queda de 1,1 ponto com T04.
- motion_check 54,8% parados (pictograma lento por design), maior trecho 1,2 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 2016 · JAPÃO / PRATA OLÍMPICA: quatro corredores em linha fina; o bastão verde passa de mão em mão; PRATA · 4×100 M · 2016.
2. SEM OS MAIS RÁPIDOS.
3. O SEGREDO, A PASSAGEM — dois corredores de perto; o bastão sobe de baixo para cima: DE BAIXO PARA CIMA / TREINADA POR ANOS.
4. SE PERDE NA TROCA — o bastão cai vermelho: PERDE-SE NA TROCA / NÃO NA RETA.
5. COM CLIENTE É IGUAL — a ficha do cliente passa entre dois corretores e cai: O CLIENTE SE PERDE.
6. PASSE JUNTO O HISTÓRICO — a ficha passa verde com O QUE VIU / O QUE RECUSOU / O QUE PEDIU.
7. BASTÃO BEM PASSADO — SEM PERDER VELOCIDADE; os dois comemoram.
8. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1212-12 --source episodes/ATIVO-D1212-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1212-12 && bash tools/render_episode.sh ATIVO-D1212-12
```
