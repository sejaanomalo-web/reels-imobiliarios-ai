import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 2 — A PRESSÃO REAL. Cada frase empilha um item do dia (negociação parada, visitas sem proposta, mensagens, documentação,
 * agenda), cada vez mais rápido e tremido. "Fingir que tudo isso não pesa…" → o adesivo TÁ TUDO ÓTIMO! cobre a pilha e congela;
 * "…só cria mais uma cobrança." → +1 COBRANÇA. Depois o movimento desacelera e os itens se alinham numa agenda organizada.
 */
type Item = { k: string; label: string; text: string; tag: string; tone: "warn" | "muted" };
const ITEMS: Item[] = [
  { k: "neg", label: "NEGOCIAÇÃO", text: "Apto Jardim", tag: "SEM AVANÇO", tone: "warn" },
  { k: "vis", label: "VISITAS DA SEMANA", text: "Casa · Apto · Sobrado", tag: "NENHUMA PROPOSTA", tone: "warn" },
  { k: "m1", label: "MENSAGEM", text: "“Alguma novidade?”", tag: "AGORA", tone: "muted" },
  { k: "m2", label: "MENSAGEM", text: "Novo contato do anúncio", tag: "AGORA", tone: "muted" },
  { k: "doc", label: "DOCUMENTAÇÃO", text: "Certidão pendente", tag: "PENDENTE", tone: "warn" },
  { k: "ag", label: "AGENDA", text: "Dois horários no mesmo dia", tag: "CONFLITO", tone: "warn" },
];

export const Pressao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [Math.min(c.p_neg, c.p_dia + 0.25), c.p_sem, c.p_msg + 0.1, c.p_msg + 0.75, c.p_doc, c.p_ag];
  const enter = prog(t, c.p_dia - 0.35, 0.4, ease.out);
  const n = at.filter((a) => t >= a).length;
  const freeze = prog(t, c.p_fing - 0.1, 0.4, ease.out);
  const org = prog(t, c.p_cob + 0.35, 0.8, ease.inOut);
  const shakeAmt = (n / ITEMS.length) * 9 * (1 - freeze);
  const sticker = sp(t, c.p_fing - 0.05, { damping: 10, stiffness: 230 });
  const badge = sp(t, c.p_cob + 0.05, { damping: 9, stiffness: 240 });
  const drop = prog(t, c.p_cob + 0.4, 0.6, ease.in);
  const tagP = sp(t, c.p_prop - 0.05, { damping: 12, stiffness: 200 });
  const out = prog(t, c.q_so + 0.15, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: enter * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_dia - 0.3, s: 1.06, y: 0, r: 0 },
          { t: c.p_ag + 0.4, s: 1.0, y: 30, r: 1.2, e: ease.inOut },
          { t: c.p_fing + 0.3, s: 1.04, y: 20, r: 0, e: ease.out },
          { t: c.p_cob + 1.0, s: 0.98, y: 0, r: 0, e: ease.inOut },
          { t: c.q_so + 0.6, s: 1.0, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.16em", color: C.muted }}>
          HOJE {org > 0.5 ? <span style={{ color: C.accent }}>· ORGANIZADO</span> : null}
        </div>
        {ITEMS.map((it, i) => {
          const a = sp(t, at[i] - 0.1, { damping: 13, stiffness: 200 });
          if (a <= 0.001) return null;
          // posição bagunçada (cada novo item cai por cima) → linha da agenda
          const mx = 40 + rnd(i * 4.1) * 100;
          const my = 400 + i * 120 + (rnd(i * 2.7) - 0.5) * 120;
          const mr = (rnd(i * 9.3) - 0.5) * 16;
          const ox = 110;
          const oy = 380 + i * 142;
          const jx = Math.sin(t * 31 + i * 3) * shakeAmt;
          const jy = Math.cos(t * 27 + i) * shakeAmt * 0.6;
          const x = mix(mx, ox, org) + jx;
          const y = mix(my, oy, org) + jy + (1 - Math.min(1, a)) * -500;
          const r = mix(mr, 0, org);
          const tagShow = it.k === "vis" ? tagP : a;
          return (
            <div key={it.k} style={{ position: "absolute", left: x, top: y, width: 860, height: 124, boxSizing: "border-box", borderRadius: 26, padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: C.surface, border: `2px solid ${org > 0.5 ? C.line : it.tone === "warn" ? "rgba(255,107,94,0.45)" : C.line}`, boxShadow: "0 24px 60px rgba(0,0,0,0.55)", transform: `rotate(${r}deg)`, opacity: Math.min(1, a * 1.5), zIndex: i }}>
              <div>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted }}>{it.label}</div>
                <div style={{ fontWeight: 800, fontSize: 40, color: C.text, marginTop: 4, whiteSpace: "nowrap" }}>{it.text}</div>
              </div>
              <div style={{ opacity: Math.min(1, tagShow * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, tagShow))})` }}>
                <Tag text={org > 0.5 ? (i < 2 ? "REVER" : i < 4 ? "RESPONDER" : "RESOLVER") : it.tag} tone={org > 0.5 ? "accent" : it.tone} size={26} />
              </div>
            </div>
          );
        })}
        {/* fingir que não pesa */}
        {sticker > 0.001 && drop < 1 ? (
          <div style={{ position: "absolute", left: 150, top: 640 + drop * 900, width: 780, padding: "40px 0", borderRadius: 34, background: "#F4F5F7", color: "#14161A", textAlign: "center", fontWeight: 800, fontSize: 88, letterSpacing: "-0.04em", boxShadow: "0 40px 100px rgba(0,0,0,0.7)", zIndex: 20, opacity: Math.min(1, sticker * 1.5) * (1 - drop), transform: `rotate(${-7 + drop * 40}deg) scale(${mix(1.6, 1, Math.min(1, sticker))})` }}>
            TÁ TUDO ÓTIMO!
            {badge > 0.001 ? (
              <div style={{ position: "absolute", right: -30, top: -50, padding: "14px 26px", borderRadius: 999, background: C.warn, color: "#fff", fontFamily: F.sans, fontWeight: 800, fontSize: 44, letterSpacing: "-0.01em", transform: `rotate(10deg) scale(${mix(0.3, 1, Math.min(1.1, badge))})`, boxShadow: "0 16px 40px rgba(255,107,94,0.4)" }}>+1 COBRANÇA</div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
