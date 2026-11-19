import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_17 — "Cascavel está construindo moradias". Prefeitura de Cascavel: Conjunto Favo de Mel, 123 casas entregues em
 * 12/11/2026 (região norte); mais de 4 mil moradias em obras ou projeto (o 4.258 do roteiro não foi confirmado → "+ DE 4 MIL").
 * Categorias diferentes; habitação social não é estoque à venda; sem prometer valorização; escola/ônibus/serviços só "a verificar".
 * Mapa ESTILIZADO e post ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const CITY = "M80,60 C180,10 330,30 420,20 C520,10 600,70 620,160 C640,250 600,340 520,390 C430,440 300,450 200,420 C100,390 40,320 30,230 C20,150 30,90 80,60 Z";

const CityMap: React.FC<{ p: number; t: number; w?: number; children?: React.ReactNode }> = ({ p, t, w = 660, children }) => {
  const h = w * 0.7;
  return (
    <div style={{ position: "relative", width: w, height: h, opacity: fade(p), transform: `scale(${mix(0.85, 1, Math.min(1, p)) * (1 + 0.025 * Math.sin(t * 1.3))}) rotate(${Math.sin(t * 0.9) * 2.2}deg) translateY(${Math.sin(t * 1.5) * 10}px)` }}>
      <svg width={w} height={h} viewBox="0 0 660 462">
        <path d={CITY} fill={aa(0.05)} stroke={C.dim} strokeWidth={4} />
        {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={60 + i * 65} y1={40} x2={40 + i * 70} y2={430} stroke={C.surface3} strokeWidth={2} />)}
        {Array.from({ length: 6 }).map((_, i) => <line key={"h" + i} x1={30} y1={80 + i * 60} x2={630} y2={70 + i * 62} stroke={C.surface3} strokeWidth={2} />)}
      </svg>
      {children}
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const map = sp(t, -0.15, { damping: 13, stiffness: 160 });
  const pin = sp(t, c.h_casas - 0.3, { damping: 10, stiffness: 230 });
  const num = sp(t, c.h_123 - 0.15, { damping: 11, stiffness: 210 });
  const next = sp(t, c.h_depois - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_pref - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={4} t={t} keys={[{ t: 0, s: 1.08, x: 12, y: -10 }, { t: 1.0, s: 1.18, x: -14, y: -24, e: ease.out }, { t: c.h_casas, s: 1.12, x: 15, y: -15, e: ease.linear }, { t: c.h_depois + 0.3, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.a_pref, s: 1.09, y: -40, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 210, top: 430 }}>
          <CityMap p={map} t={t}>
            {pin > 0.001 ? <div style={{ position: "absolute", left: 200, top: 70, display: "flex", flexDirection: "column", alignItems: "center", opacity: fade(pin), transform: `translateY(${(1 - Math.min(1, pin)) * -60 + Math.sin(t * 4) * 4}px)` }}><span style={{ fontSize: 56 }}>📍</span><Tag text="FAVO DE MEL · REGIÃO NORTE" tone="accent" size={24} /></div> : null}
            <div style={{ position: "absolute", right: 10, bottom: 10 }}><Tag text="MAPA ESTILIZADO" tone="muted" size={24} /></div>
          </CityMap>
        </div>
        {num > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 920, textAlign: "center", opacity: fade(num), transform: `scale(${mix(0.6, 1, Math.min(1.05, num))})` }}><span style={{ fontWeight: 800, fontSize: 120, color: C.text, letterSpacing: "-0.04em" }}>123</span><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: A.hex, marginLeft: 16 }}>CASAS ENTREGUES</span></div> : null}
        {num > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", opacity: fade(num) * (1 - fade(next)) }}><Tag text="PREFEITURA DE CASCAVEL · NOV/2026" tone="muted" size={24} /></div> : null}
        {next > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", opacity: fade(next), transform: `translateX(${Math.sin(t * 4) * 6}px)` }}><Tag text="E O QUE VEM DEPOIS? →" tone="warn" size={32} /></div> : null}
      </Camera>
      <Title p={title} size={58}>CASCAVEL <span style={{ color: A.hex }}>EM MOVIMENTO</span></Title>
    </div>
  );
};

const STAGES = [{ k: "EM OBRAS", at: "a_obras" }, { k: "EM PROJETO", at: "a_proj" }, { k: "PROTOCOLO", at: "a_prot" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_pref - 0.35, { damping: 15, stiffness: 150 });
  const left = sp(t, c.a_pref - 0.1, { damping: 13, stiffness: 180 });
  const right = sp(t, c.a_4mil - 0.2, { damping: 13, stiffness: 180 });
  const st = STAGES.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const diff = sp(t, c.a_etapas - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_pensa - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.a_pref - 0.35, s: 1.08, y: 0 }, { t: c.a_pref + 0.8, s: 1.12, x: -15, y: -10, e: ease.out }, { t: c.a_4mil + 0.4, s: 1.08, x: 15, y: -15, e: ease.linear }, { t: c.a_prot + 0.3, s: 1.1, x: 15, y: -25, e: ease.linear }, { t: c.a_etapas + 0.3, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.b_pensa, s: 1.07, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 80, top: 450, width: 400, height: 520, boxSizing: "border-box", borderRadius: 30, background: aa(0.08), border: `2px solid ${A.hex}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: fade(left), transform: `translateY(${(1 - Math.min(1, left)) * 60 + Math.sin(t * 1.6) * 8}px)` }}>
          <span style={{ fontWeight: 800, fontSize: 100, color: C.text, letterSpacing: "-0.04em" }}>123</span>
          <span style={{ fontWeight: 800, fontSize: 32, color: A.hex }}>ENTREGUES</span>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>{Array.from({ length: 15 }).map((_, i) => <div key={i} style={{ transform: `translateY(${Math.sin(t * 2.6 + i * 0.7) * 6}px)` }}><IconHome size={46} color={A.hex} /></div>)}</div>
        </div>
        <div style={{ position: "absolute", left: 520, top: 450, width: 480, height: 520, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px dashed ${C.dim}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: fade(right), transform: `translateY(${(1 - Math.min(1, right)) * 60 + Math.sin(t * 1.6 + 1) * 8}px)` }}>
          <span style={{ fontWeight: 800, fontSize: 92, color: C.text, letterSpacing: "-0.04em" }}>+4 mil</span>
          <span style={{ fontWeight: 800, fontSize: 32, color: C.muted }}>EM ETAPAS</span>
          {STAGES.map((x, i) => (
            <div key={x.k} style={{ width: "100%", height: 74, boxSizing: "border-box", borderRadius: 18, background: C.surface2, border: `2px ${st[i] > 0.5 ? "solid" : "dashed"} ${st[i] > 0.5 ? C.text : C.dim}`, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", opacity: mix(0.35, 1, Math.min(1, st[i] * 2)), transform: `translateX(${(1 - Math.min(1, st[i])) * 40}px)` }}>
              <span style={{ fontSize: 30 }}>{["🏗️", "📐", "📄"][i]}</span>
              <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{x.k}</span>
            </div>
          ))}
        </div>
        {diff > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: fade(diff), transform: `scale(${mix(0.5, 1, Math.min(1.08, diff))})` }}><Tag text="CATEGORIAS DIFERENTES" tone="warn" size={30} /></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center", opacity: fade(right) * 0.9 }}><Tag text="FONTE: PREFEITURA DE CASCAVEL" tone="muted" size={24} /></div>
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>123 ENTREGUES /</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>+ DE 4 MIL EM ETAPAS</span></Title>
    </div>
  );
};

const VERIFY = [{ k: "INFRAESTRUTURA", at: "b_infra", ic: "🔧" }, { k: "BAIRRO", at: "b_bairros", ic: "🏘️" }, { k: "MOBILIDADE", at: "b_mob", ic: "🚌" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_pensa - 0.35, { damping: 15, stiffness: 150 });
  const post = sp(t, c.b_anuncia - 0.2, { damping: 12, stiffness: 200 });
  const list = sp(t, c.b_lista - 0.2, { damping: 12, stiffness: 200 });
  const ef = sp(t, c.b_efeito - 0.15, { damping: 11, stiffness: 220 });
  const vs = VERIFY.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const impl = sp(t, c.b_impl - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_atua - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.b_pensa - 0.35, s: 1.06, y: 0 }, { t: c.b_pensa + 0.8, s: 1.12, x: 10, y: -10, e: ease.out }, { t: c.b_lista + 0.3, s: 1.07, x: -10, y: -15, e: ease.linear }, { t: c.b_mob + 0.3, s: 1.1, x: 10, y: -25, e: ease.linear }, { t: c.b_impl + 0.3, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.c_atua, s: 1.07, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, right: 110, top: 430, display: "flex", alignItems: "flex-end", gap: 14, opacity: fade(post) * mix(1, 0.5, ef), transform: `translateY(${(1 - Math.min(1, post)) * 40 + Math.sin(t * 1.7) * 8}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
          <Person size={80} t={t} />
          <Msg side="in" tone={ef > 0.5 ? "warn" : "plain"} size={34}>“A cidade vai crescer, compre já!”</Msg>
        </div>
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 560, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", opacity: fade(list) * mix(1, 0.4, ef) }}>
            {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ transform: `translateY(${Math.sin(t * 3 + i) * 10}px) scale(${1 + 0.08 * Math.sin(t * 2.5 + i)})` }}><IconHome size={52} color={C.muted} /></div>)}
            <div style={{ width: "100%", textAlign: "center", marginTop: 6 }}><Tag text="SÓ UMA LISTA DE CASAS" tone="muted" size={24} /></div>
          </div>
        ) : null}
        {/* rua com elementos a verificar */}
        <div style={{ position: "absolute", left: 90, right: 90, top: 790, height: 14, borderRadius: 7, background: `repeating-linear-gradient(90deg, ${C.surface3} 0 50px, ${C.dim} 50px 70px)`, opacity: fade(ef), transform: `translateX(${-((t * 60) % 70)}px)` }} />
        <div style={{ position: "absolute", left: 90, right: 90, top: 830, display: "flex", gap: 16 }}>
          {VERIFY.map((x, i) => (
            <div key={x.k} style={{ flex: 1, height: 170, boxSizing: "border-box", borderRadius: 24, background: vs[i] > 0.5 ? WARN_BG : C.surface, border: `2px dashed ${vs[i] > 0.5 ? "rgba(255,107,94,0.7)" : C.dim}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, opacity: fade(ef) * mix(0.45, 1, Math.min(1, vs[i] * 2)), transform: `scale(${mix(0.85, 1, Math.min(1.05, vs[i])) * (1 + 0.04 * Math.sin(t * 3 + i))}) translateY(${Math.sin(t * 2 + i) * 12}px) rotate(${Math.sin(t * 1.6 + i) * 2}deg)` }}>
              <span style={{ fontSize: 46 }}>{x.ic}</span>
              <span style={{ fontWeight: 800, fontSize: 24, color: C.text }}>{x.k}</span>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.warn, opacity: fade(vs[i]) }}>A VERIFICAR</span>
            </div>
          ))}
        </div>
        {impl > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: fade(impl), transform: `scale(${mix(0.5, 1, Math.min(1.08, impl))})` }}><Tag text="COMO OS PROJETOS SERÃO IMPLEMENTADOS?" tone="accent" size={26} /></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>QUANTIDADE <span style={{ color: C.warn }}>NÃO CONTA</span></span><br /><span style={{ whiteSpace: "nowrap" }}>A HISTÓRIA TODA</span></Title>
    </div>
  );
};

const READ = [{ k: "REGIÃO", at: "c_plan", ic: "📍" }, { k: "INFRAESTRUTURA", at: "c_plan", ic: "🔧" }, { k: "ETAPA", at: "c_fontes", ic: "🏗️" }, { k: "FONTE OFICIAL", at: "c_fontes", ic: "📄" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_atua - 0.35, { damping: 15, stiffness: 150 });
  const map = sp(t, c.c_atua - 0.2, { damping: 13, stiffness: 170 });
  const chips = READ.map((x, i) => sp(t, c[x.at] - 0.15 + (i % 2) * 0.3, { damping: 11, stiffness: 220 }));
  const no1 = sp(t, c.c_estoque - 0.2, { damping: 11, stiffness: 220 });
  const no2 = sp(t, c.c_valor - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_leia - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={4} t={t} keys={[{ t: c.c_atua - 0.35, s: 1.06, y: 0 }, { t: c.c_atua + 0.9, s: 1.12, x: 0, y: -10, e: ease.out }, { t: c.c_fontes, s: 1.07, x: -12, y: -15, e: ease.linear }, { t: c.c_estoque + 0.3, s: 1.07, x: 12, y: -25, e: ease.linear }, { t: c.c_valor + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: c.x_anuncio, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 240, top: 420 }}>
          <CityMap p={map} t={t} w={600}>
            {READ.map((x, i) => (chips[i] > 0.001 ? (
              <div key={x.k} style={{ position: "absolute", left: [30, 280, 40, 270][i], top: [40, 70, 220, 250][i], opacity: fade(chips[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, chips[i])) * (1 + 0.05 * Math.sin(t * 2.6 + i))}) translateY(${Math.sin(t * 2 + i) * 14}px) translateX(${Math.cos(t * 1.7 + i) * 8}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 16, background: C.surface, border: `2px solid ${A.hex}` }}><span style={{ fontSize: 30 }}>{x.ic}</span><span style={{ fontWeight: 800, fontSize: 24, color: C.text }}>{x.k}</span></div>
              </div>
            ) : null))}
          </CityMap>
        </div>
        <div style={{ position: "absolute", left: 90, right: 90, top: 840, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 1 - fade(fin) }}>
          {no1 > 0.001 ? <div style={{ opacity: fade(no1), transform: `scale(${mix(0.5, 1, Math.min(1.08, no1))}) translateX(${Math.sin(t * 2.4) * 10}px)` }}><Tag text="✕ HABITAÇÃO SOCIAL ≠ ESTOQUE À VENDA" tone="warn" size={28} /></div> : null}
          {no2 > 0.001 ? <div style={{ opacity: fade(no2), transform: `scale(${mix(0.5, 1, Math.min(1.08, no2))}) translateX(${Math.sin(t * 2.4 + 1.5) * 10}px)` }}><Tag text="✕ PROMETER VALORIZAÇÃO" tone="warn" size={28} /></div> : null}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 880, textAlign: "center", fontWeight: 800, fontSize: 52, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Leia a cidade,<br /><span style={{ color: A.hex }}>não só o anúncio</span></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>LEIA A CIDADE,</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>NÃO SÓ O ANÚNCIO</span></Title>
    </div>
  );
};
