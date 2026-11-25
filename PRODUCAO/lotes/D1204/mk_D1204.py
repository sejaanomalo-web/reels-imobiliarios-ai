"""Lote D1204 — grade PRODUCAO/grade/2026-12-04.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-04/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1204/mk_D1204.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-04"
ROT = "ROTEIROS/ESTEIRA/2026-12-04/"


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
 "08": dict(ep="ATIVO-D1204-08", out="ATIVO_D1204_08", fn="ATIVO-D1204-08_o_preco_da_ficha.md", tit="O preço da ficha", formato="planta-tecnica", slot="08:00", trilha="T01",
   S=[("hook", "E se um número na ficha mudasse quanto você acha que a casa vale?", "E se *um número* | na ficha | mudasse quanto você acha | que a casa *vale?*"),
      ("estudo", "Em 1987, pesquisadores levaram corretores para avaliar a mesma casa, com a mesma ficha. Só mudava um número: o preço pedido.", "Em *1987,* | pesquisadores levaram *corretores* | para avaliar | *a mesma casa,* | com a mesma ficha. | Só mudava um número: | o *preço pedido.*"),
      ("estudo", "Quem viu o preço mais alto avaliou a casa mais cara. Quem viu o mais baixo, mais barata.", "Quem viu o preço *mais alto* | avaliou a casa | *mais cara.* | Quem viu o *mais baixo,* | *mais barata.*"),
      ("virada", "E quase nenhum disse que usou aquele preço para decidir.", "E *quase nenhum* | disse que usou | aquele preço | para decidir."),
      ("conta", "Na sua avaliação, faça a conta antes de olhar o preço que o dono quer: vendidos da região, metragem, estado.", "Na sua avaliação, | faça a conta *antes* | de olhar o preço | que o dono quer: | *vendidos* da região, | *metragem,* | *estado.*"),
      ("desfecho", "Primeiro o seu número. Depois o dele. Senão, quem avalia é a ficha.", "Primeiro | o *seu número.* | Depois o dele. | Senão, | quem avalia | é a *ficha.*")],
   M=[("h_numero", 1, "número"), ("h_vale", 1, "vale"), ("e_1987", 2, "1987"), ("e_corretores", 2, "corretores"), ("e_mesma", 2, "mesma"), ("e_preco", 2, "preço"),
      ("e_alto", 3, "alto"), ("e_cara", 3, "cara"), ("e_baixo", 3, "baixo"), ("e_barata", 3, "barata"), ("v_nenhum", 4, "nenhum"), ("v_decidir", 4, "decidir"),
      ("c_antes", 5, "antes"), ("c_vendidos", 5, "vendidos"), ("c_metragem", 5, "metragem"), ("c_estado", 5, "estado"), ("f_seu", 6, "seu"), ("f_dele", 6, "dele"), ("f_ficha", 6, "ficha")],
   anc={"virada": "cue:v_nenhum", "insight": "cue:c_antes", "resolucao": "cue:f_seu"}, pron={"1987": "mil novecentos e oitenta e sete"}),
 "10": dict(ep="ATIVO-D1204-10", out="ATIVO_D1204_10", fn="ATIVO-D1204-10_o_cliente_sumiu.md", tit="O cliente sumiu depois da visita", formato="cartoon-explicativo", slot="10:00", trilha="T05",
   S=[("hook", "Visita boa, cliente animado. Dois dias depois, sumiu.", "Visita boa, | cliente *animado.* | Dois dias depois, | *sumiu.*"),
      ("mensagem", "Você manda: e aí, o que achou? Ele visualiza e não responde.", "Você manda: | e aí, | *o que achou?* | Ele *visualiza* | e não responde."),
      ("virada", "Pergunta aberta dá trabalho para quem já está cansado de decidir.", "Pergunta aberta | dá *trabalho* | para quem já está | *cansado* de decidir."),
      ("resumo", "No mesmo dia da visita, mande um resumo curto: o que ele gostou, o que não gostou e o que falta saber.", "No *mesmo dia* | da visita, | mande um *resumo* curto: | o que ele *gostou,* | o que *não gostou* | e o que *falta saber.*"),
      ("pergunta", "E termine com uma pergunta fácil: quer ver mais um parecido, ou esse continua no páreo?", "E termine | com uma pergunta *fácil:* | quer ver | mais um *parecido,* | ou esse continua | no *páreo?*"),
      ("desfecho", "O resumo mostra que você ouviu. E a pergunta de sim ou não cabe numa resposta rápida.", "O resumo mostra | que você *ouviu.* | E a pergunta | de *sim ou não* | cabe numa | resposta *rápida.*")],
   M=[("h_animado", 1, "animado"), ("h_sumiu", 1, "sumiu"), ("m_achou", 2, "achou"), ("m_visualiza", 2, "visualiza"), ("v_trabalho", 3, "trabalho"), ("v_cansado", 3, "cansado"),
      ("r_dia", 4, "dia"), ("r_resumo", 4, "resumo"), ("r_gostou", 4, "gostou"), ("r_nao", 4, "não"), ("r_falta", 4, "falta"),
      ("p_facil", 5, "fácil"), ("p_parecido", 5, "parecido"), ("p_pareo", 5, "páreo"), ("f_ouviu", 6, "ouviu"), ("f_sim", 6, "sim"), ("f_rapida", 6, "rápida")],
   anc={"virada": "cue:v_trabalho", "insight": "cue:r_resumo", "resolucao": "cue:f_ouviu"}, pron={}),
 "12": dict(ep="ATIVO-D1204-12", out="ATIVO_D1204_12", fn="ATIVO-D1204-12_a_toalha_do_hotel.md", tit="A toalha do hotel", formato="maquete-3d", slot="12:00", trilha="T03",
   S=[("hook", "Num hotel, mudaram uma frase no cartão da toalha. E mais hóspedes reutilizaram.", "Num *hotel,* | mudaram *uma frase* | no cartão da toalha. | E mais hóspedes | *reutilizaram.*"),
      ("teste", "O cartão comum pedia ajuda ao meio ambiente. Cerca de 35% reutilizavam.", "O cartão *comum* | pedia ajuda | ao meio ambiente. | Cerca de *35%* | reutilizavam."),
      ("teste", "O novo dizia: a maioria dos hóspedes reutiliza a toalha. Subiu para 44%.", "O *novo* dizia: | a *maioria* dos hóspedes | reutiliza a toalha. | Subiu para *44%.*"),
      ("virada", "E quando dizia que a maioria dos hóspedes daquele mesmo quarto reutilizava, funcionou ainda melhor.", "E quando dizia | que a maioria dos hóspedes | daquele *mesmo quarto* | reutilizava, | funcionou | *ainda melhor.*"),
      ("licao", "A gente segue gente parecida, num lugar parecido.", "A gente segue | *gente parecida,* | num *lugar parecido.*"),
      ("desfecho", "Com o cliente, conte o que famílias parecidas com a dele escolheram naquele bairro. Desde que seja verdade.", "Com o cliente, | conte o que *famílias parecidas* | com a dele | escolheram | naquele *bairro.* | Desde que | seja *verdade.*")],
   M=[("h_hotel", 1, "hotel"), ("h_frase", 1, "frase"), ("h_reutilizaram", 1, "reutilizaram"), ("t_comum", 2, "comum"), ("t_35", 2, "35"), ("t_novo", 3, "novo"), ("t_maioria", 3, "maioria"), ("t_44", 3, "44"),
      ("v_quarto", 4, "quarto"), ("v_melhor", 4, "melhor"), ("l_gente", 5, "gente"), ("l_lugar", 5, "lugar"), ("f_familias", 6, "famílias"), ("f_bairro", 6, "bairro"), ("f_verdade", 6, "verdade")],
   anc={"virada": "cue:v_quarto", "insight": "cue:l_gente", "resolucao": "cue:f_familias"}, pron={"35%": "trinta e cinco por cento", "44%": "quarenta e quatro por cento"}),
 "15": dict(ep="ATIVO-D1204-15", out="ATIVO_D1204_15", fn="ATIVO-D1204-15_imagine_que_deu_errado.md", tit="Imagine que deu errado", formato="pictograma-cinematografico", slot="15:00", trilha="T04",
   S=[("hook", "Antes de o cliente assinar, faça uma pergunta estranha.", "Antes de o cliente | *assinar,* | faça uma pergunta | *estranha.*"),
      ("pergunta", "Imagine que já passou um ano e você se arrependeu dessa compra. O que deu errado?", "Imagine | que já passou *um ano* | e você se *arrependeu* | dessa compra. | O que *deu errado?*"),
      ("virada", "Parece pessimismo. Mas um estudo de 1989 viu que imaginar que algo já aconteceu ajuda a apontar cerca de 30% mais motivos.", "Parece *pessimismo.* | Mas um estudo de *1989* | viu que imaginar | que algo *já aconteceu* | ajuda a apontar | cerca de *30%* | mais motivos."),
      ("motivos", "O cliente fala do barulho da rua, da parcela apertada, da escola longe.", "O cliente fala | do *barulho* da rua, | da *parcela* apertada, | da *escola* longe."),
      ("resolve", "E você resolve agora, antes da caneta, e não depois da chave na mão.", "E você *resolve* agora, | *antes da caneta,* | e não depois | da chave na mão."),
      ("desfecho", "Dúvida que aparece antes da assinatura tem solução. Depois, vira arrependimento.", "Dúvida que aparece | antes da assinatura | tem *solução.* | Depois, | vira *arrependimento.*")],
   M=[("h_assinar", 1, "assinar"), ("h_estranha", 1, "estranha"), ("q_ano", 2, "ano"), ("q_arrependeu", 2, "arrependeu"), ("q_errado", 2, "errado"), ("v_pessimismo", 3, "pessimismo"), ("v_1989", 3, "1989"),
      ("v_aconteceu", 3, "aconteceu"), ("v_30", 3, "30"), ("m_barulho", 4, "barulho"), ("m_parcela", 4, "parcela"), ("m_escola", 4, "escola"), ("r_resolve", 5, "resolve"), ("r_caneta", 5, "caneta"), ("r_chave", 5, "chave"),
      ("f_solucao", 6, "solução"), ("f_arrependimento", 6, "arrependimento")],
   anc={"virada": "cue:v_pessimismo", "insight": "cue:m_barulho", "resolucao": "cue:f_solucao"}, pron={"1989": "mil novecentos e oitenta e nove", "30%": "trinta por cento"}),
 "18": dict(ep="ATIVO-D1204-18", out="ATIVO_D1204_18", fn="ATIVO-D1204-18_o_letreiro_era_um_anuncio.md", tit="O letreiro era um anúncio", formato="planta-tecnica", slot="18:00", trilha="T02",
   S=[("hook", "O letreiro mais famoso de Los Angeles começou como anúncio de imóvel.", "O *letreiro* | mais famoso | de Los Angeles | começou como | *anúncio de imóvel.*"),
      ("loteamento", "Em 1923, um loteamento nas colinas de Hollywood pôs letras gigantes na encosta com o próprio nome. Era provisório.", "Em *1923,* | um *loteamento* | nas colinas de Hollywood | pôs *letras gigantes* | na encosta | com o próprio nome. | Era *provisório.*"),
      ("lugar", "Ele não anunciava uma casa. Anunciava o lugar: as colinas, a vista, o jeito de morar.", "Ele não anunciava | *uma casa.* | Anunciava *o lugar:* | as *colinas,* | a *vista,* | o *jeito de morar.*"),
      ("virada", "Em 1949, tiraram as quatro últimas letras, LAND. O anúncio virou o nome do bairro e, depois, o símbolo da cidade.", "Em *1949,* | tiraram | as quatro últimas letras, | *LAND.* | O anúncio virou | o nome do *bairro* | e, depois, | o *símbolo* da cidade."),
      ("licao", "Quem compra um imóvel também compra a rua, a padaria, o caminho de volta para casa.", "Quem compra um imóvel | também compra | a *rua,* | a *padaria,* | o *caminho* | de volta para casa."),
      ("desfecho", "No seu anúncio, mostre o lugar, não só a planta.", "No seu anúncio, | mostre *o lugar,* | não só | a *planta.*")],
   M=[("h_letreiro", 1, "letreiro"), ("h_anuncio", 1, "anúncio"), ("l_1923", 2, "1923"), ("l_loteamento", 2, "loteamento"), ("l_letras", 2, "letras"), ("l_provisorio", 2, "provisório"),
      ("u_casa", 3, "casa"), ("u_lugar", 3, "lugar"), ("u_colinas", 3, "colinas"), ("u_vista", 3, "vista"), ("u_jeito", 3, "jeito"), ("v_1949", 4, "1949"), ("v_land", 4, "LAND"), ("v_bairro", 4, "bairro"), ("v_simbolo", 4, "símbolo"),
      ("c_rua", 5, "rua"), ("c_padaria", 5, "padaria"), ("c_caminho", 5, "caminho"), ("f_lugar", 6, "lugar"), ("f_planta", 6, "planta")],
   anc={"virada": "cue:v_1949", "insight": "cue:c_rua", "resolucao": "cue:f_lugar"}, pron={"1923": "mil novecentos e vinte e três", "1949": "mil novecentos e quarenta e nove", "LAND": "lénd"}),
 "21": dict(ep="ATIVO-D1204-21", out="ATIVO_D1204_21", fn="ATIVO-D1204-21_o_fim_da_visita.md", tit="O fim da visita", formato="pictograma-cinematografico", slot="21:00", trilha="T01",
   S=[("hook", "A ordem dos cômodos muda a lembrança que o cliente leva da visita.", "A *ordem dos cômodos* | muda a *lembrança* | que o cliente leva | da visita."),
      ("agua", "Em 1993, pesquisadores pediram para as pessoas colocarem a mão em água gelada por um minuto.", "Em *1993,* | pesquisadores pediram | para as pessoas | colocarem a mão | em *água gelada* | por *um minuto.*"),
      ("agua", "Na outra vez, um minuto e meio, mas nos últimos trinta segundos a água esquentava um pouco.", "Na outra vez, | *um minuto e meio,* | mas nos últimos | trinta segundos | a água *esquentava* | um pouco."),
      ("virada", "A mais longa foi lembrada como menos ruim. O final pesou mais do que a duração.", "A mais longa | foi lembrada | como *menos ruim.* | O *final* pesou mais | do que a duração."),
      ("visita", "Na visita, o cliente leva para casa o último cômodo que viu.", "Na visita, | o cliente leva para casa | o *último cômodo* | que viu."),
      ("desfecho", "Termine no melhor ponto do imóvel, não na área de serviço.", "Termine | no *melhor ponto* | do imóvel, | não na | *área de serviço.*")],
   M=[("h_ordem", 1, "ordem"), ("h_lembranca", 1, "lembrança"), ("a_1993", 2, "1993"), ("a_gelada", 2, "gelada"), ("a_minuto", 2, "minuto"), ("a_meio", 3, "meio"), ("a_esquentava", 3, "esquentava"),
      ("v_ruim", 4, "ruim"), ("v_final", 4, "final"), ("v_duracao", 4, "duração"), ("i_ultimo", 5, "último"), ("f_melhor", 6, "melhor"), ("f_servico", 6, "serviço")],
   anc={"virada": "cue:v_ruim", "insight": "cue:i_ultimo", "resolucao": "cue:f_melhor"}, pron={"1993": "mil novecentos e noventa e três"}),
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
    build(d["ep"], d["out"], "D1204", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
