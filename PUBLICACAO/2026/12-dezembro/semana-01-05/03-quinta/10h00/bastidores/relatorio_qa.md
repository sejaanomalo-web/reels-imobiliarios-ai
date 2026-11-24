# QA — ATIVO-D1203-10 · "O porquê de cada imóvel" (Esteira Editorial Diária · grade 03/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-03/ATIVO-D1203-10_o_porque_de_cada_imovel.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Gomez-Uribe & Hunt (2015), ACM Transactions on Management Information Systems — artigo de engenheiros de uma das maiores plataformas de streaming: as recomendações respondem por cerca de 80% das horas assistidas (o restante vem da busca). Nome da plataforma omitido (regra de não usar marcas de terceiros); na tela: ARTIGO DE ENGENHEIROS DA PLATAFORMA · 2015.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1203-10/narration_source.wav`.
- Narração 47,6 s · 150 palavras/min · ASR 0,967 (116/119). Vídeo 50,0 s.
- **Pontos para ouvir:**
  - Ritmo 150 palavras/min; '2015' (dois mil e quinze) e '80%' por extenso.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 16.5 s (alvo 15.72 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.933 × mixagem 0.924 (queda 0.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.99 LUFS, TP -1.95 dBTP, LRA 3.40; narração -17.96 · trilha -25.28 · efeitos -41.18 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 49.98 s (timeline 49.97 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.01 LUFS · True peak ≤ -1 dBTP: -1.71 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 26.84 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Legenda da planta: 'abre', 'está' e afins tiravam o destaque verde em contexto negativo (override por segmento nos s3/s4/s7).
- Fecho: últimos 5 s com pouco movimento (campo SISTEMA + logo parados), dentro do padrão do modelo.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O MOTIVO VEM JUNTO: a tela inicial de uma plataforma (TÍTULO ×3) e a faixa PORQUE VOCÊ ASSISTIU… acende.
2. 80% VEM DA RECOMENDAÇÃO — o cômodo RECOMENDAÇÕES (≈ 80% DO QUE SE ASSISTE) × BUSCA; mergulho na recomendação.
3. DEZ LINKS, NENHUM MOTIVO — a lista que o cliente recebe: 10 links; ABRE · NÃO ENTENDE · DESCARTA (contornos em vermelho).
4. UMA LINHA POR IMÓVEL — O QUE ELE DISSE (2 QUARTOS · ESCOLA) → IMÓVEL 1; SEPAREI ESTE PORQUE…; cotas 2 QUARTOS · PERTO DA ESCOLA.
5. MOSTRA QUE VOCÊ OUVIU — a linha liga o que ele disse ao imóvel, que acende.
6. COM MOTIVO, É VISTO — COM MOTIVO × SEM MOTIVO (MAIS UM LINK).
7. CTA curta — PROJETO: SEU SISTEMA, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1203-10 --source episodes/ATIVO-D1203-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1203-10 && bash tools/render_episode.sh ATIVO-D1203-10
```
