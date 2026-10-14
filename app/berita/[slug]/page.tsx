import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Eye, MapPin } from 'lucide-react'
import {
  SITE_NAME,
  articles,
  formatLongDate,
  formatViews,
  getArticle,
  getCategory,
  getRelatedArticles,
} from '@/lib/news'
import { CategoryLabel } from '@/components/news/category-label'
import { ShareButtons } from '@/components/news/share-buttons'
import { ArticleCard } from '@/components/news/article-card'
import { SectionHeading } from '@/components/news/section-heading'
import { NewsSidebar } from '@/components/news/news-sidebar'
import { DemoNotice } from '@/components/news/demo-notice'

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
    author: [{ '@type': 'Person', name: article.author }],
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/kategori/${article.category}`} className="hover:text-primary hover:underline">
              {category?.name}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-3 lg:gap-8">
        <article className="lg:col-span-2">
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <CategoryLabel slug={article.category} variant="solid" />
              {article.province && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <MapPin className="size-3.5 text-highlight" aria-hidden="true" />
                  {article.province}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-primary text-balance md:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{article.excerpt}</p>

            <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center bg-primary text-sm font-bold text-primary-foreground"
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{article.author}</p>
                  <p className="text-xs text-muted-foreground">{article.authorRole}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <time dateTime={article.publishedAt} className="capitalize">
                  {formatLongDate(article.publishedAt)}
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" aria-hidden="true" />
                  {article.readingMinutes} menit baca
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="size-3" aria-hidden="true" />
                  {formatViews(article.views)}
                </span>
              </div>
            </div>
          </header>

          <figure className="mt-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 border-l-2 border-highlight pl-3 text-xs leading-relaxed text-muted-foreground">
              {article.imageCaption}
            </figcaption>
          </figure>

          <DemoNotice className="mt-6" />

          <div className="mt-6 max-w-2xl font-serif text-lg leading-[1.8] text-foreground">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'mb-6 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary'
                    : 'mb-6'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-8 flex flex-col gap-6 border-t border-border pt-6">
            <ul className="flex flex-wrap gap-2" aria-label="Tag">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/cari?q=${encodeURIComponent(tag)}`}
                    className="inline-block bg-secondary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
            <ShareButtons title={article.title} path={`/berita/${article.slug}`} />
          </footer>

          {related.length > 0 && (
            <section aria-labelledby="judul-terkait" className="mt-12">
              <SectionHeading title="Berita Terkait" id="judul-terkait" />
              <ul className="grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ArticleCard article={item} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <div className="lg:sticky lg:top-36 lg:self-start">
          <NewsSidebar excludeSlug={article.slug} />
        </div>
      </div>
    </div>
  )
}
