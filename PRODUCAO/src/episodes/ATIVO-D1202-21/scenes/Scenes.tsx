import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1202-21 — "A visita maior que a foto" (grade 02/12/2026 · 21h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a moldura da foto brilha diante da figura (a foto vende a visita) → promete demais: estica a sala, troca o
 * céu, esconde a parede → travelling até a porta: o cômodo é menor que a foto, a figura encolhe e a lupa acha defeito em
 * tudo → o contrário: a foto honesta, o cômodo igual à foto, a luz cresce → guarde para o ao vivo: luz da tarde, vista,
 * silêncio → a visita fica maior que a foto → fecho CtaNoir. Tese por raciocínio; pictogramas ilustrativos.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW = "drop-shadow(0 0 12px rgba(255,255,255,0.5))";
const GLOW_V = `drop-shadow(0 0 12px ${aa(0.6)})`;
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** A foto do anúncio: moldura com a sala em linha (janela, sofá, piso). `estica` alarga a sala; `ceu` acende um sol falso. */
const Foto: React.FC<{ x: number; y: number; w?: number; h?: number; p: number; estica?: number; ceu?: number; angulo?: number; verde?: boolean; brilho?: number }> = ({ x, y, w = 440, h = 320, p, estica = 0, ceu = 0, angulo = 0, verde = false, brilho = 1 }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const W = w * (1 + 0.45 * estica);
  const cor = verde ? A.hex : NOIR.branco;
  const x0 = x - W / 2, y0 = y - h / 2;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 24}) rotate(${angulo * -6} ${x} ${y})`}>
      <rect x={x0 - 14} y={y0 - 14} width={W + 28} height={h + 28} rx={8} fill="#0A0A0A" stroke={cor} strokeWidth={4} style={{ filter: verde ? GLOW_V : brilho > 0.5 ? GLOW : undefined }} />
      <line x1={x0} y1={y0 + h * 0.72} x2={x0 + W} y2={y0 + h * 0.72} stroke={NOIR.linhaFraca} strokeWidth={3} />
      <rect x={x0 + W * 0.58} y={y0 + h * 0.16} width={W * 0.3} height={h * 0.36} fill="none" stroke={cor} strokeWidth={3} />
      {ceu > 0.01 ? <g opacity={ceu}><circle cx={x0 + W * 0.73} cy={y0 + h * 0.3} r={18} fill="none" stroke={cor} strokeWidth={3} /></g> : null}
      <path d={`M ${x0 + W * 0.1} ${y0 + h * 0.72} L ${x0 + W * 0.1} ${y0 + h * 0.56} L ${x0 + W * 0.42} ${y0 + h * 0.56} L ${x0 + W * 0.42} ${y0 + h * 0.72}`} fill="none" stroke={cor} strokeWidth={3} />
      {angulo > 0.01 ? <rect x={x0 + W * 0.82} y={y0} width={W * 0.18 * angulo} height={h} fill="#0A0A0A" opacity={0.9} /> : null}
    </g>
  );
};
/** O cômodo real (porta à esquerda), em linha. */
const Comodo: React.FC<{ x: number; y: number; w: number; h: number; p: number; tom?: "branco" | "cinza" | "verde" }> = ({ x, y, w, h, p, tom = "branco" }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const cor = tom === "verde" ? A.hex : tom === "cinza" ? NOIR.cinza : NOIR.branco;
  return (
    <g opacity={k}>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="none" stroke={cor} strokeWidth={3} style={{ filter: tom === "verde" ? GLOW_V : undefined }} />
      <rect x={x + w * 0.1} y={y - h * 0.8} width={w * 0.3} height={h * 0.34} fill="none" stroke={cor} strokeWidth={3} />
    </g>
  );
};

/* ---------------------------------------------------------------- 1 · a foto e a promessa ---------------------------------------------------------------- */
export const Promessa: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.d_chega - 0.4, 0.5);
  if (on <= 0.001) return null;
  const estica = prog(t, c.p_lente - 0.1, 0.6, ease.out);
  const ceu = prog(t, c.p_ceu - 0.1, 0.4);
  const ang = prog(t, c.p_angulo - 0.1, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -20 }, { t: c.h_visita, s: 1.0, e: ease.out }, { t: c.p_lente, s: 1.03, y: -10 }, { t: c.p_angulo + 0.6, s: 1.06, y: -20 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={620} p={prog(t, 0, 0.6)} />
          <Halo x={540} y={730} r={360} p={0.6 * surge(t, c.h_foto - 0.3)} />
          <Foto x={540} y={730} w={400} h={270} p={surge(t, c.h_foto - 0.3, 0.6)} estica={estica} ceu={ceu} angulo={ang} />
          <Figura t={t} x={540} y={CHAO} pose={t > c.p_morre - 0.1 ? "cabisbaixo" : t > c.h_visita - 0.1 ? "apontando" : "pe"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.p_lente - 0.05} ate={c.d_chega - 0.5} x={250} y={960} texto="LENTE QUE ESTICA" tom="cinza" size={24} />
        <Pilula t={t} at={c.p_ceu - 0.05} ate={c.d_chega - 0.5} x={830} y={960} texto="CÉU TROCADO" tom="cinza" size={24} />
        <Pilula t={t} at={c.p_angulo - 0.05} ate={c.d_chega - 0.5} x={250} y={1040} texto="ÂNGULO QUE ESCONDE" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.h_visita - 0.25} linhas={[{ texto: "A FOTO NÃO VENDE", size: 64 }, { texto: "O IMÓVEL", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.h_visita - 0.1} ate={c.p_prometer - 0.3} linhas={[{ texto: "ELA VENDE", size: 72 }, { texto: "A VISITA", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.p_prometer - 0.1} ate={c.p_morre - 0.3} linhas={[{ texto: "SE PROMETE", size: 72 }, { texto: "DEMAIS", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.p_morre - 0.1} ate={c.d_chega - 0.5} linhas={[{ texto: "A VENDA MORRE", size: 72 }, { texto: "NA PORTA", cor: "vermelho", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a porta ---------------------------------------------------------------- */
export const Porta: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.d_chega - 0.5, c.v_contrario - 0.3, 0.5, 0.5);
  if (on <= 0.001) return null;
  const anda = prog(t, c.d_chega - 0.3, 1.6, ease.inOut);
  const abre = prog(t, c.d_outro - 0.5, 0.5);
  const defeito = surge(t, c.d_defeito - 0.15);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.d_chega} push={0.004} keys={[{ t: c.d_chega - 0.5, s: 1.0, x: 80 }, { t: c.d_outro, s: 1.04, x: -40, e: ease.inOut }, { t: c.d_tudo, s: 1.08, x: -60, y: -20, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(200, 620, anda)} chao={CHAO} w={460} p={0.8} cor={abre > 0.5 ? "#C9CED6" : "#FFFFFF"} />
          <g opacity={0.35}><Foto x={250} y={700} w={240} h={170} p={1} estica={1} ceu={1} brilho={0} /></g>
          <rect x={560} y={CHAO - 300} width={14} height={300} fill={NOIR.branco} opacity={1 - abre} />
          <Comodo x={760} y={CHAO} w={300} h={260} p={abre} tom="cinza" />
          <Figura t={t} x={mix(200, 560, anda)} y={CHAO} s={0.96} pose={anda > 0.02 && anda < 0.98 ? "andando" : abre > 0.5 ? "cabisbaixo" : "pe"} fase={t * 1.6} tom="luz" />
          <g opacity={defeito}>
            <Icone t={t} nome="lupa" x={700} y={760} r={42} />
            {[[640, 900], [820, 860], [880, 1010]].map(([x, y], i) => <g key={i} opacity={surge(t, c.d_defeito + 0.1 + i * 0.18)}><Icone t={t} nome="x" x={x} y={y} r={26} tom="vermelho" /></g>)}
          </g>
        </Svg>
        <Pilula t={t} at={c.d_chega} ate={c.v_contrario - 0.4} x={250} y={830} texto="O QUE A FOTO PROMETEU" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.d_chega - 0.1} ate={c.d_defeito - 0.4} linhas={[{ texto: "ESPERAVA UM", size: 72 }, { texto: "ENCONTROU OUTRO", cor: "vermelho", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.d_defeito - 0.2} ate={c.v_contrario - 0.4} linhas={[{ texto: "DEFEITO", cor: "vermelho", size: 96 }, { texto: "EM TUDO", size: 72 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · a foto honesta ---------------------------------------------------------------- */
export const Honesta: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_contrario - 0.4, c.g_mostre - 0.3, 0.6, 0.5);
  if (on <= 0.001) return null;
  const entra = prog(t, c.v_expectativa - 0.2, 1.4, ease.inOut);
  const surpresa = prog(t, c.v_surpreender - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_contrario} push={0.005} keys={[{ t: c.v_contrario - 0.4, s: 1.04 }, { t: c.v_honesta, s: 1.0, e: ease.out }, { t: c.v_surpreender, s: 1.05, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={720} chao={CHAO} w={520} p={0.5 + 0.4 * surpresa} cor={surpresa > 0.5 ? A.hex : "#FFFFFF"} />
          <Halo x={720} y={CHAO - 180} r={340} p={0.6 * surpresa} cor={A.hex} />
          <Foto x={290} y={620} w={300} h={220} p={surge(t, c.v_honesta - 0.2, 0.6)} brilho={0} />
          <Comodo x={720} y={CHAO} w={340} h={250} p={surge(t, c.v_honesta, 0.6)} tom={surpresa > 0.5 ? "verde" : "branco"} />
          <Figura t={t} x={mix(320, 720, entra)} y={CHAO} s={0.96} pose={surpresa > 0.5 ? "bracosAbertos" : entra > 0.02 && entra < 0.98 ? "andando" : "pe"} fase={t * 1.6} tom={surpresa > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.v_honesta} x={290} y={810} texto="FOTO = IMÓVEL" tom="branco" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_contrario - 0.1} ate={c.v_expectativa - 0.35} linhas={[{ texto: "O CONTRÁRIO", size: 72 }, { texto: "TAMBÉM ACONTECE", size: 76 }]} top={300} />
      <TituloNoir t={t} at={c.v_expectativa - 0.15} ate={c.v_surpreender - 0.35} linhas={[{ texto: "EXPECTATIVA", size: 72 }, { texto: "CERTA", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.v_surpreender - 0.15} ate={c.g_mostre - 0.4} linhas={[{ texto: "CHANCE DE", size: 72 }, { texto: "SURPREENDER", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4–5 · guarde para o ao vivo ---------------------------------------------------------------- */
const GUARDA = [{ at: "g_luz", txt: "LUZ DA TARDE", ic: "lampada" }, { at: "g_vista", txt: "A VISTA", ic: "predio" }, { at: "g_silencio", txt: "O SILÊNCIO", ic: "audio" }] as const;
export const AoVivo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.g_mostre - 0.4, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const maior = prog(t, c.f_maior - 0.2, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.g_mostre} push={0.005} keys={[{ t: c.g_mostre - 0.4, s: 1.04 }, { t: c.g_guarde, s: 1.0, e: ease.out }, { t: c.f_visita, s: 1.02 }, { t: c.f_maior + 0.4, s: 1.08, y: -20, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 760, maior)} p={0.85} cor={maior > 0.3 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 200} r={mix(300, 460, maior)} p={0.55 * maior} cor={A.hex} />
          <Comodo x={540} y={CHAO} w={mix(380, 640, maior)} h={mix(270, 420, maior)} p={1} tom={maior > 0.5 ? "verde" : "branco"} />
          <g opacity={1 - maior}><Foto x={850} y={620} w={200} h={150} p={surge(t, c.g_mostre - 0.2)} brilho={0} /></g>
          {GUARDA.map((g, i) => (
            <g key={g.txt} opacity={surge(t, c[g.at] - 0.15) * (1 - maior)}><Icone t={t} nome={g.ic} x={300 + i * 240} y={770} r={44} tom="branco" brilho /></g>
          ))}
          <Figura t={t} x={540} y={CHAO} pose={maior > 0.5 ? "comemorando" : t > c.g_guarde ? "apontando" : "pe"} tom={maior > 0.5 ? "verde" : "luz"} />
        </Svg>
        {GUARDA.map((g, i) => <Pilula key={g.txt} t={t} at={c[g.at] - 0.05} ate={c.f_maior - 0.3} x={300 + i * 240} y={860} texto={g.txt} tom="branco" size={24} />)}
        <Pilula t={t} at={c.g_mostre} ate={c.g_guarde - 0.2} x={540} y={760} texto="COMO ELE É" tom="branco" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.g_mostre - 0.1} ate={c.g_guarde - 0.3} linhas={[{ texto: "MOSTRE", size: 72 }, { texto: "COMO ELE É", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.g_guarde - 0.1} ate={c.f_visita - 0.3} linhas={[{ texto: "GUARDE PARA O", size: 64 }, { texto: "AO VIVO", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.f_visita - 0.1} ate={c.cta_quer - 0.3} linhas={[{ texto: "VISITA MAIOR", size: 76 }, { texto: "QUE A FOTO", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
