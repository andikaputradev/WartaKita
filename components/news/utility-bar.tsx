import Link from 'next/link'
import { siteContact } from '@/lib/site'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

export function UtilityBar() {
  const todayWIB = dateFormatter.format(new Date())

  return (
    <div
      role="region"
      aria-label="Bilah utilitas"
      className="border-b border-border bg-surface px-4 py-1.5 text-xs text-muted-foreground"
    >
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <time className="font-medium capitalize text-foreground">{todayWIB} WIB</time>
          <span className="hidden text-border sm:inline" aria-hidden="true">|</span>
          <span className="hidden sm:inline">Kabar Terpercaya, Dekat dengan Kita</span>
        </div>

        <nav aria-label="Tautan pintas" className="flex items-center gap-3">
          <Link
            href="#terpopuler"
            className="hover:text-primary transition-colors font-medium"
          >
            Terpopuler
          </Link>
          <span className="text-border" aria-hidden="true">|</span>
          <Link
            href="/cari"
            className="hover:text-primary transition-colors font-medium"
          >
            Indeks Berita
          </Link>
          <span className="text-border" aria-hidden="true">|</span>
          <Link
            href="#newsletter"
            className="hover:text-primary transition-colors font-medium"
          >
            Newsletter
          </Link>

          {siteContact.socials.twitter && (
            <>
              <span className="hidden sm:inline text-border" aria-hidden="true">|</span>
              <a
                href={siteContact.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline hover:text-primary transition-colors"
                aria-label="Ikuti WartaKita di X (Twitter)"
              >
                X
              </a>
            </>
          )}

          {siteContact.socials.instagram && (
            <a
              href={siteContact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-primary transition-colors"
              aria-label="Ikuti WartaKita di Instagram"
            >
              Instagram
            </a>
          )}
        </nav>
      </div>
    </div>
  )
}
