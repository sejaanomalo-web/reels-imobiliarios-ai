"""Gera tomadas da narração de um episódio com direções de voz diferentes e mede cada uma.
Uso: python3 tools/voice_takes.py EP003 nome1 nome2 ...   (direções em episodes/<EP>/voice_takes.json)
Saída: OUTPUT/VOICE_AUDITIONS/<EP>_tomada_<nome>.wav + OUTPUT/<EP>/audio/tomadas_metricas.json"""
import os, sys, json, re, difflib
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import trim_silence, write_wav, resample, ROOT, MODELS
from tts_gemini import synth_gemini
from voice_metrics import metrics
import unicodedata

EP, NAMES = sys.argv[1], sys.argv[2:]
REPO = os.path.dirname(ROOT)
ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
takes = json.load(open(os.path.join(ROOT, "episodes", EP, "voice_takes.json")))
preset = json.load(open(os.path.join(REPO, "VOZ", "voice_preset.json")))
W = r"[\wáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]+"
order, blocks = [], []
for s in ep["segments"]:
    if s["scene"] not in order:
        order.append(s["scene"]); blocks.append([])
    blocks[-1].append(s["text"])
TEXT = "\n\n".join(" ".join(b) for b in blocks)
NW = len(re.findall(W, TEXT))
key = lambda w: re.sub(r"[^a-z0-9]", "", "".join(c for c in unicodedata.normalize("NFD", w.lower()) if unicodedata.category(c) != "Mn"))

import sherpa_onnx
d = os.path.join(MODELS, "sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8")
pk = sherpa_onnx.OfflineRecognizer.from_transducer(encoder=d + "/encoder.int8.onnx", decoder=d + "/decoder.int8.onnx",
                                                   joiner=d + "/joiner.int8.onnx", tokens=d + "/tokens.txt",
                                                   model_type="nemo_transducer", num_threads=4)
out = os.path.join(REPO, "OUTPUT", "VOICE_AUDITIONS"); os.makedirs(out, exist_ok=True)
mpath = os.path.join(REPO, "OUTPUT", EP, "audio", "tomadas_metricas.json"); os.makedirs(os.path.dirname(mpath), exist_ok=True)
allm = json.load(open(mpath)) if os.path.exists(mpath) else {}
for name in NAMES:
    t = takes[name]
    model = t.get("model", preset["model_id"])
    try:
        x, sr = synth_gemini(TEXT, preset["voice_id"], model, t["direction"])
    except Exception as e:
        print(name, "FALHOU:", str(e)[:160], flush=True); continue
    x = trim_silence(x, sr)
    path = os.path.join(out, f"{EP}_tomada_{name}.wav")
    write_wav(path, x, sr)
    s = pk.create_stream(); s.accept_waveform(16000, resample(x, sr, 16000)); pk.decode_stream(s)
    heard = s.result.text.strip()
    ek, hk = [key(w) for w in re.findall(W, TEXT)], [key(w) for w in re.findall(W, heard)]
    sm = difflib.SequenceMatcher(None, ek, hk, autojunk=False)
    diffs = [(" ".join(ek[a:b]) or "∅") + " → " + (" ".join(hk[c:dd]) or "∅") for tag, a, b, c, dd in sm.get_opcodes() if tag != "equal"]
    m = dict(model=model, voice=preset["voice_id"], **metrics(x, sr, NW), texto_reconhecido=round(sm.ratio(), 3), divergencias=diffs, arquivo=os.path.relpath(path, REPO))
    allm[name] = m
    print(name, json.dumps(m, ensure_ascii=False), flush=True)
json.dump(allm, open(mpath, "w"), ensure_ascii=False, indent=1)
