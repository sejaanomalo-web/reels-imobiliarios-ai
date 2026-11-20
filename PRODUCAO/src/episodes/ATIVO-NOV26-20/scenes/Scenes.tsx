import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_20 — "Mais oferta em Curitiba, mesma pergunta". Portas/FipeZap (2026): mais oferta de locação moderou o RITMO dos
 * reajustes em Curitiba; não houve queda generalizada. Gráfico ILUSTRATIVO sem escala; bairros FICTÍCIOS; imóvel ILUSTRATIVO.
 * Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.7 + k) * a;

/* prédio com janelas; `lit` janelas viram placas ALUGA-SE */
const Tower: React.FC<{ w: number; floors: number; cols: number; lit: number; t: number; k: number; color: string }> = ({ w, floors, cols, lit, t, k, color }) => {
  const cell = (w - 30) / cols;
  const n = floors * cols;
  return (
    <div style={{ width: w, padding: 15, boxSizing: "border-box", borderRadius: "18px 18px 6px 6px", background: C.surface, border: `2px solid ${color}`, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
      {Array.from({ length: n }).map((_, i) => {
        const on = ((i * 37 + k * 11) % 97) / 97 < lit;
        return <div key={i} style={{ height: cell * 0.62, borderRadius: 6, background: on ? A.hex : C.surface3, boxShadow: on ? `0 0 14px ${aa(0.5)}` : "none", transform: on ? `scale(${1 + 0.06 * Math.sin(t * 4 + i)})` : "none" }} />;
      })}
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const tw = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const lit = prog(t, c.h_mais - 0.2, Math.max(0.8, c.h_cidade - c.h_mais + 0.6), ease.out);
  const q = sp(t, c.h_cai - 0.3, { damping: 10, stiffness: 230 });
  const pin = sp(t, c.h_ctba - 0.15, { damping: 11, stiffness: 220 });
  const cx = sp(t, c.h_compl - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_rep - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={4} t={t} keys={[{ t: 0, s: 1.08, x: 10, y: -8 }, { t: 1.0, s: 1.15, x: -10, y: -18, e: ease.out }, { t: c.h_cai, s: 1.1, x: 12, y: -22, e: ease.linear }, { t: c.h_compl + 0.3, s: 1.06, x: 0, y: -30, e: ease.linear }, { t: c.a_rep, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 150, right: 150, top: 470, display: "flex", justifyContent: "space-between", alignItems: "flex-end", opacity: fade(tw) }}>
          <div style={{ transform: `translateY(${(1 - Math.min(1, tw)) * 80 + fl(t, 0, 6)}px)` }}><Tower w={330} floors={7} cols={4} lit={lit * 0.55} t={t} k={0} color={C.dim} /></div>
          <div style={{ transform: `translateY(${(1 - Math.min(1, tw)) * 80 + fl(t, 2, 6)}px)` }}><Tower w={330} floors={5} cols={4} lit={lit * 0.45} t={t} k={1} color={C.dim} /></div>
        </div>
        {lit > 0.05 ? <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: fade(lit) * (1 - fade(q)) }}><Tag text="■ PARA ALUGAR" tone="accent" size={26} /></div> : null}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: fade(q), transform: `scale(${mix(0.4, 1, Math.min(1.1, q))}) rotate(${Math.sin(t * 2.5) * 2}deg)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderRadius: 22, background: C.surface2, border: `2px solid ${C.text}` }}>
              <span style={{ fontWeight: 800, fontSize: 40, color: C.text }}>ALUGUEL</span>
              <span style={{ fontWeight: 800, fontSize: 52, color: C.warn, transform: `translateY(${Math.abs(Math.sin(t * 3)) * 10}px)` }}>↓</span>
              <span style={{ fontWeight: 800, fontSize: 52, color: C.muted }}>?</span>
            </div>
          </div>
        ) : null}
        {pin > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center", gap: 12, opacity: fade(pin), transform: `translateY(${(1 - Math.min(1, pin)) * 30}px)` }}><Tag text="📍 CURITIBA" tone="muted" size={28} />{cx > 0.001 ? <span style={{ opacity: fade(cx) }}><Tag text="MAIS COMPLICADO" tone="warn" size={28} /></span> : null}</div> : null}
      </Camera>
      <Title p={title} size={56}><span style={{ whiteSpace: "nowrap" }}>MAIS OFERTA,</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>MENOS PRESSÃO?</span></Title>
    </div>
  );
};

/* gráfico ilustrativo: oferta sobe; barras de ritmo do reajuste diminuem, mas seguem positivas */
const RATE = [1, 0.92, 0.85, 0.74, 0.66, 0.58, 0.52, 0.47];
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_rep - 0.35, { damping: 15, stiffness: 150 });
  const of = prog(t, c.a_oferta - 0.3, 1.2, ease.out);
  const rt = prog(t, c.a_mod - 0.2, Math.max(0.8, c.a_reaj - c.a_mod + 0.6), ease.out);
  const no = sp(t, c.a_queda - 0.2, { damping: 10, stiffness: 230 });
  const zero = sp(t, c.a_isso - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  const W = 820, H = 420, base = 360;
  const pts = Array.from({ length: 8 }, (_, i) => [40 + i * 105, base - 60 - i * 34] as const);
  const k = Math.max(1, Math.min(8, 1 + of * 7));
  const vis = pts.slice(0, Math.floor(k));
  const d = vis.map((q, i) => `${i ? "L" : "M"}${q[0]},${q[1]}`).join(" ");
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.a_rep - 0.35, s: 1.06, y: 0 }, { t: c.a_rep + 0.8, s: 1.1, x: -12, y: -10, e: ease.out }, { t: c.a_mod, s: 1.07, x: 12, y: -16, e: ease.linear }, { t: c.a_queda + 0.3, s: 1.09, x: -6, y: -26, e: ease.linear }, { t: c.b_imag, s: 1.06, y: -32, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, top: 450, width: W, height: H + 80, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.surface3}`, padding: 0, opacity: fade(enter), transform: `translateY(${fl(t, 0, 7)}px) rotate(${Math.sin(t * 1.1) * 1}deg)` }}>
          <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 30 }}>
            <line x1={30} x2={W - 30} y1={base} y2={base} stroke={zero > 0.5 ? C.text : C.surface3} strokeWidth={zero > 0.5 ? 4 : 2} />
            {RATE.map((r, i) => {
              const h = 160 * r * Math.min(1, Math.max(0, rt * 8 - i));
              return <rect key={i} x={20 + i * 105} y={base - h} width={56} height={h} rx={8} fill={C.text} opacity={0.55} />;
            })}
            <path d={d} fill="none" stroke={A.hex} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
            {vis.length ? <circle cx={vis[vis.length - 1][0]} cy={vis[vis.length - 1][1]} r={14 + 3 * Math.sin(t * 5)} fill={A.hex} /> : null}
          </svg>
          <div style={{ position: "absolute", left: 24, top: 18, display: "flex", gap: 12 }}>
            <span style={{ opacity: fade(of) }}><Tag text="━ OFERTA" tone="accent" size={24} /></span>
            <span style={{ opacity: fade(rt) }}><Tag text="▮ RITMO DO REAJUSTE" tone="muted" size={24} /></span>
          </div>
          <div style={{ position: "absolute", right: 24, bottom: 16 }}><Tag text="ILUSTRATIVO · SEM ESCALA" tone="muted" size={24} /></div>
        </div>
        {zero > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 990, display: "flex", justifyContent: "center", gap: 12, opacity: fade(zero) }}><Tag text="AINDA SOBE, MAIS DEVAGAR" tone="accent" size={28} /></div> : null}
        {no > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", opacity: fade(no), transform: `scale(${mix(1.8, 1, Math.min(1, no))}) rotate(-3deg)` }}><Tag text="✕ QUEDA GENERALIZADA" tone="warn" size={30} /></div> : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>DESACELERAR</span><br /><span style={{ whiteSpace: "nowrap" }}><span style={{ color: C.warn }}>NÃO É</span> <span style={{ color: A.hex }}>CAIR</span></span></Title>
    </div>
  );
};

const ROWS = [{ k: "PROCURA", at: "b_procura", d: ["↑", "↗"] }, { k: "PADRÃO", at: "b_padrao", d: ["NOVO", "MISTO"] }, { k: "PREÇOS", at: "b_precos", d: ["→", "↑"] }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const b1 = sp(t, c.b_dois - 0.2, { damping: 13, stiffness: 180 });
  const many = prog(t, c.b_recebe, Math.max(0.8, c.b_novos - c.b_recebe + 0.5), ease.out);
  const b2 = sp(t, c.b_outro - 0.2, { damping: 13, stiffness: 180 });
  const rs = ROWS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const dif = sp(t, c.b_dif - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_aval - 0.4, 0.35, ease.in);
  const panel = (p: number, label: string, icons: number, k: number) => (
    <div style={{ width: 400, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${k ? C.dim : A.hex}`, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 60 + fl(t, k * 2)}px) rotate(${Math.sin(t * 1.2 + k) * 1.5}deg)` }}>
      <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{label}</span>
      <div style={{ height: 170, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", alignContent: "flex-start" }}>
        {Array.from({ length: icons }).map((_, i) => <div key={i} style={{ transform: `scale(${Math.min(1, Math.max(0, (k ? 1 : many) * icons - i))}) translateY(${Math.sin(t * 3 + i) * 4}px)` }}><IconHome size={46} color={k ? C.muted : A.hex} /></div>)}
      </div>
      <Tag text={k ? "QUASE SEM OFERTA NOVA" : "MUITOS NOVOS"} tone={k ? "muted" : "accent"} size={24} />
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.06, y: 0 }, { t: c.b_imag + 0.8, s: 1.1, x: 12, y: -8, e: ease.out }, { t: c.b_outro, s: 1.07, x: -12, y: -14, e: ease.linear }, { t: c.b_precos + 0.3, s: 1.09, x: 0, y: -26, e: ease.linear }, { t: c.c_aval, s: 1.06, y: -32, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, right: 110, top: 450, display: "flex", justifyContent: "space-between" }}>
          {panel(b1, "BAIRRO 1", 14, 0)}
          {panel(b2, "BAIRRO 2", 2, 1)}
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 830, display: "flex", flexDirection: "column", gap: 12 }}>
          {ROWS.map((r, i) => (
            <div key={r.k} style={{ display: "flex", alignItems: "center", height: 64, borderRadius: 16, background: rs[i] > 0.5 ? aa(0.06) : "transparent", opacity: fade(rs[i]), transform: `translateX(${(1 - Math.min(1, rs[i])) * 50 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ width: 280, paddingLeft: 18, fontWeight: 800, fontSize: 30, color: C.text }}>{r.k}</span>
              <span style={{ flex: 1, textAlign: "center", fontWeight: 800, fontSize: r.d[0].length > 2 ? 26 : 40, color: A.hex }}>{r.d[0]}</span>
              <span style={{ flex: 1, textAlign: "center", fontWeight: 800, fontSize: r.d[1].length > 2 ? 26 : 40, color: C.muted }}>{r.d[1]}</span>
            </div>
          ))}
        </div>
        {dif > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", gap: 12, opacity: fade(dif), transform: `scale(${mix(0.5, 1, Math.min(1.08, dif))})` }}><Tag text="COMPORTAMENTOS DIFERENTES" tone="warn" size={28} /><Tag text="BAIRROS FICTÍCIOS" tone="muted" size={24} /></div> : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>BAIRROS <span style={{ color: C.warn }}>NÃO REAGEM</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>IGUAL</span></Title>
    </div>
  );
};

const FIELDS = [{ k: "COMPARÁVEIS DISPONÍVEIS HOJE", at: "c_comp", ic: "🏘️" }, { k: "TEMPO DE ANÚNCIO", at: "c_tempo", ic: "⏱️" }, { k: "VELOCIDADE DE FECHAMENTO", at: "c_vel", ic: "🤝" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_aval - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_aval - 0.1, { damping: 13, stiffness: 170 });
  const fs = FIELDS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const area = sp(t, c.c_area - 0.2, { damping: 11, stiffness: 220 });
  const news = sp(t, c.c_noticia - 0.2, { damping: 12, stiffness: 200 });
  const sub = sp(t, c.c_subst - 0.15, { damping: 12, stiffness: 200 });
  const fin = sp(t, c.x_dado - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const zoom = mix(0.7, 1, Math.min(1, card));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.c_aval - 0.35, s: 1.04, y: 0 }, { t: c.c_aval + 0.9, s: 1.09, x: 0, y: -8, e: ease.out }, { t: c.c_vel, s: 1.08, x: -10, y: -16, e: ease.linear }, { t: c.c_subst + 0.3, s: 1.09, x: 10, y: -26, e: ease.linear }, { t: c.x_decide + 0.3, s: 1.05, y: -36, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 140, right: 140, top: 500, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${A.hex}`, padding: 24, opacity: fade(card) * (1 - 0.5 * fade(fin)), transform: `scale(${zoom * mix(1, 0.92, Math.min(1, fin))}) translateY(${fl(t, 0, 7)}px) rotate(${Math.sin(t * 1.1) * 1}deg)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <span style={{ fontSize: 44, transform: `translateY(${Math.abs(Math.sin(t * 3)) * -6}px)` }}>📍</span>
            <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>ESTE ENDEREÇO</span>
            <Tag text="ILUSTRATIVO" tone="muted" size={24} />
          </div>
          {FIELDS.map((f, i) => (
            <div key={f.k} style={{ display: "flex", alignItems: "center", gap: 14, height: 80, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 40 + Math.sin(t * 2 + i) * 4}px)` }}>
              <span style={{ fontSize: 36 }}>{f.ic}</span>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 28, color: C.text }}>{f.k}</span>
              <span style={{ fontWeight: 800, fontSize: 40, color: A.hex, opacity: fade(fs[i]), transform: `scale(${mix(0.4, 1, Math.min(1.1, fs[i]))})` }}>✓</span>
            </div>
          ))}
          {area > 0.001 ? <div style={{ display: "flex", justifyContent: "center", marginTop: 10, opacity: fade(area) }}><Tag text="NA ÁREA DO IMÓVEL" tone="accent" size={24} /></div> : null}
        </div>
        {news > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: fade(news) * (1 - fade(fin)) }}>
            <div style={{ padding: "12px 20px", borderRadius: 18, background: C.surface2, border: `2px solid ${C.dim}`, transform: `scale(${mix(1, 0.85, Math.min(1, sub))}) translateY(${fl(t, 1, 6)}px)` }}><span style={{ fontWeight: 800, fontSize: 26, color: C.muted }}>📰 NOTÍCIA DA CIDADE</span></div>
            {sub > 0.001 ? <span style={{ fontWeight: 800, fontSize: 40, color: C.warn, opacity: fade(sub) }}>≠</span> : null}
            {sub > 0.001 ? <div style={{ padding: "12px 20px", borderRadius: 18, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", opacity: fade(sub), transform: `scale(${mix(0.6, 1.05, Math.min(1, sub))}) translateY(${fl(t, 3, 6)}px)` }}><span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>ANÁLISE DO ENDEREÇO</span></div> : null}
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1040, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Dado local <span style={{ color: A.hex }}>decide</span></div> : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ whiteSpace: "nowrap" }}>DADO LOCAL</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DECIDE</span></Title>
    </div>
  );
};
