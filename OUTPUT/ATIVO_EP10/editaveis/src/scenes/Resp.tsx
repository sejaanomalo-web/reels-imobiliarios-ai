import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconCal, Mark, Tag } from "./ui";

/**
 * CENA 4 — A RESPONSABILIDADE. "Se você trabalha com programas habitacionais, como o Minha Casa, Minha Vida, confira sempre os critérios
 * oficiais atualizados antes de publicar." → FONTE OFICIAL genérica (sem imitar site do governo, sem marca do programa, sem valores) +
 * carimbo VERIFICAR REGRAS ATUAIS + calendário CONFERIR A DATA. "Renda, enquadramento, condições e disponibilidade podem variar." → quatro
 * itens com ↻ PODEM VARIAR. "Seu papel no conteúdo é esclarecer o caminho, não prometer aprovação ou condições para todo mundo." →
 * ESCLARECER O CAMINHO ✓ × PROMETER APROVAÇÃO ✕ + SEM PROMESSAS DE APROVAÇÃO.
 */
const ITEMS = ["RENDA", "ENQUADRAMENTO", "CONDIÇÕES", "DISPONIBILIDADE"];

const Columns: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 4l9 5.5H3zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Resp: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.r_se - 0.35, { damping: 15, stiffness: 150 });
  const stamp = sp(t, c.r_confira, { damping: 10, stiffness: 230 });
  const cal = sp(t, c.r_atual - 0.1, { damping: 12, stiffness: 200 });
  const items = [c.r_renda, c.r_enq, c.r_cond, c.r_disp].map((x) => sp(t, x - 0.12, { damping: 12, stiffness: 210 }));
  const vary = prog(t, c.r_variar - 0.1, 0.4, ease.out);
  const back = prog(t, c.r_papel - 0.2, 0.6, ease.inOut);
  const good = sp(t, c.r_escl - 0.15, { damping: 12, stiffness: 200 });
  const bad = sp(t, c.r_prom - 0.1, { damping: 12, stiffness: 200 });
  const alert = sp(t, c.r_todo - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, c.i_im - 0.45, 0.4, ease.in);
  const spin = t * 140;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.r_se - 0.35, s: 1.05, y: -40 },
          { t: c.r_confira + 0.3, s: 1.06, y: -60, e: ease.inOut },
          { t: c.r_renda, s: 1.0, y: 20, e: ease.inOut },
          { t: c.r_variar + 0.3, s: 1.03, y: 50, e: ease.inOut },
          { t: c.r_escl, s: 1.0, y: 0, e: ease.inOut },
          { t: c.r_todo + 0.3, s: 1.04, y: 30, e: ease.inOut },
          { t: c.i_im, s: 1.04, y: 30, e: ease.linear },
        ]}
      >
        {/* fonte oficial genérica + itens */}
        <div style={{ position: "absolute", inset: 0, opacity: mix(1, 0, back), transform: `translateY(${-back * 60}px) scale(${mix(1, 0.94, back)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14 }}>
            <Tag text="PROGRAMAS HABITACIONAIS" tone="accent" size={28} />
          </div>
          <div style={{ position: "absolute", left: 140, right: 140, top: 380, height: 400, boxSizing: "border-box", borderRadius: 34, background: C.paper, padding: "28px 34px", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", transform: `rotate(${-1.5 + Math.sin(t * 1.2) * 0.6}deg)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Columns size={58} color={C.ink} />
              <div>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: C.inkMuted }}>FONTE OFICIAL</div>
                <div style={{ fontWeight: 800, fontSize: 40, color: C.ink }}>Critérios do programa</div>
              </div>
            </div>
            {[0.92, 0.7, 0.84, 0.6].map((w, i) => (
              <div key={i} style={{ marginTop: i ? 16 : 28, height: 22, width: `${w * 100}%`, borderRadius: 11, background: "#D9D6CD" }} />
            ))}
            <div style={{ position: "absolute", right: 26, top: 22 }}><Tag text="ILUSTRATIVO" tone="muted" size={20} /></div>
          </div>
          {stamp > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center", opacity: Math.min(1, stamp * 1.5), transform: `rotate(-8deg) scale(${mix(2, 1, Math.min(1, stamp))})`, zIndex: 4 }}>
              <div style={{ padding: "14px 30px", border: `6px solid ${BRAND.hex}`, borderRadius: 18, color: BRAND.hex, fontWeight: 800, fontSize: 52, letterSpacing: "0.03em", background: "rgba(7,8,10,0.85)" }}>VERIFICAR REGRAS ATUAIS</div>
            </div>
          ) : null}
          {cal > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 810, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: Math.min(1, cal * 1.5), transform: `translateY(${(1 - Math.min(1, cal)) * 30}px)` }}>
              <IconCal size={46} color={BRAND.hex} />
              <span style={{ fontWeight: 700, fontSize: 36, color: C.text }}>Conferir a data da atualização</span>
            </div>
          ) : null}
          {ITEMS.map((k, i) => {
            const a = items[i];
            if (a <= 0.001) return null;
            return (
              <div key={k} style={{ position: "absolute", left: i % 2 ? 550 : 110, top: 900 + Math.floor(i / 2) * 110, width: 420, height: 90, boxSizing: "border-box", borderRadius: 24, background: C.surface2, border: `2px solid ${vary > 0.5 ? "rgba(255,107,94,0.5)" : C.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, a))})` }}>
                <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{k}</span>
                <span style={{ fontSize: 40, color: C.warn, opacity: vary, display: "inline-block", transform: `rotate(${spin + i * 40}deg)` }}>↻</span>
              </div>
            );
          })}
          {vary > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: vary }}>
              <Tag text="PODEM VARIAR" tone="warn" size={28} />
            </div>
          ) : null}
        </div>
        {/* o papel do conteúdo */}
        {back > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: back }}>SEU PAPEL NO CONTEÚDO</div>
            {[0, 1].map((i) => {
              const p = i ? bad : good;
              if (p <= 0.001) return null;
              const ok = i === 0;
              return (
                <div key={i} style={{ position: "absolute", left: ok ? 100 : 560, top: 540 + Math.sin(t * 1.6 + i) * 5, width: 420, height: 330, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${ok ? BRAND.hex : C.warn}`, padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 90}px)`, boxShadow: ok ? `0 0 34px ${brandAlpha(0.25)}` : "0 0 30px rgba(255,107,94,0.18)" }}>
                  <Mark ok={ok} size={76} />
                  <div style={{ fontWeight: 800, fontSize: 48, lineHeight: 1.04, letterSpacing: "-0.03em", color: ok ? C.text : C.muted }}>{ok ? "Esclarecer o caminho" : "Prometer aprovação"}</div>
                </div>
              );
            })}
            {alert > 0.001 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 920, display: "flex", justifyContent: "center", opacity: Math.min(1, alert * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, alert))})` }}>
                <Tag text="⚠ SEM PROMESSAS DE APROVAÇÃO" tone="warn" size={32} />
              </div>
            ) : null}
          </>
        ) : null}
      </Camera>
    </div>
  );
};
