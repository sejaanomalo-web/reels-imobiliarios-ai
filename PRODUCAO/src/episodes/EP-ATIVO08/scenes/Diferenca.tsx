import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Buyer, CheckDot, Tag, Thumb } from "./ui";

/**
 * CENA 4 — A DIFERENÇA. "Os dois apresentaram o mesmo produto." → as duas conversas lado a lado com a mesma miniatura + MESMO PRODUTO.
 * "Mas um descreveu." → coluna A: adjetivos, rótulo DESCREVEU. "O outro ajudou a avaliar." → coluna B: critérios marcados, AJUDOU A
 * AVALIAR. "…conhecimento de mercado e transparência importam: eles reduzem dúvidas e dão mais autonomia para decidir." → o comprador
 * no centro olha os critérios; CONHECIMENTO + TRANSPARÊNCIA → MENOS DÚVIDAS · MAIS AUTONOMIA. Sem venda simulada.
 */
const COL = [70, 580];
const W = 430;
const A_ROWS = ["Sala ampla", "Boa localização", "Excelente oportunidade"];
const B_ROWS = ["Distribuição", "Regras", "A conferir", "Pontos de atenção"];

export const Diferenca: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = [sp(t, c.d_dois - 0.35, { damping: 15, stiffness: 150 }), sp(t, c.d_dois - 0.15, { damping: 15, stiffness: 150 })];
  const same = sp(t, c.d_prod - 0.1, { damping: 11, stiffness: 220 });
  const la = sp(t, c.d_desc - 0.05, { damping: 10, stiffness: 230 });
  const lb = sp(t, c.d_aval - 0.05, { damping: 10, stiffness: 230 });
  const dimA = prog(t, c.d_outro - 0.1, 0.5, ease.out);
  const low = prog(t, c.d_esse - 0.2, 0.8, ease.inOut);
  const chips = [c.d_conh, c.d_transp].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const res = [c.d_reduz, c.d_auto].map((x) => sp(t, x - 0.1, { damping: 11, stiffness: 210 }));
  const out = prog(t, c.i_outro - 0.45, 0.4, ease.in);

  const col = (i: number) => {
    const isB = i === 1;
    const rows = isB ? B_ROWS : A_ROWS;
    const lab = isB ? lb : la;
    return (
      <div key={i} style={{ position: "absolute", left: COL[i], top: 330, width: W, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `3px solid ${isB && lb > 0.5 ? BRAND.hex : C.line}`, boxShadow: isB && lb > 0.5 ? `0 0 40px ${brandAlpha(0.22)}` : "0 30px 70px rgba(0,0,0,0.5)", padding: 20, opacity: Math.min(1, enter[i] * 1.5) * (isB ? 1 : mix(1, 0.55, dimA)), transform: `translateY(${(1 - Math.min(1, enter[i])) * 120}px)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>ATENDIMENTO {isB ? "B" : "A"}</span>
        </div>
        <div style={{ borderRadius: 16, overflow: "hidden" }}><Thumb w={W - 46} h={130} /></div>
        {rows.map((r, j) => {
          const a = prog(t, (isB ? c.d_outro : c.d_mas) + j * 0.15, 0.35, ease.out);
          return (
            <div key={r} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, opacity: mix(0.35, 1, a) }}>
              {isB ? <CheckDot p={prog(t, c.d_aval + j * 0.12, 0.4, ease.out)} size={38} /> : <span style={{ fontWeight: 800, fontSize: 30, color: C.muted }}>“</span>}
              <span style={{ fontWeight: 700, fontSize: 28, color: isB ? C.text : C.muted }}>{r}</span>
            </div>
          );
        })}
        <div style={{ marginTop: 18, display: "flex", justifyContent: "center", opacity: Math.min(1, lab * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, lab))})` }}>
          <Tag text={isB ? "AJUDOU A AVALIAR" : "DESCREVEU"} tone={isB ? "accent" : "muted"} size={28} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_dois - 0.35, s: 1.0, y: 60 },
          { t: c.d_desc + 0.3, s: 1.08, x: -150, y: 40, e: ease.inOut },
          { t: c.d_aval + 0.3, s: 1.08, x: 150, y: 40, e: ease.inOut },
          { t: c.d_esse + 0.4, s: 0.92, x: 0, y: 120, e: ease.inOut },
          { t: c.i_outro, s: 0.94, y: 130, e: ease.linear },
        ]}
      >
        {col(0)}
        {col(1)}
        {same > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", zIndex: 5, opacity: Math.min(1, same * 1.5) * (1 - low), transform: `scale(${mix(0.4, 1, Math.min(1.1, same))})` }}>
            <Tag text="MESMO PRODUTO" tone="accent" size={30} style={{ background: BRAND.deep, border: `2px solid ${BRAND.hex}` }} />
          </div>
        ) : null}
        {/* o comprador avalia */}
        {low > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1050, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, opacity: low }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {["CONHECIMENTO DE MERCADO", "TRANSPARÊNCIA"].map((k, i) => (
                <div key={k} style={{ opacity: Math.min(1, chips[i] * 1.5), transform: `translateY(${(1 - Math.min(1, chips[i])) * 40}px)` }}>
                  <Tag text={k} tone="accent" size={30} />
                </div>
              ))}
            </div>
            <svg width={40} height={44} viewBox="0 0 40 44" style={{ opacity: Math.min(1, res[0] * 1.5) }}>
              <path d="M20 4v32M8 26l12 12 12-12" fill="none" stroke={BRAND.hex} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div style={{ opacity: Math.min(1, res[0] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, res[0]))})`, fontWeight: 800, fontSize: 50, letterSpacing: "-0.03em", color: C.text }}>MENOS DÚVIDAS</div>
              <Buyer size={110} t={t} />
              <div style={{ opacity: Math.min(1, res[1] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, res[1]))})`, fontWeight: 800, fontSize: 50, letterSpacing: "-0.03em", color: BRAND.hex }}>MAIS AUTONOMIA</div>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
