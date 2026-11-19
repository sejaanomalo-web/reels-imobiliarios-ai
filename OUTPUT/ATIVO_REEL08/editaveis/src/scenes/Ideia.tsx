import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 4 — A IDEIA. "O resultado de uma venda não está só na comissão recebida." → dois percursos lado a lado, cada um com a mesma
 * VENDA (comissão mascarada); depois dela, A volta ao início (DO ZERO) e B segue. "Também pode estar na base de contatos, no conhecimento do
 * público e na estrutura que você constrói para trabalhar melhor na próxima negociação." → sob o percurso B empilham-se BASE DE CONTATOS,
 * CONHECIMENTO DO PÚBLICO e ESTRUTURA; a seta chega à PRÓXIMA NEGOCIAÇÃO. Sem valores, eixos ou projeções. CONSTRUA CONTINUIDADE.
 */
const BLOCKS = ["BASE DE CONTATOS", "CONHECIMENTO DO PÚBLICO", "ESTRUTURA"];

export const Ideia: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.i_res - 0.35, { damping: 15, stiffness: 150 });
  const sale = sp(t, c.i_res + 0.2, { damping: 12, stiffness: 190 });
  const nao = sp(t, c.i_nao - 0.1, { damping: 12, stiffness: 200 });
  const plus = sp(t, c.i_com + 0.6, { damping: 12, stiffness: 200 });
  const goA = prog(t, c.i_nao, 1.2, ease.inOut);
  const goB = prog(t, c.i_base - 0.3, c.i_prox - c.i_base + 0.6, ease.inOut);
  const blocks = [c.i_base, c.i_conh, c.i_estr].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const next = sp(t, c.i_prox - 0.1, { damping: 12, stiffness: 190 });
  const key = sp(t, c.i_prox + 0.6, { damping: 13, stiffness: 180 });
  const out = prog(t, c.r_no - 0.45, 0.4, ease.in);
  const lane = (y: number, who: "A" | "B", go: number) => {
    const good = who === "B";
    const col = good ? BRAND.hex : C.muted;
    return (
      <div style={{ position: "absolute", left: 110, right: 150, top: y }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <Tag text={`CAMINHO ${who}`} tone={good ? "accent" : "muted"} size={26} style={good ? {} : { color: C.text }} />
        </div>
        <div style={{ position: "relative", height: 16, borderRadius: 8, background: C.surface3 }}>
          <div style={{ position: "absolute", left: 0, width: `${good ? mix(32, 100, go) : mix(32, 0, go)}%`, height: "100%", borderRadius: 8, background: col, opacity: good ? 1 : mix(1, 0.4, go), boxShadow: good ? `0 0 18px ${brandAlpha(0.4)}` : "none" }} />
          {/* venda */}
          <div style={{ position: "absolute", left: "30%", top: -46, opacity: Math.min(1, sale * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, sale))})` }}>
            <div style={{ width: 108, height: 108, borderRadius: 54, background: C.surface2, border: `4px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26, color: C.text }}>VENDA</div>
          </div>
          {!good && go > 0.6 ? <div style={{ position: "absolute", left: -6, top: 30, opacity: prog(go, 0.6, 0.4, ease.out) }}><Tag text="DO ZERO" tone="warn" size={24} /></div> : null}
          {good ? (
            <div style={{ position: "absolute", right: -20, top: -50, opacity: Math.min(1, next * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, next)) * (1 + 0.03 * Math.sin(t * 4))})`, transformOrigin: "100% 50%" }}>
              <div style={{ padding: "16px 20px", borderRadius: 22, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 26, lineHeight: 1.05, textAlign: "center", boxShadow: `0 0 30px ${brandAlpha(0.5)}` }}>PRÓXIMA<br />NEGOCIAÇÃO</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_res - 0.35, s: 1.04, y: 0 },
          { t: c.i_nao + 0.3, s: 1.06, x: -20, y: -10, e: ease.inOut },
          { t: c.i_com + 0.6, s: 1.03, x: 10, y: 0, e: ease.inOut },
          { t: c.i_base + 0.2, s: 1.05, x: -10, y: -10, e: ease.inOut },
          { t: c.i_conh + 0.2, s: 1.04, x: 15, y: -20, e: ease.inOut },
          { t: c.i_estr + 0.2, s: 1.06, x: -10, y: -20, e: ease.inOut },
          { t: c.i_prox + 0.3, s: 1.03, x: 20, y: 0, e: ease.inOut },
          { t: c.r_no, s: 1.05, x: 0, y: 0, e: ease.linear },
        ]}
      >
        {lane(440, "A", goA)}
        {lane(660, "B", goB)}
        {/* não está só na comissão */}
        {nao > 0.001 && blocks[0] < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: Math.min(1, nao * 1.5) * (1 - Math.min(1, blocks[0] * 2)) }}>
            <div style={{ padding: "18px 26px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, textAlign: "center" }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>COMISSÃO</div>
              <div style={{ fontWeight: 800, fontSize: 44, color: C.text }}>R$ ••••</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 90, color: BRAND.hex, opacity: Math.min(1, plus * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, plus))})` }}>+</div>
            <div style={{ width: 210, height: 120, borderRadius: 26, border: `4px dashed ${brandAlpha(0.7)}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 64, color: BRAND.hex, opacity: Math.min(1, plus * 1.5) }}>?</div>
          </div>
        ) : null}
        {/* o que se acumula no caminho B */}
        {BLOCKS.map((b, i) => {
          const a = blocks[i];
          if (a <= 0.001) return null;
          return (
            <div key={b} style={{ position: "absolute", left: 160, right: 160, top: 800 + i * 104, height: 88, boxSizing: "border-box", borderRadius: 22, background: i === 2 ? BRAND.deep : C.surface2, border: `2px solid ${brandAlpha(0.35 + 0.2 * i)}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 36, letterSpacing: "-0.01em", color: C.text, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * -90}px) scale(${mix(0.7, 1, Math.min(1.05, a))})` }}>
              {b}
            </div>
          );
        })}
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 60, right: 60, top: 1130, textAlign: "center", fontWeight: 800, fontSize: 66, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, key))})` }}>
            CONSTRUA <span style={{ color: BRAND.hex }}>CONTINUIDADE</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        NÃO É <span style={{ color: BRAND.hex }}>SÓ A COMISSÃO</span>
      </div>
    </div>
  );
};
