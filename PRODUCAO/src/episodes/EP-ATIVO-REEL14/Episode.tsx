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
import { Fic } from "./scenes/Fic";
import { Perg } from "./scenes/Perg";
import { Pri } from "./scenes/Pri";
import { Fim } from "./scenes/Fim";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 14 — "Saber tudo sobre o imóvel pode não ser suficiente" (ROTEIROS/ATIVO_REEL14.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA ("Compartilha…" virou transição curta), verde exato #3AF584, logo no fecho. Cena ilustrativa; sem afirmar venda. */
export const ATIVOREEL14: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * prog(t, c.f_imag, 0.6, ease.out) * (1 - prog(t, c.q_no, 0.6, ease.out)) +
    0.12 * prog(t, c.q_no, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — saber tudo ≠ entender" layout="none" {...win(0, c.f_imag + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 A ficha completa" layout="none" {...win(c.f_imag - 0.45, c.q_no + 0.1)}>
        <Fic t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 A pergunta" layout="none" {...win(c.q_no - 0.45, c.p_conh + 0.1)}>
        <Perg t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 O princípio" layout="none" {...win(c.p_conh - 0.45, c.x_na + 0.1)}>
        <Pri t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Próxima visita + transição" layout="none" {...win(c.x_na - 0.45, ctaAt + 0.1)}>
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
