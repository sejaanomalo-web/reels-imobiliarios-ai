# Como criar um novo modelo de vídeo da ATIVO (3º, 4º, 5º, …)

Este é o processo **obrigatório** sempre que surgir um modelo, formato ou skill de produção de vídeo novo. A skill `ativo-sistema-visual` aciona este roteiro automaticamente, e o validador reprova o modelo que pular um passo.

> **Princípio:** modelo novo = narrativa, montagem e linguagem próprias **dentro** do universo ATIVO. Ele herda o Nível 1 inteiro e só acrescenta o seu Nível 2. Não invente o modelo antes de o cliente trazer referências ou pedir.

## Os 7 passos

1. **Identificar.** O pedido é um vídeo da ATIVO (Reels, TikTok ou Shorts do perfil)? Então este processo vale, mesmo que a referência venha de outra marca.
2. **Localizar a identidade.** Ler `MARCA/sistema-visual/README.md` inteiro e `tokens.json`. Conferir `modelos.json` para ver o que já existe e evitar criar um modelo que repita outro.
3. **Consultar antes de desenhar.** Analisar as referências do cliente (MP4 real, quadro a quadro, como nas skills 1 e 2) e separar:
   - o que é **gramática** (ritmo, câmera, tipo de transição), que pode ser adotado;
   - o que é **identidade alheia** (cores, personagens, frases-ritual, logos), que é proibido copiar.
4. **Herdar o obrigatório:**
   - acento `ACENTO`, atmosferas, texto, contorno e alerta de `DS` (via `PRODUCAO/src/theme.ts`);
   - Manrope e JetBrains Mono, escala e mínimos;
   - grade e área segura, incluindo a coluna de botões do Reels;
   - grão e vinheta;
   - ancoragem na palavra;
   - as **7 assinaturas** (inclusive o fecho que digita SISTEMA e o logo oficial).

   Nada disso é redefinido no modelo.
5. **Desenvolver o particular (Nível 2):**
   - família de ilustração, existente ou proposta nova (seção 10 do README);
   - montagem e cadência;
   - transições;
   - legenda: posição, tamanho e caixa dentro da escala;
   - movimento característico;
   - zonas da tela;
   - fecho no desenho do modelo.

   Kit novo em `PRODUCAO/src/estilos/<modelo>.tsx`, importando os tokens de `../theme`.
6. **Garantir compatibilidade.**
   - Fazer uma folha comparativa com quadros do novo piloto ao lado dos pilotos dos modelos existentes (`exemplos/`).
   - Com o logo coberto, os três precisam parecer do mesmo perfil.
   - Se algo do modelo novo exigir mudar o Nível 1, abrir uma proposta de governança (README §10). O modelo não pode alterar o sistema em silêncio.
7. **Validar antes de concluir.** O modelo só está pronto quando cumpre os quatro itens:
   1. está registrado em `modelos.json` (status `ativo`, skill, kits, prefixos, formato, `nivel2`, `componentesObrigatorios`, `excecoesCor` com motivo);
   2. está listado em `MODELOS_DE_VIDEO.md`;
   3. `python3 PRODUCAO/tools/sistema_visual_check.py` roda sem erros;
   4. o piloto renderizado passa no `editorial_check` e na revisão visual do README §8 (folha de quadros + `--quadros`).

## Esqueleto obrigatório da skill do modelo

Toda skill de modelo começa assim (o validador procura o título exato da seção):

```markdown
---
name: <n>-modelo-<nome-curto>
description: <N>º MODELO de vídeo da ATIVO — "<Nome>": <o que é, em uma frase>. Use sempre que o pedido for produzir, adaptar, decupar, revisar ou renderizar um vídeo "<gatilhos>". Herda o Sistema Visual ATIVO (MARCA/sistema-visual).
---

# <N>º modelo — <Nome>

*ATIVO · modelo de vídeo nº <N>. Registro: `MODELOS_DE_VIDEO.md` e `MARCA/sistema-visual/modelos.json` (id `<id>`).*

## Herança do Sistema Visual ATIVO

**Antes de produzir, leia `MARCA/sistema-visual/README.md` (Nível 1).** Ele vale acima desta skill: em conflito, o Nível 1 vence.

- **Herdado (Nível 1, sem redefinir aqui):** acento `ACENTO`, atmosferas `ATMOSFERA`, `DS` (texto, contorno, alerta), Manrope e JetBrains Mono, escala e mínimos, área segura e coluna de botões, grão e vinheta, easing e ancoragem na palavra, as 7 assinaturas, qualidade e governança.
- **Particular deste modelo (Nível 2, preservar):** <família de ilustração · montagem · transições · legenda (y, px, caixa) · movimento · fecho>.
- **Direção de cada vídeo (Nível 3):** <o que cada roteiro decide>.
- **Validação:** `python3 tools/sistema_visual_check.py --modelo <id>` + revisão visual (README §8).

## 0. Quando usar / o que entrega
…
```

Depois da herança, a skill segue o mesmo esqueleto das skills 1 e 2:
- quando usar;
- regras;
- pipeline;
- grade;
- roteiro;
- decupagem;
- bíblia visual;
- personagens;
- objetos;
- animações;
- câmera e transições;
- legenda e fecho;
- som;
- QA;
- esqueleto de código;
- anti-padrões;
- kit.

## O que um modelo novo NÃO pode fazer

- Escolher outro verde, outra fonte ou uma paleta principal própria.
- Clarear o universo: fundo claro, pastel ou colorido por inteiro.
- Tirar a legenda falada, o fecho SISTEMA com o logo oficial ou os selos de integridade.
- Editar `MARCA/sistema-visual/` para caber no modelo. Isso só acontece pela governança, com aprovação do cliente.
- Ser marcado como pronto sem o validador e a revisão visual.
