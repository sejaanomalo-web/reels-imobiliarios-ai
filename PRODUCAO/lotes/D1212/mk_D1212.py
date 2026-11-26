"""Lote D1212 — grade PRODUCAO/grade/2026-12-12.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-12/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1212/mk_D1212.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-12"
ROT = "ROTEIROS/ESTEIRA/2026-12-12/"


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
 "08": dict(ep="ATIVO-D1212-08", out="ATIVO_D1212_08", fn="ATIVO-D1212-08_a_ficha_tecnica_da_casa.md", tit="A ficha técnica da casa", formato="planta-tecnica", slot="08:00", trilha="T03",
   S=[("hook", "E se toda casa à venda viesse com uma ficha técnica, igual carro?", "E se toda *casa* | à venda viesse | com uma *ficha técnica,* | igual *carro?*"),
      ("portugal", "Em Portugal, casa nova já vem: desde 2004 existe a Ficha Técnica da Habitação.", "Em *Portugal,* | casa nova *já vem:* | desde *2004* | existe a *Ficha Técnica* | da Habitação."),
      ("conteudo", "Ela descreve a construção, com áreas, materiais e instalações, e vai para as mãos do comprador.", "Ela descreve | a *construção,* | com *áreas,* | *materiais* | e *instalações,* | e vai para as mãos | do *comprador.*"),
      ("virada", "Aqui, essas respostas costumam aparecer só depois da visita. Quando aparecem.", "*Aqui,* | essas respostas | costumam aparecer | só *depois* da visita. | Quando *aparecem.*"),
      ("acao", "Monte a sua: metragem de cada cômodo, ano da construção, reformas feitas e a documentação em ordem.", "*Monte* a sua: | *metragem* | de cada cômodo, | *ano* da construção, | *reformas* feitas | e a *documentação* | em ordem."),
      ("desfecho", "A visita mostra a parede. A ficha mostra o que tem dentro dela.", "A visita | mostra a *parede.* | A ficha mostra | o que tem *dentro* dela.")],
   M=[("h_ficha", 1, "ficha"), ("h_carro", 1, "carro"), ("p_portugal", 2, "Portugal"), ("p_2004", 2, "2004"), ("p_ficha", 2, "Ficha"), ("c_construcao", 3, "construção"), ("c_areas", 3, "áreas"), ("c_materiais", 3, "materiais"), ("c_instalacoes", 3, "instalações"), ("c_comprador", 3, "comprador"),
      ("v_aqui", 4, "Aqui"), ("v_depois", 4, "depois"), ("a_monte", 5, "Monte"), ("a_metragem", 5, "metragem"), ("a_ano", 5, "ano"), ("a_reformas", 5, "reformas"), ("a_documentacao", 5, "documentação"), ("f_parede", 6, "parede"), ("f_dentro", 6, "dentro")],
   anc={"virada": "cue:v_aqui", "insight": "cue:a_monte", "resolucao": "cue:f_dentro"}, pron={"2004": "dois mil e quatro"}),
 "10": dict(ep="ATIVO-D1212-10", out="ATIVO_D1212_10", fn="ATIVO-D1212-10_qual_o_valor.md", tit="Qual o valor?", formato="cartoon-explicativo", slot="10:00", trilha="T02",
   S=[("hook", "O lead manda só isso: qual o valor?", "O lead manda | só isso: | qual o *valor?*"),
      ("some", "Você responde o preço. Ele visualiza. E some.", "Você responde | o *preço.* | Ele *visualiza.* | E *some.*"),
      ("compara", "Preço sozinho vira comparação com o anúncio mais barato do bairro.", "*Preço sozinho* | vira *comparação* | com o anúncio | mais *barato* | do bairro."),
      ("virada", "A resposta que segura a conversa tem o preço e uma pergunta.", "A resposta | que *segura* a conversa | tem o *preço* | e uma *pergunta.*"),
      ("acao", "Diga o valor e pergunte: é para morar ou para investir? Quantos quartos você precisa?", "Diga o *valor* | e *pergunte:* | é para *morar* | ou para *investir?* | Quantos *quartos* | você precisa?"),
      ("desfecho", "Quem só responde encerra. Quem pergunta atende.", "Quem só responde | *encerra.* | Quem pergunta | *atende.*")],
   M=[("h_lead", 1, "lead"), ("h_valor", 1, "valor"), ("s_preco", 2, "preço"), ("s_visualiza", 2, "visualiza"), ("s_some", 2, "some"), ("c_sozinho", 3, "sozinho"), ("c_comparacao", 3, "comparação"), ("c_barato", 3, "barato"),
      ("v_segura", 4, "segura"), ("v_pergunta", 4, "pergunta"), ("a_valor", 5, "valor"), ("a_morar", 5, "morar"), ("a_investir", 5, "investir"), ("a_quartos", 5, "quartos"), ("f_encerra", 6, "encerra"), ("f_atende", 6, "atende")],
   anc={"virada": "cue:v_segura", "insight": "cue:a_valor", "resolucao": "cue:f_atende"}, pron={}),
 "12": dict(ep="ATIVO-D1212-12", out="ATIVO_D1212_12", fn="ATIVO-D1212-12_o_bastao.md", tit="O bastão", formato="pictograma-cinematografico", slot="12:00", trilha="T04",
   S=[("hook", "Em 2016, o Japão ganhou a prata olímpica no revezamento sem ter os velocistas mais rápidos.", "Em *2016,* | o *Japão* ganhou | a *prata* olímpica | no *revezamento* | sem ter os velocistas | mais *rápidos.*"),
      ("passagem", "A diferença estava na passagem do bastão, de baixo para cima, treinada durante anos.", "A diferença estava | na *passagem* do bastão, | de *baixo* para cima, | *treinada* | durante anos."),
      ("troca", "Revezamento se perde na troca, não na reta.", "Revezamento | se perde | na *troca,* | não na *reta.*"),
      ("virada", "Com cliente é igual: ele se perde quando passa de uma mão para outra.", "Com *cliente* é igual: | ele se *perde* | quando passa | de uma *mão* para outra."),
      ("acao", "Quando passar um cliente para um colega, passe junto o histórico: o que viu, o que recusou e o que pediu.", "Quando passar | um cliente | para um *colega,* | passe junto | o *histórico:* | o que *viu,* | o que *recusou* | e o que *pediu.*"),
      ("desfecho", "Bastão bem passado não perde velocidade.", "*Bastão* bem passado | não perde *velocidade.*")],
   M=[("h_2016", 1, "2016"), ("h_japao", 1, "Japão"), ("h_prata", 1, "prata"), ("h_rapidos", 1, "rápidos"), ("p_passagem", 2, "passagem"), ("p_baixo", 2, "baixo"), ("p_treinada", 2, "treinada"), ("t_troca", 3, "troca"), ("t_reta", 3, "reta"),
      ("v_cliente", 4, "cliente"), ("v_mao", 4, "mão"), ("a_colega", 5, "colega"), ("a_historico", 5, "histórico"), ("a_viu", 5, "viu"), ("a_recusou", 5, "recusou"), ("a_pediu", 5, "pediu"), ("f_bastao", 6, "Bastão"), ("f_velocidade", 6, "velocidade")],
   anc={"virada": "cue:v_cliente", "insight": "cue:a_historico", "resolucao": "cue:f_velocidade"}, pron={"2016": "dois mil e dezesseis"}),
 "15": dict(ep="ATIVO-D1212-15", out="ATIVO_D1212_15", fn="ATIVO-D1212-15_o_resumo_do_mesmo_dia.md", tit="O resumo do mesmo dia", formato="cartoon-explicativo", slot="15:00", trilha="T01",
   S=[("hook", "No dia seguinte à visita, o cliente já esqueceu boa parte do que viu.", "No dia *seguinte* | à visita, | o cliente já *esqueceu* | boa parte | do que viu."),
      ("prova", "Em 1885, um psicólogo alemão mediu isso: a memória cai rápido nas primeiras horas.", "Em *1885,* | um psicólogo alemão | *mediu* isso: | a *memória* | cai *rápido* | nas primeiras horas."),
      ("casa", "E o que ele não lembra, ele não defende na conversa em casa.", "E o que ele | *não lembra,* | ele não *defende* | na conversa | em *casa.*"),
      ("virada", "Não espere ele perguntar.", "Não *espere* | ele perguntar."),
      ("acao", "No mesmo dia, mande um resumo: três fotos, o que ele gostou e o que ficou de dúvida.", "No *mesmo dia,* | mande um *resumo:* | três *fotos,* | o que ele *gostou* | e o que ficou | de *dúvida.*"),
      ("desfecho", "O imóvel que fica na memória é o que entra na conversa.", "O imóvel | que fica na *memória* | é o que entra | na *conversa.*")],
   M=[("h_seguinte", 1, "seguinte"), ("h_esqueceu", 1, "esqueceu"), ("p_1885", 2, "1885"), ("p_mediu", 2, "mediu"), ("p_memoria", 2, "memória"), ("p_rapido", 2, "rápido"), ("c_lembra", 3, "lembra"), ("c_defende", 3, "defende"), ("c_casa", 3, "casa"),
      ("v_espere", 4, "espere"), ("a_mesmo", 5, "mesmo"), ("a_resumo", 5, "resumo"), ("a_fotos", 5, "fotos"), ("a_gostou", 5, "gostou"), ("a_duvida", 5, "dúvida"), ("f_memoria", 6, "memória"), ("f_conversa", 6, "conversa")],
   anc={"virada": "cue:v_espere", "insight": "cue:a_resumo", "resolucao": "cue:f_conversa"}, pron={"1885": "mil oitocentos e oitenta e cinco"}),
 "18": dict(ep="ATIVO-D1212-18", out="ATIVO_D1212_18", fn="ATIVO-D1212-18_a_casa_em_cima_da_cachoeira.md", tit="A casa em cima da cachoeira", formato="maquete-3d", slot="18:00", trilha="T02",
   S=[("hook", "Uma família pediu uma casa com vista para a cachoeira. O arquiteto construiu a casa em cima dela.", "Uma família pediu | uma casa com *vista* | para a *cachoeira.* | O arquiteto | construiu a casa | em *cima* dela."),
      ("quando", "Foi em 1935, nos Estados Unidos. Conta-se que o dono não gostou de início.", "Foi em *1935,* | nos Estados Unidos. | Conta-se que o dono | *não gostou* | de início."),
      ("porque", "O arquiteto queria que eles vivessem com a cachoeira, e não só olhassem para ela.", "O arquiteto queria | que eles *vivessem* | com a cachoeira, | e não só *olhassem* | para ela."),
      ("virada", "O pedido era a vista. O desejo era a cachoeira.", "O *pedido* | era a vista. | O *desejo* | era a cachoeira."),
      ("acao", "Quando o cliente pedir três quartos, pergunte para quê: filhos, escritório ou visitas?", "Quando o cliente pedir | *três quartos,* | pergunte *para quê:* | *filhos,* | *escritório* | ou *visitas?*"),
      ("desfecho", "Quem entende o desejo encontra o imóvel que o pedido não descreve.", "Quem entende | o *desejo* | encontra o imóvel | que o pedido | *não descreve.*")],
   M=[("h_vista", 1, "vista"), ("h_cachoeira", 1, "cachoeira"), ("h_cima", 1, "cima"), ("q_1935", 2, "1935"), ("q_dono", 2, "dono"), ("q_gostou", 2, "gostou"), ("p_vivessem", 3, "vivessem"), ("p_olhassem", 3, "olhassem"),
      ("v_pedido", 4, "pedido"), ("v_desejo", 4, "desejo"), ("a_quartos", 5, "quartos"), ("a_pergunte", 5, "pergunte"), ("a_filhos", 5, "filhos"), ("a_escritorio", 5, "escritório"), ("a_visitas", 5, "visitas"), ("f_desejo", 6, "desejo"), ("f_descreve", 6, "descreve")],
   anc={"virada": "cue:v_pedido", "insight": "cue:a_pergunte", "resolucao": "cue:f_descreve"}, pron={"1935": "mil novecentos e trinta e cinco"}),
 "21": dict(ep="ATIVO-D1212-21", out="ATIVO_D1212_21", fn="ATIVO-D1212-21_o_inquilino_e_a_visita.md", tit="O inquilino e a visita", formato="pictograma-cinematografico", slot="21:00", trilha="T01",
   S=[("hook", "O imóvel está alugado e o inquilino diz que não vai deixar ninguém visitar.", "O imóvel | está *alugado* | e o *inquilino* diz | que não vai deixar | *ninguém* visitar."),
      ("lei", "A Lei do Inquilinato diz que ele precisa permitir a visita de quem quer comprar.", "A *Lei do Inquilinato* | diz que ele | *precisa permitir* | a visita | de quem quer *comprar.*"),
      ("condicao", "Mas com dia e hora combinados antes. Aparecer de surpresa não vale.", "Mas com *dia e hora* | *combinados* antes. | Aparecer de *surpresa* | não vale."),
      ("virada", "A lei dá o direito. O jeito de pedir decide se a porta abre.", "A lei dá | o *direito.* | O *jeito* de pedir | decide | se a *porta* abre."),
      ("acao", "Agende por escrito, com antecedência, e chegue no horário que ele aceitou.", "*Agende* por escrito, | com *antecedência,* | e chegue | no *horário* | que ele *aceitou.*"),
      ("desfecho", "Inquilino avisado com antecedência abre a porta de boa vontade.", "Inquilino *avisado* | com antecedência | abre a porta | de *boa vontade.*")],
   M=[("h_alugado", 1, "alugado"), ("h_inquilino", 1, "inquilino"), ("h_ninguem", 1, "ninguém"), ("l_lei", 2, "Lei"), ("l_permitir", 2, "permitir"), ("l_comprar", 2, "comprar"), ("c_dia", 3, "dia"), ("c_combinados", 3, "combinados"), ("c_surpresa", 3, "surpresa"),
      ("v_direito", 4, "direito"), ("v_jeito", 4, "jeito"), ("v_porta", 4, "porta"), ("a_agende", 5, "Agende"), ("a_escrito", 5, "escrito"), ("a_antecedencia", 5, "antecedência"), ("a_horario", 5, "horário"), ("f_avisado", 6, "avisado"), ("f_vontade", 6, "vontade")],
   anc={"virada": "cue:v_direito", "insight": "cue:a_agende", "resolucao": "cue:f_vontade"}, pron={}),
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
    build(d["ep"], d["out"], "D1212", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
