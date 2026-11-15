# QA — Criativo Meta Ads 01 · "A venda esquecida" (15/11/2026)

**Fonte:** `ROTEIROS/ADS/AD-ATIVO-01.md` (cliente), narrado palavra por palavra. **Objetivo:** clique no botão do anúncio → formulário / landing page.
**CTA:** "Quer conhecer como isso funciona? Clique no botão e descubra a solução da ATIVO." — tela CLIQUE NO BOTÃO + seta para baixo (onde a Meta coloca o botão). Funciona com qualquer texto de botão escolhido no Gerenciador.

## Formato e área segura
1080×1920 (Reels/Stories). Todo texto e conteúdo principal entre y 270 e y 1250 (referência de mercado: topo 14%, base 35%, laterais 6% — fontes de terceiros; **conferir no preview de áreas seguras do Gerenciador de Anúncios**). Legenda queimada em y≈1185. Títulos fora da câmera (não sobem com zoom). Gancho visível no quadro 0: conversa parada há 12 dias + título "A VENDA QUE VOCÊ ESQUECEU?".

## Voz
Preset oficial (Gemini, Puck), **1,0×**, tomada A sem edição (A e B limpas; A fiel ao "para a sua rotina"). 39,6 s de fala, 168 palavras/min. A voz diz "Clica no botão" (coloquial); a tipografia mostra "CLIQUE NO BOTÃO".

## Validação
11/11 checagens técnicas (41,45 s · −15,0 LUFS · TP −1,57 dBTP). `editorial_check`: 0 erros, 0 avisos (regras de anúncio: CTA para o botão, texto acima de y 1250). Mixagem × voz: 110/110 palavras. Movimento 1,40 (1ª versão 0,95 e 4,3 s parados na CTA → celular sempre em movimento, lista rolando, painel pulsando, ondas no botão); maior trecho parado 0,7 s.

## Integridade
Conversas, nomes e o painel são **ilustrativos** (rótulo ILUSTRATIVO no painel). Não existe captura real autorizada da tela de acompanhamento de interessados — se houver, substituir na cena ATIVO. Sem números de resultado, depoimentos ou funcionalidades além de "organizar imóveis, interessados e atendimentos".

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py AD-ATIVO-01 && bash tools/render_episode.sh AD-ATIVO-01
```
