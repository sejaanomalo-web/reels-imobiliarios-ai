import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, IconDoc, Msg, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_29 — "O comprador quer resposta, não cinco PDFs". Conexão Imobiliária Secovi-SP (nov/2026): debates sobre jornada digital do
 * cliente. Diálogo e imóvel HIPOTÉTICOS (nenhum imóvel real com vaga coberta é afirmado); chat FICTÍCIO; ficha ILUSTRATIVA.
 * Câmera: y positivo sobe o conteúdo.
 */
const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 54 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);
const fade = (p: number) => Math.min(1, Math.max(0, p) * 1.5);
const fl = (t: number, k: number, a = 12) => Math.sin(t * 1.7 + k) * a;
const CANNED = ["Olá! Segue nosso material completo 😊", "Confira as condições especiais!", "📎 Apresentacao_empreendimento.pdf", "Temos outras opções também!", "Agende sua visita 📅"];

const Chat: React.FC<{ t: number; children: React.ReactNode; w?: number; h?: number }> = ({ t, children, w = 640, h = 640 }) => (
  <div style={{ width: w, height: h, boxSizing: "border-box", borderRadius: 40, background: "#0B0C0F", border: `3px solid ${C.surface3}`, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden", transform: `rotate(${Math.sin(t * 1.1) * 1}deg)` }}>{children}</div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, -0.4, { damping: 13, stiffness: 170 });
  const ph = sp(t, -0.2, { damping: 13, stiffness: 170 });
  const q = sp(t, c.h_perg - 0.2, { damping: 11, stiffness: 220 });
  const flood = prog(t, c.h_receb - 0.2, Math.max(1, c.h_conv - c.h_receb + 0.5), ease.linear);
  const out = prog(t, c.a_info - 0.35, 0.3, ease.in);
  const n = Math.floor(flood * CANNED.length + 0.001);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={8} t={t} keys={[{ t: 0, s: 1.05, x: 4, y: -6 }, { t: 1.0, s: 1.1, x: -4, y: -12, e: ease.out }, { t: c.h_cinco, s: 1.06, x: 4, y: -18, e: ease.linear }, { t: c.h_conv, s: 1.08, x: 0, y: -22, e: ease.linear }, { t: c.a_info, s: 1.06, y: -24, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 220, top: 480, opacity: fade(ph), transform: `translateY(${(1 - Math.min(1, ph)) * 80 + fl(t, 0, 8)}px)` }}>
          <Chat t={t}>
            {q > 0.001 ? <div style={{ opacity: fade(q), transform: `translateY(${(1 - Math.min(1, q)) * 20}px)` }}><Msg side="in" size={30}>Esse apartamento tem vaga coberta?</Msg></div> : null}
            {CANNED.slice(0, n).map((m, i) => (
              <div key={i} style={{ alignSelf: "flex-end", transform: `translateY(${Math.sin(t * 3 + i) * 3}px)` }}>
                {m.startsWith("📎") ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 16, background: C.surface2, border: `2px solid ${C.dim}` }}><IconDoc size={40} /><span style={{ fontWeight: 700, fontSize: 24, color: C.text }}>PDF · 12 páginas</span></div> : <Msg side="out" tone="dim" size={26}>{m}</Msg>}
              </div>
            ))}
          </Chat>
        </div>
        {n >= 2 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: fade(flood), transform: `scale(${1 + 0.08 * Math.sin(t * 6)})` }}><Tag text={`+${n} MENSAGENS`} tone="warn" size={26} /></div> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: fade(ph) * (n >= 2 ? 0 : 1) }}><Tag text="CONVERSA FICTÍCIA" tone="muted" size={24} /></div>
      </Camera>
      <Title p={title} size={54}><span style={{ whiteSpace: "nowrap" }}>ELE PEDIU</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>UMA RESPOSTA</span></Title>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_info - 0.35, { damping: 15, stiffness: 150 });
  const pin = sp(t, c.a_info - 0.1, { damping: 12, stiffness: 200 });
  const no = sp(t, c.a_nao - 0.2, { damping: 10, stiffness: 230 });
  const pile = prog(t, c.a_info, Math.max(1, c.a_quem - c.a_info), ease.linear);
  const deb = sp(t, c.a_jorn - 0.3, { damping: 12, stiffness: 200 });
  const own = sp(t, c.a_propria - 0.2, { damping: 11, stiffness: 220 });
  const out = prog(t, c.b_agora - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.a_info - 0.35, s: 1.05, y: 0 }, { t: c.a_info + 0.8, s: 1.08, x: -4, y: -8, e: ease.out }, { t: c.a_atrito, s: 1.06, x: 4, y: -14, e: ease.linear }, { t: c.a_propria, s: 1.09, x: 0, y: -20, e: ease.out }, { t: c.b_agora, s: 1.06, y: -24, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 140, right: 140, top: 480, display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", borderRadius: 24, background: aa(0.08), border: `3px solid ${A.hex}`, opacity: fade(pin), transform: `scale(${1 + 0.02 * Math.sin(t * 3)})` }}>
          <span style={{ fontSize: 34 }}>📌</span><span style={{ flex: 1, fontWeight: 800, fontSize: 34, color: C.text }}>VAGA COBERTA?</span>
          {no > 0.001 ? <span style={{ opacity: fade(no) }}><Tag text="SEM RESPOSTA" tone="warn" size={24} /></span> : null}
        </div>
        <div style={{ position: "absolute", left: 160, right: 160, top: 620, height: 380 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: [20, 300, 140, 420, 60, 330, 200, 0, 380][i], top: [0, 30, 90, 110, 170, 200, 240, 280, 290][i], opacity: Math.min(1, Math.max(0, pile * 9 - i)), transform: `rotate(${[-8, 6, -3, 9, 4, -7, 2, -5, 8][i] + Math.sin(t * 2 + i) * 3}deg) translateY(${Math.sin(t * 2.4 + i) * 6}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 14, background: i % 3 === 0 ? C.surface2 : C.surface, border: `2px solid ${C.dim}` }}>{i % 3 === 0 ? <IconDoc size={30} /> : <span style={{ fontSize: 26 }}>💬</span>}<span style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>{i % 3 === 0 ? "ANEXO.pdf" : "msg pronta"}</span></div>
            </div>
          ))}
        </div>
        {deb > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1020, display: "flex", justifyContent: "center", opacity: fade(deb) * (1 - fade(own)) }}><Tag text="JORNADA DIGITAL · DEBATES DO SETOR · NOV/2026" tone="muted" size={24} /></div> : null}
        {own > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: fade(own), transform: `scale(${mix(0.5, 1, Math.min(1.08, own))})` }}><Tag text="PRIMEIRO, A PERGUNTA DELE" tone="accent" size={30} /></div> : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>RESPOSTA QUE</span><br /><span style={{ color: C.warn, whiteSpace: "nowrap" }}>NÃO RESPONDE</span></Title>
    </div>
  );
};

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_agora - 0.35, { damping: 15, stiffness: 150 });
  const ph = sp(t, c.b_agora - 0.1, { damping: 13, stiffness: 180 });
  const ans = sp(t, c.b_sim - 0.15, { damping: 11, stiffness: 220 });
  const seal = sp(t, c.b_ficha - 0.1, { damping: 9, stiffness: 260 });
  const fol = sp(t, c.b_quer - 0.15, { damping: 11, stiffness: 220 });
  const flow = prog(t, c.b_clara - 0.3, Math.max(0.8, c.b_prox - c.b_clara + 0.6), ease.out);
  const out = prog(t, c.c_nao - 0.4, 0.35, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.b_agora - 0.35, s: 1.05, y: 0 }, { t: c.b_agora + 0.8, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.b_ficha, s: 1.06, x: -4, y: -14, e: ease.linear }, { t: c.b_clara, s: 1.08, x: 0, y: -20, e: ease.linear }, { t: c.c_nao, s: 1.06, y: -24, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 220, top: 470, opacity: fade(ph), transform: `translateY(${(1 - Math.min(1, ph)) * 60 + fl(t, 0, 8)}px)` }}>
          <Chat t={t} h={520}>
            <Msg side="in" size={30}>Esse apartamento tem vaga coberta?</Msg>
            {ans > 0.001 ? <div style={{ alignSelf: "flex-end", opacity: fade(ans), transform: `translateY(${(1 - Math.min(1, ans)) * 30}px)` }}><Msg side="out" tone="good" size={28}>Sim, a vaga é coberta, conforme a ficha do imóvel.</Msg></div> : null}
            {seal > 0.001 ? <div style={{ alignSelf: "flex-end", opacity: fade(seal), transform: `scale(${mix(1.8, 1, Math.min(1, seal))}) rotate(-3deg)` }}><Tag text="✓ DADO CONFIRMADO NA FICHA" tone="accent" size={24} /></div> : null}
            {fol > 0.001 ? <div style={{ alignSelf: "flex-end", opacity: fade(fol), transform: `translateY(${(1 - Math.min(1, fol)) * 30}px)` }}><Msg side="out" size={28}>Quer saber também como funciona o acesso à garagem?</Msg></div> : null}
          </Chat>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1020, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
          {["PERGUNTA", "RESPOSTA", "PRÓXIMO PASSO"].map((k, i) => (
            <React.Fragment key={k}>
              <div style={{ opacity: fade(flow * 3 - i), transform: `scale(${mix(0.5, 1, Math.min(1, Math.max(0, flow * 3 - i)))}) translateY(${Math.sin(t * 2.4 + i) * 6}px)` }}><Tag text={k} tone={i === 2 ? "accent" : "muted"} size={26} /></div>
              {i < 2 ? <span style={{ fontWeight: 800, fontSize: 34, color: A.hex, opacity: fade(flow * 3 - i - 0.5) }}>→</span> : null}
            </React.Fragment>
          ))}
        </div>
      </Camera>
      <Title p={enter} size={50}><span style={{ whiteSpace: "nowrap" }}>PERGUNTA → RESPOSTA</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>→ PRÓXIMO PASSO</span></Title>
    </div>
  );
};

const STEPS = [{ k: "CONECTAR O PEDIDO", at: "c_conect" }, { k: "VERIFICAR OS DADOS", at: "c_verif" }, { k: "RESPEITAR O MOMENTO", at: "c_resp" }];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_nao - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.c_nao - 0.1, { damping: 13, stiffness: 170 });
  const st = STEPS.map((s) => sp(t, c[s.at] - 0.15, { damping: 11, stiffness: 220 }));
  const ig = sp(t, c.c_ignora - 0.2, { damping: 10, stiffness: 230 });
  const fin = sp(t, c.x_clar - 0.2, { damping: 13, stiffness: 180 });
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: fade(enter) * (1 - out) }}>
      <Camera drift={8} t={t} keys={[{ t: c.c_nao - 0.35, s: 1.05, y: 0 }, { t: c.c_nao + 0.9, s: 1.08, x: 4, y: -8, e: ease.out }, { t: c.c_verif, s: 1.06, x: -4, y: -14, e: ease.linear }, { t: c.c_ignora, s: 1.08, x: 0, y: -20, e: ease.linear }, { t: c.x_auto + 0.3, s: 1.05, y: -26, e: ease.linear }, { t: c.cta_quer, s: 1.08, y: -30, e: ease.linear }]}>
        <div style={{ position: "absolute", left: 150, right: 150, top: 490, boxSizing: "border-box", borderRadius: 26, background: C.surface, border: `2px solid ${A.hex}`, padding: "16px 22px", opacity: fade(card) * (1 - 0.5 * fade(fin)), transform: `translateY(${(1 - Math.min(1, card)) * 60 + fl(t, 0, 10)}px) rotate(${Math.sin(t * 1.1) * 1.5}deg)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>FICHA DO IMÓVEL · ATUALIZADA</span><Tag text="ILUSTRATIVO" tone="muted" size={24} /></div>
          {[{ k: "VAGA", v: "COBERTA" }, { k: "ACESSO À GARAGEM", v: "DESCRITO" }, { k: "ÚLTIMA CONFERÊNCIA", v: "DATA" }].map((r, i) => (
            <div key={r.k} style={{ display: "flex", alignItems: "center", height: 62, borderTop: `2px solid ${C.surface3}`, transform: `translateX(${Math.sin(t * 2 + i) * 8}px)` }}>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 27, color: C.text }}>{r.k}</span><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: A.hex }}>✓ {r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 150, right: 150, top: 790, display: "flex", flexDirection: "column", gap: 10, opacity: 1 - fade(fin) }}>
          {STEPS.map((s, i) => st[i] > 0.001 ? <div key={s.k} style={{ height: 60, borderRadius: 16, background: aa(0.08), border: `2px solid ${A.hex}`, display: "flex", alignItems: "center", gap: 12, padding: "0 18px", opacity: fade(st[i]), transform: `translateX(${(1 - Math.min(1, st[i])) * 40 + Math.sin(t * 2.2 + i) * 6}px)` }}><span style={{ fontWeight: 800, fontSize: 26, color: A.hex }}>{i + 1}</span><span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{s.k}</span></div> : null)}
        </div>
        {ig > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1030, display: "flex", justifyContent: "center", opacity: fade(ig) * (1 - fade(fin)), transform: `scale(${mix(1.8, 1, Math.min(1, ig))}) rotate(-3deg)` }}><div style={{ padding: "10px 20px", borderRadius: 16, background: WARN_BG, border: "2px solid rgba(255,107,94,0.6)" }}><span style={{ fontWeight: 800, fontSize: 26, color: C.warn }}>✕ CONVERSA QUE IGNORA O CLIENTE</span></div></div> : null}
        {fin > 0.001 ? <div style={{ position: "absolute", left: 80, right: 80, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.05, color: C.text, opacity: fade(fin), transform: `scale(${mix(1.2, 1, Math.min(1, fin)) * (1 + 0.02 * Math.sin(t * 3))})` }}>Clareza antes<br /><span style={{ color: A.hex }}>da automação</span></div> : null}
      </Camera>
      <Title p={enter} size={52}><span style={{ whiteSpace: "nowrap" }}>CLAREZA ANTES</span><br /><span style={{ color: A.hex, whiteSpace: "nowrap" }}>DA AUTOMAÇÃO</span></Title>
    </div>
  );
};
