# QA — ATIVO-D1129-15 · "Dezembro não é mês morto" (Esteira Editorial Diária · grade 29/11/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-29/ATIVO-D1129-15_dezembro_nao_e_mes_morto.md` (aprovado pelo cliente em 23/11/2026; processo completo autorizado, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- DIEESE, nota de 13/11/2026: o 13º pode injetar R$ 399,1 bilhões em 2026 (~99,7 milhões de pessoas); 1ª parcela até 30/11 e 2ª até 18/12. Ressalva do próprio Dieese: é o volume do ano, não necessariamente concentrado em nov/dez (a fala diz "este ano" e só cita o prazo).
- ABECIP (boletim dez/2024; Sinduscon-SP, Exame): SBPE R$ 17,61 bi em dezembro de 2024, maior volume da série para um dezembro (+18,1% sobre novembro). Recorde em valor, não em unidades (tela: "EM VOLUME"); as barras NOV/DEZ respeitam a proporção 1 : 1,18.
- QuintoAndar (guias): procura por aluguel sobe no início do ano (contratos que vencem, volta às aulas); números antigos → sem percentual. "Em janeiro ele já sabe pra quem vai ligar" é interpretação, dita como conclusão.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1129-15/narration_source.wav`.
- Narração 43,2 s · 171 palavras/min · ASR 0,947 (117/123). Vídeo 45,5 s.
- **Pontos para ouvir:**
  - "Férias, sim." (≈36,3 s): os dois reconhecedores ouviram "fere assim" — a fala junta as palavras; a legenda mostra FÉRIAS, SIM. em destaque.
  - "Dieese" (≈13,1 s) reconhecido como "Diez" (pronúncia corrida da sigla).
  - "com dinheiro da poupança" saiu "com o dinheiro da poupança" (artigo a mais, sem mudança de sentido).

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 27.562 s (alvo 28.68 s); insight → seção c em 32.558 s (alvo 33.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.935 × mixagem 0.919 (queda 1.6 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.30 LUFS, TP -1.95 dBTP, LRA 3.30; narração -19.84 · trilha -28.28 · efeitos -39.97 LUFS; 34 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 45.55 s (timeline 45.53 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.34 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 23.91 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a pilha de moedas do kit trazia o selo "%" (comissão) → pilha própria, sem símbolo.
- As barras NOV/DEZ invadiam a faixa da legenda → descidas para o palco inferior (base em y 1480).
- Fecho CtaCartoon adaptado à CTA curta (o cartão COMENTE digita e envia; encolhe e os 3 cartões entram em "conheça · nosso · personalizado"; sem linha de Direct).
- Final: `sistema_visual_check --quadros` com 2 avisos leves de luminância (q_020 = 45, barras verdes no limite; q_041 = 47, fecho com os 3 cartões e o SEGUIR acesos), aceitos; `motion_check` movimento médio 3,78, 11,9% de quadros parados, maior trecho parado 0,8 s (meta 0,5 s; registrado).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o corretor de férias pendura a placa "VOLTO EM JANEIRO" e sai com a mala; o corretor A espantado e o carimbo MÊS MORTO?.
2. 13º — multidão, chuva de moedas e o contador R$ 399,1 BI (FONTE: DIEESE · ESTIMATIVA NOV/2026).
3. Prazo — calendário de dezembro: 1ª parcela até 30/11, 2ª até 18/12 com check.
4. Crédito — a compradora recebe a chave da casa; FINANCIAMENTO com dinheiro da poupança; barras NOV/24 × DEZ/24 e carimbo MELHOR DEZEMBRO DA SÉRIE HISTÓRICA (FONTE: ABECIP · SBPE, EM VOLUME).
5. Aluguel — mãe e filho entre caixas de mudança; PROCURA ↑ NO COMEÇO DO ANO; calendário de janeiro, CONTRATOS VENCEM e VOLTA ÀS AULAS.
6. Virada — clima de conflito: o cliente quase some em fumaça, NÃO SOME; corte para o clima de solução: MÊS DA DECISÃO.
7. Desfecho — em janeiro, o celular do corretor A toca na cadeira de praia (QUEM RESPONDEU EM DEZEMBRO); o corretor da placa ao fundo, espantado; FÉRIAS, SIM. / SUMIÇO, NÃO. com confete.
8. CTA curta — CtaCartoon (campo SISTEMA, 3 cartões, SEGUIR → SEGUINDO, logo).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1129-15 --source episodes/ATIVO-D1129-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1129-15 && bash tools/render_episode.sh ATIVO-D1129-15
```
