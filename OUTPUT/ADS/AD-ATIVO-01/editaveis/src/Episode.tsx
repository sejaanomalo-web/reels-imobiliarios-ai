import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Edit } from "./scenes/Edit";
import { KText } from "./scenes/KText";

export const timeline = timelineJson as Timeline;

/** Criativo Meta Ads 01 v2 — "A venda esquecida" (ROTEIROS/ADS/AD-ATIVO-01.md). Edição para parar o scroll (pedido do cliente,
 *  15/11/2026): voz oficial a 1,1× (exceção para anúncios), transcrição dinâmica da fala, cortes com zoom/tremida/flash e SFX em
 *  cada troca. CTA para o botão do anúncio; área útil y 270–1250. */
export const AD01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const mood = -0.35 * prog(t, 0, 0.3, ease.out) * (1 - prog(t, c.a_just, 0.4, ease.out)) + 0.45 * prog(t, c.a_just, 0.6, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Edit t={t} tl={tl} />
      <KText t={t} chunks={tl.captions} solutionAt={c.a_just - 0.1} hidden={tl.hideCaptions ?? []} hideFrom={c.cta_clique - 0.2} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
