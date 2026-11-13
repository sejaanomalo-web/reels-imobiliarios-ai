# Comparação de vozes — audições

Arquivos em `OUTPUT/VOICE_AUDITIONS/`.

**Limite desta avaliação:** ninguém ouviu as audições dentro do pipeline. As colunas são medições (duração, ritmo, texto reconhecido por transcrição automática). Naturalidade, sotaque, timbre e emoção — os critérios que decidem a voz — **dependem de você ouvir**. Não há notas de 1 a 5 porque seriam inventadas.

## Rodada 2 — Gemini `gemini-3.8-flash-tts` (voz atual)

Motivo: o cliente ouviu o piloto com Kokoro e reprovou ("robótica"). As audições desta rodada usam a **narração inteira do EP001**, não o texto curto de teste, com a direção: *"Tom de conversa entre colegas corretores de imóveis: brasileiro, próximo, seguro e natural. Ritmo ágil, sem correria, com pausas curtas entre as ideias. Nunca locutor de comercial."*

| Voz (rótulo do catálogo) | Duração | Palavras/min | Divergências na transcrição automática | Arquivo |
|---|---|---|---|---|
| `Achird` (amigável) | 38.09 s | 162 | "pediu", "quer", "agende" reconhecidas errado | `audicao_gemini_Achird_EP001.wav` |
| `Charon` (informativa) | 41.33 s | 150 | "agende" reconhecida errado; uma palavra a mais ("a") | `audicao_gemini_Charon_EP001.wav` |
| `Zubenelgenubi` (casual) | 37.85 s | 163 | "agende" reconhecida errado | `audicao_gemini_Zubenelgenubi_EP001.wav` |
| `Orus` (firme) | 36.61 s | 169 | uma palavra a mais ("para **a** sua rotina") | `audicao_gemini_Orus_EP001.wav` |
| `Puck` (animada) | 37.05 s | 167 | nenhuma | `audicao_gemini_Puck_EP001.wav` |

- Todas dizem "lead" como "líd" sem ajuste (o reconhecedor escreve "Lid").
- As divergências podem ser erro do reconhecedor ou da fala; só a escuta resolve. A palavra a mais de Orus e Charon é desvio real do roteiro.
- **Puck foi aprovada pelo cliente em 2026-11-10** a partir de `audicao_gemini_Puck_EP001.wav`.
- A descrição entre parênteses é o rótulo que o Google dá à voz, não uma avaliação.
- O modelo lê a direção em voz alta se ela for enviada como texto solto; o pipeline usa rótulos ("DIREÇÃO" / "TEXTO A SER FALADO") e confere a transcrição a cada geração.
- A fala muda a cada geração. A narração oficial fica congelada em `PRODUCAO/episodes/EP001/narration_source.wav`.
- Uma sexta voz (Sulafat, feminina) não foi gerada: a chave recebeu erro 429 (cota excedida) depois de 13 requisições.

## Rodada 1 — Kokoro-82M local (reprovada pelo cliente)

Texto único de `VOZ/VOZES_E_TESTES.md`.

| Voz | Duração | Palavras/min | Divergências | Arquivo |
|---|---|---|---|---|
| `pm_alex` | 14.15 s | 178 | nenhuma | `audicao_kokoro_pm_alex.wav` |
| `pm_santa` | 14.26 s | 177 | nenhuma | `audicao_kokoro_pm_santa.wav` |
| `pf_dora` | 13.89 s | 181 | nenhuma | `audicao_kokoro_pf_dora.wav` |

Precisava de grafia fonética para "lead" (lia "leád"). Continua disponível como opção sem custo: ver `notes` em `VOZ/voice_preset.json`.

## Opções não testadas

| Opção | Situação |
|---|---|
| ElevenLabs `eleven_v4` | Conta conectada, mas com **222 créditos**; cada narração do EP001 custa 622. As 6 gerações pedidas falharam por cota e não foram cobradas. Vozes pré-selecionadas para quando houver crédito: Cirilo, Antonio de Jesus, Jhony Tygas (brasileiras, conversacionais) |
| Chatterbox Multilingual pt-BR | `huggingface.co` bloqueado na rede do ambiente; sem GPU |
| Gemini `gemini-2.5-pro-preview-tts` | Disponível na chave; não testado por causa da cota |

## Para trocar a voz

1. Adotar outra audição desta rodada: ajustar `voice_id` em `VOZ/voice_preset.json` e rodar, em `PRODUCAO/`:
   `python3 tools/build_narration.py EP001 --source ../OUTPUT/VOICE_AUDITIONS/audicao_gemini_<Voz>_EP001.wav && npm run audio -- EP001 && npm run render -- EP001`
2. Usar um arquivo de fora (ElevenLabs exportado, locutor humano): `"provider": "arquivo"` e salvar o WAV em `PRODUCAO/episodes/EP001/narration_source.wav`. O pipeline alinha as legendas e as cenas a qualquer narração que siga o texto.

## Observação a partir do EP002

O plano gratuito limita 10 gerações por dia **por modelo**. No EP002 o modelo aprovado esgotou a cota; a única tomada obtida errou duas palavras do roteiro e foi rejeitada. O episódio usa a voz Puck do `gemini-3.1-flash-tts-preview` como rascunho até a cota voltar. Não foi verificado se os dois modelos soam iguais com a mesma voz. Para produzir em série (60 episódios), o plano gratuito não basta: considerar ativar cobrança na chave.
