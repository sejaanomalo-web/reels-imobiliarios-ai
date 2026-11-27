"""Lote D1213 — grade PRODUCAO/grade/2026-12-13.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-13/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1213/mk_D1213.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-13"
ROT = "ROTEIROS/ESTEIRA/2026-12-13/"


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
 "08": dict(ep="ATIVO-D1213-08", out="ATIVO_D1213_08", fn="ATIVO-D1213-08_o_sinal_e_a_desistencia.md", tit="O sinal e a desistência", formato="planta-tecnica", slot="08:00", trilha="T03",
   S=[("hook", "E se o vendedor desistir da venda depois de receber o sinal?", "E se o *vendedor* | desistir da venda | depois de receber | o *sinal?*"),
      ("recebeu", "O Código Civil já responde: quem recebeu e não cumpre devolve o sinal e mais o equivalente.", "O *Código Civil* | já responde: | quem *recebeu* | e não cumpre | *devolve* o sinal | e mais o *equivalente.*"),
      ("pagou", "E se quem pagou desiste, perde o sinal.", "E se quem *pagou* | desiste, | *perde* o sinal."),
      ("virada", "Se o contrato prevê o direito de se arrepender, o sinal vira só o preço da desistência.", "Se o contrato prevê | o direito | de se *arrepender,* | o sinal vira | só o *preço* | da desistência."),
      ("acao", "Antes de receber qualquer sinal, deixe escrito: o valor, para que ele serve e se existe arrependimento.", "Antes de receber | qualquer sinal, | deixe *escrito:* | o *valor,* | para que ele *serve* | e se existe | *arrependimento.*"),
      ("desfecho", "Sinal sem papel vira briga. Sinal escrito vira compromisso.", "Sinal sem papel | vira *briga.* | Sinal escrito | vira *compromisso.*")],
   M=[("h_vendedor", 1, "vendedor"), ("h_sinal", 1, "sinal"), ("r_codigo", 2, "Código"), ("r_recebeu", 2, "recebeu"), ("r_devolve", 2, "devolve"), ("r_equivalente", 2, "equivalente"), ("p_pagou", 3, "pagou"), ("p_perde", 3, "perde"),
      ("v_arrepender", 4, "arrepender"), ("v_preco", 4, "preço"), ("a_escrito", 5, "escrito"), ("a_valor", 5, "valor"), ("a_serve", 5, "serve"), ("a_arrependimento", 5, "arrependimento"), ("f_briga", 6, "briga"), ("f_compromisso", 6, "compromisso")],
   anc={"virada": "cue:v_arrepender", "insight": "cue:a_escrito", "resolucao": "cue:f_compromisso"}, pron={}),
 "10": dict(ep="ATIVO-D1213-10", out="ATIVO_D1213_10", fn="ATIVO-D1213-10_o_link_do_concorrente.md", tit="O link do concorrente", formato="cartoon-explicativo", slot="10:00", trilha="T01",
   S=[("hook", "O cliente manda o link de um imóvel anunciado por outro corretor.", "O cliente manda | o *link* de um imóvel | anunciado por | *outro corretor.*"),
      ("impulso", "A vontade é ignorar ou apontar defeito no anúncio.", "A vontade é *ignorar* | ou apontar *defeito* | no anúncio."),
      ("pista", "Mas esse link diz exatamente o que ele procura.", "Mas esse link | diz *exatamente* | o que ele *procura.*"),
      ("virada", "O anúncio do concorrente é a melhor pista do seu cliente.", "O anúncio | do *concorrente* | é a melhor *pista* | do seu cliente."),
      ("acao", "Pergunte o que chamou a atenção nele e use isso para filtrar as suas opções.", "*Pergunte* | o que chamou | a *atenção* nele | e use isso | para *filtrar* | as suas opções."),
      ("desfecho", "Quem compara junto vira o corretor de confiança.", "Quem *compara junto* | vira o corretor | de *confiança.*")],
   M=[("h_link", 1, "link"), ("h_outro", 1, "outro"), ("i_ignorar", 2, "ignorar"), ("i_defeito", 2, "defeito"), ("p_exatamente", 3, "exatamente"), ("p_procura", 3, "procura"),
      ("v_concorrente", 4, "concorrente"), ("v_pista", 4, "pista"), ("a_pergunte", 5, "Pergunte"), ("a_atencao", 5, "atenção"), ("a_filtrar", 5, "filtrar"), ("f_compara", 6, "compara"), ("f_confianca", 6, "confiança")],
   anc={"virada": "cue:v_concorrente", "insight": "cue:a_pergunte", "resolucao": "cue:f_confianca"}, pron={}),
 "12": dict(ep="ATIVO-D1213-12", out="ATIVO_D1213_12", fn="ATIVO-D1213-12_a_cabine_esteril.md", tit="A cabine estéril", formato="pictograma-cinematografico", slot="12:00", trilha="T04",
   S=[("hook", "Na decolagem e no pouso, o piloto não pode conversar sobre nada que não seja o voo.", "Na *decolagem* | e no *pouso,* | o piloto não pode | *conversar* | sobre nada | que não seja o *voo.*"),
      ("regra", "É uma regra americana de 1981: abaixo de dez mil pés, só o essencial na cabine.", "É uma regra | americana de *1981:* | abaixo de | *dez mil pés,* | só o *essencial* | na cabine."),
      ("porque", "Porque é nesses minutos que uma distração custa mais caro.", "Porque é | nesses *minutos* | que uma *distração* | custa mais caro."),
      ("virada", "A venda também tem fase crítica.", "A venda também | tem *fase crítica.*"),
      ("acao", "Na visita decisiva, na proposta e na assinatura: celular no silencioso e só o assunto do cliente.", "Na *visita* decisiva, | na *proposta* | e na *assinatura:* | celular no *silencioso* | e só o assunto | do cliente."),
      ("desfecho", "Nos minutos que decidem, só o essencial.", "Nos minutos | que *decidem,* | só o *essencial.*")],
   M=[("h_decolagem", 1, "decolagem"), ("h_pouso", 1, "pouso"), ("h_conversar", 1, "conversar"), ("h_voo", 1, "voo"), ("r_1981", 2, "1981"), ("r_dez", 2, "dez"), ("r_essencial", 2, "essencial"), ("p_minutos", 3, "minutos"), ("p_distracao", 3, "distração"),
      ("v_fase", 4, "fase"), ("a_visita", 5, "visita"), ("a_proposta", 5, "proposta"), ("a_assinatura", 5, "assinatura"), ("a_silencioso", 5, "silencioso"), ("f_decidem", 6, "decidem"), ("f_essencial", 6, "essencial")],
   anc={"virada": "cue:v_fase", "insight": "cue:a_visita", "resolucao": "cue:f_essencial"}, pron={"1981": "mil novecentos e oitenta e um"}),
 "15": dict(ep="ATIVO-D1213-15", out="ATIVO_D1213_15", fn="ATIVO-D1213-15_o_proximo_passo_com_data.md", tit="O próximo passo com data", formato="cartoon-explicativo", slot="15:00", trilha="T03",
   S=[("hook", "Toda conversa com cliente deveria terminar com uma data.", "Toda *conversa* | com cliente | deveria terminar | com uma *data.*"),
      ("estudo", "Em 1997, pesquisadores pediram a estudantes um relatório para entregar depois do Natal.", "Em *1997,* | pesquisadores pediram | a estudantes | um *relatório* | para entregar | depois do *Natal.*"),
      ("resultado", "Quem anotou quando e onde ia escrever entregou mais que o dobro de quem não anotou.", "Quem *anotou* | quando e onde | ia escrever | entregou | mais que o *dobro* | de quem não anotou."),
      ("virada", "Depois a gente vê não é combinado.", "*Depois a gente vê* | não é *combinado.*"),
      ("acao", "Antes de encerrar, marque o próximo passo: o dia, a hora e o que vai acontecer.", "Antes de encerrar, | marque o *próximo passo:* | o *dia,* | a *hora* | e o que | vai *acontecer.*"),
      ("desfecho", "Próximo passo com data acontece. Sem data, esfria.", "Próximo passo | com data | *acontece.* | Sem data, | *esfria.*")],
   M=[("h_conversa", 1, "conversa"), ("h_data", 1, "data"), ("e_1997", 2, "1997"), ("e_relatorio", 2, "relatório"), ("e_natal", 2, "Natal"), ("r_anotou", 3, "anotou"), ("r_dobro", 3, "dobro"),
      ("v_depois", 4, "Depois"), ("v_combinado", 4, "combinado"), ("a_proximo", 5, "próximo"), ("a_dia", 5, "dia"), ("a_hora", 5, "hora"), ("a_acontecer", 5, "acontecer"), ("f_acontece", 6, "acontece"), ("f_esfria", 6, "esfria")],
   anc={"virada": "cue:v_depois", "insight": "cue:a_proximo", "resolucao": "cue:f_esfria"}, pron={"1997": "mil novecentos e noventa e sete"}),
 "18": dict(ep="ATIVO-D1213-18", out="ATIVO_D1213_18", fn="ATIVO-D1213-18_a_sombra_que_mudou_a_cidade.md", tit="A sombra que mudou a cidade", formato="maquete-3d", slot="18:00", trilha="T02",
   S=[("hook", "Em 1915, um prédio em Nova York fez tanta sombra que a cidade mudou as regras.", "Em *1915,* | um prédio em *Nova York* | fez tanta *sombra* | que a cidade | mudou as *regras.*"),
      ("paredao", "Era um paredão de quase quarenta andares, sem recuo, e as ruas em volta perderam o sol.", "Era um *paredão* | de quase | *quarenta andares,* | sem recuo, | e as ruas em volta | perderam o *sol.*"),
      ("lei", "No ano seguinte, veio a primeira lei de zoneamento da cidade, com recuos para a luz chegar à rua.", "No ano seguinte, | veio a primeira | lei de *zoneamento* | da cidade, | com *recuos* | para a luz | chegar à rua."),
      ("virada", "Os vizinhos tinham comprado luz. E perderam por causa do terreno ao lado.", "Os vizinhos | tinham comprado *luz.* | E *perderam* | por causa | do terreno ao lado."),
      ("acao", "Antes de vender a vista ou o sol, confira o que a lei permite construir no terreno vizinho.", "Antes de vender | a *vista* ou o sol, | *confira* | o que a lei | permite *construir* | no terreno *vizinho.*"),
      ("desfecho", "O que pode subir ao lado também faz parte do imóvel.", "O que pode *subir* | ao lado | também faz *parte* | do imóvel.")],
   M=[("h_1915", 1, "1915"), ("h_sombra", 1, "sombra"), ("h_regras", 1, "regras"), ("p_paredao", 2, "paredão"), ("p_quarenta", 2, "quarenta"), ("p_sol", 2, "sol"), ("l_zoneamento", 3, "zoneamento"), ("l_recuos", 3, "recuos"), ("l_luz", 3, "luz"),
      ("v_luz", 4, "luz"), ("v_perderam", 4, "perderam"), ("a_vista", 5, "vista"), ("a_confira", 5, "confira"), ("a_construir", 5, "construir"), ("a_vizinho", 5, "vizinho"), ("f_subir", 6, "subir"), ("f_parte", 6, "parte")],
   anc={"virada": "cue:v_luz", "insight": "cue:a_confira", "resolucao": "cue:f_parte"}, pron={"1915": "mil novecentos e quinze"}),
 "21": dict(ep="ATIVO-D1213-21", out="ATIVO_D1213_21", fn="ATIVO-D1213-21_a_visita_que_nao_cabe_no_bolso.md", tit="A visita que não cabe no bolso", formato="pictograma-cinematografico", slot="21:00", trilha="T04",
   S=[("hook", "O cliente amou o apartamento. Aí veio a simulação do financiamento.", "O cliente *amou* | o apartamento. | Aí veio | a *simulação* | do financiamento."),
      ("frustra", "A parcela não coube, e o sonho virou frustração.", "A *parcela* | não coube, | e o sonho | virou *frustração.*"),
      ("compara", "Pior: agora tudo que cabe no bolso parece pior do que aquele.", "*Pior:* | agora tudo | que cabe no bolso | parece *pior* | do que aquele."),
      ("virada", "A simulação tem que vir antes da visita, não depois.", "A simulação | tem que vir | *antes* da visita, | não *depois.*"),
      ("acao", "No primeiro contato, simule com o cliente: a renda, a entrada e a parcela que cabe.", "No *primeiro contato,* | simule com o cliente: | a *renda,* | a *entrada* | e a *parcela* | que cabe."),
      ("desfecho", "Quem visita dentro do orçamento se apaixona pelo imóvel certo.", "Quem visita | dentro do *orçamento* | se apaixona | pelo imóvel *certo.*")],
   M=[("h_amou", 1, "amou"), ("h_simulacao", 1, "simulação"), ("f_parcela", 2, "parcela"), ("f_frustracao", 2, "frustração"), ("c_pior", 3, "Pior"), ("c_aquele", 3, "aquele"),
      ("v_antes", 4, "antes"), ("v_depois", 4, "depois"), ("a_contato", 5, "contato"), ("a_renda", 5, "renda"), ("a_entrada", 5, "entrada"), ("a_parcela", 5, "parcela"), ("d_orcamento", 6, "orçamento"), ("d_certo", 6, "certo")],
   anc={"virada": "cue:v_antes", "insight": "cue:a_contato", "resolucao": "cue:d_certo"}, pron={}),
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
    build(d["ep"], d["out"], "D1213", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
