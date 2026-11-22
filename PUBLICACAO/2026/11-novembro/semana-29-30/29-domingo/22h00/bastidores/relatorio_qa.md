# QA — ATIVO_GTA6_10 · "O primeiro atendimento do corretor de Vice City" (edição especial GTA VI · roteiro 10 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_10.md`. Gancho, takes 01–03 e recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 1 · PALITINHO. O próximo é o 2 · Desenho à mão.
**Agenda:** 29/11/2026 às 22:00 (Brasília). O horário é ajustado no Supabase depois da Action. Dia 29 completo: L60_01 às 8h, L60_02 às 10h e GTA às 22h.

## Apuração
- FICÇÃO/ESQUETE, sem nenhum fato oficial.
- "Nível de procurado" é uma piada com a mecânica clássica da série. As estrelas são genéricas e o vídeo não usa a interface do jogo.
- A perseguição é desenhada a traço, sem violência.

## CTA
- A CTA natural do roteiro ("Marca quem atenderia esse plantão de domingo") virou a transição "Na vida real, plantão cheio pede lead organizado.", seguida da CTA SISTEMA.
- A frase original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×. Usei a **tomada B**: 43,3 s, 168 palavras/min, ASR 0,992.
- A tomada A dizia "num faltou" no lugar de "não faltou".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 45,6 s · −14,9 LUFS.
- `editorial_check` 0/0. Movimento 1,40. SFX: 18 eventos. `legenda_check` ✓.
- Quadros revisados:
  - balões, janela e placas foram afastados da borda esquerda;
  - os números 1/2/3, que sobrepunham os balões, foram removidos.

## Cenas
1. **UMA SEMANA DE PLANTÃO:** corretor verde, a placa "PLANTÃO · VICE CITY (FICÇÃO)" e os dias S T Q Q S S D ficando vermelhos, até aparecer "✕ NÃO AGUENTARIA".
2. **TRÊS LEADS:** três balões em cascata:
   - "Casa perto da praia";
   - "Cobertura com heliponto";
   - "A rua é segura?", em vermelho.
3. **ABRE A JANELA:** dois carros passam em perseguição, com luz piscando, na frente da casa marcada como RECÉM-CADASTRADO.
4. **A RESPOSTA:**
   - "Localização excelente…" e "…varia com o nível de procurado", com ★★★☆☆;
   - NO FIM DO MÊS: VISITAS ✓✓✓✓ e COMPRADORES FORA DO CARRO: 0, com um carro e duas cabeças dentro;
   - E NA VIDA REAL?: ✓ LEAD ORGANIZADO (interesse, região, próximo passo).
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-10 --source episodes/ATIVO-GTA6-10/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-10 && bash tools/render_episode.sh ATIVO-GTA6-10
```
