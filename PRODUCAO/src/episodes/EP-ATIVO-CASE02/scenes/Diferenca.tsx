import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import { Pin } from "../../../components/Art";
import type { SceneProps } from "../../types";
import { Mark, RoomArt, Spot, Tag } from "./ui";

/**
 * CENA 2 — TAKE 01, A DIFERENÇA. "Jason Ballo trabalha com compradores na Austrália." → ficha CASO REAL (nome, papel e país; sem foto).
 * "Nos vídeos, ele não se limita à sala bonita ou à vista da varanda." → cômodo ilustrativo com SALA BONITA / VISTA DA VARANDA, que
 * recuam. "Abre armário, observa acabamento, confere circulação e mostra detalhes…" → portas abrem, marcador no acabamento, caminho de
 * circulação, detalhes. "O conteúdo parece uma inspeção acompanhada, não um comercial." → OLHAR DE QUEM COMPRA + INSPEÇÃO ✓ × COMERCIAL ✕.
 */
const R = { x: 110, y: 500, w: 860 };

export const Diferenca: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_jason - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_jason - 0.1, { damping: 13, stiffness: 180 });
  const role = sp(t, c.c_compr - 0.1, { damping: 12, stiffness: 200 });
  const aus = prog(t, c.c_aus - 0.1, 0.4, ease.out);
  const room = sp(t, c.c_jason + 0.5, { damping: 14, stiffness: 160 });
  const nice = [c.c_sala, c.c_varanda].map((x) => sp(t, x - 0.1, { damping: 12, stiffness: 200 }));
  const recede = prog(t, c.c_arm - 0.3, 0.5, ease.inOut);
  const doors = prog(t, c.c_arm - 0.1, 0.6, ease.inOut);
  const acab = sp(t, c.c_acab - 0.05, { damping: 12, stiffness: 210 });
  const circ = prog(t, c.c_circ - 0.1, 0.8, ease.out);
  const det = [c.c_det, c.c_det + 0.35, c.c_det + 0.7].map((x) => sp(t, x, { damping: 12, stiffness: 210 }));
  const key = sp(t, c.c_insp - 0.2, { damping: 12, stiffness: 190 });
  const ok = sp(t, c.c_insp + 0.4, { damping: 12, stiffness: 200 });
  const no = sp(t, c.c_comerc - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.q_pensa - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.c_jason - 0.35, s: 1.04, y: -30 },
          { t: c.c_varanda + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.c_arm + 0.3, s: 1.06, x: -60, y: 30, e: ease.inOut },
          { t: c.c_acab + 0.3, s: 1.06, x: 0, y: 60, e: ease.inOut },
          { t: c.c_circ + 0.5, s: 1.02, x: 0, y: 60, e: ease.inOut },
          { t: c.c_det + 0.6, s: 1.04, x: 30, y: 20, e: ease.inOut },
          { t: c.c_insp, s: 0.98, x: 0, y: 30, e: ease.inOut },
          { t: c.q_pensa, s: 1.01, y: 40, e: ease.linear },
        ]}
      >
        {/* ficha do caso → chave da cena */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, card * 1.5) * (1 - Math.min(1, key * 1.6)) }}>
          <Tag text="CASO REAL" tone="accent" size={28} />
          <Tag text="FONTE: PERFIS PÚBLICOS" tone="muted" size={20} />
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: Math.min(1, card * 1.5) * (1 - Math.min(1, key * 1.6)), transform: `translateY(${(1 - Math.min(1, card)) * 40}px)` }}>
          <div style={{ fontWeight: 800, fontSize: 60, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.text, whiteSpace: "nowrap" }}>Jason Ballo</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: Math.min(1, role * 1.5) }}>
            <Pin size={40} />
            <span style={{ fontWeight: 700, fontSize: 32, color: C.muted, whiteSpace: "nowrap" }}>Agente do comprador<span style={{ opacity: aus }}> · Austrália</span></span>
          </div>
        </div>
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 320, textAlign: "center", fontWeight: 800, fontSize: 76, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, key))})` }}>
            OLHAR DE <span style={{ color: BRAND.hex }}>QUEM COMPRA</span>
          </div>
        ) : null}

        {/* o cômodo */}
        <div style={{ position: "absolute", left: R.x, top: R.y, width: R.w, borderRadius: 30, overflow: "hidden", border: `3px solid ${circ > 0.5 ? brandAlpha(0.5) : C.line}`, opacity: Math.min(1, room * 1.5), transform: `translateY(${(1 - Math.min(1, room)) * 80}px)`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
          <RoomArt w={R.w} doors={doors} light={1 - recede * 0.5} path={circ} t={t} />
          <div style={{ position: "absolute", right: 14, top: 14 }}><Tag text="IMÓVEL ILUSTRATIVO" tone="muted" size={20} style={{ background: "rgba(7,8,10,0.75)" }} /></div>
          {/* o que todo mundo mostra */}
          {["SALA BONITA", "VISTA DA VARANDA"].map((k, i) => {
            const p = nice[i];
            if (p <= 0.001) return null;
            return (
              <div key={k} style={{ position: "absolute", left: i ? 470 : 280, top: i ? 70 : 230, opacity: Math.min(1, p * 1.5) * mix(1, 0.35, recede), transform: `scale(${mix(0.5, 1, Math.min(1.08, p)) * mix(1, 0.85, recede)})` }}>
                <Tag text={k} tone="muted" size={28} style={{ color: "#E5C07B", background: "rgba(7,8,10,0.85)", border: "2px solid #E5C07B" }} />
              </div>
            );
          })}
          <Spot x={160} y={250} p={doors} t={t} label="ARMÁRIO" />
          <Spot x={560} y={500} p={acab} t={t} label="ACABAMENTO" />
          {circ > 0.3 ? <div style={{ position: "absolute", left: 300, top: 430, opacity: prog(circ, 0.3, 0.4, ease.out) }}><Tag text="CIRCULAÇÃO" tone="accent" size={24} style={{ background: BRAND.deep }} /></div> : null}
          <Spot x={680} y={180} p={det[0]} t={t} />
          <Spot x={420} y={300} p={det[1]} t={t} />
          <Spot x={110} y={480} p={det[2]} t={t} />
        </div>

        {/* inspeção × comercial */}
        <div style={{ position: "absolute", left: 110, right: 110, top: 1125, display: "flex", justifyContent: "space-between" }}>
          {[0, 1].map((i) => {
            const p = i ? no : ok;
            if (p <= 0.001) return <div key={i} />;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 22px", borderRadius: 24, background: C.surface, border: `3px solid ${i ? C.warn : BRAND.hex}`, opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, p))})` }}>
                <Mark ok={!i} size={50} />
                <span style={{ fontWeight: 800, fontSize: 36, color: i ? C.muted : C.text }}>{i ? "Comercial" : "Inspeção acompanhada"}</span>
              </div>
            );
          })}
        </div>
      </Camera>
    </div>
  );
};
