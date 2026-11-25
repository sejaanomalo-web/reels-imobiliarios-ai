# QA — ATIVO-D1205-21 · "Anote o não" (Esteira Editorial Diária · grade 05/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-21_anote_o_nao.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Tese por raciocínio de prática profissional; sem estatística nem estudo citado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-21/narration_source.wav`.
- Narração 29,5 s · 169 palavras/min · ASR 0,988 (82/83). Vídeo 31,8 s.
- **Pontos para ouvir:**
  - 'Anote o não' (ênfase) e 'nunca soube explicar'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 11.96 s); insight → seção climax em 22.12 s (alvo 19.48 s); resolucao → seção resolucao em None s (alvo 24.2 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.94 × mixagem 0.964 (queda -2.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.04 LUFS, TP -1.96 dBTP, LRA 3.20; narração -18.66 · trilha -29.14 · efeitos -38.45 LUFS; 15 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 31.81 s (timeline 31.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.06 LUFS · True peak ≤ -1 dBTP: -1.48 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: figura movida para x=840 e pílulas para x=420 para não disputar o centro com o título; negativas (recusou, não, some) em vermelho de alerta.
- motion_check 50,8% parados (normal do pictograma noir), maior trecho 1,2 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O IMÓVEL RECUSADO ENSINA MAIS do que o que ele gostou: casa com X × casa acesa.
2. CADA NÃO TEM UM MOTIVO — ESCADA DEMAIS, SOL DA TARDE, RUA BARULHENTA; O MOTIVO SOME no meio das mensagens.
3. ANOTE O NÃO COM O MOTIVO — a nota com os três 'não' e LOGO DEPOIS DA VISITA.
4. OS MOTIVOS VIRAM O FILTRO — 3 visitas, os mesmos motivos; O FILTRO DO CLIENTE.
5. Desfecho — MAIS PERTO DO SIM: a figura acende verde.
6. CTA curta — campo SISTEMA, ícones, logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-21 --source episodes/ATIVO-D1205-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-21 && bash tools/render_episode.sh ATIVO-D1205-21
```
