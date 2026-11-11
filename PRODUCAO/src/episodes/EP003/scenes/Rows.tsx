import React from "react";
import { C, F } from "../../../theme";
import { Avatar, IconCalendar, IconCheck, Pin } from "../../../components/Art";
import type { Person } from "./people";

/** Ícone por intenção (desenhos próprios). */
export const IntentIcon: React.FC<{ id: string; size: number }> = ({ id, size }) => {
  if (id === "ana") return <IconCalendar size={size} color={C.accent} stroke={2.2} />;
  if (id === "carla") return <Pin size={size * 0.8} />;
  const stroke = C.accent;
  if (id === "bruno")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M6 3h8l4 4v14H6z" stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <path d="M9 11h6M9 15h6M14 3v4h4" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      </svg>
    );
  if (id === "elisa")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 12l8-8h7v7l-8 8z" stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        <circle cx="15.5" cy="8.5" r="1.6" fill={stroke} />
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke={stroke} strokeWidth={2} />
      <circle cx="9" cy="11" r="2" stroke={stroke} strokeWidth={2} />
      <path d="M4 17l5-4 4 3 3-2 4 3" stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
};

export const Chip: React.FC<{ text: string; tone?: "accent" | "warn" | "muted" | "paper"; style?: React.CSSProperties }> = ({
  text,
  tone = "muted",
  style,
}) => {
  const pal = {
    accent: { bg: "rgba(53,224,161,0.16)", fg: C.accent, bd: "rgba(53,224,161,0.4)" },
    warn: { bg: "rgba(255,107,94,0.16)", fg: C.warn, bd: "rgba(255,107,94,0.45)" },
    muted: { bg: C.surface3, fg: C.muted, bd: "transparent" },
    paper: { bg: C.paper, fg: C.ink, bd: "transparent" },
  }[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 38,
        padding: "0 12px",
        borderRadius: 11,
        background: pal.bg,
        color: pal.fg,
        border: `1.5px solid ${pal.bd}`,
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 19,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {text}
    </span>
  );
};

/** Faixa de um contato (tela dividida → fila → fila priorizada). */
export const Row: React.FC<{
  p: Person;
  h: number;
  urgent: number;
  neutral: number;
  tags: number[];
  showTime: number;
  done: number;
  highlight: number;
  late: number;
}> = ({ p, h, urgent, neutral, tags, showTime, done, highlight, late }) => {
  const dot = neutral > 0.5 ? (p.group === "combinado" ? C.accent : C.dim) : urgent > 0.5 ? C.warn : "transparent";
  return (
    <div
      style={{
        position: "relative",
        height: h,
        boxSizing: "border-box",
        borderRadius: 30,
        background: C.surface,
        border: `2px solid ${highlight > 0.5 ? C.text : late > 0.5 ? "rgba(255,107,94,0.7)" : C.line}`,
        boxShadow: `0 24px 50px rgba(0,0,0,0.45), 0 0 ${60 * late}px rgba(255,107,94,${0.35 * late})`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 26px",
        overflow: "hidden",
        fontFamily: F.sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${done * 100}%`,
          background: "rgba(53,224,161,0.12)",
        }}
      />
      <div style={{ position: "relative" }}>
        <Avatar size={Math.min(84, h - 40)} label={p.ini} bg={p.bg} />
        <div
          style={{
            position: "absolute",
            right: -4,
            top: -4,
            width: 24,
            height: 24,
            borderRadius: 12,
            background: dot,
            border: dot === "transparent" ? "none" : `4px solid ${C.surface}`,
            boxSizing: "content-box",
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: "-0.02em" }}>{p.name}</span>
          {showTime > 0 ? (
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 21, color: C.muted, opacity: showTime }}>{p.time}</span>
          ) : null}
        </div>
        <div style={{ position: "relative", height: 40, marginTop: 4 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 26,
              color: C.muted,
              whiteSpace: "nowrap",
              overflow: "hidden",
              opacity: 1 - Math.max(...tags),
            }}
          >
            {p.msg}
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <Chip text={p.etapa.toUpperCase()} tone={p.group === "combinado" ? "accent" : "muted"} style={{ opacity: tags[0], transform: `translateY(${(1 - tags[0]) * 16}px)` }} />
            <Chip text={p.prazo.toUpperCase()} tone="paper" style={{ opacity: tags[1], transform: `translateY(${(1 - tags[1]) * 16}px)` }} />
          </div>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
        {urgent > 0 && neutral < 0.5 ? (
          <Chip text="URGENTE" tone="warn" style={{ transform: `scale(${urgent})` }} />
        ) : null}
        {done > 0.6 ? (
          <div style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconCheck size={32} />
          </div>
        ) : neutral < 0.5 && urgent <= 0 ? (
          <IntentIcon id={p.id} size={44} />
        ) : null}
      </div>
    </div>
  );
};
