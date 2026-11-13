import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Avatar, House, MapArt, Pin } from "../../../components/Art";
import type { SceneProps } from "../../types";

/**
 * CENA 02 — SITUAÇÃO. O mesmo cartão se divide em três janelas paralelas: o mesmo comprador
 * pesquisando bairros, simulando financiamento ou esperando vender o imóvel atual.
 * "A frase não explica o momento de compra": as três janelas convergem para um "?".
 */
const WIN = { y: 300, w: 290, h: 600 };
const XS = [70, 395, 720];
const ORIGIN = { x: 540, y: 698 }; // centro do cartão do lead ao fim do gancho

const Window: React.FC<{ i: number; label: string; t: number; at: number; exit: number; children: React.ReactNode }> = ({
  i,
  label,
  t,
  at,
  exit,
  children,
}) => {
  const s = sp(t, at + i * 0.08, { damping: 15, stiffness: 150 });
  const cx = XS[i] + WIN.w / 2;
  const cy = WIN.y + WIN.h / 2;
  const out = prog(exit, i * 0.12, 0.6, ease.in);
  return (
    <div
      style={{
        position: "absolute",
        left: XS[i],
        top: WIN.y,
        width: WIN.w,
        height: WIN.h,
        borderRadius: 34,
        background: C.surface,
        border: `1px solid ${C.line}`,
        boxShadow: "0 36px 80px rgba(0,0,0,0.5)",
        overflow: "hidden",
        opacity: Math.min(1, s * 1.6) * (1 - out),
        transform: `translate(${(1 - s) * (ORIGIN.x - cx) - out * 1250}px, ${(1 - s) * (ORIGIN.y - cy)}px) scale(${mix(0.35, 1, s)}) rotate(${(1 - s) * (i - 1) * 8 - out * 6}deg)`,
        filter: out > 0.02 ? `blur(${out * 10}px)` : undefined,
      }}
    >
      <div
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px 0 22px",
          background: C.surface2,
          borderBottom: `1px solid ${C.lineSoft}`,
        }}
      >
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em", color: C.muted }}>{label}</span>
        <Avatar size={42} label="MT" bg="#4A5F7A" />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, bottom: 0 }}>{children}</div>
    </div>
  );
};

const Slider: React.FC<{ label: string; value: string; p: number; y: number }> = ({ label, value, p, y }) => (
  <div style={{ position: "absolute", left: 24, right: 24, top: y }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{label}</span>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text, opacity: p > 0.1 ? 1 : 0.3 }}>{value}</span>
    </div>
    <div style={{ position: "relative", height: 12, borderRadius: 6, background: C.surface3, marginTop: 14 }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 6, background: C.accent }} />
      <div
        style={{
          position: "absolute",
          left: `calc(${p * 100}% - 14px)`,
          top: -8,
          width: 28,
          height: 28,
          borderRadius: 14,
          background: C.text,
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  </div>
);

export const Situacao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const exit = Math.max(0, t - (c.ten_start - 0.15));
  const at = c.sit_split - 0.06;

  // janela 1 — bairros
  const pins = [
    [64, 96],
    [168, 52],
    [206, 196],
  ].map(([x, y], k) => ({ x, y, s: sp(t, c.sit_map + k * 0.14, { damping: 9, stiffness: 200 }) }));
  // janela 2 — simulação
  const s1 = prog(t, c.sit_calc, 0.7, ease.inOut);
  const s2 = prog(t, c.sit_calc + 0.45, 0.8, ease.inOut);
  const press = Math.sin(Math.PI * Math.min(1, Math.max(0, (t - c.sit_calc - 1.3) / 0.25)));
  const result = prog(t, c.sit_calc + 1.45, 0.3, ease.out);
  // valor ilustrativo: sorteia enquanto "calcula" e congela; sem zero à esquerda, com separador de milhar
  const tick = Math.floor(Math.min(t, c.sit_calc + 2.1) * 12);
  const digits = t < c.sit_calc + 1.45 ? "•.•••" : (1000 + Math.floor(rnd(tick) * 8999)).toLocaleString("pt-BR");
  // janela 3 — venda do imóvel atual
  const sign = sp(t, c.sit_sign, { damping: 8, stiffness: 160 });
  // convergência para o "?"
  const phrase = sp(t, c.sit_phrase, { damping: 16, stiffness: 140 });
  const strike = prog(t, c.sit_unknown + 0.05, 0.4, ease.out);
  const unknown = sp(t, c.sit_unknown + 0.2, { damping: 11, stiffness: 180 });
  const bracket = prog(t, c.sit_unknown, 0.55, ease.inOut);
  const labelOut = prog(exit, 0.1, 0.5, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Window i={0} label="BAIRROS" t={t} at={at} exit={exit}>
        <div style={{ position: "absolute", left: 0, top: 0, width: WIN.w, height: 310 }}>
          <MapArt w={WIN.w} h={310} />
          {pins.map((p, k) => (
            <div
              key={k}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                opacity: Math.min(1, p.s * 3),
                transform: `translateY(${(1 - p.s) * -70}px)`,
                filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.5))",
              }}
            >
              <Pin size={40} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 24, top: 340, opacity: prog(t, c.sit_map + 0.3, 0.4, ease.out) }}>
          <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>comparando</div>
          <div style={{ fontWeight: 800, fontSize: 46, color: C.text, letterSpacing: "-0.03em" }}>3 bairros</div>
        </div>
      </Window>

      <Window i={1} label="FINANCIAMENTO" t={t} at={at} exit={exit}>
        <Slider label="Entrada" value="20%" p={0.2 * s1 + 0.02} y={34} />
        <Slider label="Prazo" value="30 anos" p={0.85 * s2 + 0.02} y={150} />
        <div style={{ position: "absolute", left: 24, top: 270 }}>
          <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>parcela simulada</div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 44, color: result > 0 ? C.accent : C.dim, marginTop: 6 }}>
            R$ {digits}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 24,
            right: 24,
            top: 410,
            height: 72,
            borderRadius: 22,
            background: C.accent,
            color: C.accentInk,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 30,
            transform: `scale(${1 - 0.06 * press})`,
          }}
        >
          Simular
        </div>
      </Window>

      <Window i={2} label="VENDA" t={t} at={at} exit={exit}>
        <div style={{ position: "absolute", left: 20, top: 40 }}>
          <House w={250} h={220} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 128,
            top: 170,
            opacity: Math.min(1, sign * 3),
            transformOrigin: "50% 100%",
            transform: `translateY(${(1 - Math.min(1, sign)) * -160}px) rotate(${(1 - sign) * 14 - 3}deg)`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 58,
              borderRadius: 8,
              background: C.paper,
              color: C.ink,
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 23,
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 18px rgba(0,0,0,0.5)",
            }}
          >
            VENDE-SE
          </div>
          <div style={{ width: 8, height: 64, marginLeft: 66, background: "#8A7A63" }} />
        </div>
        <div style={{ position: "absolute", left: 24, top: 340, opacity: prog(t, c.sit_sign + 0.35, 0.4, ease.out) }}>
          <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>imóvel atual</div>
          <div style={{ fontWeight: 800, fontSize: 46, color: C.text, letterSpacing: "-0.03em" }}>à venda</div>
        </div>
      </Window>

      {/* três possibilidades convergem para uma pergunta */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 1 - labelOut }}>
        {XS.map((x, i) => {
          const sx = x + WIN.w / 2;
          const len = Math.abs(sx - 540) + 60;
          return (
            <path
              key={i}
              d={`M${sx} 912V942H540V972`}
              fill="none"
              stroke={C.warn}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={`${len * bracket} ${len}`}
              opacity={bracket > 0 ? 0.8 : 0}
            />
          );
        })}
      </svg>
      {phrase > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 984,
            width: 800,
            height: 214,
            boxSizing: "border-box",
            borderRadius: 38,
            background: C.surface,
            border: `3px dashed ${unknown > 0 ? C.warn : "rgba(255,255,255,0.2)"}`,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "0 40px",
            opacity: Math.min(1, phrase * 1.5) * (1 - labelOut),
            transform: `translateY(${(1 - phrase) * 40 + labelOut * 200}px) scale(${mix(0.9, 1, phrase)})`,
            boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${70 * Math.min(1, unknown)}px rgba(255,107,94,0.22)`,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={{ fontWeight: 800, fontSize: 46, color: C.cold, opacity: mix(1, 0.5, strike) }}>“só olhando”</span>
              <div
                style={{
                  position: "absolute",
                  left: -6,
                  top: "54%",
                  height: 5,
                  width: `calc(${strike * 100}% + ${strike * 12}px)`,
                  opacity: strike > 0 ? 1 : 0,
                  borderRadius: 3,
                  background: C.warn,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: F.mono,
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: "0.1em",
                color: C.warn,
                marginTop: 14,
                opacity: Math.min(1, unknown * 1.5),
                transform: `translateX(${(1 - Math.min(1, unknown)) * 20}px)`,
              }}
            >
              MOMENTO DE COMPRA
            </div>
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1,
              color: C.warn,
              opacity: Math.min(1, unknown * 1.5),
              transform: `scale(${mix(0.4, 1, Math.min(1.2, unknown))})`,
            }}
          >
            ?
          </div>
        </div>
      ) : null}
    </div>
  );
};
