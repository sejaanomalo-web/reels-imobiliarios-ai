# QA — ATIVO-D1209-12 · "A caneca que vale o dobro" (Esteira Editorial Diária · grade 09/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-12_a_caneca_que_vale_o_dobro.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Kahneman, Knetsch & Thaler (1990), 'Experimental Tests of the Endowment Effect and the Coase Theorem', Journal of Political Economy 98(6): canecas dadas a metade dos participantes, mercado entre eles; donos pediam cerca de US$ 7, compradores ofereciam cerca de US$ 3 (resumos secundários).
- A fala e a tela dizem só 'mais que o dobro', sem cifra; selo 'KAHNEMAN, KNETSCH & THALER · 1990'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-12/narration_source.wav`.
- Narração 37,0 s · 165 palavras/min · ASR 0,980 (100/102). Vídeo 39,3 s.
- **Pontos para ouvir:**
  - 'mil novecentos e noventa' e 'efeito dotação'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 17.0 s (alvo 17.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.98 × mixagem 0.951 (queda 2.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.03 LUFS, TP -1.96 dBTP, LRA 2.80; narração -18.60 · trilha -26.04 · efeitos -40.93 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.34 s (timeline 39.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.04 LUFS · True peak ≤ -1 dBTP: -1.63 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.51 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a barra PEDIA surgia meio segundo depois do título e a prancha ficava vazia → a barra entra na palavra 'ganhou'.
- motion_check 16,8% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA CANECA VALE O DOBRO?: a caneca em elevação se desenha; cota ×2 acende.
2. METADE GANHA A CANECA — COM CANECA × SEM CANECA; a rota UM MERCADO ENTRE ELES.
3. QUEM TEM PEDE MAIS — barras PEDIA × PAGARIA com a cota MAIS QUE O DOBRO.
4. O EFEITO DOTAÇÃO — mergulho na barra PEDIA.
5. E UMA CASA DE 20 ANOS? — a planta da casa do proprietário; VINTE ANOS DE HISTÓRIA; OUÇA A HISTÓRIA PRIMEIRO (rota pelos cômodos).
6. DEPOIS, O MERCADO — três fichas VENDIDA acendem (PARECIDAS); ELE SENTE O PREÇO; fecho SISTEMA na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-12 --source episodes/ATIVO-D1209-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-12 && bash tools/render_episode.sh ATIVO-D1209-12
```
