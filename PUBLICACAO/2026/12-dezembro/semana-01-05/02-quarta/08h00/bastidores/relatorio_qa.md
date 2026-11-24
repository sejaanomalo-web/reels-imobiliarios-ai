# QA — ATIVO-D1202-08 · "O 13º e o ITBI" (Esteira Editorial Diária · grade 02/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-08_o_13_e_o_itbi.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território AGORA (radar; dataFato 30/11/2026) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 4.749/1965, art. 2º: 1ª parcela do 13º até 30/11 (em 2026, segunda-feira; Gazeta SP, Folha PE, InvestNews).
- ITBI 3% em São Paulo, Rio de Janeiro e Belo Horizonte (sites das prefeituras; SP tem regime reduzido sobre parte do financiado no SFH, não detalhado). Sem ITBI pago o cartório não conclui a transferência. Cartório: tabela estadual, sem número no vídeo.
- Na tela: ALÍQUOTA DAS PREFEITURAS · MUDA POR CIDADE e A ALÍQUOTA MUDA POR CIDADE · CONFIRA A SUA. A fala não diz que o 13º paga o ITBI ("pode começar essa reserva").

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-08/narration_source.wav`.
- Narração 47,4 s · 179 palavras/min · ASR 0,968 (135/141). Vídeo 49,7 s.
- **Pontos para ouvir:**
  - Ritmo 179 palavras/min (acima da faixa recente de 147–174): conferir se está dinâmico sem embolar.
  - "Às vezes dá": o reconhecedor ouviu só "Às vezes" — conferir se o "dá" está audível. "ITBI" lido como sigla.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 24.5 s (alvo 24.36 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.943 × mixagem 0.936 (queda 0.7 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.08 LUFS, TP -1.93 dBTP, LRA 2.00; narração -19.50 · trilha -26.89 · efeitos -41.07 LUFS; 24 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 49.71 s (timeline 49.70 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.10 LUFS · True peak ≤ -1 dBTP: -1.61 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 26.83 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o carimbo TRAVOU cobria o texto FINANCIAMENTO → subiu para entre as duas linhas da planta.
- Render 1: a folha da pergunta ficava ~3 s quase vazia → IMPOSTO/CARTÓRIO e NÃO É SÓ ISSO entram na fala "não é só quanto ele tem de entrada".
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O 13º CAIU: cômodo 13º (1ª PARCELA) e cota ATÉ 30/11.
2. A pergunta do cliente — DÁ PARA A ENTRADA?: seta verde do 13º para o cômodo ENTRADA; ÀS VEZES DÁ; chamada OUTRA CONTA.
3. Mergulho na ENTRADA → A COMPRA: PREÇO (R$ 400 MIL) · ITBI (3% · SP · RIO · BH; acende em = R$ 12 MIL) · CARTÓRIO (TABELA DO ESTADO).
4. Mergulho no ITBI → A TRANSFERÊNCIA: ITBI NÃO PAGO, porta fechada (vermelha) para a ESCRITURA (NÃO SAI); FINANCIAMENTO APROVADO parado; carimbo TRAVOU.
5. A pergunta certa — QUANTO TEM DE ENTRADA? · NÃO É SÓ ISSO · IMPOSTO SEPARADO? · CARTÓRIO SEPARADO? (acendem na palavra); o 13º e a chamada COMEÇA A RESERVA.
6. Desfecho — ITBI PAGO, porta aberta, ESCRITURA SAI (verde); CONTA FEITA ANTES DA VISITA; SEM SURPRESA NO CARTÓRIO.
7. CTA curta — PROJETO: SEU SISTEMA (imóveis, leads, atendimentos), campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-08 --source episodes/ATIVO-D1202-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-08 && bash tools/render_episode.sh ATIVO-D1202-08
```
