import React from "react";
import { Composition, Folder, Still } from "remotion";
import { EP001, timeline as ep001 } from "./episodes/EP001/Episode";
import { EP001Cover } from "./episodes/EP001/Cover";
import { EP002, timeline as ep002 } from "./episodes/EP002/Episode";
import { EP002Cover } from "./episodes/EP002/Cover";
import { EP003, timeline as ep003 } from "./episodes/EP003/Episode";
import { EP003Cover } from "./episodes/EP003/Cover";
import { EP015, timeline as ep015 } from "./episodes/EP015/Episode";
import { EP015Cover } from "./episodes/EP015/Cover";
import { EP015V2, timeline as ep015v2 } from "./episodes/EP015V2/Episode";
import { EP015V2Cover } from "./episodes/EP015V2/Cover";
import { EP016, timeline as ep016 } from "./episodes/EP016/Episode";
import { EP016Cover } from "./episodes/EP016/Cover";
import { EP017, timeline as ep017 } from "./episodes/EP017/Episode";
import { EP017Cover } from "./episodes/EP017/Cover";
import { EP018, timeline as ep018 } from "./episodes/EP018/Episode";
import { EP018Cover } from "./episodes/EP018/Cover";
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
    <Folder name="EP003">
      <Composition
        id="EP003"
        component={EP003}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep003.fps}
        durationInFrames={ep003.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP003-Capa" component={EP003Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP015">
      <Composition
        id="EP015"
        component={EP015}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep015.fps}
        durationInFrames={ep015.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP015-Capa" component={EP015Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP015V2"
        component={EP015V2}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep015v2.fps}
        durationInFrames={ep015v2.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP015V2-Capa" component={EP015V2Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP016">
      <Composition
        id="EP016"
        component={EP016}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep016.fps}
        durationInFrames={ep016.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP016-Capa" component={EP016Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP017">
      <Composition
        id="EP017"
        component={EP017}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep017.fps}
        durationInFrames={ep017.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP017-Capa" component={EP017Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP018">
      <Composition
        id="EP018"
        component={EP018}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep018.fps}
        durationInFrames={ep018.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP018-Capa" component={EP018Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
  </>
);
