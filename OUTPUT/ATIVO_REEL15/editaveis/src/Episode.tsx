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
import { Iro } from "./scenes/Iro";
import { Real } from "./scenes/Real";
import { Cuid } from "./scenes/Cuid";
import { Fim } from "./scenes/Fim";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 15 — "O jeito mais rápido de complicar seus impostos" (ROTEIROS/ATIVO_REEL15.md). Reel orgânico: voz oficial 1,0×, CTA
 *  SISTEMA (ressalva do contador mantida; "Salva e manda" virou transição), verde exato #3AF584. Sem alíquotas nem orientação tributária. */
export const ATIVOREEL15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * (1 - prog(t, c.r_serio, 0.6, ease.out)) +
    0.12 * prog(t, c.c_uma, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — novela tributária" layout="none" {...win(0, c.i_fech + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Manual do improviso" layout="none" {...win(c.i_fech - 0.45, c.r_serio + 0.1)}>
        <Iro t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Falando sério" layout="none" {...win(c.r_serio - 0.45, c.c_uma + 0.1)}>
        <Real t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 O cuidado" layout="none" {...win(c.c_uma - 0.45, c.x_conf + 0.1)}>
        <Cuid t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Ressalva + transição" layout="none" {...win(c.x_conf - 0.45, ctaAt + 0.1)}>
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
