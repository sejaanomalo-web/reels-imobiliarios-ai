import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { PEOPLE } from "./people";

/**
 * CENA 01 — GANCHO. "Cinco pessoas chamam ao mesmo tempo. Quem responde primeiro?"
 * Cinco celulares tocando em volta de uma mesa, já no primeiro quadro; a câmera gira e se aproxima;
 * em "mesmo tempo" todos pulsam juntos; em "Quem responde" surge um "?" no centro e a câmera mergulha nele.
 */
const CENTER = { x: 540, y: 790 };
const RX = 350;
const RY = 270;

const Phone: React.FC<{ i: number; t: number; ringAt: number; sync: number; scale: number }> = ({ i, t, ringAt, sync, scale }) => {
  const p = PEOPLE[i];
  const ring = t >= ringAt ? Math.max(0, 1 - ((t - ringAt) % 0.9) / 0.9) : 0;
  const buzz = t >= ringAt ? Math.sin(t * 70 + i) * 4 * Math.max(0, 1 - (t - ringAt) / 0.5) : 0;
  const badge = sp(t, ringAt, { damping: 9, stiffness: 260 });
  return (
    <div
      style={{
        position: "absolute",
        left: -105,
        top: -186,
        width: 210,
        height: 372,
        borderRadius: 40,
        background: "linear-gradient(150deg,#4C535E,#1A1E24 45%,#0B0D10)",
        boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 ${60 * ring}px rgba(53,224,161,${0.5 * ring})`,
        transform: `translateX(${buzz}px) scale(${scale * (1 + 0.08 * sync)})`,
        fontFamily: F.sans,
      }}
    >
      <div style={{ position: "absolute", inset: 8, borderRadius: 33, background: C.surface, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: 10, width: 64, height: 16, marginLeft: -32, borderRadius: 10, background: "#050607" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: -12 - 24 * (1 - ring),
                top: -12 - 24 * (1 - ring),
                right: -12 - 24 * (1 - ring),
                bottom: -12 - 24 * (1 - ring),
                borderRadius: 999,
                border: `3px solid ${C.accent}`,
                opacity: ring * 0.8,
              }}
            />
            <Avatar size={92} label={p.ini} bg={p.bg} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 30, color: C.text, letterSpacing: "-0.02em" }}>{p.name}</div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 19, color: C.accent, letterSpacing: "0.08em" }}>CHAMANDO</div>
        </div>
        <div style={{ position: "absolute", left: 22, right: 22, bottom: 26, display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: C.warn }} />
          <div style={{ width: 56, height: 56, borderRadius: 28, background: C.accent }} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: -14,
          top: -14,
          minWidth: 48,
          height: 48,
          borderRadius: 24,
          background: C.warn,
          color: "#fff",
          fontWeight: 800,
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${badge})`,
          boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
        }}
      >
        1
      </div>
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const rings = tl.series.rings;
  const sync = Math.max(0, 1 - Math.abs(t - c.hook_same - 0.08) / 0.28) * (t > c.hook_same - 0.2 ? 1 : 0);
  const spin = mix(-26, 34, prog(t, 0, c.hook_first, ease.linear)) + 10 * ease.out(Math.min(1, t / 0.4));
  const q = sp(t, c.hook_who, { damping: 10, stiffness: 210 });
  const qPulse = 1 + 0.08 * Math.sin(Math.max(0, t - c.hook_who) * 14) * Math.max(0, 1 - (t - c.hook_who) / 0.9);
  const phones = PEOPLE.map((_, i) => {
    const a = ((spin + i * 72 - 90) * Math.PI) / 180;
    const x = CENTER.x + RX * Math.cos(a);
    const y = CENTER.y + RY * Math.sin(a);
    const depth = (Math.sin(a) + 1) / 2; // 0 = fundo, 1 = frente
    return { i, x, y, depth };
  }).sort((a, b) => a.depth - b.depth);
  const tableIn = sp(t, 0, { damping: 18, stiffness: 120 });

  return (
    <Camera
      t={t}
      keys={[
        { t: 0, s: 1.32, r: -8, y: -110 },
        { t: c.hook_same, s: 1.0, r: 0, y: -40, e: ease.out },
        { t: c.hook_who, s: 1.04, y: -60 },
        { t: c.hook_first + 0.05, s: 1.3, y: -170, e: ease.inOut },
        { t: c.sit_c1 + 0.12, s: 5.5, y: -170, e: ease.in },
      ]}
      blurMax={10}
    >
      {/* mesa */}
      <div
        style={{
          position: "absolute",
          left: CENTER.x - 470,
          top: CENTER.y - 300,
          width: 940,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, #1B2028 0%, #13171C 70%, rgba(19,23,28,0) 100%)",
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.05)",
          opacity: tableIn,
          transform: `scale(${mix(0.9, 1, tableIn)})`,
        }}
      />
      {phones.map(({ i, x, y, depth }) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, zIndex: Math.round(depth * 10) }}>
          <Phone i={i} t={t} ringAt={rings[i] ?? 0} sync={sync} scale={mix(0.72, 1.05, depth)} />
        </div>
      ))}
      {/* "?" central — quem responde primeiro? */}
      {q > 0 ? (
        <div
          style={{
            position: "absolute",
            left: CENTER.x - 120,
            top: CENTER.y - 120,
            width: 240,
            height: 240,
            borderRadius: 120,
            background: C.accent,
            color: C.accentInk,
            fontFamily: F.sans,
            fontWeight: 800,
            fontSize: 190,
            lineHeight: "240px",
            textAlign: "center",
            zIndex: 20,
            transform: `scale(${q * qPulse}) rotate(${(1 - Math.min(1, q)) * -30}deg)`,
            boxShadow: "0 0 120px rgba(53,224,161,0.55)",
          }}
        >
          ?
        </div>
      ) : null}
    </Camera>
  );
};
