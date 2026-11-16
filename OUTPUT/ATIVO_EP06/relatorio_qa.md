# QA — ATIVO Episódio 06 · "Seu atendimento tem um gargalo. Mas onde ele está?" — versão corretor (16/11/2026)

## Versão atual: corretor (pedido do cliente: "precisamos dos conteúdos para corretores")
- Mesmo tema (processo dentro da imobiliária), contado pelo corretor que trabalha nela: "Você atende… passa o dia ocupado", "Você responde… um colega abre a conversa sem saber o que você já explicou", "Você informa ao cliente… Um colega descobre…", "Para encontrar o seu gargalo…", "Um bom corretor não precisa lembrar cada mensagem. Precisa enxergar seus clientes, as etapas e as pendências…", CTA "…seus imóveis, leads e atendimentos, comente SISTEMA que eu te envio os detalhes pelo Direct." Texto exato em `PRODUCAO/episodes/EP-ATIVO06/episode.json`.
- Telas: DIA CHEIO / VOCÊ TRABALHANDO, balões e fichas identificados como VOCÊ e COLEGA, NÃO É LEMBRAR CADA MENSAGEM, lista CLIENTES / ETAPAS / PENDÊNCIAS; capa "Seu atendimento tem um gargalo".
- Voz: 3 novas tomadas; **B usada** (73,8 s, 165 palavras/min; "informa o cliente" no lugar de "ao cliente" e "comenta sistema" — coloquial; Whisper confere o resto); A descartada ("refa", "te envia"), C descartada ("chega para um anúncio").
- Validação: 11/11 (76,1 s · −15,0 LUFS) · editorial 0/0 · mixagem × voz sem perdas (diferenças só na borda da janela do reconhecedor) · movimento 1,72 · maior trecho parado 0,7 s.

## Versão anterior (gestores, texto original do roteiro) — substituída; disponível no commit dd15674


**Fonte:** `ROTEIROS/ATIVO_EP06.md` (ATIVO_Roteiro_06.docx), narrado palavra por palavra. Reel **orgânico**: voz 1,0×, legenda padrão, logo no fecho. **CTA:** a do próprio roteiro, já SISTEMA → Direct ("Se você quer conhecer um sistema personalizado para organizar imóveis, leads e atendimentos, comente SISTEMA que enviamos os detalhes pelo Direct.").

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO06/episode.json` → `diagnostico`
Público: gestores/donos de imobiliária. C3 · crença questionada: "equipe ocupada = operação funcionando" · promessa: investigar o gargalo refazendo o percurso de uma negociação (5 perguntas) · evidências: exemplo ilustrativo rotulado, sem números nem dashboard apresentado como produto.

## Voz
Preset oficial (Gemini, Puck), **1,0×**, sem edição. 3 tomadas: **A usada** (75,4 s, 157 palavras/min; Whisper confirma "Acompanhe" e a CTA); B descartada ("A companheia"); C limpa, porém mais longa (82,4 s).

## Validação
11/11 (77,78 s · −15,0 LUFS · TP −1,69 dBTP) · `editorial_check` 0/0 (CTA SISTEMA, verde exato) · mixagem × voz: todas as palavras presentes (o "mas" ausente na 1ª comparação era emenda de janela do reconhecedor; conferido no trecho inteiro) · movimento 1,74 · maior trecho parado 0,6 s.

## Cenas
1. Fluxo ENTRADA → ATENDIMENTO → VISITA → NEGOCIAÇÃO já vivo no quadro 0; atividades acendem; um ponto trava (PAROU AQUI) → ONDE ESTÁ O GARGALO? 2. Ficha do lead (EXEMPLO ILUSTRATIVO): RESPONSÁVEL / PRÓXIMO PASSO = NINGUÉM DEFINIU; corretor B repete a pergunta. 3. Duas fichas do mesmo imóvel: DISPONÍVEL × CONDIÇÃO MUDOU, sincronia quebrada → VERSÕES DIFERENTES, PONTO DE ATUALIZAÇÃO? 4. RASTREIE UMA OPORTUNIDADE: 5 checkpoints nas perguntas; resposta vaga → INVESTIGUE AQUI. 5. O fluxo volta com responsáveis e pendências; algo sai do fluxo e é sinalizado. 6. CTA SISTEMA + logo.

## Observações
- Duração 77,8 s (roteiro de 197 palavras). Acima da faixa ideal de Reel; não acelerado (regra dos orgânicos).

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py EP-ATIVO06 && bash tools/render_episode.sh EP-ATIVO06
```
