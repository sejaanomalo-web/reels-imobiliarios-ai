import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Bg, Grain16, KCap } from "./kit";
import { S1Hook } from "./scenes/S1Hook";
import { S2Board } from "./scenes/S2Board";
import { S5Value } from "./scenes/S5Value";
import { S6Clarity } from "./scenes/S6Clarity";
import { S7Diff } from "./scenes/S7Diff";
import { S8Close } from "./scenes/S8Close";

export const timeline = timelineJson as Timeline;

/** Vídeo da landing ATIVO v2 — 1920×1080, 30 fps. Voz aprovada acelerada a 1,2× (pedido do cliente), cortes de frases redundantes,
 *  texto grande = transcrição da fala (KCap).
 *  Interfaces ILUSTRATIVAS e marca provisória (logo oficial e telas reais não estão no repositório) — ver kit.tsx. */
export const LandingAtivoV2: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const up = (a: number, d = 0.6) => prog(t, a, d, ease.inOut);
  const glow =
    0.08 +
    0.15 * up(c.r_porque) -
    0.2 * up(c.d_e) +
    0.5 * up(c.v_foi - 0.2) -
    0.1 * up(c.f_imo) +
    0.1 * up(c.c_clar) -
    0.5 * up(c.x_mas, 1.5) +
    0.6 * up(c.x_prim) +
    0.15 * up(c.k_se);
  const words = React.useMemo(() => tl.captions.flatMap((k) => k.words), [tl]);
  const warm = up(c.d_e) * (1 - up(c.v_foi - 0.3));

  return (
    <AbsoluteFill style={{ backgroundColor: "#020403" }}>
      <Bg t={t} glow={Math.max(0, glow)} warm={warm} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.r_porque + 0.1)}>
        <S1Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02–04 Rotina · Dor · Virada" layout="none" {...win(c.r_porque - 0.45, c.f_imo + 0.75)}>
        <S2Board t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 Valor (interfaces ilustrativas)" layout="none" {...win(c.f_imo - 0.1, c.c_na + 0.3)}>
        <S5Value t={t} tl={tl} />
      </Sequence>
      <Sequence name="06 Clareza" layout="none" {...win(c.c_na - 0.4, c.x_mas + 1.1)}>
        <S6Clarity t={t} tl={tl} />
      </Sequence>
      <Sequence name="07 Diferencial" layout="none" {...win(c.x_mas - 0.2, c.p_a + 0.1)}>
        <S7Diff t={t} tl={tl} />
      </Sequence>
      <Sequence name="08–09 Personalização · CTA" layout="none" {...win(c.p_a - 0.45, tl.duration)}>
        <S8Close t={t} tl={tl} />
      </Sequence>
      {/* transcrição dinâmica: faixa inferior com leve sombra para leitura */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 72%, rgba(2,4,3,0.75) 88%, rgba(2,4,3,0.9) 100%)", pointerEvents: "none" }} />
      <KCap t={t} words={words} y={880} size={86} />
      <Grain16 frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
