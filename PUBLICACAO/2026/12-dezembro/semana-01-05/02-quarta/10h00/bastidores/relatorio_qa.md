# QA — ATIVO-D1202-10 · "E se o comprador pagasse metade?" (Esteira Editorial Diária · grade 02/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-10_comprador_paga_metade.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Alemanha: lei de divisão da comissão em vigor desde 23/12/2020 — venda de apartamento ou casa unifamiliar a consumidor, corretor atuando para os dois lados: divisão em partes iguais; antes, em Berlim, Hamburgo, Brandemburgo, Bremen e Hesse o comprador pagava tudo (Engel & Völkers, iamexpat, Haufe, von Poll).
- Efeito: tese/estudo da Hertie School (Berlim) indicando comissão total maior somando as duas metades — dito como "um estudo" e carimbo 1 ESTUDO. Brasil: "quase sempre quem paga é o vendedor" (costume, não regra legal).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-10/narration_source.wav`.
- Narração 48,3 s · 179 palavras/min · ASR 0,993 (143/144). Vídeo 50,6 s.
- **Pontos para ouvir:**
  - Ritmo 179 palavras/min; "Hamburgo" e "2020" (lido "dois mil e vinte").

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 20.067 s (alvo 21.08 s); insight → seção c em 30.06 s (alvo 29.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.993 × mixagem 0.979 (queda 1.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.07 LUFS, TP -1.97 dBTP, LRA 2.10; narração -18.38 · trilha -26.85 · efeitos -39.94 LUFS; 28 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 50.60 s (timeline 50.60 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.08 LUFS · True peak ≤ -1 dBTP: -1.64 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 26.5 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: etiquetas METADE DA COMISSÃO? e ALEMANHA estavam sob a legenda → subiram; APTO/CORRETOR DOS DOIS LADOS passaram a se alternar no mesmo lugar; a moeda carregada cobria a cabeça e a legenda → subiu; carimbo 1 ESTUDO encostava no selo → desceu; a etiqueta COMISSÃO TOTAL: MAIOR repetia a legenda → removida.
- Voz gerada com a 2ª chave do Gemini (mesmo modelo e voz) depois que a 1ª esgotou a cota diária; a 1ª tentativa do dia lera a direção em voz alta e foi barrada pela trava de 90%.
- sistema_visual_check --quadros: 1 aviso de luminância (46 vs 45) no último quadro do fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: a moeda da comissão (R$) se parte ao meio; o comprador espantado; METADE DA COMISSÃO?
2. ISSO EXISTE — bandeira (listras), ALEMANHA, carimbo LEI 23/12/2020; o corretor explica.
3. Meio a meio — vendedor, corretor e comprador; APTO OU CASA PARA MORAR → CORRETOR DOS DOIS LADOS; as metades descem uma para cada lado; MEIO A MEIO.
4. ANTES (memória) — o comprador carrega a moeda inteira; BERLIM · HAMBURGO; PAGAVA TUDO; a moeda sai e ALÍVIO!
5. SÓ QUE… — 1 ESTUDO (universidade de Berlim); as metades se juntam e a moeda cresce: ficou maior.
6. NO BRASIL — QUEM PAGA ≠ VALOR; o vendedor com a moeda (QUASE SEMPRE PAGA); o comprador ergue a mão: QUEM DECIDE.
7. Desfecho — COMO SE OS DOIS PAGASSEM: checklist O QUE ELE RECEBE DE VOCÊ (pesquisa, documentos, negociação).
8. CTA curta — campo COMENTE SISTEMA, ícones imóveis/leads/atendimentos, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-10 --source episodes/ATIVO-D1202-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-10 && bash tools/render_episode.sh ATIVO-D1202-10
```
