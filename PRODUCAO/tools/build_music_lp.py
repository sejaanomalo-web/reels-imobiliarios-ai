"""Trilha original do vídeo da landing ATIVO (16:9), sintetizada em código (sem samples de terceiros).

Estética: eletrônico minimalista — subgrave, pulso, ticks digitais, arpejo filtrado, pad, kick/hat/clap suaves, risers e impactos.
A estrutura segue os blocos A–H do briefing, amarrados às âncoras da narração (timeline.json → cues):
  A gancho (subgrave + pulso isolado + ticking; tira o ticking em "talvez o sistema esteja errado"; riser curto e resolução)
  B rotina (entra percussão leve, pulso e clicks; densidade cresce a cada card)
  C dor (sai percussão, grave mais fundo; micro-silêncio em "ficar para trás")
  D ATIVO (riser + impacto; harmonia abre)
  E funcionalidades (groove completo)
  F clareza (densidade cai; espaço para a voz)
  G diferencial (sai o beat; textura + grave; impacto em NÃO COMEÇAMOS PELO SISTEMA; breve silêncio; volta crescendo)
  H CTA (ponto mais positivo; resolução no fim do movimento da logo)
Uso: python3 tools/build_music_lp.py LP-ATIVO  → public/<EP>/music.wav
"""
import os, sys, json, wave
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EP = sys.argv[1] if len(sys.argv) > 1 else "LP-ATIVO"
tl = json.load(open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json")))
c = tl["cues"]
SR = 48000
DUR = tl["duration"]
N = int(DUR * SR)
BPM = float(json.load(open(os.path.join(ROOT, "episodes", EP, "episode.json"))).get("music", {}).get("bpm", 100))
BEAT = 60 / BPM
S16 = BEAT / 4
rng = np.random.default_rng(11)
tt = np.arange(N) / SR


def db(x):
    return 10 ** (x / 20)


def lp(x, f, o=2):
    return sosfilt(butter(o, f, "low", fs=SR, output="sos"), x)


def hp(x, f, o=2):
    return sosfilt(butter(o, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, o=2):
    return sosfilt(butter(o, [lo, hi], "band", fs=SR, output="sos"), x)


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def place(buf, x, t0, g=0.0, pan=0.0):
    i = int(t0 * SR)
    if i >= len(buf) or i + len(x) <= 0:
        return
    j = min(len(buf), i + len(x))
    seg = x[: j - i] * db(g)
    buf[i:j, 0] += seg * (1 - max(0, pan))
    buf[i:j, 1] += seg * (1 + min(0, pan))


def env(n, a, d):
    k = np.arange(n) / SR
    return np.minimum(1, k / max(a, 1e-4)) * np.exp(-k / d)


def saw(f, n, det=0.0):
    k = np.arange(n) / SR
    out = np.zeros(n)
    for dd in (-det, 0, det) if det else (0,):
        ph = (k * f * (1 + dd)) % 1
        out += 2 * ph - 1
    return out / (3 if det else 1)


# ---------- seções: (início, nome) ----------
SEC = [
    (0.0, "A"), (c["r_porque"] - 0.2, "B"), (c["d_e"] - 0.15, "C"), (c["v_foi"], "D"), (c["f_imo"] - 0.1, "E"),
    (c["c_na"] - 0.1, "F"), (c["x_mas"] - 0.05, "G"), (c["x_prim"], "G2"), (c["p_a"] - 0.1, "H"), (c["k_end"] + 0.15, "END"),
]


def sec_at(t):
    cur = SEC[0][1]
    for s, n in SEC:
        if t + 1e-6 >= s:
            cur = n
    return cur


# harmonia (raiz MIDI, acorde) por seção: escuro → abre depois do ATIVO
CH = {
    "A": [(38, [50, 53, 57])],
    "B": [(41, [53, 57, 60]), (36, [52, 55, 60]), (38, [50, 53, 57]), (34, [50, 53, 58])],
    "C": [(38, [50, 53, 57]), (34, [50, 53, 58])],
    "D": [(34, [53, 58, 62]), (41, [53, 57, 60]), (36, [55, 60, 64]), (38, [53, 57, 62])],
    "E": [(34, [53, 58, 62]), (41, [57, 60, 65]), (36, [55, 60, 64]), (38, [57, 62, 65])],
    "F": [(41, [57, 60, 65]), (34, [58, 62, 65])],
    "G": [(38, [50, 57])],
    "G2": [(41, [53, 57, 60, 64]), (34, [53, 58, 62]), (36, [55, 60, 64]), (41, [57, 60, 65])],
    "H": [(34, [58, 62, 65, 69]), (41, [57, 60, 65, 69]), (36, [55, 60, 64, 67]), (41, [57, 60, 65, 72])],
    "END": [(41, [57, 60, 65, 69, 72])],
}
BAR = BEAT * 4

pad = np.zeros((N, 2)); sub = np.zeros((N, 2)); arp = np.zeros((N, 2)); drm = np.zeros((N, 2)); tex = np.zeros((N, 2)); fx = np.zeros((N, 2))

# ---------- pad + subgrave: por compasso ----------
for si, (s0, name) in enumerate(SEC):
    s1 = SEC[si + 1][0] if si + 1 < len(SEC) else DUR
    if name == "END":
        s1 = DUR
    prog = CH[name]
    k = 0
    t = s0
    while t < s1 - 0.05:
        root, chord = prog[k % len(prog)]
        L = min(BAR * 2 if name not in ("A", "C", "G") else BAR * 4, s1 - t)
        if name == "END":
            L = DUR - t
        n = int(L * SR) + int(0.6 * SR)
        e = np.minimum(1, np.arange(n) / (0.35 * SR)) * np.clip((n - np.arange(n)) / (0.6 * SR), 0, 1)
        bright = {"A": 900, "B": 1300, "C": 800, "D": 2200, "E": 2600, "F": 1800, "G": 600, "G2": 2400, "H": 3000, "END": 2600}[name]
        voice = np.zeros(n)
        for m in chord:
            voice += saw(hz(m), n, det=0.004)
        voice = lp(voice, bright) * e * 0.18
        place(pad, voice, t, 0, pan=-0.2)
        place(pad, np.roll(voice, int(0.012 * SR)), t, -1, pan=0.2)
        # subgrave
        sb = np.sin(2 * np.pi * hz(root - 12 if root > 30 else root) * np.arange(n) / SR) * e
        place(sub, sb * 0.5, t, -2 if name in ("C", "G") else -4)
        t += L
        k += 1

# ---------- pulso isolado (A) / ticking digital ----------
tick = hp(rng.standard_normal(int(0.012 * SR)), 6000) * env(int(0.012 * SR), 0.0005, 0.003)
blip = np.sin(2 * np.pi * 1800 * np.arange(int(0.03 * SR)) / SR) * env(int(0.03 * SR), 0.001, 0.008)
pulse = np.sin(2 * np.pi * 55 * np.arange(int(0.25 * SR)) / SR) * env(int(0.25 * SR), 0.004, 0.08)
k = 0
while k * S16 < DUR - 0.2:
    t = k * S16
    s = sec_at(t)
    # tira o ticking em "talvez o sistema esteja errado"
    no_tick = c["g_talvez"] - 0.05 <= t <= c["g_sys"] - 0.1
    if s == "A":
        if k % 4 == 0:
            place(drm, pulse, t, -8)
        if not no_tick and k % 2 == 1:
            place(tex, tick, t, -24 + (4 if k % 4 == 3 else 0), pan=0.3 if k % 8 == 3 else -0.3)
    if s == "B" and k % 2 == 1:
        place(tex, tick, t, -26, pan=0.3 if k % 4 == 1 else -0.3)
    if s in ("D", "E", "H") and k % 4 == 2:
        place(tex, blip, t, -34, pan=0.4 if k % 8 == 2 else -0.4)
    k += 1

# ---------- arpejo filtrado (B cresce, D, E, F leve, G2 cresce, H) ----------
def arp_note(m, L, cut):
    n = int(L * SR)
    x = saw(hz(m), n) * env(n, 0.003, L * 0.45)
    return lp(x, cut, 2) * 0.22


k = 0
while k * S16 < DUR - 0.3:
    t = k * S16
    s = sec_at(t)
    prog = CH[s]
    sec_start = [x for x, n in SEC if n == s][0]
    root, chord = prog[int((t - sec_start) // (BAR * 2)) % len(prog)]
    notes = chord + [chord[0] + 12]
    m = notes[k % len(notes)] + 12
    play = False; g = -10; cut = 2000; step16 = False
    if s == "B":
        # densidade cresce com cada card da rotina
        dens = sum(1 for q in ("r_ret", "r_vis", "r_imo", "r_lead", "r_neg", "r_fu") if t >= c[q])
        play = (k % 2 == 0) and dens >= 1 or (k % 2 == 1 and dens >= 4)
        g = -14 + dens * 0.8; cut = 1200 + dens * 250
    elif s == "D":
        play = k % 2 == 0 and t > c["v_ativo"] - 0.1; g = -12; cut = 2600
    elif s == "E":
        play = True; g = -11; cut = 3000 + 600 * np.sin(t * 0.7)
    elif s == "F":
        play = k % 4 == 0; g = -16; cut = 1800
    elif s == "G2":
        grow = np.clip((t - c["x_prim"]) / (c["p_a"] - c["x_prim"]), 0, 1)
        play = k % 2 == 0 or grow > 0.5; g = -16 + 5 * grow; cut = 1400 + 1800 * grow
    elif s == "H":
        play = True; g = -10; cut = 3400
    if play:
        place(arp, arp_note(m, S16 * 1.6, cut), t, g, pan=0.35 if k % 2 else -0.35)
    k += 1

# ---------- bateria suave ----------
kt = np.arange(int(0.35 * SR)) / SR
kick = np.sin(2 * np.pi * np.cumsum(48 * (1 + 2.2 * np.exp(-kt / 0.02))) / SR) * np.exp(-kt / 0.12)
hat = hp(rng.standard_normal(int(0.05 * SR)), 8000) * env(int(0.05 * SR), 0.0005, 0.01)
clap = bp(rng.standard_normal(int(0.18 * SR)), 900, 3500) * env(int(0.18 * SR), 0.002, 0.05)
k = 0
while k * S16 < DUR - 0.3:
    t = k * S16
    s = sec_at(t)
    kk = hh = cl = False; kg = -8
    if s == "B":
        kk = t >= c["r_ret"] and k % 8 == 0; hh = t >= c["r_lead"] and k % 2 == 1; cl = t >= c["r_neg"] and k % 16 == 8
    elif s == "C":
        kk = k % 16 == 0 and t < c["d_tras"] - 0.3; kg = -6
    elif s == "D":
        kk = t >= c["v_ativo"] and k % 8 == 0; hh = t >= c["v_sem"] and k % 2 == 1
    elif s == "E":
        kk = k % 4 == 0; hh = True; cl = k % 16 == 8
    elif s == "F":
        kk = k % 16 == 0; kg = -12
    elif s == "G2":
        kk = t >= c["x_q1"] and k % 4 == 0; hh = t >= c["x_q3"] and k % 2 == 1
    elif s == "H":
        kk = k % 4 == 0; hh = k % 2 == 1; cl = k % 16 == 8
    if kk:
        place(drm, kick, t, kg)
    if hh:
        place(drm, hat, t, -22 + (3 if k % 4 == 2 else 0), pan=0.25 if k % 2 else -0.15)
    if cl:
        place(drm, clap, t, -17)
    k += 1

# ---------- risers e impactos ----------
def riser(L, f0=300, f1=6000):
    n = int(L * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    ch = 2048
    for i in range(0, n, ch):
        f = f0 * (f1 / f0) ** (i / n)
        seg = x[i:i + ch]
        out[i:i + len(seg)] = bp(seg, max(60, f * 0.7), min(SR / 2 - 100, f * 1.3), 1)
    return out * np.linspace(0, 1, n) ** 2 * 0.6


def impact(L=2.2):
    n = int(L * SR)
    k_ = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(42 * (1 + 1.5 * np.exp(-k_ / 0.05))) / SR) * np.exp(-k_ / 0.5)
    air = lp(rng.standard_normal(n), 1800) * np.exp(-k_ / 0.25) * 0.25
    return (boom + air) * 0.9


def end_hit(t):
    return t


place(fx, riser(1.4, 400, 7000), c["g_sys"] - 0.2, -14)                 # A: caixas se desfazem
place(fx, impact(1.6), c["g_rotina"] + 0.25, -14)
place(fx, riser(0.9, 300, 5000), c["v_foi"] - 0.85, -12)                  # D: seta ATIVO
place(fx, impact(2.6), c["v_foi"], -9)
place(fx, impact(2.0), c["v_ativo"] + 0.05, -16)                          # logo
place(fx, impact(2.4), c["x_nao"] - 0.05, -10)                            # NÃO COMEÇAMOS PELO SISTEMA
place(fx, riser(0.55, 500, 8000), c["x_prim"] - 0.55, -12)                # → COMEÇAMOS POR VOCÊ
place(fx, impact(2.8), c["x_prim"], -9)
place(fx, riser(1.2, 400, 7000), c["k_end"] - 1.1, -14)                   # resolução final com a seta da logo
place(fx, impact(3.2), c["k_end"] + 0.15, -9)

# ---------- textura atmosférica ----------
air = lp(hp(rng.standard_normal(N), 300), 3000) * 0.05
air *= (0.6 + 0.4 * np.sin(2 * np.pi * tt / 7.3))
tex[:, 0] += air
tex[:, 1] += np.roll(air, 900)


def reverb(x, decay=1.8, wet=0.3, seed=2):
    r = np.random.default_rng(seed)
    n = int(decay * SR)
    ir = r.standard_normal(n) * np.exp(-np.arange(n) / (decay * SR / 6.9))
    ir /= np.sqrt((ir ** 2).sum())
    from scipy.signal import fftconvolve
    y = np.stack([fftconvolve(x[:, 0], ir)[: len(x)], fftconvolve(x[:, 1], np.roll(ir, 37))[: len(x)]], axis=1)
    return x * (1 - wet) + y * wet


pad = reverb(pad, 2.6, 0.45, 3)
arp = reverb(arp, 1.4, 0.3, 4)
fx = reverb(fx, 2.2, 0.35, 5)

# ganhos por seção (curva de energia)
LV = {"A": -3, "B": -1.5, "C": -2.5, "D": 0, "E": 0.5, "F": -3, "G": -4, "G2": -1, "H": 1, "END": 0}
gain = np.array([LV[sec_at(x)] for x in np.arange(0, DUR, 0.05)])
gain = np.convolve(gain, np.ones(8) / 8, mode="same")
g = np.interp(tt, np.arange(len(gain)) * 0.05, gain)

mus = (pad * 1.0 + sub * 0.9 + arp * 0.8 + drm * 0.9 + tex * 0.8) * db(g)[:, None] + fx

# micro-silêncios: "ficar para trás" e depois de "sistema pronto"
for a0, a1 in ((c["d_tras"] + 0.05, c["v_foi"] - 0.9), (c["x_pronto_end"] + 0.05, c["x_prim"] - 0.55)):
    e = 1 - np.clip(np.minimum((tt - a0) / 0.06, (a1 - tt) / 0.08), 0, 1) * 0.95
    mus *= e[:, None]
# G: antes da volta, beat fora (já não tocado) — textura e grave só

# fades
mus *= np.clip(tt / 0.8, 0, 1)[:, None] * np.clip((DUR - tt) / 1.5, 0, 1)[:, None]
mus = np.stack([hp(mus[:, 0], 30), hp(mus[:, 1], 30)], axis=1)
mus = mus / (np.abs(mus).max() + 1e-9) * 0.9

out = os.path.join(ROOT, "public", EP, "music.wav")
x = np.clip(mus, -1, 1)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype(np.int16).tobytes())
print("trilha →", out, f"{DUR:.1f}s", "seções:", [(round(s, 2), n) for s, n in SEC])
