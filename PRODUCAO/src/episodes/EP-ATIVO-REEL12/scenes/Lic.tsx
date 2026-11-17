import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Plan, Tag } from "./ui";

/**
 * CENA 4 — A LIÇÃO. "A diferença não está em esconder informação." → dois blocos COMPLICAR / ORIENTAR; ESCONDER INFORMAÇÃO aparece e é
 * riscado. "Está em oferecer a informação certa na hora certa." → a seta escolhe ORIENTAR: INFORMAÇÃO CERTA · HORA CERTA. "Para quem compra
 * o primeiro imóvel, entender a sequência pode ser tão importante quanto gostar da planta." → GOSTAR DA PLANTA = ENTENDER A SEQUÊNCIA (1→2→3).
 * Texto-chave: CLAREZA GERA CONFIANÇA.
 */
export const Lic: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.l_dif - 0.35, { damping: 15, stiffness: 150 });
  const blocks = sp(t, c.l_dif - 0.1, { damping: 13, stiffness: 180 });
  const hide = sp(t, c.l_esc - 0.2, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.l_esc + 0.5, 0.35, ease.out);
  const pick = prog(t, c.l_ofer - 0.1, 0.6, ease.inOut);
  const right = sp(t, c.l_certa - 0.1, { damping: 12, stiffness: 200 });
  const eq = sp(t, c.l_seq - 0.4, { damping: 12, stiffness: 190 });
  const plan = sp(t, c.l_plan - 0.4, { damping: 12, stiffness: 190 });
  const out = prog(t, c.f_e - 0.45, 0.4, ease.in);
  const blk = (x: number, label: string, good: boolean) => (
    <div style={{ position: "absolute", left: x, top: 440, width: 400, height: 200, boxSizing: "border-box", borderRadius: 32, background: good && pick > 0.5 ? BRAND.deep : C.surface, border: `3px solid ${good && pick > 0.5 ? BRAND.hex : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 52, letterSpacing: "-0.02em", color: good ? C.text : C.muted, opacity: Math.min(1, blocks * 1.5) * (good ? 1 : mix(1, 0.5, pick)), transform: `translateY(${(1 - Math.min(1, blocks)) * 60 + Math.sin(t * 1.7 + x) * 7}px) scale(${good ? mix(1, 1.06, pick) : mix(1, 0.94, pick)})`, boxShadow: good && pick > 0.5 ? `0 0 40px ${brandAlpha(0.3)}` : "none" }}>{label}</div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.l_dif - 0.35, s: 1.05, y: 0 },
          { t: ((c.l_dif - 0.35) + (c.l_dif + 0.6)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.l_dif + 0.6, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: ((c.l_dif + 0.6) + (c.l_esc + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.l_esc + 0.3, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: ((c.l_esc + 0.3) + (c.l_ofer + 0.3)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.l_ofer + 0.3, s: 1.09, x: 15, y: -15, e: ease.inOut },
          { t: ((c.l_ofer + 0.3) + (c.l_hora + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.l_hora + 0.3, s: 1.05, x: 10, y: -5, e: ease.inOut },
          { t: ((c.l_hora + 0.3) + (c.l_para + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.l_para + 0.3, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.l_para + 0.3) + (c.l_seq + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.l_seq + 0.3, s: 1.05, x: -10, y: -10, e: ease.inOut },
          { t: ((c.l_seq + 0.3) + (c.l_plan + 0.3)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.l_plan + 0.3, s: 1.09, x: 10, y: -20, e: ease.inOut },
          { t: c.f_e, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        {blk(100, "COMPLICAR", false)}
        {blk(580, "ORIENTAR", true)}
        {/* seta escolhe */}
        <div style={{ position: "absolute", left: 500, top: 680, width: 280, height: 12, borderRadius: 6, background: BRAND.hex, opacity: pick, transformOrigin: "0 50%", transform: `rotate(-20deg) scaleX(${pick})`, boxShadow: `0 0 14px ${brandAlpha(0.5)}` }} />
        {hide > 0.001 && pick < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", justifyContent: "center", opacity: Math.min(1, hide * 1.5) * (1 - pick) }}>
            <div style={{ position: "relative", padding: "16px 28px", borderRadius: 22, background: C.surface2, fontWeight: 800, fontSize: 44, color: C.text }}>
              ESCONDER INFORMAÇÃO
              <div style={{ position: "absolute", left: 16, right: 16, top: "50%", height: 8, borderRadius: 4, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike})` }} />
            </div>
          </div>
        ) : null}
        {right > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, right * 1.5) * (1 - prog(t, c.l_para - 0.2, 0.4, ease.in) * 0.6), transform: `scale(${mix(0.6, 1, Math.min(1.06, right))})` }}>
            <Tag text="INFORMAÇÃO CERTA" tone="accent" size={32} />
            <Tag text="HORA CERTA" tone="accent" size={32} style={{ opacity: prog(t, c.l_hora - 0.1, 0.3, ease.out) }} />
          </div>
        ) : null}
        {/* planta = sequência */}
        {eq > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", alignItems: "center", gap: 26, opacity: Math.min(1, eq * 1.5) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {[1, 2, 3].map((n, i) => {
                const p = prog(t, c.l_seq + i * 0.25, 0.3, ease.out);
                return <div key={n} style={{ width: 84, height: 84, borderRadius: 42, background: p > 0.5 ? BRAND.hex : C.surface3, color: p > 0.5 ? BRAND.ink : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, transform: `scale(${1 + 0.06 * Math.sin(t * 3 + i)})` }}>{n}</div>;
              })}
            </div>
            <div style={{ fontWeight: 800, fontSize: 70, color: C.muted, opacity: Math.min(1, plan * 1.5) }}>=</div>
            <div style={{ opacity: Math.min(1, plan * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, plan))}) rotate(${Math.sin(t * 1.5) * 3}deg)` }}><Plan size={130} color={C.text} /></div>
          </div>
        ) : null}
        {eq > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", gap: 120, opacity: Math.min(1, eq * 1.5) }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>ENTENDER A SEQUÊNCIA</span>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, opacity: Math.min(1, plan * 1.5) }}>GOSTAR DA PLANTA</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        {t >= c.l_para - 0.2 ? <>CLAREZA <span style={{ color: BRAND.hex }}>GERA CONFIANÇA</span></> : <>A <span style={{ color: BRAND.hex }}>DIFERENÇA</span></>}
      </div>
    </div>
  );
};
