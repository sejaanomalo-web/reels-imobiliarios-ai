"""Síntese de voz pela API do Gemini (modelos *-tts). A chave vem só de variável de ambiente: GEMINI_API_KEY, ou a variável
nomeada em GEMINI_KEY_VAR (ex.: GEMINI_KEY_VAR=GEMINI_API_KEY_2). Nunca gravar a chave em arquivo ou log."""
import os, json, base64, time, urllib.request, urllib.error
import numpy as np

API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def synth_gemini(text, voice, model="gemini-3.8-flash-tts", style=None, retries=3):
    """Retorna (amostras float32, sample_rate). `style` é uma direção de interpretação, não é lida."""
    var = os.environ.get("GEMINI_KEY_VAR", "GEMINI_API_KEY")
    key = os.environ.get(var)
    if not key:
        raise RuntimeError(f"Defina {var} no ambiente para usar a voz do Gemini.")
    # Rótulos explícitos: sem eles o modelo lê a direção em voz alta (testado em 3.8-flash-tts).
    prompt = f"# DIREÇÃO (não ler em voz alta)\n{style.strip()}\n\n# TEXTO A SER FALADO\n{text}" if style else text
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
        },
    }).encode()
    last = None
    for attempt in range(retries):
        req = urllib.request.Request(API.format(model=model), data=body,
                                     headers={"Content-Type": "application/json", "x-goog-api-key": key})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                d = json.load(r)
            part = d["candidates"][0]["content"]["parts"][0]["inlineData"]
            mime = part.get("mimeType", "")
            sr = int(mime.split("rate=")[1].split(";")[0]) if "rate=" in mime else 24000
            pcm = np.frombuffer(base64.b64decode(part["data"]), dtype="<i2").astype(np.float32) / 32768
            return pcm, sr
        except urllib.error.HTTPError as e:
            last = f"HTTP {e.code}: {e.read().decode()[:300]}"
            if e.code not in (429, 500, 503):
                break
        except Exception as e:  # resposta sem áudio, timeout etc.
            last = repr(e)[:300]
        time.sleep(4 * (attempt + 1))
    raise RuntimeError(f"Gemini TTS falhou ({model}, {voice}): {last}")
