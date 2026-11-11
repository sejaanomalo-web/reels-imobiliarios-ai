import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { IconBell } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENA 04b — "…mas diferencia conversa encerrada de conversa acompanhada."
 * Tela dividida: em cima o fio termina (FIM); embaixo o fio segue com os três nós e o lembrete.
 * O painel de baixo vira o quadro de tarefas do CTA.
 */
const TOP = { y: 300, h: 440 };
const BOT = { y: 790, h: 460 };
const NODE_X = [380, 600, 820];
const NODE_L = ["DATA", "ASSUNTO", "EXPECT."];

export const Compare: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const inTop = sp(t, c.ins_diff, { damping: 15, stiffness: 170 });
  const inBot = sp(t, c.ins_diff + 0.12, { damping: 15, stiffness: 170 });
  const drawTop = prog(t, c.ins_diff + 0.1, 0.5, ease.out);
  const drawBot = prog(t, c.ins_diff + 0.2, 0.9, ease.inOut);
  const closed = prog(t, c.ins_closed, 0.3, ease.out);
  const follow = prog(t, c.ins_follow, 0.3, ease.out);
  const flow = (t * 120) % 60;
  const exitTop = prog(t, c.cta_board - 0.05, 0.4, ease.in);
  const toBoard = prog(t, c.cta_board, 0.5, ease.inOut);
  const ring = Math.max(0, 1 - ((t - c.ins_follow) % 1.2) / 1.2) * (t > c.ins_follow ? 1 : 0);

  const panel = (y: number, h: number, s: number, hi: number, tone: string, extra: React.CSSProperties = {}) => ({
    position: "absolute" as const,
    left: 70,
    top: y,
    width: 940,
    height: h,
    boxSizing: "border-box" as const,
    borderRadius: 40,
    background: C.surface,
    border: `3px solid ${hi > 0.5 ? tone : C.line}`,
    boxShadow: `0 40px 90px rgba(0,0,0,0.5), 0 0 ${90 * hi}px ${tone}33`,
    opacity: Math.min(1, s * 1.5),
    transform: `translateX(${(1 - Math.min(1, s)) * (y < 600 ? -900 : 900)}px)`,
    fontFamily: F.sans,
    overflow: "hidden" as const,
    ...extra,
  });

  return (
    <Camera
      drift={0.5}
      t={t}
      keys={[
        { t: c.ins_diff, s: 0.96, y: 0 },
        { t: c.ins_closed - 0.05, s: 1.0, y: -10 },
        { t: c.ins_closed + 0.3, s: 1.05, y: -60, e: ease.out },
        { t: c.ins_follow - 0.05, s: 1.04, y: -50 },
        { t: c.ins_follow + 0.3, s: 1.06, y: 120, e: ease.inOut },
        { t: c.cta_board, s: 1.04, y: 110 },
        { t: c.cta_board + 0.5, s: 1.0, y: 0, e: ease.inOut },
      ]}
    >
      <div style={{ ...panel(TOP.y, TOP.h, inTop, closed, C.warn), opacity: Math.min(1, inTop * 1.5) * mix(1, 0.55, closed * (1 - follow * 0)) * (1 - exitTop) }}>
        <div style={{ position: "absolute", left: 44, top: 40, fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: closed > 0.5 ? C.warn : C.muted }}>CONVERSA ENCERRADA</div>
        <svg width={940} height={440} style={{ position: "absolute", inset: 0 }}>
          <path d={`M70 250H${mix(70, 560, drawTop)}`} stroke={C.muted} strokeWidth={10} strokeLinecap="round" />
          {drawTop > 0.95 ? <circle cx={560} cy={250} r={20} fill={C.surface} stroke={C.warn} strokeWidth={8} /> : null}
          <path d="M600 250H880" stroke={C.surface3} strokeWidth={6} strokeDasharray="4 18" strokeLinecap="round" opacity={drawTop} />
        </svg>
        <div style={{ position: "absolute", left: 500, top: 300, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.warn, opacity: drawTop }}>FIM</div>
        <div style={{ position: "absolute", left: 44, bottom: 40, fontWeight: 700, fontSize: 34, color: C.muted, opacity: drawTop }}>sem próximo passo</div>
      </div>

      <div style={{ ...panel(mix(BOT.y, 250, toBoard), mix(BOT.h, 900, toBoard), inBot, follow, C.accent) }}>
        <div style={{ position: "absolute", left: 44, top: 40, fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: follow > 0.5 ? C.accent : C.muted, opacity: 1 - toBoard }}>CONVERSA ACOMPANHADA</div>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - toBoard }}>
          <svg width={940} height={460} style={{ position: "absolute", inset: 0 }}>
            <path d={`M70 260H${mix(70, 840, drawBot)}`} stroke={C.accent} strokeWidth={10} strokeLinecap="round" />
            <path d={`M70 260H${mix(70, 840, drawBot)}`} stroke={C.accentInk} strokeWidth={4} strokeLinecap="round" strokeDasharray="10 50" strokeDashoffset={-flow} opacity={0.6 * follow} />
            {NODE_X.map((x, k) => (mix(70, 840, drawBot) > x ? <circle key={k} cx={x} cy={260} r={20} fill={C.paper} stroke={C.accent} strokeWidth={8} /> : null))}
          </svg>
          {NODE_X.map((x, k) => (
            <div key={k} style={{ position: "absolute", left: x - 90, width: 180, top: 300, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text, opacity: mix(70, 840, drawBot) > x ? 1 : 0 }}>
              {NODE_L[k]}
            </div>
          ))}
          <div style={{ position: "absolute", left: 830, top: 214, width: 92, height: 92, borderRadius: 30, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", opacity: drawBot > 0.95 ? 1 : 0, rotate: `${Math.sin(t * 24) * 12 * ring}deg` }}>
            <IconBell size={54} color={C.accentInk} stroke={2.2} />
          </div>
          <div style={{ position: "absolute", left: 44, bottom: 40, fontWeight: 700, fontSize: 34, color: C.text, opacity: drawBot }}>próximo passo combinado</div>
        </div>
      </div>
    </Camera>
  );
};
