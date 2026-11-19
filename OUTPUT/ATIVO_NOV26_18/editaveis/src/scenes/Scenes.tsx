import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconDoc, IconHome, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_18 — "Aluguel sobe mais que inflação". Índice FipeZAP de Locação Residencial out/2026: +9,01% em 12 meses (IPCA 4,63%),
 * calculado com preços de ANÚNCIOS. Reajuste de contrato vigente segue o pactuado e as regras aplicáveis — sem reajuste automático.
 * Bairros sem valores (mapa ESTILIZADO); anúncio e contrato ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.7 + k) * a;

/* linha de 12 meses, só forma (sem valores mensais inventados): sobe de modo geral */
const PTS = [0, 0.1, 0.16, 0.3, 0.42, 0.55, 0.62, 0.7, 0.77, 0.84, 0.92, 1];
const Chart: React.FC<{ p: number; t: number; w: number; h: number }> = ({ p, t, w, h }) => {
  const n = PTS.length;
  const pts = PTS.map((v, i) => [20 + (i * (w - 40)) / (n - 1), h - 30 - v * (h - 70)] as const);
  const shown = Math.max(1, Math.min(n, 1 + p * (n - 1)));
  const k = Math.floor(shown);
  const fr = shown - k;
  const vis = pts.slice(0, k).concat(k < n ? [[pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * fr, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * fr] as const] : []);
  const d = vis.map((q, i) => `${i ? "L" : "M"}${q[0]},${q[1]}`).join(" ");
  const last = vis[vis.length - 1];
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {Array.from({ length: 4 }).map((_, i) => <line key={i} x1={10} x2={w - 10} y1={30 + i * ((h - 60) / 3)} y2={30 + i * ((h - 60) / 3)} stroke={C.surface3} strokeWidth={2} />)}
      <path d={d + ` L${last[0]},${h - 20} L20,${h - 20} Z`} fill={aa(0.1)} />
      <path d={d} fill="none" stroke={A.hex} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={13 + 3 * Math.sin(t * 5)} fill={A.hex} />
      <text x={20} y={h + 8} fill={C.muted} fontFamily={F.mono} fontSize={24} fontWeight={700}>12 MESES</text>
    </svg>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const panel = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const line = prog(t, 0.1, Math.max(0.6, c.h_9 + 0.3), ease.out);
  const num = sp(t, c.h_9 - 0.15, { damping: 11, stiffness: 210 });
  const src = sp(t, c.h_fipe - 0.2, { damping: 12, stiffness: 200 });
  const ctr = sp(t, c.h_mas - 0.15, { damping: 11, stiffness: 210 });
  const x = sp(t, c.h_9b - 0.1, { damping: 10, stiffness: 240 });
  const out = prog(t, c.a_indice - 0.4, 0.35, ease.in);
  const val = (9.01 * Math.min(1, prog(t, c.h_9 - 0.2, 0.8, ease.out))).toFixed(2).replace(".", ",");
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={4} t={t} keys={[{ t: 0, s: 1.08, x: -12, y: -8 }, { t: 1.0, s: 1.16, x: 12, y: -20, e: ease.out }, { t: c.h_fipe, s: 1.1, x: -10, y: -20, e: ease.linear }, { t: c.h_mas + 0.4, s: 1.06, x: 8, y: -30, e: ease.linear }, { t: c.a_indice, s: 1.09, y: -38, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 100, right: 100, top: 430, height: 470, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `2px solid ${C.surface3}`, padding: "26px 30px", opacity: fade(panel) * mix(1, 0.6, ctr), transform: `translateY(${(1 - Math.min(1, panel)) * 60 + fl(t, 0) - Math.min(1, ctr) * 30}px) rotate(${Math.sin(t * 1.1) * 1.2}deg) scale(${mix(1, 0.92, ctr)})` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, letterSpacing: "0.08em" }}>PAINEL DE LOCAÇÃO</span>
            <Tag text="ILUSTRATIVO" tone="muted" size={24} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 26, marginTop: 14 }}>
            <Chart p={line} t={t} w={430} h={300} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", opacity: fade(num), transform: `scale(${mix(0.6, 1, Math.min(1.05, num))})` }}>
              <span style={{ fontWeight: 800, fontSize: 30, color: C.muted }}>ALUGUEL</span>
              <span style={{ fontWeight: 800, fontSize: 92, color: A.hex, letterSpacing: "-0.04em", lineHeight: 1 }}>+{val}%</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginTop: 6 }}>ANUNCIADO</span>
            </div>
          </div>
        </div>
        {src > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 930, display: "flex", justifyContent: "center", gap: 12, opacity: fade(src) * (1 - fade(ctr)), transform: `translateY(${(1 - Math.min(1, src)) * 20}px)` }}><Tag text="FIPEZAP · OUT/2026" tone="muted" size={26} /><Tag text="IPCA 12M: 4,63%" tone="muted" size={26} /></div> : null}
        {ctr > 0.001 ? (
          <div style={{ position: "absolute", left: 260, right: 260, top: 950, height: 290, boxSizing: "border-box", borderRadius: 26, background: C.surface2, border: `2px solid ${C.text}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: fade(ctr), transform: `translateY(${(1 - Math.min(1, ctr)) * 120 + fl(t, 2, 6)}px) rotate(${-3 + Math.sin(t * 1.4) * 1.5}deg)` }}>
            <IconDoc size={70} />
            <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>SEU CONTRATO</span>
            <span style={{ fontWeight: 800, fontSize: 60, color: C.muted, letterSpacing: "-0.03em", textDecoration: x > 0.5 ? "line-through" : "none", textDecorationColor: C.warn }}>+9%?</span>
            {x > 0.001 ? <div style={{ position: "absolute", left: -60, right: -60, top: -64, display: "flex", justifyContent: "center", opacity: fade(x), transform: `scale(${mix(1.8, 1, Math.min(1, x))}) rotate(3deg)` }}><Tag text="✕ NÃO É AUTOMÁTICO" tone="warn" size={28} /></div> : null}
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={60}>ALUGUEL <span style={{ color: A.hex }}>+9,01%</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_indice - 0.35, { damping: 15, stiffness: 150 });
  const ad = sp(t, c.a_indice - 0.1, { damping: 13, stiffness: 180 });
  const ped = sp(t, c.a_pedidos - 0.15, { damping: 11, stiffness: 220 });
  const ctr = sp(t, c.a_reaj - 0.2, { damping: 13, stiffness: 180 });
  const rows = [c.a_vigente, c.a_pact, c.a_regras].map((x) => sp(t, x - 0.15, { damping: 11, stiffness: 220 }));
  const mixP = sp(t, c.a_mist - 0.2, { damping: 9, stiffness: 160 });
  const bad = sp(t, c.a_ruim - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_corr - 0.4, 0.35, ease.in);
  const pull = Math.min(1, mixP) * (1 - prog(t, c.a_ruim + 0.2, 0.5, ease.out));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.a_indice - 0.35, s: 1.08, y: 0 }, { t: c.a_indice + 0.8, s: 1.12, x: 14, y: -10, e: ease.out }, { t: c.a_reaj + 0.3, s: 1.08, x: -14, y: -15, e: ease.linear }, { t: c.a_regras + 0.3, s: 1.1, x: -6, y: -25, e: ease.linear }, { t: c.a_ruim + 0.3, s: 1.05, x: 0, y: -35, e: ease.linear }, { t: c.b_corr, s: 1.07, y: -30, e: ease.linear }]}>
        {/* ALUGUEL ANUNCIADO */}
        <div style={{ position: "absolute", left: 80, top: 470, width: 440, height: 500, boxSizing: "border-box", borderRadius: 30, background: aa(0.08), border: `2px solid ${A.hex}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: fade(ad), transform: `translateX(${pull * 70}px) translateY(${(1 - Math.min(1, ad)) * 60 + fl(t, 0)}px) rotate(${pull * 6 + Math.sin(t * 1.3) * 1.5}deg)` }}>
          <span style={{ fontWeight: 800, fontSize: 32, color: A.hex, textAlign: "center", lineHeight: 1.05 }}>ALUGUEL<br />ANUNCIADO</span>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "100%", height: 76, boxSizing: "border-box", borderRadius: 16, background: C.surface, display: "flex", alignItems: "center", gap: 14, padding: "0 16px", opacity: fade(ad) * mix(0.5, 1, Math.min(1, ped)), transform: `translateX(${(1 - Math.min(1, ped)) * (30 + i * 20) + Math.sin(t * 2.2 + i) * 5}px)` }}>
              <IconHome size={40} color={C.text} />
              <div style={{ flex: 1, height: 12, borderRadius: 6, background: C.surface3 }} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>R$ ••••</span>
            </div>
          ))}
          <div style={{ opacity: fade(ped), transform: `scale(${mix(0.6, 1, Math.min(1.05, ped))})` }}><Tag text="PREÇO PEDIDO" tone="accent" size={24} /></div>
        </div>
        {/* CONTRATO VIGENTE */}
        <div style={{ position: "absolute", left: 560, top: 470, width: 440, height: 500, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.text}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: fade(ctr), transform: `translateX(${-pull * 70}px) translateY(${(1 - Math.min(1, ctr)) * 60 + fl(t, 1.5)}px) rotate(${-pull * 6 + Math.sin(t * 1.3 + 1) * 1.5}deg)` }}>
          <span style={{ fontWeight: 800, fontSize: 32, color: C.text, textAlign: "center", lineHeight: 1.05 }}>CONTRATO<br />VIGENTE</span>
          {["📄 EM VIGOR", "🤝 O QUE FOI PACTUADO", "⚖️ REGRAS APLICÁVEIS"].map((k, i) => (
            <div key={k} style={{ width: "100%", height: 76, boxSizing: "border-box", borderRadius: 16, background: C.surface2, border: `2px ${rows[i] > 0.5 ? "solid" : "dashed"} ${rows[i] > 0.5 ? C.text : C.dim}`, display: "flex", alignItems: "center", padding: "0 16px", opacity: mix(0.3, 1, Math.min(1, rows[i] * 2)), transform: `translateX(${(1 - Math.min(1, rows[i])) * -40 + Math.sin(t * 2.2 + i) * 5}px)` }}>
              <span style={{ fontWeight: 800, fontSize: 25, color: C.text }}>{k}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 650, textAlign: "center", fontWeight: 800, fontSize: 90, color: C.warn, opacity: fade(ctr) * (1 - pull), transform: `scale(${1 + 0.08 * Math.sin(t * 3)})` }}>≠</div>
        {bad > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: fade(bad), transform: `scale(${mix(0.5, 1, Math.min(1.08, bad))}) translateX(${Math.sin(t * 3) * 8}px)` }}><Tag text="✕ MISTURAR = ATENDIMENTO RUIM" tone="warn" size={30} /></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>ÍNDICE DE ANÚNCIO</span><br /><span style={{ whiteSpace: "nowrap" }}><span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>REAJUSTE CONTRATUAL</span></span></Title>
    </div>
  );
};

/* bairros estilizados: tendências diferentes, sem valores */
const HOODS = [
  { x: 40, y: 30, w: 250, h: 150, d: "↑" }, { x: 310, y: 20, w: 260, h: 170, d: "→" }, { x: 590, y: 40, w: 230, h: 140, d: "↗" },
  { x: 60, y: 210, w: 230, h: 160, d: "→" }, { x: 310, y: 215, w: 250, h: 150, d: "↘" }, { x: 580, y: 200, w: 250, h: 170, d: "↑" },
];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_corr - 0.35, { damping: 15, stiffness: 150 });
  const map = sp(t, c.b_estudar - 0.25, { damping: 13, stiffness: 170 });
  const loc = sp(t, c.b_locacao - 0.2, { damping: 12, stiffness: 200 });
  const pa = sp(t, c.b_preco - 0.15, { damping: 11, stiffness: 220 });
  const pf = sp(t, c.b_fechado - 0.15, { damping: 11, stiffness: 220 });
  const bh = sp(t, c.b_bairro - 0.2, { damping: 12, stiffness: 200 });
  const md = sp(t, c.b_media - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_orient - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.b_corr - 0.35, s: 1.06, y: 0 }, { t: c.b_corr + 0.8, s: 1.12, x: -10, y: -10, e: ease.out }, { t: c.b_preco, s: 1.07, x: 10, y: -15, e: ease.linear }, { t: c.b_bairro, s: 1.1, x: -10, y: -25, e: ease.linear }, { t: c.b_media + 0.3, s: 1.05, x: 0, y: -35, e: ease.linear }, { t: c.c_orient, s: 1.07, y: -32, e: ease.linear }]}>
        {/* mapa de bairros */}
        <div style={{ position: "absolute", left: 120, top: 430, width: 860, height: 400, opacity: fade(map), transform: `scale(${mix(0.85, 1, Math.min(1, map)) * (1 + 0.02 * Math.sin(t * 1.3))}) rotate(${Math.sin(t * 0.9) * 1.8}deg) translateY(${fl(t, 0, 8)}px)` }}>
          {HOODS.map((h, i) => (
            <div key={i} style={{ position: "absolute", left: h.x, top: h.y, width: h.w, height: h.h, boxSizing: "border-box", borderRadius: 22, background: bh > 0.5 ? aa(0.06 + 0.04 * Math.sin(t * 2 + i)) : C.surface, border: `2px solid ${bh > 0.5 ? aa(0.6) : C.surface3}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, transform: `translateY(${Math.sin(t * 2 + i * 1.3) * 6}px)` }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>BAIRRO {String.fromCharCode(65 + i)}</span>
              <span style={{ fontWeight: 800, fontSize: 56, color: bh > 0.5 ? A.hex : C.dim, opacity: mix(0.3, 1, Math.min(1, bh)), transform: `scale(${mix(0.6, 1, Math.min(1.08, bh))})` }}>{h.d}</span>
            </div>
          ))}
          {/* fluxo oferta/demanda */}
          {loc > 0.001 ? Array.from({ length: 10 }).map((_, i) => {
            const u = ((t * 0.35 + i / 10) % 1);
            return <div key={"d" + i} style={{ position: "absolute", left: 20 + u * 800, top: 185 + Math.sin(u * 6.28 + i) * 20, width: 14, height: 14, borderRadius: 7, background: i % 2 ? A.hex : C.text, opacity: fade(loc) * 0.7 * Math.sin(u * Math.PI) }} />;
          }) : null}
          <div style={{ position: "absolute", right: 0, bottom: -44 }}><Tag text="MAPA ESTILIZADO" tone="muted" size={24} /></div>
        </div>
        {loc > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 870, display: "flex", justifyContent: "center", gap: 12, opacity: fade(loc) * (1 - fade(pa)) }}><Tag text="OFERTA" tone="muted" size={24} /><Tag text="⇄" tone="muted" size={24} /><Tag text="DEMANDA" tone="muted" size={24} /></div> : null}
        {/* anúncio → fechado */}
        <div style={{ position: "absolute", left: 90, right: 90, top: 890, display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
          {pa > 0.001 ? <div style={{ opacity: fade(pa), transform: `scale(${mix(0.6, 1, Math.min(1.05, pa))}) translateY(${fl(t, 1, 6)}px)` }}><Tag text="PREÇO DE ANÚNCIO" tone="accent" size={28} /></div> : null}
          {pf > 0.001 ? <span style={{ fontWeight: 800, fontSize: 46, color: C.warn, opacity: fade(pf) }}>≠</span> : null}
          {pf > 0.001 ? <div style={{ opacity: fade(pf), transform: `scale(${mix(0.6, 1, Math.min(1.05, pf))}) translateY(${fl(t, 2.5, 6)}px)` }}><Tag text="PREÇO FECHADO" tone="muted" size={28} /></div> : null}
        </div>
        {md > 0.001 ? (
          <div style={{ position: "absolute", left: 160, right: 160, top: 990, height: 90, boxSizing: "border-box", borderRadius: 20, background: WARN_BG, border: "2px dashed rgba(255,107,94,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, opacity: fade(md), transform: `scale(${mix(0.6, 1, Math.min(1.05, md))}) rotate(${Math.sin(t * 2) * 1.5}deg)` }}>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>MÉDIA NACIONAL</span>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.warn }}>≠ SEU BAIRRO</span>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>A MÉDIA <span style={{ color: C.warn }}>NÃO É</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>O SEU BAIRRO</span></Title>
    </div>
  );
};

const CHECK = [{ k: "IMÓVEIS COMPARÁVEIS", at: "c_comp", ic: "🏘️" }, { k: "CONDIÇÕES DO CONTRATO", at: "c_contr", ic: "📄" }, { k: "LEGISLAÇÃO APLICÁVEL", at: "c_leg", ic: "⚖️" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_orient - 0.35, { damping: 15, stiffness: 150 });
  const p1 = sp(t, c.c_prop - 0.15, { damping: 11, stiffness: 210 });
  const p2 = sp(t, c.c_loc - 0.15, { damping: 11, stiffness: 210 });
  const ch = CHECK.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const sep = sp(t, c.c_sep - 0.2, { damping: 12, stiffness: 190 });
  const fin = sp(t, c.x_comece - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const shrink = mix(1, 0.86, Math.min(1, sep));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.c_orient - 0.35, s: 1.06, y: 0 }, { t: c.c_orient + 0.9, s: 1.12, x: 10, y: -10, e: ease.out }, { t: c.c_comp, s: 1.08, x: -12, y: -15, e: ease.linear }, { t: c.c_leg + 0.3, s: 1.1, x: 10, y: -25, e: ease.linear }, { t: c.c_ind + 0.3, s: 1.05, x: 0, y: -38, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -42, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 420, display: "flex", justifyContent: "space-between" }}>
          {[{ p: p1, k: "PROPRIETÁRIO" }, { p: p2, k: "LOCATÁRIO" }].map((x, i) => (
            <div key={x.k} style={{ display: "flex", alignItems: "center", gap: 12, opacity: fade(x.p), transform: `translateY(${(1 - Math.min(1, x.p)) * 40 + fl(t, i * 2, 8)}px) scale(${shrink})` }}>
              <Person size={70} t={t + i} color={i ? A.hex : C.text} />
              <Tag text={x.k} tone={i ? "accent" : "muted"} size={24} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 130, right: 130, top: 560, display: "flex", flexDirection: "column", gap: 16, opacity: 1 - fade(fin) * 0.6, transform: `scale(${shrink}) translateY(${-sep * 30}px)` }}>
          {CHECK.map((x, i) => (
            <div key={x.k} style={{ height: 104, boxSizing: "border-box", borderRadius: 22, background: ch[i] > 0.5 ? aa(0.08) : C.surface, border: `2px ${ch[i] > 0.5 ? "solid" : "dashed"} ${ch[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", opacity: mix(0.3, 1, Math.min(1, ch[i] * 2)), transform: `translateX(${(1 - Math.min(1, ch[i])) * 60 + Math.sin(t * 2 + i) * 8}px) rotate(${Math.sin(t * 1.5 + i) * 1}deg)` }}>
              <span style={{ fontSize: 44 }}>{x.ic}</span>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>{x.k}</span>
              <span style={{ fontWeight: 800, fontSize: 44, color: A.hex, opacity: fade(ch[i]), transform: `scale(${mix(0.4, 1, Math.min(1.1, ch[i]))})` }}>✓</span>
            </div>
          ))}
        </div>
        {sep > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 930, display: "flex", justifyContent: "center", gap: mix(0, 60, Math.min(1, sep)), opacity: fade(sep) * (1 - fade(fin)) }}>
            <div style={{ transform: `translateX(${-Math.min(1, sep) * 10}px) translateY(${fl(t, 0, 6)}px)` }}><Tag text="ÍNDICE DE ANÚNCIO" tone="muted" size={26} /></div>
            <span style={{ fontWeight: 800, fontSize: 40, color: C.warn }}>|</span>
            <div style={{ transform: `translateX(${Math.min(1, sep) * 10}px) translateY(${fl(t, 2, 6)}px)` }}><Tag text="REAJUSTE DO CONTRATO" tone="accent" size={26} /></div>
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 920, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Comece pelo <span style={{ color: A.hex }}>dado certo</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>COMECE PELO</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DADO CERTO</span></Title>
    </div>
  );
};
