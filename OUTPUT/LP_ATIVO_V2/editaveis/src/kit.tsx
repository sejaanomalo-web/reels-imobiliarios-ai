import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "../../theme";
import { ease, mix, prog } from "../../lib/anim";

/**
 * Kit 16:9 do vídeo da landing ATIVO (1920×1080).
 *
 * IDENTIDADE: o arquivo oficial da logo ATIVO NÃO está no repositório. Enquanto LOGO_FILE for null, o vídeo usa um
 * marcador provisório só tipográfico ("ATIVO" em Manrope) e um traço de luz verde genérico no lugar da seta —
 * nenhum dos dois imita o símbolo oficial. Para trocar: salve o SVG/PNG aprovado em PRODUCAO/public/brand/ e aponte
 * LOGO_FILE para ele (ex.: "brand/ativo_logo.svg"); NEON recebe o verde oficial quando ele for informado.
 */
export const LOGO_FILE: string | null = null;
export const NEON = C.accent; // provisório (MARCA/brand.json) até o verde neon oficial ser informado
export const W = 1920;
export const H = 1080;
export const DEEP = "#03100B"; // verde extremamente escuro

export type Key = { t: number; x?: number; y?: number; s?: number; r?: number; rx?: number; ry?: number; e?: (p: number) => number };

const camAt = (t: number, keys: Key[]) => {
  const st = { x: 0, y: 0, s: 1, r: 0, rx: 0, ry: 0 };
  let prev = { ...st, ...keys[0] };
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const cur = { x: k.x ?? prev.x, y: k.y ?? prev.y, s: k.s ?? prev.s, r: k.r ?? prev.r, rx: k.rx ?? prev.rx, ry: k.ry ?? prev.ry };
    if (t <= k.t) {
      const p = (k.e ?? ease.inOut)(Math.max(0, Math.min(1, (t - keys[i - 1].t) / Math.max(1e-6, k.t - keys[i - 1].t))));
      return { x: mix(prev.x, cur.x, p), y: mix(prev.y, cur.y, p), s: mix(prev.s, cur.s, p), r: mix(prev.r, cur.r, p), rx: mix(prev.rx, cur.rx, p), ry: mix(prev.ry, cur.ry, p) };
    }
    prev = { ...cur, t: k.t } as typeof prev;
  }
  return prev;
};

/** Câmera virtual 16:9 com deriva sutil (nenhum quadro fica parado). */
export const Cam: React.FC<{ t: number; keys: Key[]; children: React.ReactNode; drift?: number }> = ({ t, keys, children, drift = 1 }) => {
  const c = camAt(t, keys);
  const dx = Math.sin(t * 0.6) * 7 * drift;
  const dy = Math.cos(t * 0.47) * 5 * drift;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 2400, perspectiveOrigin: "960px 540px" }}>
      <div style={{ position: "absolute", inset: 0, transformOrigin: "960px 540px", transform: `translate(${-c.x * c.s + dx}px, ${-c.y * c.s + dy}px) scale(${c.s}) rotateX(${c.rx}deg) rotateY(${c.ry}deg) rotate(${c.r}deg)` }}>
        {children}
      </div>
    </div>
  );
};

/** Fundo preto → verde muito escuro, grade técnica discreta em deriva e brilho que segue o "clima" da cena. */
export const Bg: React.FC<{ t: number; glow: number; warm?: number }> = ({ t, glow, warm = 0 }) => {
  const d = (t * 9) % 120;
  return (
    <AbsoluteFill style={{ backgroundColor: "#020403" }}>
      <AbsoluteFill style={{ background: `radial-gradient(1500px 900px at 50% 55%, ${DEEP} 0%, #020403 70%)` }} />
      <AbsoluteFill style={{ opacity: 0.5, WebkitMaskImage: "radial-gradient(1300px 760px at 50% 50%, #000 0%, transparent 80%)", maskImage: "radial-gradient(1300px 760px at 50% 50%, #000 0%, transparent 80%)" }}>
        <svg width={W} height={H}>
          <defs>
            <pattern id="lpgrid" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform={`translate(${-d} ${-d * 0.4})`}>
              <path d="M120 0H0V120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#lpgrid)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(900px 600px at ${50 + Math.sin(t * 0.13) * 8}% ${48 + Math.cos(t * 0.11) * 6}%, rgba(53,224,161,${0.05 + 0.13 * glow}) 0%, transparent 70%)` }} />
      {warm > 0 ? <AbsoluteFill style={{ background: `radial-gradient(1000px 700px at 30% 40%, rgba(255,107,94,${0.08 * warm}) 0%, transparent 70%)` }} /> : null}
      <AbsoluteFill style={{ background: "radial-gradient(1400px 900px at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
    </AbsoluteFill>
  );
};

export const Grain16: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay", pointerEvents: "none" }}>
    <svg width={W} height={H}>
      <filter id="lpgrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 30} />
      </filter>
      <rect width={W} height={H} filter="url(#lpgrain)" />
    </svg>
  </AbsoluteFill>
);

/** Marca: logo oficial quando existir; até lá, marcador tipográfico provisório (não é a logo). */
export const Mark: React.FC<{ size: number; glow?: number; sub?: boolean }> = ({ size, glow = 0, sub = false }) =>
  LOGO_FILE ? (
    <Img src={staticFile(LOGO_FILE)} style={{ height: size, filter: glow > 0 ? `drop-shadow(0 0 ${30 * glow}px rgba(53,224,161,${0.6 * glow}))` : undefined }} />
  ) : (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", fontFamily: F.sans, lineHeight: 1 }}>
      {sub ? <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: size * 0.18, letterSpacing: "0.3em", color: C.muted, marginBottom: size * 0.1 }}>SISTEMA</span> : null}
      <span style={{ fontWeight: 800, fontSize: size, letterSpacing: "0.08em", color: C.text, textShadow: glow > 0 ? `0 0 ${40 * glow}px rgba(53,224,161,${0.45 * glow})` : undefined }}>ATIVO</span>
    </div>
  );

/**
 * Traço de luz verde que percorre uma curva (substitui provisoriamente o movimento da seta oficial; sem ponta de seta).
 * `p` 0→1 desenha; `fade` apaga a cauda. `d` é o caminho SVG em coordenadas 1920×1080.
 */
export const Trail: React.FC<{ d: string; p: number; len?: number; width?: number; fade?: number; tail?: number }> = ({ d, p, len = 2600, width = 10, fade = 0, tail = 0.45 }) => {
  if (p <= 0) return null;
  const head = Math.min(1, p) * len;
  const tailLen = len * tail;
  const start = Math.max(0, head - tailLen);
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <filter id="trailglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <path d={d} fill="none" stroke={NEON} strokeWidth={width * 3} strokeLinecap="round" opacity={0.35 * (1 - fade)} filter="url(#trailglow)" strokeDasharray={`0 ${start} ${head - start} ${len * 2}`} />
      <path d={d} fill="none" stroke={NEON} strokeWidth={width} strokeLinecap="round" opacity={1 - fade} strokeDasharray={`0 ${start} ${head - start} ${len * 2}`} />
      <path d={d} fill="none" stroke="#EFFFF7" strokeWidth={width * 0.35} strokeLinecap="round" opacity={0.9 * (1 - fade)} strokeDasharray={`0 ${Math.max(0, head - 60)} ${Math.min(60, head)} ${len * 2}`} />
    </svg>
  );
};

/** Etiqueta de interface ilustrativa (obrigatória enquanto não houver telas reais do sistema). */
export const Illus: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", right: 22, bottom: 18, fontFamily: F.mono, fontWeight: 700, fontSize: 18, letterSpacing: "0.12em", color: C.dim, ...style }}>INTERFACE ILUSTRATIVA</div>
);

/** Palavras que entram uma a uma (cada palavra com seu tempo). */
export const Words: React.FC<{ t: number; words: { w: string; at: number; color?: string }[]; size: number; weight?: number; gap?: number; style?: React.CSSProperties; from?: "up" | "left" | "scale" }> = ({ t, words, size, weight = 800, gap, style, from = "up" }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: gap ?? size * 0.28, fontFamily: F.sans, fontWeight: weight, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", ...style }}>
    {words.map((x, i) => {
      const p = prog(t, x.at, 0.35, ease.out);
      const tr = from === "up" ? `translateY(${(1 - p) * size * 0.5}px)` : from === "left" ? `translateX(${(1 - p) * -size}px)` : `scale(${mix(1.5, 1, p)})`;
      return (
        <span key={i} style={{ display: "inline-block", opacity: p, transform: tr, color: x.color ?? C.text, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>
          {x.w}
        </span>
      );
    })}
  </div>
);

/** Janela de aplicativo genérica (moldura das interfaces ilustrativas). */
export const AppWindow: React.FC<{ x: number; y: number; w: number; h: number; title: string; active: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, w, h, title, active, children, style }) => {
  const MENU = ["Imóveis", "Clientes", "Campanhas", "Assistente"];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 28, overflow: "hidden", background: "#0C1210", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 60px 140px rgba(0,0,0,0.65)", fontFamily: F.sans, ...style }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 230, background: "#08100D", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "28px 18px", boxSizing: "border-box" }}>
        <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: "0.08em", color: C.text, marginBottom: 34, paddingLeft: 12 }}>ATIVO</div>
        {MENU.map((m, i) => (
          <div key={m} style={{ padding: "14px 14px", borderRadius: 14, marginBottom: 6, fontWeight: 700, fontSize: 28, color: i === active ? C.accentInk : C.muted, background: i === active ? NEON : "transparent" }}>{m}</div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 230, right: 0, top: 0, height: 86, display: "flex", alignItems: "center", padding: "0 34px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontWeight: 800, fontSize: 42, color: C.text }}>{title}</span>
      </div>
      <div style={{ position: "absolute", left: 230, right: 0, top: 86, bottom: 0 }}>{children}</div>
      <Illus />
    </div>
  );
};

/** Bloco de título de funcionalidade (rótulo grande + apoio). */
export const FeatureTitle: React.FC<{ t: number; at: number; title: string; sub: string; x: number; y: number; out?: number }> = ({ t, at, title, sub, x, y, out = 0 }) => {
  const a = prog(t, at, 0.45, ease.out);
  const b = prog(t, at + 0.25, 0.45, ease.out);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 520, fontFamily: F.sans, opacity: 1 - out, transform: `translateX(${-out * 60}px)` }}>
      <div style={{ width: 70 * a, height: 8, borderRadius: 4, background: NEON, marginBottom: 26 }} />
      <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.02, letterSpacing: "-0.03em", color: C.text, opacity: a, transform: `translateY(${(1 - a) * 30}px)`, clipPath: `inset(0 ${(1 - a) * 100}% 0 0)` }}>{title}</div>
      <div style={{ marginTop: 20, fontWeight: 600, fontSize: 36, lineHeight: 1.25, color: C.muted, opacity: b, transform: `translateY(${(1 - b) * 20}px)` }}>{sub}</div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * TRANSCRIÇÃO DINÂMICA (v2): o texto grande da tela é exatamente o que a voz diz.
 * Blocos curtos (2–4 palavras), cada palavra entra no instante em que é falada; palavras-chave em verde.
 * ------------------------------------------------------------------------------------------------ */
type CW_ = { text: string; start: number; end: number };
const KEYS = new Set(
  "sistema crm errado rotina corretor tela retorno visita confirmar proprietário imóvel lead campanha negociação retomar três dias cliente trabalho clareza acontecendo espalhada oportunidade trás ativo carteira imóveis centralizar clientes leads campanhas assistente ia memória avançar atenção agora diferencial pronto diagnóstico você personalizada demonstração whatsapp simples horário".split(" "),
);
const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/gi, "");

export const chunkWords = (words: CW_[]) => {
  const out: CW_[][] = [];
  let cur: CW_[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const txt = cur.map((x) => x.text).join(" ");
    const nxt = words[i + 1];
    const strong = /[.?!:…]$/.test(w.text);
    const soft = /,$/.test(w.text);
    const gap = nxt ? nxt.start - w.end : 9;
    if (strong || (soft && cur.length >= 2) || cur.length >= 4 || txt.length >= 22 || gap > 0.45 || !nxt) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
};

export const KCap: React.FC<{ t: number; words: CW_[]; y?: number; size?: number; hidden?: (t: number) => number }> = ({ t, words, y = 900, size = 92, hidden }) => {
  const chunks = React.useMemo(() => chunkWords(words), [words]);
  const idx = chunks.findIndex((ch, i) => t >= ch[0].start - 0.05 && (i + 1 >= chunks.length || t < chunks[i + 1][0].start - 0.05));
  if (idx < 0) return null;
  const ch = chunks[idx];
  const last = ch[ch.length - 1];
  const out = idx + 1 < chunks.length ? 0 : prog(t, last.end + 0.6, 0.3, ease.in);
  const hide = hidden ? hidden(t) : 0;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: y, display: "flex", justifyContent: "center", alignItems: "baseline", flexWrap: "wrap", columnGap: size * 0.26, opacity: (1 - out) * (1 - hide), fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.05, letterSpacing: "-0.025em", textTransform: "uppercase", pointerEvents: "none" }}>
      {ch.map((w, i) => {
        const p = prog(t, w.start - 0.04, 0.16, ease.out);
        const key = KEYS.has(norm(w.text));
        const speaking = t >= w.start && t < w.end + 0.05;
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * size * 0.35}px) scale(${mix(1.25, 1, p) * (speaking && key ? 1.04 : 1)})`, color: key ? NEON : C.text, textShadow: key ? "0 0 30px rgba(53,224,161,0.35)" : "0 4px 24px rgba(0,0,0,0.6)" }}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
