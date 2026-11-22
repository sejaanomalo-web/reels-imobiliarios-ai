# EP015 — Relatório de QA

**Estado: vídeo completo, renderizado e validado — com voz em RASCUNHO.** Mesma voz Puck no modelo irmão `gemini-3.1-flash-tts-preview`, porque a cota diária gratuita do modelo aprovado (`gemini-3.8-flash-tts`) acabou. A troca é automática quando a cota voltar (comando abaixo). Padrão de energia v2 (`PROMPTS/GUIA_MELHORIA_CONTINUA.md`).

## Os 10 pontos do padrão v2

| # | Pergunta | Resultado medido |
|---|---|---|
| 1 | Gancho com impacto | A bolha "Obrigado." já está entrando no primeiro quadro; o ponto final cresce até ocupar a tela e vira "?" em 3 s; mergulho de câmera aos 3,7 s (o segundo de maior movimento do vídeo: 26,1) |
| 2 | Narração com energia e emoção | 205 palavras/min (1,31× a média de 157 dos EP001/EP002); pausas em 5,5% do tempo; **variação de entonação de 6,6 semitons, a maior da série até agora** (EP001 5,7 · EP002 6,3 · EP003 5,6) e intensidade de 7,7 dB. Só a escuta confirma |
| 3 | Pausas excessivas | Maior pausa: 0,19 s |
| 4 | Ritmo visual acompanha a voz | 31 marcas presas a palavras (≈ 1 a cada 0,9 s) |
| 5 | Movimento e progressão | Movimento médio 3,61 (EP003: 3,73; EP001/EP002: 1,5–2,0); 10,9% de quadros parados; maior trecho parado 0,4 s |
| 6 | Efeitos sincronizados | 38 eventos nos tempos reais das palavras; atraso medido entre áudio do MP4 e narração: 0 ms |
| 7 | Legendas | Dinâmicas (palavra a palavra, sublinhado na falada, base escura); y≈1392 |
| 8 | Insight útil | Regra concreta em 3 passos visíveis: pergunte (dois caminhos), registre (DATA, ASSUNTO, EXPECTATIVA), compare (encerrada × acompanhada) |
| 9 | CTA conectada | O fio vira tarefa com data no quadro "Próximos passos"; LINK NA BIO de 26,1 s até o fim |
| 10 | Acabamento | Mesmo padrão do EP003, com metáfora visual própria (fio da conversa) |

## Validação técnica (`validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Arquivo | `EP015_FINAL.mp4`, 12,2 MB, `faststart` |
| Formato | 1080×1920, H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 28,50 s (timeline 28,50 s) ✅ |
| Decodificação sem erros | ✅ |
| Loudness / true peak | −15,09 LUFS / −1,44 dBTP ✅ |
| Pretos / silêncio | nenhum ✅ |
| Inteligibilidade | Texto reconhecido: 97,8% na voz isolada → 97,3% na mixagem final |

## Corrigido durante a revisão (81 quadros inspecionados)

- O primeiro quadro mostrava a bolha vazia e deslocada; o ponto final ficava distante da palavra.
- O avatar "VOCÊ" cobria o primeiro cartão do fio; os avatares agora andam à frente da linha.
- O cartão "pergunte." era cortado quando a câmera ia para a agenda; a agenda estava pequena.
- DATA / ASSUNTO / EXPECTATIVA em tipografia grande se sobrepunham ("DATASSUNTO"), e EXPECTATIVA saía cortada.
- O painel de baixo da tela dividida invadia a legenda.
- Na capa, o "?" saía espremido e cortado.

## Voz: rascunho e troca

| | Aprovado `gemini-3.8-flash-tts` | Usado `gemini-3.1-flash-tts-preview` |
|---|---|---|
| Situação | Cota diária gratuita esgotada; libera por volta das 08h UTC (05h de Brasília) de 11/11 | Funcionou |
| Tomadas | — | R1 (usada): 98,4% do texto; R2: descartada ("sexta" ouvido como "cesta") |

Não verifiquei se os dois modelos soam iguais com a mesma voz.

**Quando a cota voltar,** o comando abaixo detecta o rascunho e gera até 4 tomadas no modelo aprovado. Só troca se uma reconhecer ≥ 97% do texto; senão mantém o rascunho e salva a tomada para escuta. Cenas, legendas e efeitos se reposicionam sozinhos.

```bash
cd PRODUCAO && npm run ep -- EP015
```

Atenção: no ritmo rápido, a tomada aprovada do EP003 ficou em 94,6%, abaixo dessa régua. Se isso acontecer aqui, a tomada fica em `OUTPUT/reels-anteriores/EP015/audio/` para você ouvir. Para adotá-la mesmo assim:

```bash
cd PRODUCAO && python3 tools/build_narration.py EP015 --force && npm run audio -- EP015 && npm run render -- EP015
```

## NÃO verificado

1. Ninguém ouviu o áudio (voz, trilha, efeitos).
2. Time-stretch de 1,18×, maior que o do EP003 (1,066×), porque a tomada veio mais lenta. Preserva altura e formantes, mas confirme que a voz não soa "acelerada".
3. Movimento em tempo real e legibilidade no celular.

## Divergências em relação ao pedido

| Item | Decisão |
|---|---|
| Salvo em `OUTPUT/reels-anteriores/EP015/`, não em `OUTPUT/reels-anteriores/EP001/` | Salvar em `EP001` sobrescreveria as entregas do EP001; tratado como erro de digitação (como no EP002) |
| "Use essa voz para criar audicao_gemini_Puck_EP001.wav" | Entendido como "use a voz da audição Puck do EP001". A amostra original não foi alterada; os áudios novos têm prefixo EP015 |
| Voz em modelo irmão | Cota diária do modelo aprovado esgotada (acima) |
| Duração de 28,5 s | Abaixo da faixa de 40–65 s: consequência do ritmo v2 aplicado a 92 palavras |
| Padrão v2 | Aplicado conforme o `CLAUDE.md`; continua "aguardando aprovação" no guia |

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && python3 tools/build_narration.py EP015 --model gemini-3.1-flash-tts-preview && npm run audio -- EP015 && npm run render -- EP015
```
