import React from "react";
import { C, F } from "../../../theme";
import { clamp01, ease, mix, prog, rnd } from "../../../lib/anim";
import { Avatar, IconSearch } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 01 — GANCHO. "O lead não sumiu. O histórico é que sumiu."
 * A conversa do lead é empurrada para o fundo por dezenas de conversas novas; mergulho no celular.
 * Todos os nomes e mensagens são fictícios.
 */
const ROW_H = 118;
const LIST_H = 716;
const PHONE = { w: 600, h: 1010, x: 240, y: 232 };

const CONVS = [
  ["Marina S.", "Pode ser sábado de manhã?", "MS", "#3A4658"],
  ["Plantão Centro", "Alguém cobre a visita das 15h?", "PC", "#4A3F58"],
  ["Paulo R.", "Qual o valor do condomínio?", "PR", "#3F5248"],
  ["Dona Célia", "Mandei os documentos agora", "DC", "#58483A"],
  ["Imóvel Jardins", "Tem foto da fachada?", "IJ", "#3A5258"],
  ["Carlos A.", "Aceita financiamento?", "CA", "#4E3A44"],
  ["Visitas da semana", "Confirmado para terça, 10h", "VS", "#3D4A63"],
  ["Júlia M.", "Ainda está disponível?", "JM", "#57503A"],
  ["Sr. Antônio", "Vou falar com minha esposa", "SA", "#3F4A40"],
  ["Proprietário 302", "Baixei o valor do aluguel", "P3", "#50405A"],
] as const;

const Row: React.FC<{ y: number; i: number; featured?: boolean; fade?: number }> = ({ y, i, featured, fade = 1 }) => {
  const c = CONVS[((i % CONVS.length) + CONVS.length) % CONVS.length];
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        height: ROW_H,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "0 26px",
        boxSizing: "border-box",
        opacity: fade,
        background: featured ? "rgba(53,224,161,0.13)" : "transparent",
        borderLeft: featured ? `6px solid ${C.accent}` : "6px solid transparent",
        borderBottom: `1px solid ${C.lineSoft}`,
      }}
    >
      <Avatar
        size={76}
        label={featured ? "RM" : c[2]}
        bg={featured ? C.accent : c[3]}
        color={featured ? C.accentInk : C.text}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 31, color: C.text, letterSpacing: "-0.01em" }}>
            {featured ? "Rafael M." : c[0]}
          </span>
          {featured ? (
            <span
              style={{
                fontFamily: F.mono,
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: "0.08em",
                color: C.accentInk,
                background: C.accent,
                padding: "3px 10px",
                borderRadius: 8,
              }}
            >
              LEAD
            </span>
          ) : null}
        </div>
        <div
          style={{
            marginTop: 5,
            fontWeight: 500,
            fontSize: 24,
            color: featured ? "#C9F5E4" : C.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {featured ? "Procuro um apê de 2 quartos…" : c[1]}
        </div>
      </div>
      {!featured ? (
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            background: C.surface3,
            color: C.text,
            fontSize: 19,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {1 + ((Math.abs(i) * 7) % 4)}
        </div>
      ) : null}
    </div>
  );
};

export const hookN = (t: number, times: number[]) => {
  let n = 0;
  for (let j = 0; j < times.length; j++) {
    const next = times[j + 1] ?? times[j] + 0.036;
    const d = Math.min(0.26, Math.max(0.045, (next - times[j]) * 0.95));
    n += ease.inOut(clamp01((t - times[j]) / d));
  }
  return n;
};

export const PhoneList: React.FC<{ n: number; speed: number; count: number }> = ({ n, speed, count }) => {
  const rows: React.ReactNode[] = [];
  const total = Math.ceil(n) + 1;
  for (let j = 1; j <= total; j++) {
    const y = (n - j) * ROW_H;
    if (y > -ROW_H && y < LIST_H) rows.push(<Row key={`n${j}`} y={y} i={j} />);
  }
  const fy = n * ROW_H;
  if (fy < LIST_H) rows.push(<Row key="f" y={fy} i={0} featured />);
  for (let m = 1; m <= 7; m++) {
    const y = (n + m) * ROW_H;
    if (y < LIST_H) rows.push(<Row key={`o${m}`} y={y} i={-m - 2} />);
  }
  return (
    <>
      <div style={{ padding: "64px 30px 0", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontWeight: 800, fontSize: 46, color: C.text, letterSpacing: "-0.03em" }}>Conversas</span>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 24,
            color: C.accentInk,
            background: C.text,
            borderRadius: 20,
            padding: "3px 14px",
          }}
        >
          {count}
        </span>
      </div>
      <div
        style={{
          margin: "22px 26px 0",
          height: 64,
          borderRadius: 32,
          background: C.surface2,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 22px",
          color: C.dim,
          fontSize: 24,
          fontWeight: 500,
        }}
      >
        <IconSearch size={28} color={C.dim} />
        Buscar
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 266,
          height: LIST_H,
          overflow: "hidden",
          filter: speed > 3 ? `blur(${Math.min(5, (speed - 3) * 0.28)}px)` : undefined,
        }}
      >
        {rows}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 150,
            background: `linear-gradient(to bottom, transparent, ${C.surface})`,
          }}
        />
      </div>
    </>
  );
};

export const PhoneFrame: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: PHONE.x,
      top: PHONE.y,
      width: PHONE.w,
      height: PHONE.h,
      borderRadius: 86,
      background: "linear-gradient(145deg,#59616E,#262B33 38%,#101216)",
      boxShadow: "0 60px 120px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.10), 0 0 180px rgba(53,224,161,0.16)",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 13,
        borderRadius: 74,
        background: C.surface,
        overflow: "hidden",
        fontFamily: F.sans,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 18,
          width: 150,
          height: 34,
          marginLeft: -75,
          borderRadius: 20,
          background: "#050607",
        }}
      />
    </div>
  </div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const times = tl.series.hookRows;
  const n = hookN(t, times);
  const speed = (n - hookN(t - 1 / 30, times)) * 30;
  const settle = prog(t, 0, 0.9, ease.out);
  const dive = prog(t, tl.cues.hook_dive - 0.05, 0.62, ease.in);
  const gone = prog(t, tl.cues.hook_dive + 0.3, 0.27, ease.linear);
  const hit = prog(t, tl.cues.hook_exit, 0.5, ease.out);
  const shake = Math.sin(hit * Math.PI * 5) * (1 - hit) * 7;

  const chips = times.slice(0, 9).map((tj, j) => {
    const p = prog(t, tj - 0.34, 0.34, ease.in);
    if (p <= 0 || p >= 1) return null;
    const side = j % 2 ? 1 : -1;
    const x0 = 540 + side * (560 + rnd(j) * 80);
    const y0 = 300 + rnd(j + 9) * 700;
    const c = CONVS[(j + 1) % CONVS.length];
    return (
      <div
        key={j}
        style={{
          position: "absolute",
          left: mix(x0, 540, p) - 150,
          top: mix(y0, 520, p) - 40,
          width: 300,
          height: 80,
          borderRadius: 26,
          background: C.surface2,
          border: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 16px",
          boxSizing: "border-box",
          opacity: Math.min(1, p * 4) * (1 - prog(p, 0.8, 0.2, ease.linear)),
          scale: String(mix(1, 0.55, p)),
          filter: `blur(${p * 3}px)`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <Avatar size={50} label={c[2]} bg={c[3]} />
        <div>
          <div style={{ width: 150, height: 12, borderRadius: 6, background: C.muted, opacity: 0.8 }} />
          <div style={{ width: 96, height: 10, borderRadius: 5, background: C.dim, marginTop: 9 }} />
        </div>
      </div>
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 1 - gone,
        perspective: 2200,
        fontFamily: F.sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "540px 760px",
          transform: `scale(${1.06 + dive * 5.2}) translateX(${shake}px)`,
          filter: dive > 0.02 ? `blur(${dive * 9}px)` : undefined,
        }}
      >
        <PhoneFrame
          style={{
            transform: `rotateX(${mix(11, 4, settle)}deg) rotateY(${mix(-16, -7, settle)}deg) rotateZ(${mix(2.5, 0.8, settle)}deg) scale(${mix(1.08, 1, settle)})`,
          }}
        >
          <PhoneList n={n} speed={speed} count={12 + Math.floor(n * 1.6)} />
        </PhoneFrame>
        {chips}
      </div>
    </div>
  );
};
