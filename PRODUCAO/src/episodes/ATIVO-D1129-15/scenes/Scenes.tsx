import React from "react";
import { F } from "../../../theme";
import { clamp01, ease, mix, prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { A, aa } from "../../NOV26/kit";
import {
  Balao, Barra, Calendario, CamCartoon, Carimbo, Casa, Chave, Check, type Clima, Confete, Contador, Etiqueta, Figurante, Flash, Fumaca, Holofote,
  Moedas, Personagem, Pop, Predio, Proibido, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1129-15 — "Dezembro não é mês morto" (grade 29/11/2026 · 15h · CORRETOR NA VIDA REAL · PRIMEIRO MODELO, Cartoon explicativo).
 * Placa "VOLTO EM JANEIRO" → MÊS MORTO? → 13º (Dieese, R$ 399,1 bi em 2026) → prazos 30/11 e 18/12 → melhor dezembro do SBPE (Abecip, 2024)
 * → aluguel no começo do ano → "não some, decide" → telefone na praia → "Férias, sim. Sumiço, não." → fecho SISTEMA (CTA curta).
 * Apuração no episode.json (13º = volume do ano; recorde da Abecip em valor; aluguel sem percentual). Personagens ilustrativos.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

const B_FERIAS = { ...VIS.B, terno: "#4C7FB8", sombraTerno: "#3D6694", camisa: "#4C7FB8", gravata: undefined };
const CRIANCA = { ...VIS.comprador, terno: "#B5483A", sombraTerno: "#93392E", camisa: "#B5483A", pele: "#9A6444", cabelo: "#151012", cabeloTipo: "curto" as const };
const MAE = { ...VIS.comprador, pele: "#EEC3A0", cabelo: "#6A3B20" };
const FIG = ["#6B7080", "#7D6B5E", "#5E6E80", "#806070", "#6E7A6A", "#7A6E8A"];

/** Placa de porta "VOLTO EM JANEIRO" pendurada por um cordão. Centro do topo em (0,0). */
const Placa: React.FC<{ balanco?: number }> = ({ balanco = 0 }) => (
  <g transform={`rotate(${balanco})`}>
    <path d="M-90 0 L0 -70 L90 0" fill="none" stroke="#2A2D33" strokeWidth={6} />
    <circle cx={0} cy={-70} r={10} fill="#2A2D33" />
    <rect x={-170} y={0} width={340} height={150} rx={18} fill="#000" opacity={0.35} transform="translate(8 10)" />
    <rect x={-170} y={0} width={340} height={150} rx={18} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
    <text x={0} y={62} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={46} fill="#111">VOLTO EM</text>
    <text x={0} y={118} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={46} fill="#D2392E">JANEIRO</text>
  </g>
);
const Mala: React.FC = () => (
  <g>
    <rect x={-50} y={-120} width={100} height={30} rx={14} fill="none" stroke="#3A2416" strokeWidth={10} />
    <rect x={-80} y={-100} width={160} height={110} rx={16} fill="#7D4E2D" />
    <rect x={10} y={-100} width={70} height={110} rx={16} fill="#000" opacity={0.15} />
    <rect x={-80} y={-60} width={160} height={10} fill="#3A2416" opacity={0.6} />
  </g>
);
const Caixa: React.FC<{ w?: number; h?: number }> = ({ w = 150, h = 120 }) => (
  <g>
    <ellipse cx={0} cy={4} rx={w * 0.6} ry={12} fill="#000" opacity={0.35} />
    <rect x={-w / 2} y={-h} width={w} height={h} fill="#B98A55" />
    <rect x={w * 0.12} y={-h} width={w * 0.38} height={h} fill="#000" opacity={0.1} />
    <rect x={-14} y={-h} width={28} height={h} fill="#D9B37A" />
  </g>
);
const Celular: React.FC<{ t: number; toca: number }> = ({ t, toca }) => {
  const vib = toca > 0 ? Math.sin(t * 60) * 4 * toca : 0;
  return (
    <g transform={`translate(${vib} 0)`}>
      <rect x={-42} y={-80} width={84} height={160} rx={16} fill="#111" stroke="#fff" strokeWidth={5} />
      <rect x={-32} y={-64} width={64} height={120} rx={8} fill={toca > 0 ? A.hex : "#2C3E66"} />
      {toca > 0 ? [0, 1].map((k) => {
        const ph = (t * 1.6 + k * 0.5) % 1;
        return <path key={k} d={`M${60 + ph * 40} -40 Q${80 + ph * 50} 0 ${60 + ph * 40} 40`} fill="none" stroke="#fff" strokeWidth={6} opacity={(1 - ph) * toca} strokeLinecap="round" />;
      }) : null}
    </g>
  );
};
const CadeiraPraia: React.FC = () => (
  <g>
    <ellipse cx={0} cy={6} rx={170} ry={20} fill="#000" opacity={0.35} />
    <path d="M-130 0 L60 -240 M130 0 L-40 -160" stroke="#8C6A4A" strokeWidth={14} strokeLinecap="round" />
    <path d="M-110 -40 L80 -250 L120 -210 L-60 -10 Z" fill="#4C7FB8" />
    {[0, 1, 2].map((k) => <path key={k} d={`M${-90 + k * 50} ${-62 - k * 55} L${-60 + k * 50} ${-35 - k * 55}`} stroke="#E9E2D6" strokeWidth={14} />)}
  </g>
);
/** Linha de fonte (mono, discreta) no fim do palco superior. */
const Fonte: React.FC<{ t: number; at: number; texto: string }> = ({ t, at, texto }) => {
  const k = prog(t, at, 0.3, ease.out);
  return k <= 0 ? null : (
    <div style={{ position: "absolute", left: 0, right: 0, top: 850, textAlign: "center", opacity: k, fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.12em", color: "#E8EAED", WebkitTextStroke: "6px #0A0A0C", paintOrder: "stroke fill" }}>{texto}</div>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const w = (re: RegExp, seg: string, fb: number) => {
    for (const k of tl.captions) if (k.seg === seg) for (const x of k.words) if (re.test(x.text)) return x.start;
    return fb;
  };
  const tAfinal = w(/^afinal/i, "s2", 4.7);
  const tE8 = w(/^é$/i, "s8", 32.2);
  const tNao7 = w(/^não$/i, "s7", 29.9);
  const t1 = c.h_placa - 0.3;
  const t2 = tAfinal - 0.1;
  const t3 = c.d_decimo - 0.08;
  const t4 = c.d_400 - 0.25;
  const t5 = c.d_prazo - 0.1;
  const t6 = c.c_fin - 0.12;
  const t7 = c.c_2024 - 0.15;
  const t8 = c.a_aluguel - 0.12;
  const t9 = c.a_contratos - 0.25;
  const t10 = c.v_ouseja - 0.1;
  const t11 = tE8 - 0.1;
  const t12 = c.f_janeiro - 0.1;
  const t13 = c.f_ferias - 0.15;
  const tFim = c.cta_quer - 0.05;

  return [
    {
      id: "1 todo ano, em dezembro", a: 0, b: t1, clima: "evento", vin: 0.78, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={360} chao={FLOOR} w={460} p={prog(t, 0, 0.3)} />
          <g transform={`translate(800 ${FLOOR})`}><Predio w={340} h={600} /></g>
          <Pop t={t} at={0.1} x={360} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.86} v={B_FERIAS} acentos={ac} seed={2} humor="feliz" braco={gesto(t, c.h_dez, 10, 60)} /></Pop>
          <Pop t={t} at={c.h_dez - 0.05} x={540} y={600}><Calendario mes="DEZ" /></Pop>
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="TODO FIM DE ANO" />,
    },
    {
      id: "2 a plaquinha", a: t1, b: t2, clima: "evento", vin: 0.8, hits: [c.h_volto + 0.05], punch: [{ at: c.h_volto, s: 1.05, y: 20 }],
      svg: (t) => {
        const sai = prog(t, c.h_volto + 0.4, 0.9, ease.in);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={520} />
            <rect x={330} y={380} width={420} height={1160} rx={10} fill="#5A3A2A" />
            <rect x={330} y={380} width={140} height={1160} fill="#000" opacity={0.12} />
            <circle cx={700} cy={1000} r={18} fill="#E0A43A" />
            <Pop t={t} at={c.h_placa - 0.05} x={540} y={520}><Placa balanco={Math.sin(t * 3) * 3 * (1 - prog(t, c.h_placa + 1.2, 0.6))} /></Pop>
            <g transform={`translate(${mix(250, 1150, sai)} ${FLOOR})`}>
              <Personagem t={t} x={0} y={0} s={0.84} v={B_FERIAS} acentos={ac} seed={2} humor="feliz" braco={gesto(t, c.h_placa - 0.1, 10, 140)} />
              <g transform="translate(150 -40)"><Mala /></g>
            </g>
          </>
        );
      },
    },
    {
      id: "3 mês morto? será?", a: t2, b: t3, clima: "pergunta", vin: 0.88, hits: [c.h_morto], punch: [{ at: c.h_morto, s: 1.06, y: 10 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 80} w={560} />
          <Personagem t={t} x={540} y={FLOOR + 90} s={1.05} v={VIS.A} acentos={ac} humor="espanto" braco={gesto(t, c.h_sera - 0.05, 10, 150)} bracoE={-30} />
          <Pop t={t} at={c.h_sera} x={240} y={740}><Balao texto="?" /></Pop>
          <Pop t={t} at={c.h_sera + 0.2} x={840} y={700}><Balao texto="?" cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_morto} x={540} y={520} texto="MÊS MORTO?" size={78} rot={-6} />,
    },
    {
      id: "4 o 13º chega", a: t3, b: t4, clima: "dados", vin: 0.78, push: 0.015,
      svg: (t) => (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <Pop key={i} t={t} at={t3 + 0.08 + i * 0.09} x={120 + i * 105} y={FLOOR - (i % 2) * 30}><Figurante x={0} y={0} s={0.72} cor={FIG[i % FIG.length]} t={t} seed={i} /></Pop>
          ))}
          {Array.from({ length: 14 }, (_, i) => {
            const at = c.d_decimo + 0.2 + (i % 7) * 0.12;
            const y = mix(260, 1180, clamp01((t - at) / 0.9)) ;
            return t < at ? null : <g key={i} transform={`translate(${110 + ((i * 137) % 860)} ${y}) rotate(${(t - at) * 200 + i * 30})`}><ellipse rx={34} ry={12} fill="#A8761E" /><ellipse rx={34} ry={12} cy={-6} fill="#E0A43A" /></g>;
          })}
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="13º SALÁRIO" cor="green" />,
    },
    {
      id: "5 quase 400 bilhões", a: t4, b: t5, clima: "dados", vin: 0.75, hits: [c.d_400 + 0.1], punch: [{ at: c.d_400, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Pop t={t} at={c.d_400 + 0.15} x={540} y={FLOOR - 20}><g transform="scale(1.6)"><Moedas /></g></Pop>
          {Array.from({ length: 6 }, (_, i) => (
            <Pop key={i} t={t} at={c.d_economia + i * 0.1} x={i < 3 ? 130 + i * 80 : 710 + (i - 3) * 80} y={FLOOR}><Figurante x={0} y={0} s={0.6} cor={FIG[(i + 2) % FIG.length]} t={t} seed={i + 4} /></Pop>
          ))}
        </>
      ),
      html: (t) => (
        <>
          <Contador t={t} at={c.d_400 - 0.05} de={0} ate={399.1} casas={1} x={540} y={560} prefixo="R$ " sufixo=" BI" size={124} cor="green" />
          <Etiqueta t={t} at={c.d_economia} x={540} y={720} texto="NA ECONOMIA EM 2026" cor="white" />
          <Fonte t={t} at={c.d_dieese - 0.1} texto="FONTE: DIEESE · ESTIMATIVA NOV/2026" />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4} texto="13º SALÁRIO" cor="green" />,
    },
    {
      id: "6 prazos até 18 de dezembro", a: t5, b: t6, clima: "dados", vin: 0.78, hits: [c.d_18 + 0.05],
      svg: (t) => (
        <>
          <Pop t={t} at={t5 + 0.08} x={540} y={640}><g transform="scale(1.1)"><Calendario mes="DEZEMBRO" cor="#2C3E66" /></g></Pop>
          <Pop t={t} at={c.d_18} x={690} y={740}><Check r={46} /></Pop>
          <Holofote x={300} chao={FLOOR} w={420} />
          <Pop t={t} at={t5 + 0.15} x={300} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.84} v={VIS.A} acentos={ac} humor="neutro" braco={gesto(t, c.d_18 - 0.1, 10, 75)} olhar={1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_prazo + 0.35} x={540} y={425} texto="1ª PARCELA · ATÉ 30/11" cor="dark" size={34} />
          <Etiqueta t={t} at={c.d_18} x={540} y={850} texto="2ª PARCELA · ATÉ 18/12" cor="green" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t5} texto="O PRAZO DO 13º" />,
    },
    {
      id: "7 financiamento com poupança", a: t6, b: t7, clima: "explica", vin: 0.75, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={330} chao={FLOOR} w={460} />
          <Pop t={t} at={t6 + 0.1} x={740} y={FLOOR}><Casa w={360} /></Pop>
          <Pop t={t} at={t6 + 0.05} x={330} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.86} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.c_poup - 0.1, 15, 115)} item={t > c.c_poup - 0.15 ? <Chave /> : null} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_fin} x={540} y={470} texto="FINANCIAMENTO" cor="white" size={44} />
          <Etiqueta t={t} at={c.c_poup} x={540} y={580} texto="COM DINHEIRO DA POUPANÇA" cor="dark" size={34} />
        </>
      ),
    },
    {
      id: "8 o melhor dezembro", a: t7, b: t8, clima: "dados", vin: 0.75, hits: [c.c_melhor + 0.05], punch: [{ at: c.c_melhor, s: 1.05, y: -10 }],
      svg: (t) => (
        <>
          <line x1={250} y1={1230} x2={830} y2={1230} stroke="#fff" strokeWidth={6} opacity={0.5} />
          <Barra t={t} at={c.c_2024 - 0.05} x={400} base={1230} w={170} h={330} cor="#6B7080" rotulo="NOV" />
          <Barra t={t} at={c.c_2024 + 0.3} x={680} base={1230} w={170} h={390} rotulo="DEZ" />
          <text x={540} y={1340} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff" opacity={prog(t, c.c_2024, 0.3)} style={{ paintOrder: "stroke fill", stroke: "#0A0A0C", strokeWidth: 8 }}>2024</text>
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.c_melhor} x={540} y={520} texto="MELHOR DEZEMBRO" sub="DA SÉRIE HISTÓRICA" cor="green" size={64} rot={-6} />
          <Fonte t={t} at={c.c_melhor + 0.3} texto="FONTE: ABECIP · SBPE, EM VOLUME" />
        </>
      ),
      selo: (t) => <Selo t={t} at={t7} texto="CRÉDITO IMOBILIÁRIO" />,
    },
    {
      id: "9 aluguel no começo do ano", a: t8, b: t9, clima: "explica", vin: 0.75, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Pop t={t} at={t8 + 0.05} x={420} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.86} v={MAE} seed={3} acentos={ac} humor="neutro" braco={gesto(t, c.a_subir - 0.1, 10, 140)} /></Pop>
          <Pop t={t} at={t8 + 0.2} x={640} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.56} v={CRIANCA} seed={5} humor="feliz" flip /></Pop>
          <Pop t={t} at={t8 + 0.3} x={150} y={FLOOR}><Caixa /></Pop>
          <Pop t={t} at={t8 + 0.38} x={150} y={FLOOR - 120}><Caixa w={120} h={90} /></Pop>
          <Pop t={t} at={t8 + 0.46} x={880} y={FLOOR}><Caixa w={170} h={130} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_aluguel} x={540} y={480} texto="ALUGUEL" cor="white" size={48} />
          <Etiqueta t={t} at={c.a_subir} x={540} y={610} texto="PROCURA ↑ NO COMEÇO DO ANO" cor="green" size={34} />
          <Fonte t={t} at={c.a_subir + 0.3} texto="FONTE: PORTAIS DE ALUGUEL" />
        </>
      ),
    },
    {
      id: "10 contratos vencem, aulas voltam", a: t9, b: t10, clima: "explica", vin: 0.78, flash: t9,
      svg: (t) => (
        <>
          <Pop t={t} at={t9 + 0.05} x={540} y={600}><g transform="scale(1.1)"><Calendario mes="JANEIRO" cor="#2C3E66" /></g></Pop>
          <Holofote x={540} chao={FLOOR} w={520} />
          <Pop t={t} at={t9 + 0.1} x={420} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.84} v={MAE} seed={3} acentos={ac} humor="feliz" /></Pop>
          <Pop t={t} at={t9 + 0.15} x={640} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.56} v={CRIANCA} seed={5} humor="feliz" flip braco={gesto(t, c.a_aulas, 10, 140)} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_contratos} x={290} y={830} texto="CONTRATOS VENCEM" cor="dark" size={34} />
          <Etiqueta t={t} at={c.a_aulas} x={790} y={830} texto="VOLTA ÀS AULAS" cor="white" size={34} />
        </>
      ),
    },
    {
      id: "11 o cliente não some", a: t10, b: t11, clima: "conflito", vin: 0.9, hits: [c.v_some + 0.05], punch: [{ at: c.v_some, s: 1.05 }],
      svg: (t) => {
        const some = prog(t, c.v_some - 0.05, 0.25);
        const volta = prog(t, c.v_some + 0.25, 0.3, ease.out);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={520} cor="#FFD9D4" />
            <g opacity={1 - 0.7 * some + 0.7 * volta}>
              <Personagem t={t} x={540} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.v_some + 0.25 ? "neutro" : "espanto"} />
            </g>
            <g transform={`translate(540 1260)`}><Fumaca t={t} at={c.v_some - 0.05} r={160} /></g>
          </>
        );
      },
      html: (t) => (
        <>
          <Carimbo t={t} at={tNao7} x={540} y={520} texto="NÃO SOME" cor="red" size={74} rot={-6} />
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}><Proibido t={t} at={c.v_some + 0.05} x={540} y={1250} r={150} /></svg>
        </>
      ),
      selo: (t) => <Selo t={t} at={t10} texto="OU SEJA" />,
    },
    {
      id: "12 ele decide", a: t11, b: t12, clima: "ganho", vin: 0.6, hits: [c.v_decide + 0.03], punch: [{ at: c.v_decide, s: 1.07, y: -10 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} cor={aa(1)} />
          <Personagem t={t} x={430} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.v_decide - 0.12, 10, 85)} />
          <Pop t={t} at={c.v_decide - 0.05} x={780} y={FLOOR}><Casa w={260} /></Pop>
          <Pop t={t} at={c.v_decide + 0.05} x={780} y={1220}><Check r={50} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_decide} x={540} y={540} texto="MÊS DA DECISÃO" cor="green" size={70} rot={-6} />,
    },
    {
      id: "13 em janeiro, a ligação", a: t12, b: t13, clima: "explica", vin: 0.72, push: 0.015, hits: [c.f_ligar],
      svg: (t) => {
        const toca = prog(t, c.f_ligar - 0.1, 0.2);
        return (
          <>
            <Holofote x={380} chao={FLOOR} w={520} />
            <g transform={`translate(380 ${FLOOR})`}><CadeiraPraia /></g>
            <Personagem t={t} x={380} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_ligar - 0.1, 15, 120)} item={<g transform="scale(0.8)"><Celular t={t} toca={toca} /></g>} />
            <Pop t={t} at={c.f_janeiro} x={830} y={640}><g transform="scale(0.9)"><Calendario mes="JAN" cor="#2C3E66" /></g></Pop>
            <g transform={`translate(860 ${FLOOR})`} opacity={0.85}><Personagem t={t} x={0} y={0} s={0.62} v={B_FERIAS} seed={2} humor="espanto" flip /></g>
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.f_ligar} x={540} y={430} texto="QUEM RESPONDEU EM DEZEMBRO" cor="green" size={34} />,
    },
    {
      id: "14 férias, sim; sumiço, não", a: t13, b: tFim, clima: "ganho", vin: 0.6, hits: [c.f_ferias + 0.03, c.f_sumico + 0.03], punch: [{ at: c.f_ferias, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 80} w={560} cor={aa(1)} />
          <Personagem t={t} x={540} y={FLOOR + 90} s={1.05} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_ferias - 0.1, 15, 150)} item={<g transform="scale(0.8)"><Celular t={t} toca={0} /></g>} />
          <Confete t={t} at={c.f_ferias} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_ferias} x={540} y={470} texto="FÉRIAS, SIM." cor="green" size={78} rot={-6} />
          <Carimbo t={t} at={c.f_sumico} x={540} y={700} texto="SUMIÇO, NÃO." cor="red" size={64} rot={4} />
        </>
      ),
    },
  ];
};

export const Planos: React.FC<{ t: number; shots: Shot[] }> = ({ t, shots }) => {
  const s = shots.find((q) => t >= q.a && t < q.b);
  if (!s) return null;
  return (
    <>
      <Raios t={t} clima={s.clima} vin={s.vin} />
      <CamCartoon t={t} t0={s.a} push={s.push} punch={s.punch} hits={s.hits}>
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>{s.svg?.(t)}</svg>
        {s.html?.(t)}
      </CamCartoon>
      {s.selo?.(t)}
      {s.flash !== undefined ? <Flash t={t} at={s.flash} /> : null}
    </>
  );
};

export { pop };
