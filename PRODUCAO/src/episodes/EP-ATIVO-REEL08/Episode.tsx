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
import { Prim } from "./scenes/Prim";
import { Outro } from "./scenes/Outro";
import { Ideia } from "./scenes/Ideia";
import { Revis } from "./scenes/Revis";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 08 — "A comissão caiu: e a próxima carteira?" (ROTEIROS/ATIVO_REEL08.md). Reel orgânico: voz oficial 1,0×, CTA SISTEMA
 *  (pergunta + "Salva…" viraram transição), verde exato #3AF584, logo oficial no fecho. Cenário hipotético; comissão mascarada, sem projeções. */
export const ATIVOREEL08: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * prog(t, c.p_num, 0.6, ease.out) * (1 - prog(t, c.o_seg, 0.6, ease.out)) +
    0.15 * prog(t, c.o_seg, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — a comissão caiu" layout="none" {...win(0, c.p_num + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Caminho A — sem histórico" layout="none" {...win(c.p_num - 0.45, c.o_seg + 0.1)}>
        <Prim t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Caminho B — registra" layout="none" {...win(c.o_seg - 0.45, c.i_res + 0.1)}>
        <Outro t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 A ideia — continuidade" layout="none" {...win(c.i_res - 0.45, c.r_no + 0.1)}>
        <Ideia t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Transição — revisão do fechamento" layout="none" {...win(c.r_no - 0.45, ctaAt + 0.1)}>
        <Revis t={t} tl={tl} />
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
