"""Gera a narração final (Kokoro local por frase, Gemini em arquivo único, ou arquivo fornecido),
confere por transcrição, alinha palavra a palavra
e escreve public/<EP>/narration.wav + src/episodes/<EP>/timeline.json + legendas SRT.

Uso: python3 tools/build_narration.py EP001 [--regen] [--force] [--source arquivo.wav] [--model id-de-rascunho]
  provider em VOZ/voice_preset.json: "local (kokoro-onnx)" | "gemini" | "arquivo"
  ("arquivo" usa episodes/<EP>/narration_source.wav — gravação humana ou export de outro serviço)
"""
import os, sys, json, re, difflib, unicodedata
import numpy as np
from scipy.signal import resample_poly
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import synth, trim_silence, write_wav, transcribe, norm, resample, ROOT, MODELS

EP = next((a for a in sys.argv[1:] if not a.startswith("-") and os.path.isfile(os.path.join(ROOT, "episodes", a, "episode.json"))), "EP001")
REPO = os.path.dirname(ROOT)
ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
preset = json.load(open(os.path.join(REPO, "VOZ", "voice_preset.json")))
VOICE, SPEED = preset["voice_id"], float(preset.get("speed", 1.0))
OVERRIDES = {**preset.get("pronunciation_overrides", {}), **ep.get("pronunciation", {})}  # pronúncia por episódio (não altera a voz)
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
out_dir = os.path.join(REPO, "OUTPUT", ep.get("outputDir", EP)); os.makedirs(os.path.join(out_dir, "audio"), exist_ok=True)

WORD_RE = r"[\wáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]+"
PROVIDER = str(preset.get("provider", "kokoro")).lower()
fps = ep["fps"]
SRC = os.path.join(ROOT, "episodes", EP, "narration_source.wav")
SRC_META = SRC.replace(".wav", ".json")


def caption_words(seg):
    """Legendas: "a b | *c d*" -> palavras com índice de bloco e ênfase."""
    out = []
    for c_i, chunk in enumerate(seg["caption"].split("|")):
        emph = False
        for tok in chunk.split():
            if tok.startswith("*"): emph = True
            out.append(dict(text=tok.strip("*"), chunk=c_i, emph=emph))
            if tok.endswith("*"): emph = False
    return out


def build_segmented():
    """Kokoro local: uma síntese por frase, pausas definidas em episode.json."""
    t = float(ep["leadIn"])
    chunks, segs, words_all, qa = [np.zeros(int(t * SR), np.float32)], [], [], []
    peak, raw = 0.0, []
    for seg in ep["segments"]:
        x, sr = synth(tts_text(seg["text"]), VOICE, SPEED)
        x = trim_silence(x, sr, pad=0.02)
        raw.append((x, sr)); peak = max(peak, float(np.abs(x).max()))
    for seg, (x, sr) in zip(ep["segments"], raw):
        x = x / peak * 0.89
        dur = len(x) / sr
        heard, _, _ = transcribe(x, sr)
        ratio = difflib.SequenceMatcher(None, [key(w) for w in norm(seg["text"])], [key(w) for w in norm(heard)]).ratio()
        expected = re.findall(WORD_RE, seg["text"])
        starts, matched = align(expected, word_times(x, sr), dur)
        cap = caption_words(seg)
        assert len(cap) == len(expected), (seg["id"], len(cap), len(expected))
        for i, (w, cw) in enumerate(zip(expected, cap)):
            e = starts[i + 1] if i + 1 < len(expected) else dur
            words_all.append(dict(seg=seg["id"], i=i, word=w, text=cw["text"], chunk=cw["chunk"], emph=cw["emph"],
                                  start=round(t + starts[i], 3), end=round(t + e, 3)))
        segs.append(dict(id=seg["id"], scene=seg["scene"], text=seg["text"], start=round(t, 3), end=round(t + dur, 3)))
        qa.append(dict(seg=seg["id"], seconds=round(dur, 2), asr_match=round(ratio, 3), aligned_words=f"{matched}/{len(expected)}", heard=heard))
        print(qa[-1], flush=True)
        chunks.append(resample_poly(x, SR, sr).astype(np.float32))
        t += dur
        pause = float(seg.get("pauseAfter", 0))
        chunks.append(np.zeros(int(pause * SR), np.float32)); t += pause
    return np.concatenate(chunks), segs, words_all, qa, t


def full_text():
    """Texto corrido, com parágrafo a cada cena (o parágrafo vira respiro natural na fala)."""
    order, blocks = [], []
    for s in ep["segments"]:
        if s["scene"] not in order:
            order.append(s["scene"]); blocks.append([])
        blocks[-1].append(tts_text(s["text"]))
    return "\n\n".join(" ".join(b) for b in blocks)


def source_audio():
    """Narração inteira em um arquivo: gerada pelo Gemini (com cache) ou fornecida (gravação/outro serviço)."""
    import hashlib
    from tts_common import read_wav
    text = full_text()
    # --model <id>: rascunho com outro modelo (ex.: cota diária do aprovado esgotada). O meta registra o modelo
    # usado, então a próxima execução sem --model detecta a diferença e regenera com o modelo aprovado.
    model = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else preset.get("model_id")
    meta = dict(provider=PROVIDER, model=model, voice=VOICE, direction=ep.get("voice", {}).get("direction", preset.get("direction", "")),
                text_sha=hashlib.sha1(text.encode()).hexdigest())
    if model != preset.get("model_id"):
        meta["draft"] = True
    have = json.load(open(SRC_META)) if os.path.exists(SRC_META) else None
    external = PROVIDER in ("arquivo", "file", "external")
    if "--source" in sys.argv:  # adota um arquivo já gerado (ex.: uma audição aprovada) como narração oficial
        import shutil
        shutil.copyfile(sys.argv[sys.argv.index("--source") + 1], SRC)
        json.dump(meta, open(SRC_META, "w"), ensure_ascii=False, indent=1)
    elif external:
        assert os.path.exists(SRC), f"provider '{PROVIDER}' exige {SRC}"
    elif "--regen" in sys.argv or not os.path.exists(SRC) or have != meta:
        from tts_gemini import synth_gemini
        expected_k = [key(w) for w in re.findall(WORD_RE, text)]
        best = None
        for attempt in range(4):
            try:
                x, sr = synth_gemini(text, VOICE, model, ep.get("voice", {}).get("direction", preset.get("direction")))
            except RuntimeError as e:
                if best is None and os.path.exists(SRC):
                    # cota esgotada etc.: segue com a narração já existente (pode ser rascunho) e avisa
                    print(f"AVISO: não foi possível gerar com {model} ({str(e)[:90]}…). "
                          f"Mantendo a narração existente: {have}", flush=True)
                    return read_wav(SRC)
                if best is None:
                    raise
                break
            x = trim_silence(x, sr, pad=0.02)
            heard_k = [key(w) for w, _ in word_times(x, sr)]
            ratio = difflib.SequenceMatcher(None, expected_k, heard_k, autojunk=False).ratio()
            extra = len(heard_k) - len(expected_k)
            print(f"tentativa {attempt + 1}: {len(x) / sr:.1f} s, texto reconhecido {ratio:.1%}, palavras a mais {extra}", flush=True)
            if best is None or ratio > best[0]:
                best = (ratio, x, sr)
            if ratio >= 0.97 and abs(extra) <= 2:
                break
        ratio, x, sr = best
        if ratio < 0.97 and os.path.exists(SRC) and "--force" not in sys.argv:
            # nunca troca uma narração existente por uma tomada que erra o texto; guarda a tomada para escuta
            rej = os.path.join(REPO, "OUTPUT", ep.get("outputDir", EP), "audio", f"narracao_tomada_rejeitada_{model}.wav")
            write_wav(rej, x, sr)
            print(f"AVISO: melhor tomada de {model} reconheceu só {ratio:.1%} do texto; mantida a narração existente "
                  f"({have}). Tomada salva em {rej}. Use --force para adotá-la mesmo assim.", flush=True)
            return read_wav(SRC)
        write_wav(SRC, x, sr)
        json.dump(meta, open(SRC_META, "w"), ensure_ascii=False, indent=1)
    return read_wav(SRC)


def tighten_pauses(x, sr, lo, hi):
    """Encurta só as pausas longas: silêncios > hi viram hi (pausas entre lo e hi ficam intactas). Emendas com fade de 12 ms."""
    hop = int(sr * 0.01); n = len(x) // hop
    rms = np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
    quiet = rms < rms.max() * 10 ** (-38 / 20)
    cuts, run = [], 0
    for i, q in enumerate(list(quiet) + [False]):
        if q:
            run += 1
        else:
            if run * 0.01 > hi:
                a, b = (i - run) * hop, i * hop
                keep = int(hi * sr)
                cuts.append((a + keep // 2, b - keep // 2))
            run = 0
    if not cuts:
        return x, 0.0
    f = int(0.012 * sr); ramp = np.linspace(1, 0, f)
    out, prev = [], 0
    for a, b in cuts:
        seg = x[prev:a].copy(); seg[-f:] *= ramp
        out.append(seg); prev = b
    tail = x[prev:].copy(); tail[:f] *= ramp[::-1]; out.append(tail)
    y = np.concatenate(out)
    return y, (len(x) - len(y)) / sr


def stretch(x, sr, tempo):
    """Time-stretch com preservação de altura e formantes (rubberband via FFmpeg)."""
    import subprocess, tempfile
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, "a.wav"), os.path.join(d, "b.wav")
        write_wav(a, x, sr)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a, "-af",
                        f"rubberband=tempo={tempo:.4f}:pitchq=quality:formant=preserved:transients=mixed:detector=compound",
                        b], check=True)
        from tts_common import read_wav
        y, _ = read_wav(b)
    return y


PROCESSING = {}


def build_whole():
    """Narração em arquivo único: alinha todas as palavras e deriva cenas e legendas do áudio real."""
    x, sr = source_audio()
    x = trim_silence(x, sr, pad=0.02)
    x = x / (np.abs(x).max() + 1e-9) * 0.89
    nw = sum(len(re.findall(WORD_RE, s["text"])) for s in ep["segments"])
    vcfg = ep.get("voice", {})
    PROCESSING["original"] = dict(seconds=round(len(x) / sr, 2), wpm=round(nw / (len(x) / sr) * 60))
    if "tightenPauses" in vcfg:
        x, saved = tighten_pauses(x, sr, vcfg["tightenPauses"]["min"], vcfg["tightenPauses"]["max"])
        PROCESSING["pausas_encurtadas_s"] = round(saved, 2)
    if "targetWpm" in vcfg:
        lo, hi = vcfg["targetWpm"]; target = (lo + hi) / 2
        wpm = nw / (len(x) / sr) * 60
        tempo = min(vcfg.get("maxStretch", 1.12), target / wpm) if wpm < lo or wpm < target else 1.0
        if tempo > 1.005:
            x = stretch(x, sr, tempo)
            x = x / (np.abs(x).max() + 1e-9) * 0.89
        PROCESSING["time_stretch"] = round(tempo, 3)
    PROCESSING["final"] = dict(seconds=round(len(x) / sr, 2), wpm=round(nw / (len(x) / sr) * 60))
    if len(PROCESSING) > 2:
        print("processamento da voz:", PROCESSING, flush=True)
    dur = len(x) / sr
    recog = word_times(x, sr)
    exp = [(seg, w) for seg in ep["segments"] for w in re.findall(WORD_RE, seg["text"])]
    starts, matched = align([w for _, w in exp], recog, dur)
    # fim real de cada palavra: início do primeiro silêncio ≥ 0,12 s antes da palavra seguinte
    hop = int(sr * 0.01)
    n = len(x) // hop
    rms = np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
    quiet = rms < rms.max() * 10 ** (-34 / 20)
    ends = []
    for i, st in enumerate(starts):
        nxt = starts[i + 1] if i + 1 < len(starts) else dur
        a, b = int((st + 0.06) / 0.01), int(nxt / 0.01)
        end, run = nxt, 0
        for f in range(a, min(b, n)):
            run = run + 1 if quiet[f] else 0
            if run >= 12:
                end = (f - run + 1) * 0.01 + 0.02
                break
        ends.append(max(st + 0.05, end))
    t0 = float(ep["leadIn"])
    segs, words_all, qa, k = [], [], [], 0
    heard_k = {key(w) for w, _ in recog}
    for seg in ep["segments"]:
        expected = re.findall(WORD_RE, seg["text"])
        cap = caption_words(seg)
        assert len(cap) == len(expected), (seg["id"], len(cap), len(expected))
        for i, (w, cw) in enumerate(zip(expected, cap)):
            words_all.append(dict(seg=seg["id"], i=i, word=w, text=cw["text"], chunk=cw["chunk"], emph=cw["emph"],
                                  start=round(t0 + starts[k + i], 3), end=round(t0 + ends[k + i], 3)))
        a, b = t0 + starts[k], t0 + ends[k + len(expected) - 1]
        segs.append(dict(id=seg["id"], scene=seg["scene"], text=seg["text"], start=round(a, 3), end=round(b, 3)))
        missing = [w for w in expected if key(tts_text(w)) not in heard_k]
        qa.append(dict(seg=seg["id"], seconds=round(b - a, 2), palavras_nao_reconhecidas=missing))
        print(qa[-1], flush=True)
        k += len(expected)
    heard = " ".join(w for w, _ in recog)
    ratio = difflib.SequenceMatcher(None, [key(tts_text(w)) for _, w in exp], [key(w) for w, _ in recog], autojunk=False).ratio()
    qa.append(dict(seg="TOTAL", seconds=round(dur, 2), asr_match=round(ratio, 3), aligned_words=f"{matched}/{len(exp)}",
                   words_per_min=round(len(exp) / dur * 60), heard=heard))
    print({k_: v for k_, v in qa[-1].items() if k_ != "heard"}, flush=True)
    narr = np.concatenate([np.zeros(int(t0 * SR), np.float32), resample_poly(x, SR, sr).astype(np.float32)])
    return narr, segs, words_all, qa, t0 + dur


narr, segs, words_all, qa, narr_end = build_segmented() if PROVIDER.startswith("local") or "kokoro" in PROVIDER else build_whole()
total = np.ceil((narr_end + float(ep["tail"])) * fps) / fps
narr = np.concatenate([narr, np.zeros(max(0, int(round(total * SR)) - len(narr)), np.float32)])[: int(round(total * SR))]
write_wav(os.path.join(pub, "narration.wav"), narr, SR)
write_wav(os.path.join(out_dir, ep.get("deliverables", {}).get("narration", f"{EP}_narracao.wav")), narr, SR)

# cenas
order = []
for s in segs:
    if s["scene"] not in order: order.append(s["scene"])
scenes = []
for n, name in enumerate(order):
    first = next(s for s in segs if s["scene"] == name)
    prev_end = max([g["end"] for g in segs if g["start"] < first["start"]], default=0.0)
    start = 0.0 if n == 0 else max(first["start"] - float(ep["sceneLead"].get(name, 0.25)), (prev_end + first["start"]) / 2)
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

for name, a in sp.items():
    if a.get("type") == "between":  # N eventos entre duas marcas, com aceleração opcional (power < 1)
        t0 = cues[a["fromCue"]] + a.get("fromOffset", 0); t1 = cues[a["toCue"]] + a.get("toOffset", 0)
        series[name] = [round(t0 + (t1 - t0) * (i / max(1, a["count"] - 1)) ** a.get("power", 1), 3) for i in range(a["count"])]

timeline = dict(id=EP, title=ep["title"], fps=fps, duration=float(total), durationInFrames=int(round(total * fps)),
                narrationEnd=round(narr_end, 3), voice=VOICE, scenes=scenes, segments=segs, cues=cues, series=series, captions=caps,
                hideCaptions=ep.get("hideCaptions", []))
os.makedirs(os.path.join(ROOT, "src", "episodes", EP), exist_ok=True)
json.dump(timeline, open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json"), "w"), ensure_ascii=False, indent=1)
if PROCESSING:
    qa.append(dict(seg="PROCESSAMENTO", **PROCESSING))
json.dump(qa, open(os.path.join(out_dir, "audio", "narracao_qa.json"), "w"), ensure_ascii=False, indent=2)

import subprocess
subprocess.run([sys.executable, os.path.join(os.path.dirname(__file__), "build_srt.py"), EP], check=True)
print("duração total:", total, "s | narração termina em", round(narr_end, 2), "| cenas:", scenes)
