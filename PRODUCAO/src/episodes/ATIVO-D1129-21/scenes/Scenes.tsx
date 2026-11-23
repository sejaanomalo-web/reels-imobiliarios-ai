import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Dissolver, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1129-21 — "Visita não é cortesia" (grade 29/11/2026 · 21h · IDEIA QUE MUDA O JOGO · Pictograma cinematográfico).
 * Sem corte seco: EUA (porta travada → acordo assinado → a porta abre) — travelling → Brasil (porta aberta, só conversa) →
 * o comprador fecha com o dono e a luz apaga com âncora no corretor → a balança da prova (art. 727, cartões que acendem e
 * somem) → as duas portas lado a lado e o registro que se desenha → fecho CtaNoir.
 * Apuração: regra do acordo da NAR para quem participa do MLS (desde 17/08/2024), não "lei federal"; art. 727 do Código
 * Civil; não é orientação jurídica (selo); a ficha não "garante" a comissão.
 */
const CHAO = 1180;
const Svg: React.FC<{ children: React.ReactNode; w?: number }> = ({ children, w = 1080 }) => <svg width={w} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC<{ x1?: number; x2?: number }> = ({ x1 = -400, x2 = 2600 }) => <line x1={x1} y1={CHAO} x2={x2} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
type P = { t: number; tl: Timeline };
const W = (tl: Timeline, re: RegExp, seg: string, fb: number) => {
  for (const k of tl.captions) if (k.seg === seg) for (const x of k.words) if (re.test(x.text)) return x.start;
  return fb;
};
const GLOW = "drop-shadow(0 0 10px rgba(255,255,255,0.45))";
const GLOW_V = `drop-shadow(0 0 10px ${aa(0.6)})`;

/** Porta em linha fina, de frente (dobradiça à direita). `abre` 0..1 gira a folha e acende o vão. `trava` faz a maçaneta tremer. */
const PortaNoir: React.FC<{ t: number; x: number; w?: number; h?: number; abre?: number; trava?: number; p?: number; luzVerde?: number }> = ({ t, x, w = 230, h = 470, abre = 0, trava = 0, p = 1, luzVerde = 0 }) => {
  const y0 = CHAO - h;
  const folha = w * (1 - 0.78 * clamp(abre));
  const treme = trava > 0 && trava < 1 ? Math.sin(t * 60) * 6 * (1 - trava) : 0;
  return (
    <g opacity={clamp(p)}>
      {abre > 0.01 ? (
        <g>
          <rect x={x} y={y0} width={w} height={h} fill={luzVerde > 0 ? aa(0.18 * luzVerde) : `rgba(255,255,255,${0.16 * abre})`} />
          <Halo x={x + w / 2} y={y0 + h * 0.55} r={w * 1.3} p={abre} cor={luzVerde > 0.5 ? A.hex : "#FFFFFF"} />
        </g>
      ) : null}
      <rect x={x} y={y0} width={w} height={h} fill="none" stroke={NOIR.branco} strokeWidth={4} style={{ filter: GLOW }} />
      <path d={`M ${x + w - folha} ${y0 + 10 * abre} L ${x + w} ${y0} L ${x + w} ${CHAO} L ${x + w - folha} ${CHAO - 10 * abre} Z`} fill="#0A0A0A" stroke={NOIR.linha} strokeWidth={3} />
      <g transform={`translate(${x + w - folha + 30} ${y0 + h * 0.55}) rotate(${treme})`} opacity={1 - clamp(abre * 2)}>
        <circle r={10} fill="none" stroke={trava > 0 && trava < 1 ? NOIR.vermelho : NOIR.branco} strokeWidth={3} />
        <line x1={0} y1={0} x2={22} y2={0} stroke={trava > 0 && trava < 1 ? NOIR.vermelho : NOIR.branco} strokeWidth={3} strokeLinecap="round" />
      </g>
    </g>
  );
};
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** Papel (acordo / registro) em linha: linhas de texto, assinaturas e campo de valor. */
const Papel: React.FC<{ x: number; y: number; w?: number; h?: number; p: number; ass1?: number; ass2?: number; campo?: number; rotulo?: string; verde?: boolean }> = ({ x, y, w = 250, h = 320, p, ass1 = 0, ass2 = 0, campo = 0, rotulo, verde = false }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const cor = verde ? A.hex : NOIR.branco;
  const x0 = x - w / 2, y0 = y - h / 2;
  const sig = (sx: number, q: number) => <path d={`M ${sx} ${y0 + h - 58} c 14 -30 24 22 38 -6 s 22 -26 30 4 s 18 10 28 -8`} fill="none" stroke={A.hex} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp(q)} style={{ filter: GLOW_V }} opacity={q > 0.001 ? 1 : 0} />;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 20})`}>
      <rect x={x0} y={y0} width={w} height={h} rx={10} fill="#0A0A0A" stroke={cor} strokeWidth={3} style={{ filter: verde ? GLOW_V : GLOW }} />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={x0 + 26} y1={y0 + 48 + i * 30} x2={x0 + w - 26 - (i === 3 ? 70 : 0)} y2={y0 + 48 + i * 30} stroke={verde ? aa(0.7) : NOIR.linhaFraca} strokeWidth={3} strokeLinecap="round" />)}
      {campo > 0.001 ? (
        <g>
          <rect x={x0 + 22} y={y0 + 168} width={w - 44} height={42} rx={8} fill="none" stroke={A.hex} strokeWidth={2.5} />
          <rect x={x0 + 26} y={y0 + 172} width={(w - 52) * clamp(campo)} height={34} rx={6} fill={aa(0.35)} />
        </g>
      ) : null}
      {rotulo ? <text x={x} y={y0 + 196} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={24} letterSpacing="0.1em" fill={campo > 0.5 || verde ? A.hex : NOIR.branco} opacity={campo > 0.05 || verde ? 1 : 0}>{rotulo}</text> : null}
      {sig(x0 + 26, ass1)}
      {sig(x0 + w / 2 + 6, ass2)}
      <line x1={x0 + 22} y1={y0 + h - 34} x2={x0 + w / 2 - 12} y2={y0 + h - 34} stroke={NOIR.linhaFraca} strokeWidth={2} />
      <line x1={x0 + w / 2 + 4} y1={y0 + h - 34} x2={x0 + w - 22} y2={y0 + h - 34} stroke={NOIR.linhaFraca} strokeWidth={2} />
    </g>
  );
};

/* ---------------------------------------------------------------- 1–4 · EUA → (travelling) → Brasil → o comprador some ---------------------------------------------------------------- */
const BR = 1080; // o "Brasil" fica à direita, no mesmo chão
export const Portas: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tAss2 = W(tl, /^assinam$/i, "s2", c.r_assinam + 0.3);
  const abreEUA = prog(t, c.r_recebe + 0.25, 0.9, ease.inOut);
  const vai = prog(t, c.b_visita - 0.3, 1.6, ease.inOut);
  const some = prog(t, c.p_some - 0.4, 1.5, ease.inOut);
  const xCor = mix(BR + 250, BR + 540, vai);
  const xCompr = mix(mix(BR + 130, BR + 720, vai), BR + 850, some);
  const andaCompr = (t > c.b_visita - 0.3 && t < c.b_visita + 1.3) || (t > c.p_some - 0.4 && t < c.p_some + 1.1);
  const andaCor = t > c.b_visita - 0.3 && t < c.b_visita + 1.3;
  const apaga = prog(t, c.p_dono - 0.1, 0.8, ease.inOut);
  const out = 1 - prog(t, c.p_dono + 0.9, 0.35);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <CamNoir t={t} push={0} keys={[{ t: 0, s: 1.04, x: 0 }, { t: c.h_contrato, s: 1.08, x: -20, y: -20 }, { t: c.r_agosto, s: 1.0, x: 0 }, { t: c.r_recebe + 0.8, s: 1.03, x: 0, y: -10 }, { t: c.b_brasil - 0.4, s: 1.03, x: 0, y: -10 }, { t: c.b_brasil + 0.9, s: 1.0, x: -BR }, { t: c.p_some, s: 1.0, x: -BR }, { t: c.p_dono + 0.4, s: 1.0, x: -BR }]}>
        <Svg w={2160}>
          <Chao />
          {/* EUA */}
          <Holofote x={540} chao={CHAO} w={620} p={prog(t, 0, 0.6)} />
          <PortaNoir t={t} x={650} abre={abreEUA} trava={prog(t, c.h_contrato - 0.1, 0.9)} />
          <Figura t={t} x={520} y={CHAO} pose={t < c.r_agosto ? "apontando" : "pe"} item="pasta" />
          <Figura t={t} x={300} y={CHAO} s={0.95} tom="cinza" p={surge(t, 0.3)} />
          <Papel x={300} y={720} p={surge(t, c.h_contrato - 0.1, 0.6)} ass1={prog(t, c.r_assinam - 0.1, 0.5)} ass2={prog(t, tAss2 + 0.2, 0.5)} campo={prog(t, c.r_recebe - 0.25, 0.6)} rotulo="REMUNERAÇÃO" />
          <g opacity={surge(t, c.r_video - 0.1) * (1 - prog(t, c.b_brasil, 0.4))}><Icone t={t} nome="telefone" x={180} y={640} r={46} /></g>
          {/* Brasil */}
          <Holofote x={BR + 520} chao={CHAO} w={560} p={(1 - apaga * 0.9) * prog(t, c.b_brasil - 0.2, 0.8)} />
          <PortaNoir t={t} x={BR + 610} abre={1} />
          <Figura t={t} x={xCor} y={CHAO} pose={andaCor ? "andando" : "pe"} fase={t * 1.6} item="pasta" />
          <Figura t={t} x={xCompr} y={CHAO} s={0.95} pose={andaCompr ? "andando" : "pe"} fase={t * 1.6} tom="cinza" />
          <Figura t={t} x={BR + 935} y={CHAO} s={0.98} tom="cinza" flip p={surge(t, c.p_some - 0.2)} />
          {t > c.p_dono - 0.3 ? <g transform={`translate(${BR + 892} ${CHAO - 150})`} opacity={surge(t, c.p_dono - 0.3)}><circle r={20} fill="none" stroke={NOIR.vermelho} strokeWidth={3} /></g> : null}
        </Svg>
        <Bolha t={t} at={c.b_conversa - 0.2} ate={c.b_confianca - 0.1} x={BR + 230} y={760} lado="esq" texto="Pode ser sábado?" size={30} />
        <Bolha t={t} at={c.b_conversa + 0.15} ate={c.b_confianca + 0.15} x={BR + 980} y={700} lado="dir" texto="Combinado!" tom="cinza" size={30} />
        <Pilula t={t} at={c.h_eua - 0.1} ate={c.b_brasil + 0.3} x={765} y={650} texto="EUA" tom="branco" size={30} />
        <Pilula t={t} at={c.b_brasil} x={BR + 725} y={650} texto="BRASIL" tom="branco" size={30} ate={c.p_some - 0.3} />
        <Pilula t={t} at={c.p_dono} x={BR + 830} y={820} texto="FECHOU DIRETO" tom="vermelho" cheia size={26} />
      </CamNoir>
      {/* apagar a luz com âncora no corretor (ele fica onde a próxima cena começa) */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: apaga }}>
        <defs>
          <radialGradient id="ancora21" cx={540} cy={1040} r={mix(1400, 230, apaga)} gradientUnits="userSpaceOnUse">
            <stop offset="0.55" stopColor="#000" stopOpacity={0} />
            <stop offset="1" stopColor="#000" stopOpacity={0.96} />
          </radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#ancora21)" />
      </svg>
      <TituloNoir t={t} at={c.h_contrato - 0.05} ate={c.r_agosto - 0.3} linhas={[{ texto: "SEM CONTRATO,", size: 76 }, { texto: "SEM VISITA", cor: "vermelho", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.r_agosto - 0.05} ate={c.b_brasil - 0.3} linhas={[{ texto: "DESDE 08/2024", size: 64 }, { texto: "ACORDO ANTES DA VISITA", size: 58 }]} top={300} />
      <TituloNoir t={t} at={c.b_brasil + 0.3} ate={c.p_some - 0.4} linhas={[{ texto: "NO BRASIL,", size: 64 }, { texto: "NA CONVERSA", size: 84 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 5–6 · a balança da prova ---------------------------------------------------------------- */
const PIV = { x: 540, y: 600 };
const BRACO = 210;
const Prato: React.FC<{ x: number; y: number; children?: React.ReactNode; cor?: string }> = ({ x, y, children, cor = NOIR.branco }) => (
  <g>
    <line x1={x} y1={y - 140} x2={x - 70} y2={y} stroke={NOIR.linha} strokeWidth={2} />
    <line x1={x} y1={y - 140} x2={x + 70} y2={y} stroke={NOIR.linha} strokeWidth={2} />
    <path d={`M ${x - 90} ${y} Q ${x} ${y + 46} ${x + 90} ${y}`} fill="#0A0A0A" stroke={cor} strokeWidth={3.5} style={{ filter: GLOW }} />
    {children}
  </g>
);
export const Balanca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.p_dono + 0.5, c.t_la - 0.35, 0.5, 0.45);
  if (on <= 0.001) return null;
  const bal = surge(t, c.v_codigo - 0.1, 0.7);
  const cartas = [c.f_ficha, c.f_mensagens, c.f_proposta];
  const somem = prog(t, c.f_sem - 0.1, 0.5);
  const peso = cartas.reduce((a, at) => a + prog(t, at - 0.1, 0.5, ease.out), 0) * (1 - somem);
  // ângulo do braço (graus, + = direita desce): comissão pesa à esquerda; cada prova pesa à direita
  const ang = -9 * prog(t, c.v_comissao - 0.1, 0.6) + 6.5 * peso;
  const rad = (ang * Math.PI) / 180;
  const pe: [number, number] = [PIV.x - Math.cos(rad) * BRACO, PIV.y - Math.sin(rad) * BRACO];
  const pd: [number, number] = [PIV.x + Math.cos(rad) * BRACO, PIV.y + Math.sin(rad) * BRACO];
  const palavra = surge(t, c.f_palavra - 0.1);
  const nomes = ["documento", "chat", "check"] as const;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.p_dono} push={0.004} keys={[{ t: c.p_dono + 0.5, s: 1.0 }, { t: c.v_provar, s: 1.03, y: -10 }, { t: c.f_ficha, s: 1.0, y: 0 }, { t: c.f_palavra, s: 1.04, y: -14 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={460} p={0.85} />
          <Figura t={t} x={540} y={CHAO} pose={t > c.f_sem - 0.1 ? "cabisbaixo" : "pe"} item="pasta" />
          <g opacity={bal} transform={`translate(0 ${(1 - bal) * 24})`}>
            <line x1={PIV.x} y1={PIV.y - 20} x2={PIV.x} y2={PIV.y + 230} stroke={NOIR.linha} strokeWidth={3} />
            <path d={`M ${PIV.x - 60} ${PIV.y + 236} L ${PIV.x + 60} ${PIV.y + 236}`} stroke={NOIR.linha} strokeWidth={3} strokeLinecap="round" />
            <circle cx={PIV.x} cy={PIV.y - 26} r={9} fill="none" stroke={NOIR.branco} strokeWidth={3} />
            <line x1={pe[0]} y1={pe[1]} x2={pd[0]} y2={pd[1]} stroke={NOIR.branco} strokeWidth={4} strokeLinecap="round" style={{ filter: GLOW }} />
            <Prato x={pe[0]} y={pe[1] + 140}>
              <g opacity={surge(t, c.v_comissao - 0.1)}><Icone t={t} nome="dinheiro" x={pe[0]} y={pe[1] + 108} r={34} /></g>
            </Prato>
            <Prato x={pd[0]} y={pd[1] + 140} cor={peso > 2.5 ? A.hex : NOIR.branco}>
              {cartas.map((at, i) => {
                const cai = prog(t, at - 0.25, 0.4, ease.in);
                if (cai <= 0.001 || somem >= 0.999) return null;
                const acende = prog(t, at + 0.1, 0.3);
                return <g key={i} opacity={1 - somem}><Icone t={t} nome={nomes[i]} x={pd[0] - 60 + i * 60} y={mix(pd[1] - 200, pd[1] + 106, cai)} r={28} tom={acende > 0.5 ? "verde" : "branco"} brilho={acende > 0.5} /></g>;
              })}
              {palavra > 0.001 ? <g opacity={palavra}><Icone t={t} nome="chat" x={pd[0]} y={pd[1] + 108} r={26} tom="cinza" /></g> : null}
            </Prato>
            <Dissolver t={t} at={c.f_sem - 0.05} x={pd[0]} y={pd[1] + 130} w={180} h={70} n={70} dur={0.8} />
          </g>
        </Svg>
        <Pilula t={t} at={c.v_codigo} ate={c.v_provar - 0.3} x={540} y={350} texto="CÓDIGO CIVIL · ART. 727" tom="branco" size={28} />
        <Pilula t={t} at={c.v_comissao + 0.1} ate={c.v_provar - 0.3} x={pe[0]} y={470} texto="COMISSÃO" tom="branco" size={24} />
        <Pilula t={t} at={c.v_provar + 0.2} ate={c.f_ficha - 0.2} x={pd[0]} y={470} texto="PROVA?" tom="vermelho" size={24} />
        {["FICHA DE VISITA", "MENSAGENS", "PROPOSTA"].map((txt, i) => <Pilula key={txt} t={t} at={cartas[i] + 0.05} ate={c.f_sem - 0.1} x={540} y={330 + i * 70} texto={txt} tom="verde" size={28} />)}
        <Pilula t={t} at={c.f_palavra} x={540} y={400} texto="SÓ A SUA PALAVRA" tom="cinza" size={28} />
        <Pilula t={t} at={c.v_codigo + 0.4} ate={c.f_ficha - 0.2} x={540} y={1490} texto="NÃO É ORIENTAÇÃO JURÍDICA" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_provar - 0.05} ate={c.f_ficha - 0.35} linhas={[{ texto: "COMO PROVAR?", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 7 · lá × aqui: visita é trabalho ---------------------------------------------------------------- */
export const Tese: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.t_la - 0.4, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const reg = prog(t, c.t_registrado - 0.2, 1.2, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.t_la} push={0.005} keys={[{ t: c.t_la - 0.4, s: 1.04 }, { t: c.t_aqui, s: 1.0, e: ease.out }, { t: c.t_registrado, s: 1.04, x: -20, y: -10 }]}>
        <Svg>
          <Chao />
          <Holofote x={300} chao={CHAO} w={380} p={0.6 * (1 - 0.5 * prog(t, c.t_aqui, 0.6))} />
          <Holofote x={780} chao={CHAO} w={380} p={prog(t, c.t_aqui - 0.2, 0.6)} cor={reg > 0.5 ? A.hex : "#FFFFFF"} />
          <PortaNoir t={t} x={190} w={210} h={430} abre={1} p={surge(t, c.t_la - 0.3, 0.6)} />
          <PortaNoir t={t} x={670} w={210} h={430} abre={1} p={surge(t, c.t_aqui - 0.3, 0.6)} luzVerde={reg} />
          <Papel x={140} y={830} w={150} h={200} p={surge(t, c.t_la, 0.5)} />
          <Papel x={775} y={930} w={150} h={210} p={reg} verde ass1={prog(t, c.t_lembranca - 0.6, 0.5)} rotulo="" />
          <Figura t={t} x={540} y={CHAO} s={0.9} item="pasta" p={surge(t, c.t_aqui, 0.6)} pose={t > c.t_trabalho ? "bracosAbertos" : "pe"} tom={t > c.t_trabalho ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.t_la} x={295} y={700} texto="LÁ · REGRA" tom="cinza" size={26} />
        <Pilula t={t} at={c.t_aqui} x={775} y={700} texto="AQUI · VOCÊ" tom="branco" size={26} />
        <Pilula t={t} at={c.t_registrado + 0.2} x={775} y={1100} texto="REGISTRADO ANTES" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.t_visita - 0.05} ate={c.t_trabalho - 0.35} linhas={[{ texto: "VISITA NÃO É", size: 72 }, { texto: "CORTESIA", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.t_trabalho - 0.1} ate={c.cta_quer - 0.3} linhas={[{ texto: "VISITA É", size: 72 }, { texto: "TRABALHO", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

