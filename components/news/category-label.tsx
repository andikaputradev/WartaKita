import Link from 'next/link'
import { getCategory, type CategorySlug } from '@/lib/news'
import { cn } from '@/lib/utils'

export function CategoryLabel({
  slug,
  variant = 'text',
  className,
}: {
  slug: CategorySlug
  variant?: 'text' | 'solid'
  className?: string
}) {
  const category = getCategory(slug)
  if (!category) return null

  return (
    <Link
      href={`/kategori/${slug}`}
      className={cn(
        'relative z-10 inline-block text-[11px] font-bold uppercase tracking-widest transition-colors',
        variant === 'solid'
          ? 'bg-highlight px-2 py-1 text-highlight-foreground hover:bg-highlight/90'
          : 'text-highlight hover:text-primary',
        className,
      )}
    >
      {category.name}
    </Link>
  )
}
