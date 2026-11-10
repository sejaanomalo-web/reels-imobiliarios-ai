import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Building, IconCalendar, IconCheck, IconFlag, IconHome } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 04 — INSIGHT. O caos se dobra em três registros: INTERESSE, ETAPA, PRÓXIMO PASSO.
 * "Sem isso…": os registros esvaziam e a oportunidade escurece.
 */
export const CARD = { x: 70, w: 940, h: 222, gap: 30, top: 462 };
const STEPS = ["Novo", "Em conversa", "Visita", "Proposta"];

export const RecordCard: React.FC<{
  n: number;
  label: string;
  value: string;
  fill: number;
  ghost: number;
  icon: React.ReactNode;
  extra?: React.ReactNode;
  w?: number;
  h?: number;
}> = ({ n, label, value, fill, ghost, icon, extra, w = CARD.w, h = CARD.h }) => {
  const on = fill * (1 - ghost);
  return (
    <div style={{ position: "absolute", inset: 0, width: w, height: h }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 40,
          border: `3px dashed ${ghost > 0.5 ? "rgba(255,107,94,0.55)" : "rgba(255,255,255,0.22)"}`,
          opacity: 1 - on,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 40,
          background: C.paper,
          clipPath: `circle(${on * 130}% at 96px 50%)`,
          boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 40px", gap: 30 }}>
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 34,
            background: on > 0.5 ? C.ink : "rgba(255,255,255,0.07)",
            color: on > 0.5 ? C.paper : C.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 56,
            flexShrink: 0,
            transform: `scale(${1 + 0.14 * Math.sin(Math.min(1, fill) * Math.PI) * (1 - ghost)})`,
          }}
        >
          {on > 0.5 ? icon : n}
        </div>
        <div style={{ flex: 1, opacity: mix(0.0, 1, on), transform: `translateX(${(1 - on) * 26}px)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 27, letterSpacing: "0.12em", color: C.inkMuted }}>
            {label}
          </div>
          <div style={{ fontWeight: 800, fontSize: 52, letterSpacing: "-0.03em", color: C.ink, marginTop: 4, whiteSpace: "nowrap" }}>
            {value}
          </div>
          {extra}
        </div>
      </div>
    </div>
  );
};

export const Stepper: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
    {STEPS.map((s, i) => {
      const active = i === 1;
      const done = i < 1;
      return (
        <React.Fragment key={s}>
          <div
            style={{
              height: 16,
              width: active ? mix(16, 150, p) : 16,
              borderRadius: 8,
              background: active || done ? C.ink : "rgba(20,22,26,0.2)",
            }}
          />
          {i < STEPS.length - 1 ? <div style={{ width: 34, height: 4, borderRadius: 2, background: "rgba(20,22,26,0.2)" }} /> : null}
        </React.Fragment>
      );
    })}
  </div>
);

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const scene = tl.scenes.find((s) => s.id === "insight")!;
  const line = prog(t, c.ins_fold + 0.12, 0.34, ease.out);
  const three = sp(t, c.ins_three, { damping: 11, stiffness: 200 });
  const fills = [c.ins_c1, c.ins_c2, c.ins_c3].map((at) => prog(t, at, 0.5, ease.out));
  const ghosts = [0, 1, 2].map((i) => prog(t, c.ins_ghost + 0.25 + i * 0.3, 0.7, ease.inOut) * (1 - prog(t, c.cta_dock - 0.05 + i * 0.07, 0.35, ease.out)));
  const opp = sp(t, c.ins_opp, { damping: 14 });
  const forgot = prog(t, c.ins_forgot, 0.9, ease.inOut) * (1 - prog(t, c.cta_dock, 0.3, ease.out));
  const exit = prog(t, c.cta_dock + 0.1, 0.5, ease.inOut);
  const header = prog(t, c.ins_fold + 0.3, 0.5, ease.out);
  if (t < scene.start - 0.05) return null;

  const cards = [
    { label: "INTERESSE", value: "Apartamento · 2 quartos", icon: <IconHome size={62} color={C.paper} stroke={1.9} /> },
    { label: "ETAPA", value: "Em conversa", icon: <IconFlag size={60} color={C.paper} stroke={1.9} />, extra: <Stepper p={fills[1]} /> },
    { label: "PRÓXIMO PASSO", value: "Retornar quinta, 10h", icon: <IconCalendar size={60} color={C.paper} stroke={1.9} /> },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - prog(t, c.cta_dock + 0.35, 0.25, ease.linear) }}>
      {/* a dobra: o caos vira uma linha que se abre em três cartões */}
      <div
        style={{
          position: "absolute",
          left: 540 - 470 * line,
          top: 746,
          width: 940 * line,
          height: 6,
          borderRadius: 3,
          background: C.accent,
          opacity: line * (1 - prog(t, c.ins_fold + 0.5, 0.3, ease.linear)),
          boxShadow: `0 0 40px ${C.accent}`,
        }}
      />

      {/* cabeçalho */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 262,
          width: 940,
          opacity: header * (1 - prog(t, c.cta_dock - 0.2, 0.3, ease.in)),
          transform: `translateY(${(1 - header) * 30 - exit * 60}px)`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.14em", color: C.accent }}>
          CONTATO ÚTIL
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 6 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              color: C.text,
              display: "inline-block",
              transform: `scale(${mix(0.3, 1, three)})`,
              transformOrigin: "0% 80%",
              opacity: Math.min(1, three * 2),
            }}
          >
            3
          </span>
          <span style={{ fontWeight: 800, fontSize: 84, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, three * 2) }}>
            registros
          </span>
        </div>
      </div>

      {/* oportunidade (aparece em "oportunidade", escurece em "esquecida") */}
      {opp > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 716,
            top: 268,
            width: 294,
            height: 152,
            borderRadius: 28,
            overflow: "hidden",
            border: `2px solid rgba(53,224,161,${0.7 * (1 - forgot)})`,
            opacity: Math.min(1, opp * 1.5) * mix(1, 0.22, forgot) * (1 - prog(t, c.cta_dock - 0.2, 0.3, ease.in)),
            transform: `translateY(${(1 - opp) * -40 + forgot * 46}px) rotate(${forgot * 7}deg) scale(${mix(1, 0.9, forgot)})`,
            filter: `grayscale(${forgot}) blur(${forgot * 4}px)`,
            boxShadow: `0 0 ${70 * (1 - forgot)}px rgba(53,224,161,0.35)`,
          }}
        >
          <Building w={294} h={152} id="opp" hue={1} lit={mix(0.85, 0.05, forgot)} />
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 10,
              fontWeight: 800,
              fontSize: 24,
              color: C.text,
              background: "rgba(8,10,12,0.78)",
              padding: "4px 12px",
              borderRadius: 10,
            }}
          >
            Imóvel perfeito
          </div>
        </div>
      ) : null}

      {/* três registros */}
      {cards.map((card, i) => {
        const unfold = sp(t, c.ins_fold + 0.42 + i * 0.1, { damping: 15, stiffness: 150 });
        const restY = CARD.top + i * (CARD.h + CARD.gap);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: CARD.x,
              top: mix(746 - CARD.h / 2, restY, unfold) - exit * (140 + i * 150),
              width: CARD.w,
              height: CARD.h,
              opacity: Math.min(1, unfold * 2) * (1 - exit),
              transform: `perspective(1600px) rotateX(${(1 - unfold) * (i === 1 ? 0 : i === 0 ? 80 : -80)}deg) scale(${mix(1, 0.6, exit)})`,
              transformOrigin: i === 0 ? "50% 100%" : i === 2 ? "50% 0%" : "50% 50%",
            }}
          >
            <RecordCard
              n={i + 1}
              label={card.label}
              value={card.value}
              fill={fills[i]}
              ghost={ghosts[i]}
              icon={card.icon}
              extra={card.extra}
            />
            {fills[i] > 0.6 && ghosts[i] < 0.3 ? (
              <div
                style={{
                  position: "absolute",
                  right: 34,
                  top: 34,
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  background: C.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${sp(t, [c.ins_c1, c.ins_c2, c.ins_c3][i] + 0.3, { damping: 10, stiffness: 220 })})`,
                }}
              >
                <IconCheck size={34} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
