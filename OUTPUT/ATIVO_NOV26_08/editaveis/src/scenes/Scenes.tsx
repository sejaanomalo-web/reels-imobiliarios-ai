import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_08 — "O comprador acha caro: e agora?". Dado: Raio-X FipeZAP 3º tri 2026 — 73% dos respondentes classificaram imóveis
 * como caros ou muito caros (percepção, não índice de sobrepreço — na tela). Comparador sem valores (só MAIOR/MENOR); conversa e
 * imóveis ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const big = sp(t, -0.15, { damping: 12, stiffness: 150 });
  const bar = prog(t, c.h_73 + 0.2, 1.4, ease.inOut);
  const src = prog(t, c.h_entr - 0.1, 0.4, ease.out);
  const muito = sp(t, c.h_muito - 0.1, { damping: 12, stiffness: 200 });
  const resp = sp(t, c.h_resp - 0.2, { damping: 12, stiffness: 200 });
  const stamp = sp(t, c.h_oport + 0.25, { damping: 10, stiffness: 240 });
  const out = prog(t, c.a_se - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.12, y: -20 }, { t: ((0) + (c.h_caros)) / 2 + 0, s: 1.150, x: 19, y: -18, e: ease.inOut }, { t: c.h_caros, s: 1.06, x: 10, y: -10, e: ease.inOut }, { t: ((c.h_caros) + (c.h_resp)) / 2 + 0, s: 1.110, x: -14, y: -18, e: ease.inOut }, { t: c.h_resp, s: 1.08, x: -10, y: -40, e: ease.inOut }, { t: ((c.h_resp) + (c.h_oport + 0.3)) / 2 + 0, s: 1.150, x: 9, y: -18, e: ease.inOut }, { t: c.h_oport + 0.3, s: 1.12, x: 0, y: -55, e: ease.inOut }, { t: c.a_se, s: 1.1, x: 0, y: -50, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, textAlign: "center", opacity: mix(0.75, 1, Math.min(1, big * 2)), transform: `scale(${mix(0.9, 1, Math.min(1.04, big))})` }}>
          <div style={{ fontWeight: 800, fontSize: 200, lineHeight: 0.9, letterSpacing: "-0.06em", color: C.text, textShadow: `0 0 60px ${aa(0.25)}` }}>73<span style={{ color: A.hex }}>%</span></div>
          <div style={{ marginTop: 6, fontFamily: F.mono, fontWeight: 700, fontSize: 38, letterSpacing: "0.1em", color: A.hex }}>ACHAM CARO</div>
        </div>
        <div style={{ position: "absolute", left: 140, right: 140, top: 700 }}>
          <div style={{ height: 64, borderRadius: 32, background: C.surface3, overflow: "hidden", position: "relative" }}>
            <div style={{ width: `${73 * bar}%`, height: "100%", borderRadius: 32, background: A.hex, boxShadow: `0 0 30px ${aa(0.35)}` }} />
          </div>
          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, opacity: fade(muito) }}>
            <span style={{ color: C.text }}>CAROS OU MUITO CAROS</span><span>DEMAIS</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center", opacity: src }}><Tag text="PERCEPÇÃO DOS ENTREVISTADOS · RAIO-X FIPEZAP 3º TRI 2026" tone="muted" size={24} /></div>
        {resp > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 920, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 18, opacity: fade(resp), transform: `translateY(${(1 - Math.min(1, resp)) * 60}px)` }}>
            <div style={{ position: "relative" }}>
              <Msg side="out" tone={stamp > 0.5 ? "dim" : "plain"} size={42}>Mas é uma oportunidade!</Msg>
              {stamp > 0.001 ? <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(-8deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, opacity: fade(stamp) }}><Tag text="NÃO BASTA" tone="warn" size={34} /></div> : null}
            </div>
            <Person size={100} t={t} />
          </div>
        ) : null}
      </Camera>
      <Title p={title} size={56}>O COMPRADOR <span style={{ color: C.warn }}>ACHA CARO</span></Title>
    </div>
  );
};

const ADJ = [
  { w: "OPORTUNIDADE!", x: 120, y: 520, r: -6 },
  { w: "IMPERDÍVEL", x: 600, y: 470, r: 5 },
  { w: "ÚNICO", x: 150, y: 860, r: 4 },
  { w: "EXCELENTE", x: 610, y: 900, r: -5 },
];
const CRIT = [
  { k: "ÁREA", at: "a_area" },
  { k: "LOCALIZAÇÃO", at: "a_loc" },
  { k: "CONSERVAÇÃO", at: "a_cons" },
  { k: "CUSTOS RECORRENTES", at: "a_custos" },
];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_se - 0.35, { damping: 15, stiffness: 150 });
  const caro = sp(t, c.a_caro - 0.2, { damping: 11, stiffness: 200 });
  const adj = ADJ.map((_, i) => sp(t, c.a_adj - 0.1 + i * 0.12, { damping: 11, stiffness: 220 }));
  const gone = prog(t, c.a_resolve - 0.05, 0.5, ease.in);
  const up = prog(t, c.a_comp - 0.3, 0.6, ease.inOut);
  const q = sp(t, c.a_comp - 0.1, { damping: 12, stiffness: 200 });
  const crit = CRIT.map((k) => sp(t, c[k.at] - 0.15, { damping: 12, stiffness: 210 }));
  const same = sp(t, c.a_mesmo - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.b_um - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_se - 0.35, s: 1.05, y: 0 }, { t: ((c.a_se - 0.35) + (c.a_caro + 0.2)) / 2 + 0, s: 1.150, x: 14, y: -18, e: ease.inOut }, { t: c.a_caro + 0.2, s: 1.12, x: 0, y: 0, e: ease.inOut }, { t: ((c.a_caro + 0.2) + (c.a_adj + 0.4)) / 2 + 0, s: 1.150, x: -7, y: -18, e: ease.inOut }, { t: c.a_adj + 0.4, s: 1.06, x: 15, y: -10, e: ease.inOut }, { t: ((c.a_adj + 0.4) + (c.a_comp + 0.2)) / 2 + 0, s: 1.090, x: 16, y: -18, e: ease.inOut }, { t: c.a_comp + 0.2, s: 1.05, x: -10, y: -15, e: ease.inOut }, { t: ((c.a_comp + 0.2) + (c.a_cons)) / 2 + 0, s: 1.120, x: -13, y: -18, e: ease.inOut }, { t: c.a_cons, s: 1.09, x: 12, y: -25, e: ease.inOut }, { t: ((c.a_cons) + (c.a_mesmo + 0.3)) / 2 + 0, s: 1.120, x: 20, y: -18, e: ease.inOut }, { t: c.a_mesmo + 0.3, s: 1.06, x: 0, y: -35, e: ease.inOut }, { t: c.b_um, s: 1.05, y: -25, e: ease.linear }]}>
        {/* CARO domina e depois sobe */}
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(580, 420, up), textAlign: "center", fontWeight: 800, fontSize: mix(240, 110, up), lineHeight: 1, letterSpacing: "-0.05em", color: C.warn, opacity: fade(caro), transform: `scale(${mix(0.6, 1, Math.min(1.05, caro))})` }}>CARO</div>
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 545, display: "flex", justifyContent: "center", opacity: fade(q) }}><Tag text="COMPARADO COM O QUÊ?" tone="accent" size={30} /></div> : null}
        {ADJ.map((a, i) => (adj[i] > 0.001 && gone < 1 ? (
          <div key={a.w} style={{ position: "absolute", left: a.x, top: a.y, fontWeight: 800, fontSize: 46, color: C.muted, opacity: fade(adj[i]) * (1 - gone), filter: `blur(${gone * 14}px)`, transform: `rotate(${a.r}deg) scale(${mix(0.5, 1, Math.min(1.06, adj[i])) * mix(1, 0.6, gone)}) translateY(${Math.sin(t * 2 + i) * 6 - gone * 40}px)` }}>{a.w}</div>
        ) : null))}
        {CRIT.map((k, i) => {
          const p = crit[i];
          const col = i % 2, row = Math.floor(i / 2);
          return p > 0.001 ? (
            <div key={k.k} style={{ position: "absolute", left: 100 + col * 450, top: 650 + row * 150, width: 430, height: 120, boxSizing: "border-box", borderRadius: 24, background: aa(0.1), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 16, padding: "0 20px", opacity: fade(p), transform: `translateY(${(1 - Math.min(1, p)) * 70}px)` }}>
              <CheckDot p={Math.min(1, p)} size={44} />
              <span style={{ fontWeight: 800, fontSize: i === 3 ? 28 : 32, lineHeight: 1.05, color: C.text }}>{k.k}</span>
            </div>
          ) : null;
        })}
        {same > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 980, textAlign: "center", fontWeight: 800, fontSize: 46, color: C.text, opacity: fade(same), transform: `scale(${mix(1.2, 1, Math.min(1, same))})` }}>Mesmo preço, <span style={{ color: A.hex }}>outra leitura</span></div> : null}
      </Camera>
      <Title p={enter} size={48}>PARE DE REPETIR <span style={{ color: C.warn }}>“OPORTUNIDADE”</span></Title>
    </div>
  );
};

const ROWS = [
  { k: "PREÇO", a: "MAIOR", b: "MENOR", at: "b_um", ga: 0, gb: 0 },
  { k: "MOBILIDADE", a: "PERTO DE TUDO", b: "—", at: "b_mob", ga: 1, gb: 0 },
  { k: "METRAGEM", a: "MENOR", b: "MAIOR", at: "b_metr", ga: 0, gb: 1 },
  { k: "REFORMA", a: "NÃO PRECISA", b: "PRECISA", at: "b_ref", ga: 1, gb: -1 },
];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_um - 0.35, { damping: 15, stiffness: 150 });
  const table = sp(t, c.b_um - 0.25, { damping: 14, stiffness: 170 });
  const rows = ROWS.map((r) => sp(t, c[r.at] - 0.15, { damping: 12, stiffness: 210 }));
  const colB = prog(t, c.b_outro - 0.1, 0.4, ease.out);
  const corr = sp(t, c.b_comparar - 0.2, { damping: 12, stiffness: 200 });
  const nao = sp(t, c.b_naocomp - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.c_prox - 0.4, 0.35, ease.in);
  const cell = (v: string, g: number, p: number) => (
    <div style={{ flex: 1, height: 96, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: g > 0 ? aa(0.12) : g < 0 ? WARN_BG : C.surface2, border: `2px solid ${g > 0 ? A.hex : g < 0 ? "rgba(255,107,94,0.6)" : "transparent"}`, fontWeight: 800, fontSize: 26, color: g > 0 ? A.hex : g < 0 ? C.warn : C.text, opacity: fade(p), transform: `scale(${mix(0.7, 1, Math.min(1.05, p))})` }}>{v}</div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_um - 0.35, s: 1.05, y: 0 }, { t: ((c.b_um - 0.35) + (c.b_mob + 0.2)) / 2 + 0, s: 1.120, x: 23, y: -18, e: ease.inOut }, { t: c.b_mob + 0.2, s: 1.09, x: 18, y: -10, e: ease.inOut }, { t: ((c.b_mob + 0.2) + (c.b_metr + 0.2)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.b_metr + 0.2, s: 1.09, x: -18, y: -20, e: ease.inOut }, { t: ((c.b_metr + 0.2) + (c.b_ref + 0.2)) / 2 + 0, s: 1.130, x: -5, y: -18, e: ease.inOut }, { t: c.b_ref + 0.2, s: 1.1, x: -20, y: -30, e: ease.inOut }, { t: ((c.b_ref + 0.2) + (c.b_comparar + 0.2)) / 2 + 0, s: 1.130, x: -24, y: -18, e: ease.inOut }, { t: c.b_comparar + 0.2, s: 1.04, x: 0, y: -30, e: ease.inOut }, { t: ((c.b_comparar + 0.2) + (c.b_naocomp + 0.2)) / 2 + 0, s: 1.110, x: 14, y: -18, e: ease.inOut }, { t: c.b_naocomp + 0.2, s: 1.08, x: 0, y: -45, e: ease.inOut }, { t: c.c_prox, s: 1.05, y: -35, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 80, right: 80, top: 430, boxSizing: "border-box", padding: "20px 22px", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, opacity: fade(table), transform: `translateY(${(1 - Math.min(1, table)) * 80 + Math.sin(t * 1.4) * 5}px)` }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 230, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>COMPARADOR</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: 800, fontSize: 30, color: C.text }}>APTO 1</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: 800, fontSize: 30, color: C.text, opacity: mix(0.4, 1, colB) }}>APTO 2</div>
          </div>
          {ROWS.map((r, i) => (
            <div key={r.k} style={{ marginTop: 14, display: "flex", gap: 14, alignItems: "center", opacity: mix(0.25, 1, Math.min(1, rows[i] * 2)) }}>
              <div style={{ width: 230, fontWeight: 800, fontSize: 28, color: C.muted }}>{r.k}</div>
              {cell(r.a, rows[i] > 0.5 ? r.ga : 0, rows[i])}
              {cell(r.b, rows[i] > 0.5 ? r.gb : 0, i === 0 ? rows[i] : Math.min(rows[i], 0.3 + colB))}
            </div>
          ))}
          <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}><Tag text="ILUSTRATIVO · SEM VALORES DE MERCADO" tone="muted" size={24} /></div>
        </div>
        {corr > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(corr) * (1 - fade(nao) * 0.3) }}><Tag text="O CORRETOR AJUDA A COMPARAR" tone="accent" size={28} /></div> : null}
        {nao > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: fade(nao), transform: `scale(${mix(0.5, 1, Math.min(1.08, nao))})` }}><Tag text="INCLUSIVE QUANDO NÃO COMPENSA" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={54}>COMPARE <span style={{ color: A.hex }}>O QUE IMPORTA</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_prox - 0.35, { damping: 15, stiffness: 150 });
  const m1 = sp(t, c.c_prox - 0.1, { damping: 12, stiffness: 200 });
  const m2 = sp(t, c.c_peca - 0.1, { damping: 12, stiffness: 200 });
  const m3 = sp(t, c.c_refer + 0.1, { damping: 12, stiffness: 200 });
  const fatos = sp(t, c.c_fatos - 0.2, { damping: 12, stiffness: 200 });
  const chk = [0, 1, 2].map((i) => prog(t, c.c_verif - 0.2 + i * 0.15, 0.3, ease.out));
  const venc = sp(t, c.c_vencer - 0.1, { damping: 11, stiffness: 220 });
  const clara = sp(t, c.c_clara - 0.15, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_perg - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_prox - 0.35, s: 1.05, y: 0 }, { t: ((c.c_prox - 0.35) + (c.c_peca + 0.3)) / 2 + 0, s: 1.120, x: 6, y: -18, e: ease.inOut }, { t: c.c_peca + 0.3, s: 1.09, x: -15, y: -10, e: ease.inOut }, { t: ((c.c_peca + 0.3) + (c.c_refer + 0.3)) / 2 + 0, s: 1.120, x: -14, y: -18, e: ease.inOut }, { t: c.c_refer + 0.3, s: 1.09, x: 15, y: -15, e: ease.inOut }, { t: ((c.c_refer + 0.3) + (c.c_fatos + 0.2)) / 2 + 0, s: 1.120, x: 21, y: -18, e: ease.inOut }, { t: c.c_fatos + 0.2, s: 1.05, x: 0, y: -30, e: ease.inOut }, { t: ((c.c_fatos + 0.2) + (c.c_vencer + 0.2)) / 2 + 0, s: 1.120, x: -9, y: -18, e: ease.inOut }, { t: c.c_vencer + 0.2, s: 1.09, x: 10, y: -45, e: ease.inOut }, { t: ((c.c_vencer + 0.2) + (c.x_perg + 0.2)) / 2 + 0, s: 1.120, x: 19, y: -18, e: ease.inOut }, { t: c.x_perg + 0.2, s: 1.08, x: 0, y: -50, e: ease.inOut }, { t: c.cta_quer, s: 1.05, y: -40, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 445, display: "flex", justifyContent: "center", opacity: fade(m1) }}><Tag text="CONVERSA ILUSTRATIVA" tone="muted" size={24} /></div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 510, display: "flex", flexDirection: "column", gap: 18 }}>
          {m1 > 0.001 ? <div style={{ opacity: fade(m1), transform: `translateY(${(1 - Math.min(1, m1)) * 40}px)` }}><Msg side="in" size={38}>Achei caro.</Msg></div> : null}
          {m2 > 0.001 ? <div style={{ display: "flex", justifyContent: "flex-end", opacity: fade(m2), transform: `scale(${mix(0.6, 1, Math.min(1.06, m2))})`, transformOrigin: "100% 50%" }}><Msg side="out" tone="good" size={38}>Com qual outra opção você está comparando?</Msg></div> : null}
          {m3 > 0.001 ? <div style={{ opacity: fade(m3), transform: `translateY(${(1 - Math.min(1, m3)) * 40}px)` }}><Msg side="in" size={38}>Com um apê no bairro vizinho.</Msg></div> : null}
        </div>
        {fatos > 0.001 ? (
          <div style={{ position: "absolute", left: 130, right: 130, top: 900, boxSizing: "border-box", padding: "16px 22px", borderRadius: 24, background: C.surface, border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 14, opacity: fade(fatos) * (1 - fade(fin) * 0.6), transform: `translateY(${(1 - Math.min(1, fatos)) * 60}px)` }}>
            <span style={{ fontWeight: 800, fontSize: 30, color: C.text, marginRight: 6 }}>FATOS VERIFICADOS</span>
            {chk.map((p, i) => <CheckDot key={i} p={p} size={44} />)}
          </div>
        ) : null}
        {venc > 0.001 ? <div style={{ position: "absolute", left: 130, top: 1030, opacity: fade(venc) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, venc))})`, transformOrigin: "0 50%" }}><Tag text="✕ VENCER A DISCUSSÃO" tone="warn" size={26} /></div> : null}
        {clara > 0.001 ? <div style={{ position: "absolute", right: 130, top: 1030, opacity: fade(clara) * (1 - fade(fin)), transform: `scale(${mix(0.5, 1, Math.min(1.08, clara))})`, transformOrigin: "100% 50%" }}><Tag text="✓ ESCOLHA CLARA" tone="accent" size={26} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1030, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Pergunte <span style={{ color: A.hex }}>antes de rebater</span></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>PERGUNTE ANTES DE</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>CONTRA-ARGUMENTAR</span></Title>
    </div>
  );
};
