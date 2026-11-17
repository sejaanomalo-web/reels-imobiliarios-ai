import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, LeadChip, STAGES, Tag, Track } from "./ui";

/**
 * CENA 4 — O PRÓXIMO PASSO. "A quarta etapa é propor a ação certa: esclarecer uma dúvida, enviar uma opção compatível ou combinar a visita."
 * → 4 PRÓXIMO PASSO acende; três ações entram no tempo da fala. "Não existe botão que substitui entender a pessoa." → botão RESOLVER TUDO
 * é riscado. "O sistema serve para deixar essas etapas visíveis e mais fáceis de acompanhar." → PAINEL ILUSTRATIVO com as 4 etapas em
 * colunas e leads em cada uma (não é captura real). Texto-chave: 4. PRÓXIMO PASSO.
 */
const ACTS = ["ESCLARECER UMA DÚVIDA", "ENVIAR OPÇÃO COMPATÍVEL", "COMBINAR A VISITA"];

export const Prox: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_quarta - 0.35, { damping: 15, stiffness: 150 });
  const on4 = sp(t, c.p_quarta, { damping: 12, stiffness: 200 });
  const acts = [c.p_escl, c.p_env, c.p_comb].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const btn = sp(t, c.p_bot - 0.3, { damping: 11, stiffness: 210 });
  const strike = prog(t, c.p_ent - 0.1, 0.4, ease.out);
  const panel = sp(t, c.p_sis - 0.3, { damping: 13, stiffness: 170 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.p_quarta - 0.35, s: 1.04, y: 0 },
          { t: ((c.p_quarta - 0.35) + (c.p_acao + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.p_acao + 0.3, s: 1.08, x: 20, y: -15, e: ease.inOut },
          { t: ((c.p_acao + 0.3) + (c.p_escl + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.p_escl + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.p_escl + 0.2) + (c.p_env + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.p_env + 0.2, s: 1.08, x: -10, y: -15, e: ease.inOut },
          { t: ((c.p_env + 0.2) + (c.p_comb + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.p_comb + 0.2, s: 1.05, x: 10, y: -10, e: ease.inOut },
          { t: ((c.p_comb + 0.2) + (c.p_bot + 0.3)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.p_bot + 0.3, s: 1.09, x: 0, y: -20, e: ease.inOut },
          { t: ((c.p_bot + 0.3) + (c.p_sis + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.p_sis + 0.3, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: ((c.p_sis + 0.3) + (c.p_vis + 0.3)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.p_vis + 0.3, s: 1.07, x: 0, y: -15, e: ease.inOut },
          { t: c.cta_quer, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 110, top: 410, opacity: 1 - Math.min(1, panel * 1.5) }}><Track w={860} on={[1, 1, 1, on4]} hi={3} t={t} /></div>
        {/* lacunas das ações */}
        {[0, 1, 2].map((i) => { const sl = prog(t, c.p_acao - 0.2 + i * 0.12, 0.4, ease.out); return sl > 0 && acts[i] < 0.6 && panel < 0.5 ? <div key={i} style={{ position: "absolute", left: 140, right: 140, top: 660 + i * 120, height: 100, boxSizing: "border-box", borderRadius: 24, border: `3px dashed ${C.dim}`, opacity: sl * (1 - Math.min(1, acts[i] * 1.6)) * (0.7 + 0.3 * Math.sin(t * 3 + i)) }} /> : null; })}
        {/* ações */}
        {panel < 1 ? ACTS.map((a, i) => (acts[i] > 0.001 ? (
          <div key={a} style={{ position: "absolute", left: 140, right: 140, top: 660 + i * 120, height: 100, boxSizing: "border-box", padding: "0 24px", borderRadius: 24, background: BRAND.deep, border: `2px solid ${BRAND.hex}`, display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, acts[i] * 1.5) * (1 - panel), transform: `translateX(${(1 - Math.min(1, acts[i])) * (i % 2 ? 160 : -160) + Math.sin(t * 2 + i) * 6}px)` }}>
            <CheckDot p={Math.min(1, acts[i])} size={46} />
            <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{a}</span>
          </div>
        ) : null)) : null}
        {/* botão que não existe */}
        {btn > 0.001 && panel < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", opacity: Math.min(1, btn * 1.5) * (1 - panel) }}>
            <div style={{ position: "relative", padding: "22px 44px", borderRadius: 60, background: C.surface3, border: `3px solid ${C.dim}`, fontWeight: 800, fontSize: 44, color: C.muted, transform: `scale(${mix(0.5, 1, Math.min(1.08, btn))}) translateY(${Math.sin(t * 3) * 4}px)` }}>
              BOTÃO "RESOLVER TUDO"
              <div style={{ position: "absolute", left: 20, right: 20, top: "50%", height: 9, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-4deg)` }} />
            </div>
          </div>
        ) : null}
        {/* painel ilustrativo */}
        {panel > 0.001 ? (
          <div style={{ position: "absolute", left: 70, right: 70, top: 420, boxSizing: "border-box", padding: "20px 20px 24px", borderRadius: 32, background: C.surface, border: `2px solid ${brandAlpha(0.5)}`, opacity: Math.min(1, panel * 1.5), transform: `translateY(${(1 - Math.min(1, panel)) * 80 + Math.sin(t * 1.4) * 6}px)`, boxShadow: `0 0 40px ${brandAlpha(0.15)}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>JORNADA DOS LEADS</Label>
              <Tag text="PAINEL ILUSTRATIVO" tone="muted" size={24} />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              {STAGES.map((s, i) => (
                <div key={s} style={{ flex: 1, padding: 10, borderRadius: 20, background: C.surface2, minHeight: 560 }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: BRAND.hex, textAlign: "center", lineHeight: 1.1, minHeight: 54 }}>{i + 1}. {s}</div>
                  {Array.from({ length: [3, 2, 3, 1][i] }).map((_, k) => {
                    const p = prog(t, c.p_sis + 0.2 + (i * 3 + k) * 0.08, 0.35, ease.out);
                    return <div key={k} style={{ marginTop: 10, opacity: p, transform: `translateY(${(1 - p) * -30}px) rotate(${Math.sin(t * 1.8 + i + k) * 1.5}deg)` }}><LeadChip label="LEAD" w={196} tone={i === 3 ? "good" : "plain"} /></div>;
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        {panel > 0.5 ? <>ETAPAS <span style={{ color: BRAND.hex }}>VISÍVEIS</span></> : <>4. <span style={{ color: BRAND.hex }}>PRÓXIMO PASSO</span></>}
      </div>
    </div>
  );
};
