"""Gera UMA tomada de narração com o preset aprovado (VOZ/voice_preset.json, sem alterar nada), aplica `pronunciation` do episódio
e transcreve para conferência. Uso: python3 tools/gen_take.py <EP> <NOME> <PASTA_SAIDA>  (1 chamada = 1 geração da cota diária)."""
import sys, os, json
sys.path.insert(0, '/home/user/reels-imobiliarios-ai/PRODUCAO/tools')
from tts_common import trim_silence, write_wav, resample, MODELS, read_wav
from tts_gemini import synth_gemini
import sherpa_onnx
ROOT='/home/user/reels-imobiliarios-ai/PRODUCAO'
EP, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
ep=json.load(open(f'{ROOT}/episodes/{EP}/episode.json')); pre=json.load(open(ROOT+'/../VOZ/voice_preset.json'))
order,blocks=[],[]
for s in ep['segments']:
    if s['scene'] not in order: order.append(s['scene']); blocks.append([])
    blocks[-1].append(s['text'])
text="\n\n".join(" ".join(b) for b in blocks)
for k,v in {**pre.get('pronunciation_overrides',{}),**ep.get('pronunciation',{})}.items(): text=text.replace(k,v)
p=f"{out}/{EP}_{name}.wav"
if not os.path.exists(p):
    try: x,sr=synth_gemini(text,pre['voice_id'],pre['model_id'],pre['direction'])
    except Exception as e: print(EP,name,"FALHOU",str(e)[:160]); sys.exit(1)
    write_wav(p,trim_silence(x,sr),sr)
d=os.path.join(MODELS,"sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8")
pk=sherpa_onnx.OfflineRecognizer.from_transducer(encoder=d+"/encoder.int8.onnx",decoder=d+"/decoder.int8.onnx",joiner=d+"/joiner.int8.onnx",tokens=d+"/tokens.txt",model_type="nemo_transducer",num_threads=4)
x,sr=read_wav(p); s=pk.create_stream(); s.accept_waveform(16000,resample(x,sr,16000)); pk.decode_stream(s)
print(f"== {EP} {name} ({len(x)/sr:.1f}s)\n   ROTEIRO: {' '.join(' '.join(b) for b in blocks)}\n   OUVIDO : {s.result.text}")
