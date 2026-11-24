# QA — ATIVO-D1201-18 · "Sete dias para desistir" (Esteira Editorial Diária · grade 01/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-01/ATIVO-D1201-18_sete_dias_para_desistir.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 13.786/2018 (Lei do Distrato), §10 do art. 67-A da Lei 4.591/1964: contratos firmados em estandes de vendas e fora da sede do incorporador permitem arrependimento em 7 dias, com devolução dos valores pagos (IRIB; Jus Navigandi; Migalhas/IRIB; PUC-Rio).
- Corretagem incluída na devolução: parte da doutrina (dita como "parte dos especialistas"; placa com interrogação). Escopo: imóvel na planta, estande ou fora da sede. Selo NÃO É ORIENTAÇÃO JURÍDICA.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1201-18/narration_source.wav`.
- Narração 42,5 s · 167 palavras/min · ASR 0,958 (113/118). Vídeo 44,8 s.
- **Pontos para ouvir:**
  - "Distrato" ouvido como "destrato" pelo reconhecedor; "estande" como "stand"; "empurrado" como "empurra" — conferir na escuta.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 24.0 s (alvo 23.0 s); insight → seção a2 em 34.909 s (alvo 36.68 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.966 × mixagem 0.992 (queda -2.6 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.93 dBTP, LRA 3.10; narração -18.44 · trilha -27.65 · efeitos -40.84 LUFS; 23 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 44.80 s (timeline 44.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.18 LUFS · True peak ≤ -1 dBTP: -1.55 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.1 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o estande parecia um banco → placa ESTANDE DE VENDAS no gancho; placas da lei subiam até o cabeçalho → mais baixas; o DIA 8 e o prédio saíam do quadro → câmeras abertas; o prédio deixou de acender (verde só no 8º dia e no corretor).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — ESTANDE DE VENDAS, comprador e corretor, contrato que acende (CONTRATO ASSINADO); E SE DESISTIR?; o prédio em obra brota (IMÓVEL NA PLANTA).
2. A lei — LEI DO DISTRATO · 2018; ESTANDE OU FORA DA SEDE; os 7 blocos do calendário: 7 DIAS PARA SE ARREPENDER.
3. A devolução — o fluxo volta do estande ao comprador: DEVOLUÇÃO DO QUE PAGOU · INCLUSIVE CORRETAGEM?
4. Virada — o calendário de cima, os 7 dias clareiam e brota o DIA 8.
5. Pressão — o corretor aponta (fluxo vermelho): PRESSÃO · SAI CARO; o comprador vai para perto dos dias: UMA SEMANA PARA PENSAR.
6. Desfecho — o 8º dia acende, o prédio fica de pé, comprador e corretor juntos: DE PÉ NO 8º DIA.
7. CTA curta — módulos do sistema, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1201-18 --source episodes/ATIVO-D1201-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1201-18 && bash tools/render_episode.sh ATIVO-D1201-18
```
