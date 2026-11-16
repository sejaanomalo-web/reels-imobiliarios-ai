import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconDoc, Msg, Plan, Tag } from "./ui";

/**
 * CENA 3 — ATENDIMENTO B (EXEMPLO ILUSTRATIVO). "No segundo, o profissional explica pontos verificáveis:" → quatro painéis, um por item
 * da fala: planta abstrata (distribuição dos cômodos), ficha do condomínio (regras — "CONSULTAR"), checklist ANTES DA PROPOSTA (itens
 * "A CONFERIR", nada dado como já verificado) e PONTOS DE ATENÇÃO (o que pode limitar ESTE comprador). "Até as dúvidas desconfortáveis
 * entram na conversa." → balão do corretor B puxando o assunto difícil.
 */
type P = { k: string; x: number; y: number; warn?: boolean };
const PANELS: P[] = [
  { k: "DISTRIBUIÇÃO DOS CÔMODOS", x: 70, y: 400 },
  { k: "REGRAS DO CONDOMÍNIO", x: 580, y: 400 },
  { k: "ANTES DA PROPOSTA", x: 70, y: 760 },
  { k: "PONTOS DE ATENÇÃO", x: 580, y: 760, warn: true },
];
const W = 430;
const H = 330;

export const AtendB: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.b_dist, c.b_regras, c.b_conf, c.b_carac];
  const focus = at.reduce((a, x, i) => (t >= x - 0.2 ? i : a), -1);
  const enter = sp(t, c.b_seg - 0.35, { damping: 15, stiffness: 150 });
  const verif = sp(t, c.b_verif - 0.1, { damping: 11, stiffness: 220 });
  const lim = sp(t, c.b_lim - 0.05, { damping: 10, stiffness: 230 });
  const msg = sp(t, c.b_ate - 0.2, { damping: 13, stiffness: 190 });
  const desc = sp(t, c.b_desc + 0.1, { damping: 10, stiffness: 220 });
  const out = prog(t, c.d_dois - 0.45, 0.4, ease.in);
  // câmera: aproxima de cada painel na sua vez, depois abre
  const k = (i: number, tt: number) => ({ t: tt, s: 1.12, x: (PANELS[i].x + W / 2 - 540) * 0.6, y: (PANELS[i].y + H / 2 - 960) * 0.6 + 60, e: ease.inOut });

  const body = (i: number) => {
    const p = prog(t, at[i] + 0.1, 0.9, ease.out);
    if (i === 0) return <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}><Plan size={300} p={p} /></div>;
    const rows = i === 1 ? ["Mudanças e obras", "Animais", "Áreas comuns"] : i === 2 ? ["Documentação", "Custos mensais", "Condições"] : ["Trajeto da sua rotina", "Barulho e horários"];
    const tag = i === 1 ? "CONSULTAR" : i === 2 ? "A CONFERIR" : "PARA VOCÊ?";
    return (
      <div style={{ marginTop: 10 }}>
        {rows.map((r, j) => {
          const a = prog(t, at[i] + 0.15 + j * 0.25, 0.35, ease.out);
          return (
            <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: j < rows.length - 1 ? `1px solid ${C.lineSoft}` : "none", opacity: a, transform: `translateX(${(1 - a) * 30}px)` }}>
              <span style={{ fontWeight: 700, fontSize: 28, color: C.text }}>{r}</span>
              <Tag text={tag} tone={i === 3 ? "warn" : "muted"} size={18} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.b_seg - 0.35, s: 0.95, y: 0 },
          { t: c.b_verif + 0.3, s: 1.0, y: 0, e: ease.inOut },
          k(0, c.b_dist + 0.4),
          k(1, c.b_regras + 0.4),
          k(2, c.b_conf + 0.4),
          k(3, c.b_carac + 0.4),
          { t: c.b_ate + 0.3, s: 0.98, x: 0, y: 40, e: ease.inOut },
          { t: c.d_dois, s: 1.0, x: 0, y: 40, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14 }}>
          <Tag text="ATENDIMENTO B" tone="accent" size={30} />
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
        </div>
        {verif > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 345, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: C.accent, opacity: Math.min(1, verif * 1.5) }}>PONTOS VERIFICÁVEIS</div>
        ) : null}
        {PANELS.map((pn, i) => {
          const a = sp(t, Math.min(at[i] - 0.2, c.b_seg + 0.15 + i * 0.14), { damping: 14, stiffness: 190 });
          const filled = prog(t, at[i] - 0.25, 0.3, ease.out);
          if (a <= 0.001) return null;
          const on = focus === i && t < c.b_ate;
          const col = pn.warn ? C.warn : BRAND.hex;
          return (
            <div key={pn.k} style={{ position: "absolute", left: pn.x, top: pn.y, width: W, height: H, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `3px solid ${on || (pn.warn && lim > 0.5) ? col : C.line}`, boxShadow: on ? `0 0 34px ${pn.warn ? "rgba(255,107,94,0.25)" : brandAlpha(0.22)}` : "0 24px 60px rgba(0,0,0,0.5)", padding: "20px 22px", opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 80}px) scale(${mix(0.85, 1, Math.min(1, a))})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {i === 2 ? <IconDoc size={34} color={C.muted} /> : null}
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.04em", color: pn.warn ? C.warn : C.muted }}>{pn.k}</span>
              </div>
              <div style={{ opacity: filled }}>{body(i)}</div>
              {filled < 1 ? <div style={{ position: "absolute", left: 22, right: 22, top: 80, bottom: 26, borderRadius: 18, border: `2px dashed ${C.line}`, opacity: 1 - filled }} /> : null}
              {pn.warn && lim > 0.01 ? (
                <div style={{ position: "absolute", left: 22, right: 22, bottom: 18, opacity: Math.min(1, lim * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, lim))})`, transformOrigin: "0 50%" }}>
                  <Tag text="PODE SER UMA LIMITAÇÃO" tone="warn" size={22} />
                </div>
              ) : null}
            </div>
          );
        })}
        {msg > 0.001 ? (
          <div style={{ position: "absolute", right: 70, top: 1120, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, opacity: Math.min(1, msg * 1.5), transform: `translateY(${(1 - Math.min(1, msg)) * 60}px)` }}>
            <Msg side="out" tone="good" size={40} style={{ maxWidth: 820 }}>Tem um ponto que pode não funcionar para você.</Msg>
            {desc > 0.01 ? <Tag text="DÚVIDAS DESCONFORTÁVEIS TAMBÉM" tone="accent" size={24} style={{ transform: `scale(${mix(0.5, 1, Math.min(1.08, desc))})` }} /> : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
