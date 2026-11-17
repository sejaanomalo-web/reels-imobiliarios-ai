import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, FileTile, Label, STEPS, Tag } from "./ui";

/**
 * CENA 4 — A VIRADA + TRANSIÇÃO. "Brincadeira à parte: isso acontece porque cada informação nasce num lugar diferente." → o manual é
 * descartado (BRINCADEIRA À PARTE); os arquivos soltos aparecem cada um num lugar. "O primeiro passo não é comprar uma ferramenta enorme." →
 * caixa FERRAMENTA ENORME riscada. "É decidir onde cada dado entra, quem atualiza e como você encontra depois." → os arquivos convergem em
 * três caixas REGISTRAR / ATUALIZAR / CONSULTAR. Título ORGANIZAÇÃO É PROCESSO. "Se você reconheceu pelo menos um desses hábitos, comece
 * revisando onde cada informação entra." (transição adaptada da CTA de salvar) → REVISÃO com o primeiro item marcado.
 */
const KINDS = ["imovel", "pdf", "chat", "nota", "pessoal", "imovel", "chat", "pdf", "nota"] as const;

export const Virada: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.v_brinc - 0.4, { damping: 15, stiffness: 150 });
  const stamp = sp(t, c.v_brinc - 0.2, { damping: 11, stiffness: 220 });
  const born = prog(t, c.v_nasce - 0.2, 0.8, ease.out);
  const big = sp(t, c.v_ferr - 0.2, { damping: 12, stiffness: 180 });
  const strike = prog(t, c.v_ferr + 0.5, 0.35, ease.out);
  const boxes = [c.v_onde, c.v_quem, c.v_como].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const conv = prog(t, c.v_onde - 0.1, 2.6, ease.inOut);
  const title = sp(t, c.v_onde - 0.2, { damping: 13, stiffness: 180 });
  const rev = sp(t, c.v_recon - 0.1, { damping: 13, stiffness: 180 });
  const ok = prog(t, c.v_entra - 0.2, 0.4, ease.out);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const BX = [100, 400, 700];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.v_brinc - 0.4, s: 1.06, y: -20 },
          { t: c.v_lugar + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.v_ferr + 0.3, s: 1.06, x: -20, y: 10, e: ease.inOut },
          { t: c.v_onde + 0.2, s: 1.04, x: -40, y: 40, e: ease.inOut },
          { t: c.v_quem + 0.2, s: 1.04, x: 0, y: 40, e: ease.inOut },
          { t: c.v_como + 0.2, s: 1.04, x: 40, y: 40, e: ease.inOut },
          { t: c.v_recon + 0.3, s: 1.0, x: 0, y: 60, e: ease.inOut },
          { t: c.cta_quer, s: 1.04, y: 60, e: ease.linear },
        ]}
      >
        {stamp > 0.001 && born < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", opacity: Math.min(1, stamp * 1.5) * (1 - born), transform: `rotate(-6deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, zIndex: 5 }}>
            <div style={{ padding: "18px 40px", border: `6px solid ${C.text}`, borderRadius: 20, fontWeight: 800, fontSize: 70, color: C.text, background: "rgba(7,8,10,0.85)" }}>BRINCADEIRA À PARTE</div>
          </div>
        ) : null}
        {/* arquivos nascem em lugares diferentes → convergem nas caixas */}
        {KINDS.map((k, i) => {
          const sx = 100 + rnd(i * 3 + 2) * 760;
          const sy = 430 + rnd(i * 5 + 7) * 420;
          const tx = BX[i % 3] + 80 + (Math.floor(i / 3) - 1) * 26;
          const ty = 922 + Math.floor(i / 3) * 6;
          const p = prog(conv, (i % 3) * 0.25, 0.5, ease.inOut);
          return (
            <div key={i} style={{ position: "absolute", left: mix(sx, tx, p), top: mix(sy, ty, p) + Math.sin(t * 2 + i) * 4 * (1 - p), opacity: prog(born, i * 0.06, 0.3, ease.out) * (1 - big * 0.6 * (1 - strike)), transform: `rotate(${(rnd(i * 7) - 0.5) * 30 * (1 - p)}deg) scale(${mix(1, 0.62, p)})`, transformOrigin: "0 0", zIndex: 2 }}>
              <FileTile kind={k} w={120} i={i} />
            </div>
          );
        })}
        {/* ferramenta enorme */}
        {big > 0.001 && conv < 0.2 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", opacity: Math.min(1, big * 1.5) * (1 - conv * 5), zIndex: 4 }}>
            <div style={{ position: "relative", width: 560, height: 360, borderRadius: 30, background: C.surface2, border: `3px solid ${C.muted}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transform: `scale(${mix(0.4, 1, Math.min(1.04, big))})` }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 50px)", gap: 8 }}>{Array.from({ length: 18 }).map((_, k) => <div key={k} style={{ width: 50, height: 30, borderRadius: 6, background: C.surface3 }} />)}</div>
              <Label size={30} color={C.text}>FERRAMENTA ENORME</Label>
              <div style={{ position: "absolute", left: 20, right: 20, top: "50%", height: 12, borderRadius: 6, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-8deg)` }} />
            </div>
          </div>
        ) : null}
        {/* três caixas */}
        {STEPS.map((s, i) => {
          const p = boxes[i];
          return (
            <div key={s.k} style={{ position: "absolute", left: BX[i], top: 900, width: 280, height: 300, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `3px ${p > 0.5 ? "solid" : "dashed"} ${p > 0.5 ? BRAND.hex : C.dim}`, padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 8, opacity: mix(0.3, 1, Math.min(1, p)) * prog(t, c.v_prim, 0.5, ease.out), boxShadow: p > 0.5 ? `0 0 30px ${brandAlpha(0.2)}` : "none", transform: `scale(${p > 0.5 ? 1 + 0.02 * Math.sin(t * 3 + i) : 1})` }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.04em", color: p > 0.5 ? C.text : C.dim }}>{s.k}</span>
              <span style={{ fontWeight: 700, fontSize: 24, textAlign: "center", color: C.muted, opacity: Math.min(1, p) }}>{s.sub}</span>
            </div>
          );
        })}
        {rev > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1220, display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderRadius: 22, background: C.surface2, border: `2px solid ${ok > 0.5 ? BRAND.hex : C.line}`, opacity: Math.min(1, rev * 1.5), transform: `translateY(${(1 - Math.min(1, rev)) * 40}px)`, zIndex: 6 }}>
            <CheckDot p={ok} size={44} />
            <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Revisar: onde cada informação entra</span>
          </div>
        ) : null}
      </Camera>
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
          ORGANIZAÇÃO É <span style={{ color: BRAND.hex }}>PROCESSO</span>
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", opacity: born * (1 - conv) }}>
        <Tag text="CADA INFORMAÇÃO NASCE NUM LUGAR" tone="muted" size={26} style={{ color: C.text }} />
      </div>
    </div>
  );
};
