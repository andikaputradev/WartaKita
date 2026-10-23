# Audit dan Baseline Proyek WartaKita (Fase 0)

Dokumen ini memuat hasil audit teknis mendalam dan pengukuran baseline performa, keamanan, struktur rute, komponen, data flow, serta identifikasi sisa aset/merek 'Nusantara News' sebelum implementasi rebrand ke 'WartaKita'.

Tanggal Audit: 23 Oktober 2026
Lingkungan: Linux (Kali GNU/Linux Rolling), Node.js v24.19.0, pnpm v12.3.4

---

## 1. Verifikasi Lingkungan, Build, dan Versi Terpasang

### 1.1 Perintah Eksekusi dan Hasil Aktual
- `corepack enable`: Berhasil (exit code 0).
- `pnpm install --frozen-lockfile`: Berhasil (exit code 0).
  Keluaran:
  ```
  Lockfile passes supply-chain policies (verified 21m ago)
  Lockfile is up to date, resolution step is skipped
  Done in 114ms using pnpm v12.3.4
  ```
- `pnpm typecheck`: Berhasil tanpa error tipe (exit code 0).
  Keluaran:
  ```
  $ tsc --noEmit
  ```
- `pnpm build`:
  - Percobaan 1 (Next.js Security Fatal Error):
    Perintah `next build` menghentikan proses build dengan pesan:
    ```
    Error [SecurityFatalError]: Your version of Next.js is affected by a known security vulnerability.
    We strongly recommend you upgrade Next.js.
    This command stopped to show the upgrade recommendation. Retry the same command to continue the original task.
    ```
    Rekomendasi upgrade dari Vercel:
    `next upgrade --agent=security --internal-nudge-id=c92fb041-d71d-43ef-8918-6e6f831dc4d5`
  - Percobaan 2 (Menjalankan ulang sesuai instruksi CLI Next.js):
    Build berhasil mengompilasi seluruh 43 halaman statis (exit code 0).
    Peringatan yang muncul:
    `Your version of Next.js is affected by a known security vulnerability. This command is continuing after the upgrade reminder.`

### 1.2 Versi Dependensi Utama Aktual Terpasang
- Node.js: v24.19.0
- pnpm: v12.3.4
- Next.js: 16.4.0 (Turbopack compiler)
- React: 19.2.4 (react-dom: 19.2.4)
- Tailwind CSS: 4.3.3 (@tailwindcss/postcss: 4.3.3)
- Supabase SDK:
  - @supabase/ssr: 0.7.0 terpasang di dependencies.
  - @supabase/supabase-js: Versi peerDependency (^2.43.4) belum dideklarasikan langsung di package.json dan tidak terpasang di node_modules/@supabase/.
- TypeScript: 5.7.3

---

## 2. Pemetaan Rute, Komponen, dan Alur Data

### 2.1 Pemetaan Rute (app/)
1. `app/page.tsx`: Halaman beranda (Beranda). Tipe: Static (SSG). Menampilkan breaking ticker, featured news, berita regional, kanal ringkas, dan sidebar.
2. `app/_not-found.tsx` / `app/not-found.tsx`: Halaman 404 penanganan rute tidak ditemukan. Tipe: Static.
3. `app/admin/page.tsx`: Dashboard admin untuk membuat artikel berita. Tipe: Client Component ("use client"). Proteksi akses hanya divalidasi di browser melalui useEffect.
4. `app/app/admin/page.tsx`: Rute redundan akibat struktur direktori salah (anomali `app/app/admin`). Berisi komponen `LegacyAdminPage` yang melakukan redirect ke `/admin`.
5. `app/artikel/[slug]/page.tsx`: Rute artikel sekunder. Hanya melakukan re-export dari `app/berita/[slug]/page.tsx` tanpa redirect HTTP 301.
6. `app/berita/[slug]/page.tsx`: Rute artikel utama. Tipe: SSG via `generateStaticParams`. Memiliki bug canonical yang salah arah (canonical menunjuk ke `/artikel/[slug]`).
7. `app/cari/page.tsx`: Halaman pencarian artikel berdasarkan kueri parameter `?q=`. Tipe: Dynamic Server-rendered (ƒ).
8. `app/kategori/[slug]/page.tsx`: Halaman arsip per kategori (7 kategori). Tipe: SSG via `generateStaticParams`.
9. `app/login/page.tsx`: Halaman autentikasi login pengguna admin. Tipe: Client Component ("use client").
10. `app/reset-password/page.tsx`: Halaman pembaruan kata sandi admin. Tipe: Client Component ("use client").
11. `app/layout.tsx`: Root Layout pembungkus aplikasi (Navbar, Ticker, Footer). Mengatur metadata dasar dan font.
12. `app/globals.css`: Konfigurasi styling global Tailwind v4.

### 2.2 Pemetaan Komponen (components/)
- `components/news/article-card.tsx`: Komponen kartu berita standar untuk daftar artikel, menampilkan gambar Next/Image, badge kategori, judul, ringkasan, dan metadata waktu baca.
- `components/news/breaking-ticker.tsx`: Ticker horizontal bergerak (marquee animasi CSS) untuk menampilkan breaking news. Belum memiliki tombol pause/stop interaktif bagi aksesibilitas keyboard dan pembaca layar.
- `components/news/category-label.tsx`: Badge visual penanda kategori (Nasional, Daerah, Politik, dll).
- `components/news/demo-notice.tsx`: Komponen kotak peringatan (aside note) penanda data demo.
- `components/news/featured-section.tsx`: Tata letak headline utama beranda bergaya grid ala portal berita.
- `components/news/header-nav.tsx`: Bilah navigasi kategori utama di bagian atas.
- `components/news/logo.tsx`: Komponen rendering nama merek dan logo visual.
- `components/news/newsletter.tsx`: Formulir interaktif newsletter (hanya simulasi di browser, tanpa handler backend).
- `components/news/news-sidebar.tsx`: Kolom samping kanan berisi daftar artikel populer, trending topics, dan placeholder slot iklan 300x250.
- `components/news/regional-news.tsx`: Daftar berita kurasi berbasis daerah/provinsi di Indonesia.
- `components/news/section-heading.tsx`: Judul bagian halaman dengan garis aksen warna tema.
- `components/news/share-buttons.tsx`: Tombol berbagi artikel ke media sosial (WhatsApp, Twitter/X, Facebook, dan salin tautan clipboard).
- `components/news/site-footer.tsx`: Kaki halaman portal dengan tautan kanal aktif dan tautan perusahaan/layanan yang saat ini masih berupa tag span statis non-fungsional.
- `components/news/site-header.tsx`: Header komprehensif memuat penanggalan WIB, bilah pencarian cepat, navigasi, dan tombol login admin.
- `components/ui/button.tsx`: Komponen tombol dasar berbasis class-variance-authority.

### 2.3 Alur Data dan Batas Kepercayaan (Data Flow & Trust Boundaries)

```
[Sumber Data Statis: lib/news.ts]
               │
               ▼ (Build Time / SSG)
┌─────────────────────────────────────────────────────────┐
│ Next.js Server & Prerender Engine                       │
│ - app/page.tsx                                          │
│ - app/berita/[slug]/page.tsx                            │
│ - app/kategori/[slug]/page.tsx                          │
└─────────────────────────────────────────────────────────┘
               │
               ▼ (Kirim HTML Statis + JS Chunks)
┌─────────────────────────────────────────────────────────┐
│ Peramban Klien (Client Browser)                         │
│ - Komponen Berita Publik (Read-Only)                    │
│ - Komponen Interaktif (Share, Search, Newsletter Mock)  │
│                                                         │
│ [Zona Klien Sensitif]                                   │
│ - app/login/page.tsx                                    │
│ - app/admin/page.tsx                                    │
│ - app/reset-password/page.tsx                           │
└─────────────────────────────────────────────────────────┘
        │                                 │
        │ Direct Browser Auth             │ Direct Table Query/Insert
        │ (Anon Key di Browser)           │ (Tergantung RLS Supabase)
        ▼                                 ▼
┌─────────────────────────────────────────────────────────┐
│ Supabase Cloud API (Auth & PostgreSQL)                  │
│ - auth.users                                            │
│ - public.admin_users                                    │
│ - public.articles                                       │
└─────────────────────────────────────────────────────────┘
```

Deskripsi Batas Kepercayaan (Trust Boundaries):
1. Tidak ada Server-Side Data Fetching ke Supabase: Seluruh artikel yang tampil di sisi publik diambil dari array statis di memory pada `lib/news.ts`.
2. Tidak ada Middleware / Server-Side Session Validation: Rute `/admin` mengirimkan bundle JavaScript dan markup halaman admin ke seluruh pengunjung. Pengecekan apakah pengguna adalah admin hanya dilakukan di klien melalui `useEffect` dengan memanggil `supabase.auth.getUser()` lalu mengecek tabel `admin_users`. Pengguna yang menonaktifkan JavaScript atau menginspeksi network dapat melihat struktur dasbor admin tanpa verifikasi di server.
3. Ketiadaan Server Client Supabase: Belum ada konfigurasi `createServerClient` berbasis cookies di Next.js App Router, sehingga otentikasi sesi tidak dapat diverifikasi secara aman sebelum merender halaman admin.
4. Nilai Anon Key di Sisi Klien: Variabel lingkungan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` terekspos di browser. Hal ini aman selama RLS (Row Level Security) aktif di Supabase, namun saat ini tidak ada skema database atau migration file di dalam repositori untuk memvalidasi kebijakan RLS.

---

## 3. Inventarisasi Teks Merek Lama, URL Warisan, Kata Demo, dan Tipografi

Pencarian dilakukan di seluruh berkas kode sumber dan konten (tidak termasuk .git, node_modules, dan berkas biner):

### 3.1 'Nusantara News' (10 kemunculan)
- `README.md:1`: `# Nusantara News`
- `README.md:3`: `Portal digital berita Nusantara News berbasis Next.js, React, TypeScript, Tailwind CSS, dan Supabase untuk autentikasi admin.`
- `lib/news.ts:34`: `export const SITE_NAME = 'Nusantara News'`
- `components/news/site-footer.tsx:53`: `<p>&copy; 2026 Nusantara News. Hak cipta dilindungi.</p>`
- `components/news/logo.tsx:9`: `aria-label="Nusantara News: Beranda"`
- `app/layout.tsx:20`: `'Nusantara News menyajikan berita terkini nasional, daerah, politik, ekonomi, olahraga, teknologi, dan gaya hidup dari seluruh penjuru Indonesia.'`
- `app/reset-password/page.tsx:96`: `Buat password baru untuk akun admin Nusantara News.`
- `app/admin/page.tsx:135`: `Nusantara News`
- `app/login/page.tsx:48`: `Nusantara News`
- `app/cari/page.tsx:9`: `description: 'Cari berita terkini dari seluruh kanal Nusantara News.'`

### 3.2 'NusantaraNews' (0 kemunculan)
Tidak ditemukan kemunculan teks 'NusantaraNews' pada kode sumber.

### 3.3 'nusantaranews' dan 'nusantaranewsidn' (3 kemunculan)
- `lib/news.ts:35`: `export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nusantaranewsidn.com').replace(/\/$/, '')`
- `components/news/share-buttons.tsx:5`: `const ARTICLE_SHARE_BASE = 'https://nusantaranewsidn.com'`
- `components/news/site-footer.tsx:20`: `redaksi@nusantaranews.example`

### 3.4 'v0.app' (1 kemunculan)
- `app/layout.tsx:22`: `generator: 'v0.app'`

### 3.5 'demo' (21 kemunculan di kode dan konten)
- `lib/news.ts:61`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:84`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:107`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:129`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:152`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:175`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:198`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:220`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:242`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:264`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:286`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:308`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:329`: `imageCaption: '... (Ilustrasi demo)'`
- `lib/news.ts:350`: `imageCaption: '... (Ilustrasi demo)'`
- `components/news/news-sidebar.tsx:63`: `<p className="mt-2 text-sm text-muted-foreground">300 x 250 - slot iklan demo</p>`
- `components/news/site-footer.tsx:54`: `<p>Prototipe demo: seluruh konten berita bersifat fiktif.</p>`
- `components/news/newsletter.tsx:38`: `Ini adalah prototipe demo: alamat {email} tidak disimpan atau dikirimi email.`
- `components/news/newsletter.tsx:72`: `'Formulir demo: data tidak disimpan. Anda dapat berhenti berlangganan kapan saja.'`
- `app/page.tsx:8`: `import { DemoNotice } from '@/components/news/demo-notice'`
- `app/kategori/[slug]/page.tsx:7`: `import { DemoNotice } from '@/components/news/demo-notice'`
- `app/berita/[slug]/page.tsx:21`: `import { DemoNotice } from '@/components/news/demo-notice'`
- Berkas komponen `components/news/demo-notice.tsx` memuat teks 'Mode demonstrasi' dan teks disclaimer demo.

### 3.6 'fiktif' (1 kemunculan)
- `components/news/site-footer.tsx:54`: `<p>Prototipe demo: seluruh konten berita bersifat fiktif.</p>`

### 3.7 'example' (2 kemunculan di kode/teks)
- `README.md:12`: `cp .env.example .env.local`
- `components/news/site-footer.tsx:20`: `redaksi@nusantaranews.example`

### 3.8 Karakter Em Dash (U+2014) (5 kemunculan pada string kode/konten)
- `components/news/news-sidebar.tsx:63`: Teks slot iklan (`300 x 250 - slot iklan demo`)
- `components/news/site-footer.tsx:54`: Teks disclaimer footer (`Prototipe demo: seluruh konten berita bersifat fiktif.`)
- `components/news/logo.tsx:9`: Atribut aksesibilitas logo (`aria-label="Nusantara News: Beranda"`)
- `components/news/newsletter.tsx:38`: Pesan konfirmasi newsletter (`Ini adalah prototipe demo: alamat...`)
- `app/layout.tsx:16`: Template title default (`default: \`\${SITE_NAME} - Berita Terkini Indonesia Hari Ini\``)

### 3.9 Karakter En Dash (U+2013) (0 kemunculan pada teks kode/konten)
Tidak ditemukan karakter en dash pada teks kode atau konten.

---

## 4. Verifikasi Temuan Awal

Semua butir temuan awal telah diverifikasi langsung pada berkas kode sumber dan konfigurasi sistem:

1. Rute ganda /artikel dan /berita dengan canonical tidak konsisten: [TERVERIFIKASI]
   Bukti: `app/artikel/[slug]/page.tsx` menyajikan konten berita yang sama persis tanpa 301 redirect ke `/berita/[slug]`. Sebaliknya, pada `app/berita/[slug]/page.tsx` baris 40, metadata canonical justru menunjuk ke `/artikel/${article.slug}`. Ini menyebabkan sinyal canonical terbalik dan duplikasi konten terindeks.
2. Tidak ada sitemap, robots, manifest, RSS: [TERVERIFIKASI]
   Bukti: Berkas `sitemap.ts`/`sitemap.xml`, `robots.ts`/`robots.txt`, `manifest.ts`/`manifest.json`, dan rute RSS feed (`rss.xml` / `feed.xml`) sama sekali belum dibuat di dalam direktori `app/` maupun `public/`.
3. JSON-LD hanya NewsArticle dan memakai JSON.stringify langsung di dangerouslySetInnerHTML: [TERVERIFIKASI]
   Bukti: Pada `app/berita/[slug]/page.tsx` baris 74-86, skema schema.org hanya mendefinisikan `@type: 'NewsArticle'` (tidak ada BreadcrumbList, WebPage, atau SiteNavigationElement). Pada baris 86, injeksi dilakukan melalui `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />` tanpa escaping proteksi XSS terhadap karakter penutup script.
4. Otorisasi admin hanya di klien: [TERVERIFIKASI]
   Bukti: Pada `app/admin/page.tsx`, halaman menggunakan `"use client"`. Pengecekan otorisasi admin dilakukan di dalam `useEffect` browser via Supabase. Siapa pun dapat mengakses URL `/admin` dan menerima bundle HTML awal secara utuh.
5. Tidak ada proxy atau middleware: [TERVERIFIKASI]
   Bukti: Tidak terdapat berkas `middleware.ts`, `middleware.js`, maupun proxy routing server-side pada akar proyek atau `app/`.
6. Ticker tanpa kontrol jeda: [TERVERIFIKASI]
   Bukti: Pada `components/news/breaking-ticker.tsx`, animasi teks berjalan marquee hanya berhenti saat hover kursor mouse (`group-hover:[animation-play-state:paused]`). Tidak ada tombol jeda/putar yang dapat diakses pengguna keyboard maupun pembaca layar (melanggar kriteria sukses WCAG 2.2.2 Pause, Stop, Hide).
7. Tautan footer non-fungsional: [TERVERIFIKASI]
   Bukti: Pada `components/news/site-footer.tsx` baris 37 dan 45, daftar link Perusahaan ('Tentang Kami', 'Redaksi', 'Pedoman Media Siber', 'Kode Etik', 'Karier', 'Kontak') dan Layanan ('Newsletter', 'Indeks Berita', 'Pasang Iklan', 'Kebijakan Privasi', 'Syarat & Ketentuan') hanya dibungkus oleh elemen statis `<span>{item}</span>`, bukan tautan `<a>` atau `<Link>`.
8. Dua lockfile: [TERVERIFIKASI]
   Bukti: Terdapat berkas `package-lock.json` (ukuran 202.248 byte) dan `pnpm-lock.yaml` (ukuran 115.989 byte) secara bersamaan di direktori akar repositori. Sesuai keputusan proyek, pnpm adalah package manager standar.
9. Tanpa ESLint dan pengujian: [TERVERIFIKASI]
   Bukti: `package.json` tidak memiliki script `lint` maupun `test`. Tidak ada konfigurasi ESLint (`.eslintrc*` / `eslint.config.*`) maupun kerangka kerja pengujian (Vitest / Jest / Playwright).
10. images.unoptimized aktif: [TERVERIFIKASI]
    Bukti: Pada `next.config.mjs` baris 3-5, konfigurasi `images: { unoptimized: true }` disetel aktif, sehingga Next.js tidak melakukan optimasi format (WebP/AVIF), kompresi ukuran, atau responsive resizing gambar.
11. Tanpa CSP: [TERVERIFIKASI]
    Bukti: Pada `next.config.mjs` fungsi `headers()`, tidak ada header `Content-Security-Policy` yang didefinisikan.
12. HSTS tanpa includeSubDomains: [TERVERIFIKASI]
    Bukti: Pada `next.config.mjs` baris 13, header Strict-Transport-Security bernilai `max-age=63072000` tanpa direktif `includeSubDomains; preload`.

---

## 5. Audit Kerentanan Dependensi (pnpm audit)

Eksekusi perintah `pnpm audit` menghasilkan total 74 kerentanan keamanan yang tercatat pada GitHub Advisory Database (menggunakan standar skoring CVSS v3.1 dan CVSS v4.0).

Ringkasan Tingkat Keparahan:
- Critical: 3 kerentanan
- High: 31 kerentanan
- Moderate: 34 kerentanan
- Low: 6 kerentanan

Rincian Kerentanan Tingkat Critical dan High Utama:
1. `next` (Versi terpasang: 16.4.0)
   - GHSA-2464-fhr4-w9xw (Critical, CVSS v4.0: 9.5): Remote Code Execution (RCE) tanpa autentikasi pada Image Optimization API saat berkas SVG digunakan. Teratasi pada Next.js >= 16.4.1.
   - GHSA-673q-mjm6-r5xr (Critical, CVSS v4.0: 9.5): Remote Code Execution (RCE) tanpa autentikasi pada fungsi 'use cache' yang mengembalikan typed arrays. Teratasi pada Next.js >= 16.4.1.
   - GHSA-p3m5-59mp-jv5r (High): Denial of Service pada Next.js App Router saat memanfaatkan Server Actions. Teratasi pada Next.js >= 16.4.1.
2. `proxy-addr` (Dibawa oleh paket CLI dev `shadcn` melalui `@modelcontextprotocol/sdk` > `express`)
   - GHSA-jqcg-44mw-7w3h (Critical, CVSS v3.1: 9.1): Kerentanan IP Spoofing melalui IPv4-mapped IPv6 trust subnet yang menyebabkan bypass kontrol akses berbasis IP. Teratasi pada proxy-addr >= 2.0.8.
3. `fast-uri` (8 kerentanan High): SSRF dan bypass trust boundary akibat normalisasi IPv6, literal backslash authority delimiter, dan host confusion.
4. `undici` (5 kerentanan High, 18 Moderate): TLS certificate validation bypass pada BalancedPool, DoS via WebSocket subprotocol yang tidak diminta, cross-user cookie disclosure, dll.
5. `brace-expansion` (7 kerentanan High): DoS melalui eksponensial brace expansion dan stack exhaustion OOM crash.
6. `postcss` (2 kerentanan High, 2 Moderate): Arbitrary file read dan information disclosure via sourceMappingURL pada komentar CSS, path traversal pada file `.map`.
7. `@modelcontextprotocol/sdk` (3 kerentanan High, 2 Moderate): OAuth client credential leakage, unauthenticated task execution, memory exhaustion DoS.
8. `nanoid` (3 kerentanan High): Integer overflow dan infinite loop pada custom/non-secure generator.
9. `browserslist` (2 kerentanan High): Unbounded memory growth OOM dan prototype write crash.
10. `braces` (1 kerentanan High): Stack exhaustion denial of service via deeply nested patterns.

Catatan Sumber Skoring: Sumber audit adalah GitHub Advisory Database (GHSA) yang merujuk pada standar CVSS v3.1 untuk advisori lawas dan standar CVSS v4.0 untuk advisori baru (seperti CVE-2026-96889 pada Next.js).

---

## 6. Pengukuran Baseline

### 6.1 Ukuran Berkas Gambar (public/images/)
Terdapat 14 berkas gambar PNG beresolusi penuh tanpa kompresi dengan total ukuran 27.934.305 byte (26,64 MB):
- `daerah-bali.png`: 2.145.233 byte (2,05 MB)
- `daerah-jakarta.png`: 2.049.133 byte (1,95 MB)
- `daerah-makassar.png`: 2.114.177 byte (2,02 MB)
- `daerah-raja-ampat.png`: 2.004.126 byte (1,91 MB)
- `daerah-toba.png`: 2.026.007 byte (1,93 MB)
- `daerah-yogyakarta.png`: 2.288.169 byte (2,18 MB)
- `ekonomi-pelabuhan.png`: 2.038.252 byte (1,94 MB)
- `ekonomi-rupiah.png`: 1.563.261 byte (1,49 MB)
- `lifestyle-batik.png`: 1.949.922 byte (1,86 MB)
- `nasional-ikn.png`: 2.108.694 byte (2,01 MB)
- `olahraga-bulutangkis.png`: 1.582.376 byte (1,51 MB)
- `olahraga-timnas.png`: 1.868.665 byte (1,78 MB)
- `politik-sidang.png`: 2.336.876 byte (2,23 MB)
- `teknologi-startup.png`: 1.859.414 byte (1,77 MB)
Total Ukuran: 27.934.305 byte (26,64 MB).
Karena `images.unoptimized` aktif, setiap pengguna yang membuka beranda mengunduh puluhan megabyte gambar mentah, berdampak sangat buruk terhadap LCP dan kuota data seluler.

### 6.2 Total Ukuran JavaScript dan HTML Klien per Rute (Hasil Build Turbopack)
Diukur langsung dari HTML yang di-generate Next.js pada direktori `.next/server/app/` beserta seluruh chunk JavaScript klien yang dimuat:

| Rute | Tipe Rute | Ukuran HTML | Total JS Klien | Jumlah Script Chunks |
| :--- | :--- | :--- | :--- | :--- |
| `/` (Beranda) | Static (SSG) | 145,45 kB | 617,33 kB | 10 scripts |
| `/berita/[slug]` | Static (SSG) | 88,85 kB | 614,23 kB | 10 scripts |
| `/artikel/[slug]` | Static (SSG) | 88,86 kB | 614,23 kB | 10 scripts |
| `/kategori/[slug]` | Static (SSG) | 61,67 kB | 611,39 kB | 10 scripts |
| `/admin` | Static Client Shell | 34,14 kB | 850,23 kB | 11 scripts (memuat client SDK) |
| `/login` | Static Client Shell | 34,81 kB | 847,66 kB | 11 scripts |
| `/reset-password` | Static Client Shell | 34,44 kB | 848,61 kB | 11 scripts |
| `/_not-found` | Static | 34,01 kB | 596,89 kB | 9 scripts |

### 6.3 Pengukuran Lighthouse Baseline
Pengukuran dilakukan menggunakan Lighthouse CLI v13.5.0 (`npx --yes lighthouse`) yang terhubung ke Chromium v150.0.7871.181 (Debian package) dengan profil emulasi perangkat bergerak (mobile, simulated throttling) pada server produksi Next.js lokal (`http://localhost:3333`):

| Halaman yang Diuji | Performance | Accessibility | Best Practices | SEO | Metrik Inti (FCP, LCP, TBT, CLS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` (Beranda) | 34 | 95 | 96 | 100 | FCP: 1,7 s, LCP: 46,9 s, TBT: 8.530 ms, CLS: 0, Speed Index: 15,9 s |
| `/berita/...` (Artikel IKN) | 72 | 96 | 96 | 100 | FCP: 1,0 s, LCP: 28,8 s, TBT: 210 ms, CLS: 0, Speed Index: 1,0 s |
| `/kategori/nasional` (Kategori) | 73 | 94 | 96 | 100 | FCP: 0,8 s, LCP: 13,1 s, TBT: 170 ms, CLS: 0, Speed Index: 0,8 s |

Analisis Skor:
- Skor Performance beranda sangat rendah (34) terutama diakibatkan oleh Largest Contentful Paint (LCP) mencapai 46,9 detik dan Total Blocking Time (TBT) tinggi. Hal ini terjadi karena 14 aset gambar berukuran total 26,64 MB dimuat tanpa optimasi format dan resolusi responsif (`images.unoptimized: true`).
- Skor SEO sempurna (100) secara sintaksis tag, namun tidak merefleksikan masalah indeksasi mendalam seperti sinyal canonical terbalik ke `/artikel/`, ketiadaan `sitemap.xml`, `robots.txt`, dan format URL warisan.
- Skor Aksesibilitas (94-96) memerlukan peningkatan pada kontrol jeda ticker (WCAG 2.2.2) dan perbaikan kontras serta struktur tautan footer.

---

## 7. Tabel Temuan Audit Lengkap

### Kriteria Tingkat Keparahan
- **Tinggi**: Celah keamanan kritis (RCE, bypass autentikasi/otorisasi), ketiadaan validasi server-side, kegagalan indeksasi SEO kanonis (duplikasi rute/canonical terbalik), atau degradasi performa ekstrem (LCP > 20 detik) yang merugikan pengguna secara fatal.
- **Sedang**: Pelanggaran aksesibilitas standar WCAG tingkat A/AA, fitur UI tidak fungsional (link statis mati), struktur konfigurasi ganda/inkonsisten (dua lockfile, rute warisan terlantar), dan ketiadaan fitur penunjang SEO dasar (sitemap, robots, RSS).
- **Rendah**: Ketidaksesuaian tipografi (tanda pisah dash), residu generator pihak ketiga (generator v0.app), atau kode styling kosmetik yang tidak menimbulkan risiko fungsional.

### Tabel Temuan

| ID | Deskripsi Temuan | Berkas Terkait | Dampak | Tingkat Keparahan | Fase Penanganan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SEC-01 | Kerentanan RCE kritis pada Next.js 16.4.0 Image Optimization & Cache (GHSA-2464-fhr4-w9xw, GHSA-673q-mjm6-r5xr) | `package.json`, `pnpm-lock.yaml` | Eksekusi kode arbitrer tanpa autentikasi pada server | Tinggi | Fase 1 |
| SEC-02 | Otorisasi dasbor admin hanya berjalan di browser (Client Component via useEffect) tanpa validasi sesi di server | `app/admin/page.tsx`, `lib/supabase/client.ts` | Siapa pun dapat mengakses HTML dasbor admin dan mengabaikan client redirect | Tinggi | Fase 3 |
| SEC-03 | Ketiadaan Server-Side Middleware dan Supabase Server Client | Akar proyek, `lib/supabase/` | Tidak ada proteksi rute di edge/server, tidak ada manajemen cookie sesi yang aman | Tinggi | Fase 1 & Fase 3 |
| SEC-04 | Ketiadaan header Content-Security-Policy (CSP) dan konfigurasi HSTS tanpa includeSubDomains | `next.config.mjs` | Risiko serangan XSS, clickjacking, dan serangan downgrade SSL pada subdomain | Tinggi | Fase 1 |
| SEC-05 | Injeksi JSON-LD menggunakan JSON.stringify langsung di dangerouslySetInnerHTML tanpa sanitasi karakter script | `app/berita/[slug]/page.tsx` | Potensi kerentanan injeksi script (XSS) melalui konten berita | Sedang | Fase 1 |
| PERF-01 | Pengaturan `images.unoptimized: true` aktif menyebabkan seluruh 26,64 MB gambar PNG mentah diunduh pengguna | `next.config.mjs`, `public/images/` | LCP beranda mencapai 46,9 detik, skor Performance anjlok ke 34, boros kuota data pengguna | Tinggi | Fase 2 |
| SEO-01 | Inkonsistensi rute ganda: `/berita/[slug]` dan `/artikel/[slug]` keduanya aktif, dan canonical `/berita` menunjuk ke `/artikel` | `app/berita/[slug]/page.tsx`, `app/artikel/[slug]/page.tsx` | Kanonisasi kacau, sinyal indeksasi mesin pencari terbagi, melanggar Keputusan Terkunci | Tinggi | Fase 1 |
| SEO-02 | Ketiadaan sitemap.xml, robots.txt, web app manifest, dan RSS Feed 2.0 | `app/`, `public/` | Mesin pencari kesulitan melakukan crawling efisien, tidak ada feed sindikasi berita | Sedang | Fase 1 |
| SEO-03 | Format judul halaman menggunakan pemisah em dash (U+2014) bukan garis pipa (' \| ') | `app/layout.tsx`, `lib/news.ts` | Melanggar standar format judul halaman Keputusan Terkunci | Rendah | Fase 1 |
| A11Y-01 | Breaking News Ticker animasi marquee bergerak tanpa tombol kontrol jeda (Pause/Stop) | `components/news/breaking-ticker.tsx` | Melanggar WCAG 2.1 Success Criterion 2.2.2 (Pause, Stop, Hide), mengganggu pengguna gangguan perhatian/kognitif | Sedang | Fase 2 |
| A11Y-02 | Tautan footer bagian Perusahaan dan Layanan berupa tag span statis non-fungsional dan alamat email palsu | `components/news/site-footer.tsx` | Pengguna tidak dapat menavigasi ke halaman legalitas/redaksi, merusak kredibilitas | Sedang | Fase 2 |
| REBRAND-01 | Teks merek 'Nusantara News', URL domain lama 'nusantaranewsidn.com', dan email warisan tersebar di kode sumber | `lib/news.ts`, `components/news/*`, `app/*` | Inkonsistensi identitas merek baru 'WartaKita' | Tinggi | Fase 1 |
| REBRAND-02 | Teks penanda prototipe 'demo', 'Mode demonstrasi', 'fiktif', dan komponen `DemoNotice` di seluruh halaman | `components/news/demo-notice.tsx`, `lib/news.ts`, `app/*` | Tampilan publik terlihat seperti situs contoh yang belum siap produksi | Sedang | Fase 1 & Fase 2 |
| DEV-01 | Terdapat dua file kunci dependensi (package-lock.json dan pnpm-lock.yaml) | Akar proyek | Risiko konflik resolusi dependensi dan inkonsistensi lingkungan CI/CD | Sedang | Fase 1 |
| DEV-02 | Ketiadaan linter ESLint dan kerangka kerja pengujian otomatis (Unit/Integration Test) | `package.json` | Penurunan kualitas kode tidak terdeteksi sebelum proses deploy produksi | Sedang | Fase 1 |
| ROUTE-01 | Direktori rute anomalistik redundan `app/app/admin/page.tsx` | `app/app/admin/page.tsx` | Menambah kompleksitas struktur rute yang tidak perlu | Rendah | Fase 1 |
