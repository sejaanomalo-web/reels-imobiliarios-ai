# QA — ATIVO_L60_01 · "O que responder depois do “disponível?”" (lote L60 · EP011 · 21/11/2026)

**Fonte:** `ROTEIROS/EP011.md` (LIVRO_60_ROTEIROS.docx, Dia 02 / EP011). GANCHO, SITUAÇÃO, TENSÃO e INSIGHT narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho.
**Esteira de estilos:** 1º episódio da esteira → **ESTILO 1 · PALITINHO** (registrado em `PRODUCAO/estilos/esteira.json`; o próximo é o 2 · Desenho à mão). Cenas com o kit `src/estilos/palitinho.tsx`.

## Apuração (21/11/2026)
- Roteiro atemporal de atendimento: não tem números, notícias nem afirmações de mercado.
- Cliente e corretor são bonecos ILUSTRATIVOS. A conversa é SIMULADA, sem interface real de mensageiro e sem marcas.

## CTA
- A CTA do livro ("Quer organizar cada atendimento e o retorno combinado? Conheça nosso sistema… link da bio") já era sobre o sistema.
- Foi substituída pela CTA SISTEMA padrão, sem frase de transição. O texto original fica em `cta.original_cta` e **aguarda aprovação do cliente**.
- O tile ATENDIMENTOS da CTA usa "o retorno combinado", ecoando o roteiro.

## Voz
- Gemini `gemini-3.8-flash-tts`, Puck, 1,0×, preset atual, `shapePauses` 0,22/0,6/0,6.
- Tomadas A (conta 1) e **B (conta 2); usei a B sem edição.**
  - A: 37,3 s, mais arrastada, e o Whisper ouviu "só com sim".
  - B: 33,5 s de fala, 176 palavras/min, ASR 0,98 (96/98).
- **Pontos para ouvir:**
  - "te envie": o Whisper ouviu "te enviar" e o Parakeet ouviu "te envie".
  - "Comenta SISTEMA", igual aos episódios anteriores.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 35,82 s · −14,90 LUFS · TP −1,60 dBTP.
- `editorial_check`: 0 erros / 0 avisos (inclui a regra 9, estilo da esteira).
- Movimento 1,50; maior trecho parado 1,1 s. SFX: 25 eventos.
- Quadros revisados (2 rodadas):
  - títulos agora entram em sequência, sem sobreposição na troca de cena;
  - cartões das opções e balões afastados das bordas;
  - zoom da câmera reduzido para 1,07.
- **Duração curta (35,8 s):** a locução do livro é curta e não foi esticada (regra: a duração segue a fala).
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-29-30/29-domingo/08h00/ATIVO_L60_01_legenda.txt`, `legenda_check` ✓.

## Cenas
1. **Gancho — AINDA ESTÁ DISPONÍVEL?**
   - Cliente pergunta; corretor (giz) responde "Sim.".
   - No "sim" da fala, o balão é riscado em vermelho e aparece ✕ SÓ “SIM”.
2. **Take 01 — CONFIRME ANTES → E DEPOIS DO “SIM”?**
   - A casinha é desenhada e recebe ✓ DISPONÍVEL.
   - Depois vem o "Sim." seco; o cliente responde "…" e vai embora.
   - Aparecem ✕ CONTEXTO · ✕ DIREÇÃO.
3. **Take 02 — RESPONDA E PERGUNTE**
   - O corretor fica verde e diz "Está disponível, sim!".
   - Dois caminhos tracejados levam a OPÇÃO 1 "Planta e detalhes" **ou** OPÇÃO 2 "Condições da visita".
   - Cada opção acende no tempo da fala.
4. **Take 03 — UM PRÓXIMO PASSO ÚTIL**
   - PRESSIONAR é riscado.
   - Surgem degraus e o campo PRÓXIMO PASSO é digitado: "Enviar planta e detalhes ✓".
   - O cliente sobe um degrau e pede "Me envia a planta!" (fala ILUSTRATIVA).
   - Sobe outro degrau e comemora: ✓ AJUDA A DECIDIR.
5. **CTA SISTEMA** (Um sistema do seu jeito) + logo.
- **Capa:** palitinho, com 2 bonecos: "Ainda está disponível?" × "Sim! Planta ou visita?". Título "Não responda só com “sim”".

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-L60-01 --source episodes/ATIVO-L60-01/narration_source.wav && python3 tools/build_audio.py ATIVO-L60-01 && bash tools/render_episode.sh ATIVO-L60-01
```
