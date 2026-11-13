import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, NEON, Trail, Words } from "../kit";

/**
 * CENA 01 — GANCHO (0–10 s). "Se você precisa mudar a sua forma de trabalhar para usar um sistema ou CRM… talvez o sistema esteja errado.
 * O sistema é que deve acompanhar a sua rotina."
 * Do preto: VOCÊ PRECISA SE ADAPTAR AO SISTEMA? se constrói; blocos rígidos de formulário fecham ao redor do chip CORRETOR (pressão).
 * Em "talvez o sistema esteja errado": VOCÊ perde intensidade, SISTEMA acende. Em "O sistema é que deve acompanhar…": a estrutura quebra,
 * os blocos se afastam, o traço de luz sobe em curva e a frase vira O SISTEMA DEVE SE ADAPTAR A VOCÊ.
 */
const BOX = [
  { x: 560, y: 360, w: 360, h: 110, fx: -700, fy: -300, label: "Campo obrigatório" },
  { x: 1000, y: 360, w: 360, h: 110, fx: 700, fy: -300, label: "Etapa fixa" },
  { x: 560, y: 610, w: 360, h: 110, fx: -700, fy: 300, label: "Formato padrão" },
  { x: 1000, y: 610, w: 360, h: 110, fx: 700, fy: 300, label: "Fluxo único" },
];

export const S1Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // frase 1, palavra a palavra, em sincronia com a leitura
  const q1 = [
    { w: "VOCÊ", at: c.g_se + 0.1 },
    { w: "PRECISA", at: c.g_se + 0.45 },
    { w: "SE ADAPTAR", at: c.g_se + 1.0 },
    { w: "AO", at: c.g_se + 2.4 },
    { w: "SISTEMA?", at: c.g_se + 3.2 },
  ];
  const wrong = prog(t, c.g_talvez - 0.1, 0.6, ease.inOut); // VOCÊ apaga, SISTEMA acende
  const close = prog(t, c.g_se + 1.6, c.g_talvez - c.g_se - 1.6, ease.inOut); // caixas apertam
  const brk = prog(t, c.g_sys - 0.1, 0.9, ease.inOut); // estrutura quebra
  const trail = prog(t, c.g_sys + 0.05, 1.3, ease.inOut);
  const q2 = sp(t, c.g_sys + 0.75, { damping: 14, stiffness: 140 });
  const exit = prog(t, c.r_porque - 0.35, 0.4, ease.in);
  const chip = sp(t, c.g_se + 1.2, { damping: 13, stiffness: 170 });
  const squeeze = mix(1, 0.86, close) * mix(1, 1.1, brk);
  const shake = close > 0.6 && brk === 0 ? Math.sin(t * 38) * 3 * (close - 0.6) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Cam
        t={t}
        keys={[
          { t: 0, s: 1.12, y: 20 },
          { t: c.g_talvez, s: 1.02, y: 0, e: ease.inOut },
          { t: c.g_sys + 0.2, s: 1.06, y: 10 },
          { t: c.g_sys + 1.4, s: 0.96, y: -30, x: 40, e: ease.inOut },
          { t: c.r_porque, s: 0.98, y: -20, x: 0 },
        ]}
      >
        {/* blocos rígidos */}
        {BOX.map((b, i) => {
          const inn = sp(t, c.g_se + 1.3 + i * 0.12, { damping: 15, stiffness: 160 });
          const cx = 960 - (b.x + b.w / 2);
          const cy = 540 - (b.y + b.h / 2);
          const x = b.x + cx * 0.32 * close + b.fx * brk;
          const y = b.y + cy * 0.32 * close + b.fy * brk;
          return (
            <div key={i} style={{ position: "absolute", left: x + shake, top: y, width: b.w, height: b.h, boxSizing: "border-box", borderRadius: 16, border: `2px solid rgba(255,255,255,${mix(0.18, 0.32, close)})`, background: "rgba(16,20,19,0.9)", opacity: Math.min(1, inn * 1.5) * (1 - prog(brk, 0.4, 0.6, ease.linear)), transform: `rotate(${brk * (i % 2 ? 14 : -14)}deg)`, display: "flex", alignItems: "center", padding: "0 26px", gap: 16 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${C.dim}` }} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, letterSpacing: "0.04em" }}>{b.label}</span>
            </div>
          );
        })}
        {/* linhas que delimitam */}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: (1 - brk) * close }}>
          {[420, 660].map((y) => (
            <line key={y} x1={mix(200, 520, close)} y1={y + 70} x2={mix(1720, 1400, close)} y2={y + 70} stroke="rgba(255,255,255,0.16)" strokeWidth={2} strokeDasharray="10 10" />
          ))}
        </svg>
        {/* o corretor apertado no meio */}
        <div style={{ position: "absolute", left: 960, top: 540, transform: `translate(-50%, -50%) scale(${mix(0.6, 1, Math.min(1, chip)) * squeeze}) translateY(${-brk * 20}px)`, opacity: Math.min(1, chip * 1.5) * (1 - prog(brk, 0.5, 0.5, ease.linear)), padding: "14px 30px", borderRadius: 40, background: brk > 0 ? NEON : "#1B2220", border: `2px solid ${close > 0.7 ? "rgba(255,107,94,0.6)" : "rgba(255,255,255,0.2)"}`, fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em", color: brk > 0 ? C.accentInk : C.text }}>
          CORRETOR
        </div>
      </Cam>

      {/* pergunta (espaço de tela) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, opacity: 1 - prog(t, c.g_sys + 0.3, 0.4, ease.in), transform: `translateY(${-prog(t, c.g_sys + 0.3, 0.5, ease.in) * 40}px)` }}>
        <Words
          t={t}
          size={92}
          words={q1.map((x) => ({
            ...x,
            color: x.w === "VOCÊ" ? `rgba(244,245,247,${mix(1, 0.28, wrong)})` : x.w === "SISTEMA?" ? (wrong > 0.5 ? NEON : C.text) : C.text,
          }))}
        />
      </div>
      {/* traço de luz ascendente */}
      <Trail d="M -60 980 C 520 1000, 820 760, 1060 560 S 1600 140, 2000 40" p={trail} len={2700} width={12} fade={prog(t, c.g_sys + 1.6, 0.8, ease.in)} />

      {/* resposta */}
      {q2 > 0 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, q2 * 1.5), transform: `scale(${mix(0.92, 1, Math.min(1, q2))})` }}>
          O SISTEMA DEVE SE
          <br />
          ADAPTAR A <span style={{ color: NEON }}>VOCÊ.</span>
        </div>
      ) : null}
    </div>
  );
};
