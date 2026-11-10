import React from "react";
import { C, F } from "../theme";
import { ease, prog } from "../lib/anim";
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
                  background: "rgba(53,224,161,0.2)",
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
