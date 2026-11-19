import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, LeadChip, Tag, Track } from "./ui";

/**
 * CENA 3 — O MEIO. "Agora vem a parte que costuma ficar invisível." → 3 ACOMPANHAR aparece tracejado (INVISÍVEL) e ganha contorno. "É preciso
 * registrar o que ele procura, lembrar o que já foi explicado e acompanhar o momento da decisão." → FICHA DO INTERESSADO (ilustrativa)
 * marcada no tempo da fala. "Quem está comparando não precisa da mesma mensagem de quem pediu uma visita para amanhã." → colunas NOVO /
 * COMPARANDO / VISITA, cada uma com sua mensagem. Texto-chave: 3. ACOMPANHAR.
 */
const ROWS = ["O QUE PROCURA", "O QUE JÁ FOI EXPLICADO", "MOMENTO DA DECISÃO"];
const COLS = [
  { k: "NOVO", msg: "boas-vindas" },
  { k: "COMPARANDO", msg: "opções lado a lado" },
  { k: "VISITA", msg: "confirmar horário" },
];

export const Meio: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.m_agora - 0.35, { damping: 15, stiffness: 150 });
  const reveal = prog(t, c.m_invis - 0.1, 0.8, ease.inOut);
  const on = [1, 1, reveal, 0];
  const card = sp(t, c.m_invis + 0.2, { damping: 13, stiffness: 180 });
  const chk = [c.m_reg, c.m_lemb, c.m_acomp].map((x) => prog(t, x, 0.3, ease.out));
  const swap = prog(t, c.m_comp - 0.3, 0.5, ease.inOut);
  const cols = [c.m_comp - 0.2, c.m_comp, c.m_vis - 0.1].map((x) => sp(t, x, { damping: 12, stiffness: 190 }));
  const out = prog(t, c.p_quarta - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.m_agora - 0.35, s: 1.04, y: 0 },
          { t: ((c.m_agora - 0.35) + (c.m_invis + 0.3)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.m_invis + 0.3, s: 1.09, x: 20, y: -15, e: ease.inOut },
          { t: ((c.m_invis + 0.3) + (c.m_reg + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.m_reg + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.m_reg + 0.2) + (c.m_lemb + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.m_lemb + 0.2, s: 1.08, x: -15, y: -15, e: ease.inOut },
          { t: ((c.m_lemb + 0.2) + (c.m_acomp + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.m_acomp + 0.2, s: 1.05, x: 15, y: -10, e: ease.inOut },
          { t: ((c.m_acomp + 0.2) + (c.m_comp + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.m_comp + 0.3, s: 1.08, x: -15, y: -15, e: ease.inOut },
          { t: ((c.m_comp + 0.3) + (c.m_vis + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.m_vis + 0.3, s: 1.05, x: 15, y: -10, e: ease.inOut },
          { t: c.p_quarta, s: 1.07, y: -15, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 110, top: 410 }}><Track w={860} on={on} hi={2} t={t} /></div>
        {reveal < 1 ? <div style={{ position: "absolute", left: 640, top: 600, opacity: (1 - reveal) * Math.min(1, enter * 1.5) }}><Tag text="INVISÍVEL" tone="muted" size={26} style={{ color: C.text, border: `2px dashed ${C.dim}` }} /></div> : null}
        {card > 0.001 && swap < 1 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 650, boxSizing: "border-box", padding: "22px 26px", borderRadius: 30, background: C.surface, border: `2px solid ${chk[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, card * 1.5) * (1 - swap), transform: `translateY(${(1 - Math.min(1, card)) * 80 + swap * -60 + Math.sin(t * 1.5) * 6}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>FICHA DO INTERESSADO</Label>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {ROWS.map((r, i) => (
              <div key={r} style={{ marginTop: 14, height: 90, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: chk[i] > 0.5 ? BRAND.deep : C.surface2, transform: `translateX(${(1 - chk[i]) * 30}px)` }}>
                <CheckDot p={chk[i]} size={46} />
                <span style={{ fontWeight: 800, fontSize: 34, color: chk[i] > 0.5 ? C.text : C.muted }}>{r}</span>
              </div>
            ))}
          </div>
        ) : null}
        {swap > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 650, display: "flex", gap: 14, opacity: swap }}>
            {COLS.map((col, i) => {
              const p = cols[i];
              const hi = i > 0;
              return (
                <div key={col.k} style={{ flex: 1, boxSizing: "border-box", padding: 14, borderRadius: 26, background: hi && p > 0.5 ? BRAND.deep : C.surface, border: `2px solid ${hi && p > 0.5 ? BRAND.hex : C.line}`, minHeight: 440, opacity: mix(0.4, 1, Math.min(1, p)), transform: `translateY(${(1 - Math.min(1, p)) * 50 + Math.sin(t * 1.8 + i) * 7}px)` }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: hi ? BRAND.hex : C.muted, textAlign: "center" }}>{col.k}</div>
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}><LeadChip label="LEAD" w={260} tone={hi ? "good" : "plain"} /></div>
                  <div style={{ marginTop: 18, padding: "14px 12px", borderRadius: 18, borderBottomLeftRadius: 6, background: C.surface3, fontWeight: 800, fontSize: 28, color: C.text, textAlign: "center", opacity: prog(p, 0.4, 0.5, ease.out) }}>{col.msg}</div>
                </div>
              );
            })}
          </div>
        ) : null}
        {cols[2] > 0.5 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: prog(t, c.m_vis + 0.3, 0.4, ease.out) }}><Tag text="MENSAGEM CERTA PARA CADA MOMENTO" tone="accent" size={28} /></div> : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        3. <span style={{ color: BRAND.hex }}>ACOMPANHAR</span>
      </div>
    </div>
  );
};
