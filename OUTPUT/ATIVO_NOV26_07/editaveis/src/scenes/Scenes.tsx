import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconCalc, IconDoc, IconHome, Msg, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_07 — "O desconto não é o vilão". Dado: Raio-X FipeZAP 3º tri 2026 — 67% das transações residenciais relatadas pelos
 * respondentes (758 usuários de portais) tiveram algum desconto sobre o preço anunciado. Recorte na tela; sem valores de proposta,
 * sem desconto médio, sem extrapolar para cidades. Proprietários = EXEMPLO HIPOTÉTICO. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

const Waffle: React.FC<{ n: number; cell: number; gap: number; dim?: number }> = ({ n, cell, gap, dim = 1 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(10, ${cell}px)`, gap, opacity: dim }}>
    {Array.from({ length: 100 }).map((_, i) => <div key={i} style={{ width: cell, height: cell, borderRadius: cell * 0.25, background: i < n ? A.hex : C.surface3, boxShadow: i < n ? `0 0 10px ${aa(0.25)}` : "none" }} />)}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const big = sp(t, -0.15, { damping: 12, stiffness: 150 });
  const fill = prog(t, c.h_67 + 0.1, 1.6, ease.inOut);
  const src = prog(t, c.h_pesq - 0.1, 0.4, ease.out);
  const chat = sp(t, c.h_corr - 0.2, { damping: 12, stiffness: 190 });
  const reac = sp(t, c.h_ofensa - 0.15, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_imag - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_pesq)) / 2 + 0, s: 1.150, x: 19, y: -18, e: ease.inOut }, { t: c.h_pesq, s: 1.06, x: 10, y: -10, e: ease.inOut }, { t: ((c.h_pesq) + (c.h_corr)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.h_corr, s: 1.08, x: -10, y: -40, e: ease.inOut }, { t: ((c.h_corr) + (c.h_ofensa + 0.2)) / 2 + 0, s: 1.150, x: 9, y: -18, e: ease.inOut }, { t: c.h_ofensa + 0.2, s: 1.12, x: 0, y: -60, e: ease.inOut }, { t: c.a_imag, s: 1.1, x: 0, y: -50, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", opacity: mix(0.75, 1, Math.min(1, big * 2)), transform: `scale(${mix(0.9, 1, Math.min(1.04, big))})` }}>
          <div style={{ fontWeight: 800, fontSize: 200, lineHeight: 0.9, letterSpacing: "-0.06em", color: C.text, textShadow: `0 0 60px ${aa(0.25)}` }}>67<span style={{ color: A.hex }}>%</span></div>
          <div style={{ marginTop: 6, fontFamily: F.mono, fontWeight: 700, fontSize: 38, letterSpacing: "0.1em", color: A.hex }}>COM DESCONTO</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center", transform: `scale(${mix(1, 0.86, prog(t, c.h_corr - 0.2, 0.5, ease.inOut))})` }}>
          <Waffle n={Math.round(67 * fill)} cell={30} gap={7} dim={mix(1, 0.3, prog(t, c.h_corr - 0.2, 0.5, ease.inOut))} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1075, display: "flex", justifyContent: "center", opacity: src }}><Tag text="AMOSTRA PESQUISADA · RAIO-X FIPEZAP 3º TRI 2026" tone="muted" size={24} /></div>
        {chat > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 760, display: "flex", flexDirection: "column", gap: 22, opacity: fade(chat), transform: `translateY(${(1 - Math.min(1, chat)) * 60}px)` }}>
            <div><Msg side="in" size={36}>Chegou uma proposta abaixo do anúncio.</Msg></div>
            {reac > 0.001 ? <div style={{ display: "flex", justifyContent: "flex-end", opacity: fade(reac), transform: `scale(${mix(0.5, 1, Math.min(1.08, reac))})`, transformOrigin: "100% 50%" }}><Msg side="out" tone="warn" size={40}>Que ofensa! Nem respondo.</Msg></div> : null}
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={56}>O DESCONTO <span style={{ color: C.warn }}>É O VILÃO?</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_imag - 0.35, { damping: 15, stiffness: 150 });
  const pa = sp(t, c.a_dois - 0.2, { damping: 13, stiffness: 180 });
  const pb = sp(t, c.a_dois + 0.15, { damping: 13, stiffness: 180 });
  const stamp = sp(t, c.a_par - 0.1, { damping: 10, stiffness: 240 });
  const prop = sp(t, c.a_prop - 0.15, { damping: 12, stiffness: 200 });
  const rec = sp(t, c.a_recusa - 0.1, { damping: 11, stiffness: 220 });
  const other = prog(t, c.a_outro - 0.1, 0.4, ease.out);
  const dados = sp(t, c.a_dados - 0.15, { damping: 12, stiffness: 210 });
  const cond = sp(t, c.a_cond - 0.15, { damping: 12, stiffness: 210 });
  const out = prog(t, c.b_lev - 0.4, 0.35, ease.in);
  const Panel: React.FC<{ x: number; p: number; k: string; hi: number; warn: number; children?: React.ReactNode }> = ({ x, p, k, hi, warn, children }) => (
    <div style={{ position: "absolute", left: x, top: 480, width: 430, height: 560, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `3px solid ${warn > 0.5 ? "rgba(255,107,94,0.7)" : hi > 0.5 ? A.hex : C.line}`, padding: "28px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 90}px)` }}>
      <div style={{ flex: "none", height: 96 }}><IconHome size={96} color={C.text} /></div>
      <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{k}</span>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>APTO PARECIDO</span>
      {prop > 0.001 ? <div style={{ marginTop: 6, padding: "12px 18px", borderRadius: 18, background: C.surface2, border: `2px solid ${C.dim}`, fontWeight: 700, fontSize: 26, color: C.text, textAlign: "center", opacity: fade(prop), transform: `translateY(${(1 - Math.min(1, prop)) * -80}px)` }}>PROPOSTA ABAIXO<br />DO ANÚNCIO</div> : null}
      {children}
    </div>
  );
  const Res: React.FC<{ p: number; ok: boolean; children: React.ReactNode }> = ({ p, ok, children }) => (p > 0.001 ? (
    <div style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 18, background: ok ? aa(0.1) : WARN_BG, border: `2px solid ${ok ? A.hex : "rgba(255,107,94,0.6)"}`, display: "flex", alignItems: "center", gap: 12, opacity: fade(p), transform: `scale(${mix(0.6, 1, Math.min(1.06, p))})` }}>
      <span style={{ fontWeight: 800, fontSize: 34, color: ok ? A.hex : C.warn }}>{ok ? "✓" : "✕"}</span>
      <span style={{ fontWeight: 800, fontSize: 26, lineHeight: 1.08, color: C.text }}>{children}</span>
    </div>
  ) : null);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_imag - 0.35, s: 1.05, y: 0 }, { t: ((c.a_imag - 0.35) + (c.a_par + 0.2)) / 2 + 0, s: 1.080, x: 14, y: -18, e: ease.inOut }, { t: c.a_par + 0.2, s: 1.04, x: 0, y: -10, e: ease.inOut }, { t: ((c.a_par + 0.2) + (c.a_prop + 0.2)) / 2 + 0, s: 1.100, x: -14, y: -18, e: ease.inOut }, { t: c.a_prop + 0.2, s: 1.07, x: 0, y: -15, e: ease.inOut }, { t: ((c.a_prop + 0.2) + (c.a_recusa + 0.2)) / 2 + 0, s: 1.130, x: 25, y: -18, e: ease.inOut }, { t: c.a_recusa + 0.2, s: 1.1, x: 22, y: -25, e: ease.inOut }, { t: ((c.a_recusa + 0.2) + (c.a_dados + 0.2)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.a_dados + 0.2, s: 1.1, x: -22, y: -25, e: ease.inOut }, { t: c.b_lev, s: 1.05, y: -15, e: ease.linear }]}>
        <Panel x={90} p={pa} k="PROPRIETÁRIO A" hi={0} warn={rec}>
          <Res p={rec} ok={false}>RECUSA ANTES DE CONVERSAR</Res>
        </Panel>
        <Panel x={560} p={pb} k="PROPRIETÁRIO B" hi={other} warn={0}>
          <Res p={dados} ok>PEDE DADOS</Res>
          <Res p={cond} ok>ENTENDE AS CONDIÇÕES</Res>
        </Panel>
        {stamp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(stamp), transform: `scale(${mix(1.8, 1, Math.min(1, stamp))}) rotate(-4deg)` }}><Tag text="EXEMPLO HIPOTÉTICO" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={44}>MESMA PROPOSTA, <span style={{ color: A.hex }}>REAÇÕES DIFERENTES</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_lev - 0.35, { damping: 15, stiffness: 150 });
  const ring = prog(t, c.b_lev, 1.2, ease.inOut);
  const abaixo = sp(t, c.b_abaixo - 0.15, { damping: 12, stiffness: 200 });
  const head = sp(t, c.b_nao - 0.2, { damping: 12, stiffness: 200 });
  const igual = sp(t, c.b_igual - 0.25, { damping: 11, stiffness: 210 });
  const qual = sp(t, c.b_qual - 0.2, { damping: 11, stiffness: 210 });
  const out = prog(t, c.c_papel - 0.4, 0.35, ease.in);
  const R = 170, L = 2 * Math.PI * R;
  const No: React.FC<{ p: number; top: number; children: React.ReactNode }> = ({ p, top, children }) => (p > 0.001 ? (
    <div style={{ position: "absolute", left: 130, right: 130, top, boxSizing: "border-box", padding: "16px 22px", borderRadius: 22, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", display: "flex", alignItems: "center", gap: 16, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * 120 + Math.sin(t * 2 + top) * 4}px)` }}>
      <span style={{ fontWeight: 800, fontSize: 38, color: C.warn }}>✕</span>
      <span style={{ fontWeight: 800, fontSize: 32, lineHeight: 1.08, color: C.text }}>{children}</span>
    </div>
  ) : null);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_lev - 0.35, s: 1.05, y: 0 }, { t: ((c.b_lev - 0.35) + (c.b_abaixo)) / 2 + 0, s: 1.130, x: 14, y: -18, e: ease.inOut }, { t: c.b_abaixo, s: 1.1, x: 0, y: 10, e: ease.inOut }, { t: ((c.b_abaixo) + (c.b_nao + 0.2)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.b_nao + 0.2, s: 1.04, x: 0, y: -20, e: ease.inOut }, { t: ((c.b_nao + 0.2) + (c.b_igual + 0.2)) / 2 + 0, s: 1.110, x: 20, y: -18, e: ease.inOut }, { t: c.b_igual + 0.2, s: 1.08, x: 12, y: -40, e: ease.inOut }, { t: ((c.b_igual + 0.2) + (c.b_qual + 0.2)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.b_qual + 0.2, s: 1.08, x: -12, y: -50, e: ease.inOut }, { t: c.c_papel, s: 1.05, y: -30, e: ease.linear }]}>
        <svg width={400} height={400} style={{ position: "absolute", left: 340, top: 440 }}>
          <circle cx={200} cy={200} r={R} stroke={C.surface3} strokeWidth={34} fill="none" />
          <circle cx={200} cy={200} r={R} stroke={A.hex} strokeWidth={34} fill="none" strokeDasharray={`${L * 0.67 * ring} ${L}`} transform="rotate(-90 200 200)" style={{ filter: `drop-shadow(0 0 12px ${aa(0.4)})` }} />
        </svg>
        <div style={{ position: "absolute", left: 340, top: 440, width: 400, height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 104, letterSpacing: "-0.05em", color: C.text, opacity: fade((ring - 0.85) * 6) }}>67%</span>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: A.hex, textAlign: "center", opacity: fade(abaixo) }}>ABAIXO DO<br />VALOR PEDIDO</span>
        </div>
        <div style={{ position: "absolute", left: 90, right: 90, top: 860, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, opacity: fade(ring) }}>AMOSTRA PESQUISADA · NÃO REPRESENTA TODAS AS VENDAS</div>
        {head > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 920, textAlign: "center", fontWeight: 800, fontSize: 30, color: C.muted, opacity: fade(head) }}>ISSO <span style={{ color: C.text }}>NÃO</span> SIGNIFICA:</div> : null}
        <No p={igual} top={980}>DESCONTO IGUAL PARA TODO IMÓVEL</No>
        <No p={qual} top={1090}>ACEITAR QUALQUER OFERTA</No>
      </Camera>
      <Title p={enter} size={54}>DESCONTO <span style={{ color: A.hex }}>NÃO É REGRA FIXA</span></Title>
    </div>
  );
};

const Stopwatch: React.FC<{ size: number; t: number }> = ({ size, t }) => {
  const a = t * 2.4 - Math.PI / 2;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={55} r={38} stroke={C.text} strokeWidth={6} fill="none" />
      <rect x={42} y={6} width={16} height={8} rx={2} fill={C.text} />
      <line x1={50} y1={55} x2={50 + Math.cos(a) * 28} y2={55 + Math.sin(a) * 28} stroke={A.hex} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

const TILES = [
  { k: "COMPARÁVEIS", s: "preço de imóveis parecidos", at: "c_comp" },
  { k: "TEMPO ANUNCIADO", s: "tempo de exposição", at: "c_tempo" },
  { k: "CONDIÇÃO DO BEM", s: "estado do imóvel", at: "c_condb" },
  { k: "CAPACIDADE REAL", s: "da proposta", at: "c_cap" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_papel - 0.35, { damping: 15, stiffness: 150 });
  const tiles = TILES.map((x) => sp(t, c[x.at] - 0.15, { damping: 12, stiffness: 210 }));
  const conv = prog(t, c.c_org - 0.3, 0.7, ease.inOut);
  const ficha = sp(t, c.c_org - 0.1, { damping: 13, stiffness: 190 });
  const forc = sp(t, c.c_forcar - 0.1, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_ctx - 0.6, { damping: 13, stiffness: 180 });
  const ctx0 = sp(t, c.c_ctx - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const icon = (i: number) => (i === 0 ? <IconHome size={60} color={C.text} /> : i === 1 ? <Stopwatch size={64} t={t} /> : i === 2 ? <IconDoc size={60} /> : <IconCalc size={60} />);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_papel - 0.35, s: 1.05, y: 0 }, { t: ((c.c_papel - 0.35) + (c.c_comp + 0.2)) / 2 + 0, s: 1.120, x: 23, y: -18, e: ease.inOut }, { t: c.c_comp + 0.2, s: 1.09, x: 18, y: -10, e: ease.inOut }, { t: ((c.c_comp + 0.2) + (c.c_tempo + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_tempo + 0.2, s: 1.09, x: -18, y: -10, e: ease.inOut }, { t: ((c.c_tempo + 0.2) + (c.c_condb + 0.2)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.c_condb + 0.2, s: 1.09, x: 18, y: -20, e: ease.inOut }, { t: ((c.c_condb + 0.2) + (c.c_cap + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_cap + 0.2, s: 1.09, x: -18, y: -20, e: ease.inOut }, { t: ((c.c_cap + 0.2) + (c.c_org + 0.4)) / 2 + 0, s: 1.120, x: 5, y: -18, e: ease.inOut }, { t: c.c_org + 0.4, s: 1.04, x: 0, y: -40, e: ease.inOut }, { t: ((c.c_org + 0.4) + (c.x_ctx)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.x_ctx, s: 1.09, x: 0, y: -50, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {ctx0 > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: fade(ctx0) }}><Tag text="CONTEXTUALIZAR A PROPOSTA" tone="accent" size={26} /></div> : null}
        {TILES.map((x, i) => {
          const p = tiles[i];
          const col = i % 2, row = Math.floor(i / 2);
          const x0 = 90 + col * 460, y0 = 480 + row * 200;
          return (
            <React.Fragment key={x.k}>
              <div style={{ position: "absolute", left: x0, top: y0, width: 440, height: 180, boxSizing: "border-box", borderRadius: 26, border: `2px dashed ${C.dim}`, opacity: 0.6 * (1 - Math.min(1, p * 2)) * fade(enter) }} />
              {p > 0.001 ? (
                <div style={{ position: "absolute", left: x0, top: y0, width: 440, height: 180, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${conv > 0.5 ? A.hex : C.line}`, padding: "0 22px", display: "flex", alignItems: "center", gap: 18, opacity: fade(p) * mix(1, 0.55, conv), transform: `translateY(${(1 - Math.min(1, p)) * 60 + conv * 30}px) scale(${mix(1, 0.94, conv)})` }}>
                  <div style={{ flex: "none" }}>{icon(i)}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 31, lineHeight: 1.05, color: C.text }}>{x.k}</span>
                    <span style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{x.s}</span>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
        {ficha > 0.001 ? (
          <div style={{ position: "absolute", left: 150, right: 150, top: 900, boxSizing: "border-box", padding: "18px 24px", borderRadius: 28, background: aa(0.08), border: `2px solid ${A.hex}`, opacity: fade(ficha), transform: `translateY(${(1 - Math.min(1, ficha)) * 80}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>FICHA DA PROPOSTA</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 14 }}>
              {[0, 1, 2, 3].map((i) => <CheckDot key={i} p={prog(t, c.c_org + i * 0.12, 0.3, ease.out)} size={52} />)}
              <span style={{ marginLeft: 8, alignSelf: "center", fontWeight: 700, fontSize: 28, color: A.hex }}>argumentos organizados</span>
            </div>
          </div>
        ) : null}
        {forc > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", opacity: fade(forc) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, forc))})` }}><Tag text="✕ FORÇAR UMA RESPOSTA" tone="warn" size={28} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1100, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Leve <span style={{ color: A.hex }}>contexto</span> para a conversa</div> : null}
      </Camera>
      <Title p={enter} size={56}>NEGOCIAÇÃO <span style={{ color: A.hex }}>= CONTEXTO</span></Title>
    </div>
  );
};
