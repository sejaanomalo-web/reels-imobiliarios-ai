import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { People, Question, RoomArt, Spot, Tag, Viewfinder } from "./ui";

/**
 * CENA 3 — TAKE 02, POR QUE PRENDE. "Pensa no que acontece com quem assiste." → o mesmo cômodo num visor de vídeo; título MOSTRE. NÃO ENFEITE.
 * "Em vez de ouvir adjetivos, a pessoa começa a receber respostas: cabe o móvel? Como entra a luz? Qual detalhe merece atenção?" →
 * adjetivos flutuando estouram; cada pergunta acende e marca o cômodo (fita de medir sobre o sofá — sem medida —, feixe de luz, ponto de
 * atenção). "Até uma limitação, quando é verdadeira e contextualizada, ajuda a filtrar o comprador certo." → LIMITAÇÃO REAL + CONTEXTO → filtro.
 */
const VF = { x: 110, y: 440, w: 860, h: 590 };
const ADJ = ["LINDO!", "INCRÍVEL!", "IMPERDÍVEL!", "MARAVILHOSO!"];
const Q = ["Cabe o móvel?", "Como entra a luz?", "Qual detalhe merece atenção?"];

export const Prende: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.q_movel, c.q_luz, c.q_det];
  const enter = sp(t, c.q_pensa - 0.35, { damping: 15, stiffness: 150 });
  const title = sp(t, c.q_pensa - 0.1, { damping: 14, stiffness: 170 });
  const adj = sp(t, c.q_adj - 0.3, { damping: 12, stiffness: 200 });
  const pop = prog(t, c.q_resp - 0.1, 0.35, ease.in);
  const qs = at.map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const tape = prog(t, c.q_movel, 0.6, ease.out);
  const lim = sp(t, c.q_lim - 0.15, { damping: 13, stiffness: 190 });
  const ctx = prog(t, c.q_verd, 0.5, ease.out);
  const filt = prog(t, c.q_filtrar - 0.1, 1.0, ease.inOut);
  const out = prog(t, c.g_prox - 0.45, 0.4, ease.in);
  const iw = VF.w - 36;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.q_pensa - 0.35, s: 0.96, y: 0 },
          { t: c.q_adj + 0.3, s: 1.02, y: 0, e: ease.inOut },
          { t: c.q_movel + 0.3, s: 1.03, x: 30, y: 0, e: ease.inOut },
          { t: c.q_luz + 0.3, s: 1.03, x: -30, y: 0, e: ease.inOut },
          { t: c.q_aten + 0.3, s: 1.03, x: 0, y: 30, e: ease.inOut },
          { t: c.q_filtrar + 0.4, s: 1.0, y: 60, e: ease.inOut },
          { t: c.g_prox, s: 1.02, y: 60, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: VF.x, top: VF.y }}>
          <Viewfinder w={VF.w} h={VF.h} t={t} rec={false} label="VÍDEO ILUSTRATIVO">
            <div style={{ position: "absolute", left: -10 + Math.sin(t * 0.8) * 24, top: -30 + Math.cos(t * 1.1) * 10 }}><RoomArt w={iw + 20} doors={1} light={qs[1]} t={t} /></div>
            {/* fita sobre o sofá */}
            {tape > 0.001 ? (
              <div style={{ position: "absolute", left: 340, top: 300, width: 200 * tape, height: 22, background: "#E5C07B", borderRadius: 4, boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
                {Array.from({ length: Math.floor(10 * tape) }).map((_, i) => <div key={i} style={{ position: "absolute", left: i * 20, top: 0, width: 3, height: i % 2 ? 8 : 14, background: "#3A2E12" }} />)}
              </div>
            ) : null}
            <Spot x={150} y={470} p={qs[2]} t={t} label="A CONFERIR" color={C.warn} />
            {/* adjetivos */}
            {adj > 0.001 && pop < 1
              ? ADJ.map((a, i) => (
                  <div key={a} style={{ position: "absolute", left: [60, 430, 180, 470][i], top: [90 + Math.sin(t * 2 + i) * 10, 140 + Math.sin(t * 2 + i) * 10, 380 + Math.sin(t * 2 + i) * 10, 430 + Math.sin(t * 2 + i) * 10][i], padding: "10px 22px", borderRadius: 26, background: C.surface3, fontWeight: 800, fontSize: 38, color: C.muted, opacity: Math.min(1, adj * 1.5) * (1 - pop), transform: `scale(${mix(0.5, 1, Math.min(1.08, adj)) * (1 + pop * 0.6)})` }}>{a}</div>
                ))
              : null}
          </Viewfinder>
        </div>
        {/* perguntas → filtro */}
        <div style={{ position: "absolute", left: 110, right: 110, top: 1050, opacity: 1 - lim }}>
          {Q.map((q, i) => {
            const p = qs[i];
            return (
              <div key={q} style={{ position: "absolute", left: 0, right: 0, top: i * 78, height: 66, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", borderRadius: 20, background: C.surface, border: `2px solid ${p > 0.5 ? BRAND.hex : C.line}`, opacity: t > c.q_resp - 0.1 ? mix(0.4, 1, Math.min(1, p)) : 0, transform: `translateX(${(1 - Math.min(1, Math.max(p, 0.001))) * 30}px)` }}>
                <Question size={44} color={p > 0.5 ? BRAND.hex : C.dim} ink={p > 0.5 ? BRAND.ink : C.bg0} />
                <span style={{ fontWeight: 800, fontSize: 36, color: p > 0.5 ? C.text : C.dim }}>{q}</span>
              </div>
            );
          })}
        </div>
        {lim > 0.001 ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 1050, opacity: Math.min(1, lim * 1.5) }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Tag text="LIMITAÇÃO REAL" tone="warn" size={28} />
              <div style={{ opacity: ctx }}><Tag text="+ CONTEXTO" tone="muted" size={28} style={{ color: C.text }} /></div>
            </div>
            <div style={{ position: "relative", height: 130, marginTop: 20 }}>
              {Array.from({ length: 6 }).map((_, i) => {
                const pass = i === 1 || i === 4;
                const x = mix(i * 140, pass ? 280 + (i === 4 ? 150 : 0) : i * 140, filt);
                return (
                  <div key={i} style={{ position: "absolute", left: x, top: 10, opacity: pass ? 1 : mix(1, 0, filt), transform: `translateY(${pass ? 0 : filt * 40}px)` }}>
                    <People n={1} size={74} color={pass && filt > 0.6 ? BRAND.hex : C.muted} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Camera>
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)`, textShadow: `0 0 30px ${brandAlpha(0.2)}` }}>
          MOSTRE. <span style={{ color: BRAND.hex }}>NÃO ENFEITE.</span>
        </div>
      ) : null}
    </div>
  );
};
