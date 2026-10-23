import { unstable_cache } from 'next/cache'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'
import { breakingNews as mockBreakingNews } from '@/lib/news'
import type { DomainBreakingNews } from './types'

async function fetchBreakingNewsFromDB(): Promise<DomainBreakingNews[]> {
  if (!isSupabaseServerConfigured()) {
    return mockBreakingNews.map((text, idx) => ({
      id: `mock-${idx}`,
      text,
    }))
  }

  try {
    const supabase = await createClient()
    const nowIso = new Date().toISOString()
    const { data, error } = await supabase
      .from('breaking_news')
      .select('id, text, href, starts_at, ends_at')
      .eq('is_active', true)
      .lte('starts_at', nowIso)
      .order('starts_at', { ascending: false })
      .limit(10)

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('[Data Layer: breaking] Supabase error, using fallback:', error.message)
      }
      return mockBreakingNews.map((text, idx) => ({
        id: `mock-${idx}`,
        text,
      }))
    }

    // Filter items whose ends_at has not passed
    const active = data.filter((item) => !item.ends_at || new Date(item.ends_at) > new Date())
    if (active.length === 0) {
      return mockBreakingNews.map((text, idx) => ({
        id: `mock-${idx}`,
        text,
      }))
    }

    return active.map((item) => ({
      id: item.id,
      text: item.text,
      href: item.href ?? undefined,
      startsAt: item.starts_at,
      endsAt: item.ends_at ?? undefined,
    }))
  } catch (err) {
    console.warn('[Data Layer: breaking] Unexpected failure, using fallback:', err)
    return mockBreakingNews.map((text, idx) => ({
      id: `mock-${idx}`,
      text,
    }))
  }
}

export const getBreakingNews = unstable_cache(
  fetchBreakingNewsFromDB,
  ['breaking-news-list'],
  {
    revalidate: 60,
    tags: ['breaking-news'],
  },
)
