import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconPause, IconPlay, Tag, barH } from "./ui";

/**
 * CENA 01 — GANCHO. "Você mandou um áudio de três minutos. O cliente ouviu metade e ficou sem saber o próximo passo."
 * Uma onda sonora longa atravessa a tela até marcar 3:00; o cliente toca, a onda corre e para na metade (1:30) —
 * pausa gigante no meio, e a pergunta que ficou: próximo passo?
 */
const N = 220; // barras na onda inteira
const BW = 14; // largura de cada barra + espaço
const MID = 540;
const WY = 820;

export const Wave: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const sweep = prog(t, 0, c.hook_three + 0.2, ease.out); // a onda atravessa a tela
  const dur = sp(t, c.hook_three, { damping: 12, stiffness: 200 });
  const play = prog(t, c.hook_client, c.hook_half + 0.35 - c.hook_client, ease.inOut) * 0.5;
  const paused = sp(t, c.hook_half + 0.35, { damping: 11, stiffness: 200 });
  const next = sp(t, c.hook_next + 0.6, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.sit_audio - 0.05, 0.45, ease.in);
  const total = N * BW;
  // antes do play a onda entra varrendo da direita; depois rola sob a agulha fixa no centro
  const offset = mix(160, 0, sweep) - play * total;
  const secs = Math.round(play * 180);
  const clock = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: -40, x: 0 },
          { t: c.hook_three + 0.3, s: 1.02, y: -20, x: 0, e: ease.inOut },
          { t: c.hook_half + 0.4, s: 1.08, y: 0, e: ease.inOut },
          { t: c.hook_next + 0.6, s: 1.0, y: 40, e: ease.inOut },
          { t: c.sit_audio + 0.4, s: 0.96, y: 30, e: ease.in },
        ]}
      >
        {/* tempo */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 26 }}>
          <span style={{ fontWeight: 800, fontSize: 200, letterSpacing: "-0.05em", color: C.text, fontVariantNumeric: "tabular-nums", opacity: play > 0 ? 1 : 0.45 }}>{play > 0 ? clock : "0:00"}</span>
          <span style={{ fontWeight: 800, fontSize: 90, color: C.muted, opacity: Math.min(1, dur * 1.5), transform: `scale(${mix(1.6, 1, Math.min(1, dur))})`, display: "inline-block" }}>/ 3:00</span>
        </div>
        {/* a onda */}
        <div style={{ position: "absolute", left: 0, right: 0, top: WY - 160, height: 320, overflow: "visible" }}>
          {Array.from({ length: N }).map((_, i) => {
            const x = MID - 20 + i * BW + offset;
            if (x < -40 || x > 1120) return null;
            const heard = x < MID;
            const h = barH(i) * 260;
            return <div key={i} style={{ position: "absolute", left: x, top: 160 - h / 2, width: BW - 5, height: h, borderRadius: 4, background: heard ? C.accent : "rgba(195,200,208,0.55)" }} />;
          })}
          {/* agulha */}
          <div style={{ position: "absolute", left: MID - 2, top: -10, width: 4, height: 340, borderRadius: 2, background: C.text, opacity: play > 0 ? 1 : 0 }} />
        </div>
        {/* botão play/pausa grande */}
        <div style={{ position: "absolute", left: MID - 85, top: WY + 200, width: 170, height: 170, borderRadius: 85, background: paused > 0 ? C.warn : C.surface2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.18 * Math.sin(Math.PI * Math.min(1, paused))})`, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          {paused > 0 ? <IconPause size={90} color={C.ink} /> : <IconPlay size={90} />}
        </div>
        {paused > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: WY - 225, display: "flex", justifyContent: "center", opacity: Math.min(1, paused * 1.5) }}>
            <Tag text="PAROU NA METADE" tone="warn" size={26} />
          </div>
        ) : null}
        {/* e agora? */}
        {next > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: WY + 410, display: "flex", justifyContent: "center", opacity: Math.min(1, next * 1.5), transform: `translateY(${(1 - Math.min(1, next)) * 30}px)` }}>
            <div style={{ padding: "14px 34px", borderRadius: 28, border: `3px dashed ${C.warn}`, fontWeight: 800, fontSize: 52, color: C.text }}>
              próximo passo<span style={{ color: C.warn }}> ?</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
