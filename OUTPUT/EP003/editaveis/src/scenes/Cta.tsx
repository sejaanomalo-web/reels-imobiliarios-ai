import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, IconLink } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { PEOPLE } from "./people";

/**
 * CENA 05 — CTA. "Quer visualizar seus atendimentos em um único fluxo?"
 * Perspectiva ampla: três trilhas soltas (mensagens, agenda, anotações) convergem para UM fluxo
 * (interface ILUSTRATIVA) onde cada pessoa ocupa sua etapa. Fecho: LINK NA BIO.
 */
const LANES = [
  { y: 560, label: "MENSAGENS" },
  { y: 760, label: "AGENDA" },
  { y: 960, label: "ANOTAÇÕES" },
];
const MAIN_Y = 760;
const L = { x: 90, w: 900 };
const STAGES = ["CONTATO", "VISITA", "DOCS", "PROPOSTA"];
const stageX = (k: number) => L.x + 110 + k * 228;
const AT: Record<string, number> = { diego: 0, carla: 0, ana: 1, bruno: 2, elisa: 3 };
const LANE_OF: Record<string, number> = { ana: 1, bruno: 2, carla: 0, diego: 0, elisa: 2 };

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.cta_flow + 0.15, { damping: 18, stiffness: 120 });
  const merge = prog(t, c.cta_single - 0.1, 0.7, ease.inOut);
  const label = prog(t, c.cta_sys, 0.4, ease.out);
  const away = prog(t, c.cta_link - 0.12, 0.45, ease.in);
  const end = sp(t, c.cta_link + 0.02, { damping: 12, stiffness: 170 });
  const sub = sp(t, c.cta_link + 0.4, { damping: 14, stiffness: 170 });
  const ring = (t - c.cta_link) % 1.4;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <div style={{ position: "absolute", inset: 0, opacity: (1 - away) * Math.min(1, enter * 1.5) }}>
        <Camera
          t={t}
          keys={[
            { t: c.cta_flow, s: 0.62, y: 60, rx: 30 },
            { t: c.cta_flow + 0.7, s: 0.92, y: -20, rx: 24, e: ease.out },
            { t: c.cta_single + 0.6, s: 1.04, y: -60, rx: 14, ry: -6, e: ease.inOut },
            { t: c.cta_link, s: 1.08, y: -60, rx: 8, ry: 4, e: ease.inOut },
            { t: c.cta_link + 0.5, s: 1.7, y: -60, rx: 0, ry: 0, e: ease.in },
          ]}
        >
          {/* trilhas soltas → fluxo único */}
          {LANES.map((ln, k) => {
            const y = mix(ln.y, MAIN_Y, merge);
            return (
              <div key={k} style={{ position: "absolute", left: L.x, top: y - 6, width: L.w, height: 16, borderRadius: 8, background: k === 1 ? `rgba(53,224,161,${mix(0.35, 0.8, merge)})` : `rgba(255,255,255,${mix(0.22, 0, merge)})` }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -50,
                    fontFamily: F.mono,
                    fontWeight: 700,
                    fontSize: 28,
                    letterSpacing: "0.1em",
                    color: C.text,
                    opacity: 1 - merge,
                  }}
                >
                  {ln.label}
                </div>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: L.x,
              top: MAIN_Y - 196,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: "0.12em",
              color: C.accent,
              opacity: merge,
            }}
          >
            FLUXO ÚNICO <span style={{ color: C.muted, fontWeight: 500, fontSize: 21 }}>· interface ilustrativa</span>
          </div>
          {STAGES.map((s, k) => (
            <div key={s} style={{ position: "absolute", left: stageX(k) - 90, top: MAIN_Y + 40, width: 180, textAlign: "center", opacity: merge }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, margin: "-52px auto 18px", background: C.bg0, border: `4px solid ${C.accent}` }} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 27, letterSpacing: "0.06em", color: C.text }}>{s}</span>
            </div>
          ))}
          {PEOPLE.map((p, i) => {
            const lane = LANES[LANE_OF[p.id]];
            const loose = L.x + ((i * 0.23 + (t - c.cta_flow) * (0.18 + 0.05 * i)) % 1) * L.w;
            const sameStage = Object.entries(AT).filter(([, v]) => v === AT[p.id]).map(([k]) => k);
            const off = sameStage.length > 1 ? (sameStage.indexOf(p.id) - 0.5) * 92 : 0;
            const x = mix(loose, stageX(AT[p.id]) + off, merge);
            const y = mix(lane.y, MAIN_Y - 110, merge) + Math.sin(t * 3 + i) * 5;
            return (
              <div key={p.id} style={{ position: "absolute", left: x - 44, top: y - 44, filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.55))" }}>
                <Avatar size={88} label={p.ini} bg={p.bg} ring={merge > 0.9 ? C.accent : undefined} />
              </div>
            );
          })}
        </Camera>
      </div>

      {/* rótulo do produto */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: mix(300, 628, Math.min(1, end)),
          textAlign: "center",
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 31,
          letterSpacing: "0.14em",
          color: C.accent,
          opacity: label,
          transform: `translateY(${(1 - label) * 24}px)`,
        }}
      >
        SISTEMA IMOBILIÁRIO PERSONALIZADO
      </div>

      {/* fecho: LINK NA BIO — assinatura da série, com mais energia */}
      {end > 0 ? (
        <>
          {[0, 1].map((k) => {
            const r = ((ring + k * 0.7) % 1.4) / 1.4;
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: 140 - r * 70,
                  top: 712 - r * 70,
                  width: 800 + r * 140,
                  height: 216 + r * 140,
                  borderRadius: 160,
                  border: `3px solid ${C.accent}`,
                  opacity: (1 - r) * 0.4 * Math.min(1, end),
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 712,
              width: 800,
              height: 216,
              borderRadius: 108,
              background: C.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
              opacity: Math.min(1, end * 2),
              transform: `scale(${mix(0.4, 1, end) * (1 + 0.025 * Math.sin((t - c.cta_link) * 5))})`,
              boxShadow: "0 30px 90px rgba(53,224,161,0.35), 0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            <IconLink size={92} color={C.accentInk} stroke={2.3} />
            <span style={{ fontWeight: 800, fontSize: 98, letterSpacing: "-0.04em", color: C.accentInk, whiteSpace: "nowrap" }}>LINK NA BIO</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 986,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 54,
              letterSpacing: "-0.03em",
              color: C.text,
              opacity: Math.min(1, sub * 1.6),
              transform: `translateY(${(1 - sub) * 30}px)`,
            }}
          >
            Personalizado para corretores
          </div>
        </>
      ) : null}
    </div>
  );
};
