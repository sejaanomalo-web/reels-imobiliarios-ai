import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, NEON } from "../kit";

/**
 * DOR (v3), uma imagem para cada frase:
 * "E muitas vezes o problema não é falta de cliente." → uma multidão de clientes (fictícios) enche a tela.
 * "Nem falta de trabalho." → a agenda da semana lota de compromissos.
 * "É não conseguir enxergar, com clareza, tudo o que já está acontecendo." → tudo embaça; uma lupa só deixa ver um pedaço, e o que
 *    está fora dela continua se mexendo.
 * "Porque quando informação fica espalhada," → mensagens, caderno, planilha, e-mail, post-it e agenda explodem para os cantos.
 * "uma oportunidade pode simplesmente ficar para trás." → o cartão da Paula afunda no fundo da tela, perde a cor e some.
 */
const AV_BG = ["#4E6A8C", "#8C6A4E", "#5A7A6E", "#6A5A8C", "#7A5A6E", "#5A6E8C", "#8C7A4E", "#6E7A5A"];
const INI = ["AL", "BR", "CM", "DF", "EG", "FH", "GI", "HJ", "IK", "JL", "KM", "LN", "MO", "NP", "OQ", "PR", "QS", "RT", "SU", "TV", "UX", "VZ", "WA", "XB", "YC", "ZD", "AE", "BF"];
const DAYS = ["SEG", "TER", "QUA", "QUI", "SEX"];
const SOURCES = [
  { k: "Mensagens", i: "❝", x: 120, y: 90 },
  { k: "Caderno", i: "✎", x: 1480, y: 110 },
  { k: "Planilha", i: "▦", x: 90, y: 600 },
  { k: "E-mail", i: "✉", x: 1530, y: 620 },
  { k: "Post-it", i: "▣", x: 780, y: 40 },
  { k: "Agenda", i: "◷", x: 800, y: 700 },
];

export const S3Pain: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.d_e - 0.05, 0.3, ease.out);
  // A — clientes
  const crowd = (i: number) => prog(t, c.d_e + 0.1 + i * 0.07, 0.3, ease.out);
  const crowdShift = prog(t, c.d_nem - 0.1, 0.6, ease.inOut); // vai para a esquerda
  // B — agenda
  const agenda = prog(t, c.d_nem - 0.05, 0.4, ease.out);
  const block = (i: number) => prog(t, c.d_nem + 0.15 + i * 0.045, 0.2, ease.out);
  // C — enxergar com clareza
  const fog = prog(t, c.d_ver - 0.1, 0.6, ease.inOut) * (1 - prog(t, c.d_porque - 0.2, 0.4, ease.in));
  const lensT = (t - c.d_ver) / Math.max(0.1, c.d_porque - c.d_ver);
  const lx = 960 + Math.sin(lensT * Math.PI * 2.2) * 560;
  const ly = 400 + Math.cos(lensT * Math.PI * 3.1) * 200;
  const lr = mix(210, 120, prog(t, c.d_acont - 0.6, 0.8, ease.inOut)) * (1 + 0.06 * Math.sin(t * 9));
  // D — espalhada
  const phaseD = prog(t, c.d_porque - 0.2, 0.4, ease.inOut);
  const burst = prog(t, c.d_esp - 0.15, 0.55, ease.out);
  // E — ficar para trás
  const opp = sp(t, c.d_op - 0.15, { damping: 13, stiffness: 160 });
  const sink = prog(t, c.d_op + 0.4, c.d_tras_end - c.d_op - 0.3, ease.inOut);
  const gone = prog(t, c.d_tras_end - 0.15, 0.4, ease.in);
  const out = prog(t, c.v_foi - 0.35, 0.3, ease.in);
  const ab = (1 - phaseD); // A+B+C visíveis até "Porque quando..."

  const blur = `blur(${fog * 9}px)`;
  const content = (sharp: boolean) => (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* A — multidão de clientes */}
      {INI.map((s, i) => {
        const a = crowd(i);
        const col = i % 7;
        const row = Math.floor(i / 7);
        const x = mix(560 + col * 120, 120 + col * 92, crowdShift);
        const y = mix(170 + row * 130, 210 + row * 105, crowdShift);
        const size = mix(96, 76, crowdShift);
        return (
          <div key={s} style={{ position: "absolute", left: x + (1 - a) * 300 + Math.sin(t * 2 + i) * 3, top: y + Math.cos(t * 1.7 + i) * 3, width: size, height: size, borderRadius: size / 2, background: AV_BG[i % AV_BG.length], color: C.text, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.34, opacity: a, transform: `scale(${mix(0.4, 1, a)})`, boxShadow: "0 10px 24px rgba(0,0,0,0.45)" }}>
            {s}
          </div>
        );
      })}
      {/* B — agenda lotada */}
      <div style={{ position: "absolute", left: 860, top: 120, width: 960, height: 620, opacity: agenda, transform: `translateX(${(1 - agenda) * 200}px)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "rgba(13,20,17,0.95)", border: "2px solid rgba(255,255,255,0.1)" }} />
        {DAYS.map((d, i) => (
          <div key={d} style={{ position: "absolute", left: 30 + i * 182, top: 22, width: 170, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, letterSpacing: "0.1em" }}>{d}</div>
        ))}
        {Array.from({ length: 30 }).map((_, i) => {
          const d = i % 5;
          const r = Math.floor(i / 5);
          const a = block(i);
          const hue = rnd(i * 2.3) < 0.33 ? "rgba(58,245,132,0.55)" : rnd(i * 2.3) < 0.66 ? "rgba(143,180,227,0.55)" : "rgba(232,184,106,0.55)";
          return <div key={i} style={{ position: "absolute", left: 34 + d * 182, top: 74 + r * 88, width: 162, height: 76, borderRadius: 14, background: hue, opacity: a, transform: `scaleY(${a})`, transformOrigin: "50% 0" }} />;
        })}
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: enter * (1 - out) }}>
      <Cam
        t={t}
        keys={[
          { t: c.d_e, s: 1.08, x: 120, y: 0 },
          { t: c.d_nem, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.d_ver, s: 1.03, x: 60, y: 0, e: ease.inOut },
          { t: c.d_porque, s: 1.08, x: 0, y: 0, e: ease.inOut },
          { t: c.d_esp + 0.3, s: 0.94, x: 0, y: 0, e: ease.out },
          { t: c.d_tras, s: 1.04, x: 0, y: 10, e: ease.inOut },
          { t: c.v_foi, s: 1.0, x: 0, y: 0, e: ease.inOut },
        ]}
      >
        {/* A+B+C: borrado fora da lupa, nítido dentro */}
        <div style={{ position: "absolute", inset: 0, opacity: ab }}>
          <div style={{ position: "absolute", inset: 0, filter: fog > 0.02 ? blur : undefined, opacity: mix(1, 0.75, fog) }}>{content(false)}</div>
          {fog > 0.05 ? (
            <>
              <div style={{ position: "absolute", inset: 0, clipPath: `circle(${lr}px at ${lx}px ${ly}px)` }}>{content(true)}</div>
              <div style={{ position: "absolute", left: lx - lr, top: ly - lr, width: lr * 2, height: lr * 2, borderRadius: "50%", border: `6px solid ${NEON}`, boxShadow: "0 0 40px rgba(58,245,132,0.45)", opacity: fog }} />
              <div style={{ position: "absolute", left: lx + lr * 0.7, top: ly + lr * 0.7, width: 26, height: 110, borderRadius: 13, background: NEON, opacity: fog, transform: "rotate(-45deg)", transformOrigin: "50% 0" }} />
            </>
          ) : null}
        </div>
        {/* D — informação espalhada */}
        {phaseD > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: phaseD * (1 - prog(t, c.d_op - 0.2, 0.5, ease.inOut) * 0.75) }}>
            {SOURCES.map((s, i) => {
              const pile = prog(t, c.d_porque - 0.15 + i * 0.08, 0.25, ease.out);
              const x = mix(800 + (i % 3) * 40 - 40, s.x, burst) + Math.sin(t * 1.4 + i) * 10;
              const y = mix(330 + i * 26, s.y, burst) + Math.cos(t * 1.2 + i) * 8 + (1 - pile) * -80;
              return (
                <div key={s.k} style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 16, padding: "20px 30px", borderRadius: 26, background: "rgba(29,33,40,0.96)", border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 24px 50px rgba(0,0,0,0.55)", opacity: pile, transform: `rotate(${(i % 2 ? 4 : -4) * (0.4 + burst)}deg) scale(${mix(1.08, 1, burst)})`, fontWeight: 800, fontSize: 40, color: C.text, whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 40, color: NEON }}>{s.i}</span>
                  {s.k}
                </div>
              );
            })}
            {/* linhas partidas entre as fontes (nada conversa) */}
            <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: burst * 0.5 }}>
              {SOURCES.map((s, i) => {
                const n = SOURCES[(i + 2) % SOURCES.length];
                return <line key={i} x1={s.x + 150} y1={s.y + 45} x2={n.x + 150} y2={n.y + 45} stroke="rgba(255,107,94,0.5)" strokeWidth={3} strokeDasharray="14 22" />;
              })}
            </svg>
          </div>
        ) : null}
        {/* E — a oportunidade que fica para trás */}
        {opp > 0 ? (
          <div style={{ position: "absolute", left: 960 - 280, top: 300, width: 560, opacity: Math.min(1, opp * 1.5) * (1 - gone), transform: `translateY(${sink * 160}px) scale(${mix(1.15, 0.42, sink) * mix(0.8, 1, Math.min(1, opp))})`, filter: `grayscale(${sink}) blur(${sink * 4}px)`, transformOrigin: "50% 50%", zIndex: 10 }}>
            <div style={{ height: 190, boxSizing: "border-box", borderRadius: 30, background: "rgba(14,20,18,0.97)", border: `3px solid rgba(232,184,106,${mix(0.9, 0.2, sink)})`, boxShadow: `0 0 ${60 * (1 - sink)}px rgba(232,184,106,0.35)`, display: "flex", alignItems: "center", gap: 26, padding: "0 34px" }}>
              <div style={{ width: 100, height: 100, borderRadius: 50, background: "#8C6A4E", color: C.text, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40 }}>P</div>
              <div>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.12em", color: "#E8B86A" }}>OPORTUNIDADE</div>
                <div style={{ fontWeight: 800, fontSize: 52, color: C.text }}>Paula</div>
                <div style={{ fontWeight: 600, fontSize: 30, color: C.muted }}>esperando retorno</div>
              </div>
            </div>
          </div>
        ) : null}
      </Cam>
    </div>
  );
};
