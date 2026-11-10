# EP001 — Relatório de QA

**Estado: PILOTO renderizado e validado tecnicamente. NÃO aprovado para publicação** — faltam decisões que só o cliente pode tomar (voz, marca) e a revisão de ouvido.

## Executado

| Etapa | Resultado |
|---|---|
| A. Roteiro e referências | EP001 localizado no livro (DIA 01) e conferido palavra a palavra com `ROTEIROS/EP001.md`. 9 referências analisadas → `ANALISE/reference_style_report.md` |
| B. Ambiente e licenças | Node 22, Python 3.13, FFmpeg 6.1, 4 CPUs, sem GPU. Remotion 4.0.542. Licenças em `licencas_e_creditos.md` |
| C. Audições de voz | Rodada 1: 3 vozes Kokoro (reprovadas pelo cliente: "robótica"). Rodada 2: 5 vozes Gemini com a narração inteira do EP001. ElevenLabs sem crédito; Chatterbox bloqueado pela rede → `ANALISE/voice_comparison.md` |
| D. Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck` **provisória**, gerada em uma tomada: 37,05 s de fala (≈ 167 palavras/min), vídeo de 38,90 s |
| E. Storyboard e motion | 5 cenas em Remotion, tempos derivados da narração real → `EP001_shotlist.md` |
| F. Legendas, trilha, efeitos | 42 blocos de legenda na tela + SRT (21 linhas); trilha e 71 efeitos sintetizados por código |
| G. Render e validação | MP4 gerado e validado (abaixo) |

## Validação técnica do arquivo final (`validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Dimensões | 1080×1920 ✅ |
| Vídeo | H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 38,91 s (timeline 38,90 s) ✅ |
| Decodificação completa sem erros | ✅ |
| Loudness | −14,87 LUFS (alvo −14 a −16) ✅ |
| True peak | −1,21 dBTP (≤ −1) ✅ |
| Trechos pretos ≥ 0,2 s | nenhum ✅ |
| Silêncio total ≥ 0,4 s | nenhum ✅ |
| Sincronia narração ↔ imagem | atraso medido de 0 ms entre o áudio do MP4 e a narração de referência ✅ |
| Tamanho | 13,4 MB, `faststart` ✅ |

## Revisão editorial por quadros

Inspecionados 26 quadros extraídos do MP4 final desta versão (≥ 4 por cena, incluindo primeira e última transição de cada uma). A versão anterior (voz Kokoro) teve 24 quadros finais e 46 de pré-render inspecionados; as cenas são as mesmas, só os tempos mudaram.

| Item | Resultado |
|---|---|
| Ortografia e acentuação dos textos na tela | Sem erro encontrado |
| Texto cortado ou saindo do quadro | Não encontrado |
| Área segura (250 px topo, 350 px base, 100 px laterais) | Conteúdo entre y≈240 e y≈1460. O topo do palco fica ~10 px acima do limite de 250 px — só bordas de cartão, nenhum texto |
| Primeiro quadro | Celular com a conversa do lead destacada; não é preto. A legenda entra em 0,12 s |
| CTA presente | "LINK NA BIO" de 34,5 s até o fim; "Agende uma demonstração" a partir de 36,3 s |
| Marca, URL, preço, promessa, depoimento | Nenhum |
| Rótulo de mockup | "conversa ilustrativa" (cena 2) e "interface ilustrativa" (cena 5) |
| Dados pessoais reais | Nenhum; todos os nomes são fictícios |
| Episódios misturados | Só conteúdo do EP001 |

## NÃO verificado — precisa de revisão humana

1. **Ninguém ouviu o áudio dentro do pipeline.** O cliente ouviu a versão Kokoro e reprovou a voz; a versão Gemini ainda não foi ouvida por ninguém. Trilha e efeitos sintetizados também seguem sem avaliação de ouvido. As métricas garantem volume e ausência de clipping, não qualidade.
2. **Fidelidade da fala ao texto:** a transcrição automática da narração adotada bate com o roteiro em todas as palavras, exceto "lead", que o reconhecedor escreve "Lid" (pronúncia "líd", a esperada). No alinhamento, 99 de 103 palavras foram localizadas diretamente; as outras 4 tiveram o tempo interpolado — conferir a legenda nesses pontos ("lead", "esse").
3. **Pausas e entonação** são as que o modelo escolheu numa tomada única; não há controle fino de pausa entre frases neste modo.
4. **Movimento em tempo real.** A revisão foi por quadros parados; fluidez, ritmo e eventuais trancos de animação não foram assistidos.
5. **Legibilidade em celular** e sobreposição com a interface real do Instagram: não testadas em aparelho.

## Divergências em relação ao pedido e ao Prompt Mestre

| Divergência | Motivo |
|---|---|
| Não existia `CLAUDE.md`, `ROTEIROS/`, `MODELS/` nem preset de voz no repositório | Estrutura criada a partir dos arquivos soltos na raiz; nada foi apagado |
| "Preset de voz oficial já aprovado" não existe | Voz provisória (hoje Gemini `Puck`); `VOZ/voice_preset.json` marcado `approved: false`. O Prompt Mestre pede aprovação antes do render final: por isso este vídeo é piloto |
| Sem capturas reais do sistema | Não há `assets/real_product/`. O CRM da cena 5 é mockup rotulado; não demonstra nenhuma função real do produto |
| Projeto editável fica em `PRODUCAO/`, não dentro de `OUTPUT/EP001/` | O motor é compartilhado pelos 60 episódios; duplicá-lo por episódio impediria reaproveitamento. `OUTPUT/EP001/` tem vídeo, capa, narração, legendas, stems e relatórios |
| Narração WAV | 48 kHz mono 16 bit (o Gemini entrega 24 kHz; convertido) |
| Duração de 38,9 s | Um pouco abaixo da faixa preferida (40–65 s); é a duração real da fala, sem esticar |
| Capa com o rótulo "ROTINA DO CORRETOR" | Descritor temático, não nome de marca. Remover em `src/episodes/EP001/Cover.tsx` se preferir |

## Riscos de conteúdo

- **Ritmo:** ≈ 167 palavras/min contra ≈ 210 nas referências. Melhorou (eram ≈ 150), ainda é mais calmo que elas.
- **Gancho:** depende de o espectador entender "lead" e ler a lista de conversas em ~1 s. Não há número nem promessa concreta, como nas referências.
- **CTA:** "link na bio" é o formato pedido, mas nenhuma das 9 referências o usa (todas pedem comentário com palavra-chave).
- **Fundo escuro:** o terço inferior fica vazio de propósito (interface do Instagram), mas o quadro é escuro como um todo.

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && npm run ep -- EP001
```

A narração do Gemini muda a cada geração, por isso está congelada em `PRODUCAO/episodes/EP001/narration_source.wav`: o comando acima reaproveita esse arquivo e reproduz o vídeo. `--regen` gera outra tomada (exige `GEMINI_API_KEY`).

## Dependências externas desta versão

- **Chave do Gemini:** devolveu erro 429 (cota) após 13 requisições nesta sessão. Um episódio usa 1 requisição; audições de várias vozes consomem mais. Plano e termos de uso comercial não verificados.
- **ElevenLabs:** conta conectada com 222 créditos; a narração do EP001 custa 622 no modelo v4. Nenhuma geração foi concluída nem cobrada.
