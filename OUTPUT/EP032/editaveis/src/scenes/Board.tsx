import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, Tag } from "./ui";

/**
 * CENAS 01–02 — GANCHO + SITUAÇÃO.
 * "Sua equipe tem muitos leads. Mas você sabe quais receberam retorno?" — o quadro de oportunidades se enche de leads
 * (fictícios); alguns têm o ícone de retorno, outros ficam vazios e pulsam.
 * "Na reunião, todo mundo diz que está atendendo. Só que atividade e avanço comercial não são a mesma coisa." — falas
 * genéricas surgem sobre o quadro e se dissolvem diante de registros vazios; ATIVIDADE ≠ AVANÇO.
 */
const COLS = 4;
const ROWS = 5;
const CW = 214;
const CH = 120;
const GX = 70;
const GY = 380;
const N = COLS * ROWS;
const HAS = Array.from({ length: N }).map((_, i) => rnd(i * 4.3 + 1) > 0.42);

export const Board: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const fill = (i: number) => (i < 8 ? -1 + i * 0.08 : mix(0.15, c.hook_know - 0.3, Math.pow((i - 8) / (N - 9), 0.9)));
  const ask = sp(t, c.hook_know - 0.1, { damping: 13, stiffness: 180 });
  const flag = prog(t, c.hook_ret - 0.1, 0.5, ease.out);
  const meet = prog(t, c.sit_meet - 0.1, 0.6, ease.inOut);
  const voices = [0, 1, 2].map((i) => sp(t, c.sit_all + i * 0.3, { damping: 13, stiffness: 190 }));
  const dissolve = prog(t, c.sit_act - 0.1, 0.9, ease.inOut);
  const neq = sp(t, c.sit_adv, { damping: 13, stiffness: 180 });
  const strike = prog(t, c.sit_same + 0.2, 0.5, ease.out);
  const exit = prog(t, c.ten_follow - 0.15, 0.45, ease.in);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const total = Array.from({ length: N }).filter((_, i) => t > fill(i)).length;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.07, y: -20, rx: 10 },
          { t: c.hook_know, s: 1.02, y: 30, rx: 2, e: ease.inOut },
          { t: c.hook_ret + 0.5, s: 1.06, y: 60, e: ease.inOut },
          { t: c.sit_atend + 0.4, s: 1.0, y: -40, e: ease.inOut },
          { t: c.sit_same + 0.6, s: 1.06, y: 40, e: ease.inOut },
          { t: c.ten_follow + 0.3, s: 0.96, y: 0, e: ease.in },
        ]}
      >
        {/* contador */}
        <div style={{ position: "absolute", left: GX, top: 290, display: "flex", alignItems: "baseline", gap: 14, opacity: mix(1, 0.4, meet) }}>
          <span style={{ fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: C.text, fontVariantNumeric: "tabular-nums" }}>{total}</span>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted }}>LEADS DA EQUIPE</span>
        </div>
        {/* quadro de oportunidades */}
        {Array.from({ length: N }).map((_, i) => {
          const a = sp(t, fill(i), { damping: 12, stiffness: 210 });
          if (a <= 0) return null;
          const x = GX + (i % COLS) * (CW + 18);
          const y = GY + Math.floor(i / COLS) * (CH + 16);
          const no = !HAS[i];
          const empty = no ? flag : 0;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: CW, height: CH, boxSizing: "border-box", borderRadius: 22, background: C.surface, border: `2px solid ${empty > 0.5 ? `rgba(255,107,94,${0.4 + 0.5 * pulse})` : C.line}`, padding: "16px 16px", opacity: Math.min(1, a * 1.5) * mix(1, 0.35, meet * (1 - dissolve * 0.6)), transform: `scale(${mix(0.5, 1, Math.min(1, a))})`, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar size={44} label={"ABCDEFGHJKLMNPRSTUVW"[i]} bg={["#4E6A8C", "#8C6A4E", "#5A7A6E", "#6A5A8C"][i % 4]} />
              <div style={{ flex: 1 }}>
                <div style={{ width: 90, height: 12, borderRadius: 6, background: C.surface3 }} />
                <div style={{ width: 60, height: 10, borderRadius: 5, background: C.surface2, marginTop: 10 }} />
              </div>
              {HAS[i] ? <Mark ok size={38} /> : <div style={{ width: 38, height: 38, borderRadius: 19, border: `3px dashed ${empty > 0.5 ? C.warn : C.dim}` }} />}
            </div>
          );
        })}
        {/* quais receberam retorno? */}
        {ask > 0 && meet < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1100, display: "flex", justifyContent: "center", opacity: Math.min(1, ask * 1.5) * (1 - meet), transform: `scale(${mix(0.6, 1, Math.min(1, ask))})` }}>
            <div style={{ padding: "18px 36px", borderRadius: 32, background: "rgba(36,14,13,0.95)", border: `3px solid ${C.warn}`, fontWeight: 800, fontSize: 52, color: C.text }}>
              quais receberam <span style={{ color: C.warn }}>retorno?</span>
            </div>
          </div>
        ) : null}
        {/* reunião: falas genéricas */}
        {meet > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", opacity: meet * (1 - dissolve) }}>
              <Tag text="REUNIÃO DE EQUIPE" tone="muted" size={26} />
            </div>
            {["ESTOU VENDO", "TÔ ATENDENDO", "ESTÁ ANDANDO"].map((v, i) => {
              const p = voices[i];
              const d = prog(dissolve, i * 0.15, 0.7, ease.in);
              return (
                <div key={v} style={{ position: "absolute", left: [90, 380, 640][i], top: [470, 640, 500][i], display: "flex", alignItems: "flex-end", gap: 12, opacity: Math.min(1, p * 1.5) * (1 - d), filter: d > 0.02 ? `blur(${d * 14}px)` : undefined, transform: `translateY(${(1 - Math.min(1, p)) * 40 - d * 60}px) scale(${1 + d * 0.2})` }}>
                  <Avatar size={64} label={["A", "B", "C"][i]} bg={["#4E6A8C", "#8C6A4E", "#5A7A6E"][i]} />
                  <div style={{ padding: "16px 22px", borderRadius: 26, borderBottomLeftRadius: 8, background: C.surface2, border: `1px solid ${C.line}`, fontWeight: 800, fontSize: 34, color: C.text, whiteSpace: "nowrap", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>“{v}”</div>
                </div>
              );
            })}
            {/* atividade ≠ avanço */}
            {neq > 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", alignItems: "center", gap: 30, opacity: Math.min(1, neq * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, neq))})` }}>
                <div style={{ padding: "18px 30px", borderRadius: 28, background: C.surface, border: `2px solid ${C.cold}`, textAlign: "center" }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.cold }}>ATIVIDADE</div>
                  <div style={{ fontWeight: 800, fontSize: 30, color: C.text, marginTop: 6 }}>mensagens, ligações</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 90, color: C.warn, opacity: strike }}>≠</span>
                <div style={{ padding: "18px 30px", borderRadius: 28, background: C.surface, border: `2px solid ${C.accent}`, textAlign: "center" }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.accent }}>AVANÇO</div>
                  <div style={{ fontWeight: 800, fontSize: 30, color: C.text, marginTop: 6 }}>próxima etapa</div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
