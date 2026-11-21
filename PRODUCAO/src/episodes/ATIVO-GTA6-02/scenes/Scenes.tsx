import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { Carimbo, Chamada, Comodo, Cota, Porta, Prancha } from "../../../estilos/planta";

/**
 * ATIVO_GTA6_02 — "O magnata imobiliário escondido em GTA VI" (edição especial GTA VI, roteiro 02). ESTILO 3 — PLANTA TÉCNICA (esteira).
 * Fato oficial: perfil do personagem FICTÍCIO Boobie Ike no site da Rockstar. Nenhum asset do jogo: planta, mapa e ficha são
 * ILUSTRATIVOS e originais; nome citado só em texto. Não mostra nem exalta a origem criminosa do "império" (ver QA).
 */
const G = A.hex;
const W = C.warn;
const M = "JetBrains Mono";
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const outer = prog(t, -0.1, 1.1, ease.out);
  const r1 = prog(t, 0.5, 0.9, ease.out);
  const r2 = prog(t, 0.9, 0.9, ease.out);
  const r3 = prog(t, 1.3, 0.9, ease.out);
  const cota = prog(t, c.h_fort - 0.2, 0.7, ease.out);
  const prot = prog(t, c.h_prot - 0.2, 0.6, ease.out);
  const out = prog(t, c.a_nome - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={7} t={t} keys={[{ t: 0, s: 1.03, x: 2, y: -2 }, { t: c.h_fort, s: 1.06, x: -2, y: -8, e: ease.out }, { t: c.h_prot, s: 1.05, x: 2, y: -14, e: ease.out }, { t: c.a_nome, s: 1.07, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <rect x={140} y={140} width={800} height={480} fill="none" stroke={C.text} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - outer} />
          <Comodo x={140} y={140} w={480} h={300} p={r1} amb="AMB. 01" titulo="SALA" sub="vista para o mar" />
          <Comodo x={620} y={140} w={320} h={300} p={r2} amb="AMB. 02" titulo="SUÍTE" />
          <Comodo x={140} y={440} w={800} h={180} p={r3} amb="ÁREA EXTERNA" titulo="PISCINA" tone="muted" titleSize={34} />
          <Porta x={560} y={440} r={60} p={r2} />
          <Cota x1={140} x2={940} y={100} texto="FORTUNA EM IMÓVEIS" p={cota} cor={G} />
          <Chamada x={780} y={300} bx={300} by={700} bw={480} texto="NEM É O PROTAGONISTA" p={prot} tone="warn" />
        </Prancha>
      </Camera>
      <Title p={title} size={60}>UM <span style={{ color: G }}>MAGNATA</span> IMOBILIÁRIO</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_nome - 0.45, 0.35);
  const ficha = prog(t, c.a_nome - 0.2, 0.9, ease.out);
  const nome = sp(t, c.a_boob - 0.05, { damping: 11, stiffness: 220 });
  const lenda = prog(t, c.a_lenda - 0.2, 0.7, ease.out);
  const traj = prog(t, c.a_traj - 0.3, 0.7, ease.out);
  const neg = prog(t, c.a_neg - 0.2, 0.7, ease.out);
  const out = prog(t, c.b_imp - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.a_nome - 0.45, s: 1.04, y: -4 }, { t: c.a_boob, s: 1.08, x: 0, y: -12, e: ease.out }, { t: c.a_lenda, s: 1.05, x: -2, y: -10, e: ease.out }, { t: c.a_neg, s: 1.06, x: 2, y: -16, e: ease.out }, { t: c.b_imp, s: 1.05, y: -18, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <rect x={140} y={110} width={800} height={290} fill={aa(0.05 * ficha)} stroke={G} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ficha} />
          <g opacity={fade(ficha)} fontFamily={M} fontWeight={700} textAnchor="middle">
            <text x={540} y={170} fill={C.muted} fontSize={24}>FICHA TÉCNICA · PERSONAGEM FICTÍCIO</text>
            <line x1={170} y1={192} x2={910} y2={192} stroke={aa(0.4)} strokeWidth={2} />
          </g>
          <g opacity={fade(nome)} transform={`translate(540 290) scale(${mix(0.7, 1, Math.min(1.05, nome))})`} fontFamily="Manrope" fontWeight={800} textAnchor="middle">
            <text x={0} y={0} fill={C.text} fontSize={84} letterSpacing={-2}>BOOBIE IKE</text>
            <text x={0} y={60} fill={C.muted} fontFamily={M} fontWeight={700} fontSize={26}>GTA VI · VICE CITY</text>
          </g>
          <Chamada x={540} y={400} bx={170} by={460} bw={740} texto="“LENDA DE VICE CITY” — PERFIL OFICIAL" p={lenda} tone="accent" />
          <Comodo x={140} y={620} w={320} h={170} p={traj} titulo="TRAJETÓRIA" tone="muted" titleSize={34} />
          <line x1={470} y1={705} x2={mix(470, 610, neg)} y2={705} stroke={G} strokeWidth={5} strokeDasharray="12 10" opacity={neg > 0 ? 1 : 0} />
          <path d="M 596 690 L 616 705 L 596 720" fill="none" stroke={G} strokeWidth={5} opacity={neg > 0.9 ? 1 : 0} />
          <Comodo x={620} y={620} w={320} h={170} p={neg} titulo="NEGÓCIOS" titleSize={36} />
        </Prancha>
      </Camera>
      <Title p={prog(t, c.a_nome - 0.1, 0.25)}>O NOME: <span style={{ color: G }}>BOOBIE IKE</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_imp - 0.45, 0.35);
  const outer = prog(t, c.b_imp - 0.3, 0.8, ease.out);
  const r1 = prog(t, c.b_imov - 0.2, 0.7, ease.out);
  const r2 = prog(t, c.b_clube - 0.2, 0.7, ease.out);
  const r3 = prog(t, c.b_est - 0.2, 0.7, ease.out);
  const r4 = prog(t, c.b_grav - 0.35, 0.8, ease.out);
  const sub4 = prog(t, c.b_assoc - 0.1, 0.5);
  const hit = prog(t, c.b_estourar - 0.15, 0.6, ease.out);
  const out = prog(t, c.c_muda - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.b_imp - 0.45, s: 1.03, y: -4 }, { t: c.b_imov, s: 1.06, x: 3, y: -8, e: ease.out }, { t: c.b_clube, s: 1.06, x: -3, y: -8, e: ease.out }, { t: c.b_est, s: 1.06, x: 3, y: -14, e: ease.out }, { t: c.b_grav, s: 1.07, x: -3, y: -16, e: ease.out }, { t: c.c_muda, s: 1.05, y: -18, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <rect x={130} y={110} width={820} height={600} fill="none" stroke={C.text} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - outer} />
          <Comodo x={130} y={110} w={410} h={300} p={r1} amb="FRENTE 01" titulo="IMÓVEIS" titleSize={40} />
          <Comodo x={540} y={110} w={410} h={300} p={r2} amb="FRENTE 02" titulo="CLUBE" sub="noturno" titleSize={40} />
          <Comodo x={130} y={410} w={410} h={300} p={r3} amb="FRENTE 03" titulo="ESTÚDIO" sub="musical" titleSize={40} />
          <Comodo x={540} y={410} w={410} h={300} p={r4} amb="ANEXO" titulo="GRAVADORA" titleSize={38} />
          <text x={745} y={640} textAnchor="middle" fill={G} fontFamily={M} fontWeight={700} fontSize={24} opacity={sub4 * fade(r4)}>+ DRE’QUAN PRIEST</text>
          <Porta x={540} y={560} r={60} p={r4} />
          <Cota x1={130} x2={950} y={70} texto="O IMPÉRIO (ILUSTRATIVO)" p={outer} />
          <Chamada x={880} y={470} bx={330} by={760} bw={560} texto="QUER ESTOURAR NA CIDADE" p={hit} tone="accent" />
        </Prancha>
      </Camera>
      <Title p={prog(t, c.b_imp - 0.1, 0.25)}>O <span style={{ color: G }}>IMPÉRIO</span> DELE</Title>
    </div>
  );
};

const BLOCOS = Array.from({ length: 9 }, (_, i) => ({ x: 160 + (i % 3) * 270, y: 110 + Math.floor(i / 3) * 190 }));
const PINS = [{ k: "NEGÓCIOS", b: 0, at: "c_neg" }, { k: "INTERESSES", b: 5, at: "c_int" }, { k: "PODER", b: 7, at: "c_poder" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_muda - 0.45, 0.35);
  const grid = prog(t, c.c_muda - 0.3, 1.4, ease.out);
  const route = prog(t, c.c_pers - 0.3, 1.0, ease.inOut);
  const no = prog(t, c.c_neg - 0.6, 0.4, ease.out);
  const esp = prog(t, c.c_esp - 0.1, 0.9, ease.out);
  const ph = prog(t, c.d_adorei - 0.5, 0.35, ease.inOut);
  const caos = prog(t, c.d_caos - 0.2, 0.6, ease.out);
  const build = prog(t, c.d_adorei - 0.2, Math.max(1.6, c.d_patr - c.d_adorei + 0.6), ease.out);
  const pat = prog(t, c.d_patr - 0.2, 0.6, ease.out);
  const stamp = sp(t, c.d_imp - 0.1, { damping: 11, stiffness: 220 });
  const seus = prog(t, c.e_agora - 0.25, 0.7, ease.out);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const routeD = "M 140 390 L 405 390 L 405 580 L 675 580 L 675 200 L 940 200";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.c_muda - 0.45, s: 1.03, y: -4 }, { t: c.c_pers, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.c_neg, s: 1.04, x: -2, y: -8, e: ease.out }, { t: c.c_esp, s: 1.06, y: -12, e: ease.out }, { t: c.d_patr, s: 1.04, y: -8, e: ease.out }, { t: c.d_imp, s: 1.07, x: 2, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <g opacity={1 - ph}>
            {BLOCOS.map((b, i) => <rect key={i} x={b.x} y={b.y} width={220} height={140} rx={6} fill={aa(0.03)} stroke={C.dim} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(grid, i * 0.06, 0.5)} />)}
            <text x={540} y={80} textAnchor="middle" fill={C.muted} fontFamily={M} fontWeight={700} fontSize={24} opacity={fade(grid)}>MAPA ILUSTRATIVO · CIDADE FICTÍCIA</text>
            <path d={routeD} fill="none" stroke={W} strokeWidth={6} strokeDasharray="16 12" pathLength={1000} opacity={route > 0 ? 1 - no * 0.6 : 0} style={{ clipPath: `inset(0 ${(1 - route) * 100}% 0 0)` }} />
            <g opacity={fade(route) * (1 - no * 0.5)}>
              <rect x={330} y={680} width={420} height={70} rx={12} fill="rgba(255,107,94,0.12)" stroke={W} strokeWidth={3} />
              <text x={540} y={726} textAnchor="middle" fill={W} fontFamily={M} fontWeight={700} fontSize={26}>SÓ PERSEGUIÇÃO?</text>
              <line x1={320} y1={735} x2={mix(320, 760, no)} y2={695} stroke={W} strokeWidth={6} opacity={no > 0 ? 1 : 0} />
            </g>
            {PINS.map((q) => {
              const p = sp(t, c[q.at] - 0.1, { damping: 10, stiffness: 240 });
              const b = BLOCOS[q.b];
              return (
                <g key={q.k} opacity={fade(p)} transform={`translate(${b.x + 110} ${b.y + 70}) scale(${mix(0.4, 1, Math.min(1.08, p))})`}>
                  <circle r={22} fill={G} /><circle r={9} fill="#06100A" />
                  <rect x={-110} y={-90} width={220} height={52} rx={10} fill={aa(0.14)} stroke={G} strokeWidth={3} />
                  <text y={-55} textAnchor="middle" fill={G} fontFamily={M} fontWeight={700} fontSize={24}>{q.k}</text>
                </g>
              );
            })}
            {[1, 2, 3, 4, 6, 8].map((bi, k) => {
              const b = BLOCOS[bi];
              const p = prog(esp, k * 0.12, 0.4);
              return <circle key={bi} cx={b.x + 60 + (k % 2) * 110} cy={b.y + 100} r={14 * Math.min(1, p)} fill={aa(0.75)} />;
            })}
          </g>
          <g opacity={ph}>
            <text x={540} y={120} textAnchor="middle" fill={W} fontFamily={M} fontWeight={700} fontSize={28} opacity={fade(caos)}>JOGO FAMOSO PELO CAOS</text>
            {[0, 1, 2, 3].map((i) => {
              const hgt = [180, 260, 340, 420][i];
              const p = prog(build, i * 0.15, 0.6, ease.out);
              return <rect key={i} x={230 + i * 160} y={620 - hgt * p} width={120} height={hgt * p} fill={aa(0.06 + i * 0.03)} stroke={G} strokeWidth={4} />;
            })}
            <line x1={170} y1={620} x2={910} y2={620} stroke={C.text} strokeWidth={5} opacity={fade(build)} />
            <Cota x1={230} x2={830} y={660} texto="PATRIMÔNIO" p={pat} cor={G} />
            <g opacity={fade(stamp)} transform={`translate(330 690) scale(${mix(1.4, 1, Math.min(1, stamp))})`}>
              <Carimbo x={0} y={0} projeto="IMPÉRIO" folha="FOLHA 01 · PERSONAGEM FICTÍCIO" p={1} />
            </g>
            <g opacity={fade(seus)}>
              <rect x={150} y={170} width={290} height={110} rx={14} fill={aa(0.14)} stroke={G} strokeWidth={4} />
              <text x={295} y={216} textAnchor="middle" fill={G} fontFamily={M} fontWeight={700} fontSize={26}>E OS SEUS</text>
              <text x={295} y={256} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={26}>IMÓVEIS?</text>
            </g>
          </g>
        </Prancha>
      </Camera>
      <Title p={prog(t, c.c_muda - 0.1, 0.25) * (1 - prog(t, c.d_adorei - 0.6, 0.15))}>UM <span style={{ color: G }}>UNIVERSO</span> MAIOR</Title>
      <Title p={prog(t, c.d_adorei - 0.4, 0.25)}>QUEM ENTENDE DE <span style={{ color: G }}>PATRIMÔNIO</span></Title>
    </div>
  );
};
