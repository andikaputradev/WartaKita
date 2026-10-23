import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/news'
import { CategoryLabel } from './category-label'
import { RelativeTime } from './relative-time'

export function HeadlineBlock({
  headline,
  briefs,
}: {
  headline: Article
  briefs: Article[]
}) {
  const headlineHref = `/berita/${headline.slug}`

  return (
    <section aria-labelledby="heading-berita-utama" className="border-b border-border pb-8">
      <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
        <h2 id="heading-berita-utama" className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-highlight inline-block" aria-hidden="true" />
          Berita Utama
        </h2>
        <span className="text-xs font-medium text-muted-foreground">Fokus Hari Ini</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Main Headline: 7 cols on lg */}
        <div className="lg:col-span-7 flex flex-col">
          <article className="group relative flex flex-col">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-muted">
              <Image
                src={headline.image}
                alt={headline.imageAlt}
                fill
                priority
                sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3 z-10">
                <CategoryLabel slug={headline.category} variant="solid" />
              </div>
            </div>

            <div className="pt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RelativeTime dateString={headline.publishedAt} />
                {headline.province && (
                  <>
                    <span className="text-border" aria-hidden="true">•</span>
                    <span>{headline.province}</span>
                  </>
                )}
                <span className="text-border" aria-hidden="true">•</span>
                <span>Oleh {headline.author}</span>
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                <Link href={headlineHref} className="after:absolute after:inset-0">
                  {headline.title}
                </Link>
              </h1>

              <p className="mt-2 line-clamp-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {headline.excerpt}
              </p>
            </div>
          </article>
        </div>

        {/* 4 to 5 Brief News with small thumbnails: 5 cols on lg */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-border">
          {briefs.slice(0, 5).map((article, idx) => (
            <article
              key={article.slug}
              className={`group relative flex gap-3 ${idx === 0 ? 'pb-3' : 'py-3.5 last:pb-0'}`}
            >
              <div className="relative aspect-[4/3] w-24 sm:w-28 shrink-0 overflow-hidden rounded-sm bg-muted">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <CategoryLabel slug={article.category} />
                  <span className="text-border" aria-hidden="true">•</span>
                  <RelativeTime
                    dateString={article.publishedAt}
                    className="text-xs text-muted-foreground"
                  />
                </div>
                <h4 className="mt-1 text-sm sm:text-[15px] font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                  <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title}
                  </Link>
                </h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
