import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Folder, People, Tag } from "./ui";

/**
 * CENA 4 — O CUIDADO. "Uma atitude simples é manter contratos, comprovantes e informações organizadas, e levar as dúvidas a um contador
 * que conheça sua atividade." → as pastas CONTRATOS, COMPROVANTES, INFORMAÇÕES se alinham; seta leva ao CONTADOR (que conhece sua atividade).
 * "Boa gestão também significa saber quando não improvisar." → SABER QUANDO NÃO IMPROVISAR. Texto-chave: ORGANIZE. CONSULTE. CONFIRME.
 */
const FOLD = ["CONTRATOS", "COMPROVANTES", "INFORMAÇÕES"];

export const Cuid: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_uma - 0.35, { damping: 15, stiffness: 150 });
  const f = [c.c_contr, c.c_compr, c.c_info].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const arrow = prog(t, c.c_levar - 0.1, 0.6, ease.out);
  const acc = sp(t, c.c_conta - 0.2, { damping: 12, stiffness: 190 });
  const impro = sp(t, c.c_impro - 0.4, { damping: 12, stiffness: 190 });
  const w1 = prog(t, c.c_contr, 0.3, ease.out), w2 = prog(t, c.c_conta, 0.3, ease.out), w3 = prog(t, c.c_impro, 0.3, ease.out);
  const out = prog(t, c.x_conf - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.c_uma - 0.35, s: 1.05, y: 0 },
          { t: ((c.c_uma - 0.35) + (c.c_contr + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.c_contr + 0.2, s: 1.08, x: -15, y: -15, e: ease.inOut },
          { t: ((c.c_contr + 0.2) + (c.c_compr + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.c_compr + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.c_compr + 0.2) + (c.c_info + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.c_info + 0.2, s: 1.08, x: 15, y: -15, e: ease.inOut },
          { t: ((c.c_info + 0.2) + (c.c_conta + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.c_conta + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.c_conta + 0.3) + (c.c_boa + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.c_boa + 0.2, s: 1.08, x: 0, y: -20, e: ease.inOut },
          { t: c.x_conf, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        {FOLD.map((k, i) => (f[i] > 0.001 ? (
          <div key={k} style={{ position: "absolute", left: 120 + i * 290, top: 450, opacity: Math.min(1, f[i] * 1.5), transform: `translateY(${(1 - Math.min(1, f[i])) * -120 + Math.sin(t * 1.8 + i) * 6}px) rotate(${(1 - Math.min(1, f[i])) * (i - 1) * 20}deg)` }}>
            <Folder w={260} label={k} tone="good" />
          </div>
        ) : null))}
        <div style={{ position: "absolute", left: 535, top: 660, width: 10, height: 170, borderRadius: 5, background: BRAND.hex, transformOrigin: "50% 0", transform: `scaleY(${arrow})`, boxShadow: `0 0 14px ${brandAlpha(0.5)}` }} />
        {acc > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 840, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: Math.min(1, acc * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, acc))}) translateY(${Math.sin(t * 1.6) * 6}px)` }}>
            <div style={{ padding: "12px 18px 4px", borderRadius: 22, background: BRAND.deep, border: `3px solid ${BRAND.hex}` }}><People n={1} size={110} /></div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 48, color: C.text }}>CONTADOR</div>
              <div style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>que conhece sua atividade</div>
            </div>
          </div>
        ) : null}
        {impro > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: Math.min(1, impro * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, impro))})` }}><Tag text="SABER QUANDO NÃO IMPROVISAR" tone="accent" size={32} /></div> : null}
      </Camera>
      <div style={{ position: "absolute", left: 60, right: 60, top: 285, textAlign: "center", fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        <span style={{ color: w1 > 0.5 ? BRAND.hex : C.muted }}>ORGANIZE.</span> <span style={{ color: w2 > 0.5 ? BRAND.hex : C.muted }}>CONSULTE.</span> <span style={{ color: w3 > 0.5 ? BRAND.hex : C.muted }}>CONFIRME.</span>
      </div>
    </div>
  );
};
