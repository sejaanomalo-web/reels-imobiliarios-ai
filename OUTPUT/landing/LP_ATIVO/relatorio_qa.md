# Vídeo principal da landing ATIVO (16:9) — relatório de QA

**Status: vídeo renderizado e validado tecnicamente.** Revisão por quadros extraídos e métricas de áudio; eu não consigo ouvir — a trilha (sintetizada em código) e a voz precisam de escuta humana antes de publicar.

## Entregas

| Arquivo | Para quê |
|---|---|
| `LP_ATIVO_16x9_FINAL.mp4` | Master 1920×1080, 30 fps, H.264 + AAC 48 kHz, 118,3 s, 56 MB |
| `LP_ATIVO_16x9_web.mp4` | Versão para a landing (CRF 25, faststart), 13 MB — mesma imagem e áudio |
| `LP_ATIVO_poster.png` | Pôster 1920×1080 (antes do play) |
| `LP_ATIVO_legendas.vtt` / `.srt` | Legendas em blocos curtos (61 blocos, ≤ 46 caracteres) para o player |
| `embed_landing.html` | Trecho da primeira dobra: vídeo mudo em autoplay + legenda + botão de som + CTAs com os links do briefing (Cal.com e WhatsApp com a mensagem pronta) |
| `LP_ATIVO_NARRACAO.wav`, `audio/` | Voz isolada, stems de trilha e efeitos, eventos de efeito |

## Checagem

| # | Item | Resultado |
|---|---|---|
| 1 | Texto | Narração corrida do item 19, completa e na ordem. 317/318 palavras; a voz acrescentou três artigos ("quando **a** informação **ficar**", "com **a** ajuda", "com **o** nosso time") — ouvir |
| 2 | Voz | Preset aprovado, 1,0×, tomada única sem edição; 166 palavras/min |
| 3 | Duração | **118 s** (briefing: 90–105 s). Ver ponto de atenção 1 |
| 4 | Curva emocional e cenas | As 9 cenas do briefing, na ordem, cada elemento visual no momento da palavra correspondente (ver shotlist) |
| 5 | Trilha | Original, sintetizada por blocos A–H amarrados às palavras: ticking some em "talvez o sistema esteja errado"; micro-silêncio depois de "ficar para trás"; riser + impacto na entrada do traço; groove nas funcionalidades; densidade cai na clareza; beat sai em "Mas o principal diferencial…", impacto em NÃO COMEÇAMOS PELO SISTEMA, silêncio, riser e volta crescendo em COMEÇAMOS POR VOCÊ; resolução no fim do traço da marca |
| 6 | Mixagem | Final −15,0 LUFS, pico −1,64 dBTP; narração −19,1 LUFS, trilha −38,2 LUFS (≈ 19 LU abaixo da voz, dentro da faixa pedida), efeitos −43 LUFS; ducking sob a voz. Reconhecimento da fala: 99,2% na voz isolada, 98,4% na mixagem — a trilha não encobre palavras |
| 7 | Texto na tela | Só as frases-chave do briefing; nenhuma narração inteira na tela |
| 8 | Movimento | Médio 1,23 (escala do medidor feito para 9:16). Maior trecho "parado" 3,2 s em "UMA TELA" (10,5–13,7 s): os contornos que surgem ali são sutis demais para o medidor, mas há mudança visível a cada ~0,5 s. O quadro final fica parado ~3 s de propósito (briefing) |
| 9 | Sincronia | Vídeo × narração: 0 ms |
| 10 | Render | 11/11: 1920×1080 · H.264 · yuv420p · 30 fps · AAC · 118,31 s · −15,01 LUFS · −1,64 dBTP · sem pretos · sem silêncio total |

## Correções feitas antes da entrega

- Ferramentas de pipeline só aceitavam IDs "EP…": a primeira montagem da narração sobrescreveu arquivos do EP001 — restaurados pelo git na hora; ferramentas corrigidas.
- Texto inventado por mim no gancho ("E SE O PROBLEMA FOR O SISTEMA?") removido.
- Cartão da Paula saía de quadro antes de "ficar para trás" → agora fica na borda, perde cor e some.
- 0,5 s de tela escura e vazia na entrada da dor (validação falhou) → texto antecipado.
- Cena da dor e começo do CTA quase parados (4,1 s e 3,8 s) → deriva contínua dos cartões, câmera, brilho no título.
- Marca encostando nos cartões, janela cortando a coluna da direita, linhas do diagnóstico cruzando, traço do pôster atravessando o texto.

## Pontos de atenção (decisão do cliente)

1. **118 s em vez de 90–105 s.** O texto tem 318 palavras; para caber em ~100 s na voz oficial seriam ~270. Os cortes de menor perda: "Porque a rotina de um corretor não acontece em uma única tela" (a imagem já mostra isso), as quatro perguntas do diagnóstico (ficar com duas) e a frase final do CTA. Exige nova narração (cota da voz renovada amanhã).
2. **Logo e seta oficiais ausentes.** O vídeo usa "ATIVO" só tipográfico e um traço de luz genérico. Com o arquivo oficial em `PRODUCAO/public/brand/` e o verde neon oficial, troco em `kit.tsx` e re-renderizo sem mexer no resto.
3. **Telas ilustrativas.** O briefing pede telas REAIS do sistema; não há nenhuma no repositório. As interfaces foram desenhadas em código e marcadas "INTERFACE ILUSTRATIVA". Enviando capturas reais (Imóveis, CRM, Campanhas, Assistente), substituo.
4. **Afirmações de produto** (CRM, leads de campanhas, Assistente com IA, diagnóstico) vêm do briefing; não verifiquei no sistema.
5. **Autoplay mudo.** Na landing o vídeo começa sem som (regra dos navegadores). Por isso o HTML liga a legenda por padrão e oferece "Ativar som". Sem isso, quem não clicar perde a narração.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py LP-ATIVO --source ../OUTPUT/landing/LP_ATIVO/audio/tomada_A_usada.wav && python3 tools/build_music_lp.py LP-ATIVO && python3 tools/build_audio.py LP-ATIVO && bash tools/render_episode.sh LP-ATIVO
```
(Depois de `build_narration`, regerar as legendas curtas — o script gera blocos por frase.)
