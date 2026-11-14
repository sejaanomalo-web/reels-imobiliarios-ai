import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconPlane } from "./ui";

/**
 * CENA 6 — CTA (do roteiro: compartilhamento). "Compartilhe este vídeo" → COMPARTILHE COM UM CORRETOR; "com um corretor" →
 * contatos genéricos (sem nomes de pessoas reais), um é escolhido; "que trabalha sério" → o envio voa até ele;
 * "mesmo nos dias difíceis." → logo oficial ATIVO como assinatura.
 */
const PEOPLE = [
  { ini: "C", bg: "#4E6A8C" },
  { ini: "R", bg: "#8C6A4E" },
  { ini: "J", bg: "#5A7A6E" },
  { ini: "M", bg: "#6A5A8C" },
];

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.c_comp - 0.15, { damping: 13, stiffness: 170 });
  const ppl = PEOPLE.map((_, i) => sp(t, c.c_corr - 0.3 + i * 0.1, { damping: 13, stiffness: 190 }));
  const pick = sp(t, c.c_corr + 0.35, { damping: 10, stiffness: 220 });
  const fly = prog(t, c.c_serio - 0.1, 0.9, ease.inOut);
  const sent = sp(t, c.c_serio + 0.75, { damping: 11, stiffness: 220 });
  const logo = prog(t, c.c_dias + 0.2, 0.7, ease.out);
  const glow = 0.5 + 0.5 * Math.sin(t * 3);
  const sel = 1;
  const px = (i: number) => 165 + i * 250;
  const py = 900;
  // avião: do botão ao contato escolhido, em arco
  const ax = mix(540, px(sel), fly);
  const ay = mix(760, py + 40, fly) - Math.sin(fly * Math.PI) * 160;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.c_comp - 0.3, s: 1.06, y: 20 },
          { t: c.c_corr + 0.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.c_dias + 0.6, s: 0.98, y: -10, e: ease.inOut },
          { t: tl.duration, s: 1.01, y: -14, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 80, right: 80, top: 330, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, head * 1.5), transform: `translateY(${(1 - Math.min(1, head)) * 50}px)` }}>
          <span style={{ color: BRAND.hex }}>COMPARTILHE</span>
          <br />
          COM UM CORRETOR
        </div>
        {/* botão de envio */}
        <div style={{ position: "absolute", left: 540 - 60, top: 700, width: 120, height: 120, borderRadius: 60, background: BRAND.hex, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${30 + 30 * glow}px ${brandAlpha(0.45)}`, opacity: Math.min(1, head * 1.5) * (1 - fly * 0.6), transform: `scale(${mix(0.4, 1, Math.min(1, head))})` }}>
          <IconPlane size={64} color={BRAND.ink} />
        </div>
        {/* contatos genéricos */}
        {PEOPLE.map((p, i) => {
          const a = ppl[i];
          const on = i === sel ? pick : 0;
          return (
            <div key={p.ini} style={{ position: "absolute", left: px(i) - 70, top: py + (1 - Math.min(1, a)) * 120, width: 140, textAlign: "center", opacity: Math.min(1, a * 1.5) * (i === sel ? 1 : mix(1, 0.45, pick)) }}>
              <div style={{ width: 140, height: 140, borderRadius: 70, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 56, color: C.text, boxSizing: "border-box", border: on > 0.3 ? `6px solid ${BRAND.hex}` : "6px solid transparent", boxShadow: on > 0.3 ? `0 0 34px ${brandAlpha(0.5)}` : "0 16px 40px rgba(0,0,0,0.5)", transform: `scale(${1 + 0.12 * Math.sin(Math.min(1, on) * Math.PI)})` }}>{p.ini}</div>
              <div style={{ marginTop: 12, fontWeight: 700, fontSize: 28, color: C.muted }}>corretor</div>
              {i === sel && sent > 0.001 ? (
                <div style={{ position: "absolute", left: 90, top: -14, padding: "6px 14px", borderRadius: 999, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 26, whiteSpace: "nowrap", transform: `scale(${mix(0.3, 1, Math.min(1.1, sent))})` }}>enviado ✓</div>
              ) : null}
            </div>
          );
        })}
        {/* o envio voando */}
        {fly > 0.001 && fly < 1 ? (
          <div style={{ position: "absolute", left: ax - 34, top: ay - 34, transform: `rotate(${mix(-30, 40, fly)}deg) scale(${mix(1, 0.7, fly)})` }}>
            <IconPlane size={68} />
          </div>
        ) : null}
        {/* assinatura: logo oficial */}
        {logo > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: logo, clipPath: `inset(-20% ${(1 - logo) * 100}% -20% -5%)` }}>
            <Img src={staticFile(BRAND.logo)} style={{ height: 96, filter: `drop-shadow(0 0 18px ${brandAlpha(0.45)})` }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
