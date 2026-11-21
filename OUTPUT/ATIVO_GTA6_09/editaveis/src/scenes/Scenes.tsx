import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { Barra, Contorno, Palavra, Risco } from "../../../estilos/tipografia";

/**
 * ATIVO_GTA6_09 — "Essa cobertura vende sozinha? Não em Vice City" (edição especial GTA VI, roteiro 09). ESTILO 4 — TIPOGRAFIA CINÉTICA.
 * ANALOGIA/DEMONSTRAÇÃO: cobertura FICTÍCIA, sem imagem; nenhum asset do jogo. A palavra é a imagem.
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
  const out = prog(t, c.a_fict - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out, overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.04, x: 2, y: 0 }, { t: c.h_cob, s: 1.06, x: -2, y: -8, e: ease.out }, { t: c.h_ruim, s: 1.08, y: -14, e: ease.out }, { t: c.a_fict, s: 1.05, y: -16, e: ease.linear }]}>
        <Contorno x={20} y={430} texto="VS" size={420} p={prog(t, -0.1, 0.6)} t={t} />
        <Palavra x={X} y={540} texto="COBERTURA" p={S(t, c.h_cob - 0.25)} size={120} tom="verde" de="esq" t={t} />
        <Palavra x={X} y={670} texto="absurda" p={S(t, c.h_cob + 0.3)} size={80} tom="muted" t={t} />
        <Palavra x={X} y={830} texto="ANÚNCIO" p={S(t, c.h_ruim - 0.6)} size={120} de="dir" t={t} />
        <Palavra x={X} y={960} texto="RUIM." p={S(t, c.h_ruim - 0.1)} size={150} tom="warn" de="zoom" rot={-3} t={t} />
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>EU VOU <span style={{ color: G }}>PROVAR</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_fict - 0.5, 0.3);
  const ph = prog(t, c.a_leg - 0.35, 0.3, ease.inOut);
  const typed = prog(t, c.a_lindo - 0.1, Math.max(0.8, c.a_loc - c.a_lindo + 0.5), ease.linear);
  const TXT = "lindo imóvel, ótima localização.";
  const out = prog(t, c.b_transf - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_fict - 0.5, s: 1.04, y: -4 }, { t: c.a_mar, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.a_col, s: 1.04, x: -2, y: -12, e: ease.out }, { t: c.a_lindo, s: 1.08, y: -10, e: ease.out }, { t: c.b_transf, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Contorno x={360} y={420} texto="MAR" size={380} p={prog(t, c.a_mar - 0.3, 0.6)} t={t} />
          <Palavra x={X} y={520} texto="COBERTURA FICTÍCIA" p={S(t, c.a_fict - 0.2)} size={44} mono tom="muted" t={t} />
          <Palavra x={X} y={620} texto="vista pro MAR" p={S(t, c.a_mar - 0.2)} size={104} tom="verde" de="esq" t={t} />
          <Palavra x={X} y={770} texto="JANELAS ENORMES" p={S(t, c.a_jan - 0.1)} size={86} t={t} />
          <Palavra x={X} y={900} texto="vaga pra uma" p={S(t, c.a_col - 0.6)} size={56} tom="muted" t={t} />
          <Palavra x={X} y={970} texto="COLEÇÃO DE CARROS" p={S(t, c.a_col - 0.15)} size={80} de="dir" t={t} />
        </div>
        <div style={{ opacity: ph }}>
          <Palavra x={X} y={540} texto="LEGENDA:" p={S(t, c.a_leg - 0.2)} size={60} mono t={t} />
          <div style={{ position: "absolute", left: X, right: X, top: 660, padding: "34px 38px", borderRadius: 26, background: C.surface, border: `2px solid ${typed >= 1 ? W : C.surface3}`, fontFamily: F.sans, fontWeight: 600, fontSize: 58, lineHeight: 1.15, color: C.muted, opacity: fade(S(t, c.a_leg)), transform: `rotate(${Math.sin(t * 1.2) * 0.8}deg) translateY(${Math.sin(t * 1.6) * 8}px)` }}>
            {TXT.slice(0, Math.round(TXT.length * typed))}<span style={{ color: G, opacity: typed < 1 && Math.sin(t * 12) > 0 ? 1 : 0 }}>|</span>
          </div>
          <Palavra x={X} y={960} texto="…sério?" p={S(t, c.a_loc + 0.35)} size={90} tom="warn" rot={-3} t={t} />
        </div>
      </Camera>
      <Title p={prog(t, c.a_fict - 0.25, 0.25) * (1 - prog(t, c.a_leg - 0.45, 0.15))}>IMAGINA <span style={{ color: G }}>A COBERTURA</span></Title>
      <Title p={prog(t, c.a_leg - 0.25, 0.25)}>AGORA, A <span style={{ color: W }}>LEGENDA</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_transf - 0.5, 0.3);
  const fall = prog(t, c.b_qual - 0.2, 0.6, ease.inOut);
  const out = prog(t, c.c_contr - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_transf - 0.5, s: 1.04, y: -4 }, { t: c.b_impr, s: 1.07, x: 2, y: -10, e: ease.out }, { t: c.b_qual, s: 1.04, x: -2, y: -8, e: ease.out }, { t: c.c_contr, s: 1.06, y: -14, e: ease.linear }]}>
        <Palavra x={X} y={540} texto="uma das vistas mais" p={S(t, c.b_transf - 0.1)} size={58} tom="muted" t={t} />
        <div style={{ transform: `translateY(${fall * 30}px)`, opacity: 1 - fall * 0.6 }}>
          <Palavra x={X} y={630} texto="IMPRESSIONANTES" p={S(t, c.b_impr - 0.2)} size={98} tom="verde" de="zoom" t={t} />
        </div>
        <Risco x={X - 10} y={700} w={860} p={prog(t, c.b_qual - 0.1, 0.4)} />
        <Palavra x={X} y={820} texto="virou" p={S(t, c.b_qual - 0.35)} size={60} tom="muted" t={t} />
        <Palavra x={X} y={900} texto="QUALQUER APÊ" p={S(t, c.b_qual - 0.05)} size={118} tom="warn" de="baixo" t={t} />
        <Palavra x={X} y={1040} texto="da internet." p={S(t, c.b_net - 0.15)} size={64} tom="muted" t={t} />
      </Camera>
      <Title p={prog(t, c.b_transf - 0.25, 0.25)}>VOCÊ <span style={{ color: W }}>APAGOU</span> A VISTA</Title>
    </div>
  );
};

const PASSOS = [{ n: "1", k: "PAISAGEM", at: "c_pais", tom: "verde" as const }, { n: "2", k: "PÔR DO SOL", at: "c_por", tom: "verde" as const }, { n: "3", k: "COMO É VIVER ALI", at: "c_viver", tom: "texto" as const }, { n: "4", k: "METRAGEM · GARAGEM", at: "c_metr", tom: "muted" as const }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_contr - 0.5, 0.3);
  const ph = prog(t, c.d_hist - 0.45, 0.3, ease.inOut);
  const ph3 = prog(t, c.e_real - 0.4, 0.3, ease.inOut);
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_contr - 0.5, s: 1.04, y: -4 }, { t: c.c_por, s: 1.05, x: 2, y: -10, e: ease.out }, { t: c.c_metr, s: 1.04, x: -2, y: -12, e: ease.out }, { t: c.d_hist, s: 1.08, y: -8, e: ease.out }, { t: c.e_ficha, s: 1.05, y: -12, e: ease.out }, { t: c.cta_quer, s: 1.04, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Palavra x={X} y={520} texto="FAÇA O CONTRÁRIO:" p={S(t, c.c_contr - 0.2)} size={52} mono t={t} />
          {PASSOS.map((q, i) => {
            const p = S(t, c[q.at] - 0.2);
            return <Palavra key={q.k} x={X} y={630 + i * 130} texto={<><span style={{ fontFamily: F.mono, fontSize: 52, color: G, marginRight: 22 }}>{q.n}</span>{q.k}</>} p={p} size={q.k.length > 12 ? 66 : 92} tom={q.tom} de="esq" t={t} />;
          })}
          <Palavra x={X} y={1150} texto="← só no final" p={S(t, c.c_final + 0.1)} size={44} mono tom="muted" t={t} />
        </div>
        <div style={{ opacity: ph * (1 - ph3) }}>
          <Contorno x={10} y={480} texto="HISTÓRIA" size={250} p={ph} t={t} />
          <Palavra x={X} y={640} texto="a HISTÓRIA" p={S(t, c.d_hist - 0.2)} size={124} tom="verde" de="zoom" t={t} />
          <Palavra x={X} y={800} texto="que você conta" p={S(t, c.d_hist + 0.4)} size={64} tom="muted" t={t} />
          <Palavra x={X} y={900} texto="MUDA TUDO." p={S(t, c.d_tudo - 0.2)} size={118} t={t} />
        </div>
        <div style={{ opacity: ph3 }}>
          <Palavra x={X} y={580} texto="NA VIDA REAL:" p={S(t, c.e_real - 0.2)} size={64} t={t} />
          <Palavra x={X} y={690} texto="FICHA" p={S(t, c.e_ficha - 0.2)} size={150} tom="verde" de="zoom" t={t} />
          <Palavra x={X} y={850} texto="COMPLETA." p={S(t, c.e_ficha + 0.15)} size={120} tom="verde" t={t} />
          <Barra x={X} y={1000} w={820} p={prog(t, c.e_ficha + 0.4, 0.6)} />
          <Palavra x={X} y={1040} texto="vista · história · metragem · vagas" p={S(t, c.e_ficha + 0.55)} size={38} mono tom="muted" t={t} />
        </div>
      </Camera>
      <Title p={prog(t, c.c_contr - 0.25, 0.25) * (1 - prog(t, c.d_hist - 0.55, 0.15))}>ABRA PELO <span style={{ color: G }}>QUE SE SENTE</span></Title>
      <Title p={prog(t, c.d_hist - 0.35, 0.25) * (1 - prog(t, c.e_real - 0.45, 0.15))}>ATÉ NUM IMÓVEL <span style={{ color: G }}>INVENTADO</span></Title>
      <Title p={prog(t, c.e_real - 0.25, 0.25)}>E NA <span style={{ color: G }}>VIDA REAL?</span></Title>
    </div>
  );
};

export const _m = mix;
