# EP001 — Relatório de QA

**Estado: PILOTO renderizado e validado tecnicamente. NÃO aprovado para publicação** — faltam decisões que só o cliente pode tomar (voz, marca) e a revisão de ouvido.

## Executado

| Etapa | Resultado |
|---|---|
| A. Roteiro e referências | EP001 localizado no livro (DIA 01) e conferido palavra a palavra com `ROTEIROS/EP001.md`. 9 referências analisadas → `ANALISE/reference_style_report.md` |
| B. Ambiente e licenças | Node 22, Python 3.13, FFmpeg 6.1, 4 CPUs, sem GPU. Remotion 4.0.542. Licenças em `licencas_e_creditos.md` |
| C. Audições de voz | 3 vozes Kokoro em `OUTPUT/VOICE_AUDITIONS/`. Chatterbox **não gerado** (rede bloqueia huggingface.co) |
| D. Narração | 10 blocos, 40,97 s de fala, vídeo de 42,70 s. Voz `pm_alex` **provisória** |
| E. Storyboard e motion | 5 cenas em Remotion, tempos derivados da narração real → `EP001_shotlist.md` |
| F. Legendas, trilha, efeitos | 42 blocos de legenda na tela + SRT (21 linhas); trilha e 78 efeitos sintetizados por código |
| G. Render e validação | MP4 gerado e validado (abaixo) |

## Validação técnica do arquivo final (`validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Dimensões | 1080×1920 ✅ |
| Vídeo | H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 42,71 s (timeline 42,70 s) ✅ |
| Decodificação completa sem erros | ✅ |
| Loudness | −15,16 LUFS (alvo −14 a −16) ✅ |
| True peak | −1,47 dBTP (≤ −1) ✅ |
| Trechos pretos ≥ 0,2 s | nenhum ✅ |
| Silêncio total ≥ 0,4 s | nenhum ✅ |
| Sincronia narração ↔ imagem | atraso medido de 0 ms entre o áudio do MP4 e a narração de referência ✅ |
| Tamanho | 14,3 MB, `faststart` ✅ |

## Revisão editorial por quadros

Inspecionados 24 quadros extraídos do MP4 final (≥ 4 por cena, incluindo primeira e última transição de cada uma) e 46 quadros de pré-render.

| Item | Resultado |
|---|---|
| Ortografia e acentuação dos textos na tela | Sem erro encontrado |
| Texto cortado ou saindo do quadro | Não encontrado |
| Área segura (250 px topo, 350 px base, 100 px laterais) | Conteúdo entre y≈240 e y≈1460. O topo do palco fica ~10 px acima do limite de 250 px — só bordas de cartão, nenhum texto |
| Primeiro quadro | Celular com a conversa do lead destacada; não é preto. A legenda entra em 0,12 s |
| CTA presente | "LINK NA BIO" + "Agende uma demonstração", de 38,2 s até o fim |
| Marca, URL, preço, promessa, depoimento | Nenhum |
| Rótulo de mockup | "conversa ilustrativa" (cena 2) e "interface ilustrativa" (cena 5) |
| Dados pessoais reais | Nenhum; todos os nomes são fictícios |
| Episódios misturados | Só conteúdo do EP001 |

## NÃO verificado — precisa de revisão humana

1. **Ninguém ouviu o áudio.** Não há como ouvir neste ambiente. Qualidade da voz, naturalidade, se a trilha sintetizada soa agradável ou amadora, se os efeitos incomodam: tudo isso está sem avaliação. As métricas garantem volume e ausência de clipping, não qualidade.
2. **Pronúncia de "lead".** O modelo lia "leád"; foi corrigido para "lídi". Os reconhecedores automáticos ouvem "LED". Conferir.
3. **Pronúncias que um dos dois reconhecedores errou:** "encheu" (ouvido como "em Shell") e "bio"/"agende" (ouvido como "B.E.O."/"agente de"). O outro reconhecedor acertou as três. Conferir.
4. **Movimento em tempo real.** A revisão foi por quadros parados; fluidez, ritmo e eventuais trancos de animação não foram assistidos.
5. **Legibilidade em celular** e sobreposição com a interface real do Instagram: não testadas em aparelho.

## Divergências em relação ao pedido e ao Prompt Mestre

| Divergência | Motivo |
|---|---|
| Não existia `CLAUDE.md`, `ROTEIROS/`, `MODELS/` nem preset de voz no repositório | Estrutura criada a partir dos arquivos soltos na raiz; nada foi apagado |
| "Preset de voz oficial já aprovado" não existe | Usada voz provisória; `VOZ/voice_preset.json` marcado `approved: false`. O Prompt Mestre pede aprovação antes do render final: por isso este vídeo é piloto |
| Sem capturas reais do sistema | Não há `assets/real_product/`. O CRM da cena 5 é mockup rotulado; não demonstra nenhuma função real do produto |
| Projeto editável fica em `PRODUCAO/`, não dentro de `OUTPUT/EP001/` | O motor é compartilhado pelos 60 episódios; duplicá-lo por episódio impediria reaproveitamento. `OUTPUT/EP001/` tem vídeo, capa, narração, legendas, stems e relatórios |
| Narração WAV | 48 kHz mono 16 bit (Kokoro gera 24 kHz; convertido) |
| Capa com o rótulo "ROTINA DO CORRETOR" | Descritor temático, não nome de marca. Remover em `src/episodes/EP001/Cover.tsx` se preferir |

## Riscos de conteúdo

- **Ritmo:** ≈ 150 palavras/min contra ≈ 210 nas referências. Pode parecer lento ao lado delas.
- **Gancho:** depende de o espectador entender "lead" e ler a lista de conversas em ~1 s. Não há número nem promessa concreta, como nas referências.
- **CTA:** "link na bio" é o formato pedido, mas nenhuma das 9 referências o usa (todas pedem comentário com palavra-chave).
- **Fundo escuro:** o terço inferior fica vazio de propósito (interface do Instagram), mas o quadro é escuro como um todo.

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && npm run ep -- EP001
```

A voz Kokoro é determinística: o mesmo texto e preset geram a mesma narração.
