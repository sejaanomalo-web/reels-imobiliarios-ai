import React from "react";
import { Composition, Folder, Still } from "remotion";
import { EP001, timeline as ep001 } from "./episodes/EP001/Episode";
import { EP001Cover } from "./episodes/EP001/Cover";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Folder name="EP001">
    <Composition
      id="EP001"
      component={EP001}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={ep001.fps}
      durationInFrames={ep001.durationInFrames}
      defaultProps={{ withAudio: true }}
    />
    <Still id="EP001-Capa" component={EP001Cover} width={VIDEO.width} height={VIDEO.height} />
  </Folder>
);
