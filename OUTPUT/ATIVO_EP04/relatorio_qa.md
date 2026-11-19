# QA — ATIVO Episódio 04 · "A pergunta que falta quando as vendas não acontecem" (14/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP04.md` (ATIVO_Roteiro_04.docx), narrado palavra por palavra, exceto o fecho.
**CTA:** comentário **SISTEMA → Direct** — regra do cliente para todos os Reels (14/11/2026). A CTA do roteiro ("Salve essas quatro perguntas para a próxima revisão da sua rotina." / REVISE SUA ROTINA) virou a transição "Use essas quatro perguntas na próxima revisão da sua rotina."; depois: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct." Tela: COMENTE "SISTEMA" + "Receba os detalhes no Direct." + logo oficial.

## Diagnóstico editorial — `PRODUCAO/episodes/EP-ATIVO04/episode.json` → `diagnostico`
C2 mudança de percepção · crença questionada: "o mercado esfriou explica tudo" · promessa: 4 perguntas de autoavaliação · evidências: conhecimento prático; sem números de mercado, percentuais ou resultados.

## Voz
Preset oficial (Gemini, Puck, direção original), **1,0×**, tomada única sem edição (última geração da cota do dia), 67,9 s, 158 palavras/min. O modelo falou "Comenta sistema" (imperativo coloquial, já registrado no EP017); "sistema" falado como palavra, sem soletrar. Legenda mantém o texto aprovado.

## Validação técnica (11/11 OK)
1080×1920 · H.264 · yuv420p · 30 fps · AAC · 70,27 s · −14,9 LUFS · TP ≤ −1,5 dBTP · sem preto/silêncio.
Mixagem × voz: 179/179 palavras (o "pop" do título encobria o "a" de "com a sua atividade" e foi movido para depois de "atividade"; "está"→"tá" é variação do reconhecedor, sem efeito por perto). Movimento médio 1,53; maior trecho parado 1,1 s. `editorial_check.py`: 0 erros, 0 avisos (inclui a nova regra da CTA SISTEMA).

## Observações
- Manchetes do gancho são genéricas, em forma de pergunta, sem veículo nem número. Calendários sem números (direção do roteiro). Anúncio B e lista de revisão levam rótulo ILUSTRATIVO.
- Régua "PERGUNTA n DE 4" amarra as quatro perguntas (objeto-âncora, aprendizado do EP02).

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py EP-ATIVO04 && bash tools/render_episode.sh EP-ATIVO04
```
