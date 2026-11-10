import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, Building, IconCalendar, MapArt, Pin } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 02 — SITUAÇÃO. Dentro da conversa: pedido, opções, localização… e a conversa fica aberta.
 * Uma linha contínua liga os momentos da conversa e termina tracejada (sem próximo passo).
 */
const PANEL = { x: 70, y: 240, w: 940, h: 1020 };
const LINE_X = 58;
const NODES = [232, 480, 752, 942];

const Bubble: React.FC<{
  t: number;
  at: number;
  y: number;
  w: number;
  h: number;
  side: "in" | "out";
  children: React.ReactNode;
  pad?: number;
}> = ({ t, at, y, w, h, side, children, pad = 26 }) => {
  const s = sp(t, at, { damping: 14, stiffness: 170 });
  if (t < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: side === "in" ? 108 : PANEL.w - 40 - w,
        top: y,
        width: w,
        height: h,
        boxSizing: "border-box",
        padding: pad,
        borderRadius: 34,
        borderBottomLeftRadius: side === "in" ? 10 : 34,
        borderBottomRightRadius: side === "out" ? 10 : 34,
        background: side === "in" ? C.surface2 : "#123A2D",
        border: `1px solid ${side === "in" ? C.line : "rgba(53,224,161,0.28)"}`,
        opacity: Math.min(1, s * 1.6),
        transformOrigin: side === "in" ? "0% 100%" : "100% 100%",
        transform: `translateY(${(1 - s) * 34}px) scale(${mix(0.86, 1, s)})`,
        boxShadow: "0 24px 50px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
};

const Listing: React.FC<{ t: number; at: number; id: string; hue: number; label: string }> = ({ t, at, id, hue, label }) => {
  const s = sp(t, at, { damping: 13, stiffness: 180 });
  return (
    <div
      style={{
        width: 268,
        height: 214,
        borderRadius: 22,
        overflow: "hidden",
        background: C.surface,
        opacity: Math.min(1, s * 1.5),
        transform: `translateY(${(1 - s) * 30}px) rotate(${(1 - s) * (hue ? 5 : -5)}deg)`,
      }}
    >
      <Building w={268} h={150} id={id} hue={hue} lit={0.4} />
      <div style={{ padding: "12px 16px", fontWeight: 700, fontSize: 26, color: C.text }}>{label}</div>
    </div>
  );
};

export const Situacao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const scene = tl.scenes.find((s) => s.id === "situacao")!;
  const enter = prog(t, scene.start - 0.2, 0.6, ease.out);
  const exit = prog(t, scene.end - 0.1, 0.5, ease.inOut);
  const push = prog(t, scene.start, scene.end - scene.start, ease.linear);

  const lineTo = (() => {
    const stops: [number, number][] = [
      [c.sit_bubble + 0.1, NODES[0]],
      [c.sit_listings + 0.25, NODES[1]],
      [c.sit_pin + 0.2, NODES[2]],
      [c.sit_open + 0.15, NODES[3]],
    ];
    let y = 130;
    let prevT = c.sit_bubble - 0.3;
    for (const [tt, yy] of stops) {
      const p = prog(t, Math.max(prevT, tt - 0.6), Math.min(0.6, tt - prevT), ease.inOut);
      y = mix(y, yy, p);
      prevT = tt;
    }
    return y;
  })();

  const tag = prog(t, c.sit_tag, 0.3, ease.out);
  const pin = sp(t, c.sit_pin, { damping: 9, stiffness: 190 });
  const typing = prog(t, c.sit_typing, 0.25, ease.out) * (1 - prog(t, c.sit_open - 0.12, 0.2, ease.in));
  const open = sp(t, c.sit_open, { damping: 14 });
  const dash = prog(t, c.sit_open + 0.1, 0.6, ease.out);
  const pulse = 0.5 + 0.5 * Math.sin((t - c.sit_open) * 7);

  return (
    <div
      style={{
        position: "absolute",
        left: PANEL.x,
        top: PANEL.y,
        width: PANEL.w,
        height: PANEL.h,
        fontFamily: F.sans,
        opacity: Math.min(1, enter * 1.4) * (1 - exit),
        transformOrigin: "50% 62%",
        transform: `scale(${mix(0.52, 1, enter) * mix(1, 1.035, push) * mix(1, 0.3, exit)}) translate(${exit * -620}px, ${exit * 900}px) rotate(${exit * -7}deg)`,
        filter: enter < 1 ? `blur(${(1 - enter) * 10}px)` : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 52,
          background: C.surface,
          border: `1px solid ${C.line}`,
          boxShadow: "0 50px 110px rgba(0,0,0,0.55)",
          overflow: "hidden",
        }}
      >
        {/* cabeçalho */}
        <div
          style={{
            height: 124,
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "0 36px",
            borderBottom: `1px solid ${C.lineSoft}`,
            background: C.surface2,
          }}
        >
          <Avatar size={74} label="RM" bg={C.accent} color={C.accentInk} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 38, color: C.text, letterSpacing: "-0.02em" }}>Rafael M.</div>
            <div style={{ fontWeight: 500, fontSize: 24, color: C.muted, marginTop: 2 }}>comprador</div>
          </div>
          <div style={{ fontFamily: F.mono, fontWeight: 500, fontSize: 20, color: C.dim, letterSpacing: "0.04em" }}>
            conversa ilustrativa
          </div>
        </div>

        {/* linha contínua da conversa */}
        <svg width={PANEL.w} height={PANEL.h} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={`M${LINE_X} 150V${lineTo}`} stroke={C.accent} strokeWidth={5} strokeLinecap="round" opacity={0.9} />
          <path
            d={`M${LINE_X} ${NODES[3] + 26}V${NODES[3] + 26 + dash * 70}`}
            stroke={C.warn}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="4 14"
            opacity={dash * 0.9}
          />
          {NODES.map((y, i) => {
            const on = lineTo >= y - 2;
            const last = i === 3;
            return on ? (
              <circle
                key={i}
                cx={LINE_X}
                cy={y}
                r={last ? 15 + pulse * 2 : 13}
                fill={last ? C.surface : C.accent}
                stroke={last ? C.warn : C.surface}
                strokeWidth={last ? 5 : 6}
                strokeDasharray={last ? "7 6" : undefined}
              />
            ) : null;
          })}
        </svg>

        {/* 1. pedido */}
        <Bubble t={t} at={c.sit_bubble} y={170} w={640} h={128} side="in">
          <div style={{ fontWeight: 600, fontSize: 34, lineHeight: 1.22, color: C.text }}>
            Oi! Procuro um apartamento de{" "}
            <span
              style={{
                color: tag > 0 ? C.accentInk : C.text,
                background: `rgba(53,224,161,${tag})`,
                borderRadius: 10,
                padding: "0 10px",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              2 quartos
            </span>
          </div>
        </Bubble>

        {/* 2. opções enviadas */}
        <Bubble t={t} at={c.sit_listings} y={330} w={624} h={302} side="out" pad={22}>
          <div style={{ fontWeight: 700, fontSize: 26, color: "#BFF3DF", marginBottom: 14 }}>Separei estas opções:</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Listing t={t} at={c.sit_listings + 0.12} id="a" hue={0} label="2 qts · 68 m²" />
            <Listing t={t} at={c.sit_listings + 0.26} id="b" hue={1} label="2 qts · 74 m²" />
          </div>
        </Bubble>

        {/* 3. localização */}
        <Bubble t={t} at={c.sit_map} y={664} w={600} h={188} side="in" pad={12}>
          <div style={{ position: "relative", width: 576, height: 164, borderRadius: 24, overflow: "hidden" }}>
            <MapArt w={576} h={164} />
            <div
              style={{
                position: "absolute",
                left: 262,
                top: 22,
                opacity: Math.min(1, pin * 3),
                transform: `translateY(${(1 - pin) * -90}px)`,
                filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))",
              }}
            >
              <Pin size={52} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 12,
                fontWeight: 700,
                fontSize: 24,
                color: C.text,
                background: "rgba(10,12,15,0.72)",
                padding: "4px 14px",
                borderRadius: 12,
              }}
            >
              Localização
            </div>
          </div>
        </Bubble>

        {/* 4. digitando… e a conversa fica aberta */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 902,
            width: 150,
            height: 78,
            borderRadius: 34,
            borderBottomRightRadius: 10,
            background: "#123A2D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            opacity: typing,
            transform: `scale(${mix(0.8, 1, typing)})`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: C.accent,
                opacity: 0.4 + 0.6 * Math.max(0, Math.sin((t - c.sit_typing) * 11 - i * 0.9)),
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 108,
            top: 894,
            width: 560,
            height: 96,
            boxSizing: "border-box",
            borderRadius: 26,
            border: `3px dashed ${C.warn}`,
            background: "rgba(255,107,94,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "0 26px",
            opacity: Math.min(1, open * 1.5),
            transform: `translateX(${(1 - open) * -30}px)`,
          }}
        >
          <IconCalendar size={44} color={C.warn} />
          <div>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", color: C.warn }}>
              PRÓXIMO RETORNO
            </div>
            <div style={{ fontWeight: 800, fontSize: 32, color: C.text, marginTop: 2 }}>sem data</div>
          </div>
        </div>
      </div>
    </div>
  );
};
