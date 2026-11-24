# QA — ATIVO-D1202-18 · "A casa que nunca terminou" (Esteira Editorial Diária · grade 02/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-18_a_casa_que_nunca_terminou.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Winchester Mystery House (San José, Califórnia): casa de fazenda de 8 cômodos comprada por Sarah Winchester em 1886; reformas até a morte dela (set/1922) — "36 anos" (History Hit, Wikipedia); a lenda de "38 anos, 24 horas por dia" é contestada e não entra.
- Sem arquiteto; esboços à mão; o que não funcionava era fechado ou derrubado (Amusing Planet, The History Girl, 99% Invisible). 160 cômodos (Wikipedia, NPS). Escada que sobe até o teto e porta no 2º andar que abre para o vazio (The History Girl, Mental Floss).
- Depois da morte: avaliadores consideraram a casa quase sem valor (terremoto, obra inacabada, impraticável); leilão em dez/1922; aberta ao público em 1923 (Wikipedia, timeline oficial). A lenda dos espíritos não entra. Aplicação ao corretor é interpretação nossa.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-18/narration_source.wav`.
- Narração 58,5 s · 152 palavras/min · ASR 0,939 (139/148). Vídeo 60,9 s.
- **Pontos para ouvir:**
  - Números por extenso (trinta e seis, mil oitocentos e oitenta e seis, cento e sessenta, mil novecentos e vinte e dois); "Winchester"; o reconhecedor marcou "arquiteto" e "gastou" — conferir.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 33.32 s); insight → seção climax em 34.97 s (alvo 43.72 s); resolucao → seção resolucao em 48.69 s (alvo 51.88 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.986 × mixagem 0.986 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.99 LUFS, TP -1.92 dBTP, LRA 2.40; narração -18.76 · trilha -29.63 · efeitos -40.78 LUFS; 25 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 60.88 s (timeline 60.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.02 LUFS · True peak ≤ -1 dBTP: -1.59 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 35.3 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a legenda destacava "quase sem valor" e "não valia nada" em verde → sem destaque nesses trechos; a escada não chegava ao teto → 8 degraus maiores; cota e chamadas sobre o rótulo do topo → reposicionadas.
- Render 1 barrado pelo editorial_check (planta técnica exige mergulho, não crossfade) → mergulho da planta num cômodo (detalhes) e do bloco central (casa que faz sentido).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 36 ANOS DE OBRA: a planta cheia de cômodos e o carimbo QUASE SEM VALOR (promessa).
2. Sarah Winchester — CALIFÓRNIA · 1886: os 8 cômodos originais (cota 8 CÔMODOS).
3. Nunca parou de reformar — os cômodos brotam em volta sem ordem; SEM ARQUITETO · ESBOÇO À MÃO; um é fechado (X), outro derrubado; 160 CÔMODOS.
4. Mergulho num cômodo → DETALHE A: a escada que sobe até o teto; DETALHE B: a porta do 2º andar que abre para o VAZIO.
5. Avaliação · 1922 — OBRA INACABADA, TERREMOTO, QUASE SEM VALOR, LEILÃO · 12/1922, ATRAÇÃO TURÍSTICA.
6. Mergulho no bloco central → CASA QUE FAZ SENTIDO: sala, cozinha, quartos e banho com a rota verde; DINHEIRO NA OBRA ≠ VALOR.
7. Desfecho — REFORMA (quanto gastou → O QUE RESOLVEU?), chamada PERGUNTE.
8. CTA curta — PROJETO: SEU SISTEMA, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-18 --source episodes/ATIVO-D1202-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-18 && bash tools/render_episode.sh ATIVO-D1202-18
```
