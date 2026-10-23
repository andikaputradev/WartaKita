import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, siteContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Profil dan visi jurnalisme portal berita ${SITE_NAME}.`,
}

export default function TentangKamiPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-4 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-foreground">
            Tentang Kami
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Tentang {SITE_NAME}</h1>
        <p className="mt-2 text-base text-muted-foreground">{SITE_TAGLINE}</p>
      </header>

      <div className="prose prose-neutral mt-8 max-w-none text-foreground">
        <section className="space-y-4 leading-relaxed">
          <p>
            {SITE_NAME} adalah portal berita digital nasional yang berkomitmen menghadirkan
            informasi jernih, akurat, dan berimbang bagi masyarakat di seluruh pelosok Indonesia.
          </p>
          <p>
            Di tengah pesatnya arus digitalisasi informasi, kami menjunjung tinggi prinsip verifikasi
            faktual, independensi redaksional, dan keberpihakan pada kepentingan publik.
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-border bg-secondary/50 p-6">
          <h2 className="text-lg font-bold text-primary">Informasi Legalitas Redaksi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bagian ini disediakan untuk memuat identitas badan hukum pers, izin operasional,
            dan pengesahan Kementerian Hukum sesuai ketentuan Undang-Undang Nomor 40 Tahun 1999 tentang Pers.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong className="text-foreground">Pemimpin Umum / Penanggung Jawab:</strong> {siteContact.leadName}
            </p>
            <p>
              <strong className="text-foreground">Domisili Kantor Redaksi:</strong> {siteContact.address}
            </p>
            <p>
              <strong className="text-foreground">Badan Hukum:</strong> [Perlu dilengkapi konfigurasi legalitas pemilik redaksi]
            </p>
            <p>
              <strong className="text-foreground">Nomor Pengesahan:</strong> [Perlu dilengkapi konfigurasi legalitas pemilik redaksi]
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
