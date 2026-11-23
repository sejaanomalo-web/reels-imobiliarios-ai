-- Visão legível da programação do YouTube Shorts e do TikTok (23/11/2026), no mesmo padrão de ig_programacao:
-- aparece no Table Editor do Supabase, uma linha por vídeo e destino, com horário em Brasília e link.
-- security_invoker = true: respeita o RLS de pub_destinos/ig_posts; sem acesso para anon/authenticated.

create or replace view public.pub_programacao with (security_invoker = true) as
select to_char(d.agendado_para at time zone 'America/Sao_Paulo', 'DD/MM (Dy) HH24:MI') as horario,
       d.destino as plataforma,
       regexp_replace(p.caminho_video, '.*/|\.mp4$', '', 'g') as video,
       case
         when d.status = 'publicado' then 'publicado'
         when d.status in ('agendado', 'processando') then 'agendado na plataforma'
         when d.status = 'pendente' then 'na fila (envio automático)'
         else d.status
       end as situacao,
       d.titulo,
       d.url as link,
       d.erro,
       d.tentativas,
       d.id,
       d.post_id,
       d.agendado_para
  from pub_destinos d
  join ig_posts p on p.id = d.post_id
 where d.modo = 'producao' and d.status <> 'cancelado'
 order by d.agendado_para, d.destino;

revoke all on public.pub_programacao from public, anon, authenticated;
grant select on public.pub_programacao to service_role;
