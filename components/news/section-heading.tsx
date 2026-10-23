import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  title,
  id,
  href,
  linkLabel = 'Lihat semua',
  as: Tag = 'h2',
  className,
}: {
  title: string
  id?: string
  href?: string
  linkLabel?: string
  as?: 'h2' | 'h3'
  className?: string
}) {
  return (
    <div className={cn('mb-5 flex items-end justify-between border-b-2 border-primary', className)}>
      <Tag
        id={id}
        className="relative -mb-0.5 border-b-2 border-highlight pb-2 text-xl font-bold text-primary md:text-2xl"
      >
        {title}
      </Tag>
      {href && (
        <Link
          href={href}
          className="mb-2 inline-flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-highlight"
        >
          {linkLabel}
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
