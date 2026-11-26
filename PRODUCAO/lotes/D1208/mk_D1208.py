"""Lote D1208 — grade PRODUCAO/grade/2026-12-08.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-08/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1208/mk_D1208.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-08"
ROT = "ROTEIROS/ESTEIRA/2026-12-08/"


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
 "08": dict(ep="ATIVO-D1208-08", out="ATIVO_D1208_08", fn="ATIVO-D1208-08_o_predio_escolhe.md", tit="O prédio escolhe", formato="maquete-3d", slot="08:00", trilha="T04",
   S=[("hook", "E se o prédio pudesse escolher quem compra o apartamento?", "E se o *prédio* | pudesse *escolher* | quem compra | o apartamento?"),
      ("ny", "Em Nova York, em muitos prédios, um conselho de moradores entrevista o comprador e pode dizer não.", "Em *Nova York,* | em muitos prédios, | um *conselho* de moradores | *entrevista* o comprador | e pode dizer *não.*"),
      ("aqui", "Aqui o condomínio não escolhe o comprador. Mas as regras dele podem barrar o plano de quem compra.", "Aqui o condomínio | *não escolhe* o comprador. | Mas as *regras* dele | podem *barrar* o plano | de quem compra."),
      ("virada", "Em 2021, num caso, o STJ decidiu que a convenção pode proibir aluguel por aplicativo em prédio residencial.", "Em *2021,* | num caso, | o STJ decidiu | que a *convenção* | pode *proibir* | aluguel por *aplicativo* | em prédio residencial."),
      ("acao", "Se o seu cliente compra para alugar por temporada, leia a convenção com ele antes da proposta.", "Se o seu cliente | compra para *alugar* | por temporada, | *leia a convenção* com ele | *antes* da proposta."),
      ("desfecho", "O imóvel certo com a regra errada vira o investimento errado.", "O imóvel *certo* | com a regra *errada* | vira o *investimento* errado.")],
   M=[("h_predio", 1, "prédio"), ("h_escolher", 1, "escolher"), ("n_york", 2, "York"), ("n_conselho", 2, "conselho"), ("n_entrevista", 2, "entrevista"), ("n_nao", 2, "não"), ("q_escolhe", 3, "escolhe"), ("q_regras", 3, "regras"), ("q_barrar", 3, "barrar"),
      ("v_2021", 4, "2021"), ("v_convencao", 4, "convenção"), ("v_proibir", 4, "proibir"), ("v_aplicativo", 4, "aplicativo"), ("a_alugar", 5, "alugar"), ("a_leia", 5, "leia"), ("a_antes", 5, "antes"), ("f_certo", 6, "certo"), ("f_errada", 6, "errada"), ("f_investimento", 6, "investimento")],
   anc={"virada": "cue:v_2021", "insight": "cue:a_leia", "resolucao": "cue:f_investimento"}, pron={"2021": "dois mil e vinte e um", "STJ": "esse tê jota"}),
 "10": dict(ep="ATIVO-D1208-10", out="ATIVO_D1208_10", fn="ATIVO-D1208-10_o_pai_engenheiro.md", tit="O pai engenheiro", formato="cartoon-explicativo", slot="10:00", trilha="T05",
   S=[("hook", "O cliente chega na visita com o pai, que é engenheiro.", "O cliente chega | na visita | com o *pai,* | que é *engenheiro.*"),
      ("inspecao", "Ele bate na parede, olha o teto, aponta uma rachadura.", "Ele bate | na *parede,* | olha o *teto,* | aponta uma *rachadura.*"),
      ("disputa", "Se você tenta defender cada ponto, vira uma disputa. E ele ganha.", "Se você tenta | *defender* cada ponto, | vira uma *disputa.* | E ele *ganha.*"),
      ("virada", "O pai não está ali para atrapalhar. Está ali para proteger o filho.", "O pai | não está ali | para *atrapalhar.* | Está ali | para *proteger* o filho."),
      ("acao", "Chame ele para perto: mostre a planta, o laudo, a idade do prédio. Pergunte o que ele olharia primeiro.", "*Chame ele* para perto: | mostre a *planta,* | o *laudo,* | a idade do *prédio.* | *Pergunte* | o que ele olharia primeiro."),
      ("desfecho", "Quem vinha para barrar vira quem ajuda a decidir.", "Quem vinha | para *barrar* | vira quem *ajuda* | a decidir.")],
   M=[("h_pai", 1, "pai"), ("h_engenheiro", 1, "engenheiro"), ("i_parede", 2, "parede"), ("i_teto", 2, "teto"), ("i_rachadura", 2, "rachadura"), ("d_defender", 3, "defender"), ("d_disputa", 3, "disputa"), ("d_ganha", 3, "ganha"),
      ("v_atrapalhar", 4, "atrapalhar"), ("v_proteger", 4, "proteger"), ("a_chame", 5, "Chame"), ("a_planta", 5, "planta"), ("a_laudo", 5, "laudo"), ("a_predio", 5, "prédio"), ("a_pergunte", 5, "Pergunte"), ("f_barrar", 6, "barrar"), ("f_ajuda", 6, "ajuda")],
   anc={"virada": "cue:v_atrapalhar", "insight": "cue:a_chame", "resolucao": "cue:f_ajuda"}, pron={}),
 "12": dict(ep="ATIVO-D1208-12", out="ATIVO_D1208_12", fn="ATIVO-D1208-12_o_mito_dos_7.md", tit="O mito dos 7%", formato="planta-tecnica", slot="12:00", trilha="T03",
   S=[("hook", "Você já ouviu que as palavras valem só sete por cento da comunicação?", "Você já ouviu | que as *palavras* | valem só | *sete por cento* | da comunicação?"),
      ("origem", "Esse número vem de experimentos dos anos sessenta, sobre como as pessoas percebem sentimentos.", "Esse número | vem de *experimentos* | dos anos *sessenta,* | sobre como as pessoas | percebem *sentimentos.*"),
      ("condicao", "E só quando a voz e o rosto contradizem as palavras.", "E *só* quando | a voz e o rosto | *contradizem* | as palavras."),
      ("virada", "O próprio autor diz que o número é mal citado. Fora disso, as palavras pesam muito.", "O próprio *autor* | diz que o número | é *mal citado.* | Fora disso, | as palavras *pesam muito.*"),
      ("acao", "Na proposta, escreva claro: valor, condições, prazo, o que está incluso.", "Na *proposta,* | escreva *claro:* | *valor,* | *condições,* | *prazo,* | o que está *incluso.*"),
      ("desfecho", "Postura ajuda. Mas quem fecha o negócio são as palavras certas.", "Postura ajuda. | Mas quem *fecha* o negócio | são as *palavras certas.*")],
   M=[("h_palavras", 1, "palavras"), ("h_sete", 1, "sete"), ("o_experimentos", 2, "experimentos"), ("o_sessenta", 2, "sessenta"), ("o_sentimentos", 2, "sentimentos"), ("c_so", 3, "só"), ("c_contradizem", 3, "contradizem"),
      ("v_autor", 4, "autor"), ("v_mal", 4, "mal"), ("v_pesam", 4, "pesam"), ("a_proposta", 5, "proposta"), ("a_claro", 5, "claro"), ("a_valor", 5, "valor"), ("a_condicoes", 5, "condições"), ("a_prazo", 5, "prazo"), ("a_incluso", 5, "incluso"), ("f_fecha", 6, "fecha"), ("f_certas", 6, "certas")],
   anc={"virada": "cue:v_autor", "insight": "cue:a_proposta", "resolucao": "cue:f_certas"}, pron={}),
 "15": dict(ep="ATIVO-D1208-15", out="ATIVO_D1208_15", fn="ATIVO-D1208-15_cinco_minutos_sozinho.md", tit="Cinco minutos sozinho", formato="pictograma-cinematografico", slot="15:00", trilha="T02",
   S=[("hook", "Às vezes a melhor parte da visita é quando você sai da sala.", "Às vezes | a *melhor parte* da visita | é quando você | *sai da sala.*"),
      ("falando", "Com você falando, o cliente escuta. Ele visita o imóvel como visitante.", "Com você *falando,* | o cliente *escuta.* | Ele visita o imóvel | como *visitante.*"),
      ("sozinho", "Sozinho, ele começa a mudar os móveis de lugar na cabeça.", "*Sozinho,* | ele começa a mudar | os *móveis* de lugar | na cabeça."),
      ("virada", "É aí que ele deixa de olhar um imóvel e começa a imaginar a casa dele.", "É aí que ele deixa | de olhar um imóvel | e começa a *imaginar* | a *casa dele.*"),
      ("acao", "No fim da visita, ofereça: fiquem uns minutos à vontade; eu espero lá fora.", "No fim da visita, | *ofereça:* | fiquem uns minutos | *à vontade;* | eu espero | *lá fora.*"),
      ("desfecho", "O silêncio também apresenta o imóvel.", "O *silêncio* | também *apresenta* | o imóvel.")],
   M=[("h_melhor", 1, "melhor"), ("h_sai", 1, "sai"), ("f2_falando", 2, "falando"), ("f2_escuta", 2, "escuta"), ("f2_visitante", 2, "visitante"), ("s_sozinho", 3, "Sozinho"), ("s_moveis", 3, "móveis"),
      ("v_imaginar", 4, "imaginar"), ("v_casa", 4, "casa"), ("a_ofereca", 5, "ofereça"), ("a_vontade", 5, "vontade"), ("a_fora", 5, "fora"), ("f_silencio", 6, "silêncio"), ("f_apresenta", 6, "apresenta")],
   anc={"virada": "cue:v_imaginar", "insight": "cue:a_ofereca", "resolucao": "cue:f_apresenta"}, pron={}),
 "18": dict(ep="ATIVO-D1208-18", out="ATIVO_D1208_18", fn="ATIVO-D1208-18_a_torre_provisoria.md", tit="A torre provisória", formato="planta-tecnica", slot="18:00", trilha="T01",
   S=[("hook", "A Torre Eiffel foi feita para durar vinte anos.", "A Torre Eiffel | foi feita | para durar | *vinte anos.*"),
      ("licenca", "Construída para a exposição de 1889, ela tinha autorização só até 1909. Depois, podia ser desmontada.", "Construída | para a exposição de *1889,* | ela tinha autorização | só até *1909.* | Depois, | podia ser *desmontada.*"),
      ("feia", "Muita gente achava a torre feia e inútil.", "Muita gente | achava a torre | *feia* e *inútil.*"),
      ("virada", "Ela foi salva quando ganhou um novo uso: virou antena de rádio.", "Ela foi *salva* | quando ganhou | um *novo uso:* | virou *antena* de rádio."),
      ("acao", "Com imóvel é parecido: mostre os usos que o cliente ainda não viu. O quarto extra vira escritório, a edícula vira renda.", "Com imóvel é parecido: | mostre os *usos* | que o cliente | ainda não viu. | O quarto extra | vira *escritório,* | a edícula | vira *renda.*"),
      ("desfecho", "Às vezes o imóvel não precisa de reforma. Precisa de um novo uso.", "Às vezes o imóvel | não precisa | de *reforma.* | Precisa | de um *novo uso.*")],
   M=[("h_eiffel", 1, "Eiffel"), ("h_vinte", 1, "vinte"), ("l_1889", 2, "1889"), ("l_1909", 2, "1909"), ("l_desmontada", 2, "desmontada"), ("e_feia", 3, "feia"), ("e_inutil", 3, "inútil"),
      ("v_salva", 4, "salva"), ("v_uso", 4, "uso"), ("v_antena", 4, "antena"), ("a_usos", 5, "usos"), ("a_viu", 5, "viu"), ("a_escritorio", 5, "escritório"), ("a_renda", 5, "renda"), ("f_reforma", 6, "reforma"), ("f_novo", 6, "novo")],
   anc={"virada": "cue:v_salva", "insight": "cue:a_usos", "resolucao": "cue:f_novo"}, pron={"1889": "mil oitocentos e oitenta e nove", "1909": "mil novecentos e nove"}),
 "21": dict(ep="ATIVO-D1208-21", out="ATIVO_D1208_21", fn="ATIVO-D1208-21_a_janela.md", tit="A janela", formato="pictograma-cinematografico", slot="21:00", trilha="T02",
   S=[("hook", "Uma janela mudou o tempo de internação de pacientes num hospital.", "Uma *janela* | mudou o tempo | de *internação* | de pacientes | num hospital."),
      ("estudo", "Em 1984, um pesquisador comparou pacientes operados em quartos iguais.", "Em *1984,* | um pesquisador | comparou pacientes operados | em *quartos iguais.*"),
      ("diferenca", "Metade via uma parede de tijolos. A outra metade via árvores.", "Metade via | uma *parede* de tijolos. | A outra metade | via *árvores.*"),
      ("virada", "Quem via árvores teve alta, em média, quase um dia antes.", "Quem via árvores | teve *alta,* | em média, | *quase um dia antes.*"),
      ("acao", "Na visita, não passe correndo pela janela. Pare, abra a cortina e deixe o cliente olhar.", "Na visita, | não passe *correndo* | pela janela. | *Pare,* | abra a *cortina* | e deixe o cliente *olhar.*"),
      ("desfecho", "A vista não aparece na planta. Mas mora com a pessoa todos os dias.", "A vista | não aparece na *planta.* | Mas *mora* com a pessoa | *todos os dias.*")],
   M=[("h_janela", 1, "janela"), ("h_internacao", 1, "internação"), ("e_1984", 2, "1984"), ("e_iguais", 2, "iguais"), ("d_parede", 3, "parede"), ("d_arvores", 3, "árvores"),
      ("v_alta", 4, "alta"), ("v_dia", 4, "dia"), ("a_correndo", 5, "correndo"), ("a_pare", 5, "Pare"), ("a_cortina", 5, "cortina"), ("a_olhar", 5, "olhar"), ("f_planta", 6, "planta"), ("f_mora", 6, "mora"), ("f_dias", 6, "dias")],
   anc={"virada": "cue:v_alta", "insight": "cue:a_pare", "resolucao": "cue:f_mora"}, pron={"1984": "mil novecentos e oitenta e quatro"}),
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
    build(d["ep"], d["out"], "D1208", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
