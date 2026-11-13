import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, Tag } from "./ui";

/**
 * CENAS 03–04 — TENSÃO + INSIGHT (mesmo painel).
 * "Para acompanhar o processo, observe três coisas: primeiro contato, último movimento e próximo passo definido."
 * Três colunas aparecem sobre cartões de leads fictícios e se preenchem no tempo de cada termo; dois leads ficam sem próximo passo.
 * "Não é vigiar o corretor a cada minuto. É ter clareza para apoiar oportunidades que ficaram sem sequência e corrigir gargalos reais."
 * O "olho" de vigilância é riscado; o gestor apoia as linhas sem sequência (próximo passo definido junto) e marca o gargalo real.
 * Sem métricas inventadas.
 */
const ROWS = [
  { lead: "Lead 1", who: "A", bg: "#4E6A8C", first: "contato feito", last: "visita realizada", next: "enviar proposta", ok: true },
  { lead: "Lead 2", who: "B", bg: "#8C6A4E", first: "contato feito", last: "aguardando docs", next: "", ok: false, fix: "cobrar docs com o cliente" },
  { lead: "Lead 3", who: "C", bg: "#5A7A6E", first: "contato feito", last: "ligação", next: "agendar visita", ok: true },
  { lead: "Lead 4", who: "B", bg: "#8C6A4E", first: "contato feito", last: "aguardando docs", next: "", ok: false, fix: "reunir os documentos" },
];
const COLS = [
  { k: "1º CONTATO", cue: "ten_first" },
  { k: "ÚLTIMO MOVIMENTO", cue: "ten_last" },
  { k: "PRÓXIMO PASSO", cue: "ten_next" },
];
const X0 = 60;
const LW = 200;
const CWID = [230, 260, 270];
const Y0 = 430;
const RH = 130;

export const Table: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.ten_follow - 0.1, { damping: 15, stiffness: 150 });
  const three = sp(t, c.ten_three - 0.05, { damping: 13, stiffness: 180 });
  const colP = COLS.map((k) => sp(t, c[k.cue] - 0.05, { damping: 13, stiffness: 180 }));
  const eye = sp(t, c.ins_watch - 0.2, { damping: 13, stiffness: 180 });
  const eyeX = prog(t, c.ins_watch + 0.5, 0.5, ease.out);
  const eyeOut = prog(t, c.ins_clear - 0.2, 0.4, ease.in);
  const clear = prog(t, c.ins_clear - 0.1, 0.5, ease.out);
  const help = [0, 1].map((i) => sp(t, c.ins_help + 0.2 + i * 0.35, { damping: 12, stiffness: 190 }));
  const seq = prog(t, c.ins_noseq - 0.1, 0.4, ease.out);
  const bottle = sp(t, c.ins_fix + 0.2, { damping: 11, stiffness: 200 });
  const exit = prog(t, c.cta_hist - 0.15, 0.45, ease.in);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const colX = (j: number) => X0 + LW + CWID.slice(0, j).reduce((a, b) => a + b, 0);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_follow, s: 0.96, y: 0, rx: 6 },
          { t: c.ten_first + 0.3, s: 1.03, x: -20, y: 40, rx: 0, e: ease.inOut },
          { t: c.ten_next + 0.5, s: 1.03, x: 20, y: 60, e: ease.inOut },
          { t: c.ins_watch + 0.3, s: 1.0, x: 0, y: -60, e: ease.inOut },
          { t: c.ins_help + 0.6, s: 1.04, x: 10, y: 80, e: ease.inOut },
          { t: c.ins_fix + 0.6, s: 1.03, x: 0, y: 140, e: ease.inOut },
          { t: c.cta_hist + 0.3, s: 0.95, y: 40, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: Math.min(1, three * 1.5) * (1 - prog(t, c.ins_watch - 0.2, 0.3, ease.in)) }}>
          <Tag text="OBSERVE 3 COISAS" tone="accent" size={30} />
        </div>
        {/* cabeçalho das colunas */}
        {COLS.map((k, j) => (
          <div key={k.k} style={{ position: "absolute", left: colX(j), top: Y0 - 70, width: CWID[j] - 10, fontFamily: F.mono, fontWeight: 700, fontSize: 21, letterSpacing: "0.06em", color: j === 2 ? C.accent : C.cold, opacity: Math.min(1, colP[j] * 1.5), transform: `translateY(${(1 - Math.min(1, colP[j])) * -30}px)` }}>{k.k}</div>
        ))}
        {/* linhas */}
        {ROWS.map((r, i) => {
          const y = Y0 + i * (RH + 14);
          const rowIn = sp(t, c.ten_follow + 0.1 + i * 0.12, { damping: 14, stiffness: 170 });
          const isGap = !r.ok;
          const helped = isGap ? Math.min(1, help[i === 1 ? 0 : 1]) : 0;
          return (
            <div key={r.lead} style={{ position: "absolute", left: X0, top: y, width: 960, height: RH, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${isGap && seq > 0.5 && helped < 0.5 ? `rgba(255,107,94,${0.4 + 0.5 * pulse})` : helped > 0.5 ? "rgba(58,245,132,0.55)" : C.line}`, opacity: Math.min(1, rowIn * 1.5) * mix(1, isGap ? 1 : 0.55, clear), transform: `translateX(${(1 - Math.min(1, rowIn)) * 80}px)`, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
              <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar size={52} label={r.who} bg={r.bg} />
                <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{r.lead}</span>
              </div>
              {[r.first, r.last, r.next].map((v, j) => {
                const p = Math.min(1, colP[j]);
                const empty = j === 2 && !v;
                const fixed = empty && helped > 0.5;
                return (
                  <div key={j} style={{ position: "absolute", left: colX(j) - X0, top: 0, bottom: 0, width: CWID[j] - 14, display: "flex", alignItems: "center", gap: 10, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
                    {fixed ? (
                      <>
                        <Mark ok size={34} />
                        <span style={{ fontWeight: 800, fontSize: 24, lineHeight: 1.1, color: C.accent }}>{r.fix}</span>
                      </>
                    ) : empty ? (
                      <span style={{ fontWeight: 800, fontSize: 30, color: C.warn }}>— sem próximo passo</span>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.1, color: C.text }}>{v}</span>
                    )}
                  </div>
                );
              })}
              {/* o gestor apoia */}
              {isGap && helped > 0 ? (
                <div style={{ position: "absolute", right: -10, top: -26, display: "flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", borderRadius: 26, background: C.accent, opacity: Math.min(1, helped * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.1, helped))})` }}>
                  <Avatar size={36} label="G" bg="#2A3A33" />
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.accentInk }}>GESTOR APOIA</span>
                </div>
              ) : null}
            </div>
          );
        })}
        {/* gargalo real */}
        {bottle > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: Y0 + 4 * (RH + 14) + 20, display: "flex", justifyContent: "center", opacity: Math.min(1, bottle * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, bottle))})` }}>
            <div style={{ padding: "16px 28px", borderRadius: 28, background: C.surface2, border: `2px solid ${C.accent}`, fontWeight: 800, fontSize: 32, color: C.text }}>
              gargalo real: <span style={{ color: C.accent }}>documentação parada</span> → corrigir
            </div>
          </div>
        ) : null}
        {/* não é vigiar */}
        {eye > 0 && eyeOut < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", opacity: Math.min(1, eye * 1.5) * (1 - eyeOut) }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 18, padding: "16px 32px", borderRadius: 34, background: "rgba(36,14,13,0.95)", border: `3px solid ${C.warn}` }}>
              <svg width={70} height={46} viewBox="0 0 70 46"><path d="M3 23 C 18 2, 52 2, 67 23 C 52 44, 18 44, 3 23 Z" fill="none" stroke={C.text} strokeWidth={4} /><circle cx={35} cy={23} r={9} fill={C.text} /></svg>
              <span style={{ fontWeight: 800, fontSize: 40, color: C.text }}>vigiar a cada minuto</span>
              <div style={{ position: "absolute", left: 10, right: 10, top: "50%", height: 8, borderRadius: 4, background: C.warn, transform: `scaleX(${eyeX})`, transformOrigin: "0 50%" }} />
            </div>
          </div>
        ) : null}
        {clear > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: Math.min(1, clear * 1.5) }}>
            <Tag text="CLAREZA PARA APOIAR" tone="accent" size={30} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
