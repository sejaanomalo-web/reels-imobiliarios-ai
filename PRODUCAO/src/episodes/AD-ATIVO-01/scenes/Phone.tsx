import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { clamp01, ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * ANÚNCIO 01 — "A venda esquecida". Um único objeto condutor: o celular do corretor (interface genérica, sem marca de app).
 * Gancho: a conversa antiga com a Carla (fictícia), parada há 12 dias, já no quadro 0. Situação: cada mensagem acende na fala;
 * chegam 10 notificações e a conversa desce na lista. Consequência: os dias passam, a Carla sai da tela, surgem as dúvidas
 * PEDIU VISITA? / RETORNO?, e um breve escurecimento antes da solução. ATIVO: a tela vira o painel de interessados (INTERFACE
 * ILUSTRATIVA, sem funcionalidade real afirmada além de organizar imóveis, interessados e atendimentos). CTA: CLIQUE NO BOTÃO ↓.
 * Área útil do anúncio: y 270–1250 (o botão e a legenda da Meta cobrem o resto).
 */
const PH = { x: 280, y: 430, w: 520, h: 680 };
const SCR = { x: 16, y: 16, w: PH.w - 32, h: PH.h - 32 };
const ROW = 92;
const NEW = ["Rafael", "Juliana", "Marcos", "Patrícia", "Diego", "Fernanda", "Lucas", "Beatriz", "Thiago", "Camila", "Rodrigo", "Aline", "Bruno", "Sofia", "Gustavo", "Larissa", "Vinícius", "Natália", "Eduarda", "Felipe"];
const NEW_MSG = ["Ainda está disponível?", "Aceita financiamento?", "Qual o valor do condomínio?", "Posso visitar amanhã?", "Tem vaga de garagem?", "Me manda o endereço?", "Ainda tem a casa?", "Aceita permuta?"];
const OLD = [
  { n: "Eduardo", m: "Obrigado pelas fotos!" },
  { n: "Carla", m: "Vou conversar com a família…", hot: true },
  { n: "Renata", m: "Combinado, até sábado." },
  { n: "Paulo", m: "Pode ser às 15h?" },
];
const AV = ["#4E6A8C", "#8C6A4E", "#5A7A6E", "#6A5A8C", "#7A5A6E", "#5A6E8C", "#8C7A4E", "#6E7A5A"];

const Avatar: React.FC<{ n: string; i: number; size?: number }> = ({ n, i, size = 56 }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, flex: "none", background: AV[i % AV.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.42, color: C.text }}>{n[0]}</div>
);

const Bubble: React.FC<{ me?: boolean; p: number; lit: number; children: React.ReactNode }> = ({ me, p, lit, children }) => (
  <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginTop: 12, opacity: p }}>
    <div style={{ maxWidth: 360, padding: "14px 18px", borderRadius: 22, borderBottomLeftRadius: me ? 22 : 6, borderBottomRightRadius: me ? 6 : 22, background: me ? BRAND.deep : C.surface3, border: `2px solid ${lit > 0.5 ? BRAND.hex : "transparent"}`, boxShadow: lit > 0.5 ? `0 0 22px ${brandAlpha(0.35)}` : "none", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: C.text, transform: `scale(${1 + 0.04 * Math.sin(clamp01(lit) * Math.PI)})` }}>{children}</div>
  </div>
);

const Chip: React.FC<{ text: string; tone: "warn" | "ok"; p: number }> = ({ text, tone, p }) =>
  p > 0.01 ? (
    <span style={{ padding: "6px 12px", borderRadius: 999, background: tone === "ok" ? brandAlpha(0.16) : "rgba(255,107,94,0.16)", color: tone === "ok" ? BRAND.hex : C.warn, fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.04em", whiteSpace: "nowrap", opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1, p))})`, display: "inline-block" }}>{text}</span>
  ) : null;

export const Phone: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // fases
  const toList = prog(t, c.s_cheg + 0.6, 0.6, ease.inOut);
  const toPanel = prog(t, c.a_just + 0.2, 0.7, ease.inOut);
  const toCta = prog(t, c.cta_q - 0.2, 0.8, ease.inOut);
  // conversa
  const lit = [c.s_perg, c.s_info, c.s_fam].map((a) => prog(t, a - 0.05, 0.25, ease.out) * (1 - prog(t, a + 1.6, 0.4, ease.in)));
  const stale = sp(t, c.h_esq - 0.05, { damping: 11, stiffness: 210 });
  const typing = Math.floor(t * 3) % 3;
  // notificações (10) e lista
  const notifN = Math.min(10, Math.max(0, Math.floor((t - c.s_cheg) / ((c.s_dez + 0.6 - c.s_cheg) / 10)) + 1));
  const nf = mix(0, 10, prog(t, c.s_cheg + 0.6, Math.max(0.8, c.c_desc - c.s_cheg - 0.4), ease.inOut)) + mix(0, 6, prog(t, c.c_desc, c.c_tras + 0.6 - c.c_desc, ease.inOut)) + Math.max(0, Math.min(c.a_just, t) - (c.c_tras + 0.6)) * 0.12;
  const days = ["HOJE", "ONTEM", "HÁ 3 DIAS", "HÁ 1 SEMANA", "HÁ 12 DIAS"];
  const dayIx = Math.min(4, Math.floor(prog(t, c.c_rot - 0.4, c.c_prob - c.c_rot + 0.4, ease.linear) * 5));
  const qVis = sp(t, c.c_visita - 0.05, { damping: 12, stiffness: 200 });
  const qRet = sp(t, c.c_ret - 0.05, { damping: 12, stiffness: 200 });
  const dim = prog(t, c.c_ret + 0.6, 0.4, ease.out) * (1 - prog(t, c.a_just - 0.2, 0.4, ease.out));
  // painel
  const tabs = [c.a_imo, c.a_int, c.a_atend].map((a) => prog(t, a - 0.05, 0.3, ease.out));
  const rowsP = [0, 1, 2, 3].map((i) => sp(t, c.a_org + 0.1 + i * 0.15, { damping: 14, stiffness: 180 }));
  const cent = prog(t, c.a_cent, 0.6, ease.out);
  const logo = prog(t, c.a_ativo - 0.1, 0.6, ease.out);
  // títulos
  const hookT = Math.min(1, sp(t, 0, { damping: 14, stiffness: 200 }) + (t < 0.05 ? 1 : 0)) * (1 - prog(t, c.s_perg - 0.4, 0.3, ease.in));
  const dezT = sp(t, c.s_dez - 0.1, { damping: 10, stiffness: 220 }) * (1 - prog(t, c.c_desc + 0.6, 0.3, ease.in));
  const quemT = sp(t, c.c_visita - 0.2, { damping: 13, stiffness: 180 }) * (1 - prog(t, c.a_just, 0.3, ease.in));
  const ctaT = sp(t, c.cta_q - 0.05, { damping: 13, stiffness: 170 });
  const btn = sp(t, c.cta_clique - 0.1, { damping: 10, stiffness: 210 });
  const bob = Math.sin(t * 5) * 14;

  const phoneS = mix(1, 0.55, toCta);
  const phoneY = mix(PH.y, 390, toCta);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.06, y: -20, r: -2 },
          { t: c.h_esq + 0.5, s: 1.03, y: -10, r: -0.5, e: ease.out },
          { t: c.s_perg, s: 1.02, y: 0, r: 0, e: ease.inOut },
          { t: c.s_cheg + 0.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.c_tras, s: 1.02, y: 0, r: 1, e: ease.inOut },
          { t: c.c_ret + 0.8, s: 1.03, y: 0, r: 0, e: ease.inOut },
          { t: c.a_just + 0.7, s: 0.98, y: 0, e: ease.inOut },
          { t: c.a_rot, s: 1.0, y: 0, e: ease.linear },
          { t: c.cta_q + 0.4, s: 1.0, y: 0, e: ease.inOut },
        ]}
      >
        {/* celular */}
        <div style={{ position: "absolute", left: PH.x, top: phoneY, width: PH.w, height: PH.h, borderRadius: 64, background: "#0B0D10", border: `4px solid ${toPanel > 0.5 ? BRAND.hex : "rgba(255,255,255,0.18)"}`, boxShadow: `0 50px 120px rgba(0,0,0,0.7)${toPanel > 0.5 ? `, 0 0 ${40 + 30 * cent}px ${brandAlpha(0.3)}` : ""}`, transform: `translateY(${Math.sin(t * 1.6) * 10}px) scale(${phoneS * (1 + 0.012 * Math.sin(t * 2.1))}) perspective(1600px) rotateY(${mix(-22, 0, prog(t, 0, 1.6, ease.out)) + Math.sin(t * 0.9) * 6}deg) rotateX(${mix(8, 0, prog(t, 0, 1.6, ease.out)) + Math.sin(t * 0.7) * 2}deg) rotateZ(${Math.sin(t * 0.6) * 1.2}deg)`, transformOrigin: "50% 0" }}>
          <div style={{ position: "absolute", left: SCR.x, top: SCR.y, width: SCR.w, height: SCR.h, borderRadius: 50, overflow: "hidden", background: C.bg1 }}>
            {/* A — conversa com a Carla */}
            {toList < 1 ? (
              <div style={{ position: "absolute", inset: 0, opacity: 1 - toList, transform: `translateX(${-toList * 200}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, height: 96, padding: "0 22px", background: C.surface2 }}>
                  <Avatar n="Carla" i={1} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Carla</div>
                    <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>visto há 12 dias</div>
                  </div>
                </div>
                <div style={{ padding: "8px 20px" }}>
                  <Bubble p={1} lit={lit[0]}>Oi! O apartamento de 2 quartos ainda está disponível?</Bubble>
                  <Bubble me p={1} lit={0}>Está sim! Te mando as informações.</Bubble>
                  <Bubble p={1} lit={lit[1]}>Pode mandar o valor e as fotos?</Bubble>
                  <Bubble p={1} lit={lit[2]}>Vou conversar com a família e te aviso.</Bubble>
                  {/* sem resposta: logo abaixo da última mensagem */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 18, opacity: Math.min(1, 0.6 + stale) }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 999, background: "rgba(255,107,94,0.14)", border: `2px solid ${C.warn}`, transform: `scale(${1 + 0.06 * Math.sin(t * 6)})` }}>
                      <span style={{ width: 14, height: 14, borderRadius: 7, background: C.warn, opacity: 0.5 + 0.5 * Math.sin(t * 8) }} />
                      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.warn }}>SEM RESPOSTA · 12 DIAS</span>
                    </div>
                  </div>
                </div>
                {/* "digitando…" da memória: pontinhos */}
                <div style={{ position: "absolute", left: 22, bottom: 96, display: "flex", gap: 8, opacity: 0.4 * (1 - stale) }}>
                  {[0, 1, 2].map((k) => <span key={k} style={{ width: 12, height: 12, borderRadius: 6, background: C.muted, opacity: k === typing ? 1 : 0.35 }} />)}
                </div>
              </div>
            ) : null}
            {/* notificações descendo do topo */}
            {t > c.s_cheg - 0.05 && toList < 1
              ? Array.from({ length: notifN }).map((_, k) => {
                  const a = prog(t, c.s_cheg + k * ((c.s_dez + 0.6 - c.s_cheg) / 10), 0.25, ease.out);
                  return (
                    <div key={k} style={{ position: "absolute", left: 14, right: 14, top: 14 + Math.min(k, 3) * 14 + (1 - a) * -120, height: 84, borderRadius: 22, background: "rgba(38,43,51,0.97)", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", zIndex: 10 + k, opacity: a }}>
                      <Avatar n={NEW[k]} i={k + 2} size={46} />
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{NEW[k]}</div>
                        <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{NEW_MSG[k % NEW_MSG.length]}</div>
                      </div>
                    </div>
                  );
                })
              : null}
            {/* B — lista de conversas */}
            {toList > 0.001 && toPanel < 1 ? (
              <div style={{ position: "absolute", inset: 0, opacity: toList * (1 - toPanel) }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 84, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", background: C.surface2, zIndex: 5 }}>
                  <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Conversas</span>
                  <span style={{ padding: "6px 14px", borderRadius: 999, background: C.surface3, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{days[dayIx]}</span>
                </div>
                {Array.from({ length: Math.ceil(nf) }).map((_, k) => {
                  const y = 84 + (nf - 1 - k) * ROW;
                  return (
                    <div key={`n${k}`} style={{ position: "absolute", left: 0, right: 0, top: y, height: ROW, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", borderBottom: `1px solid ${C.lineSoft}` }}>
                      <Avatar n={NEW[k]} i={k + 2} />
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{NEW[k]}</span>
                          {k === 9 ? <Chip text="PEDIU VISITA?" tone="warn" p={qVis} /> : null}
                          {k === 8 ? <Chip text="RETORNO?" tone="warn" p={qRet} /> : null}
                          {k === 7 ? <Chip text="RETORNO?" tone="warn" p={qRet} /> : null}
                          {k === 6 ? <Chip text="PEDIU VISITA?" tone="warn" p={qVis} /> : null}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{NEW_MSG[k % NEW_MSG.length]}</div>
                      </div>
                    </div>
                  );
                })}
                {OLD.map((o, j) => {
                  const y = 84 + (nf + j) * ROW;
                  if (y > SCR.h + 10) return null;
                  return (
                    <div key={o.n} style={{ position: "absolute", left: 0, right: 0, top: y, height: ROW, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", background: o.hot ? "rgba(255,107,94,0.10)" : "transparent", borderBottom: `1px solid ${C.lineSoft}` }}>
                      <Avatar n={o.n} i={j} />
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontWeight: 800, fontSize: 28, color: o.hot ? C.warn : C.text }}>{o.n}</div>
                        <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{o.m}</div>
                      </div>
                    </div>
                  );
                })}
                {/* a conversa some para baixo: indicador */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: `linear-gradient(180deg, transparent, ${C.bg1})` }} />
              </div>
            ) : null}
            {/* C — painel de interessados (ilustrativo) */}
            {toPanel > 0.001 ? (
              <div style={{ position: "absolute", inset: 0, opacity: toPanel, transform: `translateY(${(1 - toPanel) * 80}px)` }}>
                <div style={{ height: 78, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: C.surface2 }}>
                  <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Atendimentos</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>ILUSTRATIVO</span>
                </div>
                <div style={{ display: "flex", gap: 8, padding: "14px 14px 6px" }}>
                  {["IMÓVEIS", "INTERESSADOS", "ATENDIM."].map((k, i) => (
                    <div key={k} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 16, background: tabs[i] > 0.5 ? BRAND.hex : C.surface3, color: tabs[i] > 0.5 ? BRAND.ink : C.muted, fontFamily: F.mono, fontWeight: 700, fontSize: 24, transform: `scale(${1 + 0.08 * Math.sin(clamp01(tabs[i]) * Math.PI)})` }}>{k}</div>
                  ))}
                </div>
                {[
                  { n: "Carla", m: "Conversar com a família", tag: "RETORNO HOJE", i: 1 },
                  { n: "Rafael", m: "Apto 2 quartos", tag: "VISITA SÁB 10H", i: 2 },
                  { n: "Juliana", m: "Casa com quintal", tag: "ENVIAR FOTOS", i: 3 },
                  { n: "Marcos", m: "Financiamento", tag: "AGUARDA DOCS", i: 4 },
                ].map((r, k) => (
                  <div key={r.n} style={{ margin: "10px 14px 0", padding: "14px 16px", borderRadius: 20, background: C.surface, border: `2px solid ${k === 0 && rowsP[0] > 0.5 ? BRAND.hex : C.line}`, boxShadow: k === 0 && rowsP[0] > 0.5 ? `0 0 ${16 + 14 * Math.sin(t * 4)}px ${brandAlpha(0.45)}` : "none", display: "flex", alignItems: "center", gap: 12, opacity: Math.min(1, rowsP[k] * 1.5), transform: `translateX(${(1 - Math.min(1, rowsP[k])) * 120 + (k === 0 ? Math.sin(t * 3) * 3 : 0)}px)` }}>
                    <Avatar n={r.n} i={r.i} size={50} />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontWeight: 800, fontSize: 27, color: C.text }}>{r.n}</div>
                      <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{r.m}</div>
                    </div>
                    <Chip text={r.tag} tone="ok" p={rowsP[k]} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {/* escurecimento antes da solução */}
        {dim > 0.01 ? <div style={{ position: "absolute", inset: -200, background: "#000", opacity: dim * 0.55 }} /> : null}

      </Camera>
        {/* títulos (área útil) */}
      {hookT > 0.001 ? (
        <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text, opacity: hookT }}>
          A VENDA QUE <span style={{ color: BRAND.hex }}>VOCÊ ESQUECEU</span>?
        </div>
      ) : null}
      {dezT > 0.001 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 84, letterSpacing: "-0.04em", color: C.warn, opacity: Math.min(1, dezT * 1.5), transform: `scale(${mix(1.6, 1, Math.min(1, dezT))})` }}>+{notifN} MENSAGENS</div>
      ) : null}
      {quemT > 0.001 ? (
        <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.04, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, quemT * 1.5) }}>
          QUEM PEDIU <span style={{ color: C.warn }}>VISITA</span>?
          <br />
          QUEM PRECISA DE <span style={{ color: C.warn }}>RETORNO</span>?
        </div>
      ) : null}
      {logo > 0.001 && toCta < 0.5 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", opacity: logo * (1 - toCta * 2), clipPath: `inset(-20% ${(1 - logo) * 100}% -20% -5%)` }}>
          <Img src={staticFile(BRAND.logo)} style={{ height: 92, filter: `drop-shadow(0 0 18px ${brandAlpha(0.5)})` }} />
        </div>
      ) : null}

        {/* CTA */}
      {ctaT > 0.001 ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", opacity: Math.min(1, ctaT * 1.5) }}>
            <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 14px ${brandAlpha(0.45)})` }} />
          </div>
          <div style={{ position: "absolute", left: 80, right: 80, top: 800, textAlign: "center", fontWeight: 800, fontSize: 64, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, ctaT * 1.5), transform: `translateY(${(1 - Math.min(1, ctaT)) * 40}px)` }}>
            QUER CONHECER <span style={{ color: BRAND.hex }}>COMO FUNCIONA?</span>
          </div>
        </>
      ) : null}
      {btn > 0.001 ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", opacity: Math.min(1, btn * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, btn)) * (1 + 0.04 * Math.sin(t * 5))})` }}>
            <div style={{ padding: "24px 56px", borderRadius: 999, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 56, letterSpacing: "-0.02em", boxShadow: `0 0 ${40 + 20 * Math.sin(t * 4)}px ${brandAlpha(0.55)}` }}>CLIQUE NO BOTÃO</div>
          </div>
          {[0, 1, 2].map((k) => {
            const u = (((t - c.cta_clique) * 0.8 + k / 3) % 1 + 1) % 1;
            return <div key={k} style={{ position: "absolute", left: 540 - 250 - u * 90, top: 960 - u * 60, width: 500 + u * 180, height: 112 + u * 120, borderRadius: 999, border: `3px solid ${BRAND.hex}`, opacity: (1 - u) * 0.5 * Math.min(1, btn) }} />;
          })}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: Math.min(1, btn * 1.5) }}>
            <path d={`M 540 ${1090 + bob} L 540 ${1220 + bob} M 500 ${1180 + bob} L 540 ${1222 + bob} L 580 ${1180 + bob}`} fill="none" stroke={BRAND.hex} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 10px ${brandAlpha(0.6)})` }} />
          </svg>
        </>
      ) : null}
    </div>
  );
};
