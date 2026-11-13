import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag, clockText } from "./ui";

/**
 * CENA 01 — GANCHO. "Quer ter mais clareza sobre sua carteira? Experimente esta revisão semanal de quinze minutos."
 * A carteira aparece como um mapa embaçado de imóveis; em "clareza" ele entra em foco. Em "Experimente" o cronômetro
 * cai sobre o mapa e, em "quinze minutos", fecha o anel em 15:00 e começa a correr.
 */
const PINS = Array.from({ length: 16 }).map((_, i) => ({ x: 60 + rnd(i * 3.7) * 820, y: 60 + rnd(i * 6.1 + 2) * 820 }));

export const Clock: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const focus = prog(t, c.hook_clear - 0.1, 0.7, ease.inOut);
  const wallet = sp(t, c.hook_wallet - 0.05, { damping: 14, stiffness: 170 });
  const watch = sp(t, c.hook_try, { damping: 13, stiffness: 150 });
  const week = sp(t, c.hook_week, { damping: 12, stiffness: 190 });
  const ring = prog(t, c.hook_15 - 0.1, 0.8, ease.inOut);
  const stamp = sp(t, c.hook_15 + 0.55, { damping: 11, stiffness: 220 });
  const exit = prog(t, c.sit_open - 0.15, 0.45, ease.in);
  const R = 210;
  const L = 2 * Math.PI * R;
  const running = t > c.hook_15 + 0.75;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.22, y: 90, x: -50, rx: 14, r: -2 },
          { t: c.hook_clear + 0.6, s: 1.06, y: 20, x: 20, rx: 4, r: 0, e: ease.inOut },
          { t: c.hook_try, s: 1.02, y: 0, x: 0, rx: 2, e: ease.inOut },
          { t: c.hook_15 + 0.4, s: 1.0, y: 0, rx: 0, e: ease.inOut },
          { t: c.sit_open + 0.4, s: 1.25, y: 120, e: ease.in },
        ]}
      >
        {/* a carteira: mapa de imóveis */}
        <div style={{ position: "absolute", left: 70, top: 300, width: 940, height: 940, borderRadius: 48, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", filter: focus < 1 ? `blur(${mix(9, 0, focus)}px)` : undefined, opacity: mix(0.75, 1, focus) }}>
          <div style={{ position: "absolute", inset: 0, transform: `translate(${mix(-60, 0, prog(t, 0, c.hook_try, ease.out))}px, ${mix(40, 0, prog(t, 0, c.hook_try, ease.out))}px) scale(1.12)` }}>
            <MapArt w={940} h={940} />
          </div>
          {PINS.map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.5))", transform: `translateY(${Math.sin(t * 2 + i) * 3}px)` }}>
              <Pin size={44} color={[C.accent, C.cold, C.warn][i % 3]} />
            </div>
          ))}
          <div style={{ position: "absolute", inset: 0, background: `rgba(7,8,10,${0.15 + 0.35 * Math.min(1, watch)})` }} />
        </div>
        <div style={{ position: "absolute", left: 100, top: 330, opacity: Math.min(1, wallet * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, wallet))})`, transformOrigin: "0 50%" }}>
          <Tag text="SUA CARTEIRA" tone="accent" size={28} style={{ background: "rgba(9,38,20,0.92)" }} />
        </div>
        {/* cronômetro */}
        {watch > 0 ? (
          <div style={{ position: "absolute", left: 540 - 260, top: 520, width: 520, height: 560, opacity: Math.min(1, watch * 1.5), transform: `translateY(${(1 - Math.min(1, watch)) * -260}px) scale(${mix(0.6, 1, Math.min(1, watch))})` }}>
            <div style={{ position: "absolute", left: 230, top: 0, width: 60, height: 40, borderRadius: 12, background: C.surface3 }} />
            <svg width={520} height={520} viewBox="0 0 520 520" style={{ position: "absolute", top: 40 }}>
              <circle cx={260} cy={260} r={240} fill="rgba(21,24,29,0.96)" stroke={C.line} strokeWidth={2} />
              <circle cx={260} cy={260} r={R} fill="none" stroke={C.surface3} strokeWidth={22} />
              <circle cx={260} cy={260} r={R} fill="none" stroke={C.accent} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${L * ring} ${L}`} transform="rotate(-90 260 260)" />
              <g transform={`rotate(${(t - c.hook_try) * 140} 260 260)`} opacity={0.5}>
                <path d="M260 260 L260 78" stroke={C.text} strokeWidth={5} strokeLinecap="round" />
              </g>
            </svg>
            <div style={{ position: "absolute", left: 0, right: 0, top: 210, textAlign: "center", fontWeight: 800, fontSize: 150, letterSpacing: "-0.04em", color: C.text, fontVariantNumeric: "tabular-nums", opacity: mix(0.35, 1, ring), transform: `scale(${1 + 0.12 * Math.sin(Math.PI * Math.min(1, stamp))})` }}>
              {running ? clockText(t, c.hook_15 + 0.75) : "15:00"}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 390, display: "flex", justifyContent: "center", opacity: Math.min(1, week * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, week))})` }}>
              <Tag text="TODA SEMANA" tone="accent" size={26} />
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
