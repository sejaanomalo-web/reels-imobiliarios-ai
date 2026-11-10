"""Funções compartilhadas: síntese Kokoro (local) e transcrição Whisper (sherpa-onnx)."""
import os, re, wave
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS = os.path.join(ROOT, ".models")
_kokoro = None
_asr = None


def kokoro():
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro
        _kokoro = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))
    return _kokoro


def synth(text, voice, speed=1.0):
    samples, sr = kokoro().create(text, voice=voice, speed=speed, lang="pt-br")
    return np.asarray(samples, dtype=np.float32), sr


def trim_silence(x, sr, thresh_db=-45.0, pad=0.03):
    """Remove silêncio das pontas mantendo `pad` segundos."""
    win = int(sr * 0.01)
    n = len(x) // win
    if n == 0:
        return x
    rms = np.sqrt(np.mean(x[: n * win].reshape(n, win) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms + 1e-9)
    idx = np.where(db > thresh_db)[0]
    if len(idx) == 0:
        return x
    a = max(0, idx[0] * win - int(pad * sr))
    b = min(len(x), (idx[-1] + 1) * win + int(pad * sr))
    return x[a:b]


def write_wav(path, x, sr):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def read_wav(path):
    with wave.open(path, "rb") as w:
        sr = w.getframerate(); n = w.getnframes(); ch = w.getnchannels()
        x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
        if ch > 1:
            x = x.reshape(-1, ch).mean(axis=1)
    return x, sr


def resample(x, sr, to):
    if sr == to:
        return x
    n = int(round(len(x) * to / sr))
    return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)


def asr():
    global _asr
    if _asr is None:
        import sherpa_onnx
        d = os.path.join(MODELS, "whisper-small")
        _asr = sherpa_onnx.OfflineRecognizer.from_whisper(
            encoder=os.path.join(d, "small-encoder.int8.onnx"),
            decoder=os.path.join(d, "small-decoder.int8.onnx"),
            tokens=os.path.join(d, "small-tokens.txt"),
            language="pt", task="transcribe", num_threads=4,
            enable_token_timestamps=True,
        )
    return _asr


def transcribe(x, sr):
    """Retorna (texto, tokens, timestamps). Áudio de até ~30 s por chamada."""
    r = asr()
    s = r.create_stream()
    s.accept_waveform(16000, resample(x, sr, 16000))
    r.decode_stream(s)
    res = s.result
    return res.text.strip(), list(res.tokens), list(res.timestamps)


def norm(t):
    t = t.lower()
    t = re.sub(r"[^\wáàâãéêíóôõúüç ]", " ", t)
    return t.split()
