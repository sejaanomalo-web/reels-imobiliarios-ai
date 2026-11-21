import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_L60_02 — "Um imóvel, quatro planilhas" (livro, Dia 03 / EP021). ESTILO 5 — PAINEL (kit NOV26).
 * Planilhas genéricas (sem marca de software), apartamento FICTÍCIO sem endereço, valores ILUSTRATIVOS.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.6 + k * 1.3) * a;
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 56 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });

const POS = [{ x: 110, y: 480 }, { x: 560, y: 480 }, { x: 110, y: 820 }, { x: 560, y: 820 }];
const ROWS = ["VALOR", "FOTO", "STATUS", "NOTA"];
/** Valor de cada linha por planilha (a "verdade" está espalhada). */
const VAL = [
  ["antigo", "velha", "?", "—"],
  ["?", "nova", "?", "—"],
  ["?", "velha", "disponível", "—"],
  ["?", "velha", "?", "proprietário…"],
];

const Planilha: React.FC<{ i: number; p: number; hi: number; warn?: number; ok?: number; t: number }> = ({ i, p, hi, warn = 0, ok = 0, t }) => (
  <div style={{ position: "absolute", left: POS[i].x, top: POS[i].y + fl(t, i), width: 410, height: 300, borderRadius: 22, background: C.surface, border: `2px solid ${ok > 0.5 ? G : warn > 0.5 ? W : hi > 0.5 ? G : C.surface3}`, padding: "18px 22px", boxSizing: "border-box", opacity: fade(p), transform: `scale(${mix(0.7, 1, Math.min(1, p))}) rotate(${Math.sin(t * 1.1 + i) * 1.4}deg)`, fontFamily: F.sans }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginBottom: 10 }}><span>PLANILHA {i + 1}</span><span>APTO 2Q</span></div>
    {ROWS.map((r, k) => {
      const on = k === i && hi > 0.5;
      return (
        <div key={r} style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px", borderRadius: 10, marginTop: 4, background: on ? aa(0.16) : "transparent", fontSize: 28, fontWeight: 700, color: on ? C.text : C.dim }}>
          <span style={{ fontFamily: F.mono, fontSize: 24, color: on ? G : C.dim }}>{r}</span><span>{VAL[i][k]}</span>
        </div>
      );
    })}
    {warn > 0.01 ? <div style={{ position: "absolute", right: -14, top: -18, opacity: fade(warn), transform: `scale(${mix(0.5, 1, Math.min(1.1, warn))})` }}><Tag text="DESATUALIZADA" tone="warn" size={22} /></div> : null}
    {ok > 0.01 ? <div style={{ position: "absolute", right: -14, top: -18, opacity: fade(ok) }}><Tag text="✓ ATUALIZADA" tone="accent" size={22} /></div> : null}
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const one = S(t, -0.1);
  const many = prog(t, c.h_quatro - 0.3, 0.8, ease.out);
  const q = S(t, c.h_certa - 0.15);
  const out = prog(t, c.a_prim - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.08, x: 0, y: -20 }, { t: c.h_quatro, s: 1.04, x: 2, y: -8, e: ease.out }, { t: c.h_certa, s: 1.06, x: -2, y: -12, e: ease.out }, { t: c.a_prim, s: 1.04, y: -14, e: ease.linear }]}>
        {POS.map((_, i) => {
          const p = i === 0 ? one : prog(many, (i - 1) * 0.2, 0.5);
          const off = 1 - many;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, transform: `translate(${mix(0, 335 - POS[i].x, off)}px, ${mix(0, 650 - POS[i].y, off)}px)` }}>
              <Planilha i={i} p={p} hi={0} t={t} />
            </div>
          );
        })}
        {POS.map((p0, i) => (
          <div key={"q" + i} style={{ position: "absolute", left: p0.x + 175, top: p0.y + 110, width: 60, height: 60, borderRadius: 30, background: W, color: "#fff", fontWeight: 800, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center", opacity: fade(prog(q, i * 0.15, 0.4)), transform: `scale(${mix(0.3, 1, Math.min(1.1, prog(q, i * 0.15, 0.4)))}) rotate(${Math.sin(t * 3 + i) * 10}deg)` }}>?</div>
        ))}
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>QUAL DELAS ESTÁ <span style={{ color: G }}>CERTA?</span></Title>
    </div>
  );
};

const CUE_I = ["a_prim", "a_seg", "a_terc", "a_quarta"];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_prim - 0.4, 0.3);
  const out = prog(t, c.b_falta - 0.4, 0.3, ease.in);
  const cur = CUE_I.reduce((a, k, i) => (t >= c[k] - 0.2 ? i : a), -1);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_prim - 0.4, s: 1.04, y: -6 }, { t: c.a_prim, s: 1.07, x: 6, y: -6, e: ease.out }, { t: c.a_seg, s: 1.07, x: -6, y: -6, e: ease.out }, { t: c.a_terc, s: 1.07, x: 6, y: -20, e: ease.out }, { t: c.a_quarta, s: 1.07, x: -6, y: -20, e: ease.out }, { t: c.b_falta, s: 1.04, y: -14, e: ease.linear }]}>
        {POS.map((_, i) => (
          <div key={i} style={{ opacity: cur === i ? 1 : 0.55 }}>
            <Planilha i={i} p={1} hi={t >= c[CUE_I[i]] - 0.2 ? 1 : 0} t={t} />
          </div>
        ))}
      </Camera>
      <Title p={prog(t, c.a_prim - 0.2, 0.25)}>CADA UMA SABE <span style={{ color: G }}>UMA COISA</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_falta - 0.4, 0.3);
  const esf = S(t, c.b_esf - 0.1);
  const upd = S(t, c.b_atual - 0.1);
  const out = prog(t, c.c_def - 0.4, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_falta - 0.4, s: 1.04, y: -8 }, { t: c.b_atual, s: 1.06, x: 4, y: -6, e: ease.out }, { t: c.b_esq, s: 1.07, x: -3, y: -16, e: ease.out }, { t: c.c_def, s: 1.04, y: -14, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: fade(esf) * (1 - fade(upd)) }}><Tag text="✓ ESFORÇO NÃO FALTOU" tone="muted" size={26} /></div>
        {POS.map((_, i) => {
          const w = i === 0 ? 0 : prog(t, c.b_lug - 0.2 + (i - 1) * 0.35, 0.4, ease.out);
          return <Planilha key={i} i={i} p={1} hi={0} ok={i === 0 ? upd : 0} warn={w} t={t} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: fade(S(t, c.b_esq - 0.1)) }}><Tag text="ATUALIZOU 1 · ESQUECEU 3" tone="warn" size={28} /></div>
      </Camera>
      <Title p={prog(t, c.b_falta - 0.2, 0.25)}>NÃO É <span style={{ color: W }}>FALTA DE ESFORÇO</span></Title>
    </div>
  );
};

const CAMPOS = [{ k: "PREÇO", v: "conferido", at: "d_preco" }, { k: "STATUS", v: "disponível", at: "d_status" }, { k: "CARACTERÍSTICAS", v: "2 quartos · 1 vaga", at: "d_carac" }, { k: "MATERIAL", v: "fotos · planta · vídeo", at: "d_mat" }, { k: "ÚLTIMA CONFERÊNCIA", v: "hoje", at: "d_conf" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_def - 0.4, 0.3);
  const merge = prog(t, c.c_def - 0.2, 0.9, ease.inOut);
  const card = S(t, c.c_cad - 0.15);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_def - 0.4, s: 1.04, y: -8 }, { t: c.c_cad, s: 1.07, y: -12, e: ease.out }, { t: c.d_carac, s: 1.05, x: 2, y: -16, e: ease.out }, { t: c.d_conf, s: 1.07, x: -2, y: -20, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -20, e: ease.linear }]}>
        {merge < 0.99 ? POS.map((p0, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: 1 - merge, transform: `translate(${mix(0, 335 - p0.x, merge)}px, ${mix(0, 620 - p0.y, merge)}px) scale(${mix(1, 0.6, merge)})` }}>
            <Planilha i={i} p={1} hi={0} t={t} />
          </div>
        )) : null}
        <div style={{ position: "absolute", left: 130, right: 130, top: 470 + fl(t, 5, 8), padding: "30px 34px", borderRadius: 30, background: C.surface, border: `2px solid ${G}`, boxShadow: `0 0 60px ${aa(0.18)}`, opacity: fade(card), transform: `scale(${mix(0.8, 1, Math.min(1, card))}) rotate(${Math.sin(t * 1.1) * 0.6}deg)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: G }}>CADASTRO PRINCIPAL</span>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>APTO 2Q · ILUSTRATIVO</span>
          </div>
          {CAMPOS.map((f, i) => {
            const p = S(t, c[f.at] - 0.15);
            return (
              <div key={f.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 4px", borderTop: `1px solid ${C.surface3}`, opacity: 0.35 + 0.65 * fade(p) }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: p > 0.5 ? G : C.dim }}>{p > 0.5 ? "✓ " : "· "}{f.k}</span>
                <span style={{ fontWeight: 700, fontSize: 30, color: C.text, opacity: fade(p) }}>{f.v}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: fade(S(t, c.c_cada - 0.1)) }}><Tag text="1 IMÓVEL = 1 CADASTRO" tone="accent" size={28} /></div>
      </Camera>
      <Title p={prog(t, c.c_def - 0.2, 0.25)}>UM <span style={{ color: G }}>CADASTRO PRINCIPAL</span></Title>
    </div>
  );
};

export const _w = WARN_BG;
