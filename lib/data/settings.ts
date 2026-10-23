import { unstable_cache } from 'next/cache'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'
import type { Json } from '@/lib/supabase/database.types'

async function fetchSiteSettingsFromDB(): Promise<Record<string, Json>> {
  if (!isSupabaseServerConfigured()) {
    return {}
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_settings').select('key, value')

    if (error || !data) {
      return {}
    }

    const settingsMap: Record<string, Json> = {}
    for (const row of data) {
      settingsMap[row.key] = row.value
    }
    return settingsMap
  } catch {
    return {}
  }
}

export const getSiteSettings = unstable_cache(
  fetchSiteSettingsFromDB,
  ['site-settings-map'],
  {
    revalidate: 60,
    tags: ['site-settings'],
  },
)

export async function getSiteSetting<T = unknown>(key: string, defaultValue: T): Promise<T> {
  const settings = await getSiteSettings()
  if (key in settings && settings[key] !== null && settings[key] !== undefined) {
    return settings[key] as T
  }
  return defaultValue
}
