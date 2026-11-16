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
import { Comeco } from "./scenes/Comeco";
import { Diferencial } from "./scenes/Diferencial";
import { Licao } from "./scenes/Licao";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · CASO REAL 03 — "Mônica Poplawski: o preparo vem antes do alto padrão" (ROTEIROS/ATIVO_CASE03.md). Reel orgânico: voz oficial
 *  1,0×, CTA SISTEMA ("Salva este vídeo" saiu), verde exato #3AF584, logo oficial no fecho. Sem imagens da corretora; R$ 900 conforme fonte. */
export const ATIVOCASE03: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * (1 - prog(t, c.h_hoje, 0.8, ease.out)) +
    0.15 * prog(t, c.b_monica, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — o que mudou primeiro?" layout="none" {...win(0, c.b_monica + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — o começo" layout="none" {...win(c.b_monica - 0.45, c.d_alto + 0.1)}>
        <Comeco t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — domínio do imóvel" layout="none" {...win(c.d_alto - 0.45, c.l_talvez + 0.1)}>
        <Diferencial t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — lição + transição" layout="none" {...win(c.l_talvez - 0.45, ctaAt + 0.1)}>
        <Licao t={t} tl={tl} />
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
