"""Lote D1206 — grade PRODUCAO/grade/2026-12-06.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-06/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1206/mk_D1206.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-06"
ROT = "ROTEIROS/ESTEIRA/2026-12-06/"


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
 "08": dict(ep="ATIVO-D1206-08", out="ATIVO_D1206_08", fn="ATIVO-D1206-08_casa_que_vence.md", tit="A casa que vence", formato="maquete-3d", slot="08:00", trilha="T04",
   S=[("hook", "E se a sua casa perdesse valor como um carro?", "E se a sua *casa* | perdesse *valor* | como um *carro?*"),
      ("japao", "No Japão, uma casa é demolida, em média, com uns trinta e dois anos. Nos Estados Unidos, com mais que o dobro.", "No *Japão,* | uma casa é *demolida,* | em média, | com uns *trinta e dois anos.* | Nos Estados Unidos, | com mais que o *dobro.*"),
      ("terreno", "Na conta dos impostos de lá, uma casa de madeira se deprecia em vinte e dois anos. O que segura o valor é o terreno.", "Na conta dos impostos | de lá, | uma casa de madeira | se deprecia | em *vinte e dois anos.* | O que segura o valor | é o *terreno.*"),
      ("virada", "Aqui é diferente. Mas a pergunta do comprador é a mesma: o que ainda vai valer daqui a dez anos?", "Aqui é *diferente.* | Mas a pergunta | do comprador | é a mesma: | o que ainda vai *valer* | daqui a *dez anos?*"),
      ("acao", "Mostre o que segura o preço: a localização, o terreno, a estrutura e a manutenção. Não só o acabamento novo.", "Mostre o que *segura* o preço: | a *localização,* | o *terreno,* | a *estrutura* | e a *manutenção.* | Não só | o acabamento novo."),
      ("desfecho", "O acabamento envelhece. O endereço, não.", "O acabamento *envelhece.* | O *endereço,* não.")],
   M=[("h_casa", 1, "casa"), ("h_carro", 1, "carro"), ("j_japao", 2, "Japão"), ("j_demolida", 2, "demolida"), ("j_32", 2, "trinta"), ("j_dobro", 2, "dobro"), ("t_madeira", 3, "madeira"), ("t_22", 3, "vinte"), ("t_terreno", 3, "terreno"),
      ("v_diferente", 4, "diferente"), ("v_valer", 4, "valer"), ("a_localizacao", 5, "localização"), ("a_terreno", 5, "terreno"), ("a_estrutura", 5, "estrutura"), ("a_manutencao", 5, "manutenção"), ("a_acabamento", 5, "acabamento"),
      ("f_envelhece", 6, "envelhece"), ("f_endereco", 6, "endereço")],
   anc={"virada": "cue:v_diferente", "insight": "cue:a_localizacao", "resolucao": "cue:f_endereco"}, pron={}),
 "10": dict(ep="ATIVO-D1206-10", out="ATIVO_D1206_10", fn="ATIVO-D1206-10_dez_imoveis_no_sabado.md", tit="Dez imóveis no sábado", formato="cartoon-explicativo", slot="10:00", trilha="T05",
   S=[("hook", "O cliente quer ver dez imóveis no sábado.", "O cliente | quer ver | *dez imóveis* | no *sábado.*"),
      ("rota", "Você monta a rota, roda o dia inteiro, e no fim ele não lembra qual tinha a varanda.", "Você monta a *rota,* | roda o *dia inteiro,* | e no fim | ele *não lembra* | qual tinha | a *varanda.*"),
      ("mistura", "Depois de alguns imóveis, as salas, os quartos e os preços começam a se misturar.", "Depois de alguns imóveis, | as *salas,* | os *quartos* | e os *preços* | começam a se *misturar.*"),
      ("virada", "Mais visitas não dão mais certeza. Dão mais confusão.", "Mais visitas | não dão mais *certeza.* | Dão mais *confusão.*"),
      ("acao", "Escolha três ou quatro, cada um com um motivo, e entregue uma ficha para ele anotar o que gostou e o que não gostou em cada um.", "Escolha *três ou quatro,* | cada um | com um *motivo,* | e entregue uma *ficha* | para ele anotar | o que *gostou* | e o que *não gostou* | em cada um."),
      ("desfecho", "No fim do sábado, ele não precisa lembrar de tudo. Precisa conseguir escolher.", "No fim do sábado, | ele não precisa | lembrar de tudo. | Precisa conseguir *escolher.*")],
   M=[("h_dez", 1, "dez"), ("h_sabado", 1, "sábado"), ("r_rota", 2, "rota"), ("r_dia", 2, "dia"), ("r_lembra", 2, "lembra"), ("r_varanda", 2, "varanda"), ("m_salas", 3, "salas"), ("m_quartos", 3, "quartos"), ("m_precos", 3, "preços"), ("m_misturar", 3, "misturar"),
      ("v_certeza", 4, "certeza"), ("v_confusao", 4, "confusão"), ("a_tres", 5, "três"), ("a_motivo", 5, "motivo"), ("a_ficha", 5, "ficha"), ("a_gostou", 5, "gostou"), ("f_tudo", 6, "tudo"), ("f_escolher", 6, "escolher")],
   anc={"virada": "cue:v_certeza", "insight": "cue:a_ficha", "resolucao": "cue:f_escolher"}, pron={}),
 "12": dict(ep="ATIVO-D1206-12", out="ATIVO_D1206_12", fn="ATIVO-D1206-12_dezenove_itens.md", tit="Dezenove itens", formato="planta-tecnica", slot="12:00", trilha="T03",
   S=[("hook", "Uma lista de dezenove itens ajudou a reduzir mortes em cirurgias.", "Uma *lista* | de *dezenove itens* | ajudou a reduzir | mortes | em *cirurgias.*"),
      ("estudo", "Em 2009, um estudo em oito hospitais de oito países testou um checklist da Organização Mundial da Saúde.", "Em *2009,* | um estudo | em *oito hospitais* | de oito países | testou um *checklist* | da Organização Mundial da Saúde."),
      ("numeros", "Depois da lista, as mortes caíram de um e meio por cento para menos de um. As complicações, de onze para sete por cento.", "Depois da lista, | as mortes caíram | de *um e meio por cento* | para *menos de um.* | As complicações, | de *onze* | para *sete por cento.*"),
      ("virada", "As equipes já sabiam tudo aquilo. A lista só não deixava esquecer.", "As equipes | já *sabiam* | tudo aquilo. | A lista | só não deixava *esquecer.*"),
      ("acao", "No fechamento, faça a sua: documentos do vendedor, certidões, matrícula atualizada, prazo do financiamento e data das chaves.", "No *fechamento,* | faça a sua: | *documentos* do vendedor, | *certidões,* | *matrícula* atualizada, | *prazo* do financiamento | e data das *chaves.*"),
      ("desfecho", "Experiência não protege do esquecimento. Lista protege.", "Experiência | não protege | do esquecimento. | *Lista protege.*")],
   M=[("h_lista", 1, "lista"), ("h_dezenove", 1, "dezenove"), ("h_cirurgias", 1, "cirurgias"), ("e_2009", 2, "2009"), ("e_hospitais", 2, "hospitais"), ("e_checklist", 2, "checklist"), ("n_mortes", 3, "mortes"), ("n_menos", 3, "menos"), ("n_onze", 3, "onze"), ("n_sete", 3, "sete"),
      ("v_sabiam", 4, "sabiam"), ("v_esquecer", 4, "esquecer"), ("a_fechamento", 5, "fechamento"), ("a_documentos", 5, "documentos"), ("a_certidoes", 5, "certidões"), ("a_matricula", 5, "matrícula"), ("a_prazo", 5, "prazo"), ("a_chaves", 5, "chaves"),
      ("f_experiencia", 6, "Experiência"), ("f_lista", 6, "Lista")],
   anc={"virada": "cue:v_sabiam", "insight": "cue:a_fechamento", "resolucao": "cue:f_lista"}, pron={"2009": "dois mil e nove", "checklist": "chéck-list"}),
 "15": dict(ep="ATIVO-D1206-15", out="ATIVO_D1206_15", fn="ATIVO-D1206-15_o_horario_da_rotina.md", tit="O horário da rotina", formato="pictograma-cinematografico", slot="15:00", trilha="T02",
   S=[("hook", "O imóvel que você mostra às dez da manhã não é o mesmo das seis da tarde.", "O imóvel | que você mostra | às *dez da manhã* | não é o mesmo | das *seis da tarde.*"),
      ("manha", "Às dez, a rua é calma e o sol entra na sala.", "Às dez, | a rua é *calma* | e o *sol* | entra na sala."),
      ("tarde", "Às seis, tem o trânsito da volta, a saída da escola e a vaga disputada.", "Às seis, | tem o *trânsito* da volta, | a saída da *escola* | e a *vaga* disputada."),
      ("virada", "O cliente não vai morar no horário da visita. Vai morar no horário da rotina dele.", "O cliente | não vai morar | no horário da *visita.* | Vai morar | no horário | da *rotina* dele."),
      ("acao", "Pergunte a que horas ele sai e volta, e marque uma das visitas nesse horário. Ou faça o trajeto com ele.", "Pergunte | a que horas | ele *sai e volta,* | e marque uma das visitas | nesse *horário.* | Ou faça o *trajeto* | com ele."),
      ("desfecho", "Quem mostra a rotina antes evita a surpresa depois.", "Quem mostra a rotina | *antes* | evita a *surpresa* | depois.")],
   M=[("h_dez", 1, "dez"), ("h_seis", 1, "seis"), ("m_calma", 2, "calma"), ("m_sol", 2, "sol"), ("t_seis", 3, "seis"), ("t_transito", 3, "trânsito"), ("t_escola", 3, "escola"), ("t_vaga", 3, "vaga"),
      ("v_visita", 4, "visita"), ("v_rotina", 4, "rotina"), ("a_sai", 5, "sai"), ("a_horario", 5, "horário"), ("a_trajeto", 5, "trajeto"), ("f_antes", 6, "antes"), ("f_surpresa", 6, "surpresa")],
   anc={"virada": "cue:v_visita", "insight": "cue:a_horario", "resolucao": "cue:f_surpresa"}, pron={}),
 "18": dict(ep="ATIVO-D1206-18", out="ATIVO_D1206_18", fn="ATIVO-D1206-18_linha_de_montagem_ao_contrario.md", tit="A linha de montagem ao contrário", formato="maquete-3d", slot="18:00", trilha="T01",
   S=[("hook", "Em 1947, um construtor americano inverteu a linha de montagem: a casa ficava parada, e quem andava era a equipe.", "Em *1947,* | um construtor americano | *inverteu* | a linha de montagem: | a casa ficava *parada,* | e quem *andava* | era a *equipe.*"),
      ("etapas", "Cada casa foi dividida em vinte e poucas etapas, e cada equipe fazia só a sua, de casa em casa.", "Cada casa | foi dividida | em *vinte e poucas etapas,* | e cada equipe | fazia *só a sua,* | de casa em casa."),
      ("escala", "Assim surgiram mais de dezessete mil casas no mesmo lugar.", "Assim surgiram | mais de *dezessete mil casas* | no mesmo lugar."),
      ("virada", "O segredo não era trabalhar mais. Era fazer cada etapa sempre do mesmo jeito.", "O segredo | não era *trabalhar mais.* | Era fazer cada etapa | sempre do *mesmo jeito.*"),
      ("acao", "O seu atendimento também tem etapas: primeiro contato, visita, proposta, documentos. Defina como cada uma é feita.", "O seu *atendimento* | também tem etapas: | primeiro *contato,* | *visita,* | *proposta,* | *documentos.* | *Defina* | como cada uma é feita."),
      ("desfecho", "Quando cada etapa tem um jeito certo, você atende mais sem atender pior.", "Quando cada etapa | tem um *jeito certo,* | você atende *mais* | sem atender *pior.*")],
   M=[("h_1947", 1, "1947"), ("h_inverteu", 1, "inverteu"), ("h_parada", 1, "parada"), ("h_andava", 1, "andava"), ("e_etapas", 2, "etapas"), ("e_sua", 2, "sua"), ("s_dezessete", 3, "dezessete"), ("s_lugar", 3, "lugar"),
      ("v_trabalhar", 4, "trabalhar"), ("v_jeito", 4, "jeito"), ("a_atendimento", 5, "atendimento"), ("a_contato", 5, "contato"), ("a_visita", 5, "visita"), ("a_proposta", 5, "proposta"), ("a_documentos", 5, "documentos"), ("a_defina", 5, "Defina"),
      ("f_certo", 6, "certo"), ("f_pior", 6, "pior")],
   anc={"virada": "cue:v_trabalhar", "insight": "cue:a_defina", "resolucao": "cue:f_pior"}, pron={"1947": "mil novecentos e quarenta e sete"}),
 "21": dict(ep="ATIVO-D1206-21", out="ATIVO_D1206_21", fn="ATIVO-D1206-21_o_preco_por_dia.md", tit="O preço por dia", formato="pictograma-cinematografico", slot="21:00", trilha="T03",
   S=[("hook", "Um real por dia parece pouco. Trezentos e sessenta e cinco reais por ano parecem mais. É o mesmo dinheiro.", "*Um real* por dia | parece *pouco.* | *Trezentos e sessenta e cinco reais* | por ano | parecem *mais.* | É o *mesmo dinheiro.*"),
      ("estudo", "Em 1998, um pesquisador de Harvard mostrou que o mesmo valor, dito por dia, costuma parecer menor.", "Em *1998,* | um pesquisador | de Harvard | mostrou que o mesmo valor, | dito *por dia,* | costuma parecer *menor.*"),
      ("cafe", "Porque a gente compara com os gastos pequenos do dia, como um café.", "Porque a gente *compara* | com os gastos pequenos | do dia, | como um *café.*"),
      ("virada", "Use isso para dar clareza, não para pressionar.", "Use isso | para dar *clareza,* | não para *pressionar.*"),
      ("acao", "O apartamento perto do trabalho custa mais? Mostre quanto essa diferença dá por dia, ao lado das horas de trânsito que ele deixa de pegar.", "O apartamento | perto do *trabalho* | custa mais? | Mostre quanto | essa *diferença* | dá *por dia,* | ao lado das *horas de trânsito* | que ele deixa de pegar."),
      ("desfecho", "Número grande assusta. Número do dia a dia dá para comparar.", "Número grande | *assusta.* | Número do *dia a dia* | dá para *comparar.*")],
   M=[("h_real", 1, "real"), ("h_pouco", 1, "pouco"), ("h_ano", 1, "ano"), ("h_mesmo", 1, "mesmo"), ("e_1998", 2, "1998"), ("e_dia", 2, "dia"), ("e_menor", 2, "menor"), ("c_compara", 3, "compara"), ("c_cafe", 3, "café"),
      ("v_clareza", 4, "clareza"), ("v_pressionar", 4, "pressionar"), ("a_trabalho", 5, "trabalho"), ("a_diferenca", 5, "diferença"), ("a_dia", 5, "dia"), ("a_horas", 5, "horas"), ("f_assusta", 6, "assusta"), ("f_comparar", 6, "comparar")],
   anc={"virada": "cue:v_clareza", "insight": "cue:a_diferenca", "resolucao": "cue:f_comparar"}, pron={"1998": "mil novecentos e noventa e oito", "Harvard": "Rárvard"}),
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
    build(d["ep"], d["out"], "D1206", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
