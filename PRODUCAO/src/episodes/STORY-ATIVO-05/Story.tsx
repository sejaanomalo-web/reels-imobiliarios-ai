import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, mix, prog, sp } from "../../lib/anim";
import { BRAND, C, F, brandAlpha } from "../../theme";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { caseOf, publishable } from "../STORY-ATIVO/cases";
import { Capture, Drift, Frame, PreviewMark } from "../STORY-ATIVO/kit";

export const timeline = timelineJson as Timeline;

/**
 * STORY 05 — "A diferença é começar por você" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md). 1080×1920. Fecha o destaque "Na prática".
 * Os três projetos em cascata ("Percebeu a diferença?") → corte para o preto → logo oficial → "NÃO COMEÇAMOS PELO CRM." →
 * "COMEÇAMOS POR VOCÊ." → os três projetos voltam pequenos, ligados ao "você" → CTA "AGENDAR DEMONSTRAÇÃO".
 * O link é um sticker do Instagram (Cal.com): o MP4 só RESERVA a área (y 1020–1240); na prévia ela aparece tracejada.
 * Texto da fala mantido como no roteiro por decisão do cliente (13/11/2026).
 */
const CS = [caseOf("bruno_painel"), caseOf("ivone_painel"), caseOf("antonio_site")];
const STICKER = { top: 1020, h: 220 };

export const Story05: React.FC<{ withAudio?: boolean }> = ({ withAudio = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const noVoice = tl.voice.startsWith("PROVIS");

  // 1 — cascata
  const card = (i: number) => sp(t, 0.1 + i * 0.18, { damping: 15, stiffness: 160 });
  const black = prog(t, c.f_ativo - 0.3, 0.25, ease.in);
  // 2 — logo e "não começamos pelo CRM"
  const logo = sp(t, c.f_ativo - 0.1, { damping: 14, stiffness: 140 });
  const logoUp = prog(t, c.f_nao - 0.15, 0.6, ease.inOut);
  const nao = sp(t, c.f_nao - 0.05, { damping: 13, stiffness: 170 });
  const strike = prog(t, c.f_crm + 0.15, 0.4, ease.out);
  const naoOut = prog(t, c.f_prim - 0.3, 0.3, ease.in);
  // 3 — "começamos por você" + os três voltam ligados a você
  const voce = sp(t, c.f_prim - 0.05, { damping: 13, stiffness: 170 });
  const voceHit = sp(t, c.f_voce, { damping: 9, stiffness: 220 });
  const back = (i: number) => sp(t, c.f_depois + i * 0.15, { damping: 15, stiffness: 150 });
  const link = prog(t, c.f_depois + 0.2, 1.0, ease.inOut);
  const glow = prog(t, c.f_rotina - 0.1, 0.5, ease.out);
  const clear = prog(t, c.f_quer - 0.3, 0.35, ease.in);
  // 4 — CTA
  const cta = sp(t, c.f_quer - 0.05, { damping: 12, stiffness: 170 });
  const ctaHit = sp(t, c.f_agende, { damping: 8, stiffness: 240 });
  const arrow = prog(t, c.f_agende + 0.1, 0.5, ease.out);
  const bob = Math.sin(t * 4) * 8;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={t} mood={0.15 + 0.4 * glow * (1 - clear) + 0.3 * cta} />
      <Drift t={t} amt={1.0}>
        {/* 1 — três projetos em cascata */}
      {black < 1
        ? CS.map((cs, i) => {
            const a = card(i);
            const w = 820;
            const h = 452;
            return (
              <Frame key={cs.key} w={w} h={h} style={{ left: 130 + (i - 1) * 60 + (1 - Math.min(1, a)) * (i % 2 ? -900 : 900), top: 330 + i * 250, opacity: 1 - black, transform: `rotate(${(i - 1) * 3}deg) scale(${mix(1, 0.85, black)})` }}>
                <Capture c={cs} w={w} h={h - 44} cam={{ x: 1000 + Math.sin(t * 0.8 + i) * 80, y: 520, z: 0.41 + t * 0.006 }} />
              </Frame>
            );
          })
        : null}
      {/* preto */}
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: black * (1 - prog(t, c.f_nao, 1.2, ease.inOut) * 0.75) }} />
      {/* logo oficial */}
      {logo > 0.001 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(760, 300, logoUp), display: "flex", justifyContent: "center", opacity: Math.min(1, logo * 1.5) * (1 - clear * 0.25), clipPath: `inset(-20% ${(1 - prog(t, c.f_ativo - 0.1, 0.55, ease.out)) * 100}% -20% -5%)` }}>
          <Img src={staticFile(BRAND.logo)} style={{ height: mix(170, 110, logoUp), filter: `drop-shadow(0 0 22px ${brandAlpha(0.5)})` }} />
        </div>
      ) : null}
      {/* "NÃO COMEÇAMOS PELO CRM." */}
      {nao > 0.001 && naoOut < 1 ? (
        <div style={{ position: "absolute", left: 90, right: 90, top: 640, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, nao * 1.5) * (1 - naoOut), transform: `translateY(${(1 - Math.min(1, nao)) * 50 - naoOut * 60}px)` }}>
          NÃO COMEÇAMOS
          <br />
          PELO{" "}
          <span style={{ position: "relative", display: "inline-block", color: strike > 0.5 ? C.muted : C.text }}>
            CRM.
            <span style={{ position: "absolute", left: -8, top: "52%", height: 10, borderRadius: 5, width: `calc(${strike * 100}% + 16px)`, background: C.warn }} />
          </span>
        </div>
      ) : null}
      {/* "COMEÇAMOS POR VOCÊ." */}
      {voce > 0.001 && clear < 1 ? (
        <div style={{ position: "absolute", left: 90, right: 90, top: 560, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, voce * 1.5) * (1 - clear), transform: `translateY(${(1 - Math.min(1, voce)) * 50}px)` }}>
          COMEÇAMOS
          <br />
          POR{" "}
          <span style={{ display: "inline-block", color: BRAND.hex, transform: `scale(${1 + 0.12 * Math.sin(Math.min(1, voceHit) * Math.PI)})`, textShadow: `0 0 ${30 * voceHit}px ${brandAlpha(0.5)}` }}>VOCÊ.</span>
        </div>
      ) : null}
      {/* os três voltam, ligados a "você" */}
      {back(0) > 0.001 && clear < 1 ? (
        <>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 1 - clear }}>
            {[0, 1, 2].map((i) => {
              const x2 = 200 + i * 340;
              return <path key={i} d={`M 640 ${790} C 640 880, ${x2} 860, ${x2} 960`} fill="none" stroke={BRAND.hex} strokeWidth={8} strokeLinecap="round" strokeDasharray={`${260 * link} 400`} opacity={link > 0.02 ? 0.9 : 0} />;
            })}
          </svg>
          {CS.map((cs, i) => {
            const a = back(i);
            const w = 300;
            const h = 214;
            return (
              <Frame key={cs.key} w={w} h={h} glow={glow} style={{ left: 50 + i * 340, top: 960 + (1 - Math.min(1, a)) * 500 + Math.sin(t * 1.4 + i * 2) * 6, opacity: Math.min(1, a * 1.5) * (1 - clear), transform: `rotate(${(i - 1) * 4}deg)` }}>
                <Capture c={cs} w={w} h={h - 44} cam={{ x: 1000, y: 551, z: 0.155 }} />
              </Frame>
            );
          })}
        </>
      ) : null}
      {/* CTA */}
      {cta > 0.001 ? (
        <>
          <div style={{ position: "absolute", left: 110, right: 110, top: 600, display: "flex", justifyContent: "center", opacity: Math.min(1, cta * 1.5), transform: `translateY(${(1 - Math.min(1, cta)) * 60}px) scale(${1 + 0.06 * Math.sin(Math.min(1, ctaHit) * Math.PI)})` }}>
            <div style={{ padding: "34px 54px", borderRadius: 40, background: BRAND.hex, color: BRAND.ink, textAlign: "center", fontWeight: 800, fontSize: 78, lineHeight: 1.0, letterSpacing: "-0.035em", boxShadow: `0 0 ${50 + 40 * ctaHit}px ${brandAlpha(0.45)}` }}>
              AGENDAR
              <br />
              DEMONSTRAÇÃO
            </div>
          </div>
          {/* seta para a área do sticker */}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: arrow }}>
            <path d={`M 540 ${880 + bob} L 540 ${980 + bob} M 505 ${945 + bob} L 540 ${982 + bob} L 575 ${945 + bob}`} fill="none" stroke={BRAND.hex} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {noVoice || CS.some((cs) => !publishable(cs)) ? (
            <div style={{ position: "absolute", left: 190, right: 190, top: STICKER.top, height: STICKER.h, boxSizing: "border-box", borderRadius: 30, border: `4px dashed ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, lineHeight: 1.3, color: C.warn, opacity: arrow }}>
              ÁREA DO STICKER DE LINK
              <br />
              (inserir no Instagram)
            </div>
          ) : null}
        </>
      ) : null}
      </Drift>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <PreviewMark noVoice={noVoice} noAuth={CS.some((cs) => !publishable(cs))} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
