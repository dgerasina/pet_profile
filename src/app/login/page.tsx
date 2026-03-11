"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 px-6 py-8 shadow-xl ring-1 ring-slate-800">
        <h1 className="text-xl font-semibold">Вход в PetProfile</h1>
        <p className="mt-1 text-sm text-slate-300">
          Управляйте цифровыми паспортами своих питомцев.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-md bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-1 ring-slate-700 focus:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-200">
              Пароль
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-1 ring-slate-700 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400">
          Нет аккаунта?{" "}
          <Link
            href="/signup"
            className="font-medium text-emerald-300 hover:text-emerald-200"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
  );
}

