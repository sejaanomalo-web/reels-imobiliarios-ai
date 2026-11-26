# QA — ATIVO-D1209-21 · "Os 180 dias" (Esteira Editorial Diária · grade 09/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-21_os_180_dias.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 4.591/1964, art. 43-A, incluído pela Lei 13.786/2018 (planalto.gov.br): entrega até 180 dias corridos depois da data prevista não dá causa à resolução, desde que a tolerância esteja pactuada de forma clara e destacada.
- Depois do prazo, o adquirente que não deu causa ao atraso pode resolver o contrato com devolução integral do que pagou e a multa estabelecida, ou mantê-lo com indenização por mês de atraso. A tela não cita percentual; não é orientação jurídica (selo 'LEI 4.591/64 · ART. 43-A (LEI 13.786/2018)').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-21/narration_source.wav`.
- Narração 34,2 s · 158 palavras/min · ASR 0,989 (89/90). Vídeo 36,6 s.
- **Pontos para ouvir:**
  - 'cento e oitenta' e 'indenizado'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 13.5 s (alvo 13.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.978 × mixagem 0.956 (queda 2.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.96 dBTP, LRA 3.40; narração -18.51 · trilha -26.05 · efeitos -40.84 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.59 s (timeline 36.57 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.16 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.41 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Trilha trocada de T05 para T01 (+ ducking de médios −11 dB): com T05 a mixagem reprovou no portão de inteligibilidade (queda de 4,5 pontos); com T01 a queda foi de 2,2 pontos.
- Prévia: os textos das caixas DESFAZER e MANTER transbordavam → encurtados para DEVOLUÇÃO + MULTA e INDENIZAÇÃO.
- motion_check 17,3% parados, maior trecho 2,1 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — ATRASOU 6 MESES?: o cronograma da obra se desenha.
2. A LEI: ATÉ 180 DIAS — OBRA até a data prometida + TOLERÂNCIA; cota 180 DIAS.
3. SÓ SE ESTIVER ESCRITO — chamada SÓ COM CLÁUSULA CLARA E DESTACADA; a tolerância acende.
4. PASSOU DISSO, DUAS SAÍDAS — DEPOIS; rotas para DESFAZER (devolução + multa) e MANTER (indenização).
5. NA VENDA, MOSTRE E ANOTE — mergulho no contrato: CLÁUSULA DE TOLERÂNCIA e DATA PROMETIDA acendem; MOSTRADO ANTES DE ASSINAR.
6. COMBINADO É PRAZO / ESCONDIDO VIRA BRIGA (a cláusula fica em alerta); fecho SISTEMA na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-21 --source episodes/ATIVO-D1209-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-21 && bash tools/render_episode.sh ATIVO-D1209-21
```
