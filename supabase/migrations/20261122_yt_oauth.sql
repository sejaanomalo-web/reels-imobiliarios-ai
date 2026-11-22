-- YouTube Shorts — conexão OAuth do canal da ATIVO (22/11/2026).
-- Só CONECTA o canal (guarda o refresh token cifrado no Vault). NÃO publica nada: não há cron nem publicador,
-- e yt_canais.ativo nasce false. Espelha a arquitetura do Instagram (tabelas com RLS e sem políticas;
-- funções SECURITY DEFINER fechadas para anon/authenticated; segredo no Vault).

-- 1) Estados OAuth de uso único (anti-CSRF + PKCE), válidos por 15 minutos.
create table if not exists public.yt_oauth_estados (
  state         text primary key,
  code_verifier text not null,
  perfil        text not null default 'ativo',
  criado_em     timestamptz not null default now(),
  expira_em     timestamptz not null default now() + interval '15 minutes',
  usado_em      timestamptz
);

-- 2) Canal conectado (um por perfil). O refresh token NÃO fica aqui: fica no Vault (refresh_token_id).
create table if not exists public.yt_canais (
  perfil           text primary key,
  canal_id         text,
  canal_titulo     text,
  escopos          text,
  refresh_token_id uuid,
  ativo            boolean not null default false,  -- publicação automática DESLIGADA até decisão do cliente
  conectado_em     timestamptz,
  atualizado_em    timestamptz not null default now()
);

alter table public.yt_oauth_estados enable row level security;
alter table public.yt_canais enable row level security;
revoke all on public.yt_oauth_estados from anon, authenticated;
revoke all on public.yt_canais from anon, authenticated;

-- 3) Gera o link de conexão (uso único, 15 min). Rodar no SQL Editor: select public.yt_novo_link_conexao();
create or replace function public.yt_novo_link_conexao(p_perfil text default 'ativo')
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_state    text := rtrim(translate(encode(extensions.gen_random_bytes(32), 'base64'), '+/', '-_'), '=');
  v_verifier text := rtrim(translate(encode(extensions.gen_random_bytes(48), 'base64'), '+/', '-_'), '=');
begin
  delete from yt_oauth_estados where expira_em < now() - interval '1 day';
  insert into yt_oauth_estados (state, code_verifier, perfil) values (v_state, v_verifier, p_perfil);
  return 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/yt-oauth/iniciar?state=' || v_state;
end;
$$;

-- 4) Salva a conexão: refresh token cifrado no Vault (cria ou atualiza) + dados do canal. Não mexe em `ativo`.
create or replace function public.yt_salvar_conexao(
  p_perfil text, p_canal_id text, p_canal_titulo text, p_escopos text, p_refresh_token text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if coalesce(p_refresh_token, '') = '' then
    raise exception 'refresh token vazio';
  end if;
  select refresh_token_id into v_id from yt_canais where perfil = p_perfil;
  if v_id is not null and exists (select 1 from vault.secrets where id = v_id) then
    perform vault.update_secret(v_id, p_refresh_token);
  else
    v_id := vault.create_secret(p_refresh_token, 'yt_refresh_' || p_perfil || '_' || to_char(now(), 'YYYYMMDDHH24MISS'),
                                'Refresh token OAuth do canal do YouTube (perfil ' || p_perfil || ')');
  end if;
  insert into yt_canais (perfil, canal_id, canal_titulo, escopos, refresh_token_id, conectado_em, atualizado_em)
  values (p_perfil, p_canal_id, p_canal_titulo, p_escopos, v_id, now(), now())
  on conflict (perfil) do update
    set canal_id = excluded.canal_id, canal_titulo = excluded.canal_titulo, escopos = excluded.escopos,
        refresh_token_id = excluded.refresh_token_id, conectado_em = now(), atualizado_em = now();
end;
$$;

revoke all on function public.yt_novo_link_conexao(text) from public, anon, authenticated;
revoke all on function public.yt_salvar_conexao(text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.yt_novo_link_conexao(text) to service_role;
grant execute on function public.yt_salvar_conexao(text, text, text, text, text) to service_role;
