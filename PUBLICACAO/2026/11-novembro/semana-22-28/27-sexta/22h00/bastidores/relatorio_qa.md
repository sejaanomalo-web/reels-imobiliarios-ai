# QA — ATIVO_GTA6_08 · "GTA VI não é apenas Vice City" (edição especial GTA VI · roteiro 08 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_08.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 3 · PLANTA TÉCNICA. O próximo estilo é o 4 · Tipografia cinética.
**Agenda:** 27/11/2026 às 22:00 (Brasília). O horário é ajustado no Supabase depois que a Action roda.

## Apuração (21/11/2026) — FATO OFICIAL
- O site oficial da Rockstar ("Only in Leonida") apresenta o estado fictício de Leonida com estas regiões: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia e Mount Kalaga.
- As paisagens vão do urbano ao litoral, pântano e interior.
- Fontes: [site oficial](https://www.rockstargames.com/VI/only-in-leonida), [thegameswiki](https://thegameswiki.com/gta6/wiki/map-and-regions), [allthings.how](https://allthings.how/gta-6-map-locations-every-confirmed-region-in-leonida/).
- **Não existe mapa oficial completo.** O mapa do vídeo é ESQUEMÁTICO e original, com as posições das regiões aproximadas. Ele aparece rotulado na tela como "esquema ilustrativo".
- A transição "cada região atrai um perfil diferente" é uma generalização de mercado. Não cita números.

## CTA
- CTA natural do roteiro: "Qual região você exploraria primeiro?".
- Virou a transição "Na vida real, cada região atrai um perfil diferente.", seguida da CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- **A transição aguarda aprovação.**

## Voz
- Puck, 1,0×.
- Pronúncias ajustadas: "Leonida Keys" → "Leonida Quís", "Grassrivers" → "Grás-ríverz", "Port Gellhorn" → "Pórt Guélhorn", "Mount Kalaga" → "Máunt Kalága".
- **Usei a tomada A** (47,6 s, 175 palavras/min, ASR 0,961). Ela teve os nomes mais limpos. A B disse "Mount Halaga".
- **Ponto para ouvir:** a sequência de nomes estrangeiros.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 49,9 s · −15,0 LUFS.
- `editorial_check`: 0/0.
- Movimento 3,15; maior trecho parado 0,9 s. SFX: 22 eventos. `legenda_check` ✓.
- Correções feitas nos quadros:
  - cota que encostava no título;
  - chamadas que cruzavam o mapa;
  - o carimbo final ficava sobre o mapa (o mapa agora fica mais apagado);
  - texto redundante na capa.

## Cenas
1. **NÃO É SÓ VICE CITY:** cômodo "VICE CITY" sozinho com a cota "O QUE TODO MUNDO VÊ" e a chamada "SÓ ISSO?".
2. **O JOGO É LEONIDA:** zoom-out até o contorno do estado, com a cota "LEONIDA · ESTADO FICTÍCIO · ESQUEMA ILUSTRATIVO" e a chamada "MUITO MAIOR".
3. **REGIÕES BEM DIFERENTES:** as ilhas das Keys, Grassrivers, Port Gellhorn, Ambrosia e Mount Kalaga aparecem no tempo da fala. Depois vêm as chamadas URBANO / LITORAL / PÂNTANO / INTERIOR.
4. **PRA QUEM GOSTA DE EXPLORAR:**
   - rota tracejada que atravessa o estado;
   - "MESMA RUA", riscado, contra "OUTRO ESTILO DE VIDA";
   - "INÍCIO: MAR", seguido de uma rota perdida no interior e da chamada "VISTA MELHOR?".
5. **E NA VIDA REAL?:** carimbo "PROJETO: PERFIL POR REGIÃO".
6. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-08 --source episodes/ATIVO-GTA6-08/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-08 && bash tools/render_episode.sh ATIVO-GTA6-08
```
