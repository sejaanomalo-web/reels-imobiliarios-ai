import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { IconCalendar, IconSearch } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconChat, IconCursor, IconDoc, Tag } from "./ui";

/**
 * CENA 4 — UMA QUESTÃO POR VEZ. "Se o interessado responder, avance uma questão por vez." → nó LEAD RESPONDEU + três caminhos.
 * Cada "Se…" acende só o caminho escolhido e o ponto do lead percorre só ele: DOCUMENTAÇÃO → "explique o que pode verificar";
 * VISITA → "combine horários"; SÓ PESQUISANDO → "respeite o momento". "O objetivo é transformar um clique em uma conversa
 * compreensível." → os caminhos recuam e o cursor (CLIQUE) vira um balão (CONVERSA).
 */
const CARDS = [
  { k: "DOCUMENTAÇÃO", act: "Explique o que dá para verificar", icon: (col: string) => <IconDoc size={64} color={col} /> },
  { k: "VISITA", act: "Combine horários", icon: (col: string) => <IconCalendar size={64} color={col} /> },
  { k: "SÓ PESQUISANDO", act: "Respeite o momento", icon: (col: string) => <IconSearch size={64} color={col} /> },
];
const CX = [70, 390, 710];
const CW = 300;
const CY = 640;
const NODE = { x: 540, y: 400 };

export const Confianca: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const pick = [c.f_doc, c.f_vis, c.f_pesq];
  const act = [c.f_verif, c.f_hor, c.f_mom];
  const enter = sp(t, c.f_se - 0.35, { damping: 15, stiffness: 150 });
  const one = sp(t, c.f_uma - 0.1, { damping: 11, stiffness: 220 });
  const branches = prog(t, c.f_uma + 0.2, 0.8, ease.inOut);
  const active = pick.reduce((a, p, i) => (t >= p - 0.1 ? i : a), -1);
  const goal = prog(t, c.f_obj - 0.2, 0.7, ease.inOut);
  const click = sp(t, c.f_clique - 0.1, { damping: 11, stiffness: 220 });
  const conv = sp(t, c.f_convers - 0.1, { damping: 12, stiffness: 200 });
  const morph = prog(t, c.f_convers - 0.1, 0.5, ease.inOut);
  const out = prog(t, c.i_prim - 0.45, 0.4, ease.in);

  // trajetória do ponto do lead: nó → card ativo
  const travel = active >= 0 ? prog(t, pick[active] + 0.15, 0.7, ease.inOut) : 0;
  const tx = CX[Math.max(0, active)] + CW / 2;
  const dotX = mix(NODE.x, tx, travel);
  const dotY = mix(NODE.y + 70, CY - 20, travel) - Math.sin(travel * Math.PI) * 40;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.f_se - 0.35, s: 1.08, y: -60 },
          { t: c.f_uma + 0.6, s: 1.0, y: 0, e: ease.inOut },
          { t: c.f_doc + 0.3, s: 1.06, x: -150, y: 0, e: ease.inOut },
          { t: c.f_vis + 0.3, s: 1.06, x: 0, y: 0, e: ease.inOut },
          { t: c.f_pesq + 0.3, s: 1.06, x: 150, y: 0, e: ease.inOut },
          { t: c.f_obj + 0.4, s: 0.96, x: 0, y: 60, e: ease.inOut },
          { t: c.i_prim, s: 1.0, y: 70, e: ease.linear },
        ]}
      >
        {/* galhos */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible", opacity: 1 - goal * 0.6 }}>
          {CX.map((x, i) => {
            const d = `M ${NODE.x} ${NODE.y + 70} C ${NODE.x} ${NODE.y + 170}, ${x + CW / 2} ${CY - 130}, ${x + CW / 2} ${CY - 20}`;
            const on = i === active;
            return <path key={i} d={d} fill="none" stroke={on ? BRAND.hex : C.dim} strokeWidth={on ? 7 : 4} strokeDasharray={on ? undefined : "14 12"} pathLength={1} opacity={branches} style={on ? { filter: `drop-shadow(0 0 10px ${brandAlpha(0.6)})` } : undefined} />;
          })}
        </svg>
        {/* nó */}
        <div style={{ position: "absolute", left: NODE.x - 260, top: NODE.y - 70, width: 520, height: 140, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, boxShadow: `0 0 34px ${brandAlpha(0.25)}`, opacity: Math.min(1, enter * 1.5) * (1 - goal * 0.6) }}>
          <IconChat size={56} />
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 36, letterSpacing: "0.06em", color: C.text }}>LEAD RESPONDEU</span>
        </div>
        {one > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: NODE.y - 160, display: "flex", justifyContent: "center", opacity: Math.min(1, one * 1.5) * (1 - goal), transform: `scale(${mix(0.4, 1, Math.min(1.1, one))})` }}>
            <Tag text="UMA QUESTÃO POR VEZ" tone="accent" size={30} />
          </div>
        ) : null}
        {/* três caminhos */}
        {CARDS.map((k, i) => {
          const a = sp(t, c.f_uma + 0.4 + i * 0.12, { damping: 14, stiffness: 180 });
          const on = i === active;
          const done = t >= pick[i] - 0.1;
          const ac = sp(t, act[i] - 0.1, { damping: 12, stiffness: 200 });
          const col = on ? BRAND.hex : done ? C.text : C.muted;
          return (
            <div key={k.k} style={{ position: "absolute", left: CX[i], top: CY + (1 - Math.min(1, a)) * 120 + (on ? Math.sin(t * 2.4) * 5 : 0), width: CW, height: 360, boxSizing: "border-box", borderRadius: 32, background: on ? C.surface2 : C.surface, border: `3px solid ${on ? BRAND.hex : C.line}`, boxShadow: on ? `0 0 40px ${brandAlpha(0.25)}` : "0 24px 60px rgba(0,0,0,0.5)", padding: "28px 22px", display: "flex", flexDirection: "column", gap: 18, opacity: Math.min(1, a * 1.5) * (on || active < 0 ? 1 : 0.5) * (1 - goal * 0.65), transform: `scale(${on ? 1.04 : 1})` }}>
              {k.icon(col)}
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: i === 2 ? 26 : 28, letterSpacing: "0.04em", color: col }}>{k.k}</div>
              {done ? (
                <div style={{ fontWeight: 800, fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, ac * 1.5), transform: `translateY(${(1 - Math.min(1, ac)) * 24}px)` }}>{k.act}</div>
              ) : null}
            </div>
          );
        })}
        {/* ponto do lead */}
        {active >= 0 && goal < 0.5 ? (
          <div style={{ position: "absolute", left: dotX - 20, top: dotY - 20, width: 40, height: 40, borderRadius: 20, background: BRAND.hex, boxShadow: `0 0 26px ${brandAlpha(0.8)}`, zIndex: 6 }} />
        ) : null}
        {/* clique → conversa */}
        {goal > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", alignItems: "center", gap: 34, opacity: goal }}>
            <div style={{ width: 230, height: 150, borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transform: `scale(${mix(0.6, 1, Math.min(1.1, click))})`, opacity: mix(1, 0.55, morph) }}>
              <IconCursor size={56} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>CLIQUE</span>
            </div>
            <svg width={90} height={40} viewBox="0 0 90 40" style={{ opacity: Math.min(1, conv * 1.5) }}>
              <path d="M4 20h70M60 6l16 14-16 14" fill="none" stroke={BRAND.hex} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ width: 330, height: 150, borderRadius: 34, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 0 40px ${brandAlpha(0.3 * conv)}`, opacity: Math.min(1, conv * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, conv))})` }}>
              <IconChat size={56} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>CONVERSA</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
