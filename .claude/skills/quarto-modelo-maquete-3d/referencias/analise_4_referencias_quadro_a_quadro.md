# Análise das 4 referências do Quarto modelo (23/11/2026)

Material enviado pelo cliente: 4 MP4 de um mesmo perfil de terceiros (explicadores de notícia em maquete 3D). **Nenhum quadro, nome, cor-assinatura, frase ou tema desses vídeos entra no repositório nem na produção da ATIVO**: aqui fica só a gramática, descrita em palavras. Os temas das referências são políticos e com pessoas reais. A ATIVO **não** faz isso: o assunto é sempre o mercado imobiliário e a rotina do corretor.

## Medições (ffprobe / ffmpeg)

| Ref. | Duração | Formato | Cortes (cena > 0,3) | Áudio |
|---|---|---|---|---|
| R1 | 81,3 s | 720×1280, 30 fps, AAC 44,1 kHz | 0 | −14,1 LUFS, pico −2,1 dB, LRA 2,7 |
| R2 | 111,7 s | idem | 0 | −14,1 LUFS, pico −2,0 dB, LRA 2,5 |
| R3 | 103,5 s | idem | 5 (19,0 · 26,6 · 41,8 · 80,4 · 93,6 s) | −14,1 LUFS, pico −0,9 dB, LRA 2,2 |
| R4 | 88,5 s | idem | 4 (12,6 · 55,6 · 57,9 · 67,4 s) | −14,1 LUFS, pico −1,1 dB, LRA 3,0 |

- Áudio: voz única e trilha contínua por baixo (quase nenhum trecho abaixo de −50 dB: 1 a 27 janelas de 0,1 s por vídeo). A voz é densa, com poucas pausas longas.
- Montagem: plano-sequência. A câmera anda por uma única maquete e quase nunca corta (R1 e R2: zero cortes).

## Gramática verificada em 2 ou mais referências (adotável)

1. **Maquete 3D de miniaturas.** Primitivas de argila fosca (caixas, cilindros, prismas): casas, móveis, prédios, gaveteiros, documentos e bonecos-manequim sem rosto. Sombra de contato suave, desfoque de profundidade leve, chão escuro infinito. Nada de textura fotográfica (R1–R4).
2. **Clima por capítulo.** A cor da névoa e do chão muda a cada capítulo (azul-petróleo, verde, roxo, vinho, ocre, marinho) e marca a mudança de assunto sem corte (R1, R2, R3).
3. **Cabeçalho editorial fixo, alinhado à esquerda, no topo:**
   - marca e tema em micro-rótulo mono;
   - chip do capítulo (pílula com ponto);
   - linha "FONTES: …" em micro-rótulo;
   - título-manchete em sans 800 de 1 ou 2 linhas, **ou** um NÚMERO GRANDE com rótulo mono embaixo.

   O título troca a cada capítulo (R1–R4; a linha de fontes aparece em R3 e R4).
4. **Placas em hastes.** Rótulos curtos em maiúsculas sobre placas fincadas na maquete. Placa escura = neutra; placa no acento = destaque; vermelha = negação ou perda (R1–R4).
5. **Arcos de pontos.** Fluxos de dinheiro, rotas ou trajetos desenhados como trilhas de bolinhas que crescem de um objeto a outro (R2, R4).
6. **Holofote.** Cone de luz visível sobre o personagem em foco; o resto fica na penumbra (R2, R4).
7. **Revelação no tempo da fala.** Cada objeto "brota" do chão (escala a partir da base) quando é dito; números sobem (R1–R4).
8. **Legenda em caixa escura arredondada** abaixo da maquete, palavra a palavra: dita em branco, por vir em cinza, palavra-chave no acento (R1–R4).
9. **Partículas flutuando** (bokeh fino) em todo o vídeo (R1–R4).
10. **Estrutura narrativa:** manchete-gancho → capítulos/passos ("Passo 1…4") → número-chave → pergunta que fica → CTA de comentário (R1–R4).

## Identidade alheia (proibido copiar)

- O nome do perfil e a assinatura no topo; o amarelo-limão como cor de destaque; a CTA de comentário com a palavra deles e a frase "Quer criar vídeos como esse?".
- Temas, pessoas reais, bandeiras, prédios públicos e qualquer personagem desses vídeos.
- A duração (80–110 s): a ATIVO fica em 40–65 s (CLAUDE.md).

## Tradução para a ATIVO (Nível 2 do Quarto modelo)

| Gramática | Versão ATIVO |
|---|---|
| Destaque amarelo-limão | **verde ATIVO `#02FB3F`**, só no que "acende" (solução, você, o ponto) |
| Clima por capítulo | as **atmosferas do Nível 1** (explicação, dados, tensão, solução…) na névoa e no chão |
| Cabeçalho com marca do perfil | "ATIVO · <TEMA>", chip do capítulo com ponto verde, **"FONTES: …"** (assinatura 7) |
| Placas em hastes | `Placa`: neutra (grafite), `acento` (verde), `alerta` (vermelho) |
| Personagens | manequim de argila; **o corretor tem gravata verde** e recebe o holofote (assinatura 4) |
| Legenda em caixa | `LegendaCaixa`: Manrope 800, 56 px, caixa de frase, fora da coluna de botões |
| CTA de comentário deles | ritual **SISTEMA** da ATIVO (`CtaMaquete`) |
| Trilha −14 LUFS | padrão ATIVO: −15 LUFS, voz na frente |
