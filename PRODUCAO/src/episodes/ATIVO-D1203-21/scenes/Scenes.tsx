import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1203-21 — "O contra que vende" (grade 03/12/2026 · 21h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: o corretor elogia, o cliente ergue a lupa → "tudo é ótimo": as bolhas ÓTIMO se apagam e a lupa acha X
 * sozinha → a virada: o corretor mesmo mostra a cozinha pequena e a luz da sala acende → o mesmo defeito, dois caminhos:
 * dito por você = informação; descoberto por ele = desconfiança → às vezes o certo é dizer "não é pra você" → quem fala o
 * contra é acreditado no a favor → fecho CtaNoir. Tese por raciocínio; pictogramas ilustrativos.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW_V = `drop-shadow(0 0 12px ${aa(0.6)})`;
const clamp = (x: number) => Math.max(0, Math.min(1, x));

/** Cômodo em linha; `janela` acende verde (a luz da sala). */
const Comodo: React.FC<{ x: number; y: number; w: number; h: number; p: number; tom?: "branco" | "cinza" | "verde"; janela?: number }> = ({ x, y, w, h, p, tom = "branco", janela = 0 }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const cor = tom === "verde" ? A.hex : tom === "cinza" ? NOIR.cinza : NOIR.branco;
  return (
    <g opacity={k}>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="none" stroke={cor} strokeWidth={3} style={{ filter: tom === "verde" ? GLOW_V : undefined }} />
      <rect x={x + w * 0.08} y={y - h * 0.82} width={w * 0.32} height={h * 0.36} fill={janela > 0.01 ? aa(0.25 * janela) : "none"} stroke={janela > 0.5 ? A.hex : cor} strokeWidth={3} style={{ filter: janela > 0.5 ? GLOW_V : undefined }} />
    </g>
  );
};
/** Pia/fogão em linha (a cozinha pequena). */
const Cozinha: React.FC<{ x: number; y: number; w: number; h: number; p: number; alerta?: number }> = ({ x, y, w, h, p, alerta = 0 }) => {
  const k = clamp(p);
  if (k <= 0.001) return null;
  const cor = alerta > 0.5 ? NOIR.vermelho : NOIR.branco;
  return (
    <g opacity={k}>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="none" stroke={cor} strokeWidth={3} />
      <rect x={x - w / 2 + 14} y={y - 90} width={w - 28} height={90} fill="none" stroke={cor} strokeWidth={3} />
      {[0, 1].map((i) => <circle key={i} cx={x - w / 4 + i * (w / 2)} cy={y - 106} r={12} fill="none" stroke={cor} strokeWidth={3} />)}
    </g>
  );
};

/* ---------------------------------------------------------------- 1–2 · o elogio e o "tudo ótimo" ---------------------------------------------------------------- */
export const Elogio: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_imagine - 0.45, 0.5);
  if (on <= 0.001) return null;
  const apaga = prog(t, c.t_nada - 0.1, 0.5);
  const procura = prog(t, c.t_desconfia - 0.2, 1.4, ease.inOut);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_defeito, s: 1.0, e: ease.out }, { t: c.t_nada, s: 1.03, x: 30 }, { t: c.t_problema + 0.5, s: 1.07, x: -40, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={330} chao={CHAO} w={460} p={prog(t, 0, 0.6)} />
          <Holofote x={mix(760, 820, procura)} chao={CHAO} w={420} p={0.4 + 0.4 * prog(t, c.t_desconfia - 0.3, 0.4)} cor={procura > 0.3 ? "#FFD9D4" : "#FFFFFF"} />
          <Figura t={t} x={330} y={CHAO} pose={t > c.h_elogio - 0.2 && t < c.t_desconfia ? "apontando" : "pe"} tom="luz" />
          <Figura t={t} x={mix(760, 820, procura)} y={CHAO} flip pose={procura > 0.02 && procura < 0.98 ? "andando" : "pe"} fase={t * 1.6} tom="cinza" />
          <g opacity={surge(t, c.t_desconfia - 0.1)}><Icone t={t} nome="lupa" x={mix(720, 860, procura)} y={mix(860, 920, procura)} r={44} /></g>
          {[[680, 990], [900, 1040], [960, 900]].map(([x, y], i) => <g key={i} opacity={surge(t, c.t_problema - 0.1 + i * 0.18)}><Icone t={t} nome="x" x={x} y={y} r={26} tom="vermelho" /></g>)}
        </Svg>
        {[0, 1, 2].map((i) => (
          <Bolha key={i} t={t} at={c.t_otimo - 0.6 + i * 0.25} ate={c.t_desconfia + 0.3} x={70} y={660 + i * 95} texto="ÓTIMO!" tom={apaga > 0.5 ? "cinza" : "verde"} size={34} />
        ))}
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.h_defeito - 0.3} linhas={[{ texto: "ACREDITAM", size: 72 }, { texto: "NO SEU ELOGIO?", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.h_defeito - 0.15} ate={c.t_otimo - 0.4} linhas={[{ texto: "COMECE PELO", size: 72 }, { texto: "DEFEITO", cor: "vermelho", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.t_otimo - 0.25} ate={c.t_desconfia - 0.3} linhas={[{ texto: "TUDO ÓTIMO", size: 76 }, { texto: "NADA É", cor: "vermelho", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.t_desconfia - 0.15} ate={c.v_imagine - 0.45} linhas={[{ texto: "ELE PROCURA", size: 72 }, { texto: "SOZINHO", cor: "vermelho", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · você mesmo mostra ---------------------------------------------------------------- */
export const Mostra: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_imagine - 0.5, c.i_informacao - 2.3, 0.5, 0.5);
  if (on <= 0.001) return null;
  const anda = prog(t, c.v_luz - 0.6, 1.0, ease.inOut);
  const sala = prog(t, c.v_luz - 0.15, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_imagine} push={0.004} keys={[{ t: c.v_imagine - 0.5, s: 1.04, x: 60 }, { t: c.v_pequena, s: 1.06, x: 120, e: ease.inOut }, { t: c.v_luz + 0.4, s: 1.04, x: -100, e: ease.inOut }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(300, 760, anda)} chao={CHAO} w={480} p={0.8} cor={sala > 0.5 ? A.hex : "#FFFFFF"} />
          <Halo x={760} y={CHAO - 230} r={300} p={0.6 * sala} cor={A.hex} />
          <Cozinha x={280} y={CHAO} w={240} h={260} p={surge(t, c.v_mostra - 0.3, 0.5)} alerta={prog(t, c.v_pequena - 0.1, 0.3)} />
          <Comodo x={760} y={CHAO} w={380} h={320} p={surge(t, c.v_imagine, 0.6)} tom={sala > 0.5 ? "verde" : "branco"} janela={sala} />
          <Figura t={t} x={mix(470, 560, anda)} y={CHAO} pose={anda > 0.02 && anda < 0.98 ? "andando" : "apontando"} flip={anda < 0.5} fase={t * 1.6} tom="luz" />
          <Figura t={t} x={mix(560, 660, anda)} y={CHAO} s={0.92} pose={sala > 0.5 ? "bracosAbertos" : "pe"} tom={sala > 0.5 ? "verde" : "cinza"} />
        </Svg>
        <Pilula t={t} at={c.v_pequena - 0.05} ate={c.i_informacao - 2.4} x={280} y={840} texto="COZINHA PEQUENA" tom="vermelho" size={26} />
        <Pilula t={t} at={c.v_luz - 0.05} ate={c.i_informacao - 2.4} x={760} y={780} texto="LUZ DA SALA" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_imagine - 0.1} ate={c.v_mostra - 0.3} linhas={[{ texto: "ANTES DE ELE", size: 72 }, { texto: "PERCEBER", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.v_mostra - 0.15} ate={c.i_informacao - 2.4} linhas={[{ texto: "VOCÊ MESMO", size: 72 }, { texto: "MOSTRA", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · o mesmo defeito, dois caminhos ---------------------------------------------------------------- */
export const DoisCaminhos: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.i_informacao - 2.4, c.i_certo - 1.0, 0.6, 0.5);
  if (on <= 0.001) return null;
  const esq = surge(t, c.i_informacao - 0.2, 0.5);
  const dir = surge(t, c.i_desconfianca - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.i_informacao - 2.4} push={0.005} keys={[{ t: c.i_informacao - 2.4, s: 1.04, x: 80 }, { t: c.i_informacao, s: 1.02, x: 60, e: ease.inOut }, { t: c.i_desconfianca, s: 1.04, x: -60, e: ease.inOut }]}>
        <Svg>
          <Chao />
          <line x1={540} y1={700} x2={540} y2={CHAO} stroke={NOIR.linhaFraca} strokeWidth={2} strokeDasharray="6 10" />
          <Holofote x={290} chao={CHAO} w={420} p={0.4 + 0.5 * esq} cor={esq > 0.5 ? A.hex : "#FFFFFF"} />
          <Holofote x={790} chao={CHAO} w={420} p={0.3 + 0.5 * dir} cor={dir > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Cozinha x={290} y={900} w={150} h={150} p={surge(t, c.i_informacao - 2.2)} />
          <Cozinha x={790} y={900} w={150} h={150} p={surge(t, c.i_informacao - 1.0)} alerta={dir} />
          <Figura t={t} x={220} y={CHAO} s={0.85} pose="apontando" tom="luz" />
          <Figura t={t} x={360} y={CHAO} s={0.8} pose={esq > 0.5 ? "bracosAbertos" : "pe"} tom={esq > 0.5 ? "verde" : "cinza"} flip />
          <Figura t={t} x={790} y={CHAO} s={0.8} pose={dir > 0.5 ? "cabisbaixo" : "pe"} tom="cinza" />
          <g opacity={surge(t, c.i_informacao - 0.6)}><Icone t={t} nome="lupa" x={880} y={820} r={40} /></g>
          <g opacity={esq}><Icone t={t} nome="check" x={290} y={690} r={40} tom="verde" brilho /></g>
          <g opacity={dir}><Icone t={t} nome="alerta" x={790} y={690} r={40} tom="vermelho" /></g>
        </Svg>
        <Pilula t={t} at={c.i_informacao - 2.2} ate={c.i_informacao - 0.15} x={290} y={600} texto="DITO POR VOCÊ" tom="branco" size={26} />
        <Pilula t={t} at={c.i_informacao - 1.0} ate={c.i_desconfianca - 0.15} x={790} y={600} texto="DESCOBERTO POR ELE" tom="cinza" size={26} />
        <Pilula t={t} at={c.i_informacao - 0.05} x={290} y={600} texto="INFORMAÇÃO" tom="verde" size={28} />
        <Pilula t={t} at={c.i_desconfianca - 0.05} x={790} y={600} texto="DESCONFIANÇA" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.i_informacao - 2.3} ate={c.i_certo - 1.0} linhas={[{ texto: "O MESMO", size: 72 }, { texto: "DEFEITO", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 5 · às vezes o certo é dizer não ---------------------------------------------------------------- */
export const Certo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.i_certo - 1.1, c.f_contra - 0.6, 0.5, 0.5);
  if (on <= 0.001) return null;
  const nao = prog(t, c.i_voce - 1.0, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.i_certo - 1.1} push={0.005} keys={[{ t: c.i_certo - 1.1, s: 1.05 }, { t: c.i_certo, s: 1.0, e: ease.out }, { t: c.i_voce + 0.3, s: 1.06, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={560} p={0.85} />
          <g opacity={1 - 0.6 * nao}><Icone t={t} nome="casa" x={780} y={880} r={80} tom={nao > 0.5 ? "cinza" : "branco"} /></g>
          <g opacity={nao}><Icone t={t} nome="x" x={860} y={800} r={30} tom="vermelho" /></g>
          <Figura t={t} x={420} y={CHAO} pose={nao > 0.3 ? "apontando" : "pe"} tom="luz" />
          <Figura t={t} x={620} y={CHAO} s={0.92} flip pose="pe" tom="cinza" />
        </Svg>
        <Bolha t={t} at={c.i_voce - 1.1} x={470} y={740} texto="NÃO É PRA VOCÊ" lado="dir" tom="branco" size={34} />
      </CamNoir>
      <TituloNoir t={t} at={c.i_certo - 1.0} ate={c.f_contra - 0.6} linhas={[{ texto: "ÀS VEZES, O CERTO", size: 64 }, { texto: "É DIZER NÃO", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 6 · quem fala o contra ---------------------------------------------------------------- */
export const Contra: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_contra - 0.7, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const acredita = prog(t, c.f_acreditado - 0.2, 0.7, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_contra - 0.7} push={0.005} keys={[{ t: c.f_contra - 0.7, s: 1.04 }, { t: c.f_contra, s: 1.0, e: ease.out }, { t: c.f_acreditado + 0.4, s: 1.08, y: -20, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 720, acredita)} p={0.85} cor={acredita > 0.3 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, acredita)} p={0.55 * acredita} cor={A.hex} />
          <Figura t={t} x={430} y={CHAO} pose="apontando" tom={acredita > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={650} y={CHAO} s={0.92} flip pose={acredita > 0.5 ? "bracosAbertos" : "pe"} tom={acredita > 0.5 ? "verde" : "cinza"} />
        </Svg>
        <Pilula t={t} at={c.f_contra - 0.05} x={330} y={800} texto="O CONTRA" tom="vermelho" size={28} />
        <Pilula t={t} at={c.f_acreditado - 0.05} x={750} y={800} texto="O A FAVOR" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.f_contra - 0.6} ate={c.f_acreditado - 0.3} linhas={[{ texto: "QUEM FALA", size: 72 }, { texto: "O CONTRA", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f_acreditado - 0.15} ate={c.cta_quer - 0.3} linhas={[{ texto: "GANHA O DIREITO DE", size: 60 }, { texto: "SER ACREDITADO", cor: "verde", size: 88 }]} top={300} />
    </div>
  );
};
