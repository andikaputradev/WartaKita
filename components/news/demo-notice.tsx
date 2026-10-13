type DemoNoticeProps = {
  className?: string
}

export function DemoNotice({ className = "" }: DemoNoticeProps) {
  return (
    <aside
      role="note"
      className={`rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950 ${className}`}
    >
      <strong className="font-semibold">Mode demonstrasi:</strong>{" "}
      konten berita di halaman ini masih berupa data contoh dan belum diverifikasi sebagai berita aktual.
      Ganti dengan berita terverifikasi sebelum situs dipublikasikan untuk umum.
    </aside>
  )
}
