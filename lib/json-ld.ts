/**
 * Mengonversi objek JavaScript menjadi string JSON yang aman disisipkan ke dalam
 * elemen <script type="application/ld+json"> dengan meng-escape karakter '<'
 * menjadi '\\u003c' guna mencegah kerentanan XSS (script breakout).
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
