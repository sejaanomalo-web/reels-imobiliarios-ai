import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { Carimbo, Chamada, Comodo, Cota, Prancha } from "../../../estilos/planta";

/**
 * ATIVO_GTA6_08 — "GTA VI não é apenas Vice City" (edição especial GTA VI, roteiro 08). ESTILO 3 — PLANTA TÉCNICA.
 * FATO OFICIAL: regiões de Leonida apresentadas pela Rockstar. NÃO existe mapa oficial completo: o mapa é ESQUEMÁTICO/ILUSTRATIVO,
 * posições aproximadas, rotulado no vídeo. Nenhum asset do jogo.
 */
const G = A.hex;
const W = C.warn;
const M = "JetBrains Mono";
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });

type R = { k: string; x: number; y: number; w: number; h: number; at: string; ts?: number; tone?: "accent" | "muted" };
const REG: R[] = [
  { k: "PORT GELLHORN", x: 130, y: 110, w: 260, h: 180, at: "b_port", ts: 28 },
  { k: "AMBROSIA", x: 400, y: 110, w: 230, h: 180, at: "b_amb", ts: 30 },
  { k: "MOUNT KALAGA", x: 640, y: 110, w: 310, h: 180, at: "b_kal", ts: 30 },
  { k: "GRASSRIVERS", x: 130, y: 300, w: 420, h: 230, at: "b_grass", ts: 34 },
];
const VC = { x: 560, y: 300, w: 390, h: 280 };
const ILHAS = [{ x: 470, y: 640 }, { x: 570, y: 668 }, { x: 670, y: 650 }, { x: 770, y: 676 }, { x: 870, y: 655 }];

/** Mapa esquemático de Leonida (reaproveitado nas cenas). `rev` 0..1 controla a revelação de cada região pelo cue. */
const Mapa: React.FC<{ t: number; c: Record<string, number>; outline: number; named: boolean; dim?: number }> = ({ t, c, outline, named, dim = 1 }) => (
  <g opacity={dim}>
    <rect x={110} y={80} width={860} height={640} rx={8} fill="none" stroke={C.text} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - outline} />
    {REG.map((r) => {
      const p = named ? prog(t, c[r.at] - 0.25, 0.6, ease.out) : 0;
      return <Comodo key={r.k} x={r.x} y={r.y} w={r.w} h={r.h} p={named ? Math.max(0.35 * outline, p) : 0.35 * outline} titulo={p > 0.5 ? r.k : "?"} titleSize={r.ts} tone={p > 0.5 ? "accent" : "muted"} />;
    })}
    <Comodo x={VC.x} y={VC.y} w={VC.w} h={VC.h} p={outline} amb="A ESTRELA" titulo="VICE CITY" titleSize={44} />
    {ILHAS.map((i, k) => {
      const p = named ? prog(t, c.b_keys - 0.25 + k * 0.06, 0.4) : 0.35 * outline;
      return <rect key={k} x={i.x} y={i.y} width={74} height={36} rx={14} fill={p > 0.5 && named ? aa(0.12) : "none"} stroke={p > 0.5 && named ? G : C.dim} strokeWidth={4} opacity={Math.max(0.3, Math.min(1, p * 1.5))} />;
    })}
    <text x={670} y={760} textAnchor="middle" fill={named && t > c.b_keys ? G : C.muted} fontFamily={M} fontWeight={700} fontSize={28} opacity={named ? fade(prog(t, c.b_keys - 0.2, 0.4)) : 0}>LEONIDA KEYS</text>
  </g>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const vc = prog(t, -0.1, 1.1, ease.out);
  const so = S(t, c.h_vice - 0.15);
  const out = prog(t, c.a_estrela - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={9} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -4 }, { t: c.h_perc, s: 1.07, x: -2, y: -10, e: ease.out }, { t: c.h_vice, s: 1.1, x: 0, y: -14, e: ease.out }, { t: c.a_estrela, s: 1.06, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Comodo x={240} y={160} w={600} h={420} p={vc} amb="PROJETO: GTA VI" titulo="VICE CITY" titleSize={64} />
          <Cota x1={240} x2={840} y={120} texto="O QUE TODO MUNDO VÊ" p={vc} />
          <Chamada x={760} y={540} bx={300} by={680} bw={480} texto="SÓ ISSO?" p={so} tone="warn" />
        </Prancha>
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>NÃO É SÓ <span style={{ color: G }}>VICE CITY</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_estrela - 0.45, 0.3);
  const zoom = prog(t, c.a_estrela - 0.3, 1.6, ease.inOut);
  const outline = prog(t, c.a_leon - 0.4, 1.0, ease.out);
  const maior = S(t, c.a_maior - 0.1);
  const out = prog(t, c.b_reg - 0.45, 0.3, ease.in);
  const s = mix(1.9, 1, zoom);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.a_estrela - 0.45, s: 1.04, y: -4 }, { t: c.a_leon, s: 1.05, x: 2, y: -8, e: ease.out }, { t: c.a_maior, s: 1.07, x: -2, y: -12, e: ease.out }, { t: c.b_reg, s: 1.05, y: -14, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <g transform={`translate(${VC.x + VC.w / 2} ${VC.y + VC.h / 2}) scale(${s}) translate(${-(VC.x + VC.w / 2)} ${-(VC.y + VC.h / 2)})`}>
            <Mapa t={t} c={c} outline={outline} named={false} />
          </g>
          <Cota x1={110} x2={970} y={62} texto="LEONIDA · ESTADO FICTÍCIO · ESQUEMA ILUSTRATIVO" p={outline} cor={G} />
          <Chamada x={340} y={400} bx={150} by={780} bw={460} texto="MUITO MAIOR" p={maior} tone="accent" />
        </Prancha>
      </Camera>
      <Title p={prog(t, c.a_estrela - 0.2, 0.25)}>O JOGO É <span style={{ color: G }}>LEONIDA</span></Title>
    </div>
  );
};

const TIPOS = [{ k: "URBANO", at: "b_urb", x: 755, y: 440, bx: 690, by: 790 }, { k: "LITORAL", at: "b_lit", x: 620, y: 660, bx: 690, by: 790 }, { k: "PÂNTANO", at: "b_pant", x: 340, y: 420, bx: 150, by: 790 }, { k: "INTERIOR", at: "b_int", x: 795, y: 200, bx: 690, by: 790 }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_reg - 0.45, 0.3);
  const out = prog(t, c.c_expl - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.b_reg - 0.45, s: 1.03, y: -4 }, { t: c.b_keys, s: 1.05, x: -2, y: -12, e: ease.out }, { t: c.b_port, s: 1.05, x: 3, y: -4, e: ease.out }, { t: c.b_kal, s: 1.05, x: -3, y: -6, e: ease.out }, { t: c.b_int, s: 1.04, y: -10, e: ease.out }, { t: c.c_expl, s: 1.04, y: -12, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Mapa t={t} c={c} outline={1} named />
          {TIPOS.map((q, i) => {
            const p = prog(t, c[q.at] - 0.15, 0.4, ease.out);
            const next = i < TIPOS.length - 1 ? prog(t, c[TIPOS[i + 1].at] - 0.15, 0.2) : 0;
            const bx = q.bx;
            return <Chamada key={q.k} x={q.x} y={q.y} bx={bx} by={800} bw={240} texto={q.k} p={p * (1 - next * 0.85)} tone="accent" />;
          })}
        </Prancha>
      </Camera>
      <Title p={prog(t, c.b_reg - 0.2, 0.25)}>REGIÕES <span style={{ color: G }}>BEM DIFERENTES</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_expl - 0.45, 0.3);
  const route = prog(t, c.c_expl - 0.2, 2.0, ease.inOut);
  const dois = S(t, c.c_dois - 0.15);
  const cross = prog(t, c.c_dois + 0.6, 0.4, ease.out);
  const estilo = S(t, c.c_estilo - 0.1);
  const mar = S(t, c.d_mar - 0.15);
  const lost = prog(t, c.d_perd - 0.4, 1.6, ease.inOut);
  const vista = S(t, c.d_vista - 0.1);
  const ph3 = prog(t, c.e_real - 0.4, 0.3, ease.inOut);
  const perfil = S(t, c.e_perfil - 0.2);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const lostD = "M 800 250 C 760 170, 700 230, 720 160 S 860 140, 900 210 S 760 270, 700 200";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.c_expl - 0.45, s: 1.03, y: -4 }, { t: c.c_dois, s: 1.05, x: 2, y: -8, e: ease.out }, { t: c.d_mar, s: 1.06, x: -2, y: -14, e: ease.out }, { t: c.d_perd, s: 1.08, x: -3, y: -6, e: ease.out }, { t: c.e_perfil, s: 1.05, y: -12, e: ease.out }, { t: c.cta_quer, s: 1.04, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Mapa t={t} c={c} outline={1} named dim={mix(1, 0.12, ph3)} />
          <g opacity={1 - ph3}>
            <path d="M 500 660 C 620 600, 700 520, 720 440 S 420 450, 330 400 S 560 220, 790 210" fill="none" stroke={G} strokeWidth={7} strokeDasharray="18 12" pathLength={1000} strokeDashoffset={0} opacity={route > 0 ? 1 : 0} style={{ clipPath: `inset(0 0 ${(1 - route) * 100}% 0)` }} />
            <circle cx={500} cy={660} r={16} fill={G} opacity={fade(mar)} />
            <rect x={480} y={600} width={170} height={44} rx={10} fill={aa(0.16)} stroke={G} strokeWidth={3} opacity={fade(mar)} />
            <text x={565} y={630} textAnchor="middle" fill={G} fontFamily={M} fontWeight={700} fontSize={24} opacity={fade(mar)}>INÍCIO: MAR</text>
            <path d={lostD} fill="none" stroke={W} strokeWidth={5} strokeDasharray="10 10" opacity={lost > 0 ? 1 : 0} style={{ clipPath: `inset(0 ${(1 - lost) * 100}% 0 0)` }} />
            <Chamada x={760} y={200} bx={600} by={20} bw={330} texto="VISTA MELHOR?" p={vista} tone="warn" />
            <g opacity={fade(dois) * (1 - fade(estilo) * 0.0)} transform={`translate(0 ${Math.sin(t * 1.3) * 5})`}>
              <rect x={150} y={780} width={360} height={84} rx={12} fill="rgba(255,107,94,0.10)" stroke={W} strokeWidth={3} />
              <rect x={180} y={798} width={60} height={50} fill="none" stroke={C.muted} strokeWidth={3} /><rect x={250} y={798} width={60} height={50} fill="none" stroke={C.muted} strokeWidth={3} />
              <text x={410} y={832} textAnchor="middle" fill={W} fontFamily={M} fontWeight={700} fontSize={24}>MESMA RUA</text>
              <line x1={160} y1={850} x2={mix(160, 500, cross)} y2={790} stroke={W} strokeWidth={6} opacity={cross > 0 ? 1 : 0} />
            </g>
            <g opacity={fade(estilo)}>
              <rect x={560} y={780} width={380} height={84} rx={12} fill={aa(0.14)} stroke={G} strokeWidth={3} />
              <text x={750} y={832} textAnchor="middle" fill={G} fontFamily={M} fontWeight={700} fontSize={24}>OUTRO ESTILO DE VIDA</text>
            </g>
          </g>
          <g opacity={fade(perfil)} transform={`translate(330 300) scale(${mix(1.4, 1, Math.min(1, perfil))})`}>
            <Carimbo x={0} y={0} projeto="PERFIL POR REGIÃO" folha="CADA REGIÃO, UM PÚBLICO" p={1} />
          </g>
        </Prancha>
      </Camera>
      <Title p={prog(t, c.c_expl - 0.2, 0.25) * (1 - prog(t, c.e_real - 0.45, 0.15))}>PRA QUEM GOSTA DE <span style={{ color: G }}>EXPLORAR</span></Title>
      <Title p={prog(t, c.e_real - 0.25, 0.25)}>E NA <span style={{ color: G }}>VIDA REAL?</span></Title>
    </div>
  );
};
