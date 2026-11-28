"""Lote D1216 — grade PRODUCAO/grade/2026-12-16.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-16/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1216/mk_D1216.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-16"
ROT = "ROTEIROS/ESTEIRA/2026-12-16/"


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
 "08": dict(ep="ATIVO-D1216-08", out="ATIVO_D1216_08", fn="ATIVO-D1216-08_o_que_o_comprador_pergunta.md", tit="O que o comprador pergunta", formato="pictograma-cinematografico", slot="08:00", trilha="T04",
   S=[("hook", "E se você tivesse que contar ao comprador que alguém morreu no imóvel?", "E se você | tivesse que *contar* | ao comprador | que alguém *morreu* | no imóvel?"),
      ("lei", "Na Califórnia, uma morte nos últimos três anos pode ter que ser informada.", "Na *Califórnia,* | uma morte | nos últimos | *três anos* | pode ter que | ser *informada.*"),
      ("pergunta", "E, se o comprador perguntar diretamente, ninguém pode mentir, nem sobre o que aconteceu antes disso.", "E, se o comprador | *perguntar* diretamente, | ninguém pode *mentir,* | nem sobre | o que aconteceu | *antes* disso."),
      ("virada", "O que o comprador pergunta merece resposta verdadeira.", "O que o comprador | pergunta | merece resposta | *verdadeira.*"),
      ("acao", "Antes de anunciar, pergunte ao proprietário: tem algo que um comprador gostaria de saber?", "Antes de *anunciar,* | pergunte ao *proprietário:* | tem algo | que um comprador | gostaria de *saber?*"),
      ("desfecho", "Quem descobre depois não volta a confiar.", "Quem descobre *depois* | não volta | a *confiar.*")],
   M=[("h_contar", 1, "contar"), ("h_morreu", 1, "morreu"), ("l_california", 2, "Califórnia"), ("l_tres", 2, "três"), ("l_informada", 2, "informada"), ("p_perguntar", 3, "perguntar"), ("p_mentir", 3, "mentir"), ("p_antes", 3, "antes"),
      ("v_verdadeira", 4, "verdadeira"), ("a_anunciar", 5, "anunciar"), ("a_proprietario", 5, "proprietário"), ("a_saber", 5, "saber"), ("d_depois", 6, "depois"), ("d_confiar", 6, "confiar")],
   anc={"virada": "cue:v_verdadeira", "insight": "cue:a_anunciar", "resolucao": "cue:d_confiar"}, pron={}),
 "10": dict(ep="ATIVO-D1216-10", out="ATIVO_D1216_10", fn="ATIVO-D1216-10_a_portaria.md", tit="A portaria", formato="cartoon-explicativo", slot="10:00", trilha="T01",
   S=[("hook", "O cliente chegou na hora, e a portaria não deixou entrar.", "O cliente | chegou na *hora,* | e a *portaria* | não deixou *entrar.*"),
      ("certo", "Ninguém tinha avisado, e o porteiro estava certo.", "Ninguém tinha *avisado,* | e o porteiro | estava *certo.*"),
      ("calcada", "Dez minutos na calçada, e a visita já começou errada.", "*Dez minutos* | na *calçada,* | e a visita | já começou *errada.*"),
      ("virada", "A visita começa na portaria.", "A visita *começa* | na *portaria.*"),
      ("acao", "Na véspera, avise a portaria com o nome do cliente, o horário e o apartamento.", "Na *véspera,* | avise a portaria | com o *nome* do cliente, | o *horário* | e o *apartamento.*"),
      ("desfecho", "Cliente que entra sem esperar entra de bom humor.", "Cliente que entra | sem *esperar* | entra de | *bom humor.*")],
   M=[("h_hora", 1, "hora"), ("h_portaria", 1, "portaria"), ("h_entrar", 1, "entrar"), ("c_avisado", 2, "avisado"), ("c_certo", 2, "certo"), ("k_dez", 3, "Dez"), ("k_calcada", 3, "calçada"), ("k_errada", 3, "errada"),
      ("v_comeca", 4, "começa"), ("v_portaria", 4, "portaria"), ("a_vespera", 5, "véspera"), ("a_nome", 5, "nome"), ("a_horario", 5, "horário"), ("a_apartamento", 5, "apartamento"), ("d_esperar", 6, "esperar"), ("d_humor", 6, "humor")],
   anc={"virada": "cue:v_comeca", "insight": "cue:a_vespera", "resolucao": "cue:d_humor"}, pron={}),
 "12": dict(ep="ATIVO-D1216-12", out="ATIVO_D1216_12", fn="ATIVO-D1216-12_apontar_e_falar.md", tit="Apontar e falar", formato="maquete-3d", slot="12:00", trilha="T03",
   S=[("hook", "No Japão, os maquinistas apontam para o sinal e falam o que estão vendo, em voz alta.", "No *Japão,* | os maquinistas | *apontam* para o sinal | e *falam* | o que estão vendo, | em voz alta."),
      ("estudo", "Parece exagero, mas num estudo de 1994 apontar e falar reduziu os erros em cerca de oitenta e cinco por cento.", "Parece *exagero,* | mas num estudo | de *1994* | apontar e falar | reduziu os *erros* | em cerca de | *oitenta e cinco por cento.*"),
      ("porque", "O gesto obriga a atenção a parar em cada item.", "O gesto obriga | a *atenção* | a *parar* | em cada item."),
      ("virada", "Conferência em silêncio deixa passar.", "Conferência | em *silêncio* | deixa *passar.*"),
      ("acao", "Na entrega das chaves e na conferência dos documentos, aponte cada item e fale em voz alta.", "Na entrega | das *chaves* | e na conferência | dos *documentos,* | *aponte* cada item | e *fale* em voz alta."),
      ("desfecho", "O que é dito em voz alta não fica para trás.", "O que é dito | em *voz alta* | não fica | para *trás.*")],
   M=[("h_japao", 1, "Japão"), ("h_apontam", 1, "apontam"), ("h_falam", 1, "falam"), ("e_exagero", 2, "exagero"), ("e_1994", 2, "1994"), ("e_erros", 2, "erros"), ("e_oitenta", 2, "oitenta"), ("p_atencao", 3, "atenção"), ("p_parar", 3, "parar"),
      ("v_silencio", 4, "silêncio"), ("v_passar", 4, "passar"), ("a_chaves", 5, "chaves"), ("a_documentos", 5, "documentos"), ("a_aponte", 5, "aponte"), ("a_fale", 5, "fale"), ("d_voz", 6, "voz"), ("d_tras", 6, "trás")],
   anc={"virada": "cue:v_silencio", "insight": "cue:a_chaves", "resolucao": "cue:d_tras"}, pron={"1994": "mil novecentos e noventa e quatro"}),
 "15": dict(ep="ATIVO-D1216-15", out="ATIVO_D1216_15", fn="ATIVO-D1216-15_o_trajeto_no_horario_de_pico.md", tit="O trajeto no horário de pico", formato="cartoon-explicativo", slot="15:00", trilha="T02",
   S=[("hook", "O casal amou a casa, e descobriu o trânsito só depois da mudança.", "O casal | *amou* a casa, | e descobriu | o *trânsito* | só depois | da *mudança.*"),
      ("pesquisa", "Uma pesquisa alemã mostrou que quem gasta mais tempo indo ao trabalho está, em média, menos satisfeito com a vida.", "Uma pesquisa *alemã* | mostrou que | quem gasta mais *tempo* | indo ao trabalho | está, em média, | menos *satisfeito* | com a vida."),
      ("compensa", "E a casa bonita não compensa a hora perdida todo dia.", "E a casa *bonita* | não *compensa* | a hora perdida | todo dia."),
      ("virada", "O trajeto também faz parte do imóvel.", "O *trajeto* | também faz parte | do *imóvel.*"),
      ("acao", "Antes de mostrar, calcule com o cliente o trajeto até o trabalho no horário de pico.", "Antes de mostrar, | *calcule* com o cliente | o trajeto | até o *trabalho* | no horário | de *pico.*"),
      ("desfecho", "A casa certa também é a que deixa tempo para viver nela.", "A casa certa | também é a que | deixa *tempo* | para *viver* nela.")],
   M=[("h_amou", 1, "amou"), ("h_transito", 1, "trânsito"), ("h_mudanca", 1, "mudança"), ("p_alema", 2, "alemã"), ("p_tempo", 2, "tempo"), ("p_satisfeito", 2, "satisfeito"), ("c_bonita", 3, "bonita"), ("c_compensa", 3, "compensa"),
      ("v_trajeto", 4, "trajeto"), ("v_imovel", 4, "imóvel"), ("a_calcule", 5, "calcule"), ("a_trabalho", 5, "trabalho"), ("a_pico", 5, "pico"), ("d_tempo", 6, "tempo"), ("d_viver", 6, "viver")],
   anc={"virada": "cue:v_trajeto", "insight": "cue:a_calcule", "resolucao": "cue:d_viver"}, pron={}),
 "18": dict(ep="ATIVO-D1216-18", out="ATIVO_D1216_18", fn="ATIVO-D1216-18_a_opera_que_atrasou.md", tit="A ópera que atrasou", formato="planta-tecnica", slot="18:00", trilha="T03",
   S=[("hook", "A Ópera de Sydney deveria ficar pronta em 1963 e custar sete milhões de dólares australianos.", "A *Ópera de Sydney* | deveria ficar pronta | em *1963* | e custar | *sete milhões* | de dólares australianos."),
      ("real", "Ficou pronta em 1973, e custou cento e dois milhões.", "Ficou pronta | em *1973,* | e custou | *cento e dois milhões.*"),
      ("simbolo", "Virou um símbolo, e também o exemplo clássico de promessa otimista.", "Virou um *símbolo,* | e também | o exemplo clássico | de promessa *otimista.*"),
      ("virada", "Prazo prometido sem folga vira cobrança.", "Prazo prometido | sem *folga* | vira *cobrança.*"),
      ("acao", "Ao prometer prazo de documentação ou de financiamento, some uma folga e diga a data já com ela.", "Ao prometer prazo | de *documentação* | ou de *financiamento,* | some uma *folga* | e diga a data | já com ela."),
      ("desfecho", "Quem entrega antes do prometido ganha confiança.", "Quem entrega | *antes* do prometido | ganha *confiança.*")],
   M=[("h_opera", 1, "Ópera"), ("h_1963", 1, "1963"), ("h_sete", 1, "sete"), ("r_1973", 2, "1973"), ("r_cento", 2, "cento"), ("s_simbolo", 3, "símbolo"), ("s_otimista", 3, "otimista"),
      ("v_folga", 4, "folga"), ("v_cobranca", 4, "cobrança"), ("a_documentacao", 5, "documentação"), ("a_financiamento", 5, "financiamento"), ("a_folga", 5, "folga"), ("a_data", 5, "data"), ("d_antes", 6, "antes"), ("d_confianca", 6, "confiança")],
   anc={"virada": "cue:v_folga", "insight": "cue:a_documentacao", "resolucao": "cue:d_confianca"}, pron={"1963": "mil novecentos e sessenta e três", "1973": "mil novecentos e setenta e três"}),
 "21": dict(ep="ATIVO-D1216-21", out="ATIVO_D1216_21", fn="ATIVO-D1216-21_o_anuncio_que_ficou_no_ar.md", tit="O anúncio que ficou no ar", formato="pictograma-cinematografico", slot="21:00", trilha="T04",
   S=[("hook", "O cliente ligou animado para visitar, e o imóvel já tinha sido vendido.", "O cliente ligou | *animado* para visitar, | e o imóvel | já tinha sido | *vendido.*"),
      ("tres", "O anúncio continuava no ar, em três lugares diferentes.", "O anúncio | continuava *no ar,* | em *três lugares* | diferentes."),
      ("isca", "Para quem liga, parece isca, mesmo sem ser.", "Para quem liga, | parece *isca,* | mesmo sem ser."),
      ("virada", "Anúncio esquecido também fala por você.", "Anúncio *esquecido* | também | *fala por você.*"),
      ("acao", "No dia da venda, tire o anúncio de todos os lugares, e anote onde ele estava publicado.", "No *dia da venda,* | tire o anúncio | de *todos os lugares,* | e *anote* | onde ele estava | publicado."),
      ("desfecho", "Carteira atualizada é carteira confiável.", "Carteira *atualizada* | é carteira | *confiável.*")],
   M=[("h_animado", 1, "animado"), ("h_vendido", 1, "vendido"), ("t_ar", 2, "ar"), ("t_tres", 2, "três"), ("i_isca", 3, "isca"),
      ("v_esquecido", 4, "esquecido"), ("v_fala", 4, "fala"), ("a_dia", 5, "dia"), ("a_todos", 5, "todos"), ("a_anote", 5, "anote"), ("d_atualizada", 6, "atualizada"), ("d_confiavel", 6, "confiável")],
   anc={"virada": "cue:v_esquecido", "insight": "cue:a_dia", "resolucao": "cue:d_confiavel"}, pron={}),
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
    build(d["ep"], d["out"], "D1216", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
