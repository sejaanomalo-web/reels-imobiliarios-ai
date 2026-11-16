import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { AdCard, Buyer, IconChat, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Imagine um comprador vendo o mesmo apartamento anunciado por dois corretores diferentes." → dois anúncios
 * ilustrativos do mesmo imóvel lado a lado (CORRETOR A / CORRETOR B). "As fotos são parecidas, o preço é o mesmo e o imóvel não mudou."
 * → FOTO, PREÇO e IMÓVEL acendem nos dois ao mesmo tempo, com "=" no meio. "Então por que ele escolheria conversar mais com um deles?"
 * → a câmera desce dos anúncios para as duas janelas de conversa; o comprador fica no meio com a pergunta.
 * (Câmera: x/y = posição da câmera; y positivo sobe o conteúdo.)
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const a = sp(t, 0.0, { damping: 15, stiffness: 150 });
  const b = sp(t, c.h_dois - 0.3, { damping: 15, stiffness: 150 });
  const hi = [c.h_fotos, c.h_preco, c.h_imovel].map((x) => prog(t, x - 0.05, 0.3, ease.out));
  const eqs = [c.h_fotos, c.h_preco, c.h_imovel].map((x) => sp(t, x, { damping: 11, stiffness: 220 }));
  const down = prog(t, c.h_por - 0.3, 0.9, ease.inOut);
  const chats = [c.h_conv - 0.3, c.h_conv - 0.1].map((x) => sp(t, x, { damping: 14, stiffness: 180 }));
  const q = sp(t, c.h_deles - 0.2, { damping: 10, stiffness: 220 });
  const buyer = sp(t, c.h_imag + 0.1, { damping: 14, stiffness: 160 });
  const out = prog(t, c.a_prim - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.14, x: -150, y: -40 },
          { t: c.h_dois + 0.4, s: 1.02, x: 0, y: -30, e: ease.inOut },
          { t: c.h_imovel + 0.4, s: 1.0, x: 0, y: -20, e: ease.inOut },
          { t: c.h_conv, s: 0.94, y: 240, e: ease.inOut },
          { t: c.a_prim, s: 0.97, y: 250, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 70, top: 340, opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * -200}px) rotate(${(1 - Math.min(1, a)) * -5}deg)` }}>
          <AdCard who="CORRETOR A" hi={hi} dim={down * 0.4} />
        </div>
        {b > 0.001 ? (
          <div style={{ position: "absolute", left: 580, top: 340, opacity: Math.min(1, b * 1.5), transform: `translateX(${(1 - Math.min(1, b)) * 200}px) rotate(${(1 - Math.min(1, b)) * 5}deg)` }}>
            <AdCard who="CORRETOR B" hi={hi} dim={down * 0.4} />
          </div>
        ) : null}
        {/* = no meio */}
        {[0, 1, 2].map((i) =>
          eqs[i] > 0.001 ? (
            <div key={i} style={{ position: "absolute", left: 540 - 34, top: [484, 637, 699][i], width: 68, height: 68, borderRadius: 34, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 52, transform: `scale(${mix(0.2, 1, Math.min(1.15, eqs[i]))})`, boxShadow: `0 0 26px ${brandAlpha(0.5)}`, zIndex: 4 }}>=</div>
          ) : null,
        )}
        {/* o comprador */}
        <div style={{ position: "absolute", left: 540 - 60, top: 215, opacity: Math.min(1, buyer * 1.5) * (1 - down), transform: `scale(${mix(0.5, 1, Math.min(1, buyer))})` }}>
          <Buyer size={110} t={t} />
        </div>
        {/* duas conversas */}
        {[0, 1].map((i) => {
          const p = chats[i];
          if (p <= 0.001) return null;
          return (
            <div key={i} style={{ position: "absolute", left: i ? 580 : 70, top: 1010, width: 430, height: 380, boxSizing: "border-box", borderRadius: 32, background: C.bg1, border: `2px solid ${C.line}`, padding: 22, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 120}px)`, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IconChat size={44} color={C.muted} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>CONVERSA {i ? "B" : "A"}</span>
              </div>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ marginTop: 18, height: 50, width: [300, 230, 330][k], marginLeft: k === 1 ? "auto" : 0, borderRadius: 22, background: k === 1 ? C.surface3 : C.surface2, opacity: 0.4 + 0.6 * Math.max(0, Math.sin(t * 2 + k + i)) }} />
              ))}
            </div>
          );
        })}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 6, opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, q))})` }}>
            <div style={{ padding: 18, borderRadius: 80, background: C.bg0, border: `3px solid ${C.warn}` }}>
              <Buyer size={96} q={q} t={t} />
            </div>
            <Tag text="COM QUAL CONVERSAR?" tone="warn" size={30} style={{ background: C.bg0, border: `2px solid ${C.warn}` }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
