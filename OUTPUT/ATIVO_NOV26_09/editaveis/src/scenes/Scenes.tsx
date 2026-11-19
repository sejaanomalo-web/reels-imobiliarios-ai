import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconHome, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_09 — "Anunciar acima para depois negociar". Dado: Raio-X FipeZAP 3º tri 2026 — desconto médio de 13% (11% um ano antes),
 * só nas transações fechadas com desconto (na tela). Alerta causal: o dado não prova que inflar anúncio funciona. Busca, anúncios e
 * ficha de captação ILUSTRATIVOS, sem marcas reais nem valores. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

const Listing: React.FC<{ w: number; bar: number; hi?: boolean; dim?: number; label?: string; style?: React.CSSProperties }> = ({ w, bar, hi, dim = 1, label = "APTO SEMELHANTE", style }) => (
  <div style={{ width: w, height: 110, boxSizing: "border-box", borderRadius: 22, background: C.surface, border: `2px solid ${hi ? A.hex : C.line}`, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", opacity: dim, ...style }}>
    <div style={{ width: 74, height: 74, borderRadius: 16, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><IconHome size={44} color={hi ? A.hex : C.muted} /></div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontWeight: 800, fontSize: 26, color: hi ? C.text : C.muted }}>{label}</span>
      <div style={{ height: 14, borderRadius: 7, background: C.surface3 }}><div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 7, background: hi ? A.hex : C.dim }} /></div>
    </div>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const card = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const msg = sp(t, c.h_prop - 0.1, { damping: 12, stiffness: 200 });
  const up = prog(t, c.h_acima - 0.1, 0.9, ease.inOut);
  const margem = sp(t, c.h_margem - 0.1, { damping: 11, stiffness: 220 });
  const line = sp(t, c.h_prob - 0.2, { damping: 13, stiffness: 190 });
  const q = sp(t, c.h_antes - 0.1, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_imag - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_acima)) / 2 + 0, s: 1.150, x: 9, y: -18, e: ease.inOut }, { t: c.h_acima, s: 1.06, x: -10, y: -10, e: ease.inOut }, { t: ((c.h_acima) + (c.h_margem + 0.3)) / 2 + 0, s: 1.120, x: -13, y: -18, e: ease.inOut }, { t: c.h_margem + 0.3, s: 1.09, x: 12, y: -20, e: ease.inOut }, { t: ((c.h_margem + 0.3) + (c.h_prob)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.h_prob, s: 1.04, x: 0, y: -40, e: ease.inOut }, { t: ((c.h_prob) + (c.h_antes + 0.3)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.h_antes + 0.3, s: 1.1, x: 0, y: -55, e: ease.inOut }, { t: c.a_imag, s: 1.08, y: -50, e: ease.inOut }]}>
        {/* anúncio com etiqueta de preço que sobe */}
        <div style={{ position: "absolute", left: 160, right: 160, top: 430, height: 330, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, padding: 22, opacity: fade(card), transform: `translateY(${(1 - Math.min(1, card)) * 60}px)` }}>
          <div style={{ height: 170, borderRadius: 20, background: `linear-gradient(160deg, ${C.surface3}, ${C.surface2})`, display: "flex", alignItems: "center", justifyContent: "center" }}><IconHome size={110} color={C.muted} /></div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>APTO À VENDA</span>
            <div style={{ transform: `translateY(${-up * 40}px)`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 40, color: up > 0.5 ? C.warn : C.text }}>{up > 0.5 ? "▲" : "●"}</span>
              <Tag text={up > 0.5 ? "ACIMA DO MERCADO" : "MERCADO"} tone={up > 0.5 ? "warn" : "muted"} size={24} />
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", opacity: fade(card) }}><Tag text="ANÚNCIO ILUSTRATIVO" tone="muted" size={24} /></div>
        {msg > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 790, display: "flex", alignItems: "flex-end", gap: 16, opacity: fade(msg) * (1 - fade(line) * 0.5), transform: `translateY(${(1 - Math.min(1, msg)) * 50}px)` }}>
            <Person size={90} t={t} />
            <Msg side="in" size={34}>Anuncia acima, pra ter margem.{margem > 0.5 ? " 😉" : ""}</Msg>
          </div>
        ) : null}
        {line > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 960, height: 150, opacity: fade(line) }}>
            <div style={{ position: "absolute", left: 40, right: 40, top: 40, height: 8, borderRadius: 4, background: C.surface3 }} />
            {["ANÚNCIO", "?", "PROPOSTA"].map((k, i) => (
              <div key={k} style={{ position: "absolute", left: `${[4, 50, 96][i]}%`, top: 0, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 88, height: 88, borderRadius: 44, background: i === 1 ? (q > 0.5 ? C.warn : C.surface2) : C.surface2, border: `4px solid ${i === 1 && q > 0.5 ? C.warn : C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 44, color: C.text, transform: `scale(${i === 1 ? mix(1, 1.15, Math.min(1, q)) + 0.04 * Math.sin(t * 6) * Math.min(1, q) : 1})` }}>{i === 1 ? "?" : ""}</div>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: i === 1 ? (q > 0.5 ? C.warn : C.muted) : C.muted, whiteSpace: "nowrap" }}>{i === 1 ? "ANTES DA PROPOSTA" : k}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={58}>PREÇO DE <span style={{ color: C.warn }}>ANÚNCIO</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_imag - 0.35, { damping: 15, stiffness: 150 });
  const search = sp(t, c.a_busca - 0.2, { damping: 13, stiffness: 180 });
  const rows = [0, 1, 2].map((i) => sp(t, c.a_semel - 0.3 + i * 0.12, { damping: 12, stiffness: 210 }));
  const ours = sp(t, c.a_imag + 0.2, { damping: 12, stiffness: 200 });
  const grow = prog(t, c.a_preco - 0.1, 0.6, ease.inOut);
  const filt = sp(t, c.a_filtr - 0.2, { damping: 12, stiffness: 200 });
  const drop = prog(t, c.a_afastar, 0.8, ease.inOut);
  const nochat = sp(t, c.a_conv - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_pesq - 0.4, 0.35, ease.in);
  const lineX = 120 + 840 * 0.74;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_imag - 0.35, s: 1.05, y: 0 }, { t: ((c.a_imag - 0.35) + (c.a_busca + 0.2)) / 2 + 0, s: 1.110, x: 19, y: -18, e: ease.inOut }, { t: c.a_busca + 0.2, s: 1.08, x: 10, y: -10, e: ease.inOut }, { t: ((c.a_busca + 0.2) + (c.a_preco + 0.3)) / 2 + 0, s: 1.130, x: -17, y: -18, e: ease.inOut }, { t: c.a_preco + 0.3, s: 1.1, x: -15, y: -15, e: ease.inOut }, { t: ((c.a_preco + 0.3) + (c.a_filtr + 0.3)) / 2 + 0, s: 1.130, x: 14, y: -18, e: ease.inOut }, { t: c.a_filtr + 0.3, s: 1.08, x: 15, y: -25, e: ease.inOut }, { t: ((c.a_filtr + 0.3) + (c.a_conv + 0.2)) / 2 + 0, s: 1.130, x: -7, y: -18, e: ease.inOut }, { t: c.a_conv + 0.2, s: 1.1, x: 0, y: -40, e: ease.inOut }, { t: c.b_pesq, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 420, height: 80, boxSizing: "border-box", borderRadius: 40, background: C.surface2, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 14, padding: "0 26px", opacity: fade(search) }}>
          <span style={{ fontSize: 34, color: C.muted }}>⌕</span>
          <span style={{ fontWeight: 700, fontSize: 28, color: C.text }}>Apartamento · 2 quartos</span>
          <span style={{ marginLeft: "auto" }}><Tag text={filt > 0.5 ? "ATÉ O ORÇAMENTO" : "FILTRO"} tone={filt > 0.5 ? "accent" : "muted"} size={24} /></span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", justifyContent: "center", opacity: fade(search) }}><Tag text="BUSCA ILUSTRATIVA · SEM MARCAS REAIS" tone="muted" size={24} /></div>
        <div style={{ position: "absolute", left: 120, top: 590, display: "flex", flexDirection: "column", gap: 16 }}>
          {[0.55, 0.62, 0.58].map((b, i) => (rows[i] > 0.001 ? <div key={i} style={{ opacity: fade(rows[i]), transform: `translateX(${(1 - Math.min(1, rows[i])) * 80}px)` }}><Listing w={840} bar={b} /></div> : <div key={i} style={{ height: 110 }} />))}
          {ours > 0.001 ? (
            <div style={{ position: "relative", opacity: fade(ours) * mix(1, 0.6, drop), transform: `translateY(${drop * 40}px) rotate(${drop * 2}deg)` }}>
              <Listing w={840} bar={mix(0.6, 0.92, grow)} hi label="ESTE IMÓVEL" />
              {drop > 0.3 ? <div style={{ position: "absolute", right: 150, top: -24 }}><Tag text="FORA DO FILTRO" tone="warn" size={26} /></div> : null}
            </div>
          ) : null}
        </div>
        {/* limite do filtro */}
        {filt > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: lineX + 120 * 0 - 2, top: 580, width: 4, height: 560, background: `repeating-linear-gradient(${A.hex} 0 14px, transparent 14px 26px)`, opacity: fade(filt) }} />
            <div style={{ position: "absolute", left: lineX - 120, top: 1150, width: 240, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: A.hex, opacity: fade(filt) }}>LIMITE DO FILTRO</div>
          </>
        ) : null}
        {nochat > 0.001 ? <div style={{ position: "absolute", left: 120, top: 1200, opacity: fade(nochat), transform: `scale(${mix(0.5, 1, Math.min(1.08, nochat))})`, transformOrigin: "0 50%" }}><Tag text="✕ NENHUMA CONVERSA" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={48}>O FILTRO VEM <span style={{ color: A.hex }}>ANTES DA NEGOCIAÇÃO</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_pesq - 0.35, { damping: 15, stiffness: 150 });
  const b1 = prog(t, c.b_pesq + 0.2, 0.7, ease.out);
  const b2 = prog(t, c.b_desc - 0.1, 0.7, ease.out);
  const note = prog(t, c.b_neg - 0.2, 0.4, ease.out);
  const warn = sp(t, c.b_mas - 0.1, { damping: 10, stiffness: 230 });
  const arrow = sp(t, c.b_inflar - 0.2, { damping: 12, stiffness: 200 });
  const cut = prog(t, c.b_concl - 0.1, 0.4, ease.out);
  const out = prog(t, c.c_captar - 0.4, 0.35, ease.in);
  const base = 900, k = 22;
  const gh = 0.2 + 0.75 * prog(t, c.b_pesq + 0.5, Math.max(0.5, c.b_desc - c.b_pesq - 0.6), ease.inOut);
  const Bar: React.FC<{ x: number; v: number; p: number; lab: string; hi?: boolean }> = ({ x, v, p, lab, hi }) => (
    <>
      <div style={{ position: "absolute", left: x, top: base - v * k * p, width: 200, height: v * k * p, borderRadius: "18px 18px 4px 4px", background: hi ? A.hex : C.surface3, boxShadow: hi ? `0 0 40px ${aa(0.25)}` : "none" }} />
      <div style={{ position: "absolute", left: x - 20, width: 240, top: base - v * k * p - 76, textAlign: "center", fontWeight: 800, fontSize: 62, color: hi ? C.text : C.muted, opacity: fade((p - 0.6) * 3) }}>{v}%</div>
      <div style={{ position: "absolute", left: x - 20, width: 240, top: base + 14, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: hi ? C.text : C.muted, opacity: fade(p) }}>{lab}</div>
    </>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_pesq - 0.35, s: 1.05, y: 0 }, { t: c.b_pesq + 0.6, s: 1.08, x: 8, y: -8, e: ease.inOut }, { t: c.b_desc - 0.2, s: 1.14, x: 26, y: -22, e: ease.linear }, { t: c.b_desc + 0.3, s: 1.09, x: 15, y: -10, e: ease.inOut }, { t: ((c.b_desc + 0.3) + (c.b_neg + 0.2)) / 2 + 0, s: 1.120, x: -12, y: -18, e: ease.inOut }, { t: c.b_neg + 0.2, s: 1.06, x: -10, y: -15, e: ease.inOut }, { t: ((c.b_neg + 0.2) + (c.b_mas + 0.2)) / 2 + 0, s: 1.130, x: 9, y: -18, e: ease.inOut }, { t: c.b_mas + 0.2, s: 1.1, x: 0, y: -30, e: ease.inOut }, { t: ((c.b_mas + 0.2) + (c.b_concl + 0.2)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.b_concl + 0.2, s: 1.08, x: 0, y: -45, e: ease.inOut }, { t: c.c_captar, s: 1.05, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 430, display: "flex", justifyContent: "center", opacity: fade(b1) }}><Tag text="DESCONTO MÉDIO · SÓ NAS VENDAS COM DESCONTO" tone="accent" size={24} /></div>
        <div style={{ position: "absolute", left: 190, width: 700, top: base, height: 4, borderRadius: 2, background: C.dim }} />
        <Bar x={250} v={11} p={b1} lab="3º TRI 2025" />
        <Bar x={630} v={13} p={b2} lab="3º TRI 2026" hi />
        {b2 < 0.3 && b1 > 0.2 ? <div style={{ position: "absolute", left: 630, top: base - 13 * k * gh, width: 200, height: 13 * k * gh, boxSizing: "border-box", borderRadius: "18px 18px 4px 4px", border: `3px dashed ${aa(0.7)}`, background: aa(0.12 + 0.08 * Math.sin(t * 6)), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 60, color: aa(0.8), opacity: fade(b1 - 0.2) * (1 - b2 * 3), transform: `translateY(${Math.sin(t * 3) * 4}px)` }}>?</div> : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 970, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, opacity: note }}>FONTE: RAIO-X FIPEZAP · 758 RESPONDENTES</div>
        {warn > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 1030, boxSizing: "border-box", padding: "18px 24px", borderRadius: 24, background: WARN_BG, border: "2px solid rgba(255,107,94,0.65)", display: "flex", alignItems: "center", gap: 18, opacity: fade(warn), transform: `scale(${mix(0.6, 1, Math.min(1.05, warn))})` }}>
            <span style={{ fontSize: 50 }}>⚠️</span>
            <span style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.1, color: C.text, opacity: arrow > 0.3 ? 1 : 0.6 }}>DESCONTO MAIOR <span style={{ color: C.warn, textDecoration: cut > 0.5 ? "line-through" : "none" }}>⇒</span> INFLAR O ANÚNCIO?<br /><span style={{ color: C.warn, opacity: fade(cut) }}>NÃO É A MESMA CONCLUSÃO</span></span>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={48}>DADO DE DESCONTO <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>PREÇO INFLADO</span></Title>
    </div>
  );
};

const FICHA = [
  { k: "COMPARÁVEIS", v: "3 imóveis parecidos", at: "c_comp" },
  { k: "PLANO DE PREÇO", v: "combinado com o proprietário", at: "c_plano" },
  { k: "DATA DE REVISÃO", v: "definida na captação", at: "c_revisar" },
  { k: "INTERESSE MEDIDO", v: "contatos e visitas", at: "c_medir" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_captar - 0.35, { damping: 15, stiffness: 150 });
  const ficha = sp(t, c.c_captar - 0.2, { damping: 14, stiffness: 170 });
  const rows = FICHA.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const test = sp(t, c.c_testar - 0.15, { damping: 11, stiffness: 220 });
  const light = prog(t, c.c_escuro - 0.3, 0.8, ease.inOut);
  const fin = sp(t, c.x_capt - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_captar - 0.35, s: 1.05, y: 0 }, { t: ((c.c_captar - 0.35) + (c.c_comp + 0.3)) / 2 + 0, s: 1.120, x: 21, y: -18, e: ease.inOut }, { t: c.c_comp + 0.3, s: 1.09, x: 15, y: -10, e: ease.inOut }, { t: ((c.c_comp + 0.3) + (c.c_plano + 0.3)) / 2 + 0, s: 1.120, x: -13, y: -18, e: ease.inOut }, { t: c.c_plano + 0.3, s: 1.06, x: -12, y: -15, e: ease.inOut }, { t: ((c.c_plano + 0.3) + (c.c_revisar + 0.3)) / 2 + 0, s: 1.130, x: 14, y: -18, e: ease.inOut }, { t: c.c_revisar + 0.3, s: 1.1, x: 12, y: -25, e: ease.inOut }, { t: ((c.c_revisar + 0.3) + (c.c_escuro + 0.3)) / 2 + 0, s: 1.130, x: -8, y: -18, e: ease.inOut }, { t: c.c_escuro + 0.3, s: 1.05, x: 0, y: -30, e: ease.inOut }, { t: ((c.c_escuro + 0.3) + (c.x_rev)) / 2 + 0, s: 1.120, x: 14, y: -18, e: ease.inOut }, { t: c.x_rev, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 110, right: 110, top: 420, boxSizing: "border-box", padding: "20px 24px", borderRadius: 30, background: C.surface, border: `2px solid ${light > 0.5 ? A.hex : C.line}`, opacity: fade(ficha), transform: `translateY(${(1 - Math.min(1, ficha)) * 80 + Math.sin(t * 1.4) * 5}px)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>FICHA DE CAPTAÇÃO</span>
            <Tag text="ILUSTRATIVO" tone="muted" size={24} />
          </div>
          {FICHA.map((r, i) => {
            const p = rows[i];
            return (
              <div key={r.k} style={{ marginTop: 14, height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", borderRadius: 20, background: p > 0.5 ? aa(0.1) : C.surface2, border: `2px solid ${p > 0.5 ? A.hex : "transparent"}` }}>
                <CheckDot p={Math.min(1, p)} size={46} n={i + 1} />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{r.k}</span>
                  <span style={{ fontWeight: 600, fontSize: 26, color: A.hex, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * 40}px)` }}>{r.v}</span>
                </div>
                {i === 2 && test > 0.001 ? <span style={{ marginLeft: "auto", opacity: fade(test) }}><Tag text="SE TESTAR UM VALOR" tone="warn" size={24} /></span> : null}
              </div>
            );
          })}
        </div>
        {/* esperar no escuro → medir */}
        <div style={{ position: "absolute", inset: 0, background: "#000", opacity: 0.45 * prog(t, c.c_medir - 0.2, 0.3, ease.out) * (1 - light), pointerEvents: "none" }} />
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1030, textAlign: "center", fontWeight: 800, fontSize: 52, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Preço <span style={{ color: A.hex }}>+ plano de revisão</span></div> : null}
      </Camera>
      <Title p={enter} size={54}>PREÇO + <span style={{ color: A.hex }}>PLANO DE REVISÃO</span></Title>
    </div>
  );
};
