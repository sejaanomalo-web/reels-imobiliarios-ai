import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa, WARN_BG } from "../../NOV26/kit";
import { Balao, Boneco, Casinha, Chao, GIZ, Palco, Placa } from "../../../estilos/palitinho";

/**
 * ATIVO_GTA6_06 — "O aluguel mais suspeito do GTA VI" (edição especial GTA VI, roteiro 06). ESTILO 1 — PALITINHO (esteira).
 * FATO OFICIAL (perfil dos personagens no site da Rockstar). Personagens representados por bonecos GENÉRICOS rotulados
 * INQUILINO/PROPRIETÁRIO — nada da arte do jogo. Contrato e valores FICTÍCIOS.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const FEET = 700;
const TOP = 400;
const S = (t: number, at: number) => sp(t, at, { damping: 11, stiffness: 220 });

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ppl = S(t, -0.25);
  const house = prog(t, -0.1, 1.1, ease.out);
  const zero = S(t, c.h_alug - 0.15);
  const out = prog(t, c.a_prot - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -4 }, { t: c.h_pior, s: 1.06, x: -2, y: -10, e: ease.out }, { t: c.h_alug, s: 1.08, x: 0, y: -16, e: ease.out }, { t: c.a_prot, s: 1.06, y: -18, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Casinha x={540} y={FEET + 60} s={1.0} p={house} />
          <Boneco x={190} y={FEET} t={t} opacity={fade(ppl)} />
          <Boneco x={890} y={FEET} t={t + 1} pose="bracos" olhar={-1} cor={C.muted} opacity={fade(ppl)} />
          <g opacity={fade(zero)} transform={`translate(540 230) scale(${mix(0.5, 1, Math.min(1.08, zero))}) translate(-540 -230)`}>
            <rect x={300} y={170} width={480} height={120} rx={24} fill={aa(0.14)} stroke={G} strokeWidth={5} />
            <text x={540} y={252} textAnchor="middle" fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={60}>ALUGUEL: <tspan fill={G}>R$ 0</tspan></text>
          </g>
          <Placa x={120} y={FEET + 90} w={190} texto="INQUILINO" size={22} p={fade(ppl)} />
          <Placa x={770} y={FEET + 90} w={220} texto="PROPRIETÁRIO" size={22} p={fade(ppl)} />
        </Palco>
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>O PIOR <span style={{ color: W }}>ACORDO</span> DE ALUGUEL</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_prot - 0.35, 0.3);
  const walk = prog(t, c.a_sem - 0.3, 1.2, ease.inOut);
  const yay = S(t, c.a_sem);
  const prop = S(t, c.a_brian - 0.1);
  const marav = S(t, c.a_marav - 0.1);
  const out = prog(t, c.b_so - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_prot - 0.35, s: 1.05, y: -8 }, { t: c.a_sem, s: 1.07, x: 0, y: -14, e: ease.out }, { t: c.a_brian, s: 1.06, x: -3, y: -12, e: ease.out }, { t: c.a_marav, s: 1.07, x: 0, y: -18, e: ease.out }, { t: c.b_so, s: 1.06, y: -20, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Casinha x={540} y={FEET + 60} s={1.0} p={1} cor={marav > 0.5 ? G : GIZ} />
          <Boneco x={mix(190, 380, walk)} y={FEET} t={t} andar={walk} pose={marav > 0.5 ? "comemora" : "parado"} />
          <Boneco x={890} y={FEET} t={t + 1} pose={prop > 0.5 ? "acena" : "bracos"} olhar={-1} cor={C.muted} />
          <Balao x={150} y={300} w={280} texto="R$ 0!" lado="esq" tone="accent" p={yay} size={52} />
          <Placa x={360} y={130} w={360} texto="✓ SEM ALUGUEL" tone="accent" size={30} p={marav} />
          <Placa x={120} y={FEET + 90} w={190} texto="INQUILINO" size={22} />
          <Placa x={770} y={FEET + 90} w={220} texto="PROPRIETÁRIO" size={22} tone={prop > 0.5 ? "warn" : "muted"} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.a_prot - 0.1, 0.25)}>MORA <span style={{ color: G }}>SEM PAGAR</span></Title>
    </div>
  );
};

/** Barquinho e ondas a traço (litoral). */
const Litoral: React.FC<{ p: number; t: number }> = ({ p, t }) => (
  <g opacity={fade(p)} stroke={C.muted} strokeWidth={6} strokeLinecap="round" fill="none" transform={`translate(${Math.sin(t * 1.3) * 10} -10) translate(800 380) scale(0.7) translate(-800 -380)`}>
    <path d="M 650 330 L 950 330 L 910 380 L 690 380 Z" />
    <path d="M 800 330 L 800 210 L 880 310" />
    {[0, 1].map((k) => <path key={k} d={`M 620 ${410 + k * 32} q 40 -18 80 0 t 80 0 t 80 0 t 80 0`} />)}
  </g>
);

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_so - 0.35, 0.3);
  const app = prog(t, c.b_so - 0.1, 1.2, ease.inOut);
  const car = S(t, c.b_car - 0.1);
  const ofic = S(t, c.b_ofic - 0.15);
  const desde = S(t, c.b_desde - 0.15);
  const cobr = S(t, c.b_cobr - 0.1);
  const lit = S(t, c.b_neg - 0.2);
  const out = prog(t, c.c_ouseja - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_so - 0.35, s: 1.05, y: -8 }, { t: c.b_car, s: 1.07, x: -3, y: -12, e: ease.out }, { t: c.b_desde, s: 1.08, x: 2, y: -16, e: ease.out }, { t: c.b_cobr, s: 1.1, x: 0, y: -20, e: ease.out }, { t: c.b_lit, s: 1.05, x: -3, y: -12, e: ease.out }, { t: c.c_ouseja, s: 1.05, y: -16, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Casinha x={380} y={FEET + 60} s={0.8} p={1} />
          <Boneco x={200} y={FEET} t={t} pose={desde > 0.5 ? "pensa" : "parado"} />
          <Boneco x={mix(890, 700, app)} y={FEET} t={t + 1} andar={app} pose={cobr > 0.5 ? "aponta" : "parado"} olhar={-1} cor={C.muted} />
          <g opacity={1 - fade(lit)}>
            <Balao x={500} y={300} w={460} texto="Não é caridade…" lado="dir" tone="muted" p={car * (1 - fade(desde))} size={36} />
            <Balao x={500} y={300} w={460} texto="Desde que…" lado="dir" tone="warn" p={desde} size={44} />
          </g>
          <Placa x={280} y={60} w={520} texto="DESCRIÇÃO OFICIAL DO JOGO" size={24} p={ofic} />
          <g opacity={fade(cobr)} transform={`translate(540 190) rotate(-3) scale(${mix(1.5, 1, Math.min(1, cobr))}) translate(-540 -190)`}>
            <rect x={150} y={140} width={780} height={100} rx={18} fill={WARN_BG} stroke={W} strokeWidth={5} />
            <text x={540} y={206} textAnchor="middle" fill={W} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>CONDIÇÃO: COBRANÇAS LOCAIS</text>
          </g>
          <Litoral p={lit} t={t} />
          <Placa x={150} y={290} w={360} texto="NEGÓCIOS NO LITORAL" size={24} p={lit} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.b_so - 0.1, 0.25)}>SÓ QUE… <span style={{ color: W }}>DESDE QUE</span></Title>
    </div>
  );
};

/** Lupa a traço. */
const Lupa: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => (
  <g opacity={fade(p)} transform={`translate(${x} ${y})`} stroke={GIZ} strokeWidth={9} strokeLinecap="round" fill="none">
    <circle r={92} fill={aa(0.08)} />
    <line x1={66} y1={66} x2={150} y2={150} strokeWidth={16} />
  </g>
);

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_ouseja - 0.35, 0.3);
  const doc = prog(t, c.c_ouseja - 0.2, 0.8, ease.out);
  const zero = S(t, c.c_semal - 0.1);
  const cond = S(t, c.c_cond - 0.05);
  const nunca = S(t, c.c_contr - 0.1);
  const boa = S(t, c.d_boa - 0.15);
  const lupaIn = prog(t, c.d_letras - 0.6, 0.5, ease.out);
  const lupaMove = prog(t, c.d_letras - 0.2, 1.4, ease.inOut);
  const vice = S(t, c.d_vice - 0.1);
  const ph3 = prog(t, c.e_fora - 0.35, 0.3, ease.inOut);
  const claro = S(t, c.e_claro - 0.1);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const lx = mix(380, 640, lupaMove), ly = 505;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_ouseja - 0.35, s: 1.04, y: -6 }, { t: c.c_cond, s: 1.08, x: 2, y: -12, e: ease.out }, { t: c.d_concl, s: 1.04, x: -2, y: -8, e: ease.out }, { t: c.d_letras, s: 1.09, x: 0, y: -16, e: ease.out }, { t: c.e_claro, s: 1.06, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <g opacity={fade(doc)} transform={`translate(0 ${(1 - Math.min(1, doc)) * 40 + Math.sin(t * 1.2) * 6}) rotate(${Math.sin(t * 0.9) * 0.8} 540 380)`}>
            <rect x={250} y={90} width={580} height={600} rx={18} fill={C.surface} stroke={ph3 > 0.5 ? G : GIZ} strokeWidth={5} />
            <text x={540} y={160} textAnchor="middle" fill={C.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={40}>CONTRATO</text>
            <text x={540} y={196} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={24}>FICTÍCIO</text>
            <text x={300} y={270} fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={38} opacity={fade(zero)}>Aluguel: <tspan fill={G}>R$ 0</tspan></text>
            <text x={300} y={340} fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={38} opacity={fade(cond) * (1 - ph3)}>Condição: <tspan fill={W}>???</tspan></text>
            <text x={300} y={340} fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={38} opacity={ph3}>Condições: <tspan fill={G}>claras</tspan></text>
            {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={300} y1={410 + i * 30} x2={780 - (i % 3) * 60} y2={410 + i * 30} stroke={C.dim} strokeWidth={6} strokeLinecap="round" opacity={1 - ph3 * 0.6} />)}
          </g>
          <g opacity={fade(cond) * (1 - ph3)} transform={`translate(540 600) rotate(-8) scale(${mix(1.6, 1, Math.min(1, cond))}) translate(-540 -600)`}>
            <rect x={250} y={560} width={580} height={86} rx={12} fill="none" stroke={W} strokeWidth={6} />
            <text x={540} y={617} textAnchor="middle" fill={W} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>CONDIÇÃO SUSPEITA</text>
          </g>
          <Placa x={250} y={730} w={580} texto="✕ NENHUM CORRETOR SÉRIO FARIA" tone="warn" size={26} p={nunca * (1 - fade(boa))} />
          <Placa x={300} y={730} w={480} texto="BOA DEMAIS?" tone="warn" size={30} p={boa * (1 - fade(vice))} />
          <Placa x={250} y={730} w={580} texto="ESPECIALMENTE EM VICE CITY" size={26} p={vice * (1 - ph3)} />
          <g opacity={1 - ph3}>
            <Lupa x={lx} y={ly} p={lupaIn} />
            <text x={lx} y={ly + 12} textAnchor="middle" fill={W} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26} opacity={fade(lupaMove) * fade(lupaIn)}>cobranças…</text>
          </g>
          <Placa x={300} y={730} w={480} texto="✓ CONTRATO CLARO" tone="accent" size={32} p={claro} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.c_ouseja - 0.1, 0.25) * (1 - prog(t, c.d_concl - 0.35, 0.15))}>NENHUM <span style={{ color: W }}>CONTRATO</span> SÉRIO</Title>
      <Title p={prog(t, c.d_concl - 0.15, 0.25) * (1 - prog(t, c.e_fora - 0.45, 0.15))}>LEIA AS <span style={{ color: G }}>LETRAS MIÚDAS</span></Title>
      <Title p={prog(t, c.e_fora - 0.25, 0.25)}>CONTRATO BOM <span style={{ color: G }}>É CLARO</span></Title>
    </div>
  );
};
