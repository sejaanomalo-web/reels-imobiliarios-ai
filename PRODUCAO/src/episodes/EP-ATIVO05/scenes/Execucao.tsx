import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { House, Tag } from "./ui";

/**
 * CENA 4 — A EXECUÇÃO. "…mantenha uma fonte de informação atualizada: status do imóvel, visitas agendadas, retorno do interessado e
 * próximo movimento." → duas telas (Corretor A e Corretor B) mostram a MESMA ficha do imóvel; cada linha preenche na fala e o pulso de
 * sincronia atravessa. INTERFACE ILUSTRATIVA — não mostra funcionalidade real do produto. "Se surgir uma mudança, os dois precisam
 * saber antes de falar com o cliente." → o status muda em A, sincroniza em B, e só então a conversa com o cliente é liberada.
 */
const ROWS = [
  { k: "STATUS", v: "Em negociação", v2: "Proposta recebida" },
  { k: "VISITAS", v: "Sáb · 10:00", v2: "Sáb · 10:00" },
  { k: "RETORNO", v: "Gostou da planta", v2: "Gostou da planta" },
  { k: "PRÓXIMO", v: "Enviar documentos", v2: "Alinhar resposta" },
];

const Screen: React.FC<{ x: number; who: string; bg: string; rows: number[]; changed: number; synced: number; t: number }> = ({ x, who, bg, rows, changed, synced, t }) => (
  <div style={{ position: "absolute", left: x, top: 520, width: 420, height: 640, borderRadius: 46, background: "#0B0D10", border: `3px solid ${synced > 0.5 ? BRAND.hex : "rgba(255,255,255,0.16)"}`, boxShadow: `0 40px 90px rgba(0,0,0,0.6)${synced > 0.5 ? `, 0 0 40px ${brandAlpha(0.25)}` : ""}`, overflow: "hidden", fontFamily: F.sans, transform: `translateY(${Math.sin(t * 1.3 + x) * 5}px)` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "26px 26px 18px" }}>
      <div style={{ width: 54, height: 54, borderRadius: 27, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26, color: C.text }}>{who}</div>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.muted }}>CORRETOR {who}</div>
    </div>
    <div style={{ margin: "0 20px", borderRadius: 26, background: C.surface, border: `1px solid ${C.line}`, padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <House size={44} color={BRAND.hex} />
        <div style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Apto Centro</div>
      </div>
      {ROWS.map((r, i) => {
        const p = rows[i];
        const useNew = (i === 0 || i === 3) && changed > 0.5;
        return (
          <div key={r.k} style={{ marginTop: 16, opacity: mix(0.3, 1, p) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.08em", color: C.muted }}>{r.k}</div>
            <div style={{ fontWeight: 800, fontSize: 32, lineHeight: 1.12, color: useNew ? BRAND.hex : C.text, minHeight: 36 }}>{p > 0.5 ? (useNew ? r.v2 : r.v) : "—"}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export const Execucao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.e_dur - 0.25, { damping: 15, stiffness: 140 });
  const rows = [c.e_status, c.e_vis, c.e_ret, c.e_prox].map((a) => prog(t, a - 0.05, 0.3, ease.out));
  const rowsB = [c.e_status, c.e_vis, c.e_ret, c.e_prox].map((a) => prog(t, a + 0.25, 0.3, ease.out));
  const changeA = prog(t, c.e_mud + 0.1, 0.3, ease.out);
  const changeB = prog(t, c.e_dois + 0.1, 0.3, ease.out);
  const pulse = (t0: number) => prog(t, t0, 0.55, ease.inOut);
  const pulses = [c.e_status, c.e_vis, c.e_ret, c.e_prox, c.e_mud + 0.15].map((a) => pulse(a + 0.05));
  const client = sp(t, c.e_cli - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.i_forte - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.e_dur - 0.3, s: 0.95, y: 40 },
          { t: c.e_status, s: 1.0, y: 0, e: ease.inOut },
          { t: c.e_prox + 0.6, s: 1.04, y: 10, e: ease.inOut },
          { t: c.e_mud + 0.2, s: 1.08, x: 0, y: 20, e: ease.inOut },
          { t: c.e_cli + 0.6, s: 1.0, y: 0, e: ease.inOut },
          { t: c.i_forte, s: 1.02, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 80, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.text, opacity: Math.min(1, enter * 1.5) }}>
          UMA FONTE, <span style={{ color: BRAND.hex }}>ATUALIZADA</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: Math.min(1, enter * 1.5) }}>
          <Tag text="INTERFACE ILUSTRATIVA" tone="muted" size={24} />
        </div>
        <Screen x={90} who="A" bg="#4E6A8C" rows={rows} changed={changeA} synced={changeB} t={t} />
        <Screen x={570} who="B" bg="#8C6A4E" rows={rowsB} changed={changeB} synced={changeB} t={t} />
        {/* pulsos de sincronia A → B */}
        {pulses.map((p, i) =>
          p > 0.01 && p < 0.99 ? <div key={i} style={{ position: "absolute", left: mix(500, 580, p) - 12, top: 830 - 12, width: 24, height: 24, borderRadius: 12, background: BRAND.hex, boxShadow: `0 0 24px ${brandAlpha(0.8)}`, opacity: Math.sin(p * Math.PI) }} /> : null,
        )}
        {/* só depois: falar com o cliente */}
        {client > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1190, display: "flex", justifyContent: "center", opacity: Math.min(1, client * 1.5), transform: `translateY(${(1 - Math.min(1, client)) * 30}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 28px", borderRadius: 999, background: C.surface2, border: `2px solid ${BRAND.hex}` }}>
              <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>
                Os dois sabem <span style={{ color: BRAND.hex }}>→</span> agora, o cliente
              </span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
