import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, Mark, NEON, Trail } from "../kit";

/**
 * CENAS 02–04 num mesmo plano contínuo (10–53 s): os mesmos cartões atravessam rotina → dor → virada.
 * 02 IDENTIFICAÇÃO: "não acontece em uma única tela" — uma tela se desfaz em seis lugares; cada situação entra quando é dita
 *    (Paula · retornar hoje / Visita 14:30 / Valor atualizado / Novo lead / Proposta enviada / Retomar em 3 dias); zoom-out gradual.
 * 03 DOR: NÃO É FALTA DE OPORTUNIDADE. → É PERDER O CONTROLE DAS QUE JÁ EXISTEM.; a câmera segue as outras tarefas e o cartão da
 *    Paula fica para trás, perde cor e some em "ficar para trás".
 * 04 VIRADA: o traço de luz atravessa a tela e, por onde passa, os cartões se organizam (a Paula volta); a marca aparece em
 *    "Sistema ATIVO"; TUDO O QUE VOCÊ PRECISA ACOMPANHAR. / MAS ORGANIZADO.
 * Pessoas e situações fictícias.
 */
type Card = { k: string; title: string; sub: string; cue: string; x: number; y: number; fx: number; fy: number; rot: number; gx: number; gy: number; icon: string };
const CARDS: Card[] = [
  { k: "RETORNO", title: "Paula", sub: "Retornar hoje", cue: "r_ret", x: 70, y: 80, fx: -650, fy: 0, rot: -3, gx: 150, gy: 190, icon: "☎" },
  { k: "VISITA", title: "Visita — 14:30", sub: "Confirmar com o cliente", cue: "r_vis", x: 700, y: 30, fx: 0, fy: -500, rot: 2, gx: 700, gy: 190, icon: "◷" },
  { k: "IMÓVEL", title: "Valor atualizado", sub: "Proprietário avisou", cue: "r_imo", x: 1330, y: 100, fx: 650, fy: 0, rot: 3, gx: 1250, gy: 190, icon: "⌂" },
  { k: "CAMPANHA", title: "Novo lead recebido", sub: "Anúncio · casa 3 quartos", cue: "r_lead", x: 120, y: 470, fx: -650, fy: 200, rot: 2, gx: 150, gy: 400, icon: "✦" },
  { k: "NEGOCIAÇÃO", title: "Proposta enviada", sub: "Aguardando resposta", cue: "r_neg", x: 720, y: 380, fx: 0, fy: 500, rot: -2, gx: 700, gy: 400, icon: "⇄" },
  { k: "FOLLOW-UP", title: "Retomar em 3 dias", sub: "Lembrete", cue: "r_fu", x: 1290, y: 530, fx: 650, fy: 200, rot: -3, gx: 1250, gy: 400, icon: "↻" },
];
const CW = 520;
const CH = 170;
const NOISE = [
  { k: "+3 mensagens", x: 560, y: 300, at: "r_lead" },
  { k: "Ligação perdida", x: 1220, y: 380, at: "r_neg" },
  { k: "Lembrete: 16:00", x: 60, y: 360, at: "r_neg" },
  { k: "Nova mensagem", x: 1560, y: 330, at: "r_fu" },
  { k: "Documento pendente", x: 560, y: 690, at: "r_fu" },
];

const CardBox: React.FC<{ c: Card; lit?: number; warm?: number; gray?: number }> = ({ c, lit = 0, warm = 0, gray = 0 }) => (
  <div style={{ width: CW, height: CH, boxSizing: "border-box", borderRadius: 26, background: "rgba(14,20,18,0.96)", border: `2px solid ${warm > 0.3 ? `rgba(232,184,106,${0.4 + 0.5 * warm})` : lit > 0.5 ? "rgba(53,224,161,0.7)" : "rgba(255,255,255,0.12)"}`, boxShadow: `0 30px 70px rgba(0,0,0,0.55)${lit > 0.5 ? ", 0 0 40px rgba(53,224,161,0.25)" : ""}`, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", filter: gray > 0 ? `grayscale(${gray}) brightness(${mix(1, 0.6, gray)})` : undefined }}>
    <div style={{ width: 84, height: 84, borderRadius: 42, flexShrink: 0, background: "rgba(53,224,161,0.12)", color: NEON, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{c.icon}</div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: NEON }}>{c.k}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 44, color: C.text, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{c.title}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 28, color: C.muted, whiteSpace: "nowrap" }}>{c.sub}</div>
    </div>
  </div>
);

export const S2Board: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // rotina
  const screen = sp(t, c.r_porque - 0.1, { damping: 15, stiffness: 150 });
  const split = prog(t, c.r_tela - 0.1, 0.7, ease.inOut);
  // dor
  const scrim = prog(t, c.d_e, 0.6, ease.out) * (1 - prog(t, c.d_porque - 0.2, 0.6, ease.inOut));
  const haze = prog(t, c.d_ver, 0.8, ease.inOut) * (1 - prog(t, c.d_porque + 0.2, 0.8, ease.inOut));
  const conv = prog(t, c.d_porque - 0.1, c.d_tras - c.d_porque + 0.4, ease.inOut);
  const left = prog(t, c.d_esp, 2.6, ease.inOut); // Paula esquecida
  const gone = prog(t, c.d_tras - 0.05, 0.45, ease.in);
  // virada
  const sweep = prog(t, c.v_foi - 0.15, 1.5, ease.inOut);
  const mark = sp(t, c.v_ativo - 0.1, { damping: 14, stiffness: 120 });
  const grow = prog(t, c.f_imo + 0.05, 0.55, ease.inOut);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Cam
        t={t}
        keys={[
          { t: c.r_porque - 0.3, s: 1.16, x: 0, y: 0 },
          { t: c.r_tela + 0.4, s: 1.08, e: ease.inOut },
          { t: c.r_3d, s: 0.88, x: 30, y: 20, e: ease.inOut },
          { t: c.d_ver, s: 0.95, x: 90, y: -20, e: ease.inOut },
          { t: c.d_porque, s: 0.99, x: 40, y: 10, e: ease.inOut },
          { t: c.d_tras + 0.3, s: 0.94, x: 330, y: -10, e: ease.inOut },
          { t: c.v_foi + 0.6, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.v_chato, s: 1.03, x: 0, y: -10, e: ease.inOut },
          { t: c.f_imo + 0.6, s: 1.12, x: 270, y: -40, e: ease.in },
        ]}
      >
        {/* "uma única tela" que se desfaz */}
        {screen > 0 && split < 1 ? (
          <div style={{ position: "absolute", left: 960 - 380, top: 400 - 230, width: 760, height: 460, boxSizing: "border-box", borderRadius: 30, border: "3px solid rgba(255,255,255,0.25)", background: "rgba(12,16,15,0.85)", opacity: Math.min(1, screen * 1.5) * (1 - split), transform: `scale(${mix(0.85, 1, Math.min(1, screen)) * mix(1, 1.6, split) * (1 + 0.04 * Math.sin(t * 2))}) rotate(${Math.sin(t * 1.3) * 1.5}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 120, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
          </div>
        ) : null}
        {/* lugares vazios que a tela vira */}
        {CARDS.map((k, i) => {
          const a = prog(t, c.r_porque + 0.6 + i * 0.45, 0.35, ease.out) * (1 - prog(t, c[k.cue] - 0.2, 0.3, ease.linear));
          return a > 0 ? <div key={`g${k.k}`} style={{ position: "absolute", left: k.x, top: k.y, width: CW, height: CH, borderRadius: 26, border: "2px dashed rgba(255,255,255,0.18)", opacity: a, transform: `rotate(${k.rot}deg)` }} /> : null;
        })}
        {/* ruído de notificações */}
        {NOISE.map((n, i) => {
          const a = prog(t, c[n.at] + 0.4, 0.4, ease.out) * (1 - prog(t, c.v_foi, 0.5, ease.in));
          return a > 0 ? (
            <div key={n.k} style={{ position: "absolute", left: n.x + Math.sin(t * 0.8 + i) * 18 + conv * 500, top: n.y + Math.cos(t * 0.7 + i * 2) * 14, opacity: a * 0.85 * (1 - scrim * 0.6), padding: "10px 20px", borderRadius: 22, background: "rgba(29,33,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 700, fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>
              {n.k}
            </div>
          ) : null;
        })}
        {/* cartões */}
        {CARDS.map((k, i) => {
          const inn = sp(t, c[k.cue] - 0.25, { damping: 14, stiffness: 150 });
          if (inn <= 0) return null;
          const isPaula = i === 0;
          const pain = prog(t, c.d_e - 0.3, 1.0, ease.inOut) * (1 - sweep);
          const bob = Math.sin(t * 1.1 + i * 1.7) * (8 + 14 * pain) * (1 - sweep);
          const drift = pain * ((t - c.d_e) * 26 * (i % 2 ? 1 : -0.6));
          // dor: esteira para a direita (todos menos a Paula)
          const cx = isPaula ? 0 : conv * 600;
          const cy = isPaula ? 0 : conv * (i % 2 ? -40 : 40);
          // virada: o traço passa e o cartão vai para o lugar
          const snap = prog(t, c.v_foi + 0.1 + ((k.gx + 200) / 1920) * 1.0 + (k.gy > 500 ? 0.15 : 0), 0.6, ease.inOut);
          const x0 = k.x + k.fx * (1 - Math.min(1, inn)) + cx + (isPaula ? 0 : drift);
          const y0 = k.y + k.fy * (1 - Math.min(1, inn)) + cy + bob;
          const x = mix(x0, k.gx, snap);
          const y = mix(y0, k.gy, snap);
          const rot = mix(k.rot + Math.sin(t * 0.9 + i) * 2.5 * (1 - snap), 0, snap);
          let op = Math.min(1, inn * 1.5);
          let gray = 0;
          let warm = 0;
          if (isPaula) {
            gray = left * (1 - snap);
            warm = prog(t, c.d_esp - 0.2, 0.4, ease.out) * (1 - gone);
            op *= mix(1, 0.35, left) * (1 - gone) + snap;
          }
          op *= 1 - scrim * 0.3;
          // saída: IMÓVEL cresce e vira a interface; os outros somem
          const isImovel = k.k === "IMÓVEL";
          op *= (isImovel ? 1 - prog(grow, 0.6, 0.4, ease.linear) : 1 - grow) * (1 - 0.7 * Math.min(1, mark) * (isImovel ? grow < 0.05 ? 1 : 0 : 1));
          const sc = isImovel ? mix(1, 2.6, grow) : 1;
          return (
            <div key={k.k} style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, op), filter: haze > 0.02 ? `blur(${haze * 7}px)` : undefined, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 50%", zIndex: isImovel ? 5 : 1 }}>
              <CardBox c={k} lit={isPaula ? snap : snap * 0.6} warm={warm} gray={gray} />
            </div>
          );
        })}
        {/* marca */}
        {mark > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", opacity: Math.min(1, mark * 1.5) * (1 - grow), transform: `scale(${mix(1.5, 1.25, Math.min(1, mark))})`, zIndex: 20 }}>
            <Mark size={130} glow={1} sub />
          </div>
        ) : null}
      </Cam>

      {/* dor: escurece e afirma */}
      <div style={{ position: "absolute", inset: 0, background: `rgba(2,4,3,${0.25 * scrim})`, pointerEvents: "none" }} />
      {/* virada: traço de luz que organiza + texto */}
      <Trail d="M -80 760 C 400 760, 700 520, 1000 520 S 1500 300, 2000 260" p={sweep} len={2400} width={12} fade={prog(t, c.v_foi + 1.6, 0.8, ease.in)} />
      <Trail d="M 2000 760 C 1500 760, 1200 460, 960 330" p={prog(t, c.v_ativo - 0.75, 0.75, ease.inOut)} len={1300} width={8} fade={prog(t, c.v_ativo + 0.2, 0.6, ease.in)} tail={0.6} />
    </div>
  );
};
