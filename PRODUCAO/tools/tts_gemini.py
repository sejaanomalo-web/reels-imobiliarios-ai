"""Síntese de voz pela API do Gemini (modelos *-tts). A chave vem só de variável de ambiente: GEMINI_API_KEY, ou a variável
nomeada em GEMINI_KEY_VAR; quando a cota diária de uma chave acaba, usa a próxima (GEMINI_API_KEY_2, _3…) automaticamente.
Nunca gravar a chave em arquivo ou log."""
import os, json, base64, time, urllib.request, urllib.error
import numpy as np

API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def _chaves():
    """Ordem das chaves (só NOMES de variáveis; os valores nunca são impressos): a de GEMINI_KEY_VAR (ou GEMINI_API_KEY)
    primeiro, depois GEMINI_API_KEY, GEMINI_API_KEY_2, GEMINI_API_KEY_3… que existirem no ambiente."""
    base = os.environ.get("GEMINI_KEY_VAR", "GEMINI_API_KEY")
    nomes = [base, "GEMINI_API_KEY"] + [f"GEMINI_API_KEY_{i}" for i in range(2, 10)]
    vistos = []
    for n in nomes:
        if n not in vistos and os.environ.get(n):
            vistos.append(n)
    return vistos


_ESGOTADAS = set()  # chaves cuja cota DIÁRIA acabou nesta execução


def synth_gemini(text, voice, model="gemini-3.8-flash-tts", style=None, retries=3):
    """Retorna (amostras float32, sample_rate). `style` é uma direção de interpretação, não é lida.
    Regra do cliente (24/11/2026): quando a cota DIÁRIA de uma chave acaba (429 PerDay), passa automaticamente para a
    próxima chave (GEMINI_API_KEY → GEMINI_API_KEY_2 → …), com o MESMO modelo e a MESMA voz. Nunca troca de modelo."""
    nomes = [n for n in _chaves() if n not in _ESGOTADAS]
    if not nomes:
        raise RuntimeError("Nenhuma chave do Gemini disponível (defina GEMINI_API_KEY; extras em GEMINI_API_KEY_2, _3…) ou todas com a cota diária esgotada.")
    ultimo = None
    for var in nomes:
        try:
            return _synth_uma_chave(text, voice, model, style, retries, os.environ[var])
        except RuntimeError as e:
            ultimo = e
            if "PerDay" in str(e):
                _ESGOTADAS.add(var)
                print(f"AVISO: cota diária da chave {var} esgotada para {model}; tentando a próxima chave.", flush=True)
                continue
            raise
    raise ultimo


def _synth_uma_chave(text, voice, model, style, retries, key):
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
            corpo = e.read().decode()
            last = f"HTTP {e.code}: {corpo[:300]}" + (" [PerDay]" if "PerDay" in corpo else "")
            if "PerDay" in corpo:
                break  # cota diária: não adianta repetir com esta chave
            if e.code not in (429, 500, 503):
                break
        except Exception as e:  # resposta sem áudio, timeout etc.
            last = repr(e)[:300]
        time.sleep(4 * (attempt + 1))
    raise RuntimeError(f"Gemini TTS falhou ({model}, {voice}): {last}")
