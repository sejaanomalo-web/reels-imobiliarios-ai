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
import { caseLabel, caseOf, CaseAsset, previewable, publishable } from "../STORY-ATIVO/cases";

export const timeline = timelineJson as Timeline;

/**
 * STORY 01 — "Por que são diferentes?" (STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md). 1080×1920.
 * Tela: 3 PROJETOS → 3 EXPERIÊNCIAS → UM PRINCÍPIO: PERSONALIZAÇÃO. Três capturas reais em recortes grandes, em movimento,
 * ligadas pelo traço verde; logo oficial no fecho.
 * Enquanto faltar voz oficial ou captura autorizada+higienizada, renderiza como PRÉVIA INTERNA (marca d'água, quadros
 * "captura pendente", projeto anonimizado) — não publicar.
 */
const CARDS: { key: CaseAsset["key"]; x: number; rot: number }[] = [
  { key: "bruno_painel", x: 70, rot: -5 },
  { key: "ivone_painel", x: 390, rot: 0 },
  { key: "antonio_site", x: 710, rot: 5 },
];

const Shot: React.FC<{ c: CaseAsset; t: number; i: number }> = ({ c, t, i }) =>
  previewable(c) ? (
    <Img src={staticFile(c.file)} style={{ position: "absolute", height: "100%", top: 0, left: -Math.min(780, 120 + i * 230 + t * 22) }} />
  ) : (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: `repeating-linear-gradient(135deg, #12161B 0 22px, #161B21 22px 44px)` }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted, textAlign: "center", lineHeight: 1.3 }}>
        CAPTURA
        <br />
        PENDENTE
      </div>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.dim }}>{c.kind}</div>
    </div>
  );

export const Story01: React.FC<{ withAudio?: boolean }> = ({ withAudio = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const preview = tl.voice.startsWith("PROVIS") || CARDS.some((k) => !publishable(caseOf(k.key)));

  const t1 = sp(t, c.a_tres - 0.1, { damping: 13, stiffness: 170 });
  const t2 = sp(t, c.a_formas - 0.1, { damping: 13, stiffness: 170 });
  const ask = prog(t, c.a_sabe - 0.1, 0.5, ease.inOut);
  const t3 = sp(t, c.a_nenhum - 0.1, { damping: 13, stiffness: 160 });
  const link = prog(t, c.a_comum - 0.3, 1.1, ease.inOut);
  const logo = sp(t, c.a_todo - 0.2, { damping: 14, stiffness: 140 });
  const fan = prog(t, c.a_formas, 0.8, ease.inOut);
  const gather = prog(t, c.a_nenhum - 0.2, 0.9, ease.inOut);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={t} mood={0.15 + 0.35 * gather} />
      {/* títulos (a fala está na legenda; aqui só as 2–4 palavras-chave do roteiro) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
        <div style={{ position: "absolute", left: 0, right: 0, fontSize: 120, color: C.text, opacity: Math.min(1, t1 * 1.5) * (1 - prog(t, c.a_formas - 0.25, 0.25, ease.in)), transform: `scale(${mix(1.3, 1, Math.min(1, t1))})` }}>
          <span style={{ color: BRAND.hex }}>3</span> PROJETOS
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, fontSize: 112, color: C.text, opacity: Math.min(1, t2 * 1.5) * (1 - prog(t, c.a_sabe - 0.2, 0.3, ease.in)), transform: `translateY(${(1 - Math.min(1, t2)) * 50}px)` }}>
          <span style={{ color: BRAND.hex }}>3</span> EXPERIÊNCIAS
        </div>
        <div style={{ position: "absolute", left: 100, right: 100, fontSize: 80, color: C.text, opacity: Math.min(1, t3 * 1.5), transform: `translateY(${(1 - Math.min(1, t3)) * 50}px)` }}>
          UM PRINCÍPIO:
          <br />
          <span style={{ color: BRAND.hex }}>PERSONALIZAÇÃO</span>
        </div>
      </div>
      {/* as três experiências */}
      {CARDS.map((k, i) => {
        const cs = caseOf(k.key);
        const a = sp(t, c.a_tres + 0.25 + i * 0.22, { damping: 14, stiffness: 150 });
        const y = mix(640, 600, fan) + (1 - Math.min(1, a)) * 900 + Math.sin(t * 1.2 + i * 2) * 8;
        const x = mix(k.x, 390 + (i - 1) * 230, gather);
        const rot = mix(mix(0, k.rot, fan), (i - 1) * 8, gather);
        const s = mix(1, 0.7, gather);
        const dim = 1 - 0.55 * ask * (1 - link);
        return (
          <div key={k.key} style={{ position: "absolute", left: x, top: y, width: 300, height: 600, borderRadius: 32, overflow: "hidden", border: `3px solid ${link > 0.4 + i * 0.15 ? BRAND.hex : "rgba(255,255,255,0.14)"}`, boxShadow: `0 40px 90px rgba(0,0,0,0.6)${link > 0.4 + i * 0.15 ? `, 0 0 50px ${brandAlpha(0.35)}` : ""}`, opacity: Math.min(1, a * 1.5) * dim * (1 - prog(t, c.a_todo - 0.3, 0.5, ease.in) * 0.85), transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%" }}>
            <Shot c={cs} t={t} i={i} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 20px", background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.85))", fontWeight: 800, fontSize: 30, color: C.text }}>{caseLabel(cs)}</div>
          </div>
        );
      })}
      {/* traço que liga as três (o que têm em comum) */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <path d="M 60 1150 C 300 1060, 420 980, 540 940 S 860 820, 1040 700" fill="none" stroke={BRAND.hex} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${1200 * link} 1400`} opacity={link > 0.02 ? 1 : 0} style={{ filter: `drop-shadow(0 0 12px ${brandAlpha(0.6)})` }} />
      </svg>
      {/* logo oficial */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: Math.min(1, logo * 1.5), clipPath: `inset(-20% ${(1 - prog(t, c.a_todo - 0.2, 0.6, ease.out)) * 100}% -20% -5%)` }}>
        <Img src={staticFile(BRAND.logo)} style={{ height: 140, filter: `drop-shadow(0 0 20px ${brandAlpha(0.5)})` }} />
      </div>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      {preview ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.14em", color: C.warn }}>PRÉVIA INTERNA · SEM VOZ · SEM AUTORIZAÇÃO · NÃO PUBLICAR</div>
      ) : null}
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
