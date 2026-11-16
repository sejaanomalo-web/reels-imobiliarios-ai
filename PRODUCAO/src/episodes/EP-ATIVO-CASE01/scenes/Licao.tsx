import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { HouseArt, IconEye, Phone, Question, Tag } from "./ui";

/**
 * CENA 4 — TAKE 03, A LIÇÃO. "O ponto não é copiar o jeito dela de gravar, nem perseguir milhões de views." → vídeo de imóvel genérico
 * rodando sem contexto; contador de views (ilustrativo, sem número) girando e riscado. "É fazer cada vídeo responder: por que alguém que
 * procura um imóvel deveria continuar assistindo?" → o vídeo CONGELA (corte seco) e ganha a pergunta do comprador em destaque. "Se essa
 * resposta não está clara, uma fachada bonita não segura a atenção." → FACHADA BONITA, barra de atenção esvaziando e o vídeo sendo
 * arrastado para cima. Título: ATENÇÃO COM INTENÇÃO.
 */
const PH = { x: 300, y: 400, w: 480, h: 780 };

export const Licao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.k_ponto - 0.35, { damping: 15, stiffness: 150 });
  const frozen = t >= c.k_fazer - 0.05;
  const tv = frozen ? c.k_fazer - 0.05 : t; // tempo do "vídeo"
  const views = sp(t, c.k_views - 0.6, { damping: 12, stiffness: 200 });
  const vStrike = prog(t, c.k_views + 0.45, 0.35, ease.out);
  const flash = frozen ? 1 - prog(t, c.k_fazer - 0.05, 0.25, ease.out) : 0;
  const q = sp(t, c.k_porque - 0.1, { damping: 12, stiffness: 190 });
  const qOut = prog(t, c.k_se - 0.1, 0.35, ease.in);
  const fach = sp(t, c.k_fach - 0.1, { damping: 12, stiffness: 200 });
  const drain = prog(t, c.k_fach + 0.2, 1.2, ease.inOut);
  const swipe = prog(t, c.k_segura + 0.15, 0.6, ease.in);
  const tA = sp(t, c.k_ponto - 0.1, { damping: 14, stiffness: 170 });
  const tB = sp(t, c.k_fazer - 0.05, { damping: 13, stiffness: 180 });
  const out = prog(t, c.a_prox - 0.45, 0.4, ease.in);
  const att = mix(1, 0.12, drain) * (frozen ? 1 : 0.6 + 0.4 * Math.abs(Math.sin(t * 0.9)));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.k_ponto - 0.35, s: 0.94, y: 20 },
          { t: c.k_views, s: 1.0, x: -40, y: 0, e: ease.inOut },
          { t: c.k_fazer - 0.06, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.k_fazer, s: 1.06, y: -10, e: ease.out },
          { t: c.k_porque + 0.8, s: 1.04, y: -20, e: ease.inOut },
          { t: c.k_cont + 0.3, s: 1.03, y: -10, e: ease.inOut },
          { t: c.k_fach + 0.2, s: 1.0, y: 30, e: ease.inOut },
          { t: c.a_prox, s: 1.03, y: 40, e: ease.linear },
        ]}
      >
        <Phone w={PH.w} h={PH.h} glow={q * (1 - qOut)} style={{ left: PH.x, top: PH.y }}>
          <div style={{ position: "absolute", inset: 0, transform: `translateY(${-swipe * 900}px)`, opacity: 1 - swipe * 0.8 }}>
            <div style={{ position: "absolute", left: -40, top: -30, transformOrigin: "50% 60%", transform: `scale(${1.12 + 0.08 * Math.sin(tv * 0.5)}) translateX(${Math.sin(tv * 0.7) * 30}px)`, filter: frozen ? "grayscale(0.85) brightness(0.7)" : undefined }}>
              <HouseArt w={PH.w + 80} hue={3} />
            </div>
            {/* progresso do vídeo */}
            <div style={{ position: "absolute", left: 24, right: 24, bottom: 30, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.18)" }}>
              <div style={{ width: `${((tv - c.k_ponto + 2) * 9) % 100}%`, height: "100%", borderRadius: 4, background: C.text }} />
            </div>
            {frozen ? (
              <div style={{ position: "absolute", left: 30, top: 60, display: "flex", gap: 10, opacity: 0.9 }}>
                <div style={{ width: 16, height: 52, borderRadius: 4, background: C.text }} />
                <div style={{ width: 16, height: 52, borderRadius: 4, background: C.text }} />
              </div>
            ) : null}
            {fach > 0.001 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", opacity: Math.min(1, fach * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, fach))})` }}>
                <Tag text="FACHADA BONITA" tone="muted" size={30} style={{ color: C.text, background: "rgba(7,8,10,0.8)" }} />
              </div>
            ) : null}
          </div>
          {flash > 0 ? <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash * 0.5 }} /> : null}
        </Phone>
        <div style={{ position: "absolute", left: PH.x, top: PH.y + PH.h + 20, width: PH.w, display: "flex", justifyContent: "center" }}>
          <Tag text="VÍDEO ILUSTRATIVO" tone="muted" size={22} />
        </div>
        {/* views */}
        {views > 0.001 ? (
          <div style={{ position: "absolute", left: 600, top: 470, padding: "18px 26px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, views * 1.5) * (1 - prog(t, c.k_fazer, 0.3, ease.in)), transform: `scale(${mix(0.5, 1, Math.min(1.08, views))}) rotate(4deg)`, boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
            <IconEye size={56} />
            <div style={{ position: "relative", fontWeight: 800, fontSize: 48, color: C.text, letterSpacing: "-0.02em" }}>
              VIEWS {"↑".repeat(1 + (Math.floor(t * 6) % 3))}
              <div style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 9, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${vStrike}) rotate(-6deg)` }} />
            </div>
          </div>
        ) : null}
        {/* a pergunta do comprador */}
        {q > 0.001 && qOut < 1 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 640, boxSizing: "border-box", padding: "30px 34px", borderRadius: 36, background: C.surface, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", gap: 26, opacity: Math.min(1, q * 1.5) * (1 - qOut), transform: `translateY(${(1 - Math.min(1, q)) * 80 + Math.sin(t * 2.2) * 10}px) rotate(${Math.sin(t * 1.4) * 1.2}deg) scale(${mix(0.8, 1, Math.min(1, q)) * (1 + 0.015 * Math.sin(t * 3))})`, boxShadow: `0 0 ${40 + 25 * Math.sin(t * 3)}px ${brandAlpha(0.3)}, 0 30px 80px rgba(0,0,0,0.7)`, zIndex: 5 }}>
            <Question size={110} />
            <div style={{ fontWeight: 800, fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text }}>
              Por que continuar <span style={{ color: BRAND.hex }}>assistindo?</span>
            </div>
          </div>
        ) : null}
        {/* atenção */}
        <div style={{ position: "absolute", left: 160, right: 160, top: 1250, opacity: prog(t, c.k_ponto, 0.5, ease.out) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: C.muted }}>ATENÇÃO</span>
            <div style={{ flex: 1, height: 22, borderRadius: 11, background: C.surface3, overflow: "hidden" }}>
              <div style={{ width: `${att * 100}%`, height: "100%", borderRadius: 11, background: drain > 0.5 ? C.warn : BRAND.hex }} />
            </div>
          </div>
        </div>
      </Camera>
      {/* títulos fora da câmera */}
      {tA > 0.001 && tB < 0.5 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, tA * 1.5) * (1 - Math.min(1, tB * 2)) }}>
          O PONTO <span style={{ color: C.warn }}>NÃO É COPIAR</span>
        </div>
      ) : null}
      {tB > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, tB * 1.5), transform: `translateY(${(1 - Math.min(1, tB)) * 30}px)` }}>
          ATENÇÃO COM <span style={{ color: BRAND.hex }}>INTENÇÃO</span>
        </div>
      ) : null}
    </div>
  );
};
