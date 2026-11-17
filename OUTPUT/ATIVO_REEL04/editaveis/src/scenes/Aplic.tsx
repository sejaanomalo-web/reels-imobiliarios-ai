import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, IconPlane, Label, PropCard, STEPS, Tag } from "./ui";

/**
 * CENA 5 — APLICAÇÃO + TRANSIÇÃO. "Antes de mandar a próxima lista, testa essas três perguntas." → mensagem PRÓXIMA LISTA em rascunho com
 * o enviar travado; as três perguntas marcadas antes. "E deixa as respostas de cada comprador registradas para a próxima conversa."
 * (transição adaptada do "Depois me conta…") → as respostas descem para a ficha COMPRADOR · RESPOSTAS (genérica) e ficam registradas.
 */
export const Aplic: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_antes - 0.35, { damping: 15, stiffness: 150 });
  const qs = [0, 1, 2].map((i) => prog(t, c.p_tres - 0.1 + i * 0.25, 0.35, ease.out));
  const unlock = prog(t, c.p_tres + 0.8, 0.4, ease.out);
  const card = sp(t, c.p_deixa - 0.2, { damping: 13, stiffness: 180 });
  const fly = [0, 1, 2].map((i) => prog(t, c.p_resp - 0.1 + i * 0.2, 0.5, ease.inOut));
  const reg = prog(t, c.p_reg - 0.1, 0.5, ease.out);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_antes - 0.35, s: 1.05, y: -40 },
          { t: c.p_tres + 0.3, s: 1.03, y: -10, e: ease.inOut },
          { t: c.p_reg + 0.3, s: 1.04, y: 50, e: ease.inOut },
          { t: c.cta_quer, s: 1.04, y: 50, e: ease.linear },
        ]}
      >
        {/* rascunho da próxima lista */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 300, height: 560, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${C.line}`, padding: "24px 28px", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", transform: `translateY(${(1 - Math.min(1, enter)) * 100}px)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label size={28} color={C.text}>PRÓXIMA LISTA</Label>
            <Tag text="RASCUNHO ILUSTRATIVO" tone="muted" size={20} />
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 14, opacity: mix(0.45, 1, unlock) }}>
            {[0, 1, 2].map((k) => <PropCard key={k} w={180} i={k + 1} />)}
          </div>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            {STEPS.map((s, i) => (
              <div key={s.k} style={{ display: "flex", alignItems: "center", gap: 14, opacity: mix(0.4, 1, qs[i]) }}>
                <CheckDot p={qs[i]} size={44} />
                <span style={{ fontWeight: 800, fontSize: 34, color: qs[i] > 0.5 ? C.text : C.dim }}>{s.k}</span>
                <span style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>{s.sub}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", right: 26, bottom: 24, width: 84, height: 84, borderRadius: 42, background: unlock > 0.5 ? BRAND.hex : C.surface3, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: unlock > 0.5 ? `0 0 26px ${brandAlpha(0.5)}` : "none" }}>
            <IconPlane size={44} color={unlock > 0.5 ? BRAND.ink : C.dim} />
          </div>
          <div style={{ position: "absolute", left: 28, bottom: 34, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: unlock > 0.5 ? BRAND.hex : C.dim }}>{unlock > 0.5 ? "PERGUNTAS FEITAS · PODE ENVIAR" : "ANTES: AS 3 PERGUNTAS"}</div>
        </div>
        {/* ficha de respostas */}
        {card > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 900, height: 360, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${reg > 0.5 ? brandAlpha(0.6) : C.line}`, padding: "22px 28px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 80}px)`, boxShadow: reg > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>COMPRADOR · RESPOSTAS</Label>
              <Tag text={reg > 0.5 ? "REGISTRADAS" : "EXEMPLO ILUSTRATIVO"} tone={reg > 0.5 ? "accent" : "muted"} size={20} />
            </div>
            {STEPS.map((s, k) => (
              <div key={s.k} style={{ marginTop: k ? 12 : 18, height: 74, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", borderRadius: 18, background: C.surface2, opacity: fly[k], transform: `translateY(${(1 - fly[k]) * -180}px)` }}>
                <CheckDot p={reg} size={40} />
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{s.k}</span>
                <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{[0, 1, 2, 3].map((d) => <span key={d} style={{ width: 40 + ((d * 17 + k * 11) % 30), height: 12, borderRadius: 6, background: C.surface3, display: "inline-block" }} />)}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
