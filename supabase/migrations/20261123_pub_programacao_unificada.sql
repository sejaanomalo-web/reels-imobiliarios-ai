-- Programação unificada (23/11/2026): Instagram + YouTube Shorts + TikTok numa única visão do Table Editor.
-- Instagram vem de ig_posts (fila do ig-publicador); YouTube e TikTok vêm de pub_destinos (modo produção).
-- Só leitura; security_invoker = true e sem acesso para anon/authenticated (mesmo padrão de ig_programacao).

create or replace view public.pub_programacao with (security_invoker = true) as
select horario, plataforma, video, situacao, titulo, link, erro, tentativas, id, post_id, agendado_para
  from (
    select to_char(p.agendado_para at time zone 'America/Sao_Paulo', 'DD/MM (Dy) HH24:MI') as horario,
           'instagram'::text as plataforma,
           regexp_replace(p.caminho_video, '.*/|\.mp4$', '', 'g') as video,
           case
             when p.status = 'publicado' then 'publicado'
             when p.status = 'agendado' then 'na fila (envio automático)'
             when p.status in ('enviando', 'processando') then 'publicando'
             else p.status
           end as situacao,
           left(regexp_replace(p.legenda, '\s+', ' ', 'g'), 80) as titulo,
           p.permalink as link,
           p.erro,
           p.tentativas,
           p.id,
           p.id as post_id,
           p.agendado_para,
           1 as ordem
      from ig_posts p
     where p.status <> 'cancelado'
    union all
    select to_char(d.agendado_para at time zone 'America/Sao_Paulo', 'DD/MM (Dy) HH24:MI'),
           d.destino,
           regexp_replace(p.caminho_video, '.*/|\.mp4$', '', 'g'),
           case
             when d.status = 'publicado' then 'publicado'
             when d.status in ('agendado', 'processando') then 'agendado na plataforma'
             when d.status = 'pendente' then 'na fila (envio automático)'
             when d.status = 'enviando' then 'publicando'
             else d.status
           end,
           d.titulo,
           d.url,
           d.erro,
           d.tentativas,
           d.id,
           d.post_id,
           d.agendado_para,
           case d.destino when 'youtube' then 2 else 3 end
      from pub_destinos d
      join ig_posts p on p.id = d.post_id
     where d.modo = 'producao' and d.status <> 'cancelado'
  ) x
 order by agendado_para, ordem;

revoke all on public.pub_programacao from public, anon, authenticated;
grant select on public.pub_programacao to service_role;
