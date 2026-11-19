import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { rnd } from "../../../lib/anim";

/** Peças do ATIVO REEL08 (desenhos próprios; cenário hipotético — valor da comissão mascarado, sem projeção financeira). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Bubble, Pro, Sobrado } from "../../EP-ATIVO-REEL07/scenes/ui";

/** Revisão do fechamento (lista da transição; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "ORIGEM DO CLIENTE", sub: "de onde veio a oportunidade" },
  { k: "INTERESSADOS", sub: "quem ainda está em negociação" },
  { k: "PRÓXIMO PASSO", sub: "retorno e prospecção na agenda" },
];

/** Confete discreto (comemoração), p = 0…1 da queda. */
export const Confetti: React.FC<{ p: number; x: number; y: number; w: number; n?: number; seed?: number }> = ({ p, x, y, w, n = 18, seed = 0 }) => {
  if (p <= 0 || p >= 1) return null;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const r = rnd(i * 7 + seed);
        const px = x + rnd(i * 3 + seed + 1) * w + Math.sin(p * 9 + i) * 18;
        const py = y - 60 + p * (380 + r * 220);
        const col = i % 3 === 0 ? BRAND.hex : i % 3 === 1 ? C.text : C.muted;
        return <div key={i} style={{ position: "absolute", left: px, top: py, width: 14, height: 24, borderRadius: 3, background: col, opacity: (1 - p) * 0.9, transform: `rotate(${p * 720 * (r - 0.5) + i * 40}deg)` }} />;
      })}
    </>
  );
};

/** Notificação ilustrativa de pagamento (valor sempre mascarado). */
export const PayNotif: React.FC<{ w: number; glow?: number }> = ({ w, glow = 0 }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface2, border: `2px solid ${glow > 0.5 ? brandAlpha(0.7) : C.line}`, boxShadow: `0 0 ${50 * glow}px ${brandAlpha(0.3)}, 0 30px 80px rgba(0,0,0,0.6)`, display: "flex", alignItems: "center", gap: 22, fontFamily: F.sans }}>
    <div style={{ width: 84, height: 84, borderRadius: 24, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 44, flex: "none" }}>$</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.muted }}>AGORA · CONTA</div>
      <div style={{ fontWeight: 800, fontSize: 42, letterSpacing: "-0.02em", color: C.text }}>Comissão recebida</div>
      <div style={{ fontWeight: 800, fontSize: 36, color: BRAND.hex }}>R$ ••••</div>
    </div>
  </div>
);

/** Mini calendário de mês (sem datas reais). */
export const Month: React.FC<{ w: number; label: string; marks?: number[]; dim?: number }> = ({ w, label, marks = [], dim = 0 }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: 18, borderRadius: 24, background: C.paper, fontFamily: F.sans, opacity: 1 - dim * 0.6 }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.ink, marginBottom: 10 }}>{label}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
      {Array.from({ length: 28 }).map((_, i) => <div key={i} style={{ height: w / 11, borderRadius: 6, background: marks.includes(i) ? BRAND.hex : "#DDD9CF" }} />)}
    </div>
  </div>
);
