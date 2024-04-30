create policy "Allow logged-in read access" on public.profiles for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.profiles for insert with check ( auth.uid() = id );
create policy "Allow individual update access" on public.profiles for update using ( auth.uid() = id );
create policy "Allow individual read access" on public.user_roles for select using ( auth.uid() = user_id );

create policy "Allow user profile create" on public.profiles for insert with check ( authorize('profiles.create') );
create policy "Allow user profile update" on public.profiles for update using ( authorize('profiles.update') );
create policy "Allow user profile delete" on public.profiles for delete using ( authorize('profiles.delete') );