import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Broker, Card, House, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Dois corretores combinam de trabalhar juntos um imóvel." → Corretor A e Corretor B ligados pela linha verde
 * através do imóvel. "Um traz o comprador, o outro conhece o proprietário." → os papéis aparecem. "…até chegar a primeira proposta
 * e ninguém lembrar exatamente do que foi combinado." → a proposta cai na linha, a linha falha e surgem RESPONSÁVEL? e COMBINADO?.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const a = sp(t, 0.05, { damping: 14, stiffness: 150 });
  const b = sp(t, 0.35, { damping: 14, stiffness: 150 });
  const link = prog(t, c.h_juntos - 0.2, 0.9, ease.inOut);
  const roleA = sp(t, c.h_comp - 0.1, { damping: 12, stiffness: 200 });
  const roleB = sp(t, c.h_prop - 0.1, { damping: 12, stiffness: 200 });
  const prop = sp(t, c.h_proposta - 0.15, { damping: 11, stiffness: 190 });
  const fail = prog(t, c.h_ninguem - 0.1, 0.5, ease.out);
  const q1 = sp(t, c.h_ninguem + 0.2, { damping: 10, stiffness: 220 });
  const q2 = sp(t, c.h_comb - 0.05, { damping: 10, stiffness: 220 });
  const out = prog(t, c.p_apr - 0.45, 0.4, ease.in);
  const flick = fail > 0 ? (Math.sin(t * 38) > 0.2 ? 1 : 0.25) : 1;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: 30 },
          { t: c.h_juntos + 0.5, s: 1.0, y: 0, e: ease.out },
          { t: c.h_proposta, s: 1.03, y: 0, e: ease.inOut },
          { t: c.h_comb + 0.5, s: 1.07, y: 20, r: -1, e: ease.inOut },
          { t: c.p_apr, s: 1.08, y: 20, r: -1, e: ease.linear },
        ]}
      >
        {/* linha da parceria A — imóvel — B */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
          {link > 0.02 ? (
            <>
              <path d="M 230 760 C 360 700, 420 700, 540 700" fill="none" stroke={fail > 0.3 ? C.warn : BRAND.hex} strokeWidth={10} strokeLinecap="round" strokeDasharray={fail > 0.3 ? "30 26" : `${380 * link} 600`} opacity={fail > 0.3 ? flick : 1} style={{ filter: fail > 0.3 ? undefined : `drop-shadow(0 0 10px ${brandAlpha(0.6)})` }} />
              <path d="M 850 760 C 720 700, 660 700, 540 700" fill="none" stroke={fail > 0.3 ? C.warn : BRAND.hex} strokeWidth={10} strokeLinecap="round" strokeDasharray={fail > 0.3 ? "30 26" : `${380 * link} 600`} opacity={fail > 0.3 ? flick : 1} style={{ filter: fail > 0.3 ? undefined : `drop-shadow(0 0 10px ${brandAlpha(0.6)})` }} />
            </>
          ) : null}
        </svg>
        <div style={{ position: "absolute", left: 115, top: 690 + (1 - Math.min(1, a)) * 300, opacity: Math.min(1, a * 1.5) }}>
          <Broker ini="A" bg="#4E6A8C" label="Corretor A" role={roleA > 0.5 ? "COMPRADOR" : " "} ring={link > 0.9 && fail < 0.3} />
        </div>
        <div style={{ position: "absolute", left: 735, top: 690 + (1 - Math.min(1, b)) * 300, opacity: Math.min(1, b * 1.5) }}>
          <Broker ini="B" bg="#8C6A4E" label="Corretor B" role={roleB > 0.5 ? "PROPRIETÁRIO" : " "} ring={link > 0.9 && fail < 0.3} />
        </div>
        {/* imóvel */}
        <div style={{ position: "absolute", left: 540 - 75, top: 610, width: 150, height: 150, borderRadius: 40, background: C.surface2, border: `3px solid ${link > 0.5 && fail < 0.3 ? BRAND.hex : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, b * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, b))})` }}>
          <House size={90} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontWeight: 800, fontSize: 84, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.text, opacity: Math.min(1, sp(t, 0.3, { damping: 14, stiffness: 160 }) * 1.5) * (1 - fail) }}>
          2 CORRETORES, <span style={{ color: BRAND.hex }}>1 IMÓVEL</span>
        </div>
        {/* primeira proposta */}
        {prop > 0.001 ? (
          <Card tone="warn" style={{ left: 330, top: 940 + (1 - Math.min(1, prop)) * -500, width: 420, padding: "24px 30px", opacity: Math.min(1, prop * 1.5), transform: `rotate(${mix(-12, -3, Math.min(1, prop))}deg)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.warn }}>1ª PROPOSTA</div>
            <div style={{ fontWeight: 800, fontSize: 40, color: C.text, marginTop: 6 }}>Chegou. E agora?</div>
          </Card>
        ) : null}
        {q1 > 0.001 ? <div style={{ position: "absolute", left: 120, top: 520, transform: `rotate(-6deg) scale(${mix(0.3, 1, Math.min(1.1, q1))})` }}><Tag text="RESPONSÁVEL?" tone="warn" size={40} /></div> : null}
        {q2 > 0.001 ? <div style={{ position: "absolute", left: 590, top: 470, transform: `rotate(5deg) scale(${mix(0.3, 1, Math.min(1.1, q2))})` }}><Tag text="COMBINADO?" tone="warn" size={40} /></div> : null}
      </Camera>
    </div>
  );
};
