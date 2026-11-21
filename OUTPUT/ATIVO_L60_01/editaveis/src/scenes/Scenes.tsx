import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { Balao, Boneco, Casinha, Chao, GIZ, Palco, Placa } from "../../../estilos/palitinho";

/**
 * ATIVO_L60_01 — "O que responder depois do “disponível?”" (livro, Dia 02 / EP011). ESTILO 1 — PALITINHO (esteira).
 * Cliente e corretor são bonecos ILUSTRATIVOS; conversa SIMULADA (sem interface real de mensageiro).
 * Corretor em giz quando erra (só "Sim."), em verde quando acerta (resposta + duas opções). Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, Math.max(0, p) * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const G = A.hex;
const FEET = 700; // pés dos bonecos (coordenadas do Palco)
const PTOP = 400;

/** Risco vermelho sobre um balão (progresso p). */
const Risco: React.FC<{ x: number; y: number; w: number; p: number }> = ({ x, y, w, p }) => (
  <line x1={x} y1={y} x2={x + (w * Math.min(1, Math.max(0, p)))} y2={y - 8} stroke={C.warn} strokeWidth={8} strokeLinecap="round" opacity={p > 0 ? 1 : 0} />
);

/** Cartão de opção (SVG): rótulo mono + texto. */
const Opcao: React.FC<{ x: number; y: number; w: number; rot: string; texto: string; p: number; on: number }> = ({ x, y, w, rot, texto, p, on }) => {
  const k = Math.min(1, Math.max(0, p));
  return (
    <g opacity={fade(p)} transform={`translate(${x + w / 2} ${y + 60}) scale(${0.6 + 0.4 * Math.min(1.06, k)}) translate(${-(x + w / 2)} ${-(y + 60)})`}>
      <rect x={x} y={y} width={w} height={124} rx={26} fill={on > 0.5 ? aa(0.16) : C.surface} stroke={on > 0.5 ? G : C.surface3} strokeWidth={4} />
      <text x={x + w / 2} y={y + 44} textAnchor="middle" fill={on > 0.5 ? G : C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={24}>{rot}</text>
      <text x={x + w / 2} y={y + 92} textAnchor="middle" fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={31}>{texto}</text>
    </g>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const ppl = sp(t, -0.25, { damping: 12, stiffness: 170 });
  const ask = sp(t, c.h_disp - 0.35, { damping: 11, stiffness: 210 });
  const sim = sp(t, c.h_nao - 0.1, { damping: 11, stiffness: 230 });
  const cut = prog(t, c.h_sim - 0.12, 0.35, ease.out);
  const so = sp(t, c.h_sim - 0.05, { damping: 10, stiffness: 240 });
  const out = prog(t, c.a_claro - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={7} t={t} keys={[{ t: 0, s: 1.05, x: 3, y: -4 }, { t: c.h_disp, s: 1.08, x: 4, y: -10, e: ease.out }, { t: c.h_nao, s: 1.06, x: -3, y: -14, e: ease.linear }, { t: c.h_sim, s: 1.07, x: -1, y: -20, e: ease.out }, { t: c.a_claro, s: 1.06, y: -22, e: ease.linear }]}>
        <Palco top={PTOP} h={880}>
          <Chao y={FEET} />
          <Boneco x={220 - 60 * (1 - Math.min(1, ppl))} y={FEET} t={t} pose="celular" opacity={fade(ppl)} />
          <Boneco x={860 + 60 * (1 - Math.min(1, ppl))} y={FEET} t={t + 1} pose="celular" olhar={-1} opacity={fade(ppl)} />
          <Balao x={70} y={300} w={450} texto="Ainda está disponível?" lado="esq" p={ask} size={32} />
          <Balao x={660} y={300} w={300} texto="Sim." lado="dir" tone={cut > 0.5 ? "warn" : "plain"} p={sim} size={40} />
          <Risco x={680} y={360} w={260} p={cut} />
          <Placa x={340} y={140} w={400} texto="✕ SÓ “SIM”" tone="warn" size={30} p={so} />
        </Palco>
      </Camera>
      <Title p={title} size={60}>AINDA ESTÁ <span style={{ color: G }}>DISPONÍVEL?</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_claro - 0.35, { damping: 15, stiffness: 150 });
  const house = prog(t, c.a_claro - 0.1, 0.9, ease.out);
  const ok = sp(t, c.a_conf - 0.1, { damping: 11, stiffness: 220 });
  const turn = prog(t, c.a_mas - 0.15, 0.35, ease.out);
  const sim = sp(t, c.a_parar - 0.1, { damping: 11, stiffness: 230 });
  const dots = sp(t, c.a_parar + 0.7, { damping: 12, stiffness: 200 });
  const leave = prog(t, c.a_ctx - 0.5, Math.max(1, c.a_dir - c.a_ctx + 1.0), ease.inOut);
  const ctx = sp(t, c.a_ctx - 0.1, { damping: 10, stiffness: 240 });
  const dir = sp(t, c.a_dir - 0.1, { damping: 10, stiffness: 240 });
  const out = prog(t, c.b_pode - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.a_claro - 0.35, s: 1.06, y: -6 }, { t: c.a_conf, s: 1.1, x: 0, y: -16, e: ease.out }, { t: c.a_mas, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.a_ctx, s: 1.06, x: -2, y: -16, e: ease.linear }, { t: c.b_pode, s: 1.05, x: 0, y: -20, e: ease.linear }]}>
        <Palco top={PTOP} h={880}>
          <Chao y={FEET} />
          <g opacity={1 - turn * 0.9} transform={`translate(540 ${FEET}) scale(${mix(1, 0.8, turn)}) translate(-540 ${-FEET})`}>
            <Casinha x={540} y={FEET + 60} s={0.8} p={house} cor={ok > 0.5 ? G : GIZ} />
            <Placa x={380} y={330} w={320} texto="✓ DISPONÍVEL" tone="accent" size={28} p={ok} />
          </g>
          <Boneco x={mix(220, 70, leave)} y={FEET} t={t} pose={turn > 0.5 ? "parado" : "celular"} olhar={leave > 0.15 ? -1 : 1} andar={leave} opacity={mix(1, 0.35, leave)} />
          <Boneco x={860} y={FEET} t={t + 1} pose={c.a_ctx - 0.2 < t ? "pensa" : "celular"} olhar={-1} />
          {turn > 0.01 ? <Balao x={650} y={300} w={300} texto="Sim." lado="dir" p={sim} size={40} /> : null}
          {turn > 0.01 ? <Balao x={60} y={330} w={220} h={90} texto="…" lado="esq" tone="muted" p={dots * (1 - leave)} size={48} /> : null}
          <Placa x={120} y={140} w={380} texto="✕ CONTEXTO" tone="warn" size={30} p={ctx} />
          <Placa x={580} y={140} w={380} texto="✕ DIREÇÃO" tone="warn" size={30} p={dir} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.a_claro - 0.05, 0.25) * (1 - prog(t, c.a_mas - 0.2, 0.15))}>CONFIRME <span style={{ color: G }}>ANTES</span></Title>
      <Title p={prog(t, c.a_mas - 0.02, 0.25)}>E DEPOIS DO <span style={{ color: C.warn }}>“SIM”</span>?</Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_pode - 0.35, { damping: 15, stiffness: 150 });
  const back = prog(t, c.b_pode - 0.35, 0.9, ease.out);
  const yes = sp(t, c.b_sim - 0.15, { damping: 11, stiffness: 220 });
  const fork = prog(t, c.b_quer - 0.1, 0.8, ease.inOut);
  const o1 = sp(t, c.b_planta - 0.15, { damping: 11, stiffness: 220 });
  const o2 = sp(t, c.b_prefere - 0.1, { damping: 11, stiffness: 220 });
  const on1 = prog(t, c.b_det - 0.05, 0.2) * (1 - prog(t, c.b_prefere, 0.2));
  const on2 = prog(t, c.b_visita - 0.05, 0.2);
  const ou = sp(t, c.b_prefere - 0.25, { damping: 10, stiffness: 240 });
  const out = prog(t, c.c_obj - 0.4, 0.35, ease.in);
  const bx = 760, by = 300;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.b_pode - 0.35, s: 1.05, y: -8 }, { t: c.b_sim, s: 1.07, x: -3, y: -14, e: ease.out }, { t: c.b_quer, s: 1.03, x: 0, y: -4, e: ease.out }, { t: c.b_prefere, s: 1.05, x: 3, y: -10, e: ease.linear }, { t: c.c_obj, s: 1.04, x: 0, y: -16, e: ease.linear }]}>
        <Palco top={PTOP} h={880}>
          <Chao y={FEET} />
          <Boneco x={mix(70, 220, back)} y={FEET} t={t} pose={t > c.b_visita + 0.3 ? "aponta" : t > c.b_quer ? "pensa" : "parado"} andar={back} opacity={mix(0.35, 1, back)} />
          <Boneco x={860} y={FEET} t={t + 1} pose="celular" olhar={-1} cor={G} />
          <Balao x={480} y={by} w={520} texto="Está disponível, sim!" lado="dir" tone="accent" p={yes} size={34} />
          <path d={`M ${bx - 30} ${by} C ${bx - 60} ${by - 60}, 330 ${by - 40}, 295 ${by - 112}`} fill="none" stroke={on1 > 0.5 ? G : C.dim} strokeWidth={6} strokeLinecap="round" strokeDasharray="14 14" opacity={fork} />
          <path d={`M ${bx + 20} ${by} C ${bx + 30} ${by - 50}, 780 ${by - 60}, 785 ${by - 112}`} fill="none" stroke={on2 > 0.5 ? G : C.dim} strokeWidth={6} strokeLinecap="round" strokeDasharray="14 14" opacity={fork} />
          <Opcao x={90} y={64} w={410} rot="OPÇÃO 1" texto="Planta e detalhes" p={o1} on={on1} />
          <Opcao x={580} y={64} w={410} rot="OPÇÃO 2" texto="Condições da visita" p={o2} on={on2} />
          <g opacity={fade(ou) * (1 - prog(t, c.b_visita + 0.2, 0.3))}>
            <circle cx={540} cy={126} r={36} fill={C.bg0} stroke={C.surface3} strokeWidth={4} />
            <text x={540} y={137} textAnchor="middle" fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={30}>ou</text>
          </g>
        </Palco>
      </Camera>
      <Title p={prog(t, c.b_pode - 0.05, 0.25)}>RESPONDA E <span style={{ color: G }}>PERGUNTE</span></Title>
    </div>
  );
};

/** Degraus do "próximo passo" (traço giz, o degrau atual em verde). */
const Degraus: React.FC<{ p: number; atual: number }> = ({ p, atual }) => {
  const steps = [{ x: 300, top: FEET + 12 }, { x: 480, top: FEET - 58 }, { x: 660, top: FEET - 128 }];
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {steps.map((s, i) => {
        const k = prog(p, i * 0.22, 0.45);
        const on = atual >= i + 1;
        return <rect key={i} x={s.x} y={s.top + (1 - k) * 40} width={180} height={FEET + 62 - s.top - (1 - k) * 40} rx={10} fill={on ? aa(0.14) : "none"} stroke={on ? G : GIZ} strokeWidth={6} opacity={fade(k)} />;
      })}
    </g>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_obj - 0.35, { damping: 15, stiffness: 150 });
  const press = sp(t, c.c_obj - 0.05, { damping: 11, stiffness: 220 });
  const strike = prog(t, c.c_press + 0.15, 0.4, ease.out);
  const stairs = prog(t, c.c_ofer - 0.3, 1.0, ease.linear);
  const field = sp(t, c.c_passo - 0.25, { damping: 12, stiffness: 200 });
  const typed = prog(t, c.c_passo + 0.1, 1.1, ease.linear);
  const up1 = prog(t, c.c_passo - 0.1, 0.8, ease.inOut);
  const ask = sp(t, c.c_info - 0.15, { damping: 11, stiffness: 220 });
  const up2 = prog(t, c.c_decidir - 0.2, 0.7, ease.inOut);
  const dec = sp(t, c.c_decidir - 0.05, { damping: 10, stiffness: 230 });
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  const VAL = "Enviar planta e detalhes";
  const shown = VAL.slice(0, Math.round(VAL.length * typed));
  const cx = mix(mix(200, 390, up1), 570, up2);
  const cy = mix(mix(FEET, FEET - 46, up1), FEET - 116, up2);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={7} t={t} keys={[{ t: c.c_obj - 0.35, s: 1.05, y: -10 }, { t: c.c_press, s: 1.09, x: 0, y: -18, e: ease.out }, { t: c.c_ofer, s: 1.05, x: 3, y: -8, e: ease.out }, { t: c.c_info, s: 1.07, x: -3, y: -12, e: ease.linear }, { t: c.cta_quer, s: 1.05, x: 0, y: -18, e: ease.linear }]}>
        <Palco top={PTOP} h={880}>
          <Chao y={FEET} />
          <Degraus p={stairs} atual={up2 > 0.5 ? 2 : up1 > 0.5 ? 1 : 0} />
          <Boneco x={cx} y={cy} t={t} pose={dec > 0.5 ? "comemora" : ask > 0.5 ? "celular" : "parado"} andar={up1 < 1 ? up1 : up2} />
          <Boneco x={920} y={FEET} t={t + 1} pose={t > c.c_ofer ? "aponta" : "bracos"} olhar={-1} cor={G} />
          <g opacity={fade(press) * (1 - prog(t, c.c_ofer - 0.3, 0.3))}>
            <Placa x={300} y={150} w={480} texto="PRESSIONAR" tone="warn" size={34} p={press} />
            <line x1={290} y1={196} x2={290 + 500 * strike} y2={186} stroke={C.warn} strokeWidth={9} strokeLinecap="round" opacity={strike > 0 ? 1 : 0} />
          </g>
          <g opacity={fade(field)} transform={`translate(0 ${(1 - Math.min(1, field)) * 30})`}>
            <rect x={150} y={110} width={780} height={150} rx={28} fill={C.surface} stroke={typed >= 1 ? G : C.surface3} strokeWidth={4} />
            <text x={190} y={162} fill={G} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26}>PRÓXIMO PASSO</text>
            <text x={190} y={222} fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={40}>{shown}<tspan fill={G} opacity={typed < 1 && Math.sin(t * 12) > 0 ? 1 : 0}>|</tspan></text>
            {typed >= 1 ? <text x={890} y={222} textAnchor="end" fill={G} fontFamily="Manrope" fontWeight={800} fontSize={44}>✓</text> : null}
          </g>
          <Balao x={170} y={300} w={440} texto="Me envia a planta!" lado="baixo" p={ask * (1 - prog(t, c.c_decidir - 0.25, 0.25))} size={32} />
          <Placa x={170} y={300} w={360} texto="✓ AJUDA A DECIDIR" tone="accent" size={26} p={dec} />
        </Palco>
      </Camera>
      <Title p={prog(t, c.c_obj - 0.05, 0.25)}>UM <span style={{ color: G }}>PRÓXIMO PASSO</span> ÚTIL</Title>
    </div>
  );
};

