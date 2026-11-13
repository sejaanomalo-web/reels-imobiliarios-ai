import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, NEON, Trail } from "../kit";

/**
 * GANCHO v2 (0–8,4 s). "Se você precisa mudar a sua forma de trabalhar para usar um sistema ou CRM… talvez o sistema esteja errado.
 * O sistema é que deve acompanhar a sua rotina."
 * Sem início no preto: um formulário rígido de "sistema" já entra batendo; cada campo aperta o chip CORRETOR. Em "errado", um ✕
 * vermelho atravessa o formulário (tremor). Em "O sistema é que deve acompanhar…", o formulário se desmonta, o CORRETOR cresce em
 * verde e a rotina (retorno, visita, imóvel, lead) passa a orbitar em volta dele. O texto da fala fica na transcrição embaixo.
 */
const CX = 960;
const CY = 400;
const FIELDS = [
  { k: "Campo obrigatório", dx: -330, dy: -170, ang: -150 },
  { k: "Etapa fixa", dx: 330, dy: -170, ang: -30 },
  { k: "Formato padrão", dx: -330, dy: 170, ang: 150 },
  { k: "Fluxo único", dx: 330, dy: 170, ang: 30 },
  { k: "Sem exceções", dx: 0, dy: -300, ang: -90 },
  { k: "Tela única", dx: 0, dy: 300, ang: 90 },
];
const ORBIT = [
  { k: "Retorno", i: "☎" },
  { k: "Visita", i: "◷" },
  { k: "Imóvel", i: "⌂" },
  { k: "Lead", i: "✦" },
];

export const S1Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const span = c.g_crm - 0.1;
  const fields = FIELDS.map((_, i) => sp(t, 0.05 + (i * span) / FIELDS.length, { damping: 16, stiffness: 260 }));
  const squeeze = prog(t, 0.1, c.g_crm + 0.3, ease.inOut);
  const xmark = prog(t, c.g_errado - 0.12, 0.28, ease.out);
  const flash = Math.max(0, 1 - Math.abs(t - c.g_errado - 0.1) / 0.25);
  const brk = prog(t, c.g_sys - 0.08, 0.7, ease.out);
  const free = sp(t, c.g_sys + 0.05, { damping: 11, stiffness: 160 });
  const orbit = prog(t, c.g_sys + 0.6, 0.8, ease.out);
  const exit = prog(t, c.r_porque - 0.3, 0.35, ease.in);
  const shake = xmark > 0 && brk === 0 ? Math.sin(t * 55) * 10 * Math.max(0, 1 - (t - c.g_errado) / 0.5) : 0;
  const lastHit = FIELDS.map((_, i) => 0.05 + (i * span) / FIELDS.length).filter((s) => s <= t).pop() ?? -9;
  const punch = Math.max(0, 1 - (t - lastHit) / 0.18) * (1 - brk);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <div style={{ position: "absolute", inset: 0, background: `rgba(255,70,60,${0.16 * flash})`, pointerEvents: "none" }} />
      <Cam
        t={t}
        keys={[
          { t: 0, s: 1.3, y: -40, r: -2 },
          { t: 0.9, s: 1.04, y: 0, r: 0, e: ease.out },
          { t: c.g_crm, s: 1.12, y: -20, e: ease.inOut },
          { t: c.g_errado, s: 1.16, y: -20, e: ease.inOut },
          { t: c.g_sys + 0.5, s: 0.94, y: 0, e: ease.out },
          { t: c.r_porque, s: 1.0, y: 0, e: ease.inOut },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px) scale(${1 + punch * 0.015})`, transformOrigin: `${CX}px ${CY}px` }}>
          {/* moldura do "sistema" rígido */}
          <div style={{ position: "absolute", left: CX - mix(560, 360, squeeze) , top: CY - mix(380, 250, squeeze), width: mix(1120, 720, squeeze), height: mix(760, 500, squeeze), borderRadius: 30, border: `3px solid rgba(255,255,255,${0.14 + 0.2 * squeeze})`, background: "rgba(12,16,15,0.6)", opacity: 1 - brk, transform: `scale(${mix(1, 1.4, brk)})` }} />
          {FIELDS.map((f, i) => {
            const a = Math.min(1, fields[i]);
            const k = mix(1, 0.62, squeeze);
            const rad = (f.ang * Math.PI) / 180;
            const x = CX + f.dx * k + Math.cos(rad) * 900 * brk;
            const y = CY + f.dy * k + Math.sin(rad) * 700 * brk;
            return (
              <div key={f.k} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${mix(1.6, 1, a)}) rotate(${brk * (i % 2 ? 40 : -40)}deg)`, opacity: Math.min(1, fields[i] * 2) * (1 - prog(brk, 0.5, 0.5, ease.linear)), padding: "22px 34px", borderRadius: 18, background: "#141A18", border: `3px solid ${xmark > 0.5 ? "rgba(255,107,94,0.8)" : "rgba(255,255,255,0.28)"}`, display: "flex", alignItems: "center", gap: 18, whiteSpace: "nowrap" }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, border: `3px solid ${C.dim}` }} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 34, color: C.text, letterSpacing: "0.02em" }}>{f.k}</span>
              </div>
            );
          })}
          {/* o corretor apertado → livre */}
          <div style={{ position: "absolute", left: CX, top: CY, transform: `translate(-50%, -50%) scale(${mix(1, 0.72, squeeze) * mix(1, 1.7, Math.min(1.1, free))}) scaleX(${mix(1, 0.82, squeeze * (1 - brk))})`, padding: "20px 44px", borderRadius: 50, background: brk > 0.2 ? NEON : "#1E2623", border: `3px solid ${xmark > 0.3 && brk < 0.2 ? C.warn : "rgba(255,255,255,0.3)"}`, fontFamily: F.mono, fontWeight: 700, fontSize: 44, letterSpacing: "0.1em", color: brk > 0.2 ? C.accentInk : C.text, boxShadow: brk > 0.2 ? "0 0 70px rgba(58,245,132,0.5)" : "none", zIndex: 5 }}>
            CORRETOR
          </div>
          {/* ✕ vermelho em "errado" */}
          {xmark > 0 ? (
            <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 1 - prog(brk, 0, 0.5, ease.linear), zIndex: 6 }}>
              <path d={`M ${CX - 330} ${CY - 230} L ${CX + 330} ${CY + 230}`} stroke={C.warn} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${820 * xmark} 900`} opacity={xmark > 0.02 ? 1 : 0} />
              <path d={`M ${CX + 330} ${CY - 230} L ${CX - 330} ${CY + 230}`} stroke={C.warn} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${820 * prog(t, c.g_errado + 0.05, 0.25, ease.out)} 900`} opacity={xmark > 0.3 ? 1 : 0} />
            </svg>
          ) : null}
          {/* a rotina orbitando o corretor */}
          {orbit > 0
            ? ORBIT.map((o, i) => {
                const a = (i / ORBIT.length) * Math.PI * 2 + t * 0.9;
                const r = mix(120, 360, orbit);
                return (
                  <div key={o.k} style={{ position: "absolute", left: CX + Math.cos(a) * r * 1.35, top: CY + Math.sin(a) * r * 0.75, transform: "translate(-50%, -50%)", opacity: orbit, display: "flex", alignItems: "center", gap: 12, padding: "14px 26px", borderRadius: 30, background: "rgba(16,24,21,0.95)", border: "2px solid rgba(58,245,132,0.5)", fontWeight: 800, fontSize: 34, color: C.text, whiteSpace: "nowrap" }}>
                    <span style={{ color: NEON, fontSize: 34 }}>{o.i}</span>
                    {o.k}
                  </div>
                );
              })
            : null}
        </div>
      </Cam>
      <Trail d="M -60 860 C 500 880, 760 640, 960 420 S 1500 60, 2000 -40" p={prog(t, c.g_sys - 0.05, 0.9, ease.inOut)} len={2600} width={14} fade={prog(t, c.g_sys + 0.9, 0.6, ease.in)} />
    </div>
  );
};
