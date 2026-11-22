# QA — ATIVO Reel 08 · "A comissão caiu: e a próxima carteira?" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL08.md` (ATIVO_Reel_08_COMISSAO_ESTRUTURA.md), narrado palavra por palavra. ID `EP-ATIVO-REEL08`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Qual processo você costuma revisar depois de fechar uma venda? Salva este vídeo e faz essa pergunta no próximo fechamento."
- A pergunta + "Salva…" viraram a transição **"No próximo fechamento, reserve um momento para revisar o que essa venda ensinou."** + CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.** Perdeu-se a pergunta de comentário do roteiro (ela competiria com o "Comente SISTEMA").

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO-REEL08/episode.json` → `diagnostico`
- C2 (contraste). Crença questionada: "o resultado da venda é só a comissão".
- **Cenário hipotético**, com EXEMPLO ILUSTRATIVO nos dois caminhos e ILUSTRATIVO · VALOR OCULTO na notificação.
- **Comissão sempre mascarada (R$ ••••).** Nenhum valor, eixo, gráfico de faturamento, carro ou projeção. "Não é uma máquina que vende sozinha" aparece explícito na tela.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1** (últimas 2 gerações do dia). Tomadas A 59,5 s · B 58,8 s.
- **Tomada B, sem edição:** 168 palavras/min.
- **Tomada A descartada:** "despertar **o** interesse" (Parakeet) e "com memória" em vez de "comemora" duas vezes (Whisper).
- **Formas da voz:** "para **a** prospecção" e "Comenta SISTEMA".
- **Ponto para ouvir:** 0:08 "um profissional **comemora a venda**". O Parakeet ouve certo; o Whisper ouve "com memória venda" nessa janela (na janela maior da tomada bruta ouviu "comemora").

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 61,14 s · −14,99 LUFS · TP −1,65 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,970. Diferenças: "comemora" (ver acima), "Comenta", "música" alucinada na cauda da trilha.
- Movimento **1,65** · maior trecho parado 0,7 s.
- 40 quadros revistos. Corrigidos:
  - notificação e foto se cruzando no gancho;
  - metade de baixo vazia por ~5 s no caminho A (entrou VENDA FECHADA + lacunas tracejadas);
  - fichas voando por cima da legenda;
  - registro do caminho B entrando ~1,5 s depois da fala.

## Cenas
1. **Gancho:** A COMISSÃO CAIU. / E A PRÓXIMA CARTEIRA? Notificação COMISSÃO RECEBIDA (R$ ••••) + confete; a estrada se divide (CAMINHO A / B); FOTO DE CONQUISTA com placa VENDIDO, a decisão fica fora da foto.
2. **Caminho A — COMEMORA E ESQUECE:** VENDA FECHADA; a linha da venda acende e apaga (DE VOLTA À ROTINA); três perguntas NÃO REGISTRADO; MÊS SEGUINTE · DO ZERO; UMA VENDA. NENHUM HISTÓRICO.
3. **Caminho B — COMEMORA E REGISTRA:** REGISTRO DA VENDA (ORIGEM, CONTATOS, IMÓVEIS, PRÓXIMO PASSO) marcado na fala; agenda com PROSPECÇÃO RESERVADA; "MÁQUINA QUE VENDE SOZINHA — isso não é"; HISTÓRICO DA VENDA; CADA ATENDIMENTO ENSINA.
4. **A ideia — NÃO É SÓ A COMISSÃO:** dois percursos com a mesma VENDA; A volta DO ZERO, B segue; COMISSÃO + ?; BASE DE CONTATOS, CONHECIMENTO DO PÚBLICO, ESTRUTURA; PRÓXIMA NEGOCIAÇÃO; CONSTRUA CONTINUIDADE.
5. **Transição — REVISE ANTES DE SEGUIR:** REVISÃO DO FECHAMENTO (origem do cliente, interessados, próximo passo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:08.
- Duração 61,1 s (fala 58,8 s), dentro dos 50–60 s de fala.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL08 --source episodes/EP-ATIVO-REEL08/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL08 && bash tools/render_episode.sh EP-ATIVO-REEL08
```
