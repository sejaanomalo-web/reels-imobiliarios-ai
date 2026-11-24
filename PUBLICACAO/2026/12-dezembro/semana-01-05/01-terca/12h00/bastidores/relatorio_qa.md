# QA — ATIVO-D1201-12 · "A nota fiscal do aluguel" (Esteira Editorial Diária · grade 01/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-01/ATIVO-D1201-12_nota_fiscal_do_aluguel.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território AGORA (radar; dataFato 01/12/2026) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Ato Conjunto RFB/CGIBS nº 4/2026 (DOU 31/07/2026): NFS-e obrigatória para locação, cessão onerosa e arrendamento de imóveis a partir de 01/12/2026; Simples Nacional a partir de 01/01/2027 (Conjur 11/11/2026; Noviello Advocacia; Juscon; DePaiva).
- LC 214/2025: pessoa física contribuinte de IBS/CBS na locação acima de R$ 240 mil no ano anterior e com mais de 3 imóveis; leitura divergente sobre a emissão da nota pela pessoa física (dita na fala e na tela).
- **Risco registrado:** o layout técnico (NT 009) ainda não estava em produção em novembro; se a data for adiada até 30/11, o slot deve ser refeito ou retirado. Selo INFORMATIVO · NÃO É ORIENTAÇÃO CONTÁBIL.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1201-12/narration_source.wav`.
- Narração 50,6 s · 170 palavras/min · ASR 0,965 (138/143). Vídeo 52,9 s.
- **Pontos para ouvir:**
  - "1º de dezembro" lido "primeiro de dezembro"; "2027" por extenso (pronúncias do episódio).

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 32.65 s (alvo 33.32 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.937 × mixagem 0.937 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.03 LUFS, TP -1.95 dBTP, LRA 2.20; narração -20.29 · trilha -27.66 · efeitos -41.25 LUFS; 23 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 52.91 s (timeline 52.90 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.04 LUFS · True peak ≤ -1 dBTP: -1.74 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 29.3 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: cotas do Simples e da pessoa física passavam por cima dos títulos dos cômodos → descidas para a base dos cômodos.
- Transições trocadas de fade por mergulho (na NFS-e e no cômodo PESSOA FÍSICA).
- Final 1: as 4 perguntas e o CONTADOR ficavam verdes juntos (5 verdes; o Nível 1 permite 2) → cada pergunta acende só no seu momento (render 2).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — prédio de aluguel em planta, a nota (NFS-e) na porta; só o APTO 2 fica firme: NÃO PARA TODO MUNDO.
2. Calendário — 07/2026 (ato publicado) → 01/12/2026 (verde) → 01/2027 (Simples); NFS-e · LOCAÇÃO DE IMÓVEL acende (SEGUNDO ATO CONJUNTO RFB/CGIBS Nº 4/2026).
3. Quem emite — EMPRESA (sem piso, sem mínimo; acende) · SIMPLES NACIONAL (a partir de 01/2027) · PESSOA FÍSICA (+R$ 240 MIL/ANO · +3 IMÓVEIS · LEITURA DIVERGENTE).
4. Depende de quem aluga — as 4 perguntas (é empresa? é do Simples? quantos imóveis? quanto por ano?) acendem uma a uma; rota até o CONTADOR (quem responde).
5. CTA curta — CtaPlanta (campo SISTEMA, logo assinado).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1201-12 --source episodes/ATIVO-D1201-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1201-12 && bash tools/render_episode.sh ATIVO-D1201-12
```
