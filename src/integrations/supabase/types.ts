export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          cart_type: string | null
          created_at: string
          id: string
          preconfigured_cart_id: string | null
          product_id: string
          quantity: number
          recipe_id: string | null
          user_id: string
        }
        Insert: {
          cart_type?: string | null
          created_at?: string
          id?: string
          preconfigured_cart_id?: string | null
          product_id: string
          quantity?: number
          recipe_id?: string | null
          user_id: string
        }
        Update: {
          cart_type?: string | null
          created_at?: string
          id?: string
          preconfigured_cart_id?: string | null
          product_id?: string
          quantity?: number
          recipe_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      preconfigured_carts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          items: Json
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          items: Json
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          items?: Json
          name?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          id: string
          image: string | null
          in_stock: boolean | null
          name: string
          price: number
          promotion: Json | null
          rating: number | null
          unit: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          image?: string | null
          in_stock?: boolean | null
          name: string
          price: number
          promotion?: Json | null
          rating?: number | null
          unit: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          image?: string | null
          in_stock?: boolean | null
          name?: string
          price?: number
          promotion?: Json | null
          rating?: number | null
          unit?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          photo_url: string | null
          preferences: Json | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          photo_url?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          photo_url?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recipe_carts: {
        Row: {
          cart_items: string[] | null
          created_at: string
          id: string
          recipe_id: string
          recipe_name: string
          user_id: string
        }
        Insert: {
          cart_items?: string[] | null
          created_at?: string
          id?: string
          recipe_id: string
          recipe_name: string
          user_id: string
        }
        Update: {
          cart_items?: string[] | null
          created_at?: string
          id?: string
          recipe_id?: string
          recipe_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_carts_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          category: string
          cook_time: number
          created_at: string
          created_by: string
          description: string | null
          difficulty: string | null
          id: string
          image: string | null
          ingredients: Json
          instructions: string[]
          rating: number | null
          servings: number
          title: string
          video_id: string | null
        }
        Insert: {
          category: string
          cook_time: number
          created_at?: string
          created_by: string
          description?: string | null
          difficulty?: string | null
          id?: string
          image?: string | null
          ingredients: Json
          instructions: string[]
          rating?: number | null
          servings: number
          title: string
          video_id?: string | null
        }
        Update: {
          category?: string
          cook_time?: number
          created_at?: string
          created_by?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          image?: string | null
          ingredients?: Json
          instructions?: string[]
          rating?: number | null
          servings?: number
          title?: string
          video_id?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          duration: string | null
          id: string
          likes: number | null
          recipe_id: string | null
          thumbnail: string | null
          title: string
          video_url: string | null
          views: number | null
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          duration?: string | null
          id?: string
          likes?: number | null
          recipe_id?: string | null
          thumbnail?: string | null
          title: string
          video_url?: string | null
          views?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          duration?: string | null
          id?: string
          likes?: number | null
          recipe_id?: string | null
          thumbnail?: string | null
          title?: string
          video_url?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
