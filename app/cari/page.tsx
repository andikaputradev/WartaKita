import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { articles, searchArticles, sortByDate, trendingTopics } from '@/lib/news'
import { ArticleCard, EmptyState } from '@/components/news/article-card'

export const metadata: Metadata = {
  title: 'Cari Berita',
  description: 'Cari berita terkini dari seluruh kanal WartaKita.',
  robots: { index: false },
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? ''
  const results = query ? searchArticles(query) : sortByDate(articles)

  return (
    <div className="mx-auto max-w-[1160px] px-4 py-6 md:py-8">
      <header className="border-b-2 border-primary pb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">
          {query ? 'Hasil pencarian' : 'Indeks berita'}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          {query ? `"${query}"` : 'Semua Berita'}
        </h1>

        <form action="/cari" method="GET" role="search" className="mt-5 flex max-w-xl gap-2">
          <label htmlFor="cari-halaman" className="sr-only">
            Cari berita
          </label>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="cari-halaman"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Cari berita, topik, atau provinsi..."
              className="h-11 w-full rounded-sm border border-input bg-surface pl-9 pr-4 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="h-11 rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Cari
          </button>
        </form>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground" role="status">
          {query ? `${results.length} berita ditemukan` : `${results.length} berita tersedia`}
        </p>
      </header>

      {results.length === 0 ? (
        <div className="py-8">
          <EmptyState
            title="Tidak ada berita yang cocok"
            description={`Tidak ditemukan artikel dengan kata kunci "${query}". Silakan coba kata kunci lain atau pilih topik populer di bawah ini.`}
          />
          <div className="text-center mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Topik Populer
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {trendingTopics.map((topic) => (
                <li key={topic}>
                  <Link
                    href={`/cari?q=${encodeURIComponent(topic)}`}
                    className="inline-block rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    #{topic.replace(/\s+/g, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-border mt-4">
          {results.map((article) => (
            <li key={article.slug} className="py-4 first:pt-2">
              <ArticleCard article={article} variant="horizontal" showExcerpt />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
