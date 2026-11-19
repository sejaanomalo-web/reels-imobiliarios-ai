import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, People, Question, Tag } from "./ui";

/**
 * CENA 2 — EXCESSO (equipe A, cena ilustrativa). "Na primeira conversa, o comprador recebe uma avalanche de assuntos: dezenas de imóveis,
 * siglas, documentos, taxas e prazos." → cartões ITBI, CRÉDITO, IMÓVEIS, DOCUMENTOS, TAXAS, PRAZOS… despencam e se empilham sobre o
 * comprador, cada grupo na sua palavra. "Tudo é importante em algum momento, mas não tudo de uma vez." → a pilha congela. "Ele sai sem
 * saber por onde começar." → POR ONDE COMEÇAR? Texto-chave: INFORMAÇÃO DEMAIS.
 */
const CARDS = [
  { k: "IMÓVEL 1", g: 0 }, { k: "IMÓVEL 2", g: 0 }, { k: "IMÓVEL 3", g: 0 }, { k: "+ IMÓVEIS", g: 0 },
  { k: "ITBI", g: 1 }, { k: "SFH?", g: 1 }, { k: "FGTS?", g: 1 },
  { k: "DOCUMENTOS", g: 2 }, { k: "CERTIDÕES", g: 2 },
  { k: "TAXAS", g: 3 }, { k: "CRÉDITO", g: 3 },
  { k: "PRAZOS", g: 4 }, { k: "ESCRITURA", g: 4 },
];

export const Exc: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.e_na - 0.35, { damping: 15, stiffness: 150 });
  const grp = [c.e_aval - 0.2, c.e_sig, c.e_doc, c.e_tax, c.e_praz];
  const freeze = prog(t, c.e_nao - 0.1, 0.5, ease.out);
  const q = sp(t, c.e_com - 0.4, { damping: 12, stiffness: 190 });
  const out = prog(t, c.c_no - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.e_na - 0.35, s: 1.05, y: 0 },
          { t: ((c.e_na - 0.35) + (c.e_aval + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.e_aval + 0.2, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: ((c.e_aval + 0.2) + (c.e_dez + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.e_dez + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: ((c.e_dez + 0.2) + (c.e_sig + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.e_sig + 0.2, s: 1.09, x: 15, y: -15, e: ease.inOut },
          { t: ((c.e_sig + 0.2) + (c.e_doc + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.e_doc + 0.2, s: 1.05, x: -15, y: -10, e: ease.inOut },
          { t: ((c.e_doc + 0.2) + (c.e_tax + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.e_tax + 0.2, s: 1.09, x: 15, y: -15, e: ease.inOut },
          { t: ((c.e_tax + 0.2) + (c.e_praz + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.e_praz + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.e_praz + 0.3) + (c.e_nao + 0.3)) / 2, s: 1.075, x: 12, y: -18, e: ease.inOut },
          { t: c.e_nao + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: ((c.e_nao + 0.3) + (c.e_vez + 0.3)) / 2, s: 1.085, x: -12, y: -18, e: ease.inOut },
          { t: c.e_vez + 0.3, s: 1.06, x: 0, y: -15, e: ease.inOut },
          { t: ((c.e_vez + 0.3) + (c.e_com + 0.3)) / 2, s: 1.125, x: 12, y: -18, e: ease.inOut },
          { t: c.e_com + 0.3, s: 1.1, x: 0, y: -20, e: ease.inOut },
          { t: c.c_no, s: 1.07, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="EQUIPE A" tone="muted" size={26} style={{ color: C.text }} />
          <Tag text="CENA ILUSTRATIVA" tone="muted" size={24} />
        </div>
        {/* comprador */}
        <div style={{ position: "absolute", left: 440, top: 930, padding: "12px 20px 6px", borderRadius: 26, background: C.surface, border: `2px solid ${C.line}`, transform: `translateX(${Math.sin(t * 7) * 3 * (1 - freeze)}px)` }}><People n={1} size={150} /></div>
        {CARDS.map((cd, i) => {
          const st = grp[cd.g] + (i % 4) * 0.1 - 0.1;
          const p = prog(t, st, 0.45, ease.out);
          if (p <= 0) return null;
          const tx = 110 + rnd(i * 3 + 1) * 560;
          const ty = 480 + rnd(i * 7 + 2) * 400;
          const rot = (rnd(i * 5) - 0.5) * 40;
          const shake = (1 - freeze) * Math.sin(t * 9 + i) * 3;
          return (
            <div key={cd.k} style={{ position: "absolute", left: tx, top: mix(ty - 500, ty, p), opacity: Math.min(1, p * 2), transform: `rotate(${rot + shake}deg)`, zIndex: i }}>
              <Chip text={cd.k} tone={cd.g === 1 || cd.g === 3 ? "warn" : "plain"} size={34} />
            </div>
          );
        })}
        {freeze > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", opacity: freeze * (1 - Math.min(1, q * 2)) }}>
            <Tag text="TUDO IMPORTA — MAS NÃO DE UMA VEZ" tone="muted" size={28} style={{ color: C.text }} />
          </div>
        ) : null}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1100, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, q))})` }}>
            <Question size={70} color={C.warn} ink="#fff" />
            <span style={{ fontWeight: 800, fontSize: 52, color: C.text, letterSpacing: "-0.02em" }}>POR ONDE COMEÇAR?</span>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        INFORMAÇÃO <span style={{ color: C.warn }}>DEMAIS</span>
      </div>
    </div>
  );
};
