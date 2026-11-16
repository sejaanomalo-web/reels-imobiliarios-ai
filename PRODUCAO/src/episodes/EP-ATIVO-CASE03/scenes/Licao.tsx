import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconLens, Label, LuxArt, SmallArt, Tag } from "./ui";

/**
 * CENA 4 — TAKE 03, A LIÇÃO + TRANSIÇÃO. "Talvez você ainda não trabalhe com o imóvel que deseja vender daqui a alguns anos." → a linha do
 * tempo agora é a do corretor: VOCÊ HOJE → DAQUI A ALGUNS ANOS (casa tracejada, ainda não sua). "Mas já pode construir o hábito necessário
 * para chegar lá: estudar melhor cada produto e apresentar somente o que consegue sustentar com informação." → ESTUDAR → ENTENDER →
 * APRESENTAR + O POSICIONAMENTO É CONSTRUÍDO. "Escolhe um imóvel da sua carteira para estudar com mais profundidade hoje." (transição
 * adaptada; o "Salva este vídeo" saiu) → carteira com 4 imóveis; um é escolhido e entra EM ESTUDO · HOJE.
 */
const FLOW = ["ESTUDAR", "ENTENDER", "APRESENTAR"];

export const Licao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.l_talvez - 0.35, { damping: 15, stiffness: 150 });
  const run = prog(t, c.l_talvez + 0.2, 2.0, ease.inOut);
  const future = Math.max(0.35 * prog(t, c.l_talvez, 0.6, ease.out), sp(t, c.l_anos - 0.2, { damping: 12, stiffness: 190 }));
  const title = sp(t, c.l_habito - 0.1, { damping: 13, stiffness: 180 });
  const flow = [c.l_estudar, c.l_estudar + 0.8, c.l_apres].map((x) => sp(t, x - 0.1, { damping: 12, stiffness: 210 }));
  const sust = sp(t, c.l_sust - 0.1, { damping: 12, stiffness: 200 });
  const cart = sp(t, c.l_esc - 0.25, { damping: 14, stiffness: 180 });
  const pick = sp(t, c.l_cart, { damping: 11, stiffness: 210 });
  const hoje = sp(t, c.l_hoje - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const x0 = 170;
  const x1 = 830;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.l_talvez - 0.35, s: 1.0, x: -20, y: 0 },
          { t: c.l_anos + 0.3, s: 1.0, x: 20, y: 0, e: ease.inOut },
          { t: c.l_habito + 0.3, s: 0.98, x: 0, y: 0, e: ease.inOut },
          { t: c.l_estudar + 0.2, s: 1.03, x: -25, y: 30, e: ease.inOut },
          { t: c.l_apres + 0.2, s: 1.03, x: 25, y: 30, e: ease.inOut },
          { t: c.l_sust + 0.3, s: 1.02, x: 0, y: 10, e: ease.inOut },
          { t: c.l_cart + 0.3, s: 1.03, y: 10, e: ease.inOut },
          { t: c.cta_quer, s: 1.03, y: 10, e: ease.linear },
        ]}
      >
        {/* sua linha do tempo */}
        <div style={{ position: "absolute", left: x0, top: 700, width: x1 - x0, height: 10, borderRadius: 5, background: `repeating-linear-gradient(90deg, ${C.dim} 0 18px, transparent 18px 30px)` }} />
        <div style={{ position: "absolute", left: x0, top: 640, width: (x1 - x0) * run, height: 10, borderRadius: 5, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.6)}` }} />
        {run > 0.98 ? <div style={{ position: "absolute", left: x0 + ((t * 0.7) % 1) * (x1 - x0) - 14, top: 691, width: 28, height: 28, borderRadius: 14, background: C.text, opacity: Math.sin(((t * 0.7) % 1) * Math.PI), boxShadow: `0 0 18px ${brandAlpha(0.8)}` }} /> : null}
        <div style={{ position: "absolute", left: x0 - 18, top: 687, width: 36, height: 36, borderRadius: 18, background: C.text }} />
        <div style={{ position: "absolute", left: x0 - 110, top: 740, width: 220, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 52, color: C.text }}>VOCÊ</div>
          <Label size={24}>HOJE</Label>
        </div>
        <div style={{ position: "absolute", left: x0 - 110, top: 480, width: 220, borderRadius: 14, overflow: "hidden", border: `2px solid ${C.line}` }}>
          <SmallArt w={220} />
        </div>
        {future > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: x1 - 180, top: 470, width: 330, borderRadius: 16, overflow: "hidden", border: `3px dashed ${C.muted}`, opacity: Math.min(1, future * 1.5) * 0.7, filter: "grayscale(0.7)" }}>
              <LuxArt w={330} lit={0.3} />
            </div>
            <div style={{ position: "absolute", left: x1 - 18, top: 687, width: 36, height: 36, borderRadius: 18, border: `4px dashed ${C.muted}`, background: C.bg0, opacity: future }} />
            <div style={{ position: "absolute", left: x1 - 150, top: 740, width: 300, textAlign: "center", opacity: Math.min(1, future * 1.5) }}>
              <div style={{ fontWeight: 800, fontSize: 40, color: C.muted }}>DAQUI A ALGUNS ANOS</div>
            </div>
          </>
        ) : null}
        {/* o hábito */}
        <div style={{ position: "absolute", left: 90, right: 90, top: 860, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {FLOW.map((k, i) => {
            const p = flow[i];
            return (
              <React.Fragment key={k}>
                <div style={{ width: 250, height: 110, boxSizing: "border-box", borderRadius: 24, background: p > 0.5 ? BRAND.deep : C.surface, border: `3px ${p > 0.5 ? "solid" : "dashed"} ${p > 0.5 ? BRAND.hex : C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: title > 0.01 ? mix(0.5, 1, Math.min(1, p)) : 0, transform: `scale(${mix(0.85, 1, Math.min(1.06, p))})` }}>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.05em", color: p > 0.5 ? C.text : C.dim }}>{k}</span>
                </div>
                {i < 2 ? <span style={{ fontSize: 44, color: flow[i + 1] > 0.5 ? BRAND.hex : C.dim, opacity: title > 0.01 ? 1 : 0 }}>→</span> : null}
              </React.Fragment>
            );
          })}
        </div>
        {sust > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 990, display: "flex", justifyContent: "center", opacity: Math.min(1, sust * 1.5) * (1 - cart * 0.6), transform: `scale(${mix(0.6, 1, Math.min(1.06, sust))})` }}>
            <Tag text="SÓ O QUE SE SUSTENTA COM INFORMAÇÃO" tone="accent" size={26} />
          </div>
        ) : null}
        {/* a carteira */}
        {cart > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 1050, height: 236, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, padding: "18px 22px", opacity: Math.min(1, cart * 1.5), transform: `translateY(${(1 - Math.min(1, cart)) * 80}px)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>SUA CARTEIRA</Label>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 16 }}>
              {[0, 1, 2, 3].map((i) => {
                const sel = i === 2;
                const lift = sel ? pick : 0;
                return (
                  <div key={i} style={{ position: "relative", width: 205, height: 150, borderRadius: 18, overflow: "hidden", border: `3px solid ${sel && pick > 0.5 ? BRAND.hex : C.line}`, opacity: sel ? 1 : mix(1, 0.4, pick), transform: `translateY(${-lift * 14 + Math.sin(t * 2 + i) * 4}px) scale(${1 + lift * 0.05})`, boxShadow: sel && pick > 0.5 ? `0 0 30px ${brandAlpha(0.4)}` : "none" }}>
                    {i % 2 ? <SmallArt w={205} /> : <div style={{ marginTop: -10 }}><LuxArt w={240} lit={0.6} /></div>}
                    {sel && pick > 0.3 ? (
                      <div style={{ position: "absolute", left: 10, bottom: 10, display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 10, background: "rgba(7,8,10,0.85)", opacity: prog(pick, 0.3, 0.4, ease.out) }}>
                        <IconLens size={26} color={BRAND.hex} />
                        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text }}>{hoje > 0.5 ? "HOJE" : "EM ESTUDO"}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Camera>
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
          O POSICIONAMENTO <span style={{ color: BRAND.hex }}>É CONSTRUÍDO</span>
        </div>
      ) : null}
    </div>
  );
};
