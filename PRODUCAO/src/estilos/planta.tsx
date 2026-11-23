import React from "react";
import { Img, staticFile } from "remotion";
import { ATMOSFERA, BRAND, C, F, luzAtm, type AtmosferaNome } from "../theme";
import { A, aa } from "../episodes/NOV26/kit";
import { clamp01, ease, mix, prog, sp } from "../lib/anim";
import type { CaptionChunk } from "../episodes/types";

/**
 * TERCEIRO MODELO / ESTILO 3 DA ESTEIRA — PLANTA TÉCNICA (v2, 23/11/2026).
 * Skill: .claude/skills/terceiro-modelo-planta-tecnica/SKILL.md · registro: MARCA/sistema-visual/modelos.json (id "planta-tecnica").
 *
 * O conteúdo vira PROJETO: cômodo = etapa/frente, cota = medida/tempo, chamada = observação (vermelha = falha),
 * porta = passagem, rota = caminho, elevação = crescimento (andares), carimbo = assinatura técnica (sempre ILUSTRATIVO).
 *
 * v2 (Nível 1): prancha MARINHO (atmosfera "dados") com grade neutra e UMA luz sobre a prancha; linha de projeto BRANCA;
 * verde ATIVO só no que "acende" (solução, você, o ponto da frase); vermelho só para falha. Traço único TRACO (3 px).
 * Textos ≥ 30 px em frase; micro-rótulo 24 px só em maiúsculas espaçadas. Transição-assinatura: MERGULHO no cômodo.
 *
 * Compatibilidade: os episódios entregues antes da v2 (ATIVO-GTA6-02, ATIVO-GTA6-08, ATIVO-L60-04) são LEGADO do modelo
 * e mudariam de aparência se re-renderizados — não são refeitos (CLAUDE.md).
 */
const M = "JetBrains Mono";
export const TRACO = 3;
/** Cor da linha de projeto (paredes, cotas neutras). */
export const LINHA = C.text;
export const BG_PLANTA = ATMOSFERA.dados.borda;
type Tom = "linha" | "accent" | "warn" | "muted";
const corDo = (tom: Tom) => (tom === "accent" ? A.hex : tom === "warn" ? C.warn : tom === "muted" ? C.dim : LINHA);
const fade = (p: number) => clamp01(p * 1.5);
/** Sombra de leitura (Nível 1) para texto HTML sobre a prancha. */
export const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/* ---------------------------------------------------------------- fundo ---------------------------------------------------------------- */
/**
 * Prancha de projeto: atmosfera do Nível 1 (padrão "dados" = marinho), grade neutra (menor 40 px, maior 200 px) que desliza
 * devagar, uma luz localizada sobre a área de trabalho e vinheta. `atm` troca o clima da folha (tensao na falha, solucao no payoff).
 */
export const FundoPlanta: React.FC<{ t?: number; atm?: AtmosferaNome; luzY?: number; luz?: number }> = ({ t = 0, atm = "dados", luzY = 820, luz = 1 }) => {
  const a = ATMOSFERA[atm];
  const off = (t * 6) % 40;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <radialGradient id="pl-atm" cx="50%" cy={`${(luzY / 1920) * 100}%`} r="75%">
          <stop offset="0%" stopColor={a.centro} />
          <stop offset="100%" stopColor={a.borda} />
        </radialGradient>
        <radialGradient id="pl-luz" cx="50%" cy={`${(luzY / 1920) * 100}%`} r="38%">
          <stop offset="0%" stopColor={luzAtm(atm, 0.1 * luz)} />
          <stop offset="100%" stopColor={luzAtm(atm, 0)} />
        </radialGradient>
        <radialGradient id="pl-vin" cx="50%" cy="45%" r="70%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.72)" />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#pl-atm)" />
      {Array.from({ length: 28 }).map((_, i) => <line key={"v" + i} x1={i * 40} y1={0} x2={i * 40} y2={1920} stroke={i % 5 === 0 ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.03)"} strokeWidth={1.5} />)}
      {Array.from({ length: 50 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * 40 - off} x2={1080} y2={i * 40 - off} stroke={i % 5 === 0 ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.03)"} strokeWidth={1.5} />)}
      <rect width={1080} height={1920} fill="url(#pl-luz)" />
      <rect width={1080} height={1920} fill="url(#pl-vin)" />
    </svg>
  );
};

/** Área de desenho (SVG 1080 de largura). Zona do palco: y 360–1290 (a faixa 1320–1470 é da legenda). */
export const Prancha: React.FC<{ top?: number; h?: number; children: React.ReactNode }> = ({ top = 380, h = 900, children }) => (
  <svg width={1080} height={h} viewBox={`0 0 1080 ${h}`} style={{ position: "absolute", left: 0, top, overflow: "visible" }}>{children}</svg>
);

/* ---------------------------------------------------------------- traço ---------------------------------------------------------------- */
/** Contorno externo da planta: linha DUPLA (parede), desenhada com p (0..1). */
export const Contorno: React.FC<{ x: number; y: number; w: number; h: number; p: number; tom?: Tom }> = ({ x, y, w, h, p, tom = "linha" }) => {
  const k = clamp01(p);
  const col = corDo(tom);
  return (
    <g fill="none" stroke={col} strokeWidth={TRACO} strokeLinecap="round" opacity={k > 0.001 ? 1 : 0}>
      <rect x={x} y={y} width={w} height={h} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
      <rect x={x + 10} y={y + 10} width={w - 20} height={h - 20} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01((k - 0.15) / 0.85)} opacity={0.55} />
    </g>
  );
};

/**
 * Cômodo = etapa/frente. As paredes se desenham com p; o texto entra depois (revelação progressiva).
 * `acende` (0..1) leva o cômodo da linha branca para o verde ATIVO (é a única forma de um cômodo ficar verde).
 * `tom="warn"` = falha; `tom="muted"` = secundário/apagado.
 */
export const Comodo: React.FC<{ x: number; y: number; w: number; h: number; p: number; amb?: string; titulo: string; sub?: string; tone?: Tom; acende?: number; titleSize?: number }> = ({ x, y, w, h, p, amb, titulo, sub, tone = "linha", acende = 0, titleSize = 40 }) => {
  const k = clamp01(p);
  const tx = clamp01((p - 0.55) * 2.5);
  const g = tone === "linha" ? clamp01(acende) : 0;
  const base = corDo(tone);
  const parede = g > 0 ? `rgba(${mix(244, A.rgb[0], g)},${mix(245, A.rgb[1], g)},${mix(247, A.rgb[2], g)},1)` : base;
  return (
    <g opacity={k > 0.005 ? 1 : 0}>
      <rect x={x} y={y} width={w} height={h} fill={tone === "warn" ? "rgba(255,107,94,0.07)" : aa(0.1 * g)} stroke={parede} strokeWidth={TRACO} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
      {g > 0.01 ? <rect x={x} y={y} width={w} height={h} fill="none" stroke={aa(0.35 * g)} strokeWidth={14} style={{ filter: "blur(10px)" }} /> : null}
      <g opacity={tx} textAnchor="middle">
        {amb ? <text x={x + w / 2} y={y + h / 2 - titleSize * 0.95} fill={g > 0.5 ? A.hex : C.muted} fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em">{amb}</text> : null}
        <text x={x + w / 2} y={y + h / 2 + titleSize * 0.15} fill={tone === "muted" ? C.muted : C.text} fontFamily={M} fontWeight={700} fontSize={titleSize}>{titulo}</text>
        {sub ? <text x={x + w / 2} y={y + h / 2 + titleSize * 1.2} fill={tone === "warn" ? C.warn : C.muted} fontFamily="Manrope" fontWeight={700} fontSize={30}>{sub}</text> : null}
      </g>
    </g>
  );
};

/** Cota (linha de medida) horizontal com rótulo em maiúsculas espaçadas. Verde só quando a medida É o ponto. */
export const Cota: React.FC<{ x1: number; x2: number; y: number; texto: string; p?: number; cor?: string }> = ({ x1, x2, y, texto, p = 1, cor = C.muted }) => (
  <g opacity={fade(p)} stroke={cor} strokeWidth={TRACO * 0.67} strokeLinecap="round">
    <line x1={x1} y1={y} x2={x1 + (x2 - x1) * clamp01(p)} y2={y} /><line x1={x1} y1={y - 14} x2={x1} y2={y + 14} /><line x1={x2} y1={y - 14} x2={x2} y2={y + 14} opacity={p > 0.95 ? 1 : 0} />
    <text x={(x1 + x2) / 2} y={y - 18} textAnchor="middle" fill={cor} stroke="none" fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em">{texto}</text>
  </g>
);

/** Cota vertical (altura/andares). */
export const CotaV: React.FC<{ x: number; y1: number; y2: number; texto: string; p?: number; cor?: string }> = ({ x, y1, y2, texto, p = 1, cor = C.muted }) => (
  <g opacity={fade(p)} stroke={cor} strokeWidth={TRACO * 0.67} strokeLinecap="round">
    <line x1={x} y1={y1} x2={x} y2={y1 + (y2 - y1) * clamp01(p)} /><line x1={x - 14} y1={y1} x2={x + 14} y2={y1} /><line x1={x - 14} y1={y2} x2={x + 14} y2={y2} opacity={p > 0.95 ? 1 : 0} />
    <text x={x + 26} y={(y1 + y2) / 2} fill={cor} stroke="none" fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em">{texto}</text>
  </g>
);

/** Chamada (callout): ponto → caixa. tone "warn" = falha (vermelho), "accent" = acerto/solução, "linha" = observação neutra. */
export const Chamada: React.FC<{ x: number; y: number; bx: number; by: number; bw: number; texto: string; p?: number; tone?: "warn" | "accent" | "linha" }> = ({ x, y, bx, by, bw, texto, p = 1, tone = "warn" }) => {
  const col = tone === "warn" ? C.warn : tone === "accent" ? A.hex : LINHA;
  const fill = tone === "warn" ? "rgba(255,107,94,0.12)" : tone === "accent" ? aa(0.12) : "rgba(7,8,10,0.75)";
  const k = clamp01(p);
  const box = clamp01((k - 0.75) * 4);
  return (
    <g opacity={fade(k)}>
      <circle cx={x} cy={y} r={9} fill={col} />
      <line x1={x} y1={y} x2={x + (bx + bw / 2 - x) * k} y2={y + (by - y) * k} stroke={col} strokeWidth={TRACO} strokeDasharray="10 8" strokeLinecap="round" />
      <g opacity={box}>
        <rect x={bx} y={by} width={bw} height={84} rx={12} fill={fill} stroke={col} strokeWidth={TRACO} />
        <text x={bx + bw / 2} y={by + 53} textAnchor="middle" fill={tone === "linha" ? C.text : col} fontFamily={M} fontWeight={700} fontSize={30}>{texto}</text>
      </g>
    </g>
  );
};

/** Porta (arco tracejado) — passagem entre etapas. Fechada = vermelho (bloqueio). */
export const Porta: React.FC<{ x: number; y: number; r?: number; p?: number; aberta?: boolean }> = ({ x, y, r = 70, p = 1, aberta = true }) => (
  <g opacity={fade(p)} stroke={aberta ? LINHA : C.warn} strokeWidth={TRACO} fill="none" strokeLinecap="round">
    <line x1={x} y1={y} x2={x + r} y2={y} />
    {aberta ? <path d={`M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y - r}`} strokeDasharray="8 8" /> : <line x1={x} y1={y - 20} x2={x + r} y2={y + 20} />}
  </g>
);

/** Rota: caminho que se desenha (p 0..1). Verde = caminho certo/você; vermelho (tom "warn") = caminho errado.
 *  Tracejado é revelado por máscara (o traço "anda" sem perder o tracejado). `id` precisa ser único na cena. */
export const Rota: React.FC<{ id: string; d: string; p: number; tom?: Tom; tracejado?: boolean }> = ({ id, d, p, tom = "accent", tracejado = true }) => {
  const k = clamp01(p);
  if (k <= 0.001) return null;
  const col = corDo(tom);
  if (!tracejado) return <path d={d} fill="none" stroke={col} strokeWidth={TRACO + 1} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />;
  return (
    <g>
      <defs>
        <mask id={`rota-${id}`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
          <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={TRACO + 14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
        </mask>
      </defs>
      <path d={d} fill="none" stroke={col} strokeWidth={TRACO + 1} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="16 12" mask={`url(#rota-${id})`} />
    </g>
  );
};

/**
 * Elevação (corte de prédio): o crescimento vira ANDARES que sobem um a um — substitui gráfico de barras genérico.
 * `p` 0..1 controla quantos andares já subiram; `destaque` acende (verde) o andar indicado quando `acende` > 0.
 */
export const Elevacao: React.FC<{ x: number; chao: number; w: number; andares: number; alt?: number; p: number; rotulo?: string; destaque?: number; acende?: number }> = ({ x, chao, w, andares, alt = 70, p, rotulo, destaque = -1, acende = 0 }) => {
  const subiu = p * andares;
  return (
    <g>
      <line x1={x - 60} y1={chao} x2={x + w + 60} y2={chao} stroke={LINHA} strokeWidth={TRACO} strokeLinecap="round" opacity={fade(p * 4)} />
      {Array.from({ length: andares }).map((_, i) => {
        const q = clamp01(subiu - i);
        if (q <= 0) return null;
        const y = chao - (i + 1) * alt;
        const ac = i === destaque ? clamp01(acende) : 0;
        return (
          <g key={i} opacity={fade(q)}>
            <rect x={x} y={y + alt * (1 - q)} width={w} height={alt * q} fill={ac > 0 ? aa(0.14 * ac) : "rgba(255,255,255,0.025)"} stroke={ac > 0.5 ? A.hex : LINHA} strokeWidth={TRACO} />
            {[0.18, 0.42, 0.66].map((f) => <rect key={f} x={x + w * f} y={y + alt * 0.3} width={w * 0.14} height={alt * 0.4 * q} fill="none" stroke={ac > 0.5 ? A.hex : C.muted} strokeWidth={TRACO * 0.67} />)}
          </g>
        );
      })}
      {rotulo ? <CotaV x={x + w + 40} y1={chao} y2={chao - andares * alt} texto={rotulo} p={p} /> : null}
    </g>
  );
};

/** Carimbo técnico (title block da prancha): assinatura do estilo e selo de integridade (sempre ILUSTRATIVO). */
export const Carimbo: React.FC<{ x: number; y: number; projeto: string; folha: string; p?: number; w?: number }> = ({ x, y, projeto, folha, p = 1, w = 460 }) => (
  <g transform={`translate(${x} ${y})`} opacity={fade(p)} fontFamily={M} fontWeight={700}>
    <rect width={w} height={156} fill="rgba(7,8,10,0.82)" stroke={LINHA} strokeWidth={TRACO} /><line x1={0} y1={54} x2={w} y2={54} stroke={LINHA} strokeWidth={TRACO * 0.67} />
    <text x={20} y={38} fill={C.text} fontSize={26}>PROJETO: {projeto}</text>
    <text x={20} y={96} fill={C.muted} fontSize={24} letterSpacing="0.12em">{folha}</text>
    <text x={20} y={134} fill={C.muted} fontSize={24} letterSpacing="0.12em">ILUSTRATIVO · ATIVO</text>
  </g>
);

/** Selo de integridade (assinatura 7) no padrão da prancha: pílula Manrope 800 maiúscula espaçada. */
export const SeloPlanta: React.FC<{ texto: string; p?: number; top?: number }> = ({ texto, p = 1, top = 1236 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", opacity: fade(p) }}>
    <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 24, letterSpacing: "0.16em", color: C.muted, border: `2px solid ${C.dim}`, borderRadius: 999, padding: "8px 22px", background: "rgba(7,8,10,0.8)" }}>{texto}</div>
  </div>
);

/** Título da folha (topo, y 285): Manrope 800 maiúsculo; a palavra-chave vai em <span style={{color: A.hex}}>. */
export const TituloFolha: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 60 }) => (
  <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: fade(p), textShadow: SOMBRA }}>{children}</div>
);

/* ---------------------------------------------------------------- transição-assinatura ---------------------------------------------------------------- */
/**
 * MERGULHO: a câmera entra no cômodo-alvo até ele ocupar a prancha; a folha seguinte nasce do contorno desse cômodo
 * (transição motivada — "o cômodo vira a próxima planta"). Use `mergulho(p, alvo)` como transform do grupo da folha que sai
 * e comece a folha seguinte desenhando o Contorno a partir do mesmo retângulo.
 */
export const mergulho = (p: number, alvo: { x: number; y: number; w: number; h: number }, tela = { x: 120, y: 120, w: 840, h: 640 }) => {
  const k = ease.inOut(clamp01(p));
  const sFim = Math.min(tela.w / alvo.w, tela.h / alvo.h);
  const s = Math.exp(mix(0, Math.log(sFim), k));
  const cx = alvo.x + alvo.w / 2, cy = alvo.y + alvo.h / 2;
  const px = mix(cx, tela.x + tela.w / 2, k), py = mix(cy, tela.y + tela.h / 2, k);
  // `outros`: opacidade de tudo que NÃO é o cômodo-alvo (some na primeira metade do mergulho, para não virar borrão gigante)
  return { transform: `translate(${px - cx * s} ${py - cy * s}) scale(${s})`, opacity: 1 - clamp01((k - 0.72) / 0.28), outros: 1 - clamp01(k / 0.5) };
};

/* ---------------------------------------------------------------- fecho (CTA SISTEMA) ---------------------------------------------------------------- */
const wAt = (caps: CaptionChunk[], seg: string, re: RegExp, fb: number) => {
  for (const k of caps) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
  return fb;
};

/**
 * FECHO do Terceiro modelo (ritual SISTEMA, assinatura 6), no desenho da prancha:
 * pergunta → a folha "PROJETO: SEU SISTEMA" traça 3 ambientes (IMÓVEIS · LEADS · ATENDIMENTOS), cada um ACENDE em verde na
 * sua palavra; "Comente" → o carimbo vira o campo que digita S-I-S-T-E-M-A e o botão de envio acende; "Direct" → uma rota
 * verde leva o envio para fora; por fim o LOGO OFICIAL é assinado no carimbo.
 */
export const CtaPlanta: React.FC<{ t: number; tl: { captions: CaptionChunk[]; cues: Record<string, number>; duration: number }; segPergunta: string; segComente: string; logo?: string }> = ({ t, tl, segPergunta, segComente, logo = BRAND.logo }) => {
  const caps = tl.captions;
  const c = tl.cues;
  const t0 = caps.find((k) => k.seg === segPergunta)?.start ?? c.cta_quer;
  // CTA curta (Skill Mestre, 21/11/2026) quando pergunta e "comente" são o mesmo segmento: campo em "comente SISTEMA",
  // ambientes acendem em "conheça · nosso · personalizado", rota e logo no fim da frase; sem a linha de Direct.
  const curta = segPergunta === segComente;
  const fimSeg = Math.max(...caps.filter((k) => k.seg === segComente).map((k) => k.end), t0 + 3.5);
  const tCom = curta ? wAt(caps, segComente, /^comente/i, t0 + 1.1) : caps.find((k) => k.seg === segComente)?.start ?? c.cta_comment;
  const tSis = wAt(caps, segComente, curta ? /^sistema/i : /sistema/i, tCom + 0.5);
  const tDir = curta ? fimSeg : wAt(caps, segComente, /direct/i, tCom + 2.3);
  const tIm = curta ? wAt(caps, segPergunta, /^conhe/i, tCom + 1.0) : wAt(caps, segPergunta, /im[óo]veis/i, t0 + 2.4);
  const tLe = curta ? wAt(caps, segPergunta, /^nosso/i, tCom + 1.4) : wAt(caps, segPergunta, /leads/i, t0 + 3);
  const tAt = curta ? wAt(caps, segPergunta, /^personalizado/i, tCom + 2.0) : wAt(caps, segPergunta, /atendimentos/i, t0 + 3.6);
  const tSisP = curta ? tIm : wAt(caps, segPergunta, /sistema/i, t0 + 0.8);
  const contorno = prog(t, t0 - 0.2, 0.9, ease.out);
  const amb = [
    { k: "IMÓVEIS", amb: "AMB. 01", at: tIm, x: 140, y: 150, w: 400, h: 260 },
    { k: "LEADS", amb: "AMB. 02", at: tLe, x: 540, y: 150, w: 400, h: 260 },
    { k: "ATENDIMENTOS", amb: "AMB. 03", at: tAt, x: 140, y: 410, w: 800, h: 190 },
  ];
  const sobe = prog(t, tCom - 0.25, 0.6, ease.inOut);
  const campo = prog(t, tCom - 0.1, 0.45, ease.out);
  const typed = Math.round(prog(t, tSis - 0.05, 0.5, ease.linear) * 7);
  const enviado = typed >= 7;
  const rota = prog(t, tDir - 0.15, 0.8, ease.inOut);
  const tLogo = tDir + (curta ? 0.3 : 0.75);
  const assina = prog(t, tLogo, 0.9, ease.out);
  const brilho = 0.5 + 0.5 * Math.sin(t * 4);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${mix(0, -150, sobe)}px) scale(${mix(1, 0.86, sobe)})`, transformOrigin: "540px 560px" }}>
        <Prancha top={380} h={700}>
          <Contorno x={120} y={130} w={840} h={490} p={contorno} />
          {/* esboço do projeto: divisões tracejadas e ambientes numerados já na pergunta; cada um se constrói na sua palavra */}
          <g stroke={C.dim} strokeWidth={TRACO * 0.67} strokeDasharray="10 10" opacity={fade(prog(t, t0 + 0.2, 0.6))}>
            <line x1={540} y1={150} x2={540} y2={mix(150, 410, prog(t, t0 + 0.2, 0.6, ease.out))} />
            <line x1={140} y1={410} x2={mix(140, 940, prog(t, t0 + 0.45, 0.7, ease.out))} y2={410} />
          </g>
          <g fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em" fill={C.dim} textAnchor="middle" opacity={fade(prog(t, t0 + 0.7, 0.5))}>
            {amb.map((q) => <text key={q.amb} x={q.x + q.w / 2} y={q.y + q.h / 2 + 8} opacity={t >= q.at - 0.45 ? 0 : 1}>{q.amb}</text>)}
          </g>
          <Cota x1={120} x2={960} y={90} texto="PROJETO: SEU SISTEMA" p={prog(t, tSisP - 0.2, 0.6)} cor={A.hex} />
          {amb.map((q) => (
            <Comodo key={q.k} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, q.at - 0.45, 0.6, ease.out)} amb={q.amb} titulo={q.k} titleSize={q.k.length > 8 ? 40 : 44} acende={prog(t, q.at - 0.05, 0.35)} />
          ))}
          <Porta x={540} y={410} r={56} p={prog(t, tLe, 0.5)} />
        </Prancha>
      </div>
      {campo > 0.001 ? (
        <div style={{ position: "absolute", left: 140, right: 140, top: 900, opacity: campo, fontFamily: F.sans }}>
          <div style={{ border: `${TRACO}px solid ${LINHA}`, background: "rgba(7,8,10,0.9)", boxShadow: `0 0 ${24 + 24 * brilho}px ${aa(0.1 + 0.14 * brilho)}` }}>
            <div style={{ borderBottom: `2px solid ${C.dim}`, padding: "10px 22px", fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.14em", color: C.muted }}>COMENTE · FOLHA FINAL</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 18px 16px 30px" }}>
              <div style={{ flex: 1, fontWeight: 800, fontSize: 66, letterSpacing: "0.06em", color: C.text, textShadow: SOMBRA }}>
                {"SISTEMA".slice(0, typed)}
                <span style={{ color: A.hex, opacity: !enviado && Math.floor(t * 3) % 2 === 0 ? 1 : 0 }}>|</span>
              </div>
              <div style={{ width: 96, height: 96, border: `${TRACO}px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "center", background: enviado ? A.hex : "transparent" }}>
                <svg width={54} height={54} viewBox="-27 -27 54 54"><path d="M -18 -4 L 20 -18 L 6 20 L 0 4 Z M 0 4 L 20 -18" fill="none" stroke={enviado ? A.ink : A.hex} strokeWidth={TRACO} strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
          {curta ? null : (
            <div style={{ textAlign: "center", marginTop: 20, fontWeight: 700, fontSize: 34, color: C.text, opacity: prog(t, tDir - 0.25, 0.3), textShadow: SOMBRA }}>
              detalhes pelo <span style={{ color: A.hex }}>Direct</span>
            </div>
          )}
        </div>
      ) : null}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Rota id="cta-envio" d="M 874 1010 L 874 880 L 1040 880" p={rota} tom="accent" tracejado={false} />
      </svg>
      {assina > 0.001 ? (
        <div style={{ position: "absolute", left: 290, width: 500, top: 1160, opacity: fade(assina) }}>
          <div style={{ position: "relative", height: 120, clipPath: `inset(0 ${(1 - assina) * 100}% 0 0)` }}>
            <Img src={staticFile(logo)} style={{ position: "absolute", left: 60, top: 6, width: 380, height: 108, objectFit: "contain" }} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { clamp01, ease, mix, prog, sp };
