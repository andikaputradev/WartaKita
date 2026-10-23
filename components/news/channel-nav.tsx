'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categories, indonesianProvinces } from '@/lib/news'
import { cn } from '@/lib/utils'

export function ChannelNav() {
  const pathname = usePathname()
  const [daerahOpen, setDaerahOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDaerahOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDaerahOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      aria-label="Navigasi kanal"
      className="relative border-b border-primary/20 bg-primary text-primary-foreground shadow-sm"
    >
      <div className="mx-auto flex max-w-[1160px] items-center px-4">
        {/* Horizontal scroll container on mobile */}
        <div className="flex w-full items-center overflow-x-auto scrollbar-none py-0.5 -mx-2 px-2 sm:mx-0 sm:px-0">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/"
                aria-current={isActive('/') ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-[44px] items-center px-3 text-sm font-semibold transition-colors hover:bg-white/10 rounded-sm',
                  isActive('/') && 'bg-white/15 text-white underline decoration-highlight decoration-2 underline-offset-8',
                )}
              >
                Beranda
              </Link>
            </li>

            {categories.map((cat) => {
              const href = `/kategori/${cat.slug}`
              const isCatActive = isActive(href)

              if (cat.slug === 'daerah') {
                return (
                  <li key={cat.slug} className="relative" ref={dropdownRef}>
                    <div className="flex items-center">
                      <Link
                        href={href}
                        aria-current={isCatActive ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-[44px] items-center pl-3 pr-1 text-sm font-semibold transition-colors hover:bg-white/10 rounded-l-sm',
                          isCatActive && 'bg-white/15 text-white underline decoration-highlight decoration-2 underline-offset-8',
                        )}
                      >
                        {cat.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDaerahOpen((prev) => !prev)}
                        aria-expanded={daerahOpen}
                        aria-haspopup="true"
                        aria-label="Pilih daerah atau provinsi"
                        className={cn(
                          'inline-flex min-h-[44px] min-w-[32px] items-center justify-center pr-2 transition-colors hover:bg-white/10 rounded-r-sm',
                          daerahOpen && 'bg-white/20',
                        )}
                      >
                        <ChevronDown className={cn('size-4 transition-transform', daerahOpen && 'rotate-180')} />
                      </button>
                    </div>

                    {daerahOpen && (
                      <div
                        role="menu"
                        aria-label="Daftar provinsi"
                        className="absolute left-0 top-full z-50 mt-1 max-h-80 w-64 overflow-y-auto rounded-sm border border-border bg-card p-2 text-card-foreground shadow-lg"
                      >
                        <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Provinsi Pilihan
                        </p>
                        <ul className="space-y-0.5">
                          {indonesianProvinces.map((prov) => (
                            <li key={prov} role="none">
                              <Link
                                href={`/cari?q=${encodeURIComponent(prov)}`}
                                role="menuitem"
                                onClick={() => setDaerahOpen(false)}
                                className="block rounded-sm px-3 py-2 text-sm text-foreground hover:bg-surface hover:text-primary transition-colors"
                              >
                                {prov}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              }

              return (
                <li key={cat.slug}>
                  <Link
                    href={href}
                    aria-current={isCatActive ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-[44px] items-center px-3 text-sm font-semibold transition-colors hover:bg-white/10 rounded-sm whitespace-nowrap',
                      isCatActive && 'bg-white/15 text-white underline decoration-highlight decoration-2 underline-offset-8',
                    )}
                  >
                    {cat.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
