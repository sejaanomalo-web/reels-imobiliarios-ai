import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconHome, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_27 — "IA substitui corretor?". Conexão Imobiliária Secovi-SP (nov/2026): painel sobre IA e dados para corretores; tecnologia
 * como apoio. Busca, resultados e chat ILUSTRATIVOS; nenhuma marca de IA real; nenhuma capacidade atribuída à ATIVO; IA pode errar.
 * Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 12) => Math.sin(t * 1.7 + k) * a;
const QUERY = "apartamento 2 quartos perto do metrô";

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const bar = sp(t, -0.2, { damping: 13, stiffness: 170 });
  const typed = Math.floor(QUERY.length * prog(t, 0.2, Math.max(0.8, c.h_cent - 0.4), ease.linear));
  const res = prog(t, c.h_cent - 0.2, Math.max(0.8, c.h_seg - c.h_cent + 0.6), ease.out);
  const q = sp(t, c.h_entao - 0.1, { damping: 10, stiffness: 230 });
  const out = prog(t, c.a_porque - 0.35, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.06, x: 6, y: -6 }, { t: 1.0, s: 1.12, x: -8, y: -14, e: ease.out }, { t: c.h_seg, s: 1.08, x: 8, y: -20, e: ease.linear }, { t: c.h_corr, s: 1.1, x: 0, y: -26, e: ease.linear }, { t: c.a_porque, s: 1.08, y: -28, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, right: 130, top: 490, height: 90, boxSizing: "border-box", borderRadius: 45, background: C.surface, border: `3px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 14, padding: "0 30px", opacity: fade(bar), transform: `translateY(${fl(t, 0, 6)}px)` }}>
          <span style={{ fontSize: 36 }}>✨</span>
          <span style={{ fontWeight: 700, fontSize: 30, color: C.text, whiteSpace: "nowrap", overflow: "hidden" }}>{QUERY.slice(0, typed)}<span style={{ opacity: Math.sin(t * 10) > 0 ? 1 : 0, color: A.hex }}>|</span></span>
        </div>
        <div style={{ position: "absolute", left: 130, right: 130, top: 610, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, opacity: fade(res) * mix(1, 0.4, Math.min(1, q)) }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ height: 92, borderRadius: 14, background: C.surface2, border: `2px solid ${C.surface3}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${Math.min(1, Math.max(0, res * 20 - i))}) translateY(${Math.sin(t * 3 + i) * 5}px)` }}><IconHome size={40} color={C.muted} /></div>
          ))}
        </div>
        {res > 0.05 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center", gap: 12, opacity: fade(res) * (1 - fade(q)) }}><Tag text="CENTENAS DE RESULTADOS" tone="accent" size={26} /><Tag text="EM SEGUNDOS" tone="muted" size={26} /></div> : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1020, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, opacity: fade(q), transform: `scale(${mix(0.5, 1, Math.min(1.08, q))})` }}><Person size={70} t={t} color={C.text} /><span style={{ fontWeight: 800, fontSize: 52, color: C.text }}>E O CORRETOR<span style={{ color: C.warn }}>?</span></span></div> : null}
        <div style={{ position: "absolute", right: 130, top: 450, opacity: fade(bar) * 0.9 }}><Tag text="BUSCA ILUSTRATIVA" tone="muted" size={24} /></div>
      </Camera>
      <Title p={title} size={58}>IA VAI <span style={{ color: A.hex }}>SUBSTITUIR?</span></Title>
    </div>
  );
};

const FILT = [{ k: "PREÇO", at: "a_preco" }, { k: "LOCALIZAÇÃO", at: "a_loc" }, { k: "METRAGEM", at: "a_metr" }, { k: "PREFERÊNCIAS", at: "a_pref" }];
const DOUBT = [{ k: "Como fica minha rotina?", at: "a_rot" }, { k: "A documentação está ok?", at: "a_doc" }, { k: "Quais são os riscos?", at: "a_risc" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_porque - 0.35, { damping: 15, stiffness: 150 });
  const split = sp(t, c.a_enc - 0.2, { damping: 13, stiffness: 170 });
  const fs = FILT.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const ds = DOUBT.map((x) => sp(t, c[x.at] - 0.2, { damping: 11, stiffness: 220 }));
  const who = sp(t, c.a_mas - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.b_deb - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_porque - 0.35, s: 1.05, y: 0 }, { t: c.a_porque + 0.8, s: 1.08, x: -6, y: -8, e: ease.out }, { t: c.a_pref, s: 1.06, x: 8, y: -14, e: ease.linear }, { t: c.a_risc, s: 1.08, x: -6, y: -20, e: ease.linear }, { t: c.b_deb, s: 1.06, y: -26, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 100, top: 480, width: 400, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${A.hex}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, opacity: fade(split), transform: `translateY(${(1 - Math.min(1, split)) * 50 + fl(t, 0)}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: A.hex }}>🔎 BUSCAR</span>
          {FILT.map((f, i) => (
            <div key={f.k} style={{ height: 70, borderRadius: 16, background: fs[i] > 0.5 ? aa(0.1) : C.surface2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", opacity: mix(0.35, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 30 + Math.sin(t * 2.2 + i) * 6}px)` }}>
              <span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{f.k}</span>
              <span style={{ fontWeight: 800, fontSize: 30, color: A.hex, opacity: fade(fs[i]) }}>✓</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 540, top: 480, width: 440, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${C.text}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, opacity: fade(split), transform: `translateY(${(1 - Math.min(1, split)) * 50 + fl(t, 2)}px) rotate(${Math.sin(t * 1.2 + 1) * 1.5}deg)` }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text }}>🧭 ORIENTAR</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: fade(who) }}><Person size={56} t={t} color={C.text} /><span style={{ fontWeight: 800, fontSize: 26, color: C.muted }}>CLIENTE</span></div>
          {DOUBT.map((d, i) => ds[i] > 0.001 ? <div key={d.k} style={{ opacity: fade(ds[i]), transform: `translateY(${(1 - Math.min(1, ds[i])) * 20 + Math.sin(t * 2.4 + i) * 5}px)` }}><Msg side="in" tone="warn" size={26}>{d.k}</Msg></div> : null)}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: fade(ds[2]) }}><Tag text="FILTRO NÃO RESPONDE ISSO" tone="warn" size={28} /></div>
      </Camera>
      <Title p={enter} size={60}>BUSCAR <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>ORIENTAR</span></Title>
    </div>
  );
};

const VER = [{ k: "MATRÍCULA", at: "b_verif" }, { k: "DADOS DO ANÚNCIO", at: "b_verif" }, { k: "ESTADO DO IMÓVEL", at: "b_comp" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_deb - 0.35, { damping: 15, stiffness: 150 });
  const deb = sp(t, c.b_deb - 0.1, { damping: 12, stiffness: 200 });
  const card = sp(t, c.b_tec - 0.2, { damping: 13, stiffness: 180 });
  const err = sp(t, c.b_errar - 0.2, { damping: 10, stiffness: 230 });
  const vs = VER.map((x, i) => sp(t, c[x.at] - 0.2 + i * 0.35, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.c_corr - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_deb - 0.35, s: 1.05, y: 0 }, { t: c.b_deb + 0.8, s: 1.08, x: 6, y: -8, e: ease.out }, { t: c.b_errar, s: 1.1, x: 0, y: -14, e: ease.out }, { t: c.b_verif, s: 1.06, x: -6, y: -20, e: ease.linear }, { t: c.c_corr, s: 1.06, y: -24, e: ease.linear }]}>
        {deb > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", opacity: fade(deb) }}><Tag text="DEBATES DO SETOR · SECOVI-SP · NOV/2026" tone="muted" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 200, right: 200, top: 540, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${err > 0.5 ? "rgba(255,107,94,0.7)" : A.hex}`, padding: "18px 22px", opacity: fade(card), transform: `translateY(${(1 - Math.min(1, card)) * 50 + fl(t, 0)}px) rotate(${Math.sin(t * 1.3) * 1.5}deg) translateX(${err > 0.3 && err < 1.2 ? Math.sin(t * 40) * 4 : 0}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><IconHome size={54} color={A.hex} /><div style={{ flex: 1 }}><div style={{ height: 14, borderRadius: 7, background: C.surface3, width: "80%" }} /><div style={{ height: 12, borderRadius: 6, background: C.surface3, width: "50%", marginTop: 10 }} /></div></div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}><Tag text="✨ POSSÍVEL OPÇÃO" tone="accent" size={26} /><Tag text="APOIO À SELEÇÃO" tone="muted" size={24} /></div>
          {err > 0.001 ? <div style={{ marginTop: 14, opacity: fade(err), padding: "10px 14px", borderRadius: 14, background: WARN_BG }}><span style={{ fontWeight: 800, fontSize: 26, color: C.warn }}>⚠ RESPOSTA AUTOMÁTICA PODE ERRAR</span></div> : null}
        </div>
        <div style={{ position: "absolute", left: 200, right: 200, top: 880, display: "flex", flexDirection: "column", gap: 10 }}>
          {VER.map((v, i) => vs[i] > 0.001 ? (
            <div key={v.k} style={{ height: 64, borderRadius: 16, background: aa(0.08), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", opacity: fade(vs[i]), transform: `translateX(${(1 - Math.min(1, vs[i])) * 40 + Math.sin(t * 2 + i) * 6}px)` }}>
              <span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{v.k}</span><span style={{ fontWeight: 800, fontSize: 24, color: A.hex }}>✓ VERIFICADO</span>
            </div>
          ) : null)}
        </div>
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>AUTOMAÇÃO <span style={{ color: C.warn }}>NÃO DISPENSA</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>VERIFICAÇÃO</span></Title>
    </div>
  );
};

const HUM = [{ k: "JULGAMENTO", at: "c_julg" }, { k: "RESPONSABILIDADE", at: "c_resp" }, { k: "RELACIONAMENTO", at: "c_rel" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_corr - 0.35, { damping: 15, stiffness: 150 });
  const sp1 = sp(t, c.c_corr - 0.1, { damping: 13, stiffness: 170 });
  const fast = sp(t, c.c_vel - 0.2, { damping: 11, stiffness: 220 });
  const tool = sp(t, c.c_ferr - 0.2, { damping: 12, stiffness: 200 });
  const hs = HUM.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const fin = sp(t, c.x_tec - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const rows = [0, 1, 2, 3, 4].map((i) => ((i * 3 + Math.floor(t * 2)) % 5));
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_corr - 0.35, s: 1.05, y: 0 }, { t: c.c_corr + 0.9, s: 1.08, x: 6, y: -8, e: ease.out }, { t: c.c_ferr, s: 1.06, x: -6, y: -14, e: ease.linear }, { t: c.c_rel, s: 1.08, x: 6, y: -20, e: ease.linear }, { t: c.x_prof + 0.3, s: 1.05, y: -26, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 100, top: 490, width: 400, height: 470, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${C.surface3}`, padding: "16px 18px", opacity: fade(sp1) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - Math.min(1, sp1)) * 50 + fl(t, 0)}px)` }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>⚙️ FERRAMENTA</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            {rows.map((r, i) => <div key={i} style={{ height: 50, borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", transform: `translateX(${Math.sin(t * 6 + i) * 6 * Math.min(1, fast)}px)` }}><div style={{ width: 22, height: 22, borderRadius: 6, background: r < 2 ? A.hex : C.surface3 }} /><div style={{ flex: 1, height: 10, borderRadius: 5, background: C.surface3, width: `${50 + r * 10}%` }} /></div>)}
          </div>
          {tool > 0.001 ? <div style={{ marginTop: 12, opacity: fade(tool) }}><Tag text="⏱ GANHA TEMPO" tone="accent" size={24} /></div> : null}
        </div>
        <div style={{ position: "absolute", left: 540, top: 490, width: 440, height: 470, boxSizing: "border-box", borderRadius: 26, background: aa(0.06), border: `2px solid ${A.hex}`, padding: "16px 18px", opacity: fade(sp1) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - Math.min(1, sp1)) * 50 + fl(t, 2)}px)` }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: A.hex }}>🤝 PROFISSIONAL</span>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 14 }}><Person size={64} t={t} color={A.hex} /><Person size={64} t={t + 1} color={C.text} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {HUM.map((h, i) => <div key={h.k} style={{ opacity: mix(0.25, 1, Math.min(1, hs[i] * 2)), transform: `scale(${mix(0.85, 1, Math.min(1, hs[i]))}) translateX(${Math.sin(t * 2.2 + i) * 6}px)` }}><Tag text={h.k} tone={hs[i] > 0.5 ? "accent" : "muted"} size={26} /></div>)}
          </div>
        </div>
        {fast > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: fade(fast) * (1 - fade(fin)) }}><Tag text="NÃO COMPETE COM A VELOCIDADE DA MÁQUINA" tone="muted" size={24} /></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 54, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Tecnologia apoia,<br /><span style={{ color: A.hex }}>profissional orienta</span></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>TECNOLOGIA APOIA</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>PROFISSIONAL ORIENTA</span></Title>
    </div>
  );
};
