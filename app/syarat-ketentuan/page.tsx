import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: `Ketentuan dan syarat penggunaan layanan portal berita ${SITE_NAME}.`,
}

export default function SyaratKetentuanPage() {
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
            Syarat & Ketentuan
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Syarat & Ketentuan</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Ketentuan akses dan pemanfaatan konten pada portal berita {SITE_NAME}.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed text-sm">
        <section>
          <h2 className="text-base font-bold text-primary">1. Penerimaan Ketentuan</h2>
          <p className="mt-2 text-muted-foreground">
            Dengan mengakses dan membaca materi pada situs {SITE_NAME}, Anda menyetujui untuk terikat oleh
            syarat dan ketentuan yang berlaku sesuai hukum Republik Indonesia.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">2. Hak Kekayaan Intelektual</h2>
          <p className="mt-2 text-muted-foreground">
            Seluruh konten berupa artikel teks, tata letak grafis, dan aset visual {SITE_NAME} dilindungi oleh
            Undang-Undang Hak Cipta. Pemanfaatan kutipan diperkenankan dengan menyertakan kredit sumber dan tautan aktif.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">3. Batasan Tanggung Jawab</h2>
          <p className="mt-2 text-muted-foreground">
            {SITE_NAME} berupaya menyajikan fakta seakurat mungkin, namun tidak bertanggung jawab atas kerugian
            langsung maupun tidak langsung yang timbul akibat keputusan investasi atau tindakan berdasarkan artikel opini.
          </p>
        </section>
      </div>
    </div>
  )
}
