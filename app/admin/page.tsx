"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ArticleForm = {
  title: string;
  category: string;
  content: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ArticleForm>({
    title: "",
    category: "Nasional",
    content: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, is_active")
        .eq("id", data.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (profileError || !profile || !["admin", "editor", "writer"].includes(profile.role)) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      if (active) setLoading(false);
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, [router]);

  function updateField(
    field: keyof ArticleForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, is_active")
        .eq("id", authData.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (profileError || !profile || !["admin", "editor", "writer"].includes(profile.role)) {
        setMessage("Akun ini tidak memiliki akses manajemen.");
        return;
      }

      const catSlug = form.category.toLowerCase();
      const { data: categoryRecord } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", catSlug)
        .maybeSingle();

      const slugBase = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const slug = (slugBase.length >= 3 ? slugBase : `draft-${Date.now()}`).slice(0, 100);

      const { error } = await supabase.from("articles").insert({
        title: form.title.trim(),
        slug,
        excerpt: form.content.trim().slice(0, 200),
        body_html: `<p>${form.content.trim()}</p>`,
        body_json: [form.content.trim()],
        status: "draft",
        author_id: authData.user.id,
        category_id: categoryRecord?.id ?? null,
      });

      if (error) {
        setMessage("Gagal menyimpan berita: " + error.message);
        return;
      }

      setMessage("Berita berhasil disimpan!");
      setForm({
        title: "",
        category: "Nasional",
        content: "",
      });
    } catch {
      setMessage("Terjadi kesalahan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-700">Memeriksa akses admin...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              WartaKita
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <p className="mt-2 text-gray-600">
              Kelola dan terbitkan berita.
            </p>
          </div>

          <button
            type="button"
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.replace("/login");
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Keluar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-semibold text-gray-800"
            >
              Judul berita
            </label>
            <input
              id="title"
              type="text"
              required
              maxLength={200}
              value={form.title}
              onChange={(event) =>
                updateField("title", event.target.value)
              }
              placeholder="Masukkan judul berita"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-semibold text-gray-800"
            >
              Kategori
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(event) =>
                updateField("category", event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            >
              <option>Nasional</option>
              <option>Daerah</option>
              <option>Politik</option>
              <option>Ekonomi</option>
              <option>Teknologi</option>
              <option>Olahraga</option>
              <option>Hiburan</option>
              <option>Pendidikan</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block font-semibold text-gray-800"
            >
              Isi berita
            </label>
            <textarea
              id="content"
              required
              rows={10}
              value={form.content}
              onChange={(event) =>
                updateField("content", event.target.value)
              }
              placeholder="Tulis isi berita di sini..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {message && (
            <p
              role="status"
              className={`rounded-lg p-3 text-sm ${
                message.startsWith("Berita berhasil")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </form>
      </div>
    </main>
  );
}
