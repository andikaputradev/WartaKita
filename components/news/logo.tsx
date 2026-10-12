import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="InfoBanten — Beranda"
    >
      <span
        className={cn(
          'flex size-9 items-center justify-center font-serif text-xl font-bold leading-none',
          inverted ? 'bg-white text-primary' : 'bg-primary text-primary-foreground',
        )}
        aria-hidden="true"
      >
        I
        <span className="ml-px mt-3 size-1.5 bg-highlight" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif text-2xl font-bold tracking-tight',
            inverted ? 'text-white' : 'text-primary',
          )}
        >
          Info<span className="text-highlight">Banten</span>
        </span>

        <span
          className={cn(
            'mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]',
            inverted ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          Jernih · Berimbang · Terpercaya
        </span>
      </span>
    </Link>
  )
}
