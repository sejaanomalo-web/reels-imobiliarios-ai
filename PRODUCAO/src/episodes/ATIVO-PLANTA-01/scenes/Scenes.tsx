import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Carimbo, Chamada, Comodo, Contorno, Cota, CotaV, Elevacao, LINHA, Porta, Prancha, Rota, SeloPlanta, TituloFolha, TRACO,
  clamp01, ease, mergulho, mix, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-PLANTA-01 — PILOTO do Terceiro modelo (Planta técnica v2). Mesmo roteiro, voz congelada e timeline do ATIVO-GTA6-02
 * ("O magnata imobiliário escondido em GTA VI"), redesenhado no kit v2 para comparação antes × depois.
 * Gramática: cada folha é UMA planta; a folha seguinte nasce do cômodo em que a câmera mergulha (sem crossfade solto).
 * Fato: perfil do personagem FICTÍCIO Boobie Ike no site da Rockstar. Nenhum asset do jogo; tudo ILUSTRATIVO.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };

/* ---------------------------------------------------------------- 1 · gancho: a mansão ---------------------------------------------------------------- */
const SALA = { x: 140, y: 150, w: 480, h: 300 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_nome - 0.35, 0.45, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, SALA, TELA);
  const titulo = sp(t, -0.3, { damping: 14, stiffness: 160 });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.02, y: 0 }, { t: c.h_fort, s: 1.04, y: -6, e: ease.out }, { t: c.h_prot, s: 1.05, x: 4, y: -10, e: ease.out }, { t: c.a_nome, s: 1.05, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <Comodo {...SALA} p={prog(t, 0.45, 0.8, ease.out)} amb="AMB. 01" titulo="SALA" sub="vista para o mar" />
            <g opacity={m.outros}>
            <Contorno x={140} y={150} w={800} h={480} p={prog(t, -0.1, 1.1, ease.out)} />
            <Comodo x={620} y={150} w={320} h={300} p={prog(t, 0.85, 0.8, ease.out)} amb="AMB. 02" titulo="SUÍTE" />
            <Comodo x={140} y={450} w={800} h={180} p={prog(t, 1.25, 0.8, ease.out)} amb="ÁREA EXTERNA" titulo="PISCINA" tone="muted" titleSize={36} />
            <Porta x={560} y={450} r={60} p={prog(t, 0.9, 0.5)} />
            <Cota x1={140} x2={940} y={104} texto="FORTUNA EM IMÓVEIS" p={prog(t, c.h_fort - 0.2, 0.7, ease.out)} cor={t >= c.h_imov - 0.05 ? A.hex : C.text} />
            <Chamada x={790} y={300} bx={290} by={690} bw={500} texto="NEM É O PROTAGONISTA" p={prog(t, c.h_prot - 0.75, 0.8, ease.out)} tone="warn" />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={titulo * (1 - prog(t, c.a_nome - 0.4, 0.2))}>UM <span style={{ color: A.hex }}>MAGNATA</span> IMOBILIÁRIO</TituloFolha>
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · ficha técnica ---------------------------------------------------------------- */
const NEG = { x: 610, y: 560, w: 320, h: 170 };
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_nome - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.b_imp - 0.55, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, NEG, TELA);
  const cab = prog(t, ini, 0.6, ease.out);
  const nome = sp(t, c.a_boob - 0.05, { damping: 12, stiffness: 210 });
  const lenda = prog(t, c.a_lenda - 0.25, 0.7, ease.out);
  const traj = prog(t, c.a_traj - 0.35, 0.7, ease.out);
  const neg = prog(t, c.a_neg - 0.4, 0.7, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_boob, s: 1.05, y: -8, e: ease.out }, { t: c.a_lenda, s: 1.03, y: -4, e: ease.out }, { t: c.a_neg, s: 1.05, x: -6, y: -14, e: ease.out }, { t: c.b_imp, s: 1.05, y: -14, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
            <Contorno {...TELA} p={1} />
            <g opacity={fade(cab)} fontFamily={M} fontWeight={700} textAnchor="middle">
              <text x={540} y={182} fill={C.muted} fontSize={24} letterSpacing="0.14em">FICHA TÉCNICA · PERSONAGEM FICTÍCIO</text>
              <line x1={160} y1={206} x2={920} y2={206} stroke={C.dim} strokeWidth={TRACO * 0.67} />
            </g>
            <g opacity={fade(nome)} transform={`translate(540 310) scale(${mix(0.8, 1, Math.min(1.04, nome))})`} textAnchor="middle">
              <text x={0} y={0} fill={C.text} fontFamily="Manrope" fontWeight={800} fontSize={88} letterSpacing={-2}>BOOBIE IKE</text>
              <text x={0} y={54} fill={C.muted} fontFamily={M} fontWeight={700} fontSize={30}>GTA VI · VICE CITY</text>
            </g>
            <Chamada x={540} y={384} bx={230} by={420} bw={620} texto="“LENDA DE VICE CITY”" p={lenda} tone="linha" />
            <Comodo x={150} y={560} w={320} h={170} p={traj} titulo="TRAJETÓRIA" tone="muted" titleSize={36} />
            <Rota id="traj-neg" d="M 470 645 L 610 645" p={prog(t, c.a_neg - 0.15, 0.45, ease.out)} tom="accent" />
            </g>
            <Comodo {...NEG} p={neg} titulo="NEGÓCIOS" titleSize={38} acende={prog(t, c.a_neg, 0.4)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.b_imp - 0.6, 0.2))}>O NOME: <span style={{ color: A.hex }}>BOOBIE IKE</span></TituloFolha>
      <SeloPlanta texto="SEGUNDO O PERFIL OFICIAL (ROCKSTAR)" p={prog(t, c.a_rock - 0.1, 0.4) * (1 - prog(t, c.b_imp - 0.5, 0.3))} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · o império (4 frentes) ---------------------------------------------------------------- */
const QUADRA = { x: 430, y: 300, w: 220, h: 140 };
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.b_imp - 0.15;
  if (t < ini - 0.05) return null;
  const enc = prog(t, c.c_muda - 0.55, 0.7, ease.linear);
  if (enc >= 1) return null;
  const m = mergulho(enc, TELA, QUADRA, );
  const r = (at: number) => prog(t, at - 0.3, 0.7, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.b_imov, s: 1.04, x: 6, y: -6, e: ease.out }, { t: c.b_clube, s: 1.04, x: -6, y: -6, e: ease.out }, { t: c.b_est, s: 1.04, x: 6, y: -12, e: ease.out }, { t: c.b_grav, s: 1.05, x: -6, y: -14, e: ease.out }, { t: c.c_muda, s: 1.03, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={enc > 0 ? 1 - clamp01((enc - 0.8) / 0.2) : 1}>
            <Contorno {...TELA} p={1} />
            {/* projeto em esboço: as divisões tracejadas já marcam as 4 frentes; cada cômodo "se constrói" na sua palavra */}
            <g stroke={C.dim} strokeWidth={TRACO * 0.67} strokeDasharray="10 10" opacity={fade(prog(t, ini + 0.1, 0.6))}>
              <line x1={540} y1={120} x2={540} y2={mix(120, 760, prog(t, ini + 0.1, 0.7, ease.out))} />
              <line x1={120} y1={440} x2={mix(120, 960, prog(t, ini + 0.35, 0.7, ease.out))} y2={440} />
            </g>
            <g opacity={fade(prog(t, ini + 0.5, 0.5))} fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em" fill={C.dim} textAnchor="middle">
              <text x={330} y={290}>FRENTE 01</text><text x={750} y={290}>FRENTE 02</text><text x={330} y={610}>FRENTE 03</text><text x={750} y={610}>ANEXO</text>
            </g>
            <Cota x1={120} x2={960} y={76} texto="O IMPÉRIO · ILUSTRATIVO" p={prog(t, ini, 0.7)} />
            <Comodo x={120} y={120} w={420} h={320} p={r(c.b_imov)} amb="FRENTE 01" titulo="IMÓVEIS" titleSize={42} />
            <Comodo x={540} y={120} w={420} h={320} p={r(c.b_clube)} amb="FRENTE 02" titulo="CLUBE" sub="noturno" titleSize={42} />
            <Comodo x={120} y={440} w={420} h={320} p={r(c.b_est)} amb="FRENTE 03" titulo="ESTÚDIO" sub="musical" titleSize={42} />
            <Comodo x={540} y={440} w={420} h={320} p={r(c.b_grav)} amb="ANEXO" titulo="GRAVADORA" sub="com Dre’Quan Priest" titleSize={40} />
            <Porta x={540} y={600} r={60} p={r(c.b_grav)} />
          </g>
          <Chamada x={880} y={520} bx={300} by={800} bw={560} texto="QUER ESTOURAR NA CIDADE" p={prog(t, c.b_estourar - 0.2, 0.6, ease.out) * (1 - prog(t, c.c_muda - 0.6, 0.3))} tone="linha" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.c_muda - 0.6, 0.2))}>O <span style={{ color: A.hex }}>IMPÉRIO</span> DELE</TituloFolha>
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · o mapa: um universo maior ---------------------------------------------------------------- */
const BLOCOS = Array.from({ length: 9 }, (_, i) => ({ x: 160 + (i % 3) * 270, y: 110 + Math.floor(i / 3) * 190, w: 220, h: 140 }));
const PINS = [{ k: "NEGÓCIOS", b: 0, at: "c_neg" }, { k: "INTERESSES", b: 5, at: "c_int" }, { k: "PODER", b: 7, at: "c_poder" }];
const RUAS = "M 120 390 L 405 390 L 405 580 L 675 580 L 675 200 L 960 200";
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.c_muda - 0.2;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.d_adorei - 0.55, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, BLOCOS[4], TELA);
  const grid = prog(t, ini, 1.3, ease.out);
  const rota = prog(t, c.c_pers - 0.3, 1.0, ease.inOut);
  const nao = prog(t, c.c_neg - 0.6, 0.4, ease.out);
  const esp = prog(t, c.c_esp - 0.1, 0.9, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.c_pers, s: 1.04, y: -8, e: ease.out }, { t: c.c_neg, s: 1.03, x: -4, y: -6, e: ease.out }, { t: c.c_esp, s: 1.05, y: -10, e: ease.out }, { t: c.d_adorei, s: 1.05, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
            <text x={540} y={70} textAnchor="middle" fill={C.muted} fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.14em" opacity={fade(grid)}>MAPA ILUSTRATIVO · CIDADE FICTÍCIA</text>
            {BLOCOS.map((b, i) => i === 4 ? null : (
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={i === 4 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)"} stroke={i === 4 ? LINHA : C.dim} strokeWidth={TRACO} pathLength={1} strokeDasharray={1} strokeDashoffset={i === 4 ? 0 : 1 - prog(grid, i * 0.06, 0.5)} />
            ))}
            <g opacity={1 - nao * 0.6}><Rota id="perseguicao" d={RUAS} p={rota} tom="warn" /></g>
            <g opacity={fade(rota) * (1 - nao * 0.55)}>
              <rect x={300} y={700} width={480} height={84} rx={12} fill="rgba(255,107,94,0.12)" stroke={C.warn} strokeWidth={TRACO} />
              <text x={540} y={753} textAnchor="middle" fill={C.warn} fontFamily={M} fontWeight={700} fontSize={30}>SÓ PERSEGUIÇÃO?</text>
              <line x1={290} y1={760} x2={mix(290, 790, nao)} y2={722} stroke={C.warn} strokeWidth={TRACO + 2} strokeLinecap="round" opacity={nao > 0 ? 1 : 0} />
            </g>
            {PINS.map((q) => {
              const p = sp(t, c[q.at] - 0.1, { damping: 12, stiffness: 220 });
              const b = BLOCOS[q.b];
              return (
                <g key={q.k} opacity={fade(p)} transform={`translate(${b.x + b.w / 2} ${b.y + 78}) scale(${mix(0.5, 1, Math.min(1.05, p))})`}>
                  <circle r={16} fill="none" stroke={LINHA} strokeWidth={TRACO} /><circle r={6} fill={LINHA} />
                  <rect x={-120} y={-86} width={240} height={52} rx={10} fill="rgba(7,8,10,0.85)" stroke={LINHA} strokeWidth={TRACO} />
                  <text y={-50} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={26}>{q.k}</text>
                </g>
              );
            })}
            {[1, 2, 3, 6, 8].map((bi, k) => {
              const b = BLOCOS[bi];
              const p = prog(esp, k * 0.12, 0.4);
              return <circle key={bi} cx={b.x + 50 + (k % 2) * 120} cy={b.y + 110} r={9 * p} fill={C.muted} />;
            })}
            </g>
            <rect {...BLOCOS[4]} fill="rgba(255,255,255,0.05)" stroke={LINHA} strokeWidth={TRACO} />
            <text x={540} y={380} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={26} opacity={fade(grid) * m.outros}>O IMPÉRIO</text>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.3) * (1 - prog(t, c.d_adorei - 0.6, 0.2))}>UM <span style={{ color: A.hex }}>UNIVERSO</span> MAIOR</TituloFolha>
    </div>
  );
};

/* ---------------------------------------------------------------- 5 · elevação: quem entende de patrimônio constrói ---------------------------------------------------------------- */
const LOTE = { x: 560, y: 250, w: 380, h: 250 };
export const Take4: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.d_adorei - 0.2;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.cta_quer - 0.55, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, LOTE, { x: 120, y: 130, w: 840, h: 490 });
  const sobe = prog(t, ini - 0.1, Math.max(1.8, c.d_patr - ini + 0.3), ease.linear);
  const folha = prog(t, ini - 0.1, 0.6, ease.out);
  const patr = prog(t, c.d_patr - 0.2, 0.6, ease.out);
  const caos = prog(t, c.d_caos - 0.2, 0.6, ease.out);
  const carimbo = sp(t, c.d_imp - 0.1, { damping: 13, stiffness: 200 });
  const lote = prog(t, c.e_agora - 0.2, 0.8, ease.out);
  const seus = prog(t, c.e_seus - 0.1, 0.5, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.28, x: -200, y: 230 }, { t: c.d_patr - 0.2, s: 1.0, x: 0, y: 0, e: ease.inOut }, { t: c.e_agora, s: 1.04, x: 10, y: -10, e: ease.out }, { t: c.cta_quer, s: 1.05, x: -10, y: -10, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
            <Cota x1={160} x2={460} y={880} texto="CORTE A-A" p={folha} />
            <Chamada x={310} y={290} bx={540} by={140} bw={400} texto="FAMOSO PELO CAOS" p={caos * (1 - patr)} tone="warn" />
            <Elevacao x={160} chao={830} w={300} andares={7} alt={80} p={sobe} destaque={6} acende={patr} />
            <CotaV x={490} y1={830} y2={830 - 7 * 80} texto="PATRIMÔNIO" p={patr} cor={A.hex} />
            <g opacity={fade(carimbo)} transform={`translate(560 640) scale(${mix(1.25, 1, Math.min(1, carimbo))})`}>
              <Carimbo x={0} y={0} w={400} projeto="IMPÉRIO" folha="PERSONAGEM FICTÍCIO" p={1} />
            </g>
            </g>
            <rect {...LOTE} fill="none" stroke={A.hex} strokeWidth={TRACO} strokeDasharray="14 10" opacity={fade(lote)} pathLength={1} />
            <g opacity={fade(seus)} textAnchor="middle" fontFamily={M} fontWeight={700}>
              <text x={LOTE.x + LOTE.w / 2} y={LOTE.y + 110} fill={A.hex} fontSize={30}>E OS SEUS</text>
              <text x={LOTE.x + LOTE.w / 2} y={LOTE.y + 156} fill={C.text} fontSize={30}>IMÓVEIS?</text>
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha size={52} p={prog(t, ini, 0.3) * (1 - prog(t, c.cta_quer - 0.6, 0.2))}>QUEM ENTENDE DE <span style={{ color: A.hex }}>PATRIMÔNIO</span></TituloFolha>
    </div>
  );
};
