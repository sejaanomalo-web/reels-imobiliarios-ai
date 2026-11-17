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
import { Ini } from "./scenes/Ini";
import { Meio } from "./scenes/Meio";
import { Prox } from "./scenes/Prox";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 13 — "Por que alguns leads se perdem no meio do caminho" (ROTEIROS/ATIVO_REEL13.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA padrão (o roteiro já pedia SISTEMA), verde exato #3AF584, logo no fecho. Painel ilustrativo; sem venda autônoma. */
export const ATIVOREEL13: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.08 * (1 - prog(t, c.i_pensa, 0.6, ease.out)) +
    -0.1 * prog(t, c.m_agora, 0.6, ease.out) * (1 - prog(t, c.p_quarta, 0.6, ease.out)) +
    0.12 * prog(t, c.p_quarta, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — receber ≠ avançar" layout="none" {...win(0, c.i_pensa + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Atrair e receber" layout="none" {...win(c.i_pensa - 0.45, c.m_agora + 0.1)}>
        <Ini t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Acompanhar" layout="none" {...win(c.m_agora - 0.45, c.p_quarta + 0.1)}>
        <Meio t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Próximo passo" layout="none" {...win(c.p_quarta - 0.45, ctaAt + 0.1)}>
        <Prox t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(ctaAt - 0.4, tl.duration)}>
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
