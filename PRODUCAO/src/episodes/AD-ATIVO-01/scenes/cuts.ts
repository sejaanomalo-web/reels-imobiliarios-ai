import { ease } from "../../../lib/anim";
import type { CamKey } from "../../../components/Camera";

/** Entrada da lista de câmera do anúncio: `cut: true` = CORTE (segura o enquadramento anterior até 0,14 s antes e salta);
 *  sem `cut` = movimento contínuo até ali. */
export type AdKey = Omit<CamKey, "e"> & { cut?: boolean; e?: CamKey["e"] };

export const buildCuts = (list: AdKey[], dur = 0.14): CamKey[] => {
  const sorted = [...list].sort((a, b) => a.t - b.t);
  const out: CamKey[] = [];
  const st = { x: 0, y: 0, s: 1, r: 0 };
  for (const k of sorted) {
    if (k.cut && out.length) out.push({ t: Math.max(out[out.length - 1].t + 0.001, k.t - dur), x: st.x, y: st.y, s: st.s * 1.025, r: st.r, e: ease.linear }); // segura com leve avanço
    st.x = k.x ?? st.x;
    st.y = k.y ?? st.y;
    st.s = k.s ?? st.s;
    st.r = k.r ?? st.r;
    out.push({ t: k.t, x: st.x, y: st.y, s: st.s, r: st.r, e: k.e ?? (k.cut ? ease.out : ease.inOut) });
  }
  return out;
};
