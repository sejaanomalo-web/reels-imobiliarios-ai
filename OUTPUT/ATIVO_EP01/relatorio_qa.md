# ATIVO — Episódio 01 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana continua necessária.

## Checagem

| # | Item | Resultado |
|---|---|---|
| 1 | Roteiro correto | `ATIVO_Episodio_01.md` enviado em 13/11 → `ROTEIROS/ATIVO_EP01.md`; 5 cenas na ordem |
| 2 | Fidelidade do texto | 100% palavra por palavra, CTA incluída; nada reescrito |
| 3 | Voz original em 1,0× | `gemini-3.8-flash-tts` / `Puck` / direção original; tomada C sem edição |
| 4 | Pronúncia | 199/199 palavras reconhecidas na narração isolada; na mixagem as diferenças do ASR são "está→tá" e cortes de janela — conferido por janelas de 4–6 s: mix = narração |
| 5 | Direção visual do roteiro | Mapa + dois perfis + anúncios parecidos + três caminhos + MESMO MERCADO. ESTRATÉGIAS DIFERENTES. ✔ · cartão do comprador + filtro + NECESSIDADE → BUSCA → INDICAÇÃO ✔ · prédio abstrato com camadas + perfis + IMÓVEL → PERFIL IDEAL ✔ · autorização/checagem/apresentação → catálogo + três caminhos simultâneos ✔ · colunas → bússola → PRIORIDADE ✔ · QUAL É O SEU FOCO? ✔ · **logo discreta ✘ (arquivo ausente)** |
| 6 | Movimento | Médio 1,45; maior trecho parado 0,9 s (limite 1,5 s). Abaixo da média da série (≈1,8): é um episódio mais explicativo e mais longo; preferi não inventar animação sem motivo |
| 7 | Legendas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 8 | Áudio | Narração −18,8 LUFS na frente; trilha −37,1; efeitos −33,0; efeitos posicionados em pausas |
| 9 | Render | 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 76,95 s · −15,01 LUFS · −1,41 dBTP · sem pretos · sem silêncio total |

## Correções feitas antes da entrega

- Gancho começava quase parado (movimento 0,5 nos 4 primeiros segundos) → tráfego no mapa, pinos pulsando, câmera descendo de um plano inclinado.
- Carimbo "A MESMA COISA" ficava ~0,3 s na tela e cortado nas bordas → entra junto da fala e fica legível ~0,7 s antes do corte.
- 2,3 s de tela vazia no início do capítulo 1 → cartão do comprador entra em "Imagine o primeiro".
- Título do insight era uma etiqueta pequena → manchete grande; rótulos mínimos subiram de 22–24 px para 26–30 px.
- Câmera empurrava cartões contra a borda (capítulos 1 e 2) e os capítulos 2 e 3 se sobrepunham na transição → corrigido.

## Pontos de atenção (decisão do cliente)

1. **Duração: 77 s.** Longo para Reels de topo de funil; a retenção tende a cair depois de 45–60 s. O texto foi mantido integral porque é o roteiro aprovado. Se quiser, corto para ~55 s enxugando as cenas 2–4 (precisa de nova narração).
2. **Logo:** o roteiro pede logo oficial discreta no fim. Sem o arquivo no repositório, o encerramento ficou sem marca. Envie o SVG/PNG para `MARCA/` e eu re-renderizo este episódio (e EP030–EP033).
3. **CTA:** é a do próprio roteiro (relacionamento por comentário), não a CTA SISTEMA dos episódios anteriores — intencional.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO01 --source ../OUTPUT/ATIVO_EP01/audio/tomada_C_usada.wav && python3 tools/build_audio.py EP-ATIVO01 && bash tools/render_episode.sh EP-ATIVO01
```
