# QA — ATIVO_GTA6_02 · "O magnata imobiliário escondido em GTA VI" (edição especial GTA VI · roteiro 02 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_02.md`, a partir do PDF do cliente. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 3 · PLANTA TÉCNICA, com o kit `src/estilos/planta.tsx` e o fundo quadriculado `FundoPlanta`, que sai na CTA. O próximo estilo é o 4 · Tipografia cinética.
**Agenda:** 22/11/2026 às 22:00 (Brasília). O horário é ajustado na fila do Supabase depois da Action.

## Apuração (21/11/2026) — FATO OFICIAL
- Boobie Ike é um personagem **FICTÍCIO** de GTA VI. O perfil oficial da Rockstar ([boobie](https://www.rockstargames.com/VI/boobie)), repetido por bases de fãs ([GTABoom](https://www.gtaboom.com/Boobie_Ike), [GTABase](https://www.gtabase.com/characters/gta-6/boobie-ike)), diz o seguinte:
  - ele é uma "lenda local de Vice City";
  - os negócios dele são imóveis, um strip club (o roteiro diz "clube noturno") e um estúdio de gravação;
  - ele tem sociedade com Dre'Quan Priest na gravadora Only Raw Records, que ainda busca um sucesso.
- O site da Rockstar estava inacessível deste ambiente (DNS bloqueado). Por isso, as citações foram conferidas pelos resultados de busca e pelas bases de fãs que reproduzem o texto oficial.

## ⚠️ Ponto editorial para o cliente aprovar
- O mesmo perfil oficial diz que "o dinheiro do clube paga o estúdio, e o **dinheiro das drogas** paga tudo".
- A recompensa do roteiro, "quem entende de patrimônio constrói um império", elogia um personagem cujo império, dentro do jogo, tem origem criminosa.
- Narrei o texto aprovado sem mudanças. O vídeo **não** mostra a origem do dinheiro e rotula tudo como PERSONAGEM FICTÍCIO e ILUSTRATIVO.
- **Se alguém comentar isso, o risco de imagem é baixo, mas existe. Recomendo aprovar conscientemente ou trocar a fala.**

## Direitos
- Nenhum asset do jogo. A planta, o mapa, a ficha e o gráfico são ilustrativos e originais.
- Os nomes aparecem só em texto.

## CTA
- A CTA natural do roteiro era "Qual personagem do GTA VI merecia um tour pela própria mansão?".
- Ela virou a transição narrada "Agora, e os seus imóveis de verdade?", seguida da CTA SISTEMA.
- A pergunta original foi para o fim da legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×, `shapePauses`.
- Pronúncias definidas: "GTA VI" → "GTA seis"; "Boobie Ike" → "Búbi Áique"; "Dre’Quan Priest" → "Dri-Cuân Príst".
- Foram geradas três tomadas e todas tiveram algum desvio. **Usei a A**:
  - **A (usada):** acrescentou um "E" em "E isso muda"; "poder espalhados" sai colado.
  - **B:** disse "Bui" em vez de Boobie e "só a perseguição".
  - **C:** abriu com "Olha, o GTA VI" e também disse "só a perseguição".
- Dados da A: 48,4 s, 176 palavras/min, ASR 0,937.
- **Pontos para ouvir:** "E isso muda"; "poder espalhados"; "Dre’Quan".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 50,77 s · −14,9 LUFS · TP < −1 dBTP.
- `editorial_check` 0/0.
- Movimento 1,76; maior trecho parado 1,3 s. SFX: 23 eventos.
- Quadros revisados:
  - o mapa e a rota foram afastados das bordas;
  - o palco vazio antes de "patrimônio" foi preenchido (as barras começam a subir no "adorei");
  - a caixa "E OS SEUS IMÓVEIS?" saiu de cima das barras.
- `legenda_check` ✓.

## Cenas
1. **UM MAGNATA IMOBILIÁRIO:** planta de mansão (sala, suíte, piscina), cota "FORTUNA EM IMÓVEIS" e chamada "NEM É O PROTAGONISTA".
2. **O NOME: BOOBIE IKE:** ficha técnica do personagem fictício, chamada "LENDA DE VICE CITY — PERFIL OFICIAL" e TRAJETÓRIA → NEGÓCIOS.
3. **O IMPÉRIO DELE:** as frentes IMÓVEIS, CLUBE e ESTÚDIO entram uma por vez; depois o anexo GRAVADORA (+ Dre’Quan Priest) e "QUER ESTOURAR NA CIDADE".
4. **UM UNIVERSO MAIOR:** mapa ilustrativo com a rota "SÓ PERSEGUIÇÃO?" riscada e os pinos NEGÓCIOS / INTERESSES / PODER espalhados.
5. **QUEM ENTENDE DE PATRIMÔNIO:** barras sobem sobre a cota PATRIMÔNIO, carimbo "PROJETO: IMPÉRIO · PERSONAGEM FICTÍCIO" e "E OS SEUS IMÓVEIS?".
6. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-02 --source episodes/ATIVO-GTA6-02/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-02 && bash tools/render_episode.sh ATIVO-GTA6-02
```
