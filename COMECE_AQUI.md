# Kit de produção em escala — Reels de tecnologia imobiliária

Este pacote contém uma configuração de trabalho pronta para colar no Claude Code. **Não contém vídeos MP4 de terceiros nem modelos de voz baixados.** Contém o manifesto com os nove links do Instagram, o Prompt Mestre, um roteiro piloto e instruções de escolha de voz.

## O que vai sempre junto com cada vídeo

1. **Prompt Mestre fixo:** `PROMPT_MESTRE_CLAUDE_CODE.md`
2. **Roteiro variável:** `ROTEIRO_PILOTO_01.md` ou um novo `EP###.md`
3. **Referências constantes:** `REFERENCIAS_9_REELS.md` + arquivos `.mp4` acessíveis no repositório
4. **Voz oficial:** preset travado depois da audição em `voice/voice_preset.json`
5. **Capturas do sistema:** reais, autorizadas e sem dados pessoais

## Organização recomendada do repositório Claude Code

```text
reels-imobiliarios/
├── CLAUDE.md                 # copiar ou apontar para o Prompt Mestre
├── references/
│   ├── REFERENCIAS_9_REELS.md
│   ├── ref_01.mp4 ... ref_09.mp4  # APENAS quando disponibilizados licitamente
├── scripts/
│   ├── EPISODIO_ATUAL.md     # roteiro ativo
│   └── EP001.md              # roteiro anterior
├── voice/
│   ├── voice_preset.json     # escolhido após audição
│   └── audio_ref_autorizado.wav  # só se houver consentimento
├── brand/
│   └── brand.json            # depois que marca for aprovada
├── assets/
│   ├── real_product/
│   ├── authorized/
│   └── generated/
├── analysis/
├── src/                      # código Remotion
├── output/
│   └── EP001/
└── package.json
```

## Primeiro uso (passo a passo)

1. Criar o repositório com essa estrutura. Copiar o Prompt Mestre para `CLAUDE.md` ou apontar o Claude Code para ele.
2. Copiar o manifesto de referências para `references/` e anexar os MP4 realmente disponíveis. Links não são substitutos de vídeos carregáveis.
3. Copiar o roteiro piloto para `scripts/EPISODIO_ATUAL.md`.
4. Pedir ao Claude Code **primeiro as audições de voz**. Comparar e aprovar a mesma voz para toda a série.
5. Salvar o preset selecionado e renderizar o episódio piloto.
6. Assistir ao piloto, corrigir os detalhes e congelar tokens visuais/voz antes de produzir em lote.
7. Para o EP002 em diante, trocar apenas o roteiro, as cenas específicas e os assets novos. Manter Prompt Mestre, referências e preset.

## Primeiro comando para o Claude Code

> Leia o `CLAUDE.md`, `references/REFERENCIAS_9_REELS.md`, `scripts/EPISODIO_ATUAL.md` e `voice/voice_preset.json` se existir. Execute a metodologia do Prompt Mestre. Neste primeiro episódio, priorize análise das referências disponíveis e audições de voz, depois produza uma versão piloto verificável. Não alegue análise de Reels sem os MP4 acessíveis e não afirme ter renderizado um vídeo antes da existência e validação do arquivo.

## Restrições de custo e licença

- TTS open source local pode não ter custo por caractere, mas requer hardware/energia; plataformas de hospedagem podem cobrar.
- O Remotion possui termos de licenciamento dependentes da organização e uso: https://www.remotion.dev/docs/license/pricing . Verificar antes de uso comercial.
- Higgsfield ou outra ferramenta externa requer integração e credenciais; não presumir acesso via Claude Code.
- Os vídeos de referências são para estudo de direção visual, nunca para copiar/redistribuir sem direitos.
