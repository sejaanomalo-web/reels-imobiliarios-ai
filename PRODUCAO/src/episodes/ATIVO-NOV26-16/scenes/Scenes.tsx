import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconDoc, IconHome, Msg, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_16 — "Compra Assistida: o que realmente é". Portaria MCID nº 1.519 (05/11/2026): Compra Assistida do MCMV para famílias
 * de localidades com emergência/calamidade reconhecida e removidas por obras federais. Não é benefício universal, venda comum nem crédito
 * para todos. Sem valores ou prazos. Mapa ESQUEMÁTICO, story e documento ILUSTRATIVOS. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const card = sp(t, -0.15, { damping: 13, stiffness: 160 });
  const crowd = prog(t, 0.2, 4.0, ease.linear);
  const gate = sp(t, c.h_mas - 0.1, { damping: 10, stiffness: 230 });
  const cross = sp(t, c.h_qualq - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, c.a_reg - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={3} t={t} keys={[{ t: 0, s: 1.1, y: -20 }, { t: 1.0, s: 1.16, x: 10, y: -22, e: ease.out }, { t: c.h_mas, s: 1.1, x: -10, y: -20, e: ease.linear }, { t: c.h_qualq + 0.4, s: 1.05, x: 0, y: -35, e: ease.inOut }, { t: c.a_reg, s: 1.09, y: -40, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 190, right: 190, top: 430, height: 300, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${A.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: fade(card), transform: `translateY(${(1 - Math.min(1, card)) * 60 + Math.sin(t * 1.5) * 10}px)`, boxShadow: `0 0 ${30 + 10 * Math.sin(t * 3)}px ${aa(0.2)}` }}>
          <IconHome size={110} color={A.hex} />
          <span style={{ fontWeight: 800, fontSize: 44, color: C.text }}>COMPRA ASSISTIDA</span>
          <Tag text="MODALIDADE DO MCMV" tone="muted" size={24} />
        </div>
        {/* várias pessoas caminhando até o cartão */}
        {Array.from({ length: 6 }).map((_, i) => {
          const ph = (crowd + i / 6) % 1;
          const x = 120 + i * 150 + Math.sin(t * 2 + i) * 8, y = mix(1150, 800, gate > 0.5 ? Math.min(ph, 0.55) : ph);
          return <div key={i} style={{ position: "absolute", left: x, top: y, opacity: fade(card) * (1 - ph * 0.6), transform: `translateY(${-Math.abs(Math.sin(t * 8 + i)) * 8}px)` }}><Person size={80} t={t + i} color={i % 2 ? C.text : "#B8C0CC"} /></div>;
        })}
        {gate > 0.001 ? <div style={{ position: "absolute", left: 100, right: 100, top: 760, height: 14, borderRadius: 7, background: `repeating-linear-gradient(90deg, ${C.warn} 0 40px, ${C.surface3} 40px 80px)`, opacity: fade(gate), transform: `scaleX(${mix(0.2, 1, Math.min(1, gate))})` }} /> : null}
        {cross > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", opacity: fade(cross), transform: `scale(${mix(0.5, 1, Math.min(1.08, cross))}) rotate(-2deg)` }}><Tag text="✕ PARA QUALQUER COMPRADOR" tone="warn" size={34} /></div> : null}
      </Camera>
      <Title p={title} size={62}>COMPRA <span style={{ color: A.hex }}>ASSISTIDA</span></Title>
    </div>
  );
};

const CELLS = Array.from({ length: 30 }).map((_, i) => ({ col: i % 6, row: Math.floor(i / 6), kind: i === 8 || i === 21 ? "cal" : i === 15 ? "obra" : i === 26 ? "cal" : "" }));

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_reg - 0.35, { damping: 15, stiffness: 150 });
  const map = sp(t, c.a_reg - 0.2, { damping: 13, stiffness: 170 });
  const doc = sp(t, c.a_nov - 0.15, { damping: 12, stiffness: 200 });
  const esp = sp(t, c.a_espec - 0.15, { damping: 11, stiffness: 220 });
  const cal = sp(t, c.a_emerg - 0.15, { damping: 11, stiffness: 220 });
  const ob = sp(t, c.a_obras - 0.15, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_imag - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3} t={t} keys={[{ t: c.a_reg - 0.35, s: 1.08, y: 0 }, { t: c.a_reg + 0.8, s: 1.13, x: 10, y: -10, e: ease.out }, { t: c.a_espec, s: 1.07, x: -10, y: -15, e: ease.linear }, { t: c.a_emerg + 0.3, s: 1.12, x: -15, y: -20, e: ease.linear }, { t: c.a_obras + 0.3, s: 1.08, x: 15, y: -30, e: ease.inOut }, { t: c.b_imag, s: 1.06, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", gap: 12, opacity: fade(doc) }}><Tag text="PORTARIA MCID Nº 1.519 · NOV/2026" tone="muted" size={24} /></div>
        <div style={{ position: "absolute", left: 180, top: 490, width: 720, opacity: fade(map) }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {CELLS.map((x, i) => {
              const on = x.kind === "cal" ? cal : x.kind === "obra" ? ob : 0;
              const col = x.kind === "obra" ? "#B8C0CC" : C.warn;
              return (
                <div key={i} style={{ height: 84, borderRadius: 14, background: on > 0.5 ? (x.kind === "obra" ? "rgba(184,192,204,0.16)" : WARN_BG) : C.surface2, border: `2px solid ${on > 0.5 ? col : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, opacity: mix(0.5 + 0.2 * rnd(i), 1, Math.min(1, on)), transform: `scale(${on > 0.5 ? 1 + 0.05 * Math.sin(t * 5 + i) : 1})` }}>
                  {on > 0.5 ? (x.kind === "obra" ? "🚧" : "⚠️") : ""}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, textAlign: "right" }}><Tag text="MAPA ESQUEMÁTICO" tone="muted" size={24} /></div>
        </div>
        <div style={{ position: "absolute", left: 100, right: 100, top: 1060, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {cal > 0.001 ? <div style={{ opacity: fade(cal) }}><Tag text="⚠ EMERGÊNCIA OU CALAMIDADE RECONHECIDA" tone="warn" size={24} /></div> : null}
          {ob > 0.001 ? <div style={{ opacity: fade(ob) }}><Tag text="🚧 OBRAS PÚBLICAS" tone="muted" size={24} /></div> : null}
        </div>
        {esp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1170, display: "flex", justifyContent: "center", opacity: fade(esp) }}><Tag text="SITUAÇÕES ESPECÍFICAS" tone="accent" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={50}>NÃO É <span style={{ color: C.warn }}>BENEFÍCIO UNIVERSAL</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_imag - 0.35, { damping: 15, stiffness: 150 });
  const story = sp(t, c.b_imag - 0.1, { damping: 13, stiffness: 170 });
  const claim = sp(t, c.b_benef - 0.2, { damping: 11, stiffness: 220 });
  const chama = sp(t, c.b_chama - 0.15, { damping: 12, stiffness: 200 });
  const plan = sp(t, c.b_planos - 0.1, { damping: 12, stiffness: 200 });
  const no = sp(t, c.b_enq - 0.15, { damping: 11, stiffness: 220 });
  const stamp = sp(t, c.b_curio - 0.1, { damping: 10, stiffness: 240 });
  const back = sp(t, c.b_ctx - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.c_regra - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3} t={t} keys={[{ t: c.b_imag - 0.35, s: 1.06, y: 0 }, { t: c.b_imag + 0.8, s: 1.12, x: -10, y: -10, e: ease.out }, { t: c.b_planos, s: 1.07, x: 10, y: -15, e: ease.linear }, { t: c.b_enq + 0.3, s: 1.1, x: 10, y: -20, e: ease.linear }, { t: c.b_curio + 0.3, s: 1.04, x: 0, y: -25, e: ease.inOut }, { t: c.c_regra, s: 1.07, y: -35, e: ease.linear }]}>
        {/* story fictício */}
        <div style={{ position: "absolute", left: 120, top: 440, width: 380, height: 640, boxSizing: "border-box", borderRadius: 34, background: `linear-gradient(170deg, #3A2A5A, #1A1530)`, border: `4px solid ${C.surface3}`, padding: 22, opacity: fade(story) * mix(1, 0.5, back), transform: `translateY(${(1 - Math.min(1, story)) * 60 + Math.sin(t * 1.4) * 8}px) rotate(${-2 + Math.sin(t * 1.1)}deg)` }}>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.35)" }}><div style={{ width: `${Math.min(100, ((t - c.b_imag) / 6) * 100)}%`, height: "100%", borderRadius: 3, background: "#fff" }} /></div>
          <div style={{ marginTop: 14, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "rgba(255,255,255,0.7)" }}>STORY FICTÍCIO</div>
          {claim > 0.001 ? <div style={{ marginTop: 60, fontWeight: 800, fontSize: 52, lineHeight: 1.05, color: "#fff", textAlign: "center", opacity: fade(claim), transform: `scale(${mix(0.6, 1, Math.min(1.08, claim))})` }}>NOVO BENEFÍCIO<br />PARA TODO MUNDO! 🏠</div> : null}
          {stamp > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", opacity: fade(stamp), transform: `scale(${mix(2, 1, Math.min(1, stamp))}) rotate(-10deg)` }}><Tag text="NÃO FAÇA" tone="warn" size={46} /></div> : null}
        </div>
        <div style={{ position: "absolute", left: 540, right: 90, top: 470, display: "flex", flexDirection: "column", gap: 18 }}>
          {chama > 0.001 ? <div style={{ display: "flex", alignItems: "flex-end", gap: 10, opacity: fade(chama), transform: `translateX(${(1 - Math.min(1, chama)) * 60}px)` }}><Person size={64} t={t} /><Msg side="in" size={30}>Quero participar!</Msg></div> : null}
          {plan > 0.001 ? <div style={{ opacity: fade(plan) * (1 - fade(no) * 0.5) }}><Msg side="in" size={30}>Já vou planejar a mudança.</Msg></div> : null}
          {no > 0.001 ? <div style={{ opacity: fade(no), transform: `scale(${mix(0.5, 1, Math.min(1.08, no))})` }}><Tag text="✕ NÃO SE ENQUADRA" tone="warn" size={28} /></div> : null}
        </div>
        {back > 0.001 ? (
          <div style={{ position: "absolute", left: 560, right: 100, top: 830, height: 220, boxSizing: "border-box", borderRadius: 24, background: C.surface, border: `2px solid ${A.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: fade(back), transform: `translateY(${(1 - Math.min(1, back)) * 60}px)` }}>
            <IconDoc size={60} />
            <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>DOCUMENTO OFICIAL</span>
            <span style={{ fontWeight: 600, fontSize: 24, color: A.hex }}>o contexto</span>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={58}>NÃO <span style={{ color: C.warn }}>GENERALIZE</span></Title>
    </div>
  );
};

const CARDS = [
  { k: "QUEM", s: "pode participar", at: "c_quem" },
  { k: "ONDE", s: "se aplica", at: "c_onde" },
  { k: "COMO", s: "funciona o encaminhamento", at: "c_como" },
];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_regra - 0.35, { damping: 15, stiffness: 150 });
  const doc = sp(t, c.c_regra - 0.2, { damping: 13, stiffness: 170 });
  const split = prog(t, c.c_quem - 0.3, 0.6, ease.inOut);
  const cards = CARDS.map((x) => sp(t, c[x.at] - 0.15, { damping: 12, stiffness: 210 }));
  const lim = sp(t, c.c_limite - 0.15, { damping: 11, stiffness: 220 });
  const serv = sp(t, c.c_serv - 0.15, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_coment - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={3} t={t} keys={[{ t: c.c_regra - 0.35, s: 1.06, y: 0 }, { t: c.c_regra + 0.9, s: 1.13, x: 0, y: -10, e: ease.out }, { t: c.c_onde, s: 1.07, x: -12, y: -15, e: ease.linear }, { t: c.c_enc + 0.3, s: 1.07, x: 12, y: -25, e: ease.linear }, { t: c.c_serv + 0.3, s: 1.05, x: 0, y: -40, e: ease.inOut }, { t: c.x_port, s: 1.09, x: 0, y: -45, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -40, e: ease.linear }]}>
        {split < 1 ? (
          <div style={{ position: "absolute", left: 320, top: 440, width: 440, height: 560, boxSizing: "border-box", borderRadius: 22, background: "#F2F2EE", padding: "26px 28px", opacity: fade(doc) * (1 - split), transform: `translateY(${(1 - Math.min(1, doc)) * 60 + Math.sin(t * 1.4) * 8}px) scale(${mix(1, 0.7, split)}) rotate(${Math.sin(t * 1.1) * 1.5}deg)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#666" }}>PORTARIA · ILUSTRATIVO</div>
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 36, color: "#151515" }}>REGRA NOVA</div>
            {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ marginTop: 18, height: 12, width: `${60 + rnd(i * 7) * 35}%`, borderRadius: 6, background: "#CFCFC8" }} />)}
          </div>
        ) : null}
        {split > 0.001 ? (
          <div style={{ position: "absolute", left: 250, right: 250, top: 830, height: 180, boxSizing: "border-box", borderRadius: 20, background: "#F2F2EE", padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, opacity: fade(split), transform: `translateY(${(1 - Math.min(1, split)) * -200 + Math.sin(t * 1.5) * 8}px) rotate(${Math.sin(t * 1.1) * 1.5}deg)` }}>
            <IconDoc size={70} color="#151515" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#555" }}>PORTARIA MCID Nº 1.519</span>
              <span style={{ fontWeight: 800, fontSize: 30, color: "#151515" }}>leia antes de comentar</span>
            </div>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 90, right: 90, top: 470, display: "flex", gap: 16 }}>
          {CARDS.map((x, i) => (
            <div key={x.k} style={{ flex: 1, height: 300, boxSizing: "border-box", borderRadius: 26, background: cards[i] > 0.5 ? aa(0.1) : C.surface, border: `2px solid ${cards[i] > 0.5 ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 14, opacity: fade(split) * mix(0.45, 1, Math.min(1, cards[i] * 2)), transform: `translateY(${(1 - Math.min(1, split)) * 80 + Math.sin(t * 1.8 + i) * 6}px) scale(${mix(0.9, 1, Math.min(1.05, cards[i]))})` }}>
              <span style={{ fontWeight: 800, fontSize: 52, color: cards[i] > 0.5 ? A.hex : C.muted }}>{x.k}</span>
              <span style={{ fontWeight: 600, fontSize: 24, color: C.text, textAlign: "center", opacity: fade(cards[i]) }}>{x.s}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", gap: 14, opacity: 1 - fade(fin) }}>
          {lim > 0.001 ? <div style={{ opacity: fade(lim), transform: `scale(${mix(0.5, 1, Math.min(1.08, lim))})` }}><Tag text="O LIMITE DA NOTÍCIA" tone="warn" size={28} /></div> : null}
          {serv > 0.001 ? <div style={{ opacity: fade(serv), transform: `scale(${mix(0.5, 1, Math.min(1.08, serv))})` }}><Tag text="✓ BOM SERVIÇO" tone="accent" size={28} /></div> : null}
        </div>
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1050, textAlign: "center", fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin))})` }}>Antes de comentar,<br /><span style={{ color: A.hex }}>consulte a portaria</span></div> : null}
      </Camera>
      <Title p={enter} size={56}>CONTEXTO <span style={{ color: A.hex }}>É ORIENTAÇÃO</span></Title>
    </div>
  );
};
