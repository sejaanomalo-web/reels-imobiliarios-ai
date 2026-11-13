import React from "react";
import { clamp01, ease, mix } from "../lib/anim";

/**
 * Câmera virtual: keyframes no tempo (s). Cada chave diz para onde a câmera olha (x, y = deslocamento
 * do ponto focal em relação ao centro do quadro, em px do "mundo"), o zoom (s), o giro (r) e a
 * inclinação 3D (rx, ry). Entre duas chaves interpola com o easing da chave de destino.
 * Movimentos rápidos ganham desfoque proporcional à velocidade (motion blur discreto).
 */
export type CamKey = { t: number; x?: number; y?: number; s?: number; r?: number; rx?: number; ry?: number; e?: (p: number) => number };
type CamState = { x: number; y: number; s: number; r: number; rx: number; ry: number };
const BASE: CamState = { x: 0, y: 0, s: 1, r: 0, rx: 0, ry: 0 };

const full = (k: CamKey, prev: CamState): CamState => ({
  x: k.x ?? prev.x,
  y: k.y ?? prev.y,
  s: k.s ?? prev.s,
  r: k.r ?? prev.r,
  rx: k.rx ?? prev.rx,
  ry: k.ry ?? prev.ry,
});

export const camAt = (t: number, keys: CamKey[]): CamState => {
  const ks = [...keys].sort((a, b) => a.t - b.t);
  let prev = full(ks[0], BASE);
  if (t <= ks[0].t) return prev;
  for (let i = 1; i < ks.length; i++) {
    const cur = full(ks[i], prev);
    if (t <= ks[i].t) {
      const p = (ks[i].e ?? ease.inOut)(clamp01((t - ks[i - 1].t) / Math.max(1e-6, ks[i].t - ks[i - 1].t)));
      return {
        x: mix(prev.x, cur.x, p),
        y: mix(prev.y, cur.y, p),
        s: Math.exp(mix(Math.log(prev.s), Math.log(cur.s), p)),
        r: mix(prev.r, cur.r, p),
        rx: mix(prev.rx, cur.rx, p),
        ry: mix(prev.ry, cur.ry, p),
      };
    }
    prev = cur;
  }
  return prev;
};

export const Camera: React.FC<{
  t: number;
  keys: CamKey[];
  children: React.ReactNode;
  blurMax?: number;
  /** deriva contínua sutil para nenhum quadro ficar parado */
  drift?: number;
}> = ({ t, keys, children, blurMax = 8, drift = 1 }) => {
  const c = camAt(t, keys);
  const p = camAt(t - 1 / 30, keys);
  const speed = Math.hypot((c.x - p.x) * c.s, (c.y - p.y) * c.s) * 30 + Math.abs(Math.log(c.s / p.s)) * 30 * 900;
  const blur = Math.min(blurMax, Math.max(0, (speed - 900) / 420));
  const dx = Math.sin(t * 0.7) * 6 * drift;
  const dy = Math.cos(t * 0.53) * 5 * drift;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1900, perspectiveOrigin: "540px 960px" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "540px 960px",
          transform: `translate(${-c.x * c.s + dx}px, ${-c.y * c.s + dy}px) scale(${c.s}) rotateX(${c.rx}deg) rotateY(${c.ry}deg) rotate(${c.r + Math.sin(t * 0.45) * 0.25 * drift}deg)`,
          filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
