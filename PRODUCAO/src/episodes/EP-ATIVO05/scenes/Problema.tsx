import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card } from "./ui";

/**
 * CENA 2 — O PROBLEMA. Cada pergunta ("Quem apresenta…? Quem conduz…? Quem atualiza…? Como será tratada a participação…?") vira uma
 * tarefa do fluxograma com o responsável em branco e um alerta discreto. "Quando essas perguntas ficam para depois, até uma parceria
 * bem-intencionada pode terminar em conflito." → as lacunas piscam, a ligação entre A e B fica vermelha e treme.
 */
const TASKS = ["APRESENTAR O IMÓVEL", "CONDUZIR A NEGOCIAÇÃO", "ATUALIZAR O PROPRIETÁRIO", "PARTICIPAÇÃO DE CADA UM"];

export const Problema: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.p_apr, c.p_cond, c.p_atu, c.p_part];
  const rows = at.map((a) => sp(t, a - 0.25, { damping: 14, stiffness: 180 }));
  const later = prog(t, c.p_depois - 0.1, 0.5, ease.out);
  const conflict = prog(t, c.p_conf - 0.1, 0.4, ease.out);
  const out = prog(t, c.m_vez - 0.45, 0.4, ease.in);
  const shake = Math.sin(t * 36) * 6 * conflict;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_apr - 0.3, s: 1.05, y: -30 },
          { t: c.p_part + 0.4, s: 1.0, y: 20, e: ease.inOut },
          { t: c.p_conf + 0.3, s: 1.06, y: 10, r: 1, e: ease.inOut },
          { t: c.m_vez, s: 1.07, y: 10, r: 1, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 80, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.text, opacity: Math.min(1, rows[0] * 1.5) }}>
          QUEM FAZ <span style={{ color: later > 0.5 ? C.warn : BRAND.hex }}>O QUÊ?</span>
        </div>
        {/* espinha do fluxograma */}
        <div style={{ position: "absolute", left: 140, top: 520, width: 6, height: mix(0, 600, Math.min(1, rows[3])), borderRadius: 3, background: conflict > 0.3 ? C.warn : C.line }} />
        {TASKS.map((k, i) => {
          const p = rows[i];
          const blink = later > 0.3 ? 0.55 + 0.45 * Math.sin(t * 7 + i) : 1;
          return (
            <Card key={k} tone={later > 0.3 ? "warn" : "plain"} style={{ left: 110, top: 470 + i * 160, width: 860, height: 130, padding: "0 30px 0 70px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * 300 + (i % 2 ? shake : -shake)}px)` }}>
              <div style={{ position: "absolute", left: 20, top: 52, width: 26, height: 26, borderRadius: 13, background: conflict > 0.3 ? C.warn : BRAND.hex }} />
              <span style={{ fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text }}>{k}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: blink }}>
                <div style={{ width: 70, height: 70, borderRadius: 35, border: `3px dashed ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 38, color: C.warn }}>?</div>
              </div>
            </Card>
          );
        })}
        {later > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.1em", color: C.warn, opacity: later }}>
            {conflict > 0.5 ? "CONFLITO" : "FICOU PARA DEPOIS"}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
