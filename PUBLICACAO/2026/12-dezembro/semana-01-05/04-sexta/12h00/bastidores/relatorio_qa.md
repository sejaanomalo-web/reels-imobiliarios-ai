# QA — ATIVO-D1204-12 · "A toalha do hotel" (Esteira Editorial Diária · grade 04/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-12_a_toalha_do_hotel.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Goldstein, Cialdini & Griskevicius (2008), Journal of Consumer Research 35(3): cartão padrão ~35% de reuso × 'a maioria dos hóspedes reutiliza' ~44% (Phys.org/ScienceDaily); o cartão do mesmo quarto foi o mais eficaz (número não citado: fontes divergem). Na tela: FONTES GOLDSTEIN, CIALDINI & GRISKEVICIUS (2008); ≈ 35% e ≈ 44%.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-12/narration_source.wav`.
- Narração 36,8 s · 147 palavras/min · ASR 0,978 (87/90). Vídeo 39,1 s.
- **Pontos para ouvir:**
  - Ritmo 147 palavras/min; "35%" e "44%" por extenso.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 19.04 s (alvo 19.8 s); insight → seção drop em 23.04 s (alvo 23.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.978 × mixagem 0.989 (queda -1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.09 LUFS, TP -1.94 dBTP, LRA 3.00; narração -19.50 · trilha -26.26 · efeitos -40.74 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.15 s (timeline 39.13 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.12 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.65 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: escala errada (hotel e reservatórios invadiam o cabeçalho e saíam do quadro) → objetos menores e câmera mais afastada; rótulos dos reservatórios se sobrepunham → descidos para a base e encurtados.
- Render 1: virada cortava o 1º e o 3º reservatórios e o fecho estava apertado → câmera mais aberta; render 2: 35,6% de quadros parados, maior trecho 2,0 s; deriva contínua de câmera desde o início.
- sistema_visual_check --quadros: 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o hotel em miniatura e o cartão da toalha: UMA FRASE NO CARTÃO.
2. O teste — reservatório COMUM enche até ≈ 35%; A MAIORIA enche até ≈ 44% e acende.
3. A virada — MESMO QUARTO enche mais e acende: AINDA MELHOR.
4. O efeito — GENTE PARECIDA (bonecos) · LUGAR PARECIDO (o bairro brota).
5. Desfecho — FAMÍLIAS COMO A DELE; a casa acende: NESTE BAIRRO · DESDE QUE SEJA VERDADE.
6. CTA curta — módulos do sistema, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-12 --source episodes/ATIVO-D1204-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-12 && bash tools/render_episode.sh ATIVO-D1204-12
```
