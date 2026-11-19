import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Film, LuxArt, SmallArt, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Ela começou na corretagem aos cinquenta anos, trabalhando com aluguéis de novecentos reais." → linha do tempo
 * (película) já no quadro 0: marco 50 ANOS · INÍCIO + LOCAÇÕES PEQUENAS (prédio simples). "Hoje é referência em imóveis de alto padrão." →
 * a linha corre até HOJE · ALTO PADRÃO (casa genérica). "O que mudou primeiro não foi o preço das casas." → etiqueta de preço riscada e
 * a pergunta O QUE MUDOU PRIMEIRO? Sem cifras de vendas; imagens ilustrativas.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const start = 1;
  const small = 1;
  const run = prog(t, c.h_hoje - 0.3, 1.1, ease.inOut);
  const lux = sp(t, c.h_ref - 0.2, { damping: 13, stiffness: 180 });
  const price = sp(t, c.h_mudou - 0.1, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.h_preco - 0.1, 0.35, ease.out);
  const q = sp(t, c.h_naofoi - 0.2, { damping: 12, stiffness: 190 });
  const out = prog(t, c.b_monica - 0.45, 0.4, ease.in);
  const x0 = 150;
  const x1 = 930;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.16, x: -190, y: 40 },
          { t: c.h_cinq + 0.2, s: 1.1, x: -120, y: 0, e: ease.inOut },
          { t: c.h_alug + 0.3, s: 1.06, x: -150, y: -30, e: ease.inOut },
          { t: c.h_ref + 0.3, s: 1.06, x: 140, y: -20, e: ease.inOut },
          { t: c.h_mudou + 0.2, s: 1.0, x: 0, y: 20, e: ease.inOut },
          { t: c.b_monica, s: 1.02, x: 0, y: 30, e: ease.linear },
        ]}
      >
        {/* trilho */}
        <div style={{ position: "absolute", left: x0, top: 1000, width: x1 - x0, height: 10, borderRadius: 5, background: C.surface3 }} />
        <div style={{ position: "absolute", left: x0, top: 1000, width: (x1 - x0) * run, height: 10, borderRadius: 5, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.6)}` }} />
        {run < 0.02 ? <div style={{ position: "absolute", left: x0 + ((t * 0.6) % 1) * (x1 - x0) - 40, top: 995, width: 80, height: 20, borderRadius: 10, background: `linear-gradient(90deg, transparent, ${brandAlpha(0.7)}, transparent)` }} /> : null}
        {Array.from({ length: 9 }).map((_, i) => {
          const x = x0 + ((x1 - x0) * (i + 1)) / 10;
          const on = run >= (i + 1) / 10;
          return <div key={i} style={{ position: "absolute", left: x - 6, top: 999, width: 12, height: 12, borderRadius: 6, background: on ? BRAND.hex : C.dim }} />;
        })}
        {/* marco 50 anos */}
        <div style={{ position: "absolute", left: x0 - 120, top: 1040, width: 240, textAlign: "center", opacity: Math.min(1, start * 1.5) }}>
          <div style={{ fontWeight: 800, fontSize: 96, lineHeight: 1, letterSpacing: "-0.05em", color: C.text }}>50</div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: C.muted }}>ANOS · INÍCIO</div>
        </div>
        <div style={{ position: "absolute", left: x0 - 14, top: 990, width: 28, height: 28, borderRadius: 14, background: C.text }} />
        {small > 0.001 ? (
          <div style={{ position: "absolute", left: x0 - 130, top: 560, opacity: Math.min(1, small * 1.5), transform: `translateY(${(1 - Math.min(1, small)) * 60}px)` }}>
            <Film w={300} h={380} t={t}><div style={{ transform: `translateY(${Math.sin(t * 0.9) * 14}px) scale(${1.06 + 0.04 * Math.sin(t * 0.6)})` }}><SmallArt w={300} /></div></Film>
            <div style={{ position: "absolute", left: 0, top: 392, width: 300, display: "flex", justifyContent: "center" }}><Tag text="LOCAÇÕES PEQUENAS" tone="muted" size={24} style={{ color: C.text }} /></div>
          </div>
        ) : null}
        {/* marco hoje */}
        <div style={{ position: "absolute", left: x1 - 14, top: 990, width: 28, height: 28, borderRadius: 14, background: run > 0.98 ? BRAND.hex : C.dim, boxShadow: run > 0.98 ? `0 0 24px ${brandAlpha(0.7)}` : "none" }} />
        <div style={{ position: "absolute", left: x1 - 150, top: 1040, width: 300, textAlign: "center", opacity: prog(run, 0.8, 0.2, ease.out) }}>
          <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1, letterSpacing: "-0.04em", color: BRAND.hex }}>HOJE</div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: C.muted }}>ALTO PADRÃO</div>
        </div>
        {lux > 0.001 ? (
          <div style={{ position: "absolute", left: x1 - 250, top: 600, opacity: Math.min(1, lux * 1.5), transform: `translateY(${(1 - Math.min(1, lux)) * 60}px)` }}>
            <Film w={460} h={340} t={t}><div style={{ marginTop: -6 }}><LuxArt w={460} /></div></Film>
            {price > 0.001 ? (
              <div style={{ position: "absolute", right: -10, top: -40, transform: `rotate(6deg) scale(${mix(0.5, 1, Math.min(1.08, price))})`, opacity: Math.min(1, price * 1.5) }}>
                <div style={{ position: "relative", padding: "12px 22px", borderRadius: 16, background: C.paper, color: C.ink, fontFamily: F.mono, fontWeight: 700, fontSize: 34 }}>
                  R$ ••••••
                  <div style={{ position: "absolute", left: 8, right: 8, top: "50%", height: 7, borderRadius: 4, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-6deg)` }} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1180, display: "flex", justifyContent: "center", opacity: Math.min(1, small * 1.5) }}>
          <Tag text="IMAGENS ILUSTRATIVAS" tone="muted" size={22} />
        </div>
      </Camera>
      {q > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 68, lineHeight: 1.04, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 30}px)` }}>
          O QUE MUDOU <span style={{ color: BRAND.hex }}>PRIMEIRO?</span>
        </div>
      ) : null}
    </div>
  );
};
