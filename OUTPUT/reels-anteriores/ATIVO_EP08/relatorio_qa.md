# QA — ATIVO Episódio 08 · "Quando o mesmo imóvel é anunciado por outros corretores" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP08.md` (ATIVO_Roteiro_08.docx), narrado palavra por palavra. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Siga a ATIVO para acompanhar ideias práticas sobre a profissão imobiliária." (tela SIGA A ATIVO).
- Substituída pela transição **"E orientar com clareza começa por ter cada informação organizada."** + CTA base SISTEMA → Direct.
- **A frase de transição é minha** (ponte do tema "orientação" para "organização"). **Precisa da aprovação do cliente.**

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO08/episode.json` → `diagnostico`
- C2, mudança de percepção.
- Crença questionada: "vence quem descreve o imóvel com os melhores adjetivos".
- Promessa: critérios verificáveis, transparência e ajuda na decisão. Sem prometer exclusividade nem venda; o "outro corretor" aparece com BOM ATENDIMENTO TAMBÉM, como diz o roteiro.
- Anúncios, conversas e imóvel ilustrativos e rotulados. **Sem preço numérico** (`R$ ••••••`).
- Itens do condomínio e da proposta marcados como CONSULTAR / A CONFERIR, nunca como já verificados, conforme a direção do roteiro.

## Voz
- Preset oficial (Gemini, Puck), 1,0×. **1 tomada** (última geração da cota de hoje), sem edição.
- 71,2 s de fala, 179 palavras/min. Aceito o coloquial "Comenta SISTEMA".
- **Três pontos para ouvir** (os dois reconhecedores discordam):
  - 0:07 "o imóvel **não mudou**": Parakeet ouve certo; Whisper ouve "não do", também na voz seca.
  - 0:39 "mas um **descreveu**": Whisper com contexto ouve "descreveu"; em janela curta, "escreveu".
  - 0:57 "por **tornar a decisão** mais clara": Parakeet ouve certo; Whisper ouve "tornada e sisao".
- Se algum estiver ruim: amanhã, depois que a cota renova (~08:00 UTC), regravo e emendo só a frase, como no EP07.

## Validação
- `validate.py` 11/11:
  - 1080×1920 · H.264 · yuv420p · 30 fps · AAC
  - 73,54 s
  - −15,01 LUFS · TP −1,52 dBTP
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,96.
  - As diferenças nas emendas de janela de 20 s (≈40 s e ≈60 s) conferem no trecho inteiro.
  - "não mudou" sai igual na voz seca, ou seja, não é a trilha encobrindo; ver item da voz.
- Movimento 1,87 · maior trecho parado 0,8 s.
- 32 + 7 quadros revisados. Corrigidos:
  - quase 3 s vazios no início da cena 3 (agora os 4 painéis entram como molduras e são preenchidos na fala);
  - buraco em "nas suas mãos";
  - adjetivo cortado na borda;
  - anúncios saindo do quadro no fim do gancho;
  - card "VOCÊ" cortado.

## Cenas
1. **Gancho:** dois anúncios do mesmo imóvel (CORRETOR A / B), mesmos atributos. FOTO / PREÇO / IMÓVEL acendem com "=" no meio; a câmera desce para CONVERSA A / CONVERSA B; o comprador fica com COM QUAL CONVERSAR?
2. **Atendimento A:** três balões ("Sala ampla!", "Boa localização!", "Excelente oportunidade!") e nuvem de adjetivos. Os adjetivos esmaecem → o comprador pergunta "Combina com a minha rotina?".
3. **Atendimento B:** 4 painéis — distribuição dos cômodos (planta abstrata), regras do condomínio, antes da proposta, pontos de atenção (PODE SER UMA LIMITAÇÃO). Fecha com o balão "Tem um ponto que pode não funcionar para você."
4. **A diferença:** MESMO PRODUTO; DESCREVEU × AJUDOU A AVALIAR. CONHECIMENTO DE MERCADO + TRANSPARÊNCIA → MENOS DÚVIDAS · MAIS AUTONOMIA.
5. **Insight:** o outro corretor também atende bem; NAS SUAS MÃOS: a qualidade da sua orientação. Depois as 5 palavras do roteiro, os adjetivos riscados caem e a lista se organiza (transição).
6. **CTA SISTEMA** + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO08 --source episodes/EP-ATIVO08/narration_source.wav && python3 tools/build_audio.py EP-ATIVO08 && bash tools/render_episode.sh EP-ATIVO08
```
