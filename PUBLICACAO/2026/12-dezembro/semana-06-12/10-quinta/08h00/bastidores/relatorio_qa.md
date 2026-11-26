# QA — ATIVO-D1210-08 · "A conta de luz" (Esteira Editorial Diária · grade 10/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-08_a_conta_de_luz.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- União Europeia: Diretiva 2010/31/UE, art. 12 — o indicador de desempenho energético do certificado consta nos anúncios comerciais de venda ou aluguel; a Comissão Europeia orienta indicar o indicador e a classe (aplicação por país).
- Brasil: etiquetagem PBE Edifica (Inmetro) voluntária para edificações residenciais privadas (obrigatória para habitação social com recursos públicos e, a partir de 2027, edificações públicas federais). A fala diz só 'imóvel residencial privado'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-08/narration_source.wav`.
- Narração 31,6 s · 188 palavras/min · ASR 0,985 (98/99). Vídeo 34,0 s.
- **Pontos para ouvir:**
  - 'União Europeia' e 'voluntária'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 14.0 s (alvo 14.28 s); insight → seção drop em 18.0 s (alvo 17.88 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.949 × mixagem 0.949 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.96 dBTP, LRA 3.60; narração -16.74 · trilha -23.35 · efeitos -40.90 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 33.98 s (timeline 33.97 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.82 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.33 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Voz gerada com a 3ª chave do Gemini (mesmo modelo e voz Puck).
- Prévia: a casa acendia em verde no 'sol da tarde' (verde é solução, não pergunta) → acendimento removido.
- motion_check 53,1% parados (maquete com câmera lenta), maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 1 aviso (fecho verde, luminância 45).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A ENERGIA NO ANÚNCIO?: casas brotam com a etiqueta em haste; QUANTO A CASA GASTA?
2. UNIÃO EUROPEIA — as etiquetas acendem: CLASSE DE ENERGIA NO ANÚNCIO.
3. BRASIL — a casa sem etiqueta: ETIQUETA VOLUNTÁRIA.
4. O CLIENTE PERGUNTA — BATE SOL À TARDE? / A CONTA DE LUZ É ALTA? (o cone de sol na fachada).
5. NA CAPTAÇÃO — o corretor e o dono: FACE DO SOL, ÚLTIMAS CONTAS DE LUZ, NA FICHA DO IMÓVEL (a ficha acende).
6. A LIÇÃO — PREÇO: UMA VEZ / CONTA: TODO MÊS; fecho SISTEMA.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-08 --source episodes/ATIVO-D1210-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-08 && bash tools/render_episode.sh ATIVO-D1210-08
```
