import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Count, Head, Label, PropCard, Question, Tag } from "./ui";

/**
 * CENA 3 — 2. ENTENDER O MOTIVO. "Segunda: fazer uma pergunta antes de responder com um catálogo." → 2/3; a pilha de catálogo para no ar e
 * dá lugar ao balão "?". "Quando alguém fala de três quartos, pode estar pensando em filhos, home office ou receber família." → três quartos
 * vazios ganham, cada um, um uso possível (FILHOS / HOME OFFICE / RECEBER FAMÍLIA). "A motivação muda quais imóveis vale apresentar." → a
 * seleção muda conforme o uso (cartões genéricos se reorganizam).
 */
const USES = [
  { k: "FILHOS", icon: "M8 8a3 3 0 1 0 0-.01M16 9a2.4 2.4 0 1 0 0-.01M3 20c.8-3.6 2.6-5.4 5-5.4s4.2 1.8 5 5.4M12.5 20c.6-2.6 1.8-4 3.5-4s2.9 1.4 3.5 4" },
  { k: "HOME OFFICE", icon: "M4 6h16v10H4zM2 19h20M9 16v3M15 16v3" },
  { k: "RECEBER FAMÍLIA", icon: "M3 11l9-7 9 7v9H3zM9 20v-6h6v6" },
];

export const Dois: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.d_seg - 0.35, { damping: 15, stiffness: 150 });
  const head = sp(t, c.d_seg - 0.1, { damping: 13, stiffness: 180 });
  const q = sp(t, c.d_perg - 0.1, { damping: 11, stiffness: 210 });
  const freeze = prog(t, c.d_perg - 0.2, 0.4, ease.out);
  const catGone = prog(t, c.d_catal + 0.3, 0.5, ease.in);
  const rooms = sp(t, c.d_seg + 0.6, { damping: 13, stiffness: 190 });
  const roomsLbl = sp(t, c.d_quartos - 0.2, { damping: 13, stiffness: 190 });
  const uses = [c.d_filhos, c.d_home, c.d_receber].map((x) => sp(t, x - 0.1, { damping: 12, stiffness: 210 }));
  const motiv = sp(t, c.d_motiv - 0.1, { damping: 12, stiffness: 200 });
  const shuffle = prog(t, c.d_motiv + 0.2, 1.2, ease.inOut);
  const out = prog(t, c.t_terc - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_seg - 0.35, s: 1.04, y: -20 },
          { t: c.d_perg + 0.3, s: 1.06, y: 10, e: ease.inOut },
          { t: c.d_catal + 0.3, s: 1.02, x: 30, y: 0, e: ease.inOut },
          { t: c.d_quartos + 0.3, s: 1.0, x: 0, y: 30, e: ease.inOut },
          { t: c.d_filhos + 0.1, s: 1.04, x: -40, y: 40, e: ease.inOut },
          { t: c.d_receber + 0.2, s: 1.04, x: 40, y: 40, e: ease.inOut },
          { t: c.d_motiv + 0.4, s: 1.02, x: 0, y: 70, e: ease.inOut },
          { t: c.d_apres, s: 1.05, x: -20, y: 90, e: ease.inOut },
          { t: c.t_terc, s: 1.03, y: 70, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, top: 300 }}><Head n={2} text="Entender o motivo" p={head} /></div>
        {/* catálogo parado → pergunta */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 440, height: 260, opacity: 1 - catGone }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const fall = ((t * 0.9 + i * 0.2) % 1) * (1 - freeze) + 0.35 * freeze;
            return <div key={i} style={{ position: "absolute", left: 120 + i * 170, top: -60 + fall * 160, transform: `rotate(${(i - 2) * 6}deg)`, opacity: mix(1, 0.35, freeze) }}><PropCard w={150} i={i} dim={freeze * 0.7} /></div>;
          })}
          <div style={{ position: "absolute", left: 120, top: 220, opacity: mix(1, 0.4, freeze) }}><Label size={24}>CATÁLOGO</Label></div>
          {q > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 30, display: "flex", justifyContent: "center", opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, q))})`, zIndex: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 30px", borderRadius: 34, borderBottomLeftRadius: 8, background: C.surface, border: `3px solid ${BRAND.hex}`, boxShadow: `0 0 40px ${brandAlpha(0.3)}` }}>
                <Question size={90} />
                <span style={{ fontWeight: 800, fontSize: 46, color: C.text }}>Pergunta antes</span>
              </div>
            </div>
          ) : null}
        </div>
        {/* três quartos → três usos */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 720, opacity: Math.min(1, rooms * 1.5), transform: `translateY(${(1 - Math.min(1, rooms)) * 60}px)` }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, opacity: Math.min(1, roomsLbl * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, roomsLbl))})` }}><Tag text="“TRÊS QUARTOS”" tone="muted" size={30} style={{ color: C.text }} /></div>
          <div style={{ display: "flex", gap: 20 }}>
            {USES.map((u, i) => {
              const p = uses[i];
              const slot = [1, 2, 0][i];
              const x = shuffle * (slot - i) * 0;
              return (
                <div key={u.k} style={{ flex: 1, height: 250, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `3px ${p > 0.5 ? "solid" : "dashed"} ${p > 0.5 ? BRAND.hex : C.dim}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, transform: `translateX(${x}px) translateY(${Math.sin(t * 1.7 + i) * 4}px)`, boxShadow: p > 0.5 ? `0 0 26px ${brandAlpha(0.2)}` : "none" }}>
                  <Label size={22} color={C.dim}>QUARTO {i + 1}</Label>
                  <svg width={80} height={80} viewBox="0 0 24 24" fill="none" style={{ opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, p))})` }}><path d={u.icon} stroke={BRAND.hex} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, textAlign: "center", color: C.text, opacity: Math.min(1, p * 1.5) }}>{u.k}</span>
                </div>
              );
            })}
          </div>
        </div>
        {motiv > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1060, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: Math.min(1, motiv * 1.5) }}>
            <Tag text="MOTIVAÇÃO → SELEÇÃO" tone="accent" size={30} />
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2].map((k) => <div key={k} style={{ transform: `translateY(${Math.sin(shuffle * Math.PI + k) * -16}px)` }}><PropCard w={110} i={k + (shuffle > 0.5 ? 3 : 0)} ok={shuffle > 0.6} /></div>)}
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", right: 100, top: 260 }}><Count n={2} p={head} /></div>
    </div>
  );
};
