// Adaptação do texto da fila (legenda do Instagram) para YouTube Shorts e TikTok.
// CÓPIA IDÊNTICA em supabase/functions/yt-publicador/textos.ts e supabase/functions/buffer-tiktok/textos.ts — altere as duas.
//
// A legenda da fila começa com a CTA do Instagram ("📲 Comente "SISTEMA"…"), que depende da automação de Direct do
// Instagram e não funciona no YouTube nem no TikTok. Ela é trocada por CTA_FORA_DO_INSTAGRAM. O resto (texto e as
// 5 hashtags) é mantido. Decisão de CTA dessas plataformas é do cliente: mude só a constante abaixo.

export const RAW = "https://raw.githubusercontent.com/sejaanomalo-web/reels-imobiliarios-ai/main";
export const CTA_FORA_DO_INSTAGRAM = "🔗 Sistema personalizado para corretores de imóveis: sejaativo.com.br";
const CTA_IG = /^\s*📲?\s*Comente\s+["“]?SISTEMA/i;

/** PUBLICACAO/…/ATIVO_GTA6_02.mp4 → ATIVO-GTA6-02 (pasta do episódio em PRODUCAO/episodes/). */
export function episodioDoCaminho(caminho: string | null | undefined): string | null {
  const m = (caminho ?? "").match(/([A-Za-z0-9_]+)\.mp4$/);
  return m ? m[1].replace(/_/g, "-") : null;
}

/** Corpo da legenda sem a CTA do Instagram e com as hashtags separadas. */
export function partesDaLegenda(legenda: string): { corpo: string; hashtags: string } {
  const linhas = legenda.replace(/\r/g, "").split("\n");
  if (linhas.length && CTA_IG.test(linhas[0])) linhas.shift();
  let hashtags = "";
  while (linhas.length && linhas[linhas.length - 1].trim() === "") linhas.pop();
  if (linhas.length && /^(\s*#[\p{L}\p{N}_]+)+\s*$/u.test(linhas[linhas.length - 1])) hashtags = linhas.pop()!.trim();
  return { corpo: linhas.join("\n").trim(), hashtags };
}

/** Título do vídeo: o `title` do episode.json versionado; se faltar, a primeira frase da legenda (máx. 100). */
export async function tituloDoPost(caminho: string, legenda: string): Promise<string> {
  const ep = episodioDoCaminho(caminho);
  if (ep) {
    try {
      const r = await fetch(`${RAW}/PRODUCAO/episodes/${ep}/episode.json`);
      if (r.ok) {
        const t = String((await r.json()).title ?? "").trim();
        if (t) return limitar(t, 100);
      }
    } catch { /* usa a legenda */ }
  }
  const primeira = partesDaLegenda(legenda).corpo.split(/(?<=[.!?])\s/)[0] ?? "ATIVO";
  return limitar(primeira, 100);
}

const limitar = (s: string, n: number) => {
  const limpo = s.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
  return limpo.length <= n ? limpo : limpo.slice(0, n - 1).trimEnd() + "…";
};

export function descricaoYoutube(legenda: string): string {
  const { corpo, hashtags } = partesDaLegenda(legenda);
  return [CTA_FORA_DO_INSTAGRAM, corpo, [hashtags, "#shorts"].filter(Boolean).join(" ")].filter(Boolean).join("\n\n").slice(0, 4900);
}

export function textoTiktok(legenda: string): string {
  const { corpo, hashtags } = partesDaLegenda(legenda);
  return [corpo, CTA_FORA_DO_INSTAGRAM, hashtags].filter(Boolean).join("\n\n").slice(0, 2200);
}
