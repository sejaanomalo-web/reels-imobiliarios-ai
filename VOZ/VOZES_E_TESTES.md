# CASTING DA VOZ OFICIAL — PERFIL IMOBILIÁRIO

## Objetivo

Encontrar uma voz constante, brasileira e natural, próxima à qualidade de narração desejada, sem depender necessariamente de ElevenLabs. Escolha pela **audição real**, não por descrições publicitárias. O modelo e o timbre escolhidos serão travados em `voice/voice_preset.json` para todos os episódios.

## Opção 1 — Chatterbox Multilingual V3 (preferência a avaliar)

- Projeto: https://github.com/resemble-ai/chatterbox
- Modelo específico PT-BR: https://huggingface.co/ResembleAI/Chatterbox-Multilingual-pt-br
- Demo PT-BR: https://huggingface.co/spaces/ResembleAI/Chatterbox-Multilingual-TTS-pt-br
- Características: modelo aberto com versão PT-BR, estilo/prosódia expressivos, possibilidade de timbre guiado por referência autorizada; licença MIT indicada na ficha do modelo.
- **Atenção:** desde agosto/2026 o repositório está arquivado e não recebe suporte oficial. A execução pode exigir GPU/RAM significativas. A versão PT-BR isolada inclui checkpoints especializados e talvez exija um carregador específico; não suponha que a chamada genérica de exemplo automaticamente utiliza o modelo regional.

## Opção 2 — Kokoro-82M (catálogo de três vozes pt-BR)

- Modelo original: https://huggingface.co/hexgrad/Kokoro-82M
- Empacotamento pt-BR e lista: https://huggingface.co/litert-community/Kokoro-82M
- Vozes brasileiras: `pf_dora` (feminina), `pm_alex` e `pm_santa` (masculinas).
- Licença do modelo: Apache-2.0.
- Vantagem: modelo pequeno, execução local viável em hardware mais modesto; timbres fixos, sem necessidade de clonagem.

## Modelos não priorizados para produção comercial sem nova verificação

- F5-TTS pt-BR — há modelos cujos pesos são CC-BY-NC-4.0 (uso não comercial). Não usar em vídeos promocionais da empresa apenas porque o código é MIT.
- Fish Speech — licença comunitária própria e condições variáveis dos pesos; confirmar permissão comercial caso seja considerado.

## Texto único de audição (use em cada modelo)

“Corretor, deixa eu te fazer uma pergunta: você sabe quantos interessados ficaram sem retorno esta semana? Um contato não é só uma mensagem no WhatsApp. É uma conversa com contexto, prazo e próximo passo. E é isso que a gente precisa organizar.”

Critérios de seleção manual (nota 1–5): pronúncia PT-BR, ausência de sotaque artificial, ritmo de conversa, capacidade de enfatizar pergunta, pausas naturais, timbre agradável para muitos episódios, estabilidade em narrativas de 45–60 s, custo/tempo por episódio e licença.

## Arquivo de configuração sugerido após seleção

```json
{
  "approved": false,
  "provider": "TO_BE_SELECTED",
  "model_id": null,
  "model_version": null,
  "language": "pt-BR",
  "voice_id": null,
  "voice_reference_path": null,
  "voice_reference_authorized": false,
  "style": "conversacional, brasileiro, seguro e espontaneo",
  "speed": 1.0,
  "seed": null,
  "license_reviewed": false,
  "approval_date": null
}
```

Se usar referência de voz para clonagem, exigir consentimento da pessoa e guardar comprovação. Nunca usar como referência a voz dos autores dos Reels anexados sem autorização expressa.
