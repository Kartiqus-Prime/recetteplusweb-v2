
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserCart {
  id: string;
  user_id: string;
  total_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserCartItem {
  id: string;
  user_cart_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  cart_type: 'personal' | 'recipe' | 'preconfigured';
  source_cart_id: string | null;
  source_cart_name: string | null;
  created_at: string;
  products?: {
    name: string;
    image: string | null;
    category: string;
  };
}

export interface RecipeUserCart {
  id: string;
  user_id: string;
  recipe_id: string;
  cart_name: string;
  is_added_to_main_cart: boolean | null;
  created_at: string;
}

export interface PersonalCart {
  id: string;
  user_id: string;
  is_added_to_main_cart: boolean | null;
  created_at: string;
  updated_at: string;
}

// Hook pour le panier principal
export const useMainCart = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['mainCart', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_carts')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!currentUser,
  });

  const cartItemsQuery = useQuery({
    queryKey: ['mainCartItems', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_cart_items')
        .select(`
          *,
          products:product_id (
            name,
            image,
            category
          )
        `)
        .eq('user_cart_id', cartQuery.data?.id || '')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserCartItem[];
    },
    enabled: !!currentUser && !!cartQuery.data?.id,
  });

  const createCartMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_carts')
        .insert([{ user_id: currentUser.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainCart', currentUser?.id] });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const { data, error } = await supabase
        .from('user_cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainCartItems', currentUser?.id] });
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('user_cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainCartItems', currentUser?.id] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été retiré de votre panier",
      });
    },
  });

  return {
    cart: cartQuery.data,
    cartItems: cartItemsQuery.data || [],
    isLoading: cartQuery.isLoading || cartItemsQuery.isLoading,
    createCart: createCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeCartItem: removeCartItemMutation.mutate,
    isCreatingCart: createCartMutation.isPending,
    isUpdating: updateCartItemMutation.isPending,
    isRemoving: removeCartItemMutation.isPending,
  };
};

// Hook pour les paniers recette
export const useRecipeUserCarts = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const recipeCartsQuery = useQuery({
    queryKey: ['recipeUserCarts', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipe_user_carts')
        .select(`
          *,
          recipes:recipe_id (
            title,
            image
          )
        `)
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentUser,
  });

  const createRecipeCartMutation = useMutation({
    mutationFn: async ({ recipeId, cartName, ingredients }: {
      recipeId: string;
      cartName: string;
      ingredients: Array<{ productId: string; quantity: number; }>;
    }) => {
      if (!currentUser) throw new Error('User not authenticated');

      // Créer le panier recette
      const { data: recipeCart, error: recipeCartError } = await supabase
        .from('recipe_user_carts')
        .insert([{
          user_id: currentUser.id,
          recipe_id: recipeId,
          cart_name: cartName,
        }])
        .select()
        .single();

      if (recipeCartError) throw recipeCartError;

      // Ajouter les ingrédients
      const cartItems = ingredients.map(ingredient => ({
        recipe_cart_id: recipeCart.id,
        product_id: ingredient.productId,
        quantity: ingredient.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('recipe_cart_items')
        .insert(cartItems);

      if (itemsError) throw itemsError;

      return recipeCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeUserCarts', currentUser?.id] });
      toast({
        title: "Recette ajoutée",
        description: "La recette et ses ingrédients ont été ajoutés à vos paniers",
      });
    },
  });

  const addToMainCartMutation = useMutation({
    mutationFn: async (recipeCartId: string) => {
      if (!currentUser) throw new Error('User not authenticated');

      // Récupérer les items du panier recette
      const { data: recipeCartItems, error: itemsError } = await supabase
        .from('recipe_cart_items')
        .select(`
          *,
          recipe_user_carts!inner (
            cart_name,
            recipe_id
          ),
          products (
            price
          )
        `)
        .eq('recipe_cart_id', recipeCartId);

      if (itemsError) throw itemsError;

      // Créer ou récupérer le panier principal
      let { data: mainCart } = await supabase
        .from('user_carts')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (!mainCart) {
        const { data: newCart, error: cartError } = await supabase
          .from('user_carts')
          .insert([{ user_id: currentUser.id }])
          .select()
          .single();

        if (cartError) throw cartError;
        mainCart = newCart;
      }

      // Ajouter les items au panier principal
      const mainCartItems = recipeCartItems.map(item => ({
        user_cart_id: mainCart.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.products?.price || 0,
        cart_type: 'recipe' as const,
        source_cart_id: recipeCartId,
        source_cart_name: item.recipe_user_carts?.cart_name,
      }));

      const { error: mainCartError } = await supabase
        .from('user_cart_items')
        .insert(mainCartItems);

      if (mainCartError) throw mainCartError;

      // Marquer le panier recette comme ajouté
      const { error: updateError } = await supabase
        .from('recipe_user_carts')
        .update({ is_added_to_main_cart: true })
        .eq('id', recipeCartId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeUserCarts', currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ['mainCart', currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ['mainCartItems', currentUser?.id] });
      toast({
        title: "Panier ajouté",
        description: "Le panier recette a été ajouté à votre panier principal",
      });
    },
  });

  const removeRecipeCartMutation = useMutation({
    mutationFn: async (recipeCartId: string) => {
      const { error } = await supabase
        .from('recipe_user_carts')
        .delete()
        .eq('id', recipeCartId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeUserCarts', currentUser?.id] });
      toast({
        title: "Panier supprimé",
        description: "Le panier recette a été supprimé",
      });
    },
  });

  return {
    recipeCarts: recipeCartsQuery.data || [],
    isLoading: recipeCartsQuery.isLoading,
    createRecipeCart: createRecipeCartMutation.mutate,
    addToMainCart: addToMainCartMutation.mutate,
    removeRecipeCart: removeRecipeCartMutation.mutate,
    isCreating: createRecipeCartMutation.isPending,
    isAddingToMain: addToMainCartMutation.isPending,
    isRemoving: removeRecipeCartMutation.isPending,
  };
};

// Hook pour le panier personnalisé
export const usePersonalCart = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const personalCartQuery = useQuery({
    queryKey: ['personalCart', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('personal_carts')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!currentUser,
  });

  const personalCartItemsQuery = useQuery({
    queryKey: ['personalCartItems', currentUser?.id],
    queryFn: async () => {
      if (!currentUser || !personalCartQuery.data?.id) return [];

      const { data, error } = await supabase
        .from('personal_cart_items')
        .select(`
          *,
          products:product_id (
            name,
            image,
            category,
            price
          )
        `)
        .eq('personal_cart_id', personalCartQuery.data.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentUser && !!personalCartQuery.data?.id,
  });

  const createPersonalCartMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('personal_carts')
        .insert([{ user_id: currentUser.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalCart', currentUser?.id] });
    },
  });

  const addToPersonalCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      if (!currentUser) throw new Error('User not authenticated');

      let personalCart = personalCartQuery.data;

      if (!personalCart) {
        const { data: newCart, error: cartError } = await supabase
          .from('personal_carts')
          .insert([{ user_id: currentUser.id }])
          .select()
          .single();

        if (cartError) throw cartError;
        personalCart = newCart;
      }

      const { data, error } = await supabase
        .from('personal_cart_items')
        .insert([{
          personal_cart_id: personalCart.id,
          product_id: productId,
          quantity,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalCart', currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ['personalCartItems', currentUser?.id] });
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté à votre panier personnalisé",
      });
    },
  });

  return {
    personalCart: personalCartQuery.data,
    personalCartItems: personalCartItemsQuery.data || [],
    isLoading: personalCartQuery.isLoading || personalCartItemsQuery.isLoading,
    createPersonalCart: createPersonalCartMutation.mutate,
    addToPersonalCart: addToPersonalCartMutation.mutate,
    isCreating: createPersonalCartMutation.isPending,
    isAdding: addToPersonalCartMutation.isPending,
  };
};
