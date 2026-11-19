import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, Folder, Paper, People, Rule, Tag } from "./ui";

/**
 * CENA 2 — A IRONIA. "Fechou parceria? Ótimo. Não registre quem fez o quê." → regra 1 + dois parceiros (ilustrativos) sem registro.
 * "Recebeu comissão? Melhor ainda: misture os comprovantes com os seus arquivos pessoais." → regra 2; comprovantes e fotos pessoais se
 * embaralham. "E, quando alguém pedir documentação, tenta lembrar tudo pela conversa do WhatsApp." → regra 3; balões de uma conversa
 * genérica rolando sem fim (sem marca). "Perfeito para criar confusão." → a pasta COMISSÃO explode em papéis. Texto-chave: MANUAL DO
 * IMPROVISO. Sem alíquotas nem simulações.
 */
const RULES = ["NÃO REGISTRE QUEM FEZ O QUÊ", "MISTURE COM ARQUIVOS PESSOAIS", "PROCURE TUDO NA CONVERSA"];

export const Iro: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.i_fech - 0.35, { damping: 15, stiffness: 150 });
  const r = [c.i_nao, c.i_mist, c.i_lemb].map((x) => sp(t, x - 0.2, { damping: 13, stiffness: 190 }));
  const done = [c.i_rec, c.i_quando, c.i_perf].map((x) => prog(t, x - 0.1, 0.3, ease.out));
  const ph = t < c.i_rec - 0.2 ? 0 : t < c.i_quando - 0.2 ? 1 : t < c.i_perf - 0.2 ? 2 : 3;
  const p0 = sp(t, c.i_fech - 0.1, { damping: 12, stiffness: 190 });
  const ok = sp(t, c.i_otimo - 0.1, { damping: 11, stiffness: 210 });
  const mixp = prog(t, c.i_mist - 0.1, 1.2, ease.inOut);
  const scroll = t - c.i_quando;
  const boom = prog(t, c.i_conf - 0.4, 0.9, ease.out);
  const out = prog(t, c.r_serio - 0.45, 0.4, ease.in);
  const phIn = (k: number, at: number) => (ph === k ? prog(t, at - 0.3, 0.35, ease.out) : 0);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.i_fech - 0.35, s: 1.05, y: 0 },
          { t: ((c.i_fech - 0.35) + (c.i_otimo + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.i_otimo + 0.2, s: 1.09, x: 0, y: -15, e: ease.inOut },
          { t: ((c.i_otimo + 0.2) + (c.i_nao + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.i_nao + 0.2, s: 1.05, x: -10, y: -10, e: ease.inOut },
          { t: ((c.i_nao + 0.2) + (c.i_mist + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.i_mist + 0.2, s: 1.09, x: 10, y: -15, e: ease.inOut },
          { t: ((c.i_mist + 0.2) + (c.i_pess + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.i_pess + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.i_pess + 0.2) + (c.i_lemb + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.i_lemb + 0.2, s: 1.09, x: -10, y: -15, e: ease.inOut },
          { t: ((c.i_lemb + 0.2) + (c.i_conv + 0.3)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.i_conv + 0.3, s: 1.05, x: 10, y: -10, e: ease.inOut },
          { t: ((c.i_conv + 0.3) + (c.i_conf + 0.3)) / 2, s: 1.145, x: 12, y: -18, e: ease.inOut },
          { t: c.i_conf + 0.3, s: 1.12, x: 0, y: -25, e: ease.inOut },
          { t: c.r_serio, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, right: 100, top: 420, display: "flex", flexDirection: "column", gap: 22 }}>
          {RULES.map((k, i) => (r[i] > 0.001 ? <Rule key={k} n={`0${i + 1}`} text={k} p={r[i]} done={done[i]} /> : <div key={k} style={{ height: 64, borderRadius: 18, border: `3px dashed ${C.dim}`, opacity: 0.5 + 0.3 * Math.sin(t * 3 + i) }} />))}
        </div>
        {/* fase 0: parceria */}
        {ph === 0 && p0 > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: Math.min(1, p0 * 1.5) }}>
            <div style={{ display: "flex", gap: mix(140, 30, Math.min(1, p0)), transform: `translateY(${Math.sin(t * 2.6) * 14}px) rotate(${Math.sin(t * 1.9) * 3}deg)` }}>
              <div style={{ padding: "12px 18px 4px", borderRadius: 22, background: C.surface, border: `2px solid ${C.line}` }}><People n={1} size={100} /></div>
              <div style={{ alignSelf: "center", fontWeight: 800, fontSize: 60, color: C.muted }}>+</div>
              <div style={{ padding: "12px 18px 4px", borderRadius: 22, background: C.surface, border: `2px solid ${C.line}` }}><People n={1} size={100} /></div>
            </div>
            {ok > 0.001 ? <div style={{ opacity: Math.min(1, ok * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.1, ok))})` }}><Chip text="PARCERIA? ÓTIMO." size={32} /></div> : null}
            {r[0] > 0.5 ? <Tag text="QUEM FEZ O QUÊ? —" tone="warn" size={26} /> : null}
          </div>
        ) : null}
        {/* fase 1: misturar */}
        {ph === 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 820, height: 420, opacity: Math.max(0.001, phIn(1, c.i_rec)) }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const isPhoto = i % 2 === 1;
              const x0 = isPhoto ? 640 : 160, y0 = 30 + (i >> 1) * 70;
              const x1 = 140 + rnd(i * 3) * 640, y1 = rnd(i * 5 + 2) * 230;
              return (
                <div key={i} style={{ position: "absolute", left: mix(x0, x1, mixp), top: mix(y0, y1, mixp), transform: `rotate(${mix(0, (rnd(i) - 0.5) * 50, mixp) + Math.sin(t * 2 + i) * 3}deg)` }}>
                  {isPhoto ? <div style={{ width: 150, height: 120, borderRadius: 10, background: "#3A4A5A", border: "6px solid #E8E6E0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text }}>FOTO</div> : <Paper w={120} label="RECIBO" />}
                </div>
              );
            })}
          </div>
        ) : null}
        {/* fase 2: conversa infinita */}
        {ph === 2 ? (
          <div style={{ position: "absolute", left: 220, right: 220, top: 820, height: 400, borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, overflow: "hidden", opacity: Math.max(0.001, phIn(2, c.i_quando)) }}>
            <div style={{ position: "absolute", left: 20, right: 20, top: 20 - ((scroll * 260) % 600) }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{ marginTop: 14, display: "flex", justifyContent: i % 2 ? "flex-end" : "flex-start" }}>
                  <div style={{ width: `${50 + rnd(i * 7) * 40}%`, height: 46, borderRadius: 18, background: i % 2 ? C.surface3 : "#2A3138" }} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center" }}><Tag text="CONVERSA (ILUSTRATIVA) · PROCURANDO…" tone="muted" size={24} style={{ color: C.text }} /></div>
          </div>
        ) : null}
        {/* fase 3: confusão */}
        {ph === 3 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 820, height: 420 }}>
            <div style={{ position: "absolute", left: 380, top: 80, opacity: 1 - boom * 0.6, transform: `scale(${mix(1, 0.8, boom)}) rotate(${Math.sin(t * 20) * 4 * (1 - boom)}deg)` }}><Folder w={320} label="COMISSÃO" tone="warn" open={boom} /></div>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const d = boom * (240 + rnd(i) * 160);
              return <div key={i} style={{ position: "absolute", left: 480 + Math.cos(a) * d, top: 160 + Math.sin(a) * d * 0.6, opacity: boom, transform: `rotate(${boom * (rnd(i * 3) - 0.5) * 300}deg)` }}><Paper w={90} /></div>;
            })}
            <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center", opacity: prog(t, c.i_conf, 0.3, ease.out) }}><Chip text="CONFUSÃO ✓" tone="warn" size={34} /></div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        MANUAL DO <span style={{ color: C.warn }}>IMPROVISO</span>
      </div>
    </div>
  );
};
