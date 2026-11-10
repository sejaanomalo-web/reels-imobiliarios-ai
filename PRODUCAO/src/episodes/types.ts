export type CaptionWord = { text: string; start: number; end: number; emph: boolean };
export type CaptionChunk = { seg: string; start: number; end: number; words: CaptionWord[] };
export type Timeline = {
  id: string;
  title: string;
  fps: number;
  duration: number;
  durationInFrames: number;
  narrationEnd: number;
  voice: string;
  scenes: { id: string; start: number; end: number }[];
  segments: { id: string; scene: string; text: string; start: number; end: number }[];
  cues: Record<string, number>;
  series: Record<string, number[]>;
  captions: CaptionChunk[];
  /** Segmentos cuja legenda não aparece na tela (o texto já é a tipografia da cena). O SRT mantém todos. */
  hideCaptions?: string[];
};
export type SceneProps = { t: number; tl: Timeline };
