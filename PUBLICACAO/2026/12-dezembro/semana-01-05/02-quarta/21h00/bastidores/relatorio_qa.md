# QA — ATIVO-D1202-21 · "A visita maior que a foto" (Esteira Editorial Diária · grade 02/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-21_a_visita_maior_que_a_foto.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Tese por raciocínio (expectativa × experiência); sem estatística. A crítica é à promessa exagerada, não à foto bem-feita.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-21/narration_source.wav`.
- Narração 44,1 s · 173 palavras/min · ASR 0,992 (126/127). Vídeo 46,5 s.
- **Pontos para ouvir:**
  - Ritmo 173 palavras/min; "ângulo" e "silêncio".

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): tensao → seção respiro em None s (alvo 8.2 s); virada → seção b em 19.636 s (alvo 20.52 s); insight → seção a2 em 37.09 s (alvo 38.04 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.976 × mixagem 0.961 (queda 1.5 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.08 LUFS, TP -1.95 dBTP, LRA 3.50; narração -17.44 · trilha -26.82 · efeitos -39.72 LUFS; 24 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 46.48 s (timeline 46.47 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.11 LUFS · True peak ≤ -1 dBTP: -1.72 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.47 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a moldura girada encostava no título → menor e mais baixa; a foto esmaecida e a pílula da cena da porta ficavam atrás do título → descidas; uma pílula cobria o corpo da figura → para a lateral; a miniatura da foto no AO VIVO tocava o título → descida.
- Movimento: 49% de quadros parados (Pictograma com travelling suave; maior trecho parado 1,1 s).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A FOTO NÃO VENDE O IMÓVEL / ELA VENDE A VISITA: a moldura brilha diante da figura.
2. Promete demais — a moldura estica (LENTE QUE ESTICA), ganha um sol (CÉU TROCADO), gira e esconde a parede (ÂNGULO QUE ESCONDE); A VENDA MORRE NA PORTA.
3. A porta — travelling até a porta: o cômodo é menor que a foto (O QUE A FOTO PROMETEU ao fundo); a figura encolhe; a lupa e os X: DEFEITO EM TUDO.
4. O contrário — FOTO = IMÓVEL: a figura entra num cômodo igual à foto; EXPECTATIVA CERTA; CHANCE DE SURPREENDER (verde).
5. Guarde para o ao vivo — MOSTRE COMO ELE É; LUZ DA TARDE · A VISTA · O SILÊNCIO acendem na palavra.
6. Desfecho — VISITA MAIOR QUE A FOTO: o cômodo cresce em verde e a moldura some.
7. CTA curta — campo SISTEMA, módulos, logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-21 --source episodes/ATIVO-D1202-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-21 && bash tools/render_episode.sh ATIVO-D1202-21
```
