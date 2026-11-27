"""Lote D1214 — grade PRODUCAO/grade/2026-12-14.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-14/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1214/mk_D1214.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-14"
ROT = "ROTEIROS/ESTEIRA/2026-12-14/"


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
 "08": dict(ep="ATIVO-D1214-08", out="ATIVO_D1214_08", fn="ATIVO-D1214-08_a_metragem_do_anuncio.md", tit="A metragem do anúncio", formato="planta-tecnica", slot="08:00", trilha="T03",
   S=[("hook", "E se a metragem do anúncio estivesse errada, e o comprador pudesse pedir desconto?", "E se a *metragem* | do anúncio | estivesse *errada,* | e o comprador | pudesse pedir | *desconto?*"),
      ("franca", "Na França, isso é lei: se o apartamento tem mais de cinco por cento a menos que o declarado, o preço cai na mesma proporção.", "Na *França,* | isso é *lei:* | se o apartamento tem | mais de *cinco por cento* | a menos | que o declarado, | o *preço cai* | na mesma proporção."),
      ("brasil", "No Brasil, quando a venda é pela medida, uma diferença acima de um vigésimo também pode virar abatimento.", "No *Brasil,* | quando a venda | é pela *medida,* | uma diferença | acima de um *vigésimo* | também pode virar | *abatimento.*"),
      ("virada", "A metragem do anúncio não é detalhe; é promessa.", "A metragem | do anúncio | não é *detalhe;* | é *promessa.*"),
      ("acao", "Antes de anunciar, confira a área na matrícula e na planta, e diga de onde veio o número.", "Antes de anunciar, | confira a área | na *matrícula* | e na *planta,* | e diga | de onde veio | o *número.*"),
      ("desfecho", "Metragem certa no anúncio é negociação sem surpresa.", "Metragem *certa* | no anúncio | é negociação | sem *surpresa.*")],
   M=[("h_metragem", 1, "metragem"), ("h_errada", 1, "errada"), ("h_desconto", 1, "desconto"), ("f_franca", 2, "França"), ("f_cinco", 2, "cinco"), ("f_preco", 2, "preço"), ("b_brasil", 3, "Brasil"), ("b_medida", 3, "medida"), ("b_vigesimo", 3, "vigésimo"), ("b_abatimento", 3, "abatimento"),
      ("v_detalhe", 4, "detalhe"), ("v_promessa", 4, "promessa"), ("a_matricula", 5, "matrícula"), ("a_planta", 5, "planta"), ("a_numero", 5, "número"), ("d_certa", 6, "certa"), ("d_surpresa", 6, "surpresa")],
   anc={"virada": "cue:v_promessa", "insight": "cue:a_matricula", "resolucao": "cue:d_surpresa"}, pron={}),
 "10": dict(ep="ATIVO-D1214-10", out="ATIVO_D1214_10", fn="ATIVO-D1214-10_a_tampa_do_vaso.md", tit="A tampa do vaso", formato="cartoon-explicativo", slot="10:00", trilha="T01",
   S=[("hook", "A foto do banheiro foi para o anúncio com a tampa do vaso levantada.", "A *foto* do banheiro | foi para o anúncio | com a *tampa do vaso* | *levantada.*"),
      ("reacao", "Quem rola o anúncio repara na hora, e passa para o próximo.", "Quem rola o anúncio | *repara* na hora, | e passa | para o *próximo.*"),
      ("visita", "A foto é a primeira visita, e ela acontece sem você.", "A foto é | a *primeira visita,* | e ela acontece | *sem você.*"),
      ("virada", "Antes de fotografar, o imóvel precisa de cinco minutos de preparo.", "Antes de fotografar, | o imóvel precisa | de *cinco minutos* | de *preparo.*"),
      ("acao", "Luzes acesas, cortinas abertas, tampa abaixada, objetos pessoais guardados e celular na horizontal.", "*Luzes* acesas, | *cortinas* abertas, | *tampa* abaixada, | *objetos pessoais* guardados | e celular | na *horizontal.*"),
      ("desfecho", "Cinco minutos de preparo valem mais que cem fotos.", "Cinco minutos | de preparo | valem mais | que *cem fotos.*")],
   M=[("h_foto", 1, "foto"), ("h_tampa", 1, "tampa"), ("h_levantada", 1, "levantada"), ("r_repara", 2, "repara"), ("r_proximo", 2, "próximo"), ("p_primeira", 3, "primeira"), ("p_sem", 3, "sem"),
      ("v_cinco", 4, "cinco"), ("v_preparo", 4, "preparo"), ("a_luzes", 5, "Luzes"), ("a_cortinas", 5, "cortinas"), ("a_tampa", 5, "tampa"), ("a_objetos", 5, "objetos"), ("a_horizontal", 5, "horizontal"), ("d_valem", 6, "valem"), ("d_fotos", 6, "fotos")],
   anc={"virada": "cue:v_cinco", "insight": "cue:a_luzes", "resolucao": "cue:d_fotos"}, pron={}),
 "12": dict(ep="ATIVO-D1214-12", out="ATIVO_D1214_12", fn="ATIVO-D1214-12_o_pe_na_porta.md", tit="O pé na porta", formato="pictograma-cinematografico", slot="12:00", trilha="T04",
   S=[("hook", "Em 1966, pesquisadores pediram a moradores da Califórnia para colocar uma placa enorme no jardim.", "Em *1966,* | pesquisadores pediram | a moradores | da *Califórnia* | para colocar | uma *placa enorme* | no jardim."),
      ("sim", "Entre quem semanas antes tinha aceitado só uma plaquinha na janela, três em cada quatro disseram sim.", "Entre quem | semanas antes | tinha aceitado | só uma *plaquinha* | na janela, | *três em cada quatro* | disseram *sim.*"),
      ("nao", "Entre quem ouviu só o pedido grande, a maioria recusou.", "Entre quem ouviu | só o pedido *grande,* | a maioria *recusou.*"),
      ("virada", "Um sim pequeno abre caminho para o grande.", "Um *sim pequeno* | abre caminho | para o *grande.*"),
      ("acao", "Na captação, não peça a exclusividade na primeira conversa: peça primeiro para conhecer o imóvel e fazer a avaliação.", "Na *captação,* | não peça | a *exclusividade* | na primeira conversa: | peça primeiro | para *conhecer* o imóvel | e fazer a *avaliação.*"),
      ("desfecho", "Quem começa pelo passo pequeno chega ao grande.", "Quem começa | pelo *passo pequeno* | chega ao *grande.*")],
   M=[("h_1966", 1, "1966"), ("h_placa", 1, "placa"), ("h_jardim", 1, "jardim"), ("s_plaquinha", 2, "plaquinha"), ("s_tres", 2, "três"), ("s_sim", 2, "sim"), ("n_grande", 3, "grande"), ("n_recusou", 3, "recusou"),
      ("v_sim", 4, "sim"), ("v_grande", 4, "grande"), ("a_captacao", 5, "captação"), ("a_exclusividade", 5, "exclusividade"), ("a_conhecer", 5, "conhecer"), ("a_avaliacao", 5, "avaliação"), ("d_passo", 6, "passo"), ("d_grande", 6, "grande")],
   anc={"virada": "cue:v_sim", "insight": "cue:a_captacao", "resolucao": "cue:d_grande"}, pron={"1966": "mil novecentos e sessenta e seis"}),
 "15": dict(ep="ATIVO-D1214-15", out="ATIVO_D1214_15", fn="ATIVO-D1214-15_as_palavras_do_cliente.md", tit="As palavras do cliente", formato="cartoon-explicativo", slot="15:00", trilha="T02",
   S=[("hook", "Uma garçonete ganhou gorjetas maiores sem trabalhar mais e sem sorrir mais.", "Uma *garçonete* | ganhou *gorjetas maiores* | sem trabalhar mais | e sem *sorrir* mais."),
      ("estudo", "Em 2003, na Holanda, ela repetiu o pedido com as mesmas palavras do cliente em metade das mesas.", "Em *2003,* | na *Holanda,* | ela *repetiu* o pedido | com as *mesmas palavras* | do cliente | em metade das mesas."),
      ("resultado", "Nessas mesas, as gorjetas foram maiores.", "Nessas mesas, | as gorjetas | foram *maiores.*"),
      ("virada", "Ouvir a própria frase de volta prova que alguém prestou atenção.", "Ouvir a *própria frase* | de volta | prova que alguém | prestou *atenção.*"),
      ("acao", "Anote as palavras exatas do cliente: se ele disse quintal para o cachorro, não escreva área externa.", "*Anote* as palavras | *exatas* do cliente: | se ele disse | *quintal para o cachorro,* | não escreva | *área externa.*"),
      ("desfecho", "Quem repete as palavras do cliente mostra que ouviu.", "Quem *repete* | as palavras do cliente | mostra que *ouviu.*")],
   M=[("h_garconete", 1, "garçonete"), ("h_gorjetas", 1, "gorjetas"), ("h_sorrir", 1, "sorrir"), ("e_2003", 2, "2003"), ("e_holanda", 2, "Holanda"), ("e_repetiu", 2, "repetiu"), ("e_mesmas", 2, "mesmas"), ("r_maiores", 3, "maiores"),
      ("v_propria", 4, "própria"), ("v_atencao", 4, "atenção"), ("a_anote", 5, "Anote"), ("a_exatas", 5, "exatas"), ("a_quintal", 5, "quintal"), ("a_area", 5, "área"), ("d_repete", 6, "repete"), ("d_ouviu", 6, "ouviu")],
   anc={"virada": "cue:v_propria", "insight": "cue:a_anote", "resolucao": "cue:d_ouviu"}, pron={"2003": "dois mil e três"}),
 "18": dict(ep="ATIVO-D1214-18", out="ATIVO_D1214_18", fn="ATIVO-D1214-18_a_cidade_que_subiu.md", tit="A cidade que subiu", formato="maquete-3d", slot="18:00", trilha="T03",
   S=[("hook", "Em 1861, um hotel de seis andares subiu mais de um metro, com os hóspedes lá dentro.", "Em *1861,* | um *hotel* de seis andares | *subiu* mais de um metro, | com os *hóspedes* | lá dentro."),
      ("terreno", "Chicago tinha sido construída num terreno plano e encharcado, e o esgoto não tinha para onde escoar.", "*Chicago* | tinha sido construída | num terreno plano | e *encharcado,* | e o *esgoto* | não tinha | para onde escoar."),
      ("subir", "A cidade decidiu subir o nível das ruas, e os prédios tiveram que subir junto, com centenas de macacos de rosca.", "A cidade decidiu | subir o nível | das *ruas,* | e os *prédios* | tiveram que | subir junto, | com centenas | de *macacos* de rosca."),
      ("virada", "O que está embaixo da rua muda o valor de tudo que está em cima.", "O que está | *embaixo* da rua | muda o *valor* | de tudo | que está em cima."),
      ("acao", "Antes de mostrar um imóvel, descubra se a rua alaga: pergunte aos vizinhos e consulte a prefeitura.", "Antes de mostrar | um imóvel, | descubra | se a rua *alaga:* | pergunte aos *vizinhos* | e consulte | a *prefeitura.*"),
      ("desfecho", "Endereço bom também é o que não alaga.", "Endereço bom | também é | o que *não alaga.*")],
   M=[("h_1861", 1, "1861"), ("h_hotel", 1, "hotel"), ("h_subiu", 1, "subiu"), ("h_hospedes", 1, "hóspedes"), ("t_chicago", 2, "Chicago"), ("t_encharcado", 2, "encharcado"), ("t_esgoto", 2, "esgoto"), ("s_ruas", 3, "ruas"), ("s_predios", 3, "prédios"), ("s_macacos", 3, "macacos"),
      ("v_embaixo", 4, "embaixo"), ("v_valor", 4, "valor"), ("a_alaga", 5, "alaga"), ("a_vizinhos", 5, "vizinhos"), ("a_prefeitura", 5, "prefeitura"), ("d_endereco", 6, "Endereço"), ("d_alaga", 6, "alaga")],
   anc={"virada": "cue:v_embaixo", "insight": "cue:a_alaga", "resolucao": "cue:d_alaga"}, pron={"1861": "mil oitocentos e sessenta e um"}),
 "21": dict(ep="ATIVO-D1214-21", out="ATIVO_D1214_21", fn="ATIVO-D1214-21_a_certidao_vencida.md", tit="A certidão vencida", formato="pictograma-cinematografico", slot="21:00", trilha="T04",
   S=[("hook", "Escritura marcada, todo mundo no cartório, e a certidão do imóvel venceu ontem.", "*Escritura* marcada, | todo mundo | no *cartório,* | e a *certidão* do imóvel | *venceu ontem.*"),
      ("fila", "A assinatura volta para a fila, e o cliente volta para casa sem o imóvel.", "A *assinatura* | volta para a fila, | e o cliente | volta para casa | *sem o imóvel.*"),
      ("prazo", "Para a escritura, a certidão do registro de imóveis vale trinta dias, e as outras têm prazos diferentes.", "Para a escritura, | a certidão | do *registro de imóveis* | vale *trinta dias,* | e as outras | têm prazos | *diferentes.*"),
      ("virada", "As certidões não vencem juntas.", "As certidões | não vencem *juntas.*"),
      ("acao", "Anote a data de emissão de cada uma e peça as de prazo curto por último.", "Anote a *data de emissão* | de cada uma | e peça | as de *prazo curto* | por *último.*"),
      ("desfecho", "Documento em dia é escritura no dia.", "Documento *em dia* | é escritura | *no dia.*")],
   M=[("h_escritura", 1, "Escritura"), ("h_cartorio", 1, "cartório"), ("h_certidao", 1, "certidão"), ("h_venceu", 1, "venceu"), ("f_assinatura", 2, "assinatura"), ("f_sem", 2, "sem"), ("p_registro", 3, "registro"), ("p_trinta", 3, "trinta"), ("p_diferentes", 3, "diferentes"),
      ("v_juntas", 4, "juntas"), ("a_data", 5, "data"), ("a_curto", 5, "curto"), ("a_ultimo", 5, "último"), ("d_documento", 6, "Documento"), ("d_dia", 6, "dia")],
   anc={"virada": "cue:v_juntas", "insight": "cue:a_data", "resolucao": "cue:d_dia"}, pron={}),
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
    build(d["ep"], d["out"], "D1214", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
