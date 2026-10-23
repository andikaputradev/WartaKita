import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getArticlesByCategory, getCategory } from '@/lib/news'
import { ArticleCard, EmptyState } from '@/components/news/article-card'
import { NewsSidebar } from '@/components/news/news-sidebar'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return { title: 'Kategori tidak ditemukan' }
  return {
    title: `Berita ${category.name} Terkini`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const list = getArticlesByCategory(slug)
  const lead = list[0]
  const rest = list.slice(1)

  return (
    <div className="mx-auto max-w-[1160px] px-4 py-6 md:py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline font-medium">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li aria-current="page" className="font-semibold text-foreground">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <header className="border-b-2 border-primary pb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">Kanal</p>
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
      </header>

      {/* Content Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {!lead ? (
            <EmptyState
              title={`Belum ada berita di kanal ${category.name}`}
              description="Redaksi kami sedang menyiapkan liputan terkini untuk kanal ini. Silakan kunjungi kanal lainnya."
              actionHref="/"
              actionLabel="Kembali ke Beranda"
            />
          ) : (
            <>
              {/* Lead Article in Channel */}
              <ArticleCard article={lead} variant="large" priority showExcerpt />

              {/* Grid of Other Articles in Channel */}
              {rest.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h2 className="text-lg font-bold text-primary mb-4">
                    Kabar {category.name} Lainnya
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {rest.map((article) => (
                      <ArticleCard
                        key={article.slug}
                        article={article}
                        variant="medium"
                        showExcerpt
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
          <NewsSidebar />
        </div>
      </div>
    </div>
  )
}
