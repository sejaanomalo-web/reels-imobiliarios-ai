# QA — ATIVO-D1130-12 · "O número na porta" (Esteira Editorial Diária · grade 30/11/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-30/ATIVO-D1130-12_o_numero_na_porta.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Fortin, Hill e Huang, "Superstition in the Housing Market", Economic Inquiry 52(3), 2014, p. 974–993 (IZA DP 7484): ~117 mil vendas; endereço terminado em 4 com desconto de 2,2% e em 8 com prêmio de 2,5% frente aos demais; efeito em bairros com mais moradores de origem chinesa ou em transações repetidas (leitura especulativa dos autores).
- CTV Vancouver (2010, arquivo UBC): Grande Vancouver, 117 mil vendas, cidades com mais de 18% de moradores de origem chinesa.
- Ressalvas ditas ou mostradas: dado de vendas até ~2010 (sem "hoje"); efeito médio; crença cultural dita como crença ("para muitas famílias", "lembra", "soa parecido").

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1130-12/narration_source.wav`.
- Narração 50,9 s · 170 palavras/min · ASR 0,886 (124/144). Vídeo 53,2 s.
- **Pontos para ouvir:**
  - Números falados por extenso ("oito", "dois e meio por cento"): o reconhecedor transcreve em dígitos; conferido trecho a trecho.
  - "o quatro soa parecido" (≈24,4 s): o reconhecedor ouviu "sua" em vez de "soa" — conferir na escuta.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 29.04 s (alvo 30.12 s); descoberta → seção quebra em 37.04 s (alvo 37.56 s); insight → seção drop em 43.04 s (alvo 43.24 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.889 × mixagem 0.903 (queda -1.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.96 dBTP, LRA 2.30; narração -19.46 · trilha -26.60 · efeitos -41.40 LUFS; 29 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 53.25 s (timeline 53.23 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.16 LUFS · True peak ≤ -1 dBTP: -1.60 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 22.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: câmera apertada no gancho, na revenda e no desfecho (casas e corretor cortados; placas encostando no cabeçalho) → planos abertos, donos em argila, enquadramento do corretor refeito.
- Render 1: `motion_check` acusou gancho parado (54% de quadros parados, trecho de 2,2 s) → a 4 brota como cópia, placa VENDEU MAIS CARO, câmera que desce até a rua e viagens laterais nos números e na crença (render 2: 38%).
- Render 2: a placa VENDEU MAIS CARO encostava no título do cabeçalho por ~1 s → placa mais baixa (render 3).
- Render 3: `sistema_visual_check --quadros` 0 erro / 2 avisos leves de luminância (closes na casa clara); `motion_check` movimento médio 3,04, 38,2% de quadros parados, maior trecho 2,0 s (registrado: o modelo Maquete anda por câmera lenta).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a casa Nº 8 já na mesa; a 4 brota como cópia ("iguais"); VENDEU MAIS CARO; plaquinhas Nº 8 · Nº 4.
2. Estudo — o bairro de 117 mil vendas brota atrás em profundidade (cabeçalho 117 mil · VENDAS DE CASAS · REGIÃO DE VANCOUVER).
3. Números — a 8 sobe num degrau e acende (+2,5%), a 4 afunda (−2,2%); câmera passa de uma à outra.
4. Crença — 8 · PROSPERIDADE, 4 · SOA COMO "MORTE"; o setor do bairro ganha luz (ONDE O EFEITO APARECEU).
5. Revenda — a casa passa de dono em dono (arcos de pontos): REVENDA → TAMBÉM PAGA PELO 8.
6. Desfecho — o corretor de gravata verde com o cliente ("NÃO FAZ DIFERENÇA") e O PRÓXIMO COMPRADOR ao fundo; o corretor acende em "amanhã".
7. CTA curta — módulos do sistema, campo que digita SISTEMA, logo oficial.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1130-12 --source episodes/ATIVO-D1130-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1130-12 && bash tools/render_episode.sh ATIVO-D1130-12
```
