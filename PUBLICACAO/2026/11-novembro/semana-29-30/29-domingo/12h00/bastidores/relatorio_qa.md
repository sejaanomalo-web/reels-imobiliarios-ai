# QA — ATIVO-D1129-12 · "A casa existe. O aluguel, não." (Esteira Editorial Diária · grade 29/11/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-29/ATIVO-D1129-12_golpe_temporada.md` (aprovado pelo cliente em 23/11/2026; processo completo autorizado, revisão posterior). Território AGORA (radar 168 h, classe A) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- CRECI-SC, campanha "Você precisa de um corretor de imóveis" / Operação Verão, 23/11/2026 (RCN, Agora Floripa, Informe Floripa, TV BV) — 6 dias antes da publicação.
- Checagens (CRECI de quem anuncia, nome do anúncio = conta = dono, contrato antes do pagamento) seguem as orientações do CRECI-SC e do CRECI-GO sobre golpes de locação.
- Nenhum número de golpes no vídeo (o dado de 2024 do CRECI-GO ficou de fora). A família na porta é SITUAÇÃO ILUSTRATIVA (selo no capítulo).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1129-12/narration_source.wav`.
- Narração 54,9 s · 185 palavras/min · ASR 0,976 (165/169). Vídeo 57,2 s.
- **Pontos para ouvir:**
  - "e a data é sua" (≈17,5 s): os dois reconhecedores (Whisper e Parakeet) ouviram "e a dá até sua" — provável fala corrida; a legenda mostra o texto certo.
  - CRECI pronunciado "Créci" (pronúncia do episódio).

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 28.0 s (alvo 27.04 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.953 × mixagem 0.941 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.00 LUFS, TP -1.96 dBTP, LRA 1.60; narração -18.43 · trilha -25.90 · efeitos -41.11 LUFS; 25 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 57.22 s (timeline 57.20 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.01 LUFS · True peak ≤ -1 dBTP: -1.70 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.66 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: a placa do anúncio subia sobre o título → haste mais baixa e câmera com o alvo mais alto (objetos abaixo do cabeçalho).
- A família cobria o dono na porta → ela para ao lado da porta e sai de cena antes do capítulo do CRECI.
- A cópia escura saía do quadro na defesa → mural aproximado e plano mais aberto (casa real + cópia + 3 placas no mesmo quadro).
- Casas vizinhas viraram argila clara: só a cópia (o anúncio falso) é escura; celular ao lado da família, golpista dentro do quadro; placas da pressa somem antes do capítulo seguinte.
- Render 1 do final: 9 quadros claros demais (closes na casa branca sob o holofote, 25–26 s e 44–50 s) → planos finais mais abertos, cone e holofote mais suaves; capa com o título em duas frases.
- 24/11/2026: novo render com a trilha T01 (autorizada); imagem idêntica ao final aprovado.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a casa real de argila e a cópia escura que se descola (FOTOS REAIS · ANÚNCIO FALSO).
2. Mecanismo — a cópia voa até o mural de anúncios: PREÇO ABAIXO DA REGIÃO → PUBLICADO NAS REDES.
3. Pressa — a família diante do celular deitado, mensagens, o Pix (fluxo vermelho) para o golpista no escuro; SINAL NO PIX · SEM CONTRATO · SEM VIDEOCHAMADA.
4. Consequência — a família caminha com as malas até a casa real; o dono aparece na porta com a luz acesa (SITUAÇÃO ILUSTRATIVA).
5. O que mudou — o prédio do conselho brota, holofote varre a orla: CRECI-SC · OPERAÇÃO VERÃO · FISCALIZAÇÃO.
6. Defesa — 3 placas acendem em verde (1 CRECI DE QUEM ANUNCIA · 2 ANÚNCIO = CONTA = DONO · 3 CONTRATO ANTES DO PIX) e a cópia se desfaz em partículas.
7. Desfecho — a casa sozinha no holofote; o corretor de gravata verde entra e acende.
8. CTA curta — módulos do sistema, campo que digita SISTEMA, logo oficial.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1129-12 --source episodes/ATIVO-D1129-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1129-12 && bash tools/render_episode.sh ATIVO-D1129-12
```
