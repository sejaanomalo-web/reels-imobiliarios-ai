import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import { A } from "../NOV26/kit";
import { Cta } from "../NOV26/Cta";
import timelineJson from "./timeline.json";
import { Hook, Take1, Take2, Take3 } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO_GTA6_04 — "O que responder depois do “disponível?”" (lote L60, EP011). ESTILO 1 Palitinho. Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const GTA6_04: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = 0.06 * prog(t, c.h_prim, 0.4, ease.out) * (1 - prog(t, c.a_cara, 0.5, ease.out)) + 0.08 * prog(t, c.b_jan, 0.5, ease.out) * (1 - prog(t, c.c_peg, 0.5, ease.out)) - 0.1 * prog(t, c.c_missao, 0.3, ease.out) * (1 - prog(t, c.d_vivo, 0.5, ease.out)) + 0.12 * prog(t, c.e_org, 0.5, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — a primeira casa" layout="none" {...win(0, c.a_cara - 0.2)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — três critérios" layout="none" {...win(c.a_cara - 0.6, c.b_tour + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — o tour" layout="none" {...win(c.b_tour - 0.6, c.c_peg + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — pegadinha / continuar vivo" layout="none" {...win(c.c_peg - 0.6, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s12" title="Um sistema do seu jeito" sub="imóveis, leads e atendimentos" steps={[{ k: "IMÓVEIS", sub: "cada captação registrada" }, { k: "LEADS", sub: "do contato à decisão" }, { k: "ATENDIMENTOS", sub: "o retorno combinado" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
