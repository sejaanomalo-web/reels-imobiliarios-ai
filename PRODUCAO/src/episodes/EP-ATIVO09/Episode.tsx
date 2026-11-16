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
import { Mercado } from "./scenes/Mercado";
import { Analise } from "./scenes/Analise";
import { Processo } from "./scenes/Processo";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 09 — "Autoridade imobiliária não é uma foto ao lado de um carro" (ROTEIROS/ATIVO_EP09.md). Reel orgânico: voz oficial
 *  1,0×, CTA SISTEMA (o "Siga a ATIVO" do roteiro virou transição), verde exato #3AF584, logo oficial no fecho. */
export const ATIVO09: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.2 * (1 - prog(t, c.h_existe, 0.8, ease.out)) +
    0.15 * prog(t, c.m_prim, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — autoridade não é cenário" layout="none" {...win(0, c.m_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Exemplo 1 — mercado" layout="none" {...win(c.m_prim - 0.45, c.a_seg + 0.1)}>
        <Mercado t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Exemplo 2 — análise de imóvel" layout="none" {...win(c.a_seg - 0.45, c.p_terc + 0.1)}>
        <Analise t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Exemplo 3 — processo" layout="none" {...win(c.p_terc - 0.45, c.i_pense + 0.1)}>
        <Processo t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — demonstre o que você sabe" layout="none" {...win(c.i_pense - 0.45, ctaAt + 0.1)}>
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
