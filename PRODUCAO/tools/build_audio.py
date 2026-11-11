"""Design sonoro 100% sintetizado por código (sem samples de terceiros): trilha, efeitos e mixagem.

Lê episodes/<EP>/episode.json (lista `sfx` + `music`) e src/episodes/<EP>/timeline.json (tempos reais
da narração). Escreve stems em OUTPUT/<EP>/audio/ e a mixagem final em public/<EP>/mix.wav.

Uso: python3 tools/build_audio.py EP001
"""
import os, sys, json, subprocess, wave
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

sys.path.insert(0, os.path.dirname(__file__))
from tts_common import read_wav, ROOT

EP = sys.argv[1] if len(sys.argv) > 1 else "EP001"
REPO = os.path.dirname(ROOT)
SR = 48000
rng = np.random.default_rng(7)
ep = json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json")))
tl = json.load(open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json")))
DUR = tl["duration"]
N = int(round(DUR * SR))


def db(x):
    return 10 ** (x / 20)


def t_(dur):
    return np.arange(int(dur * SR)) / SR


def env_exp(dur, decay, attack=0.002):
    t = t_(dur)
    return np.minimum(1, t / attack) * np.exp(-t / decay)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, btype="high", fs=SR, output="sos"), x)


def semis(n):
    return 2 ** (n / 12)


def midi(n):
    return 440 * 2 ** ((n - 69) / 12)


def sweep_noise(dur, f0, f1, q=1.2, shape="hill"):
    """Ruído filtrado com frequência central variável (whoosh)."""
    n = int(dur * SR)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    blocks = 24
    edges = np.linspace(0, n, blocks + 1).astype(int)
    win_pad = int(0.01 * SR)
    for i in range(blocks):
        a, b = max(0, edges[i] - win_pad), min(n, edges[i + 1] + win_pad)
        fc = f0 * (f1 / f0) ** ((i + 0.5) / blocks)
        seg = bp(noise[a:b], fc / (1 + 0.5 / q), min(fc * (1 + 0.5 / q), SR / 2 - 100))
        w = np.ones(b - a)
        k = min(win_pad * 2, len(w) // 2)
        if k > 0:
            ramp = np.linspace(0, 1, k)
            w[:k] *= ramp; w[-k:] *= ramp[::-1]
        out[a:b] += seg * w
    t = np.linspace(0, 1, n)
    if shape == "hill":
        e = np.sin(np.pi * t) ** 1.6
    elif shape == "up":
        e = t ** 2.2 * np.minimum(1, (1 - t) / 0.08)
    else:
        e = (1 - t) ** 1.8 * np.minimum(1, t / 0.03)
    return out * e


# ---------- biblioteca de efeitos ----------
def s_tick(pitch=0, **_):
    f = 2100 * semis(pitch)
    t = t_(0.07)
    x = np.sin(2 * np.pi * f * t) * env_exp(0.07, 0.012) + 0.25 * hp(rng.standard_normal(len(t)), 5000) * env_exp(0.07, 0.004)
    return x


def s_click(pitch=0, **_):
    t = t_(0.09)
    x = np.sin(2 * np.pi * 1300 * semis(pitch) * t) * env_exp(0.09, 0.01) + 0.6 * np.sin(2 * np.pi * 320 * t) * env_exp(0.09, 0.02)
    return x + 0.3 * bp(rng.standard_normal(len(t)), 2500, 7000) * env_exp(0.09, 0.005)


def s_pop(pitch=0, **_):
    dur = 0.16
    t = t_(dur)
    f = 300 * semis(pitch) * (1 + 1.3 * np.exp(-t / 0.018))
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env_exp(dur, 0.045, 0.003)


def s_block(pitch=0, **_):
    dur = 0.11
    t = t_(dur)
    f = 520 * semis(pitch) * (1 + 0.5 * np.exp(-t / 0.01))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(dur, 0.028)


def s_thump(pitch=0, **_):
    dur = 0.5
    t = t_(dur)
    f = 52 * semis(pitch) * (1 + 1.6 * np.exp(-t / 0.035))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(dur, 0.14, 0.004)
    return x + 0.25 * lp(rng.standard_normal(len(t)), 900) * env_exp(dur, 0.02)


def s_whoosh_up(dur=0.6, **_):
    return sweep_noise(dur, 350, 4200, shape="up")


def s_whoosh_dive(dur=0.75, **_):
    x = sweep_noise(dur, 5000, 220, q=0.9, shape="hill")
    t = t_(dur)[: len(x)]
    sub = np.sin(2 * np.pi * np.cumsum(140 * np.exp(-t / 0.3) + 40) / SR) * np.sin(np.pi * np.linspace(0, 1, len(x))) ** 2
    return x + 0.5 * sub


def s_whoosh_fold(dur=0.7, **_):
    a = sweep_noise(dur, 3800, 500, shape="hill")
    b = sweep_noise(dur * 0.6, 900, 2600, shape="up")
    out = a.copy(); out[: len(b)] += 0.6 * b
    return out


def s_swish(**_):
    return sweep_noise(0.3, 1200, 5200, q=0.8, shape="hill")


def s_pin(**_):
    dur = 0.3
    t = t_(dur)
    f = 900 * np.exp(-t / 0.05) + 180
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(dur, 0.06)
    return x + 0.5 * s_thump(12)[: len(t)] * 0.6


def bell(note, dur=1.3, bright=0.35):
    f = midi(note)
    t = t_(dur)
    x = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.42)
    x += bright * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t / 0.2)
    x += 0.18 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t / 0.1)
    return x * np.minimum(1, t / 0.004)


def s_bell(note=72, **_):
    return bell(note)


def s_shimmer(**_):
    notes = [74, 77, 81, 86]
    out = np.zeros(int(1.9 * SR))
    for i, n in enumerate(notes):
        b = bell(n, 1.3, 0.2) * (0.9 - i * 0.12)
        a = int(i * 0.075 * SR)
        out[a:a + len(b)] += b[: len(out) - a]
    return out


def s_chord(**_):
    out = np.zeros(int(2.2 * SR))
    for i, n in enumerate([65, 69, 72, 77]):
        b = bell(n, 2.0, 0.25)
        a = int(i * 0.028 * SR)
        out[a:a + len(b)] += b[: len(out) - a] * 0.6
    return out


def s_hollow(pitch=0, **_):
    """Nota oca descendente: algo ficou em aberto."""
    dur = 0.9
    t = t_(dur)
    f = midi(62 + pitch) * (1 - 0.06 * np.minimum(1, t / 0.5))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.3) * np.minimum(1, t / 0.01)
    return x + 0.3 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * np.exp(-t / 0.18)


def s_typing(**_):
    out = np.zeros(int(0.8 * SR))
    for a in [0.0, 0.11, 0.2, 0.34, 0.43, 0.55, 0.63]:
        c = s_click(pitch=float(rng.uniform(-3, 3))) * rng.uniform(0.5, 1)
        i = int(a * SR); out[i:i + len(c)] += c
    return out


def s_scramble(dur=1.5, **_):
    out = np.zeros(int(dur * SR))
    tcur = 0.0
    while tcur < dur - 0.06:
        c = s_tick(pitch=float(rng.uniform(-9, 9))) * rng.uniform(0.4, 1)
        i = int(tcur * SR); out[i:i + len(c)] += c[: len(out) - i]
        tcur += rng.uniform(0.045, 0.085)
    return out * np.linspace(1, 0.5, len(out))


def s_fade_down(dur=2.6, **_):
    t = t_(dur)
    f = midi(57) * (1 - 0.18 * (t / dur) ** 1.5)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.4 * np.sin(2 * np.pi * np.cumsum(f * 2.02) / SR)
    e = np.sin(np.pi * np.minimum(1, t / dur)) ** 1.3
    return lp(x * e, 1400) + 0.12 * sweep_noise(dur, 2400, 300, shape="down")


def s_notif(pitch=0, **_):
    """Notificação de celular: duas notas curtas ascendentes."""
    out = np.zeros(int(0.42 * SR))
    for k, (n, at) in enumerate([(81, 0.0), (88, 0.09)]):
        b = bell(n + pitch, 0.3, 0.15) * (0.8 if k == 0 else 1.0)
        i = int(at * SR); out[i:i + len(b)] += b[: len(out) - i]
    return out


def s_ring(**_):
    """Vibração de celular sobre a mesa."""
    t = t_(0.42)
    am = (np.sin(2 * np.pi * 24 * t) > 0).astype(float)
    x = np.sin(2 * np.pi * 175 * t) * am + 0.4 * lp(rng.standard_normal(len(t)), 900) * am
    return lp(x, 1200) * np.minimum(1, t / 0.01) * np.minimum(1, (0.42 - t) / 0.05)


def s_impact(pitch=0, **_):
    """Impacto curto: grave + estalo filtrado."""
    dur = 0.6
    t = t_(dur)
    sub = np.sin(2 * np.pi * np.cumsum(46 * semis(pitch) * (1 + 2.2 * np.exp(-t / 0.03))) / SR) * np.exp(-t / 0.18)
    crack = lp(rng.standard_normal(len(t)), 3500) * np.exp(-t / 0.025)
    return sub + 0.55 * crack


def s_whip(**_):
    """Whip rápido para cortes de câmera."""
    return sweep_noise(0.24, 700, 7200, q=0.9, shape="hill")


def s_alert(**_):
    """Alerta: dois bipes curtos (tudo parece urgente)."""
    out = np.zeros(int(0.5 * SR))
    for at, f in [(0.0, 1046), (0.12, 784), (0.24, 1046)]:
        t = t_(0.08)
        b = np.tanh(2.2 * np.sin(2 * np.pi * f * t)) * np.minimum(1, t / 0.004) * np.minimum(1, (0.08 - t) / 0.01)
        i = int(at * SR); out[i:i + len(b)] += b * 0.8
    return lp(out, 5000)


def s_shuffle(dur=0.7, **_):
    """Cartões sendo reordenados: estalos em sequência sobre um swish."""
    out = np.zeros(int(dur * SR))
    tcur = 0.0
    while tcur < dur - 0.08:
        c = s_click(pitch=float(rng.uniform(-4, 4))) * rng.uniform(0.4, 0.9)
        i = int(tcur * SR); out[i:i + len(c)] += c[: len(out) - i]
        tcur += rng.uniform(0.05, 0.09)
    sw = sweep_noise(dur, 900, 3800, shape="hill") * 0.5
    return out + sw[: len(out)]


SOUNDS = dict(tick=s_tick, click=s_click, pop=s_pop, block=s_block, thump=s_thump, whoosh_up=s_whoosh_up,
              whoosh_dive=s_whoosh_dive, whoosh_fold=s_whoosh_fold, swish=s_swish, pin=s_pin, bell=s_bell,
              shimmer=s_shimmer, chord=s_chord, hollow=s_hollow, typing=s_typing, scramble=s_scramble,
              fade_down=s_fade_down, notif=s_notif, ring=s_ring, impact=s_impact, whip=s_whip,
              alert=s_alert, shuffle=s_shuffle)


def place(buf, x, t, gain_db, pan=0.0):
    x = np.asarray(x, dtype=np.float64)
    x = x / (np.abs(x).max() + 1e-9) * db(gain_db)
    i = int(round(t * SR))
    if i < 0:
        x = x[-i:]; i = 0
    n = min(len(x), buf.shape[0] - i)
    if n <= 0:
        return
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    buf[i:i + n, 0] += x[:n] * l * np.sqrt(2)
    buf[i:i + n, 1] += x[:n] * r * np.sqrt(2)


def reverb(x, decay=1.6, wet=0.25, seed=1):
    r = np.random.default_rng(seed)
    n = int(decay * SR)
    out = np.zeros_like(x)
    for ch in range(2):
        ir = r.standard_normal(n) * np.exp(-np.arange(n) / (decay * SR / 5))
        ir = lp(hp(ir, 250), 5200)
        ir /= np.sqrt((ir ** 2).sum())
        out[:, ch] = fftconvolve(x[:, ch], ir)[: len(x)]
    return x + wet * out


# ---------- efeitos ----------
sfx = np.zeros((N, 2))
events_log = []
for e in ep["sfx"]:
    fn = SOUNDS[e["sound"]]
    if "series" in e:
        times = tl["series"][e["series"]]
        for j, tt in enumerate(times):
            g = max(e.get("minGain", -60), e["gain"] + e.get("gainSlope", 0) * j)
            pan = float(rng.uniform(-1, 1)) * e.get("panRandom", 0)
            if "panSpread" in e:
                pan = (j % 6 / 5 - 0.5) * 2 * e["panSpread"]
            pitch = float(rng.uniform(-2, 2)) + j * 0.15
            if "pitches" in e:
                pitch = e["pitches"][j % len(e["pitches"])]
            if "pans" in e:
                pan = e["pans"][j % len(e["pans"])]
            place(sfx, fn(pitch=pitch), tt, g, pan)
            events_log.append(dict(t=tt, sound=e["sound"], gain=round(g, 1)))
    else:
        tt = tl["cues"][e["cue"]] + e.get("offset", 0)
        kw = {k: e[k] for k in ("pitch", "dur", "note") if k in e}
        place(sfx, fn(**kw), tt, e["gain"], e.get("pan", 0))
        events_log.append(dict(t=round(tt, 3), sound=e["sound"], gain=e["gain"], cue=e["cue"]))
sfx = reverb(sfx, 1.1, 0.16, seed=3)

# ---------- trilha ----------
mcfg = ep.get("music", {})
bpm = mcfg.get("bpm", 96)
beat = 60 / bpm
sc = {s["id"]: s for s in tl["scenes"]}
# progressão por cena, definida em episode.json → music.prog
# cada item: {"at": "scene:<id>" | "cue:<nome>" | segundos, "notes": [midi...], "root": midi, "dens": 1|2|4, "bright": 0..1}
def _at(v):
    if isinstance(v, (int, float)):
        return float(v)
    kind, name = v.split(":", 1)
    return float(sc[name]["start"] if kind == "scene" else tl["cues"][name])


prog = [(_at(p_["at"]), p_["notes"], p_["root"], p_["dens"], p_["bright"]) for p_ in mcfg["prog"]]
prog.sort(key=lambda r: r[0])
music = np.zeros((N, 2))
tt = np.arange(N) / SR
for i, (start, notes, root, dens, bright) in enumerate(prog):
    end = prog[i + 1][0] if i + 1 < len(prog) else DUR + 1
    fade = 0.9
    g = np.clip((tt - (start - fade / 2)) / fade, 0, 1) * np.clip(((end + fade / 2) - tt) / fade, 0, 1)
    g = np.sin(g * np.pi / 2) ** 2
    idx = np.where(g > 0)[0]
    if len(idx) == 0:
        continue
    a, b = idx[0], idx[-1] + 1
    seg_t = tt[a:b]
    for ch in range(2):
        pad = np.zeros(b - a)
        for n in notes:
            f = midi(n)
            for det in (-0.004, 0.0, 0.005):
                ph = rng.uniform(0, 2 * np.pi)
                ff = f * (1 + det * (1 if ch == 0 else -1))
                w = np.sin(2 * np.pi * ff * seg_t + ph)
                w += 0.33 * np.sin(2 * np.pi * 2 * ff * seg_t + ph * 1.3) + 0.16 * np.sin(2 * np.pi * 3 * ff * seg_t + ph * 0.7)
                pad += w * (0.9 if n < 48 else 0.55)
        pad = lp(pad, 500 + 1300 * bright)
        trem = 1 + 0.12 * np.sin(2 * np.pi * 0.23 * seg_t + ch)
        music[a:b, ch] += pad * g[a:b] * trem * 0.05
    # pulso
    step = beat / dens
    k0 = int(np.ceil(max(start, 0.0) / step))
    k = k0
    while k * step < min(end, DUR - 0.2):
        tp = k * step
        note = root + (12 if k % 4 == 2 else 0) + (7 if k % 8 == 5 else 0)
        dur = 0.32
        t1 = t_(dur)
        pl = np.sin(2 * np.pi * midi(note) * t1) * np.exp(-t1 / 0.07) + 0.3 * np.sin(2 * np.pi * midi(note) * 2 * t1) * np.exp(-t1 / 0.03)
        acc = 1.0 if k % dens == 0 else 0.55
        place(music, pl, tp, -31 + 20 * np.log10(acc) + (2 if dens == 4 else 0), pan=0.35 * (1 if k % 2 else -1))
        k += 1
music = reverb(music, 2.4, 0.5, seed=5)
music = np.stack([hp(music[:, 0], 45), hp(music[:, 1], 45)], axis=1)
music *= np.clip(tt / 0.4, 0, 1)[:, None] * np.clip((DUR - tt) / 1.4, 0, 1)[:, None]
music = music / (np.abs(music).max() + 1e-9) * db(mcfg.get("gain", -27) + 9)

# bateria opcional (episode.json → music.drums): bumbo nos tempos, chimbal em colcheias (1) ou semicolcheias (2)
dcfg = mcfg.get("drums")
if dcfg:
    secs = sorted([(_at(d["at"]), d.get("kick", 0), d.get("hat", 0)) for d in dcfg["sections"]], key=lambda r: r[0])
    drums = np.zeros((N, 2))
    kt = t_(0.32)
    kick = np.sin(2 * np.pi * np.cumsum(50 * (1 + 2.6 * np.exp(-kt / 0.025))) / SR) * np.exp(-kt / 0.11)
    ht = t_(0.06)
    hat = hp(rng.standard_normal(len(ht)), 7000) * np.exp(-ht / 0.012)
    step = 60 / bpm / 4
    k = 0
    while k * step < DUR - 0.3:
        tp = k * step
        cur = [r for r in secs if r[0] <= tp + 1e-6]
        if cur:
            _, kk, hh = cur[-1]
            if kk and k % 4 == 0:
                place(drums, kick, tp, -6 if k % 16 == 0 else -8)
            if hh and ((hh == 1 and k % 2 == 1) or (hh == 2)):
                place(drums, hat, tp, -20 + (3 if k % 4 == 2 else 0), pan=0.25 if k % 2 else -0.15)
        k += 1
    drums = drums / (np.abs(drums).max() + 1e-9) * db(dcfg.get("gain", -24) + 9)
    music = music + drums
# respiros: a trilha some por um instante para destacar uma revelação
for dr in mcfg.get("drops", []):
    a0 = _at(dr["at"]); d0 = dr["dur"]
    env = 1 - np.clip(np.minimum((tt - a0) / 0.04, (a0 + d0 - tt) / 0.12), 0, 1) * 0.92
    music *= env[:, None]

# ---------- narração + ducking ----------
narr, sr = read_wav(os.path.join(ROOT, "public", EP, "narration.wav"))
assert sr == SR
narr = np.pad(narr, (0, max(0, N - len(narr))))[:N]
win = int(0.05 * SR)
envl = np.sqrt(np.convolve(narr ** 2, np.ones(win) / win, mode="same"))
active = (envl > db(-38)).astype(float)
k = int(0.28 * SR)
active = np.convolve(active, np.ones(k) / k, mode="same")
active = np.clip(active * 1.6, 0, 1)
duck = db(mcfg.get("duck", -5.5) * active)
music *= duck[:, None]
sfx *= db(-2.0 * active)[:, None]

voice = np.stack([narr, narr], axis=1)
mix = voice + music + sfx
peak = np.abs(mix).max()
if peak > 0.98:
    mix *= 0.98 / peak


def save(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(x.shape[1]); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


out = os.path.join(REPO, "OUTPUT", ep.get("outputDir", EP), "audio"); os.makedirs(out, exist_ok=True)
save(os.path.join(out, "stem_trilha.wav"), music)
save(os.path.join(out, "stem_efeitos.wav"), sfx)
pre = os.path.join(out, "mix_pre_master.wav")
save(pre, mix)
json.dump(sorted(events_log, key=lambda e: e["t"]), open(os.path.join(out, "eventos_sfx.json"), "w"), ensure_ascii=False, indent=1)

# masterização: loudnorm em duas passagens (-15 LUFS, TP -1.5)
target = "I=-15:TP=-1.5:LRA=11"
p1 = subprocess.run(["ffmpeg", "-hide_banner", "-i", pre, "-af", f"loudnorm={target}:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
m = json.loads(p1[p1.rindex("{"): p1.rindex("}") + 1])
flt = (f"loudnorm={target}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
       f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true:print_format=summary")
final = os.path.join(ROOT, "public", EP, "mix.wav")
subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-y", "-i", pre, "-af", flt, "-ar", str(SR), "-c:a", "pcm_s16le", final], check=True)
p2 = subprocess.run(["ffmpeg", "-hide_banner", "-i", final, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
m2 = json.loads(p2[p2.rindex("{"): p2.rindex("}") + 1])


def lufs(path):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    return json.loads(p[p.rindex("{"): p.rindex("}") + 1])["input_i"]


rep = dict(final_lufs=m2["input_i"], final_true_peak=m2["input_tp"], final_lra=m2["input_lra"],
           narracao_lufs=lufs(os.path.join(ROOT, "public", EP, "narration.wav")),
           trilha_lufs=lufs(os.path.join(out, "stem_trilha.wav")), efeitos_lufs=lufs(os.path.join(out, "stem_efeitos.wav")),
           eventos=len(events_log))
json.dump(rep, open(os.path.join(out, "mix_relatorio.json"), "w"), indent=1)
print(rep)
