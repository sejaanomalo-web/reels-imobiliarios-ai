/**
 * Mapa ÚNICO das capturas reais usadas nos Stories "Na prática" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md).
 * Regras: só usar a captura depois de (1) higienizada — sem nomes de leads, telefones, e-mails, métricas internas ou marcas
 * sem autorização — e (2) com autorização comercial do corretor para nome/marca. Enquanto `authorized` for false, os Stories
 * renderizam um quadro "CAPTURA PENDENTE" e o nome do projeto anonimizado; nada disso é publicável.
 * Os seis screenshots originais equivalem a QUATRO imagens únicas: não anunciar "seis projetos".
 */
export type CaseAsset = {
  key: "bruno_painel" | "bruno_site" | "ivone_painel" | "antonio_site";
  /** caminho em PRODUCAO/public (só a cópia higienizada) */
  file: string;
  project: "A" | "B" | "C";
  /** nome real — exibido SOMENTE se authorized */
  person: string;
  kind: "painel" | "site";
  authorized: boolean;
  sanitized: boolean;
};

export const CASES: CaseAsset[] = [
  { key: "bruno_painel", file: "cases/ativo/bruno_painel.webp", project: "A", person: "Bruno Souza", kind: "painel", authorized: false, sanitized: false },
  { key: "bruno_site", file: "cases/ativo/bruno_site.webp", project: "A", person: "Bruno Souza", kind: "site", authorized: false, sanitized: false },
  { key: "ivone_painel", file: "cases/ativo/ivone_painel.webp", project: "B", person: "Ivone Peris", kind: "painel", authorized: false, sanitized: false },
  { key: "antonio_site", file: "cases/ativo/antonio_site.webp", project: "C", person: "Antônio Carlos", kind: "site", authorized: false, sanitized: false },
];

export const caseOf = (k: CaseAsset["key"]) => CASES.find((c) => c.key === k)!;
/** pode aparecer em material publicável? */
export const publishable = (c: CaseAsset) => c.authorized && c.sanitized;
/** rótulo seguro para tela */
export const caseLabel = (c: CaseAsset) => (publishable(c) ? c.person : `Projeto ${c.project}`);
