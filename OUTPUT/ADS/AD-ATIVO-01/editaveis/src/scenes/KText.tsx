import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog } from "../../../lib/anim";
import type { CaptionChunk } from "../../types";

/**
 * Transcrição dinâmica do anúncio: o texto da tela É a fala. Bloco de 2–4 palavras (os "|" do roteiro), palavra a palavra no
 * instante em que é dita, palavras-chave (marcadas com * no episode.json) em destaque: vermelho no problema, verde na solução.
 * Cada bloco entra com um "soco" de escala; a palavra falada pulsa. Faixa y ≈ 930–1240 (acima do botão da Meta).
 */
export const KText: React.FC<{ t: number; chunks: CaptionChunk[]; solutionAt: number; hidden: string[]; hideFrom?: number; top?: number; size?: number }> = ({ t, chunks, solutionAt, hidden, hideFrom = Infinity, top = 935, size = 84 }) => {
  if (t >= hideFrom) return null;
  const list = chunks.filter((k) => !hidden.includes(k.seg));
  const idx = list.findIndex((ch, i) => t >= ch.words[0].start - 0.06 && (i + 1 >= list.length || t < list[i + 1].words[0].start - 0.06));
  if (idx < 0) return null;
  const ch = list[idx];
  const last = ch.words[ch.words.length - 1];
  const out = idx + 1 < list.length ? 0 : prog(t, last.end + 0.5, 0.25, ease.in);
  const enter = prog(t, ch.words[0].start - 0.06, 0.14, ease.out);
  const hot = t >= solutionAt ? BRAND.hex : C.warn;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, display: "flex", justifyContent: "center", alignItems: "baseline", flexWrap: "wrap", columnGap: size * 0.24, rowGap: 4, opacity: 1 - out, transform: `scale(${mix(1.12, 1, enter)})`, transformOrigin: "50% 30%", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", textTransform: "uppercase", pointerEvents: "none" }}>
      {ch.words.map((w, i) => {
        const p = prog(t, w.start - 0.05, 0.12, ease.out);
        const speaking = t >= w.start && t < w.end + 0.04;
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * size * 0.4}px) scale(${mix(1.35, 1, p) * (speaking ? 1.06 : 1)})`, color: w.emph ? hot : C.text, textShadow: w.emph ? `0 0 34px ${t >= solutionAt ? brandAlpha(0.45) : "rgba(255,107,94,0.4)"}` : "0 6px 24px rgba(0,0,0,0.7)" }}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
