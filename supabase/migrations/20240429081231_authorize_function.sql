create function public.authorize(
  requested_permission app_permission
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  where role_permissions.permission = authorize.requested_permission
    and (role_permissions.role = (select (auth.jwt() ->> 'user_role')::public.app_role))
  into bind_permissions;

  return bind_permissions > 0;
end;
$$ language plpgsql security definer set search_path = public;