import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, IconBell, IconCheck } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 04 — INSIGHT. O excesso some. O rótulo FRIO (o julgamento) é riscado e dá lugar a uma pergunta,
 * que aparece palavra por palavra no tempo da fala (a legenda desse trecho fica oculta para não duplicar).
 * A resposta do cliente é registrada e vira o primeiro ponto de uma linha do tempo com o retorno combinado.
 */
const Q = { x: 90, y: 470, w: 900, h: 470 };
const LINE_Y = 900;
const NODES = [290, 790];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const words = tl.captions.filter((k) => k.seg === "s7").flatMap((k) => k.words);
  const judge = sp(t, c.ins_judge, { damping: 14, stiffness: 160 });
  const strike = prog(t, c.ins_question - 0.1, 0.32, ease.out);
  const judgeAway = prog(t, c.ins_question + 0.35, 0.45, ease.in);
  const card = sp(t, c.ins_question, { damping: 16, stiffness: 130 });
  const answer = sp(t, c.ins_answer, { damping: 15, stiffness: 150 });
  const stamp = sp(t, c.ins_answer + 0.55, { damping: 9, stiffness: 240 });
  const tlp = prog(t, c.ins_timeline, 0.7, ease.inOut);
  const node1 = sp(t, c.ins_timeline + 0.15, { damping: 15, stiffness: 160 });
  const lineP = prog(t, c.ins_timeline + 0.35, 0.65, ease.inOut);
  const node2 = sp(t, c.ins_timeline + 0.9, { damping: 14, stiffness: 170 });
  const ring = Math.max(0, 1 - (t - c.ins_return) / 0.9) * (t >= c.ins_return ? 1 : 0);
  const glow = prog(t, c.ins_return, 0.4, ease.out);
  const exit = prog(t, c.cta_dock - 0.05, 0.5, ease.in);
  const lastWord = words.length ? words[words.length - 1].end : c.ins_answer;
  const caret = t < lastWord + 0.2 && Math.floor(t * 2.4) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit, transform: `translateY(${exit * 70}px)` }}>
      {/* o julgamento: FRIO, riscado */}
      {judge > 0 && judgeAway < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 300,
            display: "flex",
            justifyContent: "center",
            opacity: Math.min(1, judge * 1.5) * (1 - judgeAway),
            transform: `translateY(${judgeAway * -80}px) scale(${mix(0.7, 1, judge) * mix(1, 0.8, judgeAway)})`,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "18px 56px",
              borderRadius: 999,
              background: C.coldDeep,
              border: "3px solid rgba(143,180,227,0.5)",
              color: C.cold,
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            FRIO
            <div
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                height: 10,
                marginTop: -5,
                width: `calc(${strike} * (100% - 40px))`,
                borderRadius: 5,
                background: C.warn,
                rotate: "-4deg",
              }}
            />
          </div>
        </div>
      ) : null}

      {/* a pergunta */}
      {card > 0 ? (
        <div
          style={{
            position: "absolute",
            left: Q.x,
            top: Q.y,
            width: Q.w,
            height: Q.h,
            boxSizing: "border-box",
            borderRadius: 44,
            background: C.paper,
            padding: "44px 54px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
            opacity: Math.min(1, card * 1.5),
            transformOrigin: "50% 0%",
            transform: `translateY(${(1 - card) * 120 + tlp * -170}px) scale(${mix(0.86, 1, card) * mix(1, 0.62, tlp)})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: C.ink,
                color: C.paper,
                fontWeight: 800,
                fontSize: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ?
            </div>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.14em", color: C.inkMuted }}>
              EM VEZ DE JULGAR, PERGUNTE
            </span>
          </div>
          <div
            style={{
              marginTop: 34,
              fontWeight: 800,
              fontSize: 80,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: C.ink,
            }}
          >
            {words.map((w, i) => {
              const a = prog(t, w.start - 0.04, 0.16, ease.out);
              const text = i === 0 ? w.text.charAt(0).toUpperCase() + w.text.slice(1) : w.text;
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    marginRight: 20,
                    opacity: a,
                    transform: `translateY(${(1 - a) * 24}px)`,
                    color: w.emph ? "#0E7A55" : C.ink,
                  }}
                >
                  {text}
                </span>
              );
            })}
            <span style={{ display: "inline-block", width: 6, height: 74, background: C.ink, opacity: caret ? 0.8 : 0, verticalAlign: "-8px" }} />
          </div>
        </div>
      ) : null}

      {/* a resposta, registrada */}
      {answer > 0 && tlp < 1 ? (
        <div
          style={{
            position: "absolute",
            left: Q.x,
            top: 980,
            width: Q.w,
            height: 160,
            boxSizing: "border-box",
            borderRadius: 36,
            borderTopLeftRadius: 12,
            background: C.surface2,
            border: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "0 32px",
            opacity: Math.min(1, answer * 1.5) * (1 - tlp),
            transform: `translate(${tlp * -120}px, ${(1 - answer) * 50 + tlp * -230}px) scale(${mix(1, 0.5, tlp)})`,
          }}
        >
          <Avatar size={80} label="MT" bg="#4A5F7A" />
          <div style={{ flex: 1, fontWeight: 700, fontSize: 36, lineHeight: 1.2, color: C.text }}>
            “Primeiro preciso vender meu apartamento.”
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 16,
              background: C.accent,
              color: C.accentInk,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.06em",
              opacity: Math.min(1, stamp * 2),
              transform: `scale(${mix(1.6, 1, Math.min(1, stamp))}) rotate(${(1 - Math.min(1, stamp)) * -8}deg)`,
            }}
          >
            <IconCheck size={24} />
            REGISTRADO
          </div>
        </div>
      ) : null}

      {/* linha do tempo: resposta hoje → retorno combinado */}
      {node1 > 0 ? (
        <>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <path d={`M${NODES[0]} ${LINE_Y}H${NODES[1]}`} stroke={C.surface3} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 14" />
            <path d={`M${NODES[0]} ${LINE_Y}H${mix(NODES[0], NODES[1], lineP)}`} stroke={C.accent} strokeWidth={6} strokeLinecap="round" />
            {[0, 1].map((k) => {
              const s = k === 0 ? node1 : node2;
              return s > 0 ? (
                <circle key={k} cx={NODES[k]} cy={LINE_Y} r={16 * Math.min(1.1, s)} fill={k === 1 && glow > 0.5 ? C.accent : C.text} stroke={C.bg0} strokeWidth={6} />
              ) : null;
            })}
            {ring > 0 ? <circle cx={NODES[1]} cy={LINE_Y} r={16 + (1 - ring) * 60} fill="none" stroke={C.accent} strokeWidth={4} opacity={ring * 0.7} /> : null}
          </svg>
          {[
            { k: 0, s: node1, label: "RESPOSTA", value: "Vender o apê atual primeiro", when: "HOJE" },
            { k: 1, s: node2, label: "PRÓXIMO PASSO", value: "Retomar a conversa", when: "EM 15 DIAS" },
          ].map(({ k, s, label, value, when }) =>
            s > 0 ? (
              <React.Fragment key={k}>
                <div
                  style={{
                    position: "absolute",
                    left: NODES[k] - 200,
                    top: 620,
                    width: 400,
                    height: 220,
                    boxSizing: "border-box",
                    borderRadius: 32,
                    background: k === 0 ? C.surface2 : "#123A2D",
                    border: `2px solid ${k === 1 ? `rgba(53,224,161,${0.3 + 0.5 * glow})` : C.line}`,
                    padding: "28px 30px",
                    opacity: Math.min(1, s * 1.5),
                    transform: `translateY(${(1 - Math.min(1, s)) * 50}px) scale(${mix(0.85, 1, Math.min(1, s))})`,
                    boxShadow: `0 30px 70px rgba(0,0,0,0.5), 0 0 ${80 * glow * k}px rgba(53,224,161,0.3)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 21, letterSpacing: "0.1em", color: k === 1 ? C.accent : C.muted }}>
                      {label}
                    </span>
                    {k === 1 ? (
                      <div style={{ rotate: `${Math.sin((t - c.ins_return) * 28) * 16 * ring}deg`, transformOrigin: "50% 10%" }}>
                        <IconBell size={40} color={C.accent} stroke={2.2} />
                      </div>
                    ) : (
                      <IconCheck size={36} color={C.accent} stroke={3} />
                    )}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 38, lineHeight: 1.12, letterSpacing: "-0.025em", color: C.text, marginTop: 14 }}>
                    {value}
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: NODES[k] - 150,
                    width: 300,
                    top: LINE_Y + 34,
                    textAlign: "center",
                    fontFamily: F.mono,
                    fontWeight: 700,
                    fontSize: 26,
                    letterSpacing: "0.12em",
                    color: k === 1 ? C.accent : C.muted,
                    opacity: Math.min(1, s * 1.5),
                  }}
                >
                  {when}
                </div>
              </React.Fragment>
            ) : null,
          )}
        </>
      ) : null}
    </div>
  );
};
