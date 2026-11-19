import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_19 — "Um quarto, aluguel por metro mais alto". Índice FipeZAP de Locação Residencial out/2026 (preços ANUNCIADOS):
 * 1 dormitório R$ 72,76/m²; 3 dormitórios R$ 47,52/m². Médias agregadas — preço por m² ≠ lucro; sem retorno calculado com números
 * inventados (planilha com campos do cliente). Studio e imóvel maior ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.7 + k) * a;
const brl = (v: number) => v.toFixed(2).replace(".", ",");

/* planta baixa simplificada: n quartos */
const Plan: React.FC<{ rooms: number; w: number; color: string }> = ({ rooms, w, color }) => {
  const h = w * 0.62;
  return (
    <svg width={w} height={h} viewBox="0 0 200 124">
      <rect x={4} y={4} width={192} height={116} rx={8} fill="none" stroke={color} strokeWidth={5} />
      {Array.from({ length: rooms }).map((_, i) => <rect key={i} x={10 + i * (180 / rooms)} y={10} width={180 / rooms - 8} height={52} rx={4} fill={aa(0.08)} stroke={color} strokeWidth={3} />)}
      <line x1={10} y1={74} x2={190} y2={74} stroke={color} strokeWidth={3} strokeDasharray="8 6" />
    </svg>
  );
};

const Bar: React.FC<{ p: number; v: number; max: number; label: string; rooms: number; color: string; t: number; k: number }> = ({ p, v, max, label, rooms, color, t, k }) => {
  const H = 330;
  const shown = v * Math.min(1, Math.max(0, p));
  return (
    <div style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: fade(p * 1.5), transform: `translateY(${fl(t, k, 7)}px)` }}>
      <Plan rooms={rooms} w={170} color={color} />
      <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{label}</span>
      <div style={{ position: "relative", width: 150, height: H + 76, display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: H, borderRadius: 18, background: C.surface, border: `2px solid ${C.surface3}` }} />
        <div style={{ position: "relative", width: "100%", height: (H * shown) / max, borderRadius: 18, background: color === A.hex ? `linear-gradient(180deg, ${A.hex}, ${aa(0.35)})` : `linear-gradient(180deg, ${C.text}, rgba(255,255,255,0.25))`, boxShadow: color === A.hex ? `0 0 30px ${aa(0.35)}` : "none" }} />
        <div style={{ position: "absolute", left: -10, right: -10, bottom: (H * shown) / max + 12, textAlign: "center", fontWeight: 800, fontSize: 44, color, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>R$ {brl(shown)}</div>
      </div>
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const b1 = prog(t, c.h_apto + 0.3, Math.max(0.8, c.h_73 + 0.5 - c.h_apto), ease.out);
  const b3 = prog(t, c.h_3q - 0.2, Math.max(0.8, c.h_48 + 0.4 - c.h_3q), ease.out);
  const unit = sp(t, c.h_m2 - 0.2, { damping: 12, stiffness: 200 });
  const vs = sp(t, c.h_3q - 0.3, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_mostrou - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={4} t={t} keys={[{ t: 0, s: 1.1, x: 20, y: -10 }, { t: 1.0, s: 1.16, x: 30, y: -20, e: ease.out }, { t: c.h_media, s: 1.1, x: 10, y: -24, e: ease.linear }, { t: c.h_48 + 0.3, s: 1.06, x: -10, y: -30, e: ease.linear }, { t: c.a_mostrou, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 140, right: 140, top: 420, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Bar p={b1} v={72.76} max={80} label="1 QUARTO" rooms={1} color={A.hex} t={t} k={0} />
          <Bar p={b3} v={47.52} max={80} label="3 QUARTOS" rooms={3} color={C.text} t={t} k={2} />
        </div>
        {vs > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", fontWeight: 800, fontSize: 64, color: C.muted, opacity: fade(vs), transform: `scale(${mix(0.4, 1, Math.min(1.1, vs)) * (1 + 0.05 * Math.sin(t * 3))})` }}>VS</div> : null}
        {unit > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", gap: 12, opacity: fade(unit), transform: `translateY(${(1 - Math.min(1, unit)) * 20}px)` }}><Tag text="ALUGUEL ANUNCIADO · R$/m²" tone="muted" size={26} /><Tag text="MÉDIA" tone="muted" size={26} /></div> : null}
      </Camera>
      <Title p={title} size={58}><span style={{ color: A.hex }}>1 QUARTO</span> VS 3 QUARTOS</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_mostrou - 0.35, { damping: 15, stiffness: 150 });
  const src = sp(t, c.a_fipe - 0.15, { damping: 12, stiffness: 200 });
  const so = sp(t, c.a_so - 0.15, { damping: 13, stiffness: 180 });
  const ne = sp(t, c.a_mesma - 0.2, { damping: 10, stiffness: 230 });
  const din = sp(t, c.a_din - 0.2, { damping: 11, stiffness: 220 });
  const prop = sp(t, c.a_prop - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_pensa - 0.4, 0.35, ease.in);
  const shrink = Math.min(1, so);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.a_mostrou - 0.35, s: 1.08, y: 0 }, { t: c.a_mostrou + 0.8, s: 1.12, x: -14, y: -10, e: ease.out }, { t: c.a_so + 0.3, s: 1.07, x: 12, y: -18, e: ease.linear }, { t: c.a_din + 0.3, s: 1.1, x: -8, y: -28, e: ease.linear }, { t: c.b_pensa, s: 1.06, y: -34, e: ease.linear }]}>
        {/* réguas resumidas */}
        <div style={{ position: "absolute", left: 120, right: 120, top: mix(450, 420, shrink), display: "flex", flexDirection: "column", gap: 18, transform: `scale(${mix(1, 0.82, shrink)})`, transformOrigin: "50% 0%" }}>
          {[{ k: "1 QUARTO", v: 72.76, col: A.hex }, { k: "3 QUARTOS", v: 47.52, col: C.text }].map((x, i) => (
            <div key={x.k} style={{ display: "flex", alignItems: "center", gap: 18, transform: `translateX(${Math.sin(t * 1.9 + i * 2) * 8}px)` }}>
              <span style={{ width: 210, fontWeight: 800, fontSize: 30, color: C.text }}>{x.k}</span>
              <div style={{ flex: 1, height: 64, borderRadius: 16, background: C.surface, overflow: "hidden" }}>
                <div style={{ width: `${(x.v / 80) * 100 * Math.min(1, enter)}%`, height: "100%", borderRadius: 16, background: x.col === A.hex ? A.hex : C.text, opacity: x.col === A.hex ? 1 : 0.75 }} />
              </div>
              <span style={{ width: 200, fontWeight: 800, fontSize: 36, color: x.col }}>R$ {brl(x.v)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, opacity: fade(src) }}><Tag text="FIPEZAP · LOCAÇÃO · OUT/2026" tone="muted" size={24} /><Tag text="PREÇO ANUNCIADO" tone="accent" size={24} /></div>
        </div>
        {/* R$/m² ≠ dinheiro sobrando */}
        {so > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 790, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
            <div style={{ width: 330, height: 190, boxSizing: "border-box", borderRadius: 26, background: aa(0.08), border: `2px solid ${A.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fade(so), transform: `translateY(${(1 - Math.min(1, so)) * 50 + fl(t, 0, 7)}px) rotate(${Math.sin(t * 1.3) * 1.5}deg)` }}>
              <span style={{ fontWeight: 800, fontSize: 56, color: A.hex }}>R$/m²</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>PREÇO PEDIDO</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 90, color: C.warn, opacity: fade(ne), transform: `scale(${mix(2, 1, Math.min(1, ne)) * (1 + 0.06 * Math.sin(t * 3))})` }}>≠</span>
            <div style={{ width: 330, height: 190, boxSizing: "border-box", borderRadius: 26, background: din > 0.5 ? WARN_BG : C.surface, border: `2px dashed ${din > 0.5 ? "rgba(255,107,94,0.7)" : C.dim}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: fade(din), transform: `translateY(${(1 - Math.min(1, din)) * 50 + fl(t, 2, 7)}px) rotate(${Math.sin(t * 1.3 + 1) * 1.5}deg)` }}>
              <span style={{ fontSize: 50 }}>💰</span>
              <span style={{ fontWeight: 800, fontSize: 30, color: C.text, textAlign: "center", lineHeight: 1.05 }}>DINHEIRO<br />SOBRANDO</span>
            </div>
          </div>
        ) : null}
        {prop > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: fade(prop), transform: `scale(${mix(0.5, 1, Math.min(1.08, prop))}) translateX(${Math.sin(t * 3) * 6}px)` }}><Tag text="PARA O PROPRIETÁRIO?" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={52}>VALOR POR M² <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>LUCRO</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_pensa - 0.35, { damping: 15, stiffness: 150 });
  const st = sp(t, c.b_studio - 0.2, { damping: 12, stiffness: 200 });
  const s1 = sp(t, c.b_rapido - 0.15, { damping: 11, stiffness: 220 });
  const s2 = sp(t, c.b_cond - 0.15, { damping: 11, stiffness: 220 });
  const s3 = sp(t, c.b_troca - 0.15, { damping: 11, stiffness: 220 });
  const big = sp(t, c.b_maior - 0.2, { damping: 12, stiffness: 200 });
  const g1 = sp(t, c.b_total - 0.15, { damping: 11, stiffness: 220 });
  const g2 = sp(t, c.b_vac - 0.15, { damping: 11, stiffness: 220 });
  const vars = sp(t, c.b_vac + 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.c_inv - 0.4, 0.35, ease.in);
  const cmp = Math.min(1, sp(t, c.b_agora - 0.2, { damping: 14, stiffness: 160 }));
  const chips = (items: { k: string; p: number; tone: "warn" | "accent" | "muted" }[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch", width: "100%" }}>
      {items.map((x, i) => x.p > 0.001 ? <div key={x.k} style={{ opacity: fade(x.p), transform: `translateX(${(1 - Math.min(1, x.p)) * 30 + Math.sin(t * 2.3 + i) * 5}px) scale(${mix(0.7, 1, Math.min(1.05, x.p))})`, display: "flex", justifyContent: "center" }}><Tag text={x.k} tone={x.tone} size={24} /></div> : null)}
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.b_pensa - 0.35, s: 1.06, y: 0 }, { t: c.b_pensa + 0.8, s: 1.1, x: 30, y: -6, e: ease.out }, { t: c.b_troca + 0.3, s: 1.09, x: 18, y: -20, e: ease.linear }, { t: c.b_maior + 0.3, s: 1.07, x: 6, y: -24, e: ease.linear }, { t: c.b_vac + 0.4, s: 1.04, x: 0, y: -34, e: ease.linear }, { t: c.c_inv, s: 1.06, y: -36, e: ease.linear }]}>
        {/* STUDIO */}
        <div style={{ position: "absolute", left: mix(320, 100, cmp), top: 490, width: 420, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${A.hex}`, padding: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: fade(st), transform: `translateY(${(1 - Math.min(1, st)) * 60 + fl(t, 0)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><IconHome size={54} color={A.hex} /><span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>STUDIO</span></div>
          <div style={{ display: "flex", gap: 8, height: 40 }}>{s3 > 0.001 ? Array.from({ length: 4 }).map((_, i) => <span key={i} style={{ fontSize: 30, opacity: fade(s3), transform: `translateX(${((t * 70 + i * 40) % 160) - 80}px)` }}>📦</span>) : null}</div>
          {chips([{ k: "✓ ALUGA RÁPIDO", p: s1, tone: "accent" }, { k: "CONDOMÍNIO ALTO", p: s2, tone: "warn" }, { k: "TROCA DE MORADORES", p: s3, tone: "warn" }])}
        </div>
        {/* IMÓVEL MAIOR */}
        <div style={{ position: "absolute", left: 560, top: 490, width: 420, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.text}`, padding: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: fade(big), transform: `translateY(${(1 - Math.min(1, big)) * 60 + fl(t, 2)}px) rotate(${Math.sin(t * 1.2 + 1) * 1.5}deg)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><IconHome size={72} color={C.text} /><span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>IMÓVEL MAIOR</span></div>
          <div style={{ height: 40 }} />
          {chips([{ k: "ALUGUEL TOTAL DIFERENTE", p: g1, tone: "muted" }, { k: "OUTRA VACÂNCIA", p: g2, tone: "muted" }])}
        </div>
        {vars > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 930, display: "flex", justifyContent: "center", gap: 14 }}>
            {["DESPESAS", "VACÂNCIA", "MANUTENÇÃO"].map((k, i) => <div key={k} style={{ opacity: fade(vars), transform: `translateY(${(1 - Math.min(1, vars)) * 30 + Math.sin(t * 2.4 + i) * 9}px) scale(${1 + 0.04 * Math.sin(t * 2.8 + i)})` }}><Tag text={k} tone="accent" size={28} /></div>)}
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: fade(st) * 0.9 }}><Tag text="EXEMPLOS ILUSTRATIVOS" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>RENTABILIDADE TEM</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>MAIS VARIÁVEIS</span></Title>
    </div>
  );
};

const ROWS = [{ k: "VALOR DE AQUISIÇÃO", at: "c_aq" }, { k: "CUSTOS", at: "c_custos" }, { k: "VACÂNCIA", at: "c_vac" }, { k: "DEMANDA LOCAL", at: "c_dem" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_inv - 0.35, { damping: 15, stiffness: 150 });
  const sheet = sp(t, c.c_inv - 0.15, { damping: 13, stiffness: 170 });
  const rs = ROWS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const calc = sp(t, c.c_calc - 0.2, { damping: 12, stiffness: 200 });
  const no = sp(t, c.c_vender - 0.15, { damping: 11, stiffness: 220 });
  const x = sp(t, c.c_univ - 0.1, { damping: 10, stiffness: 240 });
  const fin = sp(t, c.x_mostre - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const blink = Math.sin(t * 8) > 0 ? 1 : 0.2;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.c_inv - 0.35, s: 1.06, y: 0 }, { t: c.c_inv + 0.9, s: 1.09, x: -8, y: -6, e: ease.out }, { t: c.c_dem + 0.3, s: 1.08, x: 10, y: -18, e: ease.linear }, { t: c.c_vender + 0.3, s: 1.1, x: -8, y: -28, e: ease.linear }, { t: c.x_conta + 0.3, s: 1.05, y: -38, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -42, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 140, right: 140, top: 490, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${C.surface3}`, padding: "20px 24px", opacity: fade(sheet) * (1 - 0.55 * fade(fin)), transform: `translateY(${(1 - Math.min(1, sheet)) * 60 + fl(t, 0, 7)}px) rotate(${Math.sin(t * 1.1) * 1}deg) scale(${mix(1, 0.9, Math.min(1, fin))})` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>CONTA DO INVESTIDOR</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          {ROWS.map((r, i) => (
            <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 14, height: 76, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, rs[i] * 2)), transform: `translateX(${(1 - Math.min(1, rs[i])) * 40 + Math.sin(t * 2 + i) * 4}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 30, color: C.text }}>{r.k}</span>
              <div style={{ width: 260, height: 50, boxSizing: "border-box", borderRadius: 12, border: `2px ${rs[i] > 0.5 ? "solid" : "dashed"} ${rs[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", padding: "0 14px" }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: rs[i] > 0.5 ? A.hex : C.dim }}>{rs[i] > 0.5 ? "DADO DO CASO" : "—"}</span>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 14, height: 84, borderTop: `3px solid ${C.text}`, opacity: mix(0.3, 1, Math.min(1, calc * 2)) }}>
            <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>RETORNO</span>
            <span style={{ fontWeight: 800, fontSize: 40, color: A.hex, opacity: calc > 0.5 ? blink : 0.4 }}>= ?</span>
            {calc > 0.001 ? <div style={{ opacity: fade(calc), transform: `scale(${mix(0.6, 1, Math.min(1.05, calc))})` }}><Tag text="CALCULE COM DADOS" tone="accent" size={24} /></div> : null}
          </div>
        </div>
        {no > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", opacity: fade(no) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, no))}) rotate(${Math.sin(t * 2.5) * 2}deg)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", borderRadius: 20, background: WARN_BG, border: "2px solid rgba(255,107,94,0.7)" }}>
              <span style={{ fontSize: 40 }}>🏆</span>
              <span style={{ fontWeight: 800, fontSize: 30, color: C.text, textDecoration: x > 0.5 ? "line-through" : "none", textDecorationColor: C.warn }}>TIPOLOGIA VENCEDORA UNIVERSAL</span>
            </div>
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1030, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Mostre a <span style={{ color: A.hex }}>conta completa</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>MOSTRE A</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CONTA COMPLETA</span></Title>
    </div>
  );
};
