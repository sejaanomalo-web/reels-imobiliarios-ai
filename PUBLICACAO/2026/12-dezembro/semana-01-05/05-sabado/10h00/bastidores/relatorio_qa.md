# QA — ATIVO-D1205-10 · "Um prédio, muitas vidas" (Esteira Editorial Diária · grade 05/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-10_um_predio_muitas_vidas.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Edifício Copan (São Paulo), projeto de Oscar Niemeyer, inaugurado em 1966, 1.160 apartamentos, de quitinetes a unidades grandes (Gazeta SP, ALESP). 'Mais apartamentos do que 254 cidades brasileiras têm de casas' (Gazeta SP com dados do IBGE). Número de moradores omitido: as fontes divergem.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-10/narration_source.wav`.
- Narração 37,9 s · 149 palavras/min · ASR 0,930 (86/94). Vídeo 40,2 s.
- **Pontos para ouvir:**
  - Pronúncia de 'Copan', 'Niemeyer' e 'mil cento e sessenta'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 21.08 s); insight → seção climax em 23.89 s (alvo 26.12 s); resolucao → seção resolucao em None s (alvo 31.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.947 × mixagem 0.947 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.95 dBTP, LRA 2.90; narração -18.45 · trilha -28.93 · efeitos -40.49 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 40.21 s (timeline 40.20 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.16 LUFS · True peak ≤ -1 dBTP: -1.63 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.06 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Primeira prévia: maquete grande demais e verde em área extensa → escala reduzida e verde só nas unidades que acendem.
- Câmera com deriva lenta (sem ficar parada); motion_check 45,1% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a lâmina sinuosa do prédio na maquete; UM PRÉDIO; casinhas de 254 CIDADES TÊM MENOS CASAS.
2. COPAN · OSCAR NIEMEYER; placa 1966 · 1.160 APARTAMENTOS.
3. Nenhum é igual — QUITINETE e APARTAMENTO GRANDE acendem no mesmo endereço.
4. Vidas diferentes — bonecos de famílias e pessoas sozinhas diante do prédio.
5. Na sua carteira — o mesmo imóvel CERTO PARA UM / ERRADO PARA OUTRO (holofote).
6. Desfecho — QUE VIDA ELE QUER? antes de falar do imóvel.
7. CTA curta — módulos acendem, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-10 --source episodes/ATIVO-D1205-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-10 && bash tools/render_episode.sh ATIVO-D1205-10
```
