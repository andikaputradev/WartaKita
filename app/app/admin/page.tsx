"use client";

import { useState } from "react";

export default function AdminPage() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Nasional");
  const [isi, setIsi] = useState("");
  const [pesan, setPesan] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPesan(
      "Form sudah diisi, tetapi penyimpanan ke database belum dihubungkan."
    );
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
              <option>Nasional</option>
              <option>Daerah</option>
              <option>Politik</option>
              <option>Ekonomi</option>
              <option>Olahraga</option>
              <option>Teknologi</option>
              <option>Lifestyle</option>
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
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Simpan Berita
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
