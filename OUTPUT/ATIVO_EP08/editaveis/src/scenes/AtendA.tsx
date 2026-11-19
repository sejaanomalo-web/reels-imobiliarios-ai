import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { ADJ, Buyer, Msg, Tag } from "./ui";

/**
 * CENA 2 — ATENDIMENTO A (EXEMPLO ILUSTRATIVO). "No primeiro atendimento, ele recebe uma lista de qualidades: sala ampla, boa
 * localização, excelente oportunidade." → três balões do corretor A, um por qualidade. "Tudo soa positivo." → adjetivos genéricos
 * enchem a tela. "Mas nada ajuda a pessoa a descobrir se aquele endereço combina com sua rotina." → os adjetivos esmaecem; o
 * comprador fica com a dúvida "Combina com a minha rotina?".
 */
const MSGS = ["Sala ampla!", "Boa localização!", "Excelente oportunidade!"];

export const AtendA: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_prim - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.a_lista - 0.1, { damping: 12, stiffness: 200 });
  const at = [c.a_sala, c.a_loc, c.a_exc];
  const cloud = prog(t, c.a_tudo - 0.15, 0.6, ease.out);
  const fade = prog(t, c.a_mas - 0.05, 0.8, ease.inOut);
  const q = sp(t, c.a_end - 0.2, { damping: 11, stiffness: 200 });
  const thought = sp(t, c.a_rot - 0.25, { damping: 13, stiffness: 190 });
  const out = prog(t, c.b_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_prim - 0.35, s: 0.95, y: 0 },
          { t: c.a_exc + 0.3, s: 1.05, y: -40, e: ease.inOut },
          { t: c.a_pos + 0.2, s: 1.1, y: 0, r: -1, e: ease.inOut },
          { t: c.a_mas + 0.6, s: 1.0, y: 40, r: 0, e: ease.inOut },
          { t: c.b_seg, s: 1.03, y: 50, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14 }}>
          <Tag text="ATENDIMENTO A" tone="muted" size={30} />
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
        </div>
        {list > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em", color: C.muted, opacity: Math.min(1, list * 1.5) * (1 - fade) }}>LISTA DE QUALIDADES</div>
        ) : null}
        {MSGS.map((m, i) => {
          const a = sp(t, at[i] - 0.15, { damping: 12, stiffness: 230 });
          if (a <= 0.001) return null;
          return (
            <div key={m} style={{ position: "absolute", right: 110 + (i % 2) * 40, top: 460 + i * 130, opacity: Math.min(1, a * 1.5) * mix(1, 0.25, fade), transform: `translateX(${(1 - Math.min(1, a)) * 260}px) scale(${mix(1, 0.92, fade)})` }}>
              <Msg side="out" size={44}>{m}</Msg>
            </div>
          );
        })}
        {/* nuvem de adjetivos */}
        {cloud > 0.001
          ? ADJ.map((w, i) => {
              const a = prog(t, c.a_tudo - 0.15 + i * 0.07, 0.35, ease.out);
              const size = 40 + rnd(i * 2.9) * 40;
              const x = 60 + rnd(i * 4.3) * Math.max(0, 960 - 60 - w.length * size * 0.66);
              const y = 360 + rnd(i * 7.7) * 760;
              return (
                <div key={w} style={{ position: "absolute", left: x, top: y + (1 - a) * 40 + fade * 60, fontWeight: 800, fontSize: size, letterSpacing: "-0.03em", color: C.text, opacity: a * mix(0.85, 0.08, fade), transform: `rotate(${(rnd(i * 1.3) - 0.5) * 16}deg)`, whiteSpace: "nowrap", filter: fade > 0.05 ? `blur(${fade * 4}px)` : undefined }}>
                  {w}
                </div>
              );
            })
          : null}
        {/* o comprador com a dúvida */}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 110, top: 900, display: "flex", alignItems: "center", gap: 40, opacity: Math.min(1, q * 1.5) }}>
            <Buyer size={170} q={q} t={t} />
            {thought > 0.001 ? (
              <div style={{ padding: "26px 32px", borderRadius: 40, background: C.surface2, border: `2px dashed ${C.muted}`, fontWeight: 800, fontSize: 44, lineHeight: 1.1, color: C.text, maxWidth: 520, opacity: Math.min(1, thought * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, thought))})`, transformOrigin: "0 50%" }}>
                Combina com a minha rotina?
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
