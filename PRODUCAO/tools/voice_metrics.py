"""Métricas objetivas de uma narração (não substituem ouvir):
ritmo (palavras/min), tempo em pausa, maior pausa, variação de entonação (desvio de F0 em semitons) e de intensidade.
Uso como módulo: metrics(x, sr, n_words)."""
import numpy as np


def _frames(x, n, hop):
    k = 1 + (len(x) - n) // hop
    idx = np.arange(n)[None, :] + hop * np.arange(max(k, 0))[:, None]
    return x[idx]


def f0_track(x, sr, fmin=70, fmax=400):
    """F0 por autocorrelação normalizada em quadros de 40 ms (só quadros sonoros)."""
    n, hop = int(0.04 * sr), int(0.01 * sr)
    fr = _frames(x, n, hop) * np.hanning(n)
    rms = np.sqrt((fr ** 2).mean(1) + 1e-12)
    voiced_gate = rms > rms.max() * 10 ** (-30 / 20)
    spec = np.fft.rfft(fr, 2 * n)
    ac = np.fft.irfft(np.abs(spec) ** 2)[:, :n]
    ac /= ac[:, :1] + 1e-9
    lo, hi = int(sr / fmax), int(sr / fmin)
    lag = lo + ac[:, lo:hi].argmax(1)
    peak = ac[np.arange(len(ac)), lag]
    f0 = np.where(voiced_gate & (peak > 0.45), sr / lag, np.nan)
    return f0, rms


def metrics(x, sr, n_words):
    dur = len(x) / sr
    f0, rms = f0_track(x, sr)
    v = f0[~np.isnan(f0)]
    semis = 12 * np.log2(v / np.median(v)) if len(v) else np.array([0.0])
    hop = 0.01
    quiet = rms < rms.max() * 10 ** (-38 / 20)
    pauses, run = [], 0
    for q in quiet:
        if q:
            run += 1
        else:
            if run * hop >= 0.15:
                pauses.append(run * hop)
            run = 0
    loud_db = 20 * np.log10(rms[~quiet] + 1e-9) if (~quiet).any() else np.array([0.0])
    return dict(
        segundos=round(dur, 2),
        palavras_min=round(n_words / dur * 60),
        pausas_total_s=round(sum(pauses), 2),
        pausas_pct=round(100 * sum(pauses) / dur, 1),
        maior_pausa_s=round(max(pauses, default=0), 2),
        entonacao_desvio_semitons=round(float(np.std(semis)), 2),
        entonacao_faixa_p5_p95_semitons=round(float(np.percentile(semis, 95) - np.percentile(semis, 5)), 2),
        intensidade_desvio_db=round(float(np.std(loud_db)), 2),
    )
