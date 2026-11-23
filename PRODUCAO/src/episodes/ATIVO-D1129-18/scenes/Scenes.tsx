import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps, Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Carimbo, Comodo, Contorno, Cota, CotaV, Elevacao, LINHA, Porta, Prancha, Rota, SeloPlanta, TituloFolha, TRACO,
  clamp01, ease, mergulho, mix, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-D1129-18 — "A casa que chegou de trem" (grade 29/11/2026 · 18h · HISTÓRIA QUE ENSINA · Planta técnica v2).
 * Folhas: porta fechada (+70 mil · 0 visitas) → página de catálogo (camisa · casa · martelo, 1908) → rota do trem e vista
 * explodida das peças → a pergunta ("?", a elevação para no meio) → a página que respondia antes (fachada, planta com
 * medidas que acendem, kit) → o bairro de modelos (1908–1940, casas de pé) → o anúncio de hoje, completo → fecho.
 * Apuração: "mais de 70 mil" (estimativas de 70 a 100 mil, HUD USER), 1908–1940, até 30 mil peças; desenhos ORIGINAIS,
 * medidas e campos ILUSTRATIVOS; nada copiado de página real do catálogo.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;

/** Hora de uma palavra falada (fallback = fb). */
const palavra = (tl: Timeline, seg: string, re: RegExp, fb: number) => {
  for (const k of tl.captions) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
  return fb;
};

/** Traço que se desenha (pathLength 1). */
const Tr: React.FC<{ d: string; p: number; cor?: string; w?: number; fill?: string }> = ({ d, p, cor = LINHA, w = TRACO, fill = "none" }) => (
  <path d={d} fill={fill} stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(p)} opacity={p > 0.001 ? 1 : 0} />
);

/** Casa em elevação (corpo + telhado + porta + 2 janelas), centrada em cx, chão em base. `luz` acende as janelas. */
export const CasaElev: React.FC<{ cx: number; base: number; w: number; h: number; p: number; luz?: number; cor?: string }> = ({ cx, base, w, h, p, luz = 0, cor = LINHA }) => {
  const x0 = cx - w / 2, x1 = cx + w / 2, top = base - h, apice = top - h * 0.62;
  const jw = w * 0.2, jh = h * 0.28;
  return (
    <g>
      <Tr d={`M ${x0} ${base} L ${x0} ${top} L ${x1} ${top} L ${x1} ${base} Z`} p={p} cor={cor} />
      <Tr d={`M ${x0 - w * 0.08} ${top} L ${cx} ${apice} L ${x1 + w * 0.08} ${top}`} p={(p - 0.25) / 0.75} cor={cor} />
      <Tr d={`M ${cx - w * 0.1} ${base} L ${cx - w * 0.1} ${base - h * 0.5} L ${cx + w * 0.1} ${base - h * 0.5} L ${cx + w * 0.1} ${base}`} p={(p - 0.5) / 0.5} cor={cor} />
      {[x0 + w * 0.1, x1 - w * 0.1 - jw].map((jx) => (
        <rect key={jx} x={jx} y={top + h * 0.2} width={jw} height={jh} fill={luz > 0.01 ? `rgba(${A.rgb[0]},${A.rgb[1]},${A.rgb[2]},${0.75 * clamp01(luz)})` : "none"} stroke={luz > 0.5 ? A.hex : cor} strokeWidth={TRACO * 0.67} opacity={fade((p - 0.6) / 0.4)} />
      ))}
    </g>
  );
};

/* ---------------------------------------------------------------- 1 · gancho: a porta fechada ---------------------------------------------------------------- */
const PORTA = { x: 420, y: 170, w: 260, h: 540 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.x_eua - 0.45, 0.5, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, PORTA, TELA);
  const { x, y, w, h } = PORTA;
  const pessoa = prog(t, c.h_familias - 0.3, 0.7, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.02 }, { t: c.h_nunca, s: 1.05, y: -8, e: ease.out }, { t: c.x_eua, s: 1.06, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            {/* a porta, de frente: batente, folha e maçaneta */}
            <Tr d={`M ${x} ${y + h} L ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h}`} p={prog(t, -0.1, 1.0, ease.out)} />
            <g opacity={m.outros}>
              <Tr d={`M ${x + 22} ${y + h} L ${x + 22} ${y + 22} L ${x + w - 22} ${y + 22} L ${x + w - 22} ${y + h}`} p={prog(t, 0.35, 0.9, ease.out)} />
              <circle cx={x + w - 56} cy={y + h * 0.55} r={11} fill="none" stroke={LINHA} strokeWidth={TRACO} opacity={fade(prog(t, 1.0, 0.4))} />
              <line x1={x - 120} y1={y + h} x2={x + w + 120} y2={y + h} stroke={LINHA} strokeWidth={TRACO} opacity={fade(prog(t, 0.2, 0.5))} />
              {/* a família (em linha), do lado de fora */}
              <g opacity={fade(pessoa)}>
                <circle cx={220} cy={y + h - 190} r={24} fill="none" stroke={LINHA} strokeWidth={TRACO} />
                <Tr d={`M 220 ${y + h - 164} L 220 ${y + h - 70} M 220 ${y + h - 70} L 196 ${y + h} M 220 ${y + h - 70} L 244 ${y + h} M 188 ${y + h - 135} L 252 ${y + h - 135}`} p={pessoa} />
                <circle cx={300} cy={y + h - 150} r={18} fill="none" stroke={LINHA} strokeWidth={TRACO} />
                <Tr d={`M 300 ${y + h - 132} L 300 ${y + h - 56} M 300 ${y + h - 56} L 282 ${y + h} M 300 ${y + h - 56} L 318 ${y + h} M 276 ${y + h - 106} L 324 ${y + h - 106}`} p={pessoa} />
              </g>
              <Cota x1={x - 90} x2={x + w + 90} y={y - 46} texto="+70 MIL CASAS" p={prog(t, c.h_setenta - 0.25, 0.7, ease.out)} cor={C.text} />
              <Cota x1={330} x2={x - 8} y={y + h + 60} texto="0 VISITAS" p={prog(t, c.h_nunca - 0.3, 0.6, ease.out)} cor={C.warn} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={sp(t, -0.3, { damping: 14, stiffness: 160 }) * (1 - prog(t, c.x_eua - 0.5, 0.2))}>MAIS DE <G>70 MIL</G> CASAS</TituloFolha>
      <SeloPlanta texto="ESTIMATIVA HISTÓRICA: 70 A 100 MIL" p={prog(t, c.h_setenta, 0.4) * (1 - prog(t, c.x_eua - 0.5, 0.3))} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a página do catálogo ---------------------------------------------------------------- */
const ITEM_CASA = { x: 420, y: 290, w: 240, h: 320 };
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.x_eua - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.r_modelo - 0.5, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ITEM_CASA, TELA);
  const r = (at: number) => prog(t, at - 0.3, 0.7, ease.out);
  const carimbo = sp(t, c.x_1908 - 0.1, { damping: 10, stiffness: 220 });
  const casaAc = prog(t, c.x_catalogo - 0.05, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.x_1908, s: 1.03, x: -6, y: -6, e: ease.out }, { t: c.x_catalogo, s: 1.05, y: -10, e: ease.out }, { t: c.r_modelo, s: 1.05, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.9, ease.out)} />
              <g opacity={fade(prog(t, ini + 0.3, 0.5))} fontFamily={M} fontWeight={700} textAnchor="middle">
                <text x={480} y={182} fill={C.muted} fontSize={24} letterSpacing="0.14em">CATÁLOGO · VENDA PELO CORREIO</text>
                <line x1={160} y1={206} x2={760} y2={206} stroke={C.dim} strokeWidth={TRACO * 0.67} />
              </g>
              {/* carimbo 1908 */}
              <g opacity={fade(carimbo)} transform={`translate(860 225) rotate(-9) scale(${mix(1.5, 1, Math.min(1, carimbo))})`}>
                <rect x={-78} y={-34} width={156} height={68} rx={8} fill="none" stroke={LINHA} strokeWidth={TRACO} />
                <text x={0} y={14} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={40}>1908</text>
              </g>
              {/* item 01 · roupa */}
              <Comodo x={150} y={290} w={240} h={320} p={r(c.x_roupa)} titulo="" />
              <Tr d="M 225 395 L 250 380 Q 270 398 290 380 L 315 395 L 337 432 L 314 444 L 305 430 L 305 515 L 235 515 L 235 430 L 226 444 L 203 432 Z" p={prog(t, c.x_roupa - 0.1, 0.6, ease.out)} />
              <text x={270} y={580} textAnchor="middle" fill={C.muted} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(r(c.x_roupa))}>ROUPA</text>
              {/* item 03 · ferramenta */}
              <Comodo x={690} y={290} w={240} h={320} p={r(c.x_ferramenta)} titulo="" />
              <Tr d="M 760 392 L 860 392 L 860 424 L 760 424 Z M 800 424 L 800 522 L 820 522 L 820 424" p={prog(t, c.x_ferramenta - 0.1, 0.6, ease.out)} />
              <text x={810} y={580} textAnchor="middle" fill={C.muted} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(r(c.x_ferramenta))}>FERRAMENTA</text>
              {/* o correio */}
              <g opacity={fade(prog(t, c.x_correio - 0.2, 0.5)) * (1 - prog(t, c.x_catalogo + 0.6, 0.4))}>
                <Tr d="M 200 650 L 340 650 L 340 735 L 200 735 Z M 200 650 L 270 700 L 340 650" p={prog(t, c.x_correio - 0.2, 0.6, ease.out)} />
                <text x={370} y={705} fill={C.text} fontFamily={M} fontWeight={700} fontSize={30}>PELO CORREIO</text>
              </g>
              <Rota id="correio" d="M 340 692 L 520 692 L 520 615" p={prog(t, c.x_correio + 0.2, 0.7, ease.out) * (1 - prog(t, c.x_catalogo + 0.6, 0.4))} tom="linha" />
            </g>
            {/* item 02 · a casa inteira (acende: está no mesmo lugar que uma camisa) */}
            <Comodo {...ITEM_CASA} p={r(c.x_correio - 0.4)} titulo="" acende={casaAc} />
            <CasaElev cx={540} base={530} w={150} h={100} p={prog(t, c.x_correio - 0.5, 0.9, ease.out)} cor={casaAc > 0.5 ? A.hex : LINHA} />
            <text x={540} y={580} textAnchor="middle" fill={casaAc > 0.5 ? A.hex : C.muted} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(r(c.x_correio - 0.4))}>CASA</text>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.x_catalogo - 0.35, 0.2))}>EUA · <G>DESDE 1908</G></TituloFolha>
      <TituloFolha p={prog(t, c.x_catalogo - 0.15, 0.3) * (1 - prog(t, c.r_modelo - 0.55, 0.2))}>UMA CASA NO <G>CATÁLOGO</G></TituloFolha>
      <SeloPlanta texto="FONTE: HUD USER (GOVERNO DOS EUA)" p={prog(t, ini + 0.4, 0.4) * (1 - prog(t, c.r_modelo - 0.5, 0.3))} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · o trem, as peças e a pergunta ---------------------------------------------------------------- */
const ELEV = { x: 400, y: 560, w: 280, h: 190 };
const PECAS = Array.from({ length: 12 }).map((_, i) => ({ n: String(i + 1).padStart(2, "0"), x: 190 + (i % 4) * 190, y: 372 + Math.floor(i / 4) * 66 }));
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.r_modelo - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.a_catalogo - 0.45, 0.5, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ELEV, TELA);
  const tPaga = palavra(tl, "s4", /^pagava/i, c.r_modelo + 0.6);
  const rota = prog(t, c.r_trem - 0.4, 1.1, ease.inOut);
  const vx = mix(392, 590, rota);
  const pergunta = prog(t, c.q_como - 0.2, 0.4);
  const dim = 1 - 0.65 * pergunta;
  const monta = prog(t, c.r_manual - 0.2, 0.9, ease.inOut);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.r_trem, s: 1.03, x: -8, y: -6, e: ease.out }, { t: c.r_pecas, s: 1.04, y: -6, e: ease.out }, { t: c.q_como, s: 1.07, y: -16, e: ease.out }, { t: c.a_catalogo, s: 1.07, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros * dim}>
              <Contorno {...TELA} p={1} />
              <Comodo x={150} y={150} w={250} h={150} p={prog(t, ini, 0.7, ease.out)} amb="ETAPA 01" titulo="PEDIDO" sub={t >= tPaga - 0.05 ? "modelo + pagamento" : "modelo escolhido"} titleSize={38} />
              <Comodo x={680} y={150} w={250} h={150} p={prog(t, c.r_trem - 0.6, 0.7, ease.out)} amb="ETAPA 02" titulo="ESTAÇÃO" titleSize={38} acende={prog(t, c.r_trem + 0.8, 0.4)} />
              <Rota id="trem" d="M 400 226 L 680 226" p={rota} tom="accent" />
              {/* o vagão em corte, cheio de peças numeradas */}
              <g opacity={fade(prog(t, c.r_trem - 0.4, 0.3)) * (1 - prog(t, c.r_pecas + 0.1, 0.3))} transform={`translate(${vx} 0)`}>
                <rect x={0} y={190} width={88} height={40} fill="rgba(7,8,10,0.85)" stroke={LINHA} strokeWidth={TRACO} />
                {[14, 40, 66].map((dx) => <rect key={dx} x={dx - 8} y={198} width={16} height={24} fill="none" stroke={C.muted} strokeWidth={2} />)}
                <circle cx={20} cy={238} r={8} fill="none" stroke={LINHA} strokeWidth={TRACO} /><circle cx={68} cy={238} r={8} fill="none" stroke={LINHA} strokeWidth={TRACO} />
              </g>
              <Cota x1={170} x2={910} y={340} texto="CORTADAS NA MEDIDA" p={prog(t, c.r_medida - 0.25, 0.6, ease.out)} cor={C.text} />
            </g>
            {/* vista explodida: as peças saltam da estação e depois encaixam na elevação */}
            <g opacity={m.outros}>
              {PECAS.map((q, i) => {
                const sai = sp(t, c.r_pecas - 0.25 + i * 0.05, { damping: 13, stiffness: 160 });
                if (sai <= 0.001) return null;
                const px = mix(805, q.x, sai), py = mix(240, q.y, sai);
                const ex = ELEV.x + 20 + (i % 4) * 62, ey = ELEV.y + ELEV.h - 40 - Math.floor(i / 4) * 34;
                const fx = mix(px, ex, monta), fy = mix(py, ey, monta);
                return (
                  <g key={q.n} opacity={fade(sai) * (1 - clamp01((monta - 0.7) / 0.3)) * dim}>
                    <rect x={fx - 40} y={fy - 20} width={80} height={40} rx={4} fill="rgba(7,8,10,0.85)" stroke={LINHA} strokeWidth={TRACO * 0.67} />
                    <text x={fx} y={fy + 9} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={24}>{q.n}</text>
                  </g>
                );
              })}
            </g>
            {/* a elevação sobe com o manual… e para no meio na pergunta */}
            <Elevacao x={ELEV.x} chao={ELEV.y + ELEV.h} w={ELEV.w} andares={2} alt={86} p={0.5 * prog(t, c.r_manual - 0.2, 1.0, ease.out)} />
            <g opacity={fade(prog(t, c.r_manual, 0.5)) * dim * m.outros}>
              <CotaV x={ELEV.x - 50} y1={ELEV.y + ELEV.h} y2={ELEV.y + ELEV.h - 86} texto="" p={prog(t, c.r_manual, 0.5)} />
              <text x={ELEV.x + ELEV.w + 34} y={ELEV.y + ELEV.h - 34} fill={C.text} fontFamily={M} fontWeight={700} fontSize={30}>MANUAL</text>
            </g>
            <Porta x={ELEV.x + ELEV.w / 2 - 30} y={ELEV.y + ELEV.h} r={60} p={pergunta} aberta={false} />
            {/* a pergunta: chamada técnica em forma de "?" */}
            <g opacity={pergunta * m.outros}>
              <Tr d="M 470 300 Q 470 225 540 225 Q 610 225 610 290 Q 610 340 540 355 L 540 420" p={prog(t, c.q_como - 0.1, 0.7, ease.out)} cor={C.warn} w={TRACO + 3} />
              <circle cx={540} cy={470} r={12} fill={C.warn} opacity={fade(prog(t, c.q_como + 0.5, 0.3))} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.r_pecas - 0.35, 0.2))}>A CASA <G>CHEGAVA DE TREM</G></TituloFolha>
      <TituloFolha p={prog(t, c.r_pecas - 0.15, 0.3) * (1 - prog(t, c.q_como - 0.4, 0.2))}>ATÉ <G>30 MIL</G> PEÇAS NUMERADAS</TituloFolha>
      <TituloFolha size={56} p={prog(t, c.q_como - 0.2, 0.3) * (1 - prog(t, c.a_catalogo - 0.5, 0.2))}>COMO ESCOLHER <W>SEM VISITAR?</W></TituloFolha>
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · a página que respondia antes ---------------------------------------------------------------- */
const TILE0 = { cx: 377, cy: 302 }; // tile (linha 1, coluna 2) do bairro, onde a página "pousa"
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_catalogo - 0.1;
  if (t < ini - 0.05) return null;
  const sai = prog(t, c.e_centenas - 0.9, 0.8, ease.inOut);
  if (sai >= 1) return null;
  const s = mix(1, 150 / 840, sai);
  const tx = mix(0, TILE0.cx - 540 * s, sai), ty = mix(0, TILE0.cy - 440 * s, sai);
  const amb = [
    { k: "SALA", sub: "3,6 × 4,2 M", x: 520, y: 220, w: 210, h: 150 },
    { k: "QUARTO", sub: "3,0 × 3,6 M", x: 730, y: 220, w: 210, h: 150 },
    { k: "COZINHA", sub: "2,8 × 4,0 M", x: 520, y: 370, w: 420, h: 100 },
  ];
  const kit = ["MADEIRA CORTADA", "PEÇAS NUMERADAS", "MANUAL DE MONTAGEM"];
  const kitP = prog(t, c.a_kit - 0.35, 0.6, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_fachada, s: 1.04, x: 14, y: -4, e: ease.out }, { t: c.a_comodo, s: 1.04, x: -14, y: -4, e: ease.out }, { t: c.a_kit, s: 1.03, y: -16, e: ease.out }, { t: c.e_centenas - 0.9, s: 1.0, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={`translate(${tx} ${ty}) scale(${s})`}>
            <Contorno {...TELA} p={prog(t, ini, 0.8, ease.out)} />
            <g opacity={fade(prog(t, ini + 0.3, 0.5)) * (1 - sai)} fontFamily={M} fontWeight={700} textAnchor="middle">
              <text x={540} y={182} fill={C.muted} fontSize={24} letterSpacing="0.14em">PÁGINA DO CATÁLOGO · MODELO ILUSTRATIVO</text>
              <line x1={160} y1={200} x2={920} y2={200} stroke={C.dim} strokeWidth={TRACO * 0.67} />
            </g>
            {/* fachada */}
            <CasaElev cx={310} base={450} w={250} h={150} p={prog(t, c.a_fachada - 0.35, 0.9, ease.out)} />
            <text x={310} y={492} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(prog(t, c.a_fachada, 0.4)) * (1 - sai)}>FACHADA</text>
            {/* planta baixa: cada cômodo acende com a sua medida */}
            {amb.map((q, i) => (
              <Comodo key={q.k} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, c.a_planta - 0.35 + i * 0.12, 0.6, ease.out)} titulo={q.k} sub={t >= c.a_comodo - 0.1 + i * 0.35 ? q.sub : undefined} titleSize={30} acende={prog(t, c.a_comodo - 0.05 + i * 0.35, 0.35)} />
            ))}
            <Porta x={600} y={370} r={46} p={prog(t, c.a_planta, 0.4)} aberta={t >= c.a_comodo + 0.8} />
            <text x={730} y={500} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(prog(t, c.a_planta, 0.4)) * (1 - sai)}>PLANTA</text>
            {/* o que vem no kit */}
            <g opacity={fade(kitP)}>
              <rect x={160} y={540} width={780} height={196} fill="rgba(7,8,10,0.6)" stroke={LINHA} strokeWidth={TRACO} />
              <text x={190} y={584} fill={C.muted} fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em">O QUE VEM NO KIT</text>
              {kit.map((k, i) => {
                const ok = prog(t, c.a_kit + 0.05 + i * 0.22, 0.25);
                return (
                  <g key={k} opacity={fade(prog(t, c.a_kit - 0.2 + i * 0.12, 0.4))}>
                    <text x={190} y={632 + i * 40} fill={ok > 0.5 ? A.hex : C.dim} fontFamily={M} fontWeight={700} fontSize={30}>{ok > 0.5 ? "✓" : "□"}</text>
                    <text x={232} y={632 + i * 40} fill={C.text} fontFamily={M} fontWeight={700} fontSize={30}>{k}</text>
                  </g>
                );
              })}
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.e_duvida - 0.35, 0.2))}>O CATÁLOGO <G>RESPONDIA ANTES</G></TituloFolha>
      <TituloFolha p={prog(t, c.e_duvida - 0.15, 0.3) * (1 - prog(t, c.e_centenas - 0.9, 0.2))}>A DÚVIDA CHEGAVA <G>RESOLVIDA</G></TituloFolha>
    </div>
  );
};

/* ---------------------------------------------------------------- 5 · o bairro de modelos ---------------------------------------------------------------- */
const TILES = Array.from({ length: 20 }).map((_, i) => ({ i, col: i % 5, lin: Math.floor(i / 5), cx: 135 + 75 + (i % 5) * 165, cy: 165 + 62 + Math.floor(i / 5) * 137 }));
const ACESAS = [1, 3, 6, 8, 11, 12, 14, 17, 19];
const ALVO = TILES[12];
export const Take4: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.e_centenas - 0.25;
  if (t < ini - 0.05) return null;
  const mgP = prog(t, c.f_escuro - 0.55, 0.6, ease.linear);
  if (mgP >= 1) return null;
  const m = mergulho(mgP, { x: ALVO.cx - 75, y: ALVO.cy - 62, w: 150, h: 124 }, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.e_trinta, s: 1.02, y: -6, e: ease.out }, { t: c.e_pe, s: 1.04, y: -10, e: ease.out }, { t: c.f_escuro, s: 1.04, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            {TILES.map((q) => {
              const alvo = q.i === ALVO.i;
              const nasce = q.i === 2 ? 1 : prog(t, ini + ((q.i * 7) % 20) * 0.05, 0.6, ease.out);
              const luz = ACESAS.includes(q.i) ? prog(t, c.e_pe - 0.3 + (q.i % 4) * 0.12, 0.4) : 0;
              const w = 104 + ((q.i * 13) % 3) * 12, h = 52 + ((q.i * 7) % 3) * 8;
              return (
                <g key={q.i} opacity={alvo ? 1 : m.outros}>
                  <rect x={q.cx - 75} y={q.cy - 62} width={150} height={124} fill="none" stroke={C.dim} strokeWidth={TRACO * 0.67} opacity={fade(nasce)} />
                  <CasaElev cx={q.cx} base={q.cy + 46} w={w * 0.62} h={h * 0.62} p={nasce} luz={luz} />
                </g>
              );
            })}
            <g opacity={m.outros}>
              <Cota x1={135} x2={945} y={124} texto="1908 — 1940 · MAIS DE 30 ANOS" p={prog(t, c.e_trinta - 0.3, 0.7, ease.out)} cor={C.text} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.e_milhares - 0.35, 0.2))}><G>CENTENAS</G> DE MODELOS</TituloFolha>
      <TituloFolha p={prog(t, c.e_milhares - 0.15, 0.3) * (1 - prog(t, c.f_escuro - 0.55, 0.2))}>MILHARES <G>AINDA DE PÉ</G></TituloFolha>
      <SeloPlanta texto="ESTIMATIVAS HISTÓRICAS · HUD USER" p={prog(t, ini + 0.3, 0.4) * (1 - prog(t, c.f_escuro - 0.5, 0.3))} />
    </div>
  );
};

/* ---------------------------------------------------------------- 6 · o anúncio de hoje ---------------------------------------------------------------- */
export const Take5: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.f_escuro - 0.1;
  if (t < ini - 0.05) return null;
  const sai = prog(t, c.cta_quer - 0.35, 0.35);
  if (sai >= 1) return null;
  const campos = ["FOTOS", "PLANTA", "MEDIDAS", "VALOR E CONDIÇÕES"];
  const tAntes = c.f_antes;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.f_respostas, s: 1.03, x: 8, y: -6, e: ease.out }, { t: c.f_decide, s: 1.04, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -14, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.8, ease.out)} />
          <g opacity={fade(prog(t, ini + 0.3, 0.5))} fontFamily={M} fontWeight={700} textAnchor="middle">
            <text x={540} y={182} fill={C.muted} fontSize={24} letterSpacing="0.14em">ANÚNCIO DE HOJE · ILUSTRATIVO</text>
            <line x1={160} y1={200} x2={920} y2={200} stroke={C.dim} strokeWidth={TRACO * 0.67} />
          </g>
          <Comodo x={160} y={230} w={300} h={240} p={prog(t, ini + 0.2, 0.7, ease.out)} titulo="" />
          <CasaElev cx={310} base={430} w={170} h={100} p={prog(t, ini + 0.4, 0.8, ease.out)} />
          {campos.map((k, i) => {
            const ok = prog(t, c.f_respostas - 0.05 + i * ((tAntes + 0.5 - c.f_respostas) / campos.length), 0.25);
            return (
              <g key={k} opacity={fade(prog(t, ini + 0.4 + i * 0.12, 0.4))}>
                <rect x={500} y={232 + i * 60} width={440} height={50} fill={ok > 0.5 ? `rgba(${A.rgb[0]},${A.rgb[1]},${A.rgb[2]},0.1)` : "none"} stroke={ok > 0.5 ? A.hex : C.dim} strokeWidth={TRACO * 0.67} />
                <text x={520} y={267 + i * 60} fill={ok > 0.5 ? A.hex : C.dim} fontFamily={M} fontWeight={700} fontSize={28}>{ok > 0.5 ? "✓" : "□"}</text>
                <text x={560} y={267 + i * 60} fill={C.text} fontFamily={M} fontWeight={700} fontSize={28}>{k}</text>
              </g>
            );
          })}
          <Rota id="visita" d="M 310 470 L 310 560" p={prog(t, c.f_decide - 0.2, 0.6, ease.out)} tom="accent" />
          <Comodo x={160} y={560} w={330} h={176} p={prog(t, c.f_decide - 0.1, 0.6, ease.out)} amb="PRÓXIMA ETAPA" titulo="VISITA" titleSize={44} acende={prog(t, c.f_visitar - 0.1, 0.4)} />
          <Porta x={330} y={560} r={50} p={prog(t, c.f_decide + 0.2, 0.4)} aberta={t >= c.f_visitar - 0.1} />
          <Carimbo x={520} y={570} w={420} projeto="APROVADO" folha="FOLHA FINAL · ANÚNCIO" p={prog(t, c.f_decide + 0.3, 0.5)} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.f_respostas - 0.35, 0.2))}>NÃO FOI <W>NO ESCURO</W></TituloFolha>
      <TituloFolha size={54} p={prog(t, c.f_respostas - 0.15, 0.3) * (1 - prog(t, c.f_decide - 0.35, 0.2))}>RESPOSTAS <G>ANTES</G> DAS PERGUNTAS</TituloFolha>
      <TituloFolha size={56} p={prog(t, c.f_decide - 0.15, 0.3)}>É ISSO QUE DECIDE <G>A VISITA</G></TituloFolha>
    </div>
  );
};
