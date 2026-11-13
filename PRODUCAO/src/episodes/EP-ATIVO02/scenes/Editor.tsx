import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 5a — INSIGHT. "Antes de gravar, escreva uma frase: 'Este imóvel é especialmente relevante para quem...' Se você não consegue
 * terminar essa frase, talvez ainda não tenha encontrado o argumento principal do vídeo."
 * Editor de texto com o campo PARA QUEM ESTE IMÓVEL FAZ SENTIDO?; a frase é digitada no ritmo da fala e para no "para quem…";
 * o cursor pisca no vazio e o campo acusa a falta do argumento principal.
 */
const LINE = "Este imóvel é especialmente relevante para quem";

export const Editor: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const card = sp(t, c.i_before - 0.15, { damping: 15, stiffness: 140 });
  const field = sp(t, c.i_write - 0.1, { damping: 13, stiffness: 180 });
  const typedN = Math.round(prog(t, c.i_este - 0.05, c.i_quem + 0.35 - c.i_este, ease.linear) * LINE.length);
  const dots = prog(t, c.i_quem + 0.3, 0.6, ease.linear);
  const stuck = prog(t, c.i_cant - 0.1, 0.4, ease.out);
  const gap = prog(t, c.i_end - 0.1, 0.8, ease.inOut);
  const tag1 = sp(t, c.i_cant + 0.1, { damping: 12, stiffness: 200 });
  const tag2 = sp(t, c.i_arg - 0.1, { damping: 12, stiffness: 200 });
  const exit = prog(t, c.i_test - 0.2, 0.4, ease.in);
  const caret = Math.floor(t * 2.6) % 2 === 0;
  const shown = LINE.slice(0, typedN) + (dots > 0 ? "…".slice(0, Math.ceil(dots)) : "");

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit, transform: `translateY(${-exit * 60}px)` }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_before - 0.2, s: 0.92, y: 80, r: -1.5 },
          { t: c.i_write, s: 1.0, y: 20, r: 0, e: ease.inOut },
          { t: c.i_quem + 0.4, s: 1.08, y: 40, e: ease.inOut },
          { t: c.i_cant + 0.5, s: 1.12, y: 60, x: -30, e: ease.inOut },
          { t: c.i_test, s: 1.02, y: 0, x: 0, e: ease.inOut },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 270, textAlign: "center", fontWeight: 800, fontSize: 70, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 30}px)` }}>
          ANTES DE GRAVAR,
          <br />
          <span style={{ color: C.accent }}>UMA FRASE.</span>
        </div>
        <div style={{ position: "absolute", left: 90, top: 480, width: 900, height: 640, boxSizing: "border-box", borderRadius: 44, background: C.surface, border: `2px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", overflow: "hidden", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 140}px) scale(${mix(0.9, 1, Math.min(1, card))})` }}>
          {/* barra do editor */}
          <div style={{ height: 84, display: "flex", alignItems: "center", gap: 12, padding: "0 30px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
            {["#FF6B5E", "#E8B86A", "#3AF584"].map((k) => (
              <div key={k} style={{ width: 18, height: 18, borderRadius: 9, background: k, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: 16, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>roteiro · próxima gravação</span>
          </div>
          <div style={{ padding: "40px 44px", opacity: Math.min(1, field * 1.5), transform: `translateY(${(1 - Math.min(1, field)) * 30}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.06em", color: C.accent }}>PARA QUEM ESTE IMÓVEL FAZ SENTIDO?</div>
            <div style={{ marginTop: 26, minHeight: 300, boxSizing: "border-box", borderRadius: 28, padding: "28px 32px", background: C.bg1, border: `3px solid ${stuck > 0.5 ? C.warn : typedN > 0 ? "rgba(58,245,132,0.5)" : C.line}`, fontWeight: 800, fontSize: 52, lineHeight: 1.18, letterSpacing: "-0.02em", color: C.text }}>
              {shown}
              <span style={{ display: "inline-block", width: 5, height: 56, marginLeft: 6, verticalAlign: "-8px", background: stuck > 0.5 ? C.warn : C.accent, opacity: caret ? 1 : 0 }} />
              {/* o espaço que deveria ser o argumento */}
              <div style={{ marginTop: 18, height: 6, borderRadius: 3, width: `${gap * 100}%`, background: `repeating-linear-gradient(90deg, ${C.warn} 0 22px, transparent 22px 36px)`, opacity: 0.8 }} />
            </div>
          </div>
        </div>
        {/* diagnósticos */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", gap: 18 }}>
          <div style={{ opacity: Math.min(1, tag1 * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, tag1))})` }}>
            <Tag text="FRASE INCOMPLETA" tone="warn" size={32} />
          </div>
          <div style={{ opacity: Math.min(1, tag2 * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, tag2))})` }}>
            <Tag text="SEM ARGUMENTO PRINCIPAL" tone="warn" size={32} />
          </div>
        </div>
      </Camera>
    </div>
  );
};
