import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconDoc, Label, Question, Tag } from "./ui";

/**
 * CENA 2 — AS DÚVIDAS. "Antes da visita, essa pessoa pode querer saber como se prepara para uma análise de crédito, o que influencia a
 * entrada, quais custos aparecem além do anúncio e por que a parcela anunciada não é uma resposta personalizada." → a pergunta da cena 1
 * sobe e vira cabeçalho; quatro cartões (molduras desde "Antes da visita") abrem na fala. Nenhuma taxa, entrada ou regra: a parcela
 * aparece mascarada (R$ ••••) com ≠ SUA SITUAÇÃO.
 */
const CARDS = [
  { k: "ANÁLISE DE CRÉDITO", q: "Como me preparo?" },
  { k: "ENTRADA", q: "O que influencia?" },
  { k: "CUSTOS", q: "O que aparece além do anúncio?" },
  { k: "PARCELA ANUNCIADA", q: "Vale para mim?" },
];
const POS = [
  { x: 100, y: 470 },
  { x: 560, y: 470 },
  { x: 100, y: 840 },
  { x: 560, y: 840 },
];

export const Duvidas: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.d_cred, c.d_entr, c.d_custos, c.d_parc];
  const enter = sp(t, c.d_antes - 0.35, { damping: 15, stiffness: 150 });
  const pers = sp(t, c.d_pers - 0.1, { damping: 11, stiffness: 220 });
  const visit = sp(t, c.d_antes - 0.05, { damping: 13, stiffness: 190 });
  const out = prog(t, c.p_serie - 0.45, 0.4, ease.in);
  const cur = at.filter((x) => t >= x - 0.15).length - 1;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_antes - 0.35, s: 0.97, y: 0 },
          { t: c.d_cred + 0.2, s: 1.05, x: -60, y: -40, e: ease.inOut },
          { t: c.d_entr + 0.2, s: 1.05, x: 60, y: -40, e: ease.inOut },
          { t: c.d_custos + 0.2, s: 1.05, x: -60, y: 60, e: ease.inOut },
          { t: c.d_parc + 0.2, s: 1.05, x: 60, y: 60, e: ease.inOut },
          { t: c.d_pers + 0.4, s: 1.0, x: 0, y: 20, e: ease.inOut },
          { t: c.p_serie, s: 1.02, y: 20, e: ease.linear },
        ]}
      >
        {/* cabeçalho: a pergunta da cena 1 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
          <Question size={70} />
          <div style={{ fontWeight: 800, fontSize: 54, letterSpacing: "-0.03em", color: C.text }}>EU CONSIGO COMPRAR?</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, visit * 1.5) }}>
          <Tag text="ANTES DA VISITA" tone="accent" size={28} />
          <Tag text="DÚVIDAS ILUSTRATIVAS" tone="muted" size={22} />
        </div>
        {CARDS.map((k, i) => {
          const a = sp(t, c.d_antes + 0.15 + i * 0.12, { damping: 14, stiffness: 190 });
          const on = t >= at[i] - 0.15;
          const fill = sp(t, at[i] - 0.15, { damping: 12, stiffness: 200 });
          const p = POS[i];
          return (
            <div key={k.k} style={{ position: "absolute", left: p.x, top: p.y + Math.sin(t * 1.5 + i) * 4, width: 420, height: 330, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `3px solid ${on ? (cur === i ? BRAND.hex : brandAlpha(0.45)) : C.line}`, padding: "24px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: Math.min(1, a * 1.5) * (on ? 1 : 0.5), transform: `scale(${mix(0.85, 1, Math.min(1, a))}) scale(${on && cur === i ? 1.03 : 1})`, boxShadow: on && cur === i ? `0 0 34px ${brandAlpha(0.25)}` : "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Label size={26} color={on ? BRAND.hex : C.muted}>{String(i + 1).padStart(2, "0")}</Label>
                {on && !(i === 3 && pers > 0.001) ? <div style={{ transform: `scale(${mix(0.4, 1, Math.min(1.1, fill))})` }}>{i === 2 ? <IconDoc size={50} color={BRAND.hex} /> : <Question size={50} />}</div> : null}
                {i === 3 && pers > 0.001 ? <div style={{ transform: `scale(${mix(1.6, 1, Math.min(1, pers))}) rotate(-3deg)`, opacity: Math.min(1, pers * 1.5) }}><Tag text="≠ SUA SITUAÇÃO" tone="warn" size={24} /></div> : null}
              </div>
              <div>
                <Label size={26} color={on ? C.text : C.dim}>{k.k}</Label>
                <div style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08, letterSpacing: "-0.02em", color: on ? C.text : C.dim, marginTop: 8, opacity: on ? Math.min(1, fill * 1.5) : 0.4 }}>{k.q}</div>
                {i === 3 && on ? (
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.muted, whiteSpace: "nowrap" }}>R$ ••••/mês</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </Camera>
    </div>
  );
};
