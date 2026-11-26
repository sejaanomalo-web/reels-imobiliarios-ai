# QA — ATIVO-D1208-21 · "A janela" (Esteira Editorial Diária · grade 08/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-21_a_janela.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Ulrich (1984), Science, 'View through a window may influence recovery from surgery': 46 pacientes (23 × 23) de um hospital na Pensilvânia; vista para árvores 7,96 dias de internação × 8,70 com vista para parede de tijolos.
- Estudo observacional de um hospital: a fala diz 'em média, quase um dia antes' e não promete efeito; selo 'ULRICH · SCIENCE · 1984 · 46 PACIENTES'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-21/narration_source.wav`.
- Narração 33,3 s · 151 palavras/min · ASR 0,970 (82/84). Vídeo 35,6 s.
- **Pontos para ouvir:**
  - 'mil novecentos e oitenta e quatro' e 'tijolos'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.08 s); insight → seção climax em 23.89 s (alvo 20.76 s); resolucao → seção resolucao em None s (alvo 26.28 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.964 × mixagem 0.94 (queda 2.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.00 LUFS, TP -1.96 dBTP, LRA 3.30; narração -17.77 · trilha -29.03 · efeitos -38.60 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.65 s (timeline 35.63 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.02 LUFS · True peak ≤ -1 dBTP: -1.59 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.52 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: as cortinas do 1º ato estavam fechadas por padrão (tijolos e árvores invisíveis) e o selo da fonte encostava no título → cortinas abertas no 1º ato, selo sai antes do título grande, câmera com menos deslocamento lateral.
- motion_check 56,6% parados (pictograma lento por design), maior trecho 1,2 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA JANELA E A INTERNAÇÃO: janela em linha fina e o leito.
2. QUARTOS IGUAIS, VISTAS DIFERENTES — dois quartos: PAREDE DE TIJOLOS × ÁRVORES.
3. EM MÉDIA, ALTA ANTES — a janela das árvores e o paciente acendem: ALTA QUASE 1 DIA ANTES.
4. NA VISITA, PELA JANELA… — NÃO PASSE CORRENDO.
5. PARE. DEIXE OLHAR — a cortina corre na palavra 'cortina' e a vista acende; ABRA A CORTINA.
6. A VISTA MORA COM ELE — NÃO ESTÁ NA PLANTA; CtaNoir.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-21 --source episodes/ATIVO-D1208-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-21 && bash tools/render_episode.sh ATIVO-D1208-21
```
