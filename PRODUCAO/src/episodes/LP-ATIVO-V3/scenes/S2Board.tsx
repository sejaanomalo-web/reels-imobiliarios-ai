import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, Mark, NEON, Trail } from "../kit";

/**
 * ROTINA (v3) + VIRADA. "Porque a rotina de um corretor não acontece em uma única tela. Tem cliente pedindo retorno. Visita para
 * confirmar. Proprietário mudando informação do imóvel." (fala acelerada) — a tela única se desfaz; as três situações entram com
 * impacto e, em volta, notificações pipocam cada vez mais rápido, o contador dispara, a câmera treme: é coisa demais para a cabeça
 * do corretor. Corta seco em "E muitas vezes" (a dor é outra cena).
 * VIRADA: "Foi pensando exatamente nessa rotina que criamos o Sistema ATIVO." — o traço de luz atravessa, os três cartões voltam
 * organizados, a logo oficial se revela; o cartão IMÓVEL cresce e vira a interface. Pessoas e situações fictícias.
 */
type Card = { k: string; title: string; sub: string; cue: string; x: number; y: number; fx: number; fy: number; rot: number; gx: number; gy: number; icon: string };
const CARDS: Card[] = [
  { k: "RETORNO", title: "Paula", sub: "Retornar hoje", cue: "r_ret", x: 110, y: 400, fx: -700, fy: 0, rot: -3, gx: 150, gy: 385, icon: "☎" },
  { k: "VISITA", title: "Visita — 14:30", sub: "Confirmar com o cliente", cue: "r_vis", x: 700, y: 330, fx: 0, fy: -600, rot: 2, gx: 700, gy: 385, icon: "◷" },
  { k: "IMÓVEL", title: "Valor atualizado", sub: "Proprietário avisou", cue: "r_imo", x: 1290, y: 420, fx: 700, fy: 0, rot: 3, gx: 1250, gy: 385, icon: "⌂" },
];
const CW = 520;
const CH = 170;
const POOL = [
  "Nova mensagem", "Ligação perdida", "Lembrete: 16:00", "Áudio de 2 min", "Cliente digitando…", "E-mail não lido", "Documento pendente",
  "Visita remarcada?", "Novo valor do imóvel", "Mensagem do proprietário", "Retornar ligação", "Fotos para atualizar", "Agenda: conflito",
  "3 mensagens", "Lead aguardando", "Chave com o porteiro?", "Confirmar horário", "Cliente pediu desconto",
];

const CardBox: React.FC<{ c: Card; lit?: number }> = ({ c, lit = 0 }) => (
  <div style={{ width: CW, height: CH, boxSizing: "border-box", borderRadius: 26, background: "rgba(14,20,18,0.97)", border: `2px solid ${lit > 0.5 ? "rgba(58,245,132,0.7)" : "rgba(255,255,255,0.14)"}`, boxShadow: `0 30px 70px rgba(0,0,0,0.55)${lit > 0.5 ? ", 0 0 40px rgba(58,245,132,0.25)" : ""}`, display: "flex", alignItems: "center", gap: 22, padding: "0 28px" }}>
    <div style={{ width: 84, height: 84, borderRadius: 42, flexShrink: 0, background: "rgba(58,245,132,0.12)", color: NEON, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{c.icon}</div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: NEON }}>{c.k}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 44, color: C.text, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{c.title}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, color: C.muted, whiteSpace: "nowrap" }}>{c.sub}</div>
    </div>
  </div>
);

export const S2Board: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const screen = sp(t, c.r_porque - 0.1, { damping: 15, stiffness: 150 });
  const split = prog(t, c.r_tela - 0.1, 0.5, ease.inOut);
  // sobrecarga: notificações em ritmo crescente, de r_ret até "E muitas vezes"
  const o0 = c.r_ret - 0.1;
  const o1 = c.d_e - 0.05;
  const spawns: number[] = [];
  {
    let s = o0;
    let k = 0;
    while (s < o1 - 0.05 && k < 60) {
      spawns.push(s);
      const p = (s - o0) / (o1 - o0);
      s += mix(0.34, 0.065, Math.pow(p, 0.8));
      k++;
    }
  }
  const shown = spawns.filter((s) => s <= t).length;
  const press = prog(t, o0, o1 - o0, ease.in); // pressão cresce
  const cut = prog(t, c.d_e - 0.08, 0.16, ease.linear); // corte seco
  const shake = t < c.d_e && t > o0 ? (Math.sin(t * 61) * 0.6 + Math.sin(t * 37) * 0.4) * 14 * press * press : 0;
  // virada
  const sweep = prog(t, c.v_foi - 0.15, 1.3, ease.inOut);
  const mark = sp(t, c.v_ativo - 0.1, { damping: 14, stiffness: 120 });
  const grow = prog(t, c.f_imo + 0.05, 0.55, ease.inOut);
  const routineOp = 1 - cut;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      {/* vinheta vermelha pulsando com a pressão */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(1200px 700px at 50% 50%, transparent 45%, rgba(255,70,60,${0.28 * press * (0.7 + 0.3 * Math.sin(t * 9)) * routineOp}) 100%)` }} />
      <Cam
        t={t}
        keys={[
          { t: c.r_porque - 0.3, s: 1.14, x: 0, y: 0 },
          { t: c.r_tela + 0.3, s: 1.04, e: ease.inOut },
          { t: c.r_imo, s: 0.98, e: ease.inOut },
          { t: c.d_e, s: 0.9, e: ease.in },
          { t: c.v_foi - 0.2, s: 1.0, x: 0, y: 0 },
          { t: c.v_foi + 0.6, s: 1.0, e: ease.inOut },
          { t: c.f_imo, s: 1.03, y: -10, e: ease.inOut },
          { t: c.f_imo + 0.6, s: 1.12, x: 270, y: -40, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.6}px)` }}>
          {/* "uma única tela" que se desfaz */}
          {screen > 0 && split < 1 ? (
            <div style={{ position: "absolute", left: 960 - 380, top: 470 - 230, width: 760, height: 460, boxSizing: "border-box", borderRadius: 30, border: "3px solid rgba(255,255,255,0.25)", background: "rgba(12,16,15,0.85)", opacity: Math.min(1, screen * 1.5) * (1 - split), transform: `scale(${mix(0.85, 1, Math.min(1, screen)) * mix(1, 1.7, split) * (1 + 0.04 * Math.sin(t * 2))}) rotate(${Math.sin(t * 1.3) * 1.5}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 120, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
            </div>
          ) : null}
          {/* notificações em cascata */}
          {routineOp > 0
            ? spawns.slice(0, shown).map((s, i) => {
                const a = prog(t, s, 0.14, ease.out);
                const x = 40 + rnd(i * 3.7 + 1) * 1600;
                const y = 60 + rnd(i * 5.3 + 2) * 700;
                const zone = y > 300 && y < 640 && x > 60 && x < 1780; // não cobre o centro dos cartões
                const yy = zone ? (y < 470 ? y - 220 : y + 200) : y;
                const red = i % 4 === 0;
                return (
                  <div key={i} style={{ position: "absolute", left: x + Math.sin(t * 2 + i) * 8, top: Math.max(30, Math.min(780, yy)) + Math.cos(t * 1.7 + i) * 6, opacity: a * routineOp, transform: `scale(${mix(1.5, 1, a)}) rotate(${(rnd(i * 9.1) - 0.5) * 8}deg)`, display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 24, background: red ? "rgba(58,20,18,0.96)" : "rgba(29,33,40,0.96)", border: `2px solid ${red ? "rgba(255,107,94,0.6)" : "rgba(255,255,255,0.14)"}`, boxShadow: "0 14px 30px rgba(0,0,0,0.5)", fontWeight: 700, fontSize: 28, color: red ? "#FFB3AA" : C.text, whiteSpace: "nowrap", zIndex: 2 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 6, background: red ? C.warn : NEON }} />
                    {POOL[i % POOL.length]}
                  </div>
                );
              })
            : null}
          {/* cartões */}
          {CARDS.map((k, i) => {
            const inn = sp(t, c[k.cue] - 0.15, { damping: 11, stiffness: 260 });
            if (inn <= 0) return null;
            const back = sp(t, c.v_foi + 0.15 + i * 0.22, { damping: 14, stiffness: 160 }); // voltam organizados
            const inRoutine = t < c.v_foi;
            const jitter = Math.sin(t * 23 + i * 2) * 5 * press;
            const x = inRoutine ? k.x + k.fx * (1 - Math.min(1, inn)) + jitter : mix(k.gx + (i - 1) * 900, k.gx, Math.min(1, back));
            const y = inRoutine ? k.y + k.fy * (1 - Math.min(1, inn)) + Math.cos(t * 19 + i) * 4 * press : k.gy;
            const rot = inRoutine ? k.rot + Math.sin(t * 11 + i) * 3 * press : 0;
            const isImovel = k.k === "IMÓVEL";
            let op = inRoutine ? Math.min(1, inn * 1.5) * routineOp : Math.min(1, back * 1.5);
            op *= (isImovel ? 1 - prog(grow, 0.6, 0.4, ease.linear) : 1 - grow) * (1 - 0.92 * Math.min(1, mark) * (isImovel ? (grow < 0.05 ? 1 : 0) : 1));
            const sc = (inRoutine ? mix(1.35, 1, Math.min(1, inn)) : 1) * (isImovel ? mix(1, 2.6, grow) : 1);
            return (
              <div key={k.k} style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, op), transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 50%", zIndex: isImovel ? 6 : 5 }}>
                <CardBox c={k} lit={inRoutine ? 0 : back} />
              </div>
            );
          })}
          {/* contador de notificações */}
          {routineOp > 0 && shown > 0 ? (
            <div style={{ position: "absolute", left: 1700, top: 60, zIndex: 8, opacity: routineOp, transform: `scale(${1 + 0.25 * Math.max(0, 1 - (t - (spawns[shown - 1] ?? 0)) / 0.12)})` }}>
              <div style={{ minWidth: 120, height: 120, padding: "0 20px", boxSizing: "border-box", borderRadius: 60, background: C.warn, color: "#2A0A08", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 56, boxShadow: "0 0 50px rgba(255,107,94,0.6)" }}>{shown > 40 ? "40+" : shown}</div>
            </div>
          ) : null}
          {/* logo oficial na virada */}
          {mark > 0 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", opacity: Math.min(1, mark * 1.5) * (1 - grow), transform: `scale(${mix(1.15, 1, Math.min(1, mark))})`, zIndex: 20 }}>
              <Mark size={150} glow={1} reveal={prog(t, c.v_ativo - 0.25, 0.55, ease.out)} />
            </div>
          ) : null}
        </div>
      </Cam>
      <Trail d="M -80 760 C 400 760, 700 520, 1000 520 S 1500 300, 2000 260" p={sweep} len={2400} width={12} fade={prog(t, c.v_foi + 1.5, 0.8, ease.in)} />
    </div>
  );
};
