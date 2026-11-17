import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, People, Pro, Question, SPECS, SpecCard, Tag } from "./ui";

/**
 * CENA 2 — A FICHA COMPLETA (cena ilustrativa). "Imagina um casal procurando dois quartos." → casal (sem rosto) + PROCURA 2 QUARTOS. "No
 * primeiro atendimento, o profissional começa a listar metragem, porcelanato, salão de festas e academia." → A empilha os cartões da ficha
 * no tempo da fala. "Está tudo correto." → ✓ CORRETO. "Mas ainda não sabe por que aquela família está procurando outro lugar." → "?" sobre
 * o casal: POR QUE ESTÃO SE MUDANDO? Texto-chave: INFORMAÇÃO CORRETA. CONTEXTO ERRADO.
 */
export const Fic: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.f_imag - 0.35, { damping: 15, stiffness: 150 });
  const couple = sp(t, c.f_casal - 0.2, { damping: 12, stiffness: 190 });
  const want = sp(t, c.f_dois - 0.1, { damping: 12, stiffness: 200 });
  const at = [c.f_metr, c.f_porc, c.f_salao, c.f_acad];
  const cards = at.map((x) => sp(t, x - 0.15, { damping: 11, stiffness: 210 }));
  const ok = sp(t, c.f_corr - 0.2, { damping: 12, stiffness: 200 });
  const why = sp(t, c.f_nao - 0.1, { damping: 12, stiffness: 190 });
  const out = prog(t, c.q_no - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.f_imag - 0.35, s: 1.05, y: 0 },
          { t: ((c.f_imag - 0.35) + (c.f_casal + 0.3)) / 2, s: 1.115, x: 4, y: -18, e: ease.inOut },
          { t: c.f_casal + 0.3, s: 1.09, x: 8, y: -15, e: ease.inOut },
          { t: ((c.f_casal + 0.3) + (c.f_listar + 0.2)) / 2, s: 1.115, x: -4, y: -18, e: ease.inOut },
          { t: c.f_listar + 0.2, s: 1.04, x: -4, y: -5, e: ease.inOut },
          { t: ((c.f_listar + 0.2) + (c.f_metr + 0.2)) / 2, s: 1.105, x: 4, y: -18, e: ease.inOut },
          { t: c.f_metr + 0.2, s: 1.08, x: -8, y: -15, e: ease.inOut },
          { t: ((c.f_metr + 0.2) + (c.f_salao + 0.2)) / 2, s: 1.105, x: -4, y: -18, e: ease.inOut },
          { t: c.f_salao + 0.2, s: 1.05, x: -4, y: -10, e: ease.inOut },
          { t: ((c.f_salao + 0.2) + (c.f_corr + 0.2)) / 2, s: 1.105, x: 4, y: -18, e: ease.inOut },
          { t: c.f_corr + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.f_corr + 0.2) + (c.f_nao + 0.3)) / 2, s: 1.105, x: -4, y: -18, e: ease.inOut },
          { t: c.f_nao + 0.3, s: 1.05, x: 8, y: -10, e: ease.inOut },
          { t: ((c.f_nao + 0.3) + (c.f_lugar + 0.3)) / 2, s: 1.115, x: 4, y: -18, e: ease.inOut },
          { t: c.f_lugar + 0.3, s: 1.09, x: 8, y: -20, e: ease.inOut },
          { t: c.q_no, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="CENA ILUSTRATIVA" tone="muted" size={24} style={{ color: C.text }} />
          <Tag text="1º ATENDIMENTO" tone="muted" size={24} />
        </div>
        {/* casal */}
        {couple > 0.001 ? (
          <div style={{ position: "absolute", left: 640, top: 500, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: Math.min(1, couple * 1.5), transform: `translateY(${(1 - Math.min(1, couple)) * 60 + Math.sin(t * 1.5) * 6}px)` }}>
            <div style={{ padding: "14px 22px 6px", borderRadius: 26, background: C.surface, border: `2px solid ${C.line}` }}><People n={2} size={120} /></div>
            {want > 0.001 ? <div style={{ opacity: Math.min(1, want * 1.5) }}><Chip text="PROCURA 2 QUARTOS" size={26} /></div> : null}
            {why > 0.001 ? <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 12, opacity: Math.min(1, why * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, why))})` }}><Question size={70} color={C.warn} ink="#fff" /><span style={{ fontWeight: 800, fontSize: 30, color: C.text, lineHeight: 1.05 }}>POR QUE<br />SE MUDAR?</span></div> : null}
          </div>
        ) : null}
        {/* A + ficha */}
        <div style={{ position: "absolute", left: 90, top: 470 }}><Pro who="A" size={130} /></div>
        {SPECS.map((s, i) => (cards[i] > 0.001 ? (
          <div key={s} style={{ position: "absolute", left: 90, top: 640 + i * 100, opacity: Math.min(1, cards[i] * 1.5), transform: `translateX(${(1 - Math.min(1, cards[i])) * -200}px) rotate(${(i % 2 ? 2 : -2) + Math.sin(t * 2.2 + i) * 1.2}deg)` }}><SpecCard text={s} w={430} /></div>
        ) : null))}
        {ok > 0.001 ? <div style={{ position: "absolute", left: 140, top: 1060, opacity: Math.min(1, ok * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, ok))})` }}><Chip text="TUDO CORRETO ✓" tone="good" size={30} /></div> : null}
        {t > c.f_mas - 0.2 ? (
          <div style={{ position: "absolute", left: 60, right: 60, top: 1150, textAlign: "center", fontWeight: 800, fontSize: 46, letterSpacing: "-0.02em", color: C.text, opacity: prog(t, c.f_mas - 0.1, 0.4, ease.out) }}>
            INFORMAÇÃO CORRETA. <span style={{ color: C.warn }}>CONTEXTO ERRADO.</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        PRIMEIRO, <span style={{ color: C.muted }}>A FICHA</span>
      </div>
    </div>
  );
};
