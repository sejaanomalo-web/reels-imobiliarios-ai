# QA — ATIVO-D1215-08 · "A vistoria antes de assinar" (Esteira Editorial Diária · grade 15/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-08_a_vistoria_antes_de_assinar.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- EUA: 'inspection contingency', cláusula comum nos contratos de compra, com prazo típico de 7 a 10 dias após a aceitação (às vezes até 14); dentro do prazo, o comprador pode negociar reparos/preço ou desistir (Rocket Mortgage, Redfin, Chase, Zillow).
- Brasil: não é regra obrigatória; pode ser pactuada na proposta. O vídeo diz isso e não fala de sinal nem de multa.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-08/narration_source.wav`.
- Narração 32,2 s · 173 palavras/min · ASR 0,973 (91/93). Vídeo 34,6 s.
- **Pontos para ouvir:**
  - 'vistoria' e 'inspeção'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em None s (alvo 16.84 s); insight → seção a2 em 17.455 s (alvo 17.8 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.925 × mixagem 0.914 (queda 1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.97 dBTP, LRA 2.90; narração -18.14 · trilha -28.25 · efeitos -40.81 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.58 s (timeline 34.57 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.73 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.05 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o texto de fontes quebrava em duas linhas → encurtado.
- Render 1: a placa MAS PODE SER COMBINADO saía antes de entrar → tempos corrigidos e a câmera parte 0,6 s depois; quadro de 17 s conferido.
- Inteligibilidade: queda de 1,1 ponto com T04.
- motion_check 54,5% parados (plano-sequência lento), maior trecho 2,3 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — DESISTIR DEPOIS DO LAUDO?: a casa, o comprador e o inspetor; o defeito acende na parede: O LAUDO DA VISTORIA.
2. DIAS PARA A INSPEÇÃO — NOS EUA, É COMUM; dez dias brotam no chão e acendem: 7 A 10 DIAS PARA INSPECIONAR.
3. NEGOCIA OU DESISTE — clima de tensão.
4. AQUI, PODE SER COMBINADO — AQUI NÃO É REGRA / MAS PODE SER COMBINADO.
5. ESCREVA O PRAZO — a proposta no chão: O PRAZO DA VISTORIA / E SE ACHAR PROBLEMA?.
6. ANTES DA ASSINATURA É NEGOCIAÇÃO — ANTES: NEGOCIAÇÃO / DEPOIS: BRIGA.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-08 --source episodes/ATIVO-D1215-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-08 && bash tools/render_episode.sh ATIVO-D1215-08
```
