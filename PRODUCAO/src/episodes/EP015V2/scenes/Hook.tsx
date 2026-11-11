import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENA 01 — GANCHO. "Uma conversa boa pode não gerar venda. Mas não deveria terminar sem um próximo passo claro."
 * O cliente fecha a conversa com "Obrigado." — o ponto final cresce até ocupar a tela e vira "?".
 * Em "claro" a câmera mergulha no "?" e o fio da conversa começa.
 */
const LETTERS = "Obrigado".split("");

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const grow = prog(t, c.hook_dot, c.hook_q - c.hook_dot, (x) => ease.inOut(x) ** 1.3);
  const toQ = sp(t, c.hook_q, { damping: 11, stiffness: 200 });
  const pulse = 1 + 0.06 * Math.sin(Math.max(0, t - c.hook_clear) * 16) * Math.max(0, 1 - (t - c.hook_clear) / 0.6);
  const bubbleOut = prog(t, c.hook_dot + 0.3, 0.6, ease.in);
  const dotSize = mix(26, 560, grow);
  // o ponto nasce no fim de "Obrigado" e migra para o centro enquanto cresce
  const dotX = mix(852, 540, ease.inOut(Math.min(1, grow * 1.2)));
  const dotY = mix(836, 900, grow);

  return (
    <Camera
      drift={0.5}
      t={t}
      keys={[
        { t: 0, s: 1.3, r: -3, x: 0, y: -40 },
        { t: 0.9, s: 1.16, r: -1, x: 0, y: -30, e: ease.out },
        { t: c.hook_dot, s: 1.1, r: 0, x: 0 },
        { t: c.hook_q, s: 0.94, r: 0, x: 0, y: 0, e: ease.inOut },
        { t: c.hook_clear, s: 1.0 },
        { t: c.sit_line + 0.15, s: 3.0, y: -60, e: ease.inOut },
      ]}
      blurMax={6}
    >
      {/* cabeçalho da conversa */}
      <div style={{ position: "absolute", left: 170, top: 548, display: "flex", alignItems: "center", gap: 18, opacity: 1 - bubbleOut, fontFamily: F.sans }}>
        <Avatar size={78} label="PS" bg="#5B4A6E" />
        <div>
          <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>Paula S.</div>
          <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>cliente · conversa ilustrativa</div>
        </div>
      </div>
      {/* bolha "Obrigado." */}
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 680,
          width: 780,
          height: 230,
          boxSizing: "border-box",
          borderRadius: 60,
          borderTopLeftRadius: 16,
          background: C.surface2,
          border: `2px solid ${C.line}`,
          boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 70,
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 140,
          letterSpacing: "-0.04em",
          color: C.text,
          opacity: 1 - bubbleOut,
          transform: `scale(${mix(1, 0.86, bubbleOut)})`,
        }}
      >
        {LETTERS.map((ch, i) => {
          const a = sp(t, -0.25 + i * 0.045, { damping: 12, stiffness: 260 });
          return (
            <span key={i} style={{ display: "inline-block", opacity: Math.min(1, a * 2), transform: `translateY(${(1 - Math.min(1, a)) * 40}px)` }}>
              {ch}
            </span>
          );
        })}
      </div>
      {/* microanimação no ritmo normal: horário e confirmação de leitura enquanto a frase é dita */}
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 924,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 26,
          color: C.muted,
          opacity: prog(t, 1.0, 0.3, ease.out) * (1 - bubbleOut),
          transform: `translateY(${(1 - prog(t, 1.0, 0.3, ease.out)) * 12}px)`,
        }}
      >
        18:42
        <span style={{ color: prog(t, 2.0, 0.25, ease.out) > 0.5 ? C.accent : C.dim, letterSpacing: "-0.3em", fontSize: 30 }}>✓✓</span>
        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: C.accent, opacity: prog(t, 2.0, 0.3, ease.out) }}>lida</span>
      </div>
      {/* o ponto final que cresce e vira "?" */}
      <div
        style={{
          position: "absolute",
          left: dotX - dotSize / 2,
          top: dotY - dotSize / 2,
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize,
          background: mix(0, 1, toQ) > 0.5 ? C.accent : C.text,
          boxShadow: `0 0 ${140 * grow}px rgba(53,224,161,${0.45 * grow})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pulse})`,
          opacity: Math.min(1, prog(t, 0.12, 0.1, ease.out)),
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 800,
            fontSize: dotSize * 0.78,
            lineHeight: 1,
            color: C.accentInk,
            opacity: Math.min(1, toQ * 1.5),
            transform: `scale(${mix(0.3, 1, Math.min(1, toQ))}) rotate(${(1 - Math.min(1, toQ)) * -40}deg)`,
            display: "inline-block",
          }}
        >
          ?
        </span>
      </div>
    </Camera>
  );
};
