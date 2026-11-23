---
name: quarto-modelo-maquete-3d
description: QUARTO MODELO de vídeo da ATIVO — "Quarto modelo — Maquete 3D": Reel/TikTok vertical 1080×1920 em que a notícia ou o processo vira uma MAQUETE 3D de miniaturas de argila fosca (casas, prédios, banco, reservatório, bonecos-manequim) num chão escuro infinito, filmada em plano-sequência (a câmera anda pelo mesmo mundo, sem corte), com o clima mudando por capítulo (atmosferas do Nível 1), objetos que brotam do chão na palavra, placas em hastes, arcos de pontos para fluxos, holofote no corretor de gravata verde, cabeçalho editorial com capítulo e FONTES, legenda em caixa e fecho com módulos que acendem + campo SISTEMA + logo. Use sempre que o pedido for produzir, adaptar, decupar, revisar ou renderizar um vídeo "no quarto modelo / maquete / 3D / miniaturas / diorama / estilo explicador de notícia", ou um roteiro de notícia, dado ou processo com várias partes que se relacionam. Herda o Sistema Visual ATIVO (MARCA/sistema-visual).
---

# Quarto modelo — Maquete 3D

*ATIVO · modelo de vídeo nº 4. Registro: `MODELOS_DE_VIDEO.md` e `MARCA/sistema-visual/modelos.json` (id `maquete-3d`).*

## Herança do Sistema Visual ATIVO

**Antes de produzir, leia `MARCA/sistema-visual/README.md` (Nível 1).** Ele vale acima desta skill: em conflito, o Nível 1 vence.

- **Herdado (Nível 1, sem redefinir aqui):**
  - acento único `ACENTO` (no kit: `A`/`aa`) e as atmosferas `ATMOSFERA`, aplicadas na névoa, no chão e no fundo da maquete;
  - texto, contorno e alerta de `DS`; Manrope e JetBrains Mono, escala e mínimos;
  - área segura e coluna de botões do Reels; grão e vinheta; poeira sutil;
  - easing e ancoragem na palavra; as 7 assinaturas; qualidade e governança.

  Valores só em `MARCA/sistema-visual/tokens.json`, lidos por `PRODUCAO/src/theme.ts`.
- **Particular deste modelo (Nível 2, preservar):**
  - família de ilustração `maquete`: 3D leve de primitivas (caixa, cilindro, cápsula, prisma) em argila fosca, sombra de contato suave, sem textura nem realismo. **Proposta à governança do Nível 1 (aguardando a aprovação do cliente para entrar em `tokens.json` v1.1.0).**
  - plano-sequência: um único mundo por vídeo; a câmera viaja entre estações, sem corte;
  - clima por capítulo (atmosfera do Nível 1 na névoa e no chão, troca em 0,6 s);
  - cabeçalho editorial à esquerda: "ATIVO · TEMA", chip do capítulo com ponto verde, "FONTES: …", título (72 px) ou número (124 px);
  - placas em hastes (neutra · acento · alerta); arcos de pontos para fluxos; holofote no protagonista;
  - legenda `LegendaCaixa` (topo em y 1440, 56 px, caixa de frase, palavra dita branca, por vir cinza, chave verde);
  - fecho `ModulosSistema` (3D) + `CtaMaquete` (campo que digita SISTEMA + logo oficial).
- **Direção de cada vídeo (Nível 3):** quais objetos, a planta da maquete (estações), o que acende, o roteiro da câmera.
- **Validação:** `python3 PRODUCAO/tools/sistema_visual_check.py --modelo maquete-3d` (o `editorial_check` já roda a parte do episódio e bloqueia o render) + revisão visual da folha de quadros (README §8).

**Fontes da verdade:**
- **Piloto:** `ATIVO-MAQUETE-01` (`OUTPUT/pilotos/ATIVO_MAQUETE_01/`): o roteiro e a voz congelada do NOV26_03 ("O dinheiro que financia os imóveis") refeitos na maquete.
- **Kit:** `PRODUCAO/src/estilos/maquete.tsx` (usa `@remotion/three` + `three` + `@react-three/fiber`).
- **Referências:** `referencias/analise_4_referencias_quadro_a_quadro.md` (gramática extraída de 4 MP4 de terceiros; nenhum quadro deles fica no repositório) e `referencias/piloto_24_quadros.jpg`.

## 0. Quando usar / o que entrega

**Use quando** o roteiro tem **partes que se relacionam no espaço**: dinheiro que sai de um lugar e vai para outro, etapas de um processo (Passo 1, 2, 3), "quem decide o quê", antes × depois de uma regra, um número que muda a vida do cliente. Pergunta-teste: *dá para montar isso numa mesa com miniaturas?*

**Não use** para reflexão íntima (Pictograma), piada/dilema com personagem (Cartoon) ou estrutura de projeto (Planta técnica).

**Entrega:** MP4 1080×1920 30 fps H.264 + AAC (40–65 s), capa PNG no estilo, SRT, `legenda_instagram.txt` (CLAUDE.md), relatório de QA.

## 1. Regras inegociáveis

1. **Só temas da ATIVO.** Mercado imobiliário, crédito e rotina do corretor. Nunca política, pessoas reais, bandeiras, prédios públicos reconhecíveis nem marcas de terceiros (as referências eram assim; nós não).
2. **Argila é neutra; o verde é evento.** Objetos nascem argila ou grafite. Só fica verde o que **acende** (`acende`, na palavra que justifica): solução, você, o corretor. Vermelho (`alerta`) só para perda ou pressão.
3. **Brota na palavra.** Todo objeto entra crescendo do chão 0,3–0,4 s antes da palavra (mola). Nada aparece pronto antes de ser dito, exceto o primeiro objeto do gancho, que já está no quadro 0.
4. **Plano-sequência.** Sem corte. A troca de assunto é feita pela câmera (viagem entre estações) e pelo clima (atmosfera). Corte seco só se o roteiro exigir mudança total de lugar, e no máximo 1 por vídeo.
5. **Integridade visível:** a linha "FONTES: …" fica no cabeçalho o vídeo inteiro; metáfora ganha selo ("METÁFORA ILUSTRATIVA"); valor não apurado não aparece; número citado vem da apuração do episódio.
6. **Texto é HTML, nunca dentro do 3D:** cabeçalho, placas e legenda usam Manrope/JetBrains Mono do sistema, com sombra de leitura.
7. **Zonas:** cabeçalho y 262–600 (x ≥ 100); palco 600–1420; legenda 1440–1540 (exclusiva); nada de texto acima de y 250, abaixo de 1570 nem em x ≥ 950 entre y 1150 e 1760 (as placas se reposicionam sozinhas).
8. **Algo muda a cada ≤ 1,5 s:** um objeto brota, um fluxo anda, uma placa entra, a câmera chega a uma estação. Pedestal ou chão vazio por mais de 1 s reprova.

## 2. Pipeline

> **Plano visível (regra do cliente, 23/11/2026):** antes de começar, crie no painel "Plano" as 12 etapas do modelo A de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, com o ID do episódio no título (`[<EP>] n/12 · Etapa — resultado`). Uma etapa `in_progress` por vez; `completed` ao terminar; erro vira `BLOQUEIO`.

1. Roteiro aprovado (Skill Mestre) → `novo_episodio.build(..., formato="maquete-3d")` (prefixo `ATIVO-MAQUETE-NN`; cria `cta_leads`/`cta_atend` e os SFX do fecho).
2. Voz Puck 1,0× (`build_narration.py`), `shapePauses`.
3. **Planta da maquete no papel:** estações (coordenadas em metros, +z = perto da câmera = parte de baixo da tela), objetos de cada estação, o que acende, os fluxos, as placas e o roteiro da câmera ancorado nos cues.
4. `src/episodes/<EP>/scenes/Scenes.tsx` com o kit (copie a estrutura de `src/episodes/ATIVO-MAQUETE-01/`): `capitulos`, `camera`, `clima`, `Maquete3D`, `holofote`, `placas`.
5. Quadros de conferência (`npx remotion still … --frame=N`) em 8–10 momentos; ajuste a câmera até o palco ficar entre y 600 e 1420.
6. `editorial_check` → prévia `--scale=0.5` (≈ 7 min para 50 s) → folha 1 quadro/s → correções.
7. `build_audio` → render final (≈ 20–30 min para 50 s em 4 núcleos) → `sistema_visual_check --quadros`.
8. Legenda do Instagram, QA, `publicar.py`.

## 3. Grade da tela (1080 × 1920)

| Zona | y | Conteúdo |
|---|---|---|
| Cabeçalho | 262–600 | `Cabecalho`: "ATIVO · TEMA" (mono 24), chip do capítulo (mono 24, ponto verde), "FONTES: …" (mono 24), selo opcional, título Manrope 800 72 px (até 2 linhas, 1 palavra-chave verde ou vermelha) **ou** número 124 px verde + rótulo mono 26 |
| Palco | 600–1420 | a maquete (enquadre os objetos principais aqui) |
| Legenda | 1440–1540 | `LegendaCaixa` (exclusiva) |
| Respiro | 1540–1920 | chão escuro (área da interface do Reels) |

## 4. Roteiro para este formato

- 4–7 capítulos, cada um com chip curto ("A PERGUNTA", "PASSO 1", "A PRESSÃO", "PARA O CORRETOR").
- Gancho = pergunta-manchete + o primeiro objeto já na mesa.
- Use números só quando apurados (o cabeçalho vira número grande nesse capítulo).
- O penúltimo capítulo leva ao **corretor**: o que ele faz com a informação (holofote, gravata verde, acende na virada).

## 5. Decupagem — câmera e estações

- `camAt(t, keys)` interpola posição, alvo e fov entre chaves (ease.inOut) e soma um respiro leve, o que dispensa movimento parado.
- **Estações:** cada capítulo tem uma "parada" de câmera; a viagem até a próxima dura 0,8–1,2 s e termina na palavra do novo capítulo.
- **Enquadramento:** retrato estreito, então espalhe a maquete em **profundidade (z)**, não na largura. Câmera alta (y 8–13), olhando para baixo, fov 38–40, a 12–16 m do centro da estação.
- **Escala:** os objetos principais ocupam 25–45 % da largura. Perto demais corta e encosta no cabeçalho; longe demais vira miniatura ilegível.
- No fecho, a câmera sobe (alvo mais alto) para o pedestal ir para baixo do campo SISTEMA.

## 6. Bíblia visual

- **Mundo (`Mundo`):** fundo HTML em gradiente radial da atmosfera (centro → borda), névoa na cor intermediária (14–46 m), chão infinito da atmosfera escurecida, luz hemisférica baixa, luz-chave suave com sombra macia, holofote (spot) só no protagonista.
- **Clima por capítulo:** `explicacao` (pergunta, contexto), `dados` (mecanismo, metáfora), `tensao` (pressão, perda), `neutra` (o corretor sob o holofote), `solucao` (a partir de "Comente").
- **Materiais:** argila clara (`ARGILA`, papel do Nível 1) para o que importa; grafite (`GRAFITE`) para o secundário e os coadjuvantes; verde só por `acende`; vermelho só `alerta`.
- **Poeira:** `Poeira` (36–40 pontos, opacidade 0,28).

## 7. Personagens

`Boneco`: manequim de argila sem rosto (cápsulas + esfera). **O corretor** = `gravata` (verde, com brilho) + holofote (`ConeLuz` + spot); na virada, `acende` e o cone fica verde. Clientes e coadjuvantes em `mat="grafite"`. Poses: `pe`, `aponta` (explicando), `bracos` (vitória). Nunca caricatura de pessoa real.

## 8. Objetos (kit)

| Componente | Uso |
|---|---|
| `Casa` | imóvel, carteira; `acende` = o imóvel do cliente/resultado |
| `Predio` | empreendimento; andares brotam um a um |
| `Instituicao` | banco, cartório, órgão (sem nome nem marca; o nome vai numa placa) |
| `Tanque` | reservatório, saldo, fundo; `nivel` (0..1), `alerta` (pressão), `acende` |
| `Bloco` | documento, móvel, pilha (tamanhos diferentes = "não é igual para todos") |
| `Boneco` | corretor (`gravata`), cliente, equipe |
| `Haste` + `Placas` | nomes curtos (até ~3 palavras, maiúsculas); `tom` neutra/acento/alerta |
| `Fluxo` | dinheiro, leads, documentos indo de A para B; `anda` faz os pontos correrem; `mat="alerta"` = saída/perda |
| `ConeLuz` | cone visível do holofote; `verde` na virada |
| `Poeira` | textura (assinatura 5) |

## 9. Animações

- Brotar: `sp(t, cue - 0.35, { damping: 12, stiffness: 170 })` em `surge` (escala vertical a partir da base).
- Acender: `prog(t, cue - 0.05, 0.35–0.4)` em `acende`.
- Fluxo: `p = prog(t, cue - 0.1, 0.8–1.0)`; `anda = t * 0.25–0.6` (mais rápido = mais urgência).
- Nível: `prog` com `ease.inOut` em 2–3,5 s (queda ou enchimento acompanham a frase).
- Placas: entram na palavra e saem quando o capítulo muda (`ate(de, fim)`). No máximo 2 placas ao mesmo tempo.
- Proibido: rotação de câmera em volta do objeto sem motivo, zoom brusco, glitch, objeto quicando.

## 10. Câmera e transições

- Uma única câmera contínua. Viagem entre estações = transição.
- Troca de clima em 0,6 s (`clima`), sempre ancorada na primeira palavra do capítulo.
- Título do cabeçalho: sai em 0,22 s e o novo sobe do desfoque em 0,35 s.

## 11. Legenda e fecho

- **Legenda:** `<LegendaCaixa t chunks />` (padrão: topo y 1440, 56 px). Não mude a posição: o palco foi desenhado para terminar em 1420.
- **Fecho:** `ModulosSistema` (dentro do `Mundo`, num pedestal na última estação) + `<CtaMaquete t tl segPergunta segComente />`.
  - Na pergunta, os 3 módulos (casa, boneco e balão) brotam esboçados em argila; cada um ACENDE em verde na sua palavra (imóveis, leads, atendimentos).
  - Em "Comente", o clima vira `solucao`, a câmera sobe e surge o campo que digita S-I-S-T-E-M-A; o botão de envio acende.
  - Em "Direct", aparece "detalhes pelo Direct" e, em seguida, o logo oficial.
  - O cabeçalho sai em "Comente" (`ate={c.cta_comment - 0.25}`).

## 12. Som

Trilha contínua por baixo da voz (as referências não têm silêncio); padrão ATIVO de `build_audio.py`: −15 LUFS, pico ≤ −1 dBTP, voz na frente. Eventos sugeridos: brotar = `pop` grave baixo; fluxo = `swish` curto; acender = `pin`; troca de clima = `whoosh_fold` baixo; fecho = os eventos que `novo_episodio` cria para `formato="maquete-3d"`.

## 13. Metas de QA

- [ ] `editorial_check` sem erros; TypeScript sem erros.
- [ ] Folha 1 quadro/s da prévia: nenhum trecho > 1 s sem mudança; palco entre y 600 e 1420; nada encostando no cabeçalho nem na legenda.
- [ ] Verde só no que acende (≤ 2 objetos fora do fecho); vermelho só em perda/pressão.
- [ ] "FONTES" correta (da apuração); selo de metáfora quando houver.
- [ ] Render 1080×1920 H.264 yuv420p 30 fps + AAC; `sistema_visual_check --quadros` sem erro.
- [ ] As 7 assinaturas e o teste "parece ATIVO com o logo coberto".

## 14. Esqueleto de código (copie de `src/episodes/ATIVO-MAQUETE-01/`)

```tsx
// Episode.tsx
const cam = camera(t, c); const k = clima(t, c);
<AbsoluteFill style={{ backgroundColor: C.bg0 }}>
  <Mundo cam={cam} atm={k.atm} atmPara={k.atmPara} atmK={k.atmK} holofote={holofote(t, c)}>
    <Maquete3D t={t} tl={tl} />          {/* objetos, fluxos, ConeLuz, ModulosSistema */}
  </Mundo>
  <Placas cam={cam} placas={placas(t, c)} />
  <Cabecalho t={t} tema="…" fontes="…" capitulos={capitulos(c)} ate={c.cta_comment - 0.25} />
  <CtaMaquete t={t} tl={tl} segPergunta="s10" segComente="s11" />
  <LegendaCaixa t={t} chunks={tl.captions} />
  <Grain frame={frame} />
</AbsoluteFill>
```

Render: as chamadas padrão funcionam (o 3D usa WebGL do navegador headless). Se aparecer erro de WebGL, acrescente `--gl=angle` (ou `--gl=swangle`).

## 15. Anti-padrões (reprovam o vídeo)

- Copiar o perfil das referências: cor amarelo-limão, nome no topo, CTA deles, temas políticos, pessoas reais.
- Tudo verde ou tudo vermelho; verde como "cor do estilo".
- Texto dentro do 3D; placa com frase longa; mais de 2 placas ao mesmo tempo.
- Maquete espalhada na largura (fica minúscula no vertical); objeto cortado no meio sem motivo.
- Pedestal ou chão vazio esperando a fala; câmera parada.
- Realismo: textura, reflexo metálico, material brilhante, render "de arquitetura".

## 16. Kit — referência rápida (`PRODUCAO/src/estilos/maquete.tsx`)

`Mundo({cam, atm, atmPara, atmK, holofote})` · `camAt(t, keys) → Cam` · `projetar(cam, ponto)` · `Bloco` · `Casa` · `Predio` · `Instituicao` · `Tanque({nivel, alerta, acende})` · `Boneco({gravata, acende, pose, mat})` · `Haste` · `Fluxo({de, para, altura, p, n, mat, anda})` · `ConeLuz({verde})` · `Poeira` · `Placas({cam, placas})` · `Cabecalho({t, tema, fontes, capitulos, ate})` · `LegendaCaixa({t, chunks, y, size})` · `ModulosSistema({t, tl, segPergunta, segComente, base})` · `CtaMaquete({t, tl, segPergunta, segComente, logo})` · `temposCta` · constantes `ARGILA`, `GRAFITE`.
