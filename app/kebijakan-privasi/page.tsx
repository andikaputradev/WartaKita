import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: `Kebijakan privasi dan perlindungan data pribadi pengunjung portal ${SITE_NAME}.`,
}

export default function KebijakanPrivasiPage() {
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
            Kebijakan Privasi
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Kebijakan Privasi</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Perlindungan data dan privasi pengguna sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP).
        </p>
      </header>

      <div className="mt-8 space-y-6 text-foreground leading-relaxed text-sm">
        <section>
          <h2 className="text-base font-bold text-primary">1. Informasi yang Dikumpulkan</h2>
          <p className="mt-2 text-muted-foreground">
            Kami mengumpulkan data teknis berupa alamat protokol internet (IP), jenis peramban, waktu akses,
            dan halaman yang dikunjungi guna kepentingan analitik dan stabilitas layanan portal.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">2. Penggunaan Data</h2>
          <p className="mt-2 text-muted-foreground">
            Informasi yang dikumpulkan hanya digunakan untuk mengoptimalkan pengalaman berselancar,
            meningkatkan keandalan sistem, serta mencegah penyalahgunaan teknis terhadap portal {SITE_NAME}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">3. Kuki (Cookies)</h2>
          <p className="mt-2 text-muted-foreground">
            Situs ini memanfaatkan kuki penting untuk fungsionalitas sesi autentikasi dan preferensi tampilan.
            Pengguna dapat mengelola atau menonaktifkan kuki melalui pengaturan peramban masing-masing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary">4. Hak Pemilik Data Pribadi</h2>
          <p className="mt-2 text-muted-foreground">
            Sesuai regulasi UU PDP, setiap pengguna berhak memperoleh kejelasan atas pemrosesan data,
            memperbarui informasi pribadi, serta mengajukan penghapusan data akun yang terdaftar.
          </p>
        </section>
      </div>
    </div>
  )
}
