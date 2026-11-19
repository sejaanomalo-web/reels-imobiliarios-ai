"""Gera episode.json de um episódio NOV26 (uso: importar build(n, ...) a partir de PRODUCAO/; ver ATIVO-NOV26-05). Inclui a CTA SISTEMA e voice.tightenPauses (regra 19/11/2026)."""
import json,re,os
W=r"[\wáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]+"
CTA=[("cta","Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos?","Quer conhecer | um sistema *personalizado* | para organizar | seus *imóveis, leads* | e *atendimentos?*"),
     ("cta","Comente SISTEMA que eu te envio os detalhes pelo Direct.","Comente *SISTEMA* | que eu te envio | os detalhes | pelo *Direct.*")]
def fx(c,o,s,g,**kw):
    d=dict(cue=c,offset=o,sound=s,gain=g); d.update(kw); return d
def build(n,title,S,L,sfx,prog,cta,diag,apur,lead,cta_in_script=False):
    base=json.load(open('episodes/ATIVO-NOV26-03/episode.json'))
    S=S+([] if cta_in_script else CTA)
    segs=[dict(id=f"s{i+1}",scene=a,text=b,caption=c,pauseAfter=0.3) for i,(a,b,c) in enumerate(S)]
    for s in segs: assert re.findall(W,s['text'])==re.findall(W,s['caption'].replace('*','').replace('|','')),s['id']
    k=len(segs)
    L=L+[("cta_quer",f"s{k-1}","Quer"),("cta_sys",f"s{k-1}","sistema"),("cta_tiles",f"s{k-1}","imóveis"),("cta_comment",f"s{k}","Comente"),("cta_word",f"s{k}","SISTEMA"),("cta_direct",f"s{k}","Direct")]
    C={a:dict(seg=s,word=w,edge="start",offset=0) for a,s,w in L}; C["cta_end"]=dict(seg=f"s{k}",word="Direct",edge="end",offset=0)
    for a,v in C.items():
        seg=next(s for s in segs if s['id']==v['seg']); assert v['word'] in re.findall(W,seg['text']),a
    sfx=sfx+[fx("cta_sys",0.4,"whoosh_fold",-27),fx("cta_comment",-0.3,"pop",-25,pitch=3),fx("cta_word",0.55,"typing",-30),fx("cta_end",0.35,"shimmer",-28)]
    prog=prog+[{"at":"cue:cta_sys","notes":[24,36,48,52,55,62],"root":36,"dens":2,"bright":0.6,"label":"Cadd9 — sistema"}]
    cta.update(type="comentario",keyword="SISTEMA",channel="Direct",base_text=base['cta']['base_text'],source="regra do cliente em 14/11/2026")
    N=f"{n:02d}"
    ep={x:base[x] for x in ['fps','width','height','leadIn','tail','lote','accent','pronunciation','master']}
    ep.update(id=f"ATIVO-NOV26-{N}",title=title,outputDir=f"ATIVO_NOV26_{N}",
      deliverables=dict(final=f"ATIVO_NOV26_{N}_FINAL.mp4",narration=f"ATIVO_NOV26_{N}_NARRACAO.wav",subtitles=f"ATIVO_NOV26_{N}_legendas.srt",cover=f"ATIVO_NOV26_{N}_capa.png"),
      fonte=f"ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_{N}.md (lote ATIVO_30_ROTEIROS_NOV2026.docx, cliente, 17/11/2026)",apuracao=apur,diagnostico=diag,cta=cta,
      segments=segs,voice={"tightenPauses":{"min":0.06,"max":0.09},"nota":"regra do cliente 19/11/2026: quase sem pausas; sem time-stretch"},sceneLead=lead,hideCaptions=[],cues=C,series={},sfx=sfx,music=dict(gain=-30,duck=-5.5,bpm=88,prog=prog))
    os.makedirs(f'episodes/ATIVO-NOV26-{N}',exist_ok=True)
    json.dump(ep,open(f'episodes/ATIVO-NOV26-{N}/episode.json','w'),ensure_ascii=False,indent=1)
    st=json.load(open('lotes/NOV26/estado.json'))
    for e in st['episodios']:
        if e['id']==f'ATIVO_NOV26_{N}': e['status']='em_producao'; e['notas']='em produção'
    json.dump(st,open('lotes/NOV26/estado.json','w'),ensure_ascii=False,indent=1)
    print(sum(len(re.findall(W,s['text'])) for s in segs),"palavras")
