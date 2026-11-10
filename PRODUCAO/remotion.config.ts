/**
 * Configuração do Remotion (CLI). Chromium pré-instalado do ambiente de nuvem é usado quando existir;
 * em outra máquina o Remotion baixa o próprio navegador.
 */
import { Config } from "@remotion/cli/config";
import fs from "fs";

const cloudChrome =
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (fs.existsSync(cloudChrome)) {
  Config.setBrowserExecutable(cloudChrome);
}
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
Config.setCodec("h264");
Config.setCrf(16);
Config.setAudioCodec("aac");
Config.setAudioBitrate("256k");
