import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getArticlesByCategory, getCategory } from '@/lib/news'
import { ArticleCard } from '@/components/news/article-card'
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-foreground">
            {category.name}
          </li>
        </ol>
      </nav>

      <header className="mt-4 border-b-2 border-primary pb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">Kanal</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-primary md:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{category.description}</p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          {!lead ? (
            <p className="text-muted-foreground">Belum ada berita di kanal ini.</p>
          ) : (
            <>
              <ArticleCard article={lead} showExcerpt priority className="[&_h3]:text-2xl md:[&_h3]:text-3xl" />
              {rest.length > 0 && (
                <ul className="mt-10 grid gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-2">
                  {rest.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} showExcerpt />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <NewsSidebar />
      </div>
    </div>
  )
}
