"""Lote D1211 — grade PRODUCAO/grade/2026-12-11.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-11/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1211/mk_D1211.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-11"
ROT = "ROTEIROS/ESTEIRA/2026-12-11/"


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
 "08": dict(ep="ATIVO-D1211-08", out="ATIVO_D1211_08", fn="ATIVO-D1211-08_sete_dias_para_desistir.md", tit="Sete dias para desistir", formato="maquete-3d", slot="08:00", trilha="T03",
   S=[("hook", "E se o cliente pudesse desistir da compra em sete dias e receber até a sua comissão de volta?", "E se o cliente | pudesse *desistir* | da compra | em *sete dias* | e receber até | a sua *comissão* de volta?"),
      ("onde", "Isso já existe: na compra de imóvel na planta assinada em estande ou fora da sede da incorporadora.", "Isso *já existe:* | na compra | de imóvel *na planta* | assinada em *estande* | ou fora da sede | da incorporadora."),
      ("regra", "A lei dá sete dias para desistir, com devolução de tudo o que foi pago, inclusive a corretagem.", "A *lei* dá | *sete dias* | para desistir, | com *devolução* | de tudo o que foi pago, | inclusive a *corretagem.*"),
      ("virada", "Passados os sete dias sem aviso, o contrato fica firme.", "*Passados* | os sete dias | sem aviso, | o contrato | fica *firme.*"),
      ("acao", "Explique esse prazo antes da assinatura e acompanhe o cliente durante essa semana.", "*Explique* esse prazo | *antes* da assinatura | e *acompanhe* o cliente | durante essa *semana.*"),
      ("desfecho", "Venda que passa pelos sete dias é venda bem feita.", "Venda que *passa* | pelos sete dias | é venda *bem feita.*")],
   M=[("h_desistir", 1, "desistir"), ("h_sete", 1, "sete"), ("h_comissao", 1, "comissão"), ("o_existe", 2, "existe"), ("o_planta", 2, "planta"), ("o_estande", 2, "estande"), ("r_lei", 3, "lei"), ("r_sete", 3, "sete"), ("r_devolucao", 3, "devolução"), ("r_corretagem", 3, "corretagem"),
      ("v_passados", 4, "Passados"), ("v_firme", 4, "firme"), ("a_explique", 5, "Explique"), ("a_antes", 5, "antes"), ("a_acompanhe", 5, "acompanhe"), ("a_semana", 5, "semana"), ("f_passa", 6, "passa"), ("f_feita", 6, "feita")],
   anc={"virada": "cue:v_passados", "insight": "cue:a_explique", "resolucao": "cue:f_feita"}, pron={}),
 "10": dict(ep="ATIVO-D1211-10", out="ATIVO_D1211_10", fn="ATIVO-D1211-10_a_mensagem_das_23h.md", tit="A mensagem das 23h", formato="cartoon-explicativo", slot="10:00", trilha="T02",
   S=[("hook", "Chegou mensagem do cliente às onze da noite. E você respondeu na hora.", "Chegou *mensagem* | do cliente | às *onze da noite.* | E você respondeu | *na hora.*"),
      ("repete", "No dia seguinte, ele manda de novo às onze. E às onze e meia.", "No dia seguinte, | ele manda *de novo* | às *onze.* | E às *onze e meia.*"),
      ("ensinou", "Você ensinou que o seu horário é qualquer horário.", "Você *ensinou* | que o seu horário | é *qualquer horário.*"),
      ("virada", "Responda de manhã, cedo, com tudo resolvido.", "Responda *de manhã,* | *cedo,* | com tudo *resolvido.*"),
      ("acao", "Se for urgente de verdade, ligue. Se não, uma mensagem curta: amanhã às nove te mando tudo.", "Se for *urgente* de verdade, | *ligue.* | Se não, | uma mensagem *curta:* | amanhã às *nove* | te mando tudo."),
      ("desfecho", "Disponível não é o mesmo que sempre online.", "*Disponível* | não é o mesmo | que *sempre online.*")],
   M=[("h_mensagem", 1, "mensagem"), ("h_noite", 1, "noite"), ("h_hora", 1, "hora"), ("r_novo", 2, "novo"), ("r_onze", 2, "onze"), ("r_meia", 2, "meia"), ("e_ensinou", 3, "ensinou"), ("e_qualquer", 3, "qualquer"),
      ("v_manha", 4, "manhã"), ("v_cedo", 4, "cedo"), ("v_resolvido", 4, "resolvido"), ("a_urgente", 5, "urgente"), ("a_ligue", 5, "ligue"), ("a_curta", 5, "curta"), ("a_nove", 5, "nove"), ("f_disponivel", 6, "Disponível"), ("f_online", 6, "online")],
   anc={"virada": "cue:v_manha", "insight": "cue:a_urgente", "resolucao": "cue:f_online"}, pron={}),
 "12": dict(ep="ATIVO-D1211-12", out="ATIVO_D1211_12", fn="ATIVO-D1211-12_noventa_ou_dez.md", tit="Noventa ou dez", formato="planta-tecnica", slot="12:00", trilha="T01",
   S=[("hook", "Noventa por cento de chance de dar certo. Ou dez por cento de chance de dar errado. Qual parece melhor?", "*Noventa por cento* | de chance | de dar *certo.* | Ou *dez por cento* | de chance | de dar *errado.* | Qual parece *melhor?*"),
      ("estudo", "Em 1982, pesquisadores apresentaram o mesmo tratamento a médicos e pacientes, de dois jeitos.", "Em *1982,* | pesquisadores | apresentaram | o *mesmo tratamento* | a médicos e pacientes, | de *dois jeitos.*"),
      ("resultado", "Quando ouviam a chance de sobreviver, mais gente escolhia a cirurgia do que quando ouviam a chance de morrer.", "Quando ouviam | a chance de *sobreviver,* | *mais gente* escolhia | a cirurgia | do que quando ouviam | a chance de *morrer.*"),
      ("virada", "O número era o mesmo. Mudou só o jeito de dizer.", "O número | era o *mesmo.* | Mudou só | o *jeito de dizer.*"),
      ("acao", "Na proposta, mostre a informação pelo lado do que o cliente ganha. E deixe o resto à vista.", "Na *proposta,* | mostre a informação | pelo lado | do que o cliente *ganha.* | E deixe o resto | *à vista.*"),
      ("desfecho", "O número informa. A frase decide.", "O número *informa.* | A frase *decide.*")],
   M=[("h_noventa", 1, "Noventa"), ("h_certo", 1, "certo"), ("h_dez", 1, "dez"), ("h_errado", 1, "errado"), ("h_melhor", 1, "melhor"), ("e_1982", 2, "1982"), ("e_mesmo", 2, "tratamento"), ("e_dois", 2, "dois"), ("r_sobreviver", 3, "sobreviver"), ("r_mais", 3, "gente"), ("r_morrer", 3, "morrer"),
      ("v_mesmo", 4, "mesmo"), ("v_jeito", 4, "jeito"), ("a_proposta", 5, "proposta"), ("a_ganha", 5, "ganha"), ("a_vista", 5, "vista"), ("f_informa", 6, "informa"), ("f_decide", 6, "decide")],
   anc={"virada": "cue:v_mesmo", "insight": "cue:a_proposta", "resolucao": "cue:f_decide"}, pron={"1982": "mil novecentos e oitenta e dois"}),
 "15": dict(ep="ATIVO-D1211-15", out="ATIVO_D1211_15", fn="ATIVO-D1211-15_a_regra_dos_dois_minutos.md", tit="A regra dos dois minutos", formato="pictograma-cinematografico", slot="15:00", trilha="T04",
   S=[("hook", "Quantas mensagens de cliente você deixou para responder depois hoje?", "Quantas *mensagens* | de cliente | você deixou | para responder *depois* | hoje?"),
      ("regra", "Um consultor americano criou uma regra simples: se leva menos de dois minutos, faça agora.", "Um consultor americano | criou uma *regra simples:* | se leva menos | de *dois minutos,* | faça *agora.*"),
      ("porque", "Anotar para depois custa mais do que resolver.", "*Anotar* para depois | custa *mais* | do que *resolver.*"),
      ("virada", "Confirmar a visita, mandar a localização, responder um ainda está disponível: tudo cabe em dois minutos.", "*Confirmar* a visita, | mandar a *localização,* | responder um | ainda está *disponível:* | tudo *cabe* | em dois minutos."),
      ("resto", "O que passa de dois minutos vai para a agenda, com dia e hora.", "O que *passa* | de dois minutos | vai para a *agenda,* | com *dia e hora.*"),
      ("desfecho", "Lista curta, cliente respondido.", "Lista *curta,* | cliente *respondido.*")],
   M=[("h_mensagens", 1, "mensagens"), ("h_depois", 1, "depois"), ("r_regra", 2, "regra"), ("r_dois", 2, "dois"), ("r_agora", 2, "agora"), ("p_anotar", 3, "Anotar"), ("p_mais", 3, "mais"), ("p_resolver", 3, "resolver"),
      ("v_confirmar", 4, "Confirmar"), ("v_localizacao", 4, "localização"), ("v_disponivel", 4, "disponível"), ("v_cabe", 4, "cabe"), ("s_passa", 5, "passa"), ("s_agenda", 5, "agenda"), ("s_dia", 5, "dia"), ("f_curta", 6, "curta"), ("f_respondido", 6, "respondido")],
   anc={"virada": "cue:v_confirmar", "insight": "cue:s_agenda", "resolucao": "cue:f_respondido"}, pron={}),
 "18": dict(ep="ATIVO-D1211-18", out="ATIVO_D1211_18", fn="ATIVO-D1211-18_mandou_cortar_a_corda.md", tit="Mandou cortar a corda", formato="maquete-3d", slot="18:00", trilha="T03",
   S=[("hook", "Em 1854, um homem subiu numa plataforma alta e mandou cortar a corda.", "Em *1854,* | um homem subiu | numa *plataforma alta* | e mandou | *cortar a corda.*"),
      ("quem", "Era um inventor, mostrando o freio de segurança do elevador numa feira em Nova York.", "Era um *inventor,* | mostrando o *freio* de segurança | do *elevador* | numa feira | em Nova York."),
      ("parou", "A plataforma caiu poucos centímetros e parou. O público viu com os próprios olhos.", "A plataforma caiu | *poucos centímetros* | e *parou.* | O público viu | com os *próprios olhos.*"),
      ("virada", "Ele não disse que era seguro. Ele mostrou.", "Ele *não disse* | que era seguro. | Ele *mostrou.*"),
      ("ponte", "Quando o cliente desconfiar, não jure: mostre a matrícula, as certidões, o histórico.", "Quando o cliente | *desconfiar,* | não jure: | mostre a *matrícula,* | as *certidões,* | o *histórico.*"),
      ("desfecho", "Prova convence mais do que promessa.", "*Prova* convence mais | do que *promessa.*")],
   M=[("h_1854", 1, "1854"), ("h_plataforma", 1, "plataforma"), ("h_cortar", 1, "cortar"), ("h_corda", 1, "corda"), ("q_inventor", 2, "inventor"), ("q_freio", 2, "freio"), ("q_elevador", 2, "elevador"), ("p_centimetros", 3, "centímetros"), ("p_parou", 3, "parou"), ("p_olhos", 3, "olhos"),
      ("v_disse", 4, "disse"), ("v_mostrou", 4, "mostrou"), ("a_desconfiar", 5, "desconfiar"), ("a_matricula", 5, "matrícula"), ("a_certidoes", 5, "certidões"), ("a_historico", 5, "histórico"), ("f_prova", 6, "Prova"), ("f_promessa", 6, "promessa")],
   anc={"virada": "cue:v_disse", "insight": "cue:a_desconfiar", "resolucao": "cue:f_promessa"}, pron={"1854": "mil oitocentos e cinquenta e quatro"}),
 "21": dict(ep="ATIVO-D1211-21", out="ATIVO_D1211_21", fn="ATIVO-D1211-21_com_quem_esta_a_chave.md", tit="Com quem está a chave?", formato="pictograma-cinematografico", slot="21:00", trilha="T01",
   S=[("hook", "Você marcou a visita, o cliente chegou e ninguém sabe com quem está a chave.", "Você marcou a *visita,* | o cliente *chegou* | e ninguém sabe | com quem está | a *chave.*"),
      ("onde", "Ficou na portaria? Com outro corretor? No carro de alguém da equipe?", "Ficou na *portaria?* | Com outro *corretor?* | No *carro* | de alguém da equipe?"),
      ("espera", "Enquanto você liga para todo mundo, o cliente espera na calçada.", "Enquanto você *liga* | para todo mundo, | o cliente *espera* | na *calçada.*"),
      ("virada", "A chave não sumiu. O que sumiu foi o registro.", "A chave | *não sumiu.* | O que sumiu | foi o *registro.*"),
      ("acao", "Na hora em que a chave sai, anote quem pegou, para qual visita e quando devolve.", "Na hora em que | a chave *sai,* | anote *quem pegou,* | para qual *visita* | e quando *devolve.*"),
      ("desfecho", "Chave com nome e horário não atrasa visita.", "Chave com *nome* | e *horário* | não *atrasa* visita.")],
   M=[("h_visita", 1, "visita"), ("h_chegou", 1, "chegou"), ("h_chave", 1, "chave"), ("o_portaria", 2, "portaria"), ("o_corretor", 2, "corretor"), ("o_carro", 2, "carro"), ("e_liga", 3, "liga"), ("e_espera", 3, "espera"), ("e_calcada", 3, "calçada"),
      ("v_sumiu", 4, "sumiu"), ("v_registro", 4, "registro"), ("a_sai", 5, "sai"), ("a_quem", 5, "quem"), ("a_visita", 5, "visita"), ("a_devolve", 5, "devolve"), ("f_nome", 6, "nome"), ("f_horario", 6, "horário"), ("f_atrasa", 6, "atrasa")],
   anc={"virada": "cue:v_sumiu", "insight": "cue:a_sai", "resolucao": "cue:f_atrasa"}, pron={}),
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
    build(d["ep"], d["out"], "D1211", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
