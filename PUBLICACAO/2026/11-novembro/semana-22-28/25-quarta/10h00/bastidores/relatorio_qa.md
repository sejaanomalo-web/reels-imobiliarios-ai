# QA — ATIVO_NOV26_08 · "O comprador acha caro: e agora?" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_08.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. **Primeiro episódio com a regra de pausas naturais** (cliente, 19/11/2026 à tarde) e SFX mais dinâmicos.

## Apuração (19/11/2026)
- Raio-X FipeZAP 3º tri 2026: **73% dos respondentes** classificaram imóveis residenciais como caros ou muito caros (67% um ano antes); 758 respondentes, usuários de portais, coleta 5/10–3/11/2026 ([InfoMoney — fonte do roteiro](https://www.infomoney.com.br/minhas-financas/imoveis-intencao-de-compra-cai-a-35-e-descontos-atingem-67-diz-fipezap/), [Portas](https://portas.com.br/noticias/intencao-de-compra-cai-enquanto-descontos-na-compra-de-imoveis-crescem-aponta-fipezap/), [Paraíba Business](https://paraibabusiness.com.br/descontos-na-compra-de-imoveis-avancam-enquanto-intencao-de-compra-recua-no-brasil/)). Relatório original não aberto.
- Na tela: PERCEPÇÃO DOS ENTREVISTADOS · RAIO-X FIPEZAP 3º TRI 2026 (nota do roteiro: não é índice de sobrepreço). Comparador ILUSTRATIVO · SEM VALORES DE MERCADO (só MAIOR/MENOR); CONVERSA ILUSTRATIVA.

## CTA
- No roteiro: "Mande para um corretor que está ouvindo “está caro” todos os dias."
- Virou a transição **"Ouviu “está caro”? Pergunte antes de contra-argumentar."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz — pausas naturais (regra do cliente 19/11, tarde)
- `voice.shapePauses {keepUnder 0.22, ratio 0.6, max 0.6}`: pausas até 0,22 s intactas; maiores encurtadas proporcionalmente, teto 0,6 s. Mesma voz, 1,0×, sem time-stretch.
- Resultado: tomada 56,1 s → 55,3 s (só 0,8 s de silêncio cortado), **27 pausas internas (~6 s), maior 0,42 s, 160 palavras/min**. Com a regra anterior (0,09 s) seria 51,3 s e 173 palavras/min, sem respiração.
- Gerações: conta 2 → A ("exige reforma", "Tá caro"), conta 1 → B ("A área" com artigo a mais). **Usada B com a frase "Área, localização… mesmo preço." trocada pela da A** (mesma frase com F0 133,0 × 133,3 Hz = 0,04 semitom; ganho −0,6 dB; emendas em pausas, fade de 12 ms).
- **Pontos para ouvir:** "exigir" (Parakeet ouve "exigir", Whisper "exige" — r final fraco); "Comenta SISTEMA" (forma habitual da voz).
- Tomada gerada ainda com a direção anterior; a direção nova (respira e faz suspense) vale a partir do NOV26_09.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 57,69 s · −14,88 LUFS · TP −1,48 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,57 · maior trecho parado 0,8 s.
- SFX: 33 eventos, stem −39,5 LUFS; transcrição da mixagem 0,949 × narração 0,939 (nenhum erro novo por efeito).
- 20 + 2 quadros revisados. Corrigidos: asterisco literal na legenda ("oportunidade*”"), título do Take 03 quebrando no hífen de CONTRA-ARGUMENTAR.
- Corrigido também em `tools/build_narration.py`: `--source` apontando para a própria `narration_source.wav` (comando "Regerar") falhava com SameFileError.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/25-quarta/10h00/ATIVO_NOV26_08_legenda.txt` — `legenda_check` ✓ (158 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/25-quarta/10h00/`.

## Cenas
1. **Gancho — O COMPRADOR ACHA CARO:** 73% ACHAM CARO desde o quadro 0; barra 73% caros ou muito caros; fonte; "Mas é uma oportunidade!" → carimbo NÃO BASTA.
2. **Take 01 — PARE DE REPETIR “OPORTUNIDADE”:** CARO ocupa a tela; adjetivos (oportunidade, imperdível, único, excelente) somem; COMPARADO COM O QUÊ?; área, localização, conservação, custos recorrentes; "Mesmo preço, outra leitura".
3. **Take 02 — COMPARE O QUE IMPORTA:** comparador APTO 1 × APTO 2 (preço maior/menor, mobilidade, metragem, reforma); O CORRETOR AJUDA A COMPARAR · INCLUSIVE QUANDO NÃO COMPENSA.
4. **Take 03 — PERGUNTE ANTES DE CONTRA-ARGUMENTAR:** chat "Achei caro." → "Com qual outra opção você está comparando?" → "Com um apê no bairro vizinho."; FATOS VERIFICADOS; ✕ vencer a discussão / ✓ escolha clara; "Pergunte antes de rebater".
5. **CTA SISTEMA** (Comparações de cada cliente) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-08 --source episodes/ATIVO-NOV26-08/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-08 && bash tools/render_episode.sh ATIVO-NOV26-08
```
