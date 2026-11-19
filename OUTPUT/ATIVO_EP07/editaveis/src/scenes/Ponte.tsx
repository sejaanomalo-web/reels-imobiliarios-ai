import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Msg, Tag, Thumb } from "./ui";

/**
 * CENA 3 — A PONTE (EXEMPLO ILUSTRATIVO). "Uma alternativa é começar conectando o pedido à resposta." → uma linha verde sai do pedido
 * do lead. A resposta sugerida é digitada palavra a palavra, no tempo da fala (a legenda some: o balão É a fala), e cada frase ganha
 * a sua marcação: RECONHECE O PEDIDO · ENTREGA UM DADO · OFERECE UM PRÓXIMO PASSO. "Use apenas dados confirmados do imóvel
 * anunciado." → ficha do imóvel com 2 quartos ✓ · 1 vaga ✓ e o selo SÓ DADOS CONFIRMADOS (sem endereço nem preço).
 */
const BOX = { x: 110, y: 290, w: 860, h: 1010 };
const clean = (s: string) => s.replace(/[“”"*]/g, "");

export const Ponte: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const words = (seg: string, skip = 0) => tl.captions.filter((k) => k.seg === seg).flatMap((k) => k.words).slice(skip).filter((w) => w.text);
  const lines = [
    { ws: words("s8", 2), tag: "RECONHECE O PEDIDO", at: c.b_vi, mark: c.b_perg + 0.5 },
    { ws: words("s9"), tag: "ENTREGA UM DADO", at: c.b_ele, mark: c.b_quartos + 0.55 },
    { ws: words("s10"), tag: "OFERECE UM PRÓXIMO PASSO", at: c.b_quer - 0.3, mark: c.b_comp + 0.6 },
  ];
  const tops = [300, 545, 760];
  const enter = sp(t, c.b_alt - 0.35, { damping: 15, stiffness: 150 });
  const link = prog(t, c.b_conec - 0.1, 0.9, ease.inOut);
  const reached = lines.filter((l) => t >= l.at - 0.2).length;
  const linkLen = mix(0, [0, 200, 440, 660][reached] + 40, link);
  const card = sp(t, c.b_use - 0.15, { damping: 14, stiffness: 160 });
  const stamp = sp(t, c.b_conf - 0.05, { damping: 9, stiffness: 240 });
  const out = prog(t, c.f_se - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.b_alt - 0.35, s: 0.94, y: 30 },
          { t: c.b_conec + 0.8, s: 1.0, y: 0, e: ease.inOut },
          { t: c.b_vi + 0.4, s: 1.06, y: -90, e: ease.inOut },
          { t: c.b_ele + 0.3, s: 1.06, y: 20, e: ease.inOut },
          { t: c.b_quer + 0.3, s: 1.05, y: 100, e: ease.inOut },
          { t: c.b_use - 0.1, s: 0.92, y: 215, e: ease.inOut },
          { t: c.f_se, s: 0.93, y: 220, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: BOX.x, top: BOX.y, width: BOX.w, height: BOX.h, boxSizing: "border-box", borderRadius: 44, background: C.bg1, border: `2px solid ${reached > 0 ? brandAlpha(0.35) : C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", overflow: "hidden" }}>
          <div style={{ height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 30px", background: C.surface, borderBottom: `1px solid ${C.lineSoft}` }}>
            <Avatar size={62} label="L" bg="#4E6A8C" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Lead do anúncio</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>online</div>
            </div>
            <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={18} />
          </div>
          <div style={{ position: "absolute", left: 60, top: 128 }}>
            <Msg side="in" size={32} style={{ maxWidth: 560, border: `2px solid ${link > 0.3 ? BRAND.hex : C.line}`, boxShadow: link > 0.3 ? `0 0 30px ${brandAlpha(0.3)}` : undefined }}>Oi! Pode me passar informações do apartamento?</Msg>
          </div>
          {/* linha que conecta o pedido à resposta */}
          <div style={{ position: "absolute", left: 34, top: 180, width: 6, height: linkLen, borderRadius: 3, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.6)}` }} />
          {lines.map((l, i) => {
            const a = sp(t, l.at - 0.25, { damping: 14, stiffness: 190 });
            if (a <= 0.001) return null;
            const m = sp(t, l.mark - 0.1, { damping: 11, stiffness: 220 });
            return (
              <div key={i} style={{ position: "absolute", left: 60, right: 30, top: tops[i], opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 40}px)` }}>
                <div style={{ position: "absolute", left: -34, top: 58, width: 22, height: 22, borderRadius: 11, background: BRAND.hex, boxShadow: `0 0 16px ${brandAlpha(0.7)}` }} />
                <div style={{ height: 44, display: "flex", justifyContent: "flex-end", opacity: Math.min(1, m * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, m))})`, transformOrigin: "100% 50%" }}>
                  <Tag text={`${i + 1} · ${l.tag}`} tone="accent" size={24} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Msg side="out" tone="good" size={34} style={{ maxWidth: 680, marginTop: 6 }}>
                    {l.ws.map((w, k) => {
                      const p = prog(t, w.start - 0.04, 0.12, ease.out);
                      return (
                        <span key={k} style={{ opacity: mix(0.14, 1, p), color: w.emph && p > 0.5 ? BRAND.hex : undefined }}>
                          {clean(w.text)}{" "}
                        </span>
                      );
                    })}
                  </Msg>
                </div>
              </div>
            );
          })}
        </div>
      </Camera>
      {/* ficha do imóvel: só dados confirmados */}
      {card > 0.001 ? (
        <div style={{ position: "absolute", left: 150, top: 1040, width: 780, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${stamp > 0.5 ? brandAlpha(0.6) : C.line}`, padding: "24px 26px", display: "flex", gap: 26, alignItems: "center", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 160}px)`, boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>
          <Thumb w={220} h={150} lit={stamp} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.08em", color: C.muted }}>IMÓVEL ANUNCIADO</div>
            {["2 quartos", "1 vaga"].map((k, i) => (
              <div key={k} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 14 }}>
                <CheckDot p={prog(t, c.b_conf - 0.2 + i * 0.18, 0.4, ease.out)} size={44} />
                <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{k}</span>
              </div>
            ))}
          </div>
          {stamp > 0.01 ? (
            <div style={{ position: "absolute", right: -10, top: -60, transform: `rotate(-4deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, opacity: Math.min(1, stamp * 1.5) }}>
              <Tag text="SÓ DADOS CONFIRMADOS" tone="accent" size={28} style={{ background: BRAND.deep, border: `2px solid ${BRAND.hex}` }} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
