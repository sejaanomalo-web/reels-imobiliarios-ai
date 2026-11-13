import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Market } from "./scenes/Market";
import { Buyer } from "./scenes/Buyer";
import { Portfolio } from "./scenes/Portfolio";
import { Owner } from "./scenes/Owner";
import { Compass } from "./scenes/Compass";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 01 — "Para quem sua operação realmente trabalha?". Roteiro do cliente (ROTEIROS/ATIVO_EP01.md),
 *  voz original aprovada em 1,0×; CTA de relacionamento por comentário (QUAL É O SEU FOCO?). Sem logo: arquivo oficial não está no repositório. */
export const ATIVO01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const hidden = tl.hideCaptions ?? [];
  const captions = tl.captions.filter((k) => !hidden.includes(k.seg));
  const mood =
    0.1 * (1 - prog(t, c.h_prob, 0.5, ease.out)) -
    0.35 * prog(t, c.h_prob, 0.5, ease.out) * (1 - prog(t, c.b_first, 0.4, ease.out)) +
    0.3 * prog(t, c.b_first, 0.5, ease.out) * (1 - prog(t, c.i_err, 0.5, ease.out)) -
    0.1 * prog(t, c.i_err, 0.5, ease.out) * (1 - prog(t, c.i_clear, 0.5, ease.out)) +
    0.5 * prog(t, c.i_clear, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — mesmo mercado" layout="none" {...win(0, c.h_same + 0.9)}>
        <Market t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Comprador" layout="none" {...win(c.b_first - 0.2, c.p_second + 0.35)}>
        <Buyer t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Carteira" layout="none" {...win(c.p_second - 0.2, c.o_start + 0.35)}>
        <Portfolio t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Proprietário" layout="none" {...win(c.o_start - 0.2, c.i_err + 0.35)}>
        <Owner t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight + CTA" layout="none" {...win(c.i_err - 0.2, tl.duration)}>
        <Compass t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
