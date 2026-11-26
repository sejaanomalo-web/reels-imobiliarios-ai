"""Lote D1207 — grade PRODUCAO/grade/2026-12-07.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-07/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1207/mk_D1207.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-07"
ROT = "ROTEIROS/ESTEIRA/2026-12-07/"


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
 "08": dict(ep="ATIVO-D1207-08", out="ATIVO_D1207_08", fn="ATIVO-D1207-08_data_de_validade.md", tit="Data de validade", formato="maquete-3d", slot="08:00", trilha="T04",
   S=[("hook", "E se o seu apartamento tivesse data de validade?", "E se o seu *apartamento* | tivesse | *data de validade?*"),
      ("singapura", "Em Singapura, três em cada quatro moradores vivem em apartamentos públicos com contrato de noventa e nove anos.", "Em *Singapura,* | *três em cada quatro* moradores | vivem em apartamentos *públicos* | com contrato | de *noventa e nove anos.*"),
      ("volta", "Quando o prazo acaba, o imóvel volta para o Estado.", "Quando o *prazo* acaba, | o imóvel *volta* | para o *Estado.*"),
      ("virada", "Aqui não é assim. Mas tem imóvel em que a União também tem uma parte.", "Aqui *não é assim.* | Mas tem imóvel | em que a *União* | também tem *uma parte.*"),
      ("acao", "Em terreno de marinha, a cada venda, se paga à União um laudêmio de cinco por cento. Confira na matrícula antes de anunciar.", "Em *terreno de marinha,* | a cada *venda,* | se paga à União | um *laudêmio* | de *cinco por cento.* | Confira na *matrícula* | antes de anunciar."),
      ("desfecho", "Quem lê a matrícula antes não descobre o custo na hora de assinar.", "Quem lê a matrícula *antes* | não descobre o *custo* | na hora de *assinar.*")],
   M=[("h_apartamento", 1, "apartamento"), ("h_validade", 1, "validade"), ("s_singapura", 2, "Singapura"), ("s_tres", 2, "três"), ("s_publicos", 2, "públicos"), ("s_99", 2, "noventa"), ("p_prazo", 3, "prazo"), ("p_volta", 3, "volta"), ("p_estado", 3, "Estado"),
      ("v_aqui", 4, "Aqui"), ("v_uniao", 4, "União"), ("v_parte", 4, "parte"), ("a_marinha", 5, "marinha"), ("a_venda", 5, "venda"), ("a_laudemio", 5, "laudêmio"), ("a_cinco", 5, "cinco"), ("a_matricula", 5, "matrícula"),
      ("f_antes", 6, "antes"), ("f_custo", 6, "custo"), ("f_assinar", 6, "assinar")],
   anc={"virada": "cue:v_aqui", "insight": "cue:a_laudemio", "resolucao": "cue:f_assinar"}, pron={}),
 "10": dict(ep="ATIVO-D1207-10", out="ATIVO_D1207_10", fn="ATIVO-D1207-10_desconto_antes_da_visita.md", tit="Desconto antes da visita", formato="cartoon-explicativo", slot="10:00", trilha="T05",
   S=[("hook", "O cliente pede desconto antes de ver o imóvel.", "O cliente pede *desconto* | *antes* | de ver o imóvel."),
      ("numero", "Se você já responde com um número, ele aprende que o preço é a primeira coisa que cai.", "Se você já responde | com um *número,* | ele *aprende* | que o *preço* | é a primeira coisa | que *cai.*"),
      ("semvisita", "E desconto sem visita é desconto num imóvel que ele talvez nem queira.", "E desconto | *sem visita* | é desconto num imóvel | que ele talvez | *nem queira.*"),
      ("virada", "Primeiro ele precisa querer o imóvel. Depois se fala de preço.", "*Primeiro* | ele precisa *querer* o imóvel. | *Depois* | se fala de preço."),
      ("acao", "Responda: vamos visitar; se for o imóvel certo, eu levo a sua proposta ao proprietário.", "Responda: | *vamos visitar;* | se for o *imóvel certo,* | eu levo a sua *proposta* | ao *proprietário.*"),
      ("desfecho", "Negociação boa começa com o cliente querendo o imóvel, não com o preço no chão.", "Negociação boa | começa com o cliente | *querendo* o imóvel, | não com o preço | *no chão.*")],
   M=[("h_desconto", 1, "desconto"), ("h_antes", 1, "antes"), ("n_numero", 2, "número"), ("n_aprende", 2, "aprende"), ("n_preco", 2, "preço"), ("n_cai", 2, "cai"), ("s_visita", 3, "visita"), ("s_queira", 3, "queira"),
      ("v_primeiro", 4, "Primeiro"), ("v_querer", 4, "querer"), ("v_depois", 4, "Depois"), ("a_visitar", 5, "visitar"), ("a_certo", 5, "certo"), ("a_proposta", 5, "proposta"), ("a_proprietario", 5, "proprietário"), ("f_querendo", 6, "querendo"), ("f_chao", 6, "chão")],
   anc={"virada": "cue:v_primeiro", "insight": "cue:a_proposta", "resolucao": "cue:f_chao"}, pron={}),
 "12": dict(ep="ATIVO-D1207-12", out="ATIVO_D1207_12", fn="ATIVO-D1207-12_dois_carimbos.md", tit="Dois carimbos de graça", formato="planta-tecnica", slot="12:00", trilha="T03",
   S=[("hook", "Dois carimbos de graça fizeram mais gente voltar ao lava-rápido.", "*Dois carimbos* | de graça | fizeram mais gente | *voltar* | ao lava-rápido."),
      ("oito", "Num estudo publicado em 2006, metade dos clientes recebeu um cartão de oito lavagens.", "Num estudo | publicado em *2006,* | *metade* dos clientes | recebeu um cartão | de *oito lavagens.*"),
      ("dez", "A outra metade recebeu um cartão de dez, com duas já carimbadas. Nos dois, faltavam oito.", "A outra metade | recebeu um cartão de *dez,* | com *duas* já carimbadas. | Nos dois, | faltavam *oito.*"),
      ("virada", "Quem via o caminho já começado completou mais, e mais rápido.", "Quem via o caminho | já *começado* | completou *mais,* | e mais *rápido.*"),
      ("acao", "No financiamento, mostre o que já foi feito: documentos enviados, simulação pronta, falta a avaliação.", "No *financiamento,* | mostre | o que *já foi feito:* | *documentos* enviados, | *simulação* pronta, | falta a *avaliação.*"),
      ("desfecho", "Ninguém larga fácil um caminho que já começou.", "Ninguém larga fácil | um caminho | que *já começou.*")],
   M=[("h_dois", 1, "Dois"), ("h_voltar", 1, "voltar"), ("o_2006", 2, "2006"), ("o_metade", 2, "metade"), ("o_oito", 2, "oito"), ("d_dez", 3, "dez"), ("d_duas", 3, "duas"), ("d_oito", 3, "oito"),
      ("v_comecado", 4, "começado"), ("v_mais", 4, "mais"), ("v_rapido", 4, "rápido"), ("a_financiamento", 5, "financiamento"), ("a_feito", 5, "feito"), ("a_documentos", 5, "documentos"), ("a_simulacao", 5, "simulação"), ("a_avaliacao", 5, "avaliação"),
      ("f_ninguem", 6, "Ninguém"), ("f_comecou", 6, "começou")],
   anc={"virada": "cue:v_comecado", "insight": "cue:a_financiamento", "resolucao": "cue:f_comecou"}, pron={"2006": "dois mil e seis"}),
 "15": dict(ep="ATIVO-D1207-15", out="ATIVO_D1207_15", fn="ATIVO-D1207-15_por_que_agora.md", tit="Por que agora?", formato="pictograma-cinematografico", slot="15:00", trilha="T02",
   S=[("hook", "A pergunta mais importante do atendimento tem duas palavras: por que agora?", "A pergunta | mais *importante* | do atendimento | tem *duas palavras:* | *por que agora?*"),
      ("meses", "O cliente procurava há meses e, de repente, quer visitar esta semana.", "O cliente procurava | há *meses* | e, *de repente,* | quer visitar | *esta semana.*"),
      ("mudou", "Alguma coisa mudou: um filho a caminho, um emprego novo, o fim do aluguel.", "Alguma coisa *mudou:* | um *filho* a caminho, | um *emprego* novo, | o fim do *aluguel.*"),
      ("virada", "O motivo do agora mostra o prazo, o que pesa e quem decide.", "O motivo do agora | mostra o *prazo,* | o que *pesa* | e quem *decide.*"),
      ("acao", "Pergunte com naturalidade: o que fez você começar a procurar agora?", "Pergunte | com *naturalidade:* | o que fez você | começar a procurar | *agora?*"),
      ("desfecho", "Quem entende o agora atende no tempo certo.", "Quem entende o agora | atende | no *tempo certo.*")],
   M=[("h_importante", 1, "importante"), ("h_agora", 1, "agora"), ("m_meses", 2, "meses"), ("m_repente", 2, "repente"), ("m_semana", 2, "semana"), ("u_mudou", 3, "mudou"), ("u_filho", 3, "filho"), ("u_emprego", 3, "emprego"), ("u_aluguel", 3, "aluguel"),
      ("v_prazo", 4, "prazo"), ("v_pesa", 4, "pesa"), ("v_decide", 4, "decide"), ("a_naturalidade", 5, "naturalidade"), ("a_agora", 5, "agora"), ("f_tempo", 6, "tempo")],
   anc={"virada": "cue:v_prazo", "insight": "cue:a_naturalidade", "resolucao": "cue:f_tempo"}, pron={}),
 "18": dict(ep="ATIVO-D1207-18", out="ATIVO_D1207_18", fn="ATIVO-D1207-18_a_casa_no_topo.md", tit="A casa no topo do prédio", formato="maquete-3d", slot="18:00", trilha="T01",
   S=[("hook", "Em São Paulo, um empresário construiu uma casa no alto do próprio prédio e foi morar lá.", "Em São Paulo, | um empresário | construiu uma *casa* | no *alto* do próprio prédio | e foi *morar lá.*"),
      ("martinelli", "Era o Martinelli, o primeiro arranha-céu da cidade, com trinta andares.", "Era o *Martinelli,* | o primeiro *arranha-céu* | da cidade, | com *trinta andares.*"),
      ("medo", "Segundo a prefeitura, muita gente desconfiava da segurança da obra.", "Segundo a prefeitura, | muita gente | *desconfiava* | da *segurança* da obra."),
      ("virada", "Ele não ficou só discutindo. Em 1929, mudou-se com a família para a cobertura.", "Ele não ficou | só *discutindo.* | Em *1929,* | mudou-se com a *família* | para a *cobertura.*"),
      ("acao", "No seu atendimento, prova vale mais que argumento: mostre a matrícula em dia, o laudo, o histórico de manutenção.", "No seu atendimento, | *prova* vale mais | que *argumento:* | mostre a *matrícula* em dia, | o *laudo,* | o histórico de *manutenção.*"),
      ("desfecho", "Confiança não se pede. Se mostra.", "Confiança | não se *pede.* | Se *mostra.*")],
   M=[("h_casa", 1, "casa"), ("h_alto", 1, "alto"), ("h_morar", 1, "morar"), ("m_martinelli", 2, "Martinelli"), ("m_primeiro", 2, "primeiro"), ("m_30", 2, "trinta"), ("d_desconfiava", 3, "desconfiava"), ("d_seguranca", 3, "segurança"),
      ("v_discutindo", 4, "discutindo"), ("v_1929", 4, "1929"), ("v_familia", 4, "família"), ("v_cobertura", 4, "cobertura"), ("a_prova", 5, "prova"), ("a_argumento", 5, "argumento"), ("a_matricula", 5, "matrícula"), ("a_laudo", 5, "laudo"), ("a_manutencao", 5, "manutenção"),
      ("f_pede", 6, "pede"), ("f_mostra", 6, "mostra")],
   anc={"virada": "cue:v_discutindo", "insight": "cue:a_prova", "resolucao": "cue:f_mostra"}, pron={"1929": "mil novecentos e vinte e nove"}),
 "21": dict(ep="ATIVO-D1207-21", out="ATIVO_D1207_21", fn="ATIVO-D1207-21_o_novo_comeco.md", tit="O novo começo", formato="pictograma-cinematografico", slot="21:00", trilha="T04",
   S=[("hook", "Por que a gente sempre promete começar na segunda-feira?", "Por que a gente | sempre *promete* | começar | na *segunda-feira?*"),
      ("dieta", "Em 2014, pesquisadores americanos viram que as buscas por dieta sobem no começo da semana, do mês e do ano.", "Em *2014,* | pesquisadores americanos | viram que as buscas | por *dieta* sobem | no começo da *semana,* | do *mês* | e do *ano.*"),
      ("academia", "E as idas à academia aumentam depois de datas marcantes, como aniversários.", "E as idas à *academia* | aumentam | depois de *datas marcantes,* | como *aniversários.*"),
      ("virada", "Essas datas funcionam como um recomeço: o plano adiado ganha uma nova chance.", "Essas datas | funcionam como | um *recomeço:* | o plano *adiado* | ganha uma *nova chance.*"),
      ("acao", "Aquele lead que esfriou? Retome a conversa num marco: começo do mês, virada do ano, fim do aluguel.", "Aquele lead | que *esfriou?* | *Retome* a conversa | num *marco:* | começo do *mês,* | virada do *ano,* | fim do *aluguel.*"),
      ("desfecho", "Às vezes o cliente não precisa de outro imóvel. Precisa de um novo começo.", "Às vezes o cliente | não precisa | de outro imóvel. | Precisa de um *novo começo.*")],
   M=[("h_promete", 1, "promete"), ("h_segunda", 1, "na"), ("d_2014", 2, "2014"), ("d_dieta", 2, "dieta"), ("d_semana", 2, "semana"), ("d_mes", 2, "mês"), ("d_ano", 2, "ano"), ("c_academia", 3, "academia"), ("c_datas", 3, "datas"), ("c_aniversarios", 3, "aniversários"),
      ("v_recomeco", 4, "recomeço"), ("v_adiado", 4, "adiado"), ("v_chance", 4, "chance"), ("a_esfriou", 5, "esfriou"), ("a_retome", 5, "Retome"), ("a_marco", 5, "marco"), ("a_mes", 5, "mês"), ("a_ano", 5, "ano"), ("a_aluguel", 5, "aluguel"), ("f_novo", 6, "novo")],
   anc={"virada": "cue:v_recomeco", "insight": "cue:a_retome", "resolucao": "cue:f_novo"}, pron={"2014": "dois mil e quatorze"}),
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
    build(d["ep"], d["out"], "D1207", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
