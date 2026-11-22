# EP003 — Relatório de QA

**Estado: vídeo completo, renderizado e validado.** É o primeiro episódio no padrão de energia v2. Voz no modelo **aprovado** (`gemini-3.8-flash-tts`, Puck). Uma palavra precisa ser conferida de ouvido (item 2).

## Os 10 pontos pedidos

As medições abaixo vêm de `tools/voice_metrics.py`, `tools/motion_check.py`, `tools/validate.py` e do reconhecimento de fala. Nenhuma substitui assistir com som.

| # | Pergunta | Resultado | Como foi verificado |
|---|---|---|---|
| 1 | O gancho causa impacto nos primeiros segundos? | Os cinco celulares já tocam no primeiro quadro, a câmera gira e se aproxima, e há 5 notificações em 1 s. Os dois primeiros segundos são os de maior movimento do vídeo (5,4 e 7,6). O segundo 2 chega a 20,5, no mergulho no "?" | Quadros + medição de movimento |
| 2 | A narração transmite energia e emoção? | **Ritmo: sim.** 220 palavras/min (EP001: 167; EP002: 148); pausas em 7,4% do tempo (antes 17–19%); maior pausa 0,24 s (antes 0,7–0,8 s). **Entonação: não melhorou na medição.** Desvio de F0 de 5,6 semitons, contra 5,7–6,3 antes. A energia percebida vem sobretudo do ritmo; se a interpretação soa mais viva, **só a escuta diz** | `voice_metrics.py` |
| 3 | Existem pausas excessivas? | Não: maior pausa de 0,24 s. As pausas acima de 0,24 s foram encurtadas (1,1 s no total); as curtas ficaram intactas | idem |
| 4 | O ritmo visual acompanha a voz? | 28 marcas de animação presas a palavras da fala (≈ 1 a cada 0,9 s); câmera com 30+ keyframes ligados às mesmas marcas | `EP003_shotlist.md` |
| 5 | As cenas têm movimento e progressão? | Movimento médio de **3,73**, contra 1,98 (EP001) e 1,49 (EP002). Quadros parados: **12%**, contra 53–62%. **Maior trecho parado: 0,3 s**, contra até 2,4 s. As mesmas cinco pessoas evoluem do começo ao fim | `motion_check.py` |
| 6 | Os efeitos estão sincronizados? | 50 eventos, todos posicionados a partir dos tempos reais das palavras; atraso medido entre o áudio do MP4 e a narração: 0 ms | `audio/eventos_sfx.json` + correlação |
| 7 | Legendas legíveis e sincronizadas? | Blocos de 1–4 palavras; cada palavra aparece no instante em que é dita, com sublinhado na palavra falada; base escura translúcida; 72 px; posição y≈1392, dentro da área segura | Quadros |
| 8 | O insight é compreensível e útil? | Visualizado em três passos: o erro (fila por chegada), a regra (ETAPA + PRAZO, combinados primeiro) e o limite (capacidade da semana, "não cabe → reagendar") | Quadros |
| 9 | A CTA é clara e conectada? | O fluxo único é a fila organizada da cena 4 em perspectiva ampla; LINK NA BIO a partir de 24,1 s, com o botão pulsando até o último quadro | Quadros |
| 10 | Acabamento próximo das referências? | Mais próximo que os EP001/EP002: câmera contínua, profundidade, legenda ativa, trilha com bateria. A densidade de ilustração das referências (3D, pixel art, objetos variados) ainda é maior | Comparação com `ANALISE/reference_style_report.md` |

## Validação técnica (`validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Arquivo | `EP003_FINAL.mp4`, 13,4 MB, `faststart` |
| Formato | 1080×1920, H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 26,67 s (timeline 26,67 s) ✅ |
| Decodificação sem erros | ✅ |
| Loudness / true peak | −14,99 LUFS / −1,27 dBTP ✅ |
| Pretos ≥ 0,2 s / silêncio ≥ 0,4 s | nenhum ✅ |
| Inteligibilidade com trilha e efeitos | Texto reconhecido: 94,6% na voz isolada → 92,5% na mixagem final (a trilha quase não mascara a fala) |

## Corrigido durante a revisão (78 quadros inspecionados)

- O gancho cobria a legenda com a roda de celulares: a mesa subiu e o "?" foi reposicionado.
- O primeiro cartão de pedido aparecia baixo e cortado à direita: reposicionado e com zoom menor.
- O zoom em "Primeiro" cortava os avatares: zoom reduzido de 1,3× para 1,12×.
- O selo "NÃO CABE → REAGENDAR" saía da tela: reposicionado.
- O fluxo único do CTA estava pequeno e apagado: trilhas, avatares e rótulos maiores e mais contrastados.

## Conferir de ouvido

1. **"Primeiro, cumpra o que já foi combinado" (≈ 16,0 s).** Os dois reconhecedores ouvem "compra". Pode ser só a vogal reduzida da fala rápida, mas, se soar "compra", o trecho muda de sentido. Para corrigir:

```bash
cd PRODUCAO && python3 tools/voice_takes.py EP003 B_rapida
```

   Isso gera uma tomada nova no modelo aprovado. Para adotá-la e reconstruir o vídeo:

```bash
cd PRODUCAO && python3 tools/build_narration.py EP003 --source ../OUTPUT/testes-de-voz/EP003_tomada_B_rapida.wav && npm run audio -- EP003 && npm run render -- EP003
```

2. **Pequenos desvios do texto** típicos de fala natural: "agendar a visita", "escolheu o bairro", "tá" no lugar de "está". Não mudam o sentido; foram mantidos.
3. **Time-stretch de 1,066×:** é leve e preserva altura e formantes. Ainda assim, confirme que a voz não soa "acelerada".

## Divergências e decisões

| Item | Decisão e motivo |
|---|---|
| Duração de 26,7 s | Abaixo da faixa de 40–65 s do Prompt Mestre. É consequência direta do novo ritmo pedido (1,4×) aplicado a um roteiro de 92 palavras. Não estiquei |
| Tomadas de voz | 4 tentadas: A (cota esgotada), **B (usada)**, C no `3.1-flash-tts-preview` (perdeu "fluxo" e trocou "corretores" por "corretor"), D no `2.5-pro-preview-tts` (sem cota gratuita). Métricas em `audio/tomadas_metricas.json` |
| Velocidade | A tomada já veio rápida (198 palavras/min, 1,26×). Para chegar a 1,4×, primeiro encurtei pausas e depois apliquei um stretch leve, em vez de acelerar o arquivo inteiro |
| Preset global de voz | Intocado. A direção de energia v2 vive em `episodes/EP003/episode.json` → `voice`, para comparar com os episódios anteriores |
| Amostra do EP001 | Intocada. Os novos áudios usam o prefixo EP003 |
| Arquivos editáveis | Fonte de verdade em `PRODUCAO/` (motor compartilhado pelos 60 episódios); cópia do que é exclusivo do EP003 em `OUTPUT/reels-anteriores/EP003/editaveis/` |

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && npm run ep -- EP003
```

A narração está congelada em `episodes/EP003/narration_source.wav`; o comando acima não chama a API.
