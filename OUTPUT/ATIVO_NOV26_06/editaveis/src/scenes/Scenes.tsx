import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_06 — "Menos intenção de compra, mais critério". Dado: Raio-X FipeZAP 3º tri 2026 — intenção de compra nos 3 meses
 * seguintes 38% (3º tri 2025) → 35% (3º tri 2026), 758 respondentes, usuários de portais. Comparação anual; recorte e período na tela;
 * eixo começa em zero (sem exagerar a queda). Leads e quadro ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const big = sp(t, -0.15, { damping: 12, stiffness: 150 });
  const line = prog(t, c.h_35 - 0.1, 0.9, ease.inOut);
  const src = prog(t, c.h_pesq - 0.1, 0.4, ease.out);
  const who = sp(t, c.h_acabou - 0.15, { damping: 11, stiffness: 200 });
  const q = sp(t, c.h_comp, { damping: 10, stiffness: 220 });
  const out = prog(t, c.a_nao - 0.4, 0.35, ease.in);
  const x0 = 250, x1 = 830, y0 = 955 - 38 * 4, y1 = 955 - 35 * 4;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_35)) / 2 + 0, s: 1.150, x: 19, y: -18, e: ease.inOut }, { t: c.h_35, s: 1.06, x: 10, y: -15, e: ease.inOut }, { t: ((c.h_35) + (c.h_pesq + 0.4)) / 2 + 0, s: 1.120, x: -15, y: -18, e: ease.inOut }, { t: c.h_pesq + 0.4, s: 1.09, x: -12, y: -20, e: ease.inOut }, { t: ((c.h_pesq + 0.4) + (c.h_acabou)) / 2 + 0, s: 1.120, x: 8, y: -18, e: ease.inOut }, { t: c.h_acabou, s: 1.04, x: 0, y: -40, e: ease.inOut }, { t: c.a_nao, s: 1.08, x: 0, y: -30, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", opacity: mix(0.75, 1, Math.min(1, big * 2)), transform: `scale(${mix(0.9, 1, Math.min(1.04, big))})` }}>
          <div style={{ fontWeight: 800, fontSize: 250, lineHeight: 0.9, letterSpacing: "-0.06em", color: C.text, textShadow: `0 0 60px ${aa(0.25)}` }}>35<span style={{ color: A.hex }}>%</span></div>
          <div style={{ marginTop: 6, fontFamily: F.mono, fontWeight: 700, fontSize: 40, letterSpacing: "0.12em", color: A.hex }}>INTENÇÃO</div>
        </div>
        {/* só dois pontos reais: 3º tri 2025 → 3º tri 2026 */}
        <svg width={1080} height={1100} style={{ position: "absolute", left: 0, top: 0, opacity: fade(line * 2) }}>
          <line x1={x0} y1={y0} x2={mix(x0, x1, line)} y2={mix(y0, y1, line)} stroke={C.warn} strokeWidth={8} strokeLinecap="round" />
          <circle cx={x0} cy={y0} r={14} fill={C.surface3} stroke={C.muted} strokeWidth={4} />
          {line > 0.95 ? <circle cx={x1} cy={y1} r={16 + 3 * Math.sin(t * 6)} fill={C.warn} /> : null}
        </svg>
        <div style={{ position: "absolute", left: x0 - 110, top: y0 - 70, width: 220, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.muted, opacity: fade(line * 2) }}>38%</div>
        <div style={{ position: "absolute", left: x1 - 110, top: y1 + 26, width: 220, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.warn, opacity: fade((line - 0.8) * 5) }}>35%</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: src }}><Tag text="PESQUISA RAIO-X FIPEZAP · 3º TRI 2025 → 3º TRI 2026" tone="muted" size={24} /></div>
        {who > 0.001 ? (
          <div style={{ position: "absolute", left: 150, right: 150, top: 1070, boxSizing: "border-box", padding: "16px 30px", borderRadius: 28, background: C.surface, border: `2px solid rgba(255,107,94,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 48, opacity: fade(who), transform: `translateY(${(1 - Math.min(1, who)) * 70}px)` }}>
            <Person size={78} q={q} t={t} />
            <span style={{ fontWeight: 800, fontSize: 38, color: C.text, whiteSpace: "nowrap" }}>ACABOU O <span style={{ color: C.warn }}>COMPRADOR?</span></span>
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={52}>A INTENÇÃO DE COMPRA <span style={{ color: C.warn }}>CAIU</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_nao - 0.35, { damping: 15, stiffness: 150 });
  const b1 = prog(t, c.a_nao - 0.2, 0.7, ease.out);
  const b2 = prog(t, c.a_nao + 0.15, 0.7, ease.out);
  const amostra = sp(t, c.a_usu - 0.15, { damping: 12, stiffness: 200 });
  const decl = sp(t, c.a_decl - 0.2, { damping: 12, stiffness: 200 });
  const dem = sp(t, c.a_dem - 0.2, { damping: 12, stiffness: 200 });
  const shot = sp(t, c.a_foto - 0.1, { damping: 13, stiffness: 220 });
  const flash = Math.max(0, 1 - Math.abs(t - c.a_foto) / 0.12) * 0.35;
  const grupo = sp(t, c.a_grupo - 0.15, { damping: 12, stiffness: 200 });
  const per = sp(t, c.a_per - 0.15, { damping: 12, stiffness: 200 });
  const out = prog(t, c.b_agora - 0.4, 0.35, ease.in);
  const base = 1000, k = 11;
  const Bar: React.FC<{ x: number; v: number; p: number; lab: string; hi?: boolean }> = ({ x, v, p, lab, hi }) => (
    <>
      <div style={{ position: "absolute", left: x, top: base - v * k * p, width: 190, height: v * k * p, borderRadius: "18px 18px 4px 4px", background: hi ? A.hex : C.surface3, boxShadow: hi ? `0 0 40px ${aa(0.25)}` : "none" }} />
      <div style={{ position: "absolute", left: x - 20, width: 230, top: base - v * k * p - 74, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: hi ? C.text : C.muted, opacity: fade((p - 0.6) * 3) }}>{v}%</div>
      <div style={{ position: "absolute", left: x - 20, width: 230, top: base + 16, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: hi ? C.text : C.muted, opacity: fade(p) }}>{lab}</div>
    </>
  );
  const Chip: React.FC<{ p: number; top: number; ok: boolean; children: React.ReactNode }> = ({ p, top, ok, children }) => (p > 0.001 ? (
    <div style={{ position: "absolute", left: 650, width: 330, top, boxSizing: "border-box", padding: "16px 20px", borderRadius: 22, background: ok ? aa(0.1) : WARN_BG, border: `2px solid ${ok ? A.hex : "rgba(255,107,94,0.6)"}`, display: "flex", alignItems: "center", gap: 14, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * 90 + Math.sin(t * 2 + top) * 4}px)` }}>
      <span style={{ fontWeight: 800, fontSize: 40, color: ok ? A.hex : C.warn, flex: "none" }}>{ok ? "✓" : "✕"}</span>
      <span style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.08, color: C.text }}>{children}</span>
    </div>
  ) : null);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_nao - 0.35, s: 1.05, y: 0 }, { t: ((c.a_nao - 0.35) + (c.a_usu + 0.2)) / 2 + 0, s: 1.110, x: 9, y: -18, e: ease.inOut }, { t: c.a_usu + 0.2, s: 1.08, x: -10, y: -15, e: ease.inOut }, { t: ((c.a_usu + 0.2) + (c.a_decl + 0.2)) / 2 + 0, s: 1.110, x: -12, y: -18, e: ease.inOut }, { t: c.a_decl + 0.2, s: 1.06, x: 15, y: -10, e: ease.inOut }, { t: ((c.a_decl + 0.2) + (c.a_dem + 0.2)) / 2 + 0, s: 1.120, x: 30, y: -18, e: ease.inOut }, { t: c.a_dem + 0.2, s: 1.09, x: 18, y: -18, e: ease.inOut }, { t: ((c.a_dem + 0.2) + (c.a_foto + 0.15)) / 2 + 0, s: 1.120, x: -5, y: -18, e: ease.inOut }, { t: c.a_foto + 0.15, s: 1.02, x: 0, y: -5, e: ease.inOut }, { t: ((c.a_foto + 0.15) + (c.a_per + 0.3)) / 2 + 0, s: 1.110, x: 19, y: -18, e: ease.inOut }, { t: c.a_per + 0.3, s: 1.08, x: 10, y: -20, e: ease.inOut }, { t: c.b_agora, s: 1.05, y: -10, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(amostra), transform: `scale(${mix(0.6, 1, Math.min(1.05, amostra))})` }}><Tag text="AMOSTRA: 758 USUÁRIOS DE PORTAIS" tone="accent" size={26} /></div>
        <div style={{ position: "absolute", left: 90, width: 520, top: base, height: 4, borderRadius: 2, background: C.dim }} />
        <Bar x={120} v={38} p={b1} lab="3º TRI 2025" />
        <Bar x={390} v={35} p={b2} lab="3º TRI 2026" hi />
        <Chip p={decl} top={560} ok>INTENÇÃO DECLARADA</Chip>
        <Chip p={dem} top={690} ok={false}>DEMANDA SUMIU</Chip>
        <Chip p={grupo} top={820} ok>UM GRUPO ESPECÍFICO</Chip>
        <Chip p={per} top={950} ok>5/10 A 3/11/2026</Chip>
        {/* moldura de fotografia em volta do gráfico */}
        {shot > 0.001 ? [[70, 480, 1, 1], [610, 480, -1, 1], [70, 1080, 1, -1], [610, 1080, -1, -1]].map(([x, y, sx, sy], i) => {
          const d = (1 - Math.min(1, shot)) * 60;
          return <div key={i} style={{ position: "absolute", left: x - (sx < 0 ? 60 : 0) - sx * d, top: y - (sy < 0 ? 60 : 0) - sy * d, width: 60, height: 60, boxSizing: "border-box", borderLeft: sx > 0 ? `6px solid ${C.text}` : "none", borderRight: sx < 0 ? `6px solid ${C.text}` : "none", borderTop: sy > 0 ? `6px solid ${C.text}` : "none", borderBottom: sy < 0 ? `6px solid ${C.text}` : "none", opacity: fade(shot) }} />;
        }) : null}
        {shot > 0.001 ? <div style={{ position: "absolute", left: 650, top: 482, opacity: fade(shot) }}><Tag text="● FOTOGRAFIA" tone="warn" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 1110, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, opacity: fade(b2) }}>INTENÇÃO DE COMPRAR NOS 3 MESES SEGUINTES · FONTE: RAIO-X FIPEZAP</div>
      </Camera>
      {flash > 0 ? <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} /> : null}
      <Title p={enter} size={56}>INTENÇÃO <span style={{ color: A.hex }}>NÃO É VENDA</span></Title>
    </div>
  );
};

const LEADS = [
  { k: "SÓ PESQUISANDO", at: "b_um", clock: 0.12 },
  { k: "MUDA EM 3 MESES", at: "b_outro", clock: 0.5 },
  { k: "ENTRADA SEPARADA", at: "b_terc", clock: 0.9 },
];

const Clock: React.FC<{ v: number; size: number; color: string; t: number }> = ({ v, size, color, t }) => {
  const r = size / 2 - 8, L = 2 * Math.PI * r, a = v * 2 * Math.PI - Math.PI / 2 + Math.sin(t * 2) * 0.05;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={C.surface3} strokeWidth={10} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={10} fill="none" strokeDasharray={`${L * v} ${L}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <line x1={size / 2} y1={size / 2} x2={size / 2 + Math.cos(a) * r * 0.7} y2={size / 2 + Math.sin(a) * r * 0.7} stroke={C.text} strokeWidth={6} strokeLinecap="round" />
      <circle cx={size / 2} cy={size / 2} r={7} fill={C.text} />
    </svg>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_agora - 0.35, { damping: 15, stiffness: 150 });
  const team = sp(t, c.b_agora + 0.2, { damping: 13, stiffness: 180 });
  const cards = LEADS.map((l) => sp(t, c[l.at] - 0.2, { damping: 12, stiffness: 200 }));
  const clocks = LEADS.map((l, i) => prog(t, c[l.at] + 0.1, 0.9 + i * 0.2, ease.out));
  const tres = prog(t, c.b_tres - 0.1, 0.5, ease.out);
  const entr = sp(t, c.b_entr - 0.1, { damping: 11, stiffness: 210 });
  const same = sp(t, c.b_trat - 0.15, { damping: 12, stiffness: 200 });
  const amanha = sp(t, c.b_amanha - 0.15, { damping: 11, stiffness: 210 });
  const noise = prog(t, c.b_ruido - 0.1, 0.5, ease.out);
  const out = prog(t, c.c_vez - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_agora - 0.35, s: 1.05, y: 0 }, { t: ((c.b_agora - 0.35) + (c.b_um + 0.2)) / 2 + 0, s: 1.120, x: 26, y: -18, e: ease.inOut }, { t: c.b_um + 0.2, s: 1.08, x: 14, y: -15, e: ease.inOut }, { t: ((c.b_um + 0.2) + (c.b_outro + 0.2)) / 2 + 0, s: 1.120, x: -2, y: -18, e: ease.inOut }, { t: c.b_outro + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut }, { t: ((c.b_outro + 0.2) + (c.b_terc + 0.2)) / 2 + 0, s: 1.120, x: 1, y: -18, e: ease.inOut }, { t: c.b_terc + 0.2, s: 1.08, x: -14, y: -15, e: ease.inOut }, { t: ((c.b_terc + 0.2) + (c.b_trat + 0.2)) / 2 + 0, s: 1.120, x: -27, y: -18, e: ease.inOut }, { t: c.b_trat + 0.2, s: 1.03, x: 0, y: -40, e: ease.inOut }, { t: ((c.b_trat + 0.2) + (c.b_ruido + 0.2)) / 2 + 0, s: 1.110, x: 14, y: -18, e: ease.inOut }, { t: c.b_ruido + 0.2, s: 1.08, x: 0, y: -45, e: ease.inOut }, { t: c.c_vez, s: 1.05, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(team) }}><Tag text="LEADS ILUSTRATIVOS · MESMA EQUIPE COMERCIAL" tone="muted" size={24} /></div>
        {LEADS.map((l, i) => <div key={"ph" + i} style={{ position: "absolute", left: 85 + i * 310, top: 500, width: 290, height: 440, boxSizing: "border-box", borderRadius: 30, border: `2px dashed ${C.dim}`, opacity: fade(team) * 0.7 * (1 - Math.min(1, cards[i] * 2)) }} />)}
        {LEADS.map((l, i) => {
          const p = cards[i];
          const shake = noise * Math.sin(t * 30 + i * 2) * 6;
          return p > 0.001 ? (
            <div key={l.k} style={{ position: "absolute", left: 85 + i * 310, top: 500, width: 290, height: 440, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${noise > 0.5 ? "rgba(255,107,94,0.5)" : i === 2 && entr > 0.5 ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "26px 14px", gap: 18, opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 90}px) translateX(${shake}px)` }}>
              <Person size={96} t={t} />
              <Clock v={clocks[i] * l.clock} size={150} color={i === 2 ? A.hex : i === 1 ? C.text : C.muted} t={t + i} />
              <span style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.05, textAlign: "center", color: i === 1 && tres > 0.5 ? C.text : i === 2 && entr > 0.5 ? A.hex : C.text }}>{l.k}</span>
            </div>
          ) : null;
        })}
        {/* a mesma mensagem para os três */}
        {same > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 990, display: "flex", justifyContent: "center", opacity: fade(same), transform: `scale(${mix(0.6, 1, Math.min(1.05, same))})` }}>
            <Msg side="out" tone={noise > 0.5 ? "warn" : "plain"} size={40}>{amanha > 0.3 ? "Vamos fechar amanhã?" : "Mensagem igual para os três"}</Msg>
          </div>
        ) : null}
        {noise > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1120, display: "flex", justifyContent: "center", opacity: noise }}><Tag text="+ RUÍDO" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={52}>MOMENTOS DE COMPRA <span style={{ color: A.hex }}>DIFERENTES</span></Title>
    </div>
  );
};

const ROWS = [
  { k: "MOTIVO", v: "Por que agora?", at: "c_mot" },
  { k: "PRAZO", v: "Até quando?", at: "c_prazo" },
  { k: "PRÓXIMO PASSO", v: "Visita, proposta ou retorno?", at: "c_prox" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_vez - 0.35, { damping: 15, stiffness: 150 });
  const spam = [0, 1, 2].map((i) => sp(t, c.c_vez + i * 0.35, { damping: 12, stiffness: 210 }));
  const strike = prog(t, c.c_mot - 0.9, 0.4, ease.out);
  const spamOut = prog(t, c.c_mot - 0.5, 0.4, ease.in);
  const board = sp(t, c.c_mot - 0.45, { damping: 14, stiffness: 170 });
  const rows = ROWS.map((r) => sp(t, c[r.at] - 0.1, { damping: 12, stiffness: 210 }));
  const evo = prog(t, c.c_clar - 0.4, 0.9, ease.inOut);
  const adiv = sp(t, c.c_adiv - 0.1, { damping: 11, stiffness: 210 });
  const fin = sp(t, c.x_qual - 0.15, { damping: 13, stiffness: 180 });
  const lowOut = prog(t, c.x_qual - 0.3, 0.3, ease.in);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_vez - 0.35, s: 1.05, y: 0 }, { t: ((c.c_vez - 0.35) + (c.c_mot - 0.5)) / 2 + 0, s: 1.110, x: 21, y: -18, e: ease.inOut }, { t: c.c_mot - 0.5, s: 1.08, x: 15, y: -15, e: ease.inOut }, { t: ((c.c_mot - 0.5) + (c.c_mot + 0.2)) / 2 + 0, s: 1.110, x: -12, y: -18, e: ease.inOut }, { t: c.c_mot + 0.2, s: 1.04, x: -10, y: -10, e: ease.inOut }, { t: ((c.c_mot + 0.2) + (c.c_prox + 0.3)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.c_prox + 0.3, s: 1.09, x: 10, y: -20, e: ease.inOut }, { t: ((c.c_prox + 0.3) + (c.c_clar + 0.2)) / 2 + 0, s: 1.120, x: -17, y: -18, e: ease.inOut }, { t: c.c_clar + 0.2, s: 1.05, x: -15, y: -30, e: ease.inOut }, { t: ((c.c_clar + 0.2) + (c.x_qual + 0.2)) / 2 + 0, s: 1.120, x: 6, y: -18, e: ease.inOut }, { t: c.x_qual + 0.2, s: 1.09, x: 0, y: -35, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -25, e: ease.linear }]}>
        {/* insistir igual com todo mundo */}
        {spamOut < 1 ? [0, 1, 2].map((i) => (spam[i] > 0.001 ? (
          <div key={i} style={{ position: "absolute", left: 150 + i * 60, top: 480 + i * 130, opacity: fade(spam[i]) * (1 - spamOut), transform: `translateX(${(1 - Math.min(1, spam[i])) * 120}px) translateY(${-spamOut * 60}px)` }}>
            <Msg side="out" tone={strike > 0.5 ? "dim" : "plain"} size={38}>E aí, vai fechar?</Msg>
            {strike > 0 ? <div style={{ position: "absolute", left: -10, top: "50%", height: 6, width: `${strike * 105}%`, background: C.warn, borderRadius: 3 }} /> : null}
          </div>
        ) : null)) : null}
        {board > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 450, boxSizing: "border-box", padding: "20px 24px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: fade(board), transform: `translateY(${(1 - Math.min(1, board)) * 80 + Math.sin(t * 1.4) * 5}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>QUALIFICAÇÃO DO LEAD</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {ROWS.map((r, i) => {
              const p = rows[i];
              return (
                <div key={r.k} style={{ marginTop: 14, height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: p > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${p > 0.5 ? A.hex : "transparent"}` }}>
                  <CheckDot p={Math.min(1, p)} size={46} n={i + 1} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{r.k}</span>
                    <span style={{ fontWeight: 600, fontSize: 28, color: A.hex, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * 40}px)` }}>{r.v}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 160, right: 160, top: 940, opacity: fade(evo * 2) * (1 - lowOut) }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>CONVERSA EVOLUINDO</div>
          <div style={{ marginTop: 10, height: 22, borderRadius: 11, background: C.surface3, overflow: "hidden" }}><div style={{ width: `${mix(8, 92, evo) + Math.sin(t * 3) * 1.5}%`, height: "100%", borderRadius: 11, background: A.hex }} /></div>
        </div>
        {adiv > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", opacity: fade(adiv) * (1 - lowOut), transform: `scale(${mix(0.5, 1, Math.min(1.08, adiv))})` }}><Tag text="✕ ADIVINHAR O MERCADO" tone="warn" size={28} /></div> : null}
        {fin > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 960, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>
            Qualifique <span style={{ color: A.hex }}>antes de insistir</span>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={56}>QUALIFIQUE <span style={{ color: A.hex }}>A CONVERSA</span></Title>
    </div>
  );
};
