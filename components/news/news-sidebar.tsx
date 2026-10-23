import Image from 'next/image'
import Link from 'next/link'
import { Award, Eye, Hash, TrendingUp } from 'lucide-react'
import { formatViews, getEditorialPicks, getPopularArticles, trendingTopics } from '@/lib/news'
import type { DomainArticle } from '@/lib/data/types'
import { CategoryLabel } from './category-label'
import { RelativeTime } from './relative-time'
import { AdSlot } from './ad-slot'

export function NewsSidebar({
  excludeSlug,
  popularArticles,
  editorialPicks,
}: {
  excludeSlug?: string
  popularArticles?: DomainArticle[]
  editorialPicks?: DomainArticle[]
}) {
  const popular = (popularArticles ?? getPopularArticles(6))
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, 5)

  const editorial = (editorialPicks ?? getEditorialPicks(3)).filter((a) => a.slug !== excludeSlug)

  return (
    <aside className="flex flex-col gap-8 w-full" aria-label="Kolom samping berita">
      {/* 1. Berita Terpopuler 1 sampai 5 */}
      <section id="terpopuler" aria-labelledby="judul-terpopuler" className="border-b border-border pb-6">
        <div className="flex items-center gap-2 border-b-2 border-primary pb-2 mb-4">
          <TrendingUp className="size-5 text-highlight" aria-hidden="true" />
          <h2 id="judul-terpopuler" className="text-lg font-bold text-primary">
            Berita Terpopuler
          </h2>
        </div>

        <ol className="flex flex-col divide-y divide-border">
          {popular.map((article, i) => (
            <li key={article.slug} className="group relative flex gap-3 py-3 first:pt-0">
              <span
                className="w-7 shrink-0 text-3xl font-black leading-none text-primary/20 transition-colors group-hover:text-highlight"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <CategoryLabel slug={article.category} />
                <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                  <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Eye className="size-3" aria-hidden="true" />
                  <span>{formatViews(article.views)} dibaca</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Tag Terpopuler (Trending Topics) */}
      <section aria-labelledby="judul-tag-populer" className="rounded-sm border border-border bg-surface p-4">
        <div className="flex items-center gap-2 border-b border-border pb-2 mb-3">
          <Hash className="size-4 text-primary" aria-hidden="true" />
          <h2 id="judul-tag-populer" className="text-sm font-bold uppercase tracking-wider text-primary">
            Tag Terpopuler
          </h2>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {trendingTopics.map((topic) => (
            <li key={topic}>
              <Link
                href={`/cari?q=${encodeURIComponent(topic)}`}
                className="inline-block rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                #{topic.replace(/\s+/g, '')}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Pilihan Redaksi */}
      <section aria-labelledby="judul-pilihan-redaksi" className="border-b border-border pb-6">
        <div className="flex items-center gap-2 border-b-2 border-primary pb-2 mb-4">
          <Award className="size-5 text-highlight" aria-hidden="true" />
          <h2 id="judul-pilihan-redaksi" className="text-lg font-bold text-primary">
            Pilihan Redaksi
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {editorial.map((article) => (
            <article key={article.slug} className="group relative flex gap-3 py-3 first:pt-0">
              <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-sm bg-muted">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CategoryLabel slug={article.category} />
                  <span className="text-border" aria-hidden="true">•</span>
                  <RelativeTime dateString={article.publishedAt} />
                </div>
                <h3 className="mt-1 text-xs sm:text-sm font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                  <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Slot Iklan 300x250 berdimensi tetap */}
      <div className="flex justify-center w-full">
        <AdSlot width={300} height={250} label="Iklan Sidebar" />
      </div>
    </aside>
  )
}
