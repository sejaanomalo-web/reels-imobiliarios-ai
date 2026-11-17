import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, IconHome, Label, Person, Tag, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_03 — "O dinheiro que financia os imóveis" (metáfora: reservatório). Fato verificado: o BC divulgou em 11/11/2026 saída
 * líquida da poupança em outubro; o valor não aparece (nota do roteiro). O reservatório é metáfora; nenhuma participação percentual
 * das fontes é mostrada. Câmera: x/y = posição da câmera (y positivo sobe o conteúdo).
 */

/** Reservatório: nível de água com ondulação; entrada (depósitos) e saída (saques). */
const Tank: React.FC<{ t: number; level: number; warn: number; w?: number; h?: number }> = ({ t, level, warn, w = 420, h = 480 }) => {
  const top = h * (1 - level);
  const wave = (k: number) => `M 0 ${top + Math.sin(t * 2 + k) * 6} Q ${w * 0.25} ${top - 10 + Math.sin(t * 2.4 + k) * 6} ${w * 0.5} ${top + Math.sin(t * 2.1 + k) * 6} T ${w} ${top + Math.sin(t * 1.8 + k) * 6} V ${h} H 0 Z`;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: 40, border: `4px solid ${warn > 0.5 ? C.warn : C.line}`, background: C.bg1, overflow: "hidden", boxShadow: warn > 0.5 ? "0 0 40px rgba(255,107,94,0.25)" : "0 30px 80px rgba(0,0,0,0.6)" }}>
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        <path d={wave(0)} fill={aa(0.28)} />
        <path d={wave(1.5)} fill={aa(0.5)} />
      </svg>
      {[0.25, 0.5, 0.75].map((m) => (
        <div key={m} style={{ position: "absolute", left: 0, width: 26, top: h * m, height: 3, background: C.line }} />
      ))}
    </div>
  );
};

/** Gotas descendo por um cano (entrada/saída). */
const Flow: React.FC<{ t: number; x: number; y: number; len: number; dir: "down" | "right"; on: number; color: string; speed?: number }> = ({ t, x, y, len, dir, on, color, speed = 1 }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: dir === "down" ? 16 : len, height: dir === "down" ? len : 16, borderRadius: 8, background: C.surface3 }} />
    {on > 0.01
      ? [0, 1, 2, 3].map((k) => {
          const p = (((t * 0.9 * speed + k / 4) % 1) + 1) % 1;
          return <div key={k} style={{ position: "absolute", left: dir === "down" ? x + 1 : x + p * (len - 14), top: dir === "down" ? y + p * (len - 14) : y + 1, width: 14, height: 14, borderRadius: 7, background: color, opacity: on * Math.sin(p * Math.PI) }} />;
        })
      : null}
  </>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, 0, { damping: 13, stiffness: 170 });
  const a = sp(t, Math.min(0.6, c.h_poup - 0.2), { damping: 14, stiffness: 170 });
  const b = sp(t, c.h_fin - 0.4, { damping: 14, stiffness: 170 });
  const link = prog(t, c.h_rel - 0.1, 0.9, ease.inOut);
  const q = sp(t, c.h_rel + 0.3, { damping: 10, stiffness: 220 });
  const out = prog(t, c.a_pensa - 0.45, 0.4, ease.in);
  const box = (x: number, p: number, label: string, icon: React.ReactNode, on: boolean) => (
    <div style={{ position: "absolute", left: x, top: 780, width: 380, height: 300, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${on ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 120}px) translateY(${Math.sin(t * 1.6 + x) * 6}px)`, boxShadow: on ? `0 0 34px ${aa(0.25)}` : "0 30px 70px rgba(0,0,0,0.5)" }}>
      {icon}
      <Label size={32} color={C.text}>{label}</Label>
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.1} t={t} keys={[{ t: 0, s: 1.1, y: -40 }, { t: c.h_fin, s: 1.0, y: 0, e: ease.inOut }, { t: c.a_pensa, s: 1.05, y: 20, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 60, right: 60, top: 380, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, title))})` }}>
          DINHEIRO DA<br /><span style={{ color: A.hex }}>POUPANÇA</span>
        </div>
        {box(80, a, "POUPANÇA", <Tank t={t} level={0.62} warn={0} w={150} h={150} />, link > 0.5)}
        {b > 0.001 ? box(620, b, "FINANCIAMENTO", <IconHome size={120} color={link > 0.5 ? A.hex : C.text} />, link > 0.5) : null}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <path d="M 460 930 C 520 880, 560 880, 620 930" fill="none" stroke={A.hex} strokeWidth={8} strokeLinecap="round" strokeDasharray="220" strokeDashoffset={220 * (1 - link)} />
        </svg>
        {q > 0.01 ? (
          <div style={{ position: "absolute", left: 540 - 50, top: 1110, width: 100, height: 100, borderRadius: 50, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 70, transform: `scale(${mix(0.3, 1, Math.min(1.1, q))}) rotate(${Math.sin(t * 3) * 8}deg)` }}>?</div>
        ) : null}
      </Camera>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_pensa - 0.35, { damping: 15, stiffness: 150 });
  const credit = sp(t, c.a_cred - 0.1, { damping: 13, stiffness: 190 });
  const tank = sp(t, Math.min(c.a_res - 0.3, c.a_pensa + 0.5), { damping: 14, stiffness: 160 });
  const part = sp(t, c.a_parte - 0.1, { damping: 11, stiffness: 220 });
  const rules = sp(t, c.a_regras - 0.1, { damping: 11, stiffness: 220 });
  const saques = prog(t, c.a_saques - 0.1, 0.5, ease.out);
  const drain = prog(t, c.a_saques, 2.6, ease.inOut);
  const press = sp(t, c.a_press - 0.1, { damping: 9, stiffness: 240 });
  const title = sp(t, c.a_poup - 0.1, { damping: 13, stiffness: 180 });
  const out = prog(t, c.b_out - 0.45, 0.4, ease.in);
  const shake = press > 0.5 ? Math.sin(t * 38) * 4 * (1 - prog(t, c.a_press + 0.4, 0.5, ease.out)) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.1} t={t} keys={[{ t: c.a_pensa - 0.35, s: 1.08, y: -60 }, { t: c.a_res + 0.6, s: 1.0, y: 0, e: ease.inOut }, { t: c.a_parte + 0.4, s: 1.07, x: -30, y: 50, e: ease.inOut }, { t: c.a_poup + 0.3, s: 1.03, x: 60, y: -10, e: ease.inOut }, { t: c.a_regras + 0.5, s: 1.08, x: -20, y: 60, e: ease.inOut }, { t: c.a_saques, s: 1.02, x: 40, y: 20, e: ease.inOut }, { t: c.a_press + 0.4, s: 1.06, x: 0, y: 30, e: ease.inOut }, { t: c.b_out, s: 1.1, y: 40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", gap: 14, opacity: 1 - Math.min(1, title * 1.5) }}>
          <Tag text="METÁFORA" tone="muted" size={24} />
        </div>
        {/* entrada: depósitos */}
        <div style={{ position: "absolute", left: 130, top: 470, opacity: Math.min(1, tank * 1.5) }}>
          <Label size={26} color={A.hex}>DEPÓSITOS</Label>
        </div>
        <Flow t={t} x={262} y={510} len={130} dir="down" on={Math.min(1, tank) * mix(1, 0.4, drain)} color={A.hex} />
        {/* o reservatório */}
        <div style={{ position: "absolute", left: 120, top: 640, opacity: Math.min(1, tank * 1.5), transform: `translate(${shake}px, ${(1 - Math.min(1, tank)) * 120}px)` }}>
          <Tank t={t} level={mix(mix(0.45, 0.72, prog(t, c.a_res, 3.0, ease.inOut)), 0.38, drain)} warn={press} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center" }}><Label size={36} color={C.text}>POUPANÇA</Label></div>
          {part > 0.01 ? <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.1, part))})` }}><Tag text="UMA DAS FONTES" tone="accent" size={26} /></div> : null}
          {rules > 0.01 ? <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.1, rules))})` }}><Tag text="REGRAS ESPECÍFICAS" tone="muted" size={24} /></div> : null}
        </div>
        {/* saída: saques */}
        <Flow t={t} x={544} y={1050} len={150} dir="right" on={saques} color={C.warn} speed={1.6} />
        {saques > 0.01 ? <div style={{ position: "absolute", left: 560, top: 1000, opacity: saques }}><Label size={26} color={C.warn}>SAQUES</Label></div> : null}
        {/* para o crédito */}
        {credit > 0.001 ? (
          <div style={{ position: "absolute", left: 710, top: 700, width: 280, height: 260, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: Math.min(1, credit * 1.5), transform: `translateY(${Math.sin(t * 1.5) * 6}px)` }}>
            <IconHome size={90} color={A.hex} />
            <Label size={28} color={C.text}>CRÉDITO</Label>
          </div>
        ) : null}
        <Flow t={t} x={544} y={820} len={160} dir="right" on={Math.min(1, tank) * mix(1, 0.5, drain)} color={A.hex} />
        {press > 0.01 ? (
          <div style={{ position: "absolute", left: 120, top: 1150, width: 420, display: "flex", justifyContent: "center", transform: `rotate(-3deg) scale(${mix(1.6, 1, Math.min(1, press))})`, opacity: Math.min(1, press * 1.5) }}>
            <Tag text="SOB PRESSÃO" tone="warn" size={34} />
          </div>
        ) : null}
      </Camera>
      {title > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          POUPANÇA É <span style={{ color: A.hex }}>UMA FONTE</span> DE RECURSOS
        </div>
      ) : null}
    </div>
  );
};

const SOURCES = ["POUPANÇA", "OUTRAS FONTES", "DECISÕES DO BANCO"];
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_out - 0.35, { damping: 15, stiffness: 150 });
  const chip = sp(t, c.b_saida - 0.2, { damping: 11, stiffness: 220 });
  const neq = sp(t, c.b_nao - 0.05, { damping: 11, stiffness: 220 });
  const bank = sp(t, c.b_out + 0.5, { damping: 14, stiffness: 170 });
  const keeps = prog(t, c.b_parou + 0.2, 0.4, ease.out);
  const at = [c.b_out + 0.7, c.b_outras, c.b_dec];
  const out = prog(t, c.c_corr - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.1} t={t} keys={[{ t: c.b_out - 0.35, s: 1.08, y: 60 }, { t: c.b_saida + 0.6, s: 1.02, y: 30, e: ease.inOut }, { t: c.b_parou, s: 1.07, y: -60, e: ease.inOut }, { t: c.b_outras, s: 1.0, y: -20, e: ease.inOut }, { t: c.c_corr, s: 1.07, y: -10, e: ease.linear }]}>
        {/* outubro */}
        <div style={{ position: "absolute", left: 140, top: 450, width: 800, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${chip > 0.5 ? "rgba(255,107,94,0.5)" : C.line}`, padding: "24px 30px", display: "flex", alignItems: "center", gap: 24, transform: `scale(${mix(1, 0.9, prog(t, c.b_mas, 0.6, ease.inOut))})`, transformOrigin: "50% 0" }}>
          <div style={{ fontWeight: 800, fontSize: 60, color: C.warn, transform: `translateY(${Math.sin(t * 3) * 5}px)` }}>↓</div>
          <div style={{ flex: 1 }}>
            <Label size={24}>BANCO CENTRAL · DIVULGADO EM 11/11/2026</Label>
            <div style={{ fontWeight: 800, fontSize: 46, color: C.text, marginTop: 6 }}>Outubro: {chip > 0.01 ? <span style={{ color: C.warn }}>saída líquida</span> : "poupança"}</div>
          </div>
        </div>
        {/* banco com várias entradas */}
        {bank > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 690, opacity: Math.min(1, bank * 1.5), transform: `translateY(${(1 - Math.min(1, bank)) * 120}px)` }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              {SOURCES.map((k, i) => {
                const p = sp(t, at[i] - 0.15, { damping: 12, stiffness: 210 });
                return (
                  <div key={k} style={{ width: 290, height: 120, boxSizing: "border-box", borderRadius: 26, background: i === 0 ? C.surface : A.deep, border: `2px solid ${i === 0 ? "rgba(255,107,94,0.4)" : aa(0.5)}`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 14px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 60 + Math.sin(t * 1.7 + i) * 5}px)` }}>
                    <Label size={i === 2 ? 25 : 27} color={C.text}>{k}</Label>
                  </div>
                );
              })}
            </div>
            <svg width={1080} height={160} style={{ display: "block" }}>
              {[0, 1, 2].map((i) => {
                const x = 540 + (i - 1) * 310;
                const p = prog(t, at[i], 0.6, ease.inOut);
                return <path key={i} d={`M ${x} 0 C ${x} 80, 540 60, 540 150`} fill="none" stroke={i === 0 ? C.warn : A.hex} strokeWidth={6} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} opacity={p > 0.01 ? (i === 0 ? 0.6 : 1) : 0} />;
              })}
            </svg>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 360, height: 180, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `3px solid ${keeps > 0.5 ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", boxShadow: keeps > 0.5 ? `0 0 34px ${aa(0.22)}` : "none" }}>
                <IconBank size={70} color={A.hex} />
                <Label size={26} color={C.text}>{keeps > 0.5 ? "BANCO SEGUE FINANCIANDO" : "BANCO"}</Label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}><Tag text="ESQUEMA ILUSTRATIVO · SEM PROPORÇÕES" tone="muted" size={20} /></div>
          </div>
        ) : null}
      </Camera>
      {neq > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, neq * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          SAÍDA DE RECURSOS <span style={{ color: C.warn }}>≠</span> CRÉDITO ZERO
        </div>
      ) : null}
    </div>
  );
};

const FIELDS = ["APROVAÇÃO", "TAXA", "PRAZO"];
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.c_aprov, c.c_taxa, c.c_prazo];
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_acomp - 0.3, { damping: 14, stiffness: 170 });
  const date = sp(t, c.c_cond - 0.1, { damping: 11, stiffness: 220 });
  const neq = sp(t, c.c_iguais - 0.1, { damping: 11, stiffness: 220 });
  const title = sp(t, c.c_trad - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.1} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 40 }, { t: c.c_acomp + 0.5, s: 1.0, y: 0, e: ease.inOut }, { t: c.c_prazo + 0.4, s: 1.04, y: 20, e: ease.inOut }, { t: c.c_trad + 0.4, s: 1.0, y: 20, e: ease.inOut }, { t: c.cta_quer, s: 1.05, y: 20, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 90, top: 420, display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, enter * 1.5) * (1 - Math.min(1, title * 1.5)) }}>
          <Person size={90} />
          <Label size={28} color={C.text}>ATENDIMENTO · EXEMPLO ILUSTRATIVO</Label>
        </div>
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 120, top: 560, width: 840, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${aa(0.35)}`, padding: "26px 30px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 120 + Math.sin(t * 1.4) * 5}px)`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>Simulação</span>
              {date > 0.01 ? <div style={{ transform: `scale(${mix(0.4, 1, Math.min(1.1, date))})` }}><Tag text="CONDIÇÕES ATUALIZADAS HOJE" tone="accent" size={22} /></div> : null}
            </div>
            {FIELDS.map((k, i) => {
              const p = sp(t, at[i] - 0.15, { damping: 12, stiffness: 210 });
              return (
                <div key={k} style={{ marginTop: 18, height: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", borderRadius: 22, background: p > 0.5 ? A.deep : C.bg1, border: `2px solid ${p > 0.5 ? aa(0.5) : "transparent"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <CheckDot p={prog(t, at[i], 0.4, ease.out)} size={46} />
                    <Label size={32} color={C.text}>{k}</Label>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 32, color: p > 0.5 ? A.hex : C.dim }}>depende do perfil</span>
                </div>
              );
            })}
          </div>
        ) : null}
        {neq > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1090, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.08, neq))})`, opacity: Math.min(1, neq * 1.5) }}>
            <Tag text="NÃO É IGUAL PARA TODO MUNDO" tone="warn" size={32} />
          </div>
        ) : null}
      </Camera>
      {title > 0.01 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5) * (1 - out), textShadow: "0 8px 30px rgba(0,0,0,0.85)" }}>
          <span style={{ color: A.hex }}>TRADUZA</span> A NOTÍCIA PARA O CLIENTE
        </div>
      ) : null}
    </div>
  );
};
