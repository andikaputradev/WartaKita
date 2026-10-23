import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, siteContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontak Redaksi',
  description: `Saluran resmi komunikasi dan kontak redaksi portal berita ${SITE_NAME}.`,
}

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-4 py-8 md:py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline font-medium">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li aria-current="page" className="font-semibold text-foreground">
            Kontak
          </li>
        </ol>
      </nav>

      <header className="mt-4 border-b-2 border-primary pb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">Hubungi Kami</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">Kontak Redaksi</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Hubungi tim redaksi dan manajemen {SITE_NAME} untuk klarifikasi, kerjasama pemberitaan, koreksi, dan hak jawab.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground text-sm leading-relaxed">
        <div className="rounded-sm border border-border bg-card p-6 shadow-xs space-y-4">
          <div>
            <h2 className="font-semibold text-primary">Penanggung Jawab / Redaktur</h2>
            <p className="mt-1 text-muted-foreground">{siteContact.leadName}</p>
          </div>

          {siteContact.address && (
            <div>
              <h2 className="font-semibold text-primary">Alamat Redaksi / Domisili</h2>
              <p className="mt-1 text-muted-foreground">{siteContact.address}</p>
            </div>
          )}

          {siteContact.email && (
            <div>
              <h2 className="font-semibold text-primary">Surat Elektronik</h2>
              <p className="mt-1 text-muted-foreground">
                <a href={`mailto:${siteContact.email}`} className="text-primary hover:underline font-medium">
                  {siteContact.email}
                </a>
              </p>
            </div>
          )}

          {siteContact.phone && (
            <div>
              <h2 className="font-semibold text-primary">Telepon / WhatsApp</h2>
              <p className="mt-1 text-muted-foreground">
                <a href={`tel:${siteContact.phone}`} className="text-primary hover:underline font-medium">
                  {siteContact.phone}
                </a>
              </p>
            </div>
          )}

          {siteContact.website && (
            <div>
              <h2 className="font-semibold text-primary">Situs Web Resmi</h2>
              <p className="mt-1 text-muted-foreground">
                <a
                  href={siteContact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {siteContact.website}
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="rounded-sm border border-border bg-card p-6 shadow-xs">
          <h2 className="text-base font-bold text-primary">Pengajuan Hak Jawab & Koreksi</h2>
          <p className="mt-2 text-muted-foreground">
            Sesuai Pedoman Pemberitaan Media Siber dan Undang-Undang Pers, pengajuan koreksi atau sanggahan atas
            artikel berita dapat dilayangkan secara tertulis melalui surel redaksi dengan mencantumkan tautan artikel yang dimaksud beserta data pendukung.
          </p>
        </div>
      </div>
    </div>
  )
}
