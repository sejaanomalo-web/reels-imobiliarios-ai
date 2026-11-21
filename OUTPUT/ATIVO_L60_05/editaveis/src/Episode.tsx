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
import timelineJson from "./timeline.json";
import { Hook, Take1, Take2, Take3 } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;

/** ATIVO_L60_05 — "Lead quente não é quem manda emoji" (lote L60, EP012). ESTILO 5 Painel. Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const L60_05: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = -0.06 * prog(t, c.h_nao, 0.4, ease.out) * (1 - prog(t, c.a_curt, 0.5, ease.out)) - 0.06 * prog(t, c.a_vis, 0.4, ease.out) * (1 - prog(t, c.b_est, 0.5, ease.out)) + 0.12 * prog(t, c.c_valioso, 0.5, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — lead quente?" layout="none" {...win(0, c.a_curt - 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — sinais × ficha vazia" layout="none" {...win(c.a_curt - 0.5, c.b_est + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — três perguntas" layout="none" {...win(c.b_est - 0.5, c.c_comeco + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — trilhas, não descarte" layout="none" {...win(c.c_comeco - 0.5, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s8" title="Um sistema do seu jeito" sub="imóveis, leads e atendimentos" steps={[{ k: "IMÓVEIS", sub: "tudo num lugar só" }, { k: "LEADS", sub: "cada um no seu momento" }, { k: "ATENDIMENTOS", sub: "o retorno combinado" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
