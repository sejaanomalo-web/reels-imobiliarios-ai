import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_14 — "Cinco mil moradias aptas: e agora?". Ministério das Cidades, DOU de 04/11/2026: 5.353 unidades do MCMV aptas para
 * contratação (12 estados). Etapa administrativa — nada de disponibilidade comercial, venda, prazo ou enquadramento. Etapas da linha do
 * tempo simplificadas e marcadas ILUSTRATIVAS; manchete, celular e conversa ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

const Headline: React.FC<{ p: number; t: number; w?: number }> = ({ p, t, w = 840 }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "24px 28px", borderRadius: 26, background: "#F2F2EE", color: "#151515", opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 60}px) rotate(${Math.sin(t * 1.2) * 0.8}deg)`, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#666" }}>NOTÍCIA · ILUSTRATIVA</div>
    <div style={{ marginTop: 10, fontWeight: 800, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.02em" }}>Mais de 5 mil moradias aptas para contratação no MCMV</div>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const head = sp(t, -0.15, { damping: 13, stiffness: 160 });
  const num = sp(t, c.h_cinco - 0.15, { damping: 11, stiffness: 210 });
  const src = prog(t, c.h_mcmv - 0.1, 0.4, ease.out);
  const q = sp(t, c.h_prontas - 0.15, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_nao - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={2.6} t={t} keys={[{ t: 0, s: 1.1, y: -20 }, { t: 1.0, s: 1.16, x: 10, y: -25, e: ease.out }, { t: c.h_aptas, s: 1.1, x: -10, y: -15, e: ease.linear }, { t: c.h_prontas + 0.3, s: 1.06, x: 0, y: -35, e: ease.inOut }, { t: c.a_nao, s: 1.1, y: -40, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 120, top: 440 }}><Headline p={head} t={t} /></div>
        {num > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 700, textAlign: "center", fontWeight: 800, fontSize: 150, letterSpacing: "-0.05em", color: C.text, textShadow: `0 0 50px ${aa(0.3)}`, opacity: fade(num), transform: `scale(${mix(0.6, 1, Math.min(1.05, num))})` }}>5.353</div> : null}
        {num > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 870, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.1em", color: A.hex, opacity: fade(num) }}>UNIDADES APTAS</div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 930, display: "flex", justifyContent: "center", opacity: src }}><Tag text="MINISTÉRIO DAS CIDADES · DOU 04/11/2026" tone="muted" size={24} /></div>
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: fade(q), transform: `scale(${mix(0.5, 1, Math.min(1.08, q))}) rotate(-3deg)` }}><Tag text="PRONTAS PARA VENDER?" tone="warn" size={36} /></div> : null}
      </Camera>
      <Title p={title} size={58}>5.353 <span style={{ color: A.hex }}>UNIDADES APTAS</span></Title>
    </div>
  );
};

const STEPS = ["PROPOSTA", "APTA PARA CONTRATAÇÃO", "CONTRATAÇÃO", "OBRA", "ENTREGA"];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_nao - 0.35, { damping: 15, stiffness: 150 });
  const no = sp(t, c.a_nao - 0.1, { damping: 10, stiffness: 240 });
  const steps = STEPS.map((_, i) => sp(t, c.a_aptas - 0.2 + i * 0.15, { damping: 12, stiffness: 210 }));
  const here = sp(t, c.a_etapa - 0.1, { damping: 11, stiffness: 220 });
  const min = sp(t, c.a_min - 0.15, { damping: 12, stiffness: 200 });
  const prop = sp(t, c.a_prop - 0.15, { damping: 12, stiffness: 200 });
  const adv = prog(t, c.a_avanc - 0.2, 0.7, ease.inOut);
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.6} t={t} keys={[{ t: c.a_nao - 0.35, s: 1.08, y: 0 }, { t: c.a_aptas + 0.3, s: 1.06, x: 10, y: -10, e: ease.out }, { t: c.a_etapa + 0.3, s: 1.1, x: -10, y: -10, e: ease.linear }, { t: c.a_min + 0.3, s: 1.05, x: 10, y: -25, e: ease.inOut }, { t: c.a_avanc + 0.3, s: 1.09, x: -10, y: -30, e: ease.linear }, { t: c.b_imag, s: 1.06, y: -30, e: ease.inOut }]}>
        {no > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(no) * (1 - fade(min)), transform: `scale(${mix(1.8, 1, Math.min(1, no))})` }}><Tag text="NÃO" tone="warn" size={40} /></div> : null}
        <div style={{ position: "absolute", left: 160, top: 470, width: 760 }}>
          <div style={{ position: "absolute", left: 26, top: 30, width: 4, height: 4 * 120, background: C.surface3 }} />
          <div style={{ position: "absolute", left: 26, top: 30, width: 4, height: mix(120, 145, adv), background: A.hex }} />
          {STEPS.map((k, i) => {
            const isHere = i === 1;
            return (
              <div key={k} style={{ position: "relative", height: 120, display: "flex", alignItems: "center", gap: 22, opacity: fade(steps[i]) * (i > 1 ? 0.55 : 1), transform: `translateX(${(1 - Math.min(1, steps[i])) * -60}px)` }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, flex: "none", background: i === 0 ? A.hex : isHere && here > 0.5 ? aa(0.25) : C.surface2, border: `4px solid ${i <= 1 ? A.hex : C.dim}`, boxShadow: isHere && here > 0.5 ? `0 0 ${24 + 10 * Math.sin(t * 5)}px ${aa(0.6)}` : "none" }} />
                <span style={{ fontWeight: 800, fontSize: isHere ? 38 : 32, color: i <= 1 ? C.text : C.muted }}>{k}</span>
                {isHere && here > 0.001 ? <span style={{ opacity: fade(here), transform: `translateX(${Math.sin(t * 4) * 6}px)` }}><Tag text="◀ AQUI" tone="accent" size={26} /></span> : null}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1100, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          {min > 0.001 ? <div style={{ opacity: fade(min) }}><Tag text="MINISTÉRIO DAS CIDADES · 04/11" tone="muted" size={24} /></div> : null}
          {prop > 0.001 ? <div style={{ opacity: fade(prop) }}><Tag text="PROPOSTAS DE EMPREENDIMENTOS" tone="accent" size={24} /></div> : null}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(steps[4]) * 0.9 }}><Tag text="ETAPAS SIMPLIFICADAS · ILUSTRATIVO" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={58}>APTO <span style={{ color: C.warn }}>NÃO É</span> ENTREGUE</Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const phone = sp(t, c.b_imag - 0.1, { damping: 13, stiffness: 170 });
  const tap = prog(t, c.b_noticia - 0.1, 0.3, ease.out);
  const ask = sp(t, c.b_pergunta - 0.1, { damping: 12, stiffness: 200 });
  const keys = sp(t, c.b_chaves - 0.1, { damping: 11, stiffness: 220 });
  const alert = sp(t, c.b_conf - 0.15, { damping: 10, stiffness: 230 });
  const neq = sp(t, c.b_disp - 0.15, { damping: 11, stiffness: 220 });
  const err = sp(t, c.b_errada - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_antes - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.6} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.05, y: 0 }, { t: c.b_noticia + 0.2, s: 1.1, x: 10, y: -10, e: ease.out }, { t: c.b_chaves + 0.2, s: 1.07, x: -10, y: -20, e: ease.linear }, { t: c.b_conf + 0.3, s: 1.11, x: 0, y: -25, e: ease.inOut }, { t: c.b_errada + 0.2, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: c.c_antes, s: 1.07, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 220, top: 430, width: 640, height: 500, boxSizing: "border-box", borderRadius: 44, background: C.bg1, border: `6px solid ${C.surface3}`, overflow: "hidden", opacity: fade(phone), transform: `translateY(${(1 - Math.min(1, phone)) * 60 + Math.sin(t * 1.5) * 5}px)` }}>
          <div style={{ position: "absolute", left: 20, right: 20, top: 40, transform: `scale(${1 - tap * 0.04})`, transformOrigin: "50% 50%" }}><Headline p={1} t={0} w={588} /></div>
          {tap > 0 && tap < 1 ? <div style={{ position: "absolute", left: 300, top: 120, width: 60 + tap * 60, height: 60 + tap * 60, marginLeft: -(30 + tap * 30), marginTop: -(30 + tap * 30), borderRadius: 999, background: aa(0.35 * (1 - tap)) }} /> : null}
          {ask > 0.001 ? (
            <div style={{ position: "absolute", left: 20, right: 20, top: 330, display: "flex", alignItems: "flex-end", gap: 12, opacity: fade(ask), transform: `translateY(${(1 - Math.min(1, ask)) * 40}px)` }}>
              <Person size={70} t={t} />
              <Msg side="in" size={30}>Já posso escolher a unidade{keys > 0.5 ? " e pegar as chaves?" : "?"}</Msg>
            </div>
          ) : null}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(phone) }}><Tag text="CONVERSA ILUSTRATIVA" tone="muted" size={24} /></div>
        {alert > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 960, boxSizing: "border-box", padding: "16px 22px", borderRadius: 22, background: WARN_BG, border: "2px solid rgba(255,107,94,0.65)", display: "flex", alignItems: "center", gap: 16, opacity: fade(alert), transform: `scale(${mix(0.6, 1, Math.min(1.05, alert))})` }}>
            <span style={{ fontSize: 44 }}>⚠️</span>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>ETAPA: <span style={{ color: C.warn }}>APTA PARA CONTRATAÇÃO</span></span>
          </div>
        ) : null}
        {neq > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, textAlign: "center", fontWeight: 800, fontSize: 40, color: C.text, opacity: fade(neq), transform: `scale(${mix(1.2, 1, Math.min(1, neq))})` }}>Aprovação administrativa <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>imóvel disponível</span></div> : null}
        {err > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1135, display: "flex", justifyContent: "center", opacity: fade(err), transform: `scale(${mix(0.5, 1, Math.min(1.08, err))})` }}><Tag text="✕ INFORMAÇÃO ERRADA" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={58}>ETAPAS <span style={{ color: A.hex }}>DIFERENTES</span></Title>
    </div>
  );
};

const CHK = [
  { k: "LOCAL", s: "onde fica", at: "c_onde" },
  { k: "ETAPA", s: "em que fase está", at: "c_fase" },
  { k: "CRITÉRIOS", s: "quem pode se candidatar", at: "c_cand" },
  { k: "CANAL OFICIAL", s: "quem recebe os interessados", at: "c_canal" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_antes - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.c_antes - 0.2, { damping: 14, stiffness: 170 });
  const pub = sp(t, c.c_antes + 0.1, { damping: 12, stiffness: 200 });
  const rows = CHK.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const ctx = sp(t, c.c_ctx - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_anunc - 0.3, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.6} t={t} keys={[{ t: c.c_antes - 0.35, s: 1.05, y: 0 }, { t: c.c_antes + 1.2, s: 1.1, x: 10, y: -10, e: ease.out }, { t: c.c_fase + 0.3, s: 1.06, x: -10, y: -20, e: ease.linear }, { t: c.c_canal + 0.3, s: 1.09, x: 10, y: -25, e: ease.inOut }, { t: c.c_ctx + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: c.x_fase, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {pub > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(pub) }}><Tag text="ANTES DE PUBLICAR" tone="warn" size={28} /></div> : null}
        <div style={{ position: "absolute", left: 110, right: 110, top: 490, boxSizing: "border-box", padding: "20px 24px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: fade(list), transform: `translateY(${(1 - Math.min(1, list)) * 80 + Math.sin(t * 1.4) * 5}px)` }}>
          {CHK.map((r, i) => (
            <div key={r.k} style={{ marginTop: i ? 12 : 0, height: 96, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: rows[i] > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${rows[i] > 0.5 ? A.hex : "transparent"}` }}>
              <CheckDot p={Math.min(1, rows[i])} size={46} n={i + 1} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{r.k}</span>
                <span style={{ fontWeight: 600, fontSize: 24, color: A.hex, opacity: fade(rows[i]) }}>{r.s}</span>
              </div>
            </div>
          ))}
        </div>
        {ctx > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: fade(ctx) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, ctx))})` }}><Tag text="INFORMAÇÃO HABITACIONAL EXIGE CONTEXTO" tone="accent" size={26} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 980, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Antes de anunciar,<br /><span style={{ color: A.hex }}>confira a fase</span></div> : null}
      </Camera>
      <Title p={enter} size={52}>CONFIRA <span style={{ color: A.hex }}>A FASE DO PROJETO</span></Title>
    </div>
  );
};
