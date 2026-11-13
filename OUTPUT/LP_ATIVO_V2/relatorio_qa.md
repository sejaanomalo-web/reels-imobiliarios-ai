# Vídeo da landing ATIVO v2 (16:9) — relatório de QA

**Status: renderizado e validado tecnicamente.** Revisão por quadros e métricas; eu não consigo ouvir — a voz a 1,2× e a trilha precisam de escuta humana.

## O que mudou da v1 para a v2 (pedido do cliente em 13/11)

| Pedido | Feito |
|---|---|
| Texto coerente com a fala, como transcrição dinâmica | O texto grande agora é **exatamente** o que a voz diz: blocos de 2–4 palavras, cada palavra entra no instante em que é falada, palavras-chave em verde, faixa fixa embaixo. Saíram todas as frases-resumo que divergiam da voz (ex.: "NÃO É FALTA DE OPORTUNIDADE" enquanto a voz dizia "falta de cliente") |
| Mais dinâmica | Movimento médio 2,39 (v1: 1,23); maior trecho parado 0,5 s (v1: 3,2 s); 19% de quadros parados (v1: 54%) |
| Elementos e textos maiores | Transcrição a 86 px; cartões +15–20%; janela das funcionalidades de 1150 → 1700 px de largura; botões do CTA de 44 → 58 px |
| Gancho mais forte | Começa já em movimento (sem preto): campos rígidos batendo e apertando o CORRETOR, ✕ vermelho com tremor em "errado", tudo se desmonta e a rotina passa a orbitar o corretor. **O texto do gancho é o mesmo** — ver ponto 1 abaixo |
| 1,2× mais rápido | Voz acelerada 1,2× com tom preservado (196 palavras/min) |
| 1 a 1,5 min | **86,5 s** (cortes de 4 frases, listados no roteiro) |

## Checagem

- Render 11/11: 1920×1080 · H.264 · yuv420p · 30 fps · AAC · 86,5 s · −15,03 LUFS · −1,94 dBTP · sem pretos · sem silêncio.
- Sincronia vídeo × narração: 0 ms. Reconhecimento da fala: 98,7% na voz isolada, 98,4% na mixagem (a trilha não encobre palavras). "com IA" conferido no Whisper.
- Desvios da voz em relação ao texto (vêm da gravação da v1): "quando **a** informação **ficar**", "com **a** ajuda", "com **o** nosso time".

## Pontos de atenção

1. **O gancho ainda é abstrato no texto.** A referência prende porque abre com uma cena concreta de perda. Proposta para gravar amanhã (cota da voz renova ~5h de Brasília), substituindo só as duas primeiras frases — o resto do vídeo fica igual:
   > "Terça, sete da noite. A Paula pede um retorno sobre o apartamento. Você anota… em algum lugar. Sexta, ela fecha com outro corretor. Não faltou cliente. Faltou um sistema que acompanhasse a sua rotina."
   Visual: relógio 19:00 + mensagem da Paula → post-it perdido → "sexta-feira" em vermelho + selo "fechou com outro corretor" → corte para o corretor com a rotina orbitando. Duração final estimada: ~89 s.
2. **1,2× contraria a decisão anterior do projeto** (narração sempre a 1,0×, sem aceleração). Apliquei porque você pediu explicitamente para este vídeo; registrei no guia como exceção da landing, não da série de Reels.
3. **Telas ilustrativas e marca provisória** continuam (sem telas reais nem logo no repositório). É o maior ganho pendente em relação à referência.
4. **Autoplay mudo**: com a transcrição grande na tela, o vídeo funciona sem som. No HTML a legenda do player ficou desligada por padrão (seria duplicada); o `.vtt` continua disponível para acessibilidade.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py LP-ATIVO-V2 --source ../OUTPUT/LP_ATIVO_V2/audio/narracao_cortada_1p2x.wav && python3 tools/build_music_lp.py LP-ATIVO-V2 && python3 tools/build_audio.py LP-ATIVO-V2 && bash tools/render_episode.sh LP-ATIVO-V2
```
