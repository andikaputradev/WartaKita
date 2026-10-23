import { articles, categories, formatShortDate, getArticlesByCategory, sortByDate } from '@/lib/news'
import { FeaturedSection } from '@/components/news/featured-section'
import { ArticleCard } from '@/components/news/article-card'
import { SectionHeading } from '@/components/news/section-heading'
import { NewsSidebar } from '@/components/news/news-sidebar'
import { RegionalNews, type RegionalItem } from '@/components/news/regional-news'
import { Newsletter } from '@/components/news/newsletter'

export default function HomePage() {
  const nonRegional = sortByDate(articles.filter((a) => a.category !== 'daerah'))
  const main = nonRegional[0]
  const secondary = nonRegional.slice(1, 4)
  const usedSlugs = new Set(nonRegional.slice(0, 4).map((a) => a.slug))
  const latest = nonRegional.filter((a) => !usedSlugs.has(a.slug)).slice(0, 6)

  const regional: RegionalItem[] = getArticlesByCategory('daerah').map((a) => ({
    slug: a.slug,
    title: a.title,
    province: a.province ?? 'Indonesia',
    image: a.image,
    imageAlt: a.imageAlt,
    publishedAt: a.publishedAt,
    dateLabel: formatShortDate(a.publishedAt),
  }))

  const channelBlocks = categories
    .filter((c) => c.slug !== 'daerah')
    .map((c) => ({ category: c, items: getArticlesByCategory(c.slug).slice(0, 3) }))
    .filter((block) => block.items.length > 0)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 md:pt-8">
        {main && <FeaturedSection main={main} secondary={secondary} />}
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-3 lg:gap-8">
        <section aria-labelledby="judul-terbaru" className="lg:col-span-2">
          <SectionHeading title="Berita Terbaru" id="judul-terbaru" href="/cari?q=" linkLabel="Indeks" />
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {latest.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} showExcerpt />
              </li>
            ))}
          </ul>
        </section>
        <NewsSidebar />
      </div>

      <RegionalNews items={regional} />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {channelBlocks.map(({ category, items }) => (
            <section key={category.slug} aria-labelledby={`kanal-${category.slug}`}>
              <SectionHeading
                title={category.name}
                id={`kanal-${category.slug}`}
                href={`/kategori/${category.slug}`}
                className="mb-4"
              />
              <div className="flex flex-col divide-y divide-border">
                {items.map((article, i) => (
                  <div key={article.slug} className={i === 0 ? 'pb-4' : 'py-4 last:pb-0'}>
                    {i === 0 ? (
                      <ArticleCard article={article} />
                    ) : (
                      <ArticleCard article={article} variant="horizontal" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Newsletter />
    </>
  )
}
