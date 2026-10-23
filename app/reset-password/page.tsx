"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setMessage(
          "Tautan reset belum terverifikasi atau sudah kedaluwarsa. Buka tautan terbaru dari email reset."
        );
        return;
      }

      setReady(true);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
        setMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak sama.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessage("Gagal mengganti password: " + error.message);
        return;
      }

      await supabase.auth.signOut();
      setMessage("Password berhasil diganti! Mengalihkan ke halaman login...");

      setTimeout(() => router.replace("/login"), 1500);
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-blue-950">
          Reset Password Admin
        </h1>

        <p className="text-sm text-gray-600">
          Buat password baru untuk akun admin WartaKita.
        </p>

        {ready ? (
          <>
            <div>
              <label htmlFor="password" className="mb-2 block font-medium">
                Password baru
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                placeholder="Minimal 8 karakter"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="mb-2 block font-medium">
                Ulangi password baru
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                placeholder="Ketik ulang password"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-900 p-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </>
        ) : (
          <p className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-900">
            {message || "Memeriksa tautan pemulihan..."}
          </p>
        )}

        {ready && message && (
          <p role="status" className="text-sm text-gray-700">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
