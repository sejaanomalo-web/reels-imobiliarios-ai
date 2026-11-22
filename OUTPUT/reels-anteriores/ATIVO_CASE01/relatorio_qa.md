# QA — ATIVO Caso Real 01 · "Kelsie Blevins: atenção antes da venda" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_CASE01.md` (ATIVO_Reel_01_KELSIE_BLEVINS_ATENCAO.md), narrado palavra por palavra. ID `EP-ATIVO-CASE01`, porque "Episódio 01" já existe na série. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Na sua próxima gravação, escolha uma dúvida real do comprador antes de escolher a primeira imagem. Salva este vídeo para lembrar disso."
- A 1ª frase **ficou**, porque é a lição prática. "Salva este vídeo…" virou a transição **"E quando a dúvida virar conversa, cada contato precisa estar organizado."**, seguida da CTA SISTEMA → Direct.
- **A frase de transição é minha. Precisa da aprovação do cliente.**

## Caso real: o que foi conferido (16/11/2026)
- **Confirmado:** corretora na Carolina do Norte (Hickory / Lake Norman, Realty Executives).
  - Fontes: [Zillow](https://www.zillow.com/profile/Kelsie%20Blevins%20Realtor), [ListWithClever](https://listwithclever.com/top-real-estate-agents/profiles/kelsie-blevins-710045/), [TikTok @kelssie3](https://www.tiktok.com/@kelssie3).
- **Só fonte secundária:** a lógica "educar → mostrar prova → pedir".
  - Vem de uma matéria do [BAM/Broke Agent Media](https://nowbam.com/the-proof-over-promise-posts-behind-one-agents-60-million-in-social-sales/), que não consegui abrir: o domínio está bloqueado nesta sessão. Li só o resumo da busca.
  - Os números de seguidores e vendas dessa matéria **não** aparecem no vídeo.
- "Audiência enorme" é a fala do roteiro, sem número. Ela é sustentada por números autodeclarados (perfil dela) e pela matéria.
- **Não verificado:** o Reel de referência (instagram.com também está bloqueado nesta sessão).
- **Nenhuma imagem, vídeo, perfil ou logo dela ou da imobiliária.**
  - Tudo é ilustração genérica, com os rótulos IMAGENS ILUSTRATIVAS, VÍDEO ILUSTRATIVO, FLUXO ILUSTRATIVO e EXEMPLO ILUSTRATIVO.
  - Ficha do caso: CASO REAL · FONTE: PERFIS PÚBLICOS, só com nome e local.
- **Decisão do cliente:** o Prompt Mestre diz "sem nomes de terceiros sem autorização". Este roteiro nomeia a corretora por pedido expresso do cliente. Não há autorização dela registrada no repositório.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, conta 2. **2 gerações** (A 69,0 s · B 71,0 s).
- **Tomada A, sem edição:** 182 palavras/min. É a que pronuncia "Kelsie Blevins" de forma reconhecível nos dois reconhecedores; a B saiu "Blavins". Diz "Comenta SISTEMA" (coloquial aceito).
- **Ponto para ouvir:** 0:58 "quando a dúvida **virar conversa**". Os dois reconhecedores ouvem "vira **a** conversa". O sentido não muda; se incomodar, regravo só essa frase e emendo.
- "te envio" confirmado por trecho (o arquivo inteiro sugeria "te envie").

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 71,38 s · −15,01 LUFS · TP −1,59 dBTP.
- `editorial_check` 0 erros / 0 avisos. `tsc` sem erros.
- Mixagem × roteiro: 0,962. Diferenças:
  - nome próprio ("Kelsey");
  - borda de janela;
  - "virar a conversa", que já está na voz seca;
  - "não **tá** clara" (0:48): só o Whisper na mixagem ouve assim; na voz seca e no Parakeet sai "não está".
- Movimento **1,69** · maior trecho parado 0,8 s (antes da correção: 1,3 s no congelamento da cena 4).
- 52 quadros revistos (38 stills + 14 do MP4). Corrigidos:
  - ficha do caso sozinha por ~4 s;
  - contatos vazios ~1 s;
  - título "NÃO ESTÁ NAS CASAS" antes da fala;
  - grade encostando na legenda;
  - cartão da pergunta cortado na borda;
  - "SISTEMA" duplicado no campo da CTA.

## Cenas
1. **Gancho:** celular com vídeos de casas rolando desde o quadro 0 e plateia se formando → as casas apagam (NÃO ESTÁ NAS CASAS) → "?" no começo do vídeo (ESTÁ NO JEITO DE CHAMAR ATENÇÃO).
2. **Take 01:** ficha CASO REAL; grade de anúncios ilustrativos ("À VENDA"), metade vira conteúdo que explica (temas ilustrativos) → NÃO É SÓ MOSTRAR CASA + público ANTES DE PROCURAR.
3. **Take 02:** ENSINAR → MOSTRAR → CONVERSAR, cada bloco acende na fala; VITRINE QUALQUER riscada → barra CONFIANÇA.
4. **Take 03:** vídeo genérico rodando; VIEWS riscado; corte seco no congelamento + "Por que continuar assistindo?"; FACHADA BONITA, barra de atenção esvazia e o vídeo é arrastado. Título ATENÇÃO COM INTENÇÃO.
5. **Aplicação:** SUA PRÓXIMA GRAVAÇÃO — 1º dúvida real ✓, ANTES DE, 2º primeira imagem → o "?" vira conversa e cai em CONTATOS, que se organizam (transição).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Confirmar o uso do nome da corretora (ver acima).
- Duração 71,4 s, dentro dos 65–75 s pedidos no roteiro; acima do ideal geral de 40–65 s.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-CASE01 --source episodes/EP-ATIVO-CASE01/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-CASE01 && bash tools/render_episode.sh EP-ATIVO-CASE01
```
