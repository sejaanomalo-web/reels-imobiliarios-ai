import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconChat, PATHS } from "./ui";

/**
 * CENA 5 — INSIGHT + CTA. "O erro não está em usar mais de um caminho. Está em não saber qual deles sustenta a sua operação hoje.
 * Quando isso fica claro, seus conteúdos, sua rotina e suas prioridades começam a conversar entre si. E você: hoje trabalha mais
 * para encontrar compradores, vender sua carteira ou captar bons imóveis? Conta nos comentários."
 * Os três caminhos viram uma bússola; a agulha gira e para em PRIORIDADE. Conteúdos, rotina e prioridades se conectam.
 * CTA de relacionamento: QUAL É O SEU FOCO? com as três opções e o convite para comentar. (Logo oficial não disponível no repositório.)
 */
const CX = 540;
const CY = 720;
const R = 250;
const DIRS = [-90, 30, 150]; // graus: topo, direita-baixo, esquerda-baixo
const CHIPS = [
  { k: "CONTEÚDOS", cue: "i_content", x: 90, y: 1060 },
  { k: "ROTINA", cue: "i_rout", x: 395, y: 1120 },
  { k: "PRIORIDADES", cue: "i_prio", x: 700, y: 1060 },
];
const OPTIONS = [
  { k: "Encontrar compradores", cue: "c_buy" },
  { k: "Vender minha carteira", cue: "c_wallet" },
  { k: "Captar bons imóveis", cue: "c_cap" },
];

export const Compass: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.i_err - 0.05, { damping: 14, stiffness: 170 });
  const pills = [0, 1, 2].map((i) => sp(t, c.i_err + 0.7 + i * 0.15, { damping: 12, stiffness: 200 }));
  const comp = sp(t, c.i_notknow - 0.3, { damping: 15, stiffness: 140 });
  const settle = prog(t, c.i_sust - 0.1, 0.9, ease.out);
  const spin = (t - c.i_notknow) * 420;
  const target = Math.ceil(((c.i_sust - c.i_notknow) * 420 + 300) / 360) * 360;
  const needle = mix(Math.max(0, spin), target, settle) + (settle >= 1 ? Math.sin((t - c.i_sust) * 3.2) * 4 * Math.max(0.3, 1 - (t - c.i_sust) / 6) : 0);
  const prio = sp(t, c.i_sust + 0.4, { damping: 12, stiffness: 190 });
  const shrink = prog(t, c.i_clear - 0.2, 0.7, ease.inOut);
  const talk = prog(t, c.i_talk - 0.1, 0.6, ease.out);
  const cta = prog(t, c.c_you - 0.2, 0.7, ease.inOut);
  const q = sp(t, c.c_you, { damping: 13, stiffness: 170 });
  const bubble = sp(t, c.c_comment - 0.2, { damping: 12, stiffness: 190 });
  const ring = ((t - c.c_comment) % 1.6 + 1.6) % 1.6 / 1.6;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_err, s: 1.06, y: -40 },
          { t: c.i_sust + 0.5, s: 1.1, y: -20, e: ease.inOut },
          { t: c.i_clear + 0.4, s: 0.98, y: 60, e: ease.inOut },
          { t: c.i_talk + 0.6, s: 1.02, y: 80, e: ease.inOut },
          { t: c.c_you + 0.5, s: 1.0, y: 0, e: ease.inOut },
          { t: tl.duration, s: 1.05, y: 0, e: ease.linear },
        ]}
      >
        {/* INSIGHT */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - cta, transform: `translateY(${-cta * 120}px) scale(${mix(1, 0.9, cta)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", opacity: Math.min(1, head * 1.5) * (1 - prog(t, c.i_notknow - 0.2, 0.3, ease.in)) }}>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 76, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.text, transform: `translateY(${(1 - Math.min(1, head)) * 30}px)` }}>O ERRO NÃO É<br />USAR <span style={{ color: C.accent }}>MAIS DE UM</span><br />CAMINHO.</div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", gap: 16, opacity: 1 - comp }}>
            {PATHS.map((p, i) => (
              <span key={p.k} style={{ padding: "12px 22px", borderRadius: 24, border: `3px solid ${p.color}`, fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: p.color, opacity: Math.min(1, pills[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1, pills[i]))})`, display: "inline-block" }}>{p.k}</span>
            ))}
          </div>
          {/* bússola */}
          {comp > 0 ? (
            <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: Math.min(1, comp * 1.5), transform: `translate(0, ${shrink * -60}px)` }}>
              <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
                <circle cx={CX} cy={CY} r={R + 30} fill="rgba(21,24,29,0.95)" stroke={C.line} strokeWidth={2} />
                <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.surface3} strokeWidth={4} strokeDasharray="6 14" transform={`rotate(${t * 18} ${CX} ${CY})`} />
                <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="60 1500" opacity={0.7} transform={`rotate(${-t * 60} ${CX} ${CY})`} />
                {DIRS.map((d, i) => {
                  const a = (d * Math.PI) / 180;
                  return <line key={i} x1={CX + Math.cos(a) * 60} y1={CY + Math.sin(a) * 60} x2={CX + Math.cos(a) * (R - 10)} y2={CY + Math.sin(a) * (R - 10)} stroke={PATHS[i].color} strokeWidth={6} strokeLinecap="round" opacity={0.6} />;
                })}
                {/* conversa entre conteúdos, rotina e prioridades */}
                {CHIPS.map((k) => {
                  const a = prog(t, c[k.cue] - 0.1, 0.5, ease.out);
                  return <line key={k.k} x1={CX} y1={CY + R} x2={k.x + 140} y2={k.y + 60} stroke={C.accent} strokeWidth={4} strokeDasharray={talk > 0 ? "12 10" : `${400 * a} 500`} strokeDashoffset={talk > 0 ? -t * 60 : 0} opacity={a} />;
                })}
                {talk > 0 ? <path d={`M${CHIPS[0].x + 280} ${CHIPS[0].y + 45} Q ${CX} ${CHIPS[1].y + 160}, ${CHIPS[2].x} ${CHIPS[2].y + 45}`} fill="none" stroke={C.accent} strokeWidth={4} strokeDasharray="12 10" strokeDashoffset={-t * 60} opacity={talk} /> : null}
                {/* agulha */}
                <g transform={`rotate(${needle} ${CX} ${CY})`}>
                  <path d={`M${CX} ${CY - R + 30} L${CX + 22} ${CY} L${CX} ${CY + 40} L${CX - 22} ${CY} Z`} fill={C.accent} />
                  <path d={`M${CX} ${CY + 40} L${CX + 22} ${CY} L${CX} ${CY + R - 60} L${CX - 22} ${CY} Z`} fill="#3A3F48" />
                </g>
                <circle cx={CX} cy={CY} r={16} fill={C.text} />
              </svg>
              {PATHS.map((p, i) => {
                const a = (DIRS[i] * Math.PI) / 180;
                return (
                  <div key={p.k} style={{ position: "absolute", left: CX + Math.cos(a) * (R + 70) - 130, top: CY + Math.sin(a) * (R + 70) - 22, width: 260, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: p.color, opacity: 1 - Math.min(1, prio) * (i === 0 ? 1 : 0) }}>{p.k}</div>
                );
              })}
              {prio > 0 ? (
                <div style={{ position: "absolute", left: 0, right: 0, top: CY - R - 110, display: "flex", justifyContent: "center", opacity: Math.min(1, prio * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, prio))})` }}>
                  <div style={{ padding: "12px 30px", borderRadius: 26, background: C.accent, color: C.ink, fontWeight: 800, fontSize: 44, letterSpacing: "-0.01em", boxShadow: "0 0 60px rgba(58,245,132,0.4)" }}>PRIORIDADE</div>
                </div>
              ) : null}
              {CHIPS.map((k) => {
                const a = sp(t, c[k.cue] - 0.1, { damping: 12, stiffness: 200 });
                if (a <= 0) return null;
                return (
                  <div key={k.k} style={{ position: "absolute", left: k.x, top: k.y, width: 280, height: 90, boxSizing: "border-box", borderRadius: 26, background: C.surface2, border: `2px solid ${talk > 0.5 ? C.accent : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.text, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, a))})` }}>{k.k}</div>
                );
              })}
            </div>
          ) : null}
        </div>
        {/* CTA — QUAL É O SEU FOCO? */}
        {cta > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: cta }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 40}px)` }}>
              QUAL É O<br /><span style={{ color: C.accent }}>SEU FOCO?</span>
            </div>
            {OPTIONS.map((o, i) => {
              const a = sp(t, c[o.cue] - 0.1, { damping: 12, stiffness: 200 });
              // destaque acompanha a fala; depois do convite, os três se alternam devagar
              const win = (s0: number, s1: number) => prog(t, s0 - 0.1, 0.2, ease.out) * (1 - prog(t, s1 - 0.1, 0.25, ease.in));
              const ends = [c.c_wallet, c.c_cap, c.c_comment];
              const cyc = t > c.c_comment ? Math.max(0, Math.sin(((t - c.c_comment) / 2.4) * Math.PI * 2 - (i * Math.PI * 2) / 3)) : 0;
              const hl = Math.min(1, win(c[o.cue], ends[i]) + cyc);
              return (
                <div key={o.k} style={{ position: "absolute", left: 140, top: 610 + i * 140, width: 800, height: 112, boxSizing: "border-box", borderRadius: 32, border: `3px solid ${PATHS[i].color}`, display: "flex", alignItems: "center", gap: 22, padding: "0 30px", opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * (i % 2 ? 120 : -120) + hl * 14}px) scale(${1 + hl * 0.05})`, background: hl > 0.01 ? `linear-gradient(90deg, ${PATHS[i].color}${Math.round(hl * 40).toString(16).padStart(2, "0")}, ${C.surface} 70%)` : C.surface, boxShadow: `0 0 ${40 * Math.min(1, a) + hl * 50}px ${PATHS[i].color}${hl > 0.3 ? "55" : "33"}` }}>
                  <div style={{ width: 54, height: 54, borderRadius: 27, background: PATHS[i].color, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30 }}>{i + 1}</div>
                  <span style={{ fontWeight: 800, fontSize: 44, color: C.text, letterSpacing: "-0.02em" }}>{o.k}</span>
                </div>
              );
            })}
            {bubble > 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: Math.min(1, bubble * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, bubble))})` }}>
                <div style={{ position: "relative", width: 96, height: 96, borderRadius: 48, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconChat size={56} color={C.accentInk} />
                  <div style={{ position: "absolute", inset: -ring * 40, borderRadius: "50%", border: `3px solid ${C.accent}`, opacity: 1 - ring }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 54, letterSpacing: "-0.02em", color: C.text }}>Conta nos comentários</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
