import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, CheckDot, People, Pro, Tag } from "./ui";

/**
 * CENA 3 — CLAREZA (equipe B). "No outro atendimento, o profissional começa perguntando qual é a maior dúvida." → B: "Qual sua maior
 * dúvida?". "A pessoa quer saber se pode financiar." → comprador: "Posso financiar?". "Então eles combinam o primeiro passo: verificar
 * condições com a instituição responsável. Depois, avaliar opções compatíveis e só então organizar visitas." → trilha PERGUNTA → VIABILIDADE
 * → OPÇÕES → VISITA, acesa etapa por etapa (sem promessa de aprovação). Texto-chave: UM PASSO DE CADA VEZ.
 */
const NODES = [
  { k: "PERGUNTA", sub: "maior dúvida" },
  { k: "VIABILIDADE", sub: "condições" },
  { k: "OPÇÕES", sub: "compatíveis" },
  { k: "VISITA", sub: "só então" },
];

export const Cla: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_no - 0.35, { damping: 15, stiffness: 150 });
  const b1 = sp(t, c.c_perg - 0.2, { damping: 12, stiffness: 200 });
  const b2 = sp(t, c.c_fin - 0.5, { damping: 12, stiffness: 200 });
  const at = [c.c_duv, c.c_verif, c.c_opc, c.c_vis];
  const on = at.map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const note = sp(t, c.c_inst - 0.4, { damping: 12, stiffness: 190 });
  const key = sp(t, c.c_opc + 0.4, { damping: 13, stiffness: 180 });
  const out = prog(t, c.l_dif - 0.45, 0.4, ease.in);
  const X0 = 110, STEP = 225;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.c_no - 0.35, s: 1.05, y: 0 },
          { t: ((c.c_no - 0.35) + (c.c_perg + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.c_perg + 0.2, s: 1.09, x: -15, y: -15, e: ease.inOut },
          { t: ((c.c_perg + 0.2) + (c.c_duv + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.c_duv + 0.2, s: 1.05, x: -10, y: -10, e: ease.inOut },
          { t: ((c.c_duv + 0.2) + (c.c_fin + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.c_fin + 0.2, s: 1.09, x: 15, y: -15, e: ease.inOut },
          { t: ((c.c_fin + 0.2) + (c.c_prim + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.c_prim + 0.2, s: 1.05, x: 0, y: -5, e: ease.inOut },
          { t: ((c.c_prim + 0.2) + (c.c_verif + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.c_verif + 0.2, s: 1.09, x: -10, y: -15, e: ease.inOut },
          { t: ((c.c_verif + 0.2) + (c.c_inst + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.c_inst + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.c_inst + 0.3) + (c.c_opc + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.c_opc + 0.2, s: 1.09, x: 10, y: -15, e: ease.inOut },
          { t: ((c.c_opc + 0.2) + (c.c_vis + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.c_vis + 0.2, s: 1.09, x: 15, y: -20, e: ease.inOut },
          { t: c.l_dif, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="EQUIPE B" tone="accent" size={26} />
          <Tag text="CENA ILUSTRATIVA" tone="muted" size={24} />
        </div>
        {/* conversa */}
        <div style={{ position: "absolute", left: 110, top: 500, transform: `translateY(${Math.sin(t * 1.5) * 6}px)` }}><Pro who="B" size={140} glow={1} /></div>
        <div style={{ position: "absolute", left: 830, top: 500, padding: "10px 14px 4px", borderRadius: 22, background: C.surface, border: `2px solid ${C.line}`, transform: `translateY(${Math.sin(t * 1.5 + 2) * 6}px)` }}><People n={1} size={110} /></div>
        {b1 > 0.001 ? <div style={{ position: "absolute", left: 270, top: 500, opacity: Math.min(1, b1 * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, b1))})`, transformOrigin: "0 100%" }}><Bubble text="Qual sua maior dúvida?" tone="good" size={34} /></div> : null}
        {b2 > 0.001 ? <div style={{ position: "absolute", right: 270, top: 600, opacity: Math.min(1, b2 * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, b2))})`, transformOrigin: "100% 100%" }}><Bubble text="Posso financiar?" size={34} style={{ borderBottomLeftRadius: 27, borderBottomRightRadius: 8 }} /></div> : null}
        {/* trilha */}
        <div style={{ position: "absolute", left: X0 + 60, top: 838, width: STEP * 3, height: 10, borderRadius: 5, background: C.surface3 }} />
        <div style={{ position: "absolute", left: X0 + 60, top: 838, width: STEP * 3 * Math.min(1, on.filter((x) => x > 0.5).length > 0 ? (on.filter((x) => x > 0.5).length - 1) / 3 : 0), height: 10, borderRadius: 5, background: BRAND.hex, boxShadow: `0 0 14px ${brandAlpha(0.5)}` }} />
        {NODES.map((n, i) => {
          const p = on[i];
          return (
            <div key={n.k} style={{ position: "absolute", left: X0 + i * STEP - 40, top: 780, width: 200, display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${p > 0.5 ? Math.sin(t * 2.4 + i) * 6 : 0}px)` }}>
              <CheckDot p={Math.min(1, p)} size={120} n={i + 1} />
              <div style={{ marginTop: 12, fontWeight: 800, fontSize: 30, color: p > 0.5 ? C.text : C.muted, letterSpacing: "-0.01em" }}>{n.k}</div>
              <div style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>{n.sub}</div>
            </div>
          );
        })}
        {note > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 1030, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: Math.min(1, note * 1.5) * (1 - Math.min(1, key * 2)) }}>
            <div style={{ fontWeight: 800, fontSize: 36, color: C.text, textAlign: "center" }}>Verificar condições com a <span style={{ color: BRAND.hex }}>instituição responsável</span></div>
            <Tag text="SEM PROMESSA DE APROVAÇÃO" tone="muted" size={24} />
          </div>
        ) : null}
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, textAlign: "center", fontWeight: 800, fontSize: 66, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, key))})` }}>
            UM PASSO <span style={{ color: BRAND.hex }}>DE CADA VEZ</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PRIMEIRO, <span style={{ color: BRAND.hex }}>A MAIOR DÚVIDA</span>
      </div>
    </div>
  );
};
