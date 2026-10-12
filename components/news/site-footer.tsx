import Link from 'next/link'
import { categories } from '@/lib/news'
import { Logo } from './logo'

const company = ['Tentang Kami', 'Redaksi', 'Pedoman Media Siber', 'Kode Etik', 'Karier', 'Kontak']
const services = ['Newsletter', 'Indeks Berita', 'Pasang Iklan', 'Kebijakan Privasi', 'Syarat & Ketentuan']

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Portal berita digital yang menghadirkan jurnalisme jernih dan berimbang dari seluruh penjuru Nusantara.
          </p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-white/60">
            Jl. Merdeka Barat No. 17, Jakarta Pusat 10110
            <br />
            redaksi@nusantaranews.example
          </address>
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
          {company.map((item) => (
            <li key={item}>
              <span>{item}</span>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Layanan">
          {services.map((item) => (
            <li key={item}>
              <span>{item}</span>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Nusantara News. Hak cipta dilindungi.</p>
          <p>Prototipe demo — seluruh konten berita bersifat fiktif.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="border-l-2 border-highlight pl-3 text-xs font-bold uppercase tracking-widest text-white">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">{children}</ul>
    </div>
  )
}
