import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { articles, searchArticles, sortByDate, trendingTopics } from '@/lib/news'
import { ArticleCard } from '@/components/news/article-card'
import Link from 'next/link'

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
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
      <header className="border-b-2 border-primary pb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">
          {query ? 'Hasil pencarian' : 'Indeks berita'}
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-primary md:text-4xl">
          {query ? `“${query}”` : 'Semua Berita'}
        </h1>

        <form action="/cari" role="search" className="mt-5 flex max-w-xl gap-2">
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
              className="h-11 w-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>
          <button type="submit" className="h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Cari
          </button>
        </form>
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          {query ? `${results.length} berita ditemukan` : `${results.length} berita tersedia`}
        </p>
      </header>

      {results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-serif text-xl font-semibold text-foreground">Tidak ada berita yang cocok.</p>
          <p className="mt-2 text-sm text-muted-foreground">Coba kata kunci lain atau salah satu topik berikut:</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {trendingTopics.map((topic) => (
              <li key={topic}>
                <Link
                  href={`/cari?q=${encodeURIComponent(topic)}`}
                  className="inline-block border border-border px-3 py-1.5 text-sm font-medium hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {results.map((article) => (
            <li key={article.slug} className="py-6">
              <ArticleCard article={article} variant="horizontal" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
