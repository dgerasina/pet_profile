# pet_profile

## PetProfile — цифровой паспорт питомца

В этом проекте находится фронтенд для сервиса цифровых паспортов питомцев и напоминаний о ветеринарных процедурах.

- **Фронтенд**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
- **Бэкенд и БД**: Supabase (Postgres + Auth + Storage).

### Быстрый старт

1. Создайте проект в Supabase и включите Email/password Auth.
2. Скопируйте URL и публичный anon key в `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

3. В Supabase SQL Editor выполните содержимое файла `db-schema.sql`, чтобы создать таблицы и RLS.
4. Запустите локально:

```bash
npm install
npm run dev
```

### Основные возможности MVP

- Регистрация/логин по email.
- Список питомцев владельца и база для их цифровых паспортов.
- SQL‑схема для:
  - `profiles` — профиль пользователя;
  - `pets` — питомцы;
  - `medical_records` — медкарта;
  - `reminders` — напоминания;
  - `pet_shared_access` — совместный доступ;
  - `public_pet_profiles` — публичная QR‑страница питомца.

Дальше можно добавлять страницы для детальной карточки питомца, медкарты, напоминаний и публичного профиля под QR‑код.
