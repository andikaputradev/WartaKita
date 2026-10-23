import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, FileQuestion, RefreshCw } from 'lucide-react'
import type { Article } from '@/lib/news'
import { CategoryLabel } from './category-label'
import { RelativeTime } from './relative-time'
import { cn } from '@/lib/utils'

export type ArticleCardVariant = 'large' | 'medium' | 'horizontal' | 'text'

export function ArticleCard({
  article,
  variant = 'medium',
  showExcerpt = false,
  priority = false,
  className,
}: {
  article: Article
  variant?: ArticleCardVariant
  showExcerpt?: boolean
  priority?: boolean
  className?: string
}) {
  const href = `/berita/${article.slug}`

  // 1. Text Only Variant
  if (variant === 'text') {
    return (
      <article className={cn('group relative border-b border-border pb-3 last:border-b-0', className)}>
        <div className="flex items-center gap-2">
          <CategoryLabel slug={article.category} />
          <span className="text-border" aria-hidden="true">•</span>
          <RelativeTime
            dateString={article.publishedAt}
            className="text-xs text-muted-foreground"
          />
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </article>
    )
  }

  // 2. Horizontal Variant (Thumbnail left, text right)
  if (variant === 'horizontal') {
    return (
      <article className={cn('group relative flex gap-3 sm:gap-4', className)}>
        <div className="relative aspect-[4/3] w-28 sm:w-36 shrink-0 overflow-hidden rounded-sm bg-muted">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 640px) 144px, 112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <CategoryLabel slug={article.category} />
            <span className="text-border" aria-hidden="true">•</span>
            <RelativeTime
              dateString={article.publishedAt}
              className="text-xs text-muted-foreground"
            />
          </div>
          <h3 className="mt-1 text-[15px] sm:text-base font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
          {showExcerpt && (
            <p className="mt-1 hidden sm:line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    )
  }

  // 3. Large Headline Variant (Aspect 16:9 large cover image)
  if (variant === 'large') {
    return (
      <article className={cn('group relative flex flex-col', className)}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-muted">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <CategoryLabel slug={article.category} variant="solid" />
          </div>
        </div>
        <div className="pt-3">
          <div className="flex items-center gap-2">
            <RelativeTime
              dateString={article.publishedAt}
              className="text-xs font-medium text-muted-foreground"
            />
            {article.province && (
              <>
                <span className="text-border" aria-hidden="true">•</span>
                <span className="text-xs text-muted-foreground">{article.province}</span>
              </>
            )}
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl md:text-[28px] font-bold leading-tight text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        </div>
      </article>
    )
  }

  // 4. Medium Grid Variant (Default)
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col pt-2.5">
        <div className="flex items-center gap-2">
          <CategoryLabel slug={article.category} />
          <span className="text-border" aria-hidden="true">•</span>
          <RelativeTime
            dateString={article.publishedAt}
            className="text-xs text-muted-foreground"
          />
        </div>
        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}

export function ArticleCardSkeleton({ variant = 'medium' }: { variant?: ArticleCardVariant }) {
  if (variant === 'text') {
    return (
      <div className="animate-pulse border-b border-border pb-3">
        <div className="h-3 w-20 rounded-sm bg-muted" />
        <div className="mt-2 h-4 w-5/6 rounded-sm bg-muted" />
        <div className="mt-1.5 h-3 w-1/3 rounded-sm bg-muted" />
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex animate-pulse gap-3 sm:gap-4">
        <div className="aspect-[4/3] w-28 sm:w-36 shrink-0 rounded-sm bg-muted" />
        <div className="flex-1 py-1">
          <div className="h-3 w-20 rounded-sm bg-muted" />
          <div className="mt-2 h-4 w-full rounded-sm bg-muted" />
          <div className="mt-1.5 h-4 w-4/5 rounded-sm bg-muted" />
          <div className="mt-2 h-3 w-24 rounded-sm bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col animate-pulse">
      <div className={cn('w-full rounded-sm bg-muted', variant === 'large' ? 'aspect-[16/9]' : 'aspect-[16/10]')} />
      <div className="pt-3">
        <div className="h-3 w-24 rounded-sm bg-muted" />
        <div className="mt-2 h-5 w-full rounded-sm bg-muted" />
        <div className="mt-1.5 h-5 w-3/4 rounded-sm bg-muted" />
        <div className="mt-2 h-3 w-1/3 rounded-sm bg-muted" />
      </div>
    </div>
  )
}

export function EmptyState({
  title = 'Tidak ada berita',
  description = 'Saat ini belum ada artikel yang tersedia untuk kategori ini.',
  actionHref,
  actionLabel,
}: {
  title?: string
  description?: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border bg-surface p-8 text-center my-6">
      <FileQuestion className="size-12 text-muted-foreground/60" aria-hidden="true" />
      <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export function ErrorState({
  title = 'Gagal memuat berita',
  message = 'Terjadi kendala saat mengambil data artikel. Silakan coba beberapa saat lagi.',
  onRetry,
}: {
  title?: string
  message?: string
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-sm border border-destructive/20 bg-destructive/5 p-8 text-center my-6"
    >
      <AlertCircle className="size-12 text-destructive" aria-hidden="true" />
      <h3 className="mt-3 text-lg font-bold text-destructive">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Coba Lagi
        </button>
      )}
    </div>
  )
}
