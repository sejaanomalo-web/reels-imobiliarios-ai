import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_23 — "Black Friday no imóvel: é desconto real?". Campanhas de incorporadoras em nov/2026 existem, mas nenhuma empresa,
 * percentual ou promoção real é citada: etiqueta -50% e propostas são FICTÍCIAS, sem valores. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

/* etiqueta de preço pendurada */
const PriceTag: React.FC<{ w: number; t: number; label: string; open?: number; children?: React.ReactNode }> = ({ w, t, label, open = 0, children }) => (
  <div style={{ position: "relative", width: w, transformOrigin: "50% -60px", transform: `rotate(${Math.sin(t * 1.6) * 6 * (1 - open * 0.7)}deg)` }}>
    <div style={{ position: "absolute", left: w / 2 - 2, top: -60, width: 4, height: 60, background: C.dim }} />
    <div style={{ width: w, boxSizing: "border-box", borderRadius: "40px 40px 24px 24px", background: "#0B0C0F", border: `4px solid ${A.hex}`, boxShadow: `0 0 40px ${aa(0.25)}`, padding: "30px 24px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 15, border: `4px solid ${C.dim}` }} />
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.text, letterSpacing: "0.12em" }}>BLACK FRIDAY</span>
      <span style={{ fontWeight: 800, fontSize: 130, color: A.hex, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{label}</span>
      {children}
    </div>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const tag = sp(t, -0.2, { damping: 10, stiffness: 140 });
  const pct = sp(t, c.h_50 - 0.15, { damping: 10, stiffness: 230 });
  const lupa = sp(t, c.h_resp - 0.2, { damping: 12, stiffness: 190 });
  const out = prog(t, c.a_desc - 0.4, 0.35, ease.in);
  const lx = mix(260, 0, Math.min(1, lupa)) + Math.sin(t * 2.2) * 30;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, x: 0, y: -6 }, { t: 1.0, s: 1.12, x: -10, y: -16, e: ease.out }, { t: c.h_50, s: 1.08, x: 10, y: -20, e: ease.linear }, { t: c.h_imp + 0.3, s: 1.1, x: 0, y: -30, e: ease.linear }, { t: c.a_desc, s: 1.08, y: -32, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 540 - 220, top: 540, opacity: fade(tag), transform: `translateY(${(1 - Math.min(1, tag)) * -200}px) scale(${mix(1, 1.06, Math.min(1, pct)) * (1 + 0.02 * Math.sin(t * 3))})` }}>
          <PriceTag w={440} t={t} label={pct > 0.3 ? "-50%" : "%"} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(tag) * (1 - fade(lupa)) }}><Tag text="ETIQUETA FICTÍCIA" tone="muted" size={24} /></div>
        {lupa > 0.001 ? (
          <div style={{ position: "absolute", left: 540 - 130 + lx, top: 640, width: 260, height: 260, opacity: fade(lupa), transform: `scale(${mix(0.4, 1, Math.min(1, lupa))})` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 130, border: `10px solid ${C.text}`, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontWeight: 800, fontSize: 120, color: C.warn }}>?</span></div>
            <div style={{ position: "absolute", left: 210, top: 210, width: 26, height: 120, borderRadius: 13, background: C.text, transform: "rotate(-45deg)", transformOrigin: "50% 0%" }} />
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={54}><span style={{ whiteSpace: "nowrap" }}>BLACK FRIDAY</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DE IMÓVEIS</span></Title>
    </div>
  );
};

const FIELDS = [{ k: "BASE", sub: "desconto sobre qual preço?", at: "a_orig" }, { k: "CONDIÇÃO", sub: "o que precisa para ter acesso", at: "a_cond2" }, { k: "VALIDADE", sub: "até quando e para quais unidades", at: "a_oferta" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_desc - 0.35, { damping: 15, stiffness: 150 });
  const q = sp(t, c.a_qual - 0.2, { damping: 11, stiffness: 220 });
  const camp = sp(t, c.a_inc - 0.2, { damping: 12, stiffness: 200 });
  const open = prog(t, c.a_corr - 0.2, 0.8, ease.out);
  const fs = FIELDS.map((x) => sp(t, c[x.at] - 0.25, { damping: 11, stiffness: 220 }));
  const pp = sp(t, c.a_promo - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_tamb - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.a_desc - 0.35, s: 1.06, y: 0 }, { t: c.a_desc + 0.8, s: 1.1, x: 10, y: -10, e: ease.out }, { t: c.a_corr, s: 1.06, x: -10, y: -16, e: ease.linear }, { t: c.a_cond2, s: 1.08, x: 8, y: -24, e: ease.linear }, { t: c.b_tamb, s: 1.06, y: -30, e: ease.linear }]}>
        {/* etiqueta encolhe e sobe */}
        <div style={{ position: "absolute", left: 540 - 220, top: 540, transformOrigin: "50% 0%", transform: `translateY(${mix(0, -60, open)}px) scale(${mix(1, 0.55, open)})`, opacity: mix(1, 0.85, open) }}>
          <PriceTag w={440} t={t} label="-50%" open={open}>
            {q > 0.001 ? <div style={{ opacity: fade(q) * (1 - open) }}><Tag text="EM RELAÇÃO A QUAL PREÇO?" tone="warn" size={24} /></div> : null}
          </PriceTag>
        </div>
        {camp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 450, display: "flex", justifyContent: "center", opacity: fade(camp) * (1 - fade(open * 2)) }}><Tag text="CAMPANHAS DE INCORPORADORAS · NOV/2026" tone="muted" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 130, right: 130, top: 790, display: "flex", flexDirection: "column", gap: 12 }}>
          {FIELDS.map((f, i) => (
            <div key={f.k} style={{ height: 92, boxSizing: "border-box", borderRadius: 20, background: fs[i] > 0.5 ? aa(0.08) : C.surface, border: `2px ${fs[i] > 0.5 ? "solid" : "dashed"} ${fs[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", gap: 18, padding: "0 22px", opacity: fade(open) * mix(0.35, 1, Math.min(1, fs[i] * 2)), transform: `translateY(${(1 - open) * 40}px) translateX(${(1 - Math.min(1, fs[i])) * 40 + Math.sin(t * 2 + i) * 8}px)` }}>
              <span style={{ width: 210, fontWeight: 800, fontSize: 32, color: C.text }}>{f.k}</span>
              <span style={{ flex: 1, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: fs[i] > 0.5 ? A.hex : C.dim }}>{f.sub}</span>
            </div>
          ))}
        </div>
        {pp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", gap: 10, opacity: fade(pp) }}><Tag text="ORIGINAL" tone="muted" size={24} /><Tag text="≠" tone="warn" size={24} /><Tag text="PROMOCIONAL" tone="accent" size={24} /></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>DESCONTO SOBRE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>QUAL REFERÊNCIA?</span></Title>
    </div>
  );
};

const COSTS = [{ k: "ENTRADA", at: "b_ent" }, { k: "EVOLUÇÃO DA OBRA", at: "b_evol" }, { k: "CORREÇÃO MONETÁRIA", at: "b_corr" }, { k: "TAXAS", at: "b_tax" }, { k: "CRONOGRAMA", at: "b_cron" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_tamb - 0.35, { damping: 15, stiffness: 150 });
  const head = sp(t, c.b_tamb - 0.2, { damping: 11, stiffness: 200 });
  const back = prog(t, c.b_ent - 0.4, 0.8, ease.inOut);
  const calc = sp(t, c.b_ent - 0.3, { damping: 13, stiffness: 170 });
  const cs = COSTS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const tot = sp(t, c.b_total - 0.2, { damping: 10, stiffness: 230 });
  const ctr = sp(t, c.b_contr - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.c_video - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_tamb - 0.35, s: 1.08, y: 0 }, { t: c.b_tamb + 0.8, s: 1.12, x: -10, y: -8, e: ease.out }, { t: c.b_ent, s: 1.05, x: 0, y: -14, e: ease.linear }, { t: c.b_tax, s: 1.07, x: 10, y: -22, e: ease.linear }, { t: c.c_video, s: 1.05, y: -30, e: ease.linear }]}>
        {/* manchete da parcela recua */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", flexDirection: "column", alignItems: "center", opacity: fade(head) * (1 - back), transform: `scale(${mix(1, 0.7, back) * (1 + 0.04 * Math.sin(t * 3) * (1 - back))}) translateY(${mix(0, 40, back)}px)`, transformOrigin: "50% 0%" }}>
          <span style={{ fontWeight: 800, fontSize: 100, color: A.hex, letterSpacing: "-0.04em", lineHeight: 1 }}>PARCELA</span>
          <span style={{ fontWeight: 800, fontSize: 100, color: C.text, letterSpacing: "-0.04em", lineHeight: 1 }}>BAIXA!</span>
        </div>
        {/* calculadora de custos */}
        <div style={{ position: "absolute", left: 160, right: 160, top: 620, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${C.surface3}`, padding: "16px 24px", opacity: fade(calc), transform: `translateY(${(1 - Math.min(1, calc)) * 80 + fl(t, 0, 10)}px) rotate(${Math.sin(t * 1.2) * 1.2}deg)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><span style={{ fontSize: 34 }}>🧮</span><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>CUSTO DO CONTRATO</span></div>
          {COSTS.map((x, i) => (
            <div key={x.k} style={{ display: "flex", alignItems: "center", height: 58, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, cs[i] * 2)), transform: `translateX(${(1 - Math.min(1, cs[i])) * 40 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 28, color: C.text }}>+ {x.k}</span>
              <span style={{ fontWeight: 800, fontSize: 28, color: cs[i] > 0.5 ? A.hex : C.dim }}>{cs[i] > 0.5 ? "✓" : "—"}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", height: 70, borderTop: `3px solid ${C.text}`, opacity: mix(0.3, 1, Math.min(1, tot * 2)) }}>
            <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>= CUSTO TOTAL</span>
            <span style={{ fontWeight: 800, fontSize: 36, color: C.warn, transform: `scale(${1 + 0.08 * Math.sin(t * 5) * Math.min(1, tot)})` }}>?</span>
          </div>
        </div>
        {ctr > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", opacity: fade(ctr) }}><Tag text="DEPENDE DO CONTRATO" tone="muted" size={26} /></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>PARCELA <span style={{ color: C.warn }}>NÃO É</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>PREÇO TOTAL</span></Title>
    </div>
  );
};

const ROWS = [{ k: "PREÇO BASE", at: "c_conf" }, { k: "CONDIÇÕES", at: "c_conf" }, { k: "CUSTO TOTAL", at: "c_docs" }, { k: "DOCUMENTOS", at: "c_docs" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_video - 0.35, { damping: 15, stiffness: 150 });
  const props = sp(t, c.c_video - 0.15, { damping: 13, stiffness: 170 });
  const rs = ROWS.map((x, i) => sp(t, c[x.at] - 0.2 + (i % 2) * 0.3, { damping: 11, stiffness: 220 }));
  const big = sp(t, c.c_repete - 0.2, { damping: 10, stiffness: 230 });
  const res = sp(t, c.c_promo - 0.2, { damping: 12, stiffness: 200 });
  const fin = sp(t, c.x_comp - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const card = (k: string, pct: string, i: number) => (
    <div style={{ width: 390, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${i ? C.text : A.hex}`, padding: "16px 20px", opacity: fade(props), transform: `translateY(${(1 - Math.min(1, props)) * 60 + fl(t, i * 2, 10)}px) rotate(${Math.sin(t * 1.2 + i) * 1.5}deg)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><IconHome size={40} color={i ? C.text : A.hex} /><span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{k}</span></div>
      <div style={{ marginTop: 8, display: "inline-flex", padding: "6px 14px", borderRadius: 12, background: big > 0.5 && !i ? WARN_BG : aa(0.08) }}><span style={{ fontWeight: 800, fontSize: 30, color: big > 0.5 && !i ? C.warn : A.hex, textDecoration: big > 0.5 && !i ? "line-through" : "none" }}>BANNER {pct}</span></div>
      {ROWS.map((r, j) => (
        <div key={r.k} style={{ display: "flex", alignItems: "center", height: 50, borderTop: `2px solid ${C.surface3}`, marginTop: j ? 0 : 10, opacity: mix(0.3, 1, Math.min(1, rs[j] * 2)) }}>
          <span style={{ flex: 1, fontWeight: 800, fontSize: 24, color: C.text }}>{r.k}</span>
          <span style={{ fontWeight: 800, fontSize: 26, color: rs[j] > 0.5 ? A.hex : C.dim }}>{rs[j] > 0.5 ? "✓" : "—"}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_video - 0.35, s: 1.05, y: 0 }, { t: c.c_video + 0.9, s: 1.07, x: 4, y: -8, e: ease.out }, { t: c.c_docs, s: 1.05, x: -4, y: -14, e: ease.linear }, { t: c.c_promo, s: 1.07, x: 3, y: -22, e: ease.linear }, { t: c.x_prop + 0.3, s: 1.05, y: -30, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 470, display: "flex", justifyContent: "space-between", opacity: 1 - 0.5 * fade(fin) }}>
          {card("PROPOSTA A", "-50%", 0)}
          {card("PROPOSTA B", "-20%", 1)}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", gap: 12, opacity: (1 - fade(fin)) }}>
          {big > 0.001 ? <div style={{ opacity: fade(big), transform: `scale(${mix(0.5, 1, Math.min(1.08, big))})` }}><Tag text="MAIOR % ≠ MELHOR PROPOSTA" tone="warn" size={26} /></div> : null}
          <Tag text="PROPOSTAS FICTÍCIAS" tone="muted" size={24} />
        </div>
        {res > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", opacity: fade(res) * (1 - fade(fin)), transform: `translateY(${fl(t, 4, 6)}px)` }}><Tag text="✓ PROMOÇÃO BOA RESISTE À COMPARAÇÃO" tone="accent" size={26} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 990, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Compare propostas<br /><span style={{ color: A.hex }}>completas</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>COMPARE PROPOSTAS</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>COMPLETAS</span></Title>
    </div>
  );
};
