import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Susunan Redaksi',
  description: `Struktur redaksional dan penanggung jawab jurnalisme ${SITE_NAME}.`,
}

export default function RedaksiPage() {
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
            Susunan Redaksi
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Susunan Redaksi</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Struktur organisasi dan penanggung jawab redaksional {SITE_NAME}.
        </p>
      </header>

      <div className="mt-8 space-y-8 text-foreground">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary">Dewan Pimpinan & Penanggung Jawab</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Penanggung Jawab / Pemimpin Umum
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                [Perlu dilengkapi konfigurasi pemilik redaksi]
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pemimpin Redaksi
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                [Perlu dilengkapi konfigurasi pemilik redaksi]
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary">Manajemen Redaksi & Desk</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Redaktur Pelaksana
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                [Perlu dilengkapi konfigurasi pemilik redaksi]
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Koordinator Liputan
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                [Perlu dilengkapi konfigurasi pemilik redaksi]
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-secondary/40 p-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Setiap jurnalis dan kontributor {SITE_NAME} dibekali kartu pers resmi dan dilarang
            menerima imbalan dalam bentuk apa pun yang berhubungan dengan pelaksanaan tugas jurnalistik.
          </p>
        </div>
      </div>
    </div>
  )
}
