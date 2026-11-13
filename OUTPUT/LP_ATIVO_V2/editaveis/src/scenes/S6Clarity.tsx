import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, NEON } from "../kit";

/**
 * CLAREZA v2. "Na prática, você deixa de depender tanto da memória e passa a ter mais clareza sobre quem precisa de retorno,
 * qual negociação precisa avançar e o que merece sua atenção agora."
 * Lembretes soltos ("de memória") voam para um painel HOJE e viram linhas organizadas, cada uma no instante em que é dita:
 * retorno → Paula · negociação → Proposta — Mariana · atenção agora → Visita — 14:30. O texto grande é a transcrição embaixo.
 */
const NOTES = [
  { k: "ligar pra…?", x: 300, y: 160, r: -6 },
  { k: "visita era 14h ou 15h?", x: 1250, y: 130, r: 5 },
  { k: "proposta de quem?", x: 220, y: 520, r: 4 },
  { k: "retomar quando?", x: 1330, y: 520, r: -4 },
  { k: "fotos atualizadas?", x: 780, y: 650, r: 3 },
];
const ROWS = [
  { tag: "RETORNO", a: "Paula", d: "pediu retorno hoje", cue: "c_quem", off: 0.35, col: "#E8B86A" },
  { tag: "NEGOCIAÇÃO", a: "Proposta — Mariana", d: "aguardando resposta", cue: "c_qual", off: 0.5, col: NEON },
  { tag: "AGORA", a: "Visita — 14:30", d: "confirmar com o cliente", cue: "c_merece", off: 0.1, col: C.cold },
];

export const S6Clarity: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const notesIn = NOTES.map((_, i) => prog(t, c.c_na - 0.15 + i * 0.1, 0.3, ease.out));
  const suck = prog(t, c.c_mem + 0.2, 0.8, ease.inOut);
  const panel = sp(t, c.c_clar - 0.2, { damping: 15, stiffness: 150 });
  const out = prog(t, c.x_mas - 0.1, 0.9, ease.inOut);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Cam t={t} keys={[{ t: c.c_na - 0.3, s: 1.08 }, { t: c.c_clar, s: 0.98, e: ease.inOut }, { t: c.c_merece + 0.6, s: 1.06, y: 20, e: ease.inOut }, { t: c.x_mas, s: 1.0, e: ease.inOut }]}>
        {/* lembretes de memória → painel */}
        {NOTES.map((n, i) => (
          <div key={n.k} style={{ position: "absolute", left: mix(n.x + Math.sin(t * 1.2 + i) * 14, 900, suck), top: mix(n.y + Math.cos(t + i) * 10, 360, suck), opacity: notesIn[i] * (1 - prog(suck, 0.6, 0.4, ease.linear)), transform: `rotate(${n.r * (1 - suck)}deg) scale(${mix(1, 0.3, suck)})`, padding: "20px 30px", borderRadius: 12, background: "#E9E3C9", color: "#2A2A22", fontWeight: 700, fontSize: 40, fontStyle: "italic", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
            {n.k}
          </div>
        ))}
        {/* painel HOJE */}
        <div style={{ position: "absolute", left: 260, top: 70, width: 1400, height: 690, boxSizing: "border-box", borderRadius: 40, background: "rgba(13,20,17,0.96)", border: "2px solid rgba(58,245,132,0.35)", boxShadow: "0 50px 120px rgba(0,0,0,0.6)", padding: "40px 54px", opacity: Math.min(1, panel * 1.4), transform: `scale(${mix(0.85, 1, Math.min(1, panel))})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: NEON, boxShadow: "0 0 20px rgba(58,245,132,0.7)" }} />
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.14em", color: NEON }}>HOJE</span>
          </div>
          {ROWS.map((r) => {
            const a = sp(t, c[r.cue] + r.off, { damping: 13, stiffness: 190 });
            return (
              <div key={r.tag} style={{ display: "flex", alignItems: "center", gap: 30, height: 172, borderTop: "1px solid rgba(255,255,255,0.08)", opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * 80}px)` }}>
                <div style={{ width: 22, height: 90, borderRadius: 11, background: r.col }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.12em", color: r.col }}>{r.tag}</div>
                  <div style={{ fontWeight: 800, fontSize: 62, letterSpacing: "-0.02em", color: C.text, lineHeight: 1.05 }}>{r.a}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 34, color: C.muted }}>{r.d}</div>
              </div>
            );
          })}
        </div>
      </Cam>
    </div>
  );
};
