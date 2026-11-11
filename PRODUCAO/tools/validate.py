"""Validação técnica do MP4 final (ffprobe/FFmpeg). Uso: python3 tools/validate.py EP001"""
import os, sys, json, subprocess, re

EP = sys.argv[1] if len(sys.argv) > 1 else "EP001"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
out = os.path.join(os.path.dirname(ROOT), "OUTPUT", _ep.get("outputDir", EP))
f = os.path.join(out, _ep.get("deliverables", {}).get("final", f"{EP}_final_1080x1920.mp4"))
tl = json.load(open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json")))
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", f], capture_output=True, text=True).stdout)
v = next(s for s in pr["streams"] if s["codec_type"] == "video")
a = [s for s in pr["streams"] if s["codec_type"] == "audio"]
dur = float(pr["format"]["duration"])
dec = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-f", "null", "-"], capture_output=True, text=True).stderr.strip()
ln = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
lj = json.loads(ln[ln.rindex("{"): ln.rindex("}") + 1])
bd = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-vf", "blackdetect=d=0.2:pix_th=0.06", "-an", "-f", "null", "-"], capture_output=True, text=True).stderr
black = re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", bd)
sd = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "silencedetect=noise=-50dB:d=0.4", "-vn", "-f", "null", "-"], capture_output=True, text=True).stderr
sil = re.findall(r"silence_start: ([\d.]+)", sd)
checks = [
    ("Dimensões 1080x1920", v["width"] == 1080 and v["height"] == 1920, f'{v["width"]}x{v["height"]}'),
    ("Codec de vídeo H.264", v["codec_name"] == "h264", v["codec_name"]),
    ("Pixel format yuv420p", v["pix_fmt"] == "yuv420p", v["pix_fmt"]),
    ("30 fps", v["r_frame_rate"] == "30/1", v["r_frame_rate"]),
    ("Áudio AAC presente", bool(a) and a[0]["codec_name"] == "aac", a[0]["codec_name"] if a else "sem áudio"),
    ("Duração = timeline (±0,1 s)", abs(dur - tl["duration"]) < 0.1, f'{dur:.2f} s (timeline {tl["duration"]:.2f} s)'),
    ("Decodificação sem erros", dec == "", dec[:120] or "ok"),
    ("Loudness entre -16 e -14 LUFS", -16.3 <= float(lj["input_i"]) <= -13.7, f'{lj["input_i"]} LUFS'),
    ("True peak ≤ -1 dBTP", float(lj["input_tp"]) <= -1.0, f'{lj["input_tp"]} dBTP'),
    ("Sem trechos pretos ≥ 0,2 s", not black, str(black) if black else "nenhum"),
    ("Sem silêncio total ≥ 0,4 s", not sil, str(sil) if sil else "nenhum"),
]
rep = dict(file=os.path.basename(f), size_mb=round(os.path.getsize(f) / 1e6, 2), duration=round(dur, 2),
           video_bitrate_kbps=round(int(v.get("bit_rate", 0)) / 1000), color_space=v.get("color_space"),
           audio_sample_rate=a[0].get("sample_rate") if a else None, audio_channels=a[0].get("channels") if a else None,
           checks=[dict(check=c, ok=bool(ok), value=val) for c, ok, val in checks])
json.dump(rep, open(os.path.join(out, "validacao_tecnica.json"), "w"), ensure_ascii=False, indent=1)
for c, ok, val in checks:
    print(("OK  " if ok else "FALHA"), c, "→", val)
print(json.dumps({k: rep[k] for k in ("size_mb", "duration", "video_bitrate_kbps", "color_space", "audio_sample_rate", "audio_channels")}))
sys.exit(0 if all(ok for _, ok, _ in checks) else 1)
