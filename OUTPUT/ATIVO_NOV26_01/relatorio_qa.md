# QA — ATIVO_NOV26_01 · "Selic parada, financiamento caro" (lote 30 Reels nov/2026 · 17/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_01.md` (lote `ATIVO_30_ROTEIROS_NOV2026.docx`). Narração palavra por palavra (GANCHO + TAKES 01–03); as direções visuais não são lidas. Reel orgânico, voz 1,0×, **verde do lote #02FB3F** (`ACCENT_NOV26`), logo oficial só no fecho.

## Apuração
- **Fato:** o Copom manteve a Selic em **13,75% a.a.** em 04/11/2026, por unanimidade. Conferido em 17/11/2026 em notícias da data ([O Liberal](https://www.oliberal.com/economia/bc-copom-interrompe-ciclo-de-calibracao-e-mantem-taxa-selic-em-13-75-ao-ano-1.1190560)); a fonte oficial do roteiro é a ata do BCB.
- **Cuidados:**
  - nenhuma taxa de financiamento, parcela ou valor na tela;
  - perfis, imóvel e "cálculo do banco" marcados como ilustrativos;
  - sem aconselhamento financeiro individual.

## CTA (regra dos Reels, 14/11/2026)
- No roteiro: "Salve este vídeo para lembrar: juros básicos e financiamento não são a mesma coisa."
- Virou a transição **"Lembre: juros básicos e financiamento não são a mesma coisa."** + CTA SISTEMA → Direct. A frase mantém a ideia do roteiro sem o "salve". **Pendente de aprovação.**

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1**, 2 gerações (A 53,1 s · B 50,4 s).
- **Usada: tomada A + 1ª frase da tomada B (emenda).**
  - A tomada A abre com um "Ó," a mais antes de "a Selic". Testei a sílaba de abertura isolada: na A, "ou acelique"; na B, só "A".
  - Corte na pausa após "por cento", crossfade de 12 ms, ganho igualado por RMS (×1,02).
- **Tomada B descartada no restante:** "entra maior" (entrada).
- A voz diz "faça **a** simulação" (as duas tomadas); o sentido não muda.
- 53,2 s de fala, 160 palavras/min.
- **Ponto para ouvir: 0:00.** O Whisper ainda escreve "Ó, a Selic" no começo do arquivo, mesmo na abertura da tomada B, que isolada soa só "A". Parece vício do reconhecedor no início do áudio. Se você ouvir um "Ó", me avise e regravo a frase.

## Validação
- `validate.py` 11/11:
  - 1080×1920 · H.264 · yuv420p · 30 fps · AAC
  - 55,57 s
  - −14,99 LUFS · TP −1,56 dBTP
- `editorial_check` 0 erros / 0 avisos, perfil NOV26: verde #02FB3F, sem o verde antigo nos arquivos do episódio.
- Movimento médio 1,49 · maior trecho parado 1,0 s. A 1ª medição deu 1,37 / 1,3 s; ajustei com flutuação dos cartões e a câmera no fim do Take 02.
- Mixagem × roteiro: 0,94.
  - Diferenças: número falado ↔ dígitos ("13 75"), "ó" do reconhecedor, "a" de "faça a simulação", "Comenta" (coloquial aceito).
  - "a alternativa" está na emenda da janela de 40 s.
- 21 + 5 quadros revisados. Corrigidos:
  - título sobre o mostrador da Selic (Take 01);
  - título sobre o imóvel e o rótulo (Take 02);
  - pergunta do cliente por baixo do título (Take 03);
  - lado direito vazio no 1º segundo (o termômetro entra em 1 s).

## Cenas
1. **Gancho:** mostrador SELIC 13,75% (COPOM · 04/11/2026 · SELIC MANTIDA) × termômetro FINANCIAMENTO esquentando; PESA NO BOLSO / Por quê?
2. **Take 01:** a Selic vira REFERÊNCIA; SELIC ≠ TAXA DO FINANCIAMENTO. "Cálculo do banco" (ILUSTRATIVO) com custo do dinheiro, riscos, prazo e condições da operação, um item por palavra.
3. **Take 02:** mesmo apartamento + COMPRADOR 1 (entrada maior, renda estável) × COMPRADOR 2 (valor financiado maior), barras sem números. SIMULAÇÃO A ≠ B; MESMO IMÓVEL / SIMULAÇÕES DIFERENTES; MESMO DIA.
4. **Take 03:**
   - "Agora é uma boa hora para comprar?" + notícia do Copom com SÓ A NOTÍCIA NÃO BASTA;
   - checklist orçamento e entrada / simulação atualizada / alternativas comparadas;
   - O CLIENTE PRECISA DE CENÁRIO, NÃO PALPITE; JUROS BÁSICOS ≠ FINANCIAMENTO.
5. **CTA SISTEMA:** a lista orçamento / simulação / comparação dobra no módulo IMÓVEIS; COMENTE "SISTEMA" → Direct + logo.

## Observações
- A logo oficial tem a seta no verde antigo, porque é o arquivo do cliente e não pode ser redesenhada. Para combinar com o #02FB3F é preciso um arquivo novo da marca.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-01 --source episodes/ATIVO-NOV26-01/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-01 && bash tools/render_episode.sh ATIVO-NOV26-01
```
