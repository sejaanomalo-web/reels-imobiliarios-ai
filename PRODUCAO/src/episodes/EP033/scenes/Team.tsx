import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { INITIALS, TEAM, Tag } from "./ui";

/**
 * CENAS 01–03 — GANCHO + SITUAÇÃO + TENSÃO (a mesma equipe ilustrativa, um único plano).
 * "Contratar mais corretores não resolve um processo que ninguém entende." — um avatar vira oito; fios de comunicação se
 * cruzam e embaraçam.
 * "Com duas pessoas, as informações talvez caibam na conversa do escritório. Com oito, começam as dúvidas sobre imóveis,
 * leads, visitas e responsáveis." — a equipe volta a ser dois numa conversa; depois o escritório cresce para oito mesas e as
 * dúvidas pipocam.
 * "Quando o trabalho depende de alguém explicar tudo de memória, o crescimento amplia a desorganização que já existia." —
 * uma pessoa no centro explica tudo; os balões se multiplicam até a tela perder o foco.
 */
const CX = 540;
const CY = 780;
const R = 300;
const ring = (i: number) => ({ x: CX + R * Math.cos((i / 8) * Math.PI * 2 - Math.PI / 2), y: CY + R * Math.sin((i / 8) * Math.PI * 2 - Math.PI / 2) });
const desk = (i: number) => ({ x: 180 + (i % 4) * 240, y: 560 + Math.floor(i / 4) * 360 });
const QUESTIONS = [
  { who: 2, q: "qual imóvel?", cue: "sit_props" },
  { who: 4, q: "de quem é esse lead?", cue: "sit_leads" },
  { who: 3, q: "visita confirmada?", cue: "sit_visits" },
  { who: 7, q: "quem é o responsável?", cue: "sit_owners" },
];
const BALLOONS = ["é assim que faz…", "pergunta pra A", "depende do caso", "como era mesmo?", "eu te explico depois", "lembra daquele lead?", "não tá anotado", "já te falei"];

export const Team: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const out = sp(t, c.hook_hire, { damping: 14, stiffness: 120 });
  const wires = prog(t, c.hook_more - 0.1, (c.hook_noone - c.hook_more) + 0.6, ease.inOut);
  const knot = sp(t, c.hook_noone + 0.2, { damping: 11, stiffness: 200 });
  const two = prog(t, c.sit_two - 0.1, 0.8, ease.inOut);
  const talk = sp(t, c.sit_talk - 0.1, { damping: 14, stiffness: 170 });
  const eight = prog(t, c.sit_eight - 0.1, 0.8, ease.inOut);
  const ten = prog(t, c.ten_work - 0.1, 0.8, ease.inOut);
  const blur = prog(t, c.ten_mess - 0.2, 1.0, ease.in);
  const exit = prog(t, c.ins_before - 0.15, 0.45, ease.in);

  const pos = (i: number) => {
    const r = ring(i);
    let x = mix(CX, r.x, Math.min(1, out));
    let y = mix(CY, r.y, Math.min(1, out));
    const twoT = i === 0 ? { x: 360, y: 780 } : i === 1 ? { x: 720, y: 780 } : r;
    x = mix(x, twoT.x, two);
    y = mix(y, twoT.y, two);
    const d = desk(i);
    x = mix(x, d.x, eight);
    y = mix(y, d.y, eight);
    if (i === 0) {
      x = mix(x, CX, ten);
      y = mix(y, 740, ten);
    }
    return { x, y };
  };
  const visible = (i: number) => (i === 0 ? 1 : Math.min(1, out * 2) * mix(1, i === 1 ? 1 : 0, two * (1 - eight)));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.35, y: 0 },
          { t: c.hook_more + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.hook_noone + 0.6, s: 1.06, y: 0, r: -1.5, e: ease.inOut },
          { t: c.sit_talk + 0.4, s: 1.1, y: 0, r: 0, e: ease.inOut },
          { t: c.sit_eight + 0.5, s: 0.94, y: -20, x: -40, e: ease.inOut },
          { t: c.sit_owners + 0.6, s: 1.06, y: 10, x: 40, e: ease.inOut },
          { t: c.ten_explain + 0.3, s: 1.08, y: -40, e: ease.inOut },
          { t: c.ins_before + 0.3, s: 0.94, y: 0, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, filter: blur > 0.02 ? `blur(${blur * 7}px)` : undefined, opacity: mix(1, 0.6, blur) }}>
          {/* fios de comunicação */}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: (1 - two) + eight * 0.55 }}>
            {Array.from({ length: 8 }).flatMap((_, i) =>
              Array.from({ length: 8 }).map((__, j) => {
                if (j <= i) return null;
                const a = pos(i);
                const b = pos(j);
                const k = i * 8 + j;
                const p = Math.max(0, Math.min(1, wires * 1.4 - (k % 7) * 0.06));
                const bend = ((k % 5) - 2) * 120;
                const flowing = p >= 1;
                return <path key={k} d={`M${a.x} ${a.y} Q ${(a.x + b.x) / 2 + bend} ${(a.y + b.y) / 2 - bend}, ${b.x} ${b.y}`} fill="none" stroke={[C.warn, C.cold, "#C3C8D0"][k % 3]} strokeWidth={3} opacity={0.6} strokeDasharray={flowing ? "18 14" : `${900 * p} 1000`} strokeDashoffset={flowing ? -t * (60 + (k % 4) * 25) * (k % 2 ? 1 : -1) : 0} />;
              }),
            )}
          </svg>
          {/* conversa de dois */}
          {talk > 0 && eight < 1 ? (
            <div style={{ position: "absolute", left: 400, top: 650, width: 280, display: "flex", justifyContent: "center", opacity: Math.min(1, talk * 1.5) * (1 - eight) }}>
              <div style={{ padding: "14px 20px", borderRadius: 24, background: "#0E3A1F", border: "2px solid rgba(58,245,132,0.5)", fontWeight: 800, fontSize: 26, color: C.text, textAlign: "center" }}>imóvel · lead · visita ✓</div>
            </div>
          ) : null}
          {two > 0.5 && eight < 0.6
            ? [0, 1, 2].map((k) => {
                const ph = ((t * 0.9 + k / 3) % 1);
                const dir = k % 2 ? 1 : -1;
                const x = dir > 0 ? mix(400, 680, ph) : mix(680, 400, ph);
                return <div key={k} style={{ position: "absolute", left: x - 14, top: 830 + Math.sin(ph * Math.PI) * -60, width: 28, height: 20, borderRadius: 6, background: C.accent, opacity: Math.sin(ph * Math.PI) * (1 - eight) }} />;
              })
            : null}
          {/* post-its e mensagens que não acompanham o ritmo */}
          {eight > 0.3 && ten < 1
            ? Array.from({ length: 9 }).map((_, k) => {
                const sp0 = 0.35 + (k % 4) * 0.12;
                const ph = ((t - c.sit_eight) * sp0 + k * 0.17) % 1.4;
                const y0 = 470 + (k * 97) % 560;
                return (
                  <div key={k} style={{ position: "absolute", left: mix(-120, 1140, ph / 1.4), top: y0 + Math.sin(t * 2 + k) * 20, width: k % 3 ? 90 : 70, height: k % 3 ? 60 : 70, borderRadius: k % 3 ? 14 : 6, background: k % 3 ? "rgba(143,180,227,0.85)" : "#E8D27A", opacity: 0.75 * Math.min(1, (eight - 0.3) * 2) * (1 - ten), transform: `rotate(${(k % 5 - 2) * 8 + Math.sin(t * 3 + k) * 6}deg)`, boxShadow: "0 10px 24px rgba(0,0,0,0.4)" }} />
                );
              })
            : null}
          {/* mesas do escritório */}
          {eight > 0
            ? Array.from({ length: 8 }).map((_, i) => {
                const d = desk(i);
                return <div key={i} style={{ position: "absolute", left: d.x - 95, top: d.y + 50, width: 190, height: 60, borderRadius: 14, background: C.surface2, border: `1px solid ${C.line}`, opacity: eight * (i === 0 ? 1 - ten : 1) }} />;
              })
            : null}
          {/* equipe */}
          {Array.from({ length: 8 }).map((_, i) => {
            const p = pos(i);
            const v = visible(i);
            if (v <= 0.01) return null;
            const big = i === 0 ? mix(mix(120, 96, Math.min(1, out)), 130, ten) : 96;
            return (
              <div key={i} style={{ position: "absolute", left: p.x - big / 2, top: p.y - big / 2 + Math.sin(t * 2.2 + i * 1.3) * 7, opacity: v * (ten > 0 && i !== 0 ? mix(1, 0.5, ten) : 1), transform: `scale(${i === 0 ? 1 : mix(0.4, 1, Math.min(1, out))})` }}>
                <Avatar size={big} label={INITIALS[i]} bg={TEAM[i]} ring={i === 0 && ten > 0.5 ? C.accent : undefined} />
              </div>
            );
          })}
          {/* dúvidas */}
          {QUESTIONS.map((q) => {
            const a = sp(t, c[q.cue] - 0.05, { damping: 12, stiffness: 200 });
            if (a <= 0) return null;
            const d = desk(q.who);
            return (
              <div key={q.q} style={{ position: "absolute", left: Math.min(1080 - 360, Math.max(40, d.x - 150)), top: d.y - 140, opacity: Math.min(1, a * 1.5) * (1 - ten), transform: `scale(${mix(0.5, 1, Math.min(1.08, a))})`, transformOrigin: "50% 100%" }}>
                <div style={{ padding: "12px 20px", borderRadius: 22, borderBottomLeftRadius: 6, background: "rgba(36,14,13,0.95)", border: `2px solid ${C.warn}`, fontWeight: 800, fontSize: 28, color: C.text, whiteSpace: "nowrap" }}>{q.q}</div>
              </div>
            );
          })}
          {/* explicando tudo de memória */}
          {BALLOONS.map((b, i) => {
            const a = sp(t, mix(c.ten_explain, c.ten_grow, i / BALLOONS.length), { damping: 13, stiffness: 190 });
            if (a <= 0) return null;
            const ang = (i / BALLOONS.length) * Math.PI * 2 - Math.PI / 2;
            const rr = mix(120, 300, Math.min(1, a));
            return (
              <div key={b} style={{ position: "absolute", left: CX + Math.cos(ang) * rr * 1.25 - 140, top: 740 + Math.sin(ang) * rr - 30, width: 280, display: "flex", justifyContent: "center", opacity: Math.min(1, a * 1.5) }}>
                <div style={{ padding: "10px 18px", borderRadius: 20, background: C.surface2, border: `1px solid ${C.line}`, fontWeight: 700, fontSize: 26, color: "#C3C8D0", whiteSpace: "nowrap", boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}>“{b}”</div>
              </div>
            );
          })}
        </div>
        {/* nó / rótulos */}
        {knot > 0 && two < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: Math.min(1, knot * 1.5) * (1 - two) }}>
            <Tag text="PROCESSO QUE NINGUÉM ENTENDE" tone="warn" size={28} />
          </div>
        ) : null}
        {ten > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: ten }}>
            <Tag text="TUDO DE MEMÓRIA" tone="warn" size={28} />
          </div>
        ) : null}
        {blur > 0.3 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: prog(t, c.ten_mess + 0.2, 0.4, ease.out) }}>
            <div style={{ padding: "16px 34px", borderRadius: 30, background: "rgba(36,14,13,0.96)", border: `3px solid ${C.warn}`, fontWeight: 800, fontSize: 46, color: C.warn }}>crescer amplia a desorganização</div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
