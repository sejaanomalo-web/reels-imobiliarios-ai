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
  </>
);
