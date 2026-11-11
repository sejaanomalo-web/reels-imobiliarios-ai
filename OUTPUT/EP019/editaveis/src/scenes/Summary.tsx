import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconPlay, Mark, Tag, barH } from "./ui";

/**
 * CENA 03 — PRÁTICA. "Depois de um áudio importante, envie um resumo curto: imóvel, combinado e próximo passo.
 * Duas ou três linhas podem resolver."
 * O áudio de 3:00 continua lá; a onda se contrai e vira uma mensagem de três linhas (dados fictícios), uma linha por palavra.
 */
export const LINES = [
  { k: "Imóvel", v: "apto 2 quartos, Rua das Acácias, 120", cue: "ten_prop" },
  { k: "Combinado", v: "visita sábado, 10h", cue: "ten_deal" },
  { k: "Próximo passo", v: "levar RG e comprovante", cue: "ten_next" },
];

export const Summary: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const audio = sp(t, c.ten_after - 0.1, { damping: 16, stiffness: 140 });
  const squeeze = prog(t, c.ten_summary - 0.4, 0.8, ease.inOut);
  const card = sp(t, c.ten_summary + 0.1, { damping: 15, stiffness: 150 });
  const badge = sp(t, c.ten_lines, { damping: 12, stiffness: 190 });
  const sent = sp(t, c.ten_solve + 0.3, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.ins_reg - 0.1, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_after, s: 1.04, y: -120 },
          { t: c.ten_summary + 0.3, s: 1.0, y: -20, e: ease.inOut },
          { t: c.ten_next + 0.4, s: 1.05, y: 40, e: ease.inOut },
          { t: c.ten_solve + 0.5, s: 1.0, y: 20, e: ease.inOut },
          { t: c.ins_reg + 0.3, s: 0.95, y: 0, e: ease.in },
        ]}
      >
        {/* o áudio de 3:00 */}
        <div style={{ position: "absolute", left: 160, top: 290, width: 760, height: 130, boxSizing: "border-box", borderRadius: 36, borderBottomRightRadius: 10, background: "#123A2D", border: "2px solid rgba(53,224,161,0.35)", display: "flex", alignItems: "center", gap: 18, padding: "0 30px", opacity: Math.min(1, audio * 1.5) * mix(1, 0.55, squeeze), transform: `translateY(${(1 - Math.min(1, audio)) * -60}px)` }}>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconPlay size={36} color={C.accentInk} />
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, height: 80, overflow: "hidden" }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} style={{ width: 8, flexShrink: 0, height: barH(i) * 70 * mix(1, 0.25, squeeze), borderRadius: 3, background: "rgba(244,245,247,0.7)" }} />
            ))}
          </div>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.text }}>3:00</span>
        </div>
        {/* a onda se contrai e desce até virar o resumo */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <path d="M540 440 V510" stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeDasharray={`${80 * squeeze} 100`} />
        </svg>
        {/* resumo */}
        <div style={{ position: "absolute", left: 110, top: 530, width: 860, boxSizing: "border-box", borderRadius: 40, borderBottomRightRadius: 12, background: "#123A2D", border: "2px solid rgba(53,224,161,0.55)", padding: "32px 36px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 60}px) scale(${mix(0.3, 1, Math.min(1, card))})`, transformOrigin: "50% 0", boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: C.accent }}>RESUMO DO ÁUDIO</span>
            <Tag text="DADOS FICTÍCIOS" tone="muted" size={16} />
          </div>
          {LINES.map((l) => {
            const p = sp(t, c[l.cue] - 0.05, { damping: 13, stiffness: 190 });
            return (
              <div key={l.k} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 26, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * 40}px)` }}>
                <Mark ok size={44} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 30, color: C.accent }}>{l.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 38, color: C.text, marginTop: 2, lineHeight: 1.15 }}>{l.v}</div>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "right", marginTop: 18, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.accent, opacity: Math.min(1, sent * 1.5) }}>enviada ✓✓</div>
        </div>
        {/* 3 linhas */}
        {badge > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: Math.min(1, badge * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, badge))})` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "12px 34px", borderRadius: 30, background: C.surface2, border: `1px solid ${C.line}` }}>
              <span style={{ fontWeight: 800, fontSize: 70, color: C.text, letterSpacing: "-0.03em" }}>3 linhas</span>
              <span style={{ fontWeight: 700, fontSize: 40, color: C.muted }}>× 3 minutos</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
