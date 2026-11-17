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
import { Um } from "./scenes/Um";
import { Dois } from "./scenes/Dois";
import { Virada } from "./scenes/Virada";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 06 — "Manual para perder o controle da carteira" (ROTEIROS/ATIVO_REEL06.md). Reel orgânico, humor irônico: voz oficial 1,0×,
 *  CTA SISTEMA ("salva para revisar" virou transição), verde exato #3AF584, logo oficial no fecho. Arquivos e conversas genéricos. */
export const ATIVOREEL06: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.15 * prog(t, c.u_fotos, 0.6, ease.out) * (1 - prog(t, c.v_brinc, 0.6, ease.out)) +
    0.15 * prog(t, c.v_onde, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — o manual" layout="none" {...win(0, c.u_fotos + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 — espalhe tudo" layout="none" {...win(c.u_fotos - 0.45, c.d_agora + 0.1)}>
        <Um t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 — não atualize nada" layout="none" {...win(c.d_agora - 0.45, c.v_brinc + 0.1)}>
        <Dois t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 — a virada + transição" layout="none" {...win(c.v_brinc - 0.45, ctaAt + 0.1)}>
        <Virada t={t} tl={tl} />
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
