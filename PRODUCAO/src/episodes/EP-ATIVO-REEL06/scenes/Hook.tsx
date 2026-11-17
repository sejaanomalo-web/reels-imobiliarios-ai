import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Piece, Tag } from "./ui";

/**
 * CENA 1 — GANCHO (humor irônico). "Quer fazer sua carteira imobiliária virar um quebra-cabeça?" → peças FOTO, METRAGEM, VALOR, LEAD,
 * VISITA, RETORNO flutuando soltas desde o quadro 0; no "quebra-cabeça" elas se espalham. "É simples." → pausa cômica. "Siga este manual." →
 * capa do MANUAL PARA PERDER O CONTROLE DA CARTEIRA (com selo IRONIA).
 */
const PIECES = ["FOTO", "METRAGEM", "VALOR", "LEAD", "VISITA", "RETORNO"];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const scatter = prog(t, c.h_quebra - 0.1, 0.8, ease.out);
  const book = sp(t, c.h_manual - 0.25, { damping: 12, stiffness: 160 });
  const simple = sp(t, c.h_simples - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, c.u_fotos - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.08, x: -20, y: -30 },
          { t: c.h_cart, s: 1.04, x: 20, y: -10, e: ease.inOut },
          { t: c.h_quebra + 0.4, s: 0.98, x: 0, y: 10, e: ease.out },
          { t: c.h_manual + 0.4, s: 1.04, y: 20, e: ease.inOut },
          { t: c.u_fotos, s: 1.06, y: 30, e: ease.linear },
        ]}
      >
        {PIECES.map((k, i) => {
          const a = (i / PIECES.length) * Math.PI * 2;
          const cx = 540 + Math.cos(a) * 200;
          const cy = 840 + Math.sin(a) * 200;
          const fx = 540 + Math.cos(a + rnd(i) * 1.2) * mix(200, 400, scatter) + (rnd(i + 5) - 0.5) * 120 * scatter;
          const fy = Math.max(520, 840 + Math.sin(a + rnd(i) * 1.2) * mix(200, 380, scatter));
          const x = mix(cx, fx, scatter) - 100;
          const y = mix(cy, fy, scatter) - 100 + Math.sin(t * 2 + i) * 10;
          return (
            <div key={k} style={{ position: "absolute", left: x, top: y, transform: `rotate(${Math.sin(t * 1.5 + i) * 8 + scatter * (rnd(i + 2) - 0.5) * 60}deg)`, opacity: 1 - book * 0.55 }}>
              <Piece size={200} label={k} color={i % 2 ? C.surface2 : C.surface3} />
            </div>
          );
        })}
        {simple > 0.001 && book < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 790, textAlign: "center", fontWeight: 800, fontSize: 92, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, simple * 1.5) * (1 - book * 2), transform: `scale(${mix(1.4, 1, Math.min(1, simple))})` }}>
            É SIMPLES.
          </div>
        ) : null}
        {book > 0.001 ? (
          <div style={{ position: "absolute", left: 230, top: 560, width: 620, height: 660, boxSizing: "border-box", borderRadius: "16px 30px 30px 16px", background: "#1A1F27", borderLeft: `22px solid ${C.warn}`, boxShadow: "0 40px 100px rgba(0,0,0,0.7)", padding: "50px 44px", opacity: Math.min(1, book * 1.5), transform: `translateY(${(1 - Math.min(1, book)) * 300}px) rotate(${mix(-12, -3, Math.min(1, book)) + Math.sin(t * 1.4) * 1}deg)`, zIndex: 5 }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em", color: C.warn }}>MANUAL</div>
            <div style={{ fontWeight: 800, fontSize: 74, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text, marginTop: 20 }}>Para perder o controle da carteira</div>
            <div style={{ position: "absolute", left: 44, bottom: 44 }}><Tag text="IRONIA · NÃO SIGA" tone="warn" size={26} /></div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
        SUA CARTEIRA VIRA UM<br /><span style={{ color: BRAND.hex, whiteSpace: "nowrap" }}>QUEBRA-CABEÇA?</span>
      </div>
    </div>
  );
};
