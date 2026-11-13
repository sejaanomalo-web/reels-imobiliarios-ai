"""Audições com a narração real de um episódio em várias vozes do Gemini.
Uso: python3 tools/voice_auditions_gemini.py EP001 Achird Charon ..."""
import os, sys, json, time, difflib
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import trim_silence, write_wav, norm, resample, ROOT, MODELS
from tts_gemini import synth_gemini

EP = sys.argv[1]
VOICES = sys.argv[2:]
MODEL = os.environ.get("GEMINI_TTS_MODEL", "gemini-3.8-flash-tts")
ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
preset = json.load(open(os.path.join(os.path.dirname(ROOT), "VOZ", "voice_preset.json")))
STYLE = preset.get("direction") or (
    "Tom de conversa entre colegas corretores de imóveis: brasileiro, próximo, seguro e natural. "
    "Ritmo ágil, sem correria, com pausas curtas entre as ideias. Nunca locutor de comercial.")
order, text = [], []
for s in ep["segments"]:
    if s["scene"] not in order:
        order.append(s["scene"]); text.append([])
    text[-1].append(s["text"])
TEXT = "\n\n".join(" ".join(t) for t in text)

import sherpa_onnx
d = os.path.join(MODELS, "sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8")
pk = sherpa_onnx.OfflineRecognizer.from_transducer(encoder=d + "/encoder.int8.onnx", decoder=d + "/decoder.int8.onnx",
                                                   joiner=d + "/joiner.int8.onnx", tokens=d + "/tokens.txt",
                                                   model_type="nemo_transducer", num_threads=4)
out = os.path.join(os.path.dirname(ROOT), "OUTPUT", "VOICE_AUDITIONS"); os.makedirs(out, exist_ok=True)
rows = []
for v in VOICES:
    t0 = time.time()
    try:
        x, sr = synth_gemini(TEXT, v, MODEL, STYLE)
    except Exception as e:
        print(v, "FALHOU:", e, flush=True); continue
    x = trim_silence(x, sr)
    write_wav(os.path.join(out, f"audicao_gemini_{v}_{EP}.wav"), x, sr)
    s = pk.create_stream(); s.accept_waveform(16000, resample(x, sr, 16000)); pk.decode_stream(s)
    heard = s.result.text.strip()
    ratio = difflib.SequenceMatcher(None, norm(TEXT), norm(heard)).ratio()
    rows.append(dict(voice=v, model=MODEL, seconds=round(len(x) / sr, 2), words_per_min=round(len(norm(TEXT)) / (len(x) / sr) * 60),
                     asr_match=round(ratio, 3), gen_seconds=round(time.time() - t0, 1), heard=heard))
    print(json.dumps(rows[-1], ensure_ascii=False), flush=True)
json.dump(rows, open(os.path.join(out, f"audicoes_gemini_{EP}_metricas.json"), "w"), ensure_ascii=False, indent=2)
