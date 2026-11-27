# QA — ATIVO-D1211-21 · "Com quem está a chave?" (Esteira Editorial Diária · grade 11/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-21_com_quem_esta_a_chave.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina de equipes e imobiliárias; sem estatística; personagens ilustrativos; não cita produto de controle de chaves.
- Substitui 'Nas fotos parecia maior', reprovado pela checagem de pauta repetida (repetia a tese de 02/12 21h).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-21/narration_source.wav`.
- Narração 30,1 s · 166 palavras/min · ASR 0,994 (83/83). Vídeo 32,4 s.
- **Pontos para ouvir:**
  - 'portaria' e 'calçada'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 14.0 s (alvo 14.44 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 1.0 × mixagem 0.988 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.09 LUFS, TP -1.94 dBTP, LRA 3.40; narração -17.28 · trilha -24.60 · efeitos -39.04 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.41 s (timeline 32.40 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.11 LUFS · True peak ≤ -1 dBTP: -1.73 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.5 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a ficha ficava sobre a porta no desfecho → some antes da porta abrir.
- Folha do render 1: os ícones da virada voltavam no desfecho e ESPERANDO NA CALÇADA encostava na legenda → ícones presos à virada, selo no alto; re-render.
- Inteligibilidade: queda de 1,2 ponto com T01.
- motion_check 49,5% parados (pictograma lento por design), maior trecho 1,4 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — COM QUEM ESTÁ A CHAVE?: a porta fechada (cadeado vermelho), o corretor com o celular e o cliente chegando.
2. ONDE FICOU? — NA PORTARIA? / COM OUTRO CORRETOR? / NO CARRO DE ALGUÉM? (a chave pula de pergunta em pergunta).
3. E O CLIENTE ESPERA — o telefone, o relógio correndo; ESPERANDO NA CALÇADA.
4. A CHAVE NÃO SUMIU — a chave acesa; o documento vermelho: SUMIU O REGISTRO.
5. NA HORA QUE SAI, ANOTE — a ficha: QUEM PEGOU / PARA QUAL VISITA / QUANDO DEVOLVE.
6. CHAVE COM NOME NÃO ATRASA — a porta abre em verde; o cliente comemora.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-21 --source episodes/ATIVO-D1211-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-21 && bash tools/render_episode.sh ATIVO-D1211-21
```
