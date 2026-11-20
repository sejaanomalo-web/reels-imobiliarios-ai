import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_24 — "Por que a incorporadora pisa no freio?". Portas (citando Exame/relatório Safra): Eztec vê excesso de oferta no
 * alto padrão em Moema, Itaim Bibi e Vila Clementino (SP) e prevê menos lançamentos em 2027. Não generaliza para o mercado; sem números
 * de estoque; torres, prateleiras e fichas ILUSTRATIVAS; mapa ESTILIZADO. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

const Tower: React.FC<{ h: number; color: string; lit?: boolean }> = ({ h, color, lit }) => (
  <div style={{ width: 54, height: h, borderRadius: "8px 8px 2px 2px", background: lit ? aa(0.15) : C.surface2, border: `2px solid ${color}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, padding: 7, boxSizing: "border-box", alignContent: "start" }}>
    {Array.from({ length: Math.max(2, Math.floor(h / 22) * 2) }).map((_, i) => <div key={i} style={{ height: 9, borderRadius: 2, background: lit ? aa(0.6) : C.surface3 }} />)}
  </div>
);

const Shelf: React.FC<{ label: string; n: number; shown: number; color: string; t: number; k: number; lit?: boolean; dim?: number }> = ({ label, n, shown, color, t, k, lit, dim = 0 }) => (
  <div style={{ width: 820, display: "flex", flexDirection: "column", gap: 8, opacity: 1 - dim * 0.6 }}>
    <div style={{ height: 150, display: "flex", alignItems: "flex-end", gap: 14, paddingLeft: 20 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ transform: `scale(${Math.min(1, Math.max(0, shown - i))}) translateY(${Math.sin(t * 2.2 + i + k) * 4}px)`, transformOrigin: "50% 100%" }}><Tower h={[120, 140, 100, 130, 110, 145, 125, 105, 135, 115, 140][i % 11]} color={color} lit={lit} /></div>
      ))}
    </div>
    <div style={{ height: 14, borderRadius: 7, background: C.dim }} />
    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: lit ? A.hex : C.muted, letterSpacing: "0.08em" }}>{label}</span>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const sh = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const full = prog(t, -0.1, 1.2, ease.out);
  const less = prog(t, c.h_menos - 0.2, 0.8, ease.inOut);
  const y27 = sp(t, c.h_2027 - 0.1, { damping: 11, stiffness: 220 });
  const q = sp(t, c.h_luxo - 0.3, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_nao - 0.3, 0.3, ease.in);
  const launches = mix(9, 4, less) * full;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, x: 8, y: -6 }, { t: 1.0, s: 1.12, x: -10, y: -14, e: ease.out }, { t: c.h_menos, s: 1.08, x: 10, y: -20, e: ease.linear }, { t: c.h_luxo, s: 1.1, x: 0, y: -28, e: ease.linear }, { t: c.a_nao, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, top: 520, opacity: fade(sh), transform: `translateY(${fl(t, 0, 8)}px)` }}>
          <Shelf label="LANÇAMENTOS" n={9} shown={launches} color={A.hex} t={t} k={0} lit />
        </div>
        {y27 > 0.001 ? <div style={{ position: "absolute", right: 130, top: 770, opacity: fade(y27), transform: `scale(${mix(0.5, 1, Math.min(1.08, y27))}) rotate(${Math.sin(t * 2) * 3}deg)` }}><Tag text="2027 ↓ MENOS" tone="warn" size={30} /></div> : null}
        {y27 > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 850, display: "flex", justifyContent: "center", opacity: fade(y27) * (1 - fade(q)) }}><Tag text="UMA INCORPORADORA · SEGUNDO A IMPRENSA" tone="muted" size={24} /></div> : null}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: fade(q), transform: `scale(${mix(0.5, 1, Math.min(1.08, q)) * (1 + 0.03 * Math.sin(t * 3))})` }}>
            <span style={{ fontSize: 64 }}>💎</span>
            <span style={{ fontWeight: 800, fontSize: 64, color: C.text, letterSpacing: "-0.03em" }}>LUXO <span style={{ color: C.warn }}>ACABOU?</span></span>
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={58}><span style={{ whiteSpace: "nowrap" }}>MENOS</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>LANÇAMENTOS</span></Title>
    </div>
  );
};

const SCOPE = [{ k: "1 EMPRESA", at: "a_empresa" }, { k: "1 SEGMENTO", at: "a_seg" }, { k: "1 CIDADE", at: "a_cidade" }];
const BAL = [{ k: "UNIDADES DISPONÍVEIS", at: "a_unid", ic: "🏢" }, { k: "VELOCIDADE DE VENDAS", at: "a_vel", ic: "⏱️" }, { k: "NOVOS PROJETOS", at: "a_proj", ic: "📐" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const no = sp(t, c.a_nao - 0.2, { damping: 9, stiffness: 260 });
  const enter = sp(t, c.a_noticia - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.a_eztec - 0.3, { damping: 13, stiffness: 180 });
  const sc = SCOPE.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const bal = prog(t, c.a_equil - 0.4, 0.5, ease.out);
  const bs = BAL.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  const noOut = prog(t, c.a_noticia - 0.3, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      {no > 0.001 && noOut < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center", fontWeight: 800, fontSize: 260, color: A.hex, letterSpacing: "-0.05em", opacity: fade(no) * (1 - noOut), transform: `scale(${mix(1.6, 1, Math.min(1, no))})`, textShadow: `0 0 60px ${aa(0.4)}` }}>NÃO.</div> : null}
      <div style={{ position: "absolute", inset: 0, opacity: fade(enter) }}>
        <Camera drift={6} t={t} keys={[{ t: c.a_noticia - 0.35, s: 1.05, y: 0 }, { t: c.a_noticia + 0.8, s: 1.09, x: -8, y: -8, e: ease.out }, { t: c.a_cidade, s: 1.06, x: 8, y: -14, e: ease.linear }, { t: c.a_vel, s: 1.08, x: -6, y: -22, e: ease.linear }, { t: c.b_imag, s: 1.06, y: -28, e: ease.linear }]}>
          <div style={{ position: "absolute", left: 140, right: 140, top: 470, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${C.surface3}`, padding: "20px 26px", opacity: fade(card) * mix(1, 0.55, bal), transform: `translateY(${(1 - Math.min(1, card)) * 50 + fl(t, 0, 8)}px) scale(${mix(1, 0.88, bal)}) rotate(${Math.sin(t * 1.2) * 1.2}deg)`, transformOrigin: "50% 0%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>NOTÍCIA · NOV/2026</span><Tag text="SEGUNDO A IMPRENSA" tone="muted" size={24} /></div>
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 40, color: C.text, lineHeight: 1.1 }}>Eztec prevê <span style={{ color: A.hex }}>menos lançamentos</span> em 2027</div>
            <div style={{ marginTop: 8, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>ALTO PADRÃO · MOEMA · ITAIM BIBI · VILA CLEMENTINO (SP)</div>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              {SCOPE.map((x, i) => sc[i] > 0.001 ? <div key={x.k} style={{ opacity: fade(sc[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, sc[i]))}) translateY(${Math.sin(t * 2.4 + i) * 5}px)` }}><Tag text={x.k} tone="accent" size={26} /></div> : null)}
            </div>
          </div>
          {bal > 0.001 ? (
            <div style={{ position: "absolute", left: 140, right: 140, top: 860, display: "flex", justifyContent: "space-between", opacity: fade(bal) }}>
              {BAL.map((x, i) => (
                <div key={x.k} style={{ width: 250, height: 170, boxSizing: "border-box", borderRadius: 22, background: bs[i] > 0.5 ? aa(0.08) : C.surface, border: `2px ${bs[i] > 0.5 ? "solid" : "dashed"} ${bs[i] > 0.5 ? A.hex : C.dim}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", opacity: mix(0.35, 1, Math.min(1, bs[i] * 2)), transform: `translateY(${Math.sin(t * 2 + i * 1.4) * 10}px) rotate(${Math.sin(t * 1.5 + i) * 2}deg)` }}>
                  <span style={{ fontSize: 44 }}>{x.ic}</span>
                  <span style={{ fontWeight: 800, fontSize: 24, color: C.text, lineHeight: 1.1 }}>{x.k}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Camera>
        <Title p={enter} size={46}><span style={{ whiteSpace: "nowrap" }}>DECISÃO DE UMA EMPRESA</span><br /><span style={{ whiteSpace: "nowrap" }}><span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>TODO O MERCADO</span></span></Title>
      </div>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const stock = prog(t, c.b_imag - 0.2, 1.0, ease.out);
  const flood = prog(t, c.b_lanca - 0.2, Math.max(0.8, c.b_parec - c.b_lanca + 0.5), ease.out);
  const conc = sp(t, c.b_conc - 0.2, { damping: 10, stiffness: 230 });
  const plan = prog(t, c.b_estr - 0.3, 0.9, ease.inOut);
  const pn = sp(t, c.b_panico - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_corr - 0.4, 0.35, ease.in);
  const newShown = mix(0, 10, flood) * (1 - plan) + mix(0, 4, flood) * plan;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.05, y: 0 }, { t: c.b_imag + 0.8, s: 1.09, x: 8, y: -8, e: ease.out }, { t: c.b_parec, s: 1.06, x: -8, y: -14, e: ease.linear }, { t: c.b_conc, s: 1.1, x: 0, y: -20, e: ease.out }, { t: c.b_estr + 0.4, s: 1.05, x: 0, y: -28, e: ease.linear }, { t: c.c_corr, s: 1.07, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, top: 500, transform: `translateY(${fl(t, 0, 8)}px)` }}>
          <Shelf label="ESTOQUE · UNIDADES AINDA À VENDA" n={6} shown={stock * 6} color={C.muted} t={t} k={1} dim={conc * (1 - plan)} />
        </div>
        <div style={{ position: "absolute", left: 130, top: 740, transform: `translateY(${fl(t, 2, 8)}px)` }}>
          <Shelf label={plan > 0.5 ? "LANÇAMENTOS PLANEJADOS" : "LANÇAMENTOS PARECIDOS"} n={10} shown={newShown} color={A.hex} t={t} k={3} lit />
        </div>
        {conc > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 990, display: "flex", justifyContent: "center", opacity: fade(conc) * (1 - fade(plan * 1.5)), transform: `scale(${mix(0.5, 1, Math.min(1.08, conc))}) translateX(${Math.sin(t * 4) * 8}px)` }}><Tag text="⚠ CONCORRÊNCIA COM O PRÓPRIO ESTOQUE" tone="warn" size={28} /></div> : null}
        {pn > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", gap: 14, opacity: fade(pn) }}>
            <Tag text="✓ ESTRATÉGIA" tone="accent" size={30} />
            <div style={{ padding: "8px 16px", borderRadius: 14, background: WARN_BG }}><span style={{ fontWeight: 800, fontSize: 28, color: C.warn, textDecoration: "line-through" }}>PÂNICO</span></div>
          </div>
        ) : null}
        <div style={{ position: "absolute", right: 120, top: 1080, opacity: fade(stock) * 0.9 }}><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>ESTOQUE TAMBÉM</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>É ESTRATÉGIA</span></Title>
    </div>
  );
};

const FIELDS = [{ k: "MOMENTO", v: "ESTÁGIO DA OBRA", at: "c_momento" }, { k: "CONDIÇÕES", v: "PRAZO E PAGAMENTO", at: "c_cond" }, { k: "ESTOQUE", v: "VERIFICADO", at: "c_cond" }, { k: "ALTERNATIVAS", v: "PARA O COMPRADOR", at: "c_alt" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_corr - 0.15, { damping: 13, stiffness: 170 });
  const fs = FIELDS.map((x, i) => sp(t, c[x.at] - 0.15 + (i === 2 ? 0.35 : 0), { damping: 11, stiffness: 220 }));
  const mh = sp(t, c.c_manch - 0.2, { damping: 11, stiffness: 220 });
  const ld = sp(t, c.c_leitura - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_leia - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 0 }, { t: c.c_corr + 0.9, s: 1.08, x: 6, y: -8, e: ease.out }, { t: c.c_cond, s: 1.06, x: -6, y: -14, e: ease.linear }, { t: c.c_manch, s: 1.08, x: 6, y: -22, e: ease.linear }, { t: c.x_ctx + 0.3, s: 1.05, y: -30, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 150, right: 150, top: 500, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${A.hex}`, padding: "18px 24px", opacity: fade(card) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - Math.min(1, card)) * 60 + fl(t, 0, 10)}px) rotate(${Math.sin(t * 1.1) * 1.5}deg) scale(${mix(1, 0.9, Math.min(1, fin))})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><span style={{ fontSize: 40 }}>🏗️</span><span style={{ flex: 1, fontWeight: 800, fontSize: 30, color: C.text }}>FICHA DO EMPREENDIMENTO</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          {FIELDS.map((f, i) => (
            <div key={f.k} style={{ display: "flex", alignItems: "center", height: 70, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 40 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 28, color: C.text }}>{f.k}</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: fs[i] > 0.5 ? A.hex : C.dim }}>{fs[i] > 0.5 ? `✓ ${f.v}` : "—"}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: 1 - fade(fin) }}>
          {mh > 0.001 ? <div style={{ padding: "10px 18px", borderRadius: 16, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", opacity: fade(mh), transform: `scale(${mix(0.5, 1, Math.min(1.08, mh)) * mix(1, 0.88, Math.min(1, ld))}) rotate(-3deg)` }}><span style={{ fontWeight: 800, fontSize: 26, color: C.warn, textDecoration: ld > 0.5 ? "line-through" : "none" }}>📰 MANCHETE DRAMÁTICA</span></div> : null}
          {ld > 0.001 ? <div style={{ opacity: fade(ld), transform: `scale(${mix(0.5, 1.05, Math.min(1, ld))}) translateY(${fl(t, 3, 6)}px)` }}><Tag text="✓ LEITURA DE MERCADO" tone="accent" size={28} /></div> : null}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 64, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Leia o <span style={{ color: A.hex }}>contexto</span></div> : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ whiteSpace: "nowrap" }}>LEIA O</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CONTEXTO</span></Title>
    </div>
  );
};
