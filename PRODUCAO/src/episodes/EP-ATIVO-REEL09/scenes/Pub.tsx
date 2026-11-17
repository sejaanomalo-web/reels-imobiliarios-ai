import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { People, Phone, PropCard, Tag } from "./ui";

/**
 * CENA 2 — UM PÚBLICO E UM IMÓVEL. "Escolheria um tipo de comprador e um imóvel que realmente combine com ele." → PERFIL DO COMPRADOR e
 * IMÓVEL (ilustrativos) ligados por COMBINA. "Em vez de publicar só fotos bonitas, gravaria um vídeo respondendo às dúvidas mais prováveis
 * daquela pessoa: espaço, localização, circulação e condições confirmadas." → pilha de FOTOS BONITAS sai; celular gravando; as quatro
 * dúvidas entram uma a uma no tempo da fala. Texto-chave: UM PÚBLICO. UM CONTEXTO.
 */
const DUV = ["ESPAÇO", "LOCALIZAÇÃO", "CIRCULAÇÃO", "CONDIÇÕES CONFIRMADAS"];

export const Pub: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.u_esc - 0.35, { damping: 15, stiffness: 150 });
  const buyer = sp(t, c.u_comp - 0.2, { damping: 12, stiffness: 190 });
  const prop = sp(t, c.u_imovel - 0.2, { damping: 12, stiffness: 190 });
  const link = prog(t, c.u_comb - 0.2, 0.5, ease.inOut);
  const up = prog(t, c.u_em - 0.2, 0.6, ease.inOut);
  const photos = sp(t, c.u_em, { damping: 13, stiffness: 180 });
  const photosOut = prog(t, c.u_grav - 0.3, 0.5, ease.in);
  const phone = sp(t, c.u_grav - 0.2, { damping: 13, stiffness: 170 });
  const at = [c.u_esp, c.u_loc, c.u_circ, c.u_cond];
  const duv = at.map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 210 }));
  const out = prog(t, c.p_dep - 0.45, 0.4, ease.in);
  const rec = Math.floor(t * 2) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.3}
        t={t}
        keys={[
          { t: c.u_esc - 0.35, s: 1.065, y: 0 },
          { t: ((c.u_esc - 0.35) + (c.u_comp + 0.2)) / 2, s: 1.090, x: 3, y: -15, e: ease.inOut },
          { t: c.u_comp + 0.2, s: 1.090, x: -24, y: 0, e: ease.inOut },
          { t: ((c.u_comp + 0.2) + (c.u_imovel + 0.2)) / 2, s: 1.090, x: -15, y: -15, e: ease.inOut },
          { t: c.u_imovel + 0.2, s: 1.090, x: 24, y: 0, e: ease.inOut },
          { t: ((c.u_imovel + 0.2) + (c.u_comb + 0.4)) / 2, s: 1.090, x: 27, y: -15, e: ease.inOut },
          { t: c.u_comb + 0.4, s: 1.026, x: 0, y: 0, e: ease.inOut },
          { t: ((c.u_comb + 0.4) + (c.u_fotos + 0.3)) / 2, s: 1.090, x: -7, y: -15, e: ease.inOut },
          { t: c.u_fotos + 0.3, s: 1.065, x: 16, y: -16, e: ease.inOut },
          { t: ((c.u_fotos + 0.3) + (c.u_grav + 0.3)) / 2, s: 1.090, x: 23, y: -15, e: ease.inOut },
          { t: c.u_grav + 0.3, s: 1.026, x: 0, y: 0, e: ease.inOut },
          { t: ((c.u_grav + 0.3) + (c.u_esp + 0.2)) / 2, s: 1.090, x: -21, y: -15, e: ease.inOut },
          { t: c.u_esp + 0.2, s: 1.065, x: -12, y: -16, e: ease.inOut },
          { t: ((c.u_esp + 0.2) + (c.u_loc + 0.2)) / 2, s: 1.090, x: 15, y: -15, e: ease.inOut },
          { t: c.u_loc + 0.2, s: 1.039, x: 12, y: -16, e: ease.inOut },
          { t: ((c.u_loc + 0.2) + (c.u_circ + 0.2)) / 2, s: 1.090, x: -15, y: -15, e: ease.inOut },
          { t: c.u_circ + 0.2, s: 1.065, x: -12, y: -16, e: ease.inOut },
          { t: ((c.u_circ + 0.2) + (c.u_cond + 0.3)) / 2, s: 1.090, x: 13, y: -15, e: ease.inOut },
          { t: c.u_cond + 0.3, s: 1.039, x: 8, y: 0, e: ease.inOut },
          { t: c.p_dep, s: 1.065, y: 0, e: ease.linear },
        ]}
      >
        {/* comprador ↔ imóvel (sobe e encolhe quando o vídeo entra) */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transform: `translateY(${mix(0, -40, up)}px) scale(${mix(1, 0.7, up)})`, transformOrigin: "50% 400px" }}>
          {buyer > 0.001 ? (
            <div style={{ position: "absolute", left: 110, top: 480, width: 330, boxSizing: "border-box", padding: "24px 20px", borderRadius: 30, background: C.surface, border: `2px solid ${link > 0.5 ? BRAND.hex : C.line}`, textAlign: "center", opacity: Math.min(1, buyer * 1.5), transform: `translateX(${(1 - Math.min(1, buyer)) * -100}px) translateY(${Math.sin(t * 1.6) * 14}px) rotate(${Math.sin(t * 1.1) * 1.5}deg)` }}>
              <div style={{ display: "flex", justifyContent: "center" }}><People n={1} size={120} /></div>
              <div style={{ marginTop: 10, fontWeight: 800, fontSize: 34, color: C.text }}>UM TIPO DE COMPRADOR</div>
            </div>
          ) : null}
          {prop > 0.001 ? (
            <div style={{ position: "absolute", left: 640, top: 480, opacity: Math.min(1, prop * 1.5), transform: `translateX(${(1 - Math.min(1, prop)) * 100}px) translateY(${Math.sin(t * 1.6 + 1) * 14}px) rotate(${Math.sin(t * 1.2 + 1) * 1.5}deg)` }}>
              <PropCard w={330} ok={link > 0.5} i={2} />
              <div style={{ marginTop: 10, textAlign: "center", fontWeight: 800, fontSize: 34, color: C.text }}>UM IMÓVEL</div>
            </div>
          ) : null}
          <div style={{ position: "absolute", left: 450, top: 600, width: 180, height: 8, borderRadius: 4, background: BRAND.hex, transformOrigin: "0 50%", transform: `scaleX(${link})`, boxShadow: `0 0 16px ${brandAlpha(0.5)}` }} />
          {link > 0.5 ? <div style={{ position: "absolute", left: 440, top: 630, width: 200, display: "flex", justifyContent: "center", opacity: prog(link, 0.5, 0.5, ease.out) }}><Tag text="COMBINA" tone="accent" size={26} /></div> : null}
        </div>
        {/* só fotos bonitas */}
        {photos > 0.001 && photosOut < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", gap: 20, opacity: Math.min(1, photos * 1.5) * (1 - photosOut), transform: `translateX(${photosOut * -600}px)` }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ transform: `rotate(${(k - 1) * 8}deg) translateY(${Math.abs(k - 1) * 20}px)`, filter: "grayscale(0.6)" }}><PropCard w={230} i={k} /></div>)}
            <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}><Tag text="SÓ FOTOS BONITAS" tone="muted" size={28} style={{ color: C.text, background: C.surface3 }} /></div>
          </div>
        ) : null}
        {/* o vídeo que responde */}
        {phone > 0.001 ? (
          <div style={{ position: "absolute", left: 120, top: 760, opacity: Math.min(1, phone * 1.5), transform: `translateY(${(1 - Math.min(1, phone)) * 200 + Math.sin(t * 1.5) * 10}px) rotate(${Math.sin(t * 1.1) * 2}deg)` }}>
            <Phone w={300} h={520}>
              <div style={{ position: "absolute", inset: 0, background: "#1B2430" }}>
                <div style={{ position: "absolute", left: -20, top: 80, transform: `scale(${1.1 + 0.05 * Math.sin(t * 0.8)})` }}><PropCard w={340} i={2} /></div>
                <div style={{ position: "absolute", left: 20, top: 24, display: "flex", alignItems: "center", gap: 8, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: C.warn, opacity: rec ? 1 : 0.3 }} />REC
                </div>
              </div>
            </Phone>
          </div>
        ) : null}
        {/* lacunas: as dúvidas que o vídeo vai responder */}
        {[0, 1, 2, 3].map((i) => { const sl = prog(t, c.u_duv - 0.2 + i * 0.12, 0.4, ease.out); return sl > 0 && duv[i] < 0.6 ? <div key={i} style={{ position: "absolute", left: 470, right: 90, top: 790 + i * 120, height: 100, boxSizing: "border-box", borderRadius: 24, border: `3px dashed ${C.dim}`, opacity: sl * (1 - Math.min(1, duv[i] * 1.6)) * (0.7 + 0.3 * Math.sin(t * 3 + i)) }} /> : null; })}
        {DUV.map((d, i) => {
          const a = duv[i];
          if (a <= 0.001) return null;
          return (
            <div key={d} style={{ position: "absolute", left: 470, right: 90, top: 790 + i * 120, height: 100, boxSizing: "border-box", padding: "0 22px", borderRadius: 24, background: i === 3 ? BRAND.deep : C.surface2, border: `2px solid ${brandAlpha(0.5)}`, display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * 120 + Math.sin(t * 2 + i) * 8}px)` }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28, flex: "none" }}>?</div>
              <span style={{ fontWeight: 800, fontSize: i === 3 ? 28 : 34, color: C.text, letterSpacing: "-0.01em" }}>{d}</span>
            </div>
          );
        })}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        UM PÚBLICO. <span style={{ color: BRAND.hex }}>UM CONTEXTO.</span>
      </div>
    </div>
  );
};
