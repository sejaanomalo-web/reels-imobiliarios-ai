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

/** ATIVO-D1210-08 — "A conta de luz" (Quarto modelo, Maquete 3D · grade 10/12/2026 08h). */
export const D1210_08: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
      <Cabecalho t={t} tema="E SE…?" fontes="DIRETIVA 2010/31/UE · INMETRO (PBE EDIFICA)" capitulos={capitulos(c, tl)} ate={c.cta_comment - 0.25} />
      <CtaMaquete t={t} tl={tl} segPergunta="s7" segComente="s7" />
      <LegendaCaixa t={t} chunks={tl.captions.filter((x) => !(tl.hideCaptions ?? []).includes(x.seg))} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
