import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { C } from "../../theme";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import { A } from "../NOV26/kit";
import { CtaPlanta, FundoPlanta } from "../../estilos/planta";
import timelineJson from "./timeline.json";
import { Entorno, Hook, Lugar, Virada } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO-D1204-18 — "O letreiro era um anúncio" (Terceiro modelo, Planta técnica v2 · grade 04/12/2026 18h). */
export const D1204_18: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const solucao = prog(t, c.cta_comment - 0.3, 0.8, ease.inOut);
  const tensao = prog(t, c.v_1949 - 0.3, 0.5, ease.out) * (1 - prog(t, c.v_bairro + 0.2, 0.6, ease.inOut));
  const ctaIn = prog(t, c.cta_quer - 0.1, 0.5, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <FundoPlanta t={t} atm="dados" />
      {tensao > 0.001 ? <div style={{ position: "absolute", inset: 0, opacity: tensao * 0.55 }}><FundoPlanta t={t} atm="tensao" /></div> : null}
      {solucao > 0.001 ? <div style={{ position: "absolute", inset: 0, opacity: solucao }}><FundoPlanta t={t} atm="solucao" luzY={980} /></div> : null}
      <Hook t={t} tl={tl} />
      <Lugar t={t} tl={tl} />
      <Virada t={t} tl={tl} />
      <Entorno t={t} tl={tl} />
      {t >= c.cta_quer - 0.15 ? <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, ctaIn * 1.4) }}><CtaPlanta t={t} tl={tl} segPergunta="s7" segComente="s7" /></div> : null}
      <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg)).map((k) => ({ ...k, words: k.words.map((w) => (/^(casa\.)$/i.test(w.text) && ["s3"].includes(k.seg) ? { ...w, emph: false } : w)) }))} accent={A} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
