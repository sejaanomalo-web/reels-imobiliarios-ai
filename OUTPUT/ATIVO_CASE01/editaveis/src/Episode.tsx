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
import { Contraste } from "./scenes/Contraste";
import { Logica } from "./scenes/Logica";
import { Licao } from "./scenes/Licao";
import { Aplicacao } from "./scenes/Aplicacao";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · CASO REAL 01 — "Kelsie Blevins: atenção antes da venda" (ROTEIROS/ATIVO_CASE01.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA (o "Salva este vídeo" do roteiro virou transição), verde exato #3AF584, logo oficial no fecho. Sem imagens da corretora. */
export const ATIVOCASE01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * (1 - prog(t, c.h_jeito, 0.8, ease.out)) +
    0.15 * prog(t, c.l_rep, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — não está nas casas" layout="none" {...win(0, c.c_kel + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — o contraste" layout="none" {...win(c.c_kel - 0.45, c.l_rep + 0.1)}>
        <Contraste t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — ensinar, mostrar, conversar" layout="none" {...win(c.l_rep - 0.45, c.k_ponto + 0.1)}>
        <Logica t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — atenção com intenção" layout="none" {...win(c.k_ponto - 0.45, c.a_prox + 0.1)}>
        <Licao t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Aplicação + transição" layout="none" {...win(c.a_prox - 0.45, ctaAt + 0.1)}>
        <Aplicacao t={t} tl={tl} />
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
