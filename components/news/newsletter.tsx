'use client'

import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    setStatus(valid ? 'success' : 'error')
  }

  return (
    <section aria-labelledby="judul-newsletter" className="border-y border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <span className="flex size-11 items-center justify-center bg-primary text-primary-foreground" aria-hidden="true">
            <Mail className="size-5" />
          </span>
          <h2 id="judul-newsletter" className="mt-4 font-serif text-2xl font-bold text-primary text-balance md:text-3xl">
            Ringkasan Pagi Nusantara
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
            Lima berita terpenting hari ini, dikurasi redaksi dan dikirim ke kotak masuk Anda setiap pukul 06.00 WIB.
          </p>
        </div>

        <div>
          {status === 'success' ? (
            <div className="flex items-start gap-3 border border-primary/20 bg-background p-5" role="status">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">Terima kasih telah berlangganan!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ini adalah prototipe demo — alamat {email} tidak disimpan atau dikirimi email.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="email-newsletter" className="text-sm font-semibold text-foreground">
                Alamat email
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="email-newsletter"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="nama@email.com"
                  aria-invalid={status === 'error'}
                  aria-describedby="keterangan-newsletter"
                  className="h-12 flex-1 border border-input bg-background px-4 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
                />
                <button
                  type="submit"
                  className="h-12 bg-highlight px-6 text-sm font-semibold text-highlight-foreground transition-opacity hover:opacity-90"
                >
                  Berlangganan
                </button>
              </div>
              <p id="keterangan-newsletter" className="mt-2 text-xs text-muted-foreground" aria-live="polite">
                {status === 'error'
                  ? 'Mohon masukkan alamat email yang valid.'
                  : 'Formulir demo: data tidak disimpan. Anda dapat berhenti berlangganan kapan saja.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
