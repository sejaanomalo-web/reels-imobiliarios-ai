import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, Person, Tag, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_11 — "Pequeno pode custar mais por metro". Recorte: no índice FipeZAP (preços anunciados), 1 dormitório tem o maior
 * preço médio por m² (venda e locação). Sem valores na tela — só barras relativas; "em alguns recortes". Plantas, investidor e cartões
 * ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

/** Planta baixa simplificada. */
const Plan: React.FC<{ w: number; h: number; rooms: number; hi?: boolean; t: number }> = ({ w, h, rooms, hi, t }) => (
  <div style={{ position: "relative", width: w, height: h, boxSizing: "border-box", border: `5px solid ${hi ? A.hex : C.text}`, borderRadius: 10, background: hi ? aa(0.06) : "rgba(255,255,255,0.03)", boxShadow: hi ? `0 0 ${30 + 8 * Math.sin(t * 3)}px ${aa(0.25)}` : "none" }}>
    {Array.from({ length: rooms - 1 }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${((i + 1) / rooms) * 100}%`, top: 0, bottom: "38%", width: 4, background: hi ? A.hex : C.muted }} />)}
    <div style={{ position: "absolute", left: 0, right: 0, top: "62%", height: 4, background: hi ? A.hex : C.muted }} />
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const p1 = sp(t, -0.2, { damping: 12, stiffness: 170 });
  const p3 = sp(t, c.h_tres - 0.4, { damping: 12, stiffness: 170 });
  const bar = prog(t, c.h_caro - 0.1, 0.8, ease.out);
  const q = sp(t, c.h_tam - 0.1, { damping: 11, stiffness: 220 });
  const stamp = sp(t, c.h_hist - 0.1, { damping: 10, stiffness: 240 });
  const out = prog(t, c.a_rec - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={2.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_um + 0.3)) / 2 + 0, s: 1.150, x: 1, y: -18, e: ease.inOut }, { t: c.h_um + 0.3, s: 1.1, x: -25, y: -15, e: ease.inOut }, { t: ((c.h_um + 0.3) + (c.h_tres + 0.3)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.h_tres + 0.3, s: 1.08, x: 25, y: -15, e: ease.inOut }, { t: ((c.h_tres + 0.3) + (c.h_tam + 0.2)) / 2 + 0, s: 1.110, x: 26, y: -18, e: ease.inOut }, { t: c.h_tam + 0.2, s: 1.03, x: 0, y: -25, e: ease.inOut }, { t: c.a_rec, s: 1.08, y: -35, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 130, top: 560, opacity: fade(p1), transform: `translateY(${(1 - Math.min(1, p1)) * 60 + Math.sin(t * 1.7) * 8}px)` }}>
          <Plan w={240} h={240} rooms={1} hi t={t} />
          <div style={{ marginTop: 14, textAlign: "center", fontWeight: 800, fontSize: 32, color: C.text }}>1 QUARTO</div>
        </div>
        <div style={{ position: "absolute", left: 470, top: 470, opacity: fade(p3), transform: `translateY(${(1 - Math.min(1, p3)) * 60 + Math.sin(t * 1.5 + 1) * 8}px)` }}>
          <Plan w={480} h={330} rooms={3} t={t} />
          <div style={{ marginTop: 14, textAlign: "center", fontWeight: 800, fontSize: 32, color: C.text }}>3 QUARTOS</div>
        </div>
        {/* R$/m² relativo, sem valores */}
        <div style={{ position: "absolute", left: 130, right: 130, top: 920, opacity: fade(bar * 2) }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, marginBottom: 10 }}>PREÇO POR M²</div>
          {[{ k: "1 QUARTO", v: 0.92, hi: true }, { k: "3 QUARTOS", v: 0.7 }].map((r, i) => (
            <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10 }}>
              <span style={{ width: 170, fontWeight: 800, fontSize: 26, color: r.hi ? A.hex : C.muted }}>{r.k}</span>
              <div style={{ flex: 1, height: 26, borderRadius: 13, background: C.surface3 }}><div style={{ width: `${r.v * 100 * (i === 1 ? Math.min(1, p3) : 1) * bar}%`, height: "100%", borderRadius: 13, background: r.hi ? A.hex : C.dim }} /></div>
            </div>
          ))}
        </div>
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(q) * (1 - fade(stamp)) }}><Tag text="MAIOR = MAIS CARO POR M²?" tone="muted" size={26} /></div> : null}
        {stamp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 405, display: "flex", justifyContent: "center", opacity: fade(stamp), transform: `scale(${mix(1.8, 1, Math.min(1, stamp))}) rotate(-3deg)` }}><Tag text="O TAMANHO NÃO CONTA TUDO" tone="warn" size={30} /></div> : null}
      </Camera>
      <Title p={title} size={60}>M² <span style={{ color: C.warn }}>NÃO CONTA TUDO</span></Title>
    </div>
  );
};

const FACT = [
  { k: "LOCALIZAÇÃO", at: "a_loc", x: 90, y: 1060 },
  { k: "PADRÃO", at: "a_pad", x: 560, y: 1060 },
  { k: "OFERTA", at: "a_oferta", x: 90, y: 1165 },
  { k: "PERFIL DE QUEM COMPRA", at: "a_perfil", x: 560, y: 1165 },
];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_rec - 0.35, { damping: 15, stiffness: 150 });
  const tag = sp(t, c.a_rec - 0.1, { damping: 12, stiffness: 200 });
  const small = sp(t, c.a_menores - 0.2, { damping: 12, stiffness: 190 });
  const big = sp(t, c.a_rec + 0.2, { damping: 12, stiffness: 190 });
  const bars = prog(t, c.a_maior - 0.2, 0.7, ease.out);
  const facts = FACT.map((f) => sp(t, c[f.at] - 0.15, { damping: 11, stiffness: 220 }));
  const wob = prog(t, c.a_rel - 0.2, 0.4, ease.out);
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  const vS = 0.9 - 0.25 * wob * (0.5 + 0.5 * Math.sin(t * 4)), vB = 0.62 + 0.25 * wob * (0.5 + 0.5 * Math.sin(t * 4 + 2));
  const Col: React.FC<{ x: number; p: number; w: number; h: number; rooms: number; v: number; hi?: boolean; lab: string }> = ({ x, p, w, h, rooms, v, hi, lab }) => (
    <div style={{ position: "absolute", left: x, top: 500, width: 420, display: "flex", flexDirection: "column", alignItems: "center", opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 60}px)` }}>
      <div style={{ height: 270, display: "flex", alignItems: "flex-end" }}><Plan w={w} h={h} rooms={rooms} hi={hi} t={t} /></div>
      <div style={{ marginTop: 12, fontWeight: 800, fontSize: 30, color: C.text }}>{lab}</div>
      <div style={{ marginTop: 18, width: 300, height: 150, display: "flex", alignItems: "flex-end", justifyContent: "center", borderBottom: `3px solid ${C.dim}` }}>
        <div style={{ width: 120, height: 150 * v * bars, borderRadius: "14px 14px 3px 3px", background: hi ? A.hex : C.surface3 }} />
      </div>
      <div style={{ marginTop: 8, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: hi ? A.hex : C.muted }}>PREÇO POR M²</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.a_rec - 0.35, s: 1.05, y: 0 }, { t: ((c.a_rec - 0.35) + (c.a_menores + 0.3)) / 2 + 0, s: 1.130, x: 6, y: -18, e: ease.inOut }, { t: c.a_menores + 0.3, s: 1.1, x: -15, y: -10, e: ease.inOut }, { t: ((c.a_menores + 0.3) + (c.a_maior + 0.3)) / 2 + 0, s: 1.130, x: -17, y: -18, e: ease.inOut }, { t: c.a_maior + 0.3, s: 1.07, x: 10, y: -15, e: ease.inOut }, { t: ((c.a_maior + 0.3) + (c.a_oferta)) / 2 + 0, s: 1.110, x: 19, y: -18, e: ease.inOut }, { t: c.a_oferta, s: 1.08, x: 0, y: -40, e: ease.inOut }, { t: ((c.a_oferta) + (c.a_rel + 0.3)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.a_rel + 0.3, s: 1.05, x: 0, y: -45, e: ease.inOut }, { t: c.b_imag, s: 1.07, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 465, display: "flex", justifyContent: "center", opacity: fade(tag) }}><Tag text="EXEMPLO DE RECORTE · SEM VALORES" tone="muted" size={24} /></div>
        <Col x={80} p={small} w={200} h={200} rooms={1} v={vS} hi lab="MENOR" />
        <Col x={580} p={big} w={380} h={270} rooms={3} v={vB} lab="MAIOR" />
        {FACT.map((f, i) => (facts[i] > 0.001 ? (
          <div key={f.k} style={{ position: "absolute", left: f.x, top: f.y, width: 430, height: 90, boxSizing: "border-box", borderRadius: 20, background: aa(0.1), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: i === 3 ? 26 : 30, color: C.text, opacity: fade(facts[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, facts[i]))}) translateY(${Math.sin(t * 2 + i) * 4}px)` }}>{f.k}</div>
        ) : null))}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>MENOR NÃO SIGNIFICA</span><br /><span style={{ color: C.warn, whiteSpace: "nowrap" }}>MAIS BARATO POR M²</span></Title>
    </div>
  );
};

const COSTS = [{ k: "CONDOMÍNIO", at: "b_cond" }, { k: "VACÂNCIA", at: "b_vac" }, { k: "MOBÍLIA", at: "b_mob" }, { k: "MANUTENÇÃO", at: "b_man" }];
const LIFE = [{ k: "ROTINA" }, { k: "ESPAÇO" }, { k: "TRAJETO" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const bal = sp(t, c.b_imag - 0.1, { damping: 13, stiffness: 170 });
  const inv = sp(t, c.b_inv - 0.15, { damping: 12, stiffness: 200 });
  const costs = COSTS.map((x) => sp(t, c[x.at] - 0.1, { damping: 11, stiffness: 220 }));
  const life = LIFE.map((_, i) => sp(t, c.b_prio - 0.2 + i * 0.18, { damping: 11, stiffness: 220 }));
  const morar = sp(t, c.b_morar - 0.15, { damping: 12, stiffness: 200 });
  const nC = costs.filter((p) => p > 0.5).length, nL = life.filter((p) => p > 0.5).length;
  const tilt = mix(0, -8, Math.min(1, nC / 4)) + mix(0, 9, Math.min(1, nL / 3)) + Math.sin(t * 2) * 0.8;
  const out = prog(t, c.c_antes - 0.4, 0.35, ease.in);
  const cx = 540, cy = 660, arm = 280;
  const ang = (tilt * Math.PI) / 180;
  const lx = cx - Math.cos(ang) * arm, ly = cy - Math.sin(ang) * arm, rx = cx + Math.cos(ang) * arm, ry = cy + Math.sin(ang) * arm;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.05, y: 0 }, { t: ((c.b_imag - 0.35) + (c.b_inv + 0.3)) / 2 + 0, s: 1.120, x: 5, y: -18, e: ease.inOut }, { t: c.b_inv + 0.3, s: 1.08, x: -8, y: -10, e: ease.inOut }, { t: ((c.b_inv + 0.3) + (c.b_mob)) / 2 + 0, s: 1.120, x: -34, y: -18, e: ease.inOut }, { t: c.b_mob, s: 1.07, x: -8, y: -25, e: ease.inOut }, { t: ((c.b_mob) + (c.b_morar + 0.3)) / 2 + 0, s: 1.110, x: 14, y: -18, e: ease.inOut }, { t: c.b_morar + 0.3, s: 1.07, x: 8, y: -25, e: ease.inOut }, { t: ((c.b_morar + 0.3) + (c.b_prio + 0.6)) / 2 + 0, s: 1.110, x: -3, y: -18, e: ease.inOut }, { t: c.b_prio + 0.6, s: 1.04, x: 0, y: -35, e: ease.inOut }, { t: c.c_antes, s: 1.07, y: -30, e: ease.linear }]}>
        <svg width={1080} height={1300} style={{ position: "absolute", left: 0, top: 0, opacity: fade(bal) }}>
          <line x1={cx} y1={cy} x2={cx} y2={cy + 420} stroke={C.dim} strokeWidth={10} strokeLinecap="round" />
          <rect x={cx - 110} y={cy + 410} width={220} height={20} rx={10} fill={C.dim} />
          <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.text} strokeWidth={8} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={16} fill={C.text} />
          <line x1={lx} y1={ly} x2={lx} y2={ly + 90} stroke={C.muted} strokeWidth={3} />
          <line x1={rx} y1={ry} x2={rx} y2={ry + 90} stroke={C.muted} strokeWidth={3} />
        </svg>
        {/* pratos */}
        {[{ x: lx, y: ly, k: "INVESTIMENTO", hi: false }, { x: rx, y: ry, k: "MORADIA", hi: true }].map((pl) => (
          <div key={pl.k} style={{ position: "absolute", left: pl.x - 150, top: pl.y + 90, width: 300, opacity: fade(bal) }}>
            <div style={{ height: 14, borderRadius: 7, background: pl.hi ? A.hex : C.warn }} />
            <div style={{ marginTop: 10, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: pl.hi ? A.hex : C.warn }}>{pl.k}</div>
          </div>
        ))}
        {/* cartões de custo empilhados acima do prato de investimento */}
        {COSTS.map((x, i) => (costs[i] > 0.001 ? (
          <div key={x.k} style={{ position: "absolute", left: lx - 130, top: ly + 84 - (i + 1) * 60, width: 260, height: 54, borderRadius: 14, background: C.surface, border: "2px solid rgba(255,107,94,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: C.text, opacity: fade(costs[i]), transform: `translateY(${(1 - Math.min(1, costs[i])) * -120}px)` }}>{x.k}</div>
        ) : null))}
        {LIFE.map((x, i) => (life[i] > 0.001 ? (
          <div key={x.k} style={{ position: "absolute", left: rx - 130, top: ry + 84 - (i + 1) * 60, width: 260, height: 54, borderRadius: 14, background: C.surface, border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: C.text, opacity: fade(life[i]), transform: `translateY(${(1 - Math.min(1, life[i])) * -120}px)` }}>{x.k}</div>
        ) : null))}
        {inv > 0.001 ? (
          <div style={{ position: "absolute", left: 110, top: 1130, display: "flex", alignItems: "center", gap: 14, opacity: fade(inv) * (1 - fade(morar) * 0.5) }}>
            <Person size={80} t={t} />
            <Tag text="INVESTIDOR: SÓ R$/M²?" tone="warn" size={26} />
          </div>
        ) : null}
        {morar > 0.001 ? (
          <div style={{ position: "absolute", right: 110, top: 1130, display: "flex", alignItems: "center", gap: 14, opacity: fade(morar) }}>
            <Tag text="QUEM VAI MORAR" tone="accent" size={26} />
            <Person size={80} t={t + 1} color={A.hex} />
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(bal) }}><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={56}>O OBJETIVO <span style={{ color: A.hex }}>MUDA A CONTA</span></Title>
    </div>
  );
};

const CHK = [
  { k: "FINALIDADE", s: "para que o imóvel será usado", at: "c_usado" },
  { k: "CUSTO TOTAL", s: "não só o preço por m²", at: "c_custo" },
  { k: "FUNCIONALIDADE", s: "planta, rotina, uso", at: "c_func" },
  { k: "ALTERNATIVAS REAIS", s: "opções da região", at: "c_alt" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_antes - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.c_antes - 0.2, { damping: 14, stiffness: 170 });
  const rows = CHK.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const m2 = sp(t, c.c_ajuda - 0.2, { damping: 11, stiffness: 220 });
  const soz = sp(t, c.c_soz - 0.1, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_fin - 0.3, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.c_antes - 0.35, s: 1.05, y: 0 }, { t: ((c.c_antes - 0.35) + (c.c_usado + 0.3)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.c_usado + 0.3, s: 1.09, x: 12, y: -10, e: ease.inOut }, { t: ((c.c_usado + 0.3) + (c.c_func + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_func + 0.2, s: 1.06, x: -12, y: -20, e: ease.inOut }, { t: ((c.c_func + 0.2) + (c.c_alt + 0.4)) / 2 + 0, s: 1.120, x: 13, y: -18, e: ease.inOut }, { t: c.c_alt + 0.4, s: 1.09, x: 10, y: -25, e: ease.inOut }, { t: ((c.c_alt + 0.4) + (c.c_soz + 0.2)) / 2 + 0, s: 1.120, x: -9, y: -18, e: ease.inOut }, { t: c.c_soz + 0.2, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: ((c.c_soz + 0.2) + (c.x_dep)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.x_dep, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 100, right: 100, top: 440, boxSizing: "border-box", padding: "20px 24px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: fade(list), transform: `translateY(${(1 - Math.min(1, list)) * 80 + Math.sin(t * 1.4) * 5}px)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>ANTES DE RECOMENDAR</span>
            <Tag text="ILUSTRATIVO" tone="muted" size={24} />
          </div>
          {CHK.map((r, i) => {
            const p = rows[i];
            return (
              <div key={r.k} style={{ marginTop: 12, height: 96, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: p > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${p > 0.5 ? A.hex : "transparent"}` }}>
                <CheckDot p={Math.min(1, p)} size={44} n={i + 1} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{r.k}</span>
                  <span style={{ fontWeight: 600, fontSize: 24, color: A.hex, opacity: fade(p) }}>{r.s}</span>
                </div>
              </div>
            );
          })}
        </div>
        {m2 > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", gap: 18, opacity: fade(m2) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, m2))})` }}>
            <Tag text="M² AJUDA" tone="accent" size={28} />
            {soz > 0.001 ? <span style={{ opacity: fade(soz) }}><Tag text="✕ NÃO DECIDE SOZINHO" tone="warn" size={28} /></span> : null}
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 990, textAlign: "center", fontWeight: 800, fontSize: 52, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Primeiro a <span style={{ color: A.hex }}>finalidade</span>,<br />depois o metro</div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>METRAGEM É UM CRITÉRIO,</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>NÃO A DECISÃO</span></Title>
    </div>
  );
};
