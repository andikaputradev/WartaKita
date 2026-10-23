-- Migration 000002: Row Level Security, RPC Functions, and Storage Setup

-- 1. Helper Function has_role (SECURITY DEFINER with locked search_path)
CREATE OR REPLACE FUNCTION public.has_role(roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND is_active = true
      AND role::text = ANY(roles)
  );
$$;

-- 2. Public Profiles View (Safe columns only, excluding private details)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT
  id,
  display_name,
  slug,
  bio,
  avatar_path,
  role,
  created_at
FROM public.profiles
WHERE is_active = true;

-- Grant permissions to public view if roles exist
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    GRANT SELECT ON public.public_profiles TO anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    GRANT SELECT ON public.public_profiles TO authenticated;
  END IF;
END $$;

-- 3. Atomic View Count RPC
CREATE OR REPLACE FUNCTION public.increment_article_views(article_slug text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  updated_views bigint;
BEGIN
  UPDATE public.articles
  SET view_count = view_count + 1
  WHERE slug = article_slug
    AND status = 'published'
  RETURNING view_count INTO updated_views;

  RETURN coalesce(updated_views, 0);
END;
$$;

-- 4. Enable RLS on ALL Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories FORCE ROW LEVEL SECURITY;

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags FORCE ROW LEVEL SECURITY;

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles FORCE ROW LEVEL SECURITY;

ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags FORCE ROW LEVEL SECURITY;

ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_revisions FORCE ROW LEVEL SECURITY;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log FORCE ROW LEVEL SECURITY;

ALTER TABLE public.featured_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_slots FORCE ROW LEVEL SECURITY;

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaking_news FORCE ROW LEVEL SECURITY;

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects FORCE ROW LEVEL SECURITY;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings FORCE ROW LEVEL SECURITY;

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets FORCE ROW LEVEL SECURITY;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers FORCE ROW LEVEL SECURITY;

-- 5. Profiles Policies
-- Public can read active profiles
CREATE POLICY "profiles_select_public" ON public.profiles
  FOR SELECT
  USING (is_active = true);

-- Users can update their own profile (display_name, bio, avatar)
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- Admins can manage all profiles
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL
  USING (public.has_role(ARRAY['admin']));

-- 6. Categories Policies
-- Public can read active categories
CREATE POLICY "categories_select_public" ON public.categories
  FOR SELECT
  USING (is_active = true OR public.has_role(ARRAY['editor', 'admin']));

-- Editors and Admins can manage categories
CREATE POLICY "categories_write_staff" ON public.categories
  FOR ALL
  USING (public.has_role(ARRAY['editor', 'admin']));

-- 7. Tags Policies
-- Public can read tags
CREATE POLICY "tags_select_public" ON public.tags
  FOR SELECT
  USING (true);

-- Editors, Admins, and Writers can insert tags; Editors and Admins can update/delete
CREATE POLICY "tags_insert_staff" ON public.tags
  FOR INSERT
  WITH CHECK (public.has_role(ARRAY['writer', 'editor', 'admin']));

CREATE POLICY "tags_write_staff" ON public.tags
  FOR UPDATE
  USING (public.has_role(ARRAY['editor', 'admin']));

CREATE POLICY "tags_delete_staff" ON public.tags
  FOR DELETE
  USING (public.has_role(ARRAY['editor', 'admin']));

-- 8. Articles Policies
-- Public can read published articles with published_at <= now()
CREATE POLICY "articles_select_public" ON public.articles
  FOR SELECT
  USING (
    status = 'published' AND
    published_at IS NOT NULL AND
    published_at <= now()
  );

-- Staff can view their own articles or all if editor/admin
CREATE POLICY "articles_select_staff" ON public.articles
  FOR SELECT
  USING (
    (SELECT auth.uid()) IS NOT NULL AND (
      author_id = (SELECT auth.uid()) OR
      public.has_role(ARRAY['editor', 'admin'])
    )
  );

-- Writers can insert draft/in_review articles assigned to themselves
CREATE POLICY "articles_insert_writer" ON public.articles
  FOR INSERT
  WITH CHECK (
    public.has_role(ARRAY['writer']) AND
    author_id = (SELECT auth.uid()) AND
    status IN ('draft', 'in_review')
  );

-- Writers can update their own draft/in_review articles
CREATE POLICY "articles_update_writer" ON public.articles
  FOR UPDATE
  USING (
    public.has_role(ARRAY['writer']) AND
    author_id = (SELECT auth.uid()) AND
    status IN ('draft', 'in_review')
  )
  WITH CHECK (
    author_id = (SELECT auth.uid()) AND
    status IN ('draft', 'in_review')
  );

-- Editors and Admins can insert, update, and publish all articles
CREATE POLICY "articles_write_editor_admin" ON public.articles
  FOR ALL
  USING (public.has_role(ARRAY['editor', 'admin']));

-- 9. Article Tags Policies
CREATE POLICY "article_tags_select_public" ON public.article_tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.articles a
      WHERE a.id = article_id
        AND (
          (a.status = 'published' AND a.published_at <= now())
          OR a.author_id = (SELECT auth.uid())
          OR public.has_role(ARRAY['editor', 'admin'])
        )
    )
  );

CREATE POLICY "article_tags_write_staff" ON public.article_tags
  FOR ALL
  USING (
    public.has_role(ARRAY['editor', 'admin']) OR
    (
      public.has_role(ARRAY['writer']) AND
      EXISTS (
        SELECT 1 FROM public.articles a
        WHERE a.id = article_id
          AND a.author_id = (SELECT auth.uid())
          AND a.status IN ('draft', 'in_review')
      )
    )
  );

-- 10. Article Revisions Policies
CREATE POLICY "revisions_select_staff" ON public.article_revisions
  FOR SELECT
  USING (
    author_id = (SELECT auth.uid()) OR
    public.has_role(ARRAY['editor', 'admin'])
  );

CREATE POLICY "revisions_insert_staff" ON public.article_revisions
  FOR INSERT
  WITH CHECK (
    author_id = (SELECT auth.uid()) OR
    public.has_role(ARRAY['writer', 'editor', 'admin'])
  );

-- 11. Audit Log Policies (Append-only, no update or delete allowed)
CREATE POLICY "audit_log_select_admin" ON public.audit_log
  FOR SELECT
  USING (public.has_role(ARRAY['admin']));

CREATE POLICY "audit_log_insert_authenticated" ON public.audit_log
  FOR INSERT
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- 12. Featured Slots Policies
CREATE POLICY "featured_slots_select_public" ON public.featured_slots
  FOR SELECT
  USING (true);

CREATE POLICY "featured_slots_write_staff" ON public.featured_slots
  FOR ALL
  USING (public.has_role(ARRAY['editor', 'admin']));

-- 13. Breaking News Policies
CREATE POLICY "breaking_news_select_public" ON public.breaking_news
  FOR SELECT
  USING (
    is_active = true AND
    starts_at <= now() AND
    (ends_at IS NULL OR ends_at >= now())
  );

CREATE POLICY "breaking_news_select_staff" ON public.breaking_news
  FOR SELECT
  USING (public.has_role(ARRAY['editor', 'admin']));

CREATE POLICY "breaking_news_write_staff" ON public.breaking_news
  FOR ALL
  USING (public.has_role(ARRAY['editor', 'admin']));

-- 14. Redirects Policies
CREATE POLICY "redirects_select_public" ON public.redirects
  FOR SELECT
  USING (true);

CREATE POLICY "redirects_write_admin" ON public.redirects
  FOR ALL
  USING (public.has_role(ARRAY['admin']));

-- 15. Site Settings Policies
CREATE POLICY "site_settings_select_public" ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "site_settings_write_admin" ON public.site_settings
  FOR ALL
  USING (public.has_role(ARRAY['admin']));

-- 16. Media Assets Policies
CREATE POLICY "media_assets_select_public" ON public.media_assets
  FOR SELECT
  USING (true);

CREATE POLICY "media_assets_insert_staff" ON public.media_assets
  FOR INSERT
  WITH CHECK (
    public.has_role(ARRAY['editor', 'admin']) OR
    (public.has_role(ARRAY['writer']) AND uploaded_by = (SELECT auth.uid()))
  );

CREATE POLICY "media_assets_delete_staff" ON public.media_assets
  FOR DELETE
  USING (
    public.has_role(ARRAY['editor', 'admin']) OR
    (public.has_role(ARRAY['writer']) AND uploaded_by = (SELECT auth.uid()))
  );

-- 17. Newsletter Subscribers Policies
-- Anyone can subscribe
CREATE POLICY "newsletter_insert_public" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (email IS NOT NULL AND status IN ('pending', 'active'));

-- Only admins can view subscriber lists
CREATE POLICY "newsletter_select_admin" ON public.newsletter_subscribers
  FOR SELECT
  USING (public.has_role(ARRAY['admin']));

-- Admins can update/delete subscribers
CREATE POLICY "newsletter_write_admin" ON public.newsletter_subscribers
  FOR ALL
  USING (public.has_role(ARRAY['admin']));
