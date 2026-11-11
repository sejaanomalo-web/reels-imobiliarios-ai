import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, Tag } from "./ui";

/**
 * CENA 04 — INSIGHT. "Apresente poucas opções e diga por que escolheu cada uma.
 * Depois pergunte qual delas faz mais sentido para avançar."
 * Uma pilha de 20 fichas se reduz a 3 em destaque, cada uma com o seu "por quê". A pergunta sai em balão
 * e um toque claro escolhe uma das opções.
 */
const OPTS = [
  { name: "Opção 1", why: "perto da escola" },
  { name: "Opção 2", why: "tem as 2 vagas" },
  { name: "Opção 3", why: "escola e 2 vagas" },
];
const X = [70, 395, 720];
const TOP = 420;
const PICK = 2;

export const Picks: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const collapse = prog(t, c.ins_few - 0.2, 0.8, ease.inOut);
  const cards = OPTS.map((_, i) => sp(t, c.ins_few + 0.35 + i * 0.14, { damping: 14, stiffness: 150 }));
  const whyT = (i: number) => mix(c.ins_why, c.ins_each + 0.2, i / 2);
  const ask = sp(t, c.ins_ask, { damping: 15, stiffness: 150 });
  const tapAt = c.ins_which + 0.75;
  const move = prog(t, c.ins_which - 0.1, 0.8, ease.inOut);
  const tap = prog(t, tapAt, 0.5, ease.out);
  const picked = sp(t, tapAt + 0.05, { damping: 11, stiffness: 190 });
  const adv = sp(t, c.ins_advance + 0.2, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.cta_prio - 0.15, 0.45, ease.in);
  const cur = { x: mix(860, X[PICK] + 200, move), y: mix(1260, TOP + 110, move) };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_few - 0.2, s: 0.94, y: 0 },
          { t: c.ins_few + 0.8, s: 1.0, y: -30, e: ease.out },
          { t: c.ins_each + 0.3, s: 1.04, y: -20, e: ease.inOut },
          { t: c.ins_ask + 0.3, s: 1.0, y: 40, e: ease.inOut },
          { t: tapAt + 0.3, s: 1.08, y: 20, x: 140, e: ease.inOut },
          { t: c.cta_prio + 0.3, s: 1.0, y: 0, x: 60, e: ease.in },
        ]}
      >
        {/* 20 fichas que se reduzem */}
        {Array.from({ length: 17 }).map((_, i) => {
          const ox = 70 + (i % 6) * 160;
          const oy = TOP + Math.floor(i / 6) * 150;
          return (
            <div key={i} style={{ position: "absolute", left: mix(ox, 540 - 60, collapse), top: mix(oy, 1500, collapse), width: 140, height: 130, borderRadius: 16, background: C.surface2, border: `1px solid ${C.line}`, opacity: (1 - collapse) * 0.8 * prog(t, c.ins_few - 0.5, 0.2, ease.out), transform: `scale(${mix(1, 0.4, collapse)})` }} />
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", opacity: Math.min(1, cards[0] * 1.5) * (1 - prog(t, c.ins_ask, 0.4, ease.out)), transform: `translateY(${(1 - Math.min(1, cards[0])) * 30}px)` }}>
          <Tag text="20 → 3 OPÇÕES, CADA UMA COM UM PORQUÊ" tone="accent" size={28} />
        </div>
        {OPTS.map((o, i) => {
          const w = sp(t, whyT(i), { damping: 13, stiffness: 180 });
          const isPick = i === PICK;
          const pk = isPick ? Math.min(1, picked) : 0;
          const dim = !isPick ? prog(t, tapAt + 0.1, 0.4, ease.out) : 0;
          return (
            <div key={o.name} style={{ position: "absolute", left: X[i], top: TOP, width: 290, height: 430, boxSizing: "border-box", borderRadius: 32, overflow: "hidden", background: C.surface, border: `${pk > 0.5 ? 4 : 1}px solid ${pk > 0.5 ? C.accent : C.line}`, opacity: Math.min(1, cards[i] * 1.5) * mix(1, 0.45, dim), transform: `translateY(${(1 - Math.min(1, cards[i])) * 140 - pk * 24}px) scale(${mix(0.85, 1, Math.min(1, cards[i])) * (1 + 0.05 * pk)})`, boxShadow: pk > 0 ? `0 40px 90px rgba(0,0,0,0.55), 0 0 ${90 * pk}px rgba(53,224,161,0.3)` : "0 40px 90px rgba(0,0,0,0.55)" }}>
              <div style={{ height: 180, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <House w={210} h={160} />
              </div>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{o.name}</div>
                <div style={{ marginTop: 16, fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", color: C.accent, opacity: Math.min(1, w * 1.5) }}>POR QUÊ</div>
                <div style={{ marginTop: 6, fontWeight: 800, fontSize: 30, lineHeight: 1.15, color: C.text, opacity: Math.min(1, w * 1.5), transform: `translateY(${(1 - Math.min(1, w)) * 16}px)` }}>{o.why}</div>
              </div>
            </div>
          );
        })}
        {/* a pergunta */}
        <div style={{ position: "absolute", left: 130, right: 70, top: 920, display: "flex", justifyContent: "flex-end", opacity: Math.min(1, ask * 1.5), transform: `translateY(${(1 - Math.min(1, ask)) * 60}px)` }}>
          <Bubble tone="green" size={40}>Qual delas faz mais sentido para avançar?</Bubble>
        </div>
        {/* toque de escolha */}
        {move > 0 ? (
          <div style={{ position: "absolute", left: cur.x - 40, top: cur.y - 40, width: 80, height: 80, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 40, background: "rgba(244,245,247,0.9)", transform: `scale(${1 - 0.25 * Math.sin(Math.PI * tap)})`, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", opacity: 1 - prog(t, tapAt + 0.6, 0.4, ease.in) }} />
            {tap > 0 ? <div style={{ position: "absolute", inset: -tap * 60, borderRadius: "50%", border: `4px solid ${C.text}`, opacity: 1 - tap }} /> : null}
          </div>
        ) : null}
        {adv > 0 ? (
          <div style={{ position: "absolute", left: X[PICK], top: TOP - 70, width: 290, display: "flex", justifyContent: "center", opacity: Math.min(1, adv * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, adv))})` }}>
            <Tag text="AVANÇAR ✓" tone="accent" size={26} style={{ background: "rgba(7,40,29,0.95)" }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
