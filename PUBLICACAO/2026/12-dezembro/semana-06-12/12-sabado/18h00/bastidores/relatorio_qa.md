# QA — ATIVO-D1212-18 · "A casa em cima da cachoeira" (Esteira Editorial Diária · grade 12/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-12/ATIVO-D1212-18_a_casa_em_cima_da_cachoeira.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Fallingwater (Casa da Cascata), Mill Run, Pensilvânia, projeto de 1935 de Frank Lloyd Wright para a família Kaufmann (Britannica; NEH EDSITEment): a família esperava uma casa com vista para a cachoeira de Bear Run; o arquiteto a pôs sobre a queda, para que vivessem com a cachoeira, não só olhassem para ela.
- A reação negativa inicial do dono é relatada com ressalva ('conta-se'); a frase do arquiteto é paráfrase, não citação literal.
- A maquete é estilizada (blocos de argila); não reproduz a planta real da casa.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1212-18/narration_source.wav`.
- Narração 34,7 s · 163 palavras/min · ASR 0,968 (90/94). Vídeo 37,0 s.
- **Pontos para ouvir:**
  - 'mil novecentos e trinta e cinco' e 'Conta-se'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 16.92 s); insight → seção climax em 11.04 s (alvo 22.36 s); resolucao → seção resolucao em None s (alvo 29.0 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.989 × mixagem 0.989 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.96 dBTP, LRA 2.50; narração -18.70 · trilha -30.20 · efeitos -40.85 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 37.03 s (timeline 37.03 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.10 LUFS · True peak ≤ -1 dBTP: -1.67 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 22.92 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: câmera perto demais (o platô branco cobria a tela, a casa fantasma ficava fora do quadro), placas sob o cabeçalho e tela vazia na viagem até a mesa → câmera afastada, chão escuro, casa fantasma virada para a queda, placas mais baixas, viagem encurtada e desfecho na mesa.
- Inteligibilidade: queda de 0,0 ponto com T02.
- motion_check 40,4% parados, maior trecho 2,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — VISTA PARA A CACHOEIRA: o platô, o rio e a queda (pontos de água); na margem, a casa 'com vista' em fantasma: O PEDIDO: VISTA PARA A QUEDA.
2. EM CIMA DA CACHOEIRA — a casa em balanço brota sobre a queda: A CASA EM CIMA DELA; 1935 · ESTADOS UNIDOS; CONTA-SE: O DONO ESTRANHOU.
3. VIVER COM A CACHOEIRA — NÃO SÓ OLHAR PARA ELA.
4. PEDIDO ≠ DESEJO — a casa fantasma volta: O PEDIDO: A VISTA (alerta) × a casa real acesa: O DESEJO: A CACHOEIRA.
5. PERGUNTE PARA QUÊ — a câmera anda até a mesa: PEDIU: 3 QUARTOS / PARA QUÊ?; os três quartos acendem: FILHOS? / ESCRITÓRIO? / VISITAS?
6. ENTENDA O DESEJO — O DESEJO ACHA O IMÓVEL.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1212-18 --source episodes/ATIVO-D1212-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1212-18 && bash tools/render_episode.sh ATIVO-D1212-18
```
