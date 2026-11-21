import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { Balao, Boneco, Casinha, Chao, GIZ, Palco, Placa } from "../../../estilos/palitinho";

/**
 * ATIVO_GTA6_10 — "O primeiro atendimento do corretor de Vice City" (edição especial GTA VI, roteiro 10). ESTILO 1 — PALITINHO.
 * FICÇÃO/ESQUETE: corretor e leads ILUSTRATIVOS; "nível de procurado" é piada com a mecânica clássica da série (estrelas genéricas,
 * sem a interface do jogo). Nenhum asset do jogo; perseguição desenhada a traço, sem violência.
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

const Carro: React.FC<{ x: number; y: number; s?: number; cor?: string; t: number; vel?: number; heads?: boolean }> = ({ x, y, s = 1, cor = GIZ, t, vel = 0, heads }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={cor} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M -110 0 L -110 -40 Q -90 -46 -70 -48 L -40 -84 L 50 -84 L 80 -48 Q 110 -46 110 -24 L 110 0 Z" />
    <circle cx={-62} cy={6} r={20} /><circle cx={66} cy={6} r={20} />
    {heads ? <><circle cx={-14} cy={-62} r={12} /><circle cx={30} cy={-62} r={12} /></> : null}
    {vel > 0 ? [0, 1, 2].map((k) => <line key={k} x1={-140 - k * 20} y1={-60 + k * 22} x2={-140 - k * 20 - 60 * vel} y2={-60 + k * 22} strokeWidth={5} opacity={0.6} />) : null}
    {vel > 0 ? <circle cx={0} cy={-96} r={11} fill={Math.sin(t * 18) > 0 ? W : GIZ} stroke="none" /> : null}
  </g>
);
const estrela = (x: number, y: number, r = 34) => `M ${x} ${y - r} L ${x + r * 0.29} ${y - r * 0.4} L ${x + r * 0.95} ${y - r * 0.31} L ${x + r * 0.47} ${y + r * 0.15} L ${x + r * 0.59} ${y + r * 0.81} L ${x} ${y + r * 0.5} L ${x - r * 0.59} ${y + r * 0.81} L ${x - r * 0.47} ${y + r * 0.15} L ${x - r * 0.95} ${y - r * 0.31} L ${x - r * 0.29} ${y - r * 0.4} Z`;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const me = S(t, -0.25);
  const tag = S(t, 0.4);
  const ag = S(t, c.h_aguent - 0.15);
  const days = prog(t, c.h_semana - 0.4, 1.0, ease.out);
  const out = prog(t, c.a_prim - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -4 }, { t: c.h_cert, s: 1.07, x: -2, y: -10, e: ease.out }, { t: c.h_aguent, s: 1.09, y: -16, e: ease.out }, { t: c.a_prim, s: 1.06, y: -18, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Boneco x={540} y={FEET} t={t} pose={ag > 0.5 ? "pensa" : "celular"} cor={G} opacity={fade(me)} />
          <Placa x={290} y={120} w={500} texto="PLANTÃO · VICE CITY (FICÇÃO)" size={24} p={tag} />
          {"STQQSSD".split("").map((d, i) => {
            const p = prog(days, i * 0.1, 0.3);
            return (
              <g key={i} opacity={fade(prog(t, 0.6 + i * 0.05, 0.3))}>
                <rect x={180 + i * 104} y={220} width={84} height={84} rx={14} fill={p > 0.5 ? "rgba(255,107,94,0.16)" : C.surface} stroke={p > 0.5 ? W : C.surface3} strokeWidth={4} />
                <text x={222 + i * 104} y={274} textAnchor="middle" fill={p > 0.5 ? W : C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={30}>{d}</text>
              </g>
            );
          })}
          <Placa x={340} y={340} w={400} texto="✕ NÃO AGUENTARIA" tone="warn" size={28} p={ag} />
        </Palco>
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>UMA SEMANA DE <span style={{ color: W }}>PLANTÃO</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_prim - 0.4, 0.3);
  const out = prog(t, c.b_jan - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_prim - 0.4, s: 1.04, y: -6 }, { t: c.a_prim, s: 1.06, x: 2, y: -6, e: ease.out }, { t: c.a_seg, s: 1.06, x: -2, y: -12, e: ease.out }, { t: c.a_terc, s: 1.07, x: 2, y: -18, e: ease.out }, { t: c.b_jan, s: 1.05, y: -18, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Boneco x={860} y={FEET} t={t} pose="celular" olhar={-1} cor={G} />
          <Balao x={130} y={110} w={520} texto="Casa perto da praia" lado="dir" p={S(t, c.a_prim - 0.15)} size={36} />
          <Balao x={130} y={270} w={560} texto="Cobertura com heliponto" lado="dir" p={S(t, c.a_seg - 0.1)} size={36} />
          <Balao x={130} y={430} w={460} texto="A rua é segura?" lado="dir" tone={t > c.a_segura - 0.1 ? "warn" : "plain"} p={S(t, c.a_terc - 0.1)} size={38} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.a_prim - 0.2, 0.25)}>TRÊS <span style={{ color: G }}>LEADS</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_jan - 0.4, 0.3);
  const win = prog(t, c.b_jan - 0.3, 0.6, ease.out);
  const drive = prog(t, c.b_pers - 0.3, 2.2, ease.linear);
  const cad = S(t, c.b_cad - 0.15);
  const out = prog(t, c.c_resp - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_jan - 0.4, s: 1.04, y: -6 }, { t: c.b_pers, s: 1.06, x: 0, y: -12, e: ease.out }, { t: c.b_frente, s: 1.07, x: 2, y: -14, e: ease.out }, { t: c.c_resp, s: 1.05, y: -16, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <g opacity={fade(win)}>
            <rect x={150} y={90} width={560} height={500} rx={10} fill={aa(0.03)} stroke={GIZ} strokeWidth={8} />
            <line x1={430} y1={90} x2={430} y2={590} stroke={GIZ} strokeWidth={6} opacity={0.5} />
            <line x1={150} y1={500} x2={710} y2={500} stroke={C.surface3} strokeWidth={6} />
            <svg x={150} y={90} width={560} height={500} overflow="hidden">
              <Casinha x={460} y={400} s={0.7} p={1} cor={cad > 0.5 ? G : GIZ} />
              {drive > 0 && drive < 1 ? <Carro x={mix(-150, 760, drive)} y={400} s={0.9} t={t} vel={1} /> : null}
              {drive > 0.15 && drive < 1 ? <g transform={`translate(${mix(-150, 760, Math.max(0, drive - 0.18))} 0)`}><Carro x={0} y={400} s={0.9} t={t + 0.3} vel={1} cor={C.muted} /></g> : null}
            </svg>
          </g>
          <Placa x={420} y={610} w={300} texto="RECÉM-CADASTRADO" tone="accent" size={22} p={cad} />
          <Boneco x={880} y={FEET} t={t} pose="pensa" olhar={-1} cor={G} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.b_jan - 0.2, 0.25)}>ABRE A <span style={{ color: W }}>JANELA</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_resp - 0.4, 0.3);
  const exc = S(t, c.c_exc - 0.2);
  const mov = S(t, c.c_mov - 0.15);
  const stars = prog(t, c.c_proc - 0.2, 0.8, ease.out);
  const ph = prog(t, c.d_fech - 0.35, 0.3, ease.inOut);
  const vis = S(t, c.d_visita - 0.1);
  const comp = S(t, c.d_comp - 0.1);
  const car = S(t, c.d_carro - 0.3);
  const ph3 = prog(t, c.e_real - 0.35, 0.3, ease.inOut);
  const org = S(t, c.e_org - 0.15);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_resp - 0.4, s: 1.04, y: -6 }, { t: c.c_exc, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.c_proc, s: 1.09, x: 0, y: -16, e: ease.out }, { t: c.d_fech, s: 1.04, y: -8, e: ease.out }, { t: c.d_carro, s: 1.07, x: -2, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <Palco top={TOP} h={880}>
          <Chao y={FEET} />
          <Boneco x={mix(820, 860, ph)} y={FEET} t={t} pose={org > 0.5 ? "comemora" : ph > 0.5 ? "bracos" : "celular"} olhar={-1} cor={G} />
          <g opacity={1 - ph}>
            <Balao x={130} y={130} w={580} texto="Localização excelente…" lado="dir" tone="accent" p={exc} size={38} />
            <Balao x={130} y={300} w={600} texto="…varia com o nível de procurado" lado="dir" p={mov} size={32} />
            {[0, 1, 2, 3, 4].map((i) => {
              const p = prog(stars, i * 0.14, 0.3);
              return <path key={i} d={estrela(200 + i * 100, 520, 36)} fill={i < 3 ? W : "none"} stroke={i < 3 ? W : C.muted} strokeWidth={4} opacity={fade(p)} transform={`rotate(${Math.sin(t * 3 + i) * 6} ${200 + i * 100} 520)`} />;
            })}
          </g>
          <g opacity={ph * (1 - ph3)}>
            <Placa x={90} y={110} w={460} texto="VISITAS ✓ ✓ ✓ ✓" tone="accent" size={30} p={vis} />
            <Placa x={90} y={230} w={620} texto="COMPRADORES FORA DO CARRO: 0" tone="warn" size={26} p={comp} />
            <g opacity={fade(car)} transform={`translate(${Math.sin(t * 5) * 4} 0)`}><Carro x={380} y={FEET} s={1.3} t={t} heads /></g>
          </g>
          <g opacity={ph3}>
            <Placa x={150} y={180} w={560} texto="✓ LEAD ORGANIZADO" tone="accent" size={36} p={org} />
            {["interesse", "região", "próximo passo"].map((k, i) => <Placa key={k} x={120 + i * 220} y={320} w={210} texto={k} size={24} p={S(t, c.e_org + 0.15 + i * 0.15)} />)}
          </g>
        </Palco>
      </Camera>
      <Title p={prog(t, c.c_resp - 0.2, 0.25) * (1 - prog(t, c.d_fech - 0.45, 0.15))}>A <span style={{ color: G }}>RESPOSTA</span></Title>
      <Title p={prog(t, c.d_fech - 0.25, 0.25) * (1 - prog(t, c.e_real - 0.45, 0.15))}>NO FIM DO <span style={{ color: W }}>MÊS</span></Title>
      <Title p={prog(t, c.e_real - 0.25, 0.25)}>E NA <span style={{ color: G }}>VIDA REAL?</span></Title>
    </div>
  );
};
