import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Confetti, Label, Month, Pro, Tag } from "./ui";

/**
 * CENA 3 — CAMINHO B. "O segundo também comemora." → B comemora (mesmo confete). "Mas registra a origem da oportunidade, atualiza os
 * interessados, organiza a carteira e reserva um tempo para prospecção." → REGISTRO DA VENDA (ilustrativo): ORIGEM, CONTATOS, IMÓVEIS,
 * PRÓXIMO PASSO, cada linha marcada no tempo da fala; agenda com blocos de PROSPECÇÃO. "Não é uma máquina que vende sozinha." → selo
 * NÃO VENDE SOZINHO. "É uma operação que preserva o aprendizado de cada atendimento." → as linhas viram HISTÓRICO e CADA ATENDIMENTO ENSINA.
 */
const ROWS = [
  { k: "ORIGEM", sub: "de onde veio a oportunidade" },
  { k: "CONTATOS", sub: "interessados atualizados" },
  { k: "IMÓVEIS", sub: "carteira organizada" },
  { k: "PRÓXIMO PASSO", sub: "tempo para prospecção" },
];

export const Outro: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.o_reg, c.o_atual, c.o_org, c.o_res];
  const enter = sp(t, c.o_seg - 0.35, { damping: 15, stiffness: 150 });
  const conf = prog(t, c.o_comem - 0.2, 1.8, ease.linear);
  const board = sp(t, c.o_seg + 0.5, { damping: 14, stiffness: 170 });
  const cur = at.filter((x) => t >= x - 0.15).length - 1;
  const cal = sp(t, c.o_reg,  { damping: 13, stiffness: 180 });
  const maq = sp(t, c.o_maq - 0.1, { damping: 11, stiffness: 220 });
  const maqOut = prog(t, c.o_oper - 0.2, 0.4, ease.in);
  const hist = prog(t, c.o_oper, 0.8, ease.inOut);
  const key = sp(t, c.o_aprend - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.i_res - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.o_seg - 0.35, s: 1.05, y: 0 },
          { t: c.o_comem + 0.2, s: 1.07, x: -25, y: -10, e: ease.inOut },
          { t: c.o_reg + 0.2, s: 1.03, x: 15, y: 0, e: ease.inOut },
          { t: c.o_atual + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: c.o_org + 0.2, s: 1.04, x: 15, y: -10, e: ease.inOut },
          { t: c.o_res + 0.2, s: 1.06, x: -10, y: -20, e: ease.inOut },
          { t: c.o_maq + 0.2, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.o_oper + 0.4, s: 1.05, x: 10, y: -10, e: ease.inOut },
          { t: c.o_aprend + 0.4, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: c.i_res, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 390, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, enter * 1.5) }}>
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={26} style={{ color: C.text }} />
          <Tag text="CAMINHO B" tone="accent" size={26} />
        </div>
        <div style={{ position: "absolute", left: 70, top: 500 + Math.abs(Math.sin(t * 6)) * -14 * (1 - prog(t, c.o_reg - 0.3, 0.5, ease.out)) }}><Pro who="B" size={160} glow={1} /></div>
        <Confetti p={conf} x={40} y={500} w={240} n={14} seed={9} />
        {/* registro da venda */}
        {board > 0.001 ? (
          <div style={{ position: "absolute", left: 260, right: 80, top: 480, boxSizing: "border-box", padding: "22px 24px 18px", borderRadius: 30, background: C.surface, border: `2px solid ${cur >= 3 ? brandAlpha(0.6) : C.line}`, boxShadow: cur >= 3 ? `0 0 40px ${brandAlpha(0.18)}` : "0 30px 80px rgba(0,0,0,0.6)", opacity: Math.min(1, board * 1.5), transform: `translateX(${(1 - Math.min(1, board)) * 120}px) scale(${mix(1, 0.92, hist)})`, transformOrigin: "50% 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>{hist > 0.5 ? "HISTÓRICO DA VENDA" : "REGISTRO DA VENDA"}</Label>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {ROWS.map((r, i) => {
              const on = i <= cur;
              const p = sp(t, at[i] - 0.15, { damping: 12, stiffness: 210 });
              return (
                <div key={r.k} style={{ marginTop: mix(14, 8, hist), height: mix(96, 70, hist), display: "flex", alignItems: "center", gap: 16, padding: "0 16px", borderRadius: 20, background: i === cur && hist < 0.5 ? BRAND.deep : C.surface2, border: `2px solid ${i === cur && hist < 0.5 ? BRAND.hex : "transparent"}`, opacity: on ? 1 : 0.35, transform: `translateX(${on ? 0 : 30}px)` }}>
                  <CheckDot p={on ? Math.min(1, p) : 0} size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: "-0.01em" }}>{r.k}</div>
                    {hist < 0.5 ? <div style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>{r.sub}</div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* agenda: tempo para prospecção */}
        {cal > 0.001 ? (
          <div style={{ position: "absolute", left: 100, top: 1010, display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, cal * 1.5) * (1 - hist), transform: `translateY(${(1 - Math.min(1, cal)) * 60}px)` }}>
            <Month w={300} label="AGENDA" marks={[8, 15, 22].filter((_, k) => t > c.o_prosp + k * 0.25)} />
            <Tag text="PROSPECÇÃO RESERVADA" tone="accent" size={28} style={{ opacity: prog(t, c.o_prosp - 0.2, 0.4, ease.out) }} />
          </div>
        ) : null}
        {/* não vende sozinho */}
        {maq > 0.001 && maqOut < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", zIndex: 5, opacity: Math.min(1, maq * 1.5) * (1 - maqOut) }}>
            <div style={{ padding: "26px 40px", borderRadius: 30, background: C.bg1, border: `3px solid ${C.muted}`, transform: `rotate(-4deg) scale(${mix(1.6, 1, Math.min(1, maq))})`, boxShadow: "0 30px 80px rgba(0,0,0,0.75)", textAlign: "center" }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>ISSO NÃO É</div>
              <div style={{ fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.text }}>MÁQUINA QUE<br />VENDE SOZINHA</div>
            </div>
          </div>
        ) : null}
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 1070, textAlign: "center", fontWeight: 800, fontSize: 66, lineHeight: 1.04, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, key))})` }}>
            CADA ATENDIMENTO<br /><span style={{ color: BRAND.hex }}>ENSINA</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        COMEMORA <span style={{ color: BRAND.hex }}>E REGISTRA</span>
      </div>
    </div>
  );
};
