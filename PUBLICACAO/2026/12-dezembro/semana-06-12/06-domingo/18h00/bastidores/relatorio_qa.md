# QA — ATIVO-D1206-18 · "A linha de montagem ao contrário" (Esteira Editorial Diária · grade 06/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-18_linha_de_montagem_ao_contrario.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Levittown (Long Island, NY), Levitt & Sons, a partir de 1947: 17.447 casas; construção dividida em 26–27 etapas, cada equipe repetindo a sua de casa em casa (History.com, Wikipedia, EBSCO). A fala diz 'vinte e poucas etapas' e 'mais de dezessete mil casas'. O ritmo de '30 casas por dia' foi REPROVADO (fontes divergem). Contexto sensível (cláusulas raciais nas escrituras da época): o roteiro descreve só o método, sem elogiar o empreendimento.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-18/narration_source.wav`.
- Narração 41,4 s · 152 palavras/min · ASR 0,967 (101/105). Vídeo 43,8 s.
- **Pontos para ouvir:**
  - 'mil novecentos e quarenta e sete' e 'dezessete mil'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 19.5 s (alvo 19.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.971 × mixagem 0.971 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.97 dBTP, LRA 4.00; narração -18.88 · trilha -26.27 · efeitos -41.15 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 43.78 s (timeline 43.77 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.84 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.59 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévias: fileira larga demais para o vertical → diagonal entrando em profundidade; bairro afastado; pedestais do atendimento saíam do quadro (render 1 descartado) → diagonal, câmera recuada, placas sem sobreposição; verde dos pedestais a ~25%.
- motion_check 55,6% parados (câmera lenta com deriva), maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — EUA · 1947: a fileira de lotes em diagonal; A CASA FICA PARADA, QUEM ANDA É A EQUIPE (bonecos andando de casa em casa; laje → paredes → casa pronta).
2. O MÉTODO — VINTE E POUCAS ETAPAS; CADA EQUIPE FAZ SÓ A SUA.
3. A ESCALA — a câmera sobe e o bairro brota: MAIS DE 17 MIL CASAS.
4. O SEGREDO — NÃO ERA TRABALHAR MAIS; CADA ETAPA, SEMPRE DO MESMO JEITO.
5. NO SEU ATENDIMENTO — quatro pedestais em diagonal acendem: CONTATO, VISITA, PROPOSTA, DOCUMENTOS; o corretor anda por eles; DEFINA COMO CADA UMA É FEITA.
6. A LIÇÃO — UM JEITO CERTO; clientes chegam: MAIS, SEM ATENDER PIOR; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-18 --source episodes/ATIVO-D1206-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-18 && bash tools/render_episode.sh ATIVO-D1206-18
```
