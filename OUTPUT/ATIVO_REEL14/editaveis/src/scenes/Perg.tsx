import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Pro, SPECS, SpecCard, Tag } from "./ui";

/**
 * CENA 3 — A PERGUNTA. "No segundo, a pergunta vem antes: o que mudou na rotina de vocês?" → pausa; a pergunta ocupa a tela. "A resposta
 * pode ser trabalho remoto, chegada de um filho ou necessidade de ficar mais perto da família." → três cenários possíveis (ilustrativos, sem
 * família identificável). "Só agora faz sentido destacar o que realmente atende a esse momento." → os cartões da ficha voltam: a maioria
 * apaga e só o que atende o momento acende. Texto-chave: O QUE MUDOU NA ROTINA?
 */
const SCN = [
  { k: "TRABALHO REMOTO", ico: "⌂" },
  { k: "CHEGADA DE UM FILHO", ico: "+1" },
  { k: "PERTO DA FAMÍLIA", ico: "↔" },
];

export const Perg: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.q_no - 0.35, { damping: 15, stiffness: 150 });
  const big = sp(t, c.q_antes - 0.1, { damping: 13, stiffness: 160 });
  const shrink = prog(t, c.q_resp - 0.3, 0.6, ease.inOut);
  const scn = [c.q_trab, c.q_filho, c.q_perto].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const dest = prog(t, c.q_so - 0.2, 0.6, ease.inOut);
  const pick = sp(t, c.q_dest, { damping: 12, stiffness: 190 });
  const out = prog(t, c.p_conh - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.q_no - 0.35, s: 1.04, y: 0 },
          { t: ((c.q_no - 0.35) + (c.q_antes + 0.2)) / 2, s: 1.065, x: 12, y: -18, e: ease.inOut },
          { t: c.q_antes + 0.2, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: ((c.q_antes + 0.2) + (c.q_mudou + 0.4)) / 2, s: 1.125, x: -12, y: -18, e: ease.inOut },
          { t: c.q_mudou + 0.4, s: 1.1, x: 0, y: -20, e: ease.inOut },
          { t: ((c.q_mudou + 0.4) + (c.q_trab + 0.2)) / 2, s: 1.125, x: 12, y: -18, e: ease.inOut },
          { t: c.q_trab + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: ((c.q_trab + 0.2) + (c.q_filho + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.q_filho + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.q_filho + 0.2) + (c.q_perto + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.q_perto + 0.2, s: 1.05, x: 15, y: -10, e: ease.inOut },
          { t: ((c.q_perto + 0.2) + (c.q_dest + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.q_dest + 0.3, s: 1.09, x: 0, y: -20, e: ease.inOut },
          { t: c.p_conh, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", gap: 12, opacity: Math.min(1, enter * 1.5) }}>
          <Tag text="CENA ILUSTRATIVA" tone="muted" size={24} style={{ color: C.text }} />
          <Tag text="2º ATENDIMENTO" tone="accent" size={24} />
        </div>
        <div style={{ position: "absolute", left: 90, top: mix(480, 470, shrink), opacity: mix(1, 0.8, dest) }}><Pro who="B" size={mix(150, 120, shrink)} glow={1} /></div>
        {/* a pergunta */}
        {big > 0.001 ? (
          <div style={{ position: "absolute", left: mix(120, 260, shrink), right: mix(120, 90, shrink), top: mix(640, 470, shrink), boxSizing: "border-box", padding: `${mix(40, 22, shrink)}px ${mix(40, 26, shrink)}px`, borderRadius: 36, borderBottomLeftRadius: 8, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, opacity: Math.min(1, big * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1.04, big))}) translateY(${Math.sin(t * 1.6) * 6}px)`, boxShadow: `0 0 ${50 * (1 - shrink)}px ${brandAlpha(0.35)}` }}>
            <div style={{ fontWeight: 800, fontSize: mix(76, 44, shrink), lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text }}>O que mudou na <span style={{ color: BRAND.hex }}>rotina</span> de vocês?</div>
          </div>
        ) : null}
        {/* três cenários */}
        {dest < 1 ? SCN.map((s, i) => (scn[i] > 0.001 ? (
          <div key={s.k} style={{ position: "absolute", left: 100 + i * 300, top: 700, width: 280, height: 300, boxSizing: "border-box", padding: 20, borderRadius: 28, background: C.surface, border: `2px solid ${brandAlpha(0.5)}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: Math.min(1, scn[i] * 1.5) * (1 - dest), transform: `translateY(${(1 - Math.min(1, scn[i])) * 100 + Math.sin(t * 1.8 + i) * 8}px) scale(${mix(0.6, 1, Math.min(1.05, scn[i]))})` }}>
            <div style={{ width: 110, height: 110, borderRadius: 55, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 48, color: BRAND.hex }}>{s.ico}</div>
            <div style={{ fontWeight: 800, fontSize: 30, color: C.text, textAlign: "center", lineHeight: 1.1 }}>{s.k}</div>
          </div>
        ) : null)) : null}
        {scn[0] > 0.5 && dest < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: 1 - dest }}><Tag text="POSSÍVEIS RESPOSTAS" tone="muted" size={24} /></div> : null}
        {/* só agora: destacar */}
        {dest > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 700, opacity: dest }}>
            {SPECS.map((s, i) => <div key={s} style={{ marginTop: i ? 12 : 0, transform: `translateX(${(1 - dest) * (i % 2 ? 80 : -80)}px)` }}><SpecCard text={s} w={840} dim={pick} /></div>)}
            {pick > 0.001 ? <div style={{ marginTop: 16, opacity: Math.min(1, pick * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1.05, pick)) * (1 + 0.02 * Math.sin(t * 4))})` }}><SpecCard text="O QUE ATENDE ESTE MOMENTO" w={840} lit={1} /></div> : null}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PRIMEIRO, <span style={{ color: BRAND.hex }}>A PERGUNTA</span>
      </div>
    </div>
  );
};
