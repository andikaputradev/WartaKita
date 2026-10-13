# Nusantara News

Portal digital berita Nusantara News berbasis Next.js, React, TypeScript, Tailwind CSS, dan Supabase untuk autentikasi admin.

## Menjalankan di komputer lokal

Persyaratan: Node.js 22 atau lebih baru dan pnpm 12.3.4.

```bash
corepack enable
pnpm install
cp .env.example .env.local
```

Buka `.env.local`, lalu isi nilai berikut dari Supabase Dashboard > Project Settings > API:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (atau publishable key yang disediakan proyek Supabase)

Jangan masukkan service-role key atau secret key ke variabel `NEXT_PUBLIC_*`, dan jangan commit `.env.local`.

Jalankan pemeriksaan dan server pengembangan:

```bash
pnpm typecheck
pnpm dev
```

Buka http://localhost:3000. Untuk memeriksa build produksi:

```bash
pnpm build
pnpm start
```

## Konfigurasi admin dan database

Halaman login/admin membutuhkan proyek Supabase yang sudah dikonfigurasi. Siapkan tabel `admin_users` dengan kolom `user_id` yang mengacu ke ID pengguna Supabase Auth, serta tabel `articles` dengan kolom yang sesuai dengan formulir admin (`title`, `category`, dan `content`). Buat akun admin melalui Supabase Auth dan daftarkan ID pengguna tersebut di `admin_users`.

Aktifkan Row Level Security (RLS) dan buat kebijakan database yang membatasi penulisan hanya kepada pengguna admin. Jangan mengandalkan pemeriksaan akses di antarmuka saja. Tabel, kebijakan RLS, kredensial, dan URL redirect pemulihan password harus dikonfigurasi di proyek Supabase sebelum fitur admin dapat digunakan.

> Catatan: halaman berita publik saat ini menggunakan data contoh statis dari `lib/news.ts`. Menyimpan baris ke tabel Supabase `articles` belum otomatis menerbitkannya ke halaman publik. Integrasi CMS penuh perlu menyelaraskan skema database dengan model artikel publik.

## Pemeriksaan otomatis

GitHub Actions menjalankan instalasi dependensi, `pnpm typecheck`, dan `pnpm build` pada push ke `main` serta pull request.
