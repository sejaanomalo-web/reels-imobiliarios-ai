"""Lote D1203 — grade PRODUCAO/grade/2026-12-03.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-03/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1203/mk_D1203.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-03"
ROT = "ROTEIROS/ESTEIRA/2026-12-03/"


def ajusta(ep_id, pron=None):
    p = os.path.join("episodes", ep_id, "episode.json"); e = json.load(open(p))
    if pron:
        e["pronunciation"].update(pron)
    json.dump(e, open(p, "w"), ensure_ascii=False, indent=1)


def prog(a, b, c):
    return [{"at": 0, "notes": [26, 38, 45, 50, 54], "root": 38, "dens": 1, "bright": 0.5, "label": "abertura"},
            {"at": f"cue:{a}", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.55, "label": "desenvolvimento"},
            {"at": f"cue:{b}", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.45, "label": "virada"},
            {"at": f"cue:{c}", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.6, "label": "desfecho"}]


def L_auto(S, marcas):
    """marcas: [(cue, seg_idx(1-based), palavra)]."""
    return [(c, f"s{i}", w) for c, i, w in marcas]


EPS = {
 "08": dict(ep="ATIVO-D1203-08", out="ATIVO_D1203_08", fn="ATIVO-D1203-08_so_tres_imoveis.md", tit="E se você mostrasse só 3 imóveis?", formato="cartoon-explicativo", slot="08:00", trilha="T05",
   S=[("hook", "E se você mostrasse só três imóveis para cada cliente?", "E se você mostrasse | só *três imóveis* | para cada cliente?"),
      ("estudo", "A ideia vem de um estudo famoso.", "A ideia vem | de um *estudo* famoso."),
      ("estudo", "Num mercado, uma mesa tinha 24 geleias para provar. Outra, só 6.", "Num mercado, | uma mesa tinha | *24 geleias* | para provar. | Outra, | só *6.*"),
      ("estudo", "Com 6, 30% de quem parou na mesa comprou. Com 24, só 3%.", "Com 6, | *30%* | de quem parou na mesa | comprou. | Com 24, | só *3%.*"),
      ("virada", "Só que, anos depois, uma revisão de 50 experimentos achou um efeito médio quase zero.", "Só que, | anos depois, | uma revisão | de *50 experimentos* | achou um efeito médio | *quase zero.*"),
      ("virada", "Muita opção só atrapalha quando a pessoa ainda não sabe o que quer.", "Muita opção | só atrapalha | quando a pessoa | *ainda não sabe* | o que quer."),
      ("criterio", "Então o número de imóveis importa menos que a ordem.", "Então o número | de imóveis | importa menos | que a *ordem.*"),
      ("criterio", "Primeiro, os critérios: bairro, quartos, o que não pode faltar.", "Primeiro, | os *critérios:* | *bairro,* | *quartos,* | o que *não pode faltar.*"),
      ("desfecho", "Com critério claro, o cliente compara. Sem critério, ele só se perde.", "Com critério claro, | o cliente *compara.* | Sem critério, | ele só *se perde.*")],
   M=[("h_tres", 1, "três"), ("e_estudo", 2, "estudo"), ("e_24", 3, "24"), ("e_6", 3, "6"), ("e_30", 4, "30"), ("e_3", 4, "3"), ("v_soque", 5, "Só"), ("v_50", 5, "50"), ("v_zero", 5, "zero"),
      ("v_sabe", 6, "sabe"), ("c_ordem", 7, "ordem"), ("c_criterios", 8, "critérios"), ("c_bairro", 8, "bairro"), ("c_quartos", 8, "quartos"), ("c_faltar", 8, "faltar"),
      ("f_compara", 9, "compara"), ("f_perde", 9, "perde")],
   anc={"virada": "cue:v_soque", "insight": "cue:c_ordem", "resolucao": "cue:f_compara"}, pron={"24": "vinte e quatro", "30%": "trinta por cento", "3%": "três por cento"}),
 "10": dict(ep="ATIVO-D1203-10", out="ATIVO_D1203_10", fn="ATIVO-D1203-10_o_porque_de_cada_imovel.md", tit="O porquê de cada imóvel", formato="planta-tecnica", slot="10:00", trilha="T01",
   S=[("hook", "As plataformas de streaming não mostram só um filme. Mostram o motivo: porque você assistiu tal série.", "As plataformas de streaming | não mostram | só um filme. | Mostram o *motivo:* | porque você assistiu | tal série."),
      ("dado", "Num artigo de 2015, engenheiros de uma das maiores contaram que cerca de 80% do que se assiste lá vem das recomendações.", "Num artigo de 2015, | engenheiros | de uma das maiores | contaram que cerca de *80%* | do que se assiste lá | vem das *recomendações.*"),
      ("virada", "Agora olhe a sua lista de imóveis para o cliente. Dez links, nenhum motivo.", "Agora olhe | a sua lista de imóveis | para o cliente. | *Dez links,* | *nenhum motivo.*"),
      ("virada", "Ele abre, não entende por que aquele está ali, e descarta.", "Ele abre, | não entende | por que aquele está ali, | e *descarta.*"),
      ("linha", "Escreva uma linha em cada um: separei este porque você disse que precisa de dois quartos perto da escola.", "Escreva *uma linha* | em cada um: | separei este | porque você disse | que precisa de *dois quartos* | perto da *escola.*"),
      ("linha", "A linha mostra que você ouviu. E transforma a lista em recomendação.", "A linha mostra | que você *ouviu.* | E transforma a lista | em *recomendação.*"),
      ("desfecho", "Imóvel com motivo é visto. Imóvel sem motivo é só mais um link.", "Imóvel com motivo | é *visto.* | Imóvel sem motivo | é só *mais um link.*")],
   M=[("h_streaming", 1, "streaming"), ("h_motivo", 1, "motivo"), ("h_serie", 1, "série"), ("d_2015", 2, "2015"), ("d_80", 2, "80"), ("d_recomendacoes", 2, "recomendações"),
      ("v_agora", 3, "Agora"), ("v_dez", 3, "Dez"), ("v_nenhum", 3, "nenhum"), ("v_abre", 4, "abre"), ("v_descarta", 4, "descarta"),
      ("l_linha", 5, "linha"), ("l_separei", 5, "separei"), ("l_quartos", 5, "quartos"), ("l_escola", 5, "escola"), ("l_ouviu", 6, "ouviu"), ("l_recomendacao", 6, "recomendação"),
      ("f_visto", 7, "visto"), ("f_link", 7, "link")],
   anc={"virada": "cue:v_agora", "insight": "cue:l_linha", "resolucao": "cue:f_visto"}, pron={"2015": "dois mil e quinze", "80%": "oitenta por cento"}),
 "12": dict(ep="ATIVO-D1203-12", out="ATIVO_D1203_12", fn="ATIVO-D1203-12_a_casa_de_um_euro.md", tit="A casa de 1 euro", formato="maquete-3d", slot="12:00", trilha="T02",
   S=[("hook", "Em 2019, uma cidade da Sicília pôs casas à venda por um euro.", "Em *2019,* | uma cidade da Sicília | pôs casas à venda | por *um euro.*"),
      ("cidade", "Sambuca estava perdendo moradores. Casas vazias, ruas silenciosas.", "*Sambuca* | estava perdendo moradores. | *Casas vazias,* | ruas silenciosas."),
      ("mundo", "O anúncio rodou o mundo. Choveram interessados.", "O anúncio | *rodou o mundo.* | Choveram *interessados.*"),
      ("mundo", "Mas tinha condição: depósito de 5 mil euros e reforma em até três anos.", "Mas tinha *condição:* | depósito de *5 mil euros* | e reforma | em até *três anos.*"),
      ("mundo", "E no leilão, a maioria saiu entre 5 e 10 mil euros.", "E no *leilão,* | a maioria saiu | entre *5 e 10 mil* euros."),
      ("virada", "A cidade nunca quis o dinheiro. Ela queria gente morando ali de novo.", "A cidade | *nunca quis* o dinheiro. | Ela queria *gente* | morando ali | de novo."),
      ("licao", "Todo vendedor tem um objetivo além do preço. Prazo, quem vai cuidar da casa, um recomeço.", "Todo vendedor | tem um *objetivo* | além do preço. | *Prazo,* | quem vai *cuidar* da casa, | um *recomeço.*"),
      ("desfecho", "Na captação, pergunte o que ele quer além do número. É aí que a negociação ganha saída.", "Na captação, | *pergunte* | o que ele quer | além do número. | É aí que a negociação | *ganha saída.*")],
   M=[("h_2019", 1, "2019"), ("h_cidade", 1, "cidade"), ("h_euro", 1, "euro"), ("c_sambuca", 2, "Sambuca"), ("c_vazias", 2, "vazias"), ("c_ruas", 2, "ruas"),
      ("m_mundo", 3, "mundo"), ("m_interessados", 3, "interessados"), ("m_condicao", 4, "condição"), ("m_5mil", 4, "5"), ("m_tres", 4, "três"), ("m_leilao", 5, "leilão"), ("m_10", 5, "10"),
      ("v_nunca", 6, "nunca"), ("v_gente", 6, "gente"), ("v_novo", 6, "novo"), ("l_objetivo", 7, "objetivo"), ("l_prazo", 7, "Prazo"), ("l_cuidar", 7, "cuidar"), ("l_recomeco", 7, "recomeço"),
      ("f_pergunte", 8, "pergunte"), ("f_saida", 8, "saída")],
   anc={"virada": "cue:v_nunca", "insight": "cue:l_objetivo", "resolucao": "cue:f_pergunte"}, pron={"2019": "dois mil e dezenove", "5 mil": "cinco mil", "5 e 10 mil": "cinco e dez mil"}),
 "15": dict(ep="ATIVO-D1203-15", out="ATIVO_D1203_15", fn="ATIVO-D1203-15_ela_amou_ele_odiou.md", tit="Ela amou, ele odiou", formato="cartoon-explicativo", slot="15:00", trilha="T04",
   S=[("hook", "Visita com casal. Ela já está escolhendo onde vai a mesa.", "Visita com *casal.* | Ela já está escolhendo | onde vai a *mesa.*"),
      ("hook", "Ele está de braços cruzados na porta.", "Ele está | de *braços cruzados* | na porta."),
      ("erro", "Você tenta convencer quem não gostou. E aí os dois se fecham.", "Você tenta *convencer* | quem não gostou. | E aí os dois | *se fecham.*"),
      ("virada", "Casal não discorda do imóvel. Discorda dos critérios, que nunca foram combinados.", "Casal não discorda | do imóvel. | Discorda dos *critérios,* | que nunca foram | *combinados.*"),
      ("perguntas", "Na próxima conversa, pergunte a cada um: o que precisa ter para ser sim pra você? E o que é inegociável?", "Na próxima conversa, | pergunte *a cada um:* | o que precisa ter | para ser *sim* pra você? | E o que é | *inegociável?*"),
      ("perguntas", "Às vezes, ela quer espaço. Ele quer não pegar trânsito.", "Às vezes, | ela quer *espaço.* | Ele quer | não pegar *trânsito.*"),
      ("desfecho", "Com os dois critérios na mesa, você para de defender o imóvel e começa a procurar o certo.", "Com os dois critérios | na mesa, | você para de *defender* o imóvel | e começa a procurar | *o certo.*")],
   M=[("h_casal", 1, "casal"), ("h_mesa", 1, "mesa"), ("h_bracos", 2, "braços"), ("h_porta", 2, "porta"), ("e_convencer", 3, "convencer"), ("e_fecham", 3, "fecham"),
      ("v_casal", 4, "Casal"), ("v_criterios", 4, "critérios"), ("v_combinados", 4, "combinados"), ("p_cada", 5, "cada"), ("p_sim", 5, "sim"), ("p_inegociavel", 5, "inegociável"),
      ("p_espaco", 6, "espaço"), ("p_transito", 6, "trânsito"), ("f_mesa", 7, "mesa"), ("f_defender", 7, "defender"), ("f_certo", 7, "certo")],
   anc={"tensao": "cue:e_convencer", "virada": "cue:v_casal", "insight": "cue:p_cada", "resolucao": "cue:f_defender"}, pron={}),
 "18": dict(ep="ATIVO-D1203-18", out="ATIVO_D1203_18", fn="ATIVO-D1203-18_o_movel_que_voce_montou.md", tit="O móvel que você montou", formato="maquete-3d", slot="18:00", trilha="T03",
   S=[("hook", "Por que o móvel que você mesmo montou parece mais bonito?", "Por que o *móvel* | que você mesmo *montou* | parece mais bonito?"),
      ("estudo", "Pesquisadores americanos testaram: as pessoas pagavam mais por caixas que elas montaram do que por caixas iguais, já prontas.", "Pesquisadores americanos | testaram: | as pessoas | *pagavam mais* | por caixas | que elas *montaram* | do que por caixas iguais, | já *prontas.*"),
      ("estudo", "Até origami malfeito ganhava valor na mão de quem dobrou.", "Até *origami* malfeito | ganhava valor | na mão de quem *dobrou.*"),
      ("estudo", "A gente valoriza o que ajudou a construir.", "A gente *valoriza* | o que ajudou | a *construir.*"),
      ("virada", "Agora pense na busca do seu cliente. Você entrega uma lista pronta.", "Agora pense | na busca | do seu cliente. | Você entrega | uma *lista pronta.*"),
      ("junto", "Experimente montar com ele: ele marca os bairros no mapa, define o que não pode faltar, descarta junto com você.", "Experimente | *montar com ele:* | ele marca os *bairros* | no mapa, | define o que | *não pode faltar,* | *descarta* | junto com você."),
      ("desfecho", "Imóvel encontrado junto vale mais do que imóvel entregue pronto.", "Imóvel encontrado *junto* | vale mais | do que imóvel | entregue *pronto.*")],
   M=[("h_movel", 1, "móvel"), ("h_montou", 1, "montou"), ("h_bonito", 1, "bonito"), ("e_pesquisadores", 2, "Pesquisadores"), ("e_pagavam", 2, "pagavam"), ("e_montaram", 2, "montaram"), ("e_prontas", 2, "prontas"),
      ("e_origami", 3, "origami"), ("e_dobrou", 3, "dobrou"), ("e_valoriza", 4, "valoriza"), ("e_construir", 4, "construir"), ("v_agora", 5, "Agora"), ("v_lista", 5, "lista"),
      ("j_montar", 6, "montar"), ("j_bairros", 6, "bairros"), ("j_faltar", 6, "faltar"), ("j_descarta", 6, "descarta"), ("f_junto", 7, "junto"), ("f_pronto", 7, "pronto")],
   anc={"descoberta": "cue:e_valoriza", "virada": "cue:v_agora", "resolucao": "cue:f_junto"}, pron={}),
 "21": dict(ep="ATIVO-D1203-21", out="ATIVO_D1203_21", fn="ATIVO-D1203-21_o_contra_que_vende.md", tit="O contra que vende", formato="pictograma-cinematografico", slot="21:00", trilha="T02",
   S=[("hook", "Quer que o cliente acredite no seu elogio? Comece pelo defeito.", "Quer que o cliente | acredite | no seu *elogio?* | Comece pelo *defeito.*"),
      ("tudo", "Se você diz que tudo é ótimo, nada é.", "Se você diz | que tudo é *ótimo,* | *nada é.*"),
      ("tudo", "O cliente desconfia e vai procurar o problema sozinho.", "O cliente *desconfia* | e vai procurar | o *problema* sozinho."),
      ("virada", "Agora imagine: antes de ele perceber, você mesmo mostra. A cozinha é pequena. Mas olha a luz da sala.", "Agora imagine: | antes de ele perceber, | você mesmo *mostra.* | A cozinha | é *pequena.* | Mas olha | a *luz* da sala."),
      ("vira", "O defeito dito por você vira informação. O mesmo defeito descoberto por ele vira desconfiança.", "O defeito dito por você | vira *informação.* | O mesmo defeito | descoberto por ele | vira *desconfiança.*"),
      ("vira", "E às vezes o certo é dizer: esse imóvel não é pra você.", "E às vezes | o certo é dizer: | esse imóvel | *não é pra você.*"),
      ("desfecho", "Quem fala o contra ganha o direito de ser acreditado no a favor.", "Quem fala o *contra* | ganha o direito | de ser *acreditado* | no a favor.")],
   M=[("h_elogio", 1, "elogio"), ("h_defeito", 1, "defeito"), ("t_otimo", 2, "ótimo"), ("t_nada", 2, "nada"), ("t_desconfia", 3, "desconfia"), ("t_problema", 3, "problema"),
      ("v_imagine", 4, "imagine"), ("v_mostra", 4, "mostra"), ("v_pequena", 4, "pequena"), ("v_luz", 4, "luz"), ("i_informacao", 5, "informação"), ("i_desconfianca", 5, "desconfiança"),
      ("i_certo", 6, "certo"), ("i_voce", 6, "você"), ("f_contra", 7, "contra"), ("f_acreditado", 7, "acreditado")],
   anc={"virada": "cue:v_imagine", "insight": "cue:i_informacao", "resolucao": "cue:f_contra"}, pron={}),
}
SFX = {"cartoon-explicativo": ["pop", "pop", "block", "impact", "pop", "click", "pop", "pop"], "planta-tecnica": ["pin", "tick", "click", "whoosh_fold", "pin", "tick", "shimmer"],
       "maquete-3d": ["pop", "pin", "tick", "whoosh_fold", "pin", "click", "shimmer"], "pictograma-cinematografico": ["swish", "pin", "hollow", "whoosh_fold", "pin", "impact", "shimmer"]}


def faz(k):
    d = EPS[k]
    L = L_auto(d["S"], d["M"])
    sons = SFX[d["formato"]]
    sfx = [fx(c, -0.05 if i % 3 == 0 else 0.0, sons[i % len(sons)], -28 + (i % 2), pitch=(i % 4) * 2 - 2) for i, (c, _, _) in enumerate(d["M"]) if i % 2 == 0]
    viradas = [c for c, _, _ in d["M"] if c.startswith("v_")]
    diag = dict(publico_situacao="corretor de imóveis", territorio="ver grade", funcao="C2 + C3", crenca_questionada="ver roteiro", hipotese="ver roteiro")
    apur = dict(fato="ver Parte A do roteiro", verificado_em="2026-11-24", fontes=[], ressalvas="ver roteiro")
    lead = {s[0]: 0.35 for s in d["S"][1:]}
    lead["cta"] = 0.3
    build(d["ep"], d["out"], "D1203", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
