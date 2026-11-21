import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { Carimbo, Chamada, Comodo, Cota, Porta, Prancha } from "../../../estilos/planta";

/**
 * ATIVO_L60_04 — "O anúncio funcionou. O atendimento não." (livro, Dia 06 / EP051). ESTILO 3 — PLANTA TÉCNICA.
 * Funil como planta de cômodos, ILUSTRATIVO; sem plataformas de anúncio nem números de conversão.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });
const Flut: React.FC<{ t: number; children: React.ReactNode }> = ({ t, children }) => <g transform={`translate(0 ${Math.sin(t * 1.4) * 8})`}>{children}</g>;

/** Gotas que vazam por uma abertura (x,y) — leads perdidos. */
const Vazamento: React.FC<{ x: number; y: number; t: number; p: number; on: boolean }> = ({ x, y, t, p, on }) => (
  <g opacity={on ? fade(p) : 0}>
    {[0, 1, 2, 3].map((k) => {
      const ph = ((t * 0.9 + k * 0.25) % 1);
      return <circle key={k} cx={x + ph * 60} cy={y + ph * ph * 260} r={12 * (1 - ph * 0.5)} fill={W} opacity={1 - ph} />;
    })}
  </g>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ad = prog(t, -0.1, 0.9, ease.out);
  const exc = prog(t, c.h_exc - 0.2, 0.5, ease.out);
  const conv = prog(t, c.h_perder - 0.3, 0.7, ease.out);
  const clique = prog(t, c.h_clique - 0.3, 0.5, ease.out);
  const out = prog(t, c.a_int - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -2 }, { t: c.h_exc, s: 1.07, x: -2, y: -6, e: ease.out }, { t: c.h_perder, s: 1.05, x: 2, y: -14, e: ease.out }, { t: c.a_int, s: 1.07, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Flut t={t}>
            <Comodo x={210} y={90} w={660} h={230} p={ad} amb="ETAPA 01" titulo="ANÚNCIO" titleSize={52} />
            <Chamada x={780} y={150} bx={600} by={20} bw={320} texto="✓ EXCELENTE" p={exc} tone="accent" />
            <Porta x={500} y={320} r={80} p={clique} />
            <text x={620} y={385} fill={G} fontFamily="JetBrains Mono" fontWeight={700} fontSize={30} opacity={fade(clique)}>CLIQUE</text>
            <Comodo x={210} y={420} w={660} h={230} p={conv} amb="ETAPA 02" titulo="CONVERSA" sub="perdida depois do clique" tone="warn" titleSize={48} />
          </Flut>
        </Prancha>
      </Camera>
      <Title p={fade(prog(t, -0.4, 0.4))}>DEPOIS DO <span style={{ color: W }}>CLIQUE</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_int - 0.45, 0.3);
  const f1 = prog(t, c.a_form - 0.3, 0.7, ease.out);
  const f2 = prog(t, c.a_ning - 0.3, 0.7, ease.out);
  const leak = prog(t, c.a_ning, 0.5);
  const f3 = prog(t, c.a_passo - 0.4, 0.7, ease.out);
  const out = prog(t, c.b_antes - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_int - 0.45, s: 1.04, y: -4 }, { t: c.a_form, s: 1.06, x: 2, y: -8, e: ease.out }, { t: c.a_ning, s: 1.08, x: -3, y: -12, e: ease.out }, { t: c.a_passo, s: 1.07, x: 2, y: -18, e: ease.out }, { t: c.b_antes, s: 1.05, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Flut t={t}>
            <Comodo x={160} y={70} w={760} h={190} p={f1} amb="ENTRADA" titulo="FORMULÁRIO" titleSize={44} />
            <Porta x={500} y={260} r={60} p={f2} />
            <Comodo x={230} y={290} w={620} h={190} p={f2} amb="1º RETORNO" titulo="SEM DONO" tone="warn" titleSize={44} />
            <rect x={844} y={360} width={14} height={60} fill="#06100A" opacity={fade(f2)} />
            <Vazamento x={860} y={390} t={t} p={leak} on={t > c.a_ning - 0.1} />
            <Porta x={500} y={480} r={60} p={f3} aberta={false} />
            <Comodo x={300} y={510} w={480} h={190} p={f3} amb="PRÓXIMO PASSO" titulo="—" sub="sem registro" tone="warn" titleSize={56} />
          </Flut>
        </Prancha>
      </Camera>
      <Title p={prog(t, c.a_int - 0.2, 0.25)}>O LEAD <span style={{ color: W }}>VAZA</span></Title>
    </div>
  );
};

const PECAS = [{ k: "DONO", sub: "responsável", at: "b_resp", x: 160 }, { k: "ROTINA", sub: "acompanhamento", at: "b_rot", x: 430 }, { k: "HISTÓRICO", sub: "registro", at: "b_reg", x: 700 }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_antes - 0.45, 0.3);
  const cota = prog(t, c.b_antes - 0.2, 0.7, ease.out);
  const out = prog(t, c.c_mkt - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_antes - 0.45, s: 1.04, y: -4 }, { t: c.b_resp, s: 1.06, x: 4, y: -8, e: ease.out }, { t: c.b_rot, s: 1.06, x: 0, y: -10, e: ease.out }, { t: c.b_reg, s: 1.06, x: -4, y: -14, e: ease.out }, { t: c.c_mkt, s: 1.05, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Flut t={t}>
            <Cota x1={130} x2={950} y={60} texto="ANTES DE AUMENTAR O INVESTIMENTO" p={cota} cor={G} />
            <rect x={130} y={110} width={820} height={300} fill="none" stroke={C.text} strokeWidth={5} opacity={fade(cota)} />
            <text x={540} y={200} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={28} opacity={fade(cota)}>FUNIL DE ATENDIMENTO</text>
            {PECAS.map((q) => {
              const p = S(t, c[q.at] - 0.25);
              return (
                <g key={q.k} transform={`translate(0 ${(1 - Math.min(1, p)) * 260})`} opacity={fade(p)}>
                  <Comodo x={q.x} y={240} w={250} h={150} p={1} titulo={q.k} sub={q.sub} titleSize={q.k.length > 7 ? 32 : 38} />
                </g>
              );
            })}
            <Chamada x={540} y={410} bx={300} by={520} bw={480} texto="✓ VAZAMENTO FECHADO" p={prog(t, c.b_reg + 0.4, 0.5)} tone="accent" />
          </Flut>
        </Prancha>
      </Camera>
      <Title p={prog(t, c.b_antes - 0.2, 0.25)}>CONFIRA <span style={{ color: G }}>ANTES</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_mkt - 0.45, 0.3);
  const m = prog(t, c.c_mkt - 0.2, 0.7, ease.out);
  const pr = prog(t, c.c_proc - 0.2, 0.7, ease.out);
  const door = prog(t, c.c_cont - 0.1, 0.5, ease.out);
  const stamp = S(t, c.c_parte - 0.1);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_mkt - 0.45, s: 1.04, y: -4 }, { t: c.c_mkt, s: 1.06, x: 4, y: -8, e: ease.out }, { t: c.c_proc, s: 1.06, x: -4, y: -8, e: ease.out }, { t: c.c_parte, s: 1.07, x: 0, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -16, e: ease.linear }]}>
        <Prancha top={TOP} h={880}>
          <Flut t={t}>
            <Comodo x={130} y={110} w={400} h={330} p={m} amb="GERA" titulo="MARKETING" sub="conversas possíveis" titleSize={40} />
            <Comodo x={550} y={110} w={400} h={330} p={pr} amb="DÁ CONTINUIDADE" titulo="PROCESSO" sub="comercial" titleSize={42} />
            <Porta x={530} y={330} r={60} p={door} />
            <rect x={520} y={250} width={40} height={20} fill={aa(0.0)} />
            <g opacity={fade(stamp)} transform={`translate(330 520) scale(${mix(1.4, 1, Math.min(1, stamp))})`}>
              <Carimbo x={0} y={0} projeto="FUNIL COMPLETO" folha="UMA NÃO SUBSTITUI A OUTRA" p={1} />
            </g>
          </Flut>
        </Prancha>
      </Camera>
      <Title p={prog(t, c.c_mkt - 0.2, 0.25)}>MARKETING <span style={{ color: G }}>+</span> PROCESSO</Title>
    </div>
  );
};
