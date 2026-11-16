import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, HouseArt, IconChat, Label, Question, Tag } from "./ui";

/**
 * CENA 5 — APLICAÇÃO + TRANSIÇÃO. "Na sua próxima gravação, escolha uma dúvida real do comprador antes de escolher a primeira imagem." →
 * ficha SUA PRÓXIMA GRAVAÇÃO: 1 DÚVIDA REAL ✓, depois 2 PRIMEIRA IMAGEM; seta ANTES. "E quando a dúvida virar conversa, cada contato precisa
 * estar organizado." (transição adaptada da CTA de salvar) → o "?" vira balão de conversa e cai numa lista de CONTATOS que se organiza.
 * Contatos genéricos (sem nomes, telefones ou mensagens reais).
 */
export const Aplicacao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_prox - 0.35, { damping: 15, stiffness: 150 });
  const r1 = prog(t, c.a_duv - 0.1, 0.4, ease.out);
  const arrow = prog(t, c.a_antes - 0.1, 0.5, ease.inOut);
  const r2 = sp(t, c.a_img - 0.15, { damping: 12, stiffness: 200 });
  const shrink = prog(t, c.a_quando - 0.2, 0.6, ease.inOut);
  const list = sp(t, c.a_quando, { damping: 14, stiffness: 170 });
  const bub = prog(t, c.a_conv - 0.3, 0.7, ease.inOut);
  const org = prog(t, c.a_org - 0.25, 0.6, ease.inOut);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  const ROWS = [
    { n: "Contato 1", q: "dúvida sobre a visita", from: 2, to: 0 },
    { n: "Contato 2", q: "dúvida sobre documentos", from: 0, to: 1 },
    { n: "Contato 3", q: "dúvida sobre o bairro", from: 1, to: 2 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_prox - 0.35, s: 1.06, y: -40 },
          { t: c.a_duv + 0.2, s: 1.04, y: -60, e: ease.inOut },
          { t: c.a_img + 0.2, s: 1.0, y: -10, e: ease.inOut },
          { t: c.a_conv, s: 1.0, y: 40, e: ease.inOut },
          { t: c.a_org + 0.3, s: 1.04, y: 70, e: ease.inOut },
          { t: c.cta_quer, s: 1.04, y: 70, e: ease.linear },
        ]}
      >
        {/* ficha da próxima gravação */}
        <div style={{ position: "absolute", left: 110, top: 300, width: 860, transformOrigin: "50% 0", transform: `translateY(${(1 - Math.min(1, enter)) * 100}px) scale(${mix(1, 0.62, shrink)})`, opacity: mix(1, 0.55, shrink) }}>
          <div style={{ boxSizing: "border-box", borderRadius: 40, background: C.surface, border: `2px solid ${C.line}`, padding: "30px 36px", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={30} color={C.text}>SUA PRÓXIMA GRAVAÇÃO</Label>
              <Tag text="ILUSTRATIVO" tone="muted" size={20} />
            </div>
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 24, padding: "22px 24px", borderRadius: 28, background: C.surface2, border: `3px solid ${r1 > 0.5 ? BRAND.hex : C.line}`, boxShadow: r1 > 0.5 ? `0 0 30px ${brandAlpha(0.2)}` : "none" }}>
              <Question size={96} color={r1 > 0.3 ? BRAND.hex : C.dim} ink={r1 > 0.3 ? BRAND.ink : C.bg0} />
              <div style={{ flex: 1 }}>
                <Label size={26} color={r1 > 0.5 ? BRAND.hex : C.muted}>1º</Label>
                <div style={{ fontWeight: 800, fontSize: 50, letterSpacing: "-0.03em", color: C.text }}>Dúvida real do comprador</div>
              </div>
              <CheckDot p={r1} size={64} />
            </div>
            {/* seta ANTES */}
            <div style={{ height: 96, display: "flex", alignItems: "center", gap: 18, paddingLeft: 62 }}>
              <svg width={40} height={90} viewBox="0 0 40 90" style={{ overflow: "visible" }}>
                <path d={`M20 4 V${4 + 70 * arrow}`} stroke={BRAND.hex} strokeWidth={6} strokeLinecap="round" opacity={arrow > 0.02 ? 1 : 0} />
                <path d="M8 66 L20 80 L32 66" stroke={BRAND.hex} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={arrow > 0.9 ? 1 : 0} />
              </svg>
              <div style={{ opacity: arrow }}><Tag text="ANTES DE" tone="accent" size={28} /></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 24px", borderRadius: 28, background: C.surface2, border: `3px solid ${C.line}`, opacity: mix(0.45, 1, Math.min(1, r2)) }}>
              <div style={{ width: 96, height: 96, borderRadius: 20, overflow: "hidden", flex: "none", transform: `scale(${mix(0.85, 1, Math.min(1.08, r2))})` }}>
                <div style={{ marginTop: -14 }}><HouseArt w={96} hue={4} /></div>
              </div>
              <div style={{ flex: 1 }}>
                <Label size={26}>2º</Label>
                <div style={{ fontWeight: 800, fontSize: 50, letterSpacing: "-0.03em", color: r2 > 0.5 ? C.text : C.muted }}>Primeira imagem</div>
              </div>
            </div>
          </div>
        </div>
        {/* balão de conversa voando para a lista */}
        {bub > 0 && bub < 1 ? (
          <div style={{ position: "absolute", left: mix(170, 150, bub), top: mix(430, 900, bub), transform: `scale(${mix(1, 0.6, bub)})`, opacity: 1 - prog(bub, 0.8, 0.2, ease.linear) }}>
            {bub < 0.45 ? <Question size={96} /> : <div style={{ width: 96, height: 96, borderRadius: 28, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center" }}><IconChat size={60} /></div>}
          </div>
        ) : null}
        {/* contatos */}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 840, height: 440, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${org > 0.5 ? brandAlpha(0.6) : C.line}`, padding: "24px 30px", opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 100}px)`, boxShadow: org > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={28} color={C.text}>CONTATOS</Label>
              <Tag text={org > 0.5 ? "ORGANIZADOS" : "EXEMPLO ILUSTRATIVO"} tone={org > 0.5 ? "accent" : "muted"} size={22} />
            </div>
            {ROWS.map((r, i) => {
              const a = prog(t, c.a_quando + 0.3 + i * 0.3, 0.4, ease.out);
              const slot = mix(r.from, r.to, org);
              const messy = 1 - org;
              return (
                <div key={r.n} style={{ position: "absolute", left: 30, right: 30, top: 90 + slot * 112, height: 96, display: "flex", alignItems: "center", gap: 20, padding: "0 20px", borderRadius: 22, background: C.surface2, border: `2px solid ${org > 0.8 ? brandAlpha(0.35) : C.line}`, opacity: a, transform: `translateX(${(1 - a) * 80 + messy * (i - 1) * 26}px) rotate(${messy * (i - 1) * 2.5}deg)` }}>
                  <div style={{ width: 58, height: 58, borderRadius: 29, background: C.surface3, flex: "none" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{r.n}</div>
                    <div style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>{r.q}</div>
                  </div>
                  {org > 0.6 ? <CheckDot p={prog(t, c.a_org + 0.2 + i * 0.12, 0.3, ease.out)} size={46} /> : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
