import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, Label, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_05 — "Aprovado não é contrato assinado" (história hipotética em checklist). Conteúdo educativo: o fluxo e os nomes das
 * etapas variam por instituição e modalidade (na tela). Sem prazo, taxa, fraude ou culpa do comprador. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);

const Phone: React.FC<{ w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, children, style }) => (
  <div style={{ position: "absolute", width: w, height: h, boxSizing: "border-box", borderRadius: 48, background: C.bg1, border: `6px solid ${C.surface3}`, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", ...style }}>
    <div style={{ position: "absolute", left: "50%", top: 14, width: 120, height: 22, marginLeft: -60, borderRadius: 11, background: C.surface3 }} />
    {children}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, 0, { damping: 13, stiffness: 170 });
  const msg = sp(t, Math.min(0.5, c.h_cli - 0.2), { damping: 12, stiffness: 190 });
  const party = prog(t, c.h_comem - 0.1, 1.6, ease.linear);
  const sold = sp(t, c.h_comem - 0.1, { damping: 11, stiffness: 210 });
  const stop = prog(t, c.h_so - 0.1, 0.4, ease.out);
  const list = sp(t, c.h_quase - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.a_hip - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.1, y: -20 }, { t: ((0) + (c.h_aprov)) / 2 + 0, s: 1.130, x: 21, y: -18, e: ease.inOut }, { t: c.h_aprov, s: 1.06, x: 15, y: -10, e: ease.inOut }, { t: ((c.h_aprov) + (c.h_comem + 0.3)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.h_comem + 0.3, s: 1.09, x: -15, y: -20, e: ease.inOut }, { t: ((c.h_comem + 0.3) + (c.h_so + 0.2)) / 2 + 0, s: 1.120, x: 6, y: -18, e: ease.inOut }, { t: c.h_so + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut }, { t: c.a_hip, s: 1.08, x: 0, y: -20, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}><Tag text="CONVERSA ILUSTRATIVA" tone="muted" size={24} /></div>
        <Phone w={560} h={520} style={{ left: 260, top: 470, transform: `translateY(${Math.sin(t * 1.5) * 6}px) rotate(${Math.sin(t * 1.1) * 1}deg)` }}>
          <div style={{ position: "absolute", left: 24, right: 24, top: 70, display: "flex", flexDirection: "column", gap: 18 }}>
            {msg > 0.001 ? <div style={{ opacity: Math.min(1, msg * 1.5), transform: `translateY(${(1 - Math.min(1, msg)) * 40}px)` }}><Msg side="in" size={38}>Meu financiamento foi aprovado!</Msg></div> : null}
            {sold > 0.001 ? <div style={{ display: "flex", justifyContent: "flex-end", opacity: Math.min(1, sold * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, sold))})`, transformOrigin: "100% 50%" }}><Msg side="out" tone="good" size={38}>Vendido! Parabéns!</Msg></div> : null}
          </div>
        </Phone>
        {/* confete que congela */}
        {party > 0 ? Array.from({ length: 16 }).map((_, i) => {
          const pp = Math.min(party, stop > 0 ? (c.h_so - 0.1 - (c.h_comem - 0.1)) / 1.6 : 1);
          const x = 200 + rnd(i * 3) * 680, y = 420 + pp * (300 + rnd(i * 5) * 420);
          return <div key={i} style={{ position: "absolute", left: x + Math.sin(pp * 8 + i) * 20, top: y, width: 14, height: 24, borderRadius: 3, background: i % 2 ? A.hex : C.text, opacity: (1 - pp) * 0.9 * (1 - stop * 0.6), transform: `rotate(${pp * 600 * (rnd(i) - 0.5)}deg)` }} />;
        }) : null}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 160, right: 160, top: 1010, boxSizing: "border-box", padding: "18px 24px", borderRadius: 26, background: C.surface, border: `2px solid rgba(255,107,94,0.55)`, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80}px)` }}>
            {[1, 0, 0, 0, 0].map((d, k) => <CheckDot key={k} p={d} size={44} />)}
            <span style={{ marginLeft: 8, fontWeight: 800, fontSize: 34, color: C.warn }}>FALTA QUASE TUDO</span>
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={58}>NÃO COMEMORE <span style={{ color: C.warn }}>ANTES DA HORA</span></Title>
    </div>
  );
};

const STEPS = [
  { k: "ANÁLISE INICIAL", at: "a_ini" },
  { k: "AVALIAÇÃO DO IMÓVEL", at: "a_aval" },
  { k: "CONFERÊNCIA DE DOCUMENTOS", at: "a_doc" },
  { k: "CONDIÇÕES A CUMPRIR", at: "a_cond" },
];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_hip - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.a_hip - 0.2, { damping: 13, stiffness: 180 });
  const rows = STEPS.map((s) => sp(t, c[s.at] - 0.2, { damping: 12, stiffness: 200 }));
  const keys = sp(t, c.a_chaves - 0.3, { damping: 12, stiffness: 190 });
  const jump = prog(t, c.a_acha - 0.1, Math.max(0.8, c.a_chaves - c.a_acha + 0.3), ease.inOut);
  const back = prog(t, c.a_mas - 0.1, 0.6, ease.inOut);
  const out = prog(t, c.b_se - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_hip - 0.35, s: 1.05, y: 0 }, { t: ((c.a_hip - 0.35) + (c.a_ini + 0.3)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.a_ini + 0.3, s: 1.09, x: 0, y: -15, e: ease.inOut }, { t: ((c.a_ini + 0.3) + (c.a_comp + 0.2)) / 2 + 0, s: 1.120, x: -22, y: -18, e: ease.inOut }, { t: c.a_comp + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut }, { t: ((c.a_comp + 0.2) + (c.a_chaves + 0.3)) / 2 + 0, s: 1.110, x: 14, y: -18, e: ease.inOut }, { t: c.a_chaves + 0.3, s: 1.08, x: 15, y: -20, e: ease.inOut }, { t: ((c.a_chaves + 0.3) + (c.a_mas + 0.3)) / 2 + 0, s: 1.110, x: -7, y: -18, e: ease.inOut }, { t: c.a_mas + 0.3, s: 1.04, x: 0, y: -5, e: ease.inOut }, { t: ((c.a_mas + 0.3) + (c.a_doc + 0.2)) / 2 + 0, s: 1.110, x: 9, y: -18, e: ease.inOut }, { t: c.a_doc + 0.2, s: 1.08, x: -10, y: -15, e: ease.inOut }, { t: c.b_se, s: 1.05, y: -10, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", opacity: Math.min(1, card * 1.5) }}><Tag text="EXEMPLO HIPOTÉTICO" tone="muted" size={26} style={{ color: C.text }} /></div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 470, boxSizing: "border-box", padding: "22px 26px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 80 + Math.sin(t * 1.4) * 6}px)` }}>
          <Label size={26} color={C.text}>CAMINHO ATÉ AS CHAVES</Label>
          {STEPS.map((s, i) => {
            const p = rows[i];
            const done = i === 0 && p > 0.5;
            return (
              <div key={s.k} style={{ marginTop: 14, height: 88, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: done ? aa(0.12) : i > 0 && p > 0.5 ? WARN_BG : C.surface2, opacity: mix(0.35, 1, Math.min(1, p)), transform: `translateX(${(1 - Math.min(1, p)) * 40}px)` }}>
                <CheckDot p={done ? 1 : 0} size={44} n={i + 1} />
                <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>{s.k}</span>
                {p > 0.5 ? <Tag text={done ? "OK" : "PENDENTE"} tone={done ? "accent" : "warn"} size={22 + 2} /> : null}
              </div>
            );
          })}
          <div style={{ marginTop: 14, height: 88, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, border: `2px dashed ${C.dim}`, opacity: Math.min(1, keys * 1.5) }}>
            <span style={{ fontSize: 44 }}>🔑</span><span style={{ fontWeight: 800, fontSize: 32, color: C.muted }}>CHAVES</span>
          </div>
        </div>
        {/* o comprador acha que o próximo passo são as chaves */}
        {jump > 0.001 ? (
          <div style={{ position: "absolute", left: 640, top: mix(mix(565, 975, jump), 565, back), opacity: Math.min(1, jump * 3) * (1 - back * 0.7), transform: `translateX(${Math.sin(t * 4) * 6}px)` }}>
            <Tag text={back > 0.5 ? "AINDA NÃO" : "PRÓXIMO: CHAVES?"} tone={back > 0.5 ? "warn" : "accent"} size={24} style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }} />
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={44}>APROVAÇÃO INICIAL <span style={{ color: C.warn }}>NÃO É FECHAMENTO</span></Title>
    </div>
  );
};

const LINE = ["ANÁLISE", "AVALIAÇÃO", "DOCUMENTOS", "CONTRATO", "REGISTRO"];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_se - 0.35, { damping: 15, stiffness: 150 });
  const bubble = sp(t, c.b_certo - 0.4, { damping: 11, stiffness: 210 });
  const exp = prog(t, c.b_exp - 0.1, 0.8, ease.out);
  const pend = sp(t, c.b_pend - 0.15, { damping: 11, stiffness: 210 });
  const drop = prog(t, c.b_conf - 0.1, 1.0, ease.inOut);
  const out = prog(t, c.c_uma - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_se - 0.35, s: 1.05, y: 0 }, { t: ((c.b_se - 0.35) + (c.b_certo + 0.2)) / 2 + 0, s: 1.120, x: 21, y: -18, e: ease.inOut }, { t: c.b_certo + 0.2, s: 1.09, x: 15, y: -15, e: ease.inOut }, { t: ((c.b_certo + 0.2) + (c.b_exp + 0.3)) / 2 + 0, s: 1.120, x: -7, y: -18, e: ease.inOut }, { t: c.b_exp + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut }, { t: ((c.b_exp + 0.3) + (c.b_pend + 0.2)) / 2 + 0, s: 1.120, x: 6, y: -18, e: ease.inOut }, { t: c.b_pend + 0.2, s: 1.09, x: -15, y: -20, e: ease.inOut }, { t: ((c.b_pend + 0.2) + (c.b_conf + 0.4)) / 2 + 0, s: 1.120, x: -22, y: -18, e: ease.inOut }, { t: c.b_conf + 0.4, s: 1.05, x: 0, y: -10, e: ease.inOut }, { t: c.c_uma, s: 1.08, y: -15, e: ease.linear }]}>
        {/* linha do tempo */}
        <div style={{ position: "absolute", left: 120, right: 120, top: 520, height: 10, borderRadius: 5, background: C.surface3 }} />
        <div style={{ position: "absolute", left: 120, top: 520, width: 840 * 0.12, height: 10, borderRadius: 5, background: A.hex }} />
        {LINE.map((k, i) => {
          const x = 120 + i * 210;
          const isPend = i === 2 && pend > 0.5;
          return (
            <div key={k} style={{ position: "absolute", left: x - 90, top: 490, width: 180, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 70, height: 70, borderRadius: 35, background: i === 0 ? A.hex : isPend ? C.warn : C.surface2, border: `4px solid ${i === 0 ? A.hex : isPend ? C.warn : C.dim}`, transform: `scale(${isPend ? 1 + 0.08 * Math.sin(t * 6) : 1})` }} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: isPend ? C.warn : i === 0 ? C.text : C.muted }}>{k}</span>
            </div>
          );
        })}
        {pend > 0.001 ? <div style={{ position: "absolute", left: 420, top: 640, opacity: Math.min(1, pend * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, pend))})` }}><Tag text="PENDÊNCIA" tone="warn" size={28} /></div> : null}
        {/* "está tudo certo" + expectativa */}
        {bubble > 0.001 ? (
          <div style={{ position: "absolute", left: 140, top: 740, display: "flex", alignItems: "flex-end", gap: 18, opacity: Math.min(1, bubble * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, bubble))})`, transformOrigin: "0 100%" }}>
            <Person size={110} t={t} />
            <Msg side="out" tone={pend > 0.5 ? "dim" : "good"} size={40}>Está tudo certo!</Msg>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 160, right: 160, top: 960, opacity: exp }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}><span>EXPECTATIVA DO CLIENTE</span></div>
          <div style={{ marginTop: 8, height: 22, borderRadius: 11, background: C.surface3, overflow: "hidden" }}><div style={{ width: `${mix(10, 95, exp) + Math.sin(t * 3) * 2}%`, height: "100%", borderRadius: 11, background: A.hex }} /></div>
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, opacity: Math.min(1, pend * 1.5) }}><span>CONFIANÇA NO ATENDIMENTO</span></div>
          <div style={{ marginTop: 8, height: 22, borderRadius: 11, background: C.surface3, overflow: "hidden", opacity: Math.min(1, pend * 1.5) }}><div style={{ width: `${mix(90, 30, drop) + Math.sin(t * 3 + 1) * 2}%`, height: "100%", borderRadius: 11, background: drop > 0.5 ? C.warn : A.hex }} /></div>
        </div>
      </Camera>
      <Title p={enter} size={50}>EXPECTATIVA <span style={{ color: A.hex }}>PRECISA SER REALISTA</span></Title>
    </div>
  );
};

const FASES = ["EM ANÁLISE", "DOCUMENTOS", "CONTRATO", "REGISTRO"];
const INFO = [["FASE ATUAL", "c_fase"], ["O QUE AINDA FALTA", "c_verif"], ["QUANDO CONFIRMAR", "c_quando"]];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_uma - 0.35, { damping: 15, stiffness: 150 });
  const steps = FASES.map((_, i) => sp(t, c.c_uma + i * 0.18, { damping: 13, stiffness: 190 }));
  const here = sp(t, c.c_fase - 0.1, { damping: 11, stiffness: 210 });
  const info = INFO.map(([, k]) => sp(t, c[k] - 0.15, { damping: 12, stiffness: 200 }));
  const fin = sp(t, c.x_aprov - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_uma - 0.35, s: 1.05, y: 0 }, { t: ((c.c_uma - 0.35) + (c.c_fase + 0.2)) / 2 + 0, s: 1.120, x: 21, y: -18, e: ease.inOut }, { t: c.c_fase + 0.2, s: 1.09, x: 15, y: -15, e: ease.inOut }, { t: ((c.c_fase + 0.2) + (c.c_verif + 0.2)) / 2 + 0, s: 1.120, x: -12, y: -18, e: ease.inOut }, { t: c.c_verif + 0.2, s: 1.05, x: -10, y: -10, e: ease.inOut }, { t: ((c.c_verif + 0.2) + (c.c_quando + 0.2)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.c_quando + 0.2, s: 1.09, x: 10, y: -15, e: ease.inOut }, { t: ((c.c_quando + 0.2) + (c.c_prox + 0.3)) / 2 + 0, s: 1.120, x: -9, y: -18, e: ease.inOut }, { t: c.c_prox + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut }, { t: ((c.c_prox + 0.3) + (c.x_fech + 0.2)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.x_fech + 0.2, s: 1.09, x: 0, y: -20, e: ease.inOut }, { t: c.cta_quer, s: 1.05, y: -10, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, top: 420, width: 420 }}>
          {FASES.map((f, i) => (
            <div key={f} style={{ position: "relative", height: 120, display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, steps[i] * 1.5), transform: `translateX(${(1 - Math.min(1, steps[i])) * -60}px)` }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, background: i === 0 ? A.hex : C.surface2, border: `4px solid ${i === 0 ? A.hex : C.dim}`, flex: "none", boxShadow: i === 0 && here > 0.5 ? `0 0 ${24 + 10 * Math.sin(t * 4)}px ${aa(0.6)}` : "none" }} />
              {i < 3 ? <div style={{ position: "absolute", left: 26, top: 92, width: 4, height: 56, background: C.dim }} /> : null}
              <span style={{ fontWeight: 800, fontSize: 34, color: i === 0 ? C.text : C.muted }}>{f}</span>
            </div>
          ))}
          {here > 0.001 ? <div style={{ position: "absolute", left: 300, top: 32, opacity: Math.min(1, here * 1.5), transform: `translateX(${Math.sin(t * 4) * 6}px)` }}><Tag text="◀ AQUI" tone="accent" size={26} /></div> : null}
          <div style={{ marginTop: 10, opacity: prog(t, c.c_uma + 1, 0.4, ease.out) }}><Tag text="ORDEM E NOMES VARIAM POR BANCO" tone="muted" size={22 + 2} /></div>
        </div>
        {INFO.map(([k], i) => (info[i] > 0.001 ? (
          <div key={k} style={{ position: "absolute", left: 580, right: 90, top: 440 + i * 150, height: 120, boxSizing: "border-box", padding: "0 22px", borderRadius: 24, background: aa(0.1), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, info[i] * 1.5), transform: `translateX(${(1 - Math.min(1, info[i])) * 120 + Math.sin(t * 2 + i) * 5}px)` }}>
            <CheckDot p={Math.min(1, info[i])} size={42} />
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text, lineHeight: 1.05 }}>{k}</span>
          </div>
        ) : null))}
        {fin > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1060, textAlign: "center", fontWeight: 800, fontSize: 50, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, fin * 1.5), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>
            Aprovação inicial <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>fechamento</span>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={54}>EXPLIQUE <span style={{ color: A.hex }}>O PRÓXIMO PASSO</span></Title>
    </div>
  );
};
