import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Desk, PropCard, Question, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Duas equipes mostram apartamentos parecidos para quem quer sair do aluguel." → dois balcões (EQUIPE A / EQUIPE B, cena
 * ilustrativa) desde o quadro 0, cada um com um apartamento parecido; chave ALUGUEL saindo. "Mas só uma deixa o próximo passo claro." →
 * sobre A fica um "?"; de B sai a seta PRÓXIMO PASSO.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const a = sp(t, 0, { damping: 13, stiffness: 140 });
  const apt = sp(t, c.h_apt - 0.2, { damping: 12, stiffness: 190 });
  const rent = sp(t, c.h_sair - 0.1, { damping: 12, stiffness: 190 });
  const qa = sp(t, c.h_mas, { damping: 11, stiffness: 210 });
  const arrow = prog(t, c.h_prox - 0.1, 0.6, ease.out);
  const out = prog(t, c.e_na - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: -20 },
          { t: ((0) + (c.h_apt + 0.3)) / 2, s: 1.125, x: 12, y: -18, e: ease.inOut },
          { t: c.h_apt + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.h_apt + 0.3) + (c.h_sair + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.h_sair + 0.3, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.h_sair + 0.3) + (c.h_mas + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.h_mas + 0.2, s: 1.06, x: -25, y: -10, e: ease.inOut },
          { t: ((c.h_mas + 0.2) + (c.h_prox + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.h_prox + 0.3, s: 1.09, x: 25, y: -20, e: ease.inOut },
          { t: c.e_na, s: 1.06, x: 15, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}><Tag text="CENA ILUSTRATIVA" tone="muted" size={26} style={{ color: C.text }} /></div>
        {[0, 1].map((i) => (
          <div key={i} style={{ position: "absolute", left: i ? 580 : 100, top: 500, width: 400, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 80 + Math.sin(t * 1.6 + i * 2) * 8}px)` }}>
            <div style={{ display: "flex", justifyContent: "center", opacity: Math.min(1, apt * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.06, apt))}) rotate(${Math.sin(t * 1.3 + i) * 2}deg)` }}><PropCard w={300} i={i + 2} ok={i === 1 && arrow > 0.5} /></div>
            <div style={{ marginTop: 20 }}><Desk w={400} label={i ? "EQUIPE B" : "EQUIPE A"} good={i === 1 && arrow > 0.5} /></div>
          </div>
        ))}
        {rent > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: Math.min(1, rent * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, rent))})` }}>
            <div style={{ padding: "14px 26px", borderRadius: 22, background: C.surface2, border: `2px solid ${C.line}`, fontWeight: 800, fontSize: 40, color: C.text }}>
              ALUGUEL <span style={{ color: BRAND.hex }}>→</span> PRIMEIRO IMÓVEL
            </div>
          </div>
        ) : null}
        {qa > 0.001 ? <div style={{ position: "absolute", left: 245, top: 410 + Math.sin(t * 3) * 6, opacity: Math.min(1, qa * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, qa))})` }}><Question size={110} color={C.warn} ink="#fff" /></div> : null}
        {arrow > 0.001 ? (
          <div style={{ position: "absolute", left: 600, top: 1110, width: 360, opacity: arrow }}>
            <div style={{ height: 14, borderRadius: 7, background: BRAND.hex, transformOrigin: "0 50%", transform: `scaleX(${arrow})`, boxShadow: `0 0 18px ${brandAlpha(0.5)}` }} />
            <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}><Tag text="PRÓXIMO PASSO →" tone="accent" size={30} /></div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text }}>
        PARECIDOS. <span style={{ color: BRAND.hex }}>SÓ UM CLARO.</span>
      </div>
    </div>
  );
};
