# QA — ATIVO-D1130-18 · "E se o anúncio mostrasse a conta de luz?" (Esteira Editorial Diária · grade 30/11/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-30/ATIVO-D1130-18_a_conta_de_luz_no_anuncio.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Service-Public.fr (DPE) e guias de anúncio (MySweetImmo, SeLoger, Square Habitat): desde 01/01/2022 o anúncio de venda ou locação traz o montante estimado das despesas anuais de energia, em letra ao menos do tamanho do resto; F e G levam "logement à consommation énergétique excessive"; classificação A–G.
- Locação (Loi Climat et Résilience; decreto de 2023): na França metropolitana, G fora de novos contratos desde 01/01/2025; F em 2028; E em 2034 (ultramar tem calendário próprio). Selo na tela: FRANÇA METROPOLITANA · SEGUNDO SERVICE-PUBLIC.FR.
- Brasil: sem obrigação equivalente para anúncio residencial — a fala diz "Ninguém te obriga"; "o comprador costuma descobrir depois" é interpretação. Anúncio e planta ILUSTRATIVOS.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1130-18/narration_source.wav`.
- Narração 56,2 s · 169 palavras/min · ASR 0,968 (153/158). Vídeo 58,5 s.
- **Pontos para ouvir:**
  - Anos lidos por extenso (pronúncia do episódio) e "IPTU" soletrado "i pê tê u".

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 33.5 s (alvo 33.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.968 × mixagem 0.987 (queda -1.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.95 dBTP, LRA 2.10; narração -18.81 · trilha -26.22 · efeitos -41.63 LUFS; 33 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 58.52 s (timeline 58.50 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.67 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 31.54 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: título do gancho em 2 linhas → 50 px; chamadas (LETRA = TAMANHO DO PREÇO, CONSUMO EXCESSIVO, SEM CONTRATO, FOTO NENHUMA DÁ) cruzavam o contorno ou saíam da tela → reposicionadas; o selo da fonte sai antes da chamada da letra.
- Lá × aqui ficava 3 s só com uma miniatura no canto → o anúncio francês entra grande e encolhe para o canto em "Aqui"; as 3 chamadas de custo foram espaçadas; o coração desceu para não cobrir SALA.
- Final: `sistema_visual_check --quadros` 0 erro / 0 aviso; `motion_check` movimento médio 2,37, 11,5% de quadros parados, maior trecho 2,0 s (o anúncio se desenhando no gancho; registrado).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o anúncio se desenha; uma linha nova ENERGIA / ANO ? nasce sob o preço.
2. A regra — NA FRANÇA, JÁ É REGRA; carimbo 2022; a linha acende como GASTO ANUAL ESTIMADO; chamada LETRA = TAMANHO DO PREÇO.
3. A nota — escala A–G; F e G em vermelho; CONSUMO EXCESSIVO.
4. O calendário — 2025 · 2028 · 2034 com portas fechadas: ALUGUEL NOVO: PROIBIDO; SEM CONTRATO NOVO DE ALUGUEL; A PRÓXIMA.
5. Lá × aqui — o anúncio francês (LÁ: NA VITRINE) encolhe para o canto; a planta brasileira com o coração na sala; CONTA DE LUZ · CONDOMÍNIO · IPTU chegam DEPOIS DA PAIXÃO.
6. Desfecho — SEU ANÚNCIO com CUSTO DE MORAR (condomínio · IPTU · luz média) que acende em "antes"; FOTO NENHUMA DÁ; carimbo CONFIANÇA · ILUSTRATIVO · ATIVO.
7. CTA curta — CtaPlanta (campo SISTEMA, logo assinado).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1130-18 --source episodes/ATIVO-D1130-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1130-18 && bash tools/render_episode.sh ATIVO-D1130-18
```
