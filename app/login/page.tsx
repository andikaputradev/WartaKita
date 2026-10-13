"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Login gagal. Periksa email dan password.");
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Tidak dapat menghubungi layanan login. Periksa konfigurasi lalu coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Nusantara News
        </h1>
        <p className="text-gray-600">Login Admin</p>

        <label htmlFor="email" className="sr-only">Email admin</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="Email admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border p-3 text-gray-900"
        />

        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border p-3 text-gray-900"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {message && (
          <p role="alert" className="text-sm text-red-600">{message}</p>
        )}
      </form>
    </main>
  );
}
