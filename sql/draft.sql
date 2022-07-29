CREATE TABLE profiles (
  user_id uuid references auth.profiles not null,
  user_email text,
  user_name text,
  user_contact text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  primary key (user_id)
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for
select using (true);
create policy "Users can insert their own profile." on profiles for
insert with check (auth.uid() = user_id);
create policy "Users can update own profile." on profiles for
update using (auth.uid() = user_id);
-- inserts a row into public.users
create function public.handle_new_user() returns trigger language plpgsql security definer
set search_path = public as $$ begin
insert into public.profiles (user_id)
values (new.user_id);
return new;
end;
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
-- enable public read all user profile details
EXISTS(
  SELECT 1
  FROM posts
  WHERE posts.id = profiles.user_id
) -- profiles policy
(
  EXISTS (
    SELECT 1
    FROM posts
    WHERE (posts.id = profiles.post_id)
  )
) -- create_profile_for_user function
begin
insert into public.profiles(id, user_name, user_email, user_contact)
values(
    new.id,
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'user_email',
    new.raw_user_meta_data->>'user_contact'
  );
return new;
end;