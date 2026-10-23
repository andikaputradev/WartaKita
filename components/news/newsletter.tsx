'use client'

import { Mail } from 'lucide-react'

export function Newsletter() {
  return (
    <section aria-labelledby="judul-newsletter" className="border-y border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <span
            className="flex size-11 items-center justify-center bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            <Mail className="size-5" />
          </span>
          <h2
            id="judul-newsletter"
            className="mt-4 font-serif text-2xl font-bold text-primary text-balance md:text-3xl"
          >
            Ringkasan Pagi WartaKita
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
            Berita pilihan terpenting hari ini, dikurasi langsung oleh tim redaksi WartaKita dan
            dikirim ke kotak masuk Anda setiap pagi.
          </p>
        </div>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email-newsletter" className="text-sm font-semibold text-foreground">
              Alamat email
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="email-newsletter"
                type="email"
                disabled
                placeholder="nama@email.com"
                aria-describedby="keterangan-newsletter"
                className="h-12 flex-1 cursor-not-allowed border border-input bg-muted/50 px-4 text-sm text-muted-foreground opacity-75 outline-none"
              />
              <button
                type="button"
                disabled
                className="h-12 cursor-not-allowed bg-highlight/60 px-6 text-sm font-semibold text-highlight-foreground"
              >
                Segera Hadir
              </button>
            </div>
            <p id="keterangan-newsletter" className="mt-2 text-xs text-muted-foreground">
              Fitur langganan buletin email sedang dalam tahap integrasi sistem dan akan segera aktif
              pada pembaruan berikutnya.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
