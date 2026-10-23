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
  github: string | null
  linkedin: string | null
  telegram: string | null
  tiktok: string | null
}

export interface SiteContact {
  leadName: string
  email: string | null
  address: string | null
  phone: string | null
  website: string | null
  socials: SiteSocials
}

export const siteContact: SiteContact = {
  leadName: 'Wahyu Andika Putra',
  email: process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() || 'wahyuandikaputra.co.id@gmail.com',
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS?.trim() || 'Wonosobo / Semarang, Jawa Tengah, Indonesia',
  phone: process.env.NEXT_PUBLIC_SITE_PHONE?.trim() || '+6287730139582',
  website: 'https://andikadev.com',
  socials: {
    twitter: process.env.NEXT_PUBLIC_SITE_TWITTER?.trim() || 'https://x.com/andikaputradev',
    facebook: process.env.NEXT_PUBLIC_SITE_FACEBOOK?.trim() || 'https://facebook.com/andikaputradev',
    instagram: process.env.NEXT_PUBLIC_SITE_INSTAGRAM?.trim() || 'https://instagram.com/andikaputradev',
    youtube: process.env.NEXT_PUBLIC_SITE_YOUTUBE?.trim() || null,
    github: 'https://github.com/andikaputradev',
    linkedin: 'https://linkedin.com/in/wahyu-andika-putra',
    telegram: 'https://t.me/andikaputradev',
    tiktok: 'https://tiktok.com/@andikaputradev',
  },
}
