# QA — ATIVO-D1202-15 · "Cinquenta mil a mais" (Esteira Editorial Diária · grade 02/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-02/ATIVO-D1202-15_cinquenta_mil_a_mais.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional; sem estatística. "Fica parado, o anúncio envelhece, o comprador desconfia e o preço cai" é observação de mercado, dita sem números; o rival é genérico (crítica ao método, não ao colega).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1202-15/narration_source.wav`.
- Narração 41,1 s · 175 palavras/min · ASR 0,975 (117/120). Vídeo 43,4 s.
- **Pontos para ouvir:**
  - "50 mil" e "30 dias" lidos por extenso pelo modelo; ritmo 175 palavras/min.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): tensao → seção respiro em None s (alvo 12.92 s); virada → seção b em 19.636 s (alvo 20.44 s); insight → seção a2 em 26.182 s (alvo 25.48 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.958 × mixagem 0.95 (queda 0.8 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.21 LUFS, TP -1.96 dBTP, LRA 3.00; narração -18.25 · trilha -28.46 · efeitos -40.61 LUFS; 27 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 43.44 s (timeline 43.43 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.23 LUFS · True peak ≤ -1 dBTP: -1.74 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 23.03 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o rival ficava atrás da legenda no gancho → subiu; a pasta VENDAS aparecia de lado → em pé; capa com selo encostando no título → descido.
- sistema_visual_check --quadros: 1 aviso de luminância (46 vs 45) no fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. A ligação — o dono ao telefone; O OUTRO CORRETOR aparece ao fundo; balão + R$ 50 MIL; o corretor A espantado.
2. Brigar pelo número? — cabo de guerra pela placa R$ +50 MIL; CAPTAÇÃO ≠ VENDA.
3. Fica parado — a casa com VENDE-SE; ACIMA DO MERCADO; o calendário vira (+30 → +60 dias); ANÚNCIO VELHO; o comprador desconfia (?); o preço cai de R$ 550 para R$ 470 MIL: ABAIXO DO SUGERIDO.
4. Mostre — NÃO DISCUTA A AVALIAÇÃO; a pasta VENDAS; VENDIDOS (verde) × ANUNCIADOS ✕.
5. Combine a regra — checklist A REGRA COM O DONO: 30 DIAS SEM VISITA · REVISAM O PREÇO · JUNTOS.
6. Desfecho — o rival com a ASSINATURA, apagando; corretor e dono com o calendário de 30 dias: DATA COMBINADA, carimbo VENDA.
7. CTA curta — campo COMENTE SISTEMA, ícones, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1202-15 --source episodes/ATIVO-D1202-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1202-15 && bash tools/render_episode.sh ATIVO-D1202-15
```
