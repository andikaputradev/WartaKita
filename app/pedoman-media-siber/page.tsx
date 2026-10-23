import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pedoman Pemberitaan Media Siber',
  description: `Pedoman pemberitaan media siber yang diterapkan oleh ${SITE_NAME}.`,
}

export default function PedomanMediaSiberPage() {
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
            Pedoman Media Siber
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          Pedoman Pemberitaan Media Siber
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Ketentuan Dewan Pers tentang standar operasional dan etika jurnalisme siber {SITE_NAME}.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed text-sm">
        <section>
          <h2 className="text-base font-bold text-primary">1. Ruang Lingkup</h2>
          <p className="mt-2 text-muted-foreground">
            Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan
            jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">2. Verifikasi dan Keberimbangan Berita</h2>
          <p className="mt-2 text-muted-foreground">
            Pada prinsipnya setiap berita harus melalui verifikasi. Berita yang dapat merugikan pihak lain memerlukan
            verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">3. Isi Buatan Pengguna (User Generated Content)</h2>
          <p className="mt-2 text-muted-foreground">
            {SITE_NAME} mewajibkan pengguna untuk menyetujui ketentuan bahwa isi buatan pengguna tidak memuat
            kebohongan, fitnah, pornografi, kebencian SARA, serta tidak menganjurkan tindakan kekerasan.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">4. Ralat, Koreksi, dan Hak Jawab</h2>
          <p className="mt-2 text-muted-foreground">
            Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Pemberitaan
            Media Siber yang ditetapkan oleh Dewan Pers. Ralat atau koreksi wajib ditautkan pada berita yang diralat.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">5. Pencabutan Berita</h2>
          <p className="mt-2 text-muted-foreground">
            Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi,
            kecuali terkait masalah SARA, kesusilaan, masa depan anak, atau pertimbangan khusus lain yang ditetapkan Dewan Pers.
          </p>
        </section>
      </div>
    </div>
  )
}
