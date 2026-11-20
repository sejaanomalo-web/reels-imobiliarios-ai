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

/** ATIVO_NOV26_21 — "85% usados: onde está a oportunidade?" (lote 30 Reels nov/2026). Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const NOV26_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = 0.08 * prog(t, c.h_85, 0.6, ease.out) * (1 - prog(t, c.h_mas, 0.5, ease.out)) - 0.06 * prog(t, c.a_censo, 0.5, ease.out) * (1 - prog(t, c.b_quem, 0.5, ease.out)) - 0.12 * prog(t, c.b_estoque, 0.5, ease.out) * (1 - prog(t, c.c_antes, 0.5, ease.out)) + 0.15 * prog(t, c.c_aval, 0.6, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — 85% usados?" layout="none" {...win(0, c.a_fala + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — estimativa setorial" layout="none" {...win(c.a_fala - 0.45, c.b_quem + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — captar não é só cadastrar" layout="none" {...win(c.b_quem - 0.45, c.c_antes + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — carteira confiável" layout="none" {...win(c.c_antes - 0.45, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s11" title="Carteira organizada de verdade" sub="imóveis, fichas e atendimentos" steps={[{ k: "IMÓVEIS", sub: "ficha completa de cada um" }, { k: "DOCUMENTOS", sub: "o que já foi conferido" }, { k: "ATENDIMENTOS", sub: "comprador e proprietário" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
