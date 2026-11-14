import React from "react";
import { Img, staticFile } from "remotion";
import { clamp01, ease, mix } from "../../lib/anim";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { CaseAsset, previewable } from "./cases";

/** Capturas higienizadas: 2000 × 1102 px (PRODUCAO/public/cases/ativo). */
export const CAP_W = 2000;
export const CAP_H = 1102;

/** Quadro-chave da "câmera" dentro da captura: centro (x, y) em px da captura e zoom z (px de tela por px de captura). */
export type CapKey = { t: number; x: number; y: number; z: number; e?: (p: number) => number };

export const capCam = (t: number, keys: CapKey[]) => {
  if (t <= keys[0].t) return keys[0];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (t <= b.t) {
      const p = (b.e ?? ease.inOut)(clamp01((t - a.t) / Math.max(0.001, b.t - a.t)));
      return { t, x: mix(a.x, b.x, p), y: mix(a.y, b.y, p), z: mix(a.z, b.z, p) };
    }
  }
  return keys[keys.length - 1];
};

/** Captura real dentro de um quadro (w × h), enquadrada pela câmera; sem captura liberada, quadro "CAPTURA PENDENTE". */
export const Capture: React.FC<{
  c: CaseAsset;
  w: number;
  h: number;
  cam: { x: number; y: number; z: number };
  children?: React.ReactNode;
}> = ({ c, w, h, cam, children }) => {
  if (!previewable(c)) {
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "repeating-linear-gradient(135deg, #12161B 0 22px, #161B21 22px 44px)", fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em", color: C.muted }}>
        CAPTURA PENDENTE
      </div>
    );
  }
  const left = w / 2 - cam.x * cam.z;
  const top = h / 2 - cam.y * cam.z;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
      <div style={{ position: "absolute", left, top, width: CAP_W * cam.z, height: CAP_H * cam.z }}>
        <Img src={staticFile(c.file)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        {/* filhos posicionados em px da captura, já escalados */}
        <div style={{ position: "absolute", left: 0, top: 0, width: CAP_W, height: CAP_H, transform: `scale(${cam.z})`, transformOrigin: "0 0" }}>{children}</div>
      </div>
    </div>
  );
};

/** Destaque sobre uma região REAL da captura (coordenadas da captura). Não inventa conteúdo: só aponta o que existe. */
export const Mark: React.FC<{ x: number; y: number; w: number; h: number; p: number; r?: number; z?: number }> = ({ x, y, w, h, p, r = 18, z = 1 }) =>
  p > 0.001 ? (
    <div
      style={{
        position: "absolute",
        left: x - 8,
        top: y - 8,
        width: w + 16,
        height: h + 16,
        borderRadius: r,
        border: `${6 / z}px solid ${BRAND.hex}`,
        boxShadow: `0 0 ${36 / z}px ${brandAlpha(0.55)}, inset 0 0 ${24 / z}px ${brandAlpha(0.18)}`,
        opacity: Math.min(1, p * 1.6),
        transform: `scale(${mix(1.25, 1, Math.min(1, p))})`,
        transformOrigin: "50% 50%",
      }}
    />
  ) : null;

/** Janela de navegador neutra (sem URL) que hospeda a captura. */
export const Frame: React.FC<{ w: number; h: number; style?: React.CSSProperties; glow?: number; children: React.ReactNode }> = ({ w, h, style, glow = 0, children }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      height: h,
      borderRadius: 34,
      overflow: "hidden",
      background: "#0E1114",
      border: `3px solid ${glow > 0.3 ? BRAND.hex : "rgba(255,255,255,0.16)"}`,
      boxShadow: `0 50px 110px rgba(0,0,0,0.6)${glow > 0 ? `, 0 0 ${60 * glow}px ${brandAlpha(0.35 * glow)}` : ""}`,
      ...style,
    }}
  >
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", background: "#1A1F25", zIndex: 2 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.22)" }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 44, bottom: 0 }}>{children}</div>
  </div>
);

/** Título curto (2–4 palavras do roteiro). `hl` = trecho em verde. */
export const Title: React.FC<{ text: string; hl?: string; p: number; out?: number; top?: number; size?: number }> = ({ text, hl, p, out = 0, top = 290, size = 92 }) => {
  if (p <= 0.001 || out >= 0.999) return null;
  const parts = hl ? text.split(hl) : [text];
  return (
    <div style={{ position: "absolute", left: 100, right: 100, top, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, p * 1.5) * (1 - out), transform: `translateY(${(1 - Math.min(1, p)) * 50 - out * 40}px)` }}>
      {hl ? (
        <>
          {parts[0]}
          <span style={{ color: BRAND.hex }}>{hl}</span>
          {parts[1]}
        </>
      ) : (
        text
      )}
    </div>
  );
};

/** Marca d'água de prévia interna (sem voz oficial e/ou sem autorização de nome/marca dos corretores). */
export const PreviewMark: React.FC<{ noVoice: boolean; noAuth: boolean }> = ({ noVoice, noAuth }) =>
  noVoice || noAuth ? (
    <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.14em", color: C.warn }}>
      {["PRÉVIA INTERNA", noVoice ? "SEM VOZ" : null, noAuth ? "SEM AUTORIZAÇÃO" : null, "NÃO PUBLICAR"].filter(Boolean).join(" · ")}
    </div>
  ) : null;

/** Câmera viva: deriva lenta e limitada do palco (nunca congela; não move legenda nem marca d'água). */
export const Drift: React.FC<{ t: number; amt?: number; children: React.ReactNode }> = ({ t, amt = 1, children }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      transform: `translate(${Math.sin(t * 0.45) * 14 * amt}px, ${Math.cos(t * 0.38) * 10 * amt}px) scale(${1.03 + 0.03 * amt * Math.sin(t * 0.6)}) rotate(${Math.sin(t * 0.3) * 0.4 * amt}deg)`,
      transformOrigin: "50% 45%",
    }}
  >
    {children}
  </div>
);
