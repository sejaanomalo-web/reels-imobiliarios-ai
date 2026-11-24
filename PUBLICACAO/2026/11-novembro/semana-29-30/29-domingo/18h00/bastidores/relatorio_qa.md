# QA — ATIVO-D1129-18 · "A casa que chegou de trem" (Esteira Editorial Diária · grade 29/11/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-29/ATIVO-D1129-18_casas_por_catalogo.md` (aprovado pelo cliente em 23/11/2026; processo completo autorizado, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- HUD User (Departamento de Habitação dos EUA), "Kit Homes in America"; Wikipedia (Sears Modern Homes); McHenry County Historical Society; Kovels.
- Números dentro das faixas das fontes: "mais de 70 mil" (estimativas de 70 a 100 mil, selo ESTIMATIVA HISTÓRICA), 1908–1940, até 30 mil peças, centenas de modelos, milhares de pé.
- Desenhos ORIGINAIS: nenhuma página, logotipo ou imagem real do catálogo; medidas dos cômodos e campos do anúncio são ILUSTRATIVOS (carimbo). "Sears" citado como fato histórico.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1129-18/narration_source.wav`.
- Narração 56,2 s · 164 palavras/min · ASR 0,964 (148/154). Vídeo 58,5 s.
- **Pontos para ouvir:**
  - "Sears" pronunciado "Síars" e "1908" lido "mil novecentos e oito" (pronúncias do episódio).

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 14.54 s (alvo 15.16 s); tensao → seção subida em 22.54 s (alvo 23.0 s); descoberta → seção quebra em 26.54 s (alvo 26.36 s); insight → seção drop em 44.54 s (alvo 44.12 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.974 × mixagem 0.981 (queda -0.7 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.96 dBTP, LRA 2.10; narração -19.04 · trilha -25.86 · efeitos -41.46 LUFS; 24 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 58.54 s (timeline 58.53 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.71 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 32.87 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a página da resposta ficava ~3 s vazia → a fachada nasce em "respondia antes" e a planta logo depois.
- A elevação do trem era pequena → 3 andares que param em 2/3 na pergunta.
- Final revisado: correções conferidas na folha de quadros do MP4 final.
- 24/11/2026: novo render com a trilha T03 (autorizada); imagem idêntica ao final aprovado.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — porta fechada em linha, a família do lado de fora: +70 MIL CASAS · 0 VISITAS (selo ESTIMATIVA HISTÓRICA).
2. Contexto — mergulho na porta: página de catálogo com ROUPA · CASA · FERRAMENTA, carimbo 1908, PELO CORREIO; a casa acende.
3. Trem — PEDIDO → rota → ESTAÇÃO, vagão em corte, 12 peças numeradas em vista explodida, CORTADAS NA MEDIDA, elevação que sobe com o MANUAL.
4. Pergunta — a elevação para no meio, porta fechada e o "?" vermelho (fundo de tensão).
5. Resposta — a página que respondia antes: fachada, planta com medidas que acendem, porta que abre, O QUE VEM NO KIT.
6. Escala — a página pousa num bairro de 20 pranchas; 1908 — 1940; janelas acendem (de pé).
7. Desfecho — ANÚNCIO DE HOJE · ILUSTRATIVO: campos FOTOS · PLANTA · MEDIDAS · VALOR E CONDIÇÕES acendem; rota até VISITA; carimbo APROVADO.
8. CTA curta — CtaPlanta (ambientes acendem, campo SISTEMA, rota de envio, logo assinado).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1129-18 --source episodes/ATIVO-D1129-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1129-18 && bash tools/render_episode.sh ATIVO-D1129-18
```
