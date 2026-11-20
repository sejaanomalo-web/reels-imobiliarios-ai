import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_25 — "Moradias para uma população mais velha". Cobertura de nov/2026 sobre empreendimentos para pessoas idosas
 * (senior living). Sem empresas, preços ou dados; sem estereótipos (nada de bengala/cadeira de rodas como símbolo); apartamento e
 * roteiros ILUSTRATIVOS; sem prometer adaptação real. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const bar = prog(t, -0.1, Math.max(0.8, c.h_env + 0.8), ease.out);
  const card = sp(t, c.h_apres - 0.3, { damping: 13, stiffness: 180 });
  const one = sp(t, c.h_unico - 0.2, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_nov - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, x: 8, y: -6 }, { t: 1.0, s: 1.12, x: -8, y: -14, e: ease.out }, { t: c.h_apres, s: 1.08, x: 8, y: -20, e: ease.linear }, { t: c.a_nov, s: 1.1, y: -28, e: ease.linear }]}>
        {/* tendência demográfica sem números */}
        <div style={{ position: "absolute", left: 150, right: 150, top: 470, display: "flex", alignItems: "flex-end", gap: 14, height: 170, opacity: fade(bar) * mix(1, 0.5, Math.min(1, card)) }}>
          {[0.25, 0.32, 0.4, 0.5, 0.62, 0.76, 0.9].map((h, i) => (
            <div key={i} style={{ flex: 1, height: 170 * h * Math.min(1, Math.max(0, bar * 7 - i)), borderRadius: "10px 10px 4px 4px", background: i === 6 ? A.hex : aa(0.25 + i * 0.08), transform: `translateY(${Math.sin(t * 2 + i) * 3}px)` }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", justifyContent: "center", opacity: fade(bar) * (1 - fade(card)) }}><Tag text="POPULAÇÃO 60+ ↑ · TENDÊNCIA" tone="accent" size={26} /></div>
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 170, right: 170, top: 680, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${C.surface3}`, padding: "18px 22px", opacity: fade(card), transform: `translateY(${(1 - Math.min(1, card)) * 60 + fl(t, 0, 8)}px) rotate(${Math.sin(t * 1.3) * 1.5}deg)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>APRESENTAÇÃO PADRÃO</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              {["🏊", "🍖", "🛝"].map((e, i) => <div key={i} style={{ flex: 1, height: 110, borderRadius: 16, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, transform: `translateY(${Math.sin(t * 2.4 + i) * 6}px)` }}>{e}</div>)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}><span style={{ fontSize: 34 }}>👨‍👩‍👧</span><span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>“IDEAL PARA SUA FAMÍLIA”</span></div>
          </div>
        ) : null}
        {one > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", opacity: fade(one), transform: `scale(${mix(0.5, 1, Math.min(1.08, one))}) translateX(${Math.sin(t * 3) * 6}px)` }}><Tag text="UM ÚNICO TIPO DE FAMÍLIA?" tone="warn" size={30} /></div> : null}
      </Camera>
      <Title p={title} size={56}><span style={{ whiteSpace: "nowrap" }}>MORADIA E</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>LONGEVIDADE</span></Title>
    </div>
  );
};

const STOPS = [{ k: "ELEVADOR", at: "a_elev", x: 110, y: 330 }, { k: "ACESSIBILIDADE", at: "a_acess", x: 300, y: 210 }, { k: "SERVIÇOS PRÓXIMOS", at: "a_serv", x: 520, y: 80 }, { k: "AUTONOMIA", at: "a_auto", x: 470, y: 300 }, { k: "CUSTOS DE OPERAÇÃO", at: "a_custos", x: 230, y: 410 }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_nov - 0.35, { damping: 15, stiffness: 150 });
  const tag = sp(t, c.a_emp - 0.2, { damping: 12, stiffness: 200 });
  const plan = sp(t, c.a_alem - 0.5, { damping: 13, stiffness: 170 });
  const st = STOPS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  const walk = prog(t, c.a_elev - 0.2, Math.max(1, c.a_custos - c.a_elev + 0.6), ease.linear);
  const pts = STOPS.map((s) => [s.x + 60, s.y + 30] as const);
  const seg = Math.min(pts.length - 1.0001, walk * (pts.length - 1));
  const i0 = Math.floor(seg), fr = seg - i0;
  const dot = [pts[i0][0] + (pts[i0 + 1][0] - pts[i0][0]) * fr, pts[i0][1] + (pts[i0 + 1][1] - pts[i0][1]) * fr];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.a_nov - 0.35, s: 1.05, y: 0 }, { t: c.a_nov + 0.8, s: 1.08, x: 8, y: -8, e: ease.out }, { t: c.a_acess, s: 1.06, x: -8, y: -14, e: ease.linear }, { t: c.a_auto, s: 1.08, x: 6, y: -20, e: ease.linear }, { t: c.b_imag, s: 1.06, y: -26, e: ease.linear }]}>
        {tag > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 450, display: "flex", justifyContent: "center", opacity: fade(tag) * (1 - fade(plan)) }}><Tag text="EMPREENDIMENTOS PARA PESSOAS IDOSAS · NOV/2026" tone="muted" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 140, top: 500, width: 800, height: 520, opacity: fade(plan), transform: `translateY(${(1 - Math.min(1, plan)) * 50 + fl(t, 0, 8)}px) rotate(${Math.sin(t * 1.1) * 1}deg)` }}>
          <svg width={800} height={520} style={{ position: "absolute", left: 0, top: 0 }}>
            <rect x={10} y={10} width={780} height={500} rx={24} fill={C.surface} stroke={C.surface3} strokeWidth={3} />
            <line x1={400} y1={10} x2={400} y2={260} stroke={C.surface3} strokeWidth={3} />
            <line x1={10} y1={260} x2={560} y2={260} stroke={C.surface3} strokeWidth={3} />
            <polyline points={pts.slice(0, i0 + 1).map((p) => p.join(",")).join(" ") + ` ${dot[0]},${dot[1]}`} fill="none" stroke={A.hex} strokeWidth={6} strokeDasharray="14 10" strokeLinecap="round" />
            <circle cx={dot[0]} cy={dot[1]} r={14 + 3 * Math.sin(t * 5)} fill={A.hex} />
          </svg>
          {STOPS.map((s, i) => st[i] > 0.001 ? (
            <div key={s.k} style={{ position: "absolute", left: s.x, top: s.y, opacity: fade(st[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, st[i]))}) translateY(${Math.sin(t * 2.2 + i) * 6}px)` }}>
              <Tag text={(i === 0 ? "✓ " : "") + s.k} tone={i === 0 ? "muted" : "accent"} size={24} />
            </div>
          ) : null)}
          <div style={{ position: "absolute", right: 20, bottom: 20 }}><Tag text="PLANTA ILUSTRATIVA" tone="muted" size={24} /></div>
        </div>
        {st[0] > 0.5 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(st[1]) }}><Tag text="VAI ALÉM DO ELEVADOR" tone="accent" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ whiteSpace: "nowrap" }}>MORADIA É</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>ROTINA</span></Title>
    </div>
  );
};

const STD = [{ e: "🏊", k: "PISCINA" }, { e: "🍖", k: "ÁREA GOURMET" }, { e: "🛝", k: "PLAYGROUND" }];
const CLI = [{ e: "💊", k: "FARMÁCIA PERTO", at: "b_farm" }, { e: "🚪", k: "ACESSO AO PRÉDIO", at: "b_acesso" }, { e: "🔧", k: "MANUTENÇÃO FÁCIL", at: "b_manut" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const who = sp(t, c.b_imag - 0.1, { damping: 12, stiffness: 190 });
  const ind = sp(t, c.b_indep - 0.2, { damping: 11, stiffness: 220 });
  const std = sp(t, c.b_pisc - 0.3, { damping: 13, stiffness: 180 });
  const dim = prog(t, c.b_util - 0.2, 0.6, ease.out);
  const cl = CLI.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.c_corr - 0.4, 0.35, ease.in);
  const col = (title: string, items: { e: string; k: string }[], ps: number[], on: boolean, k: number, op: number) => (
    <div style={{ width: 390, boxSizing: "border-box", borderRadius: 26, background: on ? aa(0.06) : C.surface, border: `2px solid ${on ? A.hex : C.surface3}`, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, opacity: op, transform: `translateY(${fl(t, k * 2, 10)}px) rotate(${Math.sin(t * 1.2 + k) * 1.5}deg)` }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: on ? A.hex : C.muted }}>{title}</span>
      {items.map((it, i) => (
        <div key={it.k} style={{ height: 76, borderRadius: 16, background: C.surface2, display: "flex", alignItems: "center", gap: 12, padding: "0 14px", opacity: mix(0.25, 1, Math.min(1, ps[i] * 2)), transform: `translateX(${(1 - Math.min(1, ps[i])) * 30 + Math.sin(t * 2.2 + i + k) * 5}px)` }}>
          <span style={{ fontSize: 38 }}>{it.e}</span><span style={{ fontWeight: 800, fontSize: 24, color: C.text }}>{it.k}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.05, y: 0 }, { t: c.b_imag + 0.8, s: 1.08, x: 6, y: -8, e: ease.out }, { t: c.b_util, s: 1.06, x: -6, y: -14, e: ease.linear }, { t: c.b_acesso, s: 1.08, x: 6, y: -20, e: ease.linear }, { t: c.c_corr, s: 1.06, y: -26, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: fade(who) }}>
          <Person size={70} t={t} color={A.hex} />
          <Tag text="COMPRADOR" tone="muted" size={26} />
          {ind > 0.001 ? <div style={{ opacity: fade(ind), transform: `scale(${mix(0.5, 1, Math.min(1.08, ind))})` }}><Tag text="BUSCA INDEPENDÊNCIA" tone="accent" size={26} /></div> : null}
        </div>
        <div style={{ position: "absolute", left: 130, right: 130, top: 580, display: "flex", justifyContent: "space-between" }}>
          {col("ROTEIRO PADRÃO", STD, [std, std, std], false, 0, fade(std) * mix(1, 0.4, dim))}
          {col("ROTEIRO DO CLIENTE", CLI, cl, true, 1, fade(std))}
        </div>
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>O CLIENTE DEFINE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>A PRIORIDADE</span></Title>
    </div>
  );
};

const CHECK = [{ k: "ACESSO AO PRÉDIO", at: "c_verif" }, { k: "CIRCULAÇÃO INTERNA", at: "c_reais" }, { k: "ÁREAS COMUNS", at: "c_areas" }, { k: "SERVIÇOS NO ENTORNO", at: "c_areas" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const q = sp(t, c.c_muda - 0.1, { damping: 11, stiffness: 200 });
  const shrink = prog(t, c.c_verif - 0.5, 0.6, ease.inOut);
  const ch = CHECK.map((x, i) => sp(t, c[x.at] - 0.15 + (i === 3 ? 0.35 : 0), { damping: 11, stiffness: 220 }));
  const st = sp(t, c.c_estere - 0.2, { damping: 10, stiffness: 230 });
  const fin = sp(t, c.x_pers - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 0 }, { t: c.c_viver, s: 1.12, x: 0, y: -10, e: ease.out }, { t: c.c_verif + 0.3, s: 1.06, x: -6, y: -16, e: ease.linear }, { t: c.c_estere, s: 1.08, x: 6, y: -24, e: ease.linear }, { t: c.x_visita + 0.3, s: 1.05, y: -30, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: mix(560, 450, shrink), textAlign: "center", opacity: fade(q), transform: `scale(${mix(mix(0.6, 1, Math.min(1, q)), 0.62, shrink) * (1 + 0.02 * Math.sin(t * 2.5))})`, transformOrigin: "50% 0%" }}>
          <div style={{ display: "inline-block", padding: "26px 34px", borderRadius: 30, background: aa(0.1), border: `3px solid ${A.hex}` }}>
            <span style={{ fontWeight: 800, fontSize: 64, color: C.text, lineHeight: 1.05 }}>Como você<br />quer <span style={{ color: A.hex }}>viver?</span></span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 150, right: 150, top: 640, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${C.surface3}`, padding: "14px 22px", opacity: fade(shrink) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - shrink) * 60 + fl(t, 1, 8)}px) scale(${mix(1, 0.9, Math.min(1, fin))})` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>VERIFICADO NA VISITA</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          {CHECK.map((x, i) => (
            <div key={x.k} style={{ display: "flex", alignItems: "center", height: 64, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, ch[i] * 2)), transform: `translateX(${(1 - Math.min(1, ch[i])) * 40 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 27, color: C.text }}>{x.k}</span>
              <span style={{ fontWeight: 800, fontSize: 34, color: A.hex, opacity: fade(ch[i]) }}>✓</span>
            </div>
          ))}
        </div>
        {st > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: fade(st) * (1 - fade(fin)), transform: `scale(${mix(1.8, 1, Math.min(1, st))}) rotate(-3deg)` }}><div style={{ padding: "10px 20px", borderRadius: 16, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)" }}><span style={{ fontWeight: 800, fontSize: 30, color: C.warn }}>✕ ESTEREÓTIPOS SOBRE IDADE</span></div></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1010, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Personalize <span style={{ color: A.hex }}>a visita</span></div> : null}
      </Camera>
      <Title p={enter} size={54}><span style={{ whiteSpace: "nowrap" }}>PERSONALIZE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>A VISITA</span></Title>
    </div>
  );
};
