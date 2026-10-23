import { unstable_cache } from 'next/cache'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'
import { categories as mockCategories, type CategorySlug } from '@/lib/news'
import { CategorySlugSchema, type DomainCategory } from './types'

async function fetchCategoriesFromDB(): Promise<DomainCategory[]> {
  if (!isSupabaseServerConfigured()) {
    return mockCategories.map((c, idx) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      sortOrder: idx + 1,
    }))
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name, description, sort_order, seo_title, seo_description')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('[Data Layer: categories] Supabase query error, using fallback:', error.message)
      }
      return mockCategories.map((c, idx) => ({
        slug: c.slug,
        name: c.name,
        description: c.description,
        sortOrder: idx + 1,
      }))
    }

    return data.map((row) => ({
      id: row.id,
      slug: row.slug as CategorySlug,
      name: row.name,
      description: row.description ?? '',
      sortOrder: row.sort_order,
      seoTitle: row.seo_title ?? undefined,
      seoDescription: row.seo_description ?? undefined,
    }))
  } catch (err) {
    console.warn('[Data Layer: categories] Unexpected failure, using fallback:', err)
    return mockCategories.map((c, idx) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      sortOrder: idx + 1,
    }))
  }
}

export const getCategories = unstable_cache(
  fetchCategoriesFromDB,
  ['categories-list'],
  {
    revalidate: 60,
    tags: ['categories'],
  },
)

export async function getCategoryBySlug(rawSlug: string): Promise<DomainCategory | null> {
  const parseResult = CategorySlugSchema.safeParse(rawSlug)
  if (!parseResult.success) {
    return null
  }
  const slug = parseResult.data

  const all = await getCategories()
  return all.find((c) => c.slug === slug) ?? null
}
