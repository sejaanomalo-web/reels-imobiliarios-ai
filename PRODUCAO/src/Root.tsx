import React from "react";
import { Composition, Folder, Still } from "remotion";
import { EP001, timeline as ep001 } from "./episodes/EP001/Episode";
import { EP001Cover } from "./episodes/EP001/Cover";
import { EP002, timeline as ep002 } from "./episodes/EP002/Episode";
import { EP002Cover } from "./episodes/EP002/Cover";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
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
    <Folder name="EP002">
      <Composition
        id="EP002"
        component={EP002}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep002.fps}
        durationInFrames={ep002.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP002-Capa" component={EP002Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
  </>
);
