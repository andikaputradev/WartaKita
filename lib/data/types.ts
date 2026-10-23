import { z } from 'zod'
import type { CategorySlug } from '@/lib/news'

export const ArticleSlugSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh memuat huruf kecil, angka, dan tanda hubung tunggal')

export const CategorySlugSchema = z.string().min(2).max(50)

export const SearchQuerySchema = z.string().trim().min(1).max(200)

export const PaginationQuerySchema = z.object({
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0),
  categorySlug: CategorySlugSchema.optional(),
  tagSlug: z.string().optional(),
})

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>

export interface DomainArticle {
  id?: string
  slug: string
  title: string
  excerpt: string
  category: CategorySlug
  categoryName?: string
  province?: string
  author: string
  authorRole: string
  publishedAt: string
  readingMinutes: number
  image: string
  imageAlt: string
  imageCaption: string
  tags: string[]
  views: number
  body: string[]
  bodyHtml?: string
  seoTitle?: string
  seoDescription?: string
  canonicalOverride?: string
  noindex?: boolean
  ogImagePath?: string
  is_demo?: boolean
}

export interface DomainCategory {
  id?: string
  slug: CategorySlug
  name: string
  description: string
  sortOrder?: number
  seoTitle?: string
  seoDescription?: string
}

export interface DomainBreakingNews {
  id?: string
  text: string
  href?: string
  startsAt?: string
  endsAt?: string
}
