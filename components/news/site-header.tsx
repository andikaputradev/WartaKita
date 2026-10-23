'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Logo } from './logo'
import { UtilityBar } from './utility-bar'
import { ChannelNav } from './channel-nav'
import { categories } from '@/lib/news'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background shadow-xs">
      {/* 1. UtilityBar */}
      <UtilityBar />

      {/* 2. Main Header Bar: Logo + Search + Mobile Toggle */}
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Tutup navigasi seluler' : 'Buka navigasi seluler'}
            className="flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          <Logo />
        </div>

        {/* Search Bar: Accessible HTML form GET to /cari */}
        <form
          action="/cari"
          method="GET"
          role="search"
          className="hidden md:flex items-center w-full max-w-md"
        >
          <label htmlFor="desktop-search-input" className="sr-only">
            Cari berita di WartaKita
          </label>
          <div className="relative flex w-full items-stretch">
            <input
              id="desktop-search-input"
              type="search"
              name="q"
              placeholder="Cari berita terkini..."
              required
              className="h-10 w-full rounded-l-sm border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            <button
              type="submit"
              aria-label="Kirim pencarian"
              className="flex h-10 min-w-[44px] items-center justify-center rounded-r-sm bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Mobile Search Button / Status */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cari"
            aria-label="Menuju halaman pencarian berita"
            className="flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Search className="size-5" />
          </Link>
        </div>
      </div>

      {/* 3. ChannelNav: Horizontal category bar */}
      <ChannelNav />

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="border-b border-border bg-background p-4 shadow-lg md:hidden"
        >
          {/* Mobile Search Form */}
          <form action="/cari" method="GET" role="search" className="mb-4">
            <label htmlFor="mobile-search-input" className="sr-only">
              Cari berita di WartaKita
            </label>
            <div className="flex items-stretch">
              <input
                id="mobile-search-input"
                type="search"
                name="q"
                placeholder="Cari berita..."
                required
                className="h-11 w-full rounded-l-sm border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <button
                type="submit"
                aria-label="Kirim pencarian"
                className="flex h-11 min-w-[44px] items-center justify-center rounded-r-sm bg-primary px-4 text-primary-foreground hover:bg-primary-hover"
              >
                <Search className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Kanal WartaKita
          </p>
          <ul className="grid grid-cols-2 gap-1 border-t border-border pt-2">
            <li>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-sm px-3 text-sm font-medium text-foreground hover:bg-surface hover:text-primary"
              >
                Beranda
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/kategori/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-sm px-3 text-sm font-medium text-foreground hover:bg-surface hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
