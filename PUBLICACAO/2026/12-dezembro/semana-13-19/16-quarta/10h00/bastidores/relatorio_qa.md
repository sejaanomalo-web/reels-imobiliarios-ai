# QA — ATIVO-D1216-10 · "A portaria" (Esteira Editorial Diária · grade 16/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-16/ATIVO-D1216-10_a_portaria.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem estatística; personagens ilustrativos.
- A legenda diz que as regras de acesso variam por condomínio; o porteiro não é culpado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1216-10/narration_source.wav`.
- Narração 27,6 s · 150 palavras/min · ASR 0,986 (68/69). Vídeo 30,0 s.
- **Pontos para ouvir:**
  - 'portaria' e 'apartamento'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 11.5 s (alvo 11.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.957 × mixagem 0.957 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.22 LUFS, TP -1.95 dBTP, LRA 2.50; narração -17.02 · trilha -24.35 · efeitos -40.36 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 29.97 s (timeline 29.97 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.24 LUFS · True peak ≤ -1 dBTP: -1.63 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.28 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: ELE ESTÁ CERTO ficava 0,4 s → entra antes e o plano dura mais; o checklist encostava em NA VÉSPERA → desceu.
- Inteligibilidade: queda de 0,0 ponto com T01.
- motion_check 18,7% parados, maior trecho 0,7 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — CHEGOU NA HORA; o porteiro levanta a mão: NÃO PODE ENTRAR.
2. O PORQUÊ — NINGUÉM AVISOU / ELE ESTÁ CERTO.
3. O CUSTO — 10 MIN NA CALÇADA / COMEÇOU ERRADA.
4. A VIRADA — A VISITA COMEÇA / NA PORTARIA.
5. AVISE — NA VÉSPERA; checklist AVISO À PORTARIA: NOME DO CLIENTE / HORÁRIO / APARTAMENTO, cada item marca na palavra.
6. ENTROU SEM ESPERAR / BOM HUMOR — o porteiro acena; confete.
7. Fecho — CtaCartoon curto, campo SISTEMA, módulos e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1216-10 --source episodes/ATIVO-D1216-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1216-10 && bash tools/render_episode.sh ATIVO-D1216-10
```
