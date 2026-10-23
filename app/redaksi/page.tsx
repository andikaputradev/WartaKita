import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, siteContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Susunan Redaksi',
  description: `Struktur redaksi dan penanggung jawab pemberitaan ${SITE_NAME}.`,
}

export default function RedaksiPage() {
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
            Redaksi
          </li>
        </ol>
      </nav>

      <header className="mt-4 border-b-2 border-primary pb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-highlight">Organisasi</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">Susunan Redaksi</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Struktur kepemimpinan dan penanggung jawab redaksional {SITE_NAME}.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground text-sm">
        <div className="rounded-sm border border-border bg-card p-6 shadow-xs">
          <h2 className="text-base font-bold text-primary">Dewan Pimpinan & Penanggung Jawab</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Penanggung Jawab / Pemimpin Umum
              </dt>
              <dd className="mt-1 font-semibold text-foreground">
                {siteContact.leadName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pemimpin Redaksi
              </dt>
              <dd className="mt-1 font-semibold text-foreground">
                {siteContact.leadName}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-border bg-card p-6 shadow-xs">
          <h2 className="text-base font-bold text-primary">Manajemen Redaksi & Desk Liputan</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Redaktur Desk Nasional & Politik
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                Tim Redaksi WartaKita
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Koordinator Liputan Daerah
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                Biro Daerah & Koresponden
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-border bg-surface p-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Seluruh wartawan dan koresponden {SITE_NAME} dibekali tanda pengenal pers resmi serta dilarang menerima
            imbalan, suap, atau gratifikasi dalam bentuk apa pun terkait tugas peliputan jurnalistik.
          </p>
        </div>
      </div>
    </div>
  )
}
