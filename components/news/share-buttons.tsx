'use client'

import { useState } from 'react'
import { Check, Link2, Send, MessageCircle } from 'lucide-react'
import { SITE_URL } from '@/lib/news'

const ARTICLE_SHARE_BASE = 'https://nusantaranewsidn.com'

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5V12h2.8v9.8H14V12h2.8l.4-3.5H14Z" />
    </svg>
  )
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.8 2.5h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.2l7.3-8.3L1.9 2.5h6.4l4.4 5.9 5.1-5.9Zm-1.1 16.5h1.7L7.4 4.3H5.6L16.7 19Z" />
    </svg>
  )
}

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false)
  // Always share the canonical production URL, never localhost or a Supabase endpoint.
  const url = `${ARTICLE_SHARE_BASE}${path}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: 'X', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: 'Telegram', icon: Send, href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
  ]

  async function copyLink() {
    const link = typeof window !== 'undefined' ? window.location.href : url
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Bagikan</span>
      {targets.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Bagikan ke ${label}`}
          className="flex size-9 items-center justify-center border border-border text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="flex h-9 items-center gap-1.5 border border-border px-3 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Tersalin' : 'Salin tautan'}</span>
      </button>
    </div>
  )
}
