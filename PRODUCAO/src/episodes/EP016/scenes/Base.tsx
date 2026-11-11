import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconLock, Tag } from "./ui";

/**
 * CENA 04 — INSIGHT. "Não envie ofertas aleatórias para toda a base. Retome somente quando existir contexto,
 * e respeite quem não quiser mais receber contato."
 * Uma oferta genérica começa a disparar para todos e é barrada; a lista se segmenta por interesse
 * e quem pediu para não receber contato fica bloqueado — respeitado.
 */
const P = { x: 70, y: 420, w: 940, rowH: 116, head: 96 };
type Kind = "ctx" | "wait" | "optout";
const ROWS: { name: string; ini: string; bg: string; info: string; kind: Kind }[] = [
  { name: "Ana P.", ini: "AP", bg: "#5A6E8C", info: "2 quartos · perto do metrô", kind: "ctx" },
  { name: "Bruno M.", ini: "BM", bg: "#6B5A8C", info: "sem interesse registrado", kind: "wait" },
  { name: "Carla S.", ini: "CS", bg: "#8C6A5A", info: "casa com quintal", kind: "ctx" },
  { name: "Diego R.", ini: "DR", bg: "#5A8C7C", info: "sem interesse registrado", kind: "wait" },
  { name: "Elisa T.", ini: "ET", bg: "#7C7C5A", info: "pediu para não receber", kind: "optout" },
  { name: "Fábio L.", ini: "FL", bg: "#4E6A7A", info: "sala comercial", kind: "ctx" },
];

export const Base: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const shots = tl.series.broadcast ?? [];
  const enter = sp(t, c.ins_base, { damping: 17, stiffness: 130 });
  const offer = sp(t, c.ins_random - 0.25, { damping: 14, stiffness: 170 });
  const block = sp(t, c.ins_block, { damping: 10, stiffness: 220 });
  const seg = prog(t, c.ins_ctx - 0.1, 0.6, ease.inOut);
  const offerAway = prog(t, c.ins_ctx - 0.3, 0.45, ease.in);
  const ctxHead = sp(t, c.ins_ctx + 0.1, { damping: 15, stiffness: 160 });
  const respect = sp(t, c.ins_respect, { damping: 12, stiffness: 180 });
  const lock = sp(t, c.ins_optout, { damping: 10, stiffness: 200 });
  const exit = prog(t, c.cta_card - 0.15, 0.45, ease.in);
  const shake = block > 0 ? Math.sin((t - c.ins_block) * 40) * 8 * Math.max(0, 1 - (t - c.ins_block) / 0.35) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_base, s: 0.93, y: 30 },
          { t: c.ins_random + 0.2, s: 1.0, y: -40, e: ease.out },
          { t: c.ins_block + 0.3, s: 1.03, y: -30, e: ease.inOut },
          { t: c.ins_ctx + 0.5, s: 1.0, y: 20, e: ease.inOut },
          { t: c.ins_respect + 0.4, s: 1.08, y: 90, x: 0, e: ease.inOut },
          { t: c.cta_card + 0.3, s: 1.0, y: 100, e: ease.in },
        ]}
      >
        {/* oferta genérica para todos */}
        <div
          style={{
            position: "absolute",
            left: 150,
            right: 150,
            top: 268,
            height: 116,
            boxSizing: "border-box",
            borderRadius: 30,
            background: "#2A2F37",
            border: `3px solid ${block > 0 ? C.warn : "rgba(255,255,255,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            fontFamily: F.sans,
            fontWeight: 800,
            fontSize: 40,
            color: "#C3C8D0",
            opacity: Math.min(1, offer * 1.5) * (1 - offerAway),
            transform: `translateX(${shake}px) translateY(${(1 - Math.min(1, offer)) * -60 - offerAway * 60}px)`,
          }}
        >
          <span style={{ opacity: mix(1, 0.5, Math.min(1, block)) }}>Oferta genérica → todos</span>
          {block > 0 ? (
            <div style={{ position: "absolute", right: -26, top: -30, width: 84, height: 84, borderRadius: 42, background: C.warn, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, transform: `scale(${mix(0.3, 1, Math.min(1.15, block))})` }}>
              ✕
            </div>
          ) : null}
        </div>
        {/* troca: retomar com contexto */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 296, display: "flex", justifyContent: "center", opacity: Math.min(1, ctxHead * 1.5), transform: `translateY(${(1 - Math.min(1, ctxHead)) * 40}px)` }}>
          <Tag text="RETOMAR SÓ COM CONTEXTO" tone="accent" size={34} />
        </div>

        {/* a base de contatos */}
        <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, borderRadius: 44, background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", overflow: "hidden", fontFamily: F.sans, transform: `translateY(${(1 - enter) * 100}px)` }}>
          <div style={{ height: P.head, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
            <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>Base de contatos</span>
            <Tag text="ILUSTRATIVA" tone="muted" size={20} />
          </div>
          {ROWS.map((r, i) => {
            const hit = shots[i] !== undefined ? prog(t, shots[i], 0.18, ease.out) * (1 - prog(t, c.ins_block + 0.1, 0.4, ease.out)) : 0;
            const isCtx = r.kind === "ctx";
            const isOpt = r.kind === "optout";
            const dimWait = r.kind === "wait" ? seg : 0;
            const glow = isCtx ? seg : 0;
            const optP = isOpt ? Math.min(1, respect) : 0;
            return (
              <div
                key={r.name}
                style={{
                  position: "relative",
                  height: P.rowH,
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "0 30px",
                  borderBottom: i < ROWS.length - 1 ? `1px solid ${C.lineSoft}` : undefined,
                  background: isCtx ? `rgba(53,224,161,${0.08 * glow})` : isOpt ? `rgba(255,255,255,${0.03 * optP})` : undefined,
                  opacity: mix(1, 0.4, dimWait),
                }}
              >
                <Avatar size={64} label={r.ini} bg={r.bg} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{r.name}</div>
                  <div style={{ fontWeight: 600, fontSize: 25, color: isOpt && optP > 0.5 ? C.text : C.muted, opacity: mix(0.85, 1, glow) }}>{r.info}</div>
                </div>
                {/* envelope da oferta genérica chegando */}
                <div style={{ position: "absolute", right: 40, top: 34, opacity: hit, transform: `translateY(${(1 - hit) * -30}px)`, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: "#C3C8D0", background: "#2A2F37", borderRadius: 12, padding: "8px 12px" }}>
                  oferta
                </div>
                {isCtx ? <div style={{ opacity: glow, transform: `scale(${mix(0.7, 1, glow)})` }}><Tag text="TEM CONTEXTO" tone="accent" size={20} /></div> : null}
                {r.kind === "wait" ? <div style={{ opacity: seg }}><Tag text="AGUARDAR" tone="muted" size={20} /></div> : null}
                {isOpt ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: Math.min(1, lock * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.1, lock))})` }}>
                    <IconLock size={34} color={C.text} />
                    <Tag text="NÃO CONTATAR" tone="muted" size={20} style={{ color: C.text }} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {/* "respeite" */}
        <div style={{ position: "absolute", left: P.x - 8, top: P.y + P.head + P.rowH * 4 - 8, width: P.w + 16, height: P.rowH + 16, boxSizing: "border-box", borderRadius: 30, border: `3px solid ${C.text}`, opacity: Math.min(1, respect) * 0.85, transform: `scale(${mix(1.06, 1, Math.min(1, respect))})` }} />
      </Camera>
    </div>
  );
};
