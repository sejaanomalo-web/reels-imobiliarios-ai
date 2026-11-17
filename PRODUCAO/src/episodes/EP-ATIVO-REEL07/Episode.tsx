import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Hook } from "./scenes/Hook";
import { Prim } from "./scenes/Prim";
import { Seg } from "./scenes/Seg";
import { Porque } from "./scenes/Porque";
import { Aplic } from "./scenes/Aplic";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 07 — "O proprietário não quer apenas mais um anúncio" (ROTEIROS/ATIVO_REEL07.md). Reel orgânico: voz oficial 1,0×, CTA
 *  SISTEMA ("Compartilha…" virou transição), verde exato #3AF584, logo oficial no fecho. Exemplo ilustrativo, sem preços nem garantia. */
export const ATIVOREEL07: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * prog(t, c.p_prim, 0.6, ease.out) * (1 - prog(t, c.g_seg, 0.6, ease.out)) +
    0.15 * prog(t, c.g_seg, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — mesmo sobrado, duas propostas" layout="none" {...win(0, c.p_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Primeira abordagem" layout="none" {...win(c.p_prim - 0.45, c.g_seg + 0.1)}>
        <Prim t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Segunda abordagem" layout="none" {...win(c.g_seg - 0.45, c.q_prop + 0.1)}>
        <Seg t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Por quê" layout="none" {...win(c.q_prop - 0.45, c.a_prox + 0.1)}>
        <Porque t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Aplicação + transição" layout="none" {...win(c.a_prox - 0.45, ctaAt + 0.1)}>
        <Aplic t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 CTA SISTEMA" layout="none" {...win(ctaAt - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
