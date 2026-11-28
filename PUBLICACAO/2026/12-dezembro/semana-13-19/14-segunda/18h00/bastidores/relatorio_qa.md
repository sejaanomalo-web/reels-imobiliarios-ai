# QA — ATIVO-D1214-18 · "A cidade que subiu" (Esteira Editorial Diária · grade 14/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-14/ATIVO-D1214-18_a_cidade_que_subiu.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Raising of Chicago (décadas de 1850–1860): a cidade, plana e de solo encharcado, elevou o nível das ruas para instalar o esgoto; prédios levantados com macacos de rosca.
- Tremont House (1861), seis andares de alvenaria, levantado por Ely, Smith & Pullman sem fechar: os hóspedes continuaram hospedados (Wikipedia, WTTW).
- Números variam entre fontes (500–600 homens, 5.000–6.000 macacos, 1,4–1,8 m): o vídeo diz 'mais de um metro' e 'centenas de macacos'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1214-18/narration_source.wav`.
- Narração 37,0 s · 172 palavras/min · ASR 0,977 (104/106). Vídeo 39,3 s.
- **Pontos para ouvir:**
  - 'mil oitocentos e sessenta e um' e 'encharcado'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 19.04 s (alvo 19.88 s); insight → seção drop em 27.04 s (alvo 26.36 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.962 × mixagem 0.943 (queda 1.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.26 LUFS, TP -1.95 dBTP, LRA 3.80; narração -19.27 · trilha -26.12 · efeitos -41.00 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.34 s (timeline 39.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.28 LUFS · True peak ≤ -1 dBTP: -1.79 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.59 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o hotel invadia o título e as placas se sobrepunham → câmera mais afastada, hotel menor, placas abertas para os lados; placas da virada saem antes da viagem da câmera.
- Inteligibilidade: queda de 1,9 ponto com T03.
- motion_check 47,4% parados (plano-sequência lento), maior trecho 2,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — CHICAGO · 1861: o hotel de seis andares sobe sobre os macacos; COM OS HÓSPEDES LÁ DENTRO.
2. SEM PARA ONDE ESCOAR — TERRENO PLANO E ENCHARCADO; o cano: O ESGOTO SEM SAÍDA.
3. A RUA SUBIU — A RUA SOBE e cobre o cano; E OS PRÉDIOS SOBEM JUNTO.
4. EMBAIXO MUDA O VALOR — O QUE ESTÁ EMBAIXO DA RUA / MUDA O VALOR DE CIMA.
5. A RUA ALAGA? — plano-sequência até uma rua de hoje: a água na sarjeta; PERGUNTE AOS VIZINHOS / CONSULTE A PREFEITURA.
6. ENDEREÇO QUE NÃO ALAGA — a casa acende.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1214-18 --source episodes/ATIVO-D1214-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1214-18 && bash tools/render_episode.sh ATIVO-D1214-18
```
