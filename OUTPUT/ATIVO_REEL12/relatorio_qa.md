# QA — ATIVO Reel 12 · "O primeiro imóvel começa com clareza" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL12.md` (ATIVO_Reel_12_PRIMEIRO_IMOVEL_CLAREZA.md), narrado palavra por palavra. ID `EP-ATIVO-REEL12`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Qual dúvida você mais escuta de quem quer sair do aluguel? Escreve nos comentários."
- Virou a transição **"E para saber em que etapa cada comprador está, ajuda ter cada atendimento organizado."** + CTA SISTEMA → Direct. Duas chamadas de comentário (pergunta aberta + SISTEMA) competiriam.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `episode.json` → `diagnostico`
- C2 (história ilustrativa). Crença questionada: "passar tudo de uma vez é ser completo".
- CENA ILUSTRATIVA nas duas equipes; "instituição responsável" sem nome de banco; **SEM PROMESSA DE APROVAÇÃO** na tela; preços mascarados. Cartões da avalanche (ITBI, SFH?, FGTS?, CERTIDÕES…) são só rótulos, sem valores.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×. Tomadas A 62,1 s · B 60,9 s (conta 2) · **C (conta 1, 3ª tomada)**.
- **Tomada B, sem edição:** 163 palavras/min.
- **A descartada:** "**um** avalanche" + "dezenas de **móveis**".
- **C descartada:** a voz **leu em voz alta a instrução de estilo** do preset ("como colegas corretores… nunca locutor de comercial") antes do texto — falha do modelo, não do roteiro.
- **Ponto para ouvir: 0:11 "dezenas de imóveis".** Nas três tomadas a voz elide "dezenas d'imóveis"; em janela curta os reconhecedores ouvem "de móveis", em janela longa "de imóveis". A legenda mostra "imóveis". Se soar como "móveis" para você, a saída é trocar a palavra no roteiro (ex.: "muitos imóveis") — exige aprovação e nova geração.
- **Formas da voz:** "comprador **tá**" (por "está"), "ajuda **a** ter", "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 63,3 s · −15,0 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,973 ("móveis", "tá", "Comenta").
- Movimento **1,67** (1ª medição 1,32) · maior trecho parado 0,9 s.
- ~33 quadros revistos. Corrigidos: 3 s vazios antes da avalanche, UM PASSO DE CADA VEZ aparecendo só 0,5 s, título do fecho quebrando sobre a etiqueta.

## Cenas
1. **Gancho — PARECIDOS. SÓ UM CLARO.:** EQUIPE A × EQUIPE B com apartamentos parecidos; ALUGUEL → PRIMEIRO IMÓVEL; "?" sobre A, PRÓXIMO PASSO saindo de B.
2. **INFORMAÇÃO DEMAIS (equipe A):** avalanche de cartões sobre o comprador; TUDO IMPORTA — MAS NÃO DE UMA VEZ; POR ONDE COMEÇAR?
3. **PRIMEIRO, A MAIOR DÚVIDA (equipe B):** "Qual sua maior dúvida?" / "Posso financiar?"; trilha PERGUNTA → VIABILIDADE → OPÇÕES → VISITA; instituição responsável, SEM PROMESSA DE APROVAÇÃO; UM PASSO DE CADA VEZ.
4. **A DIFERENÇA → CLAREZA GERA CONFIANÇA:** COMPLICAR × ORIENTAR; ESCONDER INFORMAÇÃO riscado; INFORMAÇÃO CERTA · HORA CERTA; 1-2-3 = planta.
5. **CADA UM NA SUA ETAPA:** JORNADA DO COMPRADOR (exemplo ilustrativo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:11.
- Duração 63,3 s (fala 60,9 s), ~1 s acima dos 50–60 s.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL12 --source episodes/EP-ATIVO-REEL12/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL12 && bash tools/render_episode.sh EP-ATIVO-REEL12
```
