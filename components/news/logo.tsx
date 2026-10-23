import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

interface LogoProps {
  inverted?: boolean
  className?: string
  showTagline?: boolean
}

export function Logo({ inverted = false, className, showTagline = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={`${SITE_NAME}: Beranda`}
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-sm transition-transform group-hover:scale-105',
          inverted ? 'bg-white text-primary' : 'bg-primary text-primary-foreground',
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          aria-hidden="true"
        >
          <path
            d="M5 8L10 24L16 12L22 24L27 8"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="8" r="2.5" className={inverted ? 'fill-highlight' : 'fill-highlight'} />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif text-2xl font-bold tracking-tight',
            inverted ? 'text-white' : 'text-primary',
          )}
        >
          Warta<span className="text-highlight">Kita</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]',
              inverted ? 'text-white/70' : 'text-muted-foreground',
            )}
          >
            {SITE_TAGLINE}
          </span>
        )}
      </span>
    </Link>
  )
}
