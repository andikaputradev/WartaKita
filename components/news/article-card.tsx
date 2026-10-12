import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { formatShortDate, type Article } from '@/lib/news'
import { CategoryLabel } from './category-label'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'horizontal' | 'compact'

export function ArticleCard({
  article,
  variant = 'default',
  showExcerpt = false,
  priority = false,
  className,
}: {
  article: Article
  variant?: Variant
  showExcerpt?: boolean
  priority?: boolean
  className?: string
}) {
  const href = `/berita/${article.slug}`

  if (variant === 'compact') {
    return (
      <article className={cn('group relative', className)}>
        <CategoryLabel slug={article.category} />
        <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <Timestamp iso={article.publishedAt} className="mt-1.5" />
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className={cn('group relative flex gap-4', className)}>
        <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-muted sm:w-36">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="144px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <CategoryLabel slug={article.category} />
          <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4 sm:text-lg">
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
          <Timestamp iso={article.publishedAt} className="mt-1.5" />
        </div>
      </article>
    )
  }

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col pt-3">
        <CategoryLabel slug={article.category} />
        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-foreground text-pretty group-hover:text-primary group-hover:underline group-hover:decoration-highlight group-hover:underline-offset-4">
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>}
        <Timestamp iso={article.publishedAt} className="mt-auto pt-2.5" />
      </div>
    </article>
  )
}

export function Timestamp({ iso, className }: { iso: string; className?: string }) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
      <Clock className="size-3" aria-hidden="true" />
      <time dateTime={iso}>{formatShortDate(iso)}</time>
    </p>
  )
}
