import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { BROKERS, Bubble, IconCal, LEAD, Tag } from "./ui";

/**
 * CENAS 01–02 — GANCHO + SITUAÇÃO (mesmo plano).
 * "O cliente pediu informações uma vez. Recebeu resposta de dois corretores diferentes."
 * Um formulário fictício é enviado UMA vez e se divide em duas conversas paralelas.
 * "Um oferece visita na quinta. Outro fala de condições diferentes na sexta. O comprador não sabe com quem seguir e a equipe também não."
 * Duas agendas incompatíveis lado a lado; a câmera atravessa até a dúvida do comprador e da equipe.
 */
const PANEL = { y: 760, w: 450, h: 470 };
const PX = [70, 560];

const MiniCal: React.FC<{ day: string; hour: string; p: number; tone: string }> = ({ day, hour, p, tone }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 14, padding: "10px 16px", borderRadius: 18, background: C.surface2, border: `2px solid ${tone}`, opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, p))})`, transformOrigin: "0 50%" }}>
    <IconCal size={34} color={tone} />
    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.text }}>{day}</span>
    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{hour}</span>
  </div>
);

export const Split: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const form = sp(t, -0.3, { damping: 15, stiffness: 150 });
  const press = Math.sin(Math.PI * prog(t, c.hook_info + 0.45, 0.25, ease.linear));
  const sent = prog(t, c.hook_info + 0.6, 0.4, ease.out);
  const once = sp(t, c.hook_once - 0.05, { damping: 11, stiffness: 210 });
  const split = prog(t, c.hook_two - 0.1, 0.7, ease.inOut);
  const panels = [0, 1].map((i) => sp(t, c.hook_two + 0.1 + i * 0.12, { damping: 15, stiffness: 150 }));
  const hello = [0, 1].map((i) => sp(t, c.hook_diff + 0.7 + i * 0.2, { damping: 13, stiffness: 180 }));
  const thu = sp(t, c.sit_one, { damping: 14, stiffness: 170 });
  const thuCal = sp(t, c.sit_thu + 0.35, { damping: 11, stiffness: 200 });
  const fri = sp(t, c.sit_other, { damping: 14, stiffness: 170 });
  const friCal = sp(t, c.sit_fri + 0.35, { damping: 11, stiffness: 200 });
  const doubt = sp(t, c.sit_buyer - 0.1, { damping: 13, stiffness: 170 });
  const team = sp(t, c.sit_team - 0.05, { damping: 13, stiffness: 170 });
  const exit = prog(t, c.ten_prob - 0.15, 0.45, ease.in);
  const wob = Math.sin(t * 5) * 6 * Math.min(1, doubt);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.15, y: -130, rx: 8 },
          { t: c.hook_once + 0.3, s: 1.08, y: -100, rx: 0, e: ease.inOut },
          { t: c.hook_two + 0.6, s: 0.98, y: 20, e: ease.inOut },
          { t: c.sit_thu + 0.3, s: 1.06, x: -90, y: 120, e: ease.inOut },
          { t: c.sit_fri + 0.3, s: 1.06, x: 90, y: 120, e: ease.inOut },
          { t: c.sit_buyer + 0.4, s: 1.04, x: 0, y: -40, e: ease.inOut },
          { t: c.sit_team + 0.5, s: 1.0, x: 0, y: -90, e: ease.inOut },
          { t: c.ten_prob + 0.3, s: 0.94, y: 0, e: ease.in },
        ]}
      >
        {/* formulário → comprador */}
        <div style={{ position: "absolute", left: 240, top: 300, width: 600, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${doubt > 0.5 ? C.warn : C.line}`, padding: "26px 30px", opacity: Math.min(1, form * 1.5), transform: `translateY(${(1 - Math.min(1, form)) * 60}px) rotate(${wob * 0.2}deg)`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Avatar size={70} label={LEAD.ini} bg={LEAD.bg} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{LEAD.name}</div>
              <div style={{ fontWeight: 600, fontSize: 22, color: C.muted }}>{doubt > 0.5 ? "com quem seguir?" : "pedido de informação · formulário"}</div>
            </div>
            {doubt > 0 ? <span style={{ fontWeight: 800, fontSize: 80, color: C.warn, lineHeight: 1, transform: `scale(${Math.min(1.1, doubt)})`, display: "inline-block" }}>?</span> : null}
          </div>
          <div style={{ marginTop: 18, height: 64, borderRadius: 18, background: sent > 0.5 ? C.accent : C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30, color: sent > 0.5 ? C.accentInk : C.text, transform: `scale(${1 - 0.07 * press})`, opacity: mix(1, 0, prog(t, c.sit_buyer - 0.2, 0.3, ease.in)) }}>
            {sent > 0.5 ? "enviado ✓" : "Quero mais informações"}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 255, display: "flex", justifyContent: "center", opacity: Math.min(1, once * 1.5) * (1 - prog(t, c.sit_buyer - 0.2, 0.3, ease.in)), transform: `scale(${mix(0.5, 1, Math.min(1.1, once))})` }}>
          <Tag text="1 PEDIDO" tone="accent" size={28} />
        </div>
        {/* divisão em duas conversas */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[0, 1].map((i) => (
            <path key={i} d={`M540 ${560} C 540 660, ${PX[i] + PANEL.w / 2} 640, ${PX[i] + PANEL.w / 2} ${PANEL.y}`} fill="none" stroke={C.warn} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${300 * split} 400`} />
          ))}
        </svg>
        {BROKERS.map((b, i) => {
          const p = panels[i];
          const msg = i === 0 ? thu : fri;
          const cal = i === 0 ? thuCal : friCal;
          return (
            <div key={b.name} style={{ position: "absolute", left: PX[i], top: PANEL.y, width: PANEL.w, height: PANEL.h, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `1px solid ${C.line}`, overflow: "hidden", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 100}px) scale(${mix(0.85, 1, Math.min(1, p))})`, boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
              <div style={{ height: 96, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", background: C.surface2 }}>
                <Avatar size={58} label={b.ini} bg={b.bg} />
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{b.name}</span>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ opacity: Math.min(1, hello[i] * 1.5), transform: `translateY(${(1 - Math.min(1, hello[i])) * 20}px)` }}>
                  <Bubble tone="green" size={28}>Olá, Carla! Recebi seu pedido.</Bubble>
                </div>
                <div style={{ marginTop: 16, opacity: Math.min(1, msg * 1.5), transform: `translateY(${(1 - Math.min(1, msg)) * 20}px)` }}>
                  <Bubble tone="green" size={28}>{i === 0 ? "Podemos visitar na quinta?" : "Tenho outras condições — falamos na sexta?"}</Bubble>
                </div>
                <MiniCal day={i === 0 ? "QUI" : "SEX"} hour={i === 0 ? "10h" : "15h"} p={cal} tone={i === 0 ? C.cold : C.warn} />
              </div>
            </div>
          );
        })}
        {/* e a equipe também não */}
        {team > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: Math.min(1, team * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, team))})` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 24px", borderRadius: 30, background: "rgba(36,14,13,0.95)", border: `2px solid ${C.warn}` }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.warn }}>EQUIPE</span>
              {["#4E6A8C", "#8C6A4E", "#5A7A6E"].map((bg, k) => (
                <Avatar key={k} size={44} label={["A", "B", "G"][k]} bg={bg} />
              ))}
              <span style={{ fontWeight: 800, fontSize: 44, color: C.warn }}>?</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
