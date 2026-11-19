import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { camAt, CamKey } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { AdKey, buildCuts } from "../../AD-ATIVO-01/scenes/cuts";

/**
 * ANÚNCIO 02 — "Só um minutinho" (padrão de edição de anúncio v2). PALCO recortado (y 270–910) com cortes, zoom de impacto,
 * tremida e flash; a transcrição dinâmica fica no Episode (KText). Tudo ILUSTRATIVO: cliente, imóvel (68 m², R$ 420.000),
 * galeria, PDF e chat são fictícios e genéricos (sem interface de app real); o site é uma maquete sem endereço.
 */
const PH = { x: 280, y: 40, w: 520, h: 680, k: 0.8 };
const TILE = ["#3B4A5C", "#4A3B32", "#3E4F45", "#4B3F58", "#53463A", "#3A4A4F", "#4F4538", "#41504A", "#4C3F48", "#3D4452", "#514A3C", "#3F4B3F"];

const shake = (t: number, hits: number[], amp: number) => hits.reduce((a, h) => (t >= h ? a + amp * Math.exp(-(t - h) * 9) * Math.sin((t - h) * 72) : a), 0);
const flash = (t: number, hits: number[]) => hits.reduce((a, h) => Math.max(a, t >= h ? Math.exp(-(t - h) * 22) : 0), 0);

const House: React.FC<{ size: number; color?: string }> = ({ size, color = "rgba(244,245,247,0.55)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" /></svg>
);

const Bubble: React.FC<{ me?: boolean; children: React.ReactNode; p?: number; size?: number }> = ({ me, children, p = 1, size = 30 }) => (
  <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginTop: 14, opacity: Math.min(1, p * 1.6), transform: `scale(${mix(0.6, 1, Math.min(1.08, p))})`, transformOrigin: me ? "100% 100%" : "0 100%" }}>
    <div style={{ maxWidth: 400, padding: "16px 20px", borderRadius: 24, background: me ? BRAND.deep : C.surface3, fontFamily: F.sans, fontWeight: 700, fontSize: size, lineHeight: 1.22, color: C.text }}>{children}</div>
  </div>
);

export const Edit: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // fases
  const chatOn = t < c.p_foto - 0.05;
  const galOn = t >= c.p_foto - 0.05 && t < c.p_metr - 0.05;
  const pdfOn = t >= c.p_metr - 0.05 && t < c.p_valor - 0.05;
  const searchOn = t >= c.p_valor - 0.05 && t < c.q_esp - 0.05;
  const waitOn = t >= c.q_esp - 0.05 && t < c.a_com - 0.05;
  const ativoOn = t >= c.a_com - 0.05 && t < c.a_apr - 0.05;
  const siteOn = t >= c.a_apr - 0.05 && t < c.a_sem - 0.05;
  const sendOn = t >= c.a_sem - 0.05;

  const cut = (at: number, k: Omit<AdKey, "t" | "cut">): AdKey[] => [{ t: at, ...k, cut: true }];
  const keys: CamKey[] = buildCuts([
    { t: 0, s: 1.85, y: -150, r: -3 },
    { t: c.h_fotos - 0.2, s: 1.75, y: -150, r: -1.5, e: ease.linear },
    ...cut(c.h_fotos, { s: 2.0, x: -60, y: -150, r: 0 }),
    ...cut(c.h_metr, { s: 2.0, x: 50, y: -140, r: 1 }),
    ...cut(c.h_voce, { s: 1.0, x: 0, y: 0, r: 0 }),
    ...cut(c.h_claro, { s: 1.7, x: 70, y: -40, r: 2 }),
    ...cut(c.p_so, { s: 1.0, x: 0, y: 0, r: 0 }),
    ...cut(c.p_busca, { s: 1.25, y: 0, r: -2 }),
    ...cut(c.p_foto, { s: 1.0, r: 0 }),
    { t: c.p_gal - 0.1, s: 1.04, e: ease.linear },
    ...cut(c.p_gal, { s: 1.3, x: 120, y: 40 }),
    ...cut(c.p_metr, { s: 1.0, x: 0, y: 0, r: 3 }),
    ...cut(c.p_pdf + 0.3, { s: 1.45, x: -30, y: 120, r: 0 }),
    ...cut(c.p_valor, { s: 1.0, x: 0, y: 0, r: -3 }),
    ...cut(c.p_wpp, { s: 1.3, y: 90, r: 0 }),
    ...cut(c.q_esp, { s: 1.0, x: 0, y: 0 }),
    ...cut(c.q_cart, { s: 1.2, y: 70 }),
    ...cut(c.q_org, { s: 1.0, y: 0 }),
    ...cut(c.a_com, { s: 1.0 }),
    ...cut(c.a_fotos, { s: 1.35, x: -150, y: 60 }),
    ...cut(c.a_val, { s: 1.35, x: 0, y: 60 }),
    ...cut(c.a_info, { s: 1.35, x: 150, y: 60 }),
    ...cut(c.a_apr, { s: 1.0, x: 0, y: 0, r: -3 }),
    ...cut(c.a_site, { s: 1.08, r: 0 }),
    ...cut(c.a_sem, { s: 1.0 }),
    ...cut(c.a_cel, { s: 1.3, y: 60 }),
    ...cut(c.cta_clique, { s: 0.95, y: 0 }),
    { t: tl.duration, s: 1.0, e: ease.linear },
  ]);
  const cam = camAt(t, keys);
  const pv = camAt(t - 1 / 30, keys);
  const speed = Math.hypot((cam.x - pv.x) * cam.s, (cam.y - pv.y) * cam.s) * 30 + Math.abs(Math.log(cam.s / pv.s)) * 30 * 700;
  const blur = Math.min(10, Math.max(0, (speed - 700) / 300));
  const impacts = [0, c.p_busca + 0.35, c.q_cart + 0.45, c.a_ativo + 0.4, c.cta_clique - 0.15];
  const sx = shake(t, impacts, 14);
  const sy = shake(t + 0.37, impacts, 10);
  const fl = flash(t, [c.p_busca + 0.35, c.a_ativo + 0.4, c.cta_clique - 0.15]);

  // cronômetro: o "minutinho" que vira busca (00:01 → 07:48), congela no "único lugar"
  const runT = prog(t, c.p_so, c.q_unico - c.p_so, (x) => x * x * 0.4 + x * 0.6);
  const secs = Math.round(mix(1, 468, runT));
  const clock = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const clockOn = t >= c.h_min + 0.3 && t < c.q_unico + 0.6;
  const clockBig = 1 - prog(t, c.p_busca + 0.2, 0.35, ease.inOut);
  const clockIn = sp(t, c.h_min + 0.3, { damping: 9, stiffness: 240 });
  const frozen = t >= c.q_unico;

  const hl = (w: number) => prog(t, w - 0.05, 0.15, ease.out);
  const cards3 = [c.q_junt, c.q_junt + 0.25, c.q_junt + 0.5].map((a) => sp(t, a, { damping: 10, stiffness: 200 }));
  const merge = prog(t, c.q_org - 0.1, 0.5, ease.inOut);
  const stampCart = sp(t, c.q_cart + 0.35, { damping: 9, stiffness: 260 });
  const logo = sp(t, c.a_ativo + 0.35, { damping: 11, stiffness: 200 });
  const logoSmall = prog(t, c.a_cad - 0.2, 0.4, ease.inOut);
  const chips = [c.a_fotos, c.a_val, c.a_info].map((a) => sp(t, a - 0.05, { damping: 10, stiffness: 240 }));
  const btn = sp(t, c.cta_clique - 0.15, { damping: 9, stiffness: 240 });

  const Phone: React.FC<{ children: React.ReactNode; glow?: boolean; header: string; sub?: string }> = ({ children, glow, header, sub }) => (
    <div style={{ position: "absolute", left: PH.x, top: PH.y, width: PH.w, height: PH.h, borderRadius: 64, background: "#0B0D10", border: `4px solid ${glow ? BRAND.hex : "rgba(255,255,255,0.2)"}`, boxShadow: `0 40px 100px rgba(0,0,0,0.7)${glow ? `, 0 0 50px ${brandAlpha(0.35)}` : ""}`, transform: `scale(${PH.k}) rotate(${Math.sin(t * 1.3) * 1.2}deg) translateY(${Math.sin(t * 1.9) * 8}px)`, transformOrigin: "50% 0" }}>
      <div style={{ position: "absolute", left: 16, top: 16, right: 16, bottom: 16, borderRadius: 50, overflow: "hidden", background: C.bg1 }}>
        <div style={{ height: 92, display: "flex", alignItems: "center", gap: 14, padding: "0 22px", background: C.surface2, fontFamily: F.sans }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: "#5A6E8C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: C.text }}>{header[0]}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 30, color: C.text }}>{header}</div>
            {sub ? <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{sub}</div> : null}
          </div>
        </div>
        <div style={{ padding: "6px 20px" }}>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 270, height: 640, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "540px 320px", transform: `translate(${-cam.x * cam.s + sx}px, ${-cam.y * cam.s + sy}px) scale(${cam.s}) rotate(${cam.r}deg)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
          {/* GANCHO: o pedido do cliente e o "só um minutinho" */}
          {chatOn ? (
            <Phone header="Cliente" sub="online">
              <Bubble size={32}>
                Me manda as <span style={{ color: hl(c.h_fotos) > 0.5 ? BRAND.hex : C.text, textDecoration: hl(c.h_fotos) > 0.5 ? "underline" : "none" }}>fotos</span> e a <span style={{ color: hl(c.h_metr) > 0.5 ? BRAND.hex : C.text, textDecoration: hl(c.h_metr) > 0.5 ? "underline" : "none" }}>metragem</span> daquele apartamento?
              </Bubble>
              <Bubble me p={sp(t, c.h_claro - 0.1, { damping: 11, stiffness: 220 })} size={32}>
                Claro! Só um minutinho...
              </Bubble>
              {t > c.h_voce && t < c.h_claro - 0.1 ? (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
                  {[0, 1, 2].map((k) => <span key={k} style={{ width: 14, height: 14, borderRadius: 7, background: C.muted, opacity: Math.floor(t * 8) % 3 === k ? 1 : 0.35 }} />)}
                </div>
              ) : null}
            </Phone>
          ) : null}

          {/* PROBLEMA 1: a galeria */}
          {galOn ? (
            <Phone header="Galeria" sub="2.847 fotos">
              <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
                {Array.from({ length: 36 }).map((_, k) => {
                  const col = k % 3;
                  const row = Math.floor(k / 3);
                  const scroll = (t - c.p_foto) * 900 * (1 - prog(t, c.p_gal, 0.3, ease.out)) + prog(t, c.p_gal, 0.3, ease.out) * 600;
                  const y = row * 150 - (scroll % 1800);
                  const hit = k === 16 && t > c.p_gal;
                  return (
                    <div key={k} style={{ position: "absolute", left: col * 150, top: y, width: 140, height: 140, borderRadius: 14, background: TILE[k % TILE.length], display: "flex", alignItems: "center", justifyContent: "center", border: hit ? `5px solid ${BRAND.hex}` : "none" }}>
                      <House size={60} />
                    </div>
                  );
                })}
              </div>
            </Phone>
          ) : null}

          {/* PROBLEMA 2: o PDF da construtora */}
          {pdfOn ? (
            <div style={{ position: "absolute", left: 250, top: 40, width: 580, height: 760, borderRadius: 14, background: C.paper, boxShadow: "0 40px 100px rgba(0,0,0,0.7)", padding: "36px 40px", transform: `rotate(${-2 + Math.sin(t * 1.4) * 1}deg) scale(0.8)`, transformOrigin: "50% 0", fontFamily: F.sans, color: C.ink }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 30 }}>MEMORIAL DESCRITIVO</span>
                <span style={{ padding: "4px 10px", borderRadius: 6, background: "#C9473B", color: "#fff", fontWeight: 800, fontSize: 24 }}>PDF</span>
              </div>
              {Array.from({ length: 9 }).map((_, k) => (
                <div key={k} style={{ marginTop: 22, height: 14, borderRadius: 7, background: "rgba(20,22,26,0.18)", width: `${70 + rnd(k * 2.1) * 30}%` }} />
              ))}
              <div style={{ marginTop: 34, padding: "16px 18px", borderRadius: 10, background: hl(c.p_pdf + 0.4) > 0.5 ? "rgba(58,245,132,0.35)" : "rgba(20,22,26,0.06)", fontWeight: 800, fontSize: 34 }}>Área privativa: 68 m²</div>
              {Array.from({ length: 4 }).map((_, k) => (
                <div key={k} style={{ marginTop: 22, height: 14, borderRadius: 7, background: "rgba(20,22,26,0.18)", width: `${60 + rnd(k * 5.3) * 35}%` }} />
              ))}
              <div style={{ position: "absolute", right: 24, bottom: 20, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#676C75" }}>pág. 14 de 38</div>
            </div>
          ) : null}

          {/* PROBLEMA 3: o valor perdido nas conversas */}
          {searchOn ? (
            <Phone header="Conversas" sub="buscar: “valor”">
              <div style={{ position: "relative", height: 520, overflow: "hidden", fontFamily: F.sans }}>
                {Array.from({ length: 18 }).map((_, k) => {
                  const y = k * 96 - ((t - c.p_valor) * 760) % 1300;
                  return (
                    <div key={k} style={{ position: "absolute", left: 0, right: 0, top: y, height: 90, display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${C.lineSoft}` }}>
                      <div style={{ width: 50, height: 50, borderRadius: 25, background: TILE[(k + 3) % TILE.length] }} />
                      <div>
                        <div style={{ width: 120 + rnd(k) * 120, height: 16, borderRadius: 8, background: "rgba(244,245,247,0.35)" }} />
                        <div style={{ marginTop: 10, width: 180 + rnd(k * 3) * 120, height: 12, borderRadius: 6, background: "rgba(244,245,247,0.15)" }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ position: "absolute", left: 40, right: 40, top: 200, padding: "18px 0", textAlign: "center", borderRadius: 20, background: "rgba(255,107,94,0.16)", border: `3px solid ${C.warn}`, fontWeight: 800, fontSize: 52, color: C.warn, opacity: prog(t, c.p_conv, 0.2, ease.out), transform: `scale(${1 + 0.05 * Math.sin(t * 9)})` }}>R$ ???</div>
              </div>
            </Phone>
          ) : null}

          {/* PERCEPÇÃO: o cliente espera; as peças tentam se juntar → um único lugar */}
          {waitOn ? (
            <>
              <div style={{ position: "absolute", left: 60, top: 30, display: "flex", alignItems: "center", gap: 16, opacity: prog(t, c.q_esp - 0.05, 0.2, ease.out) * (1 - merge * 0.6) }}>
                <div style={{ width: 90, height: 90, borderRadius: 45, background: "#5A6E8C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 40, color: C.text }}>C</div>
                <div style={{ padding: "14px 20px", borderRadius: 22, background: C.surface3, fontFamily: F.sans, fontWeight: 700, fontSize: 32, color: C.text, transform: `scale(${1 + 0.05 * Math.sin(t * 6)})` }}>Oi? Conseguiu?</div>
              </div>
              {[
                { k: "FOTO", v: <House size={70} color={C.text} />, x0: 70, y0: 220, r: -10 },
                { k: "METRAGEM", v: "68 m²", x0: 400, y0: 380, r: 8 },
                { k: "VALOR", v: "R$ 420.000", x0: 720, y0: 210, r: -6 },
              ].map((cd, i) => {
                const a = cards3[i];
                const bump = Math.sin((t - c.q_junt) * 14 + i) * 10 * (1 - merge) * (t > c.q_junt + 0.8 ? 1 : 0);
                const x = mix(cd.x0, 380, merge) + bump;
                const y = mix(cd.y0, 250, merge);
                return (
                  <div key={cd.k} style={{ position: "absolute", left: x, top: y + (1 - Math.min(1, a)) * 400, width: 300, height: 190, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `3px solid ${merge > 0.6 ? BRAND.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transform: `rotate(${mix(cd.r, 0, merge)}deg) scale(${mix(1, 0.9, merge)})`, opacity: Math.min(1, a * 1.6) * (1 - prog(t, c.q_unico - 0.05, 0.2, ease.in)), boxShadow: "0 24px 60px rgba(0,0,0,0.55)", fontFamily: F.sans }}>
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>{cd.k}</span>
                    <span style={{ fontWeight: 800, fontSize: 44, color: C.text }}>{cd.v}</span>
                  </div>
                );
              })}
              {stampCart > 0.01 && merge < 0.9 ? (
                <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", transform: `rotate(-6deg) scale(${mix(2, 1, Math.min(1.05, stampCart))})`, opacity: Math.min(1, stampCart * 2) * (1 - merge) }}>
                  <div style={{ padding: "10px 28px", borderRadius: 16, border: `6px solid ${C.warn}`, background: "rgba(7,8,10,0.85)", fontFamily: F.sans, fontWeight: 800, fontSize: 60, color: C.warn }}>JÁ É DA SUA CARTEIRA</div>
                </div>
              ) : null}
              {/* a ficha única */}
              {t >= c.q_unico - 0.05 ? (
                <div style={{ position: "absolute", left: 240, top: 150, width: 600, padding: 24, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `4px solid ${BRAND.hex}`, boxShadow: `0 0 60px ${brandAlpha(0.35)}`, transform: `scale(${mix(1.3, 1, prog(t, c.q_unico - 0.05, 0.2, ease.out))})`, fontFamily: F.sans, display: "flex", gap: 22, alignItems: "center" }}>
                  <div style={{ width: 170, height: 170, borderRadius: 20, background: TILE[2], display: "flex", alignItems: "center", justifyContent: "center" }}><House size={90} color={C.text} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 38, color: C.text }}>Apto 2 quartos</div>
                    <div style={{ fontWeight: 800, fontSize: 34, color: BRAND.hex, marginTop: 6 }}>68 m² · R$ 420.000</div>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginTop: 8 }}>ILUSTRATIVO</div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {/* ATIVO: imóveis cadastrados com fotos, valores e informações */}
          {ativoOn ? (
            <div style={{ position: "absolute", left: 90, top: 150, width: 900, transform: `translateY(${(1 - prog(t, c.a_com - 0.05, 0.3, ease.out)) * 500}px)` }}>
              {[0, 1, 2].map((k) => {
                const a = sp(t, c.a_cad + k * 0.12, { damping: 12, stiffness: 210 });
                return (
                  <div key={k} style={{ position: "absolute", left: k * 300, top: 0, width: 280, borderRadius: 26, overflow: "hidden", background: C.surface, border: `3px solid ${k === 0 ? BRAND.hex : C.line}`, opacity: Math.min(1, a * 1.6), transform: `translateY(${(1 - Math.min(1, a)) * 200}px)`, fontFamily: F.sans }}>
                    <div style={{ height: 170, background: TILE[k + 2], display: "flex", alignItems: "center", justifyContent: "center" }}><House size={80} color={C.text} /></div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{["Apto 2 quartos", "Casa 3 quartos", "Sobrado"][k]}</div>
                      <div style={{ fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 4 }}>{["68 m² · R$ 420.000", "120 m² · R$ 690.000", "95 m² · R$ 530.000"][k]}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 16 }}>
                {["FOTOS", "VALORES", "INFORMAÇÕES"].map((k, i) => (
                  <div key={k} style={{ padding: "12px 22px", borderRadius: 999, background: chips[i] > 0.5 ? BRAND.hex : C.surface3, color: chips[i] > 0.5 ? BRAND.ink : C.muted, fontFamily: F.mono, fontWeight: 700, fontSize: 30, transform: `scale(${mix(0.5, 1, Math.min(1.1, chips[i] + 0.4))})` }}>{chips[i] > 0.5 ? "✓ " : ""}{k}</div>
                ))}
              </div>
              <div style={{ position: "absolute", right: 0, top: 380, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>ILUSTRATIVO</div>
            </div>
          ) : null}

          {/* SITE PRÓPRIO (maquete, sem endereço) */}
          {siteOn ? (
            <div style={{ position: "absolute", left: 110, top: 40, width: 860, height: 560, borderRadius: 26, overflow: "hidden", background: "#F4F5F7", boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 50px ${brandAlpha(0.3)}`, border: `4px solid ${BRAND.hex}`, transform: `translateY(${(1 - prog(t, c.a_apr - 0.05, 0.3, ease.out)) * 500}px) rotate(${Math.sin(t * 1.2) * 0.8}deg)`, fontFamily: F.sans }}>
              <div style={{ height: 50, background: "#E3E5E9", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
                {[0, 1, 2].map((k) => <span key={k} style={{ width: 14, height: 14, borderRadius: 7, background: "#C4C8CF" }} />)}
                <span style={{ marginLeft: 16, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: "#676C75" }}>seu site · ilustrativo</span>
              </div>
              <div style={{ padding: "26px 30px", background: "#14161A", color: "#F4F5F7" }}>
                <div style={{ fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em" }}>Encontre seu imóvel</div>
                <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
                  {["Cidade", "Tipo", "Quartos"].map((k) => <span key={k} style={{ padding: "10px 18px", borderRadius: 12, background: "#262B33", fontWeight: 700, fontSize: 24 }}>{k}</span>)}
                  <span style={{ padding: "10px 18px", borderRadius: 12, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 24 }}>Buscar</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 18, padding: "22px 30px" }}>
                {[0, 1, 2].map((k) => (
                  <div key={k} style={{ flex: 1, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.12)", transform: `translateY(${(1 - prog(t, c.a_site + k * 0.1, 0.3, ease.out)) * 120}px)` }}>
                    <div style={{ height: 120, background: TILE[k + 2], display: "flex", alignItems: "center", justifyContent: "center" }}><House size={56} color="#F4F5F7" /></div>
                    <div style={{ padding: "10px 12px", fontWeight: 800, fontSize: 24, color: "#14161A" }}>{["68 m²", "120 m²", "95 m²"][k]}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* sem procurar pelo celular: envia o link do site */}
          {sendOn ? (
            <Phone header="Cliente" sub="online" glow>
              <Bubble size={30}>Me manda as fotos e a metragem daquele apartamento?</Bubble>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14, transform: `scale(${mix(0.6, 1, Math.min(1.06, sp(t, c.a_sem, { damping: 11, stiffness: 220 })))})`, transformOrigin: "100% 100%" }}>
                <div style={{ width: 360, borderRadius: 22, overflow: "hidden", background: BRAND.deep, border: `2px solid ${brandAlpha(0.5)}`, fontFamily: F.sans }}>
                  <div style={{ height: 120, background: TILE[2], display: "flex", alignItems: "center", justifyContent: "center" }}><House size={64} color={C.text} /></div>
                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>Apto 2 quartos</div>
                    <div style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>fotos · 68 m² · valor</div>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: BRAND.hex, marginTop: 6 }}>✓✓ enviado</div>
                  </div>
                </div>
              </div>
              <Bubble p={sp(t, c.a_cel + 0.3, { damping: 11, stiffness: 220 })} size={30}>Perfeito, obrigada!</Bubble>
            </Phone>
          ) : null}

          {/* logo */}
          {logo > 0.001 && t < c.a_apr ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: mix(230, 20, logoSmall), display: "flex", justifyContent: "center", zIndex: 30, opacity: Math.min(1, logo * 2) }}>
              <div style={{ padding: mix(24, 0, logoSmall), borderRadius: 28, background: `rgba(7,8,10,${0.85 * (1 - logoSmall)})` }}>
                <Img src={staticFile(BRAND.logo)} style={{ height: mix(130, 70, logoSmall) * mix(1.3, 1, Math.min(1, logo)), filter: `drop-shadow(0 0 24px ${brandAlpha(0.6)})` }} />
              </div>
            </div>
          ) : null}
        </div>

        {/* cronômetro (fixo no palco): do "minutinho" à busca */}
        {clockOn ? (
          <div style={{ position: "absolute", left: mix(800, 540 - 230, clockBig), top: mix(18, 170, clockBig), width: mix(250, 460, clockBig), padding: mix(10, 22, clockBig), boxSizing: "border-box", borderRadius: 26, background: "rgba(7,8,10,0.9)", border: `${mix(4, 7, clockBig)}px solid ${frozen ? BRAND.hex : C.warn}`, textAlign: "center", transform: `translate(${sx * 0.5}px, ${sy * 0.5}px) scale(${mix(0.3, 1, Math.min(1.08, clockIn))})`, boxShadow: `0 20px 60px rgba(0,0,0,0.7)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: mix(24, 34, clockBig), letterSpacing: "0.1em", color: C.muted }}>{frozen ? "ENCONTRADO" : "PROCURANDO…"}</div>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: mix(58, 120, clockBig), color: frozen ? BRAND.hex : C.warn, lineHeight: 1.05 }}>{clock}</div>
          </div>
        ) : null}
      </div>

      {/* CTA (fora do palco) */}
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
              return <path key={k} d={`M 500 ${1110 + k * 50 + b} L 540 ${1150 + k * 50 + b} L 580 ${1110 + k * 50 + b}`} fill="none" stroke={BRAND.hex} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={1 - k * 0.4} />;
            })}
          </svg>
        </>
      ) : null}
      {fl > 0.02 ? <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: fl * 0.55 }} /> : null}
    </>
  );
};
