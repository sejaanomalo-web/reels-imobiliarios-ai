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
import { Duvidas } from "./scenes/Duvidas";
import { Pauta } from "./scenes/Pauta";
import { Resp } from "./scenes/Resp";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 10 — "O conteúdo que um comprador precisa antes de visitar o imóvel" (ROTEIROS/ATIVO_EP10.md). Reel orgânico: voz
 *  oficial 1,0×, CTA SISTEMA ("Salve e envie" virou transição), verde exato #3AF584, logo oficial no fecho. Sem valores nem regras de programa. */
export const ATIVO10: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.15 * prog(t, c.h_desc, 0.6, ease.out) * (1 - prog(t, c.h_importa, 0.8, ease.out)) +
    0.15 * prog(t, c.d_antes, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — eu consigo comprar?" layout="none" {...win(0, c.d_antes + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 As dúvidas" layout="none" {...win(c.d_antes - 0.45, c.p_serie + 0.1)}>
        <Duvidas t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 A pauta certa" layout="none" {...win(c.p_serie - 0.45, c.r_se + 0.1)}>
        <Pauta t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 A responsabilidade" layout="none" {...win(c.r_se - 0.45, c.i_im + 0.1)}>
        <Resp t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight + transição" layout="none" {...win(c.i_im - 0.45, ctaAt + 0.1)}>
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
