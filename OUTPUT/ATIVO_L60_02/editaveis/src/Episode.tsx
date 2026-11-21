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

/** ATIVO_L60_02 — "Um imóvel, quatro planilhas" (lote L60, EP021). ESTILO 5 Painel. Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const L60_02: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = -0.06 * prog(t, c.h_certa, 0.4, ease.out) * (1 - prog(t, c.a_prim, 0.5, ease.out)) - 0.1 * prog(t, c.b_lug, 0.4, ease.out) * (1 - prog(t, c.c_def, 0.5, ease.out)) + 0.14 * prog(t, c.c_cad, 0.6, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — quatro planilhas" layout="none" {...win(0, c.a_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — cada uma sabe uma coisa" layout="none" {...win(c.a_prim - 0.45, c.b_falta + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — atualizou uma, esqueceu três" layout="none" {...win(c.b_falta - 0.45, c.c_def + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — cadastro principal" layout="none" {...win(c.c_def - 0.45, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s8" title="Um sistema do seu jeito" sub="imóveis, leads e atendimentos" steps={[{ k: "IMÓVEIS", sub: "um cadastro por imóvel" }, { k: "LEADS", sub: "do contato à decisão" }, { k: "ATENDIMENTOS", sub: "o retorno combinado" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
