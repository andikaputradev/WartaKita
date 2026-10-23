import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { articles, categories, breakingNews } from '../lib/news'

// 1. Guard against executing on production environment
if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_PRODUCTION_SEED) {
  console.error('FATAL: Dilarang mengeksekusi seed script pada NODE_ENV=production')
  process.exit(1)
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
if (siteUrl === 'https://wartakita.my.id' && !process.env.ALLOW_PRODUCTION_SEED) {
  console.error('FATAL: Dilarang mengeksekusi seed script pada domain produksi wartakita.my.id')
  process.exit(1)
}

console.log('[Seed] Memulai penyusunan data seed WartaKita...')

// Helper to escape single quotes in SQL strings
function sqlQuote(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL'
  return `'${str.replace(/'/g, "''")}'`
}

function sqlDollar(str: string): string {
  return `$BODY$${str}$BODY$`
}

// 2. Prepare Author Profiles
const authorMap = new Map<
  string,
  { id: string; name: string; slug: string; role: 'admin' | 'editor' | 'writer'; bio: string }
>()

// Add default admin
authorMap.set('Administrator WartaKita', {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Administrator WartaKita',
  slug: 'admin-wartakita',
  role: 'admin',
  bio: 'Akun pengelola utama portal berita WartaKita.',
})

// Collect authors from articles
articles.forEach((art) => {
  if (!authorMap.has(art.author)) {
    const idx = authorMap.size + 1
    const hex = idx.toString(16).padStart(12, '0')
    const id = `00000000-0000-0000-0000-${hex}`
    const slug = art.author
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const role =
      art.authorRole.toLowerCase().includes('redaktur') ||
      art.authorRole.toLowerCase().includes('editor')
        ? 'editor'
        : 'writer'

    authorMap.set(art.author, {
      id,
      name: art.author,
      slug,
      role,
      bio: `${art.authorRole} di portal berita WartaKita.`,
    })
  }
})

// 3. Prepare Categories
const categoryMap = new Map<string, { id: string; slug: string; name: string; description: string; sortOrder: number }>()
categories.forEach((cat, index) => {
  const hex = (index + 1).toString(16).padStart(12, '0')
  const id = `10000000-0000-0000-0000-${hex}`
  categoryMap.set(cat.slug, {
    id,
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
    sortOrder: index + 1,
  })
})

// 4. Prepare Tags
const uniqueTagNames = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()
const tagMap = new Map<string, { id: string; name: string; slug: string }>()
uniqueTagNames.forEach((tagName, index) => {
  const hex = (index + 1).toString(16).padStart(12, '0')
  const id = `30000000-0000-0000-0000-${hex}`
  const slug = tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  tagMap.set(tagName, { id, name: tagName, slug })
})

// 5. Generate SQL statements
const sqlStatements: string[] = []

sqlStatements.push('-- WartaKita Seed Data')
sqlStatements.push('-- Generated automatically from lib/news.ts')
sqlStatements.push('BEGIN;\n')

// Auth users and Profiles
sqlStatements.push('-- 1. Profiles & Auth Users')
authorMap.forEach((author) => {
  const email = `${author.slug}@wartakita.my.id`
  sqlStatements.push(`
INSERT INTO auth.users (id, email, created_at)
VALUES ('${author.id}', '${email}', now())
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO public.profiles (id, display_name, slug, bio, role, is_active)
VALUES ('${author.id}', ${sqlQuote(author.name)}, ${sqlQuote(author.slug)}, ${sqlQuote(author.bio)}, '${author.role}', true)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  slug = EXCLUDED.slug,
  bio = EXCLUDED.bio,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;
`)
})

// Categories
sqlStatements.push('\n-- 2. Categories')
categoryMap.forEach((cat) => {
  const seoTitle = `${cat.name} | Berita Terkini WartaKita`
  const seoDesc = cat.description
  sqlStatements.push(`
INSERT INTO public.categories (id, slug, name, description, sort_order, is_active, seo_title, seo_description)
VALUES ('${cat.id}', ${sqlQuote(cat.slug)}, ${sqlQuote(cat.name)}, ${sqlQuote(cat.description)}, ${cat.sortOrder}, true, ${sqlQuote(seoTitle)}, ${sqlQuote(seoDesc)})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;
`)
})

// Tags
sqlStatements.push('\n-- 3. Tags')
tagMap.forEach((tag) => {
  sqlStatements.push(`
INSERT INTO public.tags (id, slug, name)
VALUES ('${tag.id}', ${sqlQuote(tag.slug)}, ${sqlQuote(tag.name)})
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
`)
})

// Articles & Article Tags
sqlStatements.push('\n-- 4. Articles & Article Tags')
articles.forEach((art, index) => {
  const hex = (index + 1).toString(16).padStart(12, '0')
  const articleId = `20000000-0000-0000-0000-${hex}`
  const cat = categoryMap.get(art.category)
  const author = authorMap.get(art.author)

  if (!cat || !author) {
    throw new Error(`Data relasi tidak ditemukan untuk artikel: ${art.slug}`)
  }

  const bodyHtml = art.body.map((p) => `<p>${p}</p>`).join('\n')
  const bodyJsonStr = JSON.stringify(art.body)
  const seoTitle = `${art.title} | WartaKita`

  sqlStatements.push(`
INSERT INTO public.articles (
  id, slug, title, excerpt, body_json, body_html, status,
  category_id, province, author_id,
  cover_path, cover_alt, cover_caption, cover_credit,
  seo_title, seo_description, published_at, reading_minutes, view_count, is_demo
) VALUES (
  '${articleId}',
  ${sqlQuote(art.slug)},
  ${sqlQuote(art.title)},
  ${sqlQuote(art.excerpt)},
  ${sqlQuote(bodyJsonStr)}::jsonb,
  ${sqlDollar(bodyHtml)},
  'published',
  '${cat.id}',
  ${sqlQuote(art.province ?? null)},
  '${author.id}',
  ${sqlQuote(art.image)},
  ${sqlQuote(art.imageAlt)},
  ${sqlQuote(art.imageCaption)},
  'Dok. Redaksi WartaKita',
  ${sqlQuote(seoTitle)},
  ${sqlQuote(art.excerpt)},
  ${sqlQuote(art.publishedAt)},
  ${art.readingMinutes},
  ${art.views},
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
`)

  // Article tags
  art.tags.forEach((tagName) => {
    const t = tagMap.get(tagName)
    if (t) {
      sqlStatements.push(`
INSERT INTO public.article_tags (article_id, tag_id)
VALUES ('${articleId}', '${t.id}')
ON CONFLICT (article_id, tag_id) DO NOTHING;
`)
    }
  })
})

// Breaking news
sqlStatements.push('\n-- 5. Breaking News')
breakingNews.forEach((text, index) => {
  const hex = (index + 1).toString(16).padStart(12, '0')
  const breakingId = `40000000-0000-0000-0000-${hex}`
  const href = `/berita/${articles[index % articles.length]?.slug || ''}`
  sqlStatements.push(`
INSERT INTO public.breaking_news (id, text, href, starts_at, is_active)
VALUES ('${breakingId}', ${sqlQuote(text)}, ${sqlQuote(href)}, now() - interval '${index} hours', true)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, href = EXCLUDED.href, is_active = EXCLUDED.is_active;
`)
})

// Featured slots
sqlStatements.push('\n-- 6. Featured Slots')
sqlStatements.push(`
INSERT INTO public.featured_slots (slot_key, position, article_id)
VALUES
  ('homepage-hero', 1, '20000000-0000-0000-0000-000000000001'),
  ('homepage-hero', 2, '20000000-0000-0000-0000-000000000002'),
  ('homepage-hero', 3, '20000000-0000-0000-0000-000000000003')
ON CONFLICT (slot_key, position) DO UPDATE SET article_id = EXCLUDED.article_id;
`)

// Site settings
sqlStatements.push('\n-- 7. Site Settings')
sqlStatements.push(`
INSERT INTO public.site_settings (key, value)
VALUES
  ('site_name', '"WartaKita"'::jsonb),
  ('tagline', '"Kabar Terpercaya, Dekat dengan Kita"'::jsonb),
  ('contact_email', '"redaksi@wartakita.my.id"'::jsonb),
  ('site_url', '"https://wartakita.my.id"'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
`)

sqlStatements.push('COMMIT;\n')

const fullSql = sqlStatements.join('\n')

// 6. Write to supabase/seed.sql
const seedFilePath = path.join(process.cwd(), 'supabase', 'seed.sql')
fs.writeFileSync(seedFilePath, fullSql, 'utf-8')
console.log(`[Seed] Berkas ${seedFilePath} berhasil diperbarui (${(fullSql.length / 1024).toFixed(1)} KB).`)

// 7. Execute against local Postgres if running
try {
  const pgPort = process.env.PGPORT || '54322'
  const pgHost = process.env.PGHOST || '127.0.0.1'
  const pgUser = process.env.PGUSER || 'postgres'
  const pgDb = process.env.PGDATABASE || 'postgres'

  console.log(`[Seed] Mengaplikasikan seed ke PostgreSQL lokal (${pgHost}:${pgPort}/${pgDb})...`)
  execFileSync('psql', ['-h', pgHost, '-p', pgPort, '-U', pgUser, '-d', pgDb, '-f', seedFilePath], {
    stdio: 'inherit',
  })
  console.log('[Seed] Seed data berhasil diaplikasikan ke database!')
} catch (err: unknown) {
  console.warn('[Seed] Peringatan: Tidak dapat mengeksekusi langsung via psql lokal (mungkin database offline):', (err as Error).message)
  console.log('[Seed] Anda dapat mengeksekusi supabase/seed.sql secara manual via Supabase CLI (supabase db reset) atau psql.')
}
