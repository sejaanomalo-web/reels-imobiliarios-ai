import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 4 — CONTINUIDADE. "A parte mais importante vem depois: marcar quem recebeu informações, quem ficou de responder e quando vale
 * retomar a conversa." → QUADRO DE ACOMPANHAMENTO (ilustrativo) com três colunas marcadas no tempo da fala. "Não é o anúncio sozinho que
 * faz o processo funcionar." → o cartão ANÚNCIO isolado apaga. "É o encaixe entre conteúdo, atendimento e acompanhamento." → três peças
 * CONTEÚDO → ATENDIMENTO → ACOMPANHAMENTO se encaixam: 3 PARTES CONECTADAS.
 */
const COLS = [
  { k: "RECEBEU INFO", n: 2 },
  { k: "VAI RESPONDER", n: 2 },
  { k: "RETOMAR EM", n: 1 },
];

export const Cont: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_parte - 0.35, { damping: 15, stiffness: 150 });
  const at = [c.c_receb, c.c_resp, c.c_ret];
  const cols = at.map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const boardOut = prog(t, c.c_nao - 0.2, 0.5, ease.inOut);
  const ad = sp(t, c.c_anun - 0.3, { damping: 12, stiffness: 190 });
  const adDim = prog(t, c.c_anun + 0.5, 0.6, ease.out);
  const pieces = [c.c_cont, c.c_atend, c.c_acomp].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 190 }));
  const snap = prog(t, c.c_acomp + 0.4, 0.4, ease.out);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.3}
        t={t}
        keys={[
          { t: c.c_parte - 0.35, s: 1.052, y: 0 },
          { t: ((c.c_parte - 0.35) + (c.c_receb + 0.2)) / 2, s: 1.070, x: 0, y: -15, e: ease.inOut },
          { t: c.c_receb + 0.2, s: 1.070, x: -28, y: -16, e: ease.inOut },
          { t: ((c.c_receb + 0.2) + (c.c_resp + 0.2)) / 2, s: 1.070, x: -27, y: -15, e: ease.inOut },
          { t: c.c_resp + 0.2, s: 1.070, x: 0, y: -16, e: ease.inOut },
          { t: ((c.c_resp + 0.2) + (c.c_ret + 0.2)) / 2, s: 1.070, x: 27, y: -15, e: ease.inOut },
          { t: c.c_ret + 0.2, s: 1.070, x: 28, y: -16, e: ease.inOut },
          { t: ((c.c_ret + 0.2) + (c.c_nao + 0.3)) / 2, s: 1.070, x: 0, y: -15, e: ease.inOut },
          { t: c.c_nao + 0.3, s: 1.026, x: 0, y: 0, e: ease.inOut },
          { t: ((c.c_nao + 0.3) + (c.c_cont + 0.2)) / 2, s: 1.070, x: 13, y: -15, e: ease.inOut },
          { t: c.c_cont + 0.2, s: 1.065, x: 0, y: -32, e: ease.inOut },
          { t: ((c.c_cont + 0.2) + (c.c_acomp + 0.5)) / 2, s: 1.070, x: -13, y: -15, e: ease.inOut },
          { t: c.c_acomp + 0.5, s: 1.039, x: 0, y: -16, e: ease.inOut },
          { t: c.cta_quer, s: 1.065, y: -16, e: ease.linear },
        ]}
      >
        {/* quadro de acompanhamento */}
        <div style={{ position: "absolute", left: 90, right: 90, top: 420, boxSizing: "border-box", padding: "22px 22px 26px", borderRadius: 32, background: C.surface, border: `2px solid ${C.line}`, opacity: Math.min(1, enter * 1.5) * (1 - boardOut), transform: `translateY(${boardOut * -60 + Math.sin(t * 1.4) * 10}px) scale(${mix(1, 0.9, boardOut)}) rotate(${Math.sin(t * 0.9) * 0.8}deg)`, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: ((t * 420) % 1400) - 300, width: 220, background: `linear-gradient(90deg, transparent, ${brandAlpha(0.1)}, transparent)` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label size={26} color={C.text}>QUADRO DE ACOMPANHAMENTO</Label>
            <Tag text="ILUSTRATIVO" tone="muted" size={24} />
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 14 }}>
            {COLS.map((col, i) => (
              <div key={col.k} style={{ flex: 1, padding: 14, borderRadius: 22, background: cols[i] > 0.5 ? BRAND.deep : C.surface2, border: `2px solid ${cols[i] > 0.5 ? BRAND.hex : "transparent"}`, minHeight: 470 }}>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: cols[i] > 0.5 ? BRAND.hex : C.muted }}>{col.k}</div>
                {Array.from({ length: col.n }).map((_, k) => {
                  const p = prog(t, at[i] + k * 0.25, 0.35, ease.out);
                  return (
                    <div key={k} style={{ marginTop: 14, height: 120, boxSizing: "border-box", padding: 14, borderRadius: 18, background: C.surface3, opacity: p, transform: `translateY(${(1 - p) * -40}px) rotate(${Math.sin(t * 1.8 + i + k) * 2.5}deg) translateX(${Math.sin(t * 2.2 + i * 2 + k) * 6}px)` }}>
                      <div style={{ width: 52, height: 52, borderRadius: 26, background: "#3A3F4A" }} />
                      <div style={{ marginTop: 12, height: 12, width: "80%", borderRadius: 6, background: "#4A505B" }} />
                    </div>
                  );
                })}
                {i === 2 && cols[2] > 0.5 ? <div style={{ marginTop: 14, padding: "8px 10px", borderRadius: 12, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 26, textAlign: "center", opacity: prog(t, c.c_ret + 0.4, 0.3, ease.out) }}>DIA COMBINADO</div> : null}
              </div>
            ))}
          </div>
        </div>
        {/* o anúncio sozinho */}
        {ad > 0.001 && pieces[0] < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: Math.min(1, ad * 1.5) * mix(1, 0.7, adDim) * (1 - Math.min(1, pieces[0] * 2)) }}>
            <div style={{ padding: "26px 40px", borderRadius: 30, background: C.surface2, border: `3px dashed ${C.dim}`, textAlign: "center", transform: `scale(${mix(0.6, 1, Math.min(1, ad))}) rotate(${Math.sin(t * 2) * 4}deg) translateY(${Math.sin(t * 2.6) * 12}px)` }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>SÓ O</div>
              <div style={{ fontWeight: 800, fontSize: 72, letterSpacing: "-0.03em", color: C.text }}>ANÚNCIO</div>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.warn, opacity: adDim }}>NÃO SUSTENTA O PROCESSO</div>
            </div>
          </div>
        ) : null}
        {/* três partes conectadas */}
        {STEPS.map((s, i) => {
          const p = pieces[i];
          if (p <= 0.001) return null;
          return (
            <div key={s.k} style={{ position: "absolute", left: 140, right: 140, top: 520 + i * 200, height: 150, boxSizing: "border-box", padding: "0 30px", borderRadius: 30, background: i === 2 ? BRAND.deep : C.surface2, border: `3px solid ${snap > 0.5 || i === 2 ? BRAND.hex : brandAlpha(0.4)}`, display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * (i % 2 ? 200 : -200)}px)`, boxShadow: snap > 0.5 ? `0 0 30px ${brandAlpha(0.25)}` : "none" }}>
              <CheckDot p={snap > 0.5 ? 1 : 0} size={50} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em", color: C.text }}>{s.k}</div>
                <div style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>{s.sub}</div>
              </div>
            </div>
          );
        })}
        {[0, 1].map((k) => (pieces[k + 1] > 0.5 ? <div key={k} style={{ position: "absolute", left: 532, top: 670 + k * 200, width: 16, height: 50, borderRadius: 8, background: BRAND.hex, transformOrigin: "50% 0", transform: `scaleY(${prog(pieces[k + 1], 0.5, 0.5, ease.out)})`, boxShadow: `0 0 14px ${brandAlpha(0.5)}` }} /> : null))}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        {t >= c.c_enc - 0.2 ? <>3 PARTES <span style={{ color: BRAND.hex }}>CONECTADAS</span></> : <>A PARTE <span style={{ color: BRAND.hex }}>MAIS IMPORTANTE</span></>}
      </div>
    </div>
  );
};
