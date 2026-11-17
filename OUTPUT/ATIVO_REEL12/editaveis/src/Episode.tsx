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
import { Exc } from "./scenes/Exc";
import { Cla } from "./scenes/Cla";
import { Lic } from "./scenes/Lic";
import { Fim } from "./scenes/Fim";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 12 — "O primeiro imóvel começa com clareza" (ROTEIROS/ATIVO_REEL12.md). Reel orgânico: voz oficial 1,0×, CTA SISTEMA
 *  (pergunta + "Escreve nos comentários" viraram transição), verde exato #3AF584, logo no fecho. Cena ilustrativa; sem aprovação de crédito. */
export const ATIVOREEL12: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * prog(t, c.e_na, 0.6, ease.out) * (1 - prog(t, c.c_no, 0.6, ease.out)) +
    0.12 * prog(t, c.c_no, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — duas equipes" layout="none" {...win(0, c.e_na + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Excesso" layout="none" {...win(c.e_na - 0.45, c.c_no + 0.1)}>
        <Exc t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Clareza" layout="none" {...win(c.c_no - 0.45, c.l_dif + 0.1)}>
        <Cla t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 A lição" layout="none" {...win(c.l_dif - 0.45, c.f_e + 0.1)}>
        <Lic t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Transição — etapa de cada comprador" layout="none" {...win(c.f_e - 0.45, ctaAt + 0.1)}>
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
