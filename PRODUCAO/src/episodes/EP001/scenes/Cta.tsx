import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, IconCheck, IconLink } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 05 — CTA. Os três registros encaixam em um CRM ILUSTRATIVO com o histórico completo
 * (a mesma linha da conversa, agora sem ponta solta). Fecho minimalista: LINK NA BIO.
 * Não há marca, URL, preço nem promessa: o produto ainda não tem nome.
 */
const P = { x: 60, y: 250, w: 960, h: 980 };
const CHIPS = [
  ["INTERESSE", "Apê · 2 quartos"],
  ["ETAPA", "Em conversa"],
  ["PRÓXIMO PASSO", "Quinta, 10h"],
];
const HIST = [
  ["Pediu apartamento de 2 quartos", "seg · 09:12"],
  ["Opções enviadas", "seg · 09:40"],
  ["Conversa sobre localização", "ter · 14:05"],
  ["Retorno agendado", "quinta · 10h"],
];
const H0 = 452;
const HSTEP = 124;

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.cta_dock + 0.12, { damping: 17, stiffness: 120 });
  const pull = prog(t, c.cta_pull - 0.1, 0.8, ease.inOut);
  const away = prog(t, c.cta_link - 0.12, 0.5, ease.in);
  const end = sp(t, c.cta_link + 0.05, { damping: 13, stiffness: 150 });
  const demo = sp(t, c.cta_demo, { damping: 14, stiffness: 170 });
  const label = prog(t, c.cta_pull + 0.25, 0.5, ease.out);
  const lineP = prog(t, c.cta_hist - 0.05, 0.95, ease.inOut);
  const done = sp(t, c.cta_routine, { damping: 9, stiffness: 200 });
  const ring = (t - c.cta_link) % 1.6;
  if (t < c.cta_dock - 0.1) return null;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, perspective: 1800 }}>
      {/* CRM ilustrativo */}
      <div
        style={{
          position: "absolute",
          left: P.x,
          top: P.y,
          width: P.w,
          height: P.h,
          borderRadius: 48,
          background: C.surface,
          border: `1px solid ${C.line}`,
          boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 160px rgba(53,224,161,0.07)",
          overflow: "hidden",
          opacity: Math.min(1, enter * 1.5) * mix(1, 0.6, pull) * (1 - away),
          transformOrigin: "50% 40%",
          transform: `translateY(${(1 - enter) * 110 + pull * 70 - away * 120}px) rotateX(${pull * 16}deg) scale(${mix(0.9, 1, enter) * mix(1, 0.78, pull) * mix(1, 0.6, away)})`,
          filter: away > 0 ? `blur(${away * 12}px)` : undefined,
        }}
      >
        <div
          style={{
            height: 132,
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "0 34px",
            background: C.surface2,
            borderBottom: `1px solid ${C.lineSoft}`,
          }}
        >
          <Avatar size={78} label="RM" bg={C.accent} color={C.accentInk} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 42, color: C.text, letterSpacing: "-0.02em" }}>Rafael M.</div>
            <div style={{ fontWeight: 500, fontSize: 25, color: C.muted }}>comprador</div>
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontWeight: 500,
              fontSize: 21,
              color: C.muted,
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: "8px 14px",
              letterSpacing: "0.03em",
            }}
          >
            interface ilustrativa
          </div>
        </div>

        {/* os três registros encaixados */}
        {CHIPS.map(([lab, val], i) => {
          const s = sp(t, c.cta_dock + 0.22 + i * 0.09, { damping: 14, stiffness: 150 });
          return (
            <div
              key={lab}
              style={{
                position: "absolute",
                left: 30 + i * 304,
                top: 164,
                width: 292,
                height: 150,
                boxSizing: "border-box",
                borderRadius: 28,
                background: C.paper,
                padding: "24px 22px",
                opacity: Math.min(1, s * 1.6),
                transform: `translateY(${(1 - s) * 260}px) scale(${mix(1.5, 1, s)})`,
              }}
            >
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em", color: C.inkMuted }}>
                {lab}
              </div>
              <div style={{ fontWeight: 800, fontSize: 33, letterSpacing: "-0.03em", color: C.ink, marginTop: 10, whiteSpace: "nowrap" }}>
                {val}
              </div>
            </div>
          );
        })}

        {/* histórico */}
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 352,
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "0.14em",
            color: C.accent,
            opacity: prog(t, c.cta_hist - 0.25, 0.4, ease.out),
          }}
        >
          HISTÓRICO
        </div>
        <svg width={P.w} height={P.h} style={{ position: "absolute", left: 0, top: 0 }}>
          <path
            d={`M72 ${H0}V${H0 + lineP * HSTEP * 3}`}
            stroke={C.accent}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </svg>
        {HIST.map(([title, when], i) => {
          const s = sp(t, c.cta_hist + i * 0.22, { damping: 14, stiffness: 180 });
          const last = i === HIST.length - 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 36,
                top: H0 - 46 + i * HSTEP,
                width: 880,
                height: 92,
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: Math.min(1, s * 1.6),
                transform: `translateX(${(1 - s) * 46}px)`,
              }}
            >
              <div
                style={{
                  width: last ? 72 : 30,
                  height: last ? 72 : 30,
                  marginLeft: last ? 0 : 21,
                  marginRight: last ? 0 : 21,
                  borderRadius: 40,
                  background: C.accent,
                  border: last ? "none" : `7px solid ${C.surface}`,
                  boxSizing: "content-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: last ? `scale(${mix(0.6, 1, done)})` : undefined,
                  boxShadow: last ? `0 0 ${50 * done}px rgba(53,224,161,0.6)` : undefined,
                }}
              >
                {last ? <IconCheck size={44} /> : null}
              </div>
              <div
                style={{
                  flex: 1,
                  height: last ? 104 : 92,
                  borderRadius: 24,
                  background: last ? "#123A2D" : C.surface2,
                  border: `1px solid ${last ? "rgba(53,224,161,0.45)" : C.lineSoft}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 26px",
                  gap: 16,
                }}
              >
                <span style={{ flex: 1, fontWeight: 700, fontSize: 33, color: C.text, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                  {title}
                </span>
                <span style={{ fontFamily: F.mono, fontWeight: last ? 700 : 500, fontSize: 24, color: last ? C.accent : C.muted, whiteSpace: "nowrap" }}>
                  {when}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* rótulo do produto (sem nome inventado) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: mix(276, 628, end),
          textAlign: "center",
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 31,
          letterSpacing: "0.14em",
          color: C.accent,
          opacity: label,
          transform: `translateY(${(1 - label) * 20}px)`,
        }}
      >
        SISTEMA IMOBILIÁRIO PERSONALIZADO
      </div>

      {/* fecho: LINK NA BIO */}
      {end > 0 ? (
        <>
          {[0, 1].map((k) => {
            const r = ((ring + k * 0.8) % 1.6) / 1.6;
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: 140 - r * 60,
                  top: 712 - r * 60,
                  width: 800 + r * 120,
                  height: 216 + r * 120,
                  borderRadius: 140,
                  border: `3px solid ${C.accent}`,
                  opacity: (1 - r) * 0.35 * Math.min(1, end),
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
              transform: `scale(${mix(0.6, 1, end)})`,
              boxShadow: "0 30px 90px rgba(53,224,161,0.3), 0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            <IconLink size={92} color={C.accentInk} stroke={2.3} />
            <span style={{ fontWeight: 800, fontSize: 98, letterSpacing: "-0.04em", color: C.accentInk, whiteSpace: "nowrap" }}>
              LINK NA BIO
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 986,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "-0.03em",
              color: C.text,
              opacity: Math.min(1, demo * 1.6),
              transform: `translateY(${(1 - demo) * 30}px)`,
            }}
          >
            Agende uma demonstração
          </div>
        </>
      ) : null}
    </div>
  );
};
