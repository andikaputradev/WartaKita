import { z } from 'zod'

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wartakita.my.id'

const siteUrlSchema = z
  .string()
  .min(1, 'NEXT_PUBLIC_SITE_URL tidak boleh kosong')
  .url('NEXT_PUBLIC_SITE_URL harus berupa URL yang valid')
  .refine(
    (url) => {
      if (process.env.NODE_ENV === 'production') {
        return url.startsWith('https://')
      }
      return url.startsWith('http://') || url.startsWith('https://')
    },
    {
      message: 'NEXT_PUBLIC_SITE_URL wajib menggunakan protokol https di lingkungan produksi',
    },
  )
  .transform((url) => url.replace(/\/+$/, ''))

const parsedUrl = siteUrlSchema.safeParse(rawSiteUrl)

export const SITE_URL: string = parsedUrl.success
  ? parsedUrl.data
  : 'https://wartakita.my.id'

export const SITE_NAME = 'WartaKita'
export const SITE_TAGLINE = 'Kabar Terpercaya, Dekat dengan Kita'
export const SITE_DESCRIPTION =
  'WartaKita menyajikan berita terkini nasional, daerah, politik, ekonomi, olahraga, teknologi, dan gaya hidup dari seluruh penjuru Indonesia.'

export const isIndexingEnabled: boolean =
  process.env.NEXT_PUBLIC_INDEXING_ENABLED === 'true'

export const isAdsEnabled: boolean =
  process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

export interface SiteSocials {
  twitter: string | null
  facebook: string | null
  instagram: string | null
  youtube: string | null
}

export interface SiteContact {
  email: string | null
  address: string | null
  phone: string | null
  socials: SiteSocials
}

export const siteContact: SiteContact = {
  email: process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() || null,
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS?.trim() || null,
  phone: process.env.NEXT_PUBLIC_SITE_PHONE?.trim() || null,
  socials: {
    twitter: process.env.NEXT_PUBLIC_SITE_TWITTER?.trim() || null,
    facebook: process.env.NEXT_PUBLIC_SITE_FACEBOOK?.trim() || null,
    instagram: process.env.NEXT_PUBLIC_SITE_INSTAGRAM?.trim() || null,
    youtube: process.env.NEXT_PUBLIC_SITE_YOUTUBE?.trim() || null,
  },
}
