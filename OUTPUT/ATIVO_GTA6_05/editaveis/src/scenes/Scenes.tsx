import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_GTA6_05 — "O comprador impossível de Vice City" (edição especial GTA VI, roteiro 05). ESTILO 5 — PAINEL (kit NOV26).
 * FICÇÃO/ESQUETE: conversa e comprador HIPOTÉTICOS; balões autorais sem marca de app; mapa genérico ILUSTRATIVO; nenhum asset do jogo.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 8) => Math.sin(t * 1.7 + k) * a;
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 56 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });

/** Balão de conversa (HTML). lado: cliente (esq, cinza) ou corretor (dir, verde). */
const Bolha: React.FC<{ p: number; lado?: "cli" | "cor"; children: React.ReactNode; tone?: "plain" | "warn"; size?: number; w?: number }> = ({ p, lado = "cli", children, tone = "plain", size = 36, w = 700 }) => {
  if (p <= 0.001) return null;
  const cor = lado === "cor";
  return (
    <div style={{ alignSelf: cor ? "flex-end" : "flex-start", maxWidth: w, padding: "20px 28px", borderRadius: 30, borderBottomLeftRadius: cor ? 30 : 8, borderBottomRightRadius: cor ? 8 : 30, background: cor ? aa(0.16) : tone === "warn" ? WARN_BG : C.surface, border: `2px solid ${cor ? G : tone === "warn" ? W : C.surface3}`, fontFamily: F.sans, fontWeight: 700, fontSize: size, lineHeight: 1.18, color: C.text, opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 40}px) scale(${mix(0.85, 1, Math.min(1, p))})`, transformOrigin: cor ? "100% 100%" : "0% 100%" }}>
      {children}
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const me = S(t, -0.2);
  const meter = prog(t, c.h_exat - 0.1, Math.max(0.8, c.h_dif - c.h_exat + 0.3), ease.inOut);
  const q = S(t, c.h_dif - 0.1);
  const vice = S(t, c.h_vice - 0.15);
  const out = prog(t, c.a_comeca - 0.45, 0.3, ease.in);
  const shake = meter > 0.95 ? Math.sin(t * 50) * 4 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={9} t={t} keys={[{ t: 0, s: 1.05, x: 3, y: -4 }, { t: c.h_exat, s: 1.08, x: -2, y: -10, e: ease.out }, { t: c.h_dif, s: 1.1, x: 0, y: -16, e: ease.out }, { t: c.a_comeca, s: 1.07, y: -18, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 470, top: 560, opacity: fade(me), transform: `translateY(${fl(t, 0)}px)` }}><Person size={140} t={t} q={q} color={C.text} /></div>
        <div style={{ position: "absolute", left: 170, right: 170, top: 800, opacity: fade(me), transform: `translateY(${fl(t, 2, 10)}px)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, marginBottom: 12, display: "flex", justifyContent: "space-between" }}><span>NÍVEL DE DIFICULDADE</span><span style={{ color: meter > 0.95 ? W : C.muted }}>{Math.round(meter * 100)}%</span></div>
          <div style={{ height: 34, borderRadius: 17, background: C.surface, border: `2px solid ${C.surface3}`, overflow: "hidden", transform: `translateX(${shake}px)` }}>
            <div style={{ width: `${meter * 100}%`, height: "100%", borderRadius: 17, background: meter > 0.7 ? W : G }} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: fade(vice) }}><Tag text="VICE CITY · COMPRADOR HIPOTÉTICO" tone="muted" size={26} /></div>
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>O COMPRADOR <span style={{ color: W }}>MAIS DIFÍCIL</span></Title>
    </div>
  );
};

const CHIPS = [{ k: "COBERTURA FRENTE MAR", at: "a_cob" }, { k: "GARAGEM: 6 CARROS", at: "a_seis" }, { k: "PISCINA ENORME", at: "a_pisc" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_comeca - 0.45, 0.3);
  const out = prog(t, c.b_cinco - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.a_comeca - 0.45, s: 1.03, y: -4 }, { t: c.a_seis, s: 1.05, x: 2, y: -10, e: ease.out }, { t: c.a_bel, s: 1.04, x: -2, y: -6, e: ease.out }, { t: c.a_tranq, s: 1.06, y: -14, e: ease.out }, { t: c.b_cinco, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, right: 110, top: 470, display: "flex", flexDirection: "column", gap: 22, transform: `translateY(${fl(t, 1, 14)}px) rotate(${Math.sin(t * 1.1) * 0.8}deg)` }}>
          <Bolha p={S(t, c.a_comeca - 0.15)}>Quero uma cobertura de frente para o mar, garagem para 6 carros e uma piscina enorme.</Bolha>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {CHIPS.map((x) => { const p = S(t, c[x.at] - 0.05); return p > 0.001 ? <div key={x.k} style={{ opacity: fade(p), transform: `scale(${mix(0.6, 1, Math.min(1.05, p))})` }}><Tag text={`✓ ${x.k}`} tone="accent" size={24} /></div> : null; })}
          </div>
          <Bolha p={S(t, c.a_bel - 0.15)} lado="cor" size={38}>Beleza!</Bolha>
          <div style={{ alignSelf: "flex-start", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, opacity: fade(S(t, c.a_seg - 0.2)) }}>2ª MENSAGEM</div>
          <Bolha p={S(t, c.a_seg)} tone={t > c.a_tranq ? "warn" : "plain"}>…mas só se for numa rua tranquila.</Bolha>
        </div>
      </Camera>
      <Title p={prog(t, c.a_comeca - 0.2, 0.25)}>ELE <span style={{ color: G }}>COMEÇA</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_cinco - 0.45, 0.3);
  const clash = S(t, c.b_sem + 0.1);
  const pause = t > c.b_manda - 0.2 && t < c.b_perm - 0.1;
  const perm = S(t, c.b_perm - 0.25);
  const peg = S(t, c.b_peg + 0.15);
  const out = prog(t, c.c_resp - 0.45, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.b_cinco - 0.45, s: 1.03, y: -4 }, { t: c.b_centro, s: 1.05, x: 2, y: -8, e: ease.out }, { t: c.b_sem, s: 1.07, x: -2, y: -12, e: ease.out }, { t: c.b_perm, s: 1.09, y: -18, e: ease.out }, { t: c.c_resp, s: 1.06, y: -20, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, right: 110, top: 470, display: "flex", flexDirection: "column", gap: 22, transform: `translateY(${fl(t, 1, 14)}px) rotate(${Math.sin(t * 1.1) * 0.8}deg)` }}>
          <div style={{ alignSelf: "center", opacity: fade(S(t, c.b_cinco - 0.3)) }}><Tag text="5 MINUTOS DEPOIS" tone="muted" size={24} /></div>
          <Bolha p={S(t, c.b_centro - 0.3)}>Preciso ficar no <b style={{ color: G }}>centro</b>, perto de tudo…</Bolha>
          <Bolha p={S(t, c.b_sem - 0.25)}>…porém <b style={{ color: W }}>sem movimento</b>.</Bolha>
          <div style={{ alignSelf: "center", opacity: fade(clash), transform: `scale(${mix(0.6, 1, Math.min(1.08, clash))}) rotate(-2deg)` }}><Tag text="✕ PEDIDOS QUE SE CONTRADIZEM" tone="warn" size={26} /></div>
          {pause ? <div style={{ alignSelf: "flex-start", fontFamily: F.sans, fontWeight: 800, fontSize: 44, color: C.muted, letterSpacing: 6 }}>{".".repeat(1 + (Math.floor(t * 4) % 3))}</div> : null}
          <Bolha p={perm} tone={peg > 0.5 ? "warn" : "plain"}>Aceita <b>permuta</b> por carro que eu peguei hoje?</Bolha>
          <div style={{ alignSelf: "flex-start", opacity: fade(peg), transform: `scale(${mix(0.6, 1, Math.min(1.08, peg))})` }}><Tag text="“PEGUEI HOJE”?!" tone="warn" size={28} /></div>
        </div>
      </Camera>
      <Title p={prog(t, c.b_cinco - 0.2, 0.25)}>E <span style={{ color: W }}>PIORA</span></Title>
    </div>
  );
};

const PINS = [{ x: 260, y: 600 }, { x: 520, y: 540 }, { x: 790, y: 620 }, { x: 330, y: 820 }, { x: 640, y: 780 }, { x: 830, y: 900 }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_resp - 0.45, 0.3);
  const mapa = prog(t, c.c_mapa - 0.3, 0.7, ease.out);
  const xs = prog(t, c.c_enc - 0.2, 1.0, ease.linear);
  const ent = S(t, c.c_ent - 0.15);
  const aberto = S(t, c.c_aberto - 0.15);
  const ph = prog(t, c.d_fim - 0.4, 0.3, ease.inOut);
  const nova = S(t, c.d_nem - 0.2);
  const ph3 = prog(t, c.e_fora - 0.4, 0.3, ease.inOut);
  const ok = S(t, c.e_anot - 0.1);
  const breath = 1 + Math.sin(t * 1.4) * 0.02 * (1 - mapa);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={9} t={t} keys={[{ t: c.c_resp - 0.45, s: 1.04, y: -4 }, { t: c.c_mapa, s: 1.04, x: 2, y: -8, e: ease.out }, { t: c.c_ent, s: 1.07, x: -2, y: -12, e: ease.out }, { t: c.d_nem, s: 1.05, x: 3, y: -10, e: ease.out }, { t: c.e_anot, s: 1.07, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph3 }}>
          <div style={{ position: "absolute", left: 470, top: 470, opacity: fade(1 - mapa) * fade(enter), transform: `scale(${breath})` }}><Person size={140} t={t} color={G} /></div>
          <div style={{ position: "absolute", left: 140, top: 480, width: 800, height: 560, borderRadius: 28, background: C.surface, border: `2px solid ${C.surface3}`, opacity: fade(mapa), overflow: "visible", transform: `rotate(${Math.sin(t * 0.9) * 1.2}deg) translateY(${fl(t, 3, 10)}px)` }}>
            <svg width={800} height={560} style={{ position: "absolute", inset: 0 }}>
              {[140, 280, 420].map((y) => <line key={y} x1={0} y1={y} x2={800} y2={y + 20} stroke={C.surface3} strokeWidth={14} />)}
              {[200, 420, 620].map((x) => <line key={x} x1={x} y1={0} x2={x - 30} y2={560} stroke={C.surface3} strokeWidth={14} />)}
            </svg>
            <div style={{ position: "absolute", left: 20, top: 16, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>MAPA ILUSTRATIVO</div>
          </div>
          {PINS.map((p, i) => {
            const a = prog(mapa, i * 0.08, 0.4);
            const x = prog(xs, i * 0.14, 0.2) > 0.5;
            return (
              <div key={i} style={{ position: "absolute", left: p.x - 26, top: p.y - 26 + fl(t, i, 8), width: 52, height: 52, borderRadius: 26, background: x ? WARN_BG : aa(0.2), border: `3px solid ${x ? W : G}`, display: "flex", alignItems: "center", justifyContent: "center", color: x ? W : G, fontWeight: 800, fontSize: 28, opacity: fade(a) * (1 - ph * 0.3) }}>{x ? "✕" : "●"}</div>
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", gap: 14, opacity: fade(ent) * (1 - ph) }}>
            <Tag text="✕ ENCONTRAR IMÓVEL" tone="muted" size={26} /><Tag text="✓ ENTENDER O PEDIDO" tone="accent" size={26} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 1140, display: "flex", justifyContent: "center", opacity: fade(aberto) * (1 - ph) }}><Tag text="MUNDO ABERTO" tone="muted" size={24} /></div>
          <div style={{ position: "absolute", left: 870, top: 1010, opacity: fade(nova), transform: `scale(${mix(0.4, 1, Math.min(1.08, nova))}) translateY(${fl(t, 2, 6)}px)` }}>
            <div style={{ width: 84, height: 84, borderRadius: 42, border: `4px dashed ${G}`, background: aa(0.14), display: "flex", alignItems: "center", justifyContent: "center", color: G, fontWeight: 800, fontSize: 46, boxShadow: `0 0 40px ${aa(0.35)}` }}>?</div>
          </div>
          <div style={{ position: "absolute", left: 140, right: 140, top: 1110, display: "flex", justifyContent: "center", opacity: fade(nova) }}><Tag text="✓ APROVADA: NEM APARECEU NO MAPA" tone="accent" size={26} /></div>
        </div>
        <div style={{ position: "absolute", left: 150, right: 150, top: 500, opacity: ph3, padding: 36, borderRadius: 30, background: C.surface, border: `2px solid ${ok > 0.5 ? G : C.surface3}`, transform: `translateY(${(1 - ph3) * 40 + fl(t, 4, 12)}px) rotate(${Math.sin(t * 1.2) * 0.8}deg)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: G, marginBottom: 22 }}>PEDIDO DO CLIENTE</div>
          {["Cobertura · frente mar", "6 vagas · piscina", "Rua tranquila × centro", "Permuta: a verificar"].map((k, i) => (
            <div key={k} style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 38, color: i >= 2 ? C.muted : C.text, padding: "12px 0", borderTop: i ? `1px solid ${C.surface3}` : "none", opacity: fade(prog(t, c.e_fora - 0.1 + i * 0.25, 0.4)) }}>{k}</div>
          ))}
          <div style={{ marginTop: 18, opacity: fade(ok), transform: `scale(${mix(0.6, 1, Math.min(1.08, ok))})`, transformOrigin: "0% 50%" }}><Tag text="✓ ANOTADO" tone="accent" size={28} /></div>
        </div>
      </Camera>
      <Title p={prog(t, c.c_resp - 0.2, 0.25) * (1 - prog(t, c.e_fora - 0.5, 0.15))}>O PROBLEMA É <span style={{ color: G }}>ENTENDER</span></Title>
      <Title p={prog(t, c.e_fora - 0.3, 0.25)}>FORA DO JOGO: <span style={{ color: G }}>ANOTE</span></Title>
    </div>
  );
};
