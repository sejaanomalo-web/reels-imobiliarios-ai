import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Door, Label, LuxArt, Mark, Plan, Tag } from "./ui";

/**
 * CENA 3 — TAKE 02, O DIFERENCIAL. "Em imóveis de alto padrão, uma apresentação bonita não basta." → porta fechada de casa genérica com o
 * selo APRESENTAÇÃO BONITA ✕. "É preciso estudar materiais, circulação, arquitetura, contexto e perguntas que aquele comprador
 * provavelmente fará." → cinco cartões de estudo surgem ANTES da porta abrir (planta, amostra de material, fluxo, entorno, "?").
 * "A confiança aparece quando o profissional explica sem improvisar." → a porta abre; DOMÍNIO DO IMÓVEL.
 */
const CARDS = [
  { k: "MATERIAIS", x: 90, y: 370 },
  { k: "CIRCULAÇÃO", x: 600, y: 370 },
  { k: "ARQUITETURA", x: 90, y: 1035 },
  { k: "CONTEXTO", x: 600, y: 1035 },
  { k: "PERGUNTAS DO COMPRADOR", x: 250, y: 1195 },
];

const Swatch: React.FC = () => (
  <div style={{ display: "flex", gap: 6 }}>
    {["#B9A27A", "#8C8F94", "#3A3026", "#D8D2C4"].map((c) => <div key={c} style={{ width: 30, height: 30, borderRadius: 6, background: c }} />)}
  </div>
);

export const Diferencial: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.d_mat, c.d_circ, c.d_arq, c.d_ctx, c.d_perg];
  const enter = sp(t, c.d_alto - 0.35, { damping: 15, stiffness: 150 });
  const pretty = sp(t, c.d_apres - 0.1, { damping: 12, stiffness: 200 });
  const no = sp(t, c.d_basta - 0.1, { damping: 11, stiffness: 220 });
  const cards = at.map((x) => sp(t, x - 0.12, { damping: 12, stiffness: 210 }));
  const open = prog(t, c.d_conf - 0.2, 1.0, ease.inOut);
  const key = sp(t, c.d_expl - 0.1, { damping: 12, stiffness: 190 });
  const out = prog(t, c.l_talvez - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_alto - 0.35, s: 1.06, y: -20 },
          { t: c.d_basta + 0.3, s: 1.08, y: 0, e: ease.inOut },
          { t: c.d_estudar + 0.2, s: 0.98, y: 0, e: ease.inOut },
          { t: c.d_mat + 0.15, s: 1.04, x: -35, y: -50, e: ease.inOut },
          { t: c.d_circ + 0.15, s: 1.04, x: 35, y: -50, e: ease.inOut },
          { t: c.d_arq + 0.15, s: 1.04, x: -35, y: 60, e: ease.inOut },
          { t: c.d_ctx + 0.15, s: 1.04, x: 35, y: 60, e: ease.inOut },
          { t: c.d_perg + 0.3, s: 1.02, x: 0, y: 100, e: ease.inOut },
          { t: c.d_conf + 0.4, s: 1.04, y: -20, e: ease.inOut },
          { t: c.l_talvez, s: 1.03, y: -20, e: ease.linear },
        ]}
      >
        {/* a porta */}
        <div style={{ position: "absolute", left: 340, top: 545, opacity: Math.min(1, enter * 1.5) }}>
          <div style={{ position: "absolute", left: -60, top: -40, width: 520, height: 520, borderRadius: 30, background: "#141922", border: `2px solid ${open > 0.5 ? brandAlpha(0.5) : C.line}` }} />
          <div style={{ position: "relative", left: 40, top: 20, transform: `scale(${mix(1, 1.04, open)})` }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: `linear-gradient(105deg, transparent ${((t * 0.5) % 1) * 140 - 30}%, rgba(255,255,255,0.10) ${((t * 0.5) % 1) * 140 - 15}%, transparent ${((t * 0.5) % 1) * 140}%)` }} />
            <Door w={320} h={440} p={open}>
              <div style={{ position: "absolute", left: -40, top: 120 }}><LuxArt w={400} lit={open} /></div>
              <div style={{ position: "absolute", left: 40, top: 30, opacity: open }}><Plan size={240} /></div>
            </Door>
          </div>
        </div>
        {pretty > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 545, display: "flex", justifyContent: "center", alignItems: "center", gap: 12, opacity: Math.min(1, pretty * 1.5) * (1 - prog(t, c.d_estudar, 0.4, ease.in)), transform: `scale(${mix(0.6, 1, Math.min(1.06, pretty))})`, zIndex: 4 }}>
            <Tag text="APRESENTAÇÃO BONITA" tone="muted" size={30} style={{ color: "#E5C07B", background: "rgba(7,8,10,0.85)", border: "2px solid #E5C07B" }} />
            {no > 0.001 ? <div style={{ transform: `scale(${mix(1.8, 1, Math.min(1, no))})` }}><Mark ok={false} size={56} /></div> : null}
          </div>
        ) : null}
        {/* cartões de estudo */}
        {CARDS.map((k, i) => {
          const p = cards[i];
          if (p <= 0.001) return null;
          const wide = i === 4;
          return (
            <div key={k.k} style={{ position: "absolute", left: k.x, top: k.y + Math.sin(t * 1.5 + i) * 5, width: wide ? 580 : 390, height: wide ? 96 : 140, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `3px solid ${BRAND.hex}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, p * 1.5) * (1 - open * 0.25) * (i < 2 ? 1 - Math.min(1, key * 1.2) * 0.9 : 1), transform: `scale(${mix(0.5, 1, Math.min(1.06, p))})`, boxShadow: `0 0 26px ${brandAlpha(0.2)}`, zIndex: 3 }}>
              {i === 0 ? <Swatch /> : null}
              {i === 1 ? <svg width={60} height={50} viewBox="0 0 60 50"><path d="M5 40 C 20 10, 40 40, 55 10" stroke={BRAND.hex} strokeWidth="5" fill="none" strokeDasharray="8 6" strokeDashoffset={-t * 20} /></svg> : null}
              {i === 2 ? <div style={{ width: 60, height: 50 }}><Plan size={56} /></div> : null}
              {i === 3 ? <svg width={60} height={50} viewBox="0 0 60 50"><path d="M0 25 H60 M20 0 V50 M44 0 V50" stroke={C.muted} strokeWidth="4" /><circle cx="32" cy="25" r="7" fill={BRAND.hex} /></svg> : null}
              {i === 4 ? <div style={{ width: 52, height: 52, borderRadius: 16, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>?</div> : null}
              <Label size={wide ? 28 : 30} color={C.text}>{k.k}</Label>
            </div>
          );
        })}
      </Camera>
      {key > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 72, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `translateY(${(1 - Math.min(1, key)) * 30}px)`, textShadow: `0 0 30px ${brandAlpha(0.25)}` }}>
          DOMÍNIO DO <span style={{ color: BRAND.hex }}>IMÓVEL</span>
        </div>
      ) : null}
    </div>
  );
};
