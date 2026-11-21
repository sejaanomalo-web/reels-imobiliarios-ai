# QA — ATIVO_GTA6_01 · "O corretor não vai conseguir jogar em paz" (edição especial GTA VI · roteiro 01 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_01.md`, extraído de `ATIVO_GTA_VI_50_Roteiros_Completos.pdf` (cliente, 21/11/2026).
- GANCHO, TAKES 01–03 e RECOMPENSA foram narrados palavra por palavra.
- Reel orgânico, verde do lote #02FB3F, logo no fecho.

**Esteira:** ESTILO 2 · DESENHO À MÃO (lousa/giz), kit `src/estilos/lousa.tsx`. Próximo estilo: 3 · Planta técnica.

## Agenda (pedido do cliente, 21/11/2026)
- GTA, 1 por dia às **22:00 (Brasília)**, de 21/11 a 29/11. **Este vai ao ar em 21/11 às 22:00.**
- A Action põe o post no próximo horário livre. Depois disso, o horário é ajustado para 22:00 na fila do Supabase (`ig_posts.agendado_para`).

## Apuração (21/11/2026)
- GTA VI foi lançado em 19/11/2026.
  - Data oficial anunciada pela Rockstar: [newswire](https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026).
  - O PDF do cliente traz as fontes [S3]/[S9].
- Vice City é a cidade fictícia do jogo.
- O restante do roteiro é **FICÇÃO/ANALOGIA**. Nada é mostrado como mecânica do jogo e não há spoilers.

## Direitos e identidade
- Nenhum asset do jogo: sem logo, captura, personagem, arte ou música. A política da Rockstar sobre conteúdo de fãs não cobre uso comercial ([S8] do PDF).
- "GTA VI" aparece só como texto, citado pelo nome.
- Todos os desenhos são originais, feitos a giz no código.
- A carteira e os imóveis mostrados são **FICTÍCIOS** e estão rotulados assim.

## CTA
- CTA natural do roteiro: "Manda para o corretor que vai passar mais tempo olhando casas do que cumprindo missões."
- Ela virou a transição narrada "E se esse corretor é você…", seguida da CTA SISTEMA (decisão do cliente: manter SISTEMA).
- A frase original foi reaproveitada no fim da legenda do Instagram.
- **A transição aguarda aprovação do cliente.**

## Voz
- Gemini `gemini-3.8-flash-tts`, Puck, 1,0×, `shapePauses`.
- Pronúncia: "GTA VI" → "GTA seis".
- Tomadas A e **B (usada sem edição)**.
  - A trocou "A cabeça" por "Na cabeça" e "Qual a metragem" por "Qual é a metragem".
  - B: 51,3 s de fala, 169 palavras/min, ASR 0,959.
- **Pontos para ouvir:**
  - "Qual a metragem": o "a" sai quase colado ("quala").
  - "Vice City", nome em inglês com pronúncia brasileira.
  - "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 53,67 s · −15,1 LUFS · TP < −1 dBTP.
- `editorial_check`: 0 erros / 0 avisos.
- Movimento 1,48; maior trecho parado 1,6 s. SFX: 24 eventos.
- Quadros revisados:
  - pontos de giz soltos removidos (traço com p=0 deixava um ponto, corrigido no kit);
  - palmeira que cruzava o prédio retirada;
  - mansão afastada da borda.
- **Legenda Instagram:** `legenda_check` ✓.

## Cenas
1. **GTA VI LANÇOU:** controle desenhado; um balão de pensamento com uma casa verde; EM PAZ? em vermelho.
2. **A MESMA CIDADE:** à esquerda, PESSOA NORMAL (carro e "explorar"); à direita, CORRETOR (prédio com a cobertura circulada em verde e o mar).
3. **A CABEÇA JÁ COMEÇA:**
   - perfil com "?" e o checklist VAGAS? / METRAGEM? / CHURRASQUEIRA?;
   - depois a MANSÃO, com câmera REC e "vídeo de captação".
4. **ESQUECE A MISSÃO:** velocímetro caindo ("fachada bonita"), gráfico de valorização subindo ("bairro novo"), MISSÃO riscada em vermelho.
5. **SAIU COM UMA CARTEIRA:**
   - pasta com 3 casas, CARTEIRA DE IMÓVEIS (FICTÍCIA);
   - carimbo DIAGNÓSTICO: CORRETOR;
   - "…e se for você?".
6. **CTA SISTEMA** + logo.
- **Capa:** em giz, controle → casa circulada; título "O corretor não vai jogar em paz".

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-01 --source episodes/ATIVO-GTA6-01/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-01 && bash tools/render_episode.sh ATIVO-GTA6-01
```
