import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1201-21 — "Exclusividade é compromisso" (grade 01/12/2026 · 21h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: o dono recua com a chave diante do corretor → o contrato se escreve (CÓDIGO CIVIL · ART. 726, POR
 * ESCRITO) e o dono vende sozinho: COMISSÃO DEVIDA → a ressalva: SALVO INÉRCIA, o corretor parado fica cinza → virada:
 * não garante a comissão, garante a chance de trabalhar → as semanas de prestação de contas acendem → posse × compromisso
 * → fecho CtaNoir. Apuração: Código Civil, art. 726. Não é orientação jurídica (pílula). Pictogramas ilustrativos.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW = "drop-shadow(0 0 10px rgba(255,255,255,0.45))";
const GLOW_V = `drop-shadow(0 0 10px ${aa(0.6)})`;
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** Contrato em linha (linhas de texto e duas assinaturas). */
const Papel: React.FC<{ x: number; y: number; w?: number; h?: number; p: number; ass1?: number; ass2?: number; verde?: boolean; rotulo?: string }> = ({ x, y, w = 240, h = 300, p, ass1 = 0, ass2 = 0, verde = false, rotulo }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const cor = verde ? A.hex : NOIR.branco;
  const x0 = x - w / 2, y0 = y - h / 2;
  const sig = (sx: number, q: number) => <path d={`M ${sx} ${y0 + h - 58} c 14 -30 24 22 38 -6 s 22 -26 30 4 s 18 10 28 -8`} fill="none" stroke={A.hex} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp(q)} style={{ filter: GLOW_V }} opacity={q > 0.001 ? 1 : 0} />;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 20})`}>
      <rect x={x0} y={y0} width={w} height={h} rx={10} fill="#0A0A0A" stroke={cor} strokeWidth={3} style={{ filter: verde ? GLOW_V : GLOW }} />
      {rotulo ? <text x={x} y={y0 + 40} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={24} letterSpacing="0.1em" fill={cor}>{rotulo}</text> : null}
      {[0, 1, 2, 3].map((i) => <line key={i} x1={x0 + 26} y1={y0 + 70 + i * 30} x2={x0 + w - 26 - (i === 3 ? 70 : 0)} y2={y0 + 70 + i * 30} stroke={verde ? aa(0.7) : NOIR.linhaFraca} strokeWidth={3} strokeLinecap="round" />)}
      {sig(x0 + 26, ass1)}
      {sig(x0 + w / 2 + 6, ass2)}
      <line x1={x0 + 22} y1={y0 + h - 34} x2={x0 + w / 2 - 12} y2={y0 + h - 34} stroke={NOIR.linhaFraca} strokeWidth={2} />
      <line x1={x0 + w / 2 + 4} y1={y0 + h - 34} x2={x0 + w - 22} y2={y0 + h - 34} stroke={NOIR.linhaFraca} strokeWidth={2} />
    </g>
  );
};

/* ---------------------------------------------------------------- 1–2 · o medo, a lei e a ressalva ---------------------------------------------------------------- */
export const Lei: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_ouseja + 0.2, 0.5);
  if (on <= 0.001) return null;
  const recua = prog(t, c.h_medo - 0.1, 0.8, ease.out) * (1 - prog(t, c.l_escrito - 0.4, 0.8, ease.inOut));
  const xDono = mix(700, 850, recua);
  const vende = prog(t, c.l_sozinho - 0.6, 1.2, ease.inOut);
  const inercia = prog(t, c.c_inercia - 0.1, 0.6);
  const papel = surge(t, c.l_codigo - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -20 }, { t: c.h_errado, s: 1.0, y: 0 }, { t: c.l_sozinho, s: 1.02, x: -20 }, { t: c.c_inercia, s: 1.06, x: 0, y: -20 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={660} p={prog(t, 0, 0.6) * (1 - 0.5 * inercia)} />
          <Figura t={t} x={330} y={CHAO} pose={t < c.l_protege && t > c.h_exclusividade - 0.2 ? "apontando" : inercia > 0.5 ? "cabisbaixo" : "pe"} item="pasta" tom={inercia > 0.5 ? "cinza" : "luz"} />
          <Figura t={t} x={mix(xDono, 980, vende)} y={CHAO} s={0.96} tom="cinza" flip item="chave" pose={vende > 0.02 && vende < 0.98 ? "andando" : "pe"} fase={t * 1.6} />
          <Figura t={t} x={1000} y={CHAO} s={0.9} tom="apagado" flip p={surge(t, c.l_sozinho - 0.4)} />
          <Papel x={540} y={760} p={papel} ass1={prog(t, c.l_escrito - 0.1, 0.5)} ass2={prog(t, c.l_escrito + 0.3, 0.5)} rotulo="EXCLUSIVIDADE" />
          <g opacity={surge(t, c.l_devida - 0.1) * (1 - inercia)}><Icone t={t} nome="dinheiro" x={330} y={700} r={40} /></g>
          <g opacity={surge(t, c.c_inercia - 0.1)}><Icone t={t} nome="x" x={330} y={700} r={36} tom="vermelho" /></g>
        </Svg>
        <Pilula t={t} at={c.h_errado - 0.1} ate={c.l_protege - 0.2} x={330} y={830} texto="PEDIDO DO JEITO ERRADO" tom="vermelho" size={24} />
        <Pilula t={t} at={c.l_codigo} ate={c.c_condicao - 0.2} x={540} y={560} texto="CÓDIGO CIVIL · ART. 726" tom="branco" size={28} />
        <Pilula t={t} at={c.l_escrito + 0.2} ate={c.c_condicao - 0.2} x={540} y={960} texto="POR ESCRITO" tom="branco" size={26} />
        <Pilula t={t} at={c.l_sozinho} ate={c.c_condicao - 0.2} x={880} y={830} texto="VENDEU SOZINHO" tom="cinza" size={24} />
        <Pilula t={t} at={c.l_devida} ate={c.c_condicao - 0.2} x={240} y={560} texto="COMISSÃO DEVIDA" tom="verde" size={24} />
        <Pilula t={t} at={c.c_inercia - 0.05} x={240} y={560} texto="SALVO INÉRCIA" tom="vermelho" cheia size={26} />
        <Pilula t={t} at={c.l_codigo + 0.4} x={540} y={1490} texto="NÃO É ORIENTAÇÃO JURÍDICA" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.h_medo - 0.1} ate={c.l_protege - 0.3} linhas={[{ texto: "MEDO DE", size: 72 }, { texto: "EXCLUSIVIDADE", cor: "vermelho", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.l_protege - 0.05} ate={c.c_condicao - 0.3} linhas={[{ texto: "A LEI PROTEGE", size: 72 }, { texto: "O EXCLUSIVO", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.c_condicao - 0.05} ate={c.v_ouseja - 0.2} linhas={[{ texto: "MAS TEM", size: 72 }, { texto: "UMA CONDIÇÃO", cor: "vermelho", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3–4 · a chance de trabalhar e o plano ---------------------------------------------------------------- */
const SEM = [{ at: "p_fazer", txt: "O QUE VAI FAZER" }, { at: "p_tempo", txt: "EM QUANTO TEMPO" }, { at: "p_contas", txt: "PRESTAR CONTAS" }, { at: "p_semana", txt: "TODA SEMANA" }];
export const Plano: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_ouseja - 0.3, c.f_posse - 0.35, 0.6, 0.45);
  if (on <= 0.001) return null;
  const chance = prog(t, c.v_chance - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_ouseja} push={0.004} keys={[{ t: c.v_ouseja - 0.3, s: 1.04 }, { t: c.v_chance, s: 1.0, e: ease.out }, { t: c.p_plano, s: 1.0, y: -10 }, { t: c.p_semana, s: 1.05, y: -20 }]}>
        <Svg>
          <Chao />
          <Holofote x={300} chao={CHAO} w={420} p={0.85} cor={chance > 0.5 ? A.hex : "#FFFFFF"} />
          <Halo x={300} y={CHAO - 150} r={300} p={0.5 * chance} cor={A.hex} />
          <Figura t={t} x={300} y={CHAO} pose={t > c.p_plano - 0.1 ? "apontando" : chance > 0.5 ? "bracosAbertos" : "pe"} item="pasta" tom={chance > 0.5 ? "luz" : "cinza"} />
          {SEM.map((k, i) => {
            const at = c[k.at];
            const x = 610, y = 560 + i * 125;
            return <g key={k.txt} opacity={surge(t, at - 0.15)}><Icone t={t} nome={i === 3 ? "calendario" : i === 2 ? "documento" : i === 1 ? "relogio" : "check"} x={x} y={y} r={44} tom={i === 3 && t > at ? "verde" : "branco"} brilho={i === 3 && t > at} /></g>;
          })}
        </Svg>
        {SEM.map((k, i) => <Pilula key={k.txt} t={t} at={c[k.at] - 0.05} x={850} y={560 + i * 125} texto={k.txt} tom={i === 3 ? "verde" : "branco"} size={24} />)}
      </CamNoir>
      <TituloNoir t={t} at={c.v_ouseja - 0.05} ate={c.v_chance - 0.35} linhas={[{ texto: "NÃO GARANTE", size: 72 }, { texto: "A COMISSÃO", cor: "vermelho", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.v_chance - 0.1} ate={c.p_plano - 0.3} linhas={[{ texto: "GARANTE A CHANCE", size: 64 }, { texto: "DE TRABALHAR", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.p_plano - 0.1} ate={c.f_posse - 0.4} linhas={[{ texto: "PEÇA COM", size: 72 }, { texto: "UM PLANO", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 5 · posse × compromisso ---------------------------------------------------------------- */
export const Compromisso: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_posse - 0.4, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const comp = prog(t, c.f_compromisso - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_posse} push={0.005} keys={[{ t: c.f_posse - 0.4, s: 1.06, y: -20 }, { t: c.f_compromisso, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={560} p={0.85} cor={comp > 0.5 ? A.hex : "#FFFFFF"} />
          <Figura t={t} x={360} y={CHAO} item="pasta" tom={comp > 0.5 ? "verde" : "luz"} pose={comp > 0.5 ? "bracosAbertos" : "pe"} />
          <Figura t={t} x={720} y={CHAO} s={0.96} tom="cinza" flip />
          <g opacity={surge(t, c.f_posse - 0.1) * (1 - comp)}>
            <Icone t={t} nome="cadeado" x={540} y={760} r={50} tom="vermelho" />
          </g>
          <Papel x={540} y={760} w={200} h={250} p={comp} verde ass1={1} ass2={1} rotulo="COMPROMISSO" />
        </Svg>
        <Pilula t={t} at={c.f_posse} ate={c.f_compromisso - 0.1} x={540} y={600} texto="POSSE DO IMÓVEL" tom="vermelho" size={26} />
        <Pilula t={t} at={c.f_compromisso + 0.1} x={540} y={940} texto="TRABALHO POR ESCRITO" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.f_posse - 0.1} ate={c.f_compromisso - 0.35} linhas={[{ texto: "NÃO É", size: 72 }, { texto: "POSSE", cor: "vermelho", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.f_compromisso - 0.15} ate={c.cta_quer - 0.3} linhas={[{ texto: "É", size: 72 }, { texto: "COMPROMISSO", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
