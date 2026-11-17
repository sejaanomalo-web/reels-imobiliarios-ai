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
import { Desc } from "./scenes/Desc";
import { Res } from "./scenes/Res";
import { Hab } from "./scenes/Hab";
import { Fim } from "./scenes/Fim";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 11 — "A venda aconteceu, mas o caixa não respirou" (ROTEIROS/ATIVO_REEL11.md). Reel orgânico: voz oficial 1,0×, CTA
 *  SISTEMA ("Salva…" virou transição), verde exato #3AF584, logo no fecho. Sem valores, percentuais nem promessa de renda. */
export const ATIVOREEL11: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * prog(t, c.h_sem, 0.6, ease.out) * (1 - prog(t, c.r_pensa, 0.6, ease.out)) +
    0.12 * prog(t, c.r_novas, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — de volta ao ponto de partida" layout="none" {...win(0, c.d_na + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 O descompasso" layout="none" {...win(c.d_na - 0.45, c.r_pensa + 0.1)}>
        <Desc t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 O reservatório" layout="none" {...win(c.r_pensa - 0.45, c.x_um + 0.1)}>
        <Res t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 O hábito — 3 frentes" layout="none" {...win(c.x_um - 0.45, c.f_e + 0.1)}>
        <Hab t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Transição — tudo num só lugar" layout="none" {...win(c.f_e - 0.45, ctaAt + 0.1)}>
        <Fim t={t} tl={tl} />
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
