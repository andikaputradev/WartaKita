import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react'
import type { Article } from '@/lib/news'
import { CategoryLabel } from './category-label'
import { RelativeTime } from './relative-time'

interface NewsFeedProps {
  articles: Article[]
  currentPage?: number
  totalPages?: number
  basePath?: string
  title?: string
}

export function NewsFeed({
  articles,
  currentPage = 1,
  totalPages = 1,
  basePath = '/',
  title = 'Berita Terkini',
}: NewsFeedProps) {
  return (
    <section aria-labelledby="heading-news-feed" className="flex flex-col">
      <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
        <h2 id="heading-news-feed" className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-highlight inline-block" aria-hidden="true" />
          {title}
        </h2>
        <Link
          href="/cari"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          <ListFilter className="size-3.5" aria-hidden="true" />
          Indeks Berita
        </Link>
      </div>

      <div className="divide-y divide-border">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group relative flex gap-3 sm:gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <div className="relative aspect-[4/3] w-28 sm:w-36 shrink-0 overflow-hidden rounded-sm bg-muted">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CategoryLabel slug={article.category} />
                <span className="text-border" aria-hidden="true">•</span>
                <RelativeTime dateString={article.publishedAt} />
                {article.province && (
                  <>
                    <span className="hidden sm:inline text-border" aria-hidden="true">•</span>
                    <span className="hidden sm:inline">{article.province}</span>
                  </>
                )}
              </div>

              <h3 className="mt-1 text-base sm:text-lg font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                  {article.title}
                </Link>
              </h3>

              <p className="mt-1 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination as real anchor links */}
      {totalPages > 1 && (
        <nav
          aria-label="Paginasi berita"
          className="mt-8 flex items-center justify-center gap-2 border-t border-border pt-4"
        >
          {currentPage > 1 ? (
            <Link
              href={`${basePath}?page=${currentPage - 1}`}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-sm border border-border bg-background px-3 text-sm font-semibold text-foreground hover:bg-surface hover:text-primary"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Sebelumnya
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-[40px] items-center gap-1 rounded-sm border border-border/50 bg-surface px-3 text-sm text-muted-foreground cursor-not-allowed opacity-60"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Sebelumnya
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isCurrent = page === currentPage
              return (
                <Link
                  key={page}
                  href={`${basePath}?page=${page}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`inline-flex size-10 items-center justify-center rounded-sm text-sm font-semibold transition-colors ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'border border-border bg-background text-foreground hover:bg-surface hover:text-primary'
                  }`}
                >
                  {page}
                </Link>
              )
            })}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`${basePath}?page=${currentPage + 1}`}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-sm border border-border bg-background px-3 text-sm font-semibold text-foreground hover:bg-surface hover:text-primary"
            >
              Berikutnya
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-[40px] items-center gap-1 rounded-sm border border-border/50 bg-surface px-3 text-sm text-muted-foreground cursor-not-allowed opacity-60"
            >
              Berikutnya
              <ChevronRight className="size-4" aria-hidden="true" />
            </span>
          )}
        </nav>
      )}
    </section>
  )
}
