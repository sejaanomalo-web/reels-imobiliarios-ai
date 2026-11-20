import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_28 — "Concorrente ou parceiro?". Conexão Imobiliária Secovi-SP (nov/2026): executivos debateram cooperação entre
 * imobiliárias. Corretores A e B: EXEMPLO HIPOTÉTICO; contrato ILUSTRATIVO; sem dados reais; consentimento do cliente explícito;
 * sem prometer função de compartilhamento da ATIVO. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 12) => Math.sin(t * 1.7 + k) * a;

const Agent: React.FC<{ label: string; color: string; t: number; k: number; children?: React.ReactNode }> = ({ label, color, t, k, children }) => (
  <div style={{ width: 330, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: `translateY(${fl(t, k, 10)}px)` }}>
    <Person size={110} t={t + k} color={color} />
    <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{label}</span>
    {children}
  </div>
);

const Wall: React.FC<{ h: number; open: number; t: number }> = ({ h, open, t }) => (
  <div style={{ position: "relative", width: 70, height: h }}>
    {[0, 1].map((side) => (
      <div key={side} style={{ position: "absolute", left: 0, top: side ? h / 2 : 0, width: 70, height: h / 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, transform: `translateY(${(side ? 1 : -1) * open * (h / 2 + 40)}px)`, opacity: 1 - open * 0.8 }}>
        {Array.from({ length: Math.floor(h / 2 / 34) * 2 }).map((_, i) => <div key={i} style={{ height: 30, borderRadius: 4, background: C.surface3, border: `2px solid ${C.dim}`, transform: `translateX(${Math.sin(t * 2 + i) * open * 6}px)` }} />)}
      </div>
    ))}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const a = sp(t, -0.2, { damping: 12, stiffness: 180 });
  const im = sp(t, c.h_imovel - 0.2, { damping: 11, stiffness: 220 });
  const cl = sp(t, c.h_cliente - 0.2, { damping: 11, stiffness: 220 });
  const vs = sp(t, c.h_compet - 0.2, { damping: 10, stiffness: 230 });
  const cv = sp(t, c.h_conv - 0.15, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_hist - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.06, x: 6, y: -6 }, { t: 1.0, s: 1.1, x: -6, y: -14, e: ease.out }, { t: c.h_cliente, s: 1.07, x: 6, y: -18, e: ease.linear }, { t: c.h_conv, s: 1.1, x: 0, y: -24, e: ease.out }, { t: c.a_hist, s: 1.08, y: -26, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 100, right: 100, top: 520, display: "flex", justifyContent: "space-between", opacity: fade(a) }}>
          <Agent label="CORRETOR A" color={A.hex} t={t} k={0}>
            {im > 0.001 ? <div style={{ opacity: fade(im), transform: `scale(${mix(0.5, 1, Math.min(1.08, im))})`, display: "flex", alignItems: "center", gap: 8 }}><IconHome size={44} color={A.hex} /><Tag text="O IMÓVEL CERTO" tone="accent" size={24} /></div> : null}
          </Agent>
          <Agent label="CORRETOR B" color={C.text} t={t} k={2}>
            {cl > 0.001 ? <div style={{ opacity: fade(cl), transform: `scale(${mix(0.5, 1, Math.min(1.08, cl))})`, display: "flex", alignItems: "center", gap: 8 }}><Person size={40} t={t} color={C.muted} /><Tag text="O CLIENTE CERTO" tone="muted" size={24} /></div> : null}
          </Agent>
        </div>
        {vs > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center", alignItems: "center", gap: 12, opacity: fade(vs) }}>
            <span style={{ fontWeight: 800, fontSize: 70, color: C.warn, opacity: 1 - fade(cv) * 0.7, transform: `scale(${1 + 0.06 * Math.sin(t * 5)})` }}>VS</span>
          </div>
        ) : null}
        {cv > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", justifyContent: "center", opacity: fade(cv), transform: `scale(${mix(0.4, 1, Math.min(1.1, cv))})` }}><span style={{ fontWeight: 800, fontSize: 80, color: A.hex }}>⇄</span></div> : null}
        {cv > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", gap: 12, opacity: fade(cv) }}><Tag text="COMPETIR" tone="warn" size={28} /><Tag text="OU" tone="muted" size={28} /><Tag text="CONVERSAR?" tone="accent" size={28} /></div> : null}
      </Camera>
      <Title p={title} size={58}>PARCERIA <span style={{ color: C.muted }}>OU</span> <span style={{ color: C.warn }}>DISPUTA?</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_hist - 0.35, { damping: 15, stiffness: 150 });
  const hip = sp(t, c.a_hip - 0.2, { damping: 11, stiffness: 220 });
  const capt = sp(t, c.a_capt - 0.2, { damping: 11, stiffness: 220 });
  const reg = sp(t, c.a_regiao - 0.2, { damping: 11, stiffness: 220 });
  const iso = sp(t, c.a_isol - 0.2, { damping: 10, stiffness: 230 });
  const nem = sp(t, c.a_nem - 0.2, { damping: 10, stiffness: 230 });
  const out = prog(t, c.b_conexao - 0.4, 0.35, ease.in);
  const tryArrow = prog(t, c.a_guardar - 0.3, 1.2, ease.inOut);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_hist - 0.35, s: 1.05, y: 0 }, { t: c.a_hist + 0.8, s: 1.08, x: -4, y: -8, e: ease.out }, { t: c.a_regiao, s: 1.06, x: 4, y: -14, e: ease.linear }, { t: c.a_isol, s: 1.09, x: 0, y: -20, e: ease.out }, { t: c.b_conexao, s: 1.06, y: -24, e: ease.linear }]}>
        {hip > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1090, display: "flex", justifyContent: "center", opacity: fade(hip) * (1 - fade(iso)) }}><Tag text="EXEMPLO HIPOTÉTICO" tone="muted" size={26} /></div> : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 530, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Agent label="CORRETOR A" color={A.hex} t={t} k={0}>
            {capt > 0.001 ? <div style={{ width: 290, boxSizing: "border-box", borderRadius: 20, background: aa(0.08), border: `2px solid ${A.hex}`, padding: 14, display: "flex", alignItems: "center", gap: 10, opacity: fade(capt), transform: `scale(${mix(0.6, 1, Math.min(1.05, capt))})` }}><IconHome size={52} color={A.hex} /><span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>BOA CAPTAÇÃO</span></div> : null}
            {iso > 0.001 ? <span style={{ fontSize: 46, opacity: fade(iso) }}>🔒</span> : null}
          </Agent>
          <div style={{ marginTop: 10 }}><Wall h={420} open={0} t={t} /></div>
          <Agent label="CORRETOR B" color={C.text} t={t} k={2}>
            {reg > 0.001 ? <div style={{ width: 290, boxSizing: "border-box", borderRadius: 20, background: C.surface, border: `2px solid ${C.text}`, padding: 14, display: "flex", alignItems: "center", gap: 10, opacity: fade(reg), transform: `scale(${mix(0.6, 1, Math.min(1.05, reg))})` }}><span style={{ fontSize: 40 }}>📍</span><span style={{ fontWeight: 800, fontSize: 24, color: C.text, lineHeight: 1.1 }}>CLIENTE QUER ESSA REGIÃO</span></div> : null}
            {iso > 0.001 ? <span style={{ fontSize: 46, opacity: fade(iso) }}>🔒</span> : null}
          </Agent>
        </div>
        {tryArrow > 0.001 && tryArrow < 1 ? <div style={{ position: "absolute", left: 300 + tryArrow * 160, top: 760, fontSize: 60, color: A.hex, opacity: Math.sin(tryArrow * Math.PI) }}>→</div> : null}
        {iso > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", gap: 12, opacity: fade(iso), transform: `scale(${mix(0.5, 1, Math.min(1.08, iso))})` }}><Tag text="INFORMAÇÕES ISOLADAS" tone="warn" size={28} />{nem > 0.001 ? <span style={{ opacity: fade(nem) }}><Tag text="✕ NEGÓCIO NÃO ACONTECE" tone="warn" size={28} /></span> : null}</div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>UM TEM <span style={{ color: A.hex }}>O IMÓVEL</span></span><br /><span style={{ whiteSpace: "nowrap" }}>OUTRO TEM <span style={{ color: A.hex }}>O CLIENTE</span></span></Title>
    </div>
  );
};

const RULES = [{ k: "AUTORIZAÇÃO", sub: "do proprietário e do cliente", at: "b_aut" }, { k: "COMBINADO CLARO", sub: "quem faz o quê", at: "b_comb" }, { k: "REMUNERAÇÃO", sub: "definida antes", at: "b_rem" }, { k: "PROTEÇÃO DOS DADOS", sub: "consentimento do cliente", at: "b_prot" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_conexao - 0.35, { damping: 15, stiffness: 150 });
  const ev = sp(t, c.b_conexao - 0.1, { damping: 12, stiffness: 200 });
  const open = prog(t, c.b_coop - 0.3, 0.9, ease.inOut);
  const doc = sp(t, c.b_mas - 0.2, { damping: 13, stiffness: 180 });
  const rs = RULES.map((r) => sp(t, c[r.at] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.c_licao - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_conexao - 0.35, s: 1.05, y: 0 }, { t: c.b_conexao + 0.8, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.b_mas, s: 1.05, x: -4, y: -14, e: ease.linear }, { t: c.b_rem, s: 1.07, x: 4, y: -20, e: ease.linear }, { t: c.c_licao, s: 1.05, y: -24, e: ease.linear }]}>
        {ev > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 450, display: "flex", justifyContent: "center", opacity: fade(ev) }}><Tag text="CONEXÃO IMOBILIÁRIA · SECOVI-SP · NOV/2026" tone="muted" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 120, right: 120, top: 520, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 1 - fade(doc) * 0.75 }}>
          <div style={{ transform: `translateX(${open * 60}px) translateY(${fl(t, 0, 8)}px)` }}><Person size={100} t={t} color={A.hex} /></div>
          <Wall h={200} open={open} t={t} />
          <div style={{ transform: `translateX(${-open * 60}px) translateY(${fl(t, 2, 8)}px)` }}><Person size={100} t={t + 1} color={C.text} /></div>
        </div>
        {open > 0.5 ? <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", opacity: fade((open - 0.5) * 2) * (1 - fade(doc)) }}><Tag text="COOPERAÇÃO" tone="accent" size={30} /></div> : null}
        {doc > 0.001 ? (
          <div style={{ position: "absolute", left: 150, right: 150, top: 560, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${A.hex}`, padding: "16px 22px", opacity: fade(doc), transform: `translateY(${(1 - Math.min(1, doc)) * 60 + fl(t, 1, 10)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>📄 ACORDO DE PARCERIA</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
            {RULES.map((r, i) => (
              <div key={r.k} style={{ display: "flex", alignItems: "center", height: 74, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, rs[i] * 2)), transform: `translateX(${(1 - Math.min(1, rs[i])) * 40 + Math.sin(t * 2 + i) * 8}px)` }}>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{r.k}</div><div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{r.sub}</div></div>
                <span style={{ fontWeight: 800, fontSize: 34, color: A.hex, opacity: fade(rs[i]) }}>✓</span>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>PARCERIA PRECISA</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DE REGRAS</span></Title>
    </div>
  );
};

const NODES = [{ x: 0, y: 0 }, { x: -260, y: -150 }, { x: 260, y: -150 }, { x: -280, y: 150 }, { x: 280, y: 150 }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_licao - 0.35, { damping: 15, stiffness: 150 });
  const net = sp(t, c.c_licao - 0.1, { damping: 13, stiffness: 170 });
  const no = sp(t, c.c_qualq - 0.2, { damping: 10, stiffness: 230 });
  const org = sp(t, c.c_org - 0.2, { damping: 11, stiffness: 220 });
  const conf = sp(t, c.c_conf - 0.2, { damping: 11, stiffness: 220 });
  const link = prog(t, c.c_org - 0.3, Math.max(0.8, c.c_rede - c.c_org + 0.4), ease.out);
  const fin = sp(t, c.x_coop - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const cx = 540, cy = 740;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_licao - 0.35, s: 1.05, y: 0 }, { t: c.c_licao + 0.9, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.c_org, s: 1.05, x: -4, y: -14, e: ease.linear }, { t: c.c_rede, s: 1.08, x: 0, y: -20, e: ease.out }, { t: c.x_crit + 0.3, s: 1.05, y: -26, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -30, e: ease.linear }]}>
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: fade(net) * (1 - 0.5 * fade(fin)) }}>
          {NODES.slice(1).map((n, i) => {
            const on = link * 4 > i;
            return <line key={i} x1={cx} y1={cy} x2={cx + n.x * Math.min(1, net)} y2={cy + n.y * Math.min(1, net)} stroke={on ? A.hex : C.dim} strokeWidth={on ? 6 : 3} strokeDasharray={on ? "0" : "10 10"} />;
          })}
        </svg>
        {NODES.map((n, i) => (
          <div key={i} style={{ position: "absolute", left: cx + n.x * Math.min(1, net) - 55, top: cy + n.y * Math.min(1, net) - 55, width: 110, height: 110, borderRadius: 55, background: i === 0 ? aa(0.15) : C.surface, border: `3px solid ${i === 0 || link * 4 > i - 1 ? A.hex : C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: fade(net) * (1 - 0.5 * fade(fin)), transform: `translateY(${Math.sin(t * 2 + i) * 8}px)` }}>
            <Person size={60} t={t + i} color={i === 0 ? A.hex : C.text} />
            {i > 0 && link * 4 > i - 1 ? <span style={{ position: "absolute", right: -14, top: -14, fontSize: 30 }}>🔑</span> : null}
          </div>
        ))}
        {link > 0.2 ? <div style={{ position: "absolute", left: 0, right: 0, top: 940, display: "flex", justifyContent: "center", opacity: fade(link) * (1 - fade(fin)) }}><Tag text="CONEXÕES COM PERMISSÃO · ILUSTRATIVO" tone="muted" size={24} /></div> : null}
        {no > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: fade(no) * (1 - fade(org)) }}><div style={{ padding: "10px 20px", borderRadius: 16, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", transform: `scale(${mix(1.8, 1, Math.min(1, no))}) rotate(-3deg)` }}><span style={{ fontWeight: 800, fontSize: 28, color: C.warn }}>✕ CARTEIRA ABERTA PARA QUALQUER PESSOA</span></div></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", gap: 14, opacity: 1 - fade(fin) }}>
          {org > 0.001 ? <div style={{ opacity: fade(org), transform: `scale(${mix(0.5, 1, Math.min(1.08, org))}) translateY(${fl(t, 1, 6)}px)` }}><Tag text="✓ ORGANIZAÇÃO" tone="accent" size={28} /></div> : null}
          {conf > 0.001 ? <div style={{ opacity: fade(conf), transform: `scale(${mix(0.5, 1, Math.min(1.08, conf))}) translateY(${fl(t, 3, 6)}px)` }}><Tag text="✓ CONFIANÇA" tone="accent" size={28} /></div> : null}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Cooperação <span style={{ color: A.hex }}>com critério</span></div> : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>COOPERAÇÃO</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>COM CRITÉRIO</span></Title>
    </div>
  );
};
