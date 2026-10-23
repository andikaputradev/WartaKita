'use client'

import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { breakingNews } from '@/lib/news'

export function BreakingTicker() {
  const [isPlaying, setIsPlaying] = useState(true)
  const items = [...breakingNews, ...breakingNews]

  function togglePlay() {
    setIsPlaying((prev) => !prev)
  }

  return (
    <div
      className="border-b border-primary/80 bg-primary text-primary-foreground"
      role="region"
      aria-label="Berita terkini"
    >
      <div className="mx-auto flex max-w-[1160px] items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-highlight px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-highlight-foreground sm:px-4">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
          Terkini
        </div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Jeda berita berjalan' : 'Putar berita berjalan'}
          className="flex shrink-0 items-center justify-center px-2.5 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
        >
          {isPlaying ? (
            <Pause className="size-3.5" aria-hidden="true" />
          ) : (
            <Play className="size-3.5" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isPlaying ? 'Jeda animasi berita' : 'Lanjutkan animasi berita'}
          </span>
        </button>

        <div className="group relative flex-1 overflow-hidden">
          <ul
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            className="flex w-max animate-marquee items-center py-1.5 motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          >
            {items.map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="flex items-center whitespace-nowrap px-6 text-xs font-medium text-primary-foreground/90"
                aria-hidden={i >= breakingNews.length ? 'true' : undefined}
              >
                <span className="mr-6 size-1 rounded-full bg-highlight" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
