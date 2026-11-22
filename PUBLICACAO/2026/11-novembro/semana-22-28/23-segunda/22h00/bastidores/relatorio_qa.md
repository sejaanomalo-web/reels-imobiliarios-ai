# QA — ATIVO_GTA6_04 · "Eu captaria essa casa antes de começar a missão" (edição especial GTA VI · roteiro 04 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_04.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 4 · TIPOGRAFIA CINÉTICA (`src/estilos/tipografia.tsx`). O próximo é o 5 · Painel.
**Agenda:** 23/11/2026 às 22:00 (Brasília), ajustado no Supabase depois da Action.
**Ordem:** o roteiro 03 (Miami × Vice City) ficou **bloqueado**. Ele precisa de uma foto REAL de Miami com licença; sem ela, a revelação "uma era Miami" seria falsa. O próprio PDF diz que a ordem não é obrigatória.

## Apuração
- SÁTIRA/SIMULAÇÃO. Vice City é a cidade fictícia de GTA VI. A casa é imaginária e não tem imagem.
- "Missão criminosa" é uma piada com a premissa do jogo e não tem violência visual.

## CTA
- CTA natural: "Qual imóvel fictício você teria coragem de captar?"
- Virou a transição "Já na vida real, captação pede organização." e depois a CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×. Pronúncias definidas: "GTA VI" → "GTA seis" e "Reel" → "Ríl".
- **Usei a tomada A.** Tomadas:
  - **A (usada):** 52 s, 175 palavras/min, ASR 0,973.
  - **B:** limpa, mas 60 s e mais lenta.
- **Ponto para ouvir:** "Reel" sai como "Ríl", e o ASR ouviu "rio". Na legenda falada aparece "Reel".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 52,47 s · −14,9 LUFS.
- `editorial_check` 0/0. Movimento 1,78. SFX: 23 eventos. `legenda_check` ✓.
- Quadros revisados:
  - o texto foi afastado da borda esquerda (x 110) e o zoom da câmera foi reduzido;
  - "ORGANIZAÇÃO." estava cortado à direita; a fonte foi reduzida e a entrada passou a vir de baixo.

## Cenas
1. **SE EU TRABALHASSE EM VICE CITY:** contorno gigante "VICE" → A PRIMEIRA **CASA** (verde) → "que eu captaria." → SEM PENSAR DUAS VEZES.
2. **NÃO É PREÇO NEM TAMANHO:** A MAIS CARA e A MAIOR riscados → **TRÊS COISAS QUE PARAM**, com o contorno "3": 1 FACHADA (marcante), 2 LOCALIZAÇÃO (reconhecível), 3 HISTÓRIA (fácil de contar).
3. **IMAGINA O TOUR:** aspas gigantes, "você abre a **JANELA**… com a **PRAIA** a poucos minutos" → **PRONTO.** → REC · 1ª CENA DO REEL.
4. **A PEGADINHA:** PROPRIETÁRIO: PESSOA COMUM ou… **MISSÃO CRIMINOSA** (vermelho, tremendo) → CAPTAÇÃO riscada, "antes do 1º encontro" → PRIORIDADE: **CONTINUAR VIVO.** → NA VIDA REAL, captação pede **ORGANIZAÇÃO.**
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-04 --source episodes/ATIVO-GTA6-04/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-04 && bash tools/render_episode.sh ATIVO-GTA6-04
```
