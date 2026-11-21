import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Escapa, Caminho, Celular, Degraus, Dissolver, Figura, Halo, Holofote, Icone, IconeTraco, NOIR, Orbita, Pilula, Portal, Relogio,
  TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO_PICTO_01 — "Ninguém te avisa quando um cliente desiste" — SEGUNDO MODELO (Pictograma cinematográfico).
 * Roteiro original ATIVO. Sem corte seco: travelling, portal, apagar a luz com âncora, partículas. Pictogramas ilustrativos.
 */
const CHAO = 1180;
const Chao: React.FC<{ y?: number; x1?: number; x2?: number }> = ({ y = CHAO, x1 = -400, x2 = 1480 }) => <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>{children}</svg>;
type P = { t: number; tl: Timeline };
const W = (tl: Timeline, re: RegExp, seg: string, fb: number) => {
  for (const k of tl.captions) if (k.seg === seg) for (const x of k.words) if (re.test(x.text)) return x.start;
  return fb;
};

/** 1–2 · Gancho: ninguém avisa → ele para de responder (travelling para a direita, revela o cliente que apaga). */
export const Gancho: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tEle = W(tl, /^ele$/i, "s2", 3.0);
  const tOntem = c.a_ontem;
  const linha = prog(t, tEle + 0.1, 0.7, ease.out);
  const corta = prog(t, c.h_resp, 0.5, ease.inOut);
  const out = luz(t, -1, tOntem + 0.6, 0.01, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <CamNoir t={t} push={0.008} keys={[{ t: 0, s: 1.02 }, { t: 2.6, s: 1.06, y: -10 }, { t: tEle + 0.2, s: 1.0, x: -170, y: 0 }, { t: c.h_resp, s: 1.02, x: -190 }, { t: tOntem - 0.25, s: 1.04, x: -190 }, { t: tOntem + 0.5, s: 2.6, x: -278, y: 104, e: ease.in }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={400} p={prog(t, 0, 0.6)} />
          <Orbita t={t} cx={540} cy={760} rx={340} ry={92} vel={0.05} itens={[{ nome: "casa", fase: 0.05, at: 0.3 }, { nome: "chave", fase: 0.3, at: 0.6 }, { nome: "chat", fase: 0.55, at: 0.9, tom: t > c.h_resp ? "vermelho" : "branco" }, { nome: "pessoa", fase: 0.8, at: 1.2 }]} p={1 - prog(t, tEle, 0.6)} />
          <Figura t={t} x={540} y={CHAO} pose="celular" />
          {/* cliente à direita, ligado por linha pontilhada que se rompe */}
          <line x1={600} y1={CHAO - 210} x2={mix(600, 900, linha)} y2={CHAO - 210} stroke={corta > 0.5 ? NOIR.vermelho : NOIR.branco} strokeOpacity={0.7 * (1 - corta * 0.6)} strokeWidth={3} strokeDasharray={corta > 0 ? "3 14" : "3 8"} />
          <Figura t={t} x={960} y={CHAO} s={0.92} pose="pe" tom={corta > 0.5 ? "fantasma" : "cinza"} p={surge(t, tEle)} flip />
        </Svg>
        <Bolha t={t} at={tEle + 0.5} ate={c.h_resp} x={1010} y={760} lado="dir" texto="..." tom="cinza" size={40} />
        <Pilula t={t} at={c.h_resp + 0.1} x={960} y={840} texto="SEM RESPOSTA" tom="vermelho" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.h_ninguem + 0.05} ate={c.h_desiste + 0.75} linhas={[{ texto: "NINGUÉM" }, { texto: "TE AVISA", cor: "vermelho" }]} top={300} />
    </div>
  );
};

/** 3 · Portal para dentro do celular: ontem havia conversa; hoje, silêncio (a luz apaga e só o celular fica). */
export const Conversa: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tE5 = W(tl, /^e$/i, "s5", 8.36);
  const apaga = prog(t, c.a_sil - 0.1, 0.8, ease.inOut);
  const out = 1 - prog(t, tE5 - 0.2, 0.5, ease.inOut);
  return (
    <Portal t={t} at={c.a_ontem - 0.3} dur={0.75} cx={410} cy={892} r0={36}>
      <div style={{ position: "absolute", inset: 0, opacity: out }}>
        <CamNoir t={t} t0={c.a_ontem} push={0.01} keys={[{ t: c.a_ontem - 0.35, s: 1.12 }, { t: c.a_ontem + 0.6, s: 1.0, e: ease.out }]}>
          <Svg>
            <Halo x={540} y={760} r={420} p={1 - apaga * 0.6} />
            <Celular x={540} y={760 + Math.sin(t * 1.4) * 10} w={420} h={720} brilho={1 - apaga * 0.5} tom={apaga > 0.5 ? NOIR.cinza : NOIR.branco}>
              {t < c.a_manda - 0.3 ? [0, 1, 2].map((k) => <circle key={k} cx={180 + k * 30} cy={300 + Math.sin(t * 8 - k) * 6} r={8} fill={NOIR.branco} opacity={0.4 + 0.4 * Math.sin(t * 8 - k)} />) : null}
              <g opacity={1 - apaga}>
                <Icone t={t} nome="casa" x={120} y={520} r={44} p={surge(t, c.a_manda)} />
                <Icone t={t} nome="predio" x={210} y={520} r={44} p={surge(t, c.a_manda + 0.15)} />
                <Icone t={t} nome="casa" x={300} y={520} r={44} p={surge(t, c.a_manda + 0.3)} />
              </g>
            </Celular>
          </Svg>
          <Bolha t={t} at={c.a_manda - 0.25} ate={c.a_sil - 0.1} x={370} y={540} lado="esq" texto="Me manda mais opções?" size={32} />
          <Pilula t={t} at={c.a_ontem} ate={c.a_hoje - 0.1} x={540} y={340} texto="ONTEM" tom="branco" />
          <Pilula t={t} at={c.a_hoje} x={540} y={340} texto="HOJE" tom="vermelho" />
        </CamNoir>
      </div>
    </Portal>
  );
};

/** 4 · Memórias que se apagam: a última conversa, o áudio, a visita (ícones viram poeira). */
export const Memoria: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tE5 = W(tl, /^e$/i, "s5", 8.36);
  const tNao = W(tl, /^não$/i, "s7", 13.96);
  const on = luz(t, tE5 - 0.1, tNao - 0.35, 0.6, 0.5);
  const bolha = surge(t, tE5 + 0.2, 0.6);
  const some = prog(t, c.a_ultima, 0.9, ease.in);
  const cinzaAudio = t > c.a_audio + 0.9;
  const cinzaVisita = t > c.a_visita + 0.9;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tE5} push={0.01} keys={[{ t: tE5, s: 1.0, x: 40 }, { t: c.a_audio, s: 1.03, x: 0, y: -10 }, { t: tNao, s: 1.06, x: -30, y: -20 }]}>
        <Svg>
          <Chao />
          <Holofote x={400} chao={CHAO} w={380} />
          <Figura t={t} x={400} y={CHAO} pose="cabisbaixo" />
          {/* bolha de pensamento */}
          <g opacity={bolha}>
            <circle cx={470} cy={880} r={8} fill="none" stroke={NOIR.linha} strokeWidth={2.5} />
            <circle cx={505} cy={835} r={13} fill="none" stroke={NOIR.linha} strokeWidth={2.5} />
            <circle cx={640} cy={650} r={150} fill="#090909" stroke={NOIR.linha} strokeWidth={2.5} strokeDasharray={some > 0.5 ? "4 10" : undefined} />
            <g opacity={1 - some}>
              <g transform="translate(640 650) scale(2.4)"><IconeTraco nome="chat" cor={NOIR.branco} w={2.2} /></g>
            </g>
          </g>
          <Dissolver t={t} at={c.a_ultima} x={640} y={720} w={160} h={160} n={90} dur={0.9} />
          <Escapa t={t} x={640} y={760} w={240} n={22} p={bolha} />
          <Icone t={t} nome="audio" x={300} y={560} r={58} tom={cinzaAudio ? "cinza" : "branco"} p={surge(t, c.a_audio - 0.1) * (cinzaAudio ? 0.6 : 1)} brilho={!cinzaAudio} />
          <Icone t={t} nome="calendario" x={800} y={430} r={58} tom={cinzaVisita ? "cinza" : "branco"} p={surge(t, c.a_visita - 0.1) * (cinzaVisita ? 0.6 : 1)} brilho={!cinzaVisita} />
        </Svg>
        <Pilula t={t} at={c.a_audio + 0.3} x={300} y={660} texto="PENDENTE" tom="vermelho" size={24} />
        <Pilula t={t} at={c.a_visita + 0.3} x={800} y={530} texto="PENDENTE" tom="vermelho" size={24} />
      </CamNoir>
    </div>
  );
};

/** 5 · Não faltou imóvel nem preço — faltou continuidade (o caminho entre os dois se rompe). */
export const Faltou: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tNao = W(tl, /^não$/i, "s7", 13.96);
  const tUm = W(tl, /^um$/i, "s9", 17.88);
  const on = luz(t, tNao - 0.35, tUm - 0.3, 0.6, 0.5);
  const dim = prog(t, c.b_faltou - 0.1, 0.4);
  const cam = prog(t, c.b_faltou, 0.7, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tNao} push={0.008} keys={[{ t: tNao - 0.35, s: 1.05 }, { t: c.b_faltou, s: 1.0 }, { t: c.b_faltou + 0.8, s: 0.96, y: 40 }]}>
        <Svg>
          <Chao />
          <g opacity={1 - dim * 0.65}>
            <Icone t={t} nome="casa" x={330} y={640} r={78} tom="branco" p={surge(t, c.b_imovel - 0.15)} brilho />
            <Icone t={t} nome="dinheiro" x={750} y={640} r={78} tom="branco" p={surge(t, c.b_preco - 0.15)} brilho />
            <Icone t={t} nome="check" x={400} y={570} r={30} tom="verde" p={surge(t, c.b_imovel + 0.1)} />
            <Icone t={t} nome="check" x={820} y={570} r={30} tom="verde" p={surge(t, c.b_preco + 0.1)} />
          </g>
          {/* corretor ← caminho rompido → cliente */}
          <g opacity={cam}>
            <Figura t={t} x={200} y={CHAO} s={0.85} pose="pe" />
            <Figura t={t} x={mix(880, 1010, prog(t, c.b_cont, 1.4, ease.inOut))} y={CHAO} s={0.85} pose={t > c.b_cont && t < c.b_cont + 1.4 ? "andando" : "pe"} fase={t * 1.6} tom="cinza" />
            <line x1={260} y1={CHAO - 140} x2={480} y2={CHAO - 140} stroke={A.hex} strokeWidth={5} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${aa(0.5)})` }} />
            <line x1={600} y1={CHAO - 140} x2={820} y2={CHAO - 140} stroke={NOIR.cinza} strokeWidth={4} strokeDasharray="3 12" strokeLinecap="round" />
            <g transform={`translate(540 ${CHAO - 140})`} opacity={surge(t, c.b_cont)}><IconeTraco nome="x" cor={NOIR.vermelho} w={5} /></g>
          </g>
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.b_cont - 0.05} ate={tUm - 0.4} linhas={[{ texto: "FALTOU", size: 64 }, { texto: "CONTINUIDADE", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/** 6 · Um retorno esquecido vira uma semana… vira "já comprei com outro" (travelling acompanha o cliente indo embora). */
export const Semana: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tUm = W(tl, /^um$/i, "s9", 17.88);
  const tO = W(tl, /^o$/i, "s10", 23.32);
  const on = luz(t, tUm - 0.3, tO - 0.3, 0.6, 0.5);
  const dia = Math.max(1, Math.min(7, 1 + Math.floor(prog(t, c.b_retorno, c.b_semana - c.b_retorno, ease.inOut) * 6.99)));
  const anda = prog(t, c.b_retorno, c.b_comprei - c.b_retorno - 0.2, ease.inOut);
  const xc = mix(500, 900, anda);
  const andando = t > c.b_retorno && t < c.b_comprei - 0.2;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tUm} push={0.004} keys={[{ t: tUm - 0.3, s: 1.0, x: 120 }, { t: c.b_retorno, s: 1.0, x: 120 }, { t: c.b_comprei - 0.2, s: 1.0, x: -160 }, { t: tO, s: 1.04, x: -170, y: -20 }]}>
        <Svg>
          <Chao x1={-600} x2={1900} />
          <Figura t={t} x={220} y={CHAO} s={0.9} pose="cabisbaixo" tom={t > c.b_comprei ? "cinza" : "luz"} />
          <Figura t={t} x={xc} y={CHAO} s={0.9} pose={andando ? "andando" : "pe"} fase={t * 1.6} tom="cinza" />
          <Figura t={t} x={1140} y={CHAO} s={0.92} pose={t > c.b_comprei ? "apontando" : "pe"} tom="cinza" flip p={surge(t, c.b_comprei - 0.6)} />
          {t > c.b_comprei ? <g transform={`translate(1020 ${CHAO - 175})`} opacity={surge(t, c.b_comprei)}><circle r={22} fill="none" stroke={NOIR.vermelho} strokeWidth={3} /></g> : null}
        </Svg>
        <Pilula t={t} at={c.b_retorno - 0.1} ate={c.b_comprei - 0.1} x={540} y={420} texto={`DIA ${dia}`} tom={dia >= 7 ? "vermelho" : "branco"} size={30} />
        <Bolha t={t} at={c.b_comprei - 0.1} x={1130} y={820} lado="dir" texto="Já comprei com outro." tom="vermelho" size={32} />
        <Pilula t={t} at={c.b_outro + 0.15} x={1020} y={700} texto="VENDA PERDIDA" tom="vermelho" cheia size={26} />
      </CamNoir>
    </div>
  );
};

/** 7 · O mercado não espera: relógio girando rápido, o corretor apaga. */
export const Mercado: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tO = W(tl, /^o$/i, "s10", 23.32);
  const tMas = W(tl, /^mas$/i, "s11", 25.4);
  const on = luz(t, tO - 0.3, tMas - 0.2, 0.6, 0.45);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tO} push={0.02} keys={[{ t: tO - 0.3, s: 1.08 }, { t: tO + 0.6, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Relogio t={t} x={540} y={700} r={220} vel={0.9} />
          <Figura t={t} x={540} y={CHAO} s={0.85} pose="cabisbaixo" tom={t > c.c_esquece ? "cinza" : "luz"} />
        </Svg>
      </CamNoir>
    </div>
  );
};

/** 8 · Quem acompanha: a luz volta (verde), o caminho se desenha e o corretor percorre os nós (O QUE PROCURA → PRÓXIMO PASSO). */
export const Acompanha: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tMas = W(tl, /^mas$/i, "s11", 25.4);
  const tV = c.x_venda;
  const on = luz(t, tMas - 0.2, tV - 0.15, 0.7, 0.45);
  const pts: [number, number][] = [[160, CHAO], [380, 1060], [600, 940], [820, 820]];
  const p = prog(t, c.c_acomp - 0.1, c.c_passo + 0.3 - c.c_acomp, ease.inOut);
  // posição do boneco ao longo do caminho
  const seg = Math.min(2.999, p * 3), i = Math.floor(seg), f = seg - i;
  const fx = mix(pts[i][0], pts[i + 1][0], f), fy = mix(pts[i][1], pts[i + 1][1], f);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tMas} push={0.004} keys={[{ t: tMas - 0.2, s: 1.0, x: 120, y: -40 }, { t: c.c_acomp, s: 1.0, x: 120, y: -40 }, { t: c.c_passo + 0.3, s: 1.0, x: -150, y: 160 }]}>
        <Svg>
          <Halo x={820} y={760} r={420} cor={A.hex} p={prog(t, c.c_recomp, 0.8)} />
          <Caminho pontos={pts} p={p} />
          {[[380, 1060, 760, c.c_acomp + 0.2], [600, 940, 640, c.c_procura - 0.1], [820, 820, 520, c.c_passo - 0.1]].map(([x, y0, y1, at]) => <line key={x} x1={x} y1={y0 - 14} x2={x} y2={y1 + 50} stroke={A.hex} strokeOpacity={0.5 * surge(t, at)} strokeWidth={2} strokeDasharray="2 8" />)}
          <Icone t={t} nome="pessoa" x={380} y={760} r={46} tom="verde" p={surge(t, c.c_acomp + 0.2)} brilho />
          <Icone t={t} nome="lupa" x={600} y={640} r={46} tom="verde" p={surge(t, c.c_procura - 0.1)} brilho />
          <Icone t={t} nome="calendario" x={820} y={520} r={46} tom="verde" p={surge(t, c.c_passo - 0.1)} brilho />
          <Figura t={t} x={fx} y={fy} s={0.8} pose={p > 0 && p < 1 ? "subindo" : "pe"} fase={t * 1.7} tom={p > 0.98 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.c_acomp + 0.25} x={380} y={685} texto="CLIENTE" size={24} />
        <Pilula t={t} at={c.c_procura} x={600} y={565} texto="O QUE PROCURA" tom="verde" size={24} />
        <Pilula t={t} at={c.c_passo} x={820} y={445} texto="PRÓXIMO PASSO" tom="verde" size={24} />
      </CamNoir>
    </div>
  );
};

/** 9 · Venda não é sorte. É memória organizada (degraus acesos + holofote; título troca saindo do desfoque). */
export const Memorias: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const tV = c.x_venda;
  const fim = c.cta_quer;
  const on = luz(t, tV - 0.15, fim - 0.25, 0.5, 0.45);
  const subiu = prog(t, c.x_memoria, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={tV} push={0.012} keys={[{ t: tV - 0.15, s: 1.0 }, { t: fim, s: 1.04, y: 20 }]}>
        <Svg>
          <Holofote x={760} chao={980} w={360} p={subiu} cor="#FFFFFF" />
          <Degraus t={t} at={tV - 0.1} x0={260} y0={CHAO} n={5} dx={125} dy={-50} w={140} acesos={t > c.x_memoria ? 4 : t > c.x_sorte ? 1 : 0} />
          <Figura t={t} x={mix(260, 760, subiu)} y={mix(CHAO - 9, CHAO - 209, subiu)} s={0.8} pose={subiu > 0 && subiu < 1 ? "subindo" : subiu >= 1 ? "comemorando" : "pe"} fase={t * 2} tom={subiu >= 1 ? "verde" : "luz"} />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={tV} ate={c.x_memoria - 0.15} linhas={[{ texto: "VENDA" }, { texto: "NÃO É SORTE", cor: "vermelho" }]} top={300} />
      <TituloNoir t={t} at={c.x_memoria} ate={fim - 0.3} linhas={[{ texto: "MEMÓRIA" }, { texto: "ORGANIZADA", cor: "verde" }]} top={300} />
    </div>
  );
};

export { Dissolver, ease, mix, prog };
