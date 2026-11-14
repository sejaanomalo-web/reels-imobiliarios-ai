import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, CheckDot, IconX, Tag } from "./ui";

/**
 * CENA 4 — O MÉTODO. "Antes do atendimento, faça três verificações." → checklist 1–2–3; cada item marca na palavra:
 * HISTÓRICO / IMÓVEL / PRÓXIMA PERGUNTA. "Se a negociação não seguir, registre o aprendizado e encerre o dia sem inventar uma
 * vitória." → o checklist sobe e vira um pequeno registro de visita (EXEMPLO ILUSTRATIVO): resultado, aprendizado digitado, a
 * "vitória inventada" é recusada e o dia é encerrado.
 */
const ROWS = [
  { k: "HISTÓRICO", sub: "do comprador" },
  { k: "IMÓVEL", sub: "pontos importantes" },
  { k: "PRÓXIMA PERGUNTA", sub: "para a conversa avançar" },
];
const LEARN = "prefere ficar perto da escola";

export const Metodo: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const card = sp(t, c.m_antes - 0.2, { damping: 15, stiffness: 140 });
  const head = sp(t, c.m_tres - 0.1, { damping: 13, stiffness: 180 });
  const row = ROWS.map((_, i) => sp(t, c.m_tres + 0.35 + i * 0.16, { damping: 14, stiffness: 180 }));
  const chk = [c.m_hist, c.m_imovel, c.m_perg].map((a) => prog(t, a + 0.1, 0.45, ease.out));
  const up = prog(t, c.m_se - 0.35, 0.7, ease.inOut);
  const log = sp(t, c.m_se - 0.1, { damping: 15, stiffness: 150 });
  const res = sp(t, c.m_se + 0.5, { damping: 13, stiffness: 190 });
  const typed = Math.round(prog(t, c.m_reg + 0.1, 1.1, ease.linear) * LEARN.length);
  const fake = sp(t, c.m_inv - 0.25, { damping: 12, stiffness: 200 });
  const noFake = prog(t, c.m_inv + 0.45, 0.35, ease.out);
  const close = sp(t, c.m_enc + 0.05, { damping: 11, stiffness: 210 });
  const out = prog(t, c.i_conf - 0.45, 0.4, ease.in);
  const caret = Math.floor(t * 2.6) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, card * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.m_antes - 0.2, s: 0.94, y: 40 },
          { t: c.m_hist, s: 1.0, y: 20, e: ease.inOut },
          { t: c.m_perg + 0.8, s: 1.05, y: 0, e: ease.linear },
          { t: c.m_se + 0.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.m_inv + 0.6, s: 1.04, y: 30, e: ease.inOut },
          { t: c.i_conf, s: 1.06, y: 30, e: ease.linear },
        ]}
      >
        {/* checklist */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%", transform: `translateY(${up * -160}px) scale(${mix(1, 0.55, up)})`, transformOrigin: "50% 15%", opacity: mix(1, 0.55, up) }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", opacity: 1 - up }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.14em", color: C.muted }}>ANTES DO ATENDIMENTO</div>
            <div style={{ fontWeight: 800, fontSize: 96, letterSpacing: "-0.045em", lineHeight: 1, color: C.text, marginTop: 14, opacity: Math.min(1, head * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, head))})` }}>
              <span style={{ color: BRAND.hex }}>3</span> VERIFICAÇÕES
            </div>
          </div>
          {ROWS.map((r, i) => (
            <Card key={r.k} tone={chk[i] > 0.5 ? "accent" : "plain"} style={{ left: 100, top: 560 + i * 170, width: 880, height: 146, padding: "0 34px", display: "flex", alignItems: "center", gap: 28, opacity: Math.min(1, row[i] * 1.5), transform: `translateX(${(1 - Math.min(1, row[i])) * 300}px) scale(${1 + 0.03 * Math.sin(Math.min(1, chk[i]) * Math.PI)})` }}>
              <CheckDot p={chk[i]} n={i + 1} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 52, letterSpacing: "-0.03em", color: chk[i] > 0.5 ? BRAND.hex : C.text }}>{r.k}</div>
                <div style={{ fontWeight: 600, fontSize: 32, color: C.muted, marginTop: 2 }}>{r.sub}</div>
              </div>
            </Card>
          ))}
        </div>
        {/* registro da visita */}
        {log > 0.001 ? (
          <Card style={{ left: 100, top: 640 + (1 - Math.min(1, log)) * 600, width: 880, padding: "34px 38px", opacity: Math.min(1, log * 1.5) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.12em", color: C.muted }}>REGISTRO DA VISITA</span>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={24} />
            </div>
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, res * 1.5) }}>
              <span style={{ fontWeight: 700, fontSize: 36, color: C.muted }}>Resultado:</span>
              <span style={{ fontWeight: 800, fontSize: 40, color: C.text }}>não seguiu</span>
            </div>
            <div style={{ marginTop: 20, fontWeight: 700, fontSize: 36, color: C.muted }}>Aprendizado:</div>
            <div style={{ marginTop: 6, minHeight: 56, fontWeight: 800, fontSize: 44, lineHeight: 1.15, color: BRAND.hex }}>
              {LEARN.slice(0, typed)}
              {typed > 0 && typed < LEARN.length ? <span style={{ display: "inline-block", width: 4, height: 44, marginLeft: 4, verticalAlign: "-6px", background: BRAND.hex, opacity: caret ? 1 : 0 }} /> : null}
            </div>
            {/* vitória inventada, recusada */}
            {fake > 0.001 ? (
              <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 24px", borderRadius: 20, background: C.surface3, border: `2px dashed ${noFake > 0.5 ? C.warn : C.line}`, opacity: Math.min(1, fake * 1.5) * mix(1, 0.5, noFake), transform: `scale(${mix(0.7, 1, Math.min(1, fake))})` }}>
                <span style={{ position: "relative", fontWeight: 800, fontSize: 38, color: C.text }}>
                  “Cliente quase fechou!”
                  <span style={{ position: "absolute", left: -6, top: "52%", height: 6, borderRadius: 3, width: `calc(${noFake * 100}% + 12px)`, background: C.warn }} />
                </span>
                {noFake > 0.3 ? <IconX size={44} /> : null}
              </div>
            ) : null}
            <div style={{ marginTop: 26, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ padding: "16px 30px", borderRadius: 999, background: close > 0.5 ? BRAND.hex : C.surface3, color: close > 0.5 ? BRAND.ink : C.muted, fontWeight: 800, fontSize: 34, transform: `scale(${1 + 0.12 * Math.sin(Math.min(1, close) * Math.PI)})` }}>
                {close > 0.5 ? "✓ DIA ENCERRADO" : "ENCERRAR O DIA"}
              </div>
            </div>
          </Card>
        ) : null}
      </Camera>
    </div>
  );
};
