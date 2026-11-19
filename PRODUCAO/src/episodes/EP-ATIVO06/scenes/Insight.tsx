import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Avatar, Node, STAGES, Tag, TEAM } from "./ui";

/**
 * CENA 5 — INSIGHT (versão corretor). "Um bom corretor não precisa lembrar cada mensagem." → uma nuvem de mensagens se dissolve.
 * "Precisa enxergar responsabilidades, etapas e pendências para agir quando algo sai do fluxo." → o fluxo do gancho volta a
 * funcionar, agora com um responsável em cada etapa e as pendências à vista; um ponto sai do fluxo, é sinalizado e volta.
 */
const NX = 100;
const NY = [470, 650, 830, 1010];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const cloud = prog(t, c.g_boa - 0.2, 0.5, ease.out) * (1 - prog(t, c.g_enx - 0.2, 0.5, ease.in));
  const flow = prog(t, c.g_enx - 0.1, 0.6, ease.out);
  const resp = sp(t, c.g_resp - 0.05, { damping: 12, stiffness: 200 });
  const etap = prog(t, c.g_etap - 0.05, 0.3, ease.out);
  const pend = sp(t, c.g_pend - 0.05, { damping: 12, stiffness: 200 });
  const off = prog(t, c.g_sai - 0.1, 0.5, ease.out) * (1 - prog(t, c.g_sai + 0.9, 0.5, ease.inOut));
  const flag = sp(t, c.g_sai + 0.2, { damping: 10, stiffness: 230 }) * (1 - prog(t, c.g_sai + 1.2, 0.3, ease.in));
  const out = prog(t, c.cta_se - 0.35, 0.3, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.g_boa - 0.3, s: 1.06, y: 20 },
          { t: c.g_enx, s: 1.0, y: 0, e: ease.inOut },
          { t: c.g_sai + 0.4, s: 1.06, x: 60, y: 30, e: ease.inOut },
          { t: c.cta_se, s: 1.03, x: 0, y: 0, e: ease.inOut },
        ]}
      >
        <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 74, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text }}>
          {flow > 0.5 ? (
            <>
              ENXERGAR <span style={{ color: BRAND.hex }}>O FLUXO</span>
            </>
          ) : (
            <>
              NÃO É LEMBRAR <span style={{ color: C.warn }}>CADA MENSAGEM</span>
            </>
          )}
        </div>
        {/* nuvem de mensagens */}
        {cloud > 0.01
          ? Array.from({ length: 16 }).map((_, k) => (
              <div key={k} style={{ position: "absolute", left: 80 + rnd(k * 3.1) * 640, top: 470 + rnd(k * 5.7) * 640 + Math.sin(t * 1.5 + k) * 10, padding: "14px 20px", borderRadius: 20, background: C.surface3, color: C.muted, fontWeight: 700, fontSize: 26, opacity: cloud * (0.5 + 0.5 * rnd(k)), filter: `blur(${(1 - cloud) * 6}px)` }}>
                {["Oi!", "Alguma novidade?", "Pode ser amanhã?", "Enviei os docs", "Qual o valor?", "Vou ver e te falo", "Ok!", "E a proposta?"][k % 8]}
              </div>
            ))
          : null}
        {/* fluxo de volta, com responsáveis e pendências */}
        {flow > 0.01 ? (
          <div style={{ opacity: flow }}>
            <div style={{ position: "absolute", left: NX + 60, top: NY[0] + 56, width: 8, height: NY[3] - NY[0], borderRadius: 4, background: BRAND.hex, opacity: 0.5 }} />
            {Array.from({ length: 6 }).map((_, k) => {
              const u = (t * 0.35 + k / 6) % 1;
              const isOff = k === 2 && off > 0.01;
              const y = mix(NY[0] + 56, NY[3] + 56, u);
              return <div key={k} style={{ position: "absolute", left: NX + 64 - 14 + (isOff ? off * 180 : 0), top: (isOff ? NY[2] + 60 : y) - 14, width: 28, height: 28, borderRadius: 14, background: isOff ? C.warn : BRAND.hex, boxShadow: `0 0 18px ${isOff ? "rgba(255,107,94,0.7)" : brandAlpha(0.7)}`, opacity: isOff ? 1 : Math.sin(u * Math.PI) }} />;
            })}
            {STAGES.map((s, i) => (
              <div key={s} style={{ position: "absolute", left: NX, top: NY[i] }}>
                <Node label={s} state={etap > 0.5 ? "ok" : "idle"} p={1} w={480}>
                  {resp > 0.01 ? (
                    <div style={{ transform: `scale(${mix(0.3, 1, Math.min(1.1, resp))})` }}>
                      <Avatar ini={TEAM[i].ini} bg={TEAM[i].bg} size={60} ring={BRAND.hex} />
                    </div>
                  ) : null}
                </Node>
              </div>
            ))}
            {pend > 0.01
              ? ["Retorno hoje", "Visita sáb.", "Enviar docs", "Proposta"].map((p, i) => (
                  <div key={p} style={{ position: "absolute", left: NX + 510, top: NY[i] + 32, transform: `scale(${mix(0.4, 1, Math.min(1.08, pend))})`, opacity: Math.min(1, pend * 1.5) }}>
                    <Tag text={`PENDÊNCIA: ${p.toUpperCase()}`} tone={i === 2 && flag > 0.3 ? "warn" : "accent"} size={24} />
                  </div>
                ))
              : null}
            {flag > 0.01 ? (
              <div style={{ position: "absolute", left: NX + 230, top: NY[2] + 120, transform: `scale(${mix(0.3, 1, Math.min(1.1, flag))})` }}>
                <Tag text="SAIU DO FLUXO → AGIR" tone="warn" size={28} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
