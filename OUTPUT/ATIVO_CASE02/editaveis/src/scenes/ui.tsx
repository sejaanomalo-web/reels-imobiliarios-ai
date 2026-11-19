import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO CASE02 (desenhos próprios). Nenhuma imagem, vídeo ou perfil do agente citado: imóvel e perguntas são ilustrativos. */
export { CheckDot, HouseArt, IconChat, IconLens, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Heart, SalaArt } from "../../EP-ATIVO10/scenes/ui";

/** Lista do fecho (vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "CABE O MÓVEL?", sub: "medir na visita" },
  { k: "COMO ENTRA A LUZ?", sub: "observar e registrar" },
  { k: "PONTO DE ATENÇÃO", sub: "a conferir com o comprador" },
];

/**
 * Cômodo genérico em vista frontal (800×560): armário à esquerda (portas abrem com `doors`), janela à direita (feixes com `light`),
 * piso com caminho de circulação (`path`). Ilustração — sem medidas.
 */
export const RoomArt: React.FC<{ w: number; doors?: number; light?: number; path?: number; t?: number }> = ({ w, doors = 0, light = 0, path = 0, t = 0 }) => {
  const h = w * 0.7;
  const dw = 70 * (1 - doors * 0.85);
  return (
    <svg width={w} height={h} viewBox="0 0 800 560" style={{ display: "block" }}>
      <rect width="800" height="560" fill="#1C2028" />
      <rect y="400" width="800" height="160" fill="#2A2420" />
      <path d="M0 400 H800" stroke="#3A332C" strokeWidth="4" />
      {/* janela */}
      <rect x="520" y="90" width="210" height="230" rx="6" fill="#3E5674" />
      <path d="M625 90 V320 M520 205 H730" stroke="#1C2028" strokeWidth="10" />
      {light > 0.01 ? (
        <path d={`M520 90 L730 90 L${730 - 40 * Math.sin(t)} 560 L${300 - 40 * Math.sin(t)} 560 Z`} fill={`rgba(255,226,168,${0.16 * light})`} />
      ) : null}
      {/* armário */}
      <rect x="60" y="80" width="200" height="320" rx="6" fill="#2E343E" />
      <rect x="70" y="92" width="180" height="296" fill="#14181E" />
      {doors > 0.02 ? (
        <>
          <rect x="82" y="150" width="156" height="8" fill="#5A626E" opacity={doors} />
          <rect x="82" y="260" width="156" height="8" fill="#5A626E" opacity={doors} />
          <rect x="96" y="110" width="40" height="38" rx="4" fill="#4A525E" opacity={doors} />
          <rect x="150" y="214" width="70" height="44" rx="4" fill="#4A525E" opacity={doors} />
        </>
      ) : null}
      <rect x={70} y="92" width={dw + 20} height="296" fill="#3A424E" stroke="#4E5664" strokeWidth="3" />
      <rect x={250 - dw - 20} y="92" width={dw + 20} height="296" fill="#3A424E" stroke="#4E5664" strokeWidth="3" />
      {/* sofá */}
      <rect x="330" y="330" width="170" height="70" rx="16" fill="#4A5160" />
      <rect x="340" y="300" width="150" height="40" rx="12" fill="#565E6E" />
      {/* circulação */}
      {path > 0.01 ? (
        <path d="M120 540 C 220 470, 300 520, 420 470 S 620 440, 700 500" stroke={BRAND.hex} strokeWidth="8" fill="none" strokeDasharray="20 16" strokeDashoffset={-t * 40} opacity={Math.min(1, path * 1.5)} pathLength={1000} />
      ) : null}
    </svg>
  );
};

/** Moldura de câmera gravando (genérica). */
export const Viewfinder: React.FC<{ w: number; h: number; rec?: boolean; t: number; children?: React.ReactNode; label?: string }> = ({ w, h, rec = true, t, children, label }) => {
  const k = 46;
  const corner = (x: number, y: number, sx: number, sy: number) => <path d={`M${x} ${y + sy * k} V${y} H${x + sx * k}`} stroke={C.text} strokeWidth="6" fill="none" strokeLinecap="round" />;
  return (
    <div style={{ position: "absolute", width: w, height: h }}>
      <div style={{ position: "absolute", inset: 18, borderRadius: 18, overflow: "hidden" }}>{children}</div>
      <svg width={w} height={h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {corner(4, 4, 1, 1)}
        {corner(w - 4, 4, -1, 1)}
        {corner(4, h - 4, 1, -1)}
        {corner(w - 4, h - 4, -1, -1)}
      </svg>
      {rec ? (
        <div style={{ position: "absolute", left: 40, top: 38, display: "flex", alignItems: "center", gap: 10, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text, background: "rgba(7,8,10,0.6)", padding: "6px 12px", borderRadius: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.warn, opacity: Math.sin(t * 5) > 0 ? 1 : 0.25 }} />
          REC
        </div>
      ) : null}
      {label ? (
        <div style={{ position: "absolute", right: 40, top: 38, fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.muted, background: "rgba(7,8,10,0.6)", padding: "6px 12px", borderRadius: 10 }}>{label}</div>
      ) : null}
    </div>
  );
};

/** Marcador circular de detalhe (pulsa). */
export const Spot: React.FC<{ x: number; y: number; p: number; t: number; label?: string; color?: string }> = ({ x, y, p, t, label, color = BRAND.hex }) => {
  if (p <= 0.001) return null;
  const r = (t * 1.2) % 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, p * 1.5) }}>
      <div style={{ position: "absolute", left: -30 - r * 24, top: -30 - r * 24, width: 60 + r * 48, height: 60 + r * 48, borderRadius: "50%", border: `3px solid ${color}`, opacity: 1 - r }} />
      <div style={{ position: "absolute", left: -24, top: -24, width: 48, height: 48, borderRadius: 24, border: `5px solid ${color}`, transform: `scale(${Math.min(1.1, p)})`, boxShadow: `0 0 20px ${color === BRAND.hex ? brandAlpha(0.6) : "rgba(255,107,94,0.5)"}` }} />
      {label ? (
        <div style={{ position: "absolute", left: 34, top: -22, whiteSpace: "nowrap", fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.05em", color: C.text, background: "rgba(7,8,10,0.85)", border: `2px solid ${color}`, padding: "6px 12px", borderRadius: 12 }}>{label}</div>
      ) : null}
    </div>
  );
};
