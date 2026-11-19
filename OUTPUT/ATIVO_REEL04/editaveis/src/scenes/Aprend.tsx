import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, PropCard, Tag } from "./ui";

/**
 * CENA 4 — TAKE 03, O APRENDIZADO. "Percebe a diferença?" → duas linhas: ENVIAR TUDO × SELECIONAR COM CRITÉRIO. "Não é mostrar menos por
 * preguiça." → MENOS POR PREGUIÇA ✕. "É mostrar o que conversa com a realidade da pessoa." → O QUE CONVERSA COM A REALIDADE ✓.
 * "Qualificação não é interrogatório." → QUALIFICAÇÃO ≠ INTERROGATÓRIO. "É evitar que comprador e profissional percam tempo com
 * possibilidades incompatíveis." → os cartões incompatíveis saem; MENOS TEMPO PERDIDO para os dois. Título: PERGUNTE ANTES DE INDICAR.
 */
export const Aprend: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_perc - 0.35, { damping: 15, stiffness: 150 });
  const title = sp(t, c.a_perc - 0.1, { damping: 14, stiffness: 170 });
  const no = sp(t, c.a_menos - 0.1, { damping: 12, stiffness: 200 });
  const yes = sp(t, c.a_real - 0.1, { damping: 12, stiffness: 200 });
  const interr = sp(t, c.a_qual - 0.1, { damping: 12, stiffness: 190 });
  const neq = sp(t, c.a_interr - 0.05, { damping: 11, stiffness: 220 });
  const gone = prog(t, c.a_incomp - 0.3, 0.7, ease.in);
  const time = sp(t, c.a_tempo - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.p_antes - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_perc - 0.35, s: 0.98, y: 0 },
          { t: c.a_menos + 0.2, s: 1.04, x: -40, y: 0, e: ease.inOut },
          { t: c.a_real + 0.2, s: 1.04, x: 40, y: 0, e: ease.inOut },
          { t: c.a_qual + 0.2, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.a_tempo + 0.3, s: 1.02, y: 10, e: ease.inOut },
          { t: c.p_antes, s: 1.02, y: 10, e: ease.linear },
        ]}
      >
        {[0, 1].map((i) => {
          const good = i === 1;
          return (
            <div key={i} style={{ position: "absolute", left: good ? 560 : 100, top: 430, width: 420, height: 480, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${good ? BRAND.hex : C.line}`, padding: 22, overflow: "hidden", boxShadow: good ? `0 0 30px ${brandAlpha(0.2)}` : "none", transform: `translateY(${Math.sin(t * 1.5 + i * 2) * 5}px)` }}>
              <Tag text={good ? "SELECIONAR COM CRITÉRIO" : "ENVIAR TUDO"} tone={good ? "accent" : "muted"} size={24} style={good ? {} : { color: C.text }} />
              <div style={{ position: "relative", marginTop: 16, height: 360 }}>
                {good
                  ? [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 30 + k * 10, top: k * 110 }}><PropCard w={150} i={k + 2} ok /></div>)
                  : Array.from({ length: 10 }).map((_, k) => (
                      <div key={k} style={{ position: "absolute", left: rnd(k * 3 + 1) * 230, top: rnd(k * 5 + 2) * 250 - gone * (k % 2 ? 400 : -400), opacity: 1 - gone, transform: `rotate(${(rnd(k * 7) - 0.5) * 30}deg)` }}>
                        <PropCard w={130} i={k} dim={0.6} />
                      </div>
                    ))}
                {good ? <div style={{ position: "absolute", right: 10, top: 20, display: "flex", flexDirection: "column", gap: 18 }}>{[0, 1, 2].map((k) => <Mark key={k} ok size={50} />)}</div> : null}
              </div>
            </div>
          );
        })}
        {/* não é / é */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 935, display: "flex", flexDirection: "column", gap: 14, opacity: 1 - interr }}>
          {[0, 1].map((i) => {
            const p = i ? yes : no;
            if (p <= 0.001) return <div key={i} style={{ height: 80 }} />;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 22px", borderRadius: 24, background: C.surface2, border: `2px solid ${i ? BRAND.hex : C.warn}`, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * 60}px)` }}>
                <Mark ok={!!i} size={50} />
                <span style={{ fontWeight: 800, fontSize: 38, color: i ? C.text : C.muted }}>{i ? "Mostrar o que conversa com a realidade" : "Mostrar menos por preguiça"}</span>
              </div>
            );
          })}
        </div>
        {interr > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 945, textAlign: "center", opacity: Math.min(1, interr * 1.5) }}>
            <div style={{ fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: C.text }}>
              QUALIFICAÇÃO <span style={{ color: C.warn, opacity: Math.min(1, neq * 1.5), display: "inline-block", transform: `scale(${mix(1.8, 1, Math.min(1, neq))})` }}>≠</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.muted, opacity: Math.min(1, neq * 1.5) }}>INTERROGATÓRIO</div>
            {time > 0.001 ? (
              <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 12, opacity: Math.min(1, time * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.06, time))})` }}>
                <Tag text="MENOS TEMPO PERDIDO" tone="accent" size={28} />
                <Tag text="COMPRADOR + CORRETOR" tone="muted" size={24} style={{ color: C.text }} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
          PERGUNTE <span style={{ color: BRAND.hex }}>ANTES DE INDICAR</span>
        </div>
      ) : null}
    </div>
  );
};
