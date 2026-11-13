import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { INITIALS, Mark, TEAM, Tag } from "./ui";

/**
 * CENA 04 — INSIGHT. "Antes de aumentar a operação, documente as etapas de atendimento, atualização de imóveis e passagem
 * de oportunidades. Depois adapte a ferramenta ao processo."
 * Os fios se reorganizam em três trilhas documentadas (etapas em fichas), e cada avatar encontra a sua trilha. Em "Depois",
 * a moldura da ferramenta se ajusta em volta do processo — e não o contrário.
 */
const TRACKS = [
  { k: "ATENDIMENTO", cue: "ins_t1", steps: ["1º contato", "entender a busca", "próximo passo"], who: [0, 1, 2] },
  { k: "ATUALIZAÇÃO DE IMÓVEIS", cue: "ins_t2", steps: ["preço", "status", "fotos"], who: [3, 4] },
  { k: "PASSAGEM DE OPORTUNIDADES", cue: "ins_t3", steps: ["quem passa", "o que registrar", "quem recebe"], who: [5, 6, 7] },
];
const TY = [440, 700, 960];

export const Tracks: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.ins_before, { damping: 15, stiffness: 160 });
  const doc = sp(t, c.ins_doc - 0.05, { damping: 13, stiffness: 180 });
  const frame = prog(t, c.ins_after + 0.2, 0.9, ease.inOut);
  const fitTag = sp(t, c.ins_after + 0.75, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.cta_doc + 0.05, 0.4, ease.in);
  // moldura da ferramenta: começa larga e torta, se ajusta ao processo
  const fx = mix(10, 50, frame);
  const fy = mix(300, 400, frame);
  const fw = mix(1060, 980, frame);
  const fh = mix(1000, 790, frame);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_before, s: 0.94, y: 0, rx: 8 },
          { t: c.ins_t1 + 0.3, s: 1.04, y: -40, rx: 0, e: ease.inOut },
          { t: c.ins_t3 + 0.5, s: 1.04, y: 60, e: ease.inOut },
          { t: c.ins_proc + 0.4, s: 0.98, y: 20, e: ease.inOut },
          { t: c.cta_doc + 0.3, s: 0.94, y: 20, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: Math.min(1, head * 1.5) * (1 - prog(t, c.ins_after - 0.2, 0.3, ease.in)) }}>
          <Tag text={doc > 0.5 ? "DOCUMENTE AS ETAPAS" : "ANTES DE CRESCER"} tone="accent" size={30} />
        </div>
        {TRACKS.map((tr, i) => {
          const p = sp(t, c[tr.cue] - 0.15, { damping: 14, stiffness: 160 });
          const line = prog(t, c[tr.cue] - 0.1, 0.7, ease.inOut);
          const ghost = prog(t, c.ins_before + 0.2 + i * 0.25, 0.4, ease.out);
          return (
            <div key={tr.k} style={{ position: "absolute", left: 70, top: TY[i], width: 940, height: 220, opacity: Math.max(ghost * 0.45, Math.min(1, p * 1.5)) }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.08em", color: C.accent }}>{tr.k}</div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 120, height: 0, borderTop: "4px dashed rgba(53,224,161,0.35)" }} />
              {/* trilha */}
              <div style={{ position: "absolute", left: 0, top: 120, height: 6, width: `${line * 100}%`, borderRadius: 3, background: C.accent, boxShadow: "0 0 18px rgba(53,224,161,0.5)" }} />
              {tr.steps.map((s, k) => {
                const sp2 = sp(t, c[tr.cue] + 0.1 + k * 0.18, { damping: 12, stiffness: 200 });
                return (
                  <div key={s} style={{ position: "absolute", left: 40 + k * 300, top: 52, width: 250, height: 70, boxSizing: "border-box", borderRadius: 18, background: C.surface, border: "2px solid rgba(53,224,161,0.45)", display: "flex", alignItems: "center", gap: 10, padding: "0 14px", opacity: Math.min(1, sp2 * 1.5), transform: `translateY(${(1 - Math.min(1, sp2)) * 30}px)` }}>
                    <Mark ok size={30} />
                    <span style={{ fontWeight: 800, fontSize: 26, color: C.text, whiteSpace: "nowrap" }}>{s}</span>
                  </div>
                );
              })}
              {/* cada avatar encontra o seu fluxo */}
              {tr.who.map((w, k) => {
                const a = sp(t, c[tr.cue] + 0.35 + k * 0.12, { damping: 13, stiffness: 180 });
                return (
                  <div key={w} style={{ position: "absolute", left: mix(470, 80 + k * 120, Math.min(1, a)), top: mix(-200, 138, Math.min(1, a)), opacity: Math.min(1, a * 2) }}>
                    <Avatar size={64} label={INITIALS[w]} bg={TEAM[w]} />
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* a ferramenta se adapta ao processo */}
        {frame > 0 ? (
          <>
            <div style={{ position: "absolute", left: fx, top: fy, width: fw, height: fh, boxSizing: "border-box", borderRadius: 40, border: `4px ${frame > 0.95 ? "solid" : "dashed"} ${C.cold}`, opacity: Math.min(1, frame * 2), transform: `rotate(${mix(-4, 0, frame)}deg)` }} />
            <div style={{ position: "absolute", left: fx + 30, top: fy - 26, padding: "8px 16px", borderRadius: 16, background: C.bg1, border: `2px solid ${C.cold}`, fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.08em", color: C.cold, opacity: Math.min(1, frame * 2) }}>FERRAMENTA</div>
          </>
        ) : null}
        {fitTag > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1210, display: "flex", justifyContent: "center", opacity: Math.min(1, fitTag * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, fitTag))})` }}>
            <div style={{ padding: "14px 30px", borderRadius: 28, background: C.surface2, border: `2px solid ${C.accent}`, fontWeight: 800, fontSize: 36, color: C.text }}>
              primeiro o <span style={{ color: C.accent }}>processo</span>, depois a <span style={{ color: C.cold }}>ferramenta</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
