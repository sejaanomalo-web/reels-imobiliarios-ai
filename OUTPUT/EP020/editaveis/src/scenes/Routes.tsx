import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconCal, IconSliders, IconUser, Mark } from "./ui";

/**
 * CENA 04 — INSIGHT. "Se estiver tudo alinhado, marque a visita. Se não, ajude a pessoa a definir melhor o que busca.
 * Qualificação não precisa ser pressão."
 * O caminho se divide em duas rotas claras: VISITA CONFIRMADA e AJUSTAR BUSCA. As duas acendem juntas no fim —
 * as duas são respeitosas — e a frase vira tipografia: QUALIFICAÇÃO ≠ PRESSÃO.
 */
const NODE = { x: 540, y: 380 };
const L = { x: 70, y: 640, w: 450, h: 330 };
const R = { x: 560, y: 640, w: 450, h: 330 };

export const Routes: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const node = sp(t, c.ins_if - 0.05, { damping: 14, stiffness: 160 });
  const left = prog(t, c.ins_if + 0.4, 0.8, ease.inOut);
  const book = sp(t, c.ins_book - 0.05, { damping: 11, stiffness: 190 });
  const right = prog(t, c.ins_else, 0.8, ease.inOut);
  const help = sp(t, c.ins_help + 0.2, { damping: 12, stiffness: 180 });
  const sliders = prog(t, c.ins_define, 1.0, ease.inOut);
  const both = prog(t, c.ins_qual - 0.1, 0.6, ease.out);
  const word = sp(t, c.ins_qual, { damping: 13, stiffness: 180 });
  const press = sp(t, c.ins_press - 0.1, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.ins_press + 0.25, 0.4, ease.out);
  const exit = prog(t, c.cta_crit - 0.1, 0.45, ease.in);
  const glowL = Math.max(Math.min(1, book), both);
  const glowR = Math.max(Math.min(1, help), both);

  const card = (b: typeof L, p: number, glow: number, title: string, icon: React.ReactNode, body: React.ReactNode) => (
    <div style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `3px solid ${glow > 0.5 ? C.accent : C.line}`, padding: "28px 30px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 80}px) scale(${mix(0.85, 1, Math.min(1, p))})`, boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 ${80 * glow}px rgba(53,224,161,${0.22 * glow})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 70, height: 70, borderRadius: 22, background: "rgba(53,224,161,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <span style={{ fontWeight: 800, fontSize: 38, lineHeight: 1.05, color: C.text }}>{title}</span>
      </div>
      <div style={{ marginTop: 24 }}>{body}</div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_if, s: 1.06, y: -160 },
          { t: c.ins_book + 0.4, s: 1.05, y: -40, x: -50, e: ease.inOut },
          { t: c.ins_define + 0.3, s: 1.05, y: -40, x: 50, e: ease.inOut },
          { t: c.ins_qual + 0.3, s: 1.0, y: 40, x: 0, e: ease.inOut },
          { t: c.cta_crit + 0.3, s: 0.95, y: 20, e: ease.in },
        ]}
      >
        {/* bifurcação */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <path d={`M${NODE.x} ${NODE.y + 70} C ${NODE.x} 560, 295 520, 295 ${L.y}`} fill="none" stroke={C.accent} strokeWidth={7} strokeLinecap="round" strokeDasharray={`${420 * left} 500`} />
          <path d={`M${NODE.x} ${NODE.y + 70} C ${NODE.x} 560, 785 520, 785 ${R.y}`} fill="none" stroke={right > 0 ? C.accent : C.dim} strokeWidth={7} strokeLinecap="round" strokeDasharray={`${420 * Math.max(right, 0.0001)} 500`} />
        </svg>
        <div style={{ position: "absolute", left: NODE.x - 70, top: NODE.y - 70, width: 140, height: 140, borderRadius: 70, background: C.surface2, border: `3px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, node * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1, node))})` }}>
          <IconUser size={80} />
        </div>
        {card(L, left > 0.6 ? book : 0, glowL, "VISITA CONFIRMADA", <IconCal size={44} />,
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Mark ok size={36} /><span style={{ fontWeight: 700, fontSize: 30, color: C.text }}>tudo alinhado</span></div>
            <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "10px 18px", borderRadius: 16, background: C.accent, color: C.accentInk, fontFamily: F.mono, fontWeight: 700, fontSize: 24 }}>sábado · 10h ✓</div>
          </div>,
        )}
        {card(R, right > 0.6 ? help : 0, glowR, "AJUSTAR BUSCA", <IconSliders size={44} />,
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {["quartos", "faixa", "região"].map((k, i) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 110, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.muted }}>{k}</span>
                <div style={{ position: "relative", flex: 1, height: 10, borderRadius: 5, background: C.surface3 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: 5, background: C.accent, width: `${mix(25, [70, 55, 80][i], sliders)}%` }} />
                  <div style={{ position: "absolute", top: -9, left: `calc(${mix(25, [70, 55, 80][i], sliders)}% - 14px)`, width: 28, height: 28, borderRadius: 14, background: C.text }} />
                </div>
              </div>
            ))}
          </div>,
        )}
        {/* QUALIFICAÇÃO ≠ PRESSÃO */}
        {word > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1020, display: "flex", justifyContent: "center", alignItems: "center", gap: 26 }}>
            <span style={{ fontWeight: 800, fontSize: 92, letterSpacing: "-0.04em", color: C.accent, opacity: Math.min(1, word * 1.6), transform: `scale(${mix(1.3, 1, Math.min(1, word))})`, display: "inline-block" }}>QUALIFICAÇÃO</span>
          </div>
        ) : null}
        {press > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: Math.min(1, press * 1.6) }}>
            <span style={{ fontWeight: 800, fontSize: 70, color: C.muted }}>≠</span>
            <span style={{ position: "relative", fontWeight: 800, fontSize: 70, letterSpacing: "-0.03em", color: C.warn }}>
              PRESSÃO
              <span style={{ position: "absolute", left: -6, top: "52%", height: 8, borderRadius: 4, background: C.warn, width: `calc(${strike * 100}% + 12px)` }} />
            </span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
