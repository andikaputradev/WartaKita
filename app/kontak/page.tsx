import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, siteContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontak Redaksi',
  description: `Saluran komunikasi dan kontak resmi redaksi ${SITE_NAME}.`,
}

export default function KontakPage() {
  const hasDetails = Boolean(siteContact.email || siteContact.address || siteContact.phone)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-foreground">
            Kontak Redaksi
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Kontak Redaksi</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Hubungi tim redaksi dan manajemen {SITE_NAME} untuk klarifikasi, koreksi, dan hak jawab.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground text-sm leading-relaxed">
        {hasDetails ? (
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
            {siteContact.address && (
              <div>
                <h2 className="font-semibold text-primary">Alamat Redaksi</h2>
                <p className="mt-1 text-muted-foreground">{siteContact.address}</p>
              </div>
            )}
            {siteContact.email && (
              <div>
                <h2 className="font-semibold text-primary">Surat Elektronik</h2>
                <p className="mt-1 text-muted-foreground">
                  <a href={`mailto:${siteContact.email}`} className="text-primary hover:underline">
                    {siteContact.email}
                  </a>
                </p>
              </div>
            )}
            {siteContact.phone && (
              <div>
                <h2 className="font-semibold text-primary">Telepon / WhatsApp</h2>
                <p className="mt-1 text-muted-foreground">{siteContact.phone}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-secondary/50 p-6 text-muted-foreground">
            <p>
              Informasi alamat resmi dan saluran komunikasi redaksi {SITE_NAME} sedang dalam proses
              konfigurasi oleh penanggung jawab media.
            </p>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold text-primary">Pengajuan Hak Jawab & Koreksi</h2>
          <p className="mt-2 text-muted-foreground">
            Sesuai Pedoman Pemberitaan Media Siber dan Undang-Undang Pers, pengajuan koreksi atas
            artikel berita dapat dilayangkan dengan mencantumkan tautan artikel yang dimaksud beserta data pendukung.
          </p>
        </div>
      </div>
    </div>
  )
}
