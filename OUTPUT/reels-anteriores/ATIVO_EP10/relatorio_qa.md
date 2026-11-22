# QA — ATIVO Episódio 10 · "O conteúdo que um comprador precisa antes de visitar o imóvel" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP10.md` (ATIVO_Roteiro_10.docx), narrado palavra por palavra. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Salve este Reel e envie para um corretor que atende quem está comprando o primeiro imóvel." (SALVE E COMPARTILHE).
- Substituída pela transição **"Para acompanhar cada comprador nessa jornada, vale ter as informações organizadas."** + CTA base SISTEMA → Direct.
- **A frase de transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO10/episode.json` → `diagnostico`
- C3. Público: corretor de primeira compra e financiamento habitacional.
- Crença questionada: fachada bonita e entretenimento bastam.
- Promessa: pauta de três vídeos a partir das dúvidas antes da visita.
- **Nenhuma taxa, entrada, renda, limite ou regra de programa.** A parcela aparece mascarada (`R$ ••••/mês`, ≠ SUA SITUAÇÃO).
- "Minha Casa, Minha Vida" só na fala, como manda o roteiro. Na tela: PROGRAMAS HABITACIONAIS e uma FONTE OFICIAL genérica (ILUSTRATIVO), sem marca do programa nem imitação de site do governo.
- Carimbo VERIFICAR REGRAS ATUAIS; alerta SEM PROMESSAS DE APROVAÇÃO.
- Dúvidas, pauta e feed com os rótulos DÚVIDAS ILUSTRATIVAS, PAUTA ILUSTRATIVA e FEED ILUSTRATIVO. Sem tela de banco.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, conta 2. **2 gerações** (A 79,6 s · B 81,6 s).
- **Tomada B, sem edição:** 164 palavras/min, 222/223 palavras alinhadas. Diz "Comente SISTEMA".
- Tomada A descartada: "com **o** empreendimento", "como Minha Casa" (sem o "o").
- **Ponto para ouvir: 0:59, "Conteúdo do imóvel apresenta uma opção"** (o roteiro diz "**de** imóvel"). Os dois reconhecedores ouvem "do". O sentido não muda.
  - Tentei emendar a frase da tomada A, que diz "de". Descartei: o tom dela está ~2 semitons acima (mediana de 132 Hz × 118 Hz), e o salto seria audível.
  - Se incomodar, regravo só a frase amanhã e confiro o tom antes de emendar.
- Divergência só do Whisper (o Parakeet ouve certo): 0:38 "um empreendimento **para** ainda em construção". Vale ouvir.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 83,90 s · −14,96 LUFS · TP −1,71 dBTP.
- `editorial_check` 0 erros / 0 avisos. Pegou e corrigi um verde no vaso da ilustração da sala.
- Mixagem × roteiro: 0,973. Diferenças:
  - "do imóvel" (está na voz);
  - "lides" (é "leads");
  - "te envio" na borda da janela, que sai correto com a janela deslocada.
- Movimento **2,34** · maior trecho parado 0,6 s.
- 45 quadros revistos (37 stills + 8 do MP4). Corrigidos:
  - legenda sobre o feed sem fundo;
  - tag da parcela espremida;
  - texto vazando dos cartões do calendário;
  - restos da cena anterior atrás de "SEU PAPEL NO CONTEÚDO";
  - metade direita do insight vazia por ~2 s.

## Cenas
1. **Gancho:** feed em 3 colunas (salas e fachadas) rolando desde o quadro 0; A SALA MAIS BONITA → o feed congela → EU CONSIGO COMPRAR? + PRIMEIRO IMÓVEL → SÓ FACHADAS → SEM RESPOSTA → a pergunta acende (importa).
2. **Dúvidas:** a pergunta vira cabeçalho; 4 cartões (crédito, entrada, custos, parcela anunciada ≠ sua situação) abrem na fala.
3. **Pauta:** calendário de conteúdo com VÍDEO 1 DOCUMENTOS, 2 CUSTOS, 3 COMPARAÇÃO + PRONTO × EM CONSTRUÇÃO.
4. **Responsabilidade:** fonte oficial genérica + VERIFICAR REGRAS ATUAIS + conferir data; RENDA / ENQUADRAMENTO / CONDIÇÕES / DISPONIBILIDADE ↻ PODEM VARIAR; ESCLARECER O CAMINHO ✓ × PROMETER APROVAÇÃO ✕.
5. **Insight:** MOSTRAR O IMÓVEL ≠ EXPLICAR A DECISÃO → convergem em ATENDIMENTO MAIS CLARO; jornada DÚVIDAS / VISITA / DECISÃO marcada (transição).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:59 ("do imóvel") e 0:38.
- **Duração 83,9 s** (223 palavras), bem acima do ideal de 40–65 s. Sem aceleração.
  - Corte sugerido: tirar s14 ("Os dois têm espaço…", −3 s) e encurtar a cena 4. A cena 4 é a de responsabilidade e eu não cortaria.
  - O ganho maior está no texto da cena 2 (frase única de 12 s).

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO10 --source episodes/EP-ATIVO10/narration_source.wav && python3 tools/build_audio.py EP-ATIVO10 && bash tools/render_episode.sh EP-ATIVO10
```
