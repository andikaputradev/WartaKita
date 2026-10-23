import { formatShortDate } from '@/lib/news'
import {
  getPublishedArticles,
  getCategories,
  getPopularArticles,
  getEditorialPicks,
} from '@/lib/data'
import { HeadlineBlock } from '@/components/news/headline-block'
import { NewsFeed } from '@/components/news/news-feed'
import { NewsSidebar } from '@/components/news/news-sidebar'
import { ChannelBlock, PhotoBlock } from '@/components/news/channel-block'
import { RegionalNews, type RegionalItem } from '@/components/news/regional-news'
import { Newsletter } from '@/components/news/newsletter'

export default async function HomePage() {
  const [{ articles }, categories, popularArticles, editorialPicks] = await Promise.all([
    getPublishedArticles({ limit: 50 }),
    getCategories(),
    getPopularArticles(6),
    getEditorialPicks(3),
  ])

  const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const nonRegional = sorted.filter((a) => a.category !== 'daerah')

  const headlineArticle = nonRegional[0] ?? sorted[0]!
  const briefArticles = nonRegional.slice(1, 6)
  const feedArticles = sorted.slice(0, 8)

  const regionalItems: RegionalItem[] = sorted
    .filter((a) => a.category === 'daerah')
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      province: a.province ?? 'Indonesia',
      image: a.image,
      imageAlt: a.imageAlt,
      publishedAt: a.publishedAt,
      dateLabel: formatShortDate(a.publishedAt),
    }))

  const featuredChannels = categories
    .filter((c) => c.slug !== 'daerah')
    .map((c) => ({
      category: c.slug,
      title: c.name,
      href: `/kategori/${c.slug}`,
      articles: sorted.filter((a) => a.category === c.slug),
    }))
    .filter((block) => block.articles.length > 0)

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {/* 1. Headline Block (1 Main 16:9 + 5 Briefs) */}
      <div className="mx-auto w-full max-w-[1160px] px-4 pt-4 md:pt-6">
        <HeadlineBlock headline={headlineArticle} briefs={briefArticles} />
      </div>

      {/* 2. Main Content Grid: Left 8 cols (NewsFeed & Channels) vs Right 4 cols (Sidebar) */}
      <div className="mx-auto w-full max-w-[1160px] px-4">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Chronological NewsFeed with Real Links Pagination */}
            <NewsFeed
              articles={feedArticles}
              currentPage={1}
              totalPages={3}
              basePath="/cari"
            />

            {/* Berita Daerah Grid (Pola Kanal Regional) */}
            {regionalItems.length > 0 && <RegionalNews items={regionalItems} />}

            {/* Featured Channel Blocks (Grid & List ala portal berita) */}
            <div className="flex flex-col gap-8">
              {featuredChannels.map((block) => (
                <ChannelBlock
                  key={block.category}
                  title={block.title}
                  category={block.category}
                  href={block.href}
                  articles={block.articles}
                />
              ))}
            </div>

            {/* Photo Gallery Grid */}
            <PhotoBlock
              articles={sorted.slice(0, 4)}
            />
          </div>

          {/* Right Sidebar (Sticky on lg) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-8">
              <NewsSidebar
                popularArticles={popularArticles}
                editorialPicks={editorialPicks}
              />
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
