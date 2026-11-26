# QA — ATIVO-D1209-18 · "O que ficou registrado" (Esteira Editorial Diária · grade 09/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-18_o_que_ficou_registrado.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Basílica da Sagrada Família (sagradafamilia.org): primeira pedra em 19/03/1882; Gaudí assumiu em 1883 e morreu em 1926; em julho de 1936 queimaram planos e fotografias e quebraram as maquetes de gesso; a obra seguiu com o material salvo do ateliê e peças reconstruídas a partir de plantas e fotos publicadas.
- Torre de Jesus Cristo, a mais alta (~172 m): cruz instalada em 20/02/2026 (Vatican News, Euronews). A fala diz 'a torre mais alta só ficou pronta este ano' (publicação em dez/2026); a basílica ainda tem obras previstas, o vídeo não diz que ela terminou.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-18/narration_source.wav`.
- Narração 35,4 s · 149 palavras/min · ASR 0,977 (86/88). Vídeo 37,8 s.
- **Pontos para ouvir:**
  - 'mil oitocentos e oitenta e dois', 'Gaudí' e 'mil novecentos e vinte e seis'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 16.68 s); insight → seção climax em 22.12 s (alvo 22.28 s); resolucao → seção resolucao em None s (alvo 29.56 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.966 × mixagem 0.966 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.22 LUFS, TP -1.92 dBTP, LRA 3.10; narração -19.38 · trilha -29.76 · efeitos -40.77 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 37.78 s (timeline 37.77 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.22 LUFS · True peak ≤ -1 dBTP: -1.64 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.08 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: câmera perto demais das torres (encostavam no cabeçalho), placas altas, arquiteto cortado, ateliê surgia tarde e a câmera ia longe na reconstrução → câmera mais afastada, placas mais baixas, ateliê antecipado.
- 1º render: a torre central cobria o título 'O autor se foi' por ~2 s → câmera mais afastada nesse trecho e novo render.
- motion_check 43,0% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA OBRA DE 144 ANOS: as torres de argila brotam; COMEÇOU EM 1882; a torre central sobe e acende: TORRE MAIS ALTA: 2026.
2. 1926 — o boneco do arquiteto se apaga: 1926 · LONGE DO FIM.
3. 1936 — no ateliê: DESENHOS QUEIMADOS; as maquetes de gesso se partem (MAQUETES DE GESSO QUEBRADAS).
4. A VIRADA — OS PEDAÇOS, FOTOS E PLANTAS PUBLICADAS voltam em arcos para a obra: A OBRA CONTINUOU.
5. NO SEU ATENDIMENTO — SÓ NA SUA CABEÇA? O corretor apaga: PARA QUANDO VOCÊ PARA.
6. A LIÇÃO — REGISTRE: o documento acende e passa para o colega (PARA OUTRO TERMINAR); fecho SISTEMA.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-18 --source episodes/ATIVO-D1209-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-18 && bash tools/render_episode.sh ATIVO-D1209-18
```
