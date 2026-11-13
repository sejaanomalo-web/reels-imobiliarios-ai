import React from "react";
import { C, F, brandAlpha } from "../theme";
import { ease, mix, prog } from "../lib/anim";
import type { CaptionChunk } from "../episodes/types";

/**
 * Legendas guiadas pela fala: um bloco curto por vez, palavra a palavra no tempo real da narração.
 * Palavras-chave recebem a cor de acento e um marcador que "pinta" por baixo.
 */
export const Captions: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number }> = ({
  t,
  chunks,
  y = 1392,
  size = 68,
}) => {
  const chunk = chunks.find((c) => t >= c.start - 0.02 && t < c.end);
  if (!chunk) return null;
  const out = 1 - prog(t, chunk.end - 0.09, 0.09, ease.in);
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        right: 110,
        top: y - size,
        height: size * 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: size * 0.27,
        opacity: out,
        fontFamily: F.sans,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.025em",
        lineHeight: 1.08,
        color: C.text,
        textShadow: "0 4px 26px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
      }}
    >
      {chunk.words.map((w, i) => {
        const a = prog(t, w.start - 0.03, 0.14, ease.out);
        const mark = prog(t, w.start + 0.02, 0.26, ease.out);
        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              opacity: a,
              translate: `0px ${(1 - a) * 18}px`,
              filter: `blur(${(1 - a) * 6}px)`,
              color: w.emph ? C.accent : C.text,
              whiteSpace: "nowrap",
            }}
          >
            {w.emph ? (
              <span
                style={{
                  position: "absolute",
                  left: -10,
                  right: -10,
                  bottom: size * 0.02,
                  height: size * 0.3,
                  borderRadius: size * 0.1,
                  background: brandAlpha(0.2),
                  scale: `${mark} 1`,
                  transformOrigin: "left center",
                }}
              />
            ) : null}
            <span style={{ position: "relative" }}>{w.text}</span>
          </span>
        );
      })}
    </div>
  );
};

/**
 * Legenda dinâmica (a partir do EP003): blocos de 1–3 palavras, cada palavra entra com "pop" no instante em que é dita,
 * a palavra falada no momento fica sublinhada, palavras-chave em cor de acento, e uma base escura translúcida garante
 * contraste sobre qualquer fundo.
 */
export const CaptionsPunch: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number }> = ({
  t,
  chunks,
  y = 1392,
  size = 72,
}) => {
  const chunk = chunks.find((c) => t >= c.start - 0.03 && t < c.end);
  if (!chunk) return null;
  const inP = prog(t, chunk.start - 0.03, 0.1, ease.out);
  const out = 1 - prog(t, chunk.end - 0.07, 0.07, ease.in);
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        top: y - size,
        height: size * 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: out,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: size * 0.26,
          padding: `${size * 0.12}px ${size * 0.34}px`,
          borderRadius: size * 0.3,
          background: "rgba(7,8,10,0.62)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
          transform: `scale(${mix(0.92, 1, inP)})`,
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: size,
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          color: C.text,
        }}
      >
        {chunk.words.map((w, i) => {
          const a = prog(t, w.start - 0.03, 0.12, ease.out);
          const next = chunk.words[i + 1]?.start ?? chunk.end;
          const speaking = t >= w.start - 0.02 && t < next;
          const pop = Math.max(0, 1 - Math.abs(t - w.start - 0.04) / 0.14);
          return (
            <span
              key={i}
              style={{
                position: "relative",
                display: "inline-block",
                opacity: mix(0.25, 1, a),
                transform: `translateY(${(1 - a) * 14}px) scale(${1 + 0.12 * pop})`,
                color: w.emph ? C.accent : C.text,
                whiteSpace: "nowrap",
              }}
            >
              {w.text}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -size * 0.04,
                  height: size * 0.07,
                  borderRadius: size * 0.04,
                  background: w.emph ? C.accent : "rgba(255,255,255,0.85)",
                  opacity: speaking ? 1 : 0,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};
