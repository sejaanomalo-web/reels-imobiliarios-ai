import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconLens, Mark, Tag, Verdict } from "./ui";

/**
 * CENA 04 — INSIGHT. "Depois da visita, pergunte o que funcionou e o que não funcionou.
 * Registre esses critérios para selecionar a próxima opção com mais precisão."
 * As respostas viram filtros de busca, aplicados sobre três fichas de imóveis (fictícias): só uma passa.
 */
const OPTS = [
  { name: "Opção A", note: "rua movimentada", ok: false },
  { name: "Opção B", note: "sala compacta", ok: false },
  { name: "Opção C", note: "rua tranquila · mais espaço", ok: true },
];
const FILTERS = ["planta parecida", "mesma região", "rua tranquila", "mais espaço"];

export const Criteria: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.ins_after, { damping: 15, stiffness: 150 });
  const colIn = sp(t, c.ins_after + 0.25, { damping: 16, stiffness: 140 });
  const yes = [0, 0.3].map((d) => sp(t, c.ins_worked + 0.3 + d, { damping: 12, stiffness: 190 }));
  const no = [0, 0.3].map((d) => sp(t, c.ins_not + 0.55 + d, { damping: 12, stiffness: 190 }));
  const reg = prog(t, c.ins_register - 0.05, 0.7, ease.inOut);
  const chips = FILTERS.map((_, i) => sp(t, c.ins_register + 0.25 + i * 0.16, { damping: 13, stiffness: 190 }));
  const cards = OPTS.map((_, i) => sp(t, c.ins_select - 0.15 + i * 0.12, { damping: 15, stiffness: 150 }));
  const apply = prog(t, c.ins_select + 0.6, 0.8, ease.inOut);
  const win = sp(t, c.ins_precise, { damping: 11, stiffness: 180 });
  const exit = prog(t, c.cta_journey - 0.15, 0.45, ease.in);
  const scan = (t * 1.4) % 1;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_after, s: 0.96, y: -30 },
          { t: c.ins_worked, s: 1.06, y: -60, e: ease.inOut },
          { t: c.ins_register + 0.3, s: 1.0, y: 40, e: ease.inOut },
          { t: c.ins_select + 0.5, s: 1.0, y: 70, e: ease.inOut },
          { t: c.ins_precise + 0.4, s: 1.06, y: 110, x: 110, e: ease.inOut },
          { t: c.cta_journey + 0.3, s: 1.0, y: 60, x: 40, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", opacity: Math.min(1, head * 1.5), transform: `translateY(${(1 - Math.min(1, head)) * 30}px)` }}>
          <Tag text="DEPOIS DA VISITA, PERGUNTE" tone="accent" size={32} />
        </div>
        {/* o que funcionou × o que não funcionou */}
        {[
          { x: 70, title: "FUNCIONOU", color: C.accent, items: ["Planta", "Localização"], ok: true, p: yes },
          { x: 560, title: "NÃO FUNCIONOU", color: C.warn, items: ["Rua movimentada", "Pouco espaço"], ok: false, p: no },
        ].map((col, k) => (
          <div key={col.title} style={{ position: "absolute", left: col.x, top: 350, width: 450, height: mix(330, 250, reg), boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `1px solid ${C.line}`, padding: "28px 26px", opacity: Math.min(1, colIn * 1.5) * mix(1, 0.6, reg), transform: `translateY(${(1 - Math.min(1, colIn)) * 80}px)`, boxShadow: "0 30px 80px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: col.color }}>O QUE {col.title}?</div>
            {col.items.map((it, i) => (
              <div key={it} style={{ alignSelf: "flex-start", transform: `translateY(${-reg * (k * 0 + 8)}px)` }}>
                <Verdict ok={col.ok} text={it} p={col.p[i]} size={30} />
              </div>
            ))}
          </div>
        ))}
        {/* critérios registrados → filtros */}
        <div style={{ position: "absolute", left: 70, top: mix(720, 640, reg), width: 940, boxSizing: "border-box", borderRadius: 32, background: C.surface2, border: `2px solid ${reg > 0.5 ? "rgba(58,245,132,0.5)" : C.line}`, padding: "22px 26px", opacity: reg, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <IconLens size={36} />
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.accent }}>CRITÉRIOS REGISTRADOS = FILTROS</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16 }}>
            {FILTERS.map((f, i) => (
              <span key={f} style={{ padding: "12px 22px", borderRadius: 26, background: "rgba(58,245,132,0.14)", border: "2px solid rgba(58,245,132,0.45)", color: C.text, fontWeight: 800, fontSize: 30, opacity: Math.min(1, chips[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, chips[i]))})`, display: "inline-block" }}>
                {f}
              </span>
            ))}
          </div>
        </div>
        {/* três fichas de imóveis */}
        {OPTS.map((o, i) => {
          const x = 70 + i * 325;
          const pass = o.ok ? Math.min(1, win) : 0;
          const dim = o.ok ? 0 : apply;
          return (
            <div key={o.name} style={{ position: "absolute", left: x, top: 920, width: 290, height: 330, boxSizing: "border-box", borderRadius: 30, overflow: "hidden", background: C.surface, border: `${o.ok ? 3 : 1}px solid ${pass > 0.5 ? C.accent : C.line}`, opacity: Math.min(1, cards[i] * 1.5) * mix(1, 0.35, dim), transform: `translateY(${(1 - Math.min(1, cards[i])) * 120 + dim * 20}px) scale(${1 + 0.05 * pass})`, boxShadow: pass > 0 ? `0 30px 80px rgba(0,0,0,0.5), 0 0 ${80 * pass}px rgba(58,245,132,0.3)` : "0 30px 80px rgba(0,0,0,0.5)" }}>
              <div style={{ height: 150, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                <House w={200} h={140} />
              </div>
              {/* varredura do filtro */}
              {apply > 0 && apply < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: scan * 330, height: 6, background: "rgba(58,245,132,0.6)" }} /> : null}
              <div style={{ padding: "18px 20px" }}>
                <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{o.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, opacity: o.ok ? Math.min(1, apply * 1.5) : apply }}>
                  <Mark ok={o.ok} size={36} />
                  <span style={{ fontWeight: 700, fontSize: 22, color: o.ok ? C.accent : C.muted, lineHeight: 1.15 }}>{o.note}</span>
                </div>
              </div>
            </div>
          );
        })}
        {win > 0 ? (
          <div style={{ position: "absolute", left: 720, top: 1270, width: 290, display: "flex", justifyContent: "center", opacity: Math.min(1, win * 1.5) }}>
            <Tag text="MAIS PRECISA" tone="accent" size={24} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
