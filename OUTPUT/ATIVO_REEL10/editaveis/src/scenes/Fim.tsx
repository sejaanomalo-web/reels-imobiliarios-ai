import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 5 — APLICAÇÃO + TRANSIÇÃO. "Antes de usar juros como argumento de venda, confira os dados do momento e o perfil do comprador." →
 * ARGUMENTO DE VENDA em espera; DADOS DO MOMENTO (A CONFERIR) + PERFIL DO COMPRADOR. "E para lembrar o que cada comprador respondeu, ajuda
 * ter cada atendimento registrado." (transição adaptada do "Compartilha…") → ATENDIMENTO DO COMPRADOR registrado (exemplo ilustrativo).
 */
export const Fim: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.f_antes - 0.35, { damping: 15, stiffness: 150 });
  const arg = sp(t, c.f_arg - 0.2, { damping: 12, stiffness: 190 });
  const d1 = sp(t, c.f_dados - 0.15, { damping: 12, stiffness: 200 });
  const d2 = sp(t, c.f_perfil - 0.15, { damping: 12, stiffness: 200 });
  const swap = prog(t, c.f_e - 0.2, 0.5, ease.inOut);
  const list = sp(t, c.f_e, { damping: 13, stiffness: 180 });
  const checks = [0, 1, 2].map((i) => prog(t, c.f_resp + i * 0.35, 0.3, ease.out));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.f_antes - 0.35, s: 1.05, y: 0 },
          { t: c.f_arg + 0.3, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: c.f_dados + 0.2, s: 1.05, x: -20, y: -10, e: ease.inOut },
          { t: c.f_perfil + 0.2, s: 1.08, x: 20, y: -15, e: ease.inOut },
          { t: c.f_e + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.f_resp + 0.3, s: 1.06, x: -10, y: -15, e: ease.inOut },
          { t: c.f_reg + 0.3, s: 1.04, x: 10, y: -10, e: ease.inOut },
          { t: c.cta_quer, s: 1.07, y: -15, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: 1 - swap, transform: `translateY(${swap * -80}px)` }}>
          {arg > 0.001 ? (
            <div style={{ position: "absolute", left: 200, right: 200, top: 440, height: 150, boxSizing: "border-box", borderRadius: 30, border: `3px dashed ${C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: Math.min(1, arg * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, arg))}) rotate(${Math.sin(t * 2) * 1.5}deg)` }}>
              <span style={{ fontWeight: 800, fontSize: 48, color: C.muted }}>JUROS COMO ARGUMENTO</span>
            </div>
          ) : null}
          {arg > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 610, display: "flex", justifyContent: "center", opacity: prog(t, c.f_arg + 0.4, 0.4, ease.out) }}><Tag text="ANTES, CONFIRA" tone="accent" size={28} /></div> : null}
          {[["DADOS DO MOMENTO", d1, "A CONFERIR"], ["PERFIL DO COMPRADOR", d2, ""]].map(([k, p, tag], i) => ((p as number) > 0.001 ? (
            <div key={k as string} style={{ position: "absolute", left: 140, right: 140, top: 710 + i * 170, height: 140, boxSizing: "border-box", padding: "0 28px", borderRadius: 28, background: C.surface, border: `2px solid ${brandAlpha(0.5)}`, display: "flex", alignItems: "center", gap: 20, opacity: Math.min(1, (p as number) * 1.5), transform: `translateX(${(1 - Math.min(1, p as number)) * (i ? 200 : -200)}px) translateY(${Math.sin(t * 2 + i) * 6}px)` }}>
              <CheckDot p={Math.min(1, p as number)} size={50} />
              <span style={{ flex: 1, fontWeight: 800, fontSize: 42, color: C.text }}>{k as string}</span>
              {tag ? <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#E8B04A", padding: "6px 10px", borderRadius: 10, background: "rgba(232,176,74,0.14)" }}>{tag as string}</span> : null}
            </div>
          ) : null))}
        </div>
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 470, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface, border: `2px solid ${checks[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80 + Math.sin(t * 1.5) * 6}px)`, boxShadow: checks[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>ATENDIMENTO DO COMPRADOR</Label>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {STEPS.map((s, k) => (
              <div key={s.k} style={{ marginTop: 16, height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 20px", borderRadius: 22, background: checks[k] > 0.5 ? BRAND.deep : C.surface2, transform: `translateX(${(1 - prog(list, 0.2 + k * 0.2, 0.4, ease.out)) * 60}px)` }}>
                <CheckDot p={checks[k]} size={48} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{s.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        {swap > 0.5 ? <>CADA RESPOSTA <span style={{ color: BRAND.hex }}>REGISTRADA</span></> : <>DADOS <span style={{ color: BRAND.hex }}>ANTES DO ARGUMENTO</span></>}
      </div>
    </div>
  );
};
