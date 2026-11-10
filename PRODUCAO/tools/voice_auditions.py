"""Gera as audições de voz com o texto único definido em VOZ/VOZES_E_TESTES.md."""
import os, sys, json, time, difflib
sys.path.insert(0, os.path.dirname(__file__))
from tts_common import synth, trim_silence, write_wav, transcribe, norm, ROOT

TEXT = ("Corretor, deixa eu te fazer uma pergunta: você sabe quantos interessados ficaram sem retorno esta semana? "
        "Um contato não é só uma mensagem no WhatsApp. É uma conversa com contexto, prazo e próximo passo. "
        "E é isso que a gente precisa organizar.")
OUT = os.path.join(os.path.dirname(ROOT), "OUTPUT", "VOICE_AUDITIONS")
os.makedirs(OUT, exist_ok=True)
rows = []
for voice in ["pm_alex", "pm_santa", "pf_dora"]:
    t0 = time.time()
    x, sr = synth(TEXT, voice)
    gen = time.time() - t0
    x = trim_silence(x, sr)
    path = os.path.join(OUT, f"audicao_kokoro_{voice}.wav")
    write_wav(path, x, sr)
    text, _, _ = transcribe(x, sr)
    ratio = difflib.SequenceMatcher(None, norm(TEXT), norm(text)).ratio()
    rows.append(dict(voice=voice, seconds=round(len(x) / sr, 2), gen_seconds=round(gen, 1),
                     words_per_min=round(len(norm(TEXT)) / (len(x) / sr) * 60), asr_match=round(ratio, 3), asr_text=text))
    print(rows[-1], flush=True)
json.dump(rows, open(os.path.join(OUT, "audicoes_metricas.json"), "w"), ensure_ascii=False, indent=2)
