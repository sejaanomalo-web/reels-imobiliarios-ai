import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import { Pin } from "../../../components/Art";
import type { SceneProps } from "../../types";
import { HouseArt, Question, Tag } from "./ui";

/**
 * CENA 2 — TAKE 01, O CONTRASTE. "Kelsie Blevins atua no mercado imobiliário da Carolina do Norte, nos Estados Unidos." → ficha do caso
 * (CASO REAL · PERFIS PÚBLICOS): só nome e local, sem foto, sem números. "Em vez de usar o perfil só como catálogo de anúncios, ela publica
 * conteúdos que ajudam as pessoas a entender o processo de compra e venda." → grade de anúncios ilustrativos; metade vira conteúdo que
 * explica (temas ilustrativos). "Isso faz o público ter motivos para acompanhar… mesmo antes de procurar um imóvel." → NÃO É SÓ MOSTRAR
 * CASA + público acompanhando.
 */
const TILES = [
  { x: 100, y: 640 },
  { x: 400, y: 640 },
  { x: 700, y: 640 },
  { x: 100, y: 920 },
  { x: 400, y: 920 },
  { x: 700, y: 920 },
];
const EDU: Record<number, string> = { 1: "Como funciona a compra?", 3: "O que olhar na visita?", 5: "Etapas da venda" };

export const Contraste: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_kel - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_kel - 0.1, { damping: 13, stiffness: 180 });
  const loc = sp(t, c.c_car - 0.1, { damping: 12, stiffness: 200 });
  const usa = prog(t, c.c_eua - 0.1, 0.4, ease.out);
  const cat = sp(t, c.c_kel + 0.9, { damping: 13, stiffness: 190 });
  const flip = [1, 3, 5].map((i, k) => prog(t, c.c_publ + 0.1 + k * 0.25, 0.5, ease.inOut));
  const edu = prog(t, c.c_proc - 0.1, 0.4, ease.out);
  const key = sp(t, c.c_isso - 0.05, { damping: 12, stiffness: 190 });
  const fol = prog(t, c.c_motiv - 0.2, 1.4, ease.out);
  const before = sp(t, c.c_antes - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.l_rep - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.c_kel - 0.35, s: 1.05, y: -30 },
          { t: c.c_eua + 0.4, s: 1.03, y: -10, e: ease.inOut },
          { t: c.c_cat + 0.3, s: 1.0, y: 20, e: ease.inOut },
          { t: c.c_publ + 0.6, s: 1.04, y: 40, e: ease.inOut },
          { t: c.c_proc + 0.6, s: 1.02, x: 20, y: 20, e: ease.inOut },
          { t: c.c_isso + 0.4, s: 0.97, x: 0, y: 30, e: ease.inOut },
          { t: c.c_antes + 0.5, s: 1.0, y: 70, e: ease.inOut },
          { t: c.l_rep, s: 1.02, y: 80, e: ease.linear },
        ]}
      >
        {/* ficha do caso / chave da cena */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, card * 1.5) }}>
          <Tag text="CASO REAL" tone="accent" size={30} />
          <Tag text="FONTE: PERFIS PÚBLICOS" tone="muted" size={22} />
        </div>
        <div style={{ position: "absolute", left: 100, right: 100, top: 380, height: 210, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, padding: "26px 34px", opacity: Math.min(1, card * 1.5) * (1 - Math.min(1, key * 1.6)), transform: `translateY(${(1 - Math.min(1, card)) * 60}px)` }}>
          <div style={{ fontWeight: 800, fontSize: 68, letterSpacing: "-0.035em", color: C.text }}>Kelsie Blevins</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, opacity: Math.min(1, loc * 1.5), transform: `translateX(${(1 - Math.min(1, loc)) * 40}px)` }}>
            <Pin size={48} />
            <span style={{ fontWeight: 700, fontSize: 40, color: C.muted }}>
              Corretora · Carolina do Norte<span style={{ opacity: usa }}>, EUA</span>
            </span>
          </div>
        </div>
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 400, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, key))})` }}>
            NÃO É SÓ <span style={{ color: BRAND.hex }}>MOSTRAR CASA</span>
          </div>
        ) : null}

        {/* catálogo → conteúdo */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 596, display: "flex", justifyContent: "center", gap: 12, opacity: Math.min(1, cat * 1.5) * (1 - key) }}>
          <Tag text={flip[2] > 0.5 ? "CATÁLOGO + CONTEÚDO" : t > c.c_cat - 0.15 ? "CATÁLOGO DE ANÚNCIOS" : "O PERFIL"} tone={flip[2] > 0.5 ? "accent" : "muted"} size={24} />
          <Tag text="ILUSTRATIVO" tone="muted" size={20} />
        </div>
        {TILES.map((p, i) => {
          const a = sp(t, c.c_kel + 0.9 + i * 0.12, { damping: 13, stiffness: 190 });
          if (a <= 0.001) return null;
          const fi = [1, 3, 5].indexOf(i);
          const f = fi >= 0 ? flip[fi] : 0;
          const back = f > 0.5;
          const lit = back ? edu : 0;
          return (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y + Math.sin(t * 1.5 + i) * 4, width: 280, height: 260, opacity: Math.min(1, a * 1.5) * (fi < 0 ? mix(1, 0.45, edu) : 1), transform: `translateY(${(1 - Math.min(1, a)) * 80}px) rotateY(${Math.sin(f * Math.PI) * 80}deg)` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 26, overflow: "hidden", background: C.surface, border: `3px solid ${lit > 0.5 ? BRAND.hex : C.line}`, boxShadow: lit > 0.5 ? `0 0 30px ${brandAlpha(0.25)}` : "0 20px 50px rgba(0,0,0,0.5)" }}>
                {!back ? (
                  <>
                    <div style={{ position: "absolute", top: -40 }}><HouseArt w={280} hue={i} /></div>
                    <div style={{ position: "absolute", left: 14, bottom: 14 }}><Tag text="À VENDA" tone="muted" size={22} style={{ color: C.text, background: "rgba(7,8,10,0.75)" }} /></div>
                  </>
                ) : (
                  <div style={{ position: "absolute", inset: 0, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.surface2 }}>
                    <Question size={64} color={lit > 0.5 ? BRAND.hex : C.muted} ink={lit > 0.5 ? BRAND.ink : C.bg0} />
                    <div style={{ fontWeight: 800, fontSize: 34, lineHeight: 1.08, letterSpacing: "-0.02em", color: C.text }}>{EDU[i]}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* público que acompanha */}
        {fol > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1205, display: "flex", alignItems: "center", gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => {
              const a = prog(fol, i * 0.1, 0.35, ease.out);
              return <div key={i} style={{ width: 52, height: 52, borderRadius: 26, background: C.surface3, border: `3px solid ${i < 3 ? BRAND.hex : C.dim}`, opacity: a, transform: `translateY(${(1 - a) * 50 + Math.sin(t * 2.2 + i) * 4}px)` }} />;
            })}
            <div style={{ marginLeft: 10, opacity: Math.min(1, before * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, before))})` }}>
              <Tag text="ANTES DE PROCURAR" tone="accent" size={26} />
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
