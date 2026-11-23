> **Registro histórico (23/11/2026):** análise e parecer apresentados ANTES da implementação e aprovados pelo cliente ("agora vá para a criação"). O estado vigente está em `TRILHAS/README.md` e `TRILHAS/trilhas.json`.

# Sistema Musical ATIVO — análise das 5 trilhas e parecer (23/11/2026)

> Primeira entrega, **sem implementação**. Nenhum arquivo do repositório foi alterado. As 5 faixas originais estão intactas. Análise 100% local (ffmpeg, librosa, Whisper local); nada foi enviado a serviço externo.
> Mapa visual das 5 faixas: `MAPA_5_TRILHAS.png` (nesta pasta).

## 0. Parecer em uma tela — **CONCORDO COM AJUSTES**

A ideia é boa e o pipeline já tem metade do caminho: a trilha da landing (`build_music_lp.py`) já foi composta por blocos amarrados às palavras da narração, e o `build_audio.py` já tem ducking, "respiros" (`music.drops`) e master −15 LUFS. O que falta é a peça central — **adaptar uma faixa real à história por estrutura musical**, sem esticar — e um catálogo persistente.

Ajustes que considero obrigatórios:
1. **Licença primeiro.** As 5 faixas são **REFERÊNCIA** até prova de licença. Publicamos por API com o áudio embutido no MP4, então a biblioteca licenciada do Instagram/TikTok **não cobre** — e contas comerciais só podem usar bibliotecas comerciais. O sistema precisa de uma trava: trilha sem licença não sai do teste interno.
2. **Masters fora do repositório público.** O repositório é público; subir as faixas é redistribuir música de terceiros. Masters ficam num lugar privado (repositório privado ou bucket privado do Supabase). No repositório público vai só a inteligência (análises, perfis, regras).
3. **5 faixas não sustentam 6 vídeos/dia.** São 42 vídeos por semana: cada faixa tocaria ~8×/semana e duas delas dominariam pela afinidade. As 5 devem virar **5 papéis musicais (arquétipos)** e a biblioteca precisa crescer para 15–20 faixas licenciadas ou originais, mapeadas a esses papéis.
4. **Mudar a regra sonora vigente.** O padrão de 11/11/2026 (`GUIA_MELHORIA_CONTINUA.md`) é "trilha discreta sem bateria". Três das cinco têm bateria marcada. Se você aprovar o sistema, essa regra muda — decisão sua, registrada.
5. **Viralização ≠ trilha.** Não dá para saber quanto do alcance desses vídeos veio da música. Se veio do "áudio em alta" usado dentro do app, embutir a mesma música no nosso MP4 não traz esse efeito (o vídeo não entra na página do áudio). Tratar as 5 como referência de **função narrativa**, não como atalho de alcance.

---

## 1. Como analisei (e o limite honesto)

- Arquivos: `35cf088d-1123.mp4` (T01), `c51afc3f-1124.mp4` (T02), `c0ef2793-1125.mp4` (T03), `d44fe731-1126.mp4` (T04), `c713ca38-1127.mp4` (T05). Todos são **só áudio útil**: vídeo 2160×3840 preto, zero mudança de imagem. Áudio AAC 44,1 kHz estéreo (~177 kbps), completo.
- Cópias de trabalho WAV 48 kHz/24 bit no scratchpad. Originais não tocados.
- Medições: loudness/true peak (ebur128), pulso por "pente" sobre a curva de ataques (mais preciso que rastreador de batidas), compasso pelo padrão de graves, tonalidade por croma (Krumhansl), seções por novidade espectral + matriz de autossimilaridade, espectrograma completo, ocupação de frequência comparada à **narração real da Puck**, pitch (pyin) na T04, Whisper local para detectar fala.
- **Limite:** eu analisei o sinal inteiro, mas não "escuto" como uma pessoa. Estrutura, tempos, BPM, tom e espectro são medidos. Os rótulos de emoção são **inferência** (modo, andamento, densidade, dinâmica, timbre) e precisam da sua escuta para confirmar.
- **Achado comum:** as 5 vieram normalizadas em exatamente −23,0 LUFS (efeito da exportação). O volume original dos vídeos é desconhecido; isso não atrapalha, porque o sistema vai nivelar por loudness de qualquer forma.
- **Fala:** Whisper local só devolve "[Música]" nas 5. Nenhuma tem locução. Exceção a checar de ouvido: a T04 tem uma linha melódica contínua com glissandos na região da voz (pode ser voz cantada sem palavras ou um lead com portamento).

## 2. Como o áudio da ATIVO funciona hoje (auditoria)

| Peça | Estado real | Implicação para trilhas reais |
|---|---|---|
| Trilha | 100% sintetizada por código: pad + pulso por cena (`music.prog`), bateria opcional (`music.drums`). Narração −19/−20 LUFS, trilha −34 a −36,5 LUFS (13–17 dB abaixo) | o nível relativo já está bem calibrado; manter a referência |
| `music.file` (faixa externa) | usado só na landing. **Corta no tamanho do vídeo**, sem fade, e normaliza por **pico** | exatamente o "cortar no segundo 42" que você não quer. Faixas produzidas têm pico/loudness muito diferentes (PLR 15–21 dB): normalizar por pico dá níveis inconsistentes |
| Ducking | voz detectada por limiar de energia (−38 dB), suavização 0,28 s, profundidade fixa −5,5 dB na faixa inteira; efeitos −2 dB | suficiente para pad sintético. Para piano/melodia na faixa da voz (T02, T04) é pouco e "bombeia" entre palavras |
| Respiros | `music.drops`: trilha cai a 8% com ataque 40 ms e volta em 120 ms | a base do microdrop já existe |
| Efeitos | 23 sons sintetizados; os do fecho são afinados fixos: `shimmer` = Ré-Fá-Lá-Ré (Ré menor), `chord` = Fá maior | **choque de tonalidade**: com T03 (Ré♭ maior) ou T04 (Dó# menor), o shimmer da CTA fica meio tom fora — dissonância no fecho |
| Master | loudnorm 2 passagens: −15 LUFS, TP −1,5/−2 dBTP | mantém |
| Inteligibilidade | Whisper local já usado (histórico: 94,6% → 92,5% com bateria) | vira um portão automático da mixagem |
| Regra vigente | "trilha discreta sem bateria, sem drops" (11/11/2026) | conflita com 3 das 5 faixas |
| Precedente | `build_music_lp.py`: trilha da landing composta por blocos A–H ancorados em palavras (cues), silêncios e impactos exatos | prova de que "a música segue a história" funciona no nosso pipeline |

---

## 3. Fichas das cinco faixas

Convenções: tempos em mm:ss do arquivo original. "Grade" = início do 1º tempo forte + duração do compasso.

### TRILHA 01 — "Pulso grave contínuo" (`35cf088d-1123.mp4`)

| Técnico | |
|---|---|
| Duração | 79,2 s (música útil até ~79,0) |
| Formato | AAC 44,1 kHz, estéreo (largura moderada) |
| Loudness / true peak | −23,0 LUFS (export) · LRA **1,9 LU** (quase sem variação) · −7,2 dBTP |
| BPM | **120,0** (sensação de 60) |
| Compasso | 4/4 provável (confiança baixa: padrão de 8 tempos) · compasso 2,0 s, grade a partir de 0,15 s |
| Tonalidade | **incerta** (Dó menor 0,52 × Dó maior 0,49): quase não há harmonia |
| Espectro | 91% da energia abaixo de 250 Hz; ~0% entre 1–4 kHz |

**Personalidade:** tensão contínua de investigação, um suspense hipnótico. A emoção principal é a tensão contida; mistério e gravidade vêm em segundo plano. Energia média-baixa e constante, tensão média, sofisticação média, agressividade baixa. É a que deixa **mais espaço para a voz** das cinco.

**Estrutura e momentos:**
- 00:00 já começa com graves (sem intro silenciosa; provável recorte do meio da música)
- 00:06 textura completa
- 00:08, 00:24, 00:34, 00:40 e 00:57 brilhos agudos pontuais
- 00:50,5 virada sutil (maior mudança da faixa)
- 00:52–00:56 e 01:06–01:12 leves subidas
- 01:17 queda
- 01:18,5 brilho final
- 01:19 fim

**Clímax:** não tem. A faixa é uma cama.

**Frases e cortes:** qualquer trecho se parece com qualquer outro (similaridade 0,97–0,98), então quase tudo é repetível. Entradas e saídas seguras em qualquer tempo depois de 00:06. Loops: 58,8–75,2 s (8 compassos) e 28,0–36,2 s. Não cortar 01:17–01:19 (é o final natural).

- **Territórios:** alta compatibilidade em AGORA (notícia e mecanismo sobre base neutra-tensa, sem melodia competindo). Possíveis: E SE…?, HISTÓRIA (investigação), FORA DA BOLHA (tecnologia, mistério). Pouco indicados: CORRETOR NA VIDA REAL (cena cotidiana fica soturna) e IDEIA (reflexão pede harmonia).
- **Modelos:** Maquete 3D e Planta técnica (muito); Pictograma (compatível); Cartoon (evitar: mata o humor).
- **Riscos:**
  - **Celular:** alto-falante de celular quase não reproduz abaixo de ~200 Hz, então a T01 pode simplesmente "sumir" no telefone. Precisa de teste com simulação de alto-falante antes de virar padrão.
  - **Sem eventos próprios:** sem clímax, todo evento depende de efeitos e respiros.
  - **Monotonia:** o uso repetido cansa.
- **Papel recomendado:** **cama de explicação**.

### TRILHA 02 — "Piano em ondas" (`c51afc3f-1124.mp4`)

| Técnico | |
|---|---|
| Duração | 82,3 s (o arquivo corta 1,7 s depois do acorde final) |
| Loudness / TP | −23,0 LUFS · LRA 7,3 LU · −5,2 dBTP |
| BPM | **sem pulso estável** (rubato); ~68 aproximado; as ondas se repetem a cada ~12,3 s |
| Compasso | indeterminado (arpejos sugerem 3/4 ou 6/8; confiança baixa) |
| Tonalidade | **Ré menor** (0,79; confiança alta) |
| Espectro | 74% entre 250 Hz–1 kHz e 14% entre 1–4 kHz: **a mesma região da voz** (Puck: 64% em 250 Hz–1 kHz) |

**Personalidade:** melancolia reflexiva em ondas. A emoção principal é a introspecção; saudade e uma esperança contida no clímax vêm em segundo plano. Energia baixa-média que respira, tensão média, sofisticação alta, agressividade nenhuma. Espaço para voz **baixo**: compete.

**Estrutura e momentos:**
- 00:01 acorde forte de abertura
- 00:00–00:08 motivo
- 00:08,4 frase 2
- 00:21,6 frase 3
- 00:34,8 crescendo
- **00:48 entrada do clímax**, com picos em 00:52 e 01:04
- 01:09 resolução quieta
- 01:20,5 acorde final
- 01:22,3 fim (cauda cortada)

**Frases e cortes:** sem grade de compasso, então só se corta **nos vales entre ondas**: ~13,5 s, ~21,5 s, ~34,5 s, ~46 s e 78–80 s, onde a energia cai para −40/−48 dB. Ali, crossfades de 0,5–1 s ficam quase imperceptíveis. Loop: a frase de 3,1–13,7 s se repete (0,95). Não cortar dentro de uma onda (do crescendo ao pico) nem o acorde final.

- **Territórios:** alta compatibilidade em HISTÓRIA QUE ENSINA e IDEIA QUE MUDA O JOGO. Possíveis: CORRETOR NA VIDA REAL (cena humana), E SE…? (hipótese emocional), FORA DA BOLHA (cinema). Pouco indicado: AGORA (piano melancólico sob notícia vira sensacionalismo).
- **Modelos:** Pictograma (muito); Maquete (compatível); Planta (contextual); Cartoon (evitar).
- **Riscos:**
  - **Mascaramento da voz:** exige ducking mais fundo ou que o piano cresça só nas pausas.
  - **Clichê de "piano triste":** usar com parcimônia.
  - **Adaptação mais grossa:** só dá para cortar em frases de ~12 s.
  - **Final:** o arquivo corta 1,7 s depois do acorde final, então precisa de uma cauda de reverberação sintética.
  - **Pausas curtas:** a narração tem pausas de 0,2–0,6 s, pouco para o piano respirar.
- **Papel recomendado:** **arco emocional**.

### TRILHA 03 — "Ascensão tech" (`c0ef2793-1125.mp4`)

| Técnico | |
|---|---|
| Duração | 91,6 s (final limpo em ~90,0 com decaimento natural) |
| Loudness / TP | −23,0 LUFS · LRA 8,7 LU · −7,7 dBTP |
| BPM | **120,0** |
| Compasso | **4/4** (confiança alta) · 1º tempo forte em 0,54 s · compasso 2,0 s · **frases de 8 compassos (16 s)** |
| Tonalidade | **Ré♭ (Dó#) maior** (0,75) |
| Espectro | 87% abaixo de 250 Hz; só 2% em 1–4 kHz nas seções cheias (18% na intro) |

**Personalidade:** ascensão otimista e tecnológica. Emoções principais: confiança, descoberta e triunfo; em segundo plano, expectativa (na quebra) e impacto (no B). Energia alta, com tensão média na quebra que vira alívio no drop. Sofisticação média-alta, agressividade média. Espaço para voz médio: os graves são fortes e os médios ficam livres, então o ducking é por densidade.

**Estrutura e momentos:**
- 00:00 intro
- 00:04,5 entra a batida (A)
- **00:18,5 parada** (2 s)
- 00:20,5 B, com impactos a cada 2 compassos (20,5 / 24,5 / 28,5 / 32,5)
- 00:32,5 subida
- **00:36,5 quebra** (tensão; uma linha sobe de 00:45 a 00:55)
- **00:56,5 drop e clímax**, com pico em 01:17
- 01:28,5 final
- 01:30 fim limpo

**Frases e cortes:** grade 0,54 + 2k s; fronteiras de frase em 16,5 / 32,5 / 48,5 / 64,5 / 80,5 s. Corte seguro em qualquer compasso de A, B e do drop. Loops: 66,5–82,5 s (8 compassos, 0,92) e 62,5–78,5 s. Não cortar a subida (32,5–36,5) nem o pré-drop (54,5–56,5). O outro natural é 88,5–91,6.

- **Territórios:** alta compatibilidade em E SE…? (o build → quebra → drop é a própria curva hipótese → consequência → revelação) e FORA DA BOLHA (tecnologia, cidades, jogos, esporte). Possíveis: AGORA (quando a notícia é positiva), IDEIA, HISTÓRIA de sucesso. Pouco indicados: CORRETOR NA VIDA REAL (épica demais para uma cena pequena) e notícia negativa.
- **Modelos:** Maquete e Planta (muito: objetos brotando e projeto que se monta no compasso de 2 s); Cartoon (compatível: os impactos a cada 2 compassos casam com corte seco a cada 2–4 s); Pictograma (contextual).
- **Riscos:** bateria (conflito com a regra de 11/11); energia alta pode "vender demais"; drop muito reconhecível se repetir.
- **Papel recomendado:** **arco de descoberta**. É a faixa mais estruturada das cinco e a melhor para testar o adaptador.

### TRILHA 04 — "Groove noir" (`d44fe731-1126.mp4`)

| Técnico | |
|---|---|
| Duração | 111,6 s; **música útil até 89,5 s** (de 90 a 111,6 só há sons esparsos, descartar) |
| Loudness / TP | −23,0 LUFS · LRA 9,5 LU (inflado pela cauda) · −5,4 dBTP |
| BPM | **110,0** (resíduo de 5 ms: grade de estúdio) · sensação de swing/tercina |
| Compasso | **4/4** (confiança alta) · tempo forte em 0,0 s · compasso 2,18 s · **frases de 4 compassos (8,7 s)** |
| Tonalidade | **Dó# menor** (0,88; confiança alta) |
| Espectro | nas seções A/A', 10–12% em 1–4 kHz e uma melodia contínua de 150–860 Hz com glissandos (na região da voz); na seção B, só 3% em 1–4 kHz |

**Personalidade:** tensão urbana com atitude. Emoção principal: determinação; em segundo plano, mistério noturno. Energia média-alta constante, tensão média, sofisticação média-alta, agressividade média. Espaço para voz **baixo em A/A' e bom em B**.

**Estrutura e momentos:**
- 00:00 começa cheia (sem intro; provável recorte)
- **00:21,8 respiro de 1 compasso** (cai a −50 dB)
- 00:24 B (cama sem melodia), com impactos em ~00:35, 00:41, 00:46 e 00:50
- **00:54,5 a melodia volta** (A', mais cheia)
- 01:28,5 pico
- 01:29,5 parada seca

**Frases e cortes:** grade 2,18 s a partir de 0,0; corte em qualquer compasso. Loops: 58,9–67,6 s (4 compassos, 0,91), 24,0–32,7 s (B) e 0–8,7 s. **Não cortar o respiro de 21,8–24 s**: é a melhor marca de revelação da faixa e deve ser usado inteiro. Não há final natural; o final sai do respiro reaproveitado ou de uma parada em tempo forte com cauda.

- **Territórios:** alta compatibilidade em CORRETOR NA VIDA REAL (rotina com ritmo de rua) e FORA DA BOLHA (urbano, jogos, cinema). Possíveis: AGORA, E SE…?, HISTÓRIA (caso, thriller). Pouco indicada: IDEIA.
- **Modelos:** Pictograma (muito: o noir pede isso); Maquete e Planta (compatível; narração sobre a seção B); Cartoon (contextual).
- **Riscos:** melodia na faixa da voz (narração deve ficar sobre B; A' entra em pausas, clímax e fecho); possível voz cantada (confirmar ouvindo); sem intro nem outro naturais; 22 s de cauda inútil.
- **Papel recomendado:** **tensão em movimento**.

### TRILHA 05 — "Batida constante" (`c713ca38-1127.mp4`)

| Técnico | |
|---|---|
| Duração | 101,0 s; **música útil até 90,0 s** (cauda esparsa depois, descartar) |
| Loudness / TP | −23,0 LUFS · LRA 5,1 LU · **−2,2 dBTP** (a mais quente) |
| BPM | **96,06** (resíduo de 4 ms) · componente de tercina |
| Compasso | 4/4 (confiança média-alta) · tempo forte em 0,08 s · compasso 2,50 s · **frases de 4 compassos (10 s)** · a 2ª metade repete a 1ª (ciclo de 45 s) |
| Tonalidade | **incerta** (Dó# maior e menor empatados) |
| Espectro | 74% abaixo de 250 Hz, 10–11% em 1–4 kHz; quase mono. **Há um tom agudo constante em ~7,1 kHz (+18,5 dB acima do entorno) na faixa inteira** |

**Personalidade:** confiança prática. Emoções: foco, ritmo de trabalho, segurança. Energia média-alta constante, tensão baixa, sofisticação média, agressividade média-baixa. Espaço para voz médio.

**Estrutura e momentos:**
- 00:00 começa cheia
- 00:20 variação de 2 compassos
- impactos em 00:21,5 e 00:34
- **00:43,2 silêncio total de 1,8 s**
- 00:45 volta
- 01:04,5 impacto
- **01:10 entra a melodia** (clímax)
- 01:30 parada seca

**Frases e cortes:** grade 0,08 + 2,498k s; fronteiras de frase em 10,1 / 20,1 / 30,1 / 40,0 / 45,05 / 55,0 / 65,0 / 70,0 / 80,0 / 90,0 s. Loops: 71,3–78,8 s (0,96) e 3,8–11,3 s. **Não cortar o silêncio de 43,2–45,05 s**: é o respiro mais forte das cinco. O final é seco, então precisa de cauda ou do último impacto.

- **Territórios:** alta compatibilidade em CORRETOR NA VIDA REAL (PULL, rotina, tutorial). Possíveis: IDEIA, AGORA, FORA DA BOLHA (esporte, internet). Pouco indicados: HISTÓRIA e E SE…? (falta arco).
- **Modelos:** Cartoon (muito: batida constante + corte seco + humor); Planta e Maquete (compatível); Pictograma (evitar: a skill pede pad escuro sem batida marcada).
- **Riscos:** o tom de 7,1 kHz pode soar como apito ou chiado constante (confirmar de ouvido; se for defeito, um filtro estreito resolve, mas é alterar a faixa); pouca variação emocional.
- **Papel recomendado:** **motor prático**.

---

## 4. Matriz geral

### Trilha × território
| | AGORA | E SE…? | FORA DA BOLHA | CORRETOR NA VIDA REAL | HISTÓRIA | IDEIA |
|---|---|---|---|---|---|---|
| **T01 Pulso grave** | **MUITO** | COMPATÍVEL | CONTEXTUAL | EVITAR | CONTEXTUAL | CONTEXTUAL |
| **T02 Piano em ondas** | EVITAR | CONTEXTUAL | CONTEXTUAL | COMPATÍVEL | **MUITO** | **MUITO** |
| **T03 Ascensão tech** | CONTEXTUAL (só positiva) | **MUITO** | **MUITO** | CONTEXTUAL | COMPATÍVEL | COMPATÍVEL |
| **T04 Groove noir** | COMPATÍVEL | COMPATÍVEL | **MUITO** | **MUITO** | COMPATÍVEL | CONTEXTUAL |
| **T05 Batida constante** | COMPATÍVEL | CONTEXTUAL | COMPATÍVEL | **MUITO** | CONTEXTUAL | COMPATÍVEL |

### Trilha × modelo visual × emoção
| | Cartoon | Pictograma | Planta | Maquete | Emoção principal | Curva própria |
|---|---|---|---|---|---|---|
| **T01** | EVITAR | COMPATÍVEL | **MUITO** | **MUITO** | tensão contida, mistério | plana (sem clímax) |
| **T02** | EVITAR | **MUITO** | CONTEXTUAL | COMPATÍVEL | introspecção, esperança contida | ondas → clímax → resolução |
| **T03** | COMPATÍVEL | CONTEXTUAL | **MUITO** | **MUITO** | confiança, descoberta, triunfo | intro → build → parada → quebra → drop → final |
| **T04** | CONTEXTUAL | **MUITO** | COMPATÍVEL | COMPATÍVEL | determinação, noite | A → respiro → B → A' |
| **T05** | **MUITO** | EVITAR | COMPATÍVEL | COMPATÍVEL | foco, segurança | constante → silêncio → constante → melodia |

**Lacunas que a matriz expõe:**
- Só uma faixa é MUITO para E SE…? (T03) e só uma para IDEIA (T02).
- **Não existe faixa de leveza ou humor**, e o Cartoon (humor que nasce do fato) fica mal servido.
- Falta uma faixa **otimista-reflexiva** (IDEIA sem melancolia).

São as primeiras compras ou composições da biblioteca.

---

## 5. Ficha musical (nasce do roteiro, ganha segundos depois da voz)

No roteiro ainda não existem segundos, então a ficha marca **frases**. Depois da narração congelada, o `timeline.json` dá os tempos reais e o adaptador alinha a música.

```
TERRITÓRIO: E SE…?
CURVA EMOCIONAL: curiosidade → tensão → consequência → surpresa → insight
MODELO VISUAL: Maquete 3D
TRILHA: T03 (papel "arco de descoberta")
POR QUÊ: build → quebra → drop sustenta hipótese → consequência → revelação; clímax longo cabe no payoff.
ÂNCORAS (frases do roteiro → eventos musicais):
  gancho      "E se o corretor cobrasse por visita?"     → entrada (intro 0–4,5)
  1ª virada   "Aí começa o problema."                     → parada (18,5) ou impacto do B
  descoberta  "O custo real de uma visita é…"             → quebra (36,5)
  insight     "Visita boa é a que foi filtrada antes."    → DROP (56,5)
  CTA         "Se você é corretor, comente SISTEMA…"      → drop abre espaço (duck extra) 
  final       logo formado                                → final natural (88,5–91,6)
MICRODROP: antes do insight (0,4 s)
```
Depois da voz: âncoras viram segundos (ex.: gancho 0,0 · virada 11,2 · descoberta 32,0 · insight 43,1 · CTA 49,0 · final 53,0) e o adaptador monta a faixa para isso.

## 6. Adaptação de duração — SHORTEN, EXTEND, FIT

O princípio é **reordenar estrutura, não esticar**. É a mesma ideia do "Remix" do Adobe Audition (reorganizar trechos semelhantes para atingir uma duração), mas guiada pelas âncoras da história.

- **Como decide:** cada faixa tem um **grafo de blocos** (compassos e frases) com as transições permitidas (sequência natural + saltos em costuras seguras). O adaptador procura o caminho (programação dinâmica) que:
  - começa na intro;
  - põe o **clímax na âncora do insight/payoff**;
  - põe o **final natural no fim do vídeo** (planejado de trás para a frente);
  - corta só frases ou compassos inteiros;
  - minimiza a distância entre eventos musicais e âncoras (tolerância de ±1 tempo);
  - penaliza costuras ruins (descontinuidade espectral).
- **SHORTEN** (o caso de quase todo Reel, porque as faixas têm 80–90 s e os vídeos 40–65 s): preserva intro, o essencial do desenvolvimento, clímax e outro, e remove frases intermediárias inteiras. Exemplo T03 → ~51 s: intro (4,5) + 4 compassos de A (8) + subida (4) + quebra encurtada (8) + drop (24) + final (3,1).
- **EXTEND** (vídeo maior que a faixa): repete só os loops marcados como seguros (ex.: T03 66,5–82,5), nunca a faixa inteira, e preserva a virada e o final.
- **FIT** (diferença pequena): resolve com ferramentas sem alterar o andamento, nesta ordem:
  1. deslocar o ponto de entrada (começar alguns tempos depois);
  2. trocar o compasso do corte;
  3. crossfade igual-potência de 1 tempo alinhado ao ataque;
  4. estender a cauda de ambiente/reverb no final.
- **Alteração de velocidade: minha opinião.** Um ajuste de ~1% (ex.: 120 → 121,2 BPM) com preservação de tom tende a ser imperceptível como andamento. Mas o algoritmo de esticar borra ataques de bateria em mixagens densas, e com o grafo de blocos quase nunca vai ser necessário. Proponho **0% por padrão**, com um teto de 1% desligado, que só liga depois de você ouvir um A/B. Pitch nunca muda.

## 7. Sincronização com a narrativa

O `timeline.json` já tem palavras e cues com tempo real; as âncoras do `episode.json` (`music.ancoras`) apontam para cues (`cue:x_ins`). Cada faixa tem eventos marcados (entrada de camada, parada, drop, clímax, resolução, final).

O adaptador alinha **evento musical → âncora narrativa**. Quando não dá dentro da tolerância, a música cede: o evento cai no tempo forte mais próximo da âncora, nunca o contrário. **A duração da história nunca é cortada para caber na faixa** (regra 13).

## 8. Ducking — diagnóstico e proposta

O sistema atual serve para pad sintético e é insuficiente para faixas reais. A proposta tem seis partes:

1. **Nivelar por loudness, não por pico.** Leito sob a fala a −15/−18 LU da voz (o padrão atual de 13–17 dB fica), subindo para −9/−11 LU em pausas de 0,6 s ou mais, e nunca acima da voz.
2. **Ducking em duas bandas.** Durante a fala, a banda 250 Hz–4 kHz da música desce mais (−8 a −10 dB) e os graves descem pouco (−3 dB). A música não "some", mas sai da frente das palavras. Isso é vital para T02 e T04.
3. **Ducking guiado pelo `timeline`, não por limiar.** Já sabemos quando cada palavra começa, então dá para abaixar ~80 ms antes da fala. Retorno em 250–400 ms. Pausas menores que 0,35 s não sobem (evita o bombeamento entre palavras).
4. **Perfil por faixa** no catálogo (ex.: T02 −3 dB extra; T04 em A/A' −2 dB extra; T01 sem extra).
5. **CTA:** −2 dB extra na frase da CTA (a mais importante). Depois a música resolve sobre o logo.
6. **Portão de inteligibilidade:** Whisper na mixagem final contra Whisper na narração pura. Se cair mais que um limite (proposta: 2 pontos), o render para.

## 9. Microdrops narrativos

- **Preferir os respiros nativos** das faixas, que soam mais naturais que um drop artificial: T03 18,5–20,5; T04 21,8–24; T05 43,2–45,05. O adaptador tenta pousar a frase de virada logo depois deles.
- **Drop artificial** (já existe em `music.drops`) em dois sabores: corte seco de 0,3–0,6 s, ou abafar com passa-baixas por 1–2 compassos. A volta é sempre no tempo forte seguinte.
- **Limite:** no máximo 1–2 por vídeo, só onde a ficha musical marcou virada, revelação, insight ou CTA. Nunca automático em todo vídeo.

## 10. Convivência com os efeitos (SFX)

- **Efeitos afinados na tonalidade da faixa.** Hoje o shimmer (Ré menor) e o chord (Fá maior) do fecho são fixos e ficam dissonantes com T03, T04 e T05. Com o tom no catálogo, o efeito é transposto. Nas faixas de tom incerto (T01 e T05) usar efeitos não afinados.
- **Efeitos no andamento:** risers terminam no tempo forte, whoosh dura 1 tempo, impacto do vídeo cai no impacto da música. Quando a faixa já tem impacto naquele ponto, o efeito desce ou sai (evita golpe duplo).
- **Durante a fala:** nada de efeito forte entre 2–5 kHz.
- As densidades por modelo continuam as das skills. A música é a base emocional; o efeito pontua.

## 11. Arquitetura recomendada

```
TRILHAS/                         ← versionado (público): só inteligência, nunca áudio de terceiros
  README.md                      regras, fluxo, status de licença, como adicionar faixa
  trilhas.json                   catálogo: perfil técnico, seções, eventos, grade, cortes, loops, voz, afinidades, licença
  papeis.json                    os 5 papéis/arquétipos (cama de explicação, arco emocional, arco de descoberta,
                                 tensão em movimento, motor prático) + lacunas (leveza/humor, otimista-reflexiva)
  analises/T0x.md + T0x_mapa.png ficha legível + mapa de energia anotado
  licencas/LEIAME.md             o que comprova cada licença (sem dados sensíveis)
  .gitignore                     masters/, previews/, cache/
  masters/   (NÃO versionado)    espelho local do armazenamento privado (FLAC/WAV originais, nunca alterados)
```

**Masters privados:** repositório privado no GitHub (`add_repo`) ou bucket privado no Supabase. Recomendo o **repositório privado**: o git já funciona em toda sessão, sem credencial extra, e o volume é pequeno (~12 MB por faixa em FLAC).

**Ferramentas**

| Ferramenta | O que faz |
|---|---|
| `PRODUCAO/tools/trilhas.py` (nova) | `calibrar <arquivo> --id T06` (a análise desta entrega, automatizada, gera um rascunho do perfil); `validar` (catálogo coerente, marcas na grade); `sugerir <EP>` (top 3 por adequação, com motivo; frequência recente só desempata); `uso` (histórico) |
| `PRODUCAO/tools/adaptar_trilha.py` (nova) | grafo de blocos + programação dinâmica: âncoras → plano → WAV adaptado (`public/<EP>/music.wav`) + relatório (lista de cortes, distância âncora × evento, nota das costuras, 0% de esticamento) |
| `build_audio.py` (modificar) | só quando o episódio tiver `music.trilha`: nível por loudness, ducking em 2 bandas guiado pelo timeline, efeitos transpostos, portão de inteligibilidade. **Episódios antigos continuam idênticos** |

**Fluxo:** roteiro aprovado com ficha musical → `trilhas.py sugerir` → escolha registrada na grade (slot `trilha`) → voz congelada → `adaptar_trilha.py` → `build_audio.py` → render → QA → `publicar.py` (portão de licença).

## 12. Alterações necessárias (depois da aprovação)

**Criar:**
- `TRILHAS/` com README, catálogo, papéis, análises, licenças e `.gitignore`
- `trilhas.py` e `adaptar_trilha.py`
- testes em `PRODUCAO/tools/tests/` (catálogo, duração exata, cortes na grade, 0% de esticamento, âncoras dentro da tolerância, costuras)
- testes de áudio em `OUTPUT/testes-de-trilha/` (não versionados enquanto a faixa for referência)

**Modificar:**

| Arquivo | Mudança |
|---|---|
| `build_audio.py` | bloco novo, ativado só por `music.trilha` |
| `novo_episodio.py` | grava `music.trilha` + `music.ancoras` |
| `editorial_check.py` | trilha existe; âncoras válidas; status de licença |
| `publicar.py` | **recusa trilha sem licença liberada** |
| `grade.py` | campo `trilha` + guardrails: mesma faixa no máximo 1× por dia sem justificativa, nunca em horários seguidos, no máximo 25% em 7 dias; `semana` agrega por trilha |
| Skill Mestre | `MODELO_DE_ENTREGA.md` ganha a ficha musical; etapa 07 ganha a curva emocional + âncoras |
| Skills dos 4 modelos | §12 Som: afinidades e perfil de mix por modelo |
| `PROMPTS/GUIA_MELHORIA_CONTINUA.md` | nova regra sonora |
| `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md` e `CLAUDE.md` | ponteiro curto |
| `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md` | etapa "Trilha" no modelo A |

**Preservar (sem tocar):** todos os episódios, MP4s e posts; a síntese atual (vira o caminho "sem trilha", ainda útil); os 23 efeitos; o master −15 LUFS; voz, CTA e Sistema Visual.

## 13. Riscos

| Risco | Gravidade | Mitigação |
|---|---|---|
| **Licença:** faixas de terceiros sem licença → áudio mutado (TikTok), reivindicação ou bloqueio (YouTube Content ID; Shorts com mais de 1 min e reivindicação ativa são bloqueados), retirada ou risco legal (Instagram de conta comercial) | **alta** | status no catálogo; publicação bloqueada; papéis para substituir por licenciada ou original |
| Licença de plataforma não viaja: Sound Collection da Meta vale só para Facebook/Instagram; a biblioteca comercial do TikTok vale só no app | alta | licença precisa cobrir as 3 redes e uso por API |
| Repositório público com masters | alta | masters privados; `.gitignore` |
| Repetição (5 faixas × 42 vídeos/semana) | alta | biblioteca de 15–20 faixas + guardrails na grade |
| Mascaramento da voz (T02, T04) | média | ducking em 2 bandas + portão Whisper |
| Celular (T01 nos graves) | média | teste com simulação de alto-falante; não usar T01 sozinha como única camada |
| Dissonância dos efeitos afinados | média | transpor pelo tom do catálogo |
| Código: adaptador complexo | média | testes automáticos + relatório de costuras + escuta sua nas 3 durações antes de qualquer vídeo |
| Qualidade: costuras audíveis em faixa rubato (T02) | média | cortes só nos vales; crossfades longos; T02 entra por último |
| Armazenamento: WAVs grandes | baixa | FLAC privado; renders gerados não versionados (regra atual) |
| Regra sonora de 11/11 contrariada | decisão | você aprova a nova regra |
| Aprender errado com poucos casos | média | `grade.py semana` cruza trilha × território × modelo × horário; só vira regra com padrão recorrente |

## 14. Variedade e aprendizado

- **Escolha:** adequação (matriz + curva da ficha musical) é o critério principal. A frequência recente só desempata, junto com os guardrails da grade. Não é rodízio.
- **Aprendizado:** cada slot publicado já recebe métricas (`grade.py resultado`). Com `trilha` no slot, a leitura semanal responde qual faixa funciona em AGORA, com Cartoon, de manhã, em retenção ou em compartilhamento. Só vira regra com volume e padrão recorrente.

## 15. Assinatura sonora — opinião

**Faz sentido, mas depois da biblioteca e nunca derivada das 5 faixas.** Ela deveria nascer do ritual que **já existe** no fecho: digitação de "SISTEMA" → clique → acorde. Formalizado em ~1 s, vira a assinatura sem inventar nada estranho à marca.

Duas condições:
1. **Afinada pela trilha do vídeo** (transposta para o tom do catálogo), para não repetir o choque que existe hoje com o shimmer em Ré.
2. **Só na formação do logo**, discreta, para não cansar a 6×/dia.

Proposta para a fase 3: 3 versões curtas para você ouvir e escolher.

## 16. Depois da sua aprovação — ordem e o teste pedido

1. `TRILHAS/` + catálogo das 5 (status REFERÊNCIA) + masters no privado.
2. `adaptar_trilha.py` + testes.
3. **Teste de áudio com a T03** (a mais estruturada, com grade limpa e final natural): versões de **~30 s, ~50 s e ~75 s**, cada uma com:
   - o relatório de cortes;
   - um A/B contra o "corte simples" de hoje;
   - um gráfico de energia antes e depois.

   Só áudio, sem vídeo. A T02 (rubato) entra depois, como teste de estresse.
4. Mixagem v2 (ducking em 2 bandas, efeitos afinados, portão de inteligibilidade), ativada só por `music.trilha`.
5. Integração (Skill Mestre, grade, checagens, portão de publicação) + documentação.

**Decisões que preciso de você:**
- De onde vieram as faixas e se existe alguma licença. Se não existe, qual caminho: biblioteca licenciada paga (decisão de custo sua) ou trilhas originais (compostas por código ou encomendadas).
- Onde guardar os masters (recomendo um repositório privado).
- Se a regra "trilha discreta sem bateria" (11/11) muda.
- Se ouvir a T04 (há voz cantada?) e a T05 (o apito de 7,1 kHz incomoda?) confirma ou corrige minhas inferências.

### Fontes (direitos e plataformas)
- [Instagram Help — biblioteca de música e Sound Collection](https://help.instagram.com/ipad-app/402084904469945)
- [Soundstripe — música no Instagram para empresas](https://www.soundstripe.com/blogs/royalty-free-music-for-instagram-ads) (fornecedor; viés comercial)
- [Epidemic Sound — conteúdo comercial no TikTok](https://help.epidemicsound.com/hc/en-us/articles/26251264491794-How-to-Post-Commercial-Content-on-TikTok)
- [TikTok — Commercial Music Library](https://ads.tiktok.com/business/ko/blog/audio-library-royalty-free-music)
- [YouTube — gerenciar Shorts como detentor de direitos (bloqueio > 1 min com reivindicação)](https://support.google.com/youtube/answer/13053317)
- [YouTube — reivindicações do Content ID](https://support.google.com/youtube/answer/6013276?hl=en)
