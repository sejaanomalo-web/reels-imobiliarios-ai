# QA — ATIVO_NOV26_17 · "Cascavel está construindo moradias" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_17.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Entrega de **123 casas** do Conjunto Habitacional **Favo de Mel** (região norte de Cascavel) em novembro e **mais de 4 mil moradias** em obras ou em projeto/protocolo, segundo a prefeitura. Conferido em reportagens que citam a nota oficial. A página da prefeitura (`prefa.cascavel.pr.gov.br`) estava **bloqueada pela rede desta sessão**.
- **4.258** (número exato do roteiro): **não verificado** em fonte acessível. Na tela aparece "+ DE 4 MIL", que é coerente com a fala ("mais de quatro mil").
- Tela: "123 ENTREGUES" e "+4 mil EM ETAPAS" mostrados como **CATEGORIAS DIFERENTES**; "FONTE: PREFEITURA DE CASCAVEL"; INFRAESTRUTURA / BAIRRO / MOBILIDADE "A VERIFICAR" (nenhuma obra prevista é afirmada); "✕ HABITAÇÃO SOCIAL ≠ ESTOQUE À VENDA"; "✕ PROMETER VALORIZAÇÃO". Mapa ESTILIZADO e post FICTÍCIO marcados como ilustrativos.

## CTA
- Roteiro: "Qual transformação urbana de Cascavel merece mais atenção? Comente."
- Virou a transição **"Leia a cidade, não só o anúncio."** + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 1 geração útil: tomada **B** (conta 1), usada sem edição. A tomada A esbarrou na cota da conta 2 ("quota exceeded"). B não tinha erro nem vazamento da direção, então não foi necessária uma 3ª tomada.
- 52,17 s, 159 palavras/min, ASR 0,96 (131/138; os "não reconhecidos" são o ASR escrevendo "123" e "4" em dígitos, além de "Comente"). 1,0× sem time-stretch.
- **Ponto para ouvir:** "transformar a habitação social".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 54,51 s · −14,94 LUFS · TP −1,69 dBTP.
- `editorial_check` 0 erros.
- Movimento 1,34 · maior trecho parado 1,0 s. O primeiro render deu 1,27 e foi reforçado: câmera do gancho já em movimento, cartões do Take 02 e chips/alertas do Take 03 flutuando, mapa maior.
- SFX: 30 eventos, stem −39,7 LUFS; trilha −37,6 LUFS.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_17/legenda_instagram.txt`, `legenda_check` ✓ (139 palavras), sem o 4.258 e sem promessa de valorização. Pasta: `PUBLICACAO/NOV26/REELS_11_AO_20/17/`.

## Cenas
1. **Gancho — CASCAVEL EM MOVIMENTO:** mapa estilizado; pin "FAVO DE MEL · REGIÃO NORTE"; 123 CASAS ENTREGUES; "E O QUE VEM DEPOIS?".
2. **Take 01:** 123 ENTREGUES × +4 mil EM ETAPAS (EM OBRAS / EM PROJETO / PROTOCOLO); CATEGORIAS DIFERENTES; fonte prefeitura.
3. **Take 02:** post fictício "A cidade vai crescer, compre já!"; SÓ UMA LISTA DE CASAS; itens a verificar; "COMO OS PROJETOS SERÃO IMPLEMENTADOS?".
4. **Take 03:** mapa com REGIÃO / INFRAESTRUTURA / ETAPA / FONTE OFICIAL; alertas ✕; "Leia a cidade, não só o anúncio".
5. **CTA SISTEMA** (Leitura de cada região) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-17 --source episodes/ATIVO-NOV26-17/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-17 && bash tools/render_episode.sh ATIVO-NOV26-17
```
