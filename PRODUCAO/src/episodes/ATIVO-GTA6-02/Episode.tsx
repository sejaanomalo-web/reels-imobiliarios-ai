import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import { A } from "../NOV26/kit";
import { Cta } from "../NOV26/Cta";
import { FundoPlanta } from "../../estilos/planta";
import timelineJson from "./timeline.json";
import { Hook, Take1, Take2, Take3 } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO_GTA6_02 — "O que responder depois do “disponível?”" (lote L60, EP011). ESTILO 1 Palitinho. Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const GTA6_02: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = -0.04 * prog(t, c.h_prot, 0.4, ease.out) * (1 - prog(t, c.a_nome, 0.5, ease.out)) + 0.08 * prog(t, c.b_imp, 0.5, ease.out) * (1 - prog(t, c.c_muda, 0.5, ease.out)) - 0.06 * prog(t, c.c_pers, 0.4, ease.out) * (1 - prog(t, c.c_neg, 0.5, ease.out)) + 0.12 * prog(t, c.d_patr, 0.5, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  const planta = 1 - prog(t, c.cta_quer - 0.4, 0.5, ease.inOut);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      {planta > 0.001 ? <div style={{ position: "absolute", inset: 0, opacity: planta * 0.92 }}><FundoPlanta t={t} /></div> : null}
      <Sequence name="1 Gancho — um magnata imobiliário" layout="none" {...win(0, c.a_nome - 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — Boobie Ike (ficha)" layout="none" {...win(c.a_nome - 0.5, c.b_imp + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — o império (3 frentes + gravadora)" layout="none" {...win(c.b_imp - 0.5, c.c_muda + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — universo maior / patrimônio" layout="none" {...win(c.c_muda - 0.5, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s12" title="Um sistema do seu jeito" sub="imóveis, leads e atendimentos" steps={[{ k: "IMÓVEIS", sub: "a sua carteira real" }, { k: "LEADS", sub: "do contato à decisão" }, { k: "ATENDIMENTOS", sub: "o retorno combinado" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
