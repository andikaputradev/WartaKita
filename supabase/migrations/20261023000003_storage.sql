-- Migration 000003: Storage Bucket Configuration and Policies

-- 1. Create Media Storage Bucket if storage schema exists
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'media',
      'media',
      true,
      5242880, -- 5 MB
      ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
    )
    ON CONFLICT (id) DO UPDATE SET
      public = true,
      file_size_limit = 5242880,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

    -- Enable RLS on storage.objects
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    -- Drop any conflicting policies
    DROP POLICY IF EXISTS "media_bucket_select_public" ON storage.objects;
    DROP POLICY IF EXISTS "media_bucket_insert_staff" ON storage.objects;
    DROP POLICY IF EXISTS "media_bucket_update_staff" ON storage.objects;
    DROP POLICY IF EXISTS "media_bucket_delete_staff" ON storage.objects;

    -- Public read policy for media bucket
    CREATE POLICY "media_bucket_select_public" ON storage.objects
      FOR SELECT
      USING (bucket_id = 'media');

    -- Insert policy: editors/admins can upload anywhere, writers only in their own folder
    CREATE POLICY "media_bucket_insert_staff" ON storage.objects
      FOR INSERT
      WITH CHECK (
        bucket_id = 'media' AND (
          public.has_role(ARRAY['editor', 'admin']) OR
          (
            public.has_role(ARRAY['writer']) AND
            (storage.foldername(name))[1] = (SELECT auth.uid())::text
          )
        )
      );

    -- Update policy
    CREATE POLICY "media_bucket_update_staff" ON storage.objects
      FOR UPDATE
      USING (
        bucket_id = 'media' AND (
          public.has_role(ARRAY['editor', 'admin']) OR
          (
            public.has_role(ARRAY['writer']) AND
            (storage.foldername(name))[1] = (SELECT auth.uid())::text
          )
        )
      );

    -- Delete policy
    CREATE POLICY "media_bucket_delete_staff" ON storage.objects
      FOR DELETE
      USING (
        bucket_id = 'media' AND (
          public.has_role(ARRAY['editor', 'admin']) OR
          (
            public.has_role(ARRAY['writer']) AND
            (storage.foldername(name))[1] = (SELECT auth.uid())::text
          )
        )
      );
  END IF;
END $$;
