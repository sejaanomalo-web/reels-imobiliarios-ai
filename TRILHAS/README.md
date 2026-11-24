# TRILHAS/ — Sistema Musical ATIVO (23/11/2026)

> **Princípio:** a trilha não deve simplesmente caber no vídeo. Ela deve parecer ter sido montada para aquela história.

A música participa da narrativa (curiosidade → tensão → desenvolvimento → virada → descoberta → recompensa → CTA). Cada faixa tem um **perfil persistente** (`trilhas.json`): não se reanalisa a faixa a cada Reel. A duração da história vem primeiro; a faixa é **reorganizada pela própria estrutura** (frases e compassos inteiros), sem acelerar, desacelerar, mudar tom ou fazer loop arbitrário.

## O que fica aqui (e o que nunca fica)

| Caminho | Versionado? | Conteúdo |
|---|---|---|
| `trilhas.json` | sim | catálogo: técnico (BPM, grade, tom), seções, eventos, cortes proibidos, loops seguros, final, voz/mix, afinidades, **licença** |
| `papeis.json` | sim | os papéis musicais (arquétipos) e as lacunas da biblioteca |
| `analises/` | sim | relatório da calibração de 23/11/2026 e mapa anotado das 5 faixas |
| `licencas/` | sim | o que comprova cada licença (sem dados sensíveis) |
| `masters/` | **NÃO** (`.gitignore`) | áudio original, nunca alterado (sha256 no catálogo) |

**O repositório é público.** Música de terceiros ou licenciada **nunca** entra no Git: nem master, nem prévia, nem a trilha adaptada (`PRODUCAO/public/<EP>/trilha.wav` e `OUTPUT/testes-de-trilha/` estão no `.gitignore`).

**Masters numa sessão nova:** o container é apagado ao fim da sessão. Enquanto não houver um armazenamento privado definido pelo cliente (recomendação: repositório privado no GitHub), os masters precisam ser reenviados e copiados para `TRILHAS/masters/<ID>.<ext>`. O `trilhas.py validar` confere o sha256.

## Licença: a trava

`licenca.status`:
- `referencia`: **sem licença comprovada**. Foi o status das 5 faixas em 23/11/2026; em 24/11/2026 passaram a `autorizada`. Só teste interno.
- `licenciada`: licença comercial comprovada para **Instagram, TikTok e YouTube**, incluindo publicação por API com o áudio embutido. Comprovante em `licencas/`.
- `original`: composta para a ATIVO (por código ou encomenda).
- `autorizada`: autorização **direta do autor** para uso nas 3 redes, informada pelo cliente, registrada em `licencas/` (24/11/2026: T01–T05). Publicável; o risco residual é o reconhecimento automático de áudio das plataformas, acompanhado depois de cada publicação.
- `bloqueada`: não usar.

`publicar.py` **recusa** episódio cuja trilha não seja `licenciada`, `autorizada` ou `original`. `editorial_check.py` avisa desde a criação. Motivo: publicamos por API com o áudio dentro do MP4. A biblioteca licenciada dos apps não cobre esse caso, contas comerciais ficam restritas às bibliotecas comerciais, e o YouTube Content ID pode reivindicar ou bloquear o vídeo.

Faixa de referência sem licença tem três saídas:
1. comprar ou licenciar a mesma faixa;
2. trocar por uma faixa licenciada **do mesmo papel** (`papeis.json`);
3. compor uma trilha original com as **características gerais** (andamento, energia, curva, instrumentação genérica), **sem copiar melodia, gancho, progressão ou arranjo**.

## Fluxo de um Reel

```
roteiro aprovado (Skill Mestre) → FICHA MUSICAL: curva emocional + âncoras (frases)
   → grade do dia: território, modelo e TRILHA por adequação (trilhas.py sugerir; guardrails no grade.py)
   → novo_episodio.build(..., trilha="T03", ancoras={"virada": "cue:…", "insight": "cue:…"})
   → voz congelada → timeline.json (segundos reais)
   → adaptar_trilha.py <EP>   (plano por estrutura → public/<EP>/trilha.wav + OUTPUT/…/audio/trilha_plano.json)
   → build_audio.py <EP>      (mix v2: loudness, ducking em 2 bandas guiado pelo timeline, SFX afinados, Whisper)
   → render → QA → publicar.py (trava de licença)
```

## Ferramentas

```bash
cd PRODUCAO
python3 tools/trilhas.py validar                       # catálogo coerente + masters presentes (sha256)
python3 tools/trilhas.py listar                        # faixas, papel, status de licença
python3 tools/trilhas.py ficha T03                     # perfil legível de uma faixa
python3 tools/trilhas.py sugerir --territorio e-se --modelo maquete-3d [--data AAAA-MM-DD]
python3 tools/trilhas.py uso [--dias 7]                # uso recente (episódios + grade)
python3 tools/trilhas.py calibrar <arquivo> --id T06   # rascunho de perfil de faixa nova (requer librosa)
python3 tools/adaptar_trilha.py <EP>                   # adapta a trilha do episódio à timeline real
python3 tools/adaptar_trilha.py teste --trilha T03 --duracao 50 --ancoras virada=11.2,insight=43.1 --saida ../OUTPUT/testes-de-trilha/x
```

## Como o adaptador decide (resumo)
- **Seções** (intro, A, parada, B, subida, quebra, drop/clímax, final) têm valor musical, cortes permitidos, **cauda** (os últimos compassos que levam à próxima seção, preservados) e loops seguros medidos.
- **SHORTEN** remove compassos ou frases inteiras do miolo das seções (nunca a subida, o pré-drop nem o final).
- **EXTEND** repete só loops seguros, medidos com costura abaixo da variação natural entre compassos.
- **FIT** usa o grão fino que existe sem esticar nada: as paradas e respiros são elásticos por tempo, o começo da intro pode ser aparado, e o decaimento ou a cauda sintética fecham no último quadro.
- **Âncoras:** cada função narrativa (`virada`, `tensao`, `descoberta`, `insight`, `resolucao`) aponta para o início de uma seção. Uma programação dinâmica escolhe a combinação que põe esses eventos o mais perto possível das palavras, com o final natural da faixa caindo no fim do vídeo.
- **Velocidade e tom:** 0% de alteração. O relatório registra isso.
- **Crossfade** de igual potência **antes** do tempo forte, para preservar o ataque do compasso que entra. 40–60 ms nas faixas com grade; 0,5 s nos vales da T02.

## Variedade e aprendizado
Escolha por **adequação** (ficha musical + `afinidade` + papel). A frequência recente só desempata. Guardrails na grade:
- mesma faixa no máximo 1× por dia;
- nunca em horários seguidos;
- no máximo 25% em 7 dias.

Quebrar qualquer um exige `justificativas.trilhas`. Métricas por trilha × território × modelo × horário saem de `grade.py semana`. Só vira regra com padrão recorrente.

## Biblioteca atual
5 faixas de referência (T01–T05), 5 papéis. **Para 6 vídeos por dia, a biblioteca precisa de 15–20 faixas.** Lacunas abertas em `papeis.json`: leveza/humor (Cartoon) e otimista-reflexiva (IDEIA).
