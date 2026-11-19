import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Confetti, Month, Pro, Question, Tag } from "./ui";

/**
 * CENA 2 — CAMINHO A (cenário hipotético). "Num cenário hipotético, um profissional comemora a venda e volta à rotina sem revisar o que
 * aconteceu:" → selo EXEMPLO ILUSTRATIVO; A comemora; a linha da venda acende e se apaga ("volta à rotina"). "de onde veio o cliente, quais
 * imóveis despertaram interesse e quem ainda ficou em negociação." → três perguntas surgem, cada uma NÃO REGISTRADO. "No mês seguinte,
 * precisa reconstruir tudo de memória." → o mês vira (reset digital), as fichas embaralham e somem; A com "?" — UMA VENDA. NENHUM HISTÓRICO.
 */
const QS = ["De onde veio o cliente?", "Quais imóveis despertaram interesse?", "Quem ficou em negociação?"];

export const Prim: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_num - 0.35, { damping: 15, stiffness: 150 });
  const seal = sp(t, c.p_hip - 0.2, { damping: 12, stiffness: 200 });
  const conf = prog(t, c.p_comem, 1.8, ease.linear);
  const line = prog(t, c.p_comem - 0.1, 0.6, ease.out);
  const lineOff = prog(t, c.p_rotina, 0.7, ease.inOut);
  const qs = [c.p_cliente, c.p_inter, c.p_neg].map((x) => sp(t, x - 0.2, { damping: 13, stiffness: 200 }));
  const miss = [c.p_cliente, c.p_inter, c.p_neg].map((x) => prog(t, x + 0.6, 0.3, ease.out));
  const reset = prog(t, c.p_mes - 0.1, 0.7, ease.in);
  const flip = prog(t, c.p_mes - 0.1, 0.5, ease.inOut);
  const mem = sp(t, c.p_mem - 0.2, { damping: 12, stiffness: 200 });
  const key = sp(t, c.p_recon, { damping: 13, stiffness: 180 });
  const won = sp(t, c.p_hip + 0.3, { damping: 12, stiffness: 190 });
  const wonOut = prog(t, c.p_sem - 0.3, 0.4, ease.in);
  const slots = prog(t, c.p_sem, 0.4, ease.out);
  const out = prog(t, c.o_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_num - 0.35, s: 1.04, y: 0 },
          { t: c.p_comem + 0.2, s: 1.07, x: -25, y: -10, e: ease.inOut },
          { t: c.p_rotina + 0.3, s: 1.03, x: 10, y: 0, e: ease.inOut },
          { t: c.p_cliente + 0.2, s: 1.05, x: 20, y: 0, e: ease.inOut },
          { t: c.p_inter + 0.2, s: 1.04, x: -20, y: -10, e: ease.inOut },
          { t: c.p_neg + 0.2, s: 1.06, x: 15, y: -10, e: ease.inOut },
          { t: c.p_mes + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.p_mem + 0.2, s: 1.06, x: -15, y: -10, e: ease.inOut },
          { t: c.o_seg, s: 1.07, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 390, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, seal * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, seal))})` }}>
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={26} style={{ color: C.text }} />
          <Tag text="CAMINHO A" tone="muted" size={26} />
        </div>
        {/* A + comemoração */}
        <div style={{ position: "absolute", left: 110, top: 500 + Math.abs(Math.sin(t * 6)) * -14 * (1 - prog(t, c.p_rotina, 0.5, ease.out)) }}><Pro who="A" size={190} /></div>
        <Confetti p={conf} x={80} y={500} w={280} n={14} seed={3} />
        {mem > 0.001 ? (
          <div style={{ position: "absolute", left: 230, top: 470, opacity: Math.min(1, mem * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, mem))})` }}><Question size={84} color={C.warn} ink="#fff" /></div>
        ) : null}
        {/* linha da venda */}
        <div style={{ position: "absolute", left: 360, right: 100, top: 560, opacity: 1 - reset }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginBottom: 12 }}>LINHA DA VENDA</div>
          <div style={{ position: "relative", height: 14, borderRadius: 7, background: C.surface3 }}>
            <div style={{ width: `${line * (1 - lineOff) * 100}%`, height: "100%", borderRadius: 7, background: BRAND.hex, opacity: 1 - lineOff * 0.8 }} />
            <div style={{ position: "absolute", left: `${mix(0, 96, line)}%`, top: -13, width: 40, height: 40, borderRadius: 20, background: lineOff > 0.5 ? C.surface3 : BRAND.hex, border: `4px solid ${C.bg0}` }} />
          </div>
          <div style={{ marginTop: 18, opacity: prog(t, c.p_rotina, 0.4, ease.out) }}><Tag text="DE VOLTA À ROTINA" tone="muted" size={24} /></div>
        </div>
        {/* venda fechada (some depois da comemoração) */}
        {won > 0.001 && wonOut < 1 ? (
          <div style={{ position: "absolute", left: 180, right: 180, top: 820, boxSizing: "border-box", padding: "30px 34px", borderRadius: 34, background: C.surface, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, won * 1.5) * (1 - wonOut), transform: `scale(${mix(0.6, 1, Math.min(1.06, won)) * (1 - wonOut * 0.3)}) rotate(${Math.sin(t * 2) * 1.2}deg)` }}>
            <CheckDot p={Math.min(1, won)} size={90} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 52, letterSpacing: "-0.03em", color: C.text }}>VENDA FECHADA</div>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>COMISSÃO R$ ••••</div>
            </div>
          </div>
        ) : null}
        {/* lacunas: o que não foi revisado */}
        {[0, 1, 2].map((i) => (slots > 0 && qs[i] < 0.6 ? <div key={i} style={{ position: "absolute", left: 120, right: 120, top: 790 + i * 150, height: 128, boxSizing: "border-box", borderRadius: 26, border: `3px dashed ${C.dim}`, opacity: slots * (1 - Math.min(1, qs[i] * 1.6)) * (0.7 + 0.3 * Math.sin(t * 3 + i)) }} /> : null))}
        {/* as perguntas não registradas */}
        {QS.map((q, i) => {
          const a = qs[i];
          if (a <= 0.001) return null;
          const sx = (i % 2 ? 1 : -1) * (500 + rnd(i * 5 + 2) * 400) * reset;
          const sy = reset * (100 + i * 60);
          return (
            <div key={q} style={{ position: "absolute", left: 120, right: 120, top: 790 + i * 150, boxSizing: "border-box", height: 128, padding: "0 26px", borderRadius: 26, background: C.surface, border: `2px solid ${miss[i] > 0.5 ? "rgba(255,107,94,0.55)" : C.line}`, display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, a * 1.5) * (1 - reset), transform: `translate(${sx + (1 - Math.min(1, a)) * 80}px, ${sy + Math.sin(t * 1.8 + i) * 4}px) rotate(${reset * (i - 1) * 25}deg)` }}>
              <div style={{ flex: 1, fontWeight: 800, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.02em", color: C.text }}>{q}</div>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.warn, opacity: miss[i], textAlign: "right", lineHeight: 1.1 }}>NÃO<br />REGISTRADO</span>
            </div>
          );
        })}
        {/* o mês vira */}
        {flip > 0.001 ? (
          <div style={{ position: "absolute", left: 300, top: 760, opacity: Math.min(1, flip * 2), transform: `perspective(1200px) rotateX(${(1 - flip) * 80}deg)`, transformOrigin: "50% 0" }}>
            <Month w={480} label="MÊS SEGUINTE" dim={0} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ padding: "12px 22px", borderRadius: 16, background: C.bg0, fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: C.warn, transform: `rotate(-5deg) scale(${1 + 0.03 * Math.sin(t * 5)})` }}>DO ZERO</div>
            </div>
          </div>
        ) : null}
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 1075, textAlign: "center", fontWeight: 800, fontSize: 64, lineHeight: 1.04, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, key))})` }}>
            UMA VENDA.<br /><span style={{ color: C.warn }}>NENHUM HISTÓRICO.</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        COMEMORA <span style={{ color: C.muted }}>E ESQUECE</span>
      </div>
    </div>
  );
};
