import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { LEAD, Mark, Tag, barH } from "./ui";
import { LINES } from "./Summary";

/**
 * CENA 04 — INSIGHT. "E registre a mesma informação no acompanhamento do cliente.
 * Assim, você não depende de alguém lembrar exatamente o que ouviu."
 * O resumo entra no acompanhamento da cliente (interface ilustrativa). A "memória" — uma onda borrada com "?" — se desfaz,
 * enquanto uma varredura confere linha por linha.
 */
export const Followup: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const panel = sp(t, c.ins_reg - 0.05, { damping: 16, stiffness: 140 });
  const drop = prog(t, c.ins_reg + 0.2, 0.9, ease.inOut);
  const landed = sp(t, c.ins_follow + 0.6, { damping: 12, stiffness: 190 });
  const memIn = sp(t, c.ins_dep - 0.2, { damping: 14, stiffness: 160 });
  const memOut = prog(t, c.ins_remember + 0.3, 0.8, ease.in);
  const scan = prog(t, c.ins_remember + 0.1, 1.4, ease.inOut);
  const ok = sp(t, c.ins_heard + 0.35, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.cta_routine - 0.1, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_reg, s: 0.95, y: -10 },
          { t: c.ins_follow + 0.5, s: 1.05, y: -30, e: ease.inOut },
          { t: c.ins_dep + 0.3, s: 1.0, y: 50, e: ease.inOut },
          { t: c.ins_heard + 0.5, s: 1.05, y: 0, e: ease.inOut },
          { t: c.cta_routine + 0.3, s: 0.96, y: 20, e: ease.in },
        ]}
      >
        {/* ficha de acompanhamento */}
        <div style={{ position: "absolute", left: 80, top: 280, width: 920, height: 700, borderRadius: 44, overflow: "hidden", background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", opacity: Math.min(1, panel * 1.5), transform: `translateY(${(1 - Math.min(1, panel)) * 120}px)` }}>
          <div style={{ height: 130, display: "flex", alignItems: "center", gap: 22, padding: "0 34px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
            <Avatar size={80} label={LEAD.ini} bg={LEAD.bg} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 40, color: C.text }}>{LEAD.name}</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>acompanhamento do cliente</div>
            </div>
            <Tag text="INTERFACE ILUSTRATIVA" tone="muted" size={17} />
          </div>
          <div style={{ padding: "30px 36px" }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.muted }}>REGISTRO · ÁUDIO DE 3:00 + RESUMO</div>
            {/* o resumo cai dentro da ficha */}
            <div style={{ marginTop: 18, borderRadius: 28, background: C.surface2, border: `2px solid ${landed > 0.5 ? "rgba(58,245,132,0.5)" : C.line}`, padding: "10px 28px 26px", transform: `translateY(${(1 - drop) * -260}px) scale(${mix(0.85, 1, drop)})`, opacity: Math.min(1, drop * 2), position: "relative", overflow: "hidden" }}>
              {LINES.map((l, i) => {
                const chk = sp(t, c.ins_remember + 0.25 + i * 0.4, { damping: 12, stiffness: 200 });
                return (
                  <div key={l.k} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 20 }}>
                    <div style={{ opacity: Math.min(1, chk * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, chk))})` }}>
                      <Mark ok size={44} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 28, color: C.accent }}>{l.k}</div>
                      <div style={{ fontWeight: 700, fontSize: 36, color: C.text, marginTop: 2 }}>{l.v}</div>
                    </div>
                  </div>
                );
              })}
              {scan > 0 && scan < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 6, background: "rgba(58,245,132,0.7)", boxShadow: "0 0 24px rgba(58,245,132,0.6)" }} /> : null}
            </div>
            {ok > 0 ? (
              <div style={{ marginTop: 26, display: "flex", justifyContent: "flex-end", opacity: Math.min(1, ok * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, ok))})`, transformOrigin: "100% 50%" }}>
                <Tag text="CONFERIDO ✓ · SEM DEPENDER DE MEMÓRIA" tone="accent" size={22} />
              </div>
            ) : null}
          </div>
        </div>
        {/* a memória que se desfaz */}
        {memIn > 0 && memOut < 1 ? (
          <div style={{ position: "absolute", left: 300, top: 1130, width: 480, height: 150, borderRadius: 75, background: C.surface2, border: `2px dashed ${C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: Math.min(1, memIn * 1.5) * (1 - memOut), filter: `blur(${2 + memOut * 10}px)`, transform: `scale(${mix(0.7, 1, Math.min(1, memIn)) * (1 + memOut * 0.2)})` }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} style={{ width: 8, height: barH(i + 40) * 80, borderRadius: 3, background: C.muted }} />
            ))}
            <span style={{ position: "absolute", right: 30, top: 18, fontWeight: 800, fontSize: 70, color: C.warn }}>?</span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
