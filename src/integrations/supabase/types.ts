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
      admin_permissions: {
        Row: {
          can_manage_categories: boolean | null
          can_manage_orders: boolean | null
          can_manage_products: boolean | null
          can_manage_recipes: boolean | null
          can_manage_users: boolean | null
          can_manage_videos: boolean | null
          created_at: string
          id: string
          is_super_admin: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          can_manage_categories?: boolean | null
          can_manage_orders?: boolean | null
          can_manage_products?: boolean | null
          can_manage_recipes?: boolean | null
          can_manage_users?: boolean | null
          can_manage_videos?: boolean | null
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          can_manage_categories?: boolean | null
          can_manage_orders?: boolean | null
          can_manage_products?: boolean | null
          can_manage_recipes?: boolean | null
          can_manage_users?: boolean | null
          can_manage_videos?: boolean | null
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      manageable_product_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      manageable_recipe_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      personal_cart_items: {
        Row: {
          created_at: string
          id: string
          personal_cart_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          personal_cart_id: string
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          personal_cart_id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "personal_cart_items_personal_cart_id_fkey"
            columns: ["personal_cart_id"]
            isOneToOne: false
            referencedRelation: "personal_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personal_cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_carts: {
        Row: {
          created_at: string
          id: string
          is_added_to_main_cart: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      preconfigured_carts: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          is_active: boolean | null
          is_featured: boolean | null
          items: Json
          name: string
          total_price: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          items: Json
          name: string
          total_price?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          items?: Json
          name?: string
          total_price?: number | null
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
      recipe_cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          recipe_cart_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          recipe_cart_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          recipe_cart_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_cart_items_recipe_cart_id_fkey"
            columns: ["recipe_cart_id"]
            isOneToOne: false
            referencedRelation: "recipe_user_carts"
            referencedColumns: ["id"]
          },
        ]
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
      recipe_user_carts: {
        Row: {
          cart_name: string
          created_at: string
          id: string
          is_added_to_main_cart: boolean | null
          recipe_id: string
          user_id: string
        }
        Insert: {
          cart_name: string
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          recipe_id: string
          user_id: string
        }
        Update: {
          cart_name?: string
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_user_carts_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
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
      user_cart_items: {
        Row: {
          cart_name: string
          cart_reference_id: string
          cart_reference_type: string
          cart_total_price: number | null
          created_at: string
          id: string
          items_count: number | null
          user_cart_id: string
        }
        Insert: {
          cart_name: string
          cart_reference_id: string
          cart_reference_type: string
          cart_total_price?: number | null
          created_at?: string
          id?: string
          items_count?: number | null
          user_cart_id: string
        }
        Update: {
          cart_name?: string
          cart_reference_id?: string
          cart_reference_type?: string
          cart_total_price?: number | null
          created_at?: string
          id?: string
          items_count?: number | null
          user_cart_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_cart_items_user_cart_id_fkey"
            columns: ["user_cart_id"]
            isOneToOne: false
            referencedRelation: "user_carts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_carts: {
        Row: {
          created_at: string
          id: string
          total_price: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          total_price?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          total_price?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preconfigured_carts: {
        Row: {
          created_at: string
          id: string
          is_added_to_main_cart: boolean | null
          preconfigured_cart_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          preconfigured_cart_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_added_to_main_cart?: boolean | null
          preconfigured_cart_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preconfigured_carts_preconfigured_cart_id_fkey"
            columns: ["preconfigured_cart_id"]
            isOneToOne: false
            referencedRelation: "preconfigured_carts"
            referencedColumns: ["id"]
          },
        ]
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
      has_admin_permission: {
        Args: { permission_type: string }
        Returns: boolean
      }
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
