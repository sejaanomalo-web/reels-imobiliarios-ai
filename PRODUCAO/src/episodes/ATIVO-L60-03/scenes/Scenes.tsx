import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { Giz, Lousa, Traco, caixa, check, seta, sublinha, xis } from "../../../estilos/lousa";

/**
 * ATIVO_L60_03 — "A IA não vende apartamento sozinha" (livro, Dia 05 / EP041). ESTILO 2 — DESENHO À MÃO (lousa).
 * Robô, agenda e tabela ILUSTRATIVOS, a giz. Sem promessa de IA/automação no produto; sem números.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const TOP = 400;
const Flut: React.FC<{ t: number; children: React.ReactNode }> = ({ t, children }) => <g transform={`translate(0 ${Math.sin(t * 1.5) * 10}) rotate(${Math.sin(t * 1.1) * 0.8} 540 440)`}>{children}</g>;

const robo = (x: number, y: number, s = 1) => {
  const k = (v: number) => v * s;
  return `M ${x - k(70)} ${y - k(260)} L ${x + k(70)} ${y - k(260)} L ${x + k(70)} ${y - k(150)} L ${x - k(70)} ${y - k(150)} Z M ${x} ${y - k(260)} L ${x} ${y - k(300)} M ${x - k(30)} ${y - k(215)} L ${x - k(14)} ${y - k(215)} M ${x + k(14)} ${y - k(215)} L ${x + k(30)} ${y - k(215)} M ${x - k(30)} ${y - k(180)} L ${x + k(30)} ${y - k(180)} M ${x - k(90)} ${y - k(130)} L ${x + k(90)} ${y - k(130)} L ${x + k(90)} ${y} L ${x - k(90)} ${y} Z`;
};
const braco = (x: number, y: number, ang: number, len = 200) => { const a = (ang * Math.PI) / 180; const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len; return { d: `M ${x} ${y} L ${ex} ${ey}`, ex, ey }; };
const chave = (x: number, y: number, s = 1) => `M ${x + 40 * s} ${y} A ${40 * s} ${40 * s} 0 1 1 ${x + 39.9 * s} ${y - 1} M ${x + 40 * s} ${y} L ${x + 200 * s} ${y} M ${x + 160 * s} ${y} L ${x + 160 * s} ${y + 34 * s} M ${x + 190 * s} ${y} L ${x + 190 * s} ${y + 24 * s}`;
const bolha = (x: number, y: number) => `M ${x - 70} ${y - 40} L ${x + 70} ${y - 40} Q ${x + 90} ${y - 40} ${x + 90} ${y - 20} L ${x + 90} ${y + 20} Q ${x + 90} ${y + 40} ${x + 70} ${y + 40} L ${x - 30} ${y + 40} L ${x - 60} ${y + 70} L ${x - 50} ${y + 40} L ${x - 70} ${y + 40} Q ${x - 90} ${y + 40} ${x - 90} ${y + 20} L ${x - 90} ${y - 20} Q ${x - 90} ${y - 40} ${x - 70} ${y - 40} Z`;
const maos = (x: number, y: number) => `M ${x - 110} ${y + 20} L ${x - 30} ${y - 10} L ${x + 10} ${y + 10} M ${x + 110} ${y + 20} L ${x + 30} ${y - 10} L ${x - 10} ${y + 10} M ${x - 30} ${y - 10} Q ${x} ${y - 30} ${x + 30} ${y - 10}`;
const doc = (x: number, y: number) => `M ${x - 60} ${y - 80} L ${x + 40} ${y - 80} L ${x + 60} ${y - 60} L ${x + 60} ${y + 80} L ${x - 60} ${y + 80} Z M ${x - 40} ${y - 40} L ${x + 40} ${y - 40} M ${x - 40} ${y - 10} L ${x + 40} ${y - 10} M ${x - 40} ${y + 40} Q ${x - 10} ${y + 20} ${x + 10} ${y + 45} T ${x + 40} ${y + 40}`;
const pessoa = (x: number, y: number) => `M ${x + 34} ${y - 150} A 34 34 0 1 1 ${x + 33.9} ${y - 151} M ${x} ${y - 116} L ${x} ${y - 30} M ${x} ${y - 30} L ${x - 30} ${y + 40} M ${x} ${y - 30} L ${x + 30} ${y + 40} M ${x} ${y - 95} L ${x - 40} ${y - 50} M ${x} ${y - 95} L ${x + 40} ${y - 50}`;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const rob = prog(t, -0.1, 1.2, ease.out);
  const arm = prog(t, 0.6, 0.8, ease.out);
  const freeze = prog(t, c.h_soz - 0.2, 0.3);
  const q = prog(t, c.h_perg - 0.3, 0.5, ease.out);
  const ang = mix(-40, -10, prog(t, 0.6, Math.max(1, c.h_soz - 0.8), ease.inOut));
  const b = braco(640, 560, ang, 180);
  const out = prog(t, c.a_quem - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={9} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: -2 }, { t: c.h_ia, s: 1.07, x: -2, y: -8, e: ease.out }, { t: c.h_soz, s: 1.09, x: 0, y: -12, e: ease.out }, { t: c.a_quem, s: 1.06, y: -14, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={6}>
          <Flut t={t}>
            <Traco d={robo(540, 760, 1.1)} p={rob} w={8} />
            <Traco d={b.d} p={arm} w={8} />
            <g transform={`translate(${b.ex - 30} ${b.ey})`}><Traco d={chave(0, 0, 1.2)} p={arm} w={8} cor={G} /></g>
            <Giz x={540} y={175} texto="vende sozinha!" p={prog(t, c.h_prom - 0.2, 0.8)} size={52} anchor="middle" cor={C.muted} rot={-3} />
            <Traco d={xis(540, 160, 240)} p={freeze} w={10} cor={W} />
            <Giz x={250} y={520} texto="?" p={q} size={220} anchor="middle" cor={W} rot={Math.sin(t * 3) * 6} />
          </Flut>
        </Lousa>
      </Camera>
      <Title p={fade(prog(t, -0.4, 0.4))}>A IA VENDE <span style={{ color: W }}>SOZINHA?</span></Title>
    </div>
  );
};

const TAREFAS = [{ k: "entender", at: "a_nec", d: (x: number) => bolha(x, 360) }, { k: "negociar", at: "a_neg", d: (x: number) => maos(x, 370) }, { k: "responder", at: "a_resp", d: (x: number) => doc(x, 370) }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_quem - 0.45, 0.3);
  const quem = prog(t, c.a_quem - 0.2, 0.6, ease.out);
  const out = prog(t, c.b_tec - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.a_quem - 0.45, s: 1.04, y: -4 }, { t: c.a_nec, s: 1.06, x: 4, y: -10, e: ease.out }, { t: c.a_neg, s: 1.06, x: 0, y: -10, e: ease.out }, { t: c.a_resp, s: 1.06, x: -4, y: -14, e: ease.out }, { t: c.b_tec, s: 1.05, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={9}>
          <Flut t={t}>
            <Giz x={540} y={150} texto="QUEM VAI…" p={quem} size={72} anchor="middle" />
            {TAREFAS.map((q, i) => {
              const x = 220 + i * 320;
              const p = prog(t, c[q.at] - 0.25, 0.8, ease.out);
              return (
                <g key={q.k}>
                  <Traco d={q.d(x)} p={p} w={7} cor={G} />
                  <Giz x={x} y={540} texto={q.k} p={p} size={44} anchor="middle" cor={G} />
                </g>
              );
            })}
            <Traco d={sublinha(160, 620, 760)} p={prog(t, c.a_resp + 0.4, 0.6)} w={7} />
            <Giz x={540} y={720} texto="…o comprador?" p={prog(t, c.a_resp + 0.5, 0.7)} size={52} anchor="middle" cor={C.muted} />
          </Flut>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.a_quem - 0.2, 0.25)}>FAÇA UMA <span style={{ color: G }}>PERGUNTA</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_tec - 0.45, 0.3);
  const grid = prog(t, c.b_tec - 0.2, 0.8, ease.out);
  const arm = prog(t, c.b_ajud - 0.2, 0.6, ease.out);
  const ph = prog(t, c.b_mas - 0.3, 0.3, ease.inOut);
  const nao = prog(t, c.b_subst - 0.1, 0.5, ease.out);
  const out = prog(t, c.c_antes - 0.45, 0.3, ease.in);
  const blocos = [0, 1, 2, 3].map((i) => prog(t, c.b_taref - 0.2 + i * 0.45, 0.4, ease.out));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.b_tec - 0.45, s: 1.04, y: -4 }, { t: c.b_taref, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.b_mas, s: 1.05, x: -2, y: -8, e: ease.out }, { t: c.b_conf, s: 1.08, y: -14, e: ease.out }, { t: c.c_antes, s: 1.05, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={11}>
          <Flut t={t}>
            <g opacity={1 - ph}>
              <Giz x={330} y={110} texto="agenda" p={grid} size={40} anchor="middle" />
              <Traco d={caixa(130, 140, 400, 400) + " M 130 240 L 530 240 M 130 340 L 530 340 M 130 440 L 530 440 M 330 140 L 330 540"} p={grid} w={5} />
              {blocos.map((p, i) => <rect key={i} x={140 + (i % 2) * 200} y={150 + Math.floor(i / 2) * 100 + (1 - p) * -60} width={180} height={80} rx={10} fill={`rgba(0,0,0,0)`} stroke={G} strokeWidth={6} opacity={fade(p)} />)}
              <Traco d={robo(700, 520, 0.7)} p={arm} w={6} />
              <Traco d={`M 760 400 L ${mix(760, 560, arm)} ${mix(400, 260, arm)}`} p={arm} w={7} />
              <Giz x={700} y={600} texto="tarefas" p={arm} size={38} anchor="middle" cor={G} />
              <Traco d={pessoa(870, 760)} p={prog(t, c.b_perm - 0.4, 0.8)} w={7} />
              <Giz x={850} y={850} texto="visita: humano" p={prog(t, c.b_perm - 0.2, 0.7)} size={32} anchor="middle" />
            </g>
            <g opacity={ph}>
              <Giz x={540} y={260} texto="julgamento comercial" p={prog(t, c.b_julg - 0.2, 0.7)} size={56} anchor="middle" />
              <Giz x={540} y={400} texto="confiança" p={prog(t, c.b_conf - 0.2, 0.6)} size={76} anchor="middle" cor={G} />
              <Traco d={robo(540, 760, 0.6)} p={nao} w={6} cor={C.muted} />
              <Traco d={xis(540, 660, 200)} p={nao} w={10} cor={W} />
              <Giz x={540} y={820} texto="não substitui" p={nao} size={48} anchor="middle" cor={W} />
            </g>
          </Flut>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.b_tec - 0.2, 0.25) * (1 - prog(t, c.b_mas - 0.4, 0.15))}>AJUDA EM <span style={{ color: G }}>TAREFAS</span></Title>
      <Title p={prog(t, c.b_mas - 0.2, 0.25)}>MAS <span style={{ color: W }}>NÃO SUBSTITUI</span></Title>
    </div>
  );
};

const COLS = [{ k: "TAREFA", ex: "lembrar retorno", at: "c_taref" }, { k: "LIMITE", ex: "só avisa", at: "c_lim" }, { k: "QUEM RESPONDE", ex: "o corretor", at: "c_quem" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_antes - 0.45, 0.3);
  const tab = prog(t, c.c_auto - 0.4, 1.0, ease.out);
  const hum = prog(t, c.c_hum - 0.2, 0.6, ease.out);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.c_antes - 0.45, s: 1.04, y: -4 }, { t: c.c_taref, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.c_lim, s: 1.06, x: 0, y: -10, e: ease.out }, { t: c.c_quem, s: 1.07, x: -3, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -16, e: ease.linear }]}>
        <Lousa top={TOP} h={880} seed={13}>
          <Flut t={t}>
            <Giz x={540} y={120} texto="antes de automatizar:" p={prog(t, c.c_antes - 0.2, 0.7)} size={50} anchor="middle" cor={C.muted} />
            <Traco d={caixa(130, 180, 820, 420) + " M 130 290 L 950 290 M 403 180 L 403 600 M 677 180 L 677 600"} p={tab} w={6} />
            {COLS.map((q, i) => {
              const x = 266 + i * 274;
              const p = prog(t, c[q.at] - 0.2, 0.6, ease.out);
              return (
                <g key={q.k}>
                  <Giz x={x} y={250} texto={q.k} p={p} size={q.k.length > 8 ? 28 : 40} anchor="middle" cor={G} />
                  <Giz x={x} y={420} texto={q.ex} p={prog(t, c[q.at] + 0.2, 0.6)} size={q.ex.length > 12 ? 30 : 36} anchor="middle" />
                  <Traco d={check(x - 30, 520, 60)} p={prog(t, c[q.at] + 0.5, 0.4)} w={9} cor={G} />
                </g>
              );
            })}
            <Traco d={seta(840, 700, 760, 620, -20)} p={hum} w={7} cor={G} />
            <Giz x={540} y={760} texto="decisão humana" p={hum} size={64} anchor="middle" cor={G} />
          </Flut>
        </Lousa>
      </Camera>
      <Title p={prog(t, c.c_antes - 0.2, 0.25)}>TAREFA · LIMITE · <span style={{ color: G }}>RESPONSÁVEL</span></Title>
    </div>
  );
};
