import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Folder, Paper } from "./scenes/ui";

/** Capa 1080×1920 — pasta COMISSÃO com papéis voando; conteúdo crítico no recorte 3:4 (y 240–1680). Sem valores. */
export const ATIVOREEL15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O jeito mais rápido de <span style={{ color: C.warn }}>complicar seus impostos</span>
    </div>
    <div style={{ position: "absolute", left: 330, top: 700, transform: "rotate(-4deg)" }}><Folder w={420} label="COMISSÃO" tone="warn" open={0.6} /></div>
    {[[200, 660, -20], [780, 640, 18], [170, 960, 12], [820, 940, -14]].map(([x, y, r], i) => <div key={i} style={{ position: "absolute", left: x, top: y, transform: `rotate(${r}deg)` }}><Paper w={100} /></div>)}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1170, textAlign: "center", fontWeight: 800, fontSize: 54, color: C.text }}>
      Organize. Consulte. <span style={{ color: BRAND.hex }}>Confirme.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1260, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>TOM IRÔNICO · NÃO É ORIENTAÇÃO TRIBUTÁRIA</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
