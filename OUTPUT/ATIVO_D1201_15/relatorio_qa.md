# QA — ATIVO-D1201-15 · "O dono na visita" (Esteira Editorial Diária · grade 01/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-01/ATIVO-D1201-15_o_dono_na_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Observação de prática profissional, sem estatística; "cada frase vira argumento de negociação" é observação, dita como tal.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1201-15/narration_source.wav`.
- Narração 46,5 s · 147 palavras/min · ASR 0,982 (112/114). Vídeo 48,8 s.
- **Pontos para ouvir:**
  - Sem pontos críticos (ASR 0,982).

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.568 s (alvo 17.32 s); insight → seção c em 22.565 s (alvo 23.32 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.982 × mixagem 0.982 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.06 LUFS, TP -1.95 dBTP, LRA 5.00; narração -19.89 · trilha -28.44 · efeitos -39.94 LUFS; 30 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 48.81 s (timeline 48.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.08 LUFS · True peak ≤ -1 dBTP: -1.68 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 25.29 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o checklist cobria o selo do topo → descido; o carimbo ARGUMENTO encostava no selo → descido; DÁ ESPAÇO cruzava a legenda → subiu.
- Final: `sistema_visual_check --quadros` 0 erro / 12 avisos leves de luminância (planos verdes do ganho e do fecho, como nos cartoons anteriores); `motion_check` 2,82, 13,8% parados, maior trecho 0,7 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o corretor, o proprietário (O PROPRIETÁRIO VEIO JUNTO) e o comprador; 5 MINUTOS e "O DE CIMA É BARULHENTO…".
2. Conta tudo — PAGUEI POUCO… · VOU MUDAR DE CIDADE · ACEITO NEGOCIAR!
3. Memória — o quadro da família: É A CASA DELE · CADA DEFEITO · CADA LEMBRANÇA (NÃO POR MAL).
4. Virada — as frases viram fichas na mão do comprador: ARGUMENTO.
5. Papel do dono — checklist (recebe e se apresenta · mostra o que só ele sabe · depois, dá espaço); a reforma do banheiro; DÁ ESPAÇO.
6. Quem responde — PREÇO · MOTIVO · PRAZO → COM O CORRETOR.
7. Desfecho — DONO PRESENTE: OK · PAPEL COMBINADO; CtaCartoon curto.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1201-15 --source episodes/ATIVO-D1201-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1201-15 && bash tools/render_episode.sh ATIVO-D1201-15
```
