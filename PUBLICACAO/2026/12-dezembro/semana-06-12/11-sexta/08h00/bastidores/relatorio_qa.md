# QA — ATIVO-D1211-08 · "Sete dias para desistir" (Esteira Editorial Diária · grade 11/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-08_sete_dias_para_desistir.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 4.591/1964, art. 67-A, §10 (incluído pela Lei 13.786/2018): nos contratos firmados em estandes de vendas ou fora da sede do incorporador, o adquirente pode desistir em 7 dias, com devolução de todos os valores pagos, inclusive a comissão de corretagem.
- §12: decorrido o prazo sem arrependimento, o contrato será considerado irretratável.
- O vídeo não trata de imóvel pronto nem de venda entre particulares; o recorte é incorporação (imóvel na planta).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-08/narration_source.wav`.
- Narração 34,0 s · 174 palavras/min · ASR 0,944 (93/99). Vídeo 36,4 s.
- **Pontos para ouvir:**
  - 'quatro mil quinhentos e noventa e um' / 'sessenta e sete A' e 'corretagem'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 18.0 s (alvo 18.2 s); insight → seção drop em 22.0 s (alvo 21.72 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.97 × mixagem 0.96 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.17 LUFS, TP -1.94 dBTP, LRA 2.40; narração -20.15 · trilha -27.06 · efeitos -40.68 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.42 s (timeline 36.40 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.6 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: os sete dias ficavam escondidos atrás da mesa e dos bonecos, e as pílulas 7 DIAS e ATÉ A COMISSÃO se sobrepunham → fileira recuada, câmera mais alta e pílulas que se revezam.
- motion_check 44,4% parados, maior trecho 2,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA), igual aos demais vídeos da maquete.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: o estande com a maquete do prédio, corretor e cliente; os sete dias brotam atrás; 7 DIAS PARA DESISTIR?; a comissão volta em arco: ATÉ A COMISSÃO DE VOLTA.
2. JÁ EXISTE — IMÓVEL NA PLANTA; ESTANDE OU FORA DA SEDE.
3. LEI 4.591 · ART. 67-A — os dias acendem: 7 DIAS · LEI 4.591, ART. 67-A; DEVOLUÇÃO ATÉ DA CORRETAGEM.
4. DEPOIS DO PRAZO — o 8º dia e o contrato acendem: DIA 8: CONTRATO FIRME.
5. NO ESTANDE — EXPLIQUE ANTES DE ASSINAR; ACOMPANHE A SEMANA (os 7 dias acendem um a um).
6. A LIÇÃO — VENDA BEM FEITA.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-08 --source episodes/ATIVO-D1211-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-08 && bash tools/render_episode.sh ATIVO-D1211-08
```
