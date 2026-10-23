import Link from 'next/link'
import { categories } from '@/lib/news'
import { SITE_DESCRIPTION, SITE_NAME, siteContact } from '@/lib/site'
import { Logo } from './logo'

const companyLinks = [
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Redaksi', href: '/redaksi' },
  { label: 'Pedoman Media Siber', href: '/pedoman-media-siber' },
  { label: 'Kode Etik', href: '/kode-etik' },
  { label: 'Kontak', href: '/kontak' },
]

const serviceLinks = [
  { label: 'Pasang Iklan', href: '/pasang-iklan' },
  { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
  { label: 'Indeks Berita', href: '/cari?q=' },
  { label: 'RSS Feed', href: '/feed.xml' },
]

export function SiteFooter() {
  const hasContactInfo = Boolean(siteContact.address || siteContact.email || siteContact.phone)

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {SITE_DESCRIPTION}
          </p>

          {hasContactInfo && (
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/60">
              {siteContact.address && (
                <>
                  {siteContact.address}
                  <br />
                </>
              )}
              {siteContact.email && (
                <a
                  href={`mailto:${siteContact.email}`}
                  className="hover:text-white hover:underline"
                >
                  {siteContact.email}
                </a>
              )}
              {siteContact.phone && (
                <>
                  <br />
                  <span>Tel: {siteContact.phone}</span>
                </>
              )}
            </address>
          )}
        </div>

        <FooterColumn title="Kanal">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/kategori/${c.slug}`} className="hover:text-white hover:underline">
                {c.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Perusahaan">
          {companyLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-white hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Layanan">
          {serviceLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-white hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Hak cipta dilindungi.</p>
          <p>Portal berita terpercaya dari seluruh penjuru Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="border-l-2 border-highlight pl-3 text-xs font-bold uppercase tracking-widest text-white">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">{children}</ul>
    </div>
  )
}
