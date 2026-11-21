import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_L60_05 — "Lead quente não é quem manda emoji" (livro, Dia 08 / EP012). ESTILO 5 — PAINEL (kit NOV26).
 * Reações e leads ILUSTRATIVOS; chama desenhada (sem emoji de plataforma); sem interface de rede social real.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.9 + k * 1.3) * a * 1.8;
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 56 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });
const CHAMA = "M 0 -120 C 40 -70 70 -40 60 10 C 52 60 20 90 0 90 C -20 90 -52 60 -60 10 C -66 -30 -30 -50 -20 -90 C -10 -60 10 -50 0 -120 Z";

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const fire = S(t, c.h_fogo - 0.3);
  const therm = prog(t, c.h_fogo + 0.3, 1.0, ease.inOut);
  const nao = S(t, c.h_nao - 0.1);
  const out = prog(t, c.a_curt - 0.45, 0.3, ease.in);
  const flick = 1 + Math.sin(t * 9) * 0.04;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={11} t={t} keys={[{ t: 0, s: 1.06, x: 0, y: -10 }, { t: c.h_fogo, s: 1.1, x: 2, y: -14, e: ease.out }, { t: c.h_nao, s: 1.05, x: -2, y: -10, e: ease.out }, { t: c.a_curt, s: 1.06, y: -14, e: ease.linear }]}>
        <svg width={1080} height={900} style={{ position: "absolute", left: 0, top: 420 }}>
          <g transform={`translate(${mix(540, 360, therm)} ${380 + fl(t, 0)}) scale(${mix(0.3, 1.6, Math.min(1.05, fire)) * flick * mix(1, 0.7, therm)})`} opacity={fade(fire)}>
            <path d={CHAMA} fill={W} opacity={0.9} /><path d={CHAMA} transform="scale(0.55) translate(0 40)" fill="#FFD9D4" opacity={0.6} />
          </g>
          <g opacity={fade(therm)} transform={`translate(700 ${120 + fl(t, 2)})`}>
            <rect x={-34} y={0} width={68} height={420} rx={34} fill={C.surface} stroke={C.surface3} strokeWidth={4} />
            <circle cx={0} cy={450} r={56} fill={W} />
            <rect x={-16} y={mix(420, 40, therm)} width={32} height={mix(0, 400, therm)} rx={16} fill={W} />
            <text x={80} y={60} fill={W} fontFamily="JetBrains Mono" fontWeight={700} fontSize={32}>QUENTE?</text>
            <text x={80} y={420} fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26}>INTENÇÃO</text>
          </g>
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1180, display: "flex", justifyContent: "center", opacity: fade(nao), transform: `scale(${mix(0.6, 1, Math.min(1.08, nao))}) rotate(-2deg)` }}><Tag text="✕ NÃO É COMPRA AMANHÃ" tone="warn" size={30} /></div>
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>LEAD <span style={{ color: W }}>QUENTE?</span></Title>
    </div>
  );
};

const SINAIS = [{ k: "CURTIDA", at: "a_curt" }, { k: "EMOJI", at: "a_emoji" }, { k: "ELOGIO", at: "a_elog" }];
const CAMPOS = [{ k: "PRAZO", at: "a_prazo" }, { k: "CONDIÇÃO", at: "a_cond" }, { k: "VISITA", at: "a_vis" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_curt - 0.45, 0.3);
  const card = S(t, c.a_mas - 0.3);
  const out = prog(t, c.b_est - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={11} t={t} keys={[{ t: c.a_curt - 0.45, s: 1.04, y: -6 }, { t: c.a_elog, s: 1.06, x: 3, y: -10, e: ease.out }, { t: c.a_mas, s: 1.05, x: -3, y: -10, e: ease.out }, { t: c.a_vis, s: 1.07, y: -16, e: ease.out }, { t: c.b_est, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, top: 470, display: "flex", flexDirection: "column", gap: 18, transform: `rotate(${Math.sin(t * 1.2) * 1.5}deg) scale(${1 + Math.sin(t * 1.4) * 0.03})`, transformOrigin: "0% 0%" }}>
          {SINAIS.map((q, i) => { const p = S(t, c[q.at] - 0.15); return <div key={q.k} style={{ opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * -80}px) translateY(${fl(t, i, 6)}px)` }}><Tag text={`✓ ${q.k}`} tone="accent" size={34} /></div>; })}
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, opacity: fade(S(t, c.a_cont - 0.2)), marginTop: 6 }}>= interesse no conteúdo</div>
        </div>
        <div style={{ position: "absolute", left: 140, right: 140, top: 830 + fl(t, 4, 8), padding: "28px 32px", borderRadius: 26, background: C.surface, border: `2px solid ${t > c.a_vis ? W : C.surface3}`, opacity: fade(card), transform: `scale(${mix(0.85, 1, Math.min(1, card))}) rotate(${Math.sin(t * 1.1) * 0.6}deg)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, marginBottom: 10 }}>FICHA DO LEAD</div>
          {CAMPOS.map((q, i) => {
            const p = prog(t, c[q.at] - 0.2, 0.3);
            return (
              <div key={q.k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 6px", borderTop: i ? `1px solid ${C.surface3}` : "none", background: p > 0.5 ? WARN_BG : "transparent", borderRadius: 8 }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: p > 0.5 ? W : C.dim }}>{q.k}</span>
                <span style={{ fontWeight: 800, fontSize: 34, color: p > 0.5 ? W : C.dim }}>—</span>
              </div>
            );
          })}
        </div>
      </Camera>
      <Title p={prog(t, c.a_curt - 0.2, 0.25) * (1 - prog(t, c.a_mas - 0.35, 0.15))}>SINAIS DE <span style={{ color: G }}>INTERESSE</span></Title>
      <Title p={prog(t, c.a_mas - 0.15, 0.25)}>MAS A FICHA <span style={{ color: W }}>ESTÁ VAZIA</span></Title>
    </div>
  );
};

const PERG = [{ n: "1", k: "Quando pretende se mudar?", at: "b_quando" }, { n: "2", k: "O que está buscando?", at: "b_que" }, { n: "3", k: "Qual seria o próximo passo confortável?", at: "b_passo" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_est - 0.45, 0.3);
  const out = prog(t, c.c_comeco - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={11} t={t} keys={[{ t: c.b_est - 0.45, s: 1.04, y: -6 }, { t: c.b_quando, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.b_que, s: 1.06, x: -2, y: -12, e: ease.out }, { t: c.b_passo, s: 1.07, y: -18, e: ease.out }, { t: c.c_comeco, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", opacity: fade(S(t, c.b_est - 0.2)) }}><Tag text="ESTÁGIO DO CONTATO" tone="muted" size={28} /></div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 570, display: "flex", flexDirection: "column", gap: 22 }}>
          {PERG.map((q, i) => {
            const p = S(t, c[q.at] - 0.25);
            return (
              <div key={q.n} style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 28px", borderRadius: 24, background: aa(0.1), border: `2px solid ${G}`, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * 120}px) translateY(${fl(t, i, 6)}px)` }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 44, color: G }}>{q.n}</span>
                <span style={{ fontWeight: 700, fontSize: 40, color: C.text, lineHeight: 1.15 }}>{q.k}</span>
              </div>
            );
          })}
        </div>
      </Camera>
      <Title p={prog(t, c.b_est - 0.2, 0.25)}>PERGUNTE <span style={{ color: G }}>ANTES</span></Title>
    </div>
  );
};

const TRILHAS = [{ k: "AGORA", y: 560 }, { k: "PLANEJANDO", y: 720 }, { k: "PESQUISANDO", y: 880 }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_comeco - 0.45, 0.3);
  const lanes = prog(t, c.c_comeco - 0.2, 0.9, ease.out);
  const val = S(t, c.c_valioso - 0.1);
  const desc = S(t, c.d_desc - 0.1);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={11} t={t} keys={[{ t: c.c_comeco - 0.45, s: 1.04, y: -6 }, { t: c.c_valioso, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.d_acomp, s: 1.05, x: -2, y: -12, e: ease.out }, { t: c.d_desc, s: 1.07, y: -16, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -16, e: ease.linear }]}>
        {TRILHAS.map((r, i) => {
          const p = prog(lanes, i * 0.15, 0.5);
          const dot = ((t * 0.18 + i * 0.3) % 1);
          return (
            <div key={r.k} style={{ position: "absolute", left: 120, right: 120, top: r.y, height: 110, borderRadius: 22, background: C.surface, border: `2px solid ${i === 0 ? G : C.surface3}`, opacity: fade(p), overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 26, top: 34, fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: i === 0 ? G : C.text }}>{r.k}</div>
              <div style={{ position: "absolute", left: mix(380, 760, dot), top: 35, width: 40, height: 40, borderRadius: 20, background: i === 0 ? G : aa(0.5) }} />
              <div style={{ position: "absolute", right: 24, top: 38, fontSize: 30, color: G, fontWeight: 800 }}>✓</div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", opacity: fade(val) }}><Tag text="✓ TODOS SÃO VALIOSOS" tone="accent" size={28} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: fade(desc), transform: `scale(${mix(0.6, 1, Math.min(1.08, desc))}) rotate(-2deg)` }}><Tag text="✕ DESCARTAR CEDO DEMAIS" tone="warn" size={30} /></div>
      </Camera>
      <Title p={prog(t, c.c_comeco - 0.2, 0.25)}>ACOMPANHE, <span style={{ color: G }}>NÃO DESCARTE</span></Title>
    </div>
  );
};
