# QA — ATIVO-D1201-21 · "Exclusividade é compromisso" (Esteira Editorial Diária · grade 01/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-01/ATIVO-D1201-21_exclusividade_e_compromisso.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Código Civil, art. 726: concluído o negócio diretamente entre as partes, nenhuma remuneração é devida; ajustada a corretagem com exclusividade por escrito, o corretor tem direito à remuneração integral, ainda que realizado o negócio sem sua mediação, salvo se comprovada sua inércia ou ociosidade (Planalto; CRECI-ES; Migalhas; Projuris).
- Na tela: CÓDIGO CIVIL · ART. 726 e selo NÃO É ORIENTAÇÃO JURÍDICA durante toda a parte legal. A virada nega a leitura de comissão garantida.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1201-21/narration_source.wav`.
- Narração 44,8 s · 154 palavras/min · ASR 0,991 (114/115). Vídeo 47,1 s.
- **Pontos para ouvir:**
  - "provada" ouvido como "aprovada" pelo reconhecedor ("salvo se ficar provada a inércia") — conferir na escuta.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 21.04 s (alvo 21.48 s); descoberta → seção quebra em 25.04 s (alvo 25.08 s); insight → seção drop em 37.04 s (alvo 37.48 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.983 × mixagem 0.965 (queda 1.8 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.06 LUFS, TP -1.92 dBTP, LRA 2.50; narração -19.79 · trilha -26.92 · efeitos -40.06 LUFS; 25 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 47.10 s (timeline 47.10 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.08 LUFS · True peak ≤ -1 dBTP: -1.72 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.07 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: pílulas COMISSÃO DEVIDA e CÓDIGO CIVIL sobrepostas e SALVO INÉRCIA saindo pela borda esquerda no zoom → as duas foram para o centro, abaixo do contrato (y 1045); ícones do plano em coluna com as pílulas ao lado; fontes mínimas de 24 px.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — dono e corretor sob o holofote: MEDO DE EXCLUSIVIDADE; o corretor aponta: PEDIDO DO JEITO ERRADO.
2. A lei — A LEI PROTEGE O EXCLUSIVO: o contrato surge (CÓDIGO CIVIL · ART. 726, POR ESCRITO), o dono vende sozinho e a comissão acende (COMISSÃO DEVIDA).
3. A condição — MAS TEM UMA CONDIÇÃO: o cifrão vira um X, SALVO INÉRCIA em vermelho e o corretor parado fica cinza.
4. Virada — NÃO GARANTE A COMISSÃO → GARANTE A CHANCE DE TRABALHAR: o holofote fica verde e o corretor abre os braços.
5. Plano — PEÇA COM UM PLANO: O QUE VAI FAZER, EM QUANTO TEMPO, PRESTAR CONTAS, TODA SEMANA (um item por palavra).
6. Desfecho — NÃO É POSSE (POSSE DO IMÓVEL, cadeado) → É COMPROMISSO: o contrato e o corretor em verde, TRABALHO POR ESCRITO.
7. CTA curta — campo SISTEMA, módulos imóveis/leads/atendimentos e o logo ATIVO montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1201-21 --source episodes/ATIVO-D1201-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1201-21 && bash tools/render_episode.sh ATIVO-D1201-21
```
