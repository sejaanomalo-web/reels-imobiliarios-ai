# QA — ATIVO_NOV26_14 · "Cinco mil moradias aptas: e agora?" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_14.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Ministério das Cidades, **Diário Oficial de 04/11/2026**: lista torna **5.353 unidades do MCMV aptas para contratação**, em 12 estados; antes da contratação, construtoras e municípios precisam confirmar que aceitam as regras do programa ([AtualMT](https://atualmt.com.br/2026/11/04/minha-casa-minha-vida-5-353-novas-moradias-aptas-para-contratacao), [Cone Sul Notícias](https://conesulnoticias.com.br/minha-casa-minha-vida-5-353-novas-moradias-aptas-para-contratacao/)). Nenhuma fonte encontrada contradiz o número.
- **Fonte do roteiro não acessível nesta sessão:** [gov.br — notícia MCID nº 2371](https://www.gov.br/cidades/pt-br/assuntos/noticias-1/noticia-mcid-n-2371) (host fora da rede liberada); conferida pelo título indexado e pelas reportagens que reproduzem o comunicado.
- Na tela: MINISTÉRIO DAS CIDADES · DOU 04/11/2026; APTO NÃO É ENTREGUE; ETAPAS SIMPLIFICADAS · ILUSTRATIVO (proposta → apta para contratação → contratação → obra → entrega). Nada sugere venda, unidade disponível, prazo ou enquadramento. Manchete, celular e conversa ILUSTRATIVOS.

## CTA
- No roteiro: "Compartilhe com quem costuma anunciar novidade antes de conferir o estágio."
- Virou a transição **"Antes de anunciar novidade, confira a fase do projeto."** (texto de tela CONFIRA A FASE DO PROJETO) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: **A, usada sem edição**; conta 1: B, com "proposta" no singular e "um imóvel"). Sem vazamento da direção.
- Pausas: 20 moldadas (teto 0,6 s); 55,8 s → 52,7 s, 164 palavras/min, 1,0× sem time-stretch.
- **Pontos para ouvir:** "escolher **a** unidade" (artigo a mais nas duas tomadas); "confunde aprovação… com imóvel" (as transcrições divergem sobre artigos).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 55,08 s · −15,02 LUFS · TP −1,55 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,44 · maior trecho parado 0,8 s (câmera já escrita com ease.out/linear, sem paradas intermediárias).
- SFX: 29 eventos, stem −38,6 LUFS; transcrição da mixagem 0,942 × narração 0,935.
- 17 + 3 quadros revisados. Corrigidos: etiquetas lado a lado cortando na borda (empilhadas), pergunta encostando na manchete no celular; capa trocada de "Apto ≠ à venda" para "Apta ≠ pronta para vender" ("apto" pode ser lido como apartamento).
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/10h00/ATIVO_NOV26_14_legenda.txt` — `legenda_check` ✓ (140 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/10h00/`.

## Cenas
1. **Gancho — 5.353 UNIDADES APTAS:** manchete ilustrativa; 5.353 UNIDADES APTAS; fonte; PRONTAS PARA VENDER?
2. **Take 01 — APTO NÃO É ENTREGUE:** NÃO; linha do tempo com ◀ AQUI em APTA PARA CONTRATAÇÃO; Ministério das Cidades · 04/11; propostas de empreendimentos.
3. **Take 02 — ETAPAS DIFERENTES:** celular com a notícia; "Já posso escolher a unidade e pegar as chaves?"; ⚠ ETAPA: APTA PARA CONTRATAÇÃO; aprovação administrativa ≠ imóvel disponível; ✕ informação errada.
4. **Take 03 — CONFIRA A FASE DO PROJETO:** antes de publicar: local, etapa, critérios, canal oficial; informação habitacional exige contexto; "Antes de anunciar, confira a fase".
5. **CTA SISTEMA** (Fase de cada empreendimento) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-14 --source episodes/ATIVO-NOV26-14/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-14 && bash tools/render_episode.sh ATIVO-NOV26-14
```
