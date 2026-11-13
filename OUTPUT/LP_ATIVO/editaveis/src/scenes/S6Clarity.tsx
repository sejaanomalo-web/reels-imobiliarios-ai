import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, NEON } from "../kit";

/**
 * CENA 06 — RESULTADO PERCEBIDO (67–77 s). "Na prática, você deixa de depender tanto da memória e passa a ter mais clareza sobre
 * quem precisa de retorno, qual negociação precisa avançar e o que merece sua atenção agora."
 * Tela limpa. Lembretes soltos ("de memória") se dissolvem → MAIS CLAREZA. Depois três perguntas com resposta:
 * QUEM PRECISA DE RETORNO? Paula · O QUE PRECISA AVANÇAR? Proposta — Mariana · QUAL É O PRÓXIMO PASSO? Visita — 14:30;
 * fecho MAIS CLAREZA PARA DECIDIR O QUE FAZER AGORA.
 */
const NOTES = [
  { k: "ligar pra…?", x: 360, y: 300, r: -6 },
  { k: "visita era 14h ou 15h?", x: 1180, y: 250, r: 5 },
  { k: "proposta de quem?", x: 280, y: 640, r: 4 },
  { k: "retomar quando?", x: 1260, y: 640, r: -4 },
  { k: "fotos atualizadas?", x: 760, y: 820, r: 3 },
];
const QA = [
  { q: "QUEM PRECISA DE RETORNO?", a: "Paula", cue: "c_quem", col: "#E8B86A" },
  { q: "O QUE PRECISA AVANÇAR?", a: "Proposta — Mariana", cue: "c_qual", col: NEON },
  { q: "QUAL É O PRÓXIMO PASSO?", a: "Visita — 14:30", cue: "c_merece", col: C.cold },
];

export const S6Clarity: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const notesIn = NOTES.map((_, i) => prog(t, c.c_na - 0.1 + i * 0.14, 0.4, ease.out));
  const dissolve = prog(t, c.c_mem + 0.3, 0.9, ease.inOut);
  const mem = sp(t, c.c_mem - 0.1, { damping: 14, stiffness: 170 });
  const clar = sp(t, c.c_clar - 0.1, { damping: 14, stiffness: 170 });
  const phaseB = prog(t, c.c_quem - 0.35, 0.4, ease.inOut);
  const fin = prog(t, c.c_merece + 0.75, 0.5, ease.out);
  const out = prog(t, c.x_mas - 0.1, 1.1, ease.inOut);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Cam t={t} keys={[{ t: c.c_na - 0.3, s: 1.05 }, { t: c.c_clar, s: 1.0, e: ease.inOut }, { t: c.c_quem, s: 1.04, e: ease.inOut }, { t: c.x_mas, s: 1.0, e: ease.inOut }]}>
        {/* fase A — memória → clareza */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - phaseB }}>
          {NOTES.map((n, i) => (
            <div key={n.k} style={{ position: "absolute", left: n.x + Math.sin(t + i) * 10 + (960 - n.x) * dissolve * 0.6, top: n.y + Math.cos(t * 0.8 + i) * 8 + (540 - n.y) * dissolve * 0.6, opacity: notesIn[i] * (1 - dissolve), transform: `rotate(${n.r * (1 - dissolve)}deg) scale(${mix(1, 0.5, dissolve)})`, filter: `blur(${dissolve * 10}px)`, padding: "16px 24px", borderRadius: 10, background: "#E9E3C9", color: "#2A2A22", fontWeight: 700, fontSize: 30, fontStyle: "italic", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
              {n.k}
            </div>
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontWeight: 800, fontSize: 104, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            <div style={{ color: `rgba(244,245,247,${mix(1, 0.35, Math.min(1, clar))})`, opacity: Math.min(1, mem * 1.5), transform: `translateY(${(1 - Math.min(1, mem)) * 30}px)` }}>
              MENOS <span style={{ textDecoration: clar > 0.5 ? "line-through" : "none", textDecorationThickness: 8 }}>MEMÓRIA</span>.
            </div>
            <div style={{ color: NEON, opacity: Math.min(1, clar * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, clar))})` }}>MAIS CLAREZA.</div>
          </div>
        </div>
        {/* fase B — perguntas e respostas */}
        <div style={{ position: "absolute", inset: 0, opacity: phaseB }}>
          {QA.map((x, i) => {
            const q = prog(t, c[x.cue] - 0.3, 0.45, ease.out);
            const a = sp(t, c[x.cue] + 0.55, { damping: 12, stiffness: 200 });
            const y = 170 + i * 190;
            return (
              <div key={x.q} style={{ position: "absolute", left: 200, right: 200, top: y, height: 150, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text, opacity: q, transform: `translateX(${(1 - q) * -50}px)` }}>{x.q}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 30px", borderRadius: 40, background: "rgba(16,24,21,0.95)", border: `3px solid ${x.col}`, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, a))})`, boxShadow: `0 0 40px ${x.col}33` }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: x.col }} />
                  <span style={{ fontWeight: 800, fontSize: 48, color: C.text, whiteSpace: "nowrap" }}>{x.a}</span>
                </div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 790, textAlign: "center", fontWeight: 800, fontSize: 66, letterSpacing: "-0.03em", color: C.text, opacity: fin, transform: `translateY(${(1 - fin) * 30}px)` }}>
            MAIS CLAREZA PARA DECIDIR <span style={{ color: NEON }}>O QUE FAZER AGORA.</span>
          </div>
        </div>
      </Cam>
    </div>
  );
};
