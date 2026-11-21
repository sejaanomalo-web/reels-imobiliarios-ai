# QA — ATIVO_GTA6_09 · "Essa cobertura vende sozinha? Não em Vice City" (edição especial GTA VI · roteiro 09 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_09.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 4 · TIPOGRAFIA CINÉTICA. O próximo é o 5 · Painel.
**Agenda:** 28/11/2026 às 22:00 (Brasília). O horário é ajustado no Supabase depois da Action.

## Apuração
- Tipo: ANALOGIA/DEMONSTRAÇÃO. A cobertura é FICTÍCIA e não tem imagem.
- A ordem de abertura proposta é opinião editorial. Não promete resultado de vendas e não usa números.

## CTA
- A CTA natural do roteiro ("Qual das duas aberturas te faria parar de rolar?") virou a transição "Na vida real, cada imóvel merece uma ficha completa.", seguida da CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×. **Usei a tomada B:** 49 s, 162 palavras/min, ASR 0,951.
- A tomada A disse "Imagine" e engoliu "até num".
- **Ponto para ouvir:** "Só no final entra metragem e garagem". As duas tomadas soam como "entra a metragem", com um "a" a mais.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 51,3 s · −14,9 LUFS.
- `editorial_check`: 0 erros, 0 avisos.
- Movimento 1,82, com o maior trecho parado de 1,2 s. SFX: 20 eventos. `legenda_check` ✓.
- Ajuste: a margem esquerda passou para x 130 e o drift caiu para 8, porque o texto encostava na borda.

## Cenas
1. **EU VOU PROVAR:** contorno "VS" → COBERTURA (verde) absurda × ANÚNCIO **RUIM.**
2. **IMAGINA A COBERTURA → AGORA, A LEGENDA:** "vista pro MAR", JANELAS ENORMES, COLEÇÃO DE CARROS → LEGENDA: "lindo imóvel, ótima localização." digitada → "…sério?".
3. **VOCÊ APAGOU A VISTA:** IMPRESSIONANTES riscado → virou **QUALQUER APÊ** da internet.
4. **ABRA PELO QUE SE SENTE:** FAÇA O CONTRÁRIO: 1 PAISAGEM · 2 PÔR DO SOL · 3 COMO É VIVER ALI · 4 METRAGEM · GARAGEM (só no final) → a **HISTÓRIA** muda tudo → NA VIDA REAL: **FICHA COMPLETA.**
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-09 --source episodes/ATIVO-GTA6-09/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-09 && bash tools/render_episode.sh ATIVO-GTA6-09
```
