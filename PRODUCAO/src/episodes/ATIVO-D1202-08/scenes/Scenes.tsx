import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, Porta, Prancha, Rota, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-D1202-08 — "O 13º e o ITBI" (grade 02/12/2026 · 08h · AGORA · Planta técnica v2).
 * Folhas: o 13º (1ª parcela até 30/11) e a seta para a ENTRADA → mergulho: A COMPRA (PREÇO · ITBI 3% SP/RIO/BH · CARTÓRIO;
 * R$ 400 mil → R$ 12 mil) → mergulho no ITBI: sem imposto pago a porta para a ESCRITURA fecha, o financiamento aprovado
 * fica parado → a pergunta certa (IMPOSTO? CARTÓRIO?) e o 13º começa a reserva → a porta abre, a escritura acende → fecho.
 * Apuração: Lei 4.749/1965 art. 2º; ITBI 3% nas três capitais (prefeituras); cartório sem número (tabela estadual).
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "start" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);

/* ------------------------------------------------ 1 · o 13º e a entrada ------------------------------------------------ */
const ENTRADA = { x: 560, y: 200, w: 360, h: 380 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.i_custo - 0.6, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ENTRADA, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.0 }, { t: c.h_segunda, s: 1.03, y: -8, e: ease.out }, { t: c.c_entrada, s: 1.05, x: -16, y: -10, e: ease.inOut }, { t: c.c_conta, s: 1.07, x: -10, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="O CLIENTE · DEZEMBRO" p={prog(t, 0.2, 0.5)} />
              <Comodo x={170} y={220} w={300} h={180} p={prog(t, c.h_parcela - 0.3, 0.7, ease.out)} titulo="13º" sub="1ª PARCELA" titleSize={64} />
              <Cota x1={170} x2={470} y={450} texto="ATÉ 30/11" p={prog(t, c.h_segunda - 0.2, 0.6)} cor={C.text} />
              <Rota id="entrada" d="M 470 310 L 560 310" p={prog(t, c.c_entrada - 0.25, 0.45, ease.out)} tom="accent" />
              <Rot x={320} y={540} anchor="middle" texto="ÀS VEZES DÁ" p={prog(t, c.c_vezes - 0.1, 0.4)} cor={C.text} size={28} />
              <Chamada x={740} y={580} bx={170} by={620} bw={440} texto="OUTRA CONTA" p={prog(t, c.c_conta - 0.35, 0.6)} tone="warn" />
            </g>
            <Comodo {...ENTRADA} p={prog(t, c.c_entrada - 0.5, 0.7, ease.out)} titulo="ENTRADA" sub="DO IMÓVEL" titleSize={48} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={sp(t, -0.3, { damping: 14, stiffness: 160 }) * (1 - prog(t, c.c_cliente - 0.3, 0.2))} size={58}>O <G>13º</G> CAIU</TituloFolha>
      <TituloFolha p={prog(t, c.c_cliente - 0.1, 0.35) * (1 - prog(t, c.i_custo - 0.7, 0.2))} size={58}>DÁ PARA A <G>ENTRADA</G>?</TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 2 · a compra: preço, ITBI, cartório ------------------------------------------------ */
const ITBI = { x: 160, y: 430, w: 400, h: 300 };
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.i_custo - 0.15;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.v_sem - 0.6, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ITBI, TELA);
  const doze = prog(t, c.i_12 - 0.1, 0.4);
  const cidades = `3%${t > c.i_paulo - 0.05 ? " · SP" : ""}${t > c.i_rio - 0.05 ? " · RIO" : ""}${t > c.i_bh - 0.05 ? " · BH" : ""}`;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.i_itbi, s: 1.03, y: -14, e: ease.inOut }, { t: c.i_400, s: 1.04, y: -6, e: ease.inOut }, { t: c.i_cartorio, s: 1.06, x: -10, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="A COMPRA · O QUE ENTRA NA CONTA" p={prog(t, ini + 0.2, 0.5)} />
              <Comodo x={160} y={200} w={760} h={160} p={prog(t, ini, 0.7, ease.out)} titulo="PREÇO" sub="O QUE APARECE NO ANÚNCIO" titleSize={44} />
              <Cota x1={160} x2={920} y={400} texto="R$ 400 MIL" p={prog(t, c.i_400 - 0.25, 0.6)} cor={C.text} />
              <Comodo x={590} y={430} w={330} h={300} p={prog(t, c.i_cartorio - 0.4, 0.7, ease.out)} titulo="CARTÓRIO" sub="TABELA DO ESTADO" titleSize={36} />
            </g>
            <Comodo {...ITBI} p={prog(t, c.i_itbi - 0.4, 0.7, ease.out)} titulo="ITBI" sub={doze > 0.5 ? "= R$ 12 MIL" : "IMPOSTO DA PREFEITURA"} titleSize={52} acende={doze} />
            <g opacity={m.outros}>
              <Rot x={360} y={490} anchor="middle" texto={cidades} p={prog(t, c.i_tres - 0.1, 0.4)} cor={C.text} size={28} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_sem - 0.7, 0.2))} size={56}>O CUSTO <G>FORA DO PREÇO</G></TituloFolha>
      <SeloPlanta texto="ALÍQUOTA DAS PREFEITURAS · MUDA POR CIDADE" p={prog(t, c.i_tres, 0.4) * (1 - prog(t, c.v_sem - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 3 · sem imposto, sem escritura ------------------------------------------------ */
const Transferencia: React.FC<{ t: number; ini: number; c: Record<string, number>; fim: boolean }> = ({ t, ini, c, fim }) => {
  const fecha = fim ? 0 : prog(t, c.v_sai - 0.1, 0.3);
  const abre = fim ? prog(t, c.f_quem - 0.1, 0.4) : 0;
  return (
    <g>
      <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
      <Rot x={540} y={170} anchor="middle" texto="A TRANSFERÊNCIA" p={prog(t, ini + 0.2, 0.5)} />
      <Comodo x={160} y={220} w={300} h={200} p={prog(t, ini, 0.6, ease.out)} titulo="ITBI" sub={fim ? (abre > 0.5 ? "PAGO" : "RESERVADO") : "NÃO PAGO"} titleSize={46} tone={fim ? "linha" : "warn"} />
      {fim ? <Porta x={460} y={330} r={80} p={abre} aberta /> : <Porta x={460} y={330} r={80} p={fecha} aberta={false} />}
      <Comodo x={560} y={220} w={360} h={200} p={prog(t, ini + 0.25, 0.6, ease.out)} titulo="ESCRITURA" sub={fim ? (abre > 0.5 ? "SAI" : "") : fecha > 0.5 ? "NÃO SAI" : ""}
        titleSize={42} tone={!fim && fecha > 0.5 ? "warn" : "linha"} acende={fim ? prog(t, c.f_antes - 0.1, 0.4) : 0} />
      {!fim ? (
        <>
          <Comodo x={160} y={520} w={760} h={180} p={prog(t, c.v_trava - 0.2, 0.6, ease.out)} titulo="FINANCIAMENTO" sub={t > c.v_aprovado - 0.1 ? "APROVADO" : ""} titleSize={40} tone="muted" />
          <Rota id="fin" d="M 740 520 L 740 430" p={prog(t, c.v_aprovado - 0.1, 0.4)} tom="warn" />
        </>
      ) : null}
    </g>
  );
};
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_sem - 0.1;
  if (t < ini - 0.05 || t > c.p_pergunta + 0.2) return null;
  const sai = prog(t, c.p_pergunta - 0.35, 0.4);
  const carimbo = sp(t, c.v_trava - 0.1, { damping: 10, stiffness: 220 });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_sai, s: 1.04, x: -8, y: -8, e: ease.out }, { t: c.v_trava, s: 1.02, y: -20, e: ease.inOut }, { t: c.v_aprovado, s: 1.05, y: -28, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Transferencia t={t} ini={ini} c={c} fim={false} />
          <g opacity={fade(carimbo)} transform={`translate(400 470) rotate(-7) scale(${1 + 0.4 * (1 - Math.min(1, carimbo))})`}>
            <rect x={-170} y={-50} width={340} height={100} rx={10} fill="rgba(255,107,94,0.14)" stroke={C.warn} strokeWidth={4} />
            <text x={0} y={18} textAnchor="middle" fill={C.warn} fontFamily={M} fontWeight={700} fontSize={50} letterSpacing="0.1em">TRAVOU</text>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_trava - 0.4, 0.2))} size={56}>SEM IMPOSTO, <W>SEM ESCRITURA</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_trava - 0.2, 0.35)} size={56}>A COMPRA <W>TRAVA</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 4 · a pergunta certa ------------------------------------------------ */
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.p_pergunta - 0.3;
  if (t < ini - 0.05 || t > c.f_quem + 0.3) return null;
  const sai = prog(t, c.f_quem - 0.4, 0.4);
  const ate = 1 - prog(t, c.p_decimo - 0.2, 0.3);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.p_separou, s: 1.03, y: -10, e: ease.out }, { t: c.p_decimo, s: 1.05, y: -30, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="A CONVERSA COM O COMPRADOR" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={160} y={200} w={760} h={130} p={prog(t, ini, 0.6, ease.out)} titulo="QUANTO TEM DE ENTRADA?" titleSize={34} tone="muted" />
          <Rot x={540} y={355} anchor="middle" texto="NÃO É SÓ ISSO" p={prog(t, c.p_entrada - 0.6, 0.4) * (1 - prog(t, c.p_separou - 0.2, 0.3))} cor={C.text} size={26} />
          <Comodo x={160} y={370} w={370} h={160} p={prog(t, c.p_entrada - 0.4, 0.7, ease.out)} titulo="IMPOSTO" sub="SEPARADO?" titleSize={38}
            acende={prog(t, c.p_imposto - 0.05, 0.3) * ate} />
          <Comodo x={550} y={370} w={370} h={160} p={prog(t, c.p_entrada - 0.1, 0.7, ease.out)} titulo="CARTÓRIO" sub="SEPARADO?" titleSize={38}
            acende={prog(t, c.p_cartorio - 0.05, 0.3) * ate} />
          <Comodo x={160} y={590} w={260} h={140} p={prog(t, c.p_decimo - 0.3, 0.6, ease.out)} titulo="13º" titleSize={52} />
          <Rota id="reserva" d="M 290 590 L 290 530" p={prog(t, c.p_decimo, 0.5)} tom="accent" />
          <Chamada x={420} y={660} bx={480} by={618} bw={440} texto="COMEÇA A RESERVA" p={prog(t, c.p_reserva - 0.3, 0.6)} tone="accent" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35)} size={56}>A PERGUNTA <G>CERTA</G></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 5 · conta feita antes ------------------------------------------------ */
export const Take4: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.f_quem - 0.35;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.f_surpresa, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Transferencia t={t} ini={ini} c={c} fim />
          <Cota x1={160} x2={920} y={520} texto="CONTA FEITA ANTES DA VISITA" p={prog(t, c.f_antes - 0.2, 0.6)} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35)} size={56}>SEM <G>SURPRESA</G> NO CARTÓRIO</TituloFolha>
      <SeloPlanta texto="A ALÍQUOTA MUDA POR CIDADE · CONFIRA A SUA" p={prog(t, c.f_quem, 0.4)} />
    </div>
  );
};
