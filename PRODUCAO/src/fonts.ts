import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const manrope = [500, 600, 700, 800].map((w) =>
  loadFont({
    family: "Manrope",
    url: staticFile(`fonts/manrope-latin-${w}-normal.woff2`),
    weight: String(w),
  }),
);
const mono = [500, 700].map((w) =>
  loadFont({
    family: "JetBrains Mono",
    url: staticFile(`fonts/jetbrains-mono-latin-${w}-normal.woff2`),
    weight: String(w),
  }),
);

export const fontsReady = Promise.all([...manrope, ...mono]);
