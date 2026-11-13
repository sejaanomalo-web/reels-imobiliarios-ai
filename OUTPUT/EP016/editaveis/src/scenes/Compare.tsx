import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { IconCheck } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, NEW_MSG, OLD_MSG, Tag } from "./ui";

/**
 * CENA 03 — TENSÃO. "A primeira mensagem cobra uma decisão sem contexto. A segunda lembra a necessidade da pessoa e permite que ela atualize a busca."
 * As duas mensagens lado a lado; a câmera visita uma de cada vez. COBRAR × AJUDAR.
 */
const COL = { y: 400, w: 455, h: 700 };
const XL = 60;
const XR = 565;

const Row: React.FC<{ ok: boolean; text: string; p: number }> = ({ ok, text, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * 30}px)` }}>
    <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 26, background: ok ? C.accent : "rgba(255,107,94,0.16)", border: ok ? "none" : `2px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.warn, fontWeight: 800, fontSize: 30 }}>
      {ok ? <IconCheck size={30} /> : "✕"}
    </div>
    <span style={{ fontWeight: 700, fontSize: 32, lineHeight: 1.15, color: C.text }}>{text}</span>
  </div>
);

export const Compare: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const inL = sp(t, c.ten_split - 0.1, { damping: 16, stiffness: 140 });
  const inR = sp(t, c.ten_split + 0.05, { damping: 16, stiffness: 140 });
  const cobra = sp(t, c.ten_cobra, { damping: 11, stiffness: 200 });
  const ctx = prog(t, c.ten_ctx, 0.4, ease.out);
  const second = prog(t, c.ten_second - 0.1, 0.5, ease.inOut);
  const ajudar = sp(t, c.ten_need - 0.2, { damping: 11, stiffness: 200 });
  const need = prog(t, c.ten_need, 0.4, ease.out);
  const upd = prog(t, c.ten_update, 0.4, ease.out);
  const search = prog(t, c.ten_update + 0.15, 0.7, ease.inOut);
  const exit = prog(t, c.ins_base - 0.12, 0.45, ease.in);
  const focusL = 1 - second;

  const card = (x: number, active: number, enter: number, children: React.ReactNode) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: COL.y,
        width: COL.w,
        height: COL.h,
        boxSizing: "border-box",
        borderRadius: 42,
        padding: "34px 30px",
        background: C.surface,
        border: `1px solid ${C.line}`,
        boxShadow: "0 40px 90px rgba(0,0,0,0.5)",
        opacity: Math.min(1, enter * 1.5) * mix(0.45, 1, active),
        transform: `translateY(${(1 - enter) * 120}px) scale(${mix(0.96, 1, active)})`,
        display: "flex",
        flexDirection: "column",
        gap: 26,
        fontFamily: F.sans,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_split, s: 0.95, x: 0 },
          { t: c.ten_cobra + 0.2, s: 1.06, x: -90, y: 20, e: ease.inOut },
          { t: c.ten_second + 0.3, s: 1.06, x: 90, y: 20, e: ease.inOut },
          { t: c.ten_update + 0.5, s: 1.0, x: 40, y: 0, e: ease.inOut },
          { t: c.ins_base + 0.3, s: 0.94, x: 0, y: 0, e: ease.in },
        ]}
      >
        {card(
          XL,
          Math.max(0.55, focusL),
          inL,
          <>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.muted }}>MENSAGEM 1</div>
            <Bubble tone="gray" size={38}>{OLD_MSG}</Bubble>
            <div style={{ height: 8 }} />
            <div style={{ transform: `scale(${mix(0.6, 1, Math.min(1.1, cobra))})`, transformOrigin: "0 50%", opacity: Math.min(1, cobra * 2) }}>
              <Tag text="COBRAR" tone="warn" size={44} />
            </div>
            <Row ok={false} text="uma decisão" p={prog(t, c.ten_cobra + 0.3, 0.4, ease.out)} />
            <Row ok={false} text="sem contexto" p={ctx} />
          </>,
        )}
        {card(
          XR,
          second,
          inR,
          <>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.muted }}>MENSAGEM 2</div>
            <Bubble tone="green" size={30}>{NEW_MSG.join(" ")}</Bubble>
            <div style={{ transform: `scale(${mix(0.6, 1, Math.min(1.1, ajudar))})`, transformOrigin: "0 50%", opacity: Math.min(1, ajudar * 2) }}>
              <Tag text="AJUDAR" tone="accent" size={44} />
            </div>
            <Row ok text="lembra a necessidade" p={need} />
            <Row ok text="atualiza a busca" p={upd} />
            {/* a busca do cliente se atualiza */}
            <div style={{ marginTop: 6, borderRadius: 24, background: C.surface2, padding: "18px 22px", opacity: Math.min(1, upd * 1.4) }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em", color: C.muted }}>BUSCA DO CLIENTE</div>
              <div style={{ position: "relative", height: 44, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: mix(0, -44, search), fontWeight: 800, fontSize: 30, color: C.dim, textDecoration: "line-through" }}>
                  busca de 23 dias atrás
                </div>
                <div style={{ position: "absolute", left: 0, top: mix(44, 0, search), fontWeight: 800, fontSize: 30, color: C.accent }}>
                  busca atualizada ✓
                </div>
              </div>
            </div>
          </>,
        )}
      </Camera>
    </div>
  );
};
