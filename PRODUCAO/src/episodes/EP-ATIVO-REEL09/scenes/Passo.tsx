import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import { IconCalendar } from "../../../components/Art";
import type { SceneProps } from "../../types";
import { IconChat, LeadCard, PropCard, Tag } from "./ui";

/**
 * CENA 3 — PRÓXIMO PASSO. "Depois, faria a chamada combinar com o vídeo." → o vídeo ganha uma CHAMADA coerente com ele. "Quem quer comparar
 * opções recebe um caminho para conversar. Quem quer conhecer recebe as condições para agendar." → dois caminhos: COMPARAR → CONVERSA e
 * CONHECER → AGENDAR. "E todo interessado precisa ter seu pedido registrado com clareza, mesmo quando a resposta não é imediata." → os dois
 * convergem no PEDIDO DO INTERESSADO (ilustrativo) com status AGUARDANDO RETORNO. Sem resposta automática. O CLIQUE NÃO É O FIM.
 */
export const Passo: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_dep - 0.35, { damping: 15, stiffness: 150 });
  const btn = sp(t, c.p_cham - 0.1, { damping: 11, stiffness: 210 });
  const a = sp(t, c.p_comp - 0.2, { damping: 12, stiffness: 190 });
  const a2 = sp(t, c.p_conv - 0.1, { damping: 12, stiffness: 200 });
  const b = sp(t, c.p_conh - 0.2, { damping: 12, stiffness: 190 });
  const b2 = sp(t, c.p_agen - 0.1, { damping: 12, stiffness: 200 });
  const conv = prog(t, c.p_todo - 0.2, 0.7, ease.inOut);
  const card = sp(t, c.p_todo + 0.2, { damping: 13, stiffness: 170 });
  const reg = prog(t, c.p_reg, 0.4, ease.out);
  const wait = prog(t, c.p_resp, 0.4, ease.out);
  const out = prog(t, c.c_parte - 0.45, 0.4, ease.in);
  const branch = (x: number, top: string, bot: string, p1: number, p2: number, icon: React.ReactNode) => (
    <div style={{ position: "absolute", left: x, top: 720, width: 380, opacity: Math.min(1, p1 * 1.5) * (1 - conv * 0.55), transform: `translateY(${(1 - Math.min(1, p1)) * 60 + conv * 30 + Math.sin(t * 2 + x) * 8}px) scale(${mix(1, 0.85, conv)})`, transformOrigin: "50% 0" }}>
      <div style={{ padding: "16px 20px", borderRadius: 22, background: C.surface2, border: `2px solid ${C.line}`, textAlign: "center", fontWeight: 800, fontSize: 34, color: C.text }}>{top}</div>
      <div style={{ margin: "0 auto", width: 6, height: mix(0, 50, Math.min(1, p2)), background: BRAND.hex }} />
      {p2 > 0.001 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "16px 20px", borderRadius: 22, background: BRAND.deep, border: `2px solid ${BRAND.hex}`, opacity: Math.min(1, p2 * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, p2))})` }}>
          {icon}
          <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{bot}</span>
        </div>
      ) : null}
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.3}
        t={t}
        keys={[
          { t: c.p_dep - 0.35, s: 1.065, y: 0 },
          { t: ((c.p_dep - 0.35) + (c.p_cham + 0.3)) / 2, s: 1.129, x: 30, y: -15, e: ease.inOut },
          { t: c.p_cham + 0.3, s: 1.104, x: 0, y: -32, e: ease.inOut },
          { t: ((c.p_cham + 0.3) + (c.p_comp + 0.3)) / 2, s: 1.129, x: -62, y: -15, e: ease.inOut },
          { t: c.p_comp + 0.3, s: 1.065, x: -64, y: -16, e: ease.inOut },
          { t: ((c.p_comp + 0.3) + (c.p_conh + 0.3)) / 2, s: 1.090, x: 30, y: -15, e: ease.inOut },
          { t: c.p_conh + 0.3, s: 1.065, x: 64, y: -16, e: ease.inOut },
          { t: ((c.p_conh + 0.3) + (c.p_todo + 0.4)) / 2, s: 1.090, x: 2, y: -15, e: ease.inOut },
          { t: c.p_todo + 0.4, s: 1.026, x: 0, y: 0, e: ease.inOut },
          { t: ((c.p_todo + 0.4) + (c.p_reg + 0.3)) / 2, s: 1.103, x: 30, y: -15, e: ease.inOut },
          { t: c.p_reg + 0.3, s: 1.078, x: 0, y: -16, e: ease.inOut },
          { t: ((c.p_reg + 0.3) + (c.p_resp + 0.3)) / 2, s: 1.103, x: -22, y: -15, e: ease.inOut },
          { t: c.p_resp + 0.3, s: 1.052, x: 16, y: 0, e: ease.inOut },
          { t: c.c_parte, s: 1.065, y: 0, e: ease.linear },
        ]}
      >
        {/* vídeo + chamada */}
        <div style={{ position: "absolute", left: 240, top: 400, width: 600, boxSizing: "border-box", padding: 16, borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 18, transform: `translateY(${(1 - Math.min(1, enter)) * 60 + Math.sin(t * 1.5) * 5}px)` }}>
          <div style={{ position: "relative", borderRadius: 18, overflow: "hidden" }}>
            <PropCard w={170} i={2} />
            <div style={{ position: "absolute", left: 60, top: 30, width: 0, height: 0, borderLeft: "40px solid rgba(255,255,255,0.9)", borderTop: "24px solid transparent", borderBottom: "24px solid transparent" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>SEU VÍDEO</div>
            <div style={{ marginTop: 10, padding: "12px 16px", borderRadius: 16, background: btn > 0.5 ? BRAND.hex : C.surface3, color: btn > 0.5 ? BRAND.ink : C.muted, fontWeight: 800, fontSize: 30, textAlign: "center", transform: `scale(${mix(0.7, 1, Math.min(1.08, btn)) * (1 + (btn > 0.5 ? 0.02 * Math.sin(t * 5) : 0))})`, boxShadow: btn > 0.5 ? `0 0 26px ${brandAlpha(0.45)}` : "none" }}>
              {btn > 0.5 ? "CHAMADA COMBINADA" : "CHAMADA?"}
            </div>
          </div>
        </div>
        {/* linhas do vídeo aos caminhos */}
        <svg width={1080} height={120} style={{ position: "absolute", left: 0, top: 600, opacity: Math.max(a, b) }}>
          <path d="M540 0 V40 Q540 70 290 90 V120" stroke={C.muted} strokeWidth={6} fill="none" strokeDasharray="400" strokeDashoffset={400 * (1 - Math.min(1, a))} />
          <path d="M540 40 Q540 70 790 90 V120" stroke={C.muted} strokeWidth={6} fill="none" strokeDasharray="400" strokeDashoffset={400 * (1 - Math.min(1, b))} />
        </svg>
        {[100, 600].map((x, k) => { const sl = prog(t, c.p_cham + 0.3 + k * 0.15, 0.4, ease.out); const p = k ? b : a; return sl > 0 && p < 0.6 ? <div key={k} style={{ position: "absolute", left: x, top: 720, width: 380, height: 190, boxSizing: "border-box", borderRadius: 22, border: `3px dashed ${C.dim}`, opacity: sl * (1 - Math.min(1, p * 1.6)) * (0.7 + 0.3 * Math.sin(t * 3 + k)) }} /> : null; })}
        {a > 0.001 ? branch(100, "QUER COMPARAR", "CONVERSAR", a, a2, <IconChat size={46} />) : null}
        {b > 0.001 ? branch(600, "QUER CONHECER", "AGENDAR", b, b2, <IconCalendar size={46} color={BRAND.hex} />) : null}
        {/* convergem no pedido registrado */}
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 140, top: 990, opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 80 + Math.sin(t * 1.7) * 10}px) rotate(${Math.sin(t * 1.2) * 1}deg)` }}>
            <LeadCard w={800} status={wait > 0.5 ? "AGUARDANDO RETORNO" : "REGISTRADO"} glow={reg}>
              <div style={{ marginTop: 12, display: "flex", gap: 12, opacity: reg }}>
                <Tag text="INTERESSE: COMPARAR / VISITAR" tone="muted" size={24} style={{ color: C.text }} />
              </div>
            </LeadCard>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        O CLIQUE <span style={{ color: BRAND.hex }}>NÃO É O FIM</span>
      </div>
    </div>
  );
};
