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

/** ATIVO_GTA6_01 — "O que responder depois do “disponível?”" (lote L60, EP011). ESTILO 1 Palitinho. Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const GTA6_01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = -0.04 * prog(t, c.h_paz, 0.4, ease.out) * (1 - prog(t, c.a_normal, 0.5, ease.out)) + 0.08 * prog(t, c.a_cob, 0.5, ease.out) * (1 - prog(t, c.b_cab, 0.5, ease.out)) - 0.08 * prog(t, c.c_missao, 0.4, ease.out) * (1 - prog(t, c.d_cart, 0.5, ease.out)) + 0.12 * prog(t, c.d_diag, 0.5, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — GTA VI lançou" layout="none" {...win(0, c.a_normal - 0.2)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — pessoa normal × corretor" layout="none" {...win(c.a_normal - 0.65, c.b_cab + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — a cabeça já começa" layout="none" {...win(c.b_cab - 0.45, c.c_fach + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — esquece a missão / carteira fictícia" layout="none" {...win(c.c_fach - 0.5, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s14" title="Um sistema do seu jeito" sub="imóveis, leads e atendimentos" steps={[{ k: "IMÓVEIS", sub: "a carteira de verdade" }, { k: "LEADS", sub: "do contato à decisão" }, { k: "ATENDIMENTOS", sub: "o retorno combinado" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
