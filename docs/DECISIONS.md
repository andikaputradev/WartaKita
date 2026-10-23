# Keputusan Arsitektur dan Desain Terkunci (Architecture Decision Records)

Dokumen ini memuat seluruh keputusan desain dan arsitektur yang berstatus TERKUNCI untuk proyek rebrand portal berita WartaKita. Seluruh pengembang dan agen dilarang mengubah keputusan ini tanpa persetujuan tertulis dari pemilik proyek.

---

## 1. Identitas Merek dan Domain Kanonis

- Nama Merek: WartaKita (ditulis menyatu satu kata, dengan huruf 'W' dan 'K' kapital).
- Domain Kanonis: `https://wartakita.my.id` (host kanonis tanpa awalan www).
- Bahasa Situs: `id-ID` (Bahasa Indonesia).
- Zona Waktu Tampilan: `Asia/Jakarta` (Waktu Indonesia Barat / WIB) untuk seluruh stempel waktu terbitan dan pembaruan berita.
- Pemisah Judul Halaman (Page Title Separator): Tanda garis pipa dengan spasi (' | '), tanpa menggunakan tanda em dash (U+2014) maupun en dash (U+2013).

---

## 2. Struktur URL dan Kanonisasi Berita

- URL Artikel Kanonis: `/berita/[slug]`.
- Rute Warisan `/artikel/[slug]`: Hanya berfungsi sebagai redirect HTTP 301 permanen menuju `/berita/[slug]`. Tidak boleh menyajikan konten duplikat atau kanonisasi silang yang membingungkan mesin pencari.
- Tautan Bagikan (Share URLs) dan Tag Open Graph / Twitter Cards: Wajib menggunakan URL kanonis penuh dengan basis `https://wartakita.my.id/berita/[slug]`.

---

## 3. Batasan dan Keputusan Font

- Penetapan Font: Pemilihan dan penambahan font baru hanya boleh dilakukan pada Fase 2 berdasarkan hasil pengukuran performa web vitals.
- Larangan: Dilarang menambah atau memuat font eksternal baru sebelum Fase 2 selesai diukur.

---

## 4. Keamanan dan Area Administratif

- Alamat Admin: Terletak di `/admin`.
- Indeksasi Mesin Pencari: Rute `/admin` dan seluruh sub-rutenya wajib dicegah dari indeksasi mesin pencari (`noindex, nofollow`, serta blokir di `robots.txt`).
- Proteksi Server-Side: Otorisasi admin wajib diverifikasi di sisi server (via Next.js Middleware dan Supabase Server Client berbasis HTTP cookies). Dilarang mengandalkan proteksi berbasis klien saja.
- Manajemen Peran (RBAC): Mendukung peran bertingkat: `admin`, `editor`, dan `writer`.
- Rahasia dan Token: Service-role key hanya boleh berada di variabel lingkungan server-side. Dilarang memasukkan service key ke variabel dengan awalan `NEXT_PUBLIC_*` atau membocorkannya ke bundle klien.

---

## 5. Tumpukan Teknologi (Technology Stack)

Tumpukan teknologi terkunci dan dilarang diganti:
- Framework: Next.js (versi sesuai package.json, App Router, Turbopack).
- Library UI: React 19, shadcn/ui.
- Bahasa: TypeScript mode strict (tanpa `any` yang tidak perlu).
- Styling: Tailwind CSS v4.
- Backend & Database: Supabase (Auth, PostgreSQL, Storage).
- Package Manager: pnpm (dilarang menggunakan npm atau yarn; berkas `package-lock.json` wajib dihapus).
- Platform Deployment: Vercel.

---

## 6. Standar Tipografi Kode dan Konten

- Larangan Karakter: Dilarang keras memakai tanda em dash (U+2014) maupun en dash (U+2013) pada seluruh kode sumber, string, konten berita, dokumentasi, maupun pesan commit git.
- Pengganti Sah: Gunakan tanda koma (,), titik dua (:), kurung (()), atau tanda hubung minus standar (-). Seluruh kemunculan karakter em dash dan en dash yang sudah ada wajib dibersihkan.

---

## 7. Batas Hukum, Etika, dan Desain Rujukan

- Rujukan Desain: Mengacu pada pola tata letak, alur navigasi, dan hierarki informasi portal berita news.detik.com.
- Batasan Hukum: Dilarang keras menyalin logo, gambar berhak cipta, teks berita, kode sumber, atau berkas font berlisensi dari detik.com maupun situs pihak ketiga lainnya.
- Identitas Visual: Identitas visual WartaKita harus unik, orisinal, dan memiliki diferensiasi yang jelas dari merek lain.
- Integritas Jurnalistik: Dilarang mempublikasikan berita fiktif atau klaim palsu sebagai berita nyata di lingkungan produksi.

---

## 8. Konfigurasi Pencarian Teks Penuh (Full-Text Search) PostgreSQL

- Ketersediaan Konfigurasi Teks: Kueri `select cfgname from pg_ts_config` pada server PostgreSQL mengonfirmasi bahwa konfigurasi teks bahasa Indonesia (`indonesian`) tersedia secara bawaan.
- Keputusan Algoritma Pencarian: Kolom pencarian `search` bertipe `tsvector` di tabel `articles` menggunakan konfigurasi `indonesian` (`to_tsvector('indonesian', coalesce(title, '') || ' ' || coalesce(excerpt, ''))`).
- Dukungan Trigram: Ekstensi `pg_trgm` diaktifkan untuk melengkapi pencarian teks penuh dengan kemampuan trigram similarity dan fuzzy matching pada judul artikel.

---

## 9. Arsitektur Data, Keamanan RLS, dan Isolasi Service-Role

- Skema Entitas Relasional: Diterapkan 13 tabel migrasi terurut (`profiles`, `categories`, `tags`, `articles`, `article_tags`, `article_revisions`, `audit_log`, `featured_slots`, `breaking_news`, `redirects`, `site_settings`, `media_assets`, `newsletter_subscribers`).
- Penegakan Hak Akses RLS: Seluruh tabel memiliki `ENABLE ROW LEVEL SECURITY` dan `FORCE ROW LEVEL SECURITY`. Helper `has_role(roles)` ditetapkan dengan `SECURITY DEFINER` dan `SET search_path = public, auth`.
- Isolasi Kunci Service-Role: Klien `lib/supabase/admin.ts` diproteksi dua lapis: compiler Next.js (`import 'server-only'`) dan linter ESLint (`no-restricted-imports`) untuk mencegah kebocoran kunci rahasia ke bundle klien.
- Strategi Caching dan Ketahanan Sistem: Lapisan data di `lib/data/` menggunakan `unstable_cache` (`revalidate: 60`, tagged revalidation). Jika database belum terhubung atau sedang offline saat proses build/deploy, sistem menerapkan fallback anggun ke data mock tanpa menimbulkan error 500.
- Penghitung Kunjungan (View Counter): Endpoint `POST /api/views` menyaring bot pencari secara ketat dan mendeduplikasi permintaan per jam per IP menggunakan hash SHA-256 tersalt, sebelum memanggil RPC atomik `increment_article_views`.

