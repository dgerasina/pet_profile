-- Базовая схема БД для PetProfile (Supabase / Postgres)

-- Профиль пользователя (связан с auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Select own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Питомцы
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  species text not null, -- кошка, собака и т.п.
  breed text,
  sex text, -- male / female / unknown
  date_of_birth date,
  color text,
  microchip_number text,
  passport_number text,
  is_neutered boolean,
  notes text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.pets enable row level security;

create policy "Manage own pets"
  on public.pets
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Медицинские записи (прививки, операции, заболевания, анализы)
create table if not exists public.medical_records (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  record_type text not null, -- vaccination / treatment / surgery / allergy / other
  title text not null,
  description text,
  clinic_name text,
  vet_name text,
  date date not null,
  next_due_date date,
  attachment_urls text[], -- ссылки на файлы в Storage
  created_at timestamptz default now()
);

alter table public.medical_records enable row level security;

create policy "Manage medical records via pet ownership"
  on public.medical_records
  using (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  )
  with check (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  );

-- Напоминания (прививки, обработки, лекарства, визиты)
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz not null,
  reminded_at timestamptz,
  channel text default 'email', -- email / telegram (запас на будущее)
  created_at timestamptz default now()
);

alter table public.reminders enable row level security;

create policy "Manage reminders via pet ownership"
  on public.reminders
  using (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  )
  with check (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  );

-- Совместный доступ к питомцу (семья, догситтер и т.п.)
create table if not exists public.pet_shared_access (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  shared_with_email text not null,
  role text not null default 'viewer', -- viewer / editor
  created_at timestamptz default now()
);

alter table public.pet_shared_access enable row level security;

create policy "Owner manages shared access"
  on public.pet_shared_access
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Публичный профиль для QR-кода
create table if not exists public.public_pet_profiles (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  public_slug text not null unique,
  is_active boolean default true,
  public_name text,
  public_note text,
  contact_phone text,
  contact_telegram text,
  reward_note text, -- сообщение о вознаграждении
  show_allergies boolean default false,
  show_chronic_conditions boolean default false,
  created_at timestamptz default now()
);

alter table public.public_pet_profiles enable row level security;

-- Владелец может управлять публичным профилем
create policy "Owner manages public pet profile"
  on public.public_pet_profiles
  using (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  )
  with check (
    pet_id in (
      select id from public.pets
      where user_id = auth.uid()
    )
  );

-- Публичное чтение по slug для QR-страницы
create policy "Public read by slug"
  on public.public_pet_profiles
  for select
  using (is_active = true);

