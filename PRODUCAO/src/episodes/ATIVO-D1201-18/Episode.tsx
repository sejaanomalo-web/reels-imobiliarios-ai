import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Grain } from "../../components/Background";
import { C } from "../../theme";
import type { Timeline } from "../types";
import { Cabecalho, CtaMaquete, LegendaCaixa, Mundo, Placas } from "../../estilos/maquete";
import timelineJson from "./timeline.json";
import { Maquete3D, camera, capitulos, clima, holofote, placas } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO-D1201-18 — "Sete dias para desistir" (Quarto modelo, Maquete 3D · grade 01/12/2026 18h). */
export const D1201_18: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const cam = camera(t, c, tl);
  const k = clima(t, c, tl);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <Mundo cam={cam} atm={k.atm} atmPara={k.atmPara} atmK={k.atmK} holofote={holofote(t, c, tl)}>
        <Maquete3D t={t} tl={tl} />
      </Mundo>
      <Placas cam={cam} placas={placas(t, c, tl)} />
      <Cabecalho t={t} tema="IMÓVEL NA PLANTA" fontes="LEI 13.786/2018 (LEI DO DISTRATO)" capitulos={capitulos(c, tl)} ate={c.cta_comment - 0.25} />
      <CtaMaquete t={t} tl={tl} segPergunta="s10" segComente="s10" />
      <LegendaCaixa t={t} chunks={tl.captions.filter((x) => !(tl.hideCaptions ?? []).includes(x.seg))} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
