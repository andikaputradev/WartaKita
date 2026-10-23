import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, siteContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pasang Iklan & Kerjasama Media',
  description: `Informasi kemitraan periklanan, advertorial, dan kerjasama media ${SITE_NAME}.`,
}

export default function PasangIklanPage() {
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
            Pasang Iklan
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">
          Pasang Iklan & Kemitraan
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Jangkau audiens pembaca berita berkualitas di seluruh Indonesia bersama {SITE_NAME}.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-primary">Format Kemitraan yang Tersedia</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Display Banner Banner Display (Desktop & Mobile)</li>
            <li>Artikel Kemitraan / Advertorial berlabel jelas</li>
            <li>Liputan Khusus & Kemitraan Program Media</li>
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold text-primary">Kontak Tim Komersial</h2>
          <p className="mt-2 text-muted-foreground">
            Untuk mendapatkan media kit, tarif pemasangan, dan skema kemitraan, silakan hubungi tim bisnis kami:
          </p>
          <div className="mt-4 text-muted-foreground">
            {siteContact.email ? (
              <p>
                Email:{' '}
                <a href={`mailto:${siteContact.email}`} className="text-primary hover:underline">
                  {siteContact.email}
                </a>
              </p>
            ) : (
              <p>[Email komersial perlu dilengkapi konfigurasi pemilik redaksi]</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
