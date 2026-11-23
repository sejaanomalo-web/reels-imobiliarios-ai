# QA — ATIVO-D1129-21 · "Visita não é cortesia" (Esteira Editorial Diária · grade 29/11/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-29/ATIVO-D1129-21_visita_nao_e_cortesia.md` (aprovado pelo cliente em 23/11/2026; processo completo autorizado, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- NAR Settlement FAQ (out/2024) e Florida Realtors: desde 17/08/2024, quem participa do MLS e atende comprador precisa de acordo escrito antes de mostrar o imóvel, inclusive em visita por vídeo ao vivo, com a remuneração definida.
- Código Civil, art. 727 (comissão devida quando o negócio se realiza depois, como fruto da mediação). Jurisprudência via agregadores (sem número de processo no vídeo).
- Limites respeitados: "regra" (do acordo da NAR) e não "lei federal"; selo NÃO É ORIENTAÇÃO JURÍDICA no capítulo da prova; nada diz que a ficha "garante" a comissão.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1129-21/narration_source.wav`.
- Narração 55,2 s · 177 palavras/min · ASR 0,994 (162/163). Vídeo 59,1 s.
- **Pontos para ouvir:**
  - "2024" lido "dois mil e vinte e quatro" (pronúncia do episódio); cauda de 3,8 s no fecho.

## Som
- Trilha **sintetizada** (as 5 faixas do catálogo estão como `referencia` e não vão ao ar). Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.17 LUFS, TP -1.96 dBTP, LRA 3.30; narração -20.81 · trilha -35.29 · efeitos -40.18 LUFS; 19 eventos de efeito.

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 59.14 s (timeline 59.13 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.18 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.31 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a pílula EUA ficava sobre o contrato → foi para cima da porta; o papel do acordo foi para cima do comprador.
- O dono saía cortado na borda e, na troca de cena, apareciam dois corretores → o zoom permanente do travelling foi zerado e as posições refeitas (o corretor fica exatamente onde a cena da balança começa).
- O papel verde do registro saía do quadro → agora fica dentro da porta da direita, com o corretor entre as portas.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho (EUA) — a maçaneta trava, o papel surge entre corretor e comprador: SEM CONTRATO, SEM VISITA.
2. Regra — DESDE 08/2024 · ACORDO ANTES DA VISITA: até por vídeo, duas assinaturas verdes, campo REMUNERAÇÃO; a porta abre em luz.
3. Brasil — travelling sem corte até a porta já aberta: NO BRASIL, NA CONVERSA; balões que somem.
4. Perda — o comprador vai até o dono (FECHOU DIRETO) e a luz apaga com âncora no corretor.
5. Prova — a balança: CÓDIGO CIVIL · ART. 727, a comissão pesa de um lado, PROVA? do outro; COMO PROVAR?; selo NÃO É ORIENTAÇÃO JURÍDICA.
6. Ficha — FICHA DE VISITA · MENSAGENS · PROPOSTA caem no prato e acendem; somem em "Sem elas" e sobra SÓ A SUA PALAVRA.
7. Tese — duas portas: LÁ · REGRA × AQUI · VOCÊ; VISITA NÃO É CORTESIA → VISITA É TRABALHO; o registro se desenha em verde (REGISTRADO ANTES).
8. CTA curta — CtaNoir (campo SISTEMA, órbita IMÓVEIS · LEADS · ATENDIMENTOS, logo em partículas).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); trilha e efeitos sintetizados por `tools/build_audio.py`. Nenhuma música ou efeito externo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1129-21 --source episodes/ATIVO-D1129-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1129-21 && bash tools/render_episode.sh ATIVO-D1129-21
```
