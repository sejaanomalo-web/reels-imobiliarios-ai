# QA — ATIVO_NOV26_30 · "O corretor digital de verdade" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_30.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- O [Conexão Imobiliária Secovi-SP](https://secovi.com.br/evento/conexao-imobiliaria-secovi-sp-2026/) (nov/2026) debateu ferramentas digitais, IA, dados, gestão de leads e jornada de compra ([Palco Arena](https://secovi.com.br/palco-arena-debate-ia-dados-e-novas-fontes-de-receita-para-corretores-e-imobiliarias/)).
- Os apps são genéricos (CONVERSAS, E-MAIL, ANOTAÇÕES, PLANILHA, PASTAS), sem marcas. Os módulos são ILUSTRATIVOS. **Não é demonstração do produto real.** O vídeo não simula envio automático de Direct.

## CTA
- **A CTA do roteiro já é a CTA SISTEMA** e foi narrada como no padrão do lote. Não precisou de frase de transição.
- A abertura visual segue o roteiro: o título "COMENTE “SISTEMA”" aparece desde o gancho.

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.** A A disse "espalhar a informação".
- 52,5 s, 159 palavras/min, ASR 0,986 (137/139). 1,0× sem time-stretch.
- **Pontos para ouvir:** "Secovi" (o "i" final sai fraco); "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 54,85 s · −14,91 LUFS · TP −1,69 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,40 · maior trecho parado 1,1 s. SFX: 26 eventos, stem −40,0 LUFS. Quadros: fluxo do Take 02 baixado para longe do título. Corrigido o aviso de fonte de 20 px no selo "?".
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_30/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/30/`.

## Cenas
1. **Gancho — COMENTE “SISTEMA”:** corretor cercado por cinco apps genéricos; ✕ MAIS APLICATIVOS; um fio verde liga o atendimento: ✓ continuidade · ✓ contexto.
2. **Take 01 — DIGITAL NÃO É SINÔNIMO DE ORGANIZADO:** Conexão Imobiliária · Secovi-SP · nov/2026; ferramentas digitais / gestão de leads / novas jornadas; informação espalhada em 5 lugares (apps com "?").
3. **Take 02 — LEAD → PERFIL → IMÓVEIS → PRÓXIMO PASSO:** fluxo com 5 etapas; "PRÓXIMO PASSO" some ("a tecnologia não resolveu") e depois aparece ✓ CORRIGIDO.
4. **Take 03 — PROCESSO PRIMEIRO, FERRAMENTA DEPOIS:** grade "cheio de funções?" que se reorganiza em IMÓVEIS / LEADS / ATENDIMENTOS; do seu jeito · à mão na hora de atender.
5. **CTA SISTEMA** (Um sistema do seu jeito) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-30 --source episodes/ATIVO-NOV26-30/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-30 && bash tools/render_episode.sh ATIVO-NOV26-30
```
