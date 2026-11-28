"""Lote D1215 — grade PRODUCAO/grade/2026-12-15.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-15/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1215/mk_D1215.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-15"
ROT = "ROTEIROS/ESTEIRA/2026-12-15/"


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
 "08": dict(ep="ATIVO-D1215-08", out="ATIVO_D1215_08", fn="ATIVO-D1215-08_a_vistoria_antes_de_assinar.md", tit="A vistoria antes de assinar", formato="maquete-3d", slot="08:00", trilha="T04",
   S=[("hook", "E se o comprador pudesse desistir da compra depois de ver o laudo da vistoria?", "E se o comprador | pudesse *desistir* | da compra | depois de ver | o *laudo* | da *vistoria?*"),
      ("eua", "Nos Estados Unidos, isso é comum: o contrato costuma dar de sete a dez dias para a inspeção da casa.", "Nos *Estados Unidos,* | isso é *comum:* | o contrato | costuma dar | de *sete a dez dias* | para a *inspeção* | da casa."),
      ("problema", "Se a inspeção encontra problema, o comprador negocia ou desiste do negócio.", "Se a inspeção | encontra *problema,* | o comprador *negocia* | ou *desiste* | do negócio."),
      ("virada", "Aqui não é regra, mas pode ser combinado.", "Aqui não é *regra,* | mas pode ser | *combinado.*"),
      ("acao", "Na proposta, escreva o prazo para a vistoria técnica e o que acontece se ela encontrar problema.", "Na *proposta,* | escreva o *prazo* | para a vistoria técnica | e o que *acontece* | se ela encontrar | problema."),
      ("desfecho", "Problema achado antes da assinatura é negociação. Depois, vira briga.", "Problema achado | *antes* da assinatura | é *negociação.* | Depois, | vira *briga.*")],
   M=[("h_desistir", 1, "desistir"), ("h_laudo", 1, "laudo"), ("h_vistoria", 1, "vistoria"), ("e_eua", 2, "Estados"), ("e_sete", 2, "sete"), ("e_inspecao", 2, "inspeção"), ("p_problema", 3, "problema"), ("p_negocia", 3, "negocia"), ("p_desiste", 3, "desiste"),
      ("v_regra", 4, "regra"), ("v_combinado", 4, "combinado"), ("a_proposta", 5, "proposta"), ("a_prazo", 5, "prazo"), ("a_acontece", 5, "acontece"), ("d_antes", 6, "antes"), ("d_negociacao", 6, "negociação"), ("d_briga", 6, "briga")],
   anc={"virada": "cue:v_combinado", "insight": "cue:a_proposta", "resolucao": "cue:d_briga"}, pron={}),
 "10": dict(ep="ATIVO-D1215-10", out="ATIVO_D1215_10", fn="ATIVO-D1215-10_a_crianca_na_visita.md", tit="A criança na visita", formato="cartoon-explicativo", slot="10:00", trilha="T01",
   S=[("hook", "A visita estava indo bem, até a criança começar a correr pela casa.", "A visita | estava indo *bem,* | até a *criança* | começar a *correr* | pela casa."),
      ("pais", "Os pais passam a visita cuidando do filho e não olham o imóvel.", "Os *pais* | passam a visita | *cuidando* do filho | e não *olham* o imóvel."),
      ("esquecem", "E saem sem lembrar da cozinha nem do quarto.", "E saem | sem lembrar | da *cozinha* | nem do *quarto.*"),
      ("virada", "A criança também precisa de uma tarefa na visita.", "A criança também | precisa de uma *tarefa* | na visita."),
      ("acao", "Leve papel e lápis e peça para ela desenhar como seria o quarto dela.", "Leve *papel* e *lápis* | e peça para ela | *desenhar* | como seria | o *quarto dela.*"),
      ("desfecho", "Criança ocupada, pais atentos, e o quarto já tem dono.", "Criança *ocupada,* | pais *atentos,* | e o quarto | já tem *dono.*")],
   M=[("h_bem", 1, "bem"), ("h_crianca", 1, "criança"), ("h_correr", 1, "correr"), ("p_pais", 2, "pais"), ("p_cuidando", 2, "cuidando"), ("p_olham", 2, "olham"), ("e_cozinha", 3, "cozinha"), ("e_quarto", 3, "quarto"),
      ("v_tarefa", 4, "tarefa"), ("a_papel", 5, "papel"), ("a_lapis", 5, "lápis"), ("a_desenhar", 5, "desenhar"), ("a_quarto", 5, "quarto"), ("d_ocupada", 6, "ocupada"), ("d_atentos", 6, "atentos"), ("d_dono", 6, "dono")],
   anc={"virada": "cue:v_tarefa", "insight": "cue:a_papel", "resolucao": "cue:d_dono"}, pron={}),
 "12": dict(ep="ATIVO-D1215-12", out="ATIVO_D1215_12", fn="ATIVO-D1215-12_o_que_ja_vem_marcado.md", tit="O que já vem marcado", formato="planta-tecnica", slot="12:00", trilha="T03",
   S=[("hook", "Num experimento de 2003, a mesma pergunta teve quase o dobro de sim só por causa do que já vinha marcado.", "Num experimento | de *2003,* | a mesma pergunta | teve quase o *dobro* de sim | só por causa | do que já vinha *marcado.*"),
      ("optin", "Quem precisava marcar para ser doador de órgãos: quarenta e dois por cento aceitaram.", "Quem precisava *marcar* | para ser doador | de órgãos: | *quarenta e dois por cento* | aceitaram."),
      ("optout", "Quem já vinha marcado e só podia desmarcar: oitenta e dois por cento ficaram.", "Quem já vinha marcado | e só podia *desmarcar:* | *oitenta e dois por cento* | ficaram."),
      ("virada", "As pessoas tendem a aceitar o que já vem pronto.", "As pessoas | tendem a *aceitar* | o que já vem | *pronto.*"),
      ("acao", "Mande ao proprietário o cadastro do imóvel já preenchido com o que você sabe, para ele só conferir e corrigir.", "Mande ao proprietário | o *cadastro* do imóvel | já *preenchido* | com o que você sabe, | para ele só | *conferir* e *corrigir.*"),
      ("desfecho", "Formulário em branco fica para depois. Formulário pronto volta.", "Formulário *em branco* | fica para depois. | Formulário *pronto* | *volta.*")],
   M=[("h_2003", 1, "2003"), ("h_dobro", 1, "dobro"), ("h_marcado", 1, "marcado"), ("i_marcar", 2, "marcar"), ("i_quarenta", 2, "quarenta"), ("i_aceitaram", 2, "aceitaram"), ("o_desmarcar", 3, "desmarcar"), ("o_oitenta", 3, "oitenta"), ("o_ficaram", 3, "ficaram"),
      ("v_aceitar", 4, "aceitar"), ("v_pronto", 4, "pronto"), ("a_cadastro", 5, "cadastro"), ("a_preenchido", 5, "preenchido"), ("a_conferir", 5, "conferir"), ("a_corrigir", 5, "corrigir"), ("d_branco", 6, "branco"), ("d_volta", 6, "volta")],
   anc={"virada": "cue:v_aceitar", "insight": "cue:a_cadastro", "resolucao": "cue:d_volta"}, pron={"2003": "dois mil e três"}),
 "15": dict(ep="ATIVO-D1215-15", out="ATIVO_D1215_15", fn="ATIVO-D1215-15_o_que_observar_na_visita.md", tit="O que observar na visita", formato="pictograma-cinematografico", slot="15:00", trilha="T02",
   S=[("hook", "O cliente saiu da visita e só lembrava da cor da parede.", "O cliente | saiu da visita | e só lembrava | da *cor da parede.*"),
      ("atencao", "Sem saber o que olhar, ele olha o que chama atenção, não o que importa.", "Sem saber | o que *olhar,* | ele olha | o que chama *atenção,* | não o que *importa.*"),
      ("gosto", "E a decisão vira gosto, não critério.", "E a decisão | vira *gosto,* | não *critério.*"),
      ("virada", "Visita boa começa antes de chegar.", "Visita boa | começa *antes* | de chegar."),
      ("acao", "Na véspera, mande três coisas para ele observar: a luz da sala, o barulho da rua e o espaço da cozinha.", "Na *véspera,* | mande *três coisas* | para ele observar: | a *luz* da sala, | o *barulho* da rua | e o *espaço* da cozinha."),
      ("desfecho", "Quem sabe o que procurar enxerga o imóvel certo.", "Quem sabe | o que *procurar* | enxerga | o imóvel *certo.*")],
   M=[("h_cliente", 1, "cliente"), ("h_cor", 1, "cor"), ("h_parede", 1, "parede"), ("t_olhar", 2, "olhar"), ("t_atencao", 2, "atenção"), ("t_importa", 2, "importa"), ("g_gosto", 3, "gosto"), ("g_criterio", 3, "critério"),
      ("v_antes", 4, "antes"), ("a_vespera", 5, "véspera"), ("a_tres", 5, "três"), ("a_luz", 5, "luz"), ("a_barulho", 5, "barulho"), ("a_espaco", 5, "espaço"), ("d_procurar", 6, "procurar"), ("d_certo", 6, "certo")],
   anc={"virada": "cue:v_antes", "insight": "cue:a_vespera", "resolucao": "cue:d_certo"}, pron={}),
 "18": dict(ep="ATIVO-D1215-18", out="ATIVO_D1215_18", fn="ATIVO-D1215-18_a_ideia_em_uma_frase.md", tit="A ideia em uma frase", formato="planta-tecnica", slot="18:00", trilha="T03",
   S=[("hook", "O projeto de Brasília foi entregue ao concurso com rabiscos a lápis de cor.", "O projeto | de *Brasília* | foi entregue ao concurso | com *rabiscos* | a *lápis de cor.*"),
      ("entrega", "Era 1957: poucos desenhos, um texto batido à máquina, e o autor ainda pediu desculpas pela apresentação simples.", "Era *1957:* | poucos *desenhos,* | um texto | batido à *máquina,* | e o autor ainda | pediu *desculpas* | pela apresentação simples."),
      ("eixos", "Mas a ideia cabia numa frase: dois eixos que se cruzam.", "Mas a ideia | cabia numa *frase:* | dois *eixos* | que se *cruzam.*"),
      ("virada", "Antes da lista de detalhes, vem uma ideia clara.", "Antes da lista | de *detalhes,* | vem uma | ideia *clara.*"),
      ("acao", "Antes de anunciar, escreva a frase do imóvel: para quem ele é e por quê.", "Antes de anunciar, | escreva a *frase* | do imóvel: | para *quem* ele é | e *por quê.*"),
      ("desfecho", "Quem entende a ideia lembra do imóvel.", "Quem *entende* | a ideia | *lembra* | do imóvel.")],
   M=[("h_brasilia", 1, "Brasília"), ("h_rabiscos", 1, "rabiscos"), ("h_lapis", 1, "lápis"), ("e_1957", 2, "1957"), ("e_desenhos", 2, "desenhos"), ("e_maquina", 2, "máquina"), ("e_desculpas", 2, "desculpas"), ("x_frase", 3, "frase"), ("x_eixos", 3, "eixos"), ("x_cruzam", 3, "cruzam"),
      ("v_detalhes", 4, "detalhes"), ("v_clara", 4, "clara"), ("a_frase", 5, "frase"), ("a_quem", 5, "quem"), ("a_porque", 5, "quê"), ("d_entende", 6, "entende"), ("d_lembra", 6, "lembra")],
   anc={"virada": "cue:v_clara", "insight": "cue:a_frase", "resolucao": "cue:d_lembra"}, pron={"1957": "mil novecentos e cinquenta e sete"}),
 "21": dict(ep="ATIVO-D1215-21", out="ATIVO_D1215_21", fn="ATIVO-D1215-21_o_cliente_que_nao_apareceu.md", tit="O cliente que não apareceu", formato="cartoon-explicativo", slot="21:00", trilha="T01",
   S=[("hook", "Você chegou, abriu o imóvel, e o cliente não apareceu.", "Você *chegou,* | *abriu* o imóvel, | e o cliente | *não apareceu.*"),
      ("motivo", "Quase sempre não é maldade: ele esqueceu, ou o dia dele mudou.", "Quase sempre | não é *maldade:* | ele *esqueceu,* | ou o dia dele | *mudou.*"),
      ("estudo", "Na saúde, uma revisão de estudos mostrou que lembretes reduzem as faltas em cerca de um quarto.", "Na *saúde,* | uma revisão de estudos | mostrou que *lembretes* | reduzem as *faltas* | em cerca de | *um quarto.*"),
      ("virada", "Visita marcada precisa de lembrete.", "Visita marcada | precisa de *lembrete.*"),
      ("acao", "Confirme na véspera e duas horas antes, com uma pergunta que pede resposta: posso te esperar às dez?", "*Confirme* na véspera | e *duas horas antes,* | com uma pergunta | que pede *resposta:* | posso te *esperar* | às dez?"),
      ("desfecho", "Visita confirmada é visita que acontece.", "Visita *confirmada* | é visita | que *acontece.*")],
   M=[("h_chegou", 1, "chegou"), ("h_abriu", 1, "abriu"), ("h_apareceu", 1, "apareceu"), ("m_maldade", 2, "maldade"), ("m_esqueceu", 2, "esqueceu"), ("m_mudou", 2, "mudou"), ("e_saude", 3, "saúde"), ("e_lembretes", 3, "lembretes"), ("e_faltas", 3, "faltas"), ("e_quarto", 3, "quarto"),
      ("v_lembrete", 4, "lembrete"), ("a_confirme", 5, "Confirme"), ("a_duas", 5, "duas"), ("a_resposta", 5, "resposta"), ("a_esperar", 5, "esperar"), ("d_confirmada", 6, "confirmada"), ("d_acontece", 6, "acontece")],
   anc={"virada": "cue:v_lembrete", "insight": "cue:a_confirme", "resolucao": "cue:d_acontece"}, pron={}),
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
    apur = dict(fato="ver Parte A do roteiro", verificado_em="2026-11-26", fontes=[], ressalvas="ver roteiro")
    lead = {s[0]: 0.35 for s in d["S"][1:]}
    lead["cta"] = 0.3
    build(d["ep"], d["out"], "D1215", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
