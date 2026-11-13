import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, Building, IconCalendar, IconCheck } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENAS 02 → 04a — O FIO DA CONVERSA (um único "mundo" percorrido pela câmera).
 *  Situação: o fio se desenha pelos momentos do atendimento (opções, dúvidas, "vou analisar");
 *            você e o cliente saem de cena e o fio fica solto, balançando.
 *  Tensão:   na ponta solta, a pergunta; o fio se divide em dois caminhos que entram na agenda;
 *            o cliente responde e o retorno fica autorizado.
 *  Insight:  a agenda vira o nó DATA; o fio segue firme e ganha ASSUNTO e EXPECTATIVA; a câmera se afasta: "parece pequeno".
 */
const LY = 900;
const N = [260, 760, 1260];
const O = { x: 1600, y: LY };
const CAL = { x: 1900, y: 600, w: 620, h: 580 };
const NODES = [
  { x: 1760, label: "DATA", value: "sex · 10h", cue: "ins_d" },
  { x: 2060, label: "ASSUNTO", value: "as 2 opções", cue: "ins_s" },
  { x: 2360, label: "EXPECTATIVA", value: "decidir em 15 dias", cue: "ins_e" },
];
const DAYS = ["SEG", "TER", "QUA", "QUI", "SEX"];

const Card: React.FC<{ x: number; y: number; w: number; h: number; s: number; children: React.ReactNode; tone?: string; style?: React.CSSProperties }> = ({
  x, y, w, h, s, children, tone = C.surface2, style,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y,
      width: w,
      height: h,
      boxSizing: "border-box",
      borderRadius: 30,
      background: tone,
      border: `1px solid ${C.line}`,
      boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
      padding: "20px 24px",
      opacity: Math.min(1, s * 1.6),
      transform: `translateY(${(1 - Math.min(1, s)) * 40}px) scale(${mix(0.8, 1, Math.min(1, s))})`,
      fontFamily: F.sans,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Thread: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  // --- situação ---
  const head = (() => {
    const stops: [number, number][] = [[c.sit_line + 0.35, N[0]], [c.sit_doubt, N[1]], [c.sit_anal, N[2]]];
    let x = 60, prevT = c.sit_line - 0.1;
    for (const [tt, xx] of stops) {
      x = mix(x, xx, prog(t, prevT, Math.max(0.2, tt - prevT), ease.inOut));
      prevT = tt;
    }
    return x;
  })();
  const n1 = sp(t, c.sit_opt, { damping: 14, stiffness: 190 });
  const n2 = sp(t, c.sit_doubt, { damping: 14, stiffness: 190 });
  const answered = prog(t, c.sit_doubt + 0.4, 0.3, ease.out);
  const n3 = sp(t, c.sit_anal, { damping: 13, stiffness: 190 });
  const leave = prog(t, c.sit_leave, 0.7, ease.in);
  const loose = prog(t, c.sit_leave + 0.15, 0.6, ease.out);
  const after = sp(t, c.sit_after, { damping: 12, stiffness: 200 });
  const fray = prog(t, c.sit_loose, 0.5, ease.out) * (1 - prog(t, c.ten_ask, 0.3, ease.out));
  // --- tensão ---
  const lift = prog(t, c.ten_ask, 0.45, ease.inOut);
  const ask = sp(t, c.ten_ask + 0.05, { damping: 14, stiffness: 180 });
  const ask2 = prog(t, c.ten_q, 0.25, ease.out);
  const cal = sp(t, c.ten_q + 0.15, { damping: 15, stiffness: 150 });
  const pa = prog(t, c.ten_a - 0.1, 0.5, ease.inOut);
  const pb = prog(t, c.ten_b - 0.1, 0.5, ease.inOut);
  const chipA = sp(t, c.ten_a + 0.35, { damping: 12, stiffness: 220 });
  const chipB = sp(t, c.ten_b + 0.35, { damping: 12, stiffness: 220 });
  const answer = sp(t, c.ten_respect, { damping: 13, stiffness: 200 });
  const ok = sp(t, c.ten_ok, { damping: 9, stiffness: 230 });
  // --- insight ---
  const collapse = prog(t, c.ins_reg - 0.05, 0.55, ease.inOut);
  const extend = prog(t, c.ins_reg + 0.1, 0.6, ease.inOut);
  const sway = Math.sin(t * 2.6) * 26 * (1 - lift);
  const looseEnd = { x: mix(N[2], O.x, loose), y: LY + mix(0, 150, loose) * (1 - lift) + sway * loose };
  const ctrl = { x: (N[2] + looseEnd.x) / 2, y: LY + 120 * loose * (1 - lift) };
  const exit = prog(t, c.ins_diff - 0.05, 0.35, ease.in);

  const youX = head + 90 + (t > c.sit_leave ? 0 : Math.sin(t * 8) * 4);
  const big = (cue: number) => ({ s: sp(t, cue, { damping: 12, stiffness: 220 }), fade: prog(t, cue + 0.2, 0.16, ease.in) });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
      drift={0.5}
        t={t}
        keys={[
          { t: c.sit_line, x: -280, y: -40, s: 1.2 },
          { t: c.sit_opt + 0.3, x: -230, y: -60, s: 1.05, e: ease.out },
          { t: c.sit_doubt + 0.35, x: 220, y: -60, s: 1.05, r: 1 },
          { t: c.sit_anal + 0.35, x: 720, y: -20, s: 1.05, r: -1 },
          { t: c.sit_leave + 0.5, x: 860, y: 40, s: 0.8, r: 0 },
          { t: c.sit_loose + 0.2, x: 1040, y: 80, s: 1.12, e: ease.inOut },
          { t: c.ten_ask + 0.35, x: 1060, y: -40, s: 1.0 },
          { t: c.ten_q + 0.5, x: 1440, y: -20, s: 0.94 },
          { t: c.ten_respect, x: 1450, y: 0, s: 0.95 },
          { t: c.ten_ok + 0.3, x: 1560, y: -60, s: 1.04 },
          { t: c.ins_reg + 0.45, x: 1520, y: -60, s: 1.0 },
          { t: c.ins_small - 0.05, x: 1520, y: -60, s: 1.02 },
          { t: c.ins_small + 0.4, x: 720, y: -60, s: 0.42, e: ease.inOut },
          { t: c.ins_diff + 0.3, x: 720, y: -60, s: 0.36 },
        ]}
      >
        {/* fio principal */}
        <svg width={3000} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path d={`M60 ${LY}H${head}`} stroke={C.accent} strokeWidth={10} strokeLinecap="round" />
          {loose > 0 && extend < 1 ? (
            <path
              d={`M${N[2]} ${LY}Q${ctrl.x} ${ctrl.y} ${looseEnd.x} ${looseEnd.y}`}
              fill="none"
              stroke={fray > 0.5 ? C.warn : C.accent}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={fray > 0 ? `${mix(2000, 18, fray)} ${mix(0, 22, fray)}` : undefined}
              opacity={1 - 0.5 * fray * (0.5 + 0.5 * Math.sin(t * 20))}
            />
          ) : null}
          {extend > 0 ? <path d={`M${N[2]} ${LY}H${mix(O.x, 2520, extend)}`} stroke={C.accent} strokeWidth={10} strokeLinecap="round" /> : null}
          {/* dois caminhos para a agenda */}
          {pa > 0 && collapse < 1 ? (
            <path d={`M${O.x} ${O.y}C${O.x + 160} ${O.y} ${CAL.x - 160} ${CAL.y + 200} ${CAL.x} ${CAL.y + 200}`} fill="none" stroke={answer > 0.5 ? C.accent : C.text} strokeWidth={8} strokeLinecap="round"
              strokeDasharray={`${pa * 520} 520`} opacity={1 - collapse} />
          ) : null}
          {pb > 0 && collapse < 1 ? (
            <path d={`M${O.x} ${O.y}C${O.x + 160} ${O.y} ${CAL.x - 160} ${CAL.y + 470} ${CAL.x} ${CAL.y + 470}`} fill="none" stroke={answer > 0.5 ? C.dim : C.text} strokeWidth={8} strokeLinecap="round"
              strokeDasharray={`${pb * 520} 520`} opacity={(1 - collapse) * (answer > 0.5 ? 0.5 : 1)} />
          ) : null}
          {[N[0], N[1], N[2]].map((x, k) =>
            head >= x - 2 ? <circle key={k} cx={x} cy={LY} r={18} fill={C.accent} stroke={C.bg0} strokeWidth={8} /> : null,
          )}
          {NODES.map((nd, k) => {
            const s = sp(t, c[nd.cue], { damping: 10, stiffness: 240 });
            return s > 0 ? <circle key={k} cx={nd.x} cy={LY} r={22 * Math.min(1.2, s)} fill={C.paper} stroke={C.accent} strokeWidth={8} /> : null;
          })}
        </svg>

        {/* você e o cliente acompanham o fio… e saem */}
        {t < c.sit_leave + 0.8 ? (
          <>
            <div style={{ position: "absolute", left: youX - 46 - leave * 260, top: LY - 160 - leave * 500, opacity: 1 - leave, textAlign: "center", fontFamily: F.sans }}>
              <Avatar size={92} label="EU" bg={C.accent} color={C.accentInk} />
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.accent, marginTop: 6 }}>VOCÊ</div>
            </div>
            <div style={{ position: "absolute", left: youX - 46 + leave * 360, top: LY + 46 + leave * 520, opacity: 1 - leave, textAlign: "center", fontFamily: F.sans }}>
              <Avatar size={92} label="PS" bg="#5B4A6E" />
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.muted, marginTop: 6 }}>PAULA</div>
            </div>
          </>
        ) : null}

        {/* momentos do atendimento */}
        <Card x={N[0]} y={LY - 300} w={340} h={240} s={n1}>
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1].map((k) => (
              <div key={k} style={{ width: 140, height: 100, borderRadius: 14, overflow: "hidden" }}>
                <Building w={140} h={100} id={`o${k}`} hue={k} lit={0.5} />
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 800, fontSize: 32, color: C.text, marginTop: 14 }}>2 opções enviadas</div>
        </Card>
        <Card x={N[1]} y={LY - 270} w={340} h={210} s={n2}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: answered > 0.5 ? C.accent : C.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 44, color: answered > 0.5 ? C.accentInk : C.text }}>
              {answered > 0.5 ? <IconCheck size={44} /> : "?"}
            </div>
            <div style={{ fontWeight: 800, fontSize: 32, color: C.text, lineHeight: 1.1 }}>Dúvidas<br />{answered > 0.5 ? "respondidas" : "do cliente"}</div>
          </div>
        </Card>
        <Card x={N[2] + 40} y={LY + 50} w={380} h={130} s={n3} style={{ borderTopLeftRadius: 10, display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar size={64} label="PS" bg="#5B4A6E" />
          <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>“Vou analisar!”</span>
        </Card>
        {/* "e depois?" na ponta solta */}
        {after > 0 && lift < 1 ? (
          <div style={{ position: "absolute", left: looseEnd.x - 130, top: looseEnd.y + 40, width: 260, height: 74, borderRadius: 22, border: `3px dashed ${fray > 0.5 ? C.warn : C.muted}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", color: fray > 0.5 ? C.warn : C.text, opacity: Math.min(1, after * 1.5) * (1 - lift), transform: `scale(${mix(0.6, 1, Math.min(1, after))})` }}>
            E DEPOIS?
          </div>
        ) : null}

        {/* tensão: a pergunta antes de encerrar */}
        {ask > 0 && collapse < 1 ? (
          <Card x={O.x + 70} y={LY - 340} w={460} h={190} s={ask} tone={C.paper} style={{ opacity: Math.min(1, ask * 1.6) * (1 - collapse) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: C.inkMuted }}>ANTES DE ENCERRAR</div>
            <div style={{ fontWeight: 800, fontSize: 64, letterSpacing: "-0.035em", color: C.ink, marginTop: 8, opacity: ask2, transform: `scale(${mix(1.3, 1, ask2)})`, transformOrigin: "0% 50%" }}>pergunte.</div>
          </Card>
        ) : null}
        {cal > 0 ? (
          <div
            style={{
              position: "absolute",
              left: CAL.x,
              top: CAL.y,
              width: CAL.w,
              height: CAL.h,
              boxSizing: "border-box",
              borderRadius: 36,
              background: C.surface,
              border: `2px solid ${ok > 0.5 ? "rgba(58,245,132,0.6)" : C.line}`,
              boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 ${80 * Math.min(1, ok)}px rgba(58,245,132,0.25)`,
              padding: "24px 26px",
              fontFamily: F.sans,
              opacity: Math.min(1, cal * 1.5) * (1 - collapse),
              transformOrigin: "0% 30%",
              transform: `translate(${collapse * (NODES[0].x - 140 - CAL.x)}px, ${collapse * (LY - 230 - CAL.y)}px) scale(${mix(mix(0.85, 1, Math.min(1, cal)), 0.42, collapse)})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <IconCalendar size={40} color={C.accent} stroke={2.2} />
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.text }}>AGENDA DE RETORNO</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {DAYS.map((d, k) => (
                <div key={d} style={{ flex: 1, height: 220, borderRadius: 16, background: k === 4 && chipA > 0 ? "rgba(58,245,132,0.1)" : "rgba(255,255,255,0.03)", position: "relative" }}>
                  <div style={{ textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: k === 4 ? C.text : C.muted, paddingTop: 12 }}>{d}</div>
                  {k === 4 && chipA > 0 ? (
                    <div style={{ position: "absolute", left: 6, right: 6, top: 70, height: 120, borderRadius: 14, background: answer > 0.5 ? C.accent : C.surface3, color: answer > 0.5 ? C.accentInk : C.text, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28, opacity: Math.min(1, chipA * 2), transform: `scale(${mix(0.5, 1, Math.min(1, chipA))})` }}>
                      10h
                      <span style={{ fontSize: 20, fontWeight: 700 }}>você liga</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {chipB > 0 ? (
              <div style={{ marginTop: 22, height: 110, borderRadius: 18, border: `3px dashed ${answer > 0.5 ? C.dim : C.text}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontWeight: 800, fontSize: 30, color: answer > 0.5 ? C.dim : C.text, opacity: Math.min(1, chipB * 2), transform: `scale(${mix(0.6, 1, Math.min(1, chipB))})` }}>
                ou: Paula chama quando analisar
              </div>
            ) : null}
            {ok > 0 ? (
              <div style={{ position: "absolute", left: 90, top: 330, padding: "14px 22px", borderRadius: 18, background: C.accent, color: C.accentInk, fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 10, transform: `rotate(-6deg) scale(${mix(1.8, 1, Math.min(1, ok))})`, opacity: Math.min(1, ok * 2), boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
                <IconCheck size={32} /> RETORNO AUTORIZADO
              </div>
            ) : null}
          </div>
        ) : null}
        {answer > 0 && collapse < 1 ? (
          <Card x={O.x - 60} y={LY + 70} w={420} h={130} s={answer} style={{ borderTopLeftRadius: 10, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, answer * 1.6) * (1 - collapse) }}>
            <Avatar size={64} label="PS" bg="#5B4A6E" />
            <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>“Pode ser sexta!”</span>
          </Card>
        ) : null}

        {/* insight: três nós */}
        {NODES.map((nd, k) => {
          const b = big(c[nd.cue]);
          const s = sp(t, c[nd.cue], { damping: 13, stiffness: 200 });
          return (
            <React.Fragment key={k}>
              {b.s > 0 && b.fade < 1 ? (
                <div style={{ position: "absolute", left: NODES[1].x - 560, width: 1120, top: LY - 520, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 112, letterSpacing: "-0.04em", color: C.accent, opacity: Math.min(1, b.s * 2) * (1 - b.fade), transform: `scale(${mix(1.6, 1, Math.min(1, b.s))})` }}>
                  {nd.label}
                </div>
              ) : null}
              <Card x={nd.x} y={LY - 240} w={280} h={190} s={s} tone={C.paper}>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: "#1D7A42" }}>{nd.label}</div>
                <div style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08, letterSpacing: "-0.025em", color: C.ink, marginTop: 10 }}>{nd.value}</div>
              </Card>
            </React.Fragment>
          );
        })}
      </Camera>
    </div>
  );
};
