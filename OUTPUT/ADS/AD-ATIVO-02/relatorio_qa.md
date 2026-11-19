# QA — Criativo Meta Ads 02 · "Só um minutinho" (15/11/2026)

**Fonte:** `ROTEIROS/ADS/AD-ATIVO-02.md` (cliente), narrado palavra por palavra. **Padrão de edição de anúncio v2** (voz 1,1×, transcrição dinâmica, palco com cortes, SFX em cada troca). **CTA:** botão do anúncio ("Clique no botão e conheça como a ATIVO pode funcionar para você." — tela CLIQUE NO BOTÃO).

## Voz
Preset oficial (Gemini, Puck), tomada B (A e B limpas; B fiel ao "conheça"), **1,1×** por atempo (tom preservado). 36,3 s de fala, 193 palavras/min. A voz diz "tá" e "Clica" (coloquial); a tela mostra o texto do roteiro.

## Edição
Quadro 0: mensagem do cliente grande e centralizada ("Me manda as fotos e a metragem…") + notificação/impacto. Cronômetro "PROCURANDO…" do "minutinho" (00:01 → 07:48, congela em ENCONTRADO no "único lugar"). Cortes: galeria rolando → PDF da construtora (Área privativa 68 m²) → busca "valor" nas conversas (R$ ???) → cliente esperando → FOTO/METRAGEM/VALOR batendo + JÁ É DA SUA CARTEIRA → ficha única → logo ATIVO → imóveis cadastrados (✓ FOTOS / VALORES / INFORMAÇÕES) → site próprio (maquete) → link enviado ao cliente → CTA.

## Validação
11/11 checagens (38,43 s · −15,0 LUFS · TP ≤ −1,5 dBTP) · `editorial_check` 0/0 · mixagem × voz 117/117 palavras · movimento 3,33 · maior trecho parado 0,5 s.

## Integridade
Cliente, imóvel (68 m², R$ 420.000), galeria, PDF, chat e site são **ilustrativos** (rótulos ILUSTRATIVO / "seu site · ilustrativo"; sem endereço inventado; chat genérico, sem interface de app real). "Site próprio" corresponde a projetos reais (Bruno, Ivone, Antônio), não exibidos por falta de autorização para anúncio.

## Correção de ferramenta (vale também para o AD-ATIVO-01)
Os "cortes" de câmera deslizavam desde o enquadramento anterior; agora `scenes/cuts.ts` segura o quadro (com 2,5% de avanço) e salta em 0,14 s. AD-ATIVO-01 re-renderizado com cortes secos: movimento 2,75 (antes 3,15 com deslizes), maior trecho parado 0,4 s.

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py AD-ATIVO-02 && bash tools/render_episode.sh AD-ATIVO-02
```
