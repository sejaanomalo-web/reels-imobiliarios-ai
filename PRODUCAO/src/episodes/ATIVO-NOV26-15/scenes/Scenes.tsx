import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, IconDoc, IconHome, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_15 — "FGTS e imóveis usados". Sem valores, limites, taxas ou prazos (o limite do orçamento para usados não foi conferido
 * no texto oficial). "Atualização do orçamento habitacional · nov/2026" genérico; ter saldo não é aprovação; CONSULTE O AGENTE
 * FINANCEIRO. Carteira, imóvel e tablet ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

const Wallet: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <div style={{ width: w, height: w * 0.62, boxSizing: "border-box", borderRadius: 26, background: `linear-gradient(150deg, ${C.surface3}, ${C.surface})`, border: `2px solid ${A.hex}`, padding: "18px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: `0 0 ${20 + 6 * Math.sin(t * 3)}px ${aa(0.2)}` }}>
    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>SALDO</span>
    <span style={{ fontWeight: 800, fontSize: w * 0.18, color: A.hex, letterSpacing: "-0.02em" }}>FGTS</span>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const house = sp(t, -0.15, { damping: 13, stiffness: 160 });
  const wal = sp(t, Math.min(c.h_fgts - 0.3, 0.6), { damping: 12, stiffness: 190 });
  const link = prog(t, c.h_fgts, 0.5, ease.out);
  const q = sp(t, c.h_oper - 0.15, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_atual - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={3.4} t={t} keys={[{ t: 0, s: 1.1, y: -20 }, { t: 1.0, s: 1.16, x: -12, y: -22, e: ease.out }, { t: c.h_fgts, s: 1.1, x: 12, y: -15, e: ease.linear }, { t: c.h_oper + 0.3, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.a_atual, s: 1.1, y: -40, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 110, top: 460, width: 380, height: 360, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: fade(house), transform: `translateY(${(1 - Math.min(1, house)) * 60 + Math.sin(t * 1.6) * 16}px) rotate(${Math.sin(t * 1.1) * 2}deg)` }}>
          <IconHome size={150} color={C.muted} />
          <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>IMÓVEL USADO</span>
          <Tag text="ILUSTRATIVO" tone="muted" size={24} />
        </div>
        {wal > 0.001 ? <div style={{ position: "absolute", left: 600, top: 520, opacity: fade(wal), transform: `translateY(${(1 - Math.min(1, wal)) * 60 + Math.sin(t * 1.6 + 1) * 16}px) rotate(${Math.sin(t * 1.2) * 3}deg)` }}><Wallet w={360} t={t} /></div> : null}
        <svg width={1080} height={1200} style={{ position: "absolute", left: 0, top: 0, opacity: link }}>
          <line x1={490} y1={640} x2={mix(490, 600, link)} y2={640} stroke={C.warn} strokeWidth={6} strokeDasharray="12 10" />
        </svg>
        {link > 0.3 ? <div style={{ position: "absolute", left: 505, top: 590, fontWeight: 800, fontSize: 80, color: C.warn, opacity: fade(link), transform: `scale(${1 + 0.06 * Math.sin(t * 5)})` }}>?</div> : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 900, display: "flex", justifyContent: "center", opacity: fade(q), transform: `scale(${mix(0.5, 1, Math.min(1.08, q))}) rotate(-2deg)` }}><Tag text="QUAL OPERAÇÃO?" tone="warn" size={40} /></div> : null}
      </Camera>
      <Title p={title} size={62}>FGTS <span style={{ color: A.hex }}>+ USADOS?</span></Title>
    </div>
  );
};

const FOLDERS = [
  { k: "ORÇAMENTO", s: "limite de recursos", at: "a_lim" },
  { k: "REGRAS", s: "do programa", at: "a_regras" },
  { k: "COMPRADOR", s: "condições de quem compra", at: "a_cond" },
];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_atual - 0.35, { damping: 15, stiffness: 150 });
  const tag = sp(t, c.a_atual - 0.1, { damping: 12, stiffness: 200 });
  const stack = sp(t, c.a_orc - 0.2, { damping: 13, stiffness: 180 });
  const sep = FOLDERS.map((f) => prog(t, c[f.at] - 0.15, 0.55, ease.inOut));
  const three = sp(t, c.a_tres - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_saldo - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3.4} t={t} keys={[{ t: c.a_atual - 0.35, s: 1.08, y: 0 }, { t: c.a_orc + 0.4, s: 1.12, x: 0, y: -10, e: ease.out }, { t: c.a_regras, s: 1.06, x: -12, y: -20, e: ease.linear }, { t: c.a_cond + 0.3, s: 1.06, x: 12, y: -25, e: ease.linear }, { t: c.a_tres + 0.3, s: 1.09, x: 0, y: -35, e: ease.inOut }, { t: c.b_saldo, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(tag) }}><Tag text="ATUALIZAÇÃO DO ORÇAMENTO HABITACIONAL · NOV/2026" tone="muted" size={24} /></div>
        {FOLDERS.map((f, i) => {
          const p = sep[i];
          const x0 = 390, y0 = 560 + i * 14, x1 = 80 + i * 320, y1 = 560;
          return (
            <div key={f.k} style={{ position: "absolute", left: mix(x0, x1, p), top: mix(y0, y1, p), width: 300, height: 330, opacity: fade(stack), transform: `rotate(${mix((-4 + i * 4) * (1 + 1.5 * Math.sin(t * 2.2)), 0, p) + Math.sin(t * 1.4 + i) * 1.5}deg) translateX(${(1 - p) * (i - 1) * 40 * Math.sin(t * 2.2)}px) translateY(${Math.sin(t * 1.8 + i) * 12}px)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 140, height: 40, borderRadius: "14px 14px 0 0", background: p > 0.5 ? A.hex : C.surface3 }} />
              <div style={{ position: "absolute", left: 0, top: 30, right: 0, bottom: 0, borderRadius: "0 18px 18px 18px", background: C.surface, border: `2px solid ${p > 0.5 ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 14 }}>
                <span style={{ fontWeight: 800, fontSize: 70, color: p > 0.5 ? A.hex : C.dim }}>{i + 1}</span>
                <span style={{ fontWeight: 800, fontSize: 30, color: C.text, opacity: fade(p) }}>{f.k}</span>
                <span style={{ fontWeight: 600, fontSize: 24, color: C.muted, textAlign: "center", opacity: fade(p) }}>{f.s}</span>
              </div>
            </div>
          );
        })}
        {three > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 940, textAlign: "center", fontWeight: 800, fontSize: 50, color: C.text, opacity: fade(three), transform: `scale(${mix(1.2, 1, Math.min(1, three))})` }}>Três perguntas <span style={{ color: A.hex }}>diferentes</span></div> : null}
      </Camera>
      <Title p={enter} size={56}>3 PERGUNTAS <span style={{ color: A.hex }}>DIFERENTES</span></Title>
    </div>
  );
};

const SEALS = [
  { k: "REQUISITOS DE USO", at: "b_req" },
  { k: "LIMITE DE VALOR", at: "b_limv" },
  { k: "MODALIDADE", at: "b_mod" },
  { k: "SITUAÇÃO DO IMÓVEL", at: "b_sit" },
];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_saldo - 0.35, { damping: 15, stiffness: 150 });
  const wal = sp(t, c.b_saldo - 0.2, { damping: 12, stiffness: 190 });
  const push = prog(t, c.b_saldo + 0.4, 0.8, ease.inOut);
  const shake = prog(t, c.b_req - 0.2, 0.5, ease.linear);
  const seals = SEALS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const conf = sp(t, c.b_conf - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_melhor - 0.4, 0.35, ease.in);
  const jig = shake > 0 && shake < 1 ? Math.sin(t * 40) * 8 * (1 - shake) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3.4} t={t} keys={[{ t: c.b_saldo - 0.35, s: 1.06, y: 0 }, { t: c.b_saldo + 0.8, s: 1.12, x: 10, y: -10, e: ease.out }, { t: c.b_req + 0.3, s: 1.08, x: -10, y: -15, e: ease.linear }, { t: c.b_sit + 0.3, s: 1.06, x: 10, y: -30, e: ease.linear }, { t: c.b_conf + 0.3, s: 1.09, x: 0, y: -35, e: ease.inOut }, { t: c.c_melhor, s: 1.06, y: -30, e: ease.linear }]}>
        {/* porta trancada */}
        <div style={{ position: "absolute", left: 620, top: 430, width: 300, height: 460, boxSizing: "border-box", borderRadius: "150px 150px 12px 12px", background: C.surface, border: `6px solid ${C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: fade(wal), transform: `translateX(${jig}px) translateY(${Math.sin(t * 1.3) * 10}px)`, boxShadow: `0 0 ${30 + 20 * Math.sin(t * 3)}px rgba(255,107,94,0.25)` }}>
          <div style={{ fontSize: 90 }}>🔒</div>
        </div>
        {wal > 0.001 ? <div style={{ position: "absolute", left: mix(90, 280, push) - 0, top: 560, opacity: fade(wal), transform: `rotate(${mix(-6, 0, push) + Math.sin(t * 1.7) * 2}deg) translateY(${Math.sin(t * 1.9) * 12}px)` }}><Wallet w={320} t={t} /></div> : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 930, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {SEALS.map((x, i) => (
            <div key={x.k} style={{ height: 86, borderRadius: 20, background: seals[i] > 0.5 ? aa(0.1) : C.surface2, border: `2px ${seals[i] > 0.5 ? "solid" : "dashed"} ${seals[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", opacity: mix(0.4, 1, Math.min(1, seals[i] * 2)) * fade(wal), transform: `scale(${mix(0.85, 1, Math.min(1.05, seals[i]))})` }}>
              <CheckDot p={Math.min(1, seals[i])} size={40} />
              <span style={{ fontWeight: 800, fontSize: 24, color: C.text }}>{x.k}</span>
            </div>
          ))}
        </div>
        {conf > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1140, display: "flex", justifyContent: "center", opacity: fade(conf), transform: `scale(${mix(0.5, 1, Math.min(1.08, conf))})` }}><Tag text="TUDO PRECISA SER CONFERIDO" tone="accent" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={56}>TER SALDO <span style={{ color: C.warn }}>NÃO É</span> APROVAÇÃO</Title>
    </div>
  );
};

const CHK = [
  { k: "BANCO", at: "c_banco", ic: "bank" },
  { k: "REGRAS ATUALIZADAS", at: "c_regras", ic: "doc" },
  { k: "ENQUADRAMENTO", at: "c_enq", ic: "doc" },
  { k: "DOCUMENTAÇÃO", at: "c_doc", ic: "doc" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_melhor - 0.35, { damping: 15, stiffness: 150 });
  const prom = sp(t, c.c_prom - 0.2, { damping: 11, stiffness: 220 });
  const strike = prog(t, c.c_todo + 0.2, 0.5, ease.out);
  const promOut = prog(t, c.c_rot - 0.5, 0.4, ease.in);
  const tab = sp(t, c.c_rot - 0.3, { damping: 13, stiffness: 180 });
  const rows = CHK.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const stamp = sp(t, c.c_exp - 0.2, { damping: 10, stiffness: 240 });
  const fin = sp(t, c.x_rev - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3.4} t={t} keys={[{ t: c.c_melhor - 0.35, s: 1.06, y: 0 }, { t: c.c_prom + 0.3, s: 1.12, x: 0, y: -10, e: ease.out }, { t: c.c_rot + 0.3, s: 1.06, x: -10, y: -15, e: ease.linear }, { t: c.c_doc + 0.3, s: 1.08, x: 10, y: -25, e: ease.linear }, { t: c.c_exp + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: c.x_verif, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {prom > 0.001 && promOut < 1 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 560, boxSizing: "border-box", padding: "26px 28px", borderRadius: 26, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", textAlign: "center", opacity: fade(prom) * (1 - promOut), transform: `scale(${mix(0.6, 1, Math.min(1.05, prom)) * mix(1, 0.8, promOut)}) rotate(-2deg)` }}>
            <span style={{ fontWeight: 800, fontSize: 44, color: C.text }}>“Agora todo usado pode entrar!”</span>
            {strike > 0 ? <div style={{ position: "absolute", left: 20, top: "50%", height: 8, width: `${strike * 92}%`, background: C.warn, borderRadius: 4 }} /> : null}
            <div style={{ position: "absolute", right: 16, top: -22 }}><Tag text="✕ PROMESSA" tone="warn" size={24} /></div>
          </div>
        ) : null}
        {tab > 0.001 ? (
          <div style={{ position: "absolute", left: 130, right: 130, top: 430, boxSizing: "border-box", padding: "22px 24px", borderRadius: 40, background: C.bg1, border: `8px solid ${C.surface3}`, opacity: fade(tab), transform: `translateY(${(1 - Math.min(1, tab)) * 80 + Math.sin(t * 1.4) * 12}px) rotate(${Math.sin(t * 1.1) * 1.2}deg)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>ROTEIRO DE VERIFICAÇÃO</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {CHK.map((r, i) => (
              <div key={r.k} style={{ marginTop: 12, height: 88, display: "flex", alignItems: "center", gap: 16, padding: "0 16px", borderRadius: 18, background: rows[i] > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${rows[i] > 0.5 ? A.hex : "transparent"}` }}>
                <CheckDot p={Math.min(1, rows[i])} size={42} n={i + 1} />
                {r.ic === "bank" ? <IconBank size={40} /> : <IconDoc size={40} />}
                <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{r.k}</span>
              </div>
            ))}
          </div>
        ) : null}
        {stamp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: fade(stamp) * (1 - fade(fin) * 0.6), transform: `scale(${mix(1.8, 1, Math.min(1, stamp))}) rotate(-4deg)` }}><Tag text="CONSULTE O AGENTE FINANCEIRO" tone="warn" size={32} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1085, textAlign: "center", fontWeight: 800, fontSize: 48, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Na revenda, <span style={{ color: A.hex }}>verifique antes</span></div> : null}
      </Camera>
      <Title p={enter} size={50}>VERIFIQUE <span style={{ color: A.hex }}>ANTES DE ANUNCIAR</span></Title>
    </div>
  );
};
