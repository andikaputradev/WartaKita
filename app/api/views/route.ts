import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { z } from 'zod'
import { ArticleSlugSchema } from '@/lib/data/types'
import { isSupabaseServerConfigured, createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const ViewPayloadSchema = z.object({
  slug: ArticleSlugSchema,
})

// In-memory deduplication cache: hash -> expiration timestamp (ms)
const recentViewHashes = new Map<string, number>()
const ONE_HOUR_MS = 60 * 60 * 1000

function cleanupExpiredHashes(now: number) {
  if (recentViewHashes.size > 10000) {
    for (const [hash, expiry] of recentViewHashes.entries()) {
      if (now > expiry) {
        recentViewHashes.delete(hash)
      }
    }
  }
}

const BOT_USER_AGENT_REGEX =
  /bot|spider|crawl|slurp|googlebot|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkshare|w3c_validator|lighthouse/i

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get('user-agent') || ''
    if (!userAgent || BOT_USER_AGENT_REGEX.test(userAgent)) {
      return NextResponse.json({ ok: true, skipped: 'bot' }, { status: 200 })
    }

    const rawBody = await req.json().catch(() => null)
    const parseResult = ViewPayloadSchema.safeParse(rawBody)

    if (!parseResult.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payload', details: parseResult.error.format() },
        { status: 400 },
      )
    }

    const { slug } = parseResult.data

    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0]?.trim() : null) || realIp || '127.0.0.1'

    const hourKey = new Date().toISOString().slice(0, 13) // format: YYYY-MM-DDTHH
    const salt = process.env.VIEW_COUNTER_SALT || 'wartakita-views-salt-2026'

    const hash = crypto
      .createHash('sha256')
      .update(`${clientIp}:${slug}:${hourKey}:${salt}`)
      .digest('hex')

    const now = Date.now()
    cleanupExpiredHashes(now)

    const existingExpiry = recentViewHashes.get(hash)
    if (existingExpiry && now < existingExpiry) {
      return NextResponse.json({ ok: true, skipped: 'deduplicated' }, { status: 200 })
    }

    recentViewHashes.set(hash, now + ONE_HOUR_MS)

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ ok: true, counted: false, mode: 'fallback' }, { status: 200 })
    }

    const supabase = await createClient()
    const { data: updatedViews, error } = await supabase.rpc('increment_article_views', {
      article_slug: slug,
    })

    if (error) {
      console.warn('[View Counter] RPC error:', error.message)
      return NextResponse.json({ ok: true, counted: false, error: error.message }, { status: 200 })
    }

    return NextResponse.json({ ok: true, counted: true, views: updatedViews }, { status: 200 })
  } catch (err) {
    console.warn('[View Counter] Unexpected failure:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
