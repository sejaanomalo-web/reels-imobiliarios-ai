# QA — ATIVO-D1204-15 · "Imagine que deu errado" (Esteira Editorial Diária · grade 04/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-15_imagine_que_deu_errado.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Klein (2007), Harvard Business Review, 'Performing a Project Premortem', citando Mitchell, Russo & Pennington (1989): imaginar que o evento já aconteceu aumentou em cerca de 30% os motivos apontados. Na tela: ESTUDO · 1989 e +30% MOTIVOS.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-15/narration_source.wav`.
- Narração 37,2 s · 155 palavras/min · ASR 0,990 (95/96). Vídeo 39,6 s.
- **Pontos para ouvir:**
  - Ritmo 155 palavras/min; "1989" e "30%" por extenso.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 8.727 s (alvo 8.76 s); insight → seção a2 em 17.454 s (alvo 18.52 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.99 × mixagem 0.979 (queda 1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.18 LUFS, TP -1.95 dBTP, LRA 2.50; narração -19.85 · trilha -28.54 · efeitos -38.91 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.57 s (timeline 39.57 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.54 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 14.62 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: rótulos dos motivos se sobrepunham → BARULHO / PARCELA / ESCOLA; 1 ANO DEPOIS e ESTUDO · 1989 encostavam em outros elementos → reposicionados.
- motion_check: 58,5% de quadros parados, maior trecho 1,2 s (padrão noir, dentro da regra de 2–3 s).
- sistema_visual_check --quadros: 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — ANTES DE ASSINAR, UMA PERGUNTA ESTRANHA: o contrato entre corretor e cliente.
2. IMAGINE QUE SE ARREPENDEU — o relógio salta: 1 ANO DEPOIS; O QUE DEU ERRADO?
3. PARECE PESSIMISMO → IMAGINAR QUE JÁ ACONTECEU: alertas surgem; +30% MOTIVOS.
4. O CLIENTE FALA — BARULHO · PARCELA · ESCOLA.
5. RESOLVA ANTES DA CANETA — cada motivo ganha check; o contrato acende; a chave apaga.
6. Desfecho — ANTES DA ASSINATURA: SOLUÇÃO × DEPOIS: ARREPENDIMENTO.
7. CTA curta noir — campo SISTEMA, ícones, logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-15 --source episodes/ATIVO-D1204-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-15 && bash tools/render_episode.sh ATIVO-D1204-15
```
