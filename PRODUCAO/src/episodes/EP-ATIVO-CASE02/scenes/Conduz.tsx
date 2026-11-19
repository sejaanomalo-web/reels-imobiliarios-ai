import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, HouseArt, Label, RoomArt, STEPS, Tag, Viewfinder } from "./ui";

/**
 * CENA 5 — APLICAÇÃO (2) + TRANSIÇÃO. "É uma forma simples de criar conteúdo útil e deixar claro como você conduz o atendimento." → tela
 * dividida TOUR GENÉRICO (fachada + adjetivos) × TOUR COM RESPOSTAS (cômodo + as 3 perguntas respondidas). "E cada detalhe que o comprador
 * perguntar merece ficar registrado no atendimento." (transição adaptada da CTA de comentário) → as perguntas descem para a ficha
 * ATENDIMENTO (comprador genérico) e ficam registradas.
 */
export const Conduz: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.t_forma - 0.35, { damping: 15, stiffness: 150 });
  const right = prog(t, c.t_util - 0.2, 0.5, ease.out);
  const conduz = sp(t, c.t_conduz - 0.1, { damping: 12, stiffness: 200 });
  const card = sp(t, c.t_cada - 0.2, { damping: 13, stiffness: 180 });
  const fly = [0, 1, 2].map((i) => prog(t, c.t_perg - 0.3 + i * 0.25, 0.6, ease.inOut));
  const reg = [0, 1, 2].map((i) => prog(t, c.t_reg - 0.1 + i * 0.15, 0.3, ease.out));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const W = 420;
  const H = 560;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.t_forma - 0.35, s: 0.97, y: 0 },
          { t: c.t_util + 0.4, s: 1.03, x: 40, y: -20, e: ease.inOut },
          { t: c.t_conduz + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.t_reg + 0.3, s: 1.04, y: 60, e: ease.inOut },
          { t: c.cta_quer, s: 1.04, y: 60, e: ease.linear },
        ]}
      >
        {[0, 1].map((i) => {
          const good = i === 1;
          return (
            <div key={i} style={{ position: "absolute", left: good ? 560 : 100, top: 300 }}>
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <Tag text={good ? "TOUR COM RESPOSTAS" : "TOUR GENÉRICO"} tone={good ? "accent" : "muted"} size={24} />
              </div>
              <div style={{ position: "relative", width: W, height: H, opacity: good ? mix(0.35, 1, right) : mix(1, 0.6, right) }}>
                <Viewfinder w={W} h={H} t={t} rec={false}>
                  {good ? (
                    <>
                      <div style={{ position: "absolute", left: -260 + Math.sin(t * 0.6) * 20, top: 40 }}><RoomArt w={720} doors={1} light={1} t={t} /></div>
                      {STEPS.map((s, k) => {
                        const p = prog(t, c.t_util + k * 0.3, 0.4, ease.out) * (1 - fly[k]);
                        return (
                          <div key={s.k} style={{ position: "absolute", left: 20, top: 30 + k * 66, display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 16, background: "rgba(7,8,10,0.85)", border: `2px solid ${BRAND.hex}`, opacity: p }}>
                            <CheckDot p={1} size={30} />
                            <span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{s.k}</span>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div style={{ position: "absolute", left: -40 + Math.sin(t * 0.5) * 30, top: -80 }}><HouseArt w={480} hue={4} /></div>
                      {["LINDO!", "INCRÍVEL!"].map((a, k) => (
                        <div key={a} style={{ position: "absolute", left: 40 + k * 140, top: 360 + k * 70 + Math.sin(t * 2 + k) * 8, padding: "8px 16px", borderRadius: 20, background: C.surface3, fontWeight: 800, fontSize: 30, color: C.muted }}>{a}</div>
                      ))}
                    </>
                  )}
                </Viewfinder>
              </div>
            </div>
          );
        })}
        {conduz > 0.001 && card < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 940, display: "flex", justifyContent: "center", opacity: Math.min(1, conduz * 1.5) * (1 - card * 2) }}>
            <Tag text="COMO VOCÊ CONDUZ O ATENDIMENTO" tone="accent" size={30} />
          </div>
        ) : null}
        {/* ficha de atendimento */}
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 930, height: 340, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${reg[2] > 0.5 ? brandAlpha(0.6) : C.line}`, padding: "22px 30px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 80}px)`, boxShadow: reg[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>ATENDIMENTO · COMPRADOR</Label>
              <Tag text={reg[2] > 0.5 ? "REGISTRADO" : "EXEMPLO ILUSTRATIVO"} tone={reg[2] > 0.5 ? "accent" : "muted"} size={20} />
            </div>
            {STEPS.map((s, k) => (
              <div key={s.k} style={{ marginTop: k ? 12 : 18, height: 70, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", borderRadius: 18, background: C.surface2, opacity: fly[k], transform: `translateY(${(1 - fly[k]) * -200}px)` }}>
                <CheckDot p={reg[k]} size={40} />
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{s.k}</span>
                <span style={{ fontWeight: 700, fontSize: 24, color: C.muted, marginLeft: "auto" }}>{s.sub}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
