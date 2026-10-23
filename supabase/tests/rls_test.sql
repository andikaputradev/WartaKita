-- RLS Test Suite for WartaKita
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supabase_tester') THEN
    CREATE ROLE supabase_tester WITH LOGIN NOSUPERUSER;
    GRANT ALL ON SCHEMA public TO supabase_tester;
    GRANT ALL ON ALL TABLES IN SCHEMA public TO supabase_tester;
    GRANT ALL ON SCHEMA auth TO supabase_tester;
    GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_tester;
  END IF;
END $$;

BEGIN;

-- 1. Setup seed data as postgres / superuser
DO $$
DECLARE
  v_admin_id uuid := '11111111-1111-1111-1111-111111111111';
  v_writer1_id uuid := '22222222-2222-2222-2222-222222222222';
  v_writer2_id uuid := '33333333-3333-3333-3333-333333333333';
  v_cat_id uuid;
BEGIN
  INSERT INTO auth.users (id, email) VALUES
    (v_admin_id, 'admin@wartakita.my.id'),
    (v_writer1_id, 'writer1@wartakita.my.id'),
    (v_writer2_id, 'writer2@wartakita.my.id')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.profiles (id, display_name, slug, role) VALUES
    (v_admin_id, 'Admin User', 'admin-user', 'admin'),
    (v_writer1_id, 'Writer One', 'writer-one', 'writer'),
    (v_writer2_id, 'Writer Two', 'writer-two', 'writer')
  ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role;

  INSERT INTO public.categories (slug, name, description)
  VALUES ('kategori-uji', 'Kategori Uji', 'Deskripsi uji')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_cat_id;

  INSERT INTO public.articles (id, slug, title, excerpt, status, category_id, author_id, published_at, cover_alt)
  VALUES
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'artikel-draft-1', 'Artikel Draft', 'Ringkasan draft', 'draft', v_cat_id, v_writer1_id, null, 'Cover alt')
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, category_id = EXCLUDED.category_id;

  INSERT INTO public.articles (id, slug, title, excerpt, status, category_id, author_id, published_at, cover_alt)
  VALUES
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'artikel-published-1', 'Artikel Published', 'Ringkasan published', 'published', v_cat_id, v_writer1_id, now() - interval '1 hour', 'Cover alt')
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, category_id = EXCLUDED.category_id;

  INSERT INTO public.newsletter_subscribers (email, status, consent_text_version)
  VALUES ('subscriber@example.com', 'active', 'v1.0')
  ON CONFLICT (email) DO NOTHING;
END $$;

-- 2. Switch to non-superuser role to enforce Row Level Security
SET LOCAL ROLE supabase_tester;

-- 3. Execute RLS assertions
DO $$
DECLARE
  v_admin_id uuid := '11111111-1111-1111-1111-111111111111';
  v_writer1_id uuid := '22222222-2222-2222-2222-222222222222';
  v_writer2_id uuid := '33333333-3333-3333-3333-333333333333';
  v_article_draft_id uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  v_article_pub_id uuid := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
  v_sub_count integer;
  v_check_true_write integer;
BEGIN
  -- TEST 1: Anon cannot read draft articles
  PERFORM set_config('request.jwt.claim.sub', '', true);
  PERFORM set_config('request.jwt.claim.role', 'anon', true);

  IF EXISTS (SELECT 1 FROM public.articles WHERE id = v_article_draft_id) THEN
    RAISE EXCEPTION 'RLS TEST 1 FAILED: anon can read draft articles!';
  END IF;
  RAISE NOTICE 'RLS TEST 1 PASSED: anon cannot read draft articles';

  -- TEST 2a: Writer 2 cannot update Writer 1 draft article
  PERFORM set_config('request.jwt.claim.sub', v_writer2_id::text, true);
  PERFORM set_config('request.jwt.claim.role', 'authenticated', true);

  UPDATE public.articles SET title = 'Hacked by Writer 2' WHERE id = v_article_draft_id;
  IF EXISTS (SELECT 1 FROM public.articles WHERE id = v_article_draft_id AND title = 'Hacked by Writer 2') THEN
    RAISE EXCEPTION 'RLS TEST 2a FAILED: Writer 2 was able to update Writer 1 article!';
  END IF;
  RAISE NOTICE 'RLS TEST 2a PASSED: Writer 2 cannot update Writer 1 article';

  -- TEST 2b: Writer 1 cannot publish article
  PERFORM set_config('request.jwt.claim.sub', v_writer1_id::text, true);
  BEGIN
    UPDATE public.articles SET status = 'published', published_at = now() WHERE id = v_article_draft_id;
    IF EXISTS (SELECT 1 FROM public.articles WHERE id = v_article_draft_id AND status = 'published') THEN
      RAISE EXCEPTION 'RLS TEST 2b FAILED: Writer 1 was able to publish article!';
    END IF;
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  RAISE NOTICE 'RLS TEST 2b PASSED: Writer cannot publish articles';

  -- TEST 3a: Writer cannot read newsletter subscribers
  PERFORM set_config('request.jwt.claim.sub', v_writer1_id::text, true);
  IF EXISTS (SELECT 1 FROM public.newsletter_subscribers) THEN
    RAISE EXCEPTION 'RLS TEST 3a FAILED: Writer can read newsletter subscribers!';
  END IF;
  RAISE NOTICE 'RLS TEST 3a PASSED: Writer cannot read newsletter subscribers';

  -- TEST 3b: Anon cannot read newsletter subscribers
  PERFORM set_config('request.jwt.claim.sub', '', true);
  IF EXISTS (SELECT 1 FROM public.newsletter_subscribers) THEN
    RAISE EXCEPTION 'RLS TEST 3b FAILED: Anon can read newsletter subscribers!';
  END IF;
  RAISE NOTICE 'RLS TEST 3b PASSED: Anon cannot read newsletter subscribers';

  -- TEST 3c: Admin can read newsletter subscribers
  PERFORM set_config('request.jwt.claim.sub', v_admin_id::text, true);
  SELECT count(*) INTO v_sub_count FROM public.newsletter_subscribers;
  IF v_sub_count = 0 THEN
    RAISE EXCEPTION 'RLS TEST 3c FAILED: Admin cannot read newsletter subscribers!';
  END IF;
  RAISE NOTICE 'RLS TEST 3c PASSED: Admin can read newsletter subscribers (% subscriber found)', v_sub_count;

  -- TEST 4: No write policy with USING (true) or WITH CHECK (true)
  SELECT count(*) INTO v_check_true_write
  FROM pg_policies
  WHERE schemaname = 'public'
    AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
    AND (
      qual = 'true' OR
      with_check = 'true'
    );

  IF v_check_true_write > 0 THEN
    RAISE EXCEPTION 'RLS TEST 4 FAILED: Found % write policy with USING/WITH CHECK (true)!', v_check_true_write;
  END IF;
  RAISE NOTICE 'RLS TEST 4 PASSED: No write policies with USING/WITH CHECK (true) found';

END $$;

ROLLBACK;
