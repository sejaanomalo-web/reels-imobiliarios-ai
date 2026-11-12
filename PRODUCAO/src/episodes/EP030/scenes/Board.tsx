import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { GROUPS, GROUP_COLOR, PROPS, Tag, clockText } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "Abra seus imóveis ativos e separe três grupos: os que receberam interesse,
 * os que precisam de atualização e os que estão sem próximo passo definido."
 * Uma pilha de fichas (imóveis ativos, fictícios) se espalha; o quadro ganha três colunas e cada grupo
 * recebe suas fichas no tempo da fala. O cronômetro segue correndo no canto.
 *
 * CENA 03 — TENSÃO (mesmo quadro, mesma câmera). "No segundo grupo, confira preço, status, fotos e informações.
 * No terceiro, decida qual ação faz sentido e quem será responsável."
 * Microcartões de conferência se marcam sobre o 2º grupo; depois cada ficha do 3º grupo ganha uma ação e um dono.
 */
const CHECKS = [["Preço", "ten_price"], ["Status", "ten_status"], ["Fotos", "ten_photos"], ["Informações", "ten_info"]] as const;
const ACTIONS = [
  { a: "ligar para o proprietário", who: "AR", bg: "#7A6A5A" },
  { a: "pedir fotos novas", who: "JM", bg: "#5A7A6E" },
  { a: "rever o anúncio", who: "LC", bg: "#6A5A8C" },
];
export const COLX = [60, 393, 726];
export const COLW = 294;
export const COLY = 420;
const CARDH = 150;
const PILE = { x: 393, y: 250 };

export const PropCard: React.FC<{ name: string; g: number; style?: React.CSSProperties }> = ({ name, g, style }) => (
  <div style={{ position: "absolute", width: COLW - 24, height: CARDH, boxSizing: "border-box", borderRadius: 22, background: C.surface2, border: `1px solid ${C.line}`, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,0,0,0.45)", ...style }}>
    <div style={{ height: 82, background: "#1A1E24", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <House w={110} h={78} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px" }}>
      <div style={{ width: 14, height: 14, borderRadius: 7, background: GROUP_COLOR[g], flexShrink: 0 }} />
      <span style={{ fontWeight: 800, fontSize: 24, color: C.text, whiteSpace: "nowrap" }}>{name}</span>
    </div>
  </div>
);

export const Board: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const pile = sp(t, c.sit_open - 0.05, { damping: 15, stiffness: 150 });
  const label = sp(t, c.sit_active - 0.05, { damping: 14, stiffness: 170 });
  const cols = [0, 1, 2].map((i) => sp(t, c.sit_three + i * 0.15, { damping: 15, stiffness: 150 }));
  const groupT = [c.sit_g1 - 0.15, c.sit_g2 - 0.15, c.sit_g3 - 0.15];
  const exit = prog(t, c.ins_goal - 0.15, 0.45, ease.in);
  const chk = sp(t, c.ten_second - 0.05, { damping: 15, stiffness: 160 });
  const chkOut = prog(t, c.ten_third - 0.2, 0.4, ease.in);
  const dec = sp(t, c.ten_third, { damping: 15, stiffness: 160 });
  const dim2 = prog(t, c.ten_second, 0.4, ease.out) * (1 - prog(t, c.ten_third, 0.4, ease.out));
  const dim3 = prog(t, c.ten_third, 0.4, ease.out);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, pile * 1.6) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_open, s: 1.1, y: -220 },
          { t: c.sit_three, s: 0.98, y: -20, e: ease.inOut },
          { t: c.sit_g1 + 0.3, s: 1.04, x: -150, y: 40, e: ease.inOut },
          { t: c.sit_g2 + 0.3, s: 1.04, x: 0, y: 40, e: ease.inOut },
          { t: c.sit_g3 + 0.3, s: 1.04, x: 150, y: 40, e: ease.inOut },
          { t: c.ten_second + 0.4, s: 1.04, x: 40, y: 20, e: ease.inOut },
          { t: c.ten_info + 0.5, s: 1.12, x: 110, y: 90, e: ease.inOut },
          { t: c.ten_third + 0.4, s: 1.04, x: -40, y: 20, e: ease.inOut },
          { t: c.ten_owner + 0.6, s: 1.1, x: -30, y: 80, e: ease.inOut },
          { t: c.ins_goal + 0.3, s: 0.94, x: 0, y: 20, e: ease.in },
        ]}
      >
        {/* cronômetro correndo */}
        <div style={{ position: "absolute", right: 70, top: 262, padding: "10px 20px", borderRadius: 20, background: C.surface2, border: `2px solid ${C.accent}`, fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.text, opacity: Math.min(1, pile * 1.5) * (1 - exit) }}>
          ⏱ {clockText(t, c.hook_15 + 0.75)}
        </div>
        <div style={{ position: "absolute", left: 70, top: 268, opacity: Math.min(1, label * 1.5) * (1 - prog(t, c.sit_three, 0.4, ease.in)) }}>
          <Tag text="IMÓVEIS ATIVOS · 9" tone="accent" size={26} />
        </div>
        {/* colunas */}
        {GROUPS.map((g, i) => (
          <div key={g} style={{ position: "absolute", left: COLX[i], top: COLY, width: COLW, height: 820, boxSizing: "border-box", borderRadius: 32, background: "rgba(21,24,29,0.92)", border: `2px solid ${C.line}`, borderTop: `6px solid ${GROUP_COLOR[i]}`, opacity: Math.min(1, cols[i] * 1.5) * mix(1, 0.4, i === 2 ? dim2 : i === 1 ? dim3 : Math.max(dim2, dim3)), transform: `translateY(${(1 - Math.min(1, cols[i])) * 80}px)` }}>
            <div style={{ padding: "20px 18px", fontFamily: F.mono, fontWeight: 700, fontSize: 21, lineHeight: 1.25, letterSpacing: "0.04em", color: GROUP_COLOR[i], height: 70 }}>{g}</div>
          </div>
        ))}
        {/* fichas: da pilha para a coluna do seu grupo */}
        {PROPS.map((p, k) => {
          const idx = PROPS.filter((q, j) => q.g === p.g && j < k).length;
          const go = prog(t, groupT[p.g] + idx * 0.14, 0.6, ease.inOut);
          const px = PILE.x + 12 + (k - 4) * 26;
          const py = PILE.y + 90 + Math.abs(k - 4) * 10;
          const tx = COLX[p.g] + 12;
          const ty = COLY + 110 + idx * (CARDH + 18);
          const lift = Math.sin(Math.PI * go) * 60;
          const enter = sp(t, c.sit_open + k * 0.05, { damping: 14, stiffness: 170 });
          const dimCard = p.g === 2 ? dim2 : p.g === 1 ? dim3 : Math.max(dim2, dim3);
          return (
            <PropCard key={p.n} name={p.n} g={p.g} style={{ left: mix(px, tx, go), top: mix(py, ty, go) - lift, opacity: Math.min(1, enter * 1.5) * mix(1, 0.35, dimCard), transform: `rotate(${(1 - go) * (k - 4) * 4}deg) scale(${mix(0.9, 1, go)})`, zIndex: go > 0 ? 10 + k : k }} />
          );
        })}
        {/* 2º grupo: conferência */}
        {chk > 0 && chkOut < 1 ? (
          <div style={{ position: "absolute", zIndex: 50, left: 600, top: 520, width: 420, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `2px solid ${C.cold}`, padding: "24px 26px", boxShadow: "0 40px 90px rgba(0,0,0,0.6)", opacity: Math.min(1, chk * 1.5) * (1 - chkOut), transform: `translateX(${(1 - Math.min(1, chk)) * 120 + chkOut * 120}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.cold }}>2º GRUPO · CONFERIR</div>
            {CHECKS.map(([k, cue]) => {
              const on = sp(t, c[cue] - 0.05, { damping: 12, stiffness: 210 });
              return (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, padding: "14px 18px", borderRadius: 20, background: on > 0.5 ? "rgba(53,224,161,0.12)" : C.surface2, border: `2px solid ${on > 0.5 ? "rgba(53,224,161,0.5)" : "transparent"}`, transform: `scale(${1 + 0.05 * Math.sin(Math.PI * Math.min(1, on))})` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, border: `3px solid ${on > 0.5 ? C.accent : C.dim}`, background: on > 0.5 ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: C.accentInk, fontWeight: 800, fontSize: 26 }}>{on > 0.5 ? "✓" : ""}</div>
                  <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{k}</span>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* 3º grupo: ação + responsável */}
        {dec > 0 ? (
          <div style={{ position: "absolute", zIndex: 50, left: 60, top: 520, width: 640, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `2px solid ${C.warn}`, padding: "24px 26px", boxShadow: "0 40px 90px rgba(0,0,0,0.6)", opacity: Math.min(1, dec * 1.5), transform: `translateX(${(1 - Math.min(1, dec)) * -120}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.warn }}>3º GRUPO · DECIDIR</div>
            {ACTIONS.map((x, i) => {
              const act = sp(t, c.ten_action + i * 0.2, { damping: 13, stiffness: 190 });
              const own = sp(t, c.ten_owner + i * 0.18, { damping: 11, stiffness: 210 });
              return (
                <div key={x.a} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18, padding: "14px 16px", borderRadius: 20, background: C.surface2 }}>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.dim, width: 62 }}>{PROPS[6 + i].n.split(" ·")[0]}</span>
                  <span style={{ flex: 1, fontWeight: 800, fontSize: 30, color: C.text, opacity: Math.min(1, act * 1.5), transform: `translateX(${(1 - Math.min(1, act)) * 20}px)`, display: "inline-block" }}>{x.a}</span>
                  <div style={{ width: 58, height: 58, borderRadius: 29, background: x.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: C.text, opacity: Math.min(1, own * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.12, own))})`, border: `3px solid ${C.accent}` }}>{x.who}</div>
                </div>
              );
            })}
            <div style={{ textAlign: "right", marginTop: 14, fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em", color: C.accent, opacity: prog(t, c.ten_owner + 0.5, 0.4, ease.out) }}>CADA TAREFA COM UM RESPONSÁVEL</div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
