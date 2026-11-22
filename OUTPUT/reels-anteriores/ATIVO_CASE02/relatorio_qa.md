# QA — ATIVO Caso Real 02 · "Jason Ballo: mostre o que o comprador quer ver" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_CASE02.md` (ATIVO_Reel_02_JASON_BALLO_OLHAR_COMPRADOR.md), narrado palavra por palavra. ID `EP-ATIVO-CASE02`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Qual detalhe você sempre confere antes de indicar um imóvel? Conta nos comentários."
- Substituída pela transição **"E cada detalhe que o comprador perguntar merece ficar registrado no atendimento."** + CTA SISTEMA → Direct.
- **A frase de transição é minha. Precisa da aprovação do cliente.**
- A pergunta do roteiro serviria bem como legenda do post, para puxar comentários. Sugestão; não entrou no vídeo.

## Caso real: o que foi conferido (16/11/2026)
- **Confirmado:** agente do comprador em Sydney, Austrália, fundador da JBX Buyers Agents e criador de conteúdo imobiliário.
  - Fontes: [press release JBX/Newsfile, jun/2026](https://www.newsfilecorp.com/release/302589), [Elite Agent](https://eliteagent.com/real-estate-facebook-jason-ballo/), [podcast Property Now](https://podcast.app/property-now-p7007922?page=2).
- **Não verificado:** o estilo dos vídeos descrito no roteiro (abrir armário, observar acabamento, conferir circulação).
  - Não achei descrição pública disso, e o Reel de referência está bloqueado nesta sessão (`instagram.com`).
  - A afirmação vem da referência do cliente. **Conferir no Reel antes de publicar.**
- Números de visualizações/seguidores (autodeclarados no press release) **fora do vídeo**.
- **Nenhuma imagem, vídeo, perfil ou logo do agente ou da empresa.**
  - Imóvel, tour e perguntas são ilustrações rotuladas: IMAGEM ILUSTRATIVA, IMÓVEL ILUSTRATIVO, VÍDEO ILUSTRATIVO e EXEMPLO ILUSTRATIVO.
  - Fita métrica sem medida; "A CONFERIR" no ponto de atenção.
- O uso do nome de terceiro é decisão do cliente (ver Caso Real 01).

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, conta 2. **2 gerações** (A 61,7 s · B 62,3 s).
- **Tomada A, sem edição:** 170 palavras/min.
- **Tomada B descartada:**
  - "Pensa **do** que acontece" (os dois reconhecedores ouvem assim);
  - "te envio" embolado na CTA ("te india" / "atingi").
- A tomada A usa imperativos coloquiais: "escolhe", "grava", "comenta" (aceitos desde o EP017). A legenda mantém o texto do roteiro.
- **Pontos para ouvir:**
  - 0:06 "grava como **quem** vai comprar": o Parakeet ouve certo; o Whisper ouve "como o Kim".
  - 0:34 "até uma **limitação**": certo nos dois reconhecedores na voz seca; só o Whisper na mixagem ouve "alimentação". Não há efeito nesse ponto.
  - 0:01 "grava **a** casa": o Parakeet do arquivo inteiro ouviu "grava casa"; o Whisper por trecho ouve "a".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 64,04 s · −14,96 LUFS · TP −1,73 dBTP.
- `editorial_check` 0 erros / 0 avisos (corrigi uma fonte de 22 px).
- Mixagem × roteiro: 0,930. A maior parte é a forma coloquial dos imperativos, que já está na voz; mais nome próprio ("Balo") e borda de janela.
- Movimento **1,49** (1ª medição: 1,45, gancho a 0,6) · maior trecho parado 0,9 s.
- 41 quadros revistos (33 stills + 8 do MP4). Corrigidos:
  - nome cortado pelo cômodo;
  - título encostando no visor;
  - pessoas sobrepostas no filtro;
  - ficha das 3 perguntas sem título por 1,4 s;
  - cabeçalho da CTA quebrando;
  - título ausente no quadro 0.

## Cenas
1. **Gancho:** visor de câmera gravando desde o quadro 0. GRAVAR PARA IMPRESSIONAR (fachada com brilho e corações, PARA O PROPRIETÁRIO) → varredura no "contrário" → GRAVAR COMO QUEM VAI COMPRAR (armário aberto, LUZ, ACABAMENTO).
2. **Take 01:** ficha CASO REAL (nome, papel, país); cômodo ilustrativo com SALA BONITA / VISTA DA VARANDA, que recuam; armário abre, acabamento, CIRCULAÇÃO, detalhes → OLHAR DE QUEM COMPRA + Inspeção acompanhada ✓ × Comercial ✕.
3. **Take 02:** MOSTRE. NÃO ENFEITE. Adjetivos estouram; Cabe o móvel? (fita), Como entra a luz? (feixe), Qual detalhe merece atenção? (A CONFERIR); LIMITAÇÃO REAL + CONTEXTO → filtro do comprador certo.
4. **Take 03:** 3 PERGUNTAS REAIS na ficha da próxima visita gravada; REC em cada uma.
5. **Aplicação + transição:** TOUR GENÉRICO × TOUR COM RESPOSTAS → COMO VOCÊ CONDUZ O ATENDIMENTO; as perguntas descem para ATENDIMENTO · COMPRADOR e ficam REGISTRADAS.
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Conferir no Reel de referência o estilo dos vídeos descrito no roteiro.
- Ouvir 0:01, 0:06 e 0:34.
- Duração 64,0 s: dentro dos 60–70 s do roteiro e do ideal geral.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-CASE02 --source episodes/EP-ATIVO-CASE02/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-CASE02 && bash tools/render_episode.sh EP-ATIVO-CASE02
```
