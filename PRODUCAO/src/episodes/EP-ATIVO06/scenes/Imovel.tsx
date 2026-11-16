import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Avatar, Card, Tag, TEAM } from "./ui";

/**
 * CENA 3 — O CAMINHO DO IMÓVEL (ilustrativo). "Um corretor informa que está disponível. Outro descobre que a condição mudou." → duas
 * fichas idênticas, uma com cada corretor, ganham status diferentes. "A carteira foi atualizada em um lugar, mas não no outro." →
 * a sincronia falha entre elas; carimbo VERSÕES DIFERENTES. "…É a ausência de um ponto claro de atualização." → no meio, um ponto de
 * atualização tracejado e vazio.
 */
const Ficha: React.FC<{ x: number; who: number; status: string; tone: "ok" | "warn"; p: number; flip: number; t: number }> = ({ x, who, status, tone, p, flip, t }) => (
  <Card style={{ left: x, top: 470, width: 400, padding: "24px 26px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 300 + Math.sin(t * 1.4 + x) * 5}px) rotate(${(x < 540 ? -1 : 1) * 1.5}deg)` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar ini={TEAM[who].ini} bg={TEAM[who].bg} size={54} />
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>CORRETOR {TEAM[who].ini}</span>
    </div>
    <div style={{ marginTop: 18, height: 150, borderRadius: 18, background: "#3B4A5C", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={80} height={80} viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" stroke="rgba(244,245,247,0.7)" strokeWidth={1.6} strokeLinejoin="round" /></svg>
    </div>
    <div style={{ marginTop: 14, fontWeight: 800, fontSize: 34, color: C.text }}>Apto Centro · 2q</div>
    <div style={{ marginTop: 14, padding: "12px 0", textAlign: "center", borderRadius: 14, background: tone === "ok" ? brandAlpha(0.14) : "rgba(255,107,94,0.16)", color: tone === "ok" ? BRAND.hex : C.warn, fontFamily: F.mono, fontWeight: 700, fontSize: 28, transform: `rotateX(${(1 - flip) * 90}deg)` }}>{status}</div>
  </Card>
);

export const Imovel: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const pa = sp(t, c.i_siga - 0.1, { damping: 14, stiffness: 170 });
  const pb = sp(t, c.i_siga + 0.15, { damping: 14, stiffness: 170 });
  const fa = prog(t, c.i_disp - 0.05, 0.3, ease.out);
  const fb = prog(t, c.i_mudou - 0.05, 0.3, ease.out);
  const sync = prog(t, c.i_cart, 0.6, ease.inOut);
  const broken = prog(t, c.i_nao - 0.1, 0.3, ease.out);
  const stamp = sp(t, c.i_nao + 0.3, { damping: 9, stiffness: 260 });
  const hole = sp(t, c.i_ponto - 0.15, { damping: 12, stiffness: 190 });
  const out = prog(t, c.v_garg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, pa * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_siga - 0.3, s: 1.06, y: 20 },
          { t: c.i_mudou + 0.5, s: 1.0, y: 0, e: ease.inOut },
          { t: c.i_nao + 0.5, s: 1.05, y: 20, e: ease.inOut },
          { t: c.i_ponto + 0.6, s: 1.12, y: 30, e: ease.inOut },
          { t: c.v_garg, s: 1.14, y: 30, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, pa * 1.5) }}>
          {stamp > 0.5 ? (
            <>
              VERSÕES <span style={{ color: C.warn }}>DIFERENTES</span>
            </>
          ) : (
            <>
              AGORA, <span style={{ color: BRAND.hex }}>O IMÓVEL</span>
            </>
          )}
        </div>
        <Ficha x={90} who={0} status={fa > 0.5 ? "DISPONÍVEL" : "—"} tone="ok" p={pa} flip={fa > 0 ? fa : 1} t={t} />
        <Ficha x={590} who={2} status={fb > 0.5 ? "CONDIÇÃO MUDOU" : "—"} tone={fb > 0.5 ? "warn" : "ok"} p={pb} flip={fb > 0 ? fb : 1} t={t} />
        {/* sincronia que falha */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: sync }}>
          <path d="M 490 700 C 520 660, 560 660, 590 700" fill="none" stroke={broken > 0.5 ? C.warn : BRAND.hex} strokeWidth={8} strokeLinecap="round" strokeDasharray={broken > 0.5 ? "10 16" : `${120 * sync} 200`} />
          <path d="M 590 760 C 560 800, 520 800, 490 760" fill="none" stroke={broken > 0.5 ? C.warn : BRAND.hex} strokeWidth={8} strokeLinecap="round" strokeDasharray={broken > 0.5 ? "10 16" : `${120 * sync} 200`} />
        </svg>
        {broken > 0.5 ? (
          <div style={{ position: "absolute", left: 540 - 30, top: 700, width: 60, height: 60, borderRadius: 30, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, transform: `scale(${mix(0.4, 1, Math.min(1.1, sp(t, c.i_nao, { damping: 10, stiffness: 240 })))})` }}>×</div>
        ) : null}
        {/* ponto de atualização ausente */}
        {hole > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: Math.min(1, hole * 1.5) }}>
            <div style={{ width: 120, height: 120, borderRadius: 60, border: `5px dashed ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 56, color: C.warn, transform: `rotate(${t * 40}deg)` }}>?</div>
            <Tag text="PONTO DE ATUALIZAÇÃO?" tone="warn" size={28} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
