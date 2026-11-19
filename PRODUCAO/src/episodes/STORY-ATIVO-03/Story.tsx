import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, mix, prog, sp } from "../../lib/anim";
import { C, F } from "../../theme";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { caseOf, publishable } from "../STORY-ATIVO/cases";
import { capCam, Capture, Frame, Mark, PreviewMark, Title } from "../STORY-ATIVO/kit";

export const timeline = timelineJson as Timeline;

/**
 * STORY 03 — "Organização com identidade própria" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md). 1080×1920.
 * Abre colado na identidade do painel do Projeto B (logo, nome, cor do cabeçalho) → recua para o painel inteiro e percorre
 * o que a fala cita: imóveis → contatos (CRM) → ferramentas (configurações, novo imóvel) → volta à marca (match cut com a abertura).
 * O assistente do painel aparece na captura, mas não é destacado nem simulado.
 */
const PAINEL = caseOf("ivone_painel");
const G = { x: 40, y: 540, w: 1000, h: 760 };
const IN_H = G.h - 44;
const zMin = IN_H / 1102 + 0.004;

export const Story03: React.FC<{ withAudio?: boolean }> = ({ withAudio = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;

  // entrada "zoom-through": o quadro chega de perto da câmera
  const enter = prog(t, 0.0, 0.7, ease.out);
  const yMin = (z: number) => IN_H / 2 / z;
  const cam = capCam(t, [
    { t: 0, x: 300, y: yMin(2.8), z: 2.8 },
    { t: c.i_painel - 0.35, x: 330, y: yMin(2.5), z: 2.5, e: ease.linear },
    { t: c.i_painel + 0.35, x: 1000, y: 551, z: zMin },
    { t: c.i_imoveis - 0.1, x: 1000, y: 560, z: zMin + 0.02, e: ease.linear },
    { t: c.i_imoveis + 0.45, x: 1000, y: 760, z: 0.74 },
    { t: c.i_contatos - 0.15, x: 1000, y: 770, z: 0.76, e: ease.linear },
    { t: c.i_contatos + 0.35, x: 880, y: yMin(1.6), z: 1.6 },
    { t: c.i_ferr - 0.1, x: 920, y: yMin(1.6), z: 1.6, e: ease.linear },
    { t: c.i_ferr + 0.45, x: 1420, y: yMin(1.15), z: 1.15 },
    { t: c.i_org - 0.1, x: 1450, y: yMin(1.15), z: 1.15, e: ease.linear },
    { t: c.i_org + 0.45, x: 1000, y: 551, z: zMin },
    { t: c.i_marca - 0.15, x: 1000, y: 551, z: zMin + 0.02, e: ease.linear },
    { t: c.i_marca + 0.5, x: 300, y: yMin(2.6), z: 2.6 },
    { t: tl.duration, x: 320, y: yMin(2.75), z: 2.75, e: ease.linear },
  ]);
  const on = (a: number, b: number) => sp(t, a, { damping: 14, stiffness: 170 }) * (1 - prog(t, b, 0.25, ease.in));
  const mLogo = on(c.i_ident - 0.05, c.i_painel - 0.2);
  const mImoveis = on(c.i_imoveis + 0.25, c.i_contatos - 0.1);
  const mCrm = on(c.i_contatos + 0.2, c.i_ferr - 0.05);
  const mFerr = on(c.i_ferr + 0.3, c.i_org - 0.1);
  const mLogo2 = sp(t, c.i_marca + 0.35, { damping: 14, stiffness: 170 });
  const pulse = 1 + 0.012 * Math.sin(t * 5);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={t} mood={0.2 + 0.25 * prog(t, c.i_marca, 1, ease.inOut)} />
      <Title text="A SUA IDENTIDADE" hl="IDENTIDADE" p={sp(t, 0.2, { damping: 13, stiffness: 170 })} out={prog(t, c.i_rotina - 0.3, 0.3, ease.in)} />
      <Title text="A SUA ROTINA" hl="ROTINA" p={sp(t, c.i_rotina - 0.05, { damping: 13, stiffness: 170 })} />
      <Frame w={G.w} h={G.h} glow={prog(t, c.i_marca, 0.6, ease.out)} style={{ left: G.x, top: G.y, opacity: enter, transform: `scale(${mix(1.7, 1, enter) * pulse})`, transformOrigin: "50% 40%" }}>
        <Capture c={PAINEL} w={G.w} h={IN_H} cam={cam}>
          <Mark x={150} y={14} w={200} h={62} p={Math.max(mLogo, mLogo2)} r={14} z={cam.z} />
          <Mark x={160} y={560} w={1680} h={476} p={mImoveis} z={cam.z} />
          <Mark x={752} y={24} w={104} h={42} p={mCrm} r={22} z={cam.z} />
          <Mark x={1000} y={24} w={180} h={42} p={mFerr} r={22} z={cam.z} />
          <Mark x={1632} y={142} w={206} h={60} p={mFerr} r={30} z={cam.z} />
        </Capture>
      </Frame>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <PreviewMark noVoice={tl.voice.startsWith("PROVIS")} noAuth={!publishable(PAINEL)} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
