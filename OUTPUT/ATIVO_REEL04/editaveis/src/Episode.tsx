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
import { Curto } from "./scenes/Curto";
import { Outro } from "./scenes/Outro";
import { Aprend } from "./scenes/Aprend";
import { Aplic } from "./scenes/Aplic";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 04 — "Dois atendimentos, a mesma busca" (ROTEIROS/ATIVO_REEL04.md). Reel orgânico: voz oficial 1,0×, CTA SISTEMA ("Depois me
 *  conta" virou transição), verde exato #3AF584, logo oficial no fecho. Situação hipotética, sem valores nem simulação bancária. */
export const ATIVOREEL04: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * (1 - prog(t, c.h_dois, 0.8, ease.out)) - 0.12 * prog(t, c.c_esfria, 0.6, ease.out) * (1 - prog(t, c.o_seg, 0.6, ease.out)) +
    0.15 * prog(t, c.o_seg, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — dois atendimentos" layout="none" {...win(0, c.c_imagina + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — o caminho curto" layout="none" {...win(c.c_imagina - 0.45, c.o_seg + 0.1)}>
        <Curto t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — o outro caminho" layout="none" {...win(c.o_seg - 0.45, c.a_perc + 0.1)}>
        <Outro t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — o aprendizado" layout="none" {...win(c.a_perc - 0.45, c.p_antes + 0.1)}>
        <Aprend t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Aplicação + transição" layout="none" {...win(c.p_antes - 0.45, ctaAt + 0.1)}>
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
