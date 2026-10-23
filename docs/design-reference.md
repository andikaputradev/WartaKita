# Dokumentasi Rujukan Desain dan Sistem Desain WartaKita

Dokumen ini memuat data pengukuran rujukan dari news.detik.com, keputusan tipografi, tokens desain tiga lapis (primitif, semantik, komponen), serta verifikasi rasio kontras WCAG untuk WartaKita.

---

## 1. Metadata Pengukuran

- Sumber Rujukan: news.detik.com
- Tanggal Pengukuran: 23 Oktober 2026
- Alat Pengukuran: Chromium 150.0.7871.181 Headless melalui Chrome DevTools Protocol (CDP) `Runtime.evaluate` dan `window.getComputedStyle`
- Viewport Pengukuran:
  - Desktop: 1366 x 768 px
  - Mobile: 390 x 844 px (skala perangkat 1x / mobile viewport)

---

## 2. Hasil Pengukuran Rujukan (news.detik.com)

| Elemen Antarmuka | Status | Nilai Terukur (news.detik.com) | Spesifikasi Adopsi WartaKita |
|---|---|---|---|
| Nama Merek / Logo | Terverifikasi | Lebar 265 px, tinggi 55 px, Montserrat-FF / Arial | Komponen SVG Wordmark WartaKita, tinggi 40-48 px |
| Navigasi Kanal | Terverifikasi | 16 px, padding 8 px 12 px, Helvetica-FF / Arial | 15-16 px, padding 8 px 12 px, bobot 600 |
| Judul Utama Beranda | Terverifikasi | 32 px, line-height 41.6 px, bobot 600, warna rgb(33, 64, 154) | 28-32 px, line-height 1.25, bobot 700 |
| Judul Berita Ringkas | Terverifikasi | 14-16 px, line-height 18.2 px, warna rgb(102, 102, 102) atau gelap | 15-16 px, line-height 1.35, bobot 600 |
| Label Kanal | Terverifikasi | 12 px, kapital, line-height 18 px | 12 px, kapital, bobot 700, tracking-wider |
| Waktu / Timestamp | Terverifikasi | 12-13 px, line-height 18 px | 12-13 px, line-height 1.4, warna muted |
| Judul Artikel (Detail) | Terverifikasi | 32 px, line-height 41.6 px, bobot 600 | 32-40 px, line-height 1.2, bobot 700 |
| Teks Isi Artikel | Terverifikasi | 16 px, line-height 22.4 px, Helvetica-FF / Arial | 18 px, line-height 1.7, bobot 400 (optimal baca) |
| Lebar Kolom Baca Artikel | Terverifikasi | 694 px | 680-700 px (maksimal 42-45 rem) |
| Judul Bagian (Section) | Terverifikasi | 18 px, line-height 23.4 px, bobot 600 | 18-20 px, line-height 1.3, bobot 700 dengan garis aksen |
| Lebar Kontainer Maksimum | Terverifikasi | 1080 px inner content | 1160 px (maksimal 72.5 rem) |
| Lebar Kolom Samping (Sidebar) | Terverifikasi | 300-336 px | 300-320 px (kompatibel AdSlot 300x250) |
| Jarak Antarblok (Gap) | Terverifikasi | 16-24 px | 16-24 px (kelipatan 4 px) |

---

## 3. Keputusan Font

- Temuan Rujukan: news.detik.com menggunakan font khusus bernama `Montserrat-FF` dan `Helvetica-FF` (font berlisensi komersial/Font Fabric milik jaringan Detik Network) dengan fallback `Arial, Tahoma, sans-serif`.
- Keputusan Etika & Lisensi: WartaKita **TIDAK MENYALIN** atau memuat berkas font berlisensi tersebut.
- Keluarga Font Terpilih:
  - Menggunakan **Arimo** (Google Fonts open source berlisensi OFL, metrik kompatibel dengan Arial/Helvetica, self-hosted melalui `next/font/google`).
  - Fallback font sistem: `'Helvetica Neue', Helvetica, Arial, sans-serif`.
  - Font Source Serif 4 dan Inter dihapus sepenuhnya dari repositori.
  - Seluruh teks situs (nama merek, navigasi, judul berita, teks isi artikel, label, dan antarmuka admin) menggunakan satu keluarga sans-serif dengan varian bobot 400 (normal), 600 (semi-bold), dan 700 (bold).

---

## 4. Sistem Desain Tiga Lapis

### A. Lapisan Primitif (Base Tokens)
- Skala Spasi (Grid 4 px):
  - 1 = 4 px, 2 = 8 px, 3 = 12 px, 4 = 16 px, 5 = 20 px, 6 = 24 px, 8 = 32 px, 10 = 40 px, 12 = 48 px.
- Sudut Melengkung (Radius Minimalis 0 sampai 4 px):
  - radius-none: 0 px
  - radius-sm: 2 px
  - radius-md: 4 px
- Skala Tipografi:
  - text-xs: 12 px / line-height 16 px
  - text-sm: 14 px / line-height 20 px
  - text-base: 16 px / line-height 24 px
  - text-lg: 18 px / line-height 28 px
  - text-xl: 20 px / line-height 28 px
  - text-2xl: 24 px / line-height 32 px
  - text-3xl: 30 px / line-height 36 px
  - text-4xl: 36 px / line-height 42 px

### B. Lapisan Semantik (Semantic Colors)

#### Mode Terang (Default)
- `background`: `#FFFFFF`
- `surface`: `#F4F5F7`
- `ink`: `#1A1A1A` (teks utama)
- `muted`: `#5F6670` (teks sekunder, tanggal, meta)
- `border`: `#E3E6EA` (garis batas dan pemisah)
- `primary`: `#0A4DA2` (warna biru khas WartaKita)
- `primary-hover`: `#083C7E` (biru lebih gelap saat hover)
- `accent-breaking`: `#D8202F` (merah cerah untuk berita terkini / breaking news)

#### Mode Gelap (Dark Mode Tokens)
- `background`: `#0F172A`
- `surface`: `#1E293B`
- `ink`: `#F8FAFC`
- `muted`: `#94A3B8`
- `border`: `#334155`
- `primary`: `#60A5FA`
- `primary-hover`: `#93C5FD`
- `accent-breaking`: `#F87171`

### C. Lapisan Komponen
- `UtilityBar`: Tampilan atas untuk tanggal WIB, tautan Terpopuler, Indeks, Newsletter, akun sosial.
- `Header`: Logo WartaKita, formulir pencarian GET `/cari`, tombol drawer navigasi mobile.
- `ChannelNav`: Bilah navigasi kanal dengan scroll horizontal di perangkat layar sempit dan indikator visual.
- `BreakingBar`: Bilah berita berjalan dengan tombol pause/play yang dapat dioperasikan keyboard.
- `HeadlineBlock`: Tata letak berita utama 16:9 didampingi 4-5 berita ringkas thumbnail kecil.
- `NewsFeed`: Aliran kronologis dengan paginasi berbasis link URL nyata.
- `Sidebar`: Tag terpopuler, 5 berita terpopuler bernomor, pilihan redaksi, dan slot iklan tetap 300x250.
- `Footer`: Tata letak multi-kolom yang memuat kanal, direktori daerah, informasi redaksi, dan kontak.

---

## 5. Verifikasi Rasio Kontras WCAG (Level AA & AAA)

Perhitungan kontras dihitung berdasarkan rumus luminansi standar WCAG 2.2:
- Teks Normal (di bawah 18 pt atau di bawah 14 pt bold): minimal **4,5:1**
- Teks Besar (minimal 18 pt atau 14 pt bold) dan Komponen UI: minimal **3,0:1**

### A. Mode Terang (Light Mode)

| Pasangan Warna (Depan / Latar Belakang) | Rasio Kontras | Status Normal (>= 4.5:1) | Status Large/UI (>= 3.0:1) | Level WCAG |
|---|---|---|---|---|
| ink (#1A1A1A) pada background (#FFFFFF) | 17.40:1 | Lulus | Lulus | AAA |
| ink (#1A1A1A) pada surface (#F4F5F7) | 15.95:1 | Lulus | Lulus | AAA |
| muted (#5F6670) pada background (#FFFFFF) | 5.80:1 | Lulus | Lulus | AA |
| muted (#5F6670) pada surface (#F4F5F7) | 5.32:1 | Lulus | Lulus | AA |
| primary (#0A4DA2) pada background (#FFFFFF) | 8.09:1 | Lulus | Lulus | AAA |
| primary (#0A4DA2) pada surface (#F4F5F7) | 7.41:1 | Lulus | Lulus | AAA |
| white (#FFFFFF) pada primary (#0A4DA2) | 8.09:1 | Lulus | Lulus | AAA |
| white (#FFFFFF) pada primary-hover (#083C7E) | 10.73:1 | Lulus | Lulus | AAA |
| white (#FFFFFF) pada accent-breaking (#D8202F) | 5.04:1 | Lulus | Lulus | AA |
| accent-breaking (#D8202F) pada background (#FFFFFF) | 5.04:1 | Lulus | Lulus | AA |

### B. Mode Gelap (Dark Mode)

| Pasangan Warna (Depan / Latar Belakang) | Rasio Kontras | Status Normal (>= 4.5:1) | Status Large/UI (>= 3.0:1) | Level WCAG |
|---|---|---|---|---|
| ink (#F8FAFC) pada background (#0F172A) | 17.06:1 | Lulus | Lulus | AAA |
| ink (#F8FAFC) pada surface (#1E293B) | 13.98:1 | Lulus | Lulus | AAA |
| muted (#94A3B8) pada background (#0F172A) | 6.96:1 | Lulus | Lulus | AA |
| muted (#94A3B8) pada surface (#1E293B) | 5.71:1 | Lulus | Lulus | AA |
| primary (#60A5FA) pada background (#0F172A) | 7.02:1 | Lulus | Lulus | AA |
| primary (#60A5FA) pada surface (#1E293B) | 5.75:1 | Lulus | Lulus | AA |
| accent-breaking (#F87171) pada background (#0F172A) | 6.45:1 | Lulus | Lulus | AA |
| accent-breaking (#F87171) pada surface (#1E293B) | 5.29:1 | Lulus | Lulus | AA |

---

## 6. Ringkasan Kesimpulan

Seluruh pengukuran rujukan dari news.detik.com telah diverifikasi secara langsung menggunakan DevTools CDP. Palet warna semantik WartaKita lulus pengujian kontras WCAG 2.2 AA dan AAA tanpa pengecualian. Pemilihan font Arimo menjamin kompatibilitas metrik dengan Arial/Helvetica tanpa memuat aset font berlisensi komersial pihak ketiga.
