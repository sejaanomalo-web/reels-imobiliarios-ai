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
import { Resposta } from "./scenes/Resposta";
import { Ponte } from "./scenes/Ponte";
import { Confianca } from "./scenes/Confianca";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 07 — "Um lead de anúncio ainda não conhece você" (ROTEIROS/ATIVO_EP07.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA (o "Salve este vídeo" do roteiro virou transição), verde exato #3AF584, logo oficial no fecho. */
export const ATIVO07: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = tl.segments.find((s) => s.id === "s20")?.start ?? c.cta_sys - 0.9;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.25 * prog(t, c.r_imag, 0.6, ease.out) * (1 - prog(t, c.b_alt, 0.6, ease.out)) +
    0.15 * prog(t, c.b_alt, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — indicação × anúncio" layout="none" {...win(0, c.r_imag + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 A resposta que não orienta" layout="none" {...win(c.r_imag - 0.45, c.b_alt + 0.1)}>
        <Resposta t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 A ponte — pedido → resposta" layout="none" {...win(c.b_alt - 0.45, c.f_se + 0.1)}>
        <Ponte t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Uma questão por vez" layout="none" {...win(c.f_se - 0.45, c.i_prim + 0.1)}>
        <Confianca t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — contexto, clareza, confiança" layout="none" {...win(c.i_prim - 0.45, ctaAt + 0.1)}>
        <Insight t={t} tl={tl} />
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
