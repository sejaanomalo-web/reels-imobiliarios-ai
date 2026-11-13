import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { IconHome, MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { OpeningHead, Phone } from "./ui";

/**
 * CENA 3a — ABERTURA 3: LOCALIZAÇÃO. "Terceiro, abra com um critério de localização: 'Se o seu trabalho fica nesta região, olha as
 * opções de acesso deste endereço.'"
 * Mapa ilustrativo sem distâncias nem tempos: região do trabalho, o endereço e três trajetos possíveis (sem números).
 */
const PX = 240;
const PY = 380;
const PW = 600;
const PH = 890;
const WORK = { x: 300, y: 300 };
const HOME = { x: 200, y: 640 };
const ROUTES = [
  { d: `M${HOME.x} ${HOME.y} C 120 520, 180 380, ${WORK.x - 20} ${WORK.y + 20}`, color: C.accent },
  { d: `M${HOME.x} ${HOME.y} C 300 600, 420 480, ${WORK.x + 20} ${WORK.y + 30}`, color: C.cold },
  { d: `M${HOME.x} ${HOME.y} C 260 520, 260 420, ${WORK.x} ${WORK.y + 40}`, color: "#E8B86A" },
];

const IconBag: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" stroke={color} strokeWidth={2.2} />
    <path d="M8.5 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2M3 12.5h18" stroke={color} strokeWidth={2.2} />
  </svg>
);

export const MapAccess: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.l_third - 0.1, { damping: 14, stiffness: 170 });
  const phone = sp(t, c.l_third + 0.1, { damping: 15, stiffness: 140 });
  const map = prog(t, c.l_third + 0.2, 0.9, ease.out);
  const title = sp(t, c.l_work - 0.05, { damping: 12, stiffness: 200 });
  const work = sp(t, c.l_work + 0.1, { damping: 10, stiffness: 220 });
  const region = sp(t, c.l_region - 0.05, { damping: 13, stiffness: 160 });
  const home = sp(t, c.l_options - 0.15, { damping: 10, stiffness: 220 });
  const routes = ROUTES.map((_, i) => prog(t, c.l_access - 0.1 + i * 0.22, 0.7, ease.inOut));
  const addr = sp(t, c.l_end - 0.05, { damping: 12, stiffness: 200 });
  const exit = prog(t, c.o_fourth - 0.35, 0.35, ease.in);
  const pulse = ((t * 0.9) % 1 + 1) % 1;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.l_third - 0.2, s: 0.94, y: 60, r: 1.5 },
          { t: c.l_loc, s: 1.0, y: 20, r: 0, e: ease.inOut },
          { t: c.l_region + 0.3, s: 1.08, y: 120, x: 20, e: ease.inOut },
          { t: c.l_access + 0.6, s: 1.04, y: 0, x: 0, e: ease.inOut },
          { t: c.o_fourth, s: 1.08, y: -30, e: ease.inOut },
        ]}
      >
        <OpeningHead n={3} p={head} t={t} />
        <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, phone * 1.5), transform: `translateY(${(1 - Math.min(1, phone)) * 200}px)` }}>
          <Phone x={PX} y={PY} w={PW} h={PH} t={t} t0={c.l_work} dur={4}>
            <div style={{ position: "absolute", inset: 0, opacity: map, transform: `scale(${mix(1.25, 1.08, map)}) translate(${Math.sin(t * 0.4) * 8}px, ${Math.cos(t * 0.35) * 8}px)` }}>
              <MapArt w={566} h={856} />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,12,15,0.7), rgba(10,12,15,0.15) 30%, rgba(10,12,15,0.35))" }} />
            {/* região do trabalho */}
            <svg width={566} height={856} style={{ position: "absolute", inset: 0 }}>
              <circle cx={WORK.x} cy={WORK.y} r={130 * Math.min(1, region)} fill="rgba(143,180,227,0.14)" stroke={C.cold} strokeWidth={3} strokeDasharray="10 8" opacity={Math.min(1, region)} />
              {region > 0.5 ? <circle cx={WORK.x} cy={WORK.y} r={130 + pulse * 50} fill="none" stroke={C.cold} strokeWidth={2} opacity={(1 - pulse) * 0.5} /> : null}
              {ROUTES.map((r, i) => (
                <g key={i}>
                  <path d={r.d} fill="none" stroke={r.color} strokeWidth={14} opacity={0.15 * routes[i]} strokeLinecap="round" />
                  <path d={r.d} fill="none" stroke={r.color} strokeWidth={6} strokeLinecap="round" strokeDasharray={routes[i] >= 1 ? "16 12" : `${520 * routes[i]} 600`} strokeDashoffset={routes[i] >= 1 ? -t * 50 : 0} opacity={routes[i] > 0.01 ? 1 : 0} />
                </g>
              ))}
            </svg>
            {/* pino do trabalho */}
            <div style={{ position: "absolute", left: WORK.x - 40, top: WORK.y - 40, width: 80, height: 80, borderRadius: 40, background: C.cold, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, work * 1.5), transform: `translateY(${(1 - Math.min(1, work)) * -60}px) scale(${mix(0.5, 1, Math.min(1.1, work))})`, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
              <IconBag size={46} color={C.ink} />
            </div>
            <div style={{ position: "absolute", left: WORK.x + 50, top: WORK.y - 20, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.cold, opacity: Math.min(1, region * 1.5) }}>TRABALHO</div>
            {/* o endereço */}
            <div style={{ position: "absolute", left: HOME.x - 30, top: HOME.y - 78, opacity: Math.min(1, home * 1.5), transform: `translateY(${(1 - Math.min(1, home)) * -80}px)` }}>
              <Pin size={60} color={C.accent} />
            </div>
            <div style={{ position: "absolute", left: HOME.x - 60, top: HOME.y + 10, display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 18, background: "rgba(14,58,31,0.95)", border: "2px solid rgba(58,245,132,0.5)", opacity: Math.min(1, addr * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, addr))})` }}>
              <IconHome size={26} color={C.accent} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.text }}>ESTE ENDEREÇO</span>
            </div>
            {/* texto do vídeo */}
            <div style={{ position: "absolute", left: 30, right: 30, top: 80, textAlign: "center", fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text, textShadow: "0 4px 18px rgba(0,0,0,0.8)", opacity: Math.min(1, title * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, title))})` }}>
              TRABALHA NESTA REGIÃO?
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", opacity: Math.min(1, addr * 1.5) }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.muted, letterSpacing: "0.06em" }}>MAPA ILUSTRATIVO · SEM DISTÂNCIAS</span>
            </div>
          </Phone>
        </div>
      </Camera>
    </div>
  );
};
