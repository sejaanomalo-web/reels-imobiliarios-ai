import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Folder } from "./ui";

/**
 * CENA 3 — A REALIDADE. "Agora falando sério: forma de recebimento, divisão de comissões, emissão de documentos e possíveis tributos
 * dependem da situação de cada profissional e das regras aplicáveis." → a trilha cala; fundo claro (papel) com quatro pastas, uma por item
 * da fala; DEPENDE DA SITUAÇÃO · REGRAS APLICÁVEIS. "Não é assunto para resolver com uma dica viral de trinta segundos." → cartão DICA
 * VIRAL riscado. Texto-chave: CADA CASO EXIGE ANÁLISE. Nenhuma alíquota, valor ou regra citada.
 */
const FOLDERS = ["RECEBIMENTO", "DIVISÃO DE\nCOMISSÕES", "EMISSÃO DE\nDOCUMENTOS", "POSSÍVEIS\nTRIBUTOS"];

export const Real: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.r_serio - 0.4, { damping: 15, stiffness: 140 });
  const f = [c.r_receb, c.r_div, c.r_emis, c.r_trib].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const dep = sp(t, c.r_dep - 0.1, { damping: 12, stiffness: 190 });
  const reg = sp(t, c.r_regras - 0.1, { damping: 12, stiffness: 190 });
  const viral = sp(t, c.r_dica - 0.3, { damping: 11, stiffness: 210 });
  const strike = prog(t, c.r_trinta + 0.2, 0.4, ease.out);
  const out = prog(t, c.c_uma - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.r_serio - 0.4, s: 1.0, y: 0 },
          { t: ((c.r_serio - 0.4) + (c.r_receb + 0.2)) / 2, s: 1.085, x: 12, y: -18, e: ease.inOut },
          { t: c.r_receb + 0.2, s: 1.06, x: -15, y: -10, e: ease.inOut },
          { t: ((c.r_receb + 0.2) + (c.r_div + 0.2)) / 2, s: 1.085, x: -12, y: -18, e: ease.inOut },
          { t: c.r_div + 0.2, s: 1.04, x: 15, y: -10, e: ease.inOut },
          { t: ((c.r_div + 0.2) + (c.r_emis + 0.2)) / 2, s: 1.085, x: 12, y: -18, e: ease.inOut },
          { t: c.r_emis + 0.2, s: 1.06, x: -15, y: -15, e: ease.inOut },
          { t: ((c.r_emis + 0.2) + (c.r_trib + 0.2)) / 2, s: 1.085, x: -12, y: -18, e: ease.inOut },
          { t: c.r_trib + 0.2, s: 1.04, x: 15, y: -15, e: ease.inOut },
          { t: ((c.r_trib + 0.2) + (c.r_regras + 0.3)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.r_regras + 0.3, s: 1.07, x: 0, y: -15, e: ease.inOut },
          { t: ((c.r_regras + 0.3) + (c.r_dica + 0.3)) / 2, s: 1.095, x: -12, y: -18, e: ease.inOut },
          { t: c.r_dica + 0.3, s: 1.04, x: 0, y: -5, e: ease.inOut },
          { t: c.c_uma, s: 1.07, y: -15, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 70, right: 70, top: 400, height: 860, borderRadius: 40, background: C.paper, transform: `scale(${mix(0.92, 1, Math.min(1, enter))})` }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.inkMuted }}>FALANDO SÉRIO</div>
        {FOLDERS.map((k, i) => (f[i] > 0.001 ? (
          <div key={k} style={{ position: "absolute", left: 150 + (i % 2) * 420, top: 500 + Math.floor(i / 2) * 250, opacity: Math.min(1, f[i] * 1.5), transform: `translateY(${(1 - Math.min(1, f[i])) * 60 + Math.sin(t * 1.8 + i) * 5}px) scale(${mix(0.7, 1, Math.min(1.05, f[i]))})` }}>
            <Folder w={340} label={k} tone="good" />
          </div>
        ) : null))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", gap: 14 }}>
          {dep > 0.001 ? <span style={{ opacity: Math.min(1, dep * 1.5), padding: "10px 18px", borderRadius: 16, background: C.ink, color: C.paper, fontFamily: F.mono, fontWeight: 700, fontSize: 26 }}>DEPENDE DA SITUAÇÃO</span> : null}
          {reg > 0.001 ? <span style={{ opacity: Math.min(1, reg * 1.5), padding: "10px 18px", borderRadius: 16, background: C.ink, color: C.paper, fontFamily: F.mono, fontWeight: 700, fontSize: 26 }}>REGRAS APLICÁVEIS</span> : null}
        </div>
        {viral > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1090, display: "flex", justifyContent: "center", opacity: Math.min(1, viral * 1.5) }}>
            <div style={{ position: "relative", padding: "16px 30px", borderRadius: 20, background: "#E2DED4", fontWeight: 800, fontSize: 40, color: C.ink, transform: `rotate(-2deg) scale(${mix(0.6, 1, Math.min(1.06, viral))})` }}>
              DICA VIRAL DE 30 SEGUNDOS
              <div style={{ position: "absolute", left: 16, right: 16, top: "50%", height: 8, borderRadius: 4, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike})` }} />
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        CADA CASO <span style={{ color: BRAND.hex }}>EXIGE ANÁLISE</span>
      </div>
    </div>
  );
};
