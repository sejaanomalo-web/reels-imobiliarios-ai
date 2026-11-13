import { Easing, spring } from "remotion";

export const FPS = 30;
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  soft: Easing.bezier(0.33, 1, 0.68, 1),
  linear: (x: number) => x,
};

/** Progresso 0→1 de uma animação que começa em `start` (s) e dura `dur` (s). */
export const prog = (t: number, start: number, dur: number, e: (x: number) => number = ease.out) =>
  e(clamp01((t - start) / dur));

/** Mola 0→1 iniciando em `start` (s). */
export const sp = (
  t: number,
  start: number,
  cfg: { damping?: number; stiffness?: number; mass?: number } = {},
) =>
  t <= start
    ? 0
    : spring({
        frame: (t - start) * FPS,
        fps: FPS,
        config: { damping: 15, stiffness: 150, mass: 0.9, ...cfg },
      });

/** Ruído determinístico 0..1. */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
