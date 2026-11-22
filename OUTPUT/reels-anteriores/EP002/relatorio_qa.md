# EP002 — Relatório de QA

**Estado: vídeo completo, renderizado e validado tecnicamente — com voz em RASCUNHO.** Mesma voz aprovada (Puck), mas gerada por um modelo irmão, porque a cota diária gratuita do modelo aprovado acabou. A troca é um comando (abaixo) e refaz tudo sozinha.

## Executado

| Etapa | Resultado |
|---|---|
| A. Roteiro e referências | EP002 localizado no livro (DIA 07) e extraído para `ROTEIROS/EP002.md`; o texto narrado foi conferido por script contra o livro: idêntico. Referências: mesma análise do EP001 (`ANALISE/reference_style_report.md`), aplicada à variação visual exigida pela seção 8 do Prompt Mestre |
| B. Ambiente e licenças | Mesmo ambiente do EP001. Licenças em `licencas_e_creditos.md` |
| C. Voz | Puck aprovada pelo cliente (`VOZ/voice_preset.json`, `approved: true`) |
| D. Narração | Gerada em uma tomada: 39,03 s de fala, ≈ 148 palavras/min, 99% do texto reconhecido, 95/96 palavras alinhadas |
| E. Storyboard e motion | 5 cenas novas em Remotion → `EP002_shotlist.md` |
| F. Legendas, trilha, efeitos | 37 blocos de legenda na tela (1 trecho oculto de propósito) + SRT com 20 linhas; trilha e 56 efeitos sintetizados |
| G. Render e validação | MP4 gerado e validado (abaixo) |

## Validação técnica (`validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Dimensões | 1080×1920 ✅ |
| Vídeo | H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 40,98 s (timeline 40,97 s) ✅ |
| Decodificação completa sem erros | ✅ |
| Loudness | −15,09 LUFS (alvo −14 a −16) ✅ |
| True peak | −1,40 dBTP (≤ −1) ✅ |
| Trechos pretos ≥ 0,2 s / silêncio ≥ 0,4 s | nenhum ✅ |
| Sincronia narração ↔ imagem | atraso medido de 0 ms ✅ |
| Tamanho | 11,2 MB, `faststart` ✅ |

## Revisão editorial por quadros

36 quadros de pré-render e 28 quadros extraídos do MP4 final (≥ 4 por cena, incluindo entradas e saídas).

| Item | Resultado |
|---|---|
| Corrigido na revisão | Primeiro quadro quase vazio (cartão invisível, contorno fraco); tracinho vermelho solto antes de "“só olhando”"; pontos vermelhos sob as janelas antes da linha; valor "R$ 0623" com zero à esquerda e sorteando sem parar |
| Ortografia e acentuação | Sem erro encontrado |
| Texto cortado ou fora do quadro | Não encontrado |
| Área segura | Conteúdo entre y≈250 e y≈1460; nada essencial nas faixas da interface do Instagram |
| Primeiro quadro | “SÓ OLHANDO.” em contorno + cartão do lead visível |
| CTA | "LINK NA BIO" de 38,1 s até o fim; "Conheça o sistema" a partir de 38,7 s |
| Marca, URL, preço real, promessa, depoimento | Nenhum |
| Rótulo de mockup | "conversa ilustrativa" (cena 3) e "interface ilustrativa" (cena 5) |
| Conteúdo de outros episódios | Nenhum: personagem, situação e exemplos são exclusivos do EP002 |

## Ponto de atenção visual

- **Transição cena 2 → 3 (≈ 14,9–15,1 s):** por ~0,3 s o cabeçalho da conversa aparece por trás das janelas que saem. É uma fusão intencional, mas pode parecer embolada no celular. Conferir assistindo.

## A voz deste episódio

| | Modelo aprovado `gemini-3.8-flash-tts` | Usado `gemini-3.1-flash-tts-preview` |
|---|---|---|
| Voz | Puck | Puck |
| Situação | Cota diária gratuita esgotada (10/dia); libera por volta de 08h UTC de 11/11 | Funcionou |
| Tomada obtida | Uma, que **errou o roteiro**: "E você já coloca ele" saiu "E ou seja, coloca ele"; "o momento" saiu "um momento". Rejeitada e guardada em `audio/narracao_tomada_rejeitada_gemini-3.8-flash-tts.wav` | 99% do texto; única divergência "dez" → "10" (é a mesma palavra) |

**Não verifiquei se as duas soam iguais.** É o mesmo nome de voz no mesmo serviço, mas modelos diferentes podem mudar timbre e entonação. Ouça a tomada rejeitada (modelo aprovado) ao lado do vídeo para comparar.

### Trocar para o modelo aprovado quando a cota voltar

```bash
cd PRODUCAO && npm run ep -- EP002
```

O pipeline percebe que a narração atual é rascunho, gera até 4 tomadas com o modelo aprovado e só troca se uma delas reconhecer ≥ 97% do texto. Se nenhuma passar, mantém o rascunho e salva a melhor tomada para escuta. Cenas, legendas e efeitos se reposicionam sozinhos.

## NÃO verificado — precisa de revisão humana

1. **Ninguém ouviu o áudio** (voz, trilha e efeitos). As métricas garantem volume e ausência de clipping, não qualidade.
2. Movimento em tempo real: a revisão foi por quadros parados.
3. Legibilidade em celular e sobreposição com a interface real do Instagram.

## Divergências em relação ao pedido

| Divergência | Motivo |
|---|---|
| Salvo em `OUTPUT/reels-anteriores/EP002/`, não em `OUTPUT/reels-anteriores/EP001/` | O pedido dizia `OUTPUT/reels-anteriores/EP001/`, mas isso sobrescreveria as entregas do EP001. Tratado como erro de digitação |
| Voz em modelo irmão | Cota diária do modelo aprovado esgotada (acima) |
| Legenda oculta no trecho da pergunta | A pergunta é a tipografia da cena (roteiro: "diálogo encenado com tipografia"); repetir embaixo duplicaria o texto. O SRT mantém o trecho |
| Ritmo ≈ 148 palavras/min | Mais lento que as referências (≈ 210). É a fala do modelo; não acelerei |

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && python3 tools/build_narration.py EP002 --model gemini-3.1-flash-tts-preview && npm run audio -- EP002 && npm run render -- EP002
```

A narração usada está congelada em `PRODUCAO/episodes/EP002/narration_source.wav`; com `--model` igual ao do rascunho ela é reaproveitada, sem chamar a API.
