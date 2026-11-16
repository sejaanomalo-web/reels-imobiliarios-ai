import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconUser, Msg, Seal, Tag, Thumb } from "./ui";

/**
 * CENA 1 — GANCHO. Dois caminhos chegam à mesma caixa de mensagens. "…chega por indicação, alguém já contou alguma coisa sobre você"
 * → card INDICAÇÃO: alguém fala de você + selo CONFIANÇA PRÉVIA. "…chega por um anúncio, talvez tudo o que conheça seja uma foto e um
 * preço" → card ANÚNCIO: miniatura (foto ilustrativa) + preço oculto. "Tratar os dois contatos do mesmo jeito…" → a mesma resposta
 * cola nas duas conversas e "=" aparece entre os cards; "…pode ser um erro." → "=" vira "≠" (vermelho, tranco).
 */
const LX = 80;
const RX = 560;
const TOP = 330;
const W = 440;
const INBOX = { x: 110, y: 1010, w: 860 };

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const left = sp(t, 0.0, { damping: 15, stiffness: 150 });
  const right = sp(t, c.h_anun - 0.5, { damping: 15, stiffness: 150 });
  const told = sp(t, 0.1, { damping: 12, stiffness: 190 });
  const seal = sp(t, c.h_voce - 0.05, { damping: 10, stiffness: 220 });
  const foto = sp(t, c.h_foto - 0.1, { damping: 11, stiffness: 220 });
  const preco = sp(t, c.h_preco - 0.1, { damping: 11, stiffness: 220 });
  const inbox = sp(t, c.h_ind + 0.2, { damping: 15, stiffness: 140 });
  const flowL = prog(t, c.h_ind + 0.3, 0.9, ease.inOut);
  const flowR = prog(t, c.h_anun + 0.3, 0.9, ease.inOut);
  const same = sp(t, c.h_trat - 0.05, { damping: 13, stiffness: 200 });
  const eq = sp(t, c.h_mesmo - 0.05, { damping: 11, stiffness: 220 });
  const err = sp(t, c.h_erro - 0.05, { damping: 8, stiffness: 260 });
  const hit = Math.exp(-Math.max(0, t - c.h_erro) * 7) * (t > c.h_erro ? 1 : 0);
  const out = prog(t, c.r_imag - 0.4, 0.4, ease.in);
  const shake = Math.sin(t * 60) * 16 * hit;

  const card = (x: number, p: number, children: React.ReactNode, border: string) => (
    <div style={{ position: "absolute", left: x, top: TOP, width: W, height: 470, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${border}`, boxShadow: "0 30px 70px rgba(0,0,0,0.5)", padding: "26px 28px", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 160}px) rotate(${(1 - Math.min(1, p)) * (x < 500 ? -6 : 6)}deg)` }}>
      {children}
    </div>
  );
  // caminho de cada card até a caixa de mensagens
  const pathL = `M ${LX + W / 2} ${TOP + 470} C ${LX + W / 2} ${TOP + 600}, ${INBOX.x + 260} ${INBOX.y - 120}, ${INBOX.x + 260} ${INBOX.y}`;
  const pathR = `M ${RX + W / 2} ${TOP + 470} C ${RX + W / 2} ${TOP + 600}, ${INBOX.x + 600} ${INBOX.y - 120}, ${INBOX.x + 600} ${INBOX.y}`;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, x: -110, y: 40 },
          { t: c.h_voce + 0.4, s: 1.05, x: -70, y: 30, e: ease.inOut },
          { t: c.h_anun + 0.3, s: 1.04, x: 90, y: 30, e: ease.inOut },
          { t: c.h_preco + 0.4, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.h_erro, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: c.r_imag, s: 1.08, y: -10, e: ease.linear },
        ]}
      >
        {/* conexões */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {[pathL, pathR].map((d, i) => {
            const p = i ? flowR : flowL;
            return p > 0.01 ? <path key={i} d={d} fill="none" stroke={same > 0.5 ? (err > 0.5 ? C.warn : C.muted) : i ? C.cold : BRAND.hex} strokeWidth={5} strokeDasharray="1400" strokeDashoffset={1400 * (1 - p)} opacity={0.75} /> : null;
          })}
        </svg>

        {/* INDICAÇÃO */}
        {card(LX, left, (
          <>
            <Tag text="INDICAÇÃO" tone="accent" size={28} />
            <div style={{ marginTop: 34, display: "flex", alignItems: "flex-end", gap: 14, opacity: Math.min(1, told * 1.5), transform: `translateX(${(1 - Math.min(1, told)) * -60}px)` }}>
              <Avatar size={78} label="A" bg="#5A7A6E" />
              <Msg side="in" size={32} style={{ maxWidth: 290 }}>“Fala com esse corretor. Eu confio.”</Msg>
            </div>
            <div style={{ position: "absolute", left: 28, right: 28, bottom: 28, display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, seal * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, seal))})`, transformOrigin: "0 50%" }}>
              <Seal size={86} color={BRAND.hex} glow={seal}>
                <IconUser size={46} />
              </Seal>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: "0.04em", color: C.accent }}>JÁ OUVIU<br />FALAR DE VOCÊ</div>
            </div>
          </>
        ), left > 0.5 && seal > 0.5 ? brandAlpha(0.5) : C.line)}

        {/* ANÚNCIO */}
        {right > 0.001
          ? card(RX, right, (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Tag text="ANÚNCIO" tone="muted" size={28} />
                  <Tag text="FOTO ILUSTRATIVA" tone="muted" size={18} />
                </div>
                <div style={{ marginTop: 22, position: "relative", borderRadius: 18, overflow: "hidden", border: `3px solid ${foto > 0.5 ? C.text : "transparent"}`, transform: `scale(${1 + 0.04 * Math.sin(Math.min(1, foto) * Math.PI)})` }}>
                  <Thumb w={378} h={222} lit={foto} />
                  {foto > 0.01 ? <div style={{ position: "absolute", left: 14, top: 14, opacity: Math.min(1, foto * 1.5) }}><Tag text="1 FOTO" tone="muted" size={22} /></div> : null}
                </div>
                <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, preco * 1.5), transform: `translateY(${(1 - Math.min(1, preco)) * 30}px)` }}>
                  <span style={{ padding: "10px 22px", borderRadius: 16, background: C.surface3, fontWeight: 800, fontSize: 40, color: C.text, letterSpacing: "0.04em" }}>R$ ••••••</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, lineHeight: 1.15 }}>E SÓ<br />ISSO.</span>
                </div>
              </>
            ), C.line)
          : null}

        {/* = / ≠ entre os dois caminhos */}
        {eq > 0.001 ? (
          <div style={{ position: "absolute", left: 540 - 62, top: TOP + 190 + shake * 0.3, width: 124, height: 124, borderRadius: 62, background: err > 0.5 ? C.warn : C.surface2, border: `3px solid ${err > 0.5 ? C.warn : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 92, lineHeight: 1, color: err > 0.5 ? "#fff" : C.text, transform: `translateX(${shake}px) scale(${mix(0.3, 1, Math.min(1.1, eq)) * (1 + 0.25 * hit)})`, boxShadow: err > 0.5 ? "0 0 60px rgba(255,107,94,0.5)" : "0 20px 50px rgba(0,0,0,0.6)", zIndex: 5 }}>
            {err > 0.5 ? "≠" : "="}
          </div>
        ) : null}

        {/* caixa de mensagens */}
        <div style={{ position: "absolute", left: INBOX.x, top: INBOX.y, width: INBOX.w, boxSizing: "border-box", borderRadius: 34, background: C.bg1, border: `2px solid ${C.line}`, padding: "22px 26px", opacity: Math.min(1, inbox * 1.5), transform: `translateY(${(1 - Math.min(1, inbox)) * 120}px)`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted }}>MENSAGENS</span>
            <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={18} />
          </div>
          {[
            { p: flowL, who: "Indicação", txt: "Oi! Me indicaram você.", col: BRAND.hex },
            { p: flowR, who: "Anúncio", txt: "Oi! Vi o anúncio do apto.", col: C.cold },
          ].map((r, i) => {
            const a = prog(r.p, 0.7, 0.3, ease.out);
            return (
              <div key={i} style={{ height: 88, display: "flex", alignItems: "center", gap: 18, borderTop: i ? `1px solid ${C.lineSoft}` : "none", opacity: a, transform: `translateX(${(1 - a) * 40}px)` }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, background: r.col, flex: "none" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{r.who.toUpperCase()}</div>
                  <div style={{ fontWeight: 700, fontSize: 32, color: C.text, whiteSpace: "nowrap" }}>{r.txt}</div>
                </div>
                {same > 0.01 ? (
                  <div style={{ opacity: Math.min(1, same * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1, same))})` }}>
                    <Tag text="RESPOSTA PADRÃO" tone={err > 0.5 ? "warn" : "muted"} size={20} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Camera>
    </div>
  );
};
