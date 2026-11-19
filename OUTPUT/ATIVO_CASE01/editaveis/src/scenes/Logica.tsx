import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { HouseArt, IconChat, IconLens, Label, Question, Tag } from "./ui";

/**
 * CENA 3 — TAKE 02, O QUE MUDA. "Repara na lógica: primeiro, responde uma dúvida real. Depois, mostra como trabalha e o que observa em
 * cada imóvel. Só então convida a pessoa para conversar." → três blocos ligados ENSINAR → MOSTRAR → CONVERSAR (molduras entram no
 * "Repara", cada um acende na sua fala; a conversa é só o ícone com "digitando", sem conversa inventada). "O vídeo deixa de ser uma vitrine
 * qualquer e começa a construir confiança." → VITRINE QUALQUER riscada → barra CONFIANÇA preenchendo pelos três blocos.
 */
const ROWS = [
  { k: "ENSINAR", sub: "responde uma dúvida real" },
  { k: "MOSTRAR", sub: "como trabalha, o que observa" },
  { k: "CONVERSAR", sub: "só então, o convite" },
];
const Y0 = 400;
const GAP = 215;

export const Logica: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.l_duv, c.l_obs, c.l_conv];
  const enter = sp(t, c.l_rep - 0.35, { damping: 15, stiffness: 150 });
  const lit = at.filter((x) => t >= x - 0.15).length;
  const vit = sp(t, c.l_vit - 0.2, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.l_vit + 0.5, 0.35, ease.out);
  const conf = prog(t, c.l_conf - 0.3, 1.0, ease.inOut);
  const out = prog(t, c.k_ponto - 0.4, 0.3, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.l_rep - 0.35, s: 0.96, y: 20 },
          { t: c.l_duv, s: 1.05, y: -70, e: ease.inOut },
          { t: c.l_obs, s: 1.05, y: 10, e: ease.inOut },
          { t: c.l_conv, s: 1.05, y: 100, e: ease.inOut },
          { t: c.l_vit, s: 0.98, y: 80, e: ease.inOut },
          { t: c.l_conf + 0.3, s: 1.02, y: 90, e: ease.inOut },
          { t: c.k_ponto, s: 1.03, y: 90, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14 }}>
          <Tag text="A LÓGICA" tone="accent" size={30} />
          <Tag text="FLUXO ILUSTRATIVO" tone="muted" size={22} />
        </div>
        {/* ligações */}
        {[0, 1].map((i) => {
          const on = lit >= i + 2;
          const y = Y0 + i * GAP + 170;
          const pulse = (t * 0.9 + i * 0.5) % 1;
          return (
            <div key={i} style={{ position: "absolute", left: 534, top: y, width: 12, height: GAP - 170, borderRadius: 6, background: on ? BRAND.hex : C.line, opacity: Math.min(1, enter), boxShadow: on ? `0 0 16px ${brandAlpha(0.6)}` : "none" }}>
              <div style={{ position: "absolute", left: -6, top: pulse * (GAP - 190), width: 24, height: 24, borderRadius: 12, background: on ? C.text : C.muted, opacity: 0.8 * Math.sin(pulse * Math.PI) }} />
            </div>
          );
        })}
        {ROWS.map((r, i) => {
          const a = sp(t, c.l_rep - 0.1 + i * 0.18, { damping: 14, stiffness: 190 });
          const on = t >= at[i] - 0.15;
          const fill = sp(t, at[i] - 0.15, { damping: 12, stiffness: 200 });
          const y = Y0 + i * GAP;
          const gl = mix(0.15, 0.35, conf) * (0.8 + 0.2 * Math.sin(t * 2.4 + i));
          return (
            <div key={r.k} style={{ position: "absolute", left: 130, top: y + Math.sin(t * 1.6 + i) * 4, width: 820, height: 170, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${on ? BRAND.hex : C.line}`, padding: "0 30px", display: "flex", alignItems: "center", gap: 28, opacity: Math.min(1, a * 1.5) * (on ? 1 : 0.55), transform: `translateX(${(1 - Math.min(1, a)) * 140}px) scale(${on && lit === i + 1 ? 1.03 : 1})`, boxShadow: on ? `0 0 34px ${brandAlpha(gl)}` : "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ width: 110, height: 110, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 26, background: C.surface2, overflow: "hidden", position: "relative" }}>
                <div style={{ opacity: on ? Math.min(1, fill * 1.5) : 0.35, transform: `scale(${on ? mix(0.4, 1, Math.min(1.1, fill)) : 0.85})` }}>
                  {i === 0 ? <Question size={86} color={on ? BRAND.hex : C.dim} ink={on ? BRAND.ink : C.bg0} /> : null}
                  {i === 1 ? (
                    <div style={{ position: "relative", width: 110, height: 110 }}>
                      <div style={{ position: "absolute", left: 10, top: 4, opacity: 0.6 }}><HouseArt w={80} hue={2} /></div>
                      <div style={{ position: "absolute", left: 28 + Math.sin(t * 2.5) * 14, top: 22 + Math.cos(t * 2.1) * 10 }}><IconLens size={66} color={on ? BRAND.hex : C.dim} /></div>
                    </div>
                  ) : null}
                  {i === 2 ? (
                    <div style={{ position: "relative" }}>
                      <IconChat size={84} />
                      {on ? (
                        <div style={{ position: "absolute", left: 22, top: 30, display: "flex", gap: 7 }}>
                          {[0, 1, 2].map((k) => <div key={k} style={{ width: 9, height: 9, borderRadius: 5, background: BRAND.hex, opacity: 0.3 + 0.7 * Math.max(0, Math.sin(t * 6 - k * 0.8)) }} />)}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Label size={30} color={on ? BRAND.hex : C.muted}>{i + 1}</Label>
                  <div style={{ fontWeight: 800, fontSize: 58, letterSpacing: "-0.035em", color: on ? C.text : C.muted }}>{r.k}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 32, color: on ? C.muted : C.dim, marginTop: 2 }}>{r.sub}</div>
              </div>
            </div>
          );
        })}
        {/* vitrine → confiança */}
        {vit > 0.001 ? (
          <div style={{ position: "absolute", left: 130, right: 130, top: 1060, height: 110, opacity: Math.min(1, vit * 1.5) * (1 - prog(t, c.l_conf - 0.4, 0.3, ease.in)), transform: `translateY(${(1 - Math.min(1, vit)) * 60}px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", padding: "18px 40px", borderRadius: 26, border: `3px dashed ${C.muted}`, fontWeight: 800, fontSize: 52, color: C.muted }}>
              VITRINE QUALQUER
              <div style={{ position: "absolute", left: 20, right: 20, top: "50%", height: 10, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-3deg)` }} />
            </div>
          </div>
        ) : null}
        {conf > 0.001 ? (
          <div style={{ position: "absolute", left: 130, right: 130, top: 1060, opacity: Math.min(1, conf * 2) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.text }}>CONFIANÇA</div>
              <Label size={24}>CONSTRUÍDA EM 3 PASSOS</Label>
            </div>
            <div style={{ marginTop: 14, height: 30, borderRadius: 15, background: C.surface3, overflow: "hidden" }}>
              <div style={{ width: `${conf * 100}%`, height: "100%", borderRadius: 15, background: BRAND.hex, boxShadow: `0 0 24px ${brandAlpha(0.6)}` }} />
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
