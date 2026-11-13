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
import { Room } from "./scenes/Room";
import { Facade } from "./scenes/Facade";
import { MapAccess } from "./scenes/MapAccess";
import { Ground } from "./scenes/Ground";
import { Life } from "./scenes/Life";
import { Editor } from "./scenes/Editor";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 02 — "Cinco aberturas que dão um motivo para ver o imóvel". Roteiro do cliente (ROTEIROS/ATIVO_EP02.md),
 *  voz original aprovada em 1,0×; CTA de comentário COMENTE "SISTEMA" → Direct (pedido do cliente, no lugar de "Salve este Reel").
 *  Sem logo (produção original sem logo: o arquivo só chegou depois; logo oficial hoje em PRODUCAO/public/brand/ativo_logo.png). */
export const ATIVO02: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.3 * prog(t, c.h_waste, 0.6, ease.out) * (1 - prog(t, c.r_first, 0.5, ease.out)) +
    0.25 * prog(t, c.r_first, 0.5, ease.out) * (1 - prog(t, c.i_cant, 0.5, ease.out)) -
    0.2 * prog(t, c.i_cant, 0.5, ease.out) * (1 - prog(t, c.i_test, 0.5, ease.out)) +
    0.5 * prog(t, c.i_test, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — olha essa oportunidade" layout="none" {...win(0, c.r_first + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2a Rotina" layout="none" {...win(c.r_first - 0.4, c.k_second + 0.1)}>
        <Room t={t} tl={tl} />
      </Sequence>
      <Sequence name="2b Contraste" layout="none" {...win(c.k_second - 0.4, c.l_third + 0.1)}>
        <Facade t={t} tl={tl} />
      </Sequence>
      <Sequence name="3a Localização" layout="none" {...win(c.l_third - 0.4, c.o_fourth + 0.1)}>
        <MapAccess t={t} tl={tl} />
      </Sequence>
      <Sequence name="3b Objeção" layout="none" {...win(c.o_fourth - 0.4, c.m_fifth + 0.1)}>
        <Ground t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Momento de vida" layout="none" {...win(c.m_fifth - 0.4, c.i_before + 0.1)}>
        <Life t={t} tl={tl} />
      </Sequence>
      <Sequence name="5a Insight — uma frase" layout="none" {...win(c.i_before - 0.4, c.i_test + 0.3)}>
        <Editor t={t} tl={tl} />
      </Sequence>
      <Sequence name="5b Cartões salvos + CTA comentário" layout="none" {...win(c.i_test - 0.3, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
