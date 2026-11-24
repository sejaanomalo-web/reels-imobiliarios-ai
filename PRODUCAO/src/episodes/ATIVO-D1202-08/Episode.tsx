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
import { Hook, Take1, Take2, Take3, Take4 } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO-D1202-08 — "O 13º e o ITBI" (Terceiro modelo, Planta técnica v2 · grade 02/12/2026 08h). */
export const D1202_08: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const solucao = prog(t, c.cta_comment - 0.3, 0.8, ease.inOut);
  const tensao = prog(t, c.v_sem - 0.3, 0.5, ease.out) * (1 - prog(t, c.p_pergunta + 0.2, 0.6, ease.inOut));
  const ctaIn = prog(t, c.cta_quer - 0.1, 0.5, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <FundoPlanta t={t} atm="dados" />
      {tensao > 0.001 ? <div style={{ position: "absolute", inset: 0, opacity: tensao * 0.55 }}><FundoPlanta t={t} atm="tensao" /></div> : null}
      {solucao > 0.001 ? <div style={{ position: "absolute", inset: 0, opacity: solucao }}><FundoPlanta t={t} atm="solucao" luzY={980} /></div> : null}
      <Hook t={t} tl={tl} />
      <Take1 t={t} tl={tl} />
      <Take2 t={t} tl={tl} />
      <Take3 t={t} tl={tl} />
      <Take4 t={t} tl={tl} />
      {t >= c.cta_quer - 0.15 ? <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, ctaIn * 1.4) }}><CtaPlanta t={t} tl={tl} segPergunta="s13" segComente="s13" /></div> : null}
      <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
