/**
 * Sistema visual da ATIVO | Inteligência Imobiliária.
 * NÍVEL 1 (obrigatório para TODO modelo/kit/vídeo): MARCA/sistema-visual/README.md + tokens.json → exportado aqui como `DS`.
 * Vídeo novo: acento = ACENTO (#02FB3F, verde da seta do logo oficial) e atmosferas = ATMOSFERA. Nunca escreva cor de
 * identidade à mão num kit: importe daqui. Mudança de valor só em tokens.json, pela governança do README (seção 10).
 * Logo oficial: PRODUCAO/public/brand/ativo_logo.png (fundo transparente) · original em MARCA/logo/.
 */
import DS_JSON from "../../MARCA/sistema-visual/tokens.json";

/** Tokens do Sistema Visual ATIVO (Nível 1), lidos de MARCA/sistema-visual/tokens.json. */
export const DS = DS_JSON;

/** LEGADO (#3AF584): só episódios entregues até 16/11/2026. Em vídeo novo use ACENTO. `BRAND.logo` continua sendo o logo oficial. */
export const BRAND = {
  hex: "#3AF584",
  rgb: [58, 245, 132] as const,
  /** texto escuro sobre o verde (botões, chips preenchidos) */
  ink: "#092614",
  /** tinta escura do verde para fundos de selo/balão */
  deep: "#0E3A1F",
  logo: "brand/ativo_logo.png",
};
export const brandAlpha = (a: number) => `rgba(${BRAND.rgb[0]},${BRAND.rgb[1]},${BRAND.rgb[2]},${a})`;

/** Paleta de acento por lote. Episódios anteriores seguem com BRAND (#3AF584) e não são alterados. */
export type Accent = { hex: string; rgb: readonly [number, number, number]; ink: string; deep: string };
export const ACCENT_V1: Accent = { hex: BRAND.hex, rgb: BRAND.rgb, ink: BRAND.ink, deep: BRAND.deep };
const rgb3 = (a: number[]) => [a[0], a[1], a[2]] as const;
/** Verde ATIVO (Nível 1): acento único de todo vídeo novo desde 17/11/2026. Derivados: ink (texto sobre o verde) e deep (fundo). */
export const ACCENT_NOV26: Accent = { hex: DS.cor.acento.hex, rgb: rgb3(DS.cor.acento.rgb), ink: DS.cor.acento.ink, deep: DS.cor.acento.deep };
/** Nome canônico para kits novos (mesmo objeto de ACCENT_NOV26, mantido por compatibilidade). */
export const ACENTO = ACCENT_NOV26;
export const accentAlpha = (acc: Accent, a: number) => `rgba(${acc.rgb[0]},${acc.rgb[1]},${acc.rgb[2]},${a})`;
export const acentoAlpha = (a: number) => accentAlpha(ACENTO, a);

/** Atmosferas semânticas do Nível 1 (cor do clima de cada cena). Cada modelo as desenha à sua maneira. */
export type AtmosferaNome = "neutra" | "explicacao" | "dilema" | "dados" | "memoria" | "tensao" | "solucao";
export type AtmosferaDef = { centro: string; borda: string; luz: readonly [number, number, number] };
const atm = (k: AtmosferaNome): AtmosferaDef => ({ centro: DS.atmosfera[k].centro, borda: DS.atmosfera[k].borda, luz: rgb3(DS.atmosfera[k].luz) });
export const ATMOSFERA: Record<AtmosferaNome, AtmosferaDef> = {
  neutra: atm("neutra"), explicacao: atm("explicacao"), dilema: atm("dilema"), dados: atm("dados"), memoria: atm("memoria"), tensao: atm("tensao"), solucao: atm("solucao"),
};
/** Luz de uma atmosfera com opacidade (raios, halos, grades). */
export const luzAtm = (k: AtmosferaNome, a: number) => { const l = ATMOSFERA[k].luz; return `rgba(${l[0]},${l[1]},${l[2]},${a})`; };

export const C = {
  bg0: DS.cor.fundo.base,
  bg1: DS.cor.fundo.grafite,
  surface: DS.cor.fundo.superficie,
  surface2: DS.cor.fundo.superficie2,
  surface3: DS.cor.fundo.superficie3,
  line: "rgba(255,255,255,0.10)",
  lineSoft: "rgba(255,255,255,0.06)",
  text: DS.cor.texto.branco,
  muted: DS.cor.texto.secundario,
  dim: DS.cor.texto.terciario,
  accent: BRAND.hex,
  accentInk: BRAND.ink,
  warn: DS.cor.alerta.hex,
  cold: "#8FB4E3",
  coldDeep: "#17212D",
  paper: "#F2F0EA",
  ink: "#14161A",
  inkMuted: "#676C75",
};

export const F = {
  sans: "Manrope, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const VIDEO = { width: DS.tela.largura, height: DS.tela.altura, fps: DS.tela.fps };

/** Área segura para a interface do Instagram Reels (Nível 1). `acoes` = coluna de botões do Reels: nenhum texto ali. */
export const SAFE = { top: DS.tela.seguro.topo, bottom: DS.tela.seguro.base, side: DS.tela.seguro.lateral, acoes: DS.tela.acoesInstagram };
