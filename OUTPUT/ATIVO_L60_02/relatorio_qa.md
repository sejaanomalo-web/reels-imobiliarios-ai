# QA — ATIVO_L60_02 · "Um imóvel, quatro planilhas" (lote L60 · EP021 · 21/11/2026)

**Fonte:** `ROTEIROS/EP021.md` (livro, Dia 03 / EP021). Gancho, situação, tensão e insight narrados palavra por palavra.
**Esteira:** ESTILO 5 · PAINEL. Próximo: 1 · Palitinho.
**Agenda:** 29/11/2026 às 10:00, slot automático da Action. Pedido do cliente: em 29/11 entram 1 vídeo GTA às 22h e 2 do livro (L60_01 às 8h e este às 10h).

## Apuração
- Roteiro atemporal. Não tem números nem afirmações de mercado.
- Apartamento FICTÍCIO, sem endereço. Valores e campos são ILUSTRATIVOS.
- As planilhas são genéricas, sem marca de software.

## CTA
- A CTA do livro já falava do sistema. Foi trocada pela CTA SISTEMA padrão, sem transição.
- O texto original está em `cta.original_cta`.

## Voz
- ⚠️ **As duas tomadas (A e B) leram a instrução de direção da voz em voz alta antes do texto** ("…com um colega corretor de imóveis, brasileiro…"). Problema conhecido, igual aos Reels 12, 15 e 24.
- Usei a tomada A, cortada aos 17,85 s, dentro da pausa antes do texto real. A ferramenta é `ffmpeg -ss`, e o corte não altera velocidade nem tom.
- Resultado: 36,5 s de fala, 156 palavras/min, ASR 0,989 (94/95). A transcrição do trecho cortado está limpa.
- **Ponto para ouvir:** o início, para confirmar que não sobrou nada da instrução. Ouvir também "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · 30 fps · AAC · 38,8 s · −14,9 LUFS.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,35. SFX: 21 eventos. `legenda_check` ✓.
- Ajustes depois da revisão dos quadros:
  - o gancho agora abre com 1 ficha central, que se multiplica em 4;
  - a tag "esforço não faltou" saiu de cima das fichas.

## Cenas
1. **QUAL DELAS ESTÁ CERTA?**
   - Uma ficha do APTO 2Q se multiplica em 4 planilhas.
   - Aparece um "?" vermelho em cada uma.
2. **CADA UMA SABE UMA COISA**
   - A câmera passa de planilha em planilha.
   - Cada uma acende o seu campo: VALOR antigo, FOTO nova, STATUS disponível, NOTA do proprietário.
3. **NÃO É FALTA DE ESFORÇO**
   - A planilha 1 recebe ✓ ATUALIZADA.
   - As outras 3 ficam DESATUALIZADAS em cascata.
   - Fecha com ATUALIZOU 1 · ESQUECEU 3.
4. **UM CADASTRO PRINCIPAL**
   - As 4 planilhas colapsam numa ficha única.
   - Os campos marcam ✓ no tempo da fala: PREÇO, STATUS, CARACTERÍSTICAS, MATERIAL, ÚLTIMA CONFERÊNCIA.
   - Fecha com 1 IMÓVEL = 1 CADASTRO.
5. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-L60-02 --source episodes/ATIVO-L60-02/narration_source.wav && python3 tools/build_audio.py ATIVO-L60-02 && bash tools/render_episode.sh ATIVO-L60-02
```
