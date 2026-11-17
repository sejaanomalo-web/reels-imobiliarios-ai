import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Count, Head, Label, PropCard, Tag } from "./ui";

/**
 * CENA 4 — 3. RESPEITAR O MOMENTO + TRANSIÇÃO. "Terceira: aceitar que a pessoa talvez ainda esteja comparando opções." → 3/3; linha do
 * tempo PERGUNTA → COMPARA → VISITA (sem carimbo VENDIDO), com a pessoa em COMPARA. "Em vez de pressionar, combine qual informação fará
 * sentido enviar no próximo contato." → "Decide hoje?" riscado; cartão PRÓXIMO CONTATO · INFORMAÇÃO COMBINADA. "O relacionamento pode
 * continuar sem uma decisão imediata." → a linha segue tracejada adiante. "E para respeitar o momento de cada pessoa, ajuda saber em que
 * ponto cada conversa parou." (transição) → três conversas genéricas, cada uma com o marcador PAROU AQUI na sua etapa.
 */
const STAGES = ["PERGUNTA", "COMPARA", "VISITA"];

export const Tres: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.t_terc - 0.35, { damping: 15, stiffness: 150 });
  const head = sp(t, c.t_terc - 0.1, { damping: 13, stiffness: 180 });
  const line = prog(t, c.t_terc + 0.2, 0.9, ease.inOut);
  const here = sp(t, c.t_comp - 0.1, { damping: 12, stiffness: 200 });
  const press = sp(t, c.t_press - 0.2, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.t_press + 0.35, 0.35, ease.out);
  const next = sp(t, c.t_combine - 0.1, { damping: 13, stiffness: 190 });
  const cont = prog(t, c.t_relac, 1.4, ease.inOut);
  const list = sp(t, c.t_resp - 0.2, { damping: 13, stiffness: 180 });
  const marks = [0, 1, 2].map((i) => sp(t, c.t_ponto - 0.2 + i * 0.25, { damping: 12, stiffness: 210 }));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const x0 = 160;
  const gap = 300;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.t_terc - 0.35, s: 1.04, y: -30 },
          { t: c.t_terc + 1.2, s: 1.02, x: -30, y: -20, e: ease.inOut },
          { t: c.t_comp + 0.3, s: 1.06, x: 20, y: -10, e: ease.inOut },
          { t: c.t_press + 0.2, s: 1.03, x: -30, y: 30, e: ease.inOut },
          { t: c.t_prox + 0.2, s: 1.05, x: 30, y: 30, e: ease.inOut },
          { t: c.t_relac + 0.3, s: 1.0, x: 30, y: 20, e: ease.inOut },
          { t: c.t_imed, s: 1.04, x: -20, y: 30, e: ease.inOut },
          { t: c.t_resp + 0.4, s: 1.03, x: 0, y: 60, e: ease.inOut },
          { t: c.t_momento + 0.5, s: 1.06, x: -25, y: 70, e: ease.inOut },
          { t: c.t_ponto + 0.3, s: 1.03, x: 25, y: 60, e: ease.inOut },
          { t: c.cta_quer, s: 1.03, y: 60, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, top: 300 }}><Head n={3} text="Respeitar o momento" p={head} /></div>
        {/* jornada */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - list * 0.75 }}>
          <div style={{ position: "absolute", left: x0, top: 560, width: gap * 2 * line, height: 10, borderRadius: 5, background: C.surface3 }} />
          <div style={{ position: "absolute", left: x0 + gap * 2, top: 560, width: 220 * cont, height: 10, borderRadius: 5, background: `repeating-linear-gradient(90deg, ${BRAND.hex} 0 18px, transparent 18px 32px)`, backgroundPosition: `${-t * 40}px 0` }} />
          {STAGES.map((s, i) => {
            const on = i === 1 && here > 0.5;
            return (
              <div key={s} style={{ position: "absolute", left: x0 + i * gap - 120, top: 535, width: 240, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: prog(line, i * 0.3, 0.3, ease.out) }}>
                <div style={{ width: 60, height: 60, borderRadius: 30, background: on ? BRAND.hex : C.surface2, border: `4px solid ${on ? BRAND.hex : C.dim}`, boxShadow: on ? `0 0 24px ${brandAlpha(0.6)}` : "none", transform: `scale(${on ? 1 + 0.06 * Math.sin(t * 4) : 1})` }} />
                <Label size={28} color={on ? BRAND.hex : C.text}>{s}</Label>
              </div>
            );
          })}
          {here > 0.001 ? <div style={{ position: "absolute", left: x0 + gap - 60, top: 450, opacity: Math.min(1, here * 1.5) }}><Tag text="ESTÁ AQUI" tone="accent" size={24} /></div> : null}
          {line > 0.3 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", justifyContent: "center", gap: 18, opacity: prog(line, 0.3, 0.5, ease.out) * mix(0.5, 1, Math.min(1, here)) * (1 - press * 0.7) }}>
              {[0, 1, 2].map((k) => {
                const on = here > 0.5 && Math.floor(t * 1.2) % 3 === k;
                return <div key={k} style={{ transform: `translateY(${on ? -14 : 0}px) scale(${on ? 1.06 : 1})` }}><PropCard w={190} i={k + 1} ok={on} /></div>;
              })}
            </div>
          ) : null}
          {press > 0.001 ? (
            <div style={{ position: "absolute", left: 120, top: 900, opacity: Math.min(1, press * 1.5) * (1 - next * 0.6), transform: `rotate(-3deg) scale(${mix(0.5, 1, Math.min(1.08, press))})` }}>
              <div style={{ position: "relative", padding: "14px 26px", borderRadius: 26, borderBottomLeftRadius: 6, background: C.surface3, fontWeight: 800, fontSize: 42, color: C.muted }}>
                “Decide hoje?”
                <div style={{ position: "absolute", left: 12, right: 12, top: "50%", height: 9, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-4deg)` }} />
              </div>
            </div>
          ) : null}
          {next > 0.001 ? (
            <div style={{ position: "absolute", left: 420, top: 880, width: 560, boxSizing: "border-box", padding: "20px 24px", borderRadius: 28, background: C.surface, border: `3px solid ${BRAND.hex}`, opacity: Math.min(1, next * 1.5), transform: `translateY(${(1 - Math.min(1, next)) * 50}px)`, boxShadow: `0 0 30px ${brandAlpha(0.2)}` }}>
              <Label size={24} color={BRAND.hex}>PRÓXIMO CONTATO</Label>
              <div style={{ fontWeight: 800, fontSize: 36, color: C.text, marginTop: 6 }}>Informação combinada</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>{[0, 1, 2].map((k) => <span key={k} style={{ width: 90 + k * 30, height: 12, borderRadius: 6, background: C.surface3 }} />)}</div>
            </div>
          ) : null}
          {cont > 0.3 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", opacity: prog(cont, 0.3, 0.4, ease.out) }}><Tag text="O RELACIONAMENTO CONTINUA" tone="accent" size={28} /></div> : null}
        </div>
        {/* em que ponto cada conversa parou */}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 860, height: 420, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, padding: "22px 28px", opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80}px)`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>SUAS CONVERSAS</Label>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
            </div>
            {[1, 0, 2].map((stage, r) => (
              <div key={r} style={{ marginTop: r ? 14 : 20, height: 92, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: C.surface2 }}>
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text, width: 170 }}>Contato {r + 1}</span>
                <div style={{ flex: 1, position: "relative", height: 40 }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 6, borderRadius: 3, background: C.surface3 }} />
                  {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: `${k * 45}%`, top: 8, width: 26, height: 26, borderRadius: 13, background: k <= stage ? (k === stage ? BRAND.hex : C.muted) : C.surface3, transform: `scale(${k === stage ? 1 + 0.25 * Math.max(0, Math.sin(t * 4 + r)) : 1})`, boxShadow: k === stage ? `0 0 14px ${brandAlpha(0.7)}` : "none" }} />)}
                  {marks[r] > 0.001 ? <div style={{ position: "absolute", left: `calc(${stage * 45}% - 30px)`, top: -34, opacity: Math.min(1, marks[r] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, marks[r]))})` }}><Tag text="PAROU AQUI" tone="accent" size={20} /></div> : null}
                </div>
                <CheckDot p={prog(t, c.t_parou + r * 0.15, 0.3, ease.out)} size={40} />
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", right: 100, top: 260 }}><Count n={3} p={head} /></div>
    </div>
  );
};
