import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-7xl font-bold text-primary/15">404</p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-primary">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-muted-foreground">
        Berita atau halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-8 bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground hover:opacity-90"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
