import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { Giz, Lousa, Traco, caixa, casa, check, predio, seta, sublinha, xis } from "../../../estilos/lousa";

/**
 * ATIVO_GTA6_07 — "Jason e Lucia não estão atrás da mesma vida" (edição especial GTA VI, roteiro 07). ESTILO 2 — DESENHO À MÃO.
 * FATO OFICIAL (sinopse e perfis da Rockstar). Nenhuma arte/personagem do jogo: nomes só em texto, desenhos a giz originais.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;
const carro = (x: number, y: number, w = 300) => `M ${x - w / 2} ${y} L ${x - w / 2} ${y - w * 0.16} Q ${x - w * 0.36} ${y - w * 0.2} ${x - w * 0.24} ${y - w * 0.22} L ${x - w * 0.12} ${y - w * 0.36} L ${x + w * 0.18} ${y - w * 0.36} L ${x + w * 0.3} ${y - w * 0.22} Q ${x + w / 2} ${y - w * 0.2} ${x + w / 2} ${y - w * 0.08} L ${x + w / 2} ${y} Z M ${x - w * 0.22} ${y + 26} A 26 26 0 1 1 ${x - w * 0.22 + 0.1} ${y + 26 - 52} M ${x + w * 0.26} ${y + 26} A 26 26 0 1 1 ${x + w * 0.26 + 0.1} ${y + 26 - 52}`;
const cabeca = (x: number, y: number, r = 70) => `M ${x + r} ${y} A ${r} ${r} 0 1 1 ${x + r - 0.1} ${y - 1} M ${x - r * 1.3} ${y + r * 2.6} Q ${x} ${y + r * 1.1} ${x + r * 1.3} ${y + r * 2.6}`;
const corrente = (x: number, y: number, n = 5) => Array.from({ length: n }, (_, i) => `M ${x + i * 44 + 22} ${y} A 22 14 0 1 1 ${x + i * 44 + 21.9} ${y - 1}`).join(" ");
const grade = (x: number, y: number, w = 260, h = 300) => `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z ` + Array.from({ length: 4 }, (_, i) => `M ${x + (i + 1) * (w / 5)} ${y} L ${x + (i + 1) * (w / 5)} ${y + h}`).join(" ");
const estrela = (x: number, y: number, r = 30) => `M ${x} ${y - r} L ${x + r * 0.25} ${y - r * 0.25} L ${x + r} ${y} L ${x + r * 0.25} ${y + r * 0.25} L ${x} ${y + r} L ${x - r * 0.25} ${y + r * 0.25} L ${x - r} ${y} L ${x - r * 0.25} ${y - r * 0.25} Z`;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const car = prog(t, -0.1, Math.max(1.2, c.h_roubar + 0.3), ease.out);
  const cut = prog(t, c.h_aten - 0.3, 0.4, ease.out);
  const two = prog(t, c.h_prot - 0.35, 0.8, ease.out);
  const out = prog(t, c.a_jason - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={10} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -2 }, { t: c.h_roubar, s: 1.07, x: -2, y: -8, e: ease.out }, { t: c.h_prot, s: 1.05, x: 2, y: -14, e: ease.out }, { t: c.a_jason, s: 1.07, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={5}>
          <g transform={`translate(0 ${Math.sin(t * 1.5) * 10}) rotate(${Math.sin(t * 1.1) * 0.9} 540 440)`}>
          <g opacity={1 - two * 0.7} transform={`translate(${Math.sin(t * 6) * 3 * (1 - cut)} 0)`}>
            <Traco d={carro(540, 300, 380)} p={car} w={8} />
            <Traco d={xis(540, 250, 320)} p={cut} w={11} cor={W} />
          </g>
          <Traco d={cabeca(360, 560, 64)} p={two} w={8} />
          <Traco d={cabeca(720, 560, 64)} p={prog(t, c.h_prot - 0.15, 0.8, ease.out)} w={8} cor={G} />
          <Giz x={540} y={850} texto="2 PROTAGONISTAS" p={prog(t, c.h_prot, 0.6)} size={54} anchor="middle" cor={G} />
          </g>
        </Lousa>
      </Camera>
      <Title p={fade(prog(t, -0.4, 0.4))}>NÃO É SÓ <span style={{ color: W }}>ROUBAR CARRO</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_jason - 0.45, 0.3);
  const div = prog(t, c.a_jason - 0.3, 0.7, ease.out);
  const j = prog(t, c.a_jason - 0.1, 0.5);
  const tranq = prog(t, c.a_tranq - 0.2, 0.9, ease.out);
  const preso = prog(t, c.a_preso - 0.1, 0.8, ease.out);
  const l = prog(t, c.a_lucia - 0.1, 0.5);
  const bars = prog(t, c.a_prisao - 0.4, 0.8, ease.out);
  const open = prog(t, c.a_prisao + 0.4, 0.7, ease.inOut);
  const sorte = prog(t, c.a_sorte - 0.15, 0.7, ease.out);
  const out = prog(t, c.b_aprox - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={10} t={t} keys={[{ t: c.a_jason - 0.45, s: 1.04, x: 3, y: -4 }, { t: c.a_preso, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.a_lucia, s: 1.04, x: -3, y: -8, e: ease.out }, { t: c.a_sorte, s: 1.06, x: -3, y: -14, e: ease.out }, { t: c.b_aprox, s: 1.05, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={8}>
          <g transform={`translate(0 ${Math.sin(t * 1.5) * 10}) rotate(${Math.sin(t * 1.1) * 0.9} 540 440)`}>
          <Traco d="M 540 50 L 545 860" p={div} w={5} cor={C.dim} />
          <Giz x={280} y={110} texto="JASON" p={j} size={60} anchor="middle" />
          <Traco d={casa(280, 470, 230)} p={tranq} w={7} cor={G} />
          <Giz x={280} y={540} texto="vida tranquila" p={tranq} size={38} anchor="middle" cor={G} />
          <Traco d={corrente(170, 640, 5)} p={preso} w={6} cor={W} />
          <Giz x={280} y={720} texto="preso ao passado" p={preso} size={36} anchor="middle" cor={W} />
          <Giz x={800} y={110} texto="LUCIA" p={l} size={60} anchor="middle" />
          <g transform={`translate(${mix(0, -120, open)} 0)`}><Traco d={grade(670, 200, 260, 300)} p={bars} w={7} /></g>
          <Giz x={800} y={560} texto="saiu da prisão" p={bars} size={36} anchor="middle" cor={C.muted} />
          <Traco d={estrela(860, 300, 40)} p={sorte} w={6} cor={G} />
          <Traco d={estrela(760, 380, 26)} p={prog(t, c.a_sorte, 0.6)} w={5} cor={G} />
          <Traco d={seta(690, 680, 930, 620, 50)} p={sorte} w={6} cor={G} />
          <Giz x={810} y={740} texto="mudar a sorte" p={sorte} size={38} anchor="middle" cor={G} />
          </g>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.a_jason - 0.2, 0.25)}>DUAS VIDAS, <span style={{ color: G }}>DOIS PLANOS</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_aprox - 0.45, 0.3);
  const ap = prog(t, c.b_aprox - 0.2, 1.2, ease.inOut);
  const box = prog(t, c.b_serv - 0.2, 0.8, ease.out);
  const err = prog(t, c.b_errado - 0.1, 0.4, ease.out);
  const ph = prog(t, c.b_ponto - 0.3, 0.3, ease.inOut);
  const car = prog(t, c.b_ponto, 0.8, ease.out);
  const nao = prog(t, c.b_dirige - 0.1, 0.4, ease.out);
  const shake = err > 0 && err < 1 ? Math.sin(t * 50) * 6 : 0;
  const out = prog(t, c.c_ver - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={10} t={t} keys={[{ t: c.b_aprox - 0.45, s: 1.04, y: -4 }, { t: c.b_serv, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.b_errado, s: 1.09, x: 0, y: -16, e: ease.out }, { t: c.b_ponto, s: 1.04, x: -2, y: -8, e: ease.out }, { t: c.c_ver, s: 1.06, y: -14, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={10}>
          <g transform={`translate(0 ${Math.sin(t * 1.5) * 10}) rotate(${Math.sin(t * 1.1) * 0.9} 540 440)`}>
          <g opacity={1 - ph}>
            <Traco d={seta(110, 160, mix(140, 430, ap), mix(200, 330, ap), 30)} p={ap} w={7} />
            <Traco d={seta(970, 160, mix(940, 650, ap), mix(200, 330, ap), 30)} p={ap} w={7} cor={G} />
            <Giz x={150} y={120} texto="Jason" p={ap} size={36} />
            <Giz x={930} y={120} texto="Lucia" p={ap} size={36} anchor="end" cor={G} />
            <g transform={`translate(${shake} 0)`}>
              <Traco d={caixa(290, 420, 500, 180)} p={box} w={7} />
              <Giz x={540} y={500} texto="SERVIÇO" p={box} size={56} anchor="middle" />
              <Giz x={540} y={565} texto="“simples”" p={prog(t, c.b_simples - 0.1, 0.4)} size={44} anchor="middle" cor={C.muted} />
              <Traco d={xis(540, 510, 300)} p={err} w={11} cor={W} />
            </g>
            <Giz x={540} y={720} texto="DEU ERRADO" p={err} size={64} anchor="middle" cor={W} rot={-3} />
          </g>
          <g opacity={ph}>
            <Giz x={540} y={160} texto="quem dirige melhor?" p={car} size={52} anchor="middle" />
            <Traco d={carro(540, 480, 360)} p={car} w={8} />
            <Traco d={sublinha(250, 190, 580)} p={nao} w={9} cor={W} />
            <Giz x={540} y={700} texto="NÃO É ISSO" p={nao} size={64} anchor="middle" cor={W} rot={-2} />
          </g>
          </g>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.b_aprox - 0.2, 0.25)}>UM SERVIÇO <span style={{ color: W }}>DÁ ERRADO</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_ver - 0.45, 0.3);
  const path = prog(t, c.c_ver - 0.2, 1.4, ease.out);
  const walk = prog(t, c.c_vida - 0.2, 3.5, ease.inOut);
  const city = prog(t, c.c_cidade - 0.3, 1.0, ease.out);
  const tent = prog(t, c.c_tent - 0.2, 0.8, ease.out);
  const destr = prog(t, c.c_destr - 0.1, 0.5, ease.out);
  const ph = prog(t, c.d_comeca - 0.4, 0.3, ease.inOut);
  const rope = prog(t, c.d_comeca - 0.2, 0.8, ease.out);
  const caos = prog(t, c.d_caos - 0.2, 0.5);
  const pull = prog(t, c.d_puxa - 0.2, 1.0, ease.inOut);
  const ph3 = prog(t, c.e_fora - 0.4, 0.3, ease.inOut);
  const org = prog(t, c.e_org - 0.3, 0.8, ease.out);
  const knot = 540 + mix(0, 90, pull) + Math.sin(t * 5) * 16 * rope;
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const px = mix(150, 560, walk), py = mix(760, 420, walk);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={10} t={t} keys={[{ t: c.c_ver - 0.45, s: 1.04, y: -4 }, { t: c.c_cidade, s: 1.06, x: -2, y: -10, e: ease.out }, { t: c.c_destr, s: 1.08, x: 2, y: -14, e: ease.out }, { t: c.d_comeca, s: 1.04, y: -6, e: ease.out }, { t: c.d_puxa, s: 1.07, x: -3, y: -12, e: ease.out }, { t: c.e_org, s: 1.06, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={12}>
          <g transform={`translate(0 ${Math.sin(t * 1.5) * 10}) rotate(${Math.sin(t * 1.1) * 0.9} 540 440)`}>
          <g opacity={(1 - ph)}>
            <Traco d="M 120 800 Q 300 640 400 560 T 640 360" p={path} w={8} cor={G} />
            <Giz x={600} y={300} texto="vida diferente" p={path} size={42} anchor="middle" cor={G} />
            <circle cx={px - 20} cy={py} r={18} fill="none" stroke="#E9ECEF" strokeWidth={6} opacity={fade(walk)} />
            <circle cx={px + 24} cy={py - 8} r={18} fill="none" stroke={G} strokeWidth={6} opacity={fade(walk)} />
            <Traco d={predio(820, 820, 120, 360) + " " + predio(950, 820, 100, 260)} p={city} w={6} />
            <Giz x={880} y={862} texto="a cidade" p={city} size={36} anchor="middle" cor={C.muted} />
            <Traco d={seta(780, 560, 480, 520, -60)} p={tent} w={6} cor={W} />
            <Traco d={seta(780, 700, 330, 680, -40)} p={prog(t, c.c_tent + 0.2, 0.8, ease.out)} w={6} cor={W} />
            <Giz x={600} y={630} texto="tentação" p={tent} size={38} anchor="middle" cor={W} />
            <Traco d={xis(460, 520, 120)} p={destr} w={10} cor={W} />
          </g>
          <g opacity={ph * (1 - ph3)}>
            <path d={`M 130 460 Q 540 ${470 + Math.sin(t * 5) * 14} 950 460`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - rope} stroke="#E9ECEF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={rope > 0.01 ? 1 : 0} />
            <circle cx={knot} cy={460} r={20} fill={W} opacity={fade(rope)} />
            <Giz x={220} y={380} texto="sair do caos" p={caos} size={46} anchor="middle" cor={G} />
            <Giz x={860} y={380} texto="a cidade" p={rope} size={46} anchor="middle" cor={W} />
            <Traco d={seta(700, 560, 900, 560, 10)} p={pull} w={7} cor={W} />
            <Giz x={800} y={640} texto="puxa de volta" p={pull} size={38} anchor="middle" cor={W} />
          </g>
          <g opacity={ph3}>
            <Giz x={540} y={420} texto="ORGANIZAÇÃO" p={org} size={84} anchor="middle" cor={G} />
            <Traco d={sublinha(250, 450, 580)} p={prog(t, c.e_org + 0.3, 0.5)} w={8} cor={G} />
            <Traco d={check(470, 580, 140)} p={prog(t, c.e_org + 0.4, 0.5)} w={12} cor={G} />
          </g>
          </g>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.c_ver - 0.2, 0.25) * (1 - prog(t, c.d_comeca - 0.45, 0.15))}>UMA <span style={{ color: G }}>VIDA DIFERENTE</span></Title>
      <Title p={prog(t, c.d_comeca - 0.25, 0.25) * (1 - prog(t, c.e_fora - 0.45, 0.15))}>A CIDADE <span style={{ color: W }}>PUXA DE VOLTA</span></Title>
      <Title p={prog(t, c.e_fora - 0.25, 0.25)}>FORA DO JOGO</Title>
    </div>
  );
};
