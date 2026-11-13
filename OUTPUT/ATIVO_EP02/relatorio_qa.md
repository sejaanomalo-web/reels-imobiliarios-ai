# ATIVO — Episódio 02 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Checagem

| # | Item | Resultado |
|---|---|---|
| 1 | Roteiro correto | `ATIVO_Episodio_02.md` enviado em 13/11 → `ROTEIROS/ATIVO_EP02.md`; 5 cenas na ordem |
| 2 | Fidelidade do texto | Gancho, cinco exemplos e insight palavra por palavra. Mudou só o fecho: "Salve este Reel e" saiu; entrou a CTA SISTEMA (pedido do cliente) |
| 3 | Voz original em 1,0× | `gemini-3.8-flash-tts` / `Puck` / direção original; tomada C sem edição |
| 4 | Pronúncia | 224/229 palavras alinhadas; "olha", "ambientes", "um momento" e "se a imagem" conferidos com dois reconhecedores. **Ouvir:** o fim da CTA ("Comenta SISTEMA que eu te envio…"): os reconhecedores divergem em "envio". "Comenta" é a forma coloquial já aceita nos episódios anteriores |
| 5 | Direção visual do roteiro | Vídeos genéricos com a mesma frase + cursor pausando + O QUE TEM A VER COMIGO? ✔ · divisão do cômodo para estudo ✔ · fachada simples → planta interna ✔ · mapa sem distâncias ✔ · circulação de casa térrea ✔ · comprador com prioridades + cinco rótulos alinhados ✔ · editor com PARA QUEM ESTE IMÓVEL FAZ SENTIDO? + cartões salvos ✔ · **SALVE PARA A PRÓXIMA GRAVAÇÃO substituído por COMENTE "SISTEMA"** (pedido) · **logo ✘ (arquivo ausente)** |
| 6 | Integridade | Imóveis, plantas e mapa marcados como ilustrativos; nenhuma distância ou tempo inventado; "a 2 min do metrô" e "rampa de acesso" só aparecem como exemplos de promessa inventada, riscados |
| 7 | Movimento | Médio 1,83; maior trecho parado 1,1 s (limite 1,5 s) |
| 8 | Legendas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 9 | Áudio | Narração na frente; trilha −37,3 LUFS; efeitos −34,7; efeitos em pausas, nenhum sobre sílaba |
| 10 | CTA | COMENTE "SISTEMA" + "Receba os detalhes no Direct."; sem link da bio, sem segunda CTA, sem promessa de resposta automática |
| 11 | Render | 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 83,88 s · −14,97 LUFS · −1,74 dBTP · sem pretos · sem silêncio total |

## Correções feitas antes da entrega

- O texto "OLHA ESSA OPORTUNIDADE!" saía cortado nos cartões do gancho → fonte reduzida.
- O celular ficava vazio de 1,2 a 3 s no início de cada abertura (rotina, contraste, localização, objeção) → o conteúdo agora entra junto com o cabeçalho.
- Linhas animadas com comprimento zero e ponta arredondada deixavam um ponto solto (vermelho ao lado da escada por ~3 s; verde na planta) → escondidas até começarem a se desenhar.

## Pontos de atenção (decisão do cliente)

1. **84 segundos é longo demais para Reels.** O roteiro tem 229 palavras; a voz oficial leu a 169 palavras/min — já mais rápido que a estimativa de 145. Acima de ~60 s a retenção cai muito. Para os próximos roteiros: 130–150 palavras.
2. **A CTA original era de salvamento**, coerente com um conteúdo-ferramenta ("cinco aberturas"). Troquei por SISTEMA, como pedido, mas a ligação entre "aberturas de vídeo" e "sistema para organizar imóveis, leads e atendimentos" é fraca: o vídeo ensina gravação, a CTA vende organização. Vale medir comentários deste contra os episódios em que o tema era organização.
3. **Logo:** ausente (o arquivo não está no repositório).

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO02 --source ../OUTPUT/ATIVO_EP02/audio/tomada_C_usada.wav && python3 tools/build_audio.py EP-ATIVO02 && bash tools/render_episode.sh EP-ATIVO02
```
