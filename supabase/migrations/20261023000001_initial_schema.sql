-- Migration 000001: Initial Schema for WartaKita
-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enum Types
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('admin', 'editor', 'writer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.article_status AS ENUM ('draft', 'in_review', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.subscriber_status AS ENUM ('pending', 'active', 'unsubscribed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 1. Profiles Table (FK to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  bio text,
  avatar_path text,
  role public.user_role NOT NULL DEFAULT 'writer',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Migration from legacy admin_users if present
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'admin_users'
  ) THEN
    INSERT INTO public.profiles (id, display_name, slug, role, is_active)
    SELECT
      user_id,
      'Administrator',
      'admin-' || substr(user_id::text, 1, 8),
      'admin'::public.user_role,
      true
    FROM public.admin_users
    ON CONFLICT (id) DO UPDATE SET role = 'admin';

    DROP TABLE public.admin_users;
  END IF;
END $$;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  seo_title text,
  seo_description text
);

-- 3. Tags Table
CREATE TABLE IF NOT EXISTS public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL
);

-- 4. Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]{3,120}$'),
  title text NOT NULL CHECK (char_length(title) <= 200),
  excerpt text NOT NULL CHECK (char_length(excerpt) <= 300),
  body_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  body_html text NOT NULL DEFAULT '',
  status public.article_status NOT NULL DEFAULT 'draft',
  category_id uuid REFERENCES public.categories(id) ON DELETE RESTRICT,
  province text,
  author_id uuid REFERENCES public.profiles(id) ON DELETE RESTRICT,
  cover_path text,
  cover_alt text,
  cover_caption text,
  cover_credit text,
  seo_title text,
  seo_description text,
  canonical_override text,
  noindex boolean NOT NULL DEFAULT false,
  og_image_path text,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  reading_minutes integer NOT NULL DEFAULT 1,
  view_count bigint NOT NULL DEFAULT 0,
  is_demo boolean NOT NULL DEFAULT false,
  search tsvector GENERATED ALWAYS AS (
    to_tsvector('indonesian', coalesce(title, '') || ' ' || coalesce(excerpt, ''))
  ) STORED,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT articles_published_requirements CHECK (
    status != 'published' OR (
      published_at IS NOT NULL AND
      cover_alt IS NOT NULL AND
      category_id IS NOT NULL AND
      author_id IS NOT NULL
    )
  )
);

-- 5. Article Tags Pivot Table
CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- 6. Article Revisions Table (Snapshots)
CREATE TABLE IF NOT EXISTS public.article_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  body_json jsonb NOT NULL,
  body_html text NOT NULL,
  snapshot_reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 7. Audit Log Table (Append only, immutable)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id text,
  diff jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8. Featured Slots Table
CREATE TABLE IF NOT EXISTS public.featured_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_key text NOT NULL,
  position integer NOT NULL DEFAULT 1,
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (slot_key, position)
);

-- 9. Breaking News Table
CREATE TABLE IF NOT EXISTS public.breaking_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  href text NOT NULL,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  is_active boolean NOT NULL DEFAULT true
);

-- 10. Redirects Table
CREATE TABLE IF NOT EXISTS public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text UNIQUE NOT NULL,
  to_path text NOT NULL,
  status_code integer NOT NULL CHECK (status_code IN (301, 302, 410)),
  hit_count bigint NOT NULL DEFAULT 0
);

-- 11. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 12. Media Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text UNIQUE NOT NULL,
  mime text NOT NULL CHECK (mime IN ('image/jpeg', 'image/png', 'image/webp', 'image/avif')),
  size bigint NOT NULL CHECK (size <= 5242880),
  width integer,
  height integer,
  alt text,
  uploaded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 13. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status public.subscriber_status NOT NULL DEFAULT 'pending',
  consent_text_version text NOT NULL,
  consented_at timestamptz NOT NULL DEFAULT now(),
  confirm_token_hash text,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_status_published_at ON public.articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category_published_at ON public.articles(category_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING gin(search);
CREATE INDEX IF NOT EXISTS idx_articles_title_trgm ON public.articles USING gin(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag_id ON public.article_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_article_id ON public.article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_featured_slots_slot_pos ON public.featured_slots(slot_key, position);
CREATE INDEX IF NOT EXISTS idx_breaking_news_active ON public.breaking_news(is_active, starts_at, ends_at);

-- Trigger for updated_at on articles
CREATE OR REPLACE FUNCTION public.set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_articles_updated_at ON public.articles;
CREATE TRIGGER trigger_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at_column();
