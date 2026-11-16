import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, MapArt, Tag } from "./ui";

/**
 * CENA 2 — EXEMPLO 1: MERCADO. "Primeiro, explique critérios do mercado em que atua." → 1 · MERCADO + mapa fictício. "Em vez de dizer que
 * um bairro é 'o melhor'" → etiqueta "O MELHOR BAIRRO" riscada; "mostre o que vale pesquisar: mobilidade, serviços próximos, perfil das
 * ruas e diferença entre regiões" → quatro critérios entram no mapa, um por palavra (sem nota, sem ranking, sem dado local). "Use fontes e
 * observações que você realmente conferiu." → campo FONTE VERIFICADA marcado.
 */
const CRIT = [
  { k: "MOBILIDADE", x: 120, y: 560 },
  { k: "SERVIÇOS PRÓXIMOS", x: 520, y: 520 },
  { k: "PERFIL DAS RUAS", x: 110, y: 770 },
  { k: "REGIÃO A ≠ REGIÃO B", x: 430, y: 940 },
];

export const Mercado: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.m_mob, c.m_serv, c.m_ruas, c.m_reg];
  const enter = sp(t, c.m_prim - 0.35, { damping: 15, stiffness: 150 });
  const map = prog(t, c.m_crit - 0.2, 1.2, ease.out);
  const best = sp(t, c.m_melhor - 0.3, { damping: 11, stiffness: 210 });
  const strike = prog(t, c.m_pesq - 0.4, 0.4, ease.out);
  const pesq = sp(t, c.m_pesq - 0.1, { damping: 13, stiffness: 190 });
  const src = sp(t, c.m_use - 0.15, { damping: 14, stiffness: 180 });
  const ok = prog(t, c.m_conf, 0.4, ease.out);
  const out = prog(t, c.a_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.m_prim - 0.35, s: 0.95, y: 0 },
          { t: c.m_crit + 0.6, s: 1.02, y: -10, e: ease.inOut },
          { t: c.m_vez + 0.3, s: 1.05, x: 60, y: -60, e: ease.inOut },
          { t: c.m_melhor + 0.3, s: 1.08, x: 0, y: -20, e: ease.inOut },
          { t: c.m_mob, s: 1.0, x: 20, y: 0, e: ease.inOut },
          { t: c.m_serv + 0.3, s: 1.04, x: 50, y: -30, e: ease.inOut },
          { t: c.m_ruas + 0.3, s: 1.03, x: -10, y: 40, e: ease.inOut },
          { t: c.m_reg + 0.5, s: 1.04, x: 25, y: 70, e: ease.inOut },
          { t: c.m_use + 0.4, s: 0.98, x: 0, y: 60, e: ease.inOut },
          { t: c.a_seg, s: 1.03, y: 70, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: prog(t, c.m_prim - 0.05, 0.3, ease.out) }}>
          <Tag text="1 · MERCADO" tone="accent" size={32} />
          <Tag text="MAPA ILUSTRATIVO" tone="muted" size={22} />
        </div>
        <div style={{ position: "absolute", left: 90, top: 380, width: 900, height: 675, borderRadius: 40, overflow: "hidden", border: `2px solid ${C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
          <MapArt w={900} h={675} p={map} t={t} />
        </div>
        {/* "um bairro": pino genérico sobre uma quadra */}
        {(() => {
          const pin = sp(t, c.m_vez + 0.3, { damping: 10, stiffness: 200 });
          const off = prog(t, c.m_pesq - 0.3, 0.3, ease.in);
          if (pin <= 0.001 || off >= 1) return null;
          const ring = (t * 0.9) % 1;
          return (
            <div style={{ position: "absolute", left: 821, top: 560, opacity: Math.min(1, pin * 1.5) * (1 - off) }}>
              <div style={{ position: "absolute", left: -60 - ring * 50, top: -60 - ring * 50, width: 120 + ring * 100, height: 120 + ring * 100, borderRadius: "50%", border: `4px solid ${C.text}`, opacity: 0.5 * (1 - ring) }} />
              <div style={{ position: "absolute", left: -22, top: -22 - (1 - Math.min(1, pin)) * 160, width: 44, height: 44, borderRadius: 22, background: C.text, boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }} />
            </div>
          );
        })()}
        {/* "o melhor bairro" */}
        {best > 0.001 && strike < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: Math.min(1, best * 1.5) * (1 - prog(t, c.m_pesq, 0.4, ease.in)), transform: `scale(${mix(0.4, 1, Math.min(1.1, best))})`, zIndex: 5 }}>
            <div style={{ position: "relative", padding: "24px 40px", borderRadius: 30, background: C.surface2, border: "3px solid #E5C07B", fontWeight: 800, fontSize: 68, color: C.text }}>
              “O MELHOR BAIRRO”
              <div style={{ position: "absolute", left: 20, right: 20, top: "50%", height: 10, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-3deg)` }} />
            </div>
          </div>
        ) : null}
        {pesq > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: Math.min(1, pesq * 1.5), zIndex: 4 }}>
            <div style={{ padding: "12px 26px", borderRadius: 20, background: "rgba(7,8,10,0.8)" }}><Label size={30} color={C.accent}>O QUE VALE PESQUISAR</Label></div>
          </div>
        ) : null}
        {CRIT.map((k, i) => {
          const a = sp(t, at[i] - 0.1, { damping: 11, stiffness: 220 });
          if (a <= 0.001) return null;
          return (
            <div key={k.k} style={{ position: "absolute", left: k.x, top: k.y + Math.sin(t * 1.6 + i) * 5, display: "flex", alignItems: "center", gap: 14, padding: "18px 24px", borderRadius: 24, background: C.surface, border: `3px solid ${BRAND.hex}`, boxShadow: `0 0 30px ${brandAlpha(0.25)}, 0 20px 50px rgba(0,0,0,0.6)`, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.08, a))})`, zIndex: 3 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: BRAND.hex }} />
              <span style={{ fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text, whiteSpace: "nowrap" }}>{k.k}</span>
            </div>
          );
        })}
        {/* fonte verificada */}
        {src > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 1100, display: "flex", alignItems: "center", gap: 22, padding: "22px 30px", borderRadius: 30, background: C.surface, border: `2px ${ok > 0.5 ? "solid" : "dashed"} ${ok > 0.5 ? BRAND.hex : C.muted}`, opacity: Math.min(1, src * 1.5), transform: `translateY(${(1 - Math.min(1, src)) * 80}px)`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
            <CheckDot p={ok} size={60} />
            <div style={{ flex: 1 }}>
              <Label size={26}>FONTE VERIFICADA</Label>
              <div style={{ fontWeight: 700, fontSize: 32, color: ok > 0.5 ? C.text : C.dim, marginTop: 4 }}>o que você realmente conferiu</div>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
