import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, PropCard, Tag } from "./ui";

/**
 * CENA 3 — CENÁRIO B (hipotético). "Agora imagina crédito mais acessível." → o mesmo quadro, agora CRÉDITO MAIS ACESSÍVEL. "Mais pessoas
 * podem começar a procurar, e em alguns segmentos essa procura aumenta a concorrência pelos imóveis." → interessados chegam em volta de um
 * imóvel ilustrativo; EM ALGUNS SEGMENTOS · CONCORRÊNCIA. "Não quer dizer que todo preço sobe ou que toda negociação fica pior." → as duas
 * conclusões apressadas são riscadas. "Quer dizer que o contexto mudou." → a carta do gancho vira: O CONTEXTO MUDOU. Sem percentuais.
 */
const SPOTS = [
  [-300, -40], [300, -60], [-330, 150], [330, 140], [-200, 300], [210, 300], [-60, 360], [90, -230],
];

export const CenB: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_agora - 0.35, { damping: 15, stiffness: 150 });
  const house = sp(t, c.b_agora - 0.1, { damping: 13, stiffness: 170 });
  const n = SPOTS.map((_, i) => sp(t, c.b_mais + i * 0.32, { damping: 12, stiffness: 190 }));
  const seg = sp(t, c.b_seg - 0.1, { damping: 12, stiffness: 200 });
  const conc = sp(t, c.b_conc - 0.1, { damping: 11, stiffness: 210 });
  const crowdOut = prog(t, c.b_nao - 0.3, 0.5, ease.inOut);
  const st = [c.b_preco, c.b_pior].map((x) => sp(t, x - 0.6, { damping: 12, stiffness: 200 }));
  const strike = [c.b_preco, c.b_pior].map((x) => prog(t, x + 0.4, 0.35, ease.out));
  const ctx = sp(t, c.b_ctx - 0.2, { damping: 12, stiffness: 180 });
  const out = prog(t, c.p_por - 0.45, 0.4, ease.in);
  const CX = 540, CY = 740;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.b_agora - 0.35, s: 1.05, y: 0 },
          { t: c.b_aces + 0.2, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: c.b_proc + 0.2, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.b_seg + 0.2, s: 1.04, x: -20, y: -10, e: ease.inOut },
          { t: c.b_conc + 0.3, s: 1.08, x: 20, y: -15, e: ease.inOut },
          { t: c.b_nao + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: c.b_preco + 0.3, s: 1.07, x: -20, y: -15, e: ease.inOut },
          { t: c.b_pior + 0.3, s: 1.05, x: 20, y: -10, e: ease.inOut },
          { t: c.b_ctx + 0.3, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: c.p_por, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center" }}><Tag text="CENÁRIO HIPOTÉTICO" tone="muted" size={26} style={{ color: C.text }} /></div>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: 1 - crowdOut * 0.85, transform: `translateY(${crowdOut * -60}px) scale(${mix(1, 0.8, crowdOut)})`, transformOrigin: "540px 600px" }}>
          <div style={{ position: "absolute", left: CX - 180, top: CY - 150, opacity: Math.min(1, house * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, house)) * (1 + 0.04 * Math.sin(t * 2.5))}) rotate(${Math.sin(t * 1.6) * 3}deg) translateY(${Math.sin(t * 2.1) * 14}px)` }}>
            <div style={{ position: "absolute", left: -40, top: -40, right: -40, bottom: -40, borderRadius: 60, border: `3px solid ${brandAlpha(0.35)}`, transform: `scale(${1 + ((t * 0.8) % 1) * 0.3})`, opacity: 1 - ((t * 0.8) % 1) }} />
            <PropCard w={360} ok={conc > 0.5} i={1} />
          </div>
          {SPOTS.map(([dx, dy], i) => {
            const p = n[i];
            if (p <= 0.001) return null;
            const fx = mix(dx * 1.8, dx, Math.min(1, p)), fy = mix(dy * 1.8, dy, Math.min(1, p));
            return <div key={i} style={{ position: "absolute", left: CX + fx - 40, top: CY + fy - 40 + Math.sin(t * 2.4 + i) * 8, width: 80, height: 80, borderRadius: 40, background: C.surface3, border: `4px solid ${conc > 0.5 ? BRAND.hex : C.muted}`, opacity: Math.min(1, p * 1.5), boxShadow: conc > 0.5 ? `0 0 16px ${brandAlpha(0.35)}` : "none" }}>
              <div style={{ position: "absolute", left: 24, top: 12, width: 28, height: 28, borderRadius: 14, background: C.muted }} />
              <div style={{ position: "absolute", left: 14, top: 44, width: 48, height: 22, borderRadius: "24px 24px 6px 6px", background: C.muted }} />
            </div>;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", gap: 14 }}>
            {seg > 0.001 ? <div style={{ opacity: Math.min(1, seg * 1.5) }}><Chip text="EM ALGUNS SEGMENTOS" size={28} /></div> : null}
            {conc > 0.001 ? <div style={{ opacity: Math.min(1, conc * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.1, conc)) * (1 + 0.03 * Math.sin(t * 5))})` }}><Chip text="CONCORRÊNCIA" tone="good" size={28} /></div> : null}
          </div>
        </div>
        {/* conclusões apressadas */}
        {["TODO PREÇO SOBE", "TODA NEGOCIAÇÃO PIORA"].map((k, i) => (st[i] > 0.001 && ctx < 0.6 ? (
          <div key={k} style={{ position: "absolute", left: 150, right: 150, top: 640 + i * 170, height: 140, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${strike[i] > 0.5 ? "rgba(255,107,94,0.6)" : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, st[i] * 1.5) * (1 - ctx * 1.6) * (strike[i] > 0.5 ? 0.75 : 1), transform: `translateX(${(1 - Math.min(1, st[i])) * (i ? 200 : -200)}px) rotate(${Math.sin(t * 2 + i) * 1.5}deg)` }}>
            <div style={{ position: "relative", fontWeight: 800, fontSize: 52, letterSpacing: "-0.03em", color: C.text }}>
              {k}
              <div style={{ position: "absolute", left: -10, right: -10, top: "52%", height: 9, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike[i]})` }} />
            </div>
          </div>
        ) : null))}
        {ctx > 0.001 ? (
          <div style={{ position: "absolute", left: 150, right: 150, top: 700, height: 300, boxSizing: "border-box", borderRadius: 36, background: BRAND.deep, border: `4px solid ${BRAND.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: Math.min(1, ctx * 1.5), transform: `perspective(1200px) rotateY(${(1 - Math.min(1, ctx)) * 90}deg) translateY(${Math.sin(t * 2) * 8}px)`, boxShadow: `0 0 50px ${brandAlpha(0.3)}` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.muted }}>O QUE MUDOU</div>
            <div style={{ fontWeight: 800, fontSize: 100, letterSpacing: "-0.04em", color: BRAND.hex }}>CONTEXTO</div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        CRÉDITO <span style={{ color: BRAND.hex }}>MAIS ACESSÍVEL</span>
      </div>
    </div>
  );
};
