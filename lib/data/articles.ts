import { unstable_cache } from 'next/cache'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'
import {
  articles as mockArticles,
  getArticle as getMockArticle,
  getArticlesByCategory as getMockArticlesByCategory,
  getPopularArticles as getMockPopularArticles,
  getEditorialPicks as getMockEditorialPicks,
  getRelatedArticles as getMockRelatedArticles,
  searchArticles as searchMockArticles,
  type CategorySlug,
} from '@/lib/news'
import {
  ArticleSlugSchema,
  CategorySlugSchema,
  SearchQuerySchema,
  PaginationQuerySchema,
  type DomainArticle,
  type PaginationQuery,
} from './types'

interface RawArticleRow {
  id: string
  slug: string
  title: string
  excerpt: string
  body_json: unknown
  body_html: string
  status: string
  province: string | null
  cover_path: string
  cover_alt: string
  cover_caption: string | null
  cover_credit: string | null
  seo_title: string | null
  seo_description: string | null
  canonical_override: string | null
  noindex: boolean
  og_image_path: string | null
  published_at: string | null
  updated_at: string
  reading_minutes: number
  view_count: number
  is_demo: boolean
  category: { id: string; slug: string; name: string } | null
  author: { id: string; display_name: string; slug: string; role: string; bio: string | null } | null
  article_tags: Array<{ tag: { id: string; slug: string; name: string } | null }> | null
}

function mapRowToDomainArticle(row: RawArticleRow): DomainArticle {
  let bodyLines: string[] = []
  if (Array.isArray(row.body_json) && row.body_json.every((item) => typeof item === 'string')) {
    bodyLines = row.body_json as string[]
  } else if (row.body_html) {
    bodyLines = row.body_html
      .replace(/<p>/gi, '')
      .split('</p>')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
  }

  const roleDisplay =
    row.author?.role === 'admin'
      ? 'Redaktur Utama'
      : row.author?.role === 'editor'
        ? 'Redaktur'
        : 'Jurnalis'

  const tags = (row.article_tags ?? [])
    .map((item) => item.tag?.name)
    .filter((name): name is string => typeof name === 'string')

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: (row.category?.slug ?? 'nasional') as CategorySlug,
    categoryName: row.category?.name,
    province: row.province ?? undefined,
    author: row.author?.display_name ?? 'Redaksi WartaKita',
    authorRole: roleDisplay,
    publishedAt: row.published_at ?? row.updated_at,
    readingMinutes: row.reading_minutes,
    image: row.cover_path,
    imageAlt: row.cover_alt,
    imageCaption: row.cover_caption ?? '',
    tags,
    views: Number(row.view_count || 0),
    body: bodyLines,
    bodyHtml: row.body_html,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    canonicalOverride: row.canonical_override ?? undefined,
    noindex: row.noindex,
    ogImagePath: row.og_image_path ?? undefined,
    is_demo: row.is_demo,
  }
}

async function fetchPublishedArticlesFromDB(
  params: PaginationQuery,
): Promise<{ articles: DomainArticle[]; total: number }> {
  if (!isSupabaseServerConfigured()) {
    let filtered = [...mockArticles]
    if (params.categorySlug) {
      filtered = filtered.filter((a) => a.category === params.categorySlug)
    }
    const sliced = filtered.slice(params.offset, params.offset + params.limit)
    return {
      articles: sliced.map((a) => ({ ...a, views: a.views })),
      total: filtered.length,
    }
  }

  try {
    const supabase = await createClient()

    let query = supabase
      .from('articles')
      .select(
        `
        id,
        slug,
        title,
        excerpt,
        body_json,
        body_html,
        status,
        province,
        cover_path,
        cover_alt,
        cover_caption,
        cover_credit,
        seo_title,
        seo_description,
        canonical_override,
        noindex,
        og_image_path,
        published_at,
        updated_at,
        reading_minutes,
        view_count,
        is_demo,
        category:categories(id, slug, name),
        author:profiles(id, display_name, slug, role, bio),
        article_tags(tag:tags(id, slug, name))
      `,
        { count: 'exact' },
      )
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (params.categorySlug) {
      // Find category id first
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', params.categorySlug)
        .maybeSingle()

      if (cat) {
        query = query.eq('category_id', cat.id)
      } else {
        return { articles: [], total: 0 }
      }
    }

    const { data, count, error } = await query.range(params.offset, params.offset + params.limit - 1)

    if (error || !data) {
      console.warn('[Data Layer: articles] Query error, falling back to mock:', error?.message)
      const sliced = mockArticles.slice(params.offset, params.offset + params.limit)
      return { articles: sliced, total: mockArticles.length }
    }

    const domainArticles = (data as unknown as RawArticleRow[]).map(mapRowToDomainArticle)
    return { articles: domainArticles, total: count ?? domainArticles.length }
  } catch (err) {
    console.warn('[Data Layer: articles] Unexpected error, falling back:', err)
    const sliced = mockArticles.slice(params.offset, params.offset + params.limit)
    return { articles: sliced, total: mockArticles.length }
  }
}

export async function getPublishedArticles(
  rawParams?: Partial<PaginationQuery>,
): Promise<{ articles: DomainArticle[]; total: number }> {
  const parsed = PaginationQuerySchema.parse(rawParams ?? {})
  const cacheKey = `articles-${parsed.limit}-${parsed.offset}-${parsed.categorySlug ?? 'all'}-${parsed.tagSlug ?? 'all'}`

  const tags = ['articles']
  if (parsed.categorySlug) {
    tags.push(`category:${parsed.categorySlug}`)
  }

  const cachedFn = unstable_cache(
    async () => fetchPublishedArticlesFromDB(parsed),
    [cacheKey],
    {
      revalidate: 60,
      tags,
    },
  )

  return cachedFn()
}

async function fetchArticleBySlugFromDB(slug: string): Promise<DomainArticle | null> {
  if (!isSupabaseServerConfigured()) {
    const mock = getMockArticle(slug)
    return mock ? { ...mock, views: mock.views } : null
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        id,
        slug,
        title,
        excerpt,
        body_json,
        body_html,
        status,
        province,
        cover_path,
        cover_alt,
        cover_caption,
        cover_credit,
        seo_title,
        seo_description,
        canonical_override,
        noindex,
        og_image_path,
        published_at,
        updated_at,
        reading_minutes,
        view_count,
        is_demo,
        category:categories(id, slug, name),
        author:profiles(id, display_name, slug, role, bio),
        article_tags(tag:tags(id, slug, name))
      `,
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (error || !data) {
      if (error) {
        console.warn('[Data Layer: articleBySlug] Error, using fallback:', error.message)
      }
      const mock = getMockArticle(slug)
      return mock ? { ...mock, views: mock.views } : null
    }

    return mapRowToDomainArticle(data as unknown as RawArticleRow)
  } catch (err) {
    console.warn('[Data Layer: articleBySlug] Unexpected error, using fallback:', err)
    const mock = getMockArticle(slug)
    return mock ? { ...mock, views: mock.views } : null
  }
}

export async function getArticleBySlug(rawSlug: string): Promise<DomainArticle | null> {
  const parseResult = ArticleSlugSchema.safeParse(rawSlug)
  if (!parseResult.success) {
    return null
  }
  const slug = parseResult.data

  const cachedFn = unstable_cache(
    async () => fetchArticleBySlugFromDB(slug),
    [`article-detail-${slug}`],
    {
      revalidate: 60,
      tags: ['articles', `article:${slug}`],
    },
  )

  return cachedFn()
}

export async function getArticlesByCategorySlug(
  rawCategorySlug: string,
  limit = 10,
): Promise<DomainArticle[]> {
  const parseResult = CategorySlugSchema.safeParse(rawCategorySlug)
  if (!parseResult.success) {
    return []
  }
  const categorySlug = parseResult.data

  const res = await getPublishedArticles({
    categorySlug,
    limit,
    offset: 0,
  })
  return res.articles
}

export async function getPopularArticles(limit = 5): Promise<DomainArticle[]> {
  if (!isSupabaseServerConfigured()) {
    return getMockPopularArticles(limit).map((a) => ({ ...a, views: a.views }))
  }

  const cachedFn = unstable_cache(
    async () => {
      try {
        const supabase = await createClient()
        const { data, error } = await supabase
          .from('articles')
          .select(
            `
            id,
            slug,
            title,
            excerpt,
            body_json,
            body_html,
            status,
            province,
            cover_path,
            cover_alt,
            cover_caption,
            cover_credit,
            seo_title,
            seo_description,
            canonical_override,
            noindex,
            og_image_path,
            published_at,
            updated_at,
            reading_minutes,
            view_count,
            is_demo,
            category:categories(id, slug, name),
            author:profiles(id, display_name, slug, role, bio),
            article_tags(tag:tags(id, slug, name))
          `,
          )
          .eq('status', 'published')
          .order('view_count', { ascending: false })
          .limit(limit)

        if (error || !data || data.length === 0) {
          return getMockPopularArticles(limit).map((a) => ({ ...a, views: a.views }))
        }
        return (data as unknown as RawArticleRow[]).map(mapRowToDomainArticle)
      } catch {
        return getMockPopularArticles(limit).map((a) => ({ ...a, views: a.views }))
      }
    },
    [`popular-articles-${limit}`],
    {
      revalidate: 60,
      tags: ['articles', 'popular'],
    },
  )

  return cachedFn()
}

export async function getEditorialPicks(limit = 3): Promise<DomainArticle[]> {
  if (!isSupabaseServerConfigured()) {
    return getMockEditorialPicks(limit).map((a) => ({ ...a, views: a.views }))
  }

  const cachedFn = unstable_cache(
    async () => {
      try {
        const supabase = await createClient()
        const { data, error } = await supabase
          .from('articles')
          .select(
            `
            id,
            slug,
            title,
            excerpt,
            body_json,
            body_html,
            status,
            province,
            cover_path,
            cover_alt,
            cover_caption,
            cover_credit,
            seo_title,
            seo_description,
            canonical_override,
            noindex,
            og_image_path,
            published_at,
            updated_at,
            reading_minutes,
            view_count,
            is_demo,
            category:categories(id, slug, name),
            author:profiles(id, display_name, slug, role, bio),
            article_tags(tag:tags(id, slug, name))
          `,
          )
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(limit)

        if (error || !data || data.length === 0) {
          return getMockEditorialPicks(limit).map((a) => ({ ...a, views: a.views }))
        }
        return (data as unknown as RawArticleRow[]).map(mapRowToDomainArticle)
      } catch {
        return getMockEditorialPicks(limit).map((a) => ({ ...a, views: a.views }))
      }
    },
    [`editorial-picks-${limit}`],
    {
      revalidate: 60,
      tags: ['articles', 'editorial'],
    },
  )

  return cachedFn()
}

export async function getRelatedArticles(
  article: DomainArticle,
  limit = 3,
): Promise<DomainArticle[]> {
  const res = await getArticlesByCategorySlug(article.category, limit + 1)
  const filtered = res.filter((a) => a.slug !== article.slug).slice(0, limit)
  if (filtered.length >= limit) {
    return filtered
  }
  const fallbackMock = getMockRelatedArticles(article, limit)
  return fallbackMock.map((a) => ({ ...a, views: a.views }))
}

export async function searchArticlesInDB(
  rawQuery: string,
  limit = 20,
): Promise<DomainArticle[]> {
  const parseResult = SearchQuerySchema.safeParse(rawQuery)
  if (!parseResult.success) {
    return []
  }
  const query = parseResult.data

  if (!isSupabaseServerConfigured()) {
    return searchMockArticles(query).slice(0, limit)
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        id,
        slug,
        title,
        excerpt,
        body_json,
        body_html,
        status,
        province,
        cover_path,
        cover_alt,
        cover_caption,
        cover_credit,
        seo_title,
        seo_description,
        canonical_override,
        noindex,
        og_image_path,
        published_at,
        updated_at,
        reading_minutes,
        view_count,
        is_demo,
        category:categories(id, slug, name),
        author:profiles(id, display_name, slug, role, bio),
        article_tags(tag:tags(id, slug, name))
      `,
      )
      .eq('status', 'published')
      .textSearch('search', query, { config: 'indonesian', type: 'websearch' })
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('[Data Layer: search] Search query error, using fallback:', error.message)
      }
      return searchMockArticles(query).slice(0, limit)
    }

    return (data as unknown as RawArticleRow[]).map(mapRowToDomainArticle)
  } catch (err) {
    console.warn('[Data Layer: search] Unexpected error, using fallback:', err)
    return searchMockArticles(query).slice(0, limit)
  }
}
