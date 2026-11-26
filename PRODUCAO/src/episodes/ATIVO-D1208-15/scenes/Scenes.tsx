import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1208-15 — "Cinco minutos sozinho" (grade 08/12/2026 · 15h · CORRETOR NA VIDA REAL · Pictograma).
 * Sem corte seco: o corretor fala sem parar ao lado do casal (visitantes, em cinza) → ele sai pela esquerda e o casal acende,
 * começa a "mudar os móveis" (pílulas) → do imóvel para a casa dele (casa + família acendem) → a oferta: "fiquem à vontade,
 * eu espero lá fora" (o corretor do lado de fora da porta) → o silêncio também apresenta → fecho CtaNoir. Tese por raciocínio.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const Sala: React.FC<{ p: number; cor?: string }> = ({ p, cor = "rgba(244,244,242,0.45)" }) => (
  <g opacity={p} fill="none" stroke={cor} strokeWidth={3}>
    <path d={`M 140 ${CHAO} L 140 560 L 940 560 L 940 ${CHAO}`} strokeDasharray={`${2400 * p} 2400`} />
    <rect x={180} y={CHAO - 330} width={120} height={330} strokeWidth={2.5} />
    <circle cx={285} cy={CHAO - 170} r={5} fill={cor} />
  </g>
);

/* ---------------------------------------------------------------- 1 · a visita falada e a saída ---------------------------------------------------------------- */
export const Visita: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_imaginar - 1.0, 0.5);
  if (on <= 0.001) return null;
  const sai = prog(t, c.s_sozinho - 0.4, 1.2, ease.inOut);
  const aceso = prog(t, c.s_sozinho, 0.6);
  const xC = mix(420, 120, sai);
  const casal: "cinza" | "luz" | "verde" = aceso > 0.5 ? "verde" : t > c.f2_falando - 0.2 ? "cinza" : "luz";
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -14 }, { t: c.h_sai, s: 1.0, e: ease.out }, { t: c.f2_visitante, s: 1.04, x: 16 }, { t: c.s_moveis + 0.4, s: 1.08, x: -40, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Sala p={prog(t, 0, 0.9)} />
          <Holofote x={mix(560, 700, aceso)} chao={CHAO} w={mix(720, 520, aceso)} p={0.8} cor={aceso > 0.5 ? A.hex : "#FFFFFF"} />
          {aceso > 0 && <Halo x={700} y={CHAO - 220} r={300} p={0.4 * aceso} cor={A.hex} />}
          <Figura t={t} x={xC} y={CHAO} s={0.8} pose={sai > 0.02 && sai < 0.98 ? "andando" : t > c.f2_falando - 0.2 ? "apontando" : "pe"} flip={sai > 0.02} tom={t > c.h_sai - 0.1 && t < c.f2_falando - 0.3 ? "fantasma" : "luz"} p={1 - 0.7 * sai} />
          <Figura t={t} x={640} y={CHAO} s={0.8} pose={aceso > 0.5 ? "bracosAbertos" : "pe"} tom={casal} fase={0.4} />
          <Figura t={t} x={780} y={CHAO} s={0.74} pose={aceso > 0.5 ? "apontando" : "pe"} tom={casal} fase={1.1} />
          <g opacity={surge(t, c.s_moveis - 0.2)}><Icone t={t} nome="casa" x={710} y={700} r={60} tom="verde" brilho /></g>
        </Svg>
        <Bolha t={t} at={c.f2_falando - 0.05} ate={c.s_sozinho - 0.4} x={420} y={760} texto="E AQUI É A SALA…" tom="branco" size={28} />
        <Bolha t={t} at={c.f2_escuta - 0.05} ate={c.s_sozinho - 0.4} x={380} y={660} texto="E ESSE PISO…" tom="branco" size={28} />
        <Pilula t={t} at={c.f2_visitante - 0.05} ate={c.s_sozinho - 0.3} x={710} y={880} texto="VISITANTE" tom="cinza" size={28} />
        <Pilula t={t} at={c.s_moveis - 0.05} x={560} y={840} texto="O SOFÁ AQUI" tom="verde" size={26} />
        <Pilula t={t} at={c.s_moveis + 0.5} x={850} y={900} texto="A MESA ALI" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.f2_falando - 0.4} linhas={[{ texto: "A MELHOR PARTE", size: 72 }, { texto: "DA VISITA?", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f2_falando - 0.25} ate={c.s_sozinho - 0.4} linhas={[{ texto: "COM VOCÊ FALANDO,", size: 64 }, { texto: "ELE SÓ VISITA", cor: "vermelho", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.s_sozinho - 0.25} ate={c.v_imaginar - 1.0} linhas={[{ texto: "SOZINHO,", size: 72 }, { texto: "ELE SE MUDA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a casa dele e a oferta ---------------------------------------------------------------- */
export const Casa: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_imaginar - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const lar = prog(t, c.v_casa - 0.2, 0.7, ease.out);
  const fora = prog(t, c.a_ofereca - 0.3, 0.9, ease.inOut);
  const fim = prog(t, c.f_silencio - 0.2, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_imaginar - 1.1} push={0.005} keys={[{ t: c.v_imaginar - 1.1, s: 1.06 }, { t: c.v_casa, s: 1.0, e: ease.out }, { t: c.a_fora, s: 1.04, x: 30 }, { t: c.f_silencio + 0.6, s: 1.08, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(540, 640, fora)} chao={CHAO} w={mix(620, 560, fora)} p={0.85} cor={lar > 0.5 ? A.hex : "#FFFFFF"} />
          <Halo x={mix(540, 640, fora)} y={700} r={mix(240, 360, fim)} p={0.5 * lar} cor={A.hex} />
          <g opacity={1 - 0.15 * fora}><Icone t={t} nome="casa" x={mix(540, 640, fora)} y={700} r={mix(90, 80, fora)} tom={lar > 0.5 ? "verde" : "branco"} brilho={lar > 0.5} /></g>
          <g opacity={lar}><Icone t={t} nome="familia" x={mix(540, 640, fora)} y={710} r={36} tom="verde" brilho /></g>
          {/* porta: o corretor espera do lado de fora */}
          <g opacity={fora} fill="none" stroke="rgba(244,244,242,0.5)" strokeWidth={3}>
            <rect x={330} y={CHAO - 330} width={120} height={330} />
            <line x1={450} y1={CHAO - 330} x2={500} y2={CHAO - 310} />
            <line x1={500} y1={CHAO - 310} x2={500} y2={CHAO - 10} />
          </g>
          <Figura t={t} x={mix(380, 220, fora)} y={CHAO} s={0.78} pose={fora > 0.05 && fora < 0.95 ? "andando" : "pe"} flip={fora > 0.05 && fora < 0.95} tom={fim > 0.5 ? "verde" : "luz"} p={0.3 + 0.7 * fora + (1 - fora) * 0} />
          <Figura t={t} x={mix(600, 680, fora)} y={CHAO} s={0.8} pose={fim > 0.5 ? "bracosAbertos" : "pe"} tom={lar > 0.5 ? "verde" : "luz"} fase={0.3} />
          <Figura t={t} x={mix(740, 820, fora)} y={CHAO} s={0.74} pose={fim > 0.5 ? "comemorando" : "pe"} tom={lar > 0.5 ? "verde" : "luz"} fase={1.2} />
        </Svg>
        <Pilula t={t} at={c.v_imaginar - 0.05} ate={c.a_ofereca - 0.4} x={540} y={900} texto="IMAGINA A CASA DELE" tom="verde" size={30} />
        <Bolha t={t} at={c.a_vontade - 0.1} ate={c.f_silencio - 0.3} x={260} y={760} texto="FIQUEM À VONTADE" tom="verde" size={28} />
        <Pilula t={t} at={c.a_fora - 0.05} ate={c.f_silencio - 0.3} x={240} y={900} texto="EU ESPERO LÁ FORA" tom="branco" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_imaginar - 0.9} ate={c.a_ofereca - 0.4} linhas={[{ texto: "DE UM IMÓVEL", size: 64 }, { texto: "À CASA DELE", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.a_ofereca - 0.25} ate={c.f_silencio - 0.4} linhas={[{ texto: "NO FIM DA VISITA", size: 64 }, { texto: "SAIA DA SALA", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f_silencio - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "O SILÊNCIO", size: 72 }, { texto: "TAMBÉM APRESENTA", cor: "verde", size: 84 }]} top={300} />
    </div>
  );
};
