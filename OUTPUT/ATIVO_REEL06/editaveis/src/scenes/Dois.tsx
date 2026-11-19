import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { FileTile, People, Rule, Tag } from "./ui";

/**
 * CENA 3 — 2. NÃO ATUALIZE NADA (irônico). "Agora faça o mesmo com os leads." → 04 LEADS. "Uma parte no WhatsApp, outra no bloco de notas,
 * outra só na cabeça." → três destinos: CONVERSA (genérica, sem marca), BLOCO DE NOTAS e um balão de pensamento. "E quando a visita mudar de
 * horário, não atualize ninguém." → 05 VISITAS: duas agendas desencontradas (horários genéricos). "O caos fica completo." → 06 RETORNOS:
 * alertas se acumulam e tudo treme (pausa cômica).
 */
export const Dois: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.d_agora - 0.35, { damping: 15, stiffness: 150 });
  const r = [c.d_leads, c.d_visita, c.d_caos].map((x) => sp(t, x - 0.25, { damping: 13, stiffness: 190 }));
  const places = [c.d_whats, c.d_bloco, c.d_cabeca].map((x) => sp(t, x - 0.1, { damping: 12, stiffness: 210 }));
  const cal = sp(t, c.d_hor - 0.2, { damping: 12, stiffness: 200 });
  const miss = sp(t, c.d_naoat, { damping: 11, stiffness: 220 });
  const chaos = prog(t, c.d_caos - 0.1, 0.5, ease.out);
  const shake = chaos * (1 - prog(t, c.v_brinc - 0.6, 0.4, ease.in));
  const out = prog(t, c.v_brinc - 0.45, 0.4, ease.in);
  const jx = Math.sin(t * 40) * 8 * shake;
  const jy = Math.cos(t * 37) * 6 * shake;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_agora - 0.35, s: 1.04, y: -20 },
          { t: c.d_whats + 0.2, s: 1.04, x: -15, y: 0, e: ease.inOut },
          { t: c.d_cabeca + 0.2, s: 1.04, x: 15, y: 0, e: ease.inOut },
          { t: c.d_hor + 0.3, s: 1.04, x: 0, y: 0, e: ease.inOut },
          { t: c.d_caos + 0.3, s: 1.0, y: 0, e: ease.out },
          { t: c.v_brinc, s: 1.02, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, transform: `translate(${jx}px, ${jy}px)` }}>
          <div style={{ position: "absolute", left: 100, right: 100, top: 410, display: "flex", flexDirection: "column", gap: 14 }}>
            <Rule n="04" text="Leads em três lugares" p={r[0]} done={prog(t, c.d_cabeca + 0.3, 0.2, ease.out)} />
            <Rule n="05" text="Visita mudou? Não avise" p={r[1]} done={prog(t, c.d_naoat + 0.4, 0.2, ease.out)} />
            <Rule n="06" text="Retornos no improviso" p={r[2]} done={prog(t, c.d_caos + 0.3, 0.2, ease.out)} />
          </div>
          {/* três lugares */}
          <div style={{ position: "absolute", left: 100, right: 100, top: 720, display: "flex", justifyContent: "space-between", opacity: 1 - cal * 0.85 }}>
            {[0, 1, 2].map((i) => {
              const p = places[i];
              return (
                <div key={i} style={{ width: 260, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 60}px) rotate(${(i - 1) * 4}deg)` }}>
                  {i === 0 ? <FileTile kind="chat" w={200} /> : i === 1 ? <FileTile kind="nota" w={200} /> : (
                    <div style={{ width: 200, height: 200, borderRadius: 100, background: C.surface2, border: `2px dashed ${C.muted}`, display: "flex", alignItems: "center", justifyContent: "center" }}><People n={1} size={110} color={C.muted} /></div>
                  )}
                  <Tag text={["CONVERSA", "BLOCO DE NOTAS", "SÓ NA CABEÇA"][i]} tone="muted" size={24} style={{ color: C.text }} />
                </div>
              );
            })}
          </div>
          {/* agendas desencontradas */}
          {cal > 0.001 ? (
            <div style={{ position: "absolute", left: 100, right: 100, top: 720, display: "flex", justifyContent: "space-between", opacity: Math.min(1, cal * 1.5) }}>
              {[0, 1].map((i) => (
                <div key={i} style={{ width: 410, boxSizing: "border-box", padding: "20px 24px", borderRadius: 28, background: C.surface, border: `3px solid ${i && miss > 0.5 ? C.warn : C.line}`, transform: `rotate(${(i ? 3 : -3) + Math.sin(t * 2 + i) * 1}deg)` }}>
                  <Tag text={i ? "AGENDA DO CLIENTE" : "SUA AGENDA"} tone="muted" size={22} style={{ color: C.text }} />
                  <div style={{ fontWeight: 800, fontSize: 40, color: C.text, marginTop: 14 }}>Visita</div>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 56, color: i && miss > 0.5 ? C.warn : C.text }}>{i ? (miss > 0.5 ? "16h ?" : "15h") : "15h"}</div>
                </div>
              ))}
            </div>
          ) : null}
          {miss > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: Math.min(1, miss * 1.5), transform: `scale(${mix(1.6, 1, Math.min(1, miss))}) rotate(-3deg)` }}><Tag text="NINGUÉM ATUALIZOU" tone="warn" size={32} /></div> : null}
          {/* caos */}
          {chaos > 0.001
            ? Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", left: 120 + rnd(i * 3 + 9) * 640, top: 1060 + rnd(i * 5 + 4) * 160, opacity: prog(chaos, i * 0.1, 0.3, ease.out), transform: `rotate(${(rnd(i) - 0.5) * 20}deg)` }}>
                  <Tag text={["RETORNO?", "QUEM ERA?", "QUE HORAS?", "QUAL IMÓVEL?", "RETORNO?", "CADÊ?", "QUAL VALOR?"][i]} tone="warn" size={24} />
                </div>
              ))
            : null}
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        2. <span style={{ color: C.warn }}>NÃO ATUALIZE NADA</span>
      </div>
    </div>
  );
};
