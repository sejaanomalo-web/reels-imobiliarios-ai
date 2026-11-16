import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { HouseArt, Phone, Question, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Ela construiu uma audiência enorme mostrando imóveis." → celular genérico rolando vídeos de casas desde o quadro 0;
 * a plateia (pontos) se forma em volta. "Mas o detalhe mais inteligente não está nas casas." → as casas apagam. "Está no jeito de chamar
 * atenção." → foco no começo do vídeo: um "?" acende — a pergunta que o Reel vai responder. Sem imagens nem números da corretora.
 */
const PH = { x: 330, y: 450, w: 420, h: 750 };
const N = 34;
const DOTS = Array.from({ length: N }).map((_, i) => {
  const a = (i / N) * Math.PI * 2 + rnd(i) * 0.3;
  const r = 1 + rnd(i + 50) * 0.22;
  return { x: 540 + Math.cos(a) * 420 * r, y: 800 + Math.sin(a) * 560 * r, d: rnd(i + 9) * 1.8, s: 34 + rnd(i + 3) * 22 };
});

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const dim = prog(t, c.h_mas - 0.1, 0.7, ease.inOut);
  const speed = mix(300, 40, dim);
  // rolagem integrada (velocidade cai no "Mas")
  const tm = c.h_mas - 0.1;
  const scroll = t < tm ? t * 300 : tm * 300 + (t - tm) * speed;
  const focus = sp(t, c.h_jeito - 0.1, { damping: 12, stiffness: 190 });
  const ring = prog(t, c.h_aten, 0.5, ease.out);
  const t1 = sp(t, c.h_casas - 0.7, { damping: 14, stiffness: 170 });
  const t2 = sp(t, c.h_jeito - 0.05, { damping: 13, stiffness: 180 });
  const out = prog(t, c.c_kel - 0.45, 0.4, ease.in);
  const tileH = PH.w * 1.25;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: 40 },
          { t: c.h_aud + 0.8, s: 0.96, y: 30, e: ease.inOut },
          { t: c.h_mas, s: 0.98, y: 20, e: ease.inOut },
          { t: c.h_jeito + 0.4, s: 1.06, y: -40, e: ease.inOut },
          { t: c.c_kel, s: 1.08, y: -50, e: ease.linear },
        ]}
      >
        {/* plateia */}
        {DOTS.map((d, i) => {
          const a = sp(t, c.h_aud - 0.4 + d.d, { damping: 12, stiffness: 180 });
          if (a <= 0.001) return null;
          const look = focus * 0.15;
          return (
            <div key={i} style={{ position: "absolute", left: mix(d.x, PH.x + PH.w / 2, look) - d.s / 2, top: mix(d.y, PH.y + 200, look) - d.s / 2 + Math.sin(t * 2 + i) * 4, width: d.s, height: d.s, borderRadius: d.s / 2, background: C.surface3, border: `3px solid ${i % 5 === 0 && focus > 0.5 ? BRAND.hex : C.dim}`, opacity: Math.min(1, a * 1.5) * mix(0.9, 0.55, dim) * (1 - focus * 0.3), transform: `scale(${Math.min(1.1, a)})` }} />
          );
        })}
        {/* celular com vídeos de casas */}
        <Phone w={PH.w} h={PH.h} glow={focus} style={{ left: PH.x, top: PH.y }}>
          <div style={{ position: "absolute", inset: 0, filter: dim > 0.01 ? `blur(${dim * 5}px)` : undefined, opacity: mix(1, 0.35, dim) }}>
            {Array.from({ length: 6 }).map((_, k) => {
              const base = Math.floor(scroll / tileH);
              const i = base + k - 1;
              const y = i * tileH - scroll;
              return (
                <div key={i} style={{ position: "absolute", left: 0, top: y, width: PH.w - 12 }}>
                  <HouseArt w={PH.w - 12} hue={((i % 6) + 6) % 6} />
                </div>
              );
            })}
          </div>
          {focus > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: Math.min(1, focus * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, focus))})` }}>
              <Question size={150} />
              <Tag text="O COMEÇO DO VÍDEO" tone="accent" size={24} style={{ background: BRAND.deep }} />
            </div>
          ) : null}
        </Phone>
        {ring > 0 && ring < 1 ? (
          <div style={{ position: "absolute", left: PH.x - 40 * ring, top: PH.y - 40 * ring, width: PH.w + 80 * ring, height: PH.h + 80 * ring, borderRadius: 70, border: `4px solid ${BRAND.hex}`, opacity: 0.7 * (1 - ring) }} />
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: PH.y + PH.h + 26, display: "flex", justifyContent: "center" }}>
          <Tag text="IMAGENS ILUSTRATIVAS" tone="muted" size={22} />
        </div>
      </Camera>
      {/* títulos fora da câmera */}
      {t1 > 0.001 && t2 < 0.5 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, t1 * 1.5) * (1 - Math.min(1, t2 * 2)) }}>
          NÃO ESTÁ <span style={{ color: C.warn }}>NAS CASAS</span>
        </div>
      ) : null}
      {t2 > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, t2 * 1.5), transform: `translateY(${(1 - Math.min(1, t2)) * 30}px)`, textShadow: `0 0 30px ${brandAlpha(0.25)}` }}>
          ESTÁ NO JEITO DE <span style={{ color: BRAND.hex }}>CHAMAR ATENÇÃO</span>
        </div>
      ) : null}
    </div>
  );
};
