# QA — ATIVO Caso Real 03 · "Mônica Poplawski: o preparo vem antes do alto padrão" (16/11/2026)

**Fonte:** `ROTEIROS/ATIVO_CASE03.md` (ATIVO_Reel_03_MONICA_POPLAWSKI_PREPARO.md). ID `EP-ATIVO-CASE03`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## ⚠️ Correção factual (precisa de aprovação)
- Roteiro: "trabalhando com aluguéis de **oitocentos** reais".
- **Narrado: "aluguéis de novecentos reais"**, porque a fonte diz R$ 900: "Eu comecei fazendo uma locação pequenininha, de R$ 900" ([InfoMoney](https://www.infomoney.com.br/business/bem-vindos-ao-luxo-quem-e-monica-poplawski-a-corretora-das-mansoes-de-alphaville/)). Não achei fonte para R$ 800.
- Se preferir não citar valor ("aluguéis pequenos"), regravo só essa frase e emendo, conferindo o tom.

## CTA (regra de 14/11/2026)
- No roteiro: "Salva este vídeo e escolhe um imóvel da sua carteira para estudar com mais profundidade hoje."
- "Salva este vídeo e" saiu.
- **"Escolhe um imóvel da sua carteira para estudar com mais profundidade hoje."** ficou como transição: é a lição prática e leva naturalmente a "organizar seus imóveis". Segue a CTA SISTEMA → Direct.
- Precisa da aprovação do cliente (é um corte, não uma frase nova).

## Caso real: o que foi conferido (16/11/2026)
- **Confirmado:**
  - Começou no setor **aos 50 anos** e fez o encerramento do 100º Encontro da ABMI (mar/2026) como referência em alto padrão. Fonte: [ABMI](https://abmi.org.br/100o-encontro-da-abmi-traz-ao-palco-uma-das-vozes-mais-influentes-do-alto-padrao/).
  - Experiência diante das câmeras (ex-assistente de palco na TV). Fonte: [Caras](https://caras.com.br/casa-dos-famosos/aos-52-anos-ex-assistente-de-palco-virou-corretora-de-mansoes-de-ate-r-110-milhoes.phtml).
  - Começou com locações pequenas e migrou para o alto padrão. Fonte: [InfoMoney](https://www.infomoney.com.br/business/bem-vindos-ao-luxo-quem-e-monica-poplawski-a-corretora-das-mansoes-de-alphaville/).
- **"A evolução foi gradual":** é interpretação razoável das falas dela no InfoMoney. Não achei a frase literal.
- Cifras de vendas e de imóveis (R$ milhões) **fora do vídeo**, como pede o roteiro.
- **Nenhuma imagem, vídeo, perfil ou logo da corretora ou da empresa.**
  - Imóveis, trajetória e carteira são ilustrações rotuladas: IMAGENS ILUSTRATIVAS, TRAJETÓRIA ILUSTRATIVA e EXEMPLO ILUSTRATIVO.
  - Ficha "CASO REAL · FONTES: ABMI · INFOMONEY".
  - Preço do alto padrão mascarado (`R$ ••••••`).

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, conta 2. **2 gerações** (A 66,6 s · B 62,7 s).
- **Tomada B, sem edição:** 168 palavras/min. Diz "Escolhe" e "Comenta SISTEMA" (coloquial aceito).
- **Por que a B:** pronuncia o nome mais perto do correto ("Poplowski"; a A diz "Poplatki"). As duas dizem "aos 50 anos". O "há uns 50 anos" da A era erro do reconhecedor, não da voz.
- **Pontos para ouvir:**
  - 0:11 o nome "Poplawski" (nenhum reconhecedor acerta nome próprio; a B é a mais próxima).
  - 0:39 "com **um** imóvel que deseja vender" (roteiro: "o imóvel"). As duas tomadas falam assim; o sentido não muda.
  - 0:51 "Escolhe **um** imóvel": um reconhecedor ouve "o".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 65,05 s · −14,97 LUFS · TP −1,60 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,949. Diferenças:
  - números por extenso viram dígitos;
  - nome próprio;
  - "um" × "o" (está na voz);
  - "a população" na borda da janela de 20 s, aos 30 s — com a janela normal sai "circulação".
- Movimento **1,49** (1ª medição: 1,22) · maior trecho parado 0,7 s.
- 53 quadros revistos. Corrigidos:
  - quadro 0 quase vazio;
  - ficha da corretora sozinha por ~5 s (agora a escada tracejada entra junto);
  - rótulos da escada cobertos pelos degraus (agora há um rótulo único, legível);
  - cartões de estudo sobrepostos;
  - título "DOMÍNIO DO IMÓVEL" sobre os cartões;
  - lado direito vazio e título sobre as imagens na lição;
  - cortes de borda pela câmera;
  - rótulo fora da margem lateral.

## Cenas
1. **Gancho:** linha do tempo em película desde o quadro 0: 50 ANOS · INÍCIO + LOCAÇÕES PEQUENAS → o trilho corre até HOJE · ALTO PADRÃO → preço riscado → O QUE MUDOU PRIMEIRO?
2. **Take 01:** ficha CASO REAL + "Experiência diante das câmeras"; escada de degraus pequenos subida aos poucos (LOCAÇÕES PEQUENAS → PASSO A PASSO → REPERTÓRIO → SEGURANÇA → PÚBLICOS E IMÓVEIS DIFERENTES) + NÃO FOI DO DIA PARA A NOITE.
3. **Take 02:** porta fechada com APRESENTAÇÃO BONITA ✕ → cartões de estudo surgem antes de a porta abrir (MATERIAIS, CIRCULAÇÃO, ARQUITETURA, CONTEXTO, PERGUNTAS DO COMPRADOR) → a porta abre: DOMÍNIO DO IMÓVEL.
4. **Take 03 + transição:** VOCÊ HOJE → DAQUI A ALGUNS ANOS (casa tracejada); ESTUDAR → ENTENDER → APRESENTAR; O POSICIONAMENTO É CONSTRUÍDO; SÓ O QUE SE SUSTENTA COM INFORMAÇÃO; SUA CARTEIRA → um imóvel EM ESTUDO · HOJE.
5. **CTA SISTEMA** (a lista IMÓVEL EM ESTUDO vira o módulo IMÓVEIS) + logo.

## Pendências
- Aprovar o valor (R$ 900 no lugar de R$ 800).
- Aprovar a transição.
- Ouvir 0:11, 0:39 e 0:51.
- Duração 65,0 s, dentro dos 65–75 s do roteiro.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-CASE03 --source episodes/EP-ATIVO-CASE03/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-CASE03 && bash tools/render_episode.sh EP-ATIVO-CASE03
```
