import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, Pro, Tag } from "./ui";

/**
 * CENA 3 — SEGUNDA ABORDAGEM. "Na segunda, o profissional começa verificando os dados do imóvel, pesquisando referências de mercado e
 * organizando uma apresentação adequada." → B com a prancheta PLANO DE CAPTAÇÃO (ilustrativa, sem preços): DADOS DO IMÓVEL (A CONFERIR),
 * REFERÊNCIAS DE MERCADO, APRESENTAÇÃO. "Explica quais materiais pretende produzir, como fará os retornos e quais próximos passos precisam
 * ser combinados." → MATERIAIS, RETORNOS (calendário), PRÓXIMOS PASSOS. Cada linha é riscada na checklist no tempo da fala.
 */
const ROWS = [
  { k: "DADOS DO IMÓVEL", sub: "metragem, documentos, características", tag: "A CONFERIR" },
  { k: "REFERÊNCIAS DE MERCADO", sub: "imóveis comparáveis", tag: "PESQUISA" },
  { k: "APRESENTAÇÃO", sub: "para quem é indicado", tag: "" },
  { k: "MATERIAIS", sub: "fotos, vídeo, descrição", tag: "" },
  { k: "RETORNOS", sub: "quando e como você atualiza", tag: "" },
  { k: "PRÓXIMOS PASSOS", sub: "combinados com o proprietário", tag: "" },
];

export const Seg: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.g_verif, c.g_pesq, c.g_org, c.g_mat, c.g_ret, c.g_passos];
  const enter = sp(t, c.g_seg - 0.35, { damping: 15, stiffness: 150 });
  const cur = at.filter((x) => t >= x - 0.15).length - 1;
  const out = prog(t, c.q_prop - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.g_seg - 0.35, s: 1.03, y: 0 },
          { t: c.g_verif + 0.2, s: 1.05, x: 20, y: -20, e: ease.inOut },
          { t: c.g_pesq + 0.2, s: 1.04, x: -20, y: -10, e: ease.inOut },
          { t: c.g_org + 0.2, s: 1.06, x: 20, y: 0, e: ease.inOut },
          { t: c.g_mat + 0.2, s: 1.04, x: -20, y: 0, e: ease.inOut },
          { t: c.g_ret + 0.2, s: 1.06, x: 20, y: 0, e: ease.inOut },
          { t: c.g_passos + 0.2, s: 1.04, x: -10, y: 0, e: ease.inOut },
          { t: c.g_comb + 0.2, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.q_prop, s: 1.03, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 80, top: 390 }}><Pro who="B" size={150} glow={1} /></div>
        <div style={{ position: "absolute", left: 250, right: 90, top: 400, boxSizing: "border-box", padding: "22px 24px 18px", borderRadius: 26, background: C.paper, borderTop: `14px solid ${BRAND.hex}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", transform: `translateY(${(1 - Math.min(1, enter)) * 80}px) rotate(${Math.sin(t * 1.2) * 0.6}deg)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Label size={26} color={C.ink}>PLANO DE CAPTAÇÃO</Label>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.inkMuted, padding: "4px 8px", borderRadius: 8, background: "#E2DED4" }}>ILUSTRATIVO</span>
          </div>
          {ROWS.map((r, i) => {
            const on = i <= cur;
            const p = sp(t, at[i] - 0.15, { damping: 12, stiffness: 210 });
            return (
              <div key={r.k} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", borderRadius: 16, background: i === cur ? "#E6F7EC" : "transparent", border: `2px solid ${i === cur ? BRAND.hex : "transparent"}`, opacity: on ? 1 : 0.35 }}>
                <CheckDot p={on ? Math.min(1, p) : 0} size={42} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 30, color: C.ink, letterSpacing: "-0.01em" }}>{r.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 24, color: C.inkMuted }}>{r.sub}</div>
                </div>
                {r.tag && on ? <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: r.tag === "A CONFERIR" ? "#9A6A00" : C.inkMuted, padding: "4px 8px", borderRadius: 8, background: r.tag === "A CONFERIR" ? "#F5E7C2" : "#E2DED4" }}>{r.tag}</span> : null}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1230, display: "flex", justifyContent: "center", opacity: prog(t, c.g_comb - 0.2, 0.4, ease.out), transform: `scale(${mix(0.6, 1, prog(t, c.g_comb - 0.2, 0.4, ease.out))})` }}>
          <Tag text="PLANO VISÍVEL" tone="accent" size={32} style={{ boxShadow: `0 0 26px ${brandAlpha(0.4)}` }} />
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PROFISSIONAL <span style={{ color: BRAND.hex }}>B</span> · PLANO
      </div>
    </div>
  );
};
