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
import { ATIVO03, timeline as ativo03 } from "./episodes/EP-ATIVO03/Episode";
import { ATIVO03Cover } from "./episodes/EP-ATIVO03/Cover";
import { ATIVO04, timeline as ativo04 } from "./episodes/EP-ATIVO04/Episode";
import { ATIVO04Cover } from "./episodes/EP-ATIVO04/Cover";
import { ATIVO05, timeline as ativo05 } from "./episodes/EP-ATIVO05/Episode";
import { ATIVO05Cover } from "./episodes/EP-ATIVO05/Cover";
import { ATIVO06, timeline as ativo06 } from "./episodes/EP-ATIVO06/Episode";
import { ATIVO06Cover } from "./episodes/EP-ATIVO06/Cover";
import { ATIVO07, timeline as ativo07 } from "./episodes/EP-ATIVO07/Episode";
import { ATIVO07Cover } from "./episodes/EP-ATIVO07/Cover";
import { ATIVO08, timeline as ativo08 } from "./episodes/EP-ATIVO08/Episode";
import { ATIVO08Cover } from "./episodes/EP-ATIVO08/Cover";
import { ATIVO09, timeline as ativo09 } from "./episodes/EP-ATIVO09/Episode";
import { ATIVO09Cover } from "./episodes/EP-ATIVO09/Cover";
import { ATIVOCASE01, timeline as ativocase01 } from "./episodes/EP-ATIVO-CASE01/Episode";
import { ATIVOCASE01Cover } from "./episodes/EP-ATIVO-CASE01/Cover";
import { ATIVO10, timeline as ativo10 } from "./episodes/EP-ATIVO10/Episode";
import { ATIVO10Cover } from "./episodes/EP-ATIVO10/Cover";
import { ATIVOCASE02, timeline as ativocase02 } from "./episodes/EP-ATIVO-CASE02/Episode";
import { ATIVOCASE02Cover } from "./episodes/EP-ATIVO-CASE02/Cover";
import { ATIVOCASE03, timeline as ativocase03 } from "./episodes/EP-ATIVO-CASE03/Episode";
import { ATIVOCASE03Cover } from "./episodes/EP-ATIVO-CASE03/Cover";
import { ATIVOREEL04, timeline as ativoreel04 } from "./episodes/EP-ATIVO-REEL04/Episode";
import { ATIVOREEL04Cover } from "./episodes/EP-ATIVO-REEL04/Cover";
import { ATIVOREEL05, timeline as ativoreel05 } from "./episodes/EP-ATIVO-REEL05/Episode";
import { ATIVOREEL05Cover } from "./episodes/EP-ATIVO-REEL05/Cover";
import { ATIVOREEL06, timeline as ativoreel06 } from "./episodes/EP-ATIVO-REEL06/Episode";
import { ATIVOREEL06Cover } from "./episodes/EP-ATIVO-REEL06/Cover";
import { ATIVOREEL07, timeline as ativoreel07 } from "./episodes/EP-ATIVO-REEL07/Episode";
import { ATIVOREEL07Cover } from "./episodes/EP-ATIVO-REEL07/Cover";
import { ATIVOREEL08, timeline as ativoreel08 } from "./episodes/EP-ATIVO-REEL08/Episode";
import { ATIVOREEL08Cover } from "./episodes/EP-ATIVO-REEL08/Cover";
import { ATIVOREEL09, timeline as ativoreel09 } from "./episodes/EP-ATIVO-REEL09/Episode";
import { ATIVOREEL09Cover } from "./episodes/EP-ATIVO-REEL09/Cover";
import { ATIVOREEL10, timeline as ativoreel10 } from "./episodes/EP-ATIVO-REEL10/Episode";
import { ATIVOREEL10Cover } from "./episodes/EP-ATIVO-REEL10/Cover";
import { ATIVOREEL11, timeline as ativoreel11 } from "./episodes/EP-ATIVO-REEL11/Episode";
import { ATIVOREEL11Cover } from "./episodes/EP-ATIVO-REEL11/Cover";
import { ATIVOREEL12, timeline as ativoreel12 } from "./episodes/EP-ATIVO-REEL12/Episode";
import { ATIVOREEL12Cover } from "./episodes/EP-ATIVO-REEL12/Cover";
import { ATIVOREEL13, timeline as ativoreel13 } from "./episodes/EP-ATIVO-REEL13/Episode";
import { ATIVOREEL13Cover } from "./episodes/EP-ATIVO-REEL13/Cover";
import { ATIVOREEL14, timeline as ativoreel14 } from "./episodes/EP-ATIVO-REEL14/Episode";
import { ATIVOREEL14Cover } from "./episodes/EP-ATIVO-REEL14/Cover";
import { ATIVOREEL15, timeline as ativoreel15 } from "./episodes/EP-ATIVO-REEL15/Episode";
import { ATIVOREEL15Cover } from "./episodes/EP-ATIVO-REEL15/Cover";
import { AD01, timeline as ad01 } from "./episodes/AD-ATIVO-01/Episode";
import { AD02, timeline as ad02 } from "./episodes/AD-ATIVO-02/Episode";
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
import { NOV26_01, timeline as nov26_01 } from "./episodes/ATIVO-NOV26-01/Episode";
import { NOV26_01Cover } from "./episodes/ATIVO-NOV26-01/Cover";
import { NOV26_02, timeline as nov26_02 } from "./episodes/ATIVO-NOV26-02/Episode";
import { NOV26_02Cover } from "./episodes/ATIVO-NOV26-02/Cover";
import { NOV26_03, timeline as nov26_03 } from "./episodes/ATIVO-NOV26-03/Episode";
import { NOV26_03Cover } from "./episodes/ATIVO-NOV26-03/Cover";
import { NOV26_04, timeline as nov26_04 } from "./episodes/ATIVO-NOV26-04/Episode";
import { NOV26_04Cover } from "./episodes/ATIVO-NOV26-04/Cover";
import { NOV26_05, timeline as nov26_05 } from "./episodes/ATIVO-NOV26-05/Episode";
import { NOV26_05Cover } from "./episodes/ATIVO-NOV26-05/Cover";
import { NOV26_06, timeline as nov26_06 } from "./episodes/ATIVO-NOV26-06/Episode";
import { NOV26_06Cover } from "./episodes/ATIVO-NOV26-06/Cover";
import { NOV26_07, timeline as nov26_07 } from "./episodes/ATIVO-NOV26-07/Episode";
import { NOV26_07Cover } from "./episodes/ATIVO-NOV26-07/Cover";
import { NOV26_08, timeline as nov26_08 } from "./episodes/ATIVO-NOV26-08/Episode";
import { NOV26_08Cover } from "./episodes/ATIVO-NOV26-08/Cover";
import { NOV26_09, timeline as nov26_09 } from "./episodes/ATIVO-NOV26-09/Episode";
import { NOV26_09Cover } from "./episodes/ATIVO-NOV26-09/Cover";
import { NOV26_10, timeline as nov26_10 } from "./episodes/ATIVO-NOV26-10/Episode";
import { NOV26_10Cover } from "./episodes/ATIVO-NOV26-10/Cover";
import { NOV26_11, timeline as nov26_11 } from "./episodes/ATIVO-NOV26-11/Episode";
import { NOV26_11Cover } from "./episodes/ATIVO-NOV26-11/Cover";
import { NOV26_12, timeline as nov26_12 } from "./episodes/ATIVO-NOV26-12/Episode";
import { NOV26_12Cover } from "./episodes/ATIVO-NOV26-12/Cover";
import { NOV26_13, timeline as nov26_13 } from "./episodes/ATIVO-NOV26-13/Episode";
import { NOV26_13Cover } from "./episodes/ATIVO-NOV26-13/Cover";
import { NOV26_14, timeline as nov26_14 } from "./episodes/ATIVO-NOV26-14/Episode";
import { NOV26_14Cover } from "./episodes/ATIVO-NOV26-14/Cover";
import { NOV26_15, timeline as nov26_15 } from "./episodes/ATIVO-NOV26-15/Episode";
import { NOV26_15Cover } from "./episodes/ATIVO-NOV26-15/Cover";
import { NOV26_16, timeline as nov26_16 } from "./episodes/ATIVO-NOV26-16/Episode";
import { NOV26_16Cover } from "./episodes/ATIVO-NOV26-16/Cover";
import { NOV26_17, timeline as nov26_17 } from "./episodes/ATIVO-NOV26-17/Episode";
import { NOV26_17Cover } from "./episodes/ATIVO-NOV26-17/Cover";
import { NOV26_18, timeline as nov26_18 } from "./episodes/ATIVO-NOV26-18/Episode";
import { NOV26_18Cover } from "./episodes/ATIVO-NOV26-18/Cover";
import { NOV26_19, timeline as nov26_19 } from "./episodes/ATIVO-NOV26-19/Episode";
import { NOV26_19Cover } from "./episodes/ATIVO-NOV26-19/Cover";
import { NOV26_20, timeline as nov26_20 } from "./episodes/ATIVO-NOV26-20/Episode";
import { NOV26_20Cover } from "./episodes/ATIVO-NOV26-20/Cover";
import { NOV26_21, timeline as nov26_21 } from "./episodes/ATIVO-NOV26-21/Episode";
import { NOV26_21Cover } from "./episodes/ATIVO-NOV26-21/Cover";
import { NOV26_22, timeline as nov26_22 } from "./episodes/ATIVO-NOV26-22/Episode";
import { NOV26_22Cover } from "./episodes/ATIVO-NOV26-22/Cover";
import { NOV26_23, timeline as nov26_23 } from "./episodes/ATIVO-NOV26-23/Episode";
import { NOV26_23Cover } from "./episodes/ATIVO-NOV26-23/Cover";
import { NOV26_24, timeline as nov26_24 } from "./episodes/ATIVO-NOV26-24/Episode";
import { NOV26_24Cover } from "./episodes/ATIVO-NOV26-24/Cover";
import { NOV26_25, timeline as nov26_25 } from "./episodes/ATIVO-NOV26-25/Episode";
import { NOV26_25Cover } from "./episodes/ATIVO-NOV26-25/Cover";
import { NOV26_26, timeline as nov26_26 } from "./episodes/ATIVO-NOV26-26/Episode";
import { NOV26_26Cover } from "./episodes/ATIVO-NOV26-26/Cover";
import { NOV26_27, timeline as nov26_27 } from "./episodes/ATIVO-NOV26-27/Episode";
import { NOV26_27Cover } from "./episodes/ATIVO-NOV26-27/Cover";
import { NOV26_28, timeline as nov26_28 } from "./episodes/ATIVO-NOV26-28/Episode";
import { NOV26_28Cover } from "./episodes/ATIVO-NOV26-28/Cover";
import { NOV26_29, timeline as nov26_29 } from "./episodes/ATIVO-NOV26-29/Episode";
import { NOV26_29Cover } from "./episodes/ATIVO-NOV26-29/Cover";
import { NOV26_30, timeline as nov26_30 } from "./episodes/ATIVO-NOV26-30/Episode";
import { DemoPalitinho, DemoDesenho, DemoPlanta, DemoTipografia } from "./demos/Estilos";
import { NOV26_30Cover } from "./episodes/ATIVO-NOV26-30/Cover";
import { L60_01, timeline as l60_01 } from "./episodes/ATIVO-L60-01/Episode";
import { L60_01Cover } from "./episodes/ATIVO-L60-01/Cover";
import { GTA6_01, timeline as gta6_01 } from "./episodes/ATIVO-GTA6-01/Episode";
import { GTA6_01Cover } from "./episodes/ATIVO-GTA6-01/Cover";
import { GTA6_02, timeline as gta6_02 } from "./episodes/ATIVO-GTA6-02/Episode";
import { GTA6_02Cover } from "./episodes/ATIVO-GTA6-02/Cover";
import { GTA6_04, timeline as gta6_04 } from "./episodes/ATIVO-GTA6-04/Episode";
import { GTA6_04Cover } from "./episodes/ATIVO-GTA6-04/Cover";
import { GTA6_05, timeline as gta6_05 } from "./episodes/ATIVO-GTA6-05/Episode";
import { GTA6_05Cover } from "./episodes/ATIVO-GTA6-05/Cover";
import { GTA6_06, timeline as gta6_06 } from "./episodes/ATIVO-GTA6-06/Episode";
import { GTA6_06Cover } from "./episodes/ATIVO-GTA6-06/Cover";
import { GTA6_07, timeline as gta6_07 } from "./episodes/ATIVO-GTA6-07/Episode";
import { GTA6_07Cover } from "./episodes/ATIVO-GTA6-07/Cover";
import { GTA6_08, timeline as gta6_08 } from "./episodes/ATIVO-GTA6-08/Episode";
import { GTA6_08Cover } from "./episodes/ATIVO-GTA6-08/Cover";
import { GTA6_09, timeline as gta6_09 } from "./episodes/ATIVO-GTA6-09/Episode";
import { GTA6_09Cover } from "./episodes/ATIVO-GTA6-09/Cover";
import { L60_02, timeline as l60_02 } from "./episodes/ATIVO-L60-02/Episode";
import { L60_02Cover } from "./episodes/ATIVO-L60-02/Cover";
import { GTA6_10, timeline as gta6_10 } from "./episodes/ATIVO-GTA6-10/Episode";
import { GTA6_10Cover } from "./episodes/ATIVO-GTA6-10/Cover";
import { L60_03, timeline as l60_03 } from "./episodes/ATIVO-L60-03/Episode";
import { L60_03Cover } from "./episodes/ATIVO-L60-03/Cover";
import { L60_04, timeline as l60_04 } from "./episodes/ATIVO-L60-04/Episode";
import { L60_04Cover } from "./episodes/ATIVO-L60-04/Cover";
import { GTA6_11, timeline as gta6_11 } from "./episodes/ATIVO-GTA6-11/Episode";
import { GTA6_11Cover } from "./episodes/ATIVO-GTA6-11/Cover";
import { L60_05, timeline as l60_05 } from "./episodes/ATIVO-L60-05/Episode";
import { L60_05Cover } from "./episodes/ATIVO-L60-05/Cover";

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
      <Composition
        id="EP-ATIVO03"
        component={ATIVO03}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo03.fps}
        durationInFrames={ativo03.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO03-Capa" component={ATIVO03Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO04"
        component={ATIVO04}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo04.fps}
        durationInFrames={ativo04.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO04-Capa" component={ATIVO04Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO05"
        component={ATIVO05}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo05.fps}
        durationInFrames={ativo05.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO05-Capa" component={ATIVO05Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO06"
        component={ATIVO06}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo06.fps}
        durationInFrames={ativo06.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO06-Capa" component={ATIVO06Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO07"
        component={ATIVO07}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo07.fps}
        durationInFrames={ativo07.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO07-Capa" component={ATIVO07Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO08"
        component={ATIVO08}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo08.fps}
        durationInFrames={ativo08.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO08-Capa" component={ATIVO08Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO09"
        component={ATIVO09}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo09.fps}
        durationInFrames={ativo09.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO09-Capa" component={ATIVO09Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-CASE01"
        component={ATIVOCASE01}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativocase01.fps}
        durationInFrames={ativocase01.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-CASE01-Capa" component={ATIVOCASE01Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO10"
        component={ATIVO10}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativo10.fps}
        durationInFrames={ativo10.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO10-Capa" component={ATIVO10Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-CASE02"
        component={ATIVOCASE02}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativocase02.fps}
        durationInFrames={ativocase02.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-CASE02-Capa" component={ATIVOCASE02Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-CASE03"
        component={ATIVOCASE03}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativocase03.fps}
        durationInFrames={ativocase03.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-CASE03-Capa" component={ATIVOCASE03Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL04"
        component={ATIVOREEL04}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel04.fps}
        durationInFrames={ativoreel04.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL04-Capa" component={ATIVOREEL04Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL05"
        component={ATIVOREEL05}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel05.fps}
        durationInFrames={ativoreel05.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL05-Capa" component={ATIVOREEL05Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL06"
        component={ATIVOREEL06}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel06.fps}
        durationInFrames={ativoreel06.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL06-Capa" component={ATIVOREEL06Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL07"
        component={ATIVOREEL07}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel07.fps}
        durationInFrames={ativoreel07.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL07-Capa" component={ATIVOREEL07Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL08"
        component={ATIVOREEL08}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel08.fps}
        durationInFrames={ativoreel08.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL08-Capa" component={ATIVOREEL08Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL09"
        component={ATIVOREEL09}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel09.fps}
        durationInFrames={ativoreel09.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL09-Capa" component={ATIVOREEL09Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL10"
        component={ATIVOREEL10}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel10.fps}
        durationInFrames={ativoreel10.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL10-Capa" component={ATIVOREEL10Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL11"
        component={ATIVOREEL11}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel11.fps}
        durationInFrames={ativoreel11.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL11-Capa" component={ATIVOREEL11Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL12"
        component={ATIVOREEL12}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel12.fps}
        durationInFrames={ativoreel12.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL12-Capa" component={ATIVOREEL12Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL13"
        component={ATIVOREEL13}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel13.fps}
        durationInFrames={ativoreel13.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL13-Capa" component={ATIVOREEL13Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL14"
        component={ATIVOREEL14}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel14.fps}
        durationInFrames={ativoreel14.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL14-Capa" component={ATIVOREEL14Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition
        id="EP-ATIVO-REEL15"
        component={ATIVOREEL15}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ativoreel15.fps}
        durationInFrames={ativoreel15.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Still id="EP-ATIVO-REEL15-Capa" component={ATIVOREEL15Cover} width={VIDEO.width} height={VIDEO.height} />
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
    <Folder name="ADS-META">
      {/* Criativos de anúncio 9:16: área útil y 270–1250; CTA para o botão do anúncio. */}
      <Composition
        id="AD-ATIVO-01"
        component={AD01}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ad01.fps}
        durationInFrames={ad01.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Composition
        id="AD-ATIVO-02"
        component={AD02}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={ad02.fps}
        durationInFrames={ad02.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
    </Folder>
    <Folder name="STORIES-NA-PRATICA">
      {/* Voz oficial gravada em 14/11/2026. Sem autorização dos corretores, os Stories saem com marca d'água de prévia interna. */}
      <Composition
        id="STORY-ATIVO-01"
        component={Story01}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story01.fps}
        durationInFrames={story01.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Composition
        id="STORY-ATIVO-02"
        component={Story02}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story02.fps}
        durationInFrames={story02.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Composition
        id="STORY-ATIVO-03"
        component={Story03}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story03.fps}
        durationInFrames={story03.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Composition
        id="STORY-ATIVO-04"
        component={Story04}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story04.fps}
        durationInFrames={story04.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
      <Composition
        id="STORY-ATIVO-05"
        component={Story05}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={story05.fps}
        durationInFrames={story05.durationInFrames}
        defaultProps={{ withAudio: true }}
      />
    </Folder>
    <Folder name="ATIVO-NOV26">
      <Composition id="ATIVO-NOV26-01" component={NOV26_01} width={VIDEO.width} height={VIDEO.height} fps={nov26_01.fps} durationInFrames={nov26_01.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-01-Capa" component={NOV26_01Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-02" component={NOV26_02} width={VIDEO.width} height={VIDEO.height} fps={nov26_02.fps} durationInFrames={nov26_02.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-02-Capa" component={NOV26_02Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-03" component={NOV26_03} width={VIDEO.width} height={VIDEO.height} fps={nov26_03.fps} durationInFrames={nov26_03.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-03-Capa" component={NOV26_03Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-04" component={NOV26_04} width={VIDEO.width} height={VIDEO.height} fps={nov26_04.fps} durationInFrames={nov26_04.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-04-Capa" component={NOV26_04Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-05" component={NOV26_05} width={VIDEO.width} height={VIDEO.height} fps={nov26_05.fps} durationInFrames={nov26_05.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-05-Capa" component={NOV26_05Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-06" component={NOV26_06} width={VIDEO.width} height={VIDEO.height} fps={nov26_06.fps} durationInFrames={nov26_06.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-06-Capa" component={NOV26_06Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-07" component={NOV26_07} width={VIDEO.width} height={VIDEO.height} fps={nov26_07.fps} durationInFrames={nov26_07.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-07-Capa" component={NOV26_07Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-08" component={NOV26_08} width={VIDEO.width} height={VIDEO.height} fps={nov26_08.fps} durationInFrames={nov26_08.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-08-Capa" component={NOV26_08Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-09" component={NOV26_09} width={VIDEO.width} height={VIDEO.height} fps={nov26_09.fps} durationInFrames={nov26_09.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-09-Capa" component={NOV26_09Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-10" component={NOV26_10} width={VIDEO.width} height={VIDEO.height} fps={nov26_10.fps} durationInFrames={nov26_10.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-10-Capa" component={NOV26_10Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-11" component={NOV26_11} width={VIDEO.width} height={VIDEO.height} fps={nov26_11.fps} durationInFrames={nov26_11.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-11-Capa" component={NOV26_11Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-12" component={NOV26_12} width={VIDEO.width} height={VIDEO.height} fps={nov26_12.fps} durationInFrames={nov26_12.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-12-Capa" component={NOV26_12Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-13" component={NOV26_13} width={VIDEO.width} height={VIDEO.height} fps={nov26_13.fps} durationInFrames={nov26_13.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-13-Capa" component={NOV26_13Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-14" component={NOV26_14} width={VIDEO.width} height={VIDEO.height} fps={nov26_14.fps} durationInFrames={nov26_14.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-14-Capa" component={NOV26_14Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-15" component={NOV26_15} width={VIDEO.width} height={VIDEO.height} fps={nov26_15.fps} durationInFrames={nov26_15.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-15-Capa" component={NOV26_15Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-16" component={NOV26_16} width={VIDEO.width} height={VIDEO.height} fps={nov26_16.fps} durationInFrames={nov26_16.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-16-Capa" component={NOV26_16Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-17" component={NOV26_17} width={VIDEO.width} height={VIDEO.height} fps={nov26_17.fps} durationInFrames={nov26_17.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-17-Capa" component={NOV26_17Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-18" component={NOV26_18} width={VIDEO.width} height={VIDEO.height} fps={nov26_18.fps} durationInFrames={nov26_18.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-18-Capa" component={NOV26_18Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-19" component={NOV26_19} width={VIDEO.width} height={VIDEO.height} fps={nov26_19.fps} durationInFrames={nov26_19.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-19-Capa" component={NOV26_19Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-20" component={NOV26_20} width={VIDEO.width} height={VIDEO.height} fps={nov26_20.fps} durationInFrames={nov26_20.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-20-Capa" component={NOV26_20Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-21" component={NOV26_21} width={VIDEO.width} height={VIDEO.height} fps={nov26_21.fps} durationInFrames={nov26_21.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-21-Capa" component={NOV26_21Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-22" component={NOV26_22} width={VIDEO.width} height={VIDEO.height} fps={nov26_22.fps} durationInFrames={nov26_22.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-22-Capa" component={NOV26_22Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-23" component={NOV26_23} width={VIDEO.width} height={VIDEO.height} fps={nov26_23.fps} durationInFrames={nov26_23.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-23-Capa" component={NOV26_23Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-24" component={NOV26_24} width={VIDEO.width} height={VIDEO.height} fps={nov26_24.fps} durationInFrames={nov26_24.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-24-Capa" component={NOV26_24Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-25" component={NOV26_25} width={VIDEO.width} height={VIDEO.height} fps={nov26_25.fps} durationInFrames={nov26_25.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-25-Capa" component={NOV26_25Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-26" component={NOV26_26} width={VIDEO.width} height={VIDEO.height} fps={nov26_26.fps} durationInFrames={nov26_26.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-26-Capa" component={NOV26_26Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-27" component={NOV26_27} width={VIDEO.width} height={VIDEO.height} fps={nov26_27.fps} durationInFrames={nov26_27.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-27-Capa" component={NOV26_27Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-28" component={NOV26_28} width={VIDEO.width} height={VIDEO.height} fps={nov26_28.fps} durationInFrames={nov26_28.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-28-Capa" component={NOV26_28Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-29" component={NOV26_29} width={VIDEO.width} height={VIDEO.height} fps={nov26_29.fps} durationInFrames={nov26_29.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-29-Capa" component={NOV26_29Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-NOV26-30" component={NOV26_30} width={VIDEO.width} height={VIDEO.height} fps={nov26_30.fps} durationInFrames={nov26_30.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-NOV26-30-Capa" component={NOV26_30Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-L60-01" component={L60_01} width={VIDEO.width} height={VIDEO.height} fps={l60_01.fps} durationInFrames={l60_01.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-L60-01-Capa" component={L60_01Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-01" component={GTA6_01} width={VIDEO.width} height={VIDEO.height} fps={gta6_01.fps} durationInFrames={gta6_01.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-01-Capa" component={GTA6_01Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-02" component={GTA6_02} width={VIDEO.width} height={VIDEO.height} fps={gta6_02.fps} durationInFrames={gta6_02.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-02-Capa" component={GTA6_02Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-04" component={GTA6_04} width={VIDEO.width} height={VIDEO.height} fps={gta6_04.fps} durationInFrames={gta6_04.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-04-Capa" component={GTA6_04Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-05" component={GTA6_05} width={VIDEO.width} height={VIDEO.height} fps={gta6_05.fps} durationInFrames={gta6_05.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-05-Capa" component={GTA6_05Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-06" component={GTA6_06} width={VIDEO.width} height={VIDEO.height} fps={gta6_06.fps} durationInFrames={gta6_06.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-06-Capa" component={GTA6_06Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-07" component={GTA6_07} width={VIDEO.width} height={VIDEO.height} fps={gta6_07.fps} durationInFrames={gta6_07.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-07-Capa" component={GTA6_07Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-08" component={GTA6_08} width={VIDEO.width} height={VIDEO.height} fps={gta6_08.fps} durationInFrames={gta6_08.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-08-Capa" component={GTA6_08Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-09" component={GTA6_09} width={VIDEO.width} height={VIDEO.height} fps={gta6_09.fps} durationInFrames={gta6_09.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-09-Capa" component={GTA6_09Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-L60-02" component={L60_02} width={VIDEO.width} height={VIDEO.height} fps={l60_02.fps} durationInFrames={l60_02.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-L60-02-Capa" component={L60_02Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-10" component={GTA6_10} width={VIDEO.width} height={VIDEO.height} fps={gta6_10.fps} durationInFrames={gta6_10.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-10-Capa" component={GTA6_10Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-L60-03" component={L60_03} width={VIDEO.width} height={VIDEO.height} fps={l60_03.fps} durationInFrames={l60_03.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-L60-03-Capa" component={L60_03Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-L60-04" component={L60_04} width={VIDEO.width} height={VIDEO.height} fps={l60_04.fps} durationInFrames={l60_04.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-L60-04-Capa" component={L60_04Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-GTA6-11" component={GTA6_11} width={VIDEO.width} height={VIDEO.height} fps={gta6_11.fps} durationInFrames={gta6_11.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-GTA6-11-Capa" component={GTA6_11Cover} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="ATIVO-L60-05" component={L60_05} width={VIDEO.width} height={VIDEO.height} fps={l60_05.fps} durationInFrames={l60_05.durationInFrames} defaultProps={{ withAudio: true }} />
      <Still id="ATIVO-L60-05-Capa" component={L60_05Cover} width={VIDEO.width} height={VIDEO.height} />
      <Still id="DEMO-ESTILO-1" component={DemoPalitinho} width={VIDEO.width} height={VIDEO.height} />
      <Still id="DEMO-ESTILO-2" component={DemoDesenho} width={VIDEO.width} height={VIDEO.height} />
      <Still id="DEMO-ESTILO-3" component={DemoPlanta} width={VIDEO.width} height={VIDEO.height} />
      <Still id="DEMO-ESTILO-4" component={DemoTipografia} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
  </>
);
