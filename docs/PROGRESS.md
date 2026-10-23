# Pelacak Kemajuan Proyek WartaKita (Progress Tracker)

Dokumen ini memantau status eksekusi tiap fase pengerjaan rebrand portal berita WartaKita dan mendokumentasikan temuan teknis yang dialokasikan ke fase terkait.

Status Terakhir Diperbarui: 23 Oktober 2026
Fase Aktif Saat Ini: Fase 1 (Selesai)

---

## 1. Ringkasan Status per Fase

| Fase | Nama Fase | Status | Keterangan |
| :--- | :--- | :--- | :--- |
| **Fase 0** | **Audit dan Baseline** | **SELESAI** | Audit menyeluruh, pemetaan rute/komponen/data flow, audit dependensi pnpm, pengukuran baseline bundle JS & Lighthouse, serta inventarisasi merek lama. Tidak ada kode aplikasi yang diubah. |
| **Fase 1** | **Fondasi, Pembersihan Merek & SEO Inti** | **SELESAI** | Upgrade keamanan Next.js 16.4.2, pembersihan merek Nusantara News ke WartaKita di seluruh lapisan, kanonisasi URL `/berita/[slug]`, 301 redirect permanen `/artikel/[slug]`, pembuatan sitemap/robots/manifest/RSS, penambahan HSTS & X-Frame-Options, instalasi ESLint 9 & Prettier, penambahan strict & noUncheckedIndexedAccess, pembuatan 8 halaman footer fungsional, dan ticker accessible. |
| **Fase 2** | **Desain, Aksesibilitas & Optimasi Media** | Belum Dimulai | Optimasi media gambar (mengatasi beban 26,64 MB dan LCP 46,9 s), penonaktifan `images.unoptimized`, dan penetapan font terukur. |
| **Fase 3** | **Supabase Auth, RBAC & Dashboard Admin** | Belum Dimulai | Implementasi Supabase Server Client berbasis cookies, proteksi middleware server-side pada `/admin`, role-based access control (admin, editor, writer), dan skema migrasi tabel PostgreSQL. |
| **Fase 4** | **Testing, Audit Akhir & Kesiapan Produksi** | Belum Dimulai | Verifikasi menyeluruh end-to-end, audit Lighthouse ulang, penetrasi keamanan, dan kesiapan deploy ke Vercel. |

---

## 2. Status Pekerjaan Fase 1 (Fondasi, Pembersihan Merek & SEO Inti)

- [x] Upgrade versi Next.js dari 16.4.0 ke 16.4.2 untuk menambal kerentanan Remote Code Execution (RCE) kritis GHSA-2464-fhr4-w9xw dan GHSA-673q-mjm6-r5xr.
- [x] Hapus berkas duplikat `package-lock.json` untuk menjaga konsistensi dependensi murni pada `pnpm-lock.yaml`.
- [x] Pasang ESLint 9 (`eslint-config-next@16.4.2`) dan tambahkan script `pnpm lint` pada `package.json`.
- [x] Konfigurasi Prettier (`.prettierrc`, `.prettierignore`) sebagai formatter kode resmi.
- [x] Aktifkan `strict: true` dan `noUncheckedIndexedAccess: true` pada `tsconfig.json`.
- [x] Hapus rute anomalistik redundan `app/app/admin/page.tsx`.
- [x] Hapus rute sekunder `app/artikel/[slug]/page.tsx` dan ubah menjadi redirect permanen HTTP 301 di `next.config.mjs` menuju `/berita/:slug`.
- [x] Pusatkan konfigurasi situs dan validasi Zod pada `lib/site.ts` (SITE_NAME, SITE_URL, siteContact, isIndexingEnabled).
- [x] Buat utilitas sanitasi `lib/json-ld.ts` (`jsonLdScript`) untuk mencegah XSS script breakout pada JSON-LD.
- [x] Buat komponen `components/news/ad-slot.tsx` untuk menggantikan placeholder iklan demo dengan dimensi tetap anti-CLS.
- [x] Tambahkan tombol jeda dan putar (Play/Pause) yang dapat diakses papan ketik pada `components/news/breaking-ticker.tsx` serta hormati `prefers-reduced-motion`.
- [x] Nonaktifkan formulir newsletter secara jujur selama backend belum siap (`components/news/newsletter.tsx`).
- [x] Amankan formulir login (`app/login/page.tsx`) agar tidak menampilkan detail error internal server ke pengguna akhir.
- [x] Buat seluruh 8 halaman statis footer: `/tentang-kami`, `/redaksi`, `/pedoman-media-siber`, `/kode-etik`, `/kebijakan-privasi`, `/syarat-ketentuan`, `/kontak`, dan `/pasang-iklan`.
- [x] Buat berkas SEO otomatis: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, dan rute RSS Feed 2.0 `app/feed.xml/route.ts` serta redirect `app/rss.xml/route.ts`.
- [x] Bersihkan seluruh kemunculan merek lama ('Nusantara News', 'nusantaranews', 'nusantaranewsidn.com', 'redaksi@nusantaranews.example', dan generator 'v0.app') menjadi 'WartaKita', 'wartakita.my.id', dan identitas redaksi resmi.
- [x] Buat logo SVG baru yang unik dan orisinal di `components/news/logo.tsx` dan `public/icon.svg` serta hasilkan favicon, apple-icon, manifest icons, dan default OG image (1200x630).
- [x] Pastikan flag `NEXT_PUBLIC_INDEXING_ENABLED` mengirim `noindex` dan `robots Disallow: /` secara bawaan.
- [x] Hapus semua karakter em dash (U+2014) dan en dash (U+2013) di seluruh repositori.

---

## 3. Catatan Temuan yang Ditangguhkan ke Fase Berikutnya

### Alokasi ke Fase 2 (Desain, Aksesibilitas & Optimasi Media)
- [ ] Hapus pengaturan `unoptimized: true` dari `next.config.mjs` agar pipeline optimasi gambar Next.js berjalan (WebP/AVIF responsif).
- [ ] Kompresi dan optimasi ukuran fisik seluruh 14 berkas gambar di `public/images/` yang saat ini membebani 26,64 MB.
- [ ] Lakukan benchmarking tipografi dan tentukan font kanonis situs berdasarkan pengukuran web vitals.

### Alokasi ke Fase 3 (Supabase Auth, RBAC & Dashboard Admin)
- [ ] Pasang `@supabase/supabase-js` sebagai direct dependency untuk mendampingi `@supabase/ssr`.
- [ ] Bangun `lib/supabase/server.ts` menggunakan `createServerClient` berbasis cookies Next.js App Router.
- [ ] Buat `middleware.ts` untuk memvalidasi sesi autentikasi dan peran pengguna di sisi server sebelum mengizinkan akses ke `/admin`.
- [ ] Atur halaman `/admin` agar menyertakan tag `<meta name="robots" content="noindex, nofollow" />`.
- [ ] Implementasikan validasi skema input formulir artikel menggunakan Zod secara ketat di batas API/Server Actions.
- [ ] Siapkan skema database Supabase PostgreSQL dengan dukungan peran berjenjang: `admin`, `editor`, dan `writer`, serta kebijakan RLS (Row Level Security).
