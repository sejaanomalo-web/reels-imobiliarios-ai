"""Lote D1209 — grade PRODUCAO/grade/2026-12-09.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-09/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1209/mk_D1209.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-09"
ROT = "ROTEIROS/ESTEIRA/2026-12-09/"


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
 "08": dict(ep="ATIVO-D1209-08", out="ATIVO_D1209_08", fn="ATIVO-D1209-08_o_preco_publico.md", tit="O preço público", formato="maquete-3d", slot="08:00", trilha="T03",
   S=[("hook", "E se o preço de venda de cada casa da sua cidade fosse público?", "E se o *preço de venda* | de cada casa | da sua cidade | fosse *público?*"),
      ("inglaterra", "Na Inglaterra, o governo publica de graça o valor das vendas de casas registradas desde 1995.", "Na *Inglaterra,* | o governo publica | *de graça* | o valor das *vendas* | de casas registradas | desde *1995.*"),
      ("sp", "Aqui, a cidade de São Paulo já publica todo mês o valor das transações em que o ITBI foi pago.", "Aqui, | a cidade de *São Paulo* | já publica *todo mês* | o valor das *transações* | em que o *ITBI* foi pago."),
      ("virada", "O anúncio mostra o que o dono quer. A transação mostra o que alguém pagou.", "O *anúncio* mostra | o que o dono *quer.* | A *transação* mostra | o que alguém *pagou.*"),
      ("acao", "Compare com vendas reais da rua. E guarde, de cada negócio seu, o valor pedido e o valor fechado.", "*Compare* | com vendas *reais* da rua. | E *guarde,* | de cada negócio seu, | o valor *pedido* | e o valor *fechado.*"),
      ("desfecho", "Quem argumenta com venda real não discute opinião.", "Quem argumenta | com *venda real* | não discute *opinião.*")],
   M=[("h_preco", 1, "preço"), ("h_publico", 1, "público"), ("i_inglaterra", 2, "Inglaterra"), ("i_graca", 2, "graça"), ("i_vendas", 2, "vendas"), ("i_1995", 2, "1995"), ("p_paulo", 3, "Paulo"), ("p_mes", 3, "mês"), ("p_transacoes", 3, "transações"), ("p_itbi", 3, "ITBI"),
      ("v_anuncio", 4, "anúncio"), ("v_quer", 4, "quer"), ("v_transacao", 4, "transação"), ("v_pagou", 4, "pagou"), ("a_compare", 5, "Compare"), ("a_reais", 5, "reais"), ("a_guarde", 5, "guarde"), ("a_pedido", 5, "pedido"), ("a_fechado", 5, "fechado"), ("f_real", 6, "real"), ("f_opiniao", 6, "opinião")],
   anc={"virada": "cue:v_anuncio", "insight": "cue:a_compare", "resolucao": "cue:f_opiniao"}, pron={"1995": "mil novecentos e noventa e cinco", "ITBI": "í tê bê í"}),
 "10": dict(ep="ATIVO-D1209-10", out="ATIVO_D1209_10", fn="ATIVO-D1209-10_o_audio_de_cinco_minutos.md", tit="O áudio de cinco minutos", formato="cartoon-explicativo", slot="10:00", trilha="T05",
   S=[("hook", "O cliente mandou um áudio de cinco minutos. E a única coisa que importava estava no minuto quatro.", "O cliente mandou | um *áudio* | de *cinco minutos.* | E a única coisa | que *importava* | estava no *minuto quatro.*"),
      ("conteudo", "Três quartos, perto da escola, e o teto de preço. Perdidos entre a reforma da cunhada e o trânsito.", "*Três quartos,* | perto da *escola,* | e o *teto* de preço. | Perdidos | entre a reforma da *cunhada* | e o *trânsito.*"),
      ("erro", "Se você responde com outro áudio, a informação se perde de novo.", "Se você responde | com *outro áudio,* | a informação | se *perde* de novo."),
      ("virada", "Ouça inteiro e devolva por escrito, em tópicos: entendi isso, isso e isso. Está certo?", "*Ouça inteiro* | e devolva | *por escrito,* | em *tópicos:* | entendi isso, | isso e isso. | Está *certo?*"),
      ("ganho", "O cliente corrige na hora. E você fica com a ficha dele pronta.", "O cliente *corrige* | na hora. | E você fica | com a *ficha* dele | *pronta.*"),
      ("desfecho", "Áudio é conversa. Por escrito é combinado.", "Áudio é *conversa.* | Por escrito | é *combinado.*")],
   M=[("h_audio", 1, "áudio"), ("h_cinco", 1, "cinco"), ("h_importava", 1, "importava"), ("h_quatro", 1, "quatro"), ("c_quartos", 2, "quartos"), ("c_escola", 2, "escola"), ("c_teto", 2, "teto"), ("c_cunhada", 2, "cunhada"), ("c_transito", 2, "trânsito"), ("e_outro", 3, "outro"), ("e_perde", 3, "perde"),
      ("v_ouca", 4, "Ouça"), ("v_escrito", 4, "escrito"), ("v_topicos", 4, "tópicos"), ("v_certo", 4, "certo"), ("g_corrige", 5, "corrige"), ("g_ficha", 5, "ficha"), ("g_pronta", 5, "pronta"), ("f_conversa", 6, "conversa"), ("f_combinado", 6, "combinado")],
   anc={"virada": "cue:v_ouca", "insight": "cue:g_corrige", "resolucao": "cue:f_combinado"}, pron={}),
 "12": dict(ep="ATIVO-D1209-12", out="ATIVO_D1209_12", fn="ATIVO-D1209-12_a_caneca_que_vale_o_dobro.md", tit="A caneca que vale o dobro", formato="planta-tecnica", slot="12:00", trilha="T01",
   S=[("hook", "Dê uma caneca a uma pessoa, e ela passa a valer mais que o dobro.", "Dê uma *caneca* | a uma pessoa, | e ela passa a valer | mais que o *dobro.*"),
      ("estudo", "Num estudo de 1990, pesquisadores deram canecas a metade dos participantes e abriram um mercado entre eles.", "Num *estudo* de *1990,* | pesquisadores | deram canecas | a *metade* dos participantes | e abriram um *mercado* | entre eles."),
      ("resultado", "Quem ganhou a caneca pedia mais que o dobro do que os outros topavam pagar.", "Quem *ganhou* a caneca | *pedia* | mais que o *dobro* | do que os outros | topavam *pagar.*"),
      ("virada", "Isso tem nome: efeito dotação. Agora pense no dono de uma casa em que ele viveu vinte anos.", "Isso tem nome: | *efeito dotação.* | Agora pense | no *dono* de uma casa | em que ele viveu | *vinte anos.*"),
      ("acao", "Ouça a história da casa primeiro. Depois, mostre o que o mercado pagou por casas parecidas.", "Ouça a *história* | da casa *primeiro.* | *Depois,* | mostre o que o *mercado* pagou | por casas *parecidas.*"),
      ("desfecho", "O dono não está mentindo. Ele está sentindo o preço.", "O dono | não está *mentindo.* | Ele está *sentindo* | o preço.")],
   M=[("h_caneca", 1, "caneca"), ("h_dobro", 1, "dobro"), ("e_estudo", 2, "estudo"), ("e_metade", 2, "metade"), ("e_mercado", 2, "mercado"), ("r_ganhou", 3, "ganhou"), ("r_pedia", 3, "pedia"), ("r_dobro", 3, "dobro"), ("r_pagar", 3, "pagar"),
      ("v_efeito", 4, "efeito"), ("v_dono", 4, "dono"), ("v_vinte", 4, "vinte"), ("a_historia", 5, "história"), ("a_primeiro", 5, "primeiro"), ("a_mercado", 5, "mercado"), ("a_parecidas", 5, "parecidas"), ("f_mentindo", 6, "mentindo"), ("f_sentindo", 6, "sentindo")],
   anc={"virada": "cue:v_efeito", "insight": "cue:a_historia", "resolucao": "cue:f_sentindo"}, pron={"1990": "mil novecentos e noventa"}),
 "15": dict(ep="ATIVO-D1209-15", out="ATIVO_D1209_15", fn="ATIVO-D1209-15_imagine_que_deu_errado.md", tit="Imagine que deu errado", formato="pictograma-cinematografico", slot="15:00", trilha="T04",
   S=[("hook", "A pergunta mais útil da visita é imaginar que a compra deu errado.", "A pergunta *mais útil* | da visita | é imaginar | que a compra | *deu errado.*"),
      ("metodo", "Um psicólogo criou um método para projetos: antes de começar, a equipe imagina que fracassou e explica por quê.", "Um *psicólogo* | criou um *método* | para projetos: | *antes* de começar, | a equipe imagina | que *fracassou* | e explica *por quê.*"),
      ("estudo", "Num estudo citado por ele, imaginar o fato já consumado melhorou em trinta por cento a identificação dos motivos.", "Num *estudo* | citado por ele, | imaginar o fato | já *consumado* | melhorou em | *trinta por cento* | a identificação | dos *motivos.*"),
      ("virada", "Na visita, pergunte: imagine que daqui a um ano você se arrependeu desta compra. Por quê?", "Na visita, | *pergunte:* | imagine que | daqui a *um ano* | você se *arrependeu* | desta compra. | *Por quê?*"),
      ("respostas", "Barulho, escola longe, condomínio caro. O cliente fala agora o que só diria depois.", "*Barulho,* | *escola longe,* | *condomínio caro.* | O cliente fala *agora* | o que só diria *depois.*"),
      ("desfecho", "O arrependimento que aparece antes vira pergunta. Depois, vira distrato.", "O arrependimento | que aparece *antes* | vira *pergunta.* | Depois, | vira *distrato.*")],
   M=[("h_util", 1, "útil"), ("h_errado", 1, "errado"), ("m_psicologo", 2, "psicólogo"), ("m_metodo", 2, "método"), ("m_antes", 2, "antes"), ("m_fracassou", 2, "fracassou"), ("e_estudo", 3, "estudo"), ("e_consumado", 3, "consumado"), ("e_trinta", 3, "trinta"), ("e_motivos", 3, "motivos"),
      ("v_pergunte", 4, "pergunte"), ("v_ano", 4, "ano"), ("v_arrependeu", 4, "arrependeu"), ("r_barulho", 5, "Barulho"), ("r_escola", 5, "escola"), ("r_condominio", 5, "condomínio"), ("r_agora", 5, "agora"), ("f_antes", 6, "antes"), ("f_pergunta", 6, "pergunta"), ("f_distrato", 6, "distrato")],
   anc={"virada": "cue:v_pergunte", "insight": "cue:r_agora", "resolucao": "cue:f_distrato"}, pron={}),
 "18": dict(ep="ATIVO-D1209-18", out="ATIVO_D1209_18", fn="ATIVO-D1209-18_o_que_ficou_registrado.md", tit="O que ficou registrado", formato="maquete-3d", slot="18:00", trilha="T02",
   S=[("hook", "Esta igreja começou em 1882. E a torre mais alta só ficou pronta este ano.", "Esta *igreja* | começou em *1882.* | E a torre *mais alta* | só ficou *pronta* | *este ano.*"),
      ("autor", "Gaudí morreu em 1926, com a obra longe do fim.", "*Gaudí* morreu | em *1926,* | com a obra | *longe do fim.*"),
      ("guerra", "Dez anos depois, na guerra, queimaram os desenhos e quebraram as maquetes de gesso.", "Dez anos depois, | na *guerra,* | *queimaram* os desenhos | e *quebraram* | as maquetes de *gesso.*"),
      ("virada", "A obra continuou porque juntaram os pedaços, as fotos e as plantas publicadas.", "A obra *continuou* | porque juntaram | os *pedaços,* | as *fotos* | e as *plantas* publicadas."),
      ("ponte", "Se o seu atendimento só existe na sua cabeça, ele para no dia em que você parar.", "Se o seu *atendimento* | só existe | na sua *cabeça,* | ele *para* | no dia em que | você *parar.*"),
      ("desfecho", "Registre como quem constrói para outra pessoa terminar.", "*Registre* | como quem *constrói* | para outra pessoa | *terminar.*")],
   M=[("h_igreja", 1, "igreja"), ("h_1882", 1, "1882"), ("h_alta", 1, "alta"), ("h_pronta", 1, "pronta"), ("a_gaudi", 2, "Gaudí"), ("a_1926", 2, "1926"), ("a_longe", 2, "longe"), ("g_guerra", 3, "guerra"), ("g_queimaram", 3, "queimaram"), ("g_quebraram", 3, "quebraram"), ("g_gesso", 3, "gesso"),
      ("v_continuou", 4, "continuou"), ("v_pedacos", 4, "pedaços"), ("v_fotos", 4, "fotos"), ("v_plantas", 4, "plantas"), ("p_atendimento", 5, "atendimento"), ("p_cabeca", 5, "cabeça"), ("p_para", 5, "para"), ("p_parar", 5, "parar"), ("f_registre", 6, "Registre"), ("f_constroi", 6, "constrói"), ("f_terminar", 6, "terminar")],
   anc={"virada": "cue:v_continuou", "insight": "cue:p_atendimento", "resolucao": "cue:f_terminar"}, pron={"1882": "mil oitocentos e oitenta e dois", "1926": "mil novecentos e vinte e seis", "Gaudí": "Gaudí"}),
 "21": dict(ep="ATIVO-D1209-21", out="ATIVO_D1209_21", fn="ATIVO-D1209-21_os_180_dias.md", tit="Os 180 dias", formato="planta-tecnica", slot="21:00", trilha="T05",
   S=[("hook", "O apartamento na planta atrasou seis meses. E pode estar tudo dentro do contrato.", "O apartamento *na planta* | atrasou *seis meses.* | E pode estar tudo | *dentro do contrato.*"),
      ("regra", "A lei permite uma tolerância de até 180 dias depois da data prometida.", "A *lei* permite | uma *tolerância* | de até *180 dias* | depois da data *prometida.*"),
      ("condicao", "Mas só se essa cláusula estiver no contrato, clara e destacada.", "Mas *só se* | essa *cláusula* | estiver no contrato, | *clara* e *destacada.*"),
      ("virada", "Passou disso, quem comprou pode desfazer o negócio e receber o que pagou, com a multa. Ou manter e ser indenizado.", "*Passou disso,* | quem comprou pode | *desfazer* o negócio | e *receber* o que pagou, | com a *multa.* | Ou *manter* | e ser *indenizado.*"),
      ("acao", "Na venda, mostre essa cláusula ao cliente e anote a data prometida.", "Na venda, | *mostre* essa cláusula | ao cliente | e *anote* | a data prometida."),
      ("desfecho", "Atraso combinado é prazo. Atraso escondido vira briga.", "Atraso *combinado* | é *prazo.* | Atraso *escondido* | vira *briga.*")],
   M=[("h_planta", 1, "planta"), ("h_meses", 1, "meses"), ("h_contrato", 1, "contrato"), ("r_lei", 2, "lei"), ("r_tolerancia", 2, "tolerância"), ("r_180", 2, "180"), ("r_prometida", 2, "prometida"), ("c_clausula", 3, "cláusula"), ("c_clara", 3, "clara"), ("c_destacada", 3, "destacada"),
      ("v_passou", 4, "Passou"), ("v_desfazer", 4, "desfazer"), ("v_receber", 4, "receber"), ("v_multa", 4, "multa"), ("v_manter", 4, "manter"), ("v_indenizado", 4, "indenizado"), ("a_mostre", 5, "mostre"), ("a_anote", 5, "anote"), ("f_combinado", 6, "combinado"), ("f_prazo", 6, "prazo"), ("f_escondido", 6, "escondido"), ("f_briga", 6, "briga")],
   anc={"virada": "cue:v_passou", "insight": "cue:a_mostre", "resolucao": "cue:f_briga"}, pron={"180": "cento e oitenta"}),
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
    build(d["ep"], d["out"], "D1209", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
