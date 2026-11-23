import React, { useMemo } from "react";
import { Img, staticFile } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ATMOSFERA, BRAND, C, DS, F, type AtmosferaNome } from "../theme";
import { A, aa } from "../episodes/NOV26/kit";
import { clamp01, ease, mix, prog, sp } from "../lib/anim";
import type { CaptionChunk } from "../episodes/types";

/**
 * QUARTO MODELO — MAQUETE 3D (23/11/2026). Skill: .claude/skills/quarto-modelo-maquete-3d/SKILL.md ·
 * registro: MARCA/sistema-visual/modelos.json (id "maquete-3d").
 *
 * O assunto vira uma MAQUETE de miniaturas de argila fosca num chão escuro infinito: a câmera anda por um único mundo
 * (plano-sequência, sem corte), cada capítulo troca o clima (atmosferas do Nível 1 na névoa e no chão), objetos "brotam"
 * do chão na palavra, placas em hastes nomeiam as coisas, arcos de pontos mostram fluxos, o holofote marca o protagonista.
 * Verde ATIVO só no que acende (solução, você, o corretor); vermelho só em perda. Cabeçalho editorial à esquerda com
 * "ATIVO · tema", chip do capítulo e FONTES (assinatura 7); legenda em caixa escura; fecho com módulos que acendem e o
 * campo que digita SISTEMA + logo oficial.
 *
 * Técnica: @remotion/three (react-three-fiber). Render com `--gl=angle` (ou swangle). Textos são HTML projetado
 * (Manrope/JetBrains Mono do sistema, nítidos e com sombra de leitura), nunca texto dentro do 3D.
 */

export type V3 = [number, number, number];
export type Cam = { pos: V3; alvo: V3; fov: number };
export type CamKey = { t: number; pos: V3; alvo: V3; fov?: number; e?: (x: number) => number };

/* ---------------------------------------------------------------- materiais (tokens) ---------------------------------------------------------------- */
/** Argila clara (material das miniaturas) — cor de apoio do Nível 1, só dentro da ilustração. */
export const ARGILA = DS.apoio.papel;
/** Argila escura (objetos secundários / mobiliário). */
export const GRAFITE = DS.cor.texto.terciario;
const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

type Mat = "argila" | "grafite" | "alerta" | "aceso";
const corMat = (m: Mat) => (m === "grafite" ? GRAFITE : m === "alerta" ? C.warn : m === "aceso" ? A.hex : ARGILA);

/** Material fosco; `acende` (0..1) leva do material para o verde ATIVO com brilho próprio leve. */
const Material: React.FC<{ mat?: Mat; acende?: number; opacidade?: number }> = ({ mat = "argila", acende = 0, opacidade = 1 }) => {
  const base = new THREE.Color(corMat(mat));
  const k = clamp01(acende);
  const cor = base.clone().lerp(new THREE.Color(A.hex), k);
  return (
    <meshStandardMaterial
      color={cor}
      roughness={0.88}
      metalness={0}
      emissive={new THREE.Color(A.hex)}
      emissiveIntensity={0.45 * k}
      transparent={opacidade < 1}
      opacity={opacidade}
    />
  );
};

/* ---------------------------------------------------------------- câmera ---------------------------------------------------------------- */
const lerp3 = (a: V3, b: V3, p: number): V3 => [mix(a[0], b[0], p), mix(a[1], b[1], p), mix(a[2], b[2], p)];

/** Câmera contínua entre estações (chaves no tempo, ancoradas nos cues). Um leve "respiro" evita quadro parado. */
export const camAt = (t: number, keys: CamKey[]): Cam => {
  const ks = [...keys].sort((a, b) => a.t - b.t);
  let cam: Cam = { pos: ks[0].pos, alvo: ks[0].alvo, fov: ks[0].fov ?? 34 };
  for (let i = 1; i < ks.length; i++) {
    if (t <= ks[i - 1].t) break;
    const p = (ks[i].e ?? ease.inOut)(clamp01((t - ks[i - 1].t) / Math.max(1e-6, ks[i].t - ks[i - 1].t)));
    const a = ks[i - 1], b = ks[i];
    cam = { pos: lerp3(a.pos, b.pos, p), alvo: lerp3(a.alvo, b.alvo, p), fov: mix(a.fov ?? 34, b.fov ?? 34, p) };
  }
  const r = 0.06;
  return { ...cam, pos: [cam.pos[0] + Math.sin(t * 0.37) * r, cam.pos[1] + Math.sin(t * 0.29 + 1) * r * 0.6, cam.pos[2]] };
};

const _proj = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.1, 400);
/** Projeta um ponto do mundo para a tela (px de 1080×1920), com a mesma câmera da maquete. */
export const projetar = (cam: Cam, p: V3) => {
  _proj.fov = cam.fov;
  _proj.position.set(...cam.pos);
  _proj.up.set(0, 1, 0);
  _proj.lookAt(...cam.alvo);
  _proj.updateProjectionMatrix();
  _proj.updateMatrixWorld(true);
  const v = new THREE.Vector3(...p).project(_proj);
  return { x: ((v.x + 1) / 2) * 1080, y: ((1 - v.y) / 2) * 1920, visivel: v.z < 1 };
};

const Rig: React.FC<{ cam: Cam }> = ({ cam }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = cam.fov;
  c.near = 0.1;
  c.far = 400;
  c.position.set(...cam.pos);
  c.up.set(0, 1, 0);
  c.lookAt(...cam.alvo);
  c.updateProjectionMatrix();
  return null;
};

/* ---------------------------------------------------------------- mundo ---------------------------------------------------------------- */
/** Spot do holofote com alvo real na cena (o alvo precisa estar no grafo para a matriz ser atualizada). */
const Spot: React.FC<{ pos: V3; alvo: V3; intensidade: number }> = ({ pos, alvo, intensidade }) => {
  const alvoObj = useMemo(() => new THREE.Object3D(), []);
  alvoObj.position.set(...alvo);
  alvoObj.updateMatrixWorld();
  return (
    <>
      <primitive object={alvoObj} />
      <spotLight position={pos} target={alvoObj} intensity={140 * intensidade} angle={0.32} penumbra={0.85} distance={30} decay={1.6} castShadow shadow-mapSize={[1024, 1024]} />
    </>
  );
};

const atmMix = (de: AtmosferaNome, para: AtmosferaNome, k: number) => {
  const a = ATMOSFERA[de], b = ATMOSFERA[para];
  return {
    centro: new THREE.Color(a.centro).lerp(new THREE.Color(b.centro), k),
    borda: new THREE.Color(a.borda).lerp(new THREE.Color(b.borda), k),
  };
};

/**
 * O mundo da maquete: fundo com a atmosfera (HTML, centro → borda), névoa e chão na mesma cor, luz ambiente baixa, uma
 * luz-chave suave e o HOLOFOTE (spot) no protagonista. `atm`→`atmPara` com `atmK` faz a troca de clima de capítulo.
 */
export const Mundo: React.FC<{
  cam: Cam; atm: AtmosferaNome; atmPara?: AtmosferaNome; atmK?: number;
  holofote?: { pos: V3; alvo: V3; intensidade: number };
  children: React.ReactNode;
}> = ({ cam, atm, atmPara, atmK = 0, holofote, children }) => {
  const m = atmMix(atm, atmPara ?? atm, atmK);
  const centro = `#${m.centro.getHexString()}`;
  const borda = `#${m.borda.getHexString()}`;
  const nevoa = m.centro.clone().lerp(m.borda, 0.45);
  const chao = m.centro.clone().lerp(new THREE.Color(C.bg0), 0.35);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 70% at 50% 48%, ${centro} 0%, ${borda} 78%)` }} />
      <ThreeCanvas width={1080} height={1920} shadows="soft" gl={{ alpha: true, antialias: true }} style={{ position: "absolute", inset: 0 }}>
        <Rig cam={cam} />
        <fog attach="fog" args={[nevoa, 14, 46]} />
        <hemisphereLight args={["#FFFFFF", chao, 0.55]} />
        <directionalLight position={[-6, 12, 8]} intensity={0.9} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-radius={6} />
        {holofote && holofote.intensidade > 0.001 ? <Spot {...holofote} /> : null}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[400, 400]} />
          <meshStandardMaterial color={chao} roughness={1} metalness={0} />
        </mesh>
        {children}
      </ThreeCanvas>
      {/* vinheta (assinatura 5) + rodapé que morre no quase preto (Nível 1: bordas e rodapé ≤ 16/255) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(130% 85% at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.88) 100%)" }} />
    </>
  );
};

/* ---------------------------------------------------------------- objetos 3D ---------------------------------------------------------------- */
/** "Brotar do chão": escala vertical a partir da base, com leve sobre-impulso (mola). */
const brota = (s: number) => Math.max(0.0001, s);

/** Bloco genérico (móvel, caixa, documento em pé). */
export const Bloco: React.FC<{ pos: V3; tam: V3; mat?: Mat; surge?: number; acende?: number; rot?: number }> = ({ pos, tam, mat = "argila", surge = 1, acende = 0, rot = 0 }) => (
  <group position={pos} rotation={[0, rot, 0]} scale={[1, brota(surge), 1]} visible={surge > 0.001}>
    <mesh position={[0, tam[1] / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={tam} />
      <Material mat={mat} acende={acende} />
    </mesh>
  </group>
);

/** Casa de maquete (corpo + telhado em prisma + porta e janelas escuras). */
export const Casa: React.FC<{ pos: V3; escala?: number; rot?: number; surge?: number; acende?: number; mat?: Mat }> = ({ pos, escala = 1, rot = 0, surge = 1, acende = 0, mat = "argila" }) => (
  <group position={pos} rotation={[0, rot, 0]} scale={[escala, escala * brota(surge), escala]} visible={surge > 0.001}>
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow><boxGeometry args={[1.2, 1, 1]} /><Material mat={mat} acende={acende} /></mesh>
    <mesh position={[0, 1.28, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.62, 0.62, 1.04, 3]} /><Material mat="grafite" acende={acende * 0.6} /></mesh>
    <mesh position={[0, 0.32, 0.505]}><boxGeometry args={[0.26, 0.5, 0.02]} /><meshStandardMaterial color={C.surface} roughness={1} /></mesh>
    {[-0.36, 0.36].map((x) => <mesh key={x} position={[x, 0.6, 0.505]}><boxGeometry args={[0.22, 0.2, 0.02]} /><meshStandardMaterial color={C.surface} roughness={1} /></mesh>)}
  </group>
);

/** Prédio de N andares (caixas com janelas em faixa). */
export const Predio: React.FC<{ pos: V3; andares?: number; escala?: number; surge?: number; acende?: number }> = ({ pos, andares = 4, escala = 1, surge = 1, acende = 0 }) => (
  <group position={pos} scale={[escala, escala, escala]} visible={surge > 0.001}>
    {Array.from({ length: andares }).map((_, i) => {
      const q = clamp01(surge * andares - i);
      if (q <= 0) return null;
      return (
        <group key={i} position={[0, i * 0.55, 0]} scale={[1, brota(q), 1]}>
          <mesh position={[0, 0.275, 0]} castShadow receiveShadow><boxGeometry args={[1.3, 0.53, 1]} /><Material acende={acende} /></mesh>
          <mesh position={[0, 0.29, 0.505]}><boxGeometry args={[1.05, 0.16, 0.02]} /><meshStandardMaterial color={C.surface} roughness={1} /></mesh>
        </group>
      );
    })}
  </group>
);

/** Banco/instituição: base, 4 colunas e laje (sem nome nem marca — o nome vai numa Placa). */
export const Instituicao: React.FC<{ pos: V3; escala?: number; surge?: number; acende?: number }> = ({ pos, escala = 1, surge = 1, acende = 0 }) => (
  <group position={pos} scale={[escala, escala * brota(surge), escala]} visible={surge > 0.001}>
    <mesh position={[0, 0.1, 0]} castShadow receiveShadow><boxGeometry args={[2.2, 0.2, 1.4]} /><Material acende={acende} /></mesh>
    {[-0.75, -0.25, 0.25, 0.75].map((x) => <mesh key={x} position={[x, 0.75, 0.45]} castShadow><cylinderGeometry args={[0.1, 0.1, 1.1, 14]} /><Material acende={acende} /></mesh>)}
    <mesh position={[0, 0.75, -0.2]} castShadow receiveShadow><boxGeometry args={[1.9, 1.1, 0.7]} /><Material mat="grafite" acende={acende * 0.5} /></mesh>
    <mesh position={[0, 1.4, 0]} castShadow><boxGeometry args={[2.3, 0.2, 1.5]} /><Material acende={acende} /></mesh>
  </group>
);

/**
 * Tanque/reservatório: casca translúcida + nível (0..1). `alerta` (0..1) tinge o nível de vermelho (pressão/perda);
 * `acende` tinge de verde (abastecido/solução).
 */
export const Tanque: React.FC<{ pos: V3; raio?: number; alt?: number; nivel: number; surge?: number; alerta?: number; acende?: number }> = ({ pos, raio = 1, alt = 2.2, nivel, surge = 1, alerta = 0, acende = 0 }) => {
  const n = clamp01(nivel);
  const agua = new THREE.Color(ATMOSFERA.dados.centro).lerp(new THREE.Color(C.text), 0.25).lerp(new THREE.Color(C.warn), clamp01(alerta)).lerp(new THREE.Color(A.hex), clamp01(acende));
  return (
    <group position={pos} scale={[1, brota(surge), 1]} visible={surge > 0.001}>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow><cylinderGeometry args={[raio * 1.08, raio * 1.08, 0.16, 40]} /><Material mat="grafite" /></mesh>
      {n > 0.005 ? (
        <mesh position={[0, 0.16 + (alt * n) / 2, 0]}>
          <cylinderGeometry args={[raio * 0.92, raio * 0.92, alt * n, 40]} />
          <meshStandardMaterial color={agua} roughness={0.5} emissive={agua} emissiveIntensity={0.18 + 0.25 * clamp01(acende + alerta)} />
        </mesh>
      ) : null}
      <mesh position={[0, 0.16 + alt / 2, 0]} castShadow>
        <cylinderGeometry args={[raio, raio, alt, 40, 1, true]} />
        <meshStandardMaterial color={ARGILA} roughness={0.3} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.16 + alt, 0]}><torusGeometry args={[raio, 0.05, 10, 48]} /><Material /></mesh>
    </group>
  );
};

/**
 * Boneco-manequim de argila (sem rosto). `gravata` = o CORRETOR (gravata verde, assinatura 4). `acende` deixa o corpo
 * levemente verde (vitória). `pose`: "pe" | "aponta" | "bracos".
 */
export const Boneco: React.FC<{ pos: V3; rot?: number; escala?: number; surge?: number; gravata?: boolean; acende?: number; mat?: Mat; pose?: "pe" | "aponta" | "bracos" }> = ({ pos, rot = 0, escala = 1, surge = 1, gravata = false, acende = 0, mat = "argila", pose = "pe" }) => {
  const bD = pose === "aponta" ? -1.25 : pose === "bracos" ? -0.6 : -0.08;
  const bE = pose === "bracos" ? 0.6 : 0.08;
  return (
    <group position={pos} rotation={[0, rot, 0]} scale={[escala, escala * brota(surge), escala]} visible={surge > 0.001}>
      {[-0.13, 0.13].map((x) => <mesh key={x} position={[x, 0.42, 0]} castShadow><capsuleGeometry args={[0.09, 0.62, 6, 12]} /><Material mat={mat} acende={acende * 0.5} /></mesh>)}
      <mesh position={[0, 1.12, 0]} castShadow><capsuleGeometry args={[0.24, 0.5, 8, 16]} /><Material mat={mat} acende={acende * 0.5} /></mesh>
      <mesh position={[0, 1.72, 0]} castShadow><sphereGeometry args={[0.2, 24, 16]} /><Material mat={mat} acende={acende * 0.5} /></mesh>
      <group position={[0.33, 1.38, 0]} rotation={[0, 0, bD]}><mesh position={[0, -0.3, 0]} castShadow><capsuleGeometry args={[0.07, 0.48, 6, 10]} /><Material mat={mat} acende={acende * 0.5} /></mesh></group>
      <group position={[-0.33, 1.38, 0]} rotation={[0, 0, bE]}><mesh position={[0, -0.3, 0]} castShadow><capsuleGeometry args={[0.07, 0.48, 6, 10]} /><Material mat={mat} acende={acende * 0.5} /></mesh></group>
      {gravata ? <mesh position={[0, 1.22, 0.235]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.1, 0.1, 0.03]} /><meshStandardMaterial color={A.hex} emissive={A.hex} emissiveIntensity={0.6 + 0.6 * clamp01(acende)} /></mesh> : null}
      {gravata ? <mesh position={[0, 1.08, 0.24]}><boxGeometry args={[0.07, 0.26, 0.03]} /><meshStandardMaterial color={A.hex} emissive={A.hex} emissiveIntensity={0.6 + 0.6 * clamp01(acende)} /></mesh> : null}
    </group>
  );
};

/** Haste da placa (a placa em si é HTML projetado em `Placas`, ancorada no topo: [x, alt, z]). */
export const Haste: React.FC<{ pos: V3; alt?: number; surge?: number }> = ({ pos, alt = 2.4, surge = 1 }) => (
  <group position={pos} scale={[1, brota(surge), 1]} visible={surge > 0.001}>
    <mesh position={[0, alt / 2, 0]} castShadow><cylinderGeometry args={[0.025, 0.025, alt, 8]} /><Material mat="grafite" /></mesh>
    <mesh position={[0, 0.03, 0]}><cylinderGeometry args={[0.12, 0.12, 0.06, 16]} /><Material mat="grafite" /></mesh>
  </group>
);

/** Arco de pontos entre dois lugares (fluxo de dinheiro, rota). `p` revela os pontos em ordem. */
export const Fluxo: React.FC<{ de: V3; para: V3; altura?: number; p: number; n?: number; mat?: Mat; anda?: number }> = ({ de, para, altura = 1.6, p, n = 18, mat = "argila", anda = 0 }) => {
  const k = clamp01(p);
  if (k <= 0) return null;
  const meio: V3 = [(de[0] + para[0]) / 2, Math.max(de[1], para[1]) + altura, (de[2] + para[2]) / 2];
  const ponto = (u: number): V3 => {
    const a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u;
    return [a * de[0] + b * meio[0] + c * para[0], a * de[1] + b * meio[1] + c * para[1], a * de[2] + b * meio[2] + c * para[2]];
  };
  const cor = corMat(mat);
  return (
    <group>
      {Array.from({ length: n }).map((_, i) => {
        const u = ((i + (anda % 1)) / n) % 1;
        if (u > k) return null;
        return (
          <mesh key={i} position={ponto(u)}>
            <sphereGeometry args={[0.07, 12, 8]} />
            <meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={mat === "argila" ? 0.25 : 0.6} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Cone de luz visível do holofote (o spot de verdade vai em `Mundo holofote`). Verde quando o protagonista vence. */
export const ConeLuz: React.FC<{ pos: V3; alt?: number; raio?: number; p?: number; verde?: number }> = ({ pos, alt = 6, raio = 1.4, p = 1, verde = 0 }) => {
  const cor = new THREE.Color("#FFFFFF").lerp(new THREE.Color(A.hex), clamp01(verde));
  return (
    <group position={pos} visible={p > 0.001}>
      <mesh position={[0, alt / 2, 0]}>
        <coneGeometry args={[raio, alt, 40, 1, true]} />
        <meshBasicMaterial color={cor} transparent opacity={0.07 * clamp01(p)} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <circleGeometry args={[raio * 0.95, 48]} />
        <meshBasicMaterial color={cor} transparent opacity={0.07 * clamp01(p)} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

/** Poeira/bokeh sutil (assinatura 5) — pontos fixos que derivam devagar. */
export const Poeira: React.FC<{ t: number; centro?: V3; n?: number }> = ({ t, centro = [0, 2, 0], n = 40 }) => (
  <group>
    {Array.from({ length: n }).map((_, i) => {
      const r1 = Math.sin(i * 12.9898) * 43758.5453, r2 = Math.sin(i * 78.233) * 12345.678, r3 = Math.sin(i * 39.425) * 9876.54;
      const fx = r1 - Math.floor(r1), fy = r2 - Math.floor(r2), fz = r3 - Math.floor(r3);
      const x = centro[0] + (fx - 0.5) * 30 + Math.sin(t * 0.2 + i) * 0.3;
      const y = centro[1] + fy * 7 + Math.sin(t * 0.3 + i * 2) * 0.2;
      const z = centro[2] + (fz - 0.5) * 16;
      return <mesh key={i} position={[x, y, z]}><sphereGeometry args={[0.025, 6, 4]} /><meshBasicMaterial color="#FFFFFF" transparent opacity={0.28} depthWrite={false} /></mesh>;
    })}
  </group>
);

/* ---------------------------------------------------------------- camada HTML (textos) ---------------------------------------------------------------- */
export type PlacaDef = { id: string; pos: V3; texto: string; tom?: "neutra" | "acento" | "alerta"; p: number };

/**
 * Placas das hastes: HTML projetado no topo da haste (Manrope 800 maiúsculo, 30 px). Neutra = grafite, acento = verde
 * ATIVO com texto escuro, alerta = vermelho. Nunca entram na coluna de botões nem acima de y 250.
 */
export const Placas: React.FC<{ cam: Cam; placas: PlacaDef[] }> = ({ cam, placas }) => (
  <>
    {placas.map((q) => {
      if (q.p <= 0.001) return null;
      const s = projetar(cam, q.pos);
      if (!s.visivel) return null;
      const tom = q.tom ?? "neutra";
      const bg = tom === "acento" ? A.hex : tom === "alerta" ? DS.cor.alerta.fundo : C.surface2;
      const fg = tom === "acento" ? A.ink : C.text;
      const w = Math.min(620, 40 + q.texto.length * 21);
      let x = s.x - w / 2;
      const yTop = Math.max(260, s.y - 70);
      const xMax = yTop + 70 > 1150 && yTop < 1760 ? 940 - w : 980 - w;
      x = Math.max(100, Math.min(x, xMax));
      const k = ease.out(clamp01(q.p));
      return (
        <div key={q.id} style={{ position: "absolute", left: x, top: yTop, width: w, height: 62, display: "flex", alignItems: "center", justifyContent: "center", background: bg, border: tom === "neutra" ? `2px solid ${C.dim}` : "none", borderRadius: 10, boxShadow: tom === "acento" ? `0 0 28px ${aa(0.35)}` : "0 6px 18px rgba(0,0,0,0.5)", fontFamily: F.sans, fontWeight: 800, fontSize: 30, letterSpacing: "0.04em", color: fg, opacity: clamp01(q.p * 2), transform: `scale(${mix(0.7, 1, k)})`, transformOrigin: "50% 100%" }}>
          {q.texto}
        </div>
      );
    })}
  </>
);

export type Capitulo = { de: number; chip: string; titulo?: React.ReactNode; numero?: string; rotulo?: string; selo?: string };

/**
 * Cabeçalho editorial (topo, alinhado à esquerda, x 100): "ATIVO · TEMA" (mono), chip do capítulo com ponto verde,
 * "FONTES: …" (assinatura 7), selo opcional e o título-manchete (Manrope 800, 72 px) OU um número grande (124 px) com
 * rótulo mono. Troca de capítulo: o título sai em 0,2 s e o novo sobe do desfoque.
 */
export const Cabecalho: React.FC<{ t: number; tema: string; fontes: string; capitulos: Capitulo[]; ate?: number }> = ({ t, tema, fontes, capitulos, ate = 1e9 }) => {
  const idx = capitulos.reduce((acc, c, i) => (t >= c.de - 0.05 ? i : acc), -1);
  if (idx < 0) return null;
  const cap = capitulos[idx];
  const prox = capitulos[idx + 1];
  const entra = prog(t, cap.de - 0.05, 0.35, ease.out);
  const sai = prox ? prog(t, prox.de - 0.3, 0.22, ease.in) : prog(t, ate, 0.3, ease.in);
  const vis = entra * (1 - sai);
  const geral = 1 - prog(t, ate, 0.3, ease.in);
  return (
    <div style={{ position: "absolute", left: 100, right: 130, top: 262, fontFamily: F.sans, opacity: geral, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.16em", color: C.muted }}>ATIVO · {tema}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, border: `2px solid ${C.dim}`, borderRadius: 999, padding: "5px 18px 5px 12px", background: "rgba(7,8,10,0.6)", opacity: vis }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: A.hex, boxShadow: `0 0 12px ${aa(0.7)}` }} />
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.14em", color: C.text }}>{cap.chip}</div>
        </div>
      </div>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: C.muted, marginTop: 12 }}>FONTES: {fontes}</div>
      {cap.selo ? <div style={{ display: "inline-block", marginTop: 14, border: `2px solid ${C.muted}`, padding: "4px 14px", fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.14em", color: C.text, opacity: vis }}>{cap.selo}</div> : null}
      <div style={{ marginTop: 14, opacity: vis, translate: `0px ${(1 - entra) * 18}px`, filter: `blur(${(1 - entra) * 6}px)` }}>
        {cap.numero ? (
          <>
            <div style={{ fontWeight: 800, fontSize: 124, lineHeight: 0.95, letterSpacing: "-0.04em", color: A.hex }}>{cap.numero}</div>
            {cap.rotulo ? <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.12em", color: C.text, marginTop: 8 }}>{cap.rotulo}</div> : null}
          </>
        ) : (
          <div style={{ fontWeight: 800, fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.03em", color: C.text, maxWidth: 840 }}>{cap.titulo}</div>
        )}
      </div>
    </div>
  );
};

/**
 * Legenda em caixa escura (Nível 2 deste modelo): topo y 1440 (termina antes de 1570), Manrope 800, 56 px, caixa de frase, dentro de x 110–940 (fora da coluna
 * de botões). A palavra dita fica branca, a que vem fica cinza ("pendente"), a palavra-chave em verde.
 */
export const LegendaCaixa: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number }> = ({ t, chunks, y = 1440, size = 56 }) => {
  const chunk = chunks.find((c) => t >= c.start - 0.04 && t < c.end + 0.02);
  if (!chunk) return null;
  const vis = prog(t, chunk.start - 0.04, 0.1) * (1 - prog(t, chunk.end - 0.06, 0.08, ease.in));
  return (
    <div style={{ position: "absolute", left: 110, width: 830, top: y, display: "flex", justifyContent: "center", opacity: vis }}>
      <div style={{ maxWidth: 830, padding: "14px 28px 16px", borderRadius: 18, background: "rgba(7,8,10,0.8)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: size * 0.26, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
        {chunk.words.map((w, i) => {
          const dita = t >= w.start - 0.02;
          return <span key={i} style={{ color: w.emph ? (dita ? A.hex : aa(0.45)) : dita ? C.text : DS.cor.texto.pendente, whiteSpace: "nowrap" }}>{w.text}</span>;
        })}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- fecho (CTA SISTEMA) ---------------------------------------------------------------- */
const wAt = (caps: CaptionChunk[], seg: string, re: RegExp, fb: number) => {
  for (const k of caps) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
  return fb;
};
export type TlCta = { captions: CaptionChunk[]; cues: Record<string, number>; duration: number };

/** Tempos do fecho, lidos das palavras faladas (pergunta e "Comente"). */
export const temposCta = (tl: TlCta, segPergunta: string, segComente: string) => {
  const caps = tl.captions, c = tl.cues;
  const t0 = caps.find((k) => k.seg === segPergunta)?.start ?? c.cta_quer;
  if (segPergunta === segComente) {
    // CTA curta (Skill Mestre, 21/11/2026): "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."
    // O campo digita em "comente SISTEMA"; os módulos acendem em "conheça · nosso · personalizado"; o logo fecha. Sem linha de Direct.
    const tC = wAt(caps, segComente, /^comente/i, t0 + 1.1);
    const fim = Math.max(...caps.filter((k) => k.seg === segComente).map((k) => k.end), t0 + 3.5);
    return {
      t0, tCom: tC, curta: true,
      tIm: wAt(caps, segPergunta, /^conhe/i, tC + 1.0), tLe: wAt(caps, segPergunta, /^nosso/i, tC + 1.4), tAt: wAt(caps, segPergunta, /^personalizado/i, tC + 2.0),
      tSis: wAt(caps, segComente, /^sistema/i, tC + 0.4), tDir: fim,
    };
  }
  const tCom = caps.find((k) => k.seg === segComente)?.start ?? c.cta_comment;
  return { curta: false,
    t0, tCom,
    tIm: wAt(caps, segPergunta, /im[óo]veis/i, t0 + 2.4), tLe: wAt(caps, segPergunta, /leads/i, t0 + 3), tAt: wAt(caps, segPergunta, /atendimentos/i, t0 + 3.6),
    tSis: wAt(caps, segComente, /sistema/i, tCom + 0.5), tDir: wAt(caps, segComente, /direct/i, tCom + 2.3),
  };
};

/**
 * Parte 3D do fecho (vai dentro do `Mundo`): pedestal com os 3 módulos do sistema — casa (IMÓVEIS), boneco (LEADS) e balão
 * (ATENDIMENTOS) — que brotam esboçados na pergunta e ACENDEM em verde, cada um na sua palavra. `base` = posição do pedestal.
 */
export const ModulosSistema: React.FC<{ t: number; tl: TlCta; segPergunta: string; segComente: string; base: V3 }> = ({ t, tl, segPergunta, segComente, base }) => {
  const k = temposCta(tl, segPergunta, segComente);
  const ped = prog(t, k.t0 - 0.2, 0.6, ease.out);
  // os 3 módulos entram ESBOÇADOS (argila) logo na pergunta, um a um; cada um ACENDE na sua palavra
  const s = (i: number) => sp(t, k.t0 + 0.25 + i * 0.22, { damping: 12, stiffness: 170 });
  const ac = (at: number) => prog(t, at - 0.05, 0.4);
  const [bx, by, bz] = base;
  return (
    <group>
      <Bloco pos={[bx, by, bz]} tam={[5.4, 0.3, 2]} mat="grafite" surge={ped} />
      <Casa pos={[bx - 1.8, by + 0.3, bz]} surge={s(0)} acende={ac(k.tIm)} escala={0.9} />
      <Boneco pos={[bx, by + 0.3, bz]} surge={s(1)} acende={ac(k.tLe)} escala={0.75} />
      <group position={[bx + 1.8, by + 0.3, bz]} scale={[1, Math.max(0.0001, s(2)), 1]} visible={s(2) > 0.001}>
        <mesh position={[0, 0.75, 0]} castShadow><boxGeometry args={[1.1, 0.75, 0.3]} /><Material acende={ac(k.tAt)} /></mesh>
        <mesh position={[-0.25, 0.25, 0]} rotation={[0, 0, Math.PI]} castShadow><coneGeometry args={[0.16, 0.32, 3]} /><Material acende={ac(k.tAt)} /></mesh>
      </group>
    </group>
  );
};

/**
 * Parte HTML do fecho (ritual SISTEMA, assinatura 6): em "Comente" surge o campo que digita S-I-S-T-E-M-A e o botão de
 * envio acende; em "Direct" aparece "detalhes pelo Direct"; por fim o LOGO OFICIAL. Fica na faixa y 560–990 (o pedestal 3D aparece abaixo).
 */
export const CtaMaquete: React.FC<{ t: number; tl: TlCta; segPergunta: string; segComente: string; logo?: string }> = ({ t, tl, segPergunta, segComente, logo = BRAND.logo }) => {
  const k = temposCta(tl, segPergunta, segComente);
  const campo = prog(t, k.tCom - 0.1, 0.4, ease.out);
  const typed = Math.round(prog(t, k.tSis - 0.05, 0.5, ease.linear) * 7);
  const enviado = typed >= 7;
  const dir = prog(t, k.tDir - 0.25, 0.3);
  const logoP = prog(t, k.tDir + (k.curta ? 0.2 : 0.7), 0.8, ease.out);
  const brilho = 0.5 + 0.5 * Math.sin(t * 4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      {campo > 0.001 ? (
        <div style={{ position: "absolute", left: 120, width: 820, top: 560, opacity: campo, translate: `0px ${(1 - campo) * 20}px` }}>
          <div style={{ textAlign: "left", fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.16em", color: C.muted, marginBottom: 12, textShadow: SOMBRA }}>COMENTE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, borderRadius: 22, padding: "16px 16px 16px 34px", background: "rgba(7,8,10,0.88)", border: `2px solid ${C.dim}`, boxShadow: `0 0 ${26 + 26 * brilho}px ${aa(0.08 + 0.14 * brilho)}` }}>
            <div style={{ flex: 1, fontWeight: 800, fontSize: 68, letterSpacing: "0.06em", color: C.text }}>
              {"SISTEMA".slice(0, typed)}
              <span style={{ color: A.hex, opacity: !enviado && Math.floor(t * 3) % 2 === 0 ? 1 : 0 }}>|</span>
            </div>
            <div style={{ width: 96, height: 96, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", background: enviado ? A.hex : "transparent", border: `3px solid ${A.hex}` }}>
              <svg width={52} height={52} viewBox="-26 -26 52 52"><path d="M -17 -3 L 19 -17 L 6 19 L 0 3 Z M 0 3 L 19 -17" fill="none" stroke={enviado ? A.ink : A.hex} strokeWidth={3} strokeLinejoin="round" /></svg>
            </div>
          </div>
          {k.curta ? null : <div style={{ marginTop: 18, fontWeight: 700, fontSize: 36, color: C.text, opacity: dir, textShadow: SOMBRA }}>detalhes pelo <span style={{ color: A.hex }}>Direct</span></div>}
        </div>
      ) : null}
      {logoP > 0.001 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", opacity: logoP, translate: `0px ${(1 - logoP) * 16}px` }}>
          <Img src={staticFile(logo)} style={{ height: 104, filter: `drop-shadow(0 0 18px ${aa(0.35)})` }} />
        </div>
      ) : null}
    </div>
  );
};

export { clamp01, ease, mix, prog, sp };
