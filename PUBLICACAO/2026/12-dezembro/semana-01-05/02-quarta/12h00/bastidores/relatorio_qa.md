# QA — ATIVO-D1202-12 · "O cheiro da visita" (Esteira Editorial Diária · grade 02/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-12_o_cheiro_da_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Herrmann, Zidansek, Sprott e Spangenberg, "The Power of Simplicity", Journal of Retailing (divulgado pela WSU em nov/2012): loja de decoração em St. Gallen (Suíça), 400+ clientes, 18 dias úteis; aroma simples (laranja) × complexo (laranja, manjericão, chá verde); gasto ~20% maior com o simples (ScienceDaily, EurekAlert).
- 1 estudo, numa loja — dito na fala ("foi um estudo só") e no selo 1 ESTUDO; a aplicação à visita é recomendação, sem prometer venda.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-12/narration_source.wav`.
- Narração 48,1 s · 156 palavras/min · ASR 0,988 (124/125). Vídeo 50,5 s.
- **Pontos para ouvir:**
  - "manjericão" e "20%" (lido "vinte por cento").

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): descoberta → seção quebra em 14.54 s (alvo 17.4 s); insight → seção drop em 42.54 s (alvo 42.44 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.992 × mixagem 0.992 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.01 LUFS, TP -1.95 dBTP, LRA 2.90; narração -18.34 · trilha -25.16 · efeitos -41.25 LUFS; 21 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 50.48 s (timeline 50.47 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.03 LUFS · True peak ≤ -1 dBTP: -1.61 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 14.93 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: placas e o telhado da casa invadiam o cabeçalho → câmera mais alta e afastada, placas mais baixas; o cliente do gancho escondia o difusor → deslocado; o boneco da direita era cortado → câmera mais aberta; a casa inteira acendia em verde (verde demais) → só o cone verde.
- Render 1: 54% de quadros parados → a câmera passou a andar até o difusor/cheiro citado em cada frase (plano-sequência).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a loja de decoração: o difusor e o arco de pontos do cheiro até o cliente (O CHEIRO DA LOJA).
2. O teste — dois difusores: SIMPLES · LARANJA (1 fio) × COMPLEXO · 3 AROMAS (3 fios embolados); SUÍÇA · LOJA DE DECORAÇÃO; a câmera vai de um ao outro na fala.
3. O resultado — sacolas brotam do lado simples: +20% · 1 ESTUDO; O SIMPLES PEDE MENOS ESFORÇO.
4. Na sua visita — a câmera anda até a casa: PERFUME, AROMATIZADOR e ALMOÇO embolam no ar; DISPUTA A ATENÇÃO.
5. Antes da visita — JANELAS ABERTAS · SEM MISTURA: os fios somem, o holofote acende sobre a casa.
6. Desfecho — O CHEIRO QUE NINGUÉM COMENTA: luz verde na casa, LIMPO E SIMPLES.
7. CTA curta — módulos do sistema, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-12 --source episodes/ATIVO-D1202-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-12 && bash tools/render_episode.sh ATIVO-D1202-12
```
