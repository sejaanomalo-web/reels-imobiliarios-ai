import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, IconDoc, IconX, Label, Msg, Person, Tag, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_02 — "Caixa estuda reajustar taxas" (formato: notícia → dois atendimentos). Fato verificado: em 13/11/2026 a Caixa disse
 * que ESTUDA reajuste; sem comunicado com taxa ou data até 17/11. Carimbo ESTUDO, nunca CONFIRMADO. Nenhuma taxa, data de vigência ou
 * valor inventado; atendimentos ilustrativos. Câmera: x/y = posição da câmera (y positivo sobe o conteúdo).
 */
const Headline: React.FC<{ stamp?: number; dim?: number }> = ({ stamp = 0, dim = 0 }) => (
  <div style={{ position: "relative", width: 860, boxSizing: "border-box", borderRadius: 30, background: "#F2F0EA", color: "#14161A", padding: "28px 34px", opacity: 1 - dim * 0.5, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#676C75" }}>NOTÍCIA · 13/11/2026</div>
    <div style={{ fontWeight: 800, fontSize: 50, lineHeight: 1.08, marginTop: 10, letterSpacing: "-0.02em" }}>Caixa estuda aumentar juros do financiamento imobiliário</div>
    {stamp > 0.01 ? (
      <div style={{ position: "absolute", right: 30, bottom: -34, transform: `rotate(-6deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, opacity: Math.min(1, stamp * 1.5) }}>
        <div style={{ padding: "10px 28px", border: "5px solid #C98A1E", borderRadius: 14, color: "#C98A1E", background: "#FFF6E3", fontFamily: F.mono, fontWeight: 800, fontSize: 40, letterSpacing: "0.12em" }}>ESTUDO</div>
      </div>
    ) : null}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, 0, { damping: 13, stiffness: 170 });
  const card = sp(t, c.h_est - 0.3, { damping: 14, stiffness: 160 });
  const word = sp(t, c.h_est2 - 0.15, { damping: 9, stiffness: 230 });
  const lens = prog(t, c.h_pal - 0.2, 1.2, ease.inOut);
  const out = prog(t, c.a_not - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={0.5} t={t} keys={[{ t: 0, s: 1.1, y: -60 }, { t: c.h_juros + 0.3, s: 1.0, y: 0, e: ease.inOut }, { t: c.h_est2, s: 1.08, y: 30, e: ease.inOut }, { t: c.a_not, s: 1.1, y: 30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontWeight: 800, fontSize: 132, letterSpacing: "-0.05em", lineHeight: 0.95, color: C.text, opacity: Math.min(1, title * 1.5) * (1 - prog(t, c.h_est2 - 0.2, 0.3, ease.in)), transform: `scale(${mix(1.3, 1, Math.min(1, title))})` }}>
          CAIXA<br /><span style={{ color: A.hex }}>ESTUDA</span>
        </div>
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 110, top: 760, opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 160}px) rotate(${(1 - Math.min(1, card)) * -4 - 1}deg)` }}>
            <Headline />
            {/* lupa sobre "estuda" */}
            <div style={{ position: "absolute", left: mix(560, 176, lens), top: 64, width: 184, height: 66, borderRadius: 33, border: `6px solid ${A.hex}`, boxShadow: `0 0 30px ${aa(0.5)}`, opacity: lens > 0.02 ? 1 : 0 }} />
          </div>
        ) : null}
        {word > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", opacity: Math.min(1, word * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, word))})` }}>
            <Label size={34} color={C.muted}>A PALAVRA MAIS IMPORTANTE</Label>
            <div style={{ fontWeight: 800, fontSize: 140, letterSpacing: "-0.05em", color: A.hex, textShadow: `0 0 50px ${aa(0.35)}`, marginTop: 6 }}>ESTUDANDO</div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_not - 0.35, { damping: 15, stiffness: 150 });
  const stamp = sp(t, c.a_treze + 0.2, { damping: 9, stiffness: 240 });
  const neq = sp(t, c.a_nao - 0.05, { damping: 11, stiffness: 220 });
  const msg = sp(t, c.a_comp - 0.3, { damping: 13, stiffness: 190 });
  const no = sp(t, c.a_horas + 0.2, { damping: 9, stiffness: 240 });
  const out = prog(t, c.b_pensa - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.a_not - 0.35, s: 1.05, y: -40 }, { t: c.a_mud, s: 1.0, y: 0, e: ease.inOut }, { t: c.a_comp + 0.4, s: 1.0, y: 30, e: ease.inOut }, { t: c.b_pensa, s: 1.03, y: 40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, top: 470 + Math.sin(t * 1.4) * 6, transform: "rotate(-1deg)" }}>
          <Headline stamp={stamp} dim={prog(t, c.a_comp, 0.5, ease.out)} />
        </div>
        {/* nunca CONFIRMADO */}
        {stamp > 0.5 ? (
          <div style={{ position: "absolute", left: 140, top: 830, display: "flex", alignItems: "center", gap: 14, opacity: prog(t, c.a_treze + 0.6, 0.4, ease.out) }}>
            <div style={{ position: "relative", padding: "8px 22px", border: `3px solid ${C.dim}`, borderRadius: 12, color: C.dim, fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em" }}>
              CONFIRMADO
              <div style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 5, background: C.warn, transform: "rotate(-6deg)" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 30, color: C.muted }}>sem comunicado com taxa ou data</span>
          </div>
        ) : null}
        {msg > 0.001 ? (
          <div style={{ position: "absolute", right: 90, top: 980, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14, opacity: Math.min(1, msg * 1.5), transform: `translateX(${(1 - Math.min(1, msg)) * 200}px)` }}>
            <Msg side="out" tone="warn" size={42} style={{ maxWidth: 720, opacity: 1 - no * 0.35 }}>Corre! Você tem poucas horas para fechar!</Msg>
            {no > 0.01 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, transform: `scale(${mix(0.4, 1, Math.min(1.1, no))})` }}>
                <IconX size={44} />
                <Tag text="NÃO AUTORIZA" tone="warn" size={30} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
      {neq > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 72, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, neq * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          ESTUDA <span style={{ color: C.warn }}>≠</span> JÁ AUMENTOU
        </div>
      ) : null}
    </div>
  );
};

const STEPS2 = ["EMISSÃO", "PRAZO", "CONFERÊNCIA", "REVISÃO"];
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_pensa - 0.35, { damping: 15, stiffness: 150 });
  const line = prog(t, c.b_pensa, 1.0, ease.inOut);
  const card = sp(t, c.b_envia - 0.2, { damping: 13, stiffness: 190 });
  const travel = prog(t, c.b_sem, c.b_banco - c.b_sem + 0.2, ease.inOut);
  const old = prog(t, c.b_sem + 0.2, 1.5, ease.inOut);
  const exp = sp(t, c.b_exp - 0.25, { damping: 13, stiffness: 190 });
  const bust = sp(t, c.b_banco - 0.05, { damping: 9, stiffness: 240 });
  const out = prog(t, c.c_prof - 0.45, 0.4, ease.in);
  const X0 = 140;
  const X1 = 940;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.b_pensa - 0.35, s: 1.06, y: 40 }, { t: c.b_val, s: 1.0, y: 0, e: ease.inOut }, { t: c.b_desc, s: 1.04, x: 60, y: 0, e: ease.inOut }, { t: c.b_banco + 0.4, s: 1.06, x: 120, y: 10, e: ease.inOut }, { t: c.c_prof, s: 1.06, x: 120, y: 10, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", gap: 14, opacity: 1 - Math.min(1, bust * 1.5) }}>
          <Tag text="LINHA DO TEMPO DA PROPOSTA" tone="muted" size={26} />
          <Tag text="ILUSTRATIVO" tone="muted" size={22} />
        </div>
        {/* linha do tempo */}
        <div style={{ position: "absolute", left: X0, top: 548, width: (X1 - X0) * line, height: 6, borderRadius: 3, background: C.line }} />
        {STEPS2.map((k, i) => {
          const x = X0 + (i / 3) * (X1 - X0);
          const a = prog(t, c.b_pensa + 0.2 + i * 0.2, 0.4, ease.out);
          const passed = mix(0, 1, travel) >= i / 3 - 0.01 && travel > 0;
          const bank = i === 3;
          return (
            <div key={k} style={{ position: "absolute", left: x - 90, top: 520, width: 180, textAlign: "center", opacity: a }}>
              <div style={{ margin: "0 auto", width: 62, height: 62, borderRadius: 31, background: passed ? (bank && bust > 0.5 ? C.warn : C.surface2) : C.surface, border: `4px solid ${passed ? (bank && bust > 0.5 ? C.warn : C.text) : C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {bank ? <IconBank size={34} color={passed && bust > 0.5 ? "#fff" : C.muted} /> : null}
              </div>
              <Label size={24} color={passed ? C.text : C.muted} style={{ marginTop: 12 }}>{k}</Label>
            </div>
          );
        })}
        {/* simulação antiga viajando */}
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: mix(250, 830, travel) - 190, top: 700 + Math.sin(t * 2) * 6, width: 380, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `3px solid ${bust > 0.5 ? C.warn : C.line}`, padding: "22px 24px", opacity: Math.min(1, card * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, card))}) rotate(${bust > 0.5 ? -3 : 0}deg)`, boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <IconDoc size={44} color={C.muted} />
              <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>Simulação</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
              <Label size={24}>TAXA</Label>
              <span style={{ fontWeight: 800, fontSize: 30, color: C.text, letterSpacing: "0.06em" }}>••••</span>
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <Label size={24}>EMITIDA</Label>
              <span style={{ fontWeight: 800, fontSize: 28, color: old > 0.5 ? C.warn : C.text }}>{old > 0.5 ? "há semanas" : "hoje"}</span>
            </div>
            {bust > 0.01 ? (
              <div style={{ position: "absolute", left: 20, right: 20, top: 60, display: "flex", justifyContent: "center", transform: `rotate(-8deg) scale(${mix(1.8, 1, Math.min(1, bust))})`, opacity: Math.min(1, bust * 1.5) }}>
                <div style={{ padding: "8px 18px", border: `4px solid ${C.warn}`, borderRadius: 12, color: C.warn, background: "rgba(21,24,29,0.92)", fontFamily: F.mono, fontWeight: 800, fontSize: 30 }}>DESATUALIZADA</div>
              </div>
            ) : null}
          </div>
        ) : null}
        {/* expectativa do cliente */}
        {exp > 0.001 ? (
          <div style={{ position: "absolute", left: 210, top: 1030, display: "flex", alignItems: "flex-end", gap: 14, opacity: Math.min(1, exp * 1.5), transform: `translateX(${(1 - Math.min(1, exp)) * -150}px)` }}>
            <Person size={96} q={bust} t={t} />
            <Msg side="in" size={40} style={{ maxWidth: 560 }}>{bust > 0.5 ? "Mas não era esse o valor?" : "Já planejei tudo com essa simulação!"}</Msg>
          </div>
        ) : null}
      </Camera>
      {bust > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 64, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, bust * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          SIMULAÇÃO ANTIGA <span style={{ color: C.warn }}>PODE MUDAR</span>
        </div>
      ) : null}
    </div>
  );
};

const GOOD = ["CONFIRMA TAXA E CONDIÇÕES ATUAIS", "EXPLICA O QUE DEPENDE DE ANÁLISE", "REGISTRA A ETAPA DA NEGOCIAÇÃO"];
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.c_conf, c.c_expl, c.c_reg];
  const enter = sp(t, c.c_prof - 0.35, { damping: 15, stiffness: 150 });
  const left = sp(t, c.c_prof - 0.1, { damping: 14, stiffness: 170 });
  const right = sp(t, c.c_prof + 0.3, { damping: 14, stiffness: 170 });
  const scale = sp(t, c.c_info - 0.1, { damping: 11, stiffness: 210 });
  const title = sp(t, c.c_confirme - 0.2, { damping: 12, stiffness: 190 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const tilt = mix(0, 1, prog(t, c.c_info, 0.8, ease.out));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={0.5} t={t} keys={[{ t: c.c_prof - 0.35, s: 1.04, y: -20 }, { t: c.c_conf, s: 1.04, x: 120, y: 0, e: ease.inOut }, { t: c.c_neg + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut }, { t: c.c_info + 0.6, s: 1.0, y: 10, e: ease.inOut }, { t: c.cta_quer, s: 1.02, y: 10, e: ease.linear }]}>
        {/* A: print velho */}
        <div style={{ position: "absolute", left: 60, top: 430, width: 340, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${aa(0)}`, padding: "22px", opacity: Math.min(1, left * 1.5) * mix(1, 0.5, prog(t, c.c_conf, 0.6, ease.out)), transform: `translateY(${(1 - Math.min(1, left)) * 120}px)` }}>
          <Label size={24} color={C.text}>CORRETOR A</Label>
          <div style={{ marginTop: 14, height: 260, borderRadius: 18, background: C.bg1, border: `2px dashed ${C.dim}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transform: "rotate(-3deg)" }}>
            <IconDoc size={60} color={C.dim} />
            <span style={{ fontWeight: 800, fontSize: 30, color: C.muted }}>print antigo</span>
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <IconX size={36} />
            <span style={{ fontWeight: 800, fontSize: 30, color: C.warn }}>envia sem conferir</span>
          </div>
        </div>
        {/* B: confere e registra */}
        <div style={{ position: "absolute", left: 430, top: 430, width: 590, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${aa(0.5)}`, padding: "22px 24px", opacity: Math.min(1, right * 1.5), transform: `translateY(${(1 - Math.min(1, right)) * 120}px)`, boxShadow: `0 0 34px ${aa(0.18)}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label size={24} color={C.text}>CORRETOR B</Label>
            <Tag text="CANAL OFICIAL" tone="accent" size={20} />
          </div>
          {GOOD.map((k, i) => {
            const p = sp(t, at[i] - 0.15, { damping: 13, stiffness: 200 });
            return (
              <div key={k} style={{ marginTop: 18, minHeight: 92, display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderRadius: 20, background: p > 0.5 ? A.deep : C.bg1, border: `2px solid ${p > 0.5 ? aa(0.5) : "transparent"}`, opacity: mix(0.45, 1, Math.min(1, p)), transform: `translateY(${Math.sin(t * 1.8 + i) * 3}px)` }}>
                <CheckDot p={prog(t, at[i], 0.4, ease.out)} size={46} />
                <span style={{ fontWeight: 800, fontSize: 29, lineHeight: 1.12, color: C.text }}>{k}</span>
              </div>
            );
          })}
        </div>
        {/* balança */}
        {scale > 0.01 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 1060, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, opacity: Math.min(1, scale * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, scale))})` }}>
            <div style={{ padding: "22px 28px", borderRadius: 26, background: A.deep, border: `3px solid ${A.hex}`, fontWeight: 800, fontSize: 38, color: C.text, transform: `translateY(${tilt * 20}px)` }}>INFORMAÇÃO PRECISA</div>
            <span style={{ fontWeight: 800, fontSize: 60, color: A.hex }}>&gt;</span>
            <div style={{ padding: "22px 28px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, fontWeight: 800, fontSize: 34, color: C.muted, transform: `translateY(${-tilt * 20}px)` }}>urgência fabricada</div>
          </div>
        ) : null}
      </Camera>
      {title > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 64, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, title * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          CONFIRA <span style={{ color: A.hex }}>ANTES DE PROMETER</span>
        </div>
      ) : null}
    </div>
  );
};
