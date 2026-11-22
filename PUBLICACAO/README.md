# PUBLICACAO — o que vai ao ar no Instagram, organizado por data

**Regra de ouro:** cada pasta de horário é um post. A data e a hora do CAMINHO são o horário em que ele vai ao ar.

```text
PUBLICACAO/
└── 2026/
    └── 11-novembro/
        └── semana-22-28/            ← semanas de domingo a sábado, recortadas no mês
            └── 24-terca/
                └── 08h00/           ← horário de Brasília = horário do post
                    ├── ATIVO_NOV26_01.mp4            vídeo
                    ├── ATIVO_NOV26_01_capa.jpg       capa
                    ├── ATIVO_NOV26_01_legenda.txt    legenda do Instagram (texto pronto)
                    └── bastidores/                   relatório de QA, validação técnica, SRT e relatórios de áudio
```

## Como um vídeo chega aqui
1. O episódio é renderizado em `OUTPUT/<saida>/` (área de produção) e recebe `legenda_instagram.txt`.
2. `cd PRODUCAO && python3 tools/publicar.py <EPISÓDIO> --quando "AAAA-MM-DD HH:MM"`. O script **move** (não copia) vídeo, capa (convertida para JPG) e legenda para a pasta da data e leva QA, SRT e relatórios para `bastidores/`. Recusa horário ocupado e legenda reprovada.
3. Commit e push na `main` → a Action **Enfileirar posts** (`.github/workflows/enfileirar.yml`) coloca o post na fila do Supabase **exatamente no horário da pasta** (função `ig_enfileirar_post`).
4. O robô `ig-publicador` publica no @ativo.br no horário.

## Cuidados
- **Só entra aqui post pronto e aprovado.** Todo MP4 novo nesta pasta é publicado.
- **Para mudar o horário de um post já enviado, mova a pasta E atualize o Supabase juntos.** O Claude faz as duas coisas; só mover quebra o post.
- Para trocar o vídeo de um post (correção), use `publicar.py ... --substituir` no mesmo horário; o caminho não muda.
- Vídeos que não vão para a fila (pilotos, anúncios, landing, Stories, Reels antigos) ficam em `OUTPUT/`, nunca aqui.
