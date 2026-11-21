import React from "react";
import { C, F } from "../../../theme";
import { ease, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import { Barra, Contorno, Palavra, Risco } from "../../../estilos/tipografia";

/**
 * ATIVO_GTA6_04 — "Eu captaria essa casa antes de começar a missão" (edição especial GTA VI, roteiro 04). ESTILO 4 — TIPOGRAFIA CINÉTICA.
 * SÁTIRA/SIMULAÇÃO: a casa é imaginária (sem imagem); nenhum asset do jogo. A palavra é a imagem.
 */
const G = A.hex;
const W = C.warn;
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 56 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p) }}>{children}</div>
);
const S = (t: number, at: number) => sp(t, at, { damping: 12, stiffness: 210 });

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const out = prog(t, c.a_cara - 0.55, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out, overflow: "hidden" }}>
      <Camera drift={7} t={t} keys={[{ t: 0, s: 1.04, x: 3, y: 0 }, { t: c.h_prim, s: 1.07, x: -2, y: -8, e: ease.out }, { t: c.h_capt, s: 1.05, x: 2, y: -12, e: ease.out }, { t: c.a_cara, s: 1.07, y: -16, e: ease.linear }]}>
        <Contorno x={20} y={430} texto="VICE" size={360} p={prog(t, c.h_vice - 0.3, 0.6)} t={t} />
        <Palavra x={110} y={560} texto="A PRIMEIRA" p={S(t, c.h_prim - 0.2)} size={110} t={t} />
        <Palavra x={110} y={680} texto="CASA" p={S(t, c.h_prim + 0.25)} size={260} tom="verde" de="zoom" t={t} />
        <Palavra x={110} y={930} texto="que eu captaria." p={S(t, c.h_capt - 0.25)} size={76} tom="muted" de="esq" t={t} />
        <Palavra x={110} y={1060} texto="SEM PENSAR DUAS VEZES" p={S(t, c.h_duas - 0.15)} size={46} mono t={t} />
        <Barra x={110} y={1130} w={700} p={prog(t, c.h_duas + 0.2, 0.6)} />
      </Camera>
      <Title p={sp(t, -0.4, { damping: 13, stiffness: 170 })}>SE EU TRABALHASSE EM <span style={{ color: G }}>VICE CITY</span></Title>
    </div>
  );
};

const CRIT = [{ n: "1", k: "FACHADA", s: "marcante", at: "a_fach" }, { n: "2", k: "LOCALIZAÇÃO", s: "reconhecível", at: "a_loc" }, { n: "3", k: "HISTÓRIA", s: "fácil de contar", at: "a_hist" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.a_cara - 0.55, 0.3);
  const ph = prog(t, c.a_tres - 0.35, 0.3, ease.inOut);
  const out = prog(t, c.b_tour - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={7} t={t} keys={[{ t: c.a_cara - 0.5, s: 1.04, y: -4 }, { t: c.a_maior, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.a_tres, s: 1.03, x: 0, y: -4, e: ease.out }, { t: c.a_loc, s: 1.04, x: 2, y: -12, e: ease.out }, { t: c.b_tour, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Palavra x={110} y={560} texto="A MAIS CARA" p={S(t, c.a_cara - 0.2)} size={120} tom="muted" t={t} />
          <Risco x={100} y={620} w={840} p={prog(t, c.a_cara + 0.35, 0.35)} />
          <Palavra x={110} y={760} texto="A MAIOR" p={S(t, c.a_maior - 0.2)} size={120} tom="muted" de="dir" t={t} />
          <Risco x={100} y={820} w={600} p={prog(t, c.a_maior + 0.3, 0.35)} />
          <Palavra x={110} y={980} texto="não é o critério." p={S(t, c.a_maior + 0.5)} size={60} t={t} />
        </div>
        <div style={{ opacity: ph }}>
          <Contorno x={560} y={420} texto="3" size={560} p={ph} t={t} />
          <Palavra x={110} y={480} texto="COISAS QUE PARAM O ANÚNCIO" p={S(t, c.a_tres)} size={40} mono tom="muted" t={t} />
          {CRIT.map((q, i) => {
            const p = S(t, c[q.at] - 0.2);
            return (
              <React.Fragment key={q.k}>
                <Palavra x={110} y={600 + i * 220} texto={<><span style={{ fontFamily: F.mono, fontSize: 56, color: G, marginRight: 22 }}>{q.n}</span>{q.k}</>} p={p} size={q.k.length > 9 ? 92 : 108} de="esq" t={t} />
                <Palavra x={196} y={700 + i * 220} texto={q.s} p={S(t, c[q.at] + 0.25)} size={48} tom="verde" t={t} />
              </React.Fragment>
            );
          })}
        </div>
      </Camera>
      <Title p={prog(t, c.a_cara - 0.25, 0.25) * (1 - prog(t, c.a_tres - 0.4, 0.15))}>NÃO É <span style={{ color: W }}>PREÇO</span> NEM TAMANHO</Title>
      <Title p={prog(t, c.a_tres - 0.2, 0.25)}>TRÊS COISAS QUE <span style={{ color: G }}>PARAM</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.b_tour - 0.5, 0.3);
  const ph = prog(t, c.b_pronto - 0.3, 0.25, ease.inOut);
  const rec = t > c.b_reel - 0.3 && Math.sin(t * 8) > -0.3;
  const out = prog(t, c.c_peg - 0.5, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={7} t={t} keys={[{ t: c.b_tour - 0.5, s: 1.04, y: -4 }, { t: c.b_jan, s: 1.07, x: -2, y: -10, e: ease.out }, { t: c.b_praia, s: 1.05, x: 2, y: -14, e: ease.out }, { t: c.b_pronto, s: 1.09, y: -10, e: ease.out }, { t: c.c_peg, s: 1.05, y: -16, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Contorno x={30} y={400} texto="“" size={520} p={prog(t, c.b_tour - 0.3, 0.5)} t={t} />
          <Palavra x={120} y={560} texto="você abre" p={S(t, c.b_tour + 0.25)} size={84} tom="muted" t={t} />
          <Palavra x={120} y={660} texto="a JANELA" p={S(t, c.b_jan - 0.15)} size={130} tom="verde" de="zoom" t={t} />
          <Palavra x={120} y={820} texto="e enxerga a cidade inteira," p={S(t, c.b_cid - 0.3)} size={58} t={t} />
          <Palavra x={120} y={910} texto="com a PRAIA" p={S(t, c.b_praia - 0.2)} size={110} t={t} />
          <Palavra x={120} y={1040} texto="a poucos minutos." p={S(t, c.b_praia + 0.35)} size={58} tom="muted" t={t} />
        </div>
        <div style={{ opacity: ph }}>
          <Palavra x={0} y={600} texto="PRONTO." p={S(t, c.b_pronto - 0.15)} size={190} align="center" w={1080} de="zoom" t={t} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: fade(S(t, c.b_reel - 0.4)) }}>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: W, opacity: rec ? 1 : 0.2 }} />
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 52, color: C.text }}>REC · 1ª CENA DO REEL</span>
          </div>
          <Barra x={190} y={980} w={700} p={prog(t, c.b_reel, 0.6)} />
        </div>
      </Camera>
      <Title p={prog(t, c.b_tour - 0.2, 0.25)}>IMAGINA O <span style={{ color: G }}>TOUR</span></Title>
    </div>
  );
};

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = prog(t, c.c_peg - 0.5, 0.3);
  const ph = prog(t, c.d_term - 0.35, 0.3, ease.inOut);
  const ph3 = prog(t, c.e_real - 0.35, 0.3, ease.inOut);
  const shake = t > c.c_missao && t < c.c_missao + 0.8 ? Math.sin(t * 60) * 6 : 0;
  const out = prog(t, c.cta_quer - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out), overflow: "hidden" }}>
      <Camera drift={7} t={t} keys={[{ t: c.c_peg - 0.5, s: 1.04, y: -4 }, { t: c.c_prop, s: 1.06, x: 2, y: -10, e: ease.out }, { t: c.c_missao, s: 1.09, x: -2, y: -14, e: ease.out }, { t: c.d_term, s: 1.04, y: -6, e: ease.out }, { t: c.d_vivo, s: 1.08, y: -14, e: ease.out }, { t: c.cta_quer, s: 1.05, y: -18, e: ease.linear }]}>
        <div style={{ opacity: 1 - ph }}>
          <Palavra x={110} y={540} texto="PROPRIETÁRIO:" p={S(t, c.c_prop - 0.25)} size={56} mono t={t} />
          <Palavra x={110} y={650} texto="PESSOA COMUM" p={S(t, c.c_comum - 0.15)} size={100} tom="verde" de="esq" t={t} />
          <Palavra x={110} y={790} texto="ou…" p={S(t, c.c_alg - 0.2)} size={70} tom="muted" t={t} />
          <div style={{ transform: `translateX(${shake}px)` }}>
            <Palavra x={110} y={890} texto="MISSÃO" p={S(t, c.c_missao - 0.15)} size={160} tom="warn" de="zoom" t={t} />
            <Palavra x={110} y={1060} texto="CRIMINOSA" p={S(t, c.c_crim)} size={92} tom="warn" rot={-2} t={t} />
          </div>
        </div>
        <div style={{ opacity: ph * (1 - ph3) }}>
          <Palavra x={110} y={540} texto="CAPTAÇÃO" p={S(t, c.d_term - 0.25)} size={130} t={t} />
          <Risco x={100} y={605} w={720} p={prog(t, c.d_term + 0.15, 0.35)} />
          <Palavra x={110} y={710} texto="antes do 1º encontro" p={S(t, c.d_enc - 0.25)} size={60} tom="muted" t={t} />
          <Palavra x={110} y={860} texto="PRIORIDADE:" p={S(t, c.d_prio - 0.15)} size={54} mono t={t} />
          <Palavra x={110} y={950} texto="CONTINUAR VIVO." p={S(t, c.d_vivo - 0.15)} size={100} tom="verde" de="zoom" t={t} />
        </div>
        <div style={{ opacity: ph3 }}>
          <Palavra x={110} y={600} texto="NA VIDA REAL," p={S(t, c.e_real - 0.25)} size={84} t={t} />
          <Palavra x={110} y={720} texto="captação pede" p={S(t, c.e_real + 0.35)} size={64} tom="muted" t={t} />
          <Palavra x={110} y={820} texto="ORGANIZAÇÃO." p={S(t, c.e_org - 0.15)} size={100} tom="verde" de="baixo" t={t} />
          <Barra x={110} y={960} w={820} p={prog(t, c.e_org + 0.25, 0.6)} />
        </div>
      </Camera>
      <Title p={prog(t, c.c_peg - 0.2, 0.25) * (1 - prog(t, c.d_term - 0.45, 0.15))}>A <span style={{ color: W }}>PEGADINHA</span></Title>
      <Title p={prog(t, c.d_term - 0.25, 0.25) * (1 - prog(t, c.e_real - 0.45, 0.15))}>A CAPTAÇÃO <span style={{ color: W }}>TERMINARIA</span></Title>
      <Title p={prog(t, c.e_real - 0.25, 0.25)}>E NA <span style={{ color: G }}>VIDA REAL?</span></Title>
    </div>
  );
};
