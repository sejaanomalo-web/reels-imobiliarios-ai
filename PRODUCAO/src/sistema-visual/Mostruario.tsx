import React from "react";
import { AbsoluteFill } from "remotion";
import { ATMOSFERA, AtmosferaNome, C, DS, F, ACENTO } from "../theme";
import { Raios, Personagem, VIS, Holofote, Etiqueta, Carimbo, Selo, Clima } from "../estilos/cartoon";
import { FundoNoir, Figura, Holofote as HolofoteNoir } from "../estilos/pictograma";
import { Grain } from "../components/Background";

/**
 * MOSTRUÁRIO do Sistema Visual ATIVO (Nível 1) — composições Still `ATIVO-SISTEMA-VISUAL-*`.
 * Gera as imagens de MARCA/sistema-visual/exemplos/ a partir dos TOKENS e dos KITS reais: se um token mudar, regere.
 * Os painéis "ERRADO" usam de propósito cores e escolhas proibidas — este arquivo não é kit e não entra em vídeo.
 */
const W = 1080;
const T = 6; // instante estático: todas as entradas já terminaram

const Titulo: React.FC<{ texto: string; sub?: string; top: number }> = ({ texto, sub, top }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, fontFamily: F.sans }}>
    <div style={{ fontWeight: 800, fontSize: 34, letterSpacing: "0.14em", color: ACENTO.hex }}>{texto}</div>
    {sub ? <div style={{ fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 6 }}>{sub}</div> : null}
  </div>
);

const Amostra: React.FC<{ cor: string; nome: string; x: number; y: number; w?: number; h?: number; borda?: boolean }> = ({ cor, nome, x, y, w = 150, h = 96, borda }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, fontFamily: F.mono }}>
    <div style={{ width: w, height: h, borderRadius: 16, background: cor, border: borda ? `2px solid ${C.line}` : "none" }} />
    <div style={{ fontSize: 24, fontWeight: 700, color: DS.cor.texto.branco, marginTop: 8 }}>{cor.toUpperCase()}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color: C.muted }}>{nome}</div>
  </div>
);

/** Prancha 1: cores, atmosferas (desenhadas pelo kit do Primeiro modelo) e tipografia. */
export const MostruarioTokens: React.FC = () => {
  const atms: AtmosferaNome[] = ["neutra", "explicacao", "dilema", "dados", "memoria", "tensao", "solucao"];
  const fundos = Object.entries(DS.cor.fundo);
  const textos = Object.entries(DS.cor.texto);
  return (
    <AbsoluteFill style={{ background: DS.cor.fundo.base }}>
      <div style={{ position: "absolute", left: 60, top: 70, fontFamily: F.sans }}>
        <div style={{ fontWeight: 800, fontSize: 72, letterSpacing: "-0.02em", color: DS.cor.texto.branco }}>SISTEMA VISUAL <span style={{ color: ACENTO.hex }}>ATIVO</span></div>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 6 }}>NÍVEL 1 · v{DS.versao} · MARCA/sistema-visual/tokens.json</div>
      </div>
      <Titulo texto="ACENTO ÚNICO" top={250} />
      <Amostra cor={ACENTO.hex} nome="acento" x={60} y={305} w={300} h={130} />
      <Amostra cor={ACENTO.ink} nome="ink" x={390} y={305} w={150} h={130} borda />
      <Amostra cor={ACENTO.deep} nome="deep" x={570} y={305} w={150} h={130} />
      <Amostra cor={DS.cor.alerta.hex} nome="alerta" x={750} y={305} w={130} h={130} />
      <Amostra cor={DS.cor.alerta.fundo} nome="cheio" x={900} y={305} w={120} h={130} />
      <Titulo texto="FUNDOS" top={540} />
      {fundos.map(([k, v], i) => <Amostra key={k} cor={v} nome={k.replace("superficie", "sup")} x={60 + i * 163} y={595} w={145} h={80} borda />)}
      <Titulo texto="TEXTO" top={790} />
      {textos.map(([k, v], i) => <Amostra key={k} cor={v} nome={k} x={60 + i * 195} y={845} w={175} h={70} />)}
      <Titulo texto="ATMOSFERAS" sub="a cor do clima é global; o desenho é de cada modelo" top={1035} />
      {atms.map((k, i) => (
        <div key={k} style={{ position: "absolute", left: 40 + i * 145, top: 1140, width: 135 }}>
          <div style={{ width: 135, height: 240, overflow: "hidden", borderRadius: 14, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, transform: "scale(0.125)", transformOrigin: "0 0" }}>
              <Raios t={T} clima={k as Clima} vin={0.8} />
            </div>
          </div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: DS.cor.texto.branco, marginTop: 8, textAlign: "center" }}>{k.slice(0, 7)}</div>
          <div style={{ width: 135, height: 10, marginTop: 6, borderRadius: 5, background: ATMOSFERA[k].centro }} />
        </div>
      ))}
      <Titulo texto="TIPOGRAFIA" sub="Manrope 800/700 · JetBrains Mono só para dados" top={1460} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 1560, fontFamily: F.sans, fontWeight: 800, color: DS.cor.texto.branco }}>
        <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: "-0.03em" }}>DISPLAY 104–124</div>
        <div style={{ fontSize: 72, lineHeight: 1.1 }}>Título 72 · <span style={{ color: ACENTO.hex }}>destaque</span></div>
        <div style={{ fontSize: 52, lineHeight: 1.3 }}>Legenda 52–80 <span style={{ color: DS.cor.alerta.hex }}>negativa</span> <span style={{ color: DS.cor.texto.pendente }}>pendente</span></div>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: C.muted, marginTop: 6 }}>RÓTULO 30–40 · MICRO 24–28 · MÍNIMO 24/30</div>
      </div>
      <Grain frame={0} />
    </AbsoluteFill>
  );
};

/** Moldura de um exemplo: cena desenhada em 1080×658 e reduzida para 500×300. */
const Painel: React.FC<{ x: number; y: number; ok: boolean; rotulo: string; children: React.ReactNode }> = ({ x, y, ok, rotulo, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 500 }}>
    <div style={{ width: 500, height: 300, overflow: "hidden", borderRadius: 18, position: "relative", border: `4px solid ${ok ? ACENTO.hex : DS.cor.alerta.hex}` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 658, transform: `scale(${492 / W})`, transformOrigin: "0 0", overflow: "hidden" }}>{children}</div>
    </div>
    <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 28, color: ok ? ACENTO.hex : DS.cor.alerta.hex, marginTop: 8, whiteSpace: "nowrap" }}>{ok ? "✓ CERTO" : "✕ ERRADO"} <span style={{ fontWeight: 700, fontSize: 25, color: C.muted }}>· {rotulo}</span></div>
  </div>
);

const Cena: React.FC<{ fundo?: React.ReactNode; children?: React.ReactNode }> = ({ fundo, children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    {fundo}
    {children}
  </div>
);

/** Prancha 2: certo × errado (4 regras do Nível 1), desenhada com os kits reais. */
export const MostruarioCertoErrado: React.FC = () => {
  const linha = (i: number) => 240 + i * 415;
  const legenda = (txt: React.ReactNode, estilo: React.CSSProperties) => (
    <div style={{ position: "absolute", left: 80, right: 80, top: 250, textAlign: "center", fontFamily: F.sans, fontSize: 80, lineHeight: 1.05, ...estilo }}>{txt}</div>
  );
  const raiosNoCentro = (clima: Clima, vin: number) => <div style={{ position: "absolute", left: 0, top: -570 }}><Raios t={T} clima={clima} vin={vin} /></div>;
  return (
    <AbsoluteFill style={{ background: DS.cor.fundo.base }}>
      <div style={{ position: "absolute", left: 60, top: 70, fontFamily: F.sans }}>
        <div style={{ fontWeight: 800, fontSize: 64, color: DS.cor.texto.branco }}>CERTO × ERRADO</div>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 6 }}>SISTEMA VISUAL ATIVO · NÍVEL 1 · v{DS.versao}</div>
      </div>
      {/* 1. Verde */}
      <Painel x={30} y={linha(0)} ok rotulo="um verde, com sentido">
        <Cena fundo={raiosNoCentro("explica", 0.85)}>
          {legenda(<>VOCÊ PRECISA <span style={{ color: ACENTO.hex }}>ORGANIZAR</span></>, { fontWeight: 800, color: DS.cor.texto.branco, WebkitTextStroke: `13px ${DS.cor.contorno}`, paintOrder: "stroke fill" })}
        </Cena>
      </Painel>
      <Painel x={550} y={linha(0)} ok={false} rotulo="3 verdes e verde em tudo">
        <Cena fundo={<div style={{ position: "absolute", inset: 0, background: "#0E3A1F" }} />}>
          {legenda(<><span style={{ color: "#3AF584" }}>VOCÊ</span> <span style={{ color: "#35E0A1" }}>PRECISA</span> <span style={{ color: "#00FA44" }}>ORGANIZAR</span></>, { fontWeight: 800 })}
        </Cena>
      </Painel>
      {/* 2. Legenda */}
      <Painel x={30} y={linha(1)} ok rotulo="Manrope 800 + contorno">
        <Cena fundo={raiosNoCentro("conflito", 0.8)}>
          {legenda(<>O CLIENTE <span style={{ color: DS.cor.alerta.hex }}>SUMIU</span></>, { fontWeight: 800, color: DS.cor.texto.branco, WebkitTextStroke: `13px ${DS.cor.contorno}`, paintOrder: "stroke fill", textShadow: "0 6px 18px rgba(0,0,0,0.7)" })}
        </Cena>
      </Painel>
      <Painel x={550} y={linha(1)} ok={false} rotulo="fino, cinza, sem contorno">
        <Cena fundo={raiosNoCentro("conflito", 0.2)}>
          {legenda(<>o cliente sumiu</>, { fontWeight: 500, color: "#B9B2B2", fontSize: 64 })}
        </Cena>
      </Painel>
      {/* 3. Fundo e luz */}
      <Painel x={30} y={linha(2)} ok rotulo="escuro + luz no protagonista">
        <Cena fundo={<div style={{ position: "absolute", left: 0, top: -640 }}><FundoNoir t={T} quente={0.8} chao={1180} /></div>}>
          <svg width={W} height={658} style={{ position: "absolute", inset: 0 }}>
            <g transform="translate(0,-640)">
              <HolofoteNoir x={540} chao={1180} w={420} />
              <Figura t={T} x={540} y={1180} s={1.2} pose="comemorando" />
            </g>
          </svg>
        </Cena>
      </Painel>
      <Painel x={550} y={linha(2)} ok={false} rotulo="fundo claro roxo/ciano">
        <Cena fundo={<div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#7B61FF,#22D3EE)" }} />}>
          <svg width={W} height={658} style={{ position: "absolute", inset: 0 }}>
            <g transform="translate(0,-640)"><Figura t={T} x={540} y={1180} s={1.2} pose="comemorando" /></g>
          </svg>
        </Cena>
      </Painel>
      {/* 4. Hierarquia */}
      <Painel x={30} y={linha(3)} ok rotulo="1 protagonista + 1 rótulo">
        <Cena fundo={raiosNoCentro("explica", 0.85)}>
          <svg width={W} height={658} style={{ position: "absolute", inset: 0 }}>
            <Holofote x={540} chao={610} w={520} />
            <Personagem t={T} x={540} y={610} s={0.9} v={VIS.A} humor="feliz" braco={145} />
          </svg>
          <Etiqueta t={T} at={0} x={540} y={70} texto="CORRETOR ORGANIZADO" cor="green" size={40} />
        </Cena>
      </Painel>
      <Painel x={550} y={linha(3)} ok={false} rotulo="tudo ao mesmo tempo">
        <Cena fundo={raiosNoCentro("pergunta", 0.4)}>
          <svg width={W} height={658} style={{ position: "absolute", inset: 0 }}>
            <Personagem t={T} x={540} y={610} s={0.9} v={VIS.A} humor="espanto" braco={30} />
          </svg>
          <Selo t={T} at={0} texto="TUDO AO MESMO TEMPO" top={40} />
          <Etiqueta t={T} at={0} x={250} y={200} texto="LEADS" cor="white" />
          <Etiqueta t={T} at={0} x={830} y={200} texto="IMÓVEIS" cor="red" />
          <Etiqueta t={T} at={0} x={250} y={360} texto="AGENDA" cor="green" />
          <Carimbo t={T} at={0} x={800} y={420} texto="URGENTE!" size={70} />
        </Cena>
      </Painel>
      <Grain frame={0} />
    </AbsoluteFill>
  );
};
