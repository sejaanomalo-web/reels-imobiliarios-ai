import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Avatar, Building, IconCheck } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 03 — TENSÃO. A semana enche de visitas, surge o imóvel perfeito…
 * e o contato de quem procurava está enterrado na pilha de conversas.
 */
const DAYS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const CELLS = [0, 9, 14, 4, 19, 7, 22, 11, 2, 16, 27, 13, 24, 5, 20];
const GRID = { x: 36, y: 150, cw: 148, ch: 84 };
const SCRAMBLE = "ABCDEFGHJKLMNPRSTUVXZ";

const PileCard: React.FC<{ i: number; x: number; y: number; rot: number; featured?: boolean; dim?: number }> = ({
  i,
  x,
  y,
  rot,
  featured,
  dim = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 380,
      height: 104,
      borderRadius: 24,
      background: featured ? "#0E3A1F" : C.surface2,
      border: `1px solid ${featured ? "rgba(58,245,132,0.5)" : C.line}`,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 18px",
      boxSizing: "border-box",
      transform: `rotate(${rot}deg)`,
      boxShadow: "0 18px 36px rgba(0,0,0,0.5)",
      opacity: dim,
    }}
  >
    <Avatar
      size={62}
      label={featured ? "RM" : ""}
      bg={featured ? C.accent : ["#3A4658", "#4A3F58", "#3F5248", "#58483A", "#3A5258"][i % 5]}
      color={C.accentInk}
    />
    <div>
      {featured ? (
        <div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>Rafael M.</div>
      ) : (
        <div style={{ width: 170 + (i % 3) * 30, height: 14, borderRadius: 7, background: C.muted, opacity: 0.7 }} />
      )}
      <div style={{ width: 120 + (i % 4) * 26, height: 11, borderRadius: 6, background: C.dim, marginTop: 11 }} />
    </div>
  </div>
);

export const Tensao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const scene = tl.scenes.find((s) => s.id === "tensao")!;
  const blocks = tl.series.agendaBlocks;
  const enter = prog(t, scene.start - 0.05, 0.55, ease.out);
  const recede = prog(t, c.ten_listing - 0.15, 0.6, ease.inOut);
  const listing = sp(t, c.ten_listing, { damping: 15, stiffness: 120 });
  const glow = prog(t, c.ten_glow, 0.5, ease.out);
  const glowPulse = 0.75 + 0.25 * Math.sin((t - c.ten_glow) * 5);
  const remember = sp(t, c.ten_remember, { damping: 12, stiffness: 200 });
  const name = sp(t, c.ten_name, { damping: 15 });
  const who = prog(t, c.ten_who, 0.4, ease.out);
  const fold = prog(t, c.ins_fold - 0.12, 0.5, ease.in);
  const visits = blocks.filter((b) => t >= b).length;
  const sweep = prog(t, c.ten_agenda, c.ten_full - c.ten_agenda, ease.linear);

  const scr = (seed: number, len: number) =>
    Array.from({ length: len }, (_, k) => SCRAMBLE[Math.floor(rnd(seed + k * 3.1 + Math.floor(t * 14) * 7.7) * SCRAMBLE.length)]).join("");

  // pilha de conversas: o cartão do Rafael (índice 0) vai sendo coberto
  const pile = Array.from({ length: 9 }, (_, i) => {
    const at = i === 0 ? scene.start - 0.05 : blocks[Math.min(blocks.length - 1, i * 1.7) | 0] - 0.1;
    const s = sp(t, at, { damping: 13, stiffness: 160 });
    if (s <= 0) return null;
    const x = 150 + rnd(i + 2) * 300;
    const y = 800 + rnd(i + 5) * 110;
    const jitter = name > 0 ? Math.sin(t * 22 + i * 2) * 5 * (1 - who) : 0;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          inset: 0,
          opacity: Math.min(1, s * 2),
          transform: `translate(${jitter}px, ${(1 - s) * -260}px)`,
        }}
      >
        <PileCard
          i={i}
          x={i === 0 ? 270 : x}
          y={i === 0 ? 850 : y}
          rot={i === 0 ? -3 : (rnd(i + 8) - 0.5) * 22}
          featured={i === 0}
          dim={i === 0 ? mix(1, 0.55, prog(t, blocks[3], 1, ease.out)) : 1}
        />
      </div>
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 240,
        width: 960,
        height: 1020,
        fontFamily: F.sans,
        opacity: enter * (1 - prog(t, c.ins_fold + 0.2, 0.2, ease.linear)),
        transformOrigin: "50% 50%",
        transform: `scale(${mix(1, 0.16, fold)}, ${mix(1, 0.02, fold)}) `,
        filter: fold > 0.05 ? `blur(${fold * 6}px)` : undefined,
      }}
    >
      {/* agenda da semana */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 960,
          height: 600,
          borderRadius: 44,
          background: C.surface,
          border: `1px solid ${C.line}`,
          overflow: "hidden",
          opacity: mix(1, 0.3, recede),
          transform: `translateY(${(1 - enter) * 120}px) scale(${mix(1, 0.93, recede)})`,
          filter: recede > 0 ? `blur(${recede * 7}px)` : undefined,
          boxShadow: "0 40px 90px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "30px 36px 0", gap: 18 }}>
          <span style={{ fontWeight: 800, fontSize: 40, color: C.text, letterSpacing: "-0.02em" }}>Agenda da semana</span>
          <span style={{ flex: 1 }} />
          <span
            style={{
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 28,
              color: visits > 9 ? C.warn : C.text,
              background: visits > 9 ? "rgba(255,107,94,0.14)" : C.surface3,
              padding: "6px 18px",
              borderRadius: 16,
            }}
          >
            {visits} visitas
          </span>
        </div>
        {DAYS.map((d, i) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: GRID.x + i * GRID.cw,
              top: 104,
              width: GRID.cw - 10,
              textAlign: "center",
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.08em",
              color: Math.floor(sweep * 5.99) === i && sweep < 1 ? C.text : C.dim,
            }}
          >
            {d}
          </div>
        ))}
        {Array.from({ length: 30 }, (_, k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: GRID.x + (k % 6) * GRID.cw,
              top: GRID.y + Math.floor(k / 6) * GRID.ch,
              width: GRID.cw - 10,
              height: GRID.ch - 10,
              borderRadius: 16,
              background: "rgba(255,255,255,0.025)",
            }}
          />
        ))}
        {blocks.map((b, i) => {
          const s = sp(t, b, { damping: 11, stiffness: 240 });
          if (s <= 0) return null;
          const k = CELLS[i % CELLS.length];
          const hot = i > 8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: GRID.x + (k % 6) * GRID.cw,
                top: GRID.y + Math.floor(k / 6) * GRID.ch,
                width: GRID.cw - 10,
                height: GRID.ch - 10,
                borderRadius: 16,
                background: hot ? "#4A2A28" : C.surface3,
                borderLeft: `6px solid ${hot ? C.warn : C.muted}`,
                boxSizing: "border-box",
                padding: "10px 12px",
                transform: `scale(${mix(0.4, 1, s)})`,
                opacity: Math.min(1, s * 2),
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 23, color: C.text }}>Visita</div>
              <div style={{ fontFamily: F.mono, fontWeight: 500, fontSize: 19, color: C.muted }}>
                {8 + Math.floor(k / 6) * 2}h{k % 2 ? "30" : "00"}
              </div>
            </div>
          );
        })}
      </div>

      {/* pilha de conversas */}
      <div style={{ position: "absolute", inset: 0, opacity: mix(1, 0.75, recede) }}>{pile}</div>

      {/* imóvel perfeito */}
      {listing > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 20,
            width: 560,
            height: 452,
            borderRadius: 40,
            background: C.surface2,
            border: `2px solid rgba(58,245,132,${0.25 + 0.6 * glow})`,
            overflow: "hidden",
            opacity: Math.min(1, listing * 1.6),
            transform: `translateY(${(1 - listing) * 520}px) rotate(${(1 - listing) * 6}deg)`,
            boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 ${120 * glow * glowPulse}px rgba(58,245,132,${0.45 * glow})`,
          }}
        >
          <Building w={560} h={300} id="perfeito" hue={1} lit={mix(0.2, 0.85, glow)} />
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 22,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "0.1em",
              color: C.accentInk,
              background: C.accent,
              padding: "6px 16px",
              borderRadius: 12,
            }}
          >
            NOVO
          </div>
          <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 40, color: C.text, letterSpacing: "-0.02em" }}>
                Apê · 2 quartos
              </div>
              <div style={{ fontWeight: 500, fontSize: 28, color: C.muted, marginTop: 2 }}>varanda · andar alto</div>
            </div>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 33,
                background: C.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${remember})`,
              }}
            >
              <IconCheck size={40} />
            </div>
          </div>
        </div>
      ) : null}

      {/* ligação imóvel → contato: quebrada */}
      <svg width={960} height={1020} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <path
          d={`M480 478V${478 + name * 62}`}
          stroke={mix(0, 1, who) > 0.5 ? C.warn : C.muted}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="6 14"
          opacity={name}
        />
      </svg>

      {/* quem procurava? */}
      {name > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 548,
            width: 700,
            height: 190,
            boxSizing: "border-box",
            borderRadius: 36,
            background: C.surface,
            border: `3px dashed ${who > 0 ? C.warn : C.muted}`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 34px",
            opacity: Math.min(1, name * 1.5),
            transform: `scale(${mix(0.85, 1, name)})`,
            boxShadow: `0 30px 70px rgba(0,0,0,0.6), 0 0 ${80 * who}px rgba(255,107,94,${0.28 * who})`,
          }}
        >
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              background: C.surface3,
              color: who > 0 ? C.warn : C.muted,
              fontWeight: 800,
              fontSize: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${1 + 0.12 * Math.sin(who * Math.PI)})`,
            }}
          >
            ?
          </div>
          <div>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: who > 0 ? C.warn : C.muted }}>
              QUEM PROCURAVA?
            </div>
            <div
              style={{
                fontFamily: F.mono,
                fontWeight: 700,
                fontSize: 52,
                color: C.text,
                marginTop: 6,
                opacity: 0.85,
                filter: "blur(2.2px)",
                letterSpacing: "0.04em",
              }}
            >
              {scr(3, 6)} {scr(40, 1)}.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
