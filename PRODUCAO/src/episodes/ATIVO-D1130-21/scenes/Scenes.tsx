import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Dissolver, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1130-21 — "A casa que ninguém conseguiu comprar" (grade 30/11/2026 · 21h · HISTÓRIA QUE ENSINA · Pictograma).
 * Sem corte seco: a casinha acesa sozinha; o prédio sobe em volta → a janela (SEATTLE · 2006, Edith na poltrona) →
 * as ofertas que sobem e se desfazem na porta → o concreto fecha os lados, a casa continua acesa → apagar a luz com âncora
 * na porta: o chefe da obra chega (compras, médico, cuidado) → a chave passa de uma mão para a outra (portal) →
 * a casinha acesa entre os prédios: CONFIANÇA → fecho CtaNoir.
 * Apuração: Wikipedia, HistoryLink, Seattle Weekly (2008), Cascade PBS (2015); valor "cerca de 1 milhão" (relatos de
 * 750 mil a 1 milhão); ligação com o filme Up NÃO usada. Pictogramas originais, sem foto de pessoas ou da casa real.
 */
const CHAO = 1180;
const CX = 540;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW = "drop-shadow(0 0 10px rgba(255,255,255,0.45))";
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** A casinha (linha fina, janelas acesas). Base em (x, CHAO); w ≈ 260. */
export const Casinha: React.FC<{ x: number; s?: number; acesa?: number; verde?: number; p?: number }> = ({ x, s = 1, acesa = 1, verde = 0, p = 1 }) => {
  const cor = verde > 0.5 ? A.hex : NOIR.branco;
  const janela = verde > 0.5 ? aa(0.55 * acesa) : `rgba(255,255,255,${0.42 * acesa})`;
  return (
    <g transform={`translate(${x} ${CHAO}) scale(${s})`} opacity={clamp(p)} style={{ filter: GLOW }}>
      <Halo x={0} y={-110} r={260} p={0.5 * acesa} cor={verde > 0.5 ? A.hex : "#FFFFFF"} />
      <rect x={-130} y={-190} width={260} height={190} fill="#0A0A0A" stroke={cor} strokeWidth={4} />
      <path d="M -150 -190 L 0 -300 L 150 -190" fill="none" stroke={cor} strokeWidth={4} strokeLinejoin="round" />
      <rect x={-100} y={-150} width={60} height={56} fill={janela} stroke={cor} strokeWidth={3} />
      <rect x={40} y={-150} width={60} height={56} fill={janela} stroke={cor} strokeWidth={3} />
      <rect x={-26} y={-100} width={52} height={100} fill="#0A0A0A" stroke={cor} strokeWidth={3} />
    </g>
  );
};
/** Paredão de concreto em linha (sobe do chão com `p`). */
export const Paredao: React.FC<{ x: number; w: number; h: number; p: number; cor?: string }> = ({ x, w, h, p, cor = NOIR.cinza }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const hh = h * k;
  return (
    <g>
      <rect x={x} y={CHAO - hh} width={w} height={hh} fill="rgba(20,20,20,0.92)" stroke={cor} strokeWidth={3} />
      {Array.from({ length: Math.floor(hh / 90) }, (_, i) => <line key={i} x1={x} y1={CHAO - (i + 1) * 90} x2={x + w} y2={CHAO - (i + 1) * 90} stroke="rgba(160,160,160,0.25)" strokeWidth={2} />)}
      {Array.from({ length: Math.max(0, Math.floor(w / 70) - 1) }, (_, i) => <line key={`v${i}`} x1={x + (i + 1) * 70} y1={CHAO - hh} x2={x + (i + 1) * 70} y2={CHAO} stroke="rgba(160,160,160,0.18)" strokeWidth={2} />)}
    </g>
  );
};
/** Guindaste em linha fina. */
const Guindaste: React.FC<{ x: number; p: number; t: number }> = ({ x, p, t }) => (
  <g opacity={clamp(p)} stroke={NOIR.linha} strokeWidth={3} fill="none">
    <line x1={x} y1={CHAO} x2={x} y2={300} />
    <line x1={x - 120} y1={320} x2={x + 320} y2={320} />
    <line x1={x} y1={300} x2={x + 320} y2={320} /><line x1={x} y1={300} x2={x - 120} y2={320} />
    <line x1={x + 200 + Math.sin(t * 0.8) * 30} y1={320} x2={x + 200 + Math.sin(t * 0.8) * 30} y2={520} strokeDasharray="6 6" />
  </g>
);
/** Envelope de proposta (linha), com seta de valor que sobe. */
const Envelope: React.FC<{ x: number; y: number; s?: number; cor?: string }> = ({ x, y, s = 1, cor = NOIR.branco }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={cor} strokeWidth={3} fill="#0A0A0A" style={{ filter: GLOW }}>
    <rect x={-46} y={-30} width={92} height={60} rx={6} />
    <path d="M -46 -30 L 0 6 L 46 -30" fill="none" />
  </g>
);
const Sacola: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={NOIR.branco} strokeWidth={3} fill="#0A0A0A" style={{ filter: GLOW }}>
    <path d="M -30 -10 L 30 -10 L 24 44 L -24 44 Z" /><path d="M -14 -10 C -14 -36 14 -36 14 -10" fill="none" />
  </g>
);
const Cruz: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} style={{ filter: GLOW }}>
    <circle r={34} fill="#0A0A0A" stroke={NOIR.branco} strokeWidth={3} />
    <path d="M -6 -20 L 6 -20 L 6 -6 L 20 -6 L 20 6 L 6 6 L 6 20 L -6 20 L -6 6 L -20 6 L -20 -6 L -6 -6 Z" fill="none" stroke={NOIR.branco} strokeWidth={3} />
  </g>
);
/* ---------------------------------------------------------------- 1 · a casa, o cerco e as ofertas ---------------------------------------------------------------- */
export const Cerco: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_foi + 0.6, 0.4);
  if (on <= 0.001) return null;
  const sobe = prog(t, c.h_predio - 0.2, 1.4, ease.out);
  const fecha = prog(t, c.x_obra - 0.1, 2.2, ease.inOut);
  const interior = luz(t, c.r_seattle - 0.4, c.o_construtora - 0.5, 0.6, 0.5);
  const ofertas = [c.o_terreno, c.o_comercial, c.o_subiram, c.o_subiram + 0.45];
  const desfaz = prog(t, c.o_todas - 0.1, 0.4);
  const apaga = prog(t, c.v_foi - 0.1, 0.8, ease.inOut);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0} keys={[{ t: 0, s: 1.5, y: -200 }, { t: c.h_nao, s: 1.42, y: -180 }, { t: c.h_volta + 0.6, s: 0.92, y: 20 }, { t: c.r_seattle - 0.2, s: 0.92, y: 20 },
        { t: c.r_edith, s: 2.0, x: 140, y: -180, e: ease.inOut }, { t: c.o_construtora - 0.4, s: 2.05, x: 140, y: -190 }, { t: c.o_construtora + 0.5, s: 1.0, y: 0, e: ease.inOut },
        { t: c.x_obra, s: 1.0, y: 0 }, { t: c.x_concreto + 0.8, s: 1.08, y: -30 }, { t: c.v_foi + 0.6, s: 1.5, y: -240, x: 0 }]}>
        <Svg>
          <Chao />
          <Holofote x={CX} chao={CHAO} w={520} p={prog(t, 0, 0.6) * (1 - 0.6 * interior)} />
          {/* o prédio que sobe em volta (gancho) */}
          <Paredao x={-60} w={330} h={820} p={sobe} />
          <Paredao x={810} w={330} h={760} p={prog(t, c.h_predio + 0.1, 1.4, ease.out)} />
          {/* a obra fecha mais (cerco) */}
          <Paredao x={190} w={170} h={560} p={fecha} />
          <Paredao x={720} w={170} h={520} p={prog(t, c.x_obra + 0.3, 2.0, ease.inOut)} />
          <Guindaste x={860} p={prog(t, c.x_seguiu - 0.3, 0.8)} t={t} />
          <Casinha x={CX} acesa={1} />
          {/* a janela: Edith na poltrona (dentro da casa, só no zoom) */}
          <g opacity={interior}>
            <Figura t={t} x={470} y={CHAO - 100} s={0.17} pose="sentado" tom="luz" />
          </g>
          {/* as ofertas chegam à porta, cada uma maior, e se desfazem */}
          {ofertas.map((at, i) => {
            const k = prog(t, at - 0.2, 0.6, ease.out);
            if (k <= 0.001) return null;
            return <g key={i} opacity={1 - desfaz}><Envelope x={mix(1150, 640 + i * 70, k)} y={CHAO - 60 - i * 70} s={0.8 + i * 0.18} /></g>;
          })}
          {[0, 1, 2, 3].map((i) => <Dissolver key={i} t={t} at={c.o_todas - 0.05 + i * 0.06} x={640 + i * 70} y={CHAO - 60 - i * 70} w={90 + i * 16} h={60} n={40} dur={0.7} />)}
        </Svg>
        <Pilula t={t} at={c.h_milhao - 0.1} ate={c.h_nao - 0.3} x={CX} y={720} texto="≈ US$ 1 MILHÃO" tom="branco" size={30} />
        <Pilula t={t} at={c.o_construtora} ate={c.x_obra - 0.2} x={300} y={520} texto="CONSTRUTORA" tom="cinza" size={26} />
        <Pilula t={t} at={c.o_comercial} ate={c.o_todas} x={780} y={760} texto="OFERTA ↑" tom="branco" size={26} />
        <Pilula t={t} at={c.o_todas - 0.05} ate={c.x_obra} x={760} y={980} texto="RECUSOU TODAS" tom="vermelho" cheia size={26} />
        <Pilula t={t} at={c.x_concreto - 0.1} ate={c.v_foi - 0.2} x={CX} y={760} texto="CERCADA DE CONCRETO" tom="cinza" size={26} />
      </CamNoir>
      {/* apagar a luz com âncora na porta da casinha */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: apaga }}>
        <defs>
          <radialGradient id="ancora30_21" cx={CX} cy={1000} r={mix(1400, 260, apaga)} gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stopColor="#000" stopOpacity={0} />
            <stop offset="1" stopColor="#000" stopOpacity={0.96} />
          </radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#ancora30_21)" />
      </svg>
      <TituloNoir t={t} at={c.h_nao - 0.05} ate={c.r_seattle - 0.4} linhas={[{ texto: "A DONA", size: 72 }, { texto: "DISSE NÃO", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.r_seattle - 0.05} ate={c.o_construtora - 0.5} linhas={[{ texto: "SEATTLE · 2006", size: 76 }]} top={300} />
      <Pilula t={t} at={c.r_edith} ate={c.o_construtora - 0.5} x={CX} y={460} texto="EDITH MACEFIELD · 84 ANOS" tom="branco" size={28} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · o chefe da obra e a chave ---------------------------------------------------------------- */
export const Cuidado: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_foi + 0.3, c.f_comprar - 0.4, 0.6, 0.5);
  if (on <= 0.001) return null;
  const chega = prog(t, c.v_chefe - 0.4, 1.4, ease.inOut);
  const xB = mix(1200, 680, chega);
  const anda = t > c.v_chefe - 0.4 && t < c.v_chefe + 1.0;
  const edithSai = prog(t, c.t_morreu - 0.1, 1.2, ease.inOut);
  const chave = prog(t, c.t_deixou - 0.2, 0.9, ease.inOut);
  const cuida = prog(t, c.v_cuidava - 0.1, 0.8);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_foi} push={0.004} keys={[{ t: c.v_foi + 0.3, s: 1.06, y: -20 }, { t: c.v_chefe + 1.0, s: 1.0, y: 0 }, { t: c.v_cuidava, s: 1.05, y: -16 }, { t: c.t_deixou, s: 1.08, y: -24 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={560} p={0.8} cor={cuida > 0.5 ? "#FFFFFF" : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 150} r={360} p={0.55 * cuida * (1 - edithSai * 0.5)} cor="#FFFFFF" />
          <Casinha x={300} s={0.7} acesa={1} />
          <Figura t={t} x={420} y={CHAO} s={0.82} tom="cinza" p={1 - edithSai} />
          <Figura t={t} x={xB} y={CHAO} pose={anda ? "andando" : chave > 0.5 ? "bracosAbertos" : "pe"} fase={t * 1.6} flip tom={chave > 0.6 ? "verde" : "luz"} />
          {/* capacete do chefe da obra */}
          <path d={`M ${xB - 34} ${CHAO - 262} Q ${xB} ${CHAO - 300} ${xB + 34} ${CHAO - 262} Z`} fill="none" stroke={chave > 0.6 ? A.hex : NOIR.branco} strokeWidth={3} opacity={clamp(chega * 1.5)} />
          <g opacity={surge(t, c.v_compras - 0.1) * (1 - prog(t, c.v_cuidava + 0.4, 0.4))}><Sacola x={xB - 70} y={CHAO - 120} /></g>
          <g opacity={surge(t, c.v_medico - 0.1) * (1 - prog(t, c.v_cuidava + 0.4, 0.4))}><Cruz x={540} y={760} /></g>
          {/* a chave passa de uma mão para a outra */}
          {chave > 0.001 ? <Icone t={t} nome="chave" x={mix(440, xB - 40, chave)} y={CHAO - 160 - Math.sin(Math.PI * chave) * 120} r={36} tom={chave > 0.6 ? "verde" : "branco"} brilho={chave > 0.6} /> : null}
        </Svg>
        <Pilula t={t} at={c.v_chefe + 0.2} ate={c.v_compras - 0.2} x={760} y={720} texto="CHEFE DA OBRA" tom="branco" size={26} />
        <Pilula t={t} at={c.v_barry} ate={c.v_compras - 0.2} x={760} y={790} texto="BARRY MARTIN" tom="cinza" size={24} />
        <Pilula t={t} at={c.v_cuidava} ate={c.t_morreu - 0.2} x={540} y={640} texto="CUIDAVA DELA" tom="branco" size={28} />
        <Pilula t={t} at={c.t_deixou + 0.2} x={680} y={760} texto="A CASA FICOU PARA ELE" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.t_morreu - 0.1} ate={c.f_comprar - 0.6} linhas={[{ texto: "2008", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · a casa entre os prédios: confiança ---------------------------------------------------------------- */
export const Confianca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_comprar - 0.5, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const verde = prog(t, c.f_confianca - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_comprar} push={0.005} keys={[{ t: c.f_comprar - 0.5, s: 1.25, y: -120 }, { t: c.f_nunca + 0.5, s: 1.0, y: 0, e: ease.out }, { t: c.f_confianca, s: 1.04, y: -14 }]}>
        <Svg>
          <Chao />
          <Paredao x={-60} w={330} h={820} p={1} />
          <Paredao x={810} w={330} h={760} p={1} />
          <Paredao x={190} w={170} h={560} p={1} />
          <Paredao x={720} w={170} h={520} p={1} />
          <Holofote x={CX} chao={CHAO} w={420} p={0.8} cor={verde > 0.5 ? A.hex : "#FFFFFF"} />
          <Casinha x={CX} s={0.9} acesa={1} verde={verde} />
          <g opacity={surge(t, c.f_dinheiro - 0.1) * (1 - verde)}>
            <Icone t={t} nome="dinheiro" x={CX} y={700} r={40} tom="cinza" />
            <Icone t={t} nome="x" x={CX + 70} y={660} r={26} tom="vermelho" />
          </g>
        </Svg>
        <Pilula t={t} at={c.f_comprar - 0.1} ate={c.f_recusa - 0.2} x={CX} y={560} texto="NINGUÉM CONSEGUIU COMPRAR" tom="cinza" size={26} />
        <Pilula t={t} at={c.f_nunca} ate={c.f_recusa - 0.2} x={CX} y={630} texto="FICOU COM QUEM NUNCA TENTOU" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.f_recusa - 0.1} ate={c.f_confianca - 0.4} linhas={[{ texto: "NÃO É SOBRE", size: 72 }, { texto: "DINHEIRO", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f_confianca - 0.15} ate={c.cta_quer - 0.3} linhas={[{ texto: "É SOBRE", size: 72 }, { texto: "CONFIANÇA", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};
