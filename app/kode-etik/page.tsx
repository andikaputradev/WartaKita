import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kode Etik Jurnalistik',
  description: `Prinsip kode etik jurnalistik dan integritas independensi redaksi ${SITE_NAME}.`,
}

export default function KodeEtikPage() {
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
            Kode Etik
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Kode Etik Jurnalistik</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Landasan moral dan operasional jurnalis {SITE_NAME} dalam memproduksi karya jurnalistik.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed text-sm">
        <p>
          Wartawan dan editor {SITE_NAME} senantiasa mematuhi Kode Etik Jurnalistik (KEJ) yang disahkan
          oleh Dewan Pers Indonesia, meliputi prinsip-prinsip utama sebagai berikut:
        </p>

        <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>Wartawan bersikap independen, menghasilkan berita yang akurat, berimbang, dan tidak beritikad buruk.</li>
          <li>Wartawan menempuh cara-cara yang profesional dalam melaksanakan tugas jurnalistik.</li>
          <li>Wartawan selalu menguji informasi, memberitakan secara berimbang, tidak mencampurkan fakta dan opini yang menghakimi, serta menerapkan asas praduga tak bersalah.</li>
          <li>Wartawan tidak membuat berita bohong, fitnah, sadis, dan cabul.</li>
          <li>Wartawan tidak menyebutkan dan menyiarkan identitas korban kejahatan susila dan tidak menyebutkan identitas anak yang menjadi pelaku kejahatan.</li>
          <li>Wartawan tidak menyalahgunakan profesi dan tidak menerima suap.</li>
          <li>Wartawan memiliki hak tolak untuk melindungi narasumber yang tidak bersedia diketahui identitas maupun keberadaannya.</li>
        </ol>
      </div>
    </div>
  )
}
