# QA — ATIVO_GTA6_06 · "O aluguel mais suspeito do GTA VI" (edição especial GTA VI · roteiro 06 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_06.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 1 · PALITINHO, no 2º ciclo da esteira. O próximo é o 2 · Desenho à mão.
**Agenda:** 25/11/2026 às 22:00 (Brasília), ajustado no Supabase depois da Action.

## Apuração (21/11/2026) — FATO OFICIAL
- O perfil oficial de GTA VI no site da Rockstar diz que Brian Heder deixa Jason morar sem pagar aluguel em um de seus imóveis. Fontes: [Leonida Keys](https://www.rockstargames.com/VI/leonida-keys), [Jason](https://www.rockstargames.com/VI/jason), [Brian](https://www.rockstargames.com/VI/brian).
- A condição é que Jason ajude Brian em *local shakedowns* (o roteiro traduz como "cobranças locais") e apareça de vez em quando para a sangria de Lori.
- Brian é um contrabandista que ainda escoa "produto" pelo próprio estaleiro nas Keys. O roteiro diz "opera negócios no litoral de Leonida".
- Jason é um dos dois protagonistas.
- **Nota:** "cobranças locais" suaviza *shakedowns*, que significa extorsão. É uma tradução aceitável no contexto e não é falsa.

## Direitos
- Os personagens aparecem como bonecos GENÉRICOS rotulados INQUILINO e PROPRIETÁRIO, sem a arte do jogo.
- O contrato e os valores são FICTÍCIOS.

## CTA
- CTA natural: "Você aceitaria morar de graça nessa condição?"
- Virou a transição "Fora do jogo, contrato bom é contrato claro." e depois a CTA SISTEMA.
- A pergunta original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×.
- Pronúncias: "GTA VI" → "GTA seis"; "Jason" → "Djêison"; "Brian Heder" → "Bráian Réder".
- **Usei a tomada A.** Tomadas:
  - **A (usada):** sem desvios de texto; 48,2 s; 168 palavras/min; ASR 0,933. O ASR erra nomes próprios, mas o texto falado confere.
  - **B:** disse "no imóvel" e engoliu "colocaria".
- **Pontos para ouvir:** "Heder" (sai "Réder") e "Leonida".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 50,47 s · −14,95 LUFS.
- `editorial_check` 0/0.
- Movimento 2,07, o maior trecho parado tem 1,3 s. SFX: 20 eventos. `legenda_check` ✓.
- Quadros: o balão "R$ 0!" e as placas foram afastados das bordas, e o barco do litoral foi reduzido e saiu de cima do proprietário.

## Cenas
1. **O PIOR ACORDO DE ALUGUEL:** casinha desenhada, INQUILINO × PROPRIETÁRIO, e **ALUGUEL: R$ 0** revelado aos ~2,5 s.
2. **MORA SEM PAGAR:** o inquilino anda até a casa com o balão "R$ 0!", comemora, a casa fica verde e aparece ✓ SEM ALUGUEL.
3. **SÓ QUE… DESDE QUE:**
   - o proprietário se aproxima: "Não é caridade…" → "Desde que…";
   - DESCRIÇÃO OFICIAL DO JOGO;
   - carimbo **CONDIÇÃO: COBRANÇAS LOCAIS**;
   - barco e ondas com NEGÓCIOS NO LITORAL.
4. **NENHUM CONTRATO SÉRIO → LEIA AS LETRAS MIÚDAS:**
   - CONTRATO FICTÍCIO com "Aluguel R$ 0 / Condição ???" e o carimbo CONDIÇÃO SUSPEITA;
   - ✕ NENHUM CORRETOR SÉRIO FARIA → BOA DEMAIS?;
   - uma lupa passa pelas linhas e revela "cobranças…" → ESPECIALMENTE EM VICE CITY.
5. **CONTRATO BOM É CLARO:** o contrato fica verde com "Condições: claras" e ✓ CONTRATO CLARO.
6. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-06 --source episodes/ATIVO-GTA6-06/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-06 && bash tools/render_episode.sh ATIVO-GTA6-06
```
