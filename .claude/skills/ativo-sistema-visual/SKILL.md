---
name: ativo-sistema-visual
description: SISTEMA VISUAL ATIVO (Nível 1, identidade global obrigatória de todos os vídeos da ATIVO). Use SEMPRE que for criar, modificar, auditar ou revisar uma skill, modelo, formato, kit ou estilo de vídeo da ATIVO (inclusive o 3º, 4º ou qualquer modelo novo); quando for definir a direção visual, a paleta, a tipografia, a ilustração, a composição ou a animação de um vídeo da ATIVO; quando um pedido envolver "identidade visual", "design system", "padronizar", "deixar com cara de ATIVO", "novo modelo de vídeo" ou "nova skill de vídeo". Garante a herança do Nível 1, o registro do modelo e a validação automática antes de concluir.
---

# Sistema Visual ATIVO — como aplicar (skill do Nível 1)

As regras ficam em **`MARCA/sistema-visual/README.md`** e os valores em **`tokens.json`**. Esta skill não repete as regras: ela diz **o que fazer**. Leia o README inteiro antes de decidir qualquer coisa visual.

## Hierarquia (nunca inverter)
1. **Nível 1 — identidade global ATIVO:** `MARCA/sistema-visual/`. Obrigatório para todos.
2. **Nível 2 — identidade do modelo:** a skill do modelo + o kit + `modelos.json`.
3. **Nível 3 — direção do vídeo:** o episódio.

Nível inferior nunca contraria o superior. As regras globais não engessam narrativa, metáfora, personagens, montagem nem efeitos de cada modelo.

## Qual roteiro seguir

**Plano visível:** criar ou alterar um modelo segue as 8 etapas do modelo B de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, criadas no painel "Plano" antes de começar.

| Situação | Faça |
|---|---|
| **Produzir um vídeo** num modelo existente | Leia a skill do modelo (ela começa pela "Herança"). Use só o kit do modelo e os tokens de `PRODUCAO/src/theme.ts` (`DS`, `ACENTO`/`A`, `ATMOSFERA`, `C`, `F`). O `editorial_check.py` já roda o validador no episódio e bloqueia o render se houver erro. Antes do render final, `python3 tools/sistema_visual_check.py --quadros <pasta_da_folha>` e a revisão visual do README §8 |
| **Criar um modelo ou skill novos** (3º, 4º, …) | Siga `MARCA/sistema-visual/NOVO_MODELO.md` (7 passos + esqueleto da seção "Herança"). Registre em `modelos.json` e `MODELOS_DE_VIDEO.md`. Pronto só com o validador sem erros e a revisão visual |
| **Alterar uma skill ou kit existentes** | Preserve o Nível 2 do modelo (veja `nivel2` em `modelos.json`). Rode `python3 tools/sistema_visual_check.py --modelo <id>`, renderize uma folha de quadros antes × depois e confira as 7 assinaturas |
| **Alguém pede para mudar uma regra global** (cor, fonte, mínimos, grade) | Não edite direto. Siga a governança do README §10: proposta, impacto em todos os modelos, folha antes × depois, aprovação do cliente, nova versão no `tokens.json` e no `CHANGELOG.md` |
| **Roteiro (Skill Mestre)** | As sugestões visuais respeitam as assinaturas e as atmosferas. O estilo final continua sendo decidido na produção |

## Regras que mais quebram (lembrete rápido; detalhes no README)
- Único verde: `ACENTO` `#02FB3F` (+ `ink`/`deep`). `#3AF584` é legado.
- Fundos: só preto, grafite, marinho e as atmosferas. Nada de roxo, ciano, neon ou dourado de acento. Nada de tela inteira verde ou clara.
- Manrope (JetBrains Mono só para dado). Mínimo de 24 px e de 30 px para frase. Contorno ou sombra em todo texto.
- Nenhum texto em y < 250, y > 1570 nem na coluna de botões (x ≥ 950, y 1150–1760).
- Toda reação visual cai na palavra (0–3 quadros antes). Nenhuma animação sem função.
- Fecho com o campo que digita SISTEMA e o logo oficial. Selos de integridade quando couber.

## Comandos
```bash
cd PRODUCAO
python3 tools/sistema_visual_check.py                       # sistema inteiro (tokens, theme, registro, skills, kits, CLAUDE.md)
python3 tools/sistema_visual_check.py --modelo <id>          # um modelo
python3 tools/sistema_visual_check.py --episodio <EP>        # um episódio (o editorial_check já chama)
python3 tools/sistema_visual_check.py --quadros <pasta>      # luminância dos quadros da folha de QA
```

O mostruário renderizado (tokens, atmosferas, certo × errado e comparação dos modelos) fica em `MARCA/sistema-visual/exemplos/`. Ele é gerado pelas composições `ATIVO-SISTEMA-VISUAL-*` (`PRODUCAO/src/sistema-visual/Mostruario.tsx`). Regere sempre que os tokens mudarem.

**Nunca declare um modelo, skill ou vídeo "pronto" sem:** validador com 0 erro **e** a revisão visual da folha de quadros registrada. O validador só cobre o que é objetivo. Direção de arte se confere olhando.
