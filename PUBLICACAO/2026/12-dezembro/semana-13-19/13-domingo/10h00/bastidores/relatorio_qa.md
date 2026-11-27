# QA — ATIVO-D1213-10 · "O link do concorrente" (Esteira Editorial Diária · grade 13/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-13/ATIVO-D1213-10_o_link_do_concorrente.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina; sem estatística; personagens ilustrativos.
- O anúncio no celular é genérico ('[ANÚNCIO DE OUTRO CORRETOR]'); nenhum portal ou imobiliária real é citado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1213-10/narration_source.wav`.
- Narração 24,6 s · 183 palavras/min · ASR 0,980 (73/75). Vídeo 26,9 s.
- **Pontos para ouvir:**
  - 'concorrente' e 'confiança'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 10.5 s (alvo 10.28 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.973 × mixagem 0.973 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.07 LUFS, TP -1.95 dBTP, LRA 3.20; narração -18.64 · trilha -25.99 · efeitos -40.27 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 26.94 s (timeline 26.93 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.09 LUFS · True peak ≤ -1 dBTP: -1.83 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 14.06 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia e folha do render: sem sobreposição; o celular do shot 5 fica vazio ~0,4 s (aceito).
- Inteligibilidade: queda de 0,0 ponto com T01.
- motion_check 11,9% parados, maior trecho 0,7 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O LINK: 'OLHA ESTE AQUI:' e o anúncio no celular; DE OUTRO CORRETOR.
2. A VONTADE — o corretor bravo: IGNORAR? / FALAR MAL?
3. O QUE O LINK DIZ — checklist ELE PROCURA: VARANDA, 2 VAGAS, PERTO DA ESCOLA.
4. A VIRADA — O ANÚNCIO DO CONCORRENTE: A MELHOR PISTA.
5. PERGUNTE — no celular, em verde: 'O QUE MAIS TE CHAMOU ATENÇÃO?' → 'A VARANDA E AS 2 VAGAS'; FILTRE AS OPÇÕES.
6. COMPAREM JUNTOS — CORRETOR DE CONFIANÇA; confete.
7. Fecho — CtaCartoon com campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1213-10 --source episodes/ATIVO-D1213-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1213-10 && bash tools/render_episode.sh ATIVO-D1213-10
```
