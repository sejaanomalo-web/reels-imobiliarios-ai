import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconDoc, IconHome, Msg, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_10 — "Preço anunciado não é preço fechado". FipeZAP de venda = preços anunciados em portais; Raio-X FipeZAP = pesquisa
 * com entrevistados sobre transações. Bases diferentes (na tela); sem valores do índice. Apartamento do gancho = EXEMPLO HIPOTÉTICO;
 * réguas sem números; mapa e ficha ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

/** Régua horizontal sem números, com marcador. */
const Ruler: React.FC<{ y: number; label: string; src: string; pos: number; p: number; color: string; t: number }> = ({ y, label, src, pos, p, color, t }) => (
  <div style={{ position: "absolute", left: 100, right: 100, top: y, opacity: fade(p), transform: `translateX(${(1 - Math.min(1, p)) * -80}px)` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{label}</span>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{src}</span>
    </div>
    <div style={{ position: "relative", marginTop: 16, height: 40 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 6, borderRadius: 3, background: C.surface3 }} />
      {Array.from({ length: 21 }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${i * 5}%`, top: i % 5 === 0 ? 4 : 12, width: 3, height: i % 5 === 0 ? 34 : 18, background: C.dim }} />)}
      <div style={{ position: "absolute", left: `${(pos + 0.03 * Math.sin(t * 1.6 + pos * 10)) * 100 * Math.min(1, p)}%`, top: -10, width: 36, height: 60, marginLeft: -18, borderRadius: 12, background: color, boxShadow: `0 0 24px ${color}`, transform: `translateY(${Math.sin(t * 3) * 3}px)` }} />
    </div>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const card = sp(t, -0.2, { damping: 13, stiffness: 160 });
  const up = sp(t, c.h_caro - 0.1, { damping: 11, stiffness: 210 });
  const neg = sp(t, c.h_neg - 0.15, { damping: 12, stiffness: 200 });
  const down = sp(t, c.h_desc - 0.1, { damping: 11, stiffness: 210 });
  const both = sp(t, c.h_dois - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_fipe - 0.4, 0.35, ease.in);
  const Box: React.FC<{ x: number; p: number; head: string; arrow: string; col: string; sub: string; ok: number }> = ({ x, p, head, arrow, col, sub, ok }) => (
    <div style={{ position: "absolute", left: x, top: 470, width: 410, height: 430, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${ok > 0.5 ? A.hex : C.line}`, padding: "26px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 80 + Math.sin(t * 1.8 + x / 100) * 10}px) rotate(${Math.sin(t * 1.3 + x) * 1.2}deg)` }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>{head}</span>
      <span style={{ fontWeight: 800, fontSize: 150, lineHeight: 1, color: col, transform: `translateY(${Math.sin(t * 2.4 + x) * 6}px)` }}>{arrow}</span>
      <span style={{ fontWeight: 800, fontSize: 32, color: C.text, textAlign: "center", lineHeight: 1.1 }}>{sub}</span>
      {ok > 0.001 ? <div style={{ marginTop: 6, opacity: fade(ok), transform: `scale(${mix(0.4, 1, Math.min(1.1, ok))})` }}><CheckDot p={Math.min(1, ok)} size={60} /></div> : null}
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={2.6} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_caro + 0.2)) / 2 + 0, s: 1.150, x: 24, y: -18, e: ease.inOut }, { t: c.h_caro + 0.2, s: 1.08, x: 20, y: -15, e: ease.inOut }, { t: ((c.h_caro + 0.2) + (c.h_desc + 0.2)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.h_desc + 0.2, s: 1.08, x: -20, y: -15, e: ease.inOut }, { t: ((c.h_desc + 0.2) + (c.h_dois + 0.2)) / 2 + 0, s: 1.110, x: 4, y: -18, e: ease.inOut }, { t: c.h_dois + 0.2, s: 1.03, x: 0, y: -25, e: ease.inOut }, { t: c.a_fipe, s: 1.07, y: -30, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 405, display: "flex", justifyContent: "center", opacity: fade(card) }}><Tag text="EXEMPLO HIPOTÉTICO" tone="warn" size={26} /></div>
        <Box x={100} p={card} head="NO ÍNDICE DE ANÚNCIOS" arrow={up > 0.5 ? "▲" : "•"} col={C.warn} sub={up > 0.5 ? "FICOU MAIS CARO" : "PREÇO PEDIDO"} ok={both} />
        <Box x={570} p={Math.max(card, neg)} head="NA NEGOCIAÇÃO" arrow={down > 0.5 ? "▼" : "•"} col={A.hex} sub={down > 0.5 ? "TEVE DESCONTO" : "PREÇO PAGO"} ok={both} />
        {both > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 950, textAlign: "center", fontWeight: 800, fontSize: 50, color: C.text, opacity: fade(both), transform: `scale(${mix(1.2, 1, Math.min(1, both))})` }}>Os dois <span style={{ color: A.hex }}>podem ser verdade</span></div> : null}
      </Camera>
      <Title p={title} size={60}>DOIS <span style={{ color: A.hex }}>PREÇOS</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_fipe - 0.35, { damping: 15, stiffness: 150 });
  const r1 = sp(t, c.a_fipe - 0.2, { damping: 13, stiffness: 180 });
  const r2 = sp(t, c.a_pesq - 0.15, { damping: 13, stiffness: 180 });
  const portal = sp(t, c.a_portais - 0.15, { damping: 12, stiffness: 200 });
  const pago = sp(t, c.a_pago - 0.15, { damping: 12, stiffness: 200 });
  const chips = ["a_bases", "a_metodos", "a_perg"].map((k) => sp(t, c[k] - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.b_se - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={2.6} t={t} keys={[{ t: c.a_fipe - 0.35, s: 1.05, y: 0 }, { t: ((c.a_fipe - 0.35) + (c.a_portais + 0.3)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.a_portais + 0.3, s: 1.09, x: 12, y: 10, e: ease.inOut }, { t: ((c.a_portais + 0.3) + (c.a_pago + 0.3)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.a_pago + 0.3, s: 1.09, x: -12, y: -20, e: ease.inOut }, { t: ((c.a_pago + 0.3) + (c.a_metodos + 0.2)) / 2 + 0, s: 1.120, x: 8, y: -18, e: ease.inOut }, { t: c.a_metodos + 0.2, s: 1.04, x: 0, y: -30, e: ease.inOut }, { t: c.b_se, s: 1.07, y: -35, e: ease.linear }]}>
        <Ruler y={450} label="PREÇO PEDIDO" src="ÍNDICE FIPEZAP DE VENDA" pos={0.7} p={r1} color={C.warn} t={t} />
        {portal > 0.001 ? <div style={{ position: "absolute", left: 100, top: 590, display: "flex", alignItems: "center", gap: 14, opacity: fade(portal) }}><IconHome size={44} color={C.muted} /><Tag text="ANÚNCIOS EM PORTAIS" tone="muted" size={24} /></div> : null}
        <Ruler y={700} label="PREÇO NEGOCIADO" src="PESQUISA COM ENTREVISTADOS" pos={0.58} p={r2} color={A.hex} t={t + 1} />
        {pago > 0.001 ? <div style={{ position: "absolute", left: 100, top: 840, display: "flex", alignItems: "center", gap: 14, opacity: fade(pago) }}><IconDoc size={44} /><Tag text="O QUE RELATAM TER PAGO" tone="accent" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 100, right: 100, top: 950, display: "flex", gap: 18, justifyContent: "center" }}>
          {["BASES", "MÉTODOS", "PERGUNTAS"].map((k, i) => (chips[i] > 0.001 ? (
            <div key={k} style={{ flex: 1, height: 100, borderRadius: 22, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: 800, fontSize: 30, color: C.text, opacity: fade(chips[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, chips[i]))})` }}>{k} <span style={{ color: C.warn }}>≠</span></div>
          ) : <div key={k} style={{ flex: 1, height: 100, borderRadius: 22, border: `2px dashed ${C.dim}`, opacity: 0.5 * fade(r2) }} />))}
        </div>
      </Camera>
      <Title p={enter} size={56}>ANÚNCIO <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>ESCRITURA</span></Title>
    </div>
  );
};

const MISS = [
  { k: "ESTADO DE CONSERVAÇÃO", at: "b_estado" },
  { k: "LIQUIDEZ", at: "b_liq" },
  { k: "NEGOCIAÇÕES SEMELHANTES NA REGIÃO", at: "b_negs" },
];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_se - 0.35, { damping: 15, stiffness: 150 });
  const arrow = sp(t, c.b_se - 0.1, { damping: 12, stiffness: 200 });
  const msg = sp(t, c.b_vale - 0.3, { damping: 12, stiffness: 200 });
  const ficha = sp(t, c.b_se + 0.5, { damping: 13, stiffness: 190 });
  const miss = MISS.map((m) => sp(t, c[m.at] - 0.1, { damping: 11, stiffness: 220 }));
  const pin = sp(t, c.b_negs - 0.1, { damping: 11, stiffness: 220 });
  const up = prog(t, c.b_ign - 0.3, 0.5, ease.inOut);
  const out = prog(t, c.c_not - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.8} t={t} keys={[{ t: c.b_se - 0.35, s: 1.05, y: 0 }, { t: c.b_se + 0.4, s: 1.08, x: 8, y: -6, e: ease.inOut }, { t: c.b_valor + 0.2, s: 1.14, x: 24, y: -20, e: ease.linear }, { t: c.b_valor + 0.3, s: 1.09, x: 12, y: -10, e: ease.inOut }, { t: ((c.b_valor + 0.3) + (c.b_vale + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.b_vale + 0.2, s: 1.06, x: -12, y: -15, e: ease.inOut }, { t: ((c.b_vale + 0.2) + (c.b_estado + 0.2)) / 2 + 0, s: 1.120, x: 13, y: -18, e: ease.inOut }, { t: c.b_estado + 0.2, s: 1.09, x: 10, y: -25, e: ease.inOut }, { t: ((c.b_estado + 0.2) + (c.b_negs + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.b_negs + 0.2, s: 1.06, x: -10, y: -35, e: ease.inOut }, { t: c.c_not, s: 1.05, y: -30, e: ease.linear }]}>
        {/* valorização anunciada → "seu imóvel vale" */}
        <div style={{ position: "absolute", left: 100, right: 100, top: mix(440, 420, up), display: "flex", alignItems: "center", gap: 22, opacity: fade(arrow) * mix(1, 0.55, up), transform: `scale(${mix(1, 0.8, up)})`, transformOrigin: "50% 0" }}>
          <div style={{ width: 150, height: 150, borderRadius: 26, background: WARN_BG, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 90, color: C.warn, flex: "none" }}>▲</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>VALORIZAÇÃO ANUNCIADA</span>
            {msg > 0.001 ? <div style={{ opacity: fade(msg), transform: `translateX(${(1 - Math.min(1, msg)) * 40}px)` }}><Msg side="out" tone="dim" size={34}>“Seu imóvel vale isso.”</Msg></div> : null}
          </div>
        </div>
        {ficha > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 640, boxSizing: "border-box", padding: "20px 22px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: fade(ficha), transform: `translateY(${(1 - Math.min(1, ficha)) * 80}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>O QUE FICOU DE FORA</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {MISS.map((m, i) => (
              <div key={m.k} style={{ marginTop: 12, height: 84, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", borderRadius: 18, background: miss[i] > 0.5 ? WARN_BG : C.surface2, border: `2px solid ${miss[i] > 0.5 ? "rgba(255,107,94,0.6)" : "transparent"}`, opacity: mix(0.35, 1, Math.min(1, miss[i] * 2)) }}>
                <span style={{ fontWeight: 800, fontSize: 34, color: C.warn, width: 30 }}>{miss[i] > 0.5 ? "!" : ""}</span>
                <span style={{ fontWeight: 800, fontSize: i === 2 ? 26 : 30, color: C.text }}>{m.k}</span>
              </div>
            ))}
          </div>
        ) : null}
        {pin > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1080, height: 110, borderRadius: 24, background: `repeating-linear-gradient(90deg, ${C.surface2} 0 70px, ${C.surface} 70px 76px)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, opacity: fade(pin), transform: `scale(${mix(0.8, 1, Math.min(1, pin))})` }}>
            <span style={{ fontSize: 48, transform: `translateY(${Math.sin(t * 4) * 5}px)` }}>📍</span>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>BAIRRO ILUSTRATIVO</span>
            <Tag text="COMPARÁVEIS A INSERIR" tone="accent" size={24} />
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>INDICADOR NACIONAL</span><br /><span style={{ color: C.warn, whiteSpace: "nowrap" }}>NÃO PRECIFICA UM IMÓVEL</span></Title>
    </div>
  );
};

const CTX = [
  { k: "REGIÃO", at: "c_locais" },
  { k: "ESTADO", at: "c_verif" },
  { k: "COMPARÁVEIS", at: "c_verif" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_not - 0.35, { damping: 15, stiffness: 150 });
  const r = sp(t, c.c_not - 0.2, { damping: 13, stiffness: 180 });
  const merge = prog(t, c.c_aval - 0.3, 0.8, ease.inOut);
  const card = sp(t, c.c_aval, { damping: 13, stiffness: 190 });
  const ctx = CTX.map((x, i) => sp(t, c[x.at] - 0.15 + (i === 2 ? 0.25 : 0), { damping: 11, stiffness: 220 }));
  const tr = sp(t, c.c_transp - 0.15, { damping: 12, stiffness: 200 });
  const bon = sp(t, c.c_bonita - 0.2, { damping: 12, stiffness: 200 });
  const fin = sp(t, c.x_preco - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.8} t={t} keys={[{ t: c.c_not - 0.35, s: 1.05, y: 0 }, { t: ((c.c_not - 0.35) + (c.c_cen + 0.2)) / 2 + 0, s: 1.110, x: 19, y: -18, e: ease.inOut }, { t: c.c_cen + 0.2, s: 1.08, x: 10, y: -10, e: ease.inOut }, { t: ((c.c_cen + 0.2) + (c.c_aval + 0.5)) / 2 + 0, s: 1.110, x: -9, y: -18, e: ease.inOut }, { t: c.c_aval + 0.5, s: 1.04, x: 0, y: -15, e: ease.inOut }, { t: ((c.c_aval + 0.5) + (c.c_verif + 0.4)) / 2 + 0, s: 1.130, x: 8, y: -18, e: ease.inOut }, { t: c.c_verif + 0.4, s: 1.1, x: -12, y: -25, e: ease.inOut }, { t: ((c.c_verif + 0.4) + (c.c_transp + 0.3)) / 2 + 0, s: 1.130, x: -14, y: -18, e: ease.inOut }, { t: c.c_transp + 0.3, s: 1.07, x: 12, y: -35, e: ease.inOut }, { t: ((c.c_transp + 0.3) + (c.x_ponto)) / 2 + 0, s: 1.130, x: 20, y: -18, e: ease.inOut }, { t: c.x_ponto, s: 1.1, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", opacity: fade(r) * (1 - merge) }}><Tag text="NOTÍCIA = CENÁRIO" tone="muted" size={26} /></div>
        {/* duas réguas que se unem */}
        {[0, 1].map((i) => (
          <div key={i} style={{ position: "absolute", left: 120, right: 120, top: mix(480 + i * 110, 535, merge), height: 14, borderRadius: 7, background: i === 0 ? C.warn : A.hex, opacity: fade(r) * (1 - merge) }} />
        ))}
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 480, boxSizing: "border-box", padding: "22px 24px", borderRadius: 30, background: C.surface, border: `2px solid ${A.hex}`, boxShadow: `0 0 40px ${aa(0.15)}`, opacity: fade(card), transform: `scale(${mix(0.85, 1, Math.min(1, card))})` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>AVALIAÇÃO CONTEXTUAL</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 14 }}>
              {CTX.map((x, i) => (
                <div key={x.k} style={{ flex: 1, height: 110, borderRadius: 20, background: ctx[i] > 0.5 ? aa(0.14) : C.surface2, border: `2px solid ${ctx[i] > 0.5 ? A.hex : "transparent"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <CheckDot p={Math.min(1, ctx[i])} size={40} />
                  <span style={{ fontWeight: 800, fontSize: 24, color: C.text }}>{x.k}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {tr > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 790, display: "flex", gap: 16, opacity: fade(tr) * (1 - fade(fin) * 0.5) }}>
            <div style={{ flex: 1.2, height: 110, borderRadius: 22, background: aa(0.12), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: 800, fontSize: 28, color: C.text }}>✓ MÉTODO TRANSPARENTE</div>
            <div style={{ flex: 1, height: 110, borderRadius: 22, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26, color: C.muted, opacity: mix(0.3, 1, Math.min(1, bon * 2)), textDecoration: bon > 0.5 ? "line-through" : "none" }}>ESTATÍSTICA BONITA</div>
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 960, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.08, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Anunciado <span style={{ color: C.warn }}>≠</span> vendido<br /><span style={{ color: A.hex }}>dado é ponto de partida</span></div> : null}
      </Camera>
      <Title p={enter} size={54}>DADO É <span style={{ color: A.hex }}>PONTO DE PARTIDA</span></Title>
    </div>
  );
};
