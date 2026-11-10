#!/bin/bash
# Baixa os modelos locais (não versionados no git) para PRODUCAO/.models
#  - Kokoro-82M v1.0 (TTS, Apache-2.0)
#  - Whisper small (conferência da narração) e Parakeet TDT v3 (alinhamento palavra a palavra)
set -e
cd "$(dirname "$0")/.."
mkdir -p .models && cd .models
pip install -q -r ../requirements.txt
K=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
A=https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models
[ -f kokoro-v1.0.onnx ] || curl -sSL -o kokoro-v1.0.onnx $K/kokoro-v1.0.onnx
[ -f voices-v1.0.bin ] || curl -sSL -o voices-v1.0.bin $K/voices-v1.0.bin
if [ ! -d whisper-small ]; then
  curl -sSL -o w.tar.bz2 $A/sherpa-onnx-whisper-small.tar.bz2 && tar xjf w.tar.bz2 && mv sherpa-onnx-whisper-small whisper-small && rm w.tar.bz2
fi
if [ ! -d sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8 ]; then
  curl -sSL -o p.tar.bz2 $A/sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8.tar.bz2 && tar xjf p.tar.bz2 && rm p.tar.bz2
fi
ls -la
