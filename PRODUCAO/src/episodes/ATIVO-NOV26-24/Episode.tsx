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

/** ATIVO_NOV26_24 — "Por que a incorporadora pisa no freio?" (lote 30 Reels nov/2026). Voz oficial 1,0×, verde #02FB3F, CTA SISTEMA. */
export const NOV26_24: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood = -0.06 * prog(t, c.h_luxo, 0.5, ease.out) * (1 - prog(t, c.a_nao, 0.4, ease.out)) + 0.08 * prog(t, c.a_nao, 0.4, ease.out) * (1 - prog(t, c.a_noticia, 0.5, ease.out)) - 0.1 * prog(t, c.b_conc, 0.5, ease.out) * (1 - prog(t, c.b_estr, 0.5, ease.out)) + 0.15 * prog(t, c.c_momento, 0.6, ease.out) * (1 - prog(t, c.cta_quer, 0.5, ease.out)) + 0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} accent={A} />
      <Sequence name="1 Gancho — menos lançamentos" layout="none" {...win(0, c.a_nao + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Take 01 — uma empresa ≠ todo o mercado" layout="none" {...win(c.a_nao - 0.35, c.b_imag + 0.1)}>
        <Take1 t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Take 02 — estoque também é estratégia" layout="none" {...win(c.b_imag - 0.45, c.c_corr + 0.1)}>
        <Take2 t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 Take 03 — leia o contexto" layout="none" {...win(c.c_corr - 0.45, c.cta_quer + 0.1)}>
        <Take3 t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 CTA SISTEMA" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} seg="s12" title="Cada empreendimento acompanhado" sub="imóveis, estoque e atendimentos" steps={[{ k: "EMPREENDIMENTOS", sub: "estágio e condições" }, { k: "ESTOQUE", sub: "o que ainda está disponível" }, { k: "ATENDIMENTOS", sub: "as alternativas de cada comprador" }]} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} accent={A} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
