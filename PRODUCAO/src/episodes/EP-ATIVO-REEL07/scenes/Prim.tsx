import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, People, Pro, Question, Sobrado, Tag } from "./ui";

/**
 * CENA 2 — PRIMEIRA ABORDAGEM. "Na primeira conversa, o profissional elogia a casa, tira algumas fotos e promete divulgar." → A: "Que casa
 * linda!", flashes de câmera, "Vou divulgar!". "Mas não explica para quem o imóvel é indicado, como vai apresentar os ambientes nem quais
 * informações ainda precisa confirmar." → folha da proposta com três lacunas: PARA QUEM? / COMO APRESENTAR? / O QUE CONFIRMAR?. "O
 * proprietário escuta uma proposta genérica." → proprietário + PROMESSA GENÉRICA.
 */
export const Prim: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_prim - 0.35, { damping: 15, stiffness: 150 });
  const b1 = sp(t, c.p_elogia - 0.1, { damping: 12, stiffness: 200 });
  const flash = [c.p_fotos, c.p_fotos + 0.35, c.p_fotos + 0.7].map((x) => Math.max(0, 1 - Math.abs(t - x) * 6));
  const b2 = sp(t, c.p_divulgar - 0.1, { damping: 12, stiffness: 200 });
  const sheet = sp(t, c.p_elogia - 0.2, { damping: 13, stiffness: 180 });
  const gaps = [c.p_quem, c.p_apres, c.p_conf].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 210 }));
  const owner = sp(t, c.p_prop - 0.1, { damping: 12, stiffness: 200 });
  const gen = sp(t, c.p_gen - 0.05, { damping: 11, stiffness: 220 });
  const out = prog(t, c.g_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_prim - 0.35, s: 1.04, y: 0 },
          { t: c.p_fotos, s: 1.06, x: -30, y: -10, e: ease.inOut },
          { t: c.p_divulgar + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: c.p_nao, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.p_quem, s: 1.06, x: 25, y: 0, e: ease.inOut },
          { t: c.p_apres, s: 1.04, x: -25, y: 0, e: ease.inOut },
          { t: c.p_conf + 0.2, s: 1.06, x: 20, y: 0, e: ease.inOut },
          { t: c.p_prop, s: 1.02, x: -10, y: 0, e: ease.inOut },
          { t: c.p_gen + 0.3, s: 1.06, x: 0, y: 0, e: ease.inOut },
          { t: c.g_seg, s: 1.06, y: 0, e: ease.linear },
        ]}
      >
        {/* A diante do sobrado */}
        <div style={{ position: "absolute", left: 470, top: 400, opacity: 1 - prog(t, c.p_nao - 0.2, 0.5, ease.out) * 0.6 }}><Sobrado w={420} /></div>
        {flash.map((f, k) => (f > 0 ? <div key={k} style={{ position: "absolute", left: 470, top: 400, width: 420, height: 360, background: "#fff", opacity: f * 0.4, borderRadius: 12 }} /> : null))}
        <div style={{ position: "absolute", left: 110, top: 560 }}><Pro who="A" size={190} /></div>
        {b1 > 0.001 && b2 < 0.5 ? <div style={{ position: "absolute", left: 100, top: 420, opacity: Math.min(1, b1 * 1.5) * (1 - b2 * 2), transform: `scale(${mix(0.5, 1, Math.min(1.08, b1))})`, transformOrigin: "0 100%" }}><Bubble text="Que casa linda!" /></div> : null}
        {b2 > 0.001 ? <div style={{ position: "absolute", left: 100, top: 420, opacity: Math.min(1, b2 * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, b2))})`, transformOrigin: "0 100%" }}><Bubble text="Vou divulgar!" /></div> : null}
        {/* folha com lacunas */}
        {sheet > 0.001 ? (
          <div style={{ position: "absolute", left: 160, right: 160, top: 800, boxSizing: "border-box", padding: "24px 28px", borderRadius: 24, background: C.paper, opacity: Math.min(1, sheet * 1.5), transform: `translateY(${(1 - Math.min(1, sheet)) * 80}px) rotate(-1.5deg)`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: C.inkMuted }}>PROPOSTA</div>
            {["Para quem é indicado?", "Como apresentar os ambientes?", "O que ainda confirmar?"].map((q, i) => (
              <div key={q} style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 14, opacity: mix(0.25, 1, Math.min(1, gaps[i])) }}>
                <Question size={46} color={gaps[i] > 0.5 ? C.warn : "#C9C5BA"} ink="#fff" />
                <span style={{ fontWeight: 800, fontSize: 32, color: C.ink }}>{q}</span>
                <span style={{ marginLeft: "auto", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.warn, opacity: gaps[i] > 0.5 ? 1 : 0 }}>EM BRANCO</span>
              </div>
            ))}
          </div>
        ) : null}
        {owner > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: Math.min(1, owner * 1.5) }}>
            <div style={{ padding: "10px 16px 4px", borderRadius: 22, background: C.surface, border: `2px solid ${C.line}` }}><People n={1} size={70} /></div>
            <Tag text="PROPRIETÁRIO" tone="muted" size={24} style={{ color: C.text }} />
            {gen > 0.001 ? <div style={{ transform: `rotate(-4deg) scale(${mix(1.7, 1, Math.min(1, gen))})`, opacity: Math.min(1, gen * 1.5) }}><Tag text="PROMESSA GENÉRICA" tone="warn" size={30} /></div> : null}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PROFISSIONAL <span style={{ color: C.muted }}>A</span> · ANÚNCIO
      </div>
    </div>
  );
};
