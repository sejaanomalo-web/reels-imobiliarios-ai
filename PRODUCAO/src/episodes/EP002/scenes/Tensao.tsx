import React from "react";
import { C, F } from "../../../theme";
import { clamp01, ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, Building } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 03 — TENSÃO. "Se você manda dez anúncios sem perguntar nada…"
 * Enxurrada de anúncios na conversa; as respostas curtas do cliente somem na velocidade;
 * no fim, o contato vira um "?" — ele continua desconhecido.
 */
const P = { x: 70, y: 250, w: 940, h: 1010, head: 124 };
const GAP = 22;
const H = { out: 272, in: 86 };

type Item = { kind: "out" | "in"; t: number; n?: number; text?: string };

const buildItems = (c: Record<string, number>, flood: number[]): Item[] =>
  [
    { kind: "in" as const, t: c.ten_start + 0.1, text: "Oi! Vi o anúncio" },
    ...flood.map((tt, i) => ({ kind: "out" as const, t: tt, n: i + 1 })),
    { kind: "in" as const, t: flood[3] + 0.12, text: "ok" },
    { kind: "in" as const, t: flood[6] + 0.1, text: "vou ver" },
    { kind: "in" as const, t: flood[9] + 0.14, text: "hm" },
  ].sort((a, b) => a.t - b.t);

const appear = (t: number, it: Item) => ease.out(clamp01((t - it.t) / 0.2));
const stackHeight = (t: number, items: Item[]) => items.reduce((acc, it) => acc + (H[it.kind] + GAP) * appear(t, it), 0);

export const Tensao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const flood = tl.series.flood;
  const items = buildItems(c, flood);
  const enter = sp(t, c.ten_start - 0.2, { damping: 17, stiffness: 130 });
  const exit = prog(t, c.ins_clear, 0.55, ease.in);
  const speed = (stackHeight(t, items) - stackHeight(t - 1 / 30, items)) * 30;
  const vague = prog(t, c.ten_vague, 0.6, ease.inOut);
  const unknown = sp(t, c.ten_unknown, { damping: 11, stiffness: 190 });
  const sent = flood.filter((f) => t >= f).length;
  const none = t >= c.ten_none;

  const bottom = P.h - 34;
  let after = 0;
  const placed = items
    .map((it) => it)
    .reverse()
    .map((it) => {
      const a = appear(t, it);
      const top = bottom - H[it.kind] - after;
      after += (H[it.kind] + GAP) * a;
      return { it, a, top };
    });

  return (
    <div
      style={{
        position: "absolute",
        left: P.x,
        top: P.y,
        width: P.w,
        height: P.h,
        fontFamily: F.sans,
        opacity: Math.min(1, enter * 1.5) * (1 - exit),
        transform: `translateY(${(1 - enter) * 140}px) scale(${mix(0.92, 1, enter) * mix(1, 0.8, exit)})`,
        filter: exit > 0.02 ? `blur(${exit * 12}px)` : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 50,
          background: C.surface,
          border: `1px solid ${C.line}`,
          boxShadow: "0 50px 110px rgba(0,0,0,0.55)",
          overflow: "hidden",
        }}
      >
        {/* cabeçalho */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: P.head,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "0 30px",
            background: C.surface2,
            borderBottom: `1px solid ${C.lineSoft}`,
          }}
        >
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <div style={{ position: "absolute", inset: 0, opacity: 1 - Math.min(1, unknown) }}>
              <Avatar size={76} label="MT" bg="#4A5F7A" />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 38,
                background: C.surface3,
                border: `3px dashed ${C.warn}`,
                boxSizing: "border-box",
                color: C.warn,
                fontWeight: 800,
                fontSize: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: Math.min(1, unknown),
                transform: `scale(${mix(0.6, 1, Math.min(1.15, unknown))})`,
              }}
            >
              ?
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 38, color: C.text, letterSpacing: "-0.02em" }}>Marcos T.</div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 24,
                color: unknown > 0.5 ? C.warn : C.muted,
                whiteSpace: "nowrap",
              }}
            >
              {unknown > 0.5 ? "perfil: desconhecido" : "conversa ilustrativa"}
            </div>
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 22,
              color: C.text,
              background: C.surface3,
              padding: "8px 14px",
              borderRadius: 14,
              whiteSpace: "nowrap",
            }}
          >
            {sent} anúncios
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 22,
              color: none ? C.warn : C.muted,
              background: none ? "rgba(255,107,94,0.14)" : C.surface3,
              padding: "8px 14px",
              borderRadius: 14,
              whiteSpace: "nowrap",
              transform: `scale(${none ? 1 + 0.12 * Math.max(0, 1 - (t - c.ten_none) / 0.3) : 1})`,
            }}
          >
            0 perguntas
          </div>
        </div>

        {/* mensagens */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: `blur(${Math.min(7, Math.max(0, (speed - 700) / 260)) + vague * 3}px) saturate(${mix(1, 0.35, vague)})`,
            opacity: mix(1, 0.55, vague) * mix(1, 0.6, Math.min(1, unknown)),
          }}
        >
          {placed.map(({ it, a, top }, k) => {
            if (a <= 0 || top + H[it.kind] < P.head) return null;
            if (it.kind === "out") {
              return (
                <div
                  key={k}
                  style={{
                    position: "absolute",
                    right: 34,
                    top,
                    width: 440,
                    height: H.out,
                    borderRadius: 30,
                    borderBottomRightRadius: 10,
                    background: "#123A2D",
                    border: "1px solid rgba(53,224,161,0.28)",
                    overflow: "hidden",
                    opacity: Math.min(1, a * 1.6),
                    transform: `translateX(${(1 - a) * 380}px)`,
                  }}
                >
                  <Building w={440} h={196} id={`f${it.n}`} hue={it.n ?? 0} lit={0.35 + ((it.n ?? 0) % 3) * 0.15} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 22px", height: 76 }}>
                    <span style={{ fontWeight: 700, fontSize: 28, color: C.text }}>Anúncio</span>
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.accent }}>
                      {String(it.n).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            }
            const fade = it.text === "Oi! Vi o anúncio" ? 1 : mix(1, 0.45, prog(t, it.t + 0.35, 0.4, ease.out));
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: 34,
                  top,
                  height: H.in,
                  boxSizing: "border-box",
                  borderRadius: 30,
                  borderBottomLeftRadius: 10,
                  background: C.surface2,
                  border: `1px solid ${C.line}`,
                  padding: "0 28px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 32,
                  color: C.text,
                  opacity: Math.min(1, a * 1.6) * fade,
                  transform: `translateX(${(1 - a) * -160}px) scale(${mix(0.8, 1, a)})`,
                  transformOrigin: "0% 100%",
                }}
              >
                {it.text}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: P.head,
              height: 120,
              background: `linear-gradient(to bottom, ${C.surface}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
