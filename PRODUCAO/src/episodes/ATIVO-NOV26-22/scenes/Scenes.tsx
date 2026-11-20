import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_22 — "Leilão: desconto não é lucro". Santander/Biasi Leilões: 195 imóveis em 20 estados, leilão online em 17/11/2026
 * (evento PASSADO; não divulgado como oportunidade disponível). Cartaz e valores FICTÍCIOS; sem percentuais de comissão/impostos;
 * não afirma que leilão é seguro. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 10) => Math.sin(t * 1.7 + k) * a;

const Gavel: React.FC<{ size: number; hit: number }> = ({ size, hit }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${-35 + hit * 35}deg)`, transformOrigin: "80% 80%" }}>
    <rect x={20} y={14} width={44} height={22} rx={6} fill={C.text} transform="rotate(-45 42 25)" />
    <rect x={44} y={34} width={10} height={56} rx={4} fill={C.muted} transform="rotate(-45 49 62)" />
  </svg>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const pos = sp(t, c.h_leilao - 0.3, { damping: 12, stiffness: 180 });
  const hit = Math.max(0, Math.sin(Math.min(1, prog(t, c.h_leilao, 0.35, ease.out)) * Math.PI));
  const many = prog(t, c.h_200 - 0.3, 1.0, ease.out);
  const tag = sp(t, c.h_nov - 0.2, { damping: 12, stiffness: 200 });
  const cheap = sp(t, c.h_barato - 0.2, { damping: 11, stiffness: 220 });
  const bill = prog(t, c.h_conta - 0.2, 0.9, ease.out);
  const out = prog(t, c.a_quando - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.08, x: 10, y: -8 }, { t: 1.0, s: 1.15, x: -10, y: -18, e: ease.out }, { t: c.h_nov, s: 1.1, x: 10, y: -22, e: ease.linear }, { t: c.h_conta + 0.3, s: 1.06, x: -4, y: -30, e: ease.linear }, { t: c.a_quando, s: 1.08, y: -34, e: ease.linear }]}>
        {/* grade de lotes */}
        <div style={{ position: "absolute", left: 150, right: 150, top: 450, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, opacity: fade(pos) * mix(1, 0.4, Math.min(1, cheap)) }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ height: 78, borderRadius: 12, background: C.surface, border: `2px solid ${C.surface3}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${Math.min(1, Math.max(0, many * 24 - i))}) translateY(${Math.sin(t * 2.5 + i) * 5}px)` }}><IconHome size={36} color={C.muted} /></div>
          ))}
        </div>
        <div style={{ position: "absolute", right: 120, top: 380, opacity: fade(pos) }}><Gavel size={120} hit={hit} /></div>
        {tag > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 840, display: "flex", justifyContent: "center", gap: 12, opacity: fade(tag) * (1 - fade(cheap)) }}><Tag text="195 IMÓVEIS · 20 ESTADOS" tone="muted" size={26} /><Tag text="REALIZADO EM 17/11" tone="muted" size={26} /></div> : null}
        {cheap > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ padding: "14px 28px", borderRadius: 20, background: aa(0.1), border: `2px solid ${A.hex}`, opacity: fade(cheap), transform: `scale(${mix(0.5, 1, Math.min(1.08, cheap))}) rotate(${Math.sin(t * 2) * 2}deg)`, zIndex: 2 }}>
              <span style={{ fontWeight: 800, fontSize: 40, color: A.hex }}>LANCE “BARATO”</span>
            </div>
            <div style={{ width: 520, height: mix(0, 230, bill), overflow: "hidden", marginTop: -6, borderRadius: "0 0 22px 22px", background: WARN_BG, border: bill > 0.02 ? "2px dashed rgba(255,107,94,0.7)" : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 18, boxSizing: "border-box" }}>
              <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>A CONTA</span>
              <span style={{ fontWeight: 800, fontSize: 52, color: C.warn, transform: `translateY(${Math.sin(t * 4) * 4}px)` }}>BEM MAIOR ↓</span>
            </div>
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={56}><span style={{ whiteSpace: "nowrap" }}>LEILÃO <span style={{ color: C.warn }}>NÃO É</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>ATALHO</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_quando - 0.35, { damping: 15, stiffness: 150 });
  const post = sp(t, c.a_quando - 0.15, { damping: 13, stiffness: 180 });
  const pr = sp(t, c.a_preco - 0.15, { damping: 11, stiffness: 220 });
  const ab = sp(t, c.a_abaixo - 0.15, { damping: 11, stiffness: 220 });
  const mg = sp(t, c.a_margem - 0.2, { damping: 11, stiffness: 220 });
  const x = sp(t, c.a_so - 0.1, { damping: 10, stiffness: 240 });
  const fine = prog(t, c.a_comum - 0.2, Math.max(0.8, c.a_lote - c.a_comum + 0.4), ease.out);
  const out = prog(t, c.b_edital - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.a_quando - 0.35, s: 1.06, y: 0 }, { t: c.a_quando + 0.8, s: 1.1, x: -10, y: -10, e: ease.out }, { t: c.a_margem, s: 1.07, x: 10, y: -16, e: ease.linear }, { t: c.a_comum, s: 1.12, x: 0, y: -60, e: ease.out }, { t: c.b_edital, s: 1.1, y: -64, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 170, right: 170, top: 460, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `3px solid ${C.text}`, padding: "26px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: fade(post), transform: `translateY(${(1 - Math.min(1, post)) * 60 + fl(t, 0)}px) rotate(${-2 + Math.sin(t * 1.2) * 1.5}deg)` }}>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>LOTE 000</span><Tag text="FICTÍCIO" tone="muted" size={24} /></div>
          <span style={{ fontWeight: 800, fontSize: 74, color: C.text, letterSpacing: "0.04em" }}>LEILÃO</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, opacity: fade(pr), transform: `scale(${mix(0.6, 1, Math.min(1.05, pr))})` }}><span style={{ fontWeight: 800, fontSize: 28, color: C.muted }}>LANCE INICIAL</span><span style={{ fontWeight: 800, fontSize: 52, color: A.hex }}>R$ ●●●.●●●</span></div>
          {ab > 0.001 ? <div style={{ opacity: fade(ab) * (1 - fade(fine)) }}><Tag text="↓ MUITO ABAIXO DO MERCADO" tone="accent" size={26} /></div> : null}
          <div style={{ width: "100%", marginTop: 10, fontFamily: F.mono, fontWeight: 700, fontSize: mix(14, 26, fine), lineHeight: 1.35, color: fine > 0.3 ? C.warn : C.dim, textAlign: "left", background: fine > 0.3 ? WARN_BG : "transparent", borderRadius: 12, padding: fine > 0.3 ? "10px 14px" : 0, boxSizing: "border-box" }}>
            * Condições variam de lote para lote.<br />* Consulte o edital antes do lance.
          </div>
        </div>
        {mg > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: fade(mg) * (1 - fade(fine)) }}>
            <div style={{ transform: `scale(${mix(0.5, 1, Math.min(1.08, mg))}) translateY(${fl(t, 1, 8)}px)` }}><Tag text="LUCRO AUTOMÁTICO?" tone="accent" size={32} /></div>
            {x > 0.001 ? <div style={{ opacity: fade(x), transform: `scale(${mix(1.8, 1, Math.min(1, x))}) rotate(-6deg)` }}><Tag text="✕" tone="warn" size={34} /></div> : null}
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>LANCE INICIAL <span style={{ color: C.warn }}>NÃO É</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CUSTO FINAL</span></Title>
    </div>
  );
};

const ITEMS = [{ k: "EDITAL", at: "b_edital", x: -330, y: -170 }, { k: "MATRÍCULA", at: "b_matr", x: 330, y: -170 }, { k: "OCUPAÇÃO", at: "b_ocup", x: -360, y: -40 }, { k: "DÉBITOS", at: "b_deb", x: 360, y: -40 }, { k: "COMISSÃO", at: "b_com", x: -330, y: 90 }, { k: "IMPOSTOS", at: "b_imp", x: 330, y: 90 }, { k: "FORMA DE PAGAMENTO", at: "b_pag", x: 0, y: 215 }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_edital - 0.35, { damping: 15, stiffness: 150 });
  const house = sp(t, c.b_edital - 0.3, { damping: 12, stiffness: 180 });
  const it = ITEMS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const stamp = sp(t, c.b_casos - 0.1, { damping: 9, stiffness: 260 });
  const jur = sp(t, c.b_jur - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.c_corr - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.b_edital - 0.35, s: 1.05, y: 0 }, { t: c.b_edital + 0.8, s: 1.08, x: 8, y: -8, e: ease.out }, { t: c.b_deb, s: 1.06, x: -8, y: -14, e: ease.linear }, { t: c.b_pag + 0.3, s: 1.05, x: 0, y: -20, e: ease.linear }, { t: c.b_jur + 0.3, s: 1.08, y: -28, e: ease.linear }, { t: c.c_corr, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 540, top: 720 }}>
          <div style={{ position: "absolute", left: -110, top: -110, width: 220, height: 220, borderRadius: 40, background: C.surface, border: `2px solid ${C.text}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: fade(house), transform: `scale(${mix(0.5, 1, Math.min(1, house)) * (1 + 0.03 * Math.sin(t * 2))}) rotate(${Math.sin(t * 1.4) * 2}deg)` }}><IconHome size={130} color={C.text} /></div>
          {ITEMS.map((x, i) => it[i] > 0.001 ? (
            <div key={x.k} style={{ position: "absolute", left: 0, top: 0, transform: `translate(-50%, -50%) translate(${x.x * Math.min(1, it[i]) + Math.sin(t * 2 + i) * 8}px, ${x.y * Math.min(1, it[i]) + Math.cos(t * 1.8 + i) * 8}px) scale(${mix(0.4, 1, Math.min(1.05, it[i]))})`, opacity: fade(it[i]) }}>
              <div style={{ whiteSpace: "nowrap", padding: "12px 18px", borderRadius: 16, background: aa(0.1), border: `2px solid ${A.hex}`, fontWeight: 800, fontSize: 28, color: C.text }}>{x.k}</div>
            </div>
          ) : null)}
          {stamp > 0.001 ? (
            <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(-50%, -50%) rotate(-12deg) scale(${mix(2.2, 1, Math.min(1, stamp))})`, opacity: fade(stamp) }}>
              <div style={{ whiteSpace: "nowrap", padding: "14px 22px", borderRadius: 14, border: `5px solid ${C.warn}`, background: "rgba(10,10,12,0.85)", fontWeight: 800, fontSize: 38, color: C.warn, letterSpacing: "0.04em" }}>EXAMINAR DOCUMENTOS</div>
            </div>
          ) : null}
        </div>
        {jur > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center", opacity: fade(jur), transform: `translateY(${(1 - Math.min(1, jur)) * 20}px)` }}><Tag text="⚖️ ORIENTAÇÃO JURÍDICA E DOCUMENTAL" tone="muted" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={56}><span style={{ whiteSpace: "nowrap" }}>LEIA O</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>EDITAL</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const sc = sp(t, c.c_corr - 0.2, { damping: 13, stiffness: 170 });
  const tilt = mix(-12, 10, prog(t, c.c_desc - 0.2, 0.6, ease.out)) * (1 - prog(t, c.c_anal, 0.8, ease.inOut) * 0.7);
  const e1 = sp(t, c.c_expl - 0.15, { damping: 11, stiffness: 220 });
  const e2 = sp(t, c.c_anal - 0.15, { damping: 11, stiffness: 220 });
  const rk = sp(t, c.c_riscos - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_nao - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const W = 700;
  const dy = Math.sin((tilt * Math.PI) / 180) * (W / 2);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={6} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 0 }, { t: c.c_corr + 0.9, s: 1.09, x: -8, y: -8, e: ease.out }, { t: c.c_expl, s: 1.06, x: 8, y: -14, e: ease.linear }, { t: c.c_riscos, s: 1.08, x: -6, y: -22, e: ease.linear }, { t: c.x_perc + 0.3, s: 1.05, y: -32, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -36, e: ease.linear }]}>
        {/* balança */}
        <div style={{ position: "absolute", left: 540 - W / 2, top: 520, width: W, height: 420, opacity: fade(sc) * (1 - 0.5 * fade(fin)) }}>
          <div style={{ position: "absolute", left: W / 2 - 6, top: 60, width: 12, height: 300, borderRadius: 6, background: C.dim }} />
          <div style={{ position: "absolute", left: W / 2 - 90, top: 350, width: 180, height: 20, borderRadius: 10, background: C.dim }} />
          <div style={{ position: "absolute", left: 0, top: 60, width: W, height: 10, borderRadius: 5, background: C.text, transform: `rotate(${tilt}deg)` }} />
          {[{ k: "DESCONTO", col: A.hex, side: -1 }, { k: "CUSTOS E RISCOS", col: C.warn, side: 1 }].map((p) => (
            <div key={p.k} style={{ position: "absolute", left: p.side < 0 ? -40 : W - 260, top: 90 + p.side * dy, width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 2, height: 50, background: C.dim }} />
              <div style={{ width: 260, height: 100, boxSizing: "border-box", borderRadius: "0 0 60px 60px", background: p.side < 0 ? aa(0.1) : WARN_BG, border: `3px solid ${p.col}`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ fontWeight: 800, fontSize: p.side < 0 ? 32 : 26, color: p.col, lineHeight: 1.05 }}>{p.k}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 100, right: 100, top: 960, display: "flex", justifyContent: "center", gap: 14, opacity: 1 - fade(fin) }}>
          {e1 > 0.001 ? <div style={{ opacity: fade(e1), transform: `scale(${mix(0.5, 1, Math.min(1.05, e1))}) translateY(${fl(t, 1, 8)}px)` }}><Tag text="✓ EXPLICA O QUE VERIFICOU" tone="accent" size={24} /></div> : null}
          {e2 > 0.001 ? <div style={{ opacity: fade(e2), transform: `scale(${mix(0.5, 1, Math.min(1.05, e2))}) translateY(${fl(t, 3, 8)}px)` }}><Tag text="✓ INDICA ANÁLISE PROFISSIONAL" tone="accent" size={24} /></div> : null}
        </div>
        {rk > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", opacity: fade(rk) * (1 - fade(fin)) }}><Tag text="OPORTUNIDADE = DEPOIS DOS RISCOS" tone="muted" size={26} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 990, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Não venda apenas<br /><span style={{ color: A.hex }}>o percentual</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>NÃO VENDA APENAS</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>O PERCENTUAL</span></Title>
    </div>
  );
};
