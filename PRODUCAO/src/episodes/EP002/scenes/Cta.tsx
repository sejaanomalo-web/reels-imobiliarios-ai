import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, IconBell, IconLink } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 05 — CTA. A linha do tempo entra numa interface conceitual de gestão (ILUSTRATIVA): o lead percorre
 * as etapas do funil e o lembrete aparece sozinho — "sem depender da memória". Fecho: LINK NA BIO.
 * Sem marca, URL, preço ou promessa.
 */
const P = { x: 60, y: 250, w: 960, h: 960 };
const COL = { top: 150, w: 286, h: 560, gap: 21, pad: 30 };
const COLS = ["1º CONTATO", "ENTENDENDO", "RETORNO"];
const colX = (i: number) => COL.pad + i * (COL.w + COL.gap);

const Ghost: React.FC<{ w: number; dim?: number }> = ({ w, dim = 1 }) => (
  <div style={{ height: 118, borderRadius: 22, background: C.surface2, padding: "22px 20px", boxSizing: "border-box", opacity: dim }}>
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ width: 42, height: 42, borderRadius: 21, background: C.surface3 }} />
      <div style={{ width: w, height: 14, borderRadius: 7, background: C.dim }} />
    </div>
    <div style={{ width: w + 40, height: 11, borderRadius: 6, background: C.surface3, marginTop: 18 }} />
  </div>
);

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.cta_dock + 0.1, { damping: 17, stiffness: 120 });
  const pull = prog(t, c.cta_pull - 0.1, 0.8, ease.inOut);
  const away = prog(t, c.cta_link - 0.12, 0.5, ease.in);
  const end = sp(t, c.cta_link + 0.05, { damping: 13, stiffness: 150 });
  const sub = sp(t, c.cta_link + 0.55, { damping: 14, stiffness: 170 });
  const label = prog(t, c.cta_pull + 0.25, 0.5, ease.out);
  const toast = sp(t, c.cta_memory, { damping: 15, stiffness: 160 });
  const bellRing = Math.max(0, 1 - (t - c.cta_memory) / 1) * (t >= c.cta_memory ? 1 : 0);
  const ring = (t - c.cta_link) % 1.6;
  if (t < c.cta_dock - 0.1) return null;

  // o cartão do lead caminha pelas etapas (sincronizado com os três "pops" de cta_stages)
  const hop = [0, 0.32, 0.64].map((d) => sp(t, c.cta_stages + d, { damping: 14, stiffness: 190 }));
  const col = Math.min(2, Math.max(0, hop[1] + hop[2]));
  const cardIn = sp(t, c.cta_dock + 0.3, { damping: 15, stiffness: 150 });
  // o cartão "levanta" enquanto troca de coluna
  const lift = Math.max(...hop.slice(1).map((h) => Math.sin(Math.PI * Math.min(1, Math.max(0, h)))));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, perspective: 1800 }}>
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
            height: 124,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 34px",
            background: C.surface2,
            borderBottom: `1px solid ${C.lineSoft}`,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 40, color: C.text, letterSpacing: "-0.02em" }}>Etapas de atendimento</span>
          <span
            style={{
              fontFamily: F.mono,
              fontWeight: 500,
              fontSize: 20,
              color: C.muted,
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: "8px 14px",
            }}
          >
            interface ilustrativa
          </span>
        </div>

        {COLS.map((name, i) => {
          const active = Math.round(col) === i && hop[0] > 0.5;
          return (
            <div
              key={name}
              style={{
                position: "absolute",
                left: colX(i),
                top: COL.top,
                width: COL.w,
                height: COL.h,
                boxSizing: "border-box",
                borderRadius: 30,
                background: active ? "rgba(53,224,161,0.07)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${active ? "rgba(53,224,161,0.35)" : C.lineSoft}`,
                padding: "22px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: F.mono,
                  fontWeight: 700,
                  fontSize: 21,
                  letterSpacing: "0.08em",
                  color: active ? C.accent : C.muted,
                  padding: "0 8px 6px",
                }}
              >
                {name}
              </div>
              <div style={{ height: 196 }} />
              <Ghost w={120 + i * 14} dim={0.8} />
              <Ghost w={150 - i * 18} dim={0.55} />
            </div>
          );
        })}

        {/* o cartão do lead */}
        <div
          style={{
            position: "absolute",
            left: mix(colX(0), colX(2), col / 2) + 12,
            top: COL.top + 72,
            width: COL.w - 24,
            height: 184,
            boxSizing: "border-box",
            borderRadius: 24,
            background: C.paper,
            padding: "20px 18px",
            opacity: Math.min(1, cardIn * 1.5),
            transform: `translateY(${(1 - cardIn) * -140 - lift * 14}px) rotate(${lift * -2}deg)`,
            boxShadow: `0 ${20 + lift * 14}px ${40 + lift * 20}px rgba(0,0,0,0.45)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size={48} label="MT" bg="#4A5F7A" />
            <span style={{ fontWeight: 800, fontSize: 29, color: C.ink, letterSpacing: "-0.02em" }}>Marcos T.</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 22, color: C.inkMuted, marginTop: 12 }}>vender o apê atual</div>
          <div
            style={{
              display: "inline-block",
              marginTop: 12,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 19,
              color: C.accentInk,
              background: C.accent,
              padding: "5px 10px",
              borderRadius: 10,
            }}
          >
            retorno em 15 dias
          </div>
        </div>

        {/* lembrete: sem depender da memória */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            top: 742,
            height: 180,
            boxSizing: "border-box",
            borderRadius: 30,
            background: "#123A2D",
            border: "2px solid rgba(53,224,161,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 34px",
            opacity: Math.min(1, toast * 1.5),
            transform: `translateY(${(1 - Math.min(1, toast)) * 220}px)`,
            boxShadow: "0 -10px 60px rgba(53,224,161,0.12)",
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 28,
              background: C.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              rotate: `${Math.sin((t - c.cta_memory) * 26) * 14 * bellRing}deg`,
            }}
          >
            <IconBell size={54} color={C.accentInk} stroke={2.2} />
          </div>
          <div>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: C.accent }}>LEMBRETE</div>
            <div style={{ fontWeight: 800, fontSize: 38, color: C.text, letterSpacing: "-0.02em", marginTop: 4 }}>
              Retomar conversa com Marcos
            </div>
          </div>
        </div>
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

      {/* fecho: LINK NA BIO — mesma assinatura visual da série */}
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
              opacity: Math.min(1, sub * 1.6),
              transform: `translateY(${(1 - sub) * 30}px)`,
            }}
          >
            Conheça o sistema
          </div>
        </>
      ) : null}
    </div>
  );
};
