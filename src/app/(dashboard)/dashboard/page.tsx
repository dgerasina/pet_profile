"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data } = await supabaseClient
        .from("pets")
        .select("id, name, species, breed")
        .order("created_at", { ascending: true });

      setPets(data ?? []);
      setLoading(false);
    };

    load();
  }, [router]);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Мои питомцы</h1>
          <p className="text-sm text-slate-300">
            Цифровые паспорта, медкарты и напоминания для ваших животных.
          </p>
        </div>
        <button
          onClick={async () => {
            await supabaseClient.auth.signOut();
            router.replace("/");
          }}
          className="text-xs text-slate-300 hover:text-white"
        >
          Выйти
        </button>
      </header>

      <section className="flex-1 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800">
        {loading ? (
          <p className="text-sm text-slate-300">Загружаем ваших питомцев…</p>
        ) : pets.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-slate-200">
              У вас пока нет ни одного питомца.
            </p>
            <p className="max-w-xs text-xs text-slate-400">
              Добавьте первого питомца, чтобы вести паспорт, медкарту и
              напоминания.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map((pet) => (
              <Link
                key={pet.id}
                href={`/pets/${pet.id}`}
                className="group rounded-xl bg-slate-950/40 p-4 ring-1 ring-slate-800 transition hover:ring-emerald-500"
              >
                <div className="mb-2 text-sm font-semibold">{pet.name}</div>
                <div className="text-xs text-slate-300">
                  {pet.species}
                  {pet.breed ? ` • ${pet.breed}` : ""}
                </div>
                <div className="mt-3 text-[11px] text-emerald-300 opacity-0 transition group-hover:opacity-100">
                  Открыть карточку питомца →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

