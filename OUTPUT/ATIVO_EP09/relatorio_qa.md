# QA — ATIVO Episódio 09 · "Autoridade imobiliária não é uma foto ao lado de um carro" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP09.md` (ATIVO_Roteiro_09.docx), narrado palavra por palavra. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Siga a ATIVO para desenvolver uma atuação imobiliária mais estratégica."
- Substituída pela transição **"Uma atuação mais estratégica também começa pela sua organização."** + CTA base SISTEMA → Direct.
- **A frase de transição é minha** (ponte "atuação estratégica" → "organização"). **Precisa da aprovação do cliente.**

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO09/episode.json` → `diagnostico`
- C3. Crença questionada: autoridade = sinais de status (carro, troféu, número de vendas).
- Promessa: três provas de competência que viram conteúdo — mercado, análise de imóvel, processo.
- Mapa, planta, etapas e post **ilustrativos e rotulados**; sem dado local, sem classificação de bairro.
- O "+50 IMÓVEIS VENDIDOS" do gancho é o exemplo do que **não** fingir (CENÁRIO ILUSTRATIVO + carimbo FINGIR?), não é resultado alegado.
- Etapas da compra marcadas "A CONFERIR"; regras específicas → FONTES OFICIAIS / PROFISSIONAIS RESPONSÁVEIS. Sem procedimento jurídico universal.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, conta 2. **2 gerações** (A e B); 3ª não foi necessária.
- **Tomada A descartada:** leu a direção do preset em voz alta no lugar do gancho.
- **Tomada B usada, sem emenda:** 83,6 s de fala, 152 palavras/min. Disse "Comente SISTEMA" (forma do roteiro).
- **Três pontos para ouvir** — o Parakeet, na transcrição do arquivo inteiro, ouviu diferente; por trecho, Parakeet e Whisper concordam com o roteiro:
  - 0:04 "que já **vendeu**" (arquivo inteiro: "vender");
  - 0:28 "que você realmente **conferiu**" (arquivo inteiro: "conferir"; Whisper em janela de 4 s: "confidiu");
  - 1:22 "que eu te **envio**" (arquivo inteiro: "te envia").
- Whisper ouve "ajuda alguém" (roteiro: "ajude"), nas duas tomadas; Parakeet ouve "ajude". Sem mudança de sentido.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 85,91 s · −14,97 LUFS · TP −1,60 dBTP.
- `editorial_check` 0 erros / 0 avisos. `tsc` sem erros.
- Mixagem × roteiro: 0,965. "mobilidade→habilidade" e "pense nisso" sumido caem nas bordas de 20 s e 60 s da janela; com a janela deslocada 10 s saem corretos (artefato do reconhecedor).
- Movimento **1,66** (1ª medição: 1,23, abaixo da meta) · maior trecho parado 0,8 s.
- **101 quadros revistos com o tempo real** (70 stills antes do render + 31 extraídos do MP4). Corrigidos:
  - legenda mostrava um asterisco literal em “o melhor*”;
  - cartões FUNCIONA PARA / TALVEZ NÃO FUNCIONE ficavam ~5 s vazios (agora "quem?" até o perfil entrar);
  - selo DEPENDE DA NECESSIDADE nunca aparecia (entrava depois do corte);
  - câmera cortava o cartão da esquerda; ✕ sobre o rótulo; EQUILÍBRIO riscado pela linha da balança;
  - post do insight 2,7 s vazio (agora rascunho com cursor); caixa "Regras específicas?" 2,8 s só com o título (ORIENTE A PROCURAR);
  - etapas do processo entravam 1,5 s depois de "Terceiro";
  - quadro 0 sem o carro.

## Cenas
1. **Gancho:** carro, troféu e "+50 IMÓVEIS VENDIDOS" com carimbo FINGIR? → desfocam; entram planta, mapa e lista. AUTORIDADE NÃO É CENÁRIO → MOSTRE COMO VOCÊ PENSA.
2. **1 · Mercado:** mapa ilustrativo com tráfego; “O MELHOR BAIRRO” riscado → O QUE VALE PESQUISAR: mobilidade, serviços próximos, perfil das ruas, região A ≠ região B → FONTE VERIFICADA ✓.
3. **2 · Análise:** planta sobre a balança (EQUILÍBRIO); FUNCIONA PARA 1 pessoa ✓ × TALVEZ NÃO FUNCIONE família que precisa de 3 quartos ✕ → DEPENDE DA NECESSIDADE.
4. **3 · Processo:** três etapas (antes de visitar, documentos, verificações), cada uma "A CONFERIR"; Regras específicas? → fontes oficiais, profissionais responsáveis.
5. **Insight:** post "EU ENTENDO DO ASSUNTO!" riscado (ANUNCIAR) → vira conteúdo que demonstra (AJUDA ALGUÉM) → tripé MERCADO / ANÁLISE / PROCESSO apoiado em ORGANIZAÇÃO (transição).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a frase de transição.
- **Duração 85,9 s** (212 palavras), acima do ideal de 40–65 s. Sem aceleração. Corte sugerido, se quiser encurtar: tirar s5 ("Use fontes e observações…") e s13 ("Quando houver regras específicas…") dá ~−9 s, mas são as duas frases de integridade do roteiro; alternativa menos arriscada é tirar o exemplo s8 (−6 s).

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO09 --source episodes/EP-ATIVO09/narration_source.wav && python3 tools/build_audio.py EP-ATIVO09 && bash tools/render_episode.sh EP-ATIVO09
```
