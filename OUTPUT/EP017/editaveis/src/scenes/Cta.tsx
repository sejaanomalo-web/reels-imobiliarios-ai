import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, IconHome } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconChat, IconLens, IconPlane, IconUser, LEAD, Mark, Tag } from "./ui";

/**
 * CENA 05 — CTA DE COMENTÁRIO.
 * "Essas pistas só ajudam se ficarem registradas na jornada de cada cliente." → jornada da cliente (ILUSTRATIVA): visitas, pistas, próxima indicação.
 * "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos?" → a jornada vira um dos três módulos.
 * "Comente SISTEMA que eu te envio os detalhes pelo Direct." → campo de comentário genérico (sem perfil, sem usuário) digitando SISTEMA;
 * a palavra sobe e vira o fecho: COMENTE "SISTEMA" · Receba os detalhes no Direct. (mesmo fecho do EP016)
 */
const CARD = { x: 110, y: 300, w: 860, h: 860 };
const KEYWORD = "SISTEMA";

const wordAt = (tl: SceneProps["tl"], seg: string, re: RegExp, fallback: number) => {
  for (const k of tl.captions) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
  return fallback;
};

const STEPS = [
  { title: "Visita 1", clue: "pista: rua tranquila" },
  { title: "Visita 2", clue: "pista: mais espaço" },
  { title: "Próxima indicação", clue: "planta parecida · rua tranquila · mais espaço" },
];

export const Cta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const tImoveis = wordAt(tl, "s9", /im[óo]veis/i, c.cta_tiles);
  const tLeads = wordAt(tl, "s9", /leads/i, c.cta_tiles + 0.5);
  const tAtend = wordAt(tl, "s9", /atendimentos/i, c.cta_tiles + 1);

  const enter = sp(t, c.cta_journey, { damping: 16, stiffness: 130 });
  const hist = [0.3, 0.75, 1.2].map((d) => sp(t, c.cta_journey + d, { damping: 15, stiffness: 170 }));
  const fold = prog(t, c.cta_sys - 0.1, 0.75, ease.inOut);
  const label = sp(t, c.cta_sys + 0.6, { damping: 15, stiffness: 150 });
  const tiles = [tImoveis, tLeads, tAtend].map((s) => sp(t, s - 0.08, { damping: 12, stiffness: 190 }));
  const tilesUp = prog(t, c.cta_comment - 0.15, 0.6, ease.inOut);
  const box = sp(t, c.cta_comment - 0.05, { damping: 15, stiffness: 150 });
  const typed = Math.round(prog(t, c.cta_word - 0.05, 0.5, ease.linear) * KEYWORD.length);
  const press = Math.sin(Math.PI * prog(t, c.cta_word + 0.55, 0.22, ease.linear));
  const fly = prog(t, c.cta_word + 0.68, 0.6, ease.inOut);
  const head = sp(t, c.cta_word + 0.62, { damping: 14, stiffness: 160 });
  const direct = sp(t, c.cta_direct - 0.15, { damping: 14, stiffness: 160 });
  const plane = prog(t, c.cta_direct - 0.1, 0.9, ease.inOut);
  const glow = 0.5 + 0.5 * Math.sin((t - c.cta_end) * 3);
  const caret = Math.floor(t * 2.5) % 2 === 0;

  // ficha → um dos módulos (o card "LEADS" do meio)
  const cardS = mix(1, 0.31, fold);
  const tileY = mix(560, 300, tilesUp);
  const cardX = mix(CARD.x, 540 - 140, fold);
  const cardY = mix(CARD.y, tileY, fold);

  const TILE = [
    { name: "IMÓVEIS", x: 90, icon: <IconHome size={64} color={C.accent} stroke={2} /> },
    { name: "LEADS", x: 400, icon: <IconUser size={64} /> },
    { name: "ATENDIMENTOS", x: 710, icon: <IconChat size={64} /> },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.cta_journey, s: 0.95, y: 40 },
          { t: c.cta_reg + 0.4, s: 1.03, y: 60, e: ease.inOut },
          { t: c.cta_sys + 0.3, s: 0.96, y: 40, e: ease.inOut },
          { t: c.cta_comment - 0.1, s: 1.1, y: 120, e: ease.inOut },
          { t: c.cta_comment + 0.6, s: 1.0, y: 0, e: ease.inOut },
          { t: c.cta_word + 1.2, s: 1.02, y: -70, e: ease.inOut },
          { t: tl.duration, s: 1.06, y: -80, e: ease.linear },
        ]}
      >
        {/* módulos do sistema */}
        {TILE.map((k, i) => {
          if (i === 1) return null;
          const p = tiles[i];
          const out = prog(t, c.cta_word + 0.4, 0.5, ease.in);
          return (
            <div key={k.name} style={{ position: "absolute", left: k.x, top: tileY, width: 280, height: 260, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `1px solid ${C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, opacity: Math.min(1, p * 1.5) * (1 - out) * mix(1, 0.8, tilesUp), transform: `translateY(${(1 - Math.min(1, p)) * 80 + Math.sin(t * 2.2 + i * 2) * 7}px) scale(${mix(0.7, 1, Math.min(1, p))})`, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
              {k.icon}
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: i === 2 ? 25 : 30, letterSpacing: "0.06em", color: C.text }}>{k.name}</span>
            </div>
          );
        })}

        {/* ficha do cliente (vira o módulo LEADS) */}
        {(() => {
          const out = prog(t, c.cta_word + 0.4, 0.5, ease.in);
          const lit = Math.min(1, tiles[1]);
          return (
            <div style={{ position: "absolute", left: cardX, top: cardY, width: CARD.w, height: CARD.h, transformOrigin: "0 0", transform: `translateY(${(1 - enter) * 120}px) scale(${cardS})`, opacity: Math.min(1, enter * 1.5) * (1 - out) * mix(1, 0.8, tilesUp) }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: mix(44, 110, fold), background: C.surface, border: `${mix(1, 3, fold)}px solid ${fold > 0.5 && lit > 0.5 ? "rgba(53,224,161,0.5)" : C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", overflow: "hidden" }}>
                <div style={{ opacity: 1 - prog(fold, 0.2, 0.5, ease.linear) }}>
                  <div style={{ height: 150, display: "flex", alignItems: "center", gap: 24, padding: "0 36px", background: C.surface2, borderBottom: `1px solid ${C.lineSoft}` }}>
                    <Avatar size={92} label={LEAD.ini} bg={LEAD.bg} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 44, color: C.text }}>{LEAD.name}</div>
                      <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>jornada da cliente</div>
                    </div>
                    <Tag text="INTERFACE ILUSTRATIVA" tone="muted" size={18} />
                  </div>
                  <div style={{ padding: "40px 44px", position: "relative" }}>
                    <div style={{ position: "absolute", left: 69, top: 70, width: 4, height: 2 * 190 * Math.min(1, hist[2]), background: C.surface3 }} />
                    {STEPS.map((st, i) => {
                      const p = Math.min(1, hist[i]);
                      const last = i === 2;
                      const r = sp(t, c.cta_reg + i * 0.18, { damping: 12, stiffness: 200 });
                      return (
                        <div key={st.title} style={{ position: "relative", height: 190, display: "flex", gap: 30, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * 50}px)` }}>
                          <div style={{ width: 54, height: 54, borderRadius: 27, flexShrink: 0, background: last ? C.accent : C.surface3, border: `3px solid ${last ? C.accent : C.dim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {last ? <IconLens size={30} color={C.accentInk} /> : null}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: 40, color: last ? C.accent : C.text }}>{st.title}</div>
                            <div style={{ fontWeight: 700, fontSize: 30, color: C.muted, marginTop: 8 }}>{st.clue}</div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 12, opacity: Math.min(1, r * 1.5), transform: `scale(${0.6 + 0.4 * Math.min(1.08, r)})`, transformOrigin: "0 50%" }}>
                              <Mark ok size={34} />
                              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", color: C.accent }}>REGISTRADO</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* a ficha dobrada vira o módulo LEADS */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 70, opacity: prog(fold, 0.55, 0.45, ease.out) }}>
                <IconUser size={206} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 97, letterSpacing: "0.06em", color: C.text }}>LEADS</span>
              </div>
            </div>
          );
        })()}

        {/* rótulo do produto (sem nome inventado) */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.12em", color: C.accent, opacity: Math.min(1, label * 1.5) * (1 - tilesUp), transform: `translateY(${(1 - Math.min(1, label)) * 20}px)` }}>
          SISTEMA IMOBILIÁRIO
          <br />
          PERSONALIZADO
        </div>

        {/* campo de comentário genérico — sem perfil, sem usuário, sem curtidas */}
        <div style={{ position: "absolute", left: 110, right: 110, top: mix(1260, 960, Math.min(1, box)), height: 120, boxSizing: "border-box", borderRadius: 60, background: C.surface2, border: `2px solid ${typed > 0 ? "rgba(53,224,161,0.55)" : C.line}`, display: "flex", alignItems: "center", gap: 18, padding: "0 20px 0 40px", opacity: Math.min(1, box * 1.5) * mix(1, 0.55, prog(t, c.cta_direct, 0.5, ease.out)), boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <div style={{ flex: 1, fontWeight: 800, fontSize: 46, letterSpacing: "0.02em", color: C.text, display: "flex", alignItems: "center" }}>
            {fly < 0.05 && typed > 0 ? (
              <>
                {KEYWORD.slice(0, typed)}
                <span style={{ width: 4, height: 50, marginLeft: 4, background: C.accent, opacity: caret ? 1 : 0 }} />
              </>
            ) : (
              <span style={{ fontWeight: 600, fontSize: 36, color: C.dim }}>{fly > 0.05 ? "Comentário enviado ✓" : "Adicione um comentário…"}</span>
            )}
          </div>
          <div style={{ width: 84, height: 84, borderRadius: 42, background: typed >= KEYWORD.length ? C.accent : C.surface3, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - 0.12 * press})` }}>
            <IconPlane size={44} color={typed >= KEYWORD.length ? C.accentInk : C.muted} />
          </div>
        </div>

        {/* fecho */}
        {head > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center", fontWeight: 800, fontSize: 118, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, head * 1.6), transform: `translateY(${(1 - Math.min(1, head)) * 40}px)` }}>
            COMENTE
          </div>
        ) : null}
        {fly >= 1
          ? [0, 1].map((k) => {
              const r = (((t - c.cta_word - 1.3) + k * 0.9) % 1.8 + 1.8) % 1.8 / 1.8;
              return <div key={k} style={{ position: "absolute", left: 250 - r * 70, top: 600 - r * 70, width: 580 + r * 140, height: 190 + r * 140, borderRadius: 60 + r * 70, border: `3px solid ${C.accent}`, opacity: (1 - r) * 0.4 }} />;
            })
          : null}
        {fly > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: mix(980, 600, fly), display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "20px 56px", borderRadius: 40, background: `rgba(53,224,161,${fly})`, color: fly > 0.5 ? C.accentInk : C.text, fontWeight: 800, fontSize: mix(46, 132, fly), letterSpacing: "-0.02em", boxShadow: `0 30px 90px rgba(53,224,161,${0.3 * fly * (0.7 + 0.3 * glow)})` }}>
              “{KEYWORD}”
            </div>
          </div>
        ) : null}
        {direct > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: Math.min(1, direct * 1.5), transform: `translateY(${(1 - Math.min(1, direct)) * 30}px)` }}>
            <div style={{ transform: `translate(${mix(-120, 0, plane)}px, ${Math.sin(plane * Math.PI) * -40}px) rotate(${mix(-20, 0, plane)}deg)` }}>
              <IconPlane size={64} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 52, letterSpacing: "-0.02em", color: C.text }}>
              Receba os detalhes no <span style={{ color: C.accent }}>Direct</span>.
            </span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
