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
import { EP019, timeline as ep019 } from "./episodes/EP019/Episode";
import { EP019Cover } from "./episodes/EP019/Cover";
import { EP020, timeline as ep020 } from "./episodes/EP020/Episode";
import { EP020Cover } from "./episodes/EP020/Cover";
import { EP030, timeline as ep030 } from "./episodes/EP030/Episode";
import { EP030Cover } from "./episodes/EP030/Cover";
import { EP031, timeline as ep031 } from "./episodes/EP031/Episode";
import { EP031Cover } from "./episodes/EP031/Cover";
import { EP032, timeline as ep032 } from "./episodes/EP032/Episode";
import { EP032Cover } from "./episodes/EP032/Cover";
import { EP033, timeline as ep033 } from "./episodes/EP033/Episode";
import { EP033Cover } from "./episodes/EP033/Cover";
import { ATIVO01, timeline as ativo01 } from "./episodes/EP-ATIVO01/Episode";
import { ATIVO01Cover } from "./episodes/EP-ATIVO01/Cover";
import { ATIVO02, timeline as ativo02 } from "./episodes/EP-ATIVO02/Episode";
import { ATIVO02Cover } from "./episodes/EP-ATIVO02/Cover";
import { LandingAtivo, timeline as lpAtivo } from "./episodes/LP-ATIVO/Landing";
import { LandingPoster } from "./episodes/LP-ATIVO/Poster";
import { LandingAtivoV2, timeline as lpAtivoV2 } from "./episodes/LP-ATIVO-V2/Landing";
import { LandingPoster as LandingPosterV2 } from "./episodes/LP-ATIVO-V2/Poster";
import { LandingAtivoV3, timeline as lpAtivoV3 } from "./episodes/LP-ATIVO-V3/Landing";
import { LandingPoster as LandingPosterV3 } from "./episodes/LP-ATIVO-V3/Poster";
import { Story01, timeline as story01 } from "./episodes/STORY-ATIVO-01/Story";
import { Story02, timeline as story02 } from "./episodes/STORY-ATIVO-02/Story";
import { Story03, timeline as story03 } from "./episodes/STORY-ATIVO-03/Story";
import { Story04, timeline as story04 } from "./episodes/STORY-ATIVO-04/Story";
import { Story05, timeline as story05 } from "./episodes/STORY-ATIVO-05/Story";
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
    <Folder name="EP019">
      <Composition
        id="EP019"
        component={EP019}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep019.fps}
        durationInFrames={ep019.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP019-Capa" component={EP019Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP020">
      <Composition
        id="EP020"
        component={EP020}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep020.fps}
        durationInFrames={ep020.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP020-Capa" component={EP020Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP030">
      <Composition
        id="EP030"
        component={EP030}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep030.fps}
        durationInFrames={ep030.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP030-Capa" component={EP030Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP031">
      <Composition
        id="EP031"
        component={EP031}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep031.fps}
        durationInFrames={ep031.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP031-Capa" component={EP031Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP032">
      <Composition
        id="EP032"
        component={EP032}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep032.fps}
        durationInFrames={ep032.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP032-Capa" component={EP032Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="EP033">
      <Composition
        id="EP033"
        component={EP033}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ep033.fps}
        durationInFrames={ep033.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP033-Capa" component={EP033Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="ATIVO-EP01">
      <Composition
        id="EP-ATIVO01"
        component={ATIVO01}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo01.fps}
        durationInFrames={ativo01.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO01-Capa" component={ATIVO01Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="ATIVO-EP02">
      <Composition
        id="EP-ATIVO02"
        component={ATIVO02}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo02.fps}
        durationInFrames={ativo02.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO02-Capa" component={ATIVO02Cover} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    <Folder name="LP-ATIVO-16x9">
      <Composition
        id="LP-ATIVO"
        component={LandingAtivo}
        width={1920}
        height={1080}
        fps={lpAtivo.fps}
        durationInFrames={lpAtivo.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="LP-ATIVO-Capa" component={LandingPoster} width={1920} height={1080} />
    </Folder>
    <Folder name="LP-ATIVO-V2-16x9">
      <Composition
        id="LP-ATIVO-V2"
        component={LandingAtivoV2}
        width={1920}
        height={1080}
        fps={lpAtivoV2.fps}
        durationInFrames={lpAtivoV2.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="LP-ATIVO-V2-Capa" component={LandingPosterV2} width={1920} height={1080} />
    </Folder>
    <Folder name="LP-ATIVO-V3-16x9">
      <Composition
        id="LP-ATIVO-V3"
        component={LandingAtivoV3}
        width={1920}
        height={1080}
        fps={lpAtivoV3.fps}
        durationInFrames={lpAtivoV3.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="LP-ATIVO-V3-Capa" component={LandingPosterV3} width={1920} height={1080} />
    </Folder>
    <Folder name="STORIES-NA-PRATICA">
      {/* Prévia interna: sem voz (linha do tempo estimada) e sem capturas autorizadas — não publicar. */}
      <Composition
        id="STORY-ATIVO-01"
        component={Story01}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story01.fps}
        durationInFrames={story01.durationInFrames}
        defaultProps={{ withAudio: false }}
      />
      <Composition
        id="STORY-ATIVO-02"
        component={Story02}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story02.fps}
        durationInFrames={story02.durationInFrames}
        defaultProps={{ withAudio: false }}
      />
      <Composition
        id="STORY-ATIVO-03"
        component={Story03}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story03.fps}
        durationInFrames={story03.durationInFrames}
        defaultProps={{ withAudio: false }}
      />
      <Composition
        id="STORY-ATIVO-04"
        component={Story04}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story04.fps}
        durationInFrames={story04.durationInFrames}
        defaultProps={{ withAudio: false }}
      />
      <Composition
        id="STORY-ATIVO-05"
        component={Story05}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story05.fps}
        durationInFrames={story05.durationInFrames}
        defaultProps={{ withAudio: false }}
      />
    </Folder>
  </>
);
