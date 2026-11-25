"""Lote D1205 — grade PRODUCAO/grade/2026-12-05.json (6 slots). Roteiros aprovados por delegação (24/11/2026) em
ROTEIROS/ESTEIRA/2026-12-05/, CTA curta vigente. Uso (a partir de PRODUCAO/): python3 lotes/D1205/mk_D1205.py [08|10|12|15|18|21 ...]"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-12-05"
ROT = "ROTEIROS/ESTEIRA/2026-12-05/"


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
 "08": dict(ep="ATIVO-D1205-08", out="ATIVO_D1205_08", fn="ATIVO-D1205-08_42_horas.md", tit="42 horas", formato="cartoon-explicativo", slot="08:00", trilha="T05",
   S=[("hook", "E se você respondesse o lead em cinco minutos, enquanto ele ainda está olhando o anúncio?", "E se você respondesse | o lead | em *cinco minutos,* | enquanto ele | ainda está olhando | o *anúncio?*"),
      ("dado", "Num levantamento com mais de 2 mil empresas americanas, quem respondeu levou em média 42 horas.", "Num levantamento | com mais de *2 mil* | empresas americanas, | quem respondeu | levou em média | *42 horas.*"),
      ("dado", "E quase um quarto nunca respondeu.", "E quase *um quarto* | *nunca* respondeu."),
      ("virada", "Em 42 horas, a dúvida que fez ele clicar pode já ter passado.", "Em 42 horas, | a *dúvida* | que fez ele clicar | pode já ter *passado.*"),
      ("acao", "Deixe pronta a resposta das perguntas de sempre: ainda está disponível, aceita financiamento, tem vaga.", "Deixe *pronta* a resposta | das perguntas de sempre: | ainda está *disponível,* | aceita *financiamento,* | tem *vaga.*"),
      ("desfecho", "Muito lead não esfria por desinteresse. Esfria esperando.", "Muito lead | não esfria | por desinteresse. | Esfria *esperando.*")],
   M=[("h_cinco", 1, "cinco"), ("h_anuncio", 1, "anúncio"), ("d_2mil", 2, "2"), ("d_42", 2, "42"), ("d_quarto", 3, "quarto"), ("d_nunca", 3, "nunca"), ("v_duvida", 4, "dúvida"), ("v_passado", 4, "passado"),
      ("a_pronta", 5, "pronta"), ("a_disponivel", 5, "disponível"), ("a_financiamento", 5, "financiamento"), ("a_vaga", 5, "vaga"), ("f_desinteresse", 6, "desinteresse"), ("f_esperando", 6, "esperando")],
   anc={"virada": "cue:v_duvida", "insight": "cue:a_pronta", "resolucao": "cue:f_esperando"}, pron={"42": "quarenta e duas"}),
 "10": dict(ep="ATIVO-D1205-10", out="ATIVO_D1205_10", fn="ATIVO-D1205-10_um_predio_muitas_vidas.md", tit="Um prédio, muitas vidas", formato="maquete-3d", slot="10:00", trilha="T02",
   S=[("hook", "Um prédio em São Paulo tem mais apartamentos do que 254 cidades brasileiras têm de casas.", "Um *prédio* | em São Paulo | tem mais apartamentos | do que *254 cidades* | brasileiras | têm de casas."),
      ("predio", "É o Copan, de Oscar Niemeyer, inaugurado em 1966: mil cento e sessenta apartamentos.", "É o *Copan,* | de Oscar Niemeyer, | inaugurado em *1966:* | *mil cento e sessenta* | apartamentos."),
      ("predio", "E não são iguais: tem quitinete, tem apartamento grande, tudo no mesmo endereço.", "E não são *iguais:* | tem *quitinete,* | tem apartamento *grande,* | tudo no *mesmo endereço.*"),
      ("virada", "O mesmo prédio serve para vidas completamente diferentes.", "O mesmo prédio | serve para | *vidas* | completamente *diferentes.*"),
      ("licao", "Na sua carteira é igual: o mesmo endereço pode ser certo para um cliente e errado para outro.", "Na sua carteira | é igual: | o mesmo endereço | pode ser *certo* | para um cliente | e *errado* para outro."),
      ("desfecho", "Antes de falar do prédio, pergunte qual vida o cliente quer levar dentro dele.", "Antes de falar | do prédio, | pergunte | qual *vida* | o cliente quer levar | dentro dele.")],
   M=[("h_predio", 1, "prédio"), ("h_254", 1, "254"), ("p_copan", 2, "Copan"), ("p_1966", 2, "1966"), ("p_mil", 2, "mil"), ("p_iguais", 3, "iguais"), ("p_quitinete", 3, "quitinete"), ("p_grande", 3, "grande"), ("p_endereco", 3, "endereço"),
      ("v_vidas", 4, "vidas"), ("v_diferentes", 4, "diferentes"), ("l_certo", 5, "certo"), ("l_errado", 5, "errado"), ("f_pergunte", 6, "pergunte"), ("f_vida", 6, "vida")],
   anc={"virada": "cue:v_vidas", "insight": "cue:l_certo", "resolucao": "cue:f_vida"}, pron={"254": "duzentas e cinquenta e quatro", "1966": "mil novecentos e sessenta e seis", "Copan": "Cópan"}),
 "12": dict(ep="ATIVO-D1205-12", out="ATIVO_D1205_12", fn="ATIVO-D1205-12_a_espera_explicada.md", tit="A espera explicada", formato="pictograma-cinematografico", slot="12:00", trilha="T03",
   S=[("hook", "Por que dez minutos numa fila parecem uma hora?", "Por que | *dez minutos* | numa fila | parecem *uma hora?*"),
      ("principios", "Em 1985, um professor de negócios escreveu sobre isso: espera sem nada para fazer parece mais longa.", "Em *1985,* | um professor de negócios | escreveu sobre isso: | espera *sem nada para fazer* | parece mais longa."),
      ("principios", "Espera sem prazo parece maior ainda. E espera sem explicação, pior.", "Espera *sem prazo* | parece maior ainda. | E espera *sem explicação,* | pior."),
      ("virada", "Agora pense no seu cliente esperando a aprovação do financiamento, sem saber em que etapa está.", "Agora pense | no seu cliente | esperando a aprovação | do *financiamento,* | sem saber | em que *etapa* está."),
      ("acao", "Mande uma mensagem a cada etapa: documentos enviados, análise começou, falta a avaliação.", "Mande uma *mensagem* | a cada etapa: | *documentos* enviados, | *análise* começou, | falta a *avaliação.*"),
      ("desfecho", "A espera continua a mesma. Mas explicada, ela pesa menos.", "A espera | continua a mesma. | Mas *explicada,* | ela pesa *menos.*")],
   M=[("h_dez", 1, "dez"), ("h_hora", 1, "hora"), ("p_1985", 2, "1985"), ("p_nada", 2, "nada"), ("p_prazo", 3, "prazo"), ("p_explicacao", 3, "explicação"), ("v_financiamento", 4, "financiamento"), ("v_etapa", 4, "etapa"),
      ("a_mensagem", 5, "mensagem"), ("a_documentos", 5, "documentos"), ("a_analise", 5, "análise"), ("a_avaliacao", 5, "avaliação"), ("f_explicada", 6, "explicada"), ("f_menos", 6, "menos")],
   anc={"virada": "cue:v_financiamento", "insight": "cue:a_mensagem", "resolucao": "cue:f_explicada"}, pron={"1985": "mil novecentos e oitenta e cinco"}),
 "15": dict(ep="ATIVO-D1205-15", out="ATIVO_D1205_15", fn="ATIVO-D1205-15_vou_pensar.md", tit="Vou pensar", formato="cartoon-explicativo", slot="15:00", trilha="T04",
   S=[("hook", "O cliente gostou do imóvel e disse: vou pensar.", "O cliente *gostou* | do imóvel | e disse: | *vou pensar.*"),
      ("erro", "Você responde: claro, fico no aguardo. E a conversa morre ali.", "Você responde: | claro, | *fico no aguardo.* | E a conversa | *morre* ali."),
      ("virada", "Muitas vezes, vou pensar não é sobre tempo. É uma dúvida que ele ainda não falou.", "Muitas vezes, | vou pensar | não é sobre *tempo.* | É uma *dúvida* | que ele | ainda não falou."),
      ("pergunta", "Pergunte com calma: pensar em quê, exatamente? É o valor, o bairro ou alguém que precisa ver também?", "Pergunte com calma: | pensar *em quê,* | exatamente? | É o *valor,* | o *bairro* | ou *alguém* | que precisa ver também?"),
      ("efeito", "Agora você sabe o que resolver, e ele não precisa inventar desculpa.", "Agora você sabe | o que *resolver,* | e ele não precisa | inventar *desculpa.*"),
      ("desfecho", "Quem pergunta o motivo ganha uma conversa. Quem só aguarda corre o risco de perder o cliente em silêncio.", "Quem pergunta | o motivo | ganha uma *conversa.* | Quem só *aguarda* | corre o risco | de perder o cliente | em *silêncio.*")],
   M=[("h_gostou", 1, "gostou"), ("h_pensar", 1, "pensar"), ("e_aguardo", 2, "aguardo"), ("e_morre", 2, "morre"), ("v_tempo", 3, "tempo"), ("v_duvida", 3, "dúvida"), ("p_que", 4, "quê"), ("p_valor", 4, "valor"), ("p_bairro", 4, "bairro"), ("p_alguem", 4, "alguém"),
      ("x_resolver", 5, "resolver"), ("x_desculpa", 5, "desculpa"), ("f_conversa", 6, "conversa"), ("f_aguarda", 6, "aguarda"), ("f_silencio", 6, "silêncio")],
   anc={"virada": "cue:v_tempo", "insight": "cue:p_que", "resolucao": "cue:f_conversa"}, pron={}),
 "18": dict(ep="ATIVO-D1205-18", out="ATIVO_D1205_18", fn="ATIVO-D1205-18_a_terceira_opcao.md", tit="A terceira opção", formato="planta-tecnica", slot="18:00", trilha="T01",
   S=[("hook", "Uma opção que ninguém escolheu mudou a escolha de quase todo mundo.", "Uma opção | que *ninguém* escolheu | mudou a escolha | de *quase todo mundo.*"),
      ("teste", "Num experimento com estudantes, uma revista oferecia: só digital por 59 dólares, ou impressa mais digital por 125.", "Num experimento | com estudantes, | uma revista oferecia: | só *digital* | por *59 dólares,* | ou impressa mais digital | por *125.*"),
      ("teste", "A maioria ficou com a digital.", "A *maioria* | ficou com a *digital.*"),
      ("virada", "Aí incluíram a impressa sozinha, também por 125. Ninguém escolheu ela. Mas 84% passaram a escolher a combinada.", "Aí incluíram | a *impressa sozinha,* | também por 125. | *Ninguém* escolheu ela. | Mas *84%* | passaram a escolher | a *combinada.*"),
      ("aplica", "A comparação muda o valor que a gente enxerga. Por isso, mostre os imóveis em grupos que façam sentido lado a lado.", "A *comparação* | muda o valor | que a gente enxerga. | Por isso, | mostre os imóveis | em *grupos* | que façam sentido | *lado a lado.*"),
      ("desfecho", "Com uma referência honesta do lado, o cliente enxerga melhor o valor do imóvel certo.", "Com uma referência | *honesta* do lado, | o cliente enxerga melhor | o valor | do imóvel *certo.*")],
   M=[("h_ninguem", 1, "ninguém"), ("h_todo", 1, "todo"), ("t_digital", 2, "digital"), ("t_59", 2, "59"), ("t_125", 2, "125"), ("t_maioria", 3, "maioria"), ("v_impressa", 4, "impressa"), ("v_ninguem", 4, "Ninguém"), ("v_84", 4, "84"), ("v_combinada", 4, "combinada"),
      ("a_comparacao", 5, "comparação"), ("a_grupos", 5, "grupos"), ("a_lado", 5, "lado"), ("f_honesta", 6, "honesta"), ("f_certo", 6, "certo")],
   anc={"virada": "cue:v_impressa", "insight": "cue:a_comparacao", "resolucao": "cue:f_honesta"}, pron={"59": "cinquenta e nove", "125": "cento e vinte e cinco", "84%": "oitenta e quatro por cento"}),
 "21": dict(ep="ATIVO-D1205-21", out="ATIVO_D1205_21", fn="ATIVO-D1205-21_anote_o_nao.md", tit="Anote o não", formato="pictograma-cinematografico", slot="21:00", trilha="T02",
   S=[("hook", "O imóvel que o cliente recusou ensina mais do que o que ele gostou.", "O imóvel | que o cliente *recusou* | ensina mais | do que o que ele *gostou.*"),
      ("motivos", "Cada não tem um motivo: escada demais, sol da tarde, rua barulhenta.", "Cada *não* | tem um motivo: | *escada* demais, | *sol* da tarde, | rua *barulhenta.*"),
      ("motivos", "Só que esse motivo some no meio das mensagens.", "Só que esse motivo | *some* | no meio das mensagens."),
      ("virada", "Anote o não, com o motivo, logo depois da visita.", "*Anote o não,* | com o motivo, | logo depois | da *visita.*"),
      ("filtro", "Depois de três visitas, os motivos se repetem e viram o filtro que o cliente nunca soube explicar.", "Depois de três visitas, | os motivos | se *repetem* | e viram o *filtro* | que o cliente | nunca soube explicar."),
      ("desfecho", "Quem anota o não chega mais perto do sim.", "Quem anota o não | chega mais perto | do *sim.*")],
   M=[("h_recusou", 1, "recusou"), ("h_gostou", 1, "gostou"), ("m_nao", 2, "não"), ("m_escada", 2, "escada"), ("m_sol", 2, "sol"), ("m_rua", 2, "barulhenta"), ("m_some", 3, "some"), ("v_anote", 4, "Anote"), ("v_visita", 4, "visita"),
      ("i_repetem", 5, "repetem"), ("i_filtro", 5, "filtro"), ("f_sim", 6, "sim")],
   anc={"virada": "cue:v_anote", "insight": "cue:i_filtro", "resolucao": "cue:f_sim"}, pron={}),
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
    build(d["ep"], d["out"], "D1205", ROT + d["fn"], d["tit"], d["S"], L, sfx, prog(d["M"][1][0], viradas[0], d["M"][-1][0]), {}, diag, apur, lead,
          formato=d["formato"], grade=GRADE, slot=d["slot"], cta_curta=True, trilha=d["trilha"], ancoras=d["anc"])
    ajusta(d["ep"], pron=d["pron"])


if __name__ == "__main__":
    for a in sys.argv[1:] or list(EPS):
        faz(a)
