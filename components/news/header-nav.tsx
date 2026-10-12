'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { categories } from '@/lib/news'
import { cn } from '@/lib/utils'

export function HeaderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    setMenuOpen(false)
    router.push(`/cari?q=${encodeURIComponent(q)}`)
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const links = [{ href: '/', label: 'Beranda' }, ...categories.map((c) => ({ href: `/kategori/${c.slug}`, label: c.name }))]

  return (
    <>
      <nav aria-label="Navigasi utama" className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 md:px-4">
          <button
            type="button"
            className="flex size-11 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <ul className="hidden items-center md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'relative block px-3 py-3 text-sm font-semibold transition-colors hover:bg-white/10 lg:px-4',
                    'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-highlight after:opacity-0 after:transition-opacity lg:after:inset-x-4',
                    isActive(link.href) && 'after:opacity-100',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="text-sm font-semibold md:hidden">Menu</span>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-11 items-center gap-2 px-3 text-sm font-semibold transition-colors hover:bg-white/10"
            aria-expanded={searchOpen}
            aria-controls="panel-pencarian"
          >
            {searchOpen ? <X className="size-4" aria-hidden="true" /> : <Search className="size-4" aria-hidden="true" />}
            <span className="hidden sm:inline">Cari</span>
            <span className="sr-only sm:hidden">Cari berita</span>
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div id="panel-pencarian" className="border-b border-border bg-secondary">
          <form onSubmit={handleSubmit} role="search" className="mx-auto flex max-w-3xl gap-2 px-4 py-4">
            <label htmlFor="kolom-cari" className="sr-only">
              Cari berita
            </label>
            <input
              ref={inputRef}
              id="kolom-cari"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita, topik, atau provinsi…"
              className="h-11 flex-1 border border-input bg-background px-4 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <button
              type="submit"
              className="h-11 bg-highlight px-5 text-sm font-semibold text-highlight-foreground transition-opacity hover:opacity-90"
            >
              Cari
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div id="menu-mobile" className="border-b border-border bg-background md:hidden">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border">
            {links.map((link) => (
              <li key={link.href} className="bg-background">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'block border-l-2 border-transparent px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary',
                    isActive(link.href) && 'border-highlight text-primary',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
