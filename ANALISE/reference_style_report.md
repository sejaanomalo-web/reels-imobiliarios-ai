# Relatório de estilo das referências — 9 Reels em `MODELS/`

`REFERENCE_ANALYSIS_STATUS=VERIFIED_PARTIAL`

**O que foi de fato verificado:** os 9 MP4 foram abertos. Imagem: 1 quadro a cada 3 s de cada vídeo (≈ 180 quadros no total), mais amostras de 5 s em dois deles. Áudio: medição com FFmpeg (loudness, pico, pausas) e transcrição automática (Whisper small). Dados brutos em `ANALISE/referencias_dados.json`, gerados por `PRODUCAO/tools/analyze_references.py`.

**O que NÃO foi verificado:** ninguém *ouviu* o áudio — timbre da voz, qualidade da trilha e caráter dos efeitos sonoros não são observáveis por métrica. Movimento entre quadros (curvas de animação, duração exata das transições) foi inferido de quadros a cada 3 s, não assistido em tempo real. Fontes: só as que aparecem escritas dentro de um dos vídeos.

## Ficha técnica (medida)

| Arquivo | Duração | Resolução / FPS | Cortes secos* | Loudness | Pico real | Palavras/min |
|---|---|---|---|---|---|---|
| ref_01 | 43,3 s | 720×1280 / 30 | 0 | −14,2 LUFS | −4,2 dBTP | 218 |
| ref_02 | 56,2 s | 720×1280 / 30 | 1 | −14,2 | −3,9 | 213 |
| ref_03 | 64,6 s | 720×1280 / 30 | 5 | −14,1 | −3,5 | 224 |
| ref_04 | 58,5 s | 720×1280 / 30 | 0 | −14,2 | −3,6 | 205 |
| ref_05 | 74,0 s | 720×1280 / 30 | 0 | −14,1 | −3,5 | 136 (tem desafio cronometrado, com pausas) |
| ref_06 | 51,5 s | 720×1280 / 30 | 0 | −14,2 | −4,2 | 213 |
| ref_07 | 61,9 s | 720×1280 / 30 | 0 | −14,2 | −4,0 | 207 |
| ref_08 | 54,0 s | 720×1280 / 30 | 2 | −14,1 | −4,0 | 202 |
| ref_09 | 55,3 s | 720×1280 / 30 | 1 | −14,1 | −3,8 | 195 |

\* detecção de mudança de cena do FFmpeg (limiar 0,30). Todos: H.264 + AAC 44,1 kHz, narração em pt-BR.

## Padrões recorrentes (verificados em ≥ 2 referências)

1. **Mesmo autor, mesmo sistema.** As 9 são do mesmo perfil (o nome aparece nas telas finais) e seguem um template único. Não é um "conjunto de estilos": é uma identidade só, repetida.
2. **Tema: ferramentas de IA para criadores e pequenos negócios.** Nenhuma trata de imóveis, corretagem ou CRM. Servem como referência de ritmo e acabamento, não de linguagem visual do nicho.
3. **Palco em cima, legenda no meio, base vazia.** Um cartão/objeto protagonista ocupa o terço superior-central; a legenda fica logo abaixo (~68% da altura); o terço inferior é só fundo (9/9).
4. **Fundo preto com grade em perspectiva e partículas desfocadas** (9/9).
5. **Legenda de 1 a 4 palavras por vez, palavra a palavra**, sem caixa; a palavra-chave troca para serifa itálica dentro de uma caixa azul com "alças" de seleção (9/9).
6. **Quase nenhum corte seco** (0–5 por vídeo): as cenas se transformam umas nas outras (cartão vira cartão, zoom, desfoque). Um novo protagonista visual a cada ~3 s.
7. **Abertura com objeto em 3D/perspectiva** (logos, cadeado, vitrine, calendário, celular) e depois interfaces planas (9/9).
8. **Alternância de cartões escuros (UI) e cartões "papel" claros** para marcar momentos de explicação (≥ 6/9).
9. **Interfaces ilustrativas no lugar de gravações de tela**: terminais, painéis, chats e planilhas redesenhados, com texto grande.
10. **Narração muito rápida e contínua:** 195–224 palavras/min em 8 de 9, sem nenhuma pausa acima de 0,35 s.
11. **Áudio masterizado sempre igual:** −14,1 a −14,2 LUFS, pico em torno de −4 dBTP, variação dinâmica mínima (LRA ≈ 1,3).
12. **CTA é sempre "Comenta [PALAVRA] aqui embaixo que eu te mando"** (9/9), com a cena final simulando a seção de comentários e a DM chegando. **Nenhuma usa "link na bio".**
13. **Gancho falado na primeira frase**, com promessa concreta ou número ("100 compradores simulados", "27 mil estrelas", "por até R$ 3.000").

## Elementos pontuais que merecem consideração

- ref_08 (clínica odontológica): a única com narrativa de negócio local — relógio, WhatsApp, agenda, ficha, confirmação. É a mais próxima do nosso caso.
- ref_05: desafio interativo com cronômetro; retenção por participação, não por informação.
- ref_03: mostra números de resultado próprios (seguidores) — não temos dados reais para fazer o mesmo.

## Boas práticas transferíveis (adotadas)

- Um protagonista visual por vez, no terço superior-central; legenda curta logo abaixo; base livre para a interface do Instagram.
- Cenas que nascem da anterior, sem cortes secos.
- Interfaces ilustrativas com texto grande em vez de telas reais minúsculas.
- Contraste escuro → cartão claro para o momento de clareza (insight).
- Loudness de entrega consistente.

## O que evitamos para não imitar a identidade de terceiros

- Grade em perspectiva + partículas: usamos linhas de planta baixa em deriva lenta.
- Serifa itálica em caixa azul com alças: usamos cor de acento + marcador que "pinta" por baixo.
- Par tipográfico Inter Tight + Instrument Serif (aparece escrito em ref_03): usamos Manrope + JetBrains Mono.
- Laranja e azul do autor: acento verde-menta provisório.
- Cena final de comentários/DM e qualquer elemento, personagem, fala ou trilha deles.

## Decisões deste episódio e motivo

| Decisão | Motivo |
|---|---|
| Palco entre y=240 e y=1260, legenda em y≈1390 | Prática transferível nº 3 + área segura do Prompt Mestre |
| Transições motivadas (mergulho no celular, conversa vira cartão na pilha, caos dobra em 3 cartões, cartões encaixam no CRM) | Prática nº 6 + seção 4 do Prompt Mestre |
| Cartões "papel" só no insight | Contraste narrativo: problema escuro, clareza clara |
| −15 LUFS, pico −1,5 dBTP | Faixa do Prompt Mestre (−14 a −16); as referências ficam em −14,1 |
| CTA "link na bio" | Exigência do roteiro e do Prompt Mestre — **diverge** das referências (ver alerta) |

## Alertas

1. **O CTA do projeto é mais fraco que o das referências.** Todas pedem um comentário com palavra-chave; isso gera comentários (sinal de distribuição) e captura o contato por DM. "Link na bio" exige sair do vídeo, abrir o perfil e tocar no link. Se a meta é crescer o perfil, vale testar o formato de comentário — é uma decisão do cliente, não foi alterada aqui.
2. **Nosso ritmo de fala é ~30% mais lento:** ≈ 150 palavras/min contra ≈ 210 das referências. O roteiro tem 106 palavras para 42,7 s; elas colocam ~200 palavras em 55 s.
3. **Densidade visual:** as referências trocam de protagonista a cada ~3 s com ilustrações variadas (pixel art, 3D, papel). O EP001 tem 5 cenas e ~20 momentos visuais — coerente, porém menos variado.
