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
import { Pressao } from "./scenes/Pressao";
import { Percepcao } from "./scenes/Percepcao";
import { Metodo } from "./scenes/Metodo";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 03 — "A energia de um bom corretor não vem de um discurso motivacional". Roteiro do cliente
 *  (ROTEIROS/ATIVO_EP03.md), voz original aprovada 1,0×, CTA do próprio roteiro (compartilhamento), logo oficial no fecho. */
export const ATIVO03: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.25 * prog(t, c.p_dia, 0.6, ease.out) * (1 - prog(t, c.p_cob + 0.4, 0.8, ease.out)) +
    0.2 * prog(t, c.q_sig, 0.6, ease.out) * (1 - prog(t, c.i_conf, 0.6, ease.out)) +
    0.45 * prog(t, c.i_atend, 0.8, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — ânimo ≠ preparo" layout="none" {...win(0, c.p_dia + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Pressão real" layout="none" {...win(c.p_dia - 0.45, c.q_so + 0.6)}>
        <Pressao t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Percepção — performance × preparação" layout="none" {...win(c.q_so - 0.3, c.m_antes + 0.1)}>
        <Percepcao t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Método — 3 verificações + registro" layout="none" {...win(c.m_antes - 0.35, c.i_conf + 0.1)}>
        <Metodo t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — energia × segurança" layout="none" {...win(c.i_conf - 0.35, c.c_comp + 0.1)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 CTA — compartilhe" layout="none" {...win(c.c_comp - 0.35, tl.duration)}>
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
