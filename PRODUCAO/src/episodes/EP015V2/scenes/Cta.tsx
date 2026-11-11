import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { IconCheck, IconLink } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENA 05 — CTA. A linha do tempo vira um quadro de tarefas (interface ILUSTRATIVA): os próximos passos chegam
 * e, em "organizados", se ordenam por data. Fecho: LINK NA BIO. Sem marca, URL, preço ou promessa.
 */
const P = { x: 70, y: 250, w: 940, h: 900 };
const TASKS = [
  { title: "Retornar para Paula", sub: "assunto: as 2 opções", when: "SEX 10h", order: 2, accent: true },
  { title: "Confirmar visita", sub: "cliente fictício", when: "QUI 15h", order: 1, accent: false },
  { title: "Enviar documentos", sub: "cliente fictício", when: "HOJE", order: 0, accent: false },
];
const ROW = 190;

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const tasks = tl.series.tasks;
  const enter = prog(t, c.cta_board + 0.2, 0.4, ease.out);
  const sort = prog(t, c.cta_org + 0.2, 0.55, ease.inOut);
  const orgChip = sp(t, c.cta_org + 0.5, { damping: 10, stiffness: 230 });
  const label = prog(t, c.cta_sys, 0.4, ease.out);
  const away = prog(t, c.cta_link - 0.12, 0.45, ease.in);
  const end = sp(t, c.cta_link + 0.02, { damping: 12, stiffness: 170 });
  const sub = sp(t, c.cta_link + 0.4, { damping: 14, stiffness: 170 });
  const ring = (t - c.cta_link) % 1.4;
  if (t < c.cta_board) return null;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <div style={{ position: "absolute", inset: 0, opacity: enter * (1 - away) }}>
        <Camera
      drift={0.5}
          t={t}
          keys={[
            { t: c.cta_board, s: 1.0, y: 0 },
            { t: c.cta_keep + 0.4, s: 1.04, y: -30, rx: 4 },
            { t: c.cta_org + 0.6, s: 0.98, y: 0, rx: 10, ry: -5, e: ease.inOut },
            { t: c.cta_link, s: 0.94, y: 20, rx: 14, ry: 4 },
            { t: c.cta_link + 0.5, s: 1.6, y: 20, rx: 0, ry: 0, e: ease.in },
          ]}
        >
          <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, height: P.h, boxSizing: "border-box", borderRadius: 40, background: C.surface, border: `3px solid ${C.accent}`, boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 120px rgba(53,224,161,0.12)", overflow: "hidden" }}>
            <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
              <span style={{ fontWeight: 800, fontSize: 42, color: C.text, letterSpacing: "-0.02em" }}>Próximos passos</span>
              <span style={{ fontFamily: F.mono, fontWeight: 500, fontSize: 20, color: C.muted, border: `1px solid ${C.line}`, borderRadius: 14, padding: "8px 14px" }}>interface ilustrativa</span>
            </div>
            {/* trilho de datas à esquerda */}
            <div style={{ position: "absolute", left: 64, top: 160, width: 6, height: 3 * ROW - 40, borderRadius: 3, background: C.surface3 }} />
            {TASKS.map((tk, k) => {
              const a = sp(t, tasks[k], { damping: 14, stiffness: 190 });
              const slot = mix(k, tk.order, sort);
              const y = 160 + slot * ROW;
              return (
                <React.Fragment key={k}>
                  <div style={{ position: "absolute", left: 52, top: y + 58, width: 30, height: 30, borderRadius: 15, background: tk.accent ? C.accent : C.text, border: `6px solid ${C.surface}`, opacity: Math.min(1, a * 2) }} />
                  <div
                    style={{
                      position: "absolute",
                      left: 110,
                      top: y,
                      width: 790,
                      height: ROW - 30,
                      boxSizing: "border-box",
                      borderRadius: 28,
                      background: tk.accent ? "#123A2D" : C.surface2,
                      border: `2px solid ${tk.accent ? "rgba(53,224,161,0.55)" : C.line}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      padding: "0 28px",
                      opacity: Math.min(1, a * 1.6),
                      transform: `translateX(${(1 - Math.min(1, a)) * 600}px) rotate(${(1 - Math.min(1, a)) * 6}deg)`,
                    }}
                  >
                    <div style={{ width: 54, height: 54, borderRadius: 16, border: `3px solid ${tk.accent ? C.accent : C.muted}`, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 38, color: C.text, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{tk.title}</div>
                      <div style={{ fontWeight: 600, fontSize: 26, color: tk.accent ? "#BFF3DF" : C.muted, marginTop: 4 }}>{tk.sub}</div>
                    </div>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, padding: "10px 14px", borderRadius: 14, background: tk.accent ? C.accent : C.surface3, color: tk.accent ? C.accentInk : C.text, whiteSpace: "nowrap" }}>{tk.when}</div>
                  </div>
                </React.Fragment>
              );
            })}
            {orgChip > 0 ? (
              <div style={{ position: "absolute", left: 110, bottom: 46, display: "flex", alignItems: "center", gap: 12, fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: C.accent, opacity: Math.min(1, orgChip * 2), transform: `scale(${mix(1.4, 1, Math.min(1, orgChip))})`, transformOrigin: "0% 50%" }}>
                <IconCheck size={34} color={C.accent} /> ORGANIZADO POR DATA
              </div>
            ) : null}
          </div>
        </Camera>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: mix(272, 628, Math.min(1, end)), textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 31, letterSpacing: "0.14em", color: C.accent, opacity: label * (end > 0 ? 1 : 1 - away * 0), transform: `translateY(${(1 - label) * 24}px)`, textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
        SISTEMA IMOBILIÁRIO PERSONALIZADO
      </div>

      {end > 0 ? (
        <>
          {[0, 1].map((k) => {
            const r = ((ring + k * 0.7) % 1.4) / 1.4;
            return <div key={k} style={{ position: "absolute", left: 140 - r * 70, top: 712 - r * 70, width: 800 + r * 140, height: 216 + r * 140, borderRadius: 160, border: `3px solid ${C.accent}`, opacity: (1 - r) * 0.4 * Math.min(1, end) }} />;
          })}
          <div style={{ position: "absolute", left: 140, top: 712, width: 800, height: 216, borderRadius: 108, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, opacity: Math.min(1, end * 2), transform: `scale(${mix(0.4, 1, end) * (1 + 0.025 * Math.sin((t - c.cta_link) * 5))})`, boxShadow: "0 30px 90px rgba(53,224,161,0.35), 0 30px 60px rgba(0,0,0,0.5)" }}>
            <IconLink size={92} color={C.accentInk} stroke={2.3} />
            <span style={{ fontWeight: 800, fontSize: 98, letterSpacing: "-0.04em", color: C.accentInk, whiteSpace: "nowrap" }}>LINK NA BIO</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 986, textAlign: "center", fontWeight: 700, fontSize: 54, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, sub * 1.6), transform: `translateY(${(1 - sub) * 30}px)` }}>
            Veja o sistema
          </div>
        </>
      ) : null}
    </div>
  );
};
