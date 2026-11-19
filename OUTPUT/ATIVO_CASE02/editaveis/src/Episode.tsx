import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Hook } from "./scenes/Hook";
import { Diferenca } from "./scenes/Diferenca";
import { Prende } from "./scenes/Prende";
import { Perguntas } from "./scenes/Perguntas";
import { Conduz } from "./scenes/Conduz";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · CASO REAL 02 — "Jason Ballo: mostre o que o comprador quer ver" (ROTEIROS/ATIVO_CASE02.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA ("Conta nos comentários" virou transição), verde exato #3AF584, logo oficial no fecho. Sem imagens do agente. */
export const ATIVOCASE02: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.1 * (1 - prog(t, c.h_contr, 0.8, ease.out)) +
    0.15 * prog(t, c.c_jason, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — gravar como quem vai comprar" layout="none" {...win(0, c.c_jason + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — a diferença" layout="none" {...win(c.c_jason - 0.45, c.q_pensa + 0.1)}>
        <Diferenca t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — por que prende" layout="none" {...win(c.q_pensa - 0.45, c.g_prox + 0.1)}>
        <Prende t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — 3 perguntas reais" layout="none" {...win(c.g_prox - 0.45, c.t_forma + 0.1)}>
        <Perguntas t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Conduzir + transição" layout="none" {...win(c.t_forma - 0.45, ctaAt + 0.1)}>
        <Conduz t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 CTA SISTEMA" layout="none" {...win(ctaAt - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
