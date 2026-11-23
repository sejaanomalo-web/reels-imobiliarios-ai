"""Lote D1129 — dia-piloto da Esteira Editorial Diária (grade PRODUCAO/grade/2026-11-29.json).
Gera os episode.json dos 3 roteiros aprovados (ROTEIROS/ESTEIRA/2026-11-29/) com a CTA curta vigente (Skill Mestre).
Uso (a partir de PRODUCAO/): python3 lotes/D1129/mk_D1129.py [12|18|21 ...]
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tools"))
from novo_episodio import build, fx  # noqa: E402

GRADE = "2026-11-29"
ROT = "ROTEIROS/ESTEIRA/2026-11-29/"


def ajusta(ep_id, **music):
    """Ajustes finos do modelo depois do build (cauda do logo, nível da trilha sintetizada)."""
    p = os.path.join("episodes", ep_id, "episode.json")
    e = json.load(open(p))
    tail = music.pop("tail", None)
    pron = music.pop("pron", None)
    if tail:
        e["tail"] = tail
    if pron:
        e["pronunciation"].update(pron)
    e["music"].update(music)
    json.dump(e, open(p, "w"), ensure_ascii=False, indent=1)


def ep12():
    S = [
        ("hook", "A casa desse anúncio existe.", "A *casa* | desse anúncio | *existe.*"),
        ("hook", "As fotos são verdadeiras.", "As *fotos* | são *verdadeiras.*"),
        ("hook", "O aluguel é golpe.", "O aluguel | é *golpe.*"),
        ("mec", "Funciona assim: alguém copia as fotos de um imóvel anunciado de verdade, coloca um preço abaixo da região e publica nas redes.",
         "Funciona assim: | alguém *copia* | as fotos | de um imóvel | anunciado | de verdade, | coloca um *preço* | abaixo da região | e publica | nas *redes.*"),
        ("pressa", "Quando você chama, vem a pressa: tem outra família de olho, paga o sinal no Pix e a data é sua.",
         "Quando você chama, | vem a *pressa:* | tem outra família | de olho, | paga o *sinal* | no *Pix* | e a data | é sua."),
        ("pressa", "Sem contrato, sem videochamada.", "Sem *contrato,* | sem *videochamada.*"),
        ("consequencia", "E no verão, a família chega com as malas numa casa que tem dono.",
         "E no verão, | a família | chega com as *malas* | numa casa | que tem *dono.*"),
        ("consequencia", "E ele nunca alugou nada.", "E ele | *nunca* | alugou nada."),
        ("creci", "Nesta semana, o CRECI de Santa Catarina abriu a campanha de verão contra esse golpe, com fiscalização nas cidades turísticas.",
         "Nesta semana, | o *CRECI* | de Santa Catarina | abriu a *campanha* | de verão | contra esse golpe, | com *fiscalização* | nas cidades | turísticas."),
        ("defesa", "A defesa é conferir antes de pagar: o CRECI de quem anuncia, se o nome do anúncio bate com o da conta e o do dono, e o contrato antes de qualquer Pix.",
         "A defesa | é *conferir* | antes de pagar: | o *CRECI* | de quem anuncia, | se o *nome* | do anúncio | bate com o da conta | e o do dono, | e o *contrato* | antes de qualquer Pix."),
        ("desfecho", "O golpista consegue copiar a foto.", "O golpista | consegue *copiar* | a foto."),
        ("desfecho", "Não consegue copiar o que dá para conferir.", "Não consegue copiar | o que dá | para *conferir.*"),
        ("desfecho", "E neste verão, é isso que o cliente vai procurar no corretor.",
         "E neste verão, | é isso | que o cliente | vai procurar | no *corretor.*"),
    ]
    L = [("h_casa", "s1", "casa"), ("h_fotos", "s2", "fotos"), ("h_golpe", "s3", "golpe"),
         ("m_copia", "s4", "copia"), ("m_preco", "s4", "preço"), ("m_redes", "s4", "redes"),
         ("p_pressa", "s5", "pressa"), ("p_sinal", "s5", "sinal"), ("p_pix", "s5", "Pix"), ("p_sem", "s6", "Sem"), ("p_video", "s6", "videochamada"),
         ("c_verao", "s7", "verão"), ("c_malas", "s7", "malas"), ("c_dono", "s7", "dono"), ("c_nunca", "s8", "nunca"),
         ("k_creci", "s9", "CRECI"), ("k_campanha", "s9", "campanha"), ("k_fisc", "s9", "fiscalização"),
         ("d_conferir", "s10", "conferir"), ("d_creci", "s10", "CRECI"), ("d_nome", "s10", "nome"), ("d_contrato", "s10", "contrato"),
         ("f_golpista", "s11", "golpista"), ("f_conferir", "s12", "conferir"), ("f_verao", "s13", "verão"), ("f_corretor", "s13", "corretor")]
    sfx = [fx("h_casa", 0.0, "pop", -29, pitch=-3), fx("h_golpe", 0.05, "thump", -27, pitch=-3), fx("m_copia", 0.05, "swish", -29),
           fx("m_preco", 0.1, "tick", -27), fx("m_redes", 0.0, "pop", -29), fx("p_pressa", 0.0, "notif", -29), fx("p_pix", 0.0, "whoosh_up", -29, dur=0.5),
           fx("p_sem", 0.0, "click", -27, pitch=-2), fx("c_malas", 0.0, "pop", -30, pitch=-4), fx("c_nunca", -0.1, "hollow", -27),
           fx("k_creci", -0.1, "impact", -30, pitch=-3), fx("k_fisc", 0.0, "swish", -30), fx("d_creci", -0.05, "pin", -27),
           fx("d_nome", -0.05, "pin", -27, pitch=3), fx("d_contrato", -0.05, "pin", -27, pitch=6), fx("f_conferir", 0.0, "shimmer", -30),
           fx("f_corretor", 0.0, "pop", -29, pitch=2)]
    prog = [{"at": 0, "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 2, "bright": 0.45, "label": "Am — o anúncio"},
            {"at": "cue:m_copia", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.45, "label": "F — mecanismo"},
            {"at": "cue:p_pressa", "notes": [31, 43, 50, 55, 58], "root": 43, "dens": 2, "bright": 0.4, "label": "Gm — pressa"},
            {"at": "cue:c_nunca", "notes": [28, 40, 47, 52, 55], "root": 40, "dens": 1, "bright": 0.3, "label": "Em — consequência"},
            {"at": "cue:k_creci", "notes": [24, 36, 48, 52, 55], "root": 36, "dens": 2, "bright": 0.5, "label": "C — resposta"},
            {"at": "cue:d_conferir", "notes": [29, 41, 48, 53, 57, 60], "root": 41, "dens": 2, "bright": 0.55, "label": "F — defesa"},
            {"at": "cue:f_golpista", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.55, "label": "G — desfecho"}]
    diag = dict(publico_situacao="corretor (e clientes dele) às vésperas da temporada de verão", territorio="agora", funcao="C4 prova/confiança + C2",
                crenca_questionada="golpe de aluguel = foto falsa", hipotese="as fotos são verdadeiras; o que derruba o golpe é o que dá para conferir")
    apur = dict(fato="CRECI-SC lançou em 23/11/2026 a campanha 'Você precisa de um corretor de imóveis' (Operação Verão), com fiscalização em áreas turísticas",
                verificado_em="2026-11-23",
                fontes=["https://www.rcnonline.com.br/geral/2026/11/2790347-voce-precisa-de-um-corretor-de-imoveis-creci-sc-realiza-campanha-de-verao-para-prevenir-golpes-imobiliarios.html",
                        "https://agorafloripa.com.br/em-florianopolis-creci-sc-reforca-fiscalizacao-contra-golpes-em-alugueis-de-verao",
                        "https://creci-sc.gov.br/p/noticias/fique-atento-aos-golpes-no-aluguel-de-temporada/"],
                ressalvas="sem número de golpes de 2026 (o dado de 3,2 mil fraudes é do CRECI-GO/2024 e não é usado); família na porta errada = situação ilustrativa")
    lead = {"mec": 0.3, "pressa": 0.3, "consequencia": 0.35, "creci": 0.35, "defesa": 0.3, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1129-12", "ATIVO_D1129_12", "D1129", ROT + "ATIVO-D1129-12_golpe_temporada.md", "A casa existe. O aluguel, não.",
          S, L, sfx, prog, {}, diag, apur, lead, formato="maquete-3d", grade=GRADE, slot="12:00", cta_curta=True)
    ajusta("ATIVO-D1129-12", pron={"CRECI": "Créci"})


def ep18():
    S = [
        ("hook", "Mais de setenta mil famílias compraram uma casa sem nunca ter entrado nela.",
         "Mais de *setenta mil* | famílias | compraram uma casa | sem *nunca* | ter entrado nela."),
        ("contexto", "Foi nos Estados Unidos, a partir de 1908.", "Foi nos *Estados Unidos,* | a partir de *1908.*"),
        ("contexto", "A casa era vendida pelo correio, pela Sears, a loja de catálogo onde se comprava de roupa a ferramenta.",
         "A casa | era vendida | pelo *correio,* | pela Sears, | a loja de *catálogo* | onde se comprava | de roupa | a ferramenta."),
        ("trem", "Você escolhia o modelo, pagava, e a casa chegava de trem: milhares de peças numeradas, cortadas na medida, com um manual para montar.",
         "Você escolhia | o modelo, | pagava, | e a casa | chegava de *trem:* | milhares de *peças* | numeradas, | cortadas na medida, | com um *manual* | para montar."),
        ("pergunta", "Mas como alguém escolhe onde vai morar sem visitar?", "Mas como alguém | escolhe | onde vai morar | sem *visitar?*"),
        ("resposta", "Porque o catálogo respondia antes.", "Porque o catálogo | respondia *antes.*"),
        ("resposta", "Cada página mostrava a fachada, a planta com a medida de cada cômodo e tudo o que vinha no kit.",
         "Cada página | mostrava a *fachada,* | a *planta* | com a medida | de cada *cômodo* | e tudo o que | vinha no *kit.*"),
        ("escala", "A dúvida chegava resolvida.", "A dúvida | chegava *resolvida.*"),
        ("escala", "Foram centenas de modelos por mais de trinta anos, e milhares dessas casas continuam de pé.",
         "Foram *centenas* | de modelos | por mais de | trinta anos, | e *milhares* | dessas casas | continuam de pé."),
        ("desfecho", "Essas famílias não compraram no escuro.", "Essas famílias | não compraram | no *escuro.*"),
        ("desfecho", "Compraram com as respostas chegando antes das perguntas.", "Compraram | com as *respostas* | chegando *antes* | das perguntas."),
        ("desfecho", "E é isso que ainda decide qual imóvel o cliente quer visitar.",
         "E é isso | que ainda *decide* | qual imóvel | o cliente | quer *visitar.*"),
    ]
    L = [("h_setenta", "s1", "setenta"), ("h_familias", "s1", "famílias"), ("h_nunca", "s1", "nunca"),
         ("x_eua", "s2", "Estados"), ("x_1908", "s2", "1908"), ("x_correio", "s3", "correio"), ("x_catalogo", "s3", "catálogo"),
         ("x_roupa", "s3", "roupa"), ("x_ferramenta", "s3", "ferramenta"),
         ("r_modelo", "s4", "modelo"), ("r_trem", "s4", "trem"), ("r_pecas", "s4", "peças"), ("r_medida", "s4", "medida"), ("r_manual", "s4", "manual"),
         ("q_como", "s5", "como"), ("q_visitar", "s5", "visitar"),
         ("a_catalogo", "s6", "catálogo"), ("a_antes", "s6", "antes"), ("a_fachada", "s7", "fachada"), ("a_planta", "s7", "planta"),
         ("a_comodo", "s7", "cômodo"), ("a_kit", "s7", "kit"),
         ("e_duvida", "s8", "dúvida"), ("e_centenas", "s9", "centenas"), ("e_trinta", "s9", "trinta"), ("e_milhares", "s9", "milhares"), ("e_pe", "s9", "pé"),
         ("f_escuro", "s10", "escuro"), ("f_respostas", "s11", "respostas"), ("f_antes", "s11", "antes"), ("f_decide", "s12", "decide"),
         ("f_visitar", "s12", "visitar")]
    sfx = [fx("h_nunca", 0.0, "swish", -31), fx("x_1908", -0.05, "click", -27), fx("x_catalogo", 0.0, "swish", -31),
           fx("r_trem", -0.1, "whoosh_up", -30, dur=0.6), fx("r_pecas", 0.0, "scramble", -33, dur=1.0), fx("r_manual", 0.0, "click", -28),
           fx("q_como", -0.1, "hollow", -28), fx("a_catalogo", -0.15, "whoosh_fold", -29), fx("a_fachada", 0.0, "pin", -28),
           fx("a_planta", 0.0, "pin", -28, pitch=3), fx("a_comodo", 0.0, "pin", -28, pitch=5), fx("a_kit", 0.0, "click", -27),
           fx("e_centenas", 0.0, "swish", -30), fx("f_respostas", 0.0, "shimmer", -30), fx("f_visitar", 0.0, "click", -27)]
    prog = [{"at": 0, "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 2, "bright": 0.45, "label": "G — espanto"},
            {"at": "cue:x_1908", "notes": [24, 36, 48, 52, 55], "root": 36, "dens": 2, "bright": 0.45, "label": "C — 1908"},
            {"at": "cue:r_trem", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 2, "bright": 0.55, "label": "F — trem"},
            {"at": "cue:q_como", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.35, "label": "Am — pergunta"},
            {"at": "cue:a_catalogo", "notes": [24, 36, 48, 52, 55, 59], "root": 36, "dens": 2, "bright": 0.6, "label": "Cmaj7 — resposta"},
            {"at": "cue:e_centenas", "notes": [29, 41, 48, 53, 57, 60], "root": 41, "dens": 2, "bright": 0.55, "label": "F — escala"},
            {"at": "cue:f_escuro", "notes": [31, 43, 50, 55, 59, 62], "root": 43, "dens": 2, "bright": 0.6, "label": "G — insight"}]
    diag = dict(publico_situacao="corretor que depende da visita para vender", territorio="historia", funcao="C2 mudança de percepção",
                crenca_questionada="só se compra imóvel depois de visitar", hipotese="a informação que chega antes decide a visita")
    apur = dict(fato="Sears Modern Homes (1908–1940): mais de 70 mil casas vendidas por catálogo (estimativas 70–100 mil, sem contagem oficial); kits de 10 a 30 mil peças pré-cortadas e numeradas, entregues por trem; centenas de modelos (370 a mais de 400); milhares ainda de pé (estimativa 18–22 mil); catálogo com plantas e descrição dos cômodos",
                verificado_em="2026-11-23",
                fontes=["https://www.huduser.gov/portal/pdredge/pdr-edge-housingat250-article-072425.html", "https://en.wikipedia.org/wiki/Sears_Modern_Homes",
                        "https://teachingamericanhistory.org/document/mail-order-houses/", "https://archive.org/download/honorbiltmodernh00sear/honorbiltmodernh00sear.pdf"],
                ressalvas="sem preços (fontes divergem) e sem '75 páginas' do manual (fonte única); desenhos originais, nenhuma página real do catálogo")
    lead = {"contexto": 0.3, "trem": 0.3, "pergunta": 0.35, "resposta": 0.35, "escala": 0.3, "desfecho": 0.35, "cta": 0.3}
    build("ATIVO-D1129-18", "ATIVO_D1129_18", "D1129", ROT + "ATIVO-D1129-18_casas_por_catalogo.md", "A casa que chegou de trem",
          S, L, sfx, prog, {}, diag, apur, lead, formato="planta-tecnica", grade=GRADE, slot="18:00", cta_curta=True)
    ajusta("ATIVO-D1129-18", pron={"Sears": "Síars", "1908": "mil novecentos e oito"})


def ep21():
    S = [
        ("hook", "Nos Estados Unidos, o corretor não pode mais mostrar uma casa sem contrato assinado com o comprador.",
         "Nos *Estados Unidos,* | o corretor | não pode mais | mostrar uma casa | sem *contrato* | assinado | com o comprador."),
        ("regra", "A regra vale desde agosto de 2024: antes da primeira visita, até por vídeo, os dois assinam um acordo que já diz quanto o corretor recebe.",
         "A regra vale | desde *agosto* | de 2024: | antes da primeira | *visita,* | até por vídeo, | os dois *assinam* | um acordo | que já diz | quanto o corretor | *recebe.*"),
        ("brasil", "No Brasil, não existe essa exigência.", "No *Brasil,* | não existe | essa exigência."),
        ("brasil", "A visita costuma ser marcada na conversa, e o trabalho fica na confiança.",
         "A visita | costuma ser marcada | na *conversa,* | e o trabalho | fica na *confiança.*"),
        ("perda", "Até o dia em que o comprador some e fecha direto com o dono.", "Até o dia | em que o comprador | *some* | e fecha direto | com o *dono.*"),
        ("prova", "O Código Civil garante a comissão quando o negócio nasce da sua intermediação, mesmo depois.",
         "O Código Civil | garante a *comissão* | quando o negócio | nasce da sua | *intermediação,* | mesmo depois."),
        ("prova", "Mas aí a pergunta vira uma só: como provar que foi você que aproximou as partes?",
         "Mas aí | a pergunta | vira uma só: | como *provar* | que foi você | que *aproximou* | as partes?"),
        ("ficha", "É aí que a ficha de visita, as mensagens e a proposta viram prova.",
         "É aí que | a *ficha de visita,* | as *mensagens* | e a *proposta* | viram prova."),
        ("ficha", "Sem elas, sobra a sua palavra.", "Sem elas, | sobra | a sua *palavra.*"),
        ("tese", "Lá, isso virou regra.", "Lá, | isso virou *regra.*"),
        ("tese", "Aqui, depende de você.", "Aqui, | depende de *você.*"),
        ("tese", "Visita não é cortesia: é trabalho.", "Visita | não é *cortesia:* | é *trabalho.*"),
        ("tese", "E trabalho que não foi registrado antes vira só lembrança depois.",
         "E trabalho | que não foi | *registrado* antes | vira só | *lembrança* | depois."),
    ]
    L = [("h_eua", "s1", "Estados"), ("h_mostrar", "s1", "mostrar"), ("h_contrato", "s1", "contrato"),
         ("r_agosto", "s2", "agosto"), ("r_visita", "s2", "visita"), ("r_video", "s2", "vídeo"), ("r_assinam", "s2", "assinam"), ("r_recebe", "s2", "recebe"),
         ("b_brasil", "s3", "Brasil"), ("b_visita", "s4", "visita"), ("b_conversa", "s4", "conversa"), ("b_confianca", "s4", "confiança"),
         ("p_some", "s5", "some"), ("p_dono", "s5", "dono"),
         ("v_codigo", "s6", "Código"), ("v_comissao", "s6", "comissão"), ("v_depois", "s6", "depois"), ("v_provar", "s7", "provar"), ("v_partes", "s7", "partes"),
         ("f_ficha", "s8", "ficha"), ("f_mensagens", "s8", "mensagens"), ("f_proposta", "s8", "proposta"), ("f_sem", "s9", "Sem"), ("f_palavra", "s9", "palavra"),
         ("t_la", "s10", "Lá"), ("t_aqui", "s11", "Aqui"), ("t_visita", "s12", "Visita"), ("t_trabalho", "s12", "trabalho"),
         ("t_registrado", "s13", "registrado"), ("t_lembranca", "s13", "lembrança")]
    sfx = [fx("h_contrato", 0.0, "click", -28, pitch=-4), fx("r_assinam", 0.0, "pin", -29), fx("r_recebe", 0.0, "pin", -29, pitch=3),
           fx("b_brasil", -0.1, "swish", -30), fx("p_dono", 0.0, "hollow", -28), fx("v_provar", 0.0, "thump", -29, pitch=-3),
           fx("f_ficha", 0.0, "pin", -28), fx("f_mensagens", 0.0, "pin", -28, pitch=3), fx("f_proposta", 0.0, "pin", -28, pitch=6),
           fx("t_trabalho", 0.0, "shimmer", -29)]
    prog = [{"at": 0, "notes": [28, 40, 47, 52, 55], "root": 40, "dens": 1, "bright": 0.4, "label": "Em — estranhamento"},
            {"at": "cue:r_agosto", "notes": [24, 36, 43, 48, 52], "root": 36, "dens": 1, "bright": 0.45, "label": "C — a regra"},
            {"at": "cue:b_brasil", "notes": [33, 45, 52, 57, 60], "root": 45, "dens": 1, "bright": 0.4, "label": "Am — Brasil"},
            {"at": "cue:p_some", "notes": [28, 40, 47, 52, 55], "root": 40, "dens": 1, "bright": 0.3, "label": "Em — perda"},
            {"at": "cue:v_codigo", "notes": [29, 41, 48, 53, 57], "root": 41, "dens": 1, "bright": 0.4, "label": "F — direito × prova"},
            {"at": "cue:f_ficha", "notes": [24, 36, 48, 52, 55], "root": 36, "dens": 1, "bright": 0.45, "label": "C — prova"},
            {"at": "cue:t_la", "notes": [31, 43, 50, 55, 59], "root": 43, "dens": 1, "bright": 0.5, "label": "G — tese"}]
    diag = dict(publico_situacao="corretor que faz visitas sem registro e teme perder a comissão", territorio="ideia", funcao="C2 + C1",
                crenca_questionada="visita é cortesia que se faz na confiança", hipotese="o registro antes é o que transforma trabalho em prova")
    apur = dict(fato="EUA: desde 17/08/2024 (acordo da NAR), quem participa do MLS e atende comprador precisa de acordo escrito antes de mostrar o imóvel, inclusive por vídeo ao vivo, com remuneração objetiva; Brasil: Código Civil art. 727 (comissão devida quando o negócio é fruto da mediação); jurisprudência usa ficha de visita, mensagens e propostas como prova da aproximação",
                verificado_em="2026-11-23",
                fontes=["https://www.nar.realtor/sites/default/files/2024-10/nar-settlement-faq-2024-10-29.pdf", "https://www.floridarealtors.org/law-ethics/nar-settlement-faqs",
                        "https://modeloinicial.com.br/lei/CC/codigo-civil/art-727", "https://www.jusbrasil.com.br/jurisprudencia/busca?q=art+727"],
                ressalvas="regra da NAR/MLS, não lei federal; não é orientação jurídica (selo); a ficha não 'garante' comissão")
    lead = {"regra": 0.3, "brasil": 0.35, "perda": 0.35, "prova": 0.35, "ficha": 0.3, "tese": 0.4, "cta": 0.3}
    build("ATIVO-D1129-21", "ATIVO_D1129_21", "D1129", ROT + "ATIVO-D1129-21_visita_nao_e_cortesia.md", "Visita não é cortesia",
          S, L, sfx, prog, {}, diag, apur, lead, formato="pictograma-cinematografico", grade=GRADE, slot="21:00", cta_curta=True)
    ajusta("ATIVO-D1129-21", tail=3.8, gain=-28, duck=-6, bpm=70, pron={"2024": "dois mil e vinte e quatro"})  # skill do Pictograma: logo parado ~2 s, pad escuro


if __name__ == "__main__":
    alvo = sys.argv[1:] or ["12", "18", "21"]
    for a in alvo:
        {"12": ep12, "18": ep18, "21": ep21}[a]()
