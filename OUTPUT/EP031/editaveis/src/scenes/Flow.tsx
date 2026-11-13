import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { BROKERS, LEAD, Mark, Tag } from "./ui";

/**
 * CENAS 03–04 — TENSÃO + INSIGHT (mesmo quadro).
 * "O problema não é ter dois profissionais interessados. É não existir uma regra clara de atribuição e acompanhamento daquela oportunidade."
 * Os dois corretores estão OK (interesse ✓); as linhas de distribuição se cruzam e a ficha da oportunidade mostra RESPONSÁVEL e HISTÓRICO vazios.
 * "Defina quem assume o primeiro contato, quando uma oportunidade pode ser transferida e como registrar isso sem perder contexto."
 * Os mesmos campos são preenchidos: responsável, transferência documentada A → B e histórico — contexto preservado.
 */
const NODE = { x: 540, y: 330 };
const BX = [90, 610];
const BY = 470;
const CARD = { x: 90, y: 700, w: 900 };

export const Flow: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.ten_prob - 0.1, { damping: 15, stiffness: 150 });
  const ok = sp(t, c.ten_two + 0.2, { damping: 12, stiffness: 200 });
  const tangle = prog(t, c.ten_rule - 0.2, 0.9, ease.inOut);
  const card = sp(t, c.ten_rule - 0.3, { damping: 15, stiffness: 150 });
  const histEmpty = sp(t, c.ten_follow, { damping: 14, stiffness: 180 });
  const define = prog(t, c.ins_def, 0.5, ease.out);
  const owner = sp(t, c.ins_first + 0.3, { damping: 11, stiffness: 210 });
  const transfer = prog(t, c.ins_transfer + 0.1, 0.8, ease.inOut);
  const tLabel = sp(t, c.ins_transfer + 0.6, { damping: 13, stiffness: 190 });
  const hist = [0, 1, 2].map((i) => sp(t, c.ins_reg + 0.1 + i * 0.25, { damping: 13, stiffness: 190 }));
  const ctx = sp(t, c.ins_ctx + 0.3, { damping: 12, stiffness: 200 });
  const exit = prog(t, c.cta_flow - 0.15, 0.45, ease.in);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const headTxt = t < c.ten_rule - 0.3 ? "O PROBLEMA NÃO É TER DOIS INTERESSADOS" : t < c.ins_def - 0.1 ? "FALTA UMA REGRA CLARA" : "DEFINA A REGRA";
  const headTone = t < c.ten_rule - 0.3 ? "muted" : t < c.ins_def - 0.1 ? "warn" : "accent";

  const field = (label: string, empty: boolean, filled: React.ReactNode, p: number, emptyP: number) => (
    <div style={{ marginTop: 18, padding: "16px 20px", borderRadius: 22, background: C.surface2, border: `2px ${empty ? "dashed" : "solid"} ${empty ? `rgba(255,107,94,${0.4 + 0.5 * pulse})` : "rgba(53,224,161,0.5)"}`, opacity: Math.min(1, Math.max(p, emptyP) * 1.5) }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 21, letterSpacing: "0.1em", color: empty ? C.warn : C.accent }}>{label}</div>
      <div style={{ marginTop: 8, minHeight: 42 }}>{empty ? <span style={{ fontWeight: 800, fontSize: 36, color: C.warn }}>?</span> : filled}</div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_prob, s: 1.2, y: -300 },
          { t: c.ten_two + 0.6, s: 1.14, y: -270, e: ease.inOut },
          { t: c.ten_rule, s: 1.0, y: -40, e: ease.inOut },
          { t: c.ten_follow + 0.5, s: 1.04, y: 120, e: ease.inOut },
          { t: c.ins_first + 0.4, s: 1.04, y: 60, e: ease.inOut },
          { t: c.ins_transfer + 0.5, s: 1.06, y: -30, e: ease.inOut },
          { t: c.ins_ctx + 0.4, s: 1.04, y: 160, e: ease.inOut },
          { t: c.cta_flow + 0.3, s: 0.95, y: 60, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}>
          <Tag text={headTxt} tone={headTone as "muted" | "warn" | "accent"} size={26} />
        </div>
        {/* a oportunidade */}
        <div style={{ position: "absolute", left: NODE.x - 150, top: NODE.y - 40, width: 300, height: 80, borderRadius: 40, background: C.surface2, border: `2px solid ${define > 0.5 ? C.accent : C.line}`, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", boxSizing: "border-box" }}>
          <Avatar size={52} label={LEAD.ini} bg={LEAD.bg} />
          <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Oportunidade</span>
        </div>
        {/* linhas de distribuição: cruzadas → definidas */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[0, 1].map((i) => {
            const tx = BX[i] + 190;
            const cross = `M540 370 C ${i === 0 ? 900 : 180} 420, ${i === 0 ? 120 : 960} 420, ${tx} ${BY}`;
            const clean = `M540 370 C 540 420, ${tx} 420, ${tx} ${BY}`;
            const isOwner = i === 0;
            return (
              <g key={i}>
                <path d={cross} fill="none" stroke={C.warn} strokeWidth={5} strokeDasharray={`${700 * tangle} 800`} opacity={1 - define} />
                <path d={clean} fill="none" stroke={isOwner ? C.accent : C.dim} strokeWidth={isOwner ? 7 : 4} strokeDasharray={isOwner ? undefined : "10 10"} opacity={define * (isOwner ? Math.min(1, owner) : 0.6)} />
              </g>
            );
          })}
          {/* transferência documentada A → B */}
          <path d={`M${BX[0] + 380} ${BY + 75} L${BX[0] + 380 + 140 * transfer} ${BY + 75}`} stroke={C.accent} strokeWidth={7} strokeLinecap="round" />
          {transfer > 0.95 ? <path d={`M${BX[1] - 20} ${BY + 60} L${BX[1]} ${BY + 75} L${BX[1] - 20} ${BY + 90}`} fill="none" stroke={C.accent} strokeWidth={7} strokeLinecap="round" /> : null}
        </svg>
        {/* os dois corretores */}
        {BROKERS.map((b, i) => (
          <div key={b.name} style={{ position: "absolute", left: BX[i], top: BY, width: 380, height: 150, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${define > 0.5 && i === 0 && owner > 0.5 ? C.accent : C.line}`, display: "flex", alignItems: "center", gap: 18, padding: "0 22px", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
            <Avatar size={76} label={b.ini} bg={b.bg} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{b.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, opacity: Math.min(1, ok * 1.5) }}>
                <Mark ok size={30} />
                <span style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>interessado</span>
              </div>
            </div>
          </div>
        ))}
        {tLabel > 0 ? (
          <div style={{ position: "absolute", left: 360, top: BY + 160, opacity: Math.min(1, tLabel * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, tLabel))})` }}>
            <Tag text="TRANSFERÊNCIA REGISTRADA" tone="accent" size={22} />
          </div>
        ) : null}
        {/* ficha da oportunidade */}
        <div style={{ position: "absolute", left: CARD.x, top: CARD.y, width: CARD.w, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `1px solid ${C.line}`, padding: "24px 28px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 120}px)`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>Ficha da oportunidade · {LEAD.name}</span>
            <Tag text="ILUSTRATIVA" tone="muted" size={16} />
          </div>
          {field("RESPONSÁVEL", owner < 0.5, <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>Corretor A · primeiro contato</span>, owner, card)}
          {field("HISTÓRICO", hist[0] < 0.5, (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Pedido recebido · A assumiu", "Visita sugerida para quinta", "Transferido para B · com as notas"].map((h, i) => (
                <div key={h} style={{ display: "flex", alignItems: "center", gap: 12, opacity: Math.min(1, hist[i] * 1.5), transform: `translateX(${(1 - Math.min(1, hist[i])) * 30}px)` }}>
                  <div style={{ width: 14, height: 14, borderRadius: 7, background: C.accent }} />
                  <span style={{ fontWeight: 700, fontSize: 28, color: C.text }}>{h}</span>
                </div>
              ))}
            </div>
          ), hist[0], histEmpty)}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", opacity: Math.min(1, ctx * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, ctx))})`, transformOrigin: "100% 50%" }}>
            <Tag text="CONTEXTO PRESERVADO ✓" tone="accent" size={22} />
          </div>
        </div>
      </Camera>
    </div>
  );
};
