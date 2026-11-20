import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_30 — "O corretor digital de verdade" (fecho do lote). Conexão Imobiliária Secovi-SP (nov/2026): ferramentas digitais, gestão
 * de leads e jornadas de compra. Apps e módulos ILUSTRATIVOS e genéricos (sem marcas); sem demonstração de produto real; sem simular
 * envio automático de Direct. Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 12) => Math.sin(t * 1.7 + k) * a;
const APPS = [{ e: "💬", k: "CONVERSAS" }, { e: "📧", k: "E-MAIL" }, { e: "📒", k: "ANOTAÇÕES" }, { e: "📊", k: "PLANILHA" }, { e: "🗂️", k: "PASTAS" }];
const POS = [{ x: -330, y: -170 }, { x: 330, y: -150 }, { x: -360, y: 130 }, { x: 350, y: 150 }, { x: 0, y: 270 }];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const me = sp(t, -0.2, { damping: 12, stiffness: 180 });
  const apps = prog(t, c.h_apps - 0.6, 0.8, ease.out);
  const no = sp(t, c.h_nao - 0.2, { damping: 10, stiffness: 230 });
  const thread = prog(t, c.h_cont - 0.3, Math.max(0.8, c.h_ctx - c.h_cont + 0.4), ease.inOut);
  const out = prog(t, c.a_secovi - 0.35, 0.3, ease.in);
  const cx = 540, cy = 760;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.06, x: 4, y: -6 }, { t: 1.0, s: 1.1, x: -4, y: -12, e: ease.out }, { t: c.h_apps, s: 1.06, x: 4, y: -18, e: ease.linear }, { t: c.h_ctx, s: 1.09, x: 0, y: -22, e: ease.out }, { t: c.a_secovi, s: 1.06, y: -24, e: ease.linear }]}>
        <div style={{ position: "absolute", left: cx - 60, top: cy - 70, opacity: fade(me), transform: `translateY(${fl(t, 0, 8)}px)` }}><Person size={120} t={t} color={A.hex} /></div>
        {APPS.map((a, i) => (
          <div key={a.k} style={{ position: "absolute", left: cx + POS[i].x * Math.min(1, apps) - 70, top: cy + POS[i].y * Math.min(1, apps) - 50, width: 140, height: 100, borderRadius: 22, background: C.surface, border: `2px solid ${C.surface3}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, opacity: fade(apps) * mix(1, 0.35, thread), transform: `rotate(${Math.sin(t * 2 + i) * 8}deg) translateY(${Math.sin(t * 2.6 + i) * 10}px)` }}>
            <span style={{ fontSize: 40 }}>{a.e}</span><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>APP</span>
          </div>
        ))}
        {no > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", opacity: fade(no) * (1 - fade(thread)) }}><Tag text="✕ MAIS APLICATIVOS" tone="warn" size={28} /></div> : null}
        {thread > 0.001 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d={`M 160 ${cy + 10} C 360 ${cy - 140}, 720 ${cy + 160}, 920 ${cy + 10}`} fill="none" stroke={A.hex} strokeWidth={8} strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - thread)} />
          </svg>
        ) : null}
        {thread > 0.3 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", gap: 12, opacity: fade(thread) }}><Tag text="✓ CONTINUIDADE" tone="accent" size={28} /><Tag text="✓ CONTEXTO" tone="accent" size={28} /></div> : null}
      </Camera>
      <Title p={title} size={60}>COMENTE <span style={{ color: A.hex }}>“SISTEMA”</span></Title>
    </div>
  );
};

const TOPICS = [{ k: "FERRAMENTAS DIGITAIS", at: "a_ferr" }, { k: "GESTÃO DE LEADS", at: "a_gest" }, { k: "NOVAS JORNADAS", at: "a_jorn" }];

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_secovi - 0.35, { damping: 15, stiffness: 150 });
  const ev = sp(t, c.a_secovi - 0.1, { damping: 12, stiffness: 200 });
  const tp = TOPICS.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const scat = prog(t, c.a_espalhar - 0.3, 0.9, ease.out);
  const five = sp(t, c.a_cinco - 0.2, { damping: 10, stiffness: 230 });
  const out = prog(t, c.b_proc - 0.4, 0.35, ease.in);
  const cx = 540, cy = 800;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_secovi - 0.35, s: 1.05, y: 0 }, { t: c.a_secovi + 0.8, s: 1.08, x: -4, y: -8, e: ease.out }, { t: c.a_jorn, s: 1.06, x: 4, y: -14, e: ease.linear }, { t: c.a_cinco, s: 1.09, x: 0, y: -20, e: ease.out }, { t: c.b_proc, s: 1.06, y: -24, e: ease.linear }]}>
        {ev > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center", opacity: fade(ev) * (1 - fade(scat)) }}><Tag text="CONEXÃO IMOBILIÁRIA · SECOVI-SP · NOV/2026" tone="muted" size={24} /></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: 1 - fade(scat) * 0.85 }}>
          {TOPICS.map((x, i) => tp[i] > 0.001 ? <div key={x.k} style={{ opacity: fade(tp[i]), transform: `scale(${mix(0.5, 1, Math.min(1.08, tp[i]))}) translateX(${Math.sin(t * 2 + i) * 10}px)` }}><Tag text={x.k} tone="accent" size={30} /></div> : null)}
        </div>
        {scat > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: cx - 60, top: cy - 70, opacity: fade(scat) }}><Person size={120} t={t} color={C.text} /></div>
            {APPS.map((a, i) => (
              <div key={a.k} style={{ position: "absolute", left: cx + POS[i].x * Math.min(1, scat) - 80, top: cy + POS[i].y * Math.min(1, scat) - 60, width: 160, height: 120, borderRadius: 22, background: C.surface, border: `2px solid ${five > 0.5 ? "rgba(255,107,94,0.6)" : C.surface3}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, opacity: fade(scat), transform: `rotate(${Math.sin(t * 2.2 + i) * 10}deg) translateY(${Math.sin(t * 2.6 + i) * 12}px)` }}>
                <span style={{ fontSize: 40 }}>{a.e}</span><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{a.k}</span>
                {five > 0.5 ? <div style={{ position: "absolute", right: -10, top: -10, width: 34, height: 34, borderRadius: 17, background: C.warn, color: "#fff", fontWeight: 800, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>?</div> : null}
              </div>
            ))}
          </>
        ) : null}
        {five > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", opacity: fade(five), transform: `scale(${mix(0.5, 1, Math.min(1.08, five))})` }}><Tag text="INFORMAÇÃO ESPALHADA EM 5 LUGARES" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>DIGITAL <span style={{ color: C.warn }}>NÃO É SINÔNIMO</span></span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DE ORGANIZADO</span></Title>
    </div>
  );
};

const FLOW = [{ k: "LEAD", ic: "📩", at: "b_lead" }, { k: "PERFIL", ic: "🧭", at: "b_ent" }, { k: "IMÓVEIS", ic: "🏘️", at: "b_reg" }, { k: "PRÓXIMO PASSO", ic: "📅", at: "b_comb" }, { k: "DECISÃO", ic: "🤝", at: "b_acomp" }];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_proc - 0.35, { damping: 15, stiffness: 150 });
  const fs = FLOW.map((x) => sp(t, c[x.at] - 0.15, { damping: 11, stiffness: 220 }));
  const brk = prog(t, c.b_some - 0.2, 0.4, ease.out) * (1 - prog(t, c.b_naores + 0.6, 0.6, ease.inOut));
  const fix = prog(t, c.b_naores + 0.6, 0.6, ease.inOut);
  const out = prog(t, c.c_dif - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_proc - 0.35, s: 1.05, y: 0 }, { t: c.b_proc + 0.8, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.b_reg, s: 1.06, x: -4, y: -14, e: ease.linear }, { t: c.b_some, s: 1.1, x: 0, y: -22, e: ease.out }, { t: c.c_dif, s: 1.06, y: -26, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, right: 130, top: 480, display: "flex", flexDirection: "column", gap: 0 }}>
          {FLOW.map((f, i) => {
            const broken = i === 3 && brk > 0.3;
            return (
              <React.Fragment key={f.k}>
                <div style={{ height: 88, boxSizing: "border-box", borderRadius: 22, background: broken ? WARN_BG : fs[i] > 0.5 ? aa(0.1) : C.surface, border: `2px ${broken ? "dashed" : fs[i] > 0.5 ? "solid" : "dashed"} ${broken ? "rgba(255,107,94,0.8)" : fs[i] > 0.5 ? A.hex : C.dim}`, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", opacity: (broken ? 0.55 : 1) * mix(0.3, 1, Math.min(1, fs[i] * 2)), transform: `translateX(${(1 - Math.min(1, fs[i])) * 50 + Math.sin(t * 2 + i) * 8 + (broken ? Math.sin(t * 30) * 4 : 0)}px)` }}>
                  <span style={{ fontSize: 42 }}>{f.ic}</span>
                  <span style={{ flex: 1, fontWeight: 800, fontSize: 32, color: C.text }}>{f.k}</span>
                  {broken ? <Tag text="SUMIU" tone="warn" size={24} /> : i === 3 && fix > 0.5 ? <Tag text="✓ CORRIGIDO" tone="accent" size={24} /> : null}
                </div>
                {i < 4 ? <div style={{ height: 22, marginLeft: 52, width: 6, borderRadius: 3, background: (i === 2 || i === 3) && brk > 0.3 ? C.warn : fs[i + 1] > 0.5 ? A.hex : C.dim, opacity: (i === 2 || i === 3) && brk > 0.3 ? 0.4 : 1 }} /> : null}
              </React.Fragment>
            );
          })}
        </div>
        {brk > 0.3 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1090, display: "flex", justifyContent: "center", opacity: fade(brk) }}><Tag text="A TECNOLOGIA NÃO RESOLVEU" tone="warn" size={28} /></div> : null}
      </Camera>
      <Title p={enter} size={48}><span style={{ whiteSpace: "nowrap" }}>LEAD → PERFIL →</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>IMÓVEIS → PRÓXIMO PASSO</span></Title>
    </div>
  );
};

const MODS = ["RELATÓRIOS", "AGENDA", "FUNIL", "ETIQUETAS", "PORTAIS", "CONTRATOS", "METAS", "ROTAS", "CHAT", "ARQUIVOS", "TAREFAS", "PAINEL"];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_dif - 0.35, { damping: 15, stiffness: 150 });
  const grid = sp(t, c.c_dif - 0.1, { damping: 13, stiffness: 170 });
  const many = sp(t, c.c_funcoes - 0.2, { damping: 11, stiffness: 220 });
  const org = prog(t, c.c_forma - 0.2, 1.0, ease.inOut);
  const you = sp(t, c.c_voce - 0.2, { damping: 11, stiffness: 220 });
  const acc = sp(t, c.c_acess - 0.2, { damping: 11, stiffness: 220 });
  const fin = sp(t, c.x_proc - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_dif - 0.35, s: 1.05, y: 0 }, { t: c.c_dif + 0.9, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.c_forma, s: 1.06, x: -4, y: -14, e: ease.linear }, { t: c.c_acess, s: 1.08, x: 0, y: -20, e: ease.linear }, { t: c.x_ferr + 0.3, s: 1.05, y: -26, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 130, right: 130, top: 490, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, opacity: fade(grid) * (1 - org) * (1 - fade(fin)) }}>
          {MODS.map((m, i) => <div key={m} style={{ height: 80, borderRadius: 16, background: C.surface, border: `2px solid ${many > 0.5 ? "rgba(255,107,94,0.4)" : C.surface3}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${Math.sin(t * 2 + i) * 4 * Math.min(1, many)}deg) translateY(${Math.sin(t * 2.6 + i) * 6}px)` }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{m}</span></div>)}
        </div>
        {many > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", opacity: fade(many) * (1 - org) }}><Tag text="CHEIO DE FUNÇÕES?" tone="warn" size={28} /></div> : null}
        {org > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 500, display: "flex", flexDirection: "column", gap: 14, opacity: fade(org) * (1 - 0.5 * fade(fin)) }}>
            {[{ e: "🏘️", k: "IMÓVEIS" }, { e: "📩", k: "LEADS" }, { e: "🤝", k: "ATENDIMENTOS" }].map((m, i) => (
              <div key={m.k} style={{ height: 100, boxSizing: "border-box", borderRadius: 24, background: aa(0.1), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 18, padding: "0 26px", transform: `translateX(${(1 - Math.min(1, org * 3 - i)) * 60 + Math.sin(t * 2 + i) * 8}px)`, opacity: Math.min(1, Math.max(0, org * 3 - i)) }}>
                <span style={{ fontSize: 46 }}>{m.e}</span><span style={{ flex: 1, fontWeight: 800, fontSize: 36, color: C.text }}>{m.k}</span>
                {acc > 0.5 ? <span style={{ fontWeight: 800, fontSize: 30, color: A.hex }}>✓</span> : null}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 6 }}>
              {you > 0.001 ? <div style={{ opacity: fade(you) }}><Tag text="DO SEU JEITO" tone="accent" size={26} /></div> : null}
              {acc > 0.001 ? <div style={{ opacity: fade(acc) }}><Tag text="À MÃO NA HORA DE ATENDER" tone="muted" size={26} /></div> : null}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          </div>
        ) : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1040, textAlign: "center", fontWeight: 800, fontSize: 56, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Processo primeiro,<br /><span style={{ color: A.hex }}>ferramenta depois</span></div> : null}
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>PROCESSO PRIMEIRO,</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>FERRAMENTA DEPOIS</span></Title>
    </div>
  );
};
