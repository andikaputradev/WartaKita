export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      article_revisions: {
        Row: {
          article_id: string
          author_id: string | null
          body_html: string
          body_json: NonNullable<Json>
          created_at: string
          id: string
          snapshot_reason: string | null
          title: string
        }
        ComputedFields: never
        Insert: {
          article_id: string
          author_id?: string | null
          body_html: string
          body_json: NonNullable<Json>
          created_at?: string
          id?: string
          snapshot_reason?: string | null
          title: string
        }
        Update: {
          article_id?: string
          author_id?: string | null
          body_html?: string
          body_json?: NonNullable<Json>
          created_at?: string
          id?: string
          snapshot_reason?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'article_revisions_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'article_revisions_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'article_revisions_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'public_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        ComputedFields: never
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'article_tags_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'article_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          body_html: string
          body_json: NonNullable<Json>
          canonical_override: string | null
          category_id: string | null
          cover_alt: string | null
          cover_caption: string | null
          cover_credit: string | null
          cover_path: string | null
          created_at: string
          excerpt: string
          id: string
          is_demo: boolean
          noindex: boolean
          og_image_path: string | null
          province: string | null
          published_at: string | null
          reading_minutes: number
          search: unknown
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database['public']['Enums']['article_status']
          title: string
          updated_at: string
          view_count: number
        }
        ComputedFields: never
        Insert: {
          author_id?: string | null
          body_html?: string
          body_json?: NonNullable<Json>
          canonical_override?: string | null
          category_id?: string | null
          cover_alt?: string | null
          cover_caption?: string | null
          cover_credit?: string | null
          cover_path?: string | null
          created_at?: string
          excerpt: string
          id?: string
          is_demo?: boolean
          noindex?: boolean
          og_image_path?: string | null
          province?: string | null
          published_at?: string | null
          reading_minutes?: number
          search?: never
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database['public']['Enums']['article_status']
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string | null
          body_html?: string
          body_json?: NonNullable<Json>
          canonical_override?: string | null
          category_id?: string | null
          cover_alt?: string | null
          cover_caption?: string | null
          cover_credit?: string | null
          cover_path?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          is_demo?: boolean
          noindex?: boolean
          og_image_path?: string | null
          province?: string | null
          published_at?: string | null
          reading_minutes?: number
          search?: never
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database['public']['Enums']['article_status']
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'articles_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'articles_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'public_profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'articles_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          diff: Json | null
          entity: string
          entity_id: string | null
          id: string
        }
        ComputedFields: never
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          diff?: Json | null
          entity: string
          entity_id?: string | null
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          diff?: Json | null
          entity?: string
          entity_id?: string | null
          id?: string
        }
        Relationships: []
      }
      breaking_news: {
        Row: {
          ends_at: string | null
          href: string
          id: string
          is_active: boolean
          starts_at: string
          text: string
        }
        ComputedFields: never
        Insert: {
          ends_at?: string | null
          href: string
          id?: string
          is_active?: boolean
          starts_at?: string
          text: string
        }
        Update: {
          ends_at?: string | null
          href?: string
          id?: string
          is_active?: boolean
          starts_at?: string
          text?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          description: string | null
          id: string
          is_active: boolean
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
        }
        ComputedFields: never
        Insert: {
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      featured_slots: {
        Row: {
          article_id: string
          id: string
          position: number
          slot_key: string
        }
        ComputedFields: never
        Insert: {
          article_id: string
          id?: string
          position?: number
          slot_key: string
        }
        Update: {
          article_id?: string
          id?: string
          position?: number
          slot_key?: string
        }
        Relationships: [
          {
            foreignKeyName: 'featured_slots_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
        ]
      }
      media_assets: {
        Row: {
          alt: string | null
          created_at: string
          height: number | null
          id: string
          mime: string
          path: string
          size: number
          uploaded_by: string | null
          width: number | null
        }
        ComputedFields: never
        Insert: {
          alt?: string | null
          created_at?: string
          height?: number | null
          id?: string
          mime: string
          path: string
          size: number
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt?: string | null
          created_at?: string
          height?: number | null
          id?: string
          mime?: string
          path?: string
          size?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'media_assets_uploaded_by_fkey'
            columns: ['uploaded_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_assets_uploaded_by_fkey'
            columns: ['uploaded_by']
            isOneToOne: false
            referencedRelation: 'public_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          confirm_token_hash: string | null
          consent_text_version: string
          consented_at: string
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          status: Database['public']['Enums']['subscriber_status']
        }
        ComputedFields: never
        Insert: {
          confirm_token_hash?: string | null
          consent_text_version: string
          consented_at?: string
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          status?: Database['public']['Enums']['subscriber_status']
        }
        Update: {
          confirm_token_hash?: string | null
          consent_text_version?: string
          consented_at?: string
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          status?: Database['public']['Enums']['subscriber_status']
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          role: Database['public']['Enums']['user_role']
          slug: string
        }
        ComputedFields: never
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id: string
          is_active?: boolean
          role?: Database['public']['Enums']['user_role']
          slug: string
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          role?: Database['public']['Enums']['user_role']
          slug?: string
        }
        Relationships: []
      }
      redirects: {
        Row: {
          from_path: string
          hit_count: number
          id: string
          status_code: number
          to_path: string
        }
        ComputedFields: never
        Insert: {
          from_path: string
          hit_count?: number
          id?: string
          status_code: number
          to_path: string
        }
        Update: {
          from_path?: string
          hit_count?: number
          id?: string
          status_code?: number
          to_path?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: NonNullable<Json>
        }
        ComputedFields: never
        Insert: {
          key: string
          updated_at?: string
          value: NonNullable<Json>
        }
        Update: {
          key?: string
          updated_at?: string
          value?: NonNullable<Json>
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        ComputedFields: never
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string | null
          role: Database['public']['Enums']['user_role'] | null
          slug: string | null
        }
        ComputedFields: never
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          role?: Database['public']['Enums']['user_role'] | null
          slug?: string | null
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          role?: Database['public']['Enums']['user_role'] | null
          slug?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      dearmor: { Args: { '': string }; Returns: string }
      fips_mode: { Args: Record<PropertyKey, never>; Returns: boolean }
      gen_random_uuid: { Args: Record<PropertyKey, never>; Returns: string }
      gen_salt: { Args: { '': string }; Returns: string }
      has_role: { Args: { roles: string[] }; Returns: boolean }
      increment_article_views: { Args: { article_slug: string }; Returns: number }
      pgp_armor_headers: { Args: { '': string }; Returns: Record<string, unknown>[] }
      show_limit: { Args: Record<PropertyKey, never>; Returns: number }
      show_trgm: { Args: { '': string }; Returns: string[] }
    }
    Enums: {
      article_status: 'draft' | 'in_review' | 'published' | 'archived'
      subscriber_status: 'pending' | 'active' | 'unsubscribed'
      user_role: 'admin' | 'editor' | 'writer'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      article_status: ['draft', 'in_review', 'published', 'archived'],
      subscriber_status: ['pending', 'active', 'unsubscribed'],
      user_role: ['admin', 'editor', 'writer'],
    },
  },
} as const
