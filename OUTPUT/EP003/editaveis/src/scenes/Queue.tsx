import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { PEOPLE } from "./people";
import { CARD, STACK_Y } from "./Incoming";
import { Chip, Row } from "./Rows";

/**
 * CENAS 02b → 04. As mesmas cinco faixas atravessam três momentos:
 *  A) tela dividida — "No WhatsApp, tudo parece igualmente urgente": todos ficam URGENTE ao mesmo tempo;
 *  B) fila cronológica — "O erro é responder na ordem em que as mensagens aparecem": a visita cai atrás da pergunta genérica;
 *  C) fila priorizada — "Classifique por etapa e prazo…": combinados primeiro, novos pedidos dentro da capacidade.
 */
const X = 70;
const W = 940;
const H = 136;
const yA = (i: number) => 300 + i * 152;
const CHRONO = ["diego", "elisa", "bruno", "ana", "carla"];
const PRIO = ["bruno", "ana", "diego", "elisa", "carla"];
const yB = (id: string) => 300 + CHRONO.indexOf(id) * 152;
const H1 = 340;
const H2 = 708;
const yC = (id: string) => {
  const k = PRIO.indexOf(id);
  return k < 2 ? 396 + k * 152 : 764 + (k - 2) * 152;
};
const BAR = { x: 100, y: 1240, w: 880, h: 124 };

export const Queue: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const stamps = tl.series.stamps;
  const cap = tl.series.capFill;
  const urgentShake = t > c.sit_urgent ? Math.sin((t - c.sit_urgent) * 60) * 7 * Math.max(0, 1 - (t - c.sit_urgent) / 0.45) : 0;
  const sortStart = c.ins_sort + 0.4;
  const freeze = prog(t, c.ins_sort - 0.05, 0.12, ease.out) * (1 - prog(t, sortStart, 0.25, ease.out));
  const errIn = sp(t, c.ten_err, { damping: 10, stiffness: 240 });
  const errOut = prog(t, c.ten_fall - 0.1, 0.3, ease.in);
  const tagsOut = prog(t, c.ins_sort, 0.3, ease.in);
  const kinE = sp(t, c.ins_etapa, { damping: 12, stiffness: 220 });
  const kinP = sp(t, c.ins_prazo, { damping: 12, stiffness: 220 });
  const kinOut = prog(t, c.ins_first - 0.15, 0.25, ease.in);
  const headers = prog(t, sortStart + 0.35, 0.35, ease.out);
  const barIn = sp(t, c.ins_cap - 0.35, { damping: 16, stiffness: 150 });
  const extra = prog(t, cap[3] - 0.25, 0.3, ease.in);
  const bounce = sp(t, cap[3] + 0.05, { damping: 9, stiffness: 160 });
  const exit = prog(t, c.cta_flow + 0.1, 0.45, ease.in);

  const answering = (() => {
    const s0 = c.ten_fall + 0.6;
    const k = Math.floor((t - s0) / 0.36);
    return t >= s0 && t < c.ten_tag1 + 0.1 ? CHRONO[Math.min(2, k)] : null;
  })();

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        t={t}
        keys={[
          { t: c.sit_split, s: 1.0, y: 30 },
          { t: c.sit_urgent, s: 1.0, y: 30 },
          { t: c.sit_urgent + 0.12, s: 1.06, e: ease.out },
          { t: c.sit_urgent + 0.45, s: 1.0, e: ease.inOut },
          { t: c.ten_err + 0.35, s: 0.86, y: 0, rx: 10, e: ease.out },
          { t: c.ten_fall, s: 0.9, y: -60, rx: 8 },
          { t: c.ten_fall + 0.55, s: 1.16, y: -136, rx: 4, e: ease.inOut },
          { t: c.ten_tag1 - 0.1, s: 1.12, y: -110, rx: 4 },
          { t: c.ten_tag1 + 0.35, s: 0.92, y: 70, rx: 8, e: ease.inOut },
          { t: c.ins_sort, s: 0.92, y: 70, rx: 8 },
          { t: sortStart + 0.5, s: 0.94, y: 0, rx: 0, e: ease.inOut },
          { t: c.ins_first, s: 0.94, y: 0 },
          { t: c.ins_first + 0.4, s: 1.12, y: -360, e: ease.inOut },
          { t: c.ins_then, s: 1.1, y: -340 },
          { t: c.ins_then + 0.4, s: 1.12, y: 90, e: ease.inOut },
          { t: c.cta_flow, s: 1.1, y: 100 },
          { t: c.cta_flow + 0.55, s: 0.62, y: 60, rx: 26, e: ease.in },
        ]}
      >
        {/* "O ERRO: ordem de chegada" */}
        {errIn > 0 && errOut < 1 ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              opacity: Math.min(1, errIn * 2) * (1 - errOut),
              transform: `scale(${mix(1.8, 1, Math.min(1, errIn))}) rotate(${-4 * Math.min(1, errIn)}deg)`,
              fontFamily: F.sans,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 104, color: C.warn, letterSpacing: "-0.04em" }}>ERRO:</span>
            <Chip text="ORDEM DE CHEGADA" tone="warn" style={{ height: 56, fontSize: 26, opacity: prog(t, c.ten_order, 0.2, ease.out) }} />
          </div>
        ) : null}

        {/* cinestesia da virada: ETAPA + PRAZO */}
        {kinE > 0 && kinOut < 1 ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 214,
              display: "flex",
              justifyContent: "center",
              gap: 26,
              fontFamily: F.sans,
              fontWeight: 800,
              fontSize: 96,
              letterSpacing: "-0.045em",
              opacity: 1 - kinOut,
            }}
          >
            <span style={{ color: C.accent, display: "inline-block", transform: `scale(${mix(1.6, 1, Math.min(1, kinE))})`, opacity: Math.min(1, kinE * 2) }}>ETAPA</span>
            <span style={{ color: C.text, display: "inline-block", transform: `scale(${mix(1.6, 1, Math.min(1, kinP))})`, opacity: Math.min(1, kinP * 2) }}>+ PRAZO</span>
          </div>
        ) : null}

        {/* cabeçalhos dos grupos */}
        {headers > 0 ? (
          <>
            {[
              { y: H1, text: "1 · CUMPRA O COMBINADO", tone: C.accent },
              { y: H2, text: "2 · NOVOS PEDIDOS", tone: C.muted },
            ].map((h, k) => (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: X + 8,
                  top: h.y,
                  fontFamily: F.mono,
                  fontWeight: 700,
                  fontSize: 26,
                  letterSpacing: "0.1em",
                  color: h.tone,
                  opacity: headers,
                  transform: `translateX(${(1 - headers) * -40}px)`,
                }}
              >
                {h.text}
              </div>
            ))}
          </>
        ) : null}

        {/* as cinco faixas */}
        {PEOPLE.map((p, i) => {
          const isNew = i >= 3;
          const inA = isNew ? sp(t, c.sit_split + 0.1 + (i - 3) * 0.1, { damping: 15, stiffness: 160 }) : 1;
          const morph = isNew ? 1 : prog(t, c.sit_split, 0.45, ease.inOut);
          const pB = prog(t, c.ten_fall + (p.id === "ana" ? 0 : 0.08 * CHRONO.indexOf(p.id)), p.id === "ana" ? 0.65 : 0.45, ease.inOut);
          const pC = prog(t, sortStart + 0.06 * PRIO.indexOf(p.id), 0.6, ease.inOut);
          const baseY = isNew ? yA(i) : mix(STACK_Y[i], yA(i), morph);
          const y = mix(mix(baseY, yB(p.id), pB), yC(p.id), pC);
          const h = isNew ? H : mix(CARD.h, H, morph);
          const x = isNew ? X + (1 - Math.min(1, inA)) * (i === 3 ? 1100 : -1100) : mix(CARD.x, X, morph);
          const w = isNew ? W : mix(CARD.w, W, morph);
          const lift = p.id === "ana" ? Math.sin(Math.PI * pB) : 0;
          const urgent = sp(t, c.sit_urgent, { damping: 9, stiffness: 260 });
          const neutral = prog(t, sortStart + 0.5 + 0.12 * PRIO.indexOf(p.id), 0.2, ease.out);
          const tags = [prog(t, c.ins_etapa - 0.05 + 0.05 * PRIO.indexOf(p.id), 0.25, ease.out), prog(t, c.ins_prazo - 0.05 + 0.05 * PRIO.indexOf(p.id), 0.25, ease.out)];
          const stampAt = stamps[CHRONO.indexOf(p.id)];
          const done = p.group === "combinado" ? prog(t, c.ins_done + (p.id === "ana" ? 0.18 : 0), 0.45, ease.inOut) : 0;
          const late = p.id === "ana" ? prog(t, c.ten_fall + 0.4, 0.3, ease.out) * (1 - prog(t, sortStart, 0.3, ease.out)) : 0;
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: x + urgentShake,
                top: y,
                width: w,
                zIndex: p.id === "ana" ? 3 : 1,
                opacity: Math.min(1, inA * 1.6),
                transform: `scale(${1 + 0.05 * lift}) rotate(${lift * 2}deg)`,
              }}
            >
              <Row
                p={p}
                h={h}
                urgent={urgent}
                neutral={neutral}
                tags={tags}
                showTime={prog(t, stampAt, 0.18, ease.out)}
                done={done}
                highlight={answering === p.id ? 1 : 0}
                late={late}
              />
              {answering === p.id ? (
                <div style={{ position: "absolute", left: -34, top: h / 2 - 16, width: 0, height: 0, borderTop: "16px solid transparent", borderBottom: "16px solid transparent", borderLeft: `22px solid ${C.text}` }} />
              ) : null}
            </div>
          );
        })}

        {/* o que a ordem de chegada ignora */}
        {t > c.ten_tag1 - 0.1 && tagsOut < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", gap: 18, opacity: 1 - tagsOut }}>
            {[
              { at: c.ten_tag1, text: "COMPROMISSO" },
              { at: c.ten_tag2, text: "PRAZO" },
              { at: c.ten_tag3, text: "PRÓXIMO PASSO" },
            ].map((g, k) => {
              const s = sp(t, g.at, { damping: 10, stiffness: 240 });
              return (
                <div
                  key={k}
                  style={{
                    height: 76,
                    padding: "0 22px",
                    borderRadius: 20,
                    border: `3px dashed ${C.warn}`,
                    background: "rgba(255,107,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: F.mono,
                    fontWeight: 700,
                    fontSize: 27,
                    letterSpacing: "0.04em",
                    color: C.warn,
                    opacity: Math.min(1, s * 2),
                    transform: `translateY(${(1 - Math.min(1, s)) * 40}px) scale(${mix(1.4, 1, Math.min(1, s))})`,
                  }}
                >
                  ✕ {g.text}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* capacidade: não prometer o que não cabe */}
        {barIn > 0 ? (
          <div
            style={{
              position: "absolute",
              left: BAR.x,
              top: BAR.y,
              width: BAR.w,
              height: BAR.h,
              boxSizing: "border-box",
              borderRadius: 28,
              background: C.surface2,
              border: `2px solid ${C.line}`,
              padding: "16px 22px",
              opacity: Math.min(1, barIn * 1.5) * (1 - prog(t, c.cta_flow, 0.3, ease.in)),
              transform: `translateY(${(1 - Math.min(1, barIn)) * 80}px)`,
              fontFamily: F.sans,
            }}
          >
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", color: C.muted }}>CAPACIDADE DA SEMANA</div>
            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              {[3, 4, 2].map((pi, k) => {
                const f = sp(t, cap[k], { damping: 12, stiffness: 230 });
                return (
                  <div key={k} style={{ flex: 1, height: 52, borderRadius: 16, border: `2px dashed ${C.surface3}`, position: "relative", overflow: "hidden" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 14,
                        background: "rgba(53,224,161,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        paddingLeft: 10,
                        opacity: Math.min(1, f * 2),
                        transform: `translateY(${(1 - Math.min(1, f)) * -50}px)`,
                      }}
                    >
                      <Avatar size={36} label={PEOPLE[pi].ini} bg={PEOPLE[pi].bg} />
                      <span style={{ fontWeight: 700, fontSize: 22, color: C.text }}>{PEOPLE[pi].name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {t > cap[3] - 0.3 ? (
          <div
            style={{
              position: "absolute",
              left: 520,
              top: BAR.y - 70 + extra * 40 - Math.min(1, bounce) * 40,
              opacity: 1 - prog(t, c.cta_flow, 0.3, ease.in),
              transform: `translateX(${Math.min(1, bounce) * 60}px) rotate(${Math.min(1, bounce) * 8}deg)`,
            }}
          >
            <Chip text={bounce > 0.4 ? "NÃO CABE → REAGENDAR" : "+1 PROMESSA"} tone={bounce > 0.4 ? "warn" : "paper"} style={{ height: 52, fontSize: 22 }} />
          </div>
        ) : null}
      </Camera>
      {/* respiro antes da virada */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,6,8,0.55)", opacity: freeze, pointerEvents: "none" }} />
    </div>
  );
};
