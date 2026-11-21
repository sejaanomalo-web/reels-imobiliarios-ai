# ATIVO_PILOTO_01 — "Concorrente ou parceiro?" no formato cartoon explicativo (piloto)

- **O que é:** piloto do novo formato, modelado nas 3 referências do cliente (análise quadro a quadro). NÃO agendado: o mesmo roteiro já está na fila como ATIVO_NOV26_28 (28/11 15h).
- **Voz:** narração aprovada do NOV26_28 (Puck, 1,0×), reaproveitada sem gerar nada novo; nenhuma cota gasta.
- **Visual:** kit novo `PRODUCAO/src/estilos/cartoon.tsx`:
  - personagens 2D com rig de recorte, fundo de raios com cor por clima, vinheta, holofote e sombra de contato;
  - pop elástico, carimbo com tremor, confete;
  - legenda karaokê no centro (cinza → branco; palavra-chave em verde #02FB3F; negativas em vermelho).
- **Ritmo:** 19 planos em ~45 s, com corte seco a cada ~2–4 s.
  - Movimento médio 3,17 (NOV26_28: 1,44); quadros parados 10,8% (NOV26_28: 24,5%).
- **Integridade:**
  - história marcada como EXEMPLO HIPOTÉTICO;
  - o evento citado na fala aparece só como "painel do setor", sem logo de terceiros;
  - a divisão aparece como "DIVISÃO COMBINADA", sem números;
  - CTA SISTEMA com o componente padrão `Cta`.
- **Validação técnica:** 11/11 OK (1080×1920, H.264, yuv420p, 30 fps, AAC, 55,64 s, −14,98 LUFS, −1,70 dBTP); editorial_check 0 erro / 0 aviso.
- **Ponto fraco conhecido:** a CTA final volta ao visual "app" padrão e quebra o estilo cartoon nos últimos 10 s. Se o formato for aprovado, criar uma CTA cartoon (mantendo o SISTEMA).
