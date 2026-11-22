# QA — ATIVO Reel 15 · "O jeito mais rápido de complicar seus impostos" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL15.md` (ATIVO_Reel_15_HUMOR_IMPOSTO_COMISSAO.md), narrado palavra por palavra. ID `EP-ATIVO-REEL15`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Salva e manda para um colega que vive deixando papelada para depois. E confirme questões tributárias com seu contador."
- **Mantida a ressalva** "E confirme questões tributárias com seu contador." — proteção editorial, falada e na tela.
- "Salva e manda…" virou a transição **"No dia a dia, ajuda ter cada negociação registrada."** + CTA SISTEMA → Direct.
- O sistema **não** é apresentado como ferramenta fiscal/contábil: a lista do fecho é só QUEM PARTICIPOU / O QUE FOI COMBINADO / PRÓXIMOS PASSOS.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `episode.json` → `diagnostico`
- C2 (humor irônico). Crença questionada: "papelada se resolve depois" / "dica viral resolve imposto".
- **Sem alíquotas, percentuais, valores, simulações ou regra tributária citada** (nota editorial). Selo TOM IRÔNICO; capa com "NÃO É ORIENTAÇÃO TRIBUTÁRIA".
- "WhatsApp" só na fala (texto do roteiro); na tela a conversa é genérica e marcada ILUSTRATIVA, sem marca ou interface de terceiros.
- Sem o amarelo da ANÔMALO: o bilhete "RESOLVO DEPOIS" é papel com borda de alerta.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1**. Tomadas A 59,2 s · B 73,5 s.
- **Tomada A, sem edição:** 161 palavras/min.
- **Tomada B descartada:** a voz **inventou uma frase e leu a instrução de estilo** antes do texto ("Ó, dá uma olhada nessa carteira… nunca locutor de comercial") — 2ª ocorrência (a 1ª foi no Reel 12).
- **Formas da voz:** "Recebeu **a** comissão?", "com seus arquivos" (sem "os"), "30" lido como número, "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 61,6 s · −14,98 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento **2,28** · maior trecho parado 0,9 s.
- ~30 quadros revistos. Corrigidos: título do gancho quebrando sobre o selo, pastas na borda, 2 s vazios antes do manual e do fecho.

## Cenas
1. **Gancho — COMO COMPLICAR IMPOSTOS:** TOM IRÔNICO; pasta COMISSÃO (R$ ••••); cartela "Novela Tributária — Capítulo 1"; bilhete RESOLVO DEPOIS.
2. **MANUAL DO IMPROVISO:** 01 NÃO REGISTRE QUEM FEZ O QUÊ (parceria) · 02 MISTURE COM ARQUIVOS PESSOAIS (recibos e fotos embaralhados) · 03 PROCURE TUDO NA CONVERSA (conversa infinita) → a pasta explode: CONFUSÃO ✓.
3. **CADA CASO EXIGE ANÁLISE:** fundo claro "FALANDO SÉRIO"; RECEBIMENTO / DIVISÃO DE COMISSÕES / EMISSÃO DE DOCUMENTOS / POSSÍVEIS TRIBUTOS; DEPENDE DA SITUAÇÃO · REGRAS APLICÁVEIS; DICA VIRAL DE 30 SEGUNDOS riscada.
4. **ORGANIZE. CONSULTE. CONFIRME.:** CONTRATOS, COMPROVANTES, INFORMAÇÕES → CONTADOR que conhece sua atividade; SABER QUANDO NÃO IMPROVISAR.
5. **NO DIA A DIA, REGISTRE:** "Questões tributárias: com seu contador"; NEGOCIAÇÃO REGISTRADA (exemplo ilustrativo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição e a manutenção da ressalva.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL15 --source episodes/EP-ATIVO-REEL15/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL15 && bash tools/render_episode.sh EP-ATIVO-REEL15
```
