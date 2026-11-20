import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Person, Tag, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_21 — "85% usados: onde está a oportunidade?". Secovi-SP: Heitor Kuser (CEO CIMI 360) no Conexão Imobiliária Secovi-SP,
 * nov/2026 — "usados são 85% do mercado". ESTIMATIVA atribuída, não censo; sem desestimular lançamentos. Anúncios e fichas ILUSTRATIVOS.
 * Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const who = sp(t, c.h_exec - 0.2, { damping: 12, stiffness: 200 });
  const bar = prog(t, c.h_85 - 0.2, 1.1, ease.out);
  const us = sp(t, c.h_usados - 0.2, { damping: 11, stiffness: 220 });
  const lanc = sp(t, c.h_mas - 0.2, { damping: 12, stiffness: 200 });
  const x = sp(t, c.h_aband - 0.1, { damping: 10, stiffness: 240 });
  const out = prog(t, c.a_fala - 0.4, 0.35, ease.in);
  const v = Math.round(85 * bar);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.08, x: -10, y: -8 }, { t: 1.0, s: 1.15, x: 10, y: -18, e: ease.out }, { t: c.h_usados, s: 1.1, x: -10, y: -22, e: ease.linear }, { t: c.h_lanc + 0.3, s: 1.06, x: 6, y: -30, e: ease.linear }, { t: c.a_fala, s: 1.08, y: -34, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", opacity: fade(who), transform: `translateY(${(1 - Math.min(1, who)) * 20}px)` }}><Tag text="SEGUNDO UM EXECUTIVO DO SETOR" tone="muted" size={26} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 510, textAlign: "center", opacity: fade(bar * 2), transform: `scale(${1 + 0.03 * Math.sin(t * 2.2)})` }}>
          <span style={{ fontWeight: 800, fontSize: 210, color: A.hex, letterSpacing: "-0.06em", textShadow: `0 0 60px ${aa(0.3)}` }}>{v}%</span>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 790, height: 90, borderRadius: 24, overflow: "hidden", display: "flex", background: C.surface, opacity: fade(bar * 2), transform: `translateY(${fl(t, 1, 8)}px) rotate(${Math.sin(t * 1.3) * 1}deg)` }}>
          <div style={{ width: `${85 * bar}%`, background: A.hex, display: "flex", alignItems: "center", paddingLeft: 24, boxSizing: "border-box" }}><span style={{ fontWeight: 800, fontSize: 32, color: "#092614", opacity: fade(us) }}>USADOS</span></div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: lanc > 0.5 ? C.text : C.surface3, transform: `scale(${1 + 0.06 * Math.min(1, lanc) * Math.sin(t * 4)})` }}><span style={{ fontWeight: 800, fontSize: 24, color: lanc > 0.5 ? C.bg0 : C.muted }}>NOVOS</span></div>
        </div>
        {lanc > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 930, display: "flex", justifyContent: "center", gap: 14, alignItems: "center", opacity: fade(lanc) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 18, background: C.surface2, border: `2px solid ${C.text}`, transform: `translateY(${fl(t, 2, 8)}px)` }}><span style={{ fontSize: 34 }}>🏗️</span><span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>LANÇAMENTOS</span></div>
            {x > 0.001 ? <div style={{ opacity: fade(x), transform: `scale(${mix(1.8, 1, Math.min(1, x))}) rotate(-4deg)` }}><Tag text="✕ ABANDONAR" tone="warn" size={30} /></div> : null}
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={64}><span style={{ color: A.hex }}>85%</span> USADOS?</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_fala - 0.35, { damping: 15, stiffness: 150 });
  const q = sp(t, c.a_fala - 0.1, { damping: 13, stiffness: 180 });
  const ev = sp(t, c.a_conexao - 0.2, { damping: 12, stiffness: 200 });
  const est = sp(t, c.a_estim - 0.2, { damping: 11, stiffness: 220 });
  const cen = sp(t, c.a_censo - 0.15, { damping: 10, stiffness: 230 });
  const cities = sp(t, c.a_cidade - 0.4, { damping: 12, stiffness: 200 });
  const out = prog(t, c.b_quem - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.a_fala - 0.35, s: 1.06, y: 0 }, { t: c.a_fala + 0.8, s: 1.1, x: -12, y: -10, e: ease.out }, { t: c.a_estim, s: 1.07, x: 12, y: -16, e: ease.linear }, { t: c.a_cidade, s: 1.09, x: -6, y: -26, e: ease.linear }, { t: c.b_quem, s: 1.06, y: -32, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 460, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.surface3}`, padding: "28px 30px", opacity: fade(q), transform: `translateY(${(1 - Math.min(1, q)) * 50 + fl(t, 0)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
          <div style={{ fontWeight: 800, fontSize: 86, color: A.hex, lineHeight: 0.6 }}>“</div>
          <div style={{ fontWeight: 800, fontSize: 48, color: C.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Imóveis usados são <span style={{ color: A.hex }}>85%</span> do mercado</div>
          <div style={{ marginTop: 18, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, lineHeight: 1.4, opacity: fade(ev) }}>SEGUNDO HEITOR KUSER (CIMI 360)<br />CONEXÃO IMOBILIÁRIA SECOVI-SP · NOV/2026</div>
        </div>
        {est > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 870, display: "flex", justifyContent: "center", gap: 14, opacity: fade(est) }}>
          <div style={{ transform: `scale(${mix(0.5, 1, Math.min(1.08, est))}) translateY(${fl(t, 1, 8)}px)` }}><Tag text="ESTIMATIVA DO PALESTRANTE" tone="accent" size={28} /></div>
          {cen > 0.001 ? <div style={{ opacity: fade(cen), transform: `scale(${mix(1.8, 1, Math.min(1, cen))}) rotate(-3deg)` }}><Tag text="✕ CENSO" tone="warn" size={28} /></div> : null}
        </div> : null}
        {cities > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 970, display: "flex", justifyContent: "space-between", opacity: fade(cities) }}>
            {["CIDADE A", "CIDADE B", "CIDADE C"].map((k, i) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transform: `translateY(${(1 - Math.min(1, cities)) * 30 + Math.sin(t * 2.4 + i * 1.5) * 10}px)` }}>
                <span style={{ fontSize: 40 }}>📍</span>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{k}</span>
                <span style={{ fontWeight: 800, fontSize: 34, color: C.warn }}>?</span>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={54}><span style={{ whiteSpace: "nowrap" }}>ESTIMATIVA</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>SETORIAL</span></Title>
    </div>
  );
};

const CHECK = [{ k: "ORIGEM", at: "b_origem" }, { k: "DOCUMENTAÇÃO", at: "b_doc" }, { k: "SITUAÇÃO", at: "b_sit" }, { k: "POSICIONAMENTO", at: "b_pos" }];
const PILE = Array.from({ length: 9 }, (_, i) => ({ x: [40, 210, 120, 300, 20, 230, 140, 330, 70][i], y: [0, 30, 120, 90, 210, 230, 300, 280, 380][i], r: [-12, 8, -4, 14, 6, -10, 11, -7, 3][i] }));

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_quem - 0.35, { damping: 15, stiffness: 150 });
  const pile = sp(t, c.b_revenda - 0.3, { damping: 13, stiffness: 160 });
  const ch = CHECK.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const grow = prog(t, c.b_estoque - 0.2, 0.9, ease.out);
  const prob = sp(t, c.b_problema - 0.2, { damping: 10, stiffness: 230 });
  const out = prog(t, c.c_antes - 0.4, 0.35, ease.in);
  const shown = Math.round(mix(5, 9, grow));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_quem - 0.35, s: 1.06, y: 0 }, { t: c.b_quem + 0.8, s: 1.1, x: 12, y: -8, e: ease.out }, { t: c.b_doc, s: 1.07, x: -12, y: -14, e: ease.linear }, { t: c.b_estoque, s: 1.09, x: 10, y: -22, e: ease.linear }, { t: c.c_antes, s: 1.06, y: -30, e: ease.linear }]}>
        {/* pilha caótica de anúncios */}
        <div style={{ position: "absolute", left: 90, top: 460, width: 520, height: 560, opacity: fade(pile) }}>
          {PILE.slice(0, shown).map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 200, height: 130, boxSizing: "border-box", borderRadius: 16, background: C.surface2, border: `2px solid ${prob > 0.5 ? "rgba(255,107,94,0.6)" : C.dim}`, padding: 12, display: "flex", flexDirection: "column", gap: 8, transform: `rotate(${p.r + Math.sin(t * 2 + i) * 3}deg) translateY(${Math.sin(t * 2.4 + i) * 8}px) scale(${Math.min(1, Math.max(0, pile * 9 - i))})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><IconHome size={30} color={C.muted} /><div style={{ flex: 1, height: 10, borderRadius: 5, background: C.surface3 }} /></div>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.warn }}>DOC ??</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.dim }}>R$ ??</span>
            </div>
          ))}
        </div>
        {/* perguntas da captação */}
        <div style={{ position: "absolute", left: 640, right: 70, top: 470, display: "flex", flexDirection: "column", gap: 14 }}>
          {CHECK.map((x, i) => (
            <div key={x.k} style={{ height: 82, boxSizing: "border-box", borderRadius: 18, background: ch[i] > 0.5 ? aa(0.08) : C.surface, border: `2px ${ch[i] > 0.5 ? "solid" : "dashed"} ${ch[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", opacity: mix(0.3, 1, Math.min(1, ch[i] * 2)), transform: `translateX(${(1 - Math.min(1, ch[i])) * 40 + Math.sin(t * 2 + i) * 8}px)` }}>
              <span style={{ fontWeight: 800, fontSize: 25, color: C.text }}>{x.k}</span>
              <span style={{ fontWeight: 800, fontSize: 30, color: A.hex, opacity: fade(ch[i]) }}>?</span>
            </div>
          ))}
        </div>
        {prob > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(prob), transform: `scale(${mix(0.5, 1, Math.min(1.08, prob))}) translateX(${Math.sin(t * 3) * 8}px)` }}><Tag text="⚠ ESTOQUE GRANDE SEM QUALIDADE" tone="warn" size={30} /></div> : null}
        <div style={{ position: "absolute", left: 90, top: 1010, opacity: fade(pile) * 0.9 * (1 - fade(prob)) }}><Tag text="ANÚNCIOS ILUSTRATIVOS" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>CAPTAR <span style={{ color: C.warn }}>NÃO É SÓ</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CADASTRAR</span></Title>
    </div>
  );
};

const FIELDS = [{ k: "DOCUMENTAÇÃO", v: "CONFERIDA", at: "c_aval" }, { k: "PREÇO", v: "AVALIADO", at: "c_aval" }, { k: "VISITA", v: "COMO AGENDAR", at: "c_qual" }, { k: "RESPONSÁVEL", v: "CORRETOR", at: "c_qual" }, { k: "ATUALIZADO EM", v: "DATA", at: "c_atual" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_antes - 0.35, { damping: 15, stiffness: 150 });
  const vol = sp(t, c.c_volume - 0.2, { damping: 12, stiffness: 200 });
  const card = sp(t, c.c_aval - 0.4, { damping: 13, stiffness: 170 });
  const fs = FIELDS.map((x, i) => sp(t, c[x.at] - 0.15 + (i % 2) * 0.25, { damping: 11, stiffness: 220 }));
  const ppl = sp(t, c.c_comp - 0.25, { damping: 12, stiffness: 200 });
  const ppl2 = sp(t, c.c_prop - 0.25, { damping: 12, stiffness: 200 });
  const fin = sp(t, c.x_cart - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_antes - 0.35, s: 1.05, y: 0 }, { t: c.c_antes + 0.9, s: 1.09, x: 8, y: -8, e: ease.out }, { t: c.c_qual, s: 1.07, x: -10, y: -16, e: ease.linear }, { t: c.c_cart, s: 1.09, x: 8, y: -24, e: ease.linear }, { t: c.x_capt + 0.3, s: 1.05, y: -34, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -38, e: ease.linear }]}>
        {vol > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", gap: 10, opacity: fade(vol) * (1 - fade(card)) }}><span style={{ textDecoration: "line-through", textDecorationColor: C.warn }}><Tag text="+ VOLUME" tone="muted" size={30} /></span></div> : null}
        <div style={{ position: "absolute", left: 150, right: 150, top: 470, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `2px solid ${A.hex}`, padding: "18px 24px", opacity: fade(card) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - Math.min(1, card)) * 60 + fl(t, 0, 12)}px) rotate(${Math.sin(t * 1.1) * 1.5}deg) scale(${mix(1, 0.9, Math.min(1, fin))})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><IconHome size={44} color={A.hex} /><span style={{ flex: 1, fontWeight: 800, fontSize: 30, color: C.text }}>FICHA DO IMÓVEL</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          {FIELDS.map((f, i) => (
            <div key={f.k} style={{ display: "flex", alignItems: "center", height: 66, borderTop: `2px solid ${C.surface3}`, opacity: mix(0.3, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 40 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 27, color: C.text }}>{f.k}</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: fs[i] > 0.5 ? A.hex : C.dim }}>{fs[i] > 0.5 ? `✓ ${f.v}` : "—"}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 160, right: 160, top: 1000, display: "flex", justifyContent: "space-between", opacity: 1 - fade(fin) }}>
          {[{ p: ppl, k: "COMPRADOR" }, { p: ppl2, k: "PROPRIETÁRIO" }].map((x, i) => x.p > 0.001 ? (
            <div key={x.k} style={{ display: "flex", alignItems: "center", gap: 10, opacity: fade(x.p), transform: `translateY(${(1 - Math.min(1, x.p)) * 30 + fl(t, i * 2, 8)}px)` }}><Person size={60} t={t + i} color={i ? C.text : A.hex} /><Tag text={x.k} tone={i ? "muted" : "accent"} size={24} /></div>
          ) : <div key={x.k} />)}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1010, textAlign: "center", fontWeight: 800, fontSize: 52, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Carteira confiável<br /><span style={{ color: A.hex }}>começa na captação</span></div> : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ whiteSpace: "nowrap" }}>CARTEIRA</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CONFIÁVEL</span></Title>
    </div>
  );
};
