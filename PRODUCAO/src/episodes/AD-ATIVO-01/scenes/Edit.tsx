import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { clamp01, ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { camAt, CamKey } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { AdKey, buildCuts } from "./cuts";

/**
 * ANÚNCIO 01 v2 — "A venda esquecida", edição para PARAR O SCROLL (pedido do cliente, 15/11/2026).
 * Duas camadas: (1) PALCO (y 270–910, recortado) com cortes a cada ~1 s — zooms de impacto, tremida nos impactos, flashes,
 * chicotes —; (2) TRANSCRIÇÃO DINÂMICA (y ≈ 930–1240): o texto da tela é a fala, palavra por palavra, palavras-chave em destaque
 * (vermelho no problema, verde na solução). Conversas, nomes e o painel são ILUSTRATIVOS. Área útil do anúncio: y 270–1250.
 */
const STAGE = { top: 270, h: 640 };
const PH = { x: 280, y: 40, w: 520, h: 680, k: 0.8 }; // celular desenhado em 520×680 e reduzido para 0,8
const NEW = ["Rafael", "Juliana", "Marcos", "Patrícia", "Diego", "Fernanda", "Lucas", "Beatriz", "Thiago", "Camila", "Rodrigo", "Aline", "Bruno", "Sofia", "Gustavo", "Larissa", "Vinícius", "Natália", "Eduarda", "Felipe"];
const MSG = ["Ainda está disponível?", "Aceita financiamento?", "Qual o valor do condomínio?", "Posso visitar amanhã?", "Tem vaga de garagem?", "Me manda o endereço?", "Ainda tem a casa?", "Aceita permuta?"];
const AV = ["#4E6A8C", "#8C6A4E", "#5A7A6E", "#6A5A8C", "#7A5A6E", "#5A6E8C", "#8C7A4E", "#6E7A5A"];

const Avatar: React.FC<{ n: string; i: number; size?: number; style?: React.CSSProperties }> = ({ n, i, size = 56, style }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, flex: "none", background: AV[i % AV.length], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size * 0.42, color: C.text, ...style }}>{n[0]}</div>
);

/** tremida amortecida a partir de cada impacto */
const shake = (t: number, hits: number[], amp: number) =>
  hits.reduce((acc, h) => (t >= h ? acc + amp * Math.exp(-(t - h) * 9) * Math.sin((t - h) * 72) : acc), 0);
/** flash curto */
const flash = (t: number, hits: number[]) => hits.reduce((acc, h) => Math.max(acc, t >= h ? Math.exp(-(t - h) * 22) : 0), 0);

export const Edit: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // ---------- fases do palco ----------
  const chatOn = t < c.c_desc;
  const listOn = t >= c.c_desc - 0.05 && t < c.c_varias;
  const gridOn = t >= c.c_varias - 0.05 && t < c.a_just;
  const panelOn = t >= c.a_just - 0.05;
  const black = prog(t, c.c_ret + 0.75, 0.1, ease.out) * (1 - prog(t, c.a_just - 0.12, 0.12, ease.out));

  // ---------- câmera do palco (cortes) ----------
  const cut = (at: number, k: Omit<AdKey, "t" | "cut">): AdKey[] => [{ t: at, ...k, cut: true }];
  const keys: CamKey[] = buildCuts([
    { t: 0, s: 1.75, x: 0, y: 165, r: -3 },
    { t: c.h_conversa - 0.2, s: 1.6, x: 0, y: 160, r: -1.5, e: ease.linear },
    ...cut(c.h_conversa, { s: 1.0, x: 0, y: 0, r: 0 }),
    { t: c.h_esq - 0.15, s: 1.04, y: 10, e: ease.linear },
    ...cut(c.h_esq + 0.1, { s: 1.45, y: 190, r: 2 }),
    { t: c.s_perg - 0.2, s: 1.4, y: 185, r: 1, e: ease.linear },
    ...cut(c.s_perg, { s: 1.35, y: -110, r: -1.5 }),
    ...cut(c.s_info, { s: 1.35, y: 40, r: 1.5 }),
    ...cut(c.s_fam, { s: 1.35, y: 110, r: -1 }),
    ...cut(c.s_cheg, { s: 1.0, y: 0, r: 0 }),
    { t: c.s_dez + 0.4, s: 1.06, y: -20, e: ease.linear },
    ...cut(c.c_desc, { s: 1.12, y: 40, r: -4 }),
    { t: c.c_rot, s: 1.0, y: 0, r: 0, e: ease.inOut },
    ...cut(c.c_tras, { s: 1.3, y: 140, r: 3 }),
    { t: c.c_varias - 0.2, s: 1.2, y: 120, r: 2, e: ease.linear },
    ...cut(c.c_varias, { s: 1.0, y: 0, r: 0 }),
    ...cut(c.c_visita, { s: 1.18, x: -120, y: -20 }),
    ...cut(c.c_ret, { s: 1.18, x: 120, y: 60 }),
    ...cut(c.a_just, { s: 1.0, x: 0, y: 0 }),
    ...cut(c.a_imo, { s: 1.4, x: -110, y: -150 }),
    ...cut(c.a_int, { s: 1.4, x: 0, y: -150 }),
    ...cut(c.a_atend, { s: 1.4, x: 110, y: -150 }),
    ...cut(c.a_cent, { s: 1.0, x: 0, y: 0 }),
    { t: c.cta_q, s: 1.03, e: ease.linear },
    ...cut(c.cta_clique, { s: 0.95, y: 0 }),
    { t: tl.duration, s: 1.0, e: ease.linear },
  ]);
  const cam = camAt(t, keys);
  const prev = camAt(t - 1 / 30, keys);
  const speed = Math.hypot((cam.x - prev.x) * cam.s, (cam.y - prev.y) * cam.s) * 30 + Math.abs(Math.log(cam.s / prev.s)) * 30 * 700;
  const blur = Math.min(10, Math.max(0, (speed - 700) / 300));
  const impacts = [0, c.h_esq + 0.45, c.s_dez + 0.55, c.c_visita + 0.35, c.c_ret + 0.35, c.a_ativo + 0.4, c.cta_clique - 0.15];
  const sx = shake(t, impacts, 14);
  const sy = shake(t + 0.37, impacts, 10);
  const fl = flash(t, [c.s_dez + 0.55, c.a_ativo + 0.4, c.cta_clique - 0.15]);

  // ---------- conteúdo ----------
  const lit = [c.s_perg, c.s_info, c.s_fam].map((a) => prog(t, a - 0.05, 0.2, ease.out));
  const days = Math.min(12, Math.max(1, Math.floor(1 + prog(t, 0, Math.max(0.6, c.h_venda + 0.9), ease.out) * 11)));
  const notifN = Math.min(10, Math.max(0, Math.floor(((t - c.s_cheg) / Math.max(0.3, c.s_dez + 0.5 - c.s_cheg)) * 10) + 1));
  const big10 = sp(t, c.s_dez + 0.5, { damping: 9, stiffness: 260 }) * (1 - prog(t, c.c_desc - 0.1, 0.15, ease.in));
  const nf = mix(0, 10, prog(t, c.c_desc, 0.7, ease.inOut)) + mix(0, 6, prog(t, c.c_rot, c.c_tras + 0.3 - c.c_rot, ease.inOut)) + Math.max(0, t - c.c_tras - 0.3) * 1.2;
  const dayLabels = ["HOJE", "ONTEM", "HÁ 3 DIAS", "HÁ 1 SEMANA", "HÁ 12 DIAS"];
  const dayIx = Math.min(4, Math.floor(prog(t, c.c_rot - 0.2, c.c_tras - c.c_rot + 0.2, ease.linear) * 5));
  const fall = prog(t, c.c_tras, 0.6, ease.in);
  const tagV = sp(t, c.c_visita + 0.3, { damping: 9, stiffness: 260 });
  const tagR = sp(t, c.c_ret + 0.3, { damping: 9, stiffness: 260 });
  const logoBig = sp(t, c.a_ativo + 0.35, { damping: 11, stiffness: 200 });
  const logoSmall = prog(t, c.a_org + 0.3, 0.4, ease.inOut);
  const tabs = [c.a_imo, c.a_int, c.a_atend].map((a) => prog(t, a, 0.15, ease.out));
  const rowsP = [0, 1, 2, 3].map((i) => sp(t, c.a_just + 0.2 + i * 0.1, { damping: 14, stiffness: 190 }));
  const checks = [0, 1, 2, 3].map((i) => prog(t, c.a_cent + i * 0.12, 0.2, ease.out));
  const btn = sp(t, c.cta_clique - 0.15, { damping: 9, stiffness: 240 });
  const ctaUp = prog(t, c.cta_q - 0.1, 0.4, ease.inOut);

  const Phone: React.FC<{ children: React.ReactNode; glow?: boolean }> = ({ children, glow }) => (
    <div style={{ position: "absolute", left: PH.x, top: PH.y, width: PH.w, height: PH.h, borderRadius: 64, background: "#0B0D10", border: `4px solid ${glow ? BRAND.hex : "rgba(255,255,255,0.2)"}`, boxShadow: `0 40px 100px rgba(0,0,0,0.7)${glow ? `, 0 0 50px ${brandAlpha(0.35)}` : ""}`, transform: `scale(${PH.k}) rotate(${Math.sin(t * 1.3) * 1.2}deg) translateY(${Math.sin(t * 1.9) * 8}px)`, transformOrigin: "50% 0" }}>
      <div style={{ position: "absolute", left: 16, top: 16, right: 16, bottom: 16, borderRadius: 50, overflow: "hidden", background: C.bg1 }}>{children}</div>
    </div>
  );

  return (
    <>
      {/* ---------------- PALCO ---------------- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: STAGE.top, height: STAGE.h, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "540px 320px", transform: `translate(${-cam.x * cam.s + sx}px, ${-cam.y * cam.s + sy}px) scale(${cam.s}) rotate(${cam.r}deg)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
          {/* A — conversa com a Carla */}
          {chatOn ? (
            <Phone>
              <div style={{ display: "flex", alignItems: "center", gap: 14, height: 96, padding: "0 22px", background: C.surface2 }}>
                <Avatar n="Carla" i={1} />
                <div style={{ fontFamily: F.sans }}>
                  <div style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Carla</div>
                  <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>visto há {days} {days === 1 ? "dia" : "dias"}</div>
                </div>
              </div>
              <div style={{ padding: "8px 20px", fontFamily: F.sans }}>
                {[
                  { s: "Oi! O apartamento de 2 quartos ainda está disponível?", me: false, l: lit[0] },
                  { s: "Está sim! Te mando as informações.", me: true, l: 0 },
                  { s: "Pode mandar o valor e as fotos?", me: false, l: lit[1] },
                  { s: "Vou conversar com a família e te aviso.", me: false, l: lit[2] },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: b.me ? "flex-end" : "flex-start", marginTop: 12 }}>
                    <div style={{ maxWidth: 360, padding: "14px 18px", borderRadius: 22, background: b.me ? BRAND.deep : C.surface3, border: `3px solid ${b.l > 0.5 ? BRAND.hex : "transparent"}`, boxShadow: b.l > 0.5 ? `0 0 26px ${brandAlpha(0.45)}` : "none", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: C.text, transform: `scale(${1 + 0.08 * Math.sin(clamp01(b.l) * Math.PI)})` }}>{b.s}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 999, background: "rgba(255,107,94,0.16)", border: `3px solid ${C.warn}`, transform: `scale(${1 + 0.07 * Math.sin(t * 7)})` }}>
                    <span style={{ width: 14, height: 14, borderRadius: 7, background: C.warn }} />
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.warn }}>SEM RESPOSTA · {days} {days === 1 ? "DIA" : "DIAS"}</span>
                  </div>
                </div>
              </div>
              {/* avalanche de notificações */}
              {t > c.s_cheg - 0.05
                ? Array.from({ length: notifN }).map((_, k) => {
                    const a = prog(t, c.s_cheg + (k * Math.max(0.3, c.s_dez + 0.5 - c.s_cheg)) / 10, 0.12, ease.out);
                    return (
                      <div key={k} style={{ position: "absolute", left: 14, right: 14, top: 14 + Math.min(k, 4) * 18 + (1 - a) * -130, height: 88, borderRadius: 22, background: "rgba(38,43,51,0.98)", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", boxShadow: "0 12px 30px rgba(0,0,0,0.55)", zIndex: 10 + k, transform: `rotate(${(rnd(k * 3.3) - 0.5) * 4}deg)`, fontFamily: F.sans }}>
                        <Avatar n={NEW[k]} i={k + 2} size={48} />
                        <div style={{ overflow: "hidden" }}>
                          <div style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{NEW[k]}</div>
                          <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{MSG[k % MSG.length]}</div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </Phone>
          ) : null}
          {/* +10 */}
          {big10 > 0.01 && chatOn ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 220, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 190, letterSpacing: "-0.05em", color: C.warn, textShadow: "0 20px 60px rgba(0,0,0,0.8)", transform: `scale(${mix(2.2, 1, Math.min(1.05, big10))}) rotate(-6deg)`, opacity: Math.min(1, big10 * 2) }}>+10</div>
          ) : null}

          {/* B — lista: a conversa da Carla vai descendo e cai */}
          {listOn ? (
            <Phone>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 84, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", background: C.surface2, zIndex: 5, fontFamily: F.sans }}>
                <span style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Conversas</span>
                <span style={{ padding: "6px 14px", borderRadius: 999, background: dayIx > 2 ? "rgba(255,107,94,0.2)" : C.surface3, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: dayIx > 2 ? C.warn : C.muted, transform: `scale(${1 + 0.12 * Math.sin(clamp01((t - c.c_rot) * 3) * Math.PI)})` }}>{dayLabels[dayIx]}</span>
              </div>
              {Array.from({ length: Math.min(NEW.length, Math.ceil(nf)) }).map((_, k) => (
                <div key={k} style={{ position: "absolute", left: 0, right: 0, top: 84 + (nf - 1 - k) * 92, height: 92, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", borderBottom: `1px solid ${C.lineSoft}`, fontFamily: F.sans }}>
                  <Avatar n={NEW[k]} i={k + 2} />
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{NEW[k]}</div>
                    <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{MSG[k % MSG.length]}</div>
                  </div>
                </div>
              ))}
              <div style={{ position: "absolute", left: 0, right: 0, top: 84 + nf * 92 + fall * 260, height: 92, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", background: "rgba(255,107,94,0.14)", borderTop: `2px solid ${C.warn}`, borderBottom: `2px solid ${C.warn}`, opacity: 1 - fall * 0.8, transform: `rotate(${fall * 8}deg) scale(${1 - fall * 0.3})`, fontFamily: F.sans }}>
                <Avatar n="Carla" i={1} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 28, color: C.warn }}>Carla</div>
                  <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>Vou conversar com a família…</div>
                </div>
              </div>
            </Phone>
          ) : null}

          {/* C — várias pessoas: quem pediu visita? quem precisa de retorno? */}
          {gridOn ? (
            <div style={{ position: "absolute", left: 120, top: 70, width: 840 }}>
              {Array.from({ length: 12 }).map((_, k) => {
                const a = sp(t, c.c_varias + k * 0.04, { damping: 11, stiffness: 240 });
                const col = k % 4;
                const row = Math.floor(k / 4);
                const isV = k === 1 || k === 6;
                const isR = k === 3 || k === 8 || k === 10;
                return (
                  <div key={k} style={{ position: "absolute", left: col * 210, top: row * 170 + Math.sin(t * 2 + k) * 5, width: 180, textAlign: "center", transform: `scale(${mix(0.1, 1, Math.min(1.12, a))}) rotate(${(1 - Math.min(1, a)) * (k % 2 ? 40 : -40)}deg)`, opacity: Math.min(1, a * 2) }}>
                    <Avatar n={NEW[k + 4]} i={k} size={112} style={{ margin: "0 auto", border: `4px solid ${isV && tagV > 0.5 ? C.warn : isR && tagR > 0.5 ? C.warn : "transparent"}` }} />
                    {isV && tagV > 0.01 ? <div style={{ marginTop: 8, display: "inline-block", padding: "6px 12px", borderRadius: 999, background: C.warn, color: "#fff", fontFamily: F.mono, fontWeight: 700, fontSize: 24, transform: `scale(${mix(0.3, 1, Math.min(1.1, tagV))})` }}>VISITA?</div> : null}
                    {isR && tagR > 0.01 ? <div style={{ marginTop: 8, display: "inline-block", padding: "6px 12px", borderRadius: 999, background: C.warn, color: "#fff", fontFamily: F.mono, fontWeight: 700, fontSize: 24, transform: `scale(${mix(0.3, 1, Math.min(1.1, tagR))})` }}>RETORNO?</div> : null}
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* D — painel ATIVO (ilustrativo) */}
          {panelOn ? (
            <div style={{ transform: `translateY(${(1 - prog(t, c.a_just - 0.05, 0.3, ease.out)) * 500}px)` }}>
              <Phone glow>
                <div style={{ height: 78, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: C.surface2, fontFamily: F.sans }}>
                  <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>Atendimentos</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>ILUSTRATIVO</span>
                </div>
                <div style={{ display: "flex", gap: 8, padding: "14px 14px 6px" }}>
                  {["IMÓVEIS", "INTERESSADOS", "ATENDIM."].map((k, i) => (
                    <div key={k} style={{ flex: 1, textAlign: "center", padding: "12px 0", borderRadius: 16, background: tabs[i] > 0.5 ? BRAND.hex : C.surface3, color: tabs[i] > 0.5 ? BRAND.ink : C.muted, fontFamily: F.mono, fontWeight: 700, fontSize: 24, transform: `scale(${1 + 0.12 * Math.sin(clamp01(tabs[i]) * Math.PI)})` }}>{k}</div>
                  ))}
                </div>
                {[
                  { n: "Carla", m: "Conversar com a família", tag: "RETORNO HOJE", i: 1 },
                  { n: "Rafael", m: "Apto 2 quartos", tag: "VISITA SÁB", i: 2 },
                  { n: "Juliana", m: "Casa com quintal", tag: "ENVIAR FOTOS", i: 3 },
                  { n: "Marcos", m: "Financiamento", tag: "AGUARDA DOCS", i: 4 },
                ].map((r, k) => (
                  <div key={r.n} style={{ margin: "10px 14px 0", padding: "14px 16px", borderRadius: 20, background: C.surface, border: `2px solid ${k === 0 ? BRAND.hex : C.line}`, boxShadow: k === 0 ? `0 0 ${16 + 12 * Math.sin(t * 5)}px ${brandAlpha(0.45)}` : "none", display: "flex", alignItems: "center", gap: 12, opacity: Math.min(1, rowsP[k] * 1.5), transform: `translateX(${(1 - Math.min(1, rowsP[k])) * 160}px)`, fontFamily: F.sans }}>
                    <Avatar n={r.n} i={r.i} size={50} />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontWeight: 800, fontSize: 27, color: C.text }}>{r.n}</div>
                      <div style={{ fontWeight: 600, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>{r.m}</div>
                    </div>
                    <span style={{ padding: "6px 10px", borderRadius: 999, background: checks[k] > 0.5 ? BRAND.hex : brandAlpha(0.16), color: checks[k] > 0.5 ? BRAND.ink : BRAND.hex, fontFamily: F.mono, fontWeight: 700, fontSize: 24, whiteSpace: "nowrap" }}>{checks[k] > 0.5 ? "✓ " : ""}{r.tag}</span>
                  </div>
                ))}
              </Phone>
            </div>
          ) : null}
          {/* logo: entra grande no "ATIVO" e vai para o topo do palco */}
          {logoBig > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: mix(230, 0, logoSmall), display: "flex", justifyContent: "center", zIndex: 30, opacity: Math.min(1, logoBig * 2) * (1 - ctaUp * 0.3) }}>
              <div style={{ padding: mix(26, 0, logoSmall), borderRadius: 30, background: `rgba(7,8,10,${0.85 * (1 - logoSmall)})` }}>
                <Img src={staticFile(BRAND.logo)} style={{ height: mix(130, 64, logoSmall) * mix(1.3, 1, Math.min(1, logoBig)), filter: `drop-shadow(0 0 24px ${brandAlpha(0.6)})` }} />
              </div>
            </div>
          ) : null}
        </div>
        {/* GANCHO: carimbo SEM RESPOSTA + contador de dias, visível já no quadro 0 */}
        {t < c.h_conversa + 0.05 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", transform: `translate(${sx * 0.6}px, ${sy * 0.6 + prog(t, c.h_conversa - 0.15, 0.2, ease.in) * 500}px) rotate(-7deg) scale(${mix(1.25, 1, prog(t, 0, 0.18, ease.out)) * (1 + 0.03 * Math.sin(t * 9))})` }}>
            <div style={{ padding: "16px 40px 20px", borderRadius: 24, border: `8px solid ${C.warn}`, background: "rgba(7,8,10,0.88)", textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(255,107,94,0.35)" }}>
              <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 104, letterSpacing: "-0.04em", lineHeight: 1, color: C.warn }}>SEM RESPOSTA</div>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 50, letterSpacing: "0.08em", color: C.text, marginTop: 6 }}>HÁ {days} {days === 1 ? "DIA" : "DIAS"}</div>
            </div>
          </div>
        ) : null}
        {/* corte seco para o preto antes da solução */}
        {black > 0.01 ? <div style={{ position: "absolute", inset: 0, background: "#000", opacity: black }} /> : null}
      </div>

      {/* ---------------- CTA (fora do palco, acima da faixa do botão da Meta) ---------------- */}
      {btn > 0.001 ? (
        <>
          {[0, 1, 2].map((k) => {
            const u = ((((t - c.cta_clique) * 0.9 + k / 3) % 1) + 1) % 1;
            return <div key={k} style={{ position: "absolute", left: 540 - 270 - u * 90, top: 960 - u * 55, width: 540 + u * 180, height: 120 + u * 110, borderRadius: 999, border: `3px solid ${BRAND.hex}`, opacity: (1 - u) * 0.5 * Math.min(1, btn) }} />;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center", transform: `scale(${mix(2, 1, Math.min(1.06, btn)) * (1 + 0.04 * Math.sin(t * 6))})` }}>
            <div style={{ padding: "26px 60px", borderRadius: 999, background: BRAND.hex, color: BRAND.ink, fontFamily: F.sans, fontWeight: 800, fontSize: 60, letterSpacing: "-0.02em", boxShadow: `0 0 ${50 + 20 * Math.sin(t * 5)}px ${brandAlpha(0.6)}` }}>CLIQUE NO BOTÃO</div>
          </div>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {[0, 1].map((k) => {
              const b = Math.sin(t * 6 - k * 0.8) * 14;
              return <path key={k} d={`M ${500} ${1110 + k * 50 + b} L 540 ${1150 + k * 50 + b} L 580 ${1110 + k * 50 + b}`} fill="none" stroke={BRAND.hex} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={1 - k * 0.4} />;
            })}
          </svg>
        </>
      ) : null}

      {/* flash */}
      {fl > 0.02 ? <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: fl * 0.55 }} /> : null}
    </>
  );
};
