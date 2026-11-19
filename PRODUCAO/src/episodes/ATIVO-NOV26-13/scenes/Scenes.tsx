import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, IconDoc, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_13 — "Minha Casa Minha Vida além do estereótipo". Sem renda, faixa numérica, teto, taxa ou subsídio na tela (regras
 * mudam; ex.: novas regras em vigor em abr/2026). Perfis, conversas e checklist ILUSTRATIVOS; fonte oficial citada de forma genérica.
 * Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const COLORS = [C.text, A.hex, "#B8C0CC", "#D8C9A8"];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const one = sp(t, -0.2, { damping: 12, stiffness: 160 });
  const q = sp(t, c.h_unico - 0.15, { damping: 11, stiffness: 220 });
  const mc = sp(t, c.h_mcmv - 0.15, { damping: 11, stiffness: 220 });
  const split = prog(t, c.h_talvez - 0.1, 0.9, ease.inOut);
  const parte = sp(t, c.h_parte - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_prog - 0.4, 0.35, ease.in);
  const xs = [-330, -110, 110, 330];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={2.8} t={t} keys={[{ t: 0, s: 1.14, y: -20 }, { t: 1.0, s: 1.19, x: 12, y: -24, e: ease.out }, { t: c.h_unico - 0.2, s: 1.22, x: 22, y: -14, e: ease.linear }, { t: c.h_unico + 0.3, s: 1.1, x: 0, y: -10, e: ease.inOut }, { t: ((c.h_unico + 0.3) + (c.h_talvez + 0.5)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.h_talvez + 0.5, s: 1.03, x: 0, y: -25, e: ease.inOut }, { t: c.a_prog, s: 1.07, y: -30, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(one) }}><Tag text="PERFIS ILUSTRATIVOS" tone="muted" size={24} /></div>
        {xs.map((dx, i) => {
          const x = 540 + dx * split - 90;
          const vis = i === 0 ? 1 : split;
          return <div key={i} style={{ position: "absolute", left: x, top: 520 + Math.sin(t * 2 + i) * 6, opacity: fade(one) * vis, transform: `scale(${mix(1.25, 0.95, split) * (1 + 0.04 * Math.sin(t * 3.2 + i))}) rotate(${Math.sin(t * 1.7 + i) * 3}deg)` }}><Person size={180} t={t + i} color={split > 0.3 ? COLORS[i] : C.text} /></div>;
        })}
        {mc > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 730, display: "flex", justifyContent: "center", opacity: fade(mc) * (1 - split), transform: `scale(${mix(0.5, 1, Math.min(1.08, mc))})` }}><Tag text="MINHA CASA MINHA VIDA" tone="accent" size={30} /></div> : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", opacity: fade(q) * (1 - split), transform: `scale(${mix(0.5, 1, Math.min(1.08, q))})` }}><Tag text="UM ÚNICO PERFIL?" tone="warn" size={34} /></div> : null}
        {parte > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 790, textAlign: "center", fontWeight: 800, fontSize: 50, color: C.text, opacity: fade(parte), transform: `scale(${mix(1.2, 1, Math.min(1, parte))})` }}>Perfis <span style={{ color: A.hex }}>diferentes</span></div> : null}
      </Camera>
      <Title p={title} size={62}>MCMV <span style={{ color: A.hex }}>SEM ACHISMO</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_prog - 0.35, { damping: 15, stiffness: 150 });
  const cards = [0, 1, 2].map((i) => sp(t, c.a_prog - 0.1 + i * 0.15, { damping: 12, stiffness: 200 }));
  const fx_ = sp(t, c.a_faixas - 0.15, { damping: 11, stiffness: 220 });
  const md = sp(t, c.a_mod - 0.15, { damping: 11, stiffness: 220 });
  const line = prog(t, c.a_tempo - 0.2, 1.2, ease.inOut);
  const ex = sp(t, c.a_mud - 0.1, { damping: 12, stiffness: 200 });
  const note = sp(t, c.a_renda - 0.15, { damping: 12, stiffness: 200 });
  const cross = prog(t, c.a_mem - 0.1, 0.4, ease.out);
  const et = sp(t, c.a_eternos - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_um - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.8} t={t} keys={[{ t: c.a_prog - 0.35, s: 1.05, y: 0 }, { t: ((c.a_prog - 0.35) + (c.a_mod + 0.3)) / 2 + 0, s: 1.110, x: 19, y: -18, e: ease.inOut }, { t: c.a_mod + 0.3, s: 1.08, x: 10, y: -10, e: ease.inOut }, { t: ((c.a_mod + 0.3) + (c.a_mud + 0.3)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.a_mud + 0.3, s: 1.06, x: -10, y: -25, e: ease.inOut }, { t: ((c.a_mud + 0.3) + (c.a_mem + 0.3)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.a_mem + 0.3, s: 1.09, x: 10, y: -40, e: ease.inOut }, { t: c.b_um, s: 1.06, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 90, right: 90, top: 440, display: "flex", gap: 18 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 260, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 10px", gap: 10, opacity: fade(cards[i]), transform: `translateY(${(1 - Math.min(1, cards[i])) * 60 + Math.sin(t * 1.8 + i) * 5}px)` }}>
              <Person size={90} t={t + i} color={COLORS[i]} />
              <span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>PERFIL {"ABC"[i]}</span>
              {fx_ > 0.001 ? <span style={{ opacity: fade(fx_) }}><Tag text="FAIXA" tone="accent" size={24} /></span> : null}
              {md > 0.001 ? <span style={{ opacity: fade(md) }}><Tag text="MODALIDADE" tone="muted" size={24} /></span> : null}
            </div>
          ))}
        </div>
        {/* linha do tempo: regras mudam */}
        <div style={{ position: "absolute", left: 110, right: 110, top: 760, opacity: fade(line * 2) }}>
          <div style={{ height: 6, borderRadius: 3, background: C.surface3 }}><div style={{ width: `${line * 100}%`, height: "100%", borderRadius: 3, background: A.hex }} /></div>
          {[0, 0.33, 0.66, 1].map((p, i) => <div key={i} style={{ position: "absolute", left: `${p * 100}%`, top: -9, width: 24, height: 24, marginLeft: -12, borderRadius: 12, background: line >= p ? A.hex : C.surface3, border: `3px solid ${C.bg1}` }} />)}
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}><span>REGRA ANTERIOR</span><span style={{ color: line > 0.95 ? A.hex : C.muted }}>REGRA ATUAL</span></div>
        </div>
        {ex > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", opacity: fade(ex) }}><Tag text="EX.: NOVAS REGRAS EM VIGOR EM ABR/2026" tone="accent" size={24} /></div> : null}
        {note > 0.001 ? (
          <div style={{ position: "absolute", left: 200, top: 940, width: 380, height: 140, boxSizing: "border-box", borderRadius: 10, background: "#E8E2C8", color: "#2A2A2A", padding: "16px 20px", transform: `rotate(-4deg) scale(${mix(0.6, 1, Math.min(1.05, note))})`, opacity: fade(note) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24 }}>DE MEMÓRIA:</div>
            <div style={{ fontWeight: 800, fontSize: 34, marginTop: 8 }}>renda · valor</div>
            {cross > 0 ? <div style={{ position: "absolute", left: 10, top: "52%", height: 7, width: `${cross * 95}%`, background: C.warn, borderRadius: 4 }} /> : null}
          </div>
        ) : null}
        {et > 0.001 ? <div style={{ position: "absolute", left: 620, top: 985, opacity: fade(et), transform: `scale(${mix(0.5, 1, Math.min(1.08, et))})` }}><Tag text="⏳ NÃO É ETERNO" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={52}>MCMV <span style={{ color: C.warn }}>NÃO É</span> UM PERFIL ÚNICO</Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_um - 0.35, { damping: 15, stiffness: 150 });
  const m1 = sp(t, c.b_encaixa - 0.3, { damping: 12, stiffness: 200 });
  const m2 = sp(t, c.b_aprova - 0.3, { damping: 12, stiffness: 200 });
  const wrong = prog(t, c.b_err - 0.1, 0.4, ease.out);
  const melt = prog(t, c.b_resp - 0.3, 0.6, ease.inOut);
  const srcs = sp(t, c.b_resp - 0.1, { damping: 12, stiffness: 200 });
  const ch1 = sp(t, c.b_crit - 0.15, { damping: 11, stiffness: 220 });
  const ch2 = sp(t, c.b_tipo - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_corr - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.8} t={t} keys={[{ t: c.b_um - 0.35, s: 1.05, y: 0 }, { t: ((c.b_um - 0.35) + (c.b_encaixa + 0.2)) / 2 + 0, s: 1.110, x: 9, y: -18, e: ease.inOut }, { t: c.b_encaixa + 0.2, s: 1.08, x: -10, y: -10, e: ease.inOut }, { t: ((c.b_encaixa + 0.2) + (c.b_aprova + 0.2)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.b_aprova + 0.2, s: 1.08, x: 10, y: -15, e: ease.inOut }, { t: ((c.b_aprova + 0.2) + (c.b_err + 0.2)) / 2 + 0, s: 1.150, x: 19, y: -18, e: ease.inOut }, { t: c.b_err + 0.2, s: 1.12, x: 0, y: -15, e: ease.inOut }, { t: ((c.b_err + 0.2) + (c.b_resp + 0.4)) / 2 + 0, s: 1.150, x: -14, y: -18, e: ease.inOut }, { t: c.b_resp + 0.4, s: 1.04, x: 0, y: -30, e: ease.inOut }, { t: c.c_corr, s: 1.07, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(m1) }}><Tag text="CONVERSAS ILUSTRATIVAS" tone="muted" size={24} /></div>
        {[{ p: m1, txt: "Acho que não me encaixo.", side: "in" as const, top: 500 }, { p: m2, txt: "O programa aprova qualquer apê!", side: "in" as const, top: 640 }].map((m, i) => (m.p > 0.001 ? (
          <div key={i} style={{ position: "absolute", left: 110, right: 110, top: m.top, display: "flex", alignItems: "center", gap: 16, justifyContent: i ? "flex-end" : "flex-start", opacity: fade(m.p) * (1 - melt), filter: `blur(${melt * 12}px)`, transform: `translateY(${(1 - Math.min(1, m.p)) * 40 + melt * 80}px) scale(${mix(1, 0.8, melt)})` }}>
            {i === 0 ? <Person size={80} t={t} /> : null}
            <Msg side={m.side} tone={wrong > 0.5 ? "warn" : "plain"} size={36}>{m.txt}</Msg>
            {i === 1 ? <Person size={80} t={t + 1} color="#B8C0CC" /> : null}
            {wrong > 0.001 ? <span style={{ fontWeight: 800, fontSize: 56, color: C.warn, opacity: fade(wrong) }}>✕</span> : null}
          </div>
        ) : null))}
        <div style={{ position: "absolute", left: 110, right: 110, top: 800, display: "flex", gap: 18, opacity: fade(m1) * 0.7 * (1 - fade(srcs)) }}>
          {[0, 1].map((i) => <div key={i} style={{ flex: 1, height: 180, borderRadius: 26, border: `2px dashed ${C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 64, color: C.dim, transform: `translateY(${Math.sin(t * 2 + i) * 6}px)` }}>?</div>)}
        </div>
        {srcs > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 600, display: "flex", gap: 18, opacity: fade(srcs), transform: `translateY(${(1 - Math.min(1, srcs)) * 60}px)` }}>
            {[{ ic: <IconDoc size={64} />, k: "FONTE OFICIAL", s: "regras do programa" }, { ic: <IconBank size={64} />, k: "BANCO / AGENTE", s: "análise da operação" }].map((b) => (
              <div key={b.k} style={{ flex: 1, height: 200, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${A.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {b.ic}
                <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{b.k}</span>
                <span style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{b.s}</span>
              </div>
            ))}
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 850, display: "flex", gap: 16, justifyContent: "center" }}>
          {ch1 > 0.001 ? <div style={{ opacity: fade(ch1), transform: `scale(${mix(0.5, 1, Math.min(1.08, ch1))})` }}><Tag text="CRITÉRIOS VIGENTES" tone="accent" size={28} /></div> : null}
          {ch2 > 0.001 ? <div style={{ opacity: fade(ch2), transform: `scale(${mix(0.5, 1, Math.min(1.08, ch2))})` }}><Tag text="TIPO DE OPERAÇÃO" tone="accent" size={28} /></div> : null}
        </div>
        {ch2 > 0.5 ? <div style={{ position: "absolute", left: 140, right: 140, top: 950, boxSizing: "border-box", padding: "16px 22px", borderRadius: 22, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", textAlign: "center", fontWeight: 800, fontSize: 30, color: C.text, opacity: fade(ch2 - 0.5) }}>✕ Não prometa enquadramento</div> : null}
      </Camera>
      <Title p={enter} size={52}>NÃO PROMETA <span style={{ color: C.warn }}>ENQUADRAMENTO</span></Title>
    </div>
  );
};

const STEPS = [
  { k: "REGRAS OFICIAIS", s: "verificar a versão vigente", at: "c_verif" },
  { k: "SIMULAÇÃO ATUALIZADA", s: "com os dados do cliente", at: "c_simul" },
  { k: "CAMINHO CLARO", s: "o que vem em cada etapa", at: "c_escl" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const cal = sp(t, c.c_corr - 0.2, { damping: 13, stiffness: 180 });
  const rows = STEPS.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const dec = sp(t, c.c_decorar - 0.15, { damping: 11, stiffness: 220 });
  const conf = sp(t, c.c_conferir - 0.15, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_antes - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.8} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 0 }, { t: ((c.c_corr - 0.35) + (c.c_verif + 0.3)) / 2 + 0, s: 1.120, x: 19, y: -18, e: ease.inOut }, { t: c.c_verif + 0.3, s: 1.09, x: 10, y: -10, e: ease.inOut }, { t: ((c.c_verif + 0.3) + (c.c_simul + 0.3)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_simul + 0.3, s: 1.06, x: -10, y: -20, e: ease.inOut }, { t: ((c.c_simul + 0.3) + (c.c_escl + 0.3)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.c_escl + 0.3, s: 1.09, x: 10, y: -25, e: ease.inOut }, { t: ((c.c_escl + 0.3) + (c.c_conferir + 0.3)) / 2 + 0, s: 1.120, x: -9, y: -18, e: ease.inOut }, { t: c.c_conferir + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: ((c.c_conferir + 0.3) + (c.x_regra)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.x_regra, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {/* calendário de atualizações */}
        <div style={{ position: "absolute", left: 110, right: 110, top: 430, height: 120, boxSizing: "border-box", borderRadius: 24, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", opacity: fade(cal) }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginRight: 10 }}>ATUALIZAÇÕES</span>
          {Array.from({ length: 12 }).map((_, i) => {
            const on = i === 3 || i === 8;
            return <div key={i} style={{ flex: 1, height: 52, borderRadius: 10, background: on ? aa(0.2) : C.surface2, border: `2px solid ${on ? A.hex : "transparent"}`, transform: `scale(${on ? 1 + 0.08 * Math.sin(t * 5 + i) : 1})` }} />;
          })}
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 580 }}>
          {STEPS.map((r, i) => (
            <div key={r.k} style={{ marginTop: i ? 14 : 0, height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: rows[i] > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${rows[i] > 0.5 ? A.hex : "transparent"}`, opacity: mix(0.4, 1, Math.min(1, rows[i] * 2) * fade(cal)) }}>
              <CheckDot p={Math.min(1, rows[i])} size={46} n={i + 1} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{r.k}</span>
                <span style={{ fontWeight: 600, fontSize: 24, color: A.hex, opacity: fade(rows[i]) }}>{r.s}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 90, right: 90, top: 960, display: "flex", gap: 16, justifyContent: "center", opacity: 1 - fade(fin) }}>
          {dec > 0.001 ? <div style={{ opacity: fade(dec), transform: `scale(${mix(0.5, 1, Math.min(1.08, dec))})` }}><Tag text="✕ DECORAR UM NÚMERO" tone="warn" size={28} /></div> : null}
          {conf > 0.001 ? <div style={{ opacity: fade(conf), transform: `scale(${mix(0.5, 1, Math.min(1.08, conf))})` }}><Tag text="✓ CONFERIR O QUE MUDOU" tone="accent" size={28} /></div> : null}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 950, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Antes do atendimento,<br /><span style={{ color: A.hex }}>consulte a regra atual</span></div> : null}
      </Camera>
      <Title p={enter} size={56}>CONSULTE <span style={{ color: A.hex }}>A REGRA ATUAL</span></Title>
    </div>
  );
};
