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
import { Q1 } from "./scenes/Q1";
import { Q23 } from "./scenes/Q23";
import { Q4 } from "./scenes/Q4";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 04 — "A pergunta que falta quando as vendas não acontecem". Roteiro do cliente (ROTEIROS/ATIVO_EP04.md),
 *  voz original aprovada 1,0×; CTA de comentário SISTEMA → Direct (regra do cliente para Reels, 14/11/2026); logo oficial no fecho. */
export const ATIVO04: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.25 * (1 - prog(t, c.h_perg, 0.8, ease.out)) +
    0.15 * prog(t, c.i_sep, 0.6, ease.out) * (1 - prog(t, c.cta_sys, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — o que você consegue medir?" layout="none" {...win(0, c.a_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Pergunta 1 — conversas iniciadas" layout="none" {...win(c.a_prim - 0.45, c.b_seg + 0.1)}>
        <Q1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Perguntas 2 e 3 — aprendizado e público" layout="none" {...win(c.b_seg - 0.45, c.d_quar + 0.1)}>
        <Q23 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Pergunta 4 — por que mudou?" layout="none" {...win(c.d_quar - 0.45, c.i_fat + 0.1)}>
        <Q4 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — fora do controle × sob sua ação" layout="none" {...win(c.i_fat - 0.45, c.i_use + 0.1)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 Revisão + CTA SISTEMA" layout="none" {...win(c.i_use - 0.3, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
