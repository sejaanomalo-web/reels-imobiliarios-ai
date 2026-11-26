"""Lote D1210 — grade PRODUCAO/grade/2026-12-10.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-10/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1210/mk_D1210.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-10"
ROT = "ROTEIROS/ESTEIRA/2026-12-10/"


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
 "08": dict(ep="ATIVO-D1210-08", out="ATIVO_D1210_08", fn="ATIVO-D1210-08_a_conta_de_luz.md", tit="A conta de luz", formato="maquete-3d", slot="08:00", trilha="T03",
   S=[("hook", "E se todo anúncio de imóvel mostrasse quanto a casa gasta de energia?", "E se todo *anúncio* | de imóvel mostrasse | quanto a casa | *gasta de energia?*"),
      ("europa", "Na União Europeia, o anúncio de venda ou de aluguel tem que mostrar a classe de energia do imóvel.", "Na *União Europeia,* | o anúncio de venda | ou de aluguel | tem que mostrar | a *classe de energia* | do imóvel."),
      ("aqui", "Aqui, para imóvel residencial privado, essa etiqueta ainda é voluntária.", "*Aqui,* | para imóvel | residencial privado, | essa *etiqueta* | ainda é *voluntária.*"),
      ("virada", "Mas o cliente já pergunta: bate sol à tarde? A conta de luz é alta?", "Mas o cliente | *já pergunta:* | bate *sol* à tarde? | A *conta de luz* | é alta?"),
      ("acao", "Anote a face do sol, peça ao dono as últimas contas de luz e coloque isso na ficha do imóvel.", "*Anote* | a face do sol, | peça ao dono | as últimas *contas de luz* | e coloque isso | na *ficha* do imóvel."),
      ("desfecho", "O preço se paga uma vez. A conta chega todo mês.", "O preço se paga | *uma vez.* | A conta chega | *todo mês.*")],
   M=[("h_anuncio", 1, "anúncio"), ("h_energia", 1, "energia"), ("e_uniao", 2, "União"), ("e_aluguel", 2, "aluguel"), ("e_classe", 2, "classe"), ("q_aqui", 3, "Aqui"), ("q_etiqueta", 3, "etiqueta"), ("q_voluntaria", 3, "voluntária"),
      ("v_pergunta", 4, "pergunta"), ("v_sol", 4, "sol"), ("v_conta", 4, "conta"), ("a_anote", 5, "Anote"), ("a_face", 5, "face"), ("a_contas", 5, "contas"), ("a_ficha", 5, "ficha"), ("f_vez", 6, "vez"), ("f_mes", 6, "mês")],
   anc={"virada": "cue:v_pergunta", "insight": "cue:a_anote", "resolucao": "cue:f_mes"}, pron={}),
 "10": dict(ep="ATIVO-D1210-10", out="ATIVO_D1210_10", fn="ATIVO-D1210-10_os_quinze_imoveis.md", tit="Os quinze imóveis", formato="cartoon-explicativo", slot="10:00", trilha="T04",
   S=[("hook", "O cliente pediu para ver quinze imóveis no sábado.", "O cliente pediu | para ver | *quinze imóveis* | no *sábado.*"),
      ("mistura", "No décimo, ele já não lembra do terceiro. E começa a misturar a cozinha de um com a varanda do outro.", "No *décimo,* | ele já não lembra | do *terceiro.* | E começa a *misturar* | a *cozinha* de um | com a *varanda* do outro."),
      ("erro", "Mais visita não é mais escolha. É mais confusão.", "Mais visita | *não é* mais escolha. | É mais *confusão.*"),
      ("virada", "Antes, peça as três coisas de que ele não abre mão. E corte o que não passa.", "*Antes,* | peça as *três coisas* | de que ele | não abre mão. | E *corte* | o que não passa."),
      ("acao", "Leve três, quatro no máximo, e anote na saída o que ele achou de cada um.", "Leve *três,* | *quatro* no máximo, | e *anote* na saída | o que ele achou | de cada um."),
      ("desfecho", "Menos portas abertas, mais decisão.", "Menos *portas* abertas, | mais *decisão.*")],
   M=[("h_quinze", 1, "quinze"), ("h_sabado", 1, "sábado"), ("m_decimo", 2, "décimo"), ("m_terceiro", 2, "terceiro"), ("m_misturar", 2, "misturar"), ("m_cozinha", 2, "cozinha"), ("m_varanda", 2, "varanda"), ("e_escolha", 3, "escolha"), ("e_confusao", 3, "confusão"),
      ("v_antes", 4, "Antes"), ("v_tres", 4, "três"), ("v_corte", 4, "corte"), ("a_leve", 5, "Leve"), ("a_quatro", 5, "quatro"), ("a_anote", 5, "anote"), ("f_portas", 6, "portas"), ("f_decisao", 6, "decisão")],
   anc={"virada": "cue:v_antes", "insight": "cue:a_leve", "resolucao": "cue:f_decisao"}, pron={}),
 "12": dict(ep="ATIVO-D1210-12", out="ATIVO_D1210_12", fn="ATIVO-D1210-12_o_preco_da_ficha.md", tit="O preço da ficha", formato="planta-tecnica", slot="12:00", trilha="T01",
   S=[("hook", "Corretores experientes avaliaram a mesma casa. E erraram na mesma direção.", "Corretores *experientes* | avaliaram | a *mesma casa.* | E erraram | na *mesma direção.*"),
      ("estudo", "Em 1987, pesquisadores mostraram a casa a corretores com fichas iguais, menos um detalhe: o preço pedido.", "Em *1987,* | pesquisadores | mostraram a casa | a corretores | com *fichas iguais,* | menos um detalhe: | o *preço pedido.*"),
      ("resultado", "Quanto mais alto o preço da ficha, mais alta ficava a avaliação.", "Quanto *mais alto* | o preço da ficha, | mais alta ficava | a *avaliação.*"),
      ("virada", "E a maioria disse que o preço pedido não tinha influenciado.", "E a *maioria* disse | que o preço pedido | *não tinha* | influenciado."),
      ("acao", "Antes de olhar o preço pedido, avalie pelas vendas parecidas. Só depois compare.", "*Antes* de olhar | o preço pedido, | avalie pelas | *vendas parecidas.* | Só *depois* compare."),
      ("desfecho", "O primeiro número que você vê decide mais do que parece.", "O *primeiro número* | que você vê | *decide* mais | do que parece.")],
   M=[("h_experientes", 1, "experientes"), ("h_mesma", 1, "casa"), ("h_direcao", 1, "direção"), ("e_1987", 2, "1987"), ("e_fichas", 2, "fichas"), ("e_preco", 2, "pedido"), ("r_alto", 3, "alto"), ("r_avaliacao", 3, "avaliação"),
      ("v_maioria", 4, "maioria"), ("v_nao", 4, "tinha"), ("a_antes", 5, "Antes"), ("a_vendas", 5, "vendas"), ("a_depois", 5, "depois"), ("f_primeiro", 6, "primeiro"), ("f_decide", 6, "decide")],
   anc={"virada": "cue:v_maioria", "insight": "cue:a_antes", "resolucao": "cue:f_decide"}, pron={"1987": "mil novecentos e oitenta e sete"}),
 "15": dict(ep="ATIVO-D1210-15", out="ATIVO_D1210_15", fn="ATIVO-D1210-15_termine_no_melhor_comodo.md", tit="Termine no melhor cômodo", formato="pictograma-cinematografico", slot="15:00", trilha="T02",
   S=[("hook", "Seu cliente não vai lembrar da visita inteira. Só de dois momentos.", "Seu cliente | não vai lembrar | da visita *inteira.* | Só de *dois momentos.*"),
      ("estudo", "Pesquisadores mediram, minuto a minuto, o incômodo de pacientes durante um exame médico.", "Pesquisadores | *mediram,* | *minuto a minuto,* | o incômodo de pacientes | durante um *exame* médico."),
      ("resultado", "Na lembrança, pesou o pior momento e o final. A duração quase não contou.", "Na *lembrança,* | pesou o *pior momento* | e o *final.* | A *duração* | quase não contou."),
      ("virada", "Na visita é parecido: o ponto alto e o fim viram a memória do imóvel.", "Na *visita* | é parecido: | o *ponto alto* | e o *fim* | viram a *memória* do imóvel."),
      ("acao", "Planeje a rota e termine no melhor lugar: a varanda, a vista, a cozinha clara.", "*Planeje a rota* | e *termine* | no melhor lugar: | a *varanda,* | a *vista,* | a cozinha *clara.*"),
      ("desfecho", "Quem termina bem é lembrado melhor.", "Quem *termina bem* | é *lembrado* melhor.")],
   M=[("h_inteira", 1, "inteira"), ("h_dois", 1, "dois"), ("e_mediram", 2, "mediram"), ("e_minuto", 2, "minuto"), ("e_exame", 2, "exame"), ("r_lembranca", 3, "lembrança"), ("r_pior", 3, "pior"), ("r_final", 3, "final"), ("r_duracao", 3, "duração"),
      ("v_visita", 4, "visita"), ("v_alto", 4, "alto"), ("v_fim", 4, "fim"), ("v_memoria", 4, "memória"), ("a_planeje", 5, "Planeje"), ("a_termine", 5, "termine"), ("a_varanda", 5, "varanda"), ("a_vista", 5, "vista"), ("a_clara", 5, "clara"), ("f_termina", 6, "termina"), ("f_lembrado", 6, "lembrado")],
   anc={"virada": "cue:v_visita", "insight": "cue:a_planeje", "resolucao": "cue:f_lembrado"}, pron={}),
 "18": dict(ep="ATIVO-D1210-18", out="ATIVO_D1210_18", fn="ATIVO-D1210-18_os_numeros_das_casas.md", tit="Os números das casas", formato="maquete-3d", slot="18:00", trilha="T03",
   S=[("hook", "Em 1805, Paris criou uma regra para numerar as casas. Ela vale até hoje.", "Em *1805,* | *Paris* criou uma regra | para *numerar* as casas. | Ela vale | *até hoje.*"),
      ("pares", "Números pares de um lado da rua, ímpares do outro.", "Números *pares* | de um lado da rua, | *ímpares* do outro."),
      ("rio", "E a contagem começa pelo rio: quanto mais perto do Sena, menor o número.", "E a contagem | começa pelo *rio:* | quanto mais perto | do *Sena,* | *menor* o número."),
      ("virada", "Uma regra simples fez a cidade inteira virar um mapa.", "Uma regra *simples* | fez a cidade inteira | virar um *mapa.*"),
      ("ponte", "Sua carteira precisa disso: cada imóvel cadastrado do mesmo jeito, com endereço, fotos e código.", "Sua *carteira* | precisa disso: | cada imóvel cadastrado | do *mesmo jeito,* | com *endereço,* | *fotos* e *código.*"),
      ("desfecho", "Imóvel que ninguém acha não vende.", "Imóvel que *ninguém acha* | *não vende.*")],
   M=[("h_1805", 1, "1805"), ("h_paris", 1, "Paris"), ("h_numerar", 1, "numerar"), ("h_hoje", 1, "hoje"), ("p_pares", 2, "pares"), ("p_impares", 2, "ímpares"), ("r_rio", 3, "rio"), ("r_sena", 3, "Sena"), ("r_menor", 3, "menor"),
      ("v_simples", 4, "simples"), ("v_mapa", 4, "mapa"), ("p_carteira", 5, "carteira"), ("p_jeito", 5, "jeito"), ("p_endereco", 5, "endereço"), ("p_fotos", 5, "fotos"), ("p_codigo", 5, "código"), ("f_acha", 6, "acha"), ("f_vende", 6, "vende")],
   anc={"virada": "cue:v_simples", "insight": "cue:p_carteira", "resolucao": "cue:f_vende"}, pron={"1805": "mil oitocentos e cinco"}),
 "21": dict(ep="ATIVO-D1210-21", out="ATIVO_D1210_21", fn="ATIVO-D1210-21_montado_pelas_proprias_maos.md", tit="Montado pelas próprias mãos", formato="pictograma-cinematografico", slot="21:00", trilha="T04",
   S=[("hook", "Por que a gente gosta mais do móvel que montou sozinho, mesmo meio torto?", "Por que a gente | gosta *mais* | do móvel | que *montou sozinho,* | mesmo meio *torto?*"),
      ("estudo", "Em 2012, pesquisadores pediram a pessoas que montassem caixas simples de guardar coisas.", "Em *2012,* | pesquisadores | pediram a pessoas | que *montassem* | *caixas* simples | de guardar coisas."),
      ("resultado", "Quem montou aceitava pagar mais pela própria caixa do que por uma igual, já pronta.", "Quem *montou* | aceitava *pagar mais* | pela *própria* caixa | do que por uma igual, | já *pronta.*"),
      ("virada", "O que a gente ajuda a construir passa a valer mais.", "O que a gente | ajuda a *construir* | passa a *valer mais.*"),
      ("acao", "Monte a busca com o cliente: ele escolhe os critérios, você traz as opções e explica cada uma.", "*Monte a busca* | com o cliente: | ele escolhe | os *critérios,* | você traz as *opções* | e *explica* cada uma."),
      ("desfecho", "Cliente que participa da escolha defende a escolha.", "Cliente que *participa* | da escolha | *defende* a escolha.")],
   M=[("h_gosta", 1, "gosta"), ("h_montou", 1, "montou"), ("h_torto", 1, "torto"), ("e_2012", 2, "2012"), ("e_montassem", 2, "montassem"), ("e_caixas", 2, "caixas"), ("r_montou", 3, "montou"), ("r_pagar", 3, "pagar"), ("r_propria", 3, "própria"), ("r_pronta", 3, "pronta"),
      ("v_construir", 4, "construir"), ("v_valer", 4, "valer"), ("a_monte", 5, "Monte"), ("a_criterios", 5, "critérios"), ("a_opcoes", 5, "opções"), ("a_explica", 5, "explica"), ("f_participa", 6, "participa"), ("f_defende", 6, "defende")],
   anc={"virada": "cue:v_construir", "insight": "cue:a_monte", "resolucao": "cue:f_defende"}, pron={"2012": "dois mil e doze"}),
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
    build(d["ep"], d["out"], "D1210", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
