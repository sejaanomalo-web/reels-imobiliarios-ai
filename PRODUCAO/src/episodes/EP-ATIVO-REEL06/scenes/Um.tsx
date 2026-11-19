import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { FileTile, IconLens, People, Question, Rule, Tag } from "./ui";

/**
 * CENA 2 — 1. ESPALHE TUDO (irônico). "Guarde as fotos dos imóveis misturadas às fotos pessoais." → 01 FOTOS: galeria genérica mistura
 * imóveis e fotos pessoais. "Deixe a metragem em um PDF antigo." → 02 PDF: documento com VERSÃO ANTIGA. "E anote o valor numa conversa que
 * você nunca mais encontra." → 03 CONVERSA: rolagem infinita, o valor some. "Pronto: a cada novo interessado, começa uma investigação." →
 * lupa varrendo os arquivos soltos + novo interessado com "?".
 */
const GAL: ("imovel" | "pessoal")[] = ["imovel", "pessoal", "imovel", "pessoal", "pessoal", "imovel", "imovel", "pessoal", "imovel"];

export const Um: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.u_fotos - 0.35, { damping: 15, stiffness: 150 });
  const r = [c.u_fotos, c.u_metr, c.u_valor].map((x) => sp(t, x - 0.2, { damping: 13, stiffness: 190 }));
  const mixP = prog(t, c.u_mist - 0.1, 0.8, ease.inOut);
  const pdf = sp(t, c.u_metr - 0.05, { damping: 12, stiffness: 200 });
  const old = sp(t, c.u_pdf + 0.2, { damping: 11, stiffness: 220 });
  const chat = sp(t, c.u_valor - 0.05, { damping: 12, stiffness: 200 });
  const lost = prog(t, c.u_nunca - 0.1, 1.0, ease.in);
  const inv = prog(t, c.u_pronto - 0.2, 0.6, ease.inOut);
  const who = sp(t, c.u_inter - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.d_agora - 0.45, 0.4, ease.in);
  const stage = t < c.u_metr - 0.2 ? 0 : t < c.u_valor - 0.2 ? 1 : 2;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.u_fotos - 0.35, s: 1.04, y: -20 },
          { t: c.u_mist + 0.3, s: 1.06, x: -30, y: 0, e: ease.inOut },
          { t: c.u_metr + 0.3, s: 1.05, x: 30, y: 0, e: ease.inOut },
          { t: c.u_valor + 0.3, s: 1.05, x: -20, y: 0, e: ease.inOut },
          { t: c.u_pronto + 0.3, s: 0.98, x: 0, y: 0, e: ease.inOut },
          { t: c.u_invest + 0.3, s: 1.04, x: 20, y: 0, e: ease.inOut },
          { t: c.d_agora, s: 1.04, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, right: 100, top: 410, display: "flex", flexDirection: "column", gap: 14, opacity: 1 - inv * 0.6 }}>
          <Rule n="01" text="Fotos misturadas" p={r[0]} done={prog(t, c.u_pess, 0.2, ease.out)} />
          <Rule n="02" text="Metragem num PDF antigo" p={r[1]} done={prog(t, c.u_pdf + 0.3, 0.2, ease.out)} />
          <Rule n="03" text="Valor numa conversa perdida" p={r[2]} done={prog(t, c.u_nunca + 0.5, 0.2, ease.out)} />
        </div>
        {/* ilustração da regra atual */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 690, height: 520 }}>
          {inv < 1 && stage === 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 150px)", gap: 14, justifyContent: "center", opacity: 1 - inv }}>
              {GAL.map((k, i) => {
                const sorted = i < 4 ? "imovel" : "pessoal";
                const kind = mixP > 0.5 ? k : sorted;
                return <div key={i} style={{ transform: `rotate(${mixP * (rnd(i) - 0.5) * 14}deg) translateY(${Math.sin(t * 2 + i) * 3}px)` }}><FileTile kind={kind as "imovel" | "pessoal"} w={150} i={i} /></div>;
              })}
            </div>
          ) : null}
          {inv < 1 && stage === 1 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, opacity: Math.min(1, pdf * 1.5) * (1 - inv) }}>
              <div style={{ transform: `rotate(-4deg) scale(${mix(0.6, 1, Math.min(1.06, pdf))})` }}><FileTile kind="pdf" w={300} /></div>
              {old > 0.001 ? <div style={{ transform: `rotate(-8deg) scale(${mix(1.6, 1, Math.min(1, old))})`, opacity: Math.min(1, old * 1.5) }}><Tag text="VERSÃO ANTIGA" tone="warn" size={34} /></div> : null}
            </div>
          ) : null}
          {inv < 1 && stage === 2 ? (
            <div style={{ display: "flex", justifyContent: "center", opacity: Math.min(1, chat * 1.5) * (1 - inv) }}>
              <div style={{ position: "relative", width: 520, height: 460, borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 24, right: 24, top: 20 - lost * 900 }}>
                  {Array.from({ length: 16 }).map((_, k) => (
                    <div key={k} style={{ marginTop: 14, marginLeft: k % 2 ? "auto" : 0, width: `${50 + ((k * 23) % 40)}%`, padding: "12px 16px", borderRadius: 20, background: k % 2 ? BRAND.deep : C.surface3, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>
                      {k === 1 ? "valor: R$ ••••" : <span style={{ display: "inline-block", width: "80%", height: 12, borderRadius: 6, background: "rgba(255,255,255,0.18)" }} />}
                    </div>
                  ))}
                </div>
                {lost > 0.5 ? <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", justifyContent: "center" }}><Tag text="CADÊ O VALOR?" tone="warn" size={30} /></div> : null}
              </div>
            </div>
          ) : null}
          {/* investigação */}
          {inv > 0.001 ? (
            <div style={{ position: "absolute", inset: 0, opacity: inv }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const kinds = ["imovel", "pessoal", "pdf", "chat", "imovel", "pdf", "pessoal", "chat", "imovel", "pdf"] as const;
                return <div key={i} style={{ position: "absolute", left: rnd(i * 3) * 740, top: rnd(i * 5 + 1) * 340, transform: `rotate(${(rnd(i * 7) - 0.5) * 30}deg)` }}><FileTile kind={kinds[i]} w={130} i={i} /></div>;
              })}
              <div style={{ position: "absolute", left: 360 + Math.sin(t * 1.6) * 260, top: 140 + Math.cos(t * 1.3) * 120, zIndex: 3 }}><IconLens size={150} color={BRAND.hex} /></div>
              {who > 0.001 ? (
                <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, opacity: Math.min(1, who * 1.5), zIndex: 4 }}>
                  <div style={{ padding: "10px 16px 4px", borderRadius: 22, background: C.surface, border: `2px solid ${C.line}` }}><People n={1} size={70} /></div>
                  <Question size={70} />
                  <Tag text="NOVO INTERESSADO" tone="muted" size={26} style={{ color: C.text }} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        1. <span style={{ color: C.warn }}>ESPALHE TUDO</span>
      </div>
    </div>
  );
};
