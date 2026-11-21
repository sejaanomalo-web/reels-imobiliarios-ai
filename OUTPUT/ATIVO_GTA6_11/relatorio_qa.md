# QA — ATIVO_GTA6_11 · "O lugar mais estranho para morar em GTA VI" (edição especial GTA VI · roteiro 11 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_11.md`. Gancho, takes 01–03 e recompensa narrados palavra por palavra.
**Esteira:** estilo 4 · TIPOGRAFIA CINÉTICA. Próximo: 5 · Painel.
**Agenda:** 30/11/2026 às 22:00 (Brasília), ajustado no Supabase depois da Action.

## Apuração — FATO + HUMOR
- Fato: o material oficial ("Only in Leonida", Rockstar) apresenta Grassrivers como região de natureza e áreas alagadas, e Vice City como a área urbana com praia.
- Humor: "quem está olhando de dentro da água" é piada; não afirma nada sobre a fauna do jogo. Os olhos são estilizados.
- Sem imagem do jogo.

## CTA
- CTA natural: "Você moraria perto dos pântanos por uma semana?"
- Virou a transição "Na vida real, anúncio bom antecipa as perguntas.", seguida da CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×. Pronúncia ajustada: "Grassrivers" → "Grás-ríverz".
- ⚠️ **Só existe 1 tomada.** A tomada A (chave 2) saiu limpa: 48,9 s, 167 palavras/min, ASR 0,974. A tomada B falhou porque a **cota da chave 1 do Gemini acabou** (erro *quota exceeded*).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 51,3 s · −15,0 LUFS.
- `editorial_check` 0/0.
- Movimento 1,84. SFX: 18 eventos. `legenda_check` ✓.
- Ajustes depois da revisão dos quadros:
  - a fase anterior ficava "fantasma" atrás da lista de opostos;
  - a piscada dos olhos estava frequente demais.

## Cenas
1. **ONDE VOCÊ MORARIA?** Contorno "?", O ENDEREÇO / MAIS ESTRANHO / de Leonida… / **PÂNTANOS.**
2. **QUANDO SE FALA EM GTA VI:** contorno VICE, "todo mundo pensa em": PRAIA / PRÉDIOS.
3. **SÓ QUE TEM MAIS → O OPOSTO DA CIDADE:** GRASSRIVERS, natureza, áreas alagadas (ondas). Depois, vida noturna, trânsito e outdoors são riscados.
4. **IMAGINA O ANÚNCIO:**
   - card "contato direto com a natureza";
   - **QUAL NATUREZA?**;
   - "vista pro VERDE ✓" e "quem está olhando?", com olhos surgindo das ondas;
   - "NA VIDA REAL, ANÚNCIO BOM antecipa as perguntas."
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-11 --source episodes/ATIVO-GTA6-11/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-11 && bash tools/render_episode.sh ATIVO-GTA6-11
```
