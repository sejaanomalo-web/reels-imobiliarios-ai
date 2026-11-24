"""Lote D1201 — grade PRODUCAO/grade/2026-12-01.json (12h, 15h, 18h, 21h; 08h/10h já programados).
Roteiros aprovados por delegação do cliente (24/11/2026) em ROTEIROS/ESTEIRA/2026-12-01/, CTA curta vigente.
Uso (a partir de PRODUCAO/): python3 lotes/D1201/mk_D1201.py [12|15|18|21 ...]
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-01"
ROT = "ROTEIROS/ESTEIRA/2026-12-01/"


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


def ep12():
    S = [
        ("hook", "A partir de hoje, aluguel de imóvel entra na nota fiscal.", "A partir de *hoje,* | aluguel de imóvel | entra na *nota fiscal.*"),
        ("hook", "Mas não para todo mundo.", "Mas *não* | para todo mundo."),
        ("regra", "Pelo calendário oficial da reforma tributária, desde 1º de dezembro a locação de imóvel tem nota fiscal de serviço eletrônica.",
         "Pelo calendário oficial | da *reforma tributária,* | desde *1º de dezembro* | a locação de imóvel | tem nota fiscal | de serviço *eletrônica.*"),
        ("empresa", "Empresa que aluga imóvel emite. Sem piso de receita, sem mínimo de imóveis.",
         "*Empresa* | que aluga imóvel | *emite.* | Sem piso de receita, | sem mínimo de imóveis."),
        ("empresa", "Se a empresa é do Simples Nacional, a data é outra: janeiro de 2027.",
         "Se a empresa | é do *Simples Nacional,* | a data é outra: | janeiro de *2027.*"),
        ("pf", "E a pessoa física?", "E a *pessoa física?*"),
        ("pf", "Pela lei da reforma, ela só entra no imposto com mais de 240 mil reais de aluguel no ano anterior e mais de três imóveis.",
         "Pela lei da reforma, | ela só entra no imposto | com mais de *240 mil reais* | de aluguel | no ano anterior | e mais de *três imóveis.*"),
        ("pf", "E ainda tem divergência de leitura sobre a nota.", "E ainda tem | *divergência* | de leitura | sobre a nota."),
        ("virada", "Ou seja: seu cliente proprietário vai te perguntar.", "Ou seja: | seu cliente proprietário | vai te *perguntar.*"),
        ("virada", "E a resposta honesta é: depende de quem aluga.", "E a resposta honesta é: | *depende* | de quem aluga."),
        ("desfecho", "Corretor não precisa virar contador.", "Corretor | não precisa | virar *contador.*"),
        ("desfecho", "Precisa saber a pergunta certa e indicar quem responde.", "Precisa saber | a *pergunta certa* | e *indicar* | quem responde."),
    ]
    L = [("h_hoje", "s1", "hoje"), ("h_nota", "s1", "nota"), ("h_nao", "s2", "não"),
         ("r_calendario", "s3", "calendário"), ("r_reforma", "s3", "reforma"), ("r_dezembro", "s3", "dezembro"), ("r_eletronica", "s3", "eletrônica"),
         ("e_empresa", "s4", "Empresa"), ("e_emite", "s4", "emite"), ("e_piso", "s4", "piso"), ("e_minimo", "s4", "mínimo"),
         ("e_simples", "s5", "Simples"), ("e_2027", "s5", "2027"),
         ("p_fisica", "s6", "física"), ("p_240", "s7", "240"), ("p_tres", "s7", "três"), ("p_divergencia", "s8", "divergência"),
         ("v_ouseja", "s9", "Ou"), ("v_perguntar", "s9", "perguntar"), ("v_depende", "s10", "depende"), ("v_aluga", "s10", "aluga"),
         ("f_contador", "s11", "contador"), ("f_pergunta", "s12", "pergunta"), ("f_indicar", "s12", "indicar")]
    sfx = [fx("h_nota", 0.0, "pin", -27), fx("h_nao", 0.0, "thump", -28, pitch=-3), fx("r_dezembro", 0.0, "tick", -27),
           fx("e_empresa", -0.05, "swish", -29), fx("e_emite", 0.0, "pin", -27), fx("e_simples", 0.0, "tick", -27, pitch=3),
           fx("p_fisica", -0.05, "whoosh_fold", -30), fx("p_240", 0.0, "click", -27), fx("p_tres", 0.0, "click", -27, pitch=3),
           fx("p_divergencia", 0.0, "block", -28), fx("v_ouseja", -0.05, "whoosh_fold", -29), fx("v_depende", 0.0, "impact", -28),
           fx("f_pergunta", 0.0, "pin", -27), fx("f_indicar", 0.0, "shimmer", -29)]
    diag = dict(publico_situacao="corretor que atende proprietário investidor", territorio="agora", funcao="C3 + C4",
                crenca_questionada="aluguel nunca tem nota fiscal / todo mundo vai ter que emitir", hipotese="depende de quem aluga; o corretor sabe a pergunta certa")
    apur = dict(fato="Ato Conjunto RFB/CGIBS nº 4/2026 (DOU 31/07/2026): NFS-e obrigatória para locação de imóveis a partir de 01/12/2026; Simples Nacional a partir de 01/01/2027. LC 214/2025: pessoa física contribuinte de IBS/CBS na locação com receita acima de R$ 240 mil no ano anterior e mais de 3 imóveis; leitura divergente sobre a emissão da nota pela pessoa física.",
                verificado_em="2026-11-24",
                fontes=["https://conjur.com.br/2026-nov-11/aluguel-de-imoveis-com-nota-fiscal-o-que-muda-na-reforma-tributaria/",
                        "https://noviello.adv.br/nf-e-abi-nfs-e-locacao-imoveis-obrigatoriedade-01-12-2026-cronograma-reforma-tributaria/",
                        "https://juscon.com.br/nfs-e-para-aluguel-de-imoveis-sera-obrigatoria-a-partir-de-dezembro-de-2026/"],
                ressalvas="risco de adiamento (layout técnico); divergência PF dita; não é orientação contábil (selo)")
    lead = {"regra": 0.3, "empresa": 0.3, "pf": 0.35, "virada": 0.4, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1201-12", "ATIVO_D1201_12", "D1201", ROT + "ATIVO-D1201-12_nota_fiscal_do_aluguel.md", "A nota fiscal do aluguel",
          S, L, sfx, prog("r_calendario", "v_ouseja", "f_contador"), {}, diag, apur, lead, formato="planta-tecnica", grade=GRADE, slot="12:00",
          cta_curta=True, trilha="T01", ancoras={"virada": "cue:v_ouseja", "insight": "cue:f_pergunta"})
    ajusta("ATIVO-D1201-12", pron={"2027": "dois mil e vinte e sete", "1º": "primeiro"})


def ep15():
    S = [
        ("hook", "O proprietário quis acompanhar a visita.", "O *proprietário* | quis acompanhar | a *visita.*"),
        ("hook", "Em cinco minutos, ele já tinha contado do vizinho barulhento.", "Em *cinco minutos,* | ele já tinha contado | do vizinho | *barulhento.*"),
        ("conta", "E ainda falou quanto pagou, por que está vendendo e que aceita negociar.",
         "E ainda falou | quanto *pagou,* | por que está *vendendo* | e que aceita | *negociar.*"),
        ("memoria", "Não por mal. É a casa dele.", "Não por mal. | É a *casa dele.*"),
        ("memoria", "Ele conhece cada defeito e cada lembrança.", "Ele conhece | cada *defeito* | e cada *lembrança.*"),
        ("virada", "O problema é que, na visita, cada frase dele vira argumento de negociação para o comprador.",
         "O *problema* é que, | na visita, | cada frase dele | vira *argumento* | de negociação | para o comprador."),
        ("papel", "Então combine antes: ele recebe, se apresenta, mostra o que só ele sabe, como a reforma do banheiro, e depois dá espaço.",
         "Então | *combine antes:* | ele *recebe,* | se apresenta, | *mostra* | o que só ele sabe, | como a reforma | do banheiro, | e depois | dá *espaço.*"),
        ("papel", "Preço, motivo da venda e prazo, quem responde é você.", "*Preço,* | *motivo* da venda | e *prazo,* | quem responde | é *você.*"),
        ("desfecho", "Dono presente na visita não é problema.", "Dono *presente* | na visita | não é problema."),
        ("desfecho", "Dono sem papel combinado é.", "Dono | sem *papel combinado* | é."),
    ]
    L = [("h_proprietario", "s1", "proprietário"), ("h_visita", "s1", "visita"), ("h_cinco", "s2", "cinco"), ("h_vizinho", "s2", "vizinho"), ("h_barulhento", "s2", "barulhento"),
         ("c_pagou", "s3", "pagou"), ("c_vendendo", "s3", "vendendo"), ("c_negociar", "s3", "negociar"),
         ("m_mal", "s4", "mal"), ("m_casa", "s4", "casa"), ("m_defeito", "s5", "defeito"), ("m_lembranca", "s5", "lembrança"),
         ("v_problema", "s6", "problema"), ("v_frase", "s6", "frase"), ("v_argumento", "s6", "argumento"),
         ("p_combine", "s7", "combine"), ("p_recebe", "s7", "recebe"), ("p_mostra", "s7", "mostra"), ("p_banheiro", "s7", "banheiro"), ("p_espaco", "s7", "espaço"),
         ("p_preco", "s8", "Preço"), ("p_motivo", "s8", "motivo"), ("p_prazo", "s8", "prazo"), ("p_voce", "s8", "você"),
         ("f_presente", "s9", "presente"), ("f_problema", "s9", "problema"), ("f_papel", "s10", "papel")]
    sfx = [fx("h_proprietario", 0.0, "pop", -27), fx("h_vizinho", 0.0, "pop", -27), fx("h_barulhento", 0.05, "thump", -27),
           fx("c_pagou", 0.0, "pop", -27), fx("c_vendendo", 0.0, "pop", -27, pitch=2), fx("c_negociar", 0.0, "pop", -27, pitch=4),
           fx("m_casa", -0.05, "swish", -29), fx("v_problema", -0.05, "whip", -28), fx("v_argumento", 0.0, "impact", -27),
           fx("p_combine", -0.05, "swish", -28), fx("p_recebe", 0.0, "click", -26), fx("p_mostra", 0.0, "click", -26, pitch=3), fx("p_espaco", 0.0, "click", -26, pitch=6),
           fx("p_preco", 0.0, "pop", -27), fx("p_motivo", 0.0, "pop", -27, pitch=2), fx("p_prazo", 0.0, "pop", -27, pitch=4), fx("p_voce", 0.0, "pin", -27),
           fx("f_papel", 0.0, "impact", -27), fx("f_papel", 0.35, "shimmer", -28)]
    diag = dict(publico_situacao="corretor com proprietário que acompanha a visita", territorio="corretor-real", funcao="C1 + C3",
                crenca_questionada="dono na visita atrapalha sempre", hipotese="dono presente ajuda quando o papel é combinado antes")
    apur = dict(fato="Observação de prática profissional (sem estatística).", verificado_em="2026-11-24", fontes=[], ressalvas="sem números")
    lead = {"conta": 0.25, "memoria": 0.35, "virada": 0.35, "papel": 0.3, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1201-15", "ATIVO_D1201_15", "D1201", ROT + "ATIVO-D1201-15_o_dono_na_visita.md", "O dono na visita",
          S, L, sfx, prog("c_pagou", "v_problema", "f_presente"), {}, diag, apur, lead, formato="cartoon-explicativo", grade=GRADE, slot="15:00",
          cta_curta=True, trilha="T05", ancoras={"virada": "cue:v_problema", "insight": "cue:p_combine", "resolucao": "cue:f_presente"})


def ep18():
    S = [
        ("hook", "E se o comprador pudesse desistir do apartamento uma semana depois de assinar?",
         "E se o comprador | pudesse *desistir* | do apartamento | uma *semana* | depois de *assinar?*"),
        ("hook", "No imóvel na planta, em alguns casos, ele pode.", "No imóvel *na planta,* | em alguns casos, | ele *pode.*"),
        ("lei", "Pela Lei do Distrato, de 2018, quem compra no estande de vendas ou fora da sede da incorporadora tem 7 dias para se arrepender.",
         "Pela *Lei do Distrato,* | de 2018, | quem compra | no *estande* de vendas | ou fora da *sede* | da incorporadora | tem *7 dias* | para se *arrepender.*"),
        ("devolve", "E recebe de volta tudo o que pagou.", "E recebe *de volta* | *tudo* o que pagou."),
        ("devolve", "Para parte dos especialistas, inclusive o valor da corretagem.", "Para parte | dos especialistas, | inclusive o valor | da *corretagem.*"),
        ("virada", "Ou seja: a venda no estande só termina de verdade depois de 7 dias.",
         "Ou seja: | a venda no estande | só *termina* de verdade | depois de *7 dias.*"),
        ("pressao", "Por isso, pressão para fechar no impulso costuma sair cara.", "Por isso, | *pressão* | para fechar | no *impulso* | costuma sair *cara.*"),
        ("pressao", "Quem compra empurrado tem uma semana inteira para pensar.", "Quem compra *empurrado* | tem uma semana inteira | para *pensar.*"),
        ("desfecho", "Venda boa é a que continua de pé no oitavo dia.", "Venda *boa* | é a que continua | de pé | no *oitavo dia.*"),
    ]
    L = [("h_desistir", "s1", "desistir"), ("h_semana", "s1", "semana"), ("h_assinar", "s1", "assinar"), ("h_planta", "s2", "planta"), ("h_pode", "s2", "pode"),
         ("l_lei", "s3", "Lei"), ("l_2018", "s3", "2018"), ("l_estande", "s3", "estande"), ("l_sede", "s3", "sede"), ("l_7", "s3", "7"), ("l_arrepender", "s3", "arrepender"),
         ("d_volta", "s4", "volta"), ("d_tudo", "s4", "tudo"), ("d_especialistas", "s5", "especialistas"), ("d_corretagem", "s5", "corretagem"),
         ("v_ouseja", "s6", "Ou"), ("v_termina", "s6", "termina"), ("v_7", "s6", "7"),
         ("p_pressao", "s7", "pressão"), ("p_impulso", "s7", "impulso"), ("p_cara", "s7", "cara"), ("p_empurrado", "s8", "empurrado"), ("p_pensar", "s8", "pensar"),
         ("f_boa", "s9", "boa"), ("f_oitavo", "s9", "oitavo")]
    sfx = [fx("h_desistir", 0.0, "tick", -28), fx("h_assinar", 0.0, "click", -27), fx("h_pode", 0.0, "pin", -27),
           fx("l_lei", -0.05, "whoosh_fold", -30), fx("l_estande", 0.0, "pop", -28, pitch=-3), fx("l_7", 0.0, "tick", -27), fx("l_7", 0.12, "tick", -27, pitch=3),
           fx("d_volta", 0.0, "swish", -28), fx("d_corretagem", 0.0, "tick", -28), fx("v_ouseja", -0.05, "whoosh_fold", -29), fx("v_7", 0.0, "impact", -28),
           fx("p_pressao", 0.0, "thump", -28, pitch=-3), fx("p_cara", 0.0, "block", -28), fx("f_oitavo", 0.0, "pin", -27), fx("f_oitavo", 0.3, "shimmer", -29)]
    diag = dict(publico_situacao="corretor de lançamento que vende no estande", territorio="e-se", funcao="C2 + C3",
                crenca_questionada="venda assinada no estande está fechada", hipotese="o arrependimento de 7 dias torna a venda por pressão frágil")
    apur = dict(fato="Lei 13.786/2018 (Lei do Distrato), §10 do art. 67-A da Lei 4.591/1964: contratos firmados em estandes de vendas e fora da sede do incorporador permitem arrependimento em 7 dias, com devolução de todos os valores pagos; parte da doutrina inclui a corretagem.",
                verificado_em="2026-11-24",
                fontes=["https://www.irib.org.br/?p=51128", "https://jus.com.br/artigos/83039/do-direito-de-arrependimento-na-aquisicao-de-unidade-imobiliaria-em-incorporacao-imobiliaria-e-em-loteamento-urbano",
                        "https://irib.org.br/noticias/detalhes/artigo-undefined-migalhas-o-direito-de-arrependimento-na-aquisicao-de-imoveis-na-planta-a-protecao-da-precipitacao-undefined-por-iuri-bontempo-costa"],
                ressalvas="escopo: imóvel na planta, estande ou fora da sede; corretagem = parte dos especialistas; não é orientação jurídica (selo)")
    lead = {"lei": 0.3, "devolve": 0.3, "virada": 0.4, "pressao": 0.35, "desfecho": 0.4, "cta": 0.3}
    build("ATIVO-D1201-18", "ATIVO_D1201_18", "D1201", ROT + "ATIVO-D1201-18_sete_dias_para_desistir.md", "Sete dias para desistir",
          S, L, sfx, prog("l_lei", "v_ouseja", "f_boa"), {}, diag, apur, lead, formato="maquete-3d", grade=GRADE, slot="18:00",
          cta_curta=True, trilha="T04", ancoras={"virada": "cue:v_ouseja", "tensao": "cue:p_cara", "insight": "cue:f_oitavo"})
    ajusta("ATIVO-D1201-18", pron={"2018": "dois mil e dezoito"})


def ep21():
    S = [
        ("hook", "Muito proprietário tem medo de assinar exclusividade.", "Muito proprietário | tem *medo* | de assinar | *exclusividade.*"),
        ("hook", "E muito corretor pede exclusividade do jeito errado.", "E muito corretor | pede exclusividade | do jeito *errado.*"),
        ("lei", "A lei protege o corretor exclusivo.", "A lei *protege* | o corretor exclusivo."),
        ("lei", "Pelo Código Civil, se a exclusividade está por escrito, a comissão é devida mesmo se o dono vender sozinho.",
         "Pelo *Código Civil,* | se a exclusividade | está *por escrito,* | a comissão é *devida* | mesmo se o dono | vender *sozinho.*"),
        ("condicao", "Mas tem uma condição no fim do artigo: salvo se ficar provada a inércia do corretor.",
         "Mas tem uma *condição* | no fim do artigo: | salvo se ficar provada | a *inércia* | do corretor."),
        ("virada", "Ou seja: a exclusividade não garante a comissão.", "Ou seja: | a exclusividade | *não garante* | a comissão."),
        ("virada", "Ela garante a chance de trabalhar.", "Ela garante | a *chance* | de *trabalhar.*"),
        ("plano", "Por isso, peça exclusividade mostrando o plano: o que você vai fazer, em quanto tempo, e como vai prestar contas toda semana.",
         "Por isso, | peça exclusividade | mostrando o *plano:* | o que você vai *fazer,* | em quanto *tempo,* | e como vai | prestar *contas* | toda *semana.*"),
        ("desfecho", "Exclusividade não é posse do imóvel.", "Exclusividade | não é *posse* | do imóvel."),
        ("desfecho", "É compromisso de trabalho por escrito.", "É *compromisso* | de trabalho | por escrito."),
    ]
    L = [("h_medo", "s1", "medo"), ("h_exclusividade", "s1", "exclusividade"), ("h_errado", "s2", "errado"),
         ("l_protege", "s3", "protege"), ("l_codigo", "s4", "Código"), ("l_escrito", "s4", "escrito"), ("l_devida", "s4", "devida"), ("l_sozinho", "s4", "sozinho"),
         ("c_condicao", "s5", "condição"), ("c_artigo", "s5", "artigo"), ("c_inercia", "s5", "inércia"),
         ("v_ouseja", "s6", "Ou"), ("v_garante", "s6", "garante"), ("v_chance", "s7", "chance"), ("v_trabalhar", "s7", "trabalhar"),
         ("p_plano", "s8", "plano"), ("p_fazer", "s8", "fazer"), ("p_tempo", "s8", "tempo"), ("p_contas", "s8", "contas"), ("p_semana", "s8", "semana"),
         ("f_posse", "s9", "posse"), ("f_compromisso", "s10", "compromisso")]
    sfx = [fx("h_medo", 0.0, "thump", -28, pitch=-3), fx("h_errado", 0.0, "block", -28), fx("l_protege", -0.05, "whoosh_fold", -30),
           fx("l_escrito", 0.0, "click", -27), fx("l_devida", 0.0, "pin", -27), fx("c_condicao", -0.05, "hollow", -29), fx("c_inercia", 0.0, "thump", -28, pitch=-4),
           fx("v_ouseja", -0.05, "whoosh_fold", -29), fx("v_chance", 0.0, "pin", -27), fx("p_plano", 0.0, "tick", -27),
           fx("p_fazer", 0.0, "tick", -27, pitch=2), fx("p_tempo", 0.0, "tick", -27, pitch=4), fx("p_contas", 0.0, "tick", -27, pitch=6),
           fx("f_posse", 0.0, "hollow", -29), fx("f_compromisso", 0.0, "impact", -28), fx("f_compromisso", 0.3, "shimmer", -29)]
    diag = dict(publico_situacao="corretor que pede exclusividade na captação", territorio="ideia", funcao="C2 + C3",
                crenca_questionada="exclusividade garante a comissão", hipotese="exclusividade garante a chance de trabalhar; pede-se com plano e prestação de contas")
    apur = dict(fato="Código Civil, art. 726: concluído o negócio diretamente entre as partes, nenhuma remuneração é devida; se, por escrito, for ajustada a corretagem com exclusividade, o corretor tem direito à remuneração integral, ainda que o negócio se realize sem a sua mediação, salvo se comprovada sua inércia ou ociosidade.",
                verificado_em="2026-11-24", fontes=["https://crecies.gov.br/codigo-civil-corretagem", "https://www.projuris.com.br/ccc/cc-comentado-da-corretagem-art-722-ao-art-729/"],
                ressalvas="'inércia' (o artigo diz 'inércia ou ociosidade'); não é orientação jurídica (selo)")
    lead = {"lei": 0.3, "condicao": 0.35, "virada": 0.45, "plano": 0.35, "desfecho": 0.4, "cta": 0.35}
    build("ATIVO-D1201-21", "ATIVO_D1201_21", "D1201", ROT + "ATIVO-D1201-21_exclusividade_e_compromisso.md", "Exclusividade é compromisso",
          S, L, sfx, prog("l_protege", "v_ouseja", "f_posse"), {}, diag, apur, lead, formato="pictograma-cinematografico", grade=GRADE, slot="21:00",
          cta_curta=True, trilha="T03", ancoras={"virada": "cue:v_ouseja", "descoberta": "cue:v_chance", "insight": "cue:f_compromisso"})


if __name__ == "__main__":
    for a in sys.argv[1:] or ["12", "15", "18", "21"]:
        {"12": ep12, "15": ep15, "18": ep18, "21": ep21}[a]()
