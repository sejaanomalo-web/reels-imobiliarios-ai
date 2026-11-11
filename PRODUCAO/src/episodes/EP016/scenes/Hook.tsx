import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, LEAD, OLD_MSG, Tag } from "./ui";

/**
 * CENA 01 — GANCHO. "Se um cliente parou de responder, não comece com aquele clássico: alguma novidade?"
 * Conversa parada há semanas; o corretor digita "Alguma novidade?", a mensagem sai numa caixa cinza… e recebe silêncio.
 */
const P = { x: 70, y: 250, w: 940, h: 1010 };

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const typed = Math.round(prog(t, c.hook_type, c.hook_send - c.hook_type - 0.15, ease.linear) * OLD_MSG.length);
  const sent = sp(t, c.hook_send, { damping: 14, stiffness: 180 });
  const big = sp(t, c.hook_send + 0.6, { damping: 13, stiffness: 160 });
  const silence = prog(t, c.hook_send + 1.05, 0.6, ease.inOut);
  const exit = prog(t, c.sit_new - 0.05, 0.4, ease.in);
  const caret = Math.floor(t * 2.5) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: 70, x: -25, r: -1.8, rx: 8 },
          { t: 1.3, s: 1.08, y: 60, x: 0, r: 0, rx: 0, e: ease.out },
          { t: c.hook_send, s: 1.04, y: 60, e: ease.inOut },
          { t: c.hook_send + 1.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.sit_new + 0.4, s: 0.92, y: 0, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, height: P.h, borderRadius: 50, background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", overflow: "hidden", fontFamily: F.sans }}>
          <div style={{ height: 130, display: "flex", alignItems: "center", gap: 20, padding: "0 32px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
            <Avatar size={80} label={LEAD.ini} bg={LEAD.bg} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 40, color: C.text }}>{LEAD.name}</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>conversa ilustrativa</div>
            </div>
            <Tag text="SEM RESPOSTA" tone="warn" size={22} />
          </div>
          {/* histórico antigo */}
          <div style={{ position: "absolute", left: 34, top: 170, opacity: 0.75 * prog(t, 0.15, 0.4, ease.out), transform: `translateY(${(1 - prog(t, 0.15, 0.6, ease.out)) * 60}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.dim, marginBottom: 14 }}>{(() => { const n = Math.round(mix(1, 23, prog(t, 0.2, 2.2, ease.inOut))); return `HÁ ${n} ${n === 1 ? "DIA" : "DIAS"}`; })()}</div>
            <div style={{ display: "inline-block", padding: "18px 26px", borderRadius: 28, borderBottomLeftRadius: 8, background: C.surface2, fontWeight: 700, fontSize: 32, color: C.text }}>Vou pensar e te falo!</div>
          </div>
          {/* mensagem enviada */}
          {sent > 0 ? (
            <div style={{ position: "absolute", right: 34, top: 400, opacity: Math.min(1, sent * 1.6) * mix(1, 0.75, silence), transform: `translateY(${(1 - Math.min(1, sent)) * 80}px)` }}>
              <Bubble tone="gray" size={40}>{OLD_MSG}</Bubble>
              <div style={{ textAlign: "right", marginTop: 10, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.dim }}>enviada ✓✓</div>
            </div>
          ) : null}
          {/* silêncio visual */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 720, height: 110, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, opacity: silence }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: C.surface3, opacity: 0.3 + 0.5 * Math.max(0, Math.sin(t * 3 - i)) }} />
            ))}
          </div>
          {/* campo de digitação */}
          <div style={{ position: "absolute", left: 30, right: 30, bottom: 30, height: 110, borderRadius: 55, background: C.surface2, display: "flex", alignItems: "center", padding: "0 36px", fontWeight: 700, fontSize: 38, color: C.text, opacity: 1 - silence * 0.6 }}>
            {sent < 0.5 ? (
              <>
                {OLD_MSG.slice(0, typed)}
                <span style={{ width: 4, height: 44, marginLeft: 4, background: C.accent, opacity: caret ? 1 : 0 }} />
              </>
            ) : (
              <span style={{ color: C.dim }}>Mensagem</span>
            )}
          </div>
        </div>
        {/* a frase em destaque, na caixa cinza */}
        {big > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", opacity: Math.min(1, big * 1.5) * (1 - silence * 0.65), transform: `scale(${mix(0.7, 1, Math.min(1, big))}) rotate(-3deg)` }}>
            <div style={{ padding: "26px 44px", borderRadius: 30, background: "#2A2F37", border: "3px solid rgba(255,255,255,0.18)", fontFamily: F.sans, fontWeight: 800, fontSize: 92, letterSpacing: "-0.04em", color: "#C3C8D0", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
              ALGUMA NOVIDADE?
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,6,8,0.5)", opacity: silence * 0.6, pointerEvents: "none" }} />
    </div>
  );
};
