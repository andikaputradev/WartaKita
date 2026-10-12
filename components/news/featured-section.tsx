import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/news'
import { ArticleCard, Timestamp } from './article-card'
import { CategoryLabel } from './category-label'

export function FeaturedSection({ main, secondary }: { main: Article; secondary: Article[] }) {
  return (
    <section aria-labelledby="judul-utama" className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <article className="group relative lg:col-span-2">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-[16/9]">
          <Image
            src={main.image}
            alt={main.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <div className="flex items-center gap-3">
              <span className="bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                Berita Utama
              </span>
              <CategoryLabel slug={main.category} variant="solid" />
            </div>
            <h1
              id="judul-utama"
              className="mt-3 max-w-3xl font-serif text-2xl font-bold leading-tight text-white text-balance md:text-4xl lg:text-[2.6rem]"
            >
              <Link href={`/berita/${main.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-8">
                {main.title}
              </Link>
            </h1>
            <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/85 md:block md:text-base">
              {main.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-white/75">
              <span className="font-semibold text-white">{main.author}</span>
              <span aria-hidden="true">·</span>
              <Timestamp iso={main.publishedAt} className="text-white/75" />
            </div>
          </div>
        </div>
      </article>

      <div className="flex flex-col divide-y divide-border">
        {secondary.map((article, i) => (
          <div key={article.slug} className={i === 0 ? 'pb-5' : 'py-5 last:pb-0'}>
            {i === 0 ? (
              <ArticleCard article={article} priority />
            ) : (
              <ArticleCard article={article} variant="compact" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
