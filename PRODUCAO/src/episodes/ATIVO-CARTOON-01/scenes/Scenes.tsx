import React from "react";
import { C, F } from "../../../theme";
import { clamp01, ease, mix, prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { A, aa } from "../../NOV26/kit";
import {
  Avatar, Balanca, Balao, Calendario, CamCartoon, Carimbo, Casa, Check, Checklist, type Clima, Confete, Etiqueta, Flash, Fumaca, Holofote,
  Moedas, Pasta, Personagem, Pop, Predio, Proibido, Raios, Selo, VIS, acentosDe, gesto,
} from "../../../estilos/cartoon";

/**
 * ATIVO_CARTOON_01 — "A comissão ficou com outro corretor" — PRIMEIRO MODELO (Cartoon explicativo).
 * Roteiro original ATIVO (21/11/2026). História HIPOTÉTICA. Base legal: CC art. 725/728; STJ "aproximação útil" (ver episode.json → apuracao).
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

const VENDEDOR = { ...VIS.lider, terno: "#5A3A55", sombraTerno: "#472D43", pele: "#EEC3A0", cabelo: "#6A3B20", cabeloTipo: "coque" as const, gravata: undefined, camisa: "#5A3A55" };

/** Cartão-dominó da regra final. Centro em (0,0). */
const Domino: React.FC<{ texto: string; cor?: string }> = ({ texto, cor = "#D2392E" }) => (
  <g>
    <rect x={-300} y={-62} width={600} height={124} rx={22} fill="#000" opacity={0.35} transform="translate(10 12)" />
    <rect x={-300} y={-62} width={600} height={124} rx={22} fill={cor} stroke="#fff" strokeWidth={7} />
    <text x={0} y={18} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={52} fill="#fff">{texto}</text>
  </g>
);

const Seta: React.FC<{ x1: number; x2: number; y: number; p: number }> = ({ x1, x2, y, p }) => {
  const xe = mix(x1, x2, p);
  return p <= 0 ? null : (
    <g>
      <line x1={x1} y1={y} x2={xe} y2={y} stroke={A.hex} strokeWidth={10} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${aa(0.5)})` }} />
      {p > 0.95 ? <path d={`M${x2 - 6} ${y - 22} L${x2 + 22} ${y} L${x2 - 6} ${y + 22} Z`} fill={A.hex} /> : null}
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const w = (re: RegExp, seg: string, fb: number) => {
    for (const k of tl.captions) if (k.seg === seg) for (const x of k.words) if (re.test(x.text)) return x.start;
    return fb;
  };
  const tCli1 = w(/cliente/i, "s1", 2.4) - 0.22;
  const tE = w(/^e$/i, "s1", 3.56);
  const tEla = w(/^ela$/i, "s2", 6.28);
  const tNuma = w(/^numa$/i, "s3", 7.8);
  const tEle = w(/^ele$/i, "s4", 12.04);
  const tEm = w(/^em$/i, "s5", 14.12);
  const tAJ = w(/^a$/i, "s6", 17.88);
  const tComp = w(/comprador/i, "s6", 22.44);
  const tVend = w(/vendedor/i, "s6", 23.72);
  const tSe7 = w(/^se$/i, "s7", 24.92);
  const tLevou = w(/levou/i, "s7", 25.88);
  const tNeg = w(/neg[oó]cio/i, "s7", 26.4);
  const tA7 = w(/^a$/i, "s7", 27.08);
  const tSe8 = w(/^se$/i, "s8", 30.84);
  const tA8 = w(/^a$/i, "s8", 33.06);
  const tComb = w(/combinado/i, "s8", 35.6);
  const tDet = w(/detalhe/i, "s9", 37.72);
  const tAss = w(/assinada/i, "s10", 41.24);
  const tSal = w(/salva/i, "s10", 43.2);
  const tProv2 = c.x_prova;
  const tE12 = w(/^e$/i, "s12", 50.44);

  return [
    {
      id: "1 você mostrou o apartamento", a: 0, b: tCli1, clima: "explica", vin: 0.72,
      svg: (t) => (
        <>
          <Holofote x={320} chao={FLOOR} w={460} p={prog(t, 0, 0.3)} />
          <g transform={`translate(800 ${FLOOR})`}><Predio w={280} h={560} /></g>
          <Pop t={t} at={0.12} x={320} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.92} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.h_mostrou, 10, 80)} /></Pop>
          <Pop t={t} at={c.h_mostrou + 0.3} x={520} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.7} v={VIS.comprador} seed={1} humor="feliz" olhar={1} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_mostrou + 0.1} x={800} y={850} texto="VISITA" cor="white" />,
    },
    {
      id: "2 o cliente comprou", a: tCli1, b: tE, clima: "explica", vin: 0.75, hits: [c.h_comprou + 0.1], punch: [{ at: c.h_comprou, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 80} w={560} />
          <Personagem t={t} x={540} y={FLOOR + 90} s={1.05} v={VIS.comprador} seed={1} humor="feliz" braco={gesto(t, c.h_comprou - 0.1, 15, 140)} item={t > c.h_comprou - 0.2 ? <Chave2 /> : null} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_comprou + 0.1} x={540} y={560} texto="VENDIDO!" cor="white" size={84} rot={-7} />,
    },
    {
      id: "3 a comissão ficou com outro", a: tE, b: tEla, clima: "conflito", vin: 0.9, hits: [c.h_outro], punch: [{ at: c.h_outro, s: 1.06, x: 40 }],
      svg: (t) => {
        const voo = prog(t, c.h_comissao, 1.0, ease.inOut);
        return (
          <>
            <Holofote x={780} chao={FLOOR} w={460} cor="#FFD9D4" />
            <Personagem t={t} x={260} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor={t > c.h_outro ? "espanto" : "neutro"} braco={gesto(t, c.h_outro, 10, 30)} olhar={1} />
            <Pop t={t} at={tE + 0.05} x={790} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.88} v={VIS.B} acentos={ac} flip seed={2} humor="feliz" braco={gesto(t, c.h_outro, 10, 140)} /></Pop>
            <g transform={`translate(${mix(540, 880, voo)} ${mix(760, 700, voo) - Math.sin(voo * Math.PI) * 140}) scale(${t >= c.h_comissao ? 0.9 : 0})`}><Moedas /></g>
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.h_comissao} x={540} y={420} texto="COMISSÃO" cor="green" size={44} />,
    },
    {
      id: "4 ela ainda pode ser sua?", a: tEla, b: tNuma, clima: "pergunta", vin: 0.9, hits: [c.h_sua], punch: [{ at: c.h_sua, s: 1.06, y: 10 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 80} w={560} cor="#E6DAFF" />
          <Personagem t={t} x={540} y={FLOOR + 90} s={1.05} v={VIS.A} acentos={ac} humor="espanto" braco={gesto(t, tEla + 0.1, 10, 150)} bracoE={-30} olhar={0} />
          <Pop t={t} at={tEla + 0.15} x={300} y={850}><Balao texto="?" /></Pop>
          <Pop t={t} at={tEla + 0.35} x={800} y={800}><Balao texto="?" cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_sua} x={540} y={520} texto="SUA OU DELE?" size={64} rot={-6} />,
    },
    {
      id: "5 história hipotética: visita em março", a: tNuma, b: tEle, clima: "explica", vin: 0.72, push: 0.014, punch: [{ at: c.a_marco, s: 1.05, x: 60, y: 30 }],
      svg: (t) => (
        <>
          <Holofote x={340} chao={FLOOR} w={520} />
          <g transform={`translate(840 ${FLOOR})`}><Predio w={260} h={520} /></g>
          <Pop t={t} at={tNuma + 0.6} x={250} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.84} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_vis, 10, 75)} /></Pop>
          <Pop t={t} at={tNuma + 0.85} x={470} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.72} v={VIS.comprador} seed={1} humor="feliz" olhar={1} /></Pop>
          <Pop t={t} at={c.a_marco - 0.05} x={300} y={640}><Calendario mes="MARÇO" /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_vis} x={840} y={880} texto="VISITA" cor="white" />,
      selo: (t) => <Selo t={t} at={c.a_hip - 0.1} texto="EXEMPLO HIPOTÉTICO" size={52} />,
    },
    {
      id: "6 pede uns dias e some", a: tEle, b: tEm, clima: "explica", vin: 0.82,
      svg: (t) => {
        const sumiu = t >= c.a_some;
        return (
          <>
            <Holofote x={700} chao={FLOOR} w={460} />
            <Personagem t={t} x={290} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor={sumiu ? "triste" : "feliz"} olhar={1} braco={sumiu ? gesto(t, c.a_some + 0.1, 10, 30) : 10} />
            <g opacity={sumiu ? 0.16 : 1}>
              <Personagem t={t} x={720} y={FLOOR} s={0.82} v={VIS.comprador} seed={1} humor="neutro" flip fala={!sumiu && t > tEle} braco={sumiu ? 10 : 60} sombra={!sumiu} />
            </g>
            {sumiu ? <ellipse cx={720} cy={FLOOR - 230} rx={150} ry={250} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} strokeDasharray="18 14" /> : null}
            {!sumiu ? <Pop t={t} at={tEle + 0.1} x={760} y={830}><Balao texto="..." w={190} cauda={-1} /></Pop> : null}
            <g transform={`translate(720 ${FLOOR - 230})`}><Fumaca t={t} at={c.a_some} r={170} /></g>
          </>
        );
      },
    },
    {
      id: "7 junho: mesmo apartamento, outro corretor", a: tEm, b: tAJ, clima: "conflito", vin: 0.88, flash: tEm, hits: [c.a_outro + 0.15], punch: [{ at: c.a_outro, s: 1.05, x: -40 }],
      svg: (t) => {
        const flip = prog(t, c.a_junho - 0.1, 0.3, ease.inOut);
        return (
          <>
            <Holofote x={620} chao={FLOOR} w={560} cor="#FFD9D4" />
            <g transform={`translate(860 ${FLOOR})`}><Predio w={240} h={480} /></g>
            <g transform={`translate(270 620) scale(1 ${Math.abs(Math.cos(flip * Math.PI))})`}><Calendario mes={flip < 0.5 ? "MARÇO" : "JUNHO"} /></g>
            <Pop t={t} at={c.a_mesmo - 0.1} x={600} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.8} v={VIS.comprador} seed={1} humor="feliz" flip braco={gesto(t, c.a_outro, 10, 78)} /></Pop>
            <Pop t={t} at={c.a_outro - 0.15} x={330} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.86} v={VIS.B} acentos={ac} seed={2} humor="feliz" braco={gesto(t, c.a_outro, 10, 78)} /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_mesmo} x={860} y={900} texto="MESMO IMÓVEL" cor="white" size={34} />
          <Carimbo t={t} at={c.a_outro + 0.15} x={700} y={470} texto="VENDIDO" sub="POR OUTRO CORRETOR" size={64} rot={-6} />
        </>
      ),
    },
    {
      id: "8 o que a justiça olha", a: tAJ, b: c.b_quem, clima: "dados", vin: 0.85, push: 0.02,
      svg: (t) => {
        const osc = Math.sin((t - tAJ) * 2.2) * 0.35 * (1 - prog(t, c.b_quem - 0.6, 0.6));
        return (
          <>
            <Holofote x={540} chao={1420} w={620} cor="#BFE6F0" />
            <Pop t={t} at={c.b_justica - 0.1} x={540} y={900}><Balanca incl={osc} s={1.05} /></Pop>
          </>
        );
      },
      selo: (t) => <Selo t={t} at={c.b_justica} texto="O QUE DECIDE?" />,
    },
    {
      id: "9 aproximação útil", a: c.b_quem, b: tSe7, clima: "dados", vin: 0.8, punch: [{ at: c.b_aprox, s: 1.04 }],
      svg: (t) => {
        const l1 = prog(t, c.b_aprox, 0.8, ease.out);
        const l2 = prog(t, c.b_aprox + 0.3, 0.8, ease.out);
        return (
          <>
            <line x1={480} y1={FLOOR - 230} x2={mix(480, 250, l1)} y2={FLOOR - 230} stroke={A.hex} strokeWidth={10} strokeDasharray="22 14" strokeLinecap="round" />
            <line x1={600} y1={FLOOR - 230} x2={mix(600, 830, l2)} y2={FLOOR - 230} stroke={A.hex} strokeWidth={10} strokeDasharray="22 14" strokeLinecap="round" />
            <Pop t={t} at={c.b_quem} x={540} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.b_aprox, 10, 85)} bracoE={-85 * l1} /></Pop>
            <Pop t={t} at={tComp - 0.05} x={180} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.72} v={VIS.comprador} seed={1} humor="feliz" /></Pop>
            <Pop t={t} at={tVend - 0.05} x={900} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.72} v={VENDEDOR} seed={3} flip humor="feliz" /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_aprox + 0.15} x={540} y={600} texto="APROXIMAÇÃO ÚTIL" cor="green" size={48} />
          <Etiqueta t={t} at={tComp} x={200} y={830} texto="COMPRADOR" size={32} />
          <Etiqueta t={t} at={tVend} x={880} y={830} texto="VENDEDOR" size={32} />
        </>
      ),
    },
    {
      id: "10 seu trabalho levou ao negócio", a: tSe7, b: tA7, clima: "explica", vin: 0.72,
      svg: (t) => (
        <>
          <Pop t={t} at={c.b_trab - 0.1} x={190} y={640}><Avatar v={VIS.A} r={110} borda={A.hex} /></Pop>
          <Seta x1={315} x2={400} y={640} p={prog(t, c.b_trab + 0.2, 0.35)} />
          <Pop t={t} at={c.b_trab + 0.45} x={540} y={720}><Casa w={230} /></Pop>
          <Seta x1={680} x2={760} y={640} p={prog(t, tLevou + 0.2, 0.35)} />
          <Pop t={t} at={tNeg - 0.05} x={880} y={640}>
            <rect x={-95} y={-125} width={190} height={250} rx={14} fill={C.paper} />
            <rect x={-95} y={-125} width={190} height={50} rx={14} fill="#2C3E66" />
            {[0, 1, 2].map((k) => <rect key={k} x={-65} y={-40 + k * 42} width={130} height={16} rx={8} fill="#C9C4BA" />)}
          </Pop>
          <Pop t={t} at={tNeg + 0.25} x={960} y={540}><Check r={46} /></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, tLevou, 10, 150)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={tNeg} x={880} y={860} texto="NEGÓCIO" cor="white" />,
    },
    {
      id: "11 a comissão pode ser sua", a: tA7, b: tSe8, clima: "ganho", vin: 0.65, punch: [{ at: c.b_sua, s: 1.05, x: 60 }],
      svg: (t) => (
        <>
          <Holofote x={300} chao={FLOOR} w={480} />
          <Personagem t={t} x={300} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.b_sua, 10, 150)} />
          <Pop t={t} at={c.b_comissao - 0.05} x={300} y={830}><Moedas /></Pop>
          <Pop t={t} at={c.b_sua + 0.1} x={410} y={600}><Check r={52} /></Pop>
          {/* fechamento sem você: mesa ao fundo */}
          <g opacity={prog(t, c.b_fech - 0.3, 0.3)}>
            <Personagem t={t} x={720} y={FLOOR - 40} s={0.6} v={VIS.B} seed={2} humor="neutro" braco={60} sombra={false} />
            <Personagem t={t} x={920} y={FLOOR - 40} s={0.6} v={VIS.comprador} seed={1} flip humor="feliz" braco={60} sombra={false} />
            <rect x={620} y={FLOOR - 120} width={400} height={30} rx={8} fill="#3A2C24" />
            <rect x={640} y={FLOOR - 90} width={360} height={90} fill="#2A201A" />
          </g>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_sua} x={300} y={420} texto="PODE SER SUA" cor="green" size={44} />
          <Etiqueta t={t} at={c.b_fech} x={820} y={880} texto="FECHAMENTO" cor="white" size={34} />
        </>
      ),
    },
    {
      id: "12 dois corretores participaram", a: tSe8, b: tA8, clima: "explica", vin: 0.75,
      svg: (t) => (
        <>
          <Holofote x={280} chao={FLOOR} w={440} p={prog(t, c.b_dois - 0.2, 0.3)} />
          <Holofote x={800} chao={FLOOR} w={440} p={prog(t, c.b_dois + 0.1, 0.3)} />
          <Pop t={t} at={c.b_dois - 0.05} x={280} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.88} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.b_dois + 0.5, 10, 140)} /></Pop>
          <Pop t={t} at={c.b_dois + 0.2} x={800} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.88} v={VIS.B} acentos={ac} flip seed={2} humor="feliz" braco={gesto(t, c.b_dois + 0.7, 10, 140)} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_dois} x={280} y={820} texto="CORRETOR A" />
          <Etiqueta t={t} at={c.b_dois + 0.25} x={800} y={820} texto="CORRETOR B" />
        </>
      ),
    },
    {
      id: "13 lei: partes iguais, salvo combinado", a: tA8, b: c.c_mas, clima: "explica", vin: 0.72, punch: [{ at: c.b_iguais, s: 1.04 }],
      svg: (t) => {
        const div = prog(t, c.b_dividir, 0.6, ease.inOut);
        return (
          <>
            <Personagem t={t} x={190} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.b_dividir + 0.4, 10, 70)} />
            <Personagem t={t} x={890} y={FLOOR} s={0.78} v={VIS.B} acentos={ac} flip seed={2} humor="feliz" braco={gesto(t, c.b_dividir + 0.4, 10, 70)} />
            <g transform={`translate(${mix(540, 390, div)} ${mix(1440, 1500, div)}) scale(0.8)`}><Moedas /></g>
            {div > 0 ? <g transform={`translate(${mix(540, 690, div)} ${mix(1440, 1500, div)}) scale(0.8)`}><Moedas /></g> : null}
            <Pop t={t} at={tComb - 0.1} x={540} y={640}>
              <rect x={-150} y={-150} width={300} height={300} rx={24} fill={C.paper} />
              <rect x={-150} y={-150} width={300} height={70} rx={24} fill="#2C3E66" />
              {[0, 1, 2].map((k) => <rect key={k} x={-110} y={-40 + k * 50} width={220} height={20} rx={10} fill="#C9C4BA" />)}
              <path d="M-80 120 C-40 80 0 140 40 100 S 100 110 110 95" fill="none" stroke="#2C3E66" strokeWidth={8} strokeLinecap="round" />
            </Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_iguais - 0.05} x={540} y={1180} texto="PARTES IGUAIS" cor="green" size={40} />
          <Etiqueta t={t} at={tComb + 0.2} x={540} y={870} texto="OU O QUE FOI COMBINADO" cor="white" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={c.b_lei - 0.05} texto="CÓDIGO CIVIL · ART. 728" size={50} />,
    },
    {
      id: "14 o detalhe que decide: prova", a: c.c_mas, b: c.c_ficha, clima: "pergunta", vin: 0.92, push: 0.03, hits: [c.c_prova], punch: [{ at: c.c_prova, s: 1.08 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} cor="#E6DAFF" />
          <Pop t={t} at={tDet - 0.05} x={540} y={700}><Pasta s={2.1} label="?" /></Pop>
          <Personagem t={t} x={240} y={FLOOR} s={0.82} v={VIS.A} acentos={ac} humor={t > c.c_prova ? "feliz" : "espanto"} braco={gesto(t, c.c_prova, 30, 150)} />
          <Personagem t={t} x={840} y={FLOOR} s={0.82} v={VIS.B} acentos={ac} flip seed={2} humor="espanto" braco={30} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.c_prova} x={540} y={640} texto="PROVA" cor="green" size={120} rot={-7} />,
    },
    {
      id: "15 o que é prova", a: c.c_ficha, b: c.c_sem, clima: "explica", vin: 0.72, punch: [{ at: c.c_data, s: 1.03 }, { at: c.c_hist, s: 1.03 }],
      svg: (t) => (
        <>
          <Pop t={t} at={c.c_ficha} x={540} y={640}>
            <Checklist t={t} titulo="DOSSIÊ DO ATENDIMENTO" itens={[{ k: "FICHA DE VISITA", at: tAss }, { k: "DATA", at: c.c_data }, { k: "CONVERSA SALVA", at: tSal }, { k: "HISTÓRICO", at: c.c_hist }]} />
          </Pop>
          <Personagem t={t} x={180} y={FLOOR + 30} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, tAss, 10, 75)} />
          <Personagem t={t} x={900} y={FLOOR + 30} s={0.7} v={VIS.comprador} flip seed={1} humor="neutro" />
        </>
      ),
    },
    {
      id: "16 palavra contra palavra", a: c.c_sem, b: c.x_quem, clima: "conflito", vin: 0.9, hits: [c.c_contra], push: 0.02,
      svg: (t) => (
        <>
          <Personagem t={t} x={260} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor="bravo" braco={gesto(t, c.c_palavra, 10, 95)} olhar={1} />
          <Personagem t={t} x={820} y={FLOOR} s={0.88} v={VIS.B} acentos={ac} flip seed={2} humor="bravo" braco={gesto(t, c.c_contra, 10, 95)} olhar={1} />
          <Pop t={t} at={c.c_palavra - 0.05} x={290} y={760}><Balao texto="EU MOSTREI!" w={440} size={52} /></Pop>
          <Pop t={t} at={c.c_contra - 0.05} x={790} y={620}><Balao texto="EU VENDI!" w={380} size={52} cauda={-1} /></Pop>
          <Pop t={t} at={c.c_sem + 0.1} x={540} y={FLOOR - 10}><Balanca s={0.55} incl={Math.sin(t * 6) * 0.25} /></Pop>
        </>
      ),
      selo: (t) => <Selo t={t} at={c.c_sem} texto="SEM PROVA" cor="red" />,
    },
    {
      id: "17 quem não registra, não recebe", a: c.x_quem, b: c.cta_quer - 0.05, clima: "conflito", vin: 0.92, hits: [c.x_recebe], push: 0.01,
      svg: (t) => {
        const cai = (at: number) => prog(t, at + 0.35, 0.3, ease.in);
        return (
          <>
            <Pop t={t} at={c.x_quem} x={540} y={530}><g transform={`rotate(${cai(tProv2 - 0.1) * 8})`}><Domino texto="NÃO REGISTRA" /></g></Pop>
            <Pop t={t} at={tProv2 - 0.15} x={540} y={690}><g transform={`rotate(${cai(tE12) * -8})`}><Domino texto="NÃO PROVA" /></g></Pop>
            <Pop t={t} at={c.x_recebe - 0.15} x={540} y={845}><Domino texto="NÃO RECEBE" /></Pop>
            <g transform={`translate(800 ${FLOOR - 40})`}><Moedas /></g>
            <Proibido t={t} at={c.x_recebe} x={800} y={FLOOR - 120} r={150} />
            <Personagem t={t} x={260} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor={t > c.x_recebe ? "triste" : "neutro"} braco={gesto(t, c.x_recebe, 10, 30)} />
          </>
        );
      },
      selo: (t) => <Selo t={t} at={c.x_quem - 0.1} texto="A REGRA" cor="red" />,
    },
  ];
};

/** Chave de entrega (amarelo-ouro, não verde) para o comprador. */
const Chave2: React.FC = () => (
  <g fill="#E0A43A">
    <circle cx={0} cy={0} r={24} />
    <circle cx={0} cy={0} r={10} fill="#0A0A0C" />
    <rect x={18} y={-6} width={64} height={12} rx={4} />
    <rect x={62} y={4} width={9} height={16} />
    <rect x={48} y={4} width={9} height={12} />
  </g>
);

/** Renderiza só o plano ativo (corte seco) + flash de salto de tempo. */
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

export { clamp01, Confete };
