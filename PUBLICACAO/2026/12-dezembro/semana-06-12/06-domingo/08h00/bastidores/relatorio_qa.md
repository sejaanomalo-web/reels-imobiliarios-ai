# QA — ATIVO-D1206-08 · "A casa que vence" (Esteira Editorial Diária · grade 06/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-08_casa_que_vence.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Dado atribuído ao Ministério de Terras, Infraestrutura e Transportes do Japão (MLIT), via Japan Times e HousingJapan: idade média da casa na DEMOLIÇÃO de 32,1 anos (dado de 2008), contra 66,6 nos EUA. Não é limite físico (estimativa por sobrevivência ~65 anos); a fala diz 'é demolida, em média, com uns trinta e dois anos'. Vida útil fiscal de casa de madeira: 22 anos. O relatório original do MLIT não foi lido diretamente (fontes secundárias concordantes).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-08/narration_source.wav`.
- Narração 37,5 s · 182 palavras/min · ASR 0,955 (107/114). Vídeo 39,9 s.
- **Pontos para ouvir:**
  - Ritmo 182 palavras/min (rápido, dentro do preset); 'trinta e dois' e 'vinte e dois'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.455 s (alvo 17.72 s); insight → seção a2 em 24.0 s (alvo 24.68 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.921 × mixagem 0.921 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.96 dBTP, LRA 2.40; narração -20.29 · trilha -29.70 · efeitos -40.62 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.87 s (timeline 39.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 9.81 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Primeira prévia: maquete grande (carro fora do quadro), lotes muito verdes e placas sobre o título → câmera recuada, verde dos lotes a 30%, placas abaixadas; placa '32 anos' sai antes da dos EUA.
- Na transição para 'aqui' o lote do Japão fica verde por ~1 s (sem aviso do validador).
- motion_check 63,3% parados (câmera lenta com deriva), maior trecho parado 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: a casa e o carro com o tanque de VALOR que esvazia (CARRO: PERDE VALOR).
2. JAPÃO — a casa escurece e afunda: DEMOLIDA AOS ~32 ANOS (MÉDIA); a dos EUA: MAIS QUE O DOBRO.
3. NO IMPOSTO DE LÁ — CASA DE MADEIRA, 22 ANOS NO IMPOSTO; o lote acende: O TERRENO SEGURA O VALOR.
4. AQUI — AQUI É DIFERENTE; O QUE AINDA VAI VALER EM 10 ANOS?
5. O QUE SEGURA O PREÇO — LOCALIZAÇÃO, TERRENO, ESTRUTURA, MANUTENÇÃO; ACABAMENTO NOVO → ACABAMENTO ENVELHECE; ENDEREÇO acende.
6. CTA curta — módulos acendem, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-08 --source episodes/ATIVO-D1206-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-08 && bash tools/render_episode.sh ATIVO-D1206-08
```
