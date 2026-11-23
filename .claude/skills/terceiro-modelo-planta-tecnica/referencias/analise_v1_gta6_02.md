# Análise do v1 — ATIVO_GTA6_02 (estilo 3, entregue em 22/11/2026)

Fonte analisada: o MP4 publicado no Instagram (baixado pelo cliente, 720×1280, 50,9 s) e o original de `PUBLICACAO/…/ATIVO_GTA6_02.mp4` (50,8 s). Folha de 1 quadro/s + quadros em detalhe + leitura do código (`src/episodes/ATIVO-GTA6-02/`). É conteúdo próprio da ATIVO, sem identidade de terceiros a evitar.

## O que funcionava (mantido no v2)
- Metáfora forte e simples: o assunto vira planta (cômodo = frente de negócio, cota = medida, chamada = observação, carimbo = assinatura).
- Paredes que se desenham na palavra; revelação progressiva.
- Legenda falada, título de folha no topo, selos ILUSTRATIVO e PERSONAGEM FICTÍCIO.
- Mapa com rota vermelha negada (perseguição) e pinos (negócios, interesses, poder).
- Nenhum corte seco detectado (detector de cena > 0,2: zero cortes).

## O que foi corrigido no v2
| v1 | Problema (Nível 1) | v2 |
|---|---|---|
| Fundo verde-escuro + grade verde em tela inteira; todas as paredes verdes | verde deixa de ser raro e perde o significado (assinatura 2); "fundo verde inteiro" é anti-padrão | prancha marinho (atmosfera `dados`), grade neutra, linha branca; verde só com `acende` |
| Fundo iluminado por igual | falta luz localizada (assinatura 1) | uma luz sobre a área de trabalho + vinheta |
| Paredes 5–6 px, cotas 2 px, rotas 6 px | traço deve ser único no vídeo | `TRACO` 3 px; contorno externo duplo |
| Frases de 24 px ("vista para o mar", "+ DRE'QUAN PRIEST") e rótulos sem espaçamento | mínimo de 30 px para frase; 24 px só em maiúsculas espaçadas | subtítulos 30 px; rótulos 24 px com 0,14 em |
| Folhas trocadas por opacidade (sai uma, entra outra) | crossfade sem âncora é proibido | `mergulho` no cômodo-alvo / planta que encolhe e vira quadra |
| "O império dele" com moldura vazia ~1 s | ritmo (algo muda a cada 1,5 s) e cara de "carregando" | esboço tracejado com as divisões e rótulos já na abertura |
| Gráfico de barras para patrimônio | foge da metáfora (cara de template) | `Elevacao`: prédio em corte, andares sobem um a um |
| Fecho com a CTA do Painel (fundo da planta some) | fecho genérico, quebra a continuidade | `CtaPlanta`: projeto "SEU SISTEMA" + campo SISTEMA + logo assinado (na esteira, o `Cta` padrão continua válido) |

## Medições do piloto v2 (ATIVO-PLANTA-01)
- 1080×1920, H.264 yuv420p, 30 fps, AAC, 50,77 s.
- Áudio: −14,9 LUFS integrado, pico −2,0 dBTP, 23 eventos (mesma mixagem do GTA6_02, voz congelada).
- `sistema_visual_check --quadros` (24 quadros): 0 erro, 0 aviso.
