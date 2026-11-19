import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, mix, prog, sp } from "../../lib/anim";
import { BRAND, C, F } from "../../theme";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { caseOf, publishable } from "../STORY-ATIVO/cases";
import { capCam, Capture, Frame, Mark, PreviewMark, Title } from "../STORY-ATIVO/kit";

export const timeline = timelineJson as Timeline;

/**
 * STORY 04 — "Busca de imóveis sob outra perspectiva" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md). 1080×1920.
 * Site do Projeto C entra em chicote lateral → câmera desce até a busca → percorre, no ritmo da fala, os campos REAIS
 * Cidade → Tipo de imóvel → Quartos → Pesquisar; as palavras do título acendem junto.
 */
const SITE = caseOf("antonio_site");
const G = { x: 40, y: 560, w: 1000, h: 720 };
const IN_H = G.h - 44;
const zMin = IN_H / 1102 + 0.004;
const FIELDS = {
  cidade: { x: 682, y: 598, w: 374, h: 62 },
  tipo: { x: 290, y: 680, w: 372, h: 62 },
  quartos: { x: 682, y: 680, w: 374, h: 62 },
  pesq: { x: 1074, y: 678, w: 376, h: 66 },
};
const ctr = (f: { x: number; y: number; w: number; h: number }) => ({ x: f.x + f.w / 2, y: f.y + f.h / 2 });

const Word: React.FC<{ w: string; p: number }> = ({ w, p }) => (
  <span style={{ color: p > 0.5 ? BRAND.hex : C.text, opacity: mix(0.45, 1, p), display: "inline-block", transform: `scale(${1 + 0.08 * Math.sin(Math.min(1, p) * Math.PI)})` }}>{w}</span>
);

export const Story04: React.FC<{ withAudio?: boolean }> = ({ withAudio = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;

  const whip = prog(t, 0.0, 0.55, ease.out);
  const Z = 1.5;
  const cam = capCam(t, [
    { t: 0, x: 1000, y: 551, z: zMin },
    { t: c.n_busca - 0.2, x: 1000, y: 551, z: zMin + 0.04, e: ease.linear },
    { t: c.n_busca + 0.45, x: 870, y: 670, z: 0.8 },
    { t: c.n_cidade - 0.25, x: 870, y: 670, z: 0.84, e: ease.linear },
    { t: c.n_cidade + 0.15, ...ctr(FIELDS.cidade), z: Z },
    { t: c.n_tipo - 0.1, ...ctr(FIELDS.cidade), z: Z + 0.05, e: ease.linear },
    { t: c.n_tipo + 0.2, ...ctr(FIELDS.tipo), z: Z },
    { t: c.n_quartos - 0.1, ...ctr(FIELDS.tipo), z: Z + 0.05, e: ease.linear },
    { t: c.n_quartos + 0.2, ...ctr(FIELDS.quartos), z: Z },
    { t: c.n_pesq - 0.15, ...ctr(FIELDS.quartos), z: Z + 0.05, e: ease.linear },
    { t: c.n_pesq + 0.3, ...ctr(FIELDS.pesq), z: 1.35 },
    { t: c.n_pesq + 1.3, x: 870, y: 670, z: 0.8 },
    { t: tl.duration, x: 870, y: 670, z: 0.86, e: ease.linear },
  ]);
  const on = (a: number, b: number) => sp(t, a, { damping: 13, stiffness: 190 }) * (1 - prog(t, b, 0.2, ease.in));
  const mBox = on(c.n_busca + 0.25, c.n_cidade - 0.2);
  const mCid = on(c.n_cidade, c.n_tipo + 0.05);
  const mTipo = on(c.n_tipo + 0.05, c.n_quartos + 0.05);
  const mQua = on(c.n_quartos + 0.05, c.n_pesq);
  const mPesq = sp(t, c.n_pesq + 0.1, { damping: 10, stiffness: 200 });
  const mBox2 = sp(t, c.n_pesq + 1.0, { damping: 14, stiffness: 160 });

  const lit = (cue: number) => prog(t, cue - 0.05, 0.2, ease.out);
  const t2 = sp(t, c.n_cidade - 0.15, { damping: 13, stiffness: 170 });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={t} mood={0.2} />
      <Title text="BUSCA ORGANIZADA" hl="ORGANIZADA" p={sp(t, 0.25, { damping: 13, stiffness: 170 })} out={prog(t, c.n_cidade - 0.45, 0.3, ease.in)} />
      {t2 > 0.001 ? (
        <div style={{ position: "absolute", left: 90, right: 90, top: 290, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.04, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, t2 * 1.5), transform: `translateY(${(1 - Math.min(1, t2)) * 50}px)` }}>
          POR <Word w="CIDADE," p={lit(c.n_cidade)} /> <Word w="TIPO" p={lit(c.n_tipo)} />
          <br />E <Word w="QUARTOS" p={lit(c.n_quartos)} />
        </div>
      ) : null}
      <Frame w={G.w} h={G.h} glow={mPesq * 0.6} style={{ left: G.x + (1 - whip) * 1200, top: G.y, transform: `rotate(${(1 - whip) * 6}deg) skewX(${(1 - whip) * -8}deg)`, filter: whip < 0.9 ? `blur(${(1 - whip) * 10}px)` : undefined }}>
        <Capture c={SITE} w={G.w} h={IN_H} cam={cam}>
          <Mark x={260} y={568} w={1218} h={204} p={Math.max(mBox, mBox2)} r={22} z={cam.z} />
          <Mark {...FIELDS.cidade} p={mCid} r={14} z={cam.z} />
          <Mark {...FIELDS.tipo} p={mTipo} r={14} z={cam.z} />
          <Mark {...FIELDS.quartos} p={mQua} r={14} z={cam.z} />
          <Mark {...FIELDS.pesq} p={mPesq * (1 - mBox2)} r={14} z={cam.z} />
        </Capture>
      </Frame>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <PreviewMark noVoice={tl.voice.startsWith("PROVIS")} noAuth={!publishable(SITE)} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
