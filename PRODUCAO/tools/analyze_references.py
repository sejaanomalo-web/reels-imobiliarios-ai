"""Auditoria técnica das referências em MODELS/: ffprobe, cortes de cena, loudness, pausas e transcrição."""
import os, sys, json, subprocess, re, glob
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import read_wav, transcribe, ROOT
import numpy as np

REPO = os.path.dirname(ROOT)
OUT = os.path.join(REPO, "ANALISE", "referencias_dados.json")
tmp = sys.argv[1] if len(sys.argv) > 1 else "/tmp"
res = []
for f in sorted(glob.glob(os.path.join(REPO, "MODELS", "ref_*.mp4"))):
    name = os.path.basename(f)
    pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", f], capture_output=True, text=True).stdout)
    v = [s for s in pr["streams"] if s["codec_type"] == "video"][0]
    a = [s for s in pr["streams"] if s["codec_type"] == "audio"]
    dur = float(pr["format"]["duration"])
    sc = subprocess.run(["ffmpeg", "-i", f, "-vf", "select='gt(scene,0.30)',showinfo", "-f", "null", "-"], capture_output=True, text=True).stderr
    cuts = [round(float(m), 2) for m in re.findall(r"pts_time:([\d.]+)", sc)]
    ln = subprocess.run(["ffmpeg", "-i", f, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    lj = json.loads(ln[ln.rindex("{"):ln.rindex("}") + 1])
    sil = subprocess.run(["ffmpeg", "-i", f, "-af", "silencedetect=noise=-35dB:d=0.35", "-f", "null", "-"], capture_output=True, text=True).stderr
    silences = len(re.findall(r"silence_end", sil))
    wav = os.path.join(tmp, name + ".wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-ac", "1", "-ar", "16000", wav])
    x, sr = read_wav(wav)
    text = []
    step = 25 * sr
    for i in range(0, len(x), step):
        t, _, _ = transcribe(x[i:i + step + sr], sr)
        text.append(t)
    words = len(" ".join(text).split())
    res.append(dict(file=name, duration=round(dur, 2), width=v["width"], height=v["height"], fps=v["r_frame_rate"],
                    vcodec=v["codec_name"], acodec=a[0]["codec_name"] if a else None, audio_sr=a[0].get("sample_rate") if a else None,
                    scene_cuts=len(cuts), cut_times=cuts, avg_shot_s=round(dur / (len(cuts) + 1), 2),
                    lufs=float(lj["input_i"]), true_peak=float(lj["input_tp"]), lra=float(lj["input_lra"]),
                    silences_over_350ms=silences, words=words, words_per_min=round(words / dur * 60),
                    transcript_chunks_25s=text))
    print(name, dur, len(cuts), lj["input_i"], words, flush=True)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(res, open(OUT, "w"), ensure_ascii=False, indent=2)
