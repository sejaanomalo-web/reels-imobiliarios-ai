import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { GIZ, Giz, Lousa, Traco, casa, caixa, check, circulo, predio, seta, sublinha, xis } from "../../../estilos/lousa";

/**
 * ATIVO_GTA6_01 — "O corretor não vai conseguir jogar em paz" (edição especial GTA VI, roteiro 01). ESTILO 2 — DESENHO À MÃO (esteira).
 * FICÇÃO/ANALOGIA. Nenhum asset do jogo: sem logo, captura, personagem ou música — tudo desenhado a giz, original.
 * "GTA VI" só citado por nome. Carteira e imóveis FICTÍCIOS. Câmera: y positivo sobe o conteúdo.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;

/* Desenhos à mão extras (caminhos SVG). */
const controle = (x: number, y: number, w = 420) => {
  const h = w * 0.5;
  return `M ${x - w * 0.3} ${y - h / 2} L ${x + w * 0.3} ${y - h / 2} Q ${x + w / 2} ${y - h / 2} ${x + w / 2} ${y} Q ${x + w * 0.52} ${y + h * 0.75} ${x + w * 0.36} ${y + h * 0.7} Q ${x + w * 0.22} ${y + h * 0.62} ${x + w * 0.16} ${y + h * 0.3} L ${x - w * 0.16} ${y + h * 0.3} Q ${x - w * 0.22} ${y + h * 0.62} ${x - w * 0.36} ${y + h * 0.7} Q ${x - w * 0.52} ${y + h * 0.75} ${x - w / 2} ${y} Q ${x - w / 2} ${y - h / 2} ${x - w * 0.3} ${y - h / 2} Z M ${x - w * 0.3} ${y - 10} L ${x - w * 0.18} ${y - 10} M ${x - w * 0.24} ${y - 34} L ${x - w * 0.24} ${y + 14}`;
};
const botoes = (x: number, y: number, w = 420) => [[0.22, -0.06], [0.3, 0.02], [0.22, 0.1], [0.14, 0.02]].map(([a, b]) => `M ${x + w * a + 12} ${y + w * b} A 12 12 0 1 1 ${x + w * a + 11.9} ${y + w * b - 1}`).join(" ");
const carro = (x: number, y: number, w = 300) => `M ${x - w / 2} ${y} L ${x - w / 2} ${y - w * 0.16} Q ${x - w * 0.36} ${y - w * 0.2} ${x - w * 0.24} ${y - w * 0.22} L ${x - w * 0.12} ${y - w * 0.36} L ${x + w * 0.18} ${y - w * 0.36} L ${x + w * 0.3} ${y - w * 0.22} Q ${x + w / 2} ${y - w * 0.2} ${x + w / 2} ${y - w * 0.08} L ${x + w / 2} ${y} Z M ${x - w * 0.22} ${y + 26} A 26 26 0 1 1 ${x - w * 0.22 + 0.1} ${y + 26 - 52} M ${x + w * 0.26} ${y + 26} A 26 26 0 1 1 ${x + w * 0.26 + 0.1} ${y + 26 - 52}`;
const ondas = (x: number, y: number, w: number) => Array.from({ length: 2 }, (_, k) => `M ${x} ${y + k * 30} ` + Array.from({ length: 6 }, (_, i) => `q ${w / 12} ${-18} ${w / 6} 0`).join(" ")).join(" ");
export const _palmeira = (x: number, y: number, h = 260) => `M ${x} ${y} Q ${x + 20} ${y - h * 0.5} ${x + 6} ${y - h} M ${x + 6} ${y - h} Q ${x - 70} ${y - h - 30} ${x - 110} ${y - h + 40} M ${x + 6} ${y - h} Q ${x + 80} ${y - h - 30} ${x + 120} ${y - h + 40} M ${x + 6} ${y - h} Q ${x - 30} ${y - h - 70} ${x - 70} ${y - h - 70} M ${x + 6} ${y - h} Q ${x + 50} ${y - h - 70} ${x + 90} ${y - h - 60}`;
const balao = (x: number, y: number, w: number, h: number) => `M ${x + 30} ${y} L ${x + w - 30} ${y} Q ${x + w} ${y} ${x + w} ${y + 30} L ${x + w} ${y + h - 30} Q ${x + w} ${y + h} ${x + w - 30} ${y + h} L ${x + 90} ${y + h} L ${x + 40} ${y + h + 50} L ${x + 56} ${y + h} L ${x + 30} ${y + h} Q ${x} ${y + h} ${x} ${y + h - 30} L ${x} ${y + 30} Q ${x} ${y} ${x + 30} ${y} Z`;
const cameraIco = (x: number, y: number) => `M ${x - 90} ${y - 55} L ${x + 50} ${y - 55} L ${x + 50} ${y + 55} L ${x - 90} ${y + 55} Z M ${x + 50} ${y - 15} L ${x + 110} ${y - 50} L ${x + 110} ${y + 50} L ${x + 50} ${y + 15}`;
const pasta = (x: number, y: number, w = 520, h = 300) => `M ${x - w / 2} ${y - h / 2 + 40} L ${x - w / 2} ${y + h / 2} L ${x + w / 2} ${y + h / 2} L ${x + w / 2} ${y - h / 2 + 40} L ${x - w * 0.05} ${y - h / 2 + 40} L ${x - w * 0.12} ${y - h / 2} L ${x - w / 2} ${y - h / 2} Z`;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const pad = prog(t, -0.1, 1.2, ease.out);
  const btn = prog(t, 0.9, 0.5, ease.out);
  const bub = prog(t, c.h_corr - 0.3, 0.7, ease.out);
  const house = prog(t, c.h_corr + 0.2, 1.0, ease.out);
  const paz = prog(t, c.h_paz - 0.15, 0.5, ease.out);
  const out = prog(t, c.a_normal - 0.6, 0.3, ease.in);
  const tilt = Math.sin(t * 3.2) * 4;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={7} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -2 }, { t: c.h_cert, s: 1.07, x: -2, y: -8, e: ease.out }, { t: c.h_corr, s: 1.05, x: 2, y: -14, e: ease.out }, { t: c.a_normal, s: 1.07, y: -18, e: ease.linear }]}>
        <Lousa top={TOP} h={880}>
          <g transform={`rotate(${tilt} 540 640)`}>
            <Traco d={controle(540, 640, 440)} p={pad} w={8} />
            <Traco d={botoes(540, 640, 440)} p={btn} w={6} cor={G} />
          </g>
          <Traco d={balao(300, 90, 480, 300)} p={bub} w={6} />
          <Traco d={casa(540, 350, 230)} p={house} w={8} cor={G} />
          <Giz x={540} y={850} texto="EM PAZ?" p={paz} size={56} anchor="middle" cor={W} rot={-3} />
          <Traco d={sublinha(420, 868, 240)} p={prog(t, c.h_paz + 0.15, 0.4)} w={6} cor={W} />
        </Lousa>
      </Camera>
      <Title p={title} size={62}>GTA VI <span style={{ color: G }}>LANÇOU</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_normal - 0.6, 0.35);
  const div = prog(t, c.a_normal - 0.4, 0.8, ease.out);
  const lbl1 = prog(t, c.a_normal - 0.1, 0.6);
  const car = prog(t, c.a_carro - 0.2, 0.9, ease.out);
  const drive = prog(t, c.a_expl - 0.1, 1.2, ease.inOut);
  const lbl2 = prog(t, c.a_corr - 0.1, 0.6);
  const bld = prog(t, c.a_corr + 0.3, 1.2, ease.out);
  const top = prog(t, c.a_cob - 0.1, 0.7, ease.out);
  const sea = prog(t, c.a_mar - 0.4, 0.9, ease.out);
  const out = prog(t, c.b_cab - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.a_normal - 0.6, s: 1.04, y: -4 }, { t: c.a_carro, s: 1.06, x: 3, y: -8, e: ease.out }, { t: c.a_corr, s: 1.04, x: -2, y: -10, e: ease.out }, { t: c.a_cob, s: 1.07, x: -3, y: -16, e: ease.out }, { t: c.b_cab, s: 1.05, y: -20, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={7}>
          <Traco d="M 540 60 L 545 860" p={div} w={5} cor={C.dim} />
          <Giz x={270} y={110} texto="PESSOA NORMAL" p={lbl1} size={42} anchor="middle" />
          <g transform={`translate(${mix(0, 70, drive)} ${Math.sin(t * 9) * 2 * drive})`}>
            <Traco d={carro(250, 470, 300)} p={car} w={7} />
          </g>
          <Traco d={seta(110, 620, 430, 600, 50)} p={drive} w={6} />
          <Giz x={270} y={700} texto="explorar" p={drive} size={44} anchor="middle" rot={-2} />
          <Giz x={810} y={110} texto="CORRETOR" p={lbl2} size={46} anchor="middle" cor={G} />
          <Traco d={predio(810, 690, 190, 440)} p={bld} w={7} />
          <Traco d={`M 715 280 L 905 280 L 905 250 L 715 250 Z`} p={top} w={7} cor={G} />
          <Traco d={circulo(810, 262, 150, 62)} p={top} w={6} cor={G} />
          <Giz x={810} y={190} texto="cobertura" p={top} size={36} anchor="middle" cor={G} />
          <Traco d={ondas(600, 760, 440)} p={sea} w={6} />
        </Lousa>
      </Camera>
      <Title p={prog(t, c.a_normal - 0.25, 0.25)}>A MESMA <span style={{ color: G }}>CIDADE</span></Title>
    </div>
  );
};

const PERG = [{ k: "VAGAS?", at: "b_vagas" }, { k: "METRAGEM?", at: "b_metr" }, { k: "CHURRASQUEIRA?", at: "b_churr" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_cab - 0.4, 0.35);
  const head = prog(t, c.b_cab - 0.2, 1.0, ease.out);
  const ph = prog(t, c.b_mansao - 0.4, 0.35, ease.inOut);
  const man = prog(t, c.b_mansao - 0.1, 1.2, ease.out);
  const cam = prog(t, c.b_video - 0.2, 0.7, ease.out);
  const rec = t > c.b_video + 0.4 && Math.sin(t * 8) > -0.2;
  const out = prog(t, c.c_fach - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.b_cab - 0.4, s: 1.04, y: -6 }, { t: c.b_vagas, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.b_churr, s: 1.08, x: -2, y: -16, e: ease.out }, { t: c.b_mansao, s: 1.04, x: 0, y: -8, e: ease.out }, { t: c.c_fach, s: 1.07, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={9}>
          <g opacity={1 - ph}>
            <Traco d={`M 250 520 Q 120 520 120 360 Q 120 190 280 180 Q 420 175 430 330 L 470 400 L 430 410 L 430 470 Q 420 520 360 520 L 360 600`} p={head} w={8} />
            <Giz x={290} y={380} texto="?" p={head > 0.8 ? 1 : 0} size={120} anchor="middle" cor={G} rot={Math.sin(t * 4) * 6} />
            {PERG.map((q, i) => {
              const p = prog(t, c[q.at] - 0.15, 0.45);
              return (
                <g key={q.k}>
                  <Traco d={caixa(520, 186 + i * 150, 54, 54)} p={p} w={6} />
                  <Traco d={check(530, 214 + i * 150, 40)} p={prog(t, c[q.at] + 0.25, 0.3)} w={8} cor={G} />
                  <Giz x={600} y={232 + i * 150} texto={q.k} p={p} size={q.k.length > 10 ? 44 : 50} />
                </g>
              );
            })}
          </g>
          <g opacity={ph}>
            <Traco d={casa(420, 640, 420)} p={man} w={8} />
            <Traco d={`M 120 640 L 680 640`} p={man} w={6} />
            <Giz x={420} y={720} texto="MANSÃO" p={man} size={44} anchor="middle" />
            <Traco d={cameraIco(840, 360)} p={cam} w={7} cor={G} />
            {rec ? <circle cx={790} cy={340} r={12} fill={W} /> : null}
            <Giz x={820} y={500} texto="vídeo de" p={cam} size={40} anchor="middle" cor={G} />
            <Giz x={820} y={550} texto="captação" p={cam} size={40} anchor="middle" cor={G} />
            <Traco d={seta(800, 590, 560, 470, 30)} p={prog(t, c.b_video + 0.3, 0.5)} w={5} cor={G} />
          </g>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.b_cab - 0.05, 0.25)}>A CABEÇA <span style={{ color: G }}>JÁ COMEÇA</span></Title>
    </div>
  );
};

/** Velocímetro desenhado: agulha em `ang` graus (−90 = esquerda, 90 = direita). */
const Velo: React.FC<{ x: number; y: number; r: number; p: number; ang: number }> = ({ x, y, r, p, ang }) => {
  const a = ((ang - 90) * Math.PI) / 180;
  return (
    <g>
      <Traco d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`} p={p} w={8} />
      {[-60, -30, 0, 30, 60].map((d) => { const b = ((d - 90) * Math.PI) / 180; return <Traco key={d} d={`M ${x + Math.cos(b) * r * 0.82} ${y + Math.sin(b) * r * 0.82} L ${x + Math.cos(b) * r} ${y + Math.sin(b) * r}`} p={p} w={5} />; })}
      <line x1={x} y1={y} x2={x + Math.cos(a) * r * 0.75} y2={y + Math.sin(a) * r * 0.75} stroke={GIZ} strokeWidth={9} strokeLinecap="round" opacity={p > 0.6 ? 1 : 0} />
      <circle cx={x} cy={y} r={12} fill={GIZ} opacity={p > 0.6 ? 1 : 0} />
    </g>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_fach - 0.45, 0.35);
  const fach = prog(t, c.c_fach - 0.2, 0.7, ease.out);
  const slow = prog(t, c.c_dim, 1.0, ease.inOut);
  const chart = prog(t, c.c_bairro - 0.15, 0.9, ease.out);
  const up = prog(t, c.c_valor - 0.2, 0.9, ease.out);
  const mis = prog(t, c.c_esq - 0.2, 0.6, ease.out);
  const cross = prog(t, c.c_missao - 0.05, 0.4, ease.out);
  const ph = prog(t, c.d_desc - 0.5, 0.35, ease.inOut);
  const folder = prog(t, c.d_cart - 0.3, 1.0, ease.out);
  const fict = prog(t, c.d_fict - 0.1, 0.5);
  const stamp = sp(t, c.d_diag - 0.1, { damping: 10, stiffness: 220 });
  const voce = prog(t, c.e_voce - 0.3, 0.6, ease.out);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const needle = mix(55, -45, slow) + Math.sin(t * 7) * 3;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.c_fach - 0.45, s: 1.04, y: -6 }, { t: c.c_dim, s: 1.07, x: 3, y: -12, e: ease.out }, { t: c.c_valor, s: 1.05, x: -3, y: -10, e: ease.out }, { t: c.c_missao, s: 1.08, y: -18, e: ease.out }, { t: c.d_cart, s: 1.04, y: -8, e: ease.out }, { t: c.d_diag, s: 1.07, x: 2, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={11}>
          <g opacity={1 - ph}>
            <Giz x={280} y={110} texto="fachada bonita" p={fach} size={40} anchor="middle" />
            <Velo x={280} y={360} r={170} p={fach} ang={needle} />
            <Giz x={280} y={430} texto="devagar…" p={slow} size={38} anchor="middle" cor={C.muted} />
            <Giz x={800} y={110} texto="bairro novo" p={chart} size={40} anchor="middle" />
            <Traco d="M 640 420 L 640 170 M 640 420 L 980 420" p={chart} w={6} />
            <Traco d="M 660 400 Q 760 390 800 320 T 960 190" p={up} w={8} cor={G} />
            <Giz x={810} y={480} texto="valorização ↗" p={up} size={40} anchor="middle" cor={G} />
            <Traco d={caixa(310, 590, 460, 150)} p={mis} w={7} />
            <Giz x={540} y={690} texto="MISSÃO" p={mis} size={70} anchor="middle" />
            <Traco d={xis(540, 665, 300)} p={cross} w={10} cor={W} />
          </g>
          <g opacity={ph}>
            <Traco d={pasta(540, 400, 560, 340)} p={folder} w={8} />
            {[0, 1, 2].map((i) => <Traco key={i} d={casa(390 + i * 150, 500, 110)} p={prog(t, c.d_cart + 0.2 + i * 0.25, 0.6)} w={6} cor={G} />)}
            <Giz x={540} y={170} texto="CARTEIRA DE IMÓVEIS" p={folder} size={44} anchor="middle" />
            <Giz x={540} y={630} texto="(FICTÍCIA)" p={fict} size={40} anchor="middle" cor={C.muted} />
            <g opacity={fade(stamp)} transform={`translate(540 740) rotate(-6) scale(${mix(1.6, 1, Math.min(1, stamp))})`}>
              <rect x={-330} y={-58} width={660} height={116} rx={14} fill="none" stroke={G} strokeWidth={7} filter="url(#rough)" />
              <text x={0} y={18} textAnchor="middle" fill={G} fontFamily="JetBrains Mono" fontWeight={700} fontSize={44} filter="url(#rough)">DIAGNÓSTICO: CORRETOR</text>
            </g>
          </g>
          <Giz x={540} y={862} texto="…e se for você?" p={voce} size={46} anchor="middle" cor={G} />
        </Lousa>
      </Camera>
      <Title p={prog(t, c.c_fach - 0.1, 0.25) * (1 - prog(t, c.d_desc - 0.6, 0.15))}>ESQUECE A <span style={{ color: W }}>MISSÃO</span></Title>
      <Title p={prog(t, c.d_desc - 0.4, 0.25)}>SAIU COM UMA <span style={{ color: G }}>CARTEIRA</span></Title>
    </div>
  );
};
