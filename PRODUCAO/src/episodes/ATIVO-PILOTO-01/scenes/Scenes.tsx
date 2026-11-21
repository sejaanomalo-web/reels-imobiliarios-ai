import React from "react";
import { C, F } from "../../../theme";
import { clamp01, ease, mix, prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { A, aa } from "../../NOV26/kit";
import {
  Avatar, Balao, Cadeado, CamCartoon, Carimbo, Chave, Check, Escudo, Moedas, Pasta, Raio, acentosDe, gesto, Casa, type Clima, Confete, Etiqueta, Figurante, Holofote, Personagem, Pop, Predio, Proibido, Raios, Selo, VIS, pop, RED,
} from "../../../estilos/cartoon";

/**
 * ATIVO_PILOTO_01 — "Concorrente ou parceiro?" no formato CARTOON EXPLICATIVO (piloto, 21/11/2026).
 * Reaproveita a narração aprovada do ATIVO_NOV26_28. História HIPOTÉTICA; pessoas são ilustrações; o evento citado na fala
 * aparece só como "painel do setor" (sem logo/identidade de terceiros). Corte seco a cada ~2–4 s, algo novo a cada ~1 s.
 */
const FLOOR = 1540;
type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode;
};

/* ---------- planos ---------- */
export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const w = (re: RegExp, seg: string, fb: number) => {
    for (const k of tl.captions) if (k.seg === seg) for (const x of k.words) if (re.test(x.text)) return x.start;
    return fb;
  };
  const tCorr = w(/corretores/i, "s1", 0.8);
  const tAtend = w(/atendem/i, "s1", 1.4);
  const tUm = w(/^um$/i, "s2", 3.24);
  const tElesVao = w(/^eles$/i, "s3", 6.76);
  const tConvers = w(/conversar/i, "s3", c.h_conv);
  const tNuma = w(/^numa$/i, "s4", 8.84);
  const tA = w(/^a$/i, "s4", 10.6);
  const tB = w(/^b$/i, "s5", 13.3);
  const tAlg = w(/algu[eé]m/i, "s5", 14.2);
  const tProc = w(/procurando/i, "s5", 14.68);
  const tSe = w(/^se$/i, "s6", 16.92);
  const tAprox = w(/aproxima/i, "s6", 19.56);
  const tNo = w(/^no$/i, "s7", 22.04);
  const tLid = w(/lideran/i, "s7", 23.64);
  const tDisc = w(/discutiram/i, "s7", 24.71);
  const tEntre = w(/imobili[aá]rias/i, "s7", 26.2);
  const tCli = w(/cliente/i, "s8", 34.44);
  const tLic = w(/li[cç][aã]o/i, "s9", 35.56);
  const tPerc = w(/perceber/i, "s10", 38.9);
  const tTamb = w(/tamb[eé]m/i, "s10", 41.0);
  const tCrit = c.x_crit;

  return [
    {
      id: "1 dois corretores", a: 0, b: tAtend + 0.56, clima: "explica", vin: 0.7,
      svg: (t) => (
        <>
          <Holofote x={300} chao={FLOOR} w={460} p={prog(t, 0, 0.3)} />
          <Holofote x={780} chao={FLOOR} w={460} p={prog(t, tCorr - 0.3, 0.3)} />
          <Pop t={t} at={0.15} x={300} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.9} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, 1.1, 10, 150)} /></Pop>
          <Pop t={t} at={tCorr - 0.1} x={780} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.9} v={VIS.B} acentos={ac} humor="feliz" flip seed={2} braco={8} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={0.4} x={300} y={820} texto="CORRETOR A" />
          <Etiqueta t={t} at={tCorr + 0.15} x={780} y={820} texto="CORRETOR B" />
        </>
      ),
    },
    {
      id: "2 compradores diferentes", a: tAtend + 0.56, b: tUm + 0.48, clima: "explica", vin: 0.72,
      svg: (t) => (
        <>
          <line x1={540} y1={420} x2={540} y2={FLOOR} stroke="#fff" strokeOpacity={0.25} strokeWidth={6} strokeDasharray="22 18" />
          <Personagem t={t} x={190} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} braco={70} />
          <Pop t={t} at={tAtend + 0.6} x={395} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.62} v={VIS.comprador} flip seed={1} humor="feliz" /></Pop>
          <Pop t={t} at={tAtend + 0.95} x={685} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.62} v={{ ...VIS.comprador, terno: "#4C7FB8", sombraTerno: "#3E6A9B", camisa: "#4C7FB8", cabeloTipo: "curto", pele: "#E8B48C" }} seed={3} humor="neutro" /></Pop>
          <Personagem t={t} x={890} y={FLOOR} s={0.72} v={VIS.B} acentos={ac} flip braco={70} seed={2} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={tAtend + 0.75} x={290} y={760} texto="COMPRADOR 1" size={32} />
          <Etiqueta t={t} at={tAtend + 1.1} x={790} y={760} texto="COMPRADOR 2" size={32} />
        </>
      ),
    },
    {
      id: "3 imóvel certo", a: tUm + 0.48, b: c.h_outro + 0.64, clima: "explica", vin: 0.75, punch: [{ at: c.h_imovel, s: 1.05, y: -10 }],
      svg: (t) => (
        <>
          <Holofote x={330} chao={FLOOR + 80} w={520} />
          <Personagem t={t} x={330} y={FLOOR + 90} s={1.05} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.h_imovel, 20, 140)} />
          <Pop t={t} at={c.h_imovel - 0.1} x={730} y={860}><Casa w={340} /></Pop>
          <Pop t={t} at={c.h_imovel + 0.5} x={880} y={530}><Check r={54} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_imovel + 0.2} x={730} y={420} texto="O IMÓVEL" cor="white" />,
    },
    {
      id: "4 cliente certo", a: c.h_outro + 0.64, b: tElesVao, clima: "explica", vin: 0.75, punch: [{ at: c.h_cliente, s: 1.05, y: -10 }],
      svg: (t) => (
        <>
          <Holofote x={750} chao={FLOOR + 80} w={520} />
          <Personagem t={t} x={750} y={FLOOR + 90} s={1.05} v={VIS.B} acentos={ac} humor="feliz" flip seed={2} braco={gesto(t, c.h_cliente, 20, 140)} />
          <Pop t={t} at={c.h_cliente - 0.1} x={340} y={650}><Avatar v={VIS.comprador} r={170} /></Pop>
          <Pop t={t} at={c.h_cliente + 0.45} x={480} y={520}><Check r={54} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_cliente + 0.2} x={340} y={880} texto="O CLIENTE" cor="white" />,
    },
    {
      id: "5a competir", a: tElesVao, b: tConvers - 0.1, clima: "conflito", vin: 0.9, hits: [c.h_compet], push: 0.03,
      svg: (t) => (
        <>
          <Personagem t={t} x={290} y={FLOOR} s={0.92} v={VIS.A} acentos={ac} humor={t > c.h_compet ? "bravo" : "neutro"} braco={gesto(t, c.h_compet, 10, 95)} olhar={1} />
          <Personagem t={t} x={790} y={FLOOR} s={0.92} v={VIS.B} acentos={ac} humor={t > c.h_compet ? "bravo" : "neutro"} flip braco={gesto(t, c.h_compet, 10, 95)} olhar={1} seed={2} />
          <Pop t={t} at={c.h_compet} x={540} y={650}><Raio s={1.6} /></Pop>
        </>
      ),
    },
    {
      id: "5b ou conversar", a: tConvers - 0.1, b: tNuma, clima: "pergunta", vin: 0.85,
      svg: (t) => (
        <>
          <Personagem t={t} x={290} y={FLOOR} s={0.92} v={VIS.A} acentos={ac} humor="espanto" braco={30} olhar={1} />
          <Personagem t={t} x={790} y={FLOOR} s={0.92} v={VIS.B} acentos={ac} humor="espanto" flip braco={30} olhar={1} seed={2} />
          <Pop t={t} at={tConvers} x={330} y={830}><Balao texto="?" /></Pop>
          <Pop t={t} at={tConvers + 0.25} x={750} y={830}><Balao texto="?" /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={tConvers + 0.35} x={540} y={560} texto="PARCERIA OU DISPUTA?" size={54} rot={-6} />,
    },
    {
      id: "6 história hipotética — captação", a: tNuma, b: c.a_b - 0.64, clima: "explica", vin: 0.72, push: 0.015, punch: [{ at: c.a_capt, s: 1.06, x: -30, y: -20 }],
      svg: (t) => (
        <>
          <Holofote x={740} chao={FLOOR} w={520} />
          <g transform={`translate(740 ${FLOOR})`}><Casa w={380} /></g>
          <Pop t={t} at={tA - 0.1} x={300} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.9} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_capt, 20, 120)} item={t > c.a_capt - 0.3 ? <Chave /> : null} /></Pop>
          <Pop t={t} at={c.a_capt} x={900} y={1200}><Check r={56} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_capt + 0.1} x={740} y={760} texto="CAPTAÇÃO" cor="green" />,
      selo: (t) => <Selo t={t} at={c.a_hip - 0.1} texto="EXEMPLO HIPOTÉTICO" size={52} />,
    },
    {
      id: "7 B conhece alguém", a: c.a_b - 0.64, b: tProc, clima: "explica", vin: 0.72, punch: [{ at: tAlg, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={330} chao={FLOOR} w={480} />
          <Personagem t={t} x={330} y={FLOOR} s={0.9} v={VIS.B} acentos={ac} humor="feliz" seed={2} braco={gesto(t, tAlg, 15, 85)} />
          <Pop t={t} at={tAlg - 0.05} x={770} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.76} v={VIS.comprador} flip seed={1} humor="neutro" /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={tB} x={330} y={800} texto="CORRETOR B" />
          <Etiqueta t={t} at={tAlg + 0.15} x={770} y={860} texto="COMPRADOR" cor="white" size={32} />
        </>
      ),
    },
    {
      id: "8 aquela região (mapa)", a: tProc, b: tSe, clima: "explica", vin: 0.75, punch: [{ at: c.a_regiao, s: 1.08, y: 20 }],
      svg: (t) => {
        const lx = mix(300, 600, prog(t, tProc, 1.6, ease.inOut));
        const ly = mix(560, 640, prog(t, tProc, 1.6, ease.inOut));
        return (
          <>
            <g transform="translate(540 640)">
              <rect x={-400} y={-250} width={800} height={500} rx={30} fill="#E9E2D6" stroke="#fff" strokeWidth={8} />
              <rect x={-400} y={-250} width={800} height={500} rx={30} fill="#000" opacity={0.04} />
              {[-170, -10, 150].map((y) => <rect key={y} x={-400} y={y} width={800} height={34} fill="#C9C1B2" />)}
              {[-230, -40, 180].map((x) => <rect key={x} x={x} y={-250} width={34} height={500} fill="#C9C1B2" />)}
              <rect x={-350} y={-120} width={90} height={90} rx={8} fill="#CDD9C0" opacity={0} />
              <rect x={60} y={40} width={110} height={90} rx={10} fill="#B5483A" opacity={0.85} />
              <rect x={-190} y={-130} width={130} height={100} rx={10} fill="#8FA8C8" />
              <rect x={230} y={-210} width={120} height={70} rx={10} fill="#8FA8C8" />
            </g>
            {t < c.a_regiao ? (
              <g transform={`translate(${lx} ${ly})`}>
                <circle r={70} fill="rgba(255,255,255,0.25)" stroke="#2A2D33" strokeWidth={14} />
                <rect x={44} y={44} width={26} height={110} rx={12} fill="#2A2D33" transform="rotate(-45 44 44)" />
              </g>
            ) : null}
            {t >= c.a_regiao ? (
              <g transform="translate(655 620)">
                {[0, 1].map((k) => { const ph = ((t - c.a_regiao) * 0.9 + k * 0.5) % 1; return <circle key={k} r={40 + ph * 120} fill="none" stroke={A.hex} strokeWidth={8} opacity={1 - ph} />; })}
              </g>
            ) : null}
            <Pop t={t} at={c.a_regiao} x={655} y={620}>
              <path d="M0 0 C-70 -80 -60 -170 0 -170 C60 -170 70 -80 0 0 Z" fill={A.hex} stroke="#fff" strokeWidth={7} />
              <circle cx={0} cy={-112} r={24} fill={A.ink} />
            </Pop>
            <Personagem t={t} x={220} y={FLOOR + 60} s={0.86} v={VIS.comprador} olhar={1} humor={t > c.a_regiao ? "feliz" : "neutro"} braco={gesto(t, c.a_regiao, 20, 150)} seed={1} />
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.a_regiao + 0.2} x={655} y={300} texto="MESMA REGIÃO" cor="green" />,
    },
    {
      id: "9 informações isoladas (muro)", a: tSe, b: tAprox, clima: "conflito", vin: 0.92, hits: [c.a_isol],
      svg: (t) => {
        const drop = prog(t, c.a_isol - 0.16, 0.16, ease.in);
        return (
          <>
            <Personagem t={t} x={260} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor={t > c.a_isol ? "triste" : "neutro"} braco={110} item={<g transform="translate(0 40)"><Pasta s={0.9} /></g>} />
            <Personagem t={t} x={820} y={FLOOR} s={0.86} v={VIS.B} acentos={ac} humor={t > c.a_isol ? "triste" : "neutro"} flip braco={110} seed={2} item={<g transform="translate(0 40) scale(-1 1)"><Pasta s={0.9} cor="#7BA0C9" /></g>} />
            <Pop t={t} at={c.a_guardar} x={290} y={700}><Cadeado s={1.2} /></Pop>
            <Pop t={t} at={c.a_guardar + 0.3} x={790} y={700}><Cadeado s={1.2} /></Pop>
            <g transform={`translate(540 ${mix(-1700, 0, drop)})`}>
              <rect x={-70} y={380} width={140} height={FLOOR - 380} fill="#7E3A30" />
              {Array.from({ length: 16 }, (_, r) => <line key={r} x1={-70} x2={70} y1={380 + r * 72} y2={380 + r * 72} stroke="#4E1F19" strokeWidth={6} />)}
              {Array.from({ length: 16 }, (_, r) => <line key={`v${r}`} x1={r % 2 ? -10 : 25} x2={r % 2 ? -10 : 25} y1={380 + r * 72} y2={452 + r * 72} stroke="#4E1F19" strokeWidth={6} />)}
              <rect x={30} y={380} width={40} height={FLOOR - 380} fill="#000" opacity={0.18} />
            </g>
            <ellipse cx={540} cy={FLOOR + 6} rx={120} ry={18} fill="#000" opacity={0.45 * drop} />
          </>
        );
      },
    },
    {
      id: "10 pode nem acontecer", a: tAprox, b: tNo, clima: "conflito", vin: 0.92, hits: [c.a_nem], push: 0.02,
      svg: (t) => {
        const grow = prog(t, tAprox, 1.1, ease.out);
        const broke = t > c.a_nem;
        return (
          <>
            <Pop t={t} at={tAprox - 0.05} x={240} y={640}><Avatar v={VIS.A} r={130} /></Pop>
            <Pop t={t} at={tAprox + 0.1} x={840} y={640}><Avatar v={VIS.B} r={130} /></Pop>
            <line x1={380} y1={640} x2={broke ? 500 : mix(380, 700, grow)} y2={640} stroke="#fff" strokeWidth={10} strokeDasharray="24 18" strokeLinecap="round" />
            {broke ? <line x1={580} y1={640} x2={700} y2={640} stroke="#fff" strokeOpacity={0.35} strokeWidth={10} strokeDasharray="24 18" /> : null}
            <Pop t={t} at={c.a_nem} x={540} y={640}>
              <circle r={58} fill="#D2392E" stroke="#fff" strokeWidth={8} />
              <path d="M-24 -24 L24 24 M24 -24 L-24 24" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
            </Pop>
            <g transform={`translate(250 ${FLOOR})`}><Casa w={280} /></g>
            <Personagem t={t} x={830} y={FLOOR} s={0.7} v={VIS.comprador} flip humor={broke ? "triste" : "neutro"} seed={1} />
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={c.a_nem + 0.12} x={540} y={420} texto="SEM CONEXÃO" size={70} />,
    },
    {
      id: "11 painel do setor", a: tNo, b: c.b_coop, clima: "evento", vin: 0.88, push: 0.012,
      svg: (t) => {
        const falando = (k: number) => t > tDisc + k * 0.35 && Math.floor((t - tDisc) / 0.7) % 3 === k;
        return (
          <>
            <Holofote x={270} chao={1480} w={380} p={prog(t, tLid - 0.2, 0.3)} />
            <Holofote x={540} chao={1480} w={380} p={prog(t, tLid + 0.05, 0.3)} />
            <Holofote x={810} chao={1480} w={380} p={prog(t, tLid + 0.3, 0.3)} />
            <g transform="translate(540 560)">
              <rect x={-420} y={-90} width={840} height={150} rx={16} fill="#15171C" stroke="rgba(255,255,255,0.8)" strokeWidth={6} />
              <text x={0} y={-6} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={58} fill="#fff">PAINEL DO SETOR</text>
              <text x={0} y={42} textAnchor="middle" fontFamily={F.mono} fontWeight={700} fontSize={30} fill={C.muted}>LIDERANÇAS · IMOBILIÁRIAS</text>
            </g>
            {[270, 540, 810].map((x, k) => (
              <Pop key={x} t={t} at={tLid - 0.15 + k * 0.25} x={x} y={1480}>
                <Personagem t={t} x={0} y={0} s={0.68} v={{ ...VIS.lider, terno: ["#3A3F4A", "#2C3E66", "#5A3A55"][k], sombraTerno: ["#2E323B", "#22314F", "#472D43"][k], pele: ["#D9A27B", "#8E5A3C", "#EEC3A0"][k], cabelo: ["#8C8C8C", "#151012", "#6A3B20"][k], cabeloTipo: (["curto", "careca", "coque"] as const)[k] }} fala={falando(k)} seed={k * 1.7} braco={falando(k) ? 70 : 10} />
              </Pop>
            ))}
            <rect x={90} y={1440} width={900} height={60} rx={10} fill="#3A2C24" />
            <rect x={110} y={1500} width={860} height={190} fill="#2A201A" />
            <rect x={110} y={1500} width={860} height={20} fill="#000" opacity={0.25} />
            {[270, 540, 810].map((x) => <g key={x}><rect x={x - 5} y={1365} width={10} height={80} fill="#111" /><ellipse cx={x} cy={1360} rx={16} ry={22} fill="#222" /></g>)}
          </>
        );
      },
    },
    {
      id: "12 cooperação entre imobiliárias", a: c.b_coop, b: c.b_mas, clima: "explica", vin: 0.75,
      svg: (t) => {
        const ponte = prog(t, c.b_coop, 0.9, ease.out);
        return (
          <>
            <g transform={`translate(260 ${FLOOR})`}><Predio w={250} h={400} /></g>
            <Pop t={t} at={tEntre - 0.25} x={820} y={FLOOR}><Predio w={250} h={400} cor="#4A3A4E" /></Pop>
            <path d="M260 760 Q540 440 820 760" fill="none" stroke={A.hex} strokeWidth={14} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - ponte)} style={{ filter: `drop-shadow(0 0 14px ${aa(0.5)})` }} />
            <Pop t={t} at={c.b_coop + 0.5} x={540} y={600}>
              <circle r={70} fill={A.hex} stroke="#fff" strokeWidth={8} />
              <g stroke={A.ink} strokeWidth={13} fill="none" strokeLinecap="round"><rect x={-44} y={-16} width={52} height={32} rx={16} /><rect x={-8} y={-16} width={52} height={32} rx={16} /></g>
            </Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_coop - 0.05} x={260} y={800} texto="IMOBILIÁRIA 1" size={32} />
          <Etiqueta t={t} at={tEntre - 0.2} x={820} y={800} texto="IMOBILIÁRIA 2" size={32} />
        </>
      ),
    },
    {
      id: "13 parceria séria — contrato", a: c.b_mas, b: c.b_resp, clima: "explica", vin: 0.72, punch: [{ at: c.b_aut, s: 1.05, y: 20 }, { at: c.b_comb, s: 1.04, y: 10 }],
      svg: (t) => {
        const linhas = [{ k: "AUTORIZAÇÃO", at: c.b_aut }, { k: "COMBINADO CLARO", at: c.b_comb }];
        return (
          <>
            <g transform="translate(540 650)">
              <rect x={-330} y={-250} width={660} height={500} rx={18} fill="#000" opacity={0.35} transform="translate(14 18)" />
              <rect x={-330} y={-250} width={660} height={500} rx={18} fill={C.paper} />
              <rect x={-330} y={-250} width={660} height={90} rx={18} fill="#2C3E66" />
              <text x={0} y={-192} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff">ACORDO DE PARCERIA</text>
              {linhas.map((q, i) => {
                const on = t >= q.at;
                return (
                  <g key={q.k} transform={`translate(-280 ${-80 + i * 130})`}>
                    <rect x={0} y={-40} width={80} height={80} rx={14} fill="none" stroke="#111" strokeWidth={6} />
                    {on ? <path d={`M14 2 L34 24 L68 -20`} fill="none" stroke={A.ink} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /> : null}
                    <text x={110} y={14} fontFamily={F.sans} fontWeight={800} fontSize={44} fill={on ? "#111" : "#9A968E"}>{q.k}</text>
                  </g>
                );
              })}
              <rect x={-280} y={170} width={300} height={10} rx={5} fill="#C9C4BA" />
              <rect x={60} y={170} width={220} height={10} rx={5} fill="#C9C4BA" />
            </g>
            {linhas.map((q, i) => <Pop key={q.k} t={t} at={q.at} x={260 + 0} y={570 + i * 130}><Check r={44} /></Pop>)}
            <Personagem t={t} x={180} y={FLOOR + 40} s={0.7} v={VIS.A} acentos={ac} braco={60} humor="neutro" />
            <Personagem t={t} x={900} y={FLOOR + 40} s={0.7} v={VIS.B} acentos={ac} flip braco={60} seed={2} humor="neutro" />
          </>
        );
      },
      selo: (t) => <Selo t={t} at={c.b_mas + 0.1} texto="PARCERIA SÉRIA" />,
    },
    {
      id: "14 responsabilidades e remuneração", a: c.b_resp, b: c.b_prot, clima: "explica", vin: 0.72, punch: [{ at: c.b_rem, s: 1.05 }],
      svg: (t) => (
        <>
          <Personagem t={t} x={220} y={FLOOR} s={0.84} v={VIS.A} acentos={ac} braco={gesto(t, c.b_rem, 20, 75)} humor="feliz" />
          <Personagem t={t} x={860} y={FLOOR} s={0.84} v={VIS.B} acentos={ac} flip braco={gesto(t, c.b_rem, 20, 75)} seed={2} humor="feliz" />
          <Pop t={t} at={c.b_rem} x={540} y={1460}><Moedas /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_resp + 0.05} x={290} y={560} texto="A: CAPTAÇÃO" cor="white" size={40} />
          <Etiqueta t={t} at={c.b_resp + 0.4} x={790} y={700} texto="B: COMPRADOR" cor="white" size={40} />
          <Etiqueta t={t} at={c.b_rem + 0.2} x={540} y={840} texto="DIVISÃO COMBINADA" cor="green" size={38} />
        </>
      ),
    },
    {
      id: "15 proteção dos dados do cliente", a: c.b_prot, b: w(/^a$/i, "s9", 35.32), clima: "explica", vin: 0.8, hits: [c.b_prot + 0.25],
      svg: (t) => (
        <>
          <g transform="translate(540 610)">
            <rect x={-300} y={-200} width={600} height={400} rx={30} fill="#1C2029" stroke="rgba(255,255,255,0.85)" strokeWidth={7} />
            <g transform="translate(-170 -40)"><Avatar v={VIS.comprador} r={90} borda="rgba(255,255,255,0.6)" /></g>
            {[0, 1, 2].map((k) => <rect key={k} x={-40} y={-90 + k * 60} width={[260, 200, 230][k]} height={28} rx={14} fill="#3A404C" />)}
            <rect x={-250} y={110} width={500} height={28} rx={14} fill="#3A404C" />
          </g>
          <Pop t={t} at={c.b_prot + 0.1} x={760} y={760}><Escudo s={1.05} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={tCli} x={540} y={350} texto="DADOS PROTEGIDOS" cor="green" size={58} rot={-5} />,
    },
    {
      id: "16 não com qualquer pessoa", a: w(/^a$/i, "s9", 35.32), b: w(/^[ée]$/i, "s10", 38.68), clima: "conflito", vin: 0.9, hits: [c.c_qualq],
      svg: (t) => {
        const cores = ["#6B7080", "#7D6B5E", "#5E6E80", "#806070", "#6E6E6E", "#5D6B6B"];
        return (
          <>
            <Personagem t={t} x={230} y={FLOOR} s={0.9} v={VIS.A} acentos={ac} braco={gesto(t, c.c_comp, 20, 120)} humor={t > c.c_qualq ? "espanto" : "neutro"} item={t > tLic ? <g transform="translate(0 30)"><Pasta s={1} label="CARTEIRA" /></g> : null} />
            {cores.map((cor, i) => (
              <Pop key={i} t={t} at={c.c_comp + 0.1 + i * 0.12} x={[620, 760, 900, 690, 830, 970][i]} y={[FLOOR - 120, FLOOR - 140, FLOOR - 120, FLOOR, FLOOR, FLOOR][i]}>
                <Figurante x={0} y={0} s={0.72} cor={cor} t={t} seed={i} />
              </Pop>
            ))}
            {t > c.c_comp && t < c.c_qualq + 0.6
              ? [0, 1, 2].map((k) => {
                  const ph = clamp01((t - c.c_comp - k * 0.35) / 0.9);
                  const fall = t > c.c_qualq ? prog(t, c.c_qualq, 0.5, ease.in) : 0;
                  if (ph <= 0) return null;
                  return <g key={k} transform={`translate(${mix(360, 760, ph)} ${mix(820, 760, Math.sin(ph * Math.PI)) - 160 * Math.sin(ph * Math.PI) + fall * 600}) rotate(${ph * 40 + fall * 90}) scale(0.6)`} opacity={1 - fall}><Pasta /></g>;
                })
              : null}
            <Proibido t={t} at={c.c_qualq} x={600} y={660} r={190} />
          </>
        );
      },
      selo: (t) => <Selo t={t} at={tLic - 0.1} texto="A LIÇÃO" cor="red" />,
    },
    {
      id: "17 organização + confiança", a: w(/^[ée]$/i, "s10", 38.68), b: tTamb + 0.88, clima: "ganho", vin: 0.65,
      svg: (t) => (
        <>
          <Pop t={t} at={tPerc} x={230} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.78} v={VIS.A} acentos={ac} humor="feliz" braco={40} /></Pop>
          <Pop t={t} at={tPerc + 0.2} x={850} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.78} v={VIS.B} acentos={ac} humor="feliz" flip braco={40} seed={2} /></Pop>
          <Pop t={t} at={c.c_org - 0.05} x={300} y={640}>
            <rect x={-200} y={-200} width={400} height={400} rx={36} fill="#13161B" stroke={A.hex} strokeWidth={8} />
            {[0, 1, 2].map((k) => <g key={k} transform={`translate(-110 ${-110 + k * 90})`}><rect width={52} height={52} rx={10} fill={A.hex} /><path d="M12 26 L22 38 L42 14" stroke={A.ink} strokeWidth={8} fill="none" strokeLinecap="round" /><rect x={74} y={14} width={150} height={24} rx={12} fill="#3A404C" /></g>)}
            <text x={0} y={170} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff">ORGANIZAÇÃO</text>
          </Pop>
          <Pop t={t} at={c.c_org + 0.4} x={540} y={640}><text x={0} y={30} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={110} fill="#fff">+</text></Pop>
          <Pop t={t} at={c.c_conf - 0.05} x={780} y={640}>
            <rect x={-200} y={-200} width={400} height={400} rx={36} fill="#13161B" stroke={A.hex} strokeWidth={8} />
            <g transform="translate(0 -40)"><Escudo s={0.7} /></g>
            <text x={0} y={170} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff">CONFIANÇA</text>
          </Pop>
        </>
      ),
    },
    {
      id: "18 rede de negócios", a: tTamb + 0.88, b: c.x_coop, clima: "ganho", vin: 0.55, push: 0,
      svg: (t) => {
        const z = mix(1.35, 1, prog(t, c.c_rede - 0.3, 0.7, ease.out));
        const nodes: [number, number, string][] = [[540, 600, "A"], [290, 450, "B"], [790, 440, "c"], [210, 740, "c"], [870, 740, "B"], [540, 340, "c"], [400, 820, "c"], [680, 820, "A"]];
        const lines = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [3, 6], [4, 7], [6, 7], [0, 6], [0, 7], [1, 3], [2, 4]];
        const draw = prog(t, c.c_rede - 0.2, 0.9, ease.out);
        return (
          <>
          <Personagem t={t} x={300} y={FLOOR} s={0.76} v={VIS.A} acentos={ac} humor="feliz" braco={150} />
          <Personagem t={t} x={780} y={FLOOR} s={0.76} v={VIS.B} acentos={ac} humor="feliz" flip braco={150} seed={2} />
          <g transform={`translate(540 600) scale(${z}) translate(-540 -600)`}>
            {lines.map(([i, j], k) => {
              const [x1, y1] = nodes[i], [x2, y2] = nodes[j];
              const pk = clamp01(draw * 1.6 - k * 0.05);
              return <line key={k} x1={x1} y1={y1} x2={mix(x1, x2, pk)} y2={mix(y1, y2, pk)} stroke={A.hex} strokeWidth={8} strokeLinecap="round" opacity={0.85} style={{ filter: `drop-shadow(0 0 8px ${aa(0.5)})` }} />;
            })}
            {nodes.map(([x, y, k], i) => (
              <Pop key={i} t={t} at={tTamb + 0.9 + i * 0.07} x={x} y={y}><Avatar v={k === "A" ? VIS.A : k === "B" ? VIS.B : VIS.comprador} r={i === 0 ? 92 : 70} borda={i === 0 ? A.hex : "#fff"} /></Pop>
            ))}
          </g>
          </>
        );
      },
    },
    {
      id: "19 cooperação com critério", a: c.x_coop, b: c.cta_quer - 0.05, clima: "ganho", vin: 0.6, hits: [tCrit], punch: [{ at: tCrit, s: 1.05 }],
      svg: (t) => {
        const ap = prog(t, c.x_coop, 0.5, ease.out);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={760} cor="#FFFFFF" />
            <Personagem t={t} x={mix(300, 400, ap)} y={FLOOR} s={0.92} v={VIS.A} acentos={ac} humor="feliz" braco={mix(10, 78, ap)} />
            <Personagem t={t} x={mix(780, 680, ap)} y={FLOOR} s={0.92} v={VIS.B} acentos={ac} humor="feliz" flip braco={mix(10, 78, ap)} seed={2} />
            {ap > 0.95 ? <circle cx={540} cy={FLOOR - 0.92 * 330} r={30} fill={VIS.A.pele} /> : null}
            <Confete t={t} at={tCrit + 0.05} />
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={tCrit} x={540} y={600} texto="COOPERAÇÃO" sub="COM CRITÉRIO" cor="green" size={84} rot={-6} />,
    },
  ];
};

export const shotHits = (shots: Shot[]) => shots.flatMap((s) => s.hits ?? []);

/** Renderiza só o plano ativo (corte seco). */
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
    </>
  );
};

export { pop, RED };
