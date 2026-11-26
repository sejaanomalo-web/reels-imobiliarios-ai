import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, aa, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1208-21 — "A janela" (grade 08/12/2026 · 21h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: dois quartos de hospital iguais em linha fina (janela para a parede de tijolos × janela para árvores) →
 * 1984, quartos iguais → quem via árvores teve alta quase um dia antes (a janela das árvores acende) → a visita: não passe
 * correndo; pare, abra a cortina (as cortinas correm e a vista acende) → a vista não está na planta, mora com a pessoa → CtaNoir.
 * Apuração: Ulrich (1984), Science — 46 pacientes, 7,96 × 8,70 dias; estudo observacional de um hospital (selo na tela).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const LINHA = "rgba(244,244,242,0.55)";

/** Janela em linha fina com o que se vê por ela. */
const Janela: React.FC<{ x: number; y: number; w: number; h: number; vista: "parede" | "arvores"; p?: number; acesa?: number; cortina?: number }> = ({ x, y, w, h, vista, p = 1, acesa = 0, cortina = 1 }) => {
  const cor = acesa > 0.5 ? A.hex : LINHA;
  const tij: React.ReactNode[] = [];
  if (vista === "parede") {
    for (let r = 0; r < 7; r++) {
      const yy = y + 10 + r * (h - 20) / 7;
      tij.push(<line key={`h${r}`} x1={x + 8} y1={yy} x2={x + w - 8} y2={yy} />);
      for (let k = 0; k < 4; k++) { const xx = x + 8 + ((k + (r % 2) * 0.5) * (w - 16)) / 4; tij.push(<line key={`v${r}-${k}`} x1={xx} y1={yy} x2={xx} y2={yy + (h - 20) / 7} />); }
    }
  }
  const arv = [[0.3, 0.55, 0.22], [0.62, 0.45, 0.28], [0.85, 0.62, 0.16]];
  const fecha = (1 - cortina) * (w / 2);
  return (
    <g opacity={p}>
      <g stroke={vista === "parede" ? "rgba(200,120,100,0.55)" : cor} strokeWidth={2} fill="none">
        {vista === "parede" ? tij : arv.map(([fx, fy, fr], i) => (
          <g key={i}>
            <circle cx={x + fx * w} cy={y + fy * h} r={fr * w * 0.5} fill={acesa > 0.5 ? aa(0.08) : "none"} />
            <line x1={x + fx * w} y1={y + fy * h + fr * w * 0.5} x2={x + fx * w} y2={y + h - 6} />
          </g>
        ))}
      </g>
      {cortina < 1 && (
        <g fill="rgba(20,20,20,0.96)" stroke={LINHA} strokeWidth={2}>
          <rect x={x} y={y} width={fecha} height={h} />
          <rect x={x + w - fecha} y={y} width={fecha} height={h} />
        </g>
      )}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={cor} strokeWidth={4} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={cor} strokeWidth={2} opacity={0.5} />
    </g>
  );
};
const Leito: React.FC<{ x: number; t: number; tom: "luz" | "cinza" | "verde"; p?: number }> = ({ x, t, tom, p = 1 }) => (
  <g opacity={p}>
    <rect x={x - 130} y={CHAO - 120} width={260} height={30} rx={6} fill="none" stroke={LINHA} strokeWidth={3} />
    <line x1={x - 120} y1={CHAO - 90} x2={x - 120} y2={CHAO} stroke={LINHA} strokeWidth={3} />
    <line x1={x + 120} y1={CHAO - 90} x2={x + 120} y2={CHAO} stroke={LINHA} strokeWidth={3} />
    <Figura t={t} x={x} y={CHAO - 120} s={0.6} pose="deitado" tom={tom} respira />
  </g>
);

/* ---------------------------------------------------------------- 1 · os dois quartos ---------------------------------------------------------------- */
export const Quartos: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.a_correndo - 1.0, 0.5);
  if (on <= 0.001) return null;
  const dois = prog(t, c.e_iguais - 0.3, 0.8, ease.inOut);
  const alta = prog(t, c.v_alta - 0.2, 0.6);
  const xJ = mix(540, 290, dois);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.08, y: -10 }, { t: c.e_1984, s: 1.0, e: ease.out }, { t: c.d_arvores, s: 1.03 }, { t: c.v_dia + 0.4, s: 1.05, x: -20, y: -10, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={790} chao={CHAO} w={460} p={alta * 0.85} cor={A.hex} />
          {alta > 0 && <Halo x={790} y={720} r={300} p={0.35 * alta} cor={A.hex} />}
          <Janela x={xJ - 150} y={600} w={300} h={240} vista={t > c.d_parede - 0.3 || dois > 0.5 ? "parede" : "arvores"} p={surge(t, 0.1)} />
          <g opacity={dois}><Janela x={790 - 150} y={600} w={300} h={240} vista="arvores" acesa={alta} p={prog(t, c.d_arvores - 0.3, 0.6) * 0.75 + 0.25} /></g>
          <Leito x={xJ} t={t} tom={alta > 0.5 ? "cinza" : "luz"} p={surge(t, c.h_internacao - 0.3)} />
          <g opacity={dois}><Leito x={790} t={t} tom={alta > 0.5 ? "verde" : "luz"} /></g>
          <g opacity={surge(t, c.h_internacao - 0.2) * (1 - dois)}><Icone t={t} nome="calendario" x={820} y={720} r={56} tom="branco" /></g>
        </Svg>
        <Pilula t={t} at={c.e_1984 - 0.05} ate={c.v_alta - 0.35} x={540} y={540} texto="ULRICH · SCIENCE · 1984 · 46 PACIENTES" tom="cinza" size={24} />
        <Pilula t={t} at={c.d_parede - 0.05} x={290} y={890} texto="PAREDE DE TIJOLOS" tom="cinza" size={26} />
        <Pilula t={t} at={c.d_arvores - 0.05} x={790} y={890} texto="ÁRVORES" tom="verde" size={26} />
        <Pilula t={t} at={c.v_alta - 0.05} x={790} y={960} texto="ALTA QUASE 1 DIA ANTES" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.e_1984 - 0.4} linhas={[{ texto: "UMA JANELA", size: 72 }, { texto: "E A INTERNAÇÃO", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.e_1984 - 0.25} ate={c.v_alta - 0.4} linhas={[{ texto: "QUARTOS IGUAIS", size: 64 }, { texto: "VISTAS DIFERENTES", cor: "verde", size: 80 }]} top={300} />
      <TituloNoir t={t} at={c.v_alta - 0.25} ate={c.a_correndo - 1.0} linhas={[{ texto: "EM MÉDIA,", size: 64 }, { texto: "ALTA ANTES", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a visita para na janela ---------------------------------------------------------------- */
export const Visita: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.a_correndo - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const corre = prog(t, c.a_correndo - 0.6, 1.0, ease.inOut);
  const para = prog(t, c.a_pare - 0.2, 0.6, ease.out);
  const abre = prog(t, c.a_cortina - 0.1, 0.9, ease.inOut);
  const olha = prog(t, c.a_olhar - 0.2, 0.6);
  const fim = prog(t, c.f_planta - 0.2, 0.8, ease.out);
  const xC = para > 0 ? mix(mix(120, 900, corre), 380, para) : mix(120, 900, corre);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.a_correndo - 1.1} push={0.005} keys={[{ t: c.a_correndo - 1.1, s: 1.05 }, { t: c.a_pare, s: 1.0, e: ease.out }, { t: c.a_olhar, s: 1.06, y: -20, e: ease.out }, { t: c.f_mora + 0.6, s: 1.02 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 700, olha)} p={0.85} cor={olha > 0.5 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={700} r={mix(260, 400, fim)} p={0.45 * abre} cor={A.hex} />
          <Janela x={540 - 210} y={540} w={420} h={320} vista="arvores" cortina={abre} acesa={olha} />
          <Figura t={t} x={xC} y={CHAO} s={0.8} pose={corre > 0.02 && corre < 0.98 && para < 0.5 ? "andando" : para > 0.5 && abre < 0.98 ? "apontando" : "pe"} flip={para > 0.3} tom={para > 0.5 ? "luz" : "cinza"} />
          <Figura t={t} x={mix(700, 600, olha)} y={CHAO} s={0.8} pose={olha > 0.5 ? (fim > 0.5 ? "bracosAbertos" : "pe") : "pe"} tom={olha > 0.5 ? "verde" : "luz"} fase={0.6} />
          <g opacity={fim}><Icone t={t} nome="documento" x={860} y={980} r={46} tom="cinza" /></g>
        </Svg>
        <Pilula t={t} at={c.a_correndo - 0.05} ate={c.a_pare - 0.2} x={540} y={930} texto="NÃO PASSE CORRENDO" tom="vermelho" size={28} />
        <Pilula t={t} at={c.a_cortina - 0.05} ate={c.f_planta - 0.3} x={540} y={930} texto="ABRA A CORTINA" tom="verde" size={28} />
        <Pilula t={t} at={c.f_planta - 0.05} x={860} y={1060} texto="NÃO ESTÁ NA PLANTA" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.a_correndo - 0.9} ate={c.a_pare - 0.4} linhas={[{ texto: "NA VISITA", size: 72 }, { texto: "PELA JANELA…", cor: "branco", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.a_pare - 0.25} ate={c.f_planta - 0.4} linhas={[{ texto: "PARE.", size: 72 }, { texto: "DEIXE OLHAR", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f_planta - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "A VISTA", size: 72 }, { texto: "MORA COM ELE", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
