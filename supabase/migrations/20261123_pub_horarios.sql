-- Horários próprios do YouTube Shorts e do TikTok (23/11/2026, aprovação do cliente).
-- Um vídeo por horário, nos 6 horários diários da ATIVO: 08h00, 10h00, 12h00, 15h00, 18h00 e 21h00 (Brasília).
-- A ordem dos vídeos segue ig_posts.agendado_para, mas o HORÁRIO de cada destino é o próximo horário livre da
-- própria fila do destino (não copia mais o horário do Instagram). Nada do Instagram é alterado.

-- 1) Próximo horário da ATIVO estritamente depois de p_depois.
create or replace function public.pub_proximo_horario(p_depois timestamptz)
returns timestamptz
language sql
stable
set search_path = public
as $$
  select min(s)
    from (
      select ((d::date + make_interval(hours => h)) at time zone 'America/Sao_Paulo') as s
        from generate_series((p_depois at time zone 'America/Sao_Paulo')::date,
                             (p_depois at time zone 'America/Sao_Paulo')::date + 2, interval '1 day') d,
             unnest(array[8, 10, 12, 15, 18, 21]) h
    ) x
   where s > p_depois;
$$;

-- 2) Último horário ocupado na fila de produção do destino (ou agora + 30 min, se a fila estiver vazia/no passado).
create or replace function public.pub_ultimo_horario(p_destino text)
returns timestamptz
language sql
stable
security definer
set search_path = public
as $$
  select greatest(now() + interval '30 minutes',
                  coalesce(max(agendado_para), now()))
    from pub_destinos
   where destino = p_destino and modo = 'producao' and status <> 'cancelado';
$$;

-- 3) Sincronização: posts novos da fila do Instagram entram no FIM da fila do destino, no próximo horário livre.
--    p_horizonte é mantido por compatibilidade e não é mais usado.
create or replace function public.pub_sincronizar(p_destino text, p_horizonte interval default interval '7 days')
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  ultimo timestamptz := pub_ultimo_horario(p_destino);
  n integer := 0;
begin
  for r in
    select p.id
      from ig_posts p
     where p.status in ('agendado', 'enviando', 'processando')
       and not exists (select 1 from pub_destinos d where d.post_id = p.id and d.destino = p_destino and d.modo = 'producao')
     order by p.agendado_para
  loop
    ultimo := pub_proximo_horario(ultimo);
    insert into pub_destinos (post_id, destino, modo, agendado_para) values (r.id, p_destino, 'producao', ultimo)
    on conflict do nothing;
    n := n + 1;
  end loop;
  return n;
end;
$$;

-- 4) Pendentes que perderam o horário (ex.: cota esgotada) vão para o fim da fila, sem pular nenhum vídeo.
create or replace function public.pub_reprogramar_atrasados(p_destino text, p_folga interval default interval '20 minutes')
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  ultimo timestamptz := pub_ultimo_horario(p_destino);
  n integer := 0;
begin
  for r in
    select id from pub_destinos
     where destino = p_destino and modo = 'producao'
       and status in ('pendente', 'erro') and tentativas < 3 and externo_id is null
       and agendado_para < now() + p_folga
     order by agendado_para
  loop
    ultimo := pub_proximo_horario(ultimo);
    update pub_destinos set agendado_para = ultimo, status = 'pendente', atualizado_em = now() where id = r.id;
    n := n + 1;
  end loop;
  return n;
end;
$$;

revoke all on function public.pub_proximo_horario(timestamptz) from public, anon, authenticated;
revoke all on function public.pub_ultimo_horario(text) from public, anon, authenticated;
revoke all on function public.pub_sincronizar(text, interval) from public, anon, authenticated;
revoke all on function public.pub_reprogramar_atrasados(text, interval) from public, anon, authenticated;
grant execute on function public.pub_proximo_horario(timestamptz) to service_role;
grant execute on function public.pub_ultimo_horario(text) to service_role;
grant execute on function public.pub_sincronizar(text, interval) to service_role;
grant execute on function public.pub_reprogramar_atrasados(text, interval) to service_role;
