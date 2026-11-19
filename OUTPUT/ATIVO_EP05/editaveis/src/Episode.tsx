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
import { Problema } from "./scenes/Problema";
import { Mudanca } from "./scenes/Mudanca";
import { Execucao } from "./scenes/Execucao";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 05 — "Parceria imobiliária não começa com uma promessa de comissão". Roteiro do cliente (ROTEIROS/ATIVO_EP05.md),
 *  voz original aprovada 1,0×; CTA de comentário SISTEMA → Direct (regra do cliente para Reels, 14/11/2026); verde exato #3AF584. */
export const ATIVO05: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.25 * prog(t, c.h_ninguem, 0.6, ease.out) * (1 - prog(t, c.m_proc, 0.8, ease.out)) +
    0.15 * prog(t, c.m_proc, 0.8, ease.out) * (1 - prog(t, c.cta_sys, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — 2 corretores, 1 imóvel" layout="none" {...win(0, c.p_apr + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Problema — quem faz o quê?" layout="none" {...win(c.p_apr - 0.45, c.m_vez + 0.1)}>
        <Problema t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Mudança — processo antes da comissão" layout="none" {...win(c.m_vez - 0.45, c.e_dur + 0.1)}>
        <Mudanca t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Execução — uma fonte atualizada" layout="none" {...win(c.e_dur - 0.45, c.i_forte + 0.1)}>
        <Execucao t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — clareza antes da negociação" layout="none" {...win(c.i_forte - 0.45, c.i_clar + 0.1)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 Registro + CTA SISTEMA" layout="none" {...win(c.i_clar - 0.4, tl.duration)}>
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
