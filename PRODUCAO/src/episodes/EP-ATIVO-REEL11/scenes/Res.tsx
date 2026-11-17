import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, Tank } from "./ui";

/**
 * CENA 3 — O RESERVATÓRIO. "Pensa num reservatório." → reservatório ilustrativo com saída contínua desde a entrada. "Se você só retira
 * água e nunca planeja a reposição, uma entrada grande não garante tranquilidade depois." → uma ENTRADA GRANDE enche o tanque, que volta a
 * baixar pela SAÍDA CONTÍNUA. "Com a operação é parecido: precisa cuidar do caixa e também das atividades que mantêm novas oportunidades
 * chegando." → o tanque vira CAIXA; pequenas entradas regulares (NOVAS OPORTUNIDADES) estabilizam o nível. CONTINUIDADE IMPORTA. Sem números.
 */
export const Res: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.r_pensa - 0.35, { damping: 15, stiffness: 150 });
  const big = prog(t, c.r_ent - 0.2, 0.9, ease.out);
  const drain = prog(t, c.r_ent + 0.8, Math.max(1.5, c.r_com - c.r_ent - 0.6), ease.inOut);
  const regular = prog(t, c.r_ativ - 0.2, 1.2, ease.out);
  const base = 0.3 - prog(t, c.r_pensa, Math.max(1, c.r_ent - c.r_pensa), ease.linear) * 0.12;
  let level = base + big * 0.62 - drain * 0.6 + regular * 0.3;
  const pulse = regular > 0 ? Math.max(0, Math.sin(t * 5)) : 0;
  level += regular * pulse * 0.02;
  const inflow = Math.max(big < 1 && big > 0 ? 1 - big : 0, regular * (0.35 + 0.35 * pulse));
  const caixa = sp(t, c.r_caixa - 0.1, { damping: 12, stiffness: 200 });
  const novas = sp(t, c.r_novas - 0.2, { damping: 12, stiffness: 190 });
  const tranq = sp(t, c.r_tranq - 0.2, { damping: 12, stiffness: 190 });
  const out = prog(t, c.x_um - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.r_pensa - 0.35, s: 1.05, y: 0 },
          { t: ((c.r_pensa - 0.35) + (c.r_res + 0.3)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.r_res + 0.3, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: ((c.r_res + 0.3) + (c.r_ret + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.r_ret + 0.2, s: 1.05, x: 20, y: -5, e: ease.inOut },
          { t: ((c.r_ret + 0.2) + (c.r_repo + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.r_repo + 0.2, s: 1.08, x: -15, y: -15, e: ease.inOut },
          { t: ((c.r_repo + 0.2) + (c.r_ent + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.r_ent + 0.3, s: 1.04, x: -20, y: -25, e: ease.inOut },
          { t: ((c.r_ent + 0.3) + (c.r_tranq + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.r_tranq + 0.3, s: 1.08, x: 15, y: -10, e: ease.inOut },
          { t: ((c.r_tranq + 0.3) + (c.r_com + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.r_com + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: ((c.r_com + 0.2) + (c.r_caixa + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.r_caixa + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.r_caixa + 0.2) + (c.r_ativ + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.r_ativ + 0.3, s: 1.04, x: -15, y: -10, e: ease.inOut },
          { t: ((c.r_ativ + 0.3) + (c.r_novas + 0.4)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.r_novas + 0.4, s: 1.08, x: 0, y: -20, e: ease.inOut },
          { t: c.x_um, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 180, top: 420, transform: `translateY(${Math.sin(t * 1.5) * 8}px) rotate(${Math.sin(t * 1.1) * 0.8}deg)` }}>
          <Tank w={480} h={520} level={level} inflow={inflow} outflow={1} t={t} glow={caixa} />
        </div>
        {/* rótulos */}
        <div style={{ position: "absolute", left: 340, top: 415, opacity: big > 0 && t < c.r_com ? 1 : 0 }}><Chip text="ENTRADA GRANDE" tone="good" size={26} /></div>
        {regular > 0 ? <div style={{ position: "absolute", left: 340, top: 415, opacity: regular }}><Chip text="NOVAS OPORTUNIDADES" tone="good" size={26} style={{ transform: `scale(${1 + 0.03 * pulse})` }} /></div> : null}
        <div style={{ position: "absolute", left: 700, top: 1065, opacity: prog(t, c.r_ret - 0.2, 0.4, ease.out) }}><Chip text="SAÍDA CONTÍNUA" tone="warn" size={26} /></div>
        {caixa > 0.001 ? <div style={{ position: "absolute", left: 260, top: 700, width: 480, display: "flex", justifyContent: "center", opacity: Math.min(1, caixa * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, caixa))})` }}><div style={{ padding: "10px 26px", borderRadius: 20, background: C.bg1, border: `3px solid ${BRAND.hex}`, fontWeight: 800, fontSize: 48, color: C.text }}>CAIXA</div></div> : null}
        {tranq > 0.001 && caixa < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, textAlign: "center", fontWeight: 800, fontSize: 48, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, tranq * 1.5) * (1 - caixa * 2) }}>
            ENTRADA GRANDE <span style={{ color: C.warn }}>≠</span> TRANQUILIDADE DEPOIS
          </div>
        ) : null}
        {novas > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, textAlign: "center", fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, novas * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, novas))})`, textShadow: `0 0 30px ${brandAlpha(0.3)}` }}>
            CONTINUIDADE <span style={{ color: BRAND.hex }}>IMPORTA</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PENSA NUM <span style={{ color: BRAND.hex }}>RESERVATÓRIO</span>
      </div>
    </div>
  );
};
