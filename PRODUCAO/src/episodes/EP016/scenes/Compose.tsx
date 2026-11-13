import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, NEW_MSG, Tag } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "Você pode retomar com algo específico: vi uma opção na região que você mencionou. Ainda faz sentido procurar por ali?"
 * A mensagem é digitada palavra por palavra (no tempo da fala) sobre um mapa fictício: a região mencionada acende e uma opção aparece nela.
 */
export const Compose: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const words = tl.captions.filter((k) => k.seg === "s3" || k.seg === "s4").flatMap((k) => k.words);
  const enter = sp(t, c.sit_new, { damping: 16, stiffness: 130 });
  const region = prog(t, c.sit_region, 0.5, ease.out);
  const pin = sp(t, c.sit_region + 0.3, { damping: 9, stiffness: 190 });
  const sent = sp(t, c.sit_sent, { damping: 12, stiffness: 200 });
  const head = sp(t, c.sit_new + 0.15, { damping: 15, stiffness: 160 });
  const exit = prog(t, c.ten_split - 0.1, 0.45, ease.in);
  const pulse = 0.85 + 0.15 * Math.sin(t * 4);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_new, s: 0.9, y: 40, rx: 6 },
          { t: c.sit_type, s: 1.02, y: -30, rx: 0, e: ease.inOut },
          { t: c.sit_region + 0.4, s: 1.1, x: 30, y: -100, e: ease.inOut },
          { t: c.sit_q + 0.3, s: 1.04, x: 20, y: 0, e: ease.inOut },
          { t: c.sit_sent + 0.3, s: 1.0, x: 0, y: 0 },
        ]}
      >
        {/* mapa fictício de bairros */}
        <div style={{ position: "absolute", left: 70, top: 300, width: 940, height: 560, borderRadius: 44, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.55)", border: `1px solid ${C.line}` }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: "70% 30%", transform: `translate(${mix(-70, 0, prog(t, c.sit_new, c.sit_region - c.sit_new, ease.out))}px, ${mix(40, 0, prog(t, c.sit_new, c.sit_region - c.sit_new, ease.out))}px) scale(${mix(1.25, 1.08, prog(t, c.sit_new, c.sit_region - c.sit_new + 0.4, ease.inOut))})` }}>
            <MapArt w={1040} h={640} />
          </div>
          <svg width={940} height={560} style={{ position: "absolute", inset: 0 }}>
            <path d="M520 120 L760 90 L840 260 L700 380 L500 330 Z" fill={`rgba(58,245,132,${0.22 * region * pulse})`} stroke={C.accent} strokeWidth={4} strokeDasharray="12 10" opacity={region} />
          </svg>
          <div style={{ position: "absolute", left: 560, top: 400, opacity: region }}>
            <Tag text="REGIÃO QUE ELE MENCIONOU" tone="accent" size={22} style={{ background: "rgba(9,38,20,0.85)" }} />
          </div>
          <div style={{ position: "absolute", left: 640, top: 150, opacity: Math.min(1, pin * 3), transform: `translateY(${(1 - Math.min(1, pin)) * -90}px)`, filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))" }}>
            <Pin size={64} />
          </div>
          <div style={{ position: "absolute", left: 24, top: 24 }}>
            <Tag text="MAPA ILUSTRATIVO" tone="muted" size={20} />
          </div>
        </div>
        {/* "algo específico" */}
        <div style={{ position: "absolute", left: 70, top: 250, opacity: head * (1 - prog(t, c.sit_type, 0.3, ease.in)), transform: `translateY(${(1 - head) * 20}px)` }}>
          <Tag text="RETOME COM ALGO ESPECÍFICO" tone="accent" size={26} />
        </div>
        {/* a nova mensagem, digitada no ritmo da fala */}
        <div style={{ position: "absolute", left: 110, right: 70, top: 900, display: "flex", justifyContent: "flex-end" }}>
          <Bubble tone="green" size={42} style={{ maxWidth: 860, transformOrigin: "100% 100%", transform: `scale(${1 + 0.04 * Math.sin(Math.PI * Math.min(1, sent))})` }}>
            {t < words[0].start - 0.05 ? (
              <span style={{ display: "inline-flex", gap: 12, padding: "6px 0" }}>
                {[0, 1, 2].map((k) => (
                  <span key={k} style={{ width: 16, height: 16, borderRadius: 8, background: C.accent, opacity: 0.35 + 0.65 * Math.max(0, Math.sin(t * 9 - k * 0.9)) }} />
                ))}
              </span>
            ) : null}
            {words.map((w, i) => {
              const a = prog(t, w.start - 0.05, 0.12, ease.out);
              return (
                <span key={i} style={{ display: a > 0 ? "inline" : "none", opacity: a, color: i === 4 && region > 0.5 ? C.accent : undefined }}>
                  {NEW_MSG[i] ?? w.text}{" "}
                </span>
              );
            })}
            <div style={{ textAlign: "right", marginTop: 8, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.accent, opacity: Math.min(1, sent * 2) }}>enviada ✓✓</div>
          </Bubble>
        </div>
      </Camera>
    </div>
  );
};
