# Kit de produção em escala — Reels de tecnologia imobiliária

Este pacote contém uma configuração de trabalho pronta para colar no Claude Code. Contém o Prompt Mestre (`CLAUDE.md`), o livro com 60 roteiros, os nove Reels de referência em MP4 (material de terceiros, só para estudo — manter o repositório privado), o projeto de produção e as entregas do EP001. Modelos de voz não são versionados: `npm run models` baixa.

## O que vai sempre junto com cada vídeo

1. **Prompt Mestre fixo:** `CLAUDE.md`
2. **Roteiro variável:** `ROTEIROS/EP###.md`, extraído do livro
3. **Referências constantes:** `MODELS/REFERENCIAS_9_REELS.md` + `MODELS/ref_01…09.mp4`
4. **Voz oficial:** preset travado depois da audição em `VOZ/voice_preset.json`
5. **Capturas do sistema:** reais, autorizadas e sem dados pessoais

## Organização do repositório

```text
reels-imobiliarios-ai/
├── CLAUDE.md                  # Prompt Mestre (lido automaticamente pelo Claude Code)
├── ROTEIROS/
│   ├── LIVRO_60_ROTEIROS.docx # fonte dos 60 roteiros
│   └── EP001.md               # roteiro extraído do livro
├── MODELS/
│   ├── REFERENCIAS_9_REELS.md
│   └── ref_01.mp4 … ref_09.mp4   # referências de terceiros: só para estudo
├── VOZ/
│   ├── voice_preset.json      # voz oficial aprovada (Gemini, Puck, 1,0×)
│   └── VOZES_E_TESTES.md
├── MARCA/brand.json           # identidade ATIVO aprovada: logo oficial + verde exato #3AF584
├── ANALISE/                   # relatório das referências, tokens de estilo, comparação de vozes
├── PRODUCAO/                  # projeto Remotion + ferramentas (ver PRODUCAO/LEIAME.md)
│   ├── episodes/EP001/episode.json   # texto, legendas, marcas de sincronia e sons do episódio
│   ├── src/                   # cenas, componentes, tema
│   └── tools/                 # narração, áudio, render, validação
└── OUTPUT/
    ├── VOICE_AUDITIONS/       # audições de voz para aprovar
    └── EP001/                 # vídeo final, capa, narração, legendas, relatórios, stems
```

## Como produzir um episódio

1. Ouvir `OUTPUT/VOICE_AUDITIONS/` e aprovar uma voz em `VOZ/voice_preset.json` (uma vez).
2. Pedir ao Claude Code: "Crie o Reel NN" — ele extrai o roteiro do livro, cria `PRODUCAO/episodes/EPNNN/` e as cenas.
3. `cd PRODUCAO && npm install && npm run models && npm run ep -- EP001` regenera narração, áudio, vídeo e validação.
4. Assistir no celular antes de publicar: a revisão automática é por quadros e métricas, não por escuta.

## Restrições de custo e licença

- TTS open source local pode não ter custo por caractere, mas requer hardware/energia; plataformas de hospedagem podem cobrar.
- O Remotion possui termos de licenciamento dependentes da organização e uso: https://www.remotion.dev/docs/license/pricing . Verificar antes de uso comercial.
- Higgsfield ou outra ferramenta externa requer integração e credenciais; não presumir acesso via Claude Code.
- Os vídeos de referências são para estudo de direção visual, nunca para copiar/redistribuir sem direitos.
