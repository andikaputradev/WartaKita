import Link from 'next/link'
import { Eye, TrendingUp } from 'lucide-react'
import { formatViews, getPopularArticles, trendingTopics } from '@/lib/news'
import { SectionHeading } from './section-heading'
import { CategoryLabel } from './category-label'
import { AdSlot } from './ad-slot'

export function NewsSidebar({ excludeSlug }: { excludeSlug?: string }) {
  const popular = getPopularArticles(6)
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, 5)

  return (
    <aside className="flex flex-col gap-10" aria-label="Sorotan">
      <section aria-labelledby="judul-terpopuler">
        <SectionHeading title="Terpopuler" id="judul-terpopuler" as="h2" />
        <ol className="flex flex-col divide-y divide-border">
          {popular.map((article, i) => (
            <li key={article.slug} className="group relative flex gap-4 py-4 first:pt-0">
              <span
                className="w-8 shrink-0 font-serif text-4xl font-bold leading-none text-primary/15 transition-colors group-hover:text-highlight"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <CategoryLabel slug={article.category} />
                <h3 className="mt-1 font-serif text-[15px] font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                  <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="size-3" aria-hidden="true" />
                  {formatViews(article.views)} kali dibaca
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="judul-trending" className="bg-secondary p-5">
        <h2 id="judul-trending" className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
          <TrendingUp className="size-5 text-highlight" aria-hidden="true" />
          Topik Trending
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <li key={topic}>
              <Link
                href={`/cari?q=${encodeURIComponent(topic)}`}
                className="inline-block border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                #{topic.replace(/\s+/g, '')}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot className="w-full" />
    </aside>
  )
}
