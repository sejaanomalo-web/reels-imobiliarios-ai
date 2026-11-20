import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../fonts";
import { BRAND, C, F } from "../theme";
import { A, aa } from "../episodes/NOV26/kit";

/**
 * DEMO — 4 estilos visuais alternativos para a esteira ATIVO, todos sobre o MESMO momento do roteiro NOV26_26
 * ("O interessado mandou mensagem às dez da noite… ele já tinha conversado com outra pessoa").
 * Mesma identidade: grafite + verde do lote, Manrope/JetBrains Mono, logo oficial. Apenas quadros-chave (não publicável).
 */
const CHALK = "#E9ECEF";
const Logo: React.FC<{ y?: number }> = ({ y = 1700 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center" }}><Img src={staticFile(BRAND.logo)} style={{ height: 56, opacity: 0.9 }} /></div>
);
const Label: React.FC<{ n: string; name: string }> = ({ n, name }) => (
  <div style={{ position: "absolute", left: 60, top: 70, display: "flex", alignItems: "center", gap: 14, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, letterSpacing: "0.1em" }}>
    <span style={{ padding: "6px 14px", borderRadius: 10, background: aa(0.15), color: A.hex }}>ESTILO {n}</span>{name}
  </div>
);
const Caption: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.text }) => (
  <div style={{ position: "absolute", left: 80, right: 80, top: 1420, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 52, color, lineHeight: 1.1 }}>{children}</div>
);

/* ───────────── ESTILO 1 — PALITINHO (história com personagens) ───────────── */
const Stick: React.FC<{ x: number; y: number; s?: number; color?: string; pose?: "phone" | "sleep" | "wave"; flip?: boolean }> = ({ x, y, s = 1, color = CHALK, pose = "phone", flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={color} strokeWidth={9} strokeLinecap="round" fill="none">
    <circle cx={0} cy={-170} r={38} />
    <line x1={0} y1={-132} x2={0} y2={-30} />
    <line x1={0} y1={-30} x2={-38} y2={60} /><line x1={0} y1={-30} x2={38} y2={60} />
    {pose === "phone" ? (<><line x1={0} y1={-105} x2={-45} y2={-60} /><line x1={0} y1={-105} x2={42} y2={-140} /><rect x={36} y={-196} width={34} height={58} rx={7} fill={A.hex} stroke={A.hex} strokeWidth={4} /></>) : null}
    {pose === "wave" ? (<><line x1={0} y1={-105} x2={-45} y2={-60} /><line x1={0} y1={-105} x2={52} y2={-165} /></>) : null}
  </g>
);
export const DemoPalitinho: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Label n="1" name="PALITINHO · HISTÓRIA" />
    <div style={{ position: "absolute", left: 70, right: 70, top: 170, textAlign: "center", fontWeight: 800, fontSize: 64, color: C.text }}>22H: <span style={{ color: A.hex }}>LEAD CHEGOU</span></div>
    <svg width={1080} height={1200} style={{ position: "absolute", left: 0, top: 290 }}>
      {/* divisória noite | dia */}
      <line x1={540} y1={40} x2={540} y2={760} stroke={C.surface3} strokeWidth={4} strokeDasharray="14 14" />
      <text x={270} y={90} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={32}>🌙 22:00</text>
      <text x={810} y={90} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={32}>☀️ 09:30</text>
      {/* noite: cliente manda msg; corretor dormindo */}
      <Stick x={170} y={560} pose="phone" />
      <g transform="translate(330 470)" stroke={C.dim} strokeWidth={9} strokeLinecap="round" fill="none">
        <rect x={-10} y={40} width={190} height={40} rx={12} stroke={C.surface3} />
        <circle cx={150} cy={10} r={32} /><line x1={118} y1={20} x2={0} y2={30} />
      </g>
      <text x={455} y={420} fill={C.muted} fontFamily="Manrope" fontWeight={800} fontSize={44}>z z z</text>
      <g transform="translate(60 230)"><rect x={0} y={0} width={360} height={110} rx={28} fill={C.surface} stroke={CHALK} strokeWidth={4} /><text x={180} y={68} textAnchor="middle" fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={32}>Ainda tá disponível?</text></g>
      {/* dia: corretor responde, cliente já com outro */}
      <Stick x={680} y={560} pose="phone" color={A.hex} />
      <Stick x={900} y={560} pose="wave" />
      <Stick x={1010} y={560} s={0.9} pose="wave" color={C.muted} flip />
      <g transform="translate(600 230)"><rect x={0} y={0} width={420} height={110} rx={28} fill={aa(0.12)} stroke={A.hex} strokeWidth={4} /><text x={210} y={68} textAnchor="middle" fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={32}>Bom dia! Está sim 😊</text></g>
      <g transform="translate(700 680)"><rect x={0} y={0} width={350} height={70} rx={20} fill="rgba(255,107,94,0.15)" stroke={C.warn} strokeWidth={3} /><text x={175} y={46} textAnchor="middle" fill={C.warn} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26}>JÁ FECHOU COM OUTRO</text></g>
    </svg>
    <Caption>ele já tinha conversado <span style={{ color: A.hex }}>com outra pessoa.</span></Caption>
    <Logo />
  </AbsoluteFill>
);

/* ───────────── ESTILO 2 — DESENHO À MÃO (lousa / sketch) ───────────── */
const Rough: React.FC = () => (
  <defs>
    <filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" /><feDisplacementMap in="SourceGraphic" scale="6" /></filter>
    <filter id="chalk"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.4 1.1" /><feComposite in="SourceGraphic" operator="in" /></filter>
  </defs>
);
export const DemoDesenho: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0E1012", fontFamily: F.sans }}>
    <Label n="2" name="DESENHO À MÃO · LOUSA" />
    <svg width={1080} height={1500} style={{ position: "absolute", left: 0, top: 150 }}>
      <Rough />
      <g filter="url(#rough)" stroke={CHALK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* casa desenhada */}
        <polyline points="150,620 330,450 510,620" />
        <rect x={185} y={615} width={290} height={250} />
        <rect x={300} y={740} width={70} height={125} />
        <rect x={215} y={660} width={60} height={55} /><rect x={395} y={660} width={60} height={55} />
        <line x1={420} y1={520} x2={420} y2={470} /><line x1={420} y1={470} x2={455} y2={470} /><line x1={455} y1={470} x2={455} y2={545} />
        {/* celular desenhado */}
        <rect x={640} y={430} width={250} height={440} rx={34} />
        <line x1={730} y1={460} x2={800} y2={460} />
        {/* relógio */}
        <circle cx={830} cy={290} r={80} /><line x1={830} y1={290} x2={830} y2={235} /><line x1={830} y1={290} x2={790} y2={300} />
        {/* seta */}
        <path d="M 520 400 C 580 330, 640 340, 700 380" /><polyline points="680,355 702,382 670,392" />
      </g>
      <g filter="url(#rough)">
        <rect x={655} y={510} width={220} height={120} rx={18} fill="none" stroke={A.hex} strokeWidth={6} />
        <text x={765} y={560} textAnchor="middle" fill={A.hex} fontFamily="Manrope" fontWeight={800} fontSize={32}>tá</text><text x={765} y={600} textAnchor="middle" fill={A.hex} fontFamily="Manrope" fontWeight={800} fontSize={32}>disponível?</text>
        <text x={830} y={410} textAnchor="middle" fill={CHALK} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>22h</text>
        <text x={120} y={300} fill={CHALK} fontFamily="Manrope" fontWeight={800} fontSize={58} transform="rotate(-4 120 300)">o lead chegou…</text>
        <path d="M 120 320 Q 330 300 520 318" stroke={A.hex} strokeWidth={8} fill="none" strokeLinecap="round" />
        <text x={150} y={1000} fill={CHALK} fontFamily="Manrope" fontWeight={800} fontSize={50} transform="rotate(-2 150 1000)">e a resposta? só amanhã.</text>
        <ellipse cx={765} cy={1080} rx={240} ry={70} fill="none" stroke={C.warn} strokeWidth={7} />
        <text x={765} y={1095} textAnchor="middle" fill={C.warn} fontFamily="Manrope" fontWeight={800} fontSize={40}>outro corretor</text>
      </g>
    </svg>
    <Caption color={CHALK}>ele já tinha conversado <span style={{ color: A.hex }}>com outra pessoa.</span></Caption>
    <Logo />
  </AbsoluteFill>
);

/* ───────────── ESTILO 3 — PLANTA TÉCNICA (blueprint verde) ───────────── */
export const DemoPlanta: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#06100A", fontFamily: F.sans }}>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: 28 }).map((_, i) => <line key={"v" + i} x1={i * 40} y1={0} x2={i * 40} y2={1920} stroke={aa(i % 5 === 0 ? 0.14 : 0.06)} strokeWidth={i % 5 === 0 ? 2 : 1} />)}
      {Array.from({ length: 49 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * 40} x2={1080} y2={i * 40} stroke={aa(i % 5 === 0 ? 0.14 : 0.06)} strokeWidth={i % 5 === 0 ? 2 : 1} />)}
      {/* planta do fluxo do lead como planta de apartamento */}
      <g stroke={A.hex} strokeWidth={5} fill="none">
        <rect x={140} y={460} width={800} height={720} />
        <line x1={540} y1={460} x2={540} y2={820} /><line x1={140} y1={820} x2={940} y2={820} />
        <path d="M 540 700 A 80 80 0 0 1 620 780" strokeDasharray="8 8" />
      </g>
      <g fill={A.hex} fontFamily="JetBrains Mono" fontWeight={700} fontSize={28}>
        <text x={340} y={630} textAnchor="middle">AMB. 01</text><text x={340} y={670} textAnchor="middle" fill={C.text} fontSize={40}>ENTRADA</text><text x={340} y={710} textAnchor="middle" fill={C.muted} fontSize={24}>22:00 · lead</text>
        <text x={740} y={630} textAnchor="middle">AMB. 02</text><text x={740} y={670} textAnchor="middle" fill={C.text} fontSize={40}>REGISTRO</text><text x={740} y={710} textAnchor="middle" fill={C.warn} fontSize={24}>vazio até 09:30</text>
        <text x={540} y={960} textAnchor="middle">AMB. 03</text><text x={540} y={1010} textAnchor="middle" fill={C.text} fontSize={40}>RESPONSÁVEL → RESPOSTA</text><text x={540} y={1060} textAnchor="middle" fill={C.muted} fontSize={24}>a planta tem um cômodo sem porta</text>
      </g>
      {/* cotas */}
      <g stroke={C.muted} strokeWidth={2}><line x1={140} y1={420} x2={940} y2={420} /><line x1={140} y1={405} x2={140} y2={435} /><line x1={940} y1={405} x2={940} y2={435} /></g>
      <text x={540} y={405} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={24}>11h 30min SEM RESPOSTA</text>
      <circle cx={740} cy={600} r={140} fill="none" stroke={C.warn} strokeWidth={4} strokeDasharray="10 8" />
      <line x1={850} y1={690} x2={960} y2={1260} stroke={C.warn} strokeWidth={3} />
      <g transform="translate(560 1260)"><rect width={430} height={90} rx={12} fill="rgba(255,107,94,0.12)" stroke={C.warn} strokeWidth={3} /><text x={215} y={58} textAnchor="middle" fill={C.warn} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26}>FALHA DE PROJETO: SEM DONO</text></g>
      {/* carimbo técnico */}
      <g transform="translate(110 1260)"><rect width={400} height={150} fill="none" stroke={A.hex} strokeWidth={3} /><line x1={0} y1={50} x2={400} y2={50} stroke={A.hex} strokeWidth={2} /><text x={20} y={36} fill={A.hex} fontFamily="JetBrains Mono" fontWeight={700} fontSize={24}>PROJETO: ATENDIMENTO</text><text x={20} y={92} fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={22}>FOLHA 26/30 · ESC. 1:1</text><text x={20} y={128} fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={22}>ILUSTRATIVO</text></g>
    </svg>
    <Label n="3" name="PLANTA TÉCNICA · BLUEPRINT" />
    <div style={{ position: "absolute", left: 70, right: 70, top: 170, textAlign: "center", fontWeight: 800, fontSize: 60, color: C.text }}>LEAD SEM DONO <span style={{ color: A.hex }}>É FALHA DE PROJETO</span></div>
    <Caption>ele já tinha conversado <span style={{ color: A.hex }}>com outra pessoa.</span></Caption>
    <Logo />
  </AbsoluteFill>
);

/* ───────────── ESTILO 4 — TIPOGRAFIA CINÉTICA (só palavras) ───────────── */
export const DemoTipografia: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans, overflow: "hidden" }}>
    <Label n="4" name="TIPOGRAFIA CINÉTICA" />
    <div style={{ position: "absolute", left: -30, top: 230, fontWeight: 800, fontSize: 420, lineHeight: 0.85, letterSpacing: "-0.07em", color: "transparent", WebkitTextStroke: `4px ${aa(0.5)}` }}>22H</div>
    <div style={{ position: "absolute", left: 80, top: 360, fontWeight: 800, fontSize: 150, lineHeight: 0.9, letterSpacing: "-0.05em", color: C.text }}>O LEAD<br />CHEGOU.</div>
    <div style={{ position: "absolute", left: 80, top: 670, fontWeight: 800, fontSize: 92, lineHeight: 1, letterSpacing: "-0.04em", color: C.muted }}>a resposta</div>
    <div style={{ position: "absolute", left: 80, top: 800, fontWeight: 800, fontSize: 150, lineHeight: 0.9, letterSpacing: "-0.05em", color: A.hex, transform: "rotate(-3deg)" }}>NÃO.</div>
    <div style={{ position: "absolute", left: 80, top: 990, display: "flex", alignItems: "baseline", gap: 24 }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 64, color: C.text }}>09:30</span>
      <span style={{ fontWeight: 800, fontSize: 56, color: C.muted }}>tarde demais</span>
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 1120, height: 10, background: `linear-gradient(90deg, ${A.hex}, transparent)` }} />
    <div style={{ position: "absolute", right: 80, top: 1170, fontWeight: 800, fontSize: 70, color: C.warn, textAlign: "right", lineHeight: 1 }}>OUTRO<br />CORRETOR.</div>
    <Caption>ele já tinha conversado <span style={{ color: A.hex }}>com outra pessoa.</span></Caption>
    <Logo />
  </AbsoluteFill>
);
