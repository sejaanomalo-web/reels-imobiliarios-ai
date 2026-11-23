"""Testes do Sistema Musical ATIVO (TRILHAS/ + tools/trilhas.py + tools/adaptar_trilha.py).

Rodar a partir de PRODUCAO/:  python3 -m unittest discover -s tools/tests -v
Os testes de adaptação exigem os masters em TRILHAS/masters/ (não versionados); sem eles, são pulados com aviso.
"""
import os
import sys
import unittest

import numpy as np

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import trilhas as TR  # noqa: E402
import adaptar_trilha as AD  # noqa: E402

CAT = TR.catalogo()
MASTERS = all(os.path.exists(TR.master_path(t)) for t in CAT["trilhas"])
EPS = 0.02


def pontos_validos(t):
    """Todos os pontos em que a faixa pode ser cortada ou emendada: unidades das seções + bordas dos loops."""
    pts = set()
    for s in t["secoes"]:
        pts.update(round(p, 3) for p in TR.unidades(t, s))
        if s.get("loop"):
            pts.update(round(p, 3) for p in s["loop"])
    return sorted(pts)


def ancoras_teste(t, D):
    """Âncoras na posição proporcional natural de cada seção (a narrativa segue a ordem da faixa)."""
    util = t["master"]["util"][1]
    ini = {s["id"]: s["ini"] for s in t["secoes"]}
    return {f: round(ini[sid] / util * D, 2) for f, sid in t["funcoes"].items()}


class Catalogo(unittest.TestCase):
    def test_catalogo_sem_erro(self):
        erros, _ = TR.validar(checar_masters=False)
        self.assertEqual(erros, [], "\n".join(erros))

    def test_masters_nunca_no_git(self):
        gi = open(os.path.join(TR.REPO, ".gitignore"), encoding="utf-8").read() + open(os.path.join(TR.REPO, "TRILHAS", ".gitignore"), encoding="utf-8").read()
        for padrao in ("TRILHAS/masters/", "PRODUCAO/public/*/trilha.wav", "OUTPUT/testes-de-trilha/"):
            self.assertIn(padrao, gi)

    def test_referencia_nao_e_publicavel(self):
        for t in CAT["trilhas"]:
            if t["licenca"]["status"] == "referencia":
                self.assertFalse(TR.publicavel(t), t["id"])

    def test_unidades_na_grade(self):
        for t in CAT["trilhas"]:
            if t["grade"] == "vales":
                continue
            for s in t["secoes"]:
                us = TR.unidades(t, s)
                self.assertTrue(all(b > a for a, b in zip(us, us[1:])), f"{t['id']}/{s['id']}: unidades fora de ordem")
                for p in us[1:-1]:
                    self.assertTrue(TR._na_grade(t, p, s.get("corte")), f"{t['id']}/{s['id']}: {p} fora da grade")

    def test_sugerir_por_adequacao(self):
        r = TR.sugerir("e-se", "maquete-3d")
        self.assertEqual(r[0]["id"], "T03")
        r = TR.sugerir("corretor-real", "cartoon-explicativo")
        self.assertEqual(r[0]["id"], "T05")
        self.assertTrue(all(x["adequacao"] < 0 for x in r if x["territorio"] == "evitar" and x["modelo"] == "evitar"))


@unittest.skipUnless(MASTERS, "masters ausentes em TRILHAS/masters/ (não versionados) — testes de áudio pulados")
class Adaptacao(unittest.TestCase):
    DURACOES = (30.0, 50.0, 75.0)

    def checar(self, t, D, y, rel):
        N = int(round(D * AD.SR))
        self.assertEqual(len(y), N, "duração precisa ser exata ao quadro")
        self.assertEqual(rel["alteracao_velocidade_pct"], 0.0)
        self.assertEqual(rel["alteracao_tom_semitons"], 0)
        self.assertTrue(np.isfinite(y).all())
        self.assertLessEqual(float(np.abs(y).max()), 1.0)
        util = t["master"]["util"]
        pts = pontos_validos(t)
        for p in rel["pecas"]:
            a, b = p["fonte"]
            self.assertGreaterEqual(a, util[0] - EPS)
            self.assertLessEqual(b, util[1] + EPS)
            for x in (a, b):
                self.assertTrue(any(abs(x - q) < EPS for q in pts), f"{t['id']} {D}s: corte em {x} fora dos pontos permitidos")
        for c in rel["cortes"]:
            for x in (c["sai_da_fonte"], c["entra_na_fonte"]):
                self.assertFalse(TR_proibido(t, x), f"{t['id']} {D}s: costura em trecho proibido ({x})")
        self.assertIn(rel["pecas"][0]["secao"], t.get("entradas", [t["secoes"][0]["id"]]), "o vídeo precisa abrir numa entrada da faixa")
        fin = t["secoes"][-1]
        self.assertAlmostEqual(rel["pecas"][-1]["fonte"][1], fin["fim"], delta=EPS, msg="o final natural precisa fechar a faixa")
        self.assertEqual(rel["pecas"][-1]["secao"], fin["id"])
        # costuras: nenhuma 'perceptível'
        ruins = [c for c in rel["cortes"] if c["nota"] == "perceptível"]
        self.assertFalse(ruins, f"{t['id']} {D}s: costuras perceptíveis {ruins}")
        # clique: salto de amostra na costura não pode passar muito do que a própria música faz
        for c in rel["cortes"]:
            self.assertLess(c["salto_amostra"], 6.0, f"{t['id']} {D}s: possível clique em {c['saida']}")

    def test_cinco_faixas_curta_media_longa(self):
        for t in CAT["trilhas"]:
            for D in (self.DURACOES if t["id"] != "T02" else (45.0, 60.0, 75.0)):
                with self.subTest(trilha=t["id"], duracao=D):
                    y, rel = AD.adaptar(t["id"], D, ancoras_teste(t, D))
                    self.checar(t, D, y, rel)
                    # tolerância: meio compasso (+10%) nas faixas com grade; frase inteira na faixa rubato
                    tol = max(1.1, 0.55 * 240.0 / t["tecnico"]["bpm"]) if t["grade"] != "vales" else 7.0
                    # contrato: a âncora de maior prioridade é atendida na tolerância; as outras são atendidas OU relatadas
                    principal = max(rel["ancoras"], key=lambda a: AD.PRIORIDADE.get(a["funcao"], 0), default=None)
                    if principal:
                        self.assertIsNotNone(principal["obtido"], f"{t['id']} {D}s: âncora principal {principal['funcao']} sem evento")
                        self.assertLessEqual(abs(principal["erro"]), tol, f"{t['id']} {D}s: âncora principal {principal['funcao']} erro {principal['erro']}")
                    for a in rel["ancoras"]:
                        if a["obtido"] is not None:
                            self.assertLessEqual(abs(a["erro"]), max(tol, 2.6 if t["grade"] != "vales" else 7.0), f"{t['id']} {D}s: âncora {a['funcao']} erro {a['erro']}")
                    self.assertEqual(len(rel["ancoras"]) + len(rel["ancoras_ignoradas"]), len(ancoras_teste(t, D)), "toda âncora aparece no relatório")

    def test_extend_alem_da_faixa(self):
        for tid, D in (("T01", 95.0), ("T03", 110.0), ("T05", 105.0)):
            with self.subTest(trilha=tid):
                t = TR.trilha(tid)
                y, rel = AD.adaptar(tid, D, ancoras_teste(t, D))
                self.assertEqual(rel["modo"], "EXTEND")
                self.checar(t, D, y, rel)
                self.assertTrue(any("loop" in p["opcao"] or "respiro" in p["opcao"] for p in rel["plano"]), "EXTEND precisa usar loop seguro")

    def test_fit_sem_esticar(self):
        t = TR.trilha("T03")
        D = t["master"]["util"][1] - 0.3
        y, rel = AD.adaptar("T03", D, {})
        self.assertEqual(rel["modo"], "FIT")
        self.checar(t, D, y, rel)

    def test_ancora_ancorada_na_palavra(self):
        y, rel = AD.adaptar("T03", 49.967, {"descoberta": 18.52, "insight": 28.52})
        erros = {a["funcao"]: a["erro"] for a in rel["ancoras"]}
        self.assertLessEqual(abs(erros["insight"]), 0.6)
        self.assertLessEqual(abs(erros["descoberta"]), 0.6)

    def test_duracao_impossivel_explica(self):
        with self.assertRaises(SystemExit) as cm:
            AD.adaptar("T02", 20.0, {})
        self.assertIn("esta faixa serve de", str(cm.exception))

    def test_ordem_incompativel_relatada(self):
        _, rel = AD.adaptar("T04", 50.0, {"insight": 30.0, "virada": 40.0})
        self.assertTrue(any("ordem" in a["motivo"] for a in rel["ancoras_ignoradas"]))

    def test_funcao_sem_evento_e_relatada(self):
        _, rel = AD.adaptar("T01", 40.0, {"insight": 25.0})
        self.assertTrue(any(a["funcao"] == "insight" for a in rel["ancoras_ignoradas"]))


def TR_proibido(t, x):
    return any(a + 0.012 < x < b - 0.012 for a, b in t.get("proibido_cortar", []))


if __name__ == "__main__":
    unittest.main()
