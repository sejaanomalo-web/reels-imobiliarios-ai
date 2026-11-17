import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Folder, Tag } from "./ui";

/**
 * CENA 1 — GANCHO (tom irônico). "Quer transformar a comissão de um imóvel numa novela tributária?" → selo TOM IRÔNICO; pasta COMISSÃO
 * (valor oculto) desde o quadro 0; cartela de novela "NOVELA TRIBUTÁRIA — CAPÍTULO 1". "Então deixa todos os documentos para resolver
 * depois." → bilhete RESOLVO DEPOIS colado na pasta, que treme. Sem alíquotas nem valores.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const folder = sp(t, 0, { damping: 12, stiffness: 140 });
  const nov = sp(t, c.h_nov - 0.2, { damping: 12, stiffness: 180 });
  const note = sp(t, c.h_dep - 0.3, { damping: 10, stiffness: 220 });
  const shake = prog(t, c.h_dep, 0.8, ease.out);
  const out = prog(t, c.i_fech - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: -20 },
          { t: ((0) + (c.h_com + 0.2)) / 2, s: 1.125, x: 12, y: -18, e: ease.inOut },
          { t: c.h_com + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: ((c.h_com + 0.2) + (c.h_nov + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.h_nov + 0.3, s: 1.09, x: 15, y: -20, e: ease.inOut },
          { t: ((c.h_nov + 0.3) + (c.h_doc + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.h_doc + 0.2, s: 1.04, x: 0, y: -5, e: ease.inOut },
          { t: ((c.h_doc + 0.2) + (c.h_dep + 0.3)) / 2, s: 1.125, x: -12, y: -18, e: ease.inOut },
          { t: c.h_dep + 0.3, s: 1.1, x: 0, y: -25, e: ease.inOut },
          { t: c.i_fech, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}><Tag text="TOM IRÔNICO" tone="warn" size={28} /></div>
        <div style={{ position: "absolute", left: 300, top: 560, opacity: Math.min(1, folder * 1.5), transform: `translateY(${(1 - Math.min(1, folder)) * 120 + Math.sin(t * 1.6) * 8}px) rotate(${Math.sin(t * 24) * 3 * shake * (1 - prog(t, c.h_dep + 1.2, 0.5, ease.out))}deg)` }}>
          <Folder w={480} label={"COMISSÃO\nR$ ••••"} />
        </div>
        {nov > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 950, boxSizing: "border-box", padding: "22px 26px", borderRadius: 18, background: C.bg1, border: `3px solid ${C.warn}`, textAlign: "center", opacity: Math.min(1, nov * 1.5), transform: `scale(${mix(1.4, 1, Math.min(1, nov))}) rotate(-2deg)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>CAPÍTULO 1</div>
            <div style={{ fontWeight: 800, fontSize: 56, letterSpacing: "-0.02em", color: C.text, fontStyle: "italic" }}>Novela <span style={{ color: C.warn }}>Tributária</span></div>
          </div>
        ) : null}
        {note > 0.001 ? (
          <div style={{ position: "absolute", left: 600, top: 540, width: 240, padding: "20px 18px", background: C.paper, border: `4px solid ${C.warn}`, color: C.ink, fontWeight: 800, fontSize: 34, lineHeight: 1.05, textAlign: "center", opacity: Math.min(1, note * 1.5), transform: `rotate(${8 + Math.sin(t * 3) * 2}deg) scale(${mix(1.8, 1, Math.min(1, note))})`, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>RESOLVO DEPOIS</div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text }}>
        COMO COMPLICAR <span style={{ color: C.warn }}>IMPOSTOS</span>
      </div>
    </div>
  );
};
