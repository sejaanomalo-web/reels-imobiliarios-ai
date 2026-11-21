import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { Barra, Contorno, Palavra, Risco } from "../../../estilos/tipografia";

/**
 * ATIVO_GTA6_11 — "O lugar mais estranho para morar em GTA VI" (edição especial GTA VI, roteiro 11). ESTILO 4 — TIPOGRAFIA CINÉTICA.
 * FATO + HUMOR: Grassrivers (região de natureza e áreas alagadas, material oficial). Sem imagem do jogo; olhos na água estilizados.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 56 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });
const X = 130;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const out = prog(t, c.a_gta - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out, overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: 0 }, { t: c.h_estr, s: 1.06, x: -2, y: -8, e: ease.out }, { t: c.h_pant, s: 1.08, y: -14, e: ease.out }, { t: c.a_gta, s: 1.05, y: -16, e: ease.linear }]}>
        <Contorno x={40} y={430} texto="?" size={520} p={prog(t, -0.1, 0.6)} t={t} />
        <Palavra x={X} y={520} texto="O ENDEREÇO" p={S(t, 0.2)} size={92} t={t} />
        <Palavra x={X} y={640} texto="MAIS ESTRANHO" p={S(t, c.h_estr - 0.2)} size={98} tom="warn" de="esq" t={t} />
        <Palavra x={X} y={770} texto="de Leonida…" p={S(t, c.h_leon - 0.2)} size={64} tom="muted" t={t} />
        <Palavra x={X} y={880} texto="PÂNTANOS." p={S(t, c.h_pant - 0.2)} size={150} tom="verde" de="zoom" t={t} />
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>ONDE <span style={{ color: G }}>VOCÊ</span> MORARIA?</Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_gta - 0.5, 0.3);
  const out = prog(t, c.b_grass - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_gta - 0.5, s: 1.04, y: -4 }, { t: c.a_praia, s: 1.07, x: 2, y: -10, e: ease.out }, { t: c.a_pred, s: 1.05, x: -2, y: -12, e: ease.out }, { t: c.b_grass, s: 1.05, y: -14, e: ease.linear }]}>
        <Contorno x={200} y={420} texto="VICE" size={360} p={prog(t, c.a_gta - 0.3, 0.6)} t={t} />
        <Palavra x={X} y={560} texto="todo mundo pensa em:" p={S(t, c.a_gta)} size={56} tom="muted" t={t} />
        <Palavra x={X} y={680} texto="PRAIA" p={S(t, c.a_praia - 0.2)} size={160} de="esq" t={t} />
        <Palavra x={X} y={870} texto="PRÉDIOS" p={S(t, c.a_pred - 0.2)} size={160} de="dir" t={t} />
      </Camera>
      <Title p={prog(t, c.a_gta - 0.25, 0.25)}>QUANDO SE FALA EM <span style={{ color: G }}>GTA VI</span></Title>
    </div>
  );
};

const OPOSTOS = [{ k: "vida noturna", at: "b_noite" }, { k: "trânsito", at: "b_trans" }, { k: "outdoors", at: "b_out" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_grass - 0.5, 0.3);
  const ph = prog(t, c.b_oposto - 0.4, 0.3, ease.inOut);
  const out = prog(t, c.c_vender - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_grass - 0.5, s: 1.04, y: -4 }, { t: c.b_nat, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.b_oposto, s: 1.04, x: -2, y: -8, e: ease.out }, { t: c.b_out, s: 1.07, y: -14, e: ease.out }, { t: c.c_vender, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Palavra x={X} y={540} texto="GRASSRIVERS" p={S(t, c.b_grass - 0.2)} size={112} tom="verde" de="zoom" t={t} />
          <Palavra x={X} y={690} texto="natureza" p={S(t, c.b_nat - 0.2)} size={84} t={t} />
          <Palavra x={X} y={800} texto="áreas alagadas" p={S(t, c.b_alag - 0.2)} size={84} t={t} />
          <svg width={1080} height={120} style={{ position: "absolute", left: 0, top: 930, opacity: fade(prog(t, c.b_alag, 0.6)) }}>
            {[0, 1].map((k) => <path key={k} d={`M ${X} ${40 + k * 36} ` + Array.from({ length: 8 }, (_, i) => `q 50 ${Math.sin(t * 2 + i + k) * 8 - 18} 100 0`).join(" ")} fill="none" stroke={G} strokeWidth={6} strokeLinecap="round" opacity={0.8 - k * 0.3} />)}
          </svg>
        </div>
        <div style={{ opacity: ph }}>
          <Palavra x={X} y={540} texto="O OPOSTO DE:" p={S(t, c.b_oposto - 0.2)} size={64} mono t={t} />
          {OPOSTOS.map((q, i) => (
            <React.Fragment key={q.k}>
              <Palavra x={X} y={660 + i * 140} texto={q.k} p={S(t, c[q.at] - 0.25)} size={96} tom="muted" t={t} />
              <Risco x={X - 10} y={720 + i * 140} w={mix(500, 700, i === 0 ? 1 : 0.6)} p={prog(t, c[q.at] + 0.15, 0.3)} />
            </React.Fragment>
          ))}
        </div>
      </Camera>
      <Title p={prog(t, c.b_grass - 0.25, 0.25) * (1 - prog(t, c.b_oposto - 0.5, 0.15))}>SÓ QUE <span style={{ color: G }}>TEM MAIS</span></Title>
      <Title p={prog(t, c.b_oposto - 0.3, 0.25)}>O <span style={{ color: W }}>OPOSTO</span> DA CIDADE</Title>
    </div>
  );
};

/** Olhos na água (estilizados). */
const Olhos: React.FC<{ t: number; p: number }> = ({ t, p }) => {
  const blink = Math.sin(t * 1.3) > 0.996 ? 0.15 : 1;
  return (
    <svg width={1080} height={300} style={{ position: "absolute", left: 0, top: 920, opacity: fade(p) }}>
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${420 + k * 160} ${130 - p * 30})`}>
          <ellipse rx={56} ry={34 * blink} fill="none" stroke={C.text} strokeWidth={7} />
          <circle cx={Math.sin(t * 0.8) * 16} r={14 * blink} fill={W} />
        </g>
      ))}
      {[0, 1, 2].map((k) => <path key={k} d={`M 160 ${150 + k * 34} ` + Array.from({ length: 8 }, (_, i) => `q 50 ${Math.sin(t * 2 + i + k) * 8 - 16} 100 0`).join(" ")} fill="none" stroke={G} strokeWidth={6} strokeLinecap="round" opacity={0.85 - k * 0.25} />)}
    </svg>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_vender - 0.5, 0.3);
  const ph = prog(t, c.d_verde - 0.5, 0.3, ease.inOut);
  const ph3 = prog(t, c.e_real - 0.4, 0.3, ease.inOut);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_vender - 0.5, s: 1.04, y: -4 }, { t: c.c_contato, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.c_qual, s: 1.09, x: 0, y: -14, e: ease.out }, { t: c.d_quem, s: 1.05, y: -8, e: ease.out }, { t: c.e_antec, s: 1.06, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Palavra x={X} y={520} texto="VENDER UMA CASA LÁ:" p={S(t, c.c_vender - 0.2)} size={56} mono t={t} />
          <div style={{ position: "absolute", left: X, right: X, top: 640, padding: "30px 36px", borderRadius: 24, background: C.surface, border: `2px solid ${C.surface3}`, fontWeight: 700, fontSize: 56, lineHeight: 1.15, color: C.text, opacity: fade(S(t, c.c_desc - 0.2)), transform: `rotate(${Math.sin(t * 1.2) * 0.8}deg) translateY(${Math.sin(t * 1.6) * 8}px)` }}>
            “contato direto com a natureza”
          </div>
          <Palavra x={X} y={900} texto="QUAL NATUREZA?" p={S(t, c.c_qual - 0.25)} size={108} tom="warn" de="zoom" rot={-3} t={t} />
        </div>
        <div style={{ opacity: ph * (1 - ph3) }}>
          <Palavra x={X} y={520} texto="vista pro" p={S(t, c.d_verde - 0.5)} size={68} tom="muted" t={t} />
          <Palavra x={X} y={610} texto="VERDE ✓" p={S(t, c.d_verde - 0.2)} size={130} tom="verde" t={t} />
          <Palavra x={X} y={790} texto="quem está olhando?" p={S(t, c.d_quem - 0.2)} size={66} tom="warn" t={t} />
          <Olhos t={t} p={prog(t, c.d_agua - 0.5, 0.8, ease.out)} />
        </div>
        <div style={{ opacity: ph3 }}>
          <Palavra x={X} y={580} texto="NA VIDA REAL," p={S(t, c.e_real - 0.2)} size={84} t={t} />
          <Palavra x={X} y={700} texto="ANÚNCIO BOM" p={S(t, c.e_real + 0.4)} size={110} tom="verde" t={t} />
          <Palavra x={X} y={850} texto="antecipa as perguntas." p={S(t, c.e_antec - 0.2)} size={70} t={t} />
          <Barra x={X} y={960} w={820} p={prog(t, c.e_antec + 0.3, 0.6)} />
        </div>
      </Camera>
      <Title p={prog(t, c.c_vender - 0.25, 0.25) * (1 - prog(t, c.d_verde - 0.6, 0.15))}>IMAGINA O <span style={{ color: G }}>ANÚNCIO</span></Title>
      <Title p={prog(t, c.d_verde - 0.4, 0.25) * (1 - prog(t, c.e_real - 0.45, 0.15))}>VISTA <span style={{ color: G }}>PRIVILEGIADA</span>?</Title>
      <Title p={prog(t, c.e_real - 0.25, 0.25)}>E NA <span style={{ color: G }}>VIDA REAL?</span></Title>
    </div>
  );
};
