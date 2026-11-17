# QA — ATIVO Reel 07 · "O proprietário não quer apenas mais um anúncio" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL07.md` (ATIVO_Reel_07_CAPTACAO_COM_PLANO.md), narrado palavra por palavra. ID `EP-ATIVO-REEL07`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Na sua próxima captação, leve menos adjetivos e mais clareza. Compartilha com alguém que trabalha com proprietários."
- **Mantida a 1ª frase**, que é a ação prática.
- "Compartilha…" virou a transição **"E para mostrar seu processo ao proprietário, ajuda ter cada etapa da captação organizada."** + CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO-REEL07/episode.json` → `diagnostico`
- C2 (comparação). Crença questionada: "captar é prometer divulgação e elogiar o imóvel".
- **Exemplo ilustrativo**, com os rótulos SOBRADO ILUSTRATIVO, PLANO ILUSTRATIVO e EXEMPLO ILUSTRATIVO.
- **Sem preços, contrato de exclusividade ou resultado garantido.** Os dados do imóvel aparecem como "A CONFERIR".
- A checagem editorial barrou "RESULTADO GARANTIDO", mesmo riscado: fora de contexto, o print diria o contrário. Ficou "RESULTADO DA VENDA?" + "NINGUÉM PODE PROMETER".

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1**. **2 gerações** (A 64,6 s · B 69,1 s).
- **Tomada A, sem edição:** 162 palavras/min.
- **Tomada B descartada:** "chegam para **a capital** mesmo sobrado" no gancho (os dois reconhecedores ouvem assim).
- **Formas da voz:** "ajuda **a** ter" e "Comenta SISTEMA".
- **Ponto para ouvir:** 0:47 "**Na sua** próxima captação". O Whisper ouve "Nossa"; o Parakeet, nas duas janelas, ouve "Na sua".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 66,99 s · −15,05 LUFS · TP −1,63 dBTP.
- `editorial_check` 0 erros / 0 avisos. Corrigi três fontes de 20–22 px e o "garantido".
- Mixagem × roteiro: 0,977. "genérica" na borda da janela de 20 s; "Na sua" × "Nossa" (ver acima).
- Movimento **1,68** (1ª medição: 1,40 com 1,2 s parado) · maior trecho parado 0,8 s.
- 38 quadros revistos. Corrigidos:
  - proposta entrando ~3 s depois;
  - plano encostando no título;
  - metade de baixo vazia na cena 4;
  - texto fantasma atrás da comparação;
  - adjetivo saindo pela borda.

## Cenas
1. **Gancho:** O MESMO SOBRADO. DUAS PROPOSTAS. Os profissionais A e B caminham até o sobrado: A "Vou anunciar!" × B com a prancheta PLANO.
2. **Primeira abordagem (A):** "Que casa linda!", flashes, "Vou divulgar!"; PROPOSTA com três lacunas EM BRANCO (para quem / como apresentar / o que confirmar); PROPRIETÁRIO + PROMESSA GENÉRICA.
3. **Segunda abordagem (B):** PLANO DE CAPTAÇÃO marcado na fala (dados a conferir, referências, apresentação, materiais, retornos, próximos passos) → PLANO VISÍVEL.
4. **Por quê:** RESULTADO DA VENDA? / ninguém pode prometer; o proprietário avalia CLAREZA e PREPARAÇÃO; PROMESSA × MÉTODO. Título PROVE SEU PROCESSO.
5. **Aplicação + transição:** MENOS ADJETIVOS (os adjetivos caem) → MAIS CLAREZA → ETAPAS DA CAPTAÇÃO organizadas.
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:47.
- Duração 67,0 s (fala 64,6 s), dentro dos 55–65 s de fala.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL07 --source episodes/EP-ATIVO-REEL07/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL07 && bash tools/render_episode.sh EP-ATIVO-REEL07
```
