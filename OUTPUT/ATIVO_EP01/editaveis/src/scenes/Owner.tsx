import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chapter, Mark, PATHS, Tag } from "./ui";

/**
 * CENA 4 — O PROPRIETÁRIO. "Existe ainda quem concentre seu trabalho na captação: conquistar a confiança do proprietário, avaliar a
 * apresentação do imóvel e construir uma carteira que outros compradores queiram conhecer. Não é superior nem inferior. É outra porta
 * de entrada para o negócio."
 * Uma casa passa por autorização, checagem e apresentação e entra num catálogo que compradores olham. Depois os três caminhos
 * aparecem lado a lado, na mesma altura, como três portas que se abrem.
 */
const STEPS = [
  { k: "AUTORIZAÇÃO", v: "confiança do proprietário", cue: "o_trust" },
  { k: "CHECAGEM", v: "fotos, documentos, estado", cue: "o_present" },
  { k: "APRESENTAÇÃO", v: "anúncio pronto", cue: "o_present", d: 0.8 },
];

export const Owner: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const col = PATHS[2].color;
  const chap = sp(t, c.o_start - 0.05, { damping: 14, stiffness: 170 });
  const house = sp(t, c.o_cap - 0.2, { damping: 14, stiffness: 160 });
  const owner = sp(t, c.o_trust, { damping: 13, stiffness: 180 });
  const toCat = prog(t, c.o_build + 0.1, 0.9, ease.inOut);
  const cat = sp(t, c.o_build - 0.1, { damping: 15, stiffness: 150 });
  const look = sp(t, c.o_know - 0.3, { damping: 13, stiffness: 180 });
  const swap = prog(t, c.o_equal - 0.35, 0.5, ease.inOut);
  const doors = [0, 1, 2].map((i) => sp(t, c.o_equal - 0.2 + i * 0.1, { damping: 14, stiffness: 170 }));
  const eqTag = sp(t, c.o_equal + 0.3, { damping: 13, stiffness: 190 });
  const open = prog(t, c.o_door - 0.1, 0.9, ease.inOut);
  const exit = prog(t, c.i_err - 0.2, 0.45, ease.in);
  const stepAt = (s: (typeof STEPS)[number]) => c[s.cue] + (s.d ?? 0) - 0.05;
  const hx = mix(70, 400, toCat);
  const hy = mix(400, 1000, toCat);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.o_start, s: 1.08, y: -60 },
          { t: c.o_trust + 0.3, s: 1.04, y: -40, x: -40, e: ease.inOut },
          { t: c.o_build + 0.5, s: 1.0, y: 100, x: 0, e: ease.inOut },
          { t: c.o_equal + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.o_door + 0.8, s: 1.08, y: 20, e: ease.inOut },
          { t: c.i_err + 0.3, s: 1.0, y: 0, e: ease.in },
        ]}
      >
        {/* fase A — captação */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - swap }}>
          <div style={{ position: "absolute", left: 70, top: 270 }}>
            <Chapter n={3} text="A PARTIR DO PROPRIETÁRIO" p={chap} color={col} />
          </div>
          {/* proprietário */}
          <div style={{ position: "absolute", left: 70, top: 700, display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, owner * 1.5) * (1 - toCat), transform: `scale(${mix(0.6, 1, Math.min(1, owner))})` }}>
            <Avatar size={80} label="P" bg="#7A6A5A" ring={col} />
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>proprietário</span>
          </div>
          {/* etapas */}
          {STEPS.map((s, i) => {
            const a = sp(t, stepAt(s), { damping: 12, stiffness: 200 });
            return (
              <div key={s.k} style={{ position: "absolute", left: 470, top: 390 + i * 130, width: 540, height: 110, boxSizing: "border-box", borderRadius: 24, background: C.surface, border: `2px solid ${a > 0.5 ? col : C.line}`, display: "flex", alignItems: "center", gap: 16, padding: "0 20px", opacity: Math.min(1, Math.max(0.3, a) * 1.5) * (1 - toCat * 0.5), transform: `translateX(${(1 - Math.min(1, Math.max(0.3, a))) * 60}px)` }}>
                {a > 0.5 ? <Mark ok size={44} /> : <div style={{ width: 44, height: 44, borderRadius: 22, border: `3px dashed ${C.dim}` }} />}
                <div>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: col }}>{s.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 28, color: C.text }}>{s.v}</div>
                </div>
              </div>
            );
          })}
          {/* catálogo */}
          <div style={{ position: "absolute", left: 70, top: 870, width: 940, height: 330, borderRadius: 32, background: "rgba(21,24,29,0.9)", border: `1px solid ${C.line}`, opacity: Math.min(1, cat * 1.5), transform: `translateY(${(1 - Math.min(1, cat)) * 80}px)` }}>
            <div style={{ position: "absolute", left: 24, top: 18, fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.08em", color: C.muted }}>CARTEIRA CAPTADA</div>
            {[0, 1, 2, 3, 4].map((k) => (
              <div key={k} style={{ position: "absolute", left: 24 + k * 182, top: 70, width: 165, height: 150, borderRadius: 18, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center", opacity: k === 1 ? 0 : 0.7 }}>
                <House w={120} h={90} />
              </div>
            ))}
            {look > 0
              ? [0, 1, 2].map((k) => (
                  <div key={k} style={{ position: "absolute", left: 300 + k * 130, top: 240, opacity: Math.min(1, look * 1.5), transform: `translateY(${(1 - Math.min(1, look)) * 30 + Math.sin(t * 2 + k) * 4}px)` }}>
                    <Avatar size={60} label={["C1", "C2", "C3"][k]} bg={["#4E6A8C", "#5A7A6E", "#6A5A8C"][k]} />
                  </div>
                ))
              : null}
          </div>
          {/* a casa captada */}
          <div style={{ position: "absolute", left: hx + (toCat > 0 ? 0 : 0), top: hy, width: mix(330, 165, toCat), opacity: Math.min(1, house * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, house))})`, transformOrigin: "0 0" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", background: C.surface2, border: `2px solid ${col}`, boxShadow: `0 0 50px ${col}44` }}>
              <div style={{ height: mix(200, 150, toCat), display: "flex", alignItems: "flex-end", justifyContent: "center", background: "#1A1E24" }}>
                <House w={mix(220, 120, toCat)} h={mix(170, 90, toCat)} />
              </div>
              {toCat < 0.5 ? <div style={{ padding: "12px 16px", fontWeight: 800, fontSize: 26, color: C.text }}>Casa · captação</div> : null}
            </div>
          </div>
        </div>
        {/* fase B — três portas na mesma altura */}
        {swap > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: swap }}>
            {PATHS.map((p, i) => {
              const d = doors[i];
              const x = 90 + i * 315;
              return (
                <div key={p.k} style={{ position: "absolute", left: x, top: 440, width: 270, height: 520, opacity: Math.min(1, d * 1.5), transform: `translateY(${(1 - Math.min(1, d)) * 100}px)` }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "130px 130px 18px 18px", background: `radial-gradient(circle at 50% 40%, ${p.color}66, transparent 70%)`, border: `3px solid ${p.color}` }} />
                  <div style={{ position: "absolute", inset: 10, perspective: 900 }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "120px 120px 12px 12px", background: "#20252C", transformOrigin: "0 50%", transform: `rotateY(${-72 * open}deg)`, border: "2px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 540, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: p.color }}>{p.k}</div>
                </div>
              );
            })}
            {eqTag > 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", opacity: Math.min(1, eqTag * 1.5) }}>
                <Tag text={open > 0.3 ? "TRÊS PORTAS DE ENTRADA" : "NEM SUPERIOR, NEM INFERIOR"} tone="accent" size={30} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
