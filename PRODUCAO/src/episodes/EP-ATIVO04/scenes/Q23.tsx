import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, QTitle, Rail, Tag } from "./ui";

/**
 * CENA 3 — PERGUNTAS 2 E 3. "O que você aprendeu com as negociações que não avançaram? Foi preço, imóvel incompatível, prazo,
 * documentação?" → quadro de causas possíveis que acendem na fala (sem percentuais). "Sua divulgação está falando com um público
 * específico ou tentando agradar todo mundo…?" → anúncio genérico desfoca; anúncio com perfil de comprador e atributos verificáveis
 * ganha destaque (anúncios fictícios).
 */
const CAUSES = ["PREÇO", "IMÓVEL INCOMPATÍVEL", "PRAZO", "DOCUMENTAÇÃO"];

export const Q23: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const rail2 = sp(t, c.b_seg - 0.15, { damping: 14, stiffness: 170 });
  const rail3 = sp(t, c.b_ter - 0.15, { damping: 14, stiffness: 170 });
  const toQ3 = prog(t, c.b_ter - 0.3, 0.7, ease.inOut);
  const t2 = sp(t, c.b_seg + 0.2, { damping: 13, stiffness: 170 });
  const t3 = sp(t, c.b_div - 0.3, { damping: 13, stiffness: 170 });
  const board = sp(t, c.b_apr - 0.1, { damping: 15, stiffness: 150 });
  const cause = [c.b_preco, c.b_incomp, c.b_prazo, c.b_doc].map((a) => sp(t, a - 0.08, { damping: 11, stiffness: 220 }));
  const ads = sp(t, c.b_div, { damping: 15, stiffness: 150 });
  const spec = sp(t, c.b_pub - 0.1, { damping: 12, stiffness: 190 });
  const gen = prog(t, c.b_todo - 0.1, 0.6, ease.out);
  const out = prog(t, c.d_quar - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.b_seg - 0.3, s: 1.04, y: 0 },
          { t: c.b_doc + 0.5, s: 1.0, y: 20, e: ease.inOut },
          { t: c.b_ter + 0.4, s: 1.02, y: 0, e: ease.inOut },
          { t: c.b_todo + 0.5, s: 1.05, x: 30, y: 10, e: ease.inOut },
          { t: c.d_quar, s: 1.06, x: 30, e: ease.linear },
        ]}
      >
        <div style={{ opacity: 1 - toQ3 }}>
          <Rail n={2} p={rail2} />
        </div>
        {toQ3 > 0.01 ? <Rail n={3} p={rail3} /> : null}
        <QTitle p={t2} out={toQ3}>
          O QUE VOCÊ <span style={{ color: BRAND.hex }}>APRENDEU?</span>
        </QTitle>
        <QTitle p={t3}>
          PARA QUEM É SUA <span style={{ color: BRAND.hex }}>DIVULGAÇÃO?</span>
        </QTitle>
        {/* quadro de causas */}
        {board > 0.001 && toQ3 < 1 ? (
          <Card style={{ left: 90, top: 600 + (1 - Math.min(1, board)) * 200, width: 900, padding: "32px 34px", opacity: Math.min(1, board * 1.5) * (1 - toQ3), transform: `translateX(${toQ3 * -900}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: C.muted }}>NEGOCIAÇÕES QUE NÃO AVANÇARAM · POR QUÊ?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}>
              {CAUSES.map((k, i) => {
                const p = cause[i];
                return (
                  <div key={k} style={{ padding: "26px 30px", borderRadius: 22, background: p > 0.5 ? brandAlpha(0.12) : C.surface2, border: `3px solid ${p > 0.5 ? BRAND.hex : C.line}`, fontWeight: 800, fontSize: 42, letterSpacing: "-0.02em", color: p > 0.5 ? C.text : C.dim, transform: `scale(${1 + 0.1 * Math.sin(Math.min(1, p) * Math.PI)})` }}>
                    {k}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 26, fontWeight: 700, fontSize: 30, color: C.muted }}>Registre a causa de cada uma.</div>
          </Card>
        ) : null}
        {/* anúncios */}
        {ads > 0.001 ? (
          <div style={{ opacity: Math.min(1, ads * 1.5), transform: `translateX(${(1 - Math.min(1, ads)) * 600}px)` }}>
            <Card style={{ left: 90, top: 610, width: 900, height: 230, padding: "28px 34px", opacity: mix(1, 0.45, gen), filter: gen > 0.01 ? `blur(${gen * 5}px) grayscale(${gen})` : undefined }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted }}>ANÚNCIO A</span>
                <Tag text="PARA TODO MUNDO" tone="warn" size={24} />
              </div>
              <div style={{ marginTop: 18, fontWeight: 800, fontSize: 46, lineHeight: 1.1, color: C.text }}>Oportunidade única! Imóvel incrível, ótima localização!</div>
            </Card>
            <Card tone={spec > 0.5 ? "accent" : "plain"} style={{ left: 90, top: 870, width: 900, padding: "28px 34px", transform: `scale(${mix(0.96, 1.02, Math.min(1, spec))})` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: spec > 0.5 ? BRAND.hex : C.muted }}>ANÚNCIO B</span>
                <Tag text="ILUSTRATIVO" tone="muted" size={24} />
              </div>
              <div style={{ marginTop: 18, fontWeight: 800, fontSize: 44, lineHeight: 1.12, color: C.text }}>Trabalha de casa? 3 quartos, um vira escritório.</div>
              <div style={{ display: "flex", gap: 14, marginTop: 20, opacity: Math.min(1, spec * 1.5) }}>
                {["home office", "perto da escola", "2 vagas"].map((k) => (
                  <span key={k} style={{ padding: "10px 20px", borderRadius: 999, background: brandAlpha(0.14), color: BRAND.hex, fontWeight: 800, fontSize: 28 }}>{k}</span>
                ))}
              </div>
            </Card>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
