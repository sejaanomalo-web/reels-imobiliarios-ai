import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, Mark, NEON, Trail } from "../kit";

/**
 * CENA 08 — PROCESSO (v3): 01 CALL DE DIAGNÓSTICO · 02 DEFINIÇÃO · 03 DESENVOLVIMENTO (o sistema é desenvolvido depois da call), números grandes, o traço passa por
 * eles; fecho O SISTEMA ACOMPANHA O CORRETOR. / Não o contrário.
 * CENA 09 — CTA (101 s–fim): marca; VEJA COMO O ATIVO PODE FUNCIONAR NA SUA ROTINA.; CTA primário AGENDAR UMA DEMONSTRAÇÃO e secundário
 * FALAR PELO WHATSAPP (no vídeo são só indicações visuais — os botões clicáveis ficam na própria landing); o traço sobe pela marca
 * e a trilha resolve junto; quadro final parado ~3 s.
 */
const STEPS = [
  { n: "01", k: "CALL DE DIAGNÓSTICO", s: "Entendemos como você trabalha.", cue: "p_a", off: 0 },
  { n: "02", k: "DEFINIÇÃO", s: "Definimos juntos o que faz sentido.", cue: "p_ent", off: 0.4 },
  { n: "03", k: "DESENVOLVIMENTO", s: "Criamos o seu sistema personalizado.", cue: "p_sol", off: -0.2 },
];

const IconCal: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke={color} strokeWidth={2.2} /><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke={color} strokeWidth={2.2} strokeLinecap="round" /></svg>
);
const IconChat: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-5 4z" stroke={color} strokeWidth={2.2} strokeLinejoin="round" /><path d="M8 9.5h8M8 12.5h5" stroke={color} strokeWidth={2.2} strokeLinecap="round" /></svg>
);

export const S8Close: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // 08
  const st = STEPS.map((s) => sp(t, c[s.cue] + s.off - 0.1, { damping: 14, stiffness: 160 }));
  const trail1 = prog(t, c.p_a - 0.1, (c.p_sol - c.p_a) + 0.4, ease.inOut);
  const stepsOut = prog(t, c.k_se - 0.2, 0.4, ease.in);
  // 09
  const mk = sp(t, c.k_se + 0.1, { damping: 15, stiffness: 140 });
  const b1 = sp(t, c.k_esc - 0.15, { damping: 13, stiffness: 170 });
  const b2 = sp(t, c.k_fale - 0.1, { damping: 13, stiffness: 170 });
  const pulse = c.k_gente < t ? 0.5 + 0.5 * Math.sin((t - c.k_gente) * 4) : 0;
    const glow = prog(t, c.k_end, 0.6, ease.out);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Cam t={t} keys={[{ t: c.p_a - 0.3, s: 1.06, x: -60 }, { t: c.p_trab, s: 1.0, x: 40, e: ease.inOut }, { t: c.k_se + 0.4, s: 1.0, x: 0, e: ease.inOut }, { t: c.k_ativo, s: 0.96, y: 30, e: ease.inOut }, { t: c.k_esc, s: 1.03, y: -10, e: ease.inOut }, { t: c.k_wpp, s: 1.0, y: 0, e: ease.inOut }, { t: c.k_end, s: 1.04, e: ease.inOut }, { t: tl.duration, s: 1.045, e: ease.linear }]}>
        {/* 08 — três etapas */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - stepsOut, transform: `translateY(${-stepsOut * 60}px)` }}>
          {STEPS.map((s, i) => {
            const a = Math.min(1, st[i]);
            const x = 110 + i * 600;
            return (
              <div key={s.n} style={{ position: "absolute", left: x, top: 150, width: 560, opacity: Math.min(1, st[i] * 1.5), transform: `translateY(${(1 - a) * 50}px)` }}>
                <div style={{ fontWeight: 800, fontSize: 220, lineHeight: 0.9, letterSpacing: "-0.05em", color: NEON, opacity: 0.95 }}>{s.n}</div>
                <div style={{ marginTop: 18, fontWeight: 800, fontSize: 54, letterSpacing: "-0.02em", color: C.text }}>{s.k}</div>
                <div style={{ marginTop: 10, fontWeight: 600, fontSize: 38, color: C.muted, lineHeight: 1.25 }}>{s.s}</div>
              </div>
            );
          })}
        </div>

        {/* 09 — CTA */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center", opacity: Math.min(1, mk * 1.5), transform: `translateY(${(1 - Math.min(1, mk)) * 30}px) scale(${1 + glow * 0.04})` }}>
          <Mark size={150} glow={0.4 + glow * 0.8} reveal={prog(t, c.k_se + 0.05, 0.7, ease.out)} shine={prog(t, c.k_end - 0.2, 1.1, ease.inOut)} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "38px 70px", borderRadius: 70, background: NEON, color: C.accentInk, fontWeight: 800, fontSize: 58, letterSpacing: "-0.01em", opacity: Math.min(1, b1 * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1.04, b1)) * (1 + 0.025 * pulse)})`, boxShadow: `0 0 ${40 + 30 * pulse}px rgba(58,245,132,${0.35 + 0.15 * pulse})` }}>
            <IconCal size={62} color={C.accentInk} />
            AGENDAR UMA DEMONSTRAÇÃO
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "30px 60px", borderRadius: 70, border: "3px solid rgba(244,245,247,0.6)", color: C.text, fontWeight: 800, fontSize: 48, opacity: Math.min(1, b2 * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1.04, b2))})` }}>
            <IconChat size={54} color={C.text} />
            FALAR PELO WHATSAPP
          </div>
        </div>
      </Cam>
      <Trail d="M 0 600 C 400 600, 600 420, 960 420 S 1500 300, 1960 250" p={trail1} len={2200} width={8} fade={prog(t, c.p_sol + 0.6, 0.6, ease.in)} tail={0.7} />
      {/* traço ascendente que atravessa a marca e resolve com a trilha */}
    </div>
  );
};
