import {
  articles,
  categories,
  formatShortDate,
  getArticlesByCategory,
  sortByDate,
} from '@/lib/news'
import { HeadlineBlock } from '@/components/news/headline-block'
import { NewsFeed } from '@/components/news/news-feed'
import { NewsSidebar } from '@/components/news/news-sidebar'
import { ChannelBlock, PhotoBlock } from '@/components/news/channel-block'
import { RegionalNews, type RegionalItem } from '@/components/news/regional-news'
import { Newsletter } from '@/components/news/newsletter'

export default function HomePage() {
  const sorted = sortByDate(articles)
  const nonRegional = sorted.filter((a) => a.category !== 'daerah')

  const headlineArticle = nonRegional[0] ?? articles[0]!
  const briefArticles = nonRegional.slice(1, 6)
  const feedArticles = sorted.slice(0, 8)

  const regionalItems: RegionalItem[] = getArticlesByCategory('daerah').map((a) => ({
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
      articles: getArticlesByCategory(c.slug),
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
              title="Berita Terkini Hari Ini"
            />

            {/* Photo Gallery Block */}
            <PhotoBlock articles={sorted.slice(0, 4)} />

            {/* Channel Blocks */}
            <div className="flex flex-col gap-10">
              {featuredChannels.slice(0, 3).map((block) => (
                <ChannelBlock
                  key={block.category}
                  category={block.category}
                  title={block.title}
                  href={block.href}
                  articles={block.articles}
                />
              ))}
            </div>
          </div>

          {/* Sidebar Column: Fixed 300px width on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
            <NewsSidebar />
          </div>
        </div>
      </div>

      {/* 3. Regional News Section */}
      <RegionalNews items={regionalItems} />

      {/* 4. Additional Channel Blocks */}
      {featuredChannels.length > 3 && (
        <div className="mx-auto w-full max-w-[1160px] px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {featuredChannels.slice(3).map((block) => (
              <ChannelBlock
                key={block.category}
                category={block.category}
                title={block.title}
                href={block.href}
                articles={block.articles}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. Newsletter Section */}
      <Newsletter />
    </div>
  )
}
