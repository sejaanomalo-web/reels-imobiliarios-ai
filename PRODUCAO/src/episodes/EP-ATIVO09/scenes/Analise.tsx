import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Label, People, Plan, Tag } from "./ui";

/**
 * CENA 3 — EXEMPLO 2: ANÁLISE DE IMÓVEL. "Segundo, analise imóveis com equilíbrio." → 2 · ANÁLISE + planta ilustrativa sobre uma balança.
 * "Mostre para quem a planta pode funcionar e para quem talvez não funcione." → dois lados: FUNCIONA PARA / TALVEZ NÃO. "Um apartamento
 * com pouca manutenção pode interessar a uma pessoa e ser ruim para uma família que precisa de três quartos." → perfil 1 PESSOA ✓ e
 * FAMÍLIA · PRECISA DE 3 QUARTOS ✗; selo DEPENDE DA NECESSIDADE.
 */
export const Analise: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_seg - 0.35, { damping: 15, stiffness: 150 });
  const tilt = Math.sin(t * 1.3) * (0.9 + 2.1 * (1 - prog(t, c.a_mostre, 0.6, ease.out)));
  const sides = [sp(t, c.a_func - 0.15, { damping: 13, stiffness: 190 }), sp(t, c.a_talvez - 0.15, { damping: 13, stiffness: 190 })];
  const tag = sp(t, c.a_apto - 0.1, { damping: 12, stiffness: 200 });
  const p1 = sp(t, c.a_pessoa - 0.15, { damping: 12, stiffness: 200 });
  const p2 = sp(t, c.a_familia - 0.15, { damping: 12, stiffness: 200 });
  const no = sp(t, c.a_familia + 0.1, { damping: 10, stiffness: 230 });
  const seal = sp(t, c.a_familia + 0.4, { damping: 10, stiffness: 220 });
  const out = prog(t, c.p_terc - 0.3, 0.26, ease.in);

  const side = (i: number) => {
    const p = sides[i];
    if (p <= 0.001) return null;
    const good = i === 0;
    const col = good ? BRAND.hex : C.warn;
    const prof = good ? p1 : p2;
    return (
      <div key={i} style={{ position: "absolute", left: good ? 70 : 560, top: 860, width: 450, height: 330, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `3px solid ${col}`, padding: "22px 24px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 100 + Math.sin(t * 1.7 + i * 1.6) * 6}px)`, boxShadow: good ? `0 0 30px ${brandAlpha(0.2)}` : "0 0 30px rgba(255,107,94,0.18)" }}>
        <Label size={26} color={col}>{good ? "FUNCIONA PARA" : "TALVEZ NÃO FUNCIONE"}</Label>
        {prof < 0.999 ? (
          <div style={{ position: "absolute", left: 24, top: 78, display: "flex", alignItems: "center", gap: 18, opacity: (1 - Math.min(1, prof * 2)) * (0.55 + 0.25 * Math.sin(t * 4 + i * 2)) }}>
            <People n={1} size={88} color={C.muted} />
            <div style={{ fontWeight: 800, fontSize: 40, color: C.muted }}>quem?</div>
          </div>
        ) : null}
        {prof > 0.001 ? (
          <div style={{ marginTop: 22, display: "flex", flexDirection: good ? "row" : "column", alignItems: good ? "center" : "flex-start", gap: good ? 20 : 10, opacity: Math.min(1, prof * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, prof))})`, transformOrigin: "0 50%" }}>
            <People n={good ? 1 : 3} size={good ? 96 : 70} />
            <div style={{ fontWeight: 800, fontSize: good ? 36 : 32, lineHeight: 1.1, color: C.text }}>{good ? "1 pessoa" : "Família que precisa de 3 quartos"}</div>
          </div>
        ) : null}
        {(good ? p1 : no) > 0.01 ? (
          <div style={{ position: "absolute", right: 18, bottom: 16, width: 60, height: 60, borderRadius: 30, background: col, color: good ? BRAND.ink : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, transform: `scale(${mix(0.3, 1, Math.min(1.1, good ? p1 : no))})` }}>{good ? "✓" : "✕"}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_seg - 0.35, s: 1.08, y: -80 },
          { t: c.a_equil + 0.4, s: 1.03, y: -50, e: ease.inOut },
          { t: c.a_mostre + 0.3, s: 1.0, y: -20, e: ease.inOut },
          { t: c.a_talvez + 0.6, s: 1.0, y: 40, e: ease.inOut },
          { t: c.a_apto + 0.6, s: 1.02, y: -50, e: ease.inOut },
          { t: c.a_pessoa, s: 1.0, y: 50, e: ease.inOut },
          { t: c.a_familia + 0.3, s: 1.02, x: 0, y: 70, e: ease.inOut },
          { t: c.a_tres + 0.8, s: 0.98, x: 0, y: 40, e: ease.inOut },
          { t: c.p_terc, s: 1.0, y: 40, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: prog(t, c.a_seg - 0.05, 0.3, ease.out) }}>
          <Tag text="2 · ANÁLISE" tone="accent" size={32} />
          <Tag text="PLANTA ILUSTRATIVA" tone="muted" size={22} />
        </div>
        {/* planta sobre a balança */}
        <div style={{ position: "absolute", left: 240, top: 380, width: 600, transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}>
          <div style={{ padding: 24, borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, display: "flex", justifyContent: "center", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <Plan size={480} p={prog(t, c.a_seg, 1.2, ease.out)} />
          </div>
          {tag > 0.01 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: -26, display: "flex", justifyContent: "center", opacity: Math.min(1, tag * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, tag))})` }}>
              <Tag text="APTO · POUCA MANUTENÇÃO" tone="muted" size={24} style={{ color: C.text, border: `2px solid ${C.line}` }} />
            </div>
          ) : null}
        </div>
        <svg width={1080} height={120} style={{ position: "absolute", left: 0, top: 790 }}>
          <path d={`M 540 0 V 40 M 300 ${60 + tilt * 3} L 780 ${60 - tilt * 3}`} stroke={C.muted} strokeWidth={6} strokeLinecap="round" />
          <circle cx={540} cy={40} r={10} fill={C.muted} />
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", opacity: prog(t, c.a_equil - 0.1, 0.4, ease.out) * (1 - Math.min(1, sides[0] * 1.5)) }}>
          <Label size={30} color={C.text}>EQUILÍBRIO</Label>
        </div>
        {side(0)}
        {side(1)}
        {seal > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1215, display: "flex", justifyContent: "center", opacity: Math.min(1, seal * 1.5), transform: `rotate(-3deg) scale(${mix(1.8, 1, Math.min(1, seal))})`, zIndex: 6 }}>
            <Tag text="DEPENDE DA NECESSIDADE" tone="accent" size={32} style={{ background: BRAND.deep, border: `2px solid ${BRAND.hex}` }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
