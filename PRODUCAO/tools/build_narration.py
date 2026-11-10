"""Gera a narração final em blocos (Kokoro local), confere por transcrição, alinha palavra a palavra
e escreve public/<EP>/narration.wav + src/episodes/<EP>/timeline.json + legendas SRT.

Uso: python3 tools/build_narration.py EP001
"""
import os, sys, json, re, difflib, unicodedata
import numpy as np
from scipy.signal import resample_poly
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import synth, trim_silence, write_wav, transcribe, norm, resample, ROOT, MODELS

EP = sys.argv[1] if len(sys.argv) > 1 else "EP001"
REPO = os.path.dirname(ROOT)
ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
preset = json.load(open(os.path.join(REPO, "VOZ", "voice_preset.json")))
VOICE, SPEED = preset["voice_id"], float(preset.get("speed", 1.0))
OVERRIDES = preset.get("pronunciation_overrides", {})
SR = 48000

_al = None
def aligner():
    global _al
    if _al is None:
        import sherpa_onnx
        d = os.path.join(MODELS, "sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8")
        _al = sherpa_onnx.OfflineRecognizer.from_transducer(
            encoder=os.path.join(d, "encoder.int8.onnx"), decoder=os.path.join(d, "decoder.int8.onnx"),
            joiner=os.path.join(d, "joiner.int8.onnx"), tokens=os.path.join(d, "tokens.txt"),
            model_type="nemo_transducer", num_threads=4)
    return _al


def word_times(x, sr):
    """Palavras reconhecidas com tempo de início (s) via Parakeet TDT."""
    r = aligner(); s = r.create_stream()
    s.accept_waveform(16000, resample(x, sr, 16000)); r.decode_stream(s)
    words = []
    for tok, t in zip(s.result.tokens, s.result.timestamps):
        if tok.startswith(" ") or tok.startswith("▁") or not words:
            words.append([tok.strip(" ▁"), t])
        else:
            words[-1][0] += tok
    return [(w, t) for w, t in words if re.sub(r"\W", "", w)]


def key(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))


def tts_text(text):
    for k, v in OVERRIDES.items():
        text = re.sub(rf"\b{k}\b", v, text, flags=re.I)
    return text


def align(expected, recog, dur):
    """Mapeia cada palavra esperada a um tempo de início; interpola as que não casarem."""
    ek = [key(tts_text(w)) for w in expected]
    rk = [key(w) for w, _ in recog]
    starts = [None] * len(expected)
    for a, b, n in difflib.SequenceMatcher(None, ek, rk, autojunk=False).get_matching_blocks():
        for i in range(n):
            starts[a + i] = recog[b + i][1]
    matched = sum(s is not None for s in starts)
    # âncoras nas pontas + interpolação proporcional ao tamanho das palavras
    anchors = [(-1, 0.0)] + [(i, s) for i, s in enumerate(starts) if s is not None] + [(len(expected), dur)]
    for (i0, t0), (i1, t1) in zip(anchors, anchors[1:]):
        gap = list(range(i0 + 1, i1))
        if not gap:
            continue
        lens = [len(expected[max(i0, 0)])] if i0 >= 0 else []
        lens += [len(expected[g]) for g in gap]
        tot = sum(lens) or 1
        acc = lens[0] if i0 >= 0 else 0
        for n, g in enumerate(gap):
            starts[g] = t0 + (t1 - t0) * acc / tot
            acc += lens[n + (1 if i0 >= 0 else 0)]
    starts[0] = max(0.0, min(starts[0], 0.08)) if starts[0] is not None else 0.0
    for i in range(1, len(starts)):
        starts[i] = max(starts[i], starts[i - 1] + 0.04)
    return starts, matched


pub = os.path.join(ROOT, "public", EP); os.makedirs(pub, exist_ok=True)
out_dir = os.path.join(REPO, "OUTPUT", EP); os.makedirs(os.path.join(out_dir, "audio"), exist_ok=True)

t = float(ep["leadIn"])
chunks, segs, words_all, qa = [np.zeros(int(t * SR), np.float32)], [], [], []
peak = 0.0
raw = []
for seg in ep["segments"]:
    x, sr = synth(tts_text(seg["text"]), VOICE, SPEED)
    x = trim_silence(x, sr, pad=0.02)
    raw.append((x, sr)); peak = max(peak, float(np.abs(x).max()))

for seg, (x, sr) in zip(ep["segments"], raw):
    x = x / peak * 0.89
    dur = len(x) / sr
    heard, _, _ = transcribe(x, sr)
    ratio = difflib.SequenceMatcher(None, [key(w) for w in norm(seg["text"])], [key(w) for w in norm(heard)]).ratio()
    expected = re.findall(r"[\wáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]+", seg["text"])
    starts, matched = align(expected, word_times(x, sr), dur)
    # legendas: "a b | *c d*" -> chunks com ênfase
    cap_words, ci = [], 0
    for c_i, chunk in enumerate(seg["caption"].split("|")):
        emph = False
        for tok in chunk.split():
            if tok.startswith("*"): emph = True
            clean = tok.strip("*")
            cap_words.append(dict(text=clean, chunk=c_i, emph=emph))
            if tok.endswith("*"): emph = False
    assert len(cap_words) == len(expected), (seg["id"], len(cap_words), len(expected))
    ws = []
    for i, (w, cw) in enumerate(zip(expected, cap_words)):
        s = t + starts[i]
        e = t + (starts[i + 1] if i + 1 < len(expected) else dur)
        ws.append(dict(seg=seg["id"], i=i, word=w, text=cw["text"], chunk=cw["chunk"], emph=cw["emph"], start=round(s, 3), end=round(e, 3)))
    words_all += ws
    segs.append(dict(id=seg["id"], scene=seg["scene"], text=seg["text"], start=round(t, 3), end=round(t + dur, 3)))
    qa.append(dict(seg=seg["id"], seconds=round(dur, 2), asr_match=round(ratio, 3), aligned_words=f"{matched}/{len(expected)}", heard=heard))
    print(qa[-1], flush=True)
    y = resample_poly(x, SR, sr).astype(np.float32)
    chunks.append(y)
    t += dur
    pause = float(seg.get("pauseAfter", 0))
    chunks.append(np.zeros(int(pause * SR), np.float32)); t += pause

narr_end = t
total = narr_end + float(ep["tail"])
fps = ep["fps"]
total = np.ceil(total * fps) / fps
chunks.append(np.zeros(int((total - narr_end) * SR), np.float32))
narr = np.concatenate(chunks)
narr = narr[: int(round(total * SR))]
write_wav(os.path.join(pub, "narration.wav"), narr, SR)
write_wav(os.path.join(out_dir, f"{EP}_narracao.wav"), narr, SR)

# cenas
order = []
for s in segs:
    if s["scene"] not in order: order.append(s["scene"])
scenes = []
for n, name in enumerate(order):
    first = next(s for s in segs if s["scene"] == name)
    start = 0.0 if n == 0 else first["start"] - float(ep["sceneLead"].get(name, 0.25))
    scenes.append(dict(id=name, start=round(start, 3)))
for a, b in zip(scenes, scenes[1:] + [dict(start=float(total))]):
    a["end"] = round(b["start"], 3)

# cues
def find(seg, word, occ=1):
    c = 0
    for w in words_all:
        if w["seg"] == seg and key(w["word"]) == key(word):
            c += 1
            if c == occ: return w
    raise KeyError((seg, word))
cues = {}
for name, c in ep["cues"].items():
    w = find(c["seg"], c["word"], c.get("occ", 1))
    cues[name] = round(w[c.get("edge", "start")] + float(c.get("offset", 0)), 3)

# chunks de legenda
caps = []
for s in segs:
    ws = [w for w in words_all if w["seg"] == s["id"]]
    for c in sorted(set(w["chunk"] for w in ws)):
        cw = [w for w in ws if w["chunk"] == c]
        caps.append(dict(seg=s["id"], start=cw[0]["start"], end=cw[-1]["end"],
                         words=[dict(text=w["text"], start=w["start"], end=w["end"], emph=w["emph"]) for w in cw]))
for a, b in zip(caps, caps[1:]):
    a["end"] = round(min(max(a["end"], b["start"]), a["end"] + 0.5) if b["start"] - a["end"] < 0.5 else a["end"] + 0.35, 3)
caps[-1]["end"] = round(caps[-1]["end"] + 0.5, 3)

# séries de eventos compartilhadas entre imagem e som
series = {}
sp = ep.get("series", {})
if "hookRows" in sp:
    h = sp["hookRows"]; k = h["anchorIndex"]; r = h["ratio"]
    d0 = (cues[h["anchorCue"]] - h["first"]) * (1 - r) / (1 - r ** (k - 1))
    ts_, tcur, j = [], h["first"], 0
    limit = cues[h["untilCue"]] + h.get("untilOffset", 0)
    while tcur <= limit and j < 200:
        ts_.append(round(tcur, 3)); tcur += max(h["floor"], d0 * r ** j); j += 1
    series["hookRows"] = ts_
if "agendaBlocks" in sp:
    a = sp["agendaBlocks"]; t0 = cues[a["fromCue"]] + 0.15; t1 = cues[a["toCue"]] + a.get("toOffset", 0)
    series["agendaBlocks"] = [round(t0 + (t1 - t0) * (i / (a["count"] - 1)) ** a.get("power", 1), 3) for i in range(a["count"])]

timeline = dict(id=EP, title=ep["title"], fps=fps, duration=float(total), durationInFrames=int(round(total * fps)),
                narrationEnd=round(narr_end, 3), voice=VOICE, scenes=scenes, segments=segs, cues=cues, series=series, captions=caps)
os.makedirs(os.path.join(ROOT, "src", "episodes", EP), exist_ok=True)
json.dump(timeline, open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json"), "w"), ensure_ascii=False, indent=1)
json.dump(qa, open(os.path.join(out_dir, "audio", "narracao_qa.json"), "w"), ensure_ascii=False, indent=2)

import subprocess
subprocess.run([sys.executable, os.path.join(os.path.dirname(__file__), "build_srt.py"), EP], check=True)
print("duração total:", total, "s | narração termina em", round(narr_end, 2), "| cenas:", scenes)
