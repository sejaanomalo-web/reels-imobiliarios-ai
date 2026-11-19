import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, CheckDot, IconBank, Label, Person, Tag, WARN_BG, aa } from "../../NOV26/kit";

/**
 * ATIVO_NOV26_04 — "Juros altos, crédito bilionário" (paradoxo com números). Fato verificado em 19/11/2026: balanço da Caixa do 3º tri/2026,
 * R$ 72,5 bi em contratações imobiliárias somando recursos da Caixa e do FGTS. Nota do roteiro na tela: crédito contratado ≠ número de
 * vendas. Nenhuma taxa é mostrada. Câmera: x/y = posição da câmera (y positivo sobe o conteúdo).
 */

const Title: React.FC<{ p: number; children: React.ReactNode; size?: number }> = ({ p, children, size = 58 }) => (
  <div style={{ position: "absolute", left: 80, right: 80, top: 285, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5) }}>{children}</div>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const title = sp(t, 0, { damping: 13, stiffness: 170 });
  const caro = sp(t, Math.min(0.9, c.h_caro - 0.3), { damping: 12, stiffness: 190 });
  const bil = sp(t, c.h_bil - 0.3, { damping: 12, stiffness: 190 });
  const q = sp(t, c.h_tri - 0.1, { damping: 10, stiffness: 220 });
  const out = prog(t, c.a_terc - 0.45, 0.4, ease.in);
  const flow = (t * 0.7) % 1;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera drift={1.2} t={t} keys={[{ t: 0, s: 1.1, y: -30 }, { t: c.h_caro + 0.3, s: 1.05, x: 15, y: -10, e: ease.inOut }, { t: (c.h_caro + c.h_bil) / 2, s: 1.08, x: 0, y: -20, e: ease.inOut }, { t: c.h_bil + 0.3, s: 1.04, x: -15, y: -10, e: ease.inOut }, { t: c.a_terc, s: 1.09, x: 0, y: -25, e: ease.inOut }]}>
        <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, title))})` }}>
          CRÉDITO EM<br /><span style={{ color: A.hex }}>MOVIMENTO</span>
        </div>
        {/* fluxo de moedas/blocos atravessando */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 660, height: 14, borderRadius: 7, background: C.surface3, overflow: "hidden" }}>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", top: 0, left: `${(((flow + k / 5) % 1) * 110) - 10}%`, width: "8%", height: "100%", borderRadius: 7, background: A.hex, opacity: 0.8 }} />)}
        </div>
        {caro > 0.001 ? (
          <div style={{ position: "absolute", left: 90, top: 760, width: 420, height: 300, boxSizing: "border-box", borderRadius: 34, background: WARN_BG, border: `3px solid ${C.warn}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: Math.min(1, caro * 1.5), transform: `translateY(${(1 - Math.min(1, caro)) * 100 + Math.sin(t * 1.7) * 8}px) rotate(-2deg)` }}>
            <div style={{ fontWeight: 800, fontSize: 90, color: C.warn }}>%↑</div>
            <Label size={30} color={C.text}>CRÉDITO CARO</Label>
          </div>
        ) : null}
        {bil > 0.001 ? (
          <div style={{ position: "absolute", left: 570, top: 760, width: 420, height: 300, boxSizing: "border-box", borderRadius: 34, background: aa(0.12), border: `3px solid ${A.hex}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: Math.min(1, bil * 1.5), transform: `translateY(${(1 - Math.min(1, bil)) * 100 + Math.sin(t * 1.7 + 2) * 8}px) rotate(2deg)`, boxShadow: `0 0 40px ${aa(0.25)}` }}>
            <div style={{ fontWeight: 800, fontSize: 84, color: A.hex }}>R$ BI</div>
            <Label size={30} color={C.text}>CONTRATADOS</Label>
          </div>
        ) : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 490, top: 860, width: 100, height: 100, borderRadius: 50, background: C.text, color: C.bg0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 70, zIndex: 5, transform: `scale(${mix(0.3, 1, Math.min(1.1, q))}) rotate(${Math.sin(t * 3) * 8}deg)` }}>?</div> : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 1120, display: "flex", justifyContent: "center", opacity: Math.min(1, q * 1.5) }}><Tag text="NUM ÚNICO TRIMESTRE" tone="muted" size={28} style={{ color: C.text }} /></div> : null}
      </Camera>
    </div>
  );
};

export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_terc - 0.35, { damping: 15, stiffness: 150 });
  const date = sp(t, c.a_terc - 0.1, { damping: 12, stiffness: 190 });
  const count = prog(t, c.a_cinco - 0.1, 0.5, ease.out);
  const pre = prog(t, c.a_terc + 0.2, 0.4, ease.out);
  const seal = sp(t, c.a_caixa - 0.2, { damping: 11, stiffness: 210 });
  const vol = sp(t, c.a_vol - 0.1, { damping: 12, stiffness: 190 });
  const tax = sp(t, c.a_tax - 0.1, { damping: 12, stiffness: 190 });
  const out = prog(t, c.b_erro - 0.45, 0.4, ease.in);
  const v = count > 0.5 ? "72,5" : "••,•";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.a_terc - 0.35, s: 1.04, y: 0 }, { t: (c.a_terc + c.a_set) / 2, s: 1.07, x: 15, y: -10, e: ease.inOut }, { t: c.a_set, s: 1.1, x: 0, y: -20, e: ease.inOut }, { t: (c.a_set + c.a_caixa) / 2, s: 1.06, x: 15, y: -10, e: ease.inOut }, { t: c.a_caixa + 0.3, s: 1.1, x: -15, y: -20, e: ease.inOut }, { t: c.a_vol + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut }, { t: c.a_tax + 0.3, s: 1.09, x: 0, y: -20, e: ease.inOut }, { t: c.b_erro, s: 1.06, y: -10, e: ease.linear }]}>
        {date > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center", opacity: Math.min(1, date * 1.5) }}><Tag text="3º TRI 2026" tone="accent" size={34} /></div> : null}
        <div style={{ position: "absolute", left: 40, right: 40, top: 520, textAlign: "center", fontWeight: 800, fontSize: 170, letterSpacing: "-0.05em", color: count > 0.5 ? A.hex : C.muted, textShadow: count > 0.5 ? `0 0 60px ${aa(0.4)}` : "none", opacity: pre, transform: `scale(${mix(1, 1.12, Math.sin(Math.PI * count)) * (1 + (count > 0.98 ? 0.02 * Math.sin(t * 4) : count < 0.5 ? 0.05 * Math.sin(t * 7) : 0))}) translateX(${count < 0.5 ? Math.sin(t * 11) * 6 : 0}px)` }}>
          R$ {v}<span style={{ fontSize: 110 }}> BI</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 740, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.muted, opacity: pre }}>EM CONTRATAÇÕES IMOBILIÁRIAS</div>
        {[[820, 430, 104, seal], [980, 700, 64, vol]].map(([y, w, h, p], k) => ((p as number) < 0.6 ? <div key={k} style={{ position: "absolute", left: 540 - (w as number) / 2, top: y as number, width: w as number, height: h as number, boxSizing: "border-box", borderRadius: 22, border: `3px dashed ${C.dim}`, opacity: pre * (1 - Math.min(1, (p as number) * 1.6)) * (0.7 + 0.3 * Math.sin(t * 3 + k)) }} /> : null))}
        {seal > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", opacity: Math.min(1, seal * 1.5), transform: `scale(${mix(1.6, 1, Math.min(1, seal))}) rotate(-3deg)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 28px", borderRadius: 22, border: `4px solid ${A.hex}`, background: C.bg1 }}>
              <IconBank size={56} color={A.hex} />
              <span style={{ fontWeight: 800, fontSize: 44, color: C.text }}>CAIXA + FGTS</span>
            </div>
          </div>
        ) : null}
        {vol > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 980, display: "flex", justifyContent: "center", gap: 16, opacity: Math.min(1, vol * 1.5) }}>
            <Tag text="VOLUME GRANDE" tone="accent" size={30} />
            {tax > 0.001 ? <span style={{ opacity: Math.min(1, tax * 1.5) }}><Tag text="MESMO COM TAXAS ELEVADAS" tone="warn" size={30} /></span> : null}
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center", opacity: prog(t, c.a_cont, 0.5, ease.out) }}>
          <Tag text="CRÉDITO CONTRATADO ≠ Nº DE VENDAS" tone="muted" size={24} style={{ color: C.text }} />
        </div>
      </Camera>
      <Title p={enter}>O NÚMERO <span style={{ color: A.hex }}>DO TRIMESTRE</span></Title>
    </div>
  );
};

const SEGS = ["FAIXAS DE RENDA", "MODALIDADES", "NECESSIDADES", "CONDIÇÕES"];

export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_erro - 0.35, { damping: 15, stiffness: 150 });
  const sw = sp(t, c.b_erro - 0.1, { damping: 12, stiffness: 180 });
  const on = t < c.b_alto - 0.05 ? 0.5 : t < c.b_baixo - 0.05 ? 0 : 1;
  const knob = on === 0.5 ? 0.5 + 0.45 * Math.sin(t * 5) : mix(0, 1, on);
  const l1 = sp(t, c.b_ning - 0.1, { damping: 12, stiffness: 200 });
  const l2 = sp(t, c.b_todo - 0.1, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.b_prat - 0.2, 0.4, ease.out);
  const split = prog(t, c.b_prat, 0.6, ease.inOut);
  const segs = [c.b_faixas, c.b_modal, c.b_nec, c.b_cond].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const out = prog(t, c.c_para - 0.45, 0.4, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.b_erro - 0.35, s: 1.05, y: 0 }, { t: (c.b_erro + c.b_int) / 2, s: 1.08, x: -12, y: -12, e: ease.inOut }, { t: c.b_int + 0.2, s: 1.1, x: 0, y: -20, e: ease.inOut }, { t: (c.b_int + c.b_alto) / 2 + 0.1, s: 1.05, x: 15, y: -5, e: ease.inOut }, { t: c.b_alto + 0.2, s: 1.06, x: -20, y: -10, e: ease.inOut }, { t: c.b_baixo + 0.2, s: 1.06, x: 20, y: -10, e: ease.inOut }, { t: c.b_prat + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut }, { t: c.b_modal + 0.2, s: 1.07, x: -10, y: -15, e: ease.inOut }, { t: c.b_cond + 0.3, s: 1.09, x: 10, y: -20, e: ease.inOut }, { t: c.c_para, s: 1.06, y: -10, e: ease.linear }]}>
        {/* interruptor */}
        <div style={{ position: "absolute", left: 340, top: 430, width: 400, opacity: Math.min(1, sw * 1.5) * (1 - split), transform: `scale(${mix(0.6, 1, Math.min(1, sw)) * mix(1, 0.5, split)}) rotate(${Math.sin(t * 2.2) * 3}deg) translateY(${Math.sin(t * 1.7) * 10}px)` }}>
          <div style={{ position: "relative", width: 400, height: 200, borderRadius: 100, background: C.surface3, border: `4px solid ${C.line}` }}>
            <div style={{ position: "absolute", top: 20, left: mix(20, 220, knob), width: 160, height: 160, borderRadius: 80, background: on === 1 ? A.hex : on === 0 ? C.warn : C.muted, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30, color: C.bg0 }}>{on === 1 ? "LIGA" : on === 0 ? "DESLIGA" : ""}</div>
          </div>
        </div>
        {[["JURO ALTO → NINGUÉM COMPRA", l1, C.warn], ["JURO BAIXO → TODO MUNDO COMPRA", l2, A.hex]].map(([k, p, col], i) => ((p as number) > 0.001 && split < 1 ? (
          <div key={k as string} style={{ position: "absolute", left: 0, right: 0, top: 700 + i * 110, display: "flex", justifyContent: "center", opacity: Math.min(1, (p as number) * 1.5) * (1 - split) }}>
            <div style={{ position: "relative", padding: "14px 26px", borderRadius: 20, background: C.surface, border: `2px solid ${C.line}`, fontWeight: 800, fontSize: 40, color: col as string }}>
              {k as string}
              <div style={{ position: "absolute", left: 16, right: 16, top: "50%", height: 7, borderRadius: 4, background: C.text, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-2deg)` }} />
            </div>
          </div>
        ) : null))}
        {/* painéis do mercado */}
        {split > 0.001 ? SEGS.map((k, i) => (
          <div key={k} style={{ position: "absolute", left: 110 + (i % 2) * 440, top: 450 + Math.floor(i / 2) * 290, width: 420, height: 260, boxSizing: "border-box", borderRadius: 30, background: segs[i] > 0.5 ? aa(0.1) : C.surface, border: `3px solid ${segs[i] > 0.5 ? A.hex : C.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: split * mix(0.35, 1, Math.min(1, segs[i])), transform: `translate(${(1 - split) * (i % 2 ? -200 : 200)}px, ${(1 - split) * (i < 2 ? 150 : -150) + Math.sin(t * 1.8 + i) * 7}px) scale(${mix(0.85, 1, Math.min(1.04, segs[i]))})` }}>
            <div style={{ display: "flex", gap: 8 }}>{[0, 1, 2].map((b) => <div key={b} style={{ width: 40, height: 30 + ((i * 3 + b * 5) % 4) * 18 + Math.sin(t * 2 + i + b) * 6, borderRadius: 8, background: segs[i] > 0.5 ? A.hex : C.dim, alignSelf: "flex-end" }} />)}</div>
            <Label size={30} color={C.text}>{k}</Label>
          </div>
        )) : null}
      </Camera>
      <Title p={enter}>MERCADO <span style={{ color: C.warn }}>NÃO É</span> <span style={{ color: A.hex }}>INTERRUPTOR</span></Title>
    </div>
  );
};

const PROF = ["PERFIL 1", "PERFIL 2", "PERFIL 3"];
const ANS = ["MODALIDADE", "CONDIÇÕES", "PRODUTO"];

export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.c_para - 0.35, { damping: 15, stiffness: 150 });
  const top = sp(t, c.c_para, { damping: 13, stiffness: 180 });
  const funnel = prog(t, c.c_comeco - 0.2, 0.8, ease.inOut);
  const ans = [c.c_mod, c.c_cond, c.c_prod].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const rec = sp(t, c.x_antes - 0.2, { damping: 13, stiffness: 180 });
  const lens = prog(t, c.x_rec - 0.2, 0.6, ease.out);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const flow = (t * 0.8) % 1;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera drift={1.2} t={t} keys={[{ t: c.c_para - 0.35, s: 1.05, y: 0 }, { t: c.c_agreg + 0.2, s: 1.1, x: 0, y: -20, e: ease.inOut }, { t: c.c_comeco + 0.3, s: 1.04, x: 0, y: -5, e: ease.inOut }, { t: c.c_mod + 0.2, s: 1.08, x: -15, y: -15, e: ease.inOut }, { t: c.c_cond + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut }, { t: c.c_prod + 0.2, s: 1.08, x: 15, y: -15, e: ease.inOut }, { t: c.x_antes + 0.3, s: 1.03, x: 0, y: 0, e: ease.inOut }, { t: c.x_rec + 0.3, s: 1.09, x: 0, y: -20, e: ease.inOut }, { t: c.cta_quer, s: 1.06, y: -10, e: ease.linear }]}>
        {/* número agregado no topo do funil */}
        <div style={{ position: "absolute", left: 200, right: 200, top: 420, height: 110, borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, opacity: Math.min(1, top * 1.5) * (1 - Math.min(1, rec * 1.5)), transform: `scale(${mix(0.8, 1, Math.min(1, top))})` }}>
          <span style={{ fontWeight: 800, fontSize: 52, color: C.text }}>R$ 72,5 BI</span>
          <Tag text="AGREGADO" tone="muted" size={24} />
        </div>
        {/* funil */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: funnel * (1 - Math.min(1, rec * 1.5)) }}>
          <path d="M 220 545 L 860 545 L 640 700 L 440 700 Z" fill={aa(0.1)} stroke={A.hex} strokeWidth={4} />
          {[0, 1, 2].map((k) => <circle key={k} cx={540 + (k - 1) * 120 * (1 - ((flow + k / 3) % 1))} cy={555 + ((flow + k / 3) % 1) * 140} r={12} fill={A.hex} />)}
          {[0, 1, 2].map((k) => <path key={k} d={`M 540 700 L ${220 + k * 320} 790`} stroke={C.dim} strokeWidth={4} strokeDasharray="160" strokeDashoffset={160 * (1 - funnel)} />)}
        </svg>
        {PROF.map((p, i) => (
          <div key={p} style={{ position: "absolute", left: 100 + i * 320, top: 800, width: 240, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: funnel * (1 - Math.min(1, rec * 1.5)), transform: `translateY(${(1 - funnel) * 60 + Math.sin(t * 1.8 + i) * 6}px)` }}>
            <div style={{ padding: "10px 16px 4px", borderRadius: 20, background: C.surface, border: `2px solid ${ans[i] > 0.5 ? A.hex : C.line}` }}><Person size={80} t={t} /></div>
            <Label size={24}>{p}</Label>
            {ans[i] > 0.001 ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 16, background: aa(0.12), border: `2px solid ${A.hex}`, opacity: Math.min(1, ans[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, ans[i]))})` }}><CheckDot p={Math.min(1, ans[i])} size={34} /><span style={{ fontWeight: 800, fontSize: 26, color: C.text }}>{ANS[i]}</span></div> : null}
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1130, display: "flex", justifyContent: "center", opacity: funnel * (1 - Math.min(1, rec * 1.5)) }}><Tag text="PERFIS ILUSTRATIVOS · SEM DADOS PESSOAIS" tone="muted" size={24} /></div>
        {/* recorte da notícia */}
        {rec > 0.001 ? (
          <div style={{ position: "absolute", left: 150, right: 150, top: 470, height: 520, boxSizing: "border-box", borderRadius: 30, background: C.paper, padding: 34, opacity: Math.min(1, rec * 1.5), transform: `rotate(${mix(-6, -2, Math.min(1, rec))}deg) translateY(${(1 - Math.min(1, rec)) * 80 + Math.sin(t * 1.5) * 6}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.inkMuted }}>NOTÍCIA</div>
            <div style={{ marginTop: 12, fontWeight: 800, fontSize: 44, lineHeight: 1.05, color: C.ink }}>"O mercado travou"</div>
            {[0.9, 0.75, 0.85, 0.6, 0.8].map((w, k) => <div key={k} style={{ marginTop: 20, height: 16, width: `${w * 100}%`, borderRadius: 8, background: "#D3CFC5" }} />)}
            <div style={{ position: "absolute", left: 60 + lens * 120, top: 230 + lens * 30, width: 230, height: 230, borderRadius: 115, border: `10px solid ${A.hex}`, background: aa(0.12), opacity: lens, boxShadow: `0 0 30px ${aa(0.4)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.ink, textAlign: "center" }}>QUAL<br />RECORTE?</div>
          </div>
        ) : null}
      </Camera>
      <Title p={enter} size={46}>SEGMENTAÇÃO <span style={{ color: A.hex }}>MUDA O ATENDIMENTO</span></Title>
    </div>
  );
};
