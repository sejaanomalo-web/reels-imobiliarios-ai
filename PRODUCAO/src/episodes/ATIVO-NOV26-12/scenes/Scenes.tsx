import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconHome, Msg, Person, Tag, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_12 — "Sete em dez imóveis novos em SP". Secovi-SP: MCMV ≈ 7 em 10 imóveis residenciais NOVOS vendidos na CAPITAL
 * paulista em 12 meses (71% em ago/2026). Recorte sempre na tela; ✕ Brasil ✕ usados; sem prometer enquadramento. Mapa, personagem e
 * conversas ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

const Houses: React.FC<{ lit: number; show: number; t: number; size?: number; pulse?: number }> = ({ lit, show, t, size = 120, pulse = 0 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(5, ${size}px)`, gap: 22 }}>
    {Array.from({ length: 10 }).map((_, i) => {
      const on = i < lit, vis = i < show;
      return (
        <div key={i} style={{ width: size, height: size, borderRadius: 24, background: on ? aa(0.14) : C.surface, border: `3px solid ${on ? A.hex : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: vis ? 1 : 0.15, transform: `scale(${on ? 1 + pulse * 0.06 * Math.sin(t * 5 + i) : 1})`, boxShadow: on ? `0 0 ${18 + 10 * pulse}px ${aa(0.3)}` : "none" }}>
          <IconHome size={size * 0.55} color={on ? A.hex : C.dim} />
        </div>
      );
    })}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const grid = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const lit = Math.round(7 * prog(t, c.h_sete - 0.1, 0.9, ease.out));
  const show = 10 * prog(t, -0.2, 0.6, ease.out);
  const mc = sp(t, c.h_mcmv - 0.15, { damping: 12, stiffness: 200 });
  const pulse = prog(t, c.h_tam - 0.2, 0.5, ease.out);
  const src = prog(t, c.h_novos - 0.1, 0.4, ease.out);
  const out = prog(t, c.a_cap - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={2.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_dez + 0.3)) / 2 + 0, s: 1.150, x: 19, y: -18, e: ease.inOut }, { t: c.h_dez + 0.3, s: 1.06, x: 10, y: -15, e: ease.inOut }, { t: ((c.h_dez + 0.3) + (c.h_mcmv + 0.3)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.h_mcmv + 0.3, s: 1.09, x: -10, y: -25, e: ease.inOut }, { t: ((c.h_mcmv + 0.3) + (c.h_tam + 0.2)) / 2 + 0, s: 1.170, x: 9, y: -18, e: ease.inOut }, { t: c.h_tam + 0.2, s: 1.14, x: 0, y: -20, e: ease.inOut }, { t: c.a_cap, s: 1.08, y: -30, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", opacity: fade(grid), transform: `translateY(${(1 - Math.min(1, grid)) * 60}px)` }}>
          <Houses lit={lit} show={Math.ceil(show)} t={t} pulse={pulse} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 750, textAlign: "center", fontWeight: 800, fontSize: 120, letterSpacing: "-0.04em", color: C.text, opacity: fade(lit / 7) }}>{lit >= 7 ? "7" : "•"} <span style={{ fontSize: 60, color: C.muted }}>EM</span> 10</div>
        {mc > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 920, display: "flex", justifyContent: "center", opacity: fade(mc), transform: `scale(${mix(0.5, 1, Math.min(1.08, mc))})` }}><Tag text="MINHA CASA MINHA VIDA" tone="accent" size={32} /></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: src }}><Tag text="CAPITAL DE SP · IMÓVEIS NOVOS · SECOVI-SP" tone="muted" size={24} /></div>
      </Camera>
      <Title p={title} size={62}>7 EM 10 <span style={{ color: A.hex }}>EM SP</span></Title>
    </div>
  );
};

const CHIPS = [{ k: "CAPITAL DE SP", at: "a_cap" }, { k: "IMÓVEIS NOVOS", at: "a_novos" }, { k: "12 MESES", at: "a_per" }, { k: "FONTE: SECOVI-SP", at: "a_secovi" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_cap - 0.35, { damping: 15, stiffness: 150 });
  const map = sp(t, c.a_cap - 0.2, { damping: 13, stiffness: 170 });
  const chips = CHIPS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const nb = sp(t, c.a_brasil - 0.25, { damping: 11, stiffness: 220 });
  const nu = sp(t, c.a_usados - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_ensina - 0.4, 0.35, ease.in);
  const blob = "M120,40 C220,0 360,20 430,90 C500,160 520,260 470,340 C420,420 300,460 200,430 C100,400 30,330 20,240 C10,150 40,70 120,40 Z";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.a_cap - 0.35, s: 1.05, y: 0 }, { t: ((c.a_cap - 0.35) + (c.a_novos + 0.2)) / 2 + 0, s: 1.120, x: 8, y: -18, e: ease.inOut }, { t: c.a_novos + 0.2, s: 1.09, x: -12, y: -10, e: ease.inOut }, { t: ((c.a_novos + 0.2) + (c.a_secovi + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.a_secovi + 0.2, s: 1.06, x: 12, y: -20, e: ease.inOut }, { t: ((c.a_secovi + 0.2) + (c.a_brasil + 0.2)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.a_brasil + 0.2, s: 1.09, x: 0, y: -35, e: ease.inOut }, { t: c.b_ensina, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 270, top: 480, width: 540, height: 450, opacity: fade(map), transform: `scale(${mix(0.8, 1, Math.min(1, map))}) rotate(${Math.sin(t * 0.8) * 1.2}deg)` }}>
          <svg width={540} height={470} viewBox="0 0 540 470"><path d={blob} fill={aa(0.06)} stroke={A.hex} strokeWidth={4} strokeDasharray="10 8" /></svg>
          <div style={{ position: "absolute", left: 95, top: 110 }}><Houses lit={7} show={10} t={t} size={52} pulse={0.4} /></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: -6, display: "flex", justifyContent: "center" }}><Tag text="MAPA ILUSTRATIVO" tone="muted" size={24} /></div>
        </div>
        <div style={{ position: "absolute", left: 90, right: 90, top: 930, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          {CHIPS.map((x, i) => <div key={x.k} style={{ opacity: fade(chips[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, chips[i]))})` }}><Tag text={x.k} tone="accent" size={26} /></div>)}
        </div>
        <div style={{ position: "absolute", left: 90, right: 90, top: 1060, display: "flex", gap: 16, justifyContent: "center" }}>
          {nb > 0.001 ? <div style={{ opacity: fade(nb), transform: `scale(${mix(0.5, 1, Math.min(1.08, nb))})` }}><Tag text="✕ TODO O BRASIL" tone="warn" size={28} /></div> : null}
          {nu > 0.001 ? <div style={{ opacity: fade(nu), transform: `scale(${mix(0.5, 1, Math.min(1.08, nu))})` }}><Tag text="✕ USADOS" tone="warn" size={28} /></div> : null}
        </div>
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>7 EM 10 · IMÓVEIS NOVOS</span><br /><span style={{ color: A.hex }}>CAPITAL SP</span></Title>
    </div>
  );
};

const GATES = [{ k: "ENTRADA", at: "b_entrada" }, { k: "CRÉDITO", at: "b_cred" }, { k: "CUSTOS", at: "b_custos" }, { k: "ETAPAS", at: "b_etapas" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_ensina - 0.35, { damping: 15, stiffness: 150 });
  const gates = sp(t, c.b_ensina - 0.1, { damping: 13, stiffness: 170 });
  const who = sp(t, c.b_prim - 0.2, { damping: 12, stiffness: 200 });
  const lit = GATES.map((g) => prog(t, c[g.at] - 0.1, 0.35, ease.out));
  const walk = prog(t, c.b_prim, Math.max(1, c.b_etapas + 0.6 - c.b_prim), ease.inOut);
  const sem = sp(t, c.b_sem - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_atua - 0.4, 0.35, ease.in);
  const gx = (i: number) => 210 + i * 220;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.b_ensina - 0.35, s: 1.05, y: 0 }, { t: ((c.b_ensina - 0.35) + (c.b_prim + 0.2)) / 2 + 0, s: 1.110, x: 4, y: -18, e: ease.inOut }, { t: c.b_prim + 0.2, s: 1.07, x: -8, y: -10, e: ease.inOut }, { t: ((c.b_prim + 0.2) + (c.b_cred + 0.2)) / 2 + 0, s: 1.110, x: -27, y: -18, e: ease.inOut }, { t: c.b_cred + 0.2, s: 1.08, x: -5, y: -15, e: ease.inOut }, { t: ((c.b_cred + 0.2) + (c.b_etapas + 0.3)) / 2 + 0, s: 1.110, x: 21, y: -18, e: ease.inOut }, { t: c.b_etapas + 0.3, s: 1.07, x: 8, y: -20, e: ease.inOut }, { t: ((c.b_etapas + 0.3) + (c.b_sem + 0.3)) / 2 + 0, s: 1.110, x: -4, y: -18, e: ease.inOut }, { t: c.b_sem + 0.3, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.c_atua, s: 1.07, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 425, display: "flex", justifyContent: "center", opacity: fade(gates) }}><Tag text="PRIMEIRA MORADIA · ILUSTRATIVO" tone="muted" size={24} /></div>
        <div style={{ position: "absolute", left: 80, right: 80, top: 905, height: 6, borderRadius: 3, background: C.surface3, opacity: fade(gates) }} />
        {GATES.map((g, i) => (
          <div key={g.k} style={{ position: "absolute", left: gx(i) - 80, top: 560, width: 160, height: 345, opacity: fade(gates), transform: `translateY(${(1 - Math.min(1, gates)) * 60}px)` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, borderRadius: "80px 80px 0 0", border: `6px solid ${lit[i] > 0.5 ? A.hex : C.dim}`, borderBottom: "none", background: lit[i] > 0.5 ? aa(0.08) : "transparent", boxShadow: lit[i] > 0.5 ? `0 0 30px ${aa(0.25)}` : "none" }} />
            <div style={{ position: "absolute", left: -20, right: -20, top: -70, textAlign: "center" }}><span style={{ fontWeight: 800, fontSize: 28, color: lit[i] > 0.5 ? A.hex : C.muted }}>{g.k}</span></div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 130, display: "flex", justifyContent: "center", fontWeight: 800, fontSize: 70, color: lit[i] > 0.5 ? A.hex : C.dim }}>{lit[i] > 0.5 ? "✓" : "?"}</div>
          </div>
        ))}
        {who > 0.001 ? <div style={{ position: "absolute", left: mix(60, 960, walk) - 55, top: 790, opacity: fade(who), transform: `translateY(${-Math.abs(Math.sin(t * 9)) * 10 * (walk > 0 && walk < 1 ? 1 : 0)}px)` }}><Person size={110} t={t} color={C.text} /></div> : null}
        {sem > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: fade(sem), transform: `scale(${mix(0.5, 1, Math.min(1.08, sem))})` }}><Tag text="SEM PROMETER ENQUADRAMENTO" tone="warn" size={30} /></div> : null}
      </Camera>
      <Title p={enter} size={58}>EXPLIQUE <span style={{ color: A.hex }}>O PROCESSO</span></Title>
    </div>
  );
};

const QS = ["Quanto preciso de entrada?", "Como funciona a análise?", "Que custos vêm além da parcela?"];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_atua - 0.35, { damping: 15, stiffness: 150 });
  const fac = sp(t, c.c_atua - 0.2, { damping: 13, stiffness: 170 });
  const qs = QS.map((_, i) => sp(t, c.c_duv - 0.2 + i * 0.3, { damping: 12, stiffness: 210 }));
  const toList = prog(t, c.c_cont - 0.2, 0.6, ease.inOut);
  const shrink = prog(t, c.c_planta - 0.1, 0.7, ease.inOut);
  const start = sp(t, c.c_comecar - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_cada - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.2} t={t} keys={[{ t: c.c_atua - 0.35, s: 1.05, y: 0 }, { t: ((c.c_atua - 0.35) + (c.c_duv + 0.4)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.c_duv + 0.4, s: 1.09, x: 12, y: -10, e: ease.inOut }, { t: ((c.c_duv + 0.4) + (c.c_cont + 0.4)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_cont + 0.4, s: 1.06, x: -12, y: -20, e: ease.inOut }, { t: ((c.c_cont + 0.4) + (c.c_planta + 0.5)) / 2 + 0, s: 1.120, x: 13, y: -18, e: ease.inOut }, { t: c.c_planta + 0.5, s: 1.09, x: 10, y: -30, e: ease.inOut }, { t: ((c.c_planta + 0.5) + (c.c_comecar + 0.3)) / 2 + 0, s: 1.120, x: -9, y: -18, e: ease.inOut }, { t: c.c_comecar + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: ((c.c_comecar + 0.3) + (c.x_prep)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.x_prep, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {/* fachada bonita que diminui */}
        <div style={{ position: "absolute", left: mix(290, 90, shrink), top: mix(440, 430, shrink), width: mix(500, 180, shrink), height: mix(300, 110, shrink), borderRadius: 24, background: `linear-gradient(160deg, ${C.surface3}, ${C.surface})`, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: fade(fac) * mix(1, 0.5, shrink) }}>
          <IconHome size={mix(150, 60, shrink)} color={C.muted} />
          {shrink < 0.4 ? <div style={{ position: "absolute", left: 10, top: 10, opacity: 1 - shrink * 2.5 }}><Tag text="PLANTA E FACHADA" tone="muted" size={24} /></div> : null}
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: mix(780, 580, toList), display: "flex", flexDirection: "column", gap: 16 }}>
          {QS.map((q, i) => (qs[i] > 0.001 ? (
            <div key={q} style={{ display: "flex", alignItems: "center", gap: 14, opacity: fade(qs[i]), transform: `translateX(${(1 - Math.min(1, qs[i])) * 60}px)` }}>
              {toList > 0.5 ? <CheckDot p={Math.min(1, (toList - 0.5) * 2)} size={44} n={i + 1} /> : null}
              {toList > 0.5 ? (
                <div style={{ flex: 1, height: 84, boxSizing: "border-box", borderRadius: 20, background: aa(0.1), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", padding: "0 20px", fontWeight: 800, fontSize: 28, color: C.text }}>{["Entrada: como se preparar", "Análise de crédito: o que é", "Custos além da parcela"][i]}</div>
              ) : <Msg side="in" size={32}>{q}</Msg>}
            </div>
          ) : null))}
        </div>
        {toList > 0.5 ? <div style={{ position: "absolute", left: 300, top: 470, opacity: fade((toList - 0.5) * 2) }}><Tag text="ROTEIRO DE VÍDEO EDUCATIVO" tone="accent" size={26} /></div> : null}
        {start > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 920, display: "flex", justifyContent: "center", opacity: fade(start) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, start))})` }}><Tag text="✓ COMO COMEÇAR" tone="accent" size={32} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 920, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Cada dúvida respondida<br /><span style={{ color: A.hex }}>prepara o comprador</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>CONTEÚDO QUE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>PREPARA O COMPRADOR</span></Title>
    </div>
  );
};
