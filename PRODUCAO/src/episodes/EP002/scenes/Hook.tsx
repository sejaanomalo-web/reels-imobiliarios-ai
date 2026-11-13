import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 01 — GANCHO. "O cliente diz que está só olhando. E você já coloca ele na pasta dos curiosos."
 * A fala do cliente vira tipografia gigante; o cartão do lead escorrega para uma caixa chamada FRIO.
 * Em "Mas pense" o cartão volta da caixa (rebobina) e vira as três janelas da cena seguinte.
 */
export const CARD = { x: 210, y: 660, w: 660, h: 200 };
export const BOX = { x: 160, y: 1010, w: 760, h: 236 };

type Line = "info" | "typing" | "quote";

export const LeadCard: React.FC<{ t: number; line: Line; frost: number; style?: React.CSSProperties }> = ({
  t,
  line,
  frost,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: CARD.x,
      top: CARD.y,
      width: CARD.w,
      height: CARD.h,
      boxSizing: "border-box",
      borderRadius: 42,
      background: C.surface2,
      border: `1px solid ${frost > 0.5 ? "rgba(143,180,227,0.55)" : C.line}`,
      boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: "0 38px",
      overflow: "hidden",
      fontFamily: F.sans,
      ...style,
    }}
  >
    <Avatar size={112} label="MT" bg={frost > 0.5 ? "#3B4E66" : "#4A5F7A"} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontWeight: 800, fontSize: 48, color: C.text, letterSpacing: "-0.02em" }}>Marcos T.</span>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.08em",
            color: frost > 0.5 ? C.coldDeep : C.accentInk,
            background: frost > 0.5 ? C.cold : C.accent,
            padding: "4px 10px",
            borderRadius: 8,
          }}
        >
          {frost > 0.5 ? "FRIO" : "LEAD"}
        </span>
      </div>
      <div style={{ marginTop: 10, height: 40, display: "flex", alignItems: "center", gap: 10 }}>
        {line === "typing" ? (
          [0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: C.muted,
                opacity: 0.35 + 0.65 * Math.max(0, Math.sin(t * 11 - i * 0.9)),
              }}
            />
          ))
        ) : (
          <span style={{ fontWeight: 600, fontSize: 29, color: line === "quote" ? C.cold : C.muted, whiteSpace: "nowrap" }}>
            {line === "quote" ? "“tô só olhando”" : "pediu informações do anúncio"}
          </span>
        )}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(140deg, rgba(143,180,227,${0.3 * frost}), rgba(143,180,227,${0.06 * frost}) 60%)`,
        pointerEvents: "none",
      }}
    />
  </div>
);

/** A caixa FRIO, desenhada em duas camadas para o cartão poder entrar entre a borda de trás e a frente. */
export const ColdBoxBack: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      left: BOX.x + 22,
      top: BOX.y - 36,
      width: BOX.w - 44,
      height: 74,
      borderRadius: 26,
      background: "#0C1218",
      border: "2px solid rgba(143,180,227,0.22)",
      ...style,
    }}
  />
);

export const ColdBoxFront: React.FC<{ pulse: number; style?: React.CSSProperties }> = ({ pulse, style }) => (
  <div
    style={{
      position: "absolute",
      left: BOX.x,
      top: BOX.y,
      width: BOX.w,
      height: BOX.h,
      boxSizing: "border-box",
      borderRadius: 40,
      background: "linear-gradient(180deg, #1D2938 0%, #141C26 100%)",
      border: `2px solid rgba(143,180,227,${0.3 + 0.5 * pulse})`,
      boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 ${90 * pulse}px rgba(143,180,227,${0.35 * pulse})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 56px",
      fontFamily: F.sans,
      ...style,
    }}
  >
    <span
      style={{
        fontWeight: 800,
        fontSize: 112,
        letterSpacing: "0.02em",
        color: C.cold,
        display: "inline-block",
        transform: `scale(${1 + 0.07 * pulse})`,
      }}
    >
      FRIO
    </span>
    <div style={{ textAlign: "right" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: "rgba(143,180,227,0.7)" }}>
        PASTA
      </div>
      <div style={{ fontWeight: 800, fontSize: 44, color: C.text, letterSpacing: "-0.02em" }}>curiosos</div>
    </div>
  </div>
);

export const BigQuote: React.FC<{ fill: number; outline: number; style?: React.CSSProperties }> = ({ fill, outline, style }) => {
  const text = (
    <>
      <span style={{ color: C.cold }}>“</span>SÓ
      <br />
      OLHANDO.<span style={{ color: C.cold }}>”</span>
    </>
  );
  const common: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    textAlign: "center",
    fontFamily: F.sans,
    fontWeight: 800,
    fontSize: 142,
    lineHeight: 0.98,
    letterSpacing: "-0.045em",
  };
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 296, height: 290, ...style }}>
      <div style={{ ...common, color: "transparent", WebkitTextStroke: "3px rgba(255,255,255,0.55)", opacity: outline }}>{text}</div>
      <div style={{ ...common, color: C.text, opacity: fill, textShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>{text}</div>
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const settle = sp(t, 0, { damping: 18, stiffness: 90 });
  const stamp = sp(t, c.hook_quote, { damping: 13, stiffness: 220 });
  const shrink = prog(t, c.hook_box, 0.6, ease.inOut);
  const box = sp(t, c.hook_box, { damping: 16, stiffness: 120 });
  const lift = prog(t, c.hook_box + 0.1, 0.5, ease.out) * (1 - prog(t, c.hook_drop - 0.05, 0.1, ease.linear));
  const drop = prog(t, c.hook_drop - 0.05, 0.42, ease.in);
  const pulse = Math.max(0, 1 - Math.abs(t - c.hook_shut - 0.12) / 0.35) * (t > c.hook_shut - 0.2 ? 1 : 0);
  const frost = prog(t, c.hook_shut - 0.15, 0.4, ease.out) * (1 - prog(t, c.sit_rewind + 0.15, 0.45, ease.out));
  const rewind = prog(t, c.sit_rewind, 0.62, ease.out);
  const boxAway = prog(t, c.sit_rewind + 0.08, 0.6, ease.in);
  const quoteAway = prog(t, c.sit_rewind - 0.05, 0.4, ease.in);
  const cardAway = prog(t, c.sit_split - 0.04, 0.22, ease.linear);

  const dropY = BOX.y + 4 - CARD.y;
  const y = mix(mix(0, dropY, drop), -60, rewind) - lift * 22;
  const rot = mix(mix(0, 4, drop), 0, rewind) - lift * 2;
  const scale = mix(mix(mix(0.94, 1, settle), 0.9, drop), 1, rewind) * (1 + 0.05 * cardAway);
  const line: Line = t < c.hook_say ? "info" : t < c.hook_quote ? "typing" : "quote";

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BigQuote
        outline={1 - Math.min(1, stamp * 1.4)}
        fill={Math.min(1, stamp * 1.5) * mix(1, 0.5, shrink) * (1 - quoteAway)}
        style={{
          transform: `translateY(${shrink * -26}px) scale(${mix(1.22, 1, stamp) * mix(1, 0.7, shrink)})`,
          filter: stamp < 1 && t > c.hook_quote ? `blur(${(1 - stamp) * 8}px)` : undefined,
        }}
      />
      <ColdBoxBack
        style={{
          opacity: Math.min(1, box * 1.5) * (1 - boxAway),
          transform: `translateY(${(1 - box) * 420 + boxAway * 520}px)`,
        }}
      />
      <LeadCard
        t={t}
        line={line}
        frost={frost}
        style={{
          opacity: 1 - cardAway,
          transform: `translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
          filter: drop > 0.05 && drop < 0.98 ? `blur(${Math.sin(drop * Math.PI) * 4}px)` : undefined,
        }}
      />
      <ColdBoxFront
        pulse={pulse}
        style={{
          opacity: Math.min(1, box * 1.5) * (1 - boxAway),
          transform: `translateY(${(1 - box) * 420 + boxAway * 520}px)`,
        }}
      />
    </div>
  );
};
