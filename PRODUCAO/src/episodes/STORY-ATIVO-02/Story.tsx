import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
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
 * STORY 02 — "Painel e site para o corretor" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md). 1080×1920.
 * Painel do Projeto A (carteira em destaque) → o cartão VIRA e mostra o site do mesmo projeto (busca em destaque) →
 * "duas experiências": os dois lado a lado, cada um com seu rótulo. Capturas reais higienizadas; nomes anonimizados até autorização.
 */
const PAINEL = caseOf("bruno_painel");
const SITE = caseOf("bruno_site");
// geometrias
const SOLO = { x: 60, y: 560, w: 960, h: 720 };
const A = { x: 90, y: 330, w: 900, h: 460 };
const B = { x: 90, y: 820, w: 900, h: 460 };
const lerp = (g1: typeof SOLO, g2: typeof SOLO, p: number) => ({ x: mix(g1.x, g2.x, p), y: mix(g1.y, g2.y, p), w: mix(g1.w, g2.w, p), h: mix(g1.h, g2.h, p) });

const Pill: React.FC<{ text: string; p: number }> = ({ text, p }) =>
  p > 0.01 ? (
    <div style={{ position: "absolute", left: 22, bottom: 22, zIndex: 3, padding: "10px 22px", borderRadius: 999, background: "rgba(8,10,12,0.88)", fontFamily: F.sans, fontWeight: 800, fontSize: 34, color: C.text, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 20}px)` }}>{text}</div>
  ) : null;

export const Story02: React.FC<{ withAudio?: boolean }> = ({ withAudio = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;

  const enter = sp(t, 0.05, { damping: 15, stiffness: 120 });
  const flip = prog(t, c.b_comprador - 0.45, 0.6, ease.inOut);
  const duo = prog(t, c.b_duas - 0.25, 0.8, ease.inOut);
  const glowA = prog(t, c.b_funcao - 0.3, 0.4, ease.out);
  const glowB = prog(t, c.b_funcao - 0.1, 0.4, ease.out);

  // painel: some na virada e volta (de cima) no "duas experiências"
  const gP = duo > 0 ? lerp({ ...A, y: -520 }, A, duo) : SOLO;
  const camP =
    duo > 0
      ? { x: 1000, y: mix(470, 520, prog(t, c.b_duas, 3, ease.linear)), z: 0.45 }
      : capCam(t, [
          { t: 0, x: 1000, y: 520, z: 0.66 },
          { t: c.b_carteira - 0.2, x: 1000, y: 560, z: 0.7 },
          { t: c.b_carteira + 0.5, x: 1000, y: 800, z: 0.95 },
          { t: c.b_comprador, x: 1150, y: 800, z: 0.97, e: ease.linear },
        ]);
  const camS = capCam(t, [
    { t: c.b_comprador - 0.2, x: 1000, y: 560, z: 0.66 },
    { t: c.b_site - 0.1, x: 1000, y: 580, z: 0.68 },
    { t: c.b_site + 0.6, x: 870, y: 670, z: 0.9 },
    { t: c.b_duas - 0.25, x: 900, y: 680, z: 0.92, e: ease.linear },
    { t: c.b_duas + 0.55, x: 1000, y: 520, z: 0.45 },
  ]);
  const gS = lerp(SOLO, B, duo);
  const angP = flip < 0.5 ? flip * 2 * 90 : 90;
  const angS = flip < 0.5 ? -90 : -90 * (1 - (flip - 0.5) * 2);
  const showP = (flip < 0.5 || duo > 0) && enter > 0;
  const showS = flip >= 0.5;

  const markCarteira = sp(t, c.b_carteira + 0.2, { damping: 14, stiffness: 170 }) * (1 - prog(t, c.b_comprador - 0.5, 0.2, ease.in));
  const markBusca = sp(t, c.b_site + 0.3, { damping: 14, stiffness: 170 }) * (1 - duo);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={t} mood={0.15 + 0.3 * duo} />
      <Title text="PAINEL PARA ORGANIZAR" hl="ORGANIZAR" p={sp(t, 0.25, { damping: 13, stiffness: 170 })} out={prog(t, c.b_comprador - 0.4, 0.3, ease.in)} />
      <Title text="SITE PARA APRESENTAR" hl="APRESENTAR" p={sp(t, c.b_comprador - 0.05, { damping: 13, stiffness: 170 })} out={prog(t, c.b_duas - 0.35, 0.3, ease.in)} />
      <div style={{ position: "absolute", inset: 0, perspective: 2200 }}>
        {showP ? (
          <Frame
            w={gP.w}
            h={gP.h}
            glow={glowA}
            style={{ left: gP.x, top: gP.y + (1 - Math.min(1, enter)) * 900, opacity: duo > 0 ? Math.min(1, duo * 1.6) : 1, transform: `rotateY(${duo > 0 ? 0 : angP}deg) rotate(${duo * -1.5}deg)`, transformOrigin: "50% 50%" }}
          >
            <Capture c={PAINEL} w={gP.w} h={gP.h - 44} cam={camP}>
              <Mark x={160} y={560} w={1680} h={476} p={markCarteira} z={camP.z} />
            </Capture>
            <Pill text="PAINEL" p={duo} />
          </Frame>
        ) : null}
        {showS ? (
          <Frame w={gS.w} h={gS.h} glow={glowB} style={{ left: gS.x, top: gS.y, transform: `rotateY(${angS}deg) rotate(${duo * 1.5}deg)`, transformOrigin: "50% 50%" }}>
            <Capture c={SITE} w={gS.w} h={gS.h - 44} cam={camS}>
              <Mark x={260} y={568} w={1218} h={204} p={markBusca} z={camS.z} />
            </Capture>
            <Pill text="SITE" p={duo} />
          </Frame>
        ) : null}
      </div>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <PreviewMark noVoice={tl.voice.startsWith("PROVIS")} noAuth={!publishable(PAINEL) || !publishable(SITE)} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
