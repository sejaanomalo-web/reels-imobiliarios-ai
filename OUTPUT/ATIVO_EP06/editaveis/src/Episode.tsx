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
import { Contato } from "./scenes/Contato";
import { Imovel } from "./scenes/Imovel";
import { Investigacao } from "./scenes/Investigacao";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 06 — "Sua imobiliária tem um gargalo. Mas onde ele está?" (ROTEIROS/ATIVO_EP06.md). Reel orgânico: voz oficial
 *  1,0×, CTA SISTEMA do próprio roteiro, verde exato #3AF584, logo oficial no fecho. */
export const ATIVO06: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.25 * prog(t, c.h_param, 0.6, ease.out) * (1 - prog(t, c.v_garg, 0.6, ease.out)) +
    0.15 * prog(t, c.v_garg, 0.6, ease.out) * (1 - prog(t, c.cta_sys, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — onde está o gargalo?" layout="none" {...win(0, c.c_acomp + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 O caminho do contato" layout="none" {...win(c.c_acomp - 0.45, c.i_siga + 0.1)}>
        <Contato t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 O caminho do imóvel" layout="none" {...win(c.i_siga - 0.45, c.v_garg + 0.1)}>
        <Imovel t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 A investigação — 5 perguntas" layout="none" {...win(c.v_garg - 0.45, c.g_boa + 0.1)}>
        <Investigacao t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — enxergar o fluxo" layout="none" {...win(c.g_boa - 0.45, c.cta_se + 0.1)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 CTA SISTEMA" layout="none" {...win(c.cta_se - 0.4, tl.duration)}>
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
