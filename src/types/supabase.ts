/**
 * Supabase Database Types
 * 
 * To generate the latest types from your Supabase project, run:
 * npx supabase gen types typescript --linked > src/types/supabase.ts
 * 
 * Or if you have a specific project URL:
 * npx supabase gen types typescript --project-ref your-project-ref > src/types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Add your table definitions here after generating types from Supabase
      // Example structure:
      // users: {
      //   Row: {
      //     id: string;
      //     email: string;
      //     full_name: string | null;
      //     user_type: 'customer' | 'provider' | 'admin';
      //     created_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     email: string;
      //     full_name?: string | null;
      //     user_type?: 'customer' | 'provider' | 'admin';
      //     created_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     email?: string;
      //     full_name?: string | null;
      //     user_type?: 'customer' | 'provider' | 'admin';
      //     created_at?: string;
      //   };
      // };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for working with Supabase tables
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
