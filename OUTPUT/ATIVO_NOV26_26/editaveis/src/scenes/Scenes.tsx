import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Msg, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_26 — "44% dos leads fora do expediente". Secovi-SP (nov/2026): Bernardo Dorigo (QuintoAndar) estimou, com levantamentos
 * da empresa, que 44% dos leads aparecem fora do horário comercial — estimativa de UMA empresa, não taxa nacional. Situação das 22h
 * HIPOTÉTICA; conversas e notificações SIMULADAS; mensagem automática identificada como tal; sem prometer função da ATIVO.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

const Phone: React.FC<{ w: number; h: number; clock: string; label?: string; children: React.ReactNode; tone?: string }> = ({ w, h, clock, label, children, tone = C.surface3 }) => (
  <div style={{ width: w, height: h, boxSizing: "border-box", borderRadius: 46, background: "#0B0C0F", border: `4px solid ${tone}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>{clock}</span>
      {label ? <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{label}</span> : null}
    </div>
    {children}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const ph = sp(t, -0.2, { damping: 13, stiffness: 170 });
  const m1 = sp(t, c.h_msg - 0.2, { damping: 11, stiffness: 220 });
  const jump = prog(t, c.h_quando - 0.1, 0.5, ease.inOut);
  const r1 = sp(t, c.h_seg - 0.1, { damping: 11, stiffness: 220 });
  const m2 = sp(t, c.h_outra - 0.3, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_hip - 0.35, 0.3, ease.in);
  const clock = jump < 0.5 ? "22:00" : "09:30";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, x: 6, y: -6 }, { t: 1.0, s: 1.12, x: -6, y: -14, e: ease.out }, { t: c.h_quando, s: 1.08, x: 6, y: -18, e: ease.linear }, { t: c.h_outra, s: 1.1, x: 0, y: -26, e: ease.linear }, { t: c.a_hip, s: 1.08, y: -28, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 540 - 270, top: 500, opacity: fade(ph), transform: `translateY(${(1 - Math.min(1, ph)) * 80 + fl(t, 0, 8)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
          <Phone w={540} h={600} clock={clock} label={jump < 0.5 ? "🌙 NOITE" : "☀️ DIA SEGUINTE"} tone={jump < 0.5 ? C.surface3 : A.hex}>
            {m1 > 0.001 ? <div style={{ opacity: fade(m1), transform: `translateY(${(1 - Math.min(1, m1)) * 30}px)` }}><Msg side="in" size={30}>Oi! O apartamento ainda está disponível?</Msg></div> : null}
            {r1 > 0.001 ? <div style={{ alignSelf: "flex-end", opacity: fade(r1), transform: `translateY(${(1 - Math.min(1, r1)) * 30}px)` }}><Msg side="out" tone="good" size={30}>Bom dia! Está sim 😊</Msg></div> : null}
            {m2 > 0.001 ? <div style={{ opacity: fade(m2), transform: `translateY(${(1 - Math.min(1, m2)) * 30}px)` }}><Msg side="in" tone="warn" size={30}>Obrigado, já marquei com outra pessoa.</Msg></div> : null}
          </Phone>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1120, display: "flex", justifyContent: "center", opacity: fade(ph) }}><Tag text="CONVERSA SIMULADA" tone="muted" size={24} /></div>
      </Camera>
      <Title p={title} size={58}><span style={{ color: A.hex }}>22H:</span> LEAD CHEGOU</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_hip - 0.35, { damping: 15, stiffness: 150 });
  const hip = sp(t, c.a_hip - 0.1, { damping: 11, stiffness: 220 });
  const src = sp(t, c.a_estim - 0.2, { damping: 12, stiffness: 200 });
  const big = sp(t, c.a_hip + 0.2, { damping: 12, stiffness: 200 });
  const dial = prog(t, c.a_hip + 0.4, Math.max(1, c.a_fora - c.a_hip), ease.out);
  const out = prog(t, c.b_isso - 0.4, 0.35, ease.in);
  const v = Math.round(44 * Math.min(1, prog(t, c.a_44 - 0.1, 0.6, ease.out)));
  const R = 120;
  const arc = (a0: number, a1: number) => { const p = (a: number) => [R + R * Math.sin(a), R - R * Math.cos(a)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M${R},${R} L${x0},${y0} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1},${y1} Z`; };
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.a_hip - 0.35, s: 1.05, y: 0 }, { t: c.a_hip + 0.8, s: 1.08, x: 6, y: -8, e: ease.out }, { t: c.a_qa, s: 1.06, x: -6, y: -14, e: ease.linear }, { t: c.a_fora, s: 1.1, x: 0, y: -20, e: ease.out }, { t: c.b_isso, s: 1.07, y: -26, e: ease.linear }]}>
        {hip > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", justifyContent: "center", opacity: fade(hip) }}><Tag text="SITUAÇÃO HIPOTÉTICA" tone="muted" size={26} /></div> : null}
        <div style={{ position: "absolute", left: 140, right: 140, top: 540, display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
          <div style={{ opacity: fade(big), transform: `scale(${mix(0.5, 1, Math.min(1.05, big)) * (1 + 0.02 * Math.sin(t * 3))})`, textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 200, color: v > 0 ? A.hex : C.dim, letterSpacing: "-0.06em", lineHeight: 0.9, textShadow: v > 0 ? `0 0 50px ${aa(0.3)}` : "none" }}>{v > 0 ? v : "??"}%<span style={{ fontSize: 110, color: C.warn }}>*</span></div>
            <div style={{ fontWeight: 800, fontSize: 32, color: C.text, marginTop: 10 }}>dos leads <span style={{ color: A.hex }}>fora do horário</span></div>
          </div>
          {dial > 0.001 ? (
            <svg width={2 * R} height={2 * R} style={{ opacity: fade(dial), transform: `rotate(${Math.sin(t * 1.5) * 4}deg)` }}>
              <circle cx={R} cy={R} r={R} fill={C.surface} stroke={C.surface3} strokeWidth={4} />
              <path d={arc(-Math.PI * 0.5 * dial, Math.PI * 0.75 * dial + 0.001)} fill={aa(0.15)} />
              <path d={arc(Math.PI * 0.75, Math.PI * 1.5 * (0.5 + 0.5 * dial))} fill={WARN_BG} />
              <line x1={R} y1={R} x2={R} y2={30} stroke={C.text} strokeWidth={6} strokeLinecap="round" transform={`rotate(${t * 40} ${R} ${R})`} />
              <circle cx={R} cy={R} r={8} fill={C.text} />
            </svg>
          ) : null}
        </div>
        {src > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 920, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, lineHeight: 1.5, color: C.muted, opacity: fade(src) }}>
            * ESTIMATIVA DO QUINTOANDAR, COM DADOS DA EMPRESA<br />APRESENTADA NO SECOVI-SP · NOV/2026 · NÃO É TAXA NACIONAL
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ color: A.hex }}>44%</span> FORA DO HORÁRIO<span style={{ color: C.warn }}>*</span></Title>
    </div>
  );
};

const STEPS = [{ k: "RECEBIMENTO", at: "b_receb" }, { k: "PRAZO DE RESPOSTA", at: "b_prazo" }, { k: "PRÓXIMO PASSO", at: "b_prox" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_isso - 0.35, { damping: 15, stiffness: 150 });
  const sleep = sp(t, c.b_isso - 0.1, { damping: 12, stiffness: 200 });
  const x = sp(t, c.b_24 - 0.1, { damping: 10, stiffness: 240 });
  const ph = sp(t, c.b_signif - 0.3, { damping: 13, stiffness: 170 });
  const st = STEPS.map((s) => sp(t, c[s.at] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.c_msg - 0.4, 0.35, ease.in);
  const dots = Math.floor(t * 2.5) % 4;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_isso - 0.35, s: 1.06, y: 0 }, { t: c.b_isso + 0.8, s: 1.1, x: 0, y: -8, e: ease.out }, { t: c.b_signif, s: 1.05, x: 0, y: -12, e: ease.linear }, { t: c.b_prazo, s: 1.07, x: 6, y: -20, e: ease.linear }, { t: c.c_msg, s: 1.05, y: -26, e: ease.linear }]}>
        {sleep > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: fade(sleep) * (1 - fade(ph)) }}>
            <span style={{ fontSize: 110, transform: `translateY(${Math.sin(t * 2) * 8}px)` }}>😴</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 48, color: C.text, textDecoration: x > 0.5 ? "line-through" : "none", textDecorationColor: C.warn }}>ACORDADO 24H</span>
              {x > 0.001 ? <div style={{ opacity: fade(x) }}><Tag text="✕ NÃO É ISSO" tone="warn" size={28} /></div> : null}
            </div>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 110, right: 110, top: 470, display: "flex", justifyContent: "space-between", opacity: fade(ph) }}>
          <div style={{ opacity: 0.8, transform: `translateY(${(1 - Math.min(1, ph)) * 60 + fl(t, 0, 8)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
            <Phone w={400} h={420} clock="22:00" label="A">
              <Msg side="in" size={26}>Oi! Ainda está disponível?</Msg>
              <div style={{ marginTop: 10, fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.dim }}>{".".repeat(dots) || " "}</div>
              <div style={{ marginTop: "auto" }}><Tag text="SILÊNCIO ATÉ AMANHÃ" tone="warn" size={24} /></div>
            </Phone>
          </div>
          <div style={{ transform: `translateY(${(1 - Math.min(1, ph)) * 60 + fl(t, 2, 8)}px) rotate(${Math.sin(t * 1.2 + 1) * 1.5}deg)` }}>
            <Phone w={400} h={420} clock="22:00" label="B" tone={A.hex}>
              <Msg side="in" size={26}>Oi! Ainda está disponível?</Msg>
              <div style={{ alignSelf: "flex-end", opacity: fade(st[0]) }}><Msg side="out" tone="good" size={24}>Recebemos! Um corretor responde amanhã a partir das 9h.</Msg></div>
              <div style={{ marginTop: "auto", opacity: fade(st[0]) }}><Tag text="MENSAGEM AUTOMÁTICA" tone="muted" size={24} /></div>
            </Phone>
          </div>
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 940, display: "flex", justifyContent: "center", gap: 12 }}>
          {STEPS.map((s, i) => st[i] > 0.001 ? <div key={s.k} style={{ opacity: fade(st[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, st[i]))}) translateY(${Math.sin(t * 2.4 + i) * 6}px)` }}><Tag text={`✓ ${s.k}`} tone="accent" size={24} /></div> : null)}
        </div>
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>NÃO É SOBRE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>NUNCA DESCANSAR</span></Title>
    </div>
  );
};

const FLOW = [{ k: "ENTRADA", ic: "📩", at: "c_msg" }, { k: "REGISTRO", ic: "🗂️", at: "c_proc" }, { k: "RESPONSÁVEL", ic: "🙋", at: "c_passar" }, { k: "RESPOSTA", ic: "💬", at: "c_resp" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_msg - 0.35, { damping: 15, stiffness: 150 });
  const fs = FLOW.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const conf = sp(t, c.c_conf - 0.2, { damping: 11, stiffness: 220 });
  const auto = sp(t, c.c_auto - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_lead - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const flow = prog(t, c.c_msg, Math.max(1, c.c_resp - c.c_msg + 0.4), ease.linear);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_msg - 0.35, s: 1.05, y: 0 }, { t: c.c_msg + 0.9, s: 1.08, x: -6, y: -8, e: ease.out }, { t: c.c_auto, s: 1.06, x: 6, y: -14, e: ease.linear }, { t: c.c_resp, s: 1.08, x: 0, y: -22, e: ease.linear }, { t: c.x_dono + 0.3, s: 1.05, y: -28, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -32, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 510, display: "flex", flexDirection: "column", gap: 14, opacity: 1 - 0.5 * fade(fin), transform: `scale(${mix(1, 0.9, Math.min(1, fin))})`, transformOrigin: "50% 0%" }}>
          {FLOW.map((f, i) => (
            <React.Fragment key={f.k}>
              <div style={{ height: 96, boxSizing: "border-box", borderRadius: 22, background: fs[i] > 0.5 ? aa(0.1) : C.surface, border: `2px ${fs[i] > 0.5 ? "solid" : "dashed"} ${fs[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", opacity: mix(0.3, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 50 + Math.sin(t * 2 + i) * 8}px)` }}>
                <span style={{ fontSize: 44 }}>{f.ic}</span>
                <span style={{ flex: 1, fontWeight: 800, fontSize: 34, color: C.text }}>{f.k}</span>
                {i === 0 && conf > 0.001 ? <span style={{ opacity: fade(conf) }}><Tag text="CONFIRMAÇÃO CLARA" tone="accent" size={24} /></span> : null}
                {i === 2 && auto > 0.001 ? <span style={{ opacity: fade(auto) }}><Tag text="AUTOMAÇÃO DIZ O QUE FAZ" tone="muted" size={24} /></span> : null}
              </div>
              {i < 3 ? <div style={{ height: 12, marginLeft: 50, width: 6, borderRadius: 3, background: flow * 3 > i + 0.5 ? A.hex : C.dim }} /> : null}
            </React.Fragment>
          ))}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Lead recebido<br /><span style={{ color: A.hex }}>precisa ter dono</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>LEAD RECEBIDO</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>PRECISA TER DONO</span></Title>
    </div>
  );
};
