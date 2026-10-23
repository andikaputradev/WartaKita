import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, Clock, Eye, MapPin } from 'lucide-react'
import {
  SITE_NAME,
  SITE_URL,
  articles,
  formatViews,
  getArticle,
  getCategory,
  getRelatedArticles,
} from '@/lib/news'
import { formatAbsoluteDateWIB } from '@/lib/time'
import { CategoryLabel } from '@/components/news/category-label'
import { ShareButtons } from '@/components/news/share-buttons'
import { ArticleCard } from '@/components/news/article-card'
import { SectionHeading } from '@/components/news/section-heading'
import { NewsSidebar } from '@/components/news/news-sidebar'
import { jsonLdScript } from '@/lib/json-ld'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Berita tidak ditemukan' }

  const imageUrl = /^https?:\/\//i.test(article.image)
    ? article.image
    : new URL(article.image.startsWith('/') ? article.image : `/${article.image}`, SITE_URL).toString()

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/berita/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/berita/${article.slug}`,
      siteName: SITE_NAME,
      title: article.title,
      description: article.excerpt,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.imageAlt }],
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const category = getCategory(article.category)
  const related = getRelatedArticles(article, 3)
  const bacaJugaArticle = related[0]

  const initials = article.author
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{ '@type': 'Person', name: article.author }],
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/berita/${article.slug}`,
    },
  }

  const publishedDateFormatted = formatAbsoluteDateWIB(article.publishedAt)

  return (
    <div className="mx-auto max-w-[1160px] px-4 py-6 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline font-medium">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li>
            <Link href={`/kategori/${article.category}`} className="hover:text-primary hover:underline font-medium">
              {category?.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li className="text-foreground font-medium line-clamp-1 max-w-xs sm:max-w-md" aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        {/* Main Article Reading Area (8 cols on lg) */}
        <article className="lg:col-span-8 flex flex-col">
          <header>
            <div className="flex flex-wrap items-center gap-2.5">
              <CategoryLabel slug={article.category} variant="solid" />
              {article.province && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <MapPin className="size-3.5 text-highlight" aria-hidden="true" />
                  {article.province}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-[34px] font-bold leading-tight text-foreground text-pretty">
              {article.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
              {article.excerpt}
            </p>

            {/* Author and Published Date Bar */}
            <div className="mt-5 flex flex-col gap-3 border-y border-border py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center rounded-sm bg-primary text-sm font-bold text-primary-foreground"
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-foreground">{article.author}</p>
                  <p className="text-xs text-muted-foreground">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-muted-foreground gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">Waktu:</span>
                  <time dateTime={article.publishedAt}>
                    {publishedDateFormatted}
                  </time>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" aria-hidden="true" />
                    {article.readingMinutes} menit baca
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="size-3" aria-hidden="true" />
                    {formatViews(article.views)} dilihat
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image & Caption */}
          <figure className="mt-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-muted">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 680px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 border-l-2 border-highlight pl-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Foto: Dok. Redaksi WartaKita</span>
              {' · '}
              {article.imageCaption}
            </figcaption>
          </figure>

          {/* Reading Column: around 680px (max-w-[680px]), text 18px / 1.7 */}
          <div className="mt-6 max-w-[680px] text-lg leading-[1.7] text-foreground">
            {article.body.map((paragraph, i) => (
              <div key={i}>
                <p className="mb-6">{paragraph}</p>

                {/* 'Baca Juga' box after 2nd paragraph */}
                {i === 1 && bacaJugaArticle && (
                  <aside
                    aria-label="Rekomendasi artikel"
                    className="my-6 rounded-sm border-l-4 border-primary bg-surface p-4 text-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      <BookOpen className="size-4 text-highlight" aria-hidden="true" />
                      Baca Juga
                    </div>
                    <Link
                      href={`/berita/${bacaJugaArticle.slug}`}
                      className="font-semibold text-foreground hover:text-primary hover:underline decoration-highlight underline-offset-4"
                    >
                      {bacaJugaArticle.title}
                    </Link>
                  </aside>
                )}
              </div>
            ))}
          </div>

          {/* Tags and Social Share */}
          <footer className="mt-6 flex flex-col gap-6 border-t border-border pt-6 max-w-[680px]">
            <div className="flex flex-wrap items-center gap-2" aria-label="Tag artikel">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                Tag:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="inline-block rounded-sm bg-surface px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground border border-border"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <ShareButtons title={article.title} path={`/berita/${article.slug}`} />
          </footer>

          {/* Related Articles */}
          {related.length > 0 && (
            <section aria-labelledby="judul-terkait" className="mt-10 border-t border-border pt-6">
              <SectionHeading title="Berita Terkait" id="judul-terkait" />
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} variant="medium" />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar Column (4 cols on lg) */}
        <div className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
          <NewsSidebar excludeSlug={article.slug} />
        </div>
      </div>
    </div>
  )
}
