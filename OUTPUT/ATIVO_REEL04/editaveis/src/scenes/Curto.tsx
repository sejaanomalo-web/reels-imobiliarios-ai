import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { People, PropCard, Tag, Thermo } from "./ui";

/**
 * CENA 2 — TAKE 01, O CAMINHO CURTO. "Imagina a primeira situação." → ATENDIMENTO 1 · FOTOS PRIMEIRO. "A pessoa pede um apartamento e recebe
 * logo dez opções parecidas, com valores, plantas e links." → dez cartões genéricos se amontoando (preço mascarado) + 10 OPÇÕES. "Ela até
 * agradece, mas continua sem saber o que realmente cabe na rotina e no orçamento." → "Obrigado!" e as dúvidas CABE NA ROTINA? / E NO
 * ORÇAMENTO? + 10 OPÇÕES. ZERO CLAREZA. "A conversa esfria." → termômetro da conversa cai para frio; cartões desbotam.
 */
export const Curto: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_imagina - 0.35, { damping: 15, stiffness: 150 });
  const ask = sp(t, c.c_pede - 0.1, { damping: 12, stiffness: 200 });
  const dur = Math.max(0.8, c.c_links + 0.3 - c.c_dez);
  const t0 = Math.min(c.c_dez - 0.1, c.c_pede + 0.5);
  const cards = Array.from({ length: 10 }).map((_, i) => sp(t, t0 + (i / 9) * (dur + (c.c_dez - 0.1 - t0)), { damping: 13, stiffness: 220 }));
  const nOn = cards.filter((p) => p > 0.3).length;
  const thanks = sp(t, c.c_agrad - 0.1, { damping: 12, stiffness: 200 });
  const q = [c.c_rotina, c.c_orc].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const zero = sp(t, c.c_sem, { damping: 12, stiffness: 190 });
  const cold = prog(t, c.c_esfria - 0.2, 0.9, ease.inOut);
  const out = prog(t, c.o_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.c_imagina - 0.35, s: 1.05, y: -40 },
          { t: c.c_dez + 0.3, s: 1.0, y: 20, e: ease.inOut },
          { t: c.c_links + 0.3, s: 1.06, y: 60, e: ease.inOut },
          { t: c.c_rotina, s: 1.02, y: -10, e: ease.inOut },
          { t: c.c_esfria + 0.4, s: 1.04, y: 20, e: ease.inOut },
          { t: c.o_seg, s: 1.04, y: 20, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="ATENDIMENTO 1 · FOTOS PRIMEIRO" tone="muted" size={28} style={{ color: C.text }} />
          <Tag text="ILUSTRATIVO" tone="muted" size={20} />
        </div>
        {/* família + falas */}
        <div style={{ position: "absolute", left: 100, top: 380, display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div style={{ padding: "16px 22px 10px", borderRadius: 28, background: C.surface, border: `2px solid ${C.line}`, transform: `translateY(${Math.sin(t * 1.8) * 4}px)` }}><People n={3} size={74} color={cold > 0.5 ? C.cold : C.text} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ask > 0.001 && thanks < 0.5 ? <div style={{ padding: "12px 22px", borderRadius: 24, background: C.surface3, fontWeight: 800, fontSize: 36, color: C.text, opacity: Math.min(1, ask * 1.5) }}>“Quero um apartamento.”</div> : null}
            {thanks > 0.5 ? <div style={{ padding: "12px 22px", borderRadius: 24, background: C.surface3, fontWeight: 800, fontSize: 36, color: C.text }}>“Obrigado!”</div> : null}
            <div style={{ display: "flex", gap: 10 }}>
              {["CABE NA ROTINA?", "E NO ORÇAMENTO?"].map((k, i) => (q[i] > 0.001 ? <div key={k} style={{ opacity: Math.min(1, q[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, q[i]))})` }}><Tag text={k} tone="warn" size={26} /></div> : null))}
            </div>
          </div>
        </div>
        {/* pilha de opções */}
        {cards.map((p, i) => {
          if (p <= 0.001) return null;
          const x = 140 + rnd(i * 3 + 1) * 560;
          const y = 620 + rnd(i * 5 + 2) * 380;
          const r = (rnd(i * 7 + 3) - 0.5) * 24;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y + (1 - Math.min(1, p)) * -300, transform: `rotate(${r + Math.sin(t * 1.4 + i) * 1.5}deg) scale(${mix(0.6, 1, Math.min(1, p))})`, opacity: Math.min(1, p * 2), zIndex: i }}>
              <PropCard w={230} i={i} dim={cold} />
            </div>
          );
        })}
        {nOn > 0 ? (
          <div style={{ position: "absolute", right: 110, top: 560, zIndex: 20, padding: "10px 22px", borderRadius: 24, background: C.surface, border: `3px solid ${C.text}`, fontWeight: 800, fontSize: 44, color: C.text }}>
            {nOn} OPÇÕES
          </div>
        ) : null}
        {zero > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", zIndex: 21, opacity: Math.min(1, zero * 1.5), transform: `rotate(-3deg) scale(${mix(1.6, 1, Math.min(1, zero))})` }}>
            <div style={{ padding: "16px 34px", borderRadius: 24, background: "rgba(7,8,10,0.92)", border: `4px solid ${C.warn}`, fontWeight: 800, fontSize: 58, letterSpacing: "-0.02em", color: C.text }}>
              10 OPÇÕES. <span style={{ color: C.warn }}>ZERO CLAREZA.</span>
            </div>
          </div>
        ) : null}
        {/* conversa esfriando */}
        <div style={{ position: "absolute", left: 160, right: 160, top: 1225, display: "flex", alignItems: "center", gap: 16, zIndex: 22, opacity: prog(t, c.c_agrad, 0.5, ease.out) }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: cold > 0.5 ? C.cold : C.muted }}>CONVERSA</span>
          <div style={{ flex: 1 }}><Thermo w={560} v={mix(0.85, 0.1, cold)} /></div>
        </div>
      </Camera>
    </div>
  );
};
