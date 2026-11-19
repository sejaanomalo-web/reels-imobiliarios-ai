import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Label, People, PropCard, Question, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Mesma família, mesmo desejo de comprar apartamento." → família ilustrativa já no quadro 0 + MESMO DESEJO: APARTAMENTO.
 * "Dois atendimentos diferentes." → o caminho se divide em ATENDIMENTO 1 / ATENDIMENTO 2. "Um começa pelas fotos." → pilha de fotos à
 * esquerda. "O outro começa pelas perguntas." → "?" à direita. Selo SITUAÇÃO ILUSTRATIVA.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const wish = sp(t, c.h_apto - 0.2, { damping: 12, stiffness: 200 });
  const fork = prog(t, c.h_dois - 0.2, 0.8, ease.inOut);
  const L = sp(t, c.h_fotos - 0.15, { damping: 12, stiffness: 200 });
  const R = sp(t, c.h_perg - 0.15, { damping: 12, stiffness: 200 });
  const out = prog(t, c.c_imagina - 0.45, 0.4, ease.in);
  const node = (left: boolean, p: number, label: string) => (
    <div style={{ position: "absolute", left: left ? 100 : 580, top: 820 + Math.sin(t * 1.6 + (left ? 0 : 2)) * 5, width: 400, height: 360, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px ${p > 0.5 ? "solid" : "dashed"} ${p > 0.5 ? (left ? C.text : BRAND.hex) : C.dim}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", opacity: Math.max(fork, 0.35), boxShadow: p > 0.5 && !left ? `0 0 34px ${brandAlpha(0.25)}` : "0 30px 70px rgba(0,0,0,0.5)" }}>
      <Label size={26} color={p > 0.5 ? C.text : C.dim}>{label}</Label>
      <div style={{ position: "relative", height: 190, width: 300, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, p))})` }}>
        {left ? (
          [0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 60 + k * 30, top: 10 + k * 14, transform: `rotate(${(k - 1) * 9 + Math.sin(t * 2 + k) * 2}deg)` }}><PropCard w={170} i={k} /></div>
          ))
        ) : (
          <Question size={150} />
        )}
      </div>
      <div style={{ fontWeight: 800, fontSize: 40, color: p > 0.5 ? (left ? C.text : BRAND.hex) : C.dim, opacity: Math.min(1, p * 1.5) }}>{left ? "Fotos primeiro" : "Perguntas primeiro"}</div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: -150 },
          { t: c.h_fam + 0.3, s: 1.07, y: -100, e: ease.out },
          { t: c.h_apto + 0.3, s: 1.03, y: -50, e: ease.inOut },
          { t: c.h_dois + 0.6, s: 1.0, y: 0, e: ease.inOut },
          { t: c.h_fotos + 0.3, s: 1.04, x: -60, y: 40, e: ease.inOut },
          { t: c.h_perg + 0.3, s: 1.04, x: 60, y: 40, e: ease.inOut },
          { t: c.c_imagina, s: 1.04, x: 60, y: 40, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", transform: `translateY(${Math.sin(t * 2.4) * 10}px) scale(${1 + 0.03 * Math.sin(t * 3)})` }}>
          <div style={{ padding: "24px 40px 18px", borderRadius: 40, background: C.surface, border: `2px solid ${C.line}` }}><People n={3} size={130} /></div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 555, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="FAMÍLIA" tone="muted" size={26} style={{ color: C.text }} />
          {wish > 0.001 ? <div style={{ opacity: Math.min(1, wish * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, wish))})` }}><Tag text="QUER UM APARTAMENTO" tone="accent" size={26} /></div> : null}
        </div>
        <svg width={1080} height={220} style={{ position: "absolute", left: 0, top: 610, overflow: "visible" }}>
          {[300, 780].map((x, i) => (
            <path key={`p${i}`} d={`M540 0 C540 110, ${x} 90, ${x} 205`} stroke={C.muted} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="16 18" strokeDashoffset={-t * 70} opacity={0.55 * (1 - fork)} />
          ))}
          {[300, 780].map((x, i) => (
            <path key={i} d={`M540 0 C540 110, ${x} 90, ${x} 205`} stroke={i ? BRAND.hex : C.muted} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - fork)} />
          ))}
        </svg>
        {[0, 1].map((i) => {
          const r = ((t * 0.9 + i * 0.5) % 1);
          return fork < 0.5 ? <div key={`r${i}`} style={{ position: "absolute", left: (i ? 580 : 100) - r * 20, top: 820 - r * 20, width: 400 + r * 40, height: 360 + r * 40, borderRadius: 40, border: `3px solid ${C.muted}`, opacity: 0.35 * (1 - r) }} /> : null;
        })}
        {node(true, L, "ATENDIMENTO 1")}
        {node(false, R, "ATENDIMENTO 2")}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1215, display: "flex", justifyContent: "center", opacity: fork }}>
          <Tag text="SITUAÇÃO ILUSTRATIVA" tone="muted" size={22} />
        </div>
      </Camera>
    </div>
  );
};
