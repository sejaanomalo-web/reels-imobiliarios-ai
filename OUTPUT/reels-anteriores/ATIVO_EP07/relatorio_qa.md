# QA — ATIVO Episódio 07 · "Um lead de anúncio ainda não conhece você" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP07.md` (ATIVO_Roteiro_07.docx), narrado palavra por palavra. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Salve este vídeo para revisar antes de atender seu próximo lead de anúncio." (tela SALVE ESTE REEL).
- Virou a transição **"Revise estes passos antes de atender seu próximo lead de anúncio."** + CTA base: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct." Tela: COMENTE "SISTEMA" → Direct + logo.

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO07/episode.json` → `diagnostico`
Público: corretor que recebe contatos de tráfego pago e portais. C3 · crença questionada: "lead de anúncio = lead de indicação; mandar tudo de uma vez é atender bem" · promessa: primeira resposta em 3 passos (reconhece o pedido, entrega um dado, oferece um próximo passo) e avançar uma questão por vez · evidências: conversa fictícia e imóvel ilustrativo, rotulados, **sem endereço e sem preço** (o preço do anúncio aparece mascarado `R$ ••••••`).

## Voz
- Preset oficial (Gemini, Puck), **1,0×**, sem aceleração.
- 3 tomadas geradas hoje (sobra 1 geração na cota diária):
  - **A** descartada: "Se me interessado", "te envia", quebra de prosódia em "imóveis? Leads…".
  - **B** descartada: "cinco **informações** prontas" no lugar de "mensagens" (os dois reconhecedores confirmam).
  - **C usada** como base: "cinco mensagens" correto e CTA "…que eu te envio…" confirmada pelo Whisper.
- **Uma emenda:** a frase s12 "Se o interessado responder, avance uma questão por vez." veio da tomada B, porque o C dizia "Se **me** interessado" (Whisper em janela curta).
  - Corte nas pausas entre frases (início da cena 4), crossfade de 12 ms e ganho igualado por RMS (×1,10).
  - O tom da frase emendada (mediana ≈185 Hz) bate com a mesma frase no C original (≈193 Hz). Whisper na emenda: "…do imóvel anunciado. Se o interessado responder, avance uma questão por vez. Se ele pedir documentação…".
- Coloquial aceito (padrão da série): "Comenta SISTEMA".
- 78,7 s de fala, 179 palavras/min. Fonte congelada em `PRODUCAO/episodes/EP-ATIVO07/narration_source.wav`.

## Validação
- `validate.py` 11/11:
  - 1080×1920 · H.264 · yuv420p · 30 fps · AAC
  - 81,05 s
  - −14,94 LUFS · TP −1,60 dBTP
  - sem pretos nem silêncios
- `editorial_check` 0 erros / 0 avisos: CTA SISTEMA, verde exato, fontes ≥ 24 px, rótulo "ilustrativo" nas interfaces.
- Mixagem × roteiro: 0,97.
  - As diferenças são do reconhecedor: "anúncia", "contados", "móvel", "Comenta a".
  - O "dados" ausente na comparação estava na emenda da janela de 20 s; no trecho inteiro, "Use apenas dados confirmados" foi ouvido.
- Movimento médio 1,78 · maior trecho parado 0,9 s.
- 29 + 22 quadros revisados. Corrigidos antes do render:
  - câmera com eixo invertido no gancho e na cena 4 (cortava cards);
  - PDF sobre o convite;
  - título INFORMAÇÃO ≠ ORIENTAÇÃO sobre a conversa;
  - ficha do imóvel sobre a 3ª mensagem;
  - selo sobre o rótulo.

## Cenas
1. **Gancho:** card INDICAÇÃO ("Fala com esse corretor. Eu confio." + JÁ OUVIU FALAR DE VOCÊ) e card ANÚNCIO (foto ilustrativa + preço oculto, "E SÓ ISSO") convergem numa caixa de mensagens. Ao final do gancho, "=" vira "≠" vermelho com tranco.
2. Lead pede informações; cinco mensagens prontas em rajada se comprimem (5× MENSAGEM PRONTA); PDF enorme cobre a conversa; "Vamos agendar uma visita?"; o balão que faltou, tracejado (FALTOU PERGUNTAR); lead hesita → **INFORMAÇÃO ≠ ORIENTAÇÃO**.
3. Linha verde conecta o pedido à resposta. A resposta sugerida é digitada no tempo da fala, com 1 RECONHECE O PEDIDO · 2 ENTREGA UM DADO · 3 OFERECE UM PRÓXIMO PASSO (legenda oculta nas 3 frases: o balão é a fala). Ficha do imóvel com SÓ DADOS CONFIRMADOS.
4. LEAD RESPONDEU + UMA QUESTÃO POR VEZ; três caminhos (DOCUMENTAÇÃO / VISITA / SÓ PESQUISANDO); o ponto do lead percorre só o caminho escolhido; CLIQUE → CONVERSA.
5. Selo MELHOR CORRETOR DA CIDADE cercado de ruído e riscado (NÃO PRECISA PROVAR); três verificações: ouviu, sabe responder, não pressiona. Depois CONTEXTO → CLAREZA → CONFIANÇA + ANTES DO PRÓXIMO LEAD DE ANÚNCIO.
6. CTA SISTEMA (base EP05/EP06): a lista dobra no módulo IMÓVEIS, comentário digita SISTEMA, Direct, logo oficial.

## Observações / pendências
- **Duração 81 s**, acima da faixa preferida (40–65 s). O roteiro tem 235 palavras com a CTA. Não acelerei (regra dos orgânicos).
- Para encurtar, a alternativa é cortar texto, por exemplo "Use apenas dados confirmados do imóvel anunciado." ou uma das três condições; isso exige nova gravação e aprovação.
- Sem captura real do sistema; todas as telas são ilustrativas e rotuladas.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO07 --source episodes/EP-ATIVO07/narration_source.wav && python3 tools/build_audio.py EP-ATIVO07 && bash tools/render_episode.sh EP-ATIVO07
```
