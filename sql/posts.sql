CREATE TABLE posts (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  user_email text,
  user_name text,
  user_contact int,
  width int,
  height int,
  location text,
  installments boolean,
  is_sold boolean,
  price int,
  info text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
);
alter table posts enable row level security;
create policy "Individuals can create posts." on posts for
insert with check (auth.uid() = user_id);
create policy "Individuals can update their own posts." on posts for
update using (auth.uid() = user_id);
create policy "Individuals can delete their own posts." on posts for delete using (auth.uid() = user_id);
create policy "Posts are public." on posts for
select using (true);