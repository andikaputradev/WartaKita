import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import type { Article, CategorySlug } from '@/lib/news'
import { SectionHeading } from './section-heading'
import { CategoryLabel } from './category-label'
import { RelativeTime } from './relative-time'

export function ChannelBlock({
  category,
  title,
  href,
  articles,
}: {
  category: CategorySlug
  title: string
  href: string
  articles: Article[]
}) {
  if (articles.length === 0) return null

  const mainArticle = articles[0]
  const briefArticles = articles.slice(1, 4)

  if (!mainArticle) return null

  return (
    <section aria-labelledby={`heading-kanal-${category}`} className="flex flex-col">
      <SectionHeading
        title={title}
        id={`heading-kanal-${category}`}
        href={href}
        linkLabel="Lihat Semua"
      />

      <div className="grid gap-6 md:grid-cols-12 md:gap-6">
        {/* 1 Large Article: 7 cols */}
        <div className="md:col-span-7">
          <article className="group relative flex flex-col">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted">
              <Image
                src={mainArticle.image}
                alt={mainArticle.imageAlt}
                fill
                sizes="(min-width: 1024px) 450px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 z-10">
                <CategoryLabel slug={mainArticle.category} variant="solid" />
              </div>
            </div>
            <div className="pt-2.5">
              <RelativeTime
                dateString={mainArticle.publishedAt}
                className="text-xs text-muted-foreground"
              />
              <h3 className="mt-1 text-lg sm:text-xl font-bold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
                <Link href={`/berita/${mainArticle.slug}`} className="after:absolute after:inset-0">
                  {mainArticle.title}
                </Link>
              </h3>
              <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {mainArticle.excerpt}
              </p>
            </div>
          </article>
        </div>

        {/* 3 Brief Articles: 5 cols */}
        <div className="md:col-span-5 flex flex-col divide-y divide-border">
          {briefArticles.map((article, idx) => (
            <article
              key={article.slug}
              className={`group relative flex gap-3 ${idx === 0 ? 'pb-3' : 'py-3 last:pb-0'}`}
            >
              <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <RelativeTime
                  dateString={article.publishedAt}
                  className="text-[11px] text-muted-foreground"
                />
                <h4 className="mt-0.5 text-xs sm:text-sm font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
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

export function PhotoBlock({ articles }: { articles: Article[] }) {
  const photoArticles = articles.slice(0, 4)
  if (photoArticles.length === 0) return null

  return (
    <section aria-labelledby="heading-galeri-foto" className="rounded-sm border border-border bg-surface p-4 sm:p-6 my-4">
      <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
        <h2 id="heading-galeri-foto" className="text-xl font-bold text-primary flex items-center gap-2">
          <Camera className="size-5 text-highlight" aria-hidden="true" />
          Fokus Lensa & Foto WartaKita
        </h2>
        <span className="text-xs font-semibold text-muted-foreground">Galeri Visual</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {photoArticles.map((article) => (
          <article key={article.slug} className="group relative flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-sm bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                <Camera className="size-3" aria-hidden="true" />
                <span>Foto</span>
              </div>
            </div>
            <h3 className="mt-2 text-xs sm:text-sm font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4 line-clamp-2">
              <Link href={`/berita/${article.slug}`} className="after:absolute after:inset-0">
                {article.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}
