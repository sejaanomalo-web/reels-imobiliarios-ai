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
import { CenA } from "./scenes/CenA";
import { CenB } from "./scenes/CenB";
import { Aplic } from "./scenes/Aplic";
import { Fim } from "./scenes/Fim";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 10 — "Juro alto ou baixo: onde está a negociação?" (ROTEIROS/ATIVO_REEL10.md). Reel orgânico: voz oficial 1,0×, CTA
 *  SISTEMA ("Compartilha…" virou transição), verde exato #3AF584, logo no fecho. Cenários hipotéticos, atemporais: sem taxas nem previsão. */
export const ATIVOREEL10: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * prog(t, c.a_imag, 0.6, ease.out) * (1 - prog(t, c.b_agora, 0.6, ease.out)) +
    0.12 * prog(t, c.p_por, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — juro baixo = imóvel barato?" layout="none" {...win(0, c.a_imag + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Cenário A — crédito mais caro" layout="none" {...win(c.a_imag - 0.45, c.b_agora + 0.1)}>
        <CenA t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Cenário B — crédito mais acessível" layout="none" {...win(c.b_agora - 0.45, c.p_por + 0.1)}>
        <CenB t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Aplicação — perguntas" layout="none" {...win(c.p_por - 0.45, c.f_antes + 0.1)}>
        <Aplic t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Antes do argumento + transição" layout="none" {...win(c.f_antes - 0.45, ctaAt + 0.1)}>
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
