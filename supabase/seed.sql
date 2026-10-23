-- WartaKita Seed Data
-- Generated automatically from lib/news.ts
BEGIN;

-- 1. Profiles & Auth Users

INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'admin-wartakita@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000001', 'Administrator WartaKita', 'admin-wartakita', 'Akun pengelola utama portal berita WartaKita.', 'admin', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000002', 'rahmat-hidayat@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000002', 'Rahmat Hidayat', 'rahmat-hidayat', 'Redaktur Nasional di portal berita WartaKita.', 'editor', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000003', 'dewi-kartika@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000003', 'Dewi Kartika', 'dewi-kartika', 'Jurnalis Politik di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000004', 'bima-prasetyo@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000004', 'Bima Prasetyo', 'bima-prasetyo', 'Jurnalis Ekonomi di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000005', 'yoga-saputra@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000005', 'Yoga Saputra', 'yoga-saputra', 'Jurnalis Olahraga di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000006', 'nadia-putri@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000006', 'Nadia Putri', 'nadia-putri', 'Jurnalis Teknologi di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000007', 'sari-wulandari@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000007', 'Sari Wulandari', 'sari-wulandari', 'Jurnalis Gaya Hidup di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000008', 'i-made-surya@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000008', 'I Made Surya', 'i-made-surya', 'Kontributor Bali di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000009', 'hotman-siregar@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000009', 'Hotman Siregar', 'hotman-siregar', 'Kontributor Sumatera Utara di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-00000000000a', 'yohanes-wambrauw@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-00000000000a', 'Yohanes Wambrauw', 'yohanes-wambrauw', 'Kontributor Papua di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-00000000000b', 'fajar-nugroho@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-00000000000b', 'Fajar Nugroho', 'fajar-nugroho', 'Jurnalis Metropolitan di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-00000000000c', 'andi-rahmawati@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-00000000000c', 'Andi Rahmawati', 'andi-rahmawati', 'Kontributor Sulawesi Selatan di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-00000000000d', 'galih-pratama@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-00000000000d', 'Galih Pratama', 'galih-pratama', 'Kontributor Yogyakarta di portal berita WartaKita.', 'writer', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


INSERT INTO auth.users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-00000000000e', 'lestari-handayani@wartakita.my.id', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('00000000-0000-0000-0000-00000000000e', 'Lestari Handayani', 'lestari-handayani', 'Redaktur Ekonomi di portal berita WartaKita.', 'editor', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;


-- 2. Categories

INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000001', 'nasional', 'Nasional', 'Kebijakan, pemerintahan, dan isu strategis berskala nasional.', 1, true, 'Nasional | Berita Terkini WartaKita', 'Kebijakan, pemerintahan, dan isu strategis berskala nasional.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000002', 'daerah', 'Daerah', 'Kabar dari 38 provinsi, dari Sabang sampai Merauke.', 2, true, 'Daerah | Berita Terkini WartaKita', 'Kabar dari 38 provinsi, dari Sabang sampai Merauke.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000003', 'politik', 'Politik', 'Dinamika parlemen, partai, dan kebijakan publik.', 3, true, 'Politik | Berita Terkini WartaKita', 'Dinamika parlemen, partai, dan kebijakan publik.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000004', 'ekonomi', 'Ekonomi', 'Pasar, bisnis, keuangan, dan kesejahteraan rakyat.', 4, true, 'Ekonomi | Berita Terkini WartaKita', 'Pasar, bisnis, keuangan, dan kesejahteraan rakyat.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000005', 'olahraga', 'Olahraga', 'Sepak bola, bulu tangkis, dan prestasi atlet Indonesia.', 5, true, 'Olahraga | Berita Terkini WartaKita', 'Sepak bola, bulu tangkis, dan prestasi atlet Indonesia.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000006', 'teknologi', 'Teknologi', 'Startup, inovasi digital, dan kebijakan teknologi.', 6, true, 'Teknologi | Berita Terkini WartaKita', 'Startup, inovasi digital, dan kebijakan teknologi.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('10000000-0000-0000-0000-000000000007', 'lifestyle', 'Lifestyle', 'Budaya, kuliner, wisata, dan gaya hidup.', 7, true, 'Lifestyle | Berita Terkini WartaKita', 'Budaya, kuliner, wisata, dan gaya hidup.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;


-- 3. Tags

INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000001', 'asn', 'ASN')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000002', 'bwf', 'BWF')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000003', 'bahasa-daerah', 'Bahasa Daerah')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000004', 'bali', 'Bali')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000005', 'bank-indonesia', 'Bank Indonesia')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000006', 'batik', 'Batik')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000007', 'budaya', 'Budaya')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000008', 'budaya-batak', 'Budaya Batak')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000009', 'bulu-tangkis', 'Bulu Tangkis')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000a', 'dpr', 'DPR')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000b', 'danau-toba', 'Danau Toba')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000c', 'data-pribadi', 'Data Pribadi')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000d', 'denmark-open', 'Denmark Open')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000e', 'ekonomi-kreatif', 'Ekonomi Kreatif')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000000f', 'ekspor', 'Ekspor')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000010', 'fesyen', 'Fesyen')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000011', 'gbk', 'GBK')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000012', 'hilirisasi', 'Hilirisasi')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000013', 'ikn', 'IKN')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000014', 'ibu-kota-nusantara', 'Ibu Kota Nusantara')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000015', 'jakarta', 'Jakarta')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000016', 'keamanan-siber', 'Keamanan Siber')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000017', 'kebijakan-publik', 'Kebijakan Publik')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000018', 'kecerdasan-buatan', 'Kecerdasan Buatan')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000019', 'konservasi', 'Konservasi')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001a', 'mrt', 'MRT')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001b', 'malioboro', 'Malioboro')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001c', 'maritim', 'Maritim')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001d', 'moneter', 'Moneter')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001e', 'papua', 'Papua')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000001f', 'pariwisata', 'Pariwisata')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000020', 'pelabuhan', 'Pelabuhan')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000021', 'pendanaan', 'Pendanaan')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000022', 'perdagangan', 'Perdagangan')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000023', 'pertanian', 'Pertanian')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000024', 'piala-asia', 'Piala Asia')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000025', 'pinisi', 'Pinisi')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000026', 'raja-ampat', 'Raja Ampat')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000027', 'regulasi', 'Regulasi')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000028', 'ruang-publik', 'Ruang Publik')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000029', 'rupiah', 'Rupiah')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002a', 'sepak-bola', 'Sepak Bola')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002b', 'startup', 'Startup')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002c', 'subak', 'Subak')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002d', 'suku-bunga', 'Suku Bunga')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002e', 'sulawesi-selatan', 'Sulawesi Selatan')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-00000000002f', 'sumatera-utara', 'Sumatera Utara')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000030', 'teknologi-pertanian', 'Teknologi Pertanian')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000031', 'timnas', 'Timnas')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000032', 'transportasi-publik', 'Transportasi Publik')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000033', 'umkm', 'UMKM')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


INSERT INTO public.tags (id, slug, name)
VALUES ('30000000-0000-0000-0000-000000000034', 'yogyakarta', 'Yogyakarta')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;


-- 4. Articles & Article Tags

INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000001',
  'pemindahan-asn-ke-ikn-gelombang-pertama-januari-2027',
  'Pemerintah Percepat Pemindahan ASN ke IKN, Gelombang Pertama Dimulai Januari 2027',
  'Sebanyak 12.000 aparatur sipil negara dari 16 kementerian dijadwalkan pindah ke Ibu Kota Nusantara pada tahap awal, seiring rampungnya hunian dan perkantoran inti.',
  '["Pemerintah memastikan pemindahan aparatur sipil negara (ASN) ke Ibu Kota Nusantara (IKN) akan dimulai pada Januari 2027. Gelombang pertama mencakup sekitar 12.000 pegawai dari 16 kementerian dan lembaga yang kantornya telah rampung dibangun di Kawasan Inti Pusat Pemerintahan.","Kepala Otorita IKN dalam konferensi pers di Jakarta, Senin (12/10/2026), menyebut kesiapan hunian vertikal untuk ASN telah mencapai 87 persen. Fasilitas pendukung seperti sekolah, puskesmas, dan transportasi listrik otonom juga dijadwalkan beroperasi sebelum akhir tahun.","\"Kami tidak ingin ASN pindah ke kota yang belum siap. Karena itu, pemindahan dilakukan bertahap dan berbasis kesiapan layanan dasar,\" ujarnya.","Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi menambahkan, ASN yang pindah akan menerima tunjangan kemahalan serta prioritas fasilitas pendidikan bagi anak. Sejumlah serikat pegawai meminta pemerintah membuka ruang konsultasi bagi pegawai dengan kondisi keluarga khusus.","Pengamat kebijakan publik menilai keberhasilan tahap awal akan menjadi penentu kepercayaan publik terhadap proyek IKN. Ia menekankan pentingnya transparansi anggaran dan evaluasi berkala yang dapat diakses masyarakat."]'::jsonb,
  $BODY$<p>Pemerintah memastikan pemindahan aparatur sipil negara (ASN) ke Ibu Kota Nusantara (IKN) akan dimulai pada Januari 2027. Gelombang pertama mencakup sekitar 12.000 pegawai dari 16 kementerian dan lembaga yang kantornya telah rampung dibangun di Kawasan Inti Pusat Pemerintahan.</p>
<p>Kepala Otorita IKN dalam konferensi pers di Jakarta, Senin (12/10/2026), menyebut kesiapan hunian vertikal untuk ASN telah mencapai 87 persen. Fasilitas pendukung seperti sekolah, puskesmas, dan transportasi listrik otonom juga dijadwalkan beroperasi sebelum akhir tahun.</p>
<p>"Kami tidak ingin ASN pindah ke kota yang belum siap. Karena itu, pemindahan dilakukan bertahap dan berbasis kesiapan layanan dasar," ujarnya.</p>
<p>Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi menambahkan, ASN yang pindah akan menerima tunjangan kemahalan serta prioritas fasilitas pendidikan bagi anak. Sejumlah serikat pegawai meminta pemerintah membuka ruang konsultasi bagi pegawai dengan kondisi keluarga khusus.</p>
<p>Pengamat kebijakan publik menilai keberhasilan tahap awal akan menjadi penentu kepercayaan publik terhadap proyek IKN. Ia menekankan pentingnya transparansi anggaran dan evaluasi berkala yang dapat diakses masyarakat.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000001',
  'Kalimantan Timur',
  '00000000-0000-0000-0000-000000000002',
  '/images/nasional-ikn.png',
  'Kawasan inti pemerintahan Ibu Kota Nusantara yang sedang dibangun saat matahari terbenam',
  'Kawasan Inti Pusat Pemerintahan IKN, Kalimantan Timur.',
  'Dok. Redaksi WartaKita',
  'Pemerintah Percepat Pemindahan ASN ke IKN, Gelombang Pertama Dimulai Januari 2027 | WartaKita',
  'Sebanyak 12.000 aparatur sipil negara dari 16 kementerian dijadwalkan pindah ke Ibu Kota Nusantara pada tahap awal, seiring rampungnya hunian dan perkantoran inti.',
  '2026-10-12T07:30:00+07:00',
  6,
  48210,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000013')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000014')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000017')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000002',
  'dpr-sahkan-aturan-turunan-perlindungan-data-pribadi',
  'DPR Sahkan Aturan Turunan Perlindungan Data Pribadi, Sanksi Korporasi Diperberat',
  'Rapat paripurna menyetujui penguatan lembaga pengawas data pribadi dan denda hingga 2 persen dari pendapatan tahunan bagi korporasi yang lalai.',
  '["Dewan Perwakilan Rakyat (DPR) mengesahkan aturan turunan tentang perlindungan data pribadi dalam rapat paripurna di Senayan, Jakarta. Seluruh fraksi menyatakan setuju setelah pembahasan intensif selama empat bulan.","Aturan baru ini memperkuat kewenangan lembaga pengawas data pribadi, termasuk hak melakukan audit mendadak terhadap pengendali data. Korporasi yang terbukti lalai dapat dikenai denda administratif hingga 2 persen dari pendapatan tahunan.","Ketua Komisi I DPR menyatakan regulasi ini merupakan respons atas sejumlah insiden kebocoran data yang merugikan masyarakat dalam beberapa tahun terakhir.","Koalisi masyarakat sipil menyambut baik pengesahan tersebut, namun mengingatkan agar lembaga pengawas benar-benar independen dari kepentingan pemerintah maupun industri."]'::jsonb,
  $BODY$<p>Dewan Perwakilan Rakyat (DPR) mengesahkan aturan turunan tentang perlindungan data pribadi dalam rapat paripurna di Senayan, Jakarta. Seluruh fraksi menyatakan setuju setelah pembahasan intensif selama empat bulan.</p>
<p>Aturan baru ini memperkuat kewenangan lembaga pengawas data pribadi, termasuk hak melakukan audit mendadak terhadap pengendali data. Korporasi yang terbukti lalai dapat dikenai denda administratif hingga 2 persen dari pendapatan tahunan.</p>
<p>Ketua Komisi I DPR menyatakan regulasi ini merupakan respons atas sejumlah insiden kebocoran data yang merugikan masyarakat dalam beberapa tahun terakhir.</p>
<p>Koalisi masyarakat sipil menyambut baik pengesahan tersebut, namun mengingatkan agar lembaga pengawas benar-benar independen dari kepentingan pemerintah maupun industri.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000003',
  NULL,
  '00000000-0000-0000-0000-000000000003',
  '/images/politik-sidang.png',
  'Suasana rapat paripurna di ruang sidang parlemen dengan anggota dewan duduk berbaris',
  'Rapat paripurna di Kompleks Parlemen, Senayan, Jakarta.',
  'Dok. Redaksi WartaKita',
  'DPR Sahkan Aturan Turunan Perlindungan Data Pribadi, Sanksi Korporasi Diperberat | WartaKita',
  'Rapat paripurna menyetujui penguatan lembaga pengawas data pribadi dan denda hingga 2 persen dari pendapatan tahunan bagi korporasi yang lalai.',
  '2026-10-12T06:45:00+07:00',
  5,
  31540,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-00000000000a')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-00000000000c')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000027')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000016')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000003',
  'ekspor-nonmigas-naik-tanjung-priok-rekor-bongkar-muat',
  'Ekspor Nonmigas Naik 8,4 Persen, Tanjung Priok Catat Rekor Bongkar Muat',
  'Lonjakan permintaan produk hilirisasi nikel dan minyak sawit mendorong kinerja ekspor kuartal III melampaui proyeksi pemerintah.',
  '["Badan Pusat Statistik mencatat nilai ekspor nonmigas Indonesia pada kuartal III 2026 tumbuh 8,4 persen secara tahunan. Kenaikan ini ditopang produk hilirisasi nikel, minyak sawit olahan, serta komponen elektronik.","Seiring lonjakan tersebut, Pelabuhan Tanjung Priok mencatat rekor bongkar muat 2,1 juta TEUs dalam satu kuartal, tertinggi sepanjang sejarah operasionalnya.","Ekonom menilai tren positif ini perlu dijaga dengan diversifikasi pasar tujuan, mengingat permintaan dari sejumlah negara mitra utama mulai melambat.","Kementerian Perdagangan menyatakan akan memperluas perjanjian dagang dengan negara-negara Afrika dan Timur Tengah untuk mengurangi ketergantungan pada pasar tradisional."]'::jsonb,
  $BODY$<p>Badan Pusat Statistik mencatat nilai ekspor nonmigas Indonesia pada kuartal III 2026 tumbuh 8,4 persen secara tahunan. Kenaikan ini ditopang produk hilirisasi nikel, minyak sawit olahan, serta komponen elektronik.</p>
<p>Seiring lonjakan tersebut, Pelabuhan Tanjung Priok mencatat rekor bongkar muat 2,1 juta TEUs dalam satu kuartal, tertinggi sepanjang sejarah operasionalnya.</p>
<p>Ekonom menilai tren positif ini perlu dijaga dengan diversifikasi pasar tujuan, mengingat permintaan dari sejumlah negara mitra utama mulai melambat.</p>
<p>Kementerian Perdagangan menyatakan akan memperluas perjanjian dagang dengan negara-negara Afrika dan Timur Tengah untuk mengurangi ketergantungan pada pasar tradisional.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000004',
  'DKI Jakarta',
  '00000000-0000-0000-0000-000000000004',
  '/images/ekonomi-pelabuhan.png',
  'Derek pelabuhan memuat peti kemas berwarna-warni ke kapal kargo saat fajar',
  'Aktivitas bongkar muat peti kemas di pelabuhan.',
  'Dok. Redaksi WartaKita',
  'Ekspor Nonmigas Naik 8,4 Persen, Tanjung Priok Catat Rekor Bongkar Muat | WartaKita',
  'Lonjakan permintaan produk hilirisasi nikel dan minyak sawit mendorong kinerja ekspor kuartal III melampaui proyeksi pemerintah.',
  '2026-10-12T05:50:00+07:00',
  4,
  22870,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-00000000000f')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000022')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000020')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000012')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000004',
  'timnas-indonesia-tekuk-vietnam-jaga-asa-piala-asia',
  'Timnas Indonesia Tekuk Vietnam 2-1, Jaga Asa ke Putaran Final Piala Asia',
  'Gol sundulan di menit ke-88 memastikan tiga poin penting bagi Garuda di hadapan 70 ribu suporter di Stadion Utama Gelora Bung Karno.',
  '["Tim nasional Indonesia meraih kemenangan dramatis 2-1 atas Vietnam dalam lanjutan kualifikasi Piala Asia di Stadion Utama Gelora Bung Karno, Jakarta, Minggu (11/10/2026) malam.","Indonesia sempat tertinggal lebih dulu pada menit ke-23 sebelum menyamakan kedudukan lewat tendangan bebas di awal babak kedua. Gol penentu lahir dari sundulan bek tengah pada menit ke-88 memanfaatkan sepak pojok.","Pelatih timnas memuji mentalitas para pemain yang tidak menyerah meski tertekan di babak pertama. \"Dukungan suporter malam ini luar biasa, mereka pemain ke-12 kami,\" katanya.","Dengan hasil ini, Indonesia naik ke posisi kedua klasemen sementara grup dan akan menghadapi Filipina pada laga tandang bulan depan."]'::jsonb,
  $BODY$<p>Tim nasional Indonesia meraih kemenangan dramatis 2-1 atas Vietnam dalam lanjutan kualifikasi Piala Asia di Stadion Utama Gelora Bung Karno, Jakarta, Minggu (11/10/2026) malam.</p>
<p>Indonesia sempat tertinggal lebih dulu pada menit ke-23 sebelum menyamakan kedudukan lewat tendangan bebas di awal babak kedua. Gol penentu lahir dari sundulan bek tengah pada menit ke-88 memanfaatkan sepak pojok.</p>
<p>Pelatih timnas memuji mentalitas para pemain yang tidak menyerah meski tertekan di babak pertama. "Dukungan suporter malam ini luar biasa, mereka pemain ke-12 kami," katanya.</p>
<p>Dengan hasil ini, Indonesia naik ke posisi kedua klasemen sementara grup dan akan menghadapi Filipina pada laga tandang bulan depan.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000005',
  NULL,
  '00000000-0000-0000-0000-000000000005',
  '/images/olahraga-timnas.png',
  'Para pemain berseragam merah merayakan gol di stadion yang penuh penonton pada malam hari',
  'Pemain merayakan gol kemenangan di menit akhir.',
  'Dok. Redaksi WartaKita',
  'Timnas Indonesia Tekuk Vietnam 2-1, Jaga Asa ke Putaran Final Piala Asia | WartaKita',
  'Gol sundulan di menit ke-88 memastikan tiga poin penting bagi Garuda di hadapan 70 ribu suporter di Stadion Utama Gelora Bung Karno.',
  '2026-10-11T22:15:00+07:00',
  4,
  56320,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000031')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-00000000002a')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000024')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000011')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000005',
  'startup-ai-lokal-pendanaan-seri-b-model-bahasa-daerah',
  'Startup AI Lokal Raih Pendanaan Seri B Rp 1,2 Triliun untuk Model Bahasa Daerah',
  'Dana segar akan digunakan untuk mengembangkan model kecerdasan buatan yang memahami lebih dari 40 bahasa daerah di Indonesia.',
  '["Sebuah perusahaan rintisan kecerdasan buatan asal Jakarta mengumumkan pendanaan Seri B senilai Rp 1,2 triliun yang dipimpin konsorsium investor regional.","Pendiri perusahaan menyebut dana tersebut akan dipakai untuk melatih model bahasa yang mampu memahami lebih dari 40 bahasa daerah, termasuk Jawa, Sunda, Bugis, Minangkabau, dan sejumlah bahasa di Papua.","\"Jutaan warga Indonesia lebih nyaman berbahasa daerah. Teknologi seharusnya beradaptasi dengan mereka, bukan sebaliknya,\" ujarnya.","Perusahaan juga berkomitmen bekerja sama dengan universitas dan komunitas adat untuk memastikan pengumpulan data dilakukan secara etis dan dengan persetujuan penutur."]'::jsonb,
  $BODY$<p>Sebuah perusahaan rintisan kecerdasan buatan asal Jakarta mengumumkan pendanaan Seri B senilai Rp 1,2 triliun yang dipimpin konsorsium investor regional.</p>
<p>Pendiri perusahaan menyebut dana tersebut akan dipakai untuk melatih model bahasa yang mampu memahami lebih dari 40 bahasa daerah, termasuk Jawa, Sunda, Bugis, Minangkabau, dan sejumlah bahasa di Papua.</p>
<p>"Jutaan warga Indonesia lebih nyaman berbahasa daerah. Teknologi seharusnya beradaptasi dengan mereka, bukan sebaliknya," ujarnya.</p>
<p>Perusahaan juga berkomitmen bekerja sama dengan universitas dan komunitas adat untuk memastikan pengumpulan data dilakukan secara etis dan dengan persetujuan penutur.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000006',
  'DKI Jakarta',
  '00000000-0000-0000-0000-000000000006',
  '/images/teknologi-startup.png',
  'Para insinyur perangkat lunak muda bekerja dengan laptop di kantor startup modern',
  'Tim pengembang di kantor startup di Jakarta Selatan.',
  'Dok. Redaksi WartaKita',
  'Startup AI Lokal Raih Pendanaan Seri B Rp 1,2 Triliun untuk Model Bahasa Daerah | WartaKita',
  'Dana segar akan digunakan untuk mengembangkan model kecerdasan buatan yang memahami lebih dari 40 bahasa daerah di Indonesia.',
  '2026-10-11T19:00:00+07:00',
  5,
  27410,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-00000000002b')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000018')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000021')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000003')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000006',
  'batik-tulis-diburu-generasi-muda-perajin-pekalongan-kewalahan',
  'Batik Tulis Kembali Diburu Generasi Muda, Perajin Pekalongan Kewalahan Pesanan',
  'Tren busana etnik di media sosial membuat permintaan batik tulis melonjak hingga tiga kali lipat dibanding tahun lalu.',
  '["Permintaan batik tulis dari kalangan anak muda melonjak tajam dalam beberapa bulan terakhir. Sejumlah perajin di Pekalongan, Jawa Tengah, mengaku kewalahan memenuhi pesanan yang datang dari berbagai kota.","Salah satu pemilik rumah batik menyebut pesanannya naik hingga tiga kali lipat. Kebanyakan pembeli berusia 20-30 tahun dan mengetahui produknya dari konten video pendek di media sosial.","Kenaikan permintaan ini menjadi angin segar bagi regenerasi perajin. Beberapa sanggar kini membuka kelas membatik untuk pemuda setempat agar keterampilan tradisional tidak punah.","Pemerintah daerah berencana memperluas program sertifikasi batik tulis agar konsumen dapat membedakannya dari kain bermotif batik hasil cetak massal."]'::jsonb,
  $BODY$<p>Permintaan batik tulis dari kalangan anak muda melonjak tajam dalam beberapa bulan terakhir. Sejumlah perajin di Pekalongan, Jawa Tengah, mengaku kewalahan memenuhi pesanan yang datang dari berbagai kota.</p>
<p>Salah satu pemilik rumah batik menyebut pesanannya naik hingga tiga kali lipat. Kebanyakan pembeli berusia 20-30 tahun dan mengetahui produknya dari konten video pendek di media sosial.</p>
<p>Kenaikan permintaan ini menjadi angin segar bagi regenerasi perajin. Beberapa sanggar kini membuka kelas membatik untuk pemuda setempat agar keterampilan tradisional tidak punah.</p>
<p>Pemerintah daerah berencana memperluas program sertifikasi batik tulis agar konsumen dapat membedakannya dari kain bermotif batik hasil cetak massal.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000007',
  'Jawa Tengah',
  '00000000-0000-0000-0000-000000000007',
  '/images/lifestyle-batik.png',
  'Tangan perajin melukis malam pada kain batik menggunakan canting',
  'Perajin batik tulis di Pekalongan, Jawa Tengah.',
  'Dok. Redaksi WartaKita',
  'Batik Tulis Kembali Diburu Generasi Muda, Perajin Pekalongan Kewalahan Pesanan | WartaKita',
  'Tren busana etnik di media sosial membuat permintaan batik tulis melonjak hingga tiga kali lipat dibanding tahun lalu.',
  '2026-10-11T15:20:00+07:00',
  4,
  18960,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000006')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000033')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000007')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000010')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000007',
  'subak-bali-irigasi-pintar-produksi-padi-tabanan-naik',
  'Subak Bali Terapkan Irigasi Pintar, Produksi Padi Tabanan Naik 15 Persen',
  'Perpaduan sistem subak warisan budaya dunia dengan sensor kelembapan tanah membantu petani menghemat air di tengah musim kemarau panjang.',
  '["Kelompok subak di Kabupaten Tabanan, Bali, mulai memadukan sistem irigasi tradisional dengan sensor kelembapan tanah berbasis tenaga surya. Hasilnya, produksi padi musim ini naik sekitar 15 persen.","Ketua subak setempat menjelaskan, sensor membantu menentukan waktu pembagian air yang lebih tepat tanpa mengubah prinsip Tri Hita Karana yang menjadi landasan subak.","Program ini merupakan kolaborasi pemerintah daerah, perguruan tinggi, dan komunitas petani. Rencananya, teknologi serupa akan diperluas ke 40 subak lain pada tahun depan."]'::jsonb,
  $BODY$<p>Kelompok subak di Kabupaten Tabanan, Bali, mulai memadukan sistem irigasi tradisional dengan sensor kelembapan tanah berbasis tenaga surya. Hasilnya, produksi padi musim ini naik sekitar 15 persen.</p>
<p>Ketua subak setempat menjelaskan, sensor membantu menentukan waktu pembagian air yang lebih tepat tanpa mengubah prinsip Tri Hita Karana yang menjadi landasan subak.</p>
<p>Program ini merupakan kolaborasi pemerintah daerah, perguruan tinggi, dan komunitas petani. Rencananya, teknologi serupa akan diperluas ke 40 subak lain pada tahun depan.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'Bali',
  '00000000-0000-0000-0000-000000000008',
  '/images/daerah-bali.png',
  'Petani bekerja di sawah terasering Bali yang diselimuti kabut pagi',
  'Sawah terasering di Kabupaten Tabanan, Bali.',
  'Dok. Redaksi WartaKita',
  'Subak Bali Terapkan Irigasi Pintar, Produksi Padi Tabanan Naik 15 Persen | WartaKita',
  'Perpaduan sistem subak warisan budaya dunia dengan sensor kelembapan tanah membantu petani menghemat air di tengah musim kemarau panjang.',
  '2026-10-12T08:10:00+07:00',
  4,
  15230,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000004')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000023')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-00000000002c')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000030')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000008',
  'festival-danau-toba-2026-targetkan-wisatawan-mancanegara',
  'Festival Danau Toba 2026 Targetkan 200 Ribu Wisatawan Mancanegara',
  'Rangkaian pertunjukan budaya Batak, lomba solu bolon, dan konser musik digelar selama sepekan di tujuh kabupaten sekitar danau.',
  '["Pemerintah Provinsi Sumatera Utara menargetkan 200 ribu wisatawan mancanegara selama penyelenggaraan Festival Danau Toba 2026 yang digelar pekan depan.","Festival menghadirkan pertunjukan tortor, lomba perahu tradisional solu bolon, pameran ulos, serta konser musik yang melibatkan musisi lokal dan nasional.","Pelaku usaha penginapan di Parapat dan Samosir melaporkan tingkat pemesanan kamar sudah mencapai 80 persen menjelang acara."]'::jsonb,
  $BODY$<p>Pemerintah Provinsi Sumatera Utara menargetkan 200 ribu wisatawan mancanegara selama penyelenggaraan Festival Danau Toba 2026 yang digelar pekan depan.</p>
<p>Festival menghadirkan pertunjukan tortor, lomba perahu tradisional solu bolon, pameran ulos, serta konser musik yang melibatkan musisi lokal dan nasional.</p>
<p>Pelaku usaha penginapan di Parapat dan Samosir melaporkan tingkat pemesanan kamar sudah mencapai 80 persen menjelang acara.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'Sumatera Utara',
  '00000000-0000-0000-0000-000000000009',
  '/images/daerah-toba.png',
  'Rumah adat Batak di tepi Danau Toba dengan latar pegunungan',
  'Rumah adat Batak di tepi Danau Toba, Sumatera Utara.',
  'Dok. Redaksi WartaKita',
  'Festival Danau Toba 2026 Targetkan 200 Ribu Wisatawan Mancanegara | WartaKita',
  'Rangkaian pertunjukan budaya Batak, lomba solu bolon, dan konser musik digelar selama sepekan di tujuh kabupaten sekitar danau.',
  '2026-10-11T13:40:00+07:00',
  3,
  12480,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-00000000000b')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-00000000001f')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000008')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-00000000002f')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-000000000009',
  'raja-ampat-batasi-kuota-penyelam-pulihkan-terumbu-karang',
  'Raja Ampat Batasi Kuota Penyelam demi Pulihkan Terumbu Karang',
  'Mulai November, jumlah penyelam di 12 titik selam utama dibatasi maksimal 150 orang per hari dengan sistem pemesanan daring.',
  '["Pemerintah Kabupaten Raja Ampat akan memberlakukan kuota harian bagi penyelam di 12 titik selam utama mulai November 2026. Setiap titik dibatasi maksimal 150 penyelam per hari.","Kebijakan ini diambil setelah survei terbaru menunjukkan sebagian terumbu karang mengalami tekanan akibat aktivitas wisata yang padat dan kenaikan suhu laut.","Masyarakat adat setempat dilibatkan sebagai pengawas lapangan, sementara pendapatan dari tarif konservasi akan dialokasikan untuk program rehabilitasi karang."]'::jsonb,
  $BODY$<p>Pemerintah Kabupaten Raja Ampat akan memberlakukan kuota harian bagi penyelam di 12 titik selam utama mulai November 2026. Setiap titik dibatasi maksimal 150 penyelam per hari.</p>
<p>Kebijakan ini diambil setelah survei terbaru menunjukkan sebagian terumbu karang mengalami tekanan akibat aktivitas wisata yang padat dan kenaikan suhu laut.</p>
<p>Masyarakat adat setempat dilibatkan sebagai pengawas lapangan, sementara pendapatan dari tarif konservasi akan dialokasikan untuk program rehabilitasi karang.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'Papua Barat Daya',
  '00000000-0000-0000-0000-00000000000a',
  '/images/daerah-raja-ampat.png',
  'Foto udara gugusan pulau karst hijau dan laut biru toska di Raja Ampat',
  'Gugusan pulau karst di Raja Ampat, Papua Barat Daya.',
  'Dok. Redaksi WartaKita',
  'Raja Ampat Batasi Kuota Penyelam demi Pulihkan Terumbu Karang | WartaKita',
  'Mulai November, jumlah penyelam di 12 titik selam utama dibatasi maksimal 150 orang per hari dengan sistem pemesanan daring.',
  '2026-10-11T10:05:00+07:00',
  4,
  20110,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000026')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000019')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-00000000001f')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-00000000001e')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-00000000000a',
  'mrt-fase-2-beroperasi-penuh-penumpang-harian-tembus-250-ribu',
  'MRT Fase 2 Beroperasi Penuh, Penumpang Harian Tembus 250 Ribu Orang',
  'Rute baru hingga kawasan Kota Tua membuat waktu tempuh warga dari Lebak Bulus terpangkas hingga 45 menit dibanding jalur darat.',
  '["Operasional penuh MRT Jakarta Fase 2 hingga kawasan Kota Tua mendorong jumlah penumpang harian menembus 250 ribu orang pada pekan pertama.","Direksi PT MRT Jakarta menyebut waktu tempuh dari Lebak Bulus ke Kota Tua kini sekitar 45 menit, jauh lebih cepat dibanding perjalanan darat pada jam sibuk.","Pemerintah Provinsi DKI Jakarta berencana menambah layanan bus pengumpan di sejumlah stasiun untuk memperluas jangkauan transportasi terintegrasi."]'::jsonb,
  $BODY$<p>Operasional penuh MRT Jakarta Fase 2 hingga kawasan Kota Tua mendorong jumlah penumpang harian menembus 250 ribu orang pada pekan pertama.</p>
<p>Direksi PT MRT Jakarta menyebut waktu tempuh dari Lebak Bulus ke Kota Tua kini sekitar 45 menit, jauh lebih cepat dibanding perjalanan darat pada jam sibuk.</p>
<p>Pemerintah Provinsi DKI Jakarta berencana menambah layanan bus pengumpan di sejumlah stasiun untuk memperluas jangkauan transportasi terintegrasi.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'DKI Jakarta',
  '00000000-0000-0000-0000-00000000000b',
  '/images/daerah-jakarta.png',
  'Penumpang naik kereta MRT di stasiun layang Jakarta pada jam sibuk sore hari',
  'Penumpang MRT pada jam sibuk di Jakarta.',
  'Dok. Redaksi WartaKita',
  'MRT Fase 2 Beroperasi Penuh, Penumpang Harian Tembus 250 Ribu Orang | WartaKita',
  'Rute baru hingga kawasan Kota Tua membuat waktu tempuh warga dari Lebak Bulus terpangkas hingga 45 menit dibanding jalur darat.',
  '2026-10-12T06:00:00+07:00',
  3,
  34770,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000a', '30000000-0000-0000-0000-00000000001a')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000a', '30000000-0000-0000-0000-000000000032')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000a', '30000000-0000-0000-0000-000000000015')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-00000000000b',
  'galangan-pinisi-bulukumba-banjir-pesanan-kapal-wisata-eropa',
  'Galangan Pinisi Bulukumba Banjir Pesanan Kapal Wisata dari Eropa',
  'Para panrita lopi atau ahli pembuat kapal tradisional kini menerima pesanan hingga dua tahun ke depan.',
  '["Galangan kapal pinisi di Tanah Beru, Bulukumba, Sulawesi Selatan, kebanjiran pesanan kapal wisata dari pembeli Eropa dan Australia.","Seorang panrita lopi mengatakan antrean pesanan kini mencapai dua tahun. Satu kapal pinisi wisata berukuran sedang membutuhkan waktu pengerjaan delapan hingga sepuluh bulan.","Pemerintah daerah mendorong pelatihan pemuda setempat agar keahlian membuat pinisi, yang telah diakui UNESCO sebagai warisan budaya takbenda, terus terjaga."]'::jsonb,
  $BODY$<p>Galangan kapal pinisi di Tanah Beru, Bulukumba, Sulawesi Selatan, kebanjiran pesanan kapal wisata dari pembeli Eropa dan Australia.</p>
<p>Seorang panrita lopi mengatakan antrean pesanan kini mencapai dua tahun. Satu kapal pinisi wisata berukuran sedang membutuhkan waktu pengerjaan delapan hingga sepuluh bulan.</p>
<p>Pemerintah daerah mendorong pelatihan pemuda setempat agar keahlian membuat pinisi, yang telah diakui UNESCO sebagai warisan budaya takbenda, terus terjaga.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'Sulawesi Selatan',
  '00000000-0000-0000-0000-00000000000c',
  '/images/daerah-makassar.png',
  'Kapal layar kayu pinisi bersandar di pelabuhan saat matahari terbenam',
  'Kapal pinisi bersandar di pelabuhan rakyat, Sulawesi Selatan.',
  'Dok. Redaksi WartaKita',
  'Galangan Pinisi Bulukumba Banjir Pesanan Kapal Wisata dari Eropa | WartaKita',
  'Para panrita lopi atau ahli pembuat kapal tradisional kini menerima pesanan hingga dua tahun ke depan.',
  '2026-10-10T16:30:00+07:00',
  4,
  9860,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000b', '30000000-0000-0000-0000-000000000025')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000b', '30000000-0000-0000-0000-00000000002e')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000b', '30000000-0000-0000-0000-00000000000e')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000b', '30000000-0000-0000-0000-00000000001c')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-00000000000c',
  'malioboro-uji-coba-bebas-kendaraan-bermotor-akhir-pekan',
  'Malioboro Uji Coba Bebas Kendaraan Bermotor Setiap Akhir Pekan',
  'Kawasan ikonik Yogyakarta itu akan steril dari kendaraan bermotor mulai Sabtu pagi hingga Minggu malam selama tiga bulan uji coba.',
  '["Pemerintah Kota Yogyakarta memulai uji coba kawasan Malioboro bebas kendaraan bermotor setiap akhir pekan selama tiga bulan ke depan.","Becak, andong, dan sepeda tetap diizinkan melintas. Pemerintah menyiapkan kantong parkir dan bus pengumpan di sejumlah titik sekitar kawasan.","Pedagang kaki lima menyambut positif kebijakan ini, meski berharap ada evaluasi berkala terkait dampaknya terhadap omzet harian."]'::jsonb,
  $BODY$<p>Pemerintah Kota Yogyakarta memulai uji coba kawasan Malioboro bebas kendaraan bermotor setiap akhir pekan selama tiga bulan ke depan.</p>
<p>Becak, andong, dan sepeda tetap diizinkan melintas. Pemerintah menyiapkan kantong parkir dan bus pengumpan di sejumlah titik sekitar kawasan.</p>
<p>Pedagang kaki lima menyambut positif kebijakan ini, meski berharap ada evaluasi berkala terkait dampaknya terhadap omzet harian.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000002',
  'DI Yogyakarta',
  '00000000-0000-0000-0000-00000000000d',
  '/images/daerah-yogyakarta.png',
  'Jalan tradisional Yogyakarta yang ramai dengan becak dan pedagang kaki lima saat senja',
  'Suasana senja di kawasan Malioboro, Yogyakarta.',
  'Dok. Redaksi WartaKita',
  'Malioboro Uji Coba Bebas Kendaraan Bermotor Setiap Akhir Pekan | WartaKita',
  'Kawasan ikonik Yogyakarta itu akan steril dari kendaraan bermotor mulai Sabtu pagi hingga Minggu malam selama tiga bulan uji coba.',
  '2026-10-10T11:15:00+07:00',
  3,
  14320,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000c', '30000000-0000-0000-0000-00000000001b')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000c', '30000000-0000-0000-0000-000000000034')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000c', '30000000-0000-0000-0000-00000000001f')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000c', '30000000-0000-0000-0000-000000000028')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-00000000000d',
  'bank-indonesia-tahan-suku-bunga-acuan',
  'Bank Indonesia Tahan Suku Bunga Acuan di Level 5,25 Persen',
  'Keputusan diambil untuk menjaga stabilitas rupiah di tengah ketidakpastian global, sambil tetap mendorong pertumbuhan kredit.',
  '["Rapat Dewan Gubernur Bank Indonesia memutuskan mempertahankan suku bunga acuan BI-Rate di level 5,25 persen.","Gubernur Bank Indonesia menyatakan keputusan tersebut konsisten dengan upaya menjaga inflasi dalam sasaran dan stabilitas nilai tukar rupiah di tengah gejolak pasar keuangan global.","Kalangan perbankan menilai keputusan ini memberi kepastian bagi dunia usaha. Pertumbuhan kredit diperkirakan tetap berada di kisaran 10-11 persen hingga akhir tahun."]'::jsonb,
  $BODY$<p>Rapat Dewan Gubernur Bank Indonesia memutuskan mempertahankan suku bunga acuan BI-Rate di level 5,25 persen.</p>
<p>Gubernur Bank Indonesia menyatakan keputusan tersebut konsisten dengan upaya menjaga inflasi dalam sasaran dan stabilitas nilai tukar rupiah di tengah gejolak pasar keuangan global.</p>
<p>Kalangan perbankan menilai keputusan ini memberi kepastian bagi dunia usaha. Pertumbuhan kredit diperkirakan tetap berada di kisaran 10-11 persen hingga akhir tahun.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000004',
  NULL,
  '00000000-0000-0000-0000-00000000000e',
  '/images/ekonomi-rupiah.png',
  'Tangan teller bank menghitung tumpukan uang kertas rupiah',
  'Petugas bank menghitung uang rupiah.',
  'Dok. Redaksi WartaKita',
  'Bank Indonesia Tahan Suku Bunga Acuan di Level 5,25 Persen | WartaKita',
  'Keputusan diambil untuk menjaga stabilitas rupiah di tengah ketidakpastian global, sambil tetap mendorong pertumbuhan kredit.',
  '2026-10-10T14:00:00+07:00',
  4,
  25690,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000d', '30000000-0000-0000-0000-000000000005')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000d', '30000000-0000-0000-0000-00000000002d')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000d', '30000000-0000-0000-0000-000000000029')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000d', '30000000-0000-0000-0000-00000000001d')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '20000000-0000-0000-0000-00000000000e',
  'ganda-putra-indonesia-juara-denmark-open',
  'Ganda Putra Indonesia Juara Denmark Open Usai Rubber Game Dramatis',
  'Pasangan Merah Putih menundukkan unggulan pertama asal Tiongkok dengan skor 21-19, 18-21, 23-21 di Odense.',
  '["Ganda putra Indonesia keluar sebagai juara Denmark Open setelah menundukkan unggulan pertama asal Tiongkok melalui pertarungan tiga gim yang menegangkan di Odense.","Pada gim penentuan, pasangan Indonesia sempat tertinggal 17-20 sebelum membalikkan keadaan dan menutup laga dengan skor 23-21.","Gelar ini menjadi yang ketiga bagi pasangan tersebut sepanjang musim 2026 dan mengerek posisi mereka ke peringkat dua dunia."]'::jsonb,
  $BODY$<p>Ganda putra Indonesia keluar sebagai juara Denmark Open setelah menundukkan unggulan pertama asal Tiongkok melalui pertarungan tiga gim yang menegangkan di Odense.</p>
<p>Pada gim penentuan, pasangan Indonesia sempat tertinggal 17-20 sebelum membalikkan keadaan dan menutup laga dengan skor 23-21.</p>
<p>Gelar ini menjadi yang ketiga bagi pasangan tersebut sepanjang musim 2026 dan mengerek posisi mereka ke peringkat dua dunia.</p>$BODY$,
  'published',
  '10000000-0000-0000-0000-000000000005',
  NULL,
  '00000000-0000-0000-0000-000000000005',
  '/images/olahraga-bulutangkis.png',
  'Pemain bulu tangkis melompat melakukan smes di arena dalam ruangan',
  'Smes keras di partai final ganda putra.',
  'Dok. Redaksi WartaKita',
  'Ganda Putra Indonesia Juara Denmark Open Usai Rubber Game Dramatis | WartaKita',
  'Pasangan Merah Putih menundukkan unggulan pertama asal Tiongkok dengan skor 21-19, 18-21, 23-21 di Odense.',
  '2026-10-11T23:40:00+07:00',
  3,
  29880,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_json = EXCLUDED.body_json,
  body_html = EXCLUDED.body_html,
  status = EXCLUDED.status,
  category_id = EXCLUDED.category_id,
  province = EXCLUDED.province,
  author_id = EXCLUDED.author_id,
  cover_path = EXCLUDED.cover_path,
  cover_alt = EXCLUDED.cover_alt,
  cover_caption = EXCLUDED.cover_caption,
  cover_credit = EXCLUDED.cover_credit,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  published_at = EXCLUDED.published_at,
  reading_minutes = EXCLUDED.reading_minutes,
  view_count = EXCLUDED.view_count,
  is_demo = EXCLUDED.is_demo;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000e', '30000000-0000-0000-0000-000000000009')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000e', '30000000-0000-0000-0000-00000000000d')
ON CONFLICT (article_id, tag_id) DO NOTHING;


INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('20000000-0000-0000-0000-00000000000e', '30000000-0000-0000-0000-000000000002')
ON CONFLICT (article_id, tag_id) DO NOTHING;


-- 5. Breaking News

INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('40000000-0000-0000-0000-000000000001', 'Gempa M 5,2 guncang Maluku Utara, BMKG pastikan tidak berpotensi tsunami', '/berita/pemindahan-asn-ke-ikn-gelombang-pertama-januari-2027', now() - interval '0 hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;


INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('40000000-0000-0000-0000-000000000002', 'Rupiah menguat ke Rp 15.420 per dolar AS pada pembukaan perdagangan pagi', '/berita/dpr-sahkan-aturan-turunan-perlindungan-data-pribadi', now() - interval '1 hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;


INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('40000000-0000-0000-0000-000000000003', 'Timnas Indonesia naik ke posisi kedua klasemen kualifikasi Piala Asia', '/berita/ekspor-nonmigas-naik-tanjung-priok-rekor-bongkar-muat', now() - interval '2 hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;


INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('40000000-0000-0000-0000-000000000004', 'Pemerintah umumkan jadwal pemindahan ASN gelombang pertama ke IKN', '/berita/timnas-indonesia-tekuk-vietnam-jaga-asa-piala-asia', now() - interval '3 hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;


INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('40000000-0000-0000-0000-000000000005', 'BMKG: Musim hujan diprediksi mulai akhir Oktober di sebagian besar Jawa', '/berita/startup-ai-lokal-pendanaan-seri-b-model-bahasa-daerah', now() - interval '4 hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;


-- 6. Featured Slots

INSERT INTO public.featured_slots (slot_key, position, article_id)
VALUES
  ('homepage-hero', 1, '20000000-0000-0000-0000-000000000001'),
  ('homepage-hero', 2, '20000000-0000-0000-0000-000000000002'),
  ('homepage-hero', 3, '20000000-0000-0000-0000-000000000003')
ON CONFLICT (slot_key, position) DO UPDATE SET article_id = EXCLUDED.article_id;


-- 7. Site Settings

INSERT INTO public.site_settings (key, value)
VALUES
  ('site_name', '"WartaKita"'::jsonb),
  ('tagline', '"Kabar Terpercaya, Dekat dengan Kita"'::jsonb),
  ('contact_email', '"redaksi@wartakita.my.id"'::jsonb),
  ('site_url', '"https://wartakita.my.id"'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

COMMIT;
