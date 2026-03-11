import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-12">
      <header className="flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight">
          PetProfile
          <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
            beta
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/login"
            className="text-slate-200 transition hover:text-white"
          >
            Войти
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            Регистрация
          </Link>
        </nav>
      </header>

      <section className="grid flex-1 gap-8 md:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6 self-center">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Цифровой паспорт питомца, медкарта и напоминания в одном сервисе.
          </h1>
          <p className="max-w-xl text-sm text-slate-200 md:text-base">
            Храните данные о прививках, обработках и особенностях здоровья,
            делитесь карточкой с семьёй и ветеринаром и получайте напоминания
            о важных процедурах. Добавьте QR‑код на ошейник, чтобы питомца
            могли быстрее вернуть домой.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Создать профиль питомца
            </Link>
            <p className="text-xs text-slate-300">
              До 2 питомцев и базовые напоминания — бесплатно.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl bg-slate-900/60 p-4 shadow-xl ring-1 ring-slate-800">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
              <span>Пример карточки питомца</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5">
                Только вы и ваш ветеринар
              </span>
            </div>
            <div className="space-y-3 rounded-xl bg-slate-950/40 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800" />
                <div>
                  <div className="text-sm font-semibold">Майло</div>
                  <div className="text-xs text-slate-300">
                    метис • 2 года • кастрирован
                  </div>
                </div>
              </div>
              <div className="grid gap-2 text-xs text-slate-200 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-900/80 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Ближайшее
                  </div>
                  <div className="mt-1 font-medium">
                    Вакцина от бешенства — 14 апреля
                  </div>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Напоминания
                  </div>
                  <div className="mt-1 text-xs">
                    Email‑напоминание за 7 и 1 день до прививки.
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-3 text-xs text-slate-200">
                <div className="text-[11px] uppercase tracking-wide text-slate-400">
                  QR‑профиль
                </div>
                <p className="mt-1">
                  Любой, кто отсканирует QR на ошейнике, увидит безопасную
                  страницу с вашими контактами и важными пометками.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

