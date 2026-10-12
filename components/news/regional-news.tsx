'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RegionalItem {
  slug: string
  title: string
  province: string
  image: string
  imageAlt: string
  publishedAt: string
  dateLabel: string
}

const ALL = 'Semua Provinsi'

export function RegionalNews({ items }: { items: RegionalItem[] }) {
  const provinces = [ALL, ...Array.from(new Set(items.map((a) => a.province)))]
  const [active, setActive] = useState(ALL)
  const visible = active === ALL ? items : items.filter((a) => a.province === active)

  return (
    <section aria-labelledby="judul-daerah" className="bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-1 border-b border-white/20 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">Dari Sabang sampai Merauke</p>
            <h2 id="judul-daerah" className="mt-1 font-serif text-2xl font-bold md:text-3xl">
              Kabar Daerah
            </h2>
          </div>
          <Link
            href="/kategori/daerah"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white"
          >
            Semua berita daerah
          </Link>
        </div>

        <div role="group" aria-label="Filter provinsi" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1">
          {provinces.map((province) => (
            <button
              key={province}
              type="button"
              onClick={() => setActive(province)}
              aria-pressed={active === province}
              className={cn(
                'shrink-0 border px-3 py-1.5 text-sm font-medium transition-colors',
                active === province
                  ? 'border-highlight bg-highlight text-highlight-foreground'
                  : 'border-white/25 text-white/85 hover:border-white hover:text-white',
              )}
            >
              {province}
            </button>
          ))}
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((item) => (
            <li key={item.slug}>
              <article className="group relative h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-white/10">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-primary/90 px-2 py-1 text-[11px] font-semibold text-white">
                    <MapPin className="size-3 text-highlight" aria-hidden="true" />
                    {item.province}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-pretty group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                  <Link href={`/berita/${item.slug}`} className="after:absolute after:inset-0">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                  <Clock className="size-3" aria-hidden="true" />
                  <time dateTime={item.publishedAt}>{item.dateLabel}</time>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
