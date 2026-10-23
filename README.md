# WartaKita

Portal digital berita WartaKita berbasis Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, dan Supabase.

Domain Kanonis: https://wartakita.my.id

## Menjalankan di Komputer Lokal

Persyaratan: Node.js 22 atau lebih baru dan pnpm 12.3.4.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Buka `.env.local`, lalu isi nilai konfigurasi Supabase dari Supabase Dashboard (Project Settings > API):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL=https://wartakita.my.id`

Peringatan keamanan: Jangan memasukkan service-role key atau secret key ke variabel `NEXT_PUBLIC_*`, dan jangan commit berkas `.env.local`.

Jalankan pemeriksaan kode dan server pengembangan:

```bash
pnpm lint
pnpm typecheck
pnpm dev
```

Buka http://localhost:3000 pada peramban Anda. Untuk menguji build produksi:

```bash
pnpm build
pnpm start
```

## Konfigurasi Admin dan Database

Halaman admin (`/admin`) membutuhkan proyek Supabase yang terkonfigurasi. Siapkan tabel `admin_users` dengan kolom `user_id` yang mengacu ke ID pengguna Supabase Auth, serta tabel `articles` dengan kolom yang sesuai (`title`, `category`, dan `content`). Buat akun admin melalui Supabase Auth dan daftarkan ID pengguna tersebut di tabel `admin_users`.

Aktifkan Row Level Security (RLS) dan buat kebijakan database yang membatasi hak penulisan hanya kepada pengguna yang memiliki peran yang valid. Jangan mengandalkan pemeriksaan akses di sisi klien saja.

> Catatan: Halaman berita publik saat ini menggunakan data statis dari `lib/news.ts`. Integrasi dinamis penuh akan dihubungkan pada fase berikutnya.

## Pemeriksaan Otomatis (CI)

Alur kerja GitHub Actions menjalankan `pnpm lint`, `pnpm typecheck`, dan `pnpm build` secara otomatis pada setiap push ke cabang `main` maupun pengajuan pull request.
