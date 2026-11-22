-- Publicação multiplataforma (YouTube Shorts e TikTok via Buffer) integrada à FILA ATUAL (public.ig_posts).
-- 22/11/2026. Nada do Instagram é alterado: ig_posts continua sendo a fonte da fila (uma pasta = um post); esta
-- migração só ACRESCENTA uma tabela de destinos por post e funções novas. Publicação automática DESLIGADA:
-- nenhum cron é criado aqui e yt_canais.ativo / buffer_canais.ativo nascem false.

-- 1) Canal do TikTok no Buffer (identificado em 22/11/2026: @ativo.br).
create table if not exists public.buffer_canais (
  perfil          text primary key,
  organizacao_id  text not null,
  canal_id        text not null,
  canal_nome      text,
  servico         text not null,
  ativo           boolean not null default false,  -- publicação automática DESLIGADA
  atualizado_em   timestamptz not null default now()
);
insert into public.buffer_canais (perfil, organizacao_id, canal_id, canal_nome, servico)
values ('ativo', '6b02edec07e3daab80052c5a', '6b02eea28541f09ecb63d8e3', 'ativo.br', 'tiktok')
on conflict (perfil) do nothing;

-- 2) Estado de cada post da fila em cada destino.
create table if not exists public.pub_destinos (
  id             uuid primary key default gen_random_uuid(),
  post_id        uuid not null references public.ig_posts(id) on delete cascade,
  destino        text not null check (destino in ('youtube', 'tiktok')),
  modo           text not null default 'producao' check (modo in ('teste', 'producao')),
  status         text not null default 'pendente'
                 check (status in ('pendente', 'enviando', 'processando', 'agendado', 'rascunho', 'publicado', 'erro', 'cancelado')),
  titulo         text,
  descricao      text,
  privacidade    text,
  agendado_para  timestamptz,
  externo_id     text,          -- id do vídeo no YouTube / id do post no Buffer
  url            text,
  tentativas     integer not null default 0,
  erro           text,
  criado_em      timestamptz not null default now(),
  atualizado_em  timestamptz not null default now(),
  publicado_em   timestamptz
);
create unique index if not exists pub_destinos_um_por_post_producao on public.pub_destinos (post_id, destino) where modo = 'producao';
create index if not exists pub_destinos_fila on public.pub_destinos (destino, status, agendado_para);

alter table public.buffer_canais enable row level security;
alter table public.pub_destinos enable row level security;
revoke all on public.buffer_canais from anon, authenticated;
revoke all on public.pub_destinos from anon, authenticated;

-- 3) Lê o refresh token do YouTube no Vault (só para as funções do servidor).
create or replace function public.yt_refresh_token(p_perfil text default 'ativo')
returns text
language sql
security definer
set search_path = public
as $$
  select d.decrypted_secret
    from yt_canais c join vault.decrypted_secrets d on d.id = c.refresh_token_id
   where c.perfil = p_perfil;
$$;

-- 4) Sincroniza a fila: cria 'pendente' para cada post agendado do Instagram que ainda não tem o destino.
--    Só é chamada pelos publicadores em modo produção (que exigem ativo = true).
create or replace function public.pub_sincronizar(p_destino text, p_horizonte interval default interval '7 days')
returns integer
language sql
security definer
set search_path = public
as $$
  with novos as (
    insert into pub_destinos (post_id, destino, modo, agendado_para)
    select p.id, p_destino, 'producao', p.agendado_para
      from ig_posts p
     where p.status in ('agendado', 'enviando', 'processando')
       and p.agendado_para > now()
       and p.agendado_para <= now() + p_horizonte
       and not exists (select 1 from pub_destinos d where d.post_id = p.id and d.destino = p_destino and d.modo = 'producao')
    on conflict do nothing
    returning 1
  )
  select count(*)::integer from novos;
$$;

revoke all on function public.yt_refresh_token(text) from public, anon, authenticated;
revoke all on function public.pub_sincronizar(text, interval) from public, anon, authenticated;
grant execute on function public.yt_refresh_token(text) to service_role;
grant execute on function public.pub_sincronizar(text, interval) to service_role;
