"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Nasional");
  const [isi, setIsi] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    try {
      const supabase = createClient();

      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user) {
        setPesan("Silakan login terlebih dahulu.");
        return;
      }

      const { error } = await supabase.from("articles").insert({
        title: judul,
        category: kategori,
        content: isi,
      });

      if (error) {
        setPesan("Gagal menyimpan: " + error.message);
        return;
      }

      setPesan("Berita berhasil disimpan!");
      setJudul("");
      setKategori("Nasional");
      setIsi("");
    } catch {
      setPesan("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-blue-950">
          Dashboard Admin
        </h1>

        <p className="mb-6 text-gray-600">
          Nusantara News — Kelola Berita
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold">Judul Berita</label>
            <input
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="Masukkan judul berita"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              {["Nasional", "Daerah", "Politik", "Ekonomi",
                "Olahraga", "Teknologi", "Lifestyle"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Isi Berita</label>
            <textarea
              required
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="min-h-52 w-full rounded-lg border p-3"
              placeholder="Tulis isi berita di sini..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>

          {pesan && (
            <p className="rounded-lg bg-yellow-100 p-3 text-yellow-900">
              {pesan}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
