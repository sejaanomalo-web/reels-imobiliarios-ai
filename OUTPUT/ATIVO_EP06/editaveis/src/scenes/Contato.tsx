import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Avatar, Card, Tag, TEAM } from "./ui";

/**
 * CENA 2 — O CAMINHO DO CONTATO (EXEMPLO ILUSTRATIVO). "Acompanhe uma oportunidade fictícia. Ela chega por um anúncio." → ficha do
 * lead entra pelo anúncio. "Alguém responde, mas ninguém define quem será responsável pelo próximo retorno." → corretor A responde;
 * RESPONSÁVEL e PRÓXIMO PASSO ficam em branco (alerta). "No dia seguinte, outro corretor abre a conversa sem saber o que já foi
 * explicado." → corretor B repete a pergunta; os dois balões batem.
 */
export const Contato: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const card = sp(t, c.c_acomp - 0.1, { damping: 14, stiffness: 160 });
  const ad = sp(t, c.c_anun - 0.1, { damping: 12, stiffness: 200 });
  const a = sp(t, c.c_resp - 0.1, { damping: 13, stiffness: 190 });
  const gap = prog(t, c.c_respo, 0.4, ease.out);
  const day = sp(t, c.c_dia - 0.1, { damping: 12, stiffness: 200 });
  const b = sp(t, c.c_outro - 0.05, { damping: 13, stiffness: 190 });
  const clash = sp(t, c.c_expl, { damping: 9, stiffness: 240 });
  const out = prog(t, c.i_siga - 0.45, 0.4, ease.in);
  const blink = 0.55 + 0.45 * Math.sin(t * 7);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, card * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.c_acomp - 0.3, s: 1.05, y: 20 },
          { t: c.c_anun + 0.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.c_respo + 0.5, s: 1.08, x: 0, y: 40, e: ease.inOut },
          { t: c.c_outro + 0.6, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.i_siga, s: 1.04, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, card * 1.5) }}>
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={26} />
          {day > 0.01 ? <Tag text="DIA SEGUINTE" tone="warn" size={26} style={{ opacity: Math.min(1, day * 1.5) }} /> : null}
        </div>
        {/* ficha do lead */}
        <Card style={{ left: 190, top: 380, width: 700, padding: "26px 32px", transform: `translateY(${(1 - Math.min(1, card)) * 300}px)` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 800, fontSize: 44, color: C.text }}>Lead · Apto 2 quartos</span>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(143,180,227,0.16)", color: C.cold, fontFamily: F.mono, fontWeight: 700, fontSize: 24, opacity: Math.min(1, ad * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, ad))})` }}>VIA ANÚNCIO</span>
          </div>
          {[
            { k: "RESPONSÁVEL", v: "—" },
            { k: "PRÓXIMO PASSO", v: "—" },
          ].map((f) => (
            <div key={f.k} style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 18, background: C.bg1, border: `3px ${gap > 0.5 ? "dashed" : "solid"} ${gap > 0.5 ? C.warn : C.line}`, opacity: gap > 0.5 ? blink : 1 }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.muted }}>{f.k}</span>
              <span style={{ fontWeight: 800, fontSize: 36, color: gap > 0.5 ? C.warn : C.dim }}>{gap > 0.5 ? "NINGUÉM DEFINIU" : f.v}</span>
            </div>
          ))}
        </Card>
        {/* corretor A responde */}
        {a > 0.001 ? (
          <div style={{ position: "absolute", left: 90, top: 820, display: "flex", alignItems: "flex-end", gap: 14, opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * -200}px)` }}>
            <Avatar ini={TEAM[0].ini} bg={TEAM[0].bg} size={84} />
            <div style={{ padding: "18px 22px", borderRadius: 24, borderBottomLeftRadius: 6, background: C.surface3, fontWeight: 700, fontSize: 32, color: C.text, maxWidth: 520 }}>Oi! Qual imóvel te interessou?</div>
          </div>
        ) : null}
        {/* corretor B repete */}
        {b > 0.001 ? (
          <div style={{ position: "absolute", right: 90, top: 1010, display: "flex", flexDirection: "row-reverse", alignItems: "flex-end", gap: 14, opacity: Math.min(1, b * 1.5), transform: `translateX(${(1 - Math.min(1, b)) * 200}px)` }}>
            <Avatar ini={TEAM[1].ini} bg={TEAM[1].bg} size={84} />
            <div style={{ padding: "18px 22px", borderRadius: 24, borderBottomRightRadius: 6, background: C.surface3, border: `3px solid ${clash > 0.5 ? C.warn : "transparent"}`, fontWeight: 700, fontSize: 32, color: C.text, maxWidth: 520 }}>Oi! Qual imóvel te interessou?</div>
          </div>
        ) : null}
        {clash > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", transform: `scale(${mix(0.3, 1, Math.min(1.1, clash))}) rotate(-4deg)` }}>
            <Tag text="A MESMA PERGUNTA, DE NOVO" tone="warn" size={30} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
