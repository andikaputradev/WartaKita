import Link from 'next/link'
import { categories, indonesianProvinces } from '@/lib/news'
import { SITE_DESCRIPTION, SITE_NAME, siteContact } from '@/lib/site'
import { Logo } from './logo'

const informationLinks = [
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Susunan Redaksi', href: '/redaksi' },
  { label: 'Pedoman Media Siber', href: '/pedoman-media-siber' },
  { label: 'Kode Etik Jurnalistik', href: '/kode-etik' },
  { label: 'Kontak Redaksi', href: '/kontak' },
  { label: 'Pasang Iklan', href: '/pasang-iklan' },
  { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
  { label: 'Indeks Berita', href: '/cari' },
  { label: 'RSS Feed', href: '/feed.xml' },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Kolom 1: Merek, Penanggung Jawab, Kontak & Sosial */}
        <div className="flex flex-col">
          <Logo inverted />
          <p className="mt-4 text-xs leading-relaxed text-white/80">
            {SITE_DESCRIPTION}
          </p>

          <address className="mt-4 text-xs not-italic leading-relaxed text-white/70 space-y-1">
            <p className="font-semibold text-white">Redaksi & Manajemen:</p>
            <p>{siteContact.leadName}</p>
            {siteContact.address && <p>{siteContact.address}</p>}
            {siteContact.email && (
              <p>
                Email:{' '}
                <a href={`mailto:${siteContact.email}`} className="text-white hover:underline">
                  {siteContact.email}
                </a>
              </p>
            )}
            {siteContact.phone && (
              <p>
                Tel/WA:{' '}
                <a href={`tel:${siteContact.phone}`} className="text-white hover:underline">
                  {siteContact.phone}
                </a>
              </p>
            )}
          </address>

          {/* Social Links */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
            {siteContact.socials.twitter && (
              <a
                href={siteContact.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs bg-white/10 px-2 py-1 hover:bg-white/20 hover:text-white"
              >
                X
              </a>
            )}
            {siteContact.socials.instagram && (
              <a
                href={siteContact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs bg-white/10 px-2 py-1 hover:bg-white/20 hover:text-white"
              >
                Instagram
              </a>
            )}
            {siteContact.socials.linkedin && (
              <a
                href={siteContact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs bg-white/10 px-2 py-1 hover:bg-white/20 hover:text-white"
              >
                LinkedIn
              </a>
            )}
            {siteContact.socials.github && (
              <a
                href={siteContact.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs bg-white/10 px-2 py-1 hover:bg-white/20 hover:text-white"
              >
                GitHub
              </a>
            )}
            {siteContact.socials.telegram && (
              <a
                href={siteContact.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xs bg-white/10 px-2 py-1 hover:bg-white/20 hover:text-white"
              >
                Telegram
              </a>
            )}
          </div>
        </div>

        {/* Kolom 2: Kanal */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Kanal</p>
          <ul className="mt-3 space-y-1.5 text-xs text-white/80">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/kategori/${c.slug}`}
                  className="hover:text-white hover:underline inline-block py-0.5"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Daerah */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Daerah</p>
          <ul className="mt-3 space-y-1.5 text-xs text-white/80">
            {indonesianProvinces.slice(0, 8).map((prov) => (
              <li key={prov}>
                <Link
                  href={`/cari?q=${encodeURIComponent(prov)}`}
                  className="hover:text-white hover:underline inline-block py-0.5"
                >
                  {prov}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kategori/daerah"
                className="font-semibold text-highlight-foreground hover:underline inline-block py-0.5"
              >
                Lihat Semua Daerah &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 4: Informasi & Legal */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Informasi & Regulasi</p>
          <ul className="mt-3 space-y-1.5 text-xs text-white/80">
            {informationLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white hover:underline inline-block py-0.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/10">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-2 px-4 py-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Hak cipta dilindungi undang-undang.</p>
          <p>Kabar Terpercaya, Dekat dengan Kita.</p>
        </div>
      </div>
    </footer>
  )
}
