# Comparação de vozes — audições

Arquivos em `OUTPUT/VOICE_AUDITIONS/`, todos com o texto único de `VOZ/VOZES_E_TESTES.md`.

**Limite desta avaliação:** as audições não foram ouvidas por ninguém. As colunas abaixo são medições (duração, ritmo, texto reconhecido por transcrição automática). Naturalidade, sotaque, timbre e emoção — os critérios que decidem a voz — **dependem de você ouvir**. Não há notas de 1 a 5 aqui porque seriam inventadas.

| Voz | Duração | Palavras/min | Texto reconhecido (Whisper) | Tempo de geração (CPU) | Arquivo |
|---|---|---|---|---|---|
| Kokoro-82M `pm_alex` | 14.15 s | 178 | 100% | 3.9 s | `audicao_kokoro_pm_alex.wav` |
| Kokoro-82M `pm_santa` | 14.26 s | 177 | 100% | 3.2 s | `audicao_kokoro_pm_santa.wav` |
| Kokoro-82M `pf_dora` | 13.89 s | 181 | 100% | 2.9 s | `audicao_kokoro_pf_dora.wav` |
| Chatterbox Multilingual pt-BR | — | — | — | — | **não gerado** |

## O que as medições dizem

- As três vozes Kokoro pronunciam o texto de teste de forma 100% reconhecível, incluindo "corretor" e "WhatsApp". "Imobiliária", "CRM" e "CRECI" não estão no texto de teste; "imobiliário" foi reconhecido corretamente na narração do EP001.
- Ritmo praticamente igual entre elas (177–181 palavras/min no texto de teste).
- Geração em ~3–4 s por trecho, em CPU, sem custo por caractere.

## Problemas de pronúncia encontrados (narração do EP001)

| Palavra | Problema | Tratamento |
|---|---|---|
| lead | O modelo lê "leád" | Grafia fonética "lídi" em `VOZ/voice_preset.json` → `pronunciation_overrides`. Os dois reconhecedores ouvem "LED"; **conferir de ouvido** |
| encheu | Whisper ouviu "em Shell"; Parakeet ouviu "encheu" | Mantido; provável erro do reconhecedor, conferir de ouvido |
| bio / agende | Whisper ouviu "B.E.O." e "agente de"; Parakeet ouviu certo | Mantido; conferir de ouvido |

## Chatterbox — por que não foi testado

`huggingface.co` é bloqueado pela rede deste ambiente (403 no proxy), e os pesos do Chatterbox só são distribuídos por lá. Além disso, o ambiente não tem GPU. Para testá-lo: liberar `huggingface.co` no ambiente ou rodar numa máquina com GPU.

## Escolha

`pm_alex` foi usada **provisoriamente** no piloto para o vídeo existir; não é uma recomendação baseada em escuta. `VOZ/voice_preset.json` está com `"approved": false`. Para trocar: editar `voice_id` e rodar `npm run ep -- EP001` em `PRODUCAO/`.

## Ressalva de qualidade

Kokoro pt-BR é um modelo pequeno (82M). É plausível que soe mais sintético que a narração das referências. Se, ao ouvir, nenhuma das três convencer, as alternativas reais são Chatterbox (exige liberar rede/GPU) ou um serviço pago de TTS — a conta ElevenLabs conectada a esta sessão não foi usada, porque gasta créditos e o projeto pedia avaliar primeiro as opções locais.
