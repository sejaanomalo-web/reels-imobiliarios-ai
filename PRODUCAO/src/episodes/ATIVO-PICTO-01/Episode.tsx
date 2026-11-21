import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Acompanha, Conversa, Faltou, Gancho, Memoria, Memorias, Mercado, Semana } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(desiste\.|responder\.|silêncio\.|esquecido|outro|corretor\.|sorte\.)$/i;

/** ATIVO_PICTO_01 — "Ninguém te avisa quando um cliente desiste". SEGUNDO MODELO (Pictograma cinematográfico). Voz Puck 1,0×, verde #02FB3F, fecho CtaNoir (SISTEMA). */
export const PICTO_01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.c_recomp, 1.0) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_direct + 1.0, 1.0);
  const quente = 1 - 0.5 * prog(t, c.a_sil, 0.8) * (1 - prog(t, c.b_imovel - 0.5, 0.8)) - 0.4 * luz(t, c.c_mercado - 0.4, c.c_recomp - 0.6, 0.5, 0.6);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={verde} />
      <Sequence name="1-2 Gancho" layout="none" {...win(0, c.a_ontem + 0.7)}><Gancho t={t} tl={tl} /></Sequence>
      <Sequence name="3 Conversa (portal)" layout="none" {...win(c.a_ontem - 0.4, c.a_lembra)}><Conversa t={t} tl={tl} /></Sequence>
      <Sequence name="4 Memória que apaga" layout="none" {...win(c.a_lembra - 1.0, c.b_imovel)}><Memoria t={t} tl={tl} /></Sequence>
      <Sequence name="5 Faltou continuidade" layout="none" {...win(c.b_imovel - 1.1, c.b_semana)}><Faltou t={t} tl={tl} /></Sequence>
      <Sequence name="6 Uma semana" layout="none" {...win(c.b_retorno - 0.8, c.c_espera)}><Semana t={t} tl={tl} /></Sequence>
      <Sequence name="7 O mercado não espera" layout="none" {...win(c.c_mercado - 0.6, c.c_acomp)}><Mercado t={t} tl={tl} /></Sequence>
      <Sequence name="8 Quem acompanha" layout="none" {...win(c.c_recomp - 1.2, c.x_sorte)}><Acompanha t={t} tl={tl} /></Sequence>
      <Sequence name="9 Memória organizada" layout="none" {...win(c.x_venda - 0.3, c.cta_quer + 0.2)}><Memorias t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s13" segComente="s14" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
