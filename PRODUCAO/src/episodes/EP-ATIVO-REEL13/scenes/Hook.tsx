import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { LeadChip, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Receber um lead é uma etapa." → notificação NOVO LEAD (ilustrativa) cai desde o quadro 0 no início de um caminho.
 * "Fazer esse contato avançar sem se perder pelo caminho é outra completamente diferente." → vários leads começam a andar pelo caminho
 * sinuoso; alguns escorregam para fora e somem (PERDIDOS); só um chega ao fim.
 */
const PATH = (p: number) => {
  const x = 160 + p * 760;
  const y = 1080 - p * 420 + Math.sin(p * Math.PI * 2.2) * 120;
  return [x, y];
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const notif = sp(t, 0, { damping: 13, stiffness: 140 });
  const go = prog(t, c.h_av - 0.2, Math.max(1.5, c.h_compl - c.h_av + 0.8), ease.inOut);
  const lost = prog(t, c.h_perder - 0.1, 0.9, ease.in);
  const tag2 = sp(t, c.h_compl - 0.1, { damping: 12, stiffness: 190 });
  const out = prog(t, c.i_pensa - 0.45, 0.4, ease.in);
  const pts = Array.from({ length: 30 }).map((_, i) => PATH(i / 29));
  const d = "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L");

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, x: -20, y: -20 },
          { t: ((0) + (c.h_etapa + 0.2)) / 2, s: 1.125, x: 12, y: -18, e: ease.inOut },
          { t: c.h_etapa + 0.2, s: 1.06, x: -30, y: -10, e: ease.inOut },
          { t: ((c.h_etapa + 0.2) + (c.h_av + 0.3)) / 2, s: 1.085, x: -12, y: -18, e: ease.inOut },
          { t: c.h_av + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: ((c.h_av + 0.3) + (c.h_perder + 0.3)) / 2, s: 1.085, x: 12, y: -18, e: ease.inOut },
          { t: c.h_perder + 0.3, s: 1.06, x: 10, y: -10, e: ease.inOut },
          { t: ((c.h_perder + 0.3) + (c.h_compl + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.h_compl + 0.3, s: 1.09, x: 20, y: -20, e: ease.inOut },
          { t: c.i_pensa, s: 1.14, x: 30, y: -30, e: ease.inOut },
        ]}
      >
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={d} stroke={C.surface3} strokeWidth={60} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke={brandAlpha(0.6)} strokeWidth={6} fill="none" strokeDasharray="14 18" strokeDashoffset={-t * 40} />
        </svg>
        {/* lead que chega */}
        <div style={{ position: "absolute", left: 60, top: mix(-200, 1150, Math.min(1, notif)), opacity: 1 - prog(t, c.h_av - 0.3, 0.4, ease.in), transform: `rotate(${Math.sin(t * 2) * 2}deg)` }}>
          <div style={{ marginBottom: 8 }}><Tag text="NOVO LEAD" tone="accent" size={26} /></div>
          <LeadChip label="ILUSTRATIVO" tone="good" />
        </div>
        {/* leads no caminho */}
        {[0, 1, 2, 3, 4].map((i) => {
          const pp = Math.max(0, go - i * 0.08);
          if (pp <= 0) return null;
          const isLost = i !== 2 && pp > 0.25 + i * 0.1;
          const [x, y] = PATH(Math.min(pp, i === 2 ? 1 : 0.25 + i * 0.1));
          const fall = isLost ? lost : 0;
          return <div key={i} style={{ position: "absolute", left: x - 32 + fall * (rnd(i) - 0.5) * 300, top: y - 32 + fall * 400, width: 64, height: 64, borderRadius: 32, background: i === 2 ? BRAND.hex : C.muted, border: `4px solid ${C.bg0}`, opacity: 1 - fall, marginTop: i === 2 ? Math.sin(t * 5) * 10 : 0, boxShadow: i === 2 ? `0 0 24px ${brandAlpha(0.6)}` : "none", transform: `rotate(${fall * 180}deg)` }} />;
        })}
        {tag2 > 0.001 ? (() => { const [x, y] = PATH(1); return [0, 1, 2].map((k) => { const ph = ((t - c.h_compl) * 0.9 + k / 3) % 1; return <div key={k} style={{ position: "absolute", left: x - 40 - ph * 120, top: y - 40 - ph * 120, width: 80 + ph * 240, height: 80 + ph * 240, borderRadius: "50%", border: `4px solid ${BRAND.hex}`, opacity: (1 - ph) * 0.7 * Math.min(1, tag2) }} />; }); })() : null}
        {lost > 0.3 ? <div style={{ position: "absolute", left: 300, top: 1180, opacity: lost * (1 - Math.min(1, tag2 * 2)) }}><Tag text="PERDIDOS NO CAMINHO" tone="warn" size={28} /></div> : null}
        {tag2 > 0.001 ? <div style={{ position: "absolute", left: 640, top: 560, opacity: Math.min(1, tag2 * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, tag2))})` }}><Tag text="AVANÇOU" tone="accent" size={30} /></div> : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text }}>
        RECEBER <span style={{ color: C.warn }}>≠</span> <span style={{ color: BRAND.hex }}>AVANÇAR</span>
      </div>
    </div>
  );
};
