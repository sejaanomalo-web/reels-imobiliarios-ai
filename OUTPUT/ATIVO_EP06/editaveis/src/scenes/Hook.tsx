import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Node, STAGES, Tag } from "./ui";

/**
 * CENA 1 — GANCHO (versão corretor). "Você atende contatos, agenda visitas, cadastra imóveis e passa o dia ocupado." → fluxo
 * ENTRADA → ATENDIMENTO → VISITA → NEGOCIAÇÃO já vivo no quadro 0 (pontos correndo), e as atividades acendem na fala.
 * "Mesmo assim, algumas oportunidades param no caminho." → um ponto trava entre ATENDIMENTO e VISITA e o elo fica vermelho.
 * "…É onde a operação está perdendo continuidade." → lupa no elo quebrado: ONDE ESTÁ O GARGALO? Sem números.
 */
const NX = 100;
const NY = [470, 650, 830, 1010];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const nodes = STAGES.map((_, i) => sp(t, 0.02 + i * 0.12, { damping: 14, stiffness: 190 }));
  const acts = [c.h_cont, c.h_vis, c.h_imo, c.h_equipe].map((a) => sp(t, a - 0.05, { damping: 11, stiffness: 220 }));
  const stuck = prog(t, c.h_param - 0.1, 0.4, ease.out);
  const work = prog(t, c.h_perg, 0.4, ease.out) * (1 - prog(t, c.h_onde - 0.2, 0.3, ease.in));
  const lens = prog(t, c.h_onde - 0.1, 0.7, ease.inOut);
  const q = sp(t, c.h_onde + 0.2, { damping: 13, stiffness: 170 });
  const out = prog(t, c.c_acomp - 0.45, 0.4, ease.in);
  // pontos correndo pelo fluxo (cada um desce do topo ao fim; depois do "param", os que chegam ao elo 1→2 travam)
  const dots = Array.from({ length: 7 }).map((_, k) => {
    const u = (t * 0.32 + k / 7) % 1;
    const y = mix(NY[0] + 56, NY[3] + 56, u);
    const blocked = stuck > 0.5 && y > NY[1] + 112 && y < NY[2] + 40 && k % 2 === 0;
    return { y: blocked ? NY[1] + 140 + (k % 3) * 6 : y, blocked, a: Math.sin(u * Math.PI) };
  });

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.08, y: 40, r: -1 },
          { t: c.h_ocup + 0.4, s: 1.0, y: 0, r: 0, e: ease.out },
          { t: c.h_param + 0.5, s: 1.08, y: 20, e: ease.inOut },
          { t: c.h_onde + 0.8, s: 1.1, x: -20, y: 30, e: ease.inOut },
          { t: c.c_acomp, s: 1.12, x: -20, y: 30, e: ease.linear },
        ]}
      >
        {/* título */}
        <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 78, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, nodes[0] * 1.5) * (1 - Math.min(1, q * 1.5)) }}>
          {work > 0.5 ? (
            <>
              VOCÊ <span style={{ color: BRAND.hex }}>TRABALHANDO</span>
            </>
          ) : (
            <>
              DIA <span style={{ color: BRAND.hex }}>CHEIO</span>
            </>
          )}
        </div>
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 78, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 40}px)` }}>
            ONDE ESTÁ O <span style={{ color: C.warn }}>GARGALO?</span>
          </div>
        ) : null}
        {/* linha do fluxo */}
        <div style={{ position: "absolute", left: NX + 60, top: NY[0] + 56, width: 8, height: NY[3] - NY[0], borderRadius: 4, background: BRAND.hex, opacity: 0.35 }} />
        {stuck > 0.01 ? (
          <div style={{ position: "absolute", left: NX + 60, top: NY[1] + 112, width: 8, height: NY[2] - NY[1] - 112, background: `repeating-linear-gradient(180deg, ${C.warn} 0 14px, transparent 14px 26px)`, opacity: stuck }} />
        ) : null}
        {dots.map((d, k) => (
          <div key={k} style={{ position: "absolute", left: NX + 64 - 14, top: d.y - 14, width: 28, height: 28, borderRadius: 14, background: d.blocked ? C.warn : BRAND.hex, boxShadow: `0 0 18px ${d.blocked ? "rgba(255,107,94,0.7)" : brandAlpha(0.7)}`, opacity: d.blocked ? 1 : d.a }} />
        ))}
        {/* etapas */}
        {STAGES.map((s, i) => (
          <div key={s} style={{ position: "absolute", left: NX, top: NY[i] }}>
            <Node label={s} state={stuck > 0.5 && (i === 1 || i === 2) ? "warn" : "ok"} p={nodes[i]} w={480} />
          </div>
        ))}
        {/* atividades (à direita) */}
        {["CONTATOS", "VISITAS", "IMÓVEIS", "DIA OCUPADO"].map((a, i) => (
          <div key={a} style={{ position: "absolute", left: NX + 510, top: NY[i] + 30, opacity: Math.min(1, acts[i] * 1.5), transform: `translateX(${(1 - Math.min(1, acts[i])) * 80}px) scale(${mix(0.6, 1, Math.min(1.08, acts[i]))})` }}>
            <Tag text={`✓ ${a}`} tone="accent" size={26} />
          </div>
        ))}
        {/* trava */}
        {stuck > 0.3 ? (
          <div style={{ position: "absolute", left: NX + 100, top: NY[1] + 130, opacity: stuck }}>
            <Tag text="PAROU AQUI" tone="warn" size={28} />
          </div>
        ) : null}
        {/* lupa */}
        {lens > 0.01 ? (
          <div style={{ position: "absolute", left: NX + 64 - 110, top: NY[1] + 160 - 110 + (1 - lens) * 300, width: 220, height: 220, borderRadius: 110, border: `12px solid ${C.text}`, opacity: lens, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: 180, top: 180, width: 30, height: 110, borderRadius: 15, background: C.text, transform: "rotate(-45deg)", transformOrigin: "50% 0" }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
