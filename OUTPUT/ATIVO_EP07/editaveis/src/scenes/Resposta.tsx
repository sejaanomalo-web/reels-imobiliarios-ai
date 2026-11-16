import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconDoc, Msg, Tag } from "./ui";

/**
 * CENA 2 — A RESPOSTA QUE NÃO AJUDA (EXEMPLO ILUSTRATIVO). "Imagine que alguém pede informações de um apartamento." → o lead pergunta.
 * "Você responde com cinco mensagens prontas" → cinco balões prontos entram em rajada e se comprimem; "um PDF enorme" → o arquivo
 * cresce por cima da conversa; "e um convite para visitar" → "Vamos agendar uma visita?"; "antes de perguntar o que chamou atenção"
 * → o balão que faltou, tracejado: FALTOU PERGUNTAR. "A pessoa ainda está tentando entender…" → o lead digita "…" e hesita;
 * "…faz sentido." → a conversa recua e o título INFORMAÇÃO ≠ ORIENTAÇÃO assume a tela.
 */
const CANNED = ["Olá! Segue a apresentação.", "Lazer completo no condomínio.", "Temos várias opções na região!", "Veja as fotos abaixo.", "Fico à disposição!"];
const BOX = { x: 120, y: 300, w: 840, h: 960 };

export const Resposta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const burst = tl.series.canned ?? CANNED.map((_, i) => c.r_cinco + 0.3 + i * 0.3);
  const enter = sp(t, c.r_imag - 0.3, { damping: 15, stiffness: 150 });
  const ask = sp(t, c.r_info - 0.2, { damping: 13, stiffness: 190 });
  const n = burst.filter((b) => t >= b - 0.05).length;
  const pdf = sp(t, c.r_pdf - 0.05, { damping: 11, stiffness: 170 });
  const pdfBack = prog(t, c.r_conv - 0.3, 0.5, ease.inOut);
  const visit = sp(t, c.r_conv - 0.05, { damping: 13, stiffness: 200 });
  const ghost = sp(t, c.r_antes - 0.05, { damping: 12, stiffness: 190 });
  const typing = sp(t, c.r_pessoa - 0.1, { damping: 14, stiffness: 170 });
  const title = sp(t, c.r_sent - 0.3, { damping: 14, stiffness: 160 });
  const recede = prog(t, c.r_sent - 1.0, 0.8, ease.inOut);
  const out = prog(t, c.b_alt - 0.45, 0.4, ease.in);
  const pressure = Math.min(1, n / CANNED.length) * (1 - prog(t, c.r_antes, 0.6, ease.out));
  const jx = Math.sin(t * 41) * 5 * pressure;

  const gap = mix(118, 58, Math.min(1, Math.max(0, (n - 1) / 4)));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.r_imag - 0.3, s: 0.96, y: 40 },
          { t: c.r_info + 0.6, s: 1.04, y: 60, e: ease.inOut },
          { t: c.r_pdf + 0.2, s: 1.08, y: -20, r: -0.8, e: ease.inOut },
          { t: c.r_antes + 0.4, s: 1.02, y: 0, r: 0, e: ease.inOut },
          { t: c.r_sent - 1.0, s: 1.0, y: 0, e: ease.inOut },
          { t: c.r_sent - 0.2, s: 0.82, y: -175, e: ease.inOut },
          { t: c.b_alt, s: 0.8, y: -180, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: BOX.x + jx, top: BOX.y, width: BOX.w, height: BOX.h, boxSizing: "border-box", borderRadius: 44, background: C.bg1, border: `2px solid ${C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", overflow: "hidden", opacity: mix(1, 0.55, recede) }}>
          {/* cabeçalho genérico */}
          <div style={{ height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 30px", background: C.surface, borderBottom: `1px solid ${C.lineSoft}` }}>
            <Avatar size={62} label="L" bg="#4E6A8C" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 32, color: C.text }}>Lead do anúncio</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>{typing > 0.5 ? "digitando…" : "online"}</div>
            </div>
            <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={18} />
          </div>
          {/* pedido do lead */}
          <div style={{ position: "absolute", left: 30, top: 136, opacity: Math.min(1, ask * 1.5), transform: `translateY(${(1 - Math.min(1, ask)) * 40}px)` }}>
            <Msg side="in" size={34} style={{ maxWidth: 600 }}>Oi! Pode me passar informações do apartamento?</Msg>
          </div>
          {/* cinco mensagens prontas */}
          {CANNED.map((m, i) => {
            const a = sp(t, burst[i] - 0.06, { damping: 12, stiffness: 260 });
            if (a <= 0.001) return null;
            const y = 300 + i * gap;
            return (
              <div key={i} style={{ position: "absolute", right: 30 + (i % 2) * 18, top: y, opacity: Math.min(1, a * 1.5) * mix(1, 0.55, Math.max(0, n - 1 - i) / 4), transform: `translateX(${(1 - Math.min(1, a)) * 240}px) rotate(${(i % 2 ? 1 : -1) * 1.5 * pressure}deg)`, zIndex: i }}>
                <Msg side="out" size={32} style={{ whiteSpace: "nowrap" }}>{m}</Msg>
              </div>
            );
          })}
          {n > 0 ? (
            <div style={{ position: "absolute", right: 30, top: 262, transform: `scale(${mix(0.6, 1, Math.min(1, n / 5))})`, transformOrigin: "100% 50%", opacity: 1 - pdfBack * 0.4 }}>
              <Tag text={`${n}× MENSAGEM PRONTA`} tone="warn" size={24} />
            </div>
          ) : null}
          {/* o PDF enorme */}
          {pdf > 0.001 ? (
            <div style={{ position: "absolute", left: mix(120, -120, pdfBack), top: mix(330, 535, pdfBack), width: 600, height: 300, boxSizing: "border-box", borderRadius: 30, background: C.surface2, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 26, padding: "0 34px", transformOrigin: "50% 50%", transform: `scale(${mix(0.3, mix(1.32, 0.5, pdfBack), Math.min(1.05, pdf))})`, opacity: Math.min(1, pdf * 1.5) * (1 - prog(t, c.r_antes - 0.2, 0.4, ease.in)), boxShadow: "0 40px 100px rgba(0,0,0,0.7)", zIndex: 10 }}>
              <div style={{ width: 150, height: 190, borderRadius: 18, background: C.warn, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <IconDoc size={70} color="#fff" />
                <span style={{ fontWeight: 800, fontSize: 36, color: "#fff" }}>PDF</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>Apresentação completa</div>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, marginTop: 8 }}>ARQUIVO ENORME</div>
              </div>
            </div>
          ) : null}
          {/* convite para visitar */}
          {visit > 0.001 ? (
            <div style={{ position: "absolute", right: 30, top: 650 + (1 - Math.min(1, visit)) * 60, opacity: Math.min(1, visit * 1.5), zIndex: 12 }}>
              <Msg side="out" size={36} tone="warn">Vamos agendar uma visita?</Msg>
            </div>
          ) : null}
          {/* a pergunta que faltou */}
          {ghost > 0.001 ? (
            <div style={{ position: "absolute", left: 30, right: 30, top: 770, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, opacity: Math.min(1, ghost * 1.5), transform: `scale(${mix(0.8, 1, Math.min(1, ghost))})`, transformOrigin: "100% 0", zIndex: 13 }}>
              <div style={{ padding: "18px 24px", borderRadius: 30, borderBottomRightRadius: 8, border: `3px dashed ${C.muted}`, fontWeight: 700, fontSize: 34, color: C.muted, background: "rgba(7,8,10,0.7)" }}>O que chamou sua atenção?</div>
              <Tag text="FALTOU PERGUNTAR" tone="warn" size={24} />
            </div>
          ) : null}
          {/* o lead hesita */}
          {typing > 0.001 ? (
            <div style={{ position: "absolute", left: 30, top: 830, display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, typing * 1.5) * (1 - prog(t, c.r_sent, 0.5, ease.out) * 0.3), zIndex: 14 }}>
              <div style={{ padding: "20px 28px", borderRadius: 30, borderBottomLeftRadius: 8, background: C.surface3, display: "flex", gap: 10 }}>
                {[0, 1, 2].map((k) => (
                  <div key={k} style={{ width: 16, height: 16, borderRadius: 8, background: C.muted, opacity: 0.4 + 0.6 * Math.max(0, Math.sin(t * 7 - k * 0.9)) }} />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: 60, color: C.muted, transform: `rotate(${Math.sin(t * 3) * 8}deg)` }}>?</span>
            </div>
          ) : null}
        </div>
      </Camera>
      {/* título da virada — fora da câmera para não sair de quadro */}
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, textShadow: "0 8px 30px rgba(0,0,0,0.85)", opacity: Math.min(1, title * 1.5) * (1 - out), transform: `translateY(${(1 - Math.min(1, title)) * 40}px)` }}>
          INFORMAÇÃO
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <span style={{ color: C.warn, fontSize: 96 }}>≠</span> ORIENTAÇÃO
          </div>
        </div>
      ) : null}
    </div>
  );
};
