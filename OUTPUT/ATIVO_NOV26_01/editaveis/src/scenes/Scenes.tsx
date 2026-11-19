import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, IconCalc, IconDoc, Label, Msg, Person, Slider, Tag, Thumb, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_01 — "Selic parada, financiamento caro" (formato: dois termômetros). Fato verificado: Copom manteve a Selic em 13,75%
 * em 04/11/2026. Nenhuma taxa, parcela ou valor de financiamento é mostrado (sem número inventado). Perfis e imóvel ilustrativos.
 * Câmera: x/y = posição da câmera (y positivo sobe o conteúdo).
 */

/** Mostrador semicircular. */
const Dial: React.FC<{ size: number; v: number; label: string; value: string; color: string }> = ({ size, v, label, value, color }) => {
  const r = size * 0.42;
  const cx = size / 2;
  const cy = size * 0.56;
  const ang = Math.PI * (1 - v);
  return (
    <div style={{ width: size, textAlign: "center" }}>
      <svg width={size} height={size * 0.66} viewBox={`0 0 ${size} ${size * 0.66}`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={C.surface3} strokeWidth={size * 0.07} strokeLinecap="round" />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(ang)} ${cy - r * Math.sin(ang)}`} fill="none" stroke={color} strokeWidth={size * 0.07} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={cx + r * 0.8 * Math.cos(ang)} y2={cy - r * 0.8 * Math.sin(ang)} stroke={C.text} strokeWidth={size * 0.025} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={size * 0.04} fill={C.text} />
      </svg>
      <div style={{ fontWeight: 800, fontSize: size * 0.2, letterSpacing: "-0.03em", color: C.text, marginTop: -size * 0.04 }}>{value}</div>
      <Label size={Math.max(24, size * 0.07)} style={{ marginTop: 6 }}>{label}</Label>
    </div>
  );
};

/** Termômetro (sem números). */
const Thermo: React.FC<{ h: number; v: number; color: string }> = ({ h, v, color }) => (
  <div style={{ position: "relative", width: 110, height: h }}>
    <div style={{ position: "absolute", left: 30, top: 0, width: 50, height: h - 80, borderRadius: 25, background: C.surface3, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${v * 100}%`, background: color }} />
    </div>
    <div style={{ position: "absolute", left: 10, bottom: 0, width: 90, height: 90, borderRadius: 45, background: color }} />
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const dial = sp(t, 0, { damping: 14, stiffness: 150 });
  const needle = prog(t, 0.1, 1.0, ease.out);
  const stop = sp(t, c.h_cento - 0.2, { damping: 11, stiffness: 220 });
  const th = sp(t, Math.min(1.0, c.h_entao - 0.3), { damping: 14, stiffness: 160 });
  const heat = prog(t, c.h_fin - 0.1, 1.6, ease.inOut);
  const bolso = sp(t, c.h_bolso - 0.15, { damping: 10, stiffness: 230 });
  const q = sp(t, c.h_entao + 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.a_porque - 0.45, 0.4, ease.in);
  const shake = Math.sin(t * 40) * 6 * prog(t, c.h_bolso, 0.2, ease.out) * (1 - prog(t, c.h_bolso + 0.5, 0.4, ease.out));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={0.5} t={t} keys={[{ t: 0, s: 1.1, x: -130, y: 20 }, { t: c.h_cento, s: 1.04, x: -90, y: 10, e: ease.inOut }, { t: c.h_fin + 0.5, s: 1.0, x: 0, y: 0, e: ease.inOut }, { t: c.a_porque, s: 1.03, x: 0, y: 0, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, dial * 1.5) }}>
          <Tag text="COPOM · 04/11/2026" tone="muted" size={26} />
          {stop > 0.01 ? <Tag text="SELIC MANTIDA" tone="accent" size={26} style={{ transform: `scale(${mix(0.4, 1, Math.min(1.1, stop))})` }} /> : null}
        </div>
        <div style={{ position: "absolute", left: 60, top: 470, opacity: Math.min(1, dial * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1, dial))})` }}>
          <Dial size={500} v={mix(0, 0.62, needle) + Math.sin(t * 5) * 0.012} label="SELIC (AO ANO)" value="13,75%" color={A.hex} />
        </div>
        {th > 0.001 ? (
          <div style={{ position: "absolute", left: 640, top: 430, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: Math.min(1, th * 1.5), transform: `translate(${shake}px, ${(1 - Math.min(1, th)) * 100}px)` }}>
            <Thermo h={520} v={mix(0.35, 0.92, heat) + Math.sin(t * 4) * 0.015 * heat} color={C.warn} />
            <Label size={28} color={C.text}>FINANCIAMENTO</Label>
          </div>
        ) : null}
        {bolso > 0.01 ? (
          <div style={{ position: "absolute", left: 600, top: 1070, transform: `rotate(-4deg) scale(${mix(0.4, 1, Math.min(1.1, bolso))})`, opacity: Math.min(1, bolso * 1.5) }}>
            <Tag text="PESA NO BOLSO" tone="warn" size={32} />
          </div>
        ) : null}
        {q > 0.01 ? (
          <div style={{ position: "absolute", left: 90, top: 1080, fontWeight: 800, fontSize: 56, color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 30}px)` }}>Por quê?</div>
        ) : null}
      </Camera>
    </div>
  );
};

const VARS = ["CUSTO DO DINHEIRO", "RISCOS", "PRAZO", "CONDIÇÕES DA OPERAÇÃO"];
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.a_custo, c.a_riscos, c.a_prazo, c.a_cond];
  const enter = sp(t, c.a_porque - 0.35, { damping: 15, stiffness: 150 });
  const ref = sp(t, c.a_ref - 0.1, { damping: 12, stiffness: 200 });
  const neq = sp(t, c.a_nao - 0.05, { damping: 10, stiffness: 230 });
  const bank = sp(t, c.a_banco - 0.3, { damping: 14, stiffness: 170 });
  const arrow = prog(t, c.a_banco - 0.2, 0.6, ease.inOut);
  const out = prog(t, c.b_imag - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.a_porque - 0.35, s: 1.05, y: -40 }, { t: c.a_contrato, s: 1.0, y: -20, e: ease.inOut }, { t: c.a_banco + 0.4, s: 1.0, y: -10, e: ease.inOut }, { t: c.a_cond + 0.6, s: 1.03, y: 0, e: ease.inOut }, { t: c.b_imag, s: 1.03, y: 0, e: ease.linear }]}>
        {/* Selic como referência */}
        <div style={{ position: "absolute", left: 80, top: 420, transform: `scale(${mix(1, 0.62, prog(t, c.a_banco - 0.3, 0.6, ease.inOut))})`, transformOrigin: "0 0" }}>
          <Dial size={380} v={0.62} label="SELIC" value="13,75%" color={A.hex} />
          {ref > 0.01 ? <div style={{ marginTop: 12, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.1, ref))})` }}><Tag text="REFERÊNCIA" tone="accent" size={28} /></div> : null}
        </div>
        {/* ≠ */}
        {neq > 0.01 ? (
          <div style={{ position: "absolute", left: 500, top: 520, display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, neq * 1.5) * (1 - prog(t, c.a_banco - 0.3, 0.4, ease.in)) }}>
            <div style={{ width: 110, height: 110, borderRadius: 55, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 82, transform: `scale(${mix(0.3, 1, Math.min(1.1, neq))})` }}>≠</div>
            <div style={{ padding: "22px 26px", borderRadius: 26, background: C.surface, border: `2px solid ${C.line}` }}>
              <IconDoc size={56} color={C.muted} />
              <div style={{ fontWeight: 800, fontSize: 34, color: C.text, marginTop: 8 }}>Taxa do<br />contrato</div>
            </div>
          </div>
        ) : null}
        {/* seta para o cálculo do banco */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <path d="M 330 700 C 330 780, 420 800, 470 820" fill="none" stroke={A.hex} strokeWidth={6} strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - arrow)} />
        </svg>
        {bank > 0.001 ? (
          <div style={{ position: "absolute", left: 140, top: 800 + Math.sin(t * 1.5) * 7, width: 800, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${aa(0.4)}`, padding: "24px 30px", opacity: Math.min(1, bank * 1.5), transform: `translateY(${(1 - Math.min(1, bank)) * 140}px)`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <IconBank size={52} color={C.text} />
                <IconCalc size={52} color={C.text} />
                <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>Cálculo do banco</span>
              </div>
              <Tag text="ILUSTRATIVO" tone="muted" size={22} />
            </div>
            {VARS.map((v, i) => {
              const p = sp(t, at[i] - 0.1, { damping: 12, stiffness: 210 });
              return (
                <div key={v} style={{ marginTop: 16, height: 74, display: "flex", alignItems: "center", gap: 18, padding: "0 20px", borderRadius: 20, background: p > 0.5 ? A.deep : C.bg1, border: `2px solid ${p > 0.5 ? aa(0.5) : "transparent"}`, opacity: mix(0.45, 1, Math.min(1, p)), transform: `translateX(${(1 - Math.min(1, p)) * 30}px)` }}>
                  <CheckDot p={p} size={40} />
                  <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{v}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Camera>
      {neq > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, neq * 1.5) * (1 - out) }}>
          SELIC <span style={{ color: C.warn }}>≠</span> TAXA DO FINANCIAMENTO
        </div>
      ) : null}
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const p1 = sp(t, c.b_um - 0.2, { damping: 14, stiffness: 180 });
  const p2 = sp(t, c.b_outro - 0.2, { damping: 14, stiffness: 180 });
  const sl = (start: number, from: number, to: number) => mix(from, to, prog(t, start, 0.8, ease.inOut));
  const sim = sp(t, c.b_sim - 0.1, { damping: 12, stiffness: 200 });
  const day = sp(t, c.b_dia - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_isso - 0.45, 0.4, ease.in);
  const profile = (i: number, p: number) => {
    if (p <= 0.001) return null;
    const one = i === 0;
    return (
      <div key={i} style={{ position: "absolute", left: one ? 70 : 560, top: 700 + Math.sin(t * 1.7 + i * 2) * 8, width: 450, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `2px solid ${C.line}`, padding: "24px 26px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 120}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Person size={70} />
          <Label size={26} color={C.text}>COMPRADOR {one ? "1" : "2"}</Label>
        </div>
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 26 }}>
          <Slider label="ENTRADA" v={one ? sl(c.b_entrada - 0.2, 0.2, 0.78) : 0.25} w={390} />
          <Slider label="RENDA" v={one ? sl(c.b_renda - 0.2, 0.2, 0.7) : 0.5} w={390} color={one ? A.hex : C.muted} />
          <Slider label="VALOR FINANCIADO" v={one ? 0.3 : sl(c.b_parcela - 0.3, 0.3, 0.85)} w={390} color={one ? C.muted : C.warn} />
        </div>
        {sim > 0.01 ? (
          <div style={{ marginTop: 26, padding: "14px 18px", borderRadius: 18, background: C.bg1, opacity: Math.min(1, sim * 1.5) }}>
            <Label size={24} color={C.muted}>SIMULAÇÃO {one ? "A" : "B"}</Label>
            <div style={{ marginTop: 10, height: 18, borderRadius: 9, width: `${(one ? 0.45 : 0.9) * Math.min(1, sim) * 100}%`, background: one ? A.hex : C.warn }} />
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.08, y: -120 }, { t: c.b_mesmo + 0.4, s: 1.0, y: -40, e: ease.inOut }, { t: c.b_um + 0.4, s: 1.05, x: -120, y: 60, e: ease.inOut }, { t: c.b_outro + 0.4, s: 1.05, x: 120, y: 60, e: ease.inOut }, { t: c.b_sim + 0.4, s: 0.96, x: 0, y: -70, e: ease.inOut }, { t: c.b_dia + 0.3, s: 1.01, x: 0, y: -50, e: ease.inOut }, { t: c.c_isso, s: 1.02, y: -50, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 340, top: 380, width: 400, borderRadius: 28, overflow: "hidden", border: `3px solid ${C.line}`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
          <Thumb w={400} h={230} lit={prog(t, c.b_mesmo, 0.6, ease.out)} id="n0101" />
          <div style={{ padding: "12px 18px", background: C.surface, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Mesmo apartamento</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", opacity: 1 - Math.min(1, sim * 1.5) }}><Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={22} /></div>
        {profile(0, p1)}
        {profile(1, p2)}
        {day > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1300, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.1, day))})`, opacity: Math.min(1, day * 1.5) }}>
            <Tag text="MESMO DIA" tone="accent" size={30} />
          </div>
        ) : null}
      </Camera>
      {sim > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, sim * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          MESMO IMÓVEL<br /><span style={{ color: A.hex }}>SIMULAÇÕES DIFERENTES</span>
        </div>
      ) : null}
    </div>
  );
};

const CHECK = ["ORÇAMENTO E ENTRADA", "SIMULAÇÃO ATUALIZADA", "ALTERNATIVAS COMPARADAS"];
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.c_orc, c.c_sim, c.c_compare];
  const enter = sp(t, c.c_isso - 0.35, { damping: 15, stiffness: 150 });
  const ask = sp(t, c.c_hora - 0.4, { damping: 13, stiffness: 190 });
  const news = sp(t, c.c_isso + 0.6, { damping: 14, stiffness: 170 });
  const only = sp(t, c.c_copom - 0.05, { damping: 10, stiffness: 230 });
  const swap = prog(t, c.c_entenda - 0.3, 0.6, ease.inOut);
  const title = sp(t, c.c_entenda, { damping: 13, stiffness: 180 });
  const stamp = sp(t, c.c_juros - 0.1, { damping: 9, stiffness: 240 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.c_isso - 0.35, s: 1.05, y: -30 }, { t: c.c_copom + 0.3, s: 1.06, y: 0, r: -0.8, e: ease.inOut }, { t: c.c_entenda + 0.6, s: 1.0, y: 20, r: 0, e: ease.inOut }, { t: c.c_juros + 0.4, s: 1.03, y: 30, e: ease.inOut }, { t: c.cta_quer, s: 1.04, y: 30, e: ease.linear }]}>
        {/* a pergunta do cliente */}
        {ask > 0.001 ? (
          <div style={{ position: "absolute", left: 80, top: 400, display: "flex", alignItems: "flex-end", gap: 14, opacity: Math.min(1, ask * 1.5) * (1 - swap), transform: `translateX(${(1 - Math.min(1, ask)) * -120}px)` }}>
            <Person size={90} />
            <Msg side="in" size={40} style={{ maxWidth: 680 }}>Agora é uma boa hora para comprar?</Msg>
          </div>
        ) : null}
        {/* a notícia */}
        {news > 0.001 && swap < 1 ? (
          <div style={{ position: "absolute", left: 140, top: 640, width: 800, boxSizing: "border-box", borderRadius: 30, background: "#F2F0EA", color: "#14161A", padding: "26px 32px", opacity: Math.min(1, news * 1.5) * (1 - swap), transform: `translateY(${(1 - Math.min(1, news)) * 80}px) rotate(-1.5deg)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#676C75" }}>NOTÍCIA · 04/11/2026</div>
            <div style={{ fontWeight: 800, fontSize: 46, lineHeight: 1.1, marginTop: 8 }}>Copom mantém a Selic em 13,75% ao ano</div>
            {only > 0.01 ? (
              <div style={{ position: "absolute", right: -20, bottom: -36, transform: `rotate(6deg) scale(${mix(0.4, 1, Math.min(1.1, only))})` }}>
                <Tag text="SÓ A NOTÍCIA NÃO BASTA" tone="warn" size={28} style={{ background: "#2A1513", border: `2px solid ${C.warn}` }} />
              </div>
            ) : null}
          </div>
        ) : null}
        {/* o cenário */}
        {swap > 0.001
          ? CHECK.map((k, i) => {
              const p = sp(t, at[i] - 0.2, { damping: 13, stiffness: 200 });
              return (
                <div key={k} style={{ position: "absolute", left: 120, top: 560 + i * 150 + Math.sin(t * 1.8 + i * 1.3) * 6, width: 840, height: 124, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${p > 0.5 ? aa(0.5) : C.line}`, display: "flex", alignItems: "center", gap: 24, padding: "0 30px", opacity: Math.min(1, swap * 1.5) * mix(0.5, 1, Math.min(1, p)), transform: `translateX(${(1 - Math.min(1, p)) * 60}px)` }}>
                  <CheckDot p={prog(t, at[i] + 0.1, 0.4, ease.out)} size={60} />
                  <span style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em", color: C.text }}>{k}</span>
                </div>
              );
            })
          : null}
        {stamp > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", transform: `rotate(-3deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, opacity: Math.min(1, stamp * 1.5) }}>
            <div style={{ padding: "18px 34px", borderRadius: 26, background: A.deep, border: `3px solid ${A.hex}`, fontWeight: 800, fontSize: 46, color: C.text, boxShadow: `0 0 40px ${aa(0.3)}` }}>
              JUROS BÁSICOS <span style={{ color: A.hex }}>≠</span> FINANCIAMENTO
            </div>
          </div>
        ) : null}
      </Camera>
      {title > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 310, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5) * (1 - out) }}>
          O CLIENTE PRECISA DE <span style={{ color: A.hex }}>CENÁRIO</span>, NÃO PALPITE
        </div>
      ) : null}
    </div>
  );
};
