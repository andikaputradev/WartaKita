import { unstable_cache } from 'next/cache'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'

export interface DomainRedirect {
  fromPath: string
  toPath: string
  statusCode: number
}

async function fetchRedirectFromDB(fromPath: string): Promise<DomainRedirect | null> {
  if (!isSupabaseServerConfigured()) {
    return null
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('redirects')
      .select('from_path, to_path, status_code')
      .eq('from_path', fromPath)
      .maybeSingle()

    if (error || !data) {
      return null
    }

    return {
      fromPath: data.from_path,
      toPath: data.to_path,
      statusCode: data.status_code,
    }
  } catch {
    return null
  }
}

export async function getRedirect(fromPath: string): Promise<DomainRedirect | null> {
  const cachedFn = unstable_cache(
    async () => fetchRedirectFromDB(fromPath),
    [`redirect-${fromPath}`],
    {
      revalidate: 60,
      tags: ['redirects'],
    },
  )
  return cachedFn()
}
