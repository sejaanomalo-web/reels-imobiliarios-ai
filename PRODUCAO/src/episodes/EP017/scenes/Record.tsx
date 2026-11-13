import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { LEAD, Tag } from "./ui";

/**
 * CENA 03 — TENSÃO. "O erro é registrar apenas que ele não gostou. Você perde o critério que pode orientar a próxima indicação."
 * No registro da visita, o campo DESCARTOU recebe só "não gostou" e se apaga; surge o campo MOTIVO, vazio, em destaque,
 * ligado à próxima indicação — que fica sem direção.
 */
const P = { x: 90, y: 280, w: 900 };

export const Record: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.ten_error - 0.1, { damping: 16, stiffness: 130 });
  const check = sp(t, c.ten_error + 0.5, { damping: 11, stiffness: 220 });
  const typed = "não gostou";
  const nType = Math.round(prog(t, c.ten_disliked - 0.25, 0.45, ease.linear) * typed.length);
  const fade = prog(t, c.ten_lose - 0.1, 0.7, ease.inOut);
  const motivo = sp(t, c.ten_criteria - 0.05, { damping: 13, stiffness: 170 });
  const link = prog(t, c.ten_next - 0.1, 0.5, ease.inOut);
  const next = sp(t, c.ten_next + 0.2, { damping: 13, stiffness: 170 });
  const exit = prog(t, c.ins_after - 0.15, 0.45, ease.in);
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);
  const caret = Math.floor(t * 2.5) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_error, s: 0.95, y: -20, rx: 6 },
          { t: c.ten_disliked + 0.3, s: 1.08, y: -30, rx: 0, e: ease.inOut },
          { t: c.ten_criteria + 0.3, s: 1.06, y: 20, e: ease.inOut },
          { t: c.ten_next + 0.6, s: 1.02, y: 90, e: ease.inOut },
          { t: c.ins_after + 0.3, s: 0.95, y: 60, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, borderRadius: 44, background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", overflow: "hidden", fontFamily: F.sans, transform: `translateY(${(1 - Math.min(1, enter)) * 120}px)` }}>
          <div style={{ height: 130, display: "flex", alignItems: "center", gap: 22, padding: "0 34px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
            <Avatar size={80} label={LEAD.ini} bg={LEAD.bg} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 40, color: C.text }}>Registro da visita</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{LEAD.name} · apartamento 2 quartos</div>
            </div>
            <Tag text="INTERFACE ILUSTRATIVA" tone="muted" size={17} />
          </div>
          {/* campo DESCARTOU */}
          <div style={{ padding: "36px 40px 30px", opacity: mix(1, 0.3, fade), filter: fade > 0.02 ? `grayscale(${fade})` : undefined }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.muted }}>RESULTADO</div>
            <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, border: `3px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.warn, fontWeight: 800, fontSize: 48 }}>
                <span style={{ transform: `scale(${Math.min(1.1, check)})`, opacity: Math.min(1, check * 2) }}>✕</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 56, letterSpacing: "-0.02em", color: C.text }}>DESCARTOU</span>
            </div>
            <div style={{ marginTop: 22, height: 70, borderRadius: 18, background: C.surface2, display: "flex", alignItems: "center", padding: "0 26px", fontWeight: 700, fontSize: 36, color: C.text }}>
              <span style={{ color: C.dim, marginRight: 14, fontSize: 26, fontFamily: F.mono }}>OBS.</span>
              <span style={{ position: "relative" }}>
                {typed.slice(0, nType)}
                <span style={{ position: "absolute", left: -6, right: -6, top: "54%", height: 4, borderRadius: 2, background: C.muted, transform: `scaleX(${fade})`, transformOrigin: "0 50%" }} />
              </span>
            </div>
          </div>
          {/* campo MOTIVO */}
          <div style={{ height: mix(0, 250, Math.min(1, motivo)), overflow: "hidden" }}>
            <div style={{ margin: "0 30px 30px", padding: "28px 30px", borderRadius: 28, border: `4px solid rgba(58,245,132,${0.55 + 0.45 * pulse * Math.min(1, motivo)})`, background: "rgba(14,58,31,0.5)", opacity: Math.min(1, motivo * 1.5) }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.12em", color: C.accent }}>MOTIVO · O QUE FUNCIONOU E O QUE NÃO</div>
              <div style={{ marginTop: 18, height: 70, borderRadius: 16, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", padding: "0 24px", fontWeight: 700, fontSize: 34, color: C.dim }}>
                <span style={{ width: 4, height: 44, background: C.accent, opacity: caret ? 1 : 0, marginRight: 14 }} />
                vazio — o critério se perdeu
              </div>
            </div>
          </div>
        </div>
        {/* ligação com a próxima indicação */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <path d="M540 1000 V1080" stroke={C.warn} strokeWidth={5} strokeDasharray={`${90 * link} 200`} strokeLinecap="round" />
        </svg>
        {next > 0 ? (
          <div style={{ position: "absolute", left: 230, top: 1090, width: 620, height: 140, boxSizing: "border-box", borderRadius: 34, border: `3px dashed ${C.warn}`, background: C.surface, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", fontFamily: F.sans, opacity: Math.min(1, next * 1.5), transform: `scale(${mix(0.8, 1, Math.min(1, next))})` }}>
            <div>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.muted }}>PRÓXIMA INDICAÇÃO</div>
              <div style={{ fontWeight: 800, fontSize: 36, color: C.text, marginTop: 4 }}>sem critério</div>
            </div>
            <span style={{ fontWeight: 800, fontSize: 96, color: C.warn, lineHeight: 1 }}>?</span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
