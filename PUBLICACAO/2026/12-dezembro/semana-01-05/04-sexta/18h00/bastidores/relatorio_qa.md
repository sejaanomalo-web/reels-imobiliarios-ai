# QA — ATIVO-D1204-18 · "O letreiro era um anúncio" (Esteira Editorial Diária · grade 04/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-18_o_letreiro_era_um_anuncio.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Letreiro de 1923, anúncio provisório do loteamento Hollywoodland; em 1949 as letras LAND foram retiradas (LA Conservancy, History.com, Snopes). O desenho do letreiro é marca registrada: na tela só letras genéricas (13 blocos) e a palavra LAND numa chamada; o motivo de 1949 (versões divergentes) não é citado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-18/narration_source.wav`.
- Narração 38,8 s · 163 palavras/min · ASR 0,957 (101/105). Vídeo 41,1 s.
- **Pontos para ouvir:**
  - Ritmo 163 palavras/min; 'LAND' (pronúncia 'lénd'), 'Hollywood', '1923' e '1949'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 18.04 s); insight → seção climax em 23.89 s (alvo 27.4 s); resolucao → seção resolucao em None s (alvo 32.2 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.99 × mixagem 0.99 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.96 dBTP, LRA 3.50; narração -18.04 · trilha -29.44 · efeitos -40.53 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 41.11 s (timeline 41.10 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.54 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 22.15 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Roteiro auditado com o complemento script-creator (3 ganchos; o escolhido passou no teste dos 4 erros).
- Prévia: a chamada SAI: LAND ficava sobre as letras → descida para a direita.
- sistema_visual_check --quadros: 0 erro, 0 aviso; motion_check 14,1% parados, maior trecho 2,0 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — elevação das colinas com letras genéricas; O LETREIRO ERA UM ANÚNCIO.
2. 1923: UM LOTEAMENTO — LETRAS GIGANTES; PROVISÓRIO.
3. Mergulho: NÃO ANUNCIAVA A CASA → ANUNCIAVA O LUGAR (COLINAS · VISTA · JEITO DE MORAR).
4. 1949: SAI O LAND — as 4 últimas letras somem; NOME DO BAIRRO; SÍMBOLO DA CIDADE.
5. Mergulho na planta: QUEM COMPRA, COMPRA O LUGAR — A RUA · A PADARIA · O CAMINHO DE VOLTA.
6. Desfecho — MOSTRE O LUGAR, NÃO SÓ A PLANTA.
7. CTA curta — PROJETO: SEU SISTEMA, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-18 --source episodes/ATIVO-D1204-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-18 && bash tools/render_episode.sh ATIVO-D1204-18
```
