export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      place_budget_info: {
        Row: {
          avg_activity_cost_per_day: number | null
          avg_food_cost_per_day: number | null
          avg_room_cost_per_night: number | null
          avg_transport_cost_per_day: number | null
          currency: string | null
          id: string
          place_id: string
          updated_at: string
        }
        Insert: {
          avg_activity_cost_per_day?: number | null
          avg_food_cost_per_day?: number | null
          avg_room_cost_per_night?: number | null
          avg_transport_cost_per_day?: number | null
          currency?: string | null
          id?: string
          place_id: string
          updated_at?: string
        }
        Update: {
          avg_activity_cost_per_day?: number | null
          avg_food_cost_per_day?: number | null
          avg_room_cost_per_night?: number | null
          avg_transport_cost_per_day?: number | null
          currency?: string | null
          id?: string
          place_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "place_budget_info_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "tourist_places"
            referencedColumns: ["id"]
          },
        ]
      }
      place_foods: {
        Row: {
          created_at: string
          created_by: string | null
          cuisine_type: string | null
          description: string | null
          id: string
          image_url: string | null
          is_vegetarian: boolean | null
          name: string
          place_id: string
          price_range: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_vegetarian?: boolean | null
          name: string
          place_id: string
          price_range?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_vegetarian?: boolean | null
          name?: string
          place_id?: string
          price_range?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "place_foods_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "tourist_places"
            referencedColumns: ["id"]
          },
        ]
      }
      place_rooms: {
        Row: {
          amenities: string[] | null
          available: boolean | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          max_guests: number | null
          name: string
          place_id: string
          price_per_night: number
          rating: number | null
          room_type: string | null
          total_reviews: number | null
        }
        Insert: {
          amenities?: string[] | null
          available?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          max_guests?: number | null
          name: string
          place_id: string
          price_per_night?: number
          rating?: number | null
          room_type?: string | null
          total_reviews?: number | null
        }
        Update: {
          amenities?: string[] | null
          available?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          max_guests?: number | null
          name?: string
          place_id?: string
          price_per_night?: number
          rating?: number | null
          room_type?: string | null
          total_reviews?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "place_rooms_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "tourist_places"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          emergency_contact: string | null
          full_name: string | null
          id: string
          interests: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          interests?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          interests?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tourist_places: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          highlights: string[] | null
          id: string
          image_url: string | null
          lat: number
          lng: number
          name: string
          region: string
          starting_price: number
          updated_at: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          lat?: number
          lng?: number
          name: string
          region: string
          starting_price?: number
          updated_at?: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          lat?: number
          lng?: number
          name?: string
          region?: string
          starting_price?: number
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "partner"],
    },
  },
} as const
