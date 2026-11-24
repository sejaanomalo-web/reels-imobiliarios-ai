"""Lote D1202 — grade PRODUCAO/grade/2026-12-02.json (6 slots: 08h, 10h, 12h, 15h, 18h, 21h).
Roteiros aprovados por delegação do cliente (24/11/2026) em ROTEIROS/ESTEIRA/2026-12-02/, CTA curta vigente.
Uso (a partir de PRODUCAO/): python3 lotes/D1202/mk_D1202.py [08|10|12|15|18|21 ...]
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-02"
ROT = "ROTEIROS/ESTEIRA/2026-12-02/"


def ajusta(ep_id, pron=None):
    p = os.path.join("episodes", ep_id, "episode.json")
    e = json.load(open(p))
    if pron:
        e["pronunciation"].update(pron)
    json.dump(e, open(p, "w"), ensure_ascii=False, indent=1)


def prog(a, b, c):
    return [{"at": 0, "notes": [26, 38, 45, 50, 54], "root": 38, "dens": 1, "bright": 0.5, "label": "abertura"},
            {"at": f"cue:{a}", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.55, "label": "desenvolvimento"},
            {"at": f"cue:{b}", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.45, "label": "virada"},
            {"at": f"cue:{c}", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.6, "label": "desfecho"}]


def ep08():
    S = [
        ("hook", "A primeira parcela do décimo terceiro caiu até segunda-feira.", "A primeira *parcela* | do *décimo terceiro* | caiu até | *segunda-feira.*"),
        ("conta", "E o seu cliente vai perguntar se dá para usar na entrada do imóvel.", "E o seu cliente | vai perguntar | se dá para usar | na *entrada* | do imóvel."),
        ("conta", "Às vezes dá. Mas antes, faça outra conta.", "Às vezes dá. | Mas antes, | faça *outra conta.*"),
        ("itbi", "Comprar imóvel tem custo que não aparece no preço.", "Comprar imóvel | tem *custo* | que não aparece | no *preço.*"),
        ("itbi", "O ITBI, o imposto da prefeitura, é de 3% em São Paulo, no Rio e em Belo Horizonte.",
         "O *ITBI,* | o imposto | da prefeitura, | é de *3%* | em São Paulo, | no Rio | e em Belo Horizonte."),
        ("itbi", "Num imóvel de 400 mil, são 12 mil reais. E ainda tem o cartório.", "Num imóvel | de *400 mil,* | são *12 mil reais.* | E ainda tem | o *cartório.*"),
        ("virada", "Sem o imposto pago, a escritura não sai.", "Sem o *imposto* pago, | a escritura | *não sai.*"),
        ("virada", "E é aí que muita compra trava, mesmo com o financiamento aprovado.", "E é aí | que muita compra | *trava,* | mesmo com | o financiamento | *aprovado.*"),
        ("pergunta", "Então a pergunta não é só quanto ele tem de entrada.", "Então a *pergunta* | não é só | quanto ele tem | de entrada."),
        ("pergunta", "É: você já separou o imposto e o cartório?", "É: | você já *separou* | o *imposto* | e o *cartório?*"),
        ("pergunta", "O décimo terceiro pode começar essa reserva.", "O décimo terceiro | pode *começar* | essa *reserva.*"),
        ("desfecho", "Quem faz essa conta antes evita a surpresa no cartório.", "Quem faz | essa conta *antes* | evita a *surpresa* | no cartório."),
    ]
    L = [("h_parcela", "s1", "parcela"), ("h_decimo", "s1", "décimo"), ("h_segunda", "s1", "segunda"),
         ("c_cliente", "s2", "cliente"), ("c_entrada", "s2", "entrada"), ("c_vezes", "s3", "vezes"), ("c_conta", "s3", "conta"),
         ("i_custo", "s4", "custo"), ("i_preco", "s4", "preço"), ("i_itbi", "s5", "ITBI"), ("i_prefeitura", "s5", "prefeitura"), ("i_tres", "s5", "3"),
         ("i_paulo", "s5", "Paulo"), ("i_rio", "s5", "Rio"), ("i_bh", "s5", "Belo"), ("i_400", "s6", "400"), ("i_12", "s6", "12"), ("i_cartorio", "s6", "cartório"),
         ("v_sem", "s7", "Sem"), ("v_escritura", "s7", "escritura"), ("v_sai", "s7", "sai"), ("v_trava", "s8", "trava"), ("v_aprovado", "s8", "aprovado"),
         ("p_pergunta", "s9", "pergunta"), ("p_entrada", "s9", "entrada"), ("p_separou", "s10", "separou"), ("p_imposto", "s10", "imposto"),
         ("p_cartorio", "s10", "cartório"), ("p_decimo", "s11", "décimo"), ("p_reserva", "s11", "reserva"),
         ("f_quem", "s12", "Quem"), ("f_antes", "s12", "antes"), ("f_surpresa", "s12", "surpresa")]
    sfx = [fx("h_decimo", 0.0, "pin", -27), fx("c_entrada", 0.0, "tick", -27), fx("c_conta", 0.0, "whoosh_fold", -30),
           fx("i_itbi", -0.05, "swish", -29), fx("i_tres", 0.0, "click", -27), fx("i_400", 0.0, "tick", -27), fx("i_12", 0.0, "click", -26, pitch=3),
           fx("i_cartorio", 0.0, "tick", -27, pitch=5), fx("v_sai", 0.0, "block", -28), fx("v_trava", 0.0, "thump", -28, pitch=-3),
           fx("p_pergunta", -0.05, "whoosh_fold", -29), fx("p_separou", 0.0, "pin", -27), fx("p_reserva", 0.0, "pin", -27, pitch=4),
           fx("f_quem", -0.05, "swish", -29), fx("f_surpresa", 0.0, "shimmer", -29)]
    diag = dict(publico_situacao="corretor com cliente comprador que recebeu o 13º", territorio="agora", funcao="C3 + C4",
                crenca_questionada="o 13º resolve a entrada", hipotese="a conta que trava a compra é imposto + cartório; a pergunta certa resolve")
    apur = dict(fato="Lei 4.749/1965, art. 2º: 1ª parcela do 13º até 30/11 (2026: segunda-feira). ITBI 3% em São Paulo, Rio de Janeiro e Belo Horizonte (sites das prefeituras); sem ITBI pago o cartório não conclui a transferência; escritura e registro pela tabela estadual.",
                verificado_em="2026-11-24",
                fontes=["https://www.planalto.gov.br/ccivil_03/leis/l4749.htm",
                        "https://www.gazetasp.com.br/economia/13o-salario-de-2026-tem-primeira-parcela-ate-30-de-novembro-e-segunda-deve-ser-antecipada-para-18-de-dezembro/",
                        "https://prefeitura.pbh.gov.br/fazenda/tributos/itbi", "https://www.quintoandar.com.br/guias/itbi/"],
                ressalvas="alíquota varia por cidade (selo); SP tem regime reduzido sobre parte do financiado no SFH (não detalhado); cartório sem número")
    lead = {"conta": 0.3, "itbi": 0.35, "virada": 0.4, "pergunta": 0.4, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1202-08", "ATIVO_D1202_08", "D1202", ROT + "ATIVO-D1202-08_o_13_e_o_itbi.md", "O 13º e o ITBI",
          S, L, sfx, prog("i_custo", "v_sem", "f_quem"), {}, diag, apur, lead, formato="planta-tecnica", grade=GRADE, slot="08:00",
          cta_curta=True, trilha="T01", ancoras={"virada": "cue:v_sem", "insight": "cue:p_pergunta", "resolucao": "cue:f_quem"})
    ajusta("ATIVO-D1202-08", pron={"ITBI": "i tê bê i", "3%": "três por cento"})


def ep10():
    S = [
        ("hook", "E se o comprador do imóvel tivesse que pagar metade da comissão do corretor?", "E se o *comprador* | do imóvel | tivesse que pagar | *metade* | da *comissão* | do corretor?"),
        ("lei", "Na Alemanha, isso virou lei no fim de 2020.", "Na *Alemanha,* | isso virou *lei* | no fim de *2020.*"),
        ("lei", "Na venda de apartamento ou casa para morar, quando o corretor atende os dois lados, a comissão é dividida meio a meio.",
         "Na venda | de apartamento | ou casa para morar, | quando o corretor | atende os *dois lados,* | a comissão é dividida | *meio a meio.*"),
        ("antes", "Antes, em cidades como Berlim e Hamburgo, era o comprador que pagava tudo.", "*Antes,* | em cidades como | Berlim e Hamburgo, | era o comprador | que pagava *tudo.*"),
        ("antes", "A lei veio para aliviar quem compra.", "A lei veio | para *aliviar* | quem compra."),
        ("virada", "Só que um estudo de uma universidade de Berlim encontrou outra coisa: somando as duas metades, a comissão ficou maior.",
         "Só que | um *estudo* | de uma universidade | de Berlim | encontrou outra coisa: | somando as duas metades, | a comissão | ficou *maior.*"),
        ("brasil", "Ou seja, mudar quem paga não mudou o valor.", "Ou seja, | mudar quem paga | *não mudou* | o valor."),
        ("brasil", "No Brasil, quase sempre quem paga é o vendedor. Mas quem decide a compra é o comprador.",
         "No *Brasil,* | quase sempre | quem paga | é o *vendedor.* | Mas quem *decide* | a compra | é o *comprador.*"),
        ("desfecho", "Então trabalhe como se os dois pagassem: mostre ao comprador a pesquisa, os documentos e a negociação que ele recebe de você.",
         "Então trabalhe | como se *os dois* | pagassem: | mostre ao comprador | a *pesquisa,* | os *documentos* | e a *negociação* | que ele recebe | de você."),
    ]
    L = [("h_comprador", "s1", "comprador"), ("h_metade", "s1", "metade"), ("h_comissao", "s1", "comissão"),
         ("l_alemanha", "s2", "Alemanha"), ("l_lei", "s2", "lei"), ("l_2020", "s2", "2020"), ("l_venda", "s3", "venda"), ("l_dois", "s3", "dois"), ("l_meio", "s3", "meio"),
         ("a_antes", "s4", "Antes"), ("a_berlim", "s4", "Berlim"), ("a_tudo", "s4", "tudo"), ("a_aliviar", "s5", "aliviar"),
         ("v_soque", "s6", "Só"), ("v_estudo", "s6", "estudo"), ("v_somando", "s6", "somando"), ("v_maior", "s6", "maior"),
         ("b_mudar", "s7", "mudar"), ("b_mudou", "s7", "mudou"), ("b_brasil", "s8", "Brasil"), ("b_vendedor", "s8", "vendedor"), ("b_decide", "s8", "decide"),
         ("f_trabalhe", "s9", "trabalhe"), ("f_dois", "s9", "dois"), ("f_pesquisa", "s9", "pesquisa"), ("f_documentos", "s9", "documentos"), ("f_negociacao", "s9", "negociação")]
    sfx = [fx("h_comprador", 0.0, "pop", -26), fx("h_metade", 0.0, "block", -27), fx("l_alemanha", -0.05, "whoosh_fold", -29), fx("l_lei", 0.0, "impact", -27),
           fx("l_meio", 0.0, "pop", -26, pitch=3), fx("a_antes", -0.05, "swish", -29), fx("a_tudo", 0.0, "thump", -28, pitch=-3), fx("a_aliviar", 0.0, "pop", -27, pitch=5),
           fx("v_soque", -0.05, "whoosh_fold", -28), fx("v_estudo", 0.0, "impact", -27), fx("v_maior", 0.0, "pop", -25, pitch=-2),
           fx("b_mudar", -0.05, "swish", -29), fx("b_brasil", 0.0, "pop", -26), fx("b_decide", 0.0, "click", -26),
           fx("f_pesquisa", 0.0, "pop", -26), fx("f_documentos", 0.0, "pop", -26, pitch=3), fx("f_negociacao", 0.0, "pop", -26, pitch=6)]
    diag = dict(publico_situacao="corretor que atende comprador e vendedor", territorio="e-se", funcao="C2 + C3",
                crenca_questionada="quem paga a comissão é quem importa", hipotese="mudar quem paga não muda o valor; o comprador precisa enxergar o trabalho")
    apur = dict(fato="Alemanha: lei de divisão da comissão em vigor desde 23/12/2020 — venda de apartamento/casa unifamiliar a consumidor, corretor para os dois lados: divisão em partes iguais; antes, em Berlim, Hamburgo, Brandemburgo, Bremen e Hesse o comprador pagava tudo. Estudo (tese) da Hertie School: comissão total maior somando as duas partes.",
                verificado_em="2026-11-24",
                fontes=["https://www.engelvoelkers.com/de/en/resources/brokerage-commission-reform-2020", "https://www.iamexpat.de/housing/property-news/new-german-law-partially-relieves-house-buyers-real-estate-agent-fees",
                        "https://hertie-school.org/en/news/news/detail/content/study-legal-reform-increased-commissions-for-german-real-estate-agents-instead-of-lowering-them"],
                ressalvas="1 estudo (dito); Brasil: costume, não regra legal ('quase sempre')")
    lead = {"lei": 0.3, "antes": 0.3, "virada": 0.4, "brasil": 0.35, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1202-10", "ATIVO_D1202_10", "D1202", ROT + "ATIVO-D1202-10_comprador_paga_metade.md", "E se o comprador pagasse metade?",
          S, L, sfx, prog("l_alemanha", "v_soque", "f_trabalhe"), {}, diag, apur, lead, formato="cartoon-explicativo", grade=GRADE, slot="10:00",
          cta_curta=True, trilha="T05", ancoras={"virada": "cue:v_soque", "insight": "cue:b_mudar", "resolucao": "cue:f_trabalhe"})
    ajusta("ATIVO-D1202-10", pron={"2020": "dois mil e vinte"})


def ep12():
    S = [
        ("hook", "Tem loja que escolhe o cheiro do ar com o mesmo cuidado com que escolhe a vitrine.", "Tem *loja* | que escolhe | o *cheiro* do ar | com o mesmo cuidado | com que escolhe | a *vitrine.*"),
        ("teste", "Pesquisadores testaram dois aromas numa loja de decoração na Suíça.", "Pesquisadores testaram | *dois aromas* | numa loja de decoração | na *Suíça.*"),
        ("teste", "Um simples, só laranja. Outro complexo, laranja com manjericão e chá verde.", "Um *simples,* | só laranja. | Outro *complexo,* | laranja com manjericão | e chá verde."),
        ("resultado", "Com o cheiro simples, os clientes gastaram em média 20% a mais.", "Com o cheiro *simples,* | os clientes gastaram | em média | *20% a mais.*"),
        ("resultado", "Foi um estudo só, mas a explicação faz sentido: o cérebro processa o simples sem esforço.",
         "Foi um *estudo só,* | mas a explicação | faz sentido: | o *cérebro* | processa o simples | *sem esforço.*"),
        ("virada", "Agora pense na sua visita. Perfume forte, um aromatizador em cada cômodo, cheiro do almoço.",
         "Agora pense | na sua *visita.* | *Perfume* forte, | um aromatizador | em cada cômodo, | cheiro do *almoço.*"),
        ("visita", "Tudo isso disputa a atenção que deveria estar no imóvel.", "Tudo isso *disputa* | a atenção | que deveria estar | no *imóvel.*"),
        ("visita", "Antes do cliente chegar: janelas abertas e nada de mistura de cheiros.", "Antes do cliente chegar: | *janelas abertas* | e nada de *mistura* | de cheiros."),
        ("desfecho", "O melhor cheiro da visita é aquele que ninguém comenta.", "O *melhor cheiro* | da visita | é aquele | que *ninguém comenta.*"),
    ]
    L = [("h_loja", "s1", "loja"), ("h_cheiro", "s1", "cheiro"), ("h_vitrine", "s1", "vitrine"),
         ("t_pesquisadores", "s2", "Pesquisadores"), ("t_dois", "s2", "dois"), ("t_suica", "s2", "Suíça"),
         ("t_simples", "s3", "simples"), ("t_laranja", "s3", "laranja"), ("t_complexo", "s3", "complexo"), ("t_manjericao", "s3", "manjericão"), ("t_cha", "s3", "chá"),
         ("r_simples", "s4", "simples"), ("r_20", "s4", "20"), ("r_mais", "s4", "mais"),
         ("r_estudo", "s5", "estudo"), ("r_cerebro", "s5", "cérebro"), ("r_esforco", "s5", "esforço"),
         ("v_agora", "s6", "Agora"), ("v_visita", "s6", "visita"), ("v_perfume", "s6", "Perfume"), ("v_aromatizador", "s6", "aromatizador"), ("v_almoco", "s6", "almoço"),
         ("d_disputa", "s7", "disputa"), ("d_imovel", "s7", "imóvel"), ("d_antes", "s8", "Antes"), ("d_janelas", "s8", "janelas"), ("d_mistura", "s8", "mistura"),
         ("f_melhor", "s9", "melhor"), ("f_ninguem", "s9", "ninguém")]
    sfx = [fx("h_cheiro", 0.0, "shimmer", -30), fx("h_vitrine", 0.0, "pin", -28), fx("t_dois", 0.0, "pop", -28), fx("t_simples", 0.0, "tick", -27),
           fx("t_complexo", 0.0, "tick", -27, pitch=-3), fx("r_20", 0.0, "pin", -26), fx("r_estudo", 0.0, "click", -28),
           fx("v_agora", -0.1, "whoosh_fold", -29), fx("v_perfume", 0.0, "pop", -28, pitch=-2), fx("v_almoco", 0.0, "pop", -28, pitch=-4),
           fx("d_janelas", 0.0, "swish", -28), fx("d_mistura", 0.0, "block", -29), fx("f_ninguem", 0.0, "shimmer", -29)]
    diag = dict(publico_situacao="corretor que prepara a visita", territorio="fora-da-bolha", funcao="C2 + C3",
                crenca_questionada="cheiro bom é perfume forte", hipotese="cheiro simples ou nenhum; mistura disputa a atenção do imóvel")
    apur = dict(fato="Herrmann, Zidansek, Sprott e Spangenberg, Journal of Retailing (WSU, nov/2012): loja de decoração em St. Gallen, 400+ clientes, 18 dias úteis; aroma simples (laranja) × complexo (laranja, manjericão, chá verde); gasto ~20% maior com o simples. 1 estudo.",
                verificado_em="2026-11-24", fontes=["https://sciencedaily.com/releases/2012/11/121126110929.htm", "https://www.eurekalert.org/news-releases/921553"],
                ressalvas="1 estudo numa loja (dito na fala); aplicação à visita é recomendação")
    lead = {"teste": 0.3, "resultado": 0.35, "virada": 0.4, "visita": 0.35, "desfecho": 0.4, "cta": 0.3}
    build("ATIVO-D1202-12", "ATIVO_D1202_12", "D1202", ROT + "ATIVO-D1202-12_o_cheiro_da_visita.md", "O cheiro da visita",
          S, L, sfx, prog("t_pesquisadores", "v_agora", "f_melhor"), {}, diag, apur, lead, formato="maquete-3d", grade=GRADE, slot="12:00",
          cta_curta=True, trilha="T03", ancoras={"descoberta": "cue:r_20", "virada": "cue:v_agora", "insight": "cue:f_ninguem"})
    ajusta("ATIVO-D1202-12", pron={"20%": "vinte por cento"})


def ep15():
    S = [
        ("hook", "O proprietário te liga: o outro corretor disse que vende a casa por 50 mil a mais.", "O proprietário | te *liga:* | o *outro corretor* | disse que vende a casa | por *50 mil a mais.*"),
        ("tentacao", "A vontade é brigar pelo número.", "A vontade | é *brigar* | pelo *número.*"),
        ("tentacao", "Mas o preço mais alto costuma ganhar a captação, não a venda.", "Mas o preço mais alto | costuma ganhar | a *captação,* | não a *venda.*"),
        ("parado", "Imóvel acima do mercado fica parado.", "Imóvel *acima* | do mercado | fica *parado.*"),
        ("parado", "Sem visita, o anúncio envelhece, o comprador desconfia, e o preço cai.", "Sem visita, | o anúncio *envelhece,* | o comprador *desconfia,* | e o preço *cai.*"),
        ("parado", "Às vezes, abaixo do que você tinha sugerido.", "Às vezes, | *abaixo* | do que você | tinha sugerido."),
        ("virada", "Então não discuta a avaliação. Mostre por quanto os imóveis parecidos foram vendidos.",
         "Então | *não discuta* | a avaliação. | *Mostre* por quanto | os imóveis parecidos | foram vendidos."),
        ("virada", "Vendidos, não anunciados.", "*Vendidos,* | não anunciados."),
        ("regra", "E combine uma regra com o dono: se em 30 dias não tiver visita, vocês revisam o preço juntos.",
         "E combine | uma *regra* | com o dono: | se em *30 dias* | não tiver visita, | vocês *revisam* o preço | *juntos.*"),
        ("desfecho", "O número mais alto ganha a assinatura. A data combinada ganha a venda.", "O número mais alto | ganha a *assinatura.* | A *data combinada* | ganha a *venda.*"),
    ]
    L = [("h_liga", "s1", "liga"), ("h_outro", "s1", "outro"), ("h_50", "s1", "50"), ("h_mais", "s1", "mais"),
         ("t_brigar", "s2", "brigar"), ("t_numero", "s2", "número"), ("t_captacao", "s3", "captação"), ("t_venda", "s3", "venda"),
         ("p_acima", "s4", "acima"), ("p_parado", "s4", "parado"), ("p_visita", "s5", "visita"), ("p_envelhece", "s5", "envelhece"),
         ("p_desconfia", "s5", "desconfia"), ("p_cai", "s5", "cai"), ("p_abaixo", "s6", "abaixo"),
         ("v_entao", "s7", "Então"), ("v_avaliacao", "s7", "avaliação"), ("v_mostre", "s7", "Mostre"), ("v_vendidos", "s8", "Vendidos"), ("v_anunciados", "s8", "anunciados"),
         ("r_regra", "s9", "regra"), ("r_30", "s9", "30"), ("r_revisam", "s9", "revisam"), ("r_juntos", "s9", "juntos"),
         ("f_assinatura", "s10", "assinatura"), ("f_data", "s10", "data"), ("f_venda", "s10", "venda")]
    sfx = [fx("h_liga", -0.05, "pop", -26), fx("h_50", 0.0, "impact", -27), fx("t_brigar", 0.0, "block", -27), fx("t_captacao", 0.0, "pop", -26),
           fx("t_venda", 0.0, "thump", -28, pitch=-3), fx("p_parado", 0.0, "hollow", -29), fx("p_envelhece", 0.0, "pop", -28, pitch=-3),
           fx("p_cai", 0.0, "whoosh_fold", -28), fx("p_abaixo", 0.0, "thump", -27, pitch=-5), fx("v_entao", -0.05, "swish", -29),
           fx("v_vendidos", 0.0, "impact", -26), fx("r_regra", 0.0, "click", -27), fx("r_30", 0.0, "pop", -26, pitch=3), fx("r_juntos", 0.0, "pop", -26, pitch=6),
           fx("f_assinatura", 0.0, "click", -27), fx("f_data", 0.0, "shimmer", -29)]
    diag = dict(publico_situacao="corretor disputando captação com avaliação inflada do concorrente", territorio="corretor-real", funcao="C1 + C3",
                crenca_questionada="quem avalia mais alto vence", hipotese="o número alto ganha a assinatura; dados de venda + data combinada ganham a venda")
    apur = dict(fato="Prática profissional; sem estatística. Observação qualitativa: imóvel acima do mercado fica parado e o preço tende a cair.",
                verificado_em="2026-11-24", fontes=[], ressalvas="sem números; rival genérico")
    lead = {"tentacao": 0.3, "parado": 0.35, "virada": 0.4, "regra": 0.35, "desfecho": 0.4, "cta": 0.3}
    build("ATIVO-D1202-15", "ATIVO_D1202_15", "D1202", ROT + "ATIVO-D1202-15_cinquenta_mil_a_mais.md", "Cinquenta mil a mais",
          S, L, sfx, prog("t_brigar", "v_entao", "f_assinatura"), {}, diag, apur, lead, formato="cartoon-explicativo", grade=GRADE, slot="15:00",
          cta_curta=True, trilha="T04", ancoras={"tensao": "cue:p_parado", "virada": "cue:v_entao", "insight": "cue:v_vendidos", "resolucao": "cue:f_data"})


def ep18():
    S = [
        ("hook", "Uma mulher passou 36 anos reformando a mesma casa.", "Uma mulher | passou *36 anos* | reformando | a *mesma casa.*"),
        ("hook", "Quando ela morreu, a casa foi avaliada como quase sem valor.", "Quando ela morreu, | a casa foi avaliada | como *quase sem valor.*"),
        ("inicio", "Sarah Winchester comprou uma casa de fazenda de oito cômodos na Califórnia, em 1886.",
         "*Sarah Winchester* | comprou uma casa de fazenda | de *oito cômodos* | na Califórnia, | em *1886.*"),
        ("inicio", "E nunca parou de reformar.", "E *nunca parou* | de reformar."),
        ("obra", "Sem arquiteto. Ela desenhava os cômodos em pedaços de papel, e os carpinteiros construíam.",
         "*Sem arquiteto.* | Ela desenhava os cômodos | em pedaços de *papel,* | e os carpinteiros | construíam."),
        ("obra", "O que não dava certo era fechado ou derrubado.", "O que não dava certo | era *fechado* | ou *derrubado.*"),
        ("estranho", "No fim, eram 160 cômodos. Uma escada que termina no teto. Uma porta no segundo andar que abre para o vazio.",
         "No fim, | eram *160 cômodos.* | Uma *escada* | que termina no *teto.* | Uma *porta* | no segundo andar | que abre para o *vazio.*"),
        ("virada", "Em 1922, os avaliadores olharam a obra inacabada e os estragos do terremoto.", "Em *1922,* | os avaliadores olharam | a obra *inacabada* | e os estragos | do *terremoto.*"),
        ("virada", "Para morar, ela quase não valia nada. Foi a leilão e virou atração turística.", "Para morar, | ela quase | *não valia nada.* | Foi a *leilão* | e virou | atração turística."),
        ("licao", "Dinheiro na obra não vira valor sozinho. Comprador paga por casa que faz sentido.", "*Dinheiro* na obra | não vira valor | *sozinho.* | Comprador paga | por casa | que faz *sentido.*"),
        ("desfecho", "Quando o dono disser quanto gastou na reforma, pergunte o que ela resolveu.", "Quando o dono disser | quanto *gastou* | na reforma, | *pergunte* | o que ela *resolveu.*"),
    ]
    L = [("h_36", "s1", "36"), ("h_mesma", "s1", "mesma"), ("h_morreu", "s2", "morreu"), ("h_valor", "s2", "valor"),
         ("i_sarah", "s3", "Sarah"), ("i_oito", "s3", "oito"), ("i_1886", "s3", "1886"), ("i_nunca", "s4", "nunca"),
         ("o_arquiteto", "s5", "arquiteto"), ("o_papel", "s5", "papel"), ("o_carpinteiros", "s5", "carpinteiros"), ("o_fechado", "s6", "fechado"), ("o_derrubado", "s6", "derrubado"),
         ("e_160", "s7", "160"), ("e_escada", "s7", "escada"), ("e_teto", "s7", "teto"), ("e_porta", "s7", "porta"), ("e_vazio", "s7", "vazio"),
         ("v_1922", "s8", "1922"), ("v_avaliadores", "s8", "avaliadores"), ("v_terremoto", "s8", "terremoto"),
         ("v_morar", "s9", "morar"), ("v_nada", "s9", "nada"), ("v_leilao", "s9", "leilão"), ("v_atracao", "s9", "atração"),
         ("l_dinheiro", "s10", "Dinheiro"), ("l_sozinho", "s10", "sozinho"), ("l_sentido", "s10", "sentido"),
         ("f_dono", "s11", "dono"), ("f_gastou", "s11", "gastou"), ("f_pergunte", "s11", "pergunte"), ("f_resolveu", "s11", "resolveu")]
    sfx = [fx("h_36", 0.0, "tick", -27), fx("h_valor", 0.0, "thump", -28, pitch=-3), fx("i_1886", 0.0, "click", -27), fx("i_nunca", 0.0, "tick", -27, pitch=3),
           fx("o_arquiteto", 0.0, "block", -28), fx("o_papel", 0.0, "swish", -29), fx("o_derrubado", 0.0, "thump", -28, pitch=-4),
           fx("e_160", 0.0, "pin", -27), fx("e_teto", 0.0, "block", -28), fx("e_vazio", 0.0, "hollow", -28),
           fx("v_1922", -0.05, "whoosh_fold", -29), fx("v_nada", 0.0, "impact", -27), fx("v_leilao", 0.0, "click", -27),
           fx("l_dinheiro", -0.05, "swish", -29), fx("l_sentido", 0.0, "pin", -27), fx("f_pergunte", 0.0, "shimmer", -29)]
    diag = dict(publico_situacao="corretor em captação de imóvel reformado", territorio="historia", funcao="C2 + C4",
                crenca_questionada="o que se gastou na obra vira valor", hipotese="comprador paga por casa que faz sentido; pergunte o que a reforma resolveu")
    apur = dict(fato="Winchester Mystery House: casa de fazenda de 8 cômodos comprada em 1886; reformas até a morte de Sarah Winchester (set/1922), sem arquiteto (esboços à mão); 160 cômodos; escada que sobe ao teto; porta no 2º andar que abre para o vazio; avaliada como quase sem valor (terremoto, obra inacabada, impraticável); leilão (dez/1922); atração turística (1923).",
                verificado_em="2026-11-24", fontes=["https://en.wikipedia.org/wiki/Winchester_Mystery_House", "https://www.nps.gov/places/winchester-house.htm",
                        "https://www.historyhit.com/facts-about-the-winchester-mystery-house/", "https://thehistorygirl.com/2016/06/08/winchester-mystery-house-san-jose-ca/"],
                ressalvas="36 anos (não '38 anos 24 h'); lenda dos espíritos fora")
    lead = {"inicio": 0.3, "obra": 0.3, "estranho": 0.35, "virada": 0.45, "licao": 0.4, "desfecho": 0.4, "cta": 0.3}
    build("ATIVO-D1202-18", "ATIVO_D1202_18", "D1202", ROT + "ATIVO-D1202-18_a_casa_que_nunca_terminou.md", "A casa que nunca terminou",
          S, L, sfx, prog("i_sarah", "v_1922", "l_dinheiro"), {}, diag, apur, lead, formato="planta-tecnica", grade=GRADE, slot="18:00",
          cta_curta=True, trilha="T02", ancoras={"virada": "cue:v_1922", "insight": "cue:l_dinheiro", "resolucao": "cue:f_pergunte"})
    ajusta("ATIVO-D1202-18", pron={"36": "trinta e seis", "1886": "mil oitocentos e oitenta e seis", "160": "cento e sessenta", "1922": "mil novecentos e vinte e dois"})


def ep21():
    S = [
        ("hook", "A foto do anúncio não vende o imóvel. Ela vende a visita.", "A *foto* do anúncio | não vende o *imóvel.* | Ela vende | a *visita.*"),
        ("promessa", "E se a foto prometer mais do que o imóvel entrega, a venda morre na porta.", "E se a foto | *prometer mais* | do que o imóvel entrega, | a venda | *morre na porta.*"),
        ("promessa", "Lente que estica a sala, céu trocado, ângulo que esconde a parede.", "*Lente* | que estica a sala, | *céu* trocado, | *ângulo* | que esconde a parede."),
        ("porta", "O cliente chega esperando um imóvel e encontra outro.", "O cliente chega | esperando um imóvel | e encontra *outro.*"),
        ("porta", "Daí em diante, ele procura o defeito em tudo.", "Daí em diante, | ele procura | o *defeito* | em *tudo.*"),
        ("virada", "O contrário também acontece.", "O *contrário* | também acontece."),
        ("virada", "Quando a foto é honesta, o cliente chega com a expectativa certa, e o imóvel tem chance de surpreender.",
         "Quando a foto | é *honesta,* | o cliente chega | com a *expectativa certa,* | e o imóvel | tem chance | de *surpreender.*"),
        ("guardar", "Por isso, mostre o imóvel como ele é.", "Por isso, | *mostre* o imóvel | *como ele é.*"),
        ("guardar", "E guarde uma coisa boa para ver ao vivo: a luz da tarde, a vista, o silêncio.",
         "E *guarde* | uma coisa boa | para ver *ao vivo:* | a *luz* da tarde, | a *vista,* | o *silêncio.*"),
        ("desfecho", "Visita boa é a que fica maior que a foto.", "Visita boa | é a que fica | *maior que a foto.*"),
    ]
    L = [("h_foto", "s1", "foto"), ("h_imovel", "s1", "imóvel"), ("h_visita", "s1", "visita"),
         ("p_prometer", "s2", "prometer"), ("p_morre", "s2", "morre"), ("p_porta", "s2", "porta"),
         ("p_lente", "s3", "Lente"), ("p_ceu", "s3", "céu"), ("p_angulo", "s3", "ângulo"),
         ("d_chega", "s4", "chega"), ("d_outro", "s4", "outro"), ("d_defeito", "s5", "defeito"), ("d_tudo", "s5", "tudo"),
         ("v_contrario", "s6", "contrário"), ("v_honesta", "s7", "honesta"), ("v_expectativa", "s7", "expectativa"), ("v_surpreender", "s7", "surpreender"),
         ("g_mostre", "s8", "mostre"), ("g_como", "s8", "como"), ("g_guarde", "s9", "guarde"), ("g_vivo", "s9", "vivo"),
         ("g_luz", "s9", "luz"), ("g_vista", "s9", "vista"), ("g_silencio", "s9", "silêncio"), ("f_visita", "s10", "Visita"), ("f_maior", "s10", "maior")]
    sfx = [fx("h_foto", 0.0, "click", -27), fx("h_visita", 0.0, "pin", -27), fx("p_prometer", -0.05, "swish", -29), fx("p_morre", 0.0, "thump", -27, pitch=-4),
           fx("p_lente", 0.0, "tick", -28), fx("p_ceu", 0.0, "tick", -28, pitch=3), fx("p_angulo", 0.0, "tick", -28, pitch=6),
           fx("d_outro", 0.0, "hollow", -28), fx("d_defeito", 0.0, "block", -28), fx("v_contrario", -0.1, "whoosh_fold", -29),
           fx("v_surpreender", 0.0, "shimmer", -29), fx("g_luz", 0.0, "pin", -27), fx("g_vista", 0.0, "pin", -27, pitch=3), fx("g_silencio", 0.0, "pin", -27, pitch=6),
           fx("f_maior", 0.0, "impact", -28)]
    diag = dict(publico_situacao="corretor que produz fotos e anúncios", territorio="ideia", funcao="C2 + C3",
                crenca_questionada="foto bonita é a que mais vende", hipotese="a foto vende a visita; honestidade + algo guardado para o ao vivo")
    apur = dict(fato="Tese por raciocínio (expectativa × experiência); sem estatística.", verificado_em="2026-11-24", fontes=[], ressalvas="tese declarada; sem números")
    lead = {"promessa": 0.3, "porta": 0.35, "virada": 0.45, "guardar": 0.35, "desfecho": 0.4, "cta": 0.35}
    build("ATIVO-D1202-21", "ATIVO_D1202_21", "D1202", ROT + "ATIVO-D1202-21_a_visita_maior_que_a_foto.md", "A visita maior que a foto",
          S, L, sfx, prog("p_prometer", "v_contrario", "g_mostre"), {}, diag, apur, lead, formato="pictograma-cinematografico", grade=GRADE, slot="21:00",
          cta_curta=True, trilha="T04", ancoras={"tensao": "cue:p_morre", "virada": "cue:v_contrario", "descoberta": "cue:v_surpreender", "insight": "cue:f_maior"})


if __name__ == "__main__":
    for a in sys.argv[1:] or ["08", "10", "12", "15", "18", "21"]:
        {"08": ep08, "10": ep10, "12": ep12, "15": ep15, "18": ep18, "21": ep21}[a]()
