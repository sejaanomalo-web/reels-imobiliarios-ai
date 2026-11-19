import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Balance, Chip, People, Tag } from "./ui";

/**
 * CENA 2 — CENÁRIO A (hipotético). "Imagina um momento de crédito mais caro." → quadro CENÁRIO HIPOTÉTICO + balança COMPRADORES ×
 * VENDEDORES. "Parte dos compradores financia menos, alguns adiam planos e certos vendedores podem ficar mais abertos à negociação." → as
 * fichas FINANCIA MENOS, ADIA PLANOS e MAIS ABERTOS? caem nos pratos e a balança mexe. "Mas isso muda conforme a região, o tipo de imóvel e
 * a necessidade de cada lado." → a balança oscila sem parar e entram REGIÃO, TIPO DE IMÓVEL, NECESSIDADE: DEPENDE. Sem taxas nem números.
 */
export const CenA: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_imag - 0.35, { damping: 15, stiffness: 150 });
  const fin = sp(t, c.a_fin - 0.1, { damping: 11, stiffness: 210 });
  const adi = sp(t, c.a_adiam - 0.1, { damping: 11, stiffness: 210 });
  const abe = sp(t, c.a_abert - 0.2, { damping: 11, stiffness: 210 });
  const unsure = prog(t, c.a_mas - 0.1, 0.6, ease.out);
  const tilt = mix(0, -7, Math.min(1, fin)) + mix(0, -3, Math.min(1, adi)) + mix(0, 6, Math.min(1, abe));
  const sway = Math.sin(t * 3.2) * (2 + 7 * unsure);
  const ch = [c.a_reg, c.a_tipo, c.a_nec].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const dep = sp(t, c.a_nec + 0.6, { damping: 12, stiffness: 190 });
  const out = prog(t, c.b_agora - 0.45, 0.4, ease.in);
  const drop = (p: number) => ({ opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * -160}px)` });

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.a_imag - 0.35, s: 1.05, y: 0 },
          { t: c.a_caro + 0.3, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: c.a_fin + 0.2, s: 1.06, x: -10, y: -10, e: ease.inOut },
          { t: c.a_adiam + 0.2, s: 1.09, x: -12, y: -15, e: ease.inOut },
          { t: c.a_vend + 0.2, s: 1.06, x: 10, y: -10, e: ease.inOut },
          { t: c.a_abert + 0.3, s: 1.09, x: 12, y: -15, e: ease.inOut },
          { t: c.a_mas + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: c.a_reg + 0.2, s: 1.06, x: -6, y: -15, e: ease.inOut },
          { t: c.a_tipo + 0.2, s: 1.04, x: 6, y: -10, e: ease.inOut },
          { t: c.a_nec + 0.3, s: 1.07, x: 0, y: -15, e: ease.inOut },
          { t: c.b_agora, s: 1.04, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 395, display: "flex", justifyContent: "center" }}><Tag text="CENÁRIO HIPOTÉTICO" tone="muted" size={26} style={{ color: C.text }} /></div>
        <div style={{ position: "absolute", left: 90, top: 470 }}>
          <Balance w={900} tilt={tilt + sway} leftLabel="COMPRADORES" rightLabel="VENDEDORES"
            left={<>
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><People n={3} size={60} /></div>
              {fin > 0.001 ? <div style={drop(fin)}><Chip text="FINANCIA MENOS" size={24} /></div> : null}
              {adi > 0.001 ? <div style={drop(adi)}><Chip text="ADIA PLANOS" size={24} /></div> : null}
            </>}
            right={<>
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><People n={2} size={60} /></div>
              {abe > 0.001 ? <div style={drop(abe)}><Chip text="MAIS ABERTOS?" tone="good" size={24} /></div> : null}
            </>}
          />
        </div>
        {/* custo do crédito (sem números) */}
        <div style={{ position: "absolute", left: 180, right: 180, top: 975, opacity: prog(t, c.a_caro - 0.3, 0.5, ease.out) }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}><span>CRÉDITO</span><span style={{ color: C.warn }}>MAIS CARO</span></div>
          <div style={{ marginTop: 8, position: "relative", height: 18, borderRadius: 9, background: C.surface3 }}>
            <div style={{ width: `${mix(30, 82, prog(t, c.a_caro - 0.3, 1.0, ease.out)) + Math.sin(t * 3) * 2}%`, height: "100%", borderRadius: 9, background: C.warn, opacity: 0.85 }} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", gap: 14 }}>
          {["REGIÃO", "TIPO DE IMÓVEL", "NECESSIDADE"].map((k, i) => (ch[i] > 0.001 ? <div key={k} style={{ opacity: Math.min(1, ch[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, ch[i]))}) translateY(${Math.sin(t * 2 + i) * 6}px)` }}><Chip text={k} tone="good" size={30} /></div> : null))}
        </div>
        {dep > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1160, textAlign: "center", fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: BRAND.hex, opacity: Math.min(1, dep * 1.5), transform: `scale(${mix(1.4, 1, Math.min(1, dep))})` }}>DEPENDE.</div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        CRÉDITO <span style={{ color: C.warn }}>MAIS CARO</span>
      </div>
    </div>
  );
};
