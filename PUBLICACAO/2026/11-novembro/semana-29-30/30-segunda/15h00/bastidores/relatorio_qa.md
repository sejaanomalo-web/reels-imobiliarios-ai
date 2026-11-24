# QA — ATIVO-D1130-15 · "A segunda visita" (Esteira Editorial Diária · grade 30/11/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-30/ATIVO-D1130-15_a_segunda_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Observação de prática profissional, sem estatística nem promessa de conversão; os sinais são apresentados como "repare", não como regra.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1130-15/narration_source.wav`.
- Narração 51,7 s · 174 palavras/min · ASR 0,973 (146/150). Vídeo 54,0 s.
- **Pontos para ouvir:**
  - Sem pontos críticos: ASR 0,973; "pediu" e "Repare" não reconhecidos isoladamente pelo alinhador (legenda correta).

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 27.562 s (alvo 29.56 s); insight → seção c em 32.558 s (alvo 32.84 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.92 × mixagem 0.927 (queda -0.7 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.97 dBTP, LRA 2.30; narração -19.51 · trilha -28.07 · efeitos -40.20 LUFS; 36 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 54.04 s (timeline 54.03 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.63 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 26.95 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o checklist cobria o selo do topo → descido para y 650; amarelo da trena e do sol trocado pelos materiais permitidos do kit (#E0A43A/#F0B94E/#A8761E) depois do bloqueio do `sistema_visual_check`.
- Final 1: o carimbo FALE MENOS. encostava no selo NA 2ª VISITA → descido (render 2).
- `motion_check`: movimento médio 3,0; 17,3% de quadros parados; maior trecho parado 0,7 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o corretor abre a porta de novo (2ª VISITA · PEDIU PARA VER DE NOVO); "ESTA É A SALA…" e o carimbo OUTRA VEZ?.
2. A pergunta mudou — "GOSTO?" (1ª visita) vira COMO SERIA MORAR AQUI? (2ª visita).
3. Sinais — trena, sofá tracejado (CABE O SOFÁ?), armário que abre; vizinho, barulho, sol da tarde.
4. Quem decide — a mãe e o sócio entram: QUEM DECIDE JUNTO.
5. Virada — o corretor narra a cozinha e o cliente com a trena é interrompido: ATRAPALHA; TOUR proibido; ESPAÇO (o sofá ganha cor).
6. Prática — checklist LEVE NA MÃO (trena · medidas dos cômodos · valor do condomínio); janela de dia vira noite (TRABALHA DE DIA · MOSTRE À NOITE).
7. Desfecho — FALE MENOS. DEIXE O CLIENTE SE IMAGINAR.; CtaCartoon curto.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1130-15 --source episodes/ATIVO-D1130-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1130-15 && bash tools/render_episode.sh ATIVO-D1130-15
```
