import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import type { SceneProps } from "../../types";
import { AppWindow, Cam, NEON } from "../kit";

/**
 * CENA 05 — DEMONSTRAÇÃO DE VALOR (53–67 s). Interfaces ILUSTRATIVAS (não há telas reais do sistema no repositório).
 * Uma única janela; o conteúdo troca na horizontal a cada funcionalidade dita:
 * GESTÃO DE IMÓVEIS → CRM DE CLIENTES → LEADS DAS CAMPANHAS → ASSISTENTE COM IA. Dados fictícios.
 */
const WX = 110;
const WY = 50;
const WW = 1700;
const WH = 740;
const CW = WW - 230;

const Chip: React.FC<{ text: string; tone: "ok" | "warm" | "cold" | "muted" }> = ({ text, tone }) => {
  const p = { ok: [NEON, "rgba(53,224,161,0.14)"], warm: ["#E8B86A", "rgba(232,184,106,0.14)"], cold: [C.cold, "rgba(143,180,227,0.14)"], muted: [C.muted, "rgba(255,255,255,0.06)"] }[tone];
  return <span style={{ padding: "5px 14px", borderRadius: 14, background: p[1], color: p[0], fontFamily: F.mono, fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{text}</span>;
};

const Av: React.FC<{ s: string; bg: string; size?: number }> = ({ s, bg, size = 46 }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, color: C.text, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.4, flexShrink: 0 }}>{s}</div>
);

const PROPS = [
  { n: "Apto 2 quartos", b: "Centro", st: "Disponível", tone: "ok" as const },
  { n: "Casa 3 quartos", b: "Jardim", st: "Em negociação", tone: "warm" as const },
  { n: "Cobertura", b: "Vila Nova", st: "Disponível", tone: "ok" as const },
  { n: "Sala comercial", b: "Centro", st: "Reservado", tone: "cold" as const },
  { n: "Apto 3 quartos", b: "Lago", st: "Disponível", tone: "ok" as const },
  { n: "Terreno", b: "Alto", st: "Atualizar fotos", tone: "muted" as const },
];

export const S5Value: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const T = [c.f_imo, c.f_crm, c.f_lead, c.f_ia];
  const pos = T.reduce((acc, s, i) => (i === 0 ? 0 : acc + prog(t, s - 0.35, 0.5, ease.inOut)), 0); // 0..3
  const active = Math.round(pos);
  const win = sp(t, c.f_imo + 0.25, { damping: 16, stiffness: 130 });
  const out = prog(t, c.c_na - 0.25, 0.5, ease.in);
  const slide = (i: number) => (i - pos) * (CW + 80);

  // M1
  const hiProp = prog(t, c.f_imo + 1.1, 0.4, ease.out);
  // M2
  const hiPaula = prog(t, c.f_crm + 0.9, 0.4, ease.out);
  const move = prog(t, c.f_neg - 0.1, 0.7, ease.inOut);
  // M3
  const camp = prog(t, c.f_lead - 0.1, 0.4, ease.out);
  const travel = prog(t, c.f_lead + 0.6, 1.3, ease.inOut);
  // M4
  const Q = "Quais follow-ups precisam de atenção?";
  const typed = Math.round(prog(t, c.f_ia + 0.25, 1.5, ease.linear) * Q.length);
  const sent = prog(t, c.f_ia + 1.85, 0.3, ease.out);
  const ans = [0, 1, 2, 3].map((i) => prog(t, c.f_ia + 2.3 + i * 0.32, 0.35, ease.out));
  const caret = Math.floor(t * 2.6) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Cam
        t={t}
        drift={0.6}
        keys={[
          { t: c.f_imo, s: 1.0, x: 0, y: 0 },
          { t: c.f_imo + 1.6, s: 1.08, x: 120, y: 30, e: ease.inOut },
          { t: c.f_crm, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.f_crm + 1.3, s: 1.1, x: 260, y: 40, e: ease.inOut },
          { t: c.f_lead, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.f_lead + 1.4, s: 1.06, x: 40, y: 10, e: ease.inOut },
          { t: c.f_ia, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.f_ia + 2.2, s: 1.1, x: 60, y: 60, e: ease.inOut },
          { t: c.c_na, s: 1.02, x: 0, y: 0, e: ease.inOut },
        ]}
      >
        <AppWindow x={WX} y={WY} w={WW} h={WH} title={["Carteira de imóveis", "Clientes e negociações", "Leads das campanhas", "Assistente com IA"][active]} active={active} style={{ opacity: Math.min(1, win * 1.5), transform: `scale(${mix(0.9, 1, Math.min(1, win))})` }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {/* M1 — imóveis */}
            <div style={{ position: "absolute", left: slide(0), top: 0, width: CW, height: WH - 86, padding: 30, boxSizing: "border-box", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
              {PROPS.map((p, i) => {
                const hi = i === 1 ? hiProp : 0;
                const a = prog(t, c.f_imo - 0.2 + i * 0.07, 0.35, ease.out);
                return (
                  <div key={p.n} style={{ borderRadius: 20, overflow: "hidden", background: "#121A17", border: `2px solid ${hi > 0.5 ? NEON : "rgba(255,255,255,0.08)"}`, opacity: a * (i !== 1 ? mix(1, 0.45, hiProp) : 1), transform: `translateY(${(1 - a) * 30}px) scale(${1 + hi * 0.05})`, boxShadow: hi > 0.5 ? "0 0 40px rgba(53,224,161,0.3)" : "none" }}>
                    <div style={{ height: 150, background: "linear-gradient(180deg,#1E2A26,#141C19)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      <House w={170} h={140} />
                    </div>
                    <div style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{p.n} <span style={{ fontWeight: 600, fontSize: 26, color: C.muted }}>· {p.b}</span></div>
                      <div style={{ height: 8 }} />
                      <Chip text={p.st} tone={p.tone} />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* M2 — CRM (kanban) */}
            <div style={{ position: "absolute", left: slide(1), top: 0, width: CW, height: WH - 86, padding: 26, boxSizing: "border-box", display: "flex", gap: 16 }}>
              {["NOVO CONTATO", "EM ATENDIMENTO", "VISITA", "PROPOSTA"].map((col, ci) => (
                <div key={col} style={{ flex: 1, borderRadius: 18, background: "#0F1714", border: "1px solid rgba(255,255,255,0.06)", padding: 14 }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.08em", color: C.muted, marginBottom: 14 }}>{col}</div>
                  {ci === 0 ? <CrmCard name="Júlia" note="Primeiro contato" bg="#5A6E8C" /> : null}
                  {ci === 1 ? <CrmCard name="Paula" note="Retornar hoje" bg="#8C6A4E" tone="warm" hi={hiPaula} /> : null}
                  {ci === 1 && move < 0.5 ? <div style={{ transform: `translateX(${move * 2 * 340}px)`, opacity: 1 - move }}><CrmCard name="Carlos" note="Agendar visita" bg="#4E6A8C" /></div> : null}
                  {ci === 2 && move >= 0.5 ? <div style={{ transform: `translateX(${(1 - move) * -340}px)` }}><CrmCard name="Carlos" note="Visita — 14:30" bg="#4E6A8C" tone="cold" /></div> : null}
                  {ci === 3 ? <CrmCard name="Mariana" note="Proposta enviada" bg="#6A5A8C" tone="ok" /> : null}
                </div>
              ))}
              {/* ficha da Paula */}
              <div style={{ position: "absolute", right: 26, top: 230, width: 460, borderRadius: 22, background: "#16201C", border: "2px solid rgba(232,184,106,0.6)", padding: 24, boxShadow: "0 30px 70px rgba(0,0,0,0.6)", opacity: hiPaula, transform: `translateX(${(1 - hiPaula) * 80}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Av s="P" bg="#8C6A4E" size={56} />
                  <div style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Paula</div>
                </div>
                {[
                  ["Histórico", "3 contatos registrados"],
                  ["Etapa", "Em atendimento"],
                  ["Próximo passo", "Retornar hoje"],
                ].map(([a, b]) => (
                  <div key={a} style={{ marginTop: 16 }}>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em", color: C.muted }}>{a.toUpperCase()}</div>
                    <div style={{ fontWeight: 700, fontSize: 26, color: a === "Próximo passo" ? "#E8B86A" : C.text }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* M3 — campanhas → lead → CRM */}
            <div style={{ position: "absolute", left: slide(2), top: 0, width: CW, height: WH - 86 }}>
              <div style={{ position: "absolute", left: 60, top: 150, width: 320, borderRadius: 22, background: "#121A17", border: "2px solid rgba(255,255,255,0.1)", overflow: "hidden", opacity: camp, transform: `translateY(${(1 - camp) * 30}px)` }}>
                <div style={{ height: 150, background: "linear-gradient(180deg,#1E2A26,#141C19)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <House w={160} h={140} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: NEON, letterSpacing: "0.08em" }}>CAMPANHA</div>
                  <div style={{ fontWeight: 800, fontSize: 28, color: C.text }}>Casa 3 quartos</div>
                  <div style={{ marginTop: 10 }}><Chip text="Ativa" tone="ok" /></div>
                </div>
              </div>
              <svg width={CW} height={WH - 86} style={{ position: "absolute", inset: 0 }}>
                <path d="M 380 300 C 600 300, 640 340, 800 340 S 1000 300, 1060 300" fill="none" stroke={NEON} strokeWidth={5} strokeDasharray={`${560 * travel} 600`} opacity={0.8} />
              </svg>
              {/* lead viajando */}
              <div style={{ position: "absolute", left: mix(380, 990, travel), top: 300 + Math.sin(travel * Math.PI) * 30 - 34, opacity: prog(t, c.f_lead + 0.45, 0.2, ease.out) * (1 - prog(travel, 0.92, 0.08, ease.linear)), display: "flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 8px", borderRadius: 30, background: NEON, boxShadow: "0 0 30px rgba(53,224,161,0.6)" }}>
                <Av s="R" bg="#05261B" size={44} />
                <span style={{ fontWeight: 800, fontSize: 24, color: C.accentInk, whiteSpace: "nowrap" }}>Novo lead</span>
              </div>
              {/* CRM recebendo */}
              <div style={{ position: "absolute", left: 1080, top: 150, width: 300, borderRadius: 18, background: "#0F1714", border: `2px solid ${travel > 0.9 ? NEON : "rgba(255,255,255,0.08)"}`, padding: 14, opacity: camp }}>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 16, color: C.muted, letterSpacing: "0.06em", marginBottom: 12 }}>CRM · NOVO</div>
                {travel > 0.9 ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: prog(travel, 0.9, 0.1, ease.linear) }}>
                    <Av s="R" bg="#5A7A6E" size={40} />
                    <div style={{ fontWeight: 800, fontSize: 22, color: C.text }}>Roberto</div>
                  </div>
                ) : null}
              </div>
              <div style={{ position: "absolute", left: 60, top: 540, display: "flex", gap: 24, alignItems: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 40, letterSpacing: "0.06em", opacity: prog(t, c.f_camp, 0.4, ease.out) }}>
                <span style={{ color: C.text }}>CAMPANHA</span><span style={{ color: NEON }}>→</span><span style={{ color: C.text }}>LEAD</span><span style={{ color: NEON }}>→</span><span style={{ color: NEON }}>CRM</span>
              </div>
            </div>
            {/* M4 — assistente */}
            <div style={{ position: "absolute", left: slide(3), top: 0, width: CW, height: WH - 86, padding: 34, boxSizing: "border-box" }}>
              {sent > 0 ? (
                <div style={{ marginLeft: "auto", width: "fit-content", maxWidth: 900, padding: "22px 30px", borderRadius: 26, borderBottomRightRadius: 8, background: "#123A2D", border: "2px solid rgba(53,224,161,0.4)", fontWeight: 700, fontSize: 38, color: C.text, opacity: sent, transform: `translateY(${(1 - sent) * 20}px)` }}>{Q}</div>
              ) : null}
              {ans[0] > 0 ? (
                <div style={{ marginTop: 26, width: 940, padding: "24px 32px", borderRadius: 26, borderBottomLeftRadius: 8, background: "#16201C", border: "1px solid rgba(255,255,255,0.1)", opacity: ans[0] }}>
                  <div style={{ fontWeight: 800, fontSize: 38, color: C.text, marginBottom: 12 }}>3 follow-ups pedem atenção hoje:</div>
                  {[
                    ["Paula", "retorno pendente", "#E8B86A"],
                    ["Mariana", "proposta sem resposta", NEON],
                    ["Carlos", "confirmar visita 14:30", C.cold],
                  ].map(([n, d, col], i) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, opacity: ans[i + 1], transform: `translateX(${(1 - ans[i + 1]) * 30}px)` }}>
                      <div style={{ width: 12, height: 12, borderRadius: 6, background: col }} />
                      <span style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{n}</span>
                      <span style={{ fontWeight: 600, fontSize: 36, color: C.muted }}>— {d}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <div style={{ position: "absolute", left: 34, right: 34, bottom: 34, height: 96, borderRadius: 48, background: "#16201C", border: `2px solid ${typed > 0 ? "rgba(53,224,161,0.5)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", padding: "0 34px", fontWeight: 700, fontSize: 36, color: sent > 0.5 ? C.dim : C.text }}>
                {sent > 0.5 ? "Pergunte ao assistente…" : Q.slice(0, typed)}
                {sent <= 0.5 ? <span style={{ width: 3, height: 34, marginLeft: 4, background: NEON, opacity: caret ? 1 : 0 }} /> : null}
              </div>
            </div>
          </div>
        </AppWindow>
      </Cam>
    </div>
  );
};

const CrmCard: React.FC<{ name: string; note: string; bg: string; tone?: "warm" | "ok" | "cold"; hi?: number }> = ({ name, note, bg, tone, hi = 0 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, background: "#16201C", border: `2px solid ${hi > 0.5 ? "#E8B86A" : "rgba(255,255,255,0.08)"}`, marginBottom: 12, transform: `scale(${1 + hi * 0.06})`, boxShadow: hi > 0.5 ? "0 0 30px rgba(232,184,106,0.3)" : "none" }}>
    <Av s={name[0]} bg={bg} size={56} />
    <div style={{ minWidth: 0 }}>
      <div style={{ fontWeight: 800, fontSize: 32, color: C.text }}>{name}</div>
      <div style={{ fontWeight: 600, fontSize: 24, color: tone === "warm" ? "#E8B86A" : tone === "ok" ? NEON : tone === "cold" ? C.cold : C.muted, whiteSpace: "nowrap" }}>{note}</div>
    </div>
  </div>
);
