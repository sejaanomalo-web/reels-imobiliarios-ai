# Kit de produção em escala — Reels de tecnologia imobiliária

Este pacote contém uma configuração de trabalho pronta para colar no Claude Code. Contém o Prompt Mestre (`CLAUDE.md`), o livro com 60 roteiros, os nove Reels de referência em MP4 (material de terceiros, só para estudo — manter o repositório privado), o projeto de produção e as entregas do EP001. Modelos de voz não são versionados: `npm run models` baixa.

## O que vai sempre junto com cada vídeo

1. **Prompt Mestre fixo:** `CLAUDE.md`
2. **Roteiro variável:** `ROTEIROS/EP###.md`, extraído do livro
3. **Referências constantes:** `MODELS/REFERENCIAS_9_REELS.md` + `MODELS/ref_01…09.mp4`
4. **Voz oficial:** preset travado depois da audição em `VOZ/voice_preset.json`
5. **Capturas do sistema:** reais, autorizadas e sem dados pessoais

## Organização do repositório (atualizada em 22/11/2026)

```text
reels-imobiliarios-ai/
├── CLAUDE.md                 # Prompt Mestre (lido automaticamente pelo Claude Code)
├── COMECE_AQUI.md            # este mapa
├── MODELOS_DE_VIDEO.md       # estilos de vídeo (Primeiro modelo, Segundo modelo…)
│
├── PUBLICACAO/               # O QUE VAI AO AR, por data: AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/
│   └── 2026/11-novembro/semana-22-28/24-terca/08h00/  → vídeo · capa · legenda · bastidores/
├── OUTPUT/                   # produção e acervo FORA da fila (ver OUTPUT/README.md)
│   ├── <saida>/              #   render aguardando publicação
│   ├── pilotos/  anuncios/  landing/  stories/  reels-anteriores/  testes-de-voz/
│
├── ROTEIROS/                 # textos: livro de 60, lotes (GTA6, LOTE_NOV2026), VIRAL/, stories/
├── PRODUCAO/                 # código que gera os vídeos (Remotion + ferramentas)
│   ├── episodes/<EP>/        #   fonte de cada vídeo (episode.json + voz congelada)
│   ├── src/                  #   cenas e kits de estilo (src/estilos/)
│   ├── lotes/                #   estado e regras de cada lote (NOV26, GTA6, L60)
│   └── tools/                #   narração, áudio, render, validação, publicar.py
│
├── MARCA/  VOZ/              # identidade ATIVO (logo, verde) e voz oficial
├── PROMPTS/                  # guias editoriais, legendas, estilos, melhoria contínua
├── ANALISE/                  # relatórios de referência, tokens e histórico (ANALISE/historico/)
├── MODELS/                   # 9 Reels de referência fixos (não mexer)
├── modelos/                  # fila de MP4 de referência para novos roteiros (Skill Mestre)
└── .claude/skills/           # skills: Skill Mestre de roteiros + skills dos modelos de vídeo
```

## Como produzir um episódio

1. Ouvir `OUTPUT/testes-de-voz/` e aprovar uma voz em `VOZ/voice_preset.json` (uma vez).
2. Pedir ao Claude Code: "Crie o Reel NN" — ele extrai o roteiro do livro, cria `PRODUCAO/episodes/EPNNN/` e as cenas.
3. `cd PRODUCAO && npm install && npm run models && npm run ep -- EP001` regenera narração, áudio, vídeo e validação.
5. Publicar: `python3 tools/publicar.py <EP> --quando "AAAA-MM-DD HH:MM"` → commit e push na `main` (ver `PUBLICACAO/README.md`).
4. Assistir no celular antes de publicar: a revisão automática é por quadros e métricas, não por escuta.

## Restrições de custo e licença

- TTS open source local pode não ter custo por caractere, mas requer hardware/energia; plataformas de hospedagem podem cobrar.
- O Remotion possui termos de licenciamento dependentes da organização e uso: https://www.remotion.dev/docs/license/pricing . Verificar antes de uso comercial.
- Higgsfield ou outra ferramenta externa requer integração e credenciais; não presumir acesso via Claude Code.
- Os vídeos de referências são para estudo de direção visual, nunca para copiar/redistribuir sem direitos.
