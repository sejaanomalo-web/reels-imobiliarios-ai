# QA — ATIVO-D1213-08 · "O sinal e a desistência" (Esteira Editorial Diária · grade 13/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-13/ATIVO-D1213-08_o_sinal_e_a_desistencia.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Código Civil (Lei 10.406/2002), arts. 417–420: art. 418 — se quem deu as arras não cumpre, a outra parte pode reter; se quem recebeu não cumpre, devolve as arras mais o equivalente (com atualização, juros e honorários); art. 420 — com cláusula de arrependimento, as arras têm função só indenizatória, sem indenização suplementar.
- O STJ (REsp 1.927.986) registra que o CC/2002 trocou 'em dobro' por 'mais o equivalente'; o vídeo usa a redação da lei.
- Não é orientação jurídica de caso concreto; a legenda recomenda advogado em casos específicos.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1213-08/narration_source.wav`.
- Narração 35,7 s · 153 palavras/min · ASR 0,989 (90/91). Vídeo 38,3 s.
- **Pontos para ouvir:**
  - 'Código Civil' e 'equivalente'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.97 s); insight → seção climax em 22.12 s (alvo 22.13 s); resolucao → seção resolucao em None s (alvo 30.29 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.945 × mixagem 0.945 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.97 dBTP, LRA 3.00; narração -17.66 · trilha -27.76 · efeitos -40.35 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 38.34 s (timeline 38.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.16 LUFS · True peak ≤ -1 dBTP: -1.67 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.55 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Trilha: a T03 reprovou no portão de inteligibilidade (queda 6,6; 4,4 com ducking −11; T02 3,3). Diagnóstico segmento a segmento: só o 'E se o' do gancho era mascarado — a voz começava a 0,12 s, colada no ataque da trilha. Lead-in subido para 0,45 s (timeline refeita da voz congelada, sem nova geração) → T02 aprovada com queda 0,0.
- Prévia: no cômodo SINAL o título grande encostava em '= PREÇO DA DESISTÊNCIA' → cômodo maior e título menor.
- motion_check 15,2% parados, maior trecho 2,0 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE O VENDEDOR DESISTIR?: o contrato como planta; QUEM PAGOU (comprador) e QUEM RECEBEU (vendedor, em alerta).
2. A LEI JÁ RESPONDE — o cômodo SINAL; selo CÓDIGO CIVIL · ARTS. 417 A 420; a rota volta: DEVOLVE + O EQUIVALENTE.
3. QUEM PAGOU E DESISTE — PERDE O SINAL.
4. COM ARREPENDIMENTO, MUDA — chamada CLÁUSULA DE ARREPENDIMENTO; SINAL = PREÇO DA DESISTÊNCIA.
5. Mergulho no SINAL → DEIXE ESCRITO: O VALOR / PARA QUE ELE SERVE / TEM ARREPENDIMENTO?
6. PAPEL VIRA COMPROMISSO — cota SEM PAPEL: BRIGA → ESCRITO: COMPROMISSO.
7. Fecho — CtaPlanta com os cômodos do sistema, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1213-08 --source episodes/ATIVO-D1213-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1213-08 && bash tools/render_episode.sh ATIVO-D1213-08
```
