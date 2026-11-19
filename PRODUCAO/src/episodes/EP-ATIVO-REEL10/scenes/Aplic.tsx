import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, Tag } from "./ui";

/**
 * CENA 4 — A APLICAÇÃO. "É por isso que uma boa orientação não começa com 'compra agora' ou 'espera cair'." → os dois palpites em balões,
 * que saem riscados. "Começa perguntando: vai financiar? Qual prazo? Qual margem de negociação? E quais custos já foram verificados?" →
 * quatro perguntas marcadas uma a uma. "Uma conversa responsável vale mais que uma previsão confiante." → CONVERSA RESPONSÁVEL > PREVISÃO.
 */
const QS = ["VAI FINANCIAR?", "QUAL PRAZO?", "QUAL MARGEM DE NEGOCIAÇÃO?", "QUAIS CUSTOS JÁ FORAM VERIFICADOS?"];

export const Aplic: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_por - 0.35, { damping: 15, stiffness: 150 });
  const b1 = sp(t, c.p_compra - 0.15, { damping: 11, stiffness: 210 });
  const b2 = sp(t, c.p_espera - 0.15, { damping: 11, stiffness: 210 });
  const bOut = prog(t, c.p_perg - 0.3, 0.5, ease.in);
  const list = sp(t, c.p_perg - 0.2, { damping: 13, stiffness: 170 });
  const at = [c.p_fin, c.p_prazo, c.p_marg, c.p_custos];
  const chk = at.map((x) => prog(t, x - 0.05, 0.3, ease.out));
  const vs = sp(t, c.p_conv - 0.2, { damping: 12, stiffness: 180 });
  const out = prog(t, c.f_antes - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.p_por - 0.35, s: 1.05, y: 0 },
          { t: c.p_compra + 0.2, s: 1.09, x: -25, y: -15, e: ease.inOut },
          { t: c.p_espera + 0.2, s: 1.09, x: 25, y: -15, e: ease.inOut },
          { t: c.p_perg + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.p_fin + 0.2, s: 1.06, x: 0, y: -15, e: ease.inOut },
          { t: c.p_prazo + 0.2, s: 1.03, x: 15, y: -10, e: ease.inOut },
          { t: c.p_marg + 0.2, s: 1.06, x: -15, y: -15, e: ease.inOut },
          { t: c.p_custos + 0.2, s: 1.03, x: 10, y: -10, e: ease.inOut },
          { t: c.p_conv + 0.3, s: 1.07, x: 0, y: -15, e: ease.inOut },
          { t: c.f_antes, s: 1.04, y: -10, e: ease.linear },
        ]}
      >
        {/* palpites */}
        {enter > 0.001 && bOut < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.muted, opacity: prog(t, c.p_orient - 0.3, 0.4, ease.out) * (1 - bOut) }}>UMA BOA ORIENTAÇÃO NÃO COMEÇA COM</div> : null}
        {[["COMPRA AGORA!", b1, 150, -5, 540], ["ESPERA CAIR!", b2, 500, 5, 730]].map(([k, p, x, r, y]) => ((p as number) > 0.001 && bOut < 1 ? (
          <div key={k as string} style={{ position: "absolute", left: x as number, top: y as number, padding: "26px 34px", borderRadius: 40, borderBottomLeftRadius: 8, background: C.surface3, fontWeight: 800, fontSize: 58, color: C.text, opacity: Math.min(1, (p as number) * 1.5) * (1 - bOut), transform: `scale(${mix(0.5, 1, Math.min(1.08, p as number))}) rotate(${(r as number) + Math.sin(t * 3) * 2}deg) translateY(${bOut * 200}px)` }}>
            {k as string}
            <div style={{ position: "absolute", left: 20, right: 20, top: "50%", height: 8, borderRadius: 4, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${prog(t, c.p_espera + 0.6, 0.4, ease.out)})` }} />
          </div>
        ) : null))}
        {/* as quatro perguntas */}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 430, boxSizing: "border-box", padding: "22px 26px", borderRadius: 32, background: C.surface, border: `2px solid ${chk[3] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5) * (1 - prog(t, c.p_conv - 0.3, 0.4, ease.in) * 0.5), transform: `translateY(${(1 - Math.min(1, list)) * 100 + Math.sin(t * 1.4) * 6}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>ANTES DE ORIENTAR</Label>
              <Tag text="PERGUNTE" tone="accent" size={24} />
            </div>
            {QS.map((q, i) => (
              <div key={q} style={{ marginTop: 14, height: 100, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 22, background: chk[i] > 0.5 ? BRAND.deep : C.surface2, opacity: chk[i] > 0.01 ? 1 : 0.4, transform: `translateX(${(1 - chk[i]) * 40}px)` }}>
                <CheckDot p={chk[i]} size={46} />
                <span style={{ fontWeight: 800, fontSize: i === 3 ? 32 : 38, color: C.text, letterSpacing: "-0.01em" }}>{q}</span>
              </div>
            ))}
          </div>
        ) : null}
        {vs > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 1060, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, opacity: Math.min(1, vs * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1.05, vs))})` }}>
            <div style={{ padding: "18px 24px", borderRadius: 24, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 36, textAlign: "center", lineHeight: 1.05 }}>CONVERSA<br />RESPONSÁVEL</div>
            <div style={{ fontWeight: 800, fontSize: 80, color: BRAND.hex }}>{">"}</div>
            <div style={{ padding: "18px 24px", borderRadius: 24, background: C.surface3, color: C.muted, fontWeight: 800, fontSize: 36, textAlign: "center", lineHeight: 1.05 }}>PREVISÃO<br />CONFIANTE</div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        CONTEXTO <span style={{ color: BRAND.hex }}>ANTES DO PALPITE</span>
      </div>
    </div>
  );
};
