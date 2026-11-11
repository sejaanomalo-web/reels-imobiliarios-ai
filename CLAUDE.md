# CLAUDE.md — Prompt Mestre do projeto

> **Mapa do repositório (estado real):**
> `ROTEIROS/` livro com os 60 roteiros + `EP###.md` extraídos · `MODELS/` 9 Reels de referência (`ref_01…09.mp4`) e manifesto ·
> `VOZ/` preset de voz e casting · `MARCA/` identidade provisória · `ANALISE/` relatórios de referência, voz e tokens ·
> `PRODUCAO/` projeto Remotion + ferramentas (narração, áudio, render, validação) · `OUTPUT/EP###/` entregas por episódio.
> Pipeline de um episódio: `cd PRODUCAO && npm run models && npm run ep -- EP001`. Detalhes em `PRODUCAO/LEIAME.md`.
> Voz oficial: Gemini `gemini-3.8-flash-tts`, voz `Puck` — **aprovada** pelo cliente (`VOZ/voice_preset.json`). Exige `GEMINI_API_KEY`; a chave está no plano gratuito (10 gerações/dia por modelo). Narração congelada em `PRODUCAO/episodes/EP###/narration_source.wav`. Pendências: marca **não aprovada**; não existe `assets/real_product/` (sem capturas reais do sistema).
> **Antes de produzir qualquer episódio, leia `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.** Decisão vigente (11/11/2026): narração em **1,0×** com o preset de voz original aprovado — sem aceleração, sem time-stretch, sem voz ou modelo substituto; padrão audiovisual equilibrado dos primeiros episódios (câmera intencional e suave, legenda original, trilha discreta).

# PROMPT MESTRE — PRODUÇÃO AUDIOVISUAL DE REELS IMOBILIÁRIOS COM IA
## Versão 1.0 — reutilizável para todos os vídeos da marca

> Copie o conteúdo deste arquivo para uma sessão do Claude Code **dentro do repositório de produção**, junto com o roteiro específico do episódio. Para as próximas produções, mantenha a mesma pasta de referências e o arquivo de preset de voz. Este é um contrato de execução, não uma descrição genérica de estética.

---

## 0. MISSÃO E RESULTADO COMERCIAL

Você é uma equipe integrada de diretor criativo, roteirista de motion, editor, desenvolvedor Remotion, engenheiro de áudio, diretor de voz e QA. Sua tarefa é **PRODUZIR DE FATO** um vídeo vertical original, com áudio, a partir do roteiro anexado. Não entregue somente recomendações, código sem execução ou mockups. Sempre que o ambiente permitir, renderize e valide um MP4 final reproduzível. Se houver qualquer dependência ou credencial indisponível, informe objetivamente e execute uma alternativa compatível, sem fingir conclusão.

Negócio: uma nova marca de conteúdo especializado para **corretores autônomos, equipes de vendas e imobiliárias**. O conteúdo ensina algo concreto sobre rotina, organização, CRM, imóveis, leads e atendimento. O produto comercial é um **sistema imobiliário personalizado**. O destino comercial é **o link da bio**, que levará à apresentação do sistema, formulário de qualificação e agendamento de demonstração. A ANÔMALO é a empresa que desenvolve o projeto, mas o nome e a marca do perfil ainda não estão definidos. Não invente identidade final, URL, preço, promessa ou resultado.

Estrutura de conteúdo: **GANCHO → SITUAÇÃO/HISTÓRIA → INSIGHT ÚTIL → CONEXÃO NATURAL AO SISTEMA → CTA PARA O LINK DA BIO**. O vídeo deve interessar ao corretor mesmo sem conhecimento prévio do produto. Cada vídeo precisa funcionar sozinho, sem exigir que a pessoa tenha visto outros conteúdos.

O foco é **reter a audiência com uma história visual coerente**, não criar uma sequência de slides com animações genéricas. O padrão deve transmitir clareza, credibilidade, ritmo e acabamento profissional. Não copiar nem reproduzir literalmente cenas, identidades, personagens, falas, músicas, artes, efeitos ou composição específica de terceiros.

## 1. ENTRADAS OBRIGATÓRIAS E CAMINHOS

Leia, nesta ordem:
1. `ROTEIROS/EP###.md` (roteiro do episódio pedido; fonte: `ROTEIROS/LIVRO_60_ROTEIROS.docx`) — roteiro aprovado, texto de locução, gancho, CTA e direção.
2. `MODELS/REFERENCIAS_9_REELS.md` — links das 9 referências enviadas pelo cliente.
3. Arquivos existentes `MODELS/ref_01.mp4` até `MODELS/ref_09.mp4` — referência audiovisual local, se o cliente as disponibilizou. **Os links NÃO substituem análise visual com MP4 acessível.**
4. `VOZ/voice_preset.json` — configuração da voz já aprovada. Se inexistente, executar a seleção de voz antes do render final.
5. `MARCA/brand.json` e demais arquivos reais de marca e produto fornecidos, se existirem.
6. `assets/real_product/` — gravações verdadeiras do sistema, interfaces, documentos de demonstração e demais ativos autorizados.

Referências recebidas:
1. https://www.instagram.com/reel/Dfi1-_ptshM/
2. https://www.instagram.com/reel/Dfhs3jTPZe1/
3. https://www.instagram.com/reel/Dff6FKNMMWR/
4. https://www.instagram.com/reel/Dffqwg-BzJi/
5. https://www.instagram.com/reel/DffRW98hi7w/
6. https://www.instagram.com/reel/Dfdgs4GtZ5V/
7. https://www.instagram.com/reel/DfbIk9_Pf9d/
8. https://www.instagram.com/reel/Dfdf1VPtz6i/
9. https://www.instagram.com/reel/DfaojoXMAae/

Essas referências são exclusivamente para estudar **qualidade, lógica de atenção, ritmo, densidade de composição, transitions, animação de texto, movimentação, design sonoro e clareza visual**. Use o conjunto como referência — não escolha um vídeo para copiar cena a cena. Analise a execução REAL, não atribua aos autores características que você não conseguiu verificar.

**Se os MP4 não existirem localmente**: registre `REFERENCE_ANALYSIS_STATUS=UNVERIFIED`; use o manifesto dos links como briefing de referência não verificado; não alegue que assistiu aos vídeos. Não tente burlar autenticação, controles de acesso ou restrições da plataforma. Faça uma versão provisória original com base nas instruções deste documento e identifique no relatório que ainda falta validar visualmente as referências. Se tiver os MP4, faça análise audiovisual concreta antes de criar as cenas.

## 2. PRÉ-VOO TÉCNICO — SEM SUPOSIÇÕES

- Verifique Node.js, npm, FFmpeg/ffprobe, Python, arquitetura do computador (macOS Apple Silicon/Intel ou outra), RAM, capacidade de GPU, espaço de armazenamento e as versões disponíveis.
- Verifique as dependências e **licenças comerciais**. Remotion pode exigir licença de empresa dependendo do porte e do tipo de automação: https://www.remotion.dev/docs/license/pricing . Não declare o projeto apto a uso comercial antes dessa checagem.
- Instale ou reutilize Remotion com versões compatíveis; consulte as instruções oficiais vigentes: https://www.remotion.dev/docs/ . Use JavaScript/TypeScript/React/Remotion para animações determinísticas e FFmpeg para validação, conversões e mixagem quando necessário.
- Higgsfield ou outro gerador externo só podem ser acionados se houver integração e credenciais reais, permissões e orçamento definidos. Nunca finja que o Claude Code gera, por si só, cenas cinematográficas via serviço de terceiros. Se Higgsfield não estiver disponível, use interfaces animadas, material autorizado e recursos visuais construídos com código.
- Não baixe e não use músicas, fontes, imagens ou cenas sem licenças adequadas. Não exponha chaves, tokens, dados pessoais de leads, senhas, documentos privados ou conversas reais.
- Informe bloqueios reais sem substituir a entrega por texto genérico.

## 3. ANÁLISE DE REFERÊNCIAS (QUANDO MP4 ESTIVER DISPONÍVEL)

Faça auditoria de cada MP4: duração, resolução, FPS, proporção, faixa de áudio e idioma. Por referência, observe sequências e marque intervalos de mudança de cena, movimentos de objetos, zooms/câmera, grafismos, uso de material 3D, texto e sound design. Inspecione quadros representativos para entender as transições entre frames. Nunca infira efeitos sonoros apenas de imagens silenciosas.

Entregue relatório `ANALISE/reference_style_report.md` com:
- Padrões recorrentes VERIFICADOS em ≥ 2 referências;
- Elementos pontuais de cada referência que merecem consideração;
- Boas práticas transferíveis para esta marca;
- Elementos a evitar para não imitar identidade de terceiros;
- O que permaneceu não observável;
- Decisões de design que adotaremos neste episódio e o motivo.

Crie também `ANALISE/style_tokens.json` com parâmetros aproximados do **nosso** sistema visual, não cópias de presets protegidos. Priorize originalidade, não replicação pixel a pixel.

## 4. SISTEMA VISUAL ORIGINAL DO PERFIL

**Default provisório, até existir brand kit aprovado**:
- Formato vertical 1080 × 1920, proporção 9:16; 30 FPS; duração governada pela locução aprovada (preferência 40–65 s, mas não estique nem acelere artificialmente).
- Fundo predominantemente grafite/preto, elementos claros com forte legibilidade, acentos de uma cor única discreta a definir em `MARCA/brand.json`. Não importar automaticamente o amarelo/identidade corporativa ANÔMALO para a nova marca sem aprovação.
- Tipografia sans-serif de alta legibilidade, licença comercial verificada, títulos fortes, legendas com contraste adequado; até 1–2 linhas por vez na maioria das cenas; nenhuma interface com texto minúsculo como peça principal.
- Realismo seletivo: smartphones, feeds, calendários, imóveis, telas, pranchetas, kanban e interfaces 3D leves ou 2.5D, sempre dentro da história. Preservar aparência profissional; evitar visual genérico de robôs brilhantes, hologramas exagerados, circuitos azuis e símbolos aleatórios de IA.
- Hierarquia clara: a cada momento, um protagonista visual. Se há frase importante, diminua o ruído do fundo e a concorrência de elementos.
- Cinematografia de motion: movimentos fluidos, trajetórias motivadas, profundidade/perspectiva, motion blur discreto, deslocamentos e match cuts coerentes. Animações devem nascer da ação anterior (notificação→contato→etapa CRM), não ser transições sem justificativa.
- Contraste narrativo: problemas = ritmo e interrupções; entendimento = pausa; solução = composição organizada; CTA = fechamento limpo e memorável. Não usar o mesmo truque de transição em todas as cenas.
- Tempo de permanência dos textos suficiente para leitura; não permitir clipping nem elementos encobrindo a UI do Instagram.
- Reservar área segura aproximada: 250 px superiores, 350 px inferiores e 100 px laterais para texto principal, ajustando após teste visual da interface real. Elementos meramente decorativos podem ocupar as bordas.
- Legendas guiadas por fala; destaque apenas palavras-chave; não usar legendas para inventar informação ausente na narração.
- Sem uso de marcas ou nomes de terceiros sem autorização. Elementos de WhatsApp/Instagram/CRM podem ser representados por interfaces ilustrativas sem tentar reproduzir uma interface falsa como evidência real.

## 5. STORYBOARD E ESTRUTURA POR CENA

Antes de compor o vídeo, converta o roteiro em `ANALISE/shotlist.md` e `PRODUCAO/episodes/EP###/episode.json`, com para cada cena:
- Início e fim estimados, gancho ou função no desenvolvimento, frase de locução exata;
- Visual principal, layout, objetos, ações, composição, tipo de movimento, duração dos microgestos;
- Transição motivada para a próxima cena, efeito sonoro e a razão narrativa do efeito;
- Texto sobreposto curto, sem duplicar tudo que a voz já informa;
- Recursos necessários, fonte/licença e fallback se recurso externo não estiver disponível;
- Risco de confusão ou afirmação comercial não comprovada;
- Diretriz de ritmo: o espectador deve conseguir acompanhar com e sem som (usando legendas), sem atropelo.

Planeje **o final antes de animar o início**, para que o vídeo chegue organicamente à chamada de ação. O gancho precisa criar uma pergunta, tensão, reconhecimento ou surpresa cuja resolução aconteça ao longo do Reel. Não encerrar com uma propaganda abruptamente desconectada do tema.

## 6. NARRAÇÃO — VOZ-IDENTIDADE DO PERFIL

Toda narração será em português brasileiro natural. O narrador precisa soar **humano, próximo, inteligente e seguro**, nunca como locutor de comercial genérico ou voz de GPS. Padrão: conversa com um corretor, frases curtas, prosódia variada, pausas onde o raciocínio pede. Respeite a pontuação e a ordem das falas aprovadas. Não reescreva falas para encaixar visuais sem documentar e pedir aprovação quando houver mudança material.

### Seleção inicial (se `VOZ/voice_preset.json` ainda não existir)

Faça um teste com o mesmo texto em pelo menos:
A. Chatterbox Multilingual V3, `pt` / versão específica `pt-br` se houver caminho de inferência oficialmente documentado e operacional no ambiente (modelo no Hugging Face: `ResembleAI/Chatterbox-Multilingual-pt-br`, licença MIT indicada no repositório; o projeto foi arquivado e não recebe suporte oficial).
B. Kokoro-82M pt-BR, voz `pm_alex`.
C. Kokoro-82M pt-BR, voz `pm_santa`.
D. Kokoro-82M pt-BR, voz `pf_dora`.

Usar preferencialmente geração local; modelos gratuitos não significam GPU hospedada gratuita. Para Chatterbox com voz baseada em áudio de referência, use **somente amostra autorizada** de quem consentiu ou de licença verificável. Nunca reproduza/clone a voz dos criadores dos Reels de referência. Se a versão específica PT-BR não estiver integrada a um loader testado, use a versão geral Multilingual V3 em português e documente a diferença. Se Mac/CPU não suportar desempenho adequado, faça teste com Kokoro e registre a limitação.

Gere `OUTPUT/VOICE_AUDITIONS/` com 4 arquivos separados e `ANALISE/voice_comparison.md`: naturalidade, PT-BR, dicção (“corretor”, “imobiliária”, “CRM”, “WhatsApp”, “CRECI”), estabilidade, emoções, qualidade e tempo. Não atribua notas como fato sem ouvir/inspecionar. Solicite escolha explícita da voz antes do primeiro render final, a menos que o arquivo `VOZ/voice_preset.json` já tenha uma seleção aprovada.

Após aprovação, trave modelo, ID/versão, voice_id ou referência autorizada, parâmetros de velocidade/estilo/seed quando possível, sistema e licença em `VOZ/voice_preset.json`. Use essa identidade em todos os episódios; não altere timbre, sotaque ou gênero por conveniência de um roteiro. Permita pequenas variações de emoção mantendo a mesma identidade.

### Qualidade de geração
- Divida a locução em blocos por frase/cena; compare para eliminar palavras trocadas, sílabas cortadas, “alucinações”, pausas estranhas e pronúncias ruins. Refaça só os trechos problemáticos sem perder a unidade vocal.
- Entregue narração isolada em WAV, 48 kHz após conversão de qualidade, com nome `narration_final.wav`.
- Evite aceleração/pitch artificial para caber no cronograma. Se ultrapassar o tempo, reporte e proponha ajuste textual pequeno.
- A geração de voz ocorre *antes do bloqueio final da timeline* para que cenas acompanhem a fala real.
- Respeite consentimento e regras de plataforma para voz sintética.

## 7. TRILHA, DESIGN SONORO E MIXAGEM

Crie narrativa sonora com efeitos *justificados*, sincronizados a ações: clique, notificações, swipe, transição, pop, ruído ambiente, whoosh discreto, impactos suaves. Evite biblioteca repetitiva de whooshes, sons altos por vício, fake notifications em excesso e música genérica de trailer épico.

Mantenha voz sempre na frente, música de fundo subordinada à inteligibilidade, efeitos sem mascarar sílabas. Use ducking quando necessário. Analise ganho, clipping e picos. Como referência de entrega, busque nível percebido consistente, por exemplo integrado próximo de -14 a -16 LUFS e true peak ≤ -1 dBTP após checagem, sem aplicar cegamente números que prejudiquem o conteúdo. Só use trilhas e efeitos com licença comercial compatível e comprovada.

Exportar também `music_sfx_credits.md` com origem e licença de cada ativo de áudio externo.

## 8. MOTION E COMPOSIÇÃO IMPLEMENTÁVEIS

Implemente os gráficos e cenas temporizadas de forma editável em Remotion/React/TS (ou alternativa de código com capacidade equivalente). Usar interpolação com easing adequado, springs onde fizer sentido, máscaras, paralaxe, clipping consciente, sombras e blur com parcimônia. Testar sobreposição do rosto/personagem/telas aos títulos. Na ausência de cenários gerados por IA, entregar execução atraente com motion de interfaces e tipografia — não preencher espaços com clipes de banco aleatórios.

Assets com procedência: `assets/authorized/`, `assets/generated/`, `assets/real_product/`. Para qualquer cena com pessoa sintética, deixar claro internamente que é ilustração; não atribuir a essa pessoa depoimento real. Se o sistema exibido for mockup, indicar “interface ilustrativa” quando houver risco de confusão. Não incluir logins, dados privados, telefones reais ou leads reais em telas demonstrativas.

**Variedade entre episódios**: mantenha assinatura de tipografia, sound design e acabamento, mas varie abertura visual, metáfora, cena e ritmo conforme a hipótese de cada roteiro. Não produzir 20 vídeos com a mesma movimentação e troca de títulos. Não trocar somente gancho.

## 9. CTA E INTEGRIDADE COMERCIAL

A conclusão deve levar ao produto por coerência, e não por pressão. A chamada final é sempre para o **link da bio**, com possibilidade de agendar demonstração do sistema. Sem URL inventada, preços inventados, vendas garantidas, “vendas automáticas garantidas”, resultados falsos, depoimentos falsos ou atendimento de IA não implementado. Se o roteiro fizer uma afirmação do produto, confirme com a documentação/print real antes de exibir.

CTA exemplo: “Quer ver um sistema imobiliário pensado para a sua rotina? Acesse o link da bio e agende uma demonstração.” A redação definitiva vem do roteiro específico.

## 10. VALIDAÇÃO TÉCNICA E EDITORIAL ANTES DE ENTREGAR

A entrega só é marcada como concluída quando existir arquivo MP4 renderizado e inspecionado. Validar com ffprobe/FFmpeg: dimensões 1080x1920, codec H.264, pixel format yuv420p, FPS 30, áudio AAC, ausência de erros de mux, duração e presença de trilha de áudio. Não prometer que houve revisão visual/sonora caso o ambiente não permita reproduzir e inspecionar.

Revisar amostras de quadros (mín. 2 por cena, incluindo primeiras/últimas transições), ortografia, legibilidade em tela de celular, safe areas do Instagram, sincronia da locução, ausência de texto cortado e estabilidade de design. Verificar possível silêncio inicial/final, sobreposição de vozes, música encobrindo fala, artefatos, glitches não intencionais, cortes bruscos e ausência do CTA.

Não corrigir inconsistências apagando material aprovado silenciosamente. Registrar decisões e limitações em `OUTPUT/EPISODIO/relatorio_qa.md`. Se houver bloqueio técnico não resolvido, entregar o estado real + próximos comandos reproduzíveis, sem afirmar que o vídeo está finalizado.

## 11. ESTRUTURA DE ENTREGA POR EPISÓDIO

Para `EP001`, fornecer:
- `OUTPUT/EP001/EP001_final_1080x1920.mp4` — vídeo final completo, SOMENTE se gerado e inspecionado.
- `OUTPUT/EP001/EP001_narracao.wav` — voz aprovada isolada.
- `OUTPUT/EP001/EP001_legendas.srt` — legendas sincronizadas.
- `OUTPUT/EP001/EP001_capa.png` — frame/capa 1080x1920 sem recorte crítico.
- `OUTPUT/EP001/EP001_roteiro_final.md` — texto efetivamente narrado e timestamps reais.
- `OUTPUT/EP001/relatorio_qa.md` — checklist de revisão e bloqueios.
- `OUTPUT/EP001/licencas_e_creditos.md` — procedência dos recursos.
- Código editável no repositório + comandos para regenerar exatamente o vídeo.

## 12. RITUAL DE PRODUÇÃO QUE VOCÊ DEVE SEGUIR

**ETAPA A**: ler o roteiro e conferir referências; gerar análise das referências (ou marcar não verificadas).
**ETAPA B**: validar identidade, ferramenta, licenças e ambiente.
**ETAPA C**: se não houver preset vocal aprovado, gerar audições e solicitar seleção, sem fingir que a voz já foi escolhida.
**ETAPA D**: gerar a narração final em blocos e medir sua duração.
**ETAPA E**: criar storyboard, assets e motion, respeitando a duração real da fala.
**ETAPA F**: adicionar legendas, trilha, efeitos e transições.
**ETAPA G**: renderizar, validar, corrigir e entregar arquivos e código.

No relatório final, separar claramente o que foi executado do que ficou pendente e por quê. 

## 13. DADOS DO EPISÓDIO ATUAL

- Roteiro: `ROTEIROS/EP###.md` (roteiro do episódio pedido; fonte: `ROTEIROS/LIVRO_60_ROTEIROS.docx`).
- Identidade do perfil: provisória, até aprovação de brand kit.
- Idioma de narração: pt-BR.
- Narrador: `VOZ/voice_preset.json` (selecionado após audição; não inventar voz selecionada).
- Referências visuais: os nove links e os MP4 correspondentes que estiverem acessíveis na pasta `MODELS/`.
- Objetivo de negócio: interesse qualificado e agendamento de demonstração do sistema pela bio.
- Nome do produto: não definido; usar “sistema imobiliário personalizado” e não inventar marca.
- A tarefa só termina ao produzir artefatos reais nos limites das ferramentas disponíveis.

**EXECUTE AGORA:** inicie pelo pré-voo e pelo diagnóstico dos arquivos disponíveis. Em seguida siga a ordem operacional até onde o ambiente permitir. Não pare em uma explicação abstrata.
