# Pelacak Kemajuan Proyek WartaKita (Progress Tracker)

Dokumen ini memantau status eksekusi tiap fase pengerjaan rebrand portal berita WartaKita dan mendokumentasikan temuan teknis yang dialokasikan ke fase terkait.

Status Terakhir Diperbarui: 23 Oktober 2026
Fase Aktif Saat Ini: Fase 0 (Selesai)

---

## 1. Ringkasan Status per Fase

| Fase | Nama Fase | Status | Keterangan |
| :--- | :--- | :--- | :--- |
| **Fase 0** | **Audit dan Baseline** | **SELESAI** | Audit menyeluruh, pemetaan rute/komponen/data flow, audit dependensi pnpm, pengukuran baseline bundle JS & Lighthouse, serta inventarisasi merek lama. Tidak ada kode aplikasi yang diubah. |
| **Fase 1** | **Fondasi, Pembersihan Merek & SEO Inti** | Menunggu Persetujuan | Pembersihan merek Nusantara News ke WartaKita, kanonisasi URL `/berita/[slug]`, 301 redirect `/artikel/[slug]`, pembuatan sitemap/robots/manifest/RSS, penambahan CSP & HSTS, instalasi ESLint, dan perbaikan kerentanan dependensi inti. |
| **Fase 2** | **Desain, Aksesibilitas & Optimasi Media** | Belum Dimulai | Optimasi media gambar (mengatasi beban 26,64 MB dan LCP 46,9 s), penonaktifan `images.unoptimized`, tombol kontrol pause/play ticker (WCAG 2.2.2), link footer fungsional, dan penetapan font terukur. |
| **Fase 3** | **Supabase Auth, RBAC & Dashboard Admin** | Belum Dimulai | Implementasi Supabase Server Client berbasis cookies, proteksi middleware server-side pada `/admin`, role-based access control (admin, editor, writer), dan skema migrasi tabel PostgreSQL. |
| **Fase 4** | **Testing, Audit Akhir & Kesiapan Produksi** | Belum Dimulai | Verifikasi menyeluruh end-to-end, audit Lighthouse ulang, penetrasi keamanan, dan kesiapan deploy ke Vercel. |

---

## 2. Catatan Temuan yang Ditangguhkan (Deferred Findings)

Sesuai Aturan Kerja nomor 8 ("Ruang lingkup: kerjakan hanya fase yang diminta. Temuan di luar fase dicatat di docs/PROGRESS.md, tidak dikerjakan"), berikut daftar temuan teknis yang dicatat untuk dikerjakan pada fase berikutnya:

### Alokasi ke Fase 1 (Fondasi, Pembersihan Merek & SEO Inti)
- [ ] Upgrade versi Next.js dari 16.4.0 ke versi patch yang aman (>= 16.4.1) untuk menambal kerentanan Remote Code Execution (RCE) kritis GHSA-2464-fhr4-w9xw dan GHSA-673q-mjm6-r5xr.
- [ ] Hapus berkas duplikat `package-lock.json` untuk menjaga konsistensi dependensi murni pada `pnpm-lock.yaml`.
- [ ] Pasang ESLint (beserta konfigurasi Next.js/React standard) dan tambahkan script `pnpm lint` pada `package.json`.
- [ ] Hapus rute anomalistik redundan `app/app/admin/page.tsx`.
- [ ] Perbaiki rute artikel: jadikan `/berita/[slug]` sebagai kanonis utama, ubah `app/artikel/[slug]/page.tsx` menjadi redirect permanen HTTP 301 ke `/berita/[slug]`.
- [ ] Perbaiki metadata canonical pada `/berita/[slug]` agar mengarah ke domain kanonis `https://wartakita.my.id/berita/[slug]`.
- [ ] Buat berkas SEO otomatis: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, dan rute RSS Feed 2.0 `app/feed.xml/route.ts`.
- [ ] Bersihkan seluruh kemunculan merek lama ('Nusantara News', 'nusantaranews', 'nusantaranewsidn.com', 'redaksi@nusantaranews.example', dan generator 'v0.app') menjadi 'WartaKita', 'wartakita.my.id', dan identitas redaksi resmi.
- [ ] Ganti pemisah judul template di `app/layout.tsx` dari em dash (U+2014) menjadi garis pipa (` | `).
- [ ] Tambahkan konfigurasi keamanan HTTP Headers di `next.config.mjs`: Content-Security-Policy (CSP), pelengkapan HSTS dengan `includeSubDomains; preload`, dan `X-Frame-Options: DENY`.
- [ ] Bersihkan sanitasi injeksi JSON-LD pada `app/berita/[slug]/page.tsx` untuk mencegah risiko XSS.

### Alokasi ke Fase 2 (Desain, Aksesibilitas & Optimasi Media)
- [ ] Hapus pengaturan `unoptimized: true` dari `next.config.mjs` agar pipeline optimasi gambar Next.js berjalan (WebP/AVIF responsif).
- [ ] Kompresi dan optimasi ukuran fisik seluruh 14 berkas gambar di `public/images/` yang saat ini membebani 26,64 MB.
- [ ] Tambahkan kontrol tombol interaktif Jeda/Putar (Pause/Play) pada komponen `components/news/breaking-ticker.tsx` untuk memenuhi WCAG 2.1 SC 2.2.2.
- [ ] Jadikan tautan di bagian Perusahaan dan Layanan pada `components/news/site-footer.tsx` berfungsi penuh sebagai link navigasi yang valid.
- [ ] Hapus banner demonstrasi `components/news/demo-notice.tsx` dan bersihkan teks 'fiktif' / 'slot iklan demo'.
- [ ] Lakukan benchmarking tipografi dan tentukan font kanonis situs berdasarkan pengukuran web vitals.

### Alokasi ke Fase 3 (Supabase Auth, RBAC & Dashboard Admin)
- [ ] Pasang `@supabase/supabase-js` sebagai direct dependency untuk mendampingi `@supabase/ssr`.
- [ ] Bangun `lib/supabase/server.ts` menggunakan `createServerClient` berbasis cookies Next.js App Router.
- [ ] Buat `middleware.ts` untuk memvalidasi sesi autentikasi dan peran pengguna di sisi server sebelum mengizinkan akses ke `/admin`.
- [ ] Atur halaman `/admin` agar menyertakan tag `<meta name="robots" content="noindex, nofollow" />`.
- [ ] Implementasikan validasi skema input formulir artikel menggunakan Zod secara ketat di batas API/Server Actions.
- [ ] Siapkan skema database Supabase PostgreSQL dengan dukungan peran berjenjang: `admin`, `editor`, dan `writer`, serta kebijakan RLS (Row Level Security).
