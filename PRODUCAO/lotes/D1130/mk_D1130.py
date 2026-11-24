"""Lote D1130 — grade PRODUCAO/grade/2026-11-30.json (4 slots livres: 12h, 15h, 18h, 21h).
Roteiros aprovados por delegação do cliente (24/11/2026) em ROTEIROS/ESTEIRA/2026-11-30/, CTA curta vigente.
Uso (a partir de PRODUCAO/): python3 lotes/D1130/mk_D1130.py [12|15|18|21 ...]
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-11-30"
ROT = "ROTEIROS/ESTEIRA/2026-11-30/"


def ajusta(ep_id, **music):
    p = os.path.join("episodes", ep_id, "episode.json")
    e = json.load(open(p))
    tail = music.pop("tail", None)
    pron = music.pop("pron", None)
    if tail:
        e["tail"] = tail
    if pron:
        e["pronunciation"].update(pron)
    e["music"].update(music)
    json.dump(e, open(p, "w"), ensure_ascii=False, indent=1)


def ep12():
    S = [
        ("hook", "Duas casas iguais, na mesma rua.", "Duas *casas* | *iguais,* | na mesma rua."),
        ("hook", "Uma vendeu mais caro só por causa do número na porta.",
         "Uma vendeu | mais *caro* | só por causa | do *número* | na porta."),
        ("estudo", "Isso apareceu num estudo no Canadá, com cerca de 117 mil vendas de casas na região de Vancouver.",
         "Isso apareceu | num *estudo* | no Canadá, | com cerca de | *117 mil* | vendas de casas | na região | de Vancouver."),
        ("numeros", "Endereço terminado em oito vendeu, em média, dois e meio por cento acima.",
         "Endereço | terminado em *oito* | vendeu, | em média, | dois e meio | por cento | *acima.*"),
        ("numeros", "Terminado em quatro, dois vírgula dois por cento abaixo.",
         "Terminado em *quatro,* | dois vírgula dois | por cento | *abaixo.*"),
        ("cultura", "Para muitas famílias de origem chinesa, o oito lembra prosperidade, e o quatro soa parecido com a palavra morte.",
         "Para muitas famílias | de origem chinesa, | o oito lembra | *prosperidade,* | e o quatro | soa parecido | com a palavra | *morte.*"),
        ("cultura", "O efeito apareceu nos bairros com mais moradores dessa origem.",
         "O efeito | apareceu | nos *bairros* | com mais moradores | dessa origem."),
        ("virada", "Mas o detalhe mais curioso é outro.", "Mas o detalhe | mais *curioso* | é outro."),
        ("virada", "O efeito também apareceu em casas revendidas.", "O efeito | também apareceu | em casas *revendidas.*"),
        ("virada", "Quem compra pensando em revender também paga pelo oito.",
         "Quem compra | pensando em *revender* | também *paga* | pelo oito."),
        ("desfecho", "Então, quando o cliente diz que isso não faz diferença pra ele, lembre:",
         "Então, | quando o cliente | diz que isso | não faz *diferença* | pra ele, | lembre:"),
        ("desfecho", "O preço de amanhã depende do que o próximo comprador acredita.",
         "O preço | de *amanhã* | depende | do que o *próximo* | comprador | *acredita.*"),
    ]
    L = [("h_casas", "s1", "casas"), ("h_iguais", "s1", "iguais"), ("h_rua", "s1", "rua"),
         ("h_caro", "s2", "caro"), ("h_numero", "s2", "número"), ("h_porta", "s2", "porta"),
         ("e_estudo", "s3", "estudo"), ("e_canada", "s3", "Canadá"), ("e_117", "s3", "117"), ("e_vendas", "s3", "vendas"), ("e_vanc", "s3", "Vancouver"),
         ("n_oito", "s4", "oito"), ("n_media", "s4", "média"), ("n_acima", "s4", "acima"),
         ("n_quatro", "s5", "quatro"), ("n_abaixo", "s5", "abaixo"),
         ("c_familias", "s6", "famílias"), ("c_prosp", "s6", "prosperidade"), ("c_quatro", "s6", "quatro"), ("c_morte", "s6", "morte"),
         ("c_efeito", "s7", "efeito"), ("c_bairros", "s7", "bairros"),
         ("v_mas", "s8", "Mas"), ("v_curioso", "s8", "curioso"), ("v_tambem", "s9", "também"), ("v_revendidas", "s9", "revendidas"),
         ("v_compra", "s10", "compra"), ("v_revender", "s10", "revender"), ("v_paga", "s10", "paga"),
         ("f_cliente", "s11", "cliente"), ("f_diferenca", "s11", "diferença"), ("f_lembre", "s11", "lembre"),
         ("f_amanha", "s12", "amanhã"), ("f_proximo", "s12", "próximo"), ("f_acredita", "s12", "acredita")]
    sfx = [fx("h_casas", 0.0, "pop", -29, pitch=-3), fx("h_iguais", 0.0, "pop", -29, pitch=-1), fx("h_numero", 0.0, "tick", -27),
           fx("h_porta", 0.05, "thump", -28, pitch=-3),
           fx("e_estudo", -0.05, "whoosh_fold", -30), fx("e_117", 0.0, "click", -27), fx("e_117", 0.12, "click", -28, pitch=3),
           fx("n_oito", 0.0, "pin", -27), fx("n_acima", 0.0, "pop", -27, pitch=3),
           fx("n_quatro", 0.0, "tick", -27, pitch=-3), fx("n_abaixo", 0.0, "thump", -28, pitch=-4),
           fx("c_familias", -0.05, "whoosh_fold", -30), fx("c_prosp", 0.0, "pin", -28), fx("c_morte", 0.0, "hollow", -29),
           fx("c_bairros", 0.0, "pop", -28),
           fx("v_mas", -0.05, "whoosh_fold", -29), fx("v_revendidas", 0.0, "swish", -28), fx("v_paga", 0.0, "impact", -28),
           fx("f_diferenca", 0.0, "tick", -28), fx("f_amanha", 0.0, "pin", -27), fx("f_acredita", 0.0, "shimmer", -29)]
    prog = [{"at": 0, "notes": [26, 38, 45, 50, 54], "root": 38, "dens": 1, "bright": 0.5, "label": "D — a rua"},
            {"at": "cue:e_estudo", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.55, "label": "G — o dado"},
            {"at": "cue:v_mas", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.45, "label": "Am — virada"},
            {"at": "cue:f_cliente", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.6, "label": "F — insight"}]
    diag = dict(publico_situacao="corretor que discute preço com proprietário e comprador", territorio="fora-da-bolha", funcao="C2",
                crenca_questionada="preço é só metragem e acabamento",
                hipotese="crença do comprador tem preço mensurável; o preço de revenda depende do que o próximo comprador acredita")
    apur = dict(fato="Fortin, Hill e Huang, Superstition in the Housing Market, Economic Inquiry 52(3), 2014, p. 974-993 (IZA DP 7484): ~117 mil vendas na Grande Vancouver; endereço terminado em 4 vendeu com desconto de 2,2% e em 8 com prêmio de 2,5% frente aos demais; efeito em bairros com proporção de moradores chineses acima da média ou em transações repetidas (especulação). CTV Vancouver 2010 (arquivo UBC).",
                verificado_em="2026-11-24",
                fontes=["https://econpapers.repec.org/RePEc:bla:ecinqu:v:52:y:2014:i:3:p:974-993",
                        "https://econclone.sites.olt.ubc.ca/files/2014/06/pdf_news_2010_Lucky-numbers-drive-home-sales-_-CTV-Vancouver-News.pdf"],
                ressalvas="dado de vendas até ~2010; efeito médio; leitura especulativa é dos autores; crença cultural dita como crença")
    lead = {"estudo": 0.3, "numeros": 0.3, "cultura": 0.35, "virada": 0.4, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1130-12", "ATIVO_D1130_12", "D1130", ROT + "ATIVO-D1130-12_o_numero_na_porta.md", "O número na porta",
          S, L, sfx, prog, {}, diag, apur, lead, formato="maquete-3d", grade=GRADE, slot="12:00", cta_curta=True,
          trilha="T03", ancoras={"virada": "cue:v_mas", "descoberta": "cue:v_paga", "insight": "cue:f_amanha"})
    ajusta("ATIVO-D1130-12", pron={"117": "cento e dezessete"})


def ep15():
    S = [
        ("hook", "O cliente pediu pra ver o apartamento de novo.", "O cliente pediu | pra ver | o apartamento | *de novo.*"),
        ("hook", "E muito corretor faz exatamente a mesma visita outra vez.",
         "E muito corretor | faz exatamente | a *mesma visita* | outra vez."),
        ("pergunta", "Só que a pergunta dele mudou.", "Só que | a *pergunta* dele | *mudou.*"),
        ("pergunta", "Na primeira, ele queria saber se gostava.", "Na primeira, | ele queria saber | se *gostava.*"),
        ("pergunta", "Agora, ele quer saber como seria morar ali.", "Agora, | ele quer saber | como seria | *morar* ali."),
        ("sinais", "Repare nos sinais.", "Repare | nos *sinais.*"),
        ("sinais", "Ele mede a parede pro sofá. Abre o armário.", "Ele *mede* | a parede | pro *sofá.* | Abre | o *armário.*"),
        ("sinais", "Pergunta do vizinho, do barulho, do sol da tarde.", "Pergunta | do *vizinho,* | do *barulho,* | do *sol* | da tarde."),
        ("junto", "E muitas vezes ele traz alguém junto: a mãe, o sócio, quem divide a decisão.",
         "E muitas vezes | ele traz | alguém *junto:* | a *mãe,* | o *sócio,* | quem divide | a *decisão.*"),
        ("virada", "Se você continua apresentando a sala e a cozinha, você atrapalha.",
         "Se você continua | apresentando | a sala | e a cozinha, | você *atrapalha.*"),
        ("virada", "Ele não precisa de tour. Precisa de espaço pra se imaginar ali.",
         "Ele não precisa | de *tour.* | Precisa de *espaço* | pra se imaginar | ali."),
        ("pratica", "Chegue com a trena, as medidas e o valor do condomínio na mão.",
         "Chegue | com a *trena,* | as *medidas* | e o valor | do *condomínio* | na mão."),
        ("pratica", "E marque no horário em que ele vai viver ali: se ele trabalha de dia, mostre à noite.",
         "E marque | no *horário* | em que ele | vai viver ali: | se ele trabalha | de *dia,* | mostre | à *noite.*"),
        ("desfecho", "Na segunda visita, quem precisa falar menos é você.",
         "Na *segunda visita,* | quem precisa | falar *menos* | é você."),
    ]
    L = [("h_cliente", "s1", "cliente"), ("h_novo", "s1", "novo"), ("h_mesma", "s2", "mesma"), ("h_vez", "s2", "vez"),
         ("p_pergunta", "s3", "pergunta"), ("p_mudou", "s3", "mudou"), ("p_primeira", "s4", "primeira"), ("p_gostava", "s4", "gostava"),
         ("p_agora", "s5", "Agora"), ("p_morar", "s5", "morar"),
         ("s_sinais", "s6", "sinais"), ("s_mede", "s7", "mede"), ("s_sofa", "s7", "sofá"), ("s_armario", "s7", "armário"),
         ("s_vizinho", "s8", "vizinho"), ("s_barulho", "s8", "barulho"), ("s_sol", "s8", "sol"),
         ("j_junto", "s9", "junto"), ("j_mae", "s9", "mãe"), ("j_socio", "s9", "sócio"), ("j_decisao", "s9", "decisão"),
         ("v_sala", "s10", "sala"), ("v_atrapalha", "s10", "atrapalha"), ("v_tour", "s11", "tour"), ("v_espaco", "s11", "espaço"), ("v_imaginar", "s11", "imaginar"),
         ("r_trena", "s12", "trena"), ("r_medidas", "s12", "medidas"), ("r_condominio", "s12", "condomínio"),
         ("r_horario", "s13", "horário"), ("r_dia", "s13", "dia"), ("r_noite", "s13", "noite"),
         ("f_segunda", "s14", "segunda"), ("f_menos", "s14", "menos")]
    sfx = [fx("h_cliente", 0.0, "pop", -27), fx("h_mesma", 0.0, "thump", -27), fx("h_vez", 0.0, "pop", -27, pitch=3),
           fx("p_mudou", 0.0, "whip", -28), fx("p_gostava", 0.0, "pop", -28), fx("p_morar", 0.0, "pin", -27),
           fx("s_sinais", -0.05, "swish", -28), fx("s_mede", 0.0, "click", -26), fx("s_sofa", 0.0, "pop", -27), fx("s_armario", 0.0, "tick", -26),
           fx("s_vizinho", 0.0, "pop", -27), fx("s_barulho", 0.0, "pop", -27, pitch=2), fx("s_sol", 0.0, "pop", -27, pitch=4),
           fx("j_junto", 0.0, "swish", -28), fx("j_mae", 0.0, "pop", -27), fx("j_socio", 0.0, "pop", -27, pitch=3),
           fx("v_atrapalha", 0.0, "block", -27), fx("v_tour", 0.05, "hollow", -28), fx("v_espaco", 0.0, "impact", -28),
           fx("r_trena", 0.0, "click", -26), fx("r_medidas", 0.0, "click", -26, pitch=3), fx("r_condominio", 0.0, "click", -26, pitch=6),
           fx("r_noite", 0.0, "whoosh_fold", -29), fx("f_menos", 0.0, "impact", -27), fx("f_menos", 0.35, "shimmer", -28)]
    prog = [{"at": 0, "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 1, "bright": 0.5, "label": "F — a revisita"},
            {"at": "cue:s_sinais", "notes": [24, 36, 43, 48, 52], "root": 36, "dens": 2, "bright": 0.55, "label": "C — os sinais"},
            {"at": "cue:v_sala", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.45, "label": "Am — virada"},
            {"at": "cue:r_trena", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.6, "label": "G — a prática"}]
    diag = dict(publico_situacao="corretor que repete a apresentação na segunda visita", territorio="corretor-real", funcao="C1 + C3",
                crenca_questionada="revisita é repetir a visita", hipotese="na segunda visita a pergunta do cliente mudou; o corretor fala menos e prepara o terreno")
    apur = dict(fato="Observação de prática profissional (sem estatística).", verificado_em="2026-11-24", fontes=[],
                ressalvas="sinais descritos como 'repare', não como regra; nenhum número de conversão")
    lead = {"pergunta": 0.3, "sinais": 0.3, "junto": 0.25, "virada": 0.35, "pratica": 0.3, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1130-15", "ATIVO_D1130_15", "D1130", ROT + "ATIVO-D1130-15_a_segunda_visita.md", "A segunda visita",
          S, L, sfx, prog, {}, diag, apur, lead, formato="cartoon-explicativo", grade=GRADE, slot="15:00", cta_curta=True,
          trilha="T05", ancoras={"virada": "cue:v_atrapalha", "insight": "cue:v_espaco", "resolucao": "cue:f_menos"})


def ep18():
    S = [
        ("hook", "E se todo anúncio de imóvel tivesse que mostrar quanto você vai gastar de luz?",
         "E se todo *anúncio* | de imóvel | tivesse que mostrar | quanto você vai gastar | de *luz?*"),
        ("regra", "Parece exagero, mas na França isso já é regra.", "Parece *exagero,* | mas na *França* | isso já é *regra.*"),
        ("regra", "Desde 2022, o anúncio mostra o gasto anual estimado de energia, com letra do mesmo tamanho do resto.",
         "Desde *2022,* | o anúncio mostra | o *gasto anual* | estimado de energia, | com letra | do *mesmo tamanho* | do resto."),
        ("nota", "E o imóvel ganha uma nota, de A a G.", "E o imóvel | ganha uma *nota,* | de *A a G.*"),
        ("nota", "Os piores precisam avisar no anúncio: consumo de energia excessivo.",
         "Os *piores* | precisam *avisar* | no anúncio: | consumo de energia | *excessivo.*"),
        ("calendario", "E tem mais. Desde 2025, imóvel nota G não pode entrar em contrato novo de aluguel.",
         "E tem mais. | Desde *2025,* | imóvel nota *G* | não pode entrar | em contrato novo | de *aluguel.*"),
        ("calendario", "Em 2028, entra a nota F. E em 2034, a próxima da escala.",
         "Em *2028,* | entra a nota *F.* | E em *2034,* | a próxima | da escala."),
        ("virada", "Ou seja: lá, o custo de morar entrou na vitrine.", "Ou seja: | lá, | o *custo de morar* | entrou na *vitrine.*"),
        ("virada", "Aqui, o comprador costuma descobrir a conta de luz, o condomínio e o IPTU depois que já se apaixonou.",
         "Aqui, | o comprador | costuma descobrir | a conta de *luz,* | o *condomínio* | e o *IPTU* | depois que | já se *apaixonou.*"),
        ("desfecho", "Ninguém te obriga a mostrar isso.", "Ninguém | te *obriga* | a mostrar isso."),
        ("desfecho", "Mas o corretor que mostra o custo de morar antes de o cliente perguntar ganha o que foto nenhuma dá: confiança.",
         "Mas o corretor | que mostra | o custo de morar | *antes* | de o cliente perguntar | ganha o que | *foto* nenhuma dá: | *confiança.*"),
    ]
    L = [("h_anuncio", "s1", "anúncio"), ("h_mostrar", "s1", "mostrar"), ("h_luz", "s1", "luz"),
         ("r_exagero", "s2", "exagero"), ("r_franca", "s2", "França"), ("r_regra", "s2", "regra"),
         ("r_2022", "s3", "2022"), ("r_gasto", "s3", "gasto"), ("r_energia", "s3", "energia"), ("r_letra", "s3", "letra"), ("r_tamanho", "s3", "tamanho"),
         ("n_nota", "s4", "nota"), ("n_A", "s4", "A"), ("n_G", "s4", "G"),
         ("n_piores", "s5", "piores"), ("n_avisar", "s5", "avisar"), ("n_excessivo", "s5", "excessivo"),
         ("k_mais", "s6", "mais"), ("k_2025", "s6", "2025"), ("k_G", "s6", "G"), ("k_contrato", "s6", "contrato"), ("k_aluguel", "s6", "aluguel"),
         ("k_2028", "s7", "2028"), ("k_F", "s7", "F"), ("k_2034", "s7", "2034"), ("k_proxima", "s7", "próxima"),
         ("v_ouseja", "s8", "Ou"), ("v_custo", "s8", "custo"), ("v_vitrine", "s8", "vitrine"),
         ("v_aqui", "s9", "Aqui"), ("v_luz", "s9", "luz"), ("v_cond", "s9", "condomínio"), ("v_iptu", "s9", "IPTU"), ("v_apaixonou", "s9", "apaixonou"),
         ("f_ninguem", "s10", "Ninguém"), ("f_obriga", "s10", "obriga"),
         ("f_corretor", "s11", "corretor"), ("f_antes", "s11", "antes"), ("f_foto", "s11", "foto"), ("f_confianca", "s11", "confiança")]
    sfx = [fx("h_anuncio", -0.05, "swish", -29), fx("h_luz", 0.0, "pin", -27),
           fx("r_franca", 0.0, "pop", -28), fx("r_regra", 0.0, "thump", -28), fx("r_2022", 0.0, "tick", -27), fx("r_gasto", 0.0, "click", -27),
           fx("r_tamanho", 0.0, "click", -27, pitch=3),
           fx("n_nota", -0.05, "whoosh_fold", -30), fx("n_A", 0.0, "tick", -27), fx("n_G", 0.0, "tick", -27, pitch=-3), fx("n_excessivo", 0.0, "block", -28),
           fx("k_2025", 0.0, "impact", -28), fx("k_aluguel", 0.0, "block", -28), fx("k_2028", 0.0, "tick", -27), fx("k_2034", 0.0, "tick", -27, pitch=3),
           fx("v_ouseja", -0.05, "whoosh_fold", -29), fx("v_vitrine", 0.0, "pin", -27),
           fx("v_luz", 0.0, "pop", -28), fx("v_cond", 0.0, "pop", -28, pitch=2), fx("v_iptu", 0.0, "pop", -28, pitch=4), fx("v_apaixonou", 0.05, "hollow", -29),
           fx("f_antes", 0.0, "pin", -27), fx("f_confianca", 0.0, "impact", -28), fx("f_confianca", 0.3, "shimmer", -29)]
    prog = [{"at": 0, "notes": [26, 38, 45, 50, 54], "root": 38, "dens": 1, "bright": 0.5, "label": "D — a premissa"},
            {"at": "cue:r_franca", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.55, "label": "G — a regra"},
            {"at": "cue:v_ouseja", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.45, "label": "Am — virada"},
            {"at": "cue:f_corretor", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.6, "label": "F — confiança"}]
    diag = dict(publico_situacao="corretor que anuncia e responde 'quanto é o condomínio?' depois da visita", territorio="e-se", funcao="C2 + C3",
                crenca_questionada="o anúncio mostra preço e fotos; custo de morar vem depois",
                hipotese="mostrar o custo de morar antes de perguntarem gera confiança")
    apur = dict(fato="França: desde 01/01/2022 o anúncio de venda ou locação traz o montante estimado das despesas anuais de energia (letra ao menos do tamanho do resto do anúncio) e, para F e G, 'logement à consommation énergétique excessive' (Service-Public.fr; arrêté de 10/01/2017 alterado). Locação: G proibido para novos contratos desde 01/01/2025, F em 2028, E em 2034 (França metropolitana; Loi Climat et Résilience).",
                verificado_em="2026-11-24",
                fontes=["https://www.service-public.gouv.fr/particuliers/vosdroits/F16096", "https://www.service-public.gouv.fr/particuliers/actualites/A17975",
                        "https://www.mysweetimmo.com/2022/04/10/dpe-que-faut-il-mentionner-dans-une-annonce-immobiliere/"],
                ressalvas="regra de locação simplificada para 'contrato novo'; ultramar tem calendário diferente; Brasil sem obrigação equivalente (a fala diz 'Ninguém te obriga')")
    lead = {"regra": 0.3, "nota": 0.3, "calendario": 0.35, "virada": 0.4, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1130-18", "ATIVO_D1130_18", "D1130", ROT + "ATIVO-D1130-18_a_conta_de_luz_no_anuncio.md", "E se o anúncio mostrasse a conta de luz?",
          S, L, sfx, prog, {}, diag, apur, lead, formato="planta-tecnica", grade=GRADE, slot="18:00", cta_curta=True,
          trilha="T01", ancoras={"virada": "cue:v_ouseja", "tensao": "cue:v_apaixonou", "insight": "cue:f_confianca"})
    ajusta("ATIVO-D1130-18", pron={"2022": "dois mil e vinte e dois", "2025": "dois mil e vinte e cinco", "2028": "dois mil e vinte e oito",
                                   "2034": "dois mil e trinta e quatro", "IPTU": "i pê tê u"})


def ep21():
    S = [
        ("hook", "Ofereceram cerca de 1 milhão de dólares por essa casinha.", "Ofereceram | cerca de | *1 milhão* | de dólares | por essa *casinha.*"),
        ("hook", "A dona disse não.", "A dona | disse *não.*"),
        ("hook", "E o prédio foi construído em volta dela.", "E o *prédio* | foi construído | em *volta* dela."),
        ("retrato", "Seattle, 2006.", "*Seattle,* | 2006."),
        ("retrato", "Edith Macefield tinha 84 anos e morava ali fazia décadas.",
         "*Edith Macefield* | tinha *84 anos* | e morava ali | fazia *décadas.*"),
        ("ofertas", "Uma construtora queria o terreno para um centro comercial.",
         "Uma *construtora* | queria o terreno | para um centro | *comercial.*"),
        ("ofertas", "As ofertas subiram. Ela recusou todas.", "As ofertas | *subiram.* | Ela recusou | *todas.*"),
        ("cerco", "A obra seguiu. E a casinha ficou ali, cercada de concreto.",
         "A obra | *seguiu.* | E a casinha | ficou ali, | cercada | de *concreto.*"),
        ("virada", "Foi aí que aconteceu o que ninguém esperava.", "Foi aí | que aconteceu | o que *ninguém* | esperava."),
        ("virada", "O chefe da obra, Barry Martin, começou a passar lá.", "O *chefe da obra,* | Barry Martin, | começou | a *passar* lá."),
        ("virada", "Levava compras, levava ela ao médico, cuidava dela.", "Levava *compras,* | levava ela | ao *médico,* | *cuidava* dela."),
        ("heranca", "Quando Edith morreu, em 2008, deixou a casa para ele.", "Quando Edith morreu, | em 2008, | *deixou a casa* | para ele."),
        ("desfecho", "A casa que ninguém conseguiu comprar ficou com quem nunca tentou.",
         "A casa | que ninguém | conseguiu *comprar* | ficou com quem | *nunca tentou.*"),
        ("desfecho", "Quando o proprietário recusa um bom preço, quase nunca é sobre dinheiro.",
         "Quando o proprietário | *recusa* | um bom preço, | quase nunca | é sobre *dinheiro.*"),
        ("desfecho", "É sobre confiança.", "É sobre | *confiança.*"),
    ]
    L = [("h_milhao", "s1", "milhão"), ("h_casinha", "s1", "casinha"), ("h_nao", "s2", "não"), ("h_predio", "s3", "prédio"), ("h_volta", "s3", "volta"),
         ("r_seattle", "s4", "Seattle"), ("r_2006", "s4", "2006"), ("r_edith", "s5", "Edith"), ("r_84", "s5", "84"), ("r_decadas", "s5", "décadas"),
         ("o_construtora", "s6", "construtora"), ("o_terreno", "s6", "terreno"), ("o_comercial", "s6", "comercial"),
         ("o_subiram", "s7", "subiram"), ("o_recusou", "s7", "recusou"), ("o_todas", "s7", "todas"),
         ("x_obra", "s8", "obra"), ("x_seguiu", "s8", "seguiu"), ("x_casinha", "s8", "casinha"), ("x_concreto", "s8", "concreto"),
         ("v_foi", "s9", "Foi"), ("v_ninguem", "s9", "ninguém"), ("v_chefe", "s10", "chefe"), ("v_barry", "s10", "Barry"), ("v_passar", "s10", "passar"),
         ("v_compras", "s11", "compras"), ("v_medico", "s11", "médico"), ("v_cuidava", "s11", "cuidava"),
         ("t_morreu", "s12", "morreu"), ("t_2008", "s12", "2008"), ("t_deixou", "s12", "deixou"),
         ("f_comprar", "s13", "comprar"), ("f_nunca", "s13", "nunca"), ("f_tentou", "s13", "tentou"),
         ("f_recusa", "s14", "recusa"), ("f_dinheiro", "s14", "dinheiro"), ("f_confianca", "s15", "confiança")]
    sfx = [fx("h_milhao", 0.0, "tick", -28), fx("h_nao", 0.0, "thump", -27, pitch=-3), fx("h_predio", -0.05, "whoosh_fold", -30),
           fx("r_seattle", -0.05, "swish", -30), fx("r_edith", 0.0, "pin", -29),
           fx("o_construtora", 0.0, "pop", -29), fx("o_subiram", 0.0, "tick", -28), fx("o_subiram", 0.15, "tick", -28, pitch=3),
           fx("o_todas", 0.0, "block", -28), fx("x_concreto", 0.0, "thump", -28, pitch=-4),
           fx("v_foi", -0.05, "whoosh_fold", -29), fx("v_chefe", 0.0, "pop", -29), fx("v_compras", 0.0, "pop", -29, pitch=2),
           fx("v_medico", 0.0, "pop", -29, pitch=4), fx("t_deixou", 0.0, "pin", -27), fx("f_nunca", 0.0, "impact", -29),
           fx("f_confianca", 0.0, "impact", -28), fx("f_confianca", 0.3, "shimmer", -29)]
    prog = [{"at": 0, "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.4, "label": "Am — a casa"},
            {"at": "cue:o_construtora", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 1, "bright": 0.45, "label": "F — as ofertas"},
            {"at": "cue:v_foi", "notes": [24, 36, 43, 48, 52], "root": 36, "dens": 2, "bright": 0.55, "label": "C — a virada"},
            {"at": "cue:f_comprar", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.6, "label": "G — confiança"}]
    diag = dict(publico_situacao="corretor diante do proprietário que recusa uma boa proposta", territorio="historia", funcao="C2 + C4",
                crenca_questionada="todo não do proprietário é negociação de preço", hipotese="quando o proprietário recusa um bom preço, o assunto quase nunca é dinheiro; é confiança")
    apur = dict(fato="Edith Macefield (1921–2008), Ballard, Seattle: recusou em 2006 ofertas de até cerca de US$ 1 milhão de uma construtora para um empreendimento comercial (Ballard Blocks), que foi construído em volta da casa; Barry Martin, superintendente da obra, tornou-se amigo, levava compras e a acompanhava a consultas; ela deixou a casa para ele no testamento; morreu em junho de 2008, aos 86 anos (Wikipedia; HistoryLink; Seattle Weekly 2008; Cascade PBS 2015; KUOW 2015).",
                verificado_em="2026-11-24",
                fontes=["https://en.wikipedia.org/wiki/Edith_Macefield", "https://www.historylink.org/file/11092",
                        "https://www.seattleweekly.com/2008/06/17/edith-macefield-the-ballard-octagenarian-who-famously-turned-down-a-1-million",
                        "https://www.cascadepbs.org/culture/2015/04/the-real-story-behind-ballards-anti-development-icon/"],
                ressalvas="valor dito como 'cerca de' (relatos de US$ 750 mil a 1 milhão); amizade simplificada; ligação com o filme Up não usada; lição é interpretação")
    lead = {"retrato": 0.4, "ofertas": 0.35, "cerco": 0.35, "virada": 0.5, "heranca": 0.4, "desfecho": 0.45, "cta": 0.35}
    build("ATIVO-D1130-21", "ATIVO_D1130_21", "D1130", ROT + "ATIVO-D1130-21_a_casa_que_ninguem_comprou.md", "A casa que ninguém conseguiu comprar",
          S, L, sfx, prog, {}, diag, apur, lead, formato="pictograma-cinematografico", grade=GRADE, slot="21:00", cta_curta=True,
          trilha="T02", ancoras={"virada": "cue:v_foi", "descoberta": "cue:t_deixou", "insight": "cue:f_confianca"})
    ajusta("ATIVO-D1130-21", pron={"2006": "dois mil e seis", "2008": "dois mil e oito", "Macefield": "Mêicefild"})


if __name__ == "__main__":
    alvo = sys.argv[1:] or ["12"]
    for a in alvo:
        {"12": ep12, "15": ep15, "18": ep18, "21": ep21}[a]()
