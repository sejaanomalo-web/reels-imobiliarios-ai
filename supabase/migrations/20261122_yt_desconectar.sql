-- YouTube — desconexão do canal (22/11/2026). Cumpre o que a Política de Privacidade do ATIVO Publicador promete
-- (https://www.sejaativo.com.br/publicador/privacidade, seção 6): ao encerrar a conexão, o refresh token (Vault) e o
-- registro do canal são excluídos. Uso no SQL Editor: select public.yt_desconectar('ativo');
create or replace function public.yt_desconectar(p_perfil text default 'ativo')
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select refresh_token_id into v_id from yt_canais where perfil = p_perfil;
  if not found then
    return 'nenhum canal conectado para o perfil ' || p_perfil;
  end if;
  if v_id is not null then
    delete from vault.secrets where id = v_id;
  end if;
  delete from yt_canais where perfil = p_perfil;
  delete from yt_oauth_estados where perfil = p_perfil;
  return 'canal desconectado: token e registro excluídos (perfil ' || p_perfil || ')';
end;
$$;

revoke all on function public.yt_desconectar(text) from public, anon, authenticated;
grant execute on function public.yt_desconectar(text) to service_role;
